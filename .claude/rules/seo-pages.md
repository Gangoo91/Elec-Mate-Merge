# Public SEO Page Rules

1,400 page components in `src/pages/seo/`, all routed through
`src/routes/SEORoutes.tsx` and rendered by `PublicPageLayout`. Nearly all use
`src/pages/seo/templates/GuideTemplate.tsx`.

Reference implementation: `src/pages/seo/PlugInSolarRCDPage.tsx`.

## Adding a page requires ALL of:

1. Component in `src/pages/seo/<Name>Page.tsx`
2. `lazyWithRetry` import **and** a `<Route>` in `src/routes/SEORoutes.tsx`
3. A `<url>` entry in `public/sitemap-seo.xml` (or the matching sitemap)
4. Cross-links: the hub links the spoke, the spoke links back

## 🔴 Three shapes that pass eslint and crash the browser

These were all shipped to main once. `npm run build` is `vite build` with **no
tsc step**, so none of them fail the deploy — they fail in front of a user.

```tsx
// RelatedPage REQUIRES icon and category. SEORelatedPages renders <page.icon />,
// so omitting it is an undefined-component crash in the related-pages block.
const relatedPages: RelatedPage[] = [
  { title: '…', description: '…', href: '/…', icon: ShieldCheck, category: 'Protection' },
];

// SEOInternalLink takes `href`, NOT `to`. With `to` it renders <Link to={undefined}>.
<SEOInternalLink href="/plug-in-solar-uk">…</SEOInternalLink>
```

**Always run a scoped typecheck on new pages** — eslint and the dev server both
pass on all of the above:

```bash
# tsconfig.check.json extending tsconfig.app.json with only your files in "include"
NODE_OPTIONS="--max-old-space-size=8192" npx tsc --noEmit -p tsconfig.check.json > /tmp/sc.txt 2>&1
grep "YourPageName" /tmp/sc.txt   # exit code will be 2 from pre-existing errors elsewhere
```

The repo has ~4,270 pre-existing type errors, so a non-zero exit means nothing.
Grep the output for **your** filenames — that is the only signal.

## Lead magnets

`GuideTemplate` injects `<SEOInlineLeadMagnet />` after section 1 when there are
≥5 sections, defaulting to the BS 7671 cheatsheet. Pass the `leadMagnet` prop to
override it where the page has a topic-specific offer — otherwise the page pitches
an unrelated download at peak intent.

🔴 **A magnet `source` lives in THREE unions that must agree**, and the compiler
only checks two:

1. `Source` in `src/components/landing/EmailCaptureForm.tsx`
2. the inline union in `trackEmailCaptured`, `src/lib/analytics-events.ts`
3. `Source` in `supabase/functions/newsletter-subscribe/index.ts` — plus its
   `OTHER_MAGNETS` registry entry, which is what actually serves the file

All three have drifted from each other before. Adding a magnet means touching all
four places.

## Content rules

- **Answer-first.** Open with `answerBox` — the exact query as `question`, a
  40–60 word direct answer. That is what wins snippets and AI citations.
- **Numbers in titles** for lookup queries (800 W, 28 days, 27 August 2026).
- **Cite primary sources by section number.** Without that we are another blog.
- **Separate statutory from advisory visually.** Never render guidance as law.
- **Never claim a legal duty that does not exist** — overclaiming is the same
  category of error as the competitor claims that drew a cease and desist.
- **Never name a company** in a critical observation. Describe the pattern.
- Figures come from a shared constant (e.g. `PLUG_IN_SOLAR_FACTS`) so the public
  page and the in-app tool cannot drift. Do not hard-code a limit in a page.
- UK English. No trade-body names in titles.

## Verifying

eslint + the dev server is **not sufficient** — it passes on every crash above.
Load each new route in a browser and check the console. Vite compiles the lazy
chunk on first request, so a page can sit on a loading skeleton for several
seconds before rendering; that is not a broken route.
