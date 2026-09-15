# Coco B Isla — Guía completa de componentes

**Equipo 1 · UX/UI:** Emiliano Zárate, Estefanía Parra
**Fuente:** código de producción de `index.html` y `villas.html` desplegado en cocobislanewsite.netlify.app
**Piezas sueltas:** 97 archivos HTML en `figma-parts/`, uno por componente

Este documento y las piezas sueltas son **insumo de construcción**. El entregable final de diseño sigue siendo Figma dibujado a mano; esto sirve para no reinventar decisiones que ya están tomadas en el código, y como referencia de comportamiento para desarrollo.

---

## 1 · Tokens

### 1.1 Color

| Token | Hex | Contraste sobre blanco | Rol |
|---|---|---|---|
| `--brand` | `#5BCAEB` | **1.9:1** | Decoración, logo, celosía, marcas de agua. **Nunca texto ni fondo de botón.** |
| `--action` | `#246A94` | 5.96:1 · AA | Botones primarios, enlaces, iconos, seleccionado |
| `--action-dark` | `#1B5273` | 7.9:1 · AAA | Hover y active del primario |
| `--teal` | `#107480` | 5.50:1 · AA | Eyebrows, disponibilidad, chat, reseñas |
| `--ink` | `#1C1C1C` | 16.9:1 · AAA | Títulos |
| `--body` | `#4A4A4A` | 8.6:1 · AA | Todo el cuerpo de texto |
| `--sand` | `#FBF8F3` | — | Fondo base |
| `--sand-2` | `#F2EDE4` | — | Fondos secundarios, celda ocupada |
| `--line` | `#E3DBCE` | — | Todos los bordes de 1 px |
| `--danger` | `#A32B1C` | 7.4:1 · AA | Errores de validación |
| `--high` | `#8A5A12` | 5.9:1 · AA | Impuesto 21 %, temporada alta |

**Dos correcciones al brand guide oficial, y por qué.** El guide define Caribbean Blue como color principal y `#797979` como gris de cuerpo. El primero da 1.9:1 y el segundo 4.42:1 — ambos fallan AA como texto. No se descartó la identidad: Caribbean Blue conserva todo su peso como color de marca en logo, hero, celosía y marcas de agua, y se definieron roles de UI accesibles para lo que sí lleva texto. El cuerpo subió a `#4A4A4A`.

El guide también prescribe mayúsculas con tracking de 1.8 a 3 px **en todos los títulos** y cuerpo a 12–13 px. En el sistema el tracking alto vive solo en eyebrows, labels, nombres de villa y botones; el cuerpo va a 15–16 px con tracking de 0.1.

### 1.2 Tipografía

Brandon Grotesque como primaria, Raleway como fallback autorizado (es la que corre en el prototipo).

| Estilo | Tamaño / peso / tracking | Móvil |
|---|---|---|
| h1 hero | 74 / 200 / 5px · uppercase | 36 · 31 bajo 360 |
| h2 sección | 34 / 200 / 3px · uppercase | 28 tablet · 24 móvil |
| h3 villa | 24 / 300 / 1.85px · uppercase | 20, tracking 1.4 |
| eyebrow | 11 / 500 / 2.24px · uppercase · teal | 10, tracking 1.8 |
| lead | 16 / 400 / 1.8 line-height | 15 |
| body | 15 / 400 / 1.7 | — |
| label de campo | 10.5 / 600 / 1.8px · uppercase | 10, tracking 1.4 |
| botón | 13 / 600 / 1.6px · uppercase | 10.5, tracking 1.2 |
| **input** | **16** / 400 | **16 — no bajar** |

Los 16 px del input no son estéticos: por debajo de ese valor iOS hace zoom automático al enfocar y rompe el layout del modal.

### 1.3 Radios y medidas

`--r: 14px` en cards, slots, tiles y mapa. 20 px en modal (18 en hoja inferior, solo esquinas superiores). 11 px en input. 10 px en celda de calendario (9 en móvil). 12 px en bloques internos del modal. 999 px en botones, chips, tags, switch y barra flotante.

Altura mínima táctil 44 px; el botón estándar es 50.

---

## 2 · Azulejo

Componente raíz. **Diecisiete componentes dependen de él**, así que se construye antes que cualquier otra cosa, incluso antes que los botones.

Un solo `<symbol id="az">` con dos paths: `cross` (cruz interior) y `ring` (rombo exterior). El color **no** va en `fill` sino en dos custom properties, `--c-ring` y `--c-cross`. La razón es técnica: `<use>` crea un shadow tree que los selectores descendientes tipo `.az .ring` no cruzan, así que el fill caía a negro. Las custom properties sí heredan.

| Variante | ring | cross | Uso |
|---|---|---|---|
| base | brand | brand | Decorativo |
| `.ocean` | action | action | El que puede acompañar texto |
| `.teal` | teal | teal | Ligado a disponibilidad |
| `.white` | #fff | #fff | Sobre foto u oscuro |
| `.muted` | #B4ACA0 | #B4ACA0 | Deshabilitado |
| `.ring` | action | transparent | Marco: pasos, cue de scroll |

**En Figma:** un master con dos capas nombradas `ring` y `cross` y una property `estilo` de 6 valores. Pegar el SVG una sola vez, separar los paths y aplicar color por capa.

### 2.1 Derivados

- **`#mix`** — dos azulejos superpuestos al 95 % y 55 %, hereda `currentColor`. Distintivo de compound en card, chat y stepper. No es el azulejo suelto.
- **Celosía** — pattern de 128 px con cuatro azulejos a 44/44/21/21 px y opacidades .20/.13/.15/.15. El desvanecido se pinta con gradientes del propio color de fondo. **Nunca `mask-image` sobre el SVG**: deja un borde rectangular visible en Safari. Sobre el contenedor sí funciona, y así se usa en las marcas de agua.
- **Bullet de lista** — a 14 px sigue leyéndose como forma. Reemplaza el disco por defecto en el chat.
- **Tick en botón** — a 15 px dentro del CTA, gira 90° al hover.

### 2.2 Loaders

| Loader | Duración | Easing | Dónde |
|---|---|---|---|
| **L2 · Tick de 90°** | 2000 ms | `cubic-bezier(.7,0,.2,1)` | Botón de envío. Saltos de un cuarto con pausa: se lee como progreso, no como espera infinita |
| **L3 · Marea** | 1500 ms | ease-in-out | Sobre el calendario mientras consulta al PMS. Visible 1400 ms en cada cambio de mes |
| **Palomita** | 2600 ms | ease-in-out | Confirmación. Cinco azulejos en retícula de 32 px tangente, 140 ms entre piezas. `iteration-count:1` con `fill-mode:both`: **se queda armada** |
| **Typing** | 1250 ms | ease-in-out | Chat. Tres azulejos, 160 ms de retardo. Aparece durante `650 + longitud×22 ms` |

---

## 3 · Primitivas

### 3.1 Botón

Radio 999, altura mínima 50 px, tracking 1.6 en mayúsculas, gap 10 px con el icono.

| Variante | Fondo | Texto | Nota |
|---|---|---|---|
| primario | action | #fff | Hover a action-dark |
| `.ghost` | transparente | action | Borde 1 px action. Hover `#EAF2F7` |
| `.light` | blanco 14 % | #fff | Borde blanco 55 %, blur 8. **Se convierte en primario cuando el nav pasa a sólido** |
| `.sm` | — | — | 11.5 px, altura 42. En móvil 10.5 y 40 |
| `[disabled]` | `#B9C6CE` | #fff | `cursor:not-allowed` |

Foco global: `:focus-visible` con outline 3 px brand y offset 2.

**En Figma:** un master con properties `jerarquía` (primario / ghost / light), `tamaño` (base / sm), `icono` (boolean) y `estado` (default / hover / disabled). La rotación del azulejo va en la capa de motion.

### 3.2 Campo

Radio 11, alto mínimo 48, font-size 16. **El error se marca en el contenedor `.f`, no en el input**, para que el mensaje aparezca con él: `.f.bad` pinta borde danger, fondo `#FDF7F6` y revela `.err`.

Validación (`REQ`): nombre y apellido con más de un carácter, email contra regex, teléfono con al menos 10 dígitos tras limpiar todo lo que no sea número. Corre **en blur y se limpia en input** — nunca marca error mientras se escribe por primera vez. Al enviar con errores hace scroll al primero.

Teléfono: fila con select de país a 130 px máximo (120 en móvil) más input libre.
Checkbox: nativo de 22 px con `accent-color`, no reconstruido, para conservar el comportamiento de teclado.

### 3.3 Chip de disponibilidad

Se calcula con `augStatus(i)` sobre la ocupación real del PMS de agosto 2026:

| Noches libres | Estado | Clase | Color |
|---|---|---|---|
| ≥ 22 | *Open most of August* | — | teal |
| ≥ 12 | *Filling up · N nights free from D Aug* | `.warn` | `#7A4E0A` / azulejo `#C9922B` |
| < 12 | *Almost booked · only N nights left in August* | `.hot` | danger |
| — | *Too small for N guests* | `.no` | body / azulejo muted |

El cuarto no depende del calendario sino del contador de huéspedes. Los cuatro se distinguen por color **y por texto**, nunca solo por color.

### 3.4 Otros

- **`.pairTag`** — *Two villas* arriba a la derecha de la card. En móvil baja al pie derecho.
- **`.prov`** — *Placeholder image*. Marca las fotos provisionales; se retira cuando llegue el material definitivo de Caro.
- **Switch** — 44 × 26, `<button role="switch">` con `aria-checked`. No checkbox: así el lector de pantalla lo anuncia como interruptor. Bloqueado usa `disabled` con teal al 45 %.
- **Encabezado de sección** — eyebrow + h2 + regla con azulejo. Abre **toda** sección; en Figma es un componente con properties de texto y un boolean para el `.lead`.
- **WhatsApp** — enlace subrayado dentro del texto, **no botón verde**. Si compitiera con el CTA primario reabriríamos la fuga que el rediseño busca cerrar. La variante `.waCta` existe pero no se usa en el flujo principal.
- **Paging dots** — tira deslizante dentro de una ventana de 70 px con máscara en los extremos; tres tamaños según distancia al activo. Variante `.dark` sobre foto.

---

## 4 · Villa card

El componente más reutilizado. Tres reglas hacen que **los CTA caigan siempre en la misma línea** aunque los textos midan distinto:

1. `h3 { min-height: 29px }` — nombres de una y dos palabras ocupan lo mismo
2. `.desc { -webkit-line-clamp: 2; min-height: 50px }` — la descripción se corta en la primera frase (`v.d.split('. ')[0]`) y siempre ocupa dos líneas
3. `.spec { margin-top: auto }` — el bloque de precio se pega al fondo

En móvil los tres `min-height` se anulan y el clamp sube a 3 líneas.

**Variantes:** individual · compound (`.isPair`, borde ocean 30 % con halo de 3 px, etiqueta *Two villas*) · no cabe (chip `.no`, el CTA sigue activo).

**Nunca se oculta una card por capacidad.** Esconder inventario deja al usuario sin mapa mental de la colección; se le dice por qué no aplica y se le ofrece la salida.

### 4.1 Datos reales

Del tarifario oficial 2026–2028. **No son de ejemplo.**

| Villa | Suites | Capacidad | Desde |
|---|---|---|---|
| Casa Coco | 10 | 20 | $4,840 |
| Villa Encantada | 6 | 12 | $2,860 |
| Casa Lola | 7 | 14 | $3,740 |
| Casa Cielo | 4 (+1 opcional) | 8 | $1,665 |
| **Lola & Encantada** | 13 | 26 | $6,670 |
| **Coco & Cielo** | 14 | 28 | $6,505 · tarifa combinada por confirmar |

El impuesto del 21 % aparece **desde la card**, no al final: $4,840 que se convierten en $5,856 al cierre es la receta del abandono.

---

## 5 · Mix & match

**No es una invención de diseño.** Dos evidencias independientes: en el calendario del PMS la misma reserva ocupa dos villas a la vez, y el tarifario 2027 lista "Lola 13 (2-villa compound)" como unidad vendible de 13 suites con precio propio. Lo que hace el rediseño es digitalizar una práctica que ya existe.

**Regla que rige todo:** la disponibilidad de un par es la **intersección** de ambos calendarios. Una noche está libre solo cuando las dos casas lo están. En el código:

```js
function bookedFor(vi, s){
  const v = V[vi];
  if(!v.pair) return (BOOKED[vi]||[]).some(([a,b]) => s>=a && s<b);
  return v.pair.some(i => (BOOKED[i]||[]).some(([a,b]) => s>=a && s<b));
}
function partialFor(vi, s){   // devuelve el nombre de la casa ocupada si solo una lo está
  const v = V[vi]; if(!v.pair) return null;
  const hit = v.pair.filter(i => (BOOKED[i]||[]).some(([a,b]) => s>=a && s<b));
  return hit.length === 1 ? V[hit[0]].n : null;
}
```

`partialFor` es lo que pinta la celda rayada: *una de las dos ocupada*. Es el estado que más confunde si no se explica, de ahí la leyenda y el aviso permanente en fichas de compound.

**Los pares solo entran en el selector cuando el grupo pasa de 14** (`V.filter(v => !v.pair || guests > 14)`). No tiene sentido ofrecer dos casas a cuatro personas.

---

## 6 · Modales

Tres partes: `.mh` cabecera con thumbs, `.mbody` con scroll propio y `.mfoot`. Ancho `min(980px, 100vw − 56px)`, o 760 con `.narrow`.

**Por debajo de 620 px los tres modales pasan a hoja inferior**: agarradera de 44 × 5, radio solo arriba, altura máxima `86svh`, pie sticky en vidrio. Comparten property `Size` — no son componentes distintos.

Reglas de capa que hay que anotar aunque no se simulen en Figma:
- Con un modal abierto desaparecen la barra flotante, el FAB y el teaser (`body.modalOpen`)
- Con cualquier capa abierta se desactiva el pull-to-refresh (`html.noPull`)
- El scroll interno no se propaga (`overscroll-behavior: contain`)
- La galería manda sobre el gesto horizontal (`touch-action: pan-x`), el cuerpo sobre el vertical (`pan-y`)

### 6.1 Ficha de villa

Galería 2fr/1fr/1fr con `grid-auto-flow:dense`, primera foto a dos filas, se ocultan a partir de la sexta. Botón flotante con el total real de fotos. En móvil pasa a carrusel con snap al 82 % y aparecen los paging dots.

Debajo: spec sin precio, descripción con caja de precio a la derecha (**con el total con impuesto ya calculado**, no una nota), amenidades en dos columnas, ocho datos duros y la tabla de temporadas altas.

En fichas de compound se añade la nota de intersección y la cabecera muestra dos miniaturas encimadas.

### 6.2 Lightbox

Capa a pantalla completa, `z-index:200` — cubre incluso el modal que lo abrió. Cierra al pulsar el fondo, con la × o con Escape; navega con flechas. Los dots se agrandan a pastilla en el activo.

---

## 7 · Stepper de consulta

Tres pasos más confirmación. El subtítulo del modal hace el trabajo más importante de toda la pantalla: **"No payment, no card · we reply within 24 hours"** desactiva el miedo a comprometerse antes de que el usuario mire nada más.

### 7.1 Barra de pasos

El número vive dentro de un azulejo de 32 px que hace de marco.

| Estado | Anillo | Relleno | Número |
|---|---|---|---|
| pendiente | `#CFC7B9` | — | body |
| `.on` | action | rombo action | #fff |
| `.done` | teal | teal 14 % | teal |

**Aquí se disparan los eventos de GA4** — `stepper_inicio`, `stepper_fechas_seleccionadas`, `stepper_completado`. No vienen de fábrica: hay que instrumentarlos a mano en `goStep()` con GTM. Sin eso no hay forma de medir dónde se cae la gente.

### 7.2 Paso 1 · huéspedes

Stepper de 1 a 28, **no campo libre**: el número es la llave que filtra el inventario, no puede llegar sucio. Botones de 56 px (52 móvil) que se deshabilitan en los extremos. Cada cambio recalcula el chip de mix & match, la lista de villas y las cards de la página a la vez.

El chip tiene tres mensajes: informativo bajo 15, activo con las combinaciones que caben, y — si ni la mayor alcanza — lo dice sin rodeos en lugar de dejar al usuario sin salida.

### 7.3 Paso 2 · calendario

Semana de lunes a domingo, `(getDay()+6)%7`. Seis meses cargados; los botones se deshabilitan en los extremos.

**Ocho estados de celda:**

| Estado | Señal visual | Además del color |
|---|---|---|
| disponible | blanco con borde line | — |
| `.peak` | fondo `#FDF6E7`, borde `#E4C489` | muestra tarifa abreviada |
| `.busy` | fondo sand-2 | tachado + raya diagonal en `::after` |
| `.half` | rayado de 45° | `aria-label` nombra la casa ocupada |
| `.sel` | action sólido | — |
| `.range` | `#DCEAF2` | — |
| `.far` | opacidad 34 % | oculta el precio |
| `.out` | invisible | ocupa espacio de retícula |

**Mínimo de noches por temporada** (`SEASONS`): 5 en Thanksgiving y Spring Break, 7 en Navidad y Año Nuevo, 3 el resto. Es más frecuente de lo que parece, así que el estado "bajo el mínimo" es de primera clase, no un error genérico.

**Regla de rango:** ninguna noche ocupada puede quedar dentro de la estancia. Si el usuario lo intenta, `rangeHasBusy()` lo detecta y **no se le dice que no** — se le mueve el check-in a la fecha que eligió, se le explica cuál noche está ocupada y se le ofrece la salida por mix & match. El aviso vuelve al estado normal a los 5.2 s.

`nextBusyAfter()` limita el check-out a antes de la siguiente noche ocupada, y las celdas más allá se marcan `.far`.

### 7.4 Paso 3 · datos

Doce campos, cuatro obligatorios. El bloque de viaje es opcional pero es lo que permite cotizar completo en la primera respuesta — de ahí el placeholder concreto en lugar de "cuéntanos más".

Debajo, el resumen con una sola jerarquía: villa, fechas entre reglas, desglose con `tabular-nums` y total. Si la villa es compound la miniatura se parte en dos mitades y aparece la nota de tarifa por confirmar.

### 7.5 Pie

El pie habla en todo momento: sin fechas nombra la villa, con check-in pide el check-out, **si faltan noches para el mínimo lo dice en lugar de bloquear el botón en silencio**, y con el rango completo calcula el subtotal. `btnNext` solo se habilita en el último caso.

En móvil el orden cambia: resumen arriba, CTA a ancho completo y **el Back pierde peso de botón** — texto en minúsculas con chevron al 72 % de opacidad, para que el dedo no confunda retroceder con avanzar. En la ficha de villa el back sube a la cabecera como círculo de 38 px.

---

## 8 · Chat concierge

### 8.1 Entrada

FAB de 62 px (56 móvil) que aparece a los 5 s con rebote elástico. **El icono es una burbuja de diálogo, no el azulejo**: por Jakob's Law el punto de entrada debe ser el símbolo que la gente ya reconoce; la marca vive dentro del panel. El anillo brand late dos veces y el punto teal se enciende a los 2.6 s si sigue cerrado.

El teaser sale con el badge, **solo por encima de 620 px** — en móvil taparía media pantalla. Radio asimétrico que lo ancla al FAB.

Con la barra flotante visible el FAB sube a 100 px (118 en móvil, donde el teaser se oculta).

### 8.2 Panel

384 px de ancho, alto `min(620px, 100svh − 140px)`. En móvil, hoja inferior a 88svh. Cierra con Escape.

Cabecera con gradiente teal a 140° y azulejo blanco al 16 % enmascarado en diagonal. El punto de estado es verde en horario (7:00–23:00 Central) y ámbar fuera, junto con el aviso `.cw-away`.

Burbujas al 84 % de ancho máximo (88 en móvil), con esquina recortada a 5 px del lado que corresponde y entrada `pop` de 300 ms.

### 8.3 Contenido enriquecido

- **Villa card en miniatura** — foto de 110 px, estado real del mismo `augStatus()` que la página, CTA a ancho completo. Al pulsarla ejecuta `handoff(i)`: cierra el chat y **abre el stepper con esa villa ya elegida**. El contexto no se pierde.
- **Listas** — bullet de azulejo, con `.cwState` opcional (punto de color con el estado de agosto). La variante `.pairs` antepone la etiqueta *Two villas* con el mismo distintivo de la card.
- **Quick replies** — pastillas outline, altura mínima 38. Se limpian al enviar y se repueblan con las de la nueva respuesta. Reducen la escritura libre, que es la fuente principal de intenciones no reconocidas.
- **Composer** — textarea que crece de 44 a 110 px. Enter envía, Shift+Enter salta línea. El botón repite el gesto del sistema: el azulejo gira 90° al hover.

El motor de respuesta del prototipo es por keywords (`INTENTS`). En producción se conecta al backend real o a HubSpot; **lo que hay que conservar es la estructura de respuesta** — texto, card opcional, quick replies y el número de huéspedes detectado, que se propaga al stepper.

---

## 9 · Consentimiento de cookies

Sube desde abajo en 500 ms si no hay decisión guardada. Tres acciones con jerarquía: gestionar (enlace), solo esenciales (ghost), aceptar todo (primario). Se guarda en `localStorage` como `cocob_consent`: `{necessary:true, analytics, marketing, ts}`.

**`ckApply(v)` es el punto exacto donde dev engancha GA4 y el pixel.** Si no está ahí, se disparan antes del consentimiento y el sitio queda expuesto. Sin decisión guardada, ningún script de terceros debe cargar.

---

## 10 · Patrones de página

| Patrón | Disparador | Comportamiento |
|---|---|---|
| **Header scroll-aware** | 62 % del alto del hero | Transparente → sólido. 118 → 74 px, logo 82 → 56, el CTA light se convierte en primario. 350 ms |
| **CTA diferido** | 75 % del hero, 350 ms de retardo | Barra de vidrio (blur 22, saturate 1.25) que sube desde abajo. Se esconde arriba y en los últimos 780 px. Sube 74 px si el chat está visible |
| **Hoja inferior** | ≤ 620 px | Los tres modales y el chat comparten property `Size` |
| **Carrusel de galería** | ≤ 620 px | La galería del modal pasa de retícula a scroll horizontal con snap al 82 % |
| **Carrusel de video** | ≤ 1000 px | De 3-up a scroll con snap al 62 % (87 % en móvil) y paging dots |
| **Deep link de tile** | Tile de la landing | Abre la ficha de **esa** villa. Se documenta en la capa de prototipo, tile por tile, no como componente |
| **Handoff del chat** | Botón en la card del chat | Navega al stepper en `Step = Dates`, no en `Step = Guests` |
| **Altura del hero** | Cierre del aviso | Se recalcula `--above` y el hero recupera la altura |

### 10.1 Breakpoints

| Corte | Wrap | Qué cambia |
|---|---|---|
| Desktop > 1000 | 1200 / 48 | Retículas completas, video 3-up, modales centrados |
| Tablet 621–900 | 1200 / 32 | **Sin spans dobles** — en tiles y mosaico dejaban columnas huérfanas al final de fila, se anulan con `!important` |
| Móvil ≤ 620 | 100 % / 20 | Todo a una columna, modales como hoja inferior, inputs a 16 px |
| Angosto ≤ 360 | 100 % / 20 | Hero a 31 px, contador a 32, se oculta el precio en la celda |

### 10.2 Orden de capas

| z-index | Capa |
|---|---|
| 400 | Consentimiento de cookies |
| 200 | Lightbox |
| 121 | Panel de chat |
| 120 | FAB |
| 119 | Teaser |
| 110 | Modales |
| 100 | Scrim |
| 60 | Header |
| 55 | Barra flotante |

### 10.3 Movimiento

**Regla de oro: un solo elemento en movimiento por pantalla.** Si el aviso de sargazo se mueve arriba, el hero se queda quieto. Todo se apaga con `@media (prefers-reduced-motion: reduce)`, que anula animaciones y transiciones globalmente — es uno de los puntos de accesibilidad reportables en la demo.

---

## 11 · Accesibilidad

**Cumplido en código:**
- Contraste AA en todo el texto; los dos colores del brand guide que fallaban se reasignaron a rol decorativo
- Inputs a 16 px (sin zoom de iOS)
- Ningún estado depende solo del color: el calendario usa tachado, raya diagonal, rayado y opacidad
- `:focus-visible` global con outline 3 px
- `prefers-reduced-motion` respetado
- Escape cierra modales, lightbox y chat
- Switch con `role="switch"` y `aria-checked`
- Celdas bloqueadas con `aria-label` que dice **por qué**, no solo `disabled`

**Por verificar en QA, sobre el deploy y no en local:**
- Recorrido completo por teclado de landing a confirmación
- axe y Lighthouse en cero críticos
- Trampa de foco al abrir la hoja inferior

---

## 12 · Orden de construcción en Figma

```
Azulejo                       ← 17 componentes dependen de él
  ↓
Botón · Campo · Chip · Switch · Encabezado de sección · Paging dots
  ↓
Celda de calendario · Paso del stepper · Spec strip · Slot
  ↓
Villa card                    ← junta chip + pairTag + spec + botones
  ↓
Modal de villa · Modal de consulta   ← comparten property Size
  ↓
Chat                          ← el sistema más grande
  ↓
Patrones de página            ← header, CTA diferido, deep links
  ↓
Landing · Villas
  ↓
Prototipo conectado
```

Cada nivel usa solo componentes del anterior, así ningún master se rehace a mitad de camino. Todo tiene su correspondencia 1:1 en `figma-parts/`.

---

## 13 · Riesgos abiertos para desarrollo

1. **PMS real.** El calendario usa ocupación real de agosto 2026 pero hardcodeada. Falta confirmar si el sistema tiene API o exportación iCal. Sin eso, `cal()`, `bookedFor()` y `augStatus()` no tienen fuente viva.
2. **Intersección de calendarios.** Es el punto más delicado de implementar. No es mostrar dos calendarios: es calcular el solape y distinguir el estado "una de las dos ocupada".
3. **Eventos de GA4.** El funnel del stepper no existe hasta que se instrumenten los tres eventos custom en `goStep()` con GTM.
4. **Nombres de villa.** Resolver la convención única **antes** de que dev tipe las interfaces. El tarifario oficial dice Casa Coco, Villa Encantada, Casa Lola, Casa Cielo y Lola 13; los documentos alternan con Villa Coco y Casa del Cielo. Cambiar esto después es carísimo.
5. **Tarifa de Coco & Cielo.** Pendiente de confirmar con Caro. No hardcodear el $6,505 como definitivo.
6. **Consent mode.** `ckApply()` tiene que quedar conectado de verdad antes de publicar, o los scripts de terceros se disparan sin permiso.
