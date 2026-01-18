import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Continuity and Polarity Checks - Fibre Optics Technology";
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
    id: 1,
    question: "What wavelength does a typical Visual Fault Locator use?",
    options: [
      "1310nm (invisible)",
      "650nm (visible red)",
      "1550nm (invisible)",
      "850nm (invisible)"
    ],
    correctAnswer: 1,
    explanation: "VFLs use 650nm visible red light so technicians can see the light at the far end and spot leakage at fault points."
  },
  {
    id: 2,
    question: "What is the typical range of a VFL for fault location?",
    options: [
      "100km",
      "2-5km depending on fibre type",
      "50km",
      "Less than 100m only"
    ],
    correctAnswer: 1,
    explanation: "VFLs have a practical range of 2-5km on singlemode, less on multimode due to higher attenuation at visible wavelengths."
  },
  {
    id: 3,
    question: "What is a polarity error in a fibre link?",
    options: [
      "Wrong fibre colour used",
      "Tx connected to Tx instead of Rx",
      "Wrong connector type",
      "Fibre too long"
    ],
    correctAnswer: 1,
    explanation: "A polarity error occurs when transmit connects to transmit instead of receive, preventing communication."
  },
  {
    id: 4,
    question: "What polarity method is standard for duplex LC connections?",
    options: [
      "Any orientation works",
      "A-B straight-through (typically)",
      "Crossed at every connection",
      "Random assignment"
    ],
    correctAnswer: 1,
    explanation: "Duplex LC typically uses A-B straight-through polarity with the connector key orientation determining Tx/Rx."
  },
  {
    id: 5,
    question: "How should you protect your eyes when using a VFL?",
    options: [
      "VFLs are completely safe",
      "Never look directly into the fibre or connector",
      "Wear sunglasses only",
      "No precautions needed"
    ],
    correctAnswer: 1,
    explanation: "Never look directly into active fibre outputs. Even low-power Class 2 lasers can cause eye discomfort."
  },
  {
    id: 6,
    question: "What indicates good continuity with a VFL?",
    options: [
      "No light visible",
      "Light visible at far end, no bright spots along cable",
      "Blinking light",
      "Multiple bright spots"
    ],
    correctAnswer: 1,
    explanation: "Good continuity shows light at the far end with no bright spots along the cable route indicating light escape."
  },
  {
    id: 7,
    question: "Which cables can a VFL test effectively?",
    options: [
      "Only singlemode",
      "Only multimode",
      "Both singlemode and multimode (results vary)",
      "Only armoured cables"
    ],
    correctAnswer: 2,
    explanation: "VFL works on both fibre types, but range is greater on singlemode due to lower attenuation at visible wavelengths."
  },
  {
    id: 8,
    question: "What is a common use for VFL beyond continuity?",
    options: [
      "Measuring insertion loss",
      "Locating breaks, bad splices, and tight bends",
      "Testing bandwidth",
      "Measuring cable length"
    ],
    correctAnswer: 1,
    explanation: "VFL excels at locating physical faults where light escapes - breaks, macrobends, bad splices, and damaged connectors."
  },
  {
    id: 9,
    question: "How do you verify polarity on a multi-fibre cable?",
    options: [
      "Guess based on colour",
      "Test each fibre pair individually",
      "Polarity doesn't matter",
      "Only test the first fibre"
    ],
    correctAnswer: 1,
    explanation: "Each fibre pair must be tested individually to verify Tx-to-Rx connections throughout the entire cable."
  },
  {
    id: 10,
    question: "What power class are most VFLs?",
    options: [
      "Class 4 (high power)",
      "Class 1 or 2 (low power, relatively safe)",
      "Class 3B (moderate hazard)",
      "Not classified"
    ],
    correctAnswer: 1,
    explanation: "Most VFLs are Class 1 or 2 lasers - relatively safe but should still be treated with respect."
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

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Continuity and Polarity Checks
          </h1>
          <p className="text-white/80">
            Essential first-line testing for fibre optic installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>VFL:</strong> Visual Fault Locator injects red light</li>
              <li><strong>Continuity:</strong> Light at far end = fibre intact</li>
              <li><strong>Polarity:</strong> Tx must connect to Rx at each end</li>
              <li><strong>Range:</strong> VFL effective to 2-5km</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Red glow along cable:</strong> Fault at that location</li>
              <li><strong>No light at end:</strong> Break before that point</li>
              <li><strong>Dim light:</strong> High loss, possible damage</li>
              <li><strong>Use pulse mode:</strong> Easier to spot faults</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Visual Fault Locator operation",
              "Continuity verification methods",
              "Polarity checking procedures",
              "Fault location techniques",
              "Fibre identification",
              "Safety considerations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Visual Fault Locator Basics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Visual Fault Locator (VFL) is an essential tool for every fibre technician. It injects visible red laser light (typically 650nm) into the fibre, allowing you to verify continuity and locate faults.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">VFL specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wavelength:</strong> 650nm (visible red) - can be seen by human eye</li>
                <li><strong>Power output:</strong> 1mW typical (Class 2 laser)</li>
                <li><strong>Range:</strong> 2-5km on singlemode, less on multimode</li>
                <li><strong>Connectors:</strong> Universal 2.5mm adapter, accepts most tips</li>
                <li><strong>Modes:</strong> Continuous (CW) and pulsed/flash (1-2Hz)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How VFL works:</p>
              <p className="text-sm text-white">
                The VFL launches visible light into the fibre core. At any point where light escapes (breaks, severe bends, bad splices, damaged connectors), the red glow becomes visible through the cable jacket. On intact fibres, light travels to the far end and is visible at the output connector.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Operating modes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Continuous mode:</strong> Steady light - good for end-to-end checks</li>
                <li><strong>Pulse/flash mode:</strong> Blinking light (1-2Hz) - easier to identify among other lights, better for fault location</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Continuity Testing Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Continuity testing confirms that light can pass through the fibre from one end to the other. This is the first test to perform before more detailed measurements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Basic continuity test procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Inspect and clean connector before connecting VFL</li>
                <li>2. Attach VFL to one end of the fibre</li>
                <li>3. Select continuous mode for initial test</li>
                <li>4. Power on VFL - red light enters fibre</li>
                <li>5. Check far end for red light</li>
                <li>6. Light visible = continuity confirmed</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Result interpretation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Light visible at far end:</strong> Fibre has continuity - proceed with further testing</li>
                <li><strong>No light at far end:</strong> Break in fibre - locate fault using VFL along cable route</li>
                <li><strong>Dim light at far end:</strong> High loss - possible damage, dirty connectors, or tight bends</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Range Limitations</p>
              <p className="text-sm text-white">
                VFL visible range is limited - typically 2-5km on singlemode fibre. On very long links, light may not be visible at the far end even with good continuity. For long links, use OTDR or power meter testing to verify continuity.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fault Location with VFL
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond continuity testing, VFL is invaluable for locating the physical position of faults. Where light escapes from the fibre, you'll see a visible red glow.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fault types VFL can locate:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Complete breaks:</strong> Bright red glow at break point</li>
                <li><strong>Tight bends (macrobends):</strong> Light escapes at bend location</li>
                <li><strong>Bad splices:</strong> Visible glow at splice enclosure</li>
                <li><strong>Damaged connectors:</strong> Light leakage at connector</li>
                <li><strong>Crushed cable:</strong> Red glow at damage point</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fault location procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Switch to pulse mode - easier to spot among other lights</li>
                <li>2. Darken environment if possible</li>
                <li>3. Follow cable route visually from VFL connection</li>
                <li>4. Look for red glow at connectors, bends, enclosures</li>
                <li>5. Check all accessible points</li>
                <li>6. Mark fault location for repair</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">VFL limitations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable covering:</strong> Some jackets block visible light</li>
                <li><strong>Armoured cables:</strong> Steel armour prevents light visibility</li>
                <li><strong>Buried/enclosed:</strong> Can't see faults in walls or underground</li>
                <li><strong>Minor faults:</strong> Small losses may not cause visible leakage</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Polarity Checking
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fibre links are typically bidirectional - each end has a transmit (Tx) and receive (Rx) fibre. Correct polarity ensures Tx connects to Rx at each end.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why polarity matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Tx must connect to Rx:</strong> Transmit at one end to receive at other</li>
                <li><strong>Bidirectional communication:</strong> Both directions need correct paths</li>
                <li><strong>Link failure if wrong:</strong> Tx-to-Tx or Rx-to-Rx won't work</li>
                <li><strong>Common issue:</strong> Polarity errors frequent in new installations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standard polarity methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Method A (Straight):</strong> Position 1 to Position 1, Position 2 to Position 2. Requires crossover at equipment or patch.</li>
                <li><strong>Method B (Crossed):</strong> Position 1 to Position 2, Position 2 to Position 1. Built-in cross at each connection.</li>
                <li><strong>Method C (Pair Flipped):</strong> Adjacent pairs flipped. Used in some high-density applications.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Polarity testing with VFL:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Connect VFL to one fibre at End A (e.g., position 1)</li>
                <li>2. Check End B - note which position shows light</li>
                <li>3. Record mapping: A-1 connects to B-?</li>
                <li>4. Repeat for other fibre: test A-2, note B connection</li>
                <li>5. Verify Tx/Rx: confirm transmit connects to receive</li>
                <li>6. Label clearly if polarity corrected</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Duplex LC Polarity</p>
              <p className="text-sm text-white">
                Duplex LC connectors typically use A-B polarity with the key orientation determining which fibre is Tx and Rx. Standard duplex patches are straight (A-to-A, B-to-B). Crossover patches swap polarity when needed. Always verify polarity on new installations before commissioning.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Fibre Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              VFL is invaluable for identifying specific fibres in multi-fibre cables or at patch panels where multiple connections exist.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Identification uses:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Tracing cable paths:</strong> Follow the red light through infrastructure</li>
                <li><strong>Finding correct port:</strong> Identify which panel port connects where</li>
                <li><strong>Verifying documentation:</strong> Confirm as-built records are correct</li>
                <li><strong>Troubleshooting:</strong> Find where a specific fibre terminates</li>
                <li><strong>Installation:</strong> Confirm fibre before connecting equipment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Identification procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Note starting point - document where you're connecting VFL</li>
                <li>2. Use pulse mode - makes identification easier in busy areas</li>
                <li>3. Go to destination - move to expected termination point</li>
                <li>4. Check each port - find the one with blinking red light</li>
                <li>5. Verify both directions if needed</li>
                <li>6. Label and document with verified information</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tips for busy patch panels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use pulse mode - blinking stands out among static lights</li>
                <li>Dim area if possible - easier to see red glow</li>
                <li>Check systematically - don't skip ports</li>
                <li>Use inspection scope - see light in adapter</li>
                <li>Label immediately - don't rely on memory</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Safety and Best Practices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While VFLs are relatively low power, proper safety practices and operating procedures ensure safe, effective use.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Safety precautions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Never look into active fibre:</strong> Don't view connector output directly</li>
                <li><strong>Don't point at eyes:</strong> Even Class 2 lasers can cause discomfort</li>
                <li><strong>Cap when not in use:</strong> Keep dust cap on VFL output</li>
                <li><strong>Turn off after use:</strong> Conserves battery and prevents accidents</li>
                <li><strong>Use inspection scope:</strong> View end face safely through optics</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Operating best practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Clean connectors first:</strong> Dirty connections affect results</li>
                <li><strong>Check battery:</strong> Low battery reduces light output and range</li>
                <li><strong>Use correct adapter:</strong> Match VFL tip to connector type</li>
                <li><strong>Work systematically:</strong> Test all fibres, document results</li>
                <li><strong>Combine with OTDR:</strong> VFL for location, OTDR for measurement</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">VFL strengths vs limitations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Strengths:</strong> Quick continuity check, visual fault location, fibre identification, low cost, portable</li>
                <li><strong>Limitations:</strong> Limited range (2-5km), can't measure loss, no distance measurement, blocked by armour/covering</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use VFL</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Before detailed testing:</strong> Quick continuity check first</li>
                <li><strong>Troubleshooting no-link:</strong> Find obvious breaks or faults</li>
                <li><strong>Fibre identification:</strong> Trace which fibre goes where</li>
                <li><strong>Polarity verification:</strong> Confirm Tx/Rx connections</li>
                <li><strong>After installation:</strong> Quick verification before commissioning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Sequence</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Visual inspection of connectors</li>
                <li>2. Clean connectors if needed</li>
                <li>3. VFL continuity check (quick pass/fail)</li>
                <li>4. VFL polarity verification</li>
                <li>5. If problems found, VFL fault location</li>
                <li>6. Proceed to insertion loss and OTDR testing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping connector inspection:</strong> Dirty connectors affect results</li>
                <li><strong>Expecting too much range:</strong> VFL is limited distance</li>
                <li><strong>Wrong adapter:</strong> Use correct tip for connector type</li>
                <li><strong>Dead battery:</strong> Check battery before important tests</li>
                <li><strong>Relying only on VFL:</strong> Use with OTDR for complete picture</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: VFL Testing</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Continuity Check</p>
                <ul className="space-y-0.5">
                  <li>Clean connector first</li>
                  <li>Connect VFL (continuous mode)</li>
                  <li>Check far end for light</li>
                  <li>Light = continuity OK</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Fault Location</p>
                <ul className="space-y-0.5">
                  <li>Switch to pulse mode</li>
                  <li>Dim lights if possible</li>
                  <li>Follow cable route</li>
                  <li>Look for red glow at fault</li>
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
            <Link to="/electrician/upskilling/fiber-optics-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule5Section1;
