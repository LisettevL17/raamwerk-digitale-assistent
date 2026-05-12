---
id: infrastructuur-data
nr: 4
ring: governance
title: Infrastructuur & Data
short: "De technische fundering: rekenkracht, opslag, en data-pipelines."
samenhang:
  - beveiliging
  - compliance
  - digitale-soevereiniteit
  - duurzaamheid
  - antwoordkwaliteit
  - technische-prestaties
  - functionaliteit
  - governance
  - kennis-capaciteit
  - cultuur-adoptie
practices:
  - infrastructuur-keuze
  - rag-pijplijn
  - model-deployment
  - datakwaliteit-governance
  - model-deployment
  - llmops-monitoring
  - schaalbaarheid-productie
sources:
  - visie-digitale-autonomie
  - handreiking-generatieve-ai
  - bio2
  - algoritmekader
  - algoritmeregister
  - nora
  - gemma
  - common-ground
  - vlam-ai
  - gpt-nl
  - surf-snellius
  - govchat-nl
  - haven
  - standaard-platform
  - wetwijzer-bedrijven
  - nvidia-rag-blueprint
---

Infrastructuur & Data omvat alles wat onder de motorkap zit van een digitale AI-assistent: de rekenkracht waarop hij draait, de manier waarop hij informatie ophaalt, en de processen om hem stabiel en betrouwbaar te houden. Naast hardware en software gaat het om de manier waarop data wordt beheerd, verrijkt en beschikbaar gemaakt. Dit fundament vormt de technische bodem waar assistenten op draaien.

Het fundament beslaat zes samenhangende deelonderwerpen:

**Waar draait het op? (AI-rekeninfrastructuur)** — De fysieke rekenkracht waarop AI-modellen draaien. Kies je voor een eigen overheidsdatacentrum, een Europese soevereine cloud, of een commerciële publieke cloud? En hoe koop je die rekenkracht in (bijv. via MaaS/1 STIP)?

**Hoe zet je het model live? (Model hosting en deployment)** — De manier waarop een taalmodel daadwerkelijk in productie draait: welke software serveert het model (vLLM, Ollama), hoe verpak je het in containers (Kubernetes), hoe houd je versies bij, en hoe stuur je vragen naar het juiste model.

**Hoe komt de assistent aan zijn kennis? (Datapijplijnen voor RAG)** — Het proces om overheidsbronnen op te halen, in stukjes te knippen (chunking), doorzoekbaar te maken (embeddings, vectordatabases) en de juiste passages te vinden bij een vraag.

**Welke bronnen vertrouw je? (Datakwaliteit en governance)** — Welke bronnen mag de assistent gebruiken, wie bewaakt de kwaliteit, en hoe houd je ze actueel als wet- en regelgeving verandert?

**Werkt het zoals het moet? (Monitoring en observability)** — Doorlopend zicht op wat de assistent doet, of antwoorden kloppen, hoeveel het kost, en waar het misgaat. Met tooling als Langfuse, MLflow en evaluatieframeworks zoals RAGAS.

**Blijft het werken bij druk? (Schaalbaarheid en beschikbaarheid)** — Denk aan automatisch op- en afschalen, slim hergebruik van eerdere antwoorden (caching), en het onderscheid tussen real-time vragen en zwaar nachtwerk.

---

Infrastructuurkeuzes bepalen wat een digitale assistent veilig, betrouwbaar en soeverein kan leveren. Een assistent die draait op een publieke cloud-API van een Amerikaans techbedrijf heeft wezenlijk andere eigenschappen qua privacy, beschikbaarheid en kosten dan een assistent op het VLAM.AI-platform in een Overheidsdatacentrum. Infrastructuur is geen technisch detail maar een beleidsmatige keuze met directe impact op burgers en de controleerbaarheid van overheidsdienstverlening.

Het doel van goede infrastructuur is een stabiel, veilig en schaalbaar technisch fundament waarop digitale assistenten betrouwbaar kunnen draaien, met behoud van digitale soevereiniteit en controle over data.

Zonder goede infrastructuur loopt ieder chatbot-project uiteindelijk vast. Denk aan vendor lock-in op één commerciële LLM-provider, oncontroleerbare kosten, onduidelijkheid over waar data en logs staan, en performance-problemen zodra het gebruik groeit. Met goede infrastructuur bouw je aan lagere kosten, meer wendbaarheid en de mogelijkheid om als overheid regie te houden over je eigen technologie. Dat betekent niet dat je alle oplossingen zelf hoeft te hosten, maar wel dat je je bewust moet zijn van de beslissingen die je maakt.

**Belangrijk voor de burger:** Goede data en infrastructuur zorgt ervoor dat antwoorden betrouwbaar, snel en privacybewust tot stand komen. Als een RAG-pijplijn alleen officiële wetgeving als bron gebruikt, krijgt de burger een verifieerbaar antwoord met bronverwijzing. Verouderde bronnen leiden tot verkeerde informatie over rechten en plichten. En mensen beoordelen fouten van AI strenger dan menselijke fouten; een solide data-infrastructuur is daarom nodig om vertrouwen te behouden.

**Belangrijk voor de organisatie:** De infrastructuurkeuze bepaalt kosten, schaalbaarheid en wendbaarheid.

**Belangrijk voor de overheid als geheel:** Het principe 'centraal afspreken, federatief inrichten' stuurt aan op gedeelde voorzieningen. Herbruikbare bouwblokken (open-source API's, widgets) voorkomen dat iedere organisatie het wiel opnieuw uitvindt. De Visie Digitale Autonomie en Soevereiniteit (december 2025) vat het samen: 'open waar kan, beschermen waar moet'.
