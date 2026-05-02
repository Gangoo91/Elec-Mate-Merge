import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm5-s1-prereq',
    question: 'Before energising an emergency lighting installation, which checks must be complete?',
    options: [
      'Visual only.',
      'A full pre-energisation check sequence: visual + mechanical + polarity + continuity of protective conductors + insulation resistance per BS 7671 Part 6, AND emergency-lighting-specific checks (luminaire positions per design, cable type and fixings, ICEL fire resistance, supply arrangements, charge state of internal batteries or central battery system). The general electrical verification per BS 7671 is the foundation; the BS 5266-1:2025 commissioning sequence is layered on top.',
      'Switch on and see.',
      'Polarity only.',
    ],
    correctIndex: 1,
    explanation:
      'Initial inspection is a layered process: BS 7671 Part 6 verification (the same as for any electrical installation) PLUS the emergency-lighting-specific commissioning checks defined in BS 5266-1:2025. Skipping the BS 7671 layer is the most common and most dangerous error — it leaves polarity, IR, and CPC continuity unverified before live work begins.',
  },
  {
    id: 'elm5-s1-photo',
    question: 'BS 5266-1:2025 has introduced an explicit photometric verification requirement. When is it carried out?',
    options: [
      'Once at design only.',
      'At INITIAL commissioning AND at five-yearly intervals throughout the life of the installation. The 2025 update made the periodic photometric survey explicit — point-by-point lux readings on the escape route, recorded against the design lux calculation. Previous practice often relied on the design calculation alone after commissioning; the 2025 standard requires the readings to be re-verified every five years to catch luminaire output decay, lamp ageing, and obstruction changes.',
      'Annually only.',
      'Monthly.',
    ],
    correctIndex: 1,
    explanation:
      'The five-yearly photometric verification is one of the headline changes in BS 5266-1:2025. It treats lux output as a degradable parameter (because it is — LED output decays, optics fog, batteries age) and requires it to be measured, not assumed. The commissioning lux survey is the reference; the five-yearly survey is the comparison.',
  },
  {
    id: 'elm5-s1-switchon',
    question: 'During the switch-on test (mains-fail simulation), all luminaires must operate within what response time?',
    options: [
      'Instantly.',
      'Per the design — typically classified as 0.5 s, 5 s, or 15 s response time depending on the application and risk. BS EN 50172:2024 (the system standard) sets the maximum changeover time and the design specifies which class applies for the area. The inspector verifies that every luminaire actually achieves the designed response when mains is interrupted.',
      'Within 1 minute.',
      'Within 1 hour.',
    ],
    correctIndex: 1,
    explanation:
      'Response time is a design parameter, not a single number. High-risk areas (escape routes with stairs, hazardous processes) demand 0.5 s; general escape routes accept 5 s; low-risk back-of-house areas may accept 15 s. The commissioning test verifies the actual measured changeover meets the designed class.',
  },
  {
    id: 'elm5-s1-cert',
    question: 'What is the formal output of initial inspection and verification of an emergency lighting installation?',
    options: [
      'A verbal handover.',
      'An ACCEPTANCE CERTIFICATE compliant with the BS 5266-1:2025 model form, signed by the competent person who carried out the verification. The certificate records: the installation address, the design reference, the standards complied with (BS 5266-1, BS EN 50172, BS 7671), the inspection results (visual, electrical, photometric, switch-on), the duration test result, and any departures or limitations. Without the acceptance certificate the installation is not formally commissioned and cannot be relied on for life-safety duty.',
      'A photo log.',
      'An invoice.',
    ],
    correctIndex: 1,
    explanation:
      'The acceptance certificate is the legal and contractual document that transfers the installation from "installed" to "commissioned and in service". The BS 5266-1:2025 model form is the recommended template; insurers and fire authorities expect to see it; the building owner needs it to demonstrate compliance with the Regulatory Reform (Fire Safety) Order 2005.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which standards govern initial inspection and verification of an emergency lighting installation?',
    options: [
      'BS 7671 only.',
      'BS 5266-1:2025 (the UK code of practice for emergency lighting — design, installation, verification), BS EN 50172:2024 (the European system standard for emergency escape lighting), BS EN 50171:2021 (central battery systems), BS 7671:2018+A2:2022 (general electrical installation requirements applied to the emergency lighting circuits), and the Regulatory Reform (Fire Safety) Order 2005 (the legal duty for the responsible person). All four sit on top of one another at commissioning.',
      'BS 5839 only.',
      'Building regs only.',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency lighting commissioning sits at the intersection of multiple standards. BS 7671 covers the underlying electrical work; BS 5266-1:2025 covers the emergency-lighting-specific design and verification; BS EN 50172 covers the system-level testing requirements; BS EN 50171 covers central battery systems where used; the RRO is the legal driver. Citing one in isolation misses the framework.',
  },
  {
    id: 2,
    question: 'What is the commissioning sequence for a self-contained luminaire installation?',
    options: [
      'Switch on, walk around.',
      'In order: (1) documentation review (design, as-built drawings, manufacturer manuals, lux calculation); (2) visual + mechanical inspection per BS 5266-1; (3) BS 7671 Part 6 verification (polarity, IR, CPC continuity, ZE/Zs as applicable); (4) charge the batteries for the manufacturer-specified period (typically 24 h); (5) initial photometric survey on the escape route; (6) switch-on test (mains-fail simulation, verify response time class met by every luminaire); (7) full 3-hour duration test; (8) recovery confirmation (charge restored within 24 h to ≥ 80%); (9) acceptance certificate; (10) handover documentation.',
      'Test before install.',
      'Random order.',
    ],
    correctAnswer: 1,
    explanation:
      'The sequence matters because earlier steps catch defects that would compromise later steps. Skipping the documentation review means the verifier has no design reference to verify against. Skipping the battery charge means the duration test is invalid. The BS 5266-1:2025 model commissioning sequence is the minimum.',
  },
  {
    id: 3,
    question: 'During pre-energisation visual inspection, which of the following is NOT typically checked?',
    options: [
      'Luminaire positions match the as-built drawing.',
      'Cable type meets fire-resistance specification.',
      'Mounting height and orientation per design.',
      'Manufacturer marketing literature on file.',
    ],
    correctAnswer: 3,
    explanation:
      'Luminaire positions, cable specification, and mounting are all checked at pre-energisation visual. Manufacturer marketing literature has nothing to do with verification. The required documentation is the manufacturer technical / installation manual and the data sheet — not the brochure.',
  },
  {
    id: 4,
    question: 'BS 5266-1:2025 has introduced an explicit five-yearly photometric verification. What does this mean in practice for the inspector?',
    options: [
      'Nothing changed.',
      'A point-by-point lux meter survey on the defined escape route — at the floor (or at the level specified by the design — typically 0.2 m above floor for spatial illumination on escape routes), at maximum design separation between luminaires, with the system in emergency mode. Readings are recorded against the design calculation and compared to the BS EN 1838 minima (typically 1 lx on escape route, 0.5 lx anti-panic, 15 lx high-risk). Any reading below design or below the standard requires investigation: lamp replacement, optic clean, battery service, additional luminaire.',
      'Take a single photo.',
      'Measure once at the panel.',
    ],
    correctAnswer: 1,
    explanation:
      'The five-yearly photometric is a real survey, not a tick-box. It is the only test that catches luminaire output decay over time. LED output drops, optics fog with dust and grease, batteries lose capacity — all of these reduce delivered lux without any obvious visual sign. The lux meter is the diagnostic.',
  },
  {
    id: 5,
    question: 'What is the minimum BS EN 1838 illuminance on a defined escape route?',
    options: [
      '0.1 lx.',
      '1 lx across the full width of the escape route at floor level (with edge exclusions: outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m, per BS EN 1838:2024). Uniformity ratio (max:min) not exceeding 40:1 along the route within the non-excluded width. Anti-panic lighting in open areas requires a minimum 0.5 lx over the empty floor area excluding a 0.5 m perimeter strip. High-risk task areas require 15 lx minimum or 10 % of the normal task illuminance, whichever is higher. These are the design references the photometric survey verifies.',
      '5 lx.',
      '50 lx.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838 sets the design minima. 1 lx escape route, 0.5 lx anti-panic, 15 lx high-risk task areas. The 40:1 uniformity ratio is as important as the absolute level — the eye dark-adapts to the maximum and goes blind to the minimum if the ratio is too wide.',
  },
  {
    id: 6,
    question: 'Which of the following BS 7671 Part 6 tests are relevant to an emergency lighting circuit?',
    options: [
      'None.',
      'Continuity of protective conductors (CPC continuity), insulation resistance (the IR test of the wiring system), polarity verification at every accessory and luminaire, earth fault loop impedance (Zs) at the most distant point of the emergency circuit, RCD operating time (where RCD protection is provided), and verification of automatic disconnection of supply (ADS) compliance. These are the same Part 6 tests applied to any electrical circuit; the emergency lighting circuit is not exempt.',
      'IR only.',
      'Polarity only.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Part 6 verification applies in full to emergency lighting circuits. The circuits carry mains for charging and for sustained operation in the case of central battery systems; they carry mains under normal conditions in maintained luminaires. The same tests apply. Skipping them is a regulatory failure.',
  },
  {
    id: 7,
    question: 'What is the purpose of the switch-on test (mains-fail simulation) at commissioning?',
    options: [
      'To check the lamps light up.',
      'To verify, under realistic conditions, that every luminaire on the installation actually transitions to emergency operation within the design response time when the local supply is interrupted. The test is performed by isolating the final circuit feeding the maintained / non-maintained luminaire (or the slave luminaire), observing the changeover, timing the response, and confirming the luminaire produces light. Self-contained luminaires switch internally; central battery slaves switch on at the central battery panel detecting mains loss; the central battery itself must transfer to its battery within the system class time.',
      'To test the battery only.',
      'To check the lamp colour.',
    ],
    correctAnswer: 1,
    explanation:
      'The switch-on test is the system-level functional verification. It catches: failed batteries (no light), wired-to-wrong-circuit luminaires (light comes on when wrong supply is interrupted), wrong-class luminaires (response too slow), and connectivity errors in central battery slaves (luminaire does not see central battery feed). It is the single most diagnostic commissioning test.',
  },
  {
    id: 8,
    question: 'What documentation is required at handover, in addition to the acceptance certificate?',
    options: [
      'Just the certificate.',
      'A documentation pack including: as-built drawings showing every luminaire by reference and circuit, the design lux calculation (e.g. the DIALux or relate reference), the manufacturer technical / installation manuals for every product type, the photometric data sheets, the cause-and-effect description (where staged or zoned operation is provided), the commissioning logbook starter (BS 5266-1 model logbook), the manufacturer warranty documentation, the spares list, and the user/responsible-person briefing summary. Insurers and fire authorities expect this pack on file.',
      'Marketing brochures.',
      'Receipts only.',
    ],
    correctAnswer: 1,
    explanation:
      'The acceptance certificate is one document in a much larger pack. The pack is the operating record of the installation for its lifetime — design, as-built, calculations, manuals, certificates, logbook, training. Without it, future periodic testing has no reference, future maintainers have no design data, and the responsible person cannot demonstrate compliance with the RRO 2005.',
  },
  {
    id: 9,
    question: 'Who is the "competent person" entitled to sign the BS 5266-1:2025 acceptance certificate?',
    options: [
      'Anyone.',
      'A person with the technical knowledge, training, and experience to carry out the inspection and tests safely and to interpret the results — typically an electrician with documented emergency lighting training (e.g. BAFE SP203-4, ICEL training, or equivalent), holding current BS 7671 18th Edition qualification, working under a documented procedural framework (firm QMS, third-party scheme, or in-house competence framework). BS 5266-1:2025 is explicit about the competence requirement; signing without it is a regulatory exposure.',
      'A site manager.',
      'A salesperson.',
    ],
    correctAnswer: 1,
    explanation:
      'Competence is not informal. It is documented training plus current qualification plus working procedural framework. Third-party certification schemes (BAFE SP203-4 the most relevant for emergency lighting) are the recognised route. Signing an acceptance certificate without competence is a contractual misrepresentation and may invalidate insurance.',
  },
  {
    id: 10,
    question: 'What does BS 5266-1:2025 say about departures from full compliance?',
    options: [
      'They are forbidden.',
      'Departures may be acceptable if technically justified, agreed with the building responsible person, and explicitly recorded on the acceptance certificate with the technical reasoning and the residual risk assessment. The 2025 update has tightened the bar — some categories of departure that were previously accepted (e.g. omitted photometric survey, unaddressed access constraints, missing logbook) are now declared unacceptable. The competent person must read the 2025 text on what is and is not acceptable; many "departures" of past practice no longer fly.',
      'They are always fine.',
      'They are silent.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 update parallels the BS 5839-1:2025 hard line on variations. Departures must be justified in writing, agreed by the responsible person, and risk-assessed. Some categories — particularly missing periodic photometric, missing logbook, missing competence record — are no longer departures, they are non-compliance. The acceptance certificate must reflect the position honestly.',
  },
];

const EmergencyLightingModule5Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Initial inspection and verification | Emergency Lighting Module 5.1 | Elec-Mate',
    description:
      'BS 5266-1:2025 commissioning of emergency lighting: pre-energisation checks, BS 7671 Part 6 verification, photometric survey (now five-yearly), switch-on test, 3-hour duration, acceptance certificate.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1"
            title="Initial inspection and verification"
            description="BS 5266-1:2025 commissioning of an emergency lighting installation: documentation review, pre-energisation visual and mechanical, BS 7671 Part 6 electrical verification, photometric survey (the 2025 update made this an explicit five-yearly recurring duty), switch-on test, three-hour duration test, recovery confirmation, and the acceptance certificate that transfers the installation from installed to commissioned."
            tone="yellow"
          />

          <TLDR
            points={[
              'Initial inspection is layered: BS 7671 Part 6 verification (continuity, IR, polarity, Zs, RCD) PLUS BS 5266-1:2025 emergency-lighting-specific commissioning checks. Both must be complete before the installation is signed off.',
              'Documentation review first: design lux calculation, as-built drawings, manufacturer manuals, cause-and-effect description (where staged/zoned). No design reference = no valid verification.',
              'Pre-energisation visual and mechanical: luminaire positions per design, cable type and fire-resistance, fixings, mounting, supply arrangements, battery state.',
              'BS 5266-1:2025 introduced an explicit photometric verification at commissioning AND at five-yearly intervals — a point-by-point lux meter survey on the escape route, against the design calculation and BS EN 1838 minima (1 lx escape, 0.5 lx anti-panic, 15 lx high-risk).',
              'Switch-on test (mains-fail simulation): every luminaire must transition to emergency operation within the design response class (0.5 s / 5 s / 15 s).',
              'Full 3-hour duration test confirms the installation can sustain emergency operation for the rated duration; recovery within 24 h to ≥ 80% capacity per BS EN 50171/50172.',
              'Output: BS 5266-1:2025 acceptance certificate, signed by a competent person, issued with the documentation pack (drawings, calculations, manuals, logbook starter, manufacturer literature).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the standards framework that applies to emergency lighting commissioning: BS 5266-1:2025, BS EN 50172:2024, BS EN 50171:2021, BS 7671 Part 6, and RRO 2005',
              'Apply the BS 5266-1:2025 commissioning sequence in order: documentation review, pre-energisation visual / mechanical, BS 7671 verification, charge, photometric, switch-on, duration, recovery, certification',
              'Carry out the pre-energisation visual and mechanical inspection — luminaire positions, cable specification, fixings, mounting, supply, battery state',
              'Apply BS 7671 Part 6 verification to the emergency lighting circuits — continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, RCD operation',
              'Carry out the initial photometric survey: lux meter on the defined escape route, point-by-point against design and BS EN 1838 minima',
              'Carry out the switch-on (mains-fail simulation) test and verify each luminaire achieves the design response class (0.5 s / 5 s / 15 s)',
              'Complete the BS 5266-1:2025 acceptance certificate with the documentation pack, observing the 2025 tightening on departures and competence',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The standards framework</ContentEyebrow>

          <ConceptBlock
            title="Why four standards apply at once"
            plainEnglish="Emergency lighting commissioning is not a single-standard job. The electrical installation underneath obeys BS 7671 (the wiring regs). The emergency-lighting-specific design and verification obeys BS 5266-1:2025 (the UK code of practice). The system-level testing requirements come from BS EN 50172:2024 (the European system standard). Central battery systems where used add BS EN 50171:2021. And the legal duty for the building responsible person sits in the Regulatory Reform (Fire Safety) Order 2005. All five overlap at commissioning. The competent person must understand which standard says what and apply each at the right step."
            onSite="At commissioning, draw a checklist with five columns: BS 7671 Part 6 / BS 5266-1 / BS EN 50172 / BS EN 50171 (if central) / RRO obligation. Tick each column off as the relevant verification is completed. Anything blank at the end is a gap."
          >
            <p>The framework, by purpose:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS 7671:2018+A2:2022 Part 6</strong> — the underlying electrical verification: visual, continuity, IR, polarity, Zs, RCD operation, ADS compliance. Applies to the wiring of the emergency lighting circuits exactly as it does to any other circuit. No exemption.
              </li>
              <li>
                <strong>BS 5266-1:2025</strong> — the UK code of practice. Defines the emergency-lighting-specific design (luminaire positions, escape route definition, lux levels, response classes) and the commissioning verification (visual against design, switch-on test, duration test, photometric survey, acceptance certificate model form). The 2025 update is the current document.
              </li>
              <li>
                <strong>BS EN 50172:2024</strong> — the European system standard for emergency escape lighting. Defines the test cycles (functional monthly, duration annually), the response time classes, the system-level requirements. Underpins BS 5266-1.
              </li>
              <li>
                <strong>BS EN 50171:2021</strong> — central battery systems. Where the installation uses a central battery (rather than self-contained luminaires), this is the standard governing the central battery design, charging, monitoring, and recovery. Applies in addition to BS 5266-1.
              </li>
              <li>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — the LEGAL driver. Article 14 places the duty for emergency escape route lighting on the responsible person; Article 17 places the duty for ongoing maintenance; Article 23 places the duty for record-keeping. Compliance with the technical standards demonstrates discharge of these legal duties.
              </li>
            </ul>
            <p>
              At commissioning, the inspector is verifying compliance with a stack of documents at once. The acceptance certificate is the single piece of paper that records that compliance — but the verification behind it is multi-layered.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 8 (Verification at commissioning)"
            clause={
              <>
                Before a new emergency lighting installation is taken into service, it shall be subjected to inspection and tests sufficient to verify that the installation has been carried out in accordance with the design and that it operates satisfactorily under emergency conditions. The verification shall include visual inspection, electrical testing in accordance with BS 7671, photometric verification on the defined escape route, a switch-on test simulating mains failure, and a full duration test of the rated emergency operating time.
              </>
            }
            meaning="The clause defines the minimum verification at commissioning. Five elements: visual, BS 7671 electrical, photometric, switch-on, duration. None can be omitted. The 2025 update made photometric verification explicit (it was sometimes treated as design-only); the duration test is the full rated duration, not a sample."
          />

          <ConceptBlock
            title="The 2025 update — what changed"
            plainEnglish="BS 5266-1:2025 is not a small revision. It tightens several areas that were sometimes treated loosely under the previous edition: photometric verification is now explicitly a periodic five-yearly duty as well as a commissioning duty; the acceptance certificate model form was reissued; competence is more tightly defined; certain categories of departure that used to be accepted are now declared unacceptable. The competent person must read the 2025 text — relying on memory of the previous edition will produce non-compliance."
          >
            <p>The headline changes the inspector must internalise:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Periodic photometric (five-yearly).</strong> Previously, the commissioning lux survey was sometimes the last lux measurement ever taken, with later periodic testing relying on functional and duration tests only. The 2025 standard makes a five-yearly point-by-point lux survey explicit. This catches gradual luminaire output decay (LED depreciation, optic fogging, lamp ageing).
              </li>
              <li>
                <strong>Acceptance certificate model form.</strong> The model form has been reissued with new fields including the five-year photometric reference, a competence declaration, and an explicit departures section. Use the 2025 model form, not a legacy template.
              </li>
              <li>
                <strong>Competence.</strong> The 2025 standard is firm on competence — documented training, current qualification, procedural framework. Third-party schemes (BAFE SP203-4) are explicitly recognised as the route to demonstrate competence.
              </li>
              <li>
                <strong>Departures.</strong> Some past-practice departures are now non-compliance — most notably missing periodic photometric, missing logbook, missing competence record. The competent person must read the 2025 text on what is and is not acceptable as a departure.
              </li>
              <li>
                <strong>Documentation pack.</strong> The 2025 standard tightens the handover documentation pack — design data, as-built drawings, manuals, logbook, training. Missing items are now non-compliance.
              </li>
            </ul>
            <p>
              The thread running through the 2025 updates: assumptions are no longer enough. Lux output is verified, not assumed. Competence is documented, not implied. Departures are written and agreed, not waved through.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The commissioning sequence</ContentEyebrow>

          <ConceptBlock
            title="Order of operations"
            plainEnglish="The commissioning sequence is not a free-form set of checks. Each step depends on the previous step being clean. Documentation review must come first — without the design reference, nothing else can be verified against anything. Pre-energisation visual / mechanical comes next — catching defects before any live work. Then the BS 7671 electrical verification (which itself has a sequence — continuity before IR, IR before polarity, polarity before Zs). Then a charge period (without which the duration test is invalid). Then the photometric survey, switch-on, and full duration. Then recovery confirmation. Then certification."
            onSite="If a step is skipped or done out of order, the verification is invalid even if every individual reading is good. The defence in court for a missed step is non-existent. Run the sequence in order."
          >
            <p>The full sequence, BS 5266-1:2025 model:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Documentation review.</strong> Design lux calculation, as-built drawings, manufacturer technical / installation manuals, photometric data sheets, cause-and-effect description (where staged or zoned operation is provided). Verify all are on file before site work begins.
              </li>
              <li>
                <strong>Pre-energisation visual and mechanical inspection.</strong> Luminaire positions match the as-built drawing; cable type meets fire-resistance specification; fixings are mechanical (e.g. metal P-clips, not plastic ties — fire-resistant cable on plastic ties fails first); mounting heights, orientations, and obstructions per design; supply arrangements; battery state (self-contained luminaires) or central battery state.
              </li>
              <li>
                <strong>BS 7671 Part 6 electrical verification.</strong> Continuity of protective conductors; insulation resistance; polarity; earth fault loop impedance (Zs) at most distant point of each emergency circuit; RCD operating time where RCD protection provided; ADS compliance. Same Part 6 tests as any circuit.
              </li>
              <li>
                <strong>Energise and initial charge.</strong> Apply mains and allow the manufacturer-specified charge period (typically 24 h for self-contained internal batteries; per manufacturer for central battery systems). Without full charge, the duration test is invalid.
              </li>
              <li>
                <strong>Initial photometric survey.</strong> Point-by-point lux meter readings on the defined escape route, in emergency mode (mains off, system on battery), at the height specified by the design (typically 0.2 m above floor for spatial illumination), recorded against design calculation and BS EN 1838 minima (1 lx escape route, 0.5 lx anti-panic, 15 lx high-risk).
              </li>
              <li>
                <strong>Switch-on test (mains-fail simulation).</strong> Interrupt the local supply to each emergency-lit area in turn, observe and time the changeover at each luminaire, verify response class (0.5 s / 5 s / 15 s) per design.
              </li>
              <li>
                <strong>Full 3-hour duration test.</strong> Run the system on emergency power for the rated duration (3 h is standard; some applications specify 1 h — design dependent). At the end, every luminaire must still be illuminated and achieving the minimum design lux.
              </li>
              <li>
                <strong>Recovery confirmation.</strong> After restoration of mains, the batteries (self-contained or central) must recharge to ≥ 80% of rated capacity within 24 h per BS EN 50171/50172.
              </li>
              <li>
                <strong>BS 5266-1:2025 acceptance certificate.</strong> Issue the model-form certificate signed by the competent person. Include any departures with technical justification and risk assessment.
              </li>
              <li>
                <strong>Documentation pack handover.</strong> Drawings, calculations, manuals, certificates, logbook starter, manufacturer literature, spares list, responsible-person briefing summary.
              </li>
            </ol>
            <p>
              The sequence is the sequence. Skipping or reordering invalidates the verification. The 2025 standard expects this discipline; the acceptance certificate signed against an out-of-order verification is not defendable.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Commissioning checklist flow diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              BS 5266-1:2025 commissioning sequence — checklist flow
            </h4>
            <svg
              viewBox="0 0 820 660"
              className="w-full h-auto"
              role="img"
              aria-label="Vertical flow diagram of the BS 5266-1:2025 commissioning sequence: documentation review, pre-energisation visual/mechanical, BS 7671 Part 6 electrical verification, energise and charge, photometric survey, switch-on test, duration test, recovery, certification, handover."
            >
              <defs>
                <marker id="arrow1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <polygon points="0,0 10,5 0,10" fill="#FBBF24" />
                </marker>
              </defs>

              {/* Step 1 */}
              <rect x="100" y="20" width="620" height="44" rx="8" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="120" y="40" fill="#FBBF24" fontSize="11" fontWeight="bold">1 · Documentation review</text>
              <text x="120" y="55" fill="rgba(255,255,255,0.7)" fontSize="10">Design lux calc · as-built drawings · manuals · cause-and-effect</text>
              <line x1="410" y1="64" x2="410" y2="76" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrow1)" />

              {/* Step 2 */}
              <rect x="100" y="82" width="620" height="44" rx="8" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="120" y="102" fill="#FBBF24" fontSize="11" fontWeight="bold">2 · Pre-energisation visual + mechanical</text>
              <text x="120" y="117" fill="rgba(255,255,255,0.7)" fontSize="10">Luminaire positions · cable type/fire-resistance · fixings · mounting · supply</text>
              <line x1="410" y1="126" x2="410" y2="138" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrow1)" />

              {/* Step 3 */}
              <rect x="100" y="144" width="620" height="44" rx="8" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.6" />
              <text x="120" y="164" fill="#22D3EE" fontSize="11" fontWeight="bold">3 · BS 7671 Part 6 electrical verification</text>
              <text x="120" y="179" fill="rgba(255,255,255,0.7)" fontSize="10">Continuity · IR · polarity · Zs · RCD · ADS</text>
              <line x1="410" y1="188" x2="410" y2="200" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrow1)" />

              {/* Step 4 */}
              <rect x="100" y="206" width="620" height="44" rx="8" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.6" />
              <text x="120" y="226" fill="#A855F7" fontSize="11" fontWeight="bold">4 · Energise and charge</text>
              <text x="120" y="241" fill="rgba(255,255,255,0.7)" fontSize="10">Manufacturer-specified period (typically 24 h)</text>
              <line x1="410" y1="250" x2="410" y2="262" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrow1)" />

              {/* Step 5 */}
              <rect x="100" y="268" width="620" height="44" rx="8" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="120" y="288" fill="#FBBF24" fontSize="11" fontWeight="bold">5 · Initial photometric survey (NEW emphasis 2025)</text>
              <text x="120" y="303" fill="rgba(255,255,255,0.7)" fontSize="10">Point-by-point lux on escape route · BS EN 1838 minima · 1 lx / 0.5 lx / 15 lx</text>
              <line x1="410" y1="312" x2="410" y2="324" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrow1)" />

              {/* Step 6 */}
              <rect x="100" y="330" width="620" height="44" rx="8" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.6" />
              <text x="120" y="350" fill="#22D3EE" fontSize="11" fontWeight="bold">6 · Switch-on test (mains-fail simulation)</text>
              <text x="120" y="365" fill="rgba(255,255,255,0.7)" fontSize="10">Every luminaire transitions within design class · 0.5 s / 5 s / 15 s</text>
              <line x1="410" y1="374" x2="410" y2="386" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrow1)" />

              {/* Step 7 */}
              <rect x="100" y="392" width="620" height="44" rx="8" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.6" />
              <text x="120" y="412" fill="#22D3EE" fontSize="11" fontWeight="bold">7 · Full 3-hour duration test</text>
              <text x="120" y="427" fill="rgba(255,255,255,0.7)" fontSize="10">Sustain rated duration on battery · all luminaires illuminated at end</text>
              <line x1="410" y1="436" x2="410" y2="448" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrow1)" />

              {/* Step 8 */}
              <rect x="100" y="454" width="620" height="44" rx="8" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.6" />
              <text x="120" y="474" fill="#A855F7" fontSize="11" fontWeight="bold">8 · Recovery confirmation</text>
              <text x="120" y="489" fill="rgba(255,255,255,0.7)" fontSize="10">Recharge to ≥ 80% within 24 h · BS EN 50171/50172</text>
              <line x1="410" y1="498" x2="410" y2="510" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrow1)" />

              {/* Step 9 */}
              <rect x="100" y="516" width="620" height="44" rx="8" fill="rgba(34,197,94,0.08)" stroke="#22C55E" strokeWidth="1.6" />
              <text x="120" y="536" fill="#22C55E" fontSize="11" fontWeight="bold">9 · BS 5266-1:2025 acceptance certificate</text>
              <text x="120" y="551" fill="rgba(255,255,255,0.7)" fontSize="10">Model form · competent person signature · departures recorded</text>
              <line x1="410" y1="560" x2="410" y2="572" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrow1)" />

              {/* Step 10 */}
              <rect x="100" y="578" width="620" height="44" rx="8" fill="rgba(34,197,94,0.08)" stroke="#22C55E" strokeWidth="1.6" />
              <text x="120" y="598" fill="#22C55E" fontSize="11" fontWeight="bold">10 · Documentation pack handover</text>
              <text x="120" y="613" fill="rgba(255,255,255,0.7)" fontSize="10">Drawings · calcs · manuals · logbook starter · responsible-person brief</text>

              {/* Footer */}
              <text x="410" y="650" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Each step gates the next — out-of-order verification is invalid even if individual readings are good
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Pre-energisation visual and mechanical</ContentEyebrow>

          <ConceptBlock
            title="What you are looking for, and what you are looking against"
            plainEnglish="The pre-energisation visual is not a quick walk-around. It is a structured comparison of the actual installation against the design. The reference document is the as-built drawing (the design drawing updated with any installation deviations); the comparison points are luminaire positions and references, cable type, fixings, mounting, supply arrangements. Anything that does not match the as-built must be either (a) corrected, (b) the as-built updated with a documented deviation, or (c) recorded as a departure on the acceptance certificate."
            onSite="The visual cannot be done without the as-built drawing in hand. Walking the site with no design reference is not a verification — it is sightseeing. If the as-built is missing, demand it before continuing; if you cannot get it, the installation is not commissionable."
          >
            <p>The headline checks at pre-energisation visual:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Luminaire positions and references.</strong> Every luminaire shown on the as-built present at the indicated position; every luminaire on site referenced on the as-built. Mismatches are common in first-fix; resolve them before commissioning.
              </li>
              <li>
                <strong>Cable type and fire-resistance.</strong> The cable specified in the design is the cable installed (e.g. enhanced fire-resistance per BS EN 50200 PH 30/60/120 class — design-dependent). Cable markings visible at junctions, panel terminations, and accessible drop-points.
              </li>
              <li>
                <strong>Fixings.</strong> Fire-resistant cable on plastic cable ties is a system failure waiting to happen — the ties fail at low temperatures and the cable falls. Metal P-clips, metal cable cleats, or fire-resistant cable trunking are the correct fixings. ICEL guidance and BS 5266-1 are explicit on this.
              </li>
              <li>
                <strong>Mounting heights, orientations, obstructions.</strong> Luminaires mounted at the height the design assumed (changes affect lux delivery); orientation correct (escape-route exit signs visible from the direction of escape); no obstructions blocking light or sightlines.
              </li>
              <li>
                <strong>Supply arrangements.</strong> Maintained luminaires fed from a non-switched (always-on) supply; non-maintained luminaires fed via the local supply (so they detect local mains failure). Final-circuit isolators present and labelled. Central battery slaves fed from the central battery sub-circuits.
              </li>
              <li>
                <strong>Battery state (self-contained).</strong> Battery installed, connected, dated; no obvious physical damage; manufacturer date code legible (recorded for the logbook).
              </li>
              <li>
                <strong>Central battery state (where applicable).</strong> Central battery enclosure correctly located (own fire-resistant compartment per BS EN 50171), correctly ventilated, correctly accessed, warning notices in place (locked-off disconnect, do-not-switch-off labels).
              </li>
              <li>
                <strong>Exit and directional signage.</strong> Position, orientation, viewing distance match design; sign type matches BS ISO 7010 / BS 5499 specification (running-figure / arrow); no obstructions; mounting height per code.
              </li>
            </ul>
            <p>
              The pre-energisation visual takes time. A 200-luminaire installation is a half-day of careful work, not a 30-minute walk. Compress it and defects propagate into the live testing where they are harder and more expensive to find.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 8.2 (Visual inspection)"
            clause={
              <>
                The visual inspection at commissioning shall verify that the installation matches the design as recorded on the as-built drawings, that the luminaires are of the type and rating specified, that cabling is of the type and routing specified including any fire-resistance requirements, that fixings are mechanical and appropriate to the cable type, and that the mounting and orientation of luminaires and signs is consistent with the photometric design.
              </>
            }
            meaning="Five sub-checks named in the clause: design match, luminaire type/rating, cabling, fixings, mounting/orientation. The clause is explicit about mechanical fixings — plastic ties on fire-resistant cable is a clause failure, not a preference."
          />

          <CommonMistake
            title="Plastic cable ties on fire-resistant emergency lighting cable"
            whatHappens="The installer has used plastic cable ties to fix fire-resistant cable to a tray. Looks neat, looks installed. In a fire, the plastic ties fail at around 80-100°C — minutes into a fire. The fire-resistant cable falls onto whatever is below, the emergency lighting circuit is broken, and the system fails at exactly the moment it is needed. The whole point of fire-resistant cable is that it survives the fire; the fixings must survive too. This defect is invisible after first-fix but is a system failure."
            doInstead="At pre-energisation visual, walk the cable routes and verify metal fixings throughout — metal P-clips, metal cleats, or fire-resistant trunking. Plastic ties on fire-resistant cable is a defect. Issue a non-conformance against the installer; do not commission the system until the fixings are replaced. The acceptance certificate cannot honestly be signed if the fixings are wrong."
          />

          <SectionRule />

          <ContentEyebrow>BS 7671 Part 6 verification</ContentEyebrow>

          <ConceptBlock
            title="The same Part 6 tests as any circuit"
            plainEnglish="Emergency lighting circuits are not exempt from BS 7671. They carry mains voltage for charging (always) and for sustained operation in the case of central battery systems and maintained luminaires. The same Part 6 verification applies: continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, RCD operation, ADS compliance. Skipping these because the circuit is 'an emergency circuit' is a regulatory failure — the circuit is a final circuit and the regs apply."
          >
            <p>The Part 6 sequence applied to emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Continuity of protective conductors.</strong> Test from the MET to every accessible CPC at each luminaire position and accessory. R₁ + R₂ recorded for each circuit. Discontinuity is rejection.
              </li>
              <li>
                <strong>Insulation resistance.</strong> 500 V dc between live conductors and earth, between line and neutral. Acceptance ≥ 1 MΩ per BS 7671; many specifications expect ≥ 100 MΩ as a quality threshold for a new installation. Low IR readings indicate cable damage, moisture, or wiring errors.
              </li>
              <li>
                <strong>Polarity.</strong> At every accessory and luminaire — line is on the line terminal. Reverse polarity in an emergency lighting circuit is dangerous because some electronics depend on it.
              </li>
              <li>
                <strong>Earth fault loop impedance (Zs).</strong> Measured at the most distant point of each emergency lighting circuit. Must satisfy the disconnection-time requirement in BS 7671 Table 41 for the protective device.
              </li>
              <li>
                <strong>RCD operating time.</strong> Where RCD protection is provided (commonly 30 mA RCD for socket circuits supplying maintenance, sometimes 30 mA RCD on the emergency lighting circuit itself), verify trip time per BS 7671. Note: RCDs are NOT generally provided on the emergency lighting final circuit because tripping them defeats the safety function — refer to the design.
              </li>
              <li>
                <strong>ADS compliance.</strong> Confirm automatic disconnection of supply meets the BS 7671 Chapter 41 requirements for the system earthing arrangement (TN-S, TN-C-S/PNB, or TT). On a TT system, RCD protection is mandatory for ADS; on TN, the protective device disconnection time + Zs verification is the route.
              </li>
            </ul>
            <p>
              The BS 7671 verification is the foundation. The emergency-lighting-specific verification (photometric, switch-on, duration) is the upper layer. Both must be complete; missing either is a gap.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Photometric survey — the 2025 emphasis</ContentEyebrow>

          <ConceptBlock
            title="From design assumption to measured fact"
            plainEnglish="The design lux calculation predicts the illuminance every luminaire will deliver. The photometric survey verifies the prediction. With a calibrated lux meter, the inspector walks the defined escape route in emergency mode (mains off, system on battery), reads the lux at the design measurement points, and compares each reading to the design value and to the BS EN 1838 minimum. The 2025 standard made this commissioning duty explicit AND introduced a five-yearly recurring duty — recognising that lux output decays over time and the design calculation alone is not enough after years of service."
            onSite="A calibrated lux meter is essential — the calibration certificate is recorded with the survey results. The survey takes time: a 200 m escape route at 1 m intervals is 200 readings. Plan for the time; do not rush; record every reading."
          >
            <p>The photometric survey method:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>System in emergency mode.</strong> Mains off (isolated at the relevant supply); the system on battery; allow 10-15 minutes for stable output (most batteries deliver design lux from the start, but stabilisation removes any inrush effects).
              </li>
              <li>
                <strong>Lux meter.</strong> Calibrated within the past 12 months (calibration certificate recorded). Photopic correction; cosine-corrected sensor head.
              </li>
              <li>
                <strong>Measurement height.</strong> Per design — typically 0.2 m above floor for spatial illumination on escape routes (the BS EN 1838 reference). Higher-level surveys for task lighting (15 lx) are at the relevant working plane.
              </li>
              <li>
                <strong>Measurement points.</strong> At the design measurement grid — typically across the route width at 1-2 m intervals along its length (within the BS EN 1838:2024 non-excluded width); at every change of direction; at every escape-route door; at the foot and head of every staircase; at every junction.
              </li>
              <li>
                <strong>Acceptance.</strong> Each reading must equal or exceed the design value AND the BS EN 1838 minimum. The minima: 1 lx across the escape route full width within the non-excluded boundary; 0.5 lx on anti-panic open area (excluding 0.5 m perimeter strip); 15 lx on high-risk task areas.
              </li>
              <li>
                <strong>Uniformity.</strong> Along the route within the non-excluded width, the maximum:minimum ratio must not exceed 40:1. A single high reading near a luminaire next to a low reading mid-span fails uniformity even if the absolute minimum is met.
              </li>
              <li>
                <strong>Record.</strong> Plot or tabulate every reading against the design grid. Photograph the lux meter in position with the reading visible — provides evidence and audit trail.
              </li>
            </ol>
            <p>
              The five-yearly survey uses the same method as the commissioning survey. The comparison is to (a) the original commissioning readings (drift over time), (b) the design values (compliance), and (c) the BS EN 1838 minima (legal floor). All three are reported.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 8.4 (Photometric verification)"
            clause={
              <>
                The illuminance produced by the emergency lighting installation shall be verified by measurement at commissioning and at intervals not exceeding five years thereafter. The measurement shall be carried out with a calibrated photometer at the design measurement plane on the defined escape route and in any anti-panic and high-risk task areas. The measured values shall be compared with the design values and with the minimum values specified in BS EN 1838.
              </>
            }
            meaning="Two duties in one clause: at commissioning AND at five-yearly intervals. The five-yearly is the 2025 emphasis. Calibrated photometer, design measurement plane, compare to design AND to BS EN 1838 minima. The minima are the legal floor; the design values may be higher than the minima for the application."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Switch-on test and duration test</ContentEyebrow>

          <ConceptBlock
            title="Mains-fail simulation"
            plainEnglish="The switch-on test is the system-level functional verification. By interrupting the local supply to each emergency-lit area, the inspector creates the exact failure condition the system is designed to respond to — and observes whether each luminaire actually responds within the design response class. It catches: failed batteries, miswired luminaires (responding to wrong supply or not responding at all), wrong-class luminaires (response too slow), connectivity errors in central battery slaves. It is the single most diagnostic commissioning test."
          >
            <p>The switch-on test method:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Identify the area.</strong> Each emergency-lit area on the design has its own supply. Identify the local final circuit feeding the maintained / non-maintained luminaire (or the slave luminaire on a central battery system).
              </li>
                <li>
                <strong>Interrupt the supply.</strong> Open the local final-circuit breaker, or operate the test facility provided. The luminaires on that circuit lose mains.
              </li>
              <li>
                <strong>Observe and time.</strong> Each luminaire must transition to emergency operation within the design response class — 0.5 s for high-risk areas with stairs or hazardous processes, 5 s for general escape routes, 15 s for low-risk back-of-house.
              </li>
              <li>
                <strong>Verify illumination.</strong> Each luminaire must produce light at the design level. A luminaire that switches but produces dim light has a battery problem.
              </li>
              <li>
                <strong>Restore mains.</strong> After the test, restore the local supply. Verify the luminaire returns to charging mode (or maintained mains-on mode for maintained luminaires).
              </li>
              <li>
                <strong>Repeat for every area.</strong> Every emergency-lit area must be tested. A central battery system simplifies this somewhat (the central battery transfer is a single test, then each slave luminaire is verified by interrupting its local maintained-supply detection).
              </li>
              <li>
                <strong>Record.</strong> Per area: time of test, luminaires tested, response time observed, pass/fail per luminaire. Any failure is a defect; commissioning cannot proceed until resolved.
              </li>
            </ol>
            <p>
              The 3-hour duration test is run after a clean switch-on test. Disconnect the mains feed to the entire emergency lighting installation (or the central battery, where used) and run the system for the rated duration on battery alone. At the end of the rated time, every luminaire must still be illuminated and (per BS 5266-1:2025) still delivering the minimum design lux on the escape route. The duration test is destructive of battery life if done frequently — once at commissioning and once per year thereafter is the design assumption.
            </p>
          </ConceptBlock>

          <Scenario
            title="Switch-on test reveals a swap"
            situation="Commissioning a new office. The central plant room has two final circuits — one for general lighting, one for the emergency lighting maintained supply. The inspector interrupts what is labelled as the general lighting circuit. The maintained emergency luminaires lose power and switch to battery — they should not have done. The interrupt should have left them on. They responded as if the wrong circuit was being interrupted."
            whatToDo="Investigate immediately. The likely cause is a circuit-labelling swap — the labels are on the wrong breakers, or the wiring connections at the consumer unit are swapped. The maintained luminaires are seeing 'their' supply on the wrong circuit. Confirm with a polarity-and-continuity trace, identify the swap, correct the labelling and/or the wiring, re-test. Do not sign the acceptance certificate until the supply arrangements match the design and the test produces the expected behaviour. The labelling swap would have caused the system to fail to operate when it was actually needed."
            whyItMatters="The switch-on test catches things that no other test can catch. Polarity verification confirms terminals; continuity confirms wires. Neither catches a wires-on-wrong-circuit error if both circuits look electrically similar. The switch-on test imposes the failure condition the system is designed for and observes what the system actually does. It is the only test that catches this category of error."
          />

          <SectionRule />

          <ContentEyebrow>Acceptance certificate and competence</ContentEyebrow>

          <ConceptBlock
            title="The 2025 model form"
            plainEnglish="The BS 5266-1:2025 acceptance certificate is the formal output of commissioning. It records the installation address, the design reference, the standards complied with, the inspection results across each verification stage, the duration test result, and any departures with their justification. The 2025 model form added explicit fields for the photometric survey reference, a competence declaration, and a structured departures section. Use the 2025 model — older templates are missing fields that the 2025 standard requires."
          >
            <p>The model form sections:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Installation details.</strong> Address, occupancy class, design reference number, date of commissioning, identification of commissioning organisation.
              </li>
              <li>
                <strong>Standards complied with.</strong> BS 5266-1:2025, BS EN 50172:2024, BS EN 50171:2021 (where applicable), BS 7671:2018+A2:2022, BS EN 1838 (lux references). List explicitly.
              </li>
              <li>
                <strong>Visual and mechanical.</strong> Tick-list confirmation of the pre-energisation checks complete, with any defects logged and resolved.
              </li>
              <li>
                <strong>Electrical verification.</strong> BS 7671 Part 6 results — by circuit: continuity, IR, polarity, Zs, RCD operation. Cross-reference to the BS 7671 EIC if separate.
              </li>
              <li>
                <strong>Photometric.</strong> Survey results summary — readings against design, against BS EN 1838 minima, uniformity ratio, calibration reference of the lux meter. Detail the survey grid and full readings as a separate appendix.
              </li>
              <li>
                <strong>Switch-on.</strong> Per area: response class achieved, any failures, resolution.
              </li>
              <li>
                <strong>Duration.</strong> Date of duration test, rated duration, result (all luminaires illuminated at end), recovery confirmation (charge restored within 24 h).
              </li>
              <li>
                <strong>Departures.</strong> Any departure from full BS 5266-1:2025 compliance, with technical justification, residual risk assessment, and agreement of the responsible person. The 2025 standard is firm on what may and may not be a departure.
              </li>
              <li>
                <strong>Competence declaration.</strong> The competent person's qualifications, training, and procedural framework (e.g. BAFE SP203-4 registration). Signed.
              </li>
              <li>
                <strong>Documentation pack.</strong> Listed appendices — drawings, calculations, manuals, logbook starter, etc.
              </li>
            </ul>
            <p>
              The certificate is the document insurers and fire authorities will look at. Make it complete. A certificate with empty fields, missing appendices, or missing competence declaration is a regulatory exposure for the signing person and the contracting organisation.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Signing the certificate before the duration test"
            whatHappens="Pressure to hand over the building before the official opening date. The contractor completes the visual, the BS 7671 verification, the switch-on. The duration test would take three hours and the building is opening tomorrow. The contractor signs the acceptance certificate marked 'duration test pending' and hands over. The duration test is never done. Six months later, an actual evacuation finds the batteries fail at 90 minutes. People are caught in unlit corridors. The certificate is reviewed and the omitted duration test is identified. The signing person faces personal liability."
            doInstead="The duration test is part of commissioning. The certificate cannot honestly be signed without it. Plan the duration test into the programme — typically the night before handover, running through the small hours when the building is empty. If the programme does not allow the test, the programme is wrong. The signing person carries personal liability for the certificate; do not sign anything that contains a known untruth."
          />

          <CommonMistake
            title="Treating the photometric as 'done at design'"
            whatHappens="The design includes a DIALux lux calculation that predicts compliance. The contractor reads this and concludes the photometric verification is satisfied by the calculation. No on-site lux meter survey is carried out. The certificate is signed citing the design calculation as the photometric reference. Two years later, a five-yearly photometric is due (per BS 5266-1:2025). There is no commissioning baseline to compare against; nobody knows what the system actually delivered when new; degradation cannot be assessed."
            doInstead="The design calculation is the prediction. The on-site survey is the verification. Both are required at commissioning. The 2025 standard is explicit about this — clause 8.4 calls for measurement at commissioning AND at five-yearly intervals. Carry out the on-site survey, record every reading, file the survey as the commissioning baseline. The five-year survey will have something to compare against."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Edge cases and resolution</ContentEyebrow>

          <ConceptBlock
            title="The hard cases at commissioning"
            plainEnglish="Most commissionings are routine. A small number of cases routinely produce the same difficulty — and the same wrong answer if the verifier is not prepared. Knowing them in advance prevents the wrong answer being recorded on the certificate."
          >
            <p>The recurring difficult cases:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>As-built drawing not available.</strong> The verifier walks the site without the design reference. The visual cannot be a comparison. The correct response: stop. Demand the as-built. If it is unobtainable, the installation is not commissionable; record the position and refer back to the contracting chain. Do not commission against an absent reference.
              </li>
              <li>
                <strong>Photometric survey reading below design but above BS EN 1838.</strong> Design said 5 lx; survey reads 2.5 lx; BS EN 1838 minimum is 1 lx. Pass or fail? Strictly: pass against the legal floor, fail against the design. Record both. The pragmatic position is pass — the legal duty is met. The professional position is to investigate why design and reality differ; usually a luminaire substitution or reflectance assumption that did not hold. Document on the certificate.
              </li>
              <li>
                <strong>Photometric survey reading below BS EN 1838.</strong> Fail. Cannot be commissioned without remediation. Report to the responsible person; identify the remediation (additional luminaire, lamp upgrade, optic clean, design revision); re-survey after remediation.
              </li>
              <li>
                <strong>One luminaire fails switch-on test.</strong> A single luminaire does not respond. The defect could be: failed battery, failed inverter, miswiring, failed lamp. Diagnose, correct, re-test that luminaire. The system is not commissioned with a known failure; record the fault, the corrective action, and the re-test result.
              </li>
              <li>
                <strong>Duration test interrupted.</strong> Two hours into a 3-hour test, the test is interrupted (mains restored unintentionally, fire alarm triggers manual intervention). The test is invalid; restart from full charge. Do not extrapolate to claim a pass.
              </li>
              <li>
                <strong>Recovery to less than 80% in 24 h.</strong> The batteries do not recover within the BS EN 50171/50172 window. Could indicate: battery problem (replace), charger problem (rectify), undersized charger (design issue). Investigate and remediate; the system cannot be commissioned with a known recovery deficit.
              </li>
              <li>
                <strong>Departure proposed by the responsible person.</strong> The client wants to omit a category — e.g. "we don't need photometric, just functional". The departure must be technically justified, residual-risk-assessed, and agreed in writing. If the proposed departure is not justifiable under the 2025 standard, refuse to sign on those terms. The responsible person can choose not to commission; you cannot misrepresent compliance.
              </li>
            </ul>
            <p>
              The common thread: when a verification step is unsatisfactory, the resolution is to stop, investigate, remediate, re-test. Not to soften the certificate to make it pass. The certificate is a representation of fact; if it does not reflect fact, the signing person is exposed.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Five standards apply at once: BS 7671 Part 6 (electrical), BS 5266-1:2025 (UK CoP), BS EN 50172:2024 (system), BS EN 50171:2021 (central battery), RRO 2005 (legal duty). All five must be addressed at commissioning.',
              'Run the sequence in order: documentation → pre-energisation visual → BS 7671 verification → charge → photometric → switch-on → 3-hour duration → recovery → certification → handover. Out-of-order = invalid.',
              'BS 5266-1:2025 made photometric verification an explicit five-yearly recurring duty in addition to commissioning. The on-site survey is a required step, not a design assumption.',
              'BS EN 1838:2024 minima: 1 lx escape route full width at floor level (with edge exclusions: 0.5 m on routes > 2 m, ¼ width on routes ≤ 2 m); 0.5 lx anti-panic; 15 lx high-risk. 40:1 max:min uniformity along the route within the non-excluded width.',
              'BS 7671 Part 6 verification applies in full — continuity, IR, polarity, Zs, RCD where used, ADS compliance. No exemption for emergency circuits.',
              'Switch-on test is the single most diagnostic commissioning step. It catches miswiring, wrong-class luminaires, failed batteries — things no other test catches.',
              '3-hour duration test is full duration, not a sample. Recovery within 24 h to ≥ 80% per BS EN 50171/50172.',
              'Output: BS 5266-1:2025 acceptance certificate signed by competent person, with full documentation pack. The 2025 model form has new fields — use the current version.',
              'Competence is documented (training + qualification + framework). BAFE SP203-4 is the recognised third-party scheme. Signing without competence is a regulatory exposure.',
              'Departures from compliance must be technically justified, residual-risk-assessed, and agreed in writing. The 2025 standard tightens what can and cannot be a departure.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is the BS 5266-1:2025 acceptance certificate the same as the BS 7671 EIC?',
                answer:
                  'No — they are two separate certificates covering two different scopes. The BS 7671 Electrical Installation Certificate (EIC) covers the electrical installation work — the wiring, distribution, protective devices, earthing, and bonding — verified against BS 7671 Part 6. The BS 5266-1:2025 acceptance certificate covers the emergency lighting verification — design match, photometric, switch-on, duration, system performance — verified against BS 5266-1, BS EN 50172, BS EN 50171, and BS EN 1838. Both are issued at commissioning. They cross-reference each other. Both are required.',
              },
              {
                question: 'Why is photometric verification now five-yearly?',
                answer:
                  'Because lux output decays. LED luminaires lose output over time (manufacturer ratings typically L70 at 50,000 hours — 70% of original output at 50,000 h). Optics fog with dust and grease. Lamps age. Batteries lose capacity, reducing the energy delivered during emergency operation. The design calculation is a snapshot at year zero; it does not capture the trajectory. The five-yearly survey is the verification that the installation is still delivering the lux it was designed to deliver. The 2025 update made this explicit because the previous practice often skipped it.',
              },
              {
                question: 'Can the duration test be a sample (e.g. 1 in 10 luminaires) instead of the full installation?',
                answer:
                  'No. BS 5266-1:2025 calls for the full rated duration on the full installation. A sample test would reduce confidence in the result and would miss localised battery defects (e.g. one circuit\'s worth of luminaires having older batteries). The full test is once at commissioning and once per year thereafter — the operational impact is acceptable for that frequency.',
              },
              {
                question: 'What if the building owner refuses to allow a 3-hour duration test on commissioning?',
                answer:
                  'The 3-hour test is BS 5266-1:2025 verification and is required for the acceptance certificate to be valid. If the responsible person refuses, the certificate cannot be issued — or it can be issued only with a recorded departure and the responsible person\'s written acknowledgement of the residual risk. A practical solution is to schedule the test out-of-hours (overnight, weekend) when the building is unoccupied. Refusal to allow the test is unusual and points to an underlying issue (e.g. concern that the system will not pass) which is itself a flag.',
              },
              {
                question: 'How does central battery commissioning differ from self-contained?',
                answer:
                  'The methodology is the same but with additional steps. The central battery itself is verified per BS EN 50171:2021 — capacity, charging system, monitoring, fire-rated enclosure, ventilation, warning notices. Each slave luminaire is verified individually for response — the central battery transfers, but each slave must also be confirmed to receive the emergency feed. Recovery is at the central battery, not per luminaire. Cause-and-effect (which slave responds to which input) is documented and verified. Central battery systems are larger commissioning jobs because there is more to verify.',
              },
              {
                question: 'What is BAFE SP203-4 and is it required?',
                answer:
                  'BAFE SP203-4 is the third-party certification scheme specifically for emergency lighting design, installation, commissioning, and maintenance. It is not legally required, but it is the most widely recognised demonstration of competence in the trade. Insurers, fire authorities, and informed clients increasingly expect to see BAFE SP203-4 (or equivalent — NICEIC, ECA schemes also relevant). The 2025 standard is explicit about competence; SP203-4 is the recognised route to demonstrate it.',
              },
              {
                question: 'How long does commissioning typically take?',
                answer:
                  'For a 100-luminaire installation: documentation review (1-2 h), pre-energisation visual (3-4 h), BS 7671 verification (4-6 h), charge period (24 h, mostly elapsed time not work time), photometric survey (4-8 h depending on complexity), switch-on (2-4 h), duration (3 h plus observation), recovery (24 h elapsed), certification and documentation (4-8 h). Total work time ~25-40 h spread across ~3 days minimum (because of the elapsed times for charge and recovery). Larger installations scale up; central battery systems add 8-16 h.',
              },
              {
                question: 'What if I find a defect during commissioning that the installer cannot fix?',
                answer:
                  'Stop the commissioning. Issue a non-conformance to the installer with the specific defect, the standard breached, and the required remediation. Do not commission an installation with a known unresolved defect — the certificate would be a misrepresentation. The contracting chain handles the remediation; the verifier returns to re-test the affected element after the fix. The principle is non-negotiable: the certificate represents fact at the time of signing, and a known defect means the installation is not yet commissionable.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Initial inspection and verification — Module 5.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Functional and 3-hour duration tests
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule5Section1;
