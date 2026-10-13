# HUNTER SYSTEM – Deine persönliche Gym-PWA

**Version 1.0 · Solo-App · Offline-first**

Die App enthält ein persönliches Gym-Trainingstagebuch im Hunter-/RPG-Look. Sie funktioniert auf iPhone, Android, Tablet und PC. **Es ist keine Strong-Anmeldung erforderlich.**

## Was bereits funktioniert

- Drei bearbeitbare Beispiel-Trainingspläne: **Montag Oberkörper, Dienstag Unterkörper, Donnerstag Ganzkörper**
- Beliebig viele eigene Trainingspläne und Übungen
- Satzweise Eingabe von **Gewicht, Wiederholungen und optional RIR**
- Nach dem Abhaken eines Satzes startet der **automatische Pausentimer** (pro Übung einstellbar)
- Alle abgeschlossenen Trainings bleiben in der **Historie** gespeichert
- Verlauf, persönliche Bestleistungen und Export als CSV
- **Daily Quests** unabhängig vom Trainingsplan, Hunter-Level und XP
- **JSON-Backup/Import**, Nutzung ohne Internet nach einmaligem Laden
- **Optionale Google-Sheets-Anbindung** über ein persönliches Google-Konto (Einrichtung unten)

Die PWA speichert neue Eingaben zunächst **lokal im jeweiligen Browser** (localStorage). Es gibt keine externe Datenbank und keinen eingebauten öffentlichen Account. Wenn du Browserdaten löschst, verlierst du lokale Daten ohne Backup/Synchronisierung.

## Schnellstart auf dem iPhone

Eine installierbare PWA braucht eine **HTTPS-Webadresse** (z. B. GitHub Pages). Die HTML-Datei direkt aus dem ZIP zu öffnen ist zum Ausprobieren möglich, aber die Offline-Installation funktioniert dann nicht vollständig.

1. ZIP entpacken.
2. Auf GitHub ein neues Repository erstellen, beispielsweise `hunter-system`.
3. **Nur die Inhalte dieses App-Ordners** hochladen: `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `sw.js`, `assets/`, `README.md`.
4. Unter **Settings → Pages → Build and deployment** bei **Source** „Deploy from a branch“ auswählen, Branch `main` und Ordner `/ (root)` speichern.
5. Nach dem Veröffentlichen die `https://...github.io/hunter-system/`-Adresse auf dem iPhone in **Safari** öffnen.
6. In Safari über **Teilen → Zum Home-Bildschirm** installieren.

**Wichtig bei GitHub:** Die Website und Dateien können öffentlich sichtbar sein. Darum enthält der App-Code absichtlich **keine privaten Strong-Trainingsdaten**. Lade die separate Datei `Hunter_Startdaten_PRIVAT.json` **nicht** in dein öffentliches GitHub-Repository hoch!

## Deine bisherigen Strong-Werte importieren

1. Die **separat bereitgestellte private Datei** `Hunter_Startdaten_PRIVAT.json` auf dein Gerät herunterladen.
2. In deiner PWA **Einstellungen → Backup importieren** öffnen.
3. Die JSON-Datei auswählen und bestätigen.
4. Du hast jetzt die bisherigen beiden Einträge aus den Screenshots (24.07. und 17.09.2026) **sowie den 3-Tage-Trainingsplan**.

Das Importieren überschreibt vorhandene lokale Daten. Wenn du bereits trainiert hast, vorher ein JSON-Backup exportieren. Die beiden alten Strong-Einträge sind aus Screenshots übertragen; auffällige Zeiten oder fehlende Sätze sind entsprechend in den Notizen gekennzeichnet.

## Training verwenden

1. Unter **Training** den gewünschten Plan auswählen.
2. Falls nötig zuerst über den Stift bearbeiten: Übungen, Satzanzahl, Wiederholungsziele, Reihenfolge und Pausenzeit.
3. **Training starten** wählen. Jedes Gewicht und jede Wiederholungszahl ist vor jedem Satz frei veränderbar.
4. Einen Satz nach Abschluss über das Häkchen abhaken. Dann läuft automatisch der Pausentimer.
5. Die Pause bei Bedarf um 15 Sekunden verlängern, verkürzen oder beenden.
6. Am Schluss **Training beenden & speichern**. Nur abgehakte Sätze landen in der Trainingshistorie.

RIR = „Reps in Reserve“, also die sauberen Wiederholungen, die am Satzende noch möglich gewesen wären. RIR ist optional.

**iOS-Einschränkung:** Wenn du die PWA sperrst oder im Hintergrund lässt, kann iOS Töne und JavaScript pausieren. Beim Wiederöffnen wird die korrekte Restzeit angezeigt, weil die App die Enduhrzeit statt nur Sekunden herunterzählt. Ein garantierter Klingelalarm auf dem gesperrten iPhone ist mit dieser PWA nicht möglich.

## Google-Sheets-Synchronisierung (optional, fortgeschritten)

Die App enthält bereits eine **echte Schnittstelle zur Google Sheets API**. Damit sie funktioniert, musst du dich einmal selbst bei Google konfigurieren. Ohne diese Einrichtung funktioniert die App vollständig lokal.

### Einmalig einrichten

1. Öffne [Google Cloud Console](https://console.cloud.google.com/). Erstelle ein eigenes Projekt, z. B. „Hunter System“.
2. Unter **APIs & Dienste → Bibliothek** die **Google Sheets API** aktivieren.
3. Den **Google Auth / OAuth-Zustimmungsbildschirm** für deine Google-Anmeldung einrichten. Wenn die App im Testmodus läuft, deine eigene E-Mail-Adresse als Testnutzer hinterlegen.
4. Unter **Anmeldedaten** einen **OAuth-Client vom Typ Webanwendung** erstellen. Als **autorisierte JavaScript-Quelle** den Ursprung deiner PWA eintragen, z. B. `https://deinname.github.io` (ohne den Repo-Pfad). `http://localhost:...` kannst du bei lokalen Tests zusätzlich erlauben.
5. Die öffentliche **Client-ID** (endet meist auf `.apps.googleusercontent.com`) in **Einstellungen → Google Sheets** der App eintragen und speichern. Du brauchst **keinen geheimen Client-Secret** in der App.
6. Auf **Google verbinden** tippen und den Zugriff auf Tabellen erlauben.
7. **Neue Tabelle erstellen** wählen (oder ID deiner vorhandenen Google-Tabelle eintragen), danach **In Google Sheets sichern**.
8. Die Tabelle enthält Register **Training, Sessions, Quests, Plans, Backup**. Bei jeder Synchronisierung werden diese Bereiche durch den aktuellen App-Stand ersetzt.

**Achtung bei mehreren Geräten:** Bitte zuerst über **Aus Google Sheets laden** den aktuellen Stand holen, bevor du auf einem zweiten Gerät neue Daten speicherst. Der jetzige Sync ist ein **bewusster manueller Push/Pull**, kein konfliktfreier Mehrgeräte-Echtzeitabgleich.

Die Option **„Nach einem Training automatisch synchronisieren“** funktioniert nur, solange die Google-Anmeldung im aktuellen Browserfenster aktiv ist. Nach einem App-Neustart kann eine erneute Anmeldung notwendig sein. Die App speichert kein Google-Passwort und keinen dauerhaften Zugriffstoken.

### Damit ChatGPT die Daten lesen kann

Die Google-Tabelle muss im **gleichen verbundenen Google-Konto** liegen, auf das ChatGPT über die Google-Drive-Verbindung zugreifen darf. Du kannst dann in ChatGPT zum Beispiel fragen:

> „Öffne meine Google-Tabelle **Hunter System – Gym Tracker** und analysiere meine Brustpresse der letzten 8 Wochen. Zeig mir, ob ich Gewicht oder Wiederholungen steigern sollte.“

**Ohne verbundene Google-Drive-Berechtigung** kann ChatGPT nicht direkt auf deine private Tabelle zugreifen. Alternativ exportierst du eine CSV- oder JSON-Datei aus der App und lädst sie im Chat hoch.

## Sicherheit / Backup

- Die App ist lokal-first. Browser-/Gerätewechsel ohne Backup können Datenverlust bedeuten.
- Vor einer Wiederherstellung bitte separat sichern; der Import **ersetzt** deine aktuellen Daten.
- CSV-Dateien enthalten deine Trainingsdaten und sollten privat bleiben.
- Veröffentliche weder die private JSON-Datei noch exportierte Trainingsdaten im öffentlichen GitHub-Repository.
- OAuth-Client-ID ist öffentlich verwendbar; ein **Client-Secret gehört niemals in die PWA**.
- Nur HTTPS (außer `localhost`) erlaubt PWA-Installation und die Browser-Anmeldung für Google.

## Gesundheit und Quests

Weil du von wenig Schlaf und länger bestehender allgemeiner Erschöpfung berichtet hast, sind die täglichen Quests **standardmäßig sanft**. Quests sind freiwillig und ersetzen keine Erholung oder ärztliche Abklärung. Es gibt **keine XP-Strafen** fürs Pausieren. Bei Schmerzen oder Krankheit nicht für Spielpunkte weitertrainieren.

## Nicht Teil von Version 1

Freundes-Ranking, Attributpunkte, virtuelle Duelle, Dungeons, automatische Trainingsplangenerierung, datenbasierte direkte ChatGPT-Steuerung innerhalb der App. Diese Ideen sind für spätere Versionen vorgemerkt. Die Analyse durch ChatGPT erfolgt derzeit über **Google Sheets oder einen Dateiexport**, nicht über eine ständig laufende KI im Browser.
