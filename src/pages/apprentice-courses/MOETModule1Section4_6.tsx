/**
 * MOET · Module 1 · Section 1.4 · Subsection 6 — Other Industry-Specific
 * Guidance
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Health and safety regulations – key features and impact on
 *                 role."
 *              · "Individual maintenance technician's roles and
 *                 responsibilities. Escalation procedures."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices.."
 *
 * Content preserved from the original page; structure, shell and reading
 * measure rebuilt on the study-centre learning kit.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Other Industry-Specific Guidance - MOET Module 1 Section 4.6';
const DESCRIPTION =
  'Comprehensive guide to industry-specific guidance for electrical maintenance technicians: HSE Guidance Notes (GS38, GS6, HSG85, HSG47, HSG230), CDM 2015, DSEAR, ATEX zones, Management Regulations 1999, professional body guidance from IET and ECA.';

const quickCheckQuestions = [
  {
    id: 'gs38-purpose',
    question: 'What is the purpose of HSE Guidance Note GS38?',
    options: [
      'It sets the inspection and testing intervals for fixed wiring installations',
      'It specifies the colour coding for conductors in three-phase systems',
      'It defines the competence requirements for electrical apprentices',
      'It specifies requirements for electrical test equipment used on low voltage systems to prevent danger',
    ],
    correctIndex: 3,
    explanation:
      'GS38 (Electrical Test Equipment for Use on Low Voltage Installations) specifies the requirements for voltage indicators, test lamps, and test probes used on low voltage systems. It requires fused probes, finger guards, minimum tip exposure, and specific construction standards to prevent electric shock and arc flash when testing.',
  },
  {
    id: 'cdm-role',
    question:
      'Under the Construction (Design and Management) Regulations 2015, which duty holder is responsible for planning, managing and monitoring the construction phase?',
    options: [
      'The principal contractor',
      'The principal designer',
      'The client',
      'The electrical subcontractor',
    ],
    correctIndex: 0,
    explanation:
      'Under CDM 2015, the principal contractor is responsible for planning, managing and monitoring the construction phase, including co-ordinating health and safety arrangements between contractors. The client has duties to make suitable arrangements, and the principal designer focuses on pre-construction design risk management.',
  },
  {
    id: 'dsear-zones',
    question:
      'Under DSEAR (Dangerous Substances and Explosive Atmospheres Regulations), electrical equipment used in a Zone 1 hazardous area must be:',
    options: [
      'Double insulated and supplied through a 30 mA RCD',
      'Rated to IP65 or higher against the ingress of dust and water',
      'Certified for use in explosive atmospheres (Ex-rated) appropriate to the zone classification',
      'Supplied at a reduced voltage of 110 V via a centre-tapped transformer',
    ],
    correctIndex: 2,
    explanation:
      'In Zone 1 areas (where an explosive atmosphere is likely to occur occasionally in normal operation), all electrical equipment must be certified Ex-rated for that zone classification. Using standard equipment in a hazardous area creates a risk of ignition from sparks, hot surfaces, or electrical arcs.',
  },
  {
    id: 'management-regs',
    question:
      'The Management of Health and Safety at Work Regulations 1999 require employers to carry out:',
    options: [
      'A thorough examination of all lifting equipment every six months',
      'Annual portable appliance testing of every item of electrical equipment',
      'Suitable and sufficient risk assessments of all significant risks arising from the work activity',
      'A written method statement for every individual maintenance task',
    ],
    correctIndex: 2,
    explanation:
      'Regulation 3 of the Management Regulations requires every employer to make a suitable and sufficient assessment of the risks to the health and safety of employees and others arising from or in connection with the conduct of their undertaking. This is the overarching risk assessment requirement that applies to all work activities.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'GS38 specifies that voltage indicator probes for use on LV systems must have:',
    options: [
      'Bare metal tips at least 20 mm long to ensure reliable electrical contact',
      'Fused leads, finger guards and a maximum exposed tip of 4 mm',
      'A single combined lead so that only one connection point is required',
      'An audible buzzer used in place of any form of visual voltage indication',
    ],
    correctAnswer: 1,
    explanation:
      'GS38 requires voltage indicator probes to have: fused leads (to protect against short-circuit currents), finger guards (to prevent accidental contact with live parts), an exposed metal tip not exceeding 4 mm measured across any surface of the tip, high-value resistors to limit the current that could flow through the body, and robust, insulated construction. These requirements prevent electric shock and arc flash during testing.',
  },
  {
    id: 2,
    question: 'HSG85 (Electricity at Work: Safe Working Practices) provides guidance on:',
    options: [
      'The classification of hazardous areas into ATEX zones',
      'The selection and sizing of protective devices to BS 7671',
      'Safe isolation procedures, permit to work systems, and live working controls for electrical maintenance',
      'The disposal of waste electrical and electronic equipment',
    ],
    correctAnswer: 2,
    explanation:
      "HSG85 is the HSE's primary guidance on safe working practices for electrical work. It covers safe isolation procedures, permit to work systems, live working controls, competence, and the practical application of the Electricity at Work Regulations 1989. It is essential reading for all electrical maintenance technicians.",
  },
  {
    id: 3,
    question:
      'GS6 (Avoidance of Danger from Overhead Electric Power Lines) is relevant to maintenance technicians when:',
    options: [
      'Excavating trenches to install new underground supply cables to a building',
      'Testing the insulation resistance of a de-energised final circuit',
      'Working inside an enclosed substation on isolated, de-energised switchgear',
      'Working near overhead power lines with cranes, MEWPs or scaffold towers',
    ],
    correctAnswer: 3,
    explanation:
      'GS6 provides guidance on avoiding danger from overhead electric power lines. It is relevant whenever work equipment (cranes, MEWPs, scaffold towers, tipping vehicles, cable drums on trailers) could approach overhead lines. Minimum safe distances must be maintained, and specific precautions (goal posts, banksmen, barriers) may be required.',
  },
  {
    id: 4,
    question:
      'HSG47 (Avoiding Danger from Underground Services) is relevant to electrical maintenance when:',
    options: [
      'Excavating near, or locating, underground cables and other buried services',
      'Testing the insulation resistance of a newly installed final circuit',
      'Replacing a faulty protective device inside an indoor distribution board',
      'Carrying out a visual inspection of accessible surface-mounted trunking',
    ],
    correctAnswer: 0,
    explanation:
      'HSG47 provides guidance on avoiding danger when excavating near underground services — electricity cables, gas pipes, water mains and telecommunications. Electrical maintenance technicians may encounter underground cables when installing new supplies, carrying out external cable repairs, or working on street lighting and external installations.',
  },
  {
    id: 5,
    question: 'The INDG series of publications from the HSE are:',
    options: [
      'Legally binding regulations with the same force as an Act of Parliament',
      'Free, short guidance leaflets aimed at workers and employers — providing practical, accessible advice',
      'Detailed technical British Standards for the construction of equipment',
      'Approved Codes of Practice that must be followed without exception',
    ],
    correctAnswer: 1,
    explanation:
      'INDG (Industry Guidance) publications are free, short leaflets published by the HSE. They provide practical, accessible guidance on specific topics — aimed at workers and employers. Examples include INDG231 (Electrical Safety and You), INDG354 (Managing Health and Safety in Construction), and INDG163 (Five Steps to Risk Assessment).',
  },
  {
    id: 6,
    question:
      'Under CDM 2015, electrical maintenance work on a construction site requires the maintenance contractor to:',
    options: [
      'Take over the duties of the principal contractor for the whole site',
      'Work entirely independently of the site safety management arrangements',
      'Co-operate with the principal contractor, comply with site rules, and report any health and safety concerns',
      'Notify the HSE directly of every task before it is carried out',
    ],
    correctAnswer: 2,
    explanation:
      'Under CDM 2015, every contractor must co-operate with the principal contractor and other contractors, comply with any directions from the principal contractor, comply with site-specific rules, and report anything likely to endanger anyone. Electrical maintenance contractors on construction sites must integrate with the overall site safety management.',
  },
  {
    id: 7,
    question:
      'The Management of Health and Safety at Work Regulations 1999 require employers to appoint:',
    options: [
      'A full-time safety officer for every site, regardless of its size',
      'An external consultant approved by the HSE for all risk assessments',
      'A trade union safety representative on every project',
      'One or more competent persons to assist with health and safety compliance',
    ],
    correctAnswer: 3,
    explanation:
      "Regulation 7 of the Management Regulations requires every employer to appoint one or more competent persons to assist them in complying with health and safety legislation. A 'competent person' is defined as someone with sufficient training, experience, knowledge and other qualities to enable them to properly assist.",
  },
  {
    id: 8,
    question:
      'DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002) applies to electrical maintenance when:',
    options: [
      'Working in or near areas classified as hazardous zones due to the presence of flammable gases, vapours, mists or combustible dusts',
      'Working at height on a fragile roof or unprotected edge',
      'Lifting heavy loads using cranes, hoists or other lifting accessories',
      'Working in confined spaces where oxygen levels may be depleted',
    ],
    correctAnswer: 0,
    explanation:
      'DSEAR applies wherever dangerous substances (flammable gases, vapours, mists, or combustible dusts) are present or may be present. This includes petrochemical plants, fuel storage facilities, grain stores, paint spray booths, battery charging rooms, and any location where an explosive atmosphere could form. Electrical equipment in these areas must be Ex-rated.',
  },
  {
    id: 9,
    question: 'The ATEX zone classification system categorises hazardous areas as:',
    options: [
      'Category 1, 2 and 3 areas based on the maximum surface temperature allowed',
      'Zones 0, 1 and 2 for gases and Zones 20, 21 and 22 for combustible dusts',
      'High, medium and low risk areas based on the number of workers present',
      'Red, amber and green zones based on proximity to the nearest ignition source',
    ],
    correctAnswer: 1,
    explanation:
      'ATEX zones classify areas based on the likelihood and duration of an explosive atmosphere: Zone 0/20 (continuously or frequently present), Zone 1/21 (likely to occur occasionally in normal operation), Zone 2/22 (not likely in normal operation, but may occur for short periods). Each zone requires equipment with a specific level of protection.',
  },
  {
    id: 10,
    question:
      'The ENA (Energy Networks Association) technical standards are relevant to electrical maintenance technicians who:',
    options: [
      'Carry out only domestic rewiring and consumer unit replacement work',
      'Test and inspect portable appliances under an in-service testing regime',
      'Work on or near DNO equipment, or interface with the public supply',
      'Install fire detection and emergency lighting systems in office buildings',
    ],
    correctAnswer: 2,
    explanation:
      'ENA technical standards (including Engineering Recommendations such as G98, G99, and G12) are relevant when maintenance work interfaces with the distribution network — including work on substations, connections to the DNO network, embedded generation connections, and any work on equipment owned by or connected to the distribution system.',
  },
  {
    id: 11,
    question: 'The Distribution Safety Rules (DSR) govern:',
    options: [
      'The design and sizing of final circuits in domestic installations',
      'The safe storage and handling of dangerous substances on a site',
      'The inspection and testing intervals for portable electrical equipment',
      'Safe working on distribution networks: isolation, earthing and permit to work',
    ],
    correctAnswer: 3,
    explanation:
      'The Distribution Safety Rules (DSR) are the safety rules that govern work on electricity distribution networks owned by distribution network operators (DNOs). They cover safe isolation, earthing, permit to work, competence requirements, and operational procedures for all persons working on or near the distribution system.',
  },
  {
    id: 12,
    question: 'Under ST1426, knowledge of industry-specific guidance is important because:',
    options: [
      'Technicians work across diverse settings, each with its own applicable guidance',
      'It allows technicians to ignore the core regulations once they are qualified',
      'Only the end-point assessor needs to know which guidance applies on site',
      'Industry guidance always overrides statutory regulations where they conflict',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to understand the regulatory and standards framework that governs their work. This goes beyond the core regulations (HSWA, EAWR) to include industry-specific guidance relevant to the specific work context — whether that is construction sites (CDM), hazardous areas (DSEAR), or distribution networks (DSR/ENA).',
  },
];

const faqs = [
  {
    question: 'What is the legal status of HSE Guidance Notes (GS series, HSG series)?',
    answer:
      'HSE Guidance Notes are not law and are not approved codes of practice. They represent what the HSE considers to be good practice at the time of publication. While there is no legal obligation to follow the guidance exactly, following it will normally be sufficient to comply with the law. Departing from guidance without equivalent alternative measures may be used as evidence that the duty holder has not taken adequate precautions.',
  },
  {
    question: 'Do I need to comply with GS38 specifically, or is it just guidance?',
    answer:
      "GS38 is technically guidance, not law. However, the EAWR 1989 Regulation 4(4) requires protective equipment (including test equipment) to be 'suitable for the use for which it is provided'. The HSE considers that test equipment complying with GS38 is suitable; equipment that does not comply may be considered unsuitable, which would be a breach of Regulation 4(4). In practice, GS38 compliance is treated as a near-mandatory requirement.",
  },
  {
    question: 'When does CDM 2015 apply to electrical maintenance work?',
    answer:
      "CDM 2015 applies to all 'construction work' — which is broadly defined to include installation, maintenance, repair, alteration, and demolition of electrical installations in or on a structure. Most electrical maintenance work on buildings qualifies as construction work. However, routine maintenance (such as changing lamps or visual inspections) that does not involve construction work may fall outside CDM. When in doubt, assume CDM applies.",
  },
  {
    question: 'What is HSG230 and why is it relevant to electrical maintenance?',
    answer:
      'HSG230 (Keeping Electrical Switchgear Safe) provides guidance on the safe management of electrical switchgear, including maintenance, inspection, and safe working practices for distribution boards, control panels, and switchgear assemblies. It covers thermal imaging, maintenance scheduling, and the precautions needed when working on or near switchgear. It is directly relevant to any technician who maintains electrical distribution equipment.',
  },
  {
    question: 'How do professional body publications (IET, ECA) differ from HSE guidance?',
    answer:
      'Professional body publications represent industry best practice and technical guidance, but they have no statutory status. IET publications (Guidance Notes, the On-Site Guide, the Code of Practice for In-Service Inspection and Testing) provide practical interpretation of BS 7671 and electrical safety standards. ECA publications provide business and technical guidance for electrical contractors. Neither has the force of law, but both are widely respected and referenced by courts and regulators.',
  },
];

const MOETModule1Section4_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.4 · Subsection 6"
        title="Other Industry-Specific Guidance"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            HSE guidance notes, CDM, DSEAR, and professional body publications.
          </p>

          <TLDR
            points={[
              'GS38: Test equipment requirements for LV systems',
              'HSG85: Safe working practices for electrical work',
              'CDM 2015: Construction health and safety management',
              'DSEAR/ATEX: Explosive atmospheres and hazardous zones',
            ]}
          />

          <ConceptBlock title="Electrical Maintenance Context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HSG230:</strong> Keeping electrical switchgear safe
              </li>
              <li>
                <strong>GS6:</strong> Overhead power line safety for MEWPs/cranes
              </li>
              <li>
                <strong>ENA/DSR:</strong> Distribution network safety rules
              </li>
              <li>
                <strong>ST1426:</strong> Broad regulatory awareness for diverse work contexts
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Identify the key HSE Guidance Notes relevant to electrical maintenance (GS38, GS6, HSG85, HSG47, HSG230)',
              'Explain the purpose and structure of CDM 2015 and its application to electrical work',
              'Describe the Management of Health and Safety at Work Regulations 1999 requirements',
              'Understand DSEAR and ATEX zone classifications for hazardous areas',
              'Explain the role of ENA technical standards and the Distribution Safety Rules',
              'Identify professional body guidance from the IET and ECA relevant to maintenance',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>HSE guidance notes (GS, HSG and INDG series)</ContentEyebrow>

          <ConceptBlock title="HSE Guidance Notes (GS, HSG and INDG Series)">
            <p>
              The Health and Safety Executive publishes a range of guidance notes to help duty
              holders understand and comply with health and safety legislation. These are not law —
              they do not have the statutory force of regulations. However, they represent the
              HSE&apos;s view of what constitutes good practice, and departing from them without
              equivalent alternative measures may be used as evidence of non-compliance in legal
              proceedings.
            </p>
            <p>
              For electrical maintenance technicians, several guidance notes are directly relevant
              to your daily work. Knowing which guidance applies to your activities — and where to
              find it — is an important part of your professional competence.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="GS38 — Electrical Test Equipment for Use on Low Voltage Systems"
            onSite="Critical point: using test equipment that does not comply with GS38 is likely to breach EAWR Regulation 4(4) (suitability of protective equipment) and PUWER Regulation 4 (suitability of work equipment). Many electrical fatalities have involved non-compliant test equipment."
          >
            <p>
              GS38 is arguably the most important guidance note for electrical maintenance
              technicians. It specifies the requirements for voltage indicators, test lamps, and
              test probes used on low voltage systems (up to 1000 V AC).
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fused probes:</strong> Test leads must incorporate fuses (typically 500 mA
                HRC) to protect against short-circuit currents if a probe slips and bridges two live
                parts
              </li>
              <li>
                <strong>Finger guards:</strong> Probes must have finger barriers to prevent
                accidental contact with exposed metal tips — fingers must not be able to reach the
                live part
              </li>
              <li>
                <strong>Tip exposure:</strong> Exposed metal tip not exceeding 4 mm, measured across
                any surface of the tip — GS38 sets one figure for all probes and clips
              </li>
              <li>
                <strong>Robust construction:</strong> Leads must be adequately insulated, flexible
                but not prone to damage, and firmly attached to the instrument
              </li>
              <li>
                <strong>Two-pole testers:</strong> GS38 strongly recommends two-pole voltage
                indicators (not neon screwdrivers or indicator lights) for proving dead
              </li>
              <li>
                <strong>Category rating:</strong> Instruments must be rated for the measurement
                category of the circuit (CAT III for distribution, CAT IV for origin of supply)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="HSG85 — Electricity at Work: Safe Working Practices">
            <p>
              HSG85 is the HSE&apos;s primary guidance on the practical application of the
              Electricity at Work Regulations 1989. It covers:
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Safe isolation procedures — step-by-step practical guidance</li>
              <li>Permit to work systems — design, implementation and management</li>
              <li>Live working controls — risk assessment, precautions, documentation</li>
              <li>Competence requirements — what constitutes a &quot;competent person&quot;</li>
              <li>Portable electrical equipment — in-service inspection and testing</li>
              <li>Accompanying persons and emergency procedures</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Other Key HSE Publications">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Reference</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Title</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Relevance to Electrical Maintenance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">GS6</td>
                    <td className="border border-white/10 px-3 py-2">
                      Avoidance of Danger from Overhead Electric Power Lines
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Working near overhead lines with MEWPs, cranes, scaffold
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">HSG47</td>
                    <td className="border border-white/10 px-3 py-2">
                      Avoiding Danger from Underground Services
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Excavating near underground cables, CAT scanning
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">HSG230</td>
                    <td className="border border-white/10 px-3 py-2">
                      Keeping Electrical Switchgear Safe
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Switchgear maintenance, thermal imaging, scheduling
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">HSG65</td>
                    <td className="border border-white/10 px-3 py-2">
                      Managing for Health and Safety
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Plan-Do-Check-Act framework for safety management
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">INDG231</td>
                    <td className="border border-white/10 px-3 py-2">Electrical Safety and You</td>
                    <td className="border border-white/10 px-3 py-2">
                      Basic guidance leaflet on electrical safety at work
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">INDG163</td>
                    <td className="border border-white/10 px-3 py-2">
                      Five Steps to Risk Assessment
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Fundamental risk assessment methodology
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>
            CDM 2015 and the Management of Health and Safety at Work Regulations 1999
          </ContentEyebrow>

          <ConceptBlock title="CDM 2015 and the Management of Health and Safety at Work Regulations 1999">
            <p>
              Two sets of regulations frequently apply alongside the EAWR for electrical maintenance
              work: the Construction (Design and Management) Regulations 2015 (CDM) and the
              Management of Health and Safety at Work Regulations 1999 (the &quot;Management
              Regulations&quot;). Both are made under the HSWA 1974 and impose additional duties on
              employers, clients, designers and contractors.
            </p>
          </ConceptBlock>

          <ConceptBlock title="CDM 2015 — Overview">
            <p>
              CDM 2015 applies to all &quot;construction work&quot; — which is broadly defined to
              include the installation, commissioning, maintenance, repair, alteration, renewal, and
              dismantling of mechanical, electrical, gas and other services in or on a structure.
              Most electrical maintenance work on buildings qualifies.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Client:</strong> The person for whom the project is carried out. Must make
                suitable arrangements for managing the project, ensure welfare facilities, appoint
                PC and PD (where applicable)
              </li>
              <li>
                <strong>Principal Designer (PD):</strong> Plans, manages and monitors the
                pre-construction phase to eliminate or reduce health and safety risks in the design.
                Prepares the health and safety file
              </li>
              <li>
                <strong>Principal Contractor (PC):</strong> Plans, manages and monitors the
                construction phase. Co-ordinates health and safety between contractors. Produces the
                construction phase plan
              </li>
              <li>
                <strong>Designers:</strong> Must eliminate, reduce or control foreseeable risks in
                their designs — including electrical installation design
              </li>
              <li>
                <strong>Contractors:</strong> Must plan, manage and monitor their own work,
                co-operate with others, comply with site rules, and report anything likely to
                endanger anyone
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CDM 2015 — Application to Electrical Maintenance"
            onSite="Key point: even a single maintenance electrician carrying out an electrical alteration on a building is subject to CDM 2015. The level of paperwork scales with the risk and size of the project, but the duties apply to all construction work."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Notification:</strong> Projects lasting more than 30 working days with more
                than 20 workers simultaneously, or exceeding 500 person-days, must be notified to
                the HSE (F10)
              </li>
              <li>
                <strong>Construction Phase Plan:</strong> Required for all projects where CDM
                applies — sets out the arrangements for managing health and safety during the work
              </li>
              <li>
                <strong>Health and Safety File:</strong> Must be compiled for the client —
                containing as-built drawings, maintenance information, and residual risk information
                for future maintenance
              </li>
              <li>
                <strong>Welfare:</strong> Adequate welfare facilities (toilets, washing, rest,
                changing) must be provided for all construction workers
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Management of Health and Safety at Work Regulations 1999">
            <p>
              The Management Regulations (sometimes called &quot;MHSWR&quot; or simply &quot;the
              Management Regs&quot;) provide the overarching framework for health and safety
              management. Key requirements include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Regulation 3 — Risk assessment:</strong> Every employer must carry out a
                suitable and sufficient assessment of the risks to employees and non-employees. This
                is the legal foundation for all risk assessments in the workplace
              </li>
              <li>
                <strong>Regulation 4 — Principles of prevention:</strong> The employer must
                implement preventive and protective measures based on the principles in Schedule 1
                (which mirror the hierarchy of controls)
              </li>
              <li>
                <strong>Regulation 5 — Health and safety arrangements:</strong> Employers must have
                effective arrangements for planning, organisation, control, monitoring and review of
                safety measures
              </li>
              <li>
                <strong>Regulation 7 — Competent persons:</strong> Employers must appoint one or
                more competent persons to assist with health and safety
              </li>
              <li>
                <strong>Regulation 10 — Information:</strong> Employees must be provided with
                comprehensible and relevant information on risks and safety measures
              </li>
              <li>
                <strong>Regulation 13 — Training:</strong> Adequate training on recruitment, on
                exposure to new/changed risks, and periodically as required
              </li>
              <li>
                <strong>Regulation 14 — Employees&apos; duties:</strong> Employees must use
                equipment correctly and inform the employer of dangerous situations or shortcomings
                in safety arrangements
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>DSEAR, ATEX zones and hazardous area classification</ContentEyebrow>

          <ConceptBlock title="DSEAR, ATEX Zones and Hazardous Area Classification">
            <p>
              The Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR) require
              employers to control the risks from fire, explosion and similar events arising from
              dangerous substances in the workplace. For electrical maintenance technicians, DSEAR
              is critical whenever you work in or near areas where flammable gases, vapours, mists
              or combustible dusts may be present.
            </p>
          </ConceptBlock>

          <ConceptBlock title="DSEAR Key Requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Risk assessment:</strong> Assess the risks from dangerous substances and the
                measures needed to control them
              </li>
              <li>
                <strong>Hazardous area classification:</strong> Classify areas where explosive
                atmospheres may occur into zones
              </li>
              <li>
                <strong>Elimination or reduction:</strong> Eliminate or reduce the amount of
                dangerous substance, or reduce the likelihood of an explosive atmosphere forming
              </li>
              <li>
                <strong>Ignition sources:</strong> Control ignition sources — including electrical
                equipment, static electricity, hot surfaces, and mechanical sparks
              </li>
              <li>
                <strong>Mitigation:</strong> Provide mitigation measures (explosion relief,
                suppression, containment) to reduce the effects of any explosion
              </li>
              <li>
                <strong>Information and training:</strong> Provide employees with information on
                dangerous substances and the precautions to take
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ATEX Zone Classifications">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Zone</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Substance</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Condition</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Equipment Required
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Zone 0</td>
                    <td className="border border-white/10 px-3 py-2">Gas/vapour</td>
                    <td className="border border-white/10 px-3 py-2">
                      Explosive atmosphere present continuously or for long periods
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Category 1 Ex equipment (very high protection)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Zone 1</td>
                    <td className="border border-white/10 px-3 py-2">Gas/vapour</td>
                    <td className="border border-white/10 px-3 py-2">
                      Likely to occur occasionally in normal operation
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Category 2 Ex equipment (high protection)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Zone 2</td>
                    <td className="border border-white/10 px-3 py-2">Gas/vapour</td>
                    <td className="border border-white/10 px-3 py-2">
                      Not likely in normal operation; may occur for short periods
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Category 3 Ex equipment (normal protection)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Zone 20</td>
                    <td className="border border-white/10 px-3 py-2">Dust</td>
                    <td className="border border-white/10 px-3 py-2">
                      Explosive dust cloud continuously or for long periods
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Category 1 Ex equipment (very high protection)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Zone 21</td>
                    <td className="border border-white/10 px-3 py-2">Dust</td>
                    <td className="border border-white/10 px-3 py-2">
                      Likely to occur occasionally in normal operation
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Category 2 Ex equipment (high protection)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Zone 22</td>
                    <td className="border border-white/10 px-3 py-2">Dust</td>
                    <td className="border border-white/10 px-3 py-2">
                      Not likely in normal operation; may occur for short periods
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Category 3 Ex equipment (normal protection)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Electrical Maintenance in Hazardous Areas">
            <p>
              Maintenance of electrical equipment in hazardous areas requires specialist knowledge
              and additional precautions. You must never use standard (non-Ex-rated) test
              instruments in a classified zone. All electrical work must maintain the integrity of
              the explosion protection — replacing an Ex-rated component with a standard component
              removes the protection and creates an explosion risk. If you are asked to work in a
              hazardous area, ensure you have received appropriate training (CompEx or equivalent)
              and understand the specific zone classification and equipment protection types.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>
            ENA standards, Distribution Safety Rules and professional body guidance
          </ContentEyebrow>

          <ConceptBlock title="ENA Standards, Distribution Safety Rules and Professional Body Guidance">
            <p>
              Beyond HSE guidance and statutory regulations, electrical maintenance technicians must
              be aware of industry-specific standards from the Energy Networks Association (ENA) and
              guidance from professional bodies such as the Institution of Engineering and
              Technology (IET) and the Electrical Contractors&apos; Association (ECA).
            </p>
          </ConceptBlock>

          <ConceptBlock title="ENA Technical Standards">
            <p>
              The Energy Networks Association publishes Engineering Recommendations and technical
              standards that govern the interface between customer installations and the electricity
              distribution network.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>G98:</strong> Requirements for micro-generation equipment connected in
                parallel with public low voltage distribution networks (up to 16 A per phase)
              </li>
              <li>
                <strong>G99:</strong> Requirements for generation equipment connected to the
                distribution network above the G98 threshold
              </li>
              <li>
                <strong>G12:</strong> Requirements for the application of protective multiple
                earthing to low voltage networks
              </li>
              <li>
                <strong>P28/P29:</strong> Voltage fluctuations, harmonics and power quality
                standards
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Distribution Safety Rules (DSR)"
            onSite="When do DSR apply? If you work on or near DNO-owned equipment (substations, HV switchgear, distribution transformers, service cables), the DSR apply. This is distinct from customer-owned equipment where the employer's own safety rules apply."
          >
            <p>
              The Distribution Safety Rules are the safety rules that govern work on electricity
              distribution networks. They are produced by the ENA and adopted by each distribution
              network operator (DNO).
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Prescribe the procedures for isolation, earthing, and proving dead on distribution
                equipment
              </li>
              <li>
                Define the roles of Senior Authorised Person (SAP), Authorised Person, and Competent
                Person
              </li>
              <li>Govern the permit to work system for distribution network work</li>
              <li>Set out the safety procedures for switching operations</li>
              <li>
                Require formal authorisation and appointment of all persons working on the network
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Site-Specific Rules">
            <p>
              Many industrial, commercial and institutional clients have their own site-specific
              safety rules that supplement national legislation and standards. These may include:
              enhanced permit to work procedures, specific PPE requirements (e.g., arc flash
              clothing ratings), restricted working hours, mandatory site inductions, buddy systems,
              and specific reporting procedures. As a maintenance technician, you must identify and
              comply with site-specific rules at every location where you work.
            </p>
          </ConceptBlock>

          <ConceptBlock title="IET Publications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Guidance Notes 1–8:</strong> Practical interpretation of BS 7671
                requirements (GN3 on Inspection and Testing is essential)
              </li>
              <li>
                <strong>On-Site Guide:</strong> Field reference for BS 7671 application
              </li>
              <li>
                <strong>Code of Practice for In-Service Inspection and Testing:</strong> Guidance on
                PAT testing and in-service equipment management
              </li>
              <li>
                <strong>Code of Practice for EV Charging:</strong> Guidance on Section 722
                installations
              </li>
              <li>
                <strong>Code of Practice for Grid-Connected Solar PV:</strong> Guidance on Section
                712 installations
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ECA and Other Bodies">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ECA:</strong> Technical guidance for electrical contractors, business
                management, and compliance
              </li>
              <li>
                <strong>NICEIC/NAPIT/ELECSA:</strong> Competent person scheme requirements and
                technical bulletins
              </li>
              <li>
                <strong>JIB:</strong> Joint Industry Board — grading, terms and conditions for
                electrical operatives
              </li>
              <li>
                <strong>CIBSE:</strong> Guidance on building services design, including lighting and
                power standards
              </li>
              <li>
                <strong>BSRIA:</strong> Practical guidance on commissioning and building services
                maintenance
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Industry Codes of Practice">
            <p>
              Various industry bodies publish codes of practice that, while not statutory, represent
              accepted good practice in specific sectors:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 5839:</strong> Fire detection and alarm systems — Part 1 (non-domestic)
                and Part 6 (domestic)
              </li>
              <li>
                <strong>BS 5266:</strong> Emergency lighting — Part 1 (Code of Practice)
              </li>
              <li>
                <strong>BS EN 62305:</strong> Protection against lightning
              </li>
              <li>
                <strong>BS EN 50110:</strong> Operation of electrical installations (European
                standard)
              </li>
              <li>
                <strong>IEC 60079 series:</strong> Equipment for explosive atmospheres (technical
                standards for Ex equipment)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Relevance to your ST1426 assessment">
            <p>
              <em>
                The maintenance technician standard requires you to demonstrate awareness of the
                broader regulatory and standards landscape — not just the core regulations (HSWA,
                EAWR) but also the guidance, standards and codes of practice that apply to your
                specific work context. In your EPA, you may be asked to identify which guidance or
                standard applies to a specific maintenance scenario.
              </em>
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'GS38 — Test equipment for LV systems',
              'GS6 — Overhead power line safety',
              'HSG85 — Safe working practices (electrical)',
              'HSG47 — Underground services',
              'HSG230 — Keeping switchgear safe',
              'INDG231 — Electrical safety and you',
              'CDM 2015 — Construction safety management',
              'Management Regs 1999 — Risk assessment, competent persons',
              'DSEAR 2002 — Explosive atmospheres',
              'ATEX — Zone classification (0/1/2, 20/21/22)',
              'DSR — Distribution Safety Rules',
              'ENA — G98, G99, G12 technical standards',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section4-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  LOLER — Lifting Operations and Lifting Equipment Regulations 1998
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section5-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next section <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Module 1 · Section 5
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section4_6;
