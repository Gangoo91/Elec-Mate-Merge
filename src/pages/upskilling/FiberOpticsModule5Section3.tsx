import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "OTDR Testing Basics - Fibre Optics Technology";
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
    explanation: "OTDRs work by analysing Rayleigh backscatter (continuous light scattered backward along the fibre) and Fresnel reflections (discrete reflections at interfaces like connectors and breaks)."
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
    explanation: "A launch cable (typically 100m-2km) moves the OTDR's initial dead zone away from the first connector, allowing proper characterisation of the first connection point."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does OTDR stand for?",
    options: [
      "Optical Time Domain Receiver",
      "Optical Time Domain Reflectometer",
      "Optical Transmission Detection Reader",
      "Output Test Data Recorder"
    ],
    correctAnswer: 1,
    explanation: "OTDR stands for Optical Time Domain Reflectometer - it sends light pulses and analyses reflections over time."
  },
  {
    id: 2,
    question: "What causes Rayleigh backscatter in optical fibre?",
    options: [
      "Connector reflections",
      "Microscopic density variations in the glass",
      "Macrobends in the cable",
      "Splice points"
    ],
    correctAnswer: 1,
    explanation: "Rayleigh backscatter is caused by microscopic density variations inherent in the glass structure, causing continuous low-level scattering."
  },
  {
    id: 3,
    question: "On an OTDR trace, what does a downward slope indicate?",
    options: [
      "Increasing signal strength",
      "Normal fibre attenuation (loss over distance)",
      "A connector",
      "A break in the fibre"
    ],
    correctAnswer: 1,
    explanation: "The downward slope represents normal fibre attenuation - the gradual loss of signal as light travels through the fibre."
  },
  {
    id: 4,
    question: "What type of event appears as a spike above the backscatter level?",
    options: [
      "Fusion splice",
      "Reflective event (connector or break)",
      "Macrobend",
      "Normal fibre"
    ],
    correctAnswer: 1,
    explanation: "Reflective events (connectors, mechanical splices, breaks) cause Fresnel reflections that appear as spikes above the backscatter level."
  },
  {
    id: 5,
    question: "How does pulse width affect OTDR measurements?",
    options: [
      "Wider pulses provide better resolution",
      "Wider pulses provide greater range but reduced resolution",
      "Pulse width has no effect",
      "Narrower pulses provide greater range"
    ],
    correctAnswer: 1,
    explanation: "Wider pulses have more energy for greater range but reduced resolution. Narrower pulses give better resolution but less range."
  },
  {
    id: 6,
    question: "What is the typical length of a launch cable for OTDR testing?",
    options: [
      "1-5 metres",
      "100 metres to 2 kilometres",
      "10-20 metres",
      "5-10 kilometres"
    ],
    correctAnswer: 1,
    explanation: "Launch cables are typically 100m to 2km to adequately move the initial dead zone away from the first connector."
  },
  {
    id: 7,
    question: "What characterises a non-reflective event on an OTDR trace?",
    options: [
      "A spike above the backscatter line",
      "A step down in the backscatter level without a reflection spike",
      "An upward slope",
      "No visible change"
    ],
    correctAnswer: 1,
    explanation: "Non-reflective events (fusion splices, macrobends) show as a step down in backscatter level without a reflection spike."
  },
  {
    id: 8,
    question: "What causes Fresnel reflections in optical fibre?",
    options: [
      "Absorption in the core",
      "Refractive index changes at interfaces (glass-to-air)",
      "Continuous scattering",
      "Fibre bending"
    ],
    correctAnswer: 1,
    explanation: "Fresnel reflections occur at interfaces where the refractive index changes, such as glass-to-air at connectors or breaks."
  },
  {
    id: 9,
    question: "What is an event dead zone?",
    options: [
      "The distance after a reflection where no events can be detected",
      "A section of fibre with no signal",
      "The area before the launch cable",
      "A region with zero attenuation"
    ],
    correctAnswer: 0,
    explanation: "The event dead zone is the minimum distance after a reflective event where the OTDR can detect another event."
  },
  {
    id: 10,
    question: "Why is a receive cable used at the far end of a link?",
    options: [
      "To add signal strength",
      "To characterise the last connector and see the fibre end clearly",
      "To reduce reflections",
      "To increase testing speed"
    ],
    correctAnswer: 1,
    explanation: "A receive cable allows proper characterisation of the last connector and shows where the fibre actually ends."
  }
];

const faqs = [
  {
    question: "What is the difference between event dead zone and attenuation dead zone?",
    answer: "The event dead zone is the minimum distance after a reflective event where the OTDR can detect another event. The attenuation dead zone is longer - it's the distance required before accurate loss measurements can be made. Event dead zones are typically 0.5-5m, while attenuation dead zones can be 5-25m depending on the OTDR and settings."
  },
  {
    question: "Why do I need both launch and receive cables?",
    answer: "The launch cable moves the initial dead zone away from the first connector under test, allowing its proper characterisation. The receive cable allows you to see the last connector clearly and confirm where the fibre actually ends, rather than seeing an abrupt end at the last reflection. Together, they ensure accurate measurement of all connection points."
  },
  {
    question: "How do I choose the right pulse width for my test?",
    answer: "Start with a shorter pulse width for better resolution on short links or when you need to see closely-spaced events. Use longer pulse widths for extended range on long fibre runs. Many modern OTDRs have auto-test modes that select optimal settings. For typical premises cabling (under 2km), use short pulses (5-30ns). For longer outside plant (over 5km), use wider pulses (100ns-1us)."
  },
  {
    question: "Can I test live fibres with an OTDR?",
    answer: "Standard OTDRs should only test dark (inactive) fibres. Testing live fibres can damage the OTDR detector and produce meaningless results. Some specialised OTDRs can test on unused wavelengths while the fibre carries traffic on other wavelengths, but this requires specific equipment and careful planning."
  },
  {
    question: "Why does my OTDR show a 'gainer' (apparent gain) at some splices?",
    answer: "This occurs when splicing fibres with different backscatter coefficients - typically from different manufacturers or with slightly different mode field diameters. The downstream fibre scatters more light back, making the splice appear to have gain. Test from both ends and average the results to get the true splice loss."
  },
  {
    question: "How accurate is OTDR distance measurement?",
    answer: "OTDR distance accuracy depends on knowing the correct refractive index (group index) of the fibre. Using manufacturer specifications typically gives accuracy within 0.1% of the measured distance. For a 1km link, this means plus or minus 1 metre accuracy. Ensure your OTDR is set for the correct fibre type and index."
  }
];

const FiberOpticsModule5Section3 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 5 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            OTDR Testing Basics
          </h1>
          <p className="text-white/80">
            Master the most powerful diagnostic tool for fibre optic networks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>OTDR:</strong> Optical Time Domain Reflectometer</li>
              <li><strong>Principle:</strong> Analyses backscatter and reflections</li>
              <li><strong>Output:</strong> Visual map of entire fibre link</li>
              <li><strong>Shows:</strong> Events, locations, and losses</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">OTDR Reveals</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Link length:</strong> Total distance measured</li>
              <li><strong>Events:</strong> Splices, connectors, bends</li>
              <li><strong>Losses:</strong> At each event and per km</li>
              <li><strong>Faults:</strong> Breaks, damage, high loss points</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "How OTDR works (backscatter principle)",
              "OTDR parameters (pulse width, range)",
              "Reading OTDR traces",
              "Event identification",
              "Launch and receive cables",
              "Dead zones and their impact"
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
            How OTDR Works - The Backscatter Principle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An OTDR works by sending short pulses of light into the fibre and measuring what comes back. Two physical phenomena create the returned signal: Rayleigh backscatter and Fresnel reflections.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Rayleigh backscatter:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Caused by microscopic density variations in the glass</li>
                <li>Creates continuous low-level light scattered backward</li>
                <li>Provides the baseline signal on the OTDR trace</li>
                <li>The downward slope shows fibre attenuation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fresnel reflections:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Caused by refractive index changes at interfaces</li>
                <li>Occur at connectors, mechanical splices, and breaks</li>
                <li>Appear as spikes above the backscatter level</li>
                <li>Glass-to-air interfaces cause the strongest reflections</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">The OTDR Trace</p>
              <p className="text-sm text-white">
                The OTDR displays a trace showing power (vertical) versus distance (horizontal). The trace starts high and slopes downward as light attenuates. Events appear as steps down (splices, bends) or spikes up (reflective connectors). The trace ends at the fibre end or a break.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            OTDR Parameters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding OTDR parameters helps you configure tests correctly for different situations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Wavelength:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>850nm:</strong> Multimode testing, higher attenuation</li>
                <li><strong>1300nm:</strong> Multimode and singlemode testing</li>
                <li><strong>1310nm:</strong> Singlemode, lower attenuation</li>
                <li><strong>1550nm:</strong> Singlemode, lowest attenuation, bend sensitive</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pulse width:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Narrow pulses (5-30ns):</strong> Better resolution, shorter range</li>
                <li><strong>Wide pulses (100ns-1us):</strong> Greater range, lower resolution</li>
                <li>Use narrow for short links with closely-spaced events</li>
                <li>Use wide for long outside plant runs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Range setting:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Set range slightly longer than expected fibre length</li>
                <li>Too short: you won't see the end of the fibre</li>
                <li>Too long: reduced resolution and wasted test time</li>
                <li>Auto-range features work well for most testing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Averaging time:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Longer averaging reduces noise for cleaner traces</li>
                <li>Quick tests (10-30 seconds) for routine checks</li>
                <li>Longer tests (2-3 minutes) for certification quality</li>
                <li>Trade-off between speed and measurement quality</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Reading OTDR Traces
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding what different features on an OTDR trace represent is essential for accurate interpretation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Trace features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Downward slope:</strong> Normal fibre attenuation (loss per km)</li>
                <li><strong>Spike up (reflection):</strong> Connector or mechanical splice</li>
                <li><strong>Step down:</strong> Fusion splice or macrobend</li>
                <li><strong>Large reflection then noise:</strong> End of fibre or break</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Event types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Reflective events:</strong> Connectors, mechanical splices, breaks - show reflection spike plus loss</li>
                <li><strong>Non-reflective events:</strong> Fusion splices, macrobends - show loss only, no spike</li>
                <li><strong>Gainers:</strong> Apparent gain due to different fibre characteristics (test both directions)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Typical Loss Values</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fusion splice:</strong> 0.02-0.1 dB typical</li>
                <li><strong>Mechanical splice:</strong> 0.1-0.5 dB typical</li>
                <li><strong>Connector pair:</strong> 0.3-0.75 dB typical</li>
                <li><strong>Singlemode fibre:</strong> 0.35 dB/km at 1310nm, 0.25 dB/km at 1550nm</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Dead Zones
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dead zones are areas on the OTDR trace where measurements are unreliable due to detector saturation from strong reflections. Understanding dead zones is critical for accurate testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of dead zones:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Event dead zone:</strong> Minimum distance to detect another event after a reflection (typically 0.5-5m)</li>
                <li><strong>Attenuation dead zone:</strong> Distance before accurate loss measurement is possible (typically 5-25m)</li>
                <li>Both depend on pulse width, reflectance, and OTDR quality</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Dead zone impact:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Events too close together may be hidden or merged</li>
                <li>Initial connector creates dead zone at start of test</li>
                <li>Strong reflections can hide nearby events</li>
                <li>Shorter pulse widths reduce dead zones but limit range</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Managing dead zones:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use launch cable to move initial dead zone away from first connector</li>
                <li>Use shorter pulse widths when resolution matters</li>
                <li>Clean connectors to reduce reflectance</li>
                <li>Use APC connectors where possible (lower reflectance)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Launch and Receive Cables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Launch and receive cables are essential for professional OTDR testing. They ensure all connectors in the link under test can be properly characterised.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Launch cable (leader):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Connected between OTDR and link under test</li>
                <li>Typical length: 100m to 2km</li>
                <li>Moves initial dead zone away from first test connector</li>
                <li>Allows proper measurement of first connector loss</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Receive cable (tail):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Connected at far end of link under test</li>
                <li>Typical length: 100m to 2km</li>
                <li>Allows proper measurement of last connector loss</li>
                <li>Shows clear fibre end rather than abrupt reflection</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Best Practice</p>
              <p className="text-sm text-white">
                Always use launch cables for professional testing. Receive cables are essential when the far connector loss must be measured. Match cable type (singlemode/multimode) to the link under test. Keep launch/receive cables clean and undamaged - they're your reference.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            OTDR Test Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A systematic approach ensures consistent, accurate OTDR test results.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-test preparation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Inspect and clean OTDR port and launch cable connectors</li>
                <li>2. Inspect and clean connectors on link under test</li>
                <li>3. Connect launch cable to OTDR</li>
                <li>4. Select correct wavelength and fibre type</li>
                <li>5. Set appropriate range and pulse width</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Running the test:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Connect launch cable to link under test</li>
                <li>2. Connect receive cable at far end (if used)</li>
                <li>3. Run OTDR acquisition (auto-test or manual)</li>
                <li>4. Wait for averaging to complete</li>
                <li>5. Review trace and event table</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Analysis and documentation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify event locations match expected splice/connector positions</li>
                <li>Check individual event losses against specifications</li>
                <li>Verify total link loss is within budget</li>
                <li>Save trace file with clear naming convention</li>
                <li>Test from both ends for bidirectional analysis</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use OTDR</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installation verification:</strong> Baseline testing of new links</li>
                <li><strong>Fault location:</strong> Finding breaks, damage, or high-loss events</li>
                <li><strong>Troubleshooting:</strong> Investigating link problems</li>
                <li><strong>Documentation:</strong> Creating as-built records</li>
                <li><strong>Maintenance:</strong> Periodic health checks</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Bidirectional Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always test from both ends when possible</li>
                <li>Average the results for true event losses</li>
                <li>Identifies gainers caused by different fibre characteristics</li>
                <li>Required for certification-grade documentation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Dirty connectors:</strong> Always clean before testing</li>
                <li><strong>Wrong fibre type:</strong> Ensure OTDR matches link type</li>
                <li><strong>No launch cable:</strong> First connector won't be measured correctly</li>
                <li><strong>Wrong range:</strong> May miss the end of the fibre</li>
                <li><strong>Testing live fibres:</strong> Can damage OTDR detector</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: OTDR Testing</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Setup</p>
                <ul className="space-y-0.5">
                  <li>Clean all connectors</li>
                  <li>Use launch cable</li>
                  <li>Set correct wavelength</li>
                  <li>Select appropriate pulse width</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Interpretation</p>
                <ul className="space-y-0.5">
                  <li>Slope = fibre attenuation</li>
                  <li>Spike = reflective event</li>
                  <li>Step down = non-reflective event</li>
                  <li>Test both directions</li>
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
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule5Section3;
