import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m3s1-check1",
    question: "What is the core diameter of OS2 singlemode fibre?",
    options: ["8.3 µm", "9 µm", "50 µm", "62.5 µm"],
    correctIndex: 1,
    explanation: "OS2 singlemode fibre has a core diameter of 9 µm, optimised for long-distance, high-bandwidth applications."
  },
  {
    id: "datacabling-m3s1-check2",
    question: "What is the maximum 10 Gigabit Ethernet distance on OM4 fibre?",
    options: ["82 metres", "150 metres", "300 metres", "400 metres"],
    correctIndex: 3,
    explanation: "OM4 fibre supports 10 Gigabit Ethernet up to 400 metres using 850nm VCSEL transceivers."
  },
  {
    id: "datacabling-m3s1-check3",
    question: "Which characteristic distinguishes singlemode from multimode fibre?",
    options: ["Cladding diameter", "Core diameter", "Wavelength used", "Connector type"],
    correctIndex: 1,
    explanation: "The core diameter is the key difference: singlemode has ~9µm core, multimode has 50µm or 62.5µm cores."
  }
];

const faqs = [
  {
    question: "When should I choose singlemode over multimode fibre?",
    answer: "Choose singlemode when distance exceeds 300m, when future bandwidth requirements are uncertain, for campus-to-campus connections, or when connecting to service provider networks. Singlemode offers unlimited bandwidth potential and better long-term investment protection."
  },
  {
    question: "What does OM stand for in fibre grading?",
    answer: "OM stands for Optical Multimode, with grades OM1-OM5 indicating performance levels and bandwidth capabilities. Higher OM numbers support greater bandwidth and longer distances at higher speeds."
  },
  {
    question: "Can I mix OM3 and OM4 fibre in the same link?",
    answer: "Technically possible but not recommended. The link will perform to the lowest grade. For consistent performance and easier testing, use the same grade throughout. If mixing, document clearly and calculate combined performance."
  },
  {
    question: "Why is singlemode cable sometimes cheaper than multimode?",
    answer: "Singlemode cable can be less expensive due to simpler core design. However, singlemode transceivers cost more than multimode equivalents. For new long-distance installations, total cost of ownership often favours singlemode due to future upgrade potential."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A campus backbone requires links exceeding 500 metres with future-proof bandwidth. Which fibre type should you recommend?",
  options: [
    "OM3 multimode",
    "OM4 multimode",
    "OS2 singlemode",
    "OM1 multimode"
  ],
  correctAnswer: 2,
  explanation: "OS2 singlemode is ideal for campus backbone links over 300m, providing virtually unlimited bandwidth and distance capability with lower long-term costs for future upgrades."
  }
];

const DataCablingModule3Section1 = () => {
  useSEO({
    title: "Fibre Types: Singlemode vs Multimode | Data Cabling Module 3.1",
    description: "Learn singlemode and multimode fibre optic cable types, core sizes, OM/OS standards, and selection criteria for data transmission systems."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fibre Types: Singlemode vs Multimode
          </h1>
          <p className="text-white/80">
            Understanding fibre optic cable types and applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Singlemode:</strong> 9µm core, unlimited distance/bandwidth</li>
              <li><strong>Multimode:</strong> 50/62.5µm core, shorter distance, lower cost</li>
              <li><strong>Selection:</strong> Match distance and bandwidth requirements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Yellow jacket = singlemode, Aqua = OM3/OM4</li>
              <li><strong>Use:</strong> SM for &gt;300m, MM for building backbone</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify singlemode and multimode fibres",
              "Understand core sizes and their impact",
              "Select fibre for distance/bandwidth needs",
              "Recognise OM and OS designation standards",
              "Calculate basic transmission parameters",
              "Apply knowledge to real installations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Multimode Fibre
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multimode fibre allows multiple light modes to propagate simultaneously, making it ideal
              for shorter distance, high-speed applications within buildings and campuses.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">OM Grades</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>OM1:</strong> 62.5/125µm, legacy, 275m @ 1G</li>
                  <li><strong>OM2:</strong> 50/125µm, 550m @ 1G</li>
                  <li><strong>OM3:</strong> 50/125µm laser-optimised, 300m @ 10G</li>
                  <li><strong>OM4:</strong> 50/125µm enhanced, 400m @ 10G</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Building backbone connections</li>
                  <li>Data centre interconnects</li>
                  <li>Server-to-switch links</li>
                  <li>High-density rack connections</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">OM3</p>
                <p className="text-white/90 text-xs">Aqua jacket</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">OM4</p>
                <p className="text-white/90 text-xs">Aqua jacket</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">850nm</p>
                <p className="text-white/90 text-xs">VCSEL wavelength</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Singlemode Fibre
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Singlemode fibre allows only one light mode to propagate, eliminating modal dispersion
              and enabling virtually unlimited bandwidth over long distances.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">OS Standards:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>OS1:</strong> Indoor singlemode, tight-buffered, ≤1.0 dB/km @ 1310nm</li>
                <li><strong>OS2:</strong> Indoor/outdoor, loose-tube or tight, ≤0.4 dB/km @ 1310nm</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transmission Capabilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>1000BASE-LX:</strong> 10km+ @ 1310nm</li>
                  <li><strong>10GBASE-LR:</strong> 10km @ 1310nm</li>
                  <li><strong>10GBASE-ER:</strong> 40km @ 1550nm</li>
                  <li><strong>100GBASE-LR4:</strong> 10km CWDM</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Choose SM</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Distance exceeds 300m</li>
                  <li>Future bandwidth uncertain</li>
                  <li>Campus-to-campus links</li>
                  <li>ISP/service provider connections</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Selection Guidelines
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Choosing between singlemode and multimode depends on distance, bandwidth requirements,
              and total cost of ownership including transceivers and future upgrades.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Use Multimode When</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Distance &lt;300m</li>
                  <li>Budget conscious</li>
                  <li>Building backbone</li>
                  <li>Data centre racks</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Use Singlemode When</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Distance &gt;300m</li>
                  <li>Future-proofing needed</li>
                  <li>Campus backbone</li>
                  <li>ISP connections</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hybrid Approach:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Singlemode for building-to-building backbone</li>
                <li>Multimode for distribution within buildings</li>
                <li>Optimises cost whilst maintaining performance</li>
                <li>Most scalable design strategy</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use OM3 minimum for new multimode installations</li>
                <li>Consider OM4 for future-proofing and longer reach</li>
                <li>Verify transceiver compatibility before installation</li>
                <li>Plan 20-30% spare capacity in cable counts</li>
                <li>Test with appropriate wavelength for fibre type</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixing grades:</strong> — Performance limited to lowest grade</li>
                <li><strong>Wrong transceiver:</strong> — SM/MM transceivers not interchangeable</li>
                <li><strong>Under-specifying:</strong> — Not planning for future bandwidth</li>
                <li><strong>Ignoring distance:</strong> — Multimode distance limits are real</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Multimode (OM)</p>
              <ul className="space-y-0.5">
                <li>OM3: 300m @ 10G, aqua</li>
                <li>OM4: 400m @ 10G, aqua</li>
                <li>850nm VCSEL wavelength</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Singlemode (OS)</p>
              <ul className="space-y-0.5">
                <li>OS2: 10km+ capable, yellow</li>
                <li>1310/1550nm wavelength</li>
                <li>Unlimited bandwidth potential</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-2-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-3-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule3Section1;