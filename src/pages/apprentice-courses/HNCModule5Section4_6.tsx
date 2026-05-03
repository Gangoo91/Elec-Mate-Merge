/**
 * Module 5 · Section 4 · Subsection 6 — Defects and Snagging
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Identifying, tracking and resolving defects through snagging, de-snagging and the defects liability period — the discipline that protects the handover and the retention.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Defects and Snagging - HNC Module 5 Section 4.6';
const DESCRIPTION =
  'Master defect identification and snagging procedures for building services: walkthrough protocols, defect categorisation (A/B/C), tracking systems, rectification management, and close-out documentation.';

const quickCheckQuestions = [
  {
    id: 'snagging-definition',
    question: 'What is the primary purpose of a snagging walkthrough?',
    options: [
      'To delay practical completion',
      'To identify incomplete or defective work before handover',
      'To increase the final account value',
      'To extend the construction programme',
    ],
    correctIndex: 1,
    explanation:
      "A snagging walkthrough systematically identifies incomplete, damaged, or defective work that must be rectified before the client takes possession. It protects both parties by documenting the installation's condition at handover.",
  },
  {
    id: 'category-a-defect',
    question: 'A Category A defect typically requires:',
    options: [
      'Rectification within 28 days',
      'Immediate attention before occupation',
      'Monitoring only',
      'Rectification during the defects liability period',
    ],
    correctIndex: 1,
    explanation:
      'Category A defects are critical issues affecting safety, security, or essential building function. They must be rectified before practical completion or occupation is permitted.',
  },
  {
    id: 'dlp-duration',
    question: 'What is the typical defects liability period for building services installations?',
    options: ['6 months', '12 months', '24 months', '36 months'],
    correctIndex: 1,
    explanation:
      'The standard defects liability period (also called rectification period) is 12 months from practical completion, allowing one full seasonal cycle to identify any latent defects.',
  },
  {
    id: 'snag-responsibility',
    question: 'Who typically leads the snagging walkthrough on a building services project?',
    options: [
      "The client's representative only",
      "The main contractor's site manager",
      "The M&E subcontractor's project manager",
      'A joint team including client, contractor, and M&E representatives',
    ],
    correctIndex: 3,
    explanation:
      'Snagging walkthroughs are most effective when conducted jointly, with representatives from the client, main contractor, and M&E subcontractor. This ensures all parties agree on defect identification and reduces disputes.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What distinguishes a defect from a variation in building services work?',
    options: [
      'Defects cost more to rectify',
      'Defects are work not complying with specification; variations are authorised changes',
      'Variations are discovered after handover',
      'Defects are always safety-related',
    ],
    correctAnswer: 1,
    explanation:
      "A defect is work that fails to meet the contract specification or quality standards. A variation is an authorised change to the original scope. Defects are rectified at the contractor's cost; variations may incur additional charges.",
  },
  {
    id: 2,
    question: 'Which category would a non-functioning emergency lighting fitting be classified as?',
    options: [
      'Category A - Critical',
      'Category B - Major',
      'Category C - Minor',
      'Not classified as a defect',
    ],
    correctAnswer: 0,
    explanation:
      'Non-functioning emergency lighting is a Category A (Critical) defect as it directly affects life safety. It must be rectified immediately before the building can be occupied.',
  },
  {
    id: 3,
    question: 'A snagging list should include all of the following EXCEPT:',
    options: [
      'Unique reference number for each item',
      'Precise location of defect',
      'Estimated rectification cost',
      'Clear description of the defect',
    ],
    correctAnswer: 2,
    explanation:
      "Snagging lists document defect reference, location, description, category, responsible party, and target rectification date. Costing is not typically included as defects are rectified at the contractor's cost.",
  },
  {
    id: 4,
    question:
      'What percentage of defects typically originate from design issues rather than installation?',
    options: ['5-10%', '20-30%', '40-50%', '70-80%'],
    correctAnswer: 1,
    explanation:
      'Industry studies indicate approximately 20-30% of defects originate from design errors or omissions rather than poor workmanship. Robust design review processes help reduce this proportion.',
  },
  {
    id: 5,
    question: 'When should the first snagging walkthrough typically occur?',
    options: [
      'At practical completion',
      '2-4 weeks before anticipated practical completion',
      '6 months after handover',
      'Only when requested by the client',
    ],
    correctAnswer: 1,
    explanation:
      'Initial snagging should occur 2-4 weeks before anticipated practical completion, allowing time for rectification before handover. Leaving it until practical completion causes delays and disputes.',
  },
  {
    id: 6,
    question: 'Which software feature is most critical in a defect tracking system?',
    options: [
      '3D visualisation',
      'Unique defect numbering and audit trail',
      'Automatic cost calculation',
      'Social media integration',
    ],
    correctAnswer: 1,
    explanation:
      'Unique defect numbering ensures traceability, while a complete audit trail records all status changes, responsibilities, and communications. This provides essential evidence if disputes arise.',
  },
  {
    id: 7,
    question: 'A latent defect is one that:',
    options: [
      'Is immediately visible during snagging',
      'Is not discoverable through reasonable inspection at handover',
      'Only occurs in mechanical services',
      'Cannot be rectified',
    ],
    correctAnswer: 1,
    explanation:
      'Latent defects are hidden issues not discoverable through reasonable inspection at handover. They may only become apparent during operation, which is why defects liability periods exist.',
  },
  {
    id: 8,
    question: 'What document formally closes out a defect after rectification?',
    options: [
      'Variation order',
      'Snagging list',
      'Defect sign-off certificate or close-out report',
      'Practical completion certificate',
    ],
    correctAnswer: 2,
    explanation:
      'A defect sign-off certificate or close-out report formally confirms rectification is complete and accepted. It should be signed by the inspecting party and filed for audit purposes.',
  },
  {
    id: 9,
    question: 'During the defects liability period, the contractor must:',
    options: [
      'Remain on site full-time',
      'Return to rectify defects notified by the client at no additional cost',
      'Pay the client damages for any defects found',
      'Replace all installed equipment',
    ],
    correctAnswer: 1,
    explanation:
      'During the DLP, the contractor is obligated to return and rectify any defects notified by the client at no additional cost, provided the defects relate to original workmanship or materials, not misuse or wear.',
  },
  {
    id: 10,
    question: 'Which is the correct sequence for defect management?',
    options: [
      'Identify, Categorise, Assign, Track, Rectify, Verify, Close',
      'Rectify, Identify, Track, Close',
      'Assign, Categorise, Identify, Rectify',
      'Track, Identify, Categorise, Assign',
    ],
    correctAnswer: 0,
    explanation:
      'The systematic defect management process follows: Identify (find the defect), Categorise (A/B/C), Assign (allocate responsibility), Track (monitor progress), Rectify (complete work), Verify (inspect), Close (formal sign-off).',
  },
  {
    id: 11,
    question: 'Photographic evidence in snagging should include:',
    options: [
      'Only the defect itself',
      'The defect, its location context, and any reference markers',
      "The contractor's staff",
      'Equipment serial numbers only',
    ],
    correctAnswer: 1,
    explanation:
      'Effective photographic evidence includes the defect in detail, wider context showing its location, and reference markers (room numbers, drawings) to enable anyone to locate and verify the issue.',
  },
  {
    id: 12,
    question: 'What is the Making Good Defects Certificate?',
    options: [
      'A certificate issued at practical completion',
      'A certificate confirming all DLP defects have been satisfactorily rectified',
      'A warranty document from equipment manufacturers',
      'An insurance certificate',
    ],
    correctAnswer: 1,
    explanation:
      'The Making Good Defects Certificate (or Final Certificate under some contracts) confirms that all defects notified during the defects liability period have been satisfactorily rectified, triggering final payment release.',
  },
];

const faqs = [
  {
    question: 'What is the difference between snagging and defects liability?',
    answer:
      'Snagging is the process of identifying incomplete or defective work before or at practical completion. The defects liability period (typically 12 months) follows practical completion, during which the contractor must return to rectify any defects that emerge during normal operation. Snagging aims to achieve a clean handover; DLP catches issues that only become apparent over time.',
  },
  {
    question: 'Can the client withhold payment for snags?',
    answer:
      'Yes, under most standard contracts the client can retain a percentage (typically 2.5-5%) of the contract sum until defects are rectified. This retention provides leverage to ensure the contractor returns to complete snagging items. Half is typically released at practical completion, the remainder after the defects liability period.',
  },
  {
    question: 'How should I handle disputed snags?',
    answer:
      "Document thoroughly with photographs, specification references, and manufacturer's installation requirements. Refer to the contract specification and drawings as the benchmark. If agreement cannot be reached, most contracts provide for the Contract Administrator to make a binding determination. Avoid verbal agreements - always confirm disputed items in writing.",
  },
  {
    question: 'What happens if defects are not rectified within the agreed timeframe?',
    answer:
      'If the contractor fails to rectify defects within reasonable timeframes, the client can: (1) issue a formal notice requiring action, (2) employ others to carry out the work and recover costs from retention or final payment, (3) pursue contractual remedies including liquidated damages where applicable. Early escalation and clear communication usually resolve issues before these steps are needed.',
  },
  {
    question:
      "Should M&E subcontractors conduct their own snagging before the main contractor's inspection?",
    answer:
      'Absolutely. Pre-inspection snagging by the M&E subcontractor demonstrates professionalism, reduces the formal snag list length, and avoids embarrassment. Supervisors should walk their work weekly in the final weeks, progressively closing out issues before the formal inspection.',
  },
  {
    question: 'How long should snagging records be retained?',
    answer:
      'Snagging and defect records should be retained for at least 12 years (the limitation period for contracts under seal) or 6 years (simple contracts). Many organisations retain them longer for latent defect claims. Digital systems make long-term storage practical and support Building Safety Act compliance.',
  },
];

const HNCModule5Section4_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 6"
            title="Defects and Snagging"
            description="Defect identification, snagging procedures, tracking systems, rectification management and close-out documentation."
            tone="purple"
          />

          <TLDR
            points={[
              "Snagging = identifying defects against specification, standard and visual quality. Conducted progressively, not just at handover.",
              "Snag list categorised: critical (safety/function), major (specification deviation), minor (visual/cosmetic) — different rectification timelines.",
              "Tracking system: snag ID, location, description, photograph, responsible party, target date, status, sign-off — typically a digital tool.",
              "De-snagging follows snagging — every snag rectified, re-inspected, signed off — no snag closed without verification.",
              "Defects Liability Period (DLP) typically 12 months from PC; latent defects discovered during DLP are rectified at contractor cost.",
            ]}
          />

          <RegsCallout
            source="JCT Standard Building Contract 2024 — Clause 2.38 (Defects, shrinkages or other faults)"
            clause="Any defects, shrinkages or other faults in the Works which appear within the Rectification Period and which are due to materials, goods or workmanship not in accordance with the Contract or to frost occurring before Practical Completion, shall be specified by the Architect/Contract Administrator in a Schedule of Defects which the Architect/Contract Administrator shall deliver to the Contractor not later than 14 days after the expiration of the Rectification Period. The Contractor shall make good such defects, shrinkages or other faults at no cost to the Employer."
            meaning={
              <>
                The Rectification Period (commonly 12 months) is the contractor's opportunity to make good defects without cost dispute. After the Schedule of Defects is issued, the contractor must rectify within a reasonable period. Failure to rectify entitles the client to engage others and deduct from retention. Manage the DLP actively — not as an afterthought.
              </>
            }
            cite="Source: JCT Standard Building Contract 2024 (refer to JCT published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Plan and conduct effective snagging walkthroughs',
              'Categorise defects using industry-standard A/B/C classification',
              'Implement defect tracking systems and software',
              'Manage rectification timeframes and responsibilities',
              'Complete formal close-out documentation',
              'Understand defects liability period obligations',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Snagging Walkthrough Procedures">
            <p>
              Snagging is the systematic process of identifying work that is incomplete, damaged, or
              does not comply with the contract specification. Effective snagging protects all
              parties by creating a clear record of the installation's condition at handover.
            </p>
            <p>
              <strong>Walkthrough timing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-snagging (internal):</strong> 4-6 weeks before PC - contractor's own QA
                inspection
              </li>
              <li>
                <strong>Initial snagging:</strong> 2-4 weeks before PC - joint walkthrough with
                client
              </li>
              <li>
                <strong>Pre-completion snagging:</strong> 1 week before PC - verify rectification
              </li>
              <li>
                <strong>Practical completion:</strong> Final inspection and handover
              </li>
            </ul>
            <p>
              <strong>Walkthrough protocol:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Preparation:</strong> Review drawings, specifications, O&M requirements —
                M&E supervisor, QA manager
              </li>
              <li>
                <strong>Walkthrough:</strong> Systematic inspection room-by-room or system-by-system
                — Client, contractor, M&E subcontractor
              </li>
              <li>
                <strong>Recording:</strong> Document defects with photos, location, description —
                Designated recorder (tablet/app)
              </li>
              <li>
                <strong>Review:</strong> Agree categorisation, responsibilities, timeframes — All
                parties together
              </li>
              <li>
                <strong>Distribution:</strong> Issue formal snagging list within 24-48 hours — QA
                manager or contract administrator
              </li>
            </ul>
            <p>
              <strong>Building services inspection checklist — electrical:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Distribution board labelling complete</li>
              <li>Circuit identification schedules fitted</li>
              <li>Test certificates available</li>
              <li>Containment lids and covers in place</li>
              <li>Fire stopping around penetrations</li>
              <li>Emergency lighting functional</li>
            </ul>
            <p>
              <strong>Building services inspection checklist — mechanical:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Valves labelled and accessible</li>
              <li>Insulation complete and tagged</li>
              <li>Brackets and supports painted</li>
              <li>Commissioning values achieved</li>
              <li>Grilles and diffusers clean</li>
              <li>Access panels identified</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Conduct walkthroughs in consistent lighting
              conditions. Bring a torch for ceiling voids and risers.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Defect Categorisation (A/B/C)">
            <p>
              Categorising defects ensures critical issues are addressed first and resources are
              allocated appropriately. The A/B/C system is widely used across the UK construction
              industry.
            </p>
            <p>
              <strong>Category A — Critical:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Affects safety or security</li>
              <li>Prevents building operation</li>
              <li>Must rectify before occupation</li>
              <li>Timeframe: Immediate</li>
              <li>Example: Non-functional emergency lighting, exposed live conductors</li>
            </ul>
            <p>
              <strong>Category B — Major:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Affects function or quality</li>
              <li>Does not prevent occupation</li>
              <li>Should rectify promptly</li>
              <li>Timeframe: Within 14 days</li>
              <li>Example: BMS point not commissioned, incorrect valve setting</li>
            </ul>
            <p>
              <strong>Category C — Minor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cosmetic or minor incomplete</li>
              <li>Does not affect function</li>
              <li>Rectify within DLP</li>
              <li>Timeframe: Within 28 days</li>
              <li>Example: Missing cable label, minor paintwork damage</li>
            </ul>
            <p>
              <strong>Building services defect examples by category:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical — Cat A:</strong> Fire alarm fault, RCD not tripping
              </li>
              <li>
                <strong>Electrical — Cat B:</strong> Missing test certs, incorrect glands
              </li>
              <li>
                <strong>Electrical — Cat C:</strong> Cable ties untrimmed, minor labelling
              </li>
              <li>
                <strong>Mechanical — Cat A:</strong> No heating/cooling, water leak
              </li>
              <li>
                <strong>Mechanical — Cat B:</strong> Flow rates incorrect, noise issues
              </li>
              <li>
                <strong>Mechanical — Cat C:</strong> Valve tag missing, insulation damage
              </li>
              <li>
                <strong>Fire Systems — Cat A:</strong> Detector not responding, damper stuck
              </li>
              <li>
                <strong>Fire Systems — Cat B:</strong> Cause and effect incomplete
              </li>
              <li>
                <strong>Fire Systems — Cat C:</strong> Device address label faded
              </li>
              <li>
                <strong>Controls/BMS — Cat A:</strong> Critical alarm not reporting
              </li>
              <li>
                <strong>Controls/BMS — Cat B:</strong> Setpoint incorrect, trend not logging
              </li>
              <li>
                <strong>Controls/BMS — Cat C:</strong> Graphic text error, icon colour wrong
              </li>
            </ul>
            <p>
              <strong>Note:</strong> Category boundaries should be agreed at project start. What is
              critical for a hospital may be minor for a warehouse.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Tracking Systems and Rectification Management">
            <p>
              Modern defect tracking systems replace paper-based snagging lists, providing real-time
              visibility, automatic notifications, and comprehensive audit trails essential for
              project close-out and potential dispute resolution.
            </p>
            <p>
              <strong>Snagstream features:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mobile app with offline capability</li>
              <li>Photo/video attachment</li>
              <li>Drawing mark-up</li>
              <li>Automatic contractor notifications</li>
            </ul>
            <p>
              <strong>Procore / Aconex / Viewpoint features:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Integrated project management</li>
              <li>Workflow automation</li>
              <li>Dashboard reporting</li>
              <li>Document linking (specs, drawings)</li>
            </ul>
            <p>
              <strong>Defect tracking workflow:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Open:</strong> Defect raised, awaiting assignment — Contract administrator
              </li>
              <li>
                <strong>Assigned:</strong> Allocated to responsible party — Main contractor /
                subcontractor
              </li>
              <li>
                <strong>In Progress:</strong> Rectification work underway — Subcontractor
              </li>
              <li>
                <strong>Ready for Inspection:</strong> Work complete, awaiting sign-off — Client /
                CA to inspect
              </li>
              <li>
                <strong>Closed:</strong> Verified and formally accepted — Contract administrator
              </li>
              <li>
                <strong>Rejected:</strong> Rectification not accepted, returns to Assigned —
                Subcontractor to redo
              </li>
            </ul>
            <p>
              <strong>Rectification timeframes (typical):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Category A:</strong> Immediate / before occupation (0-48 hours)
              </li>
              <li>
                <strong>Category B:</strong> Within 14 days of notification
              </li>
              <li>
                <strong>Category C:</strong> Within 28 days of notification
              </li>
              <li>
                <strong>DLP defects:</strong> Within 28 days unless complex
              </li>
            </ul>
            <p>
              <strong>Key performance indicators (KPIs):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Snag-free areas:</strong> Target &gt;80% at first inspection — Areas passed
                / areas inspected
              </li>
              <li>
                <strong>First-time fix rate:</strong> Target &gt;90% — Closed first attempt / total
                closed
              </li>
              <li>
                <strong>Average close-out time:</strong> Target &lt;7 days — Days from raised to
                closed
              </li>
              <li>
                <strong>Overdue defects:</strong> Target &lt;5% — Past target date / total open
              </li>
            </ul>
            <p>
              <strong>Project tip:</strong> Weekly defect status meetings with all parties keeps
              momentum. Display live dashboard statistics to drive accountability.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Close-out Documentation and Defects Liability Period">
            <p>
              Formal close-out documentation provides the audit trail confirming all defects have
              been addressed. The defects liability period extends the contractor's obligations
              beyond practical completion to catch latent issues that emerge during operation.
            </p>
            <p>
              <strong>Close-out documentation package:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Snagging register:</strong> Complete list with all items closed
              </li>
              <li>
                <strong>Defect sign-off certificates:</strong> Individual or batch sign-off
              </li>
              <li>
                <strong>Photographic evidence:</strong> Before and after rectification
              </li>
              <li>
                <strong>Re-test certificates:</strong> Where defects affected tested systems
              </li>
              <li>
                <strong>Updated O&M manuals:</strong> Reflecting any changes during rectification
              </li>
              <li>
                <strong>Close-out report:</strong> Summary of defect quantities, categories,
                resolution times
              </li>
            </ul>
            <p>
              <strong>Defects Liability Period (DLP):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard duration:</strong> 12 months from Practical Completion
              </li>
              <li>
                <strong>Extended DLP:</strong> Some clients specify 24 months for complex M&E
              </li>
              <li>
                <strong>Contractor obligation:</strong> Return to rectify defects notified during
                period
              </li>
              <li>
                <strong>Exclusions:</strong> Damage from misuse, fair wear and tear, third-party
                interference
              </li>
              <li>
                <strong>Retention release:</strong> Final retention released at end of DLP (Making
                Good certificate)
              </li>
            </ul>
            <p>
              <strong>DLP management process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DLP commencement (At PC):</strong> Confirm start date, contact details,
                reporting procedure
              </li>
              <li>
                <strong>Ongoing monitoring (throughout DLP):</strong> Client reports defects,
                contractor responds
              </li>
              <li>
                <strong>Seasonal commissioning (6 months post-PC):</strong> Verify heating/cooling
                in opposite season
              </li>
              <li>
                <strong>Pre-DLP expiry inspection (Month 11):</strong> Final joint inspection to
                identify outstanding issues
              </li>
              <li>
                <strong>Making Good certificate (End of DLP):</strong> CA confirms all defects
                rectified, triggers final retention release
              </li>
            </ul>
            <p>
              <strong>Latent defects and limitation periods:</strong> Beyond the DLP, contractors
              may still be liable for latent defects (hidden issues) under:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Contract (simple):</strong> 6 years from breach
              </li>
              <li>
                <strong>Contract (under seal/deed):</strong> 12 years from breach
              </li>
              <li>
                <strong>Negligence (tort):</strong> 6 years from damage becoming apparent
              </li>
              <li>
                <strong>Building Safety Act 2022:</strong> Extended liability for higher-risk
                buildings
              </li>
            </ul>
            <p>
              <strong>Record retention:</strong> Keep all defect records for at least 12 years for
              contracts under deed, longer for higher-risk buildings.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Defect categorisation:</strong> During snagging of a new office
              building, the following electrical issues are found. Categorise each.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Emergency exit sign not illuminated → Category A (Critical) - Safety system non-functional</li>
              <li>
                2. Distribution board schedule shows incorrect circuit descriptions → Category B
                (Major) - Affects operation/maintenance
              </li>
              <li>
                3. Cable tray lid missing in riser cupboard → Category C (Minor) - Does not affect
                function
              </li>
              <li>
                4. Final circuit test certificate not provided → Category B (Major) - Compliance
                documentation missing
              </li>
            </ul>
            <p>
              <strong>Example 2 — DLP timeline:</strong> Practical Completion achieved 15 March
              2024. When does the DLP expire and what are key milestones?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Practical Completion: 15 March 2024</li>
              <li>DLP Duration: 12 months (standard)</li>
              <li>Seasonal commissioning (summer): September 2024</li>
              <li>Pre-expiry inspection: February 2025 (Month 11)</li>
              <li>
                <strong>DLP expiry:</strong> 15 March 2025
              </li>
              <li>Making Good Certificate issued: March 2025</li>
              <li>Final retention released: March 2025</li>
            </ul>
            <p>
              <strong>Example 3 — Defect close-out:</strong> Defect #247 - BMS point for AHU-01
              supply fan showing incorrect status. Document the close-out.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Defect Reference:</strong> SNL-247
              </li>
              <li>
                <strong>Category:</strong> B (Major)
              </li>
              <li>
                <strong>Location:</strong> Rooftop plant, AHU-01
              </li>
              <li>
                <strong>Description:</strong> BMS graphic shows supply fan OFF when physically
                running
              </li>
              <li>
                <strong>Root cause:</strong> Digital input wired to NC contact instead of NO
              </li>
              <li>Controls engineer rewired DI to NO contact</li>
              <li>Tested fan start/stop sequence - status now correct</li>
              <li>BMS trend verified over 24 hours</li>
              <li>
                <strong>Evidence:</strong> Photos before/after, trend log extract
              </li>
              <li>
                <strong>Sign-off:</strong> Inspected by J. Smith (Client FM) - 12/03/2025
              </li>
              <li>
                <strong>Status:</strong> CLOSED
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Snagging walkthrough checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Bring current drawings, specifications, and O&M requirements</li>
              <li>Use tablet/smartphone with snagging app for efficiency</li>
              <li>Photograph every defect with location context</li>
              <li>Agree categorisation and responsibility on the spot where possible</li>
              <li>Issue formal list within 24-48 hours while memory is fresh</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Standard DLP: <strong>12 months</strong>
              </li>
              <li>
                Retention typically held: <strong>2.5-5%</strong>
              </li>
              <li>
                Category A rectification: <strong>Immediate</strong>
              </li>
              <li>
                Category B rectification: <strong>14 days</strong>
              </li>
              <li>
                Category C rectification: <strong>28 days</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Late snagging</strong> — Start too late, no time for rectification before
                  PC
                </li>
                <li>
                  <strong>Poor documentation</strong> — Vague descriptions make disputes likely
                </li>
                <li>
                  <strong>No photographs</strong> — Losing evidence if defect disputed
                </li>
                <li>
                  <strong>Verbal agreements</strong> — Always confirm in writing
                </li>
                <li>
                  <strong>Ignoring DLP obligations</strong> — Failing to respond damages reputation
                  and triggers retention withholding
                </li>
              </ul>
            }
            doInstead="Start snagging 4-6 weeks before PC, photograph every item with location context, agree A/B/C categorisation in writing, and stay responsive throughout the 12-month DLP to protect retention and reputation."
          />

          <SectionRule />

          <Scenario
            title="DLP defects unaddressed — retention released to third party"
            situation={
              <>
                You handed over a school MEP package six months ago. The school's facilities manager has logged 47 defects via email but you have not responded. At the 12-month inspection, the architect schedules the defects and gives you 14 days to rectify. You miss the deadline. The school engages a different MEP contractor; the cost is deducted from your retention plus 20% for client management. Net cost to you: £35k against £28k retention — a £7k loss to settle.
              </>
            }
            whatToDo={
              <>
                Treat DLP as a managed phase, not a passive period. Maintain a defects register from PC onwards. Respond to every defect notification within 5 working days — visit, assess, schedule rectification. Communicate with the FM regularly. At 11 months, conduct a pre-end-of-DLP inspection to find anything before the architect does. The end-of-DLP report is a closure event, not a surprise.
              </>
            }
            whyItMatters={
              <>
                Retention release is the project's bottom-line margin. DLP defects unaddressed eat retention faster than budget overruns. Active DLP management protects margin and reputation — a satisfied client at end-of-DLP is the foundation of repeat business.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Snagging = identifying defects against spec, standard and visual quality.",
              "Categorise: critical / major / minor — different rectification timelines.",
              "Digital snag tracking: ID, location, photo, party, target, status, sign-off.",
              "De-snagging: every snag rectified, re-inspected, signed off — no closure without verification.",
              "DLP typically 12 months from PC; defects rectified at contractor cost.",
              "JCT Clause 2.38 — Schedule of Defects delivered within 14 days of end of Rectification Period.",
              "Manage DLP actively: defects register, 5-day response, 11-month pre-inspection.",
              "Failure to rectify = client engages others, deducts from retention plus management fee.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Quality management
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Commissioning and handover
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section4_6;
