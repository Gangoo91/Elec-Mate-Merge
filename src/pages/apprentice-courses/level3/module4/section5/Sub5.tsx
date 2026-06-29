/**
 * Module 4 · Section 5 · Subsection 5 — Reporting + handover documentation
 * Maps to C&G 2365-03 / Unit 303 / LO5 / AC 5.4 + AC 5.5
 *   AC 5.4 — "specify the procedures for the safe disposal of waste materials"
 *   AC 5.5 — "specify the procedures for informing relevant persons about the
 *             rectification work"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 5.6 — specify the procedures for
 * informing relevant persons; AC 5.7 — appropriate documentation.
 *
 * Frame: rectification is not finished until the documentary trail is closed.
 * Minor Works Certificate, EIC, EICR + Schedule of Remedial Works, Duty
 * Holder briefing, Building Control / Building Regs notification under Part P
 * for notifiable work, customer warranty handover, internal job sheet update.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  "Reporting + handover documentation (5.4/5.5) | Level 3 Module 4.5.5 | Elec-Mate";
const DESCRIPTION =
  "Closing the documentary trail on a rectification job — Minor Works Certificate, EIC, EICR + Schedule of Remedial Works, Building Control under Part P for notifiable work, customer warranty, BS 7671 A4:2026 currency on every certificate field.";

const checks = [
  {
    id: "mod4-s5-sub5-cert-choice",
    question:
      "You've replaced a failed 32 A RCBO on a domestic kitchen ring. The original installation was certificated to BS 7671 18th Edition Amendment 2 (2022). Which certificate do you issue for the rectification?",
    options: [
      "Electrical Installation Certificate (EIC) — a protective-device swap counts as a significant addition needing the full three-signature EIC.",
      "Minor Works Certificate (MWC) — replacement of an existing protective device on an existing circuit, no new circuits.",
      "Electrical Installation Condition Report (EICR) — testing an existing circuit means the correct output is a coded condition report.",
      "No certificate required — a like-for-like RCBO swap is routine maintenance you record only on the job sheet.",
    ],
    correctIndex: 1,
    explanation:
      "Like-for-like replacement on an existing circuit = Minor Works Certificate; it records the work done, the test results on the affected circuit (continuity, IR, polarity, R1+R2, Zs, RCD trip-time) and the edition tested to (BS 7671:2018+A4:2026 in 2026). New circuit or significant addition = EIC; periodic check = EICR; an RCBO swap needs no EIC and is never 'no certificate'. Choosing wrong undermines the documentary trail.",
  },
  {
    id: "mod4-s5-sub5-part-p",
    question:
      "Domestic kitchen, you've replaced a failed RCBO. Is this notifiable under Part P?",
    options: [
      "Yes — every piece of electrical work in a dwelling is notifiable under Part P, however small, including an RCBO swap.",
      "Yes — any work involving a protective device is notifiable because it touches the consumer unit and affects installation safety.",
      "No — replacing an existing protective device is maintenance, not a new circuit, so it is not notifiable.",
      "It depends only on the job's value — any work over £100 must be notified, regardless of the nature of the work.",
    ],
    correctIndex: 2,
    explanation:
      "Part P (Approved Document P) makes new circuits, consumer-unit replacements and special-location work (bathroom Zones 0/1/2, pools, saunas) notifiable. A like-for-like protective-device swap is not a new circuit — it is maintenance, recorded on a Minor Works Certificate with no Building Control submission. Notification is never triggered by cost. For notifiable work the contractor must be a registered competent person (NICEIC, NAPIT, ELECSA, STROMA) notifying via the scheme portal.",
  },
  {
    id: "mod4-s5-sub5-eicr-update",
    question:
      "The original fault was found during an EICR — a C2 (Potentially Dangerous) coded against the kitchen ring for a failing RCD. You've now rectified it. What's the documentary closure?",
    options: [
      "Schedule of Remedial Works referenced back to the original EICR, plus the Minor Works Certificate for the rectification work itself.",
      "Re-issue the whole EICR with the C2 re-coded as satisfactory — the amended report is the only document needed.",
      "Verbal confirmation to the Duty Holder that the C2 is cleared — written schedules and certificates are unnecessary once the work is done.",
      "Nothing beyond the invoice — once the work is paid for, the C2 is automatically closed and the next inspector simply re-tests.",
    ],
    correctIndex: 0,
    explanation:
      "The Schedule of Remedial Works (or 'Remedial Action Notice') is the documentary bridge between an EICR finding and the rectification proof: it lists each coded item, the action taken, the new test result, date and signature. The Duty Holder keeps the EICR + Schedule + MWC together for the next inspector (typically 5 years domestic, 1 year commercial/landlord). Without the Schedule the next inspector cannot tell whether the C2 was ever closed; a verbal say-so or the invoice alone leaves the finding open.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "BS 7671:2018+A4:2026 changed the model forms. What's the most visible change on the Minor Works Certificate that the L3 apprentice needs to be aware of in 2026?",
    options: [
      "No changes — the A4:2026 Minor Works Certificate is identical to the Amendment 2 (2022) form, so old stock can be used indefinitely.",
      "Added AFDD acknowledgement, a PNB earthing entry and explicit Protective Equipotential Bonding verification fields on the model form.",
      "Removed the test-results panel from the form — readings now belong solely on the EICR, so no Zs or IR is recorded on an MWC.",
      "Made the MWC a three-page document with a full Schedule of Inspections, withdrawing the single-page form for every repair.",
    ],
    correctAnswer: 1,
    explanation:
      "A4:2026 (effective January 2026) revised the Appendix 6 model forms: AFDD acknowledgement (type/location/result where fitted, an explicit 'not present' note where not), the supply-earthing field including TN-C-S/PNB, and explicit PEB verification fields. The test-results panel remains, the MWC is still single-page, and the edition field now reads BS 7671:2018+A4:2026. Using a pre-A4 form is a non-current document that undermines the certificate's evidential weight.",
  },
  {
    id: 2,
    question:
      "Who are the 'relevant persons' that need to be informed of a rectification under AC 5.5 / ELTK07 5.6?",
    options: [
      "Only the person who physically paid the invoice — the duty is simply about getting paid, so no one else has a claim on the record.",
      "Only the manufacturer of the failed device — informing Hager or MK that their product failed is the entire scope of the duty.",
      "The Duty Holder, the original designer, Building Control (for notifiable work), the firm's records and the next periodic inspector.",
      "Only the firm's accountant — the documentary trail goes to whoever raises the invoice internally and nowhere else.",
    ],
    correctAnswer: 2,
    explanation:
      "'Relevant persons' is broader than the paying customer: the Duty Holder (customer/employer/landlord) gets the certificate and hand-back; the original designer is told of any design change as a courtesy; Building Control is notified via the competent-person scheme for Part P notifiable work; the firm files its own records; and the next inspector is served by the certificate bundle left on file. No documentary closure means the next inspector starts from scratch and the firm carries no proof of work.",
  },
  {
    id: 3,
    question:
      "What's the difference between an EIC, an EICR and a Minor Works Certificate, and which one fits a typical fault rectification?",
    options: [
      "Three names for the same document — interchangeable terms for the certificate after any work, so pick whichever your software defaults to.",
      "Split by sector — EIC for domestic, EICR for commercial, MWC for industrial — so a house rectification always takes an EIC.",
      "Split by stage — EIC before the work, MWC during, EICR after — so every rectification completes all three in sequence.",
      "Three separate types — EIC for new circuits/significant additions, EICR for periodic inspection, MWC for like-for-like replacement; most rectifications are MWC.",
    ],
    correctAnswer: 3,
    explanation:
      "EIC (Designer/Constructor/Inspector panels) is for new installations, new circuits or significant additions. EICR is a periodic snapshot of existing condition with coded observations (C1/C2/C3/FI), not a certificate of work done. MWC covers alterations or additions that are not new circuits — accessory or protective-device replacement, a single added point. They are not interchangeable, not split by sector, and not job stages; most fault rectifications are MWC because the work is on an existing circuit.",
  },
  {
    id: 4,
    question:
      "Why does the Minor Works Certificate require test results on the AFFECTED circuit even when the work was a simple replacement?",
    options: [
      "BS 7671 Part 6 643 requires verification testing of any worked-on circuit — the affected work has changed it electrically, so measured results are mandatory.",
      "It doesn't really — the test panel is optional on a like-for-like swap because the circuit design hasn't changed, so the readings can be left blank.",
      "Only to record the serial number — the 'test results' on an MWC are the part numbers of what was fitted, not electrical measurements.",
      "So the manufacturer can validate the warranty — the readings register the RCBO with the maker, which is the only reason the panel is completed.",
    ],
    correctAnswer: 0,
    explanation:
      "BS 7671 Part 6 (Inspection and Testing) is the verification framework: the MWC test panel records continuity of CPC, IR, polarity, R1+R2, Zs and RCD trip-time at I&Delta;n where RCD-protected. If the work has affected the circuit electrically — and a protective-device swap certainly has — measured verification is mandatory. The readings are the substance of the certificate, not part numbers or warranty data, and 'it looks fine' is no substitute for measurement.",
  },
  {
    id: 5,
    question:
      "What's the L3 apprentice's role in the certificate signing — Designer, Constructor, Inspector?",
    options: [
      "The apprentice signs all three panels on every job — as the person who did the work they are responsible for the whole certificate, regardless of supervision.",
      "It depends on competence and supervision — typically Constructor under supervision, with Designer and Inspector signed by a qualified person.",
      "The apprentice never signs — the customer signs all three panels because they are paying for the work and take responsibility for it.",
      "The apprentice signs whichever panel has space left — the three panels are interchangeable, so any empty box will do.",
    ],
    correctAnswer: 1,
    explanation:
      "Signature authority is a competence question (EAWR Reg 16 — sign only what you are competent to sign), not a courtesy and not a customer's role. The L3 apprentice typically signs Constructor under supervision; the Inspector panel needs verification competence (supervisor or JIB Approved Electrician, usually after C&G 2391/2394/2395) and Designer needs design competence (qualified electrician or engineer). The panels confirm different things and are not interchangeable.",
  },
  {
    id: 6,
    question:
      "A landlord has had an EICR with a C1 (Danger Present) finding on a kitchen socket — burnt back-box, exposed live conductors. You're sent to rectify. What's the documentary urgency?",
    options: [
      "No urgency on the paperwork — a C1 only needs documenting at the next EICR in five years, so the Schedule of Remedial Works can wait.",
      "The deadline is twelve months — a C1 is the least urgent code, so provided the danger is made safe today the paperwork can follow at leisure.",
      "C1 is the most serious code — under the Private Rented Sector Regulations 2020 the landlord must act and document within the regulation timeline.",
      "No documentation is needed for a C1 — once the burnt socket is made safe the matter is closed and a certificate is optional.",
    ],
    correctAnswer: 2,
    explanation:
      "C1 (Danger Present) demands immediate action. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 (and equivalents in Wales/Scotland/NI) landlords must act on C1 findings within 28 days and immediately where the danger is live-and-present. The MWC + Schedule of Remedial Works closing the C1 is the landlord's proof of compliance and defence against a fine of up to £30,000 per breach; documentary turnaround speed matters as much as physical rectification.",
  },
  {
    id: 7,
    question:
      "What's the practical workflow for issuing a Minor Works Certificate on site in 2026?",
    options: [
      "Write the certificate up at the office at the end of the week from memory, reconstructing the readings later and posting it to the customer once typed up.",
      "Hand the customer a blank certificate to complete themselves — it is their record, so they fill in the details and sign while the apprentice gives readings verbally.",
      "Skip the certificate on site and post one only if the customer asks — most never want the paperwork, so close the job on the invoice alone.",
      "Use a digital MWC app on site — pre-load the details, enter test results as you measure, sign and email the PDF, in 5&ndash;10 minutes.",
    ],
    correctAnswer: 3,
    explanation:
      "Digital certificate workflows are now the norm (Elec-Mate's MWC builder, NICEIC Online, ElectricalCertifyPro, iCertifi): open the app, pull installation details, enter the work done and test results as you measure with the MFT, sign Designer/Constructor/Inspector, customer signs receipt, PDF emailed and copy filed. It is done on site, not reconstructed later, not handed to the customer to fill in, and not optional. Paper MWC remains a valid fallback.",
  },
  {
    id: 8,
    question:
      "If the customer challenges the certificate at a later date — saying 'the fault came back, your rectification was wrong' — what does the documentary record protect?",
    options: [
      "Three layers — the measured test results, the signed competence panels, and the customer's signed receipt of hand-back acceptance.",
      "Nothing — the certificate carries no evidential weight in a dispute, so the firm's only defence is to return and re-do the job free of charge.",
      "Only the customer — the certificate is solely their insurance proof and in a dispute works against the firm; the firm relies on the invoice instead.",
      "Only the manufacturer — the certificate records which RCBO was fitted, shifting blame to the maker rather than evidencing the firm's workmanship.",
    ],
    correctAnswer: 0,
    explanation:
      "The MWC test results (Zs, IR, R1+R2, RCD trip-time within BS 7671 limits) evidence the circuit was sound at hand-back, so a recurrence points to a post-rectification cause; the signed panels evidence competence and QA; the customer's signed receipt evidences acceptance. Together they are the firm's defence against a 'your work was wrong' claim and support the customer's insurance/sale records — protection for both, not just one party or the device maker.",
  },
];

const faqs = [
  {
    question: "When does an EICR need to be issued instead of a Minor Works Certificate?",
    answer:
      "EICR is the periodic inspection report, not a certificate of new work. It records the condition of an existing installation at a point in time, with coded observations (C1 Danger Present, C2 Potentially Dangerous, C3 Improvement Recommended, FI Further Investigation). A rectification job is not an EICR — it's a Minor Works (small scope) or EIC (new circuit / significant addition). The EICR comes around on a periodic cycle (5 years domestic owner-occupied, 5 years rented under Private Rented Sector Regulations 2020, 1 year commercial typical). If a rectification is part of closing an EICR finding, the MWC + Schedule of Remedial Works references back to the EICR but does not replace it.",
  },
  {
    question: "What does BS 7671 A4:2026 mean and do I need to use new forms?",
    answer:
      "A4:2026 is Amendment 4 to BS 7671:2018, effective January 2026. It updates several technical sections (AFDD provisions in Section 421, TN-C-S terminology shift to PNB where appropriate, supplementary requirements in Section 722 for EV charging, updated bonding requirements) and updates the model forms in Appendix 6. From January 2026, certificates should reference 'BS 7671:2018+A4:2026' in the edition field, and the model forms should be the A4 versions with the AFDD acknowledgement and PEB verification fields. Pre-A4 forms are still mechanically valid but technically out-of-date and should be replaced as soon as the firm's stock allows.",
  },
  {
    question: "What's a Schedule of Remedial Works and when do I issue one?",
    answer:
      "Schedule of Remedial Works (sometimes 'Remedial Action Notice') is the documentary bridge between an EICR finding and the rectification work that closes it. It lists each coded item from the EICR, the action taken, the date, the new test result, and the contractor signature. It accompanies the Minor Works Certificate (or EIC) for the actual rectification work. Together the EICR + Schedule + MWC form the audit bundle the Duty Holder retains. The Schedule is not a replacement for the cert — both are needed, the cert proves the work was done correctly, the Schedule proves it closed the EICR finding.",
  },
  {
    question: "Is consumer unit replacement always notifiable under Part P?",
    answer:
      "Yes — full consumer unit replacement is on the list of notifiable work in Part P (Approved Document P, England and Wales). The contractor must be a registered competent person under one of the schemes (NICEIC, NAPIT, ELECSA, STROMA, NETWORKING, BSI Kitemark) and notify Building Control via the scheme's online portal within 30 days. Notification fee is normally bundled with the scheme membership; the customer gets a Building Regulations Compliance Certificate from the scheme that confirms the work meets Part P. If you replace just an MCB or RCBO inside the existing CU (not the whole unit), that's NOT notifiable — it's like-for-like maintenance.",
  },
  {
    question: "Can the customer refuse to sign the certificate?",
    answer:
      "The customer's signature on the MWC / EIC is a receipt of hand-back, not approval of the work itself. They're acknowledging they've received the certificate and the work has been demonstrated. If a customer refuses to sign, the certificate is still valid — the contractor should note 'customer declined to sign on hand-back' on the certificate and email a copy to the customer's recorded email address. The contractor's signed Designer / Constructor / Inspector panels are the evidential weight of the certificate; the customer's signature is a record of receipt only. Most refusals come from misunderstanding ('I don't want to sign anything until I've checked the work') and a 30-second explanation of the receipt-vs-approval distinction usually resolves them.",
  },
  {
    question: "How long does the firm need to keep certificate copies?",
    answer:
      "Recommended retention is the lifetime of the installation (potentially 25&ndash;40 years for domestic). Practical minimum under Companies Act 2006 (statutory records) and HMRC VAT records is six to seven years. Professional indemnity insurance often requires longer retention (commonly the policy lifetime plus a tail for run-off claims). For Part P notifiable work, the competent-person scheme retains a copy via the notification record. The L3 apprentice's job is to ensure every certificate gets filed in the firm's job system; the firm's retention policy then handles the period. Lost certificates can be reissued by the original contractor if their records are intact, otherwise the customer needs a new EICR.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 5"
            title="Reporting + handover documentation"
            description="Closing the documentary trail — Minor Works Certificate, EIC, EICR + Schedule of Remedial Works, Building Control under Part P, customer warranty, A4:2026 form changes. The certificate is the firm's protection and the customer's proof; the L3 apprentice's job is to make sure it gets done right."
            tone="emerald"
          />

          <TLDR
            points={[
              "Certificate-type selection is part of L3 competence — Minor Works Certificate for like-for-like replacement, EIC for new circuits, EICR for periodic inspection.",
              "BS 7671 A4:2026 model forms include AFDD acknowledgement, PNB terminology, PEB verification fields — use the current forms, not pre-A4 stock.",
              "Part P (Approved Document P) makes new circuits, CU replacements, and special-location work notifiable to Building Control via the firm's competent-person scheme.",
              "Schedule of Remedial Works closes EICR findings — the documentary bridge between the original report and the rectification certificate.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Select the correct certificate type for a given rectification — MWC for like-for-like, EIC for new circuit, EICR for periodic inspection.",
              "Apply BS 7671 A4:2026 model forms with AFDD acknowledgement, PNB terminology and PEB verification fields.",
              "Apply Part P (Approved Document P) notifiability tests — new circuits, CU replacements and special locations notifiable; like-for-like replacement not notifiable.",
              "Issue a Schedule of Remedial Works that closes an EICR-coded finding and references the rectification certificate.",
              "Identify the relevant persons under AC 5.5 / ELTK07 5.6 — Duty Holder, Building Control, internal records, next inspector.",
              "Understand the legal timeline for landlord rectification under Electrical Safety Standards in the Private Rented Sector Regulations 2020 — 28 days for C1/C2, immediate for live danger.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Choosing the right certificate type</ContentEyebrow>

          <ConceptBlock
            title="EIC, EICR, MWC — three different documents for three different purposes"
            plainEnglish="The wrong certificate type still records the work but muddles the documentary trail. The L3 apprentice's first decision on closing a rectification is which form to use — and the choice depends on what was done, not what was found."
            onSite="Most fault rectifications are Minor Works Certificate jobs because the work is on an existing circuit and is like-for-like replacement. Confusion typically arises when a rectification grows in scope mid-job — a kitchen socket replacement that turns into a new circuit because the original ring was unsafe. The cert-type changes from MWC to EIC at the moment the work crosses the new-circuit boundary."
          >
            <p>The three certificate types in scope:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EIC (Electrical Installation Certificate)</strong> — new installations, new circuits, significant additions. Three signature panels (Designer, Constructor, Inspector). Test panel for the new work.</li>
              <li><strong>EICR (Electrical Installation Condition Report)</strong> — periodic inspection of an existing installation. Coded observations (C1, C2, C3, FI). Snapshot of condition, NOT a certificate of work done.</li>
              <li><strong>MWC (Minor Works Certificate)</strong> — alterations or additions that do not constitute a new circuit. Replacement of accessories or protective devices, addition of a single point. Most rectifications.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulations 644.1.1 (Defects to be corrected before Certificate issued) and 651.4 (Recording defects in a report)"
            clause={
              <>
                "644.1.1 For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued. 651.4 Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
              </>
            }
            meaning={
              <>
                Reg 644.1.1 is the rectification duty &mdash; defects revealed during inspection and testing must be corrected before the Certificate is issued. Reg 651.4 is the reporting duty &mdash; damage, deterioration, defects or dangerous conditions get recorded in a report. Together they bracket the post-verification work: rectify what you can before issuing the cert; record what you can&apos;t (or what was outside scope) on the report. For minor works the MWC is the form; the test schedules accompany it. Without the certificate and any associated report, the verification under BS 7671 has not been documentarily closed.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Regulations 644.1.1 and (where applicable) 651.4."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Part P notifiability — what triggers Building Control</ContentEyebrow>

          <ConceptBlock
            title="When the work needs Building Control notification (and when it does not)"
            plainEnglish="Part P (Building Regulations Approved Document P, England and Wales) sets out which electrical work in dwellings is notifiable to Building Control. The L3 apprentice's job is to know the trigger — and to make sure notifiable work goes through the firm's competent-person scheme. Doing notifiable work without notification is a Building Regulations breach and creates problems at house sale, insurance claim or regulatory inspection."
            onSite="The competent-person scheme (NICEIC, NAPIT, ELECSA, STROMA) handles the notification on behalf of the contractor — typically via an online portal within 30 days of the work. The scheme issues a Building Regulations Compliance Certificate to the customer. The contractor pays the scheme membership fee annually; per-job notification is normally included or low cost."
          >
            <p>Part P trigger summary:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>NEW CIRCUITS in dwellings</strong> — notifiable. Includes a new ring final, new lighting circuit, new shower circuit, new EV charger circuit.</li>
              <li><strong>CONSUMER UNIT REPLACEMENTS</strong> — notifiable.</li>
              <li><strong>SPECIAL LOCATIONS work</strong> — notifiable. Bathroom Zone 0/1/2, swimming pools, saunas, agricultural locations.</li>
              <li><strong>LIKE-FOR-LIKE replacement</strong> of existing accessories or protective devices on existing circuits — NOT notifiable. Maintenance, not new work.</li>
              <li><strong>ADDITIONS to existing circuits</strong> outside special locations — NOT normally notifiable (e.g. adding a single socket to an existing ring).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic={videos.faultFinding.topic}
          />

          <SectionRule />

          <ContentEyebrow>Closing an EICR finding — the Schedule of Remedial Works</ContentEyebrow>

          <ConceptBlock
            title="The documentary bridge between an EICR observation and a closed rectification"
            onSite="When a fault rectification is the closure action for an EICR-coded item, the documentary trail is — original EICR (records the C1/C2/C3/FI), Schedule of Remedial Works (lists the closure action and the test result), Minor Works Certificate (formal cert of the rectification work). The Duty Holder retains all three together. The next periodic inspector picks up the bundle and can see exactly what was found, what was done and when."
          >
            <p>The Schedule of Remedial Works contents:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Original EICR reference</strong> — date, certificate number, inspector.</li>
              <li><strong>Each coded item closed</strong> — the original observation, the action taken, the new test result.</li>
              <li><strong>Date of rectification</strong> — for landlord work this also evidences compliance with the Private Rented Sector Regulations 2020 timeline.</li>
              <li><strong>Contractor signature</strong> — Constructor or Inspector competence as appropriate.</li>
              <li><strong>Cross-reference to the MWC / EIC</strong> for the rectification work itself.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — Reg 3"
            clause={
              <>
                "A private landlord who grants or intends to grant a specified tenancy must &mdash; (a) ensure that the electrical safety standards are met during any period when the residential premises are occupied under a specified tenancy; (b) ensure every electrical installation in the residential premises is inspected and tested at regular intervals by a qualified person; AND (c) ensure the first inspection and testing is carried out before the tenancy commences, in relation to a new specified tenancy, OR by 1st April 2021, in relation to an existing specified tenancy."
              </>
            }
            meaning={
              <>
                Landlords must have an EICR every five years (or sooner if the previous EICR specified an earlier re-inspection date), and must rectify any C1, C2 or FI finding within 28 days (or sooner if the report specifies). Failure carries a fine of up to &pound;30,000 per breach. The Schedule of Remedial Works + Minor Works Certificate is the landlord's proof of compliance and their defence against the fine. For an L3 apprentice rectifying landlord work, documentary turnaround speed matters as much as physical rectification speed.
              </>
            }
            cite="Source: Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, Reg 3."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The Schedule of Test Results behind the certificate</ContentEyebrow>

          <ConceptBlock
            title="The certificate is the headline; the schedule is the evidence"
            plainEnglish="An EIC or MEIWC without a Schedule of Test Results is half a certificate. The schedule captures the readings that justify the &lsquo;satisfactory&rsquo; declaration and is what auditors and competent-person scheme assessors actually inspect."
            onSite="A4:2026 changed several Schedule of Test Results columns &mdash; AFDD column on the schedule, RCD trip-time entries reflect the single AC test (no 5&times;I&Delta;n column), TN-C-S identification now includes PNB. Use up-to-date model forms (2026 issue) rather than older A2:2022 templates."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Continuity of conductors</strong> &mdash; R1+R2 or end-to-end ring values per circuit.</li>
              <li><strong>Insulation resistance</strong> &mdash; L&ndash;L, L&ndash;N, L&ndash;E, N&ndash;E values per circuit; record the test voltage used (250&nbsp;V or 500&nbsp;V).</li>
              <li><strong>Polarity</strong> &mdash; tick column, with note where polarity verification was by other means than direct test.</li>
              <li><strong>Earth fault loop impedance</strong> &mdash; Zs per circuit, compared against the 80% Table 41.3 limit (32&nbsp;A B-curve = 1.37&nbsp;&Omega; on 230&nbsp;V under A4:2026).</li>
              <li><strong>RCD operation</strong> &mdash; trip current and trip time at I&Delta;n, single AC test under A4:2026.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Photographs, sketches and the wider record pack</ContentEyebrow>

          <ConceptBlock
            title="What goes alongside the certificate at handover"
            plainEnglish="The certificate is the formal piece of paper. The wider record pack is what makes the work defensible six months later when a question comes up &mdash; or six years later when the property changes hands."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Job sheet</strong> &mdash; chronological narrative of what was found, what was done, who authorised what.</li>
              <li><strong>Photographs</strong> &mdash; before / during / after at the work point and at the CU. Wide and close, time-stamped on the phone.</li>
              <li><strong>Sketches</strong> &mdash; cable routes, depth-from-surface, identification of any 522.6.204 covering used.</li>
              <li><strong>Customer correspondence</strong> &mdash; signed quote, signed advisory if a recommended option was declined, signed sign-off at handover.</li>
              <li><strong>Manufacturer documentation</strong> &mdash; data sheets for replacement devices retained on the job record, particularly for AFDDs and DC-capable RCDs.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Digital certificate platforms — NICEIC Online, Easycert and the audit trail"
            plainEnglish="Most rectification work in 2026 produces digital certificates rather than paper. NICEIC Online, NAPIT Online, Easycert, ElectricalCertificate.co.uk and similar platforms produce signed PDFs, store the certificate against the property's address, push notifiable work to Building Control through the competent-person scheme, and email the customer copy. The platform is the audit trail — retrieving a certificate years later relies on the platform's storage, not on the contractor's filing cabinet."
            onSite="Use the platform's BS 7671 A4:2026 model forms; older form templates may still be available in the dropdown but should not be used for current work. Customer details, certificate number, test data and signatures all live in the platform. The contractor signs digitally (typed name plus a credential check); some schemes also support drawn signature on tablet. The customer receives a PDF copy by email; the original sits in the platform indefinitely."
          >
            <p>
              What the digital platform handles automatically:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Building Control notification</strong> — for notifiable
                Part P work, the scheme submits the BCCC (Building Control
                Compliance Certificate) on the customer's behalf within 30 days.
              </li>
              <li>
                <strong>Customer copy delivery</strong> — emailed PDF to the
                address on file. Customer can download replacements at any
                point.
              </li>
              <li>
                <strong>Property history</strong> — addresses with multiple
                certificates accumulate a property-level history that
                conveyancing solicitors and future inspectors can pull.
              </li>
              <li>
                <strong>Scheme assessor sample</strong> — the competent-person
                scheme assessor pulls a random sample of certificates each
                quarter for the firm's QA review.
              </li>
              <li>
                <strong>Certificate retrieval</strong> — replacement copies for
                lost paper certificates available on demand from the platform.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Verbal handover — confirming with the customer at the doorstep"
            plainEnglish="The certificate is the documentary record; the verbal handover is what the customer remembers. Two minutes at the front door — explain what was done, where the new device sits, what the test results mean, what the certificate will arrive as. Customers who feel informed do not call back with anxious questions a week later. Customers who feel rushed call back, write reviews, or escalate to the firm's complaints team."
            onSite="Walk the customer to the consumer unit, point out the new device, demonstrate that the relevant circuit works (kitchen socket if the work was on the kitchen ring; lights if the work was on the lighting). Explain the test buttons (RCD test button, AFDD test button if fitted) and how often to press them (typically quarterly). Hand over the email copy of the certificate; explain that the paper copy will follow if the customer requested one. Confirm any aftercare (return visit, manufacturer warranty registration). Two minutes well spent."
          >
            <p>
              Verbal handover talking points after a rectification visit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>What was found and what was done</strong> — plain English,
                no jargon. "The RCD on your kitchen ring had failed; I've fitted
                a new one and tested the circuit; everything's safe and working."
              </li>
              <li>
                <strong>Test results in plain terms</strong> — "the RCD trips in
                under 30 milliseconds at fault current; that's well within the
                BS 7671 limit."
              </li>
              <li>
                <strong>Test button demonstration</strong> — show how to press
                the test button; how often (quarterly is typical); what to do if
                it does not trip.
              </li>
              <li>
                <strong>Certificate delivery</strong> — "the certificate will
                arrive by email today; the paper copy posts within five working
                days if you wanted one."
              </li>
              <li>
                <strong>Aftercare contact</strong> — leave a card; explain when
                to call back (any odd behaviour, repeated trips, smell of
                burning).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Internal job sheet update — closing the loop with the office"
            plainEnglish="Beyond the certificate, the firm's internal record needs updating. Job sheet status moves from open to complete; materials used go onto the invoice; time spent updates the productivity record; any out-of-scope work or upsell opportunity is flagged for the office to follow up. The L3 apprentice who closes the office loop cleanly is the apprentice the office assigns the next job to."
            onSite="Most firms use a CRM or job-management platform (ServiceM8, Tradify, Powered Now, Joblogic, Simpro). The phone app captures the job-complete status, the materials used (scanned barcodes or selected from the catalogue), photos of the work, the customer signature on the visit-complete form. The office sees the update in real time; the invoice goes out same day; the customer's next periodic inspection date goes into the diary. The certificate from the certification platform is attached to the customer record alongside the invoice."
          >
            <p>
              The internal record items that often get missed:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Materials used</strong> — every device, every metre of
                cable, every fitting. Drives the invoice and the stock count.
              </li>
              <li>
                <strong>Time on site</strong> — start and finish stamped;
                drives the labour line on the invoice.
              </li>
              <li>
                <strong>Photos</strong> — before, during, after; goes onto the
                customer record and protects the firm if a question arises
                later.
              </li>
              <li>
                <strong>Out-of-scope findings</strong> — the dodgy lighting
                circuit you noticed but were not paid to fix; the missing
                bonding at the gas meter; the plastic CU; flagged for the office
                to follow up with the customer.
              </li>
              <li>
                <strong>Upsell opportunities</strong> — surge protection,
                AFDDs, EV charger, smart controls, periodic inspection due in
                six months. The office decides whether to offer.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.4"
            clause={
              <>
                "Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
              </>
            }
            meaning={
              <>
                Whatever you discovered alongside the headline fault &mdash; the borderline IR reading on a different circuit, the missing label at the MET, the two breakers in the wrong slots &mdash; goes on the report. Reg 651.4 is the regulation that converts &ldquo;noticed it but it wasn&apos;t my call-out&rdquo; into &ldquo;recorded it on the customer&apos;s record&rdquo;.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.4."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Issuing an EIC for a like-for-like RCBO replacement"
            whatHappens={
              <>
                Apprentice has replaced a failed Hager 32&nbsp;A RCBO. Defaults to the EIC form
                because that's the one they're most familiar with. The EIC says "new installation /
                new circuit" at the top; the work was neither. The customer's Duty Holder records
                now contain a misleading certificate &mdash; the next inspector reading the EIC will
                assume a new circuit was added on that date and may look for evidence of the new
                circuit on the installation. Documentary noise that's avoidable.
              </>
            }
            doInstead={
              <>
                Like-for-like replacement on an existing circuit is a Minor Works Certificate every
                time. The MWC has its own field set, its own test panel, its own evidential weight.
                Choose the right form at the start of the cert build.
              </>
            }
          />

          <CommonMistake
            title="Skipping the Schedule of Remedial Works after closing an EICR finding"
            whatHappens={
              <>
                Apprentice rectifies a C2 finding from a recent EICR &mdash; replaces a failing RCD on
                the kitchen ring. Issues an MWC for the rectification. Doesn't issue a Schedule of
                Remedial Works back-referencing the EICR. Six months later the landlord faces a
                routine compliance check from the local authority's housing standards team and has
                the EICR (showing a C2) and the MWC (showing a rectification) but no documentary
                bridge between them. The C2 looks open; the landlord faces a notice of intent to
                fine.
              </>
            }
            doInstead={
              <>
                Always issue a Schedule of Remedial Works alongside the MWC when the rectification
                closes an EICR finding. Reference the original EICR cert number, list the coded
                item, state the action taken, attach the test result. Five extra minutes; eliminates
                the audit-trail gap.
              </>
            }
          />

          <Scenario
            title="Closing an EICR C1 on a landlord property"
            situation={
              <>
                A landlord's EICR (issued by another firm last week) has a C1 (Danger Present)
                against a kitchen socket &mdash; burnt MK Logic Plus K2747 back-box, exposed live
                conductors due to a long-running loose connection. The landlord has 28 days under
                the Private Rented Sector Regulations 2020 to rectify; their letting agent has
                booked you in for tomorrow. You arrive with a new MK socket, a new back-box, the
                Megger MFT1741 and an MWC pad on the laptop.
              </>
            }
            whatToDo={
              <>
                (1) Isolate at the Wylex DB; lock-off; prove dead at the socket with the Martindale
                VI-13800. (2) Remove the burnt socket and back-box; check the cable terminations
                for heat damage upstream &mdash; if the ring conductors are heat-damaged beyond the
                back-box, the rectification grows scope and you escalate to the supervisor. In this
                case the cable is undamaged. (3) Fit the new MK back-box, terminate the ring
                conductors with proper torque (1.2&nbsp;Nm typical for 2.5&nbsp;mm&sup2;), fit the
                new MK Logic Plus front. (4) Verify with the MFT1741 &mdash; continuity of CPC,
                IR at 500&nbsp;V, polarity, R1+R2, Zs, RCD trip-time. All within BS 7671 limits.
                (5) Issue the Minor Works Certificate via the laptop app &mdash; pre-load customer
                details, fill the work-done description, enter test results, sign Designer /
                Constructor / Inspector (Inspector panel under supervisor remote sign-off as needed
                for an apprentice). (6) Issue the Schedule of Remedial Works back-referencing the
                EICR cert number, the C1 observation, the action taken, the new test result, the
                date. (7) Email the bundle (MWC + Schedule) to the letting agent and the landlord;
                file copy in the firm's job system; verbal hand-back to the tenant on the way out.
                The landlord now has documentary proof of compliance within the 28-day window.
              </>
            }
            whyItMatters={
              <>
                C1 closure on landlord work is the documentary scenario where speed and accuracy
                BOTH matter. The 28-day timeline is legal, not advisory; the documentary bundle
                (MWC + Schedule + EICR) is the landlord's defence against the &pound;30,000
                per-breach fine; the next periodic inspector will pick up the bundle and rely on
                it. The L3 apprentice's role is to do the work, document it correctly, and turn it
                around in the time available. The case is the canonical illustration of why the
                certificate is not optional polish &mdash; it's the substance of compliance.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Minor Works Certificate for like-for-like replacement; EIC for new circuit / significant addition; EICR for periodic inspection.",
              "BS 7671 A4:2026 model forms include AFDD acknowledgement, PNB terminology, PEB verification fields — use current forms.",
              "Part P notifiable: new circuits, CU replacements, special-location work. Routed via competent-person scheme (NICEIC, NAPIT, ELECSA, STROMA) within 30 days.",
              "Schedule of Remedial Works closes an EICR finding — the documentary bridge between EICR and the rectification MWC / EIC.",
              "Landlord work under Private Rented Sector Regulations 2020 — C1 / C2 rectification within 28 days; £30,000 per breach for failure.",
              "BS 7671 643 verification testing is mandatory on any worked-on circuit — the test panel on the cert is the substance, not the polish.",
              "Signature competence: Constructor under supervision for an apprentice; Designer and Inspector require fully-qualified status.",
              "Digital cert apps (Elec-Mate MWC builder, NICEIC Online, ElectricalCertifyPro) take 5–10 minutes; instant customer hand-back via email.",
            ]}
          />

          <Quiz title="Reporting + handover documentation — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section5-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.4 Safe disposal + leave area safe</div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Section 6 — Apply rectification techniques</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
