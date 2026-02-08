import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Visual and Sensory Inspection - MOET Module 4.2.1";
const DESCRIPTION = "Look, listen, smell and feel techniques for condition monitoring: signs of overheating, discolouration, vibration, unusual noise, burning smell, water damage, corrosion, vermin damage and systematic walkthrough for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "visual-signs-overheating",
    question: "Which of the following is a visual sign of overheating in an electrical connection?",
    options: [
      "Clean, shiny copper terminals",
      "Brown or black discolouration on conductor insulation or plastic enclosure material near the connection",
      "A neatly applied cable tie",
      "White paint on the enclosure door"
    ],
    correctIndex: 1,
    explanation: "Overheating causes thermal degradation of insulation materials and plastics, producing brown or black discolouration. The discolouration pattern often indicates the heat source — a brown ring around a terminal indicates a loose connection, while general discolouration on a cable suggests overloading. This is one of the most reliable visual indicators of a developing fault."
  },
  {
    id: "unusual-noise",
    question: "A loud humming or buzzing from a contactor that normally operates quietly indicates:",
    options: [
      "Normal operation under full load",
      "A possible fault such as a damaged shading ring, misaligned armature, contaminated pole faces or low coil voltage",
      "The contactor is operating at maximum efficiency",
      "The contactor needs lubrication"
    ],
    correctIndex: 1,
    explanation: "A contactor should operate with a clean, quiet 'click'. Excessive buzzing or humming indicates that the armature is not seating properly — caused by damaged shading rings (which prevent AC-induced vibration), contaminated pole faces, misalignment, or low coil voltage. If not corrected, the coil will overheat and the contacts will arc excessively."
  },
  {
    id: "burning-smell",
    question: "You detect a faint burning or acrid smell near a motor control centre. You should:",
    options: [
      "Ignore it — electrical equipment always smells",
      "Open all the panel doors immediately to investigate",
      "Report it immediately, investigate using safe methods (thermal imaging if available), and if the smell is strong or worsening, consider de-energising the affected section",
      "Wait until the next scheduled PPM visit to investigate"
    ],
    correctIndex: 2,
    explanation: "A burning smell from electrical equipment indicates overheating, arcing or insulation breakdown — all potentially dangerous conditions. The smell should be investigated immediately but safely. Never open panel doors to investigate without appropriate PPE if a live fault is suspected. Thermal imaging through IR windows is the safest initial investigation method. If the smell is strong or worsening, the risk assessment may require immediate de-energisation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The four senses used in sensory inspection are:",
    options: [
      "Sight, hearing, taste and touch",
      "Sight, hearing, smell and touch (feel)",
      "Sight, hearing, smell and taste",
      "Only sight is used — the others are unreliable"
    ],
    correctAnswer: 1,
    explanation: "Visual and sensory inspection uses sight (looking for discolouration, damage, contamination), hearing (listening for unusual noise, buzzing, arcing), smell (detecting burning, ozone, overheated insulation) and touch/feel (sensing vibration, temperature differences, loose components). Taste is never used in electrical inspection for obvious safety reasons."
  },
  {
    id: 2,
    question: "A systematic walkthrough inspection of an electrical installation should:",
    options: [
      "Only cover the main switchboard",
      "Follow a planned route covering all accessible electrical equipment, using a structured checklist and recording all findings",
      "Be carried out as quickly as possible with no documentation",
      "Only be done when a fault has been reported"
    ],
    correctAnswer: 1,
    explanation: "A systematic walkthrough follows a planned route (typically starting at the main intake and working through the distribution system to final circuits), uses a structured checklist to ensure nothing is missed, and records all findings including both satisfactory and unsatisfactory items. It should cover all accessible electrical infrastructure including distribution boards, cable routes, motors, control panels, lighting and socket outlets."
  },
  {
    id: 3,
    question: "White or green deposits on copper busbars or terminals indicate:",
    options: [
      "Normal ageing of copper",
      "Corrosion — white deposits suggest zinc corrosion (galvanic), green deposits indicate copper oxidation in the presence of moisture",
      "High-quality copper that has been recently cleaned",
      "Over-torqued connections"
    ],
    correctAnswer: 1,
    explanation: "White deposits on copper typically indicate galvanic corrosion where dissimilar metals are in contact (e.g., copper and aluminium, or zinc-plated hardware on copper bars). Green deposits (verdigris) indicate copper reacting with moisture and atmospheric contaminants. Both increase contact resistance and degrade the connection. The root cause (moisture, dissimilar metals) must be addressed."
  },
  {
    id: 4,
    question: "Evidence of vermin activity in an electrical panel includes:",
    options: [
      "Clean cable entries with intact glands",
      "Droppings, nesting material, gnawed cable insulation, and urine staining on components",
      "Neatly organised cables with correct identification",
      "Dust-free interior surfaces"
    ],
    correctAnswer: 1,
    explanation: "Vermin (rats, mice, squirrels) cause significant damage to electrical installations. Signs include droppings, nesting material (shredded insulation, paper, fabric), gnawed cable sheathing exposing conductors, and urine staining which is corrosive and conductive. Vermin damage is a fire risk and an electric shock risk. The entry points must be sealed and damaged cables replaced."
  },
  {
    id: 5,
    question: "When feeling for vibration on a motor bearing housing, you should:",
    options: [
      "Touch the motor with your bare hand while it is running",
      "Use the back of your hand (to detect temperature) at a safe distance first, then use a vibration pen or stethoscope for detailed assessment",
      "Only check vibration with the motor stopped",
      "Ignore vibration — all motors vibrate"
    ],
    correctAnswer: 1,
    explanation: "Before touching any running equipment, approach carefully and use the back of your hand at a safe distance to sense radiated heat — this avoids burns and the grasp reflex. For vibration assessment, a vibration pen or electronic stethoscope provides quantifiable data. Changes in vibration character (roughness, grinding, rhythmic pulsing) indicate developing bearing, alignment or balance problems."
  },
  {
    id: 6,
    question: "An audible crackling or spitting sound from inside an HV switchboard indicates:",
    options: [
      "Normal operation of the circuit breaker",
      "Possible partial discharge or arcing — a potentially dangerous condition requiring immediate investigation",
      "The cooling fans operating correctly",
      "Contactors operating normally"
    ],
    correctAnswer: 1,
    explanation: "Crackling, spitting or buzzing sounds from HV switchgear may indicate partial discharge — localised electrical breakdown of insulation that has not yet progressed to full flashover. This is a serious and potentially dangerous condition. The area should be evacuated, the finding reported immediately, and the equipment investigated by a competent HV engineer using PD detection equipment."
  },
  {
    id: 7,
    question: "Water staining or evidence of moisture ingress in an electrical panel should be classified as:",
    options: [
      "A cosmetic issue only",
      "A potentially dangerous condition — moisture reduces insulation resistance, promotes corrosion, and can create conductive paths",
      "Normal in older installations",
      "Only a concern if the water is still flowing"
    ],
    correctAnswer: 1,
    explanation: "Moisture in electrical equipment is always a concern. It reduces insulation resistance (potentially to dangerous levels), promotes corrosion of conductors and contacts, creates conductive surface films that can lead to tracking and flashover, and in freezing conditions can cause mechanical damage to components. The source of moisture must be identified and eliminated, and affected components must be tested and replaced if necessary."
  },
  {
    id: 8,
    question: "During a walkthrough, you notice a distribution board with its door hanging open and no lock fitted. This is:",
    options: [
      "Acceptable if the board is in a plant room",
      "A safety concern — distribution boards should be closed and secured to prevent unauthorised access, protect the IP rating, and prevent accidental contact with live parts",
      "Only a problem in domestic premises",
      "Normal for frequently accessed boards"
    ],
    correctAnswer: 1,
    explanation: "Distribution board doors must be closed and secured at all times. An open door exposes live parts to accidental contact (electric shock risk), reduces the IP rating (allowing dust and moisture ingress), and permits unauthorised access or interference. This should be recorded as a defect and the door repaired or replaced. If live parts are exposed, immediate action is needed."
  },
  {
    id: 9,
    question: "A motor that previously ran smoothly but now has an audible metallic scraping sound is likely experiencing:",
    options: [
      "Normal bearing break-in after re-greasing",
      "Rotor-to-stator contact caused by bearing wear, shaft deflection or mounting problems",
      "Improved cooling from a new fan",
      "Correct alignment after recent adjustment"
    ],
    correctAnswer: 1,
    explanation: "A metallic scraping sound from a motor indicates physical contact between rotating and stationary parts — most commonly the rotor rubbing against the stator bore. This can be caused by severe bearing wear (allowing shaft to drop), broken bearing cage, shaft deflection under load, or mounting/alignment problems. This requires immediate investigation as continued operation will cause catastrophic damage."
  },
  {
    id: 10,
    question: "The smell of ozone near HV equipment may indicate:",
    options: [
      "Fresh air being circulated by the ventilation system",
      "Partial discharge or corona discharge — electrical breakdown producing ozone from oxygen in the air",
      "A cleaning product recently used in the area",
      "Normal operation of HV circuit breakers"
    ],
    correctAnswer: 1,
    explanation: "Ozone has a distinctive sharp, chlorine-like smell. In electrical environments, it is produced by corona discharge or partial discharge — both forms of electrical breakdown. The presence of ozone near HV equipment indicates that insulation is being stressed beyond its capability, and electrical discharge is occurring. This requires urgent investigation by a competent HV engineer."
  },
  {
    id: 11,
    question: "When conducting a visual inspection, the most effective approach is to:",
    options: [
      "Glance at each item quickly to save time",
      "Use a structured checklist, take your time, look systematically from top to bottom and left to right, and document everything you find",
      "Only inspect items that look obviously damaged",
      "Focus only on equipment that has a maintenance history of problems"
    ],
    correctAnswer: 1,
    explanation: "Effective visual inspection requires a systematic, disciplined approach. Using a structured checklist prevents items being missed. Working systematically (top to bottom, left to right, or following a logical equipment sequence) ensures complete coverage. Taking time is essential — experienced inspectors often find more by looking carefully for subtle signs than by rushing through a checklist."
  },
  {
    id: 12,
    question: "Discoloured or melted cable insulation near a motor terminal box indicates:",
    options: [
      "The cable is the wrong colour",
      "The cable has been exposed to excessive heat, likely from a loose connection, overloaded circuit or poor ventilation at the terminal box",
      "The cable was manufactured with a defective sheath",
      "Normal ageing in motors over 5 years old"
    ],
    correctAnswer: 1,
    explanation: "Melted or discoloured cable insulation near a motor terminal box indicates excessive heat. Common causes include loose terminal connections (high resistance generates heat), overloaded circuits (current exceeding cable rating), poor ventilation (heat from motor conducted to cable), or a combination of factors. The root cause must be identified and corrected, and the affected cable section replaced."
  }
];

const faqs = [
  {
    question: "How often should visual and sensory inspections be carried out?",
    answer: "This depends on the criticality and environment of the installation. For critical electrical infrastructure (main switchboards, motor control centres, transformer rooms), weekly or fortnightly walkthroughs are recommended. For general distribution boards, monthly or quarterly inspections may be sufficient. In harsh environments (dusty, humid, corrosive), more frequent inspections are needed. The inspection schedule should be defined in the PPM plan and carried out consistently."
  },
  {
    question: "What training is needed to carry out effective visual inspections?",
    answer: "Effective visual inspection requires understanding what 'normal' looks like so that abnormalities can be recognised. This comes from a combination of formal training (understanding failure mechanisms and their visible signs), mentoring (learning from experienced colleagues), and practice. For the ST1426 standard, you should be able to identify common signs of deterioration, damage and overheating, and know when to escalate findings for further investigation."
  },
  {
    question: "Should I touch equipment during a sensory inspection?",
    answer: "Exercise extreme caution. Never touch energised conductors or terminal. Use the back of your hand at a safe distance to sense radiated heat before touching any equipment casing. Use tools (vibration pens, thermometers, stethoscopes) rather than direct touch where possible. If equipment is abnormally hot, do not touch it — use an infrared thermometer to measure the temperature safely. Always follow your organisation's safe working procedures."
  },
  {
    question: "What should I do if I find a serious defect during a walkthrough?",
    answer: "If the defect presents an immediate danger (exposed live conductors, arcing, fire risk), take immediate action to make the situation safe — this may include isolating the supply if you are competent to do so. Report the finding immediately to your supervisor and raise an emergency work order. If the defect is serious but not immediately dangerous, record it in detail, raise a high-priority work order, and ensure your supervisor is aware. Always err on the side of caution."
  },
  {
    question: "How do I record findings from a visual inspection?",
    answer: "Use your organisation's inspection form or CMMS mobile app. Record: date and time, equipment identifier, what you found (describing the condition factually), photographs where possible, any measurements taken (e.g., temperature from an IR thermometer), comparison to previous inspection findings, your assessment of severity, and any recommended follow-up actions. Be specific — 'DB-07, Phase L3 main bus connection shows brown discolouration on insulation, estimated 40°C above ambient by IR gun, recommend thermal imaging and re-torque at next shutdown' is far more useful than 'DB-07 — OK'."
  }
];

const MOETModule4Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 4.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Visual and Sensory Inspection
          </h1>
          <p className="text-white/80">
            Using look, listen, smell and feel to detect deterioration, damage and developing faults
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Look:</strong> Discolouration, damage, corrosion, contamination</li>
              <li className="pl-1"><strong>Listen:</strong> Buzzing, crackling, grinding, unusual noise</li>
              <li className="pl-1"><strong>Smell:</strong> Burning, ozone, overheated insulation</li>
              <li className="pl-1"><strong>Feel:</strong> Vibration changes, excessive heat (back of hand safely)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Overheating:</strong> Brown marks on insulation, melted plastic</li>
              <li className="pl-1"><strong>Vermin:</strong> Droppings, nesting, gnawed cables</li>
              <li className="pl-1"><strong>Moisture:</strong> Staining, condensation, corrosion</li>
              <li className="pl-1"><strong>Walkthrough:</strong> Systematic route with structured checklist</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply systematic visual and sensory inspection techniques to electrical installations",
              "Recognise visual signs of overheating, arcing, moisture damage and corrosion",
              "Identify audible indicators of developing faults in contactors, motors and switchgear",
              "Detect olfactory signs of electrical faults including burning and ozone",
              "Conduct structured walkthrough inspections using appropriate checklists",
              "Record and escalate findings appropriately based on severity"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Power of Observation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before any test instrument is connected, before any panel door is opened, a skilled
              maintenance technician can gather an enormous amount of information about equipment
              condition using their senses. Visual and sensory inspection is the first line of defence
              in condition monitoring — it costs nothing, requires no special equipment and can be
              performed during routine site visits.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Four Senses in Electrical Inspection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Sense</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What to Look/Listen/Smell/Feel For</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Possible Indication</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Sight</td>
                      <td className="border border-white/10 px-3 py-2">Discolouration, melting, cracks, corrosion, damage, contamination, water staining</td>
                      <td className="border border-white/10 px-3 py-2">Overheating, mechanical damage, moisture ingress, ageing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Hearing</td>
                      <td className="border border-white/10 px-3 py-2">Buzzing, humming, crackling, scraping, squealing, irregular rhythm</td>
                      <td className="border border-white/10 px-3 py-2">Loose components, partial discharge, bearing wear, misalignment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Smell</td>
                      <td className="border border-white/10 px-3 py-2">Burning, acrid fumes, ozone (chlorine-like), hot oil, electrical smell</td>
                      <td className="border border-white/10 px-3 py-2">Insulation breakdown, arcing, corona discharge, overheated lubricant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Touch</td>
                      <td className="border border-white/10 px-3 py-2">Excessive heat, unusual vibration, looseness (back of hand for heat, vibration pen for quantified data)</td>
                      <td className="border border-white/10 px-3 py-2">Overloading, bearing defect, loose mounting, imbalance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety First</p>
              <p className="text-sm text-white">
                Sensory inspection must always be conducted safely. Never touch energised conductors.
                Use the back of your hand at a safe distance to sense heat before touching equipment
                casings. Approach carefully when investigating unusual sounds — arcing and partial
                discharge can escalate to flashover. If you smell burning and the source is not
                immediately obvious, do not open panel doors without appropriate PPE and a safe system
                of work.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Signs of Overheating and Electrical Damage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Overheating is the most common precursor to electrical failure and fire. Learning to
              recognise the visual signs of overheating is one of the most valuable skills a maintenance
              technician can develop.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Signs of Overheating</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Insulation discolouration:</strong> White PVC turns yellow, then brown, then black as temperature increases</li>
                  <li className="pl-1"><strong>Melting:</strong> Deformed plastic enclosures, melted cable sheathing, softened insulation</li>
                  <li className="pl-1"><strong>Charring:</strong> Blackened areas around connections indicate sustained high temperature</li>
                  <li className="pl-1"><strong>Conductor discolouration:</strong> Copper turns dark brown/black when overheated; aluminium shows white oxide</li>
                  <li className="pl-1"><strong>Arc damage:</strong> Pitting, cratering, metal spatter on contacts and busbars</li>
                  <li className="pl-1"><strong>Tracking:</strong> Carbon paths across insulating surfaces — a precursor to flashover</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Damage Indicators</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Corrosion:</strong> Green verdigris on copper, white powder on aluminium, rust on steel</li>
                  <li className="pl-1"><strong>Water damage:</strong> Tide marks, staining, calcium deposits, corrosion patterns</li>
                  <li className="pl-1"><strong>UV degradation:</strong> Brittle, cracking cable sheath on outdoor installations</li>
                  <li className="pl-1"><strong>Chemical attack:</strong> Softened or swollen insulation near chemical stores or processes</li>
                  <li className="pl-1"><strong>Vermin damage:</strong> Gnawed insulation, droppings, nesting material, urine staining</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Audible and Olfactory Indicators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sound and smell can alert you to faults that are not visible. Many experienced technicians
              can diagnose equipment problems simply by listening to the operating sound or detecting a
              characteristic smell. Developing this skill requires exposure to both normal and abnormal
              operating conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sounds to Listen For</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Buzzing contactor:</strong> Damaged shading ring or dirty pole faces</li>
                  <li className="pl-1"><strong>Crackling in panel:</strong> Partial discharge or loose connection arcing</li>
                  <li className="pl-1"><strong>Motor grinding:</strong> Bearing failure or rotor-to-stator contact</li>
                  <li className="pl-1"><strong>Squealing belt:</strong> Loose or worn V-belt slipping</li>
                  <li className="pl-1"><strong>Transformer hum increase:</strong> Core looseness or overloading</li>
                  <li className="pl-1"><strong>Rhythmic thumping:</strong> Motor imbalance or loose coupling</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Smells to Recognise</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Burning plastic:</strong> Overheating insulation or cable sheath</li>
                  <li className="pl-1"><strong>Acrid/sharp smell:</strong> Electrical arcing or overheated contacts</li>
                  <li className="pl-1"><strong>Ozone (chlorine-like):</strong> Corona or partial discharge</li>
                  <li className="pl-1"><strong>Fish-like smell:</strong> Overheated bakelite or phenolic resin (older equipment)</li>
                  <li className="pl-1"><strong>Sweet chemical smell:</strong> Overheated transformer oil or coolant</li>
                  <li className="pl-1"><strong>Sulphur smell:</strong> Battery gassing from UPS or emergency lighting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The Systematic Walkthrough
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A systematic walkthrough converts ad-hoc observation into a structured, repeatable
              process. It follows a planned route, uses a checklist to ensure completeness, and
              produces documented records that can be compared over time.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Walkthrough Procedure</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Plan the route:</strong> Start at the main intake and work through the distribution hierarchy</li>
                <li className="pl-1"><strong>Use a checklist:</strong> Structured list covering every item to be inspected</li>
                <li className="pl-1"><strong>Be systematic:</strong> Work top to bottom, left to right, inside to outside</li>
                <li className="pl-1"><strong>Take time:</strong> Rushing defeats the purpose — slow down and observe carefully</li>
                <li className="pl-1"><strong>Record everything:</strong> Satisfactory and unsatisfactory findings both have value</li>
                <li className="pl-1"><strong>Photograph anomalies:</strong> Visual record supports the written findings</li>
                <li className="pl-1"><strong>Compare to previous:</strong> Has anything changed since the last walkthrough?</li>
                <li className="pl-1"><strong>Escalate promptly:</strong> Do not wait until the end of the walkthrough to report urgent findings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The ability to carry out systematic visual and sensory inspections,
              identify abnormalities, and report findings accurately is a fundamental competency for
              maintenance technicians. This is assessed through practical observation and the professional
              discussion at end-point assessment.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Visual Warning Signs</p>
                <ul className="space-y-0.5">
                  <li>Brown/black discolouration = overheating</li>
                  <li>Green deposits on copper = corrosion + moisture</li>
                  <li>Melted plastic = sustained high temperature</li>
                  <li>Carbon tracks = tracking/flashover risk</li>
                  <li>Gnawed cables = vermin damage</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Sensory Warning Signs</p>
                <ul className="space-y-0.5">
                  <li>Buzzing contactor = shading ring/pole face fault</li>
                  <li>Crackling = partial discharge or arcing</li>
                  <li>Burning smell = insulation overheating</li>
                  <li>Ozone smell = corona/partial discharge</li>
                  <li>Changed vibration = bearing/alignment fault</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2-2">
              Next: Thermal Imaging
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section2_1;
