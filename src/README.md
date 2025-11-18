# Kidspiration - Healing to the Nations (HTTN)

A global children's ministry platform serving kids aged 0-12, parents/teachers, and pastors/leaders worldwide.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app should now be running!

### If you see a blank page:

1. **Open browser console** (F12 or Right-click → Inspect → Console tab)
2. **Check for errors** - Look for red error messages
3. **Common fixes:**
   - Clear browser cache (Ctrl+Shift+Delete)
   - Delete `node_modules` folder and run `npm install` again
   - Make sure all dependencies installed successfully

## 📦 Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## 🔧 Environment Setup (Optional)

If you want to use the full backend features:

1. Copy `.env.example` to `.env`
2. Update with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

## 📂 Project Structure

```
├── App.tsx                 # Main application component
├── components/            # React components
│   ├── games/            # Interactive games
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── styles/               # CSS styles
├── utils/                # Utilities and helpers
└── supabase/             # Backend functions
```

## 🎮 Features

- **User Authentication** (Kids, Parents, Pastors)
- **Interactive Games** (Bible Quiz, Puzzles, Word Search, etc.)
- **Live TV Streaming**
- **Impact Stories**
- **Admin Dashboard**
- **Birthday Celebrations**
- **Multi-user Types with Age-based Titles**

## 🐛 Troubleshooting

### Blank White Page
- Check browser console for errors
- Ensure all files were extracted
- Try: `npm install` then `npm run dev`

### Port Already in Use
- Change port in `vite.config.ts`
- Or stop other apps using port 3000

### Import Errors
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and run `npm install` again

## 💡 Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS 4.0** - Styling
- **Supabase** - Backend & Database
- **Motion** - Animations
- **Recharts** - Analytics Charts

## 📝 License

Copyright © Loveworld Church - Kidspiration Ministry

---

For more information, visit [Kidspiration.org](https://kidspiration.org)
