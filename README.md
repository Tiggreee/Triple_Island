Triple Island

Sitio de Coco B Isla — villas de lujo, hoteles boutique y retiros en Isla Mujeres. Next.js con App Router, WordPress headless como CMS, captura de leads a HubSpot y un chatbot con grounding sobre las villas.

Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4 (tokens de diseño con prefijo `cb-`)
- WordPress headless (REST API) + MySQL
- HubSpot Forms v3 para leads
- Chatbot: Groq (`gpt-oss-20b`) con grounding server-side; Gemini como alternativa vía `AI_PROVIDER` (sin failover automático)
- Cloudflare Turnstile anti-spam (opcional)
- Google Analytics 4 opcional, opt-in por consentimiento

Reserva

El flujo es un stepper de tres pasos (huéspedes → fechas → datos) que sale del detalle de villa y de `/solicitud`. El calendario trabaja con fechas reales, mínimos de noches por temporada e impuesto del 21% a la vista. Para grupos grandes ofrece villas combinadas (Lola & Encantada, Coco & Cielo): una noche está libre solo si ambas casas lo están, y las que tienen una sola ocupada se marcan aparte. Todo termina en `/api/lead` → HubSpot. Retiros y waitlist entran por el mismo `/solicitud` con un formulario contextual.

Despliegue

Corre en Azure Container Apps (resource group `cocob-isla-rg`): frontend y WordPress como contenedores separados, MySQL Flexible Server, Key Vault, Storage y Application Insights, con Azure Front Door al frente (caché de borde + compresión). Infra como código en [infra/azure/](infra/azure) (Bicep).

Flujo de ramas: `develop` valida, `main` despliega. Un push o merge a `main` construye la imagen y actualiza producción solo; un push a `develop` solo corre los checks, no despliega.

- CI (lint + build + checks de seguridad) en cada push/PR a `develop` y `main`.
- CD a Azure en push a `main` vía OIDC (`az acr build` + `az containerapp update`). Sin secretos de larga vida.
- La imagen del frontend se construye en la nube; no requiere Docker local.

Getting Started

```bash
npm install
# copia .env.example a .env.local y llena las variables
npm run dev            # http://localhost:3000
npm run build
npm run lint
```

Variables clave (`.env.local`): `WORDPRESS_API_URL`, `HUBSPOT_PORTAL_ID` + `HUBSPOT_FORM_ID_*`, `AI_PROVIDER` (groq|gemini) + `AI_API_KEY` + `AI_MODEL`, `TURNSTILE_*` (opcional), `NEXT_PUBLIC_GA_MEASUREMENT_ID` (opcional), `LEAD_MIN_SUBMIT_SECONDS`. Plantilla completa en [.env.example](.env.example).

WordPress local

```bash
docker compose up -d   # WP en http://localhost:10004
```

Plugin propio [wordpress/plugins/cocob-core](wordpress/plugins/cocob-core): registra los CPT Villa, Retiro, Paquete y Testimonio con sus campos meta (fechas, capacidad, precios, galería) expuestos por REST y editables desde wp-admin.

Rutas y API

- Páginas: `/` home · `/villas` listado · `/villas/[slug]` detalle · `/retiros` calendario · `/solicitud` reserva y consulta · `/styleguide` tokens
- API: `/api/lead` (POST → HubSpot) · `/api/chat` (POST, chatbot) · `/api/recommend` (GET, recomendador)

Estructura

`src/app` (páginas + API) · `src/components` (`ui/` primitivos, `booking/` stepper, `chat/` widget) · `src/lib` (wp-client, wp-fetchers, availability, recommender, analytics, design-contract, server-env) · `src/types/cms.ts` · `wordpress/plugins/cocob-core`.

Notas

- Chatbot: grounding server-side sobre las villas reales, límite 20 mensajes / 4000 chars, fallback a formulario.
- Anti-spam: Turnstile opcional; si faltan las llaves se desactiva solo y se valida en `/api/lead` antes de HubSpot.
- Analytics: GA4 solo carga si hay Measurement ID y el visitante acepta analytics en el banner de cookies.
- Recomendador: determinista (sin costo IA); entra `group_size` + `purpose`, salen top 3 villas + top 2 retiros.
- Datos: las páginas leen WordPress vía [src/lib/wp-fetchers.ts](src/lib/wp-fetchers.ts) con fallback a datos reales si un campo meta viene vacío.
- Tokens de diseño: [src/lib/design-contract.ts](src/lib/design-contract.ts) (prefijo `cb-`), reflejados en `globals.css`, referencia en `/styleguide`.

Contribuir

- Trabaja en una rama desde `develop` y abre tu Pull Request.
- `main` está protegida: entra solo por PR con CI en verde y una aprobación; al mergear, el CD despliega. `develop` integra sin desplegar.
