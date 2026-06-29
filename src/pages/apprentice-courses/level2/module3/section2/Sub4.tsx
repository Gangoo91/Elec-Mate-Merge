/**
 * Module 3 · Section 2 · Sub 4 — Scale conversion
 * Maps to City & Guilds 2365-02 / Unit 203 / LO2 / AC 2.4
 *   AC 2.4 — "Convert scale from drawings to actual dimensions"
 *
 * Cross-references:
 *   - Back to Sub 2 (layout drawings — the main place you'll meet scale)
 *   - Forward to §3 (cable runs / wiring decisions that depend on accurate
 *     measurement off scaled drawings)
 *
 * Reg sources cited: 514.9.2 (A4:2026 — diagrams shall comply with
 * applicable standards), Reg 132.13 (Documentation — paraphrased; see
 * 132.13.1 Diagrams and 132.13.2 Routine maintenance).
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Scale conversion | Level 2 Module 3.2.4 | Elec-Mate';
const DESCRIPTION =
  'Reading drawing scales (1:50, 1:100, 1:20, 1:200) and converting paper measurements back to actual metres for cable runs, fixings and material take-offs.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'scale-meaning-check',
    question:
      "A drawing has a scale of 1:50. What does that actually mean?",
    options: [
      "The drawing is 50% of actual size",
      '50 units on paper = 1 unit in real life',
      '1 unit on paper = 50 units in real life',
      "The drawing is 50 times bigger than real life",
    ],
    correctIndex: 2,
    explanation:
      "1:50 means 1 unit on paper = 50 units in real life. So 1 mm on paper = 50 mm real, 1 cm on paper = 50 cm real, etc. The first number is always 'paper'; the second number is always 'real'. Bigger denominator = smaller scale (you fit more onto the page).",
  },
  {
    id: 'scale-conversion-check',
    question:
      "A wall on a 1:100 floor plan measures 45 mm with a scale rule. How long is the wall in real life?",
    options: [
      '45,000 mm (45 m)',
      '4500 mm (4.5 m)',
      '450 mm (0.45 m)',
      '4.5 mm',
    ],
    correctIndex: 1,
    explanation:
      "1:100 means multiply the paper measurement by 100. 45 mm × 100 = 4500 mm = 4.5 m. (Mental check: 1:100 means '1 cm = 1 m'. The wall is 4.5 cm on paper, so 4.5 m real. Same answer, faster.)",
  },
  {
    id: 'scale-reverse-check',
    question:
      "You need to plot a 7 m cable run onto a layout drawn at 1:50. How many millimetres long should the line be on paper?",
    options: [
      '350 mm',
      '35 mm',
      '70 mm',
      '140 mm',
    ],
    correctIndex: 3,
    explanation:
      "Going from real to paper, you DIVIDE by the scale denominator. 7 m = 7000 mm. 7000 ÷ 50 = 140 mm. (Mental check: 1:50 means 1 cm paper = 0.5 m real. So 7 m real = 14 cm = 140 mm paper.)",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'A drawing has a scale of 1:20. A piece of trunking measures 12 mm on paper. How long is it in real life?',
    options: [
      '120 mm',
      '240 mm',
      '600 mm',
      '24 mm',
    ],
    correctAnswer: 1,
    explanation:
      '1:20 means multiply paper by 20. 12 × 20 = 240 mm (= 0.24 m). 1:20 is a typical detail scale — used for showing close-up sections of an assembly.',
  },
  {
    id: 2,
    question:
      "On a 1:50 layout, the distance between two sockets is drawn as 60 mm. What's the actual wall distance between them?",
    options: [
      '300 mm (0.3 m)',
      '600 mm (0.6 m)',
      '3000 mm (3 m)',
      '12,000 mm (12 m)',
    ],
    correctAnswer: 2,
    explanation:
      '60 mm × 50 = 3000 mm = 3 m. Mental check: at 1:50, 1 cm paper = 0.5 m real. 6 cm paper = 3 m real. Same answer, sanity confirmed.',
  },
  {
    id: 3,
    question:
      'A site plan has a scale of 1:1250. A new cable run from a substation to a building measures 4 mm on the drawing. How long is the run?',
    options: [
      '500 m',
      '50 m',
      '0.5 m',
      '5 m',
    ],
    correctAnswer: 3,
    explanation:
      '4 mm × 1250 = 5000 mm = 5 m. 1:1250 is a common Ordnance Survey site-plan scale — you can fit a whole site onto one A3 sheet but every millimetre on paper represents a metre and a quarter on the ground.',
  },
  {
    id: 4,
    question:
      "You need to fit a 6 m floor section onto a 1:100 detail. How long is the line on paper?",
    options: [
      '60 mm',
      '6 mm',
      '600 mm',
      '0.6 mm',
    ],
    correctAnswer: 0,
    explanation:
      'Real to paper = divide. 6 m = 6000 mm. 6000 ÷ 100 = 60 mm. At 1:100, the rule is "every metre real = 1 cm paper", which makes mental conversion trivial.',
  },
  {
    id: 5,
    question:
      "You're using a triangular scale rule on a drawing labelled 1:50. Which face of the rule do you read FROM?",
    options: [
      'Always the metric face',
      'The face marked 1:50',
      'The 1:1 face',
      'Whichever face is closest to your right hand',
    ],
    correctAnswer: 1,
    explanation:
      "Match the face to the scale of the drawing. A scale rule has multiple faces (typically 1:1, 1:5, 1:10, 1:20, 1:50, 1:100, 1:200, 1:1250, 1:2500). Use the face that matches the drawing — the rule then reads off REAL dimensions directly without you having to multiply.",
  },
  {
    id: 6,
    question:
      "A drawing's scale is shown as 1:50 in the title block. The site engineer hands you a printed-out copy and you notice the title block warns 'DO NOT SCALE FROM DRAWING — use named dimensions only'. Why?",
    options: [
      "The scale rule has been calibrated for a different paper size than the one in your hand",
      "Scaling from any drawing is forbidden by BS 7671 regardless of how it was printed",
      "The print may have been resized (photocopy reduction or 'fit-to-page'), so scale measurements are unreliable. Use the dimension lines and figures instead",
      "The title block scale always refers to the original CAD file, never the print",
    ],
    correctAnswer: 2,
    explanation:
      "Photocopying, reducing, or 'fit-to-page' printing resizes the drawing — scaling off it gives you wrong answers. Named dimensions (the small numbered lines with arrows showing actual distances) survive resizing because they're text. When in doubt, trust the named dimension over the scale.",
  },
  {
    id: 7,
    question:
      'Common scale, common purpose. Match the most common use to a 1:100 scale on a UK construction drawing.',
    options: [
      'Detailed component drawing (e.g. an inside view of a panel)',
      'Symbol legend only',
      'Whole-site overview with multiple buildings',
      'General floor plan of a single dwelling or office floor',
    ],
    correctAnswer: 3,
    explanation:
      "1:100 is the bread-and-butter floor-plan scale for whole-floor layouts (single dwelling, office floor, retail unit). 1:50 zooms in on individual rooms or important areas; 1:20 / 1:5 are detail scales; 1:200 / 1:500 / 1:1250 are site-overview / Ordnance Survey scales.",
  },
  {
    id: 8,
    question:
      'A drawing of an old industrial site uses imperial scale 1/8\" = 1\'-0\" and you need to estimate a cable run of around 50 ft. Roughly how long is that on paper?',
    options: [
      'About 6.25 inches',
      'About 12.5 inches',
      'About 25 mm',
      'About 50 mm',
    ],
    correctAnswer: 0,
    explanation:
      '1/8" = 1 ft means each foot of real distance is drawn as 1/8 of an inch. 50 ft × (1/8") = 50/8 = 6.25 inches. You\'ll meet imperial scales on older drawings (pre-1970s and US-origin); the conversion principle is identical to metric — first number is paper, second number is real.',
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "Do I need a scale rule, or can I just use a normal ruler?",
    answer:
      "Get a scale rule — they're £5-£15. With a normal ruler you have to measure paper in mm and then multiply by the scale denominator every single time. With a scale rule, you set the face to the drawing's scale (e.g. 1:50) and read REAL dimensions directly off the rule. Saves time and saves you doing arithmetic that's easy to fat-finger.",
  },
  {
    question: "What scales should I expect to see on UK construction drawings?",
    answer:
      "Common scales: 1:1 and 1:5 for component details; 1:10 and 1:20 for assembly details (board internals, cable trays); 1:50 for individual rooms and larger details; 1:100 for general floor plans; 1:200 for whole-building or whole-floor overviews on bigger jobs; 1:500 / 1:1250 / 1:2500 for site plans and Ordnance Survey extracts. Know the bread-and-butter ones (1:50 and 1:100) cold.",
  },
  {
    question: "Why does the drawing say 'do not scale from drawing'?",
    answer:
      "Because the drawing might have been resized in printing (photocopy, fit-to-page PDF print, etc), in which case the scale ratio is wrong. The named dimensions (the numbered measurement lines with arrows) are text and survive resizing. So the rule is: trust dimensions over scale unless you've verified the drawing is at full scale. On a confirmed full-scale drawing, scaling is fine.",
  },
  {
    question: "What if a drawing has both metric and imperial dimensions?",
    answer:
      "Common on refurb work in older buildings — original imperial drawings get marked up with metric dimensions over the years. Check carefully which units each dimension is in. The metric/imperial conversion: 1 inch = 25.4 mm; 1 foot = 304.8 mm; 1 metre ≈ 3.281 ft. When in doubt, ask before you cut anything.",
  },
  {
    question: "If the scale is 1:50, how does that relate to '1 cm = 0.5 m'?",
    answer:
      "Same thing, said differently. 1:50 means 1 unit paper = 50 units real. So 1 cm paper = 50 cm = 0.5 m real. Or 1 mm paper = 50 mm = 5 cm real. Or 1 m paper would be 50 m real — but you wouldn't have a 50 m wall fitting on a piece of paper at 1:50 (that'd need a 1 m piece of paper). The shortcut '1 cm = 0.5 m' for 1:50 is just easier to do in your head than 'divide by 50'.",
  },
  {
    question: "How accurate do my scale measurements need to be?",
    answer:
      "Accurate enough for the purpose. A cable run for materials estimate: ±5% is usually fine — you'd round up anyway to account for waste, terminations and a bit of slack. A position dimension for a back-box that has to align with a tile joint: take it to the nearest 5 mm and verify on site. Critical positions (panel cut-outs, equipment that has to fit in a precise space): trust the named dimensions, never the scale.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 4"
            title="Scale conversion"
            description="Drawings are scaled. The cable run isn't 30 cm on the wall — read the scale and the actual run is 15 m. Get this wrong and your materials list is a joke."
            tone="emerald"
          />

          <TLDR
            points={[
              "1:50 means 1 unit on paper = 50 units in real life. The first number is paper; the second is real.",
              "Paper to real: MULTIPLY by the scale denominator. Real to paper: DIVIDE. That's the whole maths.",
              "Common UK scales: 1:5 / 1:20 (detail), 1:50 (room layout), 1:100 (floor plan), 1:200 (whole building), 1:1250 (site plan). Know each one's typical use.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Read and interpret the scale notation on a drawing (1:50, 1:100 etc) — first number is paper, second is real.",
              'Convert a paper measurement to a real-world dimension by multiplying by the scale denominator.',
              'Convert a real-world dimension to a paper measurement by dividing by the scale denominator.',
              'Recognise the common UK construction scales (1:5, 1:20, 1:50, 1:100, 1:200, 1:500, 1:1250) and their typical purposes.',
              'Use a triangular scale rule by selecting the face that matches the drawing scale.',
              'Cross-check scaled measurements against named dimensions and apply the "do not scale from drawing" rule when prints have been resized.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What scale notation actually means</ContentEyebrow>

          <ConceptBlock
            title="1:50 — first number is paper, second is real"
            plainEnglish="1:50 means 1 unit on paper = 50 units in real life. The same maths works for any units (mm, cm, m) — just stay consistent."
            onSite="Apprentices freeze at 1:1250 because the number is big. The principle is identical to 1:50 — paper × denominator = real. Don't let the size of the number scare you."
          >
            <p>
              Every drawing scale is written as TWO numbers separated by a colon:
              <strong> paper : real</strong>. So:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1:1</strong> — 1 unit on paper = 1 unit real. Full size. (Used for tiny
                component drawings — a small pad of contacts, a connector pinout.)
              </li>
              <li>
                <strong>1:10</strong> — 1 unit on paper = 10 units real. So 1 cm paper = 10 cm
                real, or 1 mm paper = 10 mm real. (Detail scale.)
              </li>
              <li>
                <strong>1:50</strong> — 1 unit on paper = 50 units real. So 1 cm paper = 50 cm =
                0.5 m real. (Room layout scale.)
              </li>
              <li>
                <strong>1:100</strong> — 1 unit on paper = 100 units real. So 1 cm paper = 1 m
                real. (Floor plan scale — the most common.)
              </li>
              <li>
                <strong>1:200</strong> — 1 unit on paper = 200 units real. So 1 cm paper = 2 m
                real. (Whole-building overview.)
              </li>
              <li>
                <strong>1:1250</strong> — 1 unit on paper = 1250 units real. So 1 cm paper =
                12.5 m real. (Ordnance Survey site plan.)
              </li>
            </ul>
            <p>
              The bigger the second number, the smaller the drawing (you fit more onto the page).
              That's why a site plan at 1:1250 fits an entire estate onto one A3 sheet, while a
              detail at 1:5 might only fit one socket-outlet onto the same sheet.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Common UK scales — and what each is for</ContentEyebrow>

          <ConceptBlock
            title="The scales you'll meet most days"
            plainEnglish="Different scales for different purposes. Detail / layout / overview / site."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1:1, 1:5</strong> — component drawings. A connector, a back-box internal,
                a switch contact arrangement. You see these in manufacturer literature more than on
                installation drawings.
              </li>
              <li>
                <strong>1:10, 1:20</strong> — assembly details. Inside of a control panel, a cable
                tray support detail, the make-up of a junction box.
              </li>
              <li>
                <strong>1:50</strong> — individual room or specific area layouts. A bathroom plan
                with all the fittings shown in their real-world positions; a kitchen with sockets,
                FCUs, cooker outlet and lighting marked.
              </li>
              <li>
                <strong>1:100</strong> — general floor plans. The most common scale for the
                main electrical layout of a single floor of a dwelling, office or small commercial.
              </li>
              <li>
                <strong>1:200</strong> — whole-building or whole-floor overview on larger
                buildings. Used when 1:100 won't fit on a sensible paper size.
              </li>
              <li>
                <strong>1:500, 1:1000</strong> — site layouts. Position of buildings on a plot,
                external runs, sub-station locations, EV charging plot positions.
              </li>
              <li>
                <strong>1:1250, 1:2500</strong> — Ordnance Survey site plans. Used for planning
                applications, DNO submissions, site context drawings.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Doing the conversion — paper to real, real to paper</ContentEyebrow>

          <ConceptBlock
            title="The two-direction conversion (and the mental shortcuts)"
            plainEnglish="Paper to real: MULTIPLY. Real to paper: DIVIDE. Same denominator both ways."
          >
            <p>
              <strong>Paper to real</strong> (most common — you've measured something on the
              drawing and want to know how big it actually is):
            </p>
            <p className="bg-white/[0.04] border border-white/10 rounded-lg p-3 text-[13.5px]">
              <strong>real dimension = paper dimension × scale denominator</strong>
            </p>
            <p>
              Example: a wall measures 60 mm on a 1:50 drawing. Real length = 60 × 50 = 3000 mm =
              3 m.
            </p>
            <p>
              <strong>Real to paper</strong> (less common — you're plotting something onto the
              drawing or checking if a known real distance matches the drawing):
            </p>
            <p className="bg-white/[0.04] border border-white/10 rounded-lg p-3 text-[13.5px]">
              <strong>paper dimension = real dimension ÷ scale denominator</strong>
            </p>
            <p>
              Example: a 7 m cable run on a 1:50 layout would be drawn at 7000 ÷ 50 = 140 mm long
              on paper.
            </p>
            <p>
              <strong>Mental shortcuts worth memorising:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>At 1:100</strong>, 1 cm paper = 1 m real. Easiest scale to do in your head.
                A 4.5 cm wall = 4.5 m real.
              </li>
              <li>
                <strong>At 1:50</strong>, 1 cm paper = 0.5 m real (= 50 cm). A 6 cm wall = 3 m
                real. Or: 2 cm paper = 1 m real.
              </li>
              <li>
                <strong>At 1:20</strong>, 1 cm paper = 20 cm real. A 12 mm trunking section on
                paper = 240 mm real.
              </li>
              <li>
                <strong>At 1:200</strong>, 1 cm paper = 2 m real. A 23 mm corridor on paper = 4.6 m
                real.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Worked example — a domestic kitchen layout</ContentEyebrow>

          <ConceptBlock title="From drawing to materials list">
            <p>
              You've been handed a 1:50 layout of a kitchen. You measure the following with your
              scale rule (set to the 1:50 face, so the rule reads real dimensions directly):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Distance from CU to first kitchen socket back-box: <strong>4.2 m</strong></li>
              <li>Run from socket 1 to socket 2 (along skirting): <strong>1.6 m</strong></li>
              <li>Run from socket 2 to socket 3: <strong>1.4 m</strong></li>
              <li>Drop from socket 3 up to under-cupboard FCU: <strong>1.2 m</strong></li>
              <li>FCU to extractor: <strong>0.8 m</strong></li>
            </ul>
            <p>
              Total cable run for the radial: 4.2 + 1.6 + 1.4 + 1.2 + 0.8 = <strong>9.2 m</strong>.
              Add 10% for terminations, slack, drops into back-boxes and any vertical wall
              following: <strong>~10.2 m</strong>. Round up to <strong>11 m</strong> on the
              materials list to give a small safety margin.
            </p>
            <p>
              Without scale conversion you'd either have to physically measure every run on site
              (slow, can't do until the building's open) or guess. With the drawing and a scale
              rule you produce a defensible cable estimate before the first day on site.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Using a scale rule</ContentEyebrow>

          <ConceptBlock
            title="The triangular scale rule"
            plainEnglish="A scale rule has multiple faces, each labelled with a scale. Match the face to the drawing."
            onSite="On a drawing labelled 1:50, you turn the rule until you see '1:50' on a face. Read the numbers on THAT face — they're already real-world dimensions. No multiplication needed."
          >
            <p>
              A standard triangular architect's scale rule has six faces, typically:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1:1 + 1:100</li>
              <li>1:5 + 1:50</li>
              <li>1:10 + 1:200</li>
              <li>1:20 + 1:500</li>
              <li>1:1250 + 1:2500</li>
              <li>(varies by manufacturer)</li>
            </ul>
            <p>
              How to use it:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm the drawing's scale (look for the title block or the scale bar).</li>
              <li>Rotate the rule until the matching scale face is visible.</li>
              <li>
                Lay the rule on the drawing with the zero line on one end of what you're measuring.
              </li>
              <li>
                Read the number where the rule meets the other end. The number on that face is in
                REAL units (m or mm) — no multiplication needed.
              </li>
            </ul>
            <p>
              If the drawing is at a non-standard scale (e.g. 1:75), use the closest standard scale
              face and do the maths to convert. Or print/scale the drawing to a standard ratio
              first.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Imperial scales — old drawings, US-origin drawings</ContentEyebrow>

          <ConceptBlock
            title={'Imperial scale notation: 1/8" = 1\'-0"'}
            plainEnglish="Same principle, different units. Paper expressed in fractions of an inch; real expressed in feet."
          >
            <p>
              You'll mostly meet imperial scales on three types of drawing:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pre-1970s UK industrial and commercial drawings.</li>
              <li>US-origin drawings (NEC, NEMA installations).</li>
              <li>Refurb work where the original is imperial and the refurb is metric.</li>
            </ul>
            <p>
              The notation <strong>1/8&quot; = 1&apos;-0&quot;</strong> means &apos;one eighth of an inch on paper
              equals one foot in real life&apos;. So:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1/8&quot; = 1&apos;-0&quot;</strong> ≈ 1:96 metric equivalent (close to 1:100, the standard
                metric floor-plan scale).
              </li>
              <li>
                <strong>1/4&quot; = 1&apos;-0&quot;</strong> ≈ 1:48 (close to 1:50, the standard metric room layout
                scale).
              </li>
              <li>
                <strong>1/2&quot; = 1&apos;-0&quot;</strong> ≈ 1:24 (close to 1:25 / 1:20, detail scale).
              </li>
            </ul>
            <p>
              Conversion: 1 inch = 25.4 mm; 1 foot = 304.8 mm; 1 metre ≈ 3.281 ft. Keep these
              factors handy if you're working across both systems.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The 'do not scale' rule</ContentEyebrow>

          <ConceptBlock
            title="When the named dimension overrules the scale"
            plainEnglish="If a drawing has been photocopied or printed 'fit-to-page', the scale ratio is wrong. Trust the named dimensions, not the scale rule."
            onSite="If you ever see 'DO NOT SCALE FROM DRAWING' in the title block, it's not the designer being awkward — it's because they know the print probably isn't full scale."
          >
            <p>
              Modern drawings are issued as PDFs and almost always at the wrong scale by the time
              they're printed. Common reasons:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>'Fit to page' selected in the print dialog.</li>
              <li>Photocopy reduction (A1 → A3).</li>
              <li>Mobile / tablet zoom (the drawing on screen is rarely at true scale).</li>
              <li>The original drawing is at a non-standard scale and gets resized to fit standard paper.</li>
            </ul>
            <p>
              The defence is named dimensions — the small text annotations (with arrows pointing to
              the start and end of the measurement) showing the actual distance between two points.
              Named dimensions are TEXT, so they survive printing at any scale. If a wall is
              labelled '4250' and you measure 50 mm with your scale rule on a 1:100 drawing, trust
              the 4250.
            </p>
            <p>
              Sanity check: when measurements off the scale rule consistently disagree with the
              named dimensions, the print isn't full scale — flag it and use the dimensions only.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Regulation 514.9.2 (new in A4:2026) — applied to scale"
            clause="514.9.2 — All diagrams, charts, and information or instruction notices used in electrical installations shall comply with the applicable standards specified."
            meaning={
              <>
                The applicable standards for construction drawings include the use of recognised
                metric scales (BS EN ISO 5455 covers scales for technical drawings — typically the
                1:1, 1:2, 1:5, 1:10, 1:20, 1:50, 1:100, 1:200 series). Drawings produced with
                non-standard scales, or without a clear scale bar, don't help anyone read the
                install reliably and can be flagged as non-compliant. The corollary on site:
                always confirm the scale before measuring.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 5, Section 514.9.2 (paraphrased)"
          />

          <RegsCallout
            source="BS 7671 — Regulation 132.13 (Documentation)"
            clause="132.13 — Documentation for the electrical installation shall be provided so that users, operators and persons subsequently working on the installation can identify circuits, isolation points, protective devices, the means of compliance with the regulations and any specific risks. Sub-clauses cover 132.13.1 (Diagrams) and 132.13.2 (Routine maintenance)."
            meaning={
              <>
                Drawings have to be legible — a measurement that can't be read is information that
                hasn't been provided. A drawing scaled too small to make out, or printed without a
                scale bar / named dimensions, doesn't satisfy 132.13 because the next electrician
                can't identify cable runs, equipment positions or the means of compliance. Scale
                conversion isn't just a maths skill — it's how you USE drawings to discharge the
                132.13 documentation duty.
              </>
            }
            cite="Paraphrased — see BS 7671:2018+A4:2026 Regulation 132.13.1 (Diagrams) and 132.13.2 (Routine maintenance)."
          />

          <RegsCallout
            source="BS 7671 — Regulation 514.1.1 (identification of switchgear and labelling)"
            clause="514.1.1 — Except where there is no possibility of confusion, a label or other suitable means of identification shall be provided to indicate the purpose of each item of switchgear and controlgear."
            meaning={
              <>
                Where 514.1.1 bites for scale: the label on a board or accessory often references
                positions and dimensions taken off the layout drawing ('Cct 6 — Cooker outlet,
                450 mm AFFL, kitchen wall'). If the apprentice has scaled the drawing wrong and
                the label says 450 mm but the actual position is 600 mm, the label and the install
                disagree — and 514.1.1 requires labels that can be relied on. Accurate scale
                conversion feeds into accurate labelling.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 5, Section 514.1.1 (paraphrased)"
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Reading the scale from the title block wrong (or not at all)"
            whatHappens={
              <>
                You glance at a drawing, assume it's the usual 1:100 because that's what most floor
                plans are, and start scaling. The drawing is actually at 1:50. Every measurement
                you take is half what it should be. You end up cutting back-box positions in
                completely the wrong place, or ordering 30 m of cable when the actual run needs
                60 m.
              </>
            }
            doInstead={
              <>
                Make 'check the title block' the first thing you do on every new drawing. The
                scale is normally in the bottom-right title block alongside drawing number,
                revision, project name and date. If the scale isn't shown explicitly, look for a
                printed scale BAR on the drawing. If there's neither, the drawing is unreliable
                for scaling and you can only trust named dimensions.
              </>
            }
          />

          <CommonMistake
            title="Confusing 1:100 with 100:1 (or any other inversion)"
            whatHappens={
              <>
                You see '1:100' and brain interprets it as '100 paper units = 1 real unit' instead
                of the other way round. Your measurements come out 10,000× too big or too small.
                Comedy if you spot it; disaster if you don't.
              </>
            }
            doInstead={
              <>
                The first number is ALWAYS paper. The second number is ALWAYS real. 1:100 = 'one
                paper, one hundred real'. If you ever feel uncertain, sanity-check on a known
                feature: a typical room is 3-5 m wide. If your scale conversion gives a 30 cm
                room, you've got it inverted. If it gives a 30 m room, you've got it inverted the
                other way.
              </>
            }
          />

          <Scenario
            title="The materials list that ordered five times too much cable"
            situation={
              <>
                You're a year-one apprentice asked to put together the cable take-off for a new
                garage circuit. You glance at the drawing, measure the run from CU to garage
                consumer unit — 65 mm on paper — and write '65 m of 6 mm² T&E' on the materials
                list, treating the paper-millimetres as if they were real-metres. Job day
                arrives, the merchant delivers a full 65 m drum, and within an hour your
                supervisor is asking why you've ordered five times more cable than the run
                needs.
              </>
            }
            whatToDo={
              <>
                Stop, redo the maths properly. Check the title block — scale is 1:200 (whole-site
                plan). 65 mm on paper × 200 = 13,000 mm = 13 m of real cable run. Add drops,
                terminations and a 10% margin → you only needed about 16 m, not 65 m. Confess
                the mistake to the supervisor immediately, return the unused drum to the
                merchant if possible, and from now on confirm the scale before touching the
                rule.
              </>
            }
            whyItMatters={
              <>
                Materials waste costs money and ties up working capital — a 65 m drum of 6 mm²
                T&E isn't cheap. Going the other way is even worse: under-order and the run
                can't be completed in one piece, joints get added that shouldn't have been
                there, fault loop impedance goes up, the install becomes technically inferior to
                what was specified. Get the scale conversion right at the planning stage and the
                rest of the job runs smoothly.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              '1:50 means 1 unit on paper = 50 units in real life. First number = paper, second number = real. Always.',
              'Paper to real: MULTIPLY by the scale denominator. Real to paper: DIVIDE by the scale denominator.',
              "Common UK scales: 1:5 / 1:20 (detail), 1:50 (room), 1:100 (floor plan — the most common), 1:200 (whole building), 1:1250 (site plan).",
              'A scale rule has multiple faces — pick the face that matches the drawing scale and read REAL dimensions directly off the rule.',
              "'Do not scale from drawing' = the print may have been resized. Use the named dimensions (text, survives resizing) over the scale rule.",
              "First job on every new drawing: confirm the scale in the title block. Don't assume.",
            ]}
          />

          <Quiz title="Scale conversion — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section2/2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BS EN 60617 drawing symbols
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section2/2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 Reading a real drawing pack end-to-end
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
