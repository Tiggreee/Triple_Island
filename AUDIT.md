# Triple Island — Audit de Estado (2026-08-13)

Reemplaza el audit del 2026-08-07, que quedó desactualizado: el #17 que listaba como
"bloqueado por seat de Figma" ya está cerrado, y desde entonces hubo un pixel-diff real
contra el sitio de referencia (no eyeballing) que encontró y cerró gaps estructurales
reales (banner de cookies faltante, hero de Villas faltante, contraste roto en el hero,
CTA duplicado, nav no contextual). Ver commits `65475d4`, `51524e1`, `c4938b1`.

## CÓDIGO FUNCIONAL ENTREGADO ✅

### Features Core
- ✅ **Home** — Hero, intro, villas, retreats, hotels, gallery, location, newsletter, footer (mobile 390w + desktop 1440w), full-bleed layout
- ✅ **Villas** — Catálogo (`/villas`) + detalle dinámico (`/villas/[slug]`) + Concierge Services section
- ✅ **Retreats** — Calendario (`/retiros`)
- ✅ **Booking stepper** — 3 pasos (Guests → Dates → Details) + confirmación, calendario con ocupación real de agosto 2026 (snapshot PMS congelado), en ambas páginas de villas — `src/components/booking/booking-modal.tsx`
- ✅ **Cookie consent banner** — esencial/analytics/marketing, persistido en localStorage — `src/components/cookie-consent.tsx`
- ✅ **Lead capture** — Form (`/solicitud`) con HubSpot Forms API v3 + Turnstile anti-spam — **todavía es el form plano original, no el stepper** (ver #22)
- ✅ **60/40 deposit terms** — en villa detail, per feedback de Caro

### AI Features
- ✅ **Chatbot** — Widget flotante rediseñado 2026-08-13 contra los componentes reales del handoff (13-01…13-09 en figma-parts.zip: FAB, teaser, panel, header, burbujas, quick replies, composer) + endpoint `/api/chat`
  - Groq (llama-3.1-8b-instant), confirmado funcionando end-to-end con la key real de `.env.local`
  - Grounding: WordPress cuando esté disponible, si no, `REAL_VILLAS` (specs reales: bedrooms/bathrooms/guests/precio) — antes solo tenía nombres sueltos y el modelo alucinaba el resto
  - **No hay fallback automático Groq→Gemini** pese a lo que decía el audit anterior — es uno u otro según `AI_PROVIDER`, no un failover real
- ✅ **Recommender** — Endpoint `/api/recommend` + lógica determinista (`src/lib/recommender.ts`)

### Arquitectura
- ✅ **WordPress integration** — Typed fetchers (`Villa[]`, `Retreat[]`, `Package[]`, `Testimonial[]`), sin `unknown[]`/`any` confirmado
- ✅ **TypeScript strict** — 100% tipado
- ✅ **Design system** — Contract tokens (Figma → CSS), full-bleed layout support
- ✅ **CI/CD** — GitHub Actions (lint + build + security checks)

### Build Status
```bash
✅ npm run lint   # Clean
✅ npm run build  # Green (11 routes)
```

---

## ISSUES CERRADOS (7)

| # | Título | Estado |
|---|--------|--------|
| #2 | INFRA-08: Proveedor IA (Groq + límites) | ✅ Completo |
| #6 | DISC-04: Spec disponibilidad | ✅ Completo |
| #7 | DISC-07: Anti-spam Turnstile | ✅ Completo |
| #9 | DISC-05: Chatbot scope + implementación | ✅ Completo |
| #10 | DISC-06: Recommender spec + código | ✅ Completo |
| #11 | DISC-02: Spec modelo contenido | ✅ Completo |
| #17 | FE-05: Home pixel-fidelity | ✅ Completo (cerrado tras el pixel-diff real, no solo lectura estructural) |

---

## CÓDIGO PENDIENTE (5 issues abiertos)

### #22 FE-06: Fusionar /solicitud con el stepper real
`/solicitud` sigue siendo el form plano original — el stepper de 3 pasos vive solo en
las páginas de villas. Dos rutas de captura de lead distintas hoy.

### #23 FE-07: Eventos GA4 del stepper
`stepper_inicio`, `stepper_fechas_seleccionadas`, `stepper_completado` — no existe
wiring de GA4/GTM en el código todavía.

### #24 FE-08: Gating de analytics por consentimiento
El banner de cookies existe y funciona, pero no hay ningún proveedor de analytics que
gatear todavía (`ckApply()` del handoff). Bloqueado por #23.

### #25 FE-09: Calendario compuesto mix & match
Lola+Encantada y Coco+Cielo deben mostrarse como intersección de ambos calendarios —
hoy solo hay un chip de aviso (`guests > 14`), no lógica real.

### #14 FE-04: Validar consumo WP compartido
**Bloqueador:** #5 INFRA-07 (WordPress compartido no disponible)
- ✅ Tipado fuerte confirmado, sin `unknown[]`/`any`
- ❌ Preview Vercel con contenido real de WP

**Acción:** Validar `/villas`, `/villas/[slug]`, `/retiros` en Vercel preview cuando WP accesible

---

## NO-CÓDIGO: BLOQUEADO EN DECISIÓN DE NEGOCIO (no es tarea de dev)

**Integración Sirvoy (PMS):** confirmado por el coach que Sirvoy es el PMS del cliente y
que el flujo real es Caro creando la reserva en Sirvoy manualmente tras confirmar el pago.
Ella no quiere doble captura (Sirvoy + WordPress) pero la sincronización automática es una
decisión de investigación (API vs iCal, latencia, qué pasa si Sirvoy cae) — no arrancar el
código de esto hasta que se resuelva. El calendario de la UI ya está construido con el
patrón de datos demo/congelados del propio prototipo, así que no bloquea nada más.

---

## CONFIGURACIÓN PENDIENTE (4 issues, NO CÓDIGO)

### #1 INFRA-01: Branch protection
**Qué hacer:** GitHub Settings → Branches → Add rule
**Config:** Require PR + 1 approval + no direct push (main + develop)
**Tiempo:** 5 min

### #3 INFRA-04: HubSpot team
**Qué hacer:** Invitar equipo por email desde HubSpot dashboard
**Documentar:** Portal ID (51808566), límites free tier
**Tiempo:** 10 min

### #4 INFRA-06: Vercel project
**Qué hacer:** Conectar repo + configurar env vars
**Bloqueador para:** #5 INFRA-07 (indirectamente), #14 FE-04
**Tiempo:** 15 min

### #5 INFRA-07: WordPress compartido
**Decisión requerida:** Hosting compartido (recomendado) vs túnel local
**Bloqueador crítico para:** #14 FE-04
**Tiempo:** 1-2 horas

---

## COORDINACIÓN/ADMIN (4 issues, NO CÓDIGO)

### #8 DISC-01: Auditoría sitios
**Acción:** Inventariar cocobisla.com + cocobwellness.com
**Tiempo:** 2-3 horas

### #12 ALIGN-01: Wireframes
**Nota (2026-08-10):** el diseño quedó congelado formalmente — el coach indicó que
UI/UX ya no debería seguir haciendo cambios de diseño y que la dirección del proyecto
pasa al equipo de dev. Esta issue puede estar obsoleta; confirmar antes de perseguirla.

### #13 ALIGN-02: Minuta
**Acción:** Junta de equipo + documentar acuerdos
**Tiempo:** 30 min reunión + 15 min doc

### #15 ADMIN-01: NDA
**Acción:** Preguntar a coordinación si NDA requerido → circular → firmar
**Tiempo:** Variable

---

## RESUMEN EJECUTIVO

### Código
| Estado | Issues | Descripción |
|--------|--------|-------------|
| ✅ **Done** | 7 cerrados | Home pixel-fidelity, chat, recommender, anti-spam, specs, AI provider |
| 🟡 **Blocked** | 1 abierto (#14) | Preview WP (bloqueado por #5 INFRA-07) |
| 🟢 **Ready** | 4 abiertos (#22–#25) | Solicitud/stepper merge, GA4, consent gating, mix & match — sin bloqueadores técnicos |

### No Código
| Tipo | Issues | Tiempo Estimado |
|------|--------|-----------------|
| **Infra/Config** | 4 | ~3 horas total |
| **Admin/Coord** | 4 (uno posiblemente obsoleto) | ~4 horas total |

### Bloqueos Críticos
1. **WordPress hosting** (#5) → #14 preview validation
2. **Vercel project** (#4) → #5 indirectamente
3. **Decisión Sirvoy** (negocio, no dev) → calendario en vivo, fuera del código por ahora

### Métricas
- **Total issues:** 25 (21 originales + 4 nuevas del 2026-08-13)
- **Cerrados:** 7 (28%)
- **Abiertos:** 18 (72%)
  - Código listo para trabajar, sin bloqueo: 4
  - Código bloqueado: 1
  - Config/infra: 4
  - Admin/coordinación: 4

---

## RECOMENDACIONES

**Prioridad 1 (código sin bloqueos, listo hoy):**
1. FE-06: fusionar /solicitud con el stepper — 22
2. FE-08 + FE-07 juntos: analytics + consent gating — 23, 24
3. FE-09: calendario mix & match — 25

**Prioridad 2 (desbloquear WP):**
4. Setup Vercel project (#4) — 15 min
5. Deploy WordPress compartido (#5) — 1-2 horas
6. Validar preview Vercel (#14) — 30 min

**Prioridad 3 (infra + coordinación):**
7. Branch protection (#1) — 5 min
8. HubSpot team invites (#3) — 10 min
9. Minuta reunión (#13), resolver NDA (#15)
10. Confirmar si #12 (wireframes) sigue vigente dado el diseño congelado

---

## ESTADO FINAL

✅ **Código funcional:** entregado y operativo, incluyendo el chat widget rediseñado y el
   grounding real de villas (2026-08-13)
🟡 **Validaciones:** bloqueadas por infraestructura externa (#5) y por decisión de negocio (Sirvoy)
📋 **Configuración:** pendiente de setup manual (no requiere desarrollo)
