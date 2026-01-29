import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Permit to Work Systems - HNC Module 1 Section 3.3";
const DESCRIPTION = "Master permit to work systems for high-risk activities including hot work, confined spaces, electrical isolation, and lockout/tagout (LOTO) procedures in building services.";

const quickCheckQuestions = [
  {
    id: "permit-purpose",
    question: "What is the primary purpose of a permit to work system?",
    options: ["To create paperwork for HSE", "To ensure a formal check is made that a safe system is in place", "To transfer responsibility to the worker", "To speed up hazardous work"],
    correctIndex: 1,
    explanation: "A permit to work ensures a formal check is made that a safe system of work is in place before high-risk activities begin. It provides authorisation and documents the precautions required."
  },
  {
    id: "loto-first",
    question: "What is the first step in a Lockout/Tagout (LOTO) procedure?",
    options: ["Apply the lock", "Verify isolation", "Identify all energy sources", "Start work immediately"],
    correctIndex: 2,
    explanation: "The first step is always to identify all energy sources that could affect the work. This includes electrical, mechanical, hydraulic, pneumatic, thermal, and stored energy."
  },
  {
    id: "hot-work",
    question: "How long should fire watch continue after hot work is completed?",
    options: ["No fire watch needed", "30 minutes", "At least 60 minutes", "Only during work"],
    correctIndex: 2,
    explanation: "Fire watch should continue for at least 60 minutes after hot work is completed, as many fires start from smouldering materials after the work has finished."
  },
  {
    id: "permit-cancel",
    question: "Who can cancel or close a permit to work?",
    options: ["Anyone on site", "Only the person who raised it", "The authorising person or competent designated person", "The worker carrying out the task"],
    correctIndex: 2,
    explanation: "Only the authorising person or a competent person designated to do so can cancel a permit. This ensures proper handback procedures are followed and the system is not bypassed."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When is a permit to work system required?",
    options: [
      "For all work activities",
      "Only when requested by the client",
      "For high-risk activities where normal controls are insufficient",
      "Only for work lasting more than one day"
    ],
    correctAnswer: 2,
    explanation: "Permits are required for high-risk activities where normal safe systems of work are insufficient, such as work on live electrical systems, hot work, confined space entry, and work on pressurised systems."
  },
  {
    id: 2,
    question: "What are the key elements of an effective permit to work?",
    options: [
      "Title, date, and worker name only",
      "Hazard identification, precautions, authorisation, time limits, and handback",
      "Cost estimate and completion date",
      "Client signature only"
    ],
    correctAnswer: 1,
    explanation: "An effective permit includes: work description, hazards identified, precautions required, who authorises and accepts, time validity, cross-references to other permits, and formal handback procedure."
  },
  {
    id: 3,
    question: "What does LOTO stand for?",
    options: [
      "Lock On, Tag Off",
      "Limited Operation, Technical Override",
      "Lockout/Tagout",
      "Lock Out, Transfer Ownership"
    ],
    correctAnswer: 2,
    explanation: "LOTO stands for Lockout/Tagout - a safety procedure ensuring that dangerous machines or energy sources are properly shut off and cannot be restarted until work is complete."
  },
  {
    id: 4,
    question: "Who is the 'Authorising Person' in a permit system?",
    options: [
      "Anyone with a permit pad",
      "A competent person with knowledge of the plant and authority to issue permits",
      "The site visitor signing in",
      "The person doing the work"
    ],
    correctAnswer: 1,
    explanation: "The Authorising Person (AP) must have detailed knowledge of the plant/system, understand the hazards, and have authority to issue permits. They take responsibility for ensuring precautions are adequate."
  },
  {
    id: 5,
    question: "What should happen if work cannot be completed within the permit validity period?",
    options: [
      "Continue working until finished",
      "Cancel the permit and reapply for a new one",
      "Have another worker take over",
      "Leave the work area open and return tomorrow"
    ],
    correctAnswer: 1,
    explanation: "If work overruns, the permit must be cancelled and a new permit issued. The worksite must be left in a safe state. Never extend permit validity without proper reauthorisation."
  },
  {
    id: 6,
    question: "What is 'proving dead' in electrical isolation?",
    options: [
      "Checking the person is qualified",
      "Testing that no voltage is present using an approved voltage indicator",
      "Reading the circuit diagram",
      "Checking the isolator position"
    ],
    correctAnswer: 1,
    explanation: "Proving dead means testing with an approved voltage indicator (that has been proved on a known live source) to confirm no voltage is present. Visual inspection of isolator position is not sufficient."
  },
  {
    id: 7,
    question: "What information must a hot work permit include?",
    options: [
      "Worker's home address",
      "Location, nature of work, fire precautions, fire watch requirements",
      "Company turnover",
      "Previous job references"
    ],
    correctAnswer: 1,
    explanation: "Hot work permits must specify the exact location, type of hot work, fire precautions (extinguishers, clearance of combustibles), fire watch requirements, and duration of post-work monitoring."
  },
  {
    id: 8,
    question: "What is the purpose of a 'Limitation of Access' permit?",
    options: [
      "To restrict who can leave site",
      "To control entry to dangerous areas during maintenance",
      "To limit lunch break duration",
      "To restrict overtime working"
    ],
    correctAnswer: 1,
    explanation: "A Limitation of Access permit restricts entry to areas where work is in progress that creates additional hazards. It ensures only authorised personnel enter and are aware of the hazards."
  },
  {
    id: 9,
    question: "In confined space entry, what does the 'Top Man' or 'Standby Person' do?",
    options: [
      "Does the work inside the confined space",
      "Remains outside to maintain communication and initiate rescue",
      "Signs the permit only",
      "Operates the ventilation system"
    ],
    correctAnswer: 1,
    explanation: "The Standby Person remains outside the confined space at all times, maintains communication with those inside, monitors conditions, and is trained to initiate emergency rescue procedures."
  },
  {
    id: 10,
    question: "What should happen to a permit if the scope of work changes significantly?",
    options: [
      "Amend it by crossing out and initialling",
      "Cancel the existing permit and raise a new one",
      "Continue as the permit covers general work",
      "Get verbal approval and continue"
    ],
    correctAnswer: 1,
    explanation: "Significant changes in scope require cancelling the existing permit and raising a new one. The new permit ensures all hazards from the changed work are reassessed and appropriate precautions identified."
  },
  {
    id: 11,
    question: "What is an 'isolation certificate' used for?",
    options: [
      "To certify worker competence",
      "To formally document that systems are isolated and safe for work",
      "To isolate the worker from colleagues",
      "To prove insurance cover"
    ],
    correctAnswer: 1,
    explanation: "An isolation certificate formally documents that an electrical or mechanical system has been isolated, locked off, tested, and is safe for work. It's often a supporting document to a permit to work."
  },
  {
    id: 12,
    question: "Why must each worker apply their own personal lock during LOTO?",
    options: [
      "It's company policy only",
      "To ensure their personal safety - no one else can remove it",
      "To save money on locks",
      "To speed up the process"
    ],
    correctAnswer: 1,
    explanation: "Each worker applies their own lock so that the system cannot be re-energised while they are working on it. Only the worker who applied the lock should remove it, ensuring personal protection."
  }
];

const faqs = [
  {
    question: "Can a permit to work be issued remotely?",
    answer: "Generally no. The Authorising Person should visit the worksite to verify conditions and discuss the work with those who will perform it. Remote authorisation bypasses essential physical checks and face-to-face communication. Some low-risk permits may allow remote authorisation with robust verification procedures."
  },
  {
    question: "What if there's an emergency during permitted work?",
    answer: "Stop work immediately and make the area safe if possible. Follow site emergency procedures. The permit is suspended during emergencies. After the emergency, the permit must be reassessed before work resumes - conditions may have changed. Never assume previous precautions are still adequate."
  },
  {
    question: "How many locks should be on an isolation point?",
    answer: "As many as required - one from each person who may be at risk. Multi-lock hasps allow multiple padlocks on a single isolation point. Only when all workers have removed their personal locks can the system be re-energised."
  },
  {
    question: "Can a supervisor apply locks on behalf of their team?",
    answer: "No. Each individual must apply and remove their own lock. This is fundamental to LOTO - the person at risk controls their own safety. Group lockout procedures exist but still require individual lock application within the group."
  },
  {
    question: "What training is needed to issue permits?",
    answer: "Authorising Persons need formal training covering: the specific permit system, relevant hazards and precautions, isolation procedures, their responsibilities and authority limits, and ongoing competence assessment. This should be refreshed periodically."
  },
  {
    question: "Should permits be used for routine maintenance?",
    answer: "If the maintenance involves high-risk activities (live working, confined spaces, hot work, working on pressurised systems), permits are required regardless of how routine the work is. The decision is based on hazard level, not frequency of the task."
  }
];

const HNCModule1Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Permit to Work Systems
          </h1>
          <p className="text-white/80">
            Formal systems for controlling high-risk work activities in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Purpose:</strong> Formal check that safe system is in place</li>
              <li className="pl-1"><strong>Authorisation:</strong> Work cannot start without permit</li>
              <li className="pl-1"><strong>Precautions:</strong> Documented and verified before work</li>
              <li className="pl-1"><strong>Handback:</strong> Formal closure and reinstatement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Electrical:</strong> Isolation, LOTO, live working permits</li>
              <li className="pl-1"><strong>HVAC:</strong> Refrigerant systems, ductwork entry</li>
              <li className="pl-1"><strong>Hot work:</strong> Welding, brazing near combustibles</li>
              <li className="pl-1"><strong>Confined spaces:</strong> Tanks, risers, ceiling voids</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain when permit to work systems are required",
              "Describe the key elements of an effective permit",
              "Apply Lockout/Tagout (LOTO) procedures correctly",
              "Identify requirements for hot work and confined space permits",
              "Understand roles: Authorising Person, Performing Authority, Competent Person",
              "Implement permit procedures for electrical isolation"
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

        {/* Section 1: Permit to Work Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Permit to Work Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A permit to work (PTW) is a formal documented system that authorises certain work to be
              carried out at a specific time and place. It sets out the precautions required to complete
              the work safely and provides a clear record of the authorization.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When permits to work are required:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electrical work:</strong> Isolation of systems, live working, work near live conductors</li>
                <li className="pl-1"><strong>Hot work:</strong> Welding, cutting, brazing, grinding where fire risk exists</li>
                <li className="pl-1"><strong>Confined spaces:</strong> Entry to tanks, vessels, ducts, risers, ceiling voids</li>
                <li className="pl-1"><strong>Working at height:</strong> Complex access requirements, fragile roofs</li>
                <li className="pl-1"><strong>Excavations:</strong> Breaking ground, especially near services</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Roles in Permit Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Role</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibilities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Authorising Person (AP)</td>
                      <td className="border border-white/10 px-3 py-2">Knows the plant, identifies hazards, specifies precautions, authorises work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Competent Person (CP)</td>
                      <td className="border border-white/10 px-3 py-2">Carries out or supervises the work, implements precautions, accepts permit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Performing Authority</td>
                      <td className="border border-white/10 px-3 py-2">The person or team physically doing the work under the permit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Permit Coordinator</td>
                      <td className="border border-white/10 px-3 py-2">Oversees the permit system, manages conflicts, maintains records</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> A permit is not just paperwork - it's a formal check that safe
              conditions exist. Work must not proceed until all parties have signed to confirm precautions are in place.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Lockout/Tagout (LOTO) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Lockout/Tagout (LOTO) Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LOTO is a safety procedure ensuring that dangerous machines or energy sources are properly
              shut off and cannot be restarted until maintenance or service work is complete. It protects
              workers from unexpected energisation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The LOTO Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Preparation</td>
                      <td className="border border-white/10 px-3 py-2">Identify all energy sources</td>
                      <td className="border border-white/10 px-3 py-2">Know what needs isolating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Notification</td>
                      <td className="border border-white/10 px-3 py-2">Inform affected personnel</td>
                      <td className="border border-white/10 px-3 py-2">Prevent unauthorised start-up</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Shutdown</td>
                      <td className="border border-white/10 px-3 py-2">Turn off equipment normally</td>
                      <td className="border border-white/10 px-3 py-2">Controlled de-energisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Isolation</td>
                      <td className="border border-white/10 px-3 py-2">Operate isolation devices</td>
                      <td className="border border-white/10 px-3 py-2">Disconnect from energy source</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Lockout</td>
                      <td className="border border-white/10 px-3 py-2">Apply personal locks and tags</td>
                      <td className="border border-white/10 px-3 py-2">Prevent re-energisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6. Stored Energy</td>
                      <td className="border border-white/10 px-3 py-2">Release/restrain residual energy</td>
                      <td className="border border-white/10 px-3 py-2">Eliminate hidden hazards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7. Verification</td>
                      <td className="border border-white/10 px-3 py-2">Test that system is dead</td>
                      <td className="border border-white/10 px-3 py-2">Confirm safe to work</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Sources to Consider</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Electrical:</strong> Mains, UPS, generators, batteries</li>
                  <li className="pl-1"><strong>Mechanical:</strong> Moving parts, gravity, springs</li>
                  <li className="pl-1"><strong>Hydraulic:</strong> Pressurised fluid systems</li>
                  <li className="pl-1"><strong>Pneumatic:</strong> Compressed air systems</li>
                  <li className="pl-1"><strong>Thermal:</strong> Steam, hot water, heated surfaces</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lock and Tag Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Each worker applies their own personal lock</li>
                  <li className="pl-1">Locks should be substantial and standardised</li>
                  <li className="pl-1">Tags identify who applied the lock and when</li>
                  <li className="pl-1">Multi-lock hasps for multiple workers</li>
                  <li className="pl-1">Only lock owner can remove their lock</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Electrical isolation:</strong> Must be proved dead using an approved voltage indicator
              that has been tested immediately before and after on a known live source (proving unit or supply).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Hot Work Permits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Hot Work Permits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hot work includes any activity that produces flames, sparks, or heat that could ignite
              combustible materials. In building services, this commonly includes welding, brazing,
              soldering, and grinding near combustible materials.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hot work permit requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Location:</strong> Exact area where hot work will occur</li>
                <li className="pl-1"><strong>Duration:</strong> Start and finish times, fire watch period</li>
                <li className="pl-1"><strong>Fire precautions:</strong> Extinguishers, blankets, removal of combustibles</li>
                <li className="pl-1"><strong>Fire watch:</strong> Named person to monitor during and after work</li>
                <li className="pl-1"><strong>Detector isolation:</strong> Which detectors isolated (with notification to fire panel)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Prevention Checklist</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Before Work</th>
                      <th className="border border-white/10 px-3 py-2 text-left">During Work</th>
                      <th className="border border-white/10 px-3 py-2 text-left">After Work</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Remove combustibles within 11m</td>
                      <td className="border border-white/10 px-3 py-2">Continuous fire watch</td>
                      <td className="border border-white/10 px-3 py-2">Fire watch for 60+ minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cover non-removable materials</td>
                      <td className="border border-white/10 px-3 py-2">Monitor adjacent areas</td>
                      <td className="border border-white/10 px-3 py-2">Check hidden voids and spaces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Seal wall/floor openings</td>
                      <td className="border border-white/10 px-3 py-2">Keep extinguisher to hand</td>
                      <td className="border border-white/10 px-3 py-2">Reinstate fire detection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Position fire extinguishers</td>
                      <td className="border border-white/10 px-3 py-2">Check for smouldering</td>
                      <td className="border border-white/10 px-3 py-2">Formal permit handback</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Fire Watch - Critical Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Fire watch person must be trained and remain at the location</li>
                <li className="pl-1">Must continue for minimum 60 minutes after hot work ceases</li>
                <li className="pl-1">Must have means to raise the alarm and tackle small fires</li>
                <li className="pl-1">In high-risk buildings, extend fire watch to 4+ hours</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Insurance note:</strong> Many insurance policies require formal hot work permits.
              Failure to follow permit procedures may invalidate fire insurance claims.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Confined Space Permits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Confined Space and Electrical Permits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Confined spaces in building services include tanks, risers, ceiling voids, ductwork, and
              any enclosed space with limited access where dangerous conditions may exist. Electrical
              permits control work on live systems or in high-risk electrical environments.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Confined Space Permit Elements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Atmospheric testing before and during entry</li>
                  <li className="pl-1">Ventilation requirements</li>
                  <li className="pl-1">Standby person stationed at entry</li>
                  <li className="pl-1">Communication system specified</li>
                  <li className="pl-1">Rescue plan and equipment</li>
                  <li className="pl-1">Entry log maintained</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Sanction Permit Elements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Equipment/circuits to be worked on</li>
                  <li className="pl-1">Points of isolation identified</li>
                  <li className="pl-1">Proof of isolation documented</li>
                  <li className="pl-1">Safety earthing if required</li>
                  <li className="pl-1">Adjacent live parts identified</li>
                  <li className="pl-1">Barriers and warning notices</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Permit Handback Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">Work completed or area left in safe state</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">All workers and tools removed from area</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">All personal locks removed by their owners</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Competent Person signs handback section</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Authorising Person accepts handback and cancels permit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">System returned to normal operation (if applicable)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Record keeping:</strong> All permits should be retained for a minimum period (often 3 years)
              as they provide evidence of the safe system of work applied. Some permits may be required for longer
              in case of future investigations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Application</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Electrical Isolation for Switchboard Work</h3>
              <p className="text-sm text-white mb-2">
                <strong>Task:</strong> Replace MCCB in live switchboard in commercial building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Permit Process:</strong></p>
                <p className="ml-4">1. Identify all incoming supplies (including standby generator)</p>
                <p className="ml-4">2. Authorising Person issues Electrical Permit to Work</p>
                <p className="ml-4">3. Controlled shutdown coordinated with building management</p>
                <p className="ml-4">4. Main incomer isolated and locked off</p>
                <p className="ml-4">5. Generator changeover isolated and locked off</p>
                <p className="ml-4">6. Each electrician applies personal lock to multi-lock hasp</p>
                <p className="ml-4">7. Voltage indicator tested on proving unit</p>
                <p className="ml-4">8. All busbars proved dead</p>
                <p className="ml-4">9. Voltage indicator retested on proving unit</p>
                <p className="ml-4">10. Barriers and warning notices in place</p>
                <p className="mt-2 text-green-400">Only then does work proceed under the permit</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Hot Work in Plant Room</h3>
              <p className="text-sm text-white mb-2">
                <strong>Task:</strong> Welding pipework modification near thermal insulation materials.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Hot Work Permit Requirements:</strong></p>
                <p className="ml-4">- Fire detection in plant room isolated (notified to fire panel)</p>
                <p className="ml-4">- Combustible insulation protected with fire blankets</p>
                <p className="ml-4">- Oil drums and flammable stores removed from area</p>
                <p className="ml-4">- Two CO2 extinguishers positioned within reach</p>
                <p className="ml-4">- Fire watch person named: John Smith, Tel: 07xxx</p>
                <p className="ml-4">- Work duration: 09:00-12:00</p>
                <p className="ml-4">- Fire watch until: 13:00 minimum</p>
                <p className="ml-4">- Detection to be reinstated after fire watch confirms safe</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Key Points Summary</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Permit Essentials</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Permits are not just paperwork - they ensure precautions are in place</li>
                <li className="pl-1">All parties must sign before work proceeds</li>
                <li className="pl-1">Permits have time limits - do not exceed without reauthorisation</li>
                <li className="pl-1">Scope changes require new permits, not amendments</li>
                <li className="pl-1">Formal handback is essential - don't skip this step</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">LOTO Key Principles</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify ALL energy sources before starting</li>
                <li className="pl-1">Each worker applies their own personal lock</li>
                <li className="pl-1">Only the lock owner can remove their lock</li>
                <li className="pl-1">Always prove dead with tested equipment</li>
                <li className="pl-1">Don't forget stored energy (capacitors, pressure, gravity)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Permit Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rubber stamping:</strong> Issuing without physical checks</li>
                <li className="pl-1"><strong>Over-running:</strong> Work continuing beyond permit validity</li>
                <li className="pl-1"><strong>Scope creep:</strong> Doing more than the permit covers</li>
                <li className="pl-1"><strong>No handback:</strong> Permit left open, system unsafe</li>
                <li className="pl-1"><strong>Key removal:</strong> Taking out locks before work complete</li>
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
                <p className="font-medium text-white mb-1">Permit Types</p>
                <ul className="space-y-0.5">
                  <li>Electrical - isolation, live working</li>
                  <li>Hot Work - welding, cutting, brazing</li>
                  <li>Confined Space - entry and work</li>
                  <li>Working at Height - complex access</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">LOTO Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Identify all energy sources</li>
                  <li>2. Notify, shutdown, isolate</li>
                  <li>3. Apply personal locks/tags</li>
                  <li>4. Verify dead with tested equipment</li>
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
            <Link to="../h-n-c-module1-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safety Culture
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3-4">
              Next: Audits and Inspections
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section3_3;
