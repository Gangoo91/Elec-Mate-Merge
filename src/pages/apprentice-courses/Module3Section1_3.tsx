import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Cable, Zap, Shield, AlertTriangle, CheckCircle2, Home, Factory, Wrench, Scissors, Settings, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Which type of conduit can act as an earth path?",
    options: ["PVC conduit", "Steel conduit", "Flexible conduit", "Plastic trunking"],
    correctAnswer: 1,
    explanation: "Steel conduit can act as an earth path when properly installed with continuous bonding and appropriate couplings."
  },
  {
    id: 2,
    question: "Name one advantage of using singles in trunking over surface-clipped cable.",
    options: ["Lower cost", "Easier cable changes", "Faster installation", "Less planning needed"],
    correctAnswer: 1,
    explanation: "Trunking allows easy addition, removal, or replacement of cables without disturbing walls or ceilings."
  },
  {
    id: 3,
    question: "Why must cable fill capacity be considered in trunking systems?",
    options: ["For cost reasons", "To prevent overheating", "For aesthetic appearance", "To reduce voltage drop"],
    correctAnswer: 1,
    explanation: "Overfilling causes excessive heating due to poor heat dissipation and makes cable pulling difficult."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main purpose of conduit or trunking in a singles installation?",
    options: ["Reduce voltage drop", "Provide mechanical protection and routing", "Improve current capacity", "Reduce material cost"],
    correctAnswer: 1,
    explanation: "The primary purpose is to provide mechanical protection and a defined route for the individual cables."
  },
  {
    id: 2,
    question: "Which containment type can be used as an earth conductor?",
    options: ["PVC conduit", "Steel conduit", "PVC trunking", "Flexible conduit"],
    correctAnswer: 1,
    explanation: "Steel conduit can serve as an earth conductor when properly bonded with continuous electrical continuity."
  },
  {
    id: 3,
    question: "True or False: Singles can be installed without any form of containment if located high on a wall.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. Single-core insulated conductors must always be enclosed in suitable containment for protection and compliance."
  },
  {
    id: 4,
    question: "Which of the following is a limitation of steel conduit systems?",
    options: ["Poor mechanical strength", "Requires skilled installation", "Low cost", "Limited service life"],
    correctAnswer: 1,
    explanation: "Steel conduit requires skilled installation for threading, bending, and ensuring proper earthing continuity."
  },
  {
    id: 5,
    question: "What device should be used to protect cable insulation at entry points into steel conduit?",
    options: ["Grommets or bushes", "Cable ties", "Insulation tape", "Wooden blocks"],
    correctAnswer: 0,
    explanation: "Grommets or bushes prevent sharp edges from damaging cable insulation at conduit entry points."
  },
  {
    id: 6,
    question: "Why must you avoid overfilling trunking with cables?",
    options: ["Increases voltage drop", "Causes excessive heating and difficulty pulling cables", "Reduces cable flexibility", "Damages outer sheath"],
    correctAnswer: 1,
    explanation: "Overfilling causes poor heat dissipation leading to overheating and makes future cable pulling extremely difficult."
  },
  {
    id: 7,
    question: "What is the typical maximum fill capacity for cables in trunking?",
    options: ["25%", "35%", "45%", "55%"],
    correctAnswer: 2,
    explanation: "BS 7671 generally limits cable fill to around 45% of trunking cross-sectional area to allow heat dissipation."
  },
  {
    id: 8,
    question: "Which installation method provides better cable access for future modifications?",
    options: ["Buried T&E", "Surface clipped singles", "Singles in trunking", "SWA cable"],
    correctAnswer: 2,
    explanation: "Singles in trunking provide excellent access for adding, removing, or modifying cables without major disruption."
  },
  {
    id: 9,
    question: "When using steel conduit, what must be tested to ensure safety?",
    options: ["Cable colour coding", "Earth continuity", "Cable flexibility", "Installation speed"],
    correctAnswer: 1,
    explanation: "Earth continuity through the steel conduit system must be tested to ensure it can serve as a protective conductor."
  },
  {
    id: 10,
    question: "What is the recommended support spacing for 20mm PVC conduit?",
    options: ["500mm", "750mm", "1000mm", "1250mm"],
    correctAnswer: 1,
    explanation: "20mm PVC conduit should be supported at maximum 750mm intervals to prevent sagging."
  },
  {
    id: 11,
    question: "Which pulling technique is recommended for long conduit runs?",
    options: ["Pull all cables at once", "Use pulling compound", "Push from both ends", "Install without pulling"],
    correctAnswer: 1,
    explanation: "Pulling compound reduces friction and cable damage during installation in long conduit runs."
  },
  {
    id: 12,
    question: "In which environment would steel conduit be preferred over PVC?",
    options: ["Domestic bathroom", "Office building", "Industrial workshop", "Residential loft"],
    correctAnswer: 2,
    explanation: "Industrial workshops require the superior mechanical protection that steel conduit provides against impact damage."
  }
];

const Module3Section1_3: React.FC = () => {
  useSEO(
    "Singles in Conduit or Trunking – Module 3 (3.1.3)",
    "Complete guide to single-core cables in conduit and trunking systems. Installation, cable pulling, fill calculations and BS 7671 compliance."
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Singles in Conduit or Trunking – Module 3 (3.1.3)",
    description:
      "Complete guide to single-core cables in conduit and trunking systems. Installation, cable pulling, fill calculations and BS 7671 compliance.",
    articleSection: "Electrical Installation",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqs = [
    { q: "Can PVC conduit be used outdoors?", a: "Yes, if UV-stabilised and weatherproof fittings are used, but steel conduit or SWA is often preferred for long-term durability." },
    { q: "Is trunking suitable for high-moisture areas?", a: "Only if sealed and rated for moisture ingress protection with appropriate IP ratings." },
    { q: "Can singles be installed without containment?", a: "No — single-core insulated conductors must always be enclosed in suitable containment for protection and compliance." },
    { q: "How do you calculate trunking fill capacity?", a: "Add up individual cable cross-sectional areas and ensure total doesn't exceed 45% of trunking internal area." }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.1
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 3</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 3.1.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Singles in Conduit or Trunking
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding single-core cable systems in protective containment for commercial and industrial applications.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Individual cables (L, N, E) run through protective conduit or trunking for mechanical protection.</li>
                  <li>Steel conduit offers maximum protection; PVC conduit is cost-effective; trunking allows easy access.</li>
                  <li>Excellent for commercial/industrial where cables need protection and future modifications.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Spot:</strong> Individual insulated cables within protective metal or plastic containment.</li>
                  <li><strong>Use:</strong> Commercial buildings, workshops, areas needing mechanical protection or easy access.</li>
                  <li><strong>Check:</strong> Fill capacity limits, support spacing, earthing continuity (steel systems).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li>Describe the construction of a singles-in-conduit or trunking wiring system.</li>
              <li>Identify the differences between PVC and steel containment systems.</li>
              <li>Select appropriate applications for singles in conduit or trunking installations.</li>
              <li>Explain the advantages and limitations of this wiring method.</li>
              <li>Understand installation best practices including cable pulling and fill calculations.</li>
              <li>Apply BS 7671 requirements for support spacing and earthing continuity.</li>
            </ul>
          </section>

          {/* System Components */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              <Wrench className="w-5 h-5" />
              Components of the System
            </h2>
            <div className="space-y-4 text-sm text-white/80">
              <p><strong>Description:</strong> Single-core cables run individually through protective containment, providing excellent mechanical protection and installation flexibility.</p>

              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <p className="font-medium text-white mb-2">Single-Core Cables</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Construction:</strong> Individual PVC-insulated copper conductors</li>
                  <li><strong>Live conductor:</strong> Brown insulation (harmonised colours)</li>
                  <li><strong>Neutral conductor:</strong> Blue insulation</li>
                  <li><strong>Earth conductor:</strong> Green/yellow insulation (not bare like T&E)</li>
                  <li><strong>Standard:</strong> Manufactured to BS 6004 for PVC insulated cables</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/30">
                  <p className="font-medium text-white mb-2">PVC Conduit</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Lightweight and non-corrosive</li>
                    <li>Easy to cut and join</li>
                    <li>Cost-effective solution</li>
                    <li>Available in various diameters</li>
                    <li>Requires separate earth conductor</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <p className="font-medium text-white mb-2">Steel Conduit</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Superior mechanical protection</li>
                    <li>Can act as earth path when bonded</li>
                    <li>Fire resistant properties</li>
                    <li>Requires skilled installation</li>
                    <li>Higher material and labour costs</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <p className="font-medium text-white mb-2">Trunking Systems</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Rectangular cross-section</li>
                    <li>Easy access for maintenance</li>
                    <li>High cable capacity</li>
                    <li>Available in PVC or steel</li>
                    <li>Professional appearance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="ic-system-components"
                question="What colour insulation does the earth conductor have in a singles system?"
                options={["Bare copper", "Green/yellow", "Blue", "Brown"]}
                correctIndex={1}
                explanation="In singles systems, the earth conductor has green/yellow insulation, unlike T&E where the CPC is bare copper."
              />
            </div>
          </section>

          {/* Advantages and Applications */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              <CheckCircle2 className="w-5 h-5" />
              Advantages and Applications
            </h2>
            <div className="space-y-4 text-sm text-white/80">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/30">
                  <p className="font-medium text-white mb-2">Key Advantages</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Excellent mechanical protection, especially steel conduit</li>
                    <li>Professional and neat appearance when properly installed</li>
                    <li>Easy cable additions, removals, or replacements</li>
                    <li>Long service life with proper installation</li>
                    <li>Suitable for harsh industrial environments</li>
                    <li>Good fire resistance properties</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-400/30">
                  <p className="font-medium text-white mb-2">Limitations</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Slower installation compared to surface methods</li>
                    <li>Higher material and labour costs</li>
                    <li>Requires skilled installation for steel systems</li>
                    <li>Cable pulling can be challenging in long runs</li>
                    <li>Planning required for complex routing</li>
                    <li>Fill capacity limitations</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <p className="font-medium text-white mb-2">Typical Applications:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Commercial offices:</strong> Concealed wiring with future flexibility</li>
                    <li><strong>Industrial workshops:</strong> Mechanical protection from machinery</li>
                    <li><strong>Public buildings:</strong> Compliance with building aesthetics</li>
                    <li><strong>Retail premises:</strong> Professional appearance requirements</li>
                  </ul>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Healthcare facilities:</strong> Easy access for modifications</li>
                    <li><strong>Educational buildings:</strong> Vandal-resistant installations</li>
                    <li><strong>Food processing:</strong> Washdown-resistant containment</li>
                    <li><strong>Data centres:</strong> Cable management and segregation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="ic-advantages"
                question="What is a key advantage of singles in trunking over buried T&E cable?"
                options={["Lower cost", "Easier cable changes", "Faster installation", "Less planning needed"]}
                correctIndex={1}
                explanation="Singles in trunking allow easy addition, removal, or replacement of cables without disturbing building structure."
              />
            </div>
          </section>

          {/* Installation Best Practices */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              <Settings className="w-5 h-5" />
              Installation Best Practices
            </h2>
            <div className="space-y-6 text-sm text-white/80">

              {/* Planning and Routing */}
              <div className="space-y-4">
                <h3 className="font-medium text-white">Planning and Routing</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                    <p className="font-medium text-white mb-2">Route Planning</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Minimise the number of bends in long runs</li>
                      <li>Avoid sharp edges that could damage cables</li>
                      <li>Plan access points for cable pulling</li>
                      <li>Consider future cable requirements</li>
                      <li>Maintain minimum bending radii for containment</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/30">
                    <p className="font-medium text-white mb-2">Support Requirements</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>PVC conduit:</strong> Support every 750mm (20mm), 1m (25mm+)</li>
                      <li><strong>Steel conduit:</strong> Support every 1.25m (20mm), 1.5m (25mm+)</li>
                      <li><strong>Trunking:</strong> Support every 1.5m for most sizes</li>
                      <li>Additional support at changes of direction</li>
                      <li>Secure fixings appropriate to building structure</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cable Fill Calculations */}
              <div className="space-y-4">
                <h3 className="font-medium text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Cable Fill Calculations
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                    <p className="font-medium text-white mb-2">Fill Capacity Guidelines</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>General rule:</strong> Maximum 45% fill of internal cross-sectional area</li>
                      <li><strong>Single cable:</strong> Maximum 53% fill for straight pulls</li>
                      <li><strong>Multiple cables:</strong> Reduce to 40% if multiple circuits</li>
                      <li><strong>Calculation:</strong> Sum of cable areas / internal area x 100</li>
                      <li>Always consider heat dissipation requirements</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/30">
                    <p className="font-medium text-white mb-2">Practical Fill Example</p>
                    <p className="mb-2">50mm x 50mm trunking (internal area = 2500mm2):</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Maximum cable area = 2500 x 0.45 = 1125mm2</li>
                      <li>Example: 10 x 2.5mm2 cables = 10 x 8.04mm2 = 80.4mm2</li>
                      <li>Example: 20 x 4.0mm2 cables = 20 x 12.57mm2 = 251.4mm2</li>
                      <li>Always check manufacturer tables for exact cable areas</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cable Pulling Techniques */}
              <div className="space-y-4">
                <h3 className="font-medium text-white flex items-center gap-2">
                  <Cable className="w-4 h-4" />
                  Cable Pulling Techniques
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                    <p className="font-medium text-white mb-2">Preparation and Tools</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Draw tape:</strong> Use proper electrical draw tape</li>
                      <li><strong>Pulling compound:</strong> Reduces friction in long runs</li>
                      <li><strong>Cable socks:</strong> For heavy cables or multiple pulls</li>
                      <li><strong>Swivel connectors:</strong> Prevent cable twisting</li>
                      <li><strong>Pulling eyes:</strong> Secure connection to cables</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-teal-500/10 border border-teal-400/30">
                    <p className="font-medium text-white mb-2">Pulling Procedures</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Install and secure all containment first</li>
                      <li>Thread draw tape through complete route</li>
                      <li>Attach cables with appropriate pulling grip</li>
                      <li>Apply pulling compound to reduce friction</li>
                      <li>Pull steadily without jerking motions</li>
                      <li>Use intermediate pulling points for long runs</li>
                    </ol>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <p className="font-medium text-white mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Cable Pulling Safety:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Never exceed manufacturer&apos;s pulling tension limits</li>
                    <li>Use proper pulling techniques to avoid cable damage</li>
                    <li>Check for sharp edges or burrs in containment</li>
                    <li>Don&apos;t pull cables around sharp bends</li>
                    <li>Inspect cables for damage after pulling</li>
                  </ul>
                </div>
              </div>

              {/* Termination and Testing */}
              <div className="space-y-4">
                <h3 className="font-medium text-white">Termination and Testing</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/30">
                    <p className="font-medium text-white mb-2">Termination Requirements</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Use appropriate cable glands for containment entry</li>
                      <li>Maintain colour coding throughout installation</li>
                      <li>Secure cables to prevent strain on terminals</li>
                      <li>Use proper terminal blocks rated for circuit voltage/current</li>
                      <li>Ensure adequate conductor length for secure connections</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                    <p className="font-medium text-white mb-2">Testing Requirements</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Continuity:</strong> Test all conductors end-to-end</li>
                      <li><strong>Insulation resistance:</strong> Between conductors and earth</li>
                      <li><strong>Earth continuity:</strong> Critical for steel conduit systems</li>
                      <li><strong>Polarity:</strong> Verify correct L-N-E connections</li>
                      <li><strong>RCD testing:</strong> Where applicable to circuits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real-world scenario */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              <Factory className="w-5 h-5" />
              Real-World Scenario: Manufacturing Plant Upgrade
            </h2>
            <div className="space-y-4 text-sm text-white/80">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">The Challenge</p>
                <p>A manufacturing plant needed to replace aging surface-wiring that was frequently damaged by machinery operations:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Existing surface T&E frequently damaged by forklift impacts</li>
                  <li>Production downtime due to electrical faults</li>
                  <li>Need for future circuit modifications as layout changes</li>
                  <li>Health and safety concerns about exposed cables</li>
                  <li>Insurance requirements for improved fire safety</li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-white">Singles in Steel Conduit Solution:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/30">
                    <p className="font-medium text-white mb-2">System Selection</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Steel conduit:</strong> 25mm and 32mm heavy gauge</li>
                      <li><strong>Single cables:</strong> 2.5mm2 and 4.0mm2 600/1000V grade</li>
                      <li><strong>Routing:</strong> Wall-mounted with drop-downs to machines</li>
                      <li><strong>Protection:</strong> Steel conduit acts as additional earth path</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                    <p className="font-medium text-white mb-2">Installation Benefits</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Impact resistance:</strong> Withstands machinery contact</li>
                      <li><strong>Future flexibility:</strong> Easy to add circuits for new equipment</li>
                      <li><strong>Fire safety:</strong> Steel containment improves fire resistance</li>
                      <li><strong>Maintenance:</strong> Individual circuit isolation possible</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Results and Benefits:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Zero electrical damage incidents in first 18 months</li>
                  <li>50% reduction in electrical maintenance downtime</li>
                  <li>Easy reconfiguration when production line was reorganised</li>
                  <li>Improved insurance rating due to enhanced fire safety</li>
                  <li>Professional appearance enhanced workplace environment</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common mistakes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Common Mistakes and How to Avoid Them
            </h2>
            <div className="space-y-4 text-sm text-white/80">
              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <p className="font-medium text-white mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Installation Errors</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Wrong:</strong> Exceeding cable fill capacity in containment</li>
                  <li><strong>Right:</strong> Calculate fill percentage and stay within 45% limit</li>
                  <li><strong>Wrong:</strong> Inadequate support spacing causing sagging</li>
                  <li><strong>Right:</strong> Follow BS 7671 support spacing requirements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <p className="font-medium text-white mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Cable Pulling Mistakes</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Wrong:</strong> Pulling cables around sharp bends without guides</li>
                  <li><strong>Right:</strong> Use proper bending radii and cable guides</li>
                  <li><strong>Wrong:</strong> Exceeding pulling tension limits</li>
                  <li><strong>Right:</strong> Use intermediate pulling points and proper techniques</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Best Practice Tips</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Always test earth continuity in steel conduit systems</li>
                  <li>Use appropriate cable glands for containment entry</li>
                  <li>Label circuits clearly for future maintenance</li>
                  <li>Plan for future capacity requirements during design</li>
                  <li>Use pulling compound for long or difficult cable runs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* BS 7671 Context */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              BS 7671 Context and Compliance
            </h2>
            <div className="space-y-4 text-sm text-white/80">
              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <p className="font-medium text-white mb-2">Cable Selection and Installation (Chapter 52)</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Singles must be contained in appropriate enclosures</li>
                  <li>Consider environmental conditions for containment selection</li>
                  <li>Apply derating factors for multiple cables in same containment</li>
                  <li>Ensure adequate current-carrying capacity with grouping effects</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/30">
                <p className="font-medium text-white mb-2">Support and Fixing (Section 522)</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Containment must be adequately supported at prescribed intervals</li>
                  <li>Avoid excessive stress on cables during and after installation</li>
                  <li>Provide additional support at changes of direction</li>
                  <li>Use appropriate fixings for the building structure type</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <p className="font-medium text-white mb-2">Earthing and Bonding (Chapter 54)</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Steel conduit can form part of the earthing system when properly bonded</li>
                  <li>Ensure continuity of earthing throughout the installation</li>
                  <li>Test earth loop impedance values for protective device operation</li>
                  <li>Maintain earth conductor identification throughout system</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-400/50" role="alert">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                  <p className="text-white/80">Isolate, lock-off and prove dead before work. Follow manufacturer instructions and BS 7671 requirements for all singles installations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <ul className="space-y-3 text-sm text-white/80">
              {faqs.map((f, i) => (
                <li key={i} className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <p className="font-medium text-white mb-1">{f.q}</p>
                  <p className="text-white/70">{f.a}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Quick Knowledge Check */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Quick Knowledge Check
            </h2>
            <div className="space-y-6">
              {quickCheckQuestions.map((q) => (
                <InlineCheck
                  key={q.id}
                  id={`quick-check-${q.id}`}
                  question={q.question}
                  options={q.options}
                  correctIndex={q.correctAnswer}
                  explanation={q.explanation}
                />
              ))}
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Section Quiz
            </h2>
            <Quiz questions={quizQuestions as any} title="Singles in Conduit and Trunking Knowledge Check" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Twin and Earth Cable
              </Link>
            </Button>
            <Button
              className="min-h-[48px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-4">
                Next: Cable Selection Factors
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>

          {/* Structured data */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        </div>
      </article>
    </div>
  );
};

export default Module3Section1_3;
