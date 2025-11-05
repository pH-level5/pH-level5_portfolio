# Learning 3D Modeling Basics

As a programmer transitioning into 3D art, I'm documenting my journey learning 3D modeling for game assets. Here are my first impressions and key takeaways.

## Why Learn 3D Modeling?

For the longest time, I've been creating tools and code, but I always relied on others for visual assets. Learning 3D modeling opens up new possibilities:

- Create custom assets for my projects
- Better understand asset pipelines
- Communicate more effectively with 3D artists
- Build complete games independently

## Getting Started

### Tools I'm Using

- **Blender** - Free, powerful, and has great community resources
- **Unreal Engine** - For testing assets in real-time
- **Substance Painter** (planned) - For texturing

### Learning Resources

I started with these excellent (and free!) resources:

1. **Blender Guru's Donut Tutorial** - Classic starting point
2. **Grant Abbitt's YouTube Channel** - Great for game assets
3. **Polyfjord** - Low-poly aesthetic tutorials
4. **CGBoost** - More advanced techniques

## Key Concepts I'm Learning

### Topology

Understanding edge flow and polygon count is crucial:

- **Quads over triangles** for clean deformation
- **Edge loops** for defining form
- **Supporting edges** for maintaining shape

### UV Mapping

This was surprisingly challenging at first:

```
The goal: Unwrap a 3D model onto a 2D texture
The reality: Lots of practice with seams and layouts
```

Key principles:
- Minimize stretching
- Use texture space efficiently  
- Hide seams in strategic locations
- Think about how textures will tile

### PBR Materials

Learning the Physically Based Rendering workflow:

- **Albedo** - Base color (no lighting info)
- **Roughness** - How glossy/matte the surface is
- **Metallic** - Whether the material is metallic
- **Normal** - Surface detail without geometry

## My First Projects

### Project 1: Simple Crate

Started with the classic - a crate! Learned:
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

This is the hardest part - developing an eye for:
- Proportions and scale
- Color theory and material properties
- Composition and visual interest

## Tips for Fellow Programmers

If you're a developer learning 3D modeling:

1. **Start with simple shapes** - Don't attempt a character first
2. **Use reference images** - Even pros use references constantly
3. **Learn the shortcuts** - Blender has tons, learn them gradually
4. **Think in systems** - Apply your programming mindset to modeling workflows
5. **Join communities** - r/blender and BlenderArtists are helpful

## Goals for Next Month

- [ ] Complete the modular building kit
- [ ] Learn basic rigging for animated objects
- [ ] Create 5 game-ready props
- [ ] Start learning Substance Painter
- [ ] Publish first asset pack

## Resources

**Free Assets for Learning:**
- [Poly Haven](https://polyhaven.com/) - PBR textures and HDRIs
- [Kenney.nl](https://kenney.nl/) - Free game assets as reference

**Communities:**
- r/blender - Helpful Reddit community
- BlenderArtists - Forum for all skill levels
- Polycount - Professional game art forum

---

The journey is just beginning, but I'm excited to combine my programming skills with 3D art. Stay tuned for more updates!

**Tags:** 3D Modeling, Learning, Blender, Game Assets

