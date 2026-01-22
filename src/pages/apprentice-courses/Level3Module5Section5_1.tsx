/**
 * Level 3 Module 5 Section 5.1 - Electrical Installation Certificate (EIC)
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electrical Installation Certificate (EIC) - Level 3 Module 5 Section 5.1";
const DESCRIPTION = "Master the Electrical Installation Certificate requirements, understanding when it must be issued, completing all sections correctly, and declarations by designer, constructor and inspector.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "When must an Electrical Installation Certificate (EIC) be issued?",
    options: [
      "Only for commercial installations",
      "For all new installations and additions requiring new circuit(s)",
      "Only when the client requests one",
      "Only for installations over 100A"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 644.1 requires an EIC to be issued for all new installations and for additions to existing installations that require new circuits. This is a mandatory requirement, not optional."
  },
  {
    id: "check-2",
    question: "How many signatures are required on a complete EIC for a straightforward installation?",
    options: [
      "One - the electrician",
      "Two - electrician and client",
      "Three - designer, constructor, and inspector (may be same person)",
      "Four - including the DNO"
    ],
    correctIndex: 2,
    explanation: "The EIC requires three declarations: designer, constructor (installer), and inspector (verifier). For straightforward installations, one competent person may sign all three if they carried out all roles, but all three sections must be completed."
  },
  {
    id: "check-3",
    question: "What accompanying schedule(s) must be provided with every EIC?",
    options: [
      "Only the schedule of test results",
      "Only the schedule of inspections",
      "Both the schedule of inspections AND schedule of test results",
      "Neither - schedules are optional"
    ],
    correctIndex: 2,
    explanation: "Every EIC must be accompanied by both a schedule of inspections (showing items checked) and a schedule of test results (showing measured values). Without these schedules, the certificate is incomplete and invalid."
  },
  {
    id: "check-4",
    question: "What declaration does the designer make on the EIC?",
    options: [
      "That the installation has been tested",
      "That the installation was designed in accordance with BS 7671 and complies with design requirements",
      "That the work has been completed satisfactorily",
      "That the client has paid their bill"
    ],
    correctIndex: 1,
    explanation: "The designer declares that to the best of their knowledge and belief, the design of the installation complies with BS 7671 and any agreed departures. They confirm the design criteria are appropriate for the installation characteristics."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671 Regulation 644.1, who is responsible for providing the EIC to the person ordering the work?",
    options: [
      "The DNO",
      "The client",
      "The contractor responsible for the new installation",
      "The building control officer"
    ],
    correctAnswer: 2,
    explanation: "Regulation 644.1 states that the contractor responsible for the new installation, or addition to an existing installation, shall provide the client with an Electrical Installation Certificate together with the schedules."
  },
  {
    id: 2,
    question: "What information must be entered in the 'Particulars of Installation' section of the EIC?",
    options: [
      "Only the address",
      "Address, date of installation, and description of the extent of the work",
      "Just the date",
      "Client's bank details"
    ],
    correctAnswer: 1,
    explanation: "The Particulars section must include the installation address, the date the work was completed, and a description of the extent of the work covered by the certificate. This clearly defines what the certificate covers."
  },
  {
    id: 3,
    question: "Which section of the EIC requires the designer to state maximum demand?",
    options: [
      "Particulars of Installation",
      "Details of the Designer",
      "Design - this section is completed by the Designer",
      "Inspection section"
    ],
    correctAnswer: 2,
    explanation: "The Design section, completed by the designer, must state the maximum demand (in kVA or Amps), number and type of live conductors, earthing arrangements, and protective device details at the origin."
  },
  {
    id: 4,
    question: "What does the constructor's declaration on the EIC confirm?",
    options: [
      "That they designed the installation",
      "That the construction complies with BS 7671 and good workmanship",
      "That they have tested the installation",
      "That they will return for maintenance"
    ],
    correctAnswer: 1,
    explanation: "The constructor (installer) declares that the installation has been constructed in accordance with BS 7671, using good workmanship and proper materials, and complies with the design. They confirm the work has been built correctly."
  },
  {
    id: 5,
    question: "When one person carries out design, construction and inspection, what must they do on the EIC?",
    options: [
      "Sign once and write 'as above' on other sections",
      "Complete and sign all three declarations with their details",
      "Only sign the inspection declaration",
      "Have the client sign the other sections"
    ],
    correctAnswer: 1,
    explanation: "When one person performs all roles, they must still complete all three declarations with their name, signature, and company details in each section. Each declaration has different responsibilities and must be individually acknowledged."
  },
  {
    id: 6,
    question: "What must the inspector verify before signing the EIC?",
    options: [
      "Only that they were present during installation",
      "That the installation has been inspected, tested, and complies with BS 7671",
      "Only that the visual inspection is complete",
      "Just that the client is satisfied"
    ],
    correctAnswer: 1,
    explanation: "The inspector declares that the installation has been inspected and tested in accordance with BS 7671, and to the best of their knowledge complies with the regulations. They are responsible for verifying the complete installation."
  },
  {
    id: 7,
    question: "What is the purpose of the 'Next Inspection' recommendation on the EIC?",
    options: [
      "To guarantee the installation will last until then",
      "To advise when periodic inspection and testing should be carried out",
      "To set a date for warranty expiry",
      "It's only needed for commercial installations"
    ],
    correctAnswer: 1,
    explanation: "The recommended interval for the next periodic inspection helps the client understand when the installation should be re-inspected. This varies by installation type - typically 10 years for domestic, 5 years for commercial, 1 year for swimming pools."
  },
  {
    id: 8,
    question: "If agreed departures from BS 7671 have been made, where must these be recorded?",
    options: [
      "They don't need recording",
      "In a separate letter to the client",
      "On the EIC and/or accompanying documentation",
      "Only verbally agreed"
    ],
    correctAnswer: 2,
    explanation: "Any departures from BS 7671 must be recorded on the certificate itself and/or detailed in accompanying documentation. The designer and inspector must both acknowledge these departures in their declarations."
  },
  {
    id: 9,
    question: "Which earthing arrangement details must be recorded on the EIC?",
    options: [
      "Only TN-C-S or TT",
      "Type of earthing (TN-S, TN-C-S, TT etc.), and method of protection for shock",
      "Just 'earthed' or 'not earthed'",
      "This information is only on the schedules"
    ],
    correctAnswer: 1,
    explanation: "The EIC must record the type of earthing system (TN-S, TN-C-S, TT, IT), the means of earthing provided, and the method of protection against electric shock (EEBADS, etc.). This is essential for future maintenance and alterations."
  },
  {
    id: 10,
    question: "What details of the supply must be recorded on the EIC?",
    options: [
      "Only the voltage",
      "Nominal voltage, frequency, prospective fault current at origin, and external loop impedance",
      "Just the meter number",
      "Only the supplier name"
    ],
    correctAnswer: 1,
    explanation: "Supply characteristics must include: nominal voltage (e.g., 230V), frequency (50Hz), prospective fault current at origin (Ipf), and external earth fault loop impedance (Ze). These values are essential for design verification."
  },
  {
    id: 11,
    question: "How long should the client retain the Electrical Installation Certificate?",
    options: [
      "1 year",
      "5 years",
      "For the life of the installation",
      "Until the next inspection"
    ],
    correctAnswer: 2,
    explanation: "The EIC and accompanying schedules should be kept for the life of the installation. They provide essential information for future work, alterations, additions, and periodic inspections. Regulation 514.9.1 requires this information to be available."
  },
  {
    id: 12,
    question: "What is the relationship between the model forms in Appendix 6 of BS 7671 and actual certificates used?",
    options: [
      "The model forms must be used exactly as shown",
      "They are guidance - alternative forms may be used if containing equivalent information",
      "They are only for domestic installations",
      "They are optional suggestions"
    ],
    correctAnswer: 1,
    explanation: "The model forms in Appendix 6 provide guidance. Alternative forms may be used provided they contain at least the same information. This allows competent person schemes and companies to use their own branded forms."
  }
];

const faqs = [
  {
    question: "Can I use a Minor Works Certificate instead of an EIC for a new circuit?",
    answer: "No. A new circuit always requires an EIC, not a Minor Works Certificate. The MEIWC is only for work that does not include the provision of a new circuit. Adding a new circuit, even a simple one, requires the full EIC with schedules of inspections and test results."
  },
  {
    question: "What if different people did the design, construction, and inspection?",
    answer: "Each person completes and signs their respective declaration. The designer signs the design section, the constructor signs the construction section, and the inspector signs the inspection section. Each is responsible for their part of the work."
  },
  {
    question: "Do I need to issue an EIC if I'm just replacing a consumer unit?",
    answer: "Yes. Replacing a consumer unit is classed as an alteration requiring an EIC because you are essentially providing a new distribution board. Full inspection and testing of affected circuits is required, documented on the appropriate schedules."
  },
  {
    question: "What if the supply characteristics are unknown?",
    answer: "You should obtain supply characteristics from the DNO or measure them during live testing. Ze and Ipf can be measured at the origin. If values cannot be obtained, this should be noted as a limitation. Never leave these sections blank without explanation."
  },
  {
    question: "Can the client refuse to accept the EIC?",
    answer: "The client can refuse to accept the certificate, but the contractor still has a duty to provide it. If the client refuses, document this refusal and keep a copy of the certificate. The certificate is evidence of compliance and protects both parties."
  },
  {
    question: "What's the difference between an EIC and an EICR?",
    answer: "An EIC is issued for new work (installations, alterations, additions). An EICR (Electrical Installation Condition Report) is for periodic inspection of existing installations. The EIC certifies new work complies; the EICR reports on the condition of existing installations."
  }
];

const Level3Module5Section5_1 = () => {
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
            <Link to="/study-centre/apprentice/level3-module5-section5">
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
              <li><strong>When:</strong> All new installations and additions with new circuits</li>
              <li><strong>Who:</strong> Designer, constructor, and inspector must sign</li>
              <li><strong>What:</strong> Must include schedules of inspections and test results</li>
              <li><strong>Keep:</strong> For the life of the installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Three declaration sections, attached schedules</li>
              <li><strong>Use:</strong> For new circuits, rewires, consumer unit changes</li>
              <li><strong>Apply:</strong> Complete all sections fully before handover</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Purpose and Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose and Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electrical Installation Certificate (EIC) is the primary certification document required by BS 7671 for all new electrical installations. It provides formal confirmation that the installation has been designed, constructed, and verified in accordance with the regulations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">An EIC is required for:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>New installations:</strong> Complete new electrical systems</li>
                <li><strong>Additions:</strong> New circuits added to existing installations</li>
                <li><strong>Consumer unit replacement:</strong> Classed as an alteration requiring EIC</li>
                <li><strong>Rewires:</strong> Partial or complete rewiring of premises</li>
                <li><strong>Alterations requiring new circuits:</strong> Extensions, conversions</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Regulation 644.1</p>
                <p className="text-white/90 text-xs">Requires certificate for new work</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Appendix 6</p>
                <p className="text-white/90 text-xs">Model forms provided</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Building Regs</p>
                <p className="text-white/90 text-xs">Part P compliance evidence</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The EIC is a formal declaration that the work complies with BS 7671. Signing it takes personal responsibility. Never sign a certificate for work you haven't fully verified.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Three Key Declarations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Three Key Declarations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The EIC requires three separate declarations covering the design, construction, and inspection/testing of the installation. Each declaration is a formal statement of responsibility for that aspect of the work.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Designer Declaration</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Design complies with BS 7671</li>
                  <li>Maximum demand assessed</li>
                  <li>Protective devices selected correctly</li>
                  <li>Cable sizes adequate</li>
                  <li>Earthing arrangements suitable</li>
                  <li>Any departures documented</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Constructor Declaration</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Built to the design</li>
                  <li>Good workmanship used</li>
                  <li>Proper materials employed</li>
                  <li>Complies with BS 7671</li>
                  <li>Accessories correctly installed</li>
                  <li>Labels and notices applied</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspector Declaration</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Inspection carried out</li>
                  <li>Testing completed</li>
                  <li>Complies with BS 7671</li>
                  <li>Safe to energise/use</li>
                  <li>Schedules completed</li>
                  <li>Departures acknowledged</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When one person performs all roles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>All three declarations must still be completed individually</li>
                <li>Name, signature, and date required in each section</li>
                <li>Company/employer details in each section</li>
                <li>The person accepts responsibility for all three aspects</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A sole trader installing a new circuit designs, constructs, and inspects the work. They must complete all three declarations with their name, signature, and the date in each section - not just sign once and write 'as above'.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Certificate Content Details */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Certificate Content Details
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The EIC contains detailed information about the installation, the supply, and the design criteria. All sections must be completed accurately as this information is used for future work, alterations, and periodic inspections.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Particulars of Installation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Address:</strong> Full installation address including postcode</li>
                <li><strong>Occupier:</strong> Name of the person occupying the premises</li>
                <li><strong>Description:</strong> Extent of work covered by the certificate</li>
                <li><strong>Date:</strong> Date of completion of the work</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Supply Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Earthing system:</strong> TN-S, TN-C-S, TT (tick appropriate box)</li>
                <li><strong>Number of phases:</strong> Single or three-phase</li>
                <li><strong>Nominal voltage:</strong> 230V single-phase, 400V three-phase</li>
                <li><strong>Frequency:</strong> 50 Hz</li>
                <li><strong>Ipf at origin:</strong> Prospective fault current measured/declared</li>
                <li><strong>Ze at origin:</strong> External earth fault loop impedance</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Typical Domestic Values</p>
                <p className="text-white/90 text-xs">Ze: 0.35-0.8 ohms, Ipf: 1-16 kA</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Next Inspection</p>
                <p className="text-white/90 text-xs">Domestic: 10 years, Commercial: 5 years</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> Record supply characteristics when performing live tests. These values are essential for the certificate and should match your test results. If the DNO has declared values, compare your measured values with theirs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Accompanying Schedules */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Accompanying Schedules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every EIC must be accompanied by a Schedule of Inspections and a Schedule of Test Results. Without these schedules, the certificate is incomplete. They provide the detailed evidence that supports the declarations made on the certificate.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Schedule of Inspections</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Lists items that must be visually checked</li>
                  <li>Tick boxes for compliant/not compliant/N/A</li>
                  <li>Covers wiring, accessories, protection</li>
                  <li>Includes earthing and bonding checks</li>
                  <li>Documentation and labelling verification</li>
                  <li>Must be completed for every circuit</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Schedule of Test Results</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Records actual measured values</li>
                  <li>Continuity test results (r1+r2, R1+R2)</li>
                  <li>Insulation resistance readings</li>
                  <li>Polarity verification</li>
                  <li>Earth fault loop impedance (Zs)</li>
                  <li>RCD test results and trip times</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Multiple pages for larger installations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Number each page (Page 1 of X, Page 2 of X, etc.)</li>
                <li>Reference the certificate on each schedule page</li>
                <li>Include the installation address on each page</li>
                <li>Sign and date the final page of each schedule</li>
              </ul>
            </div>

            <p>
              The schedules provide a complete record of what was checked and tested. They allow future electricians to understand what was done and provide baseline values for comparison during periodic inspection.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Electronic certification systems generate schedules automatically from entered data. Ensure all fields are completed - blank fields on electronic systems are as problematic as on paper forms.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Completing the EIC Correctly</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete all sections - do not leave blanks</li>
                <li>Use N/A where a section genuinely doesn't apply</li>
                <li>Ensure client details are correct (they receive the original)</li>
                <li>Double-check technical values match test results</li>
                <li>Verify all signatures and dates are present</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Record Keeping</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep a copy of every certificate issued (minimum 6 years)</li>
                <li>Store copies securely - they contain personal data</li>
                <li>Advise client to keep certificate for life of installation</li>
                <li>Electronic copies are acceptable if securely stored</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missing signatures:</strong> All three declarations must be signed</li>
                <li><strong>No schedules:</strong> EIC is invalid without inspection and test schedules</li>
                <li><strong>Wrong form:</strong> Using MEIWC when EIC is required</li>
                <li><strong>Blank fields:</strong> Every applicable section must be completed</li>
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
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>Reg 644.1 - Certification requirement</li>
                  <li>Reg 514.9.1 - Information availability</li>
                  <li>Appendix 6 - Model forms</li>
                  <li>Building Regs Part P - Compliance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Recommended Inspection Intervals</p>
                <ul className="space-y-0.5">
                  <li>Domestic: 10 years (or change of occupancy)</li>
                  <li>Commercial: 5 years</li>
                  <li>Industrial: 3 years</li>
                  <li>Swimming pools: 1 year</li>
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
            <Link to="/study-centre/apprentice/level3-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section5-5-2">
              Next: Minor Works Certificate
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section5_1;
