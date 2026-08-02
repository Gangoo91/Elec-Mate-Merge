# Certificate PDF templates

**This directory is the single source of truth for every certificate's PDFMonkey
template.** If a template lives anywhere else in the repo, it is stale — delete
it rather than edit it.

## How a certificate becomes a PDF

```
  page (src/pages/inspection/…)          collects formData
        │
        ▼
  formatter (src/utils/…JsonFormatter)   formData ➜ flat payload for Liquid
        │
        ▼
  edge fn (supabase/functions/generate-…-pdf)
        │  posts { document_template_id, payload } to PDFMonkey
        ▼
  PDFMonkey renders the Liquid template  ← the .html files in this directory
```

The `.html` files here are **reference copies**. PDFMonkey holds the live
template, keyed by the ID below. Editing a file here does nothing on its own —
you must paste it into PDFMonkey against the matching template ID.

### Workflow for changing a template

1. Edit the `.html` file in this directory.
2. Copy it: `pbcopy < docs/templates/<file>.html`
3. Paste into PDFMonkey → the template with the ID from the table below → save.
4. Generate a cert from the app to confirm.

If a variable is added to the template, it must also be emitted by the
formatter — an unsourced `{{ var }}` renders as empty, silently.

## Index

| Certificate | Template file | PDFMonkey template ID | Formatter | Edge function |
|---|---|---|---|---|
| Emergency lighting | `emergency-lighting-certificate-template.html` | `4CB2EEBB-96D4-4138-A1C5-7F046901A69E` | `emergencyLightingJsonFormatter.ts` | `generate-emergency-lighting-pdf` |
| PAT testing | `pat-testing-certificate-template.html` | `9B374EDE-A879-4470-A507-4FBA2F7DA7A6` | `patTestingJsonFormatter.ts` | `generate-pat-testing-pdf` |
| Solar PV | `solar-pv-certificate-template.html` | `3AE10F9E-6BDA-4DF2-ABF1-20AFADEF5156` | `solarPVJsonFormatter.ts` | `generate-solar-pv-pdf` |
| Battery storage (BESS) | `bess-certificate-template.html` | `8686DCA2-4377-46F5-A931-BB1DC1137E35` | `bessJsonFormatter.ts` | `generate-bess-pdf` |
| Lightning protection | `lightning-protection-certificate-template.html` | `0A5C3791-496D-45F9-BCA2-EAE36A55D99E` | `lightningProtectionJsonFormatter.ts` | `generate-lightning-protection-pdf` |
| Smoke & CO alarm | `smoke-co-alarm-certificate-template.html` | `904D77D8-0781-41F7-816A-F8000C795CE1` | `smokeCOJsonFormatter.ts` | `generate-smoke-co-alarm-pdf` |
| G98 commissioning | `g98-commissioning-certificate-template.html` | `3C669DC3-FFCB-4A22-A8BA-A30989BFCC10` | `g98JsonFormatter.ts` | `generate-g98-commissioning-pdf` |
| G99 commissioning | `g99-commissioning-certificate-template.html` | `66F1AA91-1EC8-4180-8B7F-A9525D84C28C` | `g99JsonFormatter.ts` | `generate-g99-commissioning-pdf` |
| Disconnection | `disconnection-certificate-template.html` | `9B570110-5F31-434E-A529-705B5FF792FB` | `disconnection-certificate-formatter.ts` | `generate-disconnection-certificate-pdf` |
| Testing only | `testing-only-certificate-template.html` | `B8CA4903-F839-42D1-87D1-B40BFFF4593C` | `testingOnlyJsonFormatter.ts` | `generate-testing-only-pdf` |
| EV charging | `ev-charging-certificate-template.html` | `5B6C5D0A-6612-4E26-80B5-BF77EFCA407E` | `evChargingJsonFormatter.ts` | `generate-ev-charging-pdf` |

### Fire alarm — five certificates, one edge function

`generate-fire-alarm-pdf` serves all five. The caller must pass the right
`templateId`; when it doesn't, the function falls back to G2. **The routing is
owned by `src/utils/fireAlarmPdfRouting.ts` — never hardcode a fire alarm
template ID anywhere else.**

| Grade | Report type | Template file | PDFMonkey template ID | Formatter |
|---|---|---|---|---|
| G1 design | `fire-alarm-design` | `fire-alarm-g1-certificate-template.html` | `7DE2F415-5A70-414A-9FB3-707FB92D0F14` | `fireAlarmG1JsonFormatter.ts` |
| G2 installation | `fire-alarm` | `fire-alarm-g2-certificate-template.html` | `9ED166BD-FB05-4489-868F-673902FF2DBF` (edge-fn default) | `fireAlarmG2JsonFormatter.ts` |
| G3 commissioning | `fire-alarm-commissioning` | `fire-alarm-g3-certificate-template.html` | `2EC2B796-CC4A-4ECA-AB6D-DCCE8EE229FF` | `fireAlarmG3JsonFormatter.ts` |
| G6 inspection & servicing | `fire-alarm-inspection` | `fire-alarm-g6-certificate-template.html` | `24C2EA56-CDC8-4777-AD17-7B1764AC0C2D` | `fireAlarmG6JsonFormatter.ts` |
| G7 modification | `fire-alarm-modification` | `fire-alarm-g7-certificate-template.html` | `5ECD2939-5CE2-4E98-8E47-32F25975C352` | `fireAlarmG7JsonFormatter.ts` |

### EIC / EICR / minor works

These sit outside this directory and are being worked on separately:

- EICR — `docs/pdfmonkey-eicr-template.html` (canonical)
- EIC — `docs/pdfmonkey-eic-template.html`
- Minor works — **five copies survive, not yet de-duplicated.** Three here
  (`minor-works-certificate-template.html`, `-v2.html`,
  `minor-works-pdfmonkey-template.html`), a `-v3.html.bak`, and a stale
  `minor-works-template.html` at the repo root. Left alone deliberately: minor
  works is under active work elsewhere. Confirm which one PDFMonkey holds before
  deleting any of them.

## Branding

Every template should read the electrician's own branding rather than hardcoding
colours. `src/utils/certBranding.ts` is the one reader; the page passes its house
colour as the fallback so the cert keeps its identity when the user hasn't
chosen one.

```liquid
:root { --accent: {{ companyAccentColor | default: '#dc2626' }}; }
```

Available on every payload: `companyName`, `companyAddress`, `companyPhone`,
`companyEmail`, `companyWebsite`, `companyLogo`, `companyAccentColor`,
`registrationScheme`, `registrationNumber`, `registrationSchemeLogo`.

⚠️ There is **no** `company_profiles.company_logo` column. Use `certBranding.ts`
— it resolves `logo_data_url` then `logo_url`.

⚠️ **Two naming conventions are in use** and a template must match its own
formatter, or the value silently resolves to the default:

| Convention | Accent variable | Certificates |
|---|---|---|
| camelCase | `{{ companyAccentColor }}` | smoke/CO, G98, G99, BESS, lightning, testing only, disconnection |
| snake_case | `{{ company_accent_color }}` | PAT, EV charging, emergency lighting, solar PV, fire alarm ×5 |

The snake_case group also names its CSS variable `--accent-color` rather than
`--accent`. Check which one a template uses before editing it.

## Cover sheets

`smoke-co-alarm-certificate-template.html` carries the current cover-sheet
recipe (lifted from EICR). Copy from that one.

The mechanism matters: `@page cover { margin: 0 }` plus a `.cover-page` of fixed
`height: 296mm; overflow: hidden`. **Do not add a separate `<div class="page-break">`
after the cover** — the named page already breaks, and the extra div produces a
blank page 2.

**13 of the 16 now carry it**: smoke/CO, disconnection, EV charging, solar PV,
G98, G99, emergency lighting, PAT and the five fire alarm grades. The other
three (BESS, lightning, testing only) keep their own front sheet — see Known
gaps.

The status band is the one part that changes per certificate: it should show the
single fact the client cares about (overall result, system category, capacity
commissioned, appliances passed). Add `is-sat` to turn it green when the
certificate is satisfactory.

## Known gaps

- **Three certificates keep an older front sheet** rather than the navy cover:
  BESS, lightning protection and testing only. Each already opens with a
  `.front-sheet` title page that also carries declarations and signatures, so
  adding the cover would give them two title pages. Converting them means
  relocating that content first — a deliberate job, not a paste.

### Closed 2026-08-02

- **Brand colour now works on all 16.** It previously reached only smoke/CO.
  Three competing mechanisms existed: `certBranding.ts` (read `accent_color`),
  `loadCompanyBranding` in six smart-form hooks (read `primary_color`), and four
  pages doing a raw `get_my_company_profile` that read no colour at all. All now
  resolve **`primary_color` first, `accent_color` second**, then the cert's own
  house colour.
- **The dead logo column is gone from the G98/G99 paths.** Both read
  `company.company_logo`, which does not exist, so the electrician's logo never
  appeared. Both now use `fetchCertBranding()`.
- **UK dates.** Seven formatters emitted raw ISO and no template formatted dates
  in Liquid, so those certificates printed `2026-08-02`. PAT, BESS, lightning,
  G98, G99, testing only and EV now format every date the template renders, via
  the shared `src/utils/certDate.ts`.
- **BESS default colour** was blue in the formatter and green in the template;
  both are now `#059669`.

⚠️ A house colour lives in **two** places — the formatter's fallback and the
template's Liquid `default:`. They must match, or a user with no brand colour
set gets a certificate that differs from the design.

⚠️ Contrast: on templates where the accent sits on a dark header (BESS,
lightning, disconnection), a very dark brand colour will read poorly. The colour
is the electrician's choice; nothing clamps it.
