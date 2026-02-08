import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Completing Work to Industry Standards - MOET Module 7 Section 2.5";
const DESCRIPTION = "Quality standards, workmanship expectations and compliance requirements for the EPA practical observation: BS 7671, manufacturer guidelines, professional finish and regulatory compliance under ST1426.";

const quickCheckQuestions = [
  {
    id: "bs7671-workmanship",
    question: "What does BS 7671 Regulation 134.1.1 require regarding workmanship?",
    options: [
      "Work only needs to look acceptable to the client",
      "Good workmanship by competent persons or under their supervision, using proper materials",
      "Workmanship standards only apply to new installations",
      "There are no workmanship requirements in BS 7671"
    ],
    correctIndex: 1,
    explanation: "Regulation 134.1.1 states that every electrical installation shall be designed, erected and verified by competent persons using proper materials and good workmanship. This applies equally to maintenance and repair work. The assessor uses this as the benchmark for evaluating your practical work."
  },
  {
    id: "compliance-documentation",
    question: "Why is documentation important when completing maintenance work to industry standards?",
    options: [
      "It is only needed for insurance claims",
      "Documentation provides evidence of compliance, enables future maintenance, creates an audit trail, and demonstrates professionalism",
      "It slows down the work unnecessarily",
      "Only managers need to worry about documentation"
    ],
    correctIndex: 1,
    explanation: "Documentation is integral to industry standards. It provides evidence that work was completed correctly and in compliance with regulations, enables future technicians to understand what was done, creates an audit trail for quality management, and demonstrates the professional behaviours assessed in the EPA."
  },
  {
    id: "ip-rating-awareness",
    question: "When replacing a component in a panel with an IP rating, what must you ensure?",
    options: [
      "IP ratings are not important for maintenance work",
      "The panel's IP rating is maintained after the work — all covers, gaskets and cable entries are properly refitted and sealed",
      "Only the front cover matters",
      "IP ratings only apply to outdoor installations"
    ],
    correctIndex: 1,
    explanation: "Maintaining the IP (Ingress Protection) rating is a regulatory and safety requirement. If you leave a cable entry unsealed, a cover off, or a gasket misaligned, the IP rating is compromised. This could allow moisture, dust or vermin ingress, leading to faults or safety hazards. The assessor will check this during the EPA."
  },
  {
    id: "torque-settings",
    question: "Why is it important to apply the manufacturer's specified torque settings when making electrical connections?",
    options: [
      "Torque settings are only suggestions, not requirements",
      "Under-tightened connections can overheat and cause fires; over-tightened connections can damage conductors and terminals — correct torque ensures safe, durable connections",
      "Any tightness is acceptable as long as the conductor does not pull out",
      "Torque settings only matter for high-voltage installations"
    ],
    correctIndex: 1,
    explanation: "Correct torque is a safety-critical requirement. Under-tightened connections create high-resistance joints that overheat, potentially causing fires. Over-tightened connections damage conductor strands or crack terminal housings. Using a calibrated torque screwdriver and applying the manufacturer's specified values ensures connections are safe, reliable and compliant."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "BS 7671 requires that all electrical work shall be carried out by:",
    options: [
      "Anyone willing to do the work",
      "Competent persons or persons under their supervision, using proper materials and good workmanship",
      "Only fully qualified electricians with JIB cards",
      "Persons who have completed an online course"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 134.1.1 requires competent persons or supervised persons, proper materials, and good workmanship. Competence includes appropriate training, qualifications, and experience for the specific work being undertaken."
  },
  {
    id: 2,
    question: "When completing a repair, 'proper materials' under BS 7671 means:",
    options: [
      "The cheapest available materials",
      "Materials that comply with relevant British or European standards, are suitable for the conditions, and are correctly rated",
      "Any materials that fit",
      "Only materials from the original manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Proper materials must comply with relevant product standards (BS EN standards), be suitable for the environmental conditions (temperature, moisture, corrosion), and be correctly rated for the electrical parameters. Using non-compliant materials undermines the safety of the installation."
  },
  {
    id: 3,
    question: "After completing maintenance work, you should carry out a visual inspection to verify:",
    options: [
      "The work looks visually clean only",
      "Correct component installation, secure connections, proper cable management, labelling, and no damage to adjacent equipment",
      "Only that the circuit operates",
      "The client is satisfied with the appearance"
    ],
    correctAnswer: 1,
    explanation: "A post-work visual inspection is a systematic check of workmanship quality, safety compliance, and completeness. It should cover component installation, connection security, cable management, identification and labelling, and confirmation that no collateral damage has occurred."
  },
  {
    id: 4,
    question: "Circuit identification and labelling after maintenance work is required because:",
    options: [
      "It makes the installation look professional",
      "BS 7671 requires accurate circuit identification at distribution boards and equipment, enabling safe future maintenance and isolation",
      "It is optional for maintenance work",
      "Labelling is only required on new installations"
    ],
    correctAnswer: 1,
    explanation: "Regulation 514.9.1 requires every circuit to be identified with information necessary for safe maintenance and operation. If your maintenance work changes any circuit details, the labelling must be updated. Incorrect labelling is a safety hazard — it could lead to working on the wrong circuit."
  },
  {
    id: 5,
    question: "Maintaining the IP rating of an enclosure during maintenance means:",
    options: [
      "Painting the enclosure after work",
      "Ensuring all covers, gaskets, cable glands and entries are correctly refitted to restore the original ingress protection",
      "Writing the IP rating on the front",
      "IP ratings cannot be maintained during maintenance"
    ],
    correctAnswer: 1,
    explanation: "The IP rating protects against ingress of solid objects and moisture. During maintenance, you may need to remove covers and open cable entries. After work, every cover must be refitted, gaskets must be intact and correctly positioned, cable glands must be tight, and any unused entries must be blanked."
  },
  {
    id: 6,
    question: "Manufacturer's instructions and data sheets should be followed during maintenance because:",
    options: [
      "They are interesting to read",
      "They contain specific installation requirements, torque settings, clearances and operating parameters that ensure the component works safely and correctly",
      "They are legally binding documents",
      "Only new installations need to follow manufacturer's instructions"
    ],
    correctAnswer: 1,
    explanation: "Manufacturer's instructions provide the specific information needed for correct installation: torque settings, conductor sizes, clearances, orientation requirements, and operating conditions. Deviating from these instructions can compromise the component's safety and void any warranty or certification."
  },
  {
    id: 7,
    question: "A minor works certificate (BS 7671 Appendix 6) should be completed when:",
    options: [
      "Only for new installations",
      "Maintenance work involves additions or alterations to an existing circuit, such as adding a socket or replacing a distribution board",
      "Any maintenance work is carried out",
      "Only when the client requests it"
    ],
    correctAnswer: 1,
    explanation: "A minor works certificate is required for additions or alterations to existing circuits. Like-for-like replacement of a component in a maintenance context may not require one, but any change that alters the circuit (different rating, additional point, new circuit) does. Knowing when certification is required demonstrates professional competence."
  },
  {
    id: 8,
    question: "Professional cable management in a distribution board includes:",
    options: [
      "Pushing cables in any available space",
      "Neatly dressed conductors, correct bending radii, no strain on terminals, clear labelling, and segregation of power and control circuits where required",
      "Using cable ties every 10 mm",
      "Leaving slack for future modifications only"
    ],
    correctAnswer: 1,
    explanation: "Professional cable management includes: neat dressing with appropriate bending radii, no mechanical strain on terminals, clear identification of each conductor, segregation where required (e.g., SELV from LV), and sufficient — but not excessive — slack. This workmanship quality is clearly visible and assessed during the EPA."
  },
  {
    id: 9,
    question: "When your maintenance work affects the protective devices in a circuit, you should:",
    options: [
      "Assume they are still correct from the original installation",
      "Verify that protection coordination is maintained — the protective device rating, type and characteristics are still appropriate for the circuit",
      "Remove the protective devices for testing off-site",
      "Replace all protective devices as a precaution"
    ],
    correctAnswer: 1,
    explanation: "Any work affecting protective devices must be verified. Confirm the device rating is correct for the circuit conductor size, the type is appropriate for the load, the breaking capacity exceeds the prospective fault current, and discrimination with upstream devices is maintained."
  },
  {
    id: 10,
    question: "Cleaning up the work area after completing maintenance is important because:",
    options: [
      "It makes a good impression but is not strictly necessary",
      "It prevents safety hazards, demonstrates professional standards, ensures no debris or tools are left in equipment, and is an assessed behaviour in the EPA",
      "Only for appearance during the EPA",
      "The client's cleaner will handle it"
    ],
    correctAnswer: 1,
    explanation: "Housekeeping is both a safety requirement and a professional behaviour. Debris in electrical equipment can cause faults or fires. Tools left behind can cause short circuits. A clean, organised work area demonstrates the professional standards expected of a competent maintenance technician and is directly assessed in the EPA."
  },
  {
    id: 11,
    question: "What is the significance of the CE/UKCA marking on electrical components?",
    options: [
      "It indicates the component is expensive",
      "It confirms the component meets the essential safety requirements of relevant UK/EU product standards and can be legally placed on the market",
      "It is a quality award from the manufacturer",
      "It indicates the component is recycled"
    ],
    correctAnswer: 1,
    explanation: "The CE (EU) and UKCA (UK) markings confirm that the product meets the essential safety, health and environmental requirements of the relevant regulations. Using components without these markings is a compliance issue. As a maintenance technician, you should check for these markings when selecting replacement components."
  },
  {
    id: 12,
    question: "When verifying completed maintenance work, functional testing should include:",
    options: [
      "Simply switching the circuit on and confirming power is present",
      "Confirming correct operation under normal and fault conditions, checking protective device operation, verifying control sequences, and recording all test results",
      "Only checking the voltage at the supply point",
      "Functional testing is not required for maintenance work"
    ],
    correctAnswer: 1,
    explanation: "Functional testing verifies that the complete system operates correctly — not just that power is present. This includes checking that motors run in the correct direction, control sequences operate as designed, protective devices trip at the correct settings, interlocks function, and all alarm and indication systems respond correctly. Recording results provides evidence of thorough verification."
  }
];

const faqs = [
  {
    question: "What standard of workmanship is expected in the EPA practical observation?",
    answer: "The EPA expects workmanship that would be acceptable in a professional, commercial or industrial environment. This means: secure, correctly torqued connections; neat cable management; correct component installation and orientation; accurate labelling; clean work area; and compliance with BS 7671, manufacturer's instructions and relevant regulations. The assessor is looking for evidence that you can produce work to a standard that a qualified supervisor would accept."
  },
  {
    question: "Do I need to issue certification for maintenance work carried out during the EPA?",
    answer: "You should understand when certification is required and be able to explain this to the assessor, even if you do not physically complete a certificate during the EPA. Knowing that a minor works certificate is needed for alterations, and that like-for-like replacement may not need one, demonstrates your understanding of compliance requirements. Your training provider will confirm the specific EPA requirements."
  },
  {
    question: "How do I demonstrate compliance with industry standards without memorising regulation numbers?",
    answer: "You do not need to quote specific regulation numbers. Demonstrate compliance through your actions: check component ratings match requirements, follow manufacturer's instructions, use correct tools, apply proper torque, manage cables neatly, test before and after, and maintain the IP rating of enclosures. If you naturally reference standards (e.g., 'I am following the manufacturer's torque setting'), this shows awareness without requiring memorisation."
  },
  {
    question: "What counts as 'good workmanship' in the eyes of an EPA assessor?",
    answer: "Good workmanship encompasses: safe working throughout, correct use of tools and instruments, proper cable preparation and termination, neat cable management, correct component installation, thorough functional testing, accurate labelling, clean work area, and professional documentation. It is the overall quality and care evident in your work, not just whether the circuit functions."
  },
  {
    question: "Can I lose marks for finishing ahead of time if my work is correct?",
    answer: "No. Finishing efficiently while maintaining quality and safety is a positive indicator. However, candidates who rush and produce poor workmanship in order to finish quickly will score lower than those who take appropriate time to produce quality work. The assessor evaluates the quality of the work, not the speed of completion."
  }
];

const MOETModule7Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Completing Work to Industry Standards
          </h1>
          <p className="text-white/80">
            Quality standards, professional workmanship and regulatory compliance for EPA success
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS 7671:</strong> Good workmanship, proper materials, competent persons</li>
              <li className="pl-1"><strong>Manufacturer:</strong> Follow data sheets and installation guides</li>
              <li className="pl-1"><strong>Quality:</strong> Connections, cable management, labelling, testing</li>
              <li className="pl-1"><strong>Evidence:</strong> Documentation and certification where required</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Assessed:</strong> Workmanship quality is directly marked</li>
              <li className="pl-1"><strong>Distinction:</strong> Exceptional quality and attention to detail</li>
              <li className="pl-1"><strong>Compliance:</strong> Demonstrating regulatory awareness</li>
              <li className="pl-1"><strong>ST1426:</strong> Professional standards and behaviours</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BS 7671 workmanship requirements to all maintenance and repair work",
              "Follow manufacturer's instructions and data sheets for correct component installation",
              "Demonstrate professional cable management and termination quality",
              "Maintain IP ratings and environmental protection after maintenance",
              "Complete appropriate documentation and certification for maintenance work",
              "Understand when minor works certificates and other compliance documents are required"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS 7671 Workmanship Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671:2018+A2:2022 (the 18th Edition IET Wiring Regulations) sets the benchmark for all electrical work
              in the UK. Chapter 13 establishes the fundamental principles, including the requirement for good workmanship
              by competent persons using proper materials. These requirements apply to maintenance and repair work just as
              much as new installations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Workmanship Regulations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reg 134.1.1:</strong> Good workmanship by competent persons using proper materials</li>
                <li className="pl-1"><strong>Reg 510.1:</strong> Selection and erection of equipment shall comply with the relevant regulations</li>
                <li className="pl-1"><strong>Reg 514.9.1:</strong> Accurate circuit identification and labelling at every distribution board</li>
                <li className="pl-1"><strong>Reg 526.1:</strong> Connections must provide durable electrical continuity and adequate mechanical strength</li>
                <li className="pl-1"><strong>Reg 526.3:</strong> Connections must be accessible for inspection and testing (with some defined exceptions)</li>
                <li className="pl-1"><strong>Reg 421.1.201:</strong> Precautions to prevent fire — including correct cable selection and installation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Maintenance vs New Installation Standards</p>
              <p className="text-sm text-white">
                There is a common misconception that maintenance work does not need to meet the same standard as new
                installations. This is incorrect. BS 7671 applies to all electrical work, and the Electricity at Work
                Regulations 1989 require all electrical systems to be maintained in a safe condition. Your maintenance
                work must meet the same quality and compliance standards as a new installation.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> During the EPA, the assessor evaluates your workmanship against the BS 7671
              standard. Every connection, cable route, and component installation should demonstrate that you understand
              and apply these requirements as a matter of professional habit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Professional Workmanship in Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Good workmanship is visible. An experienced assessor can tell the quality of your work at a glance — neat
              cable management, consistent termination quality, correct component orientation, and attention to detail all
              contribute to the overall standard. These elements combine to create work that is safe, reliable, and
              maintainable.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Workmanship Quality Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Connections:</strong> Correct torque, full conductor insertion, no stray strands, correct ferrules where needed</li>
                <li className="pl-1"><strong>Cable management:</strong> Neat routing, correct bending radii, proper support, no strain on terminals</li>
                <li className="pl-1"><strong>Component mounting:</strong> Secure fixings, correct orientation, DIN rail clips engaged, adequate clearance</li>
                <li className="pl-1"><strong>Labelling:</strong> Clear, durable, accurate identification of circuits, components and cables</li>
                <li className="pl-1"><strong>Segregation:</strong> Power and control circuits separated where required by BS 7671 Chapter 52</li>
                <li className="pl-1"><strong>Protection:</strong> IP rating maintained, covers refitted, gaskets in place, blanking plates fitted</li>
                <li className="pl-1"><strong>Testing:</strong> Continuity, insulation resistance, and functional tests completed and recorded</li>
                <li className="pl-1"><strong>Housekeeping:</strong> Work area clean, debris removed from equipment, tools accounted for</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Connection Quality: Pass vs Distinction</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Pass Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Distinction Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Torque</td>
                      <td className="border border-white/10 px-3 py-2">Adequately tightened</td>
                      <td className="border border-white/10 px-3 py-2">Torque screwdriver used, manufacturer's values applied</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable dressing</td>
                      <td className="border border-white/10 px-3 py-2">Acceptable routing</td>
                      <td className="border border-white/10 px-3 py-2">Neat, consistent bending radii, no crossing conductors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ferrules</td>
                      <td className="border border-white/10 px-3 py-2">Used where required</td>
                      <td className="border border-white/10 px-3 py-2">Correct size, proper crimping, consistent throughout</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Identification</td>
                      <td className="border border-white/10 px-3 py-2">Basic labelling present</td>
                      <td className="border border-white/10 px-3 py-2">Comprehensive, durable labels matching circuit chart</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Workmanship quality is the most visible indicator of competence. An assessor
              who sees neat, professional work immediately has confidence in your ability. Conversely, poor workmanship
              raises doubts about every aspect of your practice.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Environmental Protection and IP Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical enclosures are designed to protect against the ingress of solid objects and moisture, classified
              by their IP (Ingress Protection) rating. During maintenance, opening enclosures compromises this protection.
              Restoring the IP rating after work is a professional responsibility that is often overlooked — and is
              specifically checked by EPA assessors.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common IP Ratings in Electrical Maintenance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">IP Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Protection Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IP20</td>
                      <td className="border border-white/10 px-3 py-2">Finger-safe, no moisture protection</td>
                      <td className="border border-white/10 px-3 py-2">Internal distribution boards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IP44</td>
                      <td className="border border-white/10 px-3 py-2">Protected against objects &gt; 1 mm and splashing water</td>
                      <td className="border border-white/10 px-3 py-2">Indoor industrial panels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IP55</td>
                      <td className="border border-white/10 px-3 py-2">Dust-protected, protected against water jets</td>
                      <td className="border border-white/10 px-3 py-2">Outdoor enclosures, washdown areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IP65</td>
                      <td className="border border-white/10 px-3 py-2">Dust-tight, protected against water jets</td>
                      <td className="border border-white/10 px-3 py-2">Outdoor equipment, food processing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IP66</td>
                      <td className="border border-white/10 px-3 py-2">Dust-tight, protected against powerful water jets</td>
                      <td className="border border-white/10 px-3 py-2">External switchgear, harsh environments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maintaining IP Ratings After Maintenance</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Covers:</strong> Refit all covers with correct fixings — do not leave any missing or loosely fitted</li>
                <li className="pl-1"><strong>Gaskets:</strong> Check gasket condition before refitting — replace any that are damaged, compressed or perished</li>
                <li className="pl-1"><strong>Cable glands:</strong> Tighten all glands to the correct compression — verify the seal around the cable sheath</li>
                <li className="pl-1"><strong>Blanking plates:</strong> Fit blanking plates to any unused cable entries — do not leave open holes</li>
                <li className="pl-1"><strong>Door seals:</strong> Ensure enclosure door seals are intact and the door closes fully and latches correctly</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> After maintenance, check every opening you created: covers, cable entries,
              glands, blanking plates. If you opened it, you are responsible for restoring it to its original IP rating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documentation and Compliance Records
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Completing work to industry standards includes creating appropriate documentation. This provides evidence
              of compliance, enables future maintenance, and demonstrates the professional behaviours expected under
              ST1426. The level of documentation depends on the nature and extent of the work.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements by Work Type</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Like-for-like replacement:</strong> Maintenance log entry with details of fault, replacement, and verification testing</li>
                <li className="pl-1"><strong>Minor alteration:</strong> Minor works certificate (BS 7671 Appendix 6) plus maintenance log</li>
                <li className="pl-1"><strong>Addition to circuit:</strong> Minor works certificate with test results for the new work</li>
                <li className="pl-1"><strong>New circuit:</strong> Electrical installation certificate (BS 7671 Appendix 6) with full Schedule of Test Results</li>
                <li className="pl-1"><strong>Periodic inspection:</strong> Electrical installation condition report (EICR)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">What to Record in a Maintenance Log</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Date, time, and technician name</li>
                <li className="pl-1">Equipment identified (location, asset number, circuit reference)</li>
                <li className="pl-1">Fault description and symptoms</li>
                <li className="pl-1">Diagnosis process and findings</li>
                <li className="pl-1">Work carried out (components replaced, adjustments made)</li>
                <li className="pl-1">Test results (pre and post repair)</li>
                <li className="pl-1">Verification of correct operation</li>
                <li className="pl-1">Recommendations for follow-up or preventive action</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Documentation is not an afterthought — it is an integral part of completing
              work to industry standards. A maintenance task is not finished until it is properly documented.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Verification Testing and Handover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The final stage of completing work to industry standards is verification — confirming that the work is
              correct, safe, and the system operates as intended. This includes both electrical testing and functional
              verification, followed by a professional handover to the responsible person. Skipping or rushing this
              stage is a common reason for lower grades in the EPA practical observation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Verification Testing Sequence</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Visual inspection:</strong> Systematic check of all work before energising — connections, cable routes, component installation, labelling</li>
                <li className="pl-1"><strong>Electrical tests:</strong> Continuity of protective conductors, insulation resistance, earth fault loop impedance where appropriate</li>
                <li className="pl-1"><strong>Functional tests:</strong> Operate the system under normal conditions — check all functions, sequences, and interlocks</li>
                <li className="pl-1"><strong>Protective device verification:</strong> Confirm RCDs trip within required times, overloads are correctly set</li>
                <li className="pl-1"><strong>Record results:</strong> Document all test readings and compare against acceptable values</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Handover</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inform the responsible person:</strong> Explain what work was carried out and confirm the system is safe to return to service</li>
                <li className="pl-1"><strong>Provide documentation:</strong> Hand over maintenance logs, test results, and any certificates</li>
                <li className="pl-1"><strong>Highlight any concerns:</strong> Report any additional issues found during the work that may require future attention</li>
                <li className="pl-1"><strong>Confirm understanding:</strong> Ensure the responsible person understands any changes made or precautions needed</li>
                <li className="pl-1"><strong>Remove isolation:</strong> Only remove lock-off and restore power when safe to do so and with authorisation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Distinction-Level Verification</p>
              <p className="text-sm text-white">
                Distinction candidates do not just confirm the work functions — they verify it thoroughly. This means
                testing under both normal and fault conditions, checking that protection coordination is maintained,
                confirming all ancillary systems (alarms, indicators, interlocks) operate correctly, and providing a
                clear, professional verbal summary of the work to the assessor or responsible person.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Completing work to industry standards is assessed across multiple EPA
              components — practical observation, professional discussion, and portfolio evidence. Demonstrating
              consistent, documented compliance is a distinction-level behaviour.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="p-4 rounded-lg bg-white/5">
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 7671 Reg 134.1.1:</strong> Good workmanship, competent persons, proper materials</li>
              <li className="pl-1"><strong>BS 7671 Reg 514.9.1:</strong> Accurate circuit identification and labelling</li>
              <li className="pl-1"><strong>BS 7671 Reg 526.1:</strong> Durable electrical continuity and mechanical strength at connections</li>
              <li className="pl-1"><strong>EAWR 1989 Reg 4(2):</strong> Electrical systems shall be maintained to prevent danger</li>
              <li className="pl-1"><strong>IP Rating:</strong> Must be restored after any maintenance that disturbs the enclosure</li>
              <li className="pl-1"><strong>CE/UKCA marking:</strong> Verify all replacement components carry appropriate product markings</li>
              <li className="pl-1"><strong>Minor works certificate:</strong> Required for alterations and additions, not like-for-like replacement</li>
              <li className="pl-1"><strong>Torque settings:</strong> Always follow manufacturer's specified values using a calibrated tool</li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Industry Standards"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Control Systems
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2-6">
              Next: Marking Criteria Awareness
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section2_5;
