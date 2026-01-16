import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Radio, Target, AlertTriangle, Shield, BookOpen, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Continuity and Polarity Checks - Fiber Optics Technology";
const DESCRIPTION = "Learn how to verify fibre optic link continuity and polarity using visual fault locators and test equipment for installation troubleshooting.";

const quickCheckQuestions = [
  {
    id: "continuity-qc1",
    question: "What tool is commonly used for quick fibre continuity testing?",
    options: [
      "OTDR only",
      "Visual Fault Locator (VFL)",
      "Power meter",
      "Fusion splicer"
    ],
    correctIndex: 1,
    explanation: "A Visual Fault Locator (VFL) injects visible red light into the fibre, making it easy to verify continuity and locate breaks or bends."
  },
  {
    id: "continuity-qc2",
    question: "What does a polarity check verify in a fibre link?",
    options: [
      "Voltage levels",
      "That transmit connects to receive at each end",
      "Fibre colour",
      "Cable length"
    ],
    correctIndex: 1,
    explanation: "Polarity verification ensures that transmit (Tx) fibres connect to receive (Rx) ports at the other end, enabling proper bidirectional communication."
  },
  {
    id: "continuity-qc3",
    question: "What might cause a bright glow visible at a cable point when using a VFL?",
    options: [
      "Normal operation",
      "A break, tight bend, or damage at that location",
      "Good splice quality",
      "Proper connector seating"
    ],
    correctIndex: 1,
    explanation: "A bright glow indicates light escaping from the fibre, typically caused by a break, severe bend, damaged connector, or macrobend at that location."
  }
];

const quizQuestions = [
  {
    question: "What wavelength does a typical Visual Fault Locator use?",
    options: [
      "1310nm (invisible)",
      "650nm (visible red)",
      "1550nm (invisible)",
      "850nm (invisible)"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the typical range of a VFL for fault location?",
    options: [
      "100km",
      "2-5km depending on fibre type",
      "50km",
      "Less than 100m only"
    ],
    correctAnswer: 1
  },
  {
    question: "What is a polarity error in a fibre link?",
    options: [
      "Wrong fibre colour used",
      "Tx connected to Tx instead of Rx",
      "Wrong connector type",
      "Fibre too long"
    ],
    correctAnswer: 1
  },
  {
    question: "What polarity method is standard for duplex LC connections?",
    options: [
      "Any orientation works",
      "A-B straight-through (typically)",
      "Crossed at every connection",
      "Random assignment"
    ],
    correctAnswer: 1
  },
  {
    question: "How should you protect your eyes when using a VFL?",
    options: [
      "VFLs are completely safe",
      "Never look directly into the fibre or connector",
      "Wear sunglasses only",
      "No precautions needed"
    ],
    correctAnswer: 1
  },
  {
    question: "What indicates good continuity with a VFL?",
    options: [
      "No light visible",
      "Light visible at far end, no bright spots along cable",
      "Blinking light",
      "Multiple bright spots"
    ],
    correctAnswer: 1
  },
  {
    question: "Which cables can a VFL test effectively?",
    options: [
      "Only singlemode",
      "Only multimode",
      "Both singlemode and multimode (results vary)",
      "Only armoured cables"
    ],
    correctAnswer: 2
  },
  {
    question: "What is a common use for VFL beyond continuity?",
    options: [
      "Measuring insertion loss",
      "Locating breaks, bad splices, and tight bends",
      "Testing bandwidth",
      "Measuring cable length"
    ],
    correctAnswer: 1
  },
  {
    question: "How do you verify polarity on a multi-fibre cable?",
    options: [
      "Guess based on colour",
      "Test each fibre pair individually",
      "Polarity doesn't matter",
      "Only test the first fibre"
    ],
    correctAnswer: 1
  },
  {
    question: "What power class are most VFLs?",
    options: [
      "Class 4 (high power)",
      "Class 1 or 2 (low power, relatively safe)",
      "Class 3B (moderate hazard)",
      "Not classified"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Can a VFL damage my eyes?",
    answer: "VFLs are typically Class 1 or Class 2 laser products with low power output. While not as hazardous as higher-power lasers, you should never look directly into the output or a connected fibre end. The visible light can cause discomfort and potentially temporary vision effects. Treat all laser sources with respect."
  },
  {
    question: "Can I use a VFL on live (active) fibres?",
    answer: "You can physically use a VFL on active fibres, but the results may be affected by the transmitted light. The VFL's red light may not be visible over strong transmitted signals. For safety and accuracy, test on dark fibres when possible. Always follow site procedures for working on active systems."
  },
  {
    question: "Why can't I see VFL light on a long cable?",
    answer: "VFLs have limited range - typically 2-5km on singlemode. The visible light attenuates as it travels. On multimode, range is even shorter due to higher attenuation at visible wavelengths. If testing long links, you may not see light at the far end but can still locate faults closer to the launch point."
  },
  {
    question: "What's the difference between VFL continuous and pulse mode?",
    answer: "Continuous mode provides steady light for viewing at the far end. Pulse/flash mode (typically 1-2Hz) makes it easier to identify fault locations among other light sources - the blinking red light stands out. Use pulse mode when searching for faults in bright environments or complex cabling."
  },
  {
    question: "How do I trace fibre polarity through patch panels?",
    answer: "Inject VFL at one end, note which port shows light at the patch panel. Follow through adapters and patches noting the path. At the far end, identify which port receives light. Document the complete path including all intermediate connections. Use fibre identification labels for clarity."
  },
  {
    question: "Can VFL find all types of faults?",
    answer: "VFL is excellent for locating breaks, severe bends, bad splices, and damaged connectors where light escapes. It's less effective for high-resistance faults, minor misalignment, or contamination that cause loss without visible light escape. Use OTDR and power meter testing for comprehensive fault analysis."
  }
];

const FiberOpticsModule5Section1 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module5"
            className="flex items-center gap-2 text-white/70 hover:text-white active:scale-[0.98] touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Module 5</span>
          </Link>
          <span className="text-xs text-white/40 hidden sm:block">Section 1 of 6</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-3xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <CheckCircle className="w-4 h-4" />
            Module 5 · Section 1
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Continuity and Polarity Checks
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-5 border border-green-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Before detailed testing, verify basic fibre connectivity with a Visual Fault Locator
            (VFL). The VFL injects visible red light to confirm continuity and locate faults.
            Polarity checking ensures transmit connects to receive at each end. These quick
            tests identify obvious problems before more detailed measurements.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl p-5 border border-emerald-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">VFL Applications</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Quick continuity verification</li>
                <li>• Fault location (breaks, bends)</li>
                <li>• Fibre identification</li>
                <li>• Polarity tracing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-2">What to Look For</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Light at far end = continuity</li>
                <li>• Bright glow = fault location</li>
                <li>• Red trace = cable path</li>
                <li>• No light = break before point</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Visual Fault Locator operation",
              "Continuity verification methods",
              "Polarity checking procedures",
              "Fault location techniques",
              "Fibre identification",
              "Safety considerations"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-white/80">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Visual Fault Locator Basics */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">Visual Fault Locator Basics</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The Visual Fault Locator (VFL) is an essential tool for every fibre technician.
              It injects visible red laser light (typically 650nm) into the fibre, allowing
              you to verify continuity and locate faults.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400" />
                VFL Specifications
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Wavelength:</strong> 650nm (visible red) - can be seen by human eye</li>
                <li><strong>Power output:</strong> 1mW typical (Class 2 laser)</li>
                <li><strong>Range:</strong> 2-5km on singlemode, less on multimode</li>
                <li><strong>Connectors:</strong> Universal 2.5mm adapter, accepts most tips</li>
                <li><strong>Modes:</strong> Continuous (CW) and pulsed/flash (1-2Hz)</li>
                <li><strong>Power:</strong> Battery operated (AA or built-in rechargeable)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">How VFL Works</h4>
              <p className="text-sm text-white/70">
                The VFL launches visible light into the fibre core. At any point where light
                escapes (breaks, severe bends, bad splices, damaged connectors), the red
                glow becomes visible through the cable jacket. On intact fibres, light
                travels to the far end and is visible at the output connector.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-2">Continuous Mode</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Steady red light output</li>
                  <li>• Good for end-to-end checks</li>
                  <li>• Easy to see at far end</li>
                  <li>• Consumes more battery</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-emerald-400 mb-2">Pulse/Flash Mode</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Blinking light (1-2Hz)</li>
                  <li>• Easier to identify among lights</li>
                  <li>• Better for fault location</li>
                  <li>• Extended battery life</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Continuity Testing */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Continuity Testing Procedure</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Continuity testing confirms that light can pass through the fibre from one end
              to the other. This is the first test to perform before more detailed measurements.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Basic Continuity Test</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Inspect connector:</strong> Clean and inspect before connecting VFL</li>
                <li><strong>2. Connect VFL:</strong> Attach to one end of the fibre</li>
                <li><strong>3. Select mode:</strong> Start with continuous mode</li>
                <li><strong>4. Power on:</strong> Turn on VFL - red light enters fibre</li>
                <li><strong>5. Check far end:</strong> Look for red light at other connector</li>
                <li><strong>6. Interpret results:</strong> Light visible = continuity confirmed</li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Result Interpretation</h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="text-green-400">✓</span>
                  <div>
                    <p className="text-green-300 font-medium">Light visible at far end</p>
                    <p className="text-white/60">Fibre has continuity - proceed with further testing</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-400">✗</span>
                  <div>
                    <p className="text-red-300 font-medium">No light at far end</p>
                    <p className="text-white/60">Break in fibre - locate fault using VFL along cable route</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-yellow-400">⚠</span>
                  <div>
                    <p className="text-yellow-300 font-medium">Dim light at far end</p>
                    <p className="text-white/60">High loss - possible damage, dirty connectors, or tight bends</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Range Limitations</h4>
              <p className="text-sm text-white/80">
                VFL visible range is limited - typically 2-5km on singlemode fibre. On very
                long links, light may not be visible at the far end even with good continuity.
                For long links, use OTDR or power meter testing to verify continuity.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: Fault Location */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">Fault Location with VFL</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Beyond continuity testing, VFL is invaluable for locating the physical position
              of faults. Where light escapes from the fibre, you'll see a visible red glow.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                Fault Types VFL Can Locate
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Complete breaks:</strong> Bright red glow at break point</li>
                <li><strong>Tight bends (macrobends):</strong> Light escapes at bend location</li>
                <li><strong>Bad splices:</strong> Visible glow at splice enclosure</li>
                <li><strong>Damaged connectors:</strong> Light leakage at connector</li>
                <li><strong>Crushed cable:</strong> Red glow at damage point</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Fault Location Procedure</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Switch to pulse mode:</strong> Easier to spot among other lights</li>
                <li><strong>2. Darken environment:</strong> If possible, reduce ambient light</li>
                <li><strong>3. Follow cable route:</strong> Visually trace from VFL connection</li>
                <li><strong>4. Look for red glow:</strong> Check connectors, bends, enclosures</li>
                <li><strong>5. Check accessible points:</strong> Patch panels, splice closures</li>
                <li><strong>6. Mark fault location:</strong> Document for repair</li>
              </ol>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                VFL Limitations
              </h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Cable covering:</strong> Some jackets block visible light</li>
                <li>• <strong>Armoured cables:</strong> Steel armour prevents light visibility</li>
                <li>• <strong>Buried/enclosed:</strong> Can't see faults in walls or underground</li>
                <li>• <strong>Minor faults:</strong> Small losses may not cause visible leakage</li>
              </ul>
            </div>

            <p>
              For faults you can't locate with VFL (buried cables, enclosed routes), use
              OTDR testing to measure distance to the fault from one or both ends.
            </p>
          </div>
        </section>

        {/* Section 4: Polarity Checking */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">Polarity Checking</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Fibre links are typically bidirectional - each end has a transmit (Tx) and
              receive (Rx) fibre. Correct polarity ensures Tx connects to Rx at each end.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Why Polarity Matters</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Tx must connect to Rx:</strong> Transmit at one end to receive at other</li>
                <li><strong>Bidirectional comms:</strong> Both directions need correct paths</li>
                <li><strong>Link failure if wrong:</strong> Tx-to-Tx or Rx-to-Rx won't work</li>
                <li><strong>Troubleshooting cause:</strong> Polarity errors common in new installs</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Standard Polarity Methods</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-green-400 font-medium">Method A (Straight)</p>
                  <p className="text-white/60">Position 1 to Position 1, Position 2 to Position 2. Requires crossover at equipment or patch.</p>
                </div>
                <div>
                  <p className="text-emerald-400 font-medium">Method B (Crossed)</p>
                  <p className="text-white/60">Position 1 to Position 2, Position 2 to Position 1. Built-in cross at each connection.</p>
                </div>
                <div>
                  <p className="text-blue-400 font-medium">Method C (Pair Flipped)</p>
                  <p className="text-white/60">Adjacent pairs flipped. Used in some high-density applications.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Polarity Testing with VFL</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Connect VFL:</strong> Attach to one fibre at End A (e.g., position 1)</li>
                <li><strong>2. Check End B:</strong> Note which position shows light</li>
                <li><strong>3. Record mapping:</strong> Document A-1 connects to B-?</li>
                <li><strong>4. Repeat for other fibre:</strong> Test A-2, note B connection</li>
                <li><strong>5. Verify Tx/Rx:</strong> Confirm transmit connects to receive</li>
                <li><strong>6. Label clearly:</strong> Mark fibres if polarity corrected</li>
              </ol>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Duplex LC Polarity</h4>
              <p className="text-sm text-white/80">
                Duplex LC connectors typically use A-B polarity with the key orientation
                determining which fibre is Tx and Rx. Standard duplex patches are straight
                (A-to-A, B-to-B). Crossover patches swap polarity when needed. Always verify
                polarity on new installations before commissioning.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 5: Fibre Identification */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Fibre Identification</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              VFL is invaluable for identifying specific fibres in multi-fibre cables or
              at patch panels where multiple connections exist.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                Identification Uses
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Tracing cable paths:</strong> Follow the red light through infrastructure</li>
                <li><strong>Finding correct port:</strong> Identify which panel port connects where</li>
                <li><strong>Verifying documentation:</strong> Confirm as-built records are correct</li>
                <li><strong>Troubleshooting:</strong> Find where a specific fibre terminates</li>
                <li><strong>Installation:</strong> Confirm fibre before connecting equipment</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Identification Procedure</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Note starting point:</strong> Document where you're connecting VFL</li>
                <li><strong>2. Use pulse mode:</strong> Makes identification easier in busy areas</li>
                <li><strong>3. Go to destination:</strong> Move to where you expect fibre to terminate</li>
                <li><strong>4. Check each port:</strong> Find the one with blinking red light</li>
                <li><strong>5. Verify both directions:</strong> Test from each end if needed</li>
                <li><strong>6. Label and document:</strong> Update records with verified information</li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Tips for Busy Patch Panels</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Use pulse mode - blinking stands out among static lights</li>
                <li>• Dim area if possible - easier to see red glow</li>
                <li>• Check systematically - don't skip ports</li>
                <li>• Use inspection scope - see light in adapter</li>
                <li>• Label immediately - don't rely on memory</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Safety and Best Practices */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Safety and Best Practices</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              While VFLs are relatively low power, proper safety practices and operating
              procedures ensure safe, effective use.
            </p>

            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Safety Precautions
              </h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Never look into active fibre:</strong> Don't view connector output directly</li>
                <li>• <strong>Don't point at eyes:</strong> Even Class 2 lasers can cause discomfort</li>
                <li>• <strong>Cap when not in use:</strong> Keep dust cap on VFL output</li>
                <li>• <strong>Turn off after use:</strong> Conserves battery and prevents accidents</li>
                <li>• <strong>Use inspection scope:</strong> View end face safely through optics</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-elec-yellow" />
                Operating Best Practices
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Clean connectors first:</strong> Dirty connections affect results</li>
                <li><strong>Check battery:</strong> Low battery reduces light output and range</li>
                <li><strong>Use correct adapter:</strong> Match VFL tip to connector type</li>
                <li><strong>Work systematically:</strong> Test all fibres, document results</li>
                <li><strong>Combine with OTDR:</strong> VFL for location, OTDR for measurement</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">VFL Strengths</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Quick continuity check</li>
                  <li>• Visual fault location</li>
                  <li>• Fibre identification</li>
                  <li>• Low cost tool</li>
                  <li>• Portable, battery operated</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
                <h4 className="font-semibold text-orange-400 mb-2">VFL Limitations</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Limited range (2-5km)</li>
                  <li>• Can't measure loss</li>
                  <li>• No distance measurement</li>
                  <li>• Blocked by armour/covering</li>
                  <li>• Not for all fault types</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">When to Use VFL</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Before detailed testing:</strong> Quick continuity check first</li>
                <li>• <strong>Troubleshooting no-link:</strong> Find obvious breaks or faults</li>
                <li>• <strong>Fibre identification:</strong> Trace which fibre goes where</li>
                <li>• <strong>Polarity verification:</strong> Confirm Tx/Rx connections</li>
                <li>• <strong>After installation:</strong> Quick verification before commissioning</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Skipping connector inspection:</strong> Dirty connectors affect results</li>
                <li>• <strong>Expecting too much range:</strong> VFL is limited distance</li>
                <li>• <strong>Wrong adapter:</strong> Use correct tip for connector type</li>
                <li>• <strong>Dead battery:</strong> Check battery before important tests</li>
                <li>• <strong>Relying only on VFL:</strong> Use with OTDR for complete picture</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl p-4 border border-emerald-500/20">
              <h4 className="font-semibold text-emerald-400 mb-2">Testing Sequence</h4>
              <ol className="text-sm text-white/70 space-y-1">
                <li>1. Visual inspection of connectors</li>
                <li>2. Clean connectors if needed</li>
                <li>3. VFL continuity check (quick pass/fail)</li>
                <li>4. VFL polarity verification</li>
                <li>5. If problems found, VFL fault location</li>
                <li>6. Proceed to insertion loss and OTDR testing</li>
              </ol>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  className="w-full px-4 py-3 flex items-center justify-between text-left min-h-[44px] touch-manipulation"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-sm font-medium text-white/90">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-3">
                    <p className="text-sm text-white/70">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-5 border border-green-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Radio className="w-5 h-5 text-green-400" />
              Quick Reference: VFL Testing
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-green-300 mb-2">Continuity Check</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>☐ Clean connector first</li>
                  <li>☐ Connect VFL (continuous mode)</li>
                  <li>☐ Check far end for light</li>
                  <li>☐ Light = continuity OK</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-emerald-300 mb-2">Fault Location</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>☐ Switch to pulse mode</li>
                  <li>☐ Dim lights if possible</li>
                  <li>☐ Follow cable route</li>
                  <li>☐ Look for red glow at fault</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                VFL range: 2-5km | Always clean connectors before testing | Never look into active fibre
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            onComplete={(score, total) => {
              console.log(`Quiz completed: ${score}/${total}`);
            }}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module4/section5"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Inspection and Cleaning
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module5/section2"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next: Insertion Loss Testing
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule5Section1;
