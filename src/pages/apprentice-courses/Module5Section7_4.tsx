import { ArrowLeft, ArrowRight, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Updating As-Built Drawings (Basic Awareness) - Module 5.7.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn about as-built drawings and their importance in electrical installations. Understand when and why drawings must be updated for compliance and safety.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What are 'as-built drawings'?",
    options: ["Original design plans", "Updated drawings showing the completed installation", "Rough sketches made on site", "Historical drawings"],
    correctIndex: 1,
    explanation: "As-built drawings are the final, updated versions of design drawings that show the installation exactly as it exists on site, including any changes made during construction."
  },
  {
    id: 2,
    question: "When should updates to drawings be made?",
    options: ["Only at the end of the project", "As work progresses", "Once per year", "When requested by client"],
    correctIndex: 1,
    explanation: "Updates should be made as work progresses, not left until the end. This ensures accuracy and prevents important changes from being forgotten."
  },
  {
    id: 3,
    question: "Why are as-built drawings valuable for future work?",
    options: ["They look professional", "They provide accurate information for modifications", "They are required by law", "They increase property value"],
    correctIndex: 1,
    explanation: "As-built drawings provide accurate information about the actual installation, which is essential for future modifications, extensions, and maintenance work."
  }
];

export default function Module5Section7_4() {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What are 'as-built drawings'?",
      options: [
        "Original design plans",
        "Updated drawings showing the completed installation",
        "Rough sketches made on site",
        "Historical drawings"
      ],
      correctAnswer: 1,
      explanation: "As-built drawings are the final, updated versions of design drawings that show the installation exactly as it exists on site."
    },
    {
      id: 2,
      question: "Why must as-built drawings be updated?",
      options: [
        "To look professional",
        "To ensure compliance, safety, and accurate records for future maintenance",
        "Because it's traditional",
        "To increase costs"
      ],
      correctAnswer: 1,
      explanation: "As-built drawings must be updated to ensure compliance, safety, and provide accurate records for future maintenance and modifications."
    },
    {
      id: 3,
      question: "Name one key detail that must be updated on as-built drawings.",
      options: [
        "Drawing title blocks",
        "Company logos",
        "Locations of distribution boards and cable routes",
        "Paper size"
      ],
      correctAnswer: 2,
      explanation: "Locations of distribution boards, cable routes, altered circuits, and accessory positions must all be accurately recorded."
    },
    {
      id: 4,
      question: "When should updates to drawings be made?",
      options: [
        "Only at the end of the project",
        "As work progresses",
        "Once per year",
        "When the client requests"
      ],
      correctAnswer: 1,
      explanation: "Updates should be made as work progresses to ensure accuracy and prevent important changes from being forgotten."
    },
    {
      id: 5,
      question: "What is a major consequence of failing to update drawings?",
      options: [
        "Higher drawing costs",
        "Wrong isolations leading to safety hazards",
        "Slower drawing production",
        "More paperwork"
      ],
      correctAnswer: 1,
      explanation: "Failing to update drawings can lead to wrong isolations, creating serious safety hazards for maintenance teams."
    },
    {
      id: 6,
      question: "Who should receive marked-up as-built updates?",
      options: [
        "The apprentice",
        "The site engineer or document controller",
        "The client only",
        "The suppliers"
      ],
      correctAnswer: 1,
      explanation: "Marked-up as-built updates should be submitted to the site engineer or document controller regularly."
    },
    {
      id: 7,
      question: "True or False: As-built drawings are optional on small projects.",
      options: [
        "True - they're only needed for large projects",
        "False - they are important regardless of project size",
        "True - small projects don't require documentation",
        "False - they're only needed for commercial work"
      ],
      correctAnswer: 1,
      explanation: "As-built drawings are important regardless of project size as they ensure safety and compliance."
    },
    {
      id: 8,
      question: "What colour is typically used for marking changes on paper drawings?",
      options: [
        "Blue pen",
        "Black pen",
        "Red pen",
        "Green pen"
      ],
      correctAnswer: 2,
      explanation: "Red pen is typically used for marking changes on paper drawings to make alterations clearly visible."
    },
    {
      id: 9,
      question: "In the real-world scenario, what went wrong because drawings weren't updated?",
      options: [
        "The project was delayed",
        "A maintenance team isolated the wrong breaker, cutting power to critical hospital equipment",
        "The drawings were lost",
        "The client was unhappy"
      ],
      correctAnswer: 1,
      explanation: "The maintenance team isolated the wrong breaker and accidentally cut power to critical hospital equipment due to out-of-date drawings."
    },
    {
      id: 10,
      question: "Why are as-built drawings valuable for future work?",
      options: [
        "They look professional",
        "They provide accurate information for modifications, extensions, and maintenance",
        "They are required by building regulations",
        "They increase property value"
      ],
      correctAnswer: 1,
      explanation: "As-built drawings provide accurate information about the actual installation, essential for future modifications, extensions, and maintenance."
    }
  ];

  const faqs = [
    {
      question: "Do I need to update drawings for minor changes?",
      answer: "Yes - even minor changes like relocated outlets or altered cable routes should be recorded. What seems minor during installation can become significant during future maintenance or modifications."
    },
    {
      question: "What happens if I forget to mark up a change?",
      answer: "Try to record it as soon as you remember. Take photos if needed to verify the actual installation. Late updates are better than no updates, but accuracy may be compromised."
    },
    {
      question: "Who is responsible for updating as-built drawings?",
      answer: "Everyone on the installation team has a role. Electricians mark up changes during work, and the site engineer or document controller compiles the final as-built drawings."
    },
    {
      question: "Can I use digital mark-ups instead of red pen?",
      answer: "Yes - many projects now use digital mark-up tools. The important thing is that changes are clearly highlighted and submitted regularly to the document controller."
    },
    {
      question: "How detailed should as-built updates be?",
      answer: "Include all changes from the original design: cable routes, equipment positions, circuit numbers, and any additions or deletions. If it affects how someone would work on the installation, it should be recorded."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 7.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Updating As-Built Drawings (Basic Awareness)
            </h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn about as-built drawings and their importance in maintaining accurate records of electrical installations for future maintenance and compliance.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-white/90">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>"As-built drawings" are updated versions of original design drawings.</li>
                  <li>They show the installation exactly as completed on site, including changes.</li>
                  <li>Essential for compliance, safety, and future maintenance work.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Changes from original design, rerouted cables, altered positions.</li>
                  <li><strong>Use:</strong> Red pen mark-ups, digital annotations, regular updates.</li>
                  <li><strong>Check:</strong> Accuracy against actual installation, completeness of updates.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/90">
              <li>Explain what as-built drawings are and why they are important for electrical installations.</li>
              <li>Recognise when and why drawings must be updated during and after construction work.</li>
              <li>Understand the consequences of failing to update as-built documentation accurately.</li>
              <li>Apply good practices in providing information for updating drawings during installation work.</li>
            </ul>
          </section>

          {/* What Are As-Built Drawings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              What Are As-Built Drawings?
            </h2>
            <p className="text-white/90 mb-4">
              As-built drawings are the final, updated versions of the original design drawings that accurately reflect the completed electrical installation:
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
              <p className="font-semibold text-elec-yellow mb-2">Definition and Purpose of As-Built Drawings</p>
              <p className="text-white/90 mb-2"><strong>Final documentation:</strong> The definitive record of the completed installation.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Updated versions of the original design drawings and specifications</li>
                <li>Show the electrical installation exactly as it exists on site after completion</li>
                <li>Include all changes, modifications, and deviations made during construction</li>
                <li>Provide accurate reference for future maintenance, testing, and modifications</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Key differences from design drawings:</strong> Reflecting reality rather than intention.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Design drawings show the intended installation before construction starts</li>
                <li>As-built drawings show the actual installation after construction is complete</li>
                <li>Include changes made during construction due to site conditions or client requests</li>
                <li>Account for practical adjustments made by installation teams during work</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Documentation scope:</strong> Comprehensive coverage of all installation aspects.</p>
              <ul className="text-sm text-white/80 ml-4 list-disc space-y-1">
                <li>Rerouted cables where different from original design routes</li>
                <li>Changes to distribution board and equipment locations</li>
                <li>Alterations to containment systems and cable management</li>
                <li>Additional circuits or equipment not shown in original design</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80">
              <strong>Essential record:</strong> As-built drawings are the authoritative source for understanding any electrical installation
            </div>
          </section>

          <InlineCheck
            id="as-built-definition-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Why Updating Matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Why Updating Matters
            </h2>
            <p className="text-white/90 mb-4">
              Keeping as-built drawings accurate and up-to-date is crucial for multiple reasons affecting safety, compliance, and operational efficiency:
            </p>

            <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50 mb-4">
              <p className="font-semibold text-green-400 mb-2">Critical Importance of Accurate As-Built Documentation</p>
              <p className="text-white/90 mb-2"><strong>Compliance requirements:</strong> Meeting legal and regulatory obligations.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Ensures records match the actual installation for inspection purposes</li>
                <li>Demonstrates compliance with BS 7671 and building regulations</li>
                <li>Provides evidence of completed work for certification processes</li>
                <li>Required for building control sign-off and completion certificates</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Safety considerations:</strong> Protecting maintenance teams and future workers.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Provides accurate details for safe isolation procedures during maintenance</li>
                <li>Shows correct circuit routing to prevent accidental damage during other works</li>
                <li>Identifies emergency isolation points and safety critical circuits</li>
                <li>Enables proper risk assessment for future modification work</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Future works planning:</strong> Essential information for system modifications.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Accurate load calculations for additional circuits and equipment</li>
                <li>Proper planning of cable routes for extensions and modifications</li>
                <li>Understanding of existing containment capacity and constraints</li>
                <li>Coordination with other building services and structural elements</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Legal protection:</strong> Documentation for disputes and liability issues.</p>
              <ul className="text-sm text-white/80 ml-4 list-disc space-y-1">
                <li>Acts as proof of what was actually installed if disputes arise</li>
                <li>Demonstrates professional standards and due diligence</li>
                <li>Supports insurance claims and warranty issues</li>
                <li>Provides evidence of compliance with contract specifications</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80">
              <strong>Multiple benefits:</strong> Accurate as-built drawings serve safety, compliance, and business protection needs
            </div>
          </section>

          <InlineCheck
            id="updating-timing-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* What Should Be Updated */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              What Should Be Updated
            </h2>
            <p className="text-white/90 mb-4">
              Comprehensive updating requires attention to all aspects of the installation that differ from the original design:
            </p>

            <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50 mb-4">
              <p className="font-semibold text-amber-400 mb-2">Key Elements Requiring Documentation Updates</p>
              <p className="text-white/90 mb-2"><strong>Equipment and distribution locations:</strong> Recording actual positions and installations.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Final locations of distribution boards, consumer units, and sub-mains equipment</li>
                <li>Positions of trunking, cable trays, and containment systems</li>
                <li>Actual equipment ratings and specifications where different from design</li>
                <li>Additional or relocated isolation switches and emergency controls</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Cable routing and installation details:</strong> Documenting actual cable paths.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Routing of cables where different from original design drawings</li>
                <li>Underground cable routes with accurate depths and positions</li>
                <li>Cable sizes and types where upgraded or changed during installation</li>
                <li>Joint locations, pull-boxes, and inspection chambers</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Circuit modifications and additions:</strong> Accurate circuit documentation.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Changes to circuit numbering systems and labelling conventions</li>
                <li>Additional circuits added during installation for extra loads</li>
                <li>Modified protection ratings and trip characteristics</li>
                <li>Changes to earthing and bonding arrangements</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Accessories and outlet positions:</strong> Recording final installation details.</p>
              <ul className="text-sm text-white/80 ml-4 list-disc space-y-1">
                <li>Alterations to socket outlet and switch positions</li>
                <li>Additional or relocated lighting points and controls</li>
                <li>Changes to equipment connections and supply arrangements</li>
                <li>Final positions of fire alarm, emergency lighting, and safety systems</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80">
              <strong>Comprehensive coverage:</strong> Every aspect that differs from the original design must be accurately recorded
            </div>
          </section>

          <InlineCheck
            id="future-value-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Consequences of Out-of-Date Drawings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Consequences of Out-of-Date Drawings
            </h2>
            <p className="text-white/90 mb-4">
              Failing to maintain accurate as-built documentation creates serious risks and problems for future operations:
            </p>

            <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50 mb-4">
              <p className="font-semibold text-red-400 mb-2">Serious Risks from Inaccurate Documentation</p>
              <p className="text-white/90 mb-2"><strong>Safety hazards:</strong> Increased risk of accidents and incidents.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Wrong isolation procedures due to incorrect circuit information</li>
                <li>Accidental damage to live conductors during excavation or building work</li>
                <li>Inability to locate emergency isolation points during incidents</li>
                <li>Incorrect assumptions about system earthing and bonding arrangements</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Operational inefficiency:</strong> Time and cost impacts from poor documentation.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Time wasted manually tracing circuits and cable routes</li>
                <li>Delayed maintenance work due to uncertainty about installations</li>
                <li>Increased costs for investigative work before modifications</li>
                <li>Repeated call-outs to resolve issues that could have been avoided</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Compliance failures:</strong> Regulatory and audit issues.</p>
              <ul className="text-sm text-white/80 ml-4 mb-3 list-disc space-y-1">
                <li>Failed audits or compliance inspections due to documentation gaps</li>
                <li>Difficulty demonstrating compliance with BS 7671 and building regulations</li>
                <li>Problems with insurance claims due to inadequate records</li>
                <li>Potential enforcement action from regulatory authorities</li>
              </ul>
              <p className="text-white/90 mb-2"><strong>Future project impacts:</strong> Complications for system modifications and extensions.</p>
              <ul className="text-sm text-white/80 ml-4 list-disc space-y-1">
                <li>Costly rework when modifications conflict with existing installations</li>
                <li>Incorrect load calculations leading to undersized or oversized equipment</li>
                <li>Damage to existing installations during new work</li>
                <li>Legal disputes over responsibility for problems and additional costs</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80">
              <strong>Serious consequences:</strong> Poor documentation creates safety, cost, and legal risks that far outweigh the effort of keeping records accurate
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Examples
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Hospital Emergency - Wrong Isolation</h3>
                <p className="text-white/90 mb-2">
                  <strong>Situation:</strong> On a hospital refurbishment project, electrical drawings were never updated after last-minute changes during construction.
                </p>
                <p className="text-sm text-white/80 mb-2">
                  <strong>The Problem:</strong> When a maintenance team later tried to isolate a lighting circuit for repairs, they switched off the wrong breaker based on the outdated drawings and accidentally cut power to critical life-support equipment.
                </p>
                <p className="text-sm text-white/70">
                  This serious incident highlighted how dangerous out-of-date drawings can be in critical environments. Patient safety was compromised due to poor documentation practices.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/30">
                <h3 className="font-medium text-white mb-2">Office Extension - Cable Damage</h3>
                <p className="text-white/90 mb-2">
                  <strong>Situation:</strong> An office building extension required new foundations to be excavated near the existing building.
                </p>
                <p className="text-sm text-white/80 mb-2">
                  <strong>The Problem:</strong> The as-built drawings showed the main electrical supply entering the building from the opposite side to where it actually was. Excavation work severed the main incoming supply, causing a complete power outage and expensive emergency repairs.
                </p>
                <p className="text-sm text-white/70">
                  Accurate as-built drawings would have prevented this costly mistake and the business disruption that followed.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/30">
                <h3 className="font-medium text-white mb-2">Good Practice - Regular Updates</h3>
                <p className="text-white/90 mb-2">
                  <strong>Situation:</strong> A large retail installation team made daily updates to their as-built drawings, marking changes in red pen and submitting copies to the site engineer each week.
                </p>
                <p className="text-sm text-white/80 mb-2">
                  <strong>The Result:</strong> When the client requested additional electrical supplies for new equipment six months later, the contractor could provide accurate load calculations and cable routes immediately, winning the additional work.
                </p>
                <p className="text-sm text-white/70">
                  Good documentation practices not only prevent problems but can also create business opportunities by demonstrating professionalism and reliability.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-white mb-3">Daily Update Practices</h3>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Mark changes on drawings as work progresses, not at the end
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Use red pen or digital mark-ups to highlight alterations clearly
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Take photos to support mark-ups for complex changes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Submit marked-up drawings regularly to site management
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-white mb-3">Quality Assurance</h3>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                    Always double-check updates before final submission
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                    Verify measurements and positions against actual installation
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                    Include all relevant details: cable sizes, circuit numbers, equipment ratings
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                    Treat as-built updates as part of daily tasks, not an afterthought
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/30">
              <h2 className="text-xl font-semibold text-white mb-4">Pocket Guide</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-white/90">As-built drawings = show the installation exactly as finished</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-white/90">Always record changes (routes, circuits, positions)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-white/90">Keep updates current – don't leave it until project completion</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-white/90">Submit updates to site management regularly</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-white/90">Accurate drawings = safer, more efficient future work</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border-l-2 border-white/20">
                  <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-sm text-white/80">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/90 mb-4">
                In this subsection, you learned that as-built drawings must reflect the final installation, not the original design. They are critical for compliance, safety, and future works. Poor or missing updates create risks, delays, and potential hazards.
              </p>
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  As-built drawings show installations exactly as completed, including all changes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Updates must be made progressively during work, not left until completion
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Accurate documentation prevents safety hazards and supports future maintenance
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Poor documentation can lead to wrong isolations and dangerous situations
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Regular submission of marked-up drawings ensures accuracy and compliance
                </li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <Quiz title="As-Built Drawings Knowledge Check" questions={quizQuestions} />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Work Logs
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-5">
                Next: Documentation Storage
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
}
