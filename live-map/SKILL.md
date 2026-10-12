---
name: live-map
description: Align with the user on a complex plan before building it, using a live multi-level map in the browser instead of a long document or a question list. The AI draws the plan as a clickable tree, the user reads it, discusses it in chat and decides part by part, and the map updates within a second of each change. Ends with a build brief (the long prompt) made only of what the user decided. Use when the user wants to plan, design, scope or spec something with many parts or levels, says the plan is too complex to read as text, asks for a mind map, or wants to write a long prompt together before an agent builds it.
---

# Live map

Long specs and question lists are flat. People stop reading them, and details slip through. A live map shows the plan as a tree: one level per screen, short names, one example per node. The user sees the whole structure at a glance and clicks down only where they care.

The map is the shared state between you and the user. Chat is where you discuss. The map is where the result lives.

## 1. Start the map

Run the script from this skill folder:

```bash
bash <skill-dir>/scripts/new-map.sh <project-folder>
```

- It copies `template/` to `<project-folder>/docs/live-map/`. It never overwrites an existing map.
- It serves the map on a free local port, prints the URL and opens the browser. Add `--no-open` to skip the browser.
- Edit `docs/live-map/data.js`. The page reloads within a second and keeps the user's level, pan and zoom.
- The map is a board: the user can drag to move and pinch or Ctrl + scroll to zoom. A wide level is fine; they can pan.
- Field reference: `reference/data-format.md`. Do not edit `index.html`.

Set `lang` in `data.js`: `'en'`, `'zh-Hant'` or `'zh-Hans'`. Write node text in the user's language.

After each edit, run `node <skill-dir>/scripts/check.js docs/live-map/data.js`. Fix every error before you tell the user to look.

## 2. Draw the first map

1. Write the goal as the root: a short name, plus one example in `ex`.
2. Split it into 3 to 6 top-level parts. Each part appears once. Do not repeat a part at the top level and again inside another part.
3. Go down one or two levels only where the user needs to decide something.
4. Mark everything `draft`. Mark structural pillars `core`.
5. Tell the user the URL and one line about what to look at first.

## 3. Go part by part

Let the user pick the order. For each part:

1. **How others do it.** If research helps, check mature products or open-source code. Put the result in `cmp.them`, or in kids marked `res`.
2. **What exists now.** Read the current code or setup if there is one. Put it in `cmp.us`, with `st` set to `ok`, `mid`, `bad` or `unk`.
3. **Recommend.** Give one recommendation with the reason. Question the need first, then delete, then simplify. Add only what a real use case needs.
4. **Ask one question at a time.** Put your recommendation first. Give a concrete example.
5. **The user decides.** Update the map at once.

When the user asks "did we miss anything?", walk one real example through the whole map from start to end. Name each concrete gap. Say which gaps belong to later parts.

## 4. Decisions

- Only the user can make a node `set` (Decided). They must say yes in chat.
- A short "ok" applies only to the last question you asked.
- Everything you propose stays `draft`. Research results are `res`. Agreed-to-defer items are `later`.
- When a decision changes an earlier node, add `was: { from, to }` and mark it `chg` for this session.
- Put `mark: 'now'` on the node under discussion. Move it when the topic moves.
- Optional: append one line per decision to `docs/live-map/decisions.md` (time, what was decided).

## 5. Map rules

1. Clicking into a node shows a diagram, not a wall of text. One level of kids per screen.
2. A node name is the topic, not who does it. Use few words.
3. `ex` holds one short example. Long material goes in a separate document, linked with `link`.
4. Every arrow states a real relation. Use `flow` with `rel` ("then", "so we need") for order and cause, top to bottom. Use `base` for foundations that hold up the parts above (shown with ↑). Put unrelated items in `side`.
5. Do not add a level just to hold content. Do not split one idea into many text cards.
6. Add `links` where two parts in different branches depend on each other.
7. Use plain words. A stranger should understand each node name in ten seconds. No internal jargon.
8. About 8 nodes per level at most.

## 6. Hand off to build

When the user says the plan is done:

1. Write `docs/live-map/BRIEF.md` from the map. Include only `set` nodes as requirements. List `draft` and `later` nodes under "Not decided" and "Later", so the builder does not invent them.
2. For each requirement, keep the user's example from `ex`. Examples carry intent better than rules.
3. Add how to accept the result: a real scenario to run, and what must be true at the end.
4. Show the brief to the user. Start building only when they say so.

The brief is the long prompt. Because the user decided every line on the map, it carries their intent, not yours.

## Do not

- Do not write `index.html` or a new UI. Always use the template.
- Do not mark anything `set` on your own.
- Do not paste a whole document into one node.
- Do not move to the next part, or start building, without the user.
