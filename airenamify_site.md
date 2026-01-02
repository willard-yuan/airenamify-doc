# AiRenamify Website Design Specification

## 1. Design Philosophy & Brand Identity

**Core Concept:** "Organization via Intelligence."  
The design should feel **effortless, magical, and precise**. Just as the app cleans up file chaos, the website should be immaculate, using ample whitespace and structured grids.

*   **Visual Style:**
    *   **Modern & Minimalist:** heavily inspired by linear.app or vercel.com aesthetics.
    *   **Glassmorphism:** Subtle use of blur in sticky headers and feature cards to reflect the native macOS app feel.
    *   **Palette:**
        *   **Primary:** `#3b82f6` (Blue - Trust/Intelligence) & `#2ecc71` (Green - Success/Renamed).
        *   **Background:** `#ffffff` (Cleanliness) with subtle gray gradients (`#f9fafb`) for section distinction.
        *   **Text:** `#111827` (Deep dark gray) for readability, not pure black.
    *   **Typography:** Inter or SF Pro Display. Clean, legible, high x-height.

## 2. Information Architecture (Site Map)

*   **Home (Landing Page):** Conversion-focused single page.
*   **Pricing:** Credit packs vs. Local mode explanation.
*   **Docs/Guide:** How to use Local vs Cloud models.
*   **Login/Dashboard:** Web portal for account management (OAuth flow).

---

## 3. Landing Page Structure & Layout

### A. Navigation Bar (Sticky, Glass effect)
*   **Left:** AiRenamify Logo (SVG) + Name (Bold).
*   **Center:** Features | How it Works | Pricing.
*   **Right:** `Sign In` (Ghost button) | `Download for Free` (Primary Gradient Button).

### B. Hero Section (Above the Fold)
*   **Headline:** "Rename Files with AI Vision."
*   **Subheadline:** "Stop guessing filenames like `IMG_2934.jpg`. Drag, drop, and let AI analyze the content to give your files meaningful names instantly. Supports Images, PDFs, and Text."
*   **Primary CTA:** "Download for macOS/Windows" (Auto-detect OS icon).
*   **Secondary CTA:** "View Demo" (Video Modal).
*   **Visual Anchor:** A high-fidelity mock of the app window floating with a subtle 3D tilt. Shows a "Before & After" list of files transforming from chaos to clarity.
    *   *Animation:* A scanning beam effect moving over the file list.

### C. "The Problem" (Relatability)
*   **Layout:** Split screen or centered text.
*   **Content:**
    *   "Your Downloads folder is a mess."
    *   "You waste hours previewing files just to know what they are."
    *   *Visual:* A chaotic pile of file icons (confusing names) vs. A neat stack (AiRenamify).

### D. Core Features (Bento Grid Layout)
Use a 2x3 or 3x2 grid of cards. Each card has a subtle hover lift.

1.  **Visual Intelligence (Large Card):**
    *   *Icon:* Eye/Camera.
    *   *Text:* "It sees what you see. Uses Llama 4 Scout & GPT-4o Vision to describe images perfectly."
    *   *Visual:* An image of a cat being renamed to `ginger-cat-sleeping-sofa.jpg`.
2.  **Smart Document Analysis:**
    *   *Icon:* PDF/Text file.
    *   *Text:* "Reads PDFs & Docs. Extracts titles, summaries, or dates for filenames."
3.  **Local & Private (Privacy Focus):**
    *   *Icon:* Shield/Lock.
    *   *Text:* "Run 100% locally. Your files never leave your device with Local Mode."
4.  **Bulk Processing:**
    *   *Icon:* Stack/Layers.
    *   *Text:* "Rename thousands of files in seconds."
5.  **Cross-Platform:**
    *   *Icon:* Apple/Windows logos.
    *   *Text:* "Native performance on macOS & Windows."

### E. How It Works (Step-by-Step)
Horizontal flow with connecting lines.

1.  **Step 1: Drag & Drop.** (Animation of dropping files).
2.  **Step 2: Choose Model.** (Cloud for power, Local for privacy).
3.  **Step 3: Rename.** (Satisfying "check" animation).

### F. Pricing / Model Tiers
Two simple cards.

*   **Local Mode (Free Forever):**
    *   Runs on your hardware.
    *   Unlimited renames.
    *   Privacy-first.
*   **Cloud Mode (Credits):**
    *   Access GPT-5 Nano / GPT-4o Mini.
    *   Highest accuracy.
    *   Pay-as-you-go credits.
    *   *Badge:* "Get 50 Free Credits on Sign-up".

### G. Footer
*   **Links:** Support, Terms, Privacy Policy.
*   **Social:** Twitter/X, GitHub.
*   **Copyright:** © 2026 AiRenamify.

---

## 4. Implementation Notes for AI IDE

*   **Framework:** React + Tailwind CSS (matches the app's tech stack).
*   **Animations:** Framer Motion for the "Before/After" file transitions.
*   **Assets:**
    *   Use `heroicons` or `lucide-react` (already in project) for iconography.
    *   Reuse the `icon.svg` from the main app for branding consistency.
*   **Responsiveness:** Stack the Bento Grid on mobile; ensure the Hero image scales down.

## 5. Copywriting Tone
*   **Keywords:** Intelligent, Instant, Private, Organized.
*   **Voice:** Helpful, Technical but accessible, confident. Avoid marketing fluff; focus on utility.
