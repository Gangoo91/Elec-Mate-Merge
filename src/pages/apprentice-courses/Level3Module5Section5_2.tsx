/**
 * Level 3 Module 5 Section 5.2 - Minor Electrical Installation Works Certificate (MEIWC)
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Minor Electrical Installation Works Certificate (MEIWC) - Level 3 Module 5 Section 5.2";
const DESCRIPTION = "Learn when and how to use the Minor Electrical Installation Works Certificate for alterations and additions that do not include new circuits.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A Minor Electrical Installation Works Certificate can be used for which type of work?",
    options: [
      "Installing a new circuit",
      "Additions or alterations that do NOT include a new circuit",
      "Consumer unit replacement",
      "Complete rewire of a property"
    ],
    correctIndex: 1,
    explanation: "The MEIWC is specifically for minor work that does not involve installing a new circuit. Examples include adding a socket outlet to an existing circuit, replacing accessories, or extending an existing circuit without adding new protective devices."
  },
  {
    id: "check-2",
    question: "What key difference exists between the MEIWC and EIC regarding signatures?",
    options: [
      "MEIWC requires no signature",
      "MEIWC requires client signature only",
      "MEIWC requires only ONE signature from the person carrying out the work",
      "MEIWC requires three signatures like EIC"
    ],
    correctIndex: 2,
    explanation: "Unlike the EIC which requires three declarations (designer, constructor, inspector), the MEIWC only requires one signature from the person carrying out the work. This person takes responsibility for the design, construction, and inspection/testing of the minor work."
  },
  {
    id: "check-3",
    question: "What schedules must accompany a Minor Electrical Installation Works Certificate?",
    options: [
      "Full schedule of inspections and test results like EIC",
      "Only schedule of inspections",
      "Essential test results section is included on the certificate itself",
      "No test results are required"
    ],
    correctIndex: 2,
    explanation: "The MEIWC includes a section for essential test results directly on the certificate form. Unlike the EIC, separate schedules of inspections and test results are not required - the essential tests are recorded on the certificate itself."
  },
  {
    id: "check-4",
    question: "Adding a fused spur to an existing ring final circuit requires which certificate?",
    options: [
      "EIC - because it's new equipment",
      "MEIWC - no new circuit is being installed",
      "EICR - for periodic inspection",
      "No certificate required for fused spurs"
    ],
    correctIndex: 1,
    explanation: "Adding a fused spur to an existing ring circuit is classed as minor work because no new circuit is being installed. The existing circuit is being extended/altered. A MEIWC is the appropriate certificate for this type of work."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following would require an EIC rather than a MEIWC?",
    options: [
      "Adding a socket outlet to an existing radial circuit",
      "Replacing a light fitting",
      "Installing a new lighting circuit for a conservatory",
      "Adding a fused spur for a towel rail"
    ],
    correctAnswer: 2,
    explanation: "Installing a new circuit (in this case a new lighting circuit) always requires an EIC. The other options are modifications to existing circuits and can be certified with a MEIWC."
  },
  {
    id: 2,
    question: "What essential test results must be recorded on the MEIWC?",
    options: [
      "Only insulation resistance",
      "Continuity, insulation resistance, polarity, earth fault loop impedance, and RCD operation (where applicable)",
      "Only RCD trip times",
      "No tests are required for minor works"
    ],
    correctAnswer: 1,
    explanation: "The MEIWC requires recording of essential tests: continuity of protective conductors, insulation resistance, polarity verification, earth fault loop impedance (Zs), and RCD operation time where the circuit is RCD protected."
  },
  {
    id: 3,
    question: "When replacing a damaged socket outlet on an existing circuit, what should be checked?",
    options: [
      "Nothing - just swap the socket",
      "The new socket matches the old colour",
      "Polarity, earth continuity, and insulation resistance at a minimum",
      "Only that the new socket works"
    ],
    correctAnswer: 2,
    explanation: "Even when replacing an accessory like-for-like, basic verification tests should be performed: check polarity is correct, earth continuity exists, and insulation resistance is satisfactory. This confirms the work is safe."
  },
  {
    id: 4,
    question: "Who can sign a Minor Electrical Installation Works Certificate?",
    options: [
      "Only a registered electrician",
      "Only the designer",
      "The competent person carrying out the work",
      "The client must countersign"
    ],
    correctAnswer: 2,
    explanation: "The MEIWC is signed by the single competent person who carried out the work. They accept responsibility for the design, construction, inspection and testing. The person must be competent to carry out the work and testing."
  },
  {
    id: 5,
    question: "What is the maximum number of alterations/additions that can be covered by one MEIWC?",
    options: [
      "Only one alteration per certificate",
      "Up to three alterations",
      "Multiple alterations if on same circuit and completed at same time",
      "Unlimited alterations on any circuits"
    ],
    correctAnswer: 2,
    explanation: "A MEIWC can cover multiple alterations or additions provided they are on the same circuit or related circuits and completed as part of the same piece of work. For completely separate circuits or extensive work, multiple certificates or an EIC may be needed."
  },
  {
    id: 6,
    question: "A MEIWC is used for adding an outdoor socket fed from an existing kitchen circuit. What additional consideration applies?",
    options: [
      "No additional considerations",
      "The outdoor socket must be RCD protected - verify this is provided",
      "An EIC is required for outdoor work",
      "Outdoor sockets don't need testing"
    ],
    correctAnswer: 1,
    explanation: "Regulation 411.3.3 requires additional protection by RCD (30mA max) for socket-outlets up to 32A in AC, including outdoor sockets. Verify the existing circuit has RCD protection or provide it. Record RCD test results on the MEIWC."
  },
  {
    id: 7,
    question: "What should be recorded in the 'Description of Work' section of the MEIWC?",
    options: [
      "Just 'minor work'",
      "A clear description of the work carried out, sufficient to identify what was done",
      "Only the circuit reference number",
      "The client's name"
    ],
    correctAnswer: 1,
    explanation: "The description should clearly identify the work carried out, e.g., 'Added double socket outlet to ring final circuit in lounge - fed from existing socket at skirting level'. This provides a record for future reference."
  },
  {
    id: 8,
    question: "If the Zs reading on an altered circuit exceeds the maximum permitted value, what action is required?",
    options: [
      "Record it as 'satisfactory' if close to the limit",
      "Investigate and rectify - the work cannot be certified until compliant",
      "Issue the MEIWC with a note about the reading",
      "Refer it to the DNO"
    ],
    correctAnswer: 1,
    explanation: "If Zs exceeds the maximum value in Table 41.3 (or Table 41.4 for TT), the circuit does not comply. The fault must be investigated and rectified before certification. Never certify non-compliant work."
  },
  {
    id: 9,
    question: "What minimum insulation resistance reading is required on a 230V circuit being altered?",
    options: [
      "0.5 megohms",
      "1.0 megohms",
      "2.0 megohms",
      "Any positive reading"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 6.1 requires minimum 1.0 megohms for circuits operating at up to 500V. This applies whether issuing an EIC or MEIWC. Readings below this require investigation and rectification."
  },
  {
    id: 10,
    question: "How long should a copy of the MEIWC be retained by the contractor?",
    options: [
      "1 year",
      "3 years",
      "6 years minimum (recommended)",
      "It doesn't need to be kept"
    ],
    correctAnswer: 2,
    explanation: "Contractors should retain copies of all certificates for a minimum of 6 years. This provides protection in case of disputes and allows reference for future work. Many retain records for longer or indefinitely."
  },
  {
    id: 11,
    question: "Replacing a faulty MCB in a consumer unit with a like-for-like replacement requires:",
    options: [
      "An EIC because work is in the consumer unit",
      "A MEIWC for the replacement",
      "No certificate - it's just a repair",
      "An EICR"
    ],
    correctAnswer: 1,
    explanation: "Replacing a faulty MCB is minor work and should be documented with a MEIWC. The certificate confirms the replacement is correct type and rating, and that basic tests have been performed to verify safe operation."
  },
  {
    id: 12,
    question: "The MEIWC includes a section for circuit details. What must be recorded here?",
    options: [
      "Just the circuit number",
      "Circuit reference, protective device details, and existing installation reference if known",
      "Only the address",
      "The meter serial number"
    ],
    correctAnswer: 1,
    explanation: "The circuit details section should include: the circuit reference/number, type and rating of protective device (e.g., 32A Type B MCB), and reference to any existing certification for the installation if available."
  }
];

const faqs = [
  {
    question: "Can I use a MEIWC when adding multiple socket outlets to the same ring circuit?",
    answer: "Yes, if you're adding sockets to an existing ring circuit without installing any new protective devices, this is classed as minor work. Multiple additions on the same circuit can be covered by one MEIWC if done at the same time."
  },
  {
    question: "Do I need a MEIWC just for replacing a light switch?",
    answer: "Technically, any electrical work should be documented. For simple like-for-like replacement of an accessory by a competent person, some interpret this as maintenance. However, best practice is to issue a MEIWC to confirm the work was tested and found satisfactory."
  },
  {
    question: "What if I discover a fault on the existing circuit while doing minor work?",
    answer: "If you discover an existing fault, you should inform the client verbally and in writing. The fault is outside the scope of your minor work. Complete your work and certify only what you've done. Recommend further investigation of the existing fault."
  },
  {
    question: "Can I use a MEIWC for adding a cooker switch to an existing cooker circuit?",
    answer: "Yes. Adding or replacing an accessory on an existing circuit is minor work. However, if you're installing a completely new cooker circuit, that requires an EIC because it's a new circuit."
  },
  {
    question: "Is the MEIWC format in BS 7671 mandatory?",
    answer: "The model form in Appendix 6 provides guidance. Alternative forms can be used provided they contain equivalent information. Many competent person schemes and companies use their own branded forms based on the model."
  },
  {
    question: "What if I can't access the consumer unit to test the protective device rating?",
    answer: "You should make reasonable efforts to verify the protective device details. If the consumer unit is genuinely inaccessible (e.g., locked cupboard, client restriction), note this limitation on the certificate. Always verify Zs at the point of work."
  }
];

const Level3Module5Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5-section5">
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
            <span>Module 5.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Minor Electrical Installation Works Certificate
          </h1>
          <p className="text-white/80">
            The simplified certification for alterations and additions without new circuits
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>When:</strong> Additions/alterations NOT including new circuits</li>
              <li><strong>Who:</strong> Single signature from person doing the work</li>
              <li><strong>What:</strong> Test results included on certificate form</li>
              <li><strong>NOT for:</strong> New circuits, consumer unit changes, rewires</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Single-page certificate with test results section</li>
              <li><strong>Use:</strong> Adding sockets, replacing accessories, extensions</li>
              <li><strong>Apply:</strong> Complete all test fields, describe work clearly</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish when MEIWC vs EIC is appropriate",
              "Complete all sections of the MEIWC correctly",
              "Record essential test results on the certificate",
              "Describe the work accurately for future reference",
              "Understand single-signature responsibility",
              "Identify limitations of the MEIWC scope"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: When to Use MEIWC */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            When to Use the MEIWC
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Minor Electrical Installation Works Certificate is designed for minor work that does not include the installation of a new circuit. It provides a simplified certification process for straightforward additions and alterations to existing installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Appropriate for MEIWC</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Adding socket outlets to existing circuit</li>
                  <li>Adding fused spurs for fixed equipment</li>
                  <li>Replacing accessories (switches, sockets)</li>
                  <li>Adding light points to existing circuit</li>
                  <li>Replacing a damaged length of cable</li>
                  <li>Like-for-like MCB replacement</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Requires EIC Instead</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Installing any new circuit</li>
                  <li>Consumer unit replacement</li>
                  <li>New distribution boards</li>
                  <li>Complete or partial rewires</li>
                  <li>New circuits for extensions</li>
                  <li>EV charger installation (new circuit)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The key question to ask:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Am I installing a new protective device (MCB/RCBO) for this work?</strong></li>
                <li>If YES - use an EIC (new circuit being created)</li>
                <li>If NO - MEIWC is appropriate (altering/extending existing circuit)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> When in doubt, use an EIC. It provides more comprehensive documentation. Using an EIC when a MEIWC would suffice is acceptable; using a MEIWC when an EIC is required is not.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Certificate Structure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Certificate Structure and Completion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The MEIWC is a single-page certificate (compared to the multi-page EIC) that combines the declaration, circuit details, and test results in one document. It requires only one signature from the person carrying out the work.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key sections to complete:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Part 1 - Details of Minor Works:</strong> Address, description of work, date</li>
                <li><strong>Part 2 - Installation Details:</strong> Earthing system, protective device details</li>
                <li><strong>Part 3 - Essential Tests:</strong> Continuity, insulation resistance, Zs, RCD</li>
                <li><strong>Part 4 - Declaration:</strong> Single signature confirming compliance</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Single Signature</p>
                <p className="text-white/90 text-xs">One person responsible for all aspects</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Integrated Tests</p>
                <p className="text-white/90 text-xs">Results recorded on certificate form</p>
              </div>
            </div>

            <p>
              Unlike the EIC where separate schedules are required, all essential information for minor work is contained on the single certificate form. This reflects the simpler nature of the work being certified.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example description:</strong> "Added twin 13A socket outlet to ring final circuit - Circuit 2. Fed from existing socket in hallway via 2.5mm T+E in PVC conduit. Outlet located in home office at desk height."
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Essential Tests */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Essential Tests Required
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Even though the work is classified as 'minor', full testing is still required to verify safety. The test results section on the MEIWC must be completed with actual measured values, not just tick boxes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Tests to record on MEIWC:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Continuity of protective conductors:</strong> Earth path to new/altered points</li>
                <li><strong>Insulation resistance:</strong> Between L-E, N-E, L-N (minimum 1.0 megohm)</li>
                <li><strong>Polarity:</strong> Verified correct at all points</li>
                <li><strong>Earth fault loop impedance (Zs):</strong> At furthest point of altered circuit</li>
                <li><strong>RCD operation:</strong> Trip time at rated current (if applicable)</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Insulation</p>
                <p className="text-white/90 text-xs">Min 1.0 megohms at 500V DC</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Zs Limit</p>
                <p className="text-white/90 text-xs">Per Table 41.3 for device</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">RCD Trip</p>
                <p className="text-white/90 text-xs">300ms max at 1x rated</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> The protective device type and rating must be recorded. This allows verification that Zs values comply with the limits for that specific device. A 32A Type B MCB has different Zs limits than a 20A Type B MCB.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Practical Examples */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Examples
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding which certificate to use comes with experience. Here are common scenarios and the appropriate certification approach.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario: Kitchen Socket Addition</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Work: Adding twin socket for worktop appliances</li>
                  <li>Method: Fused spur from existing ring</li>
                  <li>Certificate: MEIWC</li>
                  <li>Reason: No new circuit - extending existing ring</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario: Garage Supply</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Work: New supply to detached garage</li>
                  <li>Method: New radial from consumer unit</li>
                  <li>Certificate: EIC</li>
                  <li>Reason: New circuit with new MCB/RCBO</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">More examples:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Replacing damaged switch:</strong> MEIWC (like-for-like replacement)</li>
                <li><strong>Adding outdoor socket:</strong> MEIWC if fed from existing circuit</li>
                <li><strong>Electric shower:</strong> EIC (dedicated new circuit required)</li>
                <li><strong>Smoke alarm replacement:</strong> MEIWC if on existing circuit</li>
                <li><strong>EV charger:</strong> EIC (new dedicated circuit)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Some work that seems minor actually requires an EIC. Adding a smoke alarm circuit with new protective device, for example, is a new circuit even though it's small work.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Starting Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify the circuit you'll be working on</li>
                <li>Note the protective device type and rating</li>
                <li>Check the earthing system type (TN-S, TN-C-S, TT)</li>
                <li>Confirm MEIWC is appropriate (no new circuit)</li>
                <li>Prepare your test equipment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Completing the Certificate</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Write a clear, detailed description of work</li>
                <li>Record all test values - don't just tick boxes</li>
                <li>Include the circuit reference number</li>
                <li>State the protective device details accurately</li>
                <li>Sign and date the certificate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using MEIWC for new circuits:</strong> Always check if new protective device is needed</li>
                <li><strong>Missing test values:</strong> All applicable tests must have recorded values</li>
                <li><strong>Vague descriptions:</strong> Be specific about what was done and where</li>
                <li><strong>No copy retained:</strong> Always keep a copy for your records</li>
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
                <p className="font-medium text-white mb-1">MEIWC Requirements</p>
                <ul className="space-y-0.5">
                  <li>Single signature declaration</li>
                  <li>Clear description of work</li>
                  <li>Circuit and protective device details</li>
                  <li>Essential test results recorded</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Minimum Test Values</p>
                <ul className="space-y-0.5">
                  <li>Insulation resistance: 1.0 megohms min</li>
                  <li>Continuity: Low resistance confirmed</li>
                  <li>Zs: Within Table 41.3/41.4 limits</li>
                  <li>RCD: 300ms max at rated current</li>
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
            <Link to="../level3-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5-section5-5-3">
              Next: Schedule of Inspections
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section5_2;
