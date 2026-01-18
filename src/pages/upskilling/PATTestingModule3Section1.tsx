import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
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
    id: 1,
    question: "What should you check FIRST when performing a visual inspection of an appliance?",
    options: [
      "The rating plate information",
      "That the appliance is disconnected from the supply",
      "The condition of the plug pins",
      "The fuse rating"
    ],
    correctAnswer: 1,
    explanation: "Safety first - always ensure the appliance is physically disconnected from the mains supply before beginning any inspection."
  },
  {
    id: 2,
    question: "Which of these is NOT a sign of overheating in a plug?",
    options: [
      "Discolouration or browning of the plastic",
      "A slight film of dust on the pins",
      "Melted or deformed plastic",
      "Burn marks around the fuse carrier"
    ],
    correctAnswer: 1,
    explanation: "Dust on plug pins is normal accumulation and not a sign of overheating. Discolouration, melting, and burn marks all indicate thermal damage."
  },
  {
    id: 3,
    question: "What is the correct fuse rating for a 2000W appliance at 230V?",
    options: [
      "3A",
      "5A",
      "10A",
      "13A"
    ],
    correctAnswer: 3,
    explanation: "2000W ÷ 230V = 8.7A. The next fuse rating up from this is 13A, which is the correct choice."
  },
  {
    id: 4,
    question: "How far should cable sheath extend into a plug?",
    options: [
      "It doesn't need to enter the plug",
      "Just past the cord grip",
      "At least 50mm inside",
      "Right up to the terminals"
    ],
    correctAnswer: 1,
    explanation: "The outer sheath must extend just past the cord grip so that the grip holds the sheath securely, not the individual conductor insulation."
  },
  {
    id: 5,
    question: "What defect would cause you to fail a moulded plug?",
    options: [
      "Slight discolouration with age",
      "Manufacturer's name slightly faded",
      "Visible crack in the plug body",
      "BS 1363 marking partially worn"
    ],
    correctAnswer: 2,
    explanation: "A visible crack in the plug body compromises its structural integrity and safety. The other options are cosmetic issues that don't affect safety."
  },
  {
    id: 6,
    question: "What is the minimum acceptable insulation length on conductors inside a rewireable plug?",
    options: [
      "No insulation needed at the terminal",
      "5mm of exposed conductor maximum",
      "Insulation should reach right to the terminal with minimal bare conductor",
      "At least 10mm of bare conductor required"
    ],
    correctAnswer: 2,
    explanation: "Insulation should reach as close to the terminal as possible, with only minimal bare conductor exposed. This reduces the risk of short circuits and electric shock."
  },
  {
    id: 7,
    question: "Which cable type is most susceptible to damage in industrial environments?",
    options: [
      "Heavy rubber-sheathed (H07RN-F)",
      "Light PVC flat flex",
      "Braided cable",
      "Armoured cable"
    ],
    correctAnswer: 1,
    explanation: "Light PVC flat flex is designed for light domestic use and is the most susceptible to damage in harsh industrial environments. Heavy rubber or armoured cables are designed for demanding conditions."
  },
  {
    id: 8,
    question: "What should you check at the point where the cable enters the appliance?",
    options: [
      "Only the colour of the cable",
      "Strain relief, damage, and secure anchorage",
      "That the cable is long enough",
      "The manufacturer's logo"
    ],
    correctAnswer: 1,
    explanation: "At the appliance entry point, check for proper strain relief, any damage to the cable or grommet, and that the cable is securely anchored."
  },
  {
    id: 9,
    question: "How should plug pins appear on a well-maintained appliance?",
    options: [
      "Dull grey with slight oxidation",
      "Bright and shiny with no damage, pitting, or burn marks",
      "Black with carbon deposits",
      "Bent slightly for better contact"
    ],
    correctAnswer: 1,
    explanation: "Plug pins should be bright, undamaged, and free from pitting, corrosion, or burn marks. Any of these defects indicates a problem."
  },
  {
    id: 10,
    question: "What action should you take if you find minor damage during visual inspection?",
    options: [
      "Ignore it if the electrical tests pass",
      "Make a note but pass the appliance",
      "Repair or replace before electrical testing proceeds",
      "Only fail if the user complains"
    ],
    correctAnswer: 2,
    explanation: "Damage should be repaired or the component replaced before proceeding with electrical tests. Passing electrical tests doesn't make physical damage safe."
  }
];

const faqs = [
  {
    question: "Can I test an appliance that fails visual inspection?",
    answer: "You should not proceed with electrical testing on an appliance that fails visual inspection. Visual defects often indicate underlying problems that could be dangerous during testing (e.g., exposed conductors could cause electric shock when test voltages are applied). Additionally, passing electrical tests on a visually defective item gives false confidence - the appliance is still unsafe regardless of test results."
  },
  {
    question: "What tools do I need for visual inspection?",
    answer: "Essential tools include: a bright torch/flashlight for illuminating dark areas, a magnifying glass for detailed inspection, a screwdriver for opening rewireable plugs (insulated, appropriate size), and optionally a small mirror for viewing awkward angles. Some testers also use a UV torch to spot repairs or contamination. Always ensure the appliance is disconnected before inspection."
  },
  {
    question: "How do I inspect a moulded plug that I cannot open?",
    answer: "For moulded (non-rewireable) plugs, focus on external indicators: check for cracks, chips, or damage to the body; examine the cable entry point for damage or strain; inspect pins for damage, burning, or corrosion; look for discolouration indicating overheating; and verify BS 1363 marking is present. If internal problems are suspected but not visible, the appliance should be failed."
  },
  {
    question: "What's the difference between flex and cable damage severity?",
    answer: "Damage severity is judged by depth: Surface marks on outer sheath only (cosmetic, usually acceptable); Cuts through outer sheath exposing inner insulation (fail - repair required); Cuts exposing bare conductor (immediate fail - serious hazard). Also consider location - damage near flex entry points or bends is more concerning as it may indicate ongoing stress."
  },
  {
    question: "Should I fail appliances with non-standard cable colours?",
    answer: "Not necessarily. While current UK standard is brown (L), blue (N), green/yellow (E), older appliances may have red (L), black (N), green (E). Foreign appliances may have other colour codes. The key is that connections are correct for the colour code used. However, mixed colour codes (e.g., partially rewired) should be investigated as they indicate potentially unsafe modifications."
  },
  {
    question: "How often should visual inspection be performed versus full PAT testing?",
    answer: "Visual inspection should be performed more frequently than full electrical testing. IET guidance suggests user checks (basic visual inspection) before each use, with formal visual inspections at shorter intervals than combined inspection and testing. For example, in an office, formal visual inspection might be every 2 years while full PAT testing is every 4 years. Higher-risk environments require more frequent inspection."
  }
];

const PATTestingModule3Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 3 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable and Plug Damage Checks
          </h1>
          <p className="text-white/80">
            Visual inspection fundamentals for safe PAT testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Visual inspection:</strong> Catches 75%+ of faults</li>
              <li><strong>Cables:</strong> Check for cuts, crushing, heat damage</li>
              <li><strong>Plugs:</strong> Look for cracks, loose connections, correct fusing</li>
              <li><strong>Order:</strong> Always visual inspection BEFORE electrical tests</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Run full cable length through your hands</li>
              <li><strong>Use:</strong> Feel for bulges, cuts, and damage not visible</li>
              <li><strong>Critical:</strong> Any exposed conductors = immediate fail</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Perform systematic cable visual inspection",
              "Identify plug damage and safety hazards",
              "Check strain relief and cable anchoring",
              "Assess terminal connections and wiring",
              "Determine pass/fail criteria for visual defects",
              "Document findings accurately"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Visual Inspection Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Visual Inspection Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual inspection is the foundation of PAT testing and arguably the most important stage. Research consistently shows that <strong>around 75% of electrical defects</strong> can be identified through careful visual examination alone.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Statistics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>75%+</strong> of faults found visually</li>
                <li><strong>95%</strong> of damaged cables are visible</li>
                <li>Visual defects are the <strong>#1 cause</strong> of PAT failures</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Visual Comes First:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Safety:</strong> Identifies hazards that could make electrical testing dangerous</li>
                <li><strong>Efficiency:</strong> No point electrically testing a clearly damaged item</li>
                <li><strong>Completeness:</strong> Some hazards don't show up in electrical tests</li>
                <li><strong>Documentation:</strong> Provides evidence of thorough assessment</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Important Safety Note:</strong> Always ensure the appliance is <strong>disconnected from the mains supply</strong> before performing any inspection. Never rely solely on the appliance being switched off - physically unplug it.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Cable Inspection Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Inspection Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cables are the most commonly damaged component of portable appliances. A systematic inspection approach ensures nothing is missed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Full-Length Check (run cable through your hands):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Start at the plug - check cable entry, strain relief, first 100mm</li>
                <li><strong>Step 2:</strong> Run through hands - feel for cuts, bulges, soft spots, internal damage</li>
                <li><strong>Step 3:</strong> Examine visually as you go - look for discolouration, cuts, crushing, abrasion</li>
                <li><strong>Step 4:</strong> End at appliance entry - check grommet, strain relief, surrounding area</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of Cable Damage:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>FAIL - Immediate Hazards:</strong> Exposed conductors, cuts through outer sheath, severe crushing, heat damage, taped repairs, joins or splices</li>
                <li><strong>INVESTIGATE - Potential Issues:</strong> Deep scuff marks, kinks or tight bends, discolouration not from heat, softened areas, excessive length</li>
                <li><strong>PASS - Acceptable Condition:</strong> Minor surface marks, slight age-related discolouration, normal wear, faded markings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">High-Risk Areas on Cables:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Near the plug:</strong> Stress from pulling and bending during use</li>
                <li><strong>Near appliance entry:</strong> Movement stress, often carried by cable</li>
                <li><strong>Along floor/edges:</strong> Crushing, abrasion, wheeled traffic</li>
                <li><strong>Any tight bends:</strong> Stress concentration, conductor fatigue</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Plug Inspection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Plug Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Plugs are the interface between the appliance and the mains supply. A damaged or incorrectly wired plug is one of the most common causes of electrical accidents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">External Plug Inspection (All Plug Types):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Plug body condition:</strong> Check for cracks, chips, damage, discolouration from overheating</li>
                <li><strong>Pin condition:</strong> Bright, undamaged, no bending, pitting, or burn marks</li>
                <li><strong>Cable entry:</strong> Secure grip, no damage, cable not pulled through</li>
                <li><strong>BS 1363 marking:</strong> Should be present on all UK standard plugs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Moulded Plugs vs Rewireable Plugs:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Moulded Plugs:</strong> Factory-fitted, cannot be opened, generally more reliable, inspect externally only, if damaged replace entire cable</li>
                <li><strong>Rewireable Plugs:</strong> Can be opened for inspection, check internal wiring quality, verify correct connections, assess terminal tightness, check fuse rating and type</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Inside a Rewireable Plug - Check:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Correct connections:</strong> Brown to Live (right), Blue to Neutral (left), Green/Yellow to Earth (top). Remember: "BLue to the Left, BRown to the Right"</li>
                <li><strong>Cable grip:</strong> Outer sheath must be held securely, grip on sheath not inner cores</li>
                <li><strong>Conductor lengths:</strong> Earth longest (first out in a pull), Live shortest (last to disconnect)</li>
                <li><strong>Terminal condition:</strong> Terminals tight, no loose strands, minimal bare conductor visible</li>
                <li><strong>Fuse:</strong> Correct rating (3A or 13A), proper BS 1362 fuse, securely fitted</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Common Plug Faults (Immediate Fail):</strong> Cracked or damaged body, burnt/pitted/bent pins, wrong colour wire to terminal, outer sheath not gripped, loose terminals, wrong fuse rating, non-BS 1362 fuse, signs of overheating.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Fuse Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Correct Fuse Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The plug fuse protects the flexible cable from overheating if a fault occurs. Selecting the correct fuse is essential for safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Calculation:</p>
              <p className="text-sm text-white ml-4">
                <strong>Current (A) = Power (W) ÷ Voltage (V)</strong><br/>
                At 230V UK mains: divide the wattage by 230, then select the next fuse rating up.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Fuse Ratings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Up to 700W:</strong> Current up to 3A = <strong>3A fuse</strong></li>
                <li><strong>700W - 3000W:</strong> Current 3A - 13A = <strong>13A fuse</strong></li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Quick Reference Examples:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>3A Fuse:</strong> Table lamps, phone chargers, radios, laptops, TVs, most IT equipment</li>
                <li><strong>13A Fuse:</strong> Kettles, heaters, toasters, irons, vacuum cleaners, washing machines</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Common Fuse Mistakes:</strong> 13A fuse in low-power appliances (won't protect thin cable), 3A fuse in high-power appliances (will blow during normal use), non-BS 1362 fuses (wrong dimensions, unreliable), fuse wrapped in foil (extremely dangerous - bypasses protection).
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Appliance Entry Point */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Appliance Entry Point Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The point where the cable enters the appliance is another high-stress area requiring careful inspection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to Check:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Strain relief/grommet:</strong> Present, undamaged, securely holding the cable</li>
                <li><strong>Cable condition at entry:</strong> No damage, fraying, or wear at the entry point</li>
                <li><strong>Appliance casing:</strong> No damage around cable entry, no gaps exposing internals</li>
                <li><strong>Detachable leads:</strong> IEC connectors undamaged, secure fit, correct type for appliance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Detachable IEC Leads - Check:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Connector pins/sockets are undamaged</li>
                <li>No cracks or damage to connector body</li>
                <li>Secure fit - no wobble or looseness</li>
                <li>Correct connector type for the appliance rating</li>
                <li>Lead is suitable for the appliance power rating</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Inspection Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Disconnect appliance from supply</li>
                <li>2. Check plug externally (body, pins, cable entry)</li>
                <li>3. Open rewireable plugs - check wiring, connections, fuse</li>
                <li>4. Run full cable length through hands</li>
                <li>5. Examine cable entry to appliance</li>
                <li>6. Check appliance body condition</li>
                <li>7. Document findings before proceeding to tests</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing through visual inspection</strong> — to get to electrical tests</li>
                <li><strong>Not checking the full cable length</strong> — damage can be anywhere</li>
                <li><strong>Ignoring minor damage</strong> — that could worsen over time</li>
                <li><strong>Not opening rewireable plugs</strong> — to check wiring</li>
                <li><strong>Proceeding with electrical tests after visual failure</strong> — unsafe and pointless</li>
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

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Cable Damage Severity</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">PASS</p>
                <ul className="space-y-0.5">
                  <li>Surface marks only</li>
                  <li>No penetration of sheath</li>
                  <li>Normal age-related wear</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">INVESTIGATE</p>
                <ul className="space-y-0.5">
                  <li>Deep marks or kinks</li>
                  <li>Localised discolouration</li>
                  <li>Potential internal damage</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">FAIL</p>
                <ul className="space-y-0.5">
                  <li>Inner insulation exposed</li>
                  <li>Conductors visible</li>
                  <li>Tape repairs or heat damage</li>
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
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule3Section1;
