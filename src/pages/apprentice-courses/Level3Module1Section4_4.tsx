/**
 * Level 3 Module 1 Section 4.4 - Fire Safety: Prevention, Extinguishers, Evacuation
 *
 * Covers fire prevention, fire extinguisher types and use, and evacuation procedures
 * following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fire Safety: Prevention, Extinguishers, Evacuation - Level 3 Module 1 Section 4.4";
const DESCRIPTION = "Understanding fire prevention, selecting and using fire extinguishers correctly, and evacuation procedures for electrical apprentices on UK construction sites.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What three elements make up the fire triangle?",
    options: [
      "Smoke, flames, and heat",
      "Fuel, oxygen, and heat (ignition source)",
      "Water, carbon dioxide, and foam",
      "Electricity, gas, and wood"
    ],
    correctIndex: 1,
    explanation: "The fire triangle requires fuel (something to burn), oxygen (from air), and heat (ignition source). Remove any one element and fire cannot start or continue. Fire prevention focuses on controlling these elements."
  },
  {
    id: "check-2",
    question: "Which type of fire extinguisher should NEVER be used on electrical fires?",
    options: [
      "CO2 extinguisher",
      "Water extinguisher",
      "Dry powder extinguisher",
      "All of the above can be used"
    ],
    correctIndex: 1,
    explanation: "Water conducts electricity and must never be used on electrical fires - it creates an electrocution risk. CO2 and dry powder extinguishers are electrically safe because they do not conduct."
  },
  {
    id: "check-3",
    question: "What is the FIRST thing you should do if you discover a fire?",
    options: [
      "Try to fight the fire",
      "Raise the alarm",
      "Evacuate immediately without telling anyone",
      "Call your supervisor"
    ],
    correctIndex: 1,
    explanation: "Raising the alarm is ALWAYS the first action - this alerts everyone to evacuate and triggers emergency response. Only after raising the alarm should you consider whether it is safe to tackle a small fire, or simply evacuate."
  },
  {
    id: "check-4",
    question: "What colour band identifies a CO2 fire extinguisher?",
    options: [
      "Red",
      "Blue",
      "Black",
      "Cream/Yellow"
    ],
    correctIndex: 2,
    explanation: "CO2 extinguishers have a black band/label. All UK fire extinguishers have red bodies, with coloured bands indicating the contents: black for CO2, blue for dry powder, cream for foam, red for water."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main cause of fires starting from electrical installations?",
    options: [
      "Lightning strikes",
      "Overloaded circuits and poor connections causing overheating",
      "Deliberate arson",
      "Natural gas leaks"
    ],
    correctAnswer: 1,
    explanation: "Overloaded circuits and poor connections (high resistance joints) are the main electrical fire causes. They generate heat through I squared R losses, which can ignite surrounding materials over time."
  },
  {
    id: 2,
    question: "What class of fire involves flammable liquids?",
    options: [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    correctAnswer: 1,
    explanation: "Class B fires involve flammable liquids like petrol, oils, and solvents. Class A is solid materials, Class C is gases, Class D is metals, and Class F is cooking oils/fats."
  },
  {
    id: 3,
    question: "Why is CO2 particularly suitable for electrical fires?",
    options: [
      "It cools the fire effectively",
      "It does not conduct electricity and leaves no residue",
      "It is the cheapest option",
      "It works on all fire types"
    ],
    correctAnswer: 1,
    explanation: "CO2 is ideal for electrical fires because it does not conduct electricity (no shock risk), leaves no residue (safe for equipment), and displaces oxygen to smother the fire. However, it does not cool effectively, so re-ignition is possible."
  },
  {
    id: 4,
    question: "What does the acronym PASS stand for when using a fire extinguisher?",
    options: [
      "Push, Aim, Squeeze, Spray",
      "Pull, Aim, Squeeze, Sweep",
      "Point, Activate, Spray, Sweep",
      "Pull, Activate, Squeeze, Spray"
    ],
    correctAnswer: 1,
    explanation: "PASS: Pull the pin, Aim at the base of the fire, Squeeze the handle, Sweep from side to side. Always aim at the base where the fuel is, not at the flames."
  },
  {
    id: 5,
    question: "What is a hot works permit and when is it required?",
    options: [
      "Permission to work in hot weather",
      "A permit for work involving heat/sparks that could cause fire",
      "A licence for heating engineers",
      "A certificate for fire wardens"
    ],
    correctAnswer: 1,
    explanation: "A hot works permit controls work that could cause fire - welding, cutting, grinding, soldering, or any work creating sparks/heat. It ensures precautions like removing combustibles, fire watch, and post-work checks."
  },
  {
    id: 6,
    question: "How often should fire extinguishers be serviced?",
    options: [
      "Monthly",
      "Every 6 months",
      "Annually by a competent person",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Fire extinguishers must be serviced annually by a competent person and undergo extended service (discharge and refill) at intervals specified in BS 5306. They should also be visually checked monthly and after any use."
  },
  {
    id: 7,
    question: "What should you do if the fire is too large to tackle safely?",
    options: [
      "Get more extinguishers and try harder",
      "Call for colleagues to help",
      "Leave immediately, close doors behind you, and evacuate",
      "Wait for the fire brigade"
    ],
    correctAnswer: 2,
    explanation: "If a fire is too large, spreading rapidly, or you are unsure, evacuate immediately. Close doors to slow fire spread, sound the alarm if not already activated, and assist others to leave. Never take risks with fire."
  },
  {
    id: 8,
    question: "What is the purpose of fire stopping in electrical installations?",
    options: [
      "To support cables",
      "To seal penetrations and prevent fire/smoke spread through walls and floors",
      "To improve appearance",
      "To provide electrical insulation"
    ],
    correctAnswer: 1,
    explanation: "Fire stopping seals cable penetrations through fire-resistant walls and floors, maintaining compartmentation. Without proper fire stopping, fire and smoke can spread through cable routes, compromising building fire safety."
  },
  {
    id: 9,
    question: "On discovering a fire, why is it important to close doors as you leave?",
    options: [
      "To prevent drafts",
      "To slow fire spread by limiting oxygen and creating barriers",
      "For security reasons",
      "It is not important"
    ],
    correctAnswer: 1,
    explanation: "Closing doors slows fire spread by limiting oxygen supply and creating physical barriers. A closed fire door can hold back fire for 30-60 minutes, giving occupants more time to escape and firefighters time to respond."
  },
  {
    id: 10,
    question: "What electrical work activity commonly requires a hot works permit?",
    options: [
      "Changing a light bulb",
      "Testing continuity",
      "Using power tools that create sparks or using a blowtorch",
      "Installing a socket outlet"
    ],
    correctAnswer: 2,
    explanation: "Grinding, cutting with angle grinders, soldering with blowtorches, and any work creating sparks or significant heat requires hot works permits. Normal electrical installation work does not, unless it involves these activities."
  },
  {
    id: 11,
    question: "What is the assembly point and why is it important?",
    options: [
      "Where tools are stored",
      "A designated safe location where people gather after evacuation for roll call",
      "The site office",
      "The nearest pub"
    ],
    correctAnswer: 1,
    explanation: "The assembly point is a predetermined safe location away from the building where evacuees gather. This enables roll calls to confirm everyone is out and provides a known location for emergency services to liaise with."
  },
  {
    id: 12,
    question: "What precaution should be taken when using CO2 extinguishers?",
    options: [
      "Wear ear protection",
      "Hold the horn - it gets very cold due to CO2 expansion",
      "Do not hold the horn as it gets extremely cold (risk of cold burns)",
      "Point it at your face first"
    ],
    correctAnswer: 2,
    explanation: "CO2 expands rapidly when discharged, causing the horn to become extremely cold (potentially -70 degrees C). Holding the horn can cause cold burns. Hold only the handle and body of the extinguisher."
  }
];

const faqs = [
  {
    question: "Can I use any fire extinguisher on an electrical fire?",
    answer: "No. Only CO2 (black band) and dry powder (blue band) extinguishers are safe for electrical fires. Water and foam conduct electricity and create shock hazards. Ideally, isolate the electrical supply first if safe to do so, then the fire becomes whatever is burning (Class A or B)."
  },
  {
    question: "Should I always try to fight a fire before evacuating?",
    answer: "No. Always raise the alarm first. Only attempt to fight a fire if: it is small (typically no bigger than a waste bin), you have a clear escape route behind you, you have the correct extinguisher, and you are trained and confident. If in any doubt, evacuate."
  },
  {
    question: "How do I know what type of fire extinguisher to use?",
    answer: "Check the coloured band on the extinguisher body: Red = water (Class A solids), Cream = foam (Class A and B), Blue = dry powder (multi-purpose), Black = CO2 (electrical and Class B). Signs near extinguishers and on the labels also indicate suitable fire types."
  },
  {
    question: "What should I do if I find a fire exit blocked?",
    answer: "Report it immediately - blocked fire exits are a serious fire safety breach. Do not prop fire doors open. Fire exits must be kept clear at all times. On discovering a blocked exit during evacuation, find an alternative route and report to the fire warden or emergency services."
  },
  {
    question: "Do electricians need fire safety training?",
    answer: "Yes. All workers need fire safety awareness training covering: how to raise the alarm, evacuation procedures, assembly points, and basic fire prevention. Electricians working with fire detection/alarm systems need additional specific training. Hot works training is needed for activities creating sparks or heat."
  }
];

const Level3Module1Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <Link to="/study-centre/apprentice/level3-module1-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Fire triangle:</strong> Fuel + Oxygen + Heat = Fire</li>
              <li><strong>Electrical fires:</strong> Use CO2 (black) or powder (blue) only</li>
              <li><strong>First action:</strong> Always raise the alarm first</li>
              <li><strong>When in doubt:</strong> Get out, stay out, call 999</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Extinguisher locations, fire exits, assembly points</li>
              <li><strong>Use:</strong> PASS technique - Pull, Aim, Squeeze, Sweep</li>
              <li><strong>Check:</strong> Clear escape routes, valid inspection dates</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01 - Fire Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fire Prevention Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire prevention is far better than fire fighting. Understanding how fires start helps you prevent them. The fire triangle illustrates that fire needs three elements: fuel (something to burn), oxygen (from the air), and heat (an ignition source). Remove any one element and fire cannot start or sustain. As electricians, we work with one of the most common ignition sources - electricity - making fire prevention awareness essential.
            </p>

            <p>
              <strong>Electrical fire causes:</strong> Most electrical fires start from overloaded circuits, poor connections creating high resistance joints, damaged cable insulation, incorrect fuse ratings, or equipment faults. These create heat through electrical resistance (P = I squared R). This heat accumulates, eventually igniting surrounding insulation, building materials, or combustibles. The process can be gradual, taking months or years to develop into a fire.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fire prevention measures for electricians:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use correct cable sizes with appropriate current-carrying capacity</li>
                <li>Ensure tight, properly made connections - high resistance = heat</li>
                <li>Apply thermal insulation derating factors correctly</li>
                <li>Never bypass fuses or use incorrect ratings</li>
                <li>Install fire stopping at all cable penetrations</li>
                <li>Keep combustibles away from electrical equipment</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Good electrical installation practices are fire prevention. Every connection you make properly, every cable you size correctly, and every fire stop you install is preventing a potential fire. Your workmanship literally saves lives.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - Fire Extinguishers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fire Classes and Extinguishers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different materials burn differently and require different extinguishing methods. Using the wrong extinguisher can be ineffective or dangerous - water on electrical fires creates electrocution risk, water on oil fires causes violent spreading. Understanding fire classes and extinguisher types is essential for safe and effective firefighting.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Classes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Class A:</strong> Solid materials (wood, paper, textiles)</li>
                  <li><strong>Class B:</strong> Flammable liquids (petrol, oils, solvents)</li>
                  <li><strong>Class C:</strong> Flammable gases (propane, butane)</li>
                  <li><strong>Class D:</strong> Metals (magnesium, sodium)</li>
                  <li><strong>Class F:</strong> Cooking oils and fats</li>
                  <li><strong>Electrical:</strong> Not a class but requires specific approach</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Extinguisher Types (UK colour codes)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Red band - Water:</strong> Class A only</li>
                  <li><strong>Cream band - Foam:</strong> Class A and B</li>
                  <li><strong>Blue band - Powder:</strong> Multi-purpose (A, B, C, electrical)</li>
                  <li><strong>Black band - CO2:</strong> Electrical, Class B</li>
                  <li><strong>Yellow band - Wet chemical:</strong> Class F</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>For electrical fires:</strong> Only CO2 (black band) and dry powder (blue band) extinguishers are safe. CO2 is preferred for electrical equipment as it leaves no residue. However, if you can safely isolate the electrical supply first, the fire becomes whatever material is burning (usually Class A or B) and other extinguishers may then be suitable.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A fire started in a distribution board due to a loose connection. The first responder grabbed a water extinguisher from the corridor. Fortunately, a colleague stopped them and found the CO2 extinguisher. Using water could have caused electrocution or spread the fire through steam explosion. Know your extinguisher types.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - Using Fire Extinguishers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Using Fire Extinguishers Safely
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Having the right extinguisher means nothing if you cannot use it effectively. The PASS technique provides a simple framework: Pull the pin, Aim at the base of the fire, Squeeze the handle, and Sweep from side to side. But before you pick up any extinguisher, ask yourself if it is safe to attempt firefighting.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Before attempting to fight a fire:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Is the alarm raised? ALWAYS raise the alarm first</li>
                <li>Is the fire small enough to tackle safely? (No bigger than a waste bin)</li>
                <li>Do you have a clear escape route behind you?</li>
                <li>Do you have the correct extinguisher type?</li>
                <li>Are you trained and confident to use the extinguisher?</li>
                <li>Can you isolate the power safely for electrical fires?</li>
              </ul>
            </div>

            <div className="grid grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">P - Pull</p>
                <p className="text-white/90 text-xs">Pull the safety pin from the handle</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">A - Aim</p>
                <p className="text-white/90 text-xs">Aim at the BASE of the fire, not flames</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">S - Squeeze</p>
                <p className="text-white/90 text-xs">Squeeze the handle to discharge</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">S - Sweep</p>
                <p className="text-white/90 text-xs">Sweep from side to side at the base</p>
              </div>
            </div>

            <p>
              <strong>CO2 extinguisher warning:</strong> CO2 discharges at very low temperatures (potentially -70 degrees C). Never hold the horn/nozzle - severe cold burns can result. Hold only the handle and body. CO2 also displaces oxygen, so ensure adequate ventilation after use to avoid asphyxiation risk.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Your safety comes first. If the fire is spreading, if you are unsure, or if one extinguisher does not control it - leave immediately. Close doors behind you to slow fire spread. Report to the assembly point.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - Evacuation Procedures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Evacuation Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Knowing how to evacuate safely is essential - in a real fire, smoke, confusion, and panic can be deadly. On every site, know the answers to: Where are the fire exits? What do the alarms sound like? Where is the assembly point? Who are the fire wardens? Do not wait until there is a fire to find out.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">On discovering a fire:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Raise the alarm immediately (break glass call point or shout "FIRE")</li>
                <li>2. Call 999 (or ensure someone does)</li>
                <li>3. Only attempt to fight small fires if safe to do so</li>
                <li>4. Evacuate using the nearest safe exit</li>
                <li>5. Close doors behind you to limit fire spread</li>
                <li>6. Go directly to the assembly point</li>
                <li>7. Report to fire wardens - confirm who is out, report missing persons</li>
                <li>8. Do not re-enter the building until authorised</li>
              </ul>
            </div>

            <p>
              <strong>On hearing the fire alarm:</strong> Stop work immediately. Do not stop to collect belongings. Leave by the nearest safe exit - if one route is blocked by smoke or fire, use an alternative. Walk, do not run. Help anyone who needs assistance. Go to the assembly point and report to fire wardens.
            </p>

            <p>
              <strong>Assembly points:</strong> These are predetermined safe locations away from the building where evacuees gather for roll call. Knowing your assembly point is essential - if you are not there, rescuers may enter a burning building looking for you. Report any missing colleagues to fire wardens who will inform fire services.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> During a fire at a construction site, most workers evacuated promptly to the assembly point. However, one electrician continued working in a ceiling void, unaware of the alarm. Because he did not report to the assembly point, fire wardens initially believed someone was trapped. Fire services began search and rescue operations. The electrician eventually emerged unharmed but had caused significant alarm and wasted emergency response resources. Always respond to fire alarms.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">On Every Site Visit</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Locate fire exits and ensure they are clear</li>
                <li>Note extinguisher locations and types</li>
                <li>Find out where the assembly point is</li>
                <li>Identify fire wardens and first aiders</li>
                <li>Understand the alarm sound and evacuation procedure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Hot Works</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain hot works permit before starting</li>
                <li>Remove or protect combustibles within 10 metres</li>
                <li>Have suitable extinguisher immediately available</li>
                <li>Maintain fire watch during and after work</li>
                <li>Conduct post-work checks as specified on permit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using water on electrical fires</strong> - electrocution risk</li>
                <li><strong>Not raising the alarm first</strong> - always alert others</li>
                <li><strong>Ignoring fire alarms</strong> - treat every alarm as real</li>
                <li><strong>Blocking fire exits with materials</strong> - keep routes clear</li>
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
                <p className="font-medium text-white mb-1">Extinguisher Colour Codes</p>
                <ul className="space-y-0.5">
                  <li>Red band = Water (Class A)</li>
                  <li>Cream band = Foam (A, B)</li>
                  <li>Blue band = Powder (A, B, C, Elec)</li>
                  <li>Black band = CO2 (Elec, B)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">PASS Technique</p>
                <ul className="space-y-0.5">
                  <li>Pull the pin</li>
                  <li>Aim at base of fire</li>
                  <li>Squeeze the handle</li>
                  <li>Sweep side to side</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Confined Spaces
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section4-5">
              Next: Manual Handling & Noise
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section4_4;
