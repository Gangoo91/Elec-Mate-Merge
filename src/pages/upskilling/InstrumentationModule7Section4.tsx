import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wiring Standards and Colour Coding - Instrumentation Course";
const DESCRIPTION = "Learn international wiring standards, colour codes, cable types, labelling conventions, and the safety benefits of standardised wiring practices in industrial instrumentation.";

const quickCheckQuestions = [
  {
    id: "m7s4-qc1",
    question: "According to IEC standards, what colour is used for protective earth conductors?",
    options: ["Blue", "Brown", "Green/Yellow stripes", "Black"],
    correctIndex: 2,
    explanation: "Green/Yellow stripes is the mandatory colour for protective earth (PE) conductors according to IEC 60757 and BS 7671."
  },
  {
    id: "m7s4-qc2",
    question: "In ISA-5.1 standards, what colour is typically used for the positive 4-20mA signal wire?",
    options: ["Black", "Blue", "Red", "White"],
    correctIndex: 2,
    explanation: "Red is typically used for the positive 4-20mA signal wire according to ISA-5.1 instrumentation standards."
  },
  {
    id: "m7s4-qc3",
    question: "Why is LSZH (Low Smoke Zero Halogen) cable essential for enclosed spaces?",
    options: ["It's cheaper", "It provides better signal quality", "It minimises toxic smoke in case of fire", "It has higher current capacity"],
    correctIndex: 2,
    explanation: "LSZH cable minimises toxic smoke and halogen gas emissions during fire, making it essential for enclosed spaces where personnel evacuation may be required."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What colour is typically used for 24V DC positive signal wires in instrumentation?",
    options: ["Black", "Red for positive signal wires and blue for 24VDC positive supply", "Green", "Yellow"],
    correctAnswer: 1,
    explanation: "According to ISA-5.1 standards, red is used for positive 4-20mA signal wires, while blue is used for 24VDC positive supply wires in instrumentation applications."
  },
  {
    id: 2,
    question: "Why is consistent wire labelling important?",
    options: ["It looks professional", "It enables rapid fault identification, prevents connection errors, ensures safety during maintenance, and facilitates troubleshooting", "It's required by insurance companies", "It reduces cable costs"],
    correctAnswer: 1,
    explanation: "Consistent wire labelling is critical for safety and efficiency - it enables rapid fault identification, prevents dangerous connection errors, ensures safe maintenance practices, and significantly reduces troubleshooting time."
  },
  {
    id: 3,
    question: "Name one international standard related to instrumentation wiring.",
    options: ["ISA-5.1 (Instrumentation Symbols and Identification) or IEC 60757 (Code for designation of colours)", "ISO 9001", "ANSI Z87.1", "NEMA 4X"],
    correctAnswer: 0,
    explanation: "ISA-5.1 provides guidelines for instrumentation symbols and identification including wire colour coding, while IEC 60757 specifies the international standard for conductor colour designation."
  },
  {
    id: 4,
    question: "What hazard can incorrect colour coding cause?",
    options: ["Higher installation costs", "Electrical shock, equipment damage, wrong connections leading to process safety incidents, and delayed emergency response", "Reduced signal quality", "Increased cable length requirements"],
    correctAnswer: 1,
    explanation: "Incorrect colour coding can cause serious safety hazards including electrical shock from touching live conductors, equipment damage from wrong connections, process safety incidents from faulty signals, and delayed emergency response due to misidentification."
  },
  {
    id: 5,
    question: "How does wire sizing affect signal transmission?",
    options: ["Wire size doesn't affect signals", "Larger wires increase resistance", "Wire cross-sectional area affects resistance - larger wires have lower resistance, reducing voltage drop and improving signal integrity", "Wire size only affects current capacity"],
    correctAnswer: 2,
    explanation: "Wire sizing directly affects signal transmission through resistance. Larger cross-sectional areas have lower resistance, which reduces voltage drop along the cable run and improves signal integrity, especially important for long cable runs in 4-20mA loops."
  },
  {
    id: 6,
    question: "What is the typical resistance of 0.75mm squared instrumentation cable per kilometre?",
    options: ["12 ohms/km", "18 ohms/km", "24 ohms/km", "36 ohms/km"],
    correctAnswer: 2,
    explanation: "0.75mm squared instrumentation cable has approximately 24 ohms per kilometre resistance. This must be considered in loop resistance calculations for 4-20mA circuits."
  },
  {
    id: 7,
    question: "What is the purpose of individual screening (IS) in multi-pair cables?",
    options: ["Reduce cable weight", "Provide best noise immunity between pairs carrying different signals", "Make termination easier", "Reduce cable costs"],
    correctAnswer: 1,
    explanation: "Individual screening (IS) provides a shield around each pair separately, offering the best noise immunity when different signal types are carried in the same cable."
  },
  {
    id: 8,
    question: "What percentage of spare terminals should be included in terminal strip design?",
    options: ["5%", "10%", "20%", "50%"],
    correctAnswer: 2,
    explanation: "Good engineering practice recommends 20% spare capacity in terminal strips to allow for future modifications, additions, and maintenance flexibility."
  },
  {
    id: 9,
    question: "What fire performance standard covers circuit integrity for emergency systems?",
    options: ["IEC 60332-1", "IEC 61034", "BS 6387 CWZ", "IEC 60757"],
    correctAnswer: 2,
    explanation: "BS 6387 CWZ specifies circuit integrity requirements for cables in fire conditions, essential for emergency systems that must continue operating during a fire."
  },
  {
    id: 10,
    question: "What is the estimated reduction in troubleshooting time from implementing standardised colour coding?",
    options: ["10-20%", "30-40%", "50-70%", "80-90%"],
    correctAnswer: 2,
    explanation: "Standardised colour coding can reduce troubleshooting time by 50-70% through immediate signal recognition, faster fault location, and prevention of connection mistakes."
  }
];

const faqs = [
  {
    question: "Can I use any colour scheme as long as it's documented?",
    answer: "While documentation is important, it's strongly recommended to follow international standards (IEC 60757, ISA-5.1). Non-standard schemes create confusion for maintenance personnel unfamiliar with the site and increase error risk during emergencies."
  },
  {
    question: "Is it acceptable to mix cable screening types in the same installation?",
    answer: "Yes, but carefully. Use individual screening (IS) for sensitive signals near noise sources and overall screening (OS) for general runs. Document the approach and ensure consistent termination practices throughout."
  },
  {
    question: "How often should cable labels be inspected and replaced?",
    answer: "Labels should be inspected during routine maintenance (typically annually) and replaced if damaged, faded, or illegible. UV-resistant and chemical-resistant labels last longer in harsh environments."
  },
  {
    question: "What if existing installations don't follow current colour standards?",
    answer: "Legacy installations can remain if well-documented. When making modifications, bring new work up to current standards. Consider a phased upgrade during major maintenance or when safety is compromised."
  },
  {
    question: "Are there specific colour requirements for hazardous area (ATEX) installations?",
    answer: "ATEX doesn't mandate specific colours beyond standard earth identification. However, intrinsically safe circuits are often run in blue-sheathed cable to distinguish them from non-IS circuits."
  },
  {
    question: "What cable size should I use for a 300-metre 4-20mA loop?",
    answer: "Calculate loop resistance including cable, transmitter, and load. For 300m runs, 1.0mm squared or 1.5mm squared is typically required to keep voltage drop within acceptable limits. Always verify with manufacturer specifications."
  }
];

const InstrumentationModule7Section4 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-7">
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
            <span>Module 7 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Wiring Standards and Colour Coding
          </h1>
          <p className="text-white/80">
            International standards, cable selection, and labelling conventions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>IEC 60757:</strong> International conductor colour codes</li>
              <li><strong>ISA-5.1:</strong> Instrumentation identification standards</li>
              <li><strong>Green/Yellow:</strong> Always protective earth (mandatory)</li>
              <li><strong>Red/Black:</strong> Typical 4-20mA signal pair</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Standardised colour coding reduces errors by 50-70%</li>
              <li><strong>Use:</strong> Always label cables with source, destination, and signal type</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply IEC and ISA wiring colour standards",
              "Select appropriate cable types and sizes",
              "Implement professional labelling conventions",
              "Design organised terminal strip layouts",
              "Understand fire and environmental cable requirements",
              "Maximise troubleshooting efficiency through standardisation"
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
            IEC and ISA Colour Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              International wiring standards ensure consistent identification across installations worldwide.
              The IEC 60757 standard defines conductor colours for general electrical work, whilst ISA-5.1
              provides specific guidance for instrumentation systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">IEC 60757 Power Conductor Colours:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong className="text-green-400">Green/Yellow:</strong> Protective earth (mandatory)</li>
                <li><strong className="text-blue-400">Blue:</strong> Neutral conductor</li>
                <li><strong className="text-amber-400">Brown:</strong> Line/Live conductor (single phase)</li>
                <li><strong className="text-white">Black/Brown/Grey:</strong> Three phase L1, L2, L3</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ISA-5.1 Instrumentation Colours:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong className="text-red-400">Red (+):</strong> Positive 4-20mA signal wire</li>
                <li><strong className="text-white">Black (-):</strong> Negative 4-20mA return wire</li>
                <li><strong className="text-blue-400">Blue:</strong> 24VDC positive supply</li>
                <li><strong className="text-white">White:</strong> 24VDC negative/common</li>
                <li><strong className="text-orange-400">Orange:</strong> Shield/drain wire termination</li>
                <li><strong className="text-purple-400">Purple:</strong> HART communication pairs</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Types and Conductor Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Instrumentation cable selection depends on the application environment, signal type, and
              required noise immunity. Understanding cable construction helps match the right product
              to the installation requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Screening Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Individual Screen (IS):</strong> Each pair separately screened - best noise immunity</li>
                <li><strong>Overall Screen (OS):</strong> Single screen over all pairs - cost effective</li>
                <li><strong>Collective Screen (CS):</strong> Groups of pairs screened - moderate protection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Conductor Sizing Guide:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>0.5mm squared:</strong> Up to 50mA - not recommended for loops</li>
                <li><strong>0.75mm squared:</strong> Standard for 4-20mA loops up to 100m</li>
                <li><strong>1.0mm squared:</strong> Preferred for long runs (100-300m)</li>
                <li><strong>1.5mm squared:</strong> Heavy duty and very long runs</li>
                <li><strong>2.5mm squared:</strong> Power distribution to instruments</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Environmental Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>LSZH:</strong> Low Smoke Zero Halogen - essential for enclosed spaces</li>
                <li><strong>Fire Retardant:</strong> IEC 60332-1 single cable flame test</li>
                <li><strong>Circuit Integrity:</strong> BS 6387 CWZ for emergency systems</li>
                <li><strong>Temperature Range:</strong> Typically -40 degrees C to +105 degrees C</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Labelling and Terminal Organisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic labelling and terminal organisation are essential for safe maintenance and
              efficient troubleshooting. Every cable and termination should be clearly identified
              with unique designations that match system documentation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Labelling Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Unique Identifier:</strong> Each cable requires unique designation</li>
                <li><strong>Source/Destination:</strong> Clear origin and termination points</li>
                <li><strong>Signal Type:</strong> 4-20mA, 24VDC, HART, etc.</li>
                <li><strong>Circuit Reference:</strong> P and ID tag or loop number</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Terminal Strip Best Practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Functional Grouping:</strong> Power, signals, communications separate</li>
                <li><strong>Signal Direction:</strong> Inputs and outputs clearly separated</li>
                <li><strong>Spare Capacity:</strong> 20% spare terminals for future modifications</li>
                <li><strong>Test Points:</strong> Easy access for maintenance and testing</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Benefits of Standardisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Following wiring standards delivers significant operational and safety benefits throughout
              the system lifecycle. The initial investment in proper documentation and standard
              compliance pays dividends during maintenance and emergency situations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Troubleshooting Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rapid Identification:</strong> Immediate signal recognition by colour</li>
                <li><strong>Reduced Downtime:</strong> 50-70% reduction in troubleshooting time</li>
                <li><strong>Error Prevention:</strong> Consistent coding prevents connection mistakes</li>
                <li><strong>Knowledge Transfer:</strong> Easier handover between personnel</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safety Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electrical Safety:</strong> Clear identification of live conductors</li>
                <li><strong>Earth Protection:</strong> Unmistakable green/yellow coding</li>
                <li><strong>Emergency Response:</strong> Rapid identification during emergencies</li>
                <li><strong>Regulatory Compliance:</strong> Meets safety standard requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow IEC/ISA colour standards without deviation</li>
                <li>Label every cable at both ends with permanent markers</li>
                <li>Document as-built wiring in system drawings</li>
                <li>Allow 20% spare capacity in terminal strips</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Fault Finding</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use colour codes for rapid signal identification</li>
                <li>Check labels match documentation before testing</li>
                <li>Trace signals using standardised colour patterns</li>
                <li>Update documentation with any discrepancies found</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Non-standard colours</strong> - creates confusion and safety hazards</li>
                <li><strong>Missing labels</strong> - impossible to trace signals efficiently</li>
                <li><strong>Inadequate cable size</strong> - voltage drop causes signal errors</li>
                <li><strong>Shield earthed at both ends</strong> - creates ground loops</li>
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

export default InstrumentationModule7Section4;
