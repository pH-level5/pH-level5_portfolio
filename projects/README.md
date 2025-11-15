# Projects System

This directory contains the projects data structure for your portfolio website.

## How It Works

Projects are managed through `projects.json`, which defines:
1. **Featured Projects** - Highlighted on top
2. **Categorized Projects** - Organized by type

## Adding a New Project

### Step 1: Choose the Category

Available categories:
- `game-mods` - Game Mods & Addons
- `programming-tools` - Programming Tools & Utilities
- `web-applications` - Web Applications
- `assets-resources` - Assets & Resources (3D models, audio, etc.)
- `collaborative` - Collaborative Projects
- `experiments` - Experiments & Prototypes

### Step 2: Add to `projects.json`

Open `projects.json` and add your project to the appropriate category:

```json
{
  "id": "my-project-id",
  "title": "My Project Name",
  "category": "Programming Tools",
  "description": "A brief description of what this project does and its key features.",
  "status": "Active",
  "statusType": "active",
  "icon": "fas fa-code",
  "tags": ["Python", "CLI", "Tool"],
  "year": "2025",
  "link": "https://github.com/username/project"
}
```

### Step 3: Refresh Your Site

That's it! The project will automatically appear in the correct category.

## Project Fields

### Required Fields:
- **id**: Unique identifier (use lowercase-with-dashes)
- **title**: Project name
- **category**: Which category it belongs to
- **description**: What the project does (will be truncated with "Read More")
- **status**: Display status (e.g., "Active", "Paused", "Released")
- **statusType**: Status style (`active`, `paused`, `testing`, `stable`, `released`, `archived`)
- **icon**: Font Awesome icon class
- **tags**: Array of technology/feature tags
- **year**: Release/update year

### Optional Fields:
- **link**: URL to project (GitHub, demo, download, etc.)
- **downloadable**: true/false (for featured projects with download)
- **downloadSize**: File size string (e.g., "~15 MB")
- **image**: URL to project image/screenshot (not implemented yet)

## Status Types

Use these `statusType` values for proper styling:

- `testing` - Orange badge, for beta/testing projects
- `active` - Green badge, actively maintained
- `stable` - Blue badge, stable release
- `paused` - Gray badge, temporarily on hold
- `released` - Purple badge, finished projects
- `archived` - Dark badge, no longer maintained

## Icon Examples

Common Font Awesome icons:

**Programming:**
- `fas fa-code` - General coding
- `fas fa-terminal` - CLI tools
- `fas fa-laptop-code` - Software development

**Game Development:**
- `fas fa-gamepad` - Games/mods
- `fas fa-dice` - Game mechanics
- `fas fa-puzzle-piece` - Game addons

**Web:**
- `fas fa-globe` - Websites
- `fas fa-window-maximize` - Web apps
- `fas fa-palette` - Design/frontend

**Assets:**
- `fas fa-cube` - 3D models
- `fas fa-volume-up` - Audio
- `fas fa-image` - Graphics/textures

**Tools:**
- `fas fa-wrench` - Utilities
- `fas fa-tools` - Toolkits
- `fas fa-cogs` - Automation

Browse more at [fontawesome.com/icons](https://fontawesome.com/icons)

## Featured Projects

To feature a project (appears at top with special styling):

1. Add to the `featured` array in `projects.json`
2. Use the same fields as regular projects
3. Can add `downloadable: true` for download functionality

## Creating New Categories

To add a new category:

1. Add to `categories` object in `projects.json`:

```json
"my-category-id": {
  "title": "My Category Name",
  "icon": "fas fa-star",
  "description": "What this category contains",
  "projects": []
}
```

2. The category will automatically appear when it has projects

## Example: Complete Project Entry

```json
{
  "id": "awesome-tool",
  "title": "Awesome Development Tool",
  "category": "Programming Tools",
  "description": "A comprehensive development toolkit that helps automate common tasks, integrates with popular IDEs, and boosts productivity. Includes support for multiple languages and frameworks.",
  "status": "Active",
  "statusType": "active",
  "icon": "fas fa-wrench",
  "tags": ["Python", "TypeScript", "CLI", "Automation"],
  "year": "2025",
  "link": "https://github.com/yourusername/awesome-tool"
}
```

## Tips

- Keep descriptions concise but informative
- Use 3-5 tags maximum
- Choose icons that represent the project type
- Update the year when making major releases
- Test your JSON for errors at [jsonlint.com](https://jsonlint.com/)

## Troubleshooting

**Projects not showing?**
- Check browser console for errors (F12)
- Validate JSON syntax
- Ensure you're running a local server (not file://)
- Clear cache and hard refresh

**Wrong category?**
- Double-check the category ID matches exactly
- Category IDs are: `game-mods`, `programming-tools`, `web-applications`, `assets-resources`, `collaborative`, `experiments`

**Styling issues?**
- Verify statusType is one of the valid types
- Check icon class is valid Font Awesome
- Ensure all required fields are present
