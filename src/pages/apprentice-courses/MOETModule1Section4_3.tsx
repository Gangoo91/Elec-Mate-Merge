/**
 * MOET · Module 1 · Section 1.4 · Subsection 3 — BS 7671 Wiring Regulations
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
 *   Knowledge  · "Documentation requirements: documentation control,
 *                 auditable records."
 *              · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and calibration
 *                 requirements."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
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

const TITLE = 'BS 7671 Wiring Regulations - MOET Module 1 Section 4.3';
const DESCRIPTION =
  'Comprehensive guide to BS 7671:2018+A4:2026 (IET Wiring Regulations) for electrical maintenance technicians: structure, 7 parts, fundamental principles, scope, amendments, and relationship to EAWR 1989.';

const quickCheckQuestions = [
  {
    id: 'bs7671-status',
    question: 'What is the legal status of BS 7671 (the IET Wiring Regulations)?',
    options: [
      'It is a non-statutory British Standard — not law, but widely regarded as the benchmark for compliance with the EAWR',
      'It is a statutory instrument that carries the full force of law in its own right',
      'It is an Approved Code of Practice issued by the HSE under the Health and Safety at Work Act',
      'It is a European directive directly applicable in the UK without any national deviations',
    ],
    correctIndex: 0,
    explanation:
      'BS 7671 is a British Standard published by the British Standards Institution (BSI) and the Institution of Engineering and Technology (IET). It is not law — it is non-statutory. However, it is widely accepted as the principal means of demonstrating compliance with the Electricity at Work Regulations 1989 for low voltage installations.',
  },
  {
    id: 'bs7671-parts',
    question: 'How many main parts does BS 7671:2018+A4:2026 contain?',
    options: ['5 parts', '4 parts', '7 parts', '10 parts'],
    correctIndex: 2,
    explanation:
      'BS 7671 is structured in 7 parts: Part 1 (Scope, object and fundamental principles), Part 2 (Definitions), Part 3 (Assessment of general characteristics), Part 4 (Protection for safety), Part 5 (Selection and erection of equipment), Part 6 (Inspection and testing), and Part 7 (Special installations or locations).',
  },
  {
    id: 'bs7671-part6',
    question: 'Part 6 of BS 7671 covers which aspect of electrical installations?',
    options: [
      'Selection and erection of equipment',
      'Protection for safety',
      'Special installations or locations',
      'Inspection and testing',
    ],
    correctIndex: 3,
    explanation:
      'Part 6 of BS 7671 covers inspection and testing. It sets out the requirements for initial verification of new installations and alterations, and for periodic inspection and testing of existing installations. For maintenance technicians, Part 6 is a key reference as it defines the tests you carry out and the criteria for compliance.',
  },
  {
    id: 'bs7671-amendment',
    question: "What does 'BS 7671:2018+A4:2026' mean in terms of the document's history?",
    options: [
      'It is the third edition published in 2018 and reissued in 2024',
      'It is the 2018 edition with the third amendment (published 2024) incorporated',
      'It is the 2024 edition replacing the entire 2018 standard',
      'It is the 2018 edition with three separate standards combined into one',
    ],
    correctIndex: 1,
    explanation:
      "The notation 'BS 7671:2018+A4:2026' means the base document is the 2018 edition (the 18th Edition), with Amendment 4 (published in 2026) incorporated. Amendments update specific sections without replacing the entire standard. Previous amendments were A1:2020 (withdrawn), A2:2022 and A3:2024.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 is published jointly by:',
    options: [
      'The HSE and the Electrical Safety Council',
      'The BSI and the IET (Institution of Engineering and Technology)',
      'The IET and NICEIC',
      'The BSI and the Health and Safety Executive',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 is published jointly by the British Standards Institution (BSI) and the Institution of Engineering and Technology (IET). The IET also publishes the Guidance Notes (1–8) and the On-Site Guide, which provide practical interpretation of BS 7671 requirements.',
  },
  {
    id: 2,
    question:
      'Part 1 of BS 7671 establishes the fundamental principles. Which of the following is a fundamental principle?',
    options: [
      'Every circuit must be protected by a 30 mA RCD regardless of the installation type',
      'All electrical work must be carried out by a registered competent person scheme member',
      'Protection against electric shock must be provided by at least one of the specified measures',
      'Cables in walls must always be installed in earthed metallic conduit',
    ],
    correctAnswer: 2,
    explanation:
      'Chapter 13 of Part 1 establishes the fundamental principles of protection for safety. These include that persons and livestock shall be protected against dangers arising from contact with live parts (basic protection) and contact with exposed conductive parts made live by a fault (fault protection). The regulations specify approved measures for achieving this.',
  },
  {
    id: 3,
    question: 'Part 3 of BS 7671 requires assessment of:',
    options: [
      'The competence and qualifications of every person carrying out the installation work',
      'The selection of cable types and current-carrying capacities for each final circuit',
      'The sequence of tests to be applied during initial verification of the installation',
      'The general characteristics of the installation including purpose, supply, arrangement and maintainability',
    ],
    correctAnswer: 3,
    explanation:
      'Part 3 (Assessment of general characteristics) requires assessment of the purpose of the installation, the external influences (environment, temperature, humidity), the supply characteristics (earthing system, fault level, prospective fault current), the arrangement of circuits, and provisions for maintenance and safety services.',
  },
  {
    id: 4,
    question:
      'Part 4 of BS 7671 covers protection for safety. Which of these protection measures is addressed?',
    options: [
      'Protection against electric shock, thermal effects, overcurrent, voltage disturbances and electromagnetic influences',
      'Protection against electric shock only, with other hazards covered in Part 5',
      'Protection of the supply network from faults originating in the consumer installation',
      'Protection of equipment against theft, vandalism and unauthorised interference',
    ],
    correctAnswer: 0,
    explanation:
      'Part 4 covers all aspects of protection for safety: Chapter 41 (electric shock), Chapter 42 (thermal effects), Chapter 43 (overcurrent), Chapter 44 (voltage disturbances and electromagnetic influences). These chapters define the technical requirements for protective measures that must be applied to every installation.',
  },
  {
    id: 5,
    question:
      'Part 5 of BS 7671 covers the selection and erection of equipment. This includes requirements for:',
    options: [
      'The maximum permitted earth fault loop impedance values for each protective device',
      'Common rules, wiring systems, switchgear, earthing, and other equipment',
      'The classification of external influences such as ambient temperature and moisture',
      'The recommended maximum intervals for periodic inspection and testing',
    ],
    correctAnswer: 1,
    explanation:
      'Part 5 covers the practical requirements for selecting and installing electrical equipment: Chapter 51 (common rules), Chapter 52 (wiring systems), Chapter 53 (switchgear and controlgear), Chapter 54 (earthing arrangements and protective conductors), Chapter 55 (other equipment), and Chapter 56 (supplies for safety services).',
  },
  {
    id: 6,
    question: 'Under Part 6 of BS 7671, initial verification of a new installation must include:',
    options: [
      'Periodic inspection and the issue of an Electrical Installation Condition Report',
      'A risk assessment of the external influences before any cable is selected',
      'Inspection, testing and certification — including an Electrical Installation Certificate',
      'Confirmation that the installer holds current registration with a competent person scheme',
    ],
    correctAnswer: 2,
    explanation:
      'Part 6 requires initial verification to include detailed visual inspection, a prescribed sequence of electrical tests (continuity, insulation resistance, polarity, earth fault loop impedance, RCD operation, etc.), and the production of an Electrical Installation Certificate (EIC) confirming the installation complies with BS 7671.',
  },
  {
    id: 7,
    question:
      'Part 7 of BS 7671 covers special installations or locations. Which of the following is covered by Part 7?',
    options: [
      'Standard domestic dwellings with no increased risk to persons or livestock',
      'Office buildings and retail premises supplied at standard low voltage',
      'General industrial installations with three-phase distribution boards',
      'Locations such as bathrooms, swimming pools, construction sites, marinas and solar PV installations',
    ],
    correctAnswer: 3,
    explanation:
      'Part 7 addresses locations and installations requiring additional or modified protective measures due to increased risk. These include bathrooms (Section 701), swimming pools (Section 702), construction sites (Section 704), agricultural premises (Section 705), marinas (Section 709), solar PV (Section 712), EV charging (Section 722), and many others.',
  },
  {
    id: 8,
    question: 'The scope of BS 7671 excludes:',
    options: [
      'Systems for distribution of electricity to the public and equipment of electricity suppliers (covered by the ESQCR)',
      'Fixed wiring in domestic dwellings, which is instead covered by Part P alone',
      'Temporary installations such as those on construction and demolition sites',
      'Circuits operating at voltages below 50 V AC, which require no protective measures',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 excludes electricity supply systems (covered by the Electricity Safety, Quality and Continuity Regulations 2002), lightning protection systems (BS EN 62305), electrical equipment of machines (BS EN 60204), radio interference suppression equipment, and some other specific applications. It covers consumer installations from the origin (meter position) onwards.',
  },
  {
    id: 9,
    question: 'How does BS 7671 relate to the EAWR 1989?',
    options: [
      'BS 7671 legally overrides the EAWR 1989 for all low voltage installation work',
      'BS 7671 provides one means of complying with the EAWR, but compliance with BS 7671 does not guarantee compliance with the EAWR in all circumstances',
      'BS 7671 and the EAWR 1989 are completely unrelated and apply to different industries',
      'Compliance with BS 7671 is the only way to satisfy the EAWR in every circumstance',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 provides technical standards that, when complied with, will generally demonstrate compliance with the EAWR. However, BS 7671 is not the only means of compliance, and there may be circumstances where BS 7671 compliance alone is insufficient (e.g., where the specific workplace conditions require additional precautions beyond BS 7671 minimums).',
  },
  {
    id: 10,
    question:
      'The recommended maximum interval for periodic inspection and testing of an industrial installation under BS 7671 guidance is:',
    options: ['1 year', '3 years', '5 years', '10 years'],
    correctAnswer: 2,
    explanation:
      'IET Guidance Note 3 (Inspection and Testing) recommends maximum intervals for periodic inspection. For industrial installations, the recommended interval is typically 3 years (more frequently for harsher environments). Commercial installations are typically 5 years, and domestic installations are 10 years or on change of occupancy.',
  },
  {
    id: 11,
    question:
      'What document is issued following a satisfactory periodic inspection and testing of an existing installation?',
    options: [
      'An Electrical Installation Certificate (EIC)',
      'A Minor Electrical Installation Works Certificate (MEIWC)',
      'A Building Regulations Compliance Certificate',
      'An Electrical Installation Condition Report (EICR)',
    ],
    correctAnswer: 3,
    explanation:
      'An EICR (Electrical Installation Condition Report) is issued following periodic inspection and testing. It reports on the condition of the existing installation, using classification codes (C1, C2, C3, FI) to indicate the urgency of any defects found. An EIC is issued for new installations or alterations, not periodic inspection.',
  },
  {
    id: 12,
    question: 'Under ST1426, why is knowledge of BS 7671 important for maintenance technicians?',
    options: [
      'BS 7671 defines the technical standards against which electrical systems are designed, installed, tested and maintained — a maintenance technician must understand these standards to maintain systems safely',
      'BS 7671 is the only legal document a maintenance technician needs, replacing the EAWR and HSWA entirely',
      'BS 7671 applies only to new installations, so it has no relevance to maintenance of existing systems',
      'BS 7671 sets out the apprenticeship assessment criteria that the technician must satisfy at end-point assessment',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 defines the technical standards for electrical installations. A maintenance technician must understand these standards to assess whether an existing installation is safe, to carry out periodic testing correctly, to make alterations that comply with current requirements, and to identify defects that may indicate non-compliance with safety standards.',
  },
];

const faqs = [
  {
    question: 'Do I need to comply with BS 7671 when maintaining an old installation?',
    answer:
      'An existing installation does not need to be upgraded to the current edition of BS 7671 unless it is being altered or extended. However, you must assess whether the installation is safe and complies with the EAWR 1989. If an existing installation presents a danger (e.g., lack of earthing), the EAWR require it to be made safe regardless of when it was installed. BS 7671 provides the benchmark for assessing safety.',
  },
  {
    question: 'What is the difference between an EIC, MEIWC and EICR?',
    answer:
      'An Electrical Installation Certificate (EIC) is issued for new installations or major alterations. A Minor Electrical Installation Works Certificate (MEIWC) is for minor works such as adding a socket or light. An Electrical Installation Condition Report (EICR) is for periodic inspection and testing of existing installations. Each has a different purpose and format, but all are defined in BS 7671 Appendix 6.',
  },
  {
    question: 'How often is BS 7671 updated?',
    answer:
      'BS 7671 is typically updated on a cycle of approximately 3-5 years through amendments, with a full new edition every 10-15 years. The current edition is the 18th Edition (2018) incorporating Amendment 4, cited as BS 7671:2018+A4:2026; the earlier A2:2022 and A3:2024 amendments are superseded. The 19th Edition is expected in due course. Electricians should keep up to date with amendments as they can introduce significant changes to specific requirements.',
  },
  {
    question: 'Is BS 7671 based on international or European standards?',
    answer:
      'Yes. BS 7671 is substantially based on the CENELEC Harmonisation Documents (HD 60364 series), which are themselves based on IEC 60364 (International Electrotechnical Commission). However, BS 7671 includes UK-specific national deviations and additions that reflect UK practice, supply characteristics, and regulatory requirements. It is not an exact copy of the European standards.',
  },
  {
    question: 'What are the IET Guidance Notes and how do they relate to BS 7671?',
    answer:
      'The IET publishes a series of Guidance Notes (GN1 to GN8) and the On-Site Guide that provide practical interpretation and worked examples for BS 7671 requirements. They are not part of BS 7671 itself but are widely used by electricians to understand and apply the regulations. Key guidance notes include GN3 (Inspection and Testing), GN5 (Protection Against Electric Shock), and GN8 (Earthing and Bonding).',
  },
];

const MOETModule1Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.4 · Subsection 3"
        title="BS 7671 Wiring Regulations"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            The UK national standard for electrical installation and maintenance.
          </p>

          <TLDR
            points={[
              'BS 7671: Non-statutory British Standard — the IET Wiring Regulations',
              'Structure: 7 parts + appendices covering design to testing',
              'Current: 18th Edition (2018) + Amendment 4 (2026)',
              'Relationship: Provides means of compliance with EAWR 1989',
            ]}
          />

          <ConceptBlock title="Electrical Maintenance Context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part 6:</strong> Inspection, testing and certification requirements
              </li>
              <li>
                <strong>Part 4:</strong> Protection measures you verify during maintenance
              </li>
              <li>
                <strong>Part 7:</strong> Special locations requiring additional precautions
              </li>
              <li>
                <strong>ST1426:</strong> Knowledge of BS 7671 as technical compliance standard
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the structure and scope of BS 7671:2018+A4:2026',
              'Describe the non-statutory status of BS 7671 and its relationship to the EAWR 1989',
              'Identify the content and purpose of each of the 7 parts',
              'Explain the fundamental principles established in Part 1 (Chapter 13)',
              'Understand the role of Part 6 in inspection, testing and certification',
              'Describe the amendment history and how updates are incorporated',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Status, scope and relationship to legislation</ContentEyebrow>

          <ConceptBlock title="Status, Scope and Relationship to Legislation">
            <p>
              BS 7671 — Requirements for Electrical Installations — is the UK&apos;s national
              standard for the design, erection, and verification of electrical installations. It is
              published jointly by the British Standards Institution (BSI) and the Institution of
              Engineering and Technology (IET), and is commonly referred to as the IET Wiring
              Regulations or simply &quot;the Regs&quot;.
            </p>
            <p>
              The current edition is BS 7671:2018+A4:2026 — the 18th Edition with Amendment 4. The
              standard is based on the CENELEC Harmonisation Documents (HD 60364 series) with UK
              national deviations. It has a long history, with the first edition of the IEE (now
              IET) Wiring Regulations published in 1882.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Legal Status">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Non-statutory:</strong> BS 7671 is not law. It is a British Standard —
                compliance is not legally mandated by the EAWR 1989
              </li>
              <li>
                <strong>De facto benchmark:</strong> However, it is universally accepted as the
                principal means of demonstrating compliance with the EAWR for LV installations
              </li>
              <li>
                <strong>Court recognition:</strong> In legal proceedings, compliance with BS 7671 is
                generally accepted as evidence that the EAWR have been satisfied (and vice versa —
                non-compliance may be evidence of breach)
              </li>
              <li>
                <strong>Building Regulations:</strong> Part P of the Building Regulations (England
                and Wales) references BS 7671 for domestic electrical work, giving it indirect
                regulatory force in that context
              </li>
              <li>
                <strong>Not an ACoP:</strong> Unlike some HSE publications, BS 7671 is not an
                approved code of practice under Section 16 of the HSWA 1974 — it does not have the
                special legal status of an ACoP
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Scope of BS 7671">
            <p>BS 7671 applies to:</p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Electrical installations of buildings (domestic, commercial, industrial)</li>
              <li>Fixed wiring and associated equipment from the origin of the installation</li>
              <li>
                Circuits supplied at nominal voltages up to and including 1000 V AC or 1500 V DC
              </li>
              <li>Alterations and additions to existing installations</li>
              <li>Temporary installations (exhibitions, fairgrounds, construction sites)</li>
            </ul>
            <p>BS 7671 does NOT apply to:</p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Electricity distribution systems (covered by ESQCR 2002)</li>
              <li>Lightning protection systems (BS EN 62305)</li>
              <li>Electrical equipment of machines (BS EN 60204)</li>
              <li>Equipment on board ships (BS 8450)</li>
              <li>Mining installations (separate regulations)</li>
              <li>Systems above 1000 V AC (though some general principles apply)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common Misconception">
            <p>
              Many electricians believe BS 7671 is &quot;the law&quot;. It is not. The law is the
              EAWR 1989, the HSWA 1974, and associated statutory regulations. BS 7671 is a standard
              that provides a means of complying with the law. This distinction matters: in some
              circumstances, compliance with BS 7671 alone may not be sufficient to prevent danger
              (e.g., in unusual environments or applications not fully covered by the standard).
              Equally, an installation that does not comply with BS 7671 in every respect may still
              be safe and lawful if alternative measures provide equivalent protection.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Structure of BS 7671 — the seven parts</ContentEyebrow>

          <ConceptBlock title="Structure of BS 7671 — The Seven Parts">
            <p>
              BS 7671 is organised into seven parts, each addressing a different aspect of
              electrical installations. The numbering follows the CENELEC/IEC 60364 structure.
              Understanding this structure helps you navigate the standard efficiently — which is
              essential when you need to reference specific requirements on site.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Part 1 — Scope, Object and Fundamental Principles"
            onSite="Key principle (13.1): Persons and livestock shall be protected against the dangers that may arise from contact with or approach to live parts of the installation."
          >
            <p>
              Part 1 defines the scope of BS 7671 and establishes the fundamental principles that
              underpin every other requirement. Chapter 13 is particularly important — it states the
              fundamental principles of protection for safety.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chapter 11:</strong> Scope — what BS 7671 covers and excludes
              </li>
              <li>
                <strong>Chapter 12:</strong> Object and effects — the aims of the standard
              </li>
              <li>
                <strong>Chapter 13:</strong> Fundamental principles — protection against electric
                shock, thermal effects, overcurrent, fault currents; isolation and switching; good
                workmanship; competent persons
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Part 2 — Definitions">
            <p>
              Part 2 provides definitions for all technical terms used in BS 7671. These are not
              general dictionary definitions — they are precise technical definitions with specific
              legal and technical meaning. Always refer to Part 2 if you are uncertain about a term.
              Key definitions include &quot;basic protection&quot;, &quot;fault protection&quot;,
              &quot;protective conductor&quot;, &quot;earth fault loop impedance&quot;, and
              &quot;prospective fault current&quot;.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Part 3 — Assessment of General Characteristics">
            <p>
              Part 3 requires the designer/installer to assess the characteristics of the supply and
              the installation before design begins. This is critical for maintenance technicians
              because changes to any of these characteristics may require alterations to the
              installation.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chapter 31:</strong> Purposes, supplies and structure
              </li>
              <li>
                <strong>Chapter 32:</strong> Classification of external influences (environment,
                utilisation, building construction)
              </li>
              <li>
                <strong>Chapter 33:</strong> Compatibility of equipment
              </li>
              <li>
                <strong>Chapter 34:</strong> Maintainability — the installation must be designed so
                it can be safely maintained
              </li>
              <li>
                <strong>Chapter 35:</strong> Safety services (emergency lighting, fire alarms)
              </li>
              <li>
                <strong>Chapter 36:</strong> Continuity of service
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Part 4 — Protection for Safety">
            <p>
              Part 4 contains the core protective requirements — the technical heart of BS 7671. As
              a maintenance technician, you will reference Part 4 frequently when assessing whether
              an installation&apos;s protective measures remain effective.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chapter 41:</strong> Protection against electric shock — basic protection
                (insulation, barriers, enclosures) and fault protection (ADS, earthing, protective
                conductors, RCDs)
              </li>
              <li>
                <strong>Chapter 42:</strong> Protection against thermal effects — fire protection,
                burns
              </li>
              <li>
                <strong>Chapter 43:</strong> Protection against overcurrent — overload and
                short-circuit protection
              </li>
              <li>
                <strong>Chapter 44:</strong> Protection against voltage disturbances and
                electromagnetic influences — surges, EMC
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Part 5 — Selection and Erection of Equipment">
            <p>
              Part 5 specifies the requirements for selecting and installing equipment to satisfy
              the protection requirements of Part 4.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chapter 51:</strong> Common rules for selection and erection
              </li>
              <li>
                <strong>Chapter 52:</strong> Wiring systems — cable types, installation methods,
                current-carrying capacities, voltage drop
              </li>
              <li>
                <strong>Chapter 53:</strong> Switchgear and controlgear — devices for protection,
                isolation and switching
              </li>
              <li>
                <strong>Chapter 54:</strong> Earthing arrangements and protective conductors
              </li>
              <li>
                <strong>Chapter 55:</strong> Other equipment (generators, UPS, luminaires, etc.)
              </li>
              <li>
                <strong>Chapter 56:</strong> Supplies for safety services
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Part 6 — Inspection and Testing">
            <p>
              Part 6 defines the requirements for verifying that installations comply with BS 7671.
              It covers both initial verification (new work) and periodic inspection and testing
              (existing installations).
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chapter 61:</strong> Initial verification — inspection and testing before
                energisation
              </li>
              <li>
                <strong>Chapter 62:</strong> Periodic inspection and testing — assessing condition
                of existing installations
              </li>
              <li>
                <strong>Chapter 63:</strong> Requirements for reporting — EIC, MEIWC, EICR formats
              </li>
              <li>
                <strong>Test sequence:</strong> Continuity → insulation resistance → polarity →
                earth fault loop impedance → RCD operation → prospective fault current
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Part 7 — Special Installations or Locations">
            <p>
              Part 7 provides additional or modified requirements for locations where the risk is
              higher than normal. Each section (7XX) addresses a specific installation type or
              location.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 701:</strong> Bathrooms and shower rooms
              </li>
              <li>
                <strong>Section 702:</strong> Swimming pools and fountains
              </li>
              <li>
                <strong>Section 704:</strong> Construction and demolition sites
              </li>
              <li>
                <strong>Section 705:</strong> Agricultural and horticultural premises
              </li>
              <li>
                <strong>Section 708:</strong> Electrical installations in caravan/camping parks
              </li>
              <li>
                <strong>Section 711:</strong> Exhibitions, shows and stands
              </li>
              <li>
                <strong>Section 712:</strong> Solar photovoltaic (PV) systems
              </li>
              <li>
                <strong>Section 722:</strong> Electric vehicle charging installations
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Fundamental principles (Chapter 13)</ContentEyebrow>

          <ConceptBlock
            title="Fundamental Principles (Chapter 13)"
            onSite="Maintenance link: Chapter 34 (Part 3) specifically addresses maintainability. It requires that the frequency and quality of maintenance expected over the installation's life be assessed at the design stage. As a maintenance technician, if you find an installation that is practically impossible to maintain safely (e.g., no isolation facility, insufficient working space), this is a design deficiency that should be reported."
          >
            <p>
              Chapter 13 of Part 1 establishes the fundamental principles that every other
              requirement in BS 7671 serves to implement. These principles are not merely
              aspirational — they define the objectives that every installation must achieve. For
              maintenance technicians, they provide the framework for assessing whether an
              installation remains safe.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Protection Against Electric Shock (131.1–131.6)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Basic protection:</strong> Protection against contact with live parts in
                normal service conditions — achieved by insulation, barriers, enclosures, or
                obstacles/placing out of reach
              </li>
              <li>
                <strong>Fault protection:</strong> Protection against contact with parts made live
                by a fault — achieved by automatic disconnection of supply (ADS), the most common
                method, using earthing, protective conductors, and overcurrent/RCD devices
              </li>
              <li>
                <strong>Additional protection:</strong> Supplementary measures such as 30 mA RCD
                protection and supplementary bonding — providing an additional safety net
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Other Fundamental Principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Protection against thermal effects (131.3):</strong> Persons, fixed
                equipment and materials adjacent to electrical equipment must be protected against
                harmful thermal effects (fire, burns, impairment of equipment safety function)
              </li>
              <li>
                <strong>Protection against overcurrent (131.4):</strong> Persons and property must
                be protected against injury or damage due to excessive currents from overloads or
                short circuits
              </li>
              <li>
                <strong>Protection against fault currents (131.5):</strong> Conductors (other than
                circuit conductors) and connections must be able to carry fault current without
                danger
              </li>
              <li>
                <strong>Isolation and switching (132):</strong> Effective means must be provided for
                isolation, switching off for mechanical maintenance, emergency switching, and
                functional switching
              </li>
              <li>
                <strong>Good workmanship and materials (134):</strong> Every installation must be
                designed and erected with good workmanship and proper materials
              </li>
              <li>
                <strong>Competent persons (134.1.1):</strong> Design, erection, verification and
                operation must be carried out by competent persons
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Amendment history and relevance to maintenance</ContentEyebrow>

          <ConceptBlock title="Amendment History and Relevance to Maintenance">
            <p>
              BS 7671 is a living document that evolves to reflect new technology, updated safety
              research, and changes in installation practice. Understanding the amendment history
              helps you identify which requirements apply to installations of different ages and
              recognise when older installations may need upgrading.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Recent Edition and Amendment History">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Edition/Amendment
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">Year</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Key Changes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">17th Edition</td>
                    <td className="border border-white/10 px-3 py-2">2008</td>
                    <td className="border border-white/10 px-3 py-2">
                      Major restructure to CENELEC format; new chapter numbering
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">17th Ed. Amd 1</td>
                    <td className="border border-white/10 px-3 py-2">2011</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cable calculations; metal consumer units (later introduced in Amd 3)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">17th Ed. Amd 3</td>
                    <td className="border border-white/10 px-3 py-2">2015</td>
                    <td className="border border-white/10 px-3 py-2">
                      Consumer unit enclosures; RCD protection for socket outlets; cable in walls
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">18th Edition</td>
                    <td className="border border-white/10 px-3 py-2">2018</td>
                    <td className="border border-white/10 px-3 py-2">
                      Arc fault detection; energy efficiency; prosumers; EV charging (Section 722)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">18th Ed. A2:2022</td>
                    <td className="border border-white/10 px-3 py-2">2022</td>
                    <td className="border border-white/10 px-3 py-2">
                      Onshore generating sets (Section 717); PME at caravans/marinas; wiring in
                      escape routes
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">18th Ed. A3:2024</td>
                    <td className="border border-white/10 px-3 py-2">2024</td>
                    <td className="border border-white/10 px-3 py-2">
                      Updated requirements for EV charging, PV systems, energy storage; prosumer
                      installations
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">18th Ed. A4:2026</td>
                    <td className="border border-white/10 px-3 py-2">2026</td>
                    <td className="border border-white/10 px-3 py-2">
                      Current edition. Revised Reg 411.3.3 (socket-outlets ≤ 32 A, with a documented
                      risk-assessment exception outside dwellings); new Chapter 57 for stationary
                      batteries; revised RCD verification
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Maintenance and Older Installations">
            <p>
              When you carry out maintenance or periodic inspection on an existing installation, you
              assess it against the edition of BS 7671 that applied when it was installed (or last
              significantly altered). However, the EAWR 1989 require that the system is maintained
              to prevent danger — if an older installation has features that are now known to be
              unsafe (e.g., no RCD protection on socket circuits in a domestic premises), this
              should be reported as a departure that may need remediation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Alterations and Additions">
            <p>
              Any alteration or addition to an existing installation must comply with the current
              edition of BS 7671. The existing installation need not be upgraded, but the new work
              must not make the existing installation less safe. Regulation 132.16 requires you to
              verify that the existing installation can safely support the proposed alteration —
              including confirming adequate earthing, protective conductor integrity, and fault
              level capability.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Appendices">
            <p>BS 7671 includes several appendices that provide essential reference data:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Appendix 1:</strong> British Standards for electrical installations
              </li>
              <li>
                <strong>Appendix 2:</strong> Statutory regulations and associated memoranda
              </li>
              <li>
                <strong>Appendix 3:</strong> Time/current characteristics of protective devices and
                cables
              </li>
              <li>
                <strong>Appendix 4:</strong> Current-carrying capacity and voltage drop tables
              </li>
              <li>
                <strong>Appendix 5:</strong> Classification of external influences
              </li>
              <li>
                <strong>Appendix 6:</strong> Model forms for certification and reporting (EIC,
                MEIWC, EICR)
              </li>
              <li>
                <strong>Appendix 15:</strong> Ring and radial final circuit arrangements
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Relevance to your ST1426 assessment">
            <p>
              <em>
                You are expected to understand the structure and purpose of BS 7671, and how it
                relates to your maintenance work. You do not need to memorise every regulation
                number, but you should be able to navigate the standard, identify which part
                addresses a particular requirement, and understand how it connects to the legal
                framework of the EAWR 1989.
              </em>
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Part 1 — Scope and fundamental principles',
              'Part 2 — Definitions',
              'Part 3 — Assessment of general characteristics',
              'Part 4 — Protection for safety',
              'Part 5 — Selection and erection of equipment',
              'Part 6 — Inspection and testing',
              'Part 7 — Special installations or locations',
              'Non-statutory British Standard (not law)',
              'Published by BSI and IET',
              'Current: 18th Edition + A4:2026',
              'Based on CENELEC HD 60364 series',
              'Scope: up to 1000 V AC / 1500 V DC',
              'Certification: EIC, MEIWC, EICR (Appendix 6)',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section4-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Electricity at Work Regulations 1989
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section4-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">PUWER 1998</div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section4_3;
