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
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';
import { videos } from '@/data/study-centre/video-library';

const inlineChecks = [
  {
    id: 'm4s1-basic-vs-fault',
    question:
      'Basic protection has failed — a live conductor has come into contact with the metal casing of a Class I appliance. Which protective measure is now responsible for keeping the user safe?',
    options: [
      'Fault protection — earthing, bonding and automatic disconnection of supply',
      'Basic protection — the damaged insulation will recover on its own',
      'No protective measure applies; the user must simply keep clear of the casing',
      'Functional earthing of the appliance keeps the user safe',
    ],
    correctIndex: 0,
    explanation:
      'BS 7671 layers protection: basic protection (Section 416 — insulation per Reg 416.2.1, barriers, enclosures) prevents contact in normal use; fault protection (Section 411) takes over once basic has been compromised. For ADS, fault protection is delivered by protective earthing + protective equipotential bonding + automatic disconnection (Reg 411.3.1.1, 411.3.1.2, 411.3.2).',
  },
  {
    id: 'm4s1-411-3-4-scope',
    question:
      'You are designing a new lighting circuit for a kitchen in a private dwelling. Under BS 7671:2018+A4:2026, must the circuit be RCD-protected?',
    options: [
      'No — Reg 411.3.3 only mandates RCDs on socket-outlet circuits rated up to 32 A',
      'Only where one or more of the lighting points sit inside a bathroom or shower zone',
      'Yes — Reg 411.3.4 (new in A4) requires 30 mA RCD protection for domestic luminaire final circuits',
      'Only where the circuit cables are buried in walls at a depth of less than 50 mm',
    ],
    correctIndex: 2,
    explanation:
      'Reg 411.3.4 is one of the headline A4 additions. Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires. It is independent of Reg 411.3.3 (sockets and mobile equipment) and applies whether or not the lighting points sit in a special location.',
  },
  {
    id: 'm4s1-tn-disconnection',
    question:
      'A 32 A TN final circuit with socket-outlets is protected by a Type B MCB. What is the maximum permitted disconnection time for ADS to be deemed effective?',
    options: ['0.2 s', '1 s', '5 s', '0.4 s'],
    correctIndex: 3,
    explanation:
      'Reg 411.3.2 / Table 41.1: in TN systems, final circuits with one or more socket-outlets rated up to 63 A — and final circuits up to 32 A supplying fixed connected current-using equipment — must disconnect within 0.4 s. 5 s applies to TN distribution circuits (Reg 411.3.2 NOTE); 1 s applies to TT distribution (Reg 411.3.2.4).',
  },
  {
    id: 'm4s1-tn-c-s-pen',
    question:
      'You are adding a new EV charging point to a domestic property fed from a TN-C-S (PME) supply. What does BS 7671 specifically prohibit you from doing in the EV circuit?',
    options: [
      'Including a PEN conductor in the EV charging circuit (Reg 722.312.2.1)',
      'Using an RCD with a rated residual operating current of 30 mA or less',
      'Using a Type A RCD on the EV charging circuit',
      'Bonding the EV charging equipment chassis to the consumer unit MET',
    ],
    correctIndex: 0,
    explanation:
      'Reg 722.312.2.1: a circuit supplying charging equipment for electric vehicles in a TN system shall NOT include a PEN conductor. Either provide a TN-S configuration to the EV (split N and PE before the EV circuit) or apply one of the alternative protective measures listed in Section 722 (e.g. open-PEN detection device, separate earth electrode). Reg 461.2 separately prohibits switching or isolating the PEN within TN-C / TN-C-S anywhere upstream.',
  },
  {
    id: 'm4s1-felv-not-protective',
    question:
      'A 24 V control circuit is derived from a 230 V auto-transformer (single winding tapped). The customer asks you to mark the circuit "SELV" on the cert. What is the right call?',
    options: [
      'Mark it SELV — the secondary voltage is below 50 V AC, which is all that matters',
      'Mark it PELV — earthing of an extra-low-voltage control circuit is always permitted',
      'Refuse — with no isolation between windings the circuit is FELV, which is not a protective measure',
      'Mark it FELV and rely on it as a recognised BS 7671 protective measure',
    ],
    correctIndex: 2,
    explanation:
      'A SELV / PELV source must provide AT LEAST simple separation between windings — a safety isolating transformer (BS EN 61558-2-6). An auto-transformer has shared windings — no isolation. The result is FELV, which BS 7671 explicitly does not recognise as a protective measure: every FELV circuit must have full basic + fault protection AT THE PRIMARY voltage (230 V), not at 24 V.',
  },
  {
    id: 'm4s1-rcd-type-ev',
    question:
      'You are wiring a 7 kW EV charge point. The charger has built-in 6 mA DC fault detection. Which RCD type is required UPSTREAM at the consumer unit?',
    options: [
      'Type AC, which is adequate for a modern domestic EV charging circuit',
      'Type B — it is always required for any EV charging installation',
      'No upstream RCD is needed — the charger handles all detection internally',
      'Type A — sufficient because the charger handles the DC residual itself',
    ],
    correctIndex: 3,
    explanation:
      'Where the EV charger has its own internal 6 mA DC fault detection (a "PCE with simple separation"), Type A upstream is sufficient. Type B is required only where the charger cannot handle smooth DC residual itself. Type AC is essentially obsolete domestically — it cannot detect pulsating DC produced by LED drivers, phone chargers and most consumer electronics. Always confirm against the EV-charger manufacturer\'s installation manual.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under Section 411 (Reg 411.3.1.1, 411.3.1.2, 411.3.2), the protective measure "automatic disconnection of supply" is built from four ingredients. Which option lists them correctly?',
    options: [
      'Basic protection, protective earthing, protective equipotential bonding, automatic disconnection in case of a fault',
      'Basic insulation, barriers, enclosures, and supplementary equipotential bonding',
      'Class II equipment, SELV, PELV, and automatic disconnection of supply',
      'RCD, MCB, fuse, and arc fault detection device (AFDD)',
    ],
    correctAnswer: 0,
    explanation:
      'Section 411 (BS 7671 ADS protective measure): ADS is basic protection (Section 416) plus fault protection by protective earthing (Reg 411.3.1.1), protective equipotential bonding (Reg 411.3.1.2) and automatic disconnection in case of a fault (Reg 411.3.2), applied per the system earthing arrangement (Reg 411.4.4 TN, 411.5.3 TT or 411.6.3 IT).',
  },
  {
    id: 2,
    question:
      'Which document is the prosecutorial route if an installation defect causes injury — and where does BS 7671 sit in that picture?',
    options: [
      'BS 7671 itself is the statutory route, and any departure from it is a criminal offence',
      'Building Regulations Part P only, as it is the sole statutory instrument for electrical work',
      'EAWR 1989 (and HSWA 1974) is the statutory route; BS 7671 compliance is the evidence used to demonstrate the duty was discharged',
      'The IET Code of Practice is the statutory route used to prosecute defective work',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 is non-statutory. Prosecution comes through EAWR 1989 (Reg 4 in particular) and HSWA 1974. BS 7671 compliance is the benchmark courts and HSE use to assess whether the statutory duty was discharged. Reg 120.3 permits a designed departure but the burden of justification then sits with the designer/installer.',
  },
  {
    id: 3,
    question:
      'A new domestic lighting circuit is wired on a Type B 6 A MCB with no RCD. From 15 April 2026 onwards, what BS 7671 observation code applies on an EICR?',
    options: [
      'C3 — improvement recommended only, as the missing RCD is a purely historic non-compliance',
      'No code applies, because domestic lighting circuits never require RCD protection at all',
      'C1 — danger present and immediate remedial action required before the circuit can be used',
      'C2 — potentially dangerous, since A4 makes 30 mA RCD protection of domestic luminaires mandatory',
    ],
    correctAnswer: 3,
    explanation:
      'A4 (published 15 April 2026, replacing A3 from 15 October 2026) makes 411.3.4 a mandatory ("shall") requirement for AC final circuits supplying luminaires within domestic (household) premises. GN3 (Section K) requires every observation to be coded C1 / C2 / C3 / FI; "satisfactory" overall is not permitted with any C1 or C2 present. A new dwelling lighting circuit installed without 30 mA RCD protection is non-compliant with the current edition — typically C2 (potentially dangerous) where the absence increases real-world shock risk, C3 where the install is historic and otherwise sound.',
  },
  {
    id: 4,
    question:
      'Reg 411.3.3 mandates 30 mA RCD additional protection on socket-outlets up to 32 A. Which exception does the regulation actually allow?',
    options: [
      'Category (b) sockets in other locations may be excepted by a documented risk assessment',
      'No exception at all — 30 mA RCDs are mandatory on every socket-outlet in every case',
      'An exception that applies to socket-outlets within dwellings (household premises) only',
      'An exception that applies only to industrial 110 V centre-tapped-earth (RLV) supplies',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 411.3.3 lists three categories. Only category (b) — sockets in other locations — is exceptable, and only where the risk assessment is documented, signed off by a skilled person (electrically) and attached to the EIC. (a) BA1/BA2 locations and (c) mobile equipment outdoors must always have 30 mA RCD additional protection.',
  },
  {
    id: 5,
    question:
      'In a TN system, an installer measures Zs = 1.43 Ω at the furthest point of a 32 A Type B MCB circuit. Reference Zs (corrected) for ADS within 0.4 s on a Type B 32 A is approximately 1.37 Ω. What is the right call?',
    options: [
      "Pass — at 1.43 Ω against 1.37 Ω it is close enough to accept",
      'Re-test using a long-lead Zs method to obtain a lower reading',
      'Fail — measured Zs exceeds the maximum permitted value, so disconnection within the required time cannot be demonstrated; redesign or add an RCD to provide ADS',
      'Increase the MCB rating to relax the maximum permitted Zs limit',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 makes verification of EFLI the primary evidence that Reg 411.3.2 disconnection times can be met. If measured Zs exceeds the published maximum for that device (Reg 411.4.4 / OSG / manufacturer data), ADS via the MCB is not demonstrable. The fix is design — supplementing with a 30 mA RCD lets you rely on the RCD operating-time route; raising MCB rating breaks coordination with the cable.',
  },
  {
    id: 6,
    question: 'Which combination correctly describes SELV under Section 414?',
    options: [
      'Up to 50 V AC / 120 V DC, with an earthed midpoint and basic protection by enclosure only',
      'Up to 230 V AC, fed by an isolating transformer and earthed at the secondary winding',
      'Functional earthing of the secondary only, with no electrical separation from other circuits',
      'Up to 50 V AC / 120 V DC, no earth connection, fed by a safety isolating source per Reg 414.4.4',
    ],
    correctAnswer: 3,
    explanation:
      'SELV is band I (≤50 V AC / 120 V DC ripple-free), with no earth reference and complete electrical separation from any other circuit. The source must be a safety isolating transformer (BS EN 61558-2-6) or equivalent. Reg 414.4.4 also requires basic protection where the nominal voltage exceeds 25 V AC / 60 V DC ripple-free or where equipment is immersed.',
  },
  {
    id: 7,
    question:
      'A Class II portable luminaire (no earth terminal, double square symbol) is being inspected. Which test is NOT required and which observation would warrant a code?',
    options: [
      'Earth continuity not required; an added unauthorised earth connection would be coded (Section 412)',
      'Continuity of the CPC is still required, and a missing earth connection would be coded C1',
      'The insulation resistance test is not required for this Class II double-insulated luminaire',
      'No electrical tests apply to Class II equipment during inspection and testing at all',
    ],
    correctAnswer: 0,
    explanation:
      'The Section 412 protective measure (double / reinforced insulation, Reg 412.1.2) is invalidated the moment an earth path is introduced — the measure relies on no single earth-fault path. Insulation resistance testing is still required during initial verification; earth continuity is not, because there is no CPC to verify.',
  },
  {
    id: 8,
    question:
      'Which protective measure should NOT be used as the sole protective measure on a circuit feeding a socket-outlet that the user can change equipment on?',
    options: [
      'Automatic Disconnection of Supply (ADS) using earthing, bonding and a protective device',
      'Separated Extra-Low Voltage (SELV) from a safety isolating source feeding the circuit',
      'Double or reinforced insulation as the sole measure (Reg 412.1.2), defeated by a Class I plug-in',
      '30 mA RCD additional protection applied to the socket-outlet final circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 412.1.2 explicitly forbids using double / reinforced insulation as the sole protective measure on any circuit that includes a socket-outlet with earthing contact, LSC, DCL, cable coupler, or anywhere the user can change equipment without authorisation. The reason is that the protective measure depends on the entire circuit being Class II — one Class I plug-in defeats it.',
  },
];

const faqItems = [
  {
    question: 'Is the 411.3.4 luminaire RCD requirement retrospective on existing installations?',
    answer:
      'No — Reg 411.3.4 applies to new design and new circuits installed under BS 7671:2018+A4:2026 (in force 15 April 2026). On an EICR of an older installation it is reported as a deviation from the current edition; per GN3, every observation gets a single classification (C1, C2, C3 or FI) — typically C3 for a historic install where there is no other risk factor, but C2 where the absence of RCD increases real-world risk (e.g. damaged accessories, extensive metal-bodied luminaires).',
  },
  {
    question: 'Does 411.3.4 apply to commercial or industrial lighting?',
    answer:
      'No. Reg 411.3.4 is scoped to "domestic (household) premises". Commercial / industrial luminaire circuits remain governed by Reg 411.3.3 (sockets ≤32 A) and the wider 30 mA additional-protection rules (e.g. lighting accessible to the public, sauna circuits, agricultural). Always check Part 7 for the location.',
  },
  {
    question: 'When should I rely on SELV rather than ADS?',
    answer:
      'SELV is the right choice where reducing voltage below the touch-current threshold is more reliable than disconnection: bath/shower zone 0, fountain zone 0, equipment in reach of children (BA2), some medical scenarios. ADS is the default for general fixed installations because its infrastructure (earthing, bonding, devices) already exists.',
  },
  {
    question: 'Why is FELV NOT a protective measure?',
    answer:
      'FELV runs at extra-low voltage but lacks safety isolation from the higher-voltage primary. A primary fault can drive primary voltage onto the FELV side, defeating the voltage-limit assumption. FELV circuits must therefore be designed with full basic + fault protection at the primary voltage, not at the FELV voltage.',
  },
  {
    question: 'How do I prove ADS disconnection times on site?',
    answer:
      'GN3 names Zs verification as the primary evidence that Chapter 41 disconnection times can be met. Measure Ze at origin, calculate Zs = Ze + R1+R2 (or measure Zs directly), correct for conductor temperature, and compare to the maximum value for the protective device per Reg 411.4.4 / OSG App / manufacturer data. RCD operation is verified separately at IΔn and 5 IΔn.',
  },
  {
    question: 'Can I use a documented risk assessment to omit RCD on a domestic luminaire circuit?',
    answer:
      'No. The 411.3.3 risk-assessment exception only applies to category (b) — non-domestic socket-outlets in other locations. Reg 411.3.4 (luminaire circuits in domestic premises) provides no equivalent exception: the requirement is unconditional within scope.',
  },
  {
    question: 'Why does BS 7671 forbid switching the PEN in a TN-C-S installation?',
    answer:
      'Reg 461.2 prohibits isolating or switching the PEN in TN-C and TN-C-S because an open PEN with load on the system causes the local earth potential to rise toward line voltage. Every Class I exposed metal part bonded to the MET will sit at that elevated potential — touching the kettle and the kitchen tap simultaneously becomes the fault path. The risk is invisible to a basic insulation test and only shows up under load. Reg 722.312.2.1 (A4) extends the rule to EV charging: no PEN at all in the EV circuit on TN supplies, because the conductive vehicle body amplifies the touch-current risk.',
  },
  {
    question: 'When is supplementary equipotential bonding still required in a bathroom?',
    answer:
      'Reg 701.415.2 lets you omit supplementary bonding in a bathroom (location containing a bath or shower) ONLY if all three of the following hold: (a) every circuit in the location meets its disconnection time, (b) every circuit has 30 mA RCD additional protection, and (c) all extraneous-conductive-parts are reliably bonded back to the MET. Miss any one — supplementary bonding goes back in, sized per Reg 415.2.1 / 544.2 (4 mm² minimum unprotected, 2.5 mm² minimum protected).',
  },
  {
    question: 'Why is RLV (110 V CTE) chosen over a 230 V supply on a construction site?',
    answer:
      'Construction sites are environment AD3 / AD4 (water) / AG3 (mechanical impact). Cables get cut, ploughed, dragged through puddles. The 110 V centre-tapped supply puts each line conductor at 55 V to earth — significantly below the 230 V touch-current threshold. A bare line conductor against earth therefore presents a much lower shock current than the same fault at 230 V. Reg 411.8.3 requires fault protection by OPD or RCD with 5 s disconnection and full earthing of exposed-conductive-parts; Reg 411.8.4.1 requires a double-wound isolating transformer to BS EN IEC 61558-1 / BS EN 61558-2-23 as the source.',
  },
];

const BS7671Module4Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Electric Shock Protection Methods | BS 7671:2018+A4:2026 | Module 4.1',
    description:
      'How BS 7671:2018+A4:2026 layers shock protection — basic protection, fault protection, ADS, RCDs, SELV/PELV and Class II — including the new Reg 411.3.4 luminaire RCD requirement.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Updated for A4:2026"
            title="Protection against electric shock"
            description="Two layers of defence — basic and fault protection — and the four protective measures the regulations actually recognise. Includes the headline A4 change (Reg 411.3.4 luminaire RCD) and how the inspector evidences ADS on site."
            actions={
              <>
                <RegBadge>411.3.4</RegBadge>
                <RegBadge>412.1.2</RegBadge>
                <RegBadge>414.11</RegBadge>
                <AmendmentBadge regs={['411.3.4']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 layers shock protection: basic protection (insulation, barriers, enclosures — Section 416) plus fault protection (earthing + bonding + automatic disconnection — Reg 411).',
              'ADS is the default UK measure. SELV, PELV and Class II (Sections 412 and 414) are alternatives for specific risk profiles. FELV is NOT a protective measure.',
              'A4:2026 adds Reg 411.3.4 — within domestic premises, AC final circuits supplying luminaires must have 30 mA RCD additional protection.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the four BS 7671-recognised protective measures and pick the right one for a given environment.',
              'Build the four ingredients of ADS (Section 411 — Reg 411.3.1.1, 411.3.1.2, 411.3.2) and list the maximum disconnection times in TN and TT systems.',
              'Apply Reg 411.3.3 (sockets) and the new Reg 411.3.4 (domestic luminaires) correctly, including which exceptions are available.',
              'Distinguish TN-S, TN-C-S (PME / PNB), TT and IT system earthing, identify which Reg series applies (411.4 / 411.5 / 411.6) and why TN-C-S forbids switching the PEN (Reg 461.2 / 722.312.2.1).',
              'Distinguish SELV, PELV and FELV by their earthing arrangement, source requirement (Section 414.3) and why FELV (Reg 411.7) is not a protective measure.',
              'Apply reduced low voltage (Reg 411.8) and supplementary equipotential bonding (Reg 415.2.1) to high-risk environments, and choose between them rather than always reaching for ADS.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Two layers of defence</ContentEyebrow>

          <ConceptBlock
            title="Basic protection vs fault protection"
            plainEnglish="Basic protection stops you ever touching a live part in normal use. Fault protection takes over the moment basic has failed — typically a live conductor in contact with a metal enclosure."
            onSite="Every Class I appliance you fit relies on both layers being intact: the cord and casing are basic; the CPC, bonding and breaker are fault. If either is missing, the protection is not in place."
          >
            <p>
              Section 416 lists the basic-protection methods: insulation of live parts, barriers,
              enclosures, obstacles and placing out of reach. Reg 411 then describes the
              fault-protection layer — protective earthing, protective equipotential bonding and
              automatic disconnection in case of a fault. The two layers are independent on purpose:
              defeating one (a damaged enclosure, a missing CPC) leaves the other still fighting.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Automatic Disconnection of Supply (ADS)</ContentEyebrow>

          <ConceptBlock
            title="The four ingredients of ADS"
            plainEnglish="ADS isn't a device — it's a designed combination of earthing, bonding, the right protective device and a verified loop impedance."
            onSite="On the EIC schedule, the boxes you tick for ADS map to the four ingredients: protective earthing present, MET bonded, OPD/RCD selected, Zs measured."
          >
            <p>
              Section 411 defines ADS as basic protection (per Section 416) plus fault protection
              provided by <strong>(a)</strong> protective earthing of exposed-conductive-parts (Reg
              411.3.1.1), <strong>(b)</strong> protective equipotential bonding of
              extraneous-conductive-parts to the main earthing terminal (Reg 411.3.1.2),
              <strong> (c)</strong> automatic disconnection by an overcurrent protective device or
              RCD (Reg 411.3.2), and <strong>(d)</strong> coordination of these with the system
              earthing arrangement (Reg 411.4.4 TN, 411.5.3 TT or 411.6.3 IT).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.1.1 — Protective earthing"
            clause="Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point."
            meaning="A CPC at every point and every accessory is the legal default. The lampholder exception is narrow: pendant lampholder, no exposed metal. Replace it with a metal-bodied luminaire or downlight and the CPC must be present and connected."
            cite="BS 7671:2018+A4:2026, Reg 411.3.1.1 (p.66)"
          />

          <ConceptBlock
            title="Maximum disconnection times (Reg 411.3.2 / Table 41.1)"
            plainEnglish="0.4 s for TN circuits with sockets up to 63 A and TN circuits up to 32 A supplying fixed equipment. 5 s for TN distribution. 1 s for TT distribution."
            onSite="The numbers don't move per device — they're system-and-circuit numbers. The OPD or RCD has to deliver them at the measured Zs. Above the limit and the protective measure is not demonstrably in place — that's a design problem, not a test problem."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Additional protection — the RCD layer</ContentEyebrow>

          <ConceptBlock
            title="30 mA RCDs on top of ADS — Reg 411.3.3 and the new 411.3.4"
            plainEnglish="Additional protection by a 30 mA RCD is now mandatory on most socket-outlet circuits up to 32 A, on outdoor mobile equipment, AND — new in A4 — on all AC final circuits supplying luminaires in domestic premises."
            onSite="Treat 411.3.4 as the headline A4 change for domestic certification. A new dwelling lighting circuit on an MCB without RCD is non-compliant from 15 April 2026."
          >
            <p>
              Reg 411.3.3 covers (a) sockets ≤32 A used by ordinary persons or children, (b) sockets
              ≤32 A in other locations, and (c) mobile equipment ≤32 A outdoors. Only (b) can be
              excepted via a documented risk assessment by a skilled person (electrically), and the
              assessment must accompany the EIC. Reg 411.3.4 — new in A4 — has no equivalent
              exception within domestic (household) premises.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.4 — Additional requirements for circuits with luminaires (NEW IN A4)"
            clause="Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning="Mandatory ('shall'), unconditional within scope, no risk-assessment exception. Applies to every AC final circuit feeding luminaires inside a private dwelling — not just bathroom or kitchen, the whole property."
            cite="BS 7671:2018+A4:2026, Reg 411.3.4 (in force from 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <VideoCard
            url={videos.circuitBreakersDontProtectPeople.url}
            title={videos.circuitBreakersDontProtectPeople.title}
            channel={videos.circuitBreakersDontProtectPeople.channel}
            duration={videos.circuitBreakersDontProtectPeople.duration}
            topic="Watch · Why MCBs alone don't stop electric shock"
            caption="The Engineering Mindset reinforces why Reg 411.3.3 / 411.3.4 require 30 mA RCD additional protection on top of MCB-led ADS — MCBs trip on overload (tens to hundreds of amps), RCDs trip on imbalance between line and neutral (milliamps). The two protect against fundamentally different failure modes: overload heating versus user-touching-a-fault, which is why BS 7671 stacks them rather than treating either as a substitute for the other."
          />

          <SectionRule />

          <ContentEyebrow>System earthing — TN, TT, IT (and PNB)</ContentEyebrow>

          <ConceptBlock
            title="Why the system earthing arrangement decides everything"
            plainEnglish="The same 230 V circuit, on TN-S vs TT vs IT, has completely different fault paths, different Zs targets, and different acceptable protective devices. The system earthing arrangement isn't a label — it's the entire fault-current model."
            onSite="Reg 411.3 hands you off to 411.4 (TN), 411.5 (TT) or 411.6 (IT). The right reg is the one that matches what's at the cut-out. Get this wrong on the EIC and the disconnection-time test you ran is meaningless — it was the right number, against the wrong system."
          >
            <p>
              In a <strong>TN system</strong> (Reg 411.4) the source neutral is earthed and the
              installation's exposed-conductive-parts are connected back to that earth via a
              dedicated CPC. Reg 411.4.4 sets the Zs ≤ U₀ × Cmin / Ia condition — the fault loop
              impedance must be low enough that the OPD or RCD interrupts within Table 41.1's time.
              TN-S keeps protective and neutral conductors fully separate from the source; TN-C
              combines them as a PEN throughout (now rare in UK installations beyond the cut-out);
              TN-C-S (PME) is combined upstream of the cut-out and split into separate N and PE
              inside the consumer's installation.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="TN-C-S (PME / PNB) — the dominant UK arrangement"
            plainEnglish="In TN-C-S, the PEN conductor brings combined protective-earth + neutral up to the cut-out. Inside the installation, MET and N are tied together, then split. PNB is the new A4 cert-form name for a TN-C-S where there's only one connection point to true earth."
            onSite="A4:2026 introduces 'TN-C-S (PNB)' as an explicit cert-form option. The reasons matter for fault analysis: a broken PEN (open PEN) above the property elevates the MET and every Class I exposed metal part to near-line voltage. That's why EV charging in TN-C-S has its own A4 prohibition — Reg 722.312.2.1."
          >
            <p>
              Reg 461.2 is unambiguous: in TN-C and TN-C-S systems, the PEN conductor SHALL NOT be
              isolated or switched. Putting a switch or isolator in the PEN line creates the
              open-PEN failure that is the single most dangerous mode of TN-C-S. An open PEN with
              load on the system drives the local earth potential up — every CPC-connected exposed
              metal part rises with it. Reg 722.312.2.1 (new in A4) extends this to EV charging: the
              EV-charging circuit in a TN system shall not include a PEN conductor at all, because
              of the heightened touch-current risk in vehicles.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="TT and IT — when the supply isn't TN"
            plainEnglish="TT means the installation has its own separate earth electrode, with no protective conductor from the supply (e.g. caravans, agricultural buildings, properties without DNO earth). IT is rare — used in continuity-critical sites (theatres, hospital ITUs) where a first earth fault must NOT cause disconnection."
            onSite="On TT, RCDs are essentially mandatory because Ze is too high to give ADS via OPD alone. Reg 411.5.3 sets the RCD condition: Ra × IΔn ≤ 50 V. On IT, Reg 411.6.3 lists the permitted devices: insulation monitoring devices (IMDs), residual-current monitoring devices (RCMs), insulation-fault location systems (IFLS), OPDs and RCDs."
          >
            <p>
              Reg 411.5.3 (TT with RCD): the disconnection time shall meet Reg 411.3.2.2 or
              411.3.2.4 (1 s for distribution, 0.4 s for final), and Ra × IΔn ≤ 50 V — Ra being the
              sum of the earth-electrode and protective-conductor resistance back to exposed metal.
              Reg 411.5.4 (TT with OPD only) requires Zs × Ia ≤ U₀, the same form as TN but with the
              higher Ra of a separate electrode. Reg 411.6.3 (IT) requires either continuous
              insulation monitoring or, where the second fault occurs, automatic disconnection
              meeting the same Table 41.1 times.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>The alternatives to ADS</ContentEyebrow>

          <ConceptBlock
            title="SELV and PELV (Section 414)"
            plainEnglish="Both limit the system to band I voltage (≤50 V AC / 120 V DC ripple-free) and require a safety-isolating source. SELV has no intentional connection to earth; PELV does."
            onSite="Use SELV where you don't want any earth path on the secondary (bath zone 0, fountain zone 0, equipment in reach of children). Use PELV where the equipment needs functional earthing, e.g. EMC shielding on a control system."
          >
            <p>
              Reg 414.11 limits the SELV/PELV circuit to the upper limit of voltage band I — 50 V AC
              RMS or 120 V DC ripple-free. Reg 414.4.4 still requires basic protection (by
              insulation per Section 416, or barriers/enclosures per Reg 416.2.1) where the nominal
              voltage exceeds 25 V AC / 60 V DC ripple-free, or where equipment is immersed.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Double or reinforced insulation — Class II (Section 412)"
            plainEnglish="Two independent insulation layers (or one reinforced layer) replace the protective earthing route entirely. Recognised by the double-square symbol on the equipment."
            onSite="Reg 412.1.2 forbids you from relying on Class II as the SOLE protective measure on any circuit a user can change equipment on — sockets, LSCs, DCLs, cable couplers. One Class I plug-in defeats the whole measure. Class II is great as a per-equipment choice, weak as a circuit-level choice."
          />

          <SectionRule />

          <ContentEyebrow>
            FELV — and why BS 7671 won't let you call it a protective measure
          </ContentEyebrow>

          <ConceptBlock
            title="FELV (Reg 411.7) — extra-low voltage without safety isolation"
            plainEnglish="A circuit that runs at SELV/PELV voltage but lacks the safety-isolating source. The voltage is low; the safety guarantee isn't."
            onSite="Spotting it: an auto-transformer feeding 24 V controls. A 12 V LED driver with a single-winding ferro-resonant primary. Anywhere the primary and secondary share metal or windings without explicit safety isolation per Section 414.3 / BS EN 61558-2-6."
          >
            <p>
              Reg 411.7.1 defines FELV as the case where, for functional reasons, the circuit
              voltage is ≤ 50 V AC / 120 V DC ripple-free, but not all of Section 414's requirements
              for SELV or PELV are met, and SELV / PELV is not strictly required. Reg 411.7.4 forces
              the source to be either a transformer with at least simple winding separation OR a
              source complying with Section 414.3. If neither, the circuit isn't FELV — it's just a
              low-voltage circuit operating at extra-low voltage. Reg 411.7.3 then requires basic
              AND fault protection AT THE PRIMARY VOLTAGE — no shortcuts based on the secondary
              being 24 V.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <ConceptBlock
            title="Reduced low voltage (RLV) — Reg 411.8 — the construction-site & workshop measure"
            plainEnglish="A 110 V centre-tapped (CTE) supply. Each line conductor sits at 55 V to earth. Lower touch-current risk in environments where cables get damaged routinely — sites, demolition, hot-dirty workshops."
            onSite="The yellow 110 V transformer in every site cabin is exactly this. Reg 411.8.4.1 sets the source: a double-wound isolating transformer to BS EN IEC 61558-1 / BS EN 61558-2-23, or a motor-generator set with isolated windings. Reg 411.8.3 still requires fault protection — an OPD or RCD on each line conductor with 5 s disconnection."
          >
            <p>
              RLV is not a panacea — it is a controlled-risk lower-voltage measure for high-damage
              environments. Reg 411.8.1.1 makes it explicit: where, for functional reasons, ELV is
              impracticable and SELV / PELV isn't needed, RLV may be used. Reg 411.8.3 sets the
              disconnection: 5 s for the highest line-to-earth voltage in the system (typically 55 V
              on a centre-tapped 110 V), with all exposed-conductive-parts earthed. Plug-and-socket
              arrangements use the dedicated 110 V coloured connector system (BS EN 60309-2) so 110
              V kit can never be inadvertently plugged into 230 V.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Supplementary equipotential bonding (Reg 415.2.1)</ContentEyebrow>

          <ConceptBlock
            title="When ADS isn't enough on its own"
            plainEnglish="Where Zs can't be guaranteed low enough to deliver the disconnection time, supplementary bonding ties together every accessible exposed-conductive-part and extraneous-conductive-part so the touch voltage stays below the dangerous threshold even during a fault."
            onSite="Bathrooms historically required it on every job. Today most BS 7671 bathrooms can omit supplementary bonding if all three of these are true: (a) all circuits in the location meet disconnection times, (b) all circuits have 30 mA RCD additional protection, and (c) all extraneous-conductive-parts are reliably bonded back to the MET. Miss any one — supplementary bonding goes back in."
          >
            <p>
              Reg 415.2.1 sets the bonding-conductor sizing rules. The minimum cross-sectional area
              for a supplementary bonding conductor connecting two exposed-conductive-parts is
              determined by Reg 544.2 — but the floor is 4 mm² where mechanical protection is not
              provided, or 2.5 mm² where it is. The conductor must connect either two
              exposed-conductive-parts, two extraneous-conductive-parts, or an
              exposed-conductive-part to an extraneous-conductive-part — completing the
              equipotential zone within the location.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating Reg 411.3.4 like 411.3.3"
            whatHappens="Designer omits 30 mA RCD on a domestic lighting circuit on the basis that 'lighting isn't a socket', falling back on Reg 411.3.3. EICR coded C2 — wrong code, wrong reasoning, both flagged at the next inspection."
            doInstead="Reg 411.3.4 is a separate, unconditional rule for domestic luminaire circuits. From 15 April 2026, every AC final lighting circuit in a dwelling is on a 30 mA RCD or RCBO — no exception, no risk-assessment route. Default to RCBOs at the consumer unit."
          />

          <CommonMistake
            title="Calling FELV a protective measure"
            whatHappens="A 24 V control circuit derived from an autotransformer is described on the EIC as 'protected by extra-low voltage'. There is no safety isolation between the 230 V primary and the 24 V secondary — a primary fault can drive 230 V onto the controls."
            doInstead="FELV is not a protective measure. Either redesign with a safety isolating transformer (making it SELV or PELV) or treat the 24 V circuit as low voltage and apply full basic + fault protection at the primary voltage."
          />

          <CommonMistake
            title="Switching or isolating the PEN in a TN-C-S installation"
            whatHappens="A handyman fits a 'whole-house isolator' that breaks both lines AND the incoming PEN at the cut-out — or wires the main switch incorrectly so it interrupts the PEN. Reg 461.2 forbids this in TN-C and TN-C-S systems. With load on the property and an open PEN, every Class I exposed metal part rises to near-line voltage. The result is a fatal-shock risk that does not show on a basic insulation-resistance test."
            doInstead="Never switch, isolate, fuse or break a PEN conductor in TN-C / TN-C-S. The PEN is always continuous from the DNO transformer star point through to the consumer's MET. Inside the installation, N and PE are split AT the MET; switching may disconnect line(s) and (where required) the post-MET neutral, but never the PEN. Reg 722.312.2.1 (A4) goes further — no PEN at all in EV charging circuits on TN supplies."
          />

          <SectionRule />

          <ContentEyebrow>RCDs in practice — picking the right type</ContentEyebrow>

          <ConceptBlock
            title="Type AC, A, F and B — getting the waveform right"
            plainEnglish="The RCD type is about WHAT shape of residual current it can detect. Pick the wrong type and you've fitted a device that's blind to the very fault it's meant to clear."
            onSite="The 4 types in plain English: Type AC sees only sinusoidal AC residual — now obsolete domestically because nearly everything plugged in produces some pulsating DC. Type A sees AC plus pulsating DC (most domestic / commercial). Type F adds composite high-frequency residual (single-phase VSDs and inverter-driven appliances). Type B adds smooth DC residual (three-phase VSDs, EV chargers without internal DC detection, larger PV / battery hybrids)."
          >
            <p>
              The mistake to avoid is treating "RCD" as a single product. A single 100 mA Type AC
              upstream RCD on a board feeding modern LED lighting, an air-source heat pump and an EV
              charger may already be defeated — pulsating DC from the lighting drivers and smooth DC
              from the EV charger fall outside its detection window. Confirm against the equipment
              manufacturer's installation guidance before you commit a type — the wrong choice is an
              EICR observation waiting to happen and is not visible without type-specific testing.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Worked example — designing a kitchen radial under A4</ContentEyebrow>

          <ConceptBlock
            title="From load to compliant design in eight steps"
            plainEnglish="A standard kitchen radial pulls together everything in this section: design current, cable selection, MCB rating, Zs target, RCD additional protection, A4 luminaire rule, and the cert entries that demonstrate it."
            onSite="This is the design log every cert needs to be defensible. If a future inspector asks 'how did you arrive at the protective device?' the answer is the eight-step record below — written before the install, not reconstructed afterwards."
          >
            <p>
              <strong>1. Load and design current (Ib).</strong> Kitchen socket ring with hob,
              microwave, dishwasher, kettle, fridge — assess by diversity; assume a worst-case ring
              sustained loading of ~25 A. <strong>2. Cable selection.</strong> 2.5 mm² T&E clipped
              direct, Reference Method C — App 4 gives Iz nominal ≈ 27 A (after grouping and ambient
              correction). <strong>3. MCB rating.</strong> Type B 32 A on the ring standard, but
              check Reg 433.1.1: In ≥ Ib (32 ≥ 25 ✓), In ≤ Iz only if you accept the ring topology
              (BS 7671 ring rules). <strong>4. Disconnection time target.</strong>
              0.4 s for a sub-32 A ring final on TN. <strong>5. Zs target.</strong> From the Type B
              32 A row of Appendix 3 / OSG: Zs(max) = 1.37 Ω at 230 V (corrected). Plan to measure ≤
              1.10 Ω at the furthest point to leave a safety margin.{' '}
              <strong>6. RCD additional protection.</strong> 30 mA on every socket circuit — Reg
              411.3.3.
              <strong>7. The A4 luminaire rule.</strong> Even if the kitchen radial is sockets only,
              any kitchen lighting circuit (under-cabinet LEDs, downlights) is a separate luminaire
              final circuit and must also be on a 30 mA RCD or RCBO — Reg 411.3.4.
              <strong>8. Cert entries.</strong> EIC schedule of test results: measured Zs, Ze,
              R1+R2, RCD operating time at IΔn and 5 IΔn, MCB type and rating, RCD type and rating.
              The EIC schedule of inspection ticks Sections K (RCD additional protection) and L
              (luminaire RCD per A4) explicitly.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Rewire of a 1970s semi — A4 in force"
            situation="Customer wants 12 lighting points on a single circuit through a Type B 6 A MCB at the existing consumer unit. The board is a 17th edition split-load with main switch + 30 mA RCD on socket-circuits only — lighting is on the non-RCD bus."
            whatToDo="Under A4 Reg 411.3.4 the new lighting circuit must have 30 mA additional protection. The simplest route is an RCBO on the lighting way. If the existing CU can't accept RCBOs of the required type, replace the CU — partial-board RCD added retrospectively is rarely acceptable on a notified rewire."
            whyItMatters="The cert (EIC) records compliance with the in-force edition. Issuing an EIC against A4:2026 with a non-RCD-protected luminaire circuit is a documented departure under Reg 120.3 and the burden of justification falls on the designer. In a household with insurers, mortgage providers and BPGs in the loop, that's a hard letter to write."
          />

          <Scenario
            title="EV charger added to a 5-year-old TN-C-S consumer unit"
            situation="Customer has a 7 kW single-phase tethered EV charger on order. The charger spec sheet states 'integrated 6 mA DC fault detection per BS EN 61851'. Existing CU has a 100 A main switch and Type AC 30 mA RCDs on every busbar — a 3-year-old metal split-load board."
            whatToDo="Don't add the EV charger to the existing Type AC bus — Type AC is blind to the smooth DC residuals an EV install can produce in fault. Fit a dedicated way: Type A 32 A RCBO upstream of the charger (the charger's own 6 mA DC detection covers the smooth DC route inside it). Run the EV circuit as TN-S — split N and PE at the CU and bring only PE to the charger; do NOT include a PEN in the EV circuit. Add an open-PEN protection device (PEN-fault relay) at the charger position to cover the TN-C-S open-PEN failure mode."
            whyItMatters="Type B RCDs cost 4-5× a Type A and the manufacturer's instructions are the binding spec. If the charger handles DC residual itself, Type A is correct and over-engineering with Type B isn't free. If it doesn't, Type B is mandatory. The EV-circuit PEN prohibition (Reg 722.312.2.1, A4) is non-negotiable on TN — it's the single most-tested point in the EV-charging sections of the assessment."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="Picking the right protective measure for a circuit"
            plainEnglish="Walk a four-step decision tree. (1) What's the touch-current risk profile of the load? (2) What's the system earthing? (3) Can ADS be demonstrated? (4) Are there special-location overrides?"
            onSite="(1) Class I Power equipment in normal-occupancy = ADS default. Bath / shower / pool zone 0 = SELV. Equipment user can change = NOT Class II as sole measure. Construction site / workshop with high cable-damage risk = RLV. (2) TN with low Ze → ADS via OPD straightforward. TT → ADS typically via RCD (Reg 411.5.3 limb b). IT → ADS only on second fault (Reg 411.6). (3) Verify Zs ≤ Zs(max) per Appendix 3 / OSG. (4) Section 701-753 for bathrooms, pools, EVs etc — these may require additional protection beyond the general regulations."
          >
            <p>
              The decision tree gets you from 'what's the right protective measure?' to 'spec it and
              verify it' in seconds. For typical UK domestic on TN-C-S: ADS via 30 mA RCBO
              everywhere, with Reg 411.3.4's domestic luminaire rule (A4) ensuring lighting circuits
              get the same protection as sockets. For commercial: same logic, more rigorous
              documentation, more attention to special locations and load types.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Two layers: basic protection (Section 416) plus fault protection (Reg 411). ADS is the default fault-protection measure for fixed UK installations.',
              'ADS = protective earthing (411.3.1.1) + protective equipotential bonding (411.3.1.2) + automatic disconnection by OPD/RCD (411.3.2) + system earthing coordination (411.4.4 TN / 411.5.3 TT / 411.6.3 IT).',
              'Disconnection times: TN final-circuit ≤ 0.4 s (Reg 411.3.2 / Table 41.1), TN distribution ≤ 5 s, TT distribution ≤ 1 s (Reg 411.3.2.4). Verified by Zs measurement (GN3).',
              'A4:2026 — Reg 411.3.4 mandates 30 mA RCD additional protection for AC final circuits supplying luminaires in domestic (household) premises. No exceptions.',
              "Designer's decision tree: (1) Touch-risk profile? (2) System earthing? (3) Can ADS be demonstrated? (4) Special-location overrides? Walk it on every circuit.",
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 Overcurrent protection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module4Section1;
