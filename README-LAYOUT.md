# Layout Structure Guide

## Overview

I've created a **responsive layout structure** matching the svaniti.in website. This is a **skeleton/template** - you'll customize the content, images, colors, and styling.

## Files Created

### 1. **LayoutComponents.tsx** (`/components/LayoutComponents.tsx`)
Reusable layout building blocks:
- `HeroSection` - Full viewport hero with logo, title, CTAs
- `ResponsiveGrid` - Auto-responsive grid (3 cols desktop → 2 cols tablet → 1 col mobile)
- `TwoColumnLayout` - Left text / Right image layout
- `Card` - Reusable card with hover effects
- `Container` - Centered max-width wrapper
- `Section` - Full-width section with background color
- `HeaderNav` - Navigation header
- `TickerRow` - Horizontal scrolling carousel
- `FeatureTile` - Small feature blocks
- `ButtonGroup` - Grouped CTA buttons

### 2. **HomePageLayout.tsx** (`/components/HomePageLayout.tsx`)
Complete homepage structure with:
- Hero section with gradient background
- Ticker/carousel section
- "What We Do" 4-card grid
- Vision/mission two-column section
- Testimonials 3-card grid
- Contact form section (dark background)
- Footer

### 3. **page-layout-structure.tsx** (Optional)
Switch to this to use the new layout. To activate:
```bash
# Back up old page
mv app/page.tsx app/page-old.tsx

# Use new layout
mv app/page-layout-structure.tsx app/page.tsx
```

## How to Customize

### Step 1: Update Hero Section
In `HomePageLayout.tsx`, find the `<!-- ===== HERO SECTION ===== -->` block:

```tsx
// Change logo
<div style={{...}}>🏛️</div>  // Replace emoji or image

// Change title
<h1>Add Your Hero Title Here</h1>  // ← Your title

// Change subtitle
<p>Add your hero subtitle...</p>  // ← Your subtitle

// Change buttons
<button>Primary CTA</button>
<button>Secondary CTA</button>
```

### Step 2: Update Colors
Replace color values throughout:
- `#0B2228` - Dark navy (main color)
- `#fff1cc` - Yellow accent
- `#d1f2eb` - Teal accent
- `#aed6f1` - Blue accent
- `#f8fafc` - Light background

### Step 3: Add Images
Replace placeholder divs with actual images:

```tsx
// Before
<div style={{background: '#f8fafc', ...}}>
  Add Image or Content
</div>

// After
<Image 
  src="/images/your-image.jpg" 
  alt="Description" 
  fill 
  style={{objectFit: 'cover'}}
/>
```

### Step 4: Update Content
All placeholder text is marked with "CUSTOMIZE":
- Hero title, subtitle
- Section titles and descriptions
- Card titles and descriptions
- Testimonials
- Contact info

### Step 5: Add Links
Update `href` values for navigation and buttons:

```tsx
<Link href="/about">About</Link>
<Link href="/services">Projects</Link>
<Link href="/contact">Contact</Link>
```

## Responsive Design

All components are mobile-responsive by default:

- **Hero:** 100vh desktop → auto height mobile
- **Grid:** 4 cols desktop → 3 cols tablet → 2 cols mobile → 1 col phone
- **Two-column:** Side-by-side desktop → stacked mobile
- **Padding:** 60px desktop → 40px mobile
- **Font:** Uses `clamp()` for fluid sizing

## Mobile Preview

To test on mobile:
```bash
npm run dev
# Open http://localhost:3000
# Use DevTools → Device Toolbar (Ctrl+Shift+M) to test responsive
```

## Desktop vs Mobile Layout

### Desktop (>1024px)
- 4-column grids
- Side-by-side two-column layouts
- Full header with navigation
- 60px padding
- Horizontal scrolling carousels

### Tablet (768px - 1024px)
- 3-2 column grids
- 40px padding
- Maintained hierarchy

### Mobile (<768px)
- 2-1 column grids
- Stacked two-column sections
- 20px padding
- Touch-friendly buttons
- Single-column layout
- Hamburger menu space

## Next Steps

1. ✅ Review the layout in browser
2. 🎨 Customize colors, spacing, fonts
3. 📝 Replace placeholder content
4. 🖼️ Add your images
5. 🔗 Update all links
6. ✨ Add animations/effects (optional)
7. 📱 Test on mobile devices
8. 🚀 Deploy

## Component Reusability

You can use `LayoutComponents` throughout your site:

```tsx
import { Card, ResponsiveGrid, Section, Container } from '@/components/LayoutComponents'

export default function Services() {
  return (
    <Section background="#f8fafc">
      <Container>
        <h1>Our Services</h1>
        <ResponsiveGrid>
          <Card>Service 1</Card>
          <Card>Service 2</Card>
          <Card>Service 3</Card>
        </ResponsiveGrid>
      </Container>
    </Section>
  )
}
```

## Need Help?

- Check `HomePageLayout.tsx` for structure examples
- Review `LayoutComponents.tsx` for all available components
- Each component has JSDoc comments explaining usage
- All styling is inline (easy to move to CSS/Tailwind later)

---

**Note:** This layout matches the structure of svaniti.in. All content is placeholder and ready for your customization.
