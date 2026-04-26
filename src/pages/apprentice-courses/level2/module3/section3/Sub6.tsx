/**
 * Module 3 · Section 3 · Sub 6 — Spacing factor of enclosures
 * City & Guilds 2365-02 → Unit 203 → LO3 → AC 3.6
 *   AC 3.6 — "Calculate spacing factor of wiring enclosures"
 *
 * OSG Appendix H — conduit and trunking fill. Cable factors, enclosure
 * factors, the 45% maximum-fill rule, two worked examples (one trunking,
 * one conduit). Cross-refs back to Sub3 (grouping derate Cg follows
 * directly from packing more cables together).
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

const TITLE =
  'Spacing factor of wiring enclosures | Level 2 Module 3.3.6 (AC 3.6) | Elec-Mate';
const DESCRIPTION =
  'OSG Appendix H — calculating conduit and trunking fill so cables fit, can be drawn through, and don’t overheat. Worked examples for both trunking and conduit.';

const checks = [
  {
    id: 'fill-percent-check',
    question:
      'The maximum recommended fill factor for trunking under OSG Appendix H is:',
    options: ['25%', '35%', '45%', '60%'],
    correctIndex: 2,
    explanation:
      'OSG Appendix H sets a 45% maximum fill for trunking — leaves enough free space to allow cables to lie naturally, dissipate heat and be added to in future. Cramming above 45% breaches OSG guidance and likely breaches BS 7671 grouping derate assumptions.',
  },
  {
    id: 'why-fill-matters-check',
    question:
      'Cramming more cables into a trunking than the OSG fill factor allows causes:',
    options: [
      'Faster cable pulling',
      'No problem at all',
      'Increased heat retention (Cg derate worsens), inability to draw new cables in later, and possible non-compliance with 433.1.1',
      'Improved EMI shielding',
    ],
    correctIndex: 2,
    explanation:
      'Three problems. (1) Bunched cables can’t shed heat, so the Cg grouping factor in Sub3 plummets — your existing cables are now under-rated. (2) No room to draw additional cables in later. (3) The original CCC sizing was done assuming a specific Cg — if you bust that, the cables are non-compliant with 433.1.1.',
  },
  {
    id: 'cable-factor-check',
    question:
      'A "cable factor" in OSG Appendix H is best described as:',
    options: [
      'The cable’s resistance per metre',
      'A unitless number representing the cross-sectional area the cable takes up in the enclosure (including air space allowance)',
      'The cable’s current rating',
      'The number of cores in the cable',
    ],
    correctIndex: 1,
    explanation:
      'Cable factor is a tabulated unitless number reflecting the effective cross-sectional area the cable occupies inside the enclosure (cable + reasonable air space). You add up cable factors for all cables in the enclosure and compare against the enclosure’s own factor.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'OSG Appendix H gives the recommended maximum fill factor for trunking as:',
    options: ['25%', '40%', '45%', '60%'],
    correctAnswer: 2,
    explanation:
      'The 45% limit is the headline OSG figure for trunking. Conduit similarly limited (typically 40% straight runs, less with bends — Appendix H tabulates exact factors).',
  },
  {
    id: 2,
    question:
      'You add up the cable factors for every cable in a trunking and compare them to:',
    options: [
      'The trunking’s mass per metre',
      'The trunking factor (a tabulated number for each trunking size in OSG Appendix H Table 5C/5D)',
      'The cable’s Iz value',
      'The protective device rating',
    ],
    correctAnswer: 1,
    explanation:
      'OSG Appendix H Table 5C gives cable factors per CSA; Table 5D gives trunking factors per trunking size. Sum of cable factors must be ≤ trunking factor for a compliant install.',
  },
  {
    id: 3,
    question:
      'A trunking is filled to 45% with the existing cables. You want to add three more circuits. The OSG view is:',
    options: [
      'Crack on — 45% is just a guideline',
      'You’re at the OSG limit. Adding more cables breaches the fill factor and likely the cable grouping (Cg) derate too — you need bigger trunking or a separate run',
      'Add a cooling fan to the trunking',
      'Use thinner cables only',
    ],
    correctAnswer: 1,
    explanation:
      'At 45% you have zero headroom. Three new circuits push you over the OSG limit AND change the Cg grouping factor for every existing cable. Every cable in the trunking would need re-derating against the new total — likely showing existing cables now non-compliant. Bigger trunking or a separate route is the answer.',
  },
  {
    id: 4,
    question:
      'You have 50 × 2.5 mm² stranded singles (cable factor 11.4 each) plus 30 × 4 mm² stranded singles (cable factor 15.2 each). Total cable factor sum:',
    options: ['650', '760', '912', '1026'],
    correctAnswer: 3,
    explanation:
      '50 × 11.4 = 570 + 30 × 15.2 = 456 → total 1026. Compare against the trunking factor (e.g. 50×50 trunking ≈ 1037 → just fits with 11 units of headroom).',
  },
  {
    id: 5,
    question:
      'A 50×50 mm trunking has an OSG factor of approximately 1037. The cable-factor sum from Q4 is 1026. The compliance verdict is:',
    options: [
      'Massively over capacity',
      'Just fits — but with virtually no headroom for additional cables or future modification',
      'Doesn’t fit',
      'Need to recalculate',
    ],
    correctAnswer: 1,
    explanation:
      '1026 ≤ 1037 so the install is compliant on fill — but only just. Sensible design leaves 25–40% headroom for future additions; this design has 1%. Probably worth specifying 75×50 or 75×75 trunking if more cables are likely.',
  },
  {
    id: 6,
    question:
      'Conduit fill rules differ from trunking because:',
    options: [
      'Conduit isn’t covered by OSG',
      'Conduit fill depends on the run length and number of bends — OSG tabulates different factors for straight short runs vs longer runs with bends',
      'Conduit has no fill limit',
      'Cables in conduit don’t need derating',
    ],
    correctAnswer: 1,
    explanation:
      'Conduit factors in OSG Appendix H are split — short straight runs (under 3 m) have higher allowed fill; longer runs and runs with bends use lower factors because the cables need extra clearance to be drawn through. The OSG tables (5A, 5B) differentiate by length and bends.',
  },
  {
    id: 7,
    question:
      'You install a conduit run with 5 × 2.5 mm² stranded singles (cable factor 30 each in the long-run/with-bends OSG table). Total cable factor:',
    options: ['100', '125', '150', '180'],
    correctAnswer: 2,
    explanation:
      '5 × 30 = 150. Compare against the conduit factor for the chosen size, run length and bend count. A 20 mm conduit, 4 m run with one bend has a factor of approximately 264 → 150 ≤ 264, fits with margin.',
  },
  {
    id: 8,
    question:
      'You break the OSG fill factor by 20%. The most likely consequences are:',
    options: [
      'No real-world effect',
      'Cables can’t shed heat properly (Cg derate worsens), pulling new cables becomes very difficult, and the original CCC calculation may now be non-compliant with 433.1.1',
      'Improved earth continuity',
      'Faster installation',
    ],
    correctAnswer: 1,
    explanation:
      'Three real consequences linked to the fill rule. Heat retention is the biggest — Cg in Sub3 was set assuming a specific cable count; bust the count and your Iz drops below In and 433.1.1 fails. Plus you’ve made future modification much harder.',
  },
];

const faqs = [
  {
    question: "Why is 45% the magic number for trunking?",
    answer:
      "It’s the figure that empirical testing settled on as a balance between cramming cables in (saving on trunking cost) and leaving enough air space that cables can lie naturally, shed heat and be drawn / re-drawn. Above 45% the cables start touching everywhere, heat builds, and adding more becomes impossible without removing some. OSG Appendix H is the codified version of decades of installer experience.",
  },
  {
    question: "Are cable factors and trunking factors in BS 7671 itself?",
    answer:
      "BS 7671 doesn’t tabulate them directly — it requires installations to be designed so cables aren’t damaged, can dissipate heat properly, and don’t exceed their CCC under the install conditions. The OSG (On-Site Guide) gives the practical numerical method via Appendix H. Some installers use IEE Guidance Note 1 or manufacturer trunking data, which give the same answers in slightly different formats.",
  },
  {
    question: "What about cable factors for T&E or multicore — they’re not in the singles table?",
    answer:
      "OSG Appendix H is primarily for non-sheathed singles in conduit and trunking — that’s where fill calc matters most. For T&E and multicore in containment, the calculation is rarer (the cables typically clip-direct or run loose). When you do need to put T&E into trunking (commercial domestic), use the cable’s overall diameter and treat it as a circle, with a 45% fill cap on the trunking’s internal area.",
  },
  {
    question: "Does the OSG factor account for cable-grouping (Cg) derating in Sub3?",
    answer:
      "No — they’re separate calcs. Fill factor is purely about whether the cables physically fit AND can be drawn through. Cg derate is about heat. You have to do BOTH calcs. A trunking can be fill-compliant but still force a worse Cg, requiring bigger CSA. In practice, fill calc and Cg calc tend to push the same direction (more cables → bigger trunking AND bigger CSA).",
  },
  {
    question: "Can I use my own judgement instead of the OSG table?",
    answer:
      "On simple jobs (small conduit, few cables) experienced installers often eyeball it and they’re right 99% of the time. On any meaningful commercial install — sub-mains, multi-circuit trunking, anything you’re going to certify — do the calc and document it. The OSG factor is what an inspector or client engineer will check against. Eyeballing isn’t evidence.",
  },
  {
    question: "What if my trunking has multiple compartments — do I calculate each separately?",
    answer:
      "Yes — each compartment is treated as a separate enclosure. Sum the cable factors for that compartment only, compare against that compartment’s factor. This is also why segregated multi-compartment trunking is so useful for the data / mains separation rule from Sub2 — Band I in one compartment with its own fill calc, Band II in another compartment with its own.",
  },
];

export default function Sub6() {
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 6"
            title="Spacing factor of wiring enclosures"
            description="Conduit and trunking aren’t infinite. There’s a maths rule for how many cables fit. Cram extra in and you’re heating the cable, can’t pull new ones through, and you’ve broken the OSG (and quietly busted Sub3’s grouping derate too)."
            tone="emerald"
          />

          <TLDR
            points={[
              'OSG Appendix H — sum cable factors, compare against trunking / conduit factor. Stay below 45% fill for trunking.',
              'Each cable size has a tabulated factor (Table 5C). Each trunking / conduit size has its own factor (Tables 5A / 5B / 5D).',
              'Fill calc and Cg derate (Sub3) are separate but linked — over-fill the enclosure and you break BOTH the fill rule AND the original CCC sizing assumption.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why conduit and trunking have a maximum fill factor and what happens when it’s breached.',
              'Identify cable factor and trunking factor in OSG Appendix H Tables 5A through 5D.',
              'Calculate the total cable factor for a planned cable installation in trunking.',
              'Compare the calculated cable-factor sum against the trunking factor for the chosen trunking size.',
              'Calculate conduit fill, including the long-run / bends adjustment in OSG Appendix H.',
              'Connect the fill calculation back to the Cg grouping derating rules in Sub3 — adding cables affects both.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why fill matters — three reasons</ContentEyebrow>

          <ConceptBlock
            title="Cables packed too tightly: heat, pull-ability, future modification"
            plainEnglish="Cables in containment need air space around them — to lose heat, to be drawn through during install, and to leave room for the inevitable future additions. Strip out the air space and three problems arrive at once."
            onSite="The OSG fill rule is the codified version of ‘leave reasonable space’. The 45% limit is what testing showed lets cables shed heat and be drawn comfortably. Cram above 45% and someone will pay the price — usually you, on a callback in two years."
          >
            <p>The three real-world consequences:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heat retention</strong> — bunched cables can’t shed heat to surrounding
                air. Each cable’s effective Iz drops. The Sub3 grouping factor Cg was calculated
                for a specific cable count; over-fill changes that count and busts the original
                CCC sizing.
              </li>
              <li>
                <strong>Can’t pull new cables</strong> — even rod-and-draw can’t force a new
                cable through a near-full conduit. The next install team has to either remove
                cables or run a new container alongside.
              </li>
              <li>
                <strong>Compliance failure</strong> — the original install’s 433.1.1 calc was
                done assuming a specific Cg. If the trunking’s now over-stuffed, every cable
                in it has to be re-derated against the actual cable count. Often shows
                existing cables non-compliant.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why fill matters — heat plus futureproofing"
            plainEnglish="Two consequences of over-fill that show up months or years after the install. Heat ages the insulation slowly. Cramped trunking forces the next install team to do a full re-pull instead of a cheap addition."
            onSite="A trunking specced at 80% fill on day one might still be technically compliant. But there’s no headroom. The first time the customer asks for a small extension, you’re back to square one — re-pull the lot or run a parallel route. The defensive design choice: spec the next size up where future additions are even slightly likely. Trunking is cheap; re-pulls are not."
          >
            <p>
              The heat angle: PVC insulation is rated for a maximum continuous conductor
              temperature of 70°C. Stay under that and the insulation lasts decades. Cross it
              even by a few degrees and the PVC ages noticeably faster — measurable in years off
              the cable’s service life. Over-filled trunking is the most common cause of that
              kind of slow aging because the symptoms (cracking, embrittlement) don’t show up
              for years.
            </p>
            <p>
              The futureproofing angle: the difference between specifying 50×50 trunking and
              75×50 trunking on a 30 m corridor run is maybe £40 of materials. The difference
              between adding three new circuits to under-filled trunking versus over-filled
              trunking is a full day on site, two electricians, and a re-test. If there’s any
              realistic chance the install will grow, size up at design.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>The headline numbers</ContentEyebrow>

          <ConceptBlock
            title="OSG Appendix H — Tables 5A through 5D"
            plainEnglish="The whole calculation is four tables. 5A: cable factors for short straight conduit runs. 5B: conduit factors for short straight runs. 5C: cable factors for trunking and longer / bend-heavy conduit runs. 5D: trunking factors and longer-run / bends conduit factors."
            onSite="On any commercial job you’ll either reach for the OSG, GN1, or a manufacturer’s trunking spec sheet — they all give equivalent numbers in slightly different formats. The recipe is the same: sum cable factors, compare against enclosure factor."
          >
            <p>Indicative cable factors for stranded copper singles (OSG Table 5C, longer runs and trunking):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.5 mm² stranded — ≈ 8.6</li>
              <li>2.5 mm² stranded — ≈ 11.4</li>
              <li>4 mm² stranded — ≈ 15.2</li>
              <li>6 mm² stranded — ≈ 22.9</li>
              <li>10 mm² stranded — ≈ 36.3</li>
            </ul>
            <p>Indicative trunking factors (OSG Table 5D):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>50 × 38 mm trunking — ≈ 767</li>
              <li>50 × 50 mm trunking — ≈ 1037</li>
              <li>75 × 50 mm trunking — ≈ 1555</li>
              <li>75 × 75 mm trunking — ≈ 2371</li>
              <li>100 × 50 mm trunking — ≈ 2091</li>
              <li>100 × 100 mm trunking — ≈ 4252</li>
            </ul>
            <p className="text-[13px] text-white/75">
              These are indicative values from common OSG editions — always verify against the
              edition you’re working to before signing off design. The 45% fill is built into the
              tabulated trunking factor, so summing cable factors and comparing directly is
              compliant by definition.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reading the OSG Appendix H tables — what to look up first"
            plainEnglish="Appendix H is four tables, each with a specific purpose. Knowing which table to open first saves five minutes of confused flipping every time you do a fill calc."
            onSite="The decision tree: short straight conduit run? → Tables 5A (cable factors) + 5B (conduit factors). Trunking, OR conduit longer than 3 m, OR conduit with bends? → Tables 5C (cable factors) + 5D (trunking and bend-affected conduit factors). Pick the wrong table pair and your numbers will be inconsistent — they’re not interchangeable."
          >
            <p>
              The reason for the split is physics. A short straight conduit lets cables slide
              through easily, so the fill limit can be more generous (Tables 5A/5B). A long
              conduit with bends, or a trunking run with end terminations, makes pulling much
              harder, so the fill limit tightens (Tables 5C/5D). Use the strict pair on anything
              non-trivial and you’ll never be wrong.
            </p>
            <p>
              Cable factors are listed for stranded singles by CSA. Trunking factors are listed
              for each enclosure size and shape. The tables don’t care about colour, voltage band
              or circuit function — only physical dimensions. Singles with the same CSA have the
              same factor whether they’re red, black, blue or green-and-yellow.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>The recipe</ContentEyebrow>

          <ConceptBlock
            title="Three steps every fill calculation follows"
            plainEnglish="One — list every cable in the enclosure with its CSA. Two — look up its cable factor and multiply by the count. Three — sum all the cable factors and compare against the enclosure’s own factor."
          >
            <p className="font-mono bg-white/[0.04] border border-white/[0.08] rounded-lg p-3 text-[13px]">
              Step 1: list cables → for each: (count × cable factor){'\n'}
              Step 2: sum all → Σ (count × cable factor){'\n'}
              Step 3: compare → Σ (cable factors) ≤ enclosure factor → COMPLIANT
            </p>
            <p>
              If the sum exceeds the enclosure factor, you have three choices: bigger enclosure,
              fewer cables in this enclosure, or a separate route for the surplus. Adding more
              cables is not an option — the original choice has to change.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Worked example 1 — 50×50 trunking</ContentEyebrow>

          <ConceptBlock
            title="50 × 2.5 mm² + 30 × 4 mm² in 50×50 trunking — does it fit?"
            plainEnglish="A real install — long horizontal trunking run on a commercial corridor, mixed circuit sizes, all stranded singles drawn through. Time to do the maths before ordering trunking."
            onSite="Spec asked for 80 conductors total in one trunking run — 50 of them at 2.5 mm² and 30 of them at 4 mm² (mostly socket and lighting circuits with a few small machine feeds). 50×50 mm metal trunking is on the order list. Will it actually take the lot?"
          >
            <p>
              <strong>Step 1 — gather the cables.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>50 × 2.5 mm² stranded copper singles → cable factor each ≈ 11.4 (OSG Table 5C).</li>
              <li>30 × 4 mm² stranded copper singles → cable factor each ≈ 15.2 (OSG Table 5C).</li>
            </ul>

            <p>
              <strong>Step 2 — calculate cable-factor totals.</strong>
            </p>
            <p className="font-mono bg-white/[0.04] border border-white/[0.08] rounded-lg p-3 text-[13px]">
              50 × 11.4 = 570{'\n'}
              30 × 15.2 = 456{'\n'}
              Sum = <strong>1026</strong>
            </p>

            <p>
              <strong>Step 3 — compare against the trunking factor.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>50 × 50 mm trunking factor (OSG Table 5D) ≈ <strong>1037</strong>.</li>
              <li>1026 ≤ 1037 → <strong>FITS</strong>. ✓</li>
              <li>Headroom: 1037 − 1026 = 11 units (about 1%). Effectively at capacity.</li>
            </ul>

            <p>
              <strong>Step 4 — sanity check.</strong> The maths says yes. But the headroom is
              tiny — any future addition will breach the fill rule. For a corridor that might
              see new circuits added later, sensible design would step up to 75 × 50 mm
              trunking (factor ≈ 1555) — gives plenty of headroom and lower Cg derate too. Cost
              difference is small; flexibility is huge.
            </p>

            <p>
              <strong>Step 5 — link back to Sub3.</strong> 80 conductors in one trunking is a LOT
              of grouping. Cg from OSG Table 4C1 for 80+ circuits is well below 0.5 — every
              cable’s Iz is approximately halved. The original CCC sizing (Sub3) needs to have
              accounted for that BEFORE the fill calc. Don’t do these calcs in isolation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Worked example 2 — 20 mm conduit, 4 m with one bend</ContentEyebrow>

          <ConceptBlock
            title="5 × 2.5 mm² in 20 mm conduit — straight 4 m run with one bend"
            plainEnglish="A typical commercial drop — five circuits coming down from a junction box to a row of accessories at low level, in 20 mm steel conduit, four metres tall, with one bend at the top to reach the JB."
            onSite="The conduit factor for short straight runs is generous. Add bends and extra length and the factor shrinks — partly because of the friction calculations from Sub5, partly because the cables need more wiggle room round bends."
          >
            <p>
              <strong>Step 1 — gather the cables.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>5 × 2.5 mm² stranded copper singles → cable factor each ≈ 30 (OSG Table 5C, long-run / with-bends).</li>
            </ul>

            <p>
              <strong>Step 2 — total cable factor.</strong>
            </p>
            <p className="font-mono bg-white/[0.04] border border-white/[0.08] rounded-lg p-3 text-[13px]">
              5 × 30 = <strong>150</strong>
            </p>

            <p>
              <strong>Step 3 — look up conduit factor.</strong> 20 mm conduit, 4 m straight + one
              bend (OSG Table 5D) ≈ <strong>264</strong>.
            </p>

            <p>
              <strong>Step 4 — compare.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>150 ≤ 264 → <strong>FITS</strong>. ✓</li>
              <li>Headroom: 264 − 150 = 114 units (about 43% of total). Lots of room for future additions.</li>
            </ul>

            <p>
              <strong>Step 5 — sanity check.</strong> Plenty of margin in 20 mm. If the spec
              changes and you need 8 × 2.5 mm² (8 × 30 = 240), still inside 264. At 9 × 2.5 mm²
              (270) you’d bust it and need to step up to 25 mm conduit (factor ≈ 442 in same
              configuration). Always size with future modification in mind — stepping up one
              conduit size at install is cheap; ripping it out later isn’t.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Real-world: when fill calculations save you a callback"
            plainEnglish="The fill calc looks like a paper exercise during design. The places it earns its keep are the small commercial extensions and refurb jobs where shortcut decisions on day one bite back six months later."
            onSite="The classic scenario: extension on a tenant fit-out. Existing trunking is in place, looks half-empty, you add a few circuits without doing the calc. Six months later the tenant adds another zone, the next contractor opens the trunking lid, and finds it’s now bursting. The blame for the re-pull lands on whoever did the un-calc’d addition — not the original designer."
          >
            <p>
              The most common patterns where fill calcs save real money:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mid-life extensions</strong> — adding circuits to existing trunking. Do
                the calc on what’s already in there before adding. Half the time the existing
                fill is already at 70–80% and your addition busts the limit.
              </li>
              <li>
                <strong>Sub-mains upgrades</strong> — uprating a sub-main from 4 mm² singles to
                10 mm² singles in existing conduit. Cable factors more than double — what fitted
                before may not fit now.
              </li>
              <li>
                <strong>Tenant fit-out reuse</strong> — landlord trunking serving multiple
                tenancies. Each new tenant adds load, eventually the shared trunking fills. Get
                the calc into the design pack and the landlord has a defensible answer when a
                tenant complains about a refused new circuit.
              </li>
              <li>
                <strong>EICR remedials</strong> — finding existing over-fill on inspection. The
                calc gives you the evidence to code it (typically C3, sometimes C2 if loaded
                cables are non-compliant on Cg) and quote the remedial honestly.
              </li>
            </ul>
            <p>
              Ten minutes with the OSG before any of these jobs is the cheapest insurance
              you’ll buy all month.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it bites you on site</ContentEyebrow>

          <CommonMistake
            title="Adding a new circuit to existing trunking without checking the fill"
            whatHappens={
              <>
                Customer wants three more sockets in the office. Easy — there’s a 50×50 trunking
                already running past the wall, and the existing install used 6491X singles. You
                drop new 2.5 mm² red and black singles into the trunking and connect them up.
                Job’s a good ‘un, you think — bill it and move on. Trouble is, the existing
                trunking was already at 95% fill (Appendix H factors) from the previous fit-out.
                Your new singles push it to 102%. The Cg for everything in there has just
                dropped from 0.7 to 0.65 — every cable is now over its real Iz. Three months in,
                the customer reports an MCB tripping intermittently. You go back, megger-test,
                and discover the busiest existing circuit has been running 10°C above its
                insulation rating ever since you added the new singles. Insulation is starting
                to fail.
              </>
            }
            doInstead={
              <>
                Before adding ANY new cable to existing containment, do the fill calc on the
                actual current contents. Most commercial trunking is sized with future-proof
                headroom — but only if you check. If the existing run is at limit, run a separate
                trunking for the new circuit, or up-size the existing trunking. Also re-derate the
                existing cables for the new total Cg. If any cable was at limit and is now over,
                it has to be uprated (bigger CSA) or the new addition can’t go ahead. That’s the
                conversation to have with the customer — explain why the easy answer might not be
                the safe answer.
              </>
            }
          />

          <Scenario
            title="School fit-out — designer picked 50×50 trunking for what turned out to be an 80-circuit run"
            situation={
              <>
                You’re fitting out the IT block of a secondary school. The original M&E design
                spec called for 50×50 mm trunking down the main corridor with 25 circuits in it.
                During value-engineering, the M&E team swapped the design to consolidate three
                runs into one — now 80 circuits in the same 50×50 trunking. You’re first-fix and
                you do the fill calc: it busts.
              </>
            }
            whatToDo={
              <>
                Stop and flag through the chain — designer, M&E lead, contracts manager. Don’t
                quietly install non-compliant. Two technical fixes possible. (1) Up-size the
                trunking to 75×75 (factor ≈ 2371) — gives plenty of headroom and lower Cg derate
                bonus. (2) Split into two parallel 50×50 trunkings (factor 2 × 1037 = 2074
                combined; Cg better because each trunking has fewer circuits). Either fix has
                cost implications — that’s why it goes to the chain to decide. What’s NOT an
                option is jamming 80 circuits into 50×50 and walking away. Document the design
                non-compliance, propose the fix, get the variation signed off, then install per
                the corrected design.
              </>
            }
            whyItMatters={
              <>
                Value engineering during design is meant to remove waste, not reduce safety
                margins. An apprentice or improver who spots a design fault and flags it is more
                useful than a senior who installs whatever’s on the drawings without checking.
                The fill calc takes ten minutes; saves the firm from a defect-period reinstall
                that costs ten thousand.
              </>
            }
          />

          <RegsCallout
            source="On-Site Guide (OSG) Appendix H — Conduit and trunking capacities — paraphrased"
            clause="The On-Site Guide Appendix H provides cable factors (Tables 5A and 5C) and conduit / trunking factors (Tables 5B and 5D) for use in calculating the maximum number of conductors that can be drawn into a given enclosure. The recommended maximum fill is 45% by cross-sectional area for trunking, with conduit factors split between short straight runs and longer / bend-heavy runs. The sum of cable factors must not exceed the enclosure factor for the chosen size."
            meaning={
              <>
                The OSG is the practical cable-fill bible — it codifies the 45% trunking limit and
                the conduit-fill calculations into tabulated factors that make the maths quick.
                BS 7671 itself doesn’t tabulate fill but requires the install to comply with the
                cable manufacturer’s install guidance and to keep cables from damage and
                overheating — both of which the OSG fill rules satisfy. Paraphrased — verify the
                specific tables in the edition of the OSG you’re working to.
              </>
            }
            cite="Source: paraphrased from OSG (current edition) — Appendix H."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 521.10.1 (Non-sheathed cables in conduit / trunking)"
            clause="Non-sheathed cables for fixed wiring shall be enclosed in conduit, ducting or trunking. This requirement does not apply to a protective conductor complying with Section 543. Non-sheathed cables are permitted if the cable trunking system provides at least the degree of protection IPXXD or IP4X, and if the cover can only be removed by means of a tool or a deliberate action."
            meaning={
              <>
                Reg 521.10.1 sits behind the whole fill calculation — non-sheathed singles MUST
                be enclosed, and the enclosure MUST be designed and sized to accept the cables
                without damage. ‘Designed and sized’ is where Appendix H comes in. Stuffing too
                many cables into the enclosure breaches the spirit of 521.10.1 even before any
                fill-factor table is consulted.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 521.10.1."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'OSG Appendix H sets a 45% maximum fill for trunking. Conduit fill varies by run length and bend count — use the OSG tables.',
              'Recipe: list cables → multiply count × cable factor → sum totals → compare against enclosure factor. Sum ≤ enclosure factor = compliant.',
              'Worked example: 50 × 2.5 mm² + 30 × 4 mm² → cable-factor sum 1026 → fits 50×50 trunking (factor 1037) but with no headroom.',
              'Worked example: 5 × 2.5 mm² in 20 mm conduit (4 m, 1 bend) → cable-factor sum 150 vs conduit factor 264 → fits comfortably.',
              'Fill calc and Cg derate (Sub3) are linked — over-filling busts the grouping factor and the original CCC sizing both.',
              'Adding new cables to existing containment ALWAYS needs the fill check AND a re-derate of the existing cables for the new Cg.',
              'Reg 521.10.1 sits behind it — non-sheathed singles must be in correctly-sized enclosure, ‘correctly sized’ being the OSG Appendix H test.',
              'Design with future-proof headroom — stepping up one trunking size now is cheap; ripping out and replacing later isn’t.',
            ]}
          />

          <Quiz title="Spacing factor of enclosures — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Specialised wiring-system equipment
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.7 Cable sizing worked end-to-end
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
