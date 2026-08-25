# Coco B Isla — Master de componentes para Figma

Nomenclatura, properties y variantes de cada componente del sistema. Sirve para que el archivo de Figma tenga la misma estructura que el código y el handoff a dev sea directo, no una traducción.

**Convención de nombre:** `Familia/Componente`, con las variantes en properties, no en el nombre. Nunca `Boton-primario-hover` — eso es `Button` con `Hierarchy=Primary` y `State=Hover`.

---

## Orden obligatorio de construcción

```
1. Azulejo                          17 componentes dependen de él
2. Primitivas                       Button · Field · Chip · Switch · Section/Header · Dots
3. Compuestos simples               Calendar/Cell · Stepper/Step · Spec · Slot
4. Card/Villa                       junta chip + pairTag + spec + botones
5. Modal/VillaDetail · Modal/Inquiry   comparten property Size
6. Chat/Concierge                   el sistema más grande
7. Patrones de página               header, CTA diferido, deep links
8. Landing · Villas                 ensamblaje
9. Prototipo conectado
```

---

## 1 · Base

### `Base/Azulejo`
| Property | Tipo | Valores |
|---|---|---|
| `Style` | Variant | Brand · Ocean · Teal · White · Muted · RingOnly |

Dos capas nombradas exactamente `ring` y `cross`. Pegar el SVG una sola vez, separar los paths, aplicar color por capa. **No duplicar el master por tamaño** — se escala la instancia.

### `Base/Mix`
Sin properties. Dos azulejos superpuestos, opacidad 95 % y 55 %. Hereda color del contenedor.

### `Base/Lattice`
Rectángulo con el pattern de 128 px. Property `Fade` (boolean) para las tres capas de desvanecido.

---

## 2 · Primitivas

### `Button`
| Property | Tipo | Valores |
|---|---|---|
| `Hierarchy` | Variant | Primary · Ghost · Light |
| `Size` | Variant | Base (50px) · Small (42px) |
| `Icon` | Boolean | — |
| `State` | Variant | Default · Hover · Disabled |

`Light` sobre foto; cuando el header pasa a sólido, la misma instancia cambia a `Primary`.
La rotación de 90° del azulejo al hover vive en la capa de motion, no en la variante.

### `Field`
| Property | Tipo | Valores |
|---|---|---|
| `Type` | Variant | Text · Select · Textarea · Phone · Checkbox |
| `State` | Variant | Default · Focus · Error |
| `Helper` | Boolean | — |

El error se pinta en el **contenedor**, no en el input: borde danger, fondo `#FDF7F6` y mensaje visible. Input siempre a 16 px.

### `Chip/Availability`
| Property | Tipo | Valores |
|---|---|---|
| `State` | Variant | Open · Filling · Almost · TooSmall |

Se calcula con `augStatus()`. El texto cambia con el estado — no es solo color.

### `Tag`
| Property | Tipo | Valores |
|---|---|---|
| `Type` | Variant | Pair · Placeholder · PickPair · PickTooSmall |

### `Switch`
| Property | Tipo | Valores |
|---|---|---|
| `Checked` | Boolean | — |
| `Locked` | Boolean | — |

### `Section/Header`
| Property | Tipo | Valores |
|---|---|---|
| `Eyebrow` | Text | — |
| `Title` | Text | — |
| `Lead` | Boolean | — |
| `Align` | Variant | Center · Left |

### `Dots/Paging`
| Property | Tipo | Valores |
|---|---|---|
| `Theme` | Variant | Light · Dark |
| `Count` | Number | — |

---

## 3 · Compuestos

### `Calendar/Cell`
| Property | Tipo | Valores |
|---|---|---|
| `State` | Variant | Available · Peak · Booked · Half · Selected · InRange · Far · Out |
| `Price` | Boolean | — |

Ocho variantes. **Ninguna se distingue solo por color:** Booked lleva tachado y raya diagonal, Half rayado de 45°, Far opacidad 34 %.

### `Stepper/Step`
| Property | Tipo | Valores |
|---|---|---|
| `State` | Variant | Pending · Active · Done |
| `Number` | Text | — |
| `Label` | Text | — |

El número vive dentro de una instancia de `Base/Azulejo` con `Style=RingOnly`.

### `Spec`
| Property | Tipo | Valores |
|---|---|---|
| `Price` | Boolean | — |
| `Guests` / `Bedrooms` / `Bathrooms` / `From` | Text | — |

### `Slot`
| Property | Tipo | Valores |
|---|---|---|
| `Type` | Variant | Empty · Image · Video |
| `Ratio` | Variant | 4:3 · 16:9 · Tall |

La foto es una capa con image fill, **no un Slot property** — Slot es para contenido libremente componible, y aquí solo cambia la imagen. Si quieres que la variabilidad sea explícita en el panel de handoff, usa Instance Swap.

### `Loader`
| Property | Tipo | Valores |
|---|---|---|
| `Kind` | Variant | Tick · Tide · Bloom · Typing |
| `Frame` | Variant | 0 · 25 · 50 · 75 |

Frames para Smart Animate. Duraciones: Tick 2000 · Tide 1500 · Bloom 2600 · Typing 1250.

---

## 4 · Card

### `Card/Villa`
| Property | Tipo | Valores |
|---|---|---|
| `Type` | Variant | Single · Pair |
| `Availability` | Variant | Open · Filling · Almost · TooSmall |
| `Placeholder` | Boolean | — |
| `QuoteNote` | Boolean | — |
| `Name` / `Description` / `From` / `Suites` | Text | — |

Auto layout vertical con los tres `min-height` del código para que los CTA queden alineados entre tarjetas: título 29, descripción 50 (dos líneas), y el bloque de precio empujado con `Fill` al fondo.

### `Card/Way` *(solo villas.html)*
| Property | Tipo | Valores |
|---|---|---|
| `Tag` / `Title` / `Body` / `Who` / `Link` | Text | — |

### `Card/Review`
| Property | Tipo | Valores |
|---|---|---|
| `Portal` | Variant | Google · Booking · Tripadvisor |

Caja de logo fija a 96 × 34 con overflow oculto, para que ningún logo desborde.

---

## 5 · Modales

### `Modal/Shell`
| Property | Tipo | Valores |
|---|---|---|
| `Size` | Variant | Desktop · Sheet |
| `Width` | Variant | Wide (980) · Narrow (760) |
| `Footer` | Variant | Single · Stepper |

**`Size` es compartida por los tres modales y el chat.** En `Sheet` aparece la agarradera, el radio pasa a solo superior y el pie se vuelve sticky en vidrio.

### `Modal/VillaDetail`
| Property | Tipo | Valores |
|---|---|---|
| `Type` | Variant | Single · Pair |
| `PairNote` | Boolean | — |

En `Pair` la cabecera muestra dos miniaturas encimadas (`margin-left:-14px`).

### `Modal/Inquiry`
| Property | Tipo | Valores |
|---|---|---|
| `Step` | Variant | Guests · Dates · Details · Sent |
| `FromVilla` | Boolean | — |

### `Gallery`
| Property | Tipo | Valores |
|---|---|---|
| `Layout` | Variant | Grid · Carousel |
| `SeeAll` | Boolean | — |

### `Lightbox`
Sin properties de estado; se documenta la navegación en la capa de prototipo.

---

## 6 · Stepper

### `Stepper/Guests`
| Property | Tipo | Valores |
|---|---|---|
| `MixState` | Variant | Info · Active · TooLarge |
| `Count` | Text | — |

### `Stepper/VillaPick`
| Property | Tipo | Valores |
|---|---|---|
| `State` | Variant | Default · Selected · Disabled |
| `Tag` | Variant | None · Pair · TooSmall |

### `Calendar`
| Property | Tipo | Valores |
|---|---|---|
| `Notice` | Variant | Default · Season · Pair · Conflict |
| `Loading` | Boolean | — |

### `Recap`
| Property | Tipo | Valores |
|---|---|---|
| `Type` | Variant | Single · Pair |
| `QuoteNote` | Boolean | — |

### `Footer/Summary`
| Property | Tipo | Valores |
|---|---|---|
| `State` | Variant | NoDates · CheckInOnly · BelowMinimum · Valid |

El CTA solo se habilita en `Valid`.

---

## 7 · Chat

### `Chat/FAB`
| Property | Tipo | Valores |
|---|---|---|
| `State` | Variant | Hidden · Idle · Badge · Open |

Icono de burbuja de diálogo, **nunca el azulejo** — Jakob's Law: la entrada debe ser el símbolo reconocible; la marca vive dentro.

### `Chat/Teaser`
| Property | Tipo | Valores |
|---|---|---|
| `Visible` | Boolean | — |

Solo por encima de 620 px.

### `Chat/Panel`
| Property | Tipo | Valores |
|---|---|---|
| `Size` | Variant | Desktop · Sheet |
| `Status` | Variant | Online · Away |
| `QuickReplies` | Boolean | — |

### `Chat/Message`
| Property | Tipo | Valores |
|---|---|---|
| `From` | Variant | Bot · User |
| `Time` | Boolean | — |

### `Chat/VillaCard`
| Property | Tipo | Valores |
|---|---|---|
| `State` | Variant | Open · Warn |

### `Chat/List`
| Property | Tipo | Valores |
|---|---|---|
| `Type` | Variant | Simple · Pairs |
| `State` | Boolean | — |

---

## 8 · Estructura

### `Header`
| Property | Tipo | Valores |
|---|---|---|
| `State` | Variant | Transparent · Solid |
| `Breakpoint` | Variant | Desktop · Tablet · Mobile |

Alturas: 118→74 desktop · 96→74 tablet · 78→64 móvil. Logo 82→56 / 52→42.

### `Banner/Sargasso`
Property `Visible` (boolean). Al cerrarlo se recalcula la altura del hero.

### `Hero`
| Property | Tipo | Valores |
|---|---|---|
| `Breakpoint` | Variant | Desktop · Mobile |

### `Bar/Availability`
| Property | Tipo | Valores |
|---|---|---|
| `Visible` | Boolean | — |
| `Size` | Variant | Desktop · Mobile |

Se oculta con `body.modalOpen`. Sube 74 px si el chat está visible.

### `Footer`
Property `Breakpoint` (Desktop 4 col · Tablet 2 col · Mobile 1 col).

### `Cookie/Consent`
| Property | Tipo | Valores |
|---|---|---|
| `Expanded` | Boolean | — |

---

## 9 · Comportamiento que se documenta, no se construye

Estas reglas no tienen componente. Van como nota en el archivo de Figma, en el frame correspondiente:

- **Header scroll-aware** — cambia al 62 % del alto del hero
- **CTA diferido** — aparece al 75 % del hero con 350 ms de retardo; se esconde arriba y en los últimos 780 px
- **Deep link de tile** — cada tile abre la ficha de **esa** villa: se conecta tile por tile en prototipo, no como componente
- **Handoff del chat** — el botón de la card del chat navega a `Modal/Inquiry` con `Step=Dates`, no `Step=Guests`
- **Barra sube si el chat está visible** — anotar aunque no se simule en estático
- **Intersección de calendarios** — la disponibilidad del par es el solape de ambos; el estado `Half` es la señal de que solo una está ocupada
- **Eventos de GA4** — `stepper_inicio`, `stepper_fechas_seleccionadas`, `stepper_completado` disparan en cada cambio de paso

---

## 10 · Checklist antes de cerrar el archivo

- [ ] `Base/Azulejo` construido antes que nada, con las capas nombradas `ring` y `cross`
- [ ] Ningún componente usa `#5BCAEB` como fondo de texto o botón
- [ ] Todos los inputs a 16 px
- [ ] `Header` tiene sus dos estados como property, no como frames sueltos
- [ ] Los tres modales y el chat comparten la property `Size`
- [ ] Las ocho variantes de `Calendar/Cell` se distinguen sin depender del color
- [ ] Los tiles de la landing tienen conexión de prototipo individual a su ficha
- [ ] El handoff del chat apunta a `Step=Dates`
- [ ] Las notas de comportamiento del punto 9 están escritas en el frame que corresponde
- [ ] Los frames móviles miden exactamente 390 × 844 (si no, Figma no los reconoce como iPhone)
