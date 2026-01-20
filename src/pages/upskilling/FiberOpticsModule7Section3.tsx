import { ArrowLeft, Activity, Zap, CheckCircle, AlertTriangle, BookOpen, Target, Radio, Flashlight, BarChart3, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Troubleshooting Tools and OTDR Use - Fibre Optics Technology";
const DESCRIPTION = "Master fibre optic troubleshooting tools including visual fault locators, power meters, light sources, and OTDR trace interpretation for effective fault diagnosis.";

const quickCheckQuestions = [
  {
    question: "What is the primary purpose of a Visual Fault Locator (VFL)?",
    options: [
      { text: "To measure optical power levels", isCorrect: false },
      { text: "To locate breaks, tight bends, and verify fibre continuity", isCorrect: true },
      { text: "To measure return loss", isCorrect: false },
      { text: "To clean connector end-faces", isCorrect: false }
    ],
    explanation: "A VFL injects visible red laser light (typically 650nm) into the fibre. Light escapes at breaks, tight bends, and faulty connections, making them visible. It's a fast, simple tool for fault location and continuity verification."
  },
  {
    question: "What does a 'gainer' event on an OTDR trace indicate?",
    options: [
      { text: "A signal amplifier in the link", isCorrect: false },
      { text: "A connector with gain", isCorrect: false },
      { text: "A splice between fibres with different backscatter coefficients", isCorrect: true },
      { text: "An OTDR calibration error", isCorrect: false }
    ],
    explanation: "A gainer (apparent gain) occurs when splicing fibres with different backscatter properties. Testing from fibre with lower backscatter into higher backscatter fibre creates an apparent increase in power. Bi-directional testing and averaging reveals the true loss."
  },
  {
    question: "What is the OTDR 'dead zone' and why does it matter?",
    options: [
      { text: "An area where the OTDR cannot operate", isCorrect: false },
      { text: "The distance after a reflective event where the OTDR cannot detect other events", isCorrect: true },
      { text: "The maximum range of the OTDR", isCorrect: false },
      { text: "A faulty section of fibre", isCorrect: false }
    ],
    explanation: "After a reflective event (connector), the OTDR receiver is saturated and cannot detect other events for a short distance—the dead zone. This limits how close together events can be distinguished. Shorter pulse widths reduce dead zones but also reduce range."
  }
];

const quizQuestions = [
  {
    question: "What wavelength does a typical Visual Fault Locator (VFL) use?",
    options: [
      { text: "850nm (infrared)", isCorrect: false },
      { text: "650nm (visible red)", isCorrect: true },
      { text: "1310nm (infrared)", isCorrect: false },
      { text: "1550nm (infrared)", isCorrect: false }
    ],
    explanation: "VFLs use visible red light at approximately 650nm so that light escaping at fault points can be seen by the naked eye. Most can also be seen through cable jackets or orange OM1/OM2 fibre coatings."
  },
  {
    question: "When using an optical power meter and light source for loss testing, what is the correct test procedure?",
    options: [
      { text: "Measure power at transmitter only", isCorrect: false },
      { text: "Set reference with test leads, then measure through link under test", isCorrect: true },
      { text: "Compare received power to published specifications", isCorrect: false },
      { text: "Measure at multiple points along the link", isCorrect: false }
    ],
    explanation: "The reference measurement establishes the baseline with your test leads connected. The link loss is then the difference between the reference power and the power measured through the link under test."
  },
  {
    question: "What does an OTDR measure to create its trace?",
    options: [
      { text: "Forward transmitted light only", isCorrect: false },
      { text: "Rayleigh backscatter and Fresnel reflections returning to the source", isCorrect: true },
      { text: "Light at the far end of the fibre", isCorrect: false },
      { text: "Electrical resistance of the fibre", isCorrect: false }
    ],
    explanation: "The OTDR sends pulses down the fibre and analyses light that returns—both Rayleigh backscatter (continuous low-level return from the fibre itself) and Fresnel reflections (bright returns from connectors, breaks, etc.)."
  },
  {
    question: "On an OTDR trace, how does a fusion splice typically appear?",
    options: [
      { text: "Large reflective spike with high loss", isCorrect: false },
      { text: "Small non-reflective loss event", isCorrect: true },
      { text: "Gradual slope change over distance", isCorrect: false },
      { text: "End of trace indication", isCorrect: false }
    ],
    explanation: "Fusion splices show as small loss events (0.02-0.1 dB typically) with minimal or no reflection because there is no air gap. Mechanical splices show similar loss but with more reflection from the index matching material."
  },
  {
    question: "Why is bi-directional OTDR testing important?",
    options: [
      { text: "It doubles the testing speed", isCorrect: false },
      { text: "It reveals true splice loss by averaging out gainer effects", isCorrect: true },
      { text: "It is required by all standards", isCorrect: false },
      { text: "It detects problems that unidirectional testing misses completely", isCorrect: false }
    ],
    explanation: "Bi-directional testing and averaging eliminates gainer effects caused by different backscatter coefficients between fibre sections. The average of both directions gives the true splice loss value."
  },
  {
    question: "What parameter determines the OTDR's range versus resolution trade-off?",
    options: [
      { text: "Wavelength selection", isCorrect: false },
      { text: "Pulse width setting", isCorrect: true },
      { text: "Averaging time", isCorrect: false },
      { text: "Index of refraction setting", isCorrect: false }
    ],
    explanation: "Shorter pulse widths provide better resolution (smaller dead zones, ability to see closely-spaced events) but reduce range. Longer pulses provide more energy for long-distance testing but create larger dead zones."
  },
  {
    question: "What does a sharp vertical drop to noise floor on an OTDR trace indicate?",
    options: [
      { text: "A connector", isCorrect: false },
      { text: "A fusion splice", isCorrect: false },
      { text: "End of fibre or a complete break", isCorrect: true },
      { text: "A bend in the fibre", isCorrect: false }
    ],
    explanation: "A non-reflective break (clean fracture) shows as a sudden drop to the noise floor with no reflection. A reflective end-of-fibre (connector or rough break) shows a spike before the drop."
  },
  {
    question: "When would you use 1625nm wavelength for OTDR testing instead of 1550nm?",
    options: [
      { text: "For multimode fibre testing", isCorrect: false },
      { text: "For detecting bend-sensitive faults and stress points", isCorrect: true },
      { text: "For longer range testing", isCorrect: false },
      { text: "For connector loss measurement", isCorrect: false }
    ],
    explanation: "1625nm (and 1650nm) wavelengths are more sensitive to macrobends and microbends than 1550nm. Testing at these wavelengths can reveal stress points and bends that appear acceptable at shorter wavelengths."
  },
  {
    question: "What is the purpose of a launch fibre (launch lead) when using an OTDR?",
    options: [
      { text: "To protect the OTDR from damage", isCorrect: false },
      { text: "To move the first connector outside the OTDR's dead zone", isCorrect: true },
      { text: "To increase the testing range", isCorrect: false },
      { text: "To convert between connector types", isCorrect: false }
    ],
    explanation: "The OTDR has a dead zone after its own connector. A launch fibre (typically 100-500m) moves the first connection of the link under test outside this dead zone so it can be properly characterised."
  },
  {
    question: "What does increasing the averaging time on an OTDR accomplish?",
    options: [
      { text: "Increases the pulse width", isCorrect: false },
      { text: "Reduces noise and improves trace quality", isCorrect: true },
      { text: "Extends the dead zone", isCorrect: false },
      { text: "Changes the wavelength", isCorrect: false }
    ],
    explanation: "Averaging multiple measurements reduces random noise, producing a cleaner trace. This is especially useful for long links or when looking for small events. More averaging takes more time but improves measurement quality."
  }
];

const faqs = [
  {
    question: "Do I need an OTDR for basic troubleshooting?",
    answer: "Not always. A VFL can quickly locate breaks and tight bends. A power meter and light source can verify link loss. These simpler tools handle many common problems. An OTDR is essential for precisely locating faults in long cables, characterising multiple events, and professional documentation."
  },
  {
    question: "Why doesn't my OTDR show the first connector properly?",
    answer: "The OTDR's dead zone extends from its port for some distance (specified in metres). Events within this zone cannot be characterised. Use a launch fibre to move your first connector beyond the dead zone. The launch fibre length depends on your OTDR's specifications and pulse width setting."
  },
  {
    question: "Can I test a live fibre link with an OTDR?",
    answer: "Generally no—active traffic will interfere with OTDR measurements and the OTDR's pulses can damage receivers. Some OTDRs can test at 1625nm or 1650nm on live links (these wavelengths aren't used for traffic), but the fibre must be specifically provisioned for this. Always verify the fibre is dark before standard OTDR testing."
  },
  {
    question: "What's the difference between event dead zone and attenuation dead zone?",
    answer: "Event dead zone is the minimum distance at which two separate reflective events can be distinguished. Attenuation dead zone is the minimum distance after a reflection where a non-reflective event (like a splice) can be measured. Attenuation dead zone is always longer than event dead zone."
  },
  {
    question: "My OTDR shows a loss much higher than expected—what should I check?",
    answer: "First verify the Group Index of Refraction (IOR) setting matches your fibre type. Wrong IOR gives incorrect distance readings. Then check for dirty connectors (including the OTDR port), wrong wavelength selection, or a genuine fault in the link. Compare with a power meter measurement to verify total loss."
  },
  {
    question: "When should I test at multiple wavelengths?",
    answer: "Multi-wavelength testing (1310nm and 1550nm for singlemode, or 850nm and 1300nm for multimode) provides more complete link characterisation. Wavelength-dependent loss can indicate bends. Testing at 1625nm helps identify marginal bends that pass at shorter wavelengths."
  }
];

const FiberOpticsModule7Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/electrical-upskilling/fiber-optics-module-7" className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Module 7</span>
          </Link>
          <span className="text-white/50 text-sm">Section 3 of 5</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="px-4 pt-8 pb-6 bg-gradient-to-b from-[#1a1a1a] to-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-elec-yellow/20 text-elec-yellow text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            MODULE 7 · SECTION 3
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Troubleshooting Tools and OTDR Use
          </h1>
          <p className="text-white/70 text-lg">
            Master the test equipment needed to diagnose and locate fibre faults
          </p>
        </div>
      </div>

      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Quick Summary Boxes */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <Flashlight className="w-6 h-6 text-red-500 mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">VFL & Basic Tools</h3>
              <p className="text-white/60 text-xs">Visual fault locators, power meters, light sources</p>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <BarChart3 className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">OTDR</h3>
              <p className="text-white/60 text-xs">Trace interpretation and fault location</p>
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
                "Use a Visual Fault Locator to identify breaks and bends",
                "Perform insertion loss measurements with power meter and light source",
                "Understand OTDR operating principles and trace interpretation",
                "Identify different events on an OTDR trace (connectors, splices, bends, breaks)",
                "Apply correct testing methodology including bi-directional testing"
              ].map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 01: Visual Fault Locator */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Visual Fault Locator (VFL)
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                A <strong className="text-white">Visual Fault Locator</strong> is one of the most useful basic troubleshooting tools. It injects visible red laser light (typically 650nm) into the fibre. This light escapes at fault points—breaks, tight bends, and bad connections—making them visible to the naked eye.
              </p>
            </div>

            {/* VFL Applications */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Flashlight className="w-5 h-5 text-red-500" />
                VFL Applications
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Fibre continuity verification</span>
                    <p className="text-white/60 text-sm">Quickly confirm fibre runs through to far end</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Break location</span>
                    <p className="text-white/60 text-sm">Visible glow at break point (within ~5km)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Tight bend identification</span>
                    <p className="text-white/60 text-sm">Light leaks at excessively tight bends</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Connector verification</span>
                    <p className="text-white/60 text-sm">Light at adapter indicates poor connection or uncleaned ends</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Fibre identification</span>
                    <p className="text-white/60 text-sm">Identify which fibre in a bundle is which</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Safety Warning */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Laser Safety Warning
              </h4>
              <p className="text-white/70 text-sm">
                VFLs are typically Class 2 or Class 3R lasers. <strong className="text-white">Never look directly into the output or the end of an illuminated fibre.</strong> Even brief exposure can cause eye damage. Always treat VFL light as hazardous.
              </p>
            </div>

            {/* Limitations */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2">VFL Limitations</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Limited range: typically 3-5km maximum, depends on fibre and fault type</li>
                <li>• Cannot measure loss—only indicates presence of faults</li>
                <li>• May not show faults through dark outer jackets</li>
                <li>• Cannot identify specific loss values at connections</li>
              </ul>
            </div>

            {/* Inline Check 1 */}
            <InlineCheck
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Section 02: Power Meter and Light Source */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Optical Power Meter and Light Source
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                The <strong className="text-white">optical power meter</strong> and <strong className="text-white">calibrated light source</strong> (or combined "loss test set") are essential for measuring insertion loss—the total optical power lost through a fibre link.
              </p>
            </div>

            {/* Test Equipment */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Core Test Equipment</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h5 className="text-elec-yellow font-medium mb-2 flex items-center gap-2">
                    <Radio className="w-4 h-4" />
                    Light Source
                  </h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Stable, calibrated output power</li>
                    <li>• Wavelengths: 850/1300nm (MM), 1310/1550nm (SM)</li>
                    <li>• LED or laser sources available</li>
                    <li>• Must match power meter wavelength</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h5 className="text-elec-yellow font-medium mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Power Meter
                  </h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Measures optical power in dBm</li>
                    <li>• Selectable wavelength calibration</li>
                    <li>• Typical range: +3 to -50 dBm</li>
                    <li>• Resolution: 0.01 dB typically</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Reference Methods */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Reference Setting Methods</h4>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-elec-yellow font-medium mb-2">1-Cord Reference (Most Common)</h5>
                  <p className="text-white/60 text-sm mb-2">Reference set with one test lead. Tests all connectors in the link including both end connections.</p>
                  <div className="bg-[#1a1a1a] p-2 rounded font-mono text-xs text-white/70">
                    [Source]—Test Lead—[Meter] = Reference
                  </div>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-elec-yellow font-medium mb-2">2-Cord Reference</h5>
                  <p className="text-white/60 text-sm mb-2">Reference set with both test leads connected. Tests link under test only, excluding end connections.</p>
                  <div className="bg-[#1a1a1a] p-2 rounded font-mono text-xs text-white/70">
                    [Source]—Lead A—adapter—Lead B—[Meter] = Reference
                  </div>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">3-Cord Reference</h5>
                  <p className="text-white/60 text-sm mb-2">Reference includes both test leads and an additional jumper. Most conservative method.</p>
                </div>
              </div>
            </div>

            {/* Loss Test Procedure */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-elec-yellow" />
                Loss Test Procedure
              </h4>
              <ol className="text-white/70 text-sm space-y-2">
                <li><span className="text-elec-yellow font-bold">1.</span> Allow equipment to stabilise (warm up ~5 minutes)</li>
                <li><span className="text-elec-yellow font-bold">2.</span> Clean all test lead connectors and verify with inspection scope</li>
                <li><span className="text-elec-yellow font-bold">3.</span> Connect test leads and set reference (zero the meter)</li>
                <li><span className="text-elec-yellow font-bold">4.</span> Connect link under test (clean all connectors first)</li>
                <li><span className="text-elec-yellow font-bold">5.</span> Record loss reading</li>
                <li><span className="text-elec-yellow font-bold">6.</span> Test at second wavelength if required</li>
                <li><span className="text-elec-yellow font-bold">7.</span> Test in reverse direction for bi-directional measurement</li>
              </ol>
            </div>
          </section>

          {/* Section 03: OTDR Introduction */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Optical Time Domain Reflectometer (OTDR)
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                An <strong className="text-white">OTDR</strong> is a sophisticated instrument that can characterise an entire fibre link from one end. It sends pulses of light down the fibre and analyses the returning light to create a graphical "trace" showing every event along the link.
              </p>
            </div>

            {/* How OTDR Works */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">How an OTDR Works</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Sends Pulses</h5>
                    <p className="text-white/60 text-sm">OTDR transmits short pulses of light down the fibre</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Rayleigh Backscatter</h5>
                    <p className="text-white/60 text-sm">Microscopic glass impurities scatter small amounts of light back continuously</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Fresnel Reflections</h5>
                    <p className="text-white/60 text-sm">Strong reflections occur at air gaps (connectors, breaks)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Time Analysis</h5>
                    <p className="text-white/60 text-sm">Return time converts to distance (knowing speed of light in fibre)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key OTDR Parameters */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Key OTDR Settings</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Parameter</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Effect</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Trade-off</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">Pulse Width</td>
                      <td className="py-2 px-3">Determines resolution vs range</td>
                      <td className="py-2 px-3 text-white/60">Shorter = better resolution, less range</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">Wavelength</td>
                      <td className="py-2 px-3">Selects test wavelength</td>
                      <td className="py-2 px-3 text-white/60">Match to application; 1625nm for bends</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">Range</td>
                      <td className="py-2 px-3">Sets maximum distance</td>
                      <td className="py-2 px-3 text-white/60">Set 1.5-2× expected link length</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">Averaging</td>
                      <td className="py-2 px-3">Reduces noise</td>
                      <td className="py-2 px-3 text-white/60">More averaging = cleaner trace, longer test</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-elec-yellow">IOR (Index)</td>
                      <td className="py-2 px-3">Distance calibration</td>
                      <td className="py-2 px-3 text-white/60">Must match fibre type for accuracy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 04: OTDR Trace Interpretation */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              OTDR Trace Interpretation
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Reading an OTDR trace is a critical skill. The trace shows distance (horizontal axis) versus return power level in dB (vertical axis). Different events have characteristic signatures.
              </p>
            </div>

            {/* Event Types */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Event Types on OTDR Traces</h4>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-8 bg-[#1a1a1a] rounded flex items-center justify-center">
                      <span className="text-elec-yellow text-xl">▲</span>
                    </div>
                    <h5 className="text-elec-yellow font-medium">Reflective Event (Connector)</h5>
                  </div>
                  <p className="text-white/60 text-sm">Sharp spike upward (reflection) followed by a step down (loss). Height indicates reflectance, step indicates insertion loss.</p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-8 bg-[#1a1a1a] rounded flex items-center justify-center">
                      <span className="text-blue-400 text-lg">↘</span>
                    </div>
                    <h5 className="text-blue-400 font-medium">Non-Reflective Event (Fusion Splice)</h5>
                  </div>
                  <p className="text-white/60 text-sm">Small step down with no spike. Loss only, no reflection. Typical for fusion splices and bends.</p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-8 bg-[#1a1a1a] rounded flex items-center justify-center">
                      <span className="text-green-400 text-lg">↗</span>
                    </div>
                    <h5 className="text-green-400 font-medium">Gainer Event</h5>
                  </div>
                  <p className="text-white/60 text-sm">Apparent step up (gain). Occurs at splices between fibres with different backscatter. Not real gain—artefact requiring bi-directional averaging.</p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-8 bg-[#1a1a1a] rounded flex items-center justify-center">
                      <span className="text-red-400 text-lg">▼</span>
                    </div>
                    <h5 className="text-red-400 font-medium">End of Fibre (Reflective)</h5>
                  </div>
                  <p className="text-white/60 text-sm">Large spike then drop to noise floor. Occurs at connectors, cleaved ends, or rough breaks at fibre end.</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-8 bg-[#1a1a1a] rounded flex items-center justify-center">
                      <span className="text-purple-400 text-lg">⏬</span>
                    </div>
                    <h5 className="text-purple-400 font-medium">End of Fibre (Non-Reflective)</h5>
                  </div>
                  <p className="text-white/60 text-sm">Sudden drop to noise floor with no spike. Indicates clean break or fibre immersed in index-matching material.</p>
                </div>
              </div>
            </div>

            {/* Inline Check 2 */}
            <InlineCheck
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 05: Dead Zones */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Understanding Dead Zones
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                <strong className="text-white">Dead zones</strong> are distances after a reflective event where the OTDR cannot accurately measure other events. Understanding dead zones is essential for proper test setup and interpretation.
              </p>
            </div>

            {/* Dead Zone Types */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Dead Zone Types</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                  <h5 className="text-amber-400 font-medium mb-2">Event Dead Zone</h5>
                  <p className="text-white/60 text-sm mb-2">Minimum distance to distinguish two separate reflective events.</p>
                  <p className="text-white/70 text-sm">Typical: 0.5-3m depending on pulse width</p>
                </div>
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">Attenuation Dead Zone</h5>
                  <p className="text-white/60 text-sm mb-2">Distance after reflection where non-reflective events can be measured.</p>
                  <p className="text-white/70 text-sm">Typical: 3-20m depending on pulse width</p>
                </div>
              </div>
            </div>

            {/* Launch Fibres */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-elec-yellow" />
                Launch and Receive Fibres
              </h4>
              <p className="text-white/70 text-sm mb-3">
                To properly test the first and last connectors of a link, use:
              </p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• <strong className="text-white">Launch fibre:</strong> 100-500m fibre between OTDR and link under test. Moves first connector outside dead zone.</li>
                <li>• <strong className="text-white">Receive fibre:</strong> Similar fibre at far end. Allows characterisation of last connector.</li>
                <li>• Launch/receive fibres must match the link fibre type (SM or MM, same core size).</li>
              </ul>
            </div>

            {/* Inline Check 3 */}
            <InlineCheck
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Section 06: Bi-directional Testing */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Bi-Directional Testing
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Because different fibres have different backscatter properties, splices between them can appear as gainers or show incorrect loss when measured from one direction. <strong className="text-white">Bi-directional testing and averaging</strong> reveals the true splice loss.
              </p>
            </div>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Bi-Directional Averaging</h4>
              <div className="bg-[#1a1a1a] p-4 rounded-lg font-mono text-sm mb-4">
                <p className="text-white/60 mb-2">Direction A→B: Splice appears as +0.2 dB (gainer)</p>
                <p className="text-white/60 mb-2">Direction B→A: Splice appears as -0.4 dB (loss)</p>
                <p className="text-elec-yellow mt-3">True Loss = (0.2 + 0.4) ÷ 2 = <strong>0.1 dB</strong></p>
              </div>
              <p className="text-white/60 text-sm">
                Many modern OTDRs can automatically perform bi-directional analysis when provided with traces from both directions.
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                When Bi-Directional Testing is Essential
              </h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Links with multiple splices between different cable types</li>
                <li>• Installation acceptance testing (certification)</li>
                <li>• When any event appears as a gainer</li>
                <li>• Long-haul links where accuracy is critical</li>
              </ul>
            </div>
          </section>

          {/* Testing Methodology */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Systematic Troubleshooting Approach
            </h2>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Troubleshooting Workflow</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1a1a1a] font-bold text-sm">1</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Verify Equipment</span>
                    <p className="text-white/60 text-sm">Confirm transceivers are powered and not faulty using known-good test equipment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1a1a1a] font-bold text-sm">2</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Inspect and Clean</span>
                    <p className="text-white/60 text-sm">Inspect all accessible connectors; clean and re-test before further investigation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1a1a1a] font-bold text-sm">3</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">VFL Check</span>
                    <p className="text-white/60 text-sm">Use VFL to verify continuity and identify obvious breaks or tight bends</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1a1a1a] font-bold text-sm">4</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Loss Measurement</span>
                    <p className="text-white/60 text-sm">Measure total loss with power meter; compare to specification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1a1a1a] font-bold text-sm">5</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">OTDR Analysis</span>
                    <p className="text-white/60 text-sm">If problem persists, use OTDR to locate and characterise specific faults</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1a1a1a] font-bold text-sm">6</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Document and Repair</span>
                    <p className="text-white/60 text-sm">Record findings, repair fault, re-test to confirm resolution</p>
                  </div>
                </div>
              </div>
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
                <BarChart3 className="w-6 h-6 text-elec-yellow" />
                Quick Reference: Tool Selection
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">VFL</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Continuity check</li>
                    <li>• Break location (&lt;5km)</li>
                    <li>• Tight bend detection</li>
                    <li>• Fibre identification</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Power Meter</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Total link loss</li>
                    <li>• Pass/fail certification</li>
                    <li>• Transmitter power check</li>
                    <li>• Quick verification</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">OTDR</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Fault location</li>
                    <li>• Individual event loss</li>
                    <li>• Link characterisation</li>
                    <li>• Documentation</li>
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
              to="/electrical-upskilling/fiber-optics-module-7-section-2"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#252525] text-white rounded-lg hover:bg-[#303030] transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Contamination and Cleaning
            </Link>
            <Link
              to="/electrical-upskilling/fiber-optics-module-7-section-4"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-elec-yellow text-[#1a1a1a] font-semibold rounded-lg hover:bg-elec-yellow/90 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              Next: Fibre Record-Keeping
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiberOpticsModule7Section3;
