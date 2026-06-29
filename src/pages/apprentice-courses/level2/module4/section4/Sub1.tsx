/**
 * Module 4 · Section 4 · Sub 1 — Identify cable sizes for main bonding
 * Maps to City & Guilds 2365-02 / Unit 204 / LO4 / AC 4.1
 *   AC 4.1 — "Identify cable sizes"
 *
 * Frame: Main bonding sizing isn't a guess. Reg 544.1 + Table 54.8 (PME) and
 * Reg 544.1.1 (TN-S/TT) decide. 10 mm² is the workhorse but it's not the rule.
 * Read the supply, read the table, fit what the regs actually require.
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

const TITLE = 'Identify cable sizes for main bonding | Level 2 Module 4.4.1 | Elec-Mate';
const DESCRIPTION =
  'Sizing main protective bonding conductors against BS 7671 Table 54.8 (PME), Reg 544.1.1 (TN-S/TT) and the supply earth fault arrangement — 10 mm², 16 mm², 25 mm², when each applies and why.';

const checks = [
  {
    id: 'm4-s4-sub1-pme-25mm',
    question:
      'A single-phase domestic supply is TN-C-S (PME) with 25 mm² tails. What is the minimum cross-sectional area for the main protective bonding conductor to gas and water?',
    options: [
      '6 mm²',
      '25 mm²',
      '16 mm²',
      '10 mm²',
    ],
    correctIndex: 3,
    explanation:
      'BS 7671 Table 54.8 — for a PEN conductor of 35 mm² or less (which 25 mm² Cu equivalent is), the minimum copper-equivalent main bonding is 10 mm². Reg 544.1.1 mandates the PME bonding sizing comes from the PEN (supplier neutral), not the line conductor.',
  },
  {
    id: 'm4-s4-sub1-tns-rule',
    question:
      'On a TN-S supply where PME conditions do NOT apply, how is the minimum main protective bonding conductor sized under Reg 544.1.1?',
    options: [
      'Equal to the full cross-sectional area of the earthing conductor of the installation, with a 10 mm² minimum (in copper).',
      'Not less than half the cross-sectional area required for the earthing conductor of the installation, with a 6 mm² minimum and 25 mm² maximum (in copper).',
      'Read directly from Table 54.8 against the supplier PEN conductor, exactly as for a PME supply.',
      'A flat 10 mm² in all cases, regardless of the earthing conductor size or the supply arrangement.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 544.1.1 — "Except where PME conditions apply, a main protective bonding conductor shall have a cross-sectional area not less than half the cross-sectional area required for the earthing conductor of the installation." Minimum 6 mm² Cu, no need to exceed 25 mm² Cu equivalent.',
  },
  {
    id: 'm4-s4-sub1-supplementary-size',
    question:
      'In a bathroom, you are running supplementary bonding between two extraneous-conductive-parts (a copper hot pipe and a copper cold pipe) with mechanical protection in conduit. What is the minimum CSA?',
    options: ['1.0 mm²', '1.5 mm²', '2.5 mm²', '4 mm²'],
    correctIndex: 2,
    explanation:
      'Reg 544.2.3 — supplementary bonding between two extraneous-conductive-parts: 2.5 mm² minimum if mechanically protected (in conduit, sheath, etc.), or 4 mm² minimum if not mechanically protected. Different rule again for extraneous-to-exposed (Reg 544.2.2 — half the CPC of the exposed-conductive-part).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS 7671 table sets the minimum main protective bonding conductor size for an installation supplied under PME conditions?',
    options: [
      'Table 54.1 — minimum size of a buried earthing conductor.',
      'Table 54.8 — main protective bonding conductor in relation to the PEN conductor of the supply.',
      'Table 54.7 — minimum size of a circuit protective conductor by adiabatic calculation.',
      'Table 41.3 — maximum earth fault loop impedance for protective devices.',
    ],
    correctAnswer: 1,
    explanation:
      'Table 54.8 is the PME bonding sizing table. PEN ≤ 35 mm² → 10 mm² Cu equivalent bonding; PEN over 35 to 50 mm² → 16 mm²; over 50 to 95 mm² → 25 mm²; over 95 to 150 mm² → 35 mm²; over 150 mm² → 50 mm². Reg 544.1.1 mandates its use whenever PME applies.',
  },
  {
    id: 2,
    question:
      'On a TN-C-S (PME) supply with a 70 mm² PEN, what is the minimum copper-equivalent CSA of the main protective bonding conductor to each extraneous-conductive-part?',
    options: [
      '35 mm²',
      '10 mm²',
      '25 mm²',
      '16 mm²',
    ],
    correctAnswer: 2,
    explanation:
      'Table 54.8 — PEN over 50 mm² up to 95 mm² → 25 mm² Cu equivalent main bonding. A 70 mm² PEN typically appears on three-phase commercial supplies. The table assumes the worst-case PEN-broken scenario where the bonding may carry full neutral return current.',
  },
  {
    id: 3,
    question:
      'A small commercial unit has a TT supply with a 16 mm² Cu earthing conductor (corrosion-protected, mechanical protection). Reg 544.1.1 applies. What is the minimum main protective bonding conductor?',
    options: [
      '6 mm²',
      '4 mm²',
      '16 mm²',
      '10 mm²',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 544.1.1 — bonding "not less than half the cross-sectional area required for the earthing conductor". 16 ÷ 2 = 8 mm². Standard sizes are 6 / 10 / 16, so round up to the next standard size: 10 mm². Minimum allowed is 6 mm² but the half rule pushes it to 10. Maximum need not exceed 25 mm² Cu.',
  },
  {
    id: 4,
    question:
      'Why does BS 7671 size PME main bonding against the supplier neutral and not against the installation line conductor?',
    options: [
      'Because in a broken-PEN fault the bonding may carry the whole neutral return current to ground, so it must be sized to the PEN.',
      'Because the installation line conductor is always larger than the neutral, so sizing to it would waste copper.',
      'Because the supplier neutral is the only conductor the DNO will accept liability for sizing against.',
      'Because the installation line conductor size is not known until every final circuit has been designed.',
    ],
    correctAnswer: 0,
    explanation:
      'A broken PEN on PME is the design case. Without the supplier neutral, every amp of installation current looks for a path back to source. The local earthing and bonding conductors become that path. Table 54.8 sizes them to handle it. That is why a 10 mm² bond is considered the floor for PME, even though half the CPC math would sometimes give a smaller answer.',
  },
  {
    id: 5,
    question:
      'A protective conductor (CPC, earthing conductor or bonding conductor) up to and including 6 mm² requires what level of insulation cover under Reg 543.3.201?',
    options: [
      'No insulation at all — protective conductors up to 6 mm² may always be run as bare strap.',
      'Covering at least equivalent to the insulation of a single-core non-sheathed cable, voltage rating at least 450/750 V — except where it forms part of a multicore cable or is run inside a metal enclosure used as the protective conductor.',
      'A double-insulated sheath rated at 1000 V regardless of where the conductor is run.',
      'A coloured oversleeve only at the terminations, with the conductor left bare along its length.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 543.3.201 — protective conductors up to 6 mm² must be covered by insulation equivalent to a 450/750 V single-core non-sheathed cable. The standard green/yellow single core sold for bonding meets this. Bare strap is allowed only inside metallic conduit/enclosure used as the protective conductor itself, or as part of a multicore.',
  },
  {
    id: 6,
    question:
      'You are sizing a main earthing conductor for a TT installation where the buried portion runs through soil, protected against corrosion by a copper sheath but NOT mechanically protected. What is the minimum CSA from BS 7671 Table 54.1?',
    options: [
      '10 mm² Cu',
      '25 mm² Cu',
      '16 mm² Cu',
      '50 mm² Cu',
    ],
    correctAnswer: 2,
    explanation:
      'Table 54.1 — buried earthing conductor, protected against corrosion (copper sheath) but not against mechanical damage → 16 mm² copper minimum. If neither protected, 25 mm² Cu / 50 mm² steel. If mechanically protected and corrosion protected, 2.5 mm² Cu (rare in practice).',
  },
  {
    id: 7,
    question:
      'A first-year asks why every main bonding conductor he sees on PME jobs is 10 mm² regardless of building. What is the right answer?',
    options: [
      'Because BS 7671 sets a flat 10 mm² minimum for all main bonding regardless of supply type or PEN size.',
      'Because 10 mm² is the largest size that fits a standard BS 951 earth clamp, so it is fitted everywhere.',
      'Because the gas and water undertakings require exactly 10 mm² bonding on all of their services.',
      'Because most domestic PME supplies have a PEN of 35 mm² or less, which Table 54.8 maps to a 10 mm² minimum.',
    ],
    correctAnswer: 3,
    explanation:
      'Domestic 100 A single-phase PME supplies typically have 16 mm² or 25 mm² PEN (well under 35 mm²) → Table 54.8 minimum is 10 mm². So 10 mm² is the routine answer for domestic. Commercial supplies have larger PEN, larger bonding. The local DNO can require larger still — Table 54.8 says "Local distributor\'s network conditions may require a larger conductor."',
  },
  {
    id: 8,
    question:
      'Identify the standard cable colour code for a main protective bonding conductor under BS 7671 Reg 514.4.2.',
    options: [
      'Green-and-yellow combination, exclusive to protective conductors. One colour at least 30% and at most 70% of the surface, the other colour the remainder.',
      'Solid green, used exclusively for earthing and bonding conductors.',
      'Black with a green stripe, distinguishing bonding from circuit protective conductors.',
      'Blue, the same identification colour as the neutral conductor it runs alongside.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 514.4.2 — green-and-yellow is reserved exclusively for protective conductors (earthing, CPC, main bonding, supplementary bonding, equipotential bonding). Cannot be used for any other purpose. The 30/70 ratio rule prevents the colour being mistaken for solid green (which is forbidden for live or protective conductors per 514.4.5).',
  },
];

const faqs = [
  {
    question: 'Why is 10 mm² the most common main bonding size on domestic jobs?',
    answer:
      'Almost all UK domestic supplies are TN-C-S (PME) with a PEN conductor of 35 mm² or less — typically 16 mm² or 25 mm² aluminium service cable. Table 54.8 maps "PEN ≤ 35 mm²" to a 10 mm² copper-equivalent minimum main bonding. So on virtually every domestic main bonding job, 10 mm² G/Y single-core is what gets fitted to the gas, water and any other extraneous-conductive-part.',
  },
  {
    question: 'When does main bonding step up to 16 mm² or 25 mm²?',
    answer:
      'Once you cross PEN sizes used on bigger supplies. A three-phase 100 A commercial supply often has a 35 mm² PEN — still 10 mm² bonding under the table. A larger commercial supply with 50 mm² PEN steps to 16 mm² bonding. Industrial 95 mm² PEN steps to 25 mm². Always read the supplier neutral and check Table 54.8 — do not guess.',
  },
  {
    question: 'What is the difference between main bonding sizing and earthing conductor sizing?',
    answer:
      'Main bonding (Reg 544.1.1 + Table 54.8 on PME) sizes the conductors from the MET out to the gas, water and other extraneous services. Main earthing conductor (Reg 544.1.1 + Table 54.7 or 54.8 + Table 54.1 if buried) sizes the conductor from the MET back to the source earth (PEN block on PME, sheath on TN-S, electrode on TT). Different jobs, related sizing rules, often the same physical conductor cross-section but they should be checked against the right table each time.',
  },
  {
    question: 'When does supplementary bonding sizing apply instead of main bonding?',
    answer:
      'Supplementary bonding (Reg 544.2) applies in special locations like bathrooms (Section 701), swimming pools (Section 702), agricultural (Section 705) where ADS disconnection times can not be relied upon. Different sizing: 4 mm² minimum for extraneous-to-exposed bonds (or half the CPC if larger), 2.5 mm² minimum for extraneous-to-extraneous bonds in mechanical protection. Sub 5 of this Section covers main vs supplementary in detail.',
  },
  {
    question: 'How does the regs distinguish between PME and non-PME for bonding sizing?',
    answer:
      'Reg 544.1.1 has two halves. "Except where PME conditions apply" → bonding is half the earthing conductor with a 6 mm² minimum and 25 mm² maximum cap (in copper). "Where PME conditions apply" → bonding is sized against the PEN per Table 54.8. PME forces a step up because of the broken-PEN fault scenario. Always identify the supply type first (look at the meter cabinet, ask the DNO if unclear) — getting it wrong means the bonding may melt under fault conditions.',
  },
  {
    question: 'Can I use a smaller bond if the run is short and the cable is well-protected?',
    answer:
      'No. The Reg 544 sizing tables set a minimum CSA for fault-current handling, not for voltage drop. They are floor values. You can always go larger (and many electricians fit 16 mm² as a defensive standard on PME), but you can not go smaller than the table value regardless of route length, mechanical protection or any other factor. Going smaller risks the conductor failing during a fault — the entire purpose of the bonding being there.',
  },
];

export default function Sub1() {
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
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 1"
            title="Identify cable sizes for main bonding"
            description="Sizing main protective bonding against BS 7671 Table 54.8 (PME) and Reg 544.1.1 (TN-S / TT). 10 mm² is the workhorse on domestic but it is not the rule — read the supply, read the table, fit what the regs actually require."
            tone="emerald"
          />

          <TLDR
            points={[
              'PME (TN-C-S) bonding: Reg 544.1.1 + Table 54.8. PEN ≤ 35 mm² → 10 mm² Cu minimum. PEN over 35 mm² up to 50 mm² → 16 mm². PEN over 50 to 95 mm² → 25 mm².',
              'Non-PME (TN-S, TT): Reg 544.1.1 — bonding is half the earthing conductor CSA, 6 mm² minimum, no need to exceed 25 mm² Cu equivalent.',
              'Always read the supplier neutral first. The PEN size sets the table row. Domestic 100 A supplies normally have a PEN of 25 mm² aluminium or smaller, so 10 mm² is the routine bonding answer.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the standard cross-sectional areas of main protective bonding conductors used in UK installations: 6 mm², 10 mm², 16 mm², 25 mm² and beyond.',
              'Cite Reg 544.1.1 and apply Table 54.8 to size a main bonding conductor for a given PME supply.',
              'Apply the half-of-earthing-conductor rule (Reg 544.1.1) for non-PME (TN-S, TT) installations with the 6 mm² minimum and 25 mm² Cu maximum cap.',
              'Identify the minimum buried earthing conductor sizes from Table 54.1 (with and without mechanical and corrosion protection).',
              'Identify the supplementary bonding sizing rules from Reg 544.2 (4 mm² unprotected / 2.5 mm² protected for extraneous-to-extraneous).',
              'Read the BS 7671 colour code (Reg 514.4.2 — green-and-yellow exclusive to protective conductors) and pick conductors that meet Reg 543.3.201 insulation cover.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What main bonding does and why size matters</ContentEyebrow>

          <ConceptBlock
            title="Main bonding equalises potential during a fault"
            plainEnglish="Tie every metal pipe, every structural service, every extraneous-conductive-part back to the MET so they all sit at the same voltage when a fault happens. If they are at the same voltage, no one gets a shock between them."
            onSite="On every domestic, commercial and industrial install, main bonding goes from the MET to the consumer side of the gas meter, to the consumer side of the water service, and to any other extraneous-conductive-part that introduces a potential into the building (oil pipework, structural steel, lightning protection earth)."
          >
            <p>
              The main protective bonding conductor is part of the BS 7671 protective equipotential
              bonding system (Reg 411.3.1.2). Its job is to keep extraneous-conductive-parts —
              metal pipes and structures that come into the building from outside — at the same
              potential as the MET during a line-to-earth fault. Without it, a fault on a circuit
              could leave the gas pipe at line potential while the metal sink on the worktop is at
              earth potential, and anyone touching both at once gets the full touch voltage across
              their body.
            </p>
            <p>
              The size of the bonding conductor matters for two reasons. First, mechanical: a thin
              strap can be damaged in a service cupboard by other trades. Second and more important,
              fault-current handling: in a broken-PEN scenario on a PME supply, the bonding
              conductor may have to carry the entire installation's neutral return current back to
              ground through the extraneous-conductive-parts. An undersized conductor will melt
              before the fault is cleared, breaking the bond at the worst possible moment.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 544.1.1 (Cross-sectional area of main protective bonding conductors)"
            clause="Except where PME conditions apply, a main protective bonding conductor shall have a cross-sectional area not less than half the cross-sectional area required for the earthing conductor of the installation. Where an installation serves more than one building, a main protective bonding conductor shall be selected in accordance with the characteristics of the distribution circuit protective conductor for that particular building. The cross-sectional area shall be not less than 6 mm², and need not exceed 25 mm² if the bonding conductor is of copper or a cross-sectional area affording equivalent conductance in other metals. Except for highway power supplies and street furniture, where PME conditions apply the main protective bonding conductor shall be selected in accordance with the PEN conductor of the supply and Table 54.8."
            meaning={
              <>
                Two sizing methods. Non-PME — half the earthing conductor CSA, 6 mm² floor, 25 mm²
                Cu cap. PME — read Table 54.8 against the supplier PEN. Table 54.8 forces a step
                up because of the broken-PEN risk. On the routine UK domestic PME supply (PEN
                ≤ 35 mm²) that lands at a 10 mm² Cu equivalent minimum.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 544.1.1 (cross-sectional area of main protective bonding conductors) — paraphrased."
          />

          <SectionRule />

          <ContentEyebrow>The PME route — Table 54.8</ContentEyebrow>

          <ConceptBlock
            title="Read the PEN, read the table"
            plainEnglish="Look at the supplier neutral conductor on the head end (the PEN). Find the row in Table 54.8. Pick the bonding size next to it. That is the minimum — you can always go larger."
          >
            <p>
              On a PME supply, BS 7671 Table 54.8 gives the minimum copper-equivalent
              cross-sectional area of the main protective bonding conductor in relation to the
              supplier's PEN conductor:
            </p>
            <div className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[14px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-white/90">
                <div className="font-semibold text-emerald-300">PEN of supply</div>
                <div className="font-semibold text-emerald-300 hidden sm:block">Min Cu bonding</div>

                <div>35 mm² or less</div>
                <div className="text-white/70 sm:text-white/90">10 mm²</div>

                <div>over 35 mm² up to 50 mm²</div>
                <div className="text-white/70 sm:text-white/90">16 mm²</div>

                <div>over 50 mm² up to 95 mm²</div>
                <div className="text-white/70 sm:text-white/90">25 mm²</div>

                <div>over 95 mm² up to 150 mm²</div>
                <div className="text-white/70 sm:text-white/90">35 mm²</div>

                <div>over 150 mm²</div>
                <div className="text-white/70 sm:text-white/90">50 mm²</div>
              </div>
            </div>
            <p>
              Table 54.8 carries a NOTE: "Local distributor's network conditions may require a
              larger conductor." Some DNOs publish supply-specific bonding requirements that exceed
              the table values. Always cross-check the local DNO supply standard before final sign
              off — UK Power Networks, Northern Powergrid, Western Power and SP Energy Networks
              each publish their own service connection standards with bonding minima.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why PEN size drives the bonding sizing"
            plainEnglish="A broken PEN on PME means every amp of installation neutral wants to escape via earth. The bonding becomes the escape route. Size it to handle the worst case."
            onSite="In the rare event the supplier PEN breaks (a fault on the supply network, often outside your control), the gas pipe and water pipe in the building suddenly become the neutral return path for the entire installation back to local ground. Your bonding conductor is the link in that chain. If it melts, the broken-PEN voltage rise lands on every metal surface in the property."
          >
            <p>
              The broken-PEN scenario is the design case for PME bonding sizing. Under normal
              operation, the PEN carries the installation's neutral current safely back to source.
              In a broken-PEN fault, the PEN connection between the supply and the consumer's
              installation is severed — possibly at a service joint, possibly at a head terminal —
              and the only remaining path for the neutral return current is via the consumer's
              local earthing and bonding system to extraneous-conductive-parts (gas, water,
              structural steel) and from there into the ground.
            </p>
            <p>
              Table 54.8 sizes the bonding to carry this fault current without failing for long
              enough that the supply can be restored or the protective device upstream operates.
              That is why a 10 mm² minimum is mandated even when the half-of-earthing rule would
              give a smaller answer — the broken-PEN current may dramatically exceed normal CPC
              fault currents.
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

          <ContentEyebrow>The non-PME route — half the earthing conductor</ContentEyebrow>

          <ConceptBlock
            title="TN-S and TT — half of the earthing conductor, 6 mm² floor, 25 mm² cap"
            plainEnglish="Work out the earthing conductor size first, halve it, round up to the next standard size. Never go below 6 mm². No need to exceed 25 mm² in copper."
          >
            <p>
              On a TN-S supply (cable sheath as protective conductor) and on TT (local electrode),
              PME conditions do not apply. Reg 544.1.1 first half kicks in: the main protective
              bonding conductor cross-sectional area shall be not less than half that required for
              the earthing conductor of the installation. The 6 mm² minimum and 25 mm² Cu maximum
              both apply.
            </p>
            <p>Worked examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earthing conductor 16 mm² Cu</strong> → half is 8 mm² → round up to next
                standard size → <strong>10 mm² bonding</strong>.
              </li>
              <li>
                <strong>Earthing conductor 25 mm² Cu (TT, unprotected, buried)</strong> → half is
                12.5 mm² → <strong>16 mm² bonding</strong> (next standard size).
              </li>
              <li>
                <strong>Earthing conductor 50 mm² Cu (large commercial TT)</strong> → half is
                25 mm² → cap of 25 mm² applies → <strong>25 mm² bonding</strong> (no need to go
                higher in copper).
              </li>
              <li>
                <strong>Earthing conductor 6 mm² Cu (small TN-S)</strong> → half is 3 mm² →{' '}
                <strong>6 mm² bonding</strong> (the 6 mm² floor wins).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 544.1.1 and Table 54.1 (Buried earthing conductors)"
            clause="544.1.1 — for the cross-sectional area of a main protective bonding conductor. In addition, where buried in the ground, the earthing conductor shall have a cross-sectional area not less than that stated in Table 54.1. For a tape or strip conductor, the thickness shall be such as to withstand mechanical damage and corrosion. Table 54.1 — Minimum cross-sectional area of a buried earthing conductor: protected against corrosion AND mechanical damage — 2.5 mm² Cu / 10 mm² steel; protected against corrosion only (sheath) — 16 mm² Cu / 16 mm² coated steel; not protected against corrosion — 25 mm² Cu / 50 mm² steel."
            meaning={
              <>
                The buried portion of an earthing conductor — typically the run from the MET out
                to a TT electrode — has its own minimum sizes in Table 54.1, separate from the
                bonding sizing. A bare 6 mm² Cu strap is fine inside a meter cabinet but not buried
                in the ground; once underground, you need at least 16 mm² Cu (protected against
                corrosion by a sheath) or 25 mm² Cu (unprotected). Most TT installations end up
                with a 16 mm² Cu earthing conductor because it satisfies both the half-of-earthing
                rule and the buried-conductor minimum.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 54, Regulation 544.1.1 and Table 54.1."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Supplementary bonding sizing — different rules</ContentEyebrow>

          <ConceptBlock
            title="Reg 544.2 — supplementary bonding is sized differently"
            plainEnglish="Supplementary bonds are short, local, and live in special locations like bathrooms. The CSA rules are smaller — 4 mm² unprotected, 2.5 mm² between extraneous parts in conduit. Different from main bonding."
            onSite="Sub 5 of this Section is the deep dive on main vs supplementary. The headline: when you are doing a bathroom and supplementary bonding is required (older property, missing RCD on every circuit), your sizing is from Reg 544.2 — not from Table 54.8."
          >
            <p>Supplementary bonding sizing under Reg 544.2:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 544.2.1</strong> — between two exposed-conductive-parts (e.g. between
                two Class I appliances): conductance not less than the smaller CPC connected to the
                exposed parts. Min 4 mm² if not mechanically protected.
              </li>
              <li>
                <strong>Reg 544.2.2</strong> — between an exposed-conductive-part and an
                extraneous-conductive-part (e.g. towel rail to copper pipe): conductance not less
                than half the CPC of the exposed-conductive-part. Min 4 mm² if not mechanically
                protected.
              </li>
              <li>
                <strong>Reg 544.2.3</strong> — between two extraneous-conductive-parts (e.g.
                copper hot pipe to copper cold pipe): 2.5 mm² minimum if mechanically protected
                (in conduit, sheath, etc.) or 4 mm² if not protected.
              </li>
            </ul>
            <p>
              The shorthand most electricians remember: 4 mm² on view, 2.5 mm² in conduit. That
              covers the routine bathroom scenarios. Anything more elaborate (commercial special
              locations, agricultural) — go back to the regulation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Conductor identification and insulation cover</ContentEyebrow>

          <ConceptBlock
            title="Green-and-yellow — exclusive to protective conductors"
            plainEnglish="Bonding cable is single-core green/yellow. Always. Never any other colour. The 30/70 ratio between the two colours is a regulation, not a preference."
          >
            <p>
              Reg 514.4.2 — the bi-colour combination green-and-yellow is reserved exclusively for
              identification of protective conductors and shall not be used for any other purpose.
              In this combination one colour shall cover at least 30% and at most 70% of the
              surface, the other colour the remainder. The point of the 30/70 rule: a strap that is
              mostly green with a dash of yellow looks too much like solid green — and Reg 514.4.5
              forbids solid green for live, protective or functional bonding conductors because of
              the colour-blindness risk and the historical confusion with old wiring colour codes.
            </p>
            <p>
              Reg 543.3.201 then sets the insulation cover requirement. Protective conductors up
              to and including 6 mm² need a covering at least equivalent to a single-core
              non-sheathed cable of voltage rating 450/750 V — i.e. the standard green/yellow
              single-core sleeved insulation you buy on a reel. Bare strap is allowed only inside
              a metallic conduit/enclosure used as the protective conductor itself, or as part of
              a multicore. Above 6 mm² the insulation requirement relaxes a little but in practice
              all main bonding cable sold for the job is fully insulated G/Y single-core.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.4.2 (Identification of protective conductors)"
            clause="The bi-colour combination green-and-yellow shall be used exclusively for identification of a protective conductor and this combination shall not be used for any other purpose. In this combination one of the colours shall cover at least 30% and at most 70% of the surface being coloured, while the other colour shall cover the remainder of the surface. Single-core cables and conductors in multicore cables identified by green-and-yellow throughout their length shall only be used as a protective conductor and shall not be overmarked at their terminations, except as permitted by Regulation 514.4.3."
            meaning={
              <>
                Every main bonding, supplementary bonding, earthing conductor and CPC must be
                green-and-yellow. The 30/70 split is mandatory — not a stylistic choice. Anything
                solid green or solid yellow used as a protective conductor is non-compliant and
                a coding issue at inspection.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 514.4.2."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Why TT installations need bigger main earthing — soil resistivity reality"
            plainEnglish="On TT, your earth electrode resistance is fighting the soil. Wet clay might be 30 ohms; dry sand or rocky ground can be hundreds. The earthing conductor has to be heavy enough to survive both fault current and decades of corrosion in damp ground — that's why TT installs almost always end up with 16 mm² or 25 mm² main earthing rather than the 10 mm² you'd see on PME."
            onSite="On a rural TT install — say a barn conversion or a static caravan park pitch — you'll typically run a 16 mm² Cu earthing conductor from the MET out to the rod, even though the half-of-CPC math sometimes says less. Reason: Table 54.1 says buried + corrosion-protected = 16 mm² Cu minimum. And once the earthing conductor is 16 mm², the half-rule pulls main bonding up to 10 mm² Cu (8 mm² rounded up to next standard size)."
          >
            <p>
              UK soil resistivity varies enormously. London clay sits around 30 to 50 ohm-metres
              when wet; chalk and sand can hit 500 ohm-metres or more in summer drought. A single
              1.2 m driven copper-bonded rod typically lands somewhere between 50 and 200 ohms
              total resistance to ground depending on soil and season. That's the whole reason TT
              needs a 30 mA RCD on every final circuit — Zs is too high for an MCB to disconnect
              in time on a fault, so RCDs do the disconnection job.
            </p>
            <p>
              The bigger main earthing conductor on TT does two jobs at once. First, it's buried
              for at least part of its run (electrode pit to MET) so Table 54.1 minimums apply —
              16 mm² Cu corrosion-protected, 25 mm² Cu unprotected. Second, the larger CSA gives
              a margin against decades of corrosion in damp ground; a 6 mm² conductor that loses
              30% of its cross-section to copper-oxide creep over 25 years is a different
              proposition from a 16 mm² conductor losing the same proportion. Most TT installs
              you'll inherit have 16 mm² Cu earthing and 10 mm² Cu main bonding — that's not
              accidental, it's the regs working in combination.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Bonding cable colour code in practice — when G/Y, when stripe, when sleeving"
            plainEnglish="Main bonding is single-core green-and-yellow with the 30/70 stripe baked into the insulation. You only sleeve when you're using a single-core cable that started life as something else — a green-and-yellow CPC inside a Twin & Earth where the bare CPC needs identification at every termination."
            onSite="In the wholesaler bin, 'bonding cable' means 6491X G/Y single-core in 4 mm², 6 mm², 10 mm², 16 mm² and 25 mm². You buy it on a reel, cut to length, no sleeving needed because the insulation already meets Reg 514.4.2. The G/Y sleeving on your van is for the bare CPC inside Twin & Earth, not for main bonding runs."
          >
            <p>
              Reg 514.4.2 wants the green-and-yellow stripe to cover the full length of the
              conductor — and it spells out the 30/70 ratio (one colour at least 30%, at most 70%
              of the surface, the other colour the remainder). Branded bonding cable from any UK
              wholesaler — Doncaster, Time, Pirelli, Prysmian — meets this out of the box. You
              don't have to do anything beyond cutting it to length and stripping the ends.
            </p>
            <p>Where the sleeving rule actually bites:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bare CPC inside Twin &amp; Earth.</strong> The CPC inside 6242Y T&amp;E
                is bare copper. At every termination — back box, accessory, consumer unit — the
                bare CPC must be sleeved with G/Y heat-shrink or PVC sleeving so it's identified
                as a protective conductor. Reg 514.4 requires this; Reg 543.3.201 is the
                insulation-cover rule that makes the sleeving necessary up to and including
                6 mm² CPC.
              </li>
              <li>
                <strong>SWA armour used as the CPC.</strong> The steel armour itself is the CPC
                on most SWA installs. At the gland, the CPC tail (the short piece bonded from
                the gland banjo to the earth bar in the gear) gets G/Y identification —
                heat-shrink or sleeving along its length.
              </li>
              <li>
                <strong>Singles in conduit where G/Y wasn't ordered.</strong> Rare on bonding —
                you should always order G/Y for bonding runs. If you ever inherit an install
                where someone ran a black or grey core for a bonding conductor (non-compliant
                from day one), it can be fully G/Y oversleeved at every accessible point as a
                temporary remediation pending replacement.
              </li>
            </ul>
            <p>
              The shorthand: if you're running 6491X bonding cable, you're already compliant on
              colour. If you're using a core out of a multi-core cable as a protective conductor,
              you sleeve every visible bit of it to G/Y. Solid green or solid yellow on its own
              is forbidden for protective conductors per Reg 514.4.5.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where the sizing goes wrong on real jobs</ContentEyebrow>

          <CommonMistake
            title="Fitting 6 mm² 'because it is half of 10' on a PME bonding job"
            whatHappens={
              <>
                You are tying in main bonding to a gas pipe in the meter cupboard. The earthing
                conductor coming out of the MET measures 10 mm². The half-of-earthing rule says
                bonding can be 5 mm² → round up to 6 mm². You fit a 6 mm² G/Y strap, tighten the
                clamp and move on. Six months later an EICR codes your install C2 (potentially
                dangerous) because the supply is PME and Reg 544.1.1 / Table 54.8 demanded a 10 mm²
                bonding minimum based on the supplier neutral, not on the earthing conductor.
              </>
            }
            doInstead={
              <>
                Always identify the supply system first. PME (TN-C-S) and you go to Table 54.8
                indexed by the PEN conductor. Non-PME and you use the half-of-earthing rule. The
                two sizing methods do not give the same answer and the half-of-earthing rule is
                NOT permitted on PME because it does not account for the broken-PEN fault
                scenario. On a domestic PME supply with PEN ≤ 35 mm² the answer is always 10 mm²
                Cu minimum, regardless of how big the earthing conductor turns out to be.
              </>
            }
          />

          <Scenario
            title="Single-phase 100 A TN-C-S domestic with 25 mm² tails — what bonding to gas and water?"
            situation={
              <>
                You are first-fixing main bonding in a new-build semi. The supply is single-phase
                100 A TN-C-S (PME). The DNO has fitted 25 mm² aluminium tails into the consumer
                cut-out and a 16 mm² Cu earthing conductor down to the MET. You need to bond the
                incoming gas service and the incoming water service. What CSA do you fit and why?
              </>
            }
            whatToDo={
              <>
                Identify the supply: PME → Reg 544.1.1 second half → Table 54.8. Find the supplier
                PEN: 25 mm² aluminium ≈ 16 mm² copper-equivalent. That is "35 mm² or less" in the
                table → 10 mm² Cu minimum bonding. Fit 10 mm² G/Y single-core (insulated, meets
                Reg 543.3.201 cover requirement) from the MET to the BS 951 earth clamp on the
                consumer side of the gas meter (within 600 mm per Reg 544.1.2) and another 10 mm²
                run from the MET to the BS 951 clamp on the consumer side of the water stop-tap
                (also within 600 mm). Two separate runs back to the MET — never daisy-chain the
                bonds because a break at the first clamp would lift the bond on the second.
              </>
            }
            whyItMatters={
              <>
                Sizing the bond against the supply rather than against the earthing conductor is
                the entire point of Reg 544.1.1's PME branch. A correctly sized 10 mm² bond can
                handle the broken-PEN fault current long enough for protection to operate. A
                6 mm² bond (which would meet the half-of-earthing rule for a 10 mm² earthing
                conductor) cannot, and would melt — leaving the gas pipe at the broken-PEN
                voltage. The same Reg, two sizing methods, completely different real-world fault
                outcomes.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Main bonding sizing is governed by Reg 544.1.1. Two methods: PME uses Table 54.8 indexed by PEN; non-PME uses half the earthing conductor with a 6 mm² floor and 25 mm² Cu cap.',
              'Table 54.8 (PME): PEN ≤ 35 mm² → 10 mm² Cu; over 35–50 → 16 mm²; over 50–95 → 25 mm²; over 95–150 → 35 mm²; over 150 → 50 mm².',
              'Domestic 100 A PME supplies typically have 16 mm² or 25 mm² aluminium PEN — both fall in the "≤ 35 mm²" row, so 10 mm² bonding is the routine answer.',
              'Buried earthing conductor sizing is governed separately by Table 54.1 — 16 mm² Cu protected against corrosion, 25 mm² Cu unprotected.',
              'Supplementary bonding (Reg 544.2) is sized differently: 4 mm² unprotected, 2.5 mm² protected for extraneous-to-extraneous; 4 mm² unprotected or half the CPC for extraneous-to-exposed.',
              'All main bonding cable is green-and-yellow single-core (Reg 514.4.2) with insulation cover at least equivalent to 450/750 V (Reg 543.3.201). Solid green or solid yellow is forbidden for protective conductors.',
              'Local DNOs may publish higher minimum sizes than Table 54.8 — always cross-check the supplier specification before final sign off.',
              'When in doubt, fit the next size up. The cost difference between 10 mm² and 16 mm² G/Y is pence per metre. The cost of an undersized bond failing is a life.',
            ]}
          />

          <Quiz title="Identify cable sizes — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-9')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cable pulling and dressing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Terminate bonding cables
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
