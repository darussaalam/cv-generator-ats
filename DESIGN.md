# Design Direction: Kang CV Mu

Reading this as: Modern Editorial Career Utility with High-Craft Glassmorphism for Indonesian Job Seekers, dial ENERGY 2 / RHYTHM 3 / MOTION 1.

## Typographic Direction (R-06 & R-31)
- **Display & Interface Typeface**: `Plus Jakarta Sans`, designed by Tokotype (Indonesia).
  - **Reason**: Selected for its clean geometric architecture, generous x-height, crisp legibility across small mobile displays, and high-craft modern tone. It bridges international executive standards with local design heritage.
  - **Scale**:
    - Hero Headline: `clamp(2.5rem, 6vw, 4.25rem)`, `letter-spacing: -0.04em`, `line-height: 1.08`.
    - Section Headings: `clamp(1.75rem, 3.5vw, 2.5rem)`, `letter-spacing: -0.03em`.
    - Body copy: `clamp(1rem, 1.8vw, 1.15rem)`, `line-height: 1.65`.
- **ATS Resume Paper Typeface**: Classical `Times New Roman` or `Calibri`.
  - **Reason**: 100% compliance with corporate and international Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever) which require standard serif or sans-serif fonts without decorative glyphs.

## Visual Identity & Glassmorphism Theme (Light & Dark)
- **Palette**:
  - Core 1 (Background): Slate canvas with soft ambient depth (`#f8fafc` in light, `#0b0f19` in dark).
  - Core 2 (Surfaces): Frosted Glass with `backdrop-filter: blur(18px)`, crisp 1px borders with top-edge luminance highlight.
  - Core 3 (Text): Deep slate `#0f172a` (light) / Crisp white `#f8fafc` (dark) (Contrast > 14:1, WCAG AAA).
  - Accent Color: Vivid Royal Blue (`#2563eb` light / `#3b82f6` dark) used deliberately for primary call-to-actions and focal emphasis.
- **Rhythm & Sections**:
  - Hero Split Grid: Strong typographic statement + live floating ATS sheet mockup with metric chips.
  - Comparison Module: ATS Standard Format vs Canva/Graphic Format (Educates job seekers on parser failure causes).
  - Features Grid: 4 distinct value pillars.
  - Creator Executive Card: Darussalam with instant WhatsApp, Gmail, and Instagram connection.
