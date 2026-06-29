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
    id: 'elm5-s6-pack',
    question: 'What documents make up the BS 5266-1:2025 handover documentation pack?',
    options: [
      'Just the BS 5266-1:2025 acceptance certificate, with no supporting documents.',
      'A comprehensive pack: design and as-built drawings, lux calculation, certificates, manuals, cause-and-effect, logbook starter, warranty, spares list, photographs and briefing record.',
      'Just the final invoice listing the luminaires and labour supplied on the job.',
      'Just the photographic record of the completed luminaire positions.',
    ],
    correctIndex: 1,
    explanation:
      'The pack is comprehensive — design drawings (escape routes, luminaire positions, lux design), as-built drawings (installed reality and deviations), photometric calculation, BS 5266-1:2025 acceptance certificate, BS 7671 EIC, central battery certificate (where applicable), manufacturer manuals, photometric data sheets, cause-and-effect description, logbook starter, warranty, spares list, photographic record and briefing summary. It is the operational memory of the installation, supporting operation, future maintenance, periodic verification, and any future investigation.',
  },
  {
    id: 'elm5-s6-training',
    question: 'What does responsible person training at handover cover?',
    options: [
      'Nothing formal — the contractor simply leaves the keys and the documentation on site.',
      'A structured briefing covering RRO 2005 duties, the daily indicator check, fault response, the periodic regime, documentation use and contractor contacts.',
      'Only the preferred lamp colour temperature of the installed emergency luminaires.',
      'Only the weight and lifting requirements of the central battery for moving it.',
    ],
    correctIndex: 1,
    explanation:
      'Responsible person training is the bridge between the technical handover and the operational regime. It covers their RRO 2005 duties (Articles 14, 17, 23), the daily indicator check on central battery panels (where applicable), the user duty to report flagged luminaires, the fault-response procedure (call the contractor, do not silence alarms or reset faults), the planned periodic regime, the documentation pack location and use, and contractor contacts. It is recorded and signed; without it, the responsible person cannot discharge their duty.',
  },
  {
    id: 'elm5-s6-causeeffect',
    question: 'When is a cause-and-effect description required?',
    options: [
      'Never — it is not part of the BS 5266-1:2025 documentation pack at all.',
      'Where the installation operates in stages or zones — different response times, signal-triggered luminaires, zoned sub-circuits or addressable sequences.',
      'Always optional, at the discretion of the maintenance contractor on the day.',
      'Only where the emergency lighting is interfaced with the building fire alarm panel.',
    ],
    correctIndex: 1,
    explanation:
      'Cause-and-effect is required where the system has staged or zoned behaviour — anything beyond simple "all lights on when mains off". Examples: different escape routes with different response times, luminaires that illuminate only on a fire-alarm signal, central battery sub-circuits feeding different areas, or addressable programmed sequences. It is a written explanation of what input triggers what output (text plus a logic table) and forms part of the handover pack. The 2025 standard reinforces the documentation expectation.',
  },
  {
    id: 'elm5-s6-photo',
    question: 'What is the purpose of the photographic asset record at handover?',
    options: [
      'To provide marketing images of the finished installation for the contractor\'s portfolio.',
      'Operational and evidential — asset identification, verification, insurer / fire authority evidence, dispute resolution and post-incident investigation.',
      'Purely decorative, to show the client how the luminaires look when installed.',
      'An aesthetic record only, with no maintenance or evidential value.',
    ],
    correctIndex: 1,
    explanation:
      'The photographic record serves multiple operational and evidential purposes: asset identification (a maintainer knows the luminaire and location before arrival), verification of installation against design intent, insurer / fire authority evidence, dispute resolution, and post-incident investigation (as-installed vs as-found). One photograph per luminaire, indexed against the asset register and as-built drawings, filed in the documentation pack. Cost is low; benefit is real and ongoing, and the 2025 update implicitly supports it through documentation completeness.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the formal structure of a client handover for an emergency lighting installation?',
    options: [
      'A structured event: documentation pack delivery, responsible-person briefing, demonstration, schedule agreement, contacts, and a signed handover register.',
      'Delivery of the acceptance certificate by email, with no meeting required.',
      'Posting the operating manuals to the building manager after the final site visit.',
      'A verbal walk-round on the last day, confirming the lights work before leaving site.',
    ],
    correctAnswer: 0,
    explanation:
      'Handover is a structured event with documented outputs: documentation pack delivery (drawings, calculations, certificates, manuals, logbook starter, photographs), responsible-person briefing on RRO 2005 duties and the operational regime, demonstration of the daily check and test facilities, agreement of the periodic schedule, contacts and escalation, and a signed handover register. It is the moment of regulatory transfer from contractor to responsible person, and the signed register is what makes it defensible.',
  },
  {
    id: 2,
    question: 'Why is a cause-and-effect description required for staged or zoned emergency lighting systems?',
    options: [
      'To satisfy the manufacturer\'s warranty registration requirements for the luminaires.',
      'To provide the lux design calculation for each individual escape route.',
      'Because without it, future maintainers, verifiers and investigators cannot understand what the staged or zoned system is supposed to do.',
      'To record the make and model of every luminaire for the asset register.',
    ],
    correctAnswer: 2,
    explanation:
      'Cause-and-effect is the system intent in writing. A complex installation may have different response times in different areas (0.5 s, 5 s, 15 s), luminaires that operate only on fire-alarm activation, central battery sub-circuits feeding different zones, and addressable sequences. The description is text plus a logic table documenting what input triggers what output. Without it, the system\'s purpose is lost as soon as the design team disperses. The 2025 standard requires it for any system beyond simple all-on operation.',
  },
  {
    id: 3,
    question: 'The responsible person briefing at handover must include which of the following?',
    options: [
      'The preferred colour temperature of the installed emergency luminaires.',
      'The history of the luminaire manufacturer and its wider product range.',
      'The energy-efficiency rating of the installed luminaires for billing purposes.',
      'RRO 2005 duties, the daily indicator check, fault response, the periodic test regime, documentation use, and contractor contacts.',
    ],
    correctAnswer: 3,
    explanation:
      'The briefing covers the responsible person\'s RRO 2005 duties (Articles 14, 17, 23), the daily indicator check (where central battery is provided), the user duty to report flagged luminaires, the fault-response procedure, the planned periodic test regime and what to expect, the documentation pack location and use, and contractor contacts and escalation. It is recorded and signed by the responsible person as accepted. Anything less is a partial handover.',
  },
  {
    id: 4,
    question: 'What is the purpose of the spares list in the handover documentation pack?',
    options: [
      'To enable rapid maintenance response by identifying the consumables and recommended stock to hold on or near site.',
      'To provide the responsible person with a quotation for future planned works.',
      'To list the replacement-part prices for the building\'s annual maintenance budget.',
      'To record the original supplier contact for warranty claims only.',
    ],
    correctAnswer: 0,
    explanation:
      'The spares list identifies the consumables (batteries, lamps, luminaire bodies, fuses) and the quantities recommended to be held for routine fault response. Without it, a contractor attending a fault must identify the right spare by manufacturer / model / chemistry every time — slowing the response and increasing substitution errors. With it, the right spare is on hand and the system is back to compliance quickly. The 2025 update reinforces this as part of the documentation pack expectations.',
  },
  {
    id: 5,
    question: 'How is the emergency lighting handover related to the broader fire safety handover for a new building?',
    options: [
      'The emergency lighting handover replaces the wider fire safety handover entirely.',
      'The two are entirely separate and share no documentation or responsible person.',
      'Closely related — emergency lighting is one component of the broader fire safety package under the responsible person\'s overall RRO 2005 duty.',
      'The fire detection handover must always be completed before the lighting handover can begin.',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency lighting is one element of the broader fire safety package alongside fire detection (BS 5839-1:2025), means of escape (Approved Document B), fire-fighting systems, passive fire protection and the building FRA. The responsible person\'s overall RRO 2005 duty is the umbrella; the emergency lighting handover is one component handover that contributes to the FRA evidence base. Practical handovers often combine the components into a single fire safety handover event.',
  },
  {
    id: 6,
    question: 'What is the photographic asset record\'s role at handover?',
    options: [
      'To provide marketing images of the completed installation for the contractor.',
      'To confirm the colour rendering and brightness of each luminaire to the client.',
      'To document the cable routes between luminaires for future fault-finding work.',
      'Asset identification, verification of as-installed against design, insurer / fire authority evidence, dispute resolution and post-incident investigation.',
    ],
    correctAnswer: 3,
    explanation:
      'The photographic asset record is operational and evidential: asset identification (maintainers know what to expect before arrival), verification of as-installed against design, insurer / fire authority evidence, dispute resolution (any later claim about positioning can be checked), and post-incident investigation (as-installed vs as-found). One photograph per luminaire, indexed against the asset register, included in the handover pack and updated at significant changes. Low cost at commissioning, real benefit across years.',
  },
  {
    id: 7,
    question: 'Why must the handover include a demonstration of the test facility (where one is provided)?',
    options: [
      'Because the responsible person needs to understand how to operate the test facility safely and correctly, and know it exists.',
      'Because Building Control require the test facility to be operated in their presence.',
      'Because the test facility cannot be commissioned until the client has operated it once.',
      'Because the manufacturer\'s warranty is void unless the client witnesses a live test.',
    ],
    correctAnswer: 0,
    explanation:
      'The test facility — typically a key-operated test switch on the consumer unit or a test mode button on the central battery panel — is a tool for monthly functional testing or fault investigation. Without the demonstration, the responsible person may not know it exists, may not have the key, or may operate it incorrectly. The demonstration covers location, operation, what to expect (luminaires switching to emergency mode, indicators changing), how to restore normal operation, and any safety considerations, and is recorded in the handover documentation.',
  },
  {
    id: 8,
    question: 'How does the BS 5266-1:2025 handover relate to the start of the periodic regime?',
    options: [
      'The periodic regime starts independently, on a fixed calendar date set by the standard.',
      'The periodic regime only begins after the first annual inspection is completed.',
      'The handover is the start point — day zero from which all the periodic test clocks begin to run.',
      'The two are unrelated — periodic testing is governed solely by the maintenance contract.',
    ],
    correctAnswer: 2,
    explanation:
      'Handover is day zero. The acceptance certificate establishes the commissioning baseline, the documentation pack provides the design references, the briefing transfers the operational duties, and the schedule agreement starts the cadence. From handover the daily check begins (where applicable), the next monthly is one month away, the next annual a year away, the next five-year photometric five years away. The handover documentation is the day-zero reference for everything that follows.',
  },
  {
    id: 9,
    question: 'A handover is being completed and the responsible person says "we don\'t need the manuals — the contractor will handle everything". What is the correct response?',
    options: [
      'Agree, and let the contractor retain the full documentation pack on the client\'s behalf.',
      'Agree, but email a copy of the manuals to the client for their records only.',
      'Dispose of the surplus manuals to avoid duplicate paperwork on site.',
      'Decline politely — the RRO duties cannot be delegated, so the responsible person must hold the documentation pack.',
    ],
    correctAnswer: 3,
    explanation:
      'The responsible person under the RRO 2005 has duties that cannot be delegated to the contractor — particularly ongoing maintenance and records (Articles 17 and 23). The manuals, drawings and documentation pack must be in their possession because they are the operational memory needed to discharge those duties. The contractor handles the technical work; the responsible person retains the legal duty and the supporting documentation. Hand over the pack and explain why.',
  },
  {
    id: 10,
    question: 'What does BS 5266-1:2025 say about handover documentation completeness?',
    options: [
      'The pack must be complete at handover; missing items are non-compliance, not departures, and the certificate cannot honestly be signed if it is incomplete.',
      'The documentation pack remains optional and is provided only on request.',
      'Only the acceptance certificate is required; the rest of the pack is advisory.',
      'The contents of the pack are left entirely to the contractor\'s discretion.',
    ],
    correctAnswer: 0,
    explanation:
      'The 2025 update tightens documentation expectations and treats the pack as load-bearing — design, as-built, calculations, certificates, manuals, cause-and-effect, logbook starter, literature, spares list, photographs, briefing record and signed handover register. Missing items are non-compliance under the new departures policy, not departures. The certificate represents fact at signing; an incomplete pack cannot be honestly certified. The pack is the operational memory; without it, future maintenance, verification and investigation all fail.',
  },
];

const EmergencyLightingModule5Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Client handover procedure | Emergency Lighting Module 5.6 | Elec-Mate',
    description:
      'BS 5266-1:2025 client handover: documentation pack assembly, responsible-person briefing, cause-and-effect description, photographic asset record, signed handover register transferring regulatory responsibility.',
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
            eyebrow="Module 5 · Section 6"
            title="Client handover procedure"
            description="The structured handover that transfers an emergency lighting installation from the contractor to the responsible person. Documentation pack assembly, responsible-person briefing on RRO 2005 duties and operational regime, cause-and-effect description for staged or zoned systems, photographic asset record, demonstration of test facilities, and the signed handover register that records the regulatory transfer."
            tone="yellow"
          />

          <TLDR
            points={[
              'Handover is a structured event, not a casual delivery. Documentation pack + briefing + demonstration + schedule + contacts + signed register.',
              'Documentation pack: design drawings, as-builts, lux calculation, BS 5266-1:2025 acceptance certificate, BS 7671 EIC, central battery cert (where applicable), manuals, cause-and-effect, logbook starter, warranty, spares list, photographic record, briefing record.',
              'Responsible-person briefing: RRO 2005 duties (Articles 14, 17, 23), daily check (where applicable), fault response, periodic regime, documentation use, contractor contacts.',
              'Cause-and-effect description: required for staged or zoned systems. Text + logic table documenting what input triggers what output.',
              'Photographic asset record: one photo per luminaire, indexed against asset register and as-built. Operational and evidential value across installation life.',
              'Demonstration: test facility operation, central battery panel reading, self-test controller use (where applicable).',
              'Signed handover register: the transfer document. Records that the responsible person has accepted the documentation pack and the briefing.',
              '2025 emphasis: documentation pack must be complete at handover. Missing items are non-compliance, not departures. The certificate cannot honestly be signed if the pack is incomplete.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Assemble the BS 5266-1:2025 handover documentation pack with all required elements',
              'Compile the cause-and-effect description for staged or zoned emergency lighting systems',
              'Capture the photographic asset record at commissioning, indexed against the asset register and as-built drawings',
              'Brief the responsible person on RRO 2005 duties and the operational regime',
              'Demonstrate the test facility, central battery panel, and self-test controller (where applicable)',
              'Complete the signed handover register that transfers the regulatory responsibility',
              'Coordinate the emergency lighting handover with the broader fire safety handover for a new building',
              'Apply the 2025 tightened expectations on documentation pack completeness at handover',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The structured handover</ContentEyebrow>

          <ConceptBlock
            title="Handover is a regulatory transfer"
            plainEnglish="Handover is the moment the emergency lighting installation transitions from the contractor's responsibility (during installation and commissioning) to the responsible person's responsibility (during operation). The technical work has been done; the certification has been signed; now the operational regime must start under the right ownership. The handover is the structured event that effects this transfer — documentation moves from contractor to responsible person, the responsible person is briefed on their duties, the periodic schedule is agreed, the contacts are established, and a signed register records the transfer."
            onSite="Treat handover as a meeting, not a drop-off. Schedule a defined slot (typically 1-2 hours), have the responsible person present, walk through the documentation, deliver the briefing, demonstrate the operation, agree the schedule, sign the register. The investment of time pays back in years of clean operation."
          >
            <p>The handover sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Documentation pack assembly.</strong> Before the handover meeting, assemble the complete pack: design drawings, as-builts, lux calculation, BS 5266-1:2025 acceptance certificate, BS 7671 EIC, central battery system certificate (where applicable), manufacturer manuals, photometric data sheets, cause-and-effect description, logbook starter, warranty documentation, spares list, photographic record. Verify completeness against the BS 5266-1 expectations.
              </li>
              <li>
                <strong>Documentation pack walk-through.</strong> At the meeting, walk through each element of the pack with the responsible person. Explain what each document is, why it matters, where it should be filed, and how it will be used during operation.
              </li>
              <li>
                <strong>Responsible-person briefing.</strong> Deliver the structured briefing: RRO 2005 duties (Articles 14, 17, 23), daily check (where applicable), fault response, periodic regime, documentation use, contractor contacts. Use a briefing record / checklist; the responsible person initials each topic as covered.
              </li>
              <li>
                <strong>Demonstration.</strong> On site, demonstrate: the central battery panel and its indicators (where applicable), the test facility (key-operated test switch or test mode), the self-test controller (where applicable), the lockable supply isolator, the warning notices. The responsible person performs each operation under guidance.
              </li>
              <li>
                <strong>Periodic schedule agreement.</strong> Agree the planned schedule for monthly functional, annual duration, and five-year photometric tests. Calendar dates committed; the responsible person prepares site access and notifies building users for each window.
              </li>
              <li>
                <strong>Contacts and escalation.</strong> Confirm contractor contact details, normal hours support, out-of-hours support, and the procedure for raising fault calls. Document in the responsible person's management procedures.
              </li>
              <li>
                <strong>Signed handover register.</strong> A formal record signed by both parties confirming: documentation pack received, briefing completed, demonstration witnessed, schedule agreed, contacts established. Date, signatures, copies retained by both parties.
              </li>
            </ol>
            <p>
              Each step has a documented output. At the end of the meeting, the documentation pack is in the responsible person's possession, the briefing record is signed, the schedule is committed, the contacts are recorded, and the handover register is signed. The transfer is complete and defensible.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 13.4 (Handover)"
            clause={
              <>
                On completion of commissioning, the contractor shall hand over the emergency lighting installation to the responsible person by means of a structured handover including delivery of the complete documentation pack, briefing of the responsible person on their duties under the relevant fire safety legislation, demonstration of any test facilities and central battery systems, agreement of the periodic test schedule, and execution of a signed handover register. The handover documentation shall form part of the building fire safety records.
              </>
            }
            meaning="Five elements named: documentation pack, briefing, demonstration, schedule agreement, signed register. The clause is firm — handover is a structured event. The documentation feeds the building fire safety records (FRA evidence base)."
          />

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 14 (Emergency routes and exits)"
            clause={
              <>
                Where necessary in order to safeguard the safety of relevant persons, the responsible person shall ensure that emergency routes and exits are indicated by signs and that emergency routes and exits requiring illumination are provided with emergency lighting of adequate intensity in the case of failure of their normal lighting.
              </>
            }
            meaning="The legal duty for emergency lighting sits on the responsible person. The technical implementation is done by the contractor; the duty stays with the responsible person. The handover is the transfer of operational responsibility under this duty."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Handover document set diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Handover documentation pack — required elements
            </h4>
            <svg
              viewBox="0 0 820 600"
              className="w-full h-auto"
              role="img"
              aria-label="Map of the handover documentation pack showing the design documents, certificates, manuals, operational documents, and records, all wrapped in the handover register."
            >
              {/* Title */}
              <rect x="20" y="20" width="780" height="36" rx="6" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="410" y="44" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                BS 5266-1:2025 handover documentation pack
              </text>

              {/* Design row */}
              <rect x="20" y="76" width="780" height="100" rx="8" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.4" />
              <text x="40" y="98" fill="#22D3EE" fontSize="11" fontWeight="bold">Design documents</text>
              <rect x="40" y="112" width="160" height="50" rx="4" fill="rgba(34,211,238,0.10)" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />
              <text x="120" y="132" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Design drawings</text>
              <text x="120" y="148" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">escape routes · luminaires</text>

              <rect x="210" y="112" width="160" height="50" rx="4" fill="rgba(34,211,238,0.10)" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />
              <text x="290" y="132" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">As-built drawings</text>
              <text x="290" y="148" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">installed reality</text>

              <rect x="380" y="112" width="160" height="50" rx="4" fill="rgba(34,211,238,0.10)" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />
              <text x="460" y="132" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Lux calculation</text>
              <text x="460" y="148" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">DIALux / Relux model</text>

              <rect x="550" y="112" width="200" height="50" rx="4" fill="rgba(34,211,238,0.10)" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />
              <text x="650" y="132" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Cause-and-effect</text>
              <text x="650" y="148" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">staged / zoned systems</text>

              {/* Certificates row */}
              <rect x="20" y="186" width="780" height="100" rx="8" fill="rgba(34,197,94,0.06)" stroke="#22C55E" strokeWidth="1.4" />
              <text x="40" y="208" fill="#22C55E" fontSize="11" fontWeight="bold">Certificates</text>
              <rect x="40" y="222" width="160" height="50" rx="4" fill="rgba(34,197,94,0.10)" stroke="rgba(34,197,94,0.5)" strokeWidth="1" />
              <text x="120" y="242" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Acceptance cert</text>
              <text x="120" y="258" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">BS 5266-1:2025</text>

              <rect x="210" y="222" width="160" height="50" rx="4" fill="rgba(34,197,94,0.10)" stroke="rgba(34,197,94,0.5)" strokeWidth="1" />
              <text x="290" y="242" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">BS 7671 EIC</text>
              <text x="290" y="258" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">underlying electrical</text>

              <rect x="380" y="222" width="160" height="50" rx="4" fill="rgba(34,197,94,0.10)" stroke="rgba(34,197,94,0.5)" strokeWidth="1" />
              <text x="460" y="242" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Central battery cert</text>
              <text x="460" y="258" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">BS EN 50171:2021</text>

              <rect x="550" y="222" width="200" height="50" rx="4" fill="rgba(34,197,94,0.10)" stroke="rgba(34,197,94,0.5)" strokeWidth="1" />
              <text x="650" y="242" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Initial photometric</text>
              <text x="650" y="258" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">commissioning baseline</text>

              {/* Manuals row */}
              <rect x="20" y="296" width="780" height="100" rx="8" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.4" />
              <text x="40" y="318" fill="#A855F7" fontSize="11" fontWeight="bold">Manuals and data</text>
              <rect x="40" y="332" width="160" height="50" rx="4" fill="rgba(168,85,247,0.10)" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
              <text x="120" y="352" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Technical manuals</text>
              <text x="120" y="368" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">per product type</text>

              <rect x="210" y="332" width="160" height="50" rx="4" fill="rgba(168,85,247,0.10)" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
              <text x="290" y="352" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Photometric data</text>
              <text x="290" y="368" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">per luminaire</text>

              <rect x="380" y="332" width="160" height="50" rx="4" fill="rgba(168,85,247,0.10)" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
              <text x="460" y="352" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Warranty docs</text>
              <text x="460" y="368" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">manufacturer terms</text>

              <rect x="550" y="332" width="200" height="50" rx="4" fill="rgba(168,85,247,0.10)" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
              <text x="650" y="352" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Spares list</text>
              <text x="650" y="368" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">recommended stock</text>

              {/* Operational row */}
              <rect x="20" y="406" width="780" height="100" rx="8" fill="rgba(251,191,36,0.06)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="40" y="428" fill="#FBBF24" fontSize="11" fontWeight="bold">Operational records</text>
              <rect x="40" y="442" width="160" height="50" rx="4" fill="rgba(251,191,36,0.10)" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
              <text x="120" y="462" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Logbook starter</text>
              <text x="120" y="478" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">BS 5266-1 model</text>

              <rect x="210" y="442" width="160" height="50" rx="4" fill="rgba(251,191,36,0.10)" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
              <text x="290" y="462" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Asset register</text>
              <text x="290" y="478" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">populated</text>

              <rect x="380" y="442" width="160" height="50" rx="4" fill="rgba(251,191,36,0.10)" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
              <text x="460" y="462" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Photographic record</text>
              <text x="460" y="478" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">one per luminaire</text>

              <rect x="550" y="442" width="200" height="50" rx="4" fill="rgba(251,191,36,0.10)" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
              <text x="650" y="462" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">Briefing record</text>
              <text x="650" y="478" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">RP signature</text>

              {/* Wrapper — handover register */}
              <rect x="20" y="516" width="780" height="62" rx="8" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.6" />
              <text x="410" y="540" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">
                Signed handover register — the regulatory transfer document
              </text>
              <text x="410" y="558" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Contractor + responsible person both sign · documentation accepted · briefing completed · schedule agreed
              </text>
              <text x="410" y="572" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                The pack is the operational memory · the register is the moment of transfer
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The cause-and-effect description</ContentEyebrow>

          <ConceptBlock
            title="Documenting the system intent"
            plainEnglish="A simple emergency lighting installation has one operating logic: when mains fails locally, the luminaires switch to battery and illuminate. A complex installation has multiple logics. Different escape routes may have different response times. Some luminaires may only operate on a fire alarm signal (high-risk task lighting that activates when the alarm is raised). Central battery sub-circuits may feed different zones with different recovery profiles. Addressable systems may have programmed sequences. Without a written record of what each input is supposed to trigger, the system intent is lost as soon as the original design team disperses. The cause-and-effect description is that written record."
            onSite="The cause-and-effect is most useful as a logic table — input column on the left, output column on the right, with the precise behaviour described. Supplemented by a narrative explaining the design intent. Reviewed at handover; updated when the system changes."
          >
            <p>What a cause-and-effect description includes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Input list.</strong> Every signal that affects the emergency lighting operation: local mains failure (per circuit), central battery mains failure, fire alarm activation (panel signal), test facility operation (test switch, test mode button), supply isolator operation, manual override switches.
              </li>
              <li>
                <strong>Output list.</strong> Every response the system can make: per-luminaire switching to emergency mode, central battery transfer, slave luminaire activation, override of normal lighting, response within design class (0.5 s / 5 s / 15 s), high-risk task light activation.
              </li>
              <li>
                <strong>Logic table.</strong> Row per input, column per output (or vice versa), describing the relationship. Example: input "Local mains failure on circuit DB-G/4" → output "Maintained luminaires on DB-G/4 switch to battery and continue to illuminate; non-maintained luminaires on DB-G/4 switch on for 3 hours; signage continues to illuminate".
              </li>
              <li>
                <strong>Narrative.</strong> Explain the design intent — why the logic is what it is. Example: "The high-risk task light in the laboratory activates only on fire alarm signal because in normal evacuation the laboratory is exited via the main escape route which has its own emergency lighting; the high-risk task light supports controlled shutdown of equipment, which is only required if the fire alarm has activated."
              </li>
              <li>
                <strong>Test references.</strong> For each logic row, reference how it was verified at commissioning — typically the switch-on test for that area, the duration test, any fire-alarm-triggered test.
              </li>
              <li>
                <strong>Update history.</strong> Where the system has been modified since commissioning, the cause-and-effect document is updated and old versions retained as historical record.
              </li>
            </ul>
            <p>
              For simple all-on-mains-fail installations, the cause-and-effect can be a single page. For complex installations with fire-alarm integration, central battery zoning, and addressable controllers, it can run to several pages. The 2025 standard reinforces this as part of the documentation pack — it is no longer optional for systems beyond the simplest.
            </p>
          </ConceptBlock>

          <Scenario
            title="Cause-and-effect saves a future investigation"
            situation="A 2026-commissioned installation in a research building has high-risk task lighting in three laboratories that activates only on fire alarm signal (not on local mains failure). The cause-and-effect description, prepared at commissioning, is in the documentation pack. In 2030, an incident in one of the laboratories prompts an investigation. The investigators ask why the high-risk task light did not operate during a brief mains outage that occurred earlier on the day of the incident."
            whatToDo="The cause-and-effect description is consulted. The design intent is documented: high-risk task lighting in laboratories activates on fire alarm signal, not on mains failure. The mains outage earlier in the day did not activate the fire alarm, so the high-risk task light did not operate — by design. The investigation moves on; the system was operating to design intent. Without the cause-and-effect description, the investigation could have spent weeks trying to determine whether the lighting failed or was working as intended."
            whyItMatters="Cause-and-effect is the design intent in writing. It saves future investigations from reinventing the system\'s purpose. The 2025 standard reinforces this for any non-trivial installation. The cost to produce at commissioning is small; the value at any future review is real."
          />

          <SectionRule />

          <ContentEyebrow>Responsible-person briefing</ContentEyebrow>

          <ConceptBlock
            title="Transferring the operational duty"
            plainEnglish="The responsible person under the RRO 2005 carries the legal duty for the emergency lighting. The contractor has done the technical work; the responsible person now carries the duty for ongoing operation, maintenance, and records. The briefing at handover is the structured transfer of this knowledge — what their duties are, what the daily check involves, how to recognise a fault, how to respond, when the periodic regime activities are scheduled, where the documentation is, and how to escalate."
          >
            <p>The briefing structure (typical 30-60 minutes):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>RRO 2005 duties.</strong> Article 14 (emergency escape route lighting), Article 17 (maintenance), Article 23 (records). Plain language summary of what the responsible person is legally obliged to do.
              </li>
              <li>
                <strong>The system.</strong> What has been installed: self-contained / central battery / hybrid; how many luminaires; key system features (self-test addressable controller, fire alarm integration, zoned operation).
              </li>
              <li>
                <strong>Daily check (where applicable).</strong> The brief indicator scan on the central battery panel or self-test controller. Green = healthy, anything else = call contractor. Demonstrate the check; provide the daily check book / electronic log.
              </li>
              <li>
                <strong>User reporting.</strong> Building users may notice a flagged luminaire (LED status, beep). Establish the procedure for them to report: who do they tell? Typically the responsible person via the building management system or directly.
              </li>
              <li>
                <strong>Fault response.</strong> When a fault is identified, the procedure is: do NOT silence alarms or reset faults; record the observation; call the maintenance contractor with the description; await response. Provide the contractor contact details.
              </li>
              <li>
                <strong>Periodic regime schedule.</strong> Walk through the planned schedule — monthly functional, annual duration, five-year photometric. Confirm the scheduled dates, what each test involves, what the responsible person needs to do (typically: confirm site access, notify building users, provide the contractor with access).
              </li>
              <li>
                <strong>Documentation pack location.</strong> Confirm where the pack will be stored. Walk through how to use it — how to find a luminaire on the as-built, how to reference a manufacturer manual, how to read the logbook.
              </li>
              <li>
                <strong>Escalation.</strong> Out-of-hours support, escalation to senior contractor staff, regulatory escalation (fire authority contact in extreme circumstances).
              </li>
              <li>
                <strong>Briefing record.</strong> A checklist signed by the responsible person confirming each topic was covered. Filed in the documentation pack.
              </li>
            </ul>
            <p>
              The briefing is structured so that any responsible person — competent in fire safety overall but not specifically in emergency lighting — can carry out their duties confidently. The contractor is not just installing equipment; they are equipping the responsible person with the operational understanding to use it correctly.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Briefing the wrong person"
            whatHappens="Handover is scheduled for a Friday afternoon. The responsible person under the RRO is the building manager but is on leave; their administrative assistant attends instead. The briefing is delivered to the assistant who duly initials each topic. The documentation pack is left with the assistant. The actual responsible person returns the following week with no awareness of the handover, no briefing, and no operational understanding. The daily check duty is not started."
            doInstead="The briefing must be delivered to the actual responsible person — the named individual carrying the RRO duty. Not their assistant, not a deputy, not whoever happens to be available on the day. If the responsible person is genuinely unavailable, defer the handover to a date when they can attend. The briefing is regulatorily significant; delivering it to the wrong person does not effect the transfer. Reschedule rather than misdirect."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Photographic asset record</ContentEyebrow>

          <ConceptBlock
            title="One photograph per luminaire"
            plainEnglish="The photographic asset record is becoming standard practice and is implicitly supported by the 2025 documentation pack expectations. At commissioning, every emergency luminaire is photographed in its as-installed position with its installation label visible. The photographs are filed with the asset register, indexed against the unique luminaire reference, and included in the handover documentation pack. The investment is a half to full day of photography at commissioning and a small archive thereafter; the operational and evidential return is substantial across the installation life."
          >
            <p>Photographic record practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>One photograph per luminaire.</strong> Capture the luminaire in its location with enough surrounding context for orientation. The installation label must be readable in the photograph (zoom in if necessary, or take a second close-up of the label).
              </li>
              <li>
                <strong>Naming convention.</strong> File name matches the unique luminaire reference (e.g. EL-G-014.jpg). Filing structure organised by area or by reference. Consistent across the installation.
              </li>
              <li>
                <strong>Quality.</strong> Sharp, well-lit, taken with a competent camera (a modern smartphone is generally adequate). Dark or blurred photographs add no value.
              </li>
              <li>
                <strong>Index.</strong> The asset register has a column for the photograph reference; the photograph file folder has the matched filename. The index is the link.
              </li>
              <li>
                <strong>Cross-reference to as-built.</strong> The luminaire reference cross-references to the as-built drawing position; the photograph confirms the installation matches the as-built.
              </li>
              <li>
                <strong>Update at significant changes.</strong> Where a luminaire is replaced or relocated, take a new photograph and supersede the original. Old photographs retained as historical record.
              </li>
              <li>
                <strong>Backup.</strong> Photographs stored with backup discipline — they are part of the documentation pack and should not be lost in a single hard-drive failure.
              </li>
            </ul>
            <p>
              The photographic record adds about 5-10% to commissioning effort but pays back many times over. Maintenance dispatch is faster (the maintainer knows what to expect); insurer audits are quicker (visual evidence of the system); investigations are more decisive (as-installed vs as-found can be compared directly). Modern installations should treat the photographic record as a standard handover deliverable.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Demonstration of the test facilities</ContentEyebrow>

          <ConceptBlock
            title="Hands-on familiarisation"
            plainEnglish="The handover briefing transfers the knowledge in words; the demonstration transfers the operational understanding by hands-on experience. The responsible person operates the test facility under the contractor's guidance, sees the system respond, and gains the confidence to use the controls correctly. Without the demonstration, the responsible person may know the test facility exists in theory but not actually know how to use it; in practice this often means the facility is never used, which negates its purpose."
          >
            <p>Items typically demonstrated at handover:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Central battery panel.</strong> Where applicable. Show the panel location, the indicator LEDs, the panel display, the daily-check focal point. Show what each indication means; show what an alarm condition looks like (some panels have a test mode that simulates alarms safely).
              </li>
                <li>
                <strong>Test facility (key-operated test switch or test mode button).</strong> Where provided. Show the location; show how to operate; show what to expect (luminaires switching to emergency mode for the duration of the test; LEDs change). Show how to restore.
              </li>
              <li>
                <strong>Self-test addressable controller.</strong> Where applicable. Show the controller location, how to log on, how to read the test logs, how to identify a flagged luminaire. The responsible person's daily / weekly review of the controller is the equivalent of the central battery panel daily check.
              </li>
              <li>
                <strong>Lockable supply isolator.</strong> Show the isolator location, the lock, the key control. Confirm the key holder. Demonstrate that the lock is fitted; the responsible person handles the lock and key.
              </li>
              <li>
                <strong>Warning notices.</strong> Walk past the warning notices on the isolator, the central battery enclosure, the fire-rated battery room. Confirm the responsible person understands what each notice means.
              </li>
              <li>
                <strong>Fire-rated battery enclosure.</strong> Where applicable. Show the enclosure, confirm the door seal, the keep-closed expectation, the access control.
              </li>
              <li>
                <strong>Spare parts location.</strong> Where the spares list nominates on-site stock (batteries, lamps), show the storage location, the inventory log, the rotation procedure (spares should be exercised periodically — the contractor uses on-site spares first, replacing them at the next visit).
              </li>
            </ul>
            <p>
              The demonstration takes 15-30 minutes for a typical installation. It makes the difference between a responsible person who has read about the system and one who has actually operated it. The 2025 standard supports the demonstration as part of the structured handover.
            </p>
          </ConceptBlock>

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

          <ContentEyebrow>The signed handover register</ContentEyebrow>

          <ConceptBlock
            title="The transfer document"
            plainEnglish="The signed handover register is the formal record that the structured handover has taken place. It records: the date and parties; the documentation pack delivered (item by item); the briefing topics covered; the demonstrations witnessed; the periodic schedule agreed; the contacts established. Both the contractor and the responsible person sign. Copies are retained by both parties. The register is the moment of regulatory transfer — from this date, the responsible person carries the operational duty under the RRO 2005, supported by the documentation pack and the briefing they have received."
          >
            <p>The handover register sections:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Header.</strong> Building address, design reference, contractor identification, responsible person identification, date of handover.
              </li>
              <li>
                <strong>Documentation pack receipt.</strong> Item-by-item list (design drawings, as-builts, lux calculation, certificates, manuals, cause-and-effect, logbook, warranty, spares list, photographs, briefing record). Each ticked off as received; the responsible person initials.
              </li>
              <li>
                <strong>Briefing topics.</strong> List of topics covered (RRO duties, daily check, fault response, periodic regime, documentation use, contacts). Each ticked off as covered.
              </li>
              <li>
                <strong>Demonstrations witnessed.</strong> List of items demonstrated (central battery panel, test facility, self-test controller, lockable isolator, warning notices, spares location). Each ticked off.
              </li>
              <li>
                <strong>Schedule agreement.</strong> The dates committed for the next monthly functional, annual duration, and five-year photometric tests.
              </li>
              <li>
                <strong>Contacts.</strong> Contractor primary contact, normal hours, out-of-hours, escalation. Email and phone.
              </li>
              <li>
                <strong>Signatures.</strong> Contractor competent person signature, responsible person signature, date.
              </li>
              <li>
                <strong>Distribution.</strong> Both parties retain a signed copy. The responsible person's copy is filed in the documentation pack.
              </li>
            </ul>
            <p>
              The register is typically a single document of 2-4 pages — concise but covering all the elements. Once signed, it is the dispositive record of the handover. Insurers, fire authorities, and any future investigation can verify the transfer took place properly.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Skipping the signed register because the documentation has been emailed"
            whatHappens="Modern handover often involves emailing the documentation pack as PDFs to the responsible person rather than a physical handover meeting. The contractor takes the email delivery as sufficient evidence of handover and does not arrange the briefing or signed register. Two years later, an audit asks for the handover register — there is none. The responsible person does not recall a structured briefing. The transfer is not formally documented; the contractor is exposed for incomplete handover."
            doInstead="Email delivery of the documentation pack is fine but does not replace the structured handover meeting. Schedule the meeting separately — even a 1-hour video call covering briefing, demonstration walk-through (via shared video), and execution of the signed register electronically. The signed register is the transfer document; without it, the handover is incomplete. Modern electronic signatures are acceptable for the register where they meet integrity requirements (authenticated user, timestamp, tamper-evidence)."
          />

          <SectionRule />

          <ContentEyebrow>Coordinating with the broader fire safety handover</ContentEyebrow>

          <ConceptBlock
            title="Emergency lighting in the wider fire safety context"
            plainEnglish="Emergency lighting is one component of a broader fire safety package for any commercial building. The complete fire safety handover typically covers: fire detection and alarm (BS 5839-1:2025); means of escape design (Approved Document B, fire risk assessment); fire-fighting systems (sprinklers / dry risers / fire mains where present); passive fire protection (compartmentation, fire doors, fire stopping); and emergency lighting (BS 5266-1:2025). Each component has its own handover with its own documentation pack and certification; the responsible person\'s overall fire safety duty under the RRO 2005 covers them all."
          >
            <p>Coordination of emergency lighting handover with the fire safety package:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Combined briefing where practical.</strong> The responsible person's RRO 2005 duties cover the whole fire safety system. A combined briefing covering detection, escape, lighting, fighting, and passive protection is more efficient than separate briefings.
              </li>
              <li>
                <strong>Cross-referenced documentation packs.</strong> The emergency lighting cause-and-effect description should reference the fire alarm cause-and-effect where the systems are integrated. The fire risk assessment should reference both the emergency lighting and the fire detection certification.
              </li>
              <li>
                <strong>Aligned periodic schedules.</strong> Where the same contractor maintains both fire alarm and emergency lighting (common pattern), monthly cadences can be coordinated. Annual duration tests should NOT coincide with annual fire alarm tests (avoid two safety systems in test simultaneously); space them across the year.
              </li>
              <li>
                <strong>Fire risk assessment integration.</strong> The FRA is the responsible person's overall fire safety document. Emergency lighting documentation feeds into the FRA evidence base; FRA review cycles (typically annual) should reference the most recent emergency lighting periodic certificate.
              </li>
              <li>
                <strong>Unified responsible person record.</strong> The responsible person's fire safety records are typically held as a single fire safety file covering all components. The BS 5266-1 logbook sits within this file alongside the BS 5839-1 logbook and the FRA review records.
              </li>
            </ul>
            <p>
              The handover is most efficient when seen in the broader fire safety context. The 2025 BS 5266-1 update implicitly supports this by treating the documentation pack as part of the building fire safety records, not a standalone artefact.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Handover is a structured event — documentation pack + briefing + demonstration + schedule + contacts + signed register. Not a casual delivery.',
              'Documentation pack: design drawings, as-builts, lux calculation, BS 5266-1:2025 acceptance cert, BS 7671 EIC, central battery cert (where applicable), manuals, photometric data, cause-and-effect (for staged/zoned systems), logbook starter, warranty, spares list, photographic record, briefing record.',
              'Cause-and-effect description: required for any system beyond simple all-on-mains-fail. Logic table + narrative documenting input → output.',
              'Photographic asset record: one photo per luminaire, indexed against asset register and as-built. Standard practice at commissioning; pays back across years.',
              'Responsible-person briefing: RRO 2005 duties (Articles 14, 17, 23), daily check (where applicable), fault response, periodic regime, documentation use, contacts. Signed briefing record.',
              'Demonstration: central battery panel, test facility, self-test controller, lockable isolator, warning notices, spares location. Hands-on familiarisation.',
              'Signed handover register: the regulatory transfer document. Both parties sign; both retain copies. Records pack receipt, briefing covered, demonstrations witnessed, schedule agreed, contacts established.',
              'The handover is the day-zero reference for the periodic regime — the clocks start, the monthly / annual / five-yearly / EICR cadences flow from this date.',
              '2025 emphasis: documentation pack must be complete at handover. Missing items are non-compliance, not departures. The acceptance certificate cannot honestly be signed if the pack is incomplete.',
              'Coordinate with broader fire safety handover (detection, escape, fighting, passive protection). Single fire safety record file; overall RRO 2005 duty covers all components.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Can the documentation pack be delivered electronically rather than as a physical folder?',
                answer:
                  'Yes — the 2025 standard accepts electronic documentation packs where they are complete, organised, and accessible to the responsible person. Modern practice often uses a structured cloud folder or a dedicated facilities management system. The signed handover register can also be electronic where the signatures meet integrity requirements (authenticated user, timestamp, tamper-evidence). Backup discipline is essential — a single-point-of-failure electronic store that loses the documentation is a serious exposure. Many responsible persons retain a physical folder of the most critical documents (acceptance certificate, logbook starter, signed handover register) as a backup to the electronic pack.',
              },
              {
                question: 'How long should the handover meeting actually last?',
                answer:
                  'For a typical commercial installation: 1-2 hours total. Approximately 30 minutes documentation pack walk-through, 30-60 minutes briefing, 15-30 minutes demonstration on site. Larger installations with more complex systems take longer; smaller installations less. The investment of time pays back in operational confidence; rushing the handover to fit a 30-minute slot tends to leave gaps that surface later.',
              },
              {
                question: 'What if the building is being sold and the existing maintenance contractor is being replaced at the same time?',
                answer:
                  'This is a complex transition that needs careful sequencing. The outgoing contractor delivers the up-to-date documentation pack to the building owner / responsible person (not directly to the new contractor). The new contractor receives the pack from the responsible person at the start of the new contract, reviews it, raises any defects or gaps, and continues from there. The outgoing contractor\'s handover is to the responsible person; the incoming contractor\'s mobilisation is from the responsible person. The two events should not be conflated — the responsible person is the constant party.',
              },
              {
                question: 'Can the cause-and-effect description be a single page?',
                answer:
                  'Yes, for simple installations — a single-page logic table covering all inputs and outputs is fine. For complex installations (fire alarm integration, central battery zoning, addressable controller sequences) the document grows naturally to several pages. The criterion is completeness: every input documented, every output documented, every relationship described. Length follows complexity; a forced single-page summary on a complex system loses information.',
              },
              {
                question: 'Does the responsible person need to be technically qualified?',
                answer:
                  'Not in an electrical sense — the responsible person is defined by the RRO 2005 (the building occupier or person with control). They typically engage competent contractors for the technical work. The responsible person\'s competence is in fire safety management — understanding the duties, recognising flagged conditions, calling the right contractor, maintaining records. Training programmes (Institute of Fire Safety Managers, NEBOSH National Fire Certificate) support this competence. The technical work is delegated; the duty is not.',
              },
              {
                question: 'What if the responsible person changes after handover (e.g. building sale, manager change)?',
                answer:
                  'The new responsible person inherits the RRO duty and the documentation pack. The previous responsible person hands over the pack to the new one. The original commissioning handover register stands as the original transfer record. A subsequent change-of-responsibility record is typically created — confirming the new responsible person has received the documentation pack and is briefed on their duties (typically by the maintenance contractor or by the previous responsible person). The chain of custody is preserved through the records.',
              },
              {
                question: 'Is the handover meeting required for a small installation (e.g. a small shop with 6 luminaires)?',
                answer:
                  'Yes, in principle — the same RRO duties apply. In practice, the handover for a small installation is a smaller event: 30 minutes total, focused briefing, simple documentation pack, signed register. The structure is the same; the scale is smaller. Skipping the handover for "it\'s only a small installation" is a regulatory exposure if anything goes wrong — the responsible person would not have been formally briefed on their duties.',
              },
              {
                question: 'Can the signed handover register be the same document as the acceptance certificate?',
                answer:
                  'They are typically separate documents covering different things. The acceptance certificate is the technical commissioning verification; the handover register is the documentation transfer and briefing. Combining them risks confusing the two purposes — the acceptance certificate is signed by the competent person on technical grounds; the handover register is signed by both contractor and responsible person on documentation transfer grounds. Keep them separate; cross-reference each other.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Client handover procedure — Module 5.6" questions={quizQuestions} />

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
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 6
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

export default EmergencyLightingModule5Section6;
