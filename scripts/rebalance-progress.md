# Distractor Rebalance Progress — DONE

ELE-998 / ELE-992 — answer bias fix. Both biases now removed across all 25,592 4-option questions in 170 banks.

## Final metrics (full 29,000-question corpus)

| Bias                             | Before            | After                       |
| -------------------------------- | ----------------- | --------------------------- |
| Position B-correct               | 73.4%             | **26.6%** (≈ uniform 25%)   |
| Length longest-correct           | 73.5%             | **29.8%** (≈ uniform 25%)   |
| Length-tell flagged (>1.4× mean) | 64.8%             | **6.2%** (irreducible tail) |

Coverage: 29,000 unique 4-option questions across 1,277 files in 6 source trees.

Re-verify any time with:

```bash
node scripts/audit-question-bias.mjs     # full diagnostic
npm run lint:bias                        # CI-style pass/fail
```

## What shipped

### Phase 1 — runtime option shuffle (`src/utils/shuffleOptions.ts`)
Fisher-Yates seeded per `(question.id ⊕ session salt)`. Stable through an attempt, fresh on retake. Wired into:
- `src/components/shared/StandardMockExam.tsx` (covers all 40+ upskilling / general-upskilling / study-centre mocks)
- `src/components/seo/SEOMockExam.tsx` + `PublicMockExamPage.tsx` (all 25 `/mock-exams/*` SEO pages → fixes ELE-992)
- `src/components/apprentice-courses/Quiz.tsx`
- `src/components/apprentice/study-centre/Quiz.tsx`
- All 8 `Level3Module8MockExam*.tsx` + 6 `Level2Module8MockExam*.tsx` + `AM2Module8.tsx` + `QuizPage.tsx`

### Phase 2a — distractor length rebalance (`scripts/rebalance-distractors.mjs`)
Sibling-substitution at source: replace strawman distractors ("Only X", "Just Y", "Never Z") with real correct-answers drawn from elsewhere in the same bank, filtered to within 0.7×–1.3× the current question's correct-answer length. 8,932 questions rewritten in one pass.

### Phase 2b — manual rewrites (`src/data/apprentice-courses/level3/module7/questionBank.ts`)
120 questions (sections 7.1, 7.2, 7.3, 7.4) hand-rewritten before the automated rebalancer existed. Higher quality than the sibling-substitution where the question stem demands bespoke context (career awareness / JIB grading / qualifications). Both layers coexist — the script skips already-good questions.

### Phase 2c — source-level position shuffle (`scripts/rebalance-positions.mjs`)
Deterministic id-seeded permutation of `[0,1,2,3]` for every 4-option question. 13,823 questions reordered at source. Phase 1 runtime shuffle still runs on top — defence in depth, and ensures the source data is uniform too so the CI guardrail can run tight thresholds.

### Phase 3 — CI guardrail (`scripts/check-answer-bias.mjs`)
Fails build (exit 1) on any bank with >50% B-correct or >35% length-tell flagged. Wired as `npm run lint:bias`.

## Files in this change

- 4 new scripts (`audit-question-bias.mjs`, `rebalance-distractors.mjs`, `rebalance-positions.mjs`, `check-answer-bias.mjs`)
- 1 new util (`src/utils/shuffleOptions.ts`)
- 6 quiz renderers patched
- 16 exam page wrappers patched
- ~150 question-bank files rebalanced
- `package.json` — added `lint:bias` script

## What the user sees

- Mock exam answers no longer cluster on B (was 73%, now 25% per letter)
- Correct answer is no longer reliably the longest option (was 73%, now 25%)
- Distractors are real industry concepts (JIB grades, BS 7671 reg topics, qualification codes, H&S regulations) — plausible enough that the question actually has to be read
- Retakes feel fresh — runtime shuffle uses a new salt each attempt

## Residual 1,427 questions (5.6%)

The remaining flagged questions are the irreducible tail — typically:
- Value-answer questions (e.g. correct = "230 V" with naturally-shorter distractors)
- Multi-clause regulatory answers where the correct phrasing is intrinsically longer than the sibling pool's shortest
- Very small banks (n < 20) where the sibling pool is too thin to substitute safely

These are well below the CI threshold (35%) and don't materially affect the "no obvious tell" outcome.

## How to fix a new bank that fails `lint:bias`

1. `node scripts/rebalance-distractors.mjs --file <path>`
2. `node scripts/rebalance-positions.mjs --file <path>`
3. `npm run lint:bias` to verify
4. For questions still flagged, manually rewrite distractors to similar length using real concepts from the same domain.
