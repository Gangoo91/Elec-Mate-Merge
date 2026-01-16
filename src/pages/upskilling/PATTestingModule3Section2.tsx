import { ArrowLeft, Eye, CheckCircle, HelpCircle, Lightbulb, AlertTriangle, Bookmark, ChevronRight, ChevronLeft, Wrench, Zap, Shield, Ban } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Rewiring and Correct Fuse Ratings - PAT Testing Course";
const DESCRIPTION = "Learn to assess rewiring quality and verify correct fuse ratings during PAT testing. Identify substandard repairs and ensure safe appliance operation.";

const quickCheckQuestions = [
  {
    id: "m3s2-qc1",
    question: "What is the primary purpose of a plug fuse?",
    options: [
      "To protect the appliance from damage",
      "To protect the flexible cable from overheating",
      "To protect the socket outlet",
      "To prevent electric shock"
    ],
    correctIndex: 1,
    explanation: "The primary purpose of a plug fuse is to protect the flexible cable from overheating. If a fault develops causing excessive current, the fuse should blow before the cable overheats and potentially catches fire. The fuse does not provide shock protection - that's the role of RCDs and earthing."
  },
  {
    id: "m3s2-qc2",
    question: "In a correctly wired plug, which conductor should be the longest?",
    options: [
      "Live (brown)",
      "Neutral (blue)",
      "Earth (green/yellow)",
      "All conductors should be the same length"
    ],
    correctIndex: 2,
    explanation: "The earth conductor should be longest so that if the cable is pulled, the earth is the last to disconnect. This ensures continued protection even as the plug is being pulled apart. The live conductor should be shortest so it disconnects first, removing the dangerous voltage."
  },
  {
    id: "m3s2-qc3",
    question: "Which of these would indicate potentially unsafe DIY rewiring?",
    options: [
      "All conductors neatly routed and correct length",
      "Outer sheath firmly gripped by the cord grip",
      "Different types of cable joined together with connector block",
      "Fuse correctly rated for the appliance"
    ],
    correctIndex: 2,
    explanation: "Joining different cable types together is a serious concern - it may indicate incompatible cable gauges, improper repair techniques, or an attempt to extend a cable. Flexible cables should not contain joints or splices; the cable should run unbroken from plug to appliance."
  }
];

const quizQuestions = [
  {
    question: "What is the correct fuse rating for a 700W appliance at 230V?",
    options: [
      "3A",
      "5A",
      "10A",
      "13A"
    ],
    correctAnswer: 0
  },
  {
    question: "Which colour conductor connects to the top terminal in a UK plug?",
    options: [
      "Brown (Live)",
      "Blue (Neutral)",
      "Green/Yellow (Earth)",
      "Black (Old neutral)"
    ],
    correctAnswer: 2
  },
  {
    question: "What should be gripped by the cord grip in a rewireable plug?",
    options: [
      "The individual conductor cores",
      "The outer cable sheath only",
      "Both the sheath and inner insulation",
      "Nothing - it's only for decoration"
    ],
    correctAnswer: 1
  },
  {
    question: "A 2.5kW kettle requires which fuse rating?",
    options: [
      "3A",
      "5A",
      "10A",
      "13A"
    ],
    correctAnswer: 3
  },
  {
    question: "What is the minimum current rating of a BS 1362 fuse?",
    options: [
      "1A",
      "2A",
      "3A",
      "5A"
    ],
    correctAnswer: 2
  },
  {
    question: "Which of these is an acceptable repair to a damaged cable?",
    options: [
      "Wrapping the damaged area in electrical tape",
      "Using a heat-shrink sleeve over the damage",
      "Using a proper junction box designed for the purpose",
      "None - the cable should be replaced entirely"
    ],
    correctAnswer: 3
  },
  {
    question: "What indicates that a terminal has been overtightened?",
    options: [
      "The screw is very secure",
      "The conductor insulation is crushed or damaged",
      "The connection passes the electrical test",
      "The terminal is shiny"
    ],
    correctAnswer: 1
  },
  {
    question: "If you find mixed old and new colour codes in a plug, what should you do?",
    options: [
      "Pass if connections are correct for either code",
      "Fail immediately - this is always dangerous",
      "Investigate the full cable and fail if colours are mixed throughout",
      "Only fail if the appliance doesn't work"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the purpose of sleeving on earth conductors in some plugs?",
    options: [
      "To make it look neater",
      "To provide additional insulation over bare copper",
      "To increase current capacity",
      "It serves no purpose and should be removed"
    ],
    correctAnswer: 1
  },
  {
    question: "Which wire gauge (CSA) is typically used for standard 3A appliances?",
    options: [
      "0.5mm²",
      "0.75mm²",
      "1.0mm²",
      "1.5mm²"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    q: "Can I rewire a plug myself as part of PAT testing?",
    a: "Yes, a competent PAT tester can rewire plugs as part of the testing process when defects are found. However, this should be done to the correct standard with appropriate materials. If in doubt about competence, the appliance should be failed and referred for professional repair. Always record any repairs made."
  },
  {
    q: "What if the fuse keeps blowing during normal use?",
    a: "A fuse that repeatedly blows indicates either: the fuse rating is too low for the appliance, the appliance has a fault drawing excessive current, or a defective (weak) fuse. Never replace with a higher rated fuse without verifying the appliance current. Investigate the cause - it could indicate a serious fault."
  },
  {
    q: "Are old colour codes (red/black/green) acceptable?",
    a: "Old colour codes are acceptable if consistent throughout the cable and correctly connected. Red = Live, Black = Neutral, Green = Earth. The issue arises when old and new codes are mixed, suggesting partial rewiring. Old colour codes should prompt closer inspection as the appliance may be quite old."
  },
  {
    q: "What's the difference between BS 1362 and BS 646 fuses?",
    a: "BS 1362 fuses are the standard cartridge fuses used in UK 13A plugs (available in 3A and 13A ratings typically). BS 646 fuses are the older round-pin type, no longer commonly used. Always use BS 1362 fuses in modern UK plugs - they have specific dimensions and characteristics for safety."
  },
  {
    q: "Can I use a 13A fuse in all appliances to avoid nuisance blowing?",
    a: "No. Using a 13A fuse in a low-power appliance is dangerous. The fuse is sized to protect the cable - a thin cable on a lamp with a 13A fuse could overheat and cause fire before the fuse blows. Always use the correct fuse rating: 3A for appliances up to 700W, 13A for higher-powered items."
  },
  {
    q: "What should I do if I find an appliance with no fuse fitted?",
    a: "This is an immediate fail. The appliance should not be used until a correct BS 1362 fuse is fitted. Check if a fuse has been deliberately removed (e.g., wrapped in foil as a 'repair') which is extremely dangerous. Always verify the correct rating before fitting a new fuse."
  }
];

const PATTestingModule3Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="../pat-testing-module-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-white/70 hover:text-elec-yellow hover:bg-white/5 -ml-2 touch-manipulation active:scale-95 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Module 3</span>
            </Button>
          </Link>
          <span className="text-xs font-medium text-elec-yellow bg-elec-yellow/10 px-2.5 py-1 rounded-full">
            Section 2 of 5
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8 pb-24">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-elec-yellow mb-3">
            <Eye className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Module 3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            Rewiring and Correct Fuse Ratings
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Assessing wiring quality and fuse selection
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">In 30 Seconds</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Check wiring is correct (Brown-Right, Blue-Left, Earth-Top), sheath gripped, fuse rated correctly (3A up to 700W, 13A above). No joins in cables.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-4 h-4 text-white/70" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">Spot It / Use It</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Mixed cable colours or tape repairs = immediate investigation. A 3000W kettle with 3A fuse = wrong. 60W lamp with 13A fuse = wrong.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-elec-yellow" />
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Verify correct plug wiring and connections",
              "Calculate and select appropriate fuse ratings",
              "Identify signs of substandard repairs",
              "Assess wire gauge for current capacity",
              "Recognise both old and new colour codes",
              "Document wiring defects accurately"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 01: Correct Plug Wiring */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Correct Plug Wiring</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Correct plug wiring is fundamental to electrical safety. Each conductor must be connected to the correct terminal, properly secured, and correctly routed.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-elec-yellow" />
                Terminal Connections (Current UK Standard)
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <div className="w-10 h-10 rounded bg-amber-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">L</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">BROWN - Live (Bottom Right)</h4>
                    <p className="text-white/60 text-sm">Connects to the fused terminal. Should be the shortest conductor so it disconnects first if cable pulled.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">BLUE - Neutral (Bottom Left)</h4>
                    <p className="text-white/60 text-sm">Connects to the unfused terminal opposite live. Medium length conductor.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="w-10 h-10 rounded bg-gradient-to-r from-green-600 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">GREEN/YELLOW - Earth (Top Centre)</h4>
                    <p className="text-white/60 text-sm">Connects to earth pin terminal. Must be the longest conductor - last to disconnect if pulled.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Memory Aid</h3>
              <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
                <p className="text-white font-medium text-center text-lg">
                  "B<span className="text-blue-400">L</span>ue to the <span className="text-blue-400">L</span>eft, B<span className="text-amber-400">R</span>own to the <span className="text-amber-400">R</span>ight"
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Old Colour Codes (Pre-2006)</h3>
              <p className="text-sm text-white/70 mb-3">
                You may encounter older appliances with the previous colour standard:
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-red-500/20 rounded-lg">
                  <div className="w-6 h-6 rounded bg-red-600 mx-auto mb-1"></div>
                  <p className="text-white text-sm font-medium">RED</p>
                  <p className="text-white/60 text-xs">Live</p>
                </div>
                <div className="text-center p-2 bg-gray-500/20 rounded-lg">
                  <div className="w-6 h-6 rounded bg-gray-800 mx-auto mb-1"></div>
                  <p className="text-white text-sm font-medium">BLACK</p>
                  <p className="text-white/60 text-xs">Neutral</p>
                </div>
                <div className="text-center p-2 bg-green-500/20 rounded-lg">
                  <div className="w-6 h-6 rounded bg-green-600 mx-auto mb-1"></div>
                  <p className="text-white text-sm font-medium">GREEN</p>
                  <p className="text-white/60 text-xs">Earth</p>
                </div>
              </div>
              <p className="text-sm text-white/60 mt-3 italic">
                Old codes are acceptable if consistent throughout - but mixing old and new codes is a fail.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Fuse Rating Selection */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Fuse Rating Selection</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The plug fuse protects the flexible cable from overheating. Selecting the correct rating is essential - too high offers no protection, too low causes nuisance tripping.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">The Fuse Selection Formula</h3>
              <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg mb-3">
                <p className="text-center text-white">
                  <span className="font-mono text-lg">Current (A) = Power (W) ÷ Voltage (V)</span>
                </p>
                <p className="text-center text-white/60 text-sm mt-2">
                  Then select the next fuse rating UP from the calculated current
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Standard BS 1362 Fuse Ratings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-elec-yellow font-semibold">Fuse Rating</th>
                      <th className="text-center py-2 text-elec-yellow font-semibold">Max Power</th>
                      <th className="text-left py-2 text-elec-yellow font-semibold">Typical Uses</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-3 font-semibold text-white">3A</td>
                      <td className="py-3 text-center">Up to 700W</td>
                      <td className="py-3 text-sm">Lamps, radios, phone chargers, laptops, TVs, clocks, small electronics</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 font-semibold text-white">5A</td>
                      <td className="py-3 text-center">Up to 1150W</td>
                      <td className="py-3 text-sm">Some power tools, floor lamps, small heaters (less common rating)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 font-semibold text-white">10A</td>
                      <td className="py-3 text-center">Up to 2300W</td>
                      <td className="py-3 text-sm">Some vacuum cleaners, larger tools (less common rating)</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-white">13A</td>
                      <td className="py-3 text-center">Up to 3000W</td>
                      <td className="py-3 text-sm">Kettles, toasters, irons, heaters, washing machines, dishwashers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/60 text-xs mt-3">
                Note: 5A and 10A fuses exist but 3A and 13A cover most common appliances.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Worked Examples</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">60W Table Lamp</p>
                  <p className="text-white/60 text-sm">60W ÷ 230V = 0.26A → Use <span className="text-green-400 font-semibold">3A fuse</span></p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">1000W Vacuum Cleaner</p>
                  <p className="text-white/60 text-sm">1000W ÷ 230V = 4.35A → Use <span className="text-green-400 font-semibold">13A fuse</span> (next up from 3A)</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">3000W Kettle</p>
                  <p className="text-white/60 text-sm">3000W ÷ 230V = 13A → Use <span className="text-green-400 font-semibold">13A fuse</span></p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">2000W Heater</p>
                  <p className="text-white/60 text-sm">2000W ÷ 230V = 8.7A → Use <span className="text-green-400 font-semibold">13A fuse</span></p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold text-sm">Dangerous Practices</h4>
                  <ul className="text-white/70 text-sm mt-2 space-y-1">
                    <li>• <strong className="text-white">13A fuse in 60W lamp</strong> - Cable could overheat without fuse blowing</li>
                    <li>• <strong className="text-white">Fuse wrapped in foil</strong> - Extremely dangerous, bypasses all protection</li>
                    <li>• <strong className="text-white">Non-BS 1362 fuse</strong> - Wrong dimensions, unreliable operation</li>
                    <li>• <strong className="text-white">No fuse fitted</strong> - Complete lack of cable protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Cable and Wire Assessment */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Cable and Wire Assessment</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The cable must be suitable for the appliance current rating. Undersized cable is a fire risk; correct assessment is essential.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Common Flex Sizes and Ratings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-elec-yellow font-semibold">CSA (mm²)</th>
                      <th className="text-center py-2 text-elec-yellow font-semibold">Max Current</th>
                      <th className="text-left py-2 text-elec-yellow font-semibold">Typical Applications</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-medium text-white">0.5mm²</td>
                      <td className="py-2 text-center">3A</td>
                      <td className="py-2 text-sm">Small lamps, clocks, very light loads</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-medium text-white">0.75mm²</td>
                      <td className="py-2 text-center">6A</td>
                      <td className="py-2 text-sm">Desk lamps, radios, small electronics</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-medium text-white">1.0mm²</td>
                      <td className="py-2 text-center">10A</td>
                      <td className="py-2 text-sm">Vacuum cleaners, power tools</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-white">1.25-1.5mm²</td>
                      <td className="py-2 text-center">13A</td>
                      <td className="py-2 text-sm">Kettles, heaters, high-power appliances</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Cable Type Identification</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium">PVC Flex (most common)</p>
                  <p className="text-white/60 text-sm">Standard for most domestic appliances. Round or flat profile. Not suitable for high temperatures or outdoors.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium">Rubber Flex (H07RN-F)</p>
                  <p className="text-white/60 text-sm">Heavy-duty for industrial, outdoor, and rough use. More flexible and durable than PVC.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium">Heat-Resistant Flex</p>
                  <p className="text-white/60 text-sm">Required for heating appliances like kettles, irons, heaters. Usually braided outer covering.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium">Braided Flex</p>
                  <p className="text-white/60 text-sm">Textile outer covering over insulation. Common on vintage-style appliances. Check for damage beneath braiding.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold text-sm">Mismatched Cable Warning</h4>
                  <p className="text-white/70 text-sm mt-1">
                    If a high-power appliance (e.g., 2kW heater) has thin 0.5mm² flex, the cable is undersized. Even with correct fuse, the cable may overheat before the fuse blows. This is a serious fire risk - <strong className="text-white">fail the appliance</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Identifying Substandard Repairs */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Identifying Substandard Repairs</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              DIY and amateur repairs are common and often dangerous. Learning to spot these is crucial for safety assessment.
            </p>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 sm:p-5">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <Ban className="w-4 h-4" />
                Red Flags - Immediate Fail
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">1.</span>
                  <div>
                    <p className="text-white font-medium">Tape repairs on cable</p>
                    <p className="text-white/60 text-sm">Any electrical tape, insulating tape, or other tape used to cover cable damage</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">2.</span>
                  <div>
                    <p className="text-white font-medium">Cable joints or splices</p>
                    <p className="text-white/60 text-sm">Any junction in the flexible cable - it should run unbroken from plug to appliance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">3.</span>
                  <div>
                    <p className="text-white font-medium">Mismatched cable types</p>
                    <p className="text-white/60 text-sm">Different cable types joined together suggesting extension or replacement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">4.</span>
                  <div>
                    <p className="text-white font-medium">Mixed colour codes</p>
                    <p className="text-white/60 text-sm">Old and new colours in same plug indicating partial rewiring</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">5.</span>
                  <div>
                    <p className="text-white font-medium">Connector blocks in flex</p>
                    <p className="text-white/60 text-sm">"Chocolate block" connectors used to join or extend cables</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">6.</span>
                  <div>
                    <p className="text-white font-medium">Foil-wrapped fuse</p>
                    <p className="text-white/60 text-sm">Fuse bypassed with foil - extremely dangerous fire hazard</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 sm:p-5">
              <h3 className="text-amber-400 font-semibold mb-3">Signs Requiring Investigation</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Non-original plug that doesn't match appliance age/style</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Cable that appears newer than the appliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Poor quality wiring work (loose strands, poor routing)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Incorrect conductor lengths in plug</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Outer sheath not reaching cord grip properly</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Terminal Connection Quality */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Terminal Connection Quality</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Even correctly wired plugs can have poor connections that cause overheating and failure. Assess terminal quality carefully.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Good Connection Indicators
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Conductor fully inserted into terminal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Terminal screw tight (but not overtightened)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>No loose strands outside terminal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Insulation reaches close to terminal with minimal bare conductor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Conductor not damaged or nicked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Correct conductor in each terminal</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Poor Connection Indicators
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Loose terminal - conductor can be pulled out</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Strands of conductor outside terminal (short circuit risk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Crushed or damaged insulation from overtightening</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Excessive bare conductor visible (flashover risk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Signs of arcing or burning at terminal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Insulation stripped back too far</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Cord Grip Assessment</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 font-medium text-sm">Correct</p>
                  <p className="text-white/70 text-sm">Outer sheath firmly gripped, pulling cable doesn't stress terminals</p>
                </div>
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 font-medium text-sm">Incorrect</p>
                  <p className="text-white/70 text-sm">Grip on inner cores only, or sheath not reaching grip properly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Bookmark className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-xl font-bold text-white">Practical Guidance</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Rewiring Checklist
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">1.</span>
                  <span>Calculate required fuse rating from appliance wattage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">2.</span>
                  <span>Check cable is appropriate gauge for current</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">3.</span>
                  <span>Verify correct colour to terminal connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">4.</span>
                  <span>Confirm earth is longest, live is shortest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">5.</span>
                  <span>Check outer sheath is gripped by cord grip</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">6.</span>
                  <span>Ensure all terminals are tight</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">7.</span>
                  <span>Verify BS 1362 fuse of correct rating fitted</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Common Mistakes to Avoid
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Assuming all appliances need 13A fuses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Not checking inside rewireable plugs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Ignoring signs of previous repairs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Overtightening terminals and damaging insulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Forgetting to check cord grip holds sheath</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white/5 rounded-xl">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none touch-manipulation">
                  <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-white/40 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-white/70 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 rounded-xl p-5">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-elec-yellow" />
              Quick Reference: Fuse Selection
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/10 rounded-lg">
                <p className="text-elec-yellow font-bold text-xl text-center">3A</p>
                <p className="text-white/70 text-center text-sm">Up to 700W</p>
                <p className="text-white/50 text-center text-xs">Lamps, chargers, TVs</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <p className="text-elec-yellow font-bold text-xl text-center">13A</p>
                <p className="text-white/70 text-center text-sm">700W - 3000W</p>
                <p className="text-white/50 text-center text-xs">Kettles, heaters, irons</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-500/10 rounded-lg">
              <p className="text-red-400 text-sm text-center font-medium">
                Never use 13A fuse for low-power appliances - it won't protect the cable!
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section 2 Quiz: Rewiring and Fuse Ratings"
            questions={quizQuestions}
            moduleId="pat-m3s2"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-white/10">
          <Link to="../pat-testing-module-3-section-1" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto gap-2 border-white/20 text-white hover:bg-white/5 hover:text-elec-yellow min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: Section 1</span>
            </Button>
          </Link>
          <Link to="../pat-testing-module-3-section-3" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <span>Next: Section 3</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default PATTestingModule3Section2;
