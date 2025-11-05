#!/usr/bin/env node

/**
 * Automatic Blog Index Generator
 * 
 * Run this script to automatically generate blog-index.json
 * from all .md files in the posts/ directory (excluding template.md)
 * 
 * Usage (Node.js):
 *   node generate-index.js
 * 
 * Usage (Deno):
 *   deno run --allow-read --allow-write generate-index.js
 */

const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'blog-index.json');

try {
  // Read all files in posts directory
  const files = fs.readdirSync(postsDir);
  
  // Filter for .md files, exclude template.md
  const mdFiles = files
    .filter(file => file.endsWith('.md') && file !== 'template.md')
    .sort(); // Sort alphabetically
  
  // Parse frontmatter to get dates for sorting
  const postsWithDates = mdFiles.map(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const dateMatch = content.match(/date:\s*["']([^"']+)["']/);
    return {
      file,
      date: dateMatch ? new Date(dateMatch[1]) : new Date(0)
    };
  });
  
  // Sort by date (newest first)
  postsWithDates.sort((a, b) => b.date - a.date);
  
  // Create index object
  const index = {
    posts: postsWithDates.map(p => p.file),
    description: "Blog post index - automatically generated",
    generatedAt: new Date().toISOString(),
    count: postsWithDates.length
  };
  
  // Write to file
  fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));
  
  console.log(`✓ Generated blog-index.json with ${index.count} posts:`);
  index.posts.forEach((post, i) => {
    console.log(`  ${i + 1}. ${post}`);
  });
  
} catch (error) {
  console.error('Error generating blog index:', error);
  process.exit(1);
}

