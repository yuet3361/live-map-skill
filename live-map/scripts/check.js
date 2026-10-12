#!/usr/bin/env node
// Usage: node check.js <path/to/data.js>
// Loads the map and reports broken paths, bad indexes and crowded levels.
const fs = require('fs');
const vm = require('vm');
const file = process.argv[2];
if (!file) { console.log('Usage: node check.js <path/to/data.js>'); process.exit(1); }
const win = {};
vm.runInNewContext(fs.readFileSync(file, 'utf8'), { window: win, document: {} });
const M = win.MAP;
const errs = [];
const warns = [];
if (!M || !M.tree) { console.log('window.MAP.tree is missing'); process.exit(1); }
if (M.lang && !['en', 'zh-Hant', 'zh-Hans'].includes(M.lang)) warns.push(`lang "${M.lang}" is not en, zh-Hant or zh-Hans; labels fall back to English`);
const MARKS = ['set', 'draft', 'res', 'core', 'later', 'chg', 'now'];
const at = (p) => p.reduce((n, i) => n && n.kids && n.kids[i], M.tree);
const walk = (n, p) => {
  const where = p.length ? p.join('.') + ' "' + n.t + '"' : 'root';
  const kids = n.kids || [];
  if (!n.t) errs.push(`${where}: missing t`);
  if (n.mark && !MARKS.includes(n.mark)) errs.push(`${where}: unknown mark "${n.mark}"`);
  if (kids.length > 8) warns.push(`${where}: ${kids.length} kids on one level (aim for 8 or fewer)`);
  const used = [];
  const idx = (list, name) => (list || []).forEach((i) => { if (!kids[i]) errs.push(`${where}: ${name} index ${i} has no kid`); used.push(i); });
  (n.flow || []).forEach((s) => idx(s.items, 'flow'));
  if (n.base) idx(n.base.items, 'base');
  if (n.side) idx(n.side.items, 'side');
  if (n.principle !== undefined) idx([n.principle], 'principle');
  if (n.flow) kids.forEach((k, i) => { if (!used.includes(i)) warns.push(`${where}: kid ${i} "${k.t}" is not in flow, base, side or principle, so it is hidden`); });
  (n.links || []).forEach((l) => { if (!at(l)) errs.push(`${where}: link [${l}] points nowhere`); });
  if (n.goto && !at(n.goto)) errs.push(`${where}: goto [${n.goto}] points nowhere`);
  kids.forEach((k, i) => walk(k, [...p, i]));
};
walk(M.tree, []);
warns.forEach((w) => console.log('warn: ' + w));
errs.forEach((e) => console.log('error: ' + e));
console.log(errs.length ? `${errs.length} error(s)` : 'ok');
process.exit(errs.length ? 1 : 0);
