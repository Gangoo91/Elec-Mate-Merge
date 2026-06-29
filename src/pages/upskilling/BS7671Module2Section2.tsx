import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm2s2-cpc-vs-earthing',
    question:
      'You are wiring a new circuit from the consumer unit to a metal-bodied wall light. Which protective conductor sits BETWEEN the consumer unit and the light fitting, and which one runs from the MET to the earth electrode?',
    options: [
      'Earthing conductor between CU and light; CPC from MET to electrode',
      'CPC between CU and light; earthing conductor from MET to electrode',
      'Both are CPCs — the term covers everything from MET outward',
      'Both are earthing conductors — CPC is just the cable colour',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Part 2 defines the terms separately. A circuit protective conductor (CPC) connects an exposed-conductive-part of equipment to the main earthing terminal (Reg 411.3.1.1). The earthing conductor is the conductor that connects the MET to the means of earthing — the earth electrode in TT, or the supply PEN in TN-C-S. Treating them as one term is the most common misnaming on EICs and gets picked up at QS.',
  },
  {
    id: 'm2s2-411-3-1-1-cpc-everywhere',
    question:
      'A pendant lampholder with no exposed metal parts is fitted to a plastic ceiling rose. Reg 411.3.1.1 — does a CPC have to be terminated at this point?',
    options: [
      'Yes — every accessory must have a CPC terminated, with no exceptions',
      'No — Reg 411.3.1.1 exempts a lampholder with no exposed metal, suspended',
      'Only if the circuit is supplied from a TT earthing system',
      'Only if the room is a Part 7 special location (bath, shower)',
    ],
    correctIndex: 1,
    explanation:
      'Reg 411.3.1.1 sets the default that a CPC must be run to and terminated at every point in wiring and at every accessory. The single exception is a pendant lampholder with no exposed-conductive-parts that is suspended from such a point. Replace the rose with a metal-bodied luminaire or downlight and the CPC must be present and terminated.',
  },
  {
    id: 'm2s2-selv-source',
    question:
      'A 12 V LED downlight system is fed from a transformer marked "BS EN 61558-2-6 — safety isolating transformer". The secondary has no earth reference. Which protective measure is in place?',
    options: [
      'FELV — the source windings are shared with the primary',
      'PELV — the transformer secondary is intentionally earthed',
      'SELV — band I voltage, safety isolating source, no earth on secondary',
      'ADS — the LED driver disconnects the supply on an earth fault',
    ],
    correctIndex: 2,
    explanation:
      'SELV (Section 414) requires three things: voltage at or below band I (≤ 50 V AC / 120 V DC ripple-free per Reg 414.1.1), a safety isolating source — typically a BS EN 61558-2-6 transformer — and complete electrical separation with no intentional connection to earth on the secondary. Tick all three and it is SELV. Earth the secondary instead and it becomes PELV. Lose the safety-isolating source and it collapses to FELV.',
  },
  {
    id: 'm2s2-felv-not-protective',
    question:
      'A 24 V control circuit is derived from an autotransformer (single tapped winding) inside a process panel. The customer asks you to record it as "SELV" on the cert. What is the right call?',
    options: [
      'Mark it SELV — the voltage is below 50 V AC',
      'Mark it PELV — earthing of the secondary is permitted',
      'Refuse — no safety isolation, so it is FELV, which is not a protective measure',
      'Mark it FELV and treat FELV as a recognised protective measure',
    ],
    correctIndex: 2,
    explanation:
      'A SELV / PELV source must provide AT LEAST simple separation between windings (Section 414.3 / BS EN 61558-2-6). An autotransformer shares windings — no isolation. The result is FELV, which Reg 411.7 explicitly does not recognise as a protective measure. Reg 411.7.3 forces the FELV circuit to carry full basic and fault protection at the PRIMARY voltage (230 V) — not at 24 V.',
  },
  {
    id: 'm2s2-class-ii-sole-measure',
    question:
      'A circuit feeds a domestic socket-outlet. The designer proposes to rely on Class II (double or reinforced insulation per Section 412) as the sole protective measure. Why is this wrong?',
    options: [
      "It's fine — Class II is BS 7671's preferred protective measure",
      'Reg 412.1.2 forbids Class II as the sole measure on socket-outlet circuits',
      'Class II applies only to lighting circuits, never to socket circuits',
      'Class II as a sole measure requires a dedicated earth electrode',
    ],
    correctIndex: 1,
    explanation:
      'The Section 412 measure (double / reinforced insulation) relies on the entire circuit being Class II. Reg 412.1.2 explicitly forbids using it as the sole protective measure on any circuit that includes a socket-outlet with earthing contact, LSC, DCL, cable coupler or anywhere the user can change equipment without authorisation. One Class I plug-in defeats the measure. Class II is a per-equipment choice, not a circuit-level one.',
  },
  {
    id: 'm2s2-extraneous-vs-exposed',
    question:
      'A copper water pipe enters a kitchen from underground. It is NOT energised, but in fault conditions it could introduce a potential from outside the equipotential zone. What is the BS 7671 term, and which protective conductor connects it to the MET?',
    options: [
      'Exposed-conductive-part — connected by a CPC under Reg 543.1.1',
      'Extraneous-conductive-part — connected by main protective bonding (Reg 544.1.1)',
      'Live part — connected by the supply neutral conductor',
      'Class III equipment — no bonding or earthing required at all',
    ],
    correctIndex: 1,
    explanation:
      'Part 2 is precise: an exposed-conductive-part is a conductive part of equipment that can be touched and that may become live under fault. An extraneous-conductive-part is liable to introduce a potential — typically earth potential — from outside the installation. Incoming water/gas pipes, structural metalwork in contact with earth and central-heating pipework are the classic examples. They are connected to the MET by a main protective bonding conductor sized per Reg 544.1.1, not by a CPC.',
  },
  {
    id: 'm2s2-supplementary-bonding',
    question:
      'In a BS 7671 bathroom, when does Reg 415.2 require supplementary equipotential bonding to be installed?',
    options: [
      'Always — supplementary bonding is mandatory in every bathroom, no exceptions',
      'Never — supplementary bonding has been removed from BS 7671 entirely',
      'Only where any of the three Reg 701.415.2 omission conditions fail',
      'Only where the customer specifically requests it in writing',
    ],
    correctIndex: 2,
    explanation:
      'Reg 701.415.2 lets the designer omit supplementary bonding in a location containing a bath or shower ONLY if all three conditions hold: (a) every circuit meets its disconnection time, (b) every circuit has 30 mA RCD additional protection, and (c) every extraneous-conductive-part is reliably bonded back to the MET. Miss any one — Reg 415.2 / 544.2 supplementary bonding goes back in (4 mm² minimum unprotected, 2.5 mm² minimum mechanically protected).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which BS 7671 Part 2 definition matches a circuit protective conductor (CPC)?',
    options: [
      'A conductor connecting an exposed-conductive-part to the main earthing terminal',
      'A conductor that connects the MET to the means of earthing',
      'A conductor providing functional earthing for EMC purposes',
      'A conductor that bonds two extraneous-conductive-parts in a special location',
    ],
    correctAnswer: 0,
    explanation:
      'Part 2: a CPC is a protective conductor used for protection against electric shock that connects an exposed-conductive-part of equipment to the MET. The MET-to-means-of-earthing conductor is the earthing conductor; the EMC option is a functional earth; the two-extraneous-parts option is a supplementary bonding conductor. Reg 411.3.1.1 then mandates the CPC at every point and accessory.',
  },
  {
    id: 2,
    question:
      'A new domestic ring final circuit on 2.5 mm² T&E uses a 1.5 mm² CPC inside the cable. The line is protected by a 32 A Type B MCB. Which Reg sets the rule that the CPC cross-sectional area must satisfy?',
    options: [
      'Reg 411.1 — ADS general protective measure',
      'Reg 544.1.1 — main protective bonding sizing',
      'Reg 415.2.1 — supplementary bonding sizing',
      'Reg 543.1.1 — CPC sizing',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 543.1.1 gives the two routes for sizing a CPC: (i) the adiabatic equation S = √(I² × t) / k against the let-through energy of the protective device, or (ii) selection from Table 54.7 (which is more conservative). 1.5 mm² CPC inside 2.5 mm² T&E is the standard outcome of Table 54.7 for that line size and is universally accepted on a Type B 32 A. Reg 544.1.1 sizes main protective bonding (different conductor, different rule).',
  },
  {
    id: 3,
    question:
      'A property has a 25 mm² tails arrangement on a TN-C-S supply. The DNO supply earth (PEN) terminal is to be bonded to the gas service pipe. What is the minimum cross-sectional area of the main protective bonding conductor under Reg 544.1.1?',
    options: [
      '4 mm² copper',
      '6 mm² copper',
      '10 mm² copper',
      '16 mm² copper',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 544.1.1: main protective bonding conductor is half the cross-sectional area of the earthing conductor with a 6 mm² floor and a 25 mm² ceiling — BUT in TN-C-S (PME) supplies the DNO requires a 10 mm² minimum where the supply neutral is up to 35 mm². With 25 mm² tails on a TN-C-S supply, 10 mm² main bonding is the standard answer. The DNO may require larger (16 mm² or 25 mm²) on heavier services — confirm with the supply company.',
  },
  {
    id: 4,
    question:
      'Reg 411.3.1.1 mandates a CPC at every point in wiring and every accessory. Which one of the following is the recognised exception?',
    options: [
      'A pendant lampholder having no exposed-conductive-parts and suspended from such a point',
      'Any plastic-bodied accessory',
      'Lighting circuits in domestic premises',
      'Any circuit on a TN-C-S supply',
    ],
    correctAnswer: 0,
    explanation:
      'The verbatim wording of Reg 411.3.1.1 carves out one narrow exception: a pendant lampholder having no exposed-conductive-parts and suspended from such a point. Every other accessory — plastic or metal, lighting or socket — must have a CPC run to and terminated at it. Substitute the pendant for a metal-bodied light or downlight and the exception falls away.',
  },
  {
    id: 5,
    question: 'Which combination correctly describes SELV under Section 414?',
    options: [
      'Up to 50 V AC / 120 V DC, earthed midpoint, basic protection by enclosure only',
      'Up to 50 V AC / 120 V DC ripple-free, no earth connection, safety isolating source',
      'Up to 230 V AC, fed by an isolating transformer, earthed at the secondary winding',
      'Functional earthing only, with no source isolation requirement at all',
    ],
    correctAnswer: 1,
    explanation:
      'SELV is band I (≤ 50 V AC RMS / 120 V DC ripple-free per Reg 414.1.1), with no intentional connection to earth, complete electrical separation from any other circuit, and a safety isolating source — typically a BS EN 61558-2-6 transformer (Section 414.3). Reg 414.4.4 still requires basic protection where the nominal voltage exceeds 25 V AC / 60 V DC ripple-free, or where equipment is immersed.',
  },
  {
    id: 6,
    question: 'Which one of the following is NOT a protective measure recognised by Chapter 41?',
    options: [
      'Automatic Disconnection of Supply (ADS) — Reg 411',
      'SELV — Section 414',
      'PELV — Section 414',
      'FELV — Reg 411.7',
    ],
    correctAnswer: 3,
    explanation:
      'FELV (Reg 411.7) is explicitly NOT a protective measure. It is an extra-low-voltage circuit that does not meet all of the Section 414 requirements for SELV or PELV — typically because the source is not safety-isolated. The FELV circuit must therefore be designed with full basic and fault protection at the PRIMARY voltage (Reg 411.7.3). Recognised protective measures in Chapter 41 are ADS, double / reinforced insulation (Section 412), electrical separation (Section 413) and SELV / PELV (Section 414).',
  },
  {
    id: 7,
    question: 'Class I, Class II and Class III equipment — which row is correct?',
    options: [
      'Class I = no earth, relies on insulation; Class II = earthed casing; Class III = SELV-fed',
      'Class I = battery operated; Class II = mains powered; Class III = three-phase only',
      'Class I = earthed casing relying on a CPC; Class II = double/reinforced insulation; Class III = SELV / PELV supply',
      'Class I = portable; Class II = fixed; Class III = a manufacturer marketing distinction',
    ],
    correctAnswer: 2,
    explanation:
      'IEC 61140 / BS 7671 equipment classes. Class I has accessible metal that becomes live under fault unless connected to a CPC — fault protection is provided by ADS via that CPC. Class II has double or reinforced insulation (Section 412) and never has a protective earth conductor — recognised by the double-square symbol. Class III is designed to be supplied by SELV or PELV only — voltage limit is the protective measure. Class 0 (no protection beyond basic) and Class 0I are not recognised in BS 7671 installations.',
  },
  {
    id: 8,
    question:
      'A consumer unit MET on a TN-C-S supply has 16 mm² tails. The earthing conductor between MET and the DNO supply earth is sized per which regulation, and what minimum CSA is typically required?',
    options: [
      'Reg 411.1 (ADS general); typical minimum 4 mm²',
      'Reg 543.1.1 (sized as a CPC) with Reg 542.3.1 minimums; typically 16 mm²',
      'Reg 415.2.1 (supplementary bonding); typical minimum 2.5 mm²',
      'Reg 411.3.4 (luminaire RCD); typical minimum 10 mm²',
    ],
    correctAnswer: 1,
    explanation:
      'The earthing conductor is sized as a CPC under Reg 543.1.1 (adiabatic equation or Table 54.7). Reg 542.3.1 then sets the minimum CSA based on whether the conductor is buried, mechanically protected and protected against corrosion. For a typical domestic CU with 25 mm² tails on TN-C-S, the earthing conductor is normally 16 mm² copper. Reg 544.1.1 sizes main protective bonding (a different conductor) and Reg 415.2.1 / 544.2 sizes supplementary bonding.',
  },
];

const faqItems = [
  {
    question:
      'What is the difference between a CPC, an earthing conductor and a bonding conductor?',
    answer:
      'They are three distinct protective conductors with three different jobs. A CPC (Reg 411.3.1.1) connects an exposed-conductive-part of equipment back to the MET — sized under Reg 543.1.1. An earthing conductor connects the MET to the means of earthing (the DNO supply earth in TN-C-S, or an earth electrode in TT) — sized under Reg 543.1.1 with the Reg 542.3.1 minimum CSA. A main protective bonding conductor connects extraneous-conductive-parts (incoming water, gas, structural steel, etc.) to the MET — sized under Reg 544.1.1. Mixing them up is the most common Part 2 error and shows up directly on the EIC schedule.',
  },
  {
    question: 'How is a CPC sized — adiabatic or Table 54.7?',
    answer:
      'Reg 543.1.1 gives the designer two routes. Route (i) is the adiabatic equation S = √(I² × t) / k, where I is the prospective fault current, t is the disconnection time of the protective device at that current, and k comes from Table 54.2 / 54.3 / 54.4 / 54.5 depending on conductor and insulation. Route (ii) is selection from Table 54.7 — a one-line lookup that errs on the side of larger conductors. Most domestic and small-commercial CPCs are sized via Table 54.7 (e.g. 1.5 mm² CPC inside 2.5 mm² T&E for a ring final on a Type B 32 A). Larger commercial circuits use the adiabatic to optimise.',
  },
  {
    question: 'When is supplementary equipotential bonding required, and how is it sized?',
    answer:
      'Reg 415.2 sets the rule and Reg 544.2 the sizing. The conductor connects two exposed-conductive-parts, two extraneous-conductive-parts, or one of each. The minimum CSA is determined by Reg 544.2 — but the practical floor is 4 mm² where mechanical protection is not provided, and 2.5 mm² where mechanical protection is provided. In a BS 7671 bathroom (Section 701) supplementary bonding may be omitted only if all three of Reg 701.415.2 conditions hold: disconnection time met, 30 mA RCD additional protection on every circuit, and all extraneous-conductive-parts reliably bonded to the MET. Miss any one and Reg 415.2 supplementary bonding is back.',
  },
  {
    question: 'Why is FELV not a protective measure?',
    answer:
      'FELV (Reg 411.7) describes a circuit that operates at extra-low voltage but lacks one or more of the Section 414 requirements for SELV or PELV — most commonly the safety isolating source. The voltage is low; the safety guarantee is not. A primary fault on the higher-voltage side can drive the primary voltage onto the FELV side, defeating the band I assumption. Reg 411.7.3 therefore requires every FELV circuit to be designed with full basic and fault protection AT THE PRIMARY VOLTAGE. The fix is design: replace the autotransformer or shared-winding source with a BS EN 61558-2-6 safety isolating transformer and the circuit becomes SELV (no earth) or PELV (earthed) — both genuine protective measures.',
  },
  {
    question: 'Where exactly is "SELV" different from "PELV" on the cert?',
    answer:
      'On the EIC schedule of inspection, the entry under Section 411/414 changes only by whether the secondary is intentionally earthed. Both require band I voltage and a safety isolating source per Section 414.3. SELV — no intentional connection to earth on the secondary, no exposed-conductive-parts connected to earth. PELV — secondary may be earthed (often for EMC or functional reasons), and exposed-conductive-parts may be connected to earth. SELV is the right choice in zone 0 of a bath/shower, fountain zone 0, and equipment in reach of children (BA2). PELV is more common for control panels with shielded screens and instrumentation that need a stable functional earth.',
  },
  {
    question: 'What does Reg 411.3.1.1 actually mandate at every point and accessory?',
    answer:
      'A circuit protective conductor must be run to and terminated at every point in wiring and at every accessory — except a pendant lampholder having no exposed-conductive-parts and suspended from such a point. There is no other exception. Plastic-bodied sockets, plastic switches, plastic FCUs — all still need the CPC terminated at the back-box/terminal. Replace a plastic pendant rose with a metal-bodied luminaire or downlight and the CPC must be present and connected. The verbatim regulation also requires simultaneously accessible exposed-conductive-parts to be connected to the same earthing system — no mixing TN earth and TT earth on the same equipotential zone.',
  },
  {
    question:
      'How do Class I, Class II and Class III equipment relate to BS 7671 protective measures?',
    answer:
      'Class I (IEC 61140) is equipment whose accessible metal parts could become live under fault — fault protection comes from a CPC connecting the metal back to the MET, plus ADS at the consumer unit. Class II is equipment relying on double or reinforced insulation (Section 412 / Reg 412.1.2) — recognised by the double-square symbol — and never has a protective earth conductor. Class III is equipment designed to operate from SELV or PELV only — the band I voltage is itself the protective measure. Reg 412.1.2 forbids relying on Class II as the SOLE protective measure on any circuit a user can change equipment on (sockets, LSCs, DCLs, couplers) because one Class I plug-in defeats it.',
  },
  {
    question: 'A4:2026 has changed how TN-C-S is described on the cert. What is PNB?',
    answer:
      'A4:2026 introduces "TN-C-S (PNB)" as an explicit cert-form option on the EIC. PNB stands for Protective Neutral Bonding — a specific form of TN-C-S where the consumer\'s installation has only one connection to the supply at the cut-out and the combined PEN is split into separate N and PE at the MET. The protective conductor and neutral are common upstream of the cut-out (PEN), separated downstream. The CPC, earthing conductor and main protective bonding rules in Reg 543, 542 and 544 all still apply; the change is purely on the cert form so that the system arrangement is recorded explicitly. See Module 2 §3 for the full set of new A2/A3/A4 definitions and cert-form changes.',
  },
  {
    question:
      'What is the difference between a "live part" and an "exposed-conductive-part" in BS 7671 Part 2?',
    answer:
      'A live part is a conductor or conductive part intended to be energised in normal use, including the neutral conductor in most arrangements (TN-S, TT, IT). The PEN in TN-C / TN-C-S is a special case — it is both a neutral and a protective conductor and is treated under Reg 461.2. An exposed-conductive-part is a conductive part of equipment that can be touched but is NOT a live part — it only becomes live under fault. An extraneous-conductive-part is a conductive part liable to introduce a potential (typically earth potential) from outside the installation — incoming pipes, structural metalwork, etc. The three terms drive completely different rules: live parts get basic protection (insulation, barriers, enclosures), exposed-conductive-parts get a CPC and ADS, extraneous-conductive-parts get main protective bonding.',
  },
];

const BS7671Module2Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Key terms — CPC, ADS, SELV, PELV | BS 7671:2018+A4:2026 | Module 2.2',
    description:
      'The BS 7671 Part 2 definitions every electrician must use precisely — CPC, earthing conductor, main bonding, supplementary bonding, ADS, SELV, PELV, FELV, and equipment classes. Updated for A4:2026.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2"
            title="Key terms — CPC, ADS, SELV, PELV"
            description="The Part 2 definitions BS 7671 expects every electrician to use precisely — protective conductors, protective measures and equipment classes. Get the language right and the design, the cert and the EICR all line up."
            actions={
              <>
                <RegBadge>411.1</RegBadge>
                <RegBadge>411.3.1.1</RegBadge>
                <RegBadge>414.1.1</RegBadge>
                <AmendmentBadge regs={['411.3.4']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 Part 2 distinguishes four distinct protective conductors — CPC, earthing conductor, main protective bonding and supplementary bonding — each with its own regulation and sizing rule (543, 542, 544.1.1, 544.2).',
              'ADS (Reg 411) is the default UK protective measure. SELV and PELV (Section 414) are alternatives; FELV (Reg 411.7) is NOT a protective measure.',
              'Class I, II and III equipment match different protective measures. Misnaming a conductor or class on the cert is the most common QS observation — get the language right and the rest follows.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define CPC, earthing conductor, main protective bonding conductor and supplementary equipotential bonding conductor — and cite the BS 7671 sizing regulation for each.',
              'State the verbatim Reg 411.3.1.1 rule and the single recognised exception (pendant lampholder, no exposed metal).',
              'Distinguish ADS (Reg 411), SELV, PELV (Section 414) and FELV (Reg 411.7) by source, voltage limit and earthing arrangement, and explain why FELV is not a protective measure.',
              'Identify the three voltage / current limits that define SELV and PELV (Reg 414.1.1) and the basic-protection requirement above 25 V AC (Reg 414.4.4).',
              'Distinguish Class I, Class II and Class III equipment per IEC 61140 / BS 7671, and pick the right protective measure for each.',
              'Distinguish live part, exposed-conductive-part and extraneous-conductive-part — and apply the right protective conductor to each.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The four protective conductors</ContentEyebrow>

          <ConceptBlock
            title="Circuit protective conductor (CPC)"
            plainEnglish="The conductor that runs from the MET out to every exposed-conductive-part of the installation. It is the fault-current path back to the source and the reason ADS works."
            onSite="In domestic T&E it is the bare conductor inside the cable, sleeved green-and-yellow at every termination. It must be terminated at every point and accessory under Reg 411.3.1.1 — back-box earthing tags, fitting earth terminals, accessory earth terminals, the lot."
          >
            <p>
              BS 7671 Part 2 defines the CPC as a protective conductor used for protection against
              electric shock that connects an exposed-conductive-part of equipment to the main
              earthing terminal of the installation. Sizing is set by Reg 543.1.1 — either the
              adiabatic equation S = &radic;(I&sup2; &times; t) / k, or selection from Table 54.7
              (the conservative one-line lookup). Most domestic CPCs are 1.5 mm&sup2; inside 2.5
              mm&sup2; T&amp;E (sockets) or 1.0 mm&sup2; inside 1.5 mm&sup2; T&amp;E (lighting) and
              meet Reg 543.1.1 via Table 54.7.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.1.1 — Protective earthing"
            clause="Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point."
            meaning="A CPC at every point and every accessory is the legal default. The lampholder exception is narrow: pendant lampholder, no exposed metal, suspended. Replace it with a metal-bodied luminaire or downlight and the CPC must be present and connected. Mixing earthing systems on the same equipotential zone is also forbidden."
            cite="BS 7671:2018+A4:2026, Reg 411.3.1.1 (p.66)"
          />

          <InlineCheck {...inlineChecks[1]} />

          <ConceptBlock
            title="Earthing conductor — distinct from the CPC"
            plainEnglish="The conductor that runs from the MET to the means of earthing — the supply PEN in TN-C-S, the earth electrode in TT, or the supply CPC in TN-S. It is the spine that the entire installation hangs off."
            onSite="In a domestic CU it is the green-and-yellow conductor between the MET earth bar and the supply earth terminal at the cut-out. Typical CSA: 16 mm² copper for a 25 mm² tails arrangement on TN-C-S. Sized as a CPC under Reg 543.1.1, with Reg 542.3.1 minimum CSAs depending on whether it is buried, mechanically protected and corrosion-protected."
          >
            <p>
              Calling the earthing conductor a &quot;CPC&quot; on a cert is one of the most common
              Part 2 mistakes and a QS will pick it up immediately. They are different conductors
              with different jobs: the CPC carries fault current from an exposed-conductive-part
              back to the MET, the earthing conductor carries that fault current from the MET out to
              the means of earthing. Reg 542.3.1 specifies the minimums: for a buried earthing
              conductor without mechanical protection the minimum CSA is dictated by corrosion, not
              just current — typically 25 mm&sup2; copper or 50 mm&sup2; steel. With mechanical
              protection the rules relax.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Main protective bonding conductor (Reg 544.1.1)"
            plainEnglish="The conductor that bonds extraneous-conductive-parts — incoming water, gas, oil, structural steel, central-heating pipework — to the MET. Its job is to keep every accessible metal part at the same potential during a fault, so there is no touch voltage to drive a shock."
            onSite="The 10 mm² green-and-yellow you clamp to the gas service pipe with a BS 951 earth clamp, within 600 mm of the meter or before any branch — that is the main protective bonding conductor. Sized per Reg 544.1.1: half the CSA of the earthing conductor with a 6 mm² floor and 25 mm² ceiling; in TN-C-S the DNO normally requires 10 mm² minimum where supply neutral ≤ 35 mm² (16 mm² on heavier services)."
          >
            <p>
              Reg 544.1.1 sets the formula but the DNO&apos;s minimums for TN-C-S override on the
              low side. For a typical UK domestic with 25 mm&sup2; tails on TN-C-S: 16 mm&sup2;
              earthing conductor, 10 mm&sup2; main protective bonding to gas and water — every
              extraneous-conductive-part bonded back to the MET. Connection to the pipe must be with
              a BS 951 earth clamp, with the &quot;Safety Electrical Connection — Do Not
              Remove&quot; label, on a clean bare-metal section, before any branch (or within 600 mm
              of the meter outlet on gas).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Supplementary equipotential bonding conductor (Reg 415.2.1)"
            plainEnglish="A localised bonding conductor inside a high-risk location (typically a bathroom). It ties together the exposed-conductive-parts and extraneous-conductive-parts within that location so the touch voltage stays below the dangerous threshold even if the main ADS fails."
            onSite="Bathrooms historically had supplementary bonding on every job. Today the Reg 701.415.2 omission allows it to be left out IF (a) every circuit meets disconnection times, (b) every circuit has 30 mA RCD additional protection, and (c) every extraneous-conductive-part is reliably bonded back to the MET. Miss any of the three and supplementary bonding is back in."
          >
            <p>
              Reg 415.2.1 sets the rule and Reg 544.2 the sizing. The conductor connects either two
              exposed-conductive-parts, two extraneous-conductive-parts, or an
              exposed-conductive-part to an extraneous-conductive-part. The practical minimum CSA: 4
              mm&sup2; where mechanical protection is not provided, 2.5 mm&sup2; where it is. The
              Section 415.2 conductor is &quot;supplementary&quot; in the sense of completing the
              local equipotential zone — it is not a substitute for a CPC, an earthing conductor or
              main bonding.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Live part vs exposed vs extraneous</ContentEyebrow>

          <ConceptBlock
            title="Three terms, three protective conductors, three rules"
            plainEnglish="A live part is intentionally energised. An exposed-conductive-part is metal you can touch that becomes live only under fault. An extraneous-conductive-part is metal you can touch that brings in a potential from outside the installation."
            onSite="Live parts get basic protection — insulation, barriers, enclosures (Section 416). Exposed-conductive-parts get a CPC plus ADS (Reg 411). Extraneous-conductive-parts get main protective bonding (Reg 544.1.1). Three jobs, three rules — naming them correctly on the cert tells the inspector you understand the model."
          >
            <p>
              The most common Part 2 mistake is calling a copper water pipe an
              &quot;exposed-conductive-part&quot;. It is not — it is an extraneous-conductive-part
              because it brings earth potential in from outside the installation, not because it is
              part of equipment that can become live under fault. The protective treatment is
              therefore main bonding to the MET (Reg 544.1.1), not a CPC. A central-heating radiator
              fed from copper pipework is a similar case &mdash; bond the pipework, not the
              radiator. A metal back-box is the opposite case: it is part of an accessory and CAN
              become live under fault, so it is an exposed-conductive-part and gets a CPC.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Automatic Disconnection of Supply (ADS)</ContentEyebrow>

          <ConceptBlock
            title="ADS — the default UK protective measure (Reg 411.1)"
            plainEnglish="ADS is not a device — it is a designed combination of earthing, bonding, the right protective device and a verified loop impedance. When all four are in place, the circuit clears a fault to earth before the touch voltage becomes dangerous."
            onSite="On the EIC schedule, the boxes you tick for ADS map to the four ingredients: protective earthing present, MET bonded, OPD/RCD selected, Zs measured against the device's maximum. Every Class I final circuit in a typical domestic installation relies on ADS."
          >
            <p>
              Reg 411.1 introduces ADS as the protective measure described in Section 411. It is
              built from <strong>(a)</strong> protective earthing of exposed-conductive-parts (Reg
              411.3.1.1), <strong>(b)</strong> protective equipotential bonding of
              extraneous-conductive-parts to the MET (Reg 411.3.1.2), <strong>(c)</strong> automatic
              disconnection by an OPD or RCD within Table 41.1 times (Reg 411.3.2), and{' '}
              <strong>(d)</strong> coordination with the system earthing arrangement (Reg 411.4.4
              TN, 411.5.3 TT or 411.6.3 IT). All four must be present for ADS to be in place —
              missing one means the protective measure is not demonstrably in place, and the cert
              cannot truthfully claim it.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>SELV and PELV (Section 414)</ContentEyebrow>

          <ConceptBlock
            title="SELV — Safety Extra-Low Voltage"
            plainEnglish="A circuit at or below band I voltage (≤ 50 V AC / 120 V DC ripple-free per Reg 414.1.1), fed by a safety isolating source, with no intentional connection to earth and complete electrical separation from any other circuit."
            onSite="Common SELV applications: 12 V LED downlights in zone 0 of a bath/shower, fountain submerged equipment, low-voltage doorbell systems, BA2 environments (children, schools). The source is a BS EN 61558-2-6 safety isolating transformer or a battery, not a domestic transformer plate."
          >
            <p>
              The three SELV requirements work together. First, the voltage limit (Reg 414.1.1): ≤
              50 V AC RMS or 120 V DC ripple-free. Second, the source (Section 414.3): a safety
              isolating transformer to BS EN 61558-2-6, a battery, or a motor-generator with
              isolated windings. Third, the earthing arrangement: NO intentional connection to earth
              on the secondary, and exposed-conductive-parts NOT connected to earth or to any
              protective conductor of another circuit. Lose any of the three and it is not SELV. Reg
              414.4.4 also requires basic protection (insulation, barriers, enclosures) where the
              nominal voltage exceeds 25 V AC / 60 V DC ripple-free, or where equipment is immersed.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="PELV — Protective Extra-Low Voltage"
            plainEnglish="Same band I voltage and same safety isolating source as SELV — but earth IS permitted on the secondary. Used where equipment needs functional earthing (EMC shielding, instrumentation reference) and the application is not in a SELV-mandatory location."
            onSite="Common PELV applications: industrial control panels with shielded screens, BMS systems, instrumentation cabinets, some medical equipment. Same Reg 414.1.1 voltage, same Section 414.3 source — the only difference from SELV is that the secondary may be earthed. Reg 414.4.4 still applies above 25 V AC."
          >
            <p>
              On the cert, the entry under Section 411/414 changes only by whether the secondary is
              intentionally earthed. SELV — no earth, no connection to any other protective
              conductor. PELV — earth permitted, exposed-conductive-parts may be connected to earth
              or to a CPC. Use SELV in zone 0 of a bath/shower, fountain zone 0 and BA2
              environments. Use PELV where the controls need a stable functional earth and the
              application is not in a SELV-mandatory location.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 414.1.1 — Voltage limits for SELV and PELV"
            clause="The protective measure of extra-low voltage by SELV or PELV is recognised where the nominal voltage cannot exceed the upper limit of voltage band I — 50 V AC (rms) or 120 V DC ripple-free."
            meaning="Band I is the absolute ceiling. Above it, the circuit is no longer SELV or PELV regardless of the source quality. Reg 414.4.4 then layers in a basic-protection requirement once the nominal voltage exceeds 25 V AC RMS or 60 V DC ripple-free, or where equipment is immersed — meaning insulation, barriers or enclosures must still be present at higher SELV/PELV voltages."
            cite="BS 7671:2018+A4:2026, Reg 414.1.1 / Reg 414.4.4"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>FELV — and why it is NOT a protective measure</ContentEyebrow>

          <ConceptBlock
            title="FELV (Reg 411.7) — extra-low voltage without safety isolation"
            plainEnglish="A circuit running at SELV/PELV voltage but lacking the safety-isolating source. The voltage is low; the safety guarantee is not."
            onSite='Spotting it: an autotransformer feeding 24 V controls, a single-winding ferro-resonant primary, anywhere the primary and secondary share metal or windings without explicit safety isolation per Section 414.3. If you would not bet on the source being "BS EN 61558-2-6 safety isolating", it is FELV.'
          >
            <p>
              Reg 411.7.1 defines FELV as the case where, for functional reasons, the circuit
              voltage is ≤ 50 V AC / 120 V DC ripple-free, but not all of the Section 414
              requirements for SELV or PELV are met, AND SELV / PELV is not strictly required. Reg
              411.7.4 forces the source to be either a transformer with at least simple winding
              separation OR a source complying with Section 414.3. Reg 411.7.3 then requires basic
              AND fault protection AT THE PRIMARY VOLTAGE — no shortcuts based on the secondary
              being 24 V. The fix is design: replace the autotransformer with a safety isolating
              transformer and the circuit becomes SELV (no earth) or PELV (earthed) — both genuine
              protective measures.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Equipment classes (IEC 61140)</ContentEyebrow>

          <ConceptBlock
            title="Class I, Class II and Class III — three protective philosophies"
            plainEnglish="Class I = earthed metal casing, fault protection by ADS via a CPC. Class II = double or reinforced insulation, no CPC, recognised by the double-square symbol. Class III = designed for SELV / PELV supply, voltage limit IS the protective measure."
            onSite="Most domestic appliances are Class I (kettles, ovens, washing machines, immersion heaters). Most consumer electronics and power tools are Class II (laptops, phone chargers, cordless drills, hair dryers). Class III is rare day-to-day — typically specialised equipment fed from a SELV / PELV supply (low-voltage tools in confined spaces, some medical, certain illuminated signs)."
          >
            <p>
              The three classes map to three different protective measures in BS 7671. Class I
              relies on Reg 411 ADS — the metal casing is connected via a CPC to the MET, and a
              fault to earth is cleared by the OPD or RCD within Table 41.1 times. Class II relies
              on Section 412 — double or reinforced insulation as the entire protective measure, no
              CPC, no earth path. Class III relies on Section 414 — the supply is SELV or PELV and
              the voltage limit itself is the protective measure. Reg 412.1.2 forbids relying on
              Class II as the SOLE protective measure on circuits with socket-outlets, LSCs, DCLs or
              cable couplers because one Class I plug-in defeats it.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Worked example — designing a domestic CU on TN-C-S</ContentEyebrow>

          <ConceptBlock
            title="Naming every protective conductor on a typical UK domestic"
            plainEnglish="A worked example pulls every Part 2 term into one picture — the cut-out, the MET, the CU, the bonded services and the final circuits — so each conductor goes on the cert with the right name."
            onSite="This is the exercise to walk through before you fill in any EIC. Sketch the cut-out, the tails, the MET, the bonding to gas and water, and the final-circuit CPCs. Label every conductor with its Reg before you start the schedule."
          >
            <p>
              <strong>1. Supply.</strong> TN-C-S (PME) cut-out with a 100 A BS 1361 cut-out fuse, 25
              mm&sup2; meter tails. The DNO supply is a combined PEN up to the cut-out, split into
              separate N and PE inside the consumer&apos;s installation.{' '}
              <strong>2. Earthing conductor.</strong> 16 mm&sup2; copper between the MET earth bar
              and the DNO supply earth terminal at the cut-out — sized per Reg 543.1.1 with the Reg
              542.3.1 minimum for a copper conductor with mechanical and corrosion protection.{' '}
              <strong>3. Main protective bonding.</strong> 10 mm&sup2; copper to the incoming gas
              service (within 600 mm of the meter outlet, before any branch, BS 951 clamp,
              &quot;Safety Electrical Connection&quot; label) AND 10 mm&sup2; copper to the incoming
              water service — sized per Reg 544.1.1 with the DNO 10 mm&sup2; minimum on TN-C-S where
              supply neutral is up to 35 mm&sup2;. <strong>4. Final-circuit CPCs.</strong> 1.5
              mm&sup2; CPC inside 2.5 mm&sup2; T&amp;E for sockets (Reg 543.1.1 / Table 54.7), 1.0
              mm&sup2; CPC inside 1.5 mm&sup2; T&amp;E for lighting. Each CPC terminates at every
              back-box earthing tag and every accessory earth terminal per Reg 411.3.1.1.{' '}
              <strong>5. Supplementary bonding.</strong> In the bathroom, omitted under Reg
              701.415.2 because all three conditions hold: every circuit meets disconnection times,
              every circuit has 30 mA RCD additional protection, and the gas/water services are
              bonded back to the MET. If any of the three failed, 4 mm&sup2; supplementary bonding
              would be installed (Reg 415.2.1 / 544.2). <strong>6. The EIC schedule.</strong> Each
              conductor goes on the cert with its correct name — earthing conductor, main protective
              bonding to gas, main protective bonding to water, CPCs per circuit. Naming them
              correctly is the cheapest QS pass on the form.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Calling the earthing conductor a CPC on the EIC"
            whatHappens='On the EIC schedule of test results, the conductor between the MET and the supply earth terminal is recorded as "CPC, 16 mm²". A QS reviewing the cert flags it: a CPC connects an exposed-conductive-part to the MET, not the MET to the means of earthing. The cert is technically wrong even though the install itself is fine.'
            doInstead="The conductor between the MET and the means of earthing is the EARTHING CONDUCTOR, sized per Reg 543.1.1 with Reg 542.3.1 minimums. Conductors out from the MET to exposed-conductive-parts are CPCs. Conductors from the MET to extraneous-conductive-parts are MAIN PROTECTIVE BONDING CONDUCTORS (Reg 544.1.1). Three different conductors, three different boxes on the cert. Get the names right and the rest of the schedule lines up automatically."
          />

          <CommonMistake
            title="Calling FELV a protective measure"
            whatHappens='A 24 V control circuit derived from an autotransformer is described on the EIC as "protected by extra-low voltage". There is no safety isolation between the 230 V primary and the 24 V secondary — a primary fault can drive 230 V onto the controls. The cert claims a protective measure that does not exist; the inspector codes it C2.'
            doInstead="FELV is not a protective measure. Either redesign with a safety isolating transformer (BS EN 61558-2-6) — making it SELV (no earth) or PELV (earthed) — or treat the 24 V circuit as low voltage and apply full basic and fault protection at the primary voltage per Reg 411.7.3. On the cert, do not record FELV as a protective measure; record the basic + fault protection that actually applies."
          />

          <CommonMistake
            title="Relying on Class II as the sole protective measure on a circuit with sockets"
            whatHappens="A designer specifies double-insulated cable and accessories on a small office socket circuit, omits the CPC at every socket and proposes that Class II is the sole protective measure. Reg 412.1.2 explicitly forbids this on any circuit with a socket-outlet, LSC, DCL or cable coupler — a user can plug in Class I equipment and defeat the measure."
            doInstead="Class II is a per-equipment protective measure, not a circuit-level one. On any circuit a user can change equipment on, ADS via CPC + OPD/RCD must be the primary measure. Class II equipment fed from that ADS-protected circuit is fine — the two measures coexist. The error is only when Class II is the SOLE measure on the whole circuit."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="EICR of a 1990s domestic — bonding mis-described"
            situation='An EICR you are reviewing records 16 mm² "CPC" from MET to supply earth terminal, and 6 mm² "CPC" from MET to incoming gas service. The actual install: 16 mm² earthing conductor and 6 mm² main protective bonding to gas. The TN-C-S supply has 25 mm² tails.'
            whatToDo="Two issues. First, the cert language is wrong — these are not CPCs. Re-record as 16 mm² earthing conductor (Reg 543.1.1 / 542.3.1) and 6 mm² main protective bonding (Reg 544.1.1). Second, the 6 mm² bonding is undersized for TN-C-S with 25 mm² tails. The DNO requirement on TN-C-S where supply neutral is up to 35 mm² is 10 mm² minimum. Recommend code C2 or C3 for the undersized bonding (depending on whether the rest of the equipotential zone is intact) and fix the cert language as a separate observation."
            whyItMatters="An EICR with mis-named conductors fails QS even when the install itself is fine. An EICR that misses an undersized main bond on TN-C-S misses a real safety issue. The two together are a typical inspector finding — get the Part 2 language right and the design errors stop hiding behind the wrong vocabulary."
          />

          <Scenario
            title="Process panel with a 24 V control circuit — SELV, PELV or FELV?"
            situation='A small process panel has a 24 V control circuit feeding relays, a PLC and a touchscreen. The 24 V is derived from a transformer marked "BS EN 61558-2-6". The secondary 0 V is connected to the panel earth bar for EMC reference. The customer asks you to record the controls as SELV on the cert.'
            whatToDo='Confirm the source first — BS EN 61558-2-6 is a safety isolating transformer, so the source meets Section 414.3. Voltage is 24 V AC, well under the Reg 414.1.1 50 V AC limit. The secondary 0 V is intentionally earthed — that excludes SELV. Record the controls as PELV: band I voltage, safety isolating source, earth permitted on the secondary. Reg 414.4.4 basic-protection requirement above 25 V does not bite at 24 V; ensure the 24 V conductors are still segregated from any 230 V conductors per Reg 528. Document on the cert: "Section 411/414 — PELV (Reg 414); source: BS EN 61558-2-6 safety isolating transformer; secondary intentionally earthed for functional reasons."'
            whyItMatters="Calling it SELV on the cert when the secondary is intentionally earthed is a Part 2 error that an inspector will pick up. Calling it FELV would be wrong in the other direction — the source IS safety-isolated, and the protective measure IS Section 414. Getting the term right is the difference between a defensible cert and a re-do."
          />

          <SectionRule />

          <ContentEyebrow>Quick reference — picking the right term</ContentEyebrow>

          <ConceptBlock
            title="The Part 2 cheat-sheet for cert language"
            plainEnglish="Most cert errors come from picking the wrong word. A short cheat-sheet you can run through before you fill in any schedule keeps the language tight and the QS quick."
            onSite="Conductor between MET and means of earthing → EARTHING CONDUCTOR (Reg 543.1.1 / 542.3.1). Conductor between MET and exposed-conductive-part → CPC (Reg 543.1.1). Conductor between MET and extraneous-conductive-part → MAIN PROTECTIVE BONDING (Reg 544.1.1). Conductor inside a special location tying parts together → SUPPLEMENTARY BONDING (Reg 415.2.1 / 544.2). Voltage ≤ 50 V AC, safety isolating source, no earth → SELV (Section 414). Same but earthed → PELV (Section 414). Voltage ≤ 50 V AC, no safety isolation → FELV (Reg 411.7) — NOT a protective measure."
          />

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Four protective conductors with four different jobs: CPC (Reg 543.1.1, exposed-conductive-parts to MET), earthing conductor (Reg 543.1.1 / 542.3.1, MET to means of earthing), main protective bonding (Reg 544.1.1, extraneous-conductive-parts to MET), supplementary bonding (Reg 415.2.1 / 544.2, local equipotential zone).',
              'Reg 411.3.1.1 verbatim: a CPC at every point in wiring and every accessory, except a pendant lampholder having no exposed-conductive-parts and suspended from such a point. No other exception.',
              'ADS (Reg 411) is the default UK protective measure. SELV and PELV (Section 414) are alternatives bound by Reg 414.1.1 (≤ 50 V AC / 120 V DC ripple-free) and Section 414.3 (safety isolating source). FELV (Reg 411.7) is NOT a protective measure.',
              'Class I = ADS via CPC. Class II = double or reinforced insulation (Section 412), no CPC. Class III = SELV / PELV supply. Reg 412.1.2 forbids Class II as the sole measure on circuits with sockets / LSCs / DCLs / couplers.',
              'Live part vs exposed-conductive-part vs extraneous-conductive-part — three terms, three protective treatments. Get the language right on the cert and the design and the EICR follow.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-2-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 New A2/A3/A4 definitions
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module2Section2;
