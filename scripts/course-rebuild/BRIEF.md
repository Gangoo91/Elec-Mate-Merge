# Writer brief — BMS course lesson pages (Elec-Mate Study Centre)

You are drafting ONE lesson page of a UK CPD course, "Building management systems", for
qualified UK electricians. A senior controls engineer teaching a good electrician: practical,
specific, plain English, UK practice, no hype, no filler, no marketing tone. The main session
reviews every page and checks every fact; your job is a page that needs no rescue.

## Hard rules
1. **Write only to** `scratchpad/bms/drafts/BMSModule{M}Section{S}.tsx` and
   `scratchpad/bms/drafts/BMSModule{M}Section{S}.notes.md`
   (full dir: /private/tmp/claude-501/-Users-andrewmoore/8214753f-cc20-4ff4-aeef-64a91249062e/scratchpad/bms/drafts/).
   **Never edit anything under /Users/andrewmoore/elec-mate-merge.**
2. You MAY read (and nothing else):
   - this brief, `scratchpad/bms/SYLLABUS.md` (your section's scope + GROUNDED FACTS + BANNED),
     `scratchpad/bms/APIS_learning.md` (exact component props)
   - the exemplar page `/Users/andrewmoore/elec-mate-merge/src/pages/upskilling/InstrumentationModule1Section1.tsx`
     (structure and voice only — ignore its subject, and its bottom nav: you use PrevNext)
   - the OLD page you are replacing, `/Users/andrewmoore/elec-mate-merge/src/pages/upskilling/BMSModule{M}Section{S}.tsx`,
     for scope ONLY. Its facts are untrusted: the audit found invented percentages, a withdrawn
     standard taught as current, and wrong protocol figures.
   - source extracts in `scratchpad/bms/src/*.txt` — ONLY via `grep -n -i` (with `-C 3` etc.)
     and `sed -n 'A,Bp'` for at most 150 lines per call. Never cat or read a whole source file.
   No PDFs, no SQL, no web.
3. **Every number, standard, regulation and legal duty** must come from (a) GROUNDED FACTS in
   SYLLABUS.md or (b) a source line you grepped — record which in the notes file. If you cannot
   source it, leave it out. No statistics, savings percentages or £ figures unless printed in a
   source with that meaning. Scenarios use realistic site detail but no statistics.
4. **Our voice, never theirs.** Use sources to decide WHAT to teach; write every sentence
   yourself. Never copy nine or more consecutive words from a source (a script checks this).
   Never name the source documents, their publishers or authors (no BCIA, REHVA, Danfoss,
   Kuphaldt, NPSA, NCSC, Echelon, NHS HTM, DALI Alliance guide titles…). You MAY name:
   BS 7671 and its regulation numbers, the On-Site Guide, GN3, Approved Document L, standards
   by number where the SYLLABUS names them (BS EN ISO 16484, BS EN ISO 52120-1), and protocols
   (BACnet, Modbus, KNX, LonWorks, M-Bus, DALI).
5. UK English (analogue, fibre, colour, programme for a schedule, metre, organise). All text
   white — never `text-white/70` or grey. No translucent yellow backgrounds. No emoji.
   No exclamation marks. Sentence case headings.

## Page shape (copy this skeleton; fill it)
```tsx
/**
 * BMS Module {M} · Section {S} — {Title}
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. {one paragraph: what the page teaches and
 * what changed from the old page}.
 */
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PrevNext } from '@/components/study-centre/course-kit';
import {
  TLDR, ConceptBlock, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes,
  ContentEyebrow, SectionRule, Pullquote, RegsCallout, VideoCard,
} from '@/components/study-centre/learning';   // import only what you use
import { videos } from '@/data/study-centre/video-library';   // only if you use a video
import useSEO from '@/hooks/useSEO';

const TITLE = '{Title} | BMS Module {M}.{S} | Elec-Mate';
const DESCRIPTION = '{150–160 chars, plain, specific}';

const outcomes = [ /* five or six strings: what the learner can do after this page */ ];

const quizQuestions = [
  {
    id: 1,
    question: '…',
    options: ['…', '…', '…', '…'],
    correctIndex: 2,
    explanation: '…why the right answer is right AND why the tempting wrong one is wrong…',
  },
  /* exactly 10 questions */
];

const BMSModule{M}Section{S} = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module {M} · Section {S}"
        title="{Title}"
        backTo="/study-centre/upskilling/bms-module-{M}"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">{one-line page intro}</p>
        <TLDR points={[ /* 4–5 strings */ ]} />
        <LearningOutcomes outcomes={outcomes} />
        {/* 5–8 blocks of: <SectionRule /> <ContentEyebrow>…</ContentEyebrow> <ConceptBlock …> */}
        {/* InlineChecks between concepts; Scenario / CommonMistake where they earn it */}
        <FAQ items={[ /* 3–5 { question, answer } */ ]} />
        <KeyTakeaways points={[ /* 5–7 strings */ ]} />
        <Quiz questions={quizQuestions} title="Check yourself — BMS {M}.{S}" />
        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-{M}-section-{S-1}"   // or the module page for S=1
          prevLabel="{title of previous section, or 'Module {M}'}"
          nextHref="/study-centre/upskilling/bms-module-{M}-section-{S+1}"   // or the next module page after the last section
          nextLabel="{title of next section}"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule{M}Section{S};
```
Section titles for prev/next labels are in SYLLABUS.md.

## Composition targets (the gate script enforces the minimums)
- 750–1000 lines. 5–8 `ConceptBlock`s, each with real teaching prose in `<p>` children and,
  where useful, `plainEnglish` and `onSite` asides.
- At least 3 `InlineCheck`s: `id="bms-{M}-{S}-{slug}"`, `question`, `options` (4 strings),
  `correctIndex`, `explanation`. Never `answer=`.
- At least one `Scenario` (props: title, situation, whatToDo, whyItMatters) and/or
  `CommonMistake` (props: title, whatHappens, doInstead). Use exact prop names from APIS.
- `RegsCallout` ONLY for BS 7671 / Approved Document L points in GROUNDED FACTS
  (props: source, clause, meaning, cite).
- Videos: use the ones SYLLABUS assigns to your section, as
  `<VideoCard {...videos.KEY} topic="Watch · {why to watch}" caption="{what to look for, tied to this page}" />`
  Keys: see VIDEO KEYS below. Do not invent keys or URLs.
- Quiz: exactly 10 questions, 4 options each, one defensible answer, correct answers spread
  across positions (each of 0,1,2,3 used two or three times). Options similar in length — the
  right answer must not be the longest. Questions test understanding and judgement on site,
  not trivia, and must be answerable from THIS page. No "all/none of the above".
- FAQ 3–5 real questions an electrician would ask. KeyTakeaways 5–7.

## VIDEO KEYS (videos.KEY)
Only videos already in the 515-video library (`src/data/apprentice/curatedVideos.ts`) may be used —
never add new ones (Andrew, 10 Oct 2026). The main session prepares the keys; if none fits, no video.
bmsHvacControls, bmsHeatingSystem, bmsThermalComfort, bmsDataCentreCooling, bmsSupermarketHvac,
bmsRelays, bmsTemperatureSensors, bmsThermistors, bmsRtd, bmsPressureSwitches, bmsPicv,
bmsSolenoidValves, bmsPlcBasics, bmsAhu, bmsChillerAhu, bmsFcu, bmsPumps,
bmsTemperatureControl, bmsDeadband, bmsVav, bmsTimeControl, bmsVsd, bmsMultispeedPumps,
bmsChillerControls, bmsTimeDelayRelays, bmsIot, bmsChilledWaterSchematics, bmsOnOffControl.

Key → YouTube ID (SYLLABUS names videos by ID or key; use the KEY in code):
- bmsHvacControls = uXG1y2bOufo
- bmsHeatingSystem = lDeuIQ4VeWk
- bmsThermalComfort = yEWT_XmqCtQ
- bmsDataCentreCooling = vZkA0z9JRgw
- bmsSupermarketHvac = xwvkojKiLJM
- bmsRelays = n594CkrP6xE
- bmsTemperatureSensors = w3Hfj2kMrGo
- bmsThermistors = SaQBD0NMT04
- bmsRtd = blnnAEmVXp0
- bmsPressureSwitches = YG81w0HFXNc
- bmsPicv = nAM5xU_KfzU
- bmsSolenoidValves = -MLGr1_Fw0c
- bmsPlcBasics = uOtdWHMKhnw
- bmsAhu = KCiv8IAUkh8
- bmsChillerAhu = 1cvFlBLo4u0
- bmsFcu = MqM-U8bftCI
- bmsPumps = onIMNox24NI
- bmsTemperatureControl = i2x5rOzatbU
- bmsDeadband = ukjXJp0Joyg
- bmsVav = vw-bAbjPTd8
- bmsTimeControl = J9U_WvmYtCY
- bmsVsd = yEPe7RDtkgo
- bmsMultispeedPumps = GTQkPOgqt_M
- bmsChillerControls = OghkQFVKmPQ
- bmsTimeDelayRelays = RwSga-zQy0I
- bmsIot = 8c35zeEv2Aw
- bmsChilledWaterSchematics = ak51DHAiuWo
- bmsOnOffControl = _f-zNQKFMAA

## The notes file (required) — `BMSModule{M}Section{S}.notes.md`
1. **Sources used:** for every number/standard/regulation/legal duty on the page, the source
   file and line (or "GROUNDED FACTS").
2. **Uncertainty list:** anything you were not sure of, and anything from the old page you
   dropped because it looked invented or wrong (quote it briefly with why).
3. **Confirmations**, each on its own line:
   - "I named no source document, publisher or author."
   - "Every number on the page is sourced in section 1."
   - "I wrote to scratchpad only and edited nothing in the repo."

## Your final reply
Two lines: the two file paths, and the line count of the .tsx. Nothing else.
