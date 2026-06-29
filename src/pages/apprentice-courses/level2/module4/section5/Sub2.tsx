/**
 * Module 4 · Section 5 · Subsection 2 — Schedule of Inspections walkthrough
 * Supplementary Sub — synthesises AC 5.1 (verify wiring conforms to IET standards)
 * by walking through every section of the IET model Schedule of Inspections form
 * (Appendix 6, BS 7671:2018+A4:2026). Covers all 17 SoI item groups: distributor
 * facility, identification, routing, selection, connection, erection, single-pole
 * devices, notices, accessories, earthing, bonding, CPCs, ADS, other protective
 * measures, erection method, general items.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Schedule of Inspections walkthrough (5.2) | Level 2 Module 4.5.2 | Elec-Mate';
const DESCRIPTION =
  'Every section of the IET model Schedule of Inspections from BS 7671 Appendix 6 — what each item asks for, how to verify it visually, how to record limitations and non-conformances.';

const checks = [
  {
    id: 'soi-section-pick',
    question:
      'You are inspecting a finished CU and notice the BS 951 bonding clamp on the gas pipe is missing its "Safety Electrical Connection — Do Not Remove" label. Which section of the Schedule of Inspections catches this?',
    options: [
      'Section 4 — routing of cables.',
      'Section 5 — selection of conductors.',
      'Section 9 — identification and warning notices.',
      'Section 11 — earthing arrangements.',
    ],
    correctIndex: 2,
    explanation:
      'The BS 951 bonding label is a warning notice required by Reg 514.13. The Schedule of Inspections groups all warning notices, danger labels and identification labels in Section 9. The bonding clamp itself is in Section 12 (bonding); the label requirement is in Section 9.',
  },
  {
    id: 'soi-na-vs-lim',
    question:
      'On a TN-C-S domestic install, the Schedule of Inspections item "presence of earth electrode" should be recorded as:',
    options: [
      'LIM — the earth electrode applies but could not be accessed without disturbing the install.',
      '✗ — non-compliant, because a TN-C-S install should always have an earth electrode fitted.',
      '✓ — compliant, recording the electrode resistance measured at the cut-out.',
      'N/A — not applicable to this earthing arrangement.',
    ],
    correctIndex: 3,
    explanation:
      'A TN-C-S supply uses the supply&rsquo;s combined neutral-earth conductor — no earth electrode is required at the consumer&rsquo;s installation. The item is N/A. LIM would mean the item applies but you could not access it; ✗ would mean it applies and is non-compliant. N/A is the right code when the item simply does not apply to the system in front of you.',
  },
  {
    id: 'soi-record-finding',
    question:
      'You complete an inspection and find one terminal at the consumer unit with copper showing past the brass — clearly the conductor was overstripped. Where do you record it?',
    options: [
      'On the Schedule of Inspections, item 6 (connection of conductors), as ✗ with a brief description; flag the supervisor and fix before energising.',
      'On the Schedule of Test Results, against the relevant circuit, as a measured value to be compared with the design prediction.',
      'On the Schedule of Inspections, item 9 (notices and labels), as a LIM because the terminal was behind the busbar shroud.',
      'Nowhere on the paperwork — simply re-strip and re-terminate the conductor, since a defect fixed on the day does not need to be recorded.',
    ],
    correctIndex: 0,
    explanation:
      'Inspection findings go on the Schedule of Inspections. Item 6 is the connection of conductors check. ✗ records the non-compliance, with enough description that the supervisor (and any future inspector reading the EIC pack) knows exactly what was wrong. Fixing without recording leaves no audit trail and breaks the inspection-to-EIC traceability.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The IET model Schedule of Inspections is set out in which BS 7671 appendix?',
    options: [
      'Appendix 3',
      'Appendix 6',
      'Appendix 4',
      'Appendix 15',
    ],
    correctAnswer: 1,
    explanation:
      'Appendix 6 in BS 7671 contains the model forms — EIC, EICR, Minor Works Certificate, Schedule of Inspections and Schedule of Test Results. The Schedule of Inspections is the form you use to evidence the Section 642 inspection.',
  },
  {
    id: 2,
    question:
      'On the IET model Schedule of Inspections, the four codes you can use to mark each item are:',
    options: [
      'Pass / Fail',
      'C1 / C2 / C3 / FI',
      '✓ / N/A / LIM / ✗',
      'Yes / No / Maybe',
    ],
    correctAnswer: 2,
    explanation:
      'The Schedule of Inspections uses ✓ (compliant), N/A (not applicable), LIM (limitation in scope) and ✗ (non-compliant). C1/C2/C3/FI are the EICR observation codes used on the Electrical Installation Condition Report — different form, different purpose.',
  },
  {
    id: 3,
    question:
      'Which Schedule of Inspections section covers "single-pole devices in line conductors only"?',
    options: [
      'Section 11',
      'Section 3',
      'Section 14',
      'Section 8',
    ],
    correctAnswer: 3,
    explanation:
      'Section 8 of the Schedule of Inspections covers single-pole switches and protective devices being in the line conductor only — the verification of Reg 514.16 / 537.2.2. A fuse, MCB or single-pole switch in the neutral is a fail and gets a ✗ here.',
  },
  {
    id: 4,
    question:
      'Section 11 of the Schedule of Inspections covers earthing arrangements. The presence of an earth electrode and its resistance is verified there. On a TN-S install (separate earth from supplier), this item should be:',
    options: [
      'N/A — not applicable; earthing is provided by the supplier.',
      '✓ — compliant; record the measured electrode resistance for the TN-S electrode.',
      'LIM — the electrode applies but could not be accessed at the cut-out.',
      '✗ — non-compliant; a TN-S install must always have its own earth electrode.',
    ],
    correctAnswer: 0,
    explanation:
      'TN-S earthing is provided by the supplier (typically the cable armour on the cut-out). No installation earth electrode is required, so the "earth electrode" item is N/A on TN-S and TN-C-S installs. The earth electrode item is only ✓ on TT installs (and on TT portions of dual systems).',
  },
  {
    id: 5,
    question:
      'You are inspecting a finished CU and the busbar shroud has been screwed in place such that you cannot see the line side of any RCBO. You should record items relating to those terminations as:',
    options: [
      '✓ — compliant; a sealed busbar shroud is evidence that the terminations behind it have been correctly made.',
      'LIM — limitation; could not access without disturbing the install. Note clearly what was limited and flag the supervisor.',
      '✗ — non-compliant; any termination you cannot see must be treated as a defect until proven otherwise.',
      'N/A — not applicable; terminations hidden by a shroud fall outside the scope of the inspection.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 642.1 says inspection is normally done with the install accessible. If access is genuinely limited (busbar shroud, sealed accessory, terminations behind a fixed appliance), you record LIM with a clear description of what was limited. The supervisor decides whether to revisit, accept the limitation, or open the install up to verify. You do not assume compliance.',
  },
  {
    id: 6,
    question:
      'Section 9 of the Schedule of Inspections covers warning notices and labels. Which of the following is checked under a DIFFERENT section, not Section 9?',
    options: [
      'CU way labels matching the circuit schedule.',
      'The continuity of the main bonding conductor to the gas service.',
      'The RCD test notice fitted at the consumer unit.',
      'The BS 951 "Safety Electrical Connection" label on bonding clamps.',
    ],
    correctAnswer: 1,
    explanation:
      'Section 9 covers identification and warning notices — CU way labels, the RCD test notice, the BS 951 bonding clamp labels, the periodic inspection notice and the mixed-cable-colours notice. The continuity of the main bonding conductor itself is a bonding check under Section 12, not a notice check; Section 9 only verifies the label is present, not the bond.',
  },
  {
    id: 7,
    question:
      'The Schedule of Inspections is signed by:',
    options: [
      'The customer or duty holder, confirming they accept the installation.',
      'The Building Control surveyor, confirming the work meets the Building Regulations.',
      'The scheme assessor at the next annual assessment visit.',
      'The competent person who carried out the inspection.',
    ],
    correctAnswer: 3,
    explanation:
      'The Schedule of Inspections is signed by the competent person responsible for the inspection. At Level 2 that is normally your supervisor, with you noted as having assisted. As you move through the apprenticeship and become a competent person yourself, you start signing your own Schedule of Inspections — typically post-qualification.',
  },
  {
    id: 8,
    question:
      'You finish a Schedule of Inspections — every item is ✓ except two LIM (cable runs in finished plaster, you could not see them) and zero ✗. The next step is:',
    options: [
      'Hand to the supervisor for review, agree how the LIM items are recorded on the EIC, then proceed to dead testing (Sub 5.3 / Section 6).',
      'Re-mark the two LIM items as ✗ so the form shows a full set of findings, then issue the EIC and energise.',
      'Energise the installation first, then carry out dead testing on the live circuits to save a second visit.',
      'Issue the EIC immediately on the strength of a clean inspection — once there are no ✗ items, testing is not required.',
    ],
    correctAnswer: 0,
    explanation:
      'A clean inspection (no ✗) means the install is ready for testing. The two LIM items get either revisited if practical, or recorded as limitations on the EIC. Dead testing (Section 643) follows the inspection. Live testing follows dead testing. Only when both are complete and clean does the EIC get issued and the install energised.',
  },
];

const faqs = [
  {
    question:
      'What is the difference between the Schedule of Inspections and the Schedule of Test Results?',
    answer:
      'The Schedule of Inspections records what you saw during the visual inspection — connections, identification, routing, labels, notices, accessories. Pass / fail per item using ✓ / N/A / LIM / ✗. The Schedule of Test Results records what you measured with instruments during testing — continuity values (Ω), insulation resistance (MΩ), polarity result, loop impedance (Zs in Ω), RCD trip times (ms), prospective fault current (kA). Two forms, two stages, two purposes. Both attach to the EIC.',
  },
  {
    question: 'How many items are on the model Schedule of Inspections?',
    answer:
      'The IET model form has around 60 numbered items grouped into sections (the exact count varies slightly between editions and printings — the BS 7671:2018+A4:2026 model form has been refreshed). The grouping is roughly: distributor / origin (1–2), identification (3), cable routing (4), conductor selection (5), conductor connections (6), erection (7), single-pole devices (8), notices and labels (9), accessory connection (10), earthing (11), bonding (12), CPCs (13), ADS (14), other protective measures (15), erection methods (16), general (17). At Level 2 you do not memorise every numbered item — you understand the section groupings, what each section verifies, and you can run the form on a printed copy or on the screen.',
  },
  {
    question: 'Can I customise the Schedule of Inspections form for the install I am working on?',
    answer:
      'Yes — within reason. Many electrical contractors run a digital Schedule of Inspections in software (the on-app inspection module on Elec-Mate is one example) where the form auto-hides items that are N/A based on the install type you set. So a domestic TN-C-S CU upgrade does not show you "earth electrode" or "PV array protection" — they get auto-marked N/A. As long as the form covers every Reg 642.3 item that applies to this install and gets signed off by a competent person, you are compliant. The IET model form is the reference, not the only legitimate format.',
  },
  {
    question: 'Item 8 — single-pole devices in line conductors only — feels redundant. Why is it called out separately?',
    answer:
      'Because it is one of the highest-frequency defects on first-fix inspection, especially with imported gear or unbranded fuse units. A fuse in the neutral leaves the circuit live when the fuse blows (potentially fatal during fault investigation). A single-pole MCB in the neutral provides no overcurrent protection on the line conductor (relies on the upstream device, which may not coordinate). A single-pole switch in the neutral leaves the lamp / appliance permanently live (shock risk during lamp change). It is so important and so easy to get wrong that BS 7671 broke it out as its own dedicated checklist item, on its own dedicated section, with its own dedicated regulation (514.16 / 537.2.2). Treat it as a first-class check at every accessory.',
  },
  {
    question: 'What about new BS 7671 A4:2026 items — AFDDs, Type A RCDs, mixed earthing?',
    answer:
      'The model Schedule of Inspections gets refreshed alongside each BS 7671 amendment. A4:2026 brings the AFDD recommendation in Reg 421.1.7 (recommended in dwellings; effectively required in HRRBs under the Building Safety Act 2022 framework, with supporting fire-safety guidance covering HMOs / sleeping accommodation / care homes), the Type A RCD minimum for fixed equipment with DC components in Reg 531.3.3, the TN-C-S labelling clarifications. The current model Schedule of Inspections asks you to verify these where relevant. Older printed forms may need a manual addition. The on-app form should be on the latest version — check with your supervisor that the form you are running matches the current amendment.',
  },
  {
    question:
      'I have inspected a circuit and everything looks fine, but I am not 100% sure about one item. Should I tick it ✓?',
    answer:
      'No. The whole point of the Schedule of Inspections is the auditability — every ✓ means a competent person looked, verified, and is willing to put their name to it. If you are not sure, you have three options. (1) Take longer and verify it properly — usually the right answer. (2) Ask your supervisor to look with you and confirm. (3) Mark it LIM with a clear description of why you are unsure — "could not verify CPC continuity at point X without dismantling fitting" — and let the supervisor decide. What you do not do is tick ✓ to keep the form tidy. That is how defects make it through to energisation.',
  },
];

const soiSections = [
  {
    section: '1.0',
    heading: 'Distributor&rsquo;s installation / origin',
    items: [
      'Service cable condition',
      'Service head condition',
      'Distributor&rsquo;s earthing arrangement (TN-C-S / TN-S / TT)',
      'Meter tails — distributor&rsquo;s side',
      'Metering equipment',
      'Isolator condition (where present)',
    ],
  },
  {
    section: '2.0',
    heading: 'Presence of adequate arrangements where simultaneous supply',
    items: [
      'Adequate arrangements for separate sources, where applicable',
      'Adequate arrangements for parallel sources (e.g. PV, generator)',
      'Earthing arrangement particulars where multiple sources are present',
    ],
  },
  {
    section: '3.0',
    heading: 'Consumer&rsquo;s installation — meter tails and consumer unit',
    items: [
      'Meter tails — consumer&rsquo;s side',
      'Consumer unit / distribution board condition',
      'Main switch / isolator condition',
      'Enclosure of live parts — IP rating, no missing knockouts',
    ],
  },
  {
    section: '4.0',
    heading: 'Identification of conductors',
    items: [
      'Brown / blue / green-yellow throughout (modern colours)',
      'Switched lives identified at both ends with brown sleeving',
      'Phase identification on three-phase circuits',
      'Old colours sleeved or labelled where present (mixed-colour notice fitted)',
    ],
  },
  {
    section: '5.0',
    heading: 'Cables — routing and protection',
    items: [
      'Cables in walls run in prescribed zones, or RCD-protected per Reg 522.6.202',
      'Cables in floors / ceilings supported and protected',
      'Cables passing through joists drilled or notched correctly (depth, position)',
      'External / buried cables of an appropriate type and depth (Reg 522.8.10)',
    ],
  },
  {
    section: '6.0',
    heading: 'Connection of conductors',
    items: [
      'Every termination secure, no copper showing past the terminal',
      'No insulation trapped inside the terminal',
      'CPCs sleeved at every point including back-box flying leads',
      'Joints accessible for inspection (or excepted under Reg 526.3)',
      'Torque setting consistent with manufacturer&rsquo;s instructions',
    ],
  },
  {
    section: '7.0',
    heading: 'Erection of cables — supports, bend radii, mechanical protection',
    items: [
      'Cable supports at correct intervals (BS 7671 Appendix 4 / OSG)',
      'Bend radii respected — no kinks, no sharp turns',
      'Cables not in contact with thermal insulation in a way that causes overheating (Reg 523)',
      'Mechanical protection where required',
    ],
  },
  {
    section: '8.0',
    heading: 'Single-pole devices in line conductors only',
    items: [
      'Every fuse in the line conductor — never the neutral',
      'Every MCB in the line conductor',
      'Every single-pole switch in the line conductor',
      'Switched FCUs, lighting switches, in-line fuses — all line side',
    ],
  },
  {
    section: '9.0',
    heading: 'Identification — warning notices, labels, diagrams',
    items: [
      'CU way labels match the circuit schedule',
      'Main switch labelled',
      'Periodic inspection notice fitted (Reg 514.12)',
      'RCD test notice fitted (Reg 514.12.2) where RCDs are present',
      'BS 951 bonding labels at every clamp (Reg 514.13)',
      'Mixed-cable-colours notice if applicable (Reg 514.14)',
      'Surge protection device notice if SPD is fitted',
      'Photovoltaic / EV charging notices where applicable',
    ],
  },
  {
    section: '10.0',
    heading: 'Connection of accessories and equipment',
    items: [
      'Sockets, switches, lighting points wired to manufacturer&rsquo;s diagram',
      'Loop-in lighting wired correctly (permanent + switched live identified)',
      'No mixing of switched and permanent live in the same terminal',
      'Equipment installed in accordance with manufacturer&rsquo;s instructions',
    ],
  },
  {
    section: '11.0',
    heading: 'Earthing arrangements',
    items: [
      'Earthing conductor present and correctly sized',
      'Earth electrode present and resistance recorded (TT only)',
      'MET clearly identified and accessible',
      'Earthing connections clean, tight, no corrosion',
    ],
  },
  {
    section: '12.0',
    heading: 'Main and supplementary equipotential bonding',
    items: [
      'Main bonding to gas, water, oil, structural steel as required',
      'BS 951 clamps within 600 mm of the meter on bright clean metal',
      'Supplementary bonding present in special locations (older bathrooms, etc.)',
      'Bonding conductor sizes per BS 7671 544.1',
    ],
  },
  {
    section: '13.0',
    heading: 'Circuit protective conductors',
    items: [
      'CPC at every accessory and equipment outlet (Reg 411.3.1.1)',
      'CPC sized per BS 7671 543',
      'CPC continuous and unbroken through all accessories',
      'Sleeving green / yellow on bare CPC at every termination',
    ],
  },
  {
    section: '14.0',
    heading: 'Automatic disconnection of supply (ADS)',
    items: [
      'Protective device of correct type and rating per design',
      'RCD additional protection where required (Reg 411.3.3, 411.3.4, 522.6.202)',
      'AFDD where required (Reg 421.1.7 — HRRB, sleeping accommodation, care homes)',
      'RCD type appropriate to the load (Type A minimum for fixed equipment with DC components — Reg 531.3.3)',
    ],
  },
  {
    section: '15.0',
    heading: 'Other protective measures',
    items: [
      'SELV / PELV systems where applicable',
      'Double or reinforced insulation (Class II) where applicable',
      'Electrical separation where applicable',
      'Non-conducting locations where applicable',
    ],
  },
  {
    section: '16.0',
    heading: 'Erection method and workmanship',
    items: [
      'Selection and erection of wiring systems suitable for environment',
      'Selection of equipment appropriate to external influences (IP, IK, ambient)',
      'Adequacy of access to switchgear and equipment',
      'General workmanship — neat, secure, professional',
    ],
  },
  {
    section: '17.0',
    heading: 'General — SPDs, EMC, special locations',
    items: [
      'SPD selection and installation per Section 443 / 534',
      'EMC measures where applicable (cable separation, screening)',
      'Special location requirements (Part 7) — bathrooms, swimming pools, EV, PV, agricultural',
    ],
  },
];

export default function Sub2() {
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
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 2"
            title="Schedule of Inspections walkthrough"
            description="Every section of the IET model Schedule of Inspections from BS 7671 Appendix 6 — what each item asks for, how to verify it visually, how to record limitations and non-conformances."
            tone="emerald"
          />

          <TLDR
            points={[
              'The IET model Schedule of Inspections (BS 7671 Appendix 6) is the form you fill in to evidence the Section 642 inspection. Around 60 items grouped into ~17 sections.',
              'Each item gets one of four codes — ✓ (compliant), N/A (not applicable), LIM (limitation in scope), ✗ (non-compliant). ✗ must be fixed before energising.',
              'Sections follow the install — origin (1–3), identification (4), cables (5–7), single-pole devices (8), notices (9), accessories (10), earthing + bonding (11–13), ADS (14), other protective measures (15–17).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Supplementary content — extends LO5 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding of inspection practice.',
              'Locate the model Schedule of Inspections in BS 7671 Appendix 6 and recognise the section groupings.',
              'Apply the four codes (✓ / N/A / LIM / ✗) correctly to each inspection item.',
              'Walk a printed or digital Schedule of Inspections from origin to general items in the same order each time.',
              'Identify which items are commonly N/A on common install types (TN-C-S domestic, TN-S commercial, TT rural).',
              'Recognise warning notices and labels required by Reg 514 and verify their presence at inspection.',
              'Cross-reference each Schedule of Inspections section back to the matching BS 7671 chapter or regulation.',
            ]}
            initialVisibleCount={3}
          />

          <VideoCard
            url={videos.scheduleOfInspections.url}
            title={videos.scheduleOfInspections.title}
            channel={videos.scheduleOfInspections.channel}
            duration={videos.scheduleOfInspections.duration}
            topic="Schedule of Inspections walkthrough · Unit 204 AC 5.1"
            caption="Craig Wiltshire walks the IET model Schedule of Inspections from Appendix 6 — every section group, what each item is asking for, and how the four codes (✓ / N/A / LIM / ✗) attach to a real install."
          />

          <ConceptBlock
            title="The Schedule of Inspections is the inspection in paper form"
            plainEnglish="If Sub 5.1 is the rhythm of the inspection itself, the Schedule of Inspections is the form that proves you did it. Every numbered item corresponds to one Reg 642.3 verification step. You walk the install, you mark each item, you sign the form, it attaches to the EIC."
            onSite="Print one out — or pull one up on the app. Run it. Tick as you go. Do not try to fill it in from memory after the fact — that is how you miss things. Do not skip items because they look obvious — that is how the easy defects get through. Do every item, in order, every time."
          >
            <p>
              <strong>Where the form lives:</strong> BS 7671 Appendix 6 — the model forms.
              The Schedule of Inspections sits alongside the EIC, the EICR, the Minor Works
              Certificate and the Schedule of Test Results. The IET version is the model;
              most contractor software uses the same items in the same order, sometimes
              with extra columns for the install type (so N/A items auto-hide).
            </p>
            <p>
              <strong>What it proves:</strong> That a competent person carried out the
              Section 642 inspection on a defined date, found these items in this state,
              and signed for it. It is the audit trail. It is what an inspector reading
              the EIC pack three years from now sees to verify the inspection happened.
            </p>
            <p>
              <strong>What it does not prove:</strong> That the install works electrically.
              That is the Schedule of Test Results — the instrument-based output of
              Section 643 testing (Sub 5.3 covers the prep, Section 6 covers the tests
              themselves). Two forms, two stages, both required.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.4 (Recording inspection results)"
            clause="An inspection is required upon completion of a new installation or upon completion of an addition or alteration. Information regarding the inspection shall be recorded on the Schedule of Inspections of the appropriate certificate or report (see Chapter 64 and Appendix 6)."
            meaning={
              <>
                Reg 642.4 is the regulation that mandates the form. The inspection is not
                just done — it is <strong>recorded</strong>, on the appropriate Schedule
                of Inspections, which attaches to the EIC (for new work) or the EICR (for
                periodic inspection). No record, no certificate. The form is not optional
                paperwork — it is the evidence.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.4 (paraphrased — see also Appendix 6)."
          />

          <SectionRule />

          <ContentEyebrow>The form, section by section</ContentEyebrow>

          <ConceptBlock
            title="Walking the model Schedule of Inspections"
            plainEnglish="Below — every section of the IET model form, in order, with the items each section verifies. Use this as your reference when you run a real inspection. The exact item numbering varies between printings; the section groupings and the verification intent stay the same."
            onSite="On a real domestic install on TN-C-S, sections 1.0, 11.0 (earth electrode item), 15.0 (most items) usually end up N/A. Most of your live inspection energy goes on sections 6, 9, 10, 11, 12, 13, 14 — the workmanship + protection items."
          >
            <div className="space-y-3">
              {soiSections.map((sec) => (
                <div
                  key={sec.section}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                >
                  <div className="flex items-baseline gap-2.5 border-b border-white/[0.08] pb-2 mb-2.5">
                    <span className="text-elec-yellow font-semibold text-[14px] tracking-wider">
                      {sec.section}
                    </span>
                    <span
                      className="text-white text-[14px] font-medium"
                      dangerouslySetInnerHTML={{ __html: sec.heading }}
                    />
                  </div>
                  <ul className="space-y-1.5 text-[12.5px] text-white/85">
                    {sec.items.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-white/40 mt-1">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The four codes — using them correctly</ContentEyebrow>

          <ConceptBlock
            title="✓ / N/A / LIM / ✗ — what each one means in practice"
            plainEnglish="The codes look simple but the discipline of using them correctly is what makes the Schedule of Inspections meaningful. Wrong codes mean a meaningless form — a ticked box that proved nothing."
          >
            <ul className="space-y-2.5 list-none pl-0">
              <li className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-emerald-400 font-bold text-[16px]">✓</span>
                  <span className="text-white text-[14px] font-semibold">Compliant</span>
                </div>
                <p className="text-[13px] text-white/85 mt-1.5 leading-relaxed">
                  Inspected, meets BS 7671, no concerns. Most items on a well-built new
                  install end up here. Do not use ✓ if you did not actually look — that
                  is the most common abuse of the form.
                </p>
              </li>
              <li className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-white/60 font-bold text-[14px]">N/A</span>
                  <span className="text-white text-[14px] font-semibold">
                    Not applicable
                  </span>
                </div>
                <p className="text-[13px] text-white/85 mt-1.5 leading-relaxed">
                  The item does not apply to this install. Earth electrode on TN-C-S /
                  TN-S. Three-phase identification on a single-phase install. PV array
                  on an install with no PV. Bonding to oil on a building with no oil
                  supply. Always think before marking N/A — sometimes an item that looks
                  N/A is actually a missed requirement.
                </p>
              </li>
              <li className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-amber-400 font-bold text-[14px]">LIM</span>
                  <span className="text-white text-[14px] font-semibold">
                    Limitation in scope
                  </span>
                </div>
                <p className="text-[13px] text-white/85 mt-1.5 leading-relaxed">
                  The item applies but you could not access it without dismantling the
                  install. Sealed busbar shroud over RCBO terminations. Cable runs in
                  finished plaster. Terminations behind a fixed appliance. Record clearly
                  what was limited and why. The supervisor decides whether to revisit,
                  accept, or open the install up.
                </p>
              </li>
              <li className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-red-400 font-bold text-[16px]">✗</span>
                  <span className="text-white text-[14px] font-semibold">
                    Non-compliant
                  </span>
                </div>
                <p className="text-[13px] text-white/85 mt-1.5 leading-relaxed">
                  The item fails the inspection. Loose terminal. Missing CPC. Fuse in
                  neutral. Missing bonding clamp. Missing notice. Wrong RCD type. The
                  install does not get energised until every ✗ is resolved. Record what
                  was wrong, fix it, re-inspect, mark ✓.
                </p>
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

          <ContentEyebrow>Limitations — when LIM is the right call</ContentEyebrow>

          <ConceptBlock
            title="LIM is not a way to skip work — it is an honest record of what could not be inspected"
            plainEnglish="A limitation is recorded when the inspection of an item could not reasonably be carried out without disturbing the installation. The key word is &lsquo;reasonably&rsquo; — you do not LIM something just because it would take an extra ten minutes. You LIM it when accessing it would create new work or new defects."
            onSite="The biggest source of legitimate LIMs on a new domestic install is cable runs in finished walls. You inspected them at first-fix. You verified them then. By the time the plaster is on, you cannot see them. That is a LIM with a clear note: &lsquo;Cable runs in walls inspected at first-fix on [date], confirmed in prescribed zones, no longer visible at final inspection.&rsquo;"
          >
            <p>
              <strong>Legitimate LIM examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Cable runs in finished walls — inspected at first-fix, no longer visible.
              </li>
              <li>
                Terminations behind a sealed busbar shroud — would require dismantling
                the CU to access.
              </li>
              <li>
                Connections behind a fixed appliance (oven, hob, immersion) — would
                require disconnection of the appliance.
              </li>
              <li>
                Cable runs above a sealed ceiling — would require ceiling access.
              </li>
              <li>
                Equipment installed by others (a separate contractor&rsquo;s PV array,
                an EV charger fitted by the manufacturer) — outside the scope of your
                inspection.
              </li>
            </ul>
            <p>
              <strong>Not legitimate LIM — these are just laziness:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>"Did not check because the install looks fine."</li>
              <li>"Did not check because the manufacturer has signed it off."</li>
              <li>"Did not check because we were running late."</li>
              <li>"Did not check because the customer wanted to energise immediately."</li>
            </ul>
            <p>
              Every LIM gets a written description of what was limited and why. The supervisor
              reviews, decides next steps, and signs the form.
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

          <ContentEyebrow>Sections 11–13 — earthing, bonding, CPCs (the protection items)</ContentEyebrow>

          <ConceptBlock
            title="The earthing and bonding sections — where the protective system gets verified"
            plainEnglish="Sections 11 (earthing arrangements), 12 (main and supplementary bonding) and 13 (circuit protective conductors) are where a Schedule of Inspections evidences the protective system that keeps the install safe under fault. Spend extra time here — these are the items that protect people from electric shock."
            onSite="Walk these three sections together because they form one verification chain. Earthing conductor MET to consumer unit. Main bonding to gas / water / oil / structural steel. CPCs at every accessory. Each clamp BS 951 labelled. Continuity (at testing stage) confirms the protective system actually works."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earthing conductor:</strong> Sized per BS 7671 543. CSA matches
                or exceeds requirements (typically 16 mm² for 100 A TN-C-S supply with
                bonding via the same cable). Continuous from MET to the supply earthing
                terminal at the cut-out.
              </li>
              <li>
                <strong>MET:</strong> Clearly identified. Accessible. Earthing conductor
                landed correctly. CPCs from circuits all terminated.
              </li>
              <li>
                <strong>Main bonding:</strong> Each extraneous-conductive-part bonded
                back to MET. Clamp within 600 mm of the meter / where the service enters
                the building. BS 951 label on every clamp. Sized per BS 7671 544.1
                (typically 10 mm² for TN-C-S up to 100 A, but check the supply).
              </li>
              <li>
                <strong>Supplementary bonding:</strong> Where required (some older
                bathrooms, certain Part 7 locations). May be excluded if 30 mA RCD
                additional protection is provided across the whole installation per Reg
                415.1.1.
              </li>
              <li>
                <strong>CPCs:</strong> At every accessory. Sized per BS 7671 543.
                Continuous through the install — verified by R1+R2 continuity test.
                Sleeved green/yellow at every termination.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.1 (Protective earthing)"
            clause="Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. Conductors for protective earthing shall comply with Chapter 54. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point."
            meaning={
              <>
                Section 13 of the Schedule of Inspections (Circuit protective conductors)
                verifies Reg 411.3.1.1. Every Class I exposed-conductive-part has a CPC
                terminated at it — no exceptions other than the limited case of a
                lampholder with no exposed-conductive-parts. The inspection looks for
                CPC presence, sleeving, secure termination, and visual continuity. The
                test stage (Sub 5.3 / Section 6) confirms electrical continuity.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.1."
          />

          <SectionRule />

          <ContentEyebrow>Section 14 — Automatic Disconnection of Supply (ADS)</ContentEyebrow>

          <ConceptBlock
            title="ADS verification — the right device, right type, right setting"
            plainEnglish="Section 14 of the Schedule of Inspections covers the protective devices that disconnect the supply on a fault. Right MCB / RCBO / RCD / AFDD type for the load. Right rating per the design. Right additional protection (30 mA RCD) where Reg 411.3.3, 411.3.4, 522.6.202 or 415.1.1 require it. A4:2026 added the AFDD requirements in Reg 421.1.7."
            onSite="The most common ADS non-conformance an apprentice will see flagged is missing 30 mA RCD on a socket circuit — Reg 411.3.3 mandates it on every socket up to 32 A. The second most common is the wrong RCD type — Type AC where Type A is now required per Reg 531.3.3 (A4:2026)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Device type:</strong> MCB Type B for resistive / small inductive
                loads. Type C for inductive / motor inrush. Type D for high-inrush
                industrial. RCD Type A (minimum per Reg 531.3.3 A4:2026) for general
                wiring. Type B for EV per Section 722.
              </li>
              <li>
                <strong>Device rating:</strong> Matches the cable CSA (Reg 433.1.1 — In ≤
                Iz). Matches the design schedule. Coordinates with upstream device
                (selectivity / discrimination).
              </li>
              <li>
                <strong>Additional 30 mA RCD:</strong> Reg 411.3.3 (sockets up to 32 A
                in any installation). Reg 411.3.4 (lighting in domestic premises). Reg
                522.6.202 (cables in walls outside prescribed zones). Reg 415.1.1
                (special locations including bathrooms).
              </li>
              <li>
                <strong>AFDD:</strong> Reg 421.1.7 (A4:2026) — recommended for AC final
                circuits supplying socket-outlets ≤ 32 A in dwellings. The
                recommendation strengthens to a requirement in HRRBs under the Building
                Safety Act 2022 framework; supporting fire-safety guidance treats them
                as effectively required practice in HMOs / sleeping accommodation /
                care homes. Inspection verifies presence where required.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 531.3.3 (RCD Type AC restriction — A4:2026 update)"
            clause="531.3.3 now states that RCD Type AC shall only be used to serve fixed equipment, where it is known that the load current contains no DC components."
            meaning={
              <>
                Section 14 of the Schedule of Inspections now has to verify the RCD type
                against this much tighter A4:2026 rule. Type AC RCDs are no longer
                acceptable for general wiring — they may only serve fixed equipment with
                no DC components in the load current. Modern domestic / commercial
                equipment routinely contains DC components (LED drivers, switch-mode
                supplies, induction hobs, EV chargers, heat pumps), so Type A is now the
                effective minimum for general fixed wiring. Type B for EV and similar
                applications. A Type AC RCD on a kitchen socket ring is a non-conformance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 53, Regulation 531.3.3."
          />

          <SectionRule />

          <CommonMistake
            title="Marking everything ✓ to keep the form tidy"
            whatHappens={
              <>
                The Schedule of Inspections has 60 items. You walked the install. Most of
                it looks fine. You start ticking ✓ down the column without actually
                verifying each item — &ldquo;they all look good, I&rsquo;ll just tick the lot
                and move on&rdquo;. The supervisor signs it without re-checking. Six months
                later the install develops a fault — turns out the CPC at one socket
                outlet was never connected. The item was ✓ on the Schedule of
                Inspections. The auditability has just collapsed.
              </>
            }
            doInstead={
              <>
                Treat each ✓ as a personal commitment. If you tick it, you looked, you
                verified, you are willing to put your name to it. If you did not actually
                look at an item — say so. Mark it LIM with a note "did not access". The
                supervisor will either go and look themselves, or send you back to do it
                properly. <strong>A form full of honest LIMs is far more useful than
                a form full of dishonest ✓.</strong> The whole point of the Schedule of
                Inspections is the audit trail — the ability for someone reading the EIC
                pack later to know exactly what was checked and what was not.
              </>
            }
          />

          <Scenario
            title="CU swap-out inspection — first 10 items walked through"
            situation={
              <>
                A homeowner has had their old wylex fuse box swapped for a modern 18th
                Edition CU with RCBO ways and an SPD. The install is finished — every
                circuit reterminated into the new CU, the meter tails are upgraded to
                25 mm², the MET is in, the main bonding has been verified. Customer is
                upstairs waiting for the install to be energised. Your supervisor hands
                you the Schedule of Inspections and says &ldquo;walk it&rdquo;. The new
                CU cover is off. The install is dead.
              </>
            }
            whatToDo={
              <>
                <strong>Item 1 (origin / cut-out):</strong> Look at the cut-out — clean,
                undamaged, sealed. Mark ✓.<br />
                <strong>Item 2 (meter tails distributor side):</strong> Old tails into
                meter, new tails out. Sheath in good order. Mark ✓.<br />
                <strong>Item 3 (meter tails consumer side):</strong> 25 mm² tails into
                main switch. CSA correct. Sheath stripped to right point. No copper past
                the terminal. Mark ✓.<br />
                <strong>Item 4 (CU condition):</strong> New CU, sealed BS EN 61439-3,
                no missing knockouts, all blanking pieces in. Mark ✓.<br />
                <strong>Item 5 (main switch):</strong> Labelled "Main Switch", isolates
                the install. Mark ✓.<br />
                <strong>Item 6 (identification of conductors):</strong> Brown, blue,
                green-yellow throughout. Switched lives identified at both ends. Mark ✓.<br />
                <strong>Item 7 (cable routing):</strong> Cables out of CU into prescribed
                zones, original routes (chased into walls before plaster). Mark LIM with
                note &ldquo;original cable routes in finished walls — verified in
                prescribed zones at first-fix on previous installation, RCD additional
                protection now provided per Reg 522.6.202&rdquo;.<br />
                <strong>Item 8 (selection of conductors / CSA):</strong> Existing
                circuits — 1.5 mm² lighting, 2.5 mm² rings, 6 mm² shower. Verified
                against schedule. Mark ✓.<br />
                <strong>Item 9 (single-pole devices in line conductors only):</strong>
                Every RCBO seated correctly, line and neutral on the right poles. Mark ✓.<br />
                <strong>Item 10 (CU way labels):</strong> Every way labelled with circuit
                description. Mark ✓.<br />
                Continue through the form. Hand to supervisor.
              </>
            }
            whyItMatters={
              <>
                A CU swap is the most common job an apprentice will inspect at Level 2 /
                early Level 3. The pattern is the same on every one — origin → CU →
                circuits → bonding → notices. Get the rhythm consistent and you can run
                a clean Schedule of Inspections on a CU swap in 25–30 minutes. That is
                the speed a competent electrician runs at. You build to it.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The signature step — competent person sign-off</ContentEyebrow>

          <ConceptBlock
            title="Who signs the Schedule of Inspections — and what their signature means"
            plainEnglish="The Schedule of Inspections is signed by the competent person who carried out (or supervised) the inspection. The signature is not a formality — it is a personal certification that every item marked ✓ has been verified, every LIM has been honestly recorded, and every ✗ has been resolved."
            onSite="At Level 2 the signature is normally your supervisor&rsquo;s, with you noted as having carried out the inspection. As you progress through the apprenticeship and demonstrate competence, you start signing your own forms. Once qualified you sign as the competent person."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Competent person:</strong> Defined in BS 7671 as &ldquo;a person
                who possesses sufficient technical knowledge, relevant practical skills
                and experience for the nature of the electrical work undertaken and is
                able at all times to prevent danger and, where appropriate, injury to
                him/herself and others&rdquo;.
              </li>
              <li>
                <strong>Inspector vs designer vs constructor:</strong> The EIC has three
                signatures — designer, constructor, inspector. On a small install they
                may all be the same person; on a larger one, three different people.
                The Schedule of Inspections is the inspector&rsquo;s evidence.
              </li>
              <li>
                <strong>What the signature means:</strong> &ldquo;I have personally
                inspected (or supervised the inspection of) the items recorded on this
                form, the findings are true and accurate, and any non-conformance has
                been resolved before this form is signed.&rdquo;
              </li>
              <li>
                <strong>Audit trail:</strong> The signed Schedule of Inspections attaches
                to the EIC. The pack sits with the customer (and a copy with the
                contractor) for the lifetime of the install. An inspector reading the
                pack three or thirty years later sees exactly what was checked, when,
                and by whom.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Different forms for different work — EIC, EICR, MWC</ContentEyebrow>

          <ConceptBlock
            title="The Schedule of Inspections sits inside one of three certificates"
            plainEnglish="The Schedule of Inspections is a Schedule — it attaches to a parent certificate. Three parents in BS 7671 Appendix 6: the Electrical Installation Certificate (EIC) for new work / additions / alterations, the Electrical Installation Condition Report (EICR) for periodic inspection of an existing install, and the Minor Works Certificate (MWC) for small additions / alterations not warranting a full EIC."
            onSite="At Level 2 you will see EICs and MWCs constantly. EICRs come later — typically I&T qualification onwards. The Schedule of Inspections is similar across all three, but with subtle differences in how findings are coded (especially for EICRs)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EIC — Electrical Installation Certificate:</strong> New install,
                or significant addition / alteration to an existing install. Three parts
                — declaration of design, declaration of construction, declaration of
                inspection and testing. Schedule of Inspections + Schedule of Test
                Results attached. Findings: ✓ / N/A / LIM / ✗ — and ✗ items must be
                resolved before issue.
              </li>
              <li>
                <strong>EICR — Electrical Installation Condition Report:</strong>{' '}
                Periodic inspection of an existing installation. Single combined
                certificate with sections for inspection findings and test results.
                Findings coded C1 / C2 / C3 / FI as appropriate. ✓ / N/A / LIM apply
                to inspection items not flagged with C codes.
              </li>
              <li>
                <strong>MWC — Minor Works Certificate:</strong> Small additions /
                alterations — extending a ring, adding a socket, replacing an accessory.
                Simpler form than an EIC. Inspection still required for the new work,
                still recorded.
              </li>
            </ul>
            <p>
              All three parents — EIC, EICR, MWC — share the same Section 642 inspection
              principle. The form changes; the discipline does not.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The Schedule of Inspections lives in BS 7671 Appendix 6 and is the paper / digital form that evidences the Section 642 inspection. Reg 642.4 mandates recording.',
              'Around 60 items grouped into ~17 sections — origin, identification, cables, connections, single-pole devices, notices, accessories, earthing, bonding, CPCs, ADS, other protective measures.',
              'Each item gets one of four codes — ✓ (compliant), N/A (not applicable), LIM (limitation), ✗ (non-compliant). Use them honestly. ✗ must be fixed before energising.',
              'N/A is for items that do not apply to this install (earth electrode on TN-C-S, PV protection on a non-PV install). Always think before marking N/A — could be a missed requirement.',
              'LIM is for items that apply but could not be accessed without disturbing the install. Always with a written description of what was limited and why.',
              'Section 8 (single-pole devices in line conductors only) is one of the highest-frequency defects on first-fix inspection — fuses or switches in the neutral. Always check.',
              'Section 9 (notices and labels) covers CU way labels, periodic inspection notice, RCD test notice, BS 951 bonding labels, mixed-cable-colours notice. All required by Reg 514.',
              'A clean Schedule of Inspections — ✓ throughout, honest LIMs, zero ✗ — is the gate to dead testing (Sub 5.3 / Section 6).',
            ]}
          />

          <Quiz
            title="Schedule of Inspections walkthrough — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section5/5-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.1 Verify wiring conforms to IET standards
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section5/5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Dead testing prep + sequence
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
