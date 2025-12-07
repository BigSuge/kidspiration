import { Hono } from "npm:hono";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.ts";

declare const Deno: any;

// 1. Create API Router for Logic
const api = new Hono();

// Helper to generate random OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper to send email (simulated - in production, use a real email service)
async function sendEmail(to: string, subject: string, body: string) {
  console.log(`[EMAIL] To: ${to}, Subject: ${subject}, Body: ${body}`);
  // In production, integrate with SendGrid, AWS SES, or similar
  return true;
}

// Health check endpoint
api.get("/health", (c: any) => {
  return c.json({ status: "ok" });
});

// ====================
// AUTHENTICATION ROUTES
// ====================

// Kid Signup
api.post("/auth/kid/signup", async (c: any) => {
  try {
    const { firstName, lastName, age, birthday, username, country } = await c.req.json();

    // Validate age
    if (age < 0 || age > 12) {
      return c.json({ error: "Age must be between 0 and 12" }, 400);
    }

    // Check if username already exists
    const existingUser = await kv.get(`user:kid:${username}`);
    if (existingUser) {
      return c.json({ error: "Username already exists" }, 400);
    }

    // Determine title based on age (singular form)
    let title = "";
    if (age >= 0 && age <= 2) title = "Treasure Trailblazer";
    else if (age >= 3 && age <= 5) title = "Spark";
    else if (age >= 6 && age <= 9) title = "Star";
    else if (age >= 10 && age <= 12) title = "Trailblazer";

    // Create user object
    const user = {
      id: crypto.randomUUID(),
      type: "kid",
      firstName,
      lastName,
      age,
      birthday,
      username,
      title,
      country: country || "",
      createdAt: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 1,
    };

    // Store user
    await kv.set(`user:kid:${username}`, user);
    await kv.set(`user:id:${user.id}`, user);

    // Track signup event
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
api.post("/auth/kid/login", async (c: any) => {
  try {
    const { username } = await c.req.json();

    const user = await kv.get(`user:kid:${username}`);
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Recalculate age from birthday
    if (user.birthday) {
      const birthDate = new Date(user.birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      user.age = age;

      // Update title based on current age (singular form)
      if (age >= 0 && age <= 2) user.title = "Treasure Trailblazer";
      else if (age >= 3 && age <= 5) user.title = "Spark";
      else if (age >= 6 && age <= 9) user.title = "Star";
      else if (age >= 10 && age <= 12) user.title = "Trailblazer";
    }

    // Update last visit and visit count
    user.lastVisit = new Date().toISOString();
    user.visitCount = (user.visitCount || 0) + 1;
    await kv.set(`user:kid:${username}`, user);
    await kv.set(`user:id:${user.id}`, user);

    // Track login event
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

// Adult (Parent/Teacher or Pastor/Leader) Signup
api.post("/auth/adult/signup", async (c: any) => {
  try {
    const { title, firstName, lastName, username, age, birthday, email, password, type, country, occupation } = await c.req.json();

    // Validate type
    if (type !== 'parent' && type !== 'leader') {
      return c.json({ error: "Invalid user type" }, 400);
    }

    // Check if username or email already exists
    const existingUsername = await kv.get(`user:${type}:${username}`);
    if (existingUsername) {
      return c.json({ error: "Username already exists" }, 400);
    }

    const existingEmail = await kv.get(`email:${email}`);
    if (existingEmail) {
      return c.json({ error: "Email already exists" }, 400);
    }

    // Create user directly
    const user = {
      id: crypto.randomUUID(),
      type,
      title: title || "",
      firstName,
      lastName,
      username,
      age,
      birthday,
      email,
      password, // In production, hash this
      country: country || "",
      occupation: occupation || "",
      createdAt: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 1,
    };

    // Store user
    await kv.set(`user:${type}:${username}`, user);
    await kv.set(`user:id:${user.id}`, user);
    await kv.set(`email:${email}`, username);

    // Track signup event
    await trackAnalytics('signup', { userType: type, userId: user.id, country: user.country, title: user.title, occupation: user.occupation });

    // Auto-login the user
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

// Adult Signup - Step 2: Verify OTP
api.post("/auth/adult/verify-otp", async (c: any) => {
  try {
    const { email, otp } = await c.req.json();
    const tempSignupKey = `temp:signup:${email}`;
    const tempData = await kv.get(tempSignupKey);

    if (!tempData) {
      return c.json({ error: "Invalid or expired signup session" }, 400);
    }

    if (Date.now() > tempData.otpExpiry) {
      await kv.del(tempSignupKey);
      return c.json({ error: "OTP has expired. Please sign up again." }, 400);
    }

    if (tempData.otp !== otp) {
      return c.json({ error: "Invalid OTP" }, 400);
    }

    // Create user
    const user = {
      id: crypto.randomUUID(),
      type: tempData.type,
      firstName: tempData.firstName,
      lastName: tempData.lastName,
      username: tempData.username,
      age: tempData.age,
      birthday: tempData.birthday,
      email: tempData.email,
      password: tempData.password,
      createdAt: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 1,
      country: "",
    };

    // Store user
    await kv.set(`user:${tempData.type}:${tempData.username}`, user);
    await kv.set(`user:id:${user.id}`, user);
    await kv.set(`email:${tempData.email}`, user.username);
    await kv.del(tempSignupKey);

    // Track signup event
    await trackAnalytics('signup', { userType: tempData.type, userId: user.id });

    return c.json({
      success: true,
      user: { ...user, password: undefined },
      message: "Account created successfully! You can now login."
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return c.json({ error: "Verification failed" }, 500);
  }
});

// Adult Login
api.post("/auth/adult/login", async (c: any) => {
  try {
    const { username, password, type } = await c.req.json();

    // Check for admin credentials
    if (username === "KIDSPIRATIONADMIN" && password === "POIUYTREWQ") {
      const adminUser = {
        id: "admin",
        type: "admin",
        username: "KIDSPIRATIONADMIN",
        firstName: "Admin",
        lastName: "User",
      };
      await trackAnalytics('login', { userType: 'admin', userId: 'admin' });
      return c.json({
        success: true,
        user: adminUser,
        isAdmin: true,
        message: "Welcome Admin!"
      });
    }

    // Regular user login
    const user = await kv.get(`user:${type}:${username}`);
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    if (user.password !== password) {
      return c.json({ error: "Invalid password" }, 401);
    }

    // Recalculate age/update stats
    if (user.birthday) {
      const birthDate = new Date(user.birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if ((today.getMonth() < birthDate.getMonth()) || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
      }
      user.age = age;
    }
    user.lastVisit = new Date().toISOString();
    user.visitCount = (user.visitCount || 0) + 1;
    await kv.set(`user:${type}:${username}`, user);
    await kv.set(`user:id:${user.id}`, user);

    await trackAnalytics('login', { userType: type, userId: user.id });

    return c.json({
      success: true,
      user: { ...user, password: undefined },
      message: `Welcome back ${user.firstName} ${user.lastName}!`
    });
  } catch (error) {
    console.error("Adult login error:", error);
    return c.json({ error: "Login failed" }, 500);
  }
});

// Forgot Password
api.post("/auth/forgot-password", async (c: any) => {
  try {
    const { email } = await c.req.json();
    const username = await kv.get(`email:${email}`);
    if (!username) {
      return c.json({ success: true, message: "If the email exists, a reset code will be sent." });
    }
    let user = await kv.get(`user:parent:${username}`);
    if (!user) user = await kv.get(`user:leader:${username}`);

    if (user) {
      const otp = generateOTP();
      const otpExpiry = Date.now() + 10 * 60 * 1000;
      await kv.set(`reset:${email}`, {
        username: user.username,
        type: user.type,
        otp,
        otpExpiry,
      });
      await sendEmail(email, "Kidspiration - Password Reset", `Your reset code is: ${otp}`);
    }
    return c.json({ success: true, message: "If the email exists, a reset code will be sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return c.json({ error: "Request failed" }, 500);
  }
});

// Reset Password
api.post("/auth/reset-password", async (c: any) => {
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

// ====================
// ANALYTICS ROUTES
// ====================

// Track analytics event
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

api.post("/analytics/page-visit", async (c: any) => {
  try {
    const { page, userId, userType } = await c.req.json();
    await trackAnalytics('page_visit', { page, userId, userType });
    return c.json({ success: true });
  } catch (error) {
    console.error("Page visit tracking error:", error);
    return c.json({ error: "Tracking failed" }, 500);
  }
});

api.get("/analytics/dashboard", async (c: any) => {
  try {
    const analyticsKeys = await kv.getByPrefix("analytics:");
    const events = analyticsKeys || [];
    const userKeys = await kv.getByPrefix("user:id:");
    const users = userKeys || [];

    const usersByCountry: any = {};
    users.forEach((user: any) => {
      const country = user.country || 'Unknown';
      usersByCountry[country] = (usersByCountry[country] || 0) + 1;
    });

    const topCountries = Object.entries(usersByCountry)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 10)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as any);

    const stats = {
      totalUsers: users.length,
      usersByType: {
        kid: users.filter((u: any) => u.type === 'kid').length,
        parent: users.filter((u: any) => u.type === 'parent').length,
        leader: users.filter((u: any) => u.type === 'leader').length,
      },
      usersByTitle: {
        Treasures: users.filter((u: any) => u.title === 'Treasures').length,
        Sparks: users.filter((u: any) => u.title === 'Sparks').length,
        Stars: users.filter((u: any) => u.title === 'Stars').length,
        Trailblazers: users.filter((u: any) => u.title === 'Trailblazers').length,
      },
      usersByCountry: topCountries,
      pageVisits: events.filter((e: any) => e.eventType === 'page_visit').length,
      signups: events.filter((e: any) => e.eventType === 'signup').length,
      logins: events.filter((e: any) => e.eventType === 'login').length,
    };

    // Chart data logic...
    const pageVisitsByMonth: any = {};
    events.filter((e: any) => e.eventType === 'page_visit').forEach((event: any) => {
      const month = new Date(event.timestamp).toISOString().slice(0, 7);
      pageVisitsByMonth[month] = (pageVisitsByMonth[month] || 0) + 1;
    });
    const loginsByMonth: any = {};
    events.filter((e: any) => e.eventType === 'login').forEach((event: any) => {
      const month = new Date(event.timestamp).toISOString().slice(0, 7);
      loginsByMonth[month] = (loginsByMonth[month] || 0) + 1;
    });
    const allMonths = new Set([...Object.keys(pageVisitsByMonth), ...Object.keys(loginsByMonth)]);
    const chartData = Array.from(allMonths).sort().map(month => ({
      month,
      visits: pageVisitsByMonth[month] || 0,
      logins: loginsByMonth[month] || 0,
    }));

    return c.json({
      success: true,
      stats,
      pageVisitsByMonth,
      loginsByMonth,
      chartData,
      recentEvents: events.slice(-50).reverse(),
    });
  } catch (error) {
    console.error("Analytics dashboard error:", error);
    return c.json({ error: "Failed to load analytics" }, 500);
  }
});

// ====================
// PAYMENT ROUTES
// ====================

// Initiate Payment
api.post("/payment/initiate", async (c: any) => {
  try {
    const { sku, amount, narration, successUrl, failUrl, userId, userType } = await c.req.json();
    const apiKey = Deno.env.get('ESPEES_API_KEY');
    const merchantWallet = Deno.env.get('ESPEES_MERCHANT_WALLET');

    if (!apiKey || !merchantWallet) {
      console.log("[MOCK PAYMENT] Initiating payment:", { sku, amount });
      return c.json({
        statusCode: 200,
        payment_ref: `MOCK-${crypto.randomUUID()}`,
        message: "Successfully Done (MOCK MODE)",
        isMock: true
      });
    }

    const response = await fetch("https://api.espees.org/v2/payment/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        product_sku: sku,
        narration: narration,
        price: parseFloat(amount),
        merchant_wallet: merchantWallet,
        success_url: successUrl,
        fail_url: failUrl,
        user_data: {
          userId,
          userType,
          ...await c.req.json().then((b: any) => b.guestDetails || {})
        }
      }),
    });

    const data = await response.json();
    console.log("[REAL PAYMENT] Response:", data);
    return c.json(data, response.status as any);
  } catch (error) {
    console.error("Payment initiation error:", error);
    return c.json({ error: "Payment initiation failed" }, 500);
  }
});

// Confirm Payment
api.post("/payment/confirm", async (c: any) => {
  try {
    const { paymentRef } = await c.req.json();
    const apiKey = Deno.env.get('ESPEES_API_KEY');

    if (paymentRef.startsWith("MOCK-")) {
      return c.json({
        transaction_status: "APPROVED",
        status_details: "Successfully Done (MOCK)",
        price: 100,
        transaction_date: new Date().toISOString(),
        product_sku: "MOCK-SKU"
      });
    }

    if (!apiKey) {
      return c.json({ error: "API Key not configured" }, 500);
    }

    const response = await fetch("https://api.espees.org/v2/payment/confirm/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ paymentRef }),
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

        await trackAnalytics('sponsorship', {
          userId,
          amount: data.price,
          sku: data.product_sku
        });
      }

      const sponsorship = {
        id: crypto.randomUUID(),
        userId: data.user_data?.userId || "guest",
        userType: data.user_data?.userType || "guest",
        guestName: data.user_data?.name,
        guestEmail: data.user_data?.email,
        guestPhone: data.user_data?.phone,
        amount: Number(data.price),
        sku: data.product_sku,
        date: new Date().toISOString(),
        paymentRef: paymentRef,
        status: "APPROVED"
      };
      await kv.set(`sponsorship:${sponsorship.id}`, sponsorship);
    }

    return c.json(data);
  } catch (error) {
    console.error("Payment confirmation error:", error);
    return c.json({ error: "Payment confirmation failed" }, 500);
  }
});

api.get("/admin/users", async (c: any) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const type = c.req.query('type') || 'all';

    let users = await kv.getByPrefix("user:id:") || [];
    if (type !== 'all') {
      users = users.filter((u: any) => u.type === type);
    }
    users.sort((a: any, b: any) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime());

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = users.slice(startIndex, endIndex);
    const sanitizedUsers = paginatedUsers.map((u: any) => ({ ...u, password: undefined }));

    return c.json({
      success: true,
      users: sanitizedUsers,
      pagination: {
        page,
        limit,
        total: users.length,
        totalPages: Math.ceil(users.length / limit),
      }
    });
  } catch (error) {
    console.error("Get users error:", error);
    return c.json({ error: "Failed to load users" }, 500);
  }
});

// 2. Create Outer App for Global CORS and Routing
const app = new Hono();

app.use('*', logger(console.log));

// GLOBAL CORS + OPTIONS MIDDLEWARE
app.use('*', async (c, next) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  };

  if (c.req.method === 'OPTIONS') {
    return c.text('ok', 204, corsHeaders);
  }

  await next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    c.res.headers.set(key, value);
  });
});

// Mount the API at both paths to ensure matching
// Mount the API directly to app (Routing is handled by URL normalization below)
app.route('/', api);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

// Debug 404 Handler
app.notFound((c) => {
  return c.json({
    error: "Route not found",
    path: c.req.path, // This will show the normalized path
    originalUrl: c.req.url,
    method: c.req.method,
    availableRoutes: ["/payment/initiate", "/payment/confirm", "/auth/...", "/health"]
  }, 404);
});

Deno.serve(async (req) => {
  // 1. Handle CORS Preflight immediately
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // 2. Normalize URL (Strip /functions/v1/server prefix if present)
  try {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/functions/v1/server')) {
      url.pathname = url.pathname.replace('/functions/v1/server', '');
      // Ensure we don't end up with empty path if it was just the root
      if (url.pathname === '' || url.pathname.startsWith('/?')) {
        url.pathname = '/' + url.pathname;
      }
      // Create new request with modified URL
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
