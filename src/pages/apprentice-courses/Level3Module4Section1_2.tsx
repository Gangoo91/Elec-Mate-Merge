/**
 * Level 3 Module 4 Section 1.2 - Symptoms and Fault Indicators
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Symptoms and Fault Indicators - Level 3 Module 4 Section 1.2";
const DESCRIPTION = "Learn to recognise signs of electrical faults including visual indicators, sensory clues, and behavioural symptoms in electrical installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A burning smell near a socket outlet with no visible damage is most likely caused by:",
    options: [
      "Normal operation under load",
      "High resistance connection generating heat internally",
      "An earth fault on the circuit",
      "Incorrect cable colour coding"
    ],
    correctIndex: 1,
    explanation: "A burning smell without visible damage suggests heat generation inside the accessory - typically a high resistance joint where poor contact causes localised heating. This is serious and requires immediate investigation before a fire develops."
  },
  {
    id: "check-2",
    question: "Lights flickering when a large appliance starts indicates:",
    options: [
      "A fault in the lighting circuit",
      "Voltage drop due to high starting current on shared supply",
      "An earth fault on the appliance",
      "The lighting circuit needs upgrading"
    ],
    correctIndex: 1,
    explanation: "Large appliances draw high starting currents (inrush current), causing temporary voltage drop across supply impedance. If supply impedance is high (poor connections, undersized cables, or long runs), this voltage drop becomes noticeable as flickering. It may indicate supply issues rather than a lighting circuit fault."
  },
  {
    id: "check-3",
    question: "An RCD that trips intermittently at random times most likely indicates:",
    options: [
      "A faulty RCD that needs replacing",
      "An intermittent earth fault on a connected circuit",
      "The RCD is too sensitive for the installation",
      "Normal wear and tear"
    ],
    correctIndex: 1,
    explanation: "Intermittent RCD tripping usually indicates a fault that makes contact unpredictably - damaged cable insulation, moisture ingress, or a faulty appliance. The RCD is doing its job detecting earth leakage. Investigate rather than simply resetting or replacing the RCD."
  },
  {
    id: "check-4",
    question: "Discolouration around a terminal screw in a consumer unit indicates:",
    options: [
      "Normal ageing of the materials",
      "Historical overheating from high resistance",
      "Exposure to UV light",
      "Manufacturing defect"
    ],
    correctIndex: 1,
    explanation: "Discolouration (yellowing, browning, or charring) of plastic near terminals indicates heat generation from high resistance connections. Even if the connection now appears tight, the damage shows historical overheating. The component should be replaced as the plastic is compromised."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A customer reports their kitchen sockets 'crackle' when the kettle is used. What does this symptom suggest?",
    options: [
      "The kettle is faulty and should be replaced",
      "Arcing at a connection, likely due to loose or corroded terminals",
      "The circuit is overloaded and needs additional sockets",
      "Normal sound from high-current appliances"
    ],
    correctAnswer: 1,
    explanation: "Crackling sounds indicate arcing - electrical discharge across a gap in a connection. This typically occurs at loose or corroded terminals where contact is intermittent. Arcing generates extreme heat and is a serious fire risk. Immediate investigation and re-termination is required."
  },
  {
    id: 2,
    question: "Which combination of symptoms most strongly suggests a neutral fault in a three-phase distribution system?",
    options: [
      "All circuits dead, main switch tripped",
      "Some lights very bright, others very dim, appliances damaged",
      "RCD tripping on all circuits",
      "Burning smell from the consumer unit"
    ],
    correctAnswer: 1,
    explanation: "A neutral fault in a three-phase system causes the neutral point to 'float', resulting in unequal voltages across phases. Some loads see high voltage (bright lights, damaged equipment) while others see low voltage (dim lights). This characteristic voltage imbalance is the key indicator of neutral problems."
  },
  {
    id: 3,
    question: "What does a 'humming' or 'buzzing' sound from a distribution board typically indicate?",
    options: [
      "Normal operation of MCBs",
      "Loose connections, overloaded circuits, or failing components",
      "The installation is properly earthed",
      "The main switch needs replacing"
    ],
    correctAnswer: 1,
    explanation: "Buzzing from a distribution board suggests mechanical vibration from loose components, magnetic hum from overloaded or failing devices, or arcing from poor connections. None of these are normal and all require investigation - they indicate developing faults."
  },
  {
    id: 4,
    question: "A circuit breaker trips immediately every time it's reset. This indicates:",
    options: [
      "The MCB is faulty",
      "A sustained fault still present on the circuit",
      "The circuit is overloaded",
      "The MCB needs time to cool down"
    ],
    correctAnswer: 1,
    explanation: "Immediate tripping on reset indicates a solid fault - likely a short circuit or high-current earth fault still present. The fault isn't intermittent; it's continuous. Never repeatedly reset a tripping MCB - identify and clear the fault first. The fault current could cause fire or injury."
  },
  {
    id: 5,
    question: "Tingling sensation when touching an appliance casing indicates:",
    options: [
      "Static electricity build-up",
      "Potential earth fault with leakage current through the user",
      "Normal operation of Class II equipment",
      "Low humidity conditions"
    ],
    correctAnswer: 1,
    explanation: "Tingling when touching metalwork indicates current flowing through you to earth - an earth fault is present and you're in the fault path. This is extremely dangerous. If the earth path or RCD failed, you could receive a fatal shock. Isolate immediately and investigate."
  },
  {
    id: 6,
    question: "A socket outlet face is warm to touch when no appliance is connected. What does this indicate?",
    options: [
      "Normal residual heat from previous use",
      "High resistance connection within the socket generating continuous heat",
      "The circuit is sharing load with adjacent sockets",
      "Ambient temperature conditions"
    ],
    correctAnswer: 1,
    explanation: "Heat generation with no load means the heat source isn't the connected appliance. The most likely cause is a high resistance joint carrying current to downstream sockets or spurs. Current flows through the poor connection even when nothing is plugged into that particular socket."
  },
  {
    id: 7,
    question: "An installation shows low insulation resistance readings that improve when retested several hours later. This pattern suggests:",
    options: [
      "Faulty test equipment",
      "Moisture-related insulation breakdown that dries out over time",
      "Temperature affecting the cable insulation",
      "Electromagnetic interference"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance that varies over time often indicates moisture ingress - water reduces insulation resistance but may evaporate or drain away. This is common in outdoor installations, damp environments, or where condensation occurs. The underlying moisture problem must be addressed."
  },
  {
    id: 8,
    question: "Which symptom would NOT typically be associated with a high resistance neutral connection?",
    options: [
      "Voltage fluctuations with load changes",
      "Lights dimming or brightening unexpectedly",
      "RCD tripping",
      "Equipment malfunctioning intermittently"
    ],
    correctAnswer: 2,
    explanation: "A high resistance neutral affects voltage but doesn't typically create earth leakage to trip an RCD. The symptoms are voltage-related: fluctuations, equipment malfunction, and lighting variations as load current creates varying voltage drop across the high-resistance neutral connection."
  },
  {
    id: 9,
    question: "Multiple circuits losing power while their individual MCBs remain on most likely indicates:",
    options: [
      "Multiple simultaneous faults",
      "A fault or issue upstream - main switch, supply, or distribution board busbar",
      "RCD malfunction",
      "Overloaded main incomer"
    ],
    correctAnswer: 1,
    explanation: "When multiple circuits fail but their MCBs are still on, the fault is upstream of those MCBs - at the main switch, supply connection, or busbar. Individual circuit faults wouldn't affect multiple circuits simultaneously. Check supply voltage, main switch, and busbar connections."
  },
  {
    id: 10,
    question: "A smell of ozone near electrical equipment indicates:",
    options: [
      "Normal ionisation from transformers",
      "Electrical arcing or corona discharge occurring",
      "Insulation in good condition",
      "Proper ventilation"
    ],
    correctAnswer: 1,
    explanation: "Ozone (a sharp, clean smell) is produced when electrical discharge ionises oxygen. Its presence indicates arcing, corona discharge, or sparking - all abnormal conditions. In switchgear or motors, ozone smell suggests insulation breakdown or loose connections causing discharge. Investigate immediately."
  },
  {
    id: 11,
    question: "A customer reports that their smoke alarm activates briefly when certain lights are switched on. What fault mechanism could cause this?",
    options: [
      "The smoke alarm is faulty",
      "Electrical interference from switching transients affecting smoke alarm electronics",
      "The lighting circuit is overloaded",
      "Smoke is being generated by the lights"
    ],
    correctAnswer: 1,
    explanation: "Switching transients (voltage spikes when inductive loads switch) can interfere with sensitive electronic equipment. If the smoke alarm is on the same circuit or inadequately filtered, these transients may cause false activation. Solutions include suppression devices on the offending circuit or relocating the smoke alarm circuit."
  },
  {
    id: 12,
    question: "Pitting or erosion visible on switch contacts indicates:",
    options: [
      "Normal wear requiring routine maintenance",
      "Arcing damage from switching loads at or above the switch rating",
      "Chemical contamination",
      "Manufacturing defect"
    ],
    correctAnswer: 1,
    explanation: "Contact pitting results from arcing each time the switch operates. More severe pitting suggests frequent switching of loads near the switch's rating, inductive loads (motors, transformers), or deteriorating contacts making poor connection. Eventually the switch will fail - replacement is indicated."
  }
];

const faqs = [
  {
    question: "How can I tell the difference between an overload and a short circuit from symptoms alone?",
    answer: "Overloads develop over time with gradual heating - you might notice warm cables, thermal smell, or MCB tripping after extended use. Short circuits cause immediate, violent tripping often with a 'bang' or flash. The MCB trips on magnetic release (instant) for short circuits, and thermal release (delayed) for overloads. Check trip time: instant = short circuit, delayed = overload."
  },
  {
    question: "Why do some faults only show symptoms at certain times of day?",
    answer: "This often relates to load patterns. High-resistance faults may only show symptoms under heavy load (evenings when heating and cooking occur). Moisture-related faults may worsen at night when temperatures drop and condensation forms. Thermal faults may only manifest after the installation has been running and heated up. Always ask about when symptoms occur."
  },
  {
    question: "What's the difference between a symptom and an indicator?",
    answer: "Symptoms are what the user experiences - no power, flickering lights, tripping devices, tingling sensations. Indicators are physical evidence you find during inspection - discoloured terminals, melted plastic, burn marks, damaged insulation. Both help diagnose faults, but indicators provide more specific evidence of fault location and cause."
  },
  {
    question: "Should I trust what the customer tells me about symptoms?",
    answer: "Customer information is valuable but needs interpretation. Non-technical descriptions may be inaccurate ('the fuse blew' might mean MCB tripped). Ask clarifying questions: 'Which device operated?', 'Did it trip instantly or after some time?', 'What were you doing when it happened?'. Their observations combined with your technical knowledge lead to diagnosis."
  },
  {
    question: "Can symptoms mislead me about fault location?",
    answer: "Yes - symptoms often appear at a different location from the fault. A fault in a junction box might cause symptoms at a distant socket. High resistance in the distribution board can cause problems throughout the installation. Symptoms tell you something is wrong; methodical testing finds where. Don't assume the fault is where the symptom appears."
  },
  {
    question: "What symptoms should trigger immediate isolation rather than investigation?",
    answer: "Immediate isolation is required for: burning smell (fire risk), smoke or visible burning, tingling when touching metalwork (shock risk), crackling/arcing sounds (fire risk), melted or charred components. These indicate active dangerous conditions. Isolate first, then investigate. Never leave such symptoms uninvestigated 'because it's still working'."
  }
];

const Level3Module4Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Symptoms and Fault Indicators
          </h1>
          <p className="text-white/80">
            Recognising the signs that point to electrical faults
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Visual:</strong> Discolouration, damage, burn marks</li>
              <li><strong>Audible:</strong> Buzzing, crackling, humming</li>
              <li><strong>Smell:</strong> Burning, ozone, hot plastic</li>
              <li><strong>Touch:</strong> Heat, tingling (danger sign)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Warm socket + no load = internal fault</li>
              <li><strong>Spot:</strong> Flickering lights = supply or neutral issue</li>
              <li><strong>Use:</strong> Symptoms guide where to test first</li>
              <li><strong>Use:</strong> Customer reports inform diagnosis</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify visual indicators of electrical faults",
              "Recognise audible warning signs of developing faults",
              "Interpret smell-based fault indicators",
              "Understand behavioural symptoms in electrical systems",
              "Correlate symptoms with likely fault types",
              "Prioritise symptoms requiring immediate action"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Visual Indicators */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Visual Indicators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual inspection is your first line of diagnosis. Many faults leave physical evidence that tells a story about what went wrong and how long the problem has been developing. Training your eye to spot these indicators is a fundamental fault-finding skill.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key visual indicators to look for:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Discolouration:</strong> Yellowing or browning of plastic indicates heat exposure - the component has been running hot</li>
                <li><strong>Charring or burn marks:</strong> Evidence of arcing or severe overheating - often around terminals</li>
                <li><strong>Melted plastic:</strong> Extreme heat, usually from high-resistance connections or overcurrent</li>
                <li><strong>Damaged insulation:</strong> Cracked, hardened, or missing insulation indicates cable damage or ageing</li>
                <li><strong>Corrosion:</strong> Green verdigris on copper, white powder on aluminium - affects connection integrity</li>
                <li><strong>Physical damage:</strong> Impact marks, crushed cables, stripped threads - mechanical failures</li>
              </ul>
            </div>

            <p>
              The pattern of damage often reveals the fault mechanism. Localised damage at one terminal suggests a connection problem. Widespread damage suggests an overcurrent event. Progressive damage (worse at one end) can indicate where the fault started.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Visual evidence may persist long after a fault has been 'fixed'. Previous overheating permanently weakens plastic components - even if connections are now tight, the damaged accessory should be replaced.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Audible Indicators */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Audible Indicators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical installations should be silent (with exceptions like transformers that hum slightly). Unexpected sounds indicate something abnormal and often warn of developing faults before they cause failure or fire.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Warning Sounds</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Crackling/snapping:</strong> Arcing at poor connections</li>
                  <li><strong>Buzzing:</strong> Loose components vibrating</li>
                  <li><strong>Humming:</strong> Overloaded or failing devices</li>
                  <li><strong>Sizzling:</strong> Moisture or contamination</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Location Matters</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Sound from sockets = connection issues</li>
                  <li>Sound from consumer unit = internal fault</li>
                  <li>Sound from switches = contact problems</li>
                  <li>Sound from cables = never normal</li>
                </ul>
              </div>
            </div>

            <p>
              Arcing creates a distinctive crackling or snapping sound as electrical discharge jumps across gaps. This sound is often louder under load when more current flows through the defective connection. The arcing generates extreme heat and is a major fire risk - crackling sounds demand immediate investigation.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A customer reports a 'clicking' sound from behind their kitchen worktop when the kettle boils. Investigation reveals a connection block in a junction box with loose terminals - arcing occurs under the kettle's 13A load. The arcing had already charred the connection block's plastic.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Smell and Thermal Indicators */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Smell and Thermal Indicators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat and smell provide early warning of faults that may not yet be visible. Your senses of smell and touch can detect problems that are developing inside enclosures before external damage appears.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Characteristic electrical smells:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Hot plastic/rubber:</strong> Insulation or components overheating - immediate investigation needed</li>
                <li><strong>Burning:</strong> Active thermal damage in progress - isolate immediately</li>
                <li><strong>Ozone (sharp, clean):</strong> Electrical arcing or corona discharge ionising the air</li>
                <li><strong>Fish-like smell:</strong> Overheating electrical components (particularly certain plastics)</li>
                <li><strong>Metallic smell:</strong> Possible severe overheating of conductors or terminals</li>
              </ul>
            </div>

            <p>
              Thermal indicators require careful assessment. Cables naturally warm under load - this is normal. But excessive heat, heat at connection points, or heat without corresponding load indicates a fault. Compare similar circuits: if one socket runs noticeably hotter than identical sockets on the same circuit, investigate that socket.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Trust your nose. If something smells wrong, investigate even if everything appears to be working. Smell often indicates internal faults that aren't yet visible - catching them early prevents fires.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Behavioural Symptoms */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Behavioural Symptoms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Behavioural symptoms are abnormalities in how the electrical system operates. Unlike physical indicators, these symptoms require observation over time or customer reports to identify. They often point to intermittent or developing faults.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Protective Device Behaviour</p>
                <p className="text-white/90 text-xs">Tripping patterns, failure to trip, nuisance tripping</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Load Behaviour</p>
                <p className="text-white/90 text-xs">Flickering, dimming, failing to operate, intermittent</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">System Behaviour</p>
                <p className="text-white/90 text-xs">Voltage variations, timing-related issues, load-dependent</p>
              </div>
            </div>

            <p>
              Protective device tripping patterns are particularly informative. Instant tripping suggests short circuit. Delayed tripping suggests overload. RCD-only tripping suggests earth fault. Repeated tripping on the same circuit indicates a persistent fault. Tripping that only occurs at certain times suggests load-related or environmental factors.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An RCD trips every morning around 7am. Investigation reveals this coincides with the immersion heater timer switching on. The heater element has degraded insulation that leaks to earth when cold - once warm, the insulation resistance improves enough to stop tripping. The element needs replacement.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Symptom Collection Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Interview the customer: When does it happen? What were you doing? Has anything changed?</li>
                <li>Visual inspection: Look for damage, discolouration, signs of heat or arcing</li>
                <li>Listen: Is anything buzzing, crackling, or humming that shouldn't be?</li>
                <li>Smell: Any unusual odours near the consumer unit or affected areas?</li>
                <li>Touch (safely): Are enclosures warmer than they should be?</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Correlating Symptoms to Faults</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>MCB trips + burning smell = likely short circuit with arcing damage</li>
                <li>RCD trips + no other symptoms = earth fault, possibly in connected equipment</li>
                <li>Flickering + warm connections = high resistance joint</li>
                <li>Multiple circuits affected = supply or distribution board issue</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Dismissing customer reports</strong> - They live with the installation and notice patterns you can't see in one visit</li>
                <li><strong>Testing only where symptoms appear</strong> - Faults often manifest far from their source</li>
                <li><strong>Ignoring 'minor' symptoms</strong> - Today's flicker is tomorrow's fire</li>
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
                <p className="font-medium text-white mb-1">Urgent Symptoms (Isolate First)</p>
                <ul className="space-y-0.5">
                  <li>Burning smell or smoke</li>
                  <li>Visible arcing or flames</li>
                  <li>Tingling from metalwork</li>
                  <li>Crackling sounds</li>
                  <li>Melting or charring</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Investigate Promptly</p>
                <ul className="space-y-0.5">
                  <li>Unexplained tripping</li>
                  <li>Flickering lights</li>
                  <li>Warm accessories</li>
                  <li>Buzzing sounds</li>
                  <li>Intermittent operation</li>
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
            <Link to="../level3-module4-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Types of Faults
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section1-3">
              Next: Diagnostic Sequence
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section1_2;
