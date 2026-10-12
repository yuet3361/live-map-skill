// Live reload: when any file here changes, the page reloads and keeps your place.
(function () {
  let last = null;
  setInterval(() => {
    fetch('/__v', { cache: 'no-store' }).then((r) => r.text()).then((v) => {
      if (last === null) last = v; else if (v !== last) location.reload();
    }).catch(() => {});
  }, 800);
})();
