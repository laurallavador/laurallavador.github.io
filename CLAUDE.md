# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static HTML/CSS/JS portfolio for Laura Llavador (UX/UI Designer), hosted on GitHub Pages at `laurallavador.github.io`. No build system, no framework, no package manager — plain files served directly.

## Deployment

Push to `origin main` → auto-deploys via GitHub Pages. No build step needed.

```bash
git push origin main
```

To preview locally, open any `index.html` directly in a browser or use a simple static server:

```bash
python3 -m http.server 8080
```

## Architecture

The site is a collection of independent HTML pages that share a single CSS file:

- `index.html` — homepage (hero, about, project grid, contact)
- `css/styles.css` — main stylesheet, used by the homepage and most case study pages
- `css/stylesmiel.css` — stylesheet for the `mielmayem/` case study only
- `css/stylescomida.css` — stylesheet for the `comida/` case study only
- `js/main.js` — shared vanilla JS (hamburger nav, smooth scroll, music loader)
- `images/` — all assets; case-study images are grouped in subfolders (e.g. `images/comida/`)

Each case study lives in its own subdirectory with a self-contained `index.html`:
`aidimme/`, `ayiana/`, `comida/`, `compressflow/`, `damelgroup/`, `decoterranea/`, `elruc/`, `keyla/`, `mielmayem/`, `nextport/`, `sportai/`

There is also `work/index.html` (full work listing) and `resume/index.html`.

## Color system

All colors are defined as CSS custom properties at the top of each stylesheet's `:root` block. The canonical values in `styles.css`:

| Variable | Value | Role |
|---|---|---|
| `--accent-1` | `#ff6b6b` | Coral/red |
| `--accent-2` | `#4ad1c0` | Teal |
| `--accent-3` | `#0066FF` | Electric blue (primary accent) |
| `--accent-4` | `#D1D5DB` | Light gray (secondary accent) |
| `--muted` | `#6b7280` | Body secondary text |

**Important:** `stylesmiel.css` and `stylescomida.css` each have their own independent `:root` blocks with hardcoded values — they do not inherit from `styles.css`. When changing the color palette, all three CSS files must be updated.

## Fonts

- Main site (`styles.css`): `Inter` + `Instrument Serif` (Google Fonts)
- `stylesmiel.css`: `Inter`
- `stylescomida.css`: `Inter`
