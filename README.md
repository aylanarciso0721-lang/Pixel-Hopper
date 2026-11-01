# 🕹️ Pixel Hopper

![version](https://img.shields.io/badge/version-2.0-brightgreen) ![levels](https://img.shields.io/badge/levels-100-orange) ![players](https://img.shields.io/badge/co--op-1--4%20players-blue) ![dependencies](https://img.shields.io/badge/runtime%20dependencies-none-lightgrey)

A retro platformer that runs in your browser: **100 levels, 10 bosses, a 3D view, 4-player local co-op and online rooms**. The game is one HTML file with no build step and no runtime dependencies. An optional tiny Node server adds online play.


![Pixel Hopper gameplay](docs/screenshot.png)


## Contents

- [Quick start](#quick-start)
- [Features](#features)
- [Controls](#controls)
- [Gameplay guide](#gameplay-guide)
- [Co-op and online multiplayer](#co-op-and-online-multiplayer)
- [Shop and progression](#shop-and-progression)
- [3D view](#3d-view)
- [Options and accessibility](#options-and-accessibility)
- [Install and play offline](#install-and-play-offline)
- [Developer mode](#developer-mode)
- [Project structure](#project-structure)
- [Debugging and tests](#debugging-and-tests)
- [Hosting and releases](#hosting-and-releases)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

## Quick start

```bash
git clone https://github.com/aylanarciso0721-lang/pixel-hopper.git
cd pixel-hopper
# just play: open pixel-hopper.html in a browser
# or play with the server (needed for online rooms):
npm install
npm start          # http://localhost:8080
```

## Features

- **100 levels in 10 worlds** (15 hand-built, 85 generated from fixed seeds) plus a tutorial and a daily challenge. A **boss waits at the end of every 10th level**.
- **3D view** built with Three.js (bundled inside the file), with automatic fallback to the classic 2D pixel renderer.
- **Co-op for up to 4 players** on one screen, with shared lives, checkpoints and boss health that scales with the number of players.
- **Online rooms for up to 4 players** through a small WebSocket relay server (included).
- 5 enemy types, 4 heroes, 4 superpowers (including levitation), 6 outfits and 5 permanent upgrades.
- 5 difficulties, checkpoints on every level and **Continue from checkpoint** after a game over.
- Achievements, best times and a daily challenge.
- Keyboard, mouse, touch and gamepad support, key remapping, colorblind modes.
- Installable and playable offline (progressive web app).
- A locked developer mode and a headless test suite.

## Controls

### Keyboard

| Action | Player 1 | Player 2 |
| --- | --- | --- |
| Move | `←` `→` or `A` `D` | `J` `L` |
| Jump (hold for higher) | `Space`, `Z`, `↑` or `W` | `I` |
| Fire (with the Fire power) | `X` or `Shift` | `O` |
| Down (noclip in dev mode) | `↓` or `S` | `K` |
| Pause / resume | `Esc` or `P` (also pauses when the tab loses focus) | |

Player 1's keys can be changed under **Options → Keyboard / Pad**. Players 3 and 4 use gamepads.

### Gamepad

Any standard controller works (Xbox, PlayStation, Switch Pro and similar). **Controller 1 controls player 1 (together with the keyboard), controller 2 player 2, and so on.** In menus any controller can navigate.

| Action | Control |
| --- | --- |
| Move | Left stick or D-pad |
| Jump | `A` (bottom face button) |
| Fire | `X` (left face button) |
| Pause / resume | Start |
| Menus | D-pad to move, `A` to select, `B` to go back |

### Mouse and touch

Menus work with hover and click or tap, and the mouse wheel scrolls through menu items. On touch devices an on-screen pad (Left, Right, Pause, Fire, Jump) appears. Its size and visibility are under **Options → Touch controls**.

## Gameplay guide

### Goal

Reach the flag at the end of each level. On boss levels, defeat the boss first. **Score** = coins × 10 + stomps × 50 + a time bonus.

### Worlds and levels

Choose **Play → Level Select**, then a world, then a level. Levels unlock one at a time. Worlds are groups of 10 levels, and the last level of each world is a boss fight.

| Level | Boss |
| --- | --- |
| 10 | Stone Warden |
| 20 | Demon King |
| 30 | Ice Golem |
| 40 | Magma Beast |
| 50 | Swamp Hydra |
| 60 | Storm Lord |
| 70 | Bone Colossus |
| 80 | Void Titan |
| 90 | Neon Overlord |
| 100 | The Core |

Levels 1 to 15 are hand-built (Grass Hills, Crystal Cave, Neon Citadel and others). Levels 16 to 100 reuse those themes with higher numbers (for example *Grass Hills 2*) and get more enemies, more spikes and longer layouts as you go. Generated levels are identical for every player.

### Difficulty

| Level | Lives | Enemy speed | Jump forgiveness | Coin payout |
| --- | :---: | :---: | :---: | :---: |
| Easy | 5 | 0.7× | Generous | ×1 |
| Normal | 3 | 1.0× | Standard | ×1 |
| Hard | 2 | 1.4× | Tight | ×1.25 |
| Insane | 1 | 1.7× | Very tight | ×1.5 |
| Demon | 1 | 2.1× | None | ×2 |

Upgrades add lives, and each extra co-op player adds one shared life.

### Heroes

| Hero | Trait |
| --- | --- |
| Pip | Balanced |
| Bolt | Fast runner |
| Hopper | High jump |
| Airy | Double jump |

In co-op, player 2 and up automatically get the next heroes in the list, with a cap color per player (P1 red, P2 blue, P3 green, P4 yellow).

### Enemies

| Enemy | Behavior |
| --- | --- |
| Walker | Patrols and turns at ledges and walls |
| Hopper | Hops while it walks |
| Bat | Flies a wave pattern |
| Spiny | Fast, and **cannot be stomped** |
| Ghost | Drifts toward the nearest player and passes through walls |

### Superpowers

| Orb | Power | Effect |
| :---: | --- | --- |
| **L** | Levitate | Hold jump in the air to float and rise (about 15 s). You cannot float above the top of the level. |
| **S** | Shield | Absorbs one hit (not pits). |
| **F** | Fire | Shoot fireballs (about 20 s). |
| **\*** | Star | Invincible, faster, and enemies die on contact (about 8 s). |

Orbs carry letters, so colors never carry information alone.

### Checkpoints

Every level except the tutorial has up to two checkpoint flags on safe ground. After a death you restart at the last one with your coins and orb pickups kept. On **Insane** and **Demon** (one life), a game over offers **Continue from checkpoint**.

### Bosses

Each boss roars in (a short intro in which it cannot hurt you), then chases you, jumps and fires projectiles. It gets faster as it takes damage. At **half health it becomes enraged**: it moves 25% faster, jumps more often and fires a spread shot (3 shots, 5 shots for later bosses). Stomp it or hit it with fireballs. In co-op its health is multiplied by 1 + 0.5 per extra player.

## Co-op and online multiplayer

### Local co-op (1 to 4 players)

Set the number of players under **Multiplayer** or **Play → Game Setup**, then play any level. Rules:

- Lives are **shared**. A death costs one life and the player respawns next to a teammate. If every player is down, the level restarts from the last checkpoint.
- A player who runs out of lives is out for the rest of the attempt. When all players are out it is game over.
- The camera follows the group. A player who is left far behind rejoins automatically.
- Coins, stomps and score are shared. Any player reaching the flag clears the level.

### Online rooms (up to 4 players)

1. Run the server (`npm start`, or deploy it, see below).
2. Open the game from that server (or add `?server=wss://<your-server>` to the game's address, or set it under **Multiplayer → Online → Server**).
3. One player picks **Create room** and shares the 4-character code. Others pick **Join room** and type it.
4. The host chooses the level and starts the game.

How it works: the **host's browser runs the whole game**. Guests send their button presses to the host and draw the state the host sends back (about 20 updates per second). The server only relays messages between the people in a room, so it stays tiny. Consequences:

- The host has no lag; guests feel the round-trip time to the host.
- The host can cheat (there is no anti-cheat), so play with friends.
- Pausing as host pauses everyone. If the host leaves, the room closes.
- Daily challenge and tutorial are single-player.

### Running the server

```bash
npm install
npm start                     # PORT=8080 by default
PORT=3000 npm start           # another port
ALLOWED_ORIGINS=https://you.github.io npm start   # only accept connections from these pages
```

The server also serves the game, so one deployment covers both. `GET /health` returns `ok`.

**Deploying:** any host that can run Node 18+ or Docker works (Render, Railway, Fly.io, a VPS). Use `npm start` as the start command, or build the included `Dockerfile`. Online play from an `https://` page needs `wss://`, which these hosts provide automatically.

**GitHub Pages note:** Pages only serves static files, so it cannot run the server. Host the server elsewhere and open the game with `https://<you>.github.io/<repo>/?server=wss://<your-server.example>`.

Safety limits: messages over 16 KB are dropped, each client is rate limited, malformed messages are ignored, and rooms disappear when empty. The server stores nothing.

## Shop and progression

Coins are **banked when you clear a level** (the tutorial pays nothing). A death loses that attempt's coins.

| Outfit | Price | | Upgrade | Max | Base price | Effect |
| --- | :---: | --- | --- | :---: | :---: | --- |
| Classic | Free | | Extra Life | 3 | 50 | +1 life in every level |
| Ninja | 30 | | Super Jump | 3 | 40 | +4% jump height per level |
| Knight | 60 | | Power Time | 3 | 60 | +25% power-up time per level |
| Wizard | 100 | | Coin Magnet | 3 | 50 | Pulls coins from 28, 44 or 60 px |
| Astronaut | 150 | | Start Shield | 1 | 120 | Every level starts with a Shield |
| Royal | 220 | | | | | |
| Ghost | 300 | | | | | |

An upgrade level costs the base price × the level you are buying. Outfits are cosmetic and apply to player 1.

**Achievements** (Extras → Achievements): First Steps, Boss Slayer, Untouchable, Stomper, Coin Hoarder, Sky High, Fashionista, Demon Hunter, Completionist (all 100 levels) and Daily Grind. The **daily challenge** is a generated level seeded by today's date, paying double coins on the first clear. Each level remembers your **best time** and shows **NEW RECORD!**.

## 3D view

The game renders in real-time 3D with Three.js (r128, bundled in the file): extruded blocks, lighting, soft shadows, parallax hills, clouds and stars. The simulation is still the same precise 2D platformer, so controls feel identical. Turn it off under **Options → Display → 3D view**. If WebGL is unavailable, the context is lost, or a rendering error occurs, the game switches to the 2D renderer automatically and keeps running.

## Options and accessibility

The title screen has **Play**, **Multiplayer**, **Shop**, **Options** and **Extras**. Each screen shows a one-line description of the highlighted item and the keys to use, and the game remembers where you were in each menu.

| Menu | Settings |
| --- | --- |
| **Audio** | Volume, music, sound effects |
| **Display** | 3D view, CRT filter, vignette, fullscreen |
| **Accessibility** | Color mode (Off, Protan, Deutan, Tritan, High-contrast), enemy outlines, screen shake (off by default when your system asks for reduced motion), vibration |
| **Keyboard / Pad** | Rebind player 1's keys (conflicts are refused) |
| **Touch controls** | Touch pad (Auto, On, Off), button size, vibration |
| **Save data** | Reset save (clears progress, coins, outfits, upgrades, achievements) |

The color modes are standard color-shift filters, not medical-grade corrections.

## Install and play offline

Served over **HTTPS** (for example GitHub Pages) the game is a progressive web app: install it from the browser's address bar (desktop), the menu (Android Chrome) or Share → Add to Home Screen (iOS). The pixel font and Three.js are bundled in `pixel-hopper.html`, so it looks the same offline. A service worker updates the cache in the background; bump `CACHE` in `sw.js` for every release.

## Developer mode

Hidden behind a **20-digit code** (Options → Developer, or press `` ` `` on a menu screen). Once unlocked: hitboxes (`H`), god mode (`G`), noclip fly (`F`), next/previous level (`N`/`B`), restart (`R`), time scale (`[` `]`), powers (`1`–`4`), kill the boss (`K`), on-screen event log (`L`), every level unlocked and +1000 coins. The code is not stored in the source, only its hash (`DH`). To set your own, hash it with the `hs` function from the script (`PH.hs('your20digits')` in the console) and replace `DH`.

> This is a client-side check. It keeps casual players out; anyone who edits the file can bypass it.

## Project structure

```
pixel-hopper/
├── pixel-hopper.html          # the whole game: HTML, CSS, JavaScript, bundled font and Three.js
├── server/server.js           # online relay server + static hosting (needs `ws`)
├── package.json, Dockerfile   # run or deploy the server
├── manifest.webmanifest, sw.js, icon*.svg/png   # installable offline app
├── tests/run-tests.js         # headless test runner
├── .github/workflows/         # test.yml (every push) and release.yml (v* tags)
└── README.md
```

The game script is organised in labelled sections: `CONFIG`, `LEVELS`, `SAVE + GAME STATE`, `DEBUG`, `AUDIO`, `PHYSICS + GAME RULES`, `UPDATE`, `MENUS`, `RENDERING`, `INPUT`, `ONLINE`, `3D RENDERER`, `MAIN LOOP`, `DEBUG API`.

## Debugging and tests

**In the browser console:** `PH.log()` (last 200 events), `PH.state()`, `PH.inv()` (invariant check), `PH.errors()`. Developer mode shows the log with `L`.

**Automated tests:** `npm install` then `npm test` (Node 18+). Without `npm install` the 3D and online tests are skipped. The tests are organised from the deepest layer to the surface:

| Layer | Checks |
| --- | --- |
| Math and data | Level generation is deterministic, 100 unique level names, bosses exactly on every 10th level, hash and `T()` boundary safety |
| Physics | Property test: random moves of player-, enemy- and boss-sized boxes never end embedded in a wall, never move farther than their velocity and set the ground flag correctly |
| Level design | Gaps ≤ 3 tiles, platforms/coins/orbs reachable, no spawns on spikes, checkpoints safe, a **pathfinding solver** proves a jump path from spawn to flag in every level (checked against deliberately broken levels) |
| Rules | Economy, shop, upgrades, achievements, daily level, checkpoints, boss intro and phase 2, lives |
| Co-op | 4 players, independent controls, shared lives, respawn, rubber band, boss scaling |
| Input | Remapping, gamepads 1–4, 120,000 random key/pointer events, corrupted saves, render-error recovery |
| 3D | Real Three.js scene graph for all 100 levels (with a stand-in renderer): camera lines up with the 2D layout, fallback to 2D, fuzzing |
| Network | Real server and 4 game instances: rooms, join/leave, full room, input and snapshot sync, coins, shared lives, level clear, host leaving, malformed and oversized messages, path traversal |
| App | Manifest, icons, service worker, bundled font, workflows |

The runner exits non-zero on failure and `test.yml` runs it on Node 18, 20 and 22. The solver proves a jump path exists between platforms; it ignores enemies and ceilings, so it shows a level can be finished in principle, not that every enemy placement is fair. A stand-in renderer cannot show how the 3D view looks; check that by eye.

## Hosting and releases

- **Static (GitHub Pages):** rename `pixel-hopper.html` to `index.html`, push, then Settings → Pages. Online play needs a separate server (see above).
- **Release:** run the tests, commit, then `git tag -a v2.0 -m "v2.0" && git push origin v2.0`. The release workflow reruns the tests and publishes a GitHub release with the game files attached.

## Changelog

| Version | Highlights |
| --- | --- |
| **2.0** | 3D view; 4-player local co-op; online rooms with a relay server; 100 levels with a boss every 10th level (10 bosses); new menu structure with descriptions, remembered selection and world select; deeper tests (physics property tests, solver for all levels, 3D and network tests); collision fixes: tall entities could start overlapping walls undetected, and an already-embedded entity could be teleported a full tile sideways |
| 1.2 | Checkpoints, boss phases, achievements, daily challenge, best times, gamepad, remapping, offline app, CI |
| 1.1 | Shop, outfits, upgrades, wallet |
| 1.02 | Demon jump fix, error recovery, safer saves, test runner |
| 1.0 | 15 levels, 3 bosses, superpowers, locked developer mode, accessibility |

## Contributing

Issues and pull requests are welcome. Keep the game file dependency-free at runtime, run `npm test` before opening a PR, and describe gameplay changes. Ideas: hand-built levels for worlds 2 to 10, new enemy types, a level editor, reconnecting to a room, spectators.

## License

Add a license of your choice (for example [MIT](https://choosealicense.com/licenses/mit/)). Three.js is MIT licensed. The pixel font [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) by CodeMan38 is licensed under the SIL Open Font License.
