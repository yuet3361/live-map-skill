// Tiny template renderer: {{hole}}, sc-for, sc-if, onClick, helmet. No dependencies.
class DCLogic { constructor() { this.props = {}; this.state = {}; } setState(o) { this.state = { ...this.state, ...o }; try { sessionStorage.setItem('dcState', JSON.stringify(this.state)); } catch (e) {} window.__dcRender(); } }
window.DCLogic = DCLogic;
window.addEventListener('DOMContentLoaded', () => {
  const host = document.querySelector('x-dc');
  const helmet = host.querySelector('helmet');
  if (helmet) { document.head.append(...helmet.childNodes); helmet.remove(); }
  const tpl = host.innerHTML; host.innerHTML = '';
  const src = document.querySelector('script[type="text/x-dc"]').textContent;
  const Component = new Function('DCLogic', src + '; return Component;')(DCLogic);
  const comp = new Component();
  try { comp.state = JSON.parse(sessionStorage.getItem('dcState') || '{}'); } catch (e) { comp.state = {}; }
  const get = (scope, path) => path.trim().split('.').reduce((o, k) => (o == null ? undefined : o[k]), scope);
  const hole = (scope, str) => {
    const m = str.match(/^\{\{([^}]+)\}\}$/);
    if (m) { const p = m[1].trim(); if (p === 'true') return true; if (p === 'false') return false; return get(scope, p); }
    return str.replace(/\{\{([^}]+)\}\}/g, (_, p) => { const v = get(scope, p); return v == null ? '' : v; });
  };
  const walk = (node, scope, out) => {
    if (node.nodeType === 3) { out.appendChild(document.createTextNode(hole(scope, node.textContent))); return; }
    if (node.nodeType !== 1) return;
    const tag = node.tagName.toLowerCase();
    if (tag === 'sc-for') {
      const list = hole(scope, node.getAttribute('list')) || []; const as = node.getAttribute('as');
      list.forEach((it, i) => node.childNodes.forEach((c) => walk(c, { ...scope, [as]: it, $index: i }, out)));
      return;
    }
    if (tag === 'sc-if') { if (hole(scope, node.getAttribute('value'))) node.childNodes.forEach((c) => walk(c, scope, out)); return; }
    const el = document.createElementNS(node.namespaceURI, node.localName);
    for (const a of node.attributes) {
      if (a.name.toLowerCase() === 'onclick') { const f = hole(scope, a.value); if (typeof f === 'function') el.addEventListener('click', f); continue; }
      el.setAttribute(a.name, hole(scope, a.value));
    }
    node.childNodes.forEach((c) => walk(c, scope, el));
    out.appendChild(el);
  };
  const t = document.createElement('template'); t.innerHTML = tpl;
  window.__dcRender = () => { host.innerHTML = ''; const v = comp.renderVals(); t.content.childNodes.forEach((c) => walk(c, v, host)); };
  try { window.__dcRender(); } catch (e) { comp.state = {}; sessionStorage.removeItem('dcState'); window.__dcRender(); }
});
