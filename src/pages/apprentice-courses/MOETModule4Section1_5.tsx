/**
 * MOET · Module 4 · Section 1 · Subsection 5 — Legal and Regulatory Compliance in PPM
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Documentation requirements: documentation control, auditable
 *     records."
 *   · "Record information."
 *   · "Produce or update documents. For example, handover notes and
 *     reports."
 *
 * Note: the Module 4 KSB list has no statement covering statutory/
 * regulatory duty itself (EAWR, PUWER, BS 7671 Part 6) the way Module 1's
 * list does for health and safety — only the documentation-adjacent
 * statements above map cleanly onto this page's core legal content.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Legal and Regulatory Compliance in PPM - MOET Module 4.1.5';
const DESCRIPTION =
  'EAWR duty to maintain, PUWER Regulation 5, BS 7671 Part 6, IET Guidance Note 3 periodic inspection intervals, EICR certification, statutory vs non-statutory maintenance, and insurance requirements for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'eawr-reg4',
    question:
      'Under EAWR 1989 Regulation 4(2), the duty to maintain electrical systems is best described as:',
    options: [
      'A duty that applies only to high-voltage systems',
      'A voluntary code of practice with no legal force',
      'A duty owed only by the equipment manufacturer',
      'A duty so as to prevent danger, which HSE guidance treats as effectively absolute',
    ],
    correctIndex: 3,
    explanation:
      'Regulation 4(2) requires that systems be maintained so as to prevent danger, so far as is reasonably practicable. The HSE Memorandum of Guidance clarifies that the maintenance duty is, in effect, treated as absolute — if a system is not maintained and danger results, the duty holder commits a criminal offence.',
  },
  {
    id: 'eicr-interval',
    question:
      'According to IET Guidance Note 3, what is the recommended maximum interval between periodic inspections (EICRs) for a commercial office premises?',
    options: ['5 years', '10 years', '1 year', '3 years'],
    correctIndex: 0,
    explanation:
      'IET Guidance Note 3 recommends a maximum interval of 5 years between periodic inspections for commercial premises. However, this is a maximum — the actual interval should be determined based on the type of installation, its condition, the environment and the use of the building. Higher-risk environments (e.g., construction sites — 3 months, swimming pools — 1 year) require more frequent inspection.',
  },
  {
    id: 'statutory-vs-non',
    question: 'Which of the following is an example of statutory (legally required) maintenance?',
    options: [
      'Testing fire alarm systems in compliance with the Regulatory Reform (Fire Safety) Order 2005',
      'Carrying out a thermographic survey of a distribution board',
      'Re-torquing terminal connections during routine maintenance',
      'Topping up the grease in motor bearings on a fixed schedule',
    ],
    correctIndex: 0,
    explanation:
      'Fire alarm testing is a statutory requirement under the RRO 2005, which places a legal duty on the responsible person to maintain fire detection and alarm systems. Failure to comply is a criminal offence. The other activities, while important PPM tasks, are not directly mandated by specific legislation (though EAWR and PUWER create a general duty to maintain).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The Electricity at Work Regulations 1989 apply to:',
    options: [
      'Only high-voltage systems above 1000 V',
      'All work activities involving electrical systems, regardless of voltage or location',
      'Only domestic electrical installations',
      'Only new installations during initial verification',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR 1989 applies to all work activities on or near electrical systems at any voltage, in any location. This includes low voltage, extra-low voltage and high voltage systems in domestic, commercial, industrial and agricultural settings. The regulations place duties on employers, employees and the self-employed.',
  },
  {
    id: 2,
    question: 'PUWER 1998 Regulation 5 requires that work equipment is:',
    options: [
      'Replaced with new equipment every five years',
      'Inspected only when a fault has already occurred',
      'Maintained in an efficient state, in efficient working order and in good repair',
      'Tested only by the original equipment manufacturer',
    ],
    correctAnswer: 2,
    explanation:
      'PUWER Regulation 5 requires that work equipment is maintained in an efficient state, in efficient working order and in good repair. Where the safety of the equipment depends on the installation conditions, it must be inspected at suitable intervals. A maintenance log must be kept up to date.',
  },
  {
    id: 3,
    question: 'BS 7671 Part 6 covers:',
    options: [
      'The design of protective devices and circuit arrangements',
      'The selection and erection of wiring systems',
      'Earthing arrangements and protective conductors',
      'Inspection, testing and verification of electrical installations including periodic inspection',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Part 6 covers inspection, testing and verification. This includes initial verification of new installations and periodic inspection and testing of existing installations. It defines the scope of inspection, the tests required, and the criteria for certification including the Electrical Installation Condition Report (EICR).',
  },
  {
    id: 4,
    question: 'An EICR (Electrical Installation Condition Report) is:',
    options: [
      'A formal report on the condition of an existing electrical installation, classifying defects by severity and recommending a next inspection date',
      'A certificate issued for a new installation before it is first energised',
      "A manufacturer's declaration that equipment complies with its product standard",
      'A record of the portable appliance tests carried out across a site',
    ],
    correctAnswer: 0,
    explanation:
      'An EICR is a formal report produced following a periodic inspection and testing of an existing installation. It records the condition of the installation, classifies any defects or deviations using codes (C1 — danger present, C2 — potentially dangerous, C3 — improvement recommended, FI — further investigation), and recommends a date for the next inspection.',
  },
  {
    id: 5,
    question:
      'IET Guidance Note 3 recommends a maximum periodic inspection interval of 3 months for:',
    options: [
      'Commercial offices',
      'Construction site installations',
      'Churches and religious buildings',
      'Domestic dwellings',
    ],
    correctAnswer: 1,
    explanation:
      'Construction site installations are subject to the harshest conditions — exposure to weather, mechanical damage, temporary connections and frequent modification. IET GN3 recommends inspection at a maximum interval of 3 months. This reflects the high risk and rapidly changing nature of construction site electrical installations.',
  },
  {
    id: 6,
    question:
      "Under the Regulatory Reform (Fire Safety) Order 2005, the 'responsible person' must:",
    options: [
      'Carry out a five-yearly EICR on the electrical installation',
      'Maintain only the emergency lighting, not the fire alarm',
      'Carry out a fire risk assessment and ensure fire safety measures (including fire detection, alarm and emergency lighting) are maintained',
      'Appoint an external contractor to assume all legal responsibility',
    ],
    correctAnswer: 2,
    explanation:
      'The RRO 2005 requires the responsible person to carry out a fire risk assessment, implement appropriate fire safety measures, and ensure they are maintained in working order. This includes fire detection and alarm systems (BS 5839-1) and emergency lighting (BS 5266-1). Weekly, monthly and annual testing is required with documented records.',
  },
  {
    id: 7,
    question: 'The difference between statutory and non-statutory maintenance is:',
    options: [
      'Statutory maintenance applies only to high-voltage systems',
      'Non-statutory maintenance is illegal and must be avoided',
      'Statutory maintenance is carried out annually and non-statutory monthly',
      'Statutory maintenance is required by law; non-statutory maintenance is best practice recommended by standards, manufacturers or insurers',
    ],
    correctAnswer: 3,
    explanation:
      'Statutory maintenance is required by specific legislation (EAWR, RRO, PUWER, LOLER, etc.) and failure to comply is a criminal offence. Non-statutory maintenance is recommended by industry standards, manufacturer guidelines, or insurance requirements — it is good practice but not directly mandated by law. Both are essential for a comprehensive maintenance programme.',
  },
  {
    id: 8,
    question: 'Insurance companies typically require evidence of:',
    options: [
      'A maintained electrical installation with a satisfactory EICR and documented maintenance records',
      'A verbal assurance from the premises occupier',
      'A single inspection carried out when the building was built',
      'Maintenance records held only by the insurance broker',
    ],
    correctAnswer: 0,
    explanation:
      'Insurance companies commonly require a satisfactory EICR (not older than 5 years for most commercial premises), evidence of regular maintenance including thermographic surveys, and documented fire alarm and emergency lighting test records. Failure to provide these may void the policy or result in claims being rejected.',
  },
  {
    id: 9,
    question: 'The EICR classification code C1 means:',
    options: [
      'Improvement recommended — advisory only',
      'Danger present — risk of injury; immediate remedial action required',
      'Potentially dangerous — urgent remedial action required',
      'Further investigation required without delay',
    ],
    correctAnswer: 1,
    explanation:
      'C1 (Danger present) is the most serious classification, meaning there is a risk of injury and immediate remedial action is required. Examples include exposed live conductors, missing protective devices, and absent earthing. The inspector has a duty to inform the person ordering the inspection immediately and may need to make the situation safe before leaving site.',
  },
  {
    id: 10,
    question: 'Under EAWR 1989, who has a duty to maintain electrical systems?',
    options: [
      'Only the original electrical contractor who installed the system',
      'Only the distribution network operator (DNO)',
      'The duty holder — typically the employer, building owner or person in control of the premises',
      'Only the local authority building control department',
    ],
    correctAnswer: 2,
    explanation:
      "The duty to maintain falls on the 'duty holder' — the person who has control of the electrical system. This is typically the employer, building owner or premises occupier. They may delegate the practical work to maintenance technicians or contractors, but the legal responsibility remains with the duty holder. Employees also have a duty to cooperate with maintenance arrangements.",
  },
  {
    id: 11,
    question: 'A periodic inspection (EICR) should include:',
    options: [
      'A visual inspection only, with no electrical testing required',
      'Testing of every circuit at full load while energised',
      'A fire risk assessment of the whole premises',
      'Visual inspection, testing (insulation resistance, earth continuity, polarity, RCD, loop impedance) and sampling of circuits as appropriate',
    ],
    correctAnswer: 3,
    explanation:
      'A periodic inspection involves a comprehensive visual inspection of the installation followed by appropriate testing. This includes insulation resistance, earth continuity, polarity, RCD operation, earth fault loop impedance, and prospective fault current measurements. The extent of testing (sampling percentage) depends on the type and age of the installation.',
  },
  {
    id: 12,
    question:
      'BS 7671 regulation 135.1 states that the period between inspections should be determined by:',
    options: [
      'The type of installation, its use and operation, the frequency and quality of maintenance, and the external influences to which it is subjected',
      'A fixed interval of five years for every installation',
      'The preference of the person carrying out the inspection',
      'The age of the consumer unit alone',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Regulation 135.1 requires that the interval between inspections is determined by considering the type of installation, its use and operation, the frequency and quality of maintenance, and the external influences to which it is subjected. IET Guidance Note 3 provides recommended maximum intervals, but these are guidance — the actual interval should reflect the specific conditions.',
  },
];

const faqs = [
  {
    question: 'Is it a legal requirement to have an EICR?',
    answer:
      'While EAWR 1989 does not specifically mention EICRs by name, Regulation 4(2) creates a duty to maintain electrical systems to prevent danger. Periodic inspection (resulting in an EICR) is the established way of demonstrating compliance with this duty. For residential lettings in England, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 make 5-yearly EICRs a specific legal requirement. For commercial premises, EICRs are effectively required by EAWR, insurance policies and fire risk assessments.',
  },
  {
    question: 'What happens if the EICR is unsatisfactory?',
    answer:
      'An unsatisfactory EICR means the installation has defects classified as C1 (danger present) or C2 (potentially dangerous). C1 defects require immediate remedial action — the inspector may need to make the situation safe before leaving. C2 defects require urgent remedial action. The duty holder must arrange for the defects to be corrected by a competent person, and a follow-up inspection of the remedial work should be carried out. For rented properties, landlords must complete remedial works within 28 days of being notified.',
  },
  {
    question: 'Who can carry out an EICR?',
    answer:
      'An EICR must be carried out by a person who is competent to do so. In practice, this means a qualified electrician who holds appropriate inspection and testing qualifications (typically C&G 2391 or equivalent), has adequate experience, and is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, etc.). The inspector must be able to interpret the results of tests and make informed judgements about the condition of the installation.',
  },
  {
    question: 'Do I need to keep maintenance records for EAWR compliance?',
    answer:
      'EAWR 1989 does not explicitly require maintenance records, but the HSE Memorandum of Guidance on EAWR strongly recommends them. PUWER 1998 Regulation 5 does require a maintenance log where appropriate. In practice, maintenance records are essential for demonstrating compliance, and their absence makes it very difficult to defend against enforcement action. Courts expect to see evidence of a systematic maintenance programme.',
  },
  {
    question: 'What is the difference between BS 7671 and the Electricity at Work Regulations?',
    answer:
      'EAWR 1989 is legislation (law) — compliance is a legal requirement enforced by the HSE with criminal penalties for breach. BS 7671 is a British Standard (technical standard) — it provides detailed technical requirements for electrical installation design, installation, inspection and testing. While BS 7671 is not itself law, it is widely accepted as the benchmark for demonstrating compliance with the requirements of EAWR. Following BS 7671 is considered the primary way of satisfying the legal duty to prevent danger from electrical installations.',
  },
];

const MOETModule4Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.1 · Subsection 5"
        title="Legal and Regulatory Compliance in PPM"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            EAWR, PUWER, BS 7671, EICRs, statutory obligations and insurance requirements.
          </p>

          <TLDR
            points={[
              'EAWR Reg 4(2): Absolute duty to maintain electrical systems.',
              'PUWER Reg 5: Equipment in efficient state and good repair.',
              'BS 7671 Part 6: Periodic inspection and EICR requirements.',
              'RRO 2005: Statutory fire alarm and emergency lighting testing.',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EICRs:</strong> Periodic inspection at intervals per IET GN3.
              </li>
              <li>
                <strong>Defect codes:</strong> C1 danger, C2 potentially dangerous, C3 improvement.
              </li>
              <li>
                <strong>Insurance:</strong> Satisfactory EICR and records typically required.
              </li>
              <li>
                <strong>ST1426:</strong> Regulatory knowledge is a core KSB requirement.
              </li>
            </ul>
          </ConceptBlock>

          <Prerequisites
            items={[
              {
                term: 'The Electricity at Work Regulations',

                gist: 'The statutory duties: Reg 4(2) maintenance, Reg 13 precautions on dead equipment, Reg 14 live working, Reg 16 competence.',

                where: '1.4.2',
              },

              {
                term: 'PUWER',

                gist: 'Work equipment must be suitable, maintained, inspected and used only by people who have been trained.',

                where: '1.4.4',
              },

              {
                term: 'BS 7671 and where it sits',

                gist: 'The Wiring Regulations are a standard, not statute — compliance is how you demonstrate the EAWR duties have been met. Current edition 2018+A4:2026.',

                where: '1.4.3',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the duty to maintain under EAWR 1989 and PUWER 1998',
              'Describe the periodic inspection requirements of BS 7671 Part 6',
              'Apply IET Guidance Note 3 recommended inspection intervals',
              'Distinguish between statutory and non-statutory maintenance obligations',
              'Interpret EICR defect classification codes (C1, C2, C3, FI)',
              'Identify insurance and compliance documentation requirements',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The duty to maintain: EAWR and PUWER</ContentEyebrow>

          <ConceptBlock title="Two pieces of legislation that create a direct legal duty">
            <p>
              Two key pieces of UK legislation create direct legal duties to maintain electrical
              systems: the Electricity at Work Regulations 1989 (EAWR) and the Provision and Use of
              Work Equipment Regulations 1998 (PUWER). Understanding these duties is essential for
              maintenance technicians and is assessed as part of the ST1426 apprenticeship.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 4(2)"
            clause="As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger."
            meaning={
              <ul className="list-disc space-y-1.5 pl-5 marker:text-purple-300/60">
                <li>
                  <strong>Scope:</strong> All electrical systems at all voltages in all workplaces
                </li>
                <li>
                  <strong>Duty holder:</strong> Employer, self-employed, or any person who has
                  control of the system
                </li>
                <li>
                  <strong>Nature of duty:</strong> The HSE Memorandum of Guidance clarifies that the
                  duty to maintain is absolute in its effect — if the system is not maintained and
                  danger results, an offence has been committed
                </li>
                <li>
                  <strong>Records:</strong> While not explicitly required, the HSE strongly
                  recommends maintenance records as evidence of compliance
                </li>
                <li>
                  <strong>Enforcement:</strong> HSE inspectors can issue improvement notices,
                  prohibition notices, or prosecute for breaches
                </li>
              </ul>
            }
            cite="Reference: EAWR 1989, Regulation 4(2)"
          />

          <RegsCallout
            source="Provision and Use of Work Equipment Regulations 1998 — Regulation 5"
            clause="Every employer shall ensure that work equipment is maintained in an efficient state, in efficient working order and in good repair."
            meaning={
              <ul className="list-disc space-y-1.5 pl-5 marker:text-purple-300/60">
                <li>
                  <strong>Scope:</strong> All work equipment — which includes electrical equipment
                  used at work
                </li>
                <li>
                  <strong>Maintenance log:</strong> Where appropriate, a maintenance log must be
                  kept up to date
                </li>
                <li>
                  <strong>Inspection:</strong> Where safety depends on installation conditions,
                  equipment must be inspected at suitable intervals
                </li>
                <li>
                  <strong>Records of inspection:</strong> Records must be kept until the next
                  inspection is carried out
                </li>
              </ul>
            }
            cite="Reference: PUWER 1998, Regulation 5"
          />

          <ConceptBlock title="Criminal liability">
            <p>
              Breach of EAWR or PUWER is a criminal offence. Penalties can include unlimited fines
              and imprisonment. Directors and senior managers can be held personally liable under
              HASAWA 1974 Section 37 if the offence was committed with their consent, connivance or
              neglect. For maintenance technicians, there is also a personal duty under EAWR
              Regulation 3 to cooperate with the employer in meeting the maintenance requirements.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 Part 6 and periodic inspection</ContentEyebrow>

          <ConceptBlock title="The primary mechanism for verifying ongoing safety">
            <p>
              BS 7671 (IET Wiring Regulations) Part 6 sets out the requirements for inspection and
              testing of electrical installations. While initial verification applies to new work,
              periodic inspection applies to existing installations and is the primary mechanism for
              verifying ongoing compliance and safety.
            </p>
          </ConceptBlock>

          <ConceptBlock title="IET Guidance Note 3 — recommended maximum intervals">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Installation type
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Max interval
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Domestic (owner-occupied)</td>
                    <td className="border border-white/10 px-3 py-2">10 years</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Domestic (rented — England)
                    </td>
                    <td className="border border-white/10 px-3 py-2">5 years (statutory)</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Commercial offices/shops</td>
                    <td className="border border-white/10 px-3 py-2">5 years</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Industrial</td>
                    <td className="border border-white/10 px-3 py-2">3 years</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Hospitals and medical</td>
                    <td className="border border-white/10 px-3 py-2">5 years</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Educational establishments</td>
                    <td className="border border-white/10 px-3 py-2">5 years</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Theatres and cinemas</td>
                    <td className="border border-white/10 px-3 py-2">3 years</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Swimming pools</td>
                    <td className="border border-white/10 px-3 py-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Construction sites</td>
                    <td className="border border-white/10 px-3 py-2">3 months</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Agricultural and horticultural
                    </td>
                    <td className="border border-white/10 px-3 py-2">3 years</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Marinas</td>
                    <td className="border border-white/10 px-3 py-2">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="EICR defect classification codes">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Code
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Meaning
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Action required
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-red-400">
                      C1
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Danger present — risk of injury
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Immediate remedial action required
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-orange-400">
                      C2
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Potentially dangerous
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Urgent remedial action required
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">
                      C3
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Improvement recommended
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Not a defect per se, but improvement desirable
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-blue-400">
                      FI
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Further investigation required
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Cannot determine condition without further investigation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Statutory vs non-statutory maintenance</ContentEyebrow>

          <ConceptBlock title="Both matter — only one carries legal penalties">
            <p>
              Maintenance obligations can be divided into statutory requirements (required by law)
              and non-statutory requirements (recommended by standards, manufacturers or insurers).
              Both are important, but statutory requirements carry legal penalties for
              non-compliance.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Category
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Statutory examples
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Non-statutory examples
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Electrical installation
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Periodic inspection (EAWR Reg 4(2))
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Thermographic survey, torque checking
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Fire safety</td>
                    <td className="border border-white/10 px-3 py-2">
                      Fire alarm testing (RRO 2005), emergency lighting testing
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Detector sensitivity testing beyond minimum
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Work equipment</td>
                    <td className="border border-white/10 px-3 py-2">
                      Equipment maintenance (PUWER Reg 5)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Manufacturer recommended service intervals
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Lifting equipment
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      6/12-monthly thorough examination (LOLER 1998)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      More frequent operator checks
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Pressure systems
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Written scheme of examination (PSSR 2000)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Routine compressor maintenance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Insurance requirements">
            <p>
              Insurance policies typically require evidence of a maintained installation. Common
              requirements include a satisfactory EICR, documented fire alarm and emergency lighting
              test records, thermographic survey reports, and PAT testing records. Failure to
              maintain these records may result in claims being rejected or policies being voided.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Compliance documentation">
            <p>
              A comprehensive compliance file should contain: current EICR, fire alarm log book,
              emergency lighting log book, PAT testing records, maintenance schedules and completed
              work orders, thermographic survey reports, and any condition monitoring data. This
              file should be available for inspection by the HSE, fire authority, insurers and
              auditors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>The maintenance technician&apos;s role in compliance</ContentEyebrow>

          <ConceptBlock title="Both practical and professional">
            <p>
              As a maintenance technician working towards ST1426, your role in regulatory compliance
              is both practical and professional. You are the eyes and hands of the maintenance
              programme — carrying out the work, recording the findings and raising concerns.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Your compliance responsibilities">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Follow the schedule:</strong> Complete PPM tasks on time and to the standard
                required
              </li>
              <li>
                <strong>Record accurately:</strong> Document findings truthfully and completely —
                never falsify records
              </li>
              <li>
                <strong>Report defects:</strong> Raise any deficiencies, hazards or non-compliance
                you discover
              </li>
              <li>
                <strong>Work safely:</strong> Follow safe systems of work, permits and isolation
                procedures
              </li>
              <li>
                <strong>Know the law:</strong> Understand which maintenance activities are statutory
                requirements
              </li>
              <li>
                <strong>Continuous learning:</strong> Keep your knowledge of regulations and
                standards current
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Falsifying maintenance records is a serious professional and legal matter"
            whatHappens={
              <>
                If a record states that a fire alarm was tested when it was not, and a fire
                subsequently occurs with casualties, the person who signed the record faces criminal
                prosecution for fraud and potentially for manslaughter.
              </>
            }
            doInstead={
              <>
                Always record what you actually did and what you actually found — the maintenance
                record is a legal document.
              </>
            }
          />

          <p className="text-[13.5px] leading-relaxed text-elec-yellow/90">
            <span className="mr-1.5 font-semibold text-elec-yellow">ST1426 link: </span>
            The maintenance technician standard requires knowledge of statutory and regulatory
            requirements, the ability to work within compliance frameworks, and professional
            behaviours including honesty, integrity and responsibility. These are assessed through
            the knowledge test and professional discussion at end-point assessment.
          </p>

          <SectionRule />

          <KeyTakeaways
            title="Key legislation"
            points={[
              'EAWR 1989 — Reg 4(2) duty to maintain.',
              'PUWER 1998 — Reg 5 efficient state and good repair.',
              'RRO 2005 — Fire safety system maintenance.',
              'HASAWA 1974 — Overarching employer duties.',
              'LOLER 1998 — Lifting equipment examination.',
            ]}
          />

          <KeyTakeaways
            title="EICR classification"
            points={[
              'C1 — Danger present: immediate action.',
              'C2 — Potentially dangerous: urgent action.',
              'C3 — Improvement recommended: advisory.',
              'FI — Further investigation required.',
              'Satisfactory EICR = no C1 or C2 codes.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section1-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Electrical Inspection Routines
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Visual and Sensory Inspection
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section1_5;
