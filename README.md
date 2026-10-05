# 🕹️ Pixel Hopper

![version](https://img.shields.io/badge/version-1.2-brightgreen) ![dependencies](https://img.shields.io/badge/dependencies-none-blue) ![platform](https://img.shields.io/badge/platform-browser-orange)

A retro pixel-art platformer that runs entirely in your browser. One HTML file, no build step, no dependencies.

Run, jump and stomp through 15 levels, fight 3 bosses, collect superpowers (including levitation), and play on five difficulty levels, with colorblind and touch-screen support built in.

<!-- Add a screenshot or GIF here:
![Pixel Hopper gameplay](docs/<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" shape-rendering="crispEdges" xmlns:c2pa="http://c2pa.org/manifest"><metadata><c2pa:manifest>AAAWgmp1bWIAAAAeanVtZGMycGEAEQAQgAAAqgA4m3EDYzJwYQAAABZcanVtYgAAAEdqdW1kYzJtYQARABCAAACqADibcQN1cm46YzJwYTpmMmFhNzIxOS1jODdlLTRiODUtOWQ2NC01N2I4MTFhZTdjOTAAAAADl2p1bWIAAAApanVtZGMyYXMAEQAQgAAAqgA4m3EDYzJwYS5hc3NlcnRpb25zAAAAALxqdW1iAAAARGp1bWRjYm9yABEAEIAAAKoAOJtxE2MycGEuaW5ncmVkaWVudC52MwAAAAAYYzJzaLdMwyBNtLBObXP1Nb88UTYAAABwY2JvcqNpZGM6Zm9ybWF0bWltYWdlL3N2Zyt4bWxqaW5zdGFuY2VJRHgseG1wOmlpZDo1Y2Q3YzU5Mi05Mzc2LTQ0MzctOTk3MS03NTc2Y2ZjM2VmZjFscmVsYXRpb25zaGlwaHBhcmVudE9mAAAB4mp1bWIAAABBanVtZGNib3IAEQAQgAAAqgA4m3ETYzJwYS5hY3Rpb25zLnYyAAAAABhjMnNolkMkqMX9u0/AXiWjweHZSAAAAZljYm9yomdhY3Rpb25zgqJmYWN0aW9ua2MycGEub3BlbmVkanBhcmFtZXRlcnOha2luZ3JlZGllbnRzgaJjdXJseC1zZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmluZ3JlZGllbnQudjNkaGFzaFgg+d/nkbgh4QGkUDPrfldkl8akL0OZqIA4IzPq/OcwfVikZmFjdGlvbngdY29tLmFudGhyb3BpYy5jbGF1ZGUucHJvdmlkZWRqcGFyYW1ldGVyc6F4H2NvbS5hbnRocm9waWMub3JpZ2luLWNvbmZpZGVuY2VndW5rbm93bmtkZXNjcmlwdGlvbnhmQ2xhdWRlIHByb3ZpZGVkIHRoaXMgZmlsZSBhdCB0aGUgcmVxdWVzdCBvZiBhIHVzZXIgYW5kIG1heSBoYXZlIGNyZWF0ZWQgb3IgbW9kaWZpZWQgdGhlIGZpbGUgY29udGVudHMubXNvZnR3YXJlQWdlbnShZG5hbWVmQ2xhdWRlcmFsbEFjdGlvbnNJbmNsdWRlZPUAAADIanVtYgAAAEBqdW1kY2JvcgARABCAAACqADibcRNjMnBhLmhhc2guZGF0YQAAAAAYYzJzaFtuLwrzM2xmuU/amBlEaeoAAACAY2JvcqVjYWxnZnNoYTI1NmNwYWRNAAAAAAAAAAAAAAAAAGRoYXNoWCA/OV0ZIFK7b4EECs0z7ED3fdqTtZ36Ku4Aado5T9JXHWRuYW1lbmp1bWJmIG1hbmlmZXN0amV4Y2x1c2lvbnOBomVzdGFydBiYZmxlbmd0aBkeBAAAAj5qdW1iAAAAJ2p1bWRjMmNsABEAEIAAAKoAOJtxA2MycGEuY2xhaW0udjIAAAACD2Nib3KlY2FsZ2ZzaGEyNTZpc2lnbmF0dXJleE1zZWxmI2p1bWJmPS9jMnBhL3VybjpjMnBhOmYyYWE3MjE5LWM4N2UtNGI4NS05ZDY0LTU3YjgxMWFlN2M5MC9jMnBhLnNpZ25hdHVyZWppbnN0YW5jZUlEeCx4bXA6aWlkOjdkM2M0ZGQ1LTZhOTQtNGRiMS1hYjY1LTdlNzIwNDQwMWUzOXJjcmVhdGVkX2Fzc2VydGlvbnODomN1cmx4LXNlbGYjanVtYmY9YzJwYS5hc3NlcnRpb25zL2MycGEuaW5ncmVkaWVudC52M2RoYXNoWCD53+eRuCHhAaRQM+t+V2SXxqQvQ5mogDgjM+r85zB9WKJjdXJseCpzZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmFjdGlvbnMudjJkaGFzaFgg7kNqG1npA9FPw0ov2BXPUVGMxyos+tNNSr9b8159996iY3VybHgpc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5oYXNoLmRhdGFkaGFzaFggW7HGU755gbnKueNVEJUolTn8eSu8dwKBZS8D7xhlXp10Y2xhaW1fZ2VuZXJhdG9yX2luZm+jZG5hbWVvQW50aHJvcGljIEZpbGVzZ3ZlcnNpb25lMS4wLjBrc3BlY1ZlcnNpb25lMi40LjAAABA4anVtYgAAAChqdW1kYzJjcwARABCAAACqADibcQNjMnBhLnNpZ25hdHVyZQAAABAIY2JvctKEWQISogEmGCFZAgowggIGMIIBjaADAgECAhRA5aAK7sI50L64g/oGQgU9Z1UTADAKBggqhkjOPQQDAzBJMRcwFQYDVQQKEw5BbnRocm9waWMsIFBCQzEuMCwGA1UEAxMlQW50aHJvcGljIENvbnRlbnQgQ3JlZGVudGlhbHMgUm9vdCBDQTAeFw0yNjA4MDcxODQzNTZaFw0yODA4MDYxOTQzNTZaMEQxFzAVBgNVBAoTDkFudGhyb3BpYywgUEJDMSkwJwYDVQQDEyBBbnRocm9waWMgQ2xhdWRlIENvbnRlbnQgU2lnbmluZzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABJh6CmvLUBgFFNU0vUKlOVtE6djd17L5SuwX0LemFisBM3dkd/3cyjxFA3Qo5S46fX0/ihY0VZ7mfb9KF703t5OjWDBWMA4GA1UdDwEB/wQEAwIHgDAVBgNVHSUEDjAMBgorBgEEAYPoXgIBMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUzlHiBIFOZFsj+OPEz5o+nMHXXMIwCgYIKoZIzj0EAwMDZwAwZAIwMXMdFJ4BetLLVY7ORuE9noqbbAZOZn/aArXyTwFAZfKrPzxF2vPoJNf1+UCdg1XGAjBwX1zd9WGqYkqmL5SFqw1QySjr1zJfpJM9+1rdDwSPLMOPOjKuiXjoU/pUUeG9RwmhY3BhZFkNngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPZYQCvx34WDxeozWcI931xieqeWAyxqEZkPFPh7uCzNV4N98+TErKaWaIthBehngjjgg/J95MLNwDpPQ63prscNvlE=</c2pa:manifest></metadata><rect width="20" height="20" rx="3" fill="#0b0b12"/><g transform="translate(2 2)"><rect x="2" y="1" width="12" height="4" fill="#e03030"/><rect x="10" y="4" width="5" height="2" fill="#e03030"/><rect x="3" y="5" width="10" height="5" fill="#ffc890"/><rect x="9" y="6" width="2" height="3" fill="#000"/><rect x="2" y="10" width="12" height="4" fill="#3858f0"/><rect x="3" y="14" width="4" height="3" fill="#202060"/><rect x="9" y="14" width="4" height="3" fill="#202060"/></g></svg>
enshot.png<img width="150" height="150" alt="icon" src="https://github.com/user-attachments/assets/3fc60309-556e-407e-bd1c-36a173ad5166"/>
)
-->

## Contents

- [Quick start](#quick-start)
- [Features](#features)
- [Controls](#controls)
- [Gameplay guide](#gameplay-guide)
- [Shop: outfits and upgrades](#shop-outfits-and-upgrades)
- [Progression: achievements, daily challenge, best times](#progression-achievements-daily-challenge-best-times)
- [Install and play offline](#install-and-play-offline)
- [Options and accessibility](#options-and-accessibility)
- [Developer mode](#developer-mode)
- [Project structure](#project-structure)
- [Debugging and tests](#debugging-and-tests)
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
- **Shop:** bank the coins you collect, then buy 6 outfits and 5 permanent upgrades.
- **Checkpoints** in every level on every difficulty, and **Continue from checkpoint** after a game over.
- **Boss intros and a second phase:** each boss roars in, then gets faster and adds a spread-shot attack at half health.
- **Progression:** 10 achievements, a **daily challenge** level with a date-based seed, and best-time records.
- **Gamepad support and key remapping.**
- **Installable and offline:** web app manifest, service worker and a bundled pixel font.
- **5 difficulty levels:** Easy, Normal, Hard, Insane and Demon.
- **Retro look with lighting:** 16×16 sprites on a 320×192 canvas, gradient skies, parallax hills, shadows, ambient particles, optional CRT scanlines and vignette.
- **Chiptune music and sound effects** generated with the Web Audio API (no audio files).
- **Accessibility:** colorblind filters, high-contrast mode, enemy outlines, screen-shake toggle and vibration control.
- **Touch support:** on-screen controls with adjustable size, plus tappable menus.
- **Locked developer mode:** hitboxes, god mode, noclip, level skip and more, behind a 20-digit code.
- **Saved progress:** unlocked levels, best scores and settings are stored in `localStorage`.
- **Robust by design:** a runtime error is caught and logged instead of freezing the game, and corrupted or outdated save data is repaired on load.
- **Auto-pause:** the game pauses when you switch tabs or windows, so you never lose a life in the background.

## Controls

### Keyboard

| Action | Keys |
| --- | --- |
| Move | `←` `→` or `A` `D` |
| Jump | `Space`, `Z`, `↑` or `W` (hold for a higher jump) |
| Fire (with Fire power) | `X` or `Shift` |
| Levitate (with Levitate power) | Hold jump while in the air |
| Pause / resume | `Esc` or `P` (the game also pauses automatically when the tab loses focus) |

These are the defaults. Rebind Left, Right, Jump, Fire and Down under **Options → Keyboard / Pad**.
| Menus | `↑` `↓` to move, `←` `→` to change options, `Enter` to select, `Esc` to go back |

### Gamepad

Any standard controller works (Xbox, PlayStation, Switch Pro and similar). It is detected automatically when you press a button.

| Action | Control |
| --- | --- |
| Move | Left stick or D-pad |
| Jump | `A` (bottom face button) or D-pad up |
| Fire | `X` (left face button) |
| Pause / resume | Start |
| Menus | D-pad or stick to move, `A` to select, `B` to go back |

### Mouse and touch

- Menus work with hover and click or tap.
- The **II** button on the touch pad pauses and resumes.
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

### Checkpoints

Every level (except the tutorial) has up to two checkpoint flags, placed on safe ground away from spikes. Touch one and it turns green. If you die you restart there with your coins and orb pickups intact, and you are briefly invulnerable. Boss levels have a checkpoint before the arena, not inside it.

On **Insane** and **Demon** you only have one life, so a death is a game over. The game-over screen then offers **Continue from checkpoint**, which restores your starting lives at the last checkpoint you reached. **Retry level** starts from the beginning.

### Bosses

| Level | Boss |
| --- | --- |
| 5 | Ice Golem |
| 10 | Demon King |
| 15 | Void Titan |

Each boss has a short roaring intro during which it cannot hurt you. Bosses then chase you, jump and shoot projectiles, and speed up as they take damage. At **half health** a boss becomes **enraged**: its eyes turn yellow, it moves 25% faster, jumps more often and fires a three-way spread shot. Stomp them or hit them with fireballs. Shield and Fire orbs are placed in each arena.

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

## Shop: outfits and upgrades

Coins you collect are **banked when you clear a level**. Dying loses that attempt's coins, and the tutorial pays nothing. Harder difficulties pay more:

| Difficulty | Easy | Normal | Hard | Insane | Demon |
| --- | :---: | :---: | :---: | :---: | :---: |
| Coin payout | ×1 | ×1 | ×1.25 | ×1.5 | ×2 |

Open the shop from the title screen. Your wallet, outfits and upgrades are saved with your progress.

### Outfits (cosmetic)

Outfits work with every hero and change how your character looks, including in the shop preview.

| Outfit | Price | Look |
| --- | :---: | --- |
| Classic | Free | Your hero's own colors |
| Ninja | 30 | Dark suit, mask and red headband |
| Knight | 60 | Steel armor with a red plume |
| Wizard | 100 | Purple robe and a pointed star hat |
| Astronaut | 150 | White helmet with a glass visor |
| Royal | 220 | Gold crown |
| Ghost | 300 | Translucent white |

### Upgrades (permanent)

The price of each level is the base price × the level you are buying (for example Extra Life costs 50, then 100, then 150).

| Upgrade | Max level | Base price | Effect |
| --- | :---: | :---: | --- |
| Extra Life | 3 | 50 | +1 life in every level |
| Super Jump | 3 | 40 | +4% jump height per level |
| Power Time | 3 | 60 | +25% duration for Levitate, Fire and Star per level |
| Coin Magnet | 3 | 50 | Pulls coins toward you from 28, 44 or 60 pixels |
| Start Shield | 1 | 120 | Every level starts with a Shield |

Upgrades apply on every difficulty. **Options → Save Data → Reset Save** clears the wallet, outfits and upgrades along with your level progress.

## Progression: achievements, daily challenge, best times

### Achievements

Open **Play → Achievements**. There are 10 badges:

| Achievement | How to earn it |
| --- | --- |
| First Steps | Clear level 1 |
| Boss Slayer | Defeat a boss |
| Untouchable | Clear a level without dying |
| Stomper | Stomp 50 enemies in total (counted on level clears) |
| Coin Hoarder | Earn 500 coins in total |
| Sky High | Collect a Levitate orb |
| Fashionista | Own every outfit |
| Demon Hunter | Clear a level on Demon |
| Completionist | Clear all 15 levels |
| Daily Grind | Clear the daily challenge |

### Daily challenge

**Play → Daily** loads a generated level whose layout is fixed by today's date, so everyone gets the same level on the same day (in their local time zone). The first clear each day pays **double coins** and unlocks Daily Grind. Replays pay nothing but still count for your best score.

### Best times

Every level remembers your fastest clear. The clear screen shows **NEW RECORD!** when you beat it.

## Install and play offline

Pixel Hopper is a progressive web app. When it is served over **HTTPS** (for example GitHub Pages), browsers can install it and it keeps working offline:

- **Desktop Chrome or Edge:** click the install icon in the address bar.
- **Android Chrome:** menu → *Install app*.
- **iPhone or iPad Safari:** Share → *Add to Home Screen*.

The pixel font is bundled inside `pixel-hopper.html`, so the game looks the same offline. A service worker caches the game and updates it in the background the next time you are online. Opening the file directly from disk (`file://`) still works, but without installation or offline caching.

## Options and accessibility

The title screen is organised into **Play**, **Shop**, **Game Setup**, **Options** and **About**.

| Menu | Settings |
| --- | --- |
| **Audio** | Volume, music, sound effects |
| **Display** | CRT filter, vignette, fullscreen |
| **Accessibility** | Color mode (Off, Protan, Deutan, Tritan, High-contrast), enemy outlines, screen shake, vibration |
| **Keyboard / Pad** | Rebind Left, Right, Jump, Fire and Down (conflicting keys are refused, `Esc` cancels), reset to defaults |
| **Touch controls** | Touch pad (Auto, On, Off), button size, vibration |
| **Save data** | Reset save (asks for confirmation; also clears coins, outfits and upgrades) |
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
| `L` | Show the recent event log on screen |

It also shows a debug panel (version, FPS, position, velocity) and unlocks every level in Level Select. The Developer menu also has a **+1000 coins** button for testing the shop.

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
├── pixel-hopper.html          # the whole game: HTML, CSS, JavaScript and the bundled font
├── manifest.webmanifest       # web app manifest (installable app)
├── sw.js                      # service worker (offline play)
├── icon.svg, icon-*.png       # app icons
├── tests/
│   └── run-tests.js           # headless test runner (Node, no dependencies)
├── .github/workflows/
│   ├── test.yml               # runs the tests on every push and pull request
│   └── release.yml            # runs the tests and publishes a GitHub release for v* tags
└── README.md
```

The script inside `pixel-hopper.html` is organised into labelled sections, in this order:

| Section | Contents |
| --- | --- |
| `CONFIG` | Canvas size, difficulties, heroes, outfits, upgrades, bosses, power-ups, achievements, key bindings, color filters, secret-code hash |
| `LEVELS` | Hand-built levels, the seeded level generator, the tutorial |
| `SAVE + GAME STATE` | Settings, progress, global state |
| `DEBUG` | Event log, invariant checks, error recovery, save sanitising |
| `AUDIO` | Sound effects and music |
| `PHYSICS + GAME RULES` | Collision, damage, bosses, level loading, scoring |
| `UPDATE` | The fixed 60 Hz `step()` function |
| `MENUS` | Every menu screen as data |
| `RENDERING` | All drawing code |
| `INPUT` | Keyboard, pointer and touch handlers |
| `MAIN LOOP` | Frame loop with error recovery |
| `DEBUG API` | The read-only `PH` object used by the console and the tests |

Under the hood:

- **Rendering:** a 320×192 `<canvas>` scaled up with `image-rendering: pixelated`. Everything is drawn with rectangles and gradients; there are no image assets.
- **Game loop:** fixed 60 Hz timestep with an accumulator, so physics is frame-rate independent.
- **Levels:** a few are hand-authored from tile data. The rest come from a seeded generator, so they are identical on every playthrough.
- **Audio:** oscillator-based sound effects and a looping chiptune melody (Web Audio).
- **Saves:** `localStorage` under the key `pxh1`.

## Debugging and tests

### In the browser

Open the developer console and use the read-only `PH` object:

| Command | What it does |
| --- | --- |
| `PH.log()` | The last 200 game events (level loads, deaths, power-ups, boss hits, errors) |
| `PH.state()` | A snapshot of the scene, level, lives, player position and boss health |
| `PH.inv()` | Checks game invariants (NaN values, player out of bounds or inside a wall) and returns any problems |
| `PH.errors()` | The last caught runtime error |

With developer mode unlocked, press `L` in a level to show the event log on screen. Invariants are also checked automatically in developer mode.

### Automated tests

```bash
node tests/run-tests.js              # tests ../pixel-hopper.html
node tests/run-tests.js path/to.html # tests another build
```

Requires Node 18 or newer. The runner loads the game headlessly with a fake canvas and checks:

1. **Level validation:** gaps are at most 3 tiles, platforms, coins and orbs are within jump reach, nothing spawns inside walls or on spikes, spawn points and flags sit on solid ground.
2. **1,000 randomised play sessions** across all levels, difficulties and heroes, checking invariants every frame.
3. **Scripted boss fights** on all three boss levels, including clearing the level afterwards.
4. **Every menu item** is activated and every screen is drawn.
5. **The secret code:** wrong codes are rejected and the right one is accepted.
6. **120,000 random keyboard and pointer events**, with developer mode locked and unlocked.
7. **Corrupted save data** is repaired.
8. **Render errors** do not stop the main loop.
9. **Every hero on every difficulty** can clear a 3-tile gap with a last-moment jump.
10. **Economy and shop:** coin payouts per difficulty, no payout in the tutorial, purchase rules, price tables, every upgrade's effect, and reset save.
12. **Static reachability solver:** every level (including the daily one) must have a chain of jumps, limited by the real jump physics, from the spawn to the flag. The solver is checked against deliberately broken levels so it cannot pass by accident.
13. **Checkpoints** on every difficulty: reached, respawn with progress kept, and continue after a game over.
14. **Bosses:** the roaring intro, and the phase 2 transition.
15. **Progression:** achievements, best times, and the daily level (deterministic, pays double once).
16. **Key remapping and gamepad:** conflicts, cancel, reset, menus by pad, movement by pad, disconnect.
17. **App files:** manifest, icons, service worker, bundled font and workflows exist and are valid.
18. **Save repair** for key bindings, achievements and stats.
11. **Noclip safety:** leaving noclip inside a platform pushes the player out instead of trapping them.

The runner exits with a non-zero code on failure, and `.github/workflows/test.yml` runs it on Node 18, 20 and 22 for every push. The solver proves a platform-to-platform jump path exists; it deliberately ignores enemies and ceilings, so it shows each level can be finished in principle, not that every enemy placement is fair. Please open an issue if a level feels unfair.

## Hosting on GitHub Pages

1. Rename `pixel-hopper.html` to `index.html` (or keep the name and link to it directly).
2. Push to GitHub.
3. Go to **Settings → Pages**, choose your branch and the `/ (root)` folder, and save.
4. Your game will be live at `https://aylanarciso0721-lang.github.io/Pixel-Hopper/`.

## Changelog

| Version | Highlights |
| --- | --- |
| **1.2** | Pro update: checkpoints in every level plus continue-from-checkpoint after a game over (helps Insane and Demon), boss roaring intros and an enraged phase 2 with a spread shot, 10 achievements, a daily challenge, best-time records, gamepad support, key remapping, web app manifest, service worker, bundled font, and GitHub Actions for tests and releases. The tests gained a pathfinding solver and now have 18 groups |
| 1.1 | Shop update: coins now bank on level clear and can be spent on 6 outfits and 5 permanent upgrades (extra lives, jump height, power-up time, coin magnet, start shield). Also fixed: leaving developer noclip inside a wall could trap the player, and save repair now covers shop data. 11 test groups |
| 1.02 | Deep bug-fix and code-organisation update: **Demon difficulty could not jump** (fixed), main loop could freeze permanently after an error (now recovers), corrupted saves could crash startup (now repaired), screen shake and toast timing depended on monitor refresh rate, long level names overlapped the HUD, two unreachable platforms in Neon Citadel and nine enemies placed on spikes in generated levels, the developer level-skip could enter the tutorial. Code is now split into labelled sections with a `PH` debug API, an event log and a test runner |
| 1.01 | Bug fixes: Developer screen could return to a stale menu (even a paused game), holding Enter repeated menu actions, `P` could not resume from pause, the touch pause button could not resume, fireballs could fire on resume from pause, the game kept running in a background tab, and the level-select scroll arrow overlapped the title |
| 1.0 | 15 levels, 3 bosses, 4 superpowers including levitation, code-locked developer mode, colorblind and touch accessibility, reorganised menus, new sound effects |
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
