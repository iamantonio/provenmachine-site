# provenmachine.com

Static site hosting the App Store pages (support, privacy policy, terms) for every ProvenMachine iOS app.

- `src/apps.mjs`: every app's facts and copy. **The only file you normally edit.**
- `src/static/`: stylesheet and favicon. `src/icons/`: 256px app icons (`<slug>.png`).
- `build.mjs`: generates `public/`. No dependencies: `node build.mjs`.
- `serve.mjs`: local preview with clean URLs: `node serve.mjs` → http://localhost:4321

Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).

## URLs for App Store Connect

| Field | URL |
|---|---|
| Support URL | `https://provenmachine.com/apps/<slug>/support` |
| Privacy Policy URL | `https://provenmachine.com/apps/<slug>/privacy` |
| Terms (EULA link in app / description) | `https://provenmachine.com/apps/<slug>/terms` |
| Marketing URL | `https://provenmachine.com/apps/<slug>/` |

Slugs: calibrate, cashsplit, hearthkeep, trialguard, habits, return-window-radar, warranty-window-radar,
memorymapster, frictionkiller, aftercall, packqueue, rationalelab (hidden from the home page).

## Adding or changing an app

1. Add/edit its entry in `src/apps.mjs`. Set `hidden: true` to build pages without listing it on the home page.
2. Drop a 256px icon at `src/icons/<slug>.png` and set `icon: true`.
3. If the app's data handling changed, update `ledger` + `privacy`, and bump `updated`.
4. `node build.mjs && node serve.mjs` to check, then push.

## DNS (IONOS)

GitHub Pages apex records for `provenmachine.com`:
- A: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- AAAA: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153
- CNAME `www` → `iamantonio.github.io`
