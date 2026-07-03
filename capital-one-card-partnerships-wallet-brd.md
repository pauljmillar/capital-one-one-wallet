# BRD: One Wallet — Unified Cross-Brand Rewards Shell

### Capital One · Sr. Director, Software Engineering — Card Partnerships

**Prepared for:** Paul Millar interview application **Date:** July 2026 **Handoff target:** Claude Code → Vercel

---

## 1\. Strategic Framing

### The Key Insight

Capital One's Card Partnerships org (SVP Buck Stinson) just closed three consumer-facing launches in rapid succession: T-Mobile's first-ever credit card (Nov 2025 — the first new co-brand since the $35B Discover close), an extended Kohl's Rewards Visa, and Williams-Sonoma, Inc.'s co-brand/private-label program spanning Williams Sonoma, Pottery Barn, Pottery Barn Kids, Pottery Barn Teen, West Elm, and Mark & Graham — unified under Williams-Sonoma's own loyalty program, The Key. Capital One's own press release quotes their CEO wanting cardholders to "earn and redeem across our family of brands."

Every one of those launches needed the same underlying capability: a cardholder-facing wallet experience that can be reskinned per partner brand without re-platforming. Today, at a bank running a portfolio of six-plus retail and telecom partners, each new brand launch risks becoming a bespoke front-end build. That's exactly the kind of "monolithic" pattern the JD asks a Sr. Director to break — but framed for the *product experience layer*, not just the backend.

**One Wallet** is a working prototype of that shell: a single rewards-wallet component tree with brand identity, copy, and reward rules driven entirely by a config object — demoed live across three real Capital One partner skins (Williams-Sonoma family, Kohl's, T-Mobile).

### What This Signals to the Hiring Team

1. Deep, specific knowledge of the Card Partnerships book of business — not generic "fintech" research  
2. Product instinct: this is what a customer actually touches, not an internal ops tool  
3. The engineering judgment underneath a consumer feature — a reusable shell, not three one-off apps  
4. Speed: a working, re-skinnable multi-brand demo built and shipped ahead of the interview

---

## 2\. Product Overview

**One Wallet** is a cardholder rewards experience for a Capital One co-brand card. It shows a single points balance, where those points came from across a family of brands, a redemption catalog spanning that brand family, and personalized cross-brand offers — all rendered from one component tree that re-skins instantly per partner via a config object, not a rebuild.

**The pitch in one sentence:** *Capital One has launched three new card partners in under a year. This is the wallet shell that makes brand \#4 a config change, not a quarter of front-end work.*

### Target User

A cardholder in the Williams-Sonoma, Inc. family (primary demo skin) who shops across Pottery Barn, West Elm, and Mark & Graham and wants to see and use one rewards balance, not six.

### Secondary audience (the actual interview audience)

The hiring panel, watching the **theme switcher** (Screen 5\) prove the shell is partner-agnostic in real time.

### Not in scope

- Real payment processing, account linking, or KYC — mock data only  
- Card application / underwriting flow  
- Native iOS/Android — this is a responsive web demo (call out in talking points that the same config-driven approach applies to native)

---

## 3\. Design System

Three brand themes, one shared shell. Everything partner-specific lives in a CSS custom-property block swapped via a `data-theme` attribute on `<html>`. Capital One's own identity appears only in a persistent trust footer/badge — accurate to how co-brand cards actually work (the partner brand leads, Capital One is the quiet issuer of record).

### Base tokens (shell chrome, shared across all themes)

:root {

  /\* Capital One trust elements — used sparingly (footer, disclosures, badge) \*/

  \--c1-navy: \#004878;

  \--c1-red: \#D22E1E;

  \--c1-navy-tint: \#E8F0F5;

  /\* Shell structure (theme-agnostic) \*/

  \--shell-radius: 12px;

  \--shell-shadow: 0 2px 12px rgba(0,0,0,0.08);

  \--space-1: 4px;  \--space-2: 8px;  \--space-3: 12px;

  \--space-4: 16px; \--space-5: 24px; \--space-6: 32px;

  \--font-display: 2.25rem;

  \--font-headline: 1.4rem;

  \--font-body: 1rem;

  \--font-caption: 0.8rem;

}

body {

  font-family: 'Inter', \-apple-system, sans-serif; /\* stand-in for Capital One Sans, which is proprietary \*/

  margin: 0;

  background: var(--theme-bg);

  color: var(--theme-text);

  transition: background 0.4s ease, color 0.4s ease;

}

### Theme A — Williams-Sonoma Family ("The Key") — default/primary demo skin

\[data-theme="key"\] {

  \--theme-primary: \#34472F;      /\* deep sage/forest — home-goods editorial feel \*/

  \--theme-primary-tint: \#E9EDE4;

  \--theme-accent: \#B08D57;       /\* warm brass/gold \*/

  \--theme-bg: \#FAF7F2;           /\* warm cream \*/

  \--theme-surface: \#FFFFFF;

  \--theme-text: \#22281F;

  \--theme-text-muted: \#6B7263;

  \--theme-font-display: 'Georgia', 'Times New Roman', serif; /\* editorial serif for hero numbers/headlines \*/

  \--theme-border: \#E3DFD5;

  \--theme-brand-name: "The Key";

}

### Theme B — Kohl's

\[data-theme="kohls"\] {

  \--theme-primary: \#800033;      /\* Kohl's siren maroon \*/

  \--theme-primary-tint: \#F5E5EB;

  \--theme-accent: \#2E7D32;       /\* Kohl's Cash green accent \*/

  \--theme-bg: \#FAFAFA;

  \--theme-surface: \#FFFFFF;

  \--theme-text: \#1A1A1A;

  \--theme-text-muted: \#6E6E6E;

  \--theme-font-display: 'Arial Black', 'Inter', sans-serif; /\* bold retail-promo feel \*/

  \--theme-border: \#E5E5E5;

  \--theme-brand-name: "Kohl's Rewards";

}

### Theme C — T-Mobile

\[data-theme="tmobile"\] {

  \--theme-primary: \#E20074;      /\* T-Mobile magenta \*/

  \--theme-primary-tint: \#FCE5F0;

  \--theme-accent: \#191919;

  \--theme-bg: \#17181A;           /\* T-Mobile skins dark by default \*/

  \--theme-surface: \#232326;

  \--theme-text: \#FFFFFF;

  \--theme-text-muted: \#A6A6AA;

  \--theme-font-display: 'Inter', sans-serif;

  \--theme-border: \#35363A;

  \--theme-brand-name: "T-Mobile Card";

}

### Shared components (globals.css)

.wallet-shell {

  max-width: 480px;

  margin: 0 auto;

  min-height: 100vh;

  background: var(--theme-bg);

}

.wallet-header {

  background: var(--theme-primary);

  color: \#fff;

  padding: var(--space-5) var(--space-4);

  border-radius: 0 0 var(--shell-radius) var(--shell-radius);

}

.points-hero {

  font-family: var(--theme-font-display);

  font-size: var(--font-display);

  font-weight: 700;

  line-height: 1;

}

.wallet-card {

  background: var(--theme-surface);

  border: 1px solid var(--theme-border);

  border-radius: var(--shell-radius);

  box-shadow: var(--shell-shadow);

  padding: var(--space-4);

  margin: var(--space-3) var(--space-4);

}

.brand-chip {

  display: inline-flex;

  align-items: center;

  gap: var(--space-1);

  font-size: var(--font-caption);

  font-weight: 600;

  padding: 2px 8px;

  border-radius: 999px;

  background: var(--theme-primary-tint);

  color: var(--theme-primary);

}

.trust-footer {

  display: flex;

  align-items: center;

  justify-content: center;

  gap: var(--space-1);

  padding: var(--space-3);

  font-size: var(--font-caption);

  color: var(--theme-text-muted);

}

.trust-footer .c1-mark { color: var(--c1-navy); font-weight: 700; }

.theme-switcher {

  position: fixed;

  top: var(--space-3);

  right: var(--space-3);

  z-index: 50;

  background: \#fff;

  border-radius: var(--shell-radius);

  box-shadow: var(--shell-shadow);

  padding: var(--space-2);

  display: flex;

  gap: var(--space-2);

}

---

## 4\. Application Layout

Single-column mobile-first shell (480px max width, centered — reads as a phone wallet even on desktop), consistent across all three themes:

┌───────────────────────────────┐

│  \[Preview partner: Key ▾\]      │ ← theme switcher (demo-only chrome)

├───────────────────────────────┤

│  HEADER (theme-primary bg)     │

│  \[Brand logo\]  \[The Key\]       │

│  12,480 pts                    │

│  "Earn & redeem across         │

│   Williams Sonoma · Pottery    │

│   Barn · West Elm · Mark &     │

│   Graham"                      │

├───────────────────────────────┤

│  MAIN (scrollable)             │

│  ...screen content...          │

├───────────────────────────────┤

│  BOTTOM NAV                    │

│  Home · Activity · Redeem ·    │

│  Offers                        │

├───────────────────────────────┤

│  Issued by Capital One, N.A.   │ ← trust-footer, always present

└───────────────────────────────┘

---

## 5\. Screens

### Screen 1: Wallet Home

**Route:** `/`

- **Points hero:** big number in `--theme-font-display`, animates on theme switch (count up/down to reflect that brand's mock balance)  
- **Brand contribution bar:** horizontal stacked bar showing where points came from this year, one segment per brand in the family (e.g., Pottery Barn 44%, West Elm 31%, Williams Sonoma 18%, Mark & Graham 7%). Segment colors are muted tints of `--theme-primary`, not fully saturated — keeps it legible.  
- **Quick actions:** 3 buttons — Redeem, View Activity, Explore Offers  
- **"Powered by Capital One" micro-badge** in the corner of the header, small, quiet — accurate to real co-brand card design

### Screen 2: Activity Feed

**Route:** `/activity`

List of transactions, most recent first. Each row:

\[Brand chip: West Elm\]   Sofa purchase          \+840 pts

                          Jun 14                  $420.00

- `brand-chip` component reused from Screen 1  
- Filter pills at top: All · Williams Sonoma · Pottery Barn · West Elm · PB Kids · PB Teen · Mark & Graham  
- Filtering is instant (client-side, no loading state needed for the demo)

### Screen 3: Redeem — Rewards Catalog

**Route:** `/redeem`

Grid of redemption cards (2 columns on mobile width), each spanning the brand family:

┌─────────────┐  ┌─────────────┐

│ $25 off      │  │ Free ship    │

│ West Elm     │  │ PB Kids      │

│ 2,500 pts    │  │ 1,200 pts    │

└─────────────┘  └─────────────┘

- Card tap → simple confirm modal ("Redeem 2,500 pts for $25 off at West Elm?") → success toast. No real transaction — mock state only.  
- Sort/filter: "All brands" vs. single-brand filter (same chip pattern as Screen 2\)

### Screen 4: Personalized Offers — the product insight screen

**Route:** `/offers`

This is the screen that should make a product leader lean in. Offers are framed as *cross-brand* insights, not single-brand coupons:

┌─────────────────────────────────────────┐

│  Because you shop Pottery Barn Kids      │

│  and West Elm, here's a boosted offer    │

│  at Mark & Graham                        │

│                                           │

│  3X points on gifts through July 31      │

│  \[ View offer \]                          │

└─────────────────────────────────────────┘

3–4 of these cards, each with a one-line "why you're seeing this" rationale tying two brands together. This is the payoff of unifying the wallet: cross-brand purchase signal enables offers no single-brand program could generate. Say this explicitly in the demo — it's the actual business case for the shell existing.

### Screen 5: Theme Switcher — the platform-proof moment

**Not a real screen in a shipped product** — an explicit "Preview partner" dropdown pinned top-right, styled distinctly from the wallet chrome (white pill, small, obviously a dev/demo control) so it never reads as confusing the interviewer about what's real.

Selecting **Key / Kohl's / T-Mobile** re-renders the *entire* wallet — header, points hero font, card colors, brand chips, copy — by swapping `data-theme` and the active `brands.json` config. Use a quick CSS transition (200–300ms cross-fade) so the reskin reads as intentional, not a flash of unstyled content.

**This is the single moment to build the whole live demo around.** Open on Key, walk through Screens 1–4, then hit the switcher and show Kohl's and T-Mobile render from the same code. Say: "This is the same component tree. Onboarding brand \#4 is a config file, not a rebuild."

---

## 6\. Mock Data

All hardcoded JSON, no backend.

src/

  data/

    brands.json         ← theme configs \+ per-brand metadata for all 3 skins

    transactions.json    ← activity feed, tagged by sub-brand

    rewards.json         ← redemption catalog

    offers.json           ← personalized cross-brand offers

### brands.json (excerpt)

{

  "key": {

    "name": "The Key",

    "family": \["Williams Sonoma", "Pottery Barn", "Pottery Barn Kids", "Pottery Barn Teen", "West Elm", "Mark & Graham"\],

    "pointsBalance": 12480,

    "contribution": \[

      { "brand": "Pottery Barn", "pct": 0.44 },

      { "brand": "West Elm", "pct": 0.31 },

      { "brand": "Williams Sonoma", "pct": 0.18 },

      { "brand": "Mark & Graham", "pct": 0.07 }

    \]

  },

  "kohls": {

    "name": "Kohl's Rewards",

    "family": \["Kohl's"\],

    "pointsBalance": 3120,

    "contribution": \[{ "brand": "Kohl's", "pct": 1.0 }\]

  },

  "tmobile": {

    "name": "T-Mobile Card",

    "family": \["T-Mobile"\],

    "pointsBalance": 8760,

    "contribution": \[{ "brand": "T-Mobile", "pct": 1.0 }\]

  }

}

### transactions.json (excerpt)

\[

  { "id": 1, "theme": "key", "brand": "West Elm", "desc": "Sofa purchase", "date": "2026-06-14", "amount": 420.00, "points": 840 },

  { "id": 2, "theme": "key", "brand": "Pottery Barn Kids", "desc": "Bunk bed", "date": "2026-06-02", "amount": 680.00, "points": 1360 }

\]

---

## 7\. Tech Stack for Build

| Concern | Choice | Reason |
| :---- | :---- | :---- |
| Framework | React 18 \+ Vite | Fast Vercel deploys |
| Theming | CSS custom properties \+ `data-theme` attribute | No CSS-in-JS overhead; trivially swappable, matches how real design-token systems drive white-label products |
| Routing | React Router v6 | Screens 1–4 as routes; theme state in top-level context, persists across routes |
| Animation | Framer Motion (optional, for points count-up and theme cross-fade) | Small, worth it for the demo's key moment |
| Charts | Recharts (brand contribution bar) | Lightweight |
| Fonts | Inter (body) \+ Georgia (Key theme display) via Google Fonts / system stack | Capital One Sans is proprietary — call this out as an intentional substitution, not an oversight |
| Deploy | Vercel | Zero config |

---

## 8\. Key Demo Talking Points

1. **Open on The Key, in character as a cardholder:** "This is a Williams-Sonoma family cardholder. One balance, one activity feed, across six brands they might touch in a single year."  
2. **Point at the contribution bar:** "This is real — Capital One's own press release for this deal says cardholders should be able to 'earn and redeem across the family of brands.' This is what that sentence looks like as a product."  
3. **The offers screen:** "This is the part that only works because the wallet is unified. A single-brand loyalty program can't say 'because you shop here and here, here's an offer over there.' That cross-brand signal is the actual business case for building this as one wallet."  
4. **The switcher — the moment:** "Now watch." Switch to Kohl's, then T-Mobile. "Same code. Same component tree. Different config. Capital One's launched three new card partners in under a year — T-Mobile, Kohl's, Williams-Sonoma. The org that owns this shell turns brand \#4 into a config change instead of a quarter of front-end work."  
5. **Close on the trust footer:** "This stays quiet — 'Issued by Capital One, N.A.' — because that's how these programs actually work. The partner brand leads. Capital One is the infrastructure underneath. That's the whole thesis of Card Partnerships, and it's baked into the UI, not just the pitch."

---

## 9\. Vercel Deployment Notes

npm create vite@latest one-wallet \-- \--template react

cd one-wallet

npm install react-router-dom recharts framer-motion

\# copy src/ structure per Section 6, theme CSS per Section 3

npm run build

vercel \--prod

Project name suggestion: `capital-one-one-wallet`. Put the live URL in the application / follow-up note.

---

## 10\. What This Demo Proves

| JD Requirement | How the Demo Addresses It |
| :---- | :---- |
| Customer-facing web/mobile applications | The entire artifact is a cardholder-facing experience, not an internal tool |
| Break monolithic patterns into reusable services | Applied to the product layer: one config-driven shell instead of N bespoke brand builds |
| Work with product managers on desired capabilities | Screen 4 (personalized offers) is the kind of feature only a PM+eng partnership would identify — cross-brand signal as a product opportunity |
| Deploy across AWS/cloud environments at speed | The whole pitch is launch velocity — brand \#4 as config, not quarter-long rebuild |
| Bring destination-technology mindset balancing bold innovation with architectural discipline | The shell is the discipline; the cross-brand offers are the innovation — both from one build |
| Knowledge of Capital One's actual business | Real partners (T-Mobile, Kohl's, Williams-Sonoma/The Key), real press-release language, real brand colors |

---

*Handoff to Claude Code: build from Section 7 tech stack, Section 5 screen specs, Section 6 data model, and Section 3 theme tokens. Deploy to Vercel. Lead the live demo with the Screen 5 theme switcher.*  
