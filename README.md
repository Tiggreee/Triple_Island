# Triple Island

Plataforma base para unificar el flujo de villas y retiros.

Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- WordPress (headless)
- HubSpot Forms

## Levantar local

App:
```bash
npm install
npm run dev
```

Build:
```bash
npm run build
```

WordPress local (Docker):
```bash
docker compose up -d
```

Guía completa WP local en [INFRA-02-WORDPRESS-LOCAL.md](INFRA-02-WORDPRESS-LOCAL.md).

## Variables de entorno

Usa [.env.example](.env.example) como plantilla.

Variables clave para leads:
- HUBSPOT_PORTAL_ID
- HUBSPOT_FORM_ID_SOLICITUD
- HUBSPOT_FORM_ID_RETIRO
- HUBSPOT_FORM_ID_WAITLIST
- LEAD_MIN_SUBMIT_SECONDS

## Rutas clave

- /villas
- /villas/[slug]
- /retiros
- /solicitud
- /styleguide
- /api/lead

## Estructura base

- [src/app](src/app)
- [src/components/ui](src/components/ui)
- [src/lib](src/lib)
- [src/types](src/types)
- [wordpress/plugins/cocob-core](wordpress/plugins/cocob-core)

## Documentos de coordinación

- [docs/coordination/SEMANA-01-TAREAS-vs-COMPLETADO.txt](docs/coordination/SEMANA-01-TAREAS-vs-COMPLETADO.txt)
- [docs/coordination/QA-HANDOFF-SEMANA-01.txt](docs/coordination/QA-HANDOFF-SEMANA-01.txt)
- [docs/coordination/BLOQUEADORES-EXTERNOS-SEMANA-01.txt](docs/coordination/BLOQUEADORES-EXTERNOS-SEMANA-01.txt)
