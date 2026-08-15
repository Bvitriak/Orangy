# 🍊RANGY

**Own a home you'll fall in love with.** – a bold, responsive real‑estate landing page.

Orangy is a single‑page marketing site built with plain **HTML, CSS and vanilla
JavaScript** – no framework, no build step. It ships three hand‑tuned layouts
(mobile, tablet, desktop) and a set of custom interactions (translucent cursor,
overlay scrollbar, drag‑to‑scroll gallery, embedded map, and more).

---

## ✨ Features

| Area | Details |
|------|---------|
| **Responsive** | Three breakpoints: **mobile** (360 – 1023px), **tablet** (1024 – 1919px), **desktop** (≥ 1920px). |
| **Navigation** | Inline nav on tablet/desktop; a full‑screen hamburger **overlay menu** below 1024px (open/close with click, `Esc`, or link tap). |
| **Custom cursor** | A small, dark, translucent circle that follows the mouse and reacts to interactive elements (mouse/fine‑pointer devices only). |
| **Custom scrollbar** | A thin translucent overlay scrollbar that floats over full‑width content, so nothing is pushed inward by a native gutter. |
| **Gallery** | Horizontal, **drag‑to‑scroll** with the mouse; rounded image corners; four property cards. |
| **Location** | Embedded **Google Maps** with a transparent guard so the custom cursor stays consistent — click the map to interact. |
| **Contact form** | Auto‑growing message field (height follows the amount of text), plus default / hover / pressed button states. |
| **Content protection** | Text selection and image dragging / right‑click are disabled (form fields stay usable). |
| **Details** | Subtle text texture (shadow) on all type, orange‑slice favicon set, disabled overscroll “bounce”. |

---

## 🗂️ Project structure

```
Orangy/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   ├── logo/
│   ├── icons/
│   ├── favicons/
│   └── shapes/
├── LICENSE
├── .gitignore
└── README.md
```

---

## 🚀 Getting started

No dependencies and no build. Because the page loads web fonts and an embedded
map, serve it over HTTP (rather than opening the file directly):

```bash
# Python 3
python3 -m http.server 8000
```

or

```bash
# Node
npx serve
```

Then open **http://localhost:8000** in your browser.

---

## 📐 Layout & breakpoints

| Breakpoint | Range | Highlights |
|------------|-------|-----------|
| Mobile | 360 – 1023px | Stacked sections, hamburger overlay menu, compact type. |
| Tablet | 1024 – 1919px | Inline top navigation, larger type, wider media. |
| Desktop | ≥ 1920px | Vertical nav in the hero, split price/contact section, rounded gallery images, wide centered About copy. |

> Per project convention, further design tweaks are applied **only** to the
> `@media (min-width: 1920px)` block unless stated otherwise.

## 🎨 Design tokens

Defined as CSS custom properties in `css/styles.css`:

| Token | Value | Role |
|-------|-------|------|
| `--background-color` | `#007dbd` | Blue base |
| `--section-color` | `#fca53f` | Orange |
| `--section-color2` | `#ab2f0b` | Rust |
| `--main-text` | `#fff3cd` | Cream text |
| `--second-text` | `#262218` | Dark text |

**Fonts** (via Google Fonts): Special Elite (logo), Raleway, Lora, Syne, Space Grotesk.

---

## 🙌 Credits

- **Design:** [Figma](https://www.figma.com/community/file/1670430689830507435/orangy) original layout created in Figma.

---

## 📄 License

Released under the [MIT License](LICENSE). The license covers the source code;
third‑party fonts and images keep their own licenses (see the note in `LICENSE`).
