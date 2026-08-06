# Contributing to Triple Island

## Development Workflow

### Branch Strategy
- `main` — Production (protected)
- `develop` — Integration branch (protected, planned)
- `wip/*` — Feature branches (working in progress)
- `fix/*` — Bug fix branches
- `docs/*` — Documentation updates

### Pull Request Process
1. Create feature branch from `develop`
2. Make changes following code standards
3. Run local validation:
   ```bash
   npm run lint    # Must pass
   npm run build   # Must succeed
   ```
4. Push branch and open PR against `develop`
5. Fill out PR template completely
6. Wait for CI checks (lint + build)
7. Request review from team
8. Merge after approval and green CI

### Commit Message Format
Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style/formatting (no logic change)
- `refactor:` Code restructure (no behavior change)
- `test:` Adding/updating tests
- `chore:` Build process, dependencies, etc.

Examples:
```
feat: add AI chatbot widget with Groq integration
fix: resolve villa image aspect ratio on mobile
docs: update README with AI provider setup
refactor: extract recommender logic to lib/recommender.ts
```

## Code Standards

### TypeScript
- **Strict mode enabled**: All code must pass TypeScript compilation
- **No `any` types**: Use proper typing or `unknown` with type guards
- **No `unknown[]`**: Define array element types explicitly
- **Export types**: Share types across boundaries via `src/types/`

### React/Next.js
- **Server components by default**: Use `"use client"` only when needed (state, events, browser APIs)
- **Async server components**: Fetch data directly in components when possible
- **File naming**: `kebab-case.tsx` for files, `PascalCase` for component names
- **No default exports for utilities**: Named exports for better refactoring

### Styling
- **Tailwind only**: No inline styles or CSS modules
- **Design contract first**: Use tokens from `src/lib/design-contract.ts`
- **Semantic classes**: `bg-primary` > `bg-[#00bfbf]`
- **Mobile-first**: Base styles for mobile, `lg:` for desktop
- **Responsive breakpoints**: Match Figma specs (390w mobile, 1440w desktop)

### API Routes
- **Type request/response**: Define interfaces for POST bodies and responses
- **Validate inputs**: Check required fields, sanitize data
- **Error handling**: Return proper HTTP status codes and error messages
- **No CORS**: Next.js API routes are same-origin only

## Environment Variables

### Required for Development
```bash
WORDPRESS_API_URL          # CMS data source
HUBSPOT_PORTAL_ID          # Lead capture
HUBSPOT_FORM_ID_SOLICITUD  # Villa inquiry form
HUBSPOT_FORM_ID_RETIRO     # Retreat booking form
HUBSPOT_FORM_ID_WAITLIST   # Waitlist form
AI_PROVIDER                # groq or gemini
GROQ_API_KEY              # If AI_PROVIDER=groq
GEMINI_API_KEY            # If AI_PROVIDER=gemini
```

### Optional
```bash
TURNSTILE_SECRET_KEY              # Anti-spam (server)
NEXT_PUBLIC_TURNSTILE_SITE_KEY    # Anti-spam (client)
AI_MODEL                          # Override default model
LEAD_MIN_SUBMIT_SECONDS           # Bot detection threshold
```

### Never Commit
- `.env.local` (in `.gitignore`)
- API keys, secrets, tokens
- Passwords or credentials
- Personal identifying information

## Testing

### Manual Testing Checklist
Before submitting PR:
- [ ] Home page loads (mobile + desktop)
- [ ] `/villas` renders villa list (or fallback if WP disconnected)
- [ ] `/villas/[slug]` shows villa detail
- [ ] `/retiros` shows retreat calendar
- [ ] `/solicitud` form submits to HubSpot (check Network tab)
- [ ] Chatbot widget opens/closes, sends messages
- [ ] No console errors in browser
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes

### CI Checks
GitHub Actions automatically run on all PRs:
- **Lint**: ESLint with project config
- **Build**: Production build validation
- **Security**: Secret scanning, .gitignore validation

All checks must pass before merge.

## Design Fidelity

### Figma-to-Code Workflow
1. **Get node ID** from Figma (right-click → Copy link → extract ID)
2. **Document in code**: Add comment with node ID
   ```tsx
   {/* Hero — Figma node 6038:2393 (mobile, 390w) */}
   ```
3. **Use exact values**: Copy font sizes, spacing, colors from Figma
4. **Register tokens**: Add new colors/spacing to `design-contract.ts` before using
5. **Validate both breakpoints**: Mobile (390w) and desktop (1440w)

### Design Contract Rules
- **Prefix**: All tokens use `cb-` (Coco B)
- **Source of truth**: `src/lib/design-contract.ts`
- **No arbitrary values**: `text-[23.5px]` is OK if from Figma, `text-[24px]` approximation is not
- **Semantic mapping**: Update `globals.css` when tokens change

## WordPress Integration

### CPT Structure
Custom plugin: `wordpress/plugins/cocob-core/cocob-core.php`

Registered types:
- `villa` — Luxury villas
- `retiro` — Wellness retreats
- `paquete` — Packages/offers
- `testimonio` — Client testimonials

### ACF Fields
Each CPT has ACF fields (defined in WP admin):
- Villas: `suites`, `max_guests`, `price_per_night`, etc.
- Retreats: `start_date`, `end_date`, `price`, `retreat_type`, etc.

### Fetchers
All WP data goes through `src/lib/wp-fetchers.ts`:
- `getVillas()` → `Villa[]`
- `getVilla(slug)` → `Villa | null`
- `getRetreats()` → `Retreat[]`
- `getPackages()` → `Package[]`
- `getTestimonials()` → `Testimonial[]`

**Type safety**: All responses typed in `src/types/cms.ts`

## AI Integration

### Provider Selection
- **Groq (recommended)**: Fast, free tier 30 RPM / 14.4k RPD
- **Gemini (fallback)**: Google AI, generous limits

### Grounding Strategy
**Server-side only**: Villa list injected in `/api/chat` route before sending to AI.

Why server-side:
- Prevents client manipulation
- No hallucination (AI sees real villas)
- Consistent across all chats

### Rate Limit Handling
Current: No retry logic (fails fast)  
Future: Implement exponential backoff if needed

## Security

### Anti-spam
Cloudflare Turnstile integration:
- **Opt-in**: Disabled if env vars missing
- **Server verification**: `/api/lead` validates token
- **Client render**: `solicitud` page shows widget if key present

### Input Validation
- **Server-side**: Never trust client data
- **HubSpot payloads**: Sanitize all form fields
- **AI prompts**: Limit message length (4000 chars), history (20 messages)

### Secret Management
- **Never commit**: `.env.local` in `.gitignore`
- **GitHub Secrets**: Store in repo settings for CI/CD
- **Vercel**: Add env vars in project settings
- **Rotate keys**: If leaked, regenerate immediately

## Common Issues

### Build Fails
```
Error: Cannot find module 'sharp'
```
**Fix**: `npm install sharp` (image optimization)

### Type Errors
```
Property 'acf' does not exist on type 'Villa'
```
**Fix**: Update `src/types/cms.ts` with correct ACF structure

### API Route 500
```
TypeError: Cannot read property 'rendered' of undefined
```
**Fix**: Add null checks, use optional chaining `villa?.title?.rendered`

### Vercel Build Fails
```
Error: WORDPRESS_API_URL is not defined
```
**Fix**: Add env var in Vercel project settings (same as `.env.local`)

## Questions?

- Check existing issues: [GitHub Issues](https://github.com/Tiggreee/Triple_Island/issues)
- Review PR examples: [Pull Requests](https://github.com/Tiggreee/Triple_Island/pulls)
- Read docs: [README.md](README.md), [INFRA-02-WORDPRESS-LOCAL.md](INFRA-02-WORDPRESS-LOCAL.md)
