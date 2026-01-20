import { ArrowLeft, AlertTriangle, Zap, CheckCircle, XCircle, BookOpen, Target, Search, Activity, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Fibre Faults and Symptoms - Fibre Optics Technology";
const DESCRIPTION = "Learn to identify and diagnose common fibre optic faults including macrobends, microbends, connector failures, splice problems, and cable damage with their characteristic symptoms.";

const quickCheckQuestions = [
  {
    question: "What is the minimum bend radius typically specified for standard singlemode fibre during installation?",
    options: [
      { text: "5mm", isCorrect: false },
      { text: "15mm (10× cable diameter)", isCorrect: true },
      { text: "50mm", isCorrect: false },
      { text: "100mm", isCorrect: false }
    ],
    explanation: "Standard singlemode fibre typically requires a minimum bend radius of 10-15× the cable outer diameter, usually around 15mm minimum. Bend-insensitive fibre (G.657) allows tighter bends down to 5-7.5mm."
  },
  {
    question: "Which wavelength is most affected by macrobend losses in singlemode fibre?",
    options: [
      { text: "850nm", isCorrect: false },
      { text: "1310nm", isCorrect: false },
      { text: "1550nm", isCorrect: true },
      { text: "All wavelengths equally", isCorrect: false }
    ],
    explanation: "Longer wavelengths (1550nm) are more sensitive to bend losses than shorter wavelengths (1310nm). This is why bend loss testing is often performed at 1550nm or 1625nm to detect potential problems."
  },
  {
    question: "What symptom typically indicates contaminated connector end-faces?",
    options: [
      { text: "Complete signal loss", isCorrect: false },
      { text: "High insertion loss and/or high reflectance", isCorrect: true },
      { text: "Modal dispersion", isCorrect: false },
      { text: "Chromatic dispersion", isCorrect: false }
    ],
    explanation: "Contaminated end-faces cause increased insertion loss (signal attenuation) and, particularly with APC connectors, increased reflectance (back-reflection). Severe contamination can cause complete failure."
  }
];

const quizQuestions = [
  {
    question: "What is the primary cause of macrobend loss in optical fibre?",
    options: [
      { text: "The fibre core becoming damaged", isCorrect: false },
      { text: "Light escaping the core due to angle changes exceeding critical angle", isCorrect: true },
      { text: "Chemical degradation of the cladding", isCorrect: false },
      { text: "Temperature changes in the fibre", isCorrect: false }
    ],
    explanation: "When fibre is bent too tightly, the angle at which light hits the core/cladding boundary can exceed the critical angle required for total internal reflection, causing light to escape into the cladding and be lost."
  },
  {
    question: "What distinguishes a microbend from a macrobend?",
    options: [
      { text: "Microbends occur only in singlemode fibre", isCorrect: false },
      { text: "Microbends are small, localised distortions along the fibre length", isCorrect: true },
      { text: "Microbends cause higher losses than macrobends", isCorrect: false },
      { text: "Microbends can be seen with the naked eye", isCorrect: false }
    ],
    explanation: "Microbends are small, localised axis deformations caused by pressure points, rough surfaces, or manufacturing defects. Unlike macrobends (visible curves), microbends are typically too small to see but cause cumulative loss."
  },
  {
    question: "What is the typical cause of high reflectance from a fibre connector?",
    options: [
      { text: "The connector is the wrong type for the fibre", isCorrect: false },
      { text: "Air gap between connector end-faces or contamination", isCorrect: true },
      { text: "The fibre is cracked inside the connector", isCorrect: false },
      { text: "Using APC connectors instead of UPC", isCorrect: false }
    ],
    explanation: "High reflectance is caused by air gaps between mated connectors (from contamination, damage, or incomplete seating) or from damaged/contaminated end-face surfaces that prevent proper physical contact."
  },
  {
    question: "What OTDR trace characteristic indicates a fusion splice?",
    options: [
      { text: "A large reflective peak", isCorrect: false },
      { text: "A small non-reflective loss event", isCorrect: true },
      { text: "A gain (gainer) in the trace", isCorrect: false },
      { text: "The end of the fibre", isCorrect: false }
    ],
    explanation: "Fusion splices appear as small loss events (typically 0.02-0.1 dB) with little or no reflectance because there is no air gap at the joint. Mechanical splices show similar loss but with more reflectance."
  },
  {
    question: "What symptom indicates stress on a fibre cable that may not have caused immediate failure?",
    options: [
      { text: "Higher loss at 1550nm compared to 1310nm", isCorrect: true },
      { text: "Lower loss at all wavelengths", isCorrect: false },
      { text: "Intermittent complete signal loss", isCorrect: false },
      { text: "Increased bandwidth", isCorrect: false }
    ],
    explanation: "Stressed fibre (from bending or crush) shows increased loss at longer wavelengths (1550nm, 1625nm) compared to shorter wavelengths. This wavelength-dependent loss is a key indicator of bend-related problems."
  },
  {
    question: "What type of damage is most likely if a fibre link shows intermittent failures that vary with temperature?",
    options: [
      { text: "Connector contamination", isCorrect: false },
      { text: "Fibre break", isCorrect: false },
      { text: "Poor splice or stress point that expands/contracts with temperature", isCorrect: true },
      { text: "Wrong fibre type installed", isCorrect: false }
    ],
    explanation: "Temperature-related intermittent faults often indicate stress points (tight bends, crush damage) or poor splices where thermal expansion and contraction causes the fault to appear and disappear."
  },
  {
    question: "What is 'fibre fatigue' and what causes it?",
    options: [
      { text: "Signal degradation from overuse", isCorrect: false },
      { text: "Gradual weakening of glass from sustained stress, leading to eventual fracture", isCorrect: true },
      { text: "Reduction in bandwidth over time", isCorrect: false },
      { text: "Chemical corrosion of the fibre coating", isCorrect: false }
    ],
    explanation: "Fibre fatigue is the slow growth of microscopic cracks in stressed glass fibre. Even stress below the immediate breaking point can cause gradual crack propagation, eventually leading to fibre breakage."
  },
  {
    question: "What causes a 'gainer' event on an OTDR trace?",
    options: [
      { text: "A signal amplifier in the link", isCorrect: false },
      { text: "Testing from one direction through a splice between different fibre types", isCorrect: true },
      { text: "A reflection from a highly polished connector", isCorrect: false },
      { text: "A measurement error in the OTDR", isCorrect: false }
    ],
    explanation: "A gainer (apparent gain) occurs when splicing fibres with different backscatter coefficients. Testing from the fibre with lower backscatter into higher backscatter fibre makes the splice appear to add power. Bi-directional averaging resolves this."
  },
  {
    question: "What type of connector damage causes the highest insertion loss?",
    options: [
      { text: "Minor scratches on the end-face", isCorrect: false },
      { text: "Chips or cracks across the fibre core", isCorrect: true },
      { text: "Dust on the ferrule body", isCorrect: false },
      { text: "Slight wear on the connector housing", isCorrect: false }
    ],
    explanation: "Damage to the fibre core area (chips, cracks, deep scratches across the core) causes the highest loss because it directly affects light transmission. Damage outside the core area has less impact."
  },
  {
    question: "What is the most common cause of fibre optic link failures?",
    options: [
      { text: "Fibre breaks from age", isCorrect: false },
      { text: "Connector contamination", isCorrect: true },
      { text: "Faulty transceivers", isCorrect: false },
      { text: "Water ingress to cables", isCorrect: false }
    ],
    explanation: "Industry studies consistently show that connector contamination is the leading cause of fibre link problems. Proper cleaning and inspection practices prevent the majority of field failures."
  }
];

const faqs = [
  {
    question: "How can I tell if a fault is in the fibre or the equipment?",
    answer: "Use a visual fault locator (VFL) or light source to verify the fibre path is continuous. Then swap transceivers or use known-good equipment at each end. If the problem persists with different equipment, the fault is in the cabling. An OTDR can pinpoint the exact location of fibre faults."
  },
  {
    question: "Why does my link work sometimes but not others?",
    answer: "Intermittent faults are often caused by: contaminated connectors that vary with mating pressure; loose connections that shift with vibration or temperature; stressed fibre at a bend or crush point that changes with temperature; or damaged connectors with poor alignment. Systematic testing under different conditions helps identify the cause."
  },
  {
    question: "What's the difference between insertion loss and return loss?",
    answer: "Insertion loss (IL) measures how much optical power is lost passing through a connector or component (expressed in dB, lower is better). Return loss (RL) measures how much light is reflected back towards the source (expressed in dB, higher is better). Both affect link performance."
  },
  {
    question: "Can a fibre be repaired if it's broken?",
    answer: "Yes, a broken fibre can be repaired using fusion splicing. The break point is cut back to clean fibre on each side, the ends are cleaved, and then fusion spliced. A good fusion splice adds only 0.02-0.1 dB loss. For permanent repairs, splice enclosures protect the joint."
  },
  {
    question: "Why is bend loss worse at 1550nm than 1310nm?",
    answer: "Longer wavelengths have a larger mode field diameter (the area where light travels in the fibre). This makes them more sensitive to bends because more of the light is travelling closer to the core/cladding boundary where it can escape during bends."
  },
  {
    question: "What causes fibre to 'go dark' suddenly after working for years?",
    answer: "Sudden failures after long service are often caused by: accumulated stress finally breaking the fibre (fatigue failure); environmental damage (water, rodents, dig-ups); connector degradation from repeated mating cycles; or thermal stress from temperature extremes. OTDR testing reveals the failure location and type."
  }
];

const FiberOpticsModule7Section1 = () => {
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
          <span className="text-white/50 text-sm">Section 1 of 5</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="px-4 pt-8 pb-6 bg-gradient-to-b from-[#1a1a1a] to-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-elec-yellow/20 text-elec-yellow text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            MODULE 7 · SECTION 1
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Common Fibre Faults and Symptoms
          </h1>
          <p className="text-white/70 text-lg">
            Recognise the signs of fibre problems and understand their root causes
          </p>
        </div>
      </div>

      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Quick Summary Boxes */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <AlertTriangle className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Fault Types</h3>
              <p className="text-white/60 text-xs">Bends, breaks, contamination, splices</p>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <Search className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Diagnosis</h3>
              <p className="text-white/60 text-xs">Symptoms, testing, and root cause analysis</p>
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
                "Identify the common types of fibre optic faults and their causes",
                "Recognise symptoms that indicate specific fault types",
                "Understand how macrobends and microbends affect optical signals",
                "Diagnose connector and splice failures from test results",
                "Apply systematic troubleshooting approaches to fibre problems"
              ].map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 01: Overview of Fibre Faults */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Overview of Fibre Faults
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Fibre optic faults fall into several categories, each with characteristic symptoms and causes. Understanding these categories helps you diagnose problems quickly and accurately.
              </p>
            </div>

            {/* Fault Categories */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Main Fault Categories</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Complete Breaks</h5>
                    <p className="text-white/60 text-sm">Total signal loss - fibre is physically severed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Bend Losses</h5>
                    <p className="text-white/60 text-sm">Increased attenuation from macrobends or microbends</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Connector Problems</h5>
                    <p className="text-white/60 text-sm">Contamination, damage, or poor mating causing loss</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Splice Failures</h5>
                    <p className="text-white/60 text-sm">Poor fusion splices, failed mechanical splices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Cable Damage</h5>
                    <p className="text-white/60 text-sm">Crush, impact, water ingress, rodent damage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Concept Box */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-elec-yellow" />
                The Number One Cause
              </h4>
              <p className="text-white/70 text-sm">
                <strong className="text-white">Connector contamination</strong> is consistently identified as the leading cause of fibre optic link problems. Proper inspection and cleaning practices prevent the majority of field failures.
              </p>
            </div>
          </section>

          {/* Section 02: Macrobend Losses */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Macrobend Losses
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                <strong className="text-white">Macrobends</strong> are visible bends in the fibre that exceed the minimum bend radius. When fibre is bent too sharply, light escapes from the core because the angle of incidence exceeds the critical angle for total internal reflection.
              </p>
            </div>

            {/* How Macrobends Work */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">How Macrobend Loss Occurs</h4>
              <div className="bg-[#1a1a1a] p-4 rounded-lg mb-4">
                <p className="text-white/60 text-sm text-center mb-2">Light Ray Behaviour at a Bend</p>
                <div className="font-mono text-sm text-white/80 text-center">
                  <p>Normal fibre: Light reflects at core/cladding boundary</p>
                  <p className="text-white/40 my-2">↓</p>
                  <p>Tight bend: Angle becomes too steep</p>
                  <p className="text-white/40 my-2">↓</p>
                  <p className="text-red-400">Light escapes into cladding → LOSS</p>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                The minimum bend radius depends on fibre type, wavelength, and whether the bend is during installation (can be tighter) or long-term (must be larger to prevent fatigue).
              </p>
            </div>

            {/* Bend Radius Requirements */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Typical Minimum Bend Radii</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Fibre Type</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">Installation</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">Long-term</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Standard SM (G.652)</td>
                      <td className="py-2 px-3 text-center">30mm</td>
                      <td className="py-2 px-3 text-center">15-25mm</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Bend-insensitive SM (G.657.A1)</td>
                      <td className="py-2 px-3 text-center">15mm</td>
                      <td className="py-2 px-3 text-center">10mm</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Bend-insensitive SM (G.657.B3)</td>
                      <td className="py-2 px-3 text-center">10mm</td>
                      <td className="py-2 px-3 text-center text-elec-yellow">5mm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Multimode (OM3/OM4)</td>
                      <td className="py-2 px-3 text-center">30mm</td>
                      <td className="py-2 px-3 text-center">15mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Common Causes */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Common Causes of Macrobends
              </h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Tight bends behind patch panels or in cabinets</li>
                <li>• Fibre routed around sharp corners without proper radius formers</li>
                <li>• Cable ties or clips crushing the cable into tight bends</li>
                <li>• Excess fibre coiled too tightly in splice enclosures</li>
                <li>• Improper cable pulling techniques during installation</li>
              </ul>
            </div>

            {/* Inline Check 1 */}
            <InlineCheck
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Section 03: Microbend Losses */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Microbend Losses
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                <strong className="text-white">Microbends</strong> are small, localised deformations of the fibre axis that are typically invisible to the naked eye. They cause loss by coupling light from guided modes into cladding modes that are lost.
              </p>
            </div>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Characteristics of Microbends</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Small axial displacements (micrometres) along the fibre</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Typically not visible—detected by loss measurements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Cumulative effect—many small bends add up</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Can appear distributed on OTDR traces (increased slope)</span>
                </li>
              </ul>
            </div>

            {/* Causes of Microbends */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Common Causes of Microbends</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-elec-yellow font-medium text-sm">Installation Issues</h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Over-tightened cable ties</li>
                    <li>• Fibre trapped under other cables</li>
                    <li>• Rough surfaces in conduit</li>
                    <li>• Improper cable support</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="text-elec-yellow font-medium text-sm">Environmental Factors</h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Thermal expansion/contraction</li>
                    <li>• External pressure on cables</li>
                    <li>• Moisture causing jacket shrinkage</li>
                    <li>• Cable crushing over time</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Wavelength Sensitivity */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Wavelength Sensitivity
              </h4>
              <p className="text-white/70 text-sm">
                Both macrobends and microbends cause greater loss at longer wavelengths (1550nm, 1625nm) than shorter wavelengths (1310nm). This wavelength-dependent behaviour is a key diagnostic indicator. If a link shows significantly higher loss at 1550nm than 1310nm, suspect bend-related problems.
              </p>
            </div>

            {/* Inline Check 2 */}
            <InlineCheck
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 04: Connector Faults */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Connector Faults
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Connectors are the most vulnerable points in a fibre link because they expose the fibre end-face to contamination and mechanical damage. Understanding connector failure modes helps prevent and diagnose problems.
              </p>
            </div>

            {/* Connector Fault Types */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Types of Connector Faults</h4>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-red-400 font-medium mb-2">Contamination</h5>
                  <p className="text-white/60 text-sm mb-2">Dust, oils, fingerprints, cleaning residue on end-face</p>
                  <p className="text-white/70 text-sm"><strong>Symptoms:</strong> Elevated insertion loss, high reflectance, intermittent failures</p>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-red-400 font-medium mb-2">Scratches and Damage</h5>
                  <p className="text-white/60 text-sm mb-2">Scratches, chips, cracks, or pits on end-face surface</p>
                  <p className="text-white/70 text-sm"><strong>Symptoms:</strong> High loss (especially if across core), high reflectance, link failure</p>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-red-400 font-medium mb-2">Physical Contact Failure</h5>
                  <p className="text-white/60 text-sm mb-2">Connectors not fully seated, worn springs, damaged ferrules</p>
                  <p className="text-white/70 text-sm"><strong>Symptoms:</strong> Very high reflectance (air gap), intermittent loss</p>
                </div>
                <div className="pb-2">
                  <h5 className="text-red-400 font-medium mb-2">Fibre Protrusion or Recession</h5>
                  <p className="text-white/60 text-sm mb-2">Fibre extending past ferrule (protrusion) or recessed below surface</p>
                  <p className="text-white/70 text-sm"><strong>Symptoms:</strong> Damage to mating connector, high loss, contamination trapping</p>
                </div>
              </div>
            </div>

            {/* End-Face Zones */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">End-Face Inspection Zones (IEC 61300-3-35)</h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/30">
                  <div className="text-red-400 font-bold mb-1">Core</div>
                  <div className="text-white/60 text-xs">0-25µm SM</div>
                  <div className="text-white/60 text-xs">0-65µm MM</div>
                  <div className="text-white/80 text-xs mt-2">No defects allowed</div>
                </div>
                <div className="bg-amber-500/20 p-3 rounded-lg border border-amber-500/30">
                  <div className="text-amber-400 font-bold mb-1">Cladding</div>
                  <div className="text-white/60 text-xs">25-120µm SM</div>
                  <div className="text-white/60 text-xs">65-120µm MM</div>
                  <div className="text-white/80 text-xs mt-2">Limited defects OK</div>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
                  <div className="text-green-400 font-bold mb-1">Contact</div>
                  <div className="text-white/60 text-xs">120-250µm</div>
                  <div className="text-white/60 text-xs">(ferrule area)</div>
                  <div className="text-white/80 text-xs mt-2">Scratches acceptable</div>
                </div>
              </div>
            </div>

            {/* Inline Check 3 */}
            <InlineCheck
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Section 05: Splice Faults */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Splice Faults
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Splices (both fusion and mechanical) can fail due to poor execution, environmental stress, or equipment problems. Understanding splice failure modes helps diagnose issues and prevent future problems.
              </p>
            </div>

            {/* Fusion Splice Problems */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Fusion Splice Failure Causes</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Problem</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Cause</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Result</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Poor cleave quality</td>
                      <td className="py-2 px-3 text-white/60">Dirty/worn cleaver blade</td>
                      <td className="py-2 px-3 text-white/60">High loss splice</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Contamination</td>
                      <td className="py-2 px-3 text-white/60">Dirt on fibre end-face</td>
                      <td className="py-2 px-3 text-white/60">Air bubbles, weak joint</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Core misalignment</td>
                      <td className="py-2 px-3 text-white/60">Splicer alignment failure</td>
                      <td className="py-2 px-3 text-white/60">High loss</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Weak splice</td>
                      <td className="py-2 px-3 text-white/60">Wrong arc parameters</td>
                      <td className="py-2 px-3 text-white/60">Breaks under stress</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Excess arc current</td>
                      <td className="py-2 px-3 text-white/60">Burnt/thinned fibre</td>
                      <td className="py-2 px-3 text-white/60">Weak, potentially high loss</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mechanical Splice Problems */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Mechanical Splice Issues</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Index matching gel degradation</span>
                    <p className="text-white/60 text-sm">Gel can dry out or degrade over time, increasing loss and reflectance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Fibre pullout</span>
                    <p className="text-white/60 text-sm">Insufficient clamping allows fibre to pull free under tension</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Contamination</span>
                    <p className="text-white/60 text-sm">Dirt trapped in splice during assembly causes loss</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 06: Cable Damage */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Cable Damage Types
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Fibre cables can suffer various types of physical damage that affect optical performance. Recognising damage types helps determine the appropriate repair approach.
              </p>
            </div>

            {/* Damage Types */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Physical Damage Categories</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-sm">💥</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Crushing</h5>
                    <p className="text-white/60 text-sm">Heavy objects on cable, over-tightened ties, vehicle damage. Causes microbends and potentially breaks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-sm">💧</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Water Ingress</h5>
                    <p className="text-white/60 text-sm">Moisture entering through jacket damage. Causes hydrogen absorption loss, freezing damage, and fibre weakening.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-400 text-sm">🔥</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Thermal Damage</h5>
                    <p className="text-white/60 text-sm">Exposure to heat sources, fire damage. Causes jacket melting, fibre stress, and potential breaks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-sm">🐭</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Rodent Damage</h5>
                    <p className="text-white/60 text-sm">Gnawing through cable sheath and elements. Common in outdoor and underground installations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 text-sm">⚡</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Lightning/Electrical</h5>
                    <p className="text-white/60 text-sm">Armoured cables can conduct lightning strikes. Damages metallic elements and can shatter fibre.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fibre Fatigue */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Fibre Fatigue - The Silent Killer
              </h4>
              <p className="text-white/70 text-sm">
                <strong className="text-white">Static fatigue</strong> is the slow growth of microscopic cracks in glass fibre under sustained stress. Even stress well below the immediate breaking point can cause gradual weakening over months or years, eventually resulting in sudden fibre failure. This is why proper bend radius and cable support are critical for long-term reliability.
              </p>
            </div>
          </section>

          {/* Symptom Diagnosis Guide */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Symptom Diagnosis Guide
            </h2>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Quick Diagnostic Reference</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Symptom</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Likely Cause</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">First Check</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Complete signal loss</td>
                      <td className="py-2 px-3 text-white/60">Break, connector disconnected</td>
                      <td className="py-2 px-3 text-white/60">VFL to locate break</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">High loss, normal reflectance</td>
                      <td className="py-2 px-3 text-white/60">Bend, bad splice, damaged fibre</td>
                      <td className="py-2 px-3 text-white/60">OTDR to locate event</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">High loss, high reflectance</td>
                      <td className="py-2 px-3 text-white/60">Contaminated/damaged connector</td>
                      <td className="py-2 px-3 text-white/60">Inspect and clean connectors</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Higher loss at 1550nm vs 1310nm</td>
                      <td className="py-2 px-3 text-white/60">Bend or stress</td>
                      <td className="py-2 px-3 text-white/60">Check cable routing</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Intermittent failures</td>
                      <td className="py-2 px-3 text-white/60">Loose connector, stress point</td>
                      <td className="py-2 px-3 text-white/60">Check all connections</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Temperature-related failures</td>
                      <td className="py-2 px-3 text-white/60">Thermal stress, poor splice</td>
                      <td className="py-2 px-3 text-white/60">Test at different temps</td>
                    </tr>
                  </tbody>
                </table>
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
                <AlertTriangle className="w-6 h-6 text-elec-yellow" />
                Quick Reference: Fault Indicators
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Bend-Related</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Loss increases at longer wavelengths</li>
                    <li>• OTDR shows loss event at bend point</li>
                    <li>• VFL shows light leakage</li>
                    <li>• Temperature affects loss level</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Connector-Related</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• High reflectance (&lt;35 dB UPC)</li>
                    <li>• Visible contamination on inspection</li>
                    <li>• Loss reduces after cleaning</li>
                    <li>• Intermittent with handling</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Section 1 Knowledge Check"
              questions={quizQuestions}
              passingScore={80}
            />
          </section>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
            <Link
              to="/electrical-upskilling/fiber-optics-module-7"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#252525] text-white rounded-lg hover:bg-[#303030] transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Module 7
            </Link>
            <Link
              to="/electrical-upskilling/fiber-optics-module-7-section-2"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-elec-yellow text-[#1a1a1a] font-semibold rounded-lg hover:bg-elec-yellow/90 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              Next: Contamination and Cleaning
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiberOpticsModule7Section1;
