import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Legal and Regulatory Compliance in PPM - MOET Module 4.1.5";
const DESCRIPTION = "EAWR duty to maintain, PUWER Regulation 5, BS 7671 Part 6, IET Guidance Note 3 periodic inspection intervals, EICR certification, statutory vs non-statutory maintenance, and insurance requirements for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "eawr-reg4",
    question: "Under EAWR 1989 Regulation 4(2), the duty to maintain electrical systems is:",
    options: [
      "Advisory — it is a recommendation only",
      "Qualified by 'so far as reasonably practicable'",
      "An absolute duty — there is no defence based on cost or difficulty",
      "Only applicable to high voltage installations"
    ],
    correctIndex: 2,
    explanation: "Regulation 4(2) of the Electricity at Work Regulations 1989 is an absolute duty — it states that electrical systems shall be maintained so as to prevent danger. Unlike many health and safety duties, there is no 'so far as reasonably practicable' qualifier. If an electrical system is not maintained and danger results, the duty holder is guilty of a criminal offence."
  },
  {
    id: "eicr-interval",
    question: "According to IET Guidance Note 3, what is the recommended maximum interval between periodic inspections (EICRs) for a commercial office premises?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctIndex: 2,
    explanation: "IET Guidance Note 3 recommends a maximum interval of 5 years between periodic inspections for commercial premises. However, this is a maximum — the actual interval should be determined based on the type of installation, its condition, the environment and the use of the building. Higher-risk environments (e.g., construction sites — 3 months, swimming pools — 1 year) require more frequent inspection."
  },
  {
    id: "statutory-vs-non",
    question: "Which of the following is an example of statutory (legally required) maintenance?",
    options: [
      "Cleaning dust from inside a distribution board",
      "Re-greasing motor bearings",
      "Testing fire alarm systems in compliance with the Regulatory Reform (Fire Safety) Order 2005",
      "Replacing a luminaire that has reached end of life"
    ],
    correctIndex: 2,
    explanation: "Fire alarm testing is a statutory requirement under the RRO 2005, which places a legal duty on the responsible person to maintain fire detection and alarm systems. Failure to comply is a criminal offence. The other activities, while important PPM tasks, are not directly mandated by specific legislation (though EAWR and PUWER create a general duty to maintain)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Electricity at Work Regulations 1989 apply to:",
    options: [
      "Only new electrical installations",
      "All work activities involving electrical systems, regardless of voltage or location",
      "Only installations above 1,000 V",
      "Only installations in domestic premises"
    ],
    correctAnswer: 1,
    explanation: "EAWR 1989 applies to all work activities on or near electrical systems at any voltage, in any location. This includes low voltage, extra-low voltage and high voltage systems in domestic, commercial, industrial and agricultural settings. The regulations place duties on employers, employees and the self-employed."
  },
  {
    id: 2,
    question: "PUWER 1998 Regulation 5 requires that work equipment is:",
    options: [
      "Replaced every five years",
      "Maintained in an efficient state, in efficient working order and in good repair",
      "Only maintained when it breaks down",
      "Maintained by the manufacturer only"
    ],
    correctAnswer: 1,
    explanation: "PUWER Regulation 5 requires that work equipment is maintained in an efficient state, in efficient working order and in good repair. Where the safety of the equipment depends on the installation conditions, it must be inspected at suitable intervals. A maintenance log must be kept up to date."
  },
  {
    id: 3,
    question: "BS 7671 Part 6 covers:",
    options: [
      "The design of new electrical installations",
      "Inspection, testing and verification of electrical installations including periodic inspection",
      "The selection of cables and conductors",
      "Lightning protection systems"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Part 6 covers inspection, testing and verification. This includes initial verification of new installations and periodic inspection and testing of existing installations. It defines the scope of inspection, the tests required, and the criteria for certification including the Electrical Installation Condition Report (EICR)."
  },
  {
    id: 4,
    question: "An EICR (Electrical Installation Condition Report) is:",
    options: [
      "A design document for new installations",
      "A formal report on the condition of an existing electrical installation, classifying defects by severity and recommending a next inspection date",
      "An insurance policy for electrical installations",
      "A building regulation approval certificate"
    ],
    correctAnswer: 1,
    explanation: "An EICR is a formal report produced following a periodic inspection and testing of an existing installation. It records the condition of the installation, classifies any defects or deviations using codes (C1 — danger present, C2 — potentially dangerous, C3 — improvement recommended, FI — further investigation), and recommends a date for the next inspection."
  },
  {
    id: 5,
    question: "IET Guidance Note 3 recommends a maximum periodic inspection interval of 3 months for:",
    options: [
      "Domestic dwellings",
      "Commercial offices",
      "Construction site installations",
      "Churches and religious buildings"
    ],
    correctAnswer: 2,
    explanation: "Construction site installations are subject to the harshest conditions — exposure to weather, mechanical damage, temporary connections and frequent modification. IET GN3 recommends inspection at a maximum interval of 3 months. This reflects the high risk and rapidly changing nature of construction site electrical installations."
  },
  {
    id: 6,
    question: "Under the Regulatory Reform (Fire Safety) Order 2005, the 'responsible person' must:",
    options: [
      "Only call the fire brigade in an emergency",
      "Carry out a fire risk assessment and ensure fire safety measures (including fire detection, alarm and emergency lighting) are maintained",
      "Only install fire extinguishers",
      "Only carry out fire drills"
    ],
    correctAnswer: 1,
    explanation: "The RRO 2005 requires the responsible person to carry out a fire risk assessment, implement appropriate fire safety measures, and ensure they are maintained in working order. This includes fire detection and alarm systems (BS 5839-1) and emergency lighting (BS 5266-1). Weekly, monthly and annual testing is required with documented records."
  },
  {
    id: 7,
    question: "The difference between statutory and non-statutory maintenance is:",
    options: [
      "There is no difference",
      "Statutory maintenance is required by law; non-statutory maintenance is best practice recommended by standards, manufacturers or insurers",
      "Statutory maintenance is more expensive",
      "Non-statutory maintenance is more important"
    ],
    correctAnswer: 1,
    explanation: "Statutory maintenance is required by specific legislation (EAWR, RRO, PUWER, LOLER, etc.) and failure to comply is a criminal offence. Non-statutory maintenance is recommended by industry standards, manufacturer guidelines, or insurance requirements — it is good practice but not directly mandated by law. Both are essential for a comprehensive maintenance programme."
  },
  {
    id: 8,
    question: "Insurance companies typically require evidence of:",
    options: [
      "A maintained electrical installation with a satisfactory EICR and documented maintenance records",
      "Only that the building has electricity connected",
      "The original installation certificate from when the building was first wired",
      "A letter from the electricity supplier"
    ],
    correctAnswer: 0,
    explanation: "Insurance companies commonly require a satisfactory EICR (not older than 5 years for most commercial premises), evidence of regular maintenance including thermographic surveys, and documented fire alarm and emergency lighting test records. Failure to provide these may void the policy or result in claims being rejected."
  },
  {
    id: 9,
    question: "The EICR classification code C1 means:",
    options: [
      "Improvement recommended",
      "Potentially dangerous — urgent remedial action required",
      "Danger present — risk of injury; immediate remedial action required",
      "Further investigation required"
    ],
    correctAnswer: 2,
    explanation: "C1 (Danger present) is the most serious classification, meaning there is a risk of injury and immediate remedial action is required. Examples include exposed live conductors, missing protective devices, and absent earthing. The inspector has a duty to inform the person ordering the inspection immediately and may need to make the situation safe before leaving site."
  },
  {
    id: 10,
    question: "Under EAWR 1989, who has a duty to maintain electrical systems?",
    options: [
      "Only qualified electricians",
      "Only the HSE",
      "The duty holder — typically the employer, building owner or person in control of the premises",
      "Only the local electricity distribution company"
    ],
    correctAnswer: 2,
    explanation: "The duty to maintain falls on the 'duty holder' — the person who has control of the electrical system. This is typically the employer, building owner or premises occupier. They may delegate the practical work to maintenance technicians or contractors, but the legal responsibility remains with the duty holder. Employees also have a duty to cooperate with maintenance arrangements."
  },
  {
    id: 11,
    question: "A periodic inspection (EICR) should include:",
    options: [
      "Only a visual inspection of the consumer unit",
      "Visual inspection, testing (insulation resistance, earth continuity, polarity, RCD, loop impedance) and sampling of circuits as appropriate",
      "Only testing of the main switch",
      "Only checking that the electricity meter is reading correctly"
    ],
    correctAnswer: 1,
    explanation: "A periodic inspection involves a comprehensive visual inspection of the installation followed by appropriate testing. This includes insulation resistance, earth continuity, polarity, RCD operation, earth fault loop impedance, and prospective fault current measurements. The extent of testing (sampling percentage) depends on the type and age of the installation."
  },
  {
    id: 12,
    question: "BS 7671 regulation 135.1 states that the period between inspections should be determined by:",
    options: [
      "The insurance company only",
      "The type of installation, its use and operation, the frequency and quality of maintenance, and the external influences to which it is subjected",
      "A fixed 5-year interval for all installations",
      "The age of the building"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 135.1 requires that the interval between inspections is determined by considering the type of installation, its use and operation, the frequency and quality of maintenance, and the external influences to which it is subjected. IET Guidance Note 3 provides recommended maximum intervals, but these are guidance — the actual interval should reflect the specific conditions."
  }
];

const faqs = [
  {
    question: "Is it a legal requirement to have an EICR?",
    answer: "While EAWR 1989 does not specifically mention EICRs by name, Regulation 4(2) creates a duty to maintain electrical systems to prevent danger. Periodic inspection (resulting in an EICR) is the established way of demonstrating compliance with this duty. For residential lettings in England, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 make 5-yearly EICRs a specific legal requirement. For commercial premises, EICRs are effectively required by EAWR, insurance policies and fire risk assessments."
  },
  {
    question: "What happens if the EICR is unsatisfactory?",
    answer: "An unsatisfactory EICR means the installation has defects classified as C1 (danger present) or C2 (potentially dangerous). C1 defects require immediate remedial action — the inspector may need to make the situation safe before leaving. C2 defects require urgent remedial action. The duty holder must arrange for the defects to be corrected by a competent person, and a follow-up inspection of the remedial work should be carried out. For rented properties, landlords must complete remedial works within 28 days of being notified."
  },
  {
    question: "Who can carry out an EICR?",
    answer: "An EICR must be carried out by a person who is competent to do so. In practice, this means a qualified electrician who holds appropriate inspection and testing qualifications (typically C&G 2391 or equivalent), has adequate experience, and is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, etc.). The inspector must be able to interpret the results of tests and make informed judgements about the condition of the installation."
  },
  {
    question: "Do I need to keep maintenance records for EAWR compliance?",
    answer: "EAWR 1989 does not explicitly require maintenance records, but the HSE Memorandum of Guidance on EAWR strongly recommends them. PUWER 1998 Regulation 5 does require a maintenance log where appropriate. In practice, maintenance records are essential for demonstrating compliance, and their absence makes it very difficult to defend against enforcement action. Courts expect to see evidence of a systematic maintenance programme."
  },
  {
    question: "What is the difference between BS 7671 and the Electricity at Work Regulations?",
    answer: "EAWR 1989 is legislation (law) — compliance is a legal requirement enforced by the HSE with criminal penalties for breach. BS 7671 is a British Standard (technical standard) — it provides detailed technical requirements for electrical installation design, installation, inspection and testing. While BS 7671 is not itself law, it is widely accepted as the benchmark for demonstrating compliance with the requirements of EAWR. Following BS 7671 is considered the primary way of satisfying the legal duty to prevent danger from electrical installations."
  }
];

const MOETModule4Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 4.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Legal and Regulatory Compliance in PPM
          </h1>
          <p className="text-white/80">
            EAWR, PUWER, BS 7671, EICRs, statutory obligations and insurance requirements
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>EAWR Reg 4(2):</strong> Absolute duty to maintain electrical systems</li>
              <li className="pl-1"><strong>PUWER Reg 5:</strong> Equipment in efficient state and good repair</li>
              <li className="pl-1"><strong>BS 7671 Part 6:</strong> Periodic inspection and EICR requirements</li>
              <li className="pl-1"><strong>RRO 2005:</strong> Statutory fire alarm and emergency lighting testing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>EICRs:</strong> Periodic inspection at intervals per IET GN3</li>
              <li className="pl-1"><strong>Defect codes:</strong> C1 danger, C2 potentially dangerous, C3 improvement</li>
              <li className="pl-1"><strong>Insurance:</strong> Satisfactory EICR and records typically required</li>
              <li className="pl-1"><strong>ST1426:</strong> Regulatory knowledge is a core KSB requirement</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the duty to maintain under EAWR 1989 and PUWER 1998",
              "Describe the periodic inspection requirements of BS 7671 Part 6",
              "Apply IET Guidance Note 3 recommended inspection intervals",
              "Distinguish between statutory and non-statutory maintenance obligations",
              "Interpret EICR defect classification codes (C1, C2, C3, FI)",
              "Identify insurance and compliance documentation requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Duty to Maintain: EAWR and PUWER
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Two key pieces of UK legislation create direct legal duties to maintain electrical systems:
              the Electricity at Work Regulations 1989 (EAWR) and the Provision and Use of Work Equipment
              Regulations 1998 (PUWER). Understanding these duties is essential for maintenance technicians
              and is assessed as part of the ST1426 apprenticeship.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">EAWR 1989 — Regulation 4(2)</h3>
              <p className="text-sm text-white mb-2">
                "As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so
                far as is reasonably practicable, such danger."
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Scope:</strong> All electrical systems at all voltages in all workplaces</li>
                <li className="pl-1"><strong>Duty holder:</strong> Employer, self-employed, or any person who has control of the system</li>
                <li className="pl-1"><strong>Nature of duty:</strong> The HSE Memorandum of Guidance clarifies that the duty to maintain is absolute in its effect — if the system is not maintained and danger results, an offence has been committed</li>
                <li className="pl-1"><strong>Records:</strong> While not explicitly required, the HSE strongly recommends maintenance records as evidence of compliance</li>
                <li className="pl-1"><strong>Enforcement:</strong> HSE inspectors can issue improvement notices, prohibition notices, or prosecute for breaches</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">PUWER 1998 — Regulation 5</h3>
              <p className="text-sm text-white mb-2">
                "Every employer shall ensure that work equipment is maintained in an efficient state, in
                efficient working order and in good repair."
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Scope:</strong> All work equipment — which includes electrical equipment used at work</li>
                <li className="pl-1"><strong>Maintenance log:</strong> Where appropriate, a maintenance log must be kept up to date</li>
                <li className="pl-1"><strong>Inspection:</strong> Where safety depends on installation conditions, equipment must be inspected at suitable intervals</li>
                <li className="pl-1"><strong>Records of inspection:</strong> Records must be kept until the next inspection is carried out</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Criminal Liability</p>
              <p className="text-sm text-white">
                Breach of EAWR or PUWER is a criminal offence. Penalties can include unlimited fines and
                imprisonment. Directors and senior managers can be held personally liable under HASAWA 1974
                Section 37 if the offence was committed with their consent, connivance or neglect. For
                maintenance technicians, there is also a personal duty under EAWR Regulation 3 to cooperate
                with the employer in meeting the maintenance requirements.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS 7671 Part 6 and Periodic Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 (IET Wiring Regulations) Part 6 sets out the requirements for inspection and testing
              of electrical installations. While initial verification applies to new work, periodic
              inspection applies to existing installations and is the primary mechanism for verifying
              ongoing compliance and safety.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">IET Guidance Note 3 — Recommended Maximum Intervals</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Installation Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Interval</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Domestic (owner-occupied)</td><td className="border border-white/10 px-3 py-2">10 years</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Domestic (rented — England)</td><td className="border border-white/10 px-3 py-2">5 years (statutory)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Commercial offices/shops</td><td className="border border-white/10 px-3 py-2">5 years</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Industrial</td><td className="border border-white/10 px-3 py-2">3 years</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Hospitals and medical</td><td className="border border-white/10 px-3 py-2">5 years</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Educational establishments</td><td className="border border-white/10 px-3 py-2">5 years</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Theatres and cinemas</td><td className="border border-white/10 px-3 py-2">3 years</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Swimming pools</td><td className="border border-white/10 px-3 py-2">1 year</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Construction sites</td><td className="border border-white/10 px-3 py-2">3 months</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Agricultural and horticultural</td><td className="border border-white/10 px-3 py-2">3 years</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Marinas</td><td className="border border-white/10 px-3 py-2">1 year</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">EICR Defect Classification Codes</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Code</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-red-400">C1</td>
                      <td className="border border-white/10 px-3 py-2">Danger present — risk of injury</td>
                      <td className="border border-white/10 px-3 py-2">Immediate remedial action required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-orange-400">C2</td>
                      <td className="border border-white/10 px-3 py-2">Potentially dangerous</td>
                      <td className="border border-white/10 px-3 py-2">Urgent remedial action required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">C3</td>
                      <td className="border border-white/10 px-3 py-2">Improvement recommended</td>
                      <td className="border border-white/10 px-3 py-2">Not a defect per se, but improvement desirable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-blue-400">FI</td>
                      <td className="border border-white/10 px-3 py-2">Further investigation required</td>
                      <td className="border border-white/10 px-3 py-2">Cannot determine condition without further investigation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Statutory vs Non-Statutory Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintenance obligations can be divided into statutory requirements (required by law) and
              non-statutory requirements (recommended by standards, manufacturers or insurers). Both are
              important, but statutory requirements carry legal penalties for non-compliance.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Statutory Examples</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Non-Statutory Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Electrical installation</td>
                      <td className="border border-white/10 px-3 py-2">Periodic inspection (EAWR Reg 4(2))</td>
                      <td className="border border-white/10 px-3 py-2">Thermographic survey, torque checking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Fire safety</td>
                      <td className="border border-white/10 px-3 py-2">Fire alarm testing (RRO 2005), emergency lighting testing</td>
                      <td className="border border-white/10 px-3 py-2">Detector sensitivity testing beyond minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Work equipment</td>
                      <td className="border border-white/10 px-3 py-2">Equipment maintenance (PUWER Reg 5)</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer recommended service intervals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Lifting equipment</td>
                      <td className="border border-white/10 px-3 py-2">6/12-monthly thorough examination (LOLER 1998)</td>
                      <td className="border border-white/10 px-3 py-2">More frequent operator checks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Pressure systems</td>
                      <td className="border border-white/10 px-3 py-2">Written scheme of examination (PSSR 2000)</td>
                      <td className="border border-white/10 px-3 py-2">Routine compressor maintenance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Insurance Requirements</h3>
                <p className="text-sm text-white">
                  Insurance policies typically require evidence of a maintained installation. Common
                  requirements include a satisfactory EICR, documented fire alarm and emergency lighting
                  test records, thermographic survey reports, and PAT testing records. Failure to maintain
                  these records may result in claims being rejected or policies being voided.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Documentation</h3>
                <p className="text-sm text-white">
                  A comprehensive compliance file should contain: current EICR, fire alarm log book, emergency
                  lighting log book, PAT testing records, maintenance schedules and completed work orders,
                  thermographic survey reports, and any condition monitoring data. This file should be
                  available for inspection by the HSE, fire authority, insurers and auditors.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The Maintenance Technician's Role in Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As a maintenance technician working towards ST1426, your role in regulatory compliance is
              both practical and professional. You are the eyes and hands of the maintenance programme —
              carrying out the work, recording the findings and raising concerns.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Your Compliance Responsibilities</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Follow the schedule:</strong> Complete PPM tasks on time and to the standard required</li>
                <li className="pl-1"><strong>Record accurately:</strong> Document findings truthfully and completely — never falsify records</li>
                <li className="pl-1"><strong>Report defects:</strong> Raise any deficiencies, hazards or non-compliance you discover</li>
                <li className="pl-1"><strong>Work safely:</strong> Follow safe systems of work, permits and isolation procedures</li>
                <li className="pl-1"><strong>Know the law:</strong> Understand which maintenance activities are statutory requirements</li>
                <li className="pl-1"><strong>Continuous learning:</strong> Keep your knowledge of regulations and standards current</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Professional Integrity</p>
              <p className="text-sm text-white">
                Falsifying maintenance records is a serious professional and legal matter. If a record states
                that a fire alarm was tested when it was not, and a fire subsequently occurs with casualties,
                the person who signed the record faces criminal prosecution for fraud and potentially for
                manslaughter. Always record what you actually did and what you actually found — the
                maintenance record is a legal document.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires knowledge of
              statutory and regulatory requirements, the ability to work within compliance frameworks, and
              professional behaviours including honesty, integrity and responsibility. These are assessed
              through the knowledge test and professional discussion at end-point assessment.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>EAWR 1989 — Reg 4(2) duty to maintain</li>
                  <li>PUWER 1998 — Reg 5 efficient state and good repair</li>
                  <li>RRO 2005 — Fire safety system maintenance</li>
                  <li>HASAWA 1974 — Overarching employer duties</li>
                  <li>LOLER 1998 — Lifting equipment examination</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">EICR Classification</p>
                <ul className="space-y-0.5">
                  <li>C1 — Danger present: immediate action</li>
                  <li>C2 — Potentially dangerous: urgent action</li>
                  <li>C3 — Improvement recommended: advisory</li>
                  <li>FI — Further investigation required</li>
                  <li>Satisfactory EICR = no C1 or C2 codes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Inspection Routines
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1">
              Back to Section 1 Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section1_5;
