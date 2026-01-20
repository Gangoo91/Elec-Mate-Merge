import { ArrowLeft, Calculator, Zap, CheckCircle, AlertTriangle, BookOpen, Link2, TrendingDown, Target, Ruler, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Loss Budgets and Length Limits - Fibre Optics Technology";
const DESCRIPTION = "Learn how to calculate optical loss budgets, understand length limitations, connector and splice loss allowances, and ensure your fibre installation meets performance requirements.";

const quickCheckQuestions = [
  {
    question: "What is the typical loss allowance for a mated SC connector pair in a loss budget calculation?",
    options: [
      { text: "0.1 dB", isCorrect: false },
      { text: "0.3 dB", isCorrect: false },
      { text: "0.5 dB", isCorrect: true },
      { text: "0.75 dB", isCorrect: false }
    ],
    explanation: "TIA-568 standards allow 0.5 dB maximum loss per mated connector pair for loss budget calculations. Field terminations should achieve better than this, but the budget uses worst-case values."
  },
  {
    question: "If OM3 multimode fibre has an attenuation of 3.5 dB/km at 850nm, what is the loss for a 300m run?",
    options: [
      { text: "0.35 dB", isCorrect: false },
      { text: "1.05 dB", isCorrect: true },
      { text: "3.5 dB", isCorrect: false },
      { text: "10.5 dB", isCorrect: false }
    ],
    explanation: "Fibre loss = Length (km) × Attenuation (dB/km). So 0.3 km × 3.5 dB/km = 1.05 dB. Always convert metres to kilometres before calculating."
  },
  {
    question: "Why is a safety margin (typically 3 dB) included in loss budget calculations?",
    options: [
      { text: "To account for equipment inaccuracy", isCorrect: false },
      { text: "Because standards require it", isCorrect: false },
      { text: "To allow for future repairs, ageing, and additional connections", isCorrect: true },
      { text: "To compensate for temperature changes only", isCorrect: false }
    ],
    explanation: "The safety margin accounts for future repairs requiring additional splices, fibre ageing, temperature effects, possible connector degradation, and any unforeseen losses over the system's lifetime."
  }
];

const quizQuestions = [
  {
    question: "What is the formula for calculating total link loss in a fibre optic system?",
    options: [
      { text: "Fibre loss + Connector losses + Splice losses + Safety margin", isCorrect: true },
      { text: "Transmitter power ÷ Receiver sensitivity", isCorrect: false },
      { text: "Length × Number of connectors × Splice count", isCorrect: false },
      { text: "Cable attenuation × Safety factor", isCorrect: false }
    ],
    explanation: "Total link loss = Fibre attenuation loss + All connector pair losses + All splice losses + Safety margin. This total must be less than the available power budget."
  },
  {
    question: "What is the maximum attenuation coefficient for OS2 singlemode fibre at 1310nm?",
    options: [
      { text: "0.2 dB/km", isCorrect: false },
      { text: "0.35 dB/km", isCorrect: true },
      { text: "0.5 dB/km", isCorrect: false },
      { text: "1.0 dB/km", isCorrect: false }
    ],
    explanation: "OS2 singlemode fibre has a maximum attenuation of 0.35 dB/km at 1310nm and 0.22 dB/km at 1550nm. These low values enable long-distance transmission."
  },
  {
    question: "What is the typical fusion splice loss allowance used in loss budget calculations?",
    options: [
      { text: "0.1 dB per splice", isCorrect: true },
      { text: "0.3 dB per splice", isCorrect: false },
      { text: "0.5 dB per splice", isCorrect: false },
      { text: "0.75 dB per splice", isCorrect: false }
    ],
    explanation: "Fusion splices typically achieve 0.1 dB or less loss. Loss budgets use this value, though actual measured losses are often better (0.02-0.05 dB)."
  },
  {
    question: "A link has 4 connector pairs and 2 fusion splices. What is the total connection loss allowance?",
    options: [
      { text: "1.5 dB", isCorrect: false },
      { text: "2.0 dB", isCorrect: false },
      { text: "2.2 dB", isCorrect: true },
      { text: "3.0 dB", isCorrect: false }
    ],
    explanation: "Connection loss = (4 × 0.5 dB connectors) + (2 × 0.1 dB splices) = 2.0 dB + 0.2 dB = 2.2 dB total."
  },
  {
    question: "What does 'power budget' refer to in fibre optic systems?",
    options: [
      { text: "The electrical power consumption of equipment", isCorrect: false },
      { text: "The difference between transmitter output power and receiver sensitivity", isCorrect: true },
      { text: "The cost budget for the installation", isCorrect: false },
      { text: "The maximum number of connections allowed", isCorrect: false }
    ],
    explanation: "Power budget = Transmitter output power (dBm) - Receiver sensitivity (dBm). This gives the maximum allowable loss in dB that the link can tolerate."
  },
  {
    question: "If a transmitter outputs -3 dBm and the receiver sensitivity is -23 dBm, what is the power budget?",
    options: [
      { text: "26 dB", isCorrect: false },
      { text: "23 dB", isCorrect: false },
      { text: "20 dB", isCorrect: true },
      { text: "-26 dB", isCorrect: false }
    ],
    explanation: "Power budget = -3 dBm - (-23 dBm) = -3 + 23 = 20 dB. This is the maximum loss the system can handle while maintaining communication."
  },
  {
    question: "What is the maximum channel length for OM4 multimode fibre at 10 Gigabit Ethernet (850nm)?",
    options: [
      { text: "100 metres", isCorrect: false },
      { text: "300 metres", isCorrect: false },
      { text: "400 metres", isCorrect: true },
      { text: "550 metres", isCorrect: false }
    ],
    explanation: "OM4 supports 10GbE up to 400m at 850nm. This is limited by modal dispersion rather than attenuation. OM3 supports 300m for the same application."
  },
  {
    question: "Why are multimode fibre length limits often determined by bandwidth rather than attenuation?",
    options: [
      { text: "Multimode fibre has very high attenuation", isCorrect: false },
      { text: "Modal dispersion causes signal spreading that limits data rates over distance", isCorrect: true },
      { text: "Multimode connectors have higher losses", isCorrect: false },
      { text: "LED sources used with multimode are very weak", isCorrect: false }
    ],
    explanation: "In multimode fibre, different modes travel at slightly different speeds (modal dispersion), causing pulses to spread and overlap. This limits the distance more than attenuation at high data rates."
  },
  {
    question: "What is the difference between 'channel' and 'permanent link' testing?",
    options: [
      { text: "Channel testing uses more expensive equipment", isCorrect: false },
      { text: "Channel includes equipment cords; permanent link tests only installed cabling", isCorrect: true },
      { text: "Permanent link testing is more accurate", isCorrect: false },
      { text: "There is no difference; they are the same test", isCorrect: false }
    ],
    explanation: "Channel testing includes equipment cords and patch leads (end-to-end). Permanent link testing excludes these, testing only the installed infrastructure. Both have different loss limits."
  },
  {
    question: "What typical safety margin should be included in a loss budget for a critical telecommunications link?",
    options: [
      { text: "0.5 dB", isCorrect: false },
      { text: "1.0 dB", isCorrect: false },
      { text: "3.0 dB", isCorrect: true },
      { text: "10 dB", isCorrect: false }
    ],
    explanation: "A 3 dB safety margin is standard for most installations. This accounts for future repairs, ageing, temperature variations, and any unforeseen degradation over the system's lifetime."
  }
];

const faqs = [
  {
    question: "Why do loss budgets use worst-case values rather than typical values?",
    answer: "Loss budgets use worst-case (maximum) values to ensure the link will work reliably under all conditions. Using typical values might result in links that work initially but fail after temperature changes, ageing, or when a connector is remated. Standards specify maximum allowable values specifically for this purpose."
  },
  {
    question: "Can I use measured loss values instead of calculated budgets?",
    answer: "Measured values are essential for certification but the calculated loss budget remains important for design. You should first calculate the budget to verify the design is feasible, then test to confirm actual performance. If measured losses significantly exceed calculations, investigate for problems."
  },
  {
    question: "How does temperature affect fibre loss?",
    answer: "Temperature variations can increase fibre attenuation, particularly at extreme cold or hot temperatures. Macrobending effects can also worsen with temperature as cable jackets expand or contract. Standard loss budgets include temperature effects within the safety margin."
  },
  {
    question: "What happens if my link loss exceeds the power budget?",
    answer: "If link loss exceeds the power budget, the receiver won't get enough signal to operate correctly. Options include: reducing the number of connections, using lower-loss components, using fibre with lower attenuation, or specifying transceivers with higher power output or better receiver sensitivity."
  },
  {
    question: "Why are singlemode fibre distance limits much longer than multimode?",
    answer: "Singlemode fibre has both lower attenuation (0.35 dB/km vs 3.5 dB/km) and no modal dispersion because only one mode propagates. This allows distances of tens of kilometres compared to hundreds of metres for multimode at high data rates."
  },
  {
    question: "What is modal bandwidth and how does it affect distance?",
    answer: "Modal bandwidth (measured in MHz·km) indicates how much data can be transmitted over distance before modal dispersion degrades the signal. Higher bandwidth ratings (OM3: 2000 MHz·km, OM4: 4700 MHz·km at 850nm) allow longer distances at high data rates."
  }
];

const FiberOpticsModule6Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/electrical-upskilling/fiber-optics-module-6" className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Module 6</span>
          </Link>
          <span className="text-white/50 text-sm">Section 3 of 4</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="px-4 pt-8 pb-6 bg-gradient-to-b from-[#1a1a1a] to-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-elec-yellow/20 text-elec-yellow text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            MODULE 6 · SECTION 3
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Loss Budgets and Length Limits
          </h1>
          <p className="text-white/70 text-lg">
            Master the calculations that ensure fibre links perform reliably under all conditions
          </p>
        </div>
      </div>

      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Quick Summary Boxes */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <Calculator className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Loss Budget</h3>
              <p className="text-white/60 text-xs">Calculate maximum allowable losses for reliable operation</p>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <Ruler className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Length Limits</h3>
              <p className="text-white/60 text-xs">Distance restrictions based on fibre type and data rate</p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-[#252525] rounded-xl p-6 border border-white/10 mb-10">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <Target className="w-5 h-5 text-elec-yellow" />
              Learning Outcomes
            </h2>
            <ul className="space-y-3">
              {[
                "Calculate optical loss budgets for multimode and singlemode links",
                "Apply correct loss values for connectors, splices, and fibre",
                "Understand power budget and receiver sensitivity concepts",
                "Determine maximum link lengths based on attenuation and bandwidth",
                "Apply appropriate safety margins for long-term reliability"
              ].map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 01: Introduction to Loss Budgets */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Understanding Loss Budgets
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                A <strong className="text-white">loss budget</strong> is a calculation that determines whether a fibre optic link will work reliably. It compares the total expected losses in the link (fibre attenuation, connector losses, splice losses) against the available power margin (transmitter power minus receiver sensitivity).
              </p>
              <p>
                Loss budget calculations are essential during the design phase—before any cable is installed. They ensure the proposed design will work and identify any potential problems that need addressing.
              </p>
            </div>

            {/* Key Concept Box */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-elec-yellow" />
                The Golden Rule
              </h4>
              <p className="text-white/70 text-sm">
                <strong className="text-white">Total Link Loss must be LESS than Power Budget.</strong> If your calculated link loss exceeds the available power budget, the link will not work reliably and the design must be modified.
              </p>
            </div>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Loss Budget Components</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Fibre Attenuation Loss</h5>
                    <p className="text-white/60 text-sm">Cable length (km) × Attenuation coefficient (dB/km)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Connector Losses</h5>
                    <p className="text-white/60 text-sm">Number of mated pairs × 0.5 dB per pair (max)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Splice Losses</h5>
                    <p className="text-white/60 text-sm">Number of splices × 0.1 dB per fusion splice</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Safety Margin</h5>
                    <p className="text-white/60 text-sm">Typically 3 dB for repairs, ageing, and environmental factors</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 02: Fibre Attenuation Values */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Fibre Attenuation Coefficients
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Different fibre types have different attenuation coefficients. These values are specified as maximum values in dB per kilometre (dB/km). Always use the values for your specific fibre type and operating wavelength.
              </p>
            </div>

            {/* Multimode Fibre Table */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Multimode Fibre Attenuation (Maximum)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Fibre Type</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">850nm</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">1300nm</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">OM1 (62.5/125)</td>
                      <td className="py-2 px-3 text-center">3.5 dB/km</td>
                      <td className="py-2 px-3 text-center">1.5 dB/km</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">OM2 (50/125)</td>
                      <td className="py-2 px-3 text-center">3.5 dB/km</td>
                      <td className="py-2 px-3 text-center">1.5 dB/km</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">OM3 (50/125)</td>
                      <td className="py-2 px-3 text-center">3.5 dB/km</td>
                      <td className="py-2 px-3 text-center">1.5 dB/km</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">OM4 (50/125)</td>
                      <td className="py-2 px-3 text-center">3.5 dB/km</td>
                      <td className="py-2 px-3 text-center">1.5 dB/km</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Singlemode Fibre Table */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Singlemode Fibre Attenuation (Maximum)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Fibre Type</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">1310nm</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">1550nm</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">OS1 (Indoor)</td>
                      <td className="py-2 px-3 text-center">1.0 dB/km</td>
                      <td className="py-2 px-3 text-center">1.0 dB/km</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">OS2 (Outdoor)</td>
                      <td className="py-2 px-3 text-center">0.35 dB/km</td>
                      <td className="py-2 px-3 text-center">0.22 dB/km</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Key Point: OS1 vs OS2
              </h4>
              <p className="text-white/70 text-sm">
                OS1 fibre (typically indoor tight-buffered) has higher attenuation due to cable construction. OS2 (loose-tube outdoor) achieves much lower attenuation. For long-distance links, OS2 fibre is essential for meeting loss budgets.
              </p>
            </div>

            {/* Inline Check 1 */}
            <InlineCheck
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Section 03: Connection Losses */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Connector and Splice Loss Allowances
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Every connection in a fibre link introduces loss. Standards specify maximum allowable values that should be used for loss budget calculations. Actual measured losses should be better than these values.
              </p>
            </div>

            {/* Connection Loss Table */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Standard Connection Loss Allowances</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Connection Type</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">Budget Value</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">Typical Actual</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Mated connector pair (any type)</td>
                      <td className="py-2 px-3 text-center font-semibold text-elec-yellow">0.5 dB</td>
                      <td className="py-2 px-3 text-center">0.2-0.3 dB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Fusion splice</td>
                      <td className="py-2 px-3 text-center font-semibold text-elec-yellow">0.1 dB</td>
                      <td className="py-2 px-3 text-center">0.02-0.05 dB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Mechanical splice</td>
                      <td className="py-2 px-3 text-center font-semibold text-elec-yellow">0.3 dB</td>
                      <td className="py-2 px-3 text-center">0.1-0.2 dB</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Pre-terminated factory connector</td>
                      <td className="py-2 px-3 text-center font-semibold text-elec-yellow">0.5 dB</td>
                      <td className="py-2 px-3 text-center">0.1-0.2 dB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Counting Connectors Correctly
              </h4>
              <p className="text-white/70 text-sm">
                Count <strong className="text-white">mated pairs</strong>, not individual connectors. A patch lead plugged into a patch panel counts as one mated pair. A link with two patch leads at each end through two patch panels has 4 mated connector pairs.
              </p>
            </div>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Example: Counting Connections</h4>
              <p className="text-white/70 text-sm mb-4">
                A typical horizontal link with one patch lead at each end through a floor distributor (FD) to a consolidation point (CP):
              </p>
              <div className="bg-[#1a1a1a] p-4 rounded-lg font-mono text-sm text-white/80">
                <p className="mb-2">[Equipment] -- Patch -- [FD Panel] == Cable == [CP] -- Outlet -- [Device]</p>
                <p className="text-white/60 mt-3">Mated pairs: Equipment patch (1) + FD patch (1) + Outlet (1) = <span className="text-elec-yellow font-bold">3 pairs</span></p>
                <p className="text-white/60">Connection loss allowance: 3 × 0.5 dB = <span className="text-elec-yellow font-bold">1.5 dB</span></p>
              </div>
            </div>
          </section>

          {/* Section 04: Power Budget */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Power Budget Calculation
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                The <strong className="text-white">power budget</strong> is the difference between the transmitter's output power and the receiver's sensitivity. This determines the maximum loss a link can tolerate while still functioning correctly.
              </p>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2">Power Budget Formula</h4>
              <p className="text-white/80 font-mono text-lg">
                Power Budget (dB) = P<sub>tx</sub> (dBm) − P<sub>rx</sub> (dBm)
              </p>
              <p className="text-white/60 text-sm mt-2">
                Where P<sub>tx</sub> is transmitter output power and P<sub>rx</sub> is receiver sensitivity (minimum detectable power)
              </p>
            </div>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Typical Transceiver Specifications</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Transceiver Type</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">Tx Power</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">Rx Sensitivity</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">Power Budget</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">1000BASE-SX (MM)</td>
                      <td className="py-2 px-3 text-center">-9.5 to -3 dBm</td>
                      <td className="py-2 px-3 text-center">-17 dBm</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">7.5-14 dB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">10GBASE-SR (MM)</td>
                      <td className="py-2 px-3 text-center">-7.3 to -1 dBm</td>
                      <td className="py-2 px-3 text-center">-9.9 dBm</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">2.6-8.9 dB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">1000BASE-LX (SM)</td>
                      <td className="py-2 px-3 text-center">-11.5 to -3 dBm</td>
                      <td className="py-2 px-3 text-center">-19 dBm</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">7.5-16 dB</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">10GBASE-LR (SM)</td>
                      <td className="py-2 px-3 text-center">-8.2 to 0.5 dBm</td>
                      <td className="py-2 px-3 text-center">-14.4 dBm</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">6.2-14.9 dB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inline Check 2 */}
            <InlineCheck
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 05: Complete Loss Budget Example */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Complete Loss Budget Calculation
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Let's work through a complete loss budget calculation for a typical campus backbone link using OM4 multimode fibre.
              </p>
            </div>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Scenario: Campus Backbone Link</h4>
              <ul className="space-y-2 text-white/70 text-sm mb-4">
                <li>• Fibre type: OM4 multimode</li>
                <li>• Wavelength: 850nm (10GBASE-SR)</li>
                <li>• Cable length: 280 metres</li>
                <li>• Connector pairs: 4 (patch leads at each end, two distribution frames)</li>
                <li>• Fusion splices: 2 (mid-span splice enclosure)</li>
                <li>• Transceiver: 10GBASE-SR (worst case power budget: 2.6 dB)</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-elec-yellow/30 mb-6">
              <h4 className="font-semibold text-elec-yellow mb-4">Loss Budget Calculation</h4>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between text-white/80 border-b border-white/10 pb-2">
                  <span>Fibre loss: 0.28 km × 3.5 dB/km</span>
                  <span className="text-white">=  0.98 dB</span>
                </div>
                <div className="flex justify-between text-white/80 border-b border-white/10 pb-2">
                  <span>Connector loss: 4 pairs × 0.5 dB</span>
                  <span className="text-white">=  2.00 dB</span>
                </div>
                <div className="flex justify-between text-white/80 border-b border-white/10 pb-2">
                  <span>Splice loss: 2 × 0.1 dB</span>
                  <span className="text-white">=  0.20 dB</span>
                </div>
                <div className="flex justify-between text-white/80 border-b border-white/10 pb-2">
                  <span>Safety margin</span>
                  <span className="text-white">=  3.00 dB</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-elec-yellow/30">
                  <span>Total Link Loss</span>
                  <span className="text-elec-yellow">=  6.18 dB</span>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Result: Link FAILS
              </h4>
              <p className="text-white/70 text-sm">
                Total link loss (6.18 dB) exceeds the power budget (2.6 dB). This link will NOT work reliably with 10GBASE-SR transceivers.
              </p>
            </div>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Solutions to Consider</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Reduce safety margin to 1 dB</span>
                    <p className="text-white/60 text-sm">New total: 4.18 dB — still fails</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Reduce connector pairs (direct patching)</span>
                    <p className="text-white/60 text-sm">2 pairs instead of 4: saves 1.0 dB</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Use extended reach transceivers</span>
                    <p className="text-white/60 text-sm">Higher power budget available with some SFP+ modules</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Use pre-terminated low-loss MPO system</span>
                    <p className="text-white/60 text-sm">Factory terminations typically achieve &lt;0.3 dB per pair</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 06: Length Limits */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Maximum Length Limits
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Maximum link lengths are determined by two factors: <strong className="text-white">attenuation</strong> (signal gets weaker over distance) and <strong className="text-white">bandwidth</strong> (signal spreads over distance due to dispersion). For multimode fibre at high data rates, bandwidth is usually the limiting factor.
              </p>
            </div>

            {/* Multimode Distance Limits */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Multimode Fibre Distance Limits (850nm)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Application</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">OM1</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">OM2</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">OM3</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">OM4</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">1 Gigabit Ethernet</td>
                      <td className="py-2 px-3 text-center">275m</td>
                      <td className="py-2 px-3 text-center">550m</td>
                      <td className="py-2 px-3 text-center">550m</td>
                      <td className="py-2 px-3 text-center">550m</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">10 Gigabit Ethernet</td>
                      <td className="py-2 px-3 text-center">33m</td>
                      <td className="py-2 px-3 text-center">82m</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">300m</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">400m</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">25 Gigabit Ethernet</td>
                      <td className="py-2 px-3 text-center">—</td>
                      <td className="py-2 px-3 text-center">—</td>
                      <td className="py-2 px-3 text-center">70m</td>
                      <td className="py-2 px-3 text-center">100m</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">40 Gigabit Ethernet</td>
                      <td className="py-2 px-3 text-center">—</td>
                      <td className="py-2 px-3 text-center">—</td>
                      <td className="py-2 px-3 text-center">100m</td>
                      <td className="py-2 px-3 text-center">150m</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">100 Gigabit Ethernet</td>
                      <td className="py-2 px-3 text-center">—</td>
                      <td className="py-2 px-3 text-center">—</td>
                      <td className="py-2 px-3 text-center">70m</td>
                      <td className="py-2 px-3 text-center">100m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Singlemode Distance Limits */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Singlemode Fibre Distance Limits</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Application</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">OS1/OS2</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">1000BASE-LX</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">5 km</td>
                      <td className="py-2 px-3 text-white/60">Standard reach</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">10GBASE-LR</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">10 km</td>
                      <td className="py-2 px-3 text-white/60">Long reach</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">10GBASE-ER</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">40 km</td>
                      <td className="py-2 px-3 text-white/60">Extended reach</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">100GBASE-LR4</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">10 km</td>
                      <td className="py-2 px-3 text-white/60">4 wavelengths</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inline Check 3 */}
            <InlineCheck
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Section 07: Channel vs Permanent Link */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Channel vs Permanent Link Testing
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Standards define two testing models: <strong className="text-white">channel</strong> (complete end-to-end link including equipment cords) and <strong className="text-white">permanent link</strong> (installed infrastructure only, excluding equipment patch cords).
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#252525] rounded-lg p-5 border border-white/10">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-elec-yellow" />
                  Channel
                </h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Complete end-to-end path</li>
                  <li>• Includes equipment patch cords</li>
                  <li>• Includes work area cords</li>
                  <li>• Maximum 4 connector pairs</li>
                  <li>• Used for application verification</li>
                </ul>
              </div>
              <div className="bg-[#252525] rounded-lg p-5 border border-white/10">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-elec-yellow" />
                  Permanent Link
                </h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Installed cabling only</li>
                  <li>• Excludes equipment cords</li>
                  <li>• Tests infrastructure quality</li>
                  <li>• Maximum 3 connector pairs</li>
                  <li>• Used for installation certification</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2">Loss Limit Differences</h4>
              <p className="text-white/70 text-sm">
                Channel tests have higher loss limits than permanent link tests because they include additional connector pairs. For example, an OM3 multimode channel at 850nm allows 2.0 dB maximum loss, while the permanent link allows 1.5 dB.
              </p>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Practical Tips for Loss Budget Success
            </h2>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Best Practices</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Calculate before installation</span>
                    <p className="text-white/60 text-sm">Always verify loss budgets during design phase, not after cables are installed</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Use worst-case transceiver values</span>
                    <p className="text-white/60 text-sm">Design for minimum transmitter power and worst receiver sensitivity</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Include adequate safety margin</span>
                    <p className="text-white/60 text-sm">3 dB standard; consider more for critical links or harsh environments</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Minimise connections</span>
                    <p className="text-white/60 text-sm">Every connection adds loss—design with the minimum necessary</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Verify with testing</span>
                    <p className="text-white/60 text-sm">Always test installed links—measured values should beat calculated budgets</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <BookOpen className="w-6 h-6 text-elec-yellow" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#252525] rounded-lg p-5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Reference Card */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-elec-yellow" />
                Quick Reference: Loss Budget Values
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Connection Losses</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Connector pair: 0.5 dB max</li>
                    <li>• Fusion splice: 0.1 dB max</li>
                    <li>• Mechanical splice: 0.3 dB max</li>
                    <li>• Safety margin: 3.0 dB typical</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Fibre Attenuation</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• OM1-OM4 @ 850nm: 3.5 dB/km</li>
                    <li>• OM1-OM4 @ 1300nm: 1.5 dB/km</li>
                    <li>• OS2 @ 1310nm: 0.35 dB/km</li>
                    <li>• OS2 @ 1550nm: 0.22 dB/km</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Section 3 Knowledge Check"
              questions={quizQuestions}
              passingScore={80}
            />
          </section>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
            <Link
              to="/electrical-upskilling/fiber-optics-module-6-section-2"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#252525] text-white rounded-lg hover:bg-[#303030] transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Structured Cabling Design
            </Link>
            <Link
              to="/electrical-upskilling/fiber-optics-module-6-section-4"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-elec-yellow text-[#1a1a1a] font-semibold rounded-lg hover:bg-elec-yellow/90 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              Next: Design Scenarios
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiberOpticsModule6Section3;
