# Routine Inspection PDF — template notes

The **live PDFMonkey template is the source of truth**. `template.html` in this
directory is a seed that is kept in step with it by hand; fetch and patch the
live template rather than pasting this file over it.

Template id: `11506cfb-61a6-4b53-88fc-511399fa8c53`
(also in `index.ts` as `TEMPLATE_ID`).

## 🔴 Page setup is NOT CSS

Size, orientation, margins **and the page footer** live in the `settings` blob on
the API resource, not in `template.html`. PDFMonkey ignores the CSS `@page` rule,
so a template left on defaults prints flush to the paper and gets clipped by
every printer (ELE-1629 / ELE-1633).

`template.settings.json` mirrors the live blob so it is recoverable. It is a
MIRROR, not the source — changing it here changes nothing until it is PATCHed.

```
PATCH https://api.pdfmonkey.io/api/v1/document_templates/<id>
{"document_template": {"settings": { ...the whole blob... }}}
```

⚠️ Send the **whole** settings object. A partial PATCH drops the keys you omit,
including the paper size.

## The footer

`settings.footer.content` renders on every sheet and **does interpolate Liquid**
— verified against a live render, not assumed. It carries the certificate number
and the installation address so a page separated from the document can still be
identified, alongside `pageNumber` / `totalPages`.

Do not add a CSS footer to `template.html`. There was one briefly, and it printed
a second footer underneath this one.

## Two visit types, two duties

`metadata.is_landlord_visit` switches the report between a landlord annual visit
and a commercial maintenance visit. They evidence **different duties** and the
document says which — see the header of `template.html` and
`src/data/landlordInspectionItems.ts`.

`npm run check:routine-inspection` guards that the masthead reads
`metadata.legal_basis` rather than hard-coding a statute, that the two visit
types cite different law in both places it appears, and that the "what needs
doing" list can never contradict the verdict.

## Verifying a change

Render a real document through the API and read every page — a Liquid error
prints *into* the PDF rather than failing the request:

```
pdftotext out.pdf - | grep -i 'liquid error'
```
