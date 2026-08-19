Triple Island

Sitio de Coco B Isla (villas de lujo, hoteles boutique y retiros en Isla Mujeres). Next.js con App Router, WordPress headless como CMS, formularios a HubSpot y un chatbot con grounding sobre las villas reales.

Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4
- WordPress headless (REST API) + MySQL
- HubSpot Forms v3 para leads
- Chatbot: Groq (`gpt-oss-20b`) con grounding server-side. Gemini queda como alternativa, se elige con `AI_PROVIDER` — no hay failover automático entre ambos
- Cloudflare Turnstile para anti-spam (opcional, se activa si están las llaves)

Despliegue

Todo corre en Azure Container Apps, resource group `cocob-isla-rg`. No usamos Vercel.

- Frontend (Next.js) y WordPress como contenedores separados
- MySQL Flexible Server (westus2), Key Vault, Storage y Application Insights
- Azure Front Door delante del frontend (caché de borde + compresión)
- Imágenes en ACR, pull vía managed identity
- Infra como código en [infra/azure/](infra/azure) (Bicep)

La imagen del frontend se construye en la nube con `az acr build` (no requiere Docker local) y se despliega con `az containerapp update --image`.

Getting Started

Correr en local

```bash
npm install
# copia .env.example a .env.local y llena las variables
npm run dev            # http://localhost:3000
npm run build && npm start
npm run lint
```

Variables clave (`.env.local`): `WORDPRESS_API_URL`, `HUBSPOT_PORTAL_ID` + `HUBSPOT_FORM_ID_*`, `AI_PROVIDER` (groq|gemini) + `AI_API_KEY` + `AI_MODEL` (`openai/gpt-oss-20b`), `TURNSTILE_*` (opcional), `LEAD_MIN_SUBMIT_SECONDS`. Plantilla completa en [.env.example](.env.example).

WordPress local

```bash
docker compose up -d   # WP en http://localhost:8080
```

Plugin propio [wordpress/plugins/cocob-core](wordpress/plugins/cocob-core): registra los CPT Villa, Retiro, Paquete y Testimonio con sus campos meta (fechas de retiro, capacidad, precios, galería) expuestos por REST y editables desde wp-admin. Guía: [INFRA-02-WORDPRESS-LOCAL.md](INFRA-02-WORDPRESS-LOCAL.md).

Rutas y API

- Páginas: `/` home · `/villas` listado · `/villas/[slug]` detalle · `/retiros` calendario · `/solicitud` formulario · `/styleguide` tokens
- API: `/api/lead` (POST → HubSpot) · `/api/chat` (POST, chatbot con grounding) · `/api/recommend` (GET, recomendador)

Flujo de datos

```
WordPress REST → src/lib/wp-fetchers.ts → páginas Next.js  (fallback a datos reales si el campo meta está vacío)
Formulario → /api/lead → HubSpot     Chat → /api/chat → Groq/Gemini     Quiz → /api/recommend → src/lib/recommender.ts
```

Estructura

`src/app` (páginas + API) · `src/components` (`ui/` primitivos, `chat/` widget) · `src/lib` (wp-client, wp-fetchers, recommender, design-contract, server-env) · `src/types/cms.ts` · `wordpress/plugins/cocob-core`.

Notas

- Chatbot: Groq `gpt-oss-20b`, grounding server-side sobre las villas reales, límite 20 mensajes / 4000 chars, fallback a formulario.
- Anti-spam: Cloudflare Turnstile opcional — si faltan las llaves se desactiva solo; se valida en `/api/lead` antes de HubSpot.
- Recomendador: determinista (sin costo IA), entra `group_size` + `purpose`, salen top 3 villas + top 2 retiros.
- Tokens de diseño: [src/lib/design-contract.ts](src/lib/design-contract.ts) (prefijo `cb-`), reflejados en `globals.css`, referencia en `/styleguide`.

Docs: [GIT-WORKFLOW.md](GIT-WORKFLOW.md) · [INFRA-02-WORDPRESS-LOCAL.md](INFRA-02-WORDPRESS-LOCAL.md) · [.env.example](.env.example) · [AUDIT.md](AUDIT.md)
