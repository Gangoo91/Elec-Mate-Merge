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
  AmendmentDiff,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm1s4-a4-effective-date',
    question:
      'When did BS 7671:2018+A4:2026 come into force, and when is the previous edition (A3:2024) withdrawn?',
    options: [
      'In force 1 January 2026; previous edition withdrawn immediately',
      'In force 15 April 2026; previous edition withdrawn 15 October 2026',
      'In force 31 July 2026; previous edition withdrawn 31 December 2026',
      'In force 15 April 2026; previous edition has no withdrawal date',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 was issued by the IET on 15 April 2026 and may be implemented immediately. BS 7671:2018+A2:2022+A3:2024 remains current but is withdrawn on 15 October 2026 — a six-month transition window. Installations designed up to and including 14 April 2026 may comply with A3; installations designed after 15 October 2026 must comply with A4. Anything in design now should be assessed against A4 unless there is a contractual reason to remain on A3.',
  },
  {
    id: 'm1s4-411-3-4-luminaire-rcd',
    question: 'A4:2026 introduced a new Reg 411.3.4. What does it require?',
    options: [
      'AFDD protection on all final circuits in dwellings',
      '30 mA RCD additional protection for AC final circuits supplying luminaires within domestic (household) premises',
      'Type B RCD on all EV charging circuits',
      'Bidirectional protection on all final circuits',
    ],
    correctIndex: 1,
    explanation:
      'Reg 411.3.4 is one of the most consequential A4 changes for domestic work. Within dwellings, additional protection by an RCD with rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires. Pre-A4, lighting circuits were the most common non-RCD-protected final circuit. From 15 April 2026, that pattern is non-compliant with no risk-assessment exception.',
  },
  {
    id: 'm1s4-pen-no-switching',
    question:
      'Reg 461.2 was tightened under A4:2026 to clarify treatment of the PEN conductor. What does it now say?',
    options: [
      'PEN switching is permitted with isolator-rated equipment',
      'No switching or isolating device shall be inserted in a PEN conductor in a TN-C or TN-C-S system',
      'PEN switching is allowed at the cut-out only with consumer agreement',
      'PEN switching is allowed on TT systems',
    ],
    correctIndex: 1,
    explanation:
      'Pre-A4 the wording around PEN switching was scattered and could be read permissively. A4 redrafted Reg 461.2 to make the prohibition absolute and consolidated the rule in one place: no switching or isolating device shall be inserted in a PEN conductor on a TN-C or TN-C-S system. A switched PEN can leave Class I metalwork at line potential during a fault — fatal at worst, latently unsafe at best.',
  },
  {
    id: 'm1s4-419-purpose',
    question:
      'A4:2026 added a new regulation group 419 (alternative protective measures). What scenario is it written for?',
    options: [
      'Heavy industrial installations and their distribution boards only',
      'Cases where automatic disconnection per Reg 411.3.2 cannot be achieved on limited-fault-current supplies',
      'Functional earthing arrangements for sensitive ICT equipment',
      'EV charging installations connected to TN-C-S (PME) supplies',
    ],
    correctIndex: 1,
    explanation:
      'Modern electronics — inverters, DC-side PV, instrumentation supplies — frequently cannot deliver enough fault current to operate a conventional OPD within the Table 41.1 disconnection time. Pre-A4 there was no formal route; designers improvised with Reg 120.3 departures. A4 introduces regulation group 419 (Reg 419.1 and supporting regs) so the designer has a normative alternative measure where ADS is genuinely not feasible.',
  },
  {
    id: 'm1s4-722-pen-ev',
    question:
      'A4:2026 added Reg 722.312.2.1 to the EV-charging section. Which behaviour does it now expressly prohibit on a TN system?',
    options: [
      'Using a Type A RCD upstream of the charger',
      'Including a PEN conductor in the EV-charging circuit',
      'Bonding the chassis of the charger to the consumer unit MET',
      'Running an EV circuit longer than 10 metres',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.312.2.1 (new in A4) bans inclusion of a PEN conductor in any EV-charging circuit on a TN system. Either split N and PE before the charging circuit (effectively running it as TN-S), or apply one of the alternative protective measures listed in Section 722 — typically an open-PEN detection device or a separate earth electrode for the EV. The reasoning is the elevated touch-current risk presented by the conductive vehicle body during an open-PEN fault.',
  },
  {
    id: 'm1s4-deletions',
    question: 'Which Appendix and which Annex have been DELETED under A4:2026?',
    options: [
      'Appendix 4 (cable tables) and Annex A41 (shock protection)',
      'Appendix 17 (energy efficiency) and Annex B443 (CRL formula method)',
      'Appendix 6 (model forms) and Annex A444 (EM disturbances)',
      'Appendix 3 (device curves) and Annex B41 (disconnection times)',
    ],
    correctIndex: 1,
    explanation:
      'A4 deletions to memorise: (1) Appendix 17 (informative energy-efficiency guidance) was promoted to a normative Part 8 chapter — new Chapter 81. (2) Annex B443 (the calculated-risk-level formula method) and the CRL method itself in Reg 443.5 are deleted; surge-protection requirements now flow through the simplified Reg 443.4.1 risk classification only. Annex A443 (informative SPD examples) was also dropped. The intent is to simplify SPD specification and align with product standards.',
  },
  {
    id: 'm1s4-cert-form-pnb',
    question:
      'A new earthing-arrangement option appears on the EIC and EICR cover page under A4:2026. What is it?',
    options: [
      'TN-S (split-concentric service cable)',
      'TN-C-S (PNB) — protective neutral bonding, distinct from PME',
      'TT (installation with an open earth electrode)',
      'IT (bonded-star earthing arrangement)',
    ],
    correctIndex: 1,
    explanation:
      'A4 splits the previously-bundled TN-C-S option into PME (protective multiple earthing — DNO multiple electrodes) and PNB (protective neutral bonding — single bond to true earth, typical of some private supplies and some embedded networks). Reg 312.2.1.1 was extended with a PNB figure. The cert-form drop-down now offers TN-S, TN-C-S (PME), TN-C-S (PNB), TT, IT — selecting PNB on a PME supply (or vice versa) misrepresents the fault model.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A4:2026 added a new regulation group 419. What is its purpose, and where does it sit in the standard?',
    options: [
      'Alternative protective measures where ADS within Table 41.1 times is not feasible; in Chapter 41',
      'Industrial arc-fault detection device requirements, sitting in a new part of Chapter 7',
      'PME open-PEN protection for EV chargepoints, sitting within Section 722 of Part 7',
      'Functional earthing for ICT equipment, sitting within the new Section 545 of Part 5',
    ],
    correctAnswer: 0,
    explanation:
      'Section 419 is a new normative route for designers where an OPD or RCD cannot achieve ADS within Table 41.1 times — inverters, DC-side PV, lab supplies. ICT functional earthing got its own new Section 545; PME open-PEN protection is in 722; AFDD is in 421.1.7. Each is a distinct A4 addition and the certification implications differ.',
  },
  {
    id: 2,
    question:
      'A4:2026 introduced new Chapters and a new Section that did not exist pre-A4. Which set is correct?',
    options: [
      'Chapter 41 (protection against electric shock) and Section 701 (bathrooms)',
      'Chapter 31 (purposes and supplies) and Section 705 (agricultural premises)',
      'Chapter 41 (protection against shock) and Section 722 (EV charging points)',
      'Chapters 57 and 81 plus Sections 545 and 716 (batteries, efficiency, ICT earthing, PoE)',
    ],
    correctAnswer: 3,
    explanation:
      'A4 added: Chapter 57 (BESS / stationary batteries / hybrid PV+battery), Chapter 81 (energy efficiency — replacing the deleted informative Appendix 17), Section 716 (Power over Ethernet — references BS EN 50173-1 and BS EN IEC 62368-3) and Section 545 (functional earthing for ICT equipment). Section 710 (medical) had a major revision but is not new. Chapters 41, 31 and Sections 701, 705, 722 all pre-existed.',
  },
  {
    id: 3,
    question: 'A4:2026 changed how the FI code is treated on a periodic Condition Report. How?',
    options: [
      'FI must now be applied to every observation recorded on the report by default',
      'The FI code has been withdrawn entirely and is no longer available to inspectors',
      'Code FI no longer needs to render the overall report unsatisfactory by default',
      'FI is now treated as equivalent to a C1 immediate-danger classification',
    ],
    correctAnswer: 2,
    explanation:
      'Pre-A4, an FI observation (further investigation required) had to be marked unsatisfactory by default. A4 redrafted the Appendix 6 condition-report notes; FI no longer needs to be marked unsatisfactory. The C1 / C2 / C3 classifications are unchanged. The FI change reduces over-reporting of "unsatisfactory" reports where the inspector simply needed access to a part of the install to complete the assessment.',
  },
  {
    id: 4,
    question:
      'On a TN-C-S (PME) supply, you are wiring a 7 kW EV charge point. Reg 722.312.2.1 (new in A4) makes one option non-compliant. Which?',
    options: [
      'Including a PEN conductor in the EV-charging circuit and relying on the DNO PEN integrity',
      'Splitting N and PE at the consumer unit and running the EV circuit as TN-S with open-PEN protection at the charger',
      'Applying a separate earth electrode for the EV charger and treating the EV island as TT',
      'Using a Type A RCBO upstream of a charger that has internal 6 mA DC fault detection',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 722.312.2.1 expressly prohibits inclusion of a PEN conductor within an EV-charging circuit on a TN system. The compliant routes are (a) split N and PE before the EV circuit (run as TN-S) typically with an open-PEN protection device, or (b) apply one of the alternative protective measures in Section 722 — for example a separate earth electrode taking the EV onto a TT-like island. The conductive vehicle body amplifies open-PEN touch-current risk.',
  },
  {
    id: 5,
    question: 'Which surge-protection material has been DELETED under A4:2026?',
    options: [
      'Reg 443.4 (risk classification) together with the whole of Section 534 (selection of SPDs)',
      'Section 444 (EMC measures) together with informative Annex B41',
      'Reg 530.3 (operational conditions) only, with the rest of surge protection unchanged',
      'Reg 443.5 (CRL method), Annex A443 (informative SPD examples), Annex B443 and the old Appendix 17',
    ],
    correctAnswer: 3,
    explanation:
      'A4 simplifies surge protection: Reg 443.5 (CRL method) and Annex B443 (CRL formula content) are deleted, along with Annex A443 (informative SPD examples) and Appendix 17 (energy efficiency, promoted to Chapter 81). The simplified Reg 443.4.1 risk-classification approach is now the single SPD route in BS 7671. SPD product-level details flow through BS EN 61643 product standards rather than informative annexes.',
  },
  {
    id: 6,
    question: 'Which Reg 411.3.3 amendment best describes the A4 wording?',
    options: [
      'Mandatory 30 mA RCD on ordinary-person and outdoor sockets; other ≤32 A sockets exceptable by risk assessment',
      'Mandatory 30 mA RCD on all socket-outlets up to 32 A with no permitted exceptions whatsoever',
      '30 mA RCD required only on socket-outlets located outdoors, never on any indoor sockets',
      '30 mA RCD required only where the designer has documented the need in the design file',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 411.3.3 (as amended through A4) keeps the three-category structure: (a) BA1/BA2 ordinary-person / children sockets — never exceptable; (b) other-location sockets — exceptable via documented risk assessment by a skilled person, attached to the EIC; (c) mobile equipment outdoors — never exceptable. A4 also tightened the wording so the category covered is socket-outlets up to 32 A, and made clear the risk-assessment exception is non-domestic only.',
  },
  {
    id: 7,
    question:
      'Reg 551.7.1 was redrafted under A4:2026 to address bidirectional energy flow (PV, battery, V2H). Which two indents are new or substantively changed?',
    options: [
      'Indents (a) and (b) only, covering generator set rating and synchronising arrangements',
      'No substantive change was made; the redraft was purely editorial reordering',
      'Indent (c) — a bidirectional-capable protective device — and (d) — no parallel source on the load side of an RCD',
      'Indent (e) — Type B RCDs only — and indent (f) — a ban on solar inverters under 5 kW',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 551.7.1 (c) requires that, where energy flow is bidirectional, the protective device must be suitable for bidirectional operation — many older OPDs and RCDs are unidirectional. Reg 551.7.1 (d) bans connecting a parallel source to the load side of an RCD where the source could re-energise the loop and defeat the trip mechanism. Both indents map directly onto Section 530 (530.3.201 — bidirectional protection requirements) which is also new in A4.',
  },
  {
    id: 8,
    question:
      'You are coding a pre-A4 dwelling install on an EICR being issued in May 2026. The lighting circuit is on an MCB with no RCD. What is the right approach?',
    options: [
      'Mark satisfactory with no comment, since lighting circuits have never required an RCD',
      "Apply C2 by default, because A4 is in force so any non-RCD lighting is now 'potentially dangerous'",
      'Code on actual present-day risk — C3 if otherwise sound, C2 if a real risk amplifier exists',
      'Code C1 (danger present), because A4 makes any non-RCD lighting an immediate danger',
    ],
    correctAnswer: 2,
    explanation:
      'Pre-A4 installs are not retrospective on A4. EICRs assess against the in-force edition with codes (C1/C2/C3/FI) applied per the actual present-day safety risk. A historic dwelling lighting circuit on an MCB without RCD is a deviation from A4 Reg 411.3.4 — but the code depends on whether absence of RCD increases real-world risk. Default C3 where the install is otherwise sound; escalate to C2 where amplifiers exist (damaged kit, vulnerable occupants, BA2/BB2/BC2). Make the basis of assessment explicit in the EICR cover page.',
  },
];

const faqs = [
  {
    question: 'What is the orange-cover edition?',
    answer:
      "Each amendment of BS 7671:2018 carries a different cover colour for quick visual identification. Blue cover = original 2018 issue. Brown cover = A2:2022. Orange cover = A4:2026. (A1:2020 and A3:2024 were issued electronically and don't have their own cover colour.) When working on a job site, the cover colour tells you at a glance which edition the print copy is — useful when several editions are floating around a college or workshop.",
  },
  {
    question: 'Did A4 change the model forms (EIC / EICR / Schedule of Test Results)?',
    answer:
      "Yes — substantially. A4 added: TN-C-S (PME / PNB) drop-down on the earthing arrangement; AFDD inspection item 4.23 plus AFDD test results column 30 on the Schedule of Test Results; reference-method column in the circuit-details table; maximum-permitted-Zs column in circuit details; SPD type per board (T1 / T2 / T3 / N/A); 'Supplied from' field per board; maximum demand (kVA / A) field; safety-alerts and product-recalls disclaimer in Section D; renaming 'Consumer's isolator' to 'Consumer's means of isolation'; and the FI-no-longer-unsatisfactory rule. Module 6 covers the form changes line by line.",
  },
  {
    question: "Does A4 affect existing installations I've already certified?",
    answer:
      'No. BS 7671 has always been forward-looking — existing installations conforming to an earlier edition do not have to be brought up to A4 to remain in lawful use, provided they remain safe under EAWR 1989. Periodic inspections continue to be assessed against the edition in force at the time of design, with codes (C1/C2/C3/FI) applied for any current safety issue. Make the basis of assessment explicit on the EICR cover page so the client and any subsequent inspector can see which benchmark you used and why.',
  },
  {
    question: 'Where is the full list of A4 changes in the printed standard?',
    answer:
      'Pages 17–25 of the orange-cover printed copy — the "Introduction to Amendment 4:2026" section. It is the change log written by the technical authors and is the single best source for "what used to be true that no longer is". Side-bar markings (vertical bars) in the right margin throughout the regulations also flag every technical A4 change in situ — scan the bars to find anything new on a page at a glance.',
  },
  {
    question: 'Reg 411.3.3 already required RCDs on sockets — what actually changed under A4?',
    answer:
      'Two things. First, the scoped current was tightened — A4 makes explicit that the rule covers socket-outlets up to 32 A (older readings of A2/A3 left some ambiguity for higher-rated industrial sockets). Second, the documented-risk-assessment exception is constrained to category (b) — non-domestic, other-location sockets — and the assessment must be by a skilled person (electrically), signed and attached to the EIC. Categories (a) BA1/BA2 ordinary-person sockets and (c) outdoor mobile equipment cannot be excepted under any circumstance.',
  },
  {
    question: 'Reg 421.1.7 (AFDD) — has the mandate widened under A4?',
    answer:
      'Yes. Pre-A4, AFDDs were strongly recommended on certain final circuits (notably HMOs, care homes, timber-frame buildings, locations with sleeping accommodation). A4 widens the wording so AFDD protection is the expectation on AC final circuits supplying socket-outlets and luminaires in higher-fire-risk locations and those with sleeping accommodation, with a documented risk-based exception route only outside dwellings. The Schedule of Test Results gains an AFDD column (column 30) so AFDD presence and test status is captured per circuit.',
  },
  {
    question: 'Reg 461.2 — exactly what does the A4 wording forbid?',
    answer:
      'Reg 461.2 (as amended through A4) prohibits insertion of any switching or isolating device into a PEN conductor on a TN-C or TN-C-S system. That includes main switches, isolators, fuses, links and disconnectors. Inside the installation, N and PE are separated AT the MET; switching may disconnect the line(s) and (where required) the post-MET neutral, but never the upstream PEN. The rule closes a long-standing weak point: a switched PEN with load on the system drives every Class I exposed metal part to near-line voltage during the open-PEN failure mode.',
  },
  {
    question: 'How do I plan a project that straddles 15 April / 15 October 2026?',
    answer:
      'Three rules. (1) Anything in design now should be designed to A4 — the design life of the install is decades, the cost of designing to a withdrawn edition is rework. (2) Where a contract was let pre-15 April 2026 against A3 and is mid-build, completing to A3 is lawful provided the EIC clearly cites A3:2024 as the basis. (3) Anything designed after 15 October 2026 must comply with A4. The risky middle ground is a project let in early 2026 that drags into Q4 — bring it forward to A4 by variation order rather than discovering at handover that the install fails the in-force edition.',
  },
  {
    question: 'Reg 531.3.3 changed the required RCD type — what is the rule now?',
    answer:
      'Reg 531.3.3 (RCD selection) was redrafted under A4 to align with the actual installed waveform. Type AC (sees only sinusoidal AC residual) is effectively obsolete domestically — nearly every plug-in load now produces some pulsating DC. Type A is the floor for general AC final circuits with electronic loads. Type F covers high-frequency residual on VSDs / inverter-driven appliances. Type B is required where smooth DC residual can occur — three-phase VSDs, EV chargers without integral 6 mA DC detection, larger PV / battery hybrids. The cert form continues to record RCD type per circuit; A4 makes the selection question explicit.',
  },
];

export default function BS7671Module1Section4() {
  const navigate = useNavigate();

  useSEO({
    title: 'Amendment 4 (2026) Highlights | BS 7671:2018+A4:2026 | Module 1.4',
    description:
      'The cross-cutting overview of BS 7671:2018+A4:2026 — what changed and why. Luminaire RCD (411.3.4), Section 419 alternative measures, Section 530 bidirectional protection, EV PEN ban (722.312.2.1), AFDD (421.1.7), CRL deletion, model-form additions and the FI usage change.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 4 · Updated for A4:2026"
            title="Amendment 4 (2026) highlights"
            description="Cross-cutting overview of every substantive change in BS 7671:2018+A4:2026 — additions, amendments, deletions and model-form impact. Each item links to the module that covers it in depth."
            actions={
              <>
                <RegBadge>411.3.4</RegBadge>
                <RegBadge>419.1</RegBadge>
                <RegBadge>722.312.2.1</RegBadge>
                <AmendmentBadge regs={['A4:2026']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'A4:2026 issued 15 April 2026 (orange cover); A3:2024 withdrawn 15 October 2026 — six-month transition window. Anything in design now should be designed to A4.',
              'Headline NEW regs: 411.3.4 (30 mA RCD on dwelling lighting), 419.1 (alternative measures where ADS not feasible), 530.3.201 (bidirectional protection), 722.312.2.1 (no PEN in EV circuit on TN). Headline NEW chapters/sections: 57 (stationary batteries), 81 (energy efficiency), 545 (ICT functional earthing), 716 (Power over Ethernet).',
              'Headline AMENDED regs: 411.3.3 (risk-assessment exception scoped), 421.1.7 (AFDD wider mandate), 461.2 (PEN switching absolute prohibition), 531.3.3 (RCD type selection), 551.7.1 (c)(d) (parallel-source / bidirectional). Headline DELETED: Reg 443.5 (CRL), Annex A443, Annex B443, Appendix 17.',
              'Cert-form changes: TN-C-S (PME / PNB) drop-down, AFDD column 30, max-permitted-Zs column, reference-method column, SPD type per board, Supplied-from per board, maximum demand, FI-no-longer-unsatisfactory.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Recall the A4:2026 implementation date (15 April 2026) and A3 withdrawal date (15 October 2026), and apply the six-month transition window to current and pipeline designs.',
              'Identify the headline NEW regs — 411.3.4, 419.1, 530.3.201, 722.312.2.1 — and the new chapters / sections (57, 81, 545, 716), and place each in the correct Part of the standard.',
              'Identify the headline AMENDED regs — 411.3.3, 421.1.7, 461.2, 531.3.3, 551.7.1 — and explain the substantive change in each.',
              'Identify the headline DELETIONS — Reg 443.5 (CRL method), Annex A443, Annex B443, Appendix 17 — and explain where the content moved (or why it is no longer needed).',
              'Translate every cert-form addition (TN-C-S PME/PNB drop-down, AFDD column 30, max-permitted-Zs column, reference-method column, SPD type per board, supplied-from, max demand, FI usage change) into an inspection or design behaviour expected from 15 April 2026.',
              'Code pre-A4 installations correctly on an EICR issued under A4 — distinguishing C1 / C2 / C3 / FI on actual present-day safety risk against the in-force benchmark, not on edition mismatch alone.',
              'Cross-link any A4 change to the dedicated module that covers it in depth (M2 definitions, M3 protection arrangements, M4 protection methods, M5 selection / erection, M6 inspection / cert forms, M7 special locations, M8 reference materials and appendices).',
            ]}
            initialVisibleCount={3}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Introduction to Amendment 4:2026"
            clause="BS 7671:2018+A4:2026 Requirements for Electrical Installations was issued on 15th April 2026 and may be implemented immediately. BS 7671:2018+A2:2022+Corrigendum (May 2023)+A3:2024 remains current but will be withdrawn on 15th October 2026."
            meaning="Six months to recalibrate. Designs after 15 October 2026 must comply with A4 — anything in design now should be assessed against A4 unless there is a contractual reason to remain on A3. Document the basis of assessment on the cover page of every cert issued through the transition window."
          />

          <SectionRule />

          <ContentEyebrow>
            Publication and withdrawal — the 15 April / 15 October dates
          </ContentEyebrow>

          <ConceptBlock
            title="A4:2026 publication, transition and withdrawal timeline"
            plainEnglish="A4 was published 15 April 2026 — you can use it from day one. The previous edition (A3:2024) is withdrawn on 15 October 2026. The six months in between is the transition window."
            onSite="The dates carry contractual weight. An EIC issued on or after 15 October 2026 must cite A4 as its basis. An EIC issued during the transition can lawfully cite A3 only where the design was completed before A4 took effect — and the cert must say so explicitly."
          >
            <p>
              The IET published BS 7671:2018+A4:2026 on 15 April 2026 with the orange cover. The
              previous edition — BS 7671:2018+A2:2022+Corrigendum (May 2023)+A3:2024 — remains
              current alongside A4 until 15 October 2026, at which point it is withdrawn. The
              transition window allows ongoing projects designed under A3 to complete; any new
              design started after 15 October 2026 must comply with A4.{' '}
              <AmendmentBadge regs={['A4:2026']} />
            </p>
            <p>
              For contractors, the planning rule is straightforward: design every new project to A4
              from now. The design life of an installation is measured in decades; designing to a
              withdrawn edition is a guaranteed source of rework. For projects mid-build under A3,
              completion to A3 is lawful — but cite A3:2024 explicitly on the EIC cover page so the
              basis of assessment is unambiguous to the client and any future inspector.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The headline NEW regs — what to learn first</ContentEyebrow>

          <ConceptBlock
            title="Reg 411.3.4 — 30 mA RCD on dwelling lighting circuits"
            plainEnglish="Inside any dwelling, every AC final circuit feeding luminaires must have a 30 mA RCD or RCBO. Lighting is no longer the 'one circuit you can leave on an MCB'."
            onSite="Single biggest practical impact of A4 on domestic work. Default to RCBOs at the consumer unit. On a CU change, the lighting way comes back onto a 30 mA device. There is no risk-assessment exception within scope — the requirement is unconditional inside dwellings."
          >
            <p>
              <RegBadge>411.3.4</RegBadge> requires that, within domestic (household) premises,
              additional protection by an RCD with rated residual operating current not exceeding 30
              mA shall be provided for AC final circuits supplying luminaires.{' '}
              <AmendmentBadge regs={['411.3.4']} />
            </p>
            <p>
              Practical implications: a dual-RCD or all-RCBO consumer unit was already common
              practice; A4 makes it the only compliant route for new dwelling lighting circuits. On
              a CU change in an existing dwelling, the lighting circuit must come back onto a 30 mA
              RCD or RCBO. There is no equivalent unconditional requirement in non-domestic premises
              — that route remains via Reg 411.3.3 with the documented-risk-assessment exception for
              category (b) only. Module 4 Section 1 covers ADS in detail; Module 4 Section 3 covers
              RCD selection.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.4 — Additional requirements for circuits with luminaires (NEW IN A4)"
            clause="Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning="Mandatory ('shall'), unconditional within scope, no risk-assessment exception. Applies to every AC final circuit feeding luminaires inside a private dwelling — not just bathroom or kitchen, the whole property."
            cite="BS 7671:2018+A4:2026, Reg 411.3.4 (in force from 15 April 2026)"
          />

          <ConceptBlock
            title="Section 419 — alternative protective measures where ADS is not feasible"
            plainEnglish="Some electronic supplies cannot deliver enough fault current to trip an MCB inside the disconnection time. Section 419 (new in A4) is the formal designer's route in those cases."
            onSite="Pre-A4 the workaround was a Reg 120.3 documented departure. A4 replaces ad-hoc departures with a normative procedure. Module 4 covers it as part of the protection-method content."
          >
            <p>
              <RegBadge>419.1</RegBadge> applies where automatic disconnection of supply per Reg
              411.3.2 cannot be achieved — typically because the source has limited prospective
              fault current. Examples: small inverters supplying a discrete circuit, DC-side PV,
              instrumentation supplies. Section 419 sets out the recognised alternatives: enhanced
              equipotential bonding, supplementary insulation, residual-current monitoring, and
              source-side current limitation. The designer documents which alternative was chosen
              and why on the EIC. <AmendmentBadge regs={['419']} />
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section 530 — bidirectional protection (Reg 530.3.201)"
            plainEnglish="With PV, batteries, V2H and small wind, energy now flows both ways. The OPD or RCD has to cope with reversed energy direction — many older devices do not."
            onSite="Reg 530.3.201 makes the bidirectional-rated requirement explicit. On a battery / PV install, check the protective devices' product datasheets for bidirectional certification before specifying. Type-tested unidirectional MCBs are not adequate where energy can flow back through the device."
          >
            <p>
              <RegBadge>530.3.201</RegBadge> (new in A4) requires that, where a circuit is designed
              for bidirectional energy flow, the overcurrent and residual-current protective devices
              on that circuit shall be suitable for bidirectional operation. This pairs with the
              redrafted <RegBadge>551.7.1</RegBadge> (c) and (d) — see the AMENDED section below.{' '}
              <AmendmentBadge regs={['530.3.201', '551.7.1']} />
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 722.312.2.1 — no PEN in EV-charging circuits on TN"
            plainEnglish="On a TN supply, the EV-charging circuit cannot include a PEN. Either run it as TN-S, or apply one of the alternative protective measures in Section 722."
            onSite="The compliant pattern: split N and PE at the consumer unit and bring only PE forward to the charger; fit an open-PEN protection device at the EV-charger position. Type A RCBO upstream is fine where the charger has integral 6 mA DC detection; Type B is required where it does not."
          >
            <p>
              <RegBadge>722.312.2.1</RegBadge> (new in A4) prohibits inclusion of a PEN conductor
              within an EV-charging circuit on a TN system. The risk being mitigated is the open-PEN
              failure mode amplified by the conductive vehicle body — a person in contact with the
              car body and any earthed surface (drainage grate, garden tap, garage floor rebar)
              becomes the fault path. Compliant routes: (a) split N and PE before the EV circuit
              (TN-S configuration), typically with an open-PEN protection device; (b) apply one of
              the alternative protective measures in Section 722 — e.g. separate earth electrode
              taking the EV onto a TT-like island. <AmendmentBadge regs={['722.312.2.1']} />
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>The headline NEW chapters and sections</ContentEyebrow>

          <ConceptBlock
            title="Chapter 57, Chapter 81, Section 545 and Section 716"
            plainEnglish="Four new pieces of structure that didn't exist pre-A4. Each gets its own dedicated module — the overview here is so you know what to look for."
            onSite="Chapter 81 (energy efficiency) absorbed the deleted Appendix 17. Section 716 is the first time PoE is named in BS 7671. Chapter 57 brings BESS and PV+battery hybrid into a dedicated chapter rather than treating storage as an ad-hoc generating set. Section 545 finally separates ICT functional earthing from protective earthing."
          >
            <p>
              <strong className="text-white">Chapter 57 — Stationary secondary batteries</strong>{' '}
              <AmendmentBadge regs={['Chapter 57']} />. Covered in Module 5. BESS, PV+battery
              hybrid, off-grid hybrid systems. Excludes batteries inside product-safety-standard
              equipment (UPSs, central emergency-lighting power supplies — those remain governed by
              their product standards).
            </p>
            <p>
              <strong className="text-white">Chapter 81 — Energy efficiency</strong>{' '}
              <AmendmentBadge regs={['Chapter 81']} />. Covered in Module 8. Promoted from the
              deleted informative Appendix 17 to a normative Part 8 chapter. References the Building
              Regulations and BS HD 60364-8-1:2019.
            </p>
            <p>
              <strong className="text-white">Section 514 — extended identification</strong>{' '}
              <AmendmentBadge regs={['514']} />. Covered in Module 5. Section 514 was extended under
              A4 to cover identification of combined PE+FE conductors, dual-supply cabling and
              bidirectional circuits — feeds back to Table 51 and the new Section 545.
            </p>
            <p>
              <strong className="text-white">Section 545 — ICT functional earthing</strong>{' '}
              <AmendmentBadge regs={['545']} />. Covered in Module 5. Functional earthing and
              functional equipotential bonding for information and communication technology
              equipment (broadcast, comms, server-room ICT). Specifies minimum CSA, identification,
              electrical continuity and combined PE+FE conductor requirements. Replaces what
              previously sat as scattered guidance across BS 7671 and BS EN 50310.
            </p>
            <p>
              <strong className="text-white">Section 716 — Power over Ethernet</strong>{' '}
              <AmendmentBadge regs={['716']} />. Covered in Module 7. ELV DC power distribution over
              balanced data cabling — cameras, access points, lighting controls, displays.
              References BS EN 50173-1 and BS EN IEC 62368-3. The first time PoE is brought formally
              inside BS 7671.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>The headline AMENDED regs — what changed and how</ContentEyebrow>

          <ConceptBlock
            title="Five amendments to memorise"
            plainEnglish="411.3.3 (sockets), 421.1.7 (AFDD), 461.2 (PEN), 531.3.3 (RCD type) and 551.7.1 (parallel sources). Each tightens or extends an existing rule rather than creating a new one."
            onSite="These are the regs working sparks already used pre-A4. The numbers haven't moved; the wording has. Read the side-bar markings on the regs in the orange-cover copy to spot the change in situ."
          >
            <p>
              <strong className="text-white">
                Reg 411.3.3 — sockets and the risk-assessment exception
              </strong>{' '}
              <AmendmentBadge regs={['411.3.3']} />. Scope tightened to socket-outlets up to 32 A.
              The documented-risk-assessment exception is constrained to category (b)
              (other-location, non-domestic, not BA1/BA2). Categories (a) ordinary-person sockets
              and (c) outdoor mobile equipment cannot be excepted under any circumstance. The
              skilled person (electrically) signing the assessment must be named on the EIC.
            </p>
            <p>
              <strong className="text-white">Reg 421.1.7 — AFDD wider mandate</strong>{' '}
              <AmendmentBadge regs={['421.1.7']} />. AFDD protection is now expected on AC final
              circuits supplying socket-outlets and luminaires in higher-fire-risk locations and
              those with sleeping accommodation (HMOs, care homes, student accommodation,
              timber-frame buildings, wooden-flooring buildings). A documented risk-based exception
              route exists outside dwellings. The Schedule of Test Results gains AFDD column 30.
            </p>
            <p>
              <strong className="text-white">Reg 461.2 — PEN switching absolute prohibition</strong>{' '}
              <AmendmentBadge regs={['461.2']} />. Pre-A4 the wording was scattered and could be
              read permissively in edge cases. A4 redrafted to a clean, single-sentence prohibition:
              no switching or isolating device shall be inserted in a PEN conductor on a TN-C or
              TN-C-S system. That includes main switches, isolators, fuses, links and disconnectors.
            </p>
            <p>
              <strong className="text-white">Reg 531.3.3 — RCD type selection</strong>{' '}
              <AmendmentBadge regs={['531.3.3']} />. Redrafted to align with installed waveform
              reality. Type AC effectively obsolete domestically. Type A is the floor for general AC
              final circuits. Type F for high-frequency residual on VSDs / inverter-driven
              appliances. Type B for smooth DC residual on three-phase VSDs, EV without integral 6
              mA DC, larger PV / battery hybrids.
            </p>
            <p>
              <strong className="text-white">
                Reg 551.7.1 — parallel sources / bidirectional flow
              </strong>{' '}
              <AmendmentBadge regs={['551.7.1']} />. New indents (c) and (d). (c) requires a
              suitable protective device where energy flow is bidirectional. (d) prohibits
              connecting a parallel source to the load side of an RCD under specified conditions.
              Pairs with the new Section 530.3.201.
            </p>
          </ConceptBlock>

          <AmendmentDiff
            regNumber="Reg 461.2 — switching of PEN conductor"
            was="Wording was scattered across Section 461 and could be read permissively in specific applications. Some designers interpreted partial or controlled PEN switching as compliant."
            now="No switching or isolating device shall be inserted in a PEN conductor on a TN-C or TN-C-S system. Single-sentence absolute prohibition consolidated in Reg 461.2."
            rationale="A switched PEN can leave the consumer's metallic parts at line potential during a fault. The pre-A4 wording was a known weak point. A4 closes it absolutely, removing any room for designer interpretation, and supports the parallel new Reg 722.312.2.1 EV-circuit PEN ban."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>The headline DELETED material</ContentEyebrow>

          <ConceptBlock
            title="What A4 took out of the standard"
            plainEnglish="Four pieces gone: Reg 443.5 (CRL formula method), Annex A443 (informative SPD examples), Annex B443 (CRL annex content) and Appendix 17 (energy efficiency)."
            onSite="If you were using the CRL calculation to size SPDs, that route is closed. From A4 onwards, SPD selection is via the simplified Reg 443.4.1 risk classification only, with product-level detail flowing through BS EN 61643 product standards. Anyone with old design templates referencing CRL needs them updated."
          >
            <p>
              <strong className="text-white">Reg 443.5 — calculated risk level (CRL) method</strong>{' '}
              — DELETED. Pre-A4 the CRL formula was an alternative to the risk-classification
              approach for deciding when SPDs were required. A4 simplifies:{' '}
              <RegBadge>443.4.1</RegBadge> risk classification is now the single route.{' '}
              <AmendmentBadge regs={['443.5']} />
            </p>
            <p>
              <strong className="text-white">Annex A443 — informative SPD examples</strong> —
              DELETED. Content was already drifting out of date relative to BS EN 61643 product
              standards; rather than maintain a parallel set of examples, A4 removes the annex.
            </p>
            <p>
              <strong className="text-white">Annex B443 — CRL formula annex</strong> — DELETED.
              Disappears with the parent Reg 443.5.
            </p>
            <p>
              <strong className="text-white">Appendix 17 — energy efficiency</strong> — DELETED
              (promoted to new Chapter 81). Appendix 17 was previously informative; Chapter 81 is
              normative. The functional content broadly survives — but as binding regulation in Part
              8, not as advisory appendix material.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Cert form and inspection-procedure changes</ContentEyebrow>

          <ConceptBlock
            title="Every model-form addition under A4 — and what each one means in practice"
            plainEnglish="A4 changes the EIC, EICR and Schedule of Test Results substantially. Each new field reflects an inspection or design behaviour now expected of the working spark."
            onSite="The cert-form changes ARE the inspection schedule. A blank AFDD column on a job done after 15 April 2026 is a missed inspection. A blank max-permitted-Zs is a missed design entry. Update the cert template AND the install habits behind it."
          >
            <p>
              The most disruptive A4 changes for working sparks are not the new chapters — they are
              the model-form additions. Every EIC / EICR you generate from 15 April 2026 onwards
              needs to reflect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">
                  TN-C-S (PME / PNB) earthing-arrangement drop-down
                </strong>{' '}
                — protective neutral bonding now recognised distinct from PME (Reg 312.2.1.1 gained
                a PNB figure under A4).
              </li>
              <li>
                <strong className="text-white">
                  AFDD inspection item 4.23 + test results column 30
                </strong>{' '}
                — formal AFDD coverage on the form, per circuit.
              </li>
              <li>
                <strong className="text-white">Maximum permitted Zs column</strong> in circuit
                details — design-time Zs value carried alongside the measured value, so the
                inspector can see the design margin at a glance.
              </li>
              <li>
                <strong className="text-white">Reference method column</strong> in circuit details —
                feeds back to App 4 buried-cable changes and lets the inspector verify cable sizing
                against the actual installation method.
              </li>
              <li>
                <strong className="text-white">SPD type per board</strong> — T1 / T2 / T3 / N/A —
                allowing inspectors to see at a glance what surge protection is fitted on each
                distribution board.
              </li>
              <li>
                <strong className="text-white">Supplied-from field per board</strong> — explicit
                upstream supply traceability through a multi-board installation.
              </li>
              <li>
                <strong className="text-white">Maximum demand (kVA / A)</strong> field — design
                value documented per board, supporting cable-size and OPD-rating verification.
              </li>
              <li>
                <strong className="text-white">Section D safety alerts and product recalls</strong>{' '}
                disclaimer — protects the inspector from being deemed to have certified
                product-level safety the manufacturer has subsequently flagged.
              </li>
              <li>
                <strong className="text-white">Renaming</strong> &ldquo;Consumer&apos;s
                isolator&rdquo; to &ldquo;Consumer&apos;s means of isolation&rdquo; — aligns with
                Section 537 wording.
              </li>
              <li>
                <strong className="text-white">FI no longer unsatisfactory</strong> — Appendix 6
                rule change. FI observations no longer automatically force an unsatisfactory report.
              </li>
            </ul>
            <p>Module 6 covers the cert-form changes section by section.</p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Coding pre-A4 installations on an A4-era EICR</ContentEyebrow>

          <ConceptBlock
            title="The transition rule for periodic inspection"
            plainEnglish="An EICR issued under A4 still assesses against the in-force edition (A4) — but C1/C2/C3/FI codes track present-day safety risk, not edition mismatch alone. Most pre-A4 deviations on otherwise-sound installs are C3."
            onSite="Avoid the trap of mass-coding C2 because the install pre-dates A4. The C2 threshold is 'potentially dangerous' — that has to be a real-world judgment, not an automatic edition-vs-edition delta."
          >
            <p>
              GN3 and BS 7671 Chapter 65 require every EICR observation to be coded C1 / C2 / C3 or
              FI. The default coding logic for pre-A4 deviations under an A4-era inspection:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">C1 — danger present</strong>: real, present-day
                hazard requiring immediate action. Edition mismatch alone is rarely C1; C1 is
                reserved for live exposed metalwork, broken CPC, fire damage.
              </li>
              <li>
                <strong className="text-white">C2 — potentially dangerous</strong>: a reasonable
                fault scenario produces a dangerous condition. Example: pre-A4 dwelling lighting
                circuit on an MCB without RCD, with damaged metal-bodied luminaires or BA2 occupants
                present — the absence of 30 mA RCD becomes load-bearing.
              </li>
              <li>
                <strong className="text-white">C3 — improvement recommended</strong>: deviation from
                the in-force edition where the install is otherwise sound and risk is low. Example:
                pre-A4 dwelling lighting circuit on an MCB without RCD, in an otherwise
                well-maintained installation with no risk amplifiers.
              </li>
              <li>
                <strong className="text-white">FI — further investigation required</strong>: the
                inspector cannot complete the assessment of a particular item (e.g. cannot access
                the back of a board, cannot determine the supply earthing arrangement). Under A4, FI
                no longer automatically forces an unsatisfactory report.
              </li>
            </ul>
            <p>
              Reference the in-force edition (A4:2026) on the cover page as the basis of assessment.
              Where a pre-A4 deviation is coded C3, name the regulation and explain the
              recommendation in plain English in the observations field.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating A4 as 'just paperwork'"
            whatHappens="A working spark reads the cert-form changes summary, files them under 'admin', and continues installing as before. Three months later a CU change goes onto an old EICR template, the lighting circuit is wired without RCD protection, and the inspector arrives expecting Reg 411.3.4."
            doInstead="The cert form changes ARE the inspection schedule. AFDD column 30 means an AFDD test was done; PNB drop-down means PNB was identified; max-permitted-Zs means the design-time Zs is recorded so it can be tested against the measured value. Each form addition reflects an inspection or design behaviour that is now expected. Update both: the cert template AND the install habits behind it."
          />

          <CommonMistake
            title="Mass-coding C2 on every pre-A4 deviation"
            whatHappens="An inspector working under A4 issues an EICR on a 2018-vintage dwelling and codes C2 on every non-RCD lighting circuit, every Type AC RCD, every 'Consumer's isolator' label, every missing AFDD. Twelve C2s on an otherwise sound install — the report comes back marked unsatisfactory and the customer is quoted for a full rewire that is not actually needed."
            doInstead="C2 is 'potentially dangerous'. A pre-A4 deviation is a deviation from the in-force edition; the code depends on the actual present-day risk. Default to C3 (improvement recommended) where the install is otherwise sound; escalate to C2 only where there is a real-world risk amplifier. Cite the regulation in the observations field. Make the basis-of-assessment clear on the cover page so the client understands the report compares against A4, not against the edition the install was built under."
          />

          <CommonMistake
            title="Switching the PEN conductor in a TN-C-S installation"
            whatHappens="A handyman fits a 'whole-house isolator' that breaks both lines AND the incoming PEN at the cut-out — or wires a main switch that interrupts the post-cut-out PEN. Reg 461.2 (as redrafted under A4) absolutely forbids this in TN-C and TN-C-S systems. With load on the property and an open PEN, every Class I exposed metal part rises to near-line voltage. The result is a fatal-shock risk that does not show on a basic insulation-resistance test."
            doInstead="Never switch, isolate, fuse or break a PEN conductor in TN-C / TN-C-S. The PEN is always continuous from the DNO transformer star point through to the consumer's MET. Inside the installation, N and PE are split AT the MET; switching may disconnect line(s) and (where required) the post-MET neutral, but never the upstream PEN. Reg 722.312.2.1 (A4) goes further — no PEN at all in EV-charging circuits on TN supplies."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying A4 on the day</ContentEyebrow>

          <Scenario
            title="CU change on a 2008 dwelling — install date May 2026"
            situation="Customer wants their old plastic 17th-edition CU replaced with a metal A4-compliant board. Existing circuits: one ring (sockets), two radials (cooker, immersion), two lighting circuits (upstairs, downstairs). All circuits currently MCB-only — no RCD on lighting."
            whatToDo="Under A4 Reg 411.3.4 the lighting circuits must come back onto 30 mA RCDs / RCBOs. The simplest route is an all-RCBO board with Type A RCBOs throughout — covers Reg 411.3.3 (sockets), Reg 411.3.4 (lighting), and Reg 421.1.7 (AFDD where dwelling has sleeping accommodation, depending on local risk profile). Specify a Type T2 SPD per Reg 443.4.1; record SPD type on the cert per the new SPD column; record TN-C-S (PME) on the earthing-arrangement drop-down (this is a DNO PME supply, not PNB)."
            whyItMatters="The cert (EIC) records compliance with the in-force edition. Issuing an EIC against A4:2026 with a non-RCD-protected luminaire circuit is a documented departure under Reg 120.3 and the burden of justification falls on the designer. In a household with insurers, mortgage providers and building-control checks in the loop, that is a hard letter to write — and avoidable by specifying the right CU upfront."
          />

          <Scenario
            title="EV charger added to a TN-C-S property — install date June 2026"
            situation="Customer has a 7 kW single-phase tethered EV charger on order. The charger spec sheet states 'integrated 6 mA DC fault detection per BS EN 61851'. Existing CU is a 3-year-old metal split-load board with Type AC 30 mA RCDs on every busbar. Supply is TN-C-S (PME)."
            whatToDo="Don't add the EV to the existing Type AC bus — Type AC is blind to smooth DC residuals an EV install can produce in fault, and the chamber RCD is unsuitable for a bidirectional V2H upgrade later. Fit a dedicated way: Type A 32 A RCBO upstream of the EV circuit (the charger's own 6 mA DC detection covers the smooth DC route inside it). Run the EV circuit as TN-S — split N and PE at the CU and bring only PE forward to the charger; do NOT include a PEN in the EV circuit. Add an open-PEN protection device (PEN-fault relay) at the charger position to cover the TN-C-S open-PEN failure mode. Cert entries: AFDD column 30 not required for a single radial without sleeping accommodation; SPD column on the EV sub-board records T2; max-permitted-Zs column records the design Zs limit; supplied-from records the parent board."
            whyItMatters="Reg 722.312.2.1 (A4) is non-negotiable on TN — no PEN in the EV-charging circuit. Reg 461.2 (A4) reinforces no PEN switching anywhere upstream. Type B RCDs cost 4–5× a Type A and the manufacturer's instructions are the binding spec; if the charger handles DC residual itself, Type A is correct and over-engineering with Type B is not free. If it does not, Type B is mandatory."
          />

          <SectionRule />

          <ContentEyebrow>Where each A4 change is covered in depth</ContentEyebrow>

          <ConceptBlock
            title="A4 change → owning module"
            plainEnglish="Cross-reference table so you know where the deep dive lives. This section is the index; the modules are the textbooks."
            onSite="When an inspector or apprentice asks 'where do I read more about Reg 411.3.4?' the answer is Module 4 Section 1. When they ask about Chapter 81, it is Module 8. The index removes the 'where do I find this?' friction."
          >
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">Module 2 — Definitions</strong>: TN-C-S (PME / PNB)
                drop-down, the new identification rules in Section 514 / Table 51, combined PE+FE
                conductor terminology.
              </li>
              <li>
                <strong className="text-white">Module 3 — Protection arrangements</strong>: Reg
                312.2.1.1 PNB figure, Reg 411.4 / 411.5 / 411.6 system-earthing detail, Reg 461.2
                PEN switching prohibition.
              </li>
              <li>
                <strong className="text-white">Module 4 — Protection methods</strong>: Reg 411.3.3
                (sockets), Reg 411.3.4 (luminaires), Section 419 (alternative measures), Reg 421.1.7
                (AFDD), Reg 531.3.3 (RCD type), Section 530.3.201 (bidirectional).
              </li>
              <li>
                <strong className="text-white">Module 5 — Selection and erection</strong>: Chapter
                57 (stationary batteries), Section 545 (ICT functional earthing), Section 514
                (identification), Reg 551.7.1 (parallel sources).
              </li>
              <li>
                <strong className="text-white">Module 6 — Inspection and certification</strong>:
                every cert-form change line by line, AFDD column 30, max-permitted-Zs column,
                reference-method column, SPD type per board, supplied-from, FI rule.
              </li>
              <li>
                <strong className="text-white">Module 7 — Special locations</strong>: Section 716
                (PoE), Reg 722.312.2.1 (EV PEN ban), Section 710 (medical), Section 708 (caravan
                parks).
              </li>
              <li>
                <strong className="text-white">
                  Module 8 — Reference materials and appendices
                </strong>
                : Chapter 81 (energy efficiency, ex-Appendix 17), the deleted Appendix 17 and Annex
                B443, the simplified Reg 443.4.1 SPD route.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A4:2026 issued 15 April 2026 (orange cover); A3:2024 withdrawn 15 October 2026. Six-month transition window. Anything in design now should be designed to A4.',
              'NEW regs to memorise: 411.3.4 (30 mA RCD on dwelling lighting), 419.1 (alternative measures), 530.3.201 (bidirectional protection), 722.312.2.1 (no PEN in EV circuit on TN).',
              'NEW chapters / sections: Chapter 57 (stationary batteries), Chapter 81 (energy efficiency — ex-Appendix 17), Section 545 (ICT functional earthing), Section 716 (Power over Ethernet).',
              'AMENDED regs: 411.3.3 (sockets / risk-assessment exception scoped), 421.1.7 (AFDD wider mandate), 461.2 (PEN switching absolute prohibition), 531.3.3 (RCD type selection), 551.7.1 (c)(d) (parallel sources / bidirectional).',
              'DELETED: Reg 443.5 (CRL method), Annex A443, Annex B443 and Appendix 17. SPD selection now via simplified Reg 443.4.1 risk classification.',
              'Cert-form additions: TN-C-S (PME/PNB) drop-down, AFDD column 30, max-permitted-Zs column, reference-method column, SPD type per board, supplied-from, max demand, FI-no-longer-unsatisfactory.',
              'Coding pre-A4 installs on A4-era EICRs: assess against in-force A4, code C1/C2/C3/FI on actual present-day risk — not on edition mismatch alone. Default C3 on otherwise-sound pre-A4 deviations; escalate to C2 only where real-world risk amplifiers exist.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2 — Definitions
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
