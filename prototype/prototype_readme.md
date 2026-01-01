# Prototype - lokale HTML

Inhoud: eenvoudige interactieve prototype met drie schermen:
- Dashboard
- Nieuwe Inspectie (invoerscherm)
- QCP Manager (lijst meetpunten)

Bestanden:
- `prototype/index.html` - startpunt
- `prototype/styles.css` - styling
- `prototype/app.js` - eenvoudige logica en persistentie via localStorage

Hoe te gebruiken:
- Open `prototype/index.html` in je browser (dubbelklik of gebruik VS Code Live Server-extensie).
- De prototype slaat inspecties en NC's op in localStorage zodat gegevens behouden blijven na reload.

Batch-entry per meetpunt:
- Klik op de knop **Batch** naast een meetpunt om aparte invoervakken te tonen.
- Stel het aantal samples in (1–20, standaard 5) en vul per vak een waarde in.
- Je kunt ook waarden uit Excel plakken: plak in het eerste vak en de waarden worden over de vakken verdeeld.

Volgende stappen:
- Uitbreiden van data-entry (foto-upload), offline support, meertaligheid
- Realtime Keyence-integratie in fase 2

Wil je dat ik deze bestanden commit naar git met een duidelijke commit message? (ja/nee)