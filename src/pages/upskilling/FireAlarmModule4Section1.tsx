import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Primary Power Supplies - Fire Alarm Module 4 Section 1";
const DESCRIPTION = "Learn about mains supply requirements, PSU ratings, load calculations, monitoring and UK compliance for BS 5839-1 fire alarm systems.";

const quickCheckQuestions = [
  {
    id: "psu-monitoring",
    question: "Power supplies should be monitored for:",
    options: [
      "Voltage only",
      "Presence, fault and battery condition",
      "Frequency only",
      "Nothing is monitored"
    ],
    correctIndex: 1,
    explanation: "BS 5839-1 expects monitoring of supply presence and faults; battery condition is also monitored by the CIE."
  },
  {
    id: "load-calc",
    question: "Load calculations must consider:",
    options: [
      "Standby only",
      "Alarm only",
      "Both standby and alarm currents including safety factors",
      "Charger current only"
    ],
    correctIndex: 2,
    explanation: "You must calculate both standby and full alarm current and include appropriate margins."
  },
  {
    id: "rcd-protection",
    question: "RCD protection on fire alarm mains supply should be:",
    options: [
      "Always fitted",
      "Avoided or coordinated per BS 5839-1 to prevent nuisance disconnection",
      "Set to 10mA",
      "Required by BS 7671 in all cases"
    ],
    correctIndex: 1,
    explanation: "BS 5839-1 advises avoiding RCD protection where possible, or using time-delayed types to prevent unwanted tripping affecting life safety systems."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Power supplies should be monitored for:",
    options: ["Voltage only", "Presence, fault and battery condition", "Frequency only", "Nothing is monitored"],
    correctAnswer: 1,
    explanation: "BS 5839-1 expects monitoring of supply presence and faults; battery condition is also monitored by the CIE."
  },
  {
    id: 2,
    question: "Load calculations must consider:",
    options: ["Standby only", "Alarm only", "Both standby and alarm currents including safety factors", "Charger current only"],
    correctAnswer: 2,
    explanation: "You must calculate both standby and full alarm current and include appropriate margins."
  },
  {
    id: 3,
    question: "Mains supply for CIE should generally be taken from:",
    options: ["A socket ring final", "A local lighting circuit", "A dedicated, labelled circuit from the distribution board", "Any convenient spur"],
    correctAnswer: 2,
    explanation: "A dedicated, labelled circuit is typical good practice to avoid inadvertent isolation."
  },
  {
    id: 4,
    question: "Voltage drop on alarm circuits should be:",
    options: ["Ignored", "Within manufacturer limits to ensure device operation", "Above 10V", "Exactly 0V"],
    correctAnswer: 1,
    explanation: "Keep within device and panel instructions so sounders/VADs and interfaces operate correctly."
  },
  {
    id: 5,
    question: "Which UK wiring regulation addresses prevention of premature collapse of cables?",
    options: ["BS 7671 411.3.3", "BS 7671 521.10.202", "BS 7671 433.1", "BS 7671 560.7.1"],
    correctAnswer: 1,
    explanation: "BS 7671 Reg 521.10.202 requires suitable metallic fixings/supports so wiring systems do not collapse in fire."
  },
  {
    id: 6,
    question: "Preferred isolation for the fire alarm mains supply is:",
    options: ["Unlabelled MCB anywhere", "A clearly labelled, lockable device at the origin or local DB", "A plug and socket", "A spur with neon"],
    correctAnswer: 1,
    explanation: "Provide a labelled isolator; avoid accidental disconnection and follow manufacturer guidance."
  },
  {
    id: 7,
    question: "RCD protection on fire alarm mains supply should be:",
    options: ["Always fitted", "Avoided or coordinated per BS 5839-1 to prevent nuisance disconnection", "Set to 10mA", "Required by BS 7671 in all cases"],
    correctAnswer: 1,
    explanation: "BS 5839-1 advises avoiding RCD protection where possible, or using time-delayed types to prevent unwanted tripping affecting life safety systems."
  },
  {
    id: 8,
    question: "PSU rating selection should:",
    options: ["Exactly match calculated alarm current with no margin", "Exceed calculated loads with allowance for diversity and growth", "Ignore standby consumption", "Be based on cable size only"],
    correctAnswer: 1,
    explanation: "Allow headroom for real-world variation, manufacturer advice and future expansion."
  },
  {
    id: 9,
    question: "Supply circuit identification should include:",
    options: ["No special label", "A durable label stating Fire Alarm - Do Not Switch Off", "Pencil marks", "Temporary tape"],
    correctAnswer: 1,
    explanation: "Clear, durable labelling helps prevent inadvertent isolation."
  },
  {
    id: 10,
    question: "When verifying PSU capacity during commissioning, you should measure:",
    options: ["Mains voltage only", "Standby current and full alarm current with all devices operating", "Battery voltage only", "Cable resistance only"],
    correctAnswer: 1,
    explanation: "Practical verification involves measuring actual currents in both standby and full alarm conditions to confirm calculations and PSU adequacy."
  }
];

const faqs = [
  {
    question: "Can I use a shared socket circuit for the fire alarm?",
    answer: "No - use a dedicated, labelled circuit from the distribution board to prevent inadvertent isolation."
  },
  {
    question: "How much PSU margin should I allow?",
    answer: "Follow manufacturer guidance; commonly 20-50% depending on loads and future expansion needs."
  },
  {
    question: "Does BS 7671 apply to fire alarm power supplies?",
    answer: "Yes - supply cabling, earthing, identification and fixings must all comply with BS 7671."
  },
  {
    question: "What labelling is required at the supply isolator?",
    answer: "A durable label stating 'Fire Alarm - Do Not Switch Off' or similar wording."
  },
  {
    question: "Should I fit an RCD on the fire alarm circuit?",
    answer: "Generally avoid RCDs if possible; if required, use time-delayed (S-type) to prevent nuisance tripping."
  },
  {
    question: "How do I verify PSU adequacy during commissioning?",
    answer: "Measure actual standby and alarm currents with all devices operating and compare to PSU rating."
  }
];

const FireAlarmModule4Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-4">
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
            <span>Module 4 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Primary Power Supplies
          </h1>
          <p className="text-white/80">
            Mains supply requirements, PSU ratings and load calculations for BS 5839-1
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Dedicated circuit:</strong> Labelled, from distribution board</li>
              <li><strong>PSU capacity:</strong> Cover standby + alarm with margin</li>
              <li><strong>Monitoring:</strong> Supply presence, faults, battery condition</li>
              <li><strong>RCDs:</strong> Avoid or use time-delayed types</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> "Fire Alarm - Do Not Switch Off" label</li>
              <li><strong>Use:</strong> Calculate standby + alarm loads</li>
              <li><strong>Apply:</strong> 20-50% PSU margin for growth</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify suitable mains supply arrangements and isolation requirements",
              "Calculate PSU loading for standby and alarm conditions",
              "Apply voltage drop limits to ensure device performance",
              "Implement monitoring and fault indication requirements",
              "Coordinate fire alarm supplies with BS 7671 requirements",
              "Verify and document power supply arrangements during commissioning"
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

        {/* Section 01: Mains Supply Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Mains Supply Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire alarm control and indicating equipment (CIE) requires a reliable mains supply that cannot be inadvertently disconnected. BS 5839-1 and BS 7671 both influence the design of this supply.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Dedicated circuit from the distribution board with local means of isolation</li>
                <li>Clear, durable labelling: "Fire Alarm - Do Not Switch Off"</li>
                <li>Isolator in a secure location accessible only to authorised personnel</li>
                <li>Protective device ratings per manufacturer recommendations</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: RCD Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RCD Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Residual current devices (RCDs) can cause unwanted tripping of fire alarm supplies. BS 5839-1 provides specific guidance on their use.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>BS 5839-1 Recommendation:</strong> Where possible, avoid RCD protection on fire alarm circuits. If required, use time-delayed types (S-type) and ensure discrimination with downstream devices.
              </p>
            </div>

            <p>
              The risk of an RCD tripping and disabling the fire alarm system may outweigh the shock protection benefits in many installations. Document your decision and coordinate with BS 7671 requirements.
            </p>
          </div>
        </section>

        {/* Section 03: Load Calculation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Load Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate load calculations ensure the PSU can support the system in all operating conditions. Calculate separately for standby and alarm modes.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standby Current</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Panel quiescent current</li>
                  <li>Loop device currents (all detectors, interfaces)</li>
                  <li>Ancillary equipment (repeaters, graphics)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Alarm Current</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All sounders and VADs at full output</li>
                  <li>Relay and interface activation</li>
                  <li>Panel in alarm mode</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Worked Example */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Worked Example: PSU Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-3">Example Calculation:</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>Standby loads:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>Panel quiescent: 120mA</li>
                  <li>Loop devices: 280mA</li>
                  <li>Interfaces: 50mA</li>
                  <li><strong>Total standby: 450mA</strong></li>
                </ul>
                <p className="mt-3"><strong>Alarm loads:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>Sounders/VADs: 1.6A</li>
                  <li>Relays: 150mA</li>
                  <li>Panel alarm mode: 200mA</li>
                  <li><strong>Total alarm: 1.95A</strong></li>
                </ul>
                <p className="mt-3 text-elec-yellow">
                  <strong>Specification:</strong> PSU rated minimum 2A continuous with surge capacity per manufacturer data. Consider 2.5A or 3A for headroom.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Voltage Drop Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Voltage Drop Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Excessive voltage drop can prevent sounders, VADs and interfaces from operating correctly during alarm conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate for worst-case alarm current and longest cable run</li>
                <li>Check manufacturer minimum operating voltage for each device type</li>
                <li>Allow for battery end-of-discharge voltage, not just nominal voltage</li>
                <li>Consider using larger cable CSA or multiple circuits for long runs</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Monitoring and Fault Indication */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Monitoring and Fault Indication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5839-1 requires comprehensive monitoring of power supply status with clear indication at the CIE.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monitored Conditions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Mains supply presence (healthy/failed)</li>
                  <li>Battery condition (healthy/fault/low)</li>
                  <li>Charger operation (charging/fault)</li>
                  <li>PSU output voltage and load</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Verification</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simulate mains failure - verify battery changeover</li>
                  <li>Confirm fault indications display correctly</li>
                  <li>Measure charger voltage and current</li>
                  <li>Check labels on supply isolator</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Document all load calculations in the design documentation</li>
                <li>Specify PSU with adequate margin for future expansion</li>
                <li>Consider voltage drop on long sounder circuits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify supply circuit is dedicated and correctly labelled</li>
                <li>Check protective device rating matches specification</li>
                <li>Ensure adequate cable size for calculated loads</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersized PSU</strong> - leading to brownouts during alarm</li>
                <li><strong>Supply from shared circuits</strong> - can be inadvertently switched off</li>
                <li><strong>Ignoring voltage drop</strong> - on long sounder/VAD circuits causing device malfunction</li>
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
                <p className="font-medium text-white mb-1">Supply Requirements</p>
                <ul className="space-y-0.5">
                  <li>Dedicated circuit from DB</li>
                  <li>Labelled isolator</li>
                  <li>Avoid RCDs where possible</li>
                  <li>S-type if RCD required</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">PSU Sizing</p>
                <ul className="space-y-0.5">
                  <li>Calculate standby + alarm</li>
                  <li>Add 20-50% margin</li>
                  <li>Check voltage drop</li>
                  <li>Verify during commissioning</li>
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
            <Link to="/electrician/upskilling/fire-alarm-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule4Section1;
