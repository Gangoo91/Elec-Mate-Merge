import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Testing and Compliance - HNC Module 7 Section 2.6";
const DESCRIPTION = "Master testing and compliance requirements for emergency systems: periodic testing schedules, BS 5266 and BS 5839 requirements, documentation, fire risk assessment coordination, and Regulatory Reform (Fire Safety) Order compliance.";

const quickCheckQuestions = [
  {
    id: "bs5266-monthly",
    question: "What is the maximum interval for functional testing of emergency luminaires under BS 5266-1?",
    options: ["Weekly", "Monthly", "Quarterly", "Six-monthly"],
    correctIndex: 1,
    explanation: "BS 5266-1 requires emergency luminaires to receive a brief functional test at intervals not exceeding one month to verify they illuminate when the normal supply fails."
  },
  {
    id: "bs5839-weekly",
    question: "How often must fire alarm systems be tested by the user under BS 5839-1?",
    options: ["Daily", "Weekly", "Monthly", "Quarterly"],
    correctIndex: 1,
    explanation: "BS 5839-1 requires weekly testing of fire alarm systems, with a different manual call point tested each week so that all call points are tested within a 13-week cycle."
  },
  {
    id: "rro-responsible",
    question: "Under the Regulatory Reform (Fire Safety) Order 2005, who is the 'responsible person'?",
    options: ["The fire brigade", "The building control officer", "The employer or person in control of the premises", "The insurance company"],
    correctIndex: 2,
    explanation: "The RRO defines the 'responsible person' as the employer (for workplaces), or the person who has control of the premises, or the owner. They must ensure fire safety measures are maintained."
  },
  {
    id: "fra-coordination",
    question: "How often should a fire risk assessment typically be reviewed?",
    options: ["Only when there is a fire", "Every 5 years", "Annually or when significant changes occur", "Only when requested by the fire authority"],
    correctIndex: 2,
    explanation: "Fire risk assessments should be reviewed at least annually, or sooner if there are significant changes to the premises, occupancy, work processes, or if the assessment is no longer valid."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under BS 5266-1, what is the duration of the full rated duration test for emergency lighting?",
    options: [
      "1 hour",
      "2 hours",
      "The full rated duration (typically 3 hours)",
      "30 minutes"
    ],
    correctAnswer: 2,
    explanation: "The annual test must verify the emergency luminaires operate for their full rated duration, which is typically 3 hours for most commercial premises, though some high-risk applications may require longer."
  },
  {
    id: 2,
    question: "How frequently must emergency lighting systems be inspected and tested by a competent person under BS 5266-1?",
    options: ["Monthly", "Quarterly", "Six-monthly", "Annually"],
    correctAnswer: 3,
    explanation: "BS 5266-1 requires annual inspection and testing by a competent person, including verification of full rated duration, illumination levels, and system integrity."
  },
  {
    id: 3,
    question: "Under BS 5839-1, what is the recommended maximum period between services by a competent person?",
    options: ["Monthly", "Quarterly", "Six-monthly", "Annually"],
    correctAnswer: 2,
    explanation: "BS 5839-1 recommends fire alarm systems be serviced at intervals not exceeding six months by a competent person, who should inspect, test, and maintain all system components."
  },
  {
    id: 4,
    question: "The Regulatory Reform (Fire Safety) Order 2005 applies to:",
    options: [
      "Only industrial premises",
      "Only buildings over 18m in height",
      "All non-domestic premises and common areas of residential buildings",
      "Only premises with more than 50 occupants"
    ],
    correctAnswer: 2,
    explanation: "The RRO applies to virtually all non-domestic premises in England and Wales, including workplaces, commercial premises, and the common areas of blocks of flats and HMOs."
  },
  {
    id: 5,
    question: "What documentation must be maintained for emergency lighting under BS 5266-1?",
    options: [
      "Only the original installation certificate",
      "A log book recording all tests, inspections, and defects",
      "Only annual inspection reports",
      "No documentation is required"
    ],
    correctAnswer: 1,
    explanation: "BS 5266-1 requires a log book to be maintained recording all tests (daily, monthly, annually), inspections, defects, alterations, and repairs throughout the life of the installation."
  },
  {
    id: 6,
    question: "During the weekly fire alarm test, what should be recorded?",
    options: [
      "Only that the test was carried out",
      "The call point tested, date, time, and any faults",
      "Only faults found",
      "Nothing - weekly tests don't require documentation"
    ],
    correctAnswer: 1,
    explanation: "The log book should record the date and time of each test, which call point was tested, the name of the person conducting the test, and any faults or false alarms."
  },
  {
    id: 7,
    question: "What is an automatic test system (ATS) for emergency lighting?",
    options: [
      "A system that automatically illuminates during a fire",
      "A system that automatically tests and records emergency luminaire function",
      "A system that tests sprinklers",
      "A system that tests fire alarms"
    ],
    correctAnswer: 1,
    explanation: "An ATS automatically initiates and monitors tests of emergency luminaires at programmed intervals, records results, and reports failures, reducing manual testing requirements while ensuring compliance."
  },
  {
    id: 8,
    question: "Under the RRO, failure to comply with fire safety requirements can result in:",
    options: [
      "A verbal warning only",
      "Enforcement notices, prohibition notices, or prosecution",
      "Only recommendations for improvement",
      "Automatic insurance invalidation"
    ],
    correctAnswer: 1,
    explanation: "The fire authority can issue enforcement notices requiring improvements, prohibition notices preventing use of premises, or prosecute responsible persons. Serious breaches can result in unlimited fines or imprisonment."
  },
  {
    id: 9,
    question: "How should fire alarm system alterations be documented?",
    options: [
      "Only verbally communicated to the building manager",
      "Recorded in the log book and as-built drawings updated",
      "No documentation required for minor changes",
      "Only reported to the fire brigade"
    ],
    correctAnswer: 1,
    explanation: "All alterations must be recorded in the log book, as-built drawings updated, and the fire risk assessment reviewed to ensure changes don't compromise the system's ability to protect occupants."
  },
  {
    id: 10,
    question: "What is the purpose of coordinating testing schedules with fire risk assessments?",
    options: [
      "To reduce testing costs",
      "To ensure test frequencies match risk levels and changes are captured",
      "To avoid testing during business hours",
      "To simplify insurance claims"
    ],
    correctAnswer: 1,
    explanation: "Coordination ensures testing frequencies are appropriate for the risk level, that any changes identified in the FRA trigger appropriate testing, and that test results inform FRA reviews."
  },
  {
    id: 11,
    question: "BS 5839-1 requires cause and effect documentation to:",
    options: [
      "Record insurance details",
      "Define what each device does when activated and system responses",
      "List emergency contact numbers",
      "Specify paint colours for devices"
    ],
    correctAnswer: 1,
    explanation: "Cause and effect documentation specifies how the system responds to each trigger - which zones activate, what outputs operate (sounders, door releases, lifts), and any time delays or staged responses."
  },
  {
    id: 12,
    question: "When must a fire risk assessment be updated following emergency system modifications?",
    options: [
      "Only if the fire authority requests it",
      "At the next scheduled annual review",
      "Promptly, before the modifications are put into use",
      "Only if there is a fire incident"
    ],
    correctAnswer: 2,
    explanation: "The FRA should be reviewed and updated before modified systems are put into use to ensure the changes don't introduce new risks and that the overall fire safety strategy remains valid."
  }
];

const faqs = [
  {
    question: "What happens if emergency lighting fails the annual duration test?",
    answer: "Failed luminaires must be repaired or replaced promptly and the failure recorded in the log book. If multiple units fail, the system may not provide adequate emergency illumination, potentially requiring temporary measures or restricted building use until repairs are completed. The cause of failure should be investigated - common causes include battery degradation, driver failure, or incorrect charging."
  },
  {
    question: "Can weekly fire alarm tests be carried out by building staff?",
    answer: "Yes, weekly tests can be carried out by trained building staff who understand the system operation and testing procedure. They must know how to put the system into test mode, conduct the test safely, restore normal operation, and record results. However, the six-monthly servicing must be carried out by a competent fire alarm engineer."
  },
  {
    question: "How does the fire risk assessment relate to emergency system specifications?",
    answer: "The fire risk assessment identifies the level of risk in a building, which directly informs the required system categories. For example, a higher-risk premises may require a Category L1 fire alarm system (full coverage) rather than L3 (escape routes only). The FRA should be consulted when specifying systems and updated when systems change."
  },
  {
    question: "What competencies are required for periodic testing of emergency systems?",
    answer: "For routine testing (weekly/monthly), building staff require adequate training in test procedures and system operation. For annual inspections and servicing, personnel should be competent in the relevant standards (BS 5266, BS 5839), understand electrical safety requirements, and have appropriate qualifications such as those from ECA, BAFE, or manufacturer training."
  },
  {
    question: "Are there different testing requirements for maintained versus non-maintained emergency lighting?",
    answer: "The testing schedule is the same, but the test procedure differs. For non-maintained luminaires, the test verifies operation when mains supply fails. For maintained luminaires, the test must verify both continuous operation on mains and emergency operation on battery. Sustained (combined) luminaires require testing of both maintained and non-maintained lamps."
  },
  {
    question: "How long must test records be retained?",
    answer: "Log books and test records should be retained for the life of the installation as they demonstrate compliance history. In practice, a minimum of 3-5 years of records should be readily available. Records may be required as evidence following incidents, during fire authority inspections, or for insurance purposes."
  }
];

const HNCModule7Section2_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Testing and Compliance
          </h1>
          <p className="text-white/80">
            Periodic testing schedules, documentation requirements, fire risk assessment coordination, and regulatory compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Emergency lighting:</strong> Monthly functional test, annual duration test</li>
              <li className="pl-1"><strong>Fire alarms:</strong> Weekly user test, six-monthly service</li>
              <li className="pl-1"><strong>Documentation:</strong> Log books mandatory for both systems</li>
              <li className="pl-1"><strong>RRO 2005:</strong> Legal framework for fire safety compliance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 5266-1:</strong> Emergency lighting testing</li>
              <li className="pl-1"><strong>BS 5839-1:</strong> Fire detection and alarm testing</li>
              <li className="pl-1"><strong>RRO 2005:</strong> Regulatory Reform (Fire Safety) Order</li>
              <li className="pl-1"><strong>PAS 79:</strong> Fire risk assessment guidance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BS 5266-1 testing schedules for emergency lighting systems",
              "Implement BS 5839-1 testing and maintenance requirements for fire alarms",
              "Maintain compliant documentation and log books for emergency systems",
              "Coordinate testing programmes with fire risk assessments",
              "Understand duties under the Regulatory Reform (Fire Safety) Order 2005",
              "Specify competency requirements for testing personnel"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Emergency Lighting Testing (BS 5266) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Emergency Lighting Testing (BS 5266)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1 specifies mandatory testing schedules to ensure emergency lighting systems
              remain functional throughout their installed life. These tests verify that luminaires
              will illuminate escape routes when the normal supply fails.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Schedule Summary</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">By Whom</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daily visual check</td>
                      <td className="border border-white/10 px-3 py-2">Every occupied day</td>
                      <td className="border border-white/10 px-3 py-2">Brief observation</td>
                      <td className="border border-white/10 px-3 py-2">Building staff</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monthly functional test</td>
                      <td className="border border-white/10 px-3 py-2">Not exceeding 1 month</td>
                      <td className="border border-white/10 px-3 py-2">Brief (sufficient to verify operation)</td>
                      <td className="border border-white/10 px-3 py-2">Trained staff</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annual duration test</td>
                      <td className="border border-white/10 px-3 py-2">Not exceeding 12 months</td>
                      <td className="border border-white/10 px-3 py-2">Full rated duration (typically 3 hours)</td>
                      <td className="border border-white/10 px-3 py-2">Competent person</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Monthly functional test procedure:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Simulate mains failure at each final circuit or use test facility</li>
                <li className="pl-1">Verify each luminaire illuminates within 5 seconds</li>
                <li className="pl-1">Check indicator lamps showing charging status</li>
                <li className="pl-1">Restore supply before batteries become fully discharged</li>
                <li className="pl-1">Record results and any defects in the log book</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Annual duration test procedure:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Conduct at low-occupancy period (night or weekend)</li>
                <li className="pl-1">Disconnect normal supply to initiate emergency mode</li>
                <li className="pl-1">Monitor luminaires throughout rated duration</li>
                <li className="pl-1">Measure illumination levels at end of test period</li>
                <li className="pl-1">Allow 24 hours recharge before next test or after genuine emergency</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Automatic test systems:</strong> Where ATS is installed, it can replace manual monthly tests but annual verification by a competent person remains mandatory.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fire Alarm Testing (BS 5839) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fire Alarm Testing (BS 5839)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5839-1 establishes comprehensive testing and maintenance requirements for fire
              detection and alarm systems. Regular testing ensures systems will detect fires and
              alert occupants when required.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing and Servicing Schedule</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weekly test</td>
                      <td className="border border-white/10 px-3 py-2">Not exceeding 7 days</td>
                      <td className="border border-white/10 px-3 py-2">User (trained staff)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monthly checks</td>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">User (trained staff)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quarterly inspection</td>
                      <td className="border border-white/10 px-3 py-2">Not exceeding 3 months</td>
                      <td className="border border-white/10 px-3 py-2">Competent person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Six-monthly service</td>
                      <td className="border border-white/10 px-3 py-2">Not exceeding 6 months</td>
                      <td className="border border-white/10 px-3 py-2">Competent person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annual inspection</td>
                      <td className="border border-white/10 px-3 py-2">Not exceeding 12 months</td>
                      <td className="border border-white/10 px-3 py-2">Competent person</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Weekly Test Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Test different call point each week</li>
                  <li className="pl-1">Complete all call points in 13 weeks</li>
                  <li className="pl-1">Verify sounders operate in test zone</li>
                  <li className="pl-1">Check panel indicates alarm correctly</li>
                  <li className="pl-1">Record results in log book</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Six-Monthly Service Includes</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Test all detectors using suitable test equipment</li>
                  <li className="pl-1">Check standby battery condition</li>
                  <li className="pl-1">Verify all connections are secure</li>
                  <li className="pl-1">Check cause and effect operation</li>
                  <li className="pl-1">Issue service report</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Detector Testing Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Smoke detectors:</strong> Use approved aerosol smoke simulant or functional test equipment</li>
                <li className="pl-1"><strong>Heat detectors:</strong> Apply controlled heat source within response parameters</li>
                <li className="pl-1"><strong>Beam detectors:</strong> Use test card or functional test mode</li>
                <li className="pl-1"><strong>Aspirating systems:</strong> Introduce test smoke at sampling points</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>False alarm management:</strong> Test procedures must minimise false alarms - always notify the alarm receiving centre and building occupants before testing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Documentation Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Documentation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive documentation demonstrates compliance, supports maintenance planning,
              and provides essential evidence following incidents. Both BS 5266 and BS 5839 mandate
              specific documentation throughout the system lifecycle.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Lighting Documentation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Installation certificate</td>
                      <td className="border border-white/10 px-3 py-2">Compliance statement, system details, designer sign-off</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">As-installed drawings</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire locations, circuit details, device types</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Log book</td>
                      <td className="border border-white/10 px-3 py-2">All tests, defects, repairs, alterations</td>
                      <td className="border border-white/10 px-3 py-2">Ongoing (min 3 years available)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Photometric evidence</td>
                      <td className="border border-white/10 px-3 py-2">Design calculations, illumination levels achieved</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Alarm Documentation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design certificate</td>
                      <td className="border border-white/10 px-3 py-2">System category, coverage, standards compliance</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Installation certificate</td>
                      <td className="border border-white/10 px-3 py-2">Compliance with design, workmanship standards</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning certificate</td>
                      <td className="border border-white/10 px-3 py-2">Test results, cause and effect verification</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cause and effect matrix</td>
                      <td className="border border-white/10 px-3 py-2">System responses to each trigger condition</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Log book</td>
                      <td className="border border-white/10 px-3 py-2">Tests, false alarms, faults, maintenance, alterations</td>
                      <td className="border border-white/10 px-3 py-2">Ongoing (min 3 years available)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Log Book Best Practice</p>
              <div className="text-sm text-white/90 space-y-2">
                <p>The log book should be:</p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>Kept at or near the main control panel</li>
                  <li>Accessible to maintenance personnel and inspectors</li>
                  <li>Completed in ink (not pencil) for permanence</li>
                  <li>Signed by the person conducting each test</li>
                  <li>Reviewed regularly by the responsible person</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Digital log books:</strong> Electronic recording systems are acceptable provided they maintain audit trails, prevent unauthorised modification, and can be printed on demand.
            </p>
          </div>
        </section>

        {/* Section 4: Regulatory Compliance and FRA Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Regulatory Compliance and FRA Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Regulatory Reform (Fire Safety) Order 2005 provides the legal framework for fire
              safety in non-domestic premises. Understanding its requirements and coordinating emergency
              system testing with fire risk assessments is essential for compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key RRO 2005 Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fire risk assessment:</strong> Must be carried out and kept under review</li>
                <li className="pl-1"><strong>Fire safety measures:</strong> Must be implemented and maintained</li>
                <li className="pl-1"><strong>Emergency routes and exits:</strong> Must be kept clear and functional</li>
                <li className="pl-1"><strong>Detection and warning:</strong> Systems must be installed and maintained</li>
                <li className="pl-1"><strong>Emergency lighting:</strong> Required where people could be trapped</li>
                <li className="pl-1"><strong>Maintenance:</strong> All fire safety equipment must be kept in efficient working order</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Responsible Person Duties</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Conduct fire risk assessment</li>
                  <li className="pl-1">Implement preventive measures</li>
                  <li className="pl-1">Provide fire safety information</li>
                  <li className="pl-1">Ensure staff training</li>
                  <li className="pl-1">Maintain fire safety equipment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Enforcement Options</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Informal advice:</strong> Recommendations for improvement</li>
                  <li className="pl-1"><strong>Enforcement notice:</strong> Requires action within timeframe</li>
                  <li className="pl-1"><strong>Prohibition notice:</strong> Prevents use of premises</li>
                  <li className="pl-1"><strong>Prosecution:</strong> Unlimited fines, imprisonment</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">FRA and Testing Coordination</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">FRA Finding</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Testing Implication</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Higher risk identified</td>
                      <td className="border border-white/10 px-3 py-2">May require more frequent testing</td>
                      <td className="border border-white/10 px-3 py-2">Review and enhance test schedule</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building layout changed</td>
                      <td className="border border-white/10 px-3 py-2">Verify system coverage remains adequate</td>
                      <td className="border border-white/10 px-3 py-2">Full system test and re-certification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupancy type changed</td>
                      <td className="border border-white/10 px-3 py-2">System category may need upgrading</td>
                      <td className="border border-white/10 px-3 py-2">Design review and modification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test failures recorded</td>
                      <td className="border border-white/10 px-3 py-2">FRA should reflect system reliability issues</td>
                      <td className="border border-white/10 px-3 py-2">Repair and update FRA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Compliance Point</p>
              <p className="text-sm text-white/90">
                The fire risk assessment must be reviewed whenever there is reason to suspect it is
                no longer valid, or there has been a significant change to the premises. Emergency
                system modifications, test failures, or changes in testing arrangements are all
                triggers for FRA review.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>PAS 79-1:2020:</strong> Provides guidance on fire risk assessment methodology and should be followed
              when conducting or reviewing assessments for non-residential premises.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Annual Testing Schedule for Office Building</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop an annual testing schedule for a 4-storey office building with emergency lighting and Category L3 fire alarm system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Emergency Lighting (BS 5266-1):</p>
                <p className="ml-4">Daily: Visual check of indicator lamps</p>
                <p className="ml-4">Monthly: Functional test (simulate mains failure)</p>
                <p className="ml-4">Annually: Full 3-hour duration test (January - low occupancy)</p>
                <p className="mt-2 text-white/60">Fire Alarm (BS 5839-1):</p>
                <p className="ml-4">Weekly: Different call point each Monday at 10:00</p>
                <p className="ml-4">Monthly: Check panel indicators, battery voltages</p>
                <p className="ml-4">Six-monthly: Full service (June and December)</p>
                <p className="ml-4">Annually: Comprehensive inspection (December service)</p>
                <p className="mt-2 text-green-400">Log book entries required for all activities</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Responding to Failed Duration Test</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> During the annual duration test, 8 of 45 emergency luminaires fail before reaching the 3-hour duration.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Immediate actions:</p>
                <p className="ml-4">1. Record all failures in log book with locations</p>
                <p className="ml-4">2. Assess if affected areas have adequate coverage</p>
                <p className="ml-4">3. Implement temporary measures if required</p>
                <p className="mt-2 text-white/60">Investigation:</p>
                <p className="ml-4">- Check battery age (typically 4-year life)</p>
                <p className="ml-4">- Verify charging circuits functioning</p>
                <p className="ml-4">- Assess if failures indicate batch problem</p>
                <p className="mt-2 text-white/60">Rectification:</p>
                <p className="ml-4">- Replace failed batteries or luminaires</p>
                <p className="ml-4">- Re-test replaced units</p>
                <p className="ml-4">- Update FRA if system reliability is concern</p>
                <p className="mt-2 text-green-400">Document all actions and notify responsible person</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: FRA Review Following System Modification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A new server room has been added to a commercial building, requiring fire alarm system extension.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">System changes:</p>
                <p className="ml-4">- Additional aspirating detection system installed</p>
                <p className="ml-4">- Gas suppression system integrated</p>
                <p className="ml-4">- Cause and effect matrix updated</p>
                <p className="mt-2 text-white/60">FRA review considerations:</p>
                <p className="ml-4">- New fire risk from electrical equipment</p>
                <p className="ml-4">- Detection coverage for server room</p>
                <p className="ml-4">- Emergency procedures for gas discharge</p>
                <p className="ml-4">- Staff training requirements</p>
                <p className="mt-2 text-white/60">Documentation updates:</p>
                <p className="ml-4">- As-installed drawings revised</p>
                <p className="ml-4">- Cause and effect documentation updated</p>
                <p className="ml-4">- FRA updated with new risks and controls</p>
                <p className="ml-4">- Log book notes system extension</p>
                <p className="mt-2 text-green-400">Full commissioning test before system goes live</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Schedule Quick Reference</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Emergency lighting monthly:</strong> Brief functional test, record in log book</li>
                <li className="pl-1"><strong>Emergency lighting annual:</strong> Full rated duration test by competent person</li>
                <li className="pl-1"><strong>Fire alarm weekly:</strong> Different call point each week, complete cycle in 13 weeks</li>
                <li className="pl-1"><strong>Fire alarm six-monthly:</strong> Full service including all detectors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Compliance Points</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Log books are mandatory and must be maintained throughout system life</li>
                <li className="pl-1">The responsible person under RRO must ensure systems are maintained</li>
                <li className="pl-1">FRA must be reviewed when systems change or tests reveal issues</li>
                <li className="pl-1">Competent persons must conduct annual and six-monthly inspections</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Missing log book entries:</strong> Every test must be recorded</li>
                <li className="pl-1"><strong>Expired service intervals:</strong> Six-monthly services must not be exceeded</li>
                <li className="pl-1"><strong>Unaddressed defects:</strong> Faults must be rectified promptly</li>
                <li className="pl-1"><strong>Outdated FRA:</strong> Must be reviewed annually and after changes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">BS 5266-1 Testing</p>
                <ul className="space-y-0.5">
                  <li>Daily visual check (occupied days)</li>
                  <li>Monthly functional test (max interval)</li>
                  <li>Annual full duration test (3 hours typical)</li>
                  <li>24 hours recharge after duration test</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">BS 5839-1 Testing</p>
                <ul className="space-y-0.5">
                  <li>Weekly user test (different call point)</li>
                  <li>13-week cycle for all call points</li>
                  <li>Six-monthly service (maximum interval)</li>
                  <li>All detectors tested at each service</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section3-1">
              Next: Integration Principles
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section2_6;
