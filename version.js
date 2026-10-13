/* Hunter System release information, deliberately separate from workout data. */
(() => {
  'use strict';
  const release = {
    version: '1.2.0',
    date: '13.10.2026',
    changelog: [
      ['1.2.0', 'Versionsanzeige im Kopfbereich und Änderungsverlauf in Einstellungen.'],
      ['1.1.0', 'Google-Anmeldung: Cloud-Daten können auf neuen, unveränderten Geräten übernommen werden.'],
      ['1.0.0', 'Trainingstagebuch, freie Trainingspläne, Pausentimer, Fortschritt und Daily Quests.']
    ]
  };
  const refresh = () => {
    const host = document.getElementById('app');
    if (!host) return;
    const badge = host.querySelector('.mobile-head .badge');
    if (badge && badge.textContent !== 'BETA v' + release.version) {
      badge.textContent = 'BETA v' + release.version;
      badge.title = 'Hunter System Version ' + release.version;
    }
    const sidebar = host.querySelector('.sidebar-bottom');
    if (sidebar && !sidebar.querySelector('[data-hunter-version]')) {
      const line = document.createElement('div');
      line.dataset.hunterVersion = 'true';
      line.style.marginTop = '12px';
      line.style.color = '#b5a5ff';
      line.textContent = 'Hunter System v' + release.version;
      sidebar.appendChild(line);
    }
    const settings = host.querySelector('.page-header .eyebrow')?.textContent?.includes('SYSTEM / SETTINGS');
    const section = host.querySelector('.main .grid-2 .stack:last-child');
    if (settings && section && !host.querySelector('#hunter-version-panel')) {
      const panel = document.createElement('section');
      panel.id = 'hunter-version-panel';
      panel.className = 'panel';
      const heading = document.createElement('h2');
      heading.className = 'panel-title';
      heading.textContent = 'App-Version & Änderungen';
      panel.appendChild(heading);
      const desc = document.createElement('p');
      desc.className = 'panel-desc';
      desc.textContent = 'Aktuelle Version: v' + release.version + ' (Beta) · ' + release.date;
      panel.appendChild(desc);
      const list = document.createElement('div');
      list.className = 'setting-block';
      list.style.marginTop = '14px';
      for (const [version, change] of release.changelog) {
        const row = document.createElement('div');
        row.className = 'key-value';
        const key = document.createElement('strong');
        key.textContent = 'v' + version;
        const value = document.createElement('span');
        value.style.textAlign = 'right';
        value.style.maxWidth = '75%';
        value.textContent = change;
        row.append(key, value);
        list.appendChild(row);
      }
      panel.appendChild(list);
      const note = document.createElement('p');
      note.className = 'hint';
      note.style.marginTop = '14px';
      note.textContent = 'Das installierte Update erscheint nach Neuladen der PWA. Die Cloud-Synchronisierung läuft nur bei aktiver Verbindung.';
      panel.appendChild(note);
      section.appendChild(panel);
    }
  };
  const host = document.getElementById('app');
  if (!host) return;
  const observer = new MutationObserver(refresh);
  observer.observe(host, {childList: true, subtree: true});
  refresh();
})();
