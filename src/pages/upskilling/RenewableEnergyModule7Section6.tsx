import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety, Isolation, and Working Procedures - Renewable Energy Module 7";
const DESCRIPTION =
  "Essential safety procedures for working on renewable energy systems including isolation protocols, lockout/tagout, PPE requirements, and hazard assessment.";

const quickCheckQuestions = [
  {
    id: "safety-qc1",
    question: "What is the correct sequence for isolating a PV system?",
    options: [
      "DC first, then AC",
      "AC first, then DC",
      "Either order is acceptable",
      "Only AC isolation is required",
    ],
    correctIndex: 1,
    explanation:
      "Isolate AC first (to prevent export), then DC. This sequence prevents the inverter attempting to export during isolation and follows industry best practice.",
  },
  {
    id: "safety-qc2",
    question: "Why is DC particularly hazardous compared to AC?",
    options: [
      "DC has higher voltage",
      "DC arcs are harder to extinguish due to no zero crossing",
      "DC is always higher current",
      "DC equipment is less reliable",
    ],
    correctIndex: 1,
    explanation:
      "DC arcs can sustain indefinitely because there is no natural zero crossing point where current passes through zero, unlike AC which crosses zero 100 times per second (50Hz).",
  },
  {
    id: "safety-qc3",
    question: "What minimum waiting time is recommended after DC isolation before working on inverters?",
    options: ["1 minute", "5 minutes", "15 minutes", "30 minutes"],
    correctIndex: 1,
    explanation:
      "A minimum of 5 minutes is recommended for capacitor discharge, though manufacturer guidance should always be followed as some systems may require longer.",
  },
  {
    id: "safety-qc4",
    question: "What does LOTO stand for in electrical safety?",
    options: [
      "Lock Out Turn Off",
      "Lockout Tagout",
      "Limited Operation Technical Order",
      "Low Output Test Operation",
    ],
    correctIndex: 1,
    explanation:
      "LOTO stands for Lockout Tagout, a safety procedure ensuring equipment is properly isolated and cannot be accidentally re-energised during maintenance.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Can PV arrays be completely de-energised during daylight?",
    options: [
      "Yes, by opening all isolators",
      "No, they generate voltage whenever light is present",
      "Yes, by covering with opaque material",
      "Only during cloudy conditions",
    ],
    correctAnswer: 1,
    explanation:
      "PV arrays generate voltage whenever exposed to light - they cannot be fully de-energised during daylight. Covering panels helps but residual voltage may remain.",
  },
  {
    id: 2,
    question: "What PPE is required for working on energised PV systems?",
    options: [
      "Standard work gloves",
      "Arc-rated clothing and insulated gloves appropriate to voltage",
      "Hi-vis vest only",
      "No special PPE required",
    ],
    correctAnswer: 1,
    explanation:
      "Work on energised PV systems requires arc-rated clothing, voltage-rated insulated gloves, face protection, and appropriate footwear matching the hazard level.",
  },
  {
    id: 3,
    question: "What should be done after isolation but before starting work?",
    options: [
      "Begin work immediately",
      "Prove dead using approved voltage indicator",
      "Wait one minute",
      "Check monitoring system",
    ],
    correctAnswer: 1,
    explanation:
      "After isolation, always prove dead using an approved voltage indicator that has been proved on a known live source before and after testing.",
  },
  {
    id: 4,
    question: "What is the safe system of work for PV maintenance?",
    options: [
      "Work alone to complete tasks faster",
      "Planned approach including risk assessment, isolation, and verification",
      "Work only in good weather",
      "No formal system needed for small installations",
    ],
    correctAnswer: 1,
    explanation:
      "A safe system of work includes risk assessment, method statement, proper isolation procedures, dead verification, appropriate PPE, and emergency procedures.",
  },
  {
    id: 5,
    question: "What hazard exists when working on rooftop PV installations?",
    options: [
      "Electrical hazards only",
      "Multiple hazards including electrical, working at height, and manual handling",
      "Height hazards only",
      "No significant hazards with proper training",
    ],
    correctAnswer: 1,
    explanation:
      "Rooftop PV work involves multiple hazards: electrical shock and arc flash, working at height, fragile roof surfaces, manual handling, and environmental conditions.",
  },
  {
    id: 6,
    question: "How should DC isolators be operated during system isolation?",
    options: [
      "Switch under full load",
      "Never switch under load - isolators are not rated for load breaking",
      "Rapid switching",
      "Partial opening for gradual disconnection",
    ],
    correctAnswer: 1,
    explanation:
      "DC isolators are typically load-break rated but should not be switched under load where avoidable. Wait for low irradiance or use inverter shutdown first.",
  },
  {
    id: 7,
    question: "What is the purpose of a permit-to-work system?",
    options: [
      "Regulatory paperwork only",
      "Formal system ensuring safe isolation and controlled access",
      "Speed up work completion",
      "Reduce training requirements",
    ],
    correctAnswer: 1,
    explanation:
      "Permit-to-work systems formally document isolation status, define safe working conditions, control access, and ensure proper handback procedures.",
  },
  {
    id: 8,
    question: "What emergency response should be planned for PV work?",
    options: [
      "Call 999 if anything goes wrong",
      "Site-specific plan including rescue procedures and first aid",
      "Rely on monitoring system alerts",
      "Emergency response is not required for small systems",
    ],
    correctAnswer: 1,
    explanation:
      "Emergency plans should include rescue procedures for working at height, electrical incident response, first aid provision, and communication methods.",
  },
  {
    id: 9,
    question: "What training is required for working on PV systems?",
    options: [
      "No specific training needed",
      "Electrical competence plus PV-specific training",
      "Basic health and safety only",
      "Manufacturer training only",
    ],
    correctAnswer: 1,
    explanation:
      "Workers need electrical competence (e.g., 18th Edition), PV-specific training covering DC hazards and system operation, plus working at height if applicable.",
  },
  {
    id: 10,
    question: "What should be verified before re-energising a system after maintenance?",
    options: [
      "Weather conditions only",
      "All work complete, tools removed, personnel clear, and protection in place",
      "Monitoring system online",
      "Time of day",
    ],
    correctAnswer: 1,
    explanation:
      "Before re-energising: verify all work is complete, tools and temporary equipment removed, all personnel are clear, protection devices are in place, and isolation is systematically removed.",
  },
];

const faqs = [
  {
    question: "Can I work live on PV systems?",
    answer:
      "Live working should be avoided wherever possible. When unavoidable (e.g., commissioning tests), it requires specific training, appropriate PPE, approved test equipment, and a formal safe system of work. Many tasks can be performed with the DC side isolated even though it cannot be fully de-energised.",
  },
  {
    question: "What voltage indicator should I use for PV systems?",
    answer:
      "Use a CAT III or CAT IV rated indicator capable of measuring the DC voltages present (typically up to 1000V DC). Prove the indicator on a known live source before and after testing. Two-pole testers are preferred over non-contact indicators for reliability.",
  },
  {
    question: "How do I isolate a system with multiple inverters?",
    answer:
      "Each inverter requires individual isolation. Isolate AC supplies first, then DC isolators for each string feeding that inverter. Use lockout devices on all isolators. Maintain clear labelling to track isolation status. Consider using a permit-to-work for complex systems.",
  },
  {
    question: "What first aid training is required?",
    answer:
      "Workers should have basic first aid training including treatment for electrical shock. For remote or rooftop work, consider enhanced first aid provision. Automated External Defibrillators (AEDs) are recommended for electrical work sites.",
  },
  {
    question: "Do I need to follow CDM Regulations for PV installation?",
    answer:
      "Yes - most PV installations fall under CDM (Construction Design and Management) Regulations 2015. This requires appointment of duty holders, construction phase plans, and appropriate welfare facilities. Domestic installations may have reduced requirements but safety obligations remain.",
  },
  {
    question: "How do I assess arc flash risk on PV systems?",
    answer:
      "Arc flash risk increases with available fault current and clearing time. PV DC systems present sustained arc hazard due to no natural current zero. Assess incident energy levels, select appropriate PPE rating, and implement engineering controls where possible.",
  },
];

const RenewableEnergyModule7Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/renewable-energy-module-7">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Safety & Working Procedures</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 7 - Section 6</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Safety, Isolation & Working Procedures
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Essential safety procedures for working safely on renewable energy systems
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">In 30 Seconds:</span> Isolate AC first, then DC; wait 5 minutes for capacitor discharge
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Spot it:</span> PV arrays generate voltage whenever exposed to light
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Use it:</span> LOTO (Lockout Tagout) prevents accidental re-energisation
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Key Risk:</span> DC arcs sustain indefinitely - no natural zero crossing
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Apply correct isolation procedures for PV systems",
            "Understand DC-specific hazards and controls",
            "Implement lockout/tagout procedures",
            "Select appropriate PPE for renewable energy work",
            "Conduct risk assessments for PV maintenance",
            "Plan emergency response procedures",
          ].map((outcome, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">DC Hazards and Controls</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              PV systems present unique hazards compared to conventional AC installations. Understanding these hazards is essential for safe working.
            </p>
            <p>
              <span className="text-white font-medium">Cannot De-Energise:</span> PV arrays generate voltage whenever exposed to light. Even on cloudy days significant voltage is present. Covering panels reduces but does not eliminate voltage. This fundamental characteristic affects all safety planning.
            </p>
            <p>
              <span className="text-white font-medium">Arc Hazards:</span> DC arcs can sustain indefinitely because there is no natural zero crossing where current passes through zero. AC arcs naturally extinguish 100 times per second at 50Hz. This makes DC arc flash particularly dangerous and requires specific arc-rated PPE.
            </p>
            <p>
              <span className="text-white font-medium">Shock Hazards:</span> PV system voltages (typically 400-1000V DC) exceed the extra-low voltage threshold. DC causes muscle tetany differently from AC, potentially making it harder to release grip. Touch voltage limits are lower for DC than AC.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Isolation Procedures</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Correct isolation procedures are critical for safe working on PV systems. The sequence and method of isolation affects safety.
            </p>
            <p>
              <span className="text-white font-medium">Isolation Sequence:</span> First isolate AC supply (main switch or isolator). Then isolate DC strings (string isolators at inverter). Where possible, reduce load before DC isolation by waiting for low irradiance. Allow minimum 5 minutes for capacitor discharge before working on inverter.
            </p>
            <p>
              <span className="text-white font-medium">Prove Dead:</span> After isolation, prove dead using an approved voltage indicator. Prove the indicator on a known live source before and after testing (prove-test-prove). Test at all accessible points where work will be performed. Remember DC side remains energised even when isolated.
            </p>
            <p>
              <span className="text-white font-medium">Lockout Tagout (LOTO):</span> Apply personal locks to all isolation points. Attach tags identifying the person who applied the lock and the reason. Only the person who applied the lock should remove it. Use multi-lock hasps for work involving multiple people.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Personal Protective Equipment</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              PPE selection for PV work must address both electrical and other hazards present during installation and maintenance activities.
            </p>
            <p>
              <span className="text-white font-medium">Electrical PPE:</span> Arc-rated clothing appropriate to incident energy level is essential. Voltage-rated insulated gloves match the system voltage (Class 0 for 1000V systems). Face shields or safety glasses with side protection are required. Insulated footwear provides additional protection.
            </p>
            <p>
              <span className="text-white font-medium">Working at Height:</span> Full body harness with appropriate attachment points. Lanyards or fall arresters suitable for the work. Anchor points must be rated for fall arrest loads. Consider rescue equipment and procedures.
            </p>
            <p>
              <span className="text-white font-medium">General PPE:</span> Hard hat for overhead hazards. High-visibility clothing where required. Appropriate gloves for manual handling. Sun protection for extended outdoor work. Weather-appropriate clothing for conditions.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Risk Assessment and Method Statements</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Formal risk assessment and method statements document hazards and controls, ensuring consistent safe working practices.
            </p>
            <p>
              <span className="text-white font-medium">Risk Assessment Content:</span> Identify all hazards including electrical, working at height, manual handling, and environmental. Assess likelihood and severity of harm. Identify existing controls and additional measures required. Record findings and communicate to all workers.
            </p>
            <p>
              <span className="text-white font-medium">Method Statement Content:</span> Step-by-step work procedure. Sequence of isolation and restoration. PPE requirements at each stage. Competency requirements for personnel. Emergency procedures.
            </p>
            <p>
              <span className="text-white font-medium">Dynamic Risk Assessment:</span> Conditions may change during work such as weather, site access, or discovered issues. Workers should continuously assess conditions and stop work if new hazards arise. Authority to stop work should be clearly established.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Emergency Procedures</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Pre-planned emergency procedures enable rapid, effective response to incidents during PV system work.
            </p>
            <p>
              <span className="text-white font-medium">Electrical Incidents:</span> Do not touch the casualty if they may still be in contact with live parts. Isolate supply where possible. Call emergency services (999). Provide first aid including CPR if qualified and required. AED availability is recommended for electrical work.
            </p>
            <p>
              <span className="text-white font-medium">Falls and Rescue:</span> Plan rescue procedures before starting work at height. Ensure rescue equipment is available and personnel are trained. Suspension trauma is a serious risk if a fallen worker is suspended in a harness. Time is critical for rescue.
            </p>
            <p>
              <span className="text-white font-medium">Fire Response:</span> Know location of fire extinguishers and their suitability. Be aware that PV systems may remain energised during fire. Communicate PV presence to fire services. Follow site-specific fire procedures.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Safety culture:</span> Safety is everyone's responsibility. Encourage speaking up about hazards. Never normalise shortcuts or unsafe practices. Learn from near-misses as well as incidents.
            </p>
            <p>
              <span className="text-white font-medium">Competence development:</span> Ensure all workers have appropriate training for tasks assigned. Supervise less experienced workers appropriately. Maintain training records and refresher schedules.
            </p>
            <p>
              <span className="text-white font-medium">Documentation:</span> Keep records of risk assessments, method statements, and training. Document all incidents and near-misses for learning. Review and update procedures based on experience.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Safety & Working Procedures Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-5">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/renewable-energy-module-8-section-1">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section6;
