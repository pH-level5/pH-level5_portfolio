// ================================
// BLOG POSTS — STATIC EMBEDDED DATA
// ================================
// This file embeds all blog post metadata and content so the blog works
// fully statically (GitHub Pages, file://, or any HTTP server) without
// requiring any backend. Add new posts here when you publish them.
// ================================

window.BLOG_POSTS_DATA = [
  {
    id: 'introducing-mindos',
    title: 'Introducing MindOS: Building My Knowledge Management System',
    date: 'NOV 17, 2025',
    description: 'A deep dive into my main project—an intelligent personal management system that unifies notes, tasks, and documents with AI-powered features.',
    tags: ['MindOS', 'React', 'TypeScript', 'AI', 'Project Announcement'],
    icon: 'fas fa-brain',
    readTime: '8 min read',
    status: 'PROJECT',
    content: `# Introducing MindOS: Building My Knowledge Management System

For the past few months, I've been working on my most ambitious project yet: **MindOS**, an intelligent personal management system designed for programmers and knowledge workers.

## The Problem I'm Solving

As a programming student, I deal with information scattered across multiple platforms—notes in one app, documents in another, tasks somewhere else, and training logs (Berichtsheft) manually maintained in Word. This fragmentation creates cognitive overload and wastes time synchronizing everything.

I wanted a **unified workspace** where everything connects, where my notes link to tasks, tasks link to documents, and I can visualize how information relates in my knowledge base. Built specifically for students and trainees who need structure without complexity.

## What is MindOS?

Think of it as a **personal wiki + task manager + document organizer**, all in one:

### Bidirectional Note Linking
Write notes in Markdown with wiki-style \`[[links]]\` that automatically create connections. Link to other notes, embed files, and visualize your knowledge graph.

### Smart Task Management
Organize assignments, study goals, and daily todos with priorities and due dates. Link tasks to specific classes, projects, and notes to keep everything connected.

### Hierarchical Document Management
Organize documents by **Classes → Projects → Documents** with drag-and-drop. Import .docx, .pdf, .txt, and .md files, then edit them directly in the app.

### Interactive Graph Visualization
See your notes, tasks, and documents as an interactive network. Discover unexpected connections and navigate your knowledge visually.

### Smart Search
Fuzzy full-text search across all content. Filter by tags, classes, or projects. Find what you need instantly.

### Local-First & Privacy-Focused
All data stays on your machine using SQLite. No cloud, no subscriptions, no data mining. Works completely offline.

### Future: Optional AI Features
Planned AI capabilities will be **opt-in** and require you to provide your own:
- **Self-hosted AI:** Run models locally, data never leaves your machine
- **Cloud AI API Key:** Use OpenAI, Claude, etc. (data sent to their servers, you control this)

## Tech Stack

I'm building this with modern web technologies:

- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** SQLite (local, no server needed)
- **Markdown:** Unified/Remark ecosystem with custom plugins
- **State:** Zustand for lightweight state management

## Development Progress

I'm following a structured 7-phase development plan:

**Phase 1: Foundation** (Complete)
Basic note system, markdown editor, file storage, search functionality

**Phase 2: Advanced Linking** (Complete)
Bidirectional links, graph visualization, tags, command palette (Cmd+K), auto-save

**Phase 3: Document Management** (Complete)
Hierarchical organization, drag-and-drop, multi-format support, document editors

**Phase 4: Task Management** (Complete)
Smart task system with checklist support, priority levels, graph integration

**Phase 5: Berichtsheft Generator** (Next)
Automated training log generation from daily activity

**Phase 6: Diagram Editor** (Planned)
Flowcharts, UML diagrams, mind maps embedded in notes

**Phase 7: AI Integration & Release** (Target: Early 2025)
Optional AI features (BYOK - Bring Your Own Key), final testing, public release

**Current Status:** approximately 55% complete (Phase 4 finished)

## Design Philosophy

I'm building MindOS with clear principles:

1. **Modularity:** Each feature is independent with clear interfaces
2. **Local-First:** Your data, your machine, your control
3. **Simplicity:** Streamlined codebase, no feature bloat
4. **Performance:** Fast interactions (<100ms), efficient rendering
5. **Privacy:** No telemetry, no tracking, no external APIs

## Why Am I Building This Publicly?

I'm documenting this project as I build it for a few reasons:

1. **Learning in public:** Sharing progress helps me stay accountable
2. **Getting feedback:** Early insights help shape better features
3. **Showcasing real work:** This is a substantial portfolio piece
4. **Helping others:** Maybe someone else has the same problems

## Release Timeline

I'm aiming for **public testing in early 2025**, followed by a full release after incorporating feedback. I'm building methodically—each phase is completed and tested before moving forward. Quality over speed.

## Final Thoughts

This is the most complex project I've undertaken. It combines full-stack development, AI integration, complex state management, and thoughtful UX design. It's challenging, but every feature that works feels like a small victory.

---

*Questions? Comments? Reach out via [email](mailto:maker@protonmail.com) or check the Support section.*`
  },

  {
    id: 'new-blog-system',
    title: 'Automatic Blog System with YAML Frontmatter',
    date: 'DEC 5, 2025',
    description: 'Introducing the new automatic blog card generation system! Just drop a markdown file with YAML metadata and watch it appear on your timeline.',
    tags: ['Web Development', 'JavaScript', 'Automation', 'Markdown'],
    icon: 'fas fa-rocket',
    readTime: '3 min read',
    status: 'NEW FEATURE',
    content: `# Automatic Blog System with YAML Frontmatter

Great news! The blog system now features **automatic card generation** from markdown files with YAML frontmatter. No more manual HTML editing!

## What's New?

### Automatic Card Generation
Simply create a markdown file with YAML frontmatter, and the blog card appears automatically on the timeline. No HTML required!

### YAML Metadata Support
All your post metadata is now managed in a clean YAML header.

### Smart Fallback
Don't want to use YAML? No problem! The system automatically extracts metadata from your markdown content:
- Title from first H1
- Description from first paragraph
- Tags from footer
- Auto-calculated read time

## How It Works

1. **Create** a \`.md\` file in \`blog/posts/\`
2. **Add** YAML frontmatter with your metadata
3. **Update** \`blog/blog-posts-data.js\` with the new post
4. **Done!** Your post appears automatically.

## Benefits

✅ **No manual HTML** — Focus on writing
✅ **Consistent styling** — All cards match automatically
✅ **Easy maintenance** — Update metadata in one place
✅ **Version control friendly** — Plain text markdown
✅ **Portable** — Standard markdown format
✅ **Fully static** — Works on GitHub Pages with no backend

## Technical Details

The system uses:
- **YAML frontmatter parsing** — Simple regex-based parser
- **marked.js** — Markdown to HTML conversion
- **Dynamic DOM generation** — Cards created on page load
- **Event delegation** — Handles dynamically created elements
- **Static data embedding** — Works offline without any server

## What's Next?

Future improvements planned:
- Search and filter functionality
- Category filtering
- Tag-based navigation
- Reading progress indicator

---

**Need Help?**
Check the README for detailed instructions and troubleshooting tips.`
  },

  {
    id: '10k-downloads',
    title: 'Reaching 10k Downloads: What I Learned',
    date: 'NOV 4, 2025',
    description: "Lessons learned from reaching 10,000 downloads on my Garry's Mod addon. Good documentation and listening to community feedback made a huge difference.",
    tags: ['GMod', 'Lua', 'Community', 'Open Source'],
    icon: 'fas fa-trophy',
    readTime: '7 min read',
    status: 'MILESTONE',
    content: `# Reaching 10k Downloads: What I Learned

After months of development and community engagement, my Garry's Mod addon finally hit the incredible milestone of **10,000 downloads**. Here's what I learned along the way.

## Chapter 1: Setting Out

When I first published the addon to the Garry's Mod Workshop, I carried both excitement and uncertainty. I knew the idea solved a problem I cared deeply about, yet I had no proof anyone else would value it. Those early days were filled with tinkering late into the night, responding to every bit of feedback, and learning how to present a technical project to a community that thrives on collaboration. Documentation quickly became the backbone of that presentation. Clear installation steps, annotated screenshots, and concise tutorials invited players to try the addon and feel confident they could use it without frustration.

## Chapter 2: Listening Between the Lines

As the subscriber count started to climb, the real work moved beyond code. Comments, direct messages, and bug reports revealed what users loved and where they struggled. Each suggestion felt like a conversation with someone invested in seeing the addon succeed. By treating those conversations as design reviews, I discovered feature ideas I would never have considered on my own. Momentum grew because users felt heard, and every release note reflected their fingerprints.

## Chapter 3: Keeping the Momentum

Sustaining engagement required a steady rhythm of updates. Even the smallest patches—tidier menus, faster load times, localized strings—signaled that the project was alive. When bugs surfaced, quick fixes mattered as much as the features themselves. Trust is fragile in live projects; maintaining it meant proving, release after release, that players could rely on me to keep improving their experience. In practice, that trust was forged through careful organization: modular Lua files, consistent naming conventions, and clearly commented systems that made future changes less risky.

## Chapter 4: Learning the Engine

Working inside the Source Engine deepened my respect for performance engineering. Lua rewards thoughtful memory management, especially inside hot loops. I learned to reuse tables, minimize allocations, and rely on profiling to decide where to optimize. Those lessons extended beyond the addon itself, teaching me to approach every script like a shared resource that deserved attention to detail.

## Chapter 5: Building Community

What surprised me most was how naturally a community formed around the addon. A small Discord server turned into a hub where players answered each other's questions before I even saw them. GitHub issues evolved into a transparent development log, showing everyone where the project was heading. Regular Workshop updates acted as a heartbeat, reassuring subscribers that progress continued even between major releases.

## Chapter 6: Looking Ahead

Reaching ten thousand downloads is both a milestone and a starting line. The roadmap now includes native C++ modules for performance-critical features, compatibility bridges with other popular addons, and a slate of new ideas driven entirely by community votes. The technical ambitions are higher than ever, but they rest on the same foundation: listen closely, communicate clearly, and deliver consistently.

## Epilogue: Shared Success

The best projects are built with the community, not just for them. That line has become the quiet north star guiding each iteration. The milestone proved that open-source work thrives when code and communication carry equal weight.

To anyone nurturing a project of their own: engage early, iterate with your users, and celebrate those shared victories. Thank you to everyone who downloaded, tested, and championed this addon. The next chapter starts now—let's make it even better together.`
  },

  {
    id: '3d-modeling-basics',
    title: 'Learning 3D Modeling Basics',
    date: 'OCT 28, 2025',
    description: 'Starting my journey into 3D modeling for game assets. Focusing on learning proper topology and UV mapping with Blender.',
    tags: ['3D Modeling', 'Learning', 'Blender', 'Game Assets'],
    icon: 'fas fa-cube',
    readTime: '6 min read',
    status: 'LEARNING',
    content: `# Learning 3D Modeling Basics

As a programmer transitioning into 3D art, I'm documenting my journey learning 3D modeling for game assets. Here are my first impressions and key takeaways.

## Why Learn 3D Modeling?

For the longest time, I've been creating tools and code, but I always relied on others for visual assets. Learning 3D modeling opens up new possibilities:

- Create custom assets for my projects
- Better understand asset pipelines
- Communicate more effectively with 3D artists
- Build complete games independently

## Getting Started

### Tools I'm Using

- **Blender** — Free, powerful, and has great community resources
- **Unreal Engine** — For testing assets in real-time
- **Substance Painter** (planned) — For texturing

### Learning Resources

I started with these excellent (and free!) resources:

1. **Blender Guru's Donut Tutorial** — Classic starting point
2. **Grant Abbitt's YouTube Channel** — Great for game assets
3. **Polyfjord** — Low-poly aesthetic tutorials
4. **CGBoost** — More advanced techniques

## Key Concepts I'm Learning

### Topology

Understanding edge flow and polygon count is crucial:

- **Quads over triangles** for clean deformation
- **Edge loops** for defining form
- **Supporting edges** for maintaining shape

### UV Mapping

This was surprisingly challenging at first. Key principles:
- Minimize stretching
- Use texture space efficiently
- Hide seams in strategic locations
- Think about how textures will tile

### PBR Materials

Learning the Physically Based Rendering workflow:

- **Albedo** — Base color (no lighting info)
- **Roughness** — How glossy/matte the surface is
- **Metallic** — Whether the material is metallic
- **Normal** — Surface detail without geometry

## My First Projects

### Project 1: Simple Crate

Started with the classic — a crate! Learned:
- Basic modeling (extrude, inset, bevel)
- UV unwrapping fundamentals
- Simple texturing

### Project 2: Low-Poly Tree

Moved on to organic shapes:
- Modeling from reference
- Vertex painting for variation
- LOD (Level of Detail) basics

### Current Project: Modular Building Kit

Working on a set of modular pieces:
- Consistent scale and pivot points
- Tileable textures
- Optimized for real-time rendering

## Challenges I'm Facing

### 1. Topology vs. Visual Result

Finding the balance between clean topology and visual appeal takes practice. Sometimes what looks good is a topological mess!

### 2. Optimization

Coming from programming, I want everything optimized:
- How many polys is too many?
- When to use normal maps vs. geometry?
- LOD generation strategies

### 3. Artistic Eye

This is the hardest part — developing an eye for proportions, color theory, and composition.

## Tips for Fellow Programmers

If you're a developer learning 3D modeling:

1. **Start with simple shapes** — Don't attempt a character first
2. **Use reference images** — Even pros use references constantly
3. **Learn the shortcuts** — Blender has tons, learn them gradually
4. **Think in systems** — Apply your programming mindset to modeling workflows
5. **Join communities** — r/blender and BlenderArtists are helpful

## Goals for Next Month

- Complete the modular building kit
- Learn basic rigging for animated objects
- Create 5 game-ready props
- Start learning Substance Painter
- Publish first asset pack

---

The journey is just beginning, but I'm excited to combine my programming skills with 3D art. Stay tuned for more updates!`
  }
];
