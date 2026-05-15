# Raamwerk Digitale Assistenten in Overheidsdienstverlening

Praktisch raamwerk voor overheidsorganisaties die digitale assistenten verantwoord willen ontwikkelen en inzetten. Gebouwd als statische website met React — geen bundler, geen framework, gewoon bestanden.

---

## Legenda

| Symbool | Betekenis |
|--------|-----------|
| `content/` | Hier pas je tekst en data aan |
| `js/data.js` | Gegenereerd bestand — nooit handmatig aanpassen |
| `scripts/build.py` | Zet `content/` om naar `js/data.js` |
| `scripts/watch.py` | Doet hetzelfde automatisch bij elke opgeslagen wijziging |

---

## Lokaal starten

```bash
# Eenmalig: installeer dependencies
python3 -m venv venv
venv/bin/pip install pyyaml

# Start de lokale webserver
python3 -m http.server 8000
```

Open `http://localhost:8000` in de browser.

---

## Content aanpassen

Alle inhoud staat in `content/`. Na een wijziging moet `js/data.js` opnieuw gegenereerd worden.

### Automatisch (aanbevolen)

Start de watch-script in een apart terminalvenster. Zolang dit venster open staat, wordt `data.js` automatisch bijgewerkt elke keer als je een bestand opslaat:

```bash
python3 scripts/watch.py
```

### Handmatig

```bash
python3 scripts/build.py
```

> De browser ververst niet automatisch — doe dit handmatig na een build.

---

## Bestanden

### Content (aanpassen)

| Bestand | Inhoud |
|--------|--------|
| `content/domains/*.md` | Domeinpagina's (wat, waarom, samenhang) |
| `content/practices/*.md` | Good practices met filters en bronnen |
| `content/bronnen.yaml` | Alle bronnen en referenties met URL |
| `content/glossery.yaml` | Begrippenlijst — IDs beginnen met `gloss-`, `seeAlso` verwijst naar IDs uit `bronnen.yaml` |
| `content/home.yaml` | Tekst op de homepage |
| `content/context_raamwerk.yaml` | Tekst op de 'Over'-pagina |
| `content/filters.yaml` | Filteropties (fasen, niveaus) |

### Gegenereerd (niet aanpassen)

| Bestand | Inhoud |
|--------|--------|
| `js/data.js` | Gegenereerd door `build.py` — wijzigingen worden overschreven |

### Overig

```
js/       ← React-componenten
css/      ← stijlen
scripts/  ← build- en watch-script
```

---

## index.html

Het ingangspunt van de website. Laadt alle scripts in de juiste volgorde:

1. **React 18** en **Babel** — geladen via CDN (geen lokale installatie nodig)
2. **`js/data.js`** — gegenereerde data (domeinen, practices, bronnen, begrippenlijst)
3. **JSX-componenten** — in deze volgorde:
   - `tweaks-panel.jsx` — ontwikkelaarspaneel
   - `chrome.jsx` — navigatie en pagina-omhulsel
   - `diagram.jsx` — het interactieve raamwerkdiagram
   - `pages.jsx` — domein- en practicepagina's
   - `bronnen.jsx` — bronnenlijst
   - `glossary.jsx` — begrippenlijst
   - `app.jsx` — hoofdcomponent die alles samenbrengt

> De volgorde van de scripts is belangrijk: `data.js` moet als eerste geladen zijn, `app.jsx` als laatste. Voeg nieuwe componenten toe vóór `app.jsx`.
