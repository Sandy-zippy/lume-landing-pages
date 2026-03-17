# LUME Brand Assets Guide

## Asset Inventory

### Logos
| File | Dimensions | Background | Use Case |
|------|-----------|------------|----------|
| `lume-logo-transparent.png` | 250x150 | Transparent | **PRIMARY** - Light backgrounds |
| `lume-logo-white.png` | 250x150 | Transparent | **PRIMARY** - Dark backgrounds |
| `lume-logo-alt.png` | 250x150 | White | Source file - has white bg |
| `lume-logo-official.png` | 250x150 | White | Source file - has white bg |
| `lume-logo-with-background-DO-NOT-USE.png` | 765x881 | Landscape | **DO NOT USE** |

**Logo Usage Rules:**
- Light backgrounds → `lume-logo-transparent.png`
- Dark backgrounds → `lume-logo-white.png`
- NEVER use CSS filters to change logo colors - use the correct file

### Images
| File | Dimensions | Use Case |
|------|-----------|----------|
| `hero-banner.png` | 1889x1777 | Hero backgrounds |
| `statue.png` / `statue-hires.png` | 1598x897 | Decorative accent |
| `team-photo.jpeg` | 1598x897 | Team sections |
| `about-team.jpeg` | 1598x897 | About sections |
| `slide-1.png` | 1200x1800 | Gallery/social proof |
| `slide-2.png` | 1080x1350 | Gallery/social proof |

---

## Brand Asset Collection Workflow

### Step 1: Source from Official Website
Always download assets from the official brand website first:
- **LUME**: https://thelumeproject.com
- Check header, footer, and about page for logo files

### Step 2: Check File Properties
Before using any image, verify:
```bash
# Check dimensions, alpha channel, and color space
sips -g pixelWidth -g pixelHeight -g hasAlpha -g space filename.png
```

**Critical Properties:**
- **Logo files MUST have `hasAlpha: yes`** for transparency
- **RGB vs RGBA**: RGB has no transparency, RGBA does
- Minimum logo width for web: 200px

### Step 3: Convert If Needed
If a logo has a solid background, you have options:

**Remove background (if simple/solid color):**
```bash
# Convert white background to transparent
convert input.png -transparent white output.png
```

**Extract from PDF/SVG (best quality):**
- Request original vector files (AI, SVG, EPS) from brand team
- Export as PNG with transparent background at 2x resolution

### Step 4: File Naming Convention
```
{brand}-{type}-{variant}.{ext}

Examples:
lume-logo-primary.png      # Main logo with transparency
lume-logo-white.png        # White version for dark backgrounds
lume-icon-only.png         # Just the emblem/icon
lume-wordmark.png          # Text only version
```

---

## Video Assets for Motion Graphics

### Instagram Reels (Embeds)
Currently embedded via iframe in landing pages:
- `https://www.instagram.com/reel/DNlNdzeTiLc/embed/` - 38.6K views
- `https://www.instagram.com/reel/DQ8gr5RkbYv/embed/` - 25.7K views
- `https://www.instagram.com/reel/DNs5HvzZg9z/embed/` - 24.3K views

### Video as Background/Hero (Self-hosted)
For video backgrounds, you need:
1. MP4 file (H.264 codec)
2. WebM file (VP9 codec) for fallback
3. Poster image (first frame as JPG)

**HTML pattern for video backgrounds:**
```html
<video autoplay muted loop playsinline class="hero-video">
    <source src="assets/video/hero.webm" type="video/webm">
    <source src="assets/video/hero.mp4" type="video/mp4">
</video>
```

**CSS for video backgrounds:**
```css
.hero-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    z-index: -1;
}
```

---

## Quick Reference

### Logo Usage
- **Headers/Navigation**: Use `lume-logo-alt.png` with max-height: 40-60px
- **Favicon**: Convert logo to 32x32 ICO or use as-is for PNG favicon
- **Footer**: Same as header, can be smaller

### Color Palette (from logo)
- Primary Red: `#C41E3A` (LUME emblem)
- Accent: `#FF5149`
- Dark: `#1a1a1a`
- Light: `#f8f6f3`

---

*Last updated: February 2026*
