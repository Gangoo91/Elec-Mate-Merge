import { ArrowLeft, Building2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Thermal Mass and Time Lag - HNC Module 2 Section 5.3";
const DESCRIPTION = "Understanding admittance (Y-value), decrement factor, heavyweight versus lightweight construction, and peak load shifting through thermal storage.";

const quickCheckQuestions = [
  {
    id: "admittance-def",
    question: "What does the admittance (Y-value) of a building element describe?",
    options: [
      "Its steady-state heat loss",
      "Its ability to store and release heat cyclically",
      "Its resistance to moisture penetration",
      "Its acoustic performance"
    ],
    correctIndex: 1,
    explanation: "Admittance (Y-value, W/m²K) describes how a surface absorbs and releases heat in response to cyclic temperature variations. Higher admittance means greater thermal storage capacity."
  },
  {
    id: "decrement-factor",
    question: "A wall has a decrement factor of 0.3. What does this mean?",
    options: [
      "30% of steady-state heat passes through",
      "The temperature swing inside is 30% of that outside",
      "70% of the heat is stored in the wall",
      "The wall has 30% thermal bridging"
    ],
    correctIndex: 1,
    explanation: "Decrement factor (f) is the ratio of internal to external temperature swing. f = 0.3 means if external temperature swings 20K, internal swing is only 6K (20 × 0.3) - the wall dampens fluctuations."
  },
  {
    id: "time-lag",
    question: "A heavyweight external wall has an 8-hour time lag. If peak external temperature is at 14:00, when does peak heat reach inside?",
    options: ["06:00", "14:00", "18:00", "22:00"],
    correctIndex: 3,
    explanation: "Time lag is the delay between external peak and internal peak. With 8-hour lag, external peak at 14:00 produces internal peak at 22:00 (14:00 + 8h), after occupants have left."
  },
  {
    id: "lightweight-cooling",
    question: "Why do lightweight buildings typically have higher peak cooling loads than heavyweight buildings?",
    options: [
      "They have worse insulation",
      "They cannot store heat to spread gains over time",
      "They have more glazing",
      "They always have more internal gains"
    ],
    correctIndex: 1,
    explanation: "Lightweight buildings cannot store heat, so all gains immediately raise temperature. Heavyweight buildings absorb gains into structure, reducing peak temperature and spreading load over time."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the units of thermal admittance (Y-value)?",
    options: [
      "m²K/W",
      "W/m²K",
      "W/mK",
      "J/kgK"
    ],
    correctAnswer: 1,
    explanation: "Admittance has the same units as U-value: W/m²K. However, they measure different properties - U-value is steady-state conductance, Y-value is cyclic response capability."
  },
  {
    id: 2,
    question: "Which building element typically has the highest admittance?",
    options: [
      "Plasterboard on studs",
      "Insulated lightweight steel panel",
      "Dense concrete (150mm exposed)",
      "Double glazing"
    ],
    correctAnswer: 2,
    explanation: "Dense concrete has high admittance (4-6 W/m²K) due to its thermal mass. Lightweight elements like plasterboard (1-2 W/m²K) and glazing (5-6 W/m²K) have moderate values but glazing doesn't store heat."
  },
  {
    id: 3,
    question: "What is the approximate time lag for a 215mm solid brick wall?",
    options: [
      "2-3 hours",
      "6-8 hours",
      "10-12 hours",
      "24 hours"
    ],
    correctAnswer: 1,
    explanation: "A 215mm solid brick wall has a time lag of approximately 6-8 hours. This shifts afternoon heat gains to evening, potentially reducing cooling demand during occupied hours."
  },
  {
    id: 4,
    question: "How does internal thermal mass (exposed concrete soffit) benefit an office building?",
    options: [
      "Reduces heating energy only",
      "Improves acoustic performance only",
      "Absorbs daytime gains, reducing cooling load and enabling night purge",
      "Increases natural daylight levels"
    ],
    correctAnswer: 2,
    explanation: "Exposed thermal mass absorbs heat during the day (reducing peak temperature) and releases it at night (when it can be purged with cool night air), reducing mechanical cooling requirements."
  },
  {
    id: 5,
    question: "What is 'night cooling' or 'night purge ventilation'?",
    options: [
      "Running the air conditioning at night",
      "Using cool night air to remove heat stored in thermal mass",
      "Closing all ventilation at night",
      "Cooling the external fabric at night"
    ],
    correctAnswer: 1,
    explanation: "Night purge ventilation uses cool night air to remove heat stored in thermal mass during the day. This 'recharges' the thermal storage, enabling it to absorb gains the following day."
  },
  {
    id: 6,
    question: "For the admittance method, what 24-hour temperature cycle is typically assumed?",
    options: [
      "Square wave",
      "Linear rise and fall",
      "Sinusoidal",
      "Exponential decay"
    ],
    correctAnswer: 2,
    explanation: "The CIBSE admittance method assumes a sinusoidal 24-hour temperature cycle. This mathematical simplification enables manual calculation of thermal storage effects."
  },
  {
    id: 7,
    question: "A building has high admittance sum (ΣAY). What does this indicate about its cooling load profile?",
    options: [
      "Higher peak cooling load",
      "Lower peak but longer duration cooling",
      "No effect on cooling load",
      "Higher ventilation rate required"
    ],
    correctAnswer: 1,
    explanation: "High ΣAY (admittance × area sum) means high thermal storage, reducing peak cooling load but spreading the load over more hours. This can enable smaller plant or shift load to cheaper off-peak periods."
  },
  {
    id: 8,
    question: "Which factor determines the position of insulation for best thermal mass performance?",
    options: [
      "Moisture resistance",
      "Whether mass is on warm (internal) or cold (external) side",
      "Fire rating requirements",
      "Acoustic requirements"
    ],
    correctAnswer: 1,
    explanation: "For thermal mass to be effective, it must be on the warm (internal) side of insulation. External insulation allows internal mass to interact with room temperature. Internal insulation isolates mass from the room."
  },
  {
    id: 9,
    question: "What is the typical admittance of a suspended ceiling with tiles?",
    options: [
      "0.5-1.0 W/m²K",
      "1.0-2.0 W/m²K",
      "4.0-5.0 W/m²K",
      "6.0-8.0 W/m²K"
    ],
    correctAnswer: 0,
    explanation: "Suspended ceiling tiles have very low admittance (0.5-1.0 W/m²K) due to their lightweight construction. They effectively isolate the room from any concrete soffit thermal mass above."
  },
  {
    id: 10,
    question: "In CIBSE Guide A, what is the response factor (fr) used for?",
    options: [
      "Fire spread calculations",
      "Classifying buildings as fast, medium or slow response",
      "Calculating ventilation rates",
      "Determining insulation thickness"
    ],
    correctAnswer: 1,
    explanation: "Response factor (fr) classifies building thermal response: fr < 4 = fast (lightweight), 4 < fr < 6 = medium, fr > 6 = slow (heavyweight). This affects both heating and cooling system selection."
  },
  {
    id: 11,
    question: "Why is thermal mass less effective in buildings with high ventilation rates?",
    options: [
      "Air removes heat faster than mass can store it",
      "Ventilation air has lower specific heat",
      "Fresh air is always at external temperature",
      "Thermal mass increases pressure drop"
    ],
    correctAnswer: 0,
    explanation: "High ventilation rates quickly remove heat from the space, reducing the benefit of thermal storage. The air change rate competes with thermal mass absorption - very high rates can make mass ineffective."
  },
  {
    id: 12,
    question: "For Part O overheating assessment, how does thermal mass affect compliance?",
    options: [
      "No effect - only glazing matters",
      "Helps in heavyweight construction by reducing peak temperatures",
      "Makes compliance harder due to heat storage",
      "Only relevant if mechanical cooling is installed"
    ],
    correctAnswer: 1,
    explanation: "TM59 overheating assessment benefits from thermal mass in heavyweight buildings. Peak temperatures are reduced through absorption, and night ventilation can discharge stored heat, aiding compliance."
  }
];

const faqs = [
  {
    question: "What is the difference between admittance (Y-value) and thermal diffusivity?",
    answer: "Admittance describes cyclic heat flow at a surface (W/m²K) and is used for room temperature calculations. Thermal diffusivity (m²/s) describes how quickly temperature changes propagate through a material and determines time lag. Both relate to thermal mass but for different calculation purposes."
  },
  {
    question: "How do I maximise the benefit of thermal mass in a building?",
    answer: "Expose thermal mass to the room (no suspended ceilings over concrete), place insulation on the external side, ensure good contact between mass and room air, avoid carpets over concrete floors, and enable night ventilation to discharge stored heat. Consider radiant ceiling panels which allow mass contact while providing cooling."
  },
  {
    question: "Is thermal mass always beneficial for energy efficiency?",
    answer: "Not always. Thermal mass benefits buildings with variable gains and the ability to discharge heat at night. Continuously occupied buildings (hospitals, data centres) or those without night cooling opportunity may not benefit. Intermittently heated buildings may take longer to warm up."
  },
  {
    question: "How do phase change materials (PCMs) provide thermal mass?",
    answer: "PCMs store latent heat by melting and solidifying at a set temperature (typically 21-26°C for buildings). They provide equivalent thermal storage to much heavier concrete in lighter materials. However, they need temperature cycling through their phase change point to be effective."
  },
  {
    question: "Why do modern offices often have poor thermal mass despite concrete structure?",
    answer: "Suspended ceilings isolate concrete soffits, raised floors separate floor mass, internal partitions are lightweight, and HVAC systems often overwhelm thermal effects. To utilise mass: expose soffits where possible, use thermally active building systems (TABS), and coordinate with architectural design early."
  },
  {
    question: "How does thermal mass affect heating system sizing?",
    answer: "Heavyweight buildings are slow to respond, requiring either: (1) longer preheat periods (6-8 hours vs 2-3 hours for lightweight), or (2) larger plant for faster warm-up. Optimised controls can learn response characteristics. For intermittent heating, consider overall energy vs responsiveness trade-off."
  }
];

const HNCModule2Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section5">
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
            <Building2 className="h-4 w-4" />
            <span>Module 2.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Thermal Mass and Time Lag
          </h1>
          <p className="text-white/80">
            How building fabric stores heat and affects temperature response over time
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Admittance (Y):</strong> Surface heat absorption capacity (W/m²K)</li>
              <li className="pl-1"><strong>Decrement (f):</strong> Dampening of external temperature swings</li>
              <li className="pl-1"><strong>Time lag (φ):</strong> Delay between outside and inside peaks</li>
              <li className="pl-1"><strong>Thermal mass:</strong> Heat storage in heavy building elements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Peak shifting:</strong> Move cooling load to evening/night</li>
              <li className="pl-1"><strong>Load reduction:</strong> Lower peak = smaller plant</li>
              <li className="pl-1"><strong>Night purge:</strong> Free cooling using stored heat discharge</li>
              <li className="pl-1"><strong>Comfort:</strong> More stable temperatures</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define admittance, decrement factor and time lag",
              "Compare heavyweight and lightweight building responses",
              "Calculate temperature swing using the admittance method",
              "Apply thermal mass strategies for peak load reduction",
              "Understand night cooling and thermal mass discharge",
              "Select appropriate constructions for thermal performance"
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

        {/* Section 1: Admittance Concept */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Admittance (Y-Value) - Cyclic Heat Storage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Admittance describes how a surface absorbs and releases heat in response to cyclic (daily) temperature
              variations. Unlike U-value which describes steady-state heat loss, admittance captures the dynamic
              heat storage behaviour crucial for cooling load calculations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key concepts:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Units:</strong> W/m²K (same as U-value, but different meaning)</li>
                <li className="pl-1"><strong>High admittance:</strong> Good heat storage, dampens temperature swings</li>
                <li className="pl-1"><strong>Low admittance:</strong> Poor storage, temperature follows gains closely</li>
                <li className="pl-1"><strong>Surface dependent:</strong> Only exposed surfaces contribute to room</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Admittance Values (CIBSE Guide A)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Y-value (W/m²K)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Classification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">150mm exposed concrete</td>
                      <td className="border border-white/10 px-3 py-2">5.5-6.0</td>
                      <td className="border border-white/10 px-3 py-2">Very heavy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dense blockwork plastered</td>
                      <td className="border border-white/10 px-3 py-2">4.0-5.0</td>
                      <td className="border border-white/10 px-3 py-2">Heavy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Brick wall plastered</td>
                      <td className="border border-white/10 px-3 py-2">3.5-4.5</td>
                      <td className="border border-white/10 px-3 py-2">Heavy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Timber floor</td>
                      <td className="border border-white/10 px-3 py-2">2.5-3.5</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plasterboard on studs</td>
                      <td className="border border-white/10 px-3 py-2">1.5-2.0</td>
                      <td className="border border-white/10 px-3 py-2">Light</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Suspended ceiling tiles</td>
                      <td className="border border-white/10 px-3 py-2">0.5-1.0</td>
                      <td className="border border-white/10 px-3 py-2">Very light</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Double glazing</td>
                      <td className="border border-white/10 px-3 py-2">5.5-6.0</td>
                      <td className="border border-white/10 px-3 py-2">High (but no storage)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Room Admittance Sum</p>
              <p className="font-mono text-center text-sm mb-2">ΣAY = Σ(A<sub>i</sub> × Y<sub>i</sub>)</p>
              <p className="text-xs text-white/70 text-center">Sum of all surface areas × their admittances = total room storage capacity</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Glazing has high admittance but this represents rapid heat exchange, not storage. True thermal mass requires dense materials like concrete, brick or masonry.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Decrement Factor and Time Lag */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Decrement Factor and Time Lag
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As heat passes through an external element, it is dampened (decrement) and delayed (time lag).
              These properties are crucial for understanding how external temperature swings affect internal conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Definitions:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Decrement factor (f):</strong> Ratio of internal to external temperature swing (0-1)</li>
                <li className="pl-1"><strong>Time lag (φ):</strong> Hours delay between external and internal temperature peaks</li>
                <li className="pl-1"><strong>Heavy elements:</strong> Low f (0.1-0.3), high φ (8-12 hours)</li>
                <li className="pl-1"><strong>Light elements:</strong> High f (0.7-1.0), low φ (1-3 hours)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Wall Performance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Wall Construction</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Decrement (f)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Time Lag (hours)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">215mm solid brick</td>
                      <td className="border border-white/10 px-3 py-2">0.35</td>
                      <td className="border border-white/10 px-3 py-2">7-8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">300mm concrete</td>
                      <td className="border border-white/10 px-3 py-2">0.15</td>
                      <td className="border border-white/10 px-3 py-2">10-12</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cavity wall with insulation</td>
                      <td className="border border-white/10 px-3 py-2">0.25-0.40</td>
                      <td className="border border-white/10 px-3 py-2">6-8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulated steel panel</td>
                      <td className="border border-white/10 px-3 py-2">0.85-0.95</td>
                      <td className="border border-white/10 px-3 py-2">1-2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Timber frame insulated</td>
                      <td className="border border-white/10 px-3 py-2">0.65-0.80</td>
                      <td className="border border-white/10 px-3 py-2">2-4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heavyweight Benefits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lower peak cooling demand</li>
                  <li className="pl-1">More stable temperatures</li>
                  <li className="pl-1">Potential for night purge cooling</li>
                  <li className="pl-1">Reduces overheating risk</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lightweight Benefits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fast heat-up for intermittent use</li>
                  <li className="pl-1">Lower structural requirements</li>
                  <li className="pl-1">Faster construction</li>
                  <li className="pl-1">Immediate response to controls</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design strategy:</strong> An 8-hour time lag shifts afternoon peak (14:00) to evening (22:00) when occupants have left and external temperature has dropped, enabling natural or free cooling.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Peak Load Shifting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Peak Load Shifting and Night Cooling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal mass can shift cooling loads from peak daytime periods to night-time when external conditions
              are cooler and electricity may be cheaper. This is the basis of many low-energy cooling strategies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Night cooling strategies:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Night purge ventilation:</strong> High airflow (4-10 ach) through open windows/louvres</li>
                <li className="pl-1"><strong>Mechanical night cooling:</strong> Fans run overnight with 100% outside air</li>
                <li className="pl-1"><strong>Thermally active building systems (TABS):</strong> Water pipes in slab for thermal charging</li>
                <li className="pl-1"><strong>Free cooling:</strong> Economiser cycle using cool night air</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Night Cooling Effectiveness</p>
              <p className="text-sm text-white mb-2">
                Requirements for effective night cooling:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Significant diurnal temperature swing (UK typically 8-12K in summer)</li>
                <li className="pl-1">Night temperature below internal setpoint (below ~20°C)</li>
                <li className="pl-1">Exposed thermal mass in contact with supply air</li>
                <li className="pl-1">Adequate ventilation rate to discharge stored heat</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Daily Cycle - Heavyweight Office</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Behaviour</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature Effect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">06:00-09:00</td>
                      <td className="border border-white/10 px-3 py-2">Pre-cooling complete, mass discharged</td>
                      <td className="border border-white/10 px-3 py-2">Fabric at 18-20°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">09:00-14:00</td>
                      <td className="border border-white/10 px-3 py-2">Gains absorbed by mass</td>
                      <td className="border border-white/10 px-3 py-2">Gradual rise to 23-24°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">14:00-18:00</td>
                      <td className="border border-white/10 px-3 py-2">Mass approaches capacity</td>
                      <td className="border border-white/10 px-3 py-2">Peak ~25°C (limited cooling)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">18:00-22:00</td>
                      <td className="border border-white/10 px-3 py-2">Building unoccupied, cooling starts</td>
                      <td className="border border-white/10 px-3 py-2">Starting discharge</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">22:00-06:00</td>
                      <td className="border border-white/10 px-3 py-2">Night purge at high rate</td>
                      <td className="border border-white/10 px-3 py-2">Mass cooled to 18-20°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Climate suitability:</strong> Night cooling works well in the UK climate with diurnal swings and relatively cool nights. Less effective in humid climates or during heatwaves with warm nights.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Practical Design Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Design Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Realising the benefits of thermal mass requires coordination between architectural design,
              structural engineering, and building services. Many modern buildings inadvertently isolate
              thermal mass from the occupied space.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maximising thermal mass effectiveness:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Expose concrete soffits:</strong> Avoid suspended ceilings where possible</li>
                <li className="pl-1"><strong>External insulation:</strong> Keep mass on warm side of insulation</li>
                <li className="pl-1"><strong>Direct contact:</strong> Good air circulation past mass surfaces</li>
                <li className="pl-1"><strong>Avoid coverings:</strong> No carpets over concrete floors for thermal mass</li>
                <li className="pl-1"><strong>Adequate depth:</strong> 75-100mm of exposed concrete provides most benefit</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Response Factor (fr)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">fr = ΣAY / ΣAU</li>
                  <li className="pl-1">fr &lt; 4: Fast response (lightweight)</li>
                  <li className="pl-1">4 &lt; fr &lt; 6: Medium response</li>
                  <li className="pl-1">fr &gt; 6: Slow response (heavyweight)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heating System Implications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Heavyweight: 6-8 hour preheat</li>
                  <li className="pl-1">Medium: 3-4 hour preheat</li>
                  <li className="pl-1">Lightweight: 1-2 hour preheat</li>
                  <li className="pl-1">Or size plant for faster response</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part O and Thermal Mass</p>
              <p className="text-sm text-white">
                TM59 overheating assessment considers thermal mass through dynamic simulation. Heavyweight
                construction typically performs better due to:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5 mt-2">
                <li className="pl-1">Lower peak temperatures (Criterion 1 - hours over 26°C)</li>
                <li className="pl-1">Better night-time recovery enabling next-day absorption</li>
                <li className="pl-1">More time for occupants to adapt or take action</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Modern alternatives:</strong> Phase change materials (PCMs) integrated into plasterboard or ceiling tiles can provide thermal mass benefits in lightweight construction, melting at ~23°C to absorb heat.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Room Admittance Sum</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate ΣAY for a room with: exposed concrete ceiling 50m² (Y=5.5),
                plastered brick walls 80m² (Y=4.0), carpeted floor 50m² (Y=1.0), glazing 15m² (Y=5.7).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>ΣAY = (50 × 5.5) + (80 × 4.0) + (50 × 1.0) + (15 × 5.7)</p>
                <p>ΣAY = 275 + 320 + 50 + 85.5</p>
                <p>ΣAY = <strong>730.5 W/K</strong></p>
                <p className="mt-2 text-white/60">This is a medium-heavyweight room due to exposed concrete ceiling</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Impact of Suspended Ceiling</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> The same room has a suspended ceiling installed (Y=0.8). How does this affect ΣAY?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>New ceiling admittance: 50 × 0.8 = 40 (replacing 275)</p>
                <p>New ΣAY = 40 + 320 + 50 + 85.5 = <strong>495.5 W/K</strong></p>
                <p className="mt-2 text-red-400">Reduction = 730.5 - 495.5 = 235 W/K (32% loss)</p>
                <p className="mt-2 text-white/60">Suspended ceiling significantly reduces thermal storage capacity</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Decrement Effect</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> External sol-air temperature swings from 25°C to 45°C (±10K from mean of 35°C).
                A wall with f=0.25 separates the room. What is the internal surface temperature swing?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>External swing = ±10K (total 20K range)</p>
                <p>Internal swing = External × Decrement = ±10K × 0.25 = <strong>±2.5K</strong></p>
                <p className="mt-2 text-white/60">Internal surface only varies 5K total vs 20K external</p>
                <p className="text-green-400">75% of temperature variation eliminated by thermal mass</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Response Factor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A room has ΣAY = 650 W/K and total heat loss coefficient ΣAU = 95 W/K.
                What is its response factor and classification?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>fr = ΣAY / ΣAU = 650 / 95 = <strong>6.8</strong></p>
                <p className="mt-2">Classification: fr &gt; 6 = <strong>Slow response (heavyweight)</strong></p>
                <p className="mt-2 text-white/60">Expect 6-8 hour preheat, good for night cooling strategy</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Concepts</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>ΣAY:</strong> Sum of (Area × Admittance) for all surfaces</li>
                <li className="pl-1"><strong>Response factor:</strong> fr = ΣAY / ΣAU (storage vs loss)</li>
                <li className="pl-1"><strong>Decrement:</strong> f = internal swing / external swing</li>
                <li className="pl-1"><strong>Time lag:</strong> Delay in hours from external to internal peak</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Exposed concrete: <strong>Y = 5.5-6.0 W/m²K</strong></li>
                <li className="pl-1">Suspended ceiling tiles: <strong>Y = 0.5-1.0 W/m²K</strong></li>
                <li className="pl-1">Solid brick wall: <strong>f ≈ 0.35, φ ≈ 7-8 hours</strong></li>
                <li className="pl-1">Lightweight response: <strong>fr &lt; 4</strong></li>
                <li className="pl-1">Heavyweight response: <strong>fr &gt; 6</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Isolated mass:</strong> Suspended ceilings waste structural mass</li>
                <li className="pl-1"><strong>Internal insulation:</strong> Puts mass on cold side (wrong)</li>
                <li className="pl-1"><strong>No night ventilation:</strong> Mass cannot discharge heat</li>
                <li className="pl-1"><strong>Glazing as mass:</strong> High Y but no storage capacity</li>
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
                <p className="font-medium text-white mb-1">Thermal Mass Properties</p>
                <ul className="space-y-0.5">
                  <li>Y-value: Cyclic heat absorption (W/m²K)</li>
                  <li>Decrement: Temperature swing reduction</li>
                  <li>Time lag: Peak delay (hours)</li>
                  <li>Effective depth: ~75-100mm into mass</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Design Strategies</p>
                <ul className="space-y-0.5">
                  <li>Expose concrete soffits</li>
                  <li>External insulation preferred</li>
                  <li>Enable night purge ventilation</li>
                  <li>Coordinate with architecture early</li>
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
            <Link to="../h-n-c-module2-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section5-4">
              Next: Air Infiltration and Ventilation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section5_3;
