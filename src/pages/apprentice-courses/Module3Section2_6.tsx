import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Paperclip,
  AlertTriangle,
  Factory,
  Home,
  Shield,
  Building,
  Target,
  Scissors,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "twin-earth-clip",
    question: "Which fixing is commonly used for securing Twin and Earth cable to a wall?",
    options: [
      "Round cable clip",
      "Flat twin clip",
      "Metal cleat",
    ],
    correctIndex: 1,
    explanation:
      "Flat twin clips are specifically designed to secure the profile of Twin and Earth cable flat against walls and surfaces.",
  },
  {
    id: "fire-resistant-requirement",
    question: "True or False: Plastic cable clips are acceptable as the only fixing method in escape routes.",
    options: [
      "True",
      "False",
    ],
    correctIndex: 1,
    explanation:
      "False. BS 7671 18th Edition requires non-combustible fixings in escape routes to prevent cables falling during a fire.",
  },
  {
    id: "swa-fixing",
    question: "Which fixing is best for securing large SWA cables?",
    options: [
      "Plastic clip",
      "Cable cleat or saddle",
      "Adhesive pad",
    ],
    correctIndex: 1,
    explanation:
      "Cable cleats or saddles provide the mechanical strength needed to secure heavy armoured cables safely.",
  },
  {
    id: "corrosive-environment",
    question: "Which material is best for fixings in corrosive or damp environments?",
    options: [
      "Mild steel",
      "Stainless steel",
      "PVC",
    ],
    correctIndex: 1,
    explanation:
      "Stainless steel provides excellent corrosion resistance in damp or chemically aggressive environments.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which fixing is commonly used for securing Twin and Earth cable to a wall?",
    options: [
      "Round cable clip",
      "Flat twin clip",
      "Metal cleat",
      "Cable tie",
    ],
    correctAnswer: 1,
    explanation:
      "Flat twin clips are specifically designed to secure the flat profile of Twin and Earth cable against walls and surfaces.",
  },
  {
    id: 2,
    question: "Which fixing is best for securing large SWA cables?",
    options: [
      "Plastic clip",
      "Nylon tie",
      "Cable cleat or saddle",
      "Adhesive pad",
    ],
    correctAnswer: 2,
    explanation:
      "Cable cleats or saddles provide the mechanical strength and support needed for heavy steel wire armoured cables.",
  },
  {
    id: 3,
    question: "True or False: Plastic cable clips are acceptable as the only fixing method in escape routes.",
    options: [
      "True",
      "False",
    ],
    correctAnswer: 1,
    explanation:
      "False. BS 7671 18th Edition requires non-combustible fixings in escape routes to prevent cables falling during a fire.",
  },
  {
    id: 4,
    question: "What is the main reason for using non-combustible fixings in escape routes?",
    options: [
      "They are cheaper",
      "To prevent cables falling and obstructing escape routes during a fire",
      "They look more professional",
      "They are easier to install",
    ],
    correctAnswer: 1,
    explanation:
      "Non-combustible fixings prevent cables from falling and blocking escape routes when plastic fixings melt in a fire.",
  },
  {
    id: 5,
    question: "Name one type of cable tie that can be used in high-temperature environments.",
    options: [
      "Nylon tie",
      "Plastic tie",
      "Stainless steel tie",
      "Paper tie",
    ],
    correctAnswer: 2,
    explanation:
      "Stainless steel ties maintain their strength and integrity in high-temperature environments where plastic ties would fail.",
  },
  {
    id: 6,
    question: "Which material is best for fixings in corrosive or damp environments?",
    options: [
      "Mild steel",
      "Stainless steel",
      "PVC",
      "Aluminium",
    ],
    correctAnswer: 1,
    explanation:
      "Stainless steel provides excellent corrosion resistance making it ideal for damp or chemically aggressive environments.",
  },
  {
    id: 7,
    question: "Why should cable ties not be over-tightened?",
    options: [
      "They're expensive",
      "They can damage cable insulation",
      "They may cause cables to overheat",
      "They make the cable too flexible",
    ],
    correctAnswer: 1,
    explanation:
      "Over-tightening cable ties can cut into or damage cable insulation, potentially causing electrical faults or safety hazards.",
  },
  {
    id: 8,
    question: "Give one example of a fixing suitable for conduit systems.",
    options: [
      "Flat twin clip",
      "Saddles, brackets, or conduit clips",
      "Cable ties only",
      "Adhesive strips",
    ],
    correctAnswer: 1,
    explanation:
      "Saddles, brackets, and purpose-made conduit clips provide proper mechanical support for conduit systems.",
  },
];

const Module3Section2_6: React.FC = () => {
  console.log("Module3Section2_6 component loaded");
  
  useSEO(
    "Fixings, Clips and Cable Ties – Module 3 (3.2.6)",
    "Complete guide to cable fixings, clips and ties. Fire-resistant support requirements, selection criteria and BS 7671 compliance."
  );

  const faqs = [
    {
      q: "Are stainless steel cable ties always necessary?",
      a: "No — they are typically used in high-temperature or corrosive environments, but other metal fixings may be suitable for standard indoor work.",
    },
    {
      q: "Can I still use plastic clips?",
      a: "Yes, but in escape routes they must be supplemented with non-combustible supports to meet BS 7671 fire-resistant requirements.",
    },
    {
      q: "What's the spacing for cable fixings?",
      a: "Depends on cable size and type — always follow BS 7671 guidance and manufacturer's recommendations. Typically 400mm for horizontal, 600mm for vertical runs.",
    },
    {
      q: "Do I need different fixings for outdoor installations?",
      a: "Yes — use UV-resistant materials and consider thermal expansion. Stainless steel or galvanised fixings are preferred for weather exposure.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Paperclip className="w-6 h-6 text-white" />
            </div>
            <Badge
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow"
            >
              Section 3.2.6
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Fixings, Clips and Cable Ties
          </h1>
          <p className="text-white">
            Essential cable support components, fire-resistant requirements and best practices for secure electrical installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cable fixings: Essential for secure, compliant installations preventing cable damage.</li>
                <li>Fire-resistant: BS 7671 18th Edition requires non-combustible fixings in escape routes.</li>
                <li>Selection criteria: Cable type, environment, load requirements and corrosion resistance.</li>
                <li>Best practice: Correct spacing, proper tensioning and material compatibility.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> White plastic clips (T&E), metal cleats (SWA), cable ties (grouping).
                </li>
                <li>
                  <strong>Use:</strong> Match fixing to cable type, environment and fire safety requirements.
                </li>
                <li>
                  <strong>Check:</strong> Spacing intervals, material suitability, fire-resistant compliance.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify common types of cable fixings and supports for different cable types and applications.</li>
            <li>Select appropriate fixing methods for different environments including corrosive and outdoor conditions.</li>
            <li>Explain the fire-resistant support requirements introduced in BS 7671 18th Edition.</li>
            <li>Apply best practice when using clips, ties and supports including spacing and tensioning.</li>
            <li>Understand material selection criteria for longevity and compliance in various environments.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Common Fixing Types */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Common Fixing Types and Applications
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Cable Clips</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Types and Applications</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Flat twin clips: Designed for T&E cable profile</li>
                        <li>Round clips: For circular cables (1.5-25mm diameter)</li>
                        <li>Specialist profiles: Oval, figure-8, multi-gang</li>
                        <li>Available in plastic, metal or fire-resistant materials</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Installation Considerations</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Spacing: 400mm horizontal, 600mm vertical typical</li>
                        <li>Avoid over-compression of cable insulation</li>
                        <li>Use appropriate wall plugs for substrate type</li>
                        <li>Maintain neat, evenly spaced appearance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Saddles and Cleats</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-green-200 mb-1">Heavy-Duty Applications</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>SWA cable support up to 95mm diameter</li>
                        <li>Metal construction: galvanised or stainless steel</li>
                        <li>Heavy-duty plastic for indoor light loads</li>
                        <li>Bolt or screw fixing to structure</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-200 mb-1">Spacing and Loading</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>Spacing per cable weight and manufacturer tables</li>
                        <li>Additional support at direction changes</li>
                        <li>Consider cable thermal expansion effects</li>
                        <li>Prevent cable abrasion at fixing points</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Cable Ties</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-purple-200 mb-1">Types and Materials</p>
                      <ul className="list-disc pl-4 space-y-1 text-purple-200">
                        <li>Nylon: Standard indoor applications (-40°C to +85°C)</li>
                        <li>Stainless steel: High temperature and fire resistance</li>
                        <li>Coated variants: UV resistance for outdoor use</li>
                        <li>Releasable: For temporary or maintenance access</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-purple-200 mb-1">Application Guidelines</p>
                      <ul className="list-disc pl-4 space-y-1 text-purple-200">
                        <li>Bundle sizing: Leave 10-15% expansion space</li>
                        <li>Tension: Firm but not cutting into cable sheath</li>
                        <li>Fire areas: Use metal ties or fire-resistant types</li>
                        <li>Trim excess length to prevent snagging</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Containment Fixings</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-orange-200 mb-1">Conduit and Trunking Support</p>
                      <ul className="list-disc pl-4 space-y-1 text-orange-200">
                        <li>Saddles: Most common for round conduit</li>
                        <li>Brackets: L-shaped for trunking systems</li>
                        <li>Spacer bars: Multiple parallel runs</li>
                        <li>Spring clips: Quick-fit for smaller conduit</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-orange-200 mb-1">Installation Standards</p>
                      <ul className="list-disc pl-4 space-y-1 text-orange-200">
                        <li>Spacing per BS 7671 and manufacturer guidance</li>
                        <li>Load calculations include contained cables</li>
                        <li>Thermal expansion allowances required</li>
                        <li>Access for inspection and maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* What this means on site */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" /> What this means on site
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-orange-200 mb-2">Fire-resistant support requirements (BS 7671 18th Edition)</p>
                <ul className="list-disc pl-4 space-y-1 text-orange-200">
                  <li>All wiring systems in escape routes must use non-combustible fixings</li>
                  <li>Plastic clips and ties alone are not acceptable in these critical areas</li>
                  <li>Metal clips, steel cable ties or combined fixings with fire-resistant anchors required</li>
                  <li>Prevents cables falling and obstructing escape routes during fire incidents</li>
                  <li>Regular inspection ensures continued compliance over installation life</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium text-cyan-200 mb-2">Environmental selection criteria</p>
                <ul className="list-disc pl-4 space-y-1 text-cyan-200">
                  <li>Indoor standard: Nylon or PVC suitable for most applications</li>
                  <li>Outdoor/UV exposure: Use UV-stabilised materials or metal fixings</li>
                  <li>Corrosive environments: Stainless steel (316 grade) for chemical resistance</li>
                  <li>High temperature: Metal fixings rated for expected temperatures</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Best Practices */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Best Practices for Installation and Selection
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <p className="font-medium text-emerald-200 mb-2">Selection and sizing guidelines</p>
                <ul className="list-disc pl-4 space-y-1 text-emerald-200">
                  <li><strong>Load rating:</strong> Choose fixings rated for cable weight plus 50% safety margin</li>
                  <li><strong>Cable diameter:</strong> Clips should accommodate cable without compression</li>
                  <li><strong>Bundle sizing:</strong> Cable ties sized for maximum anticipated cable bundle</li>
                  <li><strong>Environmental factors:</strong> Temperature range, UV exposure, chemical compatibility</li>
                  <li><strong>Future access:</strong> Consider maintenance and modification requirements</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
                <p className="font-medium text-violet-200 mb-2">Installation best practices</p>
                <ul className="list-disc pl-4 space-y-1 text-violet-200">
                  <li>Pre-plan fixing positions using measuring tape and level for neat appearance</li>
                  <li>Use appropriate wall plugs matched to substrate (masonry, plasterboard, steel)</li>
                  <li>Avoid over-tightening which can damage cable insulation or create stress points</li>
                  <li>Maintain consistent spacing intervals per BS 7671 recommendations</li>
                  <li>Group cables logically and secure with appropriately sized ties</li>
                  <li>Trim cable tie tails to prevent snagging and maintain professional finish</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
                <p className="font-medium text-indigo-200 mb-2">Quality and compliance checks</p>
                <ul className="list-disc pl-4 space-y-1 text-indigo-200">
                  <li>Verify fixing security: should support cable weight without movement</li>
                  <li>Check cable freedom: cables should move naturally without binding at fixings</li>
                  <li>Inspect for damage: no visible compression, cutting or abrasion of cable sheath</li>
                  <li>Confirm fire compliance: non-combustible fixings in escape routes verified</li>
                  <li>Document materials used: maintain records for inspection and maintenance</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* Common Mistakes */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Common Mistakes to Avoid
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-red-200 mb-2">Installation errors</p>
                <ul className="list-disc pl-4 space-y-1 text-red-200">
                  <li><strong>Over-tightening fixings:</strong> Compressing cable insulation causing potential failure points</li>
                  <li><strong>Incorrect spacing:</strong> Too wide spacing allowing cable sag and potential damage</li>
                  <li><strong>Wrong clip size:</strong> Using clips too small or large for cable diameter</li>
                  <li><strong>Poor substrate fixing:</strong> Inadequate wall plugs leading to fixing failure over time</li>
                  <li><strong>Mixed materials:</strong> Galvanic corrosion from incompatible metal combinations</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium text-amber-200 mb-2">Compliance and safety oversights</p>
                <ul className="list-disc pl-4 space-y-1 text-amber-200">
                  <li><strong>Fire regulation non-compliance:</strong> Using plastic-only fixings in escape routes</li>
                  <li><strong>Environmental unsuitability:</strong> Standard fixings in corrosive or outdoor environments</li>
                  <li><strong>Inadequate support:</strong> Insufficient fixings for cable weight and span requirements</li>
                  <li><strong>Future access blocking:</strong> Fixing cables in ways that prevent maintenance access</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[3]} />
          <Separator className="my-6" />

          {/* BS 7671 Context */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> BS 7671 and Standards Context
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-blue-200 mb-2">18th Edition fire-resistant requirements</p>
                <ul className="list-disc pl-4 space-y-1 text-blue-200">
                  <li><strong>521.10.201:</strong> Cable supports in escape routes must be fire-resistant</li>
                  <li><strong>521.10.202:</strong> Non-combustible materials required for support systems</li>
                  <li><strong>Definition of escape routes:</strong> Corridors, stairwells, designated emergency egress</li>
                  <li><strong>Compliance verification:</strong> Regular inspection and testing of support integrity</li>
                  <li><strong>Documentation:</strong> Records of materials used and installation compliance</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-green-200 mb-2">Cable support spacing requirements</p>
                <ul className="list-disc pl-4 space-y-1 text-green-200">
                  <li>Table 4A3: Support spacing for cables not in conduit or trunking</li>
                  <li>Horizontal runs: Maximum spacing based on cable diameter and type</li>
                  <li>Vertical runs: Closer spacing to prevent cable weight stress</li>
                  <li>Direction changes: Additional support within 300mm of bends</li>
                  <li>Termination support: Strain relief near connection points</li>
                </ul>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-purple-200 mb-2">Material and environmental standards</p>
                <ul className="list-disc pl-4 space-y-1 text-purple-200">
                  <li>BS EN 61537: Cable management systems including support requirements</li>
                  <li>IP ratings: Protection levels for different environmental exposures</li>
                  <li>Material certifications: Fire resistance ratings and temperature limitations</li>
                  <li>Corrosion resistance: Standards for different environmental conditions</li>
                  <li>UV stability: Requirements for outdoor and sunlight exposure applications</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Building className="w-5 h-5" /> Real-world Scenario
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30">
            <h3 className="font-medium text-slate-200 mb-2">Post-fire inspection compliance failure</h3>
            <p className="text-slate-200 text-sm mb-3">
              During a post-fire inspection of an apartment block, it was found that plastic-only cable fixings 
              in escape routes had melted, causing cables to hang down and obstruct stairs, creating hazards 
              for both residents and emergency responders.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-slate-200 mb-2">Original installation problems</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-200">
                  <li>Standard plastic clips used throughout building</li>
                  <li>No differentiation between escape routes and other areas</li>
                  <li>Cables collapsed blocking stairwell access</li>
                  <li>Emergency services hindered during evacuation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-slate-200 mb-2">Compliant replacement solution</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-200">
                  <li>Metal cable clips throughout escape routes</li>
                  <li>Stainless steel cable ties for bundled cables</li>
                  <li>Fire-resistant anchoring systems used</li>
                  <li>Regular inspection schedule implemented</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-elec-yellow/50 pl-4">
                <p className="font-medium text-white mb-1">Q: {faq.q}</p>
                <p className="text-white text-sm">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-3 text-xs sm:text-sm text-white">
            <p>
              <strong>Cable fixings</strong> are essential components that ensure cables remain secure, compliant and safe throughout their service life.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Fire resistance</strong> is now critical - BS 7671 18th Edition requires non-combustible fixings in escape routes</li>
              <li><strong>Material selection</strong> must consider environment, load, temperature and corrosion factors</li>
              <li><strong>Installation quality</strong> affects both safety and professional appearance of electrical work</li>
              <li><strong>Spacing and tensioning</strong> must follow manufacturer guidance and BS 7671 requirements</li>
              <li><strong>Regular inspection</strong> ensures continued compliance and identifies potential problems early</li>
            </ul>
            <p>
              Proper selection and installation of fixings, clips and ties prevents cable damage, ensures regulatory 
              compliance and maintains the integrity of electrical installations under all conditions.
            </p>
          </div>
        </Card>

        {/* Apprentice Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Apprentice Do's and Don'ts</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <h3 className="font-medium text-green-200 mb-3">✓ DO</h3>
              <ul className="space-y-2 text-green-200">
                <li>• Use non-combustible fixings in escape routes and fire-rated areas</li>
                <li>• Select materials appropriate for environmental conditions</li>
                <li>• Follow manufacturer's spacing recommendations and BS 7671 guidance</li>
                <li>• Choose clip size to accommodate cable without compression</li>
                <li>• Use proper wall plugs matched to substrate material</li>
                <li>• Maintain neat, evenly spaced fixing patterns</li>
                <li>• Allow for thermal expansion in long cable runs</li>
                <li>• Document materials used for compliance records</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-medium text-red-200 mb-3">✗ DON'T</h3>
              <ul className="space-y-2 text-red-200">
                <li>• Use plastic-only fixings in escape routes or fire areas</li>
                <li>• Over-tighten clips or ties that compress cable insulation</li>
                <li>• Exceed recommended spacing intervals for cable support</li>
                <li>• Mix incompatible metals that may cause galvanic corrosion</li>
                <li>• Use standard fixings in corrosive or outdoor environments</li>
                <li>• Install fixings that block future maintenance access</li>
                <li>• Leave long cable tie tails that create snagging hazards</li>
                <li>• Ignore manufacturer's load ratings for fixing selection</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Card: Cable Fixing Quick Reference</h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs">
            <div className="rounded-lg p-3 border border-border/30">
              <h4 className="font-medium text-blue-200 mb-2">Standard Clips</h4>
              <ul className="space-y-1 text-blue-200">
                <li>• T&E: Flat twin clips</li>
                <li>• Round: Circular clips</li>
                <li>• Spacing: 400mm horiz, 600mm vert</li>
                <li>• Material: Match environment</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 border border-green-400/30">
              <h4 className="font-medium text-green-200 mb-2">Heavy Duty</h4>
              <ul className="space-y-1 text-green-200">
                <li>• SWA: Cable cleats/saddles</li>
                <li>• Metal construction preferred</li>
                <li>• Load rated fixings essential</li>
                <li>• Thermal expansion allowance</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 border border-border/30">
              <h4 className="font-medium text-purple-200 mb-2">Fire Areas</h4>
              <ul className="space-y-1 text-purple-200">
                <li>• Non-combustible fixings only</li>
                <li>• Metal clips/stainless ties</li>
                <li>• Escape routes critical</li>
                <li>• BS 7671 521.10.201 compliance</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <p className="text-yellow-200 text-xs">
              <strong>Critical check:</strong> Fire areas need non-combustible fixings. Check environment for corrosion 
              resistance. Never over-tighten - damage to cable insulation creates safety hazards.
            </p>
          </div>
        </Card>

        {/* Key References */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Key References</h2>
          <div className="space-y-2 text-xs sm:text-sm text-white">
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>BS 7671:2018+A2:2022</span>
              <span className="text-white">IET Wiring Regulations (521.10.201-202)</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>BS EN 61537:2006</span>
              <span className="text-white">Cable management systems</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>Building Regulations Part B</span>
              <span className="text-white">Fire safety requirements</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>BS EN 60529:1992</span>
              <span className="text-white">IP protection ratings</span>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="p-6 bg-transparent border-white/20">
          <Quiz title="Test Your Knowledge: Fixings, Clips and Cable Ties" questions={quizQuestions} />
        </Card>
      </main>
    </div>
  );
};

export default Module3Section2_6;