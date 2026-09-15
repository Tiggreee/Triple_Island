# Mensaje para el canal de desarrollo

Para pasar a Oscar, Gerson y Victor. Copiar y pegar; ajustar fechas antes de enviar.

---

Equipo, les paso el handoff de componentes completo. Son dos carpetas:

**`figma-parts/`** — 97 piezas HTML, una por componente, con el **CSS real** del prototipo desplegado, no una reescritura. Cada archivo se abre solo en el navegador y ahí ven el comportamiento exacto: hovers, animaciones, estados de error, los ocho estados del calendario. Si tienen duda de cómo se ve algo, abren la pieza en vez de preguntarme.

**`handoff/`** — la documentación:
- `CocoB-Guia-Visual-Figma.html` — todo renderizado en una sola página con nav para saltar de sección
- `CocoB-Guia-Completa.md` — la especificación escrita con la lógica de cada cosa
- `CocoB-Design-Tokens.json` — tokens en formato Tokens Studio
- `CocoB-Master-Componentes.md` — nomenclatura y properties del archivo de Figma

## Lo que necesito que revisen antes de tocar código

**1. El PMS.** El calendario usa ocupación real de agosto 2026 pero está hardcodeada en el prototipo (`BOOKED`). ¿Alguien ya confirmó con el cliente si el sistema tiene API o exportación iCal? Sin eso `bookedFor()`, `augStatus()` y toda la validación de rango no tienen fuente viva. Es bloqueante para el paso 2 del stepper.

**2. La intersección de calendarios del mix & match.** Este es el punto delicado. No es mostrar dos calendarios: la disponibilidad de un par es el **solape** de ambos, y hay un tercer estado — "una de las dos ocupada" — que necesita señal visual propia. La lógica está en `bookedFor()` y `partialFor()` en el prototipo. No es una idea de diseño: sale del PMS y del tarifario 2027, que ya vende "Lola 13" como unidad con precio propio.

**3. Los eventos de GA4.** El funnel del stepper necesita tres eventos custom disparados en `goStep()` vía GTM: `stepper_inicio`, `stepper_fechas_seleccionadas`, `stepper_completado`. No vienen de fábrica en GA4. Sin eso no podemos medir dónde se cae la gente y llegamos a la demo sin números.

**4. Los nombres de las villas.** Necesito que fijemos la convención **antes** de que tipeen las interfaces. El tarifario oficial dice: Casa Coco, Villa Encantada, Casa Lola, Casa Cielo, y Lola 13 para el compound. Los documentos viejos alternan con "Villa Coco" y "Casa del Cielo". Cambiarlo después de que estén las props es carísimo.

**5. `ckApply()` del banner de cookies.** Es el punto exacto donde se engancha GA4 y el pixel. Si no queda conectado ahí, se disparan antes del consentimiento.

## Contrato de datos del stepper

Para que no lo tengan que deducir del código:

```
guests (1–28)
  ↓
filtra villas individuales por capacidad
  ↓
si guests > 14 → entran también los compounds al selector
  ↓
villa seleccionada
  ↓
calendario:
  - si es individual  → BOOKED[i]
  - si es compound    → unión de BOOKED de ambas (una noche ocupada
                        en cualquiera bloquea la noche del par)
  ↓
selección de rango:
  - ninguna noche ocupada puede quedar dentro (rangeHasBusy)
  - el check-out no puede pasar de la siguiente noche ocupada (nextBusyAfter)
  - mínimo de noches según temporada: 5 Thanksgiving/Spring Break,
    7 Navidad/Año Nuevo, 3 el resto
  ↓
formulario (4 campos obligatorios + consentimiento)
  ↓
envío
```

## Tres cosas de accesibilidad que ya están resueltas y no hay que romper

- **Todos los inputs a 16 px.** Por debajo, iOS hace zoom automático al enfocar y rompe el modal.
- **Ningún estado depende solo del color.** El calendario usa tachado, raya diagonal, rayado de 45° y opacidad además del tono. Si se simplifica a solo color, perdemos AA.
- **`prefers-reduced-motion` apaga todo el movimiento.** Está global, no lo quiten al refactorizar el CSS.

Cualquier duda de comportamiento, la pieza suelta correspondiente la responde más rápido que yo. Lo que sí necesito de ustedes son los cinco puntos de arriba, sobre todo el del PMS.

Gracias.
