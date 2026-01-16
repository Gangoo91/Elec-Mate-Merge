import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Radio, Target, AlertTriangle, Activity, BookOpen, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "OTDR Testing Basics - Fiber Optics Technology";
const DESCRIPTION = "Master OTDR fundamentals including Rayleigh backscatter, Fresnel reflections, trace interpretation, event identification, and dead zone management for comprehensive fibre testing.";

const quickCheckQuestions = [
  {
    id: "otdr-qc1",
    question: "What physical phenomenon does an OTDR use to measure fibre characteristics?",
    options: [
      "Light absorption only",
      "Rayleigh backscatter and Fresnel reflections",
      "Heat dissipation",
      "Electromagnetic interference"
    ],
    correctIndex: 1,
    explanation: "OTDRs work by analyzing Rayleigh backscatter (continuous light scattered backward along the fibre) and Fresnel reflections (discrete reflections at interfaces like connectors and breaks)."
  },
  {
    id: "otdr-qc2",
    question: "What causes a dead zone on an OTDR trace?",
    options: [
      "Dirty connectors",
      "Strong reflections that saturate the detector",
      "Fibre breaks",
      "Incorrect wavelength selection"
    ],
    correctIndex: 1,
    explanation: "Dead zones occur when strong Fresnel reflections (typically from connectors) saturate the OTDR detector, temporarily blinding it to other events in that region."
  },
  {
    id: "otdr-qc3",
    question: "What is the primary purpose of using a launch cable with an OTDR?",
    options: [
      "To extend the fibre length",
      "To move the initial dead zone away from the first connector under test",
      "To increase signal strength",
      "To add attenuation"
    ],
    correctIndex: 1,
    explanation: "A launch cable (typically 100m-2km) moves the OTDR's initial dead zone away from the first connector, allowing proper characterization of the first connection point."
  }
];

const quizQuestions = [
  {
    question: "What does OTDR stand for?",
    options: [
      "Optical Time Domain Receiver",
      "Optical Time Domain Reflectometer",
      "Optical Transmission Detection Reader",
      "Output Test Data Recorder"
    ],
    correctAnswer: 1
  },
  {
    question: "What causes Rayleigh backscatter in optical fibre?",
    options: [
      "Connector reflections",
      "Microscopic density variations in the glass",
      "Macrobends in the cable",
      "Splice points"
    ],
    correctAnswer: 1
  },
  {
    question: "On an OTDR trace, what does a downward slope indicate?",
    options: [
      "Increasing signal strength",
      "Normal fibre attenuation (loss over distance)",
      "A connector",
      "A break in the fibre"
    ],
    correctAnswer: 1
  },
  {
    question: "What type of event appears as a spike above the backscatter level?",
    options: [
      "Fusion splice",
      "Reflective event (connector or break)",
      "Macrobend",
      "Normal fibre"
    ],
    correctAnswer: 1
  },
  {
    question: "How does pulse width affect OTDR measurements?",
    options: [
      "Wider pulses provide better resolution",
      "Wider pulses provide greater range but reduced resolution",
      "Pulse width has no effect",
      "Narrower pulses provide greater range"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the typical length of a launch cable for OTDR testing?",
    options: [
      "1-5 metres",
      "100 metres to 2 kilometres",
      "10-20 metres",
      "5-10 kilometres"
    ],
    correctAnswer: 1
  },
  {
    question: "What characterizes a non-reflective event on an OTDR trace?",
    options: [
      "A spike above the backscatter line",
      "A step down in the backscatter level without a reflection spike",
      "An upward slope",
      "No visible change"
    ],
    correctAnswer: 1
  },
  {
    question: "What causes Fresnel reflections in optical fibre?",
    options: [
      "Absorption in the core",
      "Refractive index changes at interfaces (glass-to-air)",
      "Continuous scattering",
      "Fibre bending"
    ],
    correctAnswer: 1
  },
  {
    question: "What is an event dead zone?",
    options: [
      "The distance after a reflection where no events can be detected",
      "A section of fibre with no signal",
      "The area before the launch cable",
      "A region with zero attenuation"
    ],
    correctAnswer: 0
  },
  {
    question: "Why is a receive cable used at the far end of a link?",
    options: [
      "To add signal strength",
      "To characterize the last connector and see the fibre end clearly",
      "To reduce reflections",
      "To increase testing speed"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "What is the difference between event dead zone and attenuation dead zone?",
    answer: "The event dead zone is the minimum distance after a reflective event where the OTDR can detect another event. The attenuation dead zone is longer - it's the distance required before accurate loss measurements can be made. Event dead zones are typically 0.5-5m, while attenuation dead zones can be 5-25m depending on the OTDR and settings."
  },
  {
    question: "Why do I need both launch and receive cables?",
    answer: "The launch cable moves the initial dead zone away from the first connector under test, allowing its proper characterization. The receive cable allows you to see the last connector clearly and confirm where the fibre actually ends, rather than seeing an abrupt end at the last reflection. Together, they ensure accurate measurement of all connection points."
  },
  {
    question: "How do I choose the right pulse width for my test?",
    answer: "Start with a shorter pulse width for better resolution on short links or when you need to see closely-spaced events. Use longer pulse widths for extended range on long fibre runs. Many modern OTDRs have auto-test modes that select optimal settings. For typical premises cabling (<2km), use short pulses (5-30ns). For longer outside plant (>5km), use wider pulses (100ns-1us)."
  },
  {
    question: "Can I test live fibres with an OTDR?",
    answer: "Standard OTDRs should only test dark (inactive) fibres. Testing live fibres can damage the OTDR detector and produce meaningless results. Some specialized OTDRs can test on unused wavelengths while the fibre carries traffic on other wavelengths, but this requires specific equipment and careful planning."
  },
  {
    question: "Why does my OTDR show a 'gainer' (apparent gain) at some splices?",
    answer: "This occurs when splicing fibres with different backscatter coefficients - typically from different manufacturers or with slightly different mode field diameters. The downstream fibre scatters more light back, making the splice appear to have gain. Test from both ends and average the results to get the true splice loss."
  },
  {
    question: "How accurate is OTDR distance measurement?",
    answer: "OTDR distance accuracy depends on knowing the correct refractive index (group index) of the fibre. Using manufacturer specifications typically gives accuracy within 0.1% of the measured distance. For a 1km link, this means +/- 1 metre accuracy. Ensure your OTDR is set for the correct fibre type and index."
  }
];

const FiberOpticsModule5Section3 = () => {
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
          <span className="text-xs text-white/40 hidden sm:block">Section 3 of 6</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-3xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <CheckCircle className="w-4 h-4" />
            Module 5 · Section 3
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          OTDR Testing Basics
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-5 border border-blue-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            The Optical Time Domain Reflectometer (OTDR) is the most powerful diagnostic tool for
            fibre optic testing. It sends light pulses down the fibre and analyzes the returned
            signal from Rayleigh backscatter and Fresnel reflections to create a visual map of
            the entire link, showing every event, its location, and loss contribution.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl p-5 border border-indigo-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-indigo-400 mb-2">OTDR Reveals</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Total link length</li>
                <li>• Event locations (splices, connectors)</li>
                <li>• Individual event losses</li>
                <li>• Fibre attenuation per km</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">Key Applications</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Installation verification</li>
                <li>• Fault location</li>
                <li>• Baseline documentation</li>
                <li>• Troubleshooting high loss</li>
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
              "How OTDR works (backscatter principle)",
              "OTDR parameters (pulse width, range)",
              "Reading OTDR traces",
              "Event identification",
              "Launch and receive cables",
              "Dead zones and their impact"
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

        {/* Section 1: How OTDR Works */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">How OTDR Works - The Backscatter Principle</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              An OTDR works by sending short pulses of light into the fibre and measuring what
              comes back. Two physical phenomena create the returned signal: Rayleigh backscatter
              and Fresnel reflections.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Waves className="w-4 h-4 text-blue-400" />
                Rayleigh Backscatter
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>What it is:</strong> Light scattered backward by microscopic density variations in the glass</li>
                <li><strong>Continuous signal:</strong> Occurs throughout the entire fibre length</li>
                <li><strong>Level:</strong> Very weak - typically 50-60 dB below launched power</li>
                <li><strong>Information:</strong> Shows the fibre attenuation profile (loss per distance)</li>
                <li><strong>Appearance:</strong> Gradual downward slope on OTDR trace</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Fresnel Reflections
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>What it is:</strong> Light reflected at interfaces where refractive index changes</li>
                <li><strong>Discrete events:</strong> Occurs at connectors, mechanical splices, breaks, fibre ends</li>
                <li><strong>Strength:</strong> Much stronger than backscatter (-14 to -55 dB return loss)</li>
                <li><strong>Information:</strong> Identifies reflective event locations</li>
                <li><strong>Appearance:</strong> Spikes above the backscatter level on trace</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Time-to-Distance Conversion</h4>
              <p className="text-sm text-white/70">
                The OTDR measures the time between sending a pulse and receiving the return signal.
                Using the speed of light in the fibre (approximately 200,000 km/s, based on the
                fibre's refractive index), it calculates the distance to each event. Since light
                travels to the event and back, the OTDR divides by 2 to get the actual distance.
              </p>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">OTDR Block Diagram</h4>
              <p className="text-sm text-white/80 mb-3">
                A basic OTDR consists of these key components:
              </p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong>Laser source:</strong> Generates light pulses at test wavelengths (850, 1310, 1550nm)</li>
                <li>• <strong>Directional coupler:</strong> Separates outgoing pulses from returning light</li>
                <li>• <strong>Photodetector:</strong> Converts returned light to electrical signals</li>
                <li>• <strong>Signal processor:</strong> Averages multiple measurements, calculates distance/loss</li>
                <li>• <strong>Display:</strong> Shows the trace and event table</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: OTDR Parameters */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">OTDR Parameters - Pulse Width, Range, Wavelength</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Correct OTDR parameter selection is essential for accurate measurements. The main
              settings are pulse width, range, wavelength, and averaging time.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Pulse Width</h4>
              <div className="space-y-3 text-sm">
                <p>
                  Pulse width is the duration of each light pulse, measured in nanoseconds (ns) or
                  microseconds (us). It affects both range and resolution.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="font-medium text-blue-400 mb-1">Short Pulses (5-30ns)</p>
                    <ul className="text-white/60 space-y-1">
                      <li>• Better event resolution</li>
                      <li>• Smaller dead zones</li>
                      <li>• Limited range</li>
                      <li>• Lower dynamic range</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="font-medium text-indigo-400 mb-1">Wide Pulses (100ns-20us)</p>
                    <ul className="text-white/60 space-y-1">
                      <li>• Extended range</li>
                      <li>• Higher dynamic range</li>
                      <li>• Larger dead zones</li>
                      <li>• Reduced resolution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Range Setting</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>What it controls:</strong> The maximum distance the OTDR will display</li>
                <li><strong>Selection guide:</strong> Set range to 1.5-2x the expected fibre length</li>
                <li><strong>Too short:</strong> May not see the fibre end or events beyond the range</li>
                <li><strong>Too long:</strong> Compressed trace, harder to see event details</li>
                <li><strong>Auto mode:</strong> Many OTDRs can auto-detect and set appropriate range</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Test Wavelengths</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-blue-400 font-medium">850nm (Multimode)</p>
                  <p className="text-white/60">Standard wavelength for multimode testing. Higher attenuation than 1300nm.</p>
                </div>
                <div>
                  <p className="text-indigo-400 font-medium">1300/1310nm</p>
                  <p className="text-white/60">Multimode and singlemode. Lower loss, good for medium distances.</p>
                </div>
                <div>
                  <p className="text-purple-400 font-medium">1550nm (Singlemode)</p>
                  <p className="text-white/60">Lowest attenuation. Best for long-haul singlemode. More sensitive to bends.</p>
                </div>
                <div>
                  <p className="text-pink-400 font-medium">1625/1650nm (Singlemode)</p>
                  <p className="text-white/60">Live fibre testing wavelength. Most bend-sensitive - good for detecting macrobends.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Averaging Time</h4>
              <p className="text-sm text-white/70">
                OTDRs send thousands of pulses and average the results to reduce noise. Longer
                averaging improves trace quality and dynamic range but increases test time.
                Typical settings range from 10 seconds for quick tests to 3 minutes for detailed
                analysis of long or high-loss links.
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

        {/* Section 3: Reading OTDR Traces */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">Reading OTDR Traces - Events, Slopes, Reflections</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              An OTDR trace displays returned signal power (vertical axis, in dB) versus distance
              (horizontal axis). Learning to read traces is essential for effective fibre analysis.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Trace Elements</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Backscatter slope:</strong> The main downward-sloping line showing fibre attenuation</li>
                <li><strong>Reflection spikes:</strong> Peaks above the backscatter at reflective events</li>
                <li><strong>Step losses:</strong> Sudden drops in backscatter level at non-reflective events</li>
                <li><strong>Noise floor:</strong> The baseline noise level at the bottom of the trace</li>
                <li><strong>Fibre end:</strong> Sharp drop to noise floor (or reflection if cleaved/polished)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Understanding the Slope</h4>
              <div className="space-y-3 text-sm">
                <p className="text-white/70">
                  The backscatter slope represents fibre attenuation. A steeper slope means higher loss per kilometre.
                </p>
                <div className="flex gap-3">
                  <span className="text-green-400">Normal:</span>
                  <span className="text-white/60">Consistent slope matching fibre spec (e.g., 0.35 dB/km at 1310nm)</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-yellow-400">Steeper section:</span>
                  <span className="text-white/60">Higher loss - possible damage, stress, or poor fibre quality</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-400">Very steep:</span>
                  <span className="text-white/60">Severe bend, crush, or approaching a break</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Loss Measurements</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Point-to-point:</strong> Total loss between any two cursor positions</li>
                <li><strong>Event loss:</strong> Loss at a specific event (splice, connector)</li>
                <li><strong>Span loss:</strong> Total loss for a fibre section between events</li>
                <li><strong>Attenuation coefficient:</strong> Loss per kilometre (dB/km) for fibre sections</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Measurement Methods</h4>
              <div className="text-sm text-white/80 space-y-2">
                <div>
                  <p className="font-medium text-white">Two-Point Method</p>
                  <p className="text-white/60">Place cursors on backscatter before and after an event. Difference shows event loss.</p>
                </div>
                <div>
                  <p className="font-medium text-white">Least Squares Analysis (LSA)</p>
                  <p className="text-white/60">OTDR fits lines to backscatter sections. More accurate, especially for noisy traces.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Event Identification */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">Event Identification - Splices, Connectors, Bends, Breaks</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Each type of fibre event creates a distinctive signature on the OTDR trace.
              Learning to recognize these patterns is key to effective troubleshooting.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                Reflective Events
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-blue-300">Connectors (PC/UPC)</p>
                  <p className="text-white/60">Reflection spike with step loss. Typical reflection: -35 to -55 dB. Loss: 0.2-0.5 dB.</p>
                </div>
                <div>
                  <p className="font-medium text-indigo-300">Mechanical Splices</p>
                  <p className="text-white/60">Small reflection spike with loss. Reflection: -40 to -60 dB. Loss: 0.1-0.5 dB.</p>
                </div>
                <div>
                  <p className="font-medium text-red-300">Breaks / Cleaved Ends</p>
                  <p className="text-white/60">Strong reflection spike, signal drops to noise. Reflection: -14 to -20 dB.</p>
                </div>
                <div>
                  <p className="font-medium text-purple-300">APC Connectors</p>
                  <p className="text-white/60">Minimal reflection (angled polish). Reflection: -60 dB or better. May appear non-reflective.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Non-Reflective Events
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-green-300">Fusion Splices</p>
                  <p className="text-white/60">Step down in backscatter, no reflection. Good splice: less than 0.1 dB loss.</p>
                </div>
                <div>
                  <p className="font-medium text-yellow-300">Macrobends</p>
                  <p className="text-white/60">Step loss, more pronounced at 1550/1625nm. Loss depends on bend radius/severity.</p>
                </div>
                <div>
                  <p className="font-medium text-orange-300">Stress Points</p>
                  <p className="text-white/60">Localized loss from crushing, tension, or cable damage. Variable loss levels.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Apparent Gainers</h4>
              <p className="text-sm text-white/70 mb-2">
                Sometimes a splice appears to show gain (step up). This isn't real gain - it
                occurs when the downstream fibre has a higher backscatter coefficient than the
                upstream fibre. This can happen when:
              </p>
              <ul className="text-sm text-white/60 space-y-1">
                <li>• Splicing fibres from different manufacturers</li>
                <li>• Mode field diameter mismatch</li>
                <li>• Different fibre types joined</li>
              </ul>
              <p className="text-sm text-white/70 mt-2">
                Always test from both ends and average results to get true splice loss.
              </p>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Common Fault Signatures
              </h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• <strong>Complete break:</strong> Strong reflection followed by drop to noise floor</li>
                <li>• <strong>Bad connector:</strong> High reflection and/or high loss</li>
                <li>• <strong>Tight bend:</strong> Loss greater at 1550nm than 1310nm</li>
                <li>• <strong>Water ingress:</strong> Increased attenuation over affected section</li>
              </ul>
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

        {/* Section 5: Launch and Receive Cables */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Launch and Receive Cables - Purpose and Use</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Launch cables (also called pulse suppressors or fibre rings) and receive cables are
              essential accessories for accurate OTDR testing. They enable proper characterization
              of the first and last connectors.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Launch Cable Purpose</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Dead zone displacement:</strong> Moves initial dead zone away from first connector</li>
                <li><strong>First connector characterization:</strong> See reflection and loss of first connection</li>
                <li><strong>Mode conditioning:</strong> Establishes equilibrium mode distribution (multimode)</li>
                <li><strong>Typical length:</strong> 100 metres to 2 kilometres depending on application</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Receive Cable Purpose</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Last connector characterization:</strong> See reflection and loss of final connection</li>
                <li><strong>Clear end identification:</strong> Distinguish fibre end from last event</li>
                <li><strong>Bidirectional averaging:</strong> Enables two-end testing for accurate results</li>
                <li><strong>Typical length:</strong> Same as launch cable for consistency</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Test Configuration</h4>
              <div className="text-sm space-y-2">
                <p className="text-white/70">Standard three-cable test setup:</p>
                <div className="bg-white/5 rounded-lg p-3 font-mono text-xs text-center text-white/80">
                  OTDR → Launch Cable → [Link Under Test] → Receive Cable
                </div>
                <p className="text-white/60 mt-2">
                  This allows all connectors of the link under test to be fully characterized.
                  The launch and receive cable connectors appear on the trace but are excluded
                  from the link measurement.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Best Practices</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Match fibre type to link</li>
                  <li>• Match connector type</li>
                  <li>• Inspect and clean before use</li>
                  <li>• Store carefully - coiled, protected</li>
                  <li>• Replace if damaged or worn</li>
                </ul>
              </div>
              <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
                <h4 className="font-semibold text-elec-yellow mb-2">Launch Cable Length Guide</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Short links (&lt;500m): 100-150m launch</li>
                  <li>• Medium links (500m-5km): 300-500m</li>
                  <li>• Long links (&gt;5km): 500m-2km</li>
                  <li>• Must exceed OTDR dead zone</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Bidirectional Testing</h4>
              <p className="text-sm text-white/70">
                For most accurate results, test from both ends and average the measurements.
                This eliminates errors from backscatter coefficient variations and provides
                true splice/connector losses. The launch cable becomes the receive cable
                when testing from the opposite end.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Dead Zones and Their Impact */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Dead Zones and Their Impact</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Dead zones are regions on the OTDR trace where events cannot be accurately detected
              or measured. Understanding and minimizing dead zones is critical for quality testing.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Types of Dead Zones</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-blue-400">Event Dead Zone (EDZ)</p>
                  <p className="text-white/60">
                    The minimum distance after a reflective event where another event can be detected.
                    Caused by detector recovery from reflection saturation. Typically 0.5-5 metres.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-indigo-400">Attenuation Dead Zone (ADZ)</p>
                  <p className="text-white/60">
                    The minimum distance after a reflective event where accurate loss measurements can
                    be made. Longer than EDZ. Typically 3-25 metres depending on OTDR and settings.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">What Creates Dead Zones</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><strong>Strong reflections:</strong> The OTDR detector saturates and takes time to recover</li>
                <li><strong>Wide pulse widths:</strong> Longer pulses create longer dead zones</li>
                <li><strong>OTDR design:</strong> Detector speed and quality affect recovery time</li>
                <li><strong>Initial connection:</strong> The OTDR port connection creates the first dead zone</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Dead Zone Impact</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Hidden events:</strong> Events within a dead zone won't appear on trace</li>
                <li><strong>Inaccurate loss:</strong> Measurements in ADZ will be incorrect</li>
                <li><strong>Missed faults:</strong> Problems close to connectors may not be detected</li>
                <li><strong>Short link challenges:</strong> Dead zones may cover significant portion of short links</li>
              </ul>
            </div>

            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-3">Minimizing Dead Zones</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• <strong>Use short pulse widths:</strong> Reduces dead zone length</li>
                <li>• <strong>Use launch cable:</strong> Moves initial dead zone before link under test</li>
                <li>• <strong>High-quality OTDR:</strong> Better detectors have faster recovery</li>
                <li>• <strong>APC connectors:</strong> Lower reflections mean shorter dead zones</li>
                <li>• <strong>Dead zone specs:</strong> Check OTDR specifications when purchasing</li>
              </ul>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Dead Zone Considerations for Short Links
              </h4>
              <p className="text-sm text-white/80">
                For data centre and premises cabling with short links (under 500m), dead zones
                become critical. Events may be spaced only metres apart. Use an OTDR designed
                for short-haul testing with event dead zones under 1 metre. Launch cables become
                essential - without them, the first patch panel connector falls within the
                initial dead zone and cannot be characterized.
              </p>
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
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">OTDR Test Procedure</h4>
              <ol className="text-sm text-white/70 space-y-1">
                <li>1. Inspect and clean all connectors</li>
                <li>2. Connect launch cable to OTDR</li>
                <li>3. Connect launch cable to link under test</li>
                <li>4. Connect receive cable to far end (if available)</li>
                <li>5. Set wavelength, pulse width, and range</li>
                <li>6. Run auto-test or manual acquisition</li>
                <li>7. Review trace and event table</li>
                <li>8. Save results with documentation</li>
              </ol>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common OTDR Mistakes</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>No launch cable:</strong> Cannot characterize first connector properly</li>
                <li>• <strong>Wrong fibre type:</strong> Mismatched launch cable invalidates multimode results</li>
                <li>• <strong>Dirty connectors:</strong> Creates false events and inaccurate readings</li>
                <li>• <strong>Wrong range/pulse:</strong> Missing events or poor resolution</li>
                <li>• <strong>Single-end only:</strong> Apparent gainers and inaccurate splice losses</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-xl p-4 border border-indigo-500/20">
              <h4 className="font-semibold text-indigo-400 mb-2">Pass/Fail Criteria</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Connector loss: typically &lt; 0.5 dB (0.3 dB for Tier 2)</li>
                <li>• Fusion splice loss: typically &lt; 0.1 dB</li>
                <li>• Fibre attenuation: per manufacturer spec (e.g., 0.35 dB/km at 1310nm)</li>
                <li>• Connector reflectance: &lt; -35 dB (UPC), &lt; -60 dB (APC)</li>
                <li>• No unexpected events or anomalies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-5 border border-blue-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Radio className="w-5 h-5 text-blue-400" />
              Quick Reference: OTDR Testing
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-2">Trace Features</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>Downward slope = Normal attenuation</li>
                  <li>Spike up = Reflective event</li>
                  <li>Step down = Non-reflective loss</li>
                  <li>Drop to noise = Fibre end/break</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-indigo-300 mb-2">Parameter Selection</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>Short pulse = Better resolution</li>
                  <li>Wide pulse = Greater range</li>
                  <li>Range = 1.5-2x fibre length</li>
                  <li>Test both ends for accuracy</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Rayleigh backscatter = Continuous signal | Fresnel reflection = Discrete events | Always use launch cable
              </p>
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
            to="/apprentice/study-centre/upskilling/fiber-optics/module5/section2"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Insertion Loss Testing
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module5/section4"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next: Interpreting Test Results
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule5Section3;
