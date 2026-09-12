/**
 * MOET · Module 6 · Section 3 · Subsection 3 — Digital vs Paper-Based Reporting
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered: no verified ST1426 KSB statement list for Module 6 was
 * available at conversion time (Modules 1–4 have verified lists; Module 6
 * does not). Rather than invent statements or borrow another module's list,
 * this header omits specific KSB quotes. Flagged for follow-up once a
 * verified Module 6 KSB list exists.
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

const TITLE = 'Digital vs Paper-Based Reporting - MOET Module 6 Section 3.3';
const DESCRIPTION =
  'Comparison of digital and paper-based maintenance reporting systems, advantages and limitations, mobile CMMS applications, hybrid approaches and data security for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'digital-advantage',
    question: 'What is the primary advantage of digital reporting over paper-based systems?',
    options: [
      'It removes the need to record maintenance activities at all',
      'It guarantees that equipment will never fail unexpectedly',
      'It is always cheaper to set up than a paper filing system',
      'Real-time data access, searchability and automated trend analysis across the entire asset base',
    ],
    correctIndex: 3,
    explanation:
      'Digital reporting provides real-time data access from any location, powerful search and filter capabilities, and automated trend analysis. This enables faster decision-making, better resource planning, and proactive maintenance strategies.',
  },
  {
    id: 'paper-advantage',
    question: 'In which situation might paper-based reporting be preferred?',
    options: [
      'When the maintenance team is large and geographically spread out',
      'In ATEX hazardous zones where electronic devices are prohibited, or where network connectivity is unreliable',
      'When managers need real-time dashboards of maintenance KPIs',
      'When the organisation wants to trend drift data automatically',
    ],
    correctIndex: 1,
    explanation:
      'Paper-based reporting may be preferred or required in hazardous environments where electronic devices are prohibited (e.g., ATEX Zone 0), in locations with no network coverage, or as a backup when digital systems are unavailable.',
  },
  {
    id: 'hybrid-approach',
    question: 'A hybrid reporting approach means:',
    options: [
      'Printing all digital reports onto paper for filing',
      'Having two separate CMMS systems running in parallel',
      'Combining digital and paper methods strategically to suit different operational contexts',
      'Using only paper in the morning and digital in the afternoon',
    ],
    correctIndex: 2,
    explanation:
      'A hybrid approach combines digital and paper methods strategically. For example, using mobile CMMS in most areas but paper PTW forms in ATEX zones, then scanning and uploading to the CMMS. All data ultimately feeds into a single asset history.',
  },
  {
    id: 'digital-single-source',
    question: "The concept of a 'single source of truth' in maintenance data means:",
    options: [
      'All maintenance data is consolidated into one authoritative system, eliminating conflicting records across spreadsheets, paper files and personal notebooks',
      'Only one technician is permitted to enter records into the system',
      'Every report must be approved by a single senior manager',
      'All historic paper records are destroyed once digitised',
    ],
    correctIndex: 0,
    explanation:
      'A single source of truth means all maintenance data — regardless of how it was initially captured (mobile device, paper form, sensor) — is consolidated into one authoritative system (typically the CMMS). This eliminates the confusion and risk that arises when different team members hold different versions of the same information in personal notebooks, spreadsheets, and filing cabinets.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A key advantage of CMMS-based digital reporting is:',
    options: [
      'It eliminates the need for maintenance records',
      'Automated work order generation, real-time dashboards and KPI tracking',
      'It guarantees 100% equipment reliability',
      'It replaces the need for competent technicians',
    ],
    correctAnswer: 1,
    explanation:
      'CMMS-based digital reporting enables automated work order generation from condition triggers, real-time dashboards showing maintenance status, and KPI tracking for metrics like MTBF, MTTR and schedule compliance.',
  },
  {
    id: 2,
    question: 'A disadvantage of paper-based maintenance reporting is:',
    options: [
      'It cannot be used in ATEX hazardous zones where ignition sources are prohibited',
      'It requires a charged device and reliable network connectivity to complete a record',
      'Difficulty in searching records, risk of loss or damage, and inability to perform automated trend analysis',
      'It always costs more to set up initially than an equivalent digital system',
    ],
    correctAnswer: 2,
    explanation:
      "Paper-based records are difficult to search, vulnerable to physical damage or loss, and cannot be automatically analysed for trends. Retrieving a specific asset's maintenance history from years of paper files is time-consuming.",
  },
  {
    id: 3,
    question: 'Mobile CMMS applications are particularly useful because:',
    options: [
      'They remove the need for any central server or database to store records',
      'They guarantee that data is captured even when the device has no battery charge',
      'They replace the need for technicians to physically attend the equipment',
      'They allow real-time data entry at the point of work with access to asset history and technical documents',
    ],
    correctAnswer: 3,
    explanation:
      'Mobile CMMS apps allow technicians to update work orders in real time at the point of work, view asset history and technical documents on site, capture photographs, and scan barcodes for asset identification.',
  },
  {
    id: 4,
    question: 'When transitioning from paper to digital, the biggest challenge is typically:',
    options: [
      'Change management — ensuring all staff adopt the new system consistently and correctly',
      'The cost of the mobile devices needed for every technician on the team',
      'Finding a CMMS that can store more records than the old paper filing system',
      'Persuading the equipment manufacturers to supply data in digital format',
    ],
    correctAnswer: 0,
    explanation:
      'Change management is the biggest challenge. Some technicians may resist new technology, training is needed for all users, and consistent adoption is essential. A phased rollout with adequate training is more successful than an abrupt switchover.',
  },
  {
    id: 5,
    question: 'Barcode and QR code scanning in maintenance is used to:',
    options: [
      'Encrypt the maintenance record so that only authorised users can open it',
      'Quickly and accurately identify assets, reducing transcription errors and linking to CMMS records',
      'Measure the operating parameters of the equipment automatically during inspection',
      'Generate a printed certificate confirming the asset has passed its inspection',
    ],
    correctAnswer: 1,
    explanation:
      'Barcode and QR code scanning enables rapid, accurate asset identification by linking the physical equipment tag to the CMMS database record. This eliminates transcription errors and speeds up data entry.',
  },
  {
    id: 6,
    question: 'Digital photographs in fault reports are valuable because:',
    options: [
      'They replace the need to write any description of the fault in the report',
      'They automatically measure the temperature of the equipment in the image',
      'They provide visual evidence, support remote diagnosis and enhance the written record',
      'They guarantee the fault report cannot later be edited or tampered with',
    ],
    correctAnswer: 2,
    explanation:
      'Digital photographs supplement the written fault description with visual evidence showing equipment condition, damage, and state before and after repair. They are invaluable for remote diagnosis, training and insurance claims.',
  },
  {
    id: 7,
    question: 'Data security for digital maintenance records includes:',
    options: [
      'Printing every digital record onto paper as the primary security measure',
      'Sharing a single login between the whole team so records are always accessible',
      "Storing all records on one technician's personal device for safekeeping",
      'Access controls, regular backups, audit trails and compliance with data protection regulations',
    ],
    correctAnswer: 3,
    explanation:
      'Digital records require proper access controls (role-based permissions), regular backups (ideally automated and off-site), audit trails showing who created or modified records, and compliance with GDPR where personal data is involved.',
  },
  {
    id: 8,
    question: 'Cloud-based CMMS platforms offer which advantage over on-premise systems?',
    options: [
      'Accessibility from any device with internet, automatic updates and reduced IT infrastructure costs',
      'They continue to function fully even when the site has no internet connection',
      'They remove the need for any data backups because nothing is stored locally',
      'They are always cheaper than on-premise systems over the entire system lifetime',
    ],
    correctAnswer: 0,
    explanation:
      'Cloud-based CMMS platforms can be accessed from any device with internet connectivity, receive automatic software updates, and reduce the need for on-site server infrastructure.',
  },
  {
    id: 9,
    question: 'When using a tablet to record maintenance data on site, you should:',
    options: [
      'Wait until you return to the office to enter the readings from memory',
      'Enter data accurately at the point of work, verify readings before submitting, and use offline mode if needed',
      'Round all measured values to make the records quicker to complete',
      'Record data only when a network connection is available, skipping work otherwise',
    ],
    correctAnswer: 1,
    explanation:
      'Data should be entered accurately at the point of work where observations are fresh. Readings should be verified before submission. If connectivity is poor, use offline mode and sync when connectivity returns.',
  },
  {
    id: 10,
    question: "The term 'single source of truth' in maintenance data means:",
    options: [
      'Only one technician is permitted to enter records into the system',
      'Every maintenance record must be approved by a single senior manager',
      'All maintenance data is consolidated into one authoritative system, eliminating conflicting records',
      'All historic paper records are destroyed as soon as they are digitised',
    ],
    correctAnswer: 2,
    explanation:
      "A 'single source of truth' means all maintenance data — regardless of how initially captured — is consolidated into one authoritative system (typically the CMMS). This eliminates conflicting information across spreadsheets, paper files and personal notebooks.",
  },
  {
    id: 11,
    question: 'Digital maintenance dashboards are most useful for:',
    options: [
      'Capturing photographs of equipment faults at the point of work',
      'Encrypting maintenance records to comply with data protection law',
      'Identifying assets accurately by scanning their barcode or QR tag',
      'Providing real-time visibility of maintenance KPIs, outstanding work orders and asset condition',
    ],
    correctAnswer: 3,
    explanation:
      'Dashboards provide real-time visibility of KPIs (schedule compliance, backlog, MTBF/MTTR), outstanding work order status, and asset condition summaries. This supports informed decision-making and resource allocation.',
  },
  {
    id: 12,
    question: 'Under ST1426, a maintenance technician should be able to:',
    options: [
      'Use both digital and paper-based recording methods competently, selecting the appropriate method for context',
      'Use only the digital CMMS, as paper records are no longer permitted under the standard',
      'Develop and write the maintenance management software used on site',
      "Use only paper records, since digital systems fall outside the technician's role",
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 expects technicians to be competent with both digital and paper-based recording methods and to select the most appropriate method based on operational context.',
  },
];

const faqs = [
  {
    question: 'Is paper-based reporting still acceptable in modern maintenance?',
    answer:
      'Yes, paper-based reporting remains acceptable and is sometimes required — for example, in ATEX hazardous areas or for statutory forms requiring wet signatures. However, best practice is to digitise paper records as soon as practicable so they are incorporated into the central maintenance management system.',
  },
  {
    question: 'What happens to our data if the CMMS vendor goes out of business?',
    answer:
      "Your data should be exportable in standard formats (CSV, PDF, database exports). Reputable vendors provide data portability clauses in contracts. Regular backups should be maintained independently of the vendor's systems. Cloud-based platforms typically offer data export tools as standard.",
  },
  {
    question: 'How do we maintain data quality in a digital system?',
    answer:
      "Data quality is maintained through mandatory fields, dropdown selections, validation rules, regular audits, user training, and a culture that values accurate recording. A CMMS is only as good as the data entered — the principle of 'garbage in, garbage out' applies.",
  },
  {
    question: 'Can I use my personal phone for mobile CMMS data entry?',
    answer:
      "This depends on your employer's IT and data security policies. Some organisations allow Bring Your Own Device (BYOD) with appropriate security measures. Others require company-issued devices. Always check your employer's policy before using personal devices for work data.",
  },
  {
    question: 'What are the GDPR implications of digital maintenance records?',
    answer:
      "If records contain personal data (technician names, signatures, photographs), GDPR applies. Organisations must have a lawful basis for processing, ensure appropriate security, define retention periods, and respond to data subject access requests. Maintenance records are usually justified under 'legitimate interests' but should be managed in line with your organisation's data protection policy.",
  },
];

const MOETModule6Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.3 · Subsection 3"
        title="Digital vs Paper-Based Reporting"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Comparing reporting methods, implementation strategies and hybrid approaches
          </p>

          <TLDR
            points={[
              'Digital: Real-time access, searchable, automated analytics',
              'Paper: No power/network needed, ATEX compliant, familiar',
              'Hybrid: Best of both — context-appropriate method selection',
              'Goal: Single source of truth for all asset data',
              'Mobile CMMS: Data entry at the point of work',
              'QR/barcode: Accurate asset identification on site',
              'Photo evidence: Visual fault documentation',
              'ST1426: Competence with both methods required',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Compare advantages and limitations of digital and paper-based reporting',
              'Identify when each method is most appropriate in electrical maintenance',
              'Describe features and benefits of mobile CMMS applications',
              'Explain hybrid reporting strategies for different contexts',
              'Understand data security and quality considerations for digital systems',
              'Apply ST1426 requirements for using both digital and paper methods',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Digital Reporting Systems</ContentEyebrow>

          <ConceptBlock title="Digital Reporting Systems">
            <p>
              Digital reporting has transformed maintenance management. Modern CMMS platforms
              provide mobile applications, real-time dashboards, automated work order generation,
              and powerful analytics that paper-based systems cannot match. For electrical
              maintenance, digital systems enable rapid access to asset history, circuit diagrams
              and previous fault records at the point of work — information that can be the
              difference between a quick diagnosis and hours of troubleshooting.
            </p>
            <p>
              The shift to digital is not merely about convenience. It fundamentally changes the way
              maintenance data is used. Paper records are passive — they sit in filing cabinets
              until someone physically retrieves them. Digital records are active — they can trigger
              automatic alerts when parameters exceed thresholds, generate trend graphs that reveal
              deterioration patterns, and produce KPI reports that demonstrate maintenance programme
              effectiveness. This transition from passive storage to active intelligence is the core
              advantage of digital reporting.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key Benefits of Digital Reporting">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Real-time visibility:</strong> Managers see maintenance status instantly —
                no waiting for paper reports
              </li>
              <li>
                <strong>Searchability:</strong> Find any record across the entire asset base in
                seconds
              </li>
              <li>
                <strong>Automated triggers:</strong> Condition-based alerts and auto-generated work
                orders
              </li>
              <li>
                <strong>Trend analysis:</strong> Automatic KPI calculation and deterioration
                tracking
              </li>
              <li>
                <strong>Integration:</strong> Links to procurement, stores, finance and BMS systems
              </li>
              <li>
                <strong>Consistency:</strong> Mandatory fields and dropdown selections enforce data
                standards
              </li>
              <li>
                <strong>Remote access:</strong> View and update records from any location
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Mobile CMMS Features for Technicians">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Receive and accept work orders on your mobile device</li>
              <li>View asset history, drawings and manuals at the point of work</li>
              <li>Scan barcodes/QR codes for instant asset identification</li>
              <li>Capture photographs and attach them to work orders</li>
              <li>Record test measurements directly into digital forms</li>
              <li>Offline mode — work without connectivity, sync when reconnected</li>
              <li>Digital signatures for sign-off procedures</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Digital Does Not Mean Perfect">
            <p>
              Digital systems bring their own challenges: dependency on network connectivity,
              battery life limitations on mobile devices, software bugs and updates, the risk of
              data loss from server failures, and the ongoing costs of licences and subscriptions. A
              digital system is only as good as its implementation, configuration, and the
              discipline of its users. Technology alone does not improve maintenance — it is a tool
              that enables improvement when properly used.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Paper-Based Reporting</ContentEyebrow>

          <ConceptBlock title="Paper-Based Reporting">
            <p>
              Despite the rise of digital systems, paper-based reporting retains a legitimate role
              in maintenance. Understanding its strengths and limitations ensures you can work
              effectively with both methods and select the most appropriate approach for each
              situation. Paper reporting is not inherently inferior — in certain contexts, it is the
              better or only viable option.
            </p>
            <p>
              Paper records have served the maintenance industry for decades and, when properly
              maintained, provide legally valid documentation of maintenance activities. The key
              challenge with paper is not the recording itself but the subsequent management of the
              information: storing, retrieving, analysing, and sharing paper records is inherently
              slower and more labour-intensive than working with digital data.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Digital vs Paper — Side by Side">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13.5px] text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Digital</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Paper</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Accessibility</td>
                    <td className="border border-white/10 px-3 py-2">
                      Any device, any location with connectivity
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Physical access to file required
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Searchability</td>
                    <td className="border border-white/10 px-3 py-2">
                      Instant search across all records
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Manual search — time consuming
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Durability</td>
                    <td className="border border-white/10 px-3 py-2">
                      Requires backups, server maintenance
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Vulnerable to fire, water, loss
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Hazardous areas
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      ATEX-rated devices required
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      No restrictions — no ignition risk
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Power dependency
                    </td>
                    <td className="border border-white/10 px-3 py-2">Requires charged device</td>
                    <td className="border border-white/10 px-3 py-2">None — always available</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Analysis</td>
                    <td className="border border-white/10 px-3 py-2">
                      Automated trends, KPIs, dashboards
                    </td>
                    <td className="border border-white/10 px-3 py-2">Manual analysis only</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Cost</td>
                    <td className="border border-white/10 px-3 py-2">
                      Higher initial, lower ongoing per record
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Lower initial, higher ongoing (storage, retrieval)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="When Paper Remains Appropriate">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ATEX Zone 0 and Zone 1:</strong> Electronic devices are prohibited unless
                specifically ATEX certified — paper is the only option
              </li>
              <li>
                <strong>No network coverage:</strong> Remote sites, deep basements, or shielded
                areas where mobile devices cannot connect
              </li>
              <li>
                <strong>Statutory requirements:</strong> Some regulatory forms still require wet
                signatures (though this is decreasing)
              </li>
              <li>
                <strong>Emergency backup:</strong> Paper forms should always be available as a
                contingency when digital systems fail
              </li>
              <li>
                <strong>Switchroom logbooks:</strong> Immediate access without needing to log in to
                a device
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Hybrid Approaches and Transition Strategies</ContentEyebrow>

          <ConceptBlock title="Hybrid Approaches and Transition Strategies">
            <p>
              Most organisations use a hybrid approach — combining digital and paper methods to suit
              different operational contexts. The key is ensuring all data ultimately feeds into a
              single, authoritative record system. A well-designed hybrid approach captures the
              benefits of digital systems while accommodating the practical realities of situations
              where paper remains necessary or more appropriate.
            </p>
            <p>
              The transition from a predominantly paper-based system to a predominantly digital one
              is a significant organisational change that requires careful planning, adequate
              resourcing, and sustained commitment. Organisations that attempt to switch overnight,
              without proper training and change management, typically experience poor adoption,
              data quality problems, and frustration from both technicians and managers.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common Hybrid Scenarios">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Mobile CMMS for routine work orders; paper PTW forms in hazardous areas</li>
              <li>Digital data entry at the point of work; printed reports for client handover</li>
              <li>
                Paper logbooks in switchrooms (immediate access); scanned and uploaded to CMMS daily
              </li>
              <li>
                Digital planned maintenance; paper emergency breakdown notes (transferred later)
              </li>
              <li>
                Digital certificates for competent person scheme submission; paper copies for site
                files
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Transition Best Practices">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Phased rollout:</strong> Start with one team or one site, learn from the
                experience, then expand
              </li>
              <li>
                <strong>Adequate training:</strong> Every user needs hands-on training, not just a
                manual
              </li>
              <li>
                <strong>Champion users:</strong> Identify enthusiastic early adopters who can
                support colleagues
              </li>
              <li>
                <strong>Data migration:</strong> Decide what historical paper records to digitise —
                prioritise active assets
              </li>
              <li>
                <strong>Feedback loop:</strong> Gather user feedback and refine the system
                configuration
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Transition Pitfalls to Avoid">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Running parallel systems without a clear migration plan</li>
              <li>Inconsistent adoption — some technicians using digital, others still on paper</li>
              <li>Insufficient training leading to poor data quality</li>
              <li>Losing historical paper records during transition — always digitise first</li>
              <li>
                Over-engineering the digital system — start simple and add complexity gradually
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key Point">
            <p>
              <strong>Key point:</strong> The reporting method is a tool — what matters most is the
              quality, accuracy and completeness of the information recorded. A well-completed paper
              form is infinitely more valuable than a poorly completed digital record.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Data Security, Quality and Compliance</ContentEyebrow>

          <ConceptBlock title="Data Security, Quality and Compliance">
            <p>
              Digital maintenance records carry responsibilities for data security, quality
              assurance, and regulatory compliance. As a technician, you play a key role in
              maintaining data integrity — every record you create, modify, or access is part of a
              system that must be trustworthy, secure, and auditable. Understanding these
              responsibilities is essential for professional practice under ST1426.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Data Security Essentials">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Use strong, unique passwords for CMMS access</li>
              <li>Never share login credentials with colleagues</li>
              <li>Log out of shared devices after use</li>
              <li>Report suspected data breaches immediately</li>
              <li>Follow your organisation's acceptable use policy</li>
              <li>Be careful with sensitive data on personal devices</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Data Quality Principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Enter data promptly — ideally at the point of work</li>
              <li>Verify values before submitting</li>
              <li>Use standard terminology and correct asset identifiers</li>
              <li>Complete all mandatory fields without shortcuts</li>
              <li>If unsure about a field, ask — do not guess</li>
              <li>Record actual values, not rounded estimates</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Regulatory Compliance Considerations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>GDPR:</strong> If records contain personal data (names, signatures, photos),
                data protection requirements apply
              </li>
              <li>
                <strong>EAWR 1989:</strong> Digital records are valid evidence of compliance,
                provided they are secure and auditable
              </li>
              <li>
                <strong>Electronic signatures:</strong> Legally valid under the Electronic
                Communications Act 2000 and eIDAS Regulation
              </li>
              <li>
                <strong>Retention periods:</strong> Digital records must be retained for the same
                periods as paper equivalents
              </li>
              <li>
                <strong>Backup requirements:</strong> Regular automated backups with off-site
                storage to prevent data loss
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ST1426 Link">
            <p>
              <strong>ST1426 link:</strong> The standard requires maintenance technicians to use
              information technology appropriately. This includes competent CMMS use, data security
              understanding, and accurate digital records. Demonstrating these skills is assessed in
              the EPA professional discussion.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>The Future of Maintenance Reporting</ContentEyebrow>

          <ConceptBlock title="The Future of Maintenance Reporting">
            <p>
              Maintenance reporting continues to evolve with technology. Understanding emerging
              trends helps you prepare for the direction the industry is moving and positions you as
              a forward-thinking technician who can adapt to new methods and tools.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Emerging Trends">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>IoT and automated data collection:</strong> Sensors automatically feed data
                into the CMMS, reducing manual entry and enabling real-time monitoring
              </li>
              <li>
                <strong>Artificial intelligence:</strong> Machine learning algorithms analyse trend
                data to predict failures more accurately than manual review
              </li>
              <li>
                <strong>Augmented reality:</strong> AR overlays on mobile devices show asset data,
                procedures, and diagrams while looking at the equipment
              </li>
              <li>
                <strong>Digital twins:</strong> Virtual replicas of physical assets enable
                simulation and predictive analysis
              </li>
              <li>
                <strong>Voice-to-text:</strong> Hands-free data entry using voice recognition,
                particularly useful when working in constrained spaces
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Important">
            <p className="italic">
              <strong>Important:</strong> Regardless of how reporting technology evolves, the
              fundamental principles remain unchanged: data must be accurate, complete, timely, and
              secure. The technician who masters these principles will adapt easily to any reporting
              system — paper, digital, or whatever comes next.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Digital advantage: Real-time access and dashboards',
              'Digital advantage: Instant search across all records',
              'Digital advantage: Automated trend analysis and KPIs',
              'Digital advantage: Integration with business systems',
              'Digital advantage: Mobile access at the point of work',
              'Paper advantage: No power or connectivity required',
              'Paper advantage: ATEX zone compliant',
              'Paper advantage: Familiar and intuitive',
              'Paper advantage: No software training needed',
              'Paper advantage: Backup when digital systems are down',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section3-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Fault Reports and Corrective Actions
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section3-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Traceability and Compliance Requirements
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section3_3;
