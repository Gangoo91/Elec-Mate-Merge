# Minor Works AcroForm prototype

Prototype to compare AcroForm-based PDF generation against the current PDFMonkey / Gotenberg flow for the Minor Works certificate.

**Nothing in here touches production.** No edge functions, templates, or feature flags are modified. This is a side experiment.

## Why

Today: form data → JSON → string-templating engine (Liquid or HTML). When a key drifts or a transformer renames a path, the template renders blank with no error. The `minor-works-field-mapping.md` doc exists precisely because that mapping is fragile.

AcroForm approach: the PDF template is the contract. Every field has a name. Fill it by name in code; the worst case is a visibly empty box on the PDF, never a silent drop. The template doubles as the data dictionary.

## Files

| File | Purpose |
|---|---|
| `field-map.mjs` | Single source of truth: payload path → AcroForm field name + type + label |
| `sample-payload.json` | A realistic Minor Works payload (matches `transformFormDataForTemplate` output) |
| `generate-template.mjs` | Builds `minor-works-template.pdf` — a labelled grid with all fields named |
| `fill-minor-works.mjs` | Loads template + payload → writes `minor-works-filled.pdf`, prints a fill report |

## Install

`pdf-lib` is the only new dependency. Around 500 KB, no native compile, runs in Node / Deno / browser:

```bash
npm install --save-dev pdf-lib
```

## Run

```bash
# 1. Generate the template (one-off, or whenever field-map.mjs changes)
node scripts/prototypes/minor-works-acroform/generate-template.mjs

# 2. Fill it with the sample payload
node scripts/prototypes/minor-works-acroform/fill-minor-works.mjs

# Or with a custom payload + output path:
node scripts/prototypes/minor-works-acroform/fill-minor-works.mjs \
  ./my-payload.json ./my-output.pdf
```

Open `minor-works-filled.pdf`. Every field should be visibly filled or visibly blank — never silently lost.

## What the prototype proves

1. **No silent data loss.** Fill report shows `filled / blank / missing-on-template` counts. If a payload key has a typo, that field shows up under `blank`. If `field-map.mjs` lists a field the template doesn't have, it shows up under `missing-on-template`. Both are loud.
2. **Template authoring is separated from code.** The template is a binary artefact; the code only does data binding. Visual changes don't require code changes.
3. **Single source of truth.** `field-map.mjs` is the only place payload paths and PDF field names meet. Both `generate-template` and `fill-minor-works` import it.

## What the prototype does NOT prove (intentionally)

- Regs-compliant visual layout. The generated template is a labelled grid for verification, not a BS 7671 model form. Production would replace it with the IET model PDF, authored once in Acrobat / LibreOffice with named fields dropped over the blanks. Code changes: none.
- Drawn signatures. AcroForm supports digital signature fields, but freehand signature images need `embedPng`/`embedJpg` and explicit placement — straightforward to add but out of scope here.
- Hosting / runtime. The current flow runs in a Supabase edge function (Deno). pdf-lib runs there fine — same import works in Deno. No new infra needed.

## Migration outline (if we go ahead)

1. Author `minor-works-template.pdf` over the IET model form (Acrobat / LibreOffice) — 2-3 hrs once.
2. Move `field-map.mjs` → `supabase/functions/_shared/certificate-templates/minor-works-field-map.ts`.
3. New edge function `generate-minor-works-pdf-v3` mirroring v2's API. Loads template via `Deno.readFile`, fills, returns bytes.
4. Add to feature flag in `MinorWorksPdfGenerator.tsx` alongside v1/v2.
5. Run all three in parallel for a week — compare outputs.
6. Delete v1 + v2 + Liquid template + HTML template once v3 is verified.

Net deletion across migration: PDFMonkey template (Liquid), Gotenberg HTML template, `transformFormDataForTemplate` (now redundant since field-map does the mapping inline), and the `minor-works-field-mapping.md` doc (the template *is* the doc).
