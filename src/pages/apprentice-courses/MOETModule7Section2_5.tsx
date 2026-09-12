/**
 * MOET · Module 7 · Section 2 · Subsection 5 — Completing Work to Industry Standards
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This section of Module 7 covers technique for the EPA
 * practical observation rather than a specific piece of engineering
 * knowledge, so no ST1426 knowledge/skill/behaviour statement is quoted
 * here — none of the verified KSB statements checked for this conversion
 * describe assessment-preparation technique.
 *
 * ⚠️ ACCURACY FLAG: the original page's first paragraph names
 * "BS 7671:2018+A2:2022" as the current 18th Edition. The current edition is
 * BS 7671:2018+A4:2026. Per the conversion brief this is reported, not
 * silently fixed — the sentence is preserved verbatim below.
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

const TITLE = 'Completing Work to Industry Standards - MOET Module 7 Section 2.5';
const DESCRIPTION =
  'Quality standards, workmanship expectations and compliance requirements for the EPA practical observation: BS 7671, manufacturer guidelines, professional finish and regulatory compliance under ST1426.';

const quickCheckQuestions = [
  {
    id: 'bs7671-workmanship',
    question: 'What does BS 7671 require regarding workmanship in the erection of an installation?',
    options: [
      'That every circuit must be tested for insulation resistance before being energised',
      'That all conductors must be colour-coded to the harmonised European standard',
      'That the installer must hold a current Level 3 qualification for all notifiable work',
      'Good workmanship by skilled or instructed persons, using proper materials',
    ],
    correctIndex: 3,
    explanation:
      'BS 7671 Chapter 13 requires that good workmanship by skilled or instructed persons and proper materials shall be used in the erection of an electrical installation. This applies equally to maintenance and repair work, and the assessor uses it as the benchmark for evaluating your practical work.',
  },
  {
    id: 'compliance-documentation',
    question:
      'Why is documentation important when completing maintenance work to industry standards?',
    options: [
      'Documentation is only needed when a customer specifically requests a copy of the records',
      'Documentation provides evidence of compliance, enables future maintenance, creates an audit trail, and demonstrates professionalism',
      'Documentation is mainly required to support a warranty claim if the component later fails',
      'Documentation exists chiefly to record the hours worked so the job can be invoiced correctly',
    ],
    correctIndex: 1,
    explanation:
      'Documentation is integral to industry standards. It provides evidence that work was completed correctly and in compliance with regulations, enables future technicians to understand what was done, creates an audit trail for quality management, and demonstrates the professional behaviours assessed in the EPA.',
  },
  {
    id: 'ip-rating-awareness',
    question: 'When replacing a component in a panel with an IP rating, what must you ensure?',
    options: [
      'That the replacement component carries the same colour finish as the original to preserve appearance',
      'That the panel is upgraded to the highest available IP rating regardless of its original specification',
      "The panel's IP rating is maintained after the work — all covers, gaskets and cable entries are properly refitted and sealed",
      'That the IP rating is recorded in the maintenance log even if the seals are not refitted',
    ],
    correctIndex: 2,
    explanation:
      'Maintaining the IP (Ingress Protection) rating is a regulatory and safety requirement. If you leave a cable entry unsealed, a cover off, or a gasket misaligned, the IP rating is compromised. This could allow moisture, dust or vermin ingress, leading to faults or safety hazards. The assessor will check this during the EPA.',
  },
  {
    id: 'torque-settings',
    question:
      "Why is it important to apply the manufacturer's specified torque settings when making electrical connections?",
    options: [
      'It speeds up the job because a power tool can be used instead of a manual screwdriver',
      'It ensures every terminal in the board is tightened to exactly the same value for a neat finish',
      'It is only needed on aluminium conductors, as copper connections do not loosen over time',
      'Under-tightened connections can overheat and cause fires; over-tightened connections can damage conductors and terminals — correct torque ensures safe, durable connections',
    ],
    correctIndex: 3,
    explanation:
      "Correct torque is a safety-critical requirement. Under-tightened connections create high-resistance joints that overheat, potentially causing fires. Over-tightened connections damage conductor strands or crack terminal housings. Using a calibrated torque screwdriver and applying the manufacturer's specified values ensures connections are safe, reliable and compliant.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 requires that all electrical work shall be carried out by:',
    options: [
      'Any person holding a recognised qualification, working entirely without supervision',
      'Skilled or instructed persons, using proper materials and good workmanship',
      'Only persons registered with a competent person scheme such as NICEIC or NAPIT',
      'Any operative on site, provided the finished work is later inspected by a manager',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Chapter 13 requires good workmanship by skilled or instructed persons, using proper materials. Competence includes appropriate training, qualifications, and experience for the specific work being undertaken.',
  },
  {
    id: 2,
    question: "When completing a repair, 'proper materials' under BS 7671 means:",
    options: [
      'Any materials sourced from a wholesaler, since all stocked products are automatically compliant',
      'Whatever materials the customer has supplied, provided they are the cheapest available option',
      'Materials that comply with relevant British or European standards, are suitable for the conditions, and are correctly rated',
      'Only materials made by the original equipment manufacturer, as third-party parts are never permitted',
    ],
    correctAnswer: 2,
    explanation:
      'Proper materials must comply with relevant product standards (BS EN standards), be suitable for the environmental conditions (temperature, moisture, corrosion), and be correctly rated for the electrical parameters. Using non-compliant materials undermines the safety of the installation.',
  },
  {
    id: 3,
    question:
      'After completing maintenance work, you should carry out a visual inspection to verify:',
    options: [
      'Only that the supply voltage is present at the terminals, since other checks duplicate the electrical tests',
      'Only the appearance of the front cover, as the internal connections are confirmed during energisation',
      'Only that the equipment switches on, because workmanship faults will reveal themselves over time',
      'Correct component installation, secure connections, proper cable management, labelling, and no damage to adjacent equipment',
    ],
    correctAnswer: 3,
    explanation:
      'A post-work visual inspection is a systematic check of workmanship quality, safety compliance, and completeness. It should cover component installation, connection security, cable management, identification and labelling, and confirmation that no collateral damage has occurred.',
  },
  {
    id: 4,
    question: 'Circuit identification and labelling after maintenance work is required because:',
    options: [
      'BS 7671 requires accurate circuit identification at distribution boards and equipment, enabling safe future maintenance and isolation',
      'Labelling is only needed on three-phase boards, as single-phase circuits are simple enough to trace by eye',
      'Labels are required purely for aesthetic consistency and have no bearing on safety or future isolation',
      'Circuit labels are optional once the installation certificate has been issued and filed',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 514.9.1 requires every circuit to be identified with information necessary for safe maintenance and operation. If your maintenance work changes any circuit details, the labelling must be updated. Incorrect labelling is a safety hazard — it could lead to working on the wrong circuit.',
  },
  {
    id: 5,
    question: 'Maintaining the IP rating of an enclosure during maintenance means:',
    options: [
      'Upgrading the enclosure to the next-highest IP rating every time it is opened for maintenance',
      'Ensuring all covers, gaskets, cable glands and entries are correctly refitted to restore the original ingress protection',
      'Recording the IP rating in the maintenance log, after which the seals can be left for the next visit',
      'Applying additional sealant over every joint regardless of the gasket or gland already fitted',
    ],
    correctAnswer: 1,
    explanation:
      'The IP rating protects against ingress of solid objects and moisture. During maintenance, you may need to remove covers and open cable entries. After work, every cover must be refitted, gaskets must be intact and correctly positioned, cable glands must be tight, and any unused entries must be blanked.',
  },
  {
    id: 6,
    question:
      "Manufacturer's instructions and data sheets should be followed during maintenance because:",
    options: [
      'They are only relevant to new installations and may be disregarded once equipment is in service',
      'They legally override BS 7671 in every case, so the regulations need not be consulted at all',
      'They contain specific installation requirements, torque settings, clearances and operating parameters that ensure the component works safely and correctly',
      'They are required only to keep the manufacturer warranty valid and have no effect on safety',
    ],
    correctAnswer: 2,
    explanation:
      "Manufacturer's instructions provide the specific information needed for correct installation: torque settings, conductor sizes, clearances, orientation requirements, and operating conditions. Deviating from these instructions can compromise the component's safety and void any warranty or certification.",
  },
  {
    id: 7,
    question: 'A minor works certificate (BS 7671 Appendix 6) should be completed when:',
    options: [
      'A complete new consumer unit and all its final circuits have been installed from scratch',
      'A periodic inspection of the whole installation has been carried out for a landlord',
      'A like-for-like replacement of a faulty accessory has been made with no change to the circuit',
      'An addition or alteration has been made to an existing circuit, such as adding a socket',
    ],
    correctAnswer: 3,
    explanation:
      'A minor works certificate is required for additions or alterations to existing circuits. Like-for-like replacement of a component in a maintenance context may not require one, but any change that alters the circuit (different rating, additional point, new circuit) does. Knowing when certification is required demonstrates professional competence.',
  },
  {
    id: 8,
    question: 'Professional cable management in a distribution board includes:',
    options: [
      'Neatly dressed conductors, correct bending radii, no strain on terminals, clear labelling, and segregation of power and control circuits where required',
      'Pulling every conductor as tight as possible so the board looks compact, even if terminals are strained',
      'Bundling power and control conductors tightly together to save space inside the enclosure',
      'Leaving long loops of surplus cable coiled in the base of the board for future flexibility',
    ],
    correctAnswer: 0,
    explanation:
      'Professional cable management includes: neat dressing with appropriate bending radii, no mechanical strain on terminals, clear identification of each conductor, segregation where required (e.g., SELV from LV), and sufficient — but not excessive — slack. This workmanship quality is clearly visible and assessed during the EPA.',
  },
  {
    id: 9,
    question: 'When your maintenance work affects the protective devices in a circuit, you should:',
    options: [
      'Fit the highest-rated device available so that nuisance tripping is eliminated on the circuit',
      'Verify that protection coordination is maintained — the protective device rating, type and characteristics are still appropriate for the circuit',
      'Leave the existing device in place without checking, as protective devices never need re-verification',
      'Replace any MCB with a fuse of the same physical size to keep the board layout unchanged',
    ],
    correctAnswer: 1,
    explanation:
      'Any work affecting protective devices must be verified. Confirm the device rating is correct for the circuit conductor size, the type is appropriate for the load, the breaking capacity exceeds the prospective fault current, and discrimination with upstream devices is maintained.',
  },
  {
    id: 10,
    question: 'Cleaning up the work area after completing maintenance is important because:',
    options: [
      'It is only necessary when the customer is present to see the finished job being handed over',
      'It is solely a matter of personal tidiness and has no effect on the safety of the installation',
      'It prevents safety hazards, demonstrates professional standards, ensures no debris or tools are left in equipment, and is an assessed behaviour in the EPA',
      'Debris and offcuts left inside equipment are harmless and can be cleared at the next service visit',
    ],
    correctAnswer: 2,
    explanation:
      'Housekeeping is both a safety requirement and a professional behaviour. Debris in electrical equipment can cause faults or fires. Tools left behind can cause short circuits. A clean, organised work area demonstrates the professional standards expected of a competent maintenance technician and is directly assessed in the EPA.',
  },
  {
    id: 11,
    question: 'What is the significance of the CE/UKCA marking on electrical components?',
    options: [
      'It guarantees the component has been individually tested and certified by the manufacturer before despatch',
      'It indicates the country of manufacture and is used purely for import and customs purposes',
      'It shows the component carries an extended warranty backed by the relevant approvals body',
      'It confirms the component meets the essential safety requirements of relevant UK/EU product standards and can be legally placed on the market',
    ],
    correctAnswer: 3,
    explanation:
      'The CE (EU) and UKCA (UK) markings confirm that the product meets the essential safety, health and environmental requirements of the relevant regulations. Using components without these markings is a compliance issue. As a maintenance technician, you should check for these markings when selecting replacement components.',
  },
  {
    id: 12,
    question: 'When verifying completed maintenance work, functional testing should include:',
    options: [
      'Confirming correct operation under normal and fault conditions, checking protective device operation, verifying control sequences, and recording all test results',
      'Confirming only that the supply is present at the incoming terminals before handing the job back',
      'Checking only that the main indicator lamp illuminates, as this proves the whole system works',
      'Operating the equipment once at full load only, since partial-load behaviour is never relevant',
    ],
    correctAnswer: 0,
    explanation:
      'Functional testing verifies that the complete system operates correctly — not just that power is present. This includes checking that motors run in the correct direction, control sequences operate as designed, protective devices trip at the correct settings, interlocks function, and all alarm and indication systems respond correctly. Recording results provides evidence of thorough verification.',
  },
];

const faqs = [
  {
    question: 'What standard of workmanship is expected in the EPA practical observation?',
    answer:
      "The EPA expects workmanship that would be acceptable in a professional, commercial or industrial environment. This means: secure, correctly torqued connections; neat cable management; correct component installation and orientation; accurate labelling; clean work area; and compliance with BS 7671, manufacturer's instructions and relevant regulations. The assessor is looking for evidence that you can produce work to a standard that a qualified supervisor would accept.",
  },
  {
    question: 'Do I need to issue certification for maintenance work carried out during the EPA?',
    answer:
      'You should understand when certification is required and be able to explain this to the assessor, even if you do not physically complete a certificate during the EPA. Knowing that a minor works certificate is needed for alterations, and that like-for-like replacement may not need one, demonstrates your understanding of compliance requirements. Your training provider will confirm the specific EPA requirements.',
  },
  {
    question:
      'How do I demonstrate compliance with industry standards without memorising regulation numbers?',
    answer:
      "You do not need to quote specific regulation numbers. Demonstrate compliance through your actions: check component ratings match requirements, follow manufacturer's instructions, use correct tools, apply proper torque, manage cables neatly, test before and after, and maintain the IP rating of enclosures. If you naturally reference standards (e.g., 'I am following the manufacturer's torque setting'), this shows awareness without requiring memorisation.",
  },
  {
    question: "What counts as 'good workmanship' in the eyes of an EPA assessor?",
    answer:
      'Good workmanship encompasses: safe working throughout, correct use of tools and instruments, proper cable preparation and termination, neat cable management, correct component installation, thorough functional testing, accurate labelling, clean work area, and professional documentation. It is the overall quality and care evident in your work, not just whether the circuit functions.',
  },
  {
    question: 'Can I lose marks for finishing ahead of time if my work is correct?',
    answer:
      'No. Finishing efficiently while maintaining quality and safety is a positive indicator. However, candidates who rush and produce poor workmanship in order to finish quickly will score lower than those who take appropriate time to produce quality work. The assessor evaluates the quality of the work, not the speed of completion.',
  },
];

const MOETModule7Section2_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.2 · Subsection 5"
        title="Completing Work to Industry Standards"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Quality standards, professional workmanship and regulatory compliance for EPA success.
          </p>

          <TLDR
            points={[
              'BS 7671: good workmanship, proper materials, competent persons.',
              'Manufacturer: follow data sheets and installation guides.',
              'Quality: connections, cable management, labelling, testing.',
              'Evidence: documentation and certification where required.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply BS 7671 workmanship requirements to all maintenance and repair work',
              "Follow manufacturer's instructions and data sheets for correct component installation",
              'Demonstrate professional cable management and termination quality',
              'Maintain IP ratings and environmental protection after maintenance',
              'Complete appropriate documentation and certification for maintenance work',
              'Understand when minor works certificates and other compliance documents are required',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Assessed:</strong> workmanship quality is directly marked.
              </li>
              <li>
                <strong>Distinction:</strong> exceptional quality and attention to detail.
              </li>
              <li>
                <strong>Compliance:</strong> demonstrating regulatory awareness.
              </li>
              <li>
                <strong>ST1426:</strong> professional standards and behaviours.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>BS 7671 workmanship requirements</ContentEyebrow>

          <ConceptBlock title="BS 7671 workmanship requirements">
            <p>
              BS 7671:2018+A4:2026 (the 18th Edition IET Wiring Regulations) sets the benchmark for
              all electrical work in the UK. Chapter 13 establishes the fundamental principles,
              including the requirement for good workmanship by competent persons using proper
              materials. These requirements apply to maintenance and repair work just as much as new
              installations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key workmanship regulations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 134.1.1:</strong> good workmanship by competent persons using proper
                materials.
              </li>
              <li>
                <strong>Reg 510.1:</strong> selection and erection of equipment shall comply with
                the relevant regulations.
              </li>
              <li>
                <strong>Reg 514.9.1:</strong> accurate circuit identification and labelling at every
                distribution board.
              </li>
              <li>
                <strong>Reg 526.1:</strong> connections must provide durable electrical continuity
                and adequate mechanical strength.
              </li>
              <li>
                <strong>Reg 526.3:</strong> connections must be accessible for inspection and
                testing (with some defined exceptions).
              </li>
              <li>
                <strong>Reg 421.1.201:</strong> precautions to prevent fire — including correct
                cable selection and installation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Maintenance vs new installation standards">
            <p>
              There is a common misconception that maintenance work does not need to meet the same
              standard as new installations. This is incorrect. BS 7671 applies to all electrical
              work, and the Electricity at Work Regulations 1989 require all electrical systems to
              be maintained in a safe condition. Your maintenance work must meet the same quality
              and compliance standards as a new installation.
            </p>
            <p>
              <strong>Key point:</strong> during the EPA, the assessor evaluates your workmanship
              against the BS 7671 standard. Every connection, cable route, and component
              installation should demonstrate that you understand and apply these requirements as a
              matter of professional habit.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Professional workmanship in practice</ContentEyebrow>

          <ConceptBlock title="Professional workmanship in practice">
            <p>
              Good workmanship is visible. An experienced assessor can tell the quality of your work
              at a glance — neat cable management, consistent termination quality, correct component
              orientation, and attention to detail all contribute to the overall standard. These
              elements combine to create work that is safe, reliable, and maintainable.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Workmanship quality checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Connections:</strong> correct torque, full conductor insertion, no stray
                strands, correct ferrules where needed.
              </li>
              <li>
                <strong>Cable management:</strong> neat routing, correct bending radii, proper
                support, no strain on terminals.
              </li>
              <li>
                <strong>Component mounting:</strong> secure fixings, correct orientation, DIN rail
                clips engaged, adequate clearance.
              </li>
              <li>
                <strong>Labelling:</strong> clear, durable, accurate identification of circuits,
                components and cables.
              </li>
              <li>
                <strong>Segregation:</strong> power and control circuits separated where required by
                BS 7671 Chapter 52.
              </li>
              <li>
                <strong>Protection:</strong> IP rating maintained, covers refitted, gaskets in
                place, blanking plates fitted.
              </li>
              <li>
                <strong>Testing:</strong> continuity, insulation resistance, and functional tests
                completed and recorded.
              </li>
              <li>
                <strong>Housekeeping:</strong> work area clean, debris removed from equipment, tools
                accounted for.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Connection quality: pass vs distinction">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Aspect</th>
                    <th className="py-2 pr-4 font-medium text-white">Pass standard</th>
                    <th className="py-2 font-medium text-white">Distinction standard</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Torque</td>
                    <td className="py-2 pr-4">Adequately tightened</td>
                    <td className="py-2">
                      Torque screwdriver used, manufacturer&apos;s values applied
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Cable dressing</td>
                    <td className="py-2 pr-4">Acceptable routing</td>
                    <td className="py-2">Neat, consistent bending radii, no crossing conductors</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Ferrules</td>
                    <td className="py-2 pr-4">Used where required</td>
                    <td className="py-2">Correct size, proper crimping, consistent throughout</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Identification</td>
                    <td className="py-2 pr-4">Basic labelling present</td>
                    <td className="py-2">Comprehensive, durable labels matching circuit chart</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> workmanship quality is the most visible indicator of
              competence. An assessor who sees neat, professional work immediately has confidence in
              your ability. Conversely, poor workmanship raises doubts about every aspect of your
              practice.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Environmental protection and IP ratings</ContentEyebrow>

          <ConceptBlock title="Environmental protection and IP ratings">
            <p>
              Electrical enclosures are designed to protect against the ingress of solid objects and
              moisture, classified by their IP (Ingress Protection) rating. During maintenance,
              opening enclosures compromises this protection. Restoring the IP rating after work is
              a professional responsibility that is often overlooked — and is specifically checked
              by EPA assessors.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common IP ratings in electrical maintenance">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">IP rating</th>
                    <th className="py-2 pr-4 font-medium text-white">Protection level</th>
                    <th className="py-2 font-medium text-white">Typical application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">IP20</td>
                    <td className="py-2 pr-4">Finger-safe, no moisture protection</td>
                    <td className="py-2">Internal distribution boards</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">IP44</td>
                    <td className="py-2 pr-4">
                      Protected against objects &gt; 1 mm and splashing water
                    </td>
                    <td className="py-2">Indoor industrial panels</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">IP55</td>
                    <td className="py-2 pr-4">Dust-protected, protected against water jets</td>
                    <td className="py-2">Outdoor enclosures, washdown areas</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">IP65</td>
                    <td className="py-2 pr-4">Dust-tight, protected against water jets</td>
                    <td className="py-2">Outdoor equipment, food processing</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">IP66</td>
                    <td className="py-2 pr-4">Dust-tight, protected against powerful water jets</td>
                    <td className="py-2">External switchgear, harsh environments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Maintaining IP ratings after maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Covers:</strong> refit all covers with correct fixings — do not leave any
                missing or loosely fitted.
              </li>
              <li>
                <strong>Gaskets:</strong> check gasket condition before refitting — replace any that
                are damaged, compressed or perished.
              </li>
              <li>
                <strong>Cable glands:</strong> tighten all glands to the correct compression —
                verify the seal around the cable sheath.
              </li>
              <li>
                <strong>Blanking plates:</strong> fit blanking plates to any unused cable entries —
                do not leave open holes.
              </li>
              <li>
                <strong>Door seals:</strong> ensure enclosure door seals are intact and the door
                closes fully and latches correctly.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> after maintenance, check every opening you created:
              covers, cable entries, glands, blanking plates. If you opened it, you are responsible
              for restoring it to its original IP rating.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Documentation and compliance records</ContentEyebrow>

          <ConceptBlock title="Documentation and compliance records">
            <p>
              Completing work to industry standards includes creating appropriate documentation.
              This provides evidence of compliance, enables future maintenance, and demonstrates the
              professional behaviours expected under ST1426. The level of documentation depends on
              the nature and extent of the work.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Documentation requirements by work type">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Like-for-like replacement:</strong> maintenance log entry with details of
                fault, replacement, and verification testing.
              </li>
              <li>
                <strong>Minor alteration:</strong> minor works certificate (BS 7671 Appendix 6) plus
                maintenance log.
              </li>
              <li>
                <strong>Addition to circuit:</strong> minor works certificate with test results for
                the new work.
              </li>
              <li>
                <strong>New circuit:</strong> electrical installation certificate (BS 7671 Appendix
                6) with full Schedule of Test Results.
              </li>
              <li>
                <strong>Periodic inspection:</strong> electrical installation condition report
                (EICR).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="What to record in a maintenance log">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Date, time, and technician name.</li>
              <li>Equipment identified (location, asset number, circuit reference).</li>
              <li>Fault description and symptoms.</li>
              <li>Diagnosis process and findings.</li>
              <li>Work carried out (components replaced, adjustments made).</li>
              <li>Test results (pre and post repair).</li>
              <li>Verification of correct operation.</li>
              <li>Recommendations for follow-up or preventive action.</li>
            </ul>
            <p>
              <strong>Key point:</strong> documentation is not an afterthought — it is an integral
              part of completing work to industry standards. A maintenance task is not finished
              until it is properly documented.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Verification testing and handover</ContentEyebrow>

          <ConceptBlock title="Verification testing and handover">
            <p>
              The final stage of completing work to industry standards is verification — confirming
              that the work is correct, safe, and the system operates as intended. This includes
              both electrical testing and functional verification, followed by a professional
              handover to the responsible person. Skipping or rushing this stage is a common reason
              for lower grades in the EPA practical observation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Verification testing sequence">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection:</strong> systematic check of all work before energising —
                connections, cable routes, component installation, labelling.
              </li>
              <li>
                <strong>Electrical tests:</strong> continuity of protective conductors, insulation
                resistance, earth fault loop impedance where appropriate.
              </li>
              <li>
                <strong>Functional tests:</strong> operate the system under normal conditions —
                check all functions, sequences, and interlocks.
              </li>
              <li>
                <strong>Protective device verification:</strong> confirm RCDs trip within required
                times, overloads are correctly set.
              </li>
              <li>
                <strong>Record results:</strong> document all test readings and compare against
                acceptable values.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Professional handover">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inform the responsible person:</strong> explain what work was carried out
                and confirm the system is safe to return to service.
              </li>
              <li>
                <strong>Provide documentation:</strong> hand over maintenance logs, test results,
                and any certificates.
              </li>
              <li>
                <strong>Highlight any concerns:</strong> report any additional issues found during
                the work that may require future attention.
              </li>
              <li>
                <strong>Confirm understanding:</strong> ensure the responsible person understands
                any changes made or precautions needed.
              </li>
              <li>
                <strong>Remove isolation:</strong> only remove lock-off and restore power when safe
                to do so and with authorisation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Distinction-level verification">
            <p>
              Distinction candidates do not just confirm the work functions — they verify it
              thoroughly. This means testing under both normal and fault conditions, checking that
              protection coordination is maintained, confirming all ancillary systems (alarms,
              indicators, interlocks) operate correctly, and providing a clear, professional verbal
              summary of the work to the assessor or responsible person.
            </p>
          </ConceptBlock>

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>ST1426 link:</strong> completing work to industry standards is assessed across
            multiple EPA components — practical observation, professional discussion, and portfolio
            evidence. Demonstrating consistent, documented compliance is a distinction-level
            behaviour.
          </p>

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Reg 134.1.1: good workmanship, competent persons, proper materials.',
              'BS 7671 Reg 514.9.1: accurate circuit identification and labelling.',
              'BS 7671 Reg 526.1: durable electrical continuity and mechanical strength at connections.',
              'EAWR 1989 Reg 4(2): electrical systems shall be maintained to prevent danger.',
              'IP rating must be restored after any maintenance that disturbs the enclosure.',
              'CE/UKCA marking: verify all replacement components carry appropriate product markings.',
              'Minor works certificate required for alterations and additions, not like-for-like replacement.',
              "Torque settings: always follow manufacturer's specified values using a calibrated tool.",
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Industry Standards" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Control System Troubleshooting
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-6')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Assessment Marking Criteria Awareness
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section2_5;
