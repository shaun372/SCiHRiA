# Clearing the Air — SCIHRIA

An 8-bit educational game about tobacco harm reduction. Players decide whether
each statement is a **Myth** (false) or a **Fact** (true); correct answers clear
blocks from a scene, transforming a "before" image into a healthier "after" one.

> ⚠ DRAFT — content is pending SCIHRIA committee clinical review and is **not
> cleared for public release**.

## What's in this folder

```
index.html      ← the game (open this)
style.css       ← styling
game.js         ← all game logic + question content (inlined, no server needed)
assets/         ← images used by the game
assets/fonts/   ← the pixel font (Press Start 2P), bundled for offline use
```

This is a **static website** — no server, database, or build step. It runs as-is.

## Run it locally

Just double-click `index.html`, or open it in any browser. Everything works
offline (the font and all images are bundled).

## Put it online (so others can open it on their phones)

Because it's static, you can host it for free. Easiest options:

1. **Netlify Drop** (no account steps, fastest): go to https://app.netlify.com/drop
   and drag this whole `Clearing-the-Air` folder onto the page. You get a public
   URL in seconds (e.g. `https://your-name.netlify.app`).
2. **GitHub Pages**: create a repository, upload these files, enable Pages in the
   repo settings. Free, gives a `username.github.io/...` URL.
3. **itch.io** (good for games): create a new project, set it to "HTML", zip this
   folder and upload, mark `index.html` as the main file.

Share the resulting URL — it opens directly on any phone browser, no install.

## Note on size

Total ~3 MB. Images are compressed JPGs (high quality, capped at 1600px), so it
loads quickly even on mobile data.
