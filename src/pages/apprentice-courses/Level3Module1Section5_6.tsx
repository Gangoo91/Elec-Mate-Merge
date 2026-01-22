import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the minimum number of first aiders required for a low-risk workplace with 50 employees?",
    options: [
      "At least 1 first aider",
      "At least 2 first aiders",
      "At least 5 first aiders",
      "No first aiders required"
    ],
    correctIndex: 0,
    explanation: "For low-risk workplaces with 25-50 employees, at least one first aider is required. Construction sites are higher-risk and may require more first aiders based on assessment."
  },
  {
    id: "check-2",
    question: "What should be the FIRST action if you discover a fire on site?",
    options: [
      "Attempt to extinguish it",
      "Raise the alarm",
      "Call the fire brigade",
      "Evacuate immediately"
    ],
    correctIndex: 1,
    explanation: "The first action is always to raise the alarm to alert others. Then assess whether to fight the fire (only if safe and trained) or evacuate. Others can call emergency services while the alarm is raised."
  },
  {
    id: "check-3",
    question: "Under the Health and Safety (First-Aid) Regulations 1981, what must every workplace have as a minimum?",
    options: [
      "A qualified doctor on call",
      "An appointed person and first aid equipment",
      "A full-time nurse",
      "An ambulance on standby"
    ],
    correctIndex: 1,
    explanation: "Every workplace must have at least an appointed person to take charge in an emergency and suitable first aid equipment. The level of provision depends on risk assessment."
  },
  {
    id: "check-4",
    question: "How often should emergency evacuation drills typically be conducted?",
    options: [
      "Once every 5 years",
      "Only when the HSE visits",
      "At least annually, more often for higher-risk premises",
      "Only after a real emergency"
    ],
    correctIndex: 2,
    explanation: "Fire drills should be conducted at least annually, but higher-risk premises or those with frequent staff changes should drill more often. The Regulatory Reform (Fire Safety) Order 2005 requires appropriate drills."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does an emergency plan typically include?",
    options: [
      "Only fire evacuation procedures",
      "Procedures for various emergencies, roles, communication, and assembly points",
      "A list of employee names",
      "Insurance policy details"
    ],
    correctAnswer: 1,
    explanation: "Emergency plans cover multiple scenarios (fire, gas leak, medical emergency, etc.), define roles and responsibilities, establish communication methods, identify escape routes, assembly points, and procedures for accounting for personnel."
  },
  {
    id: 2,
    question: "Who is responsible for ensuring adequate first aid provision under the Health and Safety (First-Aid) Regulations 1981?",
    options: [
      "The HSE",
      "The employer",
      "The employees themselves",
      "The local council"
    ],
    correctAnswer: 1,
    explanation: "Employers have a legal duty to provide adequate first aid equipment, facilities, and personnel appropriate to the circumstances. This includes assessing needs based on workplace hazards and number of employees."
  },
  {
    id: 3,
    question: "What is the difference between an 'appointed person' and a 'first aider'?",
    options: [
      "There is no difference",
      "Appointed persons take charge in emergencies; first aiders are trained to give first aid",
      "First aiders are more senior",
      "Appointed persons have medical qualifications"
    ],
    correctAnswer: 1,
    explanation: "An appointed person takes charge when someone is injured and calls emergency services but is not trained to give first aid beyond basic care. A first aider holds a valid first aid at work certificate and can administer treatment."
  },
  {
    id: 4,
    question: "What colour are fire exit signs in the UK?",
    options: [
      "Red with white text",
      "Green with white pictogram",
      "Blue with white text",
      "Yellow with black text"
    ],
    correctAnswer: 1,
    explanation: "Fire exit signs must be green with white pictograms/text as per BS 5499 and the Health and Safety (Safety Signs and Signals) Regulations 1996. Green indicates safe conditions and escape routes."
  },
  {
    id: 5,
    question: "How long is a standard First Aid at Work (FAW) certificate valid?",
    options: [
      "1 year",
      "2 years",
      "3 years",
      "5 years"
    ],
    correctAnswer: 2,
    explanation: "First Aid at Work certificates are valid for 3 years. Annual refresher training is recommended to maintain skills. Before the certificate expires, requalification training is required."
  },
  {
    id: 6,
    question: "What should be included in a basic first aid kit for a construction site?",
    options: [
      "Only plasters and bandages",
      "Sterile dressings, bandages, eye pads, gloves, and guidance leaflet as minimum",
      "Medicines and painkillers",
      "Defibrillator only"
    ],
    correctAnswer: 1,
    explanation: "First aid kits should contain sterile dressings (various sizes), bandages, eye pads, triangular bandages, safety pins, disposable gloves, and a first aid guidance leaflet. Medicines should not be included."
  },
  {
    id: 7,
    question: "Under the Regulatory Reform (Fire Safety) Order 2005, who is the 'responsible person' for fire safety?",
    options: [
      "The fire brigade",
      "The employer, building owner, or person in control of the premises",
      "The newest employee",
      "Only qualified fire safety officers"
    ],
    correctAnswer: 1,
    explanation: "The responsible person is the employer, owner, landlord, or anyone with control over the premises. They must carry out fire risk assessments and implement fire safety measures."
  },
  {
    id: 8,
    question: "What is the recommended maximum travel distance to a fire exit in a normal-risk area?",
    options: [
      "10 metres",
      "25 metres with one escape route, 45 metres with alternative routes",
      "100 metres",
      "No limit specified"
    ],
    correctAnswer: 1,
    explanation: "In normal-risk areas, travel distance should not exceed 25 metres where there is only one escape route, or 45 metres where alternative routes are available. High-risk areas have shorter maximum distances."
  },
  {
    id: 9,
    question: "What immediate action should be taken for an electric shock victim who is still in contact with the electrical source?",
    options: [
      "Pull them away immediately",
      "Throw water on them",
      "Isolate the power supply before approaching",
      "Give mouth-to-mouth resuscitation"
    ],
    correctAnswer: 2,
    explanation: "Never touch someone in contact with electricity - you could become a victim too. Isolate the power supply first if possible. If not, use non-conductive material to separate them from the source. Then call for help."
  },
  {
    id: 10,
    question: "What does PEEP stand for in emergency planning?",
    options: [
      "Primary Emergency Exit Plan",
      "Personal Emergency Evacuation Plan",
      "Professional Emergency Escape Procedure",
      "Planned Emergency Exit Point"
    ],
    correctAnswer: 1,
    explanation: "A Personal Emergency Evacuation Plan (PEEP) is for individuals who may need assistance during evacuation due to disability, injury, or other circumstances. Employers must ensure PEEPs are in place for those who need them."
  },
  {
    id: 11,
    question: "What should you do if you discover an unconscious colleague who is breathing normally?",
    options: [
      "Leave them where they are and call for help",
      "Place them in the recovery position and call for help",
      "Give chest compressions immediately",
      "Give them water to drink"
    ],
    correctAnswer: 1,
    explanation: "If someone is unconscious but breathing normally, place them in the recovery position to maintain their airway and prevent choking. Call for help immediately. Monitor their breathing until help arrives."
  },
  {
    id: 12,
    question: "What is the purpose of a fire assembly point?",
    options: [
      "A place to store fire equipment",
      "A safe location to gather so everyone can be accounted for",
      "Where the fire brigade parks",
      "A smoking area"
    ],
    correctAnswer: 1,
    explanation: "Fire assembly points are designated safe areas where everyone gathers during evacuation. This allows roll calls to confirm everyone is out of the building and helps emergency services know if anyone is missing."
  }
];

const faqs = [
  {
    question: "Do I need to be trained in first aid to help an injured colleague?",
    answer: "You don't need formal training to call for help, raise the alarm, or stay with an injured person. However, you should only give first aid treatment if you are trained and confident to do so. Untrained intervention can sometimes cause harm. At minimum, know how to call 999 and give clear information about the emergency."
  },
  {
    question: "What should I do if there's an electrical fire?",
    answer: "First, raise the alarm and if safe to do so, isolate the electrical supply. Never use water on electrical fires. Use a CO2 or dry powder extinguisher if trained and it's safe. If in doubt, evacuate immediately and let the fire service handle it. Your safety comes first."
  },
  {
    question: "How do I know where the first aid kit and first aiders are on a new site?",
    answer: "This should be covered in your site induction. If not, ask your supervisor before starting work. First aid points should be clearly signed. Make sure you know the location of first aid equipment, who the first aiders are, and how to contact emergency services from site."
  },
  {
    question: "What counts as a medical emergency requiring 999?",
    answer: "Call 999 for: unconsciousness, severe bleeding, suspected heart attack or stroke, difficulty breathing, severe burns, electric shock, suspected spinal injury, severe allergic reaction, or any condition where you believe life is at risk. If in doubt, call - emergency services would rather attend a precautionary call than arrive too late."
  },
  {
    question: "Can I be sued for giving first aid?",
    answer: "In the UK, you are protected by the Social Action, Responsibility and Heroism Act 2015 when acting in good faith to help someone in an emergency. If you act reasonably and within your training, you have strong legal protection. The greater risk is not helping when you could have."
  },
  {
    question: "What if the fire alarm goes off but I'm in the middle of critical work?",
    answer: "You must evacuate immediately. No work is more important than your life. If safe to do so, quickly make equipment safe (e.g., isolate if within reach) but do not delay your evacuation. False alarms are treated as real until confirmed otherwise."
  }
];

const Level3Module1Section5_6 = () => {
  useSEO(
    "Emergency Planning and First Aid - Level 3 Module 1 Section 5.6",
    "Emergency response procedures, first aid requirements, and evacuation planning for UK electrical workers"
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Emergency plans:</strong> Procedures for fire, injury, and other incidents</li>
              <li><strong>First aid:</strong> Legal requirement based on risk assessment</li>
              <li><strong>Fire safety:</strong> Prevention, detection, evacuation, fighting</li>
              <li><strong>Your role:</strong> Know procedures before you need them</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Fire exits, assembly points, first aid locations</li>
              <li><strong>Use:</strong> Site induction info, emergency contact numbers</li>
              <li><strong>Apply:</strong> Know your role before an emergency occurs</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Emergency Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Emergency Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency planning ensures everyone knows what to do when things go wrong. The Management of Health and Safety at Work Regulations 1999 require employers to establish procedures for serious and imminent danger.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">An emergency plan should include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Types of emergencies covered (fire, gas leak, medical, structural collapse)</li>
                <li>Alarm systems and how to raise the alarm</li>
                <li>Evacuation routes and procedures</li>
                <li>Assembly points and roll call procedures</li>
                <li>Roles and responsibilities (fire wardens, first aiders)</li>
                <li>Emergency contact numbers</li>
                <li>Procedures for visitors, contractors, and disabled persons</li>
              </ul>
            </div>

            <p>
              <strong>Why this matters for electricians:</strong> You work across multiple sites, often with different emergency procedures. Each site induction should cover these procedures - if it doesn't, ask. Knowing the plan before an emergency is critical.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Emergency plans are useless if workers don't know them. Regular drills and refresher training ensure everyone can respond effectively under pressure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: First Aid Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            First Aid Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety (First-Aid) Regulations 1981 require employers to provide adequate first aid equipment, facilities, and personnel. What's "adequate" depends on a first aid needs assessment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Appointed Person</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Takes charge in an emergency</li>
                  <li>Calls emergency services</li>
                  <li>Maintains first aid equipment</li>
                  <li>Does NOT need first aid training</li>
                  <li>Minimum requirement for low-risk workplace</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">First Aider (FAW)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Holds valid FAW certificate (3 years)</li>
                  <li>Can administer first aid treatment</li>
                  <li>Required based on risk and employee numbers</li>
                  <li>Annual refresher training recommended</li>
                  <li>Required on higher-risk sites like construction</li>
                </ul>
              </div>
            </div>

            <p>
              Construction sites typically require first aiders due to the higher-risk nature of the work. The ratio depends on risk assessment but generally one first aider per 50 workers is a starting point for higher-risk environments.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Emergency First Aid at Work (EFAW) is a shorter course covering essential skills. FAW is more comprehensive. Both are valid but FAW provides broader training.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Fire Safety */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fire Safety and Evacuation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Regulatory Reform (Fire Safety) Order 2005 places duties on the "responsible person" (employer, building owner, or controller) to ensure fire safety. This includes risk assessment, fire prevention measures, detection systems, and evacuation procedures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fire Safety Principles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Prevention:</strong> Eliminate ignition sources, control fuel, safe working practices</li>
                <li><strong>Detection:</strong> Smoke detectors, heat detectors, manual call points</li>
                <li><strong>Warning:</strong> Alarm systems - know what your site alarm sounds like</li>
                <li><strong>Evacuation:</strong> Clear routes, emergency lighting, trained fire wardens</li>
                <li><strong>Fighting:</strong> Only if trained, fire is small, and escape route is clear</li>
              </ul>
            </div>

            <p>
              <strong>The fire action on discovery:</strong> Raise the alarm immediately. Then either evacuate or, if trained and safe to do so, attempt to extinguish a small fire. Never put yourself at risk. Close doors behind you to slow fire spread.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fire Extinguisher Types (UK Colour Codes):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Red (Water):</strong> Paper, wood, textiles - NOT electrical fires</li>
                <li><strong>Cream (Foam):</strong> Flammable liquids - NOT electrical fires</li>
                <li><strong>Blue (Dry Powder):</strong> Most fires including electrical</li>
                <li><strong>Black (CO2):</strong> Electrical fires and flammable liquids</li>
                <li><strong>Yellow (Wet Chemical):</strong> Cooking oil fires</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> As an electrician, you're more likely to encounter electrical fires. CO2 and dry powder extinguishers are safe on electrical fires. Never use water on live electrical equipment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Electrical Emergencies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electrical Emergency Response
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical emergencies require specific response procedures. Acting correctly in the first moments can be the difference between life and death.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-red-900/20 border border-red-500/30">
                <p className="font-medium text-white mb-1">Electric Shock</p>
                <p className="text-white/90 text-xs">Isolate power FIRST, then approach victim</p>
              </div>
              <div className="p-3 rounded bg-orange-900/20 border border-orange-500/30">
                <p className="font-medium text-white mb-1">Electrical Fire</p>
                <p className="text-white/90 text-xs">Isolate if safe, use CO2/powder extinguisher</p>
              </div>
              <div className="p-3 rounded bg-yellow-900/20 border border-elec-yellow/30">
                <p className="font-medium text-white mb-1">Arc Flash</p>
                <p className="text-white/90 text-xs">Treat burns, call emergency services</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Electric Shock Response Procedure:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Do NOT touch the victim if still in contact with electricity</li>
                <li>Isolate the power supply immediately if possible</li>
                <li>If isolation not possible, use non-conductive material to separate victim from source</li>
                <li>Call 999 and request ambulance</li>
                <li>Check for breathing - start CPR if trained and victim not breathing</li>
                <li>Treat for shock (keep warm, legs raised if no spinal injury suspected)</li>
                <li>Even if victim seems fine, they MUST be checked by medical professionals</li>
              </ol>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Critical:</strong> Electric shock can cause delayed cardiac effects. Anyone who has received a significant shock must be assessed at hospital, even if they feel fine initially. Internal damage may not be immediately apparent.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">On Every New Site</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify fire exits and your evacuation route</li>
                <li>Know the location of fire assembly point</li>
                <li>Find out who the first aiders and fire wardens are</li>
                <li>Locate the nearest first aid kit and fire extinguishers</li>
                <li>Know emergency contact numbers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During an Emergency</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Stay calm - panic helps no one</li>
                <li>Follow the emergency procedure you were taught</li>
                <li>Help others if safe to do so</li>
                <li>Report to assembly point for roll call</li>
                <li>Do not re-enter building until told safe to do so</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring the alarm</strong> — Treat every alarm as real until confirmed otherwise</li>
                <li><strong>Using lifts in a fire</strong> — Always use stairs; lifts can trap you</li>
                <li><strong>Touching shock victims</strong> — Isolate power first or you become a victim</li>
                <li><strong>Going back for belongings</strong> — Your life is more valuable than any possession</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Emergency Numbers</p>
                <ul className="space-y-0.5">
                  <li>Emergency services: 999</li>
                  <li>HSE incident line: 0345 300 9923</li>
                  <li>Gas emergency: 0800 111 999</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>First Aid Regs 1981</li>
                  <li>Fire Safety Order 2005</li>
                  <li>MHSWR 1999 (emergencies)</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5/5-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Monitoring & Improvement
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/apprentice-courses/level-3-health-safety/module-1/section-6">
              Next: Section 6 - Professional Responsibilities
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section5_6;
