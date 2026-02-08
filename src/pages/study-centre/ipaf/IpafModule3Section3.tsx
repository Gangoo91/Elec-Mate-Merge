import { ArrowLeft, HardHat, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "AGR Method (Advance Guard Rail) – Assembly & Dismantling (IPAF Module 3 Section 3)";
const DESCRIPTION = "How AGR frames work, automatic guardrails, step-by-step AGR assembly sequence, and comparison of 3T vs AGR methods for mobile access towers.";

const quizQuestions = [
  {
    id: 1,
    question: "What does 'AGR' stand for in the context of mobile tower assembly?",
    options: [
      "Automatic Ground Rail",
      "Advance Guard Rail",
      "Adjustable Guardrail Rack",
      "Attached Guardrail Riser"
    ],
    correctAnswer: 1,
    explanation: "AGR stands for 'Advance Guard Rail'. The system uses frames that have guardrails built in which automatically rise to the correct position when the frame section is installed."
  },
  {
    id: 2,
    question: "How do AGR guardrails reach their correct height?",
    options: [
      "The operative pushes them up manually from below",
      "They are installed separately after the frame",
      "They are built into the frame and lock automatically when the platform is fitted",
      "They are winched into position by a cable"
    ],
    correctAnswer: 2,
    explanation: "AGR guardrails are integrated into the frame sections. When the frame is fitted from below and the platform installed, the guardrails automatically lock at the correct height — no separate guardrail installation is needed."
  },
  {
    id: 3,
    question: "What is a key advantage of AGR over the 3T method?",
    options: [
      "AGR towers are cheaper to buy",
      "AGR towers can be assembled by untrained workers",
      "Guardrails cannot be accidentally left off — they are part of the frame",
      "AGR towers do not need levelling"
    ],
    correctAnswer: 2,
    explanation: "Because AGR guardrails are built into the frame, they cannot be accidentally omitted or removed before the platform. This eliminates the most common human error in tower assembly — forgetting or skipping guardrail installation."
  },
  {
    id: 4,
    question: "During AGR assembly, from which position does the operative fit the frame sections?",
    options: [
      "From the top of the tower",
      "From below, on the existing guarded platform",
      "From a separate ladder",
      "From a cherry picker alongside the tower"
    ],
    correctAnswer: 1,
    explanation: "AGR frames are fitted from below — the operative stands on the existing guarded platform and lifts the new frame section into position above. The integrated guardrails then deploy automatically."
  },
  {
    id: 5,
    question: "Which statement about AGR assembly is TRUE?",
    options: [
      "AGR eliminates the need for braces",
      "AGR does not require castors to be locked",
      "AGR uses fewer individual components than 3T for the same height",
      "AGR towers cannot have outriggers fitted"
    ],
    correctAnswer: 2,
    explanation: "AGR systems typically use fewer individual components because the guardrails are integrated into the frame sections. There are fewer separate pieces to handle, transport, and install compared to the 3T method."
  },
  {
    id: 6,
    question: "Can AGR guardrails be accidentally removed before the platform is taken out?",
    options: [
      "Yes, they unclip easily",
      "No — the guardrail mechanism is locked by the platform and cannot release until the platform is removed",
      "Yes, but only with a special tool",
      "It depends on the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "AGR systems are designed so the guardrails are locked in place by the platform. They cannot be removed or lowered whilst the platform remains in position. This interlocking design is a key safety feature."
  },
  {
    id: 7,
    question: "What is a potential disadvantage of AGR compared to 3T?",
    options: [
      "AGR is less safe",
      "AGR frames are heavier because guardrails are built in",
      "AGR towers are less stable",
      "AGR cannot be used outdoors"
    ],
    correctAnswer: 1,
    explanation: "AGR frames are heavier than standard frames because the guardrail mechanism is integrated. This can make them more difficult to lift to higher levels and requires greater physical effort during assembly."
  },
  {
    id: 8,
    question: "Before starting AGR assembly, which base preparation step is identical to the 3T method?",
    options: [
      "None — AGR has a completely different base setup",
      "Locking castors, fitting adjustable legs, and levelling the base",
      "Only the castor locking step",
      "Only the levelling step"
    ],
    correctAnswer: 1,
    explanation: "The base preparation is identical for both methods: castors must be positioned and locked, adjustable legs fitted, and the base levelled with a spirit level. The assembly method only differs from the first working level upwards."
  }
];

const quickCheckQuestions = [
  {
    id: "agr-guardrail-mechanism",
    question: "How are AGR guardrails installed on each new level?",
    options: [
      "Manually by the operative from below via a trapdoor",
      "They are built into the frame and deploy automatically when the platform is fitted",
      "They are winched up by a rope and pulley",
      "A second person installs them from a ladder"
    ],
    correctIndex: 1,
    explanation: "AGR guardrails are integrated into the frame sections. When the frame is fitted and the platform installed, the guardrails automatically rise and lock at the correct height without any separate installation step."
  },
  {
    id: "agr-fewer-components",
    question: "Why does AGR assembly typically involve fewer individual components than 3T?",
    options: [
      "AGR towers are shorter",
      "AGR does not use braces",
      "The guardrails are built into the frame sections rather than being separate pieces",
      "AGR does not need platforms"
    ],
    correctIndex: 2,
    explanation: "Because the guardrails are integrated into the AGR frame sections, there are fewer separate guardrail components to transport, handle, and install. This reduces the total number of individual pieces and the assembly time."
  },
  {
    id: "agr-interlock-safety",
    question: "What prevents an AGR guardrail from being accidentally lowered while someone is on the platform?",
    options: [
      "A padlock on the guardrail",
      "The platform locks the guardrail mechanism — rails cannot lower until the platform is removed",
      "Warning stickers on the frame",
      "The operative's body weight holds them up"
    ],
    correctIndex: 1,
    explanation: "The AGR interlock design means the platform locks the guardrail mechanism in the raised position. The guardrails physically cannot be lowered or retracted while the platform is in place — this is a fail-safe engineered into the system."
  }
];

const faqs = [
  {
    question: "Can I mix AGR and 3T components on the same tower?",
    answer: "No. AGR and 3T use different frame designs. AGR frames have integrated guardrail mechanisms that are not compatible with standard 3T frames. The entire tower must use one system or the other. Mixing component types would compromise the structural integrity and safety certification of the tower."
  },
  {
    question: "Is AGR safer than 3T?",
    answer: "AGR reduces the risk of human error because guardrails deploy automatically — they cannot be forgotten or skipped. However, both methods are safe when followed correctly according to the manufacturer's instructions. AGR eliminates one specific risk (omitting guardrails) but introduces another consideration (heavier frames). The safest method is always the one performed correctly by trained, competent operatives."
  },
  {
    question: "Are all new mobile tower systems AGR?",
    answer: "Not all, but the trend is toward AGR-type systems. Many major manufacturers now offer AGR options alongside traditional 3T systems. Some newer tower designs are exclusively AGR. However, a large number of existing 3T towers remain in service, so competence in both methods is essential for anyone working with mobile access towers."
  },
  {
    question: "Do AGR towers cost more than 3T towers?",
    answer: "AGR tower systems are generally more expensive to purchase because the frames incorporate more complex engineering (integrated guardrail mechanisms, springs, locking devices). However, the reduced assembly time, fewer loose components to manage, and the inherent safety improvement can offset the higher initial cost over the lifespan of the tower system."
  }
];

const IpafModule3Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centered Header */}
        <div className="mb-12 text-center">
          <HardHat className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 3.3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            AGR Method (Advance Guard Rail)
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            How AGR frames work, automatic guardrails, and the advantages of integrated guard rail assembly systems
          </p>
        </div>

        {/* Section 01: Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2 text-base">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>AGR:</strong> "Advance Guard Rail" — guardrails built into frame sections.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Automatic:</strong> Guardrails rise and lock when the platform is installed.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Key Benefit:</strong> Guardrails cannot be accidentally omitted.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Fewer Parts:</strong> Integrated design means fewer loose components.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Interlock:</strong> Platform locks guardrails — cannot remove rails with platform in place.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Heavier Frames:</strong> Trade-off for built-in safety.</span></li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2 text-base">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Spot:</strong> Modern tower systems with collapsible guardrail frames.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Use:</strong> Follow the manufacturer's AGR-specific instruction manual.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Apply:</strong> Same base preparation as 3T, but the frame-by-frame assembly sequence differs from the first working level upwards.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain how AGR (Advance Guard Rail) frames work and how they differ from 3T</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Describe how guardrails deploy automatically when AGR frame sections are fitted</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>List the key advantages of AGR over traditional 3T assembly</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Follow the step-by-step AGR assembly sequence for each level</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain the interlock mechanism that prevents guardrail removal with the platform in place</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Compare 3T and AGR methods and identify when each is appropriate</span>
            </li>
          </ul>
        </section>

        {/* Section 03: How AGR Frames Work */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              How AGR Frames Work
            </h2>
            <div className="space-y-4 text-white">
              <p>
                AGR frames are engineered frame sections with guardrails built into the design. Unlike
                standard frames used in the 3T method, AGR frames contain internal spring-loaded or
                gravity-activated guardrail mechanisms that deploy automatically when the frame is
                fitted and the platform installed.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">The AGR Mechanism</h3>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <ol className="text-white space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">1</div>
                      <div><strong>Frame with Collapsed Rails:</strong> When on the ground, the AGR frame section has its guardrails folded down or collapsed within the frame structure.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">2</div>
                      <div><strong>Frame Fitted from Below:</strong> The operative lifts the AGR frame section and fits it onto the tower from the guarded platform below.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">3</div>
                      <div><strong>Rails Deploy:</strong> As the frame connects to the tower structure, the guardrail mechanism activates — rails rise to their correct height position.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">4</div>
                      <div><strong>Platform Locks Rails:</strong> When the platform is installed, it engages a locking mechanism that holds the guardrails firmly in the raised (protective) position.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">5</div>
                      <div><strong>Interlock:</strong> The guardrails cannot be lowered or removed whilst the platform remains in place. The platform must be removed first during dismantling.</div>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Why This Matters</h3>
                <p className="text-white text-sm">
                  The automatic deployment and interlock design means that human error is engineered out
                  of the process. With 3T, a careless or rushed operative could skip guardrail installation.
                  With AGR, the guardrails are physically part of the frame — they deploy whether the
                  operative wants them to or not. This is inherent safety by design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Advantages of AGR */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Advantages of AGR
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The AGR system was developed specifically to address the weaknesses of the traditional
                3T method. Understanding these advantages helps explain why the industry is progressively
                moving toward AGR-type systems.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Safety Advantages</h3>
                  <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Cannot Forget Guardrails:</strong> They are integral to the frame — no separate installation step</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Cannot Remove Rails Early:</strong> Interlock prevents removal whilst platform is in place</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Consistent Rail Heights:</strong> Factory-set positions ensure correct guardrail and intermediate rail heights every time</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Reduced Human Error:</strong> Fewer decisions for the operative means fewer opportunities for mistakes</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Practical Advantages</h3>
                  <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Fewer Components:</strong> No separate guardrail tubes, clips, or fittings to handle</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Faster Assembly:</strong> Fewer individual installation steps per level</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Less Training Complexity:</strong> Simpler sequence to learn and follow</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Reduced Transport:</strong> Fewer loose components to load, transport, and store</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Step-by-Step AGR Assembly */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              Step-by-Step AGR Assembly
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The base assembly is identical to the 3T method. The AGR-specific sequence begins
                from the first working level upwards. Always follow the manufacturer's specific
                instruction manual for the AGR system being used.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-elec-yellow">AGR Assembly Sequence (Per Level)</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 text-purple-300 text-xs font-bold">1</div>
                    <div><strong>Prepare AGR Frame:</strong> On the ground, check the AGR frame section. Ensure the guardrail mechanism moves freely and is not damaged.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 text-purple-300 text-xs font-bold">2</div>
                    <div><strong>Pass Frame Up:</strong> Pass the AGR frame section up to the operative on the existing guarded platform (or lift from below).</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 text-purple-300 text-xs font-bold">3</div>
                    <div><strong>Fit Frame from Below:</strong> Standing on the existing guarded platform, lift the AGR frame and connect it to the tower structure above. Lock the connections.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 text-purple-300 text-xs font-bold">4</div>
                    <div><strong>Guardrails Deploy:</strong> As the frame engages, the guardrails automatically rise to their correct positions.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 text-purple-300 text-xs font-bold">5</div>
                    <div><strong>Add Braces:</strong> Fit any required horizontal and diagonal braces to the new level.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 text-purple-300 text-xs font-bold">6</div>
                    <div><strong>Install Platform:</strong> Slide the platform into position. This locks the guardrails into their raised position via the interlock mechanism.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 text-purple-300 text-xs font-bold">7</div>
                    <div><strong>Climb to New Level:</strong> Access the new guarded platform via the internal ladder or climb method specified in the manual.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 text-purple-300 text-xs font-bold">8</div>
                    <div><strong>Verify:</strong> Confirm all guardrails are locked, all connections are secure, and the platform is fully engaged.</div>
                  </li>
                </ol>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Differences from 3T</h3>
                <ul className="text-white space-y-1 text-sm">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>No separate guardrail installation step — they deploy with the frame</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>No need to reach through a trapdoor to fit guardrails</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>The frame itself is heavier (integrated guardrail mechanism)</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>The platform has an interlock function (locks the guardrails)</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Braces may still be separate components depending on the system</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: 3T vs AGR Comparison */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">06</span>
              3T vs AGR — Comparison Table
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Both methods are safe when performed correctly. The choice between 3T and AGR depends on
                the tower system available, the working environment, and the specific requirements of the
                task. The table below compares key aspects of each method.
              </p>

              <div className="overflow-hidden rounded-lg border border-white/10">
                <div className="grid grid-cols-3 gap-0 text-xs sm:text-sm">
                  {/* Header Row */}
                  <div className="bg-elec-yellow/20 p-3 font-semibold text-elec-yellow border-b border-white/10">Feature</div>
                  <div className="bg-elec-yellow/20 p-3 font-semibold text-elec-yellow border-b border-white/10">3T Method</div>
                  <div className="bg-elec-yellow/20 p-3 font-semibold text-elec-yellow border-b border-white/10">AGR Method</div>

                  {/* Guardrail Installation */}
                  <div className="bg-white/5 p-3 border-b border-white/5 font-medium">Guardrail Installation</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">Manual — fitted separately from below through trapdoor</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">Automatic — built into frame, deploys when fitted</div>

                  {/* Human Error Risk */}
                  <div className="bg-white/[0.02] p-3 border-b border-white/5 font-medium">Human Error Risk</div>
                  <div className="bg-white/[0.02] p-3 border-b border-white/5">Higher — guardrails can be accidentally skipped</div>
                  <div className="bg-white/[0.02] p-3 border-b border-white/5">Lower — guardrails cannot be omitted</div>

                  {/* Component Count */}
                  <div className="bg-white/5 p-3 border-b border-white/5 font-medium">Component Count</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">More individual pieces (separate guardrails, clips)</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">Fewer pieces (guardrails integrated into frame)</div>

                  {/* Frame Weight */}
                  <div className="bg-white/[0.02] p-3 border-b border-white/5 font-medium">Frame Weight</div>
                  <div className="bg-white/[0.02] p-3 border-b border-white/5">Lighter frames (guardrails are separate)</div>
                  <div className="bg-white/[0.02] p-3 border-b border-white/5">Heavier frames (integrated mechanism)</div>

                  {/* Assembly Speed */}
                  <div className="bg-white/5 p-3 border-b border-white/5 font-medium">Assembly Speed</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">Slower — more steps per level</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">Faster — fewer steps per level</div>

                  {/* Training */}
                  <div className="bg-white/[0.02] p-3 border-b border-white/5 font-medium">Training</div>
                  <div className="bg-white/[0.02] p-3 border-b border-white/5">More complex sequence to learn</div>
                  <div className="bg-white/[0.02] p-3 border-b border-white/5">Simpler sequence, fewer decisions</div>

                  {/* Initial Cost */}
                  <div className="bg-white/5 p-3 border-b border-white/5 font-medium">Initial Cost</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">Lower purchase cost</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">Higher purchase cost</div>

                  {/* Availability */}
                  <div className="bg-white/[0.02] p-3 font-medium">Availability</div>
                  <div className="bg-white/[0.02] p-3">Widely available, large existing fleet</div>
                  <div className="bg-white/[0.02] p-3">Growing, newer systems only</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: AGR Safety Considerations */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">07</span>
              AGR Safety Considerations
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  AGR-Specific Hazards
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Heavier Frames:</strong> Greater risk of manual handling injuries. Plan lifts carefully and use team lifting for higher levels.</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Mechanism Jamming:</strong> If the guardrail mechanism does not deploy smoothly, do not force it. Inspect for damage or obstruction and report the defect.</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Interlock Failure:</strong> If the platform does not engage the guardrail lock correctly, the guardrails may not be secure. Verify the interlock before stepping onto the platform.</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Incorrect Frame Orientation:</strong> AGR frames must be fitted the correct way round. Fitting upside down or back-to-front will prevent the guardrail mechanism from functioning.</span></li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Pre-Use Checks for AGR Frames</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Check guardrail mechanism moves freely</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Verify spring or gravity mechanism is intact</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Inspect locking points for damage or wear</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Ensure frame is not bent or distorted</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Check platform interlock engagement points</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Verify all guardrails reach full height</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Manual Handling — AGR Frames</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Assess the weight before lifting (typically 15-25kg per frame)</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Use correct manual handling technique (bend knees, straight back)</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Team lift for frames passed to upper levels</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Consider rope and pulley for frames above 4m</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Never throw components between levels</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Practical Guidance */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              Practical AGR Assembly Tips
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-green-300">Best Practice</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Lay out AGR frames in assembly order before starting</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Test each guardrail mechanism on the ground first</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Have a second operative help pass heavier AGR frames up</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Verify the interlock clicks positively when the platform is fitted</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Keep the instruction manual open at the AGR-specific pages</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Take extra care with frame orientation — mark the "up" side if needed</span></li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-red-300">Common AGR Mistakes</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Forcing a stiff guardrail mechanism instead of inspecting it</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Fitting the AGR frame upside down or back-to-front</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Assuming the guardrails are locked without checking the interlock</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Ignoring a guardrail that does not fully deploy</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Lifting heavy AGR frames solo when team lift is needed</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Using 3T guardrails on an AGR tower system (incompatible)</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            AGR Method Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">AGR Assembly Sequence</h3>
                <ol className="space-y-1 text-white/80 list-decimal ml-4">
                  <li>Base assembly (same as 3T)</li>
                  <li>Check AGR frame mechanism</li>
                  <li>Pass frame up from below</li>
                  <li>Fit frame — guardrails deploy</li>
                  <li>Add braces</li>
                  <li>Install platform (locks guardrails)</li>
                  <li>Verify interlock engaged</li>
                  <li>Climb to new guarded level</li>
                  <li>Repeat for each level</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">AGR Key Features</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Integrated:</strong> Guardrails part of frame</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Automatic:</strong> Deploy when fitted</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Interlocked:</strong> Platform locks rails</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Fail-safe:</strong> Cannot omit guardrails</span></li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Pre-Use Frame Checks</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Guardrail mechanism moves freely</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Spring/gravity mechanism intact</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Locking points undamaged</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Frame not bent or distorted</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Interlock engagement points clean</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Guardrails reach full height</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">AGR vs 3T Quick Summary</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">AGR:</strong> Safer (auto guardrails), faster, heavier frames, costlier</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">3T:</strong> Manual guardrails, lighter frames, more steps, cheaper</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Both:</strong> Safe when done correctly by trained operatives</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="AGR Method (Advance Guard Rail) Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: 3T Method
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3-section-4">
              Next: Dismantling & Safe Lowering
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IpafModule3Section3;
