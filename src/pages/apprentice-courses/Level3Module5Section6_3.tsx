/**
 * Level 3 Module 5 Section 6.3 - Rectification Procedures
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Rectification Procedures - Level 3 Module 5 Section 6.3";
const DESCRIPTION = "Learn proper procedures for rectifying faults and defects, including repair methods, material selection, and ensuring compliance after repair work.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What must you do before rectifying a fault?",
    options: [
      "Just start working",
      "Confirm isolation, understand the fault, and plan the repair properly",
      "Only tell the client",
      "Order parts"
    ],
    correctIndex: 1,
    explanation: "Before rectification: confirm safe isolation, fully understand the fault and its cause, plan the appropriate repair method, and ensure you have correct materials. Rushing into repair without understanding can create new problems."
  },
  {
    id: "check-2",
    question: "When replacing damaged cable, what must the replacement match?",
    options: [
      "Just the colour",
      "Original specification or better - type, size, current rating, and suitability",
      "Only the length",
      "Just the conductor material"
    ],
    correctIndex: 1,
    explanation: "Replacement cable must meet or exceed the original specification: correct type for the location, adequate size for current and voltage drop, appropriate insulation, and suitability for the installation method. Never downgrade."
  },
  {
    id: "check-3",
    question: "After rectifying a fault, what is the next essential step?",
    options: [
      "Send the invoice",
      "Retest to verify the repair is successful and hasn't created new issues",
      "Leave immediately",
      "Only visually check"
    ],
    correctIndex: 1,
    explanation: "After any rectification, retesting is essential. Verify the original fault is cleared, check that the repair hasn't introduced new faults, and confirm all affected test results now comply. Document the retest results."
  },
  {
    id: "check-4",
    question: "A joint is found to be the source of a high-resistance fault. What's the proper repair?",
    options: [
      "Tighten it and hope for the best",
      "Remove the damaged joint, cut back cable to sound material, remake with appropriate method",
      "Wrap with tape",
      "Leave it if it's working now"
    ],
    correctIndex: 1,
    explanation: "A failed joint likely has damaged conductors. Cut back to sound conductor material, use appropriate joining method (crimps, maintenance-free connectors), ensure mechanical and electrical integrity, and maintain IP rating of the enclosure."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What determines the minimum cable size for a replacement section?",
    options: [
      "Whatever is cheapest",
      "The circuit design requirements - current rating, voltage drop, fault protection",
      "The smallest that fits in the conduit",
      "What you have in the van"
    ],
    correctAnswer: 1,
    explanation: "Replacement cable must meet design requirements: adequate current carrying capacity for the load and installation method, voltage drop limits, and earth fault loop impedance requirements. Check the original design or recalculate."
  },
  {
    id: 2,
    question: "When repairing cable damaged by mechanical impact, how much should you cut back?",
    options: [
      "Just the visible damage",
      "Remove all damaged section plus additional cable to ensure sound material",
      "Only if insulation is broken",
      "No cutting needed, just tape it"
    ],
    correctAnswer: 1,
    explanation: "Impact damage can affect cable beyond visible damage - conductors may be stretched, insulation internally cracked. Cut back to clearly undamaged material with adequate margin. This may mean pulling in new cable if damage is extensive."
  },
  {
    id: 3,
    question: "What type of connection is required for conductor joints in fixed wiring?",
    options: [
      "Twist and tape is acceptable",
      "Properly designed connectors providing mechanical and electrical integrity",
      "Any method that works",
      "Soldering only"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 526.1 requires connections to provide durable electrical continuity and mechanical strength. Use crimps, proprietary connectors, or other methods appropriate to the conductor type and size. Twist and tape is never acceptable for fixed wiring."
  },
  {
    id: 4,
    question: "A corroded accessory backbox is found during fault investigation. What's the appropriate action?",
    options: [
      "Clean it and reuse",
      "Replace with a suitable new enclosure of appropriate rating",
      "Paint it to prevent further corrosion",
      "Leave it if it's holding the accessory"
    ],
    correctAnswer: 1,
    explanation: "Corroded enclosures have compromised integrity - they may not provide required IP protection or earthing continuity. Replace with a new enclosure suitable for the location and environment. Address the cause of corrosion if possible."
  },
  {
    id: 5,
    question: "When rectifying a fault found on someone else's work, what documentation is important?",
    options: [
      "No documentation needed",
      "Record the fault found, cause, who was responsible, rectification performed",
      "Just verbal agreement with client",
      "Only if you're paid extra"
    ],
    correctAnswer: 1,
    explanation: "Document what you found, its likely cause, and what you did to rectify it. This protects you if questions arise later, provides information for the client, and creates a record if warranty or liability issues arise with the original work."
  },
  {
    id: 6,
    question: "What should be considered when selecting connectors for aluminium conductors?",
    options: [
      "Any connector will work",
      "Use connectors rated for aluminium, with appropriate compound to prevent oxidation",
      "Only copper connectors are available",
      "Aluminium doesn't need special treatment"
    ],
    correctAnswer: 1,
    explanation: "Aluminium forms oxide layers that increase resistance. Use connectors specifically designed for aluminium (or bimetallic for Al/Cu joints), apply antioxidant compound, and ensure adequate contact pressure. Standard copper connectors can cause problems."
  },
  {
    id: 7,
    question: "After replacing a section of SWA cable, what must be verified?",
    options: [
      "Only that it's installed",
      "Gland installation correct, armour continuity maintained, IP rating preserved",
      "Just that the circuit works",
      "Only visual appearance"
    ],
    correctAnswer: 1,
    explanation: "SWA repairs must maintain: correct gland installation providing earth continuity and mechanical cable retention, armour continuity for earth fault path, weather protection at terminations. Test armour continuity and insulation resistance."
  },
  {
    id: 8,
    question: "What determines if a protective device needs replacing after clearing a fault?",
    options: [
      "Age of the device only",
      "Whether it shows signs of damage, has operated at or near its limits, or failed functional tests",
      "Brand preference",
      "It never needs replacing"
    ],
    correctAnswer: 1,
    explanation: "Check devices that have operated during faults: look for visible damage (arc marks, discolouration), consider if fault current was near the breaking capacity, and functional test to verify correct operation. Replace if any doubt exists."
  },
  {
    id: 9,
    question: "A moisture-related fault has been rectified. What additional action is needed?",
    options: [
      "Nothing further",
      "Identify and address the moisture source to prevent recurrence",
      "Just dry the area",
      "Install a dehumidifier"
    ],
    correctAnswer: 1,
    explanation: "Fixing the electrical fault without addressing the moisture source means the fault will likely return. Identify where moisture enters (roof leak, condensation, ground water), advise the client on remediation, and ensure IP ratings are appropriate."
  },
  {
    id: 10,
    question: "When is it acceptable to leave a fault unrectified during an inspection?",
    options: [
      "If the client agrees",
      "Never during your own new installation; for periodic inspection, report it for others to rectify",
      "If it's minor",
      "If time is short"
    ],
    correctAnswer: 1,
    explanation: "For your own new work, all faults must be rectified before certification. During periodic inspection, you report findings with appropriate coding - rectification is the client's decision. Always ensure the client understands any safety implications."
  },
  {
    id: 11,
    question: "What must be done with any temporary repairs made during emergency fault clearance?",
    options: [
      "They're acceptable permanently",
      "Followed up with permanent repair within reasonable time, documented",
      "Left if working",
      "Only the client's responsibility"
    ],
    correctAnswer: 1,
    explanation: "Emergency repairs (to restore essential services) may be temporary but must be made safe and followed by permanent rectification. Document the temporary nature, timescale for permanent repair, and ensure the client understands."
  },
  {
    id: 12,
    question: "How should modifications during rectification be documented?",
    options: [
      "No documentation needed",
      "Update drawings/records, note on certification, inform client of changes",
      "Only if major changes",
      "Verbal only"
    ],
    correctAnswer: 1,
    explanation: "Any modifications during rectification should be documented: update installation drawings if they exist, note changes on certification, and inform the client what was changed and why. This maintains accurate records for future work."
  }
];

const faqs = [
  {
    question: "Can I use any connector for joining cables?",
    answer: "No. Use connectors appropriate for the conductor type, size, and application. They must provide adequate current capacity, be suitable for the conductor material, maintain IP rating requirements, and be accessible for future inspection. Regulation 526 sets requirements."
  },
  {
    question: "What if I can't get the exact replacement part?",
    answer: "Use an alternative that meets or exceeds the specification. Verify compatibility, current rating, dimensions, and suitability. Document the substitution. If no suitable alternative exists, the work cannot be completed until correct parts are available."
  },
  {
    question: "Who is responsible for rectifying faults found during periodic inspection?",
    answer: "During periodic inspection, you report findings - you're not obliged to rectify unless separately engaged to do so. The duty holder (owner/occupier) is responsible for having faults rectified. Discuss findings, explain urgency based on coding, and offer rectification as additional work."
  },
  {
    question: "Should I rectify defects outside the scope of my work?",
    answer: "If you find defects outside your contracted scope that are dangerous (C1), you must advise the client and may need to isolate the affected circuit. For less urgent defects, report them but clarify they're outside your current scope and may require additional costs to rectify."
  },
  {
    question: "How do I handle warranty claims on rectification work?",
    answer: "Maintain records of fault, cause, rectification performed, and materials used. If the repair fails within warranty period, your records demonstrate proper workmanship. Warranty typically doesn't cover failures from different causes or improper use."
  },
  {
    question: "What's the minimum acceptable repair for damaged cable insulation?",
    answer: "It depends on severity and location. Minor damage may be repaired with heat shrink or self-amalgamating tape if in accessible location and protected from further damage. Extensive damage, damage in inaccessible locations, or where IP rating is critical requires cable replacement."
  }
];

const Level3Module5Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Rectification Procedures
          </h1>
          <p className="text-white/80">
            Proper methods for repairing faults and ensuring compliance after repair
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Plan:</strong> Understand fault before repairing</li>
              <li><strong>Materials:</strong> Match or exceed original spec</li>
              <li><strong>Method:</strong> Use appropriate repair techniques</li>
              <li><strong>Verify:</strong> Always retest after rectification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Damaged components, failed connections</li>
              <li><strong>Use:</strong> Proper repair methods and materials</li>
              <li><strong>Apply:</strong> Address root cause, not just symptoms</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Plan repairs properly before starting work",
              "Select appropriate replacement materials",
              "Use correct methods for different fault types",
              "Address root causes to prevent recurrence",
              "Verify successful repair through retesting",
              "Document rectification work properly"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Planning Rectification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Planning Rectification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective rectification starts with proper planning. Understanding the fault fully, gathering correct materials, and choosing the right repair method ensures the repair is successful first time.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Before starting repair:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Understand the fault:</strong> What failed, why, what's the full extent?</li>
                <li><strong>Plan the repair:</strong> What needs replacing, what method is appropriate?</li>
                <li><strong>Gather materials:</strong> Correct specification, adequate quantity</li>
                <li><strong>Confirm isolation:</strong> Safe working conditions before starting</li>
                <li><strong>Consider access:</strong> Can you reach all affected areas?</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Right First Time</p>
                <p className="text-white/90 text-xs">Good planning prevents repeat visits</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Root Cause</p>
                <p className="text-white/90 text-xs">Fix why it failed, not just what failed</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> A properly planned repair takes less total time than a rushed repair that fails. Invest time in understanding before acting.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Material Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Material Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Replacement materials must be fit for purpose. Using incorrect materials can create new hazards or result in repeat failures. Match or exceed original specifications.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Replacement</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct type (T+E, SWA, LSOH etc.)</li>
                  <li>Adequate CSA for current rating</li>
                  <li>Suitable for installation method</li>
                  <li>Appropriate insulation rating</li>
                  <li>Meets voltage drop requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connector Selection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Rated for conductor size</li>
                  <li>Suitable for conductor material</li>
                  <li>Adequate current capacity</li>
                  <li>Appropriate for environment</li>
                  <li>Provides mechanical strength</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Never downgrade specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Smaller cable than original - may fail under load</li>
                <li>PVC where LSOH required - fire safety compromised</li>
                <li>Lower IP rated enclosures - environmental protection lost</li>
                <li>Unsuitable connectors - may fail or overheat</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Tip:</strong> If you're unsure of original specification, calculate from first principles using load, cable length, and installation method. When in doubt, upgrade rather than match.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Repair Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Repair Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different faults require different repair approaches. Select the method appropriate to the fault type, location, and regulatory requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Repairs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cut back to sound conductor</li>
                  <li>Use appropriate connectors</li>
                  <li>Maintain IP rating with enclosure</li>
                  <li>Consider cable draw if replacing section</li>
                  <li>Full replacement for extensive damage</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connection Repairs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Remove damaged connection entirely</li>
                  <li>Prepare conductor properly</li>
                  <li>New connector of correct type</li>
                  <li>Appropriate tightening torque</li>
                  <li>Test for low resistance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Special considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>SWA cable:</strong> Maintain armour continuity with correct glands</li>
                <li><strong>MICC:</strong> Specialist sealing required, manufacturer guidance</li>
                <li><strong>Aluminium:</strong> Use appropriate compound and connectors</li>
                <li><strong>Fire barriers:</strong> Restore penetration sealing after cable work</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Regulation 526.1 requires connections to provide durable electrical continuity and adequate mechanical strength. Twist and tape is never acceptable for fixed wiring.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Post-Repair Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Post-Repair Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Rectification isn't complete until verified by testing. Retesting confirms the fault is cleared and that the repair hasn't introduced new problems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Minimum retest requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Original fault:</strong> Test to confirm it's cleared</li>
                <li><strong>Continuity:</strong> If conductors or connections affected</li>
                <li><strong>Insulation resistance:</strong> If insulation was damaged or disturbed</li>
                <li><strong>Polarity:</strong> If any terminations were remade</li>
                <li><strong>Zs:</strong> If the fault could affect earth fault path</li>
                <li><strong>Functional test:</strong> Verify the circuit operates correctly</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Confirm Clear</p>
                <p className="text-white/90 text-xs">Original fault resolved</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Check New</p>
                <p className="text-white/90 text-xs">No new faults created</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Document</p>
                <p className="text-white/90 text-xs">Record retest results</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Record retest results alongside original fault details. This creates a complete audit trail showing what was wrong, what was done, and verification that the repair was successful.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Repair Principles</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always address root cause, not just symptoms</li>
                <li>Use correct materials and methods</li>
                <li>Allow adequate time for proper repair</li>
                <li>Test thoroughly after completion</li>
                <li>Document what was done and why</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Describe fault found and cause identified</li>
                <li>Record materials used for repair</li>
                <li>Note any modifications from original installation</li>
                <li>Document retest results</li>
                <li>Update drawings if installation changed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing:</strong> Taking shortcuts leads to repeat failures</li>
                <li><strong>Wrong materials:</strong> Using whatever is available</li>
                <li><strong>Ignoring cause:</strong> Fixing symptoms not problems</li>
                <li><strong>Skipping retest:</strong> Assuming repair worked</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Repair Checklist</p>
                <ul className="space-y-0.5">
                  <li>Confirm isolation</li>
                  <li>Understand fault fully</li>
                  <li>Correct materials ready</li>
                  <li>Appropriate method selected</li>
                  <li>Retest after completion</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>Reg 526 - Connections</li>
                  <li>Reg 134.1.1 - Good workmanship</li>
                  <li>Reg 522 - Cable selection</li>
                  <li>Reg 612 - Initial verification</li>
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

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section6-6-4">
              Next: Re-testing After Rectification
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section6_3;
