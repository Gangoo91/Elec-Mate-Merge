import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Activity, AlertTriangle, BarChart3, GitCompare, Wrench, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Interpreting Test Results - Fiber Optics Technology";
const DESCRIPTION = "Learn how to interpret fibre optic test results including dB/dBm units, OTDR event analysis, fault signatures, bidirectional testing, and remediation decisions.";

const quickCheckQuestions = [
  {
    id: "interpret-qc1",
    question: "What does a reading of -15 dBm represent?",
    options: [
      "15 dB of loss",
      "An absolute power level of 0.0316 mW",
      "A gain of 15 dB",
      "15 milliwatts of power"
    ],
    correctIndex: 1,
    explanation: "dBm is an absolute power measurement referenced to 1 mW. -15 dBm equals 10^(-15/10) = 0.0316 mW. Unlike dB (relative), dBm tells you the actual power level."
  },
  {
    id: "interpret-qc2",
    question: "An OTDR trace shows a large reflective spike followed by a drop to noise floor. What does this indicate?",
    options: [
      "A fusion splice",
      "A macrobend",
      "A broken fibre or open connector (end of fibre)",
      "A dirty connector with high loss"
    ],
    correctIndex: 2,
    explanation: "A large reflective spike followed by the signal dropping to the noise floor is the signature of a fibre break or unterminated end - the Fresnel reflection from the glass-to-air interface followed by no more fibre to measure."
  },
  {
    id: "interpret-qc3",
    question: "When should you retest rather than immediately repair a suspected fault?",
    options: [
      "Never - always repair first",
      "When the fault reading is marginal and could be due to test setup issues",
      "Only on multimode fibre",
      "Only if the customer requests it"
    ],
    correctIndex: 1,
    explanation: "Marginal readings near pass/fail thresholds may be caused by dirty reference cables, poor launch conditions, or temperature variations. Recleaning and retesting from both directions can confirm whether the issue is real before committing to repair work."
  }
];

const quizQuestions = [
  {
    question: "What is the relationship between dB and dBm?",
    options: [
      "They are the same measurement",
      "dB measures relative change, dBm measures absolute power referenced to 1 mW",
      "dBm measures relative change, dB measures absolute power",
      "dB is for multimode, dBm is for singlemode"
    ],
    correctAnswer: 1
  },
  {
    question: "A connector shows 0.8 dB loss on OTDR. What is the likely cause?",
    options: [
      "Normal performance for mechanical splice",
      "Contaminated or poorly mated connector requiring cleaning",
      "Expected value for fusion splice",
      "Normal value for all connectors"
    ],
    correctAnswer: 1
  },
  {
    question: "What signature indicates a macrobend on an OTDR trace?",
    options: [
      "Large reflective spike",
      "Non-reflective loss event with no physical connection at that point",
      "Gain event",
      "End-of-fibre reflection"
    ],
    correctAnswer: 1
  },
  {
    question: "Why is bidirectional OTDR testing important?",
    options: [
      "It's faster than single-direction",
      "It averages out measurement variations and accurately characterises splice loss",
      "It only matters for multimode fibre",
      "It's required by law"
    ],
    correctAnswer: 1
  },
  {
    question: "An OTDR shows 0.15 dB gain at a splice. What causes this?",
    options: [
      "The splice is amplifying the signal",
      "Measurement artifact due to different fibre mode field diameters",
      "Faulty OTDR equipment",
      "Reflection from dirty connector"
    ],
    correctAnswer: 1
  },
  {
    question: "How should insertion loss test results compare with OTDR total link loss?",
    options: [
      "They should never be compared",
      "OTDR should always show higher loss",
      "They should agree within approximately 0.5 dB for a healthy link",
      "Insertion loss is always exactly double OTDR loss"
    ],
    correctAnswer: 2
  },
  {
    question: "What is a typical acceptable loss for a quality fusion splice?",
    options: [
      "Less than 1.0 dB",
      "Less than 0.1 dB",
      "Exactly 0 dB",
      "Between 0.5-1.0 dB"
    ],
    correctAnswer: 1
  },
  {
    question: "When interpreting results, what does ORL (Optical Return Loss) measure?",
    options: [
      "Total loss through the link",
      "Reflections returning back toward the source",
      "Power at the receiver",
      "Distance to the first connector"
    ],
    correctAnswer: 1
  },
  {
    question: "A link shows 8 dB total loss with a budget of 7 dB. What should you do first?",
    options: [
      "Replace the entire cable",
      "Clean all connectors and retest to confirm the reading",
      "Add an amplifier",
      "Accept the failure and document"
    ],
    correctAnswer: 1
  },
  {
    question: "What distinguishes a high-loss splice from a dirty connector on OTDR?",
    options: [
      "They look identical",
      "High-loss splice is non-reflective; dirty connector typically shows both loss and reflection",
      "Dirty connector shows no loss",
      "High-loss splice always shows reflection"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Why do my OTDR readings differ when testing from opposite ends?",
    answer: "OTDR measures backscatter, which depends on fibre characteristics. If fibres on either side of a splice have different mode field diameters or backscatter coefficients, the splice can appear as a loss from one direction and a gain from the other. Bidirectional testing and averaging gives the true splice loss. This is normal behaviour, not equipment error."
  },
  {
    question: "How accurate are OTDR loss measurements compared to insertion loss testing?",
    answer: "Insertion loss testing with a calibrated source and power meter is generally more accurate for total link loss measurement (+/- 0.1 dB typical). OTDR is better for locating faults and characterising individual events but may have +/- 0.2-0.5 dB uncertainty on individual event measurements. Use both methods together for comprehensive testing."
  },
  {
    question: "What if my test results are right at the pass/fail threshold?",
    answer: "Marginal results warrant additional investigation. First, clean all connectors and reference cables, then retest. Test from both directions and average if using OTDR. Check your test setup and reference method. If results remain marginal after careful retesting, consider environmental factors (temperature) and whether the link will have margin for ageing and future connections."
  },
  {
    question: "Can temperature affect my test results?",
    answer: "Yes. Fibre loss increases slightly at low temperatures, and macrobend loss can increase significantly in cold conditions. OTDR equipment may need time to stabilise in extreme temperatures. For certification testing, note the ambient temperature. Significant changes between installation and operation conditions should be considered in your loss budget."
  },
  {
    question: "How do I know if a high reading is a real problem or a test equipment issue?",
    answer: "Verify by: 1) Cleaning and retesting, 2) Testing from both directions, 3) Using known-good reference cables, 4) Checking your test equipment calibration, 5) Testing a known-good link to verify equipment operation. If the issue persists after all verification steps, it's likely a real problem requiring investigation or repair."
  },
  {
    question: "What causes ghost reflections on OTDR traces?",
    answer: "Ghosts appear when strong reflections bounce multiple times between highly reflective events. They show up at distances that are multiples of the actual event location. Ghosts can be identified because they occur at exact distance multiples and often show higher loss than expected. Reducing reflection by cleaning connectors or using APC connectors minimises ghosts."
  }
];

const FiberOpticsModule5Section4 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
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
          <span className="text-xs text-white/40 hidden sm:block">Section 4 of 6</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-4xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <CheckCircle className="w-4 h-4" />
            Module 5 · Section 4
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Interpreting Test Results
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl p-5 border border-purple-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Understanding test results is crucial for making informed decisions about fibre links.
            Learn to interpret dB and dBm measurements, analyse OTDR event tables, identify fault
            signatures like high-loss splices and dirty connectors, and determine when cleaning
            and retesting is sufficient versus when repair is necessary.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-5 border border-indigo-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-indigo-400 mb-2">Key Measurements</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• dB - relative loss/gain</li>
                <li>• dBm - absolute power level</li>
                <li>• ORL - return loss quality</li>
                <li>• Event loss - individual points</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-purple-400 mb-2">Decision Points</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Pass/fail against budget</li>
                <li>• Clean and retest first</li>
                <li>• Identify fault type</li>
                <li>• Repair vs accept</li>
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
              "Understanding dB and dBm units",
              "Analysing OTDR event tables",
              "Identifying problem signatures",
              "Comparing bidirectional results",
              "Correlating OTDR with insertion loss",
              "When to retest vs when to repair"
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

        {/* Section 1: Understanding dB and dBm Units */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">Understanding dB and dBm Units</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Fibre optic measurements use logarithmic units that can confuse newcomers. Understanding
              the difference between dB (relative) and dBm (absolute) is fundamental to interpreting
              all test results correctly.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                dB - Decibels (Relative Measurement)
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Definition:</strong> Ratio between two power levels, expressed logarithmically</li>
                <li><strong>Formula:</strong> dB = 10 × log₁₀(P₂/P₁)</li>
                <li><strong>Use:</strong> Measuring loss or gain between points</li>
                <li><strong>Examples:</strong> 3 dB loss = half power, 10 dB loss = 1/10 power</li>
                <li><strong>No reference:</strong> Always compares two values (before/after)</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                dBm - Decibels Referenced to 1 Milliwatt (Absolute)
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Definition:</strong> Absolute power level referenced to 1 mW</li>
                <li><strong>Formula:</strong> dBm = 10 × log₁₀(Power in mW / 1 mW)</li>
                <li><strong>Use:</strong> Measuring actual transmit or receive power</li>
                <li><strong>Examples:</strong> 0 dBm = 1 mW, -10 dBm = 0.1 mW, -20 dBm = 0.01 mW</li>
                <li><strong>Fixed reference:</strong> Always tells you actual power level</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Practical Relationship</h4>
              <div className="space-y-2 text-sm text-white/70">
                <p>
                  <strong>Key insight:</strong> If a transmitter outputs -3 dBm and the link has 12 dB loss,
                  the receiver sees -3 dBm - 12 dB = -15 dBm.
                </p>
                <p>
                  dBm (absolute) minus dB (loss) = dBm (absolute). You can subtract dB from dBm to get
                  the resulting power level. This is the basis of link budget calculations.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-purple-400 mb-2">Common dB Values</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• 0.1 dB - Good fusion splice</li>
                  <li>• 0.3 dB - Typical connector loss</li>
                  <li>• 0.5 dB - Maximum connector spec</li>
                  <li>• 3 dB - Half power (significant)</li>
                  <li>• 10 dB - 90% power lost</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-indigo-400 mb-2">Common dBm Values</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• 0 dBm - 1 mW (high power)</li>
                  <li>• -3 dBm - Typical SFP output</li>
                  <li>• -10 dBm - Strong signal</li>
                  <li>• -20 dBm - Moderate signal</li>
                  <li>• -30 dBm - Near sensitivity limit</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Analyzing OTDR Event Tables */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Analysing OTDR Event Tables</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              OTDR instruments automatically detect events (connectors, splices, bends, breaks) and
              present them in an event table. Understanding how to read this table is essential for
              quick fault diagnosis.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Event Table Columns</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Event #:</strong> Sequential number for each detected event</li>
                <li><strong>Distance:</strong> Location from OTDR (in metres or km)</li>
                <li><strong>Event Type:</strong> Reflective, non-reflective, or end</li>
                <li><strong>Loss (dB):</strong> Signal loss at this event</li>
                <li><strong>Reflectance (dB):</strong> Amount of light reflected back</li>
                <li><strong>Cumulative Loss:</strong> Total loss up to this point</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Event Types Explained</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-indigo-400 font-medium">Reflective Events</p>
                  <p className="text-white/60">Show both loss and reflection - typically connectors, mechanical splices, or breaks. The spike on the trace indicates reflection.</p>
                </div>
                <div>
                  <p className="text-purple-400 font-medium">Non-Reflective Events</p>
                  <p className="text-white/60">Show loss without reflection - typically fusion splices, macrobends, or fibre transitions. No spike, just a step down in the trace.</p>
                </div>
                <div>
                  <p className="text-pink-400 font-medium">End Event</p>
                  <p className="text-white/60">Large reflection followed by drop to noise floor - indicates fibre end, break, or open connector.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Reading the Trace Graphically</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Slope:</strong> Gradual downward slope = normal fibre attenuation</li>
                <li><strong>Spikes upward:</strong> Reflections from connectors or breaks</li>
                <li><strong>Steps downward:</strong> Loss events (splices, bends, connectors)</li>
                <li><strong>Noise floor:</strong> Bottom of trace where signal is lost</li>
                <li><strong>Dead zone:</strong> Blind region after strong reflections</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Distance Accuracy</h4>
              <p className="text-sm text-white/80">
                OTDR distance depends on the refractive index (IOR) setting matching your fibre.
                Typical singlemode IOR is 1.4677 at 1310nm. Incorrect IOR causes distance errors.
                Always verify IOR matches the fibre specification for accurate fault location.
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

        {/* Section 3: Identifying Problem Signatures */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">Identifying Problem Signatures</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Different faults produce distinctive signatures on OTDR traces. Learning to recognise
              these patterns allows rapid diagnosis and targeted repair strategies.
            </p>

            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                High-Loss Splice Signature
              </h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><strong>Appearance:</strong> Non-reflective step down greater than 0.1-0.2 dB</li>
                <li><strong>Cause:</strong> Poor fusion splice - misalignment, contamination, or fibre mismatch</li>
                <li><strong>Diagnosis:</strong> Loss exceeds typical 0.05-0.1 dB for good fusion splice</li>
                <li><strong>Action:</strong> May require re-splicing if loss exceeds specification</li>
              </ul>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Dirty or Damaged Connector Signature
              </h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><strong>Appearance:</strong> Reflective spike with high loss (greater than 0.5 dB)</li>
                <li><strong>Reflectance:</strong> May show poor reflectance (less negative than -35 dB)</li>
                <li><strong>Cause:</strong> Contamination, scratched end face, or poor mating</li>
                <li><strong>Action:</strong> Clean connector and retest before considering replacement</li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
              <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Macrobend Signature
              </h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><strong>Appearance:</strong> Non-reflective loss at unexpected location (no splice or connector)</li>
                <li><strong>Characteristic:</strong> Often higher loss at 1550nm than 1310nm</li>
                <li><strong>Cause:</strong> Cable bent too tightly, cable tie over-tightened, or cable crushed</li>
                <li><strong>Action:</strong> Locate physical position and relieve the bend stress</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Fibre Break Signature</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Appearance:</strong> Large reflective spike followed by immediate drop to noise floor</li>
                <li><strong>Reflectance:</strong> Very high reflection (Fresnel reflection from glass-air)</li>
                <li><strong>Cause:</strong> Complete fibre break, cable cut, or unterminated fibre end</li>
                <li><strong>Action:</strong> Locate and repair break or install new termination</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-2">Good Event Values</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Fusion splice: less than 0.1 dB</li>
                  <li>• Connector: less than 0.5 dB</li>
                  <li>• Connector reflectance: less than -35 dB</li>
                  <li>• Fibre attenuation: matches spec</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-red-400 mb-2">Problem Values</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Splice: greater than 0.2 dB</li>
                  <li>• Connector: greater than 0.75 dB</li>
                  <li>• Poor reflectance: greater than -25 dB</li>
                  <li>• Unexpected loss locations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Comparing Bidirectional Results */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">Comparing Bidirectional Results</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Testing from both ends of a fibre link is essential for accurate loss measurement. OTDR
              measurements can vary significantly depending on direction due to fibre characteristics.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-purple-400" />
                Why Bidirectional Testing Matters
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Mode field diameter differences:</strong> Splices between fibres with different MFDs appear as loss in one direction and gain in the other</li>
                <li><strong>Backscatter coefficient variation:</strong> Different fibres reflect different amounts of light back to the OTDR</li>
                <li><strong>True loss calculation:</strong> Average of both directions gives accurate splice/event loss</li>
                <li><strong>Dead zone compensation:</strong> Events hidden by dead zones from one end may be visible from the other</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Bidirectional Averaging</h4>
              <div className="space-y-2 text-sm text-white/70">
                <p>
                  <strong>Formula:</strong> True Loss = (Loss A→B + Loss B→A) / 2
                </p>
                <p>
                  Example: A splice shows 0.15 dB loss from End A and 0.05 dB "gain" from End B.
                  True splice loss = (0.15 + (-0.05)) / 2 = 0.05 dB.
                </p>
                <p>
                  Modern OTDR software can automatically merge bidirectional traces and calculate
                  averaged event values.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Understanding "Gainers"</h4>
              <p className="text-sm text-white/70 mb-3">
                An OTDR cannot detect actual optical gain - fibres don't amplify light. An apparent
                "gain" event is a measurement artifact caused by:
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>Larger MFD on far side:</strong> More backscatter after the event makes it appear brighter</li>
                <li><strong>Higher backscatter coefficient:</strong> Different fibre type or manufacturer</li>
                <li><strong>Always investigate:</strong> A gainer from one direction means higher-than-shown loss from the other</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Certification Requirement</h4>
              <p className="text-sm text-white/80">
                Industry standards including ISO/IEC 14763-3 and TIA-568 require bidirectional OTDR
                testing for certification. This ensures accurate characterisation of all events.
                Always test from both ends and report averaged values for professional certification.
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

        {/* Section 5: Correlating OTDR with Insertion Loss Tests */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Correlating OTDR with Insertion Loss Tests</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              OTDR and insertion loss (IL) testing serve different purposes but should correlate
              on a healthy link. Understanding both methods and cross-checking results provides
              confidence in your measurements.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Comparison of Methods</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-purple-400 font-medium mb-2">OTDR Testing</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Single-ended measurement</li>
                    <li>• Shows individual event losses</li>
                    <li>• Provides distance to faults</li>
                    <li>• Uses backscatter analysis</li>
                    <li>• Accuracy: +/- 0.2-0.5 dB typical</li>
                  </ul>
                </div>
                <div>
                  <p className="text-indigo-400 font-medium mb-2">Insertion Loss Testing</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• End-to-end measurement</li>
                    <li>• Shows total link loss only</li>
                    <li>• No fault location capability</li>
                    <li>• Direct power measurement</li>
                    <li>• Accuracy: +/- 0.1 dB typical</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Expected Correlation</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Total OTDR loss (sum of all events plus fibre loss) should match insertion loss within approximately 0.5 dB</li>
                <li>• Larger discrepancies indicate measurement issues or hidden faults</li>
                <li>• OTDR may miss very short events within dead zones</li>
                <li>• Insertion loss includes launch/receive connector losses that OTDR doesn't measure</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">When Results Don't Match</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>OTDR shows less loss:</strong> Check for dirty test connectors, poor launch, or events in dead zones</li>
                <li><strong>OTDR shows more loss:</strong> Verify OTDR settings, check for ghost events, or averaging errors</li>
                <li><strong>Intermittent differences:</strong> May indicate unstable connection - check and reseat connectors</li>
                <li><strong>Resolution:</strong> Clean all connectors, verify test setup, repeat both tests</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Best Practice</h4>
              <p className="text-sm text-white/80">
                For critical links, perform both OTDR and insertion loss testing. Use insertion loss
                for accurate pass/fail determination against the link budget. Use OTDR to characterise
                individual events and locate any problems. The two methods complement each other for
                comprehensive link certification.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: When to Retest vs When to Repair */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">When to Retest vs When to Repair</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Not every high reading requires immediate repair. Developing judgment about when to clean
              and retest versus when to proceed with repair saves time and avoids unnecessary work.
            </p>

            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Retest First When:
              </h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><strong>Marginal readings:</strong> Values close to pass/fail threshold may be test setup related</li>
                <li><strong>High connector loss:</strong> Likely contamination - clean and retest before replacing</li>
                <li><strong>Inconsistent results:</strong> Varying readings suggest connection issues not permanent faults</li>
                <li><strong>First test of the day:</strong> Equipment needs warm-up, references may need refreshing</li>
                <li><strong>Single-direction OTDR:</strong> Bidirectional testing may show different results</li>
              </ul>
            </div>

            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Proceed to Repair When:
              </h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><strong>Clear fibre break:</strong> End-of-fibre signature where none should exist</li>
                <li><strong>Persistent high splice loss:</strong> Same reading after verification from both directions</li>
                <li><strong>Damaged connector:</strong> Physical inspection shows scratches or chips</li>
                <li><strong>Multiple retests confirm:</strong> Consistent fault after cleaning and setup verification</li>
                <li><strong>Macrobend confirmed:</strong> Non-reflective loss at known stress point</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Systematic Troubleshooting Process</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Verify test setup:</strong> Check reference cables, clean all connections</li>
                <li><strong>2. Repeat the test:</strong> Same result confirms issue is real</li>
                <li><strong>3. Test bidirectionally:</strong> Average OTDR results for accurate loss values</li>
                <li><strong>4. Cross-check methods:</strong> Compare OTDR with insertion loss if available</li>
                <li><strong>5. Physical inspection:</strong> Use microscope to examine suspect connectors</li>
                <li><strong>6. Isolate the fault:</strong> Use OTDR distance to locate physical position</li>
                <li><strong>7. Repair and verify:</strong> After repair, retest to confirm improvement</li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Decision Matrix</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span>Clean connectors and retest</span>
                  <span className="text-green-400">5 minutes</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span>Replace patch cord</span>
                  <span className="text-yellow-400">10 minutes</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span>Re-terminate connector</span>
                  <span className="text-orange-400">20-30 minutes</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Access and re-splice</span>
                  <span className="text-red-400">1-2 hours</span>
                </div>
              </div>
              <p className="text-xs text-white/50 mt-3">
                Always try the quickest fixes first. Many "failures" are solved by cleaning.
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
            <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl p-4 border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2">Professional Interpretation Tips</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Know your baselines:</strong> Understand what good results look like for your equipment</li>
                <li>• <strong>Document everything:</strong> Save traces and test results for future comparison</li>
                <li>• <strong>Consider the application:</strong> Telecom links have stricter requirements than short runs</li>
                <li>• <strong>Factor in temperature:</strong> Cold weather increases loss, especially at bends</li>
                <li>• <strong>Allow for ageing:</strong> New installs should have margin for future degradation</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Interpretation Mistakes</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Ignoring gainers:</strong> Treating apparent gains as normal - they mask real loss</li>
                <li>• <strong>Single-direction only:</strong> Missing bidirectional averaging requirement</li>
                <li>• <strong>Trusting dirty tests:</strong> Not cleaning references leads to false failures</li>
                <li>• <strong>Wrong IOR setting:</strong> Distance errors from incorrect refractive index</li>
                <li>• <strong>Ignoring dead zones:</strong> Missing events hidden by reflections</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-4 border border-indigo-500/20">
              <h4 className="font-semibold text-indigo-400 mb-2">Analysis Workflow</h4>
              <ol className="text-sm text-white/70 space-y-1">
                <li>1. Review overall link loss against budget</li>
                <li>2. Check each event against expected values</li>
                <li>3. Identify any anomalies or failures</li>
                <li>4. Compare bidirectional results</li>
                <li>5. Correlate with insertion loss test</li>
                <li>6. Document findings and recommendations</li>
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
          <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl p-5 border border-purple-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Quick Reference: Test Result Interpretation
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Acceptable Values</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>Fusion splice: less than 0.1 dB</li>
                  <li>Connector: less than 0.5 dB</li>
                  <li>Reflectance: less than -35 dB</li>
                  <li>Fibre: per spec (0.35 dB/km @ 1310)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-indigo-300 mb-2">Problem Indicators</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>Unexpected loss locations</li>
                  <li>High reflectance (greater than -25 dB)</li>
                  <li>Loss greater than 1550nm compared to 1310nm at same point</li>
                  <li>Large direction-dependent variation</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Always clean and retest before repair | Bidirectional average for true loss | Cross-check OTDR with insertion loss
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
            to="/apprentice/study-centre/upskilling/fiber-optics/module5/section3"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: OTDR Testing Basics
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module5/section5"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next: Pass/Fail Criteria
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule5Section4;
