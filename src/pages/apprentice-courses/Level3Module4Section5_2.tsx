/**
 * Level 3 Module 4 Section 5.2 - Ensuring Compliance with BS7671 After Repair
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ensuring Compliance with BS7671 After Repair - Level 3 Module 4 Section 5.2";
const DESCRIPTION = "Learn how to verify that repairs meet BS 7671:2018 requirements, understand compliance obligations, and ensure installations are safe and compliant after remedial work.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "After completing a repair, what is the primary regulatory requirement?",
    options: [
      "The repair only needs to work correctly",
      "The repair must comply with BS 7671:2018 as amended",
      "The repair must match the original installation exactly",
      "The repair only needs the customer's approval"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 132.12 requires that any alteration or addition to an existing installation complies with BS 7671 and doesn't impair the safety of the existing installation. This applies equally to repairs - they must meet current standards."
  },
  {
    id: "check-2",
    question: "What happens if a repair reveals that the existing installation has non-compliances?",
    options: [
      "You must rewire the entire installation",
      "You can ignore them if the repair itself is compliant",
      "You must inform the customer and document observations",
      "You must fix everything before completing the repair"
    ],
    correctIndex: 2,
    explanation: "When repairs reveal existing non-compliances, you have a duty to inform the customer. Document observations on the appropriate certificate. You're not obligated to fix everything, but you must not leave the installation in a more dangerous condition than you found it."
  },
  {
    id: "check-3",
    question: "Which BS 7671 Part covers the verification requirements that apply after repairs?",
    options: [
      "Part 1 - Scope and fundamental principles",
      "Part 4 - Protection for safety",
      "Part 5 - Selection and erection of equipment",
      "Part 6 - Inspection and testing"
    ],
    correctIndex: 3,
    explanation: "Part 6 of BS 7671 covers inspection and testing requirements. After repairs, relevant tests from the initial verification sequence must be performed to confirm the work complies with the standard and the installation is safe."
  },
  {
    id: "check-4",
    question: "When replacing a protective device after a fault, what compliance check is essential?",
    options: [
      "Only that it fits the board",
      "That its breaking capacity exceeds the prospective fault current at the installation point",
      "That it costs less than the original",
      "That it's from the same manufacturer"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 432.1 requires that protective devices have a breaking capacity not less than the prospective fault current at their point of installation. This must be verified - a device with inadequate breaking capacity could fail dangerously during a fault."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "BS 7671 Regulation 132.12 specifically addresses which situation?",
    options: [
      "New installations only",
      "Alterations and additions to existing installations",
      "Only commercial installations",
      "Testing requirements"
    ],
    correctAnswer: 1,
    explanation: "Regulation 132.12 states that any alteration or addition to an existing installation shall comply with BS 7671 and shall not impair the safety of the existing installation. This is the key regulation governing repair work compliance."
  },
  {
    id: 2,
    question: "After repairing a ring final circuit, which specific test verifies compliance with the ring circuit requirements?",
    options: [
      "Insulation resistance test only",
      "Earth fault loop impedance only",
      "Ring continuity test (r1, rn, r2 method)",
      "RCD test only"
    ],
    correctAnswer: 2,
    explanation: "The ring continuity test using the r1, rn, r2 method specifically verifies that the ring is complete and properly connected. This is essential after any repair to a ring final circuit to confirm the ring topology is restored."
  },
  {
    id: 3,
    question: "What documentation is required after completing remedial work that involves installing a new circuit?",
    options: [
      "No documentation is required for repairs",
      "Only a receipt for materials",
      "An Electrical Installation Certificate (EIC)",
      "A verbal confirmation to the customer"
    ],
    correctAnswer: 2,
    explanation: "New circuit work requires an Electrical Installation Certificate (EIC). This provides evidence of compliance with BS 7671 and includes design, construction, and verification sections. The certificate must be issued to the person ordering the work."
  },
  {
    id: 4,
    question: "If a repair involves work on circuits protected by an RCD, what functional test is required?",
    options: [
      "No testing is required for RCD circuits",
      "Only check the RCD trips using the test button",
      "Test at 0.5x, 1x, and 5x rated residual operating current as appropriate",
      "Only check the RCD doesn't trip during normal operation"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 requires RCD testing at specified multiples of the rated residual operating current to verify trip times are within limits. The test button only confirms the mechanism works, not that the device meets its rated performance."
  },
  {
    id: 5,
    question: "When a repair reveals that an earthing arrangement is non-compliant, what must you do?",
    options: [
      "Complete the repair and say nothing",
      "Inform the customer, document the observation, and advise on remedial action",
      "Refuse to complete any work",
      "Fix it without telling the customer"
    ],
    correctAnswer: 1,
    explanation: "Professional and legal duty requires you to inform the customer of safety concerns discovered during work. Document observations on the appropriate certificate and advise on necessary remedial action. Never leave a dangerous condition undisclosed."
  },
  {
    id: 6,
    question: "What is the minimum insulation resistance value acceptable for a 230V circuit after repair?",
    options: [
      "0.5 megohms",
      "1.0 megohm",
      "2.0 megohms",
      "10 megohms"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 61 specifies minimum insulation resistance values. For installations up to 500V, the minimum acceptable value is 1.0 megohm when tested at 500V DC. Values below this indicate insulation problems requiring investigation."
  },
  {
    id: 7,
    question: "After replacing cables in an escape route, what additional compliance requirement applies?",
    options: [
      "Cables must be coloured green",
      "Cables must be rated for the current only",
      "Cables must meet fire performance requirements per Regulation 422.2",
      "No additional requirements apply"
    ],
    correctAnswer: 2,
    explanation: "Regulation 422.2 requires that cables in escape routes either have low emission of smoke and fumes (Regulation 422.2.1), are enclosed in non-combustible containment, or the route is adequately protected. This is a critical safety requirement."
  },
  {
    id: 8,
    question: "What does 'not impairing the safety of the existing installation' mean in practice?",
    options: [
      "The existing installation must be brought up to current standards",
      "Your work must not make the existing installation less safe",
      "You must inspect the entire installation",
      "You must replace all non-compliant items"
    ],
    correctAnswer: 1,
    explanation: "This means your repair work must not adversely affect the safety of parts of the installation you haven't worked on. For example, adding load to a circuit mustn't cause overloading, and modifying earthing mustn't compromise protection."
  },
  {
    id: 9,
    question: "If you replace an MCB in a consumer unit, what must you verify about the installation's prospective fault current?",
    options: [
      "Nothing - MCBs are all the same",
      "That the MCB's breaking capacity is adequate for the prospective fault current",
      "Only the current rating matters",
      "Only Type B, C, or D matters"
    ],
    correctAnswer: 1,
    explanation: "The MCB must have adequate breaking capacity (Icn) for the installation's prospective fault current (PFC). If the PFC exceeds the MCB's breaking capacity, the device could fail to safely interrupt a fault, potentially causing fire or explosion."
  },
  {
    id: 10,
    question: "When must earth fault loop impedance (Zs) be verified after a repair?",
    options: [
      "Never - it doesn't change",
      "Only if requested by the customer",
      "When the repair affects the circuit's protective conductors or may have changed the fault path",
      "Only for new installations"
    ],
    correctAnswer: 2,
    explanation: "Zs must be verified when repairs may have affected the earth fault loop - for example, replacing cables (changing R1+R2), modifying earthing connections, or any work that could affect the protective device's ability to disconnect in the required time."
  },
  {
    id: 11,
    question: "What certificate is appropriate for adding an additional socket to an existing ring circuit?",
    options: [
      "Electrical Installation Certificate",
      "Electrical Installation Condition Report",
      "Minor Electrical Installation Works Certificate",
      "No certificate is required"
    ],
    correctAnswer: 2,
    explanation: "Adding a socket to an existing circuit is minor work that doesn't involve a new circuit. The Minor Electrical Installation Works Certificate is appropriate. It certifies the work complies with BS 7671 without requiring the full design certification of an EIC."
  },
  {
    id: 12,
    question: "Before energising a repaired circuit, what is the minimum testing sequence required?",
    options: [
      "Only a visual check is needed",
      "Continuity, insulation resistance, and polarity as minimum",
      "Only check that it works",
      "Earth fault loop impedance only"
    ],
    correctAnswer: 1,
    explanation: "Before energisation, dead tests must confirm continuity of protective conductors, adequate insulation resistance, and correct polarity. These tests detect faults that could cause shock or fire if the circuit were energised. Live tests follow after safe energisation."
  }
];

const faqs = [
  {
    question: "Do I need to bring the entire installation up to current standards when doing a repair?",
    answer: "No. BS 7671 Regulation 132.12 requires your repair work to comply with current standards and not impair the safety of the existing installation. You're not required to upgrade unaffected parts. However, you must inform the customer of any observed non-compliances and not leave the installation more dangerous than you found it."
  },
  {
    question: "What if the original installation doesn't meet current standards but the customer won't pay for upgrades?",
    answer: "Complete your repair to current standards. Document observed non-compliances on the certificate. If existing non-compliances create immediate danger, you must advise the customer in writing and consider whether you can safely complete the work. Never sign off work as compliant if it isn't, but you're not responsible for pre-existing issues you haven't been engaged to fix."
  },
  {
    question: "How do I verify compliance if I don't have access to test the entire circuit?",
    answer: "Test what you can access that's relevant to your repair. Document any limitations. For example, if you've repaired a termination at a socket, you can test from that socket. If testing reveals values outside acceptable limits, investigate further. The certificate should note any limitations on the extent of testing."
  },
  {
    question: "What's the difference between compliance at the time of installation versus current standards?",
    answer: "Existing installations were compliant if they met standards when installed. New work (including repairs) must meet current BS 7671 standards. This means your repair work must comply with BS 7671:2018 (as amended), even if the original installation was to an earlier edition. The principle is progressive improvement."
  },
  {
    question: "Can I use materials that were compliant when the installation was originally done?",
    answer: "Only if they still meet current standards. For example, cable types and ratings haven't fundamentally changed, so like-for-like replacement is usually acceptable. However, if current standards require something different (like fire-rated cables in certain locations introduced by recent amendments), the repair must meet current requirements."
  },
  {
    question: "Who is responsible for compliance - me or the customer?",
    answer: "You are responsible for ensuring your work complies with BS 7671 and is safe. You certify this on the appropriate certificate. The customer is responsible for acting on advice about existing deficiencies. You should never do non-compliant work just because the customer requests it - your professional duty is to standards and safety."
  }
];

const Level3Module4Section5_2 = () => {
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
            <Link to="/study-centre/apprentice/level3-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Reg 132.12:</strong> Repairs must comply with current BS 7671</li>
              <li><strong>Safety:</strong> Must not impair existing installation safety</li>
              <li><strong>Testing:</strong> Relevant Part 6 tests required</li>
              <li><strong>Certification:</strong> Document compliance appropriately</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Regulations</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>132.12:</strong> Alterations and additions</li>
              <li><strong>Part 6:</strong> Inspection and testing</li>
              <li><strong>Chapter 61:</strong> Initial verification</li>
              <li><strong>Chapter 63:</strong> Certification</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Understanding Regulation 132.12 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Regulation 132.12
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 132.12 is the cornerstone regulation for anyone carrying out repairs, alterations, or additions to existing electrical installations. It establishes two fundamental requirements that govern all repair work and ensure that remedial work improves rather than compromises installation safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The two requirements of Regulation 132.12:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Compliance:</strong> Any alteration or addition shall comply with BS 7671:2018 (as amended)</li>
                <li><strong>2. No impairment:</strong> The work shall not impair the safety of the existing installation</li>
              </ul>
            </div>

            <p>
              The first requirement means your repair work must meet current standards - not the standards that applied when the installation was originally completed. If the original installation used methods or materials that are no longer compliant, your repair work must use current compliant methods. This is how installations progressively improve over time.
            </p>

            <p>
              The second requirement means you must consider how your work affects the rest of the installation. Adding load to a circuit, modifying earthing arrangements, or connecting to existing wiring all have potential to affect safety beyond your immediate work area. You must assess and avoid any adverse effects.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Regulation 132.12 doesn't require you to upgrade the entire installation to current standards. It requires YOUR work to be compliant and to not make anything else worse. However, you must inform customers of observed non-compliances.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Compliance Assessment After Repairs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Compliance Assessment After Repairs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After completing repair work, you must verify that it complies with BS 7671. This involves a combination of visual inspection and testing appropriate to the work carried out. The extent of testing depends on what was repaired and what could have been affected.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Inspection Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct materials and equipment used</li>
                  <li>Proper installation methods followed</li>
                  <li>Connections correctly made and secured</li>
                  <li>Appropriate enclosures and IP ratings</li>
                  <li>Correct identification and labelling</li>
                  <li>No visible damage to adjacent components</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Continuity of protective conductors</li>
                  <li>Insulation resistance</li>
                  <li>Polarity verification</li>
                  <li>Earth fault loop impedance (Zs)</li>
                  <li>Prospective fault current confirmation</li>
                  <li>RCD testing where applicable</li>
                </ul>
              </div>
            </div>

            <p>
              The golden rule is: test anything that your work could have affected. If you've replaced a cable, test continuity, insulation resistance, polarity, and earth fault loop impedance for that circuit. If you've only re-terminated an existing cable, you might only need continuity and insulation resistance tests at that point, plus verification that Zs is still acceptable.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Replacing a socket outlet requires verifying: correct polarity, earth continuity to the new socket, insulation resistance (that the new connection hasn't introduced a fault), and confirmation that Zs at the socket is within limits for the protective device.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Dealing with Existing Non-Compliances */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Dealing with Existing Non-Compliances
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A common challenge during repair work is discovering that the existing installation has non-compliances or deficiencies. You are not required to fix everything you find, but you do have professional and legal obligations regarding what you observe and how you proceed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Your obligations when discovering existing issues:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Inform the customer:</strong> Advise them of what you've found and the potential risks</li>
                <li><strong>Document observations:</strong> Record findings on the certificate you issue</li>
                <li><strong>Provide recommendations:</strong> Advise on what remedial work is needed</li>
                <li><strong>Prioritise safety:</strong> If something is immediately dangerous, take appropriate action</li>
                <li><strong>Don't make it worse:</strong> Your work must not increase any existing risk</li>
              </ul>
            </div>

            <p>
              If you discover a dangerous condition (something that could cause immediate risk of shock, fire, or injury), you must bring this to the customer's attention and advise them to have it rectified urgently. In extreme cases, you may need to isolate the dangerous part and refuse to energise it until made safe.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">C1 - Danger Present</p>
                <p className="text-white/90 text-xs">Risk of injury - immediate action required to make safe</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">C2 - Potentially Dangerous</p>
                <p className="text-white/90 text-xs">Could become dangerous - urgent remedial action</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">C3 - Improvement Recommended</p>
                <p className="text-white/90 text-xs">Non-compliance but not dangerous - advise improvement</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The observation codes (C1, C2, C3) from EICR work can be used informally to categorise issues you find during repair work. This helps communicate the priority to customers and document your recommendations appropriately.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Protective Device Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protective Device Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When repairs involve protective devices - either replacing them or modifying circuits they protect - verification of their correct specification is critical. A protective device can only provide its intended protection if it's correctly rated and coordinated with the installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key verification points for protective devices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Breaking capacity (Icn/Ics):</strong> Must exceed the prospective fault current at the point of installation</li>
                <li><strong>Current rating (In):</strong> Must be appropriate for the circuit's design current and cable capacity</li>
                <li><strong>Type characteristic (B, C, D):</strong> Must suit the load characteristics - inductive, resistive, etc.</li>
                <li><strong>Disconnection time:</strong> Earth fault loop impedance must allow disconnection within required time</li>
                <li><strong>Coordination:</strong> Device must coordinate with upstream and downstream protection</li>
              </ul>
            </div>

            <p>
              Breaking capacity is particularly important because it's often overlooked. Every installation has a prospective fault current (Ip) at its origin - this can be obtained from the DNO or measured. This value decreases along circuits due to cable impedance. The protective device's breaking capacity must exceed the prospective fault current at its location.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An installation has 16kA prospective fault current at the main switch. A circuit with 0.5 ohms total impedance would have a reduced prospective fault current. If replacing an MCB on this circuit, verify the MCB's rated breaking capacity (shown on the device, e.g., "6000" for 6kA) is adequate.
            </p>

            <p>
              For circuits protected by RCDs, verify the RCD still operates correctly by testing at rated residual current and confirming trip times. Also verify that the downstream circuit's earth fault loop impedance is within the RCD's capability to disconnect within the required time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Section 05: Specific Compliance Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Specific Compliance Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different types of repairs have specific compliance considerations. Understanding these helps ensure your work meets all relevant requirements and passes scrutiny during any subsequent inspection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Replacement Compliance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct cable type for installation method and environment</li>
                  <li>Adequate current-carrying capacity with derating applied</li>
                  <li>Correct CPC size or combined with sheath earthing</li>
                  <li>Fire performance requirements (escape routes)</li>
                  <li>Volt drop within limits for the circuit</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Consumer Unit Modifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Amendment 3 requirements for enclosure material (domestic)</li>
                  <li>Correct protective device ratings and types</li>
                  <li>Adequate breaking capacity for all devices</li>
                  <li>RCD protection where required by current standards</li>
                  <li>Correct labelling of all circuits</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earthing and Bonding Repairs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct conductor sizes per Tables 54.2-54.8</li>
                  <li>Appropriate connection methods and materials</li>
                  <li>Main bonding connected to correct services</li>
                  <li>Labels fitted to bonding connections</li>
                  <li>Earth electrode resistance acceptable (TT systems)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Special Location Repairs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Bathroom zones and equipment restrictions</li>
                  <li>Swimming pool and spa requirements</li>
                  <li>External installation weatherproofing</li>
                  <li>Agricultural/horticultural special requirements</li>
                  <li>Solar PV and EV charging considerations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Repair Compliance Check</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify all BS 7671 requirements that apply to the planned repair</li>
                <li>Check for any special location requirements (Part 7)</li>
                <li>Verify materials and methods you plan to use are compliant</li>
                <li>Determine what testing will be required after completion</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Repair Verification</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete visual inspection before any testing</li>
                <li>Perform all relevant dead tests before energisation</li>
                <li>After safe energisation, complete live testing requirements</li>
                <li>Document all test results on appropriate certification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Failures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Incorrect cable sizing:</strong> Not applying derating factors correctly</li>
                <li><strong>Missing RCD protection:</strong> Where now required for socket-outlets</li>
                <li><strong>Inadequate breaking capacity:</strong> Not checking PFC before selecting devices</li>
                <li><strong>Poor documentation:</strong> Failing to record test results or observations</li>
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
                <p className="font-medium text-white mb-1">Minimum Test Requirements</p>
                <ul className="space-y-0.5">
                  <li>Continuity of protective conductors</li>
                  <li>Insulation resistance (min 1 megohm)</li>
                  <li>Polarity verification</li>
                  <li>Earth fault loop impedance</li>
                  <li>RCD operation (where fitted)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>Reg 132.12 - Alterations/additions</li>
                  <li>Reg 411 - ADS requirements</li>
                  <li>Reg 432 - Protection against fault current</li>
                  <li>Chapter 61 - Initial verification</li>
                  <li>Chapter 63 - Certification</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Repair Methods
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section5-3">
              Next: Recording Remedial Works
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section5_2;
