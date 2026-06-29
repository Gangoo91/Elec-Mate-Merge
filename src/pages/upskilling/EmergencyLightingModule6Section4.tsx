import { ArrowLeft, ChevronLeft, ChevronRight, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm6-s4-coredocs',
    question: 'Which set of documents must the responsible person be able to produce immediately on demand to a Fire and Rescue Service inspector under RRO 2005 Article 27?',
    options: [
      'The current insurance policy and schedule of cover for the premises.',
      'The core evidence package — fire risk assessment, design-and-installation record, commissioning certificate, logbook, photometric verification, EIC / EICR and evacuation plan.',
      'The approved Building Regulations plans and the building completion certificate.',
      'A verbal account of the test arrangements from the duty manager on site.',
    ],
    correctIndex: 1,
    explanation:
      'The RRO Article 27 power is broad — the inspector can demand any record reasonably required to verify compliance. The core evidence package is the minimum any RP should expect to produce on demand: fire risk assessment (Article 9), BS 5266-1:2025 design-and-installation record, commissioning certificate, BS EN 50172:2024 logbook (monthly functional + annual full-duration entries), 5-year photometric verification certificate, BS 7671 EIC or current EICR, evacuation plan and PEEPs, training records, and the BS 5839-1 cause-and-effect document where systems interact. Failure to produce, or incomplete / out-of-date records, does not just delay the audit — it itself evidences inadequate management. Obstruction is an offence under Article 32.',
  },
  {
    id: 'elm6-s4-art31',
    question: 'A Fire and Rescue Service inspector identifies that emergency lighting in the only escape stair from a basement nightclub has not worked for 3 months. Which notice is most likely?',
    options: [
      'No formal action, recorded as informal advice to the responsible person.',
      'A prohibition notice under RRO 2005 Article 31, prohibiting use until remedied.',
      'An Article 29 alterations notice requiring pre-approval of future modifications.',
      'An Article 30 enforcement notice giving at least 28 days to remediate.',
    ],
    correctIndex: 1,
    explanation:
      'Prohibition notices under Article 31 are reserved for imminent serious risk and bite immediately. Article 31 enables the FRS to prohibit or restrict use where the inspector is of the opinion of serious risk to relevant persons in case of fire. A basement nightclub with failed EL on the only escape route — high occupancy, low ambient light, single escape — is exactly the scenario the power was designed for. The premises must close until remediated; remediation must be verified; only then is the notice lifted. Article 29 is pre-modification; Article 30 is a non-imminent breach with a reasonable remediation period.',
  },
  {
    id: 'elm6-s4-retention',
    question: 'How long should emergency lighting records be retained under the RRO 2005 regime?',
    options: [
      '12 months, in line with the annual full-duration test cycle.',
      'At least 6 years as a baseline, with foundational records kept permanently.',
      '30 days, matching the gap between monthly functional tests.',
      '18 months, covering one full annual test plus a margin.',
    ],
    correctIndex: 1,
    explanation:
      'Six years is the practical baseline from civil and contractual limitation periods. There is no single statutory retention period in the RRO itself, but civil claims for fire injury run 3 years from injury / 6 years from contract, and Article 32 prosecutions run from the date of offence. The operating norm is 6 years minimum plus permanent retention of design-and-installation records, commissioning certificates and 5-year photometric verifications. For HRBs, the Golden Thread under the Building Safety Act 2022 effectively means life-of-building retention. Digital storage with backup is preferred.',
  },
  {
    id: 'elm6-s4-bsr',
    question: 'For an HRB on the BSR register, what additional documentation requirement applies to emergency lighting records?',
    options: [
      'The same set of records as a non-HRB, held by the responsible person.',
      'Integration into the digital building safety case and the Golden Thread.',
      'An annual paper file lodged with the local Fire and Rescue Service.',
      'Verbal records confirmed by the Accountable Person at each BSR audit.',
    ],
    correctIndex: 1,
    explanation:
      'The HRB regime is the most demanding documentation regime for emergency lighting in the UK. The Building Safety Act 2022 requires the Accountable Person to maintain a safety case (s.83) and a digital Golden Thread accessible for the life of the building. EL evidence — design records, photometric calculations, commissioning, monthly / annual / 5-year results, FRA reference, action plan items — all flow into the safety case and Golden Thread, demandable by the BSR. Mandatory Occurrence Reporting applies for safety-critical occurrences. Records must be digital, structured and accessible; paper-only is insufficient. The audit tests integration and accessibility, not just completeness.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which document under BS 5266-1:2025 records the design intent and is the foundation of subsequent verification?',
    options: [
      'The supplier invoice listing the luminaires purchased for the project.',
      'The manufacturer product brochure for the installed luminaire range.',
      'The monthly functional-test logbook kept near the fire alarm panel.',
      'The design-and-installation record, the master document for the system.',
    ],
    correctAnswer: 3,
    explanation:
      'The design-and-installation record is the integrating document from which all subsequent maintenance, testing and verification flows. BS 5266-1:2025 §5 + §11 require it to evidence the FRA-design linkage, the design strategy (self-contained vs central battery, maintained vs non-maintained), photometric calculations against BS EN 1838:2024 minima, layout drawings, the equipment schedule, circuit topology, the test regime, the external escape route boundary (new in 2025), cause-and-effect with BS 5839-1, and the commissioning record. The 2025 revision strengthened the requirements — pattern-book records are no longer accepted.',
  },
  {
    id: 2,
    question: 'BS EN 50172:2024 sets the test regime for emergency escape lighting systems. What are the three test cycles?',
    options: [
      'Daily, weekly and monthly visual inspections of every luminaire.',
      'A single weekly functional test of each luminaire, recorded in the logbook.',
      'Daily visual check (central / addressable), monthly functional, annual full-duration.',
      'An annual full-duration discharge test only, with no shorter cycles required.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 50172:2024 sets a layered regime: a daily visual check of indicator lamps (where central-battery or addressable systems require it per §7.2.2), a monthly functional test of each luminaire (simulated mains failure, pass / fail), and an annual full-duration test (over the rated duration, typically 3 hours). BS 5266-1:2025 adds a 5-year in-service photometric verification. Each cycle catches a different failure mode: the monthly catches battery / lamp / charger faults; the annual catches batteries that pass functional but cannot sustain duration; the 5-year catches LED depreciation and substitution against design.',
  },
  {
    id: 3,
    question: 'BS EN 60598-2-22 is the product standard most relevant to emergency luminaires. What does it cover?',
    options: [
      'The particular requirements for luminaires for emergency lighting.',
      'The requirements for fixed wiring systems supplying safety services.',
      'The performance requirements for the central battery and charger only.',
      'The construction requirements for low-voltage distribution boards.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 60598-2-22 is the product standard for self-contained and centrally supplied emergency luminaires — covering construction, insulation, mechanical strength, thermal performance, battery integration, charging characteristics, emergency-mode output, durability and marking. A certificate of conformity is the evidence a luminaire is fit for purpose; without it the photometric calculations are theoretical, not evidential. Certificates of conformity must be retained in the audit pack.',
  },
  {
    id: 4,
    question:
      'A typical FRS audit follows a structured sequence. Which of the following is the most accurate summary?',
    options: [
      'An unannounced physical search of the building with no document review.',
      'A telephone interview with the responsible person and no site visit.',
      'A written request for records returned by post, with no inspection.',
      'Entry → document review → building walk-through → interview → report → remediation.',
    ],
    correctAnswer: 3,
    explanation:
      'FRS audits typically follow a recognisable sequence: notification (often), entry under Article 27, scope-setting, document review (FRA, design record, logbook, certificates, training records, evacuation plan, fire alarm records, action plan), building walk-through (escape routes, signage, refuges, plant, sample EL test), interviews, findings debrief, formal report (informal advice through to prohibition notice depending on findings), then remediation and verification. Visits may be unannounced where serious risk is suspected — Article 27 entry does not require notice. The document review is where most failures are identified.',
  },
  {
    id: 5,
    question: 'What is the difference between an Article 30 enforcement notice and an Article 31 prohibition notice?',
    options: [
      'There is no practical difference; the two notices are interchangeable.',
      'Article 30 closes the building immediately and Article 31 allows continued use.',
      'Article 30 gives time to remedy a breach; Article 31 prohibits use until remedied.',
      'Article 31 is a voluntary code with no legal force behind it.',
    ],
    correctAnswer: 2,
    explanation:
      'Article 30 (enforcement) is issued where the RP has failed to comply with the Order; it specifies the failure, the steps required and a period of at least 28 days, with the premises remaining in use during the notice period. Article 31 (prohibition) is issued on imminent serious risk; it prohibits or restricts use with immediate effect and continues until remedied. Both carry a right of appeal to a magistrates court within 21 days and both are recorded against the building. The choice turns on the imminence of risk.',
  },
  {
    id: 6,
    question: 'A 7-storey block of flats containing 20 residential units and a single commercial unit at ground floor was registered as an HRB in 2024. The Building Safety Regulator has scheduled a Stage 1 audit. What documentation specifically for emergency lighting should the Accountable Person prepare?',
    options: [
      'The integrated digital evidence pack — FRA, design record, logbook, certificates, evacuation plans and safety-case integration evidence.',
      'No EL-specific documentation; the BSR reviews only the structural safety case.',
      'A photographic survey of every emergency luminaire across the common parts.',
      'A verbal summary of the maintenance regime given by the Accountable Person.',
    ],
    correctAnswer: 0,
    explanation:
      'HRB Stage 1 audits test integration as well as completeness. The Accountable Person should prepare a digital pack: current FRA (PAS 79-2, EL findings flagged), BS 5266-1:2025 design-and-installation record, commissioning certificate, BS EN 50172:2024 logbook with full test history, latest 5-year photometric verification, BS EN 60598-2-22 luminaire certificates, BS 7671 EIC and current EICR, BS 5839-1 fire alarm records and cause-and-effect, evacuation plans and PEEPs under SI 2025/797, signage / PIB / fire-door records under SI 2022/547, Mandatory Occurrence Reports, and safety-case / Golden Thread integration evidence. Paper-only files fail the test on form even before content is examined.',
  },
  {
    id: 7,
    question:
      'A premises has a digital logbook for emergency lighting. The system is hosted by the maintenance contractor. The RP has read-only access. Is this acceptable for FRS audit purposes?',
    options: [
      'Acceptable in all cases, since the records exist and are kept up to date.',
      'Never acceptable, because the RP does not physically hold the records.',
      'Acceptable only if a printed paper copy is also kept on the premises.',
      'Acceptable conditionally — if records are producible on demand, exportable on exit and tamper-evident.',
    ],
    correctAnswer: 3,
    explanation:
      'Digital logbooks are now industry standard but bring risks paper did not. A contractor-hosted system is acceptable only if the RP can produce the records on demand at audit, retains them on contract termination (the contract should require export on exit), and ensures they are tamper-evident. The concerns are contractor insolvency, migration on contractor change, cyber-attack, and proprietary non-portable formats. The RP retains the legal duty; reliance on a single contractor system without independent retention is a single point of failure. The FRS checks who controls the records, not just whether they exist.',
  },
  {
    id: 8,
    question: 'A fire causes serious injury in a building. The post-incident investigation finds that emergency lighting on the escape route had not worked for 6 months prior to the fire. Logbook entries from the last 6 months are missing. Which offence is most likely?',
    options: [
      'No offence, provided the system has since been repaired and retested.',
      'A civil claim by the injured party, but no criminal liability for the RP.',
      'Article 32 offences (Articles 14 and 17 breach), with manslaughter on the table.',
      'An insurance dispute only, settled between the insurer and the building owner.',
    ],
    correctAnswer: 2,
    explanation:
      'Post-incident investigations focus heavily on the documentary trail. The likely charges are Article 32 offences — failure to comply with the safety provisions of Articles 8-22 placing relevant persons at risk of death or serious injury (Article 14 emergency lighting, Article 17 maintenance) — plus a false-statement offence where logbook entries were falsified rather than missing, and corporate manslaughter where the failure caused death and was a gross breach. Penalties run to unlimited fines and up to 2 years on indictment, higher for corporate manslaughter. Missing entries aggravate the breach; fabricated entries add further charges.',
  },
  {
    id: 9,
    question: 'A building changes hands. What documentation must the outgoing RP provide to the new RP for emergency lighting?',
    options: [
      'A full handover pack — FRA, design record, certificates, logbook and contract details, transferred under a written inventory.',
      'No documentation requirement; the duty starts afresh for the incoming RP.',
      'The manufacturer product brochures for the installed luminaire range only.',
      'A receipt confirming the emergency lighting was working at point of sale.',
    ],
    correctAnswer: 0,
    explanation:
      'Handover is the most common moment for documentation to be lost. The outgoing RP should provide the current FRA, BS 5266-1:2025 design-and-installation record, commissioning certificate, BS EN 50172:2024 logbook, last 5-year photometric verification, luminaire certificates of conformity, EIC / EICR, manufacturer data, asset register, maintenance and contractor competence evidence, training records, evacuation plan, fire alarm cause-and-effect, and the action plan. It should be in writing with an inventory and an acceptance / defect schedule. For HRBs the Golden Thread transfers and the new AP must register with the BSR. Failure to hand over evidence does not transfer the duty.',
  },
  {
    id: 10,
    question:
      'An FRS inspector arrives unannounced for a fire safety audit. The duty manager cannot find the FRA, the logbook is locked in the absent owner\'s office, and the maintenance contractor cannot be reached. What should the duty manager do?',
    options: [
      'Refuse entry until the owner returns and can be present in person.',
      'Reschedule by asking the inspector to return once the records are located.',
      'State that the records are fully in order rather than admit they are inaccessible.',
      'Comply with Article 27 — permit entry, assist candidly and offer to retrieve the records.',
    ],
    correctAnswer: 3,
    explanation:
      'Article 27 entry powers are wide. The duty manager should permit entry, provide such information and assistance as can be given without misleading, explain candidly that the records are unavailable, and offer to retrieve them within a reasonable period. Refusing entry, false statements, or concealing records are themselves Article 32 offences. The inspector will record the inability to produce records and may reschedule; persistent non-production is itself a finding and, combined with any visible deficiency, materially worsens the position. Every duty manager should know where each key record is kept and the access protocol when others are off site.',
  },
];

const EmergencyLightingModule6Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title:
      'EL documentation for audits + fire authorities | Emergency Lighting Module 6.4 | Elec-Mate',
    description:
      'BS 5266-1:2025 design-and-installation record, BS EN 50172:2024 logbook, BS EN 60598-2-22 luminaire certificates, BS 7671 EIC / EICR, RRO 2005 Article 27 inspector powers, Articles 29-31 notices, Article 32 prosecution, Building Safety Act 2022 Golden Thread, retention rules and audit-survival practice.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() =>
              navigate('/electrician/upskilling/emergency-lighting-module-6')
            }
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 4"
            title="Documentation for audits and fire authorities"
            description="Emergency lighting compliance lives or dies on the documentary trail. The system itself can be perfect, but if the responsible person cannot produce the design-and-installation record, the logbook, the certificates and the FRA on demand, the audit fails. This section walks the documentation set the responsible person must hold, the typical FRS audit sequence, the notices and offences under RRO 2005 Articles 29-32, the BSA 2022 Higher-Risk Building regime, retention and digital-vs-paper tradeoffs, and what to do when an inspector arrives unannounced."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5266-1:2025 design-and-installation record — the master document. FRA-design map, photometric calculations, equipment schedule, layout drawings, test regime, external escape boundary. Without it, no compliance can be evidenced.',
              'BS EN 50172:2024 logbook — daily (where required) / monthly (functional) / annual (full-duration) test records. The on-going proof of Article 17 maintenance compliance.',
              'BS 5266-1:2025 5-year photometric verification — the empirical check on whether the EL is delivering against design. New under the 2025 revision.',
              'BS EN 60598-2-22 certificates of conformity — luminaire product evidence. Required for every luminaire installed.',
              'BS 7671 EIC + periodic EICR — the electrical installation evidence. Section 560 covers safety services. Required at installation and at periodic inspection (typically 5-yearly).',
              'Article 27 inspector powers — entry, demand for records, sample-taking, information demand. Obstruction is itself an Article 32 offence.',
              'Article 29 alterations notice (pre-modification), Article 30 enforcement notice (≥ 28 days remediation), Article 31 prohibition notice (immediate; imminent serious risk).',
              'Article 32 offences — failure to comply with Articles 8-22 placing relevant persons at risk of death or serious injury; unlimited fine + 2 years on indictment.',
              'BSA 2022 HRBs — emergency lighting evidence integrates into the safety case (s.83) and the Golden Thread digital record. Mandatory Occurrence Reporting applies for safety-critical occurrences.',
              'Retention — 6 years baseline; permanent for design-and-installation records, commissioning certificates, 5-year photometric verifications; life-of-building for HRBs (Golden Thread).',
              'Digital vs paper — digital is now the operating norm; tamper-evidence and portability matter; the RP retains the legal duty regardless of who hosts the system.',
              'Surviving a no-notice audit — co-operate under Article 27; produce what can be produced; explain candidly any unavailability; record-availability practice should be in every duty manager handover.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the documentation set the responsible person must hold — FRA, BS 5266-1:2025 design-and-installation record, commissioning certificate, BS EN 50172:2024 logbook, 5-year photometric verification, BS EN 60598-2-22 luminaire certificates, BS 7671 EIC / EICR, BS 5839-1 fire alarm records, evacuation plan, training records',
              'Apply BS 5266-1:2025 §5 + §11 to evaluate the completeness of a design-and-installation record',
              'Apply BS EN 50172:2024 §7 to maintain the daily / monthly / annual test logbook regime',
              'Apply BS 5266-1:2025 to schedule and record the 5-year in-service photometric verification',
              'Apply RRO 2005 Article 27 to identify inspector powers of entry, document demand and information demand',
              'Distinguish RRO 2005 Articles 29 (alterations), 30 (enforcement) and 31 (prohibition) notices and their immediate operational consequences',
              'Apply RRO 2005 Article 32 offences and identify the conditions under which unlimited fines and 2-year imprisonment apply',
              'Apply Building Safety Act 2022 to integrate emergency lighting evidence into the safety case and the Golden Thread for HRBs',
              'Apply retention rules (6 years baseline, permanent for foundational documents, life-of-building for HRBs)',
              'Identify the typical FRS audit sequence and prepare the responsible person\'s response — including the no-notice audit case',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The core documentation set</ContentEyebrow>

          <ConceptBlock
            title="Twelve documents the responsible person must hold"
            plainEnglish="Emergency lighting compliance documentation is not a single file — it is an integrated set of evidence covering design, installation, commissioning, maintenance, verification and management. Twelve document classes form the practical core. The responsible person should hold all twelve, in formats that can be produced on demand to a Fire and Rescue Service inspector, the Building Safety Regulator (for HRBs), an insurer or a court."
            onSite="An FRS inspector typically reviews documents before walking the building. If the documents tell a coherent story — a design that responds to the FRA, a commissioning certificate that confirms the design, a logbook that evidences ongoing maintenance — the building walk-through is brief. If the documents are gappy, contradictory or out-of-date, the inspector slows down, asks more questions, takes more samples, and the audit lengthens. Document quality drives audit speed."
          >
            <p>The twelve core document classes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>(1) Fire risk assessment.</strong> RRO 2005 Article 9. Written under Article
                9(6) where 5+ employees / licence / alterations notice; PAS 79-1:2020 (non-housing)
                or PAS 79-2:2020 (housing) methodology. Significant findings + action plan.
                Annually reviewed.
              </li>
              <li>
                <strong>(2) BS 5266-1:2025 design-and-installation record.</strong> The master EL
                document. FRA-design map, photometric calculations, equipment schedule, layout
                drawings, circuit topology, external escape boundary, test regime, cause-and-effect
                with BS 5839-1.
              </li>
              <li>
                <strong>(3) Commissioning certificate.</strong> BS 5266-1:2025 / BS EN 1838:2024
                acceptance — confirming the design has been built and verified to deliver the
                specified illuminance. In-situ measurement at sample points. Signed by the
                competent person.
              </li>
              <li>
                <strong>(4) BS EN 50172:2024 logbook.</strong> The on-going test record. Daily
                visual checks (where applicable to central-battery / addressable systems);
                monthly functional tests of every luminaire; annual full-duration tests of every
                luminaire. Pass / fail per luminaire; remedial actions recorded; closure evidence.
                Format may be paper or digital.
              </li>
              <li>
                <strong>(5) BS 5266-1:2025 5-year photometric verification certificate.</strong>
                The most recent in-service photometric verification — empirical illuminance
                measurement against design at 5-year intervals. NEW under 2025 revision.
              </li>
              <li>
                <strong>(6) BS EN 60598-2-22 certificates of conformity.</strong> Luminaire product
                certificates. One per luminaire type. Evidence that the equipment is fit for
                emergency lighting use.
              </li>
              <li>
                <strong>(7) BS 7671 Electrical Installation Certificate (EIC).</strong> At
                installation. Confirms wiring complies with BS 7671. §560 (safety services) covers
                emergency lighting wiring, segregation, fire-resistant cabling where required.
              </li>
              <li>
                <strong>(8) BS 7671 Electrical Installation Condition Report (EICR).</strong>
                Periodic inspection — typically 5-yearly in commercial premises. Confirms the
                installation remains safe in continued use. Includes EL circuits.
              </li>
              <li>
                <strong>(9) BS 5839-1 fire alarm records and cause-and-effect.</strong> Where
                emergency lighting interacts with the fire alarm (early activation, refuge call-
                point lighting, high-risk task lighting on alarm), the cause-and-effect document
                records the integration; the fire alarm logbook supports it.
              </li>
              <li>
                <strong>(10) Evacuation plan and PEEPs.</strong> The Fire Safety (Residential
                Evacuation Plans) (England) Regulations 2025 (SI 2025/797) for multi-occupied
                residential premises — building evacuation plan, Person-Centred Fire Risk
                Assessments, PEEPs for residents needing assistance, FRS information sharing.
                Reg 9 of SI 2022/547 requires the RP to provide each resident with fire safety
                instructions consistent with the evacuation strategy. PAS 79 Step 6 / 8 covers
                non-residential evacuation plans. Personal emergency evacuation plans for
                individuals needing them. EL is a dependency for all of these.
              </li>
              <li>
                <strong>(11) Training records.</strong> Article 21 (training) records for
                employees. EL-relevant training: location of escape routes, refuges, assembly
                points; what to do if EL fails; competent person certification for those
                conducting tests.
              </li>
              <li>
                <strong>(12) Manufacturer data and replacement schedule.</strong> Battery
                replacement schedule (typically 4-year for self-contained units), luminaire
                lifecycle, spare parts availability. The forward plan that turns reactive failures
                into planned replacements.
              </li>
            </ul>
            <p>
              For HRBs, all twelve sit within the safety case + Golden Thread. For non-HRB
              premises, they are the working compliance pack. Either way, they are the
              documentation set an inspector expects to see and that a court will read first.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 11 (Documentation)"
            clause={
              <>
                A design-and-installation record should be prepared and retained for the life of
                the installation, recording the design intent, the FRA findings to which the
                design responds, the photometric calculations against BS EN 1838:2024 minima, the
                equipment installed (with reference to BS EN 60598-2-22 certificates of
                conformity), the layout, the circuit topology, the test regime to BS EN 50172:2024,
                the cause-and-effect interactions where applicable, the boundary of design
                including external escape routes, and the commissioning record. The logbook should
                be retained on the premises and made available to the responsible person, the
                competent person, and any inspector authorised under the relevant statutory
                regime.
              </>
            }
            meaning="Three phrases earn close reading. 'Retained for the life of the installation' — not 6 years; for the life of the system. 'Made available to the responsible person, the competent person, and any inspector' — three audiences with three different needs. 'The boundary of design including external escape routes' — the 2025 revision makes this an express documentation requirement."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Documentation hierarchy diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The emergency lighting documentation set — what to hold, statutory source, retention
            </h4>
            <svg
              viewBox="0 0 820 440"
              className="w-full h-auto"
              role="img"
              aria-label="Documentation hierarchy. Top tier is the foundation documents (FRA, design-and-installation record, commissioning certificate). Middle tier is on-going evidence (logbook, 5-year photometric verification, periodic EICR). Bottom tier is supporting documents (luminaire certificates, fire alarm cause-and-effect, evacuation plans, training records, manufacturer data). Each box shows source standard and retention period. A right-hand panel lists the FRS audit demand under Article 27."
            >
              {/* Foundation tier */}
              <rect
                x="40"
                y="20"
                width="540"
                height="116"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="2.2"
              />
              <text x="310" y="42" textAnchor="middle" fill="#FBBF24" fontSize="12" fontWeight="bold">
                FOUNDATION DOCUMENTS — retain permanently
              </text>

              <rect x="58" y="54" width="160" height="68" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.2" />
              <text x="138" y="74" textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="10" fontWeight="bold">
                Fire Risk Assessment
              </text>
              <text x="138" y="90" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                RRO Art. 9 + PAS 79
              </text>
              <text x="138" y="104" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Annual review
              </text>
              <text x="138" y="116" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">
                Permanent + history
              </text>

              <rect x="232" y="54" width="160" height="68" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.2" />
              <text x="312" y="74" textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="10" fontWeight="bold">
                Design + install record
              </text>
              <text x="312" y="90" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS 5266-1:2025 §5/§11
              </text>
              <text x="312" y="104" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                FRA-design map
              </text>
              <text x="312" y="116" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">
                Life of installation
              </text>

              <rect x="406" y="54" width="160" height="68" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.2" />
              <text x="486" y="74" textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="10" fontWeight="bold">
                Commissioning cert.
              </text>
              <text x="486" y="90" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS 5266-1 / EN 1838
              </text>
              <text x="486" y="104" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                In-situ verification
              </text>
              <text x="486" y="116" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">
                Permanent
              </text>

              {/* On-going tier */}
              <rect
                x="40"
                y="148"
                width="540"
                height="116"
                rx="10"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.8"
              />
              <text x="310" y="170" textAnchor="middle" fill="#22C55E" fontSize="12" fontWeight="bold">
                ON-GOING EVIDENCE — retain rolling history
              </text>

              <rect x="58" y="182" width="160" height="68" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(34,197,94,0.5)" strokeWidth="1.2" />
              <text x="138" y="202" textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="10" fontWeight="bold">
                Logbook
              </text>
              <text x="138" y="218" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS EN 50172:2024 §7
              </text>
              <text x="138" y="232" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Monthly + annual
              </text>
              <text x="138" y="244" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">
                6 years rolling
              </text>

              <rect x="232" y="182" width="160" height="68" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(34,197,94,0.5)" strokeWidth="1.2" />
              <text x="312" y="202" textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="10" fontWeight="bold">
                5-yr photometric
              </text>
              <text x="312" y="218" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS 5266-1:2025 — NEW
              </text>
              <text x="312" y="232" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                In-service verification
              </text>
              <text x="312" y="244" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">
                Permanent
              </text>

              <rect x="406" y="182" width="160" height="68" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(34,197,94,0.5)" strokeWidth="1.2" />
              <text x="486" y="202" textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="10" fontWeight="bold">
                EIC + periodic EICR
              </text>
              <text x="486" y="218" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS 7671 §560
              </text>
              <text x="486" y="232" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                5-yearly typical
              </text>
              <text x="486" y="244" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">
                EIC permanent
              </text>

              {/* Supporting tier */}
              <rect
                x="40"
                y="276"
                width="540"
                height="146"
                rx="10"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text x="310" y="298" textAnchor="middle" fill="#22D3EE" fontSize="12" fontWeight="bold">
                SUPPORTING DOCUMENTS — retain alongside core
              </text>

              <rect x="58" y="310" width="160" height="50" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.1" />
              <text x="138" y="328" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="9.5" fontWeight="bold">
                Luminaire certs
              </text>
              <text x="138" y="342" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                BS EN 60598-2-22
              </text>
              <text x="138" y="354" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">
                Permanent
              </text>

              <rect x="232" y="310" width="160" height="50" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.1" />
              <text x="312" y="328" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="9.5" fontWeight="bold">
                Fire alarm + C&E
              </text>
              <text x="312" y="342" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                BS 5839-1:2025
              </text>
              <text x="312" y="354" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">
                Rolling
              </text>

              <rect x="406" y="310" width="160" height="50" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.1" />
              <text x="486" y="328" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="9.5" fontWeight="bold">
                Evac plan + PEEPs
              </text>
              <text x="486" y="342" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                SI 2025/797
              </text>
              <text x="486" y="354" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">
                Current + history
              </text>

              <rect x="58" y="368" width="246" height="44" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.1" />
              <text x="181" y="386" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="9.5" fontWeight="bold">
                Training records · Art. 21
              </text>
              <text x="181" y="402" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Per-employee · per-cycle · 6 years
              </text>

              <rect x="320" y="368" width="246" height="44" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.1" />
              <text x="443" y="386" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="9.5" fontWeight="bold">
                Manufacturer data + replacement schedule
              </text>
              <text x="443" y="402" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Battery 4-yr · luminaire lifecycle
              </text>

              {/* Right-hand audit panel */}
              <rect
                x="600"
                y="20"
                width="190"
                height="402"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.45)"
                strokeWidth="1.6"
              />
              <text x="695" y="42" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">
                FRS AUDIT — Art. 27
              </text>
              <text x="695" y="60" textAnchor="middle" fill="rgba(255,255,255,0.78)" fontSize="9">
                Inspector demands
              </text>

              <text x="612" y="84" fill="rgba(255,255,255,0.78)" fontSize="9.5">
                · FRA — read first
              </text>
              <text x="612" y="100" fill="rgba(255,255,255,0.78)" fontSize="9.5">
                · Design record
              </text>
              <text x="612" y="116" fill="rgba(255,255,255,0.78)" fontSize="9.5">
                · Logbook entries
              </text>
              <text x="612" y="132" fill="rgba(255,255,255,0.78)" fontSize="9.5">
                · 5-yr photometric
              </text>
              <text x="612" y="148" fill="rgba(255,255,255,0.78)" fontSize="9.5">
                · Cert. of conformity
              </text>
              <text x="612" y="164" fill="rgba(255,255,255,0.78)" fontSize="9.5">
                · EIC / EICR
              </text>
              <text x="612" y="180" fill="rgba(255,255,255,0.78)" fontSize="9.5">
                · Cause-and-effect
              </text>
              <text x="612" y="196" fill="rgba(255,255,255,0.78)" fontSize="9.5">
                · Evacuation plan
              </text>
              <text x="612" y="212" fill="rgba(255,255,255,0.78)" fontSize="9.5">
                · Training records
              </text>
              <text x="612" y="228" fill="rgba(255,255,255,0.78)" fontSize="9.5">
                · Action plan
              </text>

              <line x1="612" y1="240" x2="778" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />

              <text x="695" y="258" textAnchor="middle" fill="rgba(239,68,68,0.85)" fontSize="9.5" fontWeight="bold">
                Then walk-through
              </text>
              <text x="612" y="276" fill="rgba(255,255,255,0.7)" fontSize="9">
                · Sample EL test
              </text>
              <text x="612" y="290" fill="rgba(255,255,255,0.7)" fontSize="9">
                · Signage check
              </text>
              <text x="612" y="304" fill="rgba(255,255,255,0.7)" fontSize="9">
                · Refuges
              </text>
              <text x="612" y="318" fill="rgba(255,255,255,0.7)" fontSize="9">
                · External route
              </text>

              <line x1="612" y1="328" x2="778" y2="328" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />

              <text x="695" y="346" textAnchor="middle" fill="rgba(239,68,68,0.85)" fontSize="9.5" fontWeight="bold">
                Possible outcomes
              </text>
              <text x="612" y="362" fill="rgba(255,255,255,0.7)" fontSize="9">
                · Informal advice
              </text>
              <text x="612" y="376" fill="rgba(255,255,255,0.7)" fontSize="9">
                · Art. 29 alterations
              </text>
              <text x="612" y="390" fill="rgba(255,255,255,0.7)" fontSize="9">
                · Art. 30 enforcement
              </text>
              <text x="612" y="404" fill="rgba(255,255,255,0.7)" fontSize="9">
                · Art. 31 prohibition
              </text>
              <text x="612" y="418" fill="rgba(255,255,255,0.7)" fontSize="9">
                · Art. 32 prosecution
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The BS EN 50172:2024 logbook</ContentEyebrow>

          <ConceptBlock
            title="The on-going test record — what BS EN 50172:2024 requires"
            plainEnglish="The logbook is the on-going proof of compliance with the maintenance duty under RRO 2005 Article 17. BS EN 50172:2024 (Emergency escape lighting systems) sets out the test regime — daily where applicable, monthly functional, annual full-duration. The logbook records each test, the result, the person conducting the test, any failure, and the remediation. BS 5266-1:2025 adds the 5-year photometric verification — a separate certificate, but typically held alongside the logbook for a complete on-going record."
            onSite="The logbook is the document an FRS inspector is most likely to ask for after the FRA. Look at: are entries current (most recent within the last month)? are pass / fail recorded per luminaire? are failures followed by remediation entries? are entries signed and dated? are there gaps in the time series? An incomplete logbook is a serious finding even if every individual luminaire works on the day of audit — it evidences that the maintenance duty is not being discharged systematically."
          >
            <p>What BS EN 50172:2024 §7 requires:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>§7.2.1 Daily — visual inspection.</strong> For central battery and
                addressable systems with central monitoring. A brief check of indicator lamps
                showing system status. Recorded in the logbook.
              </li>
              <li>
                <strong>§7.2.2 Monthly — functional test.</strong> Each emergency luminaire
                operated by simulated mains failure for a brief period (sufficient to verify the
                lamp lights, the changeover works, the battery has output). Recorded per
                luminaire as pass / fail, dated, signed.
              </li>
              <li>
                <strong>§7.2.3 Annual — full duration test.</strong> Each emergency luminaire
                operated for its full rated duration (typically 3 hours). Tests battery capacity
                under load. Recorded per luminaire as pass / fail, dated, signed. Failed
                luminaires recharged after test (recharge period typically 24 hours; fault
                indicators documented).
              </li>
              <li>
                <strong>BS 5266-1:2025 5-year photometric verification.</strong> NEW. In-service
                photometric measurement at sample points to verify the design illuminance is still
                being achieved. Catches LED depreciation, surface changes, luminaire substitution
                drift. Separate certificate, typically held with the logbook.
              </li>
              <li>
                <strong>Logbook contents per BS EN 50172:2024.</strong> The asset register (each
                luminaire identified by location and reference); the test schedule; test
                entries with date, person, result, comments; remedial actions with date opened,
                action taken, date closed, evidence; battery replacement records; modifications.
              </li>
              <li>
                <strong>Format.</strong> Paper or digital. Both must be tamper-evident, signed (or
                digitally authenticated), and producible on demand. Digital logbooks are now
                industry standard but bring portability and contractor-dependence risks.
              </li>
              <li>
                <strong>Storage.</strong> On the premises (typically near the fire alarm panel) or
                immediately accessible electronically. The logbook must be available to: the RP;
                the competent person conducting tests; the FRS inspector under Article 27; the
                BSR for HRBs; the maintenance contractor.
              </li>
              <li>
                <strong>Retention.</strong> 6 years rolling minimum; longer for HRBs (Golden
                Thread). Some operators retain permanently as part of the building's historical
                record.
              </li>
            </ul>
            <p>
              The logbook is the working document of EL compliance. The FRA is the strategic
              foundation, the design record is the engineering base, the commissioning certificate
              is the day-of-handover evidence — but the logbook is the thing that proves the
              system has been kept alive and maintained.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50172:2024 · Clause 7 (Servicing and testing)"
            clause={
              <>
                A logbook should be maintained on the premises. The logbook should record dates of
                completion of servicing operations, dates and brief details of each defect and
                remedial action, and dates and brief details of each test, including the duration
                of any test. The logbook should be available for inspection by an authorised
                person.
              </>
            }
            meaning="Three phrases earn close reading. 'On the premises' — accessible at the site, not just at head office. 'Each defect and remedial action' — defects must be entered when found, not at year-end; remediation must be tracked to closure. 'Available for inspection by an authorised person' — the FRS inspector under Article 27, the BSR for HRBs, the insurer, and the duty holder's own competence audit."
          />

          <CommonMistake
            title="Treating the monthly functional test as a paper exercise without verifying every luminaire"
            whatHappens="A maintenance contractor records 'monthly functional test — pass' in the logbook each month for 12 months. An FRS audit physically tests a sample of 8 luminaires; 3 fail (one battery dead, one lamp end-of-life, one charger fault). The logbook has no record of any failures over 12 months. Either the tests were not done properly (paper exercise) or the failures were not recorded (falsification). Both are serious findings; falsification is itself an Article 32 offence. Investigation; enforcement notice; possible prosecution; contractor competence and certification reviewed."
            doInstead="The monthly functional test must operate every emergency luminaire — not just check a remote indicator. For self-contained units, this means activating the test button (or simulating mains failure at the circuit) for each luminaire and verifying the lamp lights at adequate output. Failures are entered immediately with a tracked remediation. For large estates, automated testing (BS EN 62034) can do this at scale and produce digital logs — but the records must still cover every luminaire, every cycle."
          />

          <SectionRule />

          <ContentEyebrow>The 5-year photometric verification</ContentEyebrow>

          <ConceptBlock
            title="What BS 5266-1:2025 added — and why it matters"
            plainEnglish="BS 5266-1:2025 introduced a new on-going verification — the 5-year in-service photometric verification. Until 2025, the test regime checked that luminaires worked (functional) and could sustain duration (annual). It did not check whether they were still delivering the design illuminance. The 2025 revision adds this empirical check: at 5-year intervals, a competent person measures actual in-service illuminance at sample points along escape routes, in anti-panic open areas, at refuges, and at high-risk task areas, and verifies it against the BS 5266-1 design-and-installation record. Where measured illuminance is below design, remediation is required."
            onSite="The 5-year photometric is the 'is it still working as designed?' check. LED luminaires depreciate slowly — they may pass functional and annual duration tests for years while gradually delivering less light to the task plane. Surface reflectances change as walls and ceilings are repainted or weather. Luminaires get substituted in maintenance with non-equivalent products. Layout changes around plant or stock encroachment. The 5-year photometric catches all of this — it is empirical, not theoretical."
          >
            <p>How the 5-year verification works:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Trigger.</strong> 5 years from commissioning, then every 5 years. Or
                earlier if the FRA review identifies a trigger (significant building change,
                modification, repurposing). The cycle aligns with typical periodic EICR cycles in
                commercial premises — many operators run the two together.
              </li>
              <li>
                <strong>Method.</strong> A competent person uses a calibrated illuminance meter to
                measure horizontal illuminance at sample points across the full open width of
                escape routes (with edge exclusions per BS EN 1838:2024 §4.2), in anti-panic open
                areas, vertical illuminance at refuge call-points and at safety signs, and 15 lx
                / 10 % at high-risk task areas. Sample density per BS 5266-1:2025 guidance.
              </li>
              <li>
                <strong>Comparison against design.</strong> The measured values are compared
                against the BS 5266-1:2025 design-and-installation record. Pass if measured ≥
                design (with a tolerance band per the standard); fail if below.
              </li>
              <li>
                <strong>Failure handling.</strong> A fail triggers remediation — luminaire
                replacement, additional luminaires, surface treatment changes. Re-verification on
                completion. The action item enters the FRA action plan.
              </li>
              <li>
                <strong>Certificate.</strong> A signed certificate from the competent person
                recording the measurements, the comparison, the pass / fail result, any
                remediation actions, and the next verification due date.
              </li>
              <li>
                <strong>Integration with FRA review.</strong> A pass on the 5-year verification
                supports the FRA finding that EL is adequate; a fail is itself a significant
                finding feeding the FRA action plan and the safety case for HRBs.
              </li>
              <li>
                <strong>Competent person.</strong> The 5-year verification is more demanding than
                routine maintenance. The competent person should hold relevant training (e.g. the
                ICEL / Industry Committee for Emergency Lighting competence framework) and use
                calibrated equipment.
              </li>
            </ul>
            <p>
              The 5-year photometric is the only direct empirical test that the EL is still doing
              its job. Functional and annual tests confirm the equipment turns on; the photometric
              confirms the equipment delivers light at the right places. BS 5266-1:2025 made it a
              standard expectation for new and existing installations.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>FRS inspector powers — RRO 2005 Article 27</ContentEyebrow>

          <ConceptBlock
            title="Entry, demand for records, sample-taking, information demand"
            plainEnglish="The Fire and Rescue Service Fire Safety inspector exercises powers under RRO 2005 Article 27. The powers are wide. The inspector may, at any reasonable time, enter premises (no notice required); make examinations and inspections; require the production of records; require persons to provide information; take samples; require any document to be retained; require equipment to be left alone for a defined period. Obstruction, false statement or destruction of records is itself an offence under Article 32."
          >
            <p>Article 27 in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Article 27(1)(a) — entry.</strong> An inspector may enter any premises at
                any reasonable time for the purpose of carrying out their functions under the
                Order. No notice required. Force may be used, with police support, where entry is
                refused.
              </li>
              <li>
                <strong>Article 27(1)(b) — examination.</strong> The inspector may make such
                examinations and inspections as are necessary. This includes the EL system —
                physical inspection, sample testing, photographing.
              </li>
              <li>
                <strong>Article 27(1)(c) — direction to leave undisturbed.</strong> The inspector
                may direct that the premises, or any part, or anything in them, be left
                undisturbed for as long as is reasonably necessary for the inspection.
              </li>
              <li>
                <strong>Article 27(1)(d) — sample-taking.</strong> The inspector may take samples
                of any article or substance.
              </li>
              <li>
                <strong>Article 27(1)(e) — examination + dismantling.</strong> The inspector may
                examine, dismantle or test (subject to the destruction not being unreasonable) any
                article or substance.
              </li>
              <li>
                <strong>Article 27(1)(g) — production of records.</strong> The inspector may
                require the production of any books, documents, records or other information,
                inspect them, and take copies. The full documentation set described above is in
                scope.
              </li>
              <li>
                <strong>Article 27(1)(j) — information from any person.</strong> The inspector may
                require any person to give such information as the inspector thinks necessary,
                and to sign a declaration of the truth of their answers.
              </li>
              <li>
                <strong>Article 27(2) — protection of information.</strong> Information so
                obtained must not be disclosed except as required for the purposes of the Order or
                with the consent of the person providing it.
              </li>
              <li>
                <strong>Obstruction is an offence.</strong> Article 32(1)(a) makes obstruction of
                an inspector an offence. False statements under Article 32(2)(a). Destruction of
                records under Article 32(2)(d). All carry the same penalty range as the underlying
                safety offences.
              </li>
            </ul>
            <p>
              The right response to an inspector arriving is co-operation, candour, and
              competence. Co-operation: produce what is asked for. Candour: explain any
              unavailability honestly. Competence: have a duty manager who knows where things are.
              The wrong response is refusal, evasion, or fabrication — each escalates the
              regulatory position significantly.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="RRO 2005 · Article 27(1) (Powers of inspectors)"
            clause={
              <>
                An inspector may at any reasonable time enter any premises and do anything within
                their powers; on entering any premises by virtue of this Article an inspector may
                take with them any other person duly authorised by the inspector's enforcing
                authority, and any equipment or materials required for any purpose for which the
                power of entry is being exercised; carry out such examinations and inspections as
                are necessary; require the production of, inspect and take copies of any books,
                documents, records or other information; require any person to give such
                information as the inspector thinks necessary and to sign a declaration of the
                truth of their answers.
              </>
            }
            meaning="Three phrases earn close reading. 'At any reasonable time' — no notice required; reasonable typically means business hours but can be otherwise where risk requires it. 'Take with them any other person' — the inspector may bring colleagues, technical specialists, or police; the RP cannot exclude them. 'Sign a declaration of the truth' — the duty manager who answers questions does so on a basis of legal truthfulness; lies are themselves an offence."
          />

          <SectionRule />

          <ContentEyebrow>Notices the FRS may serve</ContentEyebrow>

          <ConceptBlock
            title="Article 29 (alterations), Article 30 (enforcement), Article 31 (prohibition)"
            plainEnglish="The FRS has three formal notice powers under the RRO 2005, escalating in seriousness. Article 29 alterations notices are pre-emptive — they require advance notification of building changes that may significantly increase risk. Article 30 enforcement notices respond to a non-imminent breach — they require remediation within ≥ 28 days. Article 31 prohibition notices respond to imminent serious risk — they prohibit or restrict use of the premises with immediate effect. Each is a formal regulatory action with appeal rights and lasting consequences. Each can include emergency lighting findings."
          >
            <p>The three notices in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Article 29 — alterations notice.</strong> Where the FRS is of the opinion
                that the premises constitute, or could constitute, a serious risk to relevant
                persons, or that the premises may, by reason of any alteration to them or to their
                use, become a serious risk, the FRS may serve an alterations notice on the RP.
                The notice requires advance notification of any specified types of alteration so
                that the FRS can assess them. Failure to notify is itself an offence.
              </li>
              <li>
                <strong>Article 30 — enforcement notice.</strong> Where the FRS is of the opinion
                that the RP has failed to comply with the Order, the FRS may serve an enforcement
                notice. The notice specifies the matters constituting the failure, the steps the
                RP must take to remedy them, and a period (≥ 28 days) for compliance. The
                premises remain in use during the notice period. Appeal to a magistrates court
                within 21 days. Failure to comply is itself an offence under Article 32.
              </li>
              <li>
                <strong>Article 31 — prohibition notice.</strong> Where the FRS is of the opinion
                that the use of premises involves or will involve a serious risk to relevant
                persons in case of fire, the FRS may serve a prohibition notice. The notice
                prohibits or restricts the use of part or all of the premises. It can take effect
                immediately or from a specified time. The notice continues until withdrawn by the
                FRS, typically on evidenced remediation. Appeal to a magistrates court within 21
                days. Failure to comply is itself an offence.
              </li>
              <li>
                <strong>Choice of notice.</strong> The FRS chooses based on the imminence of risk.
                An EL deficiency on a low-risk escape route in a low-occupancy daytime office is
                typically Article 30. An EL failure on the only escape route from a high-occupancy
                premises with sleeping risk is typically Article 31. The choice is fact-specific.
              </li>
              <li>
                <strong>Recording and publication.</strong> Notices are recorded against the
                building. The FRS may publish information about prohibition notices. For HRBs, the
                BSR is informed. For commercial premises, lenders, insurers and prospective
                tenants increasingly check fire safety notice history.
              </li>
              <li>
                <strong>Remediation and lifting.</strong> Article 30 notices are deemed satisfied
                on completion of the specified steps; the FRS confirms with a follow-up audit.
                Article 31 notices are lifted by the FRS on evidenced remediation; the building
                cannot be used again until lifted.
              </li>
            </ul>
            <p>
              The three notices form an escalation ladder. Most engagements with the FRS that
              identify shortcomings begin with informal advice or a letter; persistent or serious
              shortcomings move to formal notices; immediate risk moves straight to Article 31. EL
              deficiencies feature prominently in all three categories.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <Scenario
            title="The hotel — escape stair illuminance failure during audit"
            situation="A 4-storey 60-bedroom hotel has its annual FRS audit. The inspector tests the EL by simulating a mains failure on the escape stair. Three of the 8 luminaires on the stair fail to operate; sample illuminance measurements show 0.3 lx where 1 lx is required. The logbook shows monthly functional tests recorded as 'all pass' for the past 12 months. The FRS inspector raises this on site."
            whatToDo="The inspector has multiple options. (a) Article 30 enforcement notice — sleeping accommodation with 60 occupants and an EL failure on the stair is a clear safety provision breach (Article 14 — adequate lighting; Article 17 — maintenance), but the building is occupied during a slack period and the inspector judges remediation can be done within a defined window. Likely Article 30 notice with a 28-day remediation deadline. (b) Article 31 prohibition notice — if the inspector judges that the EL failure plus the sleeping risk creates imminent serious risk (e.g. it is peak season, the hotel is full, the stair is the only escape from upper floors), Article 31 may be served prohibiting bedroom occupancy on affected floors until remediated. The fact that the logbook is falsely recorded is itself an Article 32 offence; the inspector will document this for separate consideration. The RP's response: cease bedroom letting on affected floors immediately; commission emergency remedial works (replace failed luminaires, retest); commission an independent review of the maintenance contractor's competence; update the FRA significant findings; record the incident in the safety case. The maintenance contractor faces investigation for falsified records."
            whyItMatters="EL failures on escape routes from sleeping accommodation are the highest-priority FRS findings. Hotel and HMO contexts are where Article 31 prohibition notices are most often served. The combination of physical failure + falsified logbook is a particularly damaging combination — it evidences both the safety failure and the management failure to maintain records. Defence is difficult; mitigation focuses on rapid remediation and demonstrable competence improvement going forward."
          />

          <SectionRule />

          <ContentEyebrow>Article 32 — offences and prosecution</ContentEyebrow>

          <ConceptBlock
            title="When EL failures lead to prosecution"
            plainEnglish="Article 32 of the RRO 2005 sets out the offences. The headline offence: failing to comply with the safety provisions of Articles 8 to 22 (which include Article 14 emergency lighting and Article 17 maintenance) where the failure places one or more relevant persons at risk of death or serious injury. Penalties: on summary conviction, an unlimited fine and / or 6 months imprisonment; on conviction on indictment, an unlimited fine and / or 2 years imprisonment. There are additional offences for failure to comply with notices, false statements, and obstruction of inspectors. Prosecution rates have risen post-Grenfell; sentences have hardened. Emergency lighting features in many recent cases — typically alongside fire door failures, blocked escape routes, missing FRAs and absent training."
          >
            <p>Article 32 in detail and recent enforcement themes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Article 32(1) — headline offence.</strong> Failure to comply with the
                safety provisions of Articles 8 to 22, or Article 38, where the failure places one
                or more relevant persons at risk of death or serious injury. Articles 14
                (emergency routes and exits) and 17 (maintenance) are within scope.
              </li>
              <li>
                <strong>Article 32(2) — additional offences.</strong> Failure to comply with an
                Article 29 alterations notice; failure to comply with an Article 30 enforcement
                notice; failure to comply with an Article 31 prohibition notice; making a false
                statement; impersonating an inspector; intentionally obstructing an inspector;
                pretending to be the responsible person; failing to provide information; falsely
                pretending that an inspector's authority has been given; etc.
              </li>
              <li>
                <strong>Penalties (Article 32(3)).</strong> Summary conviction: unlimited fine and
                / or 6 months imprisonment (since the £5,000 cap was removed in 2015). Indictment:
                unlimited fine and / or 2 years imprisonment.
              </li>
              <li>
                <strong>Corporate offenders.</strong> Bodies corporate face the unlimited fine.
                Where the offence is committed with the consent or connivance of, or attributable
                to neglect on the part of, a director, manager, secretary or other similar officer
                of the body, that person is also guilty of the offence (Article 33).
              </li>
              <li>
                <strong>Recent themes.</strong> Sentencing under the Sentencing Council's
                Definitive Guideline for health-and-safety offences has produced fines on
                turnover-related bands. Substantial corporate offenders have received fines
                exceeding £1 million in the most serious cases. Custody for individuals is rarer
                but not unknown — particularly where deliberate falsification or repeat offending
                is established.
              </li>
              <li>
                <strong>Lessons from prosecutions.</strong> Documentary failures feature heavily —
                missing FRAs, falsified logbooks, expired certificates, no design records.
                Emergency lighting alone rarely founds a prosecution; emergency lighting as part
                of a wider failure pattern is common. The 'reasonable competent person' test is
                the standard — would a reasonable RP have done what was done? If not, conviction
                is likely.
              </li>
              <li>
                <strong>Corporate manslaughter.</strong> Where an EL failure (combined with other
                failures) causes a death and the death is attributable to a gross breach of duty
                committed substantially by the way in which the organisation's senior management
                managed the activity, the Corporate Manslaughter and Corporate Homicide Act 2007
                offence may apply. Sentencing: typically very large fines, publicity orders,
                remedial orders. The Act is particularly relevant for corporate landlords and
                operators of public premises.
              </li>
            </ul>
            <p>
              Prosecution is the end of the enforcement ladder. Most RPs who engage promptly with
              FRS findings, remediate at the agreed pace, and maintain documentary evidence avoid
              prosecution even where significant initial failings existed. RPs who fail to engage
              — repeated overruns, unevidenced closures, falsified records — are at materially
              greater risk.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>HRBs — the Building Safety Regulator + Golden Thread</ContentEyebrow>

          <ConceptBlock
            title="The integrated documentation regime for higher-risk buildings"
            plainEnglish="For Higher-Risk Buildings (≥ 18 m or ≥ 7 storeys, ≥ 2 residential units) under the Building Safety Act 2022, emergency lighting documentation operates within an integrated, digital, regulator-accessible framework. The Accountable Person maintains the safety case (s.83) and the Golden Thread of digital information (Building Regs + BSA 2022). The Building Safety Regulator (BSR) audits the safety case and the Golden Thread. Mandatory Occurrence Reporting captures safety-critical occurrences. Resident engagement is part of the regime. Emergency lighting evidence flows through all four — safety case, Golden Thread, MOR and resident engagement — not just the standalone RRO regime."
          >
            <p>What integration means for emergency lighting documentation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Safety case integration (BSA 2022 s.83).</strong> The EL design-and-
                installation record, FRA references, commissioning, on-going test history,
                5-year verification, action plan items and closure evidence all sit within the
                building safety case. The case is reviewed continuously and updated on every
                significant change.
              </li>
              <li>
                <strong>Golden Thread (Building Regs).</strong> Digital, structured, accessible.
                Each EL document has a defined location, format, version control, audit trail. The
                BSR can request any document on demand and expects to receive it digitally.
              </li>
              <li>
                <strong>Gateways 2 and 3 (new construction).</strong> Gateway 2 (before
                construction) — design evidence; the EL design-and-installation record and
                photometric calculations form part of the submission. Gateway 3 (before
                occupation) — installation evidence; commissioning certificate, verification, EIC
                form part of the submission. BSR sign-off is mandatory for both.
              </li>
              <li>
                <strong>Mandatory Occurrence Reporting (MOR).</strong> The Accountable Person must
                report safety occurrences to the BSR within defined timescales. Examples relevant
                to EL: a complete failure of EL across an escape route during occupied hours; a
                fire where EL did not function; a structural / fabric event affecting EL
                provision. MOR submissions form part of the Golden Thread.
              </li>
              <li>
                <strong>Resident engagement.</strong> EL planned tests must be notified to
                residents; failures affecting common parts must be communicated; remediation
                schedules must be transparent. The engagement strategy records the communication.
              </li>
              <li>
                <strong>Audit cadence.</strong> The BSR audits HRBs on a schedule and risk-based
                trigger. Stage 1 audits review documentation; Stage 2 may involve site
                inspection. EL records are routinely sampled.
              </li>
              <li>
                <strong>Change of duty holder.</strong> Where the AP changes (sale, restructure),
                the safety case and Golden Thread transfer; the new AP registers with the BSR;
                the EL evidence transfers as part of the package.
              </li>
              <li>
                <strong>Penalties.</strong> BSA 2022 creates new offences for non-compliance with
                the HRB regime — e.g. failing to register, failing to maintain a safety case,
                failing to comply with a BSR notice. Penalties are substantial.
              </li>
            </ul>
            <p>
              For the duty holder, the practical implication is digital-first record management
              with strong version control, audit trail, and integration into the building safety
              case management system. Paper-only records, fragmented contractor systems without
              export, and ad-hoc filing are all unsustainable for HRBs.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Retention rules</ContentEyebrow>

          <ConceptBlock
            title="How long to keep what — and why"
            plainEnglish="There is no single statutory retention period for fire safety records in the RRO 2005 itself. But several considerations converge on a practical baseline of 6 years for routine records, and permanent retention for foundation documents. For HRBs, life-of-building retention applies through the Golden Thread. Different documents have different retention drivers — civil limitation periods, prosecution evidence, future audit, modification baseline, and (in HRBs) regulatory mandate."
          >
            <p>Retention rules for the EL documentation set:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fire risk assessment — current + history.</strong> The current FRA must be
                held permanently while the building exists. Previous versions should be retained
                to evidence review history and significant change tracking. 6 years is the
                minimum; longer is better.
              </li>
              <li>
                <strong>BS 5266-1:2025 design-and-installation record — life of installation.</strong>
                BS 5266-1:2025 §11 expressly requires retention for the life of the installation.
                The record is the foundation of every subsequent maintenance, audit and
                modification. Permanent retention; transfers to new owner on sale.
              </li>
              <li>
                <strong>Commissioning certificate — permanent.</strong> The original commissioning
                certificate is the day-of-handover evidence. Loss of the commissioning certificate
                cannot be reconstructed; it must be retained permanently. Often combined with the
                design record.
              </li>
              <li>
                <strong>BS EN 50172:2024 logbook — 6 years rolling minimum.</strong> The on-going
                test record. 6 years aligns with civil limitation periods and most insurance
                expectations. For HRBs, life of building (Golden Thread). Many operators retain
                permanently as part of the building's record.
              </li>
              <li>
                <strong>5-year photometric verification — permanent.</strong> Each verification
                certificate is retained. The series provides the empirical history of EL
                performance over time.
              </li>
              <li>
                <strong>BS EN 60598-2-22 luminaire certificates — life of luminaire +
                replacement.</strong> Retained while the luminaire is installed. On replacement,
                the new certificate replaces it; the historic certificate may be retained for
                provenance.
              </li>
              <li>
                <strong>EIC + EICR — life of installation.</strong> Original EIC retained while
                the installation exists. EICRs retained until superseded by the next periodic;
                some operators retain the full series.
              </li>
              <li>
                <strong>Action plan + closure evidence — 6 years rolling minimum, permanent for
                significant remediations.</strong> A modification of the building's EL provision
                is itself a significant event; the closure evidence is part of the design history.
              </li>
              <li>
                <strong>Training records — duration of employment + 6 years.</strong> Per-employee
                training records evidence Article 21 compliance; retained at least 6 years after
                employment ends.
              </li>
              <li>
                <strong>HRB Golden Thread — life of building.</strong> All records held within
                the Golden Thread are retained for the life of the building. Transfer on sale.
              </li>
            </ul>
            <p>
              The simplest rule for non-HRB buildings: 6 years rolling for routine documents,
              permanent for foundation documents. For HRBs: life of building. For the practical
              operator, digital storage with backup is almost always preferable to paper — paper
              is lost, damaged, mis-filed; digital is portable, version-controlled, searchable.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Digital vs paper — the practical tradeoffs</ContentEyebrow>

          <ConceptBlock
            title="Choosing the right format for the right document"
            plainEnglish="Most operators have moved or are moving to digital documentation. Digital brings searchability, portability, version control, audit trails and — critically for HRBs — Golden Thread compatibility. But digital also brings risks paper did not have: contractor-system dependency, cyber-attack surface, format obsolescence, hosting cost recurrence. The practical answer for most premises is digital-first with paper backup for the most critical records and on-site availability for live audit."
          >
            <p>Digital advantages and risks:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Digital advantages.</strong> Searchable; version-controlled; audit trail;
                portable; multi-user access; integrates with building management systems and
                Golden Thread; supports automated test logging via BS EN 62034 self-test
                luminaires; reporting and trend analysis.
              </li>
              <li>
                <strong>Digital risks.</strong> Contractor-system dependency (records held by
                maintenance contractor; loss on contract change); cyber-attack on the host or the
                RP's own systems; format obsolescence (proprietary file formats becoming
                unreadable); cost recurrence (subscription models); access dependency (offline
                access at audit time may not be available).
              </li>
              <li>
                <strong>Paper advantages.</strong> No format obsolescence; no host dependency; no
                login required; immediate availability at audit; tamper-evidence through original
                signatures; legal acceptance long-established.
              </li>
              <li>
                <strong>Paper risks.</strong> Lost; damaged (water, fire, mould); mis-filed;
                illegible (handwriting, fading); not searchable; not portable; difficult to share
                across multiple stakeholders; storage volume.
              </li>
              <li>
                <strong>Hybrid practice.</strong> Digital primary + paper backup for foundation
                documents (FRA, design-and-installation record, commissioning certificate, current
                EICR, evacuation plan). Live logbook entries are typically digital; historical
                logbook archives may be in either format.
              </li>
              <li>
                <strong>Contract terms.</strong> Where records are held in a contractor system,
                the maintenance contract should expressly require: export of all records in a
                portable format on a defined schedule (typically monthly or quarterly); provision
                of all records in a portable format on contract termination; tamper-evident audit
                trail; access for the RP at all times.
              </li>
              <li>
                <strong>HRB-specific.</strong> Golden Thread requirements drive digital-first.
                Paper-only records are insufficient. Format must be machine-readable, structured,
                accessible to the BSR.
              </li>
              <li>
                <strong>RP-side independence.</strong> The RP retains the legal duty regardless
                of who hosts the system. Reliance on a single contractor system without
                independent retention is a single point of failure. Best practice: maintain a
                second copy of all records on RP-controlled storage.
              </li>
            </ul>
            <p>
              Format is a means; legal compliance is the end. Whatever format is used, the records
              must be: complete; current; accurate; tamper-evident; producible on demand;
              portable on transfer of duty. Format choice should serve those requirements, not
              substitute for them.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Surviving a no-notice audit</ContentEyebrow>

          <ConceptBlock
            title="The duty manager's playbook"
            plainEnglish="An FRS inspector can arrive without notice under Article 27. Most do not — but the right to is unconditional. The duty manager on shift may be the most junior person on premises but is the one who must respond. The right response is: co-operate; produce what can be produced; explain candidly any unavailability; record what is asked for and what is provided. Refusal, evasion, and false statements are themselves offences. A duty manager who handles a no-notice audit competently materially improves the building's regulatory position; one who handles it badly worsens it."
            onSite="Every duty manager handover should include the EL documentation location, the access protocol, the names and contact details of the RP and the competent person, and the basics of what an inspector is likely to ask for. The 5-minute briefing at handover prevents 5 hours of regulatory difficulty if an inspector arrives during the shift."
          >
            <p>The duty manager's no-notice audit playbook:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Confirm identity.</strong> Ask to see the inspector's authority. They
                will have a card; check the issuing authority and the inspector's name. This is
                not obstruction — it is good practice.
              </li>
              <li>
                <strong>Permit entry.</strong> Refusing entry under Article 27 is itself an
                offence. Permit entry promptly.
              </li>
              <li>
                <strong>Notify the RP and competent person.</strong> The RP must know an audit is
                in progress. The competent person (often the maintenance contractor) may need to
                attend.
              </li>
              <li>
                <strong>Produce the core documents.</strong> The FRA, the design-and-installation
                record, the logbook, the commissioning certificate, the most recent 5-year
                photometric, the EIC / EICR, the evacuation plan, the cause-and-effect document,
                training records, the action plan. Know where they are and produce them.
              </li>
              <li>
                <strong>Explain unavailability candidly.</strong> If a document cannot be produced
                — locked office, contractor system not accessible, missing — say so honestly.
                Offer a timescale for retrieval. Do not invent records or claim availability that
                does not exist.
              </li>
              <li>
                <strong>Accompany the building walk-through.</strong> The inspector will likely
                walk escape routes, refuges, plant rooms. The duty manager should accompany —
                witnessing what is found is important.
              </li>
              <li>
                <strong>Record what is asked.</strong> Note the inspector's questions and the
                answers given. Note any defects identified, any documents copied or retained, any
                samples taken. The note becomes the duty manager's report to the RP.
              </li>
              <li>
                <strong>Do not sign anything you do not understand.</strong> The duty manager may
                be asked to sign a record of attendance or a statement; only sign what is
                accurately recorded and within the duty manager's knowledge. The RP can refer
                disputed matters back later.
              </li>
              <li>
                <strong>Report to the RP immediately.</strong> A complete handover note: time of
                audit, inspector name and authority, scope, documents produced, defects
                identified, samples taken, departure time. The RP may need to act within hours.
              </li>
              <li>
                <strong>Do not falsify or destroy records.</strong> Whatever the temptation, this
                is the worst possible response. Falsification and destruction are themselves
                offences and they aggravate the underlying findings significantly. Truth and
                co-operation are the right responses, even where the underlying evidence is
                imperfect.
              </li>
            </ul>
            <p>
              A no-notice audit handled well leaves the building in the same regulatory position
              it was in beforehand — neither better nor worse, simply tested. A no-notice audit
              handled badly compounds the underlying issues and adds new offences on top. The
              duty manager training cost is small; the protection it gives is large.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Telling the inspector 'the maintenance contractor has the records' without being able to retrieve them"
            whatHappens="An FRS inspector arrives at a 3-storey commercial premises and asks for the EL logbook. The duty manager says 'our contractor holds those — they have a portal, but only my boss has the login'. The boss is on holiday. The inspector cannot see the logbook. The audit notes 'records not produced — contractor portal access not available on site'. Combined with two visible defects (a missing escape sign light and a non-functioning luminaire on a sample test), this becomes the basis for an Article 30 enforcement notice. The defence — 'we have the records, they are just not accessible right now' — does not fix the audit finding."
            doInstead="Records must be on-site or immediately accessible electronically by whoever is on duty. Either: keep an exported copy of the logbook on a secure on-site computer or printed; ensure every duty manager has portal access; or maintain a parallel paper logbook on-site that is updated when the contractor's digital records are updated. The contract with the maintenance contractor should require monthly export of records to an RP-controlled location. The inspector should never have to wait for off-site access to see core records."
          />

          <Scenario
            title="The mixed-use building — multi-RP audit co-ordination"
            situation="A 5-storey mixed-use building has retail at ground (single tenant), serviced offices on floors 2-3 (managed by a third-party operator), and 12 residential flats on floors 4-5 (owned by individual leaseholders, managed by an RMC). The freeholder is the RP for common parts. The retail tenant is its own RP. The serviced office operator is its own RP. The RMC manages the residential common parts on behalf of the leaseholders. An FRS inspector arrives requesting evidence of EL compliance across the building."
            whatToDo="The freeholder, as RP for the common parts, takes the lead under Article 22 co-operation arrangements. The freeholder produces: the common-parts FRA; the BS 5266-1:2025 design-and-installation record for common parts EL (stairs, lobbies, plant rooms, external escape routes); the common-parts logbook; the 5-year photometric verification; the EIC for common-parts EL; the building evacuation plan and Person-Centred Fire Risk Assessments / PEEPs for residents needing assistance under SI 2025/797 (Fire Safety (Residential Evacuation Plans) (England) Regulations 2025); resident fire safety instructions under Reg 9 of SI 2022/547; quarterly common-parts and annual flat-entrance fire-door check records under Reg 10 of SI 2022/547. The retail tenant produces its own FRA, EL records and design for the demised retail unit. The serviced office operator produces its own FRA, EL records and design for floors 2-3. The RMC produces the residential common-parts records (which may be combined with the freeholder's records depending on the lease structure). The inspector cross-checks the boundaries — does the freeholder's record reference the tenants' EL? do the tenants' records reference the common parts? are there gaps where one RP assumes another is responsible? Article 22 co-ordination is tested at the boundaries, where most failures are found."
            whyItMatters="Multi-RP buildings are where most documentation gaps occur. The freeholder thinks the tenant has it; the tenant thinks the freeholder has it; nobody has it. FRS inspectors specifically test these boundaries. The lead-RP co-ordination (freeholder + each tenant + the RMC) is the right answer; pre-audit co-ordination meetings, shared documentation protocols, and lease clauses requiring information sharing are how the right answer is operationalised before an audit forces it."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'The 12 core documents — FRA, BS 5266-1:2025 design-and-installation record, commissioning certificate, BS EN 50172:2024 logbook, BS 5266-1:2025 5-year photometric verification, BS EN 60598-2-22 luminaire certificates, BS 7671 EIC, BS 7671 EICR, BS 5839-1 fire alarm + cause-and-effect, evacuation plan + PEEPs, training records, manufacturer data + replacement schedule.',
              'BS EN 50172:2024 logbook — daily (where applicable) / monthly functional / annual full-duration. Per luminaire, pass / fail, dated, signed, remediation tracked.',
              'BS 5266-1:2025 5-year photometric — NEW. Empirical in-service illuminance verification against design. Catches LED depreciation and design drift.',
              'RRO 2005 Article 27 — inspector powers of entry, examination, demand for records, sample-taking, information demand. Obstruction is itself an offence.',
              'Article 29 alterations notice (pre-modification); Article 30 enforcement notice (≥ 28 days remediation, premises in use); Article 31 prohibition notice (immediate; imminent serious risk).',
              'Article 32 offences — Articles 8-22 failures placing relevant persons at risk of death or serious injury; unlimited fine + 2 years on indictment. Falsification + obstruction are separate offences.',
              'BSA 2022 HRBs — emergency lighting evidence integrates into the safety case (s.83) and the Golden Thread. BSR audits both. MOR for safety-critical occurrences.',
              'Retention — 6 years rolling for routine records; permanent for foundation documents (FRA, design-and-installation record, commissioning certificate, EIC, 5-year photometric); life-of-building for HRBs.',
              'Digital is industry norm; paper is fallback. Whichever format, records must be tamper-evident, portable, complete, current and producible on demand. The RP retains the duty regardless of who hosts.',
              'Surviving a no-notice audit — confirm identity; permit entry; notify RP + competent person; produce core docs; explain unavailability candidly; do not falsify; record what is asked; report fully to the RP.',
              'Multi-RP buildings — boundary co-ordination is where failures hide. Article 22 co-operation operationalised before an audit forces it.',
              'A complete documentary trail does not just survive audit — it shortens audit, signals competence, and protects against prosecution if a fire occurs.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'What happens if our maintenance contractor goes out of business and we lose access to the digital logbook?',
                answer:
                  'The RP remains responsible for the records. If the contractor system was the only copy, the RP must reconstruct the logbook as best as possible, document the loss in the FRA significant findings, commission a fresh competence audit of the EL system (effectively a re-commissioning verification), and adopt new digital infrastructure under RP control. The lesson — the maintenance contract should require regular export of all records to an RP-controlled location, and the RP should hold an independent copy at all times. Single-system reliance is a single point of failure.',
              },
              {
                question: 'Do we need to keep paper copies if we have digital records?',
                answer:
                  'Not strictly — digital is acceptable for all RRO purposes. But there is a strong practical case for paper backup of foundation documents (FRA, design-and-installation record, commissioning certificate, current EICR, evacuation plan) on-site near the fire alarm panel. Paper survives power outages, network failures and contractor system unavailability. For HRBs the Golden Thread is digital-first; for non-HRB premises, hybrid (digital primary + paper backup) is the operating norm.',
              },
              {
                question: 'How does the BS 5266-1:2025 5-year photometric verification interact with the annual full-duration test?',
                answer:
                  'They are different tests. The annual full-duration test (BS EN 50172:2024) confirms each luminaire works for the rated duration — typically 3 hours under load. It is a functional test. The 5-year photometric (BS 5266-1:2025) measures actual delivered illuminance at sample points and compares it to the design — it is an empirical performance test. A luminaire can pass the annual but fail the photometric (degraded LED, surface change, layout change). Both are required; neither replaces the other.',
              },
              {
                question: 'Can the FRS inspector actually take away our documents?',
                answer:
                  'They can take copies. Article 27(1)(g) permits the inspector to inspect documents and take copies. The originals remain with the RP. Where the inspector wishes to retain originals (rare; typically only for evidential purposes in a serious case), they will issue a formal notice and provide receipts. In practice, modern inspections involve photographing or scanning documents on site rather than removing them.',
              },
              {
                question: 'Our building is a small 2-employee shop. Do we still need all 12 documents?',
                answer:
                  'Some are inapplicable (e.g. PEEPs may not be needed; Reg 8 wayfinding signage applies to HRBs only). But the core set still applies: FRA (even for small premises), EL design record (proportionate to the installation), commissioning certificate (whatever was provided at install), logbook (monthly + annual tests), luminaire certificates, EIC, evacuation plan (proportionate). The proportionate-to-risk principle applies — a small low-risk shop has a smaller documentation set than a hotel — but the core categories remain.',
              },
              {
                question: 'How do we evidence that our maintenance contractor is competent?',
                answer:
                  'Hold copies of: company third-party certification (BAFE SP203, NICEIC fire detection, ECA / NICEIC for electrical); individual technician training certificates and CPD records; ICEL / Industry Committee for Emergency Lighting framework alignment; insurance evidence; references. The contract should specify the competence requirements for each test (monthly, annual, 5-year photometric — the last requires more skill than the others). The RP is responsible for verifying competence; outsourcing the work does not outsource the duty.',
              },
              {
                question: 'A fire occurs and emergency lighting did not work. What is the documentary impact?',
                answer:
                  'The post-incident investigation focuses on the documentary trail. Investigators (FRS, HSE, police) review: when the system was last tested; whether failures were recorded; whether remediation was actioned; whether the FRA identified the route as adequately illuminated; whether the design was compliant; whether the maintenance contract was performed. Missing or falsified records aggravate the offence. A full, current, accurate trail evidencing competent management is the strongest defence — it does not eliminate the breach but it materially affects sentencing. The Sentencing Council guideline weighs documentary diligence as a mitigating factor.',
              },
              {
                question: 'What is the difference between the design-and-installation record and the commissioning certificate?',
                answer:
                  'The design-and-installation record (BS 5266-1:2025 §5 + §11) is the master document — the design intent, photometric calculations, equipment schedule, layout drawings, FRA-design map, test regime. It evolves with the installation — modifications update it. The commissioning certificate is the day-of-handover acceptance — the competent person\'s signed confirmation that the design has been built and tested to deliver the specified illuminance, with in-situ measurements at sample points. The two are linked: the commissioning certificate references the design record; both are retained permanently.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Documentation for audits and fire authorities — Module 6.4"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate(
                  '/electrician/upskilling/emergency-lighting-module-6-section-3'
                )
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.3 EL in risk assessments
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Complete Module 6
              </div>
            </button>
          </div>

          <div className="hidden">
            <FileCheck />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule6Section4;
