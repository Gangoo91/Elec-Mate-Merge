/**
 * Module 5 · Section 5 · Subsection 1 — Periodic inspection (EICR) purpose and framework
 * Maps to C&G 2365-03 / Unit 304 / LO1 / AC 1.1
 *   AC 1.1 — "State the purpose of periodic inspection and testing of electrical installations"
 * Layered: 2357 Unit 607 ELTK06 / AC 6.1
 *          2366-03 Unit 302 / LO1 / AC 1.1
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

const TITLE = 'EICR purpose and framework | Level 3 Module 5.5.1 | Elec-Mate';
const DESCRIPTION =
  'Why periodic inspection and testing exists, where the EICR sits in the legal and regulatory framework — Electricity at Work Regulations 1989, BS 7671 Part 6 (CENELEC-aligned in A4:2026), GN3, ESF/Best Practice Guide 4 — and what an EICR is actually for.';

const checks = [
  {
    id: 'm5-s5-sub1-purpose',
    question: 'A landlord asks you for "a safety certificate" on a recently purchased rental dwelling. What is the correct document and why?',
    options: [
      'An Electrical Installation Certificate (EIC) — the standard safety certificate issued for any property, confirming the wiring meets BS 7671 whether new or existing.',
      'A Minor Electrical Installation Works Certificate (MEIWC) — the correct certificate for an existing dwelling because no new circuits are being added during the inspection.',
      'A PAT (Portable Appliance Test) certificate — it covers the safety of the electrical equipment in the dwelling, which is what landlord safety legislation requires.',
      'An Electrical Installation Condition Report (EICR) — it documents the condition of an existing installation in service, as the PRS Regulations 2020 require.',
    ],
    correctIndex: 3,
    explanation:
      'The EIC certifies new installation work (new circuits or whole installations) at the point of completion. The EICR is the periodic inspection report that assesses an existing installation in service. A landlord under the 2020 PRS regulations (England) must obtain an EICR at intervals of at most five years and supply a copy to the tenant within 28 days of inspection and to a new tenant before occupation. PAT testing addresses portable equipment, not fixed wiring.',
  },
  {
    id: 'm5-s5-sub1-eicr-vs-eaw',
    question: 'How does the Electricity at Work Regulations 1989 (EAWR) relate to BS 7671 Part 6 and GN3?',
    options: [
      'EAWR is non-statutory guidance, BS 7671 Part 6 is the enforceable law, and GN3 is the British Standard; the HSE prosecutes breaches of BS 7671 directly as an Act of Parliament.',
      'BS 7671 Part 6 is the statutory law, EAWR is the technical inspection standard, and GN3 the model-forms appendix; an EICR evidences compliance with BS 7671 Part 6, not EAWR.',
      'EAWR is the underlying statutory law (Reg 4(2) maintain to prevent danger), BS 7671 Part 6 is the technical inspection standard, and GN3 is the practical companion on method.',
      'All three are British Standards published by BSI with equal legal weight, so an inspector may cite any of them interchangeably on an EICR as one body of inspection law.',
    ],
    correctIndex: 2,
    explanation:
      'The legal hierarchy: EAWR 1989 (statutory, enforceable by HSE) sits at the top — Reg 4(2) requires systems to be maintained so as to prevent danger. BS 7671 Part 6 is the practical technical standard for periodic inspection that demonstrates compliance with EAWR Reg 4(2) and Reg 16 (competence). GN3 is non-statutory IET guidance that explains the practical method. An EICR is the documentary output that, when produced and acted upon, evidences the duty-holder has discharged the EAWR duty.',
  },
  {
    id: 'm5-s5-sub1-cenelec',
    question: 'BS 7671:2018+A4:2026 has restructured Part 6. What is the practical impact for an inspector reading older material?',
    options: [
      'Part 6 has been restructured and renumbered to align with the CENELEC standard, so pre-A4 regulation numbers no longer match the new 64x.x numbering.',
      'Part 6 was deleted in A4:2026 and merged into Part 7, so inspection and testing requirements now sit among the special-location chapters rather than in their own part.',
      'Part 6 is unchanged in A4:2026 — only Part 4 protection requirements were amended, so older Part 6 regulation numbers remain valid on current EICR forms.',
      'Part 6 now applies only to initial verification; periodic requirements moved into a separate IET Guidance Note, so the EICR no longer cites BS 7671 regulation numbers at all.',
    ],
    correctIndex: 0,
    explanation:
      'A4:2026 explicitly restructured Part 6 (Inspection and testing) to align numbering with the CENELEC standard. The old Chapter 62 (initial verification) and Chapter 63 (periodic inspection) numbering has shifted into the 64x.x family. Inspectors should not rely on pre-A4 Part 6 numbers when citing current requirements on EIC or EICR forms. Training materials and template forms predating A4:2026 must be updated.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of periodic inspection and testing of an electrical installation?',
    options: [
      'To bring every existing installation fully up to the current edition of BS 7671, replacing any wiring or device below the latest standard before the report can be issued.',
      'To assess the condition of an installation in service, identify deficiencies that may give rise to danger, and produce a documented EICR for the duty-holder.',
      'To re-certify the original installation work, confirming the design, construction, inspection and testing all met BS 7671 when the installation was first energised.',
      'To test every portable appliance in the property and confirm each carries a valid PAT label, since fixed wiring rarely deteriorates and is not the focus of a periodic.',
    ],
    correctAnswer: 1,
    explanation:
      'Per IET GN3 and BS 7671 Part 6: periodic inspection exists to assess condition, identify danger, and produce an EICR. The EICR is the evidence trail — the duty-holder can show an inspector, an enforcement officer or a tribunal that they have discharged their EAWR Reg 4(2) duty to maintain the system in a safe condition.',
  },
  {
    id: 2,
    question: 'Which statutory instrument creates the legal duty for landlords in the English private rented sector to commission periodic EICRs?',
    options: [
      'The Housing Act 2004 — requiring landlords to commission an EICR every three years and lodge a copy with the local authority before each new tenancy begins.',
      'The Electricity at Work Regulations 1989 — Regulation 4(2) directly obliging landlords to obtain a five-yearly EICR for every rented dwelling and supply it to tenants.',
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — requiring a five-yearly EICR with copies to tenants and the local authority.',
      'The Landlord and Tenant Act 1985 — making a ten-yearly EICR a condition of any assured shorthold tenancy and requiring the report to be displayed in the property.',
    ],
    correctAnswer: 2,
    explanation:
      'The 2020 PRS Regulations (SI 2020/312) made periodic EICRs a statutory requirement for landlords of rented dwellings in England from 1 July 2020 (new tenancies) and 1 April 2021 (all tenancies). Wales, Scotland and Northern Ireland have their own equivalents. The EICR must be carried out by a "qualified and competent" person and remedial work for any C1, C2 or FI must be completed within 28 days (or shorter timeframe if stated).',
  },
  {
    id: 3,
    question: 'BS 7671:2018+A4:2026 — what changed in Part 6 (Inspection and testing)?',
    options: [
      'The minimum insulation resistance value was raised from 1 MΩ to 2 MΩ for all final circuits, requiring re-testing of any installation previously passed at the lower figure.',
      'Periodic inspection intervals were fixed in regulation for the first time, replacing inspector judgement of frequency with mandatory maximum periods for each premises type.',
      'The EICR was replaced by a new Electrical Condition Statement and the C1/C2/C3 coding system withdrawn in favour of a simple pass or fail outcome.',
      'Part 6 was restructured and renumbered to align with the CENELEC standard, so old chapter and regulation numbers no longer map to the new 64x.x numbering.',
    ],
    correctAnswer: 3,
    explanation:
      'The A4:2026 amendment restructured Part 6 to align with the CENELEC standard. Practitioners should not quote pre-A4 regulation numbers on current EIC or EICR forms — Appendix 6 of BS 7671 contains the updated model forms reflecting the new numbering. Training materials predating A4:2026 must be cross-referenced.',
  },
  {
    id: 4,
    question: 'What does an EICR NOT do?',
    options: [
      'Certify new installation work — that is the role of an Electrical Installation Certificate (EIC) per Reg 644.1, not the condition-reporting EICR.',
      'Recommend a next inspection interval — that is the duty-holder, who sets the re-inspection date from insurance requirements rather than inspector judgement.',
      'Record observations with classification codes — an EICR lists defects in plain language only, because C1/C2/C3 codes are reserved for the EIC on new work.',
      'Assess the condition of an existing installation — that is a separate condition survey, while the EICR is limited to confirming the next test date and inspector details.',
    ],
    correctAnswer: 0,
    explanation:
      'EICR scope: assess condition of an existing in-service installation, report defects with codes, and recommend the next inspection interval. It does NOT certify new work. If you have done any new circuits or alterations during the visit, you must issue a separate EIC (or MEIWC for minor works) for that work. The EICR covers what was already there.',
  },
  {
    id: 5,
    question: 'Who can carry out an EICR?',
    options: [
      'Any electrician who holds a current Part P registration, because Part P self-certification competence is the legal threshold for an EICR on any dwelling.',
      'A "skilled person (electrically)" per BS 7671 Part 2 — evidenced by competent person scheme membership and a current inspection and testing qualification.',
      'The original installer of the wiring only, because EICR competence depends on familiarity with the specific installation rather than a recognised qualification.',
      'Any competent person scheme member regardless of qualification, because scheme membership alone satisfies the EAWR Regulation 16 competence requirement.',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 references the "skilled person" requirement of BS 7671 Part 2. In practice the inspector should hold a current inspection and testing qualification (City & Guilds 2391, 2394/95, or EAL equivalent), be a member of a competent person scheme, and have demonstrable experience of the type of installation. Under EAWR Reg 16 they must be competent for the work — and under the 2020 PRS Regulations the landlord must appoint a "qualified and competent" person.',
  },
  {
    id: 6,
    question: 'During an EICR you find an old non-compliant installation that was compliant when first installed. How do you code this?',
    options: [
      'You assess against the edition in force when the installation was built, and any item compliant at that time is automatically coded satisfactory regardless of present condition.',
      'You code every departure from the current edition as C2 (potentially dangerous), because any installation below the latest standard is by definition a potential danger to users.',
      'You assess against current BS 7671 but code per Best Practice Guide 4 — departures compliant at install but now superseded are typically C3, not C1 or C2.',
      'You issue a C1 (danger present) for any feature superseded by a later edition, because the duty-holder must bring it up to the current standard before it can be used.',
    ],
    correctAnswer: 2,
    explanation:
      'Per ESF Best Practice Guide 4 and GN3: an EICR assesses against the CURRENT edition of BS 7671 but the codes are about danger/potential danger/improvement. Items that were compliant at install but are now superseded (lack of RCD additional protection on a pre-17th install, lack of AFDD on pre-A4 install, etc.) are typically C3 — improvement recommended — not C1 or C2. C1/C2 are reserved for present or potential danger.',
  },
  {
    id: 7,
    question: 'What must the inspector record on an EICR even if the chosen frequency follows a set licensing period?',
    options: [
      'Nothing additional — where a licensing period sets the frequency, the inspector simply enters that date and need record no reasoning on the EICR.',
      'The licence number and issuing authority only, because the licensing body justifies the interval rather than the inspector who carries out the work.',
      'A signed declaration that the installation now complies with the current edition of BS 7671, because a licensing-driven inspection must result in a full upgrade.',
      'The reasons for the chosen frequency, including a note that the licensing periods were applied and were the basis for the interval.',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 requires the inspector to record reasons for the chosen interval — sufficient to justify the decision if challenged. This applies even when licensing periods (e.g. HMO licensing, caravan site licensing) dictate the period. The record protects the inspector and the duty-holder. The recommended next inspection date plus the rationale go on the EICR.',
  },
  {
    id: 8,
    question: 'What is the relationship between an EICR observation and a "departure" entered on the EICR?',
    options: [
      'A departure is a deliberate design-stage deviation from BS 7671; an observation is a finding at inspection (a defect, deterioration or condition) that gets a C1/C2/C3/FI code.',
      'A departure and an observation are two names for the same thing — both describe a defect found at site, and either term may go in the observations section of the EICR.',
      'A departure is a defect presenting immediate danger coded C1, while an observation is a minor item coded C3 — the most and least serious ends of one coding scale.',
      'An observation is a design-stage deviation recorded by the original designer, while a departure is a deterioration found by the inspector at the periodic inspection.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 distinguishes the two. A departure is a documented design deviation — Reg 120.3 permits departures provided "no less safe" is achieved and the departure is recorded on the certificate. An observation is what the inspector finds at site (defect, missing item, danger). Both get recorded on the EICR but in separate sections, with different conventions.',
  },
];

const faqs = [
  {
    question: 'Why does the EICR exist as a separate document type from the EIC?',
    answer:
      'Different jobs. The EIC certifies that new installation work was designed, installed, inspected and tested correctly and meets BS 7671 at the point of completion — three signatures (designer, constructor, inspector) per Reg 644.1, issued for any new installation or addition involving a new circuit. The EICR assesses an existing in-service installation and reports its condition — one signature (inspector) per BS 7671 Part 6 / GN3, issued at periodic intervals throughout the installation\'s life. EIC says "this is correct now". EICR says "this is the condition we found".',
  },
  {
    question: 'Can I refuse to issue an EICR if I cannot complete every test?',
    answer:
      'No — but you must record the limitations. GN3 is clear: where any part of the installation cannot be inspected or tested (e.g. tenant refuses access to a room, RCD trip test would interrupt critical equipment, an MCB schedule is missing) you record the agreed limitations in the EICR scope section, and the codes you assign reflect what you could and could not see. An EICR with documented limitations is far better than no EICR — but the limitations must be discussed and agreed with the client BEFORE you start (see Sub3).',
    },
  {
    question: 'Does an EICR have a legal validity period?',
    answer:
      'It has a recommended next-inspection date which is set by the inspector based on installation type, condition, age, use and (where applicable) licensing requirements. For PRS dwellings in England the statutory maximum is 5 years (or the inspector\'s recommendation, whichever is shorter). For commercial premises ESF guidance suggests 5 years for offices, shops; shorter for higher-risk environments (industrial, swimming pools, agricultural). The EICR itself does not "expire" but the duty-holder relies on it to evidence ongoing compliance — once the recommended date is past, evidential value drops sharply.',
  },
  {
    question: 'What is the difference between an EICR and a "Visual Condition Report"?',
    answer:
      'A Visual Condition Report (VCR) is a non-standard, lower-tier inspection that involves visual checks only — no testing. It is sometimes used for property purchases or insurance triage. A VCR cannot satisfy the EAWR Reg 4(2) duty for periodic verification because BS 7671 Part 6 / GN3 explicitly include testing as part of "periodic inspection". A VCR is not a substitute for an EICR. Some inspectors offer it as a "first look" service that can lead to a full EICR being commissioned.',
  },
  {
    question: 'My client says "we already have an EICR — why do I need to redo it?" The previous one was 4 years ago and codes look fine. What do I do?',
    answer:
      'Read the previous EICR carefully — check the recommended next-inspection date (not the inspection date plus a fixed interval), the codes assigned, the limitations, and the inspector\'s rationale. If the previous EICR is still within its validity period AND no significant change has happened to the installation (no alterations, no occupancy change, no incidents, no licensing change), it remains valid. If 5 years has passed, the property has changed use, or new tenancies have started in PRS dwellings, a new EICR is needed. Always sight the previous report and reference it on the new one.',
  },
  {
    question: 'Why does GN3 keep referring to "the inspector" in the singular when EICRs sometimes need multiple people?',
    answer:
      'GN3 explicitly states that "the inspector" may denote one or more persons where the work being undertaken requires it — collectively they shall have the relevant education, experience, qualifications and skills for the scope of inspection and testing being performed. On a large commercial EICR you might have a lead inspector responsible for sign-off, plus assistants doing testing. The signature on the EICR is the responsible inspector\'s — they hold the competence accountability for the team\'s output.',
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 1"
            title="EICR purpose and framework"
            description="Why periodic inspection and testing exists, where the EICR sits in the law, and how BS 7671 Part 6, GN3 and the ESF Best Practice Guides interlock to give you the practical method for an EICR."
            tone="emerald"
          />

          <TLDR
            points={[
              'The EICR (Electrical Installation Condition Report) assesses the condition of an existing installation in service. It is NOT a certificate of new work — that is the EIC.',
              'The legal driver is the Electricity at Work Regulations 1989 — Reg 4(2) requires systems to be maintained to prevent danger. The EICR is your documentary evidence that the duty-holder has discharged that duty.',
              'BS 7671 Part 6 (completely restructured and renumbered in A4:2026 to align with CENELEC) is the technical standard. GN3 is the practical method. ESF Best Practice Guide 4 governs the C1/C2/C3/FI coding.',
              'Landlords in the English private rented sector have a statutory five-year EICR cycle since 2020/2021 — the EICR must come from a "qualified and competent" person, with codes resolved within 28 days.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the purpose of periodic inspection and testing of electrical installations and the role of the EICR.',
              'Distinguish between the EIC (new work), MEIWC (minor works) and EICR (periodic inspection of an existing installation).',
              'Identify the statutory framework — EAWR 1989 Reg 4(2) and Reg 16 — and the secondary legislation creating EICR duties (PRS Regulations 2020 for English landlords, equivalent regimes in Wales/Scotland/Northern Ireland).',
              'Describe how BS 7671 Part 6 (CENELEC-aligned in A4:2026), IET GN3 and ESF Best Practice Guide 4 interlock as the practical method.',
              'Identify the competence requirements for the inspector under BS 7671 Part 2 and EAWR Reg 16.',
              'Explain the relationship between an observation, a departure, and a coded item on the EICR.',
              'Cite the requirement to record reasons for the next-inspection interval on the EICR (GN3 / Reg 652.1).',
            ]}
            initialVisibleCount={4}
          />

          <VideoCard
            url={videos.scheduleOfInspections.url}
            title={videos.scheduleOfInspections.title}
            channel={videos.scheduleOfInspections.channel}
            duration={videos.scheduleOfInspections.duration}
            topic="Schedule of Inspections walkthrough · Unit 304 AC 1.1"
            caption="Craig Wiltshire walks the schedule of inspections used in periodic inspection and testing — the same schedule that backs the EICR. Watch this first to put the framework into practice."
          />

          <ContentEyebrow>What an EICR is — and what it is not</ContentEyebrow>

          <ConceptBlock
            title="The EICR is a condition report — not a certificate of new work"
            plainEnglish="An Electrical Installation Condition Report tells you what state an existing installation is in. It is the periodic equivalent of a vehicle MOT — a snapshot of condition with codes for what needs fixing. It does not certify any new installation work and it does not retrospectively make an old install compliant."
            onSite="If you do any new circuits or alterations during the EICR visit (because you found something that needed fixing on the spot), those new bits get their OWN certificate — an EIC for a new circuit, an MEIWC for minor works. Two separate documents leave site."
          >
            <p>
              The EICR is one of three core BS 7671 documents and the one that practitioners use most
              often. The three:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EIC — Electrical Installation Certificate.</strong> Issued for new
                installations and additions involving a new circuit. Three signatures: designer,
                constructor, inspector. Mandatory under Reg 644.1.
              </li>
              <li>
                <strong>MEIWC — Minor Electrical Installation Works Certificate.</strong> Issued
                for minor works on an existing circuit (a new accessory, a like-for-like board
                swap that does not add circuits). One signature. Limited scope.
              </li>
              <li>
                <strong>EICR — Electrical Installation Condition Report.</strong> Issued
                following periodic inspection of an existing installation. One signature
                (inspector). Reports condition, codes defects, recommends next inspection.
              </li>
            </ul>
            <p>
              The EICR exists because installations age. Insulation degrades, terminations loosen,
              alterations get added by varying competence levels, occupancy changes use patterns,
              regulations evolve. Without periodic verification the duty-holder has no evidence the
              installation is still safe — and under EAWR 1989 they carry personal liability for
              that.
            </p>
            <p>
              <strong>Critical distinction.</strong> An EICR codes against the CURRENT edition of
              BS 7671 (today: BS 7671:2018+A4:2026) but the C1/C2/C3 codes are about
              danger/potential danger/improvement — NOT about retrospective re-compliance. An old
              install can be fully safe and properly maintained and still get a "Satisfactory" EICR
              with C3 observations noting where current standards have moved on. The EICR is not a
              vehicle to force every old installation up to today&apos;s edition.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Purpose of periodic inspection and testing"
            clause="Periodic inspection and testing exist to assess the condition of an electrical installation in service and to identify any deficiencies that may give rise to danger. The purpose is to ensure installations remain safe during use, to identify deterioration, and to provide an Electrical Installation Condition Report (EICR) documenting findings and recommendations."
            meaning={
              <>
                GN3 sets out the purpose plainly: condition, danger, deterioration, documented
                report. The EICR is the deliverable. Note the emphasis on "in service" — this is
                not a verification of new work but an in-life assessment. Findings get codes,
                recommendations get a timescale, and the duty-holder uses the report to evidence
                ongoing compliance with EAWR Reg 4(2).
              </>
            }
            cite="Source: IET Guidance Note 3:2022, Section 3 (Periodic Inspection and Testing) — purpose statement."
          />

          <SectionRule />

          <ContentEyebrow>The legal hierarchy</ContentEyebrow>

          <ConceptBlock
            title="EAWR 1989 sits at the top — BS 7671 and GN3 are how you discharge the duty"
            plainEnglish="The Electricity at Work Regulations 1989 are statutory law — break them and you face HSE prosecution, personal liability for the duty-holder. Reg 4(2) requires systems to be maintained to prevent danger. BS 7671 Part 6 is the technical standard for the inspection that demonstrates that maintenance. GN3 is the practical method."
            onSite="When you sign an EICR you are signing your professional reputation onto a document that the duty-holder will rely on if HSE come knocking. Take it seriously, document everything, code honestly. A signed EICR is a contract — between you and the duty-holder, between the duty-holder and the law."
          >
            <p>The hierarchy from law down to practice:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Health and Safety at Work etc Act 1974.</strong> Primary legislation —
                general duties on employers and the self-employed.
              </li>
              <li>
                <strong>Electricity at Work Regulations 1989 (EAWR).</strong> Secondary
                legislation made under HSWA 1974. The key regs for inspection: <strong>Reg 4(2)</strong>{' '}
                (systems to be maintained as may be necessary to prevent danger), <strong>Reg 4(3)</strong>{' '}
                (work activities), <strong>Reg 16</strong> (no person shall be engaged in any
                work activity where technical knowledge or experience is necessary to prevent
                danger unless they possess such knowledge or experience). HSE memorandum HSR25
                gives practical guidance.
              </li>
              <li>
                <strong>Sector-specific statutory instruments.</strong> e.g. The Electrical
                Safety Standards in the Private Rented Sector (England) Regulations 2020 (SI
                2020/312) — five-year EICR cycle for English landlords. Wales has the Renting
                Homes (Wales) Act 2016 / 2022 regulations. Scotland has the Housing (Scotland)
                Act 2014 standards. Northern Ireland has its own equivalents. HMO licensing
                regimes layer additional periods on top.
              </li>
              <li>
                <strong>BS 7671:2018+A4:2026 — Part 6 (Inspection and testing).</strong>{' '}
                Non-statutory but cited in HSE prosecutions as "the recognised standard". Part 6
                was completely restructured and renumbered in A4:2026 to align with the CENELEC
                standard. Inspectors must use the new numbering.
              </li>
              <li>
                <strong>IET Guidance Note 3 (GN3).</strong> Practical companion to BS 7671 Part
                6. Non-statutory guidance, but widely treated as best practice. Updated to align
                with each amendment.
              </li>
              <li>
                <strong>Electrical Safety First (ESF) Best Practice Guide 4.</strong>{' '}
                Industry-standard guidance on EICR coding (C1/C2/C3/FI) and on the application
                of the codes to common defects. This is what inspectors actually reach for when
                deciding what code to apply.
              </li>
            </ol>
            <p>
              The practical workflow: GN3 tells you HOW to do the inspection; BS 7671 Part 6 tells
              you WHAT must be verified; ESF BPG4 tells you HOW to code what you find; and EAWR
              1989 tells you WHY it all matters legally.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Part 6 restructuring (CENELEC alignment)"
            clause="BS 7671 Part 6 (Inspection and testing) has been completely restructured in the 2018+A4:2026 edition. This restructuring includes changes to regulation numbering to align Part 6 with the CENELEC standard for inspection and testing. Users should not rely on pre-A4 regulation numbers when consulting Part 6."
            meaning={
              <>
                Practical implication: every EIC, MEIWC and EICR template that predates A4:2026
                must be updated. Citations on inspection reports, training material references,
                competent person scheme audit checklists — all need to use the new 64x.x
                numbering. If you cite a pre-A4 number on a current report, an auditor will flag
                it as a compliance gap.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Foreword and Part 6 restructuring notes."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EAWR 1989 — the duty-holder position</ContentEyebrow>

          <ConceptBlock
            title="Reg 4(2) is what the EICR exists to evidence"
            plainEnglish="EAWR Reg 4(2) says: every electrical system shall be maintained so as to prevent, so far as is reasonably practicable, danger. That is the duty. Periodic inspection — and the EICR that documents it — is how the duty-holder evidences they are doing maintenance."
            onSite="When you walk on site, ask: who is the duty-holder here? Owner? Tenant? Landlord? Facilities manager? Whoever has control of the installation has the duty. They are the person paying for and relying on your EICR. They are the person facing prosecution if it goes wrong."
          >
            <p>
              EAWR Reg 4(2) wording: <em>"As may be necessary to prevent danger, all systems shall
              be maintained so as to prevent, so far as is reasonably practicable, such danger."</em>
            </p>
            <p>
              The phrase <strong>"so far as is reasonably practicable"</strong> (SFAIRP) is a
              cost-benefit test — the duty-holder must do what is reasonable in proportion to the
              risk. Periodic inspection is universally accepted by HSE as a reasonably practicable
              measure for evidencing compliance with Reg 4(2).
            </p>
            <p>
              Other relevant EAWR regulations the EICR touches:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4(1).</strong> Construction of electrical systems — they shall be
                constructed as may be necessary to prevent danger. EICR observations on poor
                construction (loose terminations, damaged accessories, undersized cables) feed
                back into this duty.
              </li>
              <li>
                <strong>Reg 4(3).</strong> Work activities — including inspection and testing.
                The work of doing the EICR itself is governed by EAWR Reg 4(3). Hence safe
                isolation, dead-test sequences, live-test risk control.
              </li>
              <li>
                <strong>Reg 13.</strong> Precautions for work on equipment made dead. Aligns
                with safe isolation procedures during EICR testing.
              </li>
              <li>
                <strong>Reg 14.</strong> Work on or near live conductors. Limits live testing —
                only where the inspector has determined it is unreasonable for the work to be
                carried out dead AND suitable precautions have been taken AND the inspector is
                competent.
              </li>
              <li>
                <strong>Reg 16.</strong> Persons to be competent to prevent danger and injury.
                The competence requirement on the inspector themselves.
              </li>
            </ul>
            <p>
              <strong>Personal liability.</strong> Under EAWR, prosecution can target the
              duty-holder personally — directors, managers, the self-employed. A signed EICR
              that demonstrably misled the duty-holder (codes downplayed, defects missed) can
              draw the inspector into the prosecution chain too. The signature matters.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The 2020 Private Rented Sector Regulations — five-year EICR cycle for English landlords"
            plainEnglish="Since 2020 (new tenancies) and 2021 (all tenancies), every English landlord must commission an EICR at least every five years on every rented dwelling. The EICR must be from a qualified and competent person. C1/C2/FI codes must be remediated within 28 days. The local authority can fine up to £30,000 per breach."
            onSite={`When taking an EICR booking from a landlord, confirm: it's a rental, the property is in England, and ask when the previous EICR was. If they cannot find it, the previous EICR effectively did not exist for compliance purposes — they are non-compliant from day one of the tenancy.`}
          >
            <p>The 2020 PRS Regulations (England) duties on the landlord:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Five-year cycle.</strong> An EICR at intervals not exceeding 5 years, OR
                sooner if the most recent report specifies a shorter interval.
              </li>
              <li>
                <strong>Qualified and competent inspector.</strong> The 2020 Regs do not name
                specific qualifications but the explanatory guidance points to BS 7671 Part 2
                "skilled person" + competent person scheme membership + 2391/2394/2395 (or
                equivalent).
              </li>
              <li>
                <strong>28-day remediation.</strong> Any C1, C2 or FI code must be remediated
                within 28 days of inspection (or within the shorter period specified in the
                report if applicable). Remedial work must be evidenced — typically a confirmation
                report or further EICR.
              </li>
              <li>
                <strong>Tenant copy within 28 days.</strong> The landlord must give the tenant a
                copy of the EICR within 28 days of inspection.
              </li>
              <li>
                <strong>New-tenant copy.</strong> Before a new tenant moves in, they must
                receive a copy of the most recent EICR.
              </li>
              <li>
                <strong>Local authority on request.</strong> Within 7 days of a written request
                from the local housing authority, the landlord must supply a copy.
              </li>
              <li>
                <strong>Fines.</strong> Up to £30,000 per breach. Local authority enforcement.
              </li>
            </ul>
            <p>
              Wales, Scotland and Northern Ireland have parallel regimes with their own statutory
              instruments — always confirm the jurisdiction before quoting the legal duty. The
              practical electrical standard (BS 7671 Part 6 + GN3 + BPG4) is the same across the
              UK; the legal triggers and timescales differ.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Competence — who can sign an EICR</ContentEyebrow>

          <ConceptBlock
            title={`The "skilled person (electrically)" test`}
            plainEnglish="BS 7671 Part 2 defines a skilled person as one with the relevant education, knowledge and experience to enable them to avoid the dangers and prevent the risks that electricity can create. EAWR Reg 16 backs this up legally — competence is a personal duty on the worker."
            onSite="Apprentices and trainees can ASSIST on EICRs but cannot sign one off. The inspector signing has to be competent for the type of installation (a domestic 2391 holder is not necessarily competent on an industrial three-phase install with motors, VSDs and harmonic loading). Match competence to scope."
          >
            <p>What does competence look like in practice for an EICR inspector?</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Underlying qualification.</strong> Typically City & Guilds 2365 Level 3
                (or 2360 / 2330 / 2356 historic equivalents) — the core electrician
                qualification.
              </li>
              <li>
                <strong>Inspection and testing qualification.</strong> City & Guilds 2391-50/52,
                2394 (initial verification), 2395 (periodic inspection), or EAL equivalent. The
                2395 specifically covers periodic inspection / EICR scope and is the most
                relevant for an EICR signatory.
              </li>
              <li>
                <strong>Competent person scheme membership.</strong> NICEIC, NAPIT, ELECSA,
                Stroma, BSI etc. CPS audit confirms ongoing competence and gives the inspector
                independent verification of their work product.
              </li>
              <li>
                <strong>Indemnity insurance.</strong> Professional indemnity at appropriate
                level for the type of work (commercial/industrial EICRs typically demand higher
                cover).
              </li>
              <li>
                <strong>Demonstrable experience.</strong> Periodic inspection of similar
                installations — domestic, commercial, industrial, special location. The
                qualifications open the door but the experience is the substance.
              </li>
              <li>
                <strong>Calibrated test equipment.</strong> Per GN3: instruments shall be
                periodically calibrated. Calibration certificates with traceability to National
                Standards. Intermediate checks (instrument check box) are not a substitute for
                formal calibration.
              </li>
            </ul>
            <p>
              <strong>"The inspector" may denote one or more persons</strong> per GN3. On a
              large EICR you may have a lead inspector plus assistants. The lead inspector signs
              and carries the responsibility for the team output. Assistants document under the
              lead direction.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 16 (Competence)"
            clause="No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."
            meaning={
              <>
                The statutory competence requirement that backs the BS 7671 "skilled person"
                test. Critical for periodic inspection: the inspector personally bears the
                Reg 16 duty. They cannot defer it to their employer or to the duty-holder. If
                they sign an EICR for an installation type they are not competent on, they are
                in breach of Reg 16 — even if no defect was missed. Practical answer: refuse
                the work, refer the client to a more suitably competent inspector.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, Regulation 16."
          />

          <SectionRule />

          <ContentEyebrow>Best Practice Guide 4 — the coding framework</ContentEyebrow>

          <ConceptBlock
            title="C1, C2, C3, FI — the four EICR codes (deep dive in Sub2)"
            plainEnglish="Every observation on an EICR gets one of four codes. C1 = present danger requiring immediate action. C2 = potentially dangerous, urgent attention required. C3 = improvement recommended. FI = further investigation required without delay. The full coding rubric is in Sub 2 — this is the introduction."
            onSite="The code drives the consequence. C1 means the duty-holder must act now (often before you leave site, you make safe). C2 means action required and the report cannot be marked Satisfactory until resolved. C3 is a note for improvement, not a fail. FI means you need to come back with more information."
          >
            <p>The four EICR codes per ESF Best Practice Guide 4:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>C1 — Danger present, risk of injury. Immediate remedial action required.</strong>{' '}
                Live exposed conductors, broken socket showing live terminals, missing CPC at a
                Class I appliance. Make safe before leaving site; record on EICR.
              </li>
              <li>
                <strong>C2 — Potentially dangerous, urgent remedial action required.</strong>{' '}
                Defect not presenting immediate danger but creating a credible path to danger
                if a fault occurs. Loss of bonding to a service, RCD that fails to trip, MCB
                at an outlet showing signs of overheating but not yet failed.
              </li>
              <li>
                <strong>C3 — Improvement recommended.</strong> Non-compliant with current
                BS 7671 but does not present a present or potential danger. Common: lack of
                AFDD on a circuit where current edition recommends one, lack of RCD additional
                protection on an old install where it was not required at install time. The
                EICR can still be Satisfactory with C3 observations.
              </li>
              <li>
                <strong>FI — Further investigation required without delay.</strong> Inspector
                cannot, on the available information, determine the level of risk. Example: a
                cable disappears into a wall and the destination is not accessible — the
                inspector needs to come back, open up, investigate further before coding.
              </li>
            </ul>
            <p>
              The code on the report determines the overall verdict: an EICR with any C1, C2 or
              FI is "Unsatisfactory". An EICR with only C3 (or no observations) is
              "Satisfactory". Sub 2 covers the rubric in full detail with worked examples for
              each code.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Frequency intervals and the inspector's rationale</ContentEyebrow>

          <ConceptBlock
            title="GN3 frequency tables — the recommended next-inspection intervals"
            plainEnglish="GN3 publishes recommended maximum intervals between periodic inspections by installation type. The inspector uses the table as the starting point and adjusts up or down based on installation condition, occupancy and risk. Reg 651.4 requires the report to record details of damage, deterioration, defects or dangerous conditions — but the recommended next-inspection interval is the inspector's professional judgement, documented with rationale."
            onSite="Memorise the headline intervals — domestic owner-occupied 10 years, rented 5 years, commercial 5 years, industrial 3 years, leisure / agricultural 3 years, special locations as relevant. The full table covers 30+ occupancy types; carry the GN3 reference for the unusual ones (caravans, marinas, theatres, heritage buildings)."
          >
            <p>
              GN3 frequency table (recommended maximum intervals) — typical entries:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic — owner-occupied.</strong> 10 years or change of occupancy, whichever sooner.
              </li>
              <li>
                <strong>Domestic — rented (PRS).</strong> 5 years (statutory maximum under PRS Regs 2020) or change of tenancy.
              </li>
              <li>
                <strong>Domestic — HMO / shared.</strong> 5 years; HMO licensing periods may shorten.
              </li>
              <li>
                <strong>Commercial — offices, retail, restaurants.</strong> 5 years or change of occupancy.
              </li>
              <li>
                <strong>Industrial.</strong> 3 years.
              </li>
              <li>
                <strong>Educational establishments.</strong> 5 years.
              </li>
              <li>
                <strong>Hospitals and clinical environments.</strong> 5 years (1 year for medical group 2 locations under Section 710).
              </li>
              <li>
                <strong>Public houses, hotels.</strong> 5 years.
              </li>
              <li>
                <strong>Theatres, cinemas.</strong> 1-3 years.
              </li>
              <li>
                <strong>Caravans (touring).</strong> 1 year.
              </li>
              <li>
                <strong>Caravan parks (sites).</strong> 1 year for hook-ups; 3 years for fixed installations.
              </li>
              <li>
                <strong>Marinas / boatyards.</strong> 1 year.
              </li>
              <li>
                <strong>Swimming pools.</strong> 1 year.
              </li>
              <li>
                <strong>Agricultural / horticultural.</strong> 3 years.
              </li>
              <li>
                <strong>Petrol filling stations.</strong> 1 year.
              </li>
              <li>
                <strong>Construction sites.</strong> 3 months.
              </li>
            </ul>
            <p>
              The inspector adjusts the recommended interval based on: condition observed during the inspection, age of the installation, environment (damp, dusty, corrosive, mechanical wear), use pattern (24/7 operation vs intermittent), evidence of previous remedial work, and any C1/C2 defects identified. A heavily-defective installation under remediation may justify a shorter cycle to verify the remediation; a well-maintained installation in good condition may justify the full table interval. Document the rationale on the EICR — even when the chosen interval matches the table default.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Sampling and scope — what 'thorough' actually means on a periodic"
            plainEnglish="An EICR doesn't usually inspect every accessory on every circuit. GN3 sets out a sampling principle — typical domestic 100 % on the CU and main bonding, 100 % on socket circuits, sample on lighting and hard-wired accessories. The scope and the sample rate must be agreed with the duty-holder BEFORE inspection starts and recorded in the limitations section of the EICR."
            onSite="The handover conversation at booking is where you get the sample rate right. A 5-bedroom Victorian house with a basement and a converted loft is not a 30-minute drive-by. Quote on the basis of full inspection of CU + 100 % socket circuits + 50 % sample of lighting points + 100 % visual on each room — and document that scope on the EICR limitations page so the customer and any future inspector know what was and wasn't tested."
          >
            <p>
              GN3 sampling guidance for typical installation types:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Consumer unit / distribution board.</strong> 100 % — visual inside, every device verified, every termination torqued where access permits, every bond verified, every label read.
              </li>
              <li>
                <strong>Main protective bonding.</strong> 100 % — every bond from MET to extraneous-conductive-part inspected and continuity-tested.
              </li>
              <li>
                <strong>Socket-outlet circuits.</strong> 100 % live tests at the furthest point of each circuit; 100 % visual on every accessory if practical, otherwise sample at minimum 10 %.
              </li>
              <li>
                <strong>Lighting circuits.</strong> Sample of fittings (typically 25-50 %) for visual condition; live Zs at the furthest point of each circuit.
              </li>
              <li>
                <strong>Fixed appliances (cooker, shower, immersion).</strong> 100 % — each circuit tested at the appliance termination box.
              </li>
              <li>
                <strong>Special locations (bathrooms, kitchens, outdoor circuits).</strong> Higher sample rate (typically 100 %) because of elevated risk.
              </li>
              <li>
                <strong>Concealed cables / inaccessible items.</strong> Limited sample by definition; record under EICR Limitations and code FI if material to safety assessment.
              </li>
            </ul>
            <p>
              The Limitations section of the EICR is the inspector's protection — it documents what was and wasn't inspected, why, and what the duty-holder agreed. Common limitation entries:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>"Sampling rate of 25 % on lighting points agreed with duty-holder; Reg 651.3 (no danger to persons) prevented full removal of fittings."</li>
              <li>"Tenant refused access to bedroom 2 on inspection day; circuit verified at CU only, recommend follow-up inspection within 28 days."</li>
              <li>"RCD trip test on circuit C5 omitted at duty-holder request — circuit feeds essential medical equipment; functional test deferred to scheduled maintenance window."</li>
              <li>"Concealed cables in floor void not visible; verified by continuity and IR but no visual confirmation of routing."</li>
            </ul>
            <p>
              The combination of agreed scope, documented sampling rate and explicit limitations turns the EICR from a tick-box exercise into a defensible audit trail. An inspector who finds an unforeseen limitation on the day (RCD trip would interrupt critical equipment, locked plant room with no key) records it, agrees with the duty-holder, and codes accordingly — typically FI for items the limitation prevented from being verified.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title={`Treating the EICR as a "fail/pass for current edition" rather than a condition assessment`}
            whatHappens={
              <>
                Inexperienced inspector arrives at a 1990s domestic install. No RCDs. No AFDDs.
                Old plastic CU. Fully metal back-boxes. They write up every "non-compliance with
                current BS 7671" as a C2 and the report comes back Unsatisfactory. The landlord
                is forced into a £4k rewire to address phantom defects. The local authority later
                rejects the report on appeal because the codes were not justified by the
                BPG4 rubric.
              </>
            }
            doInstead={
              <>
                Code per ESF Best Practice Guide 4 — C1/C2 are reserved for present or potential
                danger. Items that were compliant at install but no longer match the current
                edition are usually C3 (improvement recommended). The 1990s install with no RCDs
                is C3 (improvement recommended) for the lack of additional protection — UNLESS
                you find a specific risk path (kitchen socket within 3 m of a sink with no RCD
                and a Class I appliance plugged in and showing signs of damage) which would
                push it to C2 for that specific circuit. Justify every C1/C2 against the
                BPG4 rubric.
              </>
            }
          />

          <Scenario
            title="Five-year landlord EICR on a recently let three-bed semi (PRS England)"
            situation={
              <>
                A landlord, recently bought a three-bed semi in Manchester and lets it. They
                contact you for "a safety certificate before the tenants move in next week".
                Property has been empty for two months. Last EICR they could find is from 2017,
                six years ago, by an inspector who is no longer trading. Original install dates
                from 2003 (full rewire by a competent installer at the time). One alteration —
                a kitchen extension and new ring final added in 2018, with an EIC produced.
                Consumer unit is a metal-clad Wylex with RCDs on each ring final and the
                shower circuit. No AFDDs.
              </>
            }
            whatToDo={
              <>
                Confirm scope: full EICR on the entire installation (the previous EICR is more
                than 5 years old AND the inspector cannot be contacted — start fresh). Request
                copy of the 2018 EIC for the kitchen extension as evidence of that part of the
                install. Quote on the basis of: full EICR per BS 7671 Part 6 + GN3, sample
                rate appropriate for a domestic dwelling (typically 100% on socket circuits,
                100% on the CU, sample on lighting and hard-wired accessories), report with
                C1/C2/C3/FI codes per BPG4. Carry out the inspection and testing, write up the
                EICR with codes, agree any C1/C2 remediation timescales with the landlord
                (PRS Reg requires 28 days max), recommend next inspection interval (5 years
                under PRS Reg, or shorter if specific defects warrant). Issue tenant copy via
                the landlord within 28 days — the 2020 PRS Regs require it. Note in the report:
                lack of AFDDs is C3 (recommendation per A4:2026 Reg 421.1.7) — not C2 — because
                AFDDs are recommended not required, and the install is not in a high-risk
                category.
              </>
            }
            whyItMatters={
              <>
                This is the standard private-rented EICR job. Get it wrong and the landlord is
                non-compliant with the 2020 PRS Regulations the moment a tenant moves in — fines
                up to £30,000 per breach, plus tenants can withhold rent under disrepair
                provisions. Get the codes wrong (over-coding C3s as C2s) and you force the
                landlord into unjustified remedial work and damage your professional reputation
                when the report is challenged. Get them right and the landlord has a defensible
                document, the tenant has a copy as required, and the local authority cannot
                enforce against the landlord on this point for the next 5 years.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The EICR is a condition report on an existing installation in service — NOT a certificate of new work. EIC and MEIWC are for new work; EICR is for periodic inspection.',
              'Legal hierarchy: HSWA 1974 > EAWR 1989 (Reg 4(2) maintain to prevent danger, Reg 16 competence) > sector-specific SIs (e.g. PRS Regs 2020) > BS 7671 Part 6 > GN3 > ESF BPG4.',
              'BS 7671 Part 6 has been completely restructured and renumbered in A4:2026 to align with the CENELEC standard. Old reg numbers do NOT map directly. Use new 64x.x numbering on all current EICRs.',
              'English PRS landlords have a statutory five-year EICR cycle since 2020/2021. Qualified and competent inspector required. C1/C2/FI must be remediated within 28 days. Fines up to £30,000.',
              'Inspector competence: BS 7671 Part 2 "skilled person" + EAWR Reg 16 personal duty. In practice: 2365 Level 3 + 2391/2394/2395 + competent person scheme + experience appropriate to installation type.',
              'EICR codes per ESF BPG4: C1 (immediate danger), C2 (potential danger, urgent), C3 (improvement recommended, not a fail), FI (further investigation needed). Detail in Sub 2.',
              'Lack of features added by recent amendments (RCD additional protection, AFDDs, fully metal CU) on older compliant-at-install systems is typically C3 — NOT C1 or C2. The EICR is not a forced upgrade.',
              'Always record on the EICR the rationale for the chosen next-inspection interval — even when set licensing periods apply. GN3 requirement, audit-defendable record.',
            ]}
          />

          <Quiz title="EICR purpose and framework — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module 5 · Section 4
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section5-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 EICR coding C1/C2/C3/FI
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
