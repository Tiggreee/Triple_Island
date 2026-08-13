Triple Island

Unified platform for Coco B Isla luxury villas, boutique hotels, and wellness retreats in Isla Mujeres, Mexico.

Features

Content Management
- Headless WordPress CMS integration
- Custom Post Types: Villas, Retreats, Packages, Testimonials
- Dynamic routing for villas and retreats
- Full TypeScript type safety for CMS data

Lead Capture & CRM
- HubSpot Forms API integration
- Multi-form support (villa inquiry, retreat booking, waitlist)
- Anti-spam protection via Cloudflare Turnstile (optional)
- Server-side form validation

AI-Powered Features
- Chatbot widget, single AI provider selected via AI_PROVIDER (Groq or Gemini — no automatic failover between them)
- Server-side villa grounding (prevents hallucination)
- Deterministic villa/retreat recommender system
- `/api/chat` and `/api/recommend` endpoints

Design System
- Figma-to-code fidelity (390w mobile, 1440w desktop)
- Central design contract with semantic tokens
- Full-bleed layout support for marketing sections
- Responsive breakpoints matching real Figma specs

Stack

- Framework: Next.js 16 (App Router, Turbopack)
- Language: TypeScript
- Styling: Tailwind CSS v4
- CMS: WordPress REST API (headless)
- CRM: HubSpot Forms API v3
- AI: Groq (llama-3.1-8b-instant) or Gemini (gemini-1.5-flash), one at a time
- Anti-spam: Cloudflare Turnstile
- Deployment: Vercel (planned)

Getting Started

Install dependencies
```bash
npm install
```

Environment variables

Copy `.env.example` to `.env.local` and configure:

```bash
# WordPress (headless CMS)
WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2

# HubSpot (lead capture)
HUBSPOT_PORTAL_ID=51808566
HUBSPOT_FORM_ID_SOLICITUD=your-form-id
HUBSPOT_FORM_ID_RETIRO=your-form-id
HUBSPOT_FORM_ID_WAITLIST=your-form-id

# AI provider — one key for whichever provider AI_PROVIDER points at
AI_PROVIDER=groq                    # or "gemini"
AI_API_KEY=your-api-key
AI_MODEL=llama-3.1-8b-instant       # or "gemini-1.5-flash"

# Anti-spam (optional, gated by presence of secret)
TURNSTILE_SECRET_KEY=your-turnstile-secret
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key

# Lead validation
LEAD_MIN_SUBMIT_SECONDS=3
```

Development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Production build
```bash
npm run build
npm start
```

Linting
```bash
npm run lint
```

WordPress local setup

Run WordPress locally with Docker:

```bash
docker compose up -d
```

WordPress will be available at `http://localhost:8080`

Full setup guide: [INFRA-02-WORDPRESS-LOCAL.md](INFRA-02-WORDPRESS-LOCAL.md)

Custom plugin: [wordpress/plugins/cocob-core](wordpress/plugins/cocob-core) — registers CPTs: Villa, Retiro, Paquete, Testimonio

Architecture

Routes

Pages
- `/` — Home (hero, villas, retreats, hotels, gallery, newsletter, footer)
- `/villas` — Villa catalog
- `/villas/[slug]` — Villa detail
- `/retiros` — Retreat calendar
- `/solicitud` — Lead capture form (villa inquiry)
- `/styleguide` — Design token reference

API endpoints
- `/api/lead` — HubSpot form submission (POST)
- `/api/chat` — AI chatbot (POST, grounded on real villas)
- `/api/recommend` — Deterministic villa/retreat matcher (GET)

Data flow

```
WordPress CMS → REST API → src/lib/wp-fetchers.ts → Next.js pages
User form → /api/lead → HubSpot Forms API
User chat → /api/chat → Groq or Gemini (per AI_PROVIDER) → Response (grounded)
User quiz → /api/recommend → src/lib/recommender.ts → Top matches
```

Key directories

```
src/
├── app/                    Next.js App Router pages & API routes
│   ├── api/
│   │   ├── chat/          AI chatbot endpoint
│   │   ├── lead/          HubSpot form submission
│   │   └── recommend/     Villa/retreat recommender
│   ├── villas/
│   ├── retiros/
│   └── solicitud/
├── components/
│   ├── ui/                Reusable UI primitives (button, card, input, etc.)
│   └── chat/              ChatWidget component
├── lib/
│   ├── wp-client.ts       WordPress fetch wrapper
│   ├── wp-fetchers.ts     Typed CMS data fetchers
│   ├── server-env.ts      Server environment validation
│   ├── recommender.ts     Deterministic matching logic
│   └── design-contract.ts Figma token system
└── types/
    └── cms.ts             TypeScript types for WordPress CPTs

wordpress/
└── plugins/
    └── cocob-core/        Custom plugin (CPT registration)
```

Design contract

Maintains 1:1 fidelity between Figma and code.

- Source: [src/lib/design-contract.ts](src/lib/design-contract.ts)
- Global CSS: [src/app/globals.css](src/app/globals.css)
- Reference: [/styleguide](http://localhost:3000/styleguide)

Rules:
- All tokens prefixed with `cb-` (Coco B)
- Semantic classes: `bg-primary`, `text-muted`, `border-border`
- No arbitrary values without contract registration

AI configuration

Groq (default)
- Model: `llama-3.1-8b-instant`
- Rate limits (free tier): 30 RPM, 14,400 RPD, 20k TPM
- Endpoint: `https://api.groq.com/openai/v1/chat/completions`
- Grounding: server-side villa list injection (no hallucination)

Gemini (alternate)
- Model: `gemini-1.5-flash`
- Endpoint: Google AI Studio API
- Selected by setting `AI_PROVIDER=gemini` — not an automatic fallback if Groq fails

Chat behavior
- Max 20 messages in history (memory limit)
- Max 4000 chars per message (truncation)
- System grounding injected server-side (villas from WP or the static rate-card fallback)
- Welcome message client-side

Anti-spam

Cloudflare Turnstile integration (opt-in via env vars):

1. Server-side: `TURNSTILE_SECRET_KEY` in `.env.local`
2. Client-side: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `.env.local`
3. Behavior: if keys missing, Turnstile disabled (graceful degradation)

Verified on `/api/lead` before HubSpot submission.

Recommender logic

Deterministic matching (no AI cost, no hallucination):

Inputs: `group_size`, `purpose` (wellness, celebration, retreat, romantic, family)
Outputs: top 3 villas + top 2 retreats with match reasons

Scoring:
- Villa capacity fit via `suites * GUESTS_PER_SUITE` (2 guests/suite assumed)
- Purpose-to-retreat-type mapping
- Stable sort by score

Endpoint: `GET /api/recommend?group_size=8&purpose=wellness`

Development workflow

Branches
- `main` — production, direct pushes blocked once branch protection is applied (tracked in issue #1, not yet configured)
- `develop` — integration branch, PRs merge here
- `feature/<task>`, `fix/<task>` — one branch per task, per [GIT-WORKFLOW.md](GIT-WORKFLOW.md)

Open work: [GitHub Issues](https://github.com/Tiggreee/Triple_Island/issues)

Documentation

- [Git Workflow](GIT-WORKFLOW.md)
- [WordPress Local Setup](INFRA-02-WORDPRESS-LOCAL.md)
- [.env.example](.env.example) — environment variable template
- [AUDIT.md](AUDIT.md) — current project status, open issues, blockers

Commands reference

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm start                # Start production server
npm run lint             # ESLint check

# WordPress
docker compose up -d     # Start WP + MySQL
docker compose down      # Stop containers
docker compose logs -f   # View logs

# Validation
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What villas do you have?"}]}'

curl "http://localhost:3000/api/recommend?group_size=8&purpose=wellness"
```

License

Private project. All rights reserved.
