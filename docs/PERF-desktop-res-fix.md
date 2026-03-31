# Desktop RES Score Fix — Priority Performance Ticket

**Current Score:** 55 (Needs Improvement)
**Target:** 75+ (Good)
**Mobile Score:** 95 (already good)

## Current Metrics (Desktop, Last 7 Days)

| Metric | Value  | Status | Target  |
| ------ | ------ | ------ | ------- |
| TTFB   | 2353ms | RED    | <800ms  |
| FCP    | 2743ms | RED    | <1800ms |
| LCP    | 3613ms | RED    | <2500ms |
| INP    | 152ms  | YELLOW | <200ms  |
| CLS    | 0.01   | GREEN  | <0.1    |
| FID    | 4ms    | GREEN  | <100ms  |

## Root Cause Analysis

### 1. TTFB 2353ms — THE MAIN PROBLEM

`index.html` has `Cache-Control: no-cache, no-store, must-revalidate` in `vercel.json`. Every page visit goes back to Vercel's origin server — no edge caching.

The rewrite rule `/((?!assets/...).*) → /index.html` evaluates against 4865+ static files before falling through.

**Fix:** Change `index.html` cache header:

```json
{
  "source": "/index.html",
  "headers": [
    { "key": "Cache-Control", "value": "public, s-maxage=60, stale-while-revalidate=300" }
  ]
}
```

This caches at Vercel's edge for 60 seconds, serves stale for 5 minutes while revalidating. Users get instant responses. New deploys invalidate automatically.

**Risk:** LOW — Vercel CDN cache only, browser doesn't cache (no `max-age`). Worst case: user sees a 60-second-old version of `index.html` which just bootstraps the SPA anyway.

### 2. Critical Path Bundle Size

Entry point chain loads **~1.6MB uncompressed** before first render:

- `index-BOPph7mz.js` — 398KB (entry)
- `App-DztIpTl3.js` — 725KB (router + all top-level imports)
- `vendor-analytics-BQPjNDmx.js` — 438KB (Sentry + PostHog)

**Fix A:** Move Sentry SDK to dynamic import (keep init call eager, but load SDK async):

```ts
// Instead of: import { initSentry } from './lib/sentry';
// Do: import('./lib/sentry').then(({ initSentry }) => initSentry());
```

This removes 438KB from the critical path. Errors in the first ~200ms of boot won't be captured, but that's acceptable.

**Fix B:** Analyse why `App.js` is 725KB. Likely candidates:

- All route definitions imported eagerly (even though components are lazy)
- Large context providers imported at top level
- Icon library tree-shaking not working (all of lucide-react?)

Run `npx vite-bundle-visualizer` to identify what's in App.js.

**Fix C:** Add `<link rel="modulepreload">` for the critical chunks in `index.html`:

```html
<link rel="modulepreload" href="/assets/index-BOPph7mz.js" />
<link rel="modulepreload" href="/assets/vendor-react-DxWYRjvs.js" />
```

This tells the browser to start downloading these in parallel with HTML parsing.

**Risk:** MEDIUM — bundle splitting changes need testing. Preload hints are safe.

### 3. Font Loading

Check if custom fonts are blocking render. If using Google Fonts or self-hosted fonts without `font-display: swap`, they block FCP.

**Fix:** Ensure all `@font-face` declarations have `font-display: swap`.

**Risk:** LOW

### 4. Total Asset Size

256MB in `/dist/assets/` across 4865 JS files. This is the full app with all lazy chunks + compressed variants (.br, .gz). Not a direct performance issue (lazy loaded), but indicates the app is very large.

## Implementation Order

1. **Cache header change** (5 min, LOW risk) — biggest TTFB impact
2. **Preload hints** (10 min, LOW risk) — helps FCP/LCP
3. **Font loading** (10 min, LOW risk) — helps FCP
4. **Sentry deferred loading** (30 min, MEDIUM risk) — reduces critical JS
5. **App.js bundle analysis + splitting** (1-2 hours, MEDIUM risk) — reduces critical JS

## Expected Impact

| Fix           | TTFB Impact | FCP Impact | LCP Impact |
| ------------- | ----------- | ---------- | ---------- |
| Edge cache    | -1500ms     | -1500ms    | -1500ms    |
| Preload hints | —           | -200ms     | -200ms     |
| Font swap     | —           | -100ms     | —          |
| Sentry defer  | —           | -300ms     | -300ms     |
| Bundle split  | —           | -400ms     | -400ms     |

**Projected desktop RES after all fixes: 80-90**
