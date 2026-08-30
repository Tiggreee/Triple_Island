Triple Island

**Sitio:** https://www.cocobisland.site/

Experiencia web unificada de Coco B Isla (villas) y Coco B Wellness (retiros) en Isla Mujeres: descubrir villas, explorar retiros y enviar solicitudes de reserva que llegan a HubSpot, con un chatbot que responde dudas sobre las villas. El foco del sprint es el flujo de rentar una villa.

Estado del proyecto

Repo listo para entrega. Sobre la base funcional del sprint se aplicó una ronda de hot fixes y un detallado final de fidelidad visual (tipografía, espaciados, radios de esquina, header, formularios) para dejar el sitio en estado de producción — desplegado en Azure Container Apps, con dominio propio y certificado válido. Este dominio es el entregable final; los materiales usados durante la demo (incluido el prototipo estático) quedan como referencia de diseño, no como el producto que se entrega.

Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4
- WordPress headless (REST API): contenido de villas y retiros administrable desde wp-admin sin tocar código
- HubSpot para captura de solicitudes (sin pago en línea), con anti-spam básico
- Chatbot IA (Groq / Gemini) con grounding sobre las villas, límites y fallback a formulario

Reserva

El flujo es un stepper de tres pasos (huéspedes → fechas → datos) que sale del detalle de villa y de `/solicitud`. El calendario trabaja con fechas reales, mínimos de noches por temporada e impuesto del 21% a la vista. Para grupos grandes ofrece villas combinadas (Lola & Encantada, Coco & Cielo): una noche está libre solo si ambas casas lo están, y las que tienen una sola ocupada se marcan aparte. Todo termina en `/api/lead` → HubSpot. Retiros y waitlist entran por el mismo `/solicitud` con un formulario contextual.

Decisiones y mejoras futuras

- **Disponibilidad no es en tiempo real.** El calendario del stepper lee un set de fechas fijo en `src/lib/availability.ts`, no un PMS en vivo — está fuera de alcance de este sprint. Enviar una solicitud no bloquea la fecha para otros visitantes: "reservar" aquí significa capturar un lead calificado en HubSpot para que una persona confirme por fuera. Integrar un PMS real (Sirvoy) queda documentado como mejora de una fase posterior.
- HubSpot recibe las solicitudes por el Forms API público (sin autenticación, portal + form ID). Si un envío no aparece en la lista de contactos, revisa Marketing → Forms → Submissions: HubSpot registra el envío ahí incluso cuando no crea el contacto (por ejemplo si el correo no pasa su validación).

Despliegue

Producción: https://www.cocobisland.site/

Frontend y WordPress corren como contenedores en Azure Container Apps, con dominio propio y certificado administrado. Un push o merge a `main` despliega; `develop` solo corre los checks (lint + build), no despliega.

Getting Started

```bash
npm install
# copia .env.example a .env.local y llena las variables
npm run dev            # http://localhost:3000
npm run build
npm run lint
```

Variables clave (`.env.local`): `WORDPRESS_API_URL`, `HUBSPOT_PORTAL_ID` + `HUBSPOT_FORM_ID_*`, `AI_PROVIDER` (groq|gemini) + `AI_API_KEY` + `AI_MODEL`, `TURNSTILE_*` (opcional), `LEAD_MIN_SUBMIT_SECONDS`. Plantilla completa en [.env.example](.env.example).

WordPress local

```bash
docker compose up -d   # WP en http://localhost:10004
```

Plugin propio [wordpress/plugins/cocob-core](wordpress/plugins/cocob-core): registra los CPT Villa, Retiro, Paquete y Testimonio con sus campos meta (fechas, capacidad, precios, galería) expuestos por REST y editables desde wp-admin.

Rutas y API

- Páginas: `/` home · `/villas` listado · `/villas/[slug]` detalle · `/retiros` retiros · `/solicitud` reserva y consulta
- API: `/api/lead` (POST → HubSpot) · `/api/chat` (POST, chatbot)

Estructura

`src/app` (páginas + API) · `src/components` (`ui/` primitivos, `booking/` stepper, `chat/` widget) · `src/lib` (wp-client, wp-fetchers, availability, server-env) · `src/types/cms.ts` · `wordpress/plugins/cocob-core`.

Notas

- Chatbot: grounding server-side sobre las villas reales, límite 20 mensajes / 4000 chars, fallback a formulario.
- Anti-spam básico en los formularios, validado en `/api/lead` antes de HubSpot.
- Datos: las páginas leen WordPress vía [src/lib/wp-fetchers.ts](src/lib/wp-fetchers.ts) con fallback a datos reales si un campo meta viene vacío.

Contribuir

- Trabaja en una rama desde `develop` y abre tu Pull Request.
- `main` está protegida: entra solo por PR con CI en verde y una aprobación; al mergear, el CD despliega. `develop` integra sin desplegar.
