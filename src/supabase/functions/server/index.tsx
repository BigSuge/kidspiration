import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client with service role key
const getSupabaseAdmin = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
};

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
app.get("/make-server-17ebb09b/health", (c) => {
  return c.json({ status: "ok" });
});

// ====================
// AUTHENTICATION ROUTES
// ====================

// Kid Signup
app.post("/make-server-17ebb09b/auth/kid/signup", async (c) => {
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
app.post("/make-server-17ebb09b/auth/kid/login", async (c) => {
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

// Adult (Parent/Teacher or Pastor/Leader) Signup - Simplified without OTP
app.post("/make-server-17ebb09b/auth/adult/signup", async (c) => {
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

// Adult Signup - Step 2: Verify OTP and complete registration
app.post("/make-server-17ebb09b/auth/adult/verify-otp", async (c) => {
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
      password: tempData.password, // In production, hash this
      createdAt: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 1,
      country: "",
    };

    // Store user
    await kv.set(`user:${tempData.type}:${tempData.username}`, user);
    await kv.set(`user:id:${user.id}`, user);
    await kv.set(`email:${tempData.email}`, user.username);

    // Delete temporary signup data
    await kv.del(tempSignupKey);

    // Track signup event
    await trackAnalytics('signup', { userType: tempData.type, userId: user.id });

    return c.json({ 
      success: true, 
      user: { ...user, password: undefined }, // Don't send password back
      message: "Account created successfully! You can now login."
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return c.json({ error: "Verification failed" }, 500);
  }
});

// Adult Login
app.post("/make-server-17ebb09b/auth/adult/login", async (c) => {
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
      
      // Track admin login
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
    }

    // Update last visit and visit count
    user.lastVisit = new Date().toISOString();
    user.visitCount = (user.visitCount || 0) + 1;
    await kv.set(`user:${type}:${username}`, user);
    await kv.set(`user:id:${user.id}`, user);

    // Track login event
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

// Password Reset - Step 1: Request reset
app.post("/make-server-17ebb09b/auth/forgot-password", async (c) => {
  try {
    const { email } = await c.req.json();

    const username = await kv.get(`email:${email}`);
    if (!username) {
      // Don't reveal if email exists for security
      return c.json({ success: true, message: "If the email exists, a reset code will be sent." });
    }

    // Try both parent and leader types
    let user = await kv.get(`user:parent:${username}`);
    if (!user) {
      user = await kv.get(`user:leader:${username}`);
    }

    if (!user) {
      return c.json({ success: true, message: "If the email exists, a reset code will be sent." });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store reset token
    await kv.set(`reset:${email}`, {
      username: user.username,
      type: user.type,
      otp,
      otpExpiry,
    });

    // Send OTP email
    await sendEmail(
      email,
      "Kidspiration - Password Reset",
      `Your password reset code is: ${otp}. This code will expire in 10 minutes.`
    );

    return c.json({ success: true, message: "If the email exists, a reset code will be sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return c.json({ error: "Request failed" }, 500);
  }
});

// Password Reset - Step 2: Verify OTP and set new password
app.post("/make-server-17ebb09b/auth/reset-password", async (c) => {
  try {
    const { email, otp, newPassword } = await c.req.json();

    const resetData = await kv.get(`reset:${email}`);
    if (!resetData) {
      return c.json({ error: "Invalid or expired reset session" }, 400);
    }

    if (Date.now() > resetData.otpExpiry) {
      await kv.del(`reset:${email}`);
      return c.json({ error: "OTP has expired. Please request a new reset." }, 400);
    }

    if (resetData.otp !== otp) {
      return c.json({ error: "Invalid OTP" }, 400);
    }

    // Update password
    const user = await kv.get(`user:${resetData.type}:${resetData.username}`);
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    user.password = newPassword; // In production, hash this
    await kv.set(`user:${resetData.type}:${resetData.username}`, user);
    await kv.set(`user:id:${user.id}`, user);

    // Delete reset token
    await kv.del(`reset:${email}`);

    return c.json({ success: true, message: "Password reset successfully!" });
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

// Track page visit
app.post("/make-server-17ebb09b/analytics/page-visit", async (c) => {
  try {
    const { page, userId, userType } = await c.req.json();
    await trackAnalytics('page_visit', { page, userId, userType });
    return c.json({ success: true });
  } catch (error) {
    console.error("Page visit tracking error:", error);
    return c.json({ error: "Tracking failed" }, 500);
  }
});

// Get analytics data (admin only)
app.get("/make-server-17ebb09b/analytics/dashboard", async (c) => {
  try {
    // Get all analytics events
    const analyticsKeys = await kv.getByPrefix("analytics:");
    const events = analyticsKeys || [];

    // Get all users
    const userKeys = await kv.getByPrefix("user:id:");
    const users = userKeys || [];

    // Calculate country statistics
    const usersByCountry: any = {};
    users.forEach(user => {
      const country = user.country || 'Unknown';
      usersByCountry[country] = (usersByCountry[country] || 0) + 1;
    });

    // Sort countries by user count
    const topCountries = Object.entries(usersByCountry)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 10)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as any);

    // Calculate stats
    const stats = {
      totalUsers: users.length,
      usersByType: {
        kid: users.filter(u => u.type === 'kid').length,
        parent: users.filter(u => u.type === 'parent').length,
        leader: users.filter(u => u.type === 'leader').length,
      },
      usersByTitle: {
        Treasures: users.filter(u => u.title === 'Treasures').length,
        Sparks: users.filter(u => u.title === 'Sparks').length,
        Stars: users.filter(u => u.title === 'Stars').length,
        Trailblazers: users.filter(u => u.title === 'Trailblazers').length,
      },
      usersByCountry: topCountries,
      pageVisits: events.filter(e => e.eventType === 'page_visit').length,
      signups: events.filter(e => e.eventType === 'signup').length,
      logins: events.filter(e => e.eventType === 'login').length,
    };

    // Get page visits by month
    const pageVisitsByMonth: any = {};
    events.filter(e => e.eventType === 'page_visit').forEach(event => {
      const month = new Date(event.timestamp).toISOString().slice(0, 7);
      pageVisitsByMonth[month] = (pageVisitsByMonth[month] || 0) + 1;
    });

    // Get logins by month
    const loginsByMonth: any = {};
    events.filter(e => e.eventType === 'login').forEach(event => {
      const month = new Date(event.timestamp).toISOString().slice(0, 7);
      loginsByMonth[month] = (loginsByMonth[month] || 0) + 1;
    });

    // Create combined chart data
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
      recentEvents: events.slice(-50).reverse(), // Last 50 events
    });
  } catch (error) {
    console.error("Analytics dashboard error:", error);
    return c.json({ error: "Failed to load analytics" }, 500);
  }
});

// Get all users with pagination (admin only)
app.get("/make-server-17ebb09b/admin/users", async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const type = c.req.query('type') || 'all';

    // Get all users
    let users = await kv.getByPrefix("user:id:") || [];

    // Filter by type if specified
    if (type !== 'all') {
      users = users.filter(u => u.type === type);
    }

    // Sort by last visit (most recent first)
    users.sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime());

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = users.slice(startIndex, endIndex);

    // Remove passwords
    const sanitizedUsers = paginatedUsers.map(u => ({ ...u, password: undefined }));

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

Deno.serve(app.fetch);
