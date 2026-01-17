import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety During Testing - Inspection & Testing";
const DESCRIPTION = "Essential safety procedures for electrical inspection and testing, including hazard identification, safe isolation, PPE requirements, and emergency response.";

const quickCheckQuestions = [
  {
    id: "let-go-threshold",
    question: "What is the let-go threshold current for most adults at 50Hz AC?",
    options: ["1mA", "5mA", "10mA", "30mA"],
    correctIndex: 2,
    explanation: "Around 10mA at 50Hz is the typical let-go threshold - above this level, muscle contraction prevents the person from releasing the conductor."
  },
  {
    id: "live-working",
    question: "When is live working permitted under EAW Regulations?",
    options: ["Never - it's always prohibited", "When it's more convenient", "When it's unreasonable to work dead AND suitable precautions are taken", "Whenever the client requests it"],
    correctIndex: 2,
    explanation: "Regulation 14 permits live working only when it's unreasonable to work dead AND suitable precautions are taken to prevent injury."
  },
  {
    id: "shock-response",
    question: "What should you do first if someone receives an electric shock?",
    options: ["Start CPR immediately", "Call an ambulance", "Safely isolate the supply or remove them from contact", "Check their pulse"],
    correctIndex: 2,
    explanation: "The priority is to safely break the circuit - isolate the supply or remove the person from contact using non-conductive material. Never touch them while they're in contact with the source."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which voltage level is considered 'low voltage' in the UK?",
    options: ["Up to 50V", "Up to 230V", "Up to 1000V AC or 1500V DC", "Up to 11kV"],
    correctAnswer: 2,
    explanation: "Low voltage is defined as up to 1000V AC or 1500V DC. Standard 230V/400V supplies are 'low voltage' despite being potentially lethal."
  },
  {
    id: 2,
    question: "The minimum touch voltage considered safe in normal dry conditions is:",
    options: ["12V AC", "25V AC", "50V AC", "120V AC"],
    correctAnswer: 2,
    explanation: "50V AC is generally considered the safe touch voltage threshold in normal dry conditions. Lower limits apply in wet or high-risk environments."
  },
  {
    id: 3,
    question: "Arc flash is most likely to occur when:",
    options: ["Using low-powered equipment", "Working on isolated circuits", "Working on or near energised high-current equipment", "Testing with a voltage indicator"],
    correctAnswer: 2,
    explanation: "Arc flash occurs when high fault currents ionize air between conductors. It's most dangerous at distribution boards and high-current equipment."
  },
  {
    id: 4,
    question: "GS38 compliant test probes have finger guards and a maximum exposed tip of:",
    options: ["2mm", "4mm", "10mm", "No limit specified"],
    correctAnswer: 1,
    explanation: "GS38 specifies maximum 4mm exposed probe tip with finger guards to prevent accidental contact with live parts."
  },
  {
    id: 5,
    question: "What class of insulating gloves is required for 230V/400V testing?",
    options: ["Class 00", "Class 0", "Class 1", "Class 2"],
    correctAnswer: 1,
    explanation: "Class 0 gloves are rated to 1000V AC and suitable for low voltage work. They must be tested/inspected before each use."
  },
  {
    id: 6,
    question: "A permit to work system is typically required for:",
    options: ["All electrical work", "Domestic installations only", "High-risk activities like live working or work on HV systems", "Only construction sites"],
    correctAnswer: 2,
    explanation: "Permits to work provide formal control for high-risk activities, documenting hazards, precautions, and authorisation."
  },
  {
    id: 7,
    question: "How should you remove someone who is in contact with a live conductor?",
    options: ["Grab their clothing and pull", "Use a non-conductive item to break contact", "Push them away with your hands", "Wait until power is automatically cut off"],
    correctAnswer: 1,
    explanation: "Use a non-conductive item (wooden broom, plastic chair, dry rope) to break contact. Never touch them directly while they're in contact with the live source."
  },
  {
    id: 8,
    question: "RIDDOR requires reporting of electrical accidents that result in:",
    options: ["Any injury at all", "Over 7 days incapacity, specified injuries, or death", "Only death", "Only hospital treatment"],
    correctAnswer: 1,
    explanation: "RIDDOR requires reporting of deaths, specified injuries, and injuries causing over 7 days' incapacity. Some near-miss dangerous occurrences must also be reported."
  },
  {
    id: 9,
    question: "When testing RCDs, the risk of electric shock to the tester is:",
    options: ["Eliminated completely", "Present until the RCD trips", "Only present if the RCD fails to trip", "Not a concern at 30mA"],
    correctAnswer: 1,
    explanation: "During RCD testing, the test instrument draws current through the earth path. The tester is at risk until the RCD operates. This is why we test with escalating currents."
  },
  {
    id: 10,
    question: "The two-person rule for live working requires:",
    options: ["Two people to share the workload", "A second competent person present who can isolate supply and provide first aid", "Two sets of test equipment", "Two separate isolation points"],
    correctAnswer: 1,
    explanation: "The second person must be competent to isolate the supply in an emergency and provide first aid if required. They should not be distracted by other tasks."
  }
];

const faqs = [
  {
    question: "When is it acceptable to work live?",
    answer: "Live working is only permitted under Regulation 14 of EAW when it's unreasonable to work dead AND all suitable precautions are taken. Examples include fault-finding that requires the circuit to be energised, or testing that can only be done live. A risk assessment must justify the decision."
  },
  {
    question: "What PPE do I need for electrical testing?",
    answer: "For standard low voltage testing: safety boots, appropriate clothing (avoid loose items), safety glasses, and GS38 compliant test equipment. For work near exposed live parts: Class 0 insulating gloves, face shield, and flame-resistant clothing may be needed based on risk assessment."
  },
  {
    question: "Do I need to isolate every circuit before testing?",
    answer: "Dead tests (continuity, insulation resistance) require isolation. Live tests (loop impedance, RCD) obviously require the supply connected. The sequence in BS 7671 ensures dead tests are completed first, confirming the circuit is safe before live testing."
  },
  {
    question: "What should I do if I discover a dangerous situation?",
    answer: "Make it safe if you can do so without risk to yourself - isolate the supply, apply warning labels. If you can't make it safe, warn others and prevent access to the danger. Report to the duty holder/client. Never leave a known dangerous situation unaddressed."
  },
  {
    question: "How do I perform a risk assessment for electrical testing?",
    answer: "Identify hazards (shock, arc flash, burns, falls), assess who might be harmed, evaluate the risks and existing controls, implement additional controls if needed, record significant findings, and review regularly. Consider the specific nature of the installation and environment."
  },
  {
    question: "What training is required for electrical testing?",
    answer: "Formal qualifications like 2391 demonstrate competence in testing. You also need training in safe isolation procedures, first aid awareness (ideally specific to electrical injuries), and understanding of relevant regulations. Competence includes experience as well as qualifications."
  }
];

const referenceItems = [
  { label: "Safe voltage", value: "50V AC (dry conditions)" },
  { label: "Let-go threshold", value: "~10mA at 50Hz" },
  { label: "Fibrillation", value: ">30mA through heart" },
  { label: "EAW Reg 14", value: "Live working restrictions" },
  { label: "GS38", value: "Test equipment guidance" },
  { label: "Class 0 gloves", value: "1000V AC rated" },
  { label: "CAT III 300V", value: "Minimum for LV testing" },
  { label: "RIDDOR", value: "Incident reporting" },
  { label: "Two-person rule", value: "Required for live work" },
];

const InspectionTestingModule1Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1">
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
            <span>Module 1 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety During Testing
          </h1>
          <p className="text-white/80">
            Understanding electrical hazards and implementing safe systems of work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Electricity kills:</strong> Even LV can cause fatal injuries</li>
              <li><strong>Safe isolation:</strong> Prove-test-prove every time</li>
              <li><strong>Live work:</strong> Only when absolutely necessary</li>
              <li><strong>PPE:</strong> Last line of defence, not first</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Numbers</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>50V AC:</strong> Safe touch voltage (dry)</li>
              <li><strong>10mA:</strong> Let-go threshold</li>
              <li><strong>30mA:</strong> Fibrillation risk</li>
              <li><strong>Class 0:</strong> Gloves for 1000V AC</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify hazards during electrical testing",
              "Apply safe isolation procedures correctly",
              "Select appropriate PPE for testing activities",
              "Understand live working restrictions",
              "Implement safe systems of work",
              "Respond correctly to electrical emergencies"
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

        {/* Section 01: Hazards During Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Hazards During Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical testing exposes workers to several serious hazards. Understanding these risks is the first step in preventing injuries.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary Electrical Hazards</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">Electric Shock</p>
                  <p className="text-sm text-white/70">Current passing through the body causing injury or death. Severity depends on current magnitude, path, and duration.</p>
                </div>
                <div>
                  <p className="text-orange-400 font-semibold text-sm mb-1">Arc Flash</p>
                  <p className="text-sm text-white/70">Explosive release of energy when current arcs through air. Causes severe burns, blast injuries, and can ignite clothing.</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Electrical Burns</p>
                  <p className="text-sm text-white/70">Burns from current passing through tissue or from arc flash heat. Internal burns may not be immediately visible.</p>
                </div>
                <div>
                  <p className="text-purple-400 font-semibold text-sm mb-1">Secondary Injuries</p>
                  <p className="text-sm text-white/70">Falls from height after shock, injuries from sudden muscle contraction, panic-related accidents.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effects of Electric Current on the Body</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-white">Current (mA)</th>
                      <th className="text-left py-2 text-white/80">Effect at 50Hz AC</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-elec-yellow">1</td>
                      <td>Perception threshold - tingling sensation</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-elec-yellow">5</td>
                      <td>Painful shock</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-orange-400">10</td>
                      <td>Let-go threshold - muscles contract, cannot release</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-red-400">30</td>
                      <td>Respiratory paralysis possible</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-red-400">100+</td>
                      <td>Ventricular fibrillation likely - cardiac arrest</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Safe Isolation Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safe Isolation Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Safe isolation</strong> is the process of disconnecting electrical equipment from all sources of supply and taking steps to ensure it cannot become live during work.
            </p>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-white font-semibold">GS38 Golden Rule</p>
              <p className="text-white/80 mt-2 italic">
                "Always assume circuits are live until proven dead, and proven to remain dead."
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safe Isolation Procedure</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><span className="text-elec-yellow">1.</span> <strong>Identify</strong> - Identify all sources of supply to the equipment/circuit</li>
                <li><span className="text-elec-yellow">2.</span> <strong>Isolate</strong> - Disconnect from all sources using a suitable device</li>
                <li><span className="text-elec-yellow">3.</span> <strong>Secure</strong> - Apply lock-off devices and warning labels</li>
                <li><span className="text-elec-yellow">4.</span> <strong>Prove</strong> - PROVE voltage indicator on known live source</li>
                <li><span className="text-elec-yellow">5.</span> <strong>Test</strong> - TEST the circuit is dead at the point of work</li>
                <li><span className="text-elec-yellow">6.</span> <strong>Re-prove</strong> - RE-PROVE voltage indicator still works on known live source</li>
              </ol>
            </div>

            <p className="text-sm text-orange-400/90">
              <strong>Never rely on</strong> neon indicators, circuit breaker positions, or statements from others that a circuit is dead. Always prove dead yourself using approved test equipment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Personal Protective Equipment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Personal Protective Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PPE is the last line of defence - it doesn't eliminate the hazard but protects you if other controls fail. PPE must be appropriate for the specific hazards present.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard PPE for Electrical Testing</p>
              <div className="space-y-3">
                <div>
                  <p className="text-white font-semibold text-sm">Safety Glasses/Goggles</p>
                  <p className="text-sm text-white/70">Protection from arc flash, flying debris, and particles when working in enclosures</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Class 0 Insulating Gloves</p>
                  <p className="text-sm text-white/70">1000V AC rated for low voltage work. Must be tested before each use and free from damage.</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Safety Footwear</p>
                  <p className="text-sm text-white/70">Insulated safety boots with non-conductive soles. Protect against crush hazards and provide stability.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional PPE for High-Risk Work</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Arc flash suit:</strong> For high fault current environments</li>
                <li><strong>Face shield:</strong> When exposed live parts are accessible</li>
                <li><strong>Flame-resistant clothing:</strong> For arc flash protection</li>
                <li><strong>Insulating matting:</strong> Additional protection on conductive floors</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Glove Testing</p>
              <p className="text-sm text-white/80">Before each use, insulating gloves must be inspected:</p>
              <ul className="text-sm text-white space-y-1 ml-4 mt-2">
                <li>Visual check for cuts, punctures, tears, or embedded objects</li>
                <li>Air test - roll from cuff, trap air, check for leaks</li>
                <li>Check within retest date (6 months for Class 0)</li>
                <li>Store flat, away from sunlight and ozone sources</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04: Live Testing Restrictions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Live Testing Restrictions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Regulation 14</strong> of the Electricity at Work Regulations covers work on or near live conductors. The default position is that live working is prohibited unless specific conditions are met.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 my-6">
              <p className="text-white italic">
                <strong>Regulation 14:</strong> "No person shall be engaged in any work activity on or so near any live conductor... that danger may arise unless:
              </p>
              <ul className="mt-2 ml-4 text-white/80 text-sm">
                <li>(a) it is unreasonable in all the circumstances for it to be dead; and</li>
                <li>(b) it is reasonable in all the circumstances for work to be done on or near it while live; and</li>
                <li>(c) suitable precautions are taken to prevent injury."</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Live Work May Be Justified</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fault-finding that requires the circuit to be energised</li>
                <li>Live testing (loop impedance, RCD tests, PFC)</li>
                <li>Where isolation would create greater danger</li>
                <li>Essential continuous processes where shutdown is unreasonable</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Required Precautions for Live Work</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Formal risk assessment and method statement</li>
                <li><strong>Two-person rule</strong> - second competent person to isolate and give first aid</li>
                <li>GS38 compliant test equipment</li>
                <li>Appropriate PPE for the hazards present</li>
                <li>Barriers and warning notices</li>
                <li>Escape route maintained clear</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Safe Systems of Work */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Safe Systems of Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A <strong>safe system of work</strong> is a formal procedure resulting from systematic examination of work activities to identify hazards and implement controls.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Elements of a Safe System</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Lock-Off Procedures</p>
                  <p className="text-sm text-white/70">Physical locks preventing re-energisation. Personal padlocks - one person, one lock.</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Warning Signs</p>
                  <p className="text-sm text-white/70">Labels identifying isolated equipment and prohibition of switching on.</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Permits to Work</p>
                  <p className="text-sm text-white/70">Formal written authorisation for high-risk activities.</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Supervision</p>
                  <p className="text-sm text-white/70">Appropriate level of supervision based on risk and competence.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Permit to Work Systems</p>
              <p className="text-sm text-white/80">Permits are formal documents that specify:</p>
              <ul className="text-sm text-white space-y-1 ml-4 mt-2">
                <li>The work to be done and its location</li>
                <li>Hazards identified and controls implemented</li>
                <li>Isolation points and their status</li>
                <li>PPE and precautions required</li>
                <li>Time limitations</li>
                <li>Signatures of issuing and receiving persons</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Emergency Response */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Emergency Response
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Knowing how to respond to electrical emergencies can save lives. Preparation and quick action are essential.
            </p>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-white font-semibold mb-2">If Someone Receives an Electric Shock</p>
              <ol className="text-sm text-white/80 space-y-2 ml-4">
                <li><span className="text-red-400 font-bold">1.</span> <strong>DON'T TOUCH THEM</strong> until you've broken the contact</li>
                <li><span className="text-red-400 font-bold">2.</span> <strong>Isolate the supply</strong> if you can do so safely and quickly</li>
                <li><span className="text-red-400 font-bold">3.</span> <strong>If you can't isolate</strong>, use non-conductive material to move them from the source</li>
                <li><span className="text-red-400 font-bold">4.</span> <strong>Call 999</strong> and state it's an electrical injury</li>
                <li><span className="text-red-400 font-bold">5.</span> <strong>Begin CPR</strong> if they're not breathing normally</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RIDDOR Reporting</p>
              <p className="text-sm text-white/80">
                Under <strong>RIDDOR</strong> (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations), you must report:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4 mt-2">
                <li>Deaths</li>
                <li>Specified injuries (fractures, amputations, loss of sight, etc.)</li>
                <li>Over-7-day incapacitation</li>
                <li>Dangerous occurrences (near misses with potential for serious harm)</li>
                <li>Occupational diseases</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">First Aid Considerations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cardiac arrest</strong> can occur even after apparent recovery - always seek medical attention</li>
                <li><strong>Internal burns</strong> may not be visible - entry and exit wounds may appear minor</li>
                <li><strong>Don't cool</strong> electrical burns with water until sure victim is clear of electrical contact</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Starting Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess the risks and plan the work</li>
                <li>Confirm isolation arrangements with the duty holder</li>
                <li>Check your test equipment is in good condition</li>
                <li>Know where the nearest first aider is located</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Safety Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assuming a circuit is dead because a switch is off</li>
                <li>Not proving the voltage indicator works</li>
                <li>Working alone on high-risk activities</li>
                <li>Rushing and taking shortcuts</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always assume circuits are live until proven dead</li>
                <li>Use the prove-test-prove method every time</li>
                <li>Don't work beyond your competence</li>
                <li>If in doubt, ask or stop work</li>
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

        {/* Reference Card */}
        <section className="mb-10">
          <UnitsPocketCard
            title="Safety Reference"
            items={referenceItems}
          />
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
            <Link to="/study-centre/upskilling/inspection-testing/module-1/section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1/section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule1Section4;
