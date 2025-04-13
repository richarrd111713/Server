// Your Vercel proxy endpoint (no trailing slash)
const PROXY_BASE = 'https://proxys-snowy.vercel.app/api/proxy';

// show/hide console helper
function setConsoleVisible(yes) {
  document.getElementById('consolePanel')
          .classList.toggle('visible', yes);
}

// “Go” button: load target URL via Vercel proxy
document.getElementById('goButton').addEventListener('click', () => {
  let url = document.getElementById('urlInput').value.trim();
  if (!url) {
    alert('Enter a URL to load.');
    return;
  }
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }
  // Construct proxied URL
  const proxied = PROXY_BASE + '?url=' + encodeURIComponent(url);
  document.getElementById('browserFrame').src = proxied;
});

// Toggle console panel
document.getElementById('toggleConsole').addEventListener('click', () => {
  const panel = document.getElementById('consolePanel');
  setConsoleVisible(!panel.classList.contains('visible'));
});

// Close console
document.getElementById('closeConsole').addEventListener('click', () => {
  setConsoleVisible(false);
});

// Run JS inside iframe (same‑origin only)
document.getElementById('runButton').addEventListener('click', () => {
  const code     = document.getElementById('consoleInput').value;
  const outputEl = document.getElementById('consoleOutput');
  const iframe   = document.getElementById('browserFrame');

  try {
    const result = iframe.contentWindow.eval(code);
    outputEl.textContent = result === undefined ? 'undefined' : result;
  } catch (err) {
    outputEl.textContent = 'Error: ' + err;
  }
});
