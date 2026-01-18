import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
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
    id: 1,
    question: "What is the correct fuse rating for a 700W appliance at 230V?",
    options: ["3A", "5A", "10A", "13A"],
    correctAnswer: 0,
    explanation: "700W ÷ 230V = 3.04A. A 3A fuse is suitable as it's the next rating up from the calculated current."
  },
  {
    id: 2,
    question: "Which colour conductor connects to the top terminal in a UK plug?",
    options: ["Brown (Live)", "Blue (Neutral)", "Green/Yellow (Earth)", "Black (Old neutral)"],
    correctAnswer: 2,
    explanation: "The green/yellow earth conductor connects to the top terminal (earth pin) in a UK plug."
  },
  {
    id: 3,
    question: "What should be gripped by the cord grip in a rewireable plug?",
    options: ["The individual conductor cores", "The outer cable sheath only", "Both the sheath and inner insulation", "Nothing - it's only for decoration"],
    correctAnswer: 1,
    explanation: "The cord grip should grip the outer cable sheath only, not the inner cores."
  },
  {
    id: 4,
    question: "A 2.5kW kettle requires which fuse rating?",
    options: ["3A", "5A", "10A", "13A"],
    correctAnswer: 3,
    explanation: "2500W ÷ 230V = 10.9A. The next fuse rating up is 13A."
  },
  {
    id: 5,
    question: "What is the minimum current rating of a BS 1362 fuse?",
    options: ["1A", "2A", "3A", "5A"],
    correctAnswer: 2,
    explanation: "The minimum standard BS 1362 fuse rating is 3A."
  },
  {
    id: 6,
    question: "Which of these is an acceptable repair to a damaged cable?",
    options: ["Wrapping the damaged area in electrical tape", "Using a heat-shrink sleeve over the damage", "Using a proper junction box designed for the purpose", "None - the cable should be replaced entirely"],
    correctAnswer: 3,
    explanation: "Damaged flexible cables should be replaced entirely. Tape repairs, heat-shrink, and junction boxes are not acceptable for flex repairs."
  },
  {
    id: 7,
    question: "What indicates that a terminal has been overtightened?",
    options: ["The screw is very secure", "The conductor insulation is crushed or damaged", "The connection passes the electrical test", "The terminal is shiny"],
    correctAnswer: 1,
    explanation: "Crushed or damaged insulation indicates overtightening."
  },
  {
    id: 8,
    question: "If you find mixed old and new colour codes in a plug, what should you do?",
    options: ["Pass if connections are correct for either code", "Fail immediately - this is always dangerous", "Investigate the full cable and fail if colours are mixed throughout", "Only fail if the appliance doesn't work"],
    correctAnswer: 2,
    explanation: "Mixed colour codes require investigation. If old and new colours are mixed throughout the cable, it indicates improper rewiring and should fail."
  },
  {
    id: 9,
    question: "What is the purpose of sleeving on earth conductors in some plugs?",
    options: ["To make it look neater", "To provide additional insulation over bare copper", "To increase current capacity", "It serves no purpose and should be removed"],
    correctAnswer: 1,
    explanation: "Earth conductor sleeving provides additional insulation over the bare copper wire."
  },
  {
    id: 10,
    question: "Which wire gauge (CSA) is typically used for standard 3A appliances?",
    options: ["0.5mm²", "0.75mm²", "1.0mm²", "1.5mm²"],
    correctAnswer: 1,
    explanation: "0.75mm² is typically used for standard 3A appliances like lamps and small electronics."
  }
];

const faqs = [
  {
    question: "Can I rewire a plug myself as part of PAT testing?",
    answer: "Yes, a competent PAT tester can rewire plugs as part of the testing process when defects are found. However, this should be done to the correct standard with appropriate materials. If in doubt about competence, the appliance should be failed and referred for professional repair. Always record any repairs made."
  },
  {
    question: "What if the fuse keeps blowing during normal use?",
    answer: "A fuse that repeatedly blows indicates either: the fuse rating is too low for the appliance, the appliance has a fault drawing excessive current, or a defective (weak) fuse. Never replace with a higher rated fuse without verifying the appliance current. Investigate the cause - it could indicate a serious fault."
  },
  {
    question: "Are old colour codes (red/black/green) acceptable?",
    answer: "Old colour codes are acceptable if consistent throughout the cable and correctly connected. Red = Live, Black = Neutral, Green = Earth. The issue arises when old and new codes are mixed, suggesting partial rewiring. Old colour codes should prompt closer inspection as the appliance may be quite old."
  },
  {
    question: "What's the difference between BS 1362 and BS 646 fuses?",
    answer: "BS 1362 fuses are the standard cartridge fuses used in UK 13A plugs (available in 3A and 13A ratings typically). BS 646 fuses are the older round-pin type, no longer commonly used. Always use BS 1362 fuses in modern UK plugs - they have specific dimensions and characteristics for safety."
  },
  {
    question: "Can I use a 13A fuse in all appliances to avoid nuisance blowing?",
    answer: "No. Using a 13A fuse in a low-power appliance is dangerous. The fuse is sized to protect the cable - a thin cable on a lamp with a 13A fuse could overheat and cause fire before the fuse blows. Always use the correct fuse rating: 3A for appliances up to 700W, 13A for higher-powered items."
  },
  {
    question: "What should I do if I find an appliance with no fuse fitted?",
    answer: "This is an immediate fail. The appliance should not be used until a correct BS 1362 fuse is fitted. Check if a fuse has been deliberately removed (e.g., wrapped in foil as a 'repair') which is extremely dangerous. Always verify the correct rating before fitting a new fuse."
  }
];

const PATTestingModule3Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Rewiring and Correct Fuse Ratings
          </h1>
          <p className="text-white/80">
            Assessing wiring quality and fuse selection in PAT testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Wiring:</strong> Brown-Right, Blue-Left, Earth-Top</li>
              <li><strong>Earth:</strong> Must be longest conductor</li>
              <li><strong>Fuse:</strong> 3A up to 700W, 13A above</li>
              <li><strong>Sheath:</strong> Must be gripped by cord grip</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Tape repairs, cable joints, mixed colours</li>
              <li><strong>Use:</strong> Formula: Current = Power ÷ Voltage</li>
              <li><strong>Remember:</strong> BLue-Left, BRown-Right</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Verify correct plug wiring and connections",
              "Calculate and select appropriate fuse ratings",
              "Identify signs of substandard repairs",
              "Assess wire gauge for current capacity",
              "Recognise both old and new colour codes",
              "Document wiring defects accurately"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Correct Plug Wiring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Correct Plug Wiring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct plug wiring is fundamental to electrical safety. Each conductor must be connected to the correct terminal, properly secured, and correctly routed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Terminal Connections (Current UK Standard):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BROWN - Live (Bottom Right):</strong> Connects to the fused terminal. Should be the shortest conductor so it disconnects first if cable pulled.</li>
                <li><strong>BLUE - Neutral (Bottom Left):</strong> Connects to the unfused terminal opposite live. Medium length conductor.</li>
                <li><strong>GREEN/YELLOW - Earth (Top Centre):</strong> Connects to earth pin terminal. Must be the longest conductor - last to disconnect if pulled.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Memory Aid:</strong> "BLue to the Left, BRown to the Right" - the first two letters match the direction.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Old Colour Codes (Pre-2006):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>RED:</strong> Live</li>
                <li><strong>BLACK:</strong> Neutral</li>
                <li><strong>GREEN:</strong> Earth (later green/yellow)</li>
              </ul>
              <p className="text-sm text-white mt-2">Old codes are acceptable if consistent throughout - but mixing old and new codes is a fail.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Fuse Rating Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fuse Rating Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The plug fuse protects the flexible cable from overheating. Selecting the correct rating is essential - too high offers no protection, too low causes nuisance tripping.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>The Formula:</strong> Current (A) = Power (W) ÷ Voltage (V). Then select the next fuse rating UP from the calculated current.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standard BS 1362 Fuse Ratings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>3A (up to 700W):</strong> Lamps, radios, phone chargers, laptops, TVs, clocks, small electronics</li>
                <li><strong>5A (up to 1150W):</strong> Some power tools, floor lamps, small heaters (less common)</li>
                <li><strong>10A (up to 2300W):</strong> Some vacuum cleaners, larger tools (less common)</li>
                <li><strong>13A (up to 3000W):</strong> Kettles, toasters, irons, heaters, washing machines, dishwashers</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Worked Examples:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>60W Table Lamp:</strong> 60W ÷ 230V = 0.26A → Use 3A fuse</li>
                <li><strong>1000W Vacuum Cleaner:</strong> 1000W ÷ 230V = 4.35A → Use 13A fuse</li>
                <li><strong>3000W Kettle:</strong> 3000W ÷ 230V = 13A → Use 13A fuse</li>
                <li><strong>2000W Heater:</strong> 2000W ÷ 230V = 8.7A → Use 13A fuse</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Cable and Wire Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable and Wire Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The cable must be suitable for the appliance current rating. Undersized cable is a fire risk; correct assessment is essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Flex Sizes and Ratings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>0.5mm² (3A max):</strong> Small lamps, clocks, very light loads</li>
                <li><strong>0.75mm² (6A max):</strong> Desk lamps, radios, small electronics</li>
                <li><strong>1.0mm² (10A max):</strong> Vacuum cleaners, power tools</li>
                <li><strong>1.25-1.5mm² (13A max):</strong> Kettles, heaters, high-power appliances</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Type Identification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>PVC Flex:</strong> Standard for most domestic appliances. Not suitable for high temperatures.</li>
                <li><strong>Rubber Flex (H07RN-F):</strong> Heavy-duty for industrial, outdoor, and rough use.</li>
                <li><strong>Heat-Resistant Flex:</strong> Required for kettles, irons, heaters. Often braided.</li>
                <li><strong>Braided Flex:</strong> Textile outer covering. Check for damage beneath braiding.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Mismatched Cable Warning:</strong> If a high-power appliance has thin flex, the cable is undersized. Even with correct fuse, the cable may overheat before the fuse blows. This is a serious fire risk - fail the appliance.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Identifying Substandard Repairs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Identifying Substandard Repairs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DIY and amateur repairs are common and often dangerous. Learning to spot these is crucial for safety assessment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Red Flags - Immediate Fail:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Tape repairs on cable:</strong> Any tape used to cover cable damage</li>
                <li><strong>Cable joints or splices:</strong> Any junction in the flexible cable</li>
                <li><strong>Mismatched cable types:</strong> Different cable types joined together</li>
                <li><strong>Mixed colour codes:</strong> Old and new colours in same plug</li>
                <li><strong>Connector blocks in flex:</strong> "Chocolate block" connectors used to join cables</li>
                <li><strong>Foil-wrapped fuse:</strong> Fuse bypassed with foil - extremely dangerous</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Signs Requiring Investigation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Non-original plug that doesn't match appliance age/style</li>
                <li>Cable that appears newer than the appliance</li>
                <li>Poor quality wiring work (loose strands, poor routing)</li>
                <li>Incorrect conductor lengths in plug</li>
                <li>Outer sheath not reaching cord grip properly</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Terminal Connection Quality */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Terminal Connection Quality
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Even correctly wired plugs can have poor connections that cause overheating and failure. Assess terminal quality carefully.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Good Connection Indicators:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Conductor fully inserted into terminal</li>
                <li>Terminal screw tight (but not overtightened)</li>
                <li>No loose strands outside terminal</li>
                <li>Insulation reaches close to terminal with minimal bare conductor</li>
                <li>Conductor not damaged or nicked</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Poor Connection Indicators:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Loose terminal - conductor can be pulled out</li>
                <li>Strands of conductor outside terminal (short circuit risk)</li>
                <li>Crushed or damaged insulation from overtightening</li>
                <li>Excessive bare conductor visible (flashover risk)</li>
                <li>Signs of arcing or burning at terminal</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cord Grip Assessment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Correct:</strong> Outer sheath firmly gripped, pulling cable doesn't stress terminals</li>
                <li><strong>Incorrect:</strong> Grip on inner cores only, or sheath not reaching grip properly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Rewiring Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Calculate required fuse rating from appliance wattage</li>
                <li>2. Check cable is appropriate gauge for current</li>
                <li>3. Verify correct colour to terminal connections</li>
                <li>4. Confirm earth is longest, live is shortest</li>
                <li>5. Check outer sheath is gripped by cord grip</li>
                <li>6. Ensure all terminals are tight</li>
                <li>7. Verify BS 1362 fuse of correct rating fitted</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming all appliances need 13A fuses</strong> — low-power appliances need 3A</li>
                <li><strong>Not checking inside rewireable plugs</strong> — always inspect wiring</li>
                <li><strong>Ignoring signs of previous repairs</strong> — investigate any anomalies</li>
                <li><strong>Overtightening terminals</strong> — damages insulation</li>
                <li><strong>Forgetting to check cord grip</strong> — must hold sheath, not cores</li>
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

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Fuse Selection</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">3A Fuse (up to 700W)</p>
                <ul className="space-y-0.5">
                  <li>Lamps, chargers, TVs</li>
                  <li>Laptops, radios, clocks</li>
                  <li>Small electronics</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">13A Fuse (700W - 3000W)</p>
                <ul className="space-y-0.5">
                  <li>Kettles, heaters, irons</li>
                  <li>Vacuum cleaners, toasters</li>
                  <li>Washing machines</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule3Section2;
