# Kidspiration Platform - Complete Documentation

## Table of Contents
1. [Running the App on Windows](#running-the-app-on-windows)
2. [Hosting Online & Domain Configuration](#hosting-online--domain-configuration)
3. [Important Variables & Styling Guide](#important-variables--styling-guide)
4. [Backend Integration Guide](#backend-integration-guide)
5. [Project Structure](#project-structure)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

---

## Running the App on Windows

### Prerequisites
Before you start, ensure you have the following installed on your Windows machine:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: Open Command Prompt and run:
     ```bash
     node --version
     npm --version
     ```

2. **Git** (optional, for version control)
   - Download from: https://git-scm.com/download/win

### Installation Steps

1. **Open Command Prompt or PowerShell**
   - Press `Win + R`, type `cmd`, and press Enter

2. **Navigate to your project directory**
   ```bash
   cd C:\path\to\your\kidspiration-project
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open your browser and go to: `http://localhost:5173` (or the port shown in your terminal)

### Common Windows-Specific Issues

**Issue: "npm is not recognized"**
- Solution: Add Node.js to your PATH environment variable
  1. Search for "Environment Variables" in Windows Start Menu
  2. Click "Edit the system environment variables"
  3. Click "Environment Variables"
  4. Under "System variables", find and edit "Path"
  5. Add: `C:\Program Files\nodejs\`

**Issue: Script execution disabled**
- Solution: Enable PowerShell scripts
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

---

## Hosting Online & Domain Configuration

### Option 1: Vercel (Recommended - Easiest)

#### Step 1: Prepare Your Project
1. Create a `vercel.json` file in your project root:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Step 2: Deploy to Vercel
1. Visit https://vercel.com and sign up
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. Deploy:
   ```bash
   vercel --prod
   ```

#### Step 3: Configure Custom Domain
1. Go to your Vercel dashboard
2. Select your project
3. Click "Settings" → "Domains"
4. Add your custom domain (e.g., `kidspiration.org`)
5. Update your domain's DNS records at your registrar:
   - **Type**: A Record
   - **Name**: @ (or your subdomain)
   - **Value**: `76.76.19.19` (Vercel's IP)
   
   OR use CNAME:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: `cname.vercel-dns.com`

#### Step 4: Configure Environment Variables on Vercel
1. Go to Project Settings → Environment Variables
2. Add each variable from your local `.env` file:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_DB_URL`

### Option 2: Netlify

#### Deploy to Netlify
1. Create a `netlify.toml` file:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Visit https://netlify.com and sign up
3. Click "Add new site" → "Import an existing project"
4. Connect your Git repository or drag & drop your project folder
5. Configure build settings (auto-detected from `netlify.toml`)
6. Add environment variables in Site Settings → Environment Variables

#### Custom Domain on Netlify
1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Enter your domain name
4. Update DNS records at your registrar:
   - **Type**: A Record
   - **Name**: @
   - **Value**: `75.2.60.5` (Netlify's load balancer)

### Option 3: Traditional Web Hosting (cPanel/Shared Hosting)

#### Build for Production
```bash
npm run build
```

This creates a `dist` folder with your production files.

#### Upload to Server
1. Use FTP client (FileZilla, WinSCP) to connect to your hosting
2. Upload all contents of the `dist` folder to your `public_html` or `www` directory
3. Create a `.htaccess` file for routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Configure Supabase Backend
1. Your Supabase edge functions need to remain hosted on Supabase
2. Update CORS settings in `/supabase/functions/server/index.tsx` to allow your domain:
```typescript
app.use('*', cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true,
}));
```

---

## Important Variables & Styling Guide

### Color Scheme Variables

The Kidspiration platform uses a consistent color palette. Here are the key gradient combinations:

#### Primary Gradients

**Location**: Throughout components (Hero, Buttons, Sections)

1. **Pink to Purple Gradient** (Primary Brand)
   ```css
   from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4]
   /* Used in: Main headings, primary CTAs */
   ```

2. **Teal to Blue Gradient** (Secondary)
   ```css
   from-[#4ECDC4] to-[#06B6D4]
   /* Used in: Word Search, secondary elements */
   ```

3. **Pink to Light Pink Gradient** (Soft accent)
   ```css
   from-[#FF6B9D] to-[#F472B6]
   /* Used in: Buttons, highlights */
   ```

4. **Background Gradients**
   ```css
   from-[#FFF5F7] via-[#FFFFFF] to-[#F0F9FF]
   /* Light pink to blue background */
   
   from-[#FFE5EF] to-[#E9D5FF]
   /* Pink to purple card backgrounds */
   ```

#### How to Change Gradients

**Example: Changing Hero Section Gradient**

File: `/components/KidspirationHero.tsx`

Original:
```typescript
gradient: 'from-teal-400 via-cyan-500 to-blue-500'
```

To change to pink-purple:
```typescript
gradient: 'from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4]'
```

**Find and Replace Guide:**
- `from-[#FF6B9D]` - Starting pink color
- `via-[#A78BFA]` - Middle purple color
- `to-[#4ECDC4]` - Ending teal color

### Typography Variables

**Location**: `/styles/globals.css`

```css
/* Headings */
h1 { font-size: 48px; font-weight: 800; }
h2 { font-size: 36px; font-weight: 700; }
h3 { font-size: 28px; font-weight: 700; }
h4 { font-size: 24px; font-weight: 600; }

/* Font Family */
font-family: 'Nunito', sans-serif;
```

**To Change Font:**
1. Update the Google Font import in `/styles/globals.css`
2. Replace `Nunito` with your preferred font

### Key Component Styling Locations

#### 1. Navigation Bar
**File**: `/components/Navigation.tsx`
- Background: `bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400`
- Height: `h-20`

#### 2. Hero Slides
**File**: `/components/KidspirationHero.tsx`
- Slide data: Lines 15-72 (contains gradient configurations per slide)
```typescript
const slides = [
  {
    title: "...",
    gradient: 'from-teal-400 via-cyan-500 to-blue-500',
    // Change this for each slide
  }
]
```

#### 3. Buttons (Primary CTA)
Global button style pattern:
```tsx
className="px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-white rounded-full hover:shadow-xl transform hover:scale-105 transition-all"
```

#### 4. Cards & Sections
Common card background:
```tsx
className="bg-white rounded-3xl p-8 shadow-xl"
```

### Tailwind Configuration

**File**: `/styles/globals.css`

The project uses Tailwind CSS v4.0. Custom colors are defined inline using bracket notation:
- `bg-[#FF6B9D]` - Custom hex color
- `text-[24px]` - Custom font size

**To add global color variables:**
```css
@theme {
  --color-kidspiration-pink: #FF6B9D;
  --color-kidspiration-purple: #A78BFA;
  --color-kidspiration-teal: #4ECDC4;
}
```

Then use: `bg-kidspiration-pink`

### Icon Configuration

**Library**: Lucide React

**Usage Example:**
```tsx
import { Heart, MapPin, Trophy } from 'lucide-react';

<Heart className="w-6 h-6 text-[#FF6B9D]" />
```

**Common Icon Sizes:**
- Small: `w-4 h-4`
- Medium: `w-6 h-6`
- Large: `w-12 h-12`

---

## Backend Integration Guide

### Current Backend Architecture

The app currently uses **Supabase** with this architecture:

```
Frontend (React/Vite)
    ↓
Supabase Edge Functions (Hono Server)
    ↓
Supabase PostgreSQL Database (KV Store)
```

**Key Files:**
- Frontend API calls: `/utils/AuthContext.tsx`
- Server: `/supabase/functions/server/index.tsx`
- Database helpers: `/supabase/functions/server/kv_store.tsx`
- Config: `/utils/supabase/info.tsx`

### Migrating to PHP/MySQL Backend

#### Step 1: Set Up PHP Backend

**Create PHP API Structure:**
```
backend/
├── config/
│   └── database.php
├── api/
│   ├── auth.php
│   ├── users.php
│   ├── analytics.php
│   └── stories.php
└── .htaccess
```

**1. Database Configuration** (`config/database.php`):
```php
<?php
class Database {
    private $host = "localhost";
    private $db_name = "kidspiration_db";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>
```

**2. Create MySQL Database:**
```sql
CREATE DATABASE kidspiration_db;

USE kidspiration_db;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    user_type ENUM('kid', 'parent', 'pastor', 'admin') DEFAULT 'kid',
    title VARCHAR(50),
    age INT,
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sessions Table
CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    token VARCHAR(255) UNIQUE,
    expires_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Analytics Table
CREATE TABLE analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    page_visited VARCHAR(255),
    visit_date DATE,
    visit_count INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- KV Store Table (for compatibility)
CREATE TABLE kv_store (
    key_name VARCHAR(255) PRIMARY KEY,
    value_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**3. Authentication API** (`api/auth.php`):
```php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$request = json_decode(file_get_contents('php://input'), true);

switch($method) {
    case 'POST':
        if (isset($request['action'])) {
            switch($request['action']) {
                case 'signup':
                    signup($db, $request);
                    break;
                case 'signin':
                    signin($db, $request);
                    break;
                case 'signout':
                    signout($db, $request);
                    break;
            }
        }
        break;
}

function signup($db, $data) {
    $query = "INSERT INTO users (email, password_hash, first_name, last_name, user_type, title, age, country) 
              VALUES (:email, :password, :firstName, :lastName, :userType, :title, :age, :country)";
    
    $stmt = $db->prepare($query);
    
    $passwordHash = password_hash($data['password'], PASSWORD_BCRYPT);
    
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':password', $passwordHash);
    $stmt->bindParam(':firstName', $data['firstName']);
    $stmt->bindParam(':lastName', $data['lastName']);
    $stmt->bindParam(':userType', $data['type']);
    $stmt->bindParam(':title', $data['title']);
    $stmt->bindParam(':age', $data['age']);
    $stmt->bindParam(':country', $data['country']);
    
    if($stmt->execute()) {
        $userId = $db->lastInsertId();
        $token = bin2hex(random_bytes(32));
        
        // Create session
        $sessionQuery = "INSERT INTO sessions (user_id, token, expires_at) VALUES (:userId, :token, DATE_ADD(NOW(), INTERVAL 30 DAY))";
        $sessionStmt = $db->prepare($sessionQuery);
        $sessionStmt->bindParam(':userId', $userId);
        $sessionStmt->bindParam(':token', $token);
        $sessionStmt->execute();
        
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $userId,
                'email' => $data['email'],
                'firstName' => $data['firstName'],
                'lastName' => $data['lastName'],
                'type' => $data['type']
            ],
            'token' => $token
        ]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Signup failed']);
    }
}

function signin($db, $data) {
    $query = "SELECT * FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data['email']);
    $stmt->execute();
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($data['password'], $user['password_hash'])) {
        $token = bin2hex(random_bytes(32));
        
        // Create session
        $sessionQuery = "INSERT INTO sessions (user_id, token, expires_at) VALUES (:userId, :token, DATE_ADD(NOW(), INTERVAL 30 DAY))";
        $sessionStmt = $db->prepare($sessionQuery);
        $sessionStmt->bindParam(':userId', $user['id']);
        $sessionStmt->bindParam(':token', $token);
        $sessionStmt->execute();
        
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'firstName' => $user['first_name'],
                'lastName' => $user['last_name'],
                'type' => $user['user_type']
            ],
            'token' => $token
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
}

function signout($db, $data) {
    $query = "DELETE FROM sessions WHERE token = :token";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':token', $data['token']);
    
    if($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Signout failed']);
    }
}
?>
```

#### Step 2: Update Frontend to Use PHP Backend

**1. Create API Configuration** (`/utils/api-config.tsx`):
```typescript
export const API_BASE_URL = 'https://yourdomain.com/api';
// or for local development: 'http://localhost/kidspiration-backend/api'

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/auth.php`,
  USERS: `${API_BASE_URL}/users.php`,
  ANALYTICS: `${API_BASE_URL}/analytics.php`,
  STORIES: `${API_BASE_URL}/stories.php`,
};
```

**2. Update AuthContext** (`/utils/AuthContext.tsx`):

Replace Supabase calls with fetch calls to your PHP backend:

```typescript
// OLD (Supabase):
const { data, error } = await supabase.auth.signUp({
  email,
  password,
});

// NEW (PHP):
const response = await fetch(API_ENDPOINTS.AUTH, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    action: 'signup',
    email,
    password,
    firstName,
    lastName,
    type: userType,
    title,
    age,
    country,
  }),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data.error || 'Signup failed');
}

// Store token in localStorage
localStorage.setItem('auth_token', data.token);
```

**3. Create API Helper** (`/utils/api-helper.tsx`):
```typescript
import { API_ENDPOINTS } from './api-config';

export async function apiRequest(
  endpoint: string,
  method: string = 'GET',
  data?: any
) {
  const token = localStorage.getItem('auth_token');
  
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(endpoint, options);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

// Usage:
// const user = await apiRequest(API_ENDPOINTS.USERS, 'GET');
```

**4. Update All API Calls:**

Find and replace pattern:
```typescript
// OLD:
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-17ebb09b/route`,
  {
    headers: { Authorization: `Bearer ${publicAnonKey}` },
  }
);

// NEW:
const response = await apiRequest(API_ENDPOINTS.ROUTE, 'POST', data);
```

#### Step 3: Deploy PHP Backend

**Option A: Shared Hosting (cPanel)**
1. Upload backend files via FTP to your hosting
2. Create MySQL database via cPanel
3. Import SQL schema
4. Update `database.php` with your credentials

**Option B: VPS/Cloud Server**
1. Install LAMP stack (Linux, Apache, MySQL, PHP)
2. Configure Apache virtual host
3. Set up SSL certificate (Let's Encrypt)
4. Deploy your PHP files

### Alternative Backend Options

#### Node.js + Express + MySQL

**Server Setup** (`server.js`):
```javascript
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kidspiration_db',
  waitForConnections: true,
  connectionLimit: 10,
});

app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.execute(
      'INSERT INTO users (email, password_hash, first_name, last_name, user_type) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, firstName, lastName, type]
    );
    
    res.json({ success: true, userId: result.insertId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

#### Firebase Backend

**Setup:**
```bash
npm install firebase
```

**Configuration** (`/utils/firebase-config.tsx`):
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## Project Structure

```
kidspiration/
├── App.tsx                          # Main app component, routing
├── components/
│   ├── Navigation.tsx               # Top navigation bar
│   ├── KidspirationHero.tsx         # Hero carousel section
│   ├── AuthModal.tsx                # Login/Signup modal
│   ├── AdminPanel.tsx               # Admin dashboard
│   ├── ImpactStoriesPage.tsx        # Impact stories listing
│   ├── LiveTVPage.tsx               # Live streaming page
│   ├── GamesPage.tsx                # Games selection page
│   ├── games/                       # Individual game components
│   │   ├── WordSearchGame.tsx
│   │   ├── BibleQuiz.tsx
│   │   └── ...
│   └── ui/                          # Reusable UI components (shadcn/ui)
├── utils/
│   ├── AuthContext.tsx              # Authentication state management
│   └── supabase/
│       └── info.tsx                 # Supabase configuration
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx            # Hono server (backend API)
│           └── kv_store.tsx         # Database helper functions
├── styles/
│   └── globals.css                  # Global styles, Tailwind config
└── imports/                         # Figma imported assets
```

### Key Component Relationships

```
App.tsx
  ├── Navigation (always visible)
  ├── AuthModal (conditional)
  ├── BackgroundEffects (decorative)
  └── Page Components (route-based)
      ├── Home
      │   ├── KidspirationHero
      │   ├── GlowfestSection
      │   └── JoinExploreSection
      ├── Games
      │   └── Individual Game Components
      ├── Impact Stories
      ├── Live TV
      └── Admin Panel
```

---

## Environment Variables

### Required Variables

Create a `.env` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres

# Custom Backend (if migrating)
VITE_API_BASE_URL=https://yourdomain.com/api

# Google Analytics (optional)
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Environment
VITE_APP_ENV=production
```

### Accessing Environment Variables

In Vite apps, prefix with `VITE_`:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Security Best Practices

1. **Never commit `.env` to Git**
   - Add `.env` to `.gitignore`

2. **Use different keys for development/production**

3. **Rotate keys periodically**

4. **Store service role keys only on server-side**

---

## Troubleshooting

### Common Issues

#### 1. "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. Port already in use
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

#### 3. Supabase connection errors
- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure API keys haven't been rotated
- Check CORS settings in Supabase dashboard

#### 4. Build errors
```bash
# Type check
npm run type-check

# Clear cache
rm -rf .vite
npm run build
```

#### 5. Image loading issues
- Ensure images are in `/public` folder or imported correctly
- Check ImageWithFallback component is being used
- Verify image URLs are accessible

#### 6. Authentication not working
- Clear browser localStorage: `localStorage.clear()`
- Check network tab for API errors
- Verify Supabase Auth is enabled in dashboard
- Check email confirmations are disabled (email_confirm: true in signup)

### Development Tips

1. **Enable React DevTools**
   - Install: https://react.dev/learn/react-developer-tools

2. **Check console logs**
   - Open browser DevTools (F12)
   - Look for errors in Console tab

3. **Monitor network requests**
   - DevTools → Network tab
   - Filter by XHR/Fetch to see API calls

4. **Hot reload not working?**
   - Restart dev server
   - Check if file is in `src` directory

### Performance Optimization

1. **Optimize images**
   - Use WebP format
   - Compress images before uploading
   - Use appropriate sizes

2. **Code splitting**
   - Lazy load routes:
   ```typescript
   const GamesPage = lazy(() => import('./components/GamesPage'));
   ```

3. **Bundle analysis**
   ```bash
   npm run build
   npx vite-bundle-visualizer
   ```

---

## Maintenance Guide

### Regular Tasks

1. **Update dependencies monthly**
   ```bash
   npm outdated
   npm update
   ```

2. **Security audits**
   ```bash
   npm audit
   npm audit fix
   ```

3. **Database backups**
   - Supabase: Automatic backups on paid plans
   - Manual export: Supabase Dashboard → Database → Backup

4. **Monitor analytics**
   - Check Admin Panel for user activity
   - Review error logs in Supabase

### Updating Content

**Hero Slides** (`/components/KidspirationHero.tsx`):
```typescript
const slides = [
  {
    image: 'URL_TO_IMAGE',
    title: 'Your Title',
    subtitle: 'Your Subtitle',
    description: 'Your Description',
    gradient: 'from-teal-400 via-cyan-500 to-blue-500',
    ctaText: 'Button Text',
    ctaAction: 'join' // or 'watch', 'games', 'impact'
  },
  // Add more slides...
];
```

**Blog Posts** (`/components/blogPosts.ts`):
```typescript
export const blogPosts = [
  {
    id: 1,
    title: 'Your Post Title',
    excerpt: 'Short description...',
    content: 'Full content here...',
    image: 'IMAGE_URL',
    date: '2025-01-01',
    category: 'Stories',
  },
];
```

### Backup Strategy

1. **Code**: Use Git version control
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```

2. **Database**: Export from Supabase weekly

3. **Assets**: Keep originals in separate folder

---

## How to Change Images Across the App

### Understanding Image Types in Kidspiration

The app uses three types of images:

1. **Figma Imported Images** - Images from Figma designs (uses `figma:asset/` paths)
2. **Dynamic Images** - User-uploaded or external images (uses ImageWithFallback component)
3. **SVG Graphics** - Vector graphics imported from `/imports` directory

### 1. Changing Hero Carousel Images

**Location**: `/components/KidspirationHero.tsx`

The hero carousel uses Figma-imported images. Each slide has an `image` property:

```typescript
const slides = [
  {
    id: 1,
    title: "Take Off with Kidspiration!",
    image: image_0a7cbf864b8e6de8cbd28879a11b16d402dba0e9, // This is the imported image
    gradient: "from-yellow-400 via-blue-400 to-cyan-500",
    // ... other properties
  },
];
```

**How to update:**

**Step 1**: Import your new image at the top of the file:
```typescript
// Add this line with other imports
import image_YOUR_NEW_IMAGE from 'figma:asset/YOUR_IMAGE_HASH.png';
```

**Step 2**: Replace the image reference in the slides array:
```typescript
const slides = [
  {
    id: 1,
    title: "Take Off with Kidspiration!",
    image: image_YOUR_NEW_IMAGE, // Change this
    // ... rest stays the same
  },
];
```

**Note**: The image hash is provided when you import a design from Figma. If you're adding an external image, see section 3 below.

**Image Specifications**:
- Recommended size: **1080x1080 pixels** (square format)
- Format: PNG or JPG
- The hero uses `aspect-square` with `object-contain`, so square images work best

### 2. Changing Other Figma-Imported Images

Many components use Figma-imported images. Here's how to find and replace them:

**Finding image imports:**
```bash
# Search for figma:asset imports in your code
grep -r "figma:asset" components/
```

**Example locations:**
- Hero slides: `/components/KidspirationHero.tsx`
- Glowfest section: `/components/GlowfestSection.tsx`
- ER100 section: `/components/ER100Section.tsx`
- About page: `/components/AboutPage.tsx`

**Replacement pattern:**
```typescript
// OLD:
import oldImage from 'figma:asset/abc123.png';
<img src={oldImage} alt="Description" />

// NEW:
import newImage from 'figma:asset/xyz789.png';
<img src={newImage} alt="Description" />
```

### 3. Adding New Images (External/Uploaded)

For images **NOT** from Figma imports, use the `ImageWithFallback` component:

**Step 1**: Import the component:
```typescript
import { ImageWithFallback } from './figma/ImageWithFallback';
```

**Step 2**: Use it in your component:
```typescript
<ImageWithFallback
  src="https://your-image-url.com/image.jpg"
  alt="Description of image"
  className="w-full h-full object-cover rounded-lg"
/>
```

**Benefits of ImageWithFallback:**
- Automatic fallback to placeholder if image fails to load
- Works exactly like the standard `<img>` tag
- Handles loading states gracefully

**Example use cases:**
- User profile pictures
- Dynamic content images
- External CDN images
- Unsplash images

### 4. Changing SVG Graphics

**Location**: `/imports` directory

SVG components are imported from individual files:

```typescript
// Example imports
import svgPaths from "./imports/svg-component";
import Frame1 from "./imports/Frame1";
```

**To update an SVG:**

**Option A - Replace the file:**
1. Locate the SVG file in `/imports/`
2. Replace the contents while keeping the same filename
3. The component will automatically use the updated SVG

**Option B - Add new SVG:**
1. Create a new file in `/imports/` (e.g., `NewGraphic.tsx`)
2. Export your SVG as a React component:
```tsx
export default function NewGraphic() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {/* Your SVG paths */}
    </svg>
  );
}
```
3. Import and use it:
```typescript
import NewGraphic from './imports/NewGraphic';

<NewGraphic />
```

### 5. Hero Slide Image Quick Reference

Current hero slides and their images:

| Slide # | Title | Image Variable | Purpose |
|---------|-------|----------------|---------|
| 1 | Take Off with Kidspiration | `image_0a7cbf864b8e6de8cbd28879a11b16d402dba0e9` | Welcome slide |
| 2 | ER100 Campaign | `image_df5ddd2e48a69f07c2a5ea948154814462659579` | ER100 Hero enrollment |
| 3 | HTTN Magazine | `image_4f9488c7a65b0ab8875c64ffff889f8f25e9d7d6` | Magazine feature |
| 4 | Translators Network | `image_bb07a1601daf44f77a41d1ac57e45dc5ac294a33` | Translator recruitment |

### 6. Batch Image Updates

If you need to update multiple images at once:

**Method 1 - Find and Replace:**
1. Open the file in your code editor
2. Use Find & Replace (Ctrl/Cmd + F)
3. Search for: `image_OLD_HASH`
4. Replace with: `image_NEW_HASH`

**Method 2 - Update Import Statements:**
```typescript
// Before
import heroImage from 'figma:asset/old-hash.png';
import featureImage from 'figma:asset/old-hash-2.png';

// After - just change the hash in the import path
import heroImage from 'figma:asset/new-hash.png';
import featureImage from 'figma:asset/new-hash-2.png';
```

### 7. Image Best Practices

**Performance:**
- Use WebP format when possible for better compression
- Optimize images before importing (use tools like TinyPNG)
- Keep hero images under 500KB for faster loading

**Accessibility:**
- Always include meaningful `alt` text
- Avoid putting important text in images (use text overlays instead)

**Responsive Design:**
- Hero images use 1:1 aspect ratio (square)
- Other images may need different aspect ratios
- Test on mobile and desktop views

**Example - Responsive image:**
```tsx
<ImageWithFallback
  src={yourImage}
  alt="Descriptive text"
  className="w-full aspect-square lg:aspect-video object-cover"
  // Square on mobile, 16:9 on desktop
/>
```

### 8. Troubleshooting Image Issues

**Problem**: Image not showing
- Check the import path is correct
- Verify the `figma:asset/` hash matches
- Check browser console for 404 errors
- Ensure ImageWithFallback is imported

**Problem**: Image is cropped or stretched
- Check the container's aspect ratio
- Use `object-contain` instead of `object-cover` for full image display
- Verify image dimensions match container expectations

**Problem**: Slow loading
- Compress images (aim for < 500KB)
- Use lazy loading for images below the fold
- Consider using a CDN for static assets

**Problem**: Wrong image displayed
- Clear browser cache (Ctrl + F5)
- Check if the correct variable is being used
- Verify the import statement matches the usage

---

## How to Update CTA Links, Video Links, and URLs

### Understanding Links in Kidspiration

The app uses several types of links that serve different purposes:

1. **CTA (Call-to-Action) Links** - Buttons that trigger specific actions
2. **Video Links** - URLs for video content (embedded or external)
3. **External URLs** - Links to external websites and resources
4. **Internal Navigation** - Routes within the app
5. **Social Media Links** - Footer links to social platforms

---

### 1. Hero Carousel CTA Links

**Location**: `/components/KidspirationHero.tsx`

Each hero slide has a CTA button with an action. The `handleCTA` function determines what happens when clicked.

#### Current CTA Actions:

```typescript
const handleCTA = (action: string) => {
  if (action === "join" && onAuthClick) {
    onAuthClick();  // Opens signup/login modal
  } else if (action === "httn") {
    window.open(HTTN_MAGAZINE_URL, "_blank");  // Opens HTTN Magazine
  } else if (action === "explore") {
    onNavigate?.("explore");  // Navigates to Explore page
  } else if (action === "translators") {
    onNavigate?.("translators-network");  // Navigates to Translators page
  }
};
```

#### How to Update Hero CTA Actions:

**Option 1: Change existing action behavior**

Edit the `handleCTA` function to change where a button goes:

```typescript
// OLD: Opens HTTN Magazine
else if (action === "httn") {
  window.open(HTTN_MAGAZINE_URL, "_blank");
}

// NEW: Navigate to a different page
else if (action === "httn") {
  onNavigate?.("httn-magazine-page");
}

// OR: Open a different external URL
else if (action === "httn") {
  window.open("https://new-magazine-url.com", "_blank");
}
```

**Option 2: Add a new CTA action**

1. Add your new action to the `handleCTA` function:

```typescript
const handleCTA = (action: string) => {
  if (action === "join" && onAuthClick) {
    onAuthClick();
  } else if (action === "httn") {
    window.open(HTTN_MAGAZINE_URL, "_blank");
  } else if (action === "explore") {
    onNavigate?.("explore");
  } else if (action === "translators") {
    onNavigate?.("translators-network");
  } else if (action === "newaction") {  // ADD THIS
    window.open("https://your-new-link.com", "_blank");
  }
};
```

2. Update a slide to use the new action:

```typescript
const slides = [
  {
    id: 1,
    title: "Your Title",
    ctaText: "Click Here",
    ctaAction: "newaction",  // Use your new action
    // ... other properties
  },
];
```

**Option 3: Update CTA button text**

Change the `ctaText` property in the slides array:

```typescript
const slides = [
  {
    id: 1,
    title: "Take Off with Kidspiration!",
    ctaText: "Get Started",  // Change this text
    ctaAction: "explore",
    // ... other properties
  },
];
```

---

### 2. External URL Constants

**Location**: `/components/DashboardPage.tsx`

The app defines important URLs as constants for easy updating:

```typescript
// Line 31
export const HTTN_MAGAZINE_URL = '#httn-magazine';
```

#### How to Update External URLs:

**Step 1**: Locate the URL constant in `DashboardPage.tsx`:

```typescript
// OLD - Placeholder
export const HTTN_MAGAZINE_URL = '#httn-magazine';

// NEW - Real URL
export const HTTN_MAGAZINE_URL = 'https://httn-magazine.kidspiration.org';
```

**Step 2**: This URL is automatically used in multiple places:
- Hero carousel HTTN slide
- Dashboard featured section
- Quick action buttons

**Common External URLs to Update:**

| Constant | Current Value | Location | Purpose |
|----------|---------------|----------|---------|
| `HTTN_MAGAZINE_URL` | `#httn-magazine` | DashboardPage.tsx | HTTN Magazine link |
| Healing Streams TV | `https://healingstreams.tv/kids/` | DashboardPage.tsx (line 187) | Live TV redirect |

---

### 3. Video Links

Videos in the app are defined in component files in the `/imports` directory.

#### Updating Video URLs:

**Location**: `/imports/GlowfestVideo.tsx`

```typescript
export default function GlowfestVideo() {
  return (
    <div className="relative w-full h-full" data-name="Glowfest Video">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://kidspiration.org/videos/kids_vid.mp4"  // UPDATE THIS URL
        controls
        controlsList="nodownload"
        playsInline
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
```

#### Video Components in the App:

| File | Purpose | Default URL |
|------|---------|-------------|
| `/imports/GlowfestVideo.tsx` | Glowfest promotional video | `https://kidspiration.org/videos/kids_vid.mp4` |
| `/imports/HomepageGlowfestVideo.tsx` | Homepage Glowfest section | (Check file) |
| `/imports/KidspirationVideo.tsx` | General Kidspiration video | (Check file) |

**How to change:**

1. Open the video component file (e.g., `/imports/GlowfestVideo.tsx`)
2. Find the `src="..."` line
3. Replace with your new video URL:

```typescript
src="https://your-cdn.com/new-video.mp4"
```

#### YouTube/Vimeo Embed Videos:

If you want to use YouTube or Vimeo instead of direct video files:

**YouTube:**
```typescript
export default function YouTubeVideo() {
  return (
    <div className="relative w-full h-full">
      <iframe
        className="absolute inset-0 w-full h-full"
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
        title="Video title"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
```

**Vimeo:**
```typescript
export default function VimeoVideo() {
  return (
    <div className="relative w-full h-full">
      <iframe
        className="absolute inset-0 w-full h-full"
        src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
        title="Video title"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
```

---

### 4. Live Stream Configuration

**Location**: `/components/LiveStream.tsx`

The live stream countdown component has a configurable date:

```typescript
// Line 10
const targetDate = new Date('2025-11-10T12:00:00').getTime();
```

#### How to Update Live Stream Date:

**Change the date and time:**

```typescript
// Format: 'YYYY-MM-DDTHH:MM:SS'
const targetDate = new Date('2026-03-15T14:30:00').getTime();
// March 15, 2026 at 2:30 PM
```

#### Adding Actual Live Stream URL:

When ready to go live, replace the placeholder in `/components/LiveTVPage.tsx`:

**OLD (Placeholder):**
```tsx
<div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-500 to-pink-500">
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center text-white space-y-4">
      <p className="text-2xl font-bold">Live Stream Coming Soon!</p>
    </div>
  </div>
</div>
```

**NEW (With Live Stream):**
```tsx
<div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
  <iframe
    className="w-full h-full"
    src="https://your-streaming-platform.com/embed/stream-id"
    title="Kidspiration Live TV"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
  />
</div>
```

---

### 5. Dashboard Quick Actions

**Location**: `/components/DashboardPage.tsx`

Quick action buttons in the dashboard have URLs defined inline:

```typescript
// Around line 187
{
  title: 'Watch Live TV',
  icon: Video,
  gradient: 'from-[#A78BFA] to-[#8B5CF6]',
  action: () => window.open('https://healingstreams.tv/kids/', '_blank'),
  delay: 0.2,
  emoji: '📺',
}
```

#### How to Update:

Find the action you want to change and update the URL:

```typescript
// OLD
action: () => window.open('https://healingstreams.tv/kids/', '_blank'),

// NEW
action: () => window.open('https://your-new-url.com', '_blank'),

// OR navigate internally
action: () => onNavigate?.('live-tv'),
```

---

### 6. Footer Social Media Links

**Location**: `/components/Footer.tsx`

Social media links in the footer:

```typescript
<a
  href="#"  // UPDATE THESE
  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
>
  <Facebook className="w-5 h-5" />
</a>
```

#### How to Update:

Replace `href="#"` with your actual social media URLs:

```typescript
// Facebook
<a href="https://facebook.com/kidspirationorg" target="_blank" rel="noopener noreferrer">
  <Facebook className="w-5 h-5" />
</a>

// Instagram
<a href="https://instagram.com/kidspirationorg" target="_blank" rel="noopener noreferrer">
  <Instagram className="w-5 h-5" />
</a>

// YouTube
<a href="https://youtube.com/@kidspirationorg" target="_blank" rel="noopener noreferrer">
  <Youtube className="w-5 h-5" />
</a>
```

**Important**: Always include:
- `target="_blank"` - Opens in new tab
- `rel="noopener noreferrer"` - Security best practice

---

### 7. Navigation Routes

**Location**: `/components/Navigation.tsx`

Internal page navigation is defined in the `navItems` array:

```typescript
const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'About Kidspiration', page: 'about' },
  { label: 'Explore', page: 'explore' },
  { label: 'Live TV', page: 'live-tv' },
  { label: 'Impact Stories', page: 'impact-stories' },
];
```

#### How to Add/Remove Navigation Items:

**Add a new nav item:**
```typescript
const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'About Kidspiration', page: 'about' },
  { label: 'Explore', page: 'explore' },
  { label: 'Live TV', page: 'live-tv' },
  { label: 'Impact Stories', page: 'impact-stories' },
  { label: 'Shop', page: 'marketplace' },  // NEW ITEM
];
```

**Remove a nav item:**
```typescript
// Just delete or comment out the line:
// { label: 'Live TV', page: 'live-tv' },
```

**Rename a nav item:**
```typescript
// Change the 'label' property:
{ label: 'Stories', page: 'impact-stories' },  // Was: 'Impact Stories'
```

---

### 8. Complete URL Reference Guide

#### Quick Find: All URLs in the App

| URL Type | Location | Line | Current Value | How to Update |
|----------|----------|------|---------------|---------------|
| HTTN Magazine | DashboardPage.tsx | 31 | `#httn-magazine` | Change constant value |
| Healing Streams TV | DashboardPage.tsx | 187 | `https://healingstreams.tv/kids/` | Update URL in action function |
| Glowfest Video | imports/GlowfestVideo.tsx | 6 | `https://kidspiration.org/videos/kids_vid.mp4` | Change `src` attribute |
| Flag Images | Navigation.tsx | 49 | `https://flagcdn.com/w40/{code}.png` | Update getFlagUrl function |
| Social Media (Facebook) | Footer.tsx | ~29 | `#` | Replace with real URL |
| Social Media (Instagram) | Footer.tsx | ~35 | `#` | Replace with real URL |
| Social Media (YouTube) | Footer.tsx | ~41 | `#` | Replace with real URL |
| Privacy Policy | Footer.tsx | ~63 | `#` | Replace with real URL |
| Terms of Service | Footer.tsx | ~66 | `#` | Replace with real URL |
| Live Stream Date | LiveStream.tsx | 10 | `2025-11-10T12:00:00` | Update date string |

---

### 9. Best Practices for URLs

#### Security:
```typescript
// GOOD - External links with security
<a href="https://example.com" target="_blank" rel="noopener noreferrer">

// BAD - Missing security attributes
<a href="https://example.com" target="_blank">
```

#### Performance:
- Use constants for repeated URLs (like `HTTN_MAGAZINE_URL`)
- Avoid hardcoding the same URL in multiple places
- Use environment variables for API endpoints

#### User Experience:
- External links should open in new tabs (`target="_blank"`)
- Internal navigation should use the `onNavigate` function
- Always provide feedback when links are clicked (loading states, etc.)

---

### 10. Testing Your Link Updates

After updating links, test these scenarios:

**1. Hero CTA buttons:**
- Click each CTA button
- Verify it goes to the correct destination
- Check that external links open in new tabs

**2. Dashboard actions:**
- Test all quick action buttons
- Verify external URLs work
- Check internal navigation functions

**3. Video playback:**
- Load pages with videos
- Verify videos load correctly
- Test on mobile devices

**4. Footer links:**
- Click all social media icons
- Verify Privacy Policy/Terms links
- Check links open in new tabs

**5. Navigation:**
- Test all navigation menu items
- Verify active page highlighting
- Check mobile menu functionality

---

### 11. Common Issues & Troubleshooting

**Problem**: Link doesn't work
- Check for typos in the URL
- Verify the URL starts with `http://` or `https://`
- Test the URL directly in browser first

**Problem**: CTA button does nothing
- Check the `ctaAction` value matches a case in `handleCTA`
- Verify the action function is defined
- Check browser console for errors

**Problem**: Video won't play
- Verify video URL is accessible
- Check video format is supported (MP4 recommended)
- Ensure CORS headers allow embedding
- Test video URL directly in browser

**Problem**: Navigation broken after adding new route
- Ensure the page component is imported in `App.tsx`
- Verify the route is added to the routing logic
- Check spelling matches exactly between navItems and App.tsx

**Problem**: External link blocked by browser
- Check mixed content (HTTPS page linking to HTTP)
- Verify target site allows embedding (for iframes)
- Add appropriate `rel` attributes for security

---

### 12. Environment-Specific URLs

For URLs that change between development and production:

**Create environment-specific configuration:**

```typescript
// utils/config.tsx
const isDevelopment = import.meta.env.DEV;

export const CONFIG = {
  HTTN_MAGAZINE_URL: isDevelopment 
    ? 'http://localhost:3000/magazine' 
    : 'https://httn-magazine.kidspiration.org',
  
  LIVE_TV_URL: isDevelopment
    ? 'http://localhost:3000/tv'
    : 'https://healingstreams.tv/kids/',
    
  API_BASE_URL: isDevelopment
    ? 'http://localhost:8000'
    : 'https://api.kidspiration.org',
};
```

**Usage:**
```typescript
import { CONFIG } from '../utils/config';

// Use config instead of hardcoded URL
window.open(CONFIG.HTTN_MAGAZINE_URL, '_blank');
```

---

## Support & Resources

### Official Documentation
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Supabase: https://supabase.com/docs
- Vite: https://vitejs.dev

### Community
- React Discord: https://discord.gg/react
- Supabase Discord: https://discord.supabase.com

### Getting Help

1. Check this documentation first
2. Search error messages in browser DevTools
3. Review Supabase logs in dashboard
4. Check GitHub issues for similar problems

---

## License & Credits

This project uses:
- React (MIT License)
- Tailwind CSS (MIT License)
- Supabase (Apache 2.0 License)
- Lucide Icons (ISC License)

See `Attributions.md` for full credits.

---

**Last Updated**: November 2025  
**Version**: 1.0.0
