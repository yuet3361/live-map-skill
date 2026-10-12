# data.js format

`data.js` sets one global: `window.MAP`. Save the file and the page reloads within a second. The page keeps the level the user is looking at.

```js
window.MAP = {
  lang: 'en',          // UI labels: 'en' | 'zh-Hant' | 'zh-Hans'
  title: 'Map title',  // optional; defaults to the root node name
  sub: 'One line under the title', // optional; defaults to a short how-to
  tree: { t: 'Root', kids: [ /* nodes */ ] }
};
```

`lang` changes only the buttons and labels. Write the node text in the user's own language.

## Node fields

| Field | Type | What it does |
|---|---|---|
| `t` | string | Name shown on the node. A topic, short. |
| `ex` | `[[who, text], ...]` | Example shown when the user clicks ⋯. `who` is `'u'` (user bubble), `'a'` (AI bubble) or `'n'` (plain note). Keep it to one short example. |
| `p` | `[string, ...]` | Optional paragraphs in the ⋯ sheet. Use rarely. |
| `kids` | `[node, ...]` | Next level. Clicking the name opens it. |
| `flow` | `[{ role?, rel?, items: [i, ...] }, ...]` | Rows of kids, top to bottom, with a down arrow between rows. `rel` labels the arrow ("then", "so we need"). `role` labels the row. Without `flow`, all kids sit in one row. |
| `base` | `{ rel, items: [i, ...] }` | Kids that hold up the parts above (foundations). Shown in a band at the bottom with `↑ rel`. |
| `side` | `{ items: [i, ...] }` | Kids with no strong relation. Shown under a divider. |
| `principle` | number | Index of one kid shown beside the root as "applies to all". |
| `mark` | string | Status badge. See below. |
| `links` | `[[path], ...]` | Cross-links to other nodes. A path is a list of kid indexes from the root, for example `[2, 0]`. A number badge appears; clicking it lists the linked nodes. Nodes that are linked to but have no `links` show the reverse count. |
| `goto` | `[path]` | Clicking the name jumps to that node instead of opening kids. |
| `cap` | string | Small caption above the node. |
| `was` | `{ from, to }` or `{ added }` | "Changed while we talked" box in the ⋯ sheet. |
| `cmp` | `{ them, us, st }` | Two boxes beside the root when this node is open: how others do it, and what we have now. `st` is `'ok'`, `'mid'`, `'bad'` or `'unk'`. |
| `link` | `{ t, url }` | External link button in the ⋯ sheet. |
| `sym` | string | One highlighted line in the ⋯ sheet (a formula or rule). |

Every index in `flow`, `base`, `side` and `principle` points into the same node's `kids`. Each kid should appear in exactly one of them. A kid not listed anywhere is not shown when `flow` exists.

## Marks

| `mark` | Badge | Meaning |
|---|---|---|
| `set` | Decided | The user said yes in chat. Only the user can make this. |
| `draft` | Draft | Proposed, not agreed. The default for anything new. |
| `res` | Researched | Research is done; no decision yet. |
| `core` | Key | Structurally important. Not a decision. |
| `later` | Later | Agreed to leave for later. |
| `chg` | Just changed | Changed in this session. |
| `now` | Now | Where the discussion is right now. Parents of it get a dashed outline. |

The legend at the top shows only the marks the map uses.

## Checks before saving

- `node --check data.js` passes.
- Every path in `links` and `goto` exists.
- No level has more than about 8 nodes.
