import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Interpreting Test Results - Fibre Optics Technology";
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
    id: 1,
    question: "What is the relationship between dB and dBm?",
    options: [
      "They are the same measurement",
      "dB measures relative change, dBm measures absolute power referenced to 1 mW",
      "dBm measures relative change, dB measures absolute power",
      "dB is for multimode, dBm is for singlemode"
    ],
    correctAnswer: 1,
    explanation: "dB measures relative change (ratio), while dBm measures absolute power level referenced to 1 milliwatt."
  },
  {
    id: 2,
    question: "A connector shows 0.8 dB loss on OTDR. What is the likely cause?",
    options: [
      "Normal performance for mechanical splice",
      "Contaminated or poorly mated connector requiring cleaning",
      "Expected value for fusion splice",
      "Normal value for all connectors"
    ],
    correctAnswer: 1,
    explanation: "0.8 dB is high for a connector (typical should be 0.3-0.5 dB). Contamination or poor mating is the most common cause."
  },
  {
    id: 3,
    question: "What signature indicates a macrobend on an OTDR trace?",
    options: [
      "Large reflective spike",
      "Non-reflective loss event with no physical connection at that point",
      "Gain event",
      "End-of-fibre reflection"
    ],
    correctAnswer: 1,
    explanation: "Macrobends cause light to escape without reflection, showing as non-reflective loss at a location where no splice or connector should exist."
  },
  {
    id: 4,
    question: "Why is bidirectional OTDR testing important?",
    options: [
      "It's faster than single-direction",
      "It averages out measurement variations and accurately characterises splice loss",
      "It only matters for multimode fibre",
      "It's required by law"
    ],
    correctAnswer: 1,
    explanation: "Bidirectional testing averages out the effects of different fibre characteristics, giving accurate splice loss values."
  },
  {
    id: 5,
    question: "An OTDR shows 0.15 dB gain at a splice. What causes this?",
    options: [
      "The splice is amplifying the signal",
      "Measurement artefact due to different fibre mode field diameters",
      "Faulty OTDR equipment",
      "Reflection from dirty connector"
    ],
    correctAnswer: 1,
    explanation: "Gainers are caused by different backscatter coefficients in fibres with different mode field diameters - not actual gain."
  },
  {
    id: 6,
    question: "How should insertion loss test results compare with OTDR total link loss?",
    options: [
      "They should never be compared",
      "OTDR should always show higher loss",
      "They should agree within approximately 0.5 dB for a healthy link",
      "Insertion loss is always exactly double OTDR loss"
    ],
    correctAnswer: 2,
    explanation: "Both methods should give similar results. Differences greater than 0.5 dB suggest measurement issues or problems."
  },
  {
    id: 7,
    question: "What is a typical acceptable loss for a quality fusion splice?",
    options: [
      "Less than 1.0 dB",
      "Less than 0.1 dB",
      "Exactly 0 dB",
      "Between 0.5-1.0 dB"
    ],
    correctAnswer: 1,
    explanation: "Quality fusion splices typically achieve less than 0.1 dB loss, often 0.02-0.05 dB with modern equipment."
  },
  {
    id: 8,
    question: "When interpreting results, what does ORL (Optical Return Loss) measure?",
    options: [
      "Total loss through the link",
      "Reflections returning back toward the source",
      "Power at the receiver",
      "Distance to the first connector"
    ],
    correctAnswer: 1,
    explanation: "ORL measures the total reflections returning toward the source - important for laser-based systems sensitive to back-reflections."
  },
  {
    id: 9,
    question: "A link shows 8 dB total loss with a budget of 7 dB. What should you do first?",
    options: [
      "Replace the entire cable",
      "Clean all connectors and retest to confirm the reading",
      "Add an amplifier",
      "Accept the failure and document"
    ],
    correctAnswer: 1,
    explanation: "Always clean and retest first - dirty connectors are the most common cause of marginal failures and are easy to fix."
  },
  {
    id: 10,
    question: "What distinguishes a high-loss splice from a dirty connector on OTDR?",
    options: [
      "They look identical",
      "High-loss splice is non-reflective; dirty connector typically shows both loss and reflection",
      "Dirty connector shows no loss",
      "High-loss splice always shows reflection"
    ],
    correctAnswer: 1,
    explanation: "Fusion splices are non-reflective (loss only), while dirty connectors typically show both loss and a reflection spike."
  }
];

const faqs = [
  {
    question: "Why do my OTDR readings differ when testing from opposite ends?",
    answer: "OTDR measures backscatter, which depends on fibre characteristics. If fibres on either side of a splice have different mode field diameters or backscatter coefficients, the splice can appear as a loss from one direction and a gain from the other. Bidirectional testing and averaging gives the true splice loss. This is normal behaviour, not equipment error."
  },
  {
    question: "How accurate are OTDR loss measurements compared to insertion loss testing?",
    answer: "Insertion loss testing with a calibrated source and power meter is generally more accurate for total link loss measurement (plus or minus 0.1 dB typical). OTDR is better for locating faults and characterising individual events but may have plus or minus 0.2-0.5 dB uncertainty on individual event measurements. Use both methods together for comprehensive testing."
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
            <span>Module 5 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Interpreting Test Results
          </h1>
          <p className="text-white/80">
            Make informed decisions from fibre optic measurements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>dB:</strong> Relative loss or gain (ratio)</li>
              <li><strong>dBm:</strong> Absolute power (ref to 1mW)</li>
              <li><strong>Signatures:</strong> Learn fault patterns on OTDR</li>
              <li><strong>Decision:</strong> Clean and retest before repair</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Decisions</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Pass/fail:</strong> Compare against loss budget</li>
              <li><strong>Marginal:</strong> Clean, retest, verify</li>
              <li><strong>High loss:</strong> Identify cause before repair</li>
              <li><strong>Bidirectional:</strong> Average for true values</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understanding dB and dBm measurements",
              "Analysing OTDR event tables",
              "Identifying fault signatures",
              "Bidirectional test interpretation",
              "Making remediation decisions",
              "Correlating different test methods"
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
            Understanding dB and dBm
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Decibels (dB) and decibel-milliwatts (dBm) are fundamental to fibre optic measurements, but they measure different things. Understanding the distinction is essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">dB (decibel) - Relative measurement:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measures the ratio between two power levels</li>
                <li>Used for loss, gain, and attenuation</li>
                <li>Loss example: 3 dB means half the power lost</li>
                <li>10 dB loss = 90% of power lost (1/10 remaining)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">dBm (decibel-milliwatt) - Absolute measurement:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measures actual power level referenced to 1 mW</li>
                <li>0 dBm = 1 milliwatt</li>
                <li>-10 dBm = 0.1 mW (100 microwatts)</li>
                <li>+3 dBm = 2 mW</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Practical Example</p>
              <p className="text-sm text-white">
                If a transmitter outputs +2 dBm and the link has 8 dB loss, the received power is +2 - 8 = -6 dBm. You can subtract dB loss from dBm power because dB represents a ratio. The receiver needs the power to be above its sensitivity (e.g., -25 dBm) to work.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            OTDR Fault Signatures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different faults create distinctive patterns on OTDR traces. Learning these signatures helps quickly identify problems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fusion splice (good):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Small step down in backscatter level (typically 0.02-0.1 dB)</li>
                <li>No reflection spike (non-reflective)</li>
                <li>Located where splice should be per documentation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Connector (good):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Reflection spike above backscatter level</li>
                <li>Step down showing loss (typically 0.3-0.5 dB)</li>
                <li>Located at patch panel or termination point</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Dirty or damaged connector:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Higher than normal loss (over 0.5 dB)</li>
                <li>Often higher reflection than clean connector</li>
                <li>Cleaning may resolve the issue</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Macrobend:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Non-reflective loss (no spike, just step down)</li>
                <li>Located where no connection should exist</li>
                <li>Higher at 1550nm than 1310nm (bend-sensitive)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fibre break:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Large reflective spike (glass-to-air)</li>
                <li>Signal drops to noise floor immediately after</li>
                <li>No more fibre visible beyond break point</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Bidirectional Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Testing from both ends of a fibre link is essential for accurate splice loss measurement and professional certification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why bidirectional matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>OTDR measures backscatter, which varies with fibre characteristics</li>
                <li>Different mode field diameters cause apparent gainers or excess loss</li>
                <li>Single-direction measurement can be misleading</li>
                <li>Averaging both directions gives true splice loss</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Gainer events:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Apparent gain (negative loss) at some splices</li>
                <li>Caused by downstream fibre having higher backscatter</li>
                <li>Not real gain - artefact of measurement technique</li>
                <li>Bidirectional averaging eliminates the effect</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Calculating True Splice Loss</p>
              <p className="text-sm text-white">
                True loss = (Loss from A + Loss from B) / 2. For example, if a splice shows +0.05 dB (gainer) from one direction and 0.15 dB loss from the other, the true loss is (0.15 - 0.05) / 2 = 0.05 dB. Always average bidirectional results for certification.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Comparing Test Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different test methods serve different purposes and may give slightly different results. Understanding these differences helps interpret results correctly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Insertion loss testing (power meter):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Most accurate for total link loss</li>
                <li>Measures actual light transmission end-to-end</li>
                <li>Typical accuracy: plus or minus 0.1 dB</li>
                <li>Cannot locate where loss occurs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">OTDR testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Shows loss location and individual events</li>
                <li>Uses backscatter (indirect measurement)</li>
                <li>Typical accuracy: plus or minus 0.2-0.5 dB per event</li>
                <li>Essential for fault location and troubleshooting</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Comparing results:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Total OTDR loss should be within 0.5 dB of insertion loss</li>
                <li>Larger differences suggest measurement issues</li>
                <li>OTDR may miss some loss that power meter captures</li>
                <li>Use both methods for comprehensive testing</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Making Remediation Decisions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test results drive decisions about whether to accept, clean and retest, or repair a fibre link.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pass - within budget:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>All measurements within specification</li>
                <li>Document results and move on</li>
                <li>Consider margin for future ageing and connections</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Marginal - close to threshold:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Clean all connectors thoroughly</li>
                <li>Clean and verify reference cables</li>
                <li>Retest from both directions</li>
                <li>Check test setup and environmental conditions</li>
                <li>If still marginal, investigate individual events</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fail - exceeds budget:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify highest-loss events on OTDR</li>
                <li>Determine if cleaning will help (connectors)</li>
                <li>Consider retermination for high-loss connectors</li>
                <li>Consider resplicing for high-loss fusion splices</li>
                <li>Investigate macrobends (routing issues)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">When to repair vs. replace:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Single high-loss event: Repair that event</li>
                <li>Multiple marginal events: May need systematic review</li>
                <li>Cable damage: May require cable replacement</li>
                <li>Cost-benefit: Compare repair time vs. replacement cost</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Common Interpretation Pitfalls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Avoiding common mistakes ensures accurate interpretation and appropriate decisions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Pitfalls to avoid:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Trusting single-direction OTDR:</strong> Always test bidirectionally for splices</li>
                <li><strong>Ignoring gainers:</strong> They indicate fibre differences, not actual gain</li>
                <li><strong>Dirty reference cables:</strong> Can add loss that appears as link loss</li>
                <li><strong>Wrong index of refraction:</strong> Distances will be incorrect</li>
                <li><strong>Ghost events:</strong> Multiple reflections creating false events</li>
                <li><strong>Rushing to repair:</strong> Clean and retest first</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Verification Steps</p>
              <p className="text-sm text-white">
                Before concluding a link has problems: 1) Clean all connectors, 2) Verify reference cables on known-good link, 3) Check OTDR settings match fibre type, 4) Test from both directions, 5) Compare OTDR total with insertion loss test. If issues persist after verification, investigate specific events.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Loss Values</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fusion splice:</strong> Under 0.1 dB (often 0.02-0.05 dB)</li>
                <li><strong>Mechanical splice:</strong> 0.1-0.5 dB</li>
                <li><strong>Connector pair (mated):</strong> 0.3-0.5 dB</li>
                <li><strong>Singlemode fibre:</strong> 0.35 dB/km at 1310nm, 0.25 dB/km at 1550nm</li>
                <li><strong>Multimode fibre (OM3/OM4):</strong> 3.5 dB/km at 850nm</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Save all test results with clear naming</li>
                <li>Include test date, operator, and equipment used</li>
                <li>Note ambient temperature for certification</li>
                <li>Store bidirectional OTDR traces</li>
                <li>Keep insertion loss test results with OTDR data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Red Flags Requiring Investigation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Loss over 0.5 dB at any connector</li>
                <li>Non-reflective loss where no splice should exist</li>
                <li>Large difference between OTDR and insertion loss</li>
                <li>Unexpected events on trace</li>
                <li>Total loss exceeds budget even after cleaning</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Result Interpretation</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">dB vs dBm</p>
                <ul className="space-y-0.5">
                  <li>dB = relative (ratio)</li>
                  <li>dBm = absolute (power)</li>
                  <li>0 dBm = 1 milliwatt</li>
                  <li>Subtract dB from dBm</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Decision Flow</p>
                <ul className="space-y-0.5">
                  <li>Within budget = Pass</li>
                  <li>Marginal = Clean and retest</li>
                  <li>Over budget = Investigate events</li>
                  <li>Always test both directions</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule5Section4;
