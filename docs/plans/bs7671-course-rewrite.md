# BS 7671:2018+A4:2026 CPD Course — Rewrite Plan

Status: in-flight — Phase 0 prep
Owner: Andrew + Claude
Last updated: 2026-04-28

## Goal

Rewrite the existing BS 7671 upskilling course (37 sections under
`src/pages/upskilling/`) so every section is:

- Structured with the **same component palette as the Level 2 apprentice
  course** (the "gold standard" the user already validated for L2).
- **~800 words of teaching prose** per section — lean enough to consume in
  one sitting, rich enough to teach.
- **Anchored to the new regs** (BS 7671:2018+A4:2026) — every claim cites a
  specific `bs7671_regulations.reg_number`.
- **Cross-referenced against GN3 (inspector view) and the OSG (site view)**
  via the `bs7671_facets` RAG table.

## Non-goals

- No subsection layer. Structure stays Module → Section → content (37 leaf
  pages, not 150).
- Not rewriting from the 451 MB OCR'd PDF directly. Source of truth is the
  RAG (`bs7671_facets`, `bs7671_regulations`, `bs7671_tables`).
- Not changing the route map or hub pages. Just the section bodies.

## Scope

8 modules × ~5 sections each = **37 sections**.

| Module |  Sections | Topic                                           |
| ------ | --------: | ----------------------------------------------- |
| M1     |         4 | Scope, object & fundamental principles (Part 1) |
| M2     |         4 | Definitions & key terminology (Part 2)          |
| M3     |         5 | Assessment of general characteristics (Part 3)  |
| M4     |         7 | Protection for safety (Part 4)                  |
| M5     |         6 | Selection & erection of equipment (Part 5)      |
| M6     |         6 | Inspection, testing & certification (Part 6)    |
| M7     |         5 | Special installations / locations (Part 7)      |
| M8     |         3 | Reference materials & appendices                |
| M9     | mock exam | Untouched until Phase 3                         |

## RAG layer (already ingested by previous agent)

- `bs7671_editions` — 3 rows: BS 7671:2018+A4:2026, GN3 9th Ed:2022 (A4),
  OSG 9th Ed:2022 (A4). All `is_active=true`.
- `bs7671_regulations` — 1,770 reg numbers with `reg_number`, `title`,
  `part`, `chapter`, `section`, `full_text`, `page_number`. Use for the
  RegsCallout `clause` field.
- `bs7671_facets` — 46,592 facet-level chunks
  (33,406 BS 7671 / 8,111 GN3 / 5,075 OSG). Filterable by `facet_type`
  (`requirement`, `procedure`, `acceptance_criterion`, `definition`,
  `exception`, `example`, `note`, `condition`, `scope`).
- `bs7671_tables` — 410 rows (e.g. Table 41.1 disconnection times, 54.7
  CPC sizing).
- `bs7671_figures` — 506 rows.
- `bs7671_page_summaries` — 1,030 rows.
- `lesson_regulation_refs` — only **14 rows** today; we populate this as
  we write each section.

## Component palette per section (lean L2 variant)

The L2 Sub uses 14 component types. We use the same palette but compress
the copy to fit ~800 words.

|   # | Component                                        |    Per section |          Word budget |
| --: | ------------------------------------------------ | -------------: | -------------------: |
|   1 | PageHero (eyebrow + title + description + chips) |              1 |                  ~30 |
|   2 | TLDR                                             |  1 (3 bullets) |                  ~50 |
|   3 | LearningOutcomes (`initialVisibleCount={3}`)     | 1 (4 outcomes) |                  ~80 |
|   4 | ContentEyebrow                                   |              6 | ~30 (3-4 words each) |
|   5 | ConceptBlock (plainEnglish + onSite + body)      |           8–10 |                 ~350 |
|   6 | SectionRule (divider)                            |             ~6 |                    0 |
|   7 | RegsCallout (full reg text from DB)              |              2 |                  ~80 |
|   8 | InlineCheck (mid-flow)                           |              3 |                  ~80 |
|   9 | CommonMistake (whatHappens + doInstead)          |              2 |                  ~80 |
|  10 | Scenario (situation + whatToDo + whyItMatters)   |              1 |                  ~70 |
|  11 | FAQ (6 Q&A)                                      |              1 |                 ~120 |
|  12 | KeyTakeaways (4 bullets)                         |              1 |                  ~50 |
|  13 | Quiz (8 questions)                               |              1 |                 ~200 |
|  14 | Nav grid (back/next)                             |              1 |                    0 |
|     | **Approx total**                                 |                |     **~1,200 prose** |

Note: 1,200 includes quiz/explanation text. **Tutorial body alone is
~700–800 words.** This matches the brief.

## Wrapper / shell pattern (audited M1 lock-in)

```tsx
<div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
  <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
    <PageFrame>
      <button onClick={() => navigate('..')} ... >Module N</button>
      <PageHero ... />
      <TLDR ... />
      <LearningOutcomes ... />

      <ContentEyebrow>...</ContentEyebrow>
      <ConceptBlock ... />
      <ConceptBlock ... />
      <InlineCheck ... />

      <SectionRule />
      <ContentEyebrow>...</ContentEyebrow>
      <RegsCallout ... />
      <ConceptBlock ... />

      ...

      <CommonMistake ... />
      <CommonMistake ... />
      <Scenario ... />
      <FAQ ... />
      <KeyTakeaways ... />
      <Quiz ... />
    </PageFrame>
  </div>
</div>
```

## Voice / tone

Locked from M1.1 — qualified-spark CPD. Court/insurer-aware. Terse. UK
spelling. No apprentice-talk. Every claim either cites a reg or
acknowledges it's interpretation. Every "from 2026" wording uses
"15 April 2026" (A4 publication date).

## Workflow per section (pilot M4 §1 will validate this)

1. Identify anchor regs (3–8 per section). Save to `section-reg-map.json`.
2. Pull facets:
   ```sql
   SELECT primary_topic, facet_type, content
   FROM bs7671_facets
   WHERE regulation_id IN (
     SELECT id FROM bs7671_regulations WHERE reg_number = ANY($1)
   )
   AND document_type = ANY(ARRAY['bs7671','gn3','osg'])
   AND facet_type = ANY(ARRAY['requirement','procedure','acceptance_criterion','definition','example','note'])
   ORDER BY confidence_score DESC NULLS LAST
   LIMIT 40;
   ```
3. Pull RegsCallout copy:
   ```sql
   SELECT reg_number, title, full_text, page_number
   FROM bs7671_regulations
   WHERE reg_number = $1;
   ```
4. Synthesise to ~800 words around the component palette above.
5. Write `lesson_regulation_refs` rows linking the section's lesson key
   to the reg numbers it teaches.
6. ESLint + typecheck. Per-module commit.

## Phasing

### Phase 0 — Foundation (1 sitting)

- [x] Plan doc (this file)
- [ ] `docs/plans/bs7671-section-reg-map.json` — 37 sections × 3-8 anchor regs each
- [ ] Confirm voice / palette / word budget with user
- [ ] Lock pilot section = **M4 §1 (Reg 411 group)**

### Phase 1 — Pilot (1 sitting, blocking)

- [ ] Rewrite M4 §1 end-to-end at full L2 density, ~800 words prose
- [ ] User reviews and signs off pattern
- [ ] If sign-off: pattern locked, scale begins

### Phase 2 — Scale (4–6 sittings, one module per sitting)

- [ ] M1 — salvage existing prose + re-anchor reg cites + add missing components
- [ ] M2 — Definitions
- [ ] M3 — General characteristics
- [ ] M4 §2-§7 — Protection (continue from pilot)
- [ ] M5 — Selection & erection
- [ ] M6 — Inspection & testing
- [ ] M7 — Special locations
- [ ] M8 — Appendices

### Phase 3 — Validation (1 sitting)

- [ ] SQL audit: every reg cite in every section resolves to a real
      `bs7671_regulations` row
- [ ] `lesson_regulation_refs` populated for all 37 sections
- [ ] M9 mock exam regenerated against new content
- [ ] Pedagogy sweep: every section has Plain-English → Reg cite →
      InlineCheck → Scenario → Quiz rhythm

## Open questions

- Should `lesson_regulation_refs` be wired to a `course_progress` view so
  user progress shows which regs they've covered? (Defer to Phase 3.)
- Do we replace M9 mock exam questions one-for-one, or rebuild from the
  new content's KeyTakeaways? (Defer to Phase 3.)
- Quiz answer keying: keep current `correctAnswer`/`correctIndex` mixed
  pattern (M1 audit found this), or normalise on `correctIndex`? (Cosmetic
  — defer.)
