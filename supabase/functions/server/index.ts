import { Hono } from "npm:hono";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.ts";

declare const Deno: any;

// Initialize Single Hono App
const app = new Hono();

app.use('*', logger(console.log));

// Helper to generate random OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper to send email
async function sendEmail(to: string, subject: string, body: string) {
  console.log(`[EMAIL] To: ${to}, Subject: ${subject}, Body: ${body}`);
  return true;
}

// Helper for Analytics
async function trackAnalytics(eventType: string, data: any) {
  try {
    const key = `analytics:${eventType}:${Date.now()}:${crypto.randomUUID()}`;
    await kv.set(key, {
      eventType,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Analytics tracking error:", error);
  }
}

// Health check
app.get("/health", (c: any) => {
  return c.json({ status: "ok" });
});

// ====================
// AUTHENTICATION ROUTES
// ====================

// Kid Signup
app.post("/auth/kid/signup", async (c: any) => {
  try {
    const { firstName, lastName, age, birthday, username, country } = await c.req.json();
    if (age < 0 || age > 12) return c.json({ error: "Age must be between 0 and 12" }, 400);

    const existingUser = await kv.get(`user:kid:${username}`);
    if (existingUser) return c.json({ error: "Username already exists" }, 400);

    let title = "";
    if (age >= 0 && age <= 2) title = "Treasure Trailblazer";
    else if (age >= 3 && age <= 5) title = "Spark";
    else if (age >= 6 && age <= 9) title = "Star";
    else if (age >= 10 && age <= 12) title = "Trailblazer";

    const user = {
      id: crypto.randomUUID(),
      type: "kid",
      firstName, lastName, age, birthday, username, title,
      country: country || "",
      createdAt: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 1,
    };

    await kv.set(`user:kid:${username}`, user);
    await kv.set(`user:id:${user.id}`, user);
    await trackAnalytics('signup', { userType: 'kid', title, userId: user.id, country: user.country });

    return c.json({
      success: true,
      user: { ...user, type: 'kid' },
      message: `Welcome ${title} ${firstName} ${lastName}! You are now a member of the Kidspiration movement.`
    });
  } catch (error) {
    console.error("Kid signup error:", error);
    return c.json({ error: "Signup failed" }, 500);
  }
});

// Kid Login
app.post("/auth/kid/login", async (c: any) => {
  try {
    const { username } = await c.req.json();
    const user = await kv.get(`user:kid:${username}`);
    if (!user) return c.json({ error: "User not found" }, 404);

    if (user.birthday) {
      const birthDate = new Date(user.birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age--;
      user.age = age;
      if (age >= 0 && age <= 2) user.title = "Treasure Trailblazer";
      else if (age >= 3 && age <= 5) user.title = "Spark";
      else if (age >= 6 && age <= 9) user.title = "Star";
      else if (age >= 10 && age <= 12) user.title = "Trailblazer";
    }

    user.lastVisit = new Date().toISOString();
    user.visitCount = (user.visitCount || 0) + 1;
    await kv.set(`user:kid:${username}`, user);
    await kv.set(`user:id:${user.id}`, user);
    await trackAnalytics('login', { userType: 'kid', userId: user.id });

    return c.json({
      success: true,
      user,
      message: `Welcome back ${user.title} ${user.firstName} ${user.lastName}!`
    });
  } catch (error) {
    console.error("Kid login error:", error);
    return c.json({ error: "Login failed" }, 500);
  }
});

// Adult Signup
app.post("/auth/adult/signup", async (c: any) => {
  try {
    const { title, firstName, lastName, username, age, birthday, email, password, type, country, occupation } = await c.req.json();
    if (type !== 'parent' && type !== 'leader') return c.json({ error: "Invalid user type" }, 400);

    const existingUsername = await kv.get(`user:${type}:${username}`);
    if (existingUsername) return c.json({ error: "Username already exists" }, 400);

    const existingEmail = await kv.get(`email:${email}`);
    if (existingEmail) return c.json({ error: "Email already exists" }, 400);

    const user = {
      id: crypto.randomUUID(), type, title: title || "", firstName, lastName, username, age, birthday, email, password,
      country: country || "", occupation: occupation || "",
      createdAt: new Date().toISOString(), lastVisit: new Date().toISOString(), visitCount: 1,
    };

    await kv.set(`user:${type}:${username}`, user);
    await kv.set(`user:id:${user.id}`, user);
    await kv.set(`email:${email}`, username);
    await trackAnalytics('signup', { userType: type, userId: user.id, country: user.country });

    return c.json({
      success: true,
      user: { ...user, password: undefined },
      message: `Welcome ${title} ${firstName} ${lastName}! Your account has been created successfully.`,
      autoLogin: true
    });
  } catch (error) {
    console.error("Adult signup error:", error);
    return c.json({ error: "Signup failed" }, 500);
  }
});

// Adult Verify OTP
app.post("/auth/adult/verify-otp", async (c: any) => {
  try {
    const { email, otp } = await c.req.json();
    const tempSignupKey = `temp:signup:${email}`;
    const tempData = await kv.get(tempSignupKey);

    if (!tempData) return c.json({ error: "Invalid or expired signup session" }, 400);
    if (Date.now() > tempData.otpExpiry) {
      await kv.del(tempSignupKey);
      return c.json({ error: "OTP has expired" }, 400);
    }
    if (tempData.otp !== otp) return c.json({ error: "Invalid OTP" }, 400);

    const user = {
      id: crypto.randomUUID(), type: tempData.type, firstName: tempData.firstName, lastName: tempData.lastName,
      username: tempData.username, age: tempData.age, birthday: tempData.birthday, email: tempData.email, password: tempData.password,
      createdAt: new Date().toISOString(), lastVisit: new Date().toISOString(), visitCount: 1, country: "",
    };

    await kv.set(`user:${tempData.type}:${tempData.username}`, user);
    await kv.set(`user:id:${user.id}`, user);
    await kv.set(`email:${tempData.email}`, user.username);
    await kv.del(tempSignupKey);
    await trackAnalytics('signup', { userType: tempData.type, userId: user.id });

    return c.json({
      success: true,
      user: { ...user, password: undefined },
      message: "Account created successfully!"
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return c.json({ error: "Verification failed" }, 500);
  }
});

// Adult Login
app.post("/auth/adult/login", async (c: any) => {
  try {
    const { username, password, type } = await c.req.json();

    if (username === "KIDSPIRATIONADMIN" && password === "POIUYTREWQ") {
      await trackAnalytics('login', { userType: 'admin', userId: 'admin' });
      return c.json({ success: true, user: { id: "admin", type: "admin", username: "KIDSPIRATIONADMIN", firstName: "Admin", lastName: "User" }, isAdmin: true, message: "Welcome Admin!" });
    }

    const user = await kv.get(`user:${type}:${username}`);
    if (!user) return c.json({ error: "User not found" }, 404);
    if (user.password !== password) return c.json({ error: "Invalid password" }, 401);

    if (user.birthday) {
      const birthDate = new Date(user.birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age--;
      user.age = age;
    }
    user.lastVisit = new Date().toISOString();
    user.visitCount = (user.visitCount || 0) + 1;
    await kv.set(`user:${type}:${username}`, user);
    await kv.set(`user:id:${user.id}`, user);
    await trackAnalytics('login', { userType: type, userId: user.id });

    return c.json({ success: true, user: { ...user, password: undefined }, message: `Welcome back ${user.firstName} ${user.lastName}!` });
  } catch (error) {
    console.error("Adult login error:", error);
    return c.json({ error: "Login failed" }, 500);
  }
});

// Forgot Password
app.post("/auth/forgot-password", async (c: any) => {
  try {
    const { email } = await c.req.json();
    const username = await kv.get(`email:${email}`);
    if (!username) return c.json({ success: true, message: "If the email exists, a reset code will be sent." });

    let user = await kv.get(`user:parent:${username}`);
    if (!user) user = await kv.get(`user:leader:${username}`);

    if (user) {
      const otp = generateOTP();
      const otpExpiry = Date.now() + 10 * 60 * 1000;
      await kv.set(`reset:${email}`, { username: user.username, type: user.type, otp, otpExpiry });
      await sendEmail(email, "Kidspiration - Password Reset", `Your reset code is: ${otp}`);
    }
    return c.json({ success: true, message: "If the email exists, a reset code will be sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return c.json({ error: "Request failed" }, 500);
  }
});

// Reset Password
app.post("/auth/reset-password", async (c: any) => {
  try {
    const { email, otp, newPassword } = await c.req.json();
    const resetData = await kv.get(`reset:${email}`);
    if (!resetData) return c.json({ error: "Invalid or expired reset session" }, 400);
    if (Date.now() > resetData.otpExpiry) {
      await kv.del(`reset:${email}`);
      return c.json({ error: "OTP expired" }, 400);
    }
    if (resetData.otp !== otp) return c.json({ error: "Invalid OTP" }, 400);

    const user = await kv.get(`user:${resetData.type}:${resetData.username}`);
    if (user) {
      user.password = newPassword;
      await kv.set(`user:${resetData.type}:${resetData.username}`, user);
      await kv.set(`user:id:${user.id}`, user);
      await kv.del(`reset:${email}`);
      return c.json({ success: true, message: "Password reset successfully!" });
    }
    return c.json({ error: "User not found" }, 404);
  } catch (error) {
    console.error("Password reset error:", error);
    return c.json({ error: "Reset failed" }, 500);
  }
});

// Analytics
app.post("/analytics/page-visit", async (c: any) => {
  try {
    const { page, userId, userType } = await c.req.json();
    await trackAnalytics('page_visit', { page, userId, userType });
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Tracking failed" }, 500);
  }
});

app.get("/analytics/dashboard", async (c: any) => {
  try {
    const analyticsKeys = await kv.getByPrefix("analytics:");
    const events = analyticsKeys || [];
    const userKeys = await kv.getByPrefix("user:id:");
    const users = userKeys || [];

    const usersByCountry: any = {};
    users.forEach((u: any) => { const c = u.country || 'Unknown'; usersByCountry[c] = (usersByCountry[c] || 0) + 1; });
    const topCountries = Object.entries(usersByCountry).sort(([, a]: any, [, b]: any) => b - a).slice(0, 10).reduce((o, [k, v]) => { o[k] = v; return o; }, {} as any);

    const stats = {
      totalUsers: users.length,
      usersByType: { kid: users.filter((u: any) => u.type === 'kid').length, parent: users.filter((u: any) => u.type === 'parent').length, leader: users.filter((u: any) => u.type === 'leader').length },
      usersByTitle: { Treasures: users.filter((u: any) => u.title === 'Treasures').length, Sparks: users.filter((u: any) => u.title === 'Sparks').length, Stars: users.filter((u: any) => u.title === 'Stars').length, Trailblazers: users.filter((u: any) => u.title === 'Trailblazers').length },
      usersByCountry: topCountries,
      pageVisits: events.filter((e: any) => e.eventType === 'page_visit').length,
      signups: events.filter((e: any) => e.eventType === 'signup').length,
      logins: events.filter((e: any) => e.eventType === 'login').length,
    };

    const pageVisitsByMonth: any = {};
    events.filter((e: any) => e.eventType === 'page_visit').forEach((evt: any) => { const m = new Date(evt.timestamp).toISOString().slice(0, 7); pageVisitsByMonth[m] = (pageVisitsByMonth[m] || 0) + 1; });
    const loginsByMonth: any = {};
    events.filter((e: any) => e.eventType === 'login').forEach((evt: any) => { const m = new Date(evt.timestamp).toISOString().slice(0, 7); loginsByMonth[m] = (loginsByMonth[m] || 0) + 1; });
    const chartData = Array.from(new Set([...Object.keys(pageVisitsByMonth), ...Object.keys(loginsByMonth)])).sort().map(month => ({ month, visits: pageVisitsByMonth[month] || 0, logins: loginsByMonth[month] || 0 }));

    return c.json({ success: true, stats, pageVisitsByMonth, loginsByMonth, chartData, recentEvents: events.slice(-50).reverse() });
  } catch (error) {
    return c.json({ error: "Failed to load analytics" }, 500);
  }
});

// ====================
// PAYMENT ROUTES
// ====================

app.post("/payment/initiate", async (c: any) => {
  try {
    const { sku, amount, narration, successUrl, failUrl, userId, userType } = await c.req.json();
    const apiKey = Deno.env.get('ESPEES_API_KEY');
    const merchantWallet = Deno.env.get('ESPEES_MERCHANT_WALLET');

    if (!apiKey || !merchantWallet) {
      console.log("[MOCK PAYMENT] Initiating:", { sku, amount });
      return c.json({ statusCode: 200, payment_ref: `MOCK-${crypto.randomUUID()}`, message: "Successfully Done (MOCK MODE)", isMock: true });
    }

    const response = await fetch("https://api.espees.org/v2/payment/product", {
      method: "POST", headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ product_sku: sku, narration, price: parseFloat(amount), merchant_wallet: merchantWallet, success_url: successUrl, fail_url: failUrl, user_data: { userId, userType, ...await c.req.json().then((b: any) => b.guestDetails || {}) } }),
    });

    const data = await response.json();
    console.log("[REAL PAYMENT] Response:", data);
    return c.json(data, response.status as any); // Forward external status
  } catch (error) {
    console.error("Payment initiation error:", error);
    return c.json({ error: "Payment initiation failed" }, 500);
  }
});

app.post("/payment/confirm", async (c: any) => {
  try {
    const { paymentRef } = await c.req.json();
    const apiKey = Deno.env.get('ESPEES_API_KEY');

    if (paymentRef.startsWith("MOCK-")) {
      return c.json({ transaction_status: "APPROVED", status_details: "Successfully Done (MOCK)", price: 100, transaction_date: new Date().toISOString(), product_sku: "MOCK-SKU" });
    }

    if (!apiKey) return c.json({ error: "API Key not configured" }, 500);

    const response = await fetch("https://api.espees.org/v2/payment/confirm/", {
      method: "POST", headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ payment_ref: paymentRef }),
    });

    const data = await response.json();

    if (data.transaction_status === "APPROVED" && data.user_data?.userId) {
      const { userId, userType } = data.user_data;
      const user = await kv.get(`user:id:${userId}`);
      if (user) {
        user.totalSponsorships = (user.totalSponsorships || 0) + 1;
        user.totalSponsorshipAmount = (user.totalSponsorshipAmount || 0) + Number(data.price);
        user.lastSponsorshipDate = new Date().toISOString();
        user.lastSponsorshipAmount = Number(data.price);
        await kv.set(`user:id:${userId}`, user);
        await kv.set(`user:${user.type}:${user.username}`, user);
        await trackAnalytics('sponsorship', { userId, amount: data.price, sku: data.product_sku });
      }

      const sponsorship = {
        id: crypto.randomUUID(), userId: data.user_data?.userId || "guest", userType: data.user_data?.userType || "guest",
        guestName: data.user_data?.name, guestEmail: data.user_data?.email, guestPhone: data.user_data?.phone,
        amount: Number(data.price), sku: data.product_sku, date: new Date().toISOString(), paymentRef, status: "APPROVED"
      };
      await kv.set(`sponsorship:${sponsorship.id}`, sponsorship);
    }

    return c.json(data);
  } catch (error) {
    console.error("Payment confirmation error:", error);
    return c.json({ error: "Payment confirmation failed" }, 500);
  }
});

app.get("/admin/users", async (c: any) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const type = c.req.query('type') || 'all';
    let users = await kv.getByPrefix("user:id:") || [];
    if (type !== 'all') users = users.filter((u: any) => u.type === type);
    users.sort((a: any, b: any) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime());
    const startIndex = (page - 1) * limit;
    const paginatedUsers = users.slice(startIndex, startIndex + limit).map((u: any) => ({ ...u, password: undefined }));

    return c.json({ success: true, users: paginatedUsers, pagination: { page, limit, total: users.length, totalPages: Math.ceil(users.length / limit) } });
  } catch (error) {
    return c.json({ error: "Failed to load users" }, 500);
  }
});

// ====================
// GLOBAL HANDLERS (DEBUGging 404 & CORS)
// ====================

// Debug 404 Handler - Attached to the ONLY app instance
app.notFound((c: any) => {
  const debugInfo = `Method=${c.req.method} Path=${c.req.path} Orig=${c.req.url}`;
  return c.json({
    error: `ROUTE NOT FOUND. Debug: ${debugInfo}`,
    message: "The requested path did not match any defined route.",
    path: c.req.path,
    originalUrl: c.req.url,
    method: c.req.method,
    availableRoutes: ["/payment/initiate", "/payment/confirm", "/auth/...", "/health"]
  }, 404);
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

Deno.serve(async (req: any) => {
  // 1. Handle CORS Preflight immediately
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // 2. Normalize URL (Strip /functions/v1/server prefix if present)
  // This ensures Hono matches /payment/initiate correctly
  try {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/functions/v1/server')) {
      const normalizedPath = url.pathname.replace('/functions/v1/server', '');
      url.pathname = normalizedPath === '' || normalizedPath.startsWith('/?') ? '/' + normalizedPath : normalizedPath;
      req = new Request(url.toString(), req);
    }
  } catch (e) {
    console.error("URL Normalization error:", e);
  }

  // 3. Pass to Hono
  const res = await app.fetch(req);

  // 4. Inject CORS headers into Hono response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.headers.set(key, value);
  });

  return res;
});
