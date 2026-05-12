# Raamwerk Digitale Assistenten in Overheidsdienstverlening

Een praktisch raamwerk voor overheidsorganisaties die digitale assistenten verantwoord willen ontwikkelen en inzetten. Gebouwd als statische website met React.

## Lokaal draaien

```bash
# Installeer dependencies (eenmalig)
python3 -m venv venv
venv/bin/pip install pyyaml

# Start de server
python3 -m http.server 8000
```

Open de browser op `http://localhost:8000`.

## Content aanpassen

Alle tekst staat in de map `content/`:

| Bestand | Wat het bevat |
|--------|---------------|
| `content/domains/*.md` | Domeinpagina's (wat, waarom, practices, samenhang) |
| `content/practices/*.md` | Good practices |
| `content/bronnen.yaml` | Alle bronnen/referenties |
| `content/home.yaml` | Tekst op de homepage |
| `content/context_raamwerk.yaml` | Tekst op de 'Over'-pagina |
| `content/rings.yaml` | Definitie van de vier ringen |

Na elke wijziging in `content/` opnieuw builden:

```bash
venv/bin/python scripts/build.py
```

Of automatisch laten bewaken (herbouwt bij elke wijziging):

```bash
venv/bin/python scripts/watch.py
```

De browser ververst niet automatisch — doe dit handmatig na een build.

## Structuur

```
content/        ← pas dit aan
scripts/        ← build- en watch-script
js/             ← React-componenten
css/            ← stijlen
js/data.js      ← gegenereerd, niet aanpassen
```
