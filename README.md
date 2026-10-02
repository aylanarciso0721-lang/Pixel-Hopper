# 🕹️ Pixel Hopper

![version](https://img.shields.io/badge/version-1.0-brightgreen) ![dependencies](https://img.shields.io/badge/dependencies-none-blue) ![platform](https://img.shields.io/badge/platform-browser-orange)

A retro pixel-art platformer that runs entirely in your browser. One HTML file, no build step, no dependencies.

Run, jump and stomp through 15 levels, fight 3 bosses, collect superpowers (including levitation), and play on five difficulty levels, with colorblind and touch-screen support built in.

<!-- Add a screenshot or GIF here:
![Pixel Hopper gameplay](docs/screenshot.png)
-->

## Contents

- [Quick start](#quick-start)
- [Features](#features)
- [Controls](#controls)
- [Gameplay guide](#gameplay-guide)
- [Options and accessibility](#options-and-accessibility)
- [Developer mode](#developer-mode)
- [Project structure](#project-structure)
- [Hosting on GitHub Pages](#hosting-on-github-pages)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

## Quick start

```bash
git clone https://github.com/aylanarciso0721-lang/pixel-hopper.git
cd pixel-hopper
# open the game in your browser
open pixel-hopper.html        # macOS
xdg-open pixel-hopper.html    # Linux
start pixel-hopper.html       # Windows
```

You can also just double-click `pixel-hopper.html`.

> **Note:** the pixel font ("Press Start 2P") loads from Google Fonts. Offline, the game falls back to a monospace font and still works.

## Features

- **15 levels plus a tutorial:** hand-built early levels, then seeded, generated levels with their own palettes and hazards.
- **3 boss fights** at levels 5, 10 and 15. The arena locks behind you and the exit flag only appears once the boss is defeated.
- **5 enemy types:** Walker, Hopper, Bat, Spiny and Ghost.
- **4 superpowers** you collect from glowing orbs: Levitate, Shield, Fire and Star.
- **4 playable heroes** with different strengths.
- **5 difficulty levels:** Easy, Normal, Hard, Insane and Demon.
- **Retro look with lighting:** 16×16 sprites on a 320×192 canvas, gradient skies, parallax hills, shadows, ambient particles, optional CRT scanlines and vignette.
- **Chiptune music and sound effects** generated with the Web Audio API (no audio files).
- **Accessibility:** colorblind filters, high-contrast mode, enemy outlines, screen-shake toggle and vibration control.
- **Touch support:** on-screen controls with adjustable size, plus tappable menus.
- **Locked developer mode:** hitboxes, god mode, noclip, level skip and more, behind a 20-digit code.
- **Saved progress:** unlocked levels, best scores and settings are stored in `localStorage`.

## Controls

### Keyboard

| Action | Keys |
| --- | --- |
| Move | `←` `→` or `A` `D` |
| Jump | `Space`, `Z`, `↑` or `W` (hold for a higher jump) |
| Fire (with Fire power) | `X` or `Shift` |
| Levitate (with Levitate power) | Hold jump while in the air |
| Pause | `Esc` or `P` |
| Menus | `↑` `↓` to move, `←` `→` to change options, `Enter` to select, `Esc` to go back |

### Mouse and touch

- Menus work with hover and click or tap.
- On touch devices an on-screen pad appears with **Left, Right, Pause, Fire and Jump**. You can force it on or off and resize it under **Options → Touch Controls**.

## Gameplay guide

### Goal

Reach the flag at the end of each level. On boss levels, defeat the boss first.

**Score** = coins × 10 + stomps × 50 + a time bonus.

### Difficulty

| Level | Lives | Enemy speed | Jump forgiveness |
| --- | :---: | :---: | :---: |
| Easy | 5 | 0.7× | Generous |
| Normal | 3 | 1.0× | Standard |
| Hard | 2 | 1.4× | Tight |
| Insane | 1 | 1.7× | Very tight |
| Demon | 1 | 2.1× | None |

### Heroes

| Hero | Trait |
| --- | --- |
| Pip | Balanced |
| Bolt | Fast runner |
| Hopper | High jump |
| Airy | Double jump |

### Enemies

| Enemy | Behavior |
| --- | --- |
| Walker | Patrols and turns at ledges and walls |
| Hopper | Hops while it walks |
| Bat | Flies a wave pattern |
| Spiny | Fast, and **cannot be stomped**, so jump over it |
| Ghost | Drifts toward you and passes through walls |

Stomp most enemies from above. Touching them from the side costs a life.

### Superpowers

| Orb | Power | Effect |
| :---: | --- | --- |
| **L** | Levitate | Hold jump in the air to float and rise. Falling is slowed. Lasts about 15 seconds. |
| **S** | Shield | Absorbs one hit (not pits). |
| **F** | Fire | Shoot fireballs that defeat enemies and damage bosses. Lasts about 20 seconds. |
| **\*** | Star | Invincible, faster, and enemies are destroyed on contact. Lasts about 8 seconds. |

Orbs are marked with letters, so you never need to tell them apart by color. You can't levitate above the top of the level or past the side walls.

### Bosses

| Level | Boss |
| --- | --- |
| 5 | Ice Golem |
| 10 | Demon King |
| 15 | Void Titan |

Bosses chase you, jump and shoot projectiles, and speed up as they take damage. Stomp them or hit them with fireballs. Shield and Fire orbs are placed in each arena.

### Levels

1. Grass Hills
2. Crystal Cave
3. Neon Citadel
4. Sunset Dunes
5. Frozen Peaks (boss)
6. Lava Forge
7. Toxic Swamp
8. Sky Islands
9. Haunted Keep
10. Demon Gate (boss)
11. Crimson Canyon
12. Cosmic Bridge
13. Abyss Depths
14. Storm Peaks
15. Void Citadel (boss)

New players should start with **Play → Tutorial**.

## Options and accessibility

The title screen is organised into **Play**, **Game Setup**, **Options** and **About**.

| Menu | Settings |
| --- | --- |
| **Audio** | Volume, music, sound effects |
| **Display** | CRT filter, vignette, fullscreen |
| **Accessibility** | Color mode (Off, Protan, Deutan, Tritan, High-contrast), enemy outlines, screen shake, vibration |
| **Touch controls** | Touch pad (Auto, On, Off), button size, vibration |
| **Save data** | Reset save (asks for confirmation) |
| **Developer** | Locked by default (see below) |

The Protan, Deutan and Tritan modes apply a color-shift filter to the whole game canvas. They are an aid, not a medical-grade correction.

## Developer mode

Developer mode is hidden behind a **20-digit code**. Open **Options → Developer** (or press `` ` `` on a menu screen) and enter the code with the keyboard or the on-screen keypad. Once unlocked, it stays unlocked until you choose **Lock Developer**.

Unlocked features:

| Key | Action |
| --- | --- |
| `` ` `` | Toggle developer mode |
| `G` | God mode |
| `H` | Show hitboxes |
| `F` | Noclip fly |
| `N` / `B` | Next / previous level |
| `R` | Restart level |
| `[` / `]` | Slow down / speed up time |
| `1`–`4` | Grant Levitate, Shield, Fire, Star |
| `K` | Defeat the boss instantly |

It also shows a debug panel (version, FPS, position, velocity) and unlocks every level in Level Select.

### Setting your own code (maintainers)

The code is not stored in the source. Only its hash is, in the `DH` constant near the top of the script. To change the code, compute the hash with the same function used by the game and replace `DH`:

```js
// run in a browser console or Node, with the game's `hs` function
const hs = s => { let a=3735928559,b=1103547991; for(let i=0;i<s.length;i++){const k=s.charCodeAt(i);a=Math.imul(a^k,2654435761);b=Math.imul(b^k,1597334677)} a=Math.imul(a^a>>>16,2246822507)^Math.imul(b^b>>>13,3266489909); b=Math.imul(b^b>>>16,2246822507)^Math.imul(a^a>>>13,3266489909); return 4294967296*(2097151&b)+(a>>>0) };
console.log(hs('your20digitcodehere'));
```

> This is a client-side check. It keeps casual players out, but anyone who reads and edits the source can bypass it.

## Project structure

```
pixel-hopper/
├── pixel-hopper.html   # the whole game: HTML, CSS and JavaScript
└── README.md
```

Under the hood:

- **Rendering:** a 320×192 `<canvas>` scaled up with `image-rendering: pixelated`. Everything is drawn with rectangles and gradients; there are no image assets.
- **Game loop:** fixed 60 Hz timestep with an accumulator, so physics is frame-rate independent.
- **Levels:** a few are hand-authored from tile data. The rest come from a seeded generator, so they are identical on every playthrough.
- **Audio:** oscillator-based sound effects and a looping chiptune melody (Web Audio).
- **Saves:** `localStorage` under the key `pxh1`.

## Hosting on GitHub Pages

1. Rename `pixel-hopper.html` to `index.html` (or keep the name and link to it directly).
2. Push to GitHub.
3. Go to **Settings → Pages**, choose your branch and the `/ (root)` folder, and save.
4. Your game will be live at `https://aylanarciso0721-lang.github.io/Pixel-Hopper/`.

## Changelog

| Version | Highlights |
| --- | --- |
| **1.0** | 15 levels, 3 bosses, 4 superpowers including levitation, code-locked developer mode, colorblind and touch accessibility, reorganised menus, new sound effects |
| 0.9 beta | Tutorial level with hint signs, lighting and shadows, reset save |
| 0.8 beta | 16×16 sprites, 10 levels, 5 enemy types, 4 heroes, Insane and Demon difficulties |
| 0.7 beta | Version labels and About screen |
| 0.1 | First build: 3 levels, settings, developer mode |

## Contributing

Issues and pull requests are welcome. Because the game is a single file, please:

- keep it dependency-free,
- test in at least one desktop browser and one touch device (or emulation),
- describe gameplay changes in your PR (new levels, enemies, powers).

Ideas for contributions: more hand-authored levels, new enemy types, checkpoints, a level editor, control remapping.

## License

Add a license of your choice (for example [MIT](https://choosealicense.com/licenses/mit/)) and update this section.

The pixel font is [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) by CodeMan38, licensed under the SIL Open Font License.
