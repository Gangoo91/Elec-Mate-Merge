import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Symptom Recognition and Initial Assessment - MOET Module 4 Section 3.1";
const DESCRIPTION = "Identifying fault symptoms, conducting preliminary assessments, interpreting operator reports, visual indicators and safe initial checks for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "symptom-first-step",
    question: "What should be the first action when an operator reports an electrical fault?",
    options: [
      "Immediately open the enclosure and begin testing",
      "Gather information from the operator about what happened and any changes observed",
      "Replace the most commonly failing component",
      "Reset the circuit breaker and see if the fault recurs"
    ],
    correctIndex: 1,
    explanation: "The first step is always to gather information. Asking the operator about the symptoms, when they started, what was happening at the time, and whether anything changed provides critical context that guides your diagnostic approach and prevents wasted effort."
  },
  {
    id: "visual-indicator",
    question: "Which visual indicator most reliably suggests overheating at an electrical termination?",
    options: [
      "Slight dust accumulation on the conductor",
      "Discolouration, browning or charring of insulation near the connection",
      "A loose cable tie on the incoming cable",
      "Condensation on the enclosure door"
    ],
    correctIndex: 1,
    explanation: "Discolouration, browning or charring of insulation near a termination is a clear visual indicator of overheating. This may be caused by a loose connection, undersized conductor or excessive current. It warrants immediate investigation before the fault progresses to failure or fire."
  },
  {
    id: "sensory-assessment",
    question: "During an initial assessment, an unusual smell near a motor starter is detected. What does a pungent, acrid smell typically indicate?",
    options: [
      "The motor bearings need lubrication",
      "Overheated or burnt insulation, possibly from an overloaded coil or cable",
      "Normal operation of the contactor",
      "Moisture ingress into the enclosure"
    ],
    correctIndex: 1,
    explanation: "A pungent, acrid smell near electrical equipment almost always indicates overheated or burnt insulation. This could be from an overloaded contactor coil, overheated cable insulation, or a failed component. The source must be identified and the circuit isolated before further investigation."
  },
  {
    id: "safe-initial-check",
    question: "Before opening an electrical enclosure to investigate a reported fault, which check is essential?",
    options: [
      "Checking the maintenance logbook for the last service date",
      "Verifying the circuit is isolated, locked off, and proved dead using a GS38-compliant voltage indicator",
      "Telephoning the equipment manufacturer for advice",
      "Waiting for the equipment to cool down for 24 hours"
    ],
    correctIndex: 1,
    explanation: "Before opening any electrical enclosure, safe isolation must be carried out. This means isolating the circuit, locking off the isolator, and proving dead with an approved voltage indicator that has been tested before and after use, in accordance with GS38. This is a non-negotiable safety requirement under the Electricity at Work Regulations 1989."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The purpose of an initial fault assessment is to:",
    options: [
      "Immediately repair the fault without delay",
      "Gather information and narrow down the possible causes before testing",
      "Order replacement parts based on the equipment age",
      "Complete the job sheet as quickly as possible"
    ],
    correctAnswer: 1,
    explanation: "An initial assessment gathers information about the fault symptoms, history and context. This structured approach narrows down possible causes before any physical testing begins, saving time and preventing incorrect diagnoses."
  },
  {
    id: 2,
    question: "Which of the following is NOT typically classified as a fault symptom?",
    options: [
      "Equipment running but producing abnormal noise",
      "Circuit breaker tripping repeatedly on overload",
      "The scheduled maintenance date being overdue",
      "Motor running hot with reduced output"
    ],
    correctAnswer: 2,
    explanation: "A scheduled maintenance date being overdue is an administrative matter, not a fault symptom. Fault symptoms are observable abnormalities such as unusual noise, tripping, overheating, or reduced performance that indicate something is wrong with the equipment."
  },
  {
    id: 3,
    question: "An operator reports that a motor 'just stopped'. Which question would be MOST useful to ask first?",
    options: [
      "How old is the motor?",
      "Did anything unusual happen immediately before it stopped — any noise, smell, flickering or alarm?",
      "What colour is the motor?",
      "Is the motor under warranty?"
    ],
    correctAnswer: 1,
    explanation: "Asking about events immediately before the failure provides the most diagnostic value. Unusual noises, smells, flickering or alarms can indicate the type of fault — for example, a burning smell suggests overheating, a bang suggests a short circuit, and flickering suggests a loose connection."
  },
  {
    id: 4,
    question: "Discolouration around a cable termination in a distribution board indicates:",
    options: [
      "The cable was manufactured with coloured insulation",
      "Possible overheating due to a loose connection or excessive current",
      "Normal ageing with no cause for concern",
      "The termination was recently replaced"
    ],
    correctAnswer: 1,
    explanation: "Discolouration, especially browning or blackening, around a cable termination is a strong indicator of overheating. Common causes include loose connections creating high-resistance joints, undersized conductors, or sustained overcurrent. This requires immediate investigation."
  },
  {
    id: 5,
    question: "Which sensory indicator suggests a possible earth fault in a damp environment?",
    options: [
      "A high-pitched whine from a transformer",
      "Tingling sensation when touching earthed metalwork near the equipment",
      "Vibration felt through the floor near a motor",
      "The equipment running quieter than normal"
    ],
    correctAnswer: 1,
    explanation: "A tingling sensation when touching earthed metalwork is a serious indicator of an earth fault. In a damp environment, the fault current path may include the person, creating a shock risk. This requires immediate isolation and investigation. Under no circumstances should the equipment remain in service."
  },
  {
    id: 6,
    question: "The 'half-split' technique in fault finding involves:",
    options: [
      "Splitting the maintenance team into two groups",
      "Testing at the midpoint of a circuit to determine which half contains the fault",
      "Cutting the faulty cable in half to inspect it",
      "Working on half the system while the other half remains live"
    ],
    correctAnswer: 1,
    explanation: "The half-split technique is a systematic diagnostic method where you test at the midpoint of a circuit or system. The result tells you which half the fault lies in, and you then repeat the process on that half. This binary approach rapidly narrows down the fault location."
  },
  {
    id: 7,
    question: "During initial assessment, checking the trip indicators on an MCCB reveals it has tripped on 'short circuit'. This tells you:",
    options: [
      "The MCCB is faulty and needs replacing",
      "A high-magnitude fault current has flowed, indicating a direct short circuit downstream",
      "The motor connected to the circuit has an open-circuit winding",
      "The supply voltage is too high"
    ],
    correctAnswer: 1,
    explanation: "An MCCB trip indicator showing 'short circuit' confirms that a high-magnitude fault current flowed through the device. This indicates a direct short circuit — conductor to conductor or conductor to earth — somewhere downstream. The fault must be located before re-energising."
  },
  {
    id: 8,
    question: "What does a 'burning' or 'fishy' smell near electrical equipment typically indicate?",
    options: [
      "Normal ozone production from contactors",
      "Overheated thermoplastic insulation or a failing electronic component",
      "The equipment has been recently cleaned",
      "Moisture in the enclosure"
    ],
    correctAnswer: 1,
    explanation: "A burning or 'fishy' smell is characteristic of overheated thermoplastic (PVC) insulation or failing electronic components such as capacitors or resistors. The 'fishy' smell specifically comes from thermal decomposition of certain plastics and is a warning sign that should not be ignored."
  },
  {
    id: 9,
    question: "When recording fault symptoms during initial assessment, which approach is correct?",
    options: [
      "Write a brief note such as 'motor broken' on a sticky note",
      "Record the specific symptoms, time, date, conditions and any operator observations in detail",
      "Wait until the fault is repaired, then write up the report from memory",
      "Only record the fault if the repair takes more than one hour"
    ],
    correctAnswer: 1,
    explanation: "Detailed, contemporaneous recording of fault symptoms is essential. This should include the exact symptoms observed, the date and time, operating conditions, any operator observations, and environmental factors. This information supports accurate diagnosis, trend analysis, and future maintenance planning."
  },
  {
    id: 10,
    question: "An RCD protecting a socket circuit trips immediately when reset. The initial assessment should consider:",
    options: [
      "Only the most recently connected appliance",
      "All possible causes including connected loads, wiring faults, moisture ingress and the RCD itself",
      "Replacing the RCD without further investigation",
      "Bypassing the RCD to restore supply"
    ],
    correctAnswer: 1,
    explanation: "When an RCD trips immediately on reset, all possible causes should be considered systematically. These include faulty connected loads, wiring faults (especially in damp conditions), moisture ingress into accessories, and the RCD itself. Disconnecting loads methodically helps identify the source."
  },
  {
    id: 11,
    question: "Under BS 7671, which regulation requires that diagnostic testing and fault finding must be carried out by a competent person?",
    options: [
      "Regulation 610 — Initial verification",
      "Regulation 621 — Periodic inspection and testing requirements",
      "Regulation 134.1.1 — Good workmanship by competent persons",
      "Regulation 411 — Automatic disconnection of supply"
    ],
    correctAnswer: 2,
    explanation: "Regulation 134.1.1 of BS 7671 requires that all electrical work, including diagnostic testing and fault finding, is carried out by competent persons or under appropriate supervision. Competence requires adequate training, knowledge and experience for the specific task."
  },
  {
    id: 12,
    question: "Which of the following environmental factors should be noted during an initial fault assessment?",
    options: [
      "The colour of the walls in the plant room",
      "Temperature, humidity, dust levels, vibration and any recent environmental changes",
      "The brand of toolbox used by the maintenance team",
      "The distance to the nearest car park"
    ],
    correctAnswer: 1,
    explanation: "Environmental factors such as temperature, humidity, dust accumulation, vibration levels and any recent changes (e.g., new equipment installed nearby, building works creating dust) can directly cause or contribute to electrical faults. Recording these during the initial assessment helps identify environmental root causes."
  }
];

const faqs = [
  {
    question: "What is the difference between a fault symptom and a fault cause?",
    answer: "A fault symptom is the observable effect — what you can see, hear, smell or measure (e.g., a motor running hot, a circuit breaker tripping, discoloured insulation). The fault cause is the underlying reason for the symptom (e.g., a loose connection creating high resistance, an insulation breakdown causing earth leakage). Effective fault finding works backwards from symptoms to identify the root cause."
  },
  {
    question: "How much time should I spend on initial assessment before starting tests?",
    answer: "There is no fixed time, but the initial assessment phase — gathering information, visual inspection, reviewing history — typically takes 10 to 20 minutes and is time very well spent. Rushing into testing without understanding the context often leads to wasted time chasing the wrong fault. A thorough initial assessment can eliminate many possible causes before you even pick up a test instrument."
  },
  {
    question: "Should I always isolate before doing an initial assessment?",
    answer: "If the initial assessment involves opening enclosures or touching any part of the installation, safe isolation is mandatory. However, some initial assessment activities can be carried out with the equipment energised — such as observing from a safe distance, listening for unusual sounds, checking indicator lights, reading panel instruments, and talking to operators. Use professional judgement but always err on the side of safety."
  },
  {
    question: "What if the operator's description of the fault does not match what I observe?",
    answer: "This is common and valuable information. The discrepancy may indicate an intermittent fault that is not present when you arrive, or it may mean the operator has misinterpreted the symptoms. Record both the operator's account and your own observations. An intermittent fault that was present earlier may recur, and the operator's description may be the only evidence of it."
  },
  {
    question: "How does symptom recognition relate to the ST1426 apprenticeship standard?",
    answer: "ST1426 requires maintenance technicians to demonstrate knowledge of fault-finding techniques and the ability to diagnose faults using a systematic approach. Symptom recognition is the first step in this systematic approach. The standard expects you to gather information, interpret symptoms, and apply logical reasoning before commencing physical diagnosis — exactly the skills covered in this section."
  }
];

const MOETModule4Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3">
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
            <AlertTriangle className="h-4 w-4" />
            <span>Module 4.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Symptom Recognition and Initial Assessment
          </h1>
          <p className="text-white/80">
            Identifying fault symptoms and conducting preliminary assessments for effective diagnosis
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Observe first:</strong> Gather information before touching anything</li>
              <li className="pl-1"><strong>Symptoms:</strong> Visual, audible, olfactory, thermal and tactile indicators</li>
              <li className="pl-1"><strong>Operator input:</strong> Interview the person who reported the fault</li>
              <li className="pl-1"><strong>History:</strong> Check maintenance records and previous fault reports</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Safe approach:</strong> Assess hazards before investigation begins</li>
              <li className="pl-1"><strong>GS38 compliance:</strong> Prove dead before opening enclosures</li>
              <li className="pl-1"><strong>Record keeping:</strong> Document all observations contemporaneously</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to fault diagnosis and systematic approach KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the importance of structured initial assessment before testing",
              "Identify visual, audible, olfactory and thermal fault indicators",
              "Conduct effective operator interviews to gather fault information",
              "Interpret trip indicators, alarm logs and panel instrument readings",
              "Apply safe working practices during preliminary fault investigation",
              "Document initial findings accurately for diagnostic records"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Importance of Initial Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fault finding is arguably the most valuable skill a maintenance technician possesses. When equipment fails on a production line, the cost of downtime can run to thousands of pounds per hour. The pressure to restore service quickly is intense — but rushing to a diagnosis without first conducting a thorough initial assessment is one of the most common and costly mistakes in electrical maintenance. A structured initial assessment takes minutes; an incorrect diagnosis can waste hours and potentially cause further damage.
            </p>
            <p>
              The initial assessment phase sits before any physical testing. It involves gathering information about the fault from every available source: the operator who reported it, the physical environment, visual and sensory observation, equipment history, and any monitoring or alarm data. The goal is to form a hypothesis — a working theory of what has gone wrong — that you can then test systematically.
            </p>
            <p>
              In the context of the ST1426 Maintenance and Operations Engineering Technician standard, this maps directly to the knowledge requirement for systematic fault diagnosis. The standard expects you to demonstrate a logical, structured approach to identifying faults, starting with information gathering and progressing through hypothesis, testing and confirmation. The initial assessment is where that structured approach begins.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Initial Assessment Matters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Efficiency:</strong> Gathering information first prevents wasted time testing components that are not related to the fault</li>
                <li className="pl-1"><strong>Safety:</strong> Understanding the fault context helps identify hazards before you begin physical investigation</li>
                <li className="pl-1"><strong>Accuracy:</strong> Context from operators and history often points directly to the fault cause, reducing diagnostic uncertainty</li>
                <li className="pl-1"><strong>Cost:</strong> Correct first-time diagnosis minimises downtime and avoids unnecessary component replacement</li>
                <li className="pl-1"><strong>Learning:</strong> Detailed initial assessment builds your experience database for future fault-finding scenarios</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Mistake</p>
              <p className="text-sm text-white">
                The most frequent error in fault diagnosis is jumping straight to component replacement without assessment. A technician who replaces a contactor because "it's usually the contactor" may find the replacement fails immediately because the underlying cause — such as a supply voltage issue or a downstream short circuit — was never identified. Always diagnose before you replace.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Visual and Sensory Fault Indicators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before picking up a single test instrument, an experienced maintenance technician uses their senses to gather a remarkable amount of diagnostic information. Visual, audible, olfactory (smell) and tactile (touch) indicators can often tell you more in 60 seconds than 30 minutes of random testing. Training yourself to observe systematically is one of the most important skills you will develop.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Indicators</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Observation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Possible Fault</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Discoloured or charred insulation</td>
                      <td className="border border-white/10 px-3 py-2">Overheating from loose connection or overcurrent</td>
                      <td className="border border-white/10 px-3 py-2">High — fire risk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Burn marks on enclosure or busbar</td>
                      <td className="border border-white/10 px-3 py-2">Arcing from short circuit or flashover</td>
                      <td className="border border-white/10 px-3 py-2">Critical — arc flash risk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Moisture or condensation inside enclosure</td>
                      <td className="border border-white/10 px-3 py-2">Ingress causing earth leakage or tracking</td>
                      <td className="border border-white/10 px-3 py-2">Medium to high</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Swollen or leaking capacitor</td>
                      <td className="border border-white/10 px-3 py-2">Capacitor failure, possibly due to voltage stress</td>
                      <td className="border border-white/10 px-3 py-2">High — explosion risk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tripped MCB/MCCB with flag indicator</td>
                      <td className="border border-white/10 px-3 py-2">Overcurrent or short circuit downstream</td>
                      <td className="border border-white/10 px-3 py-2">Depends on trip type</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Audible indicators are equally valuable. A healthy electrical installation is largely silent, so any unusual sound warrants investigation. A buzzing or humming noise from a contactor may indicate a damaged shading ring on the coil, causing the armature to vibrate at mains frequency. A crackling sound suggests arcing — a serious and potentially dangerous condition. A high-pitched whine from a variable speed drive may indicate DC bus capacitor problems or switching frequency issues.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smell as a Diagnostic Tool</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Acrid/burning smell:</strong> Overheated insulation (PVC gives a characteristic sharp, chemical odour when heated beyond its rating)</li>
                <li className="pl-1"><strong>Fishy smell:</strong> Thermal decomposition of certain thermoplastic materials or electronic components — often from overheated circuit boards or failing capacitors</li>
                <li className="pl-1"><strong>Ozone smell:</strong> Electric arcing produces ozone (O3), which has a sharp, clean smell — detectable near switchgear that has experienced flashover</li>
                <li className="pl-1"><strong>Hot metal smell:</strong> Overheating of conductors, busbars or motor windings carrying excessive current</li>
              </ul>
            </div>

            <p>
              Tactile indicators should be used with extreme caution and only on equipment that is confirmed safe to touch. The exterior of enclosures, motor housings and cable runs can be assessed for abnormal temperature. A motor housing that is too hot to hold your hand against for more than a few seconds is likely overheating — normal operating temperature for most industrial motors is 40 to 80 degrees Celsius above ambient, depending on insulation class.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety note:</strong> Never rely on touch to assess whether a conductor is energised. Only use touch for temperature assessment on confirmed dead circuits or the external surfaces of earthed metalwork. Always use an approved voltage indicator to determine whether a circuit is live.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Operator Interviews and Information Gathering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The person who was present when the fault occurred is your most valuable source of information. Operators, production staff and building users often observe critical details that are no longer visible by the time you arrive. An effective operator interview is a structured conversation — not a casual chat — that extracts the maximum diagnostic value from the operator's experience.
            </p>
            <p>
              Many technicians undervalue this step, viewing operator accounts as unreliable or vague. In reality, operators work with their equipment every day and are often acutely aware of subtle changes in behaviour — a slightly different sound, a brief flicker, a momentary hesitation — that are enormously significant diagnostically. Your job is to ask the right questions to unlock this information.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Questions for Operator Interviews</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>"What exactly happened?"</strong> — Let the operator describe the event in their own words first</li>
                <li className="pl-1"><strong>"When did it start?"</strong> — Establish the timeline: sudden failure or gradual deterioration?</li>
                <li className="pl-1"><strong>"What was happening at the time?"</strong> — Was the equipment starting up, at full load, during a changeover?</li>
                <li className="pl-1"><strong>"Did you notice anything unusual beforehand?"</strong> — Sounds, smells, vibrations, flickering, performance changes</li>
                <li className="pl-1"><strong>"Has this happened before?"</strong> — Recurring faults suggest a root cause that previous repairs did not address</li>
                <li className="pl-1"><strong>"Has anything changed recently?"</strong> — New equipment, building works, weather changes, different product or process</li>
                <li className="pl-1"><strong>"Did you do anything after the fault occurred?"</strong> — Reset attempts, switching operations, moving equipment</li>
              </ul>
            </div>

            <p>
              Beyond the operator interview, you should review all available documentation. Maintenance logs and previous fault reports may reveal a pattern. If the same motor has tripped on overload three times in the past month, the root cause may be mechanical (bearing wear increasing current draw) rather than electrical. Equipment manuals may list known fault conditions and their symptoms. Alarm logs from Building Management Systems (BMS) or Supervisory Control and Data Acquisition (SCADA) systems can provide timestamped data showing the exact sequence of events leading to the fault.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Information Sources for Initial Assessment</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Operator account:</strong> First-hand description of the fault event and preceding conditions</li>
                <li className="pl-1"><strong>Maintenance history:</strong> Previous faults, repairs and component replacements on the same equipment</li>
                <li className="pl-1"><strong>Equipment manuals:</strong> Manufacturer fault codes, diagnostic procedures and known issues</li>
                <li className="pl-1"><strong>Alarm and event logs:</strong> BMS, SCADA, PLC fault registers and drive fault codes</li>
                <li className="pl-1"><strong>Circuit drawings:</strong> Schematic and wiring diagrams showing the circuit topology</li>
                <li className="pl-1"><strong>Previous test results:</strong> Baseline insulation resistance, earth loop impedance and RCD test data</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never dismiss an operator's account because it uses non-technical language. "It made a funny noise and then went bang" is a technically meaningful description — it suggests a progressive fault condition (unusual noise) followed by a catastrophic failure (short circuit or mechanical seizure).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interpreting Trip Indicators and Alarm Data
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern protective devices and control systems provide a wealth of diagnostic information if you know how to read them. Before any physical testing, checking trip indicators, fault codes and alarm logs can immediately narrow your diagnosis. This is one of the most efficient steps in the initial assessment — yet it is frequently overlooked by less experienced technicians.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protective Device Trip Indicators</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Indicator</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Tells You</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCCB with trip flag</td>
                      <td className="border border-white/10 px-3 py-2">Overload / Short circuit indicator</td>
                      <td className="border border-white/10 px-3 py-2">Whether the fault is high current (short) or sustained overcurrent (overload)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD</td>
                      <td className="border border-white/10 px-3 py-2">Test button / trip indicator</td>
                      <td className="border border-white/10 px-3 py-2">Earth leakage exceeding rated residual current (typically 30 mA for personal protection)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor overload relay</td>
                      <td className="border border-white/10 px-3 py-2">Trip flag / reset button position</td>
                      <td className="border border-white/10 px-3 py-2">Motor current exceeded the overload setting for the thermal trip time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variable speed drive</td>
                      <td className="border border-white/10 px-3 py-2">Fault code on display</td>
                      <td className="border border-white/10 px-3 py-2">Specific fault type — overcurrent, overvoltage, earth fault, overtemperature, etc.</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PLC / Controller</td>
                      <td className="border border-white/10 px-3 py-2">Fault LED / diagnostic register</td>
                      <td className="border border-white/10 px-3 py-2">Input/output failure, communication loss, programme error, watchdog timeout</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Variable speed drives are particularly helpful during initial assessment because they store fault histories. Most modern drives record the last several fault events with timestamps and operating conditions at the time of the fault — such as motor current, DC bus voltage, output frequency and motor temperature. Accessing this fault log is often the single most informative step in diagnosing a drive-related issue. Refer to the manufacturer's manual for the specific fault code meanings, as these vary between manufacturers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reading the Evidence</p>
              <p className="text-sm text-white mb-3">
                When you arrive at a fault, think of it as a detective arriving at a scene. The evidence is all around you — you just need to know where to look and what it means. A systematic scan of all available indicators takes only a few minutes but can save hours of unnecessary testing.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Check all protective device positions and trip indicators in the relevant distribution board</li>
                <li className="pl-1">Read any fault codes displayed on drives, PLCs or other intelligent devices</li>
                <li className="pl-1">Review BMS or SCADA alarm logs for the time period around the fault</li>
                <li className="pl-1">Check if other equipment on the same supply has been affected (indicating a supply problem)</li>
                <li className="pl-1">Note the position of any manual switches, selector switches or control buttons</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Trip indicators tell you what the protective device detected, not necessarily the root cause. An overload trip on a motor may be caused by a mechanical problem (seized bearing), an electrical problem (single-phasing), or even an incorrect overload setting. The trip indicator narrows the search — it does not complete it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Safe Approach and Preliminary Checks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Throughout the initial assessment, safety must remain the overriding priority. The urgency to restore service must never compromise safe working practices. The Electricity at Work Regulations 1989 place an absolute duty on all persons to take precautions against electrical danger — and this duty applies equally during fault diagnosis as it does during planned maintenance.
            </p>
            <p>
              Before beginning any physical investigation, carry out a dynamic risk assessment. Consider what hazards are present, what condition the equipment is in, and whether it is safe to approach. Equipment that has suffered a short circuit or arc flash may have damaged enclosures, exposed conductors, or compromised protective devices. Never assume that a tripped circuit breaker has successfully disconnected the supply — always prove dead.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safe Initial Assessment Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Dynamic risk assessment:</strong> Identify hazards in the immediate area — electrical, mechanical, chemical, environmental</li>
                <li className="pl-1"><strong>Safe isolation:</strong> Isolate the circuit, lock off, and prove dead before opening any enclosure (GS38 compliance)</li>
                <li className="pl-1"><strong>PPE assessment:</strong> Determine appropriate PPE for the task — arc flash rated if working near energised equipment</li>
                <li className="pl-1"><strong>Accompaniment:</strong> For high-risk investigations (HV, confined spaces), ensure a second competent person is present</li>
                <li className="pl-1"><strong>Communication:</strong> Inform the relevant persons that you are investigating a fault and the equipment is isolated</li>
                <li className="pl-1"><strong>Escape route:</strong> Ensure you have a clear exit path from the work area</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">What You CAN Do Energised</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Visual observation from a safe distance</li>
                  <li className="pl-1">Listening for unusual sounds</li>
                  <li className="pl-1">Reading panel instruments and displays</li>
                  <li className="pl-1">Checking indicator lights and alarm panels</li>
                  <li className="pl-1">Interviewing operators</li>
                  <li className="pl-1">Reviewing logs and documentation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-red-400 mb-2">What Requires Isolation First</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Opening any electrical enclosure</li>
                  <li className="pl-1">Touching any conductor or termination</li>
                  <li className="pl-1">Disconnecting cables or components</li>
                  <li className="pl-1">Carrying out insulation resistance tests</li>
                  <li className="pl-1">Replacing any component</li>
                  <li className="pl-1">Working inside a panel or distribution board</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Regulation 14 — Live Working</p>
              <p className="text-sm text-white">
                Some diagnostic procedures may require the circuit to be energised — for example, measuring supply voltage, checking phase rotation, or monitoring current draw under load. Regulation 14 of the Electricity at Work Regulations 1989 permits live working only when it is unreasonable to work dead, it is reasonable to work live, and suitable precautions are in place. For fault diagnosis, live measurements may be justified, but the decision must be documented and appropriate controls must be in place, including insulated tools, barriers, and competent supervision.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> The initial assessment phase should result in a documented preliminary diagnosis — your best hypothesis based on the available evidence. This hypothesis then guides your systematic testing in the next phase. Write it down: "Based on the operator report, the overload trip on the motor starter, and the discolouration observed at the T2 terminal, the preliminary diagnosis is a high-resistance connection at the motor terminal box causing single-phase running under load."
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">Initial Assessment Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Dynamic risk assessment and safe approach</li>
                  <li>2. Interview the operator / person reporting the fault</li>
                  <li>3. Visual and sensory observation from a safe distance</li>
                  <li>4. Check trip indicators, fault codes, alarm logs</li>
                  <li>5. Review maintenance history and previous faults</li>
                  <li>6. Form preliminary hypothesis and document findings</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>EAWR 1989 — Reg 4(3) safe systems; Reg 14 live working</li>
                  <li>GS38 — Voltage indicator requirements for proving dead</li>
                  <li>BS 7671:2018+A2:2022 — Reg 134.1.1 competent persons</li>
                  <li>HSG85 — Safe working practices</li>
                  <li>ST1426 — Fault diagnosis KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-2">
              Next: Systematic Diagnostic Approach
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section3_1;
