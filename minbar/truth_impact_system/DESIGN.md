---
name: Truth & Impact System
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadc'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4e5e81'
  primary: '#000516'
  on-primary: '#ffffff'
  primary-container: '#0c1e3d'
  on-primary-container: '#7686ab'
  inverse-primary: '#b6c6ee'
  secondary: '#b52424'
  on-secondary: '#ffffff'
  secondary-container: '#ff5a52'
  on-secondary-container: '#600006'
  tertiary: '#000613'
  on-tertiary: '#ffffff'
  tertiary-container: '#141f30'
  on-tertiary-container: '#7c879c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#b6c6ee'
  on-primary-fixed: '#081b3a'
  on-primary-fixed-variant: '#374768'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ac'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#92030f'
  tertiary-fixed: '#d8e3fa'
  tertiary-fixed-dim: '#bcc7dd'
  on-tertiary-fixed: '#111c2c'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
spacing:
  grid-margin: 24px
  gutter: 20px
  section-gap: 64px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is engineered for a professional news agency where authority, speed, and truth are paramount. The aesthetic is **Corporate / Modern** with editorial leanings, emphasizing high legibility and a structured hierarchy that mirrors the gravitas of global journalism.

The visual language communicates "Breaking News" through high-contrast accents while maintaining a "Deep Analysis" atmosphere through vast whitespace and traditional editorial structures. The target audience includes decision-makers, researchers, and a global citizenry seeking reliable, impactful perspectives. The emotional response should be one of immediate trust and intellectual clarity.

## Colors

The palette is derived directly from the provided logo to ensure brand continuity.
- **Deep Navy (#0C1E3D):** The primary anchor. Used for navigation, headers, and primary text to establish institutional authority.
- **Bold Red (#B22222):** The accent for "Breaking" content, active states, and critical alerts. It signifies urgency and impact.
- **Slate Grey (#4A5568):** Used for metadata, secondary body text, and borders to provide a soft bridge between the navy and white.
- **Clean White/Neutral (#F7FAFC):** The canvas. High-clarity backgrounds prioritize reading endurance.

The default mode is **Light**, mimicking the traditional newspaper experience, though a high-contrast dark mode is supported for night-reading environments.

## Typography

This design system uses a dual-font strategy to balance tradition with modernity.
- **Headlines:** `Source Serif 4` provides an authoritative, literary feel. Use for all article titles and section headers. Large display sizes should use tighter tracking.
- **Body:** `Work Sans` offers exceptional legibility at standard reading sizes. It feels neutral and professional, allowing the content to take center stage.
- **Labels/Metadata:** `IBM Plex Sans` is used for technical data, categories, and timestamps. It introduces a subtle systematic feel that suggests precision and data-driven reporting.

**Scale:** On mobile devices, headline sizes are capped at 28px to ensure word wrap doesn't break the visual flow of news feeds.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to maintain the organized feel of a broadsheet newspaper, while transitioning to a **Fluid Grid** for mobile.

- **Desktop (1280px+):** 12-column grid. Articles typically span 8 columns for focus, with a 4-column sidebar for related news and live tickers.
- **Tablet:** 8-column grid with reduced margins.
- **Mobile:** 4-column fluid grid. Content is primarily a single-column vertical stack to optimize for "fast-paced" scrolling.

The spacing rhythm is built on a 4px baseline. Section gaps are generous (64px) to prevent information overload, while "Breaking News" modules use tighter padding (16px) to create a sense of density and speed.

## Elevation & Depth

To maintain a professional and flat editorial aesthetic, this design system avoids heavy shadows. 

1.  **Tonal Layers:** We use subtle background shifts to differentiate content. The main canvas is pure white, while sidebars or "latest news" widgets use a very light neutral tint (#F7FAFC).
2.  **Low-Contrast Outlines:** Instead of shadows, cards and input fields are defined by 1px borders in `slate-200` (#E2E8F0). 
3.  **Elevation for Interaction:** Only the most critical interactive elements (like a floating "Share" or "Breaking" alert) use a soft, low-opacity shadow (0px 4px 12px rgba(12, 30, 61, 0.08)).
4.  **The "Line" Motif:** Borrowing from the logo, horizontal lines are used as structural depth markers to separate stories and categories.

## Shapes

The design system utilizes **Sharp (0px)** corners. This decision reinforces the architectural, serious nature of the news agency and aligns with the geometric "M" and architectural pillar in the logo.

- **Standard Elements:** Buttons, cards, and input fields have 0px radius.
- **Special Elements:** Small badges (e.g., "LIVE" or "OPINION") may use a tiny 2px "soft" corner to differentiate them as discrete UI tags, but the primary layout remains strictly rectilinear.

## Components

- **Buttons:** Primary buttons are Navy with White text, Sharp corners. Secondary buttons use a Navy outline. The "Breaking" button variant is Solid Red.
- **News Cards:** Use a "Rule" line at the top of the card. Headlines in Serif, Meta in IBM Plex Sans. Image aspect ratios are strictly 16:9 or 3:2.
- **Chips/Categories:** Small-caps IBM Plex Sans text with a thin bottom border. No background fill unless active.
- **Input Fields:** 1px Slate Grey border, Navy label text above. Focus state changes border to 2px Navy.
- **Progressive Disclosure:** Use for long analysis pieces. "Read More" links use the Bold Red accent to draw the eye.
- **The News Ticker:** A dedicated horizontal component at the top of the viewport for "Breaking News" headlines, utilizing a Red background and white scrolling text.