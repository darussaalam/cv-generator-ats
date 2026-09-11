# Design Direction: CV Generator ATS

Reading this as: Productivity & Career Utility for Indonesian & global job seekers, in a Clean Slate ATS Utility style, dial ENERGY 1 / RHYTHM 2 / MOTION 1.

## Dials
- **ENERGY: 1 (Calm)**. Direct, distraction-free interface focused on resume content creation and ATS readability.
- **RHYTHM: 2 (Balanced)**. Organized form cards on the left panel with structured inputs; crisp A4 paper document canvas on the right panel.
- **MOTION: 1 (Minimal)**. Immediate state updates, crisp focus transitions, no unnecessary spinning or floating animations.

## Visual Identity & Palette
- **Base Canvas**: `#F8FAFC` (Slate 50)
- **Card Surfaces**: `#FFFFFF` with `#E2E8F0` border and 8px border-radius
- **Primary Action (Generate & Preview)**: `#2563EB` (Royal Blue) with white text (Contrast: 4.6:1, WCAG AA Pass)
- **Secondary Action (Download PDF)**: `#0F172A` (Deep Slate) with white text (Contrast: 16.1:1, WCAG AAA Pass)
- **Neutral Outline Buttons**: `#FFFFFF` background, `#CBD5E1` border, `#334155` text (Contrast: 7.2:1, WCAG AAA Pass)
- **Danger Action (Hapus)**: `#DC2626` text on `#FEE2E2` soft badge (Contrast: 4.7:1, WCAG AA Pass)
- **Text Hierarchy**:
  - Primary text: `#0F172A` (Slate 900)
  - Secondary text / hints: `#475569` (Slate 600)
  - Section uppercase badges: `#64748B` (Slate 500)

## Typography
- **Application UI**: System UI sans-serif (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`) for crisp form inputs and buttons.
- **ATS Resume Paper**: Classic ATS standard typeface (`Times New Roman, Times, serif` or `Calibri, Arial, sans-serif`) with standard hierarchy (Name 18pt bold, section titles 12pt bold uppercase with divider rule, body text 10-10.5pt, line-height 1.35) for optimal ATS parsing compliance.

## Accessibility & Layout
- Minimum touch target: 44px on interactive controls.
- Keyboard navigation: visible 2px focus ring (`#2563EB` outline with offset).
- Fully responsive: Stacks to 1 column on mobile screens <= 960px without horizontal scroll.
- Printable: Clean `@media print` layout producing vector A4 page without browser UI artifacts.
