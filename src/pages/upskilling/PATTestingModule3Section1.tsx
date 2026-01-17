import { ArrowLeft, Cable, CheckCircle, Eye, HelpCircle, Lightbulb, AlertTriangle, Bookmark, ChevronRight, ChevronLeft, Search, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable and Plug Damage Checks - PAT Testing Course";
const DESCRIPTION = "Learn systematic visual inspection techniques for cables and plugs in PAT testing. Identify damage, wear, and safety hazards before electrical testing.";

const quickCheckQuestions = [
  {
    id: "m3s1-qc1",
    question: "What percentage of electrical faults can typically be detected through visual inspection alone?",
    options: [
      "About 25%",
      "About 50%",
      "About 75% or more",
      "Less than 10%"
    ],
    correctIndex: 2,
    explanation: "Visual inspection is extremely effective - around 75% or more of electrical faults and hazards can be identified simply by careful visual examination. This is why it's the first and arguably most important stage of PAT testing."
  },
  {
    id: "m3s1-qc2",
    question: "What is the purpose of a cable's strain relief (cord grip)?",
    options: [
      "To make the plug easier to remove",
      "To prevent the cable cores from being pulled out of the terminals",
      "To improve the appearance of the plug",
      "To reduce electrical resistance"
    ],
    correctIndex: 1,
    explanation: "The strain relief (cord grip) prevents mechanical stress on the cable from being transferred to the internal connections. Without proper strain relief, pulling on the cable could disconnect the conductors from the terminals, creating a serious hazard."
  },
  {
    id: "m3s1-qc3",
    question: "Which type of damage to a cable sheath should result in immediate failure?",
    options: [
      "Minor scuff marks on the outer sheath",
      "Slight discolouration near the plug",
      "Any damage exposing the inner conductor insulation or conductors",
      "Dust accumulation on the cable"
    ],
    correctIndex: 2,
    explanation: "Any damage that exposes the inner conductor insulation (basic insulation) or the conductors themselves is a serious safety hazard. The outer sheath provides both mechanical and electrical protection - once breached, the cable cannot be considered safe."
  }
];

const quizQuestions = [
  {
    question: "What should you check FIRST when performing a visual inspection of an appliance?",
    options: [
      "The rating plate information",
      "That the appliance is disconnected from the supply",
      "The condition of the plug pins",
      "The fuse rating"
    ],
    correctAnswer: 1
  },
  {
    question: "Which of these is NOT a sign of overheating in a plug?",
    options: [
      "Discolouration or browning of the plastic",
      "A slight film of dust on the pins",
      "Melted or deformed plastic",
      "Burn marks around the fuse carrier"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the correct fuse rating for a 2000W appliance at 230V?",
    options: [
      "3A",
      "5A",
      "10A",
      "13A"
    ],
    correctAnswer: 3
  },
  {
    question: "How far should cable sheath extend into a plug?",
    options: [
      "It doesn't need to enter the plug",
      "Just past the cord grip",
      "At least 50mm inside",
      "Right up to the terminals"
    ],
    correctAnswer: 1
  },
  {
    question: "What defect would cause you to fail a moulded plug?",
    options: [
      "Slight discolouration with age",
      "Manufacturer's name slightly faded",
      "Visible crack in the plug body",
      "BS 1363 marking partially worn"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the minimum acceptable insulation length on conductors inside a rewireable plug?",
    options: [
      "No insulation needed at the terminal",
      "5mm of exposed conductor maximum",
      "Insulation should reach right to the terminal with minimal bare conductor",
      "At least 10mm of bare conductor required"
    ],
    correctAnswer: 2
  },
  {
    question: "Which cable type is most susceptible to damage in industrial environments?",
    options: [
      "Heavy rubber-sheathed (H07RN-F)",
      "Light PVC flat flex",
      "Braided cable",
      "Armoured cable"
    ],
    correctAnswer: 1
  },
  {
    question: "What should you check at the point where the cable enters the appliance?",
    options: [
      "Only the colour of the cable",
      "Strain relief, damage, and secure anchorage",
      "That the cable is long enough",
      "The manufacturer's logo"
    ],
    correctAnswer: 1
  },
  {
    question: "How should plug pins appear on a well-maintained appliance?",
    options: [
      "Dull grey with slight oxidation",
      "Bright and shiny with no damage, pitting, or burn marks",
      "Black with carbon deposits",
      "Bent slightly for better contact"
    ],
    correctAnswer: 1
  },
  {
    question: "What action should you take if you find minor damage during visual inspection?",
    options: [
      "Ignore it if the electrical tests pass",
      "Make a note but pass the appliance",
      "Repair or replace before electrical testing proceeds",
      "Only fail if the user complains"
    ],
    correctAnswer: 2
  }
];

const faqs = [
  {
    q: "Can I test an appliance that fails visual inspection?",
    a: "You should not proceed with electrical testing on an appliance that fails visual inspection. Visual defects often indicate underlying problems that could be dangerous during testing (e.g., exposed conductors could cause electric shock when test voltages are applied). Additionally, passing electrical tests on a visually defective item gives false confidence - the appliance is still unsafe regardless of test results."
  },
  {
    q: "What tools do I need for visual inspection?",
    a: "Essential tools include: a bright torch/flashlight for illuminating dark areas, a magnifying glass for detailed inspection, a screwdriver for opening rewireable plugs (insulated, appropriate size), and optionally a small mirror for viewing awkward angles. Some testers also use a UV torch to spot repairs or contamination. Always ensure the appliance is disconnected before inspection."
  },
  {
    q: "How do I inspect a moulded plug that I cannot open?",
    a: "For moulded (non-rewireable) plugs, focus on external indicators: check for cracks, chips, or damage to the body; examine the cable entry point for damage or strain; inspect pins for damage, burning, or corrosion; look for discolouration indicating overheating; and verify BS 1363 marking is present. If internal problems are suspected but not visible, the appliance should be failed."
  },
  {
    q: "What's the difference between flex and cable damage severity?",
    a: "Damage severity is judged by depth: Surface marks on outer sheath only (cosmetic, usually acceptable); Cuts through outer sheath exposing inner insulation (fail - repair required); Cuts exposing bare conductor (immediate fail - serious hazard). Also consider location - damage near flex entry points or bends is more concerning as it may indicate ongoing stress."
  },
  {
    q: "Should I fail appliances with non-standard cable colours?",
    a: "Not necessarily. While current UK standard is brown (L), blue (N), green/yellow (E), older appliances may have red (L), black (N), green (E). Foreign appliances may have other colour codes. The key is that connections are correct for the colour code used. However, mixed colour codes (e.g., partially rewired) should be investigated as they indicate potentially unsafe modifications."
  },
  {
    q: "How often should visual inspection be performed versus full PAT testing?",
    a: "Visual inspection should be performed more frequently than full electrical testing. IET guidance suggests user checks (basic visual inspection) before each use, with formal visual inspections at shorter intervals than combined inspection and testing. For example, in an office, formal visual inspection might be every 2 years while full PAT testing is every 4 years. Higher-risk environments require more frequent inspection."
  }
];

const PATTestingModule3Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/study-centre/upskilling/pat-testing-module-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-white/70 hover:text-elec-yellow hover:bg-white/5 -ml-2 touch-manipulation active:scale-95 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Module 3</span>
            </Button>
          </Link>
          <span className="text-xs font-medium text-elec-yellow bg-elec-yellow/10 px-2.5 py-1 rounded-full">
            Section 1 of 5
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8 pb-24">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-elec-yellow mb-3">
            <Cable className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Module 3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            Cable and Plug Damage Checks
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Visual inspection fundamentals for safe PAT testing
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">In 30 Seconds</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Visual inspection catches 75%+ of faults. Check cables for cuts, crushing, and heat damage. Inspect plugs for cracks, loose connections, and correct fusing.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-white/70" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">Spot It / Use It</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Run the full length of every cable through your hands. Feel for bulges, cuts, and damage that might not be immediately visible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-elec-yellow" />
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Perform systematic cable visual inspection",
              "Identify plug damage and safety hazards",
              "Check strain relief and cable anchoring",
              "Assess terminal connections and wiring",
              "Determine pass/fail criteria for visual defects",
              "Document findings accurately"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 01: Why Visual Inspection Matters */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Why Visual Inspection Matters</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Visual inspection is the foundation of PAT testing and arguably the most important stage. Research consistently shows that <strong className="text-white">around 75% of electrical defects</strong> can be identified through careful visual examination alone.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-elec-yellow" />
                Key Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold text-elec-yellow">75%+</p>
                  <p className="text-white/60 text-sm">Faults found visually</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold text-elec-yellow">95%</p>
                  <p className="text-white/60 text-sm">Of damaged cables visible</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold text-elec-yellow">#1</p>
                  <p className="text-white/60 text-sm">Cause of PAT failures</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Why Visual Comes First</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Safety</strong> - Identifies hazards that could make electrical testing dangerous</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Efficiency</strong> - No point electrically testing a clearly damaged item</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Completeness</strong> - Some hazards don't show up in electrical tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Documentation</strong> - Provides evidence of thorough assessment</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold text-sm">Important Safety Note</h4>
                  <p className="text-white/70 text-sm mt-1">
                    Always ensure the appliance is <strong className="text-white">disconnected from the mains supply</strong> before performing any inspection. Never rely solely on the appliance being switched off - physically unplug it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Cable Inspection Techniques */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Cable Inspection Techniques</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Cables are the most commonly damaged component of portable appliances. A systematic inspection approach ensures nothing is missed.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">The Full-Length Check</h3>
              <p className="text-sm mb-3">
                Run the entire cable through your hands, from plug to appliance. This tactile inspection reveals damage that may not be immediately visible:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Start at the plug</p>
                    <p className="text-white/60 text-sm">Check cable entry, strain relief, and the first 100mm carefully</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Run through hands</p>
                    <p className="text-white/60 text-sm">Feel for cuts, bulges, soft spots, or internal damage</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Examine visually as you go</p>
                    <p className="text-white/60 text-sm">Look for discolouration, cuts, crushing, abrasion</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow text-xs font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">End at appliance entry</p>
                    <p className="text-white/60 text-sm">Check entry grommet, strain relief, and surrounding area</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Types of Cable Damage</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-sm">FAIL - Immediate Hazards</h4>
                  <ul className="text-white/70 text-sm mt-2 space-y-1">
                    <li>• Exposed conductors (bare wires visible)</li>
                    <li>• Cuts through outer sheath exposing inner insulation</li>
                    <li>• Severe crushing or flattening</li>
                    <li>• Heat damage (melted, deformed, or charred)</li>
                    <li>• Taped repairs (any tape on cable)</li>
                    <li>• Joins or splices in the cable</li>
                  </ul>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <h4 className="text-amber-400 font-semibold text-sm">INVESTIGATE - Potential Issues</h4>
                  <ul className="text-white/70 text-sm mt-2 space-y-1">
                    <li>• Deep scuff marks or abrasion</li>
                    <li>• Kinks or tight bends (may indicate internal damage)</li>
                    <li>• Discolouration not from heat</li>
                    <li>• Softened or sticky areas on sheath</li>
                    <li>• Excessive cable length (trip hazard)</li>
                  </ul>
                </div>
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-semibold text-sm">PASS - Acceptable Condition</h4>
                  <ul className="text-white/70 text-sm mt-2 space-y-1">
                    <li>• Minor surface marks that don't penetrate sheath</li>
                    <li>• Slight discolouration with age (not heat-related)</li>
                    <li>• Normal wear consistent with use</li>
                    <li>• Manufacturer's markings faded but cable intact</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">High-Risk Areas on Cables</h3>
              <p className="text-sm mb-3 text-white/70">
                Pay extra attention to these locations where damage most commonly occurs:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium text-sm">Near the plug</p>
                  <p className="text-white/60 text-xs">Stress from pulling, bending during use</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium text-sm">Near appliance entry</p>
                  <p className="text-white/60 text-xs">Movement stress, often carried by cable</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium text-sm">Along floor/edges</p>
                  <p className="text-white/60 text-xs">Crushing, abrasion, wheeled traffic</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium text-sm">Any tight bends</p>
                  <p className="text-white/60 text-xs">Stress concentration, conductor fatigue</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Plug Inspection */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Plug Inspection</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Plugs are the interface between the appliance and the mains supply. A damaged or incorrectly wired plug is one of the most common causes of electrical accidents.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">External Plug Inspection (All Plug Types)</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Plug body condition</p>
                    <p className="text-white/60 text-sm">Check for cracks, chips, damage, discolouration from overheating</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Pin condition</p>
                    <p className="text-white/60 text-sm">Bright, undamaged, no bending, pitting, or burn marks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Cable entry</p>
                    <p className="text-white/60 text-sm">Secure grip, no damage, cable not pulled through</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">BS 1363 marking</p>
                    <p className="text-white/60 text-sm">Should be present on all UK standard plugs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Moulded Plugs vs Rewireable Plugs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-2">Moulded Plugs</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Factory-fitted, cannot be opened</li>
                    <li>• Generally more reliable</li>
                    <li>• Inspect externally only</li>
                    <li>• If damaged, replace entire cable</li>
                    <li>• Check for correct fuse (may be visible)</li>
                  </ul>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-2">Rewireable Plugs</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Can be opened for inspection</li>
                    <li>• Check internal wiring quality</li>
                    <li>• Verify correct connections</li>
                    <li>• Assess terminal tightness</li>
                    <li>• Check fuse rating and type</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Inside a Rewireable Plug</h3>
              <p className="text-sm mb-3 text-white/70">
                When inspecting an opened rewireable plug, check these critical points:
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Correct connections</p>
                  <p className="text-white/60 text-sm">Brown to Live (bottom right), Blue to Neutral (bottom left), Green/Yellow to Earth (top). Remember: <strong className="text-white">"BLue to the Left, BRown to the Right"</strong></p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Cable grip (strain relief)</p>
                  <p className="text-white/60 text-sm">Outer sheath must be held securely. Grip should be on the sheath, not the inner cores.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Correct conductor lengths</p>
                  <p className="text-white/60 text-sm">Earth longest (first out in a pull), Live shortest (last to disconnect). No excessive slack.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Terminal condition</p>
                  <p className="text-white/60 text-sm">Terminals tight, no loose strands, minimal bare conductor visible, no damage from overtightening.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Fuse</p>
                  <p className="text-white/60 text-sm">Correct rating for appliance (3A or 13A), proper BS 1362 fuse, securely fitted.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold text-sm">Common Plug Faults (Immediate Fail)</h4>
                  <ul className="text-white/70 text-sm mt-2 space-y-1">
                    <li>• Cracked or damaged plug body</li>
                    <li>• Burnt, pitted, or bent pins</li>
                    <li>• Wrong colour wire to terminal</li>
                    <li>• Outer sheath not gripped by cord grip</li>
                    <li>• Loose terminals or connections</li>
                    <li>• Wrong fuse rating for appliance</li>
                    <li>• Non-BS 1362 fuse fitted</li>
                    <li>• Signs of overheating (discolouration, melting)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Fuse Selection */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Correct Fuse Selection</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The plug fuse protects the flexible cable from overheating if a fault occurs. Selecting the correct fuse is essential for safety.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">The Calculation</h3>
              <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg mb-3">
                <p className="text-center text-white font-mono text-lg">
                  Current (A) = Power (W) ÷ Voltage (V)
                </p>
              </div>
              <p className="text-sm text-white/70">
                At 230V UK mains: divide the wattage by 230, then select the next fuse rating up.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Common Fuse Ratings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-elec-yellow font-semibold">Appliance Power</th>
                      <th className="text-center py-2 text-elec-yellow font-semibold">Current</th>
                      <th className="text-center py-2 text-elec-yellow font-semibold">Fuse</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Up to 700W</td>
                      <td className="py-2 text-center">Up to 3A</td>
                      <td className="py-2 text-center font-semibold text-green-400">3A</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">700W - 3000W</td>
                      <td className="py-2 text-center">3A - 13A</td>
                      <td className="py-2 text-center font-semibold text-green-400">13A</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/60 italic" colSpan={3}>
                        Note: Some older plugs may have 5A or 10A fuses - these are acceptable where appropriate
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Quick Reference Examples</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">3A Fuse</p>
                  <p className="text-white/60 text-sm">Table lamps, phone chargers, radios, laptops, TVs, most IT equipment</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">13A Fuse</p>
                  <p className="text-white/60 text-sm">Kettles, heaters, toasters, irons, vacuum cleaners, washing machines</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold text-sm">Common Fuse Mistakes</h4>
                  <ul className="text-white/70 text-sm mt-2 space-y-1">
                    <li>• 13A fuse in low-power appliances (won't protect thin cable)</li>
                    <li>• 3A fuse in high-power appliances (will blow during normal use)</li>
                    <li>• Non-BS 1362 fuses (wrong dimensions, unreliable)</li>
                    <li>• Fuse wrapped in foil (extremely dangerous - bypasses protection)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Appliance Entry Point */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Appliance Entry Point Inspection</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The point where the cable enters the appliance is another high-stress area requiring careful inspection.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">What to Check</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Strain relief/grommet</p>
                    <p className="text-white/60 text-sm">Present, undamaged, securely holding the cable</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Cable condition at entry</p>
                    <p className="text-white/60 text-sm">No damage, fraying, or wear at the entry point</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Appliance casing</p>
                    <p className="text-white/60 text-sm">No damage around cable entry, no gaps exposing internals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Detachable leads</p>
                    <p className="text-white/60 text-sm">IEC connectors undamaged, secure fit, correct type for appliance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Detachable IEC Leads</h3>
              <p className="text-sm text-white/70 mb-3">
                Many appliances (computers, monitors, etc.) use detachable IEC power leads. Check:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Connector pins/sockets are undamaged</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>No cracks or damage to connector body</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Secure fit - no wobble or looseness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Correct connector type for the appliance rating</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Lead is suitable for the appliance power rating</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Bookmark className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-xl font-bold text-white">Practical Guidance</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Visual Inspection Checklist
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">1.</span>
                  <span>Disconnect appliance from supply</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">2.</span>
                  <span>Check plug externally (body, pins, cable entry)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">3.</span>
                  <span>Open rewireable plugs - check wiring, connections, fuse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">4.</span>
                  <span>Run full cable length through hands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">5. </span>
                  <span>Examine cable entry to appliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">6.</span>
                  <span>Check appliance body condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">7.</span>
                  <span>Document findings before proceeding to tests</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Common Mistakes to Avoid
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Rushing through visual inspection to get to electrical tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Not checking the full cable length</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Ignoring minor damage that could worsen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Not opening rewireable plugs to check wiring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Proceeding with electrical tests after visual failure</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white/5 rounded-xl">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none touch-manipulation">
                  <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-white/40 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-white/70 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 rounded-xl p-5">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-elec-yellow" />
              Quick Reference: Cable Damage Severity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white text-sm"><strong>PASS:</strong> Surface marks only, no penetration of sheath</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-amber-500/10 rounded-lg">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <span className="text-white text-sm"><strong>INVESTIGATE:</strong> Deep marks, kinks, discolouration</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-red-500/10 rounded-lg">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-white text-sm"><strong>FAIL:</strong> Inner insulation or conductors exposed, tape repairs, heat damage</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section 1 Quiz: Cable and Plug Inspection"
            questions={quizQuestions}
            moduleId="pat-m3s1"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-white/10">
          <Link to="/study-centre/upskilling/pat-testing-module-3" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto gap-2 border-white/20 text-white hover:bg-white/5 hover:text-elec-yellow min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Module 3 Overview</span>
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/pat-testing-module-3-section-2" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <span>Next: Section 2</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default PATTestingModule3Section1;
