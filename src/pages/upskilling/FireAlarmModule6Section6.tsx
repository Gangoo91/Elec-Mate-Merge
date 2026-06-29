import { ArrowLeft, ChevronLeft, ChevronRight, Users } from 'lucide-react';
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
    id: 'fam6-s6-rp',
    question:
      'Who is the "responsible person" under the Regulatory Reform (Fire Safety) Order 2005, and what is their relationship to the BS 5839-1:2025 weekly user test duty?',
    options: [
      'The fire and rescue service, who assume the maintenance duty once the system is commissioned.',
      'The employer (or person in control of the premises, or owner) — and the duty stays with them even when execution is delegated.',
      'Any occupant present in the building at the time a fault or alarm condition arises.',
      'The contracted servicing organisation alone, since they carry out the technical work.',
    ],
    correctIndex: 1,
    explanation:
      'RRO 2005 Article 3 defines the responsible person — in workplace areas the employer, otherwise the person with control of the premises in connection with a trade / business / undertaking, or the owner. Article 17 imposes the maintenance duty. BS 5839-1:2025 implements it through the weekly user test, monthly auxiliary supply test and contracted six-monthly servicing. Delegation of execution to a designated person on site does not transfer the duty.',
  },
  {
    id: 'fam6-s6-content',
    question:
      'At handover, what training does BS 5839-1:2025 expect the commissioning / handover organisation to provide to the user / responsible person?',
    options: [
      'A contact phone number for the engineer plus the manufacturer manuals for self-study.',
      'A structured session covering weekly test, alarm and fault response, false-alarm categories, documentation and cyber-security basics, recorded and signed.',
      'A demonstration of the weekly test only, on the basis that the rest can be learned on the job.',
      'A printed leaflet summarising the system and the servicing organisation\'s contact details.',
    ],
    correctIndex: 1,
    explanation:
      'Handover training is a structured session covering how to perform the weekly user test, what to do on a real alarm (evacuation, FRS interaction, reset by a competent person only), how to respond to a fault (do not silence, log, contact the servicer, interim measure if applicable), the false-alarm categories and how to assign them, where the documentation lives, and basic cyber-security expectations. It is recorded in the logbook with date and signed acknowledgement. The 2025 standard makes the false-alarm-category training explicit.',
  },
  {
    id: 'fam6-s6-doc',
    question: 'What documentation pack should be left with the responsible person at handover?',
    options: [
      'The as-installed wiring diagram and the manufacturer O&M manual for the control panel.',
      'A complete pack: acceptance certificate, drawings, zone plan, cause-and-effect, O&M manuals, asset register, logbook, training records, ARC details, cyber guidance, contacts.',
      'The acceptance certificate and the commercial invoice for the installation work carried out.',
      'The zone plan and the servicing contract, with other documents available from the installer on request.',
    ],
    correctIndex: 1,
    explanation:
      'The pack is comprehensive: acceptance certificate (Annex G), as-installed drawings, zone plan (per clause 22.2.5 — now unconditional in multi-zone sleeping premises per clause 6), cause-and-effect matrix or text (NEW 2025 explicit per clause 47), O&M manuals, a fully populated asset register, logbook template (Annex H), training records, ARC details, manufacturer cyber-security guidance, and servicing-organisation contacts.',
  },
  {
    id: 'fam6-s6-cyber',
    question: 'Cyber-security training for the user / responsible person should cover.',
    options: [
      'Nothing at this level, since cyber-security is solely the servicing engineer\'s responsibility.',
      'Basic cyber-hygiene: no untrusted devices on the CIE, no shared credentials, physical access control, recognising and refusing suspicious remote-access requests, and reporting promptly.',
      'How to read the manufacturer\'s cyber-security manual and configure the panel\'s own firewall.',
      'How to set and periodically change the single administrator password used to access the panel.',
    ],
    correctIndex: 1,
    explanation:
      'User-level cyber hygiene is basic and non-technical: do not connect untrusted devices (USB sticks, laptops) to the CIE / gateway; do not share authentication credentials; control physical access to the CIE / comms cabinet; recognise unusual remote-access requests (an unscheduled "emergency firmware update" call is a red flag); and report any suspected unauthorised access immediately. The 2025 clause 43.4 makes the user part of the defence, not just the engineer.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Who is the "responsible person" under RRO 2005 in a typical workplace, and what is their relationship to BS 5839-1:2025?',
    options: [
      'The employer for workplace areas (or the person in control of the premises, or the owner); BS 5839-1:2025 is how the duty is delivered.',
      'The local fire and rescue service, who inspect the premises and own the maintenance duty once a system is installed and commissioned.',
      'Whichever competent servicing organisation holds the current six-monthly maintenance contract, with the duty transferring on renewal.',
      'The designated weekly-test user on site, since they operate the call points and keep the logbook records up to date.',
    ],
    correctAnswer: 0,
    explanation:
      'RRO 2005 Article 3 defines the responsible person — the employer for workplace areas, otherwise the person with control of the premises in connection with a trade / business / undertaking, or the owner. Article 17 imposes the maintenance duty. BS 5839-1:2025 is the practical implementation (weekly tests, monthly auxiliary tests, six-monthly servicing). Delegation of execution does not transfer the duty.',
  },
  {
    id: 2,
    question:
      'Per BS 5839-1:2025 clause 47, what is now explicitly required to be included in the documentation pack at handover?',
    options: [
      'A signed copy of the responsible person\'s fire risk assessment, cross-referenced to each detection zone.',
      'A photographic survey of every device location, time-stamped and indexed to the zone plan layout.',
      'A cause-and-effect matrix or text description of how the cause and effect operates.',
      'A manufacturer warranty certificate for the control and indicating equipment and its detectors.',
    ],
    correctAnswer: 2,
    explanation:
      'Clause 47 makes the cause-and-effect document an explicit handover requirement (NEW 2025). It can be as simple as "this system operates as simultaneous evacuation" for a basic system, or a comprehensive matrix for complex strategies. The standard does not dictate the format, only that the document is produced and included.',
  },
  {
    id: 3,
    question: 'The handover training session should cover which of the following at minimum?',
    options: [
      'The weekly test procedure and the panel reset sequence only, since these are the routine tasks the user performs.',
      'Weekly test, real-alarm response, fault response, false-alarm categorisation, documentation locations and cyber-security basics — recorded and signed.',
      'The full commissioning and verification procedure, so the user can repeat acceptance testing after any modification.',
      'The detector head-cleaning and contamination-checking routine, so the user can defer the six-monthly servicing.',
    ],
    correctAnswer: 1,
    explanation:
      'Structured training covers the weekly user test (operate one MCP rotated, observe alarm, sounders / VADs, ARC, reset, log), real-alarm response (evacuation, FRS interaction, reset only by a competent person), fault response (no silencing, log, notify servicer, interim measure if applicable), false-alarm categorisation (NEW 2025 explicit), documentation locations, and cyber-security basics. It is recorded in the logbook with date and signed acknowledgement.',
  },
  {
    id: 4,
    question: 'Periodic re-training of the designated weekly-test user is recommended.',
    options: [
      'Only after a real fire or a confirmed false-alarm incident has actually occurred on the premises.',
      'Only when the control and indicating equipment is replaced; staff turnover alone does not warrant fresh training.',
      'When the designated user changes, when the system is significantly modified, and as a matter of good practice on a regular cycle.',
      'Only at the ten-yearly point when the system reaches the end of its design life and is due for full replacement.',
    ],
    correctAnswer: 2,
    explanation:
      'Re-training is triggered when the designated user changes (a new staff member taking on the duty), when the system is significantly modified (new zones, CIE, firmware behaviour), at the responsible person\'s discretion in response to changes in premises use or staff turnover, and as good practice on an annual or biennial cycle. The training records are updated and the new user signs the logbook to acknowledge their training.',
  },
  {
    id: 5,
    question:
      'A real fire alarm has activated. Per the handover training, the user / staff response should be.',
    options: [
      'Silence the sounders first to investigate the cause calmly, then evacuate only if a genuine fire is confirmed at the device.',
      'Initiate evacuation per the fire plan; do not reset until investigated by a competent person; record the event in the logbook.',
      'Reset the panel immediately to clear the alarm, then walk the building to check each zone before deciding whether to evacuate.',
      'Wait for the alarm-receiving centre to confirm a genuine activation before starting any evacuation of the occupants.',
    ],
    correctAnswer: 1,
    explanation:
      'Initiate evacuation per the building\'s fire plan; do not reset the panel until the source has been investigated and confirmed safe (reset by a competent person only, after FRS clearance where FRS attended); cooperate with FRS arrival; record the event in detail in the logbook (time, originating device, evacuation outcome, FRS attendance, cause, damage, reset time and person); and notify the servicer if any equipment needs post-event service. The training must make this sequence routine for staff.',
  },
  {
    id: 6,
    question:
      'A user receives a phone call from someone claiming to be a "manufacturer field engineer" needing remote access to the CIE for an "emergency firmware update". The trained response should be.',
    options: [
      'Grant temporary read-only access so the engineer can diagnose the issue, but withhold the password for write operations.',
      'Ask the caller to email the request from the manufacturer\'s domain, then grant access once the email arrives as confirmation.',
      'Decline the request as it stands, verify with the contracted servicing organisation, and log the call.',
      'Connect the manufacturer\'s supplied USB diagnostic tool to the panel so the firmware update can run locally instead.',
    ],
    correctAnswer: 2,
    explanation:
      'Unscheduled "emergency" remote-access requests from unknown parties are a classic social-engineering attack vector. Per clause 43.4, remote access must be authenticated and risk-assessed; an unverified call does not meet that bar. The user-level cyber-security training should make this red flag obvious: decline, refer the caller to the contracted servicing organisation, and log the call. The user is part of the defence.',
  },
  {
    id: 7,
    question:
      'A well-prepared documentation pack at handover supports the responsible person in which of the following ways?',
    options: [
      'Across the whole life of the system — audit-readiness, engineer continuity, fault investigation, user training and modification planning.',
      'Primarily insurance and warranty claims, by evidencing that the installation met specification at the point of handover.',
      'Mainly the next periodic inspection, giving the inspecting engineer a checklist of devices to test on the six-monthly visit.',
      'Chiefly the legal compliance record, demonstrating to the fire and rescue service that the RRO duty has been discharged.',
    ],
    correctAnswer: 0,
    explanation:
      'The documentation pack is the responsible person\'s tool kit for the whole life of the system: audit-readiness for AHJ and insurer inspections; engineer continuity if the servicer changes (the new engineer reads the drawings and cause-and-effect rather than starting from zero); fault investigation (the cause-and-effect shows what the system was designed to do); training of new designated users; and modification planning, where any change references the existing pack for consistency.',
  },
  {
    id: 8,
    question:
      'Per BS 5839-1:2025, the user investigation of false alarms is recommended. What is the user expected to do, and what should the commissioning / handover organisation provide?',
    options: [
      'The user records the false alarm in the logbook; investigation is solely the maintenance organisation\'s job at the next service.',
      'The user reports each false alarm to the fire and rescue service, who then determine the cause and advise on remedial action.',
      'The user investigates every false alarm (clause 29.6) and the commissioning organisation advises, at handover, on how.',
      'No user action is needed unless the false-alarm rate exceeds the benchmark, at which point the system is re-categorised.',
    ],
    correctAnswer: 2,
    explanation:
      'Clause 29.6 recommends the user / responsible person arrange suitable investigation and, where appropriate, action on every occasion a false alarm occurs. The commissioning / handover organisation is recommended to advise the user on how — in practice through the handover training pack. The note to clause 29.6 gives examples: managerial changes within the building, modifications to the system, or further investigation by the maintenance organisation.',
  },
  {
    id: 9,
    question:
      'The acceptance certificate carries the agreement of multiple parties. Who typically signs?',
    options: [
      'The commissioning engineer and the responsible person — and the designer too where they are a different organisation from the commissioner.',
      'The installing electrician and the building\'s fire risk assessor, who jointly certify that detection coverage matches the assessment.',
      'The manufacturer\'s technical representative and the alarm-receiving centre, confirming the panel and signalling path are interoperable.',
      'The responsible person alone, since acceptance is fundamentally the client\'s decision to take ownership of the installed system.',
    ],
    correctAnswer: 0,
    explanation:
      'The commissioning engineer (competent person under clause 3.13) signs as originator of the certification statement; the responsible person (or their authorised representative) signs to acknowledge receipt and acceptance. The signatures together establish the system as accepted and operational, and some scheme templates also require the designer to countersign where the designer and commissioner are different organisations.',
  },
  {
    id: 10,
    question:
      'A care home changes its designated weekly-test user (the original user has retired). What handover-training-related action should be taken?',
    options: [
      'Have the new user shadow a trained colleague for a few weekly tests; no formal record is needed once they are confident.',
      'Provide structured training to the new user matching the original handover content, then record and sign it in the logbook.',
      'Pause the weekly user test until the next six-monthly service visit, when the servicing engineer can train the replacement.',
      'Hand the new user the test key and the logbook; the printed weekly-test instructions inside the logbook are sufficient briefing.',
    ],
    correctAnswer: 1,
    explanation:
      'A change of designated user triggers fresh training covering the same content as the original handover (weekly test, alarm response, fault response, false-alarm categorisation, documentation, cyber-security basics). The logbook is updated with the training record (date, trainer, trainee), the new user signs to acknowledge, and the responsible person updates the responsibility register. This continuity maintains test discipline across staff changes.',
  },
];

const FireAlarmModule6Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Handover and client training | Fire Alarm Module 6.6 | Elec-Mate',
    description:
      'BS 5839-1:2025 handover and client training — the responsible person under RRO 2005, structured handover training (weekly test, alarm response, fault response, false-alarm categorisation), the documentation pack including the new clause 47 cause-and-effect requirement, periodic re-training, and user-level cyber-security training under clause 43.4.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6"
            title="Handover and client training"
            description="Handover is where the system passes from the commissioning organisation to the responsible person under RRO 2005 — and where the practical conditions for ongoing safe operation are set. BS 5839-1:2025 reinforces the handover obligation with new explicit content (the cause-and-effect document under clause 47, the user-level false-alarm training, the cyber-security expectations under clause 43.4) and places the duty firmly on the commissioning / handover organisation to deliver structured training, comprehensive documentation, and ongoing support."
            tone="yellow"
          />

          <TLDR
            points={[
              'Responsible person under RRO 2005 Article 3 owns the duty to maintain fire safety provisions; BS 5839-1:2025 is the practical implementation. Delegation of execution does not transfer the duty.',
              'Handover training (structured session, recorded, signed) covers: weekly user test, real-alarm response, fault response (no concealment per clause 23), false-alarm categorisation (NEW 2025 explicit), documentation, cyber-security basics.',
              'Documentation pack: acceptance certificate (Annex G), as-installed drawings, zone plan, cause-and-effect document (NEW 2025 explicit per clause 47), O&M manuals, asset register, logbook template (Annex H), training records, ARC details, cyber-security guidance, contacts.',
              'Cause-and-effect document NEW 2025 — could be a simple statement ("simultaneous evacuation") or a complex matrix; format flexible, production mandatory.',
              'Periodic re-training of the designated weekly-test user — triggered by user change, system modification, or planned cycle. Records updated; logbook signed.',
              'False-alarm investigation by user (clause 29.6) recommended; commissioning organisation advises user on how at handover.',
              'User-level cyber-security training: do not connect untrusted devices, do not share credentials, physical access control, refuse unscheduled "emergency" remote access requests, report suspected attacks.',
              "Engineer continuity if servicing organisation changes — the documentation pack is the new servicer's starting point; without it, the new servicer is starting from zero.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the responsible person under RRO 2005 Article 3 and apply the maintenance duty under Article 17 through the BS 5839-1:2025 testing regime',
              'Deliver structured handover training covering weekly test, real-alarm response, fault response, false-alarm categorisation, documentation, and cyber-security basics',
              'Produce a comprehensive documentation pack including the new BS 5839-1:2025 clause 47 cause-and-effect requirement (matrix or text description)',
              'Apply BS 5839-1:2025 clause 29.6 — user investigation of false alarms with commissioning-organisation guidance on how',
              'Manage periodic re-training of designated users when staff change, system is modified, or as planned cycle',
              'Apply BS 5839-1:2025 clause 43.4 user-level cyber-security training: untrusted devices, credentials, physical access, recognising social-engineering attempts',
              'Evidence handover training in the logbook with date, content covered, trainer, trainee, and signed acknowledgement',
              "Use the documentation pack as the foundation for engineer continuity, audit-readiness, fault investigation, and modification planning over the system's life",
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The responsible person — RRO 2005 Article 3</ContentEyebrow>

          <ConceptBlock
            title="Who, and what duty"
            plainEnglish="The Regulatory Reform (Fire Safety) Order 2005 (RRO 2005) defines the responsible person in Article 3. In most workplaces this is the employer for workplace areas; for non-workplace non-domestic premises it is the person with control of the premises in connection with carrying on a trade / business / undertaking, or the owner. The duty in Article 17 is to ensure the premises and any facilities, equipment and devices are subject to a suitable system of maintenance and are maintained in an efficient state, in efficient working order and in good repair. BS 5839-1:2025 is the practical answer to that duty for the fire alarm system."
            onSite="The responsible person owns the duty even if they delegate the execution. Identifying who that person is — by name, by role — is the foundation of every handover. The acceptance certificate names them; the logbook front-section names them; subsequent service contracts name them."
          >
            <p>
              The responsible person\'s relationship to the various BS 5839-1:2025 testing tiers:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Weekly user test.</strong> The duty is the responsible person\'s. Execution
                is typically delegated to a designated person on site (a member of premises
                management, a trained occupier). The responsible person\'s accountability is to
                ensure the test happens, the records are kept, and faults are followed up.
              </li>
              <li>
                <strong>Monthly auxiliary supply test.</strong> The duty sits with premises
                management as part of the wider building\'s standby supply regime. The responsible
                person ensures the regime exists.
              </li>
              <li>
                <strong>Six-monthly inspection and service.</strong> The responsible person
                contracts a competent person (a third-party-certificated organisation) to perform
                the work. The contract documents responsibilities including reporting, logbook
                updates, and emergency-response SLAs.
              </li>
              <li>
                <strong>Modifications and extensions.</strong> The responsible person commissions
                the work, signs the certificates, ensures the documentation pack is updated.
              </li>
              <li>
                <strong>Incident response.</strong> Real alarms initiate evacuation per the fire
                plan; the responsible person ensures the plan is current and staff are trained.
              </li>
            </ul>
            <p>
              The handover training is where the responsible person (or their named representative)
              is briefed on all of the above. It is the moment the system\'s technical complexity is
              translated into operational practice for the people who will live with the system day
              to day.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 3 (Responsible person) and Article 17 (Maintenance)"
            clause={
              <>
                Article 3: "responsible person" means — in relation to a workplace, the employer, if
                the workplace is to any extent under his control; in relation to any premises not
                falling within the above, the person who has control of the premises in connection
                with the carrying on by him of a trade, business or other undertaking (for profit or
                not), or the owner. Article 17: where necessary in order to safeguard the safety of
                relevant persons the responsible person must ensure that the premises and any
                facilities, equipment and devices provided in respect of the premises … are subject
                to a suitable system of maintenance and are maintained in an efficient state, in
                efficient working order and in good repair.
              </>
            }
            meaning="Article 3 names who; Article 17 names what duty. The fire alarm system is one of the 'facilities, equipment and devices' covered. BS 5839-1:2025 is the recognised method of meeting the maintenance duty for the fire alarm. Failure to maintain in efficient working order is a regulatory breach with potentially serious consequences."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The handover training session</ContentEyebrow>

          <ConceptBlock
            title="What good handover training looks like"
            plainEnglish="Handover training is a structured session run by the commissioning / handover organisation for the responsible person and any designated representatives. It is not a casual conversation at the end of installation; it is a formal session with an agenda, training material, opportunity for questions, and recorded acknowledgement. The session is the bridge between technical delivery (the system is installed and commissioned) and operational reality (the system is being safely operated by the people who run the building)."
          >
            <p>Recommended training agenda:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>System overview.</strong> Walk the responsible person through the system —
                CIE location, zone layout, detector locations, sounder / VAD locations, MCP
                locations, ARC connection (if applicable). The zone plan is the map.
              </li>
              <li>
                <strong>Weekly user test procedure.</strong> Demonstrate the test on the day of
                handover. Operate an MCP, observe the panel response, observe the sounders / VADs,
                observe the ARC test transmission, reset, log. Hand over the test key. Have the
                designated user perform the test under supervision.
              </li>
              <li>
                <strong>Real-alarm response.</strong> What happens when the system goes into alarm —
                evacuation per the fire plan, FRS interaction, reset only by a competent person
                after investigation. Brief on the cause-and-effect (what the system does in
                different alarm scenarios — partial evacuation, simultaneous evacuation, lift
                homing, AOV release).
              </li>
              <li>
                <strong>Fault response.</strong> What happens when the panel shows a fault — do not
                silence (clause 23), log the fault, contact the servicing organisation, institute
                interim measure if the fault affects detection / alarm in a significant area.
              </li>
              <li>
                <strong>False-alarm categorisation</strong> (NEW 2025 explicit). Train the user on
                the four categories (unwanted from cooking / dust / steam / environmental; equipment
                fault; malicious; system fault). Provide guidance on assigning category at the time
                of the event. Cover the user investigation expectation under clause 29.6.
              </li>
              <li>
                <strong>Documentation walkthrough.</strong> Show every document in the pack —
                acceptance certificate, as-installed drawings, zone plan, cause-and-effect, O&M
                manuals, asset register, logbook, training records, ARC details. Explain where each
                lives, who has access, retention expectations.
              </li>
              <li>
                <strong>Cyber-security basics.</strong> User-level guidance on physical access to
                the CIE / comms cabinet, recognising unauthorised remote-access requests,
                credentials discipline, untrusted-device avoidance.
              </li>
              <li>
                <strong>Servicing contract.</strong> Brief on the six-monthly service cycle, the
                next planned visit window, emergency contact details, emergency-response SLA.
              </li>
              <li>
                <strong>Q&A and acknowledgement.</strong> Open questions; the responsible person
                signs the logbook to acknowledge the training and the date.
              </li>
            </ol>
            <p>
              The session takes typically 60-90 minutes for a small system, longer for complex
              systems. It is recorded in the logbook and a written summary (training-completed
              checklist) is left with the responsible person. The training is the moment that
              transforms the responsible person from a passive recipient of the system into an
              active operator with the knowledge and authority to manage it.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          {/* Diagram — client training session structure */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Handover training session — agenda + outputs
            </h4>
            <svg
              viewBox="0 0 880 580"
              className="w-full h-auto"
              role="img"
              aria-label="Handover training session structure. Nine agenda items down the left with description and timing. Documentation pack and trained-user outputs on the right."
            >
              <rect
                x="20"
                y="20"
                width="840"
                height="36"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="440"
                y="44"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                Handover training session — BS 5839-1:2025
              </text>

              {[
                {
                  n: '1',
                  t: 'System overview + walk',
                  d: 'CIE location · zone layout · device locations · ARC',
                  c: '#22D3EE',
                  m: '10 min',
                },
                {
                  n: '2',
                  t: 'Weekly user test demo',
                  d: 'Demonstrate · user performs under supervision · hand over key',
                  c: '#22D3EE',
                  m: '10 min',
                },
                {
                  n: '3',
                  t: 'Real-alarm response',
                  d: 'Evacuation · FRS · reset only by competent person',
                  c: '#A855F7',
                  m: '8 min',
                },
                {
                  n: '4',
                  t: 'Fault response (clause 23)',
                  d: 'No concealment · log · contact servicer · interim measure',
                  c: '#A855F7',
                  m: '8 min',
                },
                {
                  n: '5',
                  t: 'False-alarm categorisation',
                  d: '4 categories · clause 29.6 user investigation · NEW 2025 explicit',
                  c: '#FBBF24',
                  m: '10 min',
                },
                {
                  n: '6',
                  t: 'Documentation walkthrough',
                  d: 'Cert · drawings · zone plan · C&E · O&M · asset · logbook',
                  c: '#FBBF24',
                  m: '10 min',
                },
                {
                  n: '7',
                  t: 'Cyber-security basics (43.4)',
                  d: 'Untrusted devices · credentials · physical access · social-eng',
                  c: '#EF4444',
                  m: '8 min',
                },
                {
                  n: '8',
                  t: 'Servicing contract briefing',
                  d: 'Six-monthly cycle · next visit · emergency SLA · contacts',
                  c: '#EF4444',
                  m: '5 min',
                },
                {
                  n: '9',
                  t: 'Q&A + acknowledgement',
                  d: 'Questions · sign logbook · receive doc pack',
                  c: '#EF4444',
                  m: '15 min',
                },
              ].map((s, i) => {
                const y = 80 + i * 50;
                return (
                  <g key={s.n}>
                    <circle
                      cx="60"
                      cy={y + 16}
                      r="16"
                      fill={s.c}
                      opacity="0.18"
                      stroke={s.c}
                      strokeWidth="1.4"
                    />
                    <text
                      x="60"
                      y={y + 21}
                      textAnchor="middle"
                      fill={s.c}
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {s.n}
                    </text>
                    <rect
                      x="88"
                      y={y}
                      width="500"
                      height="34"
                      rx="8"
                      fill="rgba(255,255,255,0.04)"
                      stroke={s.c}
                      strokeWidth="1.1"
                    />
                    <text x="100" y={y + 14} fill={s.c} fontSize="11" fontWeight="bold">
                      {s.t}
                    </text>
                    <text x="100" y={y + 27} fill="rgba(255,255,255,0.7)" fontSize="9.5">
                      {s.d}
                    </text>
                    <rect
                      x="600"
                      y={y + 5}
                      width="48"
                      height="22"
                      rx="11"
                      fill="rgba(251,191,36,0.1)"
                      stroke="#FBBF24"
                      strokeWidth="0.8"
                    />
                    <text
                      x="624"
                      y={y + 19}
                      textAnchor="middle"
                      fill="#FBBF24"
                      fontSize="9.5"
                      fontWeight="bold"
                    >
                      {s.m}
                    </text>
                  </g>
                );
              })}

              {/* Outputs panel */}
              <rect
                x="666"
                y="80"
                width="180"
                height="450"
                rx="10"
                fill="rgba(168,85,247,0.04)"
                stroke="#A855F7"
                strokeWidth="1.4"
                strokeDasharray="4,2"
              />
              <text
                x="756"
                y="100"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                OUTPUTS
              </text>

              {[
                'Acceptance cert (Annex G)',
                'As-installed drawings',
                'Zone plan',
                'Cause-and-effect (NEW 2025)',
                'O&M manuals',
                'Asset register',
                'Logbook (Annex H)',
                'Training records',
                'ARC details',
                'Cyber guidance',
                'Servicer contacts',
                'Trained user',
                'Signed logbook entry',
              ].map((o, i) => {
                const y = 118 + i * 30;
                return (
                  <g key={o}>
                    <rect
                      x="680"
                      y={y}
                      width="152"
                      height="22"
                      rx="6"
                      fill="rgba(168,85,247,0.06)"
                      stroke="#A855F7"
                      strokeWidth="0.7"
                    />
                    <text
                      x="756"
                      y={y + 14}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.8)"
                      fontSize="9"
                    >
                      {o}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>
            The documentation pack — clause 47 + the new cause-and-effect requirement
          </ContentEyebrow>

          <ConceptBlock
            title="What goes in the pack"
            plainEnglish="The documentation pack is the responsible person\'s tool kit for the system\'s entire life. It must be comprehensive, up to date, and accessible. BS 5839-1:2025 clause 47 spells out the documentation expectations including a new explicit requirement for a cause-and-effect document. The 2025 wording is permissive on format — the cause-and-effect can be as simple as a one-line statement ('this system operates as simultaneous evacuation') or as comprehensive as a multi-page matrix document, depending on system complexity. What matters is that the document exists and is included."
          >
            <p>The pack contents:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Acceptance certificate (Annex G).</strong> The handover document. Signed by
                commissioning engineer and responsible person. Carries the system baseline, the
                agreed variations, the acceptance date.
              </li>
              <li>
                <strong>As-installed drawings.</strong> Updated drawings showing every device
                location, every cable route, every zone, every interface. The drawings reflect the
                as-built system, not the as-designed.
              </li>
              <li>
                <strong>Zone plan</strong> (per clause 22.2.5). Required unconditionally in
                multi-zone sleeping premises (clause 6 declares its absence unacceptable — Section
                6.5). Recommended in all systems. Posted at the CIE for FRS attendance.
              </li>
              <li>
                <strong>Cause-and-effect document</strong> (NEW 2025 explicit per clause 47).
                Describes the programmed behaviour of the system in response to events. Format
                appropriate to system complexity.
              </li>
              <li>
                <strong>O&M manuals.</strong> CIE manufacturer manual; manuals for each device type
                (detectors, MCPs, sounders, VADs, interfaces); ARC connection documentation.
              </li>
              <li>
                <strong>Asset register.</strong> Every device row populated — type, location,
                addressable address, install date, last test date, last contamination level,
                replacement-due date, open defect status (Section 6.4).
              </li>
              <li>
                <strong>Logbook (Annex H template).</strong> Pre-populated with system
                identification, ready for ongoing entries.
              </li>
              <li>
                <strong>Training records.</strong> Initial handover training; any subsequent
                re-training; designated weekly-test users with sign-off.
              </li>
              <li>
                <strong>ARC details.</strong> Account number, panel ID, signal types transmitted,
                ARC contact details, escalation procedures.
              </li>
              <li>
                <strong>Cyber-security guidance</strong> (per clause 43.4). Manufacturer guidance on
                physical access, authentication, remote services. User-facing portion appropriate to
                a non-technical reader.
              </li>
              <li>
                <strong>Servicing organisation contacts.</strong> Day contact, out-of-hours contact,
                emergency contact, emergency-response SLA.
              </li>
              <li>
                <strong>Modification history</strong> (built up over time). Every extension or
                modification certificate filed in chronological order.
              </li>
            </ul>
            <p>
              The pack is delivered at handover and updated throughout the system\'s life.
              Modifications and extensions add new documents; the asset register and logbook are
              updated continuously; training records are added when users change. A pack that is ten
              years old and has never been updated is a red flag for both compliance and safety.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 47 (Documentation / handover)"
            clause={
              <>
                A new item that appears within the documentation clause of BS 5839-1:2025 is the
                recommendation that a cause-and-effect matrix or text description of how the cause
                and effect operates is included with the documentation to be provided to the
                purchaser or user of the system. This could be as simple as "this system operates as
                a simultaneous evacuation" or a cause-and-effect matrix document might be required
                for more complex strategies. The standard does not dictate the manner of the
                cause-and-effect matrix only that it needs to be produced. The commissioning
                technician should inform the user that it is important to keep the documentation
                provided up to date and available to interested parties.
              </>
            }
            meaning="Cause-and-effect document = NEW 2025 explicit handover requirement. Format flexible (simple text or complex matrix) but production mandatory. Plus user-briefing duty: the commissioning technician explicitly tells the user to keep documentation current and accessible. Documentation is alive, not static."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cyber-security training for users</ContentEyebrow>

          <ConceptBlock
            title="The user as part of the defence"
            plainEnglish="BS 5839-1:2025 clause 43.4 sets out cyber-security expectations for the system as a whole. Most of those controls are technical and operational — physical access, authentication, risk assessment, post-action verification — but the user has a role too. A user who is trained on basic cyber hygiene is part of the defence; a user who is not trained is a vulnerability. The handover training session is where this is established."
          >
            <p>What the user training should cover:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Untrusted devices.</strong> Do not connect anything to the CIE / gateway
                that has not been provided by the servicing organisation. USB sticks, laptops, "test
                devices" from unverified parties — refuse and report.
              </li>
              <li>
                <strong>Credentials discipline.</strong> Do not share passwords. Do not write them
                on a sticky note next to the panel. If credentials need to be shared with a new
                staff member, use a documented onboarding procedure with the servicing
                organisation\'s knowledge.
              </li>
              <li>
                <strong>Physical access.</strong> Lock the comms cabinet. Restrict access to the
                panel area. Anyone working on the system should be from the contracted servicing
                organisation and should be expected — challenge anyone who is not.
              </li>
              <li>
                <strong>Recognising social-engineering attempts.</strong> An unscheduled call from
                someone claiming to be from the manufacturer, asking for "emergency" remote access,
                is a classic attack. Decline; verify with the contracted servicing organisation; log
                the call. The same applies to emails offering "free firmware updates" or "urgent
                security patches" from unknown parties.
              </li>
              <li>
                <strong>Reporting suspected attacks.</strong> Any suspected unauthorised access,
                strange CIE behaviour, unexpected login attempts visible on the panel — report to
                the servicing organisation immediately. The earlier the report, the better the
                chance of containment.
              </li>
            </ul>
            <p>
              The user training does not need to be technically deep. It needs to be practical and
              behavioural — what to do, what not to do, when to escalate. Five minutes of clear
              behavioural training is more effective than thirty minutes of cryptographic theory.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Periodic re-training and continuity</ContentEyebrow>

          <ConceptBlock
            title="When and why"
            plainEnglish="Handover training is once. Periodic re-training is recurring. The reason: people change, systems change, knowledge fades. A care home that trained its facilities manager in 2024 and has had three changes of facilities manager since 2026 has effectively no trained user unless re-training has been delivered with each change. The responsible person owns the duty to ensure the designated user is trained at all times."
          >
            <p>Re-training triggers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>User change.</strong> The original designated user has left, retired,
                changed role. The replacement needs the same training the original received.
                Schedule a session with the servicing organisation; record in the logbook.
              </li>
              <li>
                <strong>System modification.</strong> The system has been modified — new zones, new
                CIE, new firmware behaviour, new cause-and-effect. The user training content needs
                updating to reflect the new behaviour.
              </li>
              <li>
                <strong>Significant premises change.</strong> The premises has changed use
                (residential to mixed, office to laboratory), occupancy has changed significantly,
                or the fire plan has been updated. Re-training aligns the user with the new
                operational reality.
              </li>
              <li>
                <strong>Planned cycle.</strong> Annual or biennial re-training as a matter of good
                practice. Even without a triggering event, periodic re-training keeps knowledge
                fresh.
              </li>
              <li>
                <strong>Post-incident.</strong> After a real fire, a major false alarm episode, or a
                near-miss, re-training reinforces correct response and updates any lessons learnt.
              </li>
            </ul>
            <p>
              The servicing organisation should offer re-training as part of the contract, either at
              scheduled intervals or in response to triggers. The responsible person should request
              it when triggered. Training records are updated in the logbook with date, content,
              trainer, trainee, and signed acknowledgement.
            </p>
          </ConceptBlock>

          <Scenario
            title="Engineer continuity when a servicing contract changes"
            situation="A 200-bed care home has changed its servicing organisation after fifteen years with the same provider. The new servicer arrives for the first six-monthly visit. The handover from the outgoing servicer was minimal — a brief phone call. The new engineer needs to understand a complex multi-CIE installation with several historical modifications."
            whatToDo="The documentation pack is the new servicer\'s starting point. The new engineer reads (1) the original acceptance certificate to understand the system baseline; (2) the modification certificates to understand what has changed since acceptance; (3) the zone plan to understand the building layout; (4) the cause-and-effect document to understand the programmed behaviour; (5) the asset register to understand the device population; (6) the logbook for recent operational history (faults, false alarms, services); (7) the training records to understand who has been trained on what. Without this pack, the new engineer would be reverse-engineering the system through testing — slower, more expensive, more error-prone, and a source of risk during the transition. The pack is the foundation of engineer continuity. The new servicer\'s first visit takes longer than subsequent visits because the engineer is also building a relationship with the responsible person and confirming that the documentation is accurate; subsequent visits proceed normally. The first service report should explicitly note the change of servicer and the baseline established."
            whyItMatters="Engineer continuity is one of the most consequential practical reasons for a comprehensive documentation pack. Servicing organisations change. Engineers change within organisations. Without documentation, every change is a fresh start; with documentation, every change is a handover. The responsible person\'s investment in maintaining the pack pays back many times over the system\'s life."
          />

          <CommonMistake
            title="Handover that is just a key and a phone number"
            whatHappens="A small office\'s fire alarm is commissioned. The installer hands the receptionist a test key, says 'just operate one of the call points each week and let us know if there\'s a problem', and leaves. No documentation pack. No training record. No cause-and-effect document. No zone plan. Eighteen months later, a new receptionist has joined; the previous receptionist (who never received any structured training) has left and not handed over. A real fire occurs; the receptionist does not know what to do; the evacuation is delayed; the system\'s cause-and-effect is unknown."
            doInstead="Structured handover training for every system, regardless of size. Even a single-zone Category L4 office system warrants a 30-minute training session with the responsible person, a documentation pack including the cause-and-effect (a one-line statement is fine for a simple system), a logbook with system identification populated, and a signed acknowledgement. The marginal cost is small; the long-term value is high. The 2025 standard\'s clause 47 makes this explicit — the cause-and-effect document is now formally required regardless of system complexity."
          />

          <CommonMistake
            title="Documentation pack that is never updated"
            whatHappens="A 2015 commissioning produced a comprehensive documentation pack. Over the following decade, three minor extensions and one CIE firmware update were carried out — all properly certificated at the time but the resulting certificates were filed separately, not added to the pack. By 2025, the documentation pack on site is the original 2015 pack; the extensions and firmware update are 'somewhere'. An insurer audit asks for the current as-installed state and finds the documentation does not reflect reality."
            doInstead="The documentation pack is alive. Every modification, extension, and firmware update produces a certificate — file the certificate in the pack at the time. Update the asset register at the time. Update the as-installed drawings (or at least mark the change clearly). The pack should always reflect the current state of the system. The 2025 standard explicitly directs the commissioning technician to inform the user that the documentation is to be kept up to date — this is part of the handover briefing."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Responsible person under RRO 2005 Article 3 owns the duty; BS 5839-1:2025 implements it. Delegation does not transfer the duty.',
              'Handover training is structured, recorded, signed. Covers test, alarm, fault, false-alarm categorisation, documentation, cyber-security basics.',
              'Documentation pack: acceptance cert, drawings, zone plan, cause-and-effect (NEW 2025), O&M, asset register, logbook, training records, ARC details, cyber guidance, contacts.',
              'Cause-and-effect document NEW 2025 — clause 47 explicit. Format flexible (text or matrix) but production mandatory.',
              'False-alarm investigation by user (clause 29.6) — commissioning organisation advises user on how at handover.',
              'Periodic re-training triggered by user change, system modification, significant premises change, or planned cycle.',
              'User-level cyber-security training: untrusted devices, credentials, physical access, social-engineering recognition, attack reporting.',
              'Documentation pack is alive — updated with every modification, extension, firmware update, training event. The pack is the foundation of engineer continuity.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Who actually performs the weekly user test in a typical small office?',
                answer:
                  'A designated person on site — typically the office manager, a member of facilities, or a long-standing employee who is reliably present. The responsible person (often the employer) names the designated person, ensures they receive the structured handover training, and ensures their name is recorded in the logbook. Backup designated users are sensible — if the primary is on holiday or off sick, the test still happens. Continuity matters: if the designated user changes (resignation, role change), re-training of the replacement is triggered.',
              },
              {
                question:
                  'How detailed should the cause-and-effect document be for a Category L4 office?',
                answer:
                  'For a simple Category L4 system (escape route detection, simultaneous evacuation, no ancillary equipment), a one-paragraph text description is sufficient: "On detection of fire by any detector or operation of any manual call point, the panel enters alarm condition. All sounders / VADs operate immediately to give simultaneous evacuation. There are no ancillary outputs (no lift homing, no AOV, no fire dampers, no door holders). Reset is by competent person only after investigation". For a complex system with multi-stage evacuation, lift homing, AOVs, magnetic door holders, fire dampers, ventilation control, and ARC transmission, a comprehensive matrix document is appropriate. The 2025 standard accommodates both.',
              },
              {
                question:
                  'Does BS 5839-1:2025 require a specific format for the handover training record?',
                answer:
                  'No specific format. The standard requires the training to happen and to be evidenced. A practical training record includes: date, system identification, trainer (name + organisation + accreditation), trainee (name + role), content covered (matched to the recommended agenda), questions asked and answered, signed acknowledgement by trainee, signed by trainer. Many servicing organisations have a one-page training-record form that is completed and filed in the pack with a copy in the logbook.',
              },
              {
                question:
                  'What should I do if the responsible person refuses to engage with the handover training?',
                answer:
                  'The handover training is a recommended part of the BS 5839-1:2025 commissioning process. If the responsible person refuses, document the refusal in writing and brief them on the consequence: the system will not be properly understood by their organisation, the weekly test discipline is unlikely to be maintained, the RRO 2005 duty is at risk. The commissioning organisation should not lower its standards to accommodate refusal — better to document the refusal, complete the handover with the documentation pack, and offer the training as a standalone follow-up. Some scheme certifications (BAFE SP203) require evidence of attempted training; the documented refusal protects the servicing organisation.',
              },
              {
                question: 'How does the false-alarm-categorisation user training work in practice?',
                answer:
                  'The trainer walks the user through the four categories (unwanted from cooking / dust / steam / environmental; equipment fault; malicious; system fault) with examples appropriate to the premises type. The user is given a logbook template that prompts category assignment at the time of every false-alarm entry. Worked examples — "if the kitchen detector activates while toast burns, that is unwanted from cooking; if the panel reports fault on a detector and an alarm follows, that is equipment fault" — make the categories memorable. The 2025 standard\'s explicit user-training requirement is a response to inconsistent assignment in past practice.',
              },
              {
                question:
                  'When and how should I update the documentation pack after a modification?',
                answer:
                  'At the time of the modification. The competent engineer producing the extension or modification certificate also updates: (a) the as-installed drawings to reflect the new state; (b) the asset register to add / change device entries; (c) the cause-and-effect document if the modification changes programmed behaviour; (d) the logbook to record the modification with cross-reference to the certificate; (e) the front section of the documentation pack with a chronological list of all modifications. The pack is left with the responsible person at the visit, not "to be sent later".',
              },
              {
                question:
                  'A care home has multiple wings with different staff teams. How do we handle handover training?',
                answer:
                  "Train the responsible person centrally and the designated weekly-test user(s) — possibly multiple, with rotation across wings. Provide written summaries appropriate to each wing's staff (alarm response, evacuation procedure for that wing). Update training records in the logbook with each individual's name and date. Periodic re-training cycles per wing-team. The responsible person remains the single accountable person; execution is distributed. The cause-and-effect document should specifically name how each wing's alarm and evacuation strategy interacts with the others (partial vs simultaneous evacuation, phased vs immediate).",
              },
              {
                question:
                  'How does the documentation pack support engineer continuity if the servicing organisation changes?',
                answer:
                  "The pack is the new servicer's starting point. They read the acceptance certificate (system baseline), the modification certificates (changes since baseline), the zone plan and as-installed drawings (layout), the cause-and-effect (programmed behaviour), the asset register (device population), and the logbook (recent operational history). Without the pack, the new servicer is reverse-engineering the system through testing — slower, more expensive, error-prone. With the pack, the new servicer can hold a credible briefing with the responsible person at the first visit, confirm the documentation is accurate, and proceed with normal six-monthly servicing from there. The pack is the most valuable single document the responsible person owns.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Handover and client training — Module 6.6" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Module 7</div>
            </button>
          </div>

          <div className="hidden">
            <Users />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule6Section6;
