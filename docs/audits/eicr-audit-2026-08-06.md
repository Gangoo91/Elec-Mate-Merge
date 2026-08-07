# EICR workflow audit — 6 August 2026

Environment: local dev (`localhost:8080`), founder account, Chrome.
Certificates exercised: EICR-2026-3959, -3963, resumed draft `eicr-55f0da21`, PDF `EICR-2026-2315`.

Auditor's note: three findings published mid-audit were **retracted** after verification.
They are recorded here in full, because a retracted finding is evidence about the audit
method, not something to quietly drop.

---

## 0. Retractions — claims made and then disproved

| Claim made | Reality | Why I got it wrong |
| -- | -- | -- |
| "Saved certificates cannot be reopened" | **False** — Resume loads a cert fully populated (Andrew Moore, 54%) | I hand-built a `reportId` URL using a `reports.id`. Drafts are addressed by a **localStorage** id (`elec-mate-draft-eicr-<id>`), a different id space. |
| "The wizard abandons your certificate" | **Overstated** — it is a component remount that resets to Step 1 with **data intact**; no `pushState`/`popstate` fires | Conflated "lost my place" with "lost my work". |
| "An incomplete certificate can be issued" | **False** — Generate is `disabled` and backed by a named 6-item checklist | Read `required: false` on the inputs and stopped there instead of testing the issue gate. |

Lesson for future audits of this app: **drafts live in localStorage, cloud copies in `reports`, and the two use different id spaces.** Never construct a certificate URL by hand; always enter through the app's own Resume path.

---

## 1. Verified defects

| ID | Area | Issue | Evidence | Severity |
| -- | -- | -- | -- | -- |
| D1 | Issue step | Pre-issue checklist items are **not clickable** — no jump-to-field. Six missing items are named across three different steps and the user must find each one manually. | `looksClickable:false`, nothing focused after click, dialog stays open | High |
| D2 | Observations | **Boilerplate observation text is printable.** Marking an item C2 pre-fills *"Item requires attention - inspection outcome not satisfactory"* and *"Investigate and rectify as required to comply with BS 7671"*. Both print verbatim on a signed certificate unless overwritten. | Read from live fields after marking item 5.1 as C2 | High |
| D3 | Progress | **Completion % ignores Step 1 entirely.** 6 fields filled → 38%. 18 of 24 fields filled and saved → still 38%. Only moved (46%) when the inspection schedule was set. | Measured twice | High |
| D4 | Persistence | **Draft accumulation.** 15 cloud rows created in 3 hours, **13 with no client name**; 14 `elec-mate-draft-eicr-*` keys in localStorage. Feeds the "20 unsaved drafts waiting" banner. Nothing prunes empties. | DB query + localStorage enumeration | High |
| D5 | Navigation | Component remount **resets to Step 1**; four clicks to return to Issue. Data is retained. | 5 occurrences during the session | Medium |
| D6 | Performance | Step transitions **3.7–6.0s** (Inspect 4.1s, Testing 5.0s, Sign off 6.0s, Issue 6.0s). | Timed ×8 | Medium |
| D7 | Performance | **45s renderer freeze** on a burst of 21 field writes + 7 row duplications. Relevant because AI scan and bulk fill issue the same kind of burst. | CDP `Runtime.evaluate` timeout | Medium |
| D8 | Identity | **Certificate numbering is incoherent.** Screen showed `EICR-2026-3959`, then `-3963`; the generated PDF is titled `EICR-2026-2315`; the stored `report_id` is `EICR-1786047522163-fjdu77`. Four different identifiers around one job. | Observed across session | Medium |
| D9 | Browser | `document.title` never updates — every route reads "Dashboard \| Elec-Mate". Breaks tab identification, history and bookmarks. | All routes | Cosmetic |
| D10 | Copy | **"1 item need putting right"** — should be *needs*. | Issue step | Cosmetic |
| D11 | Testing | Validate reads **"1"** on a completely blank schedule. | Testing step, new cert | Low |

### Carried over from the same day's engineering work (separately evidenced)

* **The R₂ column does not bind to `r2`.** `ContinuityCells` binds it to `ringContinuityLive` ("temporary field"). `TestResult.r2` exists, is documented as "R₂ only (Ω)", and **no cell writes it** — so anything reading `r2` sees empty on every certificate.
* **Bulk infill ignores its board scope** (sets `activeBoardId`, then maps every circuit on every board) and **has no spare-way guard**, unlike its sibling `handleBulkFieldUpdate`. Its field list is duplicated across two files; both copies include the dead `r2` and both omit `ringContinuityLive`.

---

## 2. Verified strengths

Each of these was exercised, not assumed.

* **Pre-issue gate.** Generate is disabled with *"6 items to complete before generating — tap to see"*, listing each missing item tagged with its step (Details / Testing / Sign off). This is the right mechanism in the right place.
* **"Mark all remaining satisfactory"** — 66 inspection items set in 3.3s; percentage moved 38% → 46%.
* **Per-item classification chips** — OK / C1 / C2 / C3 / FI / N/A / N/V / LIM on every item, each carrying its regulation reference (5.1 → 514.3.1), plus per-section All OK / All N/A / Clear.
* **Inspection → observation → remedial chain.** Marking C2 auto-creates the observation, carries the inspection item text across, and offers "Raise as remedial work".
* **Circuit description type-ahead.** "kit" → *Kitchen Ring · 32A Type B RCBO · 2.5/1.5mm² · 30mA RCD Type A*, filling device, curve, rating, cable, cpc and RCD in one tap, with reference method correctly left blank as a site observation.
* **Signature capture** — canvas accepts pen input.
* **PDF generation is real** — 9 pages, 420KB, valid `%PDF-`, 157 font references, 2 images. Blank-looking thumbnails are a viewer artefact (content streams are Flate-compressed).
* **AI observation enhancement is properly grounded.** `enhance-eicr-observation` queries `bs7671_facets` (A4:2026) via `searchFacets`; regulation references are taken **only** from facets carrying a real reg number, deduped, with facets lacking one skipped. An explicit comment blocks sourcing regulations from `practical_work_intelligence` after that previously produced invented job-brief "regulations". Remedial guidance comes from `practical_work_intelligence`, which is its correct purpose.

---

## 3. Not yet audited

Stated explicitly so this is not mistaken for coverage:

* AI observations — live add / accept / edit / re-generate behaviour
* Field-level audit of the Details, Testing and Sign off tabs
* Email send, quote-remedial flow, invoice flow, danger notice, QS review, download
* PDF page-by-page fidelity against entered data
* Full invalid-input matrix (Stage 4): dates, negatives, overlong strings, special characters, duplicate circuit numbers

---

## 4. Recommended next package

Small and contained, in this order:

1. **D2** — boilerplate observations. Highest professional risk: a coded defect that describes no defect. Leave blank and block issue until written.
2. **D1** — make checklist items jump to their field. The list already knows the step; it just does not navigate.
3. **D3** — include Step 1 in the completion calculation.
4. **D4** — only persist a draft after a meaningful field is entered; prune empties.

Do not batch these with unrelated work. Re-audit after they land.

---

## 5. AI observations — tested live

Test input, entered as a realistic domestic defect:

> **Item/location:** Bathroom — zone 1
> **Observation:** No supplementary bonding present between the bath, the copper pipework and the CPC, and the bathroom lighting circuit has no 30mA RCD protection.

### What works well

* **Honest framing.** The sheet header reads *"Grounded in the BS 7671 regulations — review every suggestion before you use it."*
* **Correct classification.** Suggested **C2, 95% confident** — right for missing supplementary bonding plus no RCD in a special location.
* **Side-by-side diff.** "What you wrote" against "AI version", so nothing is silently replaced. Every element has its own "Use this"; nothing is auto-applied.
* **Careful prose.** The enhanced wording says *"contrary to the requirements applicable to the special location"* rather than asserting a regulation number inline — the right instinct.
* **Plain-English client version** is separated and explicitly labelled *"For emails and reports — not the certificate."*
* **Properly grounded backend.** `enhance-eicr-observation` queries `bs7671_facets` (A4:2026) via `searchFacets`; regulation refs are taken only from facets carrying a real reg number, deduped; facets without one are skipped. An explicit comment blocks sourcing regulations from `practical_work_intelligence` after that previously produced invented job-brief "regulations".

### D12 — Wrong-special-location regulations (High)

For a **domestic bathroom**, the six returned references were:

| Cited | What that section actually covers | Apt? |
| -- | -- | -- |
| `701.411.3.3` | Rooms containing a bath or shower | yes |
| `415.1.2` | Additional protection, general | yes |
| `710.415.2` | **Medical locations** — RAG confirms "medical IT systems", "ME equipment and ME systems" | **no** |
| `702.522.21` | **Swimming pools and other basins** | **no** |
| `740.415.2` | **Fairgrounds, amusement parks, circuses** | **no** |
| `714.411.3.1` | **Outdoor lighting installations** | **no** |

Four of six are from the wrong Part 7 special location.

**Cause.** Retrieval is semantic on the observation text. "Supplementary protective equipotential bonding" appears in *every* Part 7 section, so the nearest neighbours are drawn from all of them. Nothing constrains the result to the special location actually in scope.

**Why it matters.** The primary action is **"Use these"** — plural, applying all six. An electrician who trusts it puts swimming-pool and fairground regulations on a domestic bathroom observation. A scheme assessor would spot it immediately, and it undermines the credibility of an otherwise well-built feature.

**Suggested fix.** Constrain Part 7 citations to the section implied by the premises and the observation location — 701 for a bath/shower, 702 for a pool, and so on — or drop any `7xx` reference whose section does not match the location, keeping the general Part 4 regulations. Retrieval is the right mechanism; it just needs a scope filter.

### Not yet tested

Accept-then-edit behaviour, "Rewrite", "Use everything", and whether accepted text survives a save/reload cycle.

---

## 6. Field-level audit

### Details (Step 1) — 25 fields
15 text · 6 textarea · 2 date · 1 tel · 1 email. Every field carries a label; none is orphaned.

| ID | Finding | Evidence | Severity |
| -- | -- | -- | -- |
| D13 | **Asterisked fields carry no `required`.** Client name, Client address, Installation address, Date of inspection, Extent of inspection all display `*`; all report `required: false`. Mitigated by the pre-issue gate, so this is a consistency and accessibility issue rather than a correctness one — a screen reader is not told the field is required. | DOM audit, 25/25 fields | Medium |
| D14 | **Invalid email accepted silently.** `definitely!not@an@email` is stored. The browser knows it is wrong — `validationMessage: "A part following '@' should not contain the symbol '@'."` — but there is **no `aria-invalid`, no border change (stays `rgba(255,255,255,0.15)`), and no message**. This is the address the certificate is emailed to. | Live input + computed style | High |
| D15 | **No `maxlength` on any field (0 of 25).** A 500-character client name is accepted untruncated and will reach the PDF layout. | Live input | Medium |
| D16 | `<script>alert(1)</script>` is stored verbatim in the client name. React escapes on render so there is no in-app XSS, **but this value is passed to an HTML-templated PDF generator** and that path was not tested. Worth confirming the PDF template escapes it. | Live input | Medium — needs PDF-path verification |

### Sign off (Step 4) — 18 fields

| ID | Finding | Evidence | Severity |
| -- | -- | -- | -- |
| D17 | **Expiry dates accept long-lapsed values with no warning.** Registration expiry and insurance expiry both accepted `2019-01-01`; neither has a `min` attribute and nothing flags it. An electrician with lapsed registration or insurance can print those dates on a certificate unchallenged. | Live input ×2 | High |
| D18 | **Logo upload has no accessible name** — `input#logo-upload`, `accept="image/*"`, `aria-label: null`, no associated `<label>`. | DOM audit | Low (a11y) |

### False alarms caught during this pass

Recorded because the rate matters when judging the rest of the register.

* "Section counts show 11/8, 540/8, 70/1 — impossible" — **no.** The regex was eating regulation numbers: *"Locations containing a bath or shower **701**"* + `1/8`, and *"Earthing / bonding arrangements 411.3; Chap **54**"* + `0/8`.
* "Inspector name appears twice — duplicate field" — **no.** Two distinct fields, *"Full name of the inspector"* (Inspector) and *"Your company name Ltd"* (Company details); my label-walker attributed the wrong heading.
* "Company tagline appears twice, one as a file input" — same label-walker artefact; the file input is the logo upload. The genuine issue there is D18, the missing accessible name.

---

## 7. Running total

Five findings were published during this audit and then **retracted** on verification (§0), and three more were caught before publication (§6). Any single finding here should be treated as provisional until independently re-checked. The ones with quoted evidence — **D12** (verified against `bs7671_facets`), **D14** (browser `validationMessage`), **D17** (live date entry) — are the most solid.

---

## 8. PDF fidelity — via the repo's own mapping guard

`npm run check:cert-mapping` is the right instrument for this question and is more trustworthy than DOM inspection. EICR row:

```
eicr   531 emits   8 unread   286 not printed   117 (on form)
```

### D19 — RETRACTED. The notes ARE read; the guard has a blind spot (see D20)

These are read by no formatter, so they never enter the PDFMonkey payload and no template can render them:

* `meansOfEarthingNotes`
* `mainEarthingConductorTypeNotes`
* `mainEarthingConductorSizeNotes`
* `mainBondingConductorTypeNotes`
* `mainBondingSizeNotes`
* `bondingComplianceNotes`
* `bondingConductorContinuityVerifiedNotes`
* `earthingConductorContinuityVerifiedNotes`

**This finding was wrong.** All eight are read by the formatter through a helper that builds
the key at runtime:

```ts
const note = (key: string): string => get(`${key}Notes`);   // eicrJsonFormatter.ts:921
...
means_of_earthing_note: note('meansOfEarthing'),           // -> meansOfEarthingNotes
```

There are 21 such `note(...)` calls covering every one of the eight. They reach the payload
and `pdfmonkey-eicr-template.html` references `means_of_earthing_note`. Nothing is discarded.

### D20 — `check:cert-mapping` false-positives on runtime-built keys (Medium, real)

The guard decides "read" by literal substring search (`scripts/check-cert-mapping.mjs:313`):

```js
.filter((k) => !fSrc.includes(k) && !fSrc.includes(snake(k)))
```

A field accessed as `` get(`${key}Notes`) `` never appears literally, so it is reported unread.
**All 8 EICR "unread" fields are exactly this pattern** — the count is entirely spurious.

This matters because the guard exists precisely because a schema cannot catch a dropped
field. A safety net that cries wolf gets ignored. It should resolve helper indirection, or
at minimum whitelist the `note()` pattern so the number means something.

### Guard-column caveat — do not misread "not printed"

The `not printed` count (286) and `(on form)` count (117) are **not** a list of data missing from the PDF. The column means "this exact key does not appear in the Liquid template". Renamed fields pass through correctly:

```
eicrJsonFormatter.ts:989   client_name: get('clientName')
eicrJsonFormatter.ts:1538  client_name: get('clientName')
```

So `clientName`, `inspectorName`, `inspectionDate` and the signatures all reach the PDF under snake_case names, despite being listed. **The trustworthy column is `unread` (8)** — those genuinely never enter the payload.

I nearly published "client name never prints on the EICR PDF" from this table. It would have been wrong.

### D16 — resolved, downgraded

The PDF is produced by **PDFMonkey**: `generate-eicr-pdf/index.ts` posts a JSON payload against `document_template_id`. Our code does not string-interpolate user input into HTML, so the `<script>` value stored in the client name presents no injection path on our side. Residual risk exists only if the hosted Liquid template uses a raw output filter — not inspectable from this repo. Downgraded from Medium to **Low, needs template-side confirmation**.
