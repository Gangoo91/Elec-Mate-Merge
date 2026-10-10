# Mock exam brief — BMS course, one module's questions

You are writing **30 mock exam questions for ONE module** of the Elec-Mate BMS course (UK CPD for
qualified electricians). The main session checks every question.

## Your only source of truth
The module's own lesson pages, already written and fact-checked:
`/Users/andrewmoore/elec-mate-merge/src/pages/upskilling/BMSModule{M}Section{S}.tsx` (all sections of
your module). Read each page in chunks of at most 250 lines (`sed -n` or the Read tool with
offset/limit). Every question must be answerable from what those pages teach — **introduce no
fact, figure, standard or regulation that is not on the pages.** Do not read anything else in the
repo. No web, no SQL. **Edit nothing in the repo.**

## Output
Write ONE file: `/private/tmp/claude-501/-Users-andrewmoore/8214753f-cc20-4ff4-aeef-64a91249062e/scratchpad/bms/mock/module{M}.ts`

```ts
import type { StandardMockQuestion } from '@/types/standardMockExam';

export const bmsMockModule{M}: StandardMockQuestion[] = [
  {
    id: {M}001,            // {M}001 … {M}030 — exactly this numbering
    question: '…',
    options: ['…', '…', '…', '…'],
    correctAnswer: 2,      // index 0–3
    explanation: '…',      // why right, and why the most tempting wrong option is wrong
    section: '{M}.{S}',    // the section the question is drawn from
    difficulty: 'basic',   // 'basic' | 'intermediate' | 'advanced'
    topic: '{short topic, e.g. "Interposing relays"}',
    category: '{MODULE TITLE — exact string given in your prompt}',
  },
  /* exactly 30 */
];
```
Use single quotes for strings; escape apostrophes as `’` or use a typographic ’ (preferred).

## What good looks like
- **Spread:** every section of the module gets at least 4 questions.
- **Difficulty (exact counts):** 10 basic (recall of a key idea), 14 intermediate (apply it on
  site), 6 advanced (judgement: a scenario with two plausible actions, or a fault diagnosis).
  Label honestly — difficulty is about thinking required, not obscurity.
- **Different from the section quizzes:** the pages each end with a 10-question quiz. Do not copy
  those questions or reuse their stems; test the same ideas from a new angle, in new site
  situations.
- **One defensible answer**, three plausible wrong options a half-trained person might pick. No
  "all/none of the above", no joke options, options similar in length (the right answer must not
  be the longest), no answer given away by grammar.
- **Correct-answer positions balanced:** each of 0, 1, 2, 3 used 7 or 8 times.
- **Standalone:** a question must make sense without the page in front of you ("In the scenario
  on page 3.2…" is banned).
- UK English (analogue, earthing, lock-off), plain and precise, no exclamation marks.

## Final reply
One line: the file path and "30 questions, positions {0:a,1:b,2:c,3:d}, difficulty {basic:10,intermediate:14,advanced:6}".
