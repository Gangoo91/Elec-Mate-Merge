/**
 * MOET · Module 4 · Section 4 · Subsection 5 — Documentation and Sign-Off
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Documentation requirements: documentation control,
 *                 auditable records."
 *              · "Electrical. Conduct functional testing."
 *   Skills     · "Record information."
 *              · "Produce or update documents. For example, handover notes
 *                 and reports."
 *
 * ⚠️ Corrected during conversion (not a silent content change to teaching
 * prose — a factual qualification reference): the source named "City &
 * Guilds 2391/2394/2395" as the inspector/tester qualification. 2394 and 2395
 * were withdrawn and replaced in 2017 by the 2391-50/-51/-52 suite (2391-50 =
 * Initial Verification, 2391-51 = Periodic Inspection and Testing, 2391-52 =
 * the combined Initial and Periodic award). Rewritten below to name the
 * current suite, while keeping the surrounding point unchanged: EAWR
 * Regulation 16 and BS 7671 Part 2 require competence, not a named
 * certificate — the qualification is evidence of that competence, not a
 * substitute for it.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Documentation and Sign-Off - MOET Module 4.4.5';
const DESCRIPTION =
  'Comprehensive guide to documentation and sign-off procedures in testing and commissioning for electrical maintenance: completion certificates, handover documentation, regulatory compliance, and stakeholder sign-off processes.';

const quickCheckQuestions = [
  {
    id: 'doc-signoff-purpose',
    question: 'What is the primary purpose of completion documentation in electrical maintenance?',
    options: [
      'To act as a marketing record of the contractor’s recently completed projects',
      'To give a verifiable record that work is complete, tested and to standard',
      'To replace the need to carry out inspection and testing of the work itself',
      'To record the hours worked so the labour cost can be correctly invoiced',
    ],
    correctIndex: 1,
    explanation:
      'Completion documentation serves as a verifiable record that the work has been carried out safely, that appropriate tests have been conducted, and that the installation or repair meets the required standards. It protects all parties by providing evidence of compliance and creates a baseline for future maintenance activities.',
  },
  {
    id: 'doc-signoff-bs7671',
    question:
      'Under BS 7671, which document must be issued upon completion of new electrical work or significant alterations?',
    options: [
      'A Minor Electrical Installation Works Certificate, signed by the installer only',
      'An Electrical Installation Condition Report (EICR) with coded observations',
      'A risk assessment and method statement covering the completed electrical work',
      'An Electrical Installation Certificate (EIC), signed by designer, installer and tester',
    ],
    correctIndex: 3,
    explanation:
      'BS 7671 requires an Electrical Installation Certificate (EIC) to be issued upon completion of new installations or significant alterations. The certificate must be signed by the competent persons responsible for the design, construction (installation), and inspection and testing of the work. This three-signature requirement ensures accountability across all aspects of the work.',
  },
  {
    id: 'doc-signoff-handover',
    question: 'Which of the following is NOT typically included in a handover documentation pack?',
    options: [
      'As-built drawings showing the installation as actually constructed',
      'Operation and maintenance manuals for the installed equipment',
      'The personal mobile number of every technician who worked on the project',
      'Electrical certificates with their accompanying schedules of test results',
    ],
    correctIndex: 2,
    explanation:
      "A handover documentation pack typically includes as-built drawings, test results and certificates, operation and maintenance manuals, warranty information, and emergency contact details for the responsible organisation. Personal mobile numbers of individual technicians are not appropriate — contact should be through the organisation's official channels.",
  },
  {
    id: 'doc-signoff-minor-works',
    question:
      'When is a Minor Works Certificate appropriate instead of a full Electrical Installation Certificate?',
    options: [
      'For any work carried out in a domestic property below a certain contract value',
      'For work with no new circuit, such as adding a socket to an existing circuit',
      'For any new installation where a single competent person carries out all the work',
      'For periodic inspection and testing of an existing electrical installation',
    ],
    correctIndex: 1,
    explanation:
      'A Minor Electrical Installation Works Certificate is appropriate for small-scale work that does not include the provision of a new circuit — for example, adding a socket outlet or lighting point to an existing circuit, or replacing a consumer unit on a like-for-like basis. The value of the work or the type of property does not determine which certificate is required; it is the nature and extent of the work that matters.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The three signatories required on an Electrical Installation Certificate under BS 7671 are:',
    options: [
      'The client, the contractor, and the local authority',
      'The designer, the installer (constructor), and the inspector/tester',
      'The project manager, the health and safety officer, and the electrician',
      'The building owner, the insurance company, and the electrician',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 requires the EIC to be signed by three competent persons: the designer (responsible for the design of the electrical installation), the installer/constructor (responsible for the construction/installation), and the inspector/tester (responsible for the inspection and testing). One person may fulfil more than one role if competent to do so.',
  },
  {
    id: 2,
    question:
      'Which regulation requires that electrical installations are maintained to prevent danger?',
    options: [
      'The Health and Safety at Work Act Section 7 only',
      'The Building Regulations Part P only',
      'The Electricity at Work Regulations 1989, Regulation 4(2)',
      'The Construction (Design and Management) Regulations 2015',
    ],
    correctAnswer: 2,
    explanation:
      'The Electricity at Work Regulations 1989, Regulation 4(2) states that electrical systems shall be maintained so as to prevent danger. This places a legal duty on the duty holder to ensure ongoing maintenance, and completion documentation provides evidence of compliance with this requirement.',
  },
  {
    id: 3,
    question:
      'An Electrical Installation Condition Report (EICR) uses coding to classify observations. Code C2 indicates:',
    options: [
      'An observation requiring improvement but not posing immediate danger',
      'The installation is satisfactory and no action is required',
      'A limitation preventing full inspection of the installation',
      'A potentially dangerous condition where urgent remedial action is required',
    ],
    correctAnswer: 3,
    explanation:
      'Code C2 indicates a condition that is potentially dangerous and requires urgent remedial action. C1 indicates danger is present and immediate action is required, C3 indicates improvement is recommended, and FI indicates further investigation is required without delay. Understanding these codes is essential for accurate documentation.',
  },
  {
    id: 4,
    question: 'What is the purpose of as-built drawings in handover documentation?',
    options: [
      'To accurately reflect the installation as actually constructed, including any variations from the original design',
      'To show the original design intent before any site changes were made',
      'To record the test results for each circuit in a tabulated schedule',
      'To list the manufacturer warranties for the installed equipment',
    ],
    correctAnswer: 0,
    explanation:
      'As-built (or as-installed) drawings accurately reflect the installation as it was actually constructed, including any variations, modifications, or deviations from the original design drawings. These are essential for future maintenance, fault finding, and any subsequent modifications, as they show the true layout, cable routes, and equipment locations.',
  },
  {
    id: 5,
    question:
      'Under the Construction (Design and Management) Regulations 2015, who is responsible for compiling the health and safety file?',
    options: [
      'The electrical contractor',
      'The principal designer',
      'The local authority building control',
      'The building owner',
    ],
    correctAnswer: 1,
    explanation:
      'Under CDM 2015, the principal designer is responsible for preparing, reviewing, updating, and revising the health and safety file. This file must contain information about the project that is likely to be needed to ensure health and safety during any subsequent work, including maintenance. Electrical documentation forms part of this file.',
  },
  {
    id: 6,
    question:
      'Which of the following test results must be recorded on the Schedule of Test Results that accompanies an EIC?',
    options: [
      'Only the earth fault loop impedance value measured for the final circuit',
      'A written description of the installation, recorded with no measured values',
      'Continuity, insulation resistance, polarity, loop impedance, RCD and fault current',
      'The cost of the materials and labour used on each circuit in the installation',
    ],
    correctAnswer: 2,
    explanation:
      'The Schedule of Test Results must record all relevant test results for each circuit, including continuity of protective conductors (R1+R2), insulation resistance, polarity verification, earth fault loop impedance (Zs), RCD operation times, and prospective fault current (Ipf). All results — whether satisfactory or not — must be recorded accurately.',
  },
  {
    id: 7,
    question:
      'When documenting a repair to an existing installation, a maintenance technician should:',
    options: [
      'Record the repair only if the duty holder specifically asks for it in writing',
      'Leave the existing drawings unchanged, to avoid confusing future technicians',
      'Issue a new full Electrical Installation Certificate for the whole installation',
      'Complete the certificate, update records, mark up drawings and inform the duty holder',
    ],
    correctAnswer: 3,
    explanation:
      'Thorough documentation of repairs is essential. The technician should complete the appropriate electrical certificate (Minor Works or EIC as applicable), update the site maintenance records and logbooks, mark up any drawing changes for incorporation into as-built drawings, and formally inform the duty holder of the completed work and any recommendations.',
  },
  {
    id: 8,
    question: 'The purpose of a commissioning checklist is to:',
    options: [
      'Ensure all required checks and tests are done in order before energising or handover',
      'Record the limitations that prevented part of an installation being inspected',
      'Provide a permanent record of the installation exactly as it was actually built',
      'List the document retention responsibilities held by the duty holder over time',
    ],
    correctAnswer: 0,
    explanation:
      'A commissioning checklist provides a structured, systematic approach to verifying that all required pre-commissioning checks, functional tests, safety verifications, and performance tests have been completed before equipment is energised or the installation is handed over. It prevents steps being missed and provides documented evidence of the commissioning process.',
  },
  {
    id: 9,
    question:
      'Under Building Regulations Part P (England), notification to building control is required for:',
    options: [
      'All electrical work of any kind carried out in a domestic dwelling whatsoever',
      'Notifiable work, unless done by a registered competent person who can self-certify',
      'Only electrical work carried out in commercial and industrial premises, not homes',
      'Like-for-like replacement of a single accessory, such as one socket outlet',
    ],
    correctAnswer: 1,
    explanation:
      'Building Regulations Part P requires notification of notifiable electrical work (new circuits, work in special locations such as bathrooms, consumer unit replacements) to building control. Members of registered competent person schemes (such as NICEIC, NAPIT, or ELECSA) can self-certify their work without separate building control notification, but they must still issue the required certificates.',
  },
  {
    id: 10,
    question: 'Why is it important to include limitations in an EICR?',
    options: [
      'To confirm that every circuit in the installation was fully inspected without exception',
      'To reduce the inspector’s personal liability by limiting the testing that was carried out',
      'To document areas that could not be inspected, so scope and boundaries are clear',
      'To record the cost of any remedial work that is recommended within the report',
    ],
    correctAnswer: 2,
    explanation:
      'Documenting limitations is essential for transparency. Limitations record areas that could not be inspected or tested — for example, circuits concealed behind fixed finishes, locked areas, or equipment that could not be isolated. This ensures the client understands the scope of the inspection and that future inspectors know which areas still require assessment.',
  },
  {
    id: 11,
    question:
      'What is the recommended retention period for electrical test certificates and maintenance records?',
    options: [
      'They may be discarded as soon as the next inspection is carried out',
      'They must be kept for exactly six years and then destroyed',
      'They only need to be retained until the contractor is paid',
      'They should be retained for the lifetime of the installation and made available to subsequent duty holders',
    ],
    correctAnswer: 3,
    explanation:
      'Electrical test certificates and maintenance records should be retained for the lifetime of the installation. There is no defined maximum retention period in the regulations. These records provide valuable historical data for future maintenance, fault investigation, and compliance evidence. When a property changes hands, records should be passed to the new duty holder.',
  },
  {
    id: 12,
    question:
      'A technician completes a repair but the sign-off is delayed because the responsible person is unavailable. The correct action is to:',
    options: [
      'Sign their own scope, note the outstanding sign-off, and arrange review as soon as possible',
      'Sign on behalf of the responsible person, to avoid delaying the project completion',
      'Leave the certificate completely blank until everyone involved is available to sign',
      'Return the installation to service and complete the paperwork later from memory',
    ],
    correctAnswer: 0,
    explanation:
      "The technician should complete all documentation within their scope of responsibility, clearly noting that the final sign-off by the responsible person is outstanding. The installation should not be returned to service if the responsible person's review is a safety-critical step. Forging signatures is never acceptable and may constitute fraud.",
  },
];

const faqs = [
  {
    question: 'Can one person sign all three sections of an Electrical Installation Certificate?',
    answer:
      'Yes, one person can sign as designer, installer, and inspector/tester provided they are competent in all three roles. This is common for small-scale work carried out by a single qualified electrician. However, for larger or more complex installations, these roles are typically fulfilled by different individuals to provide independent verification, particularly for the inspection and testing function.',
  },
  {
    question: 'What happens if documentation is not provided after electrical work?',
    answer:
      'Failure to provide the required certification is a breach of BS 7671 and, for notifiable work under Part P (England), a breach of Building Regulations. The client has no evidence that the work has been properly designed, installed, and tested. This can cause problems with property sales, insurance claims, and future maintenance. The duty holder may also be unable to demonstrate compliance with the Electricity at Work Regulations 1989.',
  },
  {
    question: 'How do digital documentation systems compare to paper-based systems?',
    answer:
      'Digital documentation systems offer significant advantages: instant backup and storage, searchability, trending of test results over time, automatic flagging of out-of-tolerance readings, and easy distribution to stakeholders. However, they must maintain the same level of detail and accuracy as paper systems. Digital signatures must comply with the Electronic Communications Act 2000. Many organisations now use tablet-based systems that allow technicians to complete documentation on site with photographic evidence.',
  },
  {
    question: 'Who should receive copies of completion certificates?',
    answer:
      'The person ordering the work (the client) must receive the original certificates. Copies should be retained by the contractor, provided to the building owner or duty holder if different from the client, and for notifiable work, submitted to the relevant building control body or competent person scheme. For rented properties, both the landlord and the managing agent should receive copies.',
  },
  {
    question:
      'What is the difference between a certificate and a report in electrical documentation?',
    answer:
      'A certificate (EIC or Minor Works) is issued after the completion of new work or alterations and certifies that the work complies with BS 7671 at the time of completion. A report (EICR) is issued after inspecting and testing an existing installation and reports on its condition at the time of inspection. The certificate confirms compliance of new work; the report assesses the condition of existing work.',
  },
];

const MOETModule4Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.4 · Subsection 5"
        title="Documentation and Sign-Off"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Completion documentation, handover procedures, and regulatory sign-off for electrical
            maintenance work
          </p>

          <TLDR
            points={[
              'Certificates: EIC, Minor Works, and EICR — each has a specific purpose and format.',
              'Handover: as-built drawings, test results, O&M manuals, warranties.',
              'Sign-off: competent persons must verify and sign within their scope of responsibility.',
              'Retention: records kept for the lifetime of the installation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the correct certificate type (EIC, Minor Works, EICR) for different scopes of work',
              'Describe the information required on each certificate and who must sign it',
              'Explain the handover documentation process and its components',
              'Understand the regulatory framework governing electrical documentation',
              'Apply proper procedures for recording test results on Schedules of Test Results',
              'Describe document retention requirements and responsibilities under EAWR 1989',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:</strong> defines certificate requirements for all electrical work.
              </li>
              <li>
                <strong>EAWR 1989:</strong> legal duty to maintain and document electrical systems.
              </li>
              <li>
                <strong>Part P:</strong> building regulation notification for notifiable domestic
                work.
              </li>
              <li>
                <strong>ST1426:</strong> maps to quality assurance and documentation competencies.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>The importance of documentation</ContentEyebrow>

          <ConceptBlock title="The importance of documentation in electrical maintenance">
            <p>
              Documentation is not an afterthought in electrical maintenance — it is an integral
              part of the work itself. Every repair, modification, test, and inspection must be
              recorded accurately and completely. This documentation serves multiple critical
              purposes: it provides evidence of compliance with legal and regulatory requirements,
              creates a historical record for future maintenance and fault investigation, confirms
              that work has been completed to the required standard, and protects both the
              technician and the organisation in the event of a dispute or incident.
            </p>
            <p>
              Under the Electricity at Work Regulations 1989 (EAWR), Regulation 4(2), there is a
              legal duty to maintain electrical systems so as to prevent danger. While the
              regulations do not explicitly mandate specific documentation formats, the ability to
              demonstrate compliance with this duty relies entirely on having adequate records.
              Without documentation, the duty holder cannot prove that maintenance has been carried
              out, that tests have been conducted, or that the installation remains safe. In the
              event of an incident, the absence of records creates a presumption of non-compliance.
            </p>
            <p>
              BS 7671 (the IET Wiring Regulations) provides the technical framework for electrical
              documentation. It specifies the certificates and reports that must be issued for
              different types of work, the information that must be recorded, and the competent
              persons who must sign them. For maintenance technicians working to the ST1426
              standard, understanding these documentation requirements is a core competency — not an
              optional administrative skill.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Documentation framework — key standards">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Standard/regulation</th>
                    <th className="py-2 font-medium text-white">Documentation requirement</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">BS 7671 Part 6</td>
                    <td className="py-2">
                      Electrical Installation Certificates, Minor Works Certificates, EICRs,
                      Schedules of Test Results
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">EAWR 1989 Reg 4(2)</td>
                    <td className="py-2">
                      Maintenance records demonstrating systems are maintained to prevent danger
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Building Regs Part P</td>
                    <td className="py-2">
                      Building control notification or self-certification for notifiable domestic
                      work
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">CDM 2015</td>
                    <td className="py-2">
                      Health and safety file including electrical information for future maintenance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Inadequate documentation has real consequences. Property sales can be delayed or fail
              due to missing electrical certificates. Insurance claims may be refused if the insurer
              cannot verify that the electrical installation was properly maintained. In the event
              of a fire or electrocution, the absence of documentation may be treated as evidence of
              negligence. For competent person scheme members, failure to issue certificates can
              result in removal from the scheme and loss of the right to self-certify.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Types of electrical certificates and reports</ContentEyebrow>

          <ConceptBlock title="Types of electrical certificates and reports">
            <p>
              BS 7671 defines three principal document types for electrical work: the Electrical
              Installation Certificate (EIC), the Minor Electrical Installation Works Certificate,
              and the Electrical Installation Condition Report (EICR). Each serves a distinct
              purpose and is appropriate for a specific scope of work. Selecting the correct
              document is the first step in proper documentation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Electrical Installation Certificate (EIC)">
            <p>
              The EIC is required for all new installations and for alterations or additions that
              include the provision of new circuits. It certifies that the design, construction, and
              inspection and testing of the work comply with BS 7671. The certificate must be signed
              by three competent persons (or by one person fulfilling all three roles):
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Designer:</strong> confirms that the design of the installation complies
                with BS 7671.
              </li>
              <li>
                <strong>Installer (constructor):</strong> confirms that the installation has been
                constructed in accordance with the design.
              </li>
              <li>
                <strong>Inspector/tester:</strong> confirms that the installation has been inspected
                and tested in accordance with BS 7671 Part 6.
              </li>
            </ul>
            <p>
              The EIC must be accompanied by a Schedule of Inspections and a Schedule of Test
              Results for every circuit in the installation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Minor Electrical Installation Works Certificate">
            <p>
              The Minor Works Certificate is appropriate for small-scale work that does not include
              the provision of a new circuit. Typical examples include adding a socket outlet to an
              existing circuit, replacing a light fitting, or installing a fused connection unit.
              The certificate requires only one signature — the person who designed, installed,
              inspected, and tested the minor work.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Adding a socket outlet or lighting point to an existing circuit.</li>
              <li>
                Replacing accessories such as switches, socket outlets, or fused connection units.
              </li>
              <li>
                Like-for-like replacement of a consumer unit (though some competent person schemes
                now require an EIC for this work).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical Installation Condition Report (EICR)">
            <p>
              The EICR is used to report on the condition of an existing electrical installation. It
              does not certify new work — it assesses whether the installation is safe for continued
              use. The report uses a classification coding system to categorise observations:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>C1 — Danger present:</strong> risk of injury. Immediate remedial action
                required.
              </li>
              <li>
                <strong>C2 — Potentially dangerous:</strong> urgent remedial action required.
              </li>
              <li>
                <strong>C3 — Improvement recommended:</strong> not immediately dangerous but
                improvement would enhance safety.
              </li>
              <li>
                <strong>FI — Further investigation:</strong> investigation required without delay to
                determine the nature and extent of the deficiency.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> the selection of the correct certificate type is not
              discretionary. Using a Minor Works Certificate for work that requires an EIC, or
              failing to issue any certificate at all, is a breach of BS 7671 and potentially a
              regulatory offence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Handover documentation and as-built records</ContentEyebrow>

          <ConceptBlock title="Handover documentation and as-built records">
            <p>
              The handover process marks the formal transfer of responsibility for the completed
              work from the contractor or maintenance team to the client or duty holder. A thorough
              handover ensures that the receiving party has all the information needed to operate,
              maintain, and manage the electrical installation safely and effectively. Incomplete
              handover documentation is one of the most common sources of problems in ongoing
              maintenance — missing drawings, absent test records, and unknown modification
              histories make future work more difficult, more time-consuming, and potentially more
              dangerous.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Handover documentation pack — contents">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical certificates:</strong> EIC, Minor Works Certificates, or EICR as
                appropriate, with all accompanying schedules.
              </li>
              <li>
                <strong>As-built drawings:</strong> schematic diagrams, distribution board
                schedules, cable route drawings, and layout drawings updated to reflect the actual
                installation.
              </li>
              <li>
                <strong>Test results:</strong> full Schedule of Test Results, functional test
                records, and commissioning data.
              </li>
              <li>
                <strong>Operation and maintenance manuals:</strong> manufacturer&apos;s
                documentation for all installed equipment, including operating instructions,
                maintenance schedules, and spare parts lists.
              </li>
              <li>
                <strong>Warranty information:</strong> product warranties, extended warranty
                certificates, and warranty conditions.
              </li>
              <li>
                <strong>Risk assessments and method statements:</strong> relevant documents for
                ongoing maintenance activities.
              </li>
              <li>
                <strong>Training records:</strong> evidence that operators have been trained on the
                installed systems where applicable.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="As-built drawings — why they matter">
            <p>
              Design drawings show what was intended; as-built drawings show what was actually
              installed. During construction or maintenance, variations from the original design are
              common — cable routes may change due to unforeseen obstacles, equipment locations may
              shift, additional circuits may be added, or protective device ratings may be adjusted.
              If these changes are not captured in updated drawings, future maintenance technicians
              will be working from inaccurate information.
            </p>
            <p>
              The consequences of inaccurate drawings can be severe: incorrect circuit
              identification leading to work on live conductors, inability to locate cables before
              drilling or excavating, wrong protective device settings after a replacement, or
              failure to account for circuits during an isolation procedure. Every modification, no
              matter how small, should be marked up and incorporated into the as-built drawing set.
            </p>
            <p>
              For projects falling under the Construction (Design and Management) Regulations 2015,
              electrical documentation must be included in the health and safety file compiled by
              the principal designer. This file is a living document that should be updated
              throughout the life of the building and passed on whenever the building changes hands.
              It must contain information about the design, construction, and maintenance of the
              electrical installation that will be needed by anyone carrying out future work on the
              building.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Sign-off procedures and responsibilities</ContentEyebrow>

          <ConceptBlock title="Sign-off procedures and responsibilities">
            <p>
              The sign-off process is more than just putting a signature on a piece of paper. It is
              a formal declaration that the signatory is satisfied that the work within their scope
              of responsibility has been completed correctly and in compliance with the relevant
              standards. Signing a certificate carries significant legal and professional
              responsibility — the signatory is personally accountable for the accuracy of the
              information on the certificate and the quality of the work they are certifying.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Who can sign?">
            <p>
              Only competent persons can sign electrical certificates. Competence in this context
              means having the appropriate knowledge, skills, and experience for the specific aspect
              of work being certified. BS 7671 and the relevant guidance notes provide detailed
              requirements for the competence of designers, installers, and inspectors/testers.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Designer:</strong> must have adequate knowledge of electrical design
                principles, BS 7671, and the specific application.
              </li>
              <li>
                <strong>Installer:</strong> must be a skilled person (electrically) or be adequately
                supervised by a skilled person.
              </li>
              <li>
                <strong>Inspector/tester:</strong> must hold a recognised inspection and testing
                qualification (e.g., City &amp; Guilds 2391-52, or 2391-50/-51 for the separate
                initial and periodic awards, or equivalent) and have experience of the type of
                installation being inspected. The older 2394/2395 qualifications were withdrawn and
                replaced by this suite in 2017; they remain valid for people who already hold them,
                but are not a route a learner could take today. Under EAWR Regulation 16 and BS 7671
                Part 2, competence — not possession of any one named certificate — is the legal
                requirement; a recognised qualification is evidence of that competence.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The sign-off process">
            <p>
              Before signing, each signatory must satisfy themselves that the work within their
              responsibility has been completed to the required standard. For the inspector/tester,
              this means personally conducting or supervising the inspection and testing — not
              simply reviewing paperwork completed by someone else. The sign-off should follow a
              clear process: review of all documentation, physical verification where appropriate,
              resolution of any outstanding issues or deficiencies, and formal signature with date.
              Any conditions, limitations, or reservations should be clearly noted on the
              certificate.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Multi-party sign-off">
            <p>
              On larger projects, the sign-off process involves multiple parties: the electrical
              contractor&apos;s competent persons, the principal contractor, the client&apos;s
              representative, and potentially building control or the competent person scheme. Each
              party signs off on their area of responsibility in a defined sequence. Delays in this
              process can hold up project completion, so proactive management of the sign-off chain
              is important. Digital documentation systems can expedite this by allowing remote
              review and electronic signature.
            </p>
            <p>
              <strong>Professional responsibility:</strong> never sign a certificate for work you
              have not personally verified. Signing a certificate you know to be inaccurate, or
              signing for work that has not been properly completed, is professional misconduct. It
              also creates personal legal liability in the event of an incident resulting from the
              certified work.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Record keeping and document management</ContentEyebrow>

          <ConceptBlock title="Record keeping and document management">
            <p>
              Effective record keeping extends beyond the initial certification. Electrical
              documentation forms a living record that grows throughout the life of the
              installation, capturing every inspection, test, modification, and repair. A
              well-maintained documentation system enables efficient maintenance planning, rapid
              fault diagnosis, compliance demonstration, and informed decision-making about
              equipment replacement and upgrade.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Essential records for ongoing maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Original certificates:</strong> EIC, Minor Works, and EICR from initial
                installation and all subsequent work.
              </li>
              <li>
                <strong>Maintenance logbook:</strong> chronological record of all maintenance
                activities, inspections, tests, and repairs.
              </li>
              <li>
                <strong>Test result trends:</strong> historical insulation resistance, earth fault
                loop impedance, and RCD operation times to identify deterioration trends.
              </li>
              <li>
                <strong>Modification register:</strong> record of all modifications to the original
                installation, with reasons, authorisation, and updated drawings.
              </li>
              <li>
                <strong>Fault/incident log:</strong> record of all faults, failures, and incidents
                with root cause analysis and corrective actions taken.
              </li>
              <li>
                <strong>Equipment inventory:</strong> list of all major items of electrical
                equipment with specifications, installation dates, and expected life.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Digital vs paper documentation">
            <p>
              The shift from paper-based to digital documentation systems is well underway in the
              electrical industry. Digital systems offer powerful advantages: automatic backup and
              disaster recovery, instant searchability, trend analysis of test results over time,
              integration with maintenance management systems, and easy distribution to
              stakeholders. Mobile devices allow technicians to complete documentation on site,
              attach photographs, and submit records in real time. However, digital systems must be
              properly managed — they require robust access controls, regular backups, data
              integrity checks, and compliance with data protection legislation. Whatever system is
              used, the fundamental requirement remains the same: accurate, complete, and
              retrievable records.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Retention and transfer of records">
            <p>
              Electrical records should be retained for the lifetime of the installation. When a
              property changes ownership, the documentation pack should be transferred to the new
              duty holder as part of the handover process. For commercial properties, this is
              typically managed through the property transaction process. For domestic properties,
              the homeowner should receive all certificates and retain them with their property
              documents. Lost certificates can sometimes be recovered from the issuing contractor,
              the competent person scheme, or local authority building control, but prevention
              through proper record keeping is always preferable to retrospective recovery.
            </p>
            <p className="italic">
              <strong>ST1426 link:</strong> the maintenance technician standard requires competence
              in maintaining accurate maintenance records, using documentation systems, and
              contributing to continuous improvement through proper record keeping. Your ability to
              demonstrate thorough documentation practices is assessed as part of the end-point
              assessment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'New installation or new circuit → EIC.',
              'Minor work, no new circuit → Minor Works.',
              'Condition assessment of existing installation → EICR.',
              'All certificates must include a Schedule of Test Results.',
              'EIC requires three signatures (design, install, inspect/test).',
              'As-built drawings (not design drawings) go in the handover pack.',
              'All electrical certificates and test schedules go in the handover pack.',
              'Operation and maintenance manuals go in the handover pack.',
              'Warranty documentation goes in the handover pack.',
              'Training records for operators go in the handover pack.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section4-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Use of Approved Spare Parts
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section5-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Insulation Resistance Testing
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section4_5;
