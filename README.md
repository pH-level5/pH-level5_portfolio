# Plu101 Personal Portfolio

A modern, interactive personal portfolio website featuring a tech-driven dashboard design, project showcase, and markdown-powered blog system.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://plu101.github.io/personal_profile)
[![HTML](https://img.shields.io/badge/HTML-5-orange)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-3-blue)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Features

### Interactive Dashboard
- **Multi-section navigation**: Profile, Projects, Store, Blog, and Support sections
- **Animated background**: Canvas-based particle system with interactive mouse effects
- **3D card effects**: Modern glassmorphic card designs with hover animations
- **Smooth transitions**: Seamless section switching with fade animations
- **Responsive design**: Fully responsive layout for all screen sizes

### Profile Section
- Expandable "About Me" with typewriter effect
- Animated statistics counters (Downloads, Subscribers)
- Tech stack showcase with badges
- Skills and interests display

### Projects Showcase
- Featured project cards with thumbnails
- Project status indicators (Active, Stable, Released)
- Technology tags for each project
- External links to demos and source code

### Asset Store
- 3D rotating Banner display
- Unreal Engine marketplace integration
- Custom asset request contact form
- Development progress indicators

### Blog System 🌟
The blog implementation uses a **Markdown-to-HTML parsing pipeline** with **automatic card generation** from YAML frontmatter:

**How It Works:**
1. **Write posts in Markdown** - Create `.md` files in `blog/posts/` directory with YAML frontmatter
2. **Automatic card generation** - JavaScript scans markdown files and generates blog cards automatically
3. **Metadata extraction** - YAML frontmatter provides all card information (title, date, tags, icons, etc.)
4. **Dual display modes**:
   - **Timeline cards**: Auto-generated summary cards with metadata
   - **Full post view**: Complete rendered Markdown with proper styling

**Adding a New Blog Post (New Easy Method!):**

1. Create a new `.md` file in `blog/posts/` (e.g., `my-awesome-post.md`)
2. Add YAML frontmatter at the top:

```markdown
---
title: "Your Awesome Blog Post Title"
date: "DEC 15, 2025"
description: "A brief summary of your post that appears in the timeline card."
tags: [JavaScript, Tutorial, WebDev]
category: TUTORIAL
icon: fas fa-code
readTime: 5 min read
status: TUTORIAL
---

# Your Blog Post Title

Your content here with **bold**, *italic*, `code`, and more!

## Sections
- Lists
- Links  
- Code blocks

All standard Markdown syntax supported!
```

3. Add the filename to `blog/blog-index.json`:
```json
{
  "posts": [
    "10k-downloads.md",
    "3d-modeling-basics.md",
    "my-awesome-post.md"
  ]
}
```

**That's it!** The blog card will be automatically generated and displayed in the timeline. No manual HTML required!

**YAML Frontmatter Fields:**
- `title` - Post title (shown in card header)
- `date` - Display date (e.g., "NOV 4, 2025")
- `description` - Summary text for card preview
- `tags` - Array of tags (e.g., `[JavaScript, React, Tutorial]`)
- `category` - Category label (shown as status badge)
- `icon` - Font Awesome icon class (e.g., `fas fa-rocket`)
- `readTime` - Estimated reading time (e.g., "5 min read")
- `status` - Status badge text (defaults to category)

**Fallback Mode:** If you don't include YAML frontmatter, the system automatically extracts metadata from the markdown content (title from H1, description from first paragraph, tags from footer).

**Common Icon Classes (Font Awesome):**
- `fas fa-rocket` - Projects/Launch
- `fas fa-code` - Coding/Development  
- `fas fa-lightbulb` - Ideas/Tips
- `fas fa-trophy` - Achievements/Milestones
- `fas fa-book` - Tutorials/Learning
- `fas fa-bug` - Debugging/Fixes
- `fas fa-star` - Featured posts
- `fas fa-gamepad` - Game dev posts
- `fas fa-cube` - 3D/Modeling
- `fas fa-paint-brush` - Design/Art

Browse more at [fontawesome.com/icons](https://fontawesome.com/icons)

> 📖 **For a complete guide to the blog system**, see [BLOG_SYSTEM_GUIDE.md](BLOG_SYSTEM_GUIDE.md)

## 🛠️ Tech Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with CSS Grid, Flexbox, animations
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **[marked.js](https://marked.js.org/)** - Markdown parser for blog posts
- **Font Awesome** - Icon library
- **Google Fonts** - IBM Plex Mono & Inter typography
- **Canvas API** - Animated particle background

## 📁 Project Structure

```
personal_profile/
├── assets/
│   ├── css/
│   │   ├── dashboard.css     # Main stylesheet with animations
│   │   └── profile.css       # Additional profile styles
│   └── js/
│       └── dashboard.js      # Core JavaScript (navigation, blog auto-gen, animations)
├── blog/
│   ├── blog-index.json       # List of blog post files (for auto-loading)
│   ├── generate-index.js     # Auto-generate blog index (Node.js)
│   ├── generate-index.py     # Auto-generate blog index (Python)
│   └── posts/
│       ├── 10k-downloads.md  # Example blog post with YAML frontmatter
│       ├── 3d-modeling-basics.md
│       ├── template.md       # Copy this template for new posts!
│       └── [your-post].md    # Add your markdown posts here
├── index.html                # Main HTML file
├── start-server.bat          # Launch local server (Windows)
├── start-server.sh           # Launch local server (Mac/Linux)
├── BLOG_SYSTEM_GUIDE.md      # Complete blog system documentation
└── README.md                 # You are here!
```

## 🚀 Getting Started

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/plu101/personal_profile.git
cd personal_profile
```

2. **Start a local web server** ⚠️ **REQUIRED FOR BLOG SYSTEM**

The blog system needs a local server to work (can't use `file://` protocol due to CORS).

**Quick Start Scripts:**
```bash
# Windows
start-server.bat

# Mac/Linux
chmod +x start-server.sh
./start-server.sh
```

**Or manually:**
```bash
# Python (easiest)
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

3. **Visit**: `http://localhost:8000`

> ⚠️ **Important**: Do NOT open `index.html` directly in your browser! The blog system requires a web server to function due to browser security restrictions.

### Customization

**Update Profile Information:**
- Edit `index.html` sections marked with your info
- Replace project cards, stats, and links with your own

**Add Blog Posts:**
1. Create a new `.md` file in `blog/posts/` (e.g., `my-new-post.md`)
2. Add YAML frontmatter with your metadata
3. Add the filename to `blog/blog-index.json`
4. **Done!** The blog card is generated automatically

See the "Blog System" section above for detailed frontmatter format and examples.

**Auto-generate blog-index.json (Optional):**

Instead of manually updating `blog-index.json`, run the included script:
```bash
# Using Node.js
cd blog
node generate-index.js

# Or using Python
python generate-index.py
```

This automatically scans the `posts/` directory and updates the index file with all markdown posts, sorted by date.

**Styling:**
- Modify CSS variables in `assets/css/dashboard.css` for colors and themes
- Update animations and effects as needed

## ✨ Key Features Deep Dive

### Markdown Blog System with Auto-Generation

The blog system is designed for **maximum ease of posting** without sacrificing style:

**Features:**
- ✅ Write in pure Markdown with YAML frontmatter
- ✅ **Automatic blog card generation** - no manual HTML!
- ✅ Metadata extraction from YAML headers
- ✅ No build process required
- ✅ Automatic HTML conversion (via marked.js)
- ✅ Code syntax highlighting support
- ✅ Styled to match website theme
- ✅ Timeline view with auto-generated summary cards
- ✅ Full-screen reading view
- ✅ Fallback metadata extraction if no frontmatter

**Workflow:**
1. Drop a `.md` file in `blog/posts/`
2. Add it to `blog-index.json`
3. Refresh page - **new post appears automatically!**

**Supported Markdown:**
- Headers, paragraphs, lists
- Links, images, blockquotes
- Code blocks with syntax highlighting
- Tables, horizontal rules
- Bold, italic, strikethrough
- And more!

## 🎨 Animations & Effects

- **Particle canvas background** with mouse interaction
- **Typewriter effect** for expandable text
- **Counter animations** for statistics
- **Card tilt effects** on hover (optional)
- **Smooth section transitions**
- **Timeline scroll animations**
- **3D rotating store display**
- **Easter egg**: Konami Code activation 🎉

## 📱 Responsive Design

Optimized for all devices:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

## 🐛 Troubleshooting

**Blog posts not appearing?**

⚠️ **MOST COMMON ISSUE**: Not using a local server!
- **DO NOT** open `index.html` directly in your browser
- **DO** use a local server: Run `start-server.bat` (Windows) or `start-server.sh` (Mac/Linux)
- The blog system CANNOT work with `file://` protocol due to CORS restrictions

**If using a local server and still having issues:**
- Check browser console for errors (F12)
- Verify `blog-index.json` is valid JSON (use [jsonlint.com](https://jsonlint.com/))
- Ensure markdown files exist in `blog/posts/` directory
- Check that marked.js is loading (included via CDN in index.html)
- Try opening in incognito mode (cache issue)
- Clear browser cache and hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

**YAML frontmatter not parsing?**
- Ensure frontmatter starts and ends with `---` on separate lines
- Check for proper YAML syntax (no tabs, proper spacing)
- Verify quotes around string values with special characters
- Use the provided `template.md` as a starting point
- Validate YAML at [yamllint.com](http://www.yamllint.com/)

**Server won't start?**
- Ensure Python or Node.js is installed
- Check if port 8000 is already in use (try port 8080 instead)
- On Mac/Linux: Make script executable with `chmod +x start-server.sh`
- Try running the command manually: `python -m http.server 8000`

## 🤝 Contributing

This is a personal portfolio template, but feel free to:
- Fork and customize for your own use
- Submit bug reports via Issues
- Suggest improvements

## 📄 License

This project is open source and available for personal use. Feel free to use it as a template for your own portfolio!

## 🙏 Credits

- **Developer**: [Plu101](https://github.com/plu101)
- **Markdown Parser**: [marked.js](https://marked.js.org/)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/)

---

Crafted with boredom & creativity ✦

**[View Live Demo](https://plu101.github.io/personal_profile)** | **[Report Bug](https://github.com/plu101/personal_profile/issues)** | **[Request Feature](https://github.com/plu101/personal_profile/issues)**

