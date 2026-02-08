import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Transformers: Principles and Applications - MOET Module 2.3.1";
const DESCRIPTION = "Understand transformer theory, electromagnetic induction, turns ratio, voltage and current transformation, losses, efficiency, types, and maintenance testing procedures for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "turns-ratio-calc",
    question: "A transformer has 1,000 primary turns and 250 secondary turns. If the primary voltage is 400V, what is the secondary voltage?",
    options: [
      "1,600V",
      "100V",
      "250V",
      "50V"
    ],
    correctIndex: 1,
    explanation: "Using the turns ratio: Vs/Vp = Ns/Np. So Vs = 400 x (250/1000) = 100V. The turns ratio is 4:1 step-down, meaning the secondary voltage is one quarter of the primary voltage."
  },
  {
    id: "transformer-losses",
    question: "Which type of transformer loss is caused by eddy currents circulating in the core laminations?",
    options: [
      "Copper losses",
      "Iron (core) losses",
      "Stray losses",
      "Dielectric losses"
    ],
    correctIndex: 1,
    explanation: "Iron losses (also called core losses) comprise eddy current losses and hysteresis losses. Eddy currents are minimised by laminating the core — dividing it into thin sheets insulated from each other, which interrupts the current paths."
  },
  {
    id: "ct-safety",
    question: "Why must the secondary winding of a current transformer (CT) NEVER be left open-circuit while the primary is energised?",
    options: [
      "The CT will overheat slightly",
      "The reading will be inaccurate",
      "A dangerously high voltage develops across the open secondary, risking flashover and fatal shock",
      "The primary current will increase"
    ],
    correctIndex: 2,
    explanation: "When a CT secondary is open-circuited, the entire primary current acts as a magnetising current, driving the core into deep saturation. This induces extremely high voltages (potentially several kilovolts) across the secondary terminals, creating a lethal shock and fire hazard. Always short-circuit the secondary before disconnecting any CT load."
  },
  {
    id: "transformer-oil-test",
    question: "What does dissolved gas analysis (DGA) of transformer oil primarily detect?",
    options: [
      "The viscosity of the oil",
      "The oil's dielectric strength",
      "Internal faults such as arcing, overheating, or partial discharge",
      "The oil's moisture content"
    ],
    correctIndex: 2,
    explanation: "DGA identifies gases dissolved in transformer oil that are produced by different types of internal faults. For example, acetylene indicates arcing, ethylene indicates severe overheating, and hydrogen indicates partial discharge or corona. DGA is one of the most valuable diagnostic tools for transformer condition monitoring."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the fundamental operating principle of a transformer?",
    options: [
      "Electrostatic induction between two plates",
      "Electromagnetic induction between two magnetically coupled windings",
      "Piezoelectric effect in a crystal",
      "Thermoelectric effect in dissimilar metals"
    ],
    correctAnswer: 1,
    explanation: "A transformer operates on Faraday's law of electromagnetic induction. An alternating current in the primary winding creates a changing magnetic flux in the core, which induces an EMF in the secondary winding. The two windings are magnetically coupled but electrically isolated."
  },
  {
    id: 2,
    question: "A step-up transformer has a turns ratio of 1:5 and a primary voltage of 230V. What is the secondary voltage?",
    options: [
      "46V",
      "1,150V",
      "230V",
      "460V"
    ],
    correctAnswer: 1,
    explanation: "For a 1:5 step-up transformer: Vs = Vp x (Ns/Np) = 230 x 5 = 1,150V. The secondary voltage is five times the primary voltage. Note that the secondary current will be one-fifth of the primary current (power is conserved, minus losses)."
  },
  {
    id: 3,
    question: "Which of the following is a characteristic of copper losses in a transformer?",
    options: [
      "They are constant regardless of load",
      "They vary with the square of the load current (I squared R)",
      "They only occur at no-load",
      "They are eliminated by laminating the core"
    ],
    correctAnswer: 1,
    explanation: "Copper losses (I squared R losses) are caused by the resistance of the winding conductors. Since power loss = I squared x R, copper losses increase with the square of the load current. This is why transformers run cooler at light loads."
  },
  {
    id: 4,
    question: "Why are transformer cores constructed from thin laminations rather than solid iron?",
    options: [
      "To reduce weight",
      "To reduce eddy current losses by limiting the paths available for circulating currents",
      "To increase the magnetic flux density",
      "To make the transformer easier to assemble"
    ],
    correctAnswer: 1,
    explanation: "Laminating the core divides it into thin sheets, each insulated from its neighbours by a thin oxide or varnish layer. This restricts eddy currents to small loops within each lamination, dramatically reducing I squared R heating losses. Typical lamination thickness is 0.35mm to 0.5mm."
  },
  {
    id: 5,
    question: "What is the purpose of a tap changer on a power transformer?",
    options: [
      "To change the frequency of the output",
      "To adjust the output voltage by altering the number of turns in use",
      "To switch between single-phase and three-phase operation",
      "To reverse the direction of power flow"
    ],
    correctAnswer: 1,
    explanation: "A tap changer adjusts the turns ratio by connecting to different tapping points on the winding, thereby changing the output voltage. On-load tap changers (OLTCs) adjust automatically without interrupting supply. Off-load tap changers require the transformer to be de-energised before adjustment."
  },
  {
    id: 6,
    question: "An instrument current transformer (CT) has a ratio of 200/5. If the primary current is 150A, what is the secondary current?",
    options: [
      "7.5A",
      "3.75A",
      "1.5A",
      "37.5A"
    ],
    correctAnswer: 1,
    explanation: "Using the CT ratio: Is = Ip x (secondary rating / primary rating) = 150 x (5/200) = 3.75A. CTs step down high currents to safe, measurable levels (typically 5A or 1A secondary) for instruments and protection relays."
  },
  {
    id: 7,
    question: "What minimum insulation resistance value would typically be expected for a healthy 11kV transformer winding at 20 degrees C?",
    options: [
      "0.5 megohms",
      "5 megohms",
      "100 megohms or greater",
      "1 kilohm"
    ],
    correctAnswer: 2,
    explanation: "For an 11kV transformer, insulation resistance values of 100 megohms or greater are typical for a healthy winding. Values below the manufacturer's minimum indicate moisture ingress or insulation degradation. IR testing should be performed at the test voltage recommended by the manufacturer."
  },
  {
    id: 8,
    question: "Which type of transformer provides galvanic isolation with a 1:1 turns ratio and is used to protect sensitive equipment?",
    options: [
      "Auto-transformer",
      "Current transformer",
      "Isolation transformer",
      "Step-down transformer"
    ],
    correctAnswer: 2,
    explanation: "An isolation transformer has separate primary and secondary windings (typically 1:1 ratio) that provide galvanic isolation — no direct electrical connection between input and output. This protects against earth faults, reduces noise, and is used for sensitive electronic equipment and medical applications."
  },
  {
    id: 9,
    question: "What type of cooling is designated by the code ONAN on a transformer nameplate?",
    options: [
      "Oil Natural, Air Natural — no pumps or fans",
      "Oil Natural, Air Negative pressure",
      "Oil pumped, Air Natural",
      "Oil Natural, Air heated"
    ],
    correctAnswer: 0,
    explanation: "ONAN stands for Oil Natural Air Natural — the oil circulates by natural convection (thermosiphon effect) and heat is dissipated to the surrounding air by natural convection from the radiator fins. This is the simplest and most common cooling method for distribution transformers up to several MVA."
  },
  {
    id: 10,
    question: "What is the polarisation index (PI) test for a transformer winding?",
    options: [
      "A test of the magnetic polarity of the windings",
      "The ratio of insulation resistance at 10 minutes to the value at 1 minute, indicating insulation condition",
      "A test of the winding resistance at different temperatures",
      "A measurement of the transformer's power factor"
    ],
    correctAnswer: 1,
    explanation: "The polarisation index is calculated as PI = IR at 10 minutes / IR at 1 minute. A PI of 2.0 or greater typically indicates good insulation. A low PI (close to 1.0) suggests the insulation is contaminated with moisture or conductive material. The PI test is particularly useful for large transformers where absolute IR values can be misleading."
  },
  {
    id: 11,
    question: "An auto-transformer differs from a double-wound transformer because it:",
    options: [
      "Has no iron core",
      "Uses a single winding with a tapping point, providing no galvanic isolation",
      "Can only step voltage up, never down",
      "Has three windings instead of two"
    ],
    correctAnswer: 1,
    explanation: "An auto-transformer uses a single winding with a tapping point — part of the winding is common to both the primary and secondary circuits. This means there is a direct electrical connection (no galvanic isolation) between input and output. Auto-transformers are smaller and cheaper for small voltage changes but must not be used where isolation is required for safety."
  },
  {
    id: 12,
    question: "During a winding resistance test on a transformer, one phase reads significantly lower than the other two. What does this indicate?",
    options: [
      "Normal variation between phases",
      "A possible inter-turn short circuit on that winding, reducing the effective number of turns",
      "The transformer is overloaded",
      "The test instrument needs calibration"
    ],
    correctAnswer: 1,
    explanation: "A significantly lower winding resistance on one phase compared to the others indicates a possible inter-turn short circuit — shorted turns reduce the total resistance of that winding. All three phases should read within approximately 2% of each other. This fault will also cause increased local heating and reduced output voltage on the affected phase."
  }
];

const faqs = [
  {
    question: "How often should transformer oil be tested?",
    answer: "For oil-filled power transformers, BS EN 60422 recommends oil sampling and testing at intervals determined by the transformer's criticality and age. Typically, annual dissolved gas analysis (DGA) and biennial full oil analysis (including dielectric strength, moisture content, acidity, and colour) are performed for medium to large transformers. More frequent testing is warranted for critical or ageing units."
  },
  {
    question: "Can a transformer work on DC?",
    answer: "No. A transformer requires a changing magnetic flux to induce a voltage in the secondary winding. A steady DC current produces a constant flux, which induces no EMF. Applying DC to a transformer primary would result in very high current flow (limited only by the low winding resistance), causing rapid overheating and destruction of the winding."
  },
  {
    question: "What is the difference between an on-load tap changer (OLTC) and an off-load tap changer?",
    answer: "An on-load tap changer can adjust the turns ratio while the transformer is energised and supplying load — it uses a complex mechanism with transition resistors or reactors to maintain continuous current flow during the tap change. An off-load (or off-circuit) tap changer requires the transformer to be de-energised before adjustment. OLTCs are used on grid and distribution transformers where voltage regulation is needed without interrupting supply."
  },
  {
    question: "Why do transformers hum?",
    answer: "The hum is caused by magnetostriction — the physical expansion and contraction of the core laminations as the magnetic flux alternates at 50Hz. The core physically vibrates at twice the supply frequency (100Hz), producing the characteristic hum. Loose laminations, mounting bolts, or covers can amplify this noise. Increased humming may indicate core problems, overtightened or loose clamping bolts, or DC magnetisation from power electronic loads."
  },
  {
    question: "What safety precautions apply when working on a current transformer?",
    answer: "Never open-circuit the secondary of a CT while the primary is energised — dangerously high voltages will develop across the open terminals. Always short-circuit the secondary before disconnecting any instrument or relay. Use dedicated CT shorting terminals or links. When testing, ensure the shorting link is in place before removing the ammeter or relay wiring. Treat all CT circuits with the same respect as high-voltage circuits."
  }
];

const MOETModule2Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 2.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Transformers: Principles and Applications
          </h1>
          <p className="text-white/80">
            Electromagnetic induction, transformer construction, losses, efficiency, and maintenance testing for the electrical maintenance technician
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Principle:</strong> Changing flux in primary induces EMF in secondary (Faraday's law)</li>
              <li className="pl-1"><strong>Turns ratio:</strong> Vs/Vp = Ns/Np determines voltage transformation</li>
              <li className="pl-1"><strong>Losses:</strong> Copper (I&sup2;R) and iron (eddy current + hysteresis)</li>
              <li className="pl-1"><strong>Maintenance:</strong> IR testing, winding resistance, oil analysis (DGA)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Context — Why This Matters</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Everywhere:</strong> Transformers are in every substation, every distribution board, and every control panel</li>
              <li className="pl-1"><strong>CT danger:</strong> Open-circuiting a current transformer secondary can be lethal</li>
              <li className="pl-1"><strong>ST1426 requirement:</strong> Understand transformer principles, types, and maintenance</li>
              <li className="pl-1"><strong>Efficiency:</strong> Modern power transformers exceed 99% efficiency</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the principle of electromagnetic induction and how it applies to transformer operation",
              "Calculate voltage, current, and turns ratio for step-up and step-down transformers",
              "Identify and explain copper losses, iron losses, and their effect on transformer efficiency",
              "Describe the construction, purpose, and safe handling of current transformers (CTs) and voltage transformers (VTs)",
              "Select appropriate maintenance tests including insulation resistance, winding resistance, and oil analysis",
              "Explain the function of tap changers and different transformer cooling methods"
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

        {/* Section 1: Electromagnetic Induction and Transformer Principle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Electromagnetic Induction and Transformer Principle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A transformer operates on the principle of electromagnetic induction, first described by
              Michael Faraday in 1831. When an alternating current flows through a coil of wire (the
              primary winding), it creates a changing magnetic field. If a second coil (the secondary
              winding) is placed within this changing magnetic field, an electromotive force (EMF) is
              induced in the secondary coil. The two windings share a common magnetic core but have
              no direct electrical connection — they are said to be magnetically coupled.
            </p>
            <p>
              Faraday's law of electromagnetic induction states that the EMF induced in a coil is proportional
              to the rate of change of magnetic flux linkage through the coil. In a transformer, the alternating
              flux in the core changes continuously at the supply frequency (50Hz in the UK), producing a
              continuous alternating EMF in both windings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">The Turns Ratio</p>
              <p className="text-sm text-white/90 mb-3">
                The voltage induced in each winding is proportional to the number of turns in that winding.
                This gives us the fundamental transformer equation:
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 mb-3">
                <p className="font-medium mb-2">Voltage Ratio:</p>
                <p className="font-mono">Vs / Vp = Ns / Np</p>
                <p className="text-xs text-white/60 mt-2">Where: Vs = secondary voltage, Vp = primary voltage, Ns = secondary turns, Np = primary turns</p>
              </div>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 mb-3">
                <p className="font-medium mb-2">Current Ratio (for an ideal transformer):</p>
                <p className="font-mono">Is / Ip = Np / Ns</p>
                <p className="text-xs text-white/60 mt-2">Current is inversely proportional to the turns ratio — step down voltage, step up current (and vice versa)</p>
              </div>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Power (ideal transformer — no losses):</p>
                <p className="font-mono">Vp x Ip = Vs x Is</p>
                <p className="text-xs text-white/60 mt-2">Power in = Power out. A transformer cannot create power — it transforms voltage and current.</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Step-Up vs Step-Down</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-400 mb-2">Step-Down Transformer</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">More primary turns than secondary (Np &gt; Ns)</li>
                    <li className="pl-1">Secondary voltage is lower than primary</li>
                    <li className="pl-1">Secondary current is higher than primary</li>
                    <li className="pl-1">Example: 11kV to 400V distribution transformer</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm font-medium text-purple-400 mb-2">Step-Up Transformer</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">More secondary turns than primary (Ns &gt; Np)</li>
                    <li className="pl-1">Secondary voltage is higher than primary</li>
                    <li className="pl-1">Secondary current is lower than primary</li>
                    <li className="pl-1">Example: Generator output 11kV to 132kV for transmission</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Worked Example</p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="mb-2"><strong>Problem:</strong> A transformer has 2,000 primary turns and 100 secondary turns. The primary supply is 11,000V. Calculate the secondary voltage and, if the load draws 80A, the primary current.</p>
                <p className="mb-1"><strong>Secondary voltage:</strong> Vs = Vp x (Ns/Np) = 11,000 x (100/2,000) = 550V</p>
                <p className="mb-1"><strong>Primary current:</strong> Ip = Is x (Ns/Np) = 80 x (100/2,000) = 4A</p>
                <p className="text-xs text-white/60 mt-2">Check: Primary power = 11,000 x 4 = 44,000W. Secondary power = 550 x 80 = 44,000W. Power balanced (ideal transformer).</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Transformer Losses and Efficiency */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Transformer Losses and Efficiency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              No transformer is 100% efficient — some energy is always lost as heat. Understanding
              transformer losses is essential for the maintenance technician because changes in loss
              patterns (e.g., increased heating) are often the first sign of developing faults.
              Transformer losses are divided into two main categories.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="text-sm font-medium text-red-400 mb-3">Copper Losses (I&sup2;R Losses)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Cause:</strong> Current flowing through the resistance of the copper (or aluminium) winding conductors</li>
                  <li className="pl-1"><strong>Formula:</strong> P = I&sup2; x R (watts)</li>
                  <li className="pl-1"><strong>Varies with load:</strong> Copper losses increase with the square of the load current — double the current, quadruple the losses</li>
                  <li className="pl-1"><strong>At no-load:</strong> Copper losses are negligible (only magnetising current flows)</li>
                  <li className="pl-1"><strong>Reduction:</strong> Use larger cross-section conductors (lower resistance), keep connections tight</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="text-sm font-medium text-amber-400 mb-3">Iron Losses (Core Losses)</p>
                <p className="text-sm text-white/90 mb-3">Iron losses consist of two components, both occurring in the core:</p>
                <div className="space-y-3">
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Eddy Current Losses</p>
                    <p className="text-xs text-white/80">
                      The changing flux induces small circulating currents (eddy currents) in the core material,
                      which cause I&sup2;R heating. Minimised by laminating the core — each lamination is typically
                      0.35mm to 0.5mm thick, insulated from its neighbours by a thin oxide or varnish layer.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Hysteresis Losses</p>
                    <p className="text-xs text-white/80">
                      Energy is lost as the magnetic domains in the core material are repeatedly realigned by the
                      alternating flux. Minimised by using grain-oriented silicon steel (GOSS), which has low
                      hysteresis loss. The area of the B-H loop for the core material represents the energy lost
                      per cycle.
                    </p>
                  </div>
                </div>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-3">
                  <li className="pl-1"><strong>Constant:</strong> Iron losses are present whenever the transformer is energised, regardless of load</li>
                  <li className="pl-1"><strong>Measured by:</strong> Open-circuit (no-load) test</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Transformer Efficiency</p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 mb-3">
                <p className="font-medium mb-2">Efficiency Formula:</p>
                <p className="font-mono">Efficiency (%) = (Output Power / Input Power) x 100</p>
                <p className="font-mono mt-1">Efficiency (%) = Output / (Output + Copper Losses + Iron Losses) x 100</p>
              </div>
              <p className="text-sm text-white/90 mb-3">
                Modern power transformers achieve efficiencies of 97% to over 99%. Maximum efficiency occurs
                when copper losses equal iron losses. Since iron losses are constant and copper losses vary with
                load, there is a specific load level at which the transformer operates most efficiently.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Worked Example:</p>
                <p className="mb-1">A 100 kVA transformer has iron losses of 800W and full-load copper losses of 1,200W.</p>
                <p className="mb-1">At full load: Efficiency = 100,000 / (100,000 + 800 + 1,200) x 100 = <strong>98.04%</strong></p>
                <p className="text-xs text-white/60 mt-2">Maximum efficiency occurs at: Load = Full load x sqrt(Iron losses / Copper losses) = 1.0 x sqrt(800/1200) = 0.816 = 81.6% load.</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Cooling Methods</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-white/70 font-medium">Code</th>
                      <th className="py-2 pr-4 text-white/70 font-medium">Method</th>
                      <th className="py-2 text-white/70 font-medium">Application</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-mono">AN</td>
                      <td className="py-2 pr-4">Air Natural</td>
                      <td className="py-2">Dry-type transformers, small ratings</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-mono">AF</td>
                      <td className="py-2 pr-4">Air Forced (fans)</td>
                      <td className="py-2">Dry-type, higher ratings or confined spaces</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-mono">ONAN</td>
                      <td className="py-2 pr-4">Oil Natural, Air Natural</td>
                      <td className="py-2">Distribution transformers, common</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-mono">ONAF</td>
                      <td className="py-2 pr-4">Oil Natural, Air Forced</td>
                      <td className="py-2">Medium power transformers</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono">OFAF</td>
                      <td className="py-2 pr-4">Oil Forced, Air Forced</td>
                      <td className="py-2">Large power transformers, high ratings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Transformer Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Transformer Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Transformers are classified by their application, construction, and purpose. The maintenance
              technician must recognise each type and understand its specific characteristics and safety
              requirements.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-blue-400 mb-3">Power Transformers</h3>
                <p className="text-sm text-white/90 mb-3">
                  Used in electrical distribution to step voltage up or down between transmission, distribution,
                  and utilisation levels. Found in substations, from 132kV grid transformers down to 11kV/400V
                  distribution transformers.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ratings from a few kVA to hundreds of MVA</li>
                  <li className="pl-1">Oil-filled (mineral oil or ester) or dry-type (cast resin)</li>
                  <li className="pl-1">Three-phase units use delta or star winding configurations</li>
                  <li className="pl-1">Equipped with tap changers for voltage regulation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h3 className="text-sm font-medium text-red-400 mb-3">Instrument Transformers — Current Transformers (CTs)</h3>
                <p className="text-sm text-white/90 mb-3">
                  CTs step down high primary currents to a standard secondary current (typically 5A or 1A)
                  for measurement instruments and protection relays.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Primary is the main circuit conductor (may be a single turn — the cable passing through the CT window)</li>
                  <li className="pl-1">Secondary is a multi-turn winding connected to ammeters, energy meters, or protection relays</li>
                  <li className="pl-1">Common ratios: 100/5, 200/5, 400/5, 800/5, etc.</li>
                </ul>
                <div className="mt-3 p-3 rounded bg-red-500/10 border border-red-500/30">
                  <p className="text-sm font-medium text-red-400 mb-1">CRITICAL SAFETY WARNING</p>
                  <p className="text-xs text-white/90">
                    NEVER open-circuit the secondary of a CT while the primary is energised. The entire primary
                    current becomes magnetising current, driving the core into deep saturation. This induces
                    extremely high voltages (several kilovolts) across the open secondary terminals — a lethal
                    shock and fire hazard. Always short-circuit the CT secondary before disconnecting any load.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-purple-400 mb-3">Instrument Transformers — Voltage Transformers (VTs)</h3>
                <p className="text-sm text-white/90 mb-3">
                  VTs step down high system voltages to a standard secondary voltage (typically 110V) for
                  measurement instruments and protection relays.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">High primary impedance — draws minimal current from the system</li>
                  <li className="pl-1">Very accurate turns ratio for precise voltage measurement</li>
                  <li className="pl-1">Secondary must never be short-circuited (causes high current and damage)</li>
                  <li className="pl-1">Common ratios: 11,000/110V, 33,000/110V</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-green-400 mb-3">Isolation Transformers</h3>
                <p className="text-sm text-white/90 mb-3">
                  Provide galvanic isolation with a 1:1 turns ratio — the output voltage equals the input
                  voltage, but there is no direct electrical connection between primary and secondary.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Used for safety in medical environments, workshops, and electronic test areas</li>
                  <li className="pl-1">Reduces the risk of electric shock from earth faults</li>
                  <li className="pl-1">Blocks DC components and common-mode noise</li>
                  <li className="pl-1">BS 3535 specifies requirements for isolating transformers</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-amber-400 mb-3">Auto-Transformers</h3>
                <p className="text-sm text-white/90 mb-3">
                  Use a single winding with a tapping point — part of the winding is common to both the
                  primary and secondary circuits. No galvanic isolation is provided.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Smaller, lighter, and cheaper than equivalent double-wound transformers</li>
                  <li className="pl-1">Used where the voltage change is small (e.g., 240V to 110V for site transformers)</li>
                  <li className="pl-1">Used in star-delta motor starting as the autotransformer starter</li>
                  <li className="pl-1"><strong>Not suitable</strong> where isolation is required for safety</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Maintenance and Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maintenance and Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Transformer maintenance is critical for reliability, safety, and longevity. A well-maintained
              transformer can operate for 30 to 50 years; a neglected one may fail catastrophically, causing
              fires, explosions (in oil-filled units), and extended power outages. The maintenance technician
              must understand the key tests and inspections.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-3">Routine Visual Inspections</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Oil level:</strong> Check the oil level gauge — low oil indicates a leak or seal failure</li>
                  <li className="pl-1"><strong>Oil leaks:</strong> Inspect gaskets, valves, and bushings for weeping or dripping</li>
                  <li className="pl-1"><strong>Temperature:</strong> Record winding and oil temperature (compare with load and ambient)</li>
                  <li className="pl-1"><strong>Cooling equipment:</strong> Verify fans and pumps are operating (where fitted)</li>
                  <li className="pl-1"><strong>Bushings:</strong> Check for cracks, contamination, or tracking marks</li>
                  <li className="pl-1"><strong>Noise:</strong> Listen for abnormal humming, buzzing, or clicking (indicates core or tap changer problems)</li>
                  <li className="pl-1"><strong>Buchholz relay:</strong> Check for gas accumulation (oil-filled transformers)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-3">Electrical Tests</p>
                <div className="space-y-3">
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-blue-400 mb-1">Insulation Resistance (IR) Test</p>
                    <p className="text-xs text-white/80">
                      Measures the resistance of the winding insulation to earth and between windings. Performed
                      at the voltage specified by the manufacturer (typically 1kV for LV, 5kV for HV). Minimum
                      acceptable values depend on the rated voltage. Trending IR values over time is more useful
                      than a single reading — a declining trend indicates deterioration.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-blue-400 mb-1">Polarisation Index (PI) Test</p>
                    <p className="text-xs text-white/80">
                      Ratio of IR at 10 minutes to IR at 1 minute. A PI of 2.0 or greater indicates good insulation.
                      A PI close to 1.0 suggests moisture contamination. Useful for large transformers where absolute
                      IR values can be misleading due to the large insulation surface area.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-blue-400 mb-1">Winding Resistance Test</p>
                    <p className="text-xs text-white/80">
                      Measures the DC resistance of each winding using a low-resistance ohmmeter or Kelvin bridge.
                      All three phases should read within 2% of each other. A low reading on one phase indicates
                      inter-turn short circuits. High readings indicate poor connections or broken strands.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-blue-400 mb-1">Turns Ratio Test</p>
                    <p className="text-xs text-white/80">
                      Verifies the actual turns ratio matches the nameplate ratio. Performed using a turns ratio
                      tester (TTR). Deviations greater than 0.5% indicate shorted turns or tap changer problems.
                      Test on each tap position.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-3">Oil Analysis</p>
                <div className="space-y-3">
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-amber-400 mb-1">Dissolved Gas Analysis (DGA)</p>
                    <p className="text-xs text-white/80">
                      The most valuable diagnostic tool for oil-filled transformers. Different internal faults
                      produce different gases: hydrogen (partial discharge), methane and ethane (thermal
                      decomposition), ethylene (severe overheating), acetylene (arcing). DGA can detect
                      developing faults long before they cause failure.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-amber-400 mb-1">Dielectric Strength (Breakdown Voltage)</p>
                    <p className="text-xs text-white/80">
                      Tests the oil's ability to withstand electrical stress. A sample is tested in a standard
                      test cell with electrodes 2.5mm apart. Minimum acceptable value is typically 30kV for
                      distribution transformers, 40-50kV for power transformers. Low values indicate moisture,
                      particles, or contamination.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-amber-400 mb-1">Moisture Content</p>
                    <p className="text-xs text-white/80">
                      Measured in parts per million (ppm) using Karl Fischer titration. Moisture in transformer
                      oil dramatically reduces dielectric strength and accelerates insulation ageing. Typical
                      limits: less than 20 ppm for power transformers, less than 30 ppm for distribution transformers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Tap Changers</p>
              <p className="text-sm text-white/90 mb-3">
                Tap changers adjust the transformer output voltage by changing the effective number of turns
                in the winding. They are one of the most maintenance-intensive components of a power transformer.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-400 mb-2">Off-Load Tap Changer (OLTC)</p>
                  <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                    <li>Must be de-energised before changing tap position</li>
                    <li>Simple mechanical switch</li>
                    <li>Typical range: +/- 5% in 2.5% steps</li>
                    <li>Maintenance: Check contacts for wear, clean, re-grease</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                  <p className="text-sm font-medium text-green-400 mb-2">On-Load Tap Changer (OLTC)</p>
                  <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                    <li>Changes taps while the transformer is energised and loaded</li>
                    <li>Uses transition resistors or reactors to avoid open-circuit during tap change</li>
                    <li>Requires regular maintenance: oil change, contact inspection, mechanism check</li>
                    <li>Operation counter tracks number of tap changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 5: Practical Applications for Maintenance Technicians */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Practical Applications for Maintenance Technicians
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As an electrical maintenance technician, you will encounter transformers in many forms — from
              large oil-filled distribution transformers in substations to small control transformers in
              motor control centres. Understanding their characteristics helps you diagnose faults, plan
              maintenance, and ensure safe working practices.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Common Transformer Faults and Symptoms</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-white/70 font-medium">Symptom</th>
                      <th className="py-2 pr-4 text-white/70 font-medium">Possible Cause</th>
                      <th className="py-2 text-white/70 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90 text-xs">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Excessive heating</td>
                      <td className="py-2 pr-4">Overloading, blocked cooling, shorted turns</td>
                      <td className="py-2">Check load, inspect cooling, test winding resistance</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Low output voltage</td>
                      <td className="py-2 pr-4">Wrong tap position, shorted turns, high voltage drop</td>
                      <td className="py-2">Check tap position, turns ratio test, check connections</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Abnormal humming</td>
                      <td className="py-2 pr-4">Loose core bolts, DC magnetisation, overfluxing</td>
                      <td className="py-2">Inspect core clamping, check for DC sources on supply</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Oil discolouration</td>
                      <td className="py-2 pr-4">Overheating, insulation breakdown, contamination</td>
                      <td className="py-2">Oil analysis (DGA, dielectric strength, moisture)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Buchholz relay alarm</td>
                      <td className="py-2 pr-4">Gas generation from internal fault</td>
                      <td className="py-2">Analyse gas, perform DGA, investigate — do not ignore</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">ST1426 Maintenance Competency</p>
              <p className="text-sm text-white/90">
                The Level 3 Electrical Engineering Maintenance Technician apprenticeship standard (ST1426)
                requires you to understand transformer principles, carry out routine maintenance inspections,
                interpret test results, and recognise the safety hazards associated with transformer work —
                including stored energy, hot oil, toxic gases (in sealed units), and the lethal voltages present
                in instrument transformer secondary circuits.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Safe Working with Transformers</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Isolation:</strong> Follow the full safe isolation procedure before any maintenance work — transformers can back-feed from the secondary side</li>
                <li className="pl-1"><strong>Stored energy:</strong> Large transformers retain magnetic energy after de-energisation — wait before touching windings</li>
                <li className="pl-1"><strong>Hot oil:</strong> Oil-filled transformers operate at high temperatures — risk of severe burns from hot oil or surfaces</li>
                <li className="pl-1"><strong>Toxic gases:</strong> Internal faults can produce toxic gases (CO, acetylene) — ventilate sealed enclosures before entry</li>
                <li className="pl-1"><strong>Weight:</strong> Transformers are extremely heavy — use proper lifting equipment and procedures</li>
                <li className="pl-1"><strong>CTs:</strong> Never open-circuit a CT secondary — always short before disconnecting</li>
              </ul>
            </div>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Transformers"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.3
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3-2">
              Next: Induction Motors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section3_1;
