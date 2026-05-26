/**
 * Module 7 · Section 2 · Subsection 6 — Testing and Compliance
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Periodic testing schedules, documentation requirements, fire risk assessment coordination, and regulatory compliance
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Testing and Compliance - HNC Module 7 Section 2.6';
const DESCRIPTION =
  'Master testing and compliance requirements for emergency systems: periodic testing schedules, BS 5266 and BS 5839 requirements, documentation, fire risk assessment coordination, and Regulatory Reform (Fire Safety) Order compliance.';

const quickCheckQuestions = [
  {
    id: 'bs5266-monthly',
    question:
      'What is the maximum interval for functional testing of emergency luminaires under BS 5266-1?',
    options: [
      'Six-monthly',
      'Monthly',
      'Quarterly',
      'Weekly',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1 requires emergency luminaires to receive a brief functional test at intervals not exceeding one month to verify they illuminate when the normal supply fails.',
  },
  {
    id: 'bs5839-weekly',
    question: 'How often must fire alarm systems be tested by the user under BS 5839-1?',
    options: [
      'Daily',
      'Weekly',
      'Quarterly',
      'Monthly',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1 requires weekly testing of fire alarm systems, with a different manual call point tested each week so that all call points are tested within a 13-week cycle.',
  },
  {
    id: 'rro-responsible',
    question:
      "Under the Regulatory Reform (Fire Safety) Order 2005, who is the 'responsible person'?",
    options: [
      'Knowledge, training, experience, and understanding of hazards',
      'Provides consistent, accurate bends with less physical effort',
      'Minimum current from supply (maximum impedance)',
      'The employer or person in control of the premises',
    ],
    correctIndex: 3,
    explanation:
      "The RRO defines the 'responsible person' as the employer (for workplaces), or the person who has control of the premises, or the owner. They must ensure fire safety measures are maintained.",
  },
  {
    id: 'fra-coordination',
    question: 'How often should a fire risk assessment typically be reviewed?',
    options: [
      'Annually or when significant changes occur',
      'By multiplying likelihood and severity scores',
      'Lower than individual readings due to parallel paths',
      'At design stage (RIBA Stage 3-4)',
    ],
    correctIndex: 0,
    explanation:
      'Fire risk assessments should be reviewed at least annually, or sooner if there are significant changes to the premises, occupancy, work processes, or if the assessment is no longer valid.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under BS 5266-1, what is the duration of the full rated duration test for emergency lighting?',
    options: [
      'Use appropriate sealing gaskets or compounds',
      'The full rated duration (typically 3 hours)',
      'Correct type, rating, and indicator status',
      'Creating a loop in the bus topology',
    ],
    correctAnswer: 1,
    explanation:
      'The annual test must verify the emergency luminaires operate for their full rated duration, which is typically 3 hours for most commercial premises, though some high-risk applications may require longer.',
  },
  {
    id: 2,
    question:
      'How frequently must emergency lighting systems be inspected and tested by a competent person under BS 5266-1?',
    options: [
      'Six-monthly',
      'Monthly',
      'Annually',
      'Quarterly',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1 requires annual inspection and testing by a competent person, including verification of full rated duration, illumination levels, and system integrity.',
  },
  {
    id: 3,
    question:
      'Under BS 5839-1, what is the recommended maximum period between services by a competent person?',
    options: [
      'Quarterly',
      'Monthly',
      'Annually',
      'Six-monthly',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5839-1 recommends fire alarm systems be serviced at intervals not exceeding six months by a competent person, who should inspect, test, and maintain all system components.',
  },
  {
    id: 4,
    question: 'The Regulatory Reform (Fire Safety) Order 2005 applies to:',
    options: [
      'All non-domestic premises and common areas of residential buildings',
      'Promptly, before the modifications are put into use',
      'Recorded in the log book and as-built drawings updated',
      'To ensure test frequencies match risk levels and changes are captured',
    ],
    correctAnswer: 0,
    explanation:
      'The RRO applies to virtually all non-domestic premises in England and Wales, including workplaces, commercial premises, and the common areas of blocks of flats and HMOs.',
  },
  {
    id: 5,
    question: 'What documentation must be maintained for emergency lighting under BS 5266-1?',
    options: [
      'Define what each device does when activated and system responses',
      'A log book recording all tests, inspections, and defects',
      'All non-domestic premises and common areas of residential buildings',
      'Recorded in the log book and as-built drawings updated',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1 requires a log book to be maintained recording all tests (daily, monthly, annually), inspections, defects, alterations, and repairs throughout the life of the installation.',
  },
  {
    id: 6,
    question: 'During the weekly fire alarm test, what should be recorded?',
    options: [
      'Recorded in the log book and as-built drawings updated',
      'Promptly, before the modifications are put into use',
      'The call point tested, date, time, and any faults',
      'A log book recording all tests, inspections, and defects',
    ],
    correctAnswer: 2,
    explanation:
      'The log book should record the date and time of each test, which call point was tested, the name of the person conducting the test, and any faults or false alarms.',
  },
  {
    id: 7,
    question: 'What is an automatic test system (ATS) for emergency lighting?',
    options: [
      'A log book recording all tests, inspections, and defects',
      'Recorded in the log book and as-built drawings updated',
      'All non-domestic premises and common areas of residential buildings',
      'A system that automatically tests and records emergency luminaire function',
    ],
    correctAnswer: 3,
    explanation:
      'An ATS automatically initiates and monitors tests of emergency luminaires at programmed intervals, records results, and reports failures, reducing manual testing requirements while ensuring compliance.',
  },
  {
    id: 8,
    question: 'Under the RRO, failure to comply with fire safety requirements can result in:',
    options: [
      'Enforcement notices, prohibition notices, or prosecution',
      'Recorded in the log book and as-built drawings updated',
      'Define what each device does when activated and system responses',
      'A log book recording all tests, inspections, and defects',
    ],
    correctAnswer: 0,
    explanation:
      'The fire authority can issue enforcement notices requiring improvements, prohibition notices preventing use of premises, or prosecute responsible persons. Serious breaches can result in unlimited fines or imprisonment.',
  },
  {
    id: 9,
    question: 'How should fire alarm system alterations be documented?',
    options: [
      'Only verbally communicated to the building manager',
      'Recorded in the log book and as-built drawings updated',
      'No documentation required for minor changes',
      'Only reported to the fire brigade',
    ],
    correctAnswer: 1,
    explanation:
      "All alterations must be recorded in the log book, as-built drawings updated, and the fire risk assessment reviewed to ensure changes don't compromise the system's ability to protect occupants.",
  },
  {
    id: 10,
    question: 'What is the purpose of coordinating testing schedules with fire risk assessments?',
    options: [
      'Promptly, before the modifications are put into use',
      'Define what each device does when activated and system responses',
      'To ensure test frequencies match risk levels and changes are captured',
      'All non-domestic premises and common areas of residential buildings',
    ],
    correctAnswer: 2,
    explanation:
      'Coordination ensures testing frequencies are appropriate for the risk level, that any changes identified in the FRA trigger appropriate testing, and that test results inform FRA reviews.',
  },
  {
    id: 11,
    question: 'BS 5839-1 requires cause and effect documentation to:',
    options: [
      'To ensure test frequencies match risk levels and changes are captured',
      'All non-domestic premises and common areas of residential buildings',
      'Recorded in the log book and as-built drawings updated',
      'Define what each device does when activated and system responses',
    ],
    correctAnswer: 3,
    explanation:
      'Cause and effect documentation specifies how the system responds to each trigger - which zones activate, what outputs operate (sounders, door releases, lifts), and any time delays or staged responses.',
  },
  {
    id: 12,
    question:
      'When must a fire risk assessment be updated following emergency system modifications?',
    options: [
      'Promptly, before the modifications are put into use',
      'Recorded in the log book and as-built drawings updated',
      'Enforcement notices, prohibition notices, or prosecution',
      'A log book recording all tests, inspections, and defects',
    ],
    correctAnswer: 0,
    explanation:
      "The FRA should be reviewed and updated before modified systems are put into use to ensure the changes don't introduce new risks and that the overall fire safety strategy remains valid.",
  },
];

const faqs = [
  {
    question: 'What happens if emergency lighting fails the annual duration test?',
    answer:
      'Failed luminaires must be repaired or replaced promptly and the failure recorded in the log book. If multiple units fail, the system may not provide adequate emergency illumination, potentially requiring temporary measures or restricted building use until repairs are completed. The cause of failure should be investigated - common causes include battery degradation, driver failure, or incorrect charging.',
  },
  {
    question: 'Can weekly fire alarm tests be carried out by building staff?',
    answer:
      'Yes, weekly tests can be carried out by trained building staff who understand the system operation and testing procedure. They must know how to put the system into test mode, conduct the test safely, restore normal operation, and record results. However, the six-monthly servicing must be carried out by a competent fire alarm engineer.',
  },
  {
    question: 'How does the fire risk assessment relate to emergency system specifications?',
    answer:
      'The fire risk assessment identifies the level of risk in a building, which directly informs the required system categories. For example, a higher-risk premises may require a Category L1 fire alarm system (full coverage) rather than L3 (escape routes only). The FRA should be consulted when specifying systems and updated when systems change.',
  },
  {
    question: 'What competencies are required for periodic testing of emergency systems?',
    answer:
      'For routine testing (weekly/monthly), building staff require adequate training in test procedures and system operation. For annual inspections and servicing, personnel should be competent in the relevant standards (BS 5266, BS 5839), understand electrical safety requirements, and have appropriate qualifications such as those from ECA, BAFE, or manufacturer training.',
  },
  {
    question:
      'Are there different testing requirements for maintained versus non-maintained emergency lighting?',
    answer:
      'The testing schedule is the same, but the test procedure differs. For non-maintained luminaires, the test verifies operation when mains supply fails. For maintained luminaires, the test must verify both continuous operation on mains and emergency operation on battery. Sustained (combined) luminaires require testing of both maintained and non-maintained lamps.',
  },
  {
    question: 'How long must test records be retained?',
    answer:
      'Log books and test records should be retained for the life of the installation as they demonstrate compliance history. In practice, a minimum of 3-5 years of records should be readily available. Records may be required as evidence following incidents, during fire authority inspections, or for insurance purposes.',
  },
];

const HNCModule7Section2_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2 · Subsection 6"
            title="Testing and Compliance"
            description="Periodic testing schedules, documentation requirements, fire risk assessment coordination, and regulatory compliance"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Apply BS 5266-1 testing schedules for emergency lighting systems",
              "Implement BS 5839-1 testing and maintenance requirements for fire alarms",
              "Maintain compliant documentation and log books for emergency systems",
              "Coordinate testing programmes with fire risk assessments",
              "Understand duties under the Regulatory Reform (Fire Safety) Order 2005",
              "Specify competency requirements for testing personnel",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Emergency Lighting Testing (BS 5266)">
            <p>BS 5266-1 specifies mandatory testing schedules to ensure emergency lighting systems remain functional throughout their installed life. These tests verify that luminaires will illuminate escape routes when the normal supply fails.</p>
            <p><strong>Testing Schedule Summary</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Daily visual check:</strong> Every occupied day — Brief observation — Building staff</li>
              <li><strong>Monthly functional test:</strong> Not exceeding 1 month — Brief (sufficient to verify operation) — Trained staff</li>
              <li><strong>Annual duration test:</strong> Not exceeding 12 months — Full rated duration (typically 3 hours) — Competent person</li>
            </ul>
            <p><strong>Monthly functional test procedure:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simulate mains failure at each final circuit or use test facility</li>
              <li>Verify each luminaire illuminates within 5 seconds</li>
              <li>Check indicator lamps showing charging status</li>
              <li>Restore supply before batteries become fully discharged</li>
              <li>Record results and any defects in the log book</li>
            </ul>
            <p><strong>Annual duration test procedure:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conduct at low-occupancy period (night or weekend)</li>
              <li>Disconnect normal supply to initiate emergency mode</li>
              <li>Monitor luminaires throughout rated duration</li>
              <li>Measure illumination levels at end of test period</li>
              <li>Allow 24 hours recharge before next test or after genuine emergency</li>
            </ul>
            <p><strong>Automatic test systems:</strong> Where ATS is installed, it can replace manual monthly tests but annual verification by a competent person remains mandatory.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Fire Alarm Testing (BS 5839)">
            <p>BS 5839-1 establishes comprehensive testing and maintenance requirements for fire detection and alarm systems. Regular testing ensures systems will detect fires and alert occupants when required.</p>
            <p><strong>Testing and Servicing Schedule</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Weekly test:</strong> Not exceeding 7 days — User (trained staff)</li>
              <li><strong>Monthly checks:</strong> Monthly — User (trained staff)</li>
              <li><strong>Quarterly inspection:</strong> Not exceeding 3 months — Competent person</li>
              <li><strong>Six-monthly service:</strong> Not exceeding 6 months — Competent person</li>
              <li><strong>Annual inspection:</strong> Not exceeding 12 months — Competent person</li>
            </ul>
            <p><strong>Weekly Test Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Test different call point each week</li>
              <li>Complete all call points in 13 weeks</li>
              <li>Verify sounders operate in test zone</li>
              <li>Check panel indicates alarm correctly</li>
              <li>Record results in log book</li>
            </ul>
            <p><strong>Six-Monthly Service Includes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Test all detectors using suitable test equipment</li>
              <li>Check standby battery condition</li>
              <li>Verify all connections are secure</li>
              <li>Check cause and effect operation</li>
              <li>Issue service report</li>
            </ul>
            <p><strong>Detector Testing Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Smoke detectors:</strong> Use approved aerosol smoke simulant or functional test equipment</li>
              <li><strong>Heat detectors:</strong> Apply controlled heat source within response parameters</li>
              <li><strong>Beam detectors:</strong> Use test card or functional test mode</li>
              <li><strong>Aspirating systems:</strong> Introduce test smoke at sampling points</li>
            </ul>
            <p><strong>False alarm management:</strong> Test procedures must minimise false alarms - always notify the alarm receiving centre and building occupants before testing.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Documentation Requirements">
            <p>Comprehensive documentation demonstrates compliance, supports maintenance planning, and provides essential evidence following incidents. Both BS 5266 and BS 5839 mandate specific documentation throughout the system lifecycle.</p>
            <p><strong>Emergency Lighting Documentation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Installation certificate:</strong> Compliance statement, system details, designer sign-off — Life of installation</li>
              <li><strong>As-installed drawings:</strong> Luminaire locations, circuit details, device types — Life of installation</li>
              <li><strong>Log book:</strong> All tests, defects, repairs, alterations — Ongoing (min 3 years available)</li>
              <li><strong>Photometric evidence:</strong> Design calculations, illumination levels achieved — Life of installation</li>
            </ul>
            <p><strong>Fire Alarm Documentation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design certificate:</strong> System category, coverage, standards compliance — Life of installation</li>
              <li><strong>Installation certificate:</strong> Compliance with design, workmanship standards — Life of installation</li>
              <li><strong>Commissioning certificate:</strong> Test results, cause and effect verification — Life of installation</li>
              <li><strong>Cause and effect matrix:</strong> System responses to each trigger condition — Life of installation</li>
              <li><strong>Log book:</strong> Tests, false alarms, faults, maintenance, alterations — Ongoing (min 3 years available)</li>
            </ul>
            <p><strong>Log Book Best Practice</strong></p>
            <p>The log book should be:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Kept at or near the main control panel</li>
              <li>Accessible to maintenance personnel and inspectors</li>
              <li>Completed in ink (not pencil) for permanence</li>
              <li>Signed by the person conducting each test</li>
              <li>Reviewed regularly by the responsible person</li>
            </ul>
            <p><strong>Digital log books:</strong> Electronic recording systems are acceptable provided they maintain audit trails, prevent unauthorised modification, and can be printed on demand.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Regulatory Compliance and FRA Coordination">
            <p>The Regulatory Reform (Fire Safety) Order 2005 provides the legal framework for fire safety in non-domestic premises. Understanding its requirements and coordinating emergency system testing with fire risk assessments is essential for compliance.</p>
            <p><strong>Key RRO 2005 Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fire risk assessment:</strong> Must be carried out and kept under review</li>
              <li><strong>Fire safety measures:</strong> Must be implemented and maintained</li>
              <li><strong>Emergency routes and exits:</strong> Must be kept clear and functional</li>
              <li><strong>Detection and warning:</strong> Systems must be installed and maintained</li>
              <li><strong>Emergency lighting:</strong> Required where people could be trapped</li>
              <li><strong>Maintenance:</strong> All fire safety equipment must be kept in efficient working order</li>
            </ul>
            <p><strong>Responsible Person Duties</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conduct fire risk assessment</li>
              <li>Implement preventive measures</li>
              <li>Provide fire safety information</li>
              <li>Ensure staff training</li>
              <li>Maintain fire safety equipment</li>
            </ul>
            <p><strong>Enforcement Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Informal advice:</strong> Recommendations for improvement</li>
              <li><strong>Enforcement notice:</strong> Requires action within timeframe</li>
              <li><strong>Prohibition notice:</strong> Prevents use of premises</li>
              <li><strong>Prosecution:</strong> Unlimited fines, imprisonment</li>
            </ul>
            <p><strong>FRA and Testing Coordination</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Higher risk identified:</strong> May require more frequent testing — Review and enhance test schedule</li>
              <li><strong>Building layout changed:</strong> Verify system coverage remains adequate — Full system test and re-certification</li>
              <li><strong>Occupancy type changed:</strong> System category may need upgrading — Design review and modification</li>
              <li><strong>Test failures recorded:</strong> FRA should reflect system reliability issues — Repair and update FRA</li>
            </ul>
            <p><strong>Critical Compliance Point</strong></p>
            <p>The fire risk assessment must be reviewed whenever there is reason to suspect it is no longer valid, or there has been a significant change to the premises. Emergency system modifications, test failures, or changes in testing arrangements are all triggers for FRA review.</p>
            <p><strong>PAS 79-1:2020:</strong> Provides guidance on fire risk assessment methodology and should be followed when conducting or reviewing assessments for non-residential premises.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Annual Testing Schedule for Office Building</strong>
            </p>
            <p><strong>Scenario:</strong> Develop an annual testing schedule for a 4-storey office building with emergency lighting and Category L3 fire alarm system.</p>
            <p>Emergency Lighting (BS 5266-1):</p>
            <p>Daily: Visual check of indicator lamps</p>
            <p>Monthly: Functional test (simulate mains failure)</p>
            <p>Annually: Full 3-hour duration test (January - low occupancy)</p>
            <p>Fire Alarm (BS 5839-1):</p>
            <p>Weekly: Different call point each Monday at 10:00</p>
            <p>Monthly: Check panel indicators, battery voltages</p>
            <p>Six-monthly: Full service (June and December)</p>
            <p>Annually: Comprehensive inspection (December service)</p>
            <p>Log book entries required for all activities</p>
            <p>
              <strong>Example 2: Responding to Failed Duration Test</strong>
            </p>
            <p><strong>Scenario:</strong> During the annual duration test, 8 of 45 emergency luminaires fail before reaching the 3-hour duration.</p>
            <p>Immediate actions:</p>
            <p>1. Record all failures in log book with locations</p>
            <p>2. Assess if affected areas have adequate coverage</p>
            <p>3. Implement temporary measures if required</p>
            <p>Investigation:</p>
            <p>- Check battery age (typically 4-year life)</p>
            <p>- Verify charging circuits functioning</p>
            <p>- Assess if failures indicate batch problem</p>
            <p>Rectification:</p>
            <p>- Replace failed batteries or luminaires</p>
            <p>- Re-test replaced units</p>
            <p>- Update FRA if system reliability is concern</p>
            <p>Document all actions and notify responsible person</p>
            <p>
              <strong>Example 3: FRA Review Following System Modification</strong>
            </p>
            <p><strong>Scenario:</strong> A new server room has been added to a commercial building, requiring fire alarm system extension.</p>
            <p>System changes:</p>
            <p>- Additional aspirating detection system installed</p>
            <p>- Gas suppression system integrated</p>
            <p>- Cause and effect matrix updated</p>
            <p>FRA review considerations:</p>
            <p>- New fire risk from electrical equipment</p>
            <p>- Detection coverage for server room</p>
            <p>- Emergency procedures for gas discharge</p>
            <p>- Staff training requirements</p>
            <p>Documentation updates:</p>
            <p>- As-installed drawings revised</p>
            <p>- Cause and effect documentation updated</p>
            <p>- FRA updated with new risks and controls</p>
            <p>- Log book notes system extension</p>
            <p>Full commissioning test before system goes live</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Testing Schedule Quick Reference:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Emergency lighting monthly:</strong> Brief functional test, record in log book</li>
              <li><strong>Emergency lighting annual:</strong> Full rated duration test by competent person</li>
              <li><strong>Fire alarm weekly:</strong> Different call point each week, complete cycle in 13 weeks</li>
              <li><strong>Fire alarm six-monthly:</strong> Full service including all detectors</li>
            </ul>
            <p>
              <strong>Key Compliance Points:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Log books are mandatory and must be maintained throughout system life</li>
              <li>The responsible person under RRO must ensure systems are maintained</li>
              <li>FRA must be reviewed when systems change or tests reveal issues</li>
              <li>Competent persons must conduct annual and six-monthly inspections</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Missing log book entries:</strong> Every test must be recorded</li>
                <li><strong>Expired service intervals:</strong> Six-monthly services must not be exceeded</li>
                <li><strong>Unaddressed defects:</strong> Faults must be rectified promptly</li>
                <li><strong>Outdated FRA:</strong> Must be reviewed annually and after changes</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                UPS systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Lighting design calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section2_6;
