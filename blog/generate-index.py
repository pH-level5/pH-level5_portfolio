#!/usr/bin/env python3

"""
Automatic Blog Index Generator (Python version)

(c) 2025 Plu101 – All rights reserved.
This script is part of the custom PLU101 blog workflow and may not be
copied or reused without permission.

Run this script to automatically generate blog-index.json
from all .md files in the posts/ directory (excluding template.md)

Usage:
    python generate-index.py
"""

import os
import json
import re
from datetime import datetime
from pathlib import Path

def parse_date_from_frontmatter(content):
    """Extract date from YAML frontmatter"""
    match = re.search(r'date:\s*["\']([^"\']+)["\']', content)
    if match:
        try:
            # Try to parse the date
            date_str = match.group(1)
            return datetime.strptime(date_str, '%b %d, %Y')
        except:
            pass
    return datetime.min

def main():
    script_dir = Path(__file__).parent
    posts_dir = script_dir / 'posts'
    output_file = script_dir / 'blog-index.json'
    
    try:
        # Get all .md files except template.md
        md_files = [
            f.name for f in posts_dir.glob('*.md')
            if f.name != 'template.md'
        ]
        
        # Parse dates from frontmatter for sorting
        posts_with_dates = []
        for filename in md_files:
            filepath = posts_dir / filename
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                date = parse_date_from_frontmatter(content)
                posts_with_dates.append((filename, date))
        
        # Sort by date (newest first)
        posts_with_dates.sort(key=lambda x: x[1], reverse=True)
        sorted_posts = [filename for filename, _ in posts_with_dates]
        
        # Create index object
        index = {
            'posts': sorted_posts,
            'description': 'Blog post index - automatically generated',
            'generatedAt': datetime.now().isoformat(),
            'count': len(sorted_posts)
        }
        
        # Write to file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(index, f, indent=2)
        
        print(f'✓ Generated blog-index.json with {index["count"]} posts:')
        for i, post in enumerate(sorted_posts, 1):
            print(f'  {i}. {post}')
            
    except Exception as e:
        print(f'Error generating blog index: {e}')
        exit(1)

if __name__ == '__main__':
    main()

