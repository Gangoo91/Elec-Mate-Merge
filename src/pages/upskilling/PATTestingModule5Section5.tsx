import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
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
    id: 'patm5-s5-cert-vs-eic',
    question:
      'A client asks "where is my PAT certificate?" — the same way they would ask for an EIC. What is the right framing?',
    options: [
      'It is a record of in-service inspection and testing, not a regulatory certificate like an EIC.',
      'It is a regulatory document with the same legal status as an EIC under BS 7671.',
      'It is interchangeable with an EIC and either can be issued for portable equipment.',
      'It is a statutory certificate issued and registered by the HSE.',
    ],
    correctIndex: 0,
    explanation:
      'There is no &ldquo;PAT certificate&rdquo; defined in regulation. What the industry calls a PAT certificate is a test report — the consolidated record of work done, produced under IET CoP 5th Ed. + HSG107 to evidence the EAWR Reg 4(2) duty. It is a record of inspection and testing, not a regulatory certificate like an EIC under BS 7671.',
  },
  {
    id: 'patm5-s5-competent-person',
    question: 'Who can sign a PAT report?',
    options: [
      'Anyone who physically carried out the testing, regardless of training.',
      'Only an 18th Edition qualified electrician registered with a scheme.',
      'A competent person within the IET CoP 5th Ed. definition.',
      'A senior manager with authority to sign company documents.',
    ],
    correctIndex: 2,
    explanation:
      'The competent-person concept is central. IET CoP 5th Ed. defines competence as knowledge of the equipment, test procedures and hazards, plus the ability to interpret results. The signatory takes professional responsibility — that has to attach to a person who actually has the competence, not to whoever happens to be available.',
  },
  {
    id: 'patm5-s5-content',
    question:
      'A PAT report contains: pass/fail summary, asset count, date, and a signature. Is this a complete report under IET CoP 5th Ed. Chapter 16?',
    options: [
      'Yes — the pass/fail headline is all the duty holder needs to act on.',
      'Yes — the pass count is the legal minimum required for the record.',
      'No — but only if the report is also printed on company letterhead.',
      'No — it also needs standards followed, instrument calibration, per-item results, competent-person ID and the failures list.',
    ],
    correctIndex: 3,
    explanation:
      'IET CoP 5th Ed. Chapter 16: the report consolidates the audit trail. It should also include the standards followed, the test instrument(s) and calibration status, per-item numerical results, competent-person identification and qualifications, a failures-and-action list and the retest interval. Without instrument calibration, per-item results and the failure handling, the report cannot evidence a defensible test regime — a summary-only report is barely a record.',
  },
  {
    id: 'patm5-s5-electronic',
    question:
      'A PAT report is delivered as a PDF with an electronic signature image. Is this acceptable?',
    options: [
      'No — only wet ink signatures are legally valid on a test report.',
      'Yes — they have legal effect provided the signature is reliably attached and the signatory is identifiable.',
      'Only if a second person witnesses and counter-signs the signature.',
      'Only when produced on an Apple device with a stylus.',
    ],
    correctIndex: 1,
    explanation:
      'Electronic signatures have legal effect under the Electronic Communications Act 2000 and eIDAS. Best practice is a signed PDF with hash-locked content, ideally with a digital signature certificate, so the document cannot be altered post-signature. Pasted signature images are accepted but are weaker evidence of intent than properly signed digital signatures.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the regulatory status of a &ldquo;PAT certificate&rdquo;?',
    options: [
      'A test report evidencing the EAWR Reg 4(2) duty — not a regulatory certificate',
      'A regulatory certificate legally equivalent to an EIC',
      'A statutory document issued and registered by the HSE',
      'A formal certification awarded by a trade association',
    ],
    correctAnswer: 0,
    explanation:
      'Industry uses &ldquo;PAT certificate&rdquo; loosely. There is no regulatory document of that name. The actual deliverable is a test report — a consolidated record produced under IET CoP 5th Ed. + HSG107 to evidence the EAWR Reg 4(2) record-keeping duty. EICs and EICRs are different documents in a different regime.',
  },
  {
    id: 2,
    question: 'Who can sign a PAT report?',
    options: [
      'Anyone present who carried out part of the testing',
      'Only a chartered engineer registered with the IET',
      'A competent person within the IET CoP 5th Ed. definition',
      'Only a director or owner of the testing company',
    ],
    correctAnswer: 2,
    explanation:
      'The competent-person concept is the gating qualification — knowledge of the equipment, test procedures and hazards, plus the ability to interpret results. The signatory is taking professional responsibility, so the competence has to actually attach to that person. The IET CoP framing focuses on knowledge and interpretation ability rather than a specific qualification name.',
  },
  {
    id: 3,
    question: 'IET CoP 5th Ed. Chapter 16 recommends what content for a PAT report?',
    options: [
      'A headline pass/fail summary and asset count only',
      "The manufacturer's data sheets for each item tested",
      'A cost breakdown of the testing contract by asset',
      'Standards followed, instrument calibration, per-item results, competent-person ID, failures and retest interval',
    ],
    correctAnswer: 3,
    explanation:
      'The report consolidates the audit trail. Each item has an evidential function: standards reference frames the methodology; calibration links the readings to a known-good instrument; per-item data is the actual evidence; competent-person identification grounds the responsibility; failure handling shows the close-out; retest interval shows the regime continues.',
  },
  {
    id: 4,
    question: 'Why must the test instrument calibration date appear in the report?',
    options: [
      'To evidence the instrument was within calibration when the readings were taken',
      'To maintain the procurement and asset records for the test company',
      'To support a manufacturer warranty claim on the instrument',
      'It is optional and only added at the client\'s request',
    ],
    correctAnswer: 0,
    explanation:
      'Calibration is the chain of evidence for the numerical readings. A reading from an out-of-calibration meter is not trusted data; a report that does not state calibration status leaves an unanswered question for any auditor.',
  },
  {
    id: 5,
    question: 'Are electronic signatures acceptable on a PAT report?',
    options: [
      'No — only wet ink signatures are valid on the report',
      'Only if a second person witnesses and counter-signs',
      'Yes — they have legal effect where reliably attached and the signatory is identifiable',
      'Only for an internal copy, not the client deliverable',
    ],
    correctAnswer: 2,
    explanation:
      'Electronic signatures have legal effect in the UK under the Electronic Communications Act 2000 and eIDAS. Best practice is a digital signature on a hash-locked PDF; a pasted signature image is accepted but is weaker evidence of intent and document integrity.',
  },
  {
    id: 6,
    question: 'A PAT report should reference which standards / codes of practice?',
    options: [
      'BS 7671 as the primary standard for the testing',
      'PUWER 1998 as the governing methodology',
      'BS EN 60204 machinery wiring as the test basis',
      'IET CoP for In-service Inspection and Testing, 5th Ed., with HSG107 and EAWR 1989',
    ],
    correctAnswer: 3,
    explanation:
      'PAT sits under the IET Code of Practice 5th Edition (2020), HSG107 and EAWR 1989. BS 7671 is the fixed-wiring standard and is referenced for context, not as the primary methodology. Citing the wrong standard in the report is a defensibility weakness.',
  },
  {
    id: 7,
    question: 'What format should the PAT report archival copy be in?',
    options: [
      'A durable PDF/A archival copy plus the underlying data as a CSV / database export',
      'A single paper original retained in the contractor\'s files',
      'An email copy sent to the duty holder with no separate archive',
      'An editable Word document held on the test company server',
    ],
    correctAnswer: 0,
    explanation:
      'Long retention (6+ years) means the format has to survive software changes. PDF/A is the ISO archival format. Exporting the underlying data separately means future analysis is possible without reading the PDFs item-by-item. Paper alone is a single point of failure and thermal-printed labels fade.',
  },
  {
    id: 8,
    question:
      'A PAT report covers 600 items, of which 14 failed. How should the failures be presented?',
    options: [
      'Mentioned briefly in the report\'s covering summary note',
      'Left in the per-item table for the duty holder to find',
      'A dedicated failures section with asset ID, failure mode and action taken',
      'Omitted from the report and recorded only on the asset labels',
    ],
    correctAnswer: 2,
    explanation:
      "The duty holder's response to failures is the most operationally important output of the test round. A dedicated failures section lists each failed item by asset ID, the failure mode, the test that failed with its reading, the action taken (quarantined / repaired-and-retested / disposed) and the date — closing the loop and giving the responsible party a checklist. Burying failures in a long pass/fail column means they are missed.",
  },
  {
    id: 9,
    question:
      'An apprentice carried out the testing under supervision. Whose name appears as the &ldquo;tester&rdquo; on the report?',
    options: [
      'The apprentice alone, as the person who did the work',
      'The supervisor alone, as the responsible competent person',
      'The company name, with no individual tester identified',
      'Both — the apprentice as tester and the supervising competent person as signatory',
    ],
    correctAnswer: 3,
    explanation:
      'The competence model permits supervision of a less-experienced tester, but the responsible signatory must be a competent person. The apprentice is named as the person who carried out the test; the supervisor signs as competent person. Both names belong on the report — pretending the supervisor did the testing personally is misleading; pretending the apprentice signs as competent is unsupported by their training.',
  },
  {
    id: 10,
    question: 'When are PAT reports issued?',
    options: [
      'Promptly after the test round — typically within days or a few weeks',
      'Only on completion of the whole multi-site testing contract',
      'Annually, batched together with the next year\'s round',
      'Only when the duty holder specifically requests a copy',
    ],
    correctAnswer: 0,
    explanation:
      "The report is the duty holder's evidence of testing — it lists the failures requiring action and updates the next-test-due dates. Delivering it weeks or months later delays the duty holder's response, undermines the value of the testing and weakens their EAWR compliance posture.",
  },
];

const PATTestingModule5Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Certification and reporting requirements | PAT Module 5.5 | Elec-Mate',
    description:
      'IET CoP 5th Ed. Chapter 16: what a "PAT certificate" actually is, competent-person sign-off, recommended report content, electronic signatures, archival format, and how PAT reports differ from EICs.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5"
            title="Certification and reporting requirements"
            description="The PAT report is a record of work done — not a regulatory certificate. Recommended content under IET CoP 5th Ed. Chapter 16, the competent-person sign-off, electronic signatures, and PDF/A archival."
            tone="yellow"
          />

          <TLDR
            points={[
              'A &ldquo;PAT certificate&rdquo; is industry shorthand. The actual document is a test report — produced under IET CoP 5th Ed. + HSG107 to evidence the EAWR Reg 4(2) duty. It is a record of work done, not a regulatory certificate like an EIC under BS 7671.',
              'The signatory is a competent person within the IET CoP 5th Ed. definition: knowledge of the equipment + test procedures + hazards + ability to interpret results. Apprentices can carry out testing under supervision; the responsible signatory must be a competent person.',
              'Recommended report content (IET CoP 5th Ed. Chapter 16): standards followed, test instrument(s) + calibration, per-item asset + numerical results, competent person identification + qualifications, list of failures and action taken, retest interval / next-due date.',
              'Electronic signatures are legally acceptable under the Electronic Communications Act 2000 and eIDAS. Best practice is hash-locked PDFs with digital signature certificates.',
              'Archival: PDF/A for long-term retention plus the underlying data in CSV / database export. Paper alone is a single point of failure; thermal-printed labels fade.',
              'Failures get a dedicated section: each failed item by asset ID, failure mode, test that failed, action taken, date. This is the operationally critical part of the report.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish a PAT report from an EIC and explain why the term &ldquo;PAT certificate&rdquo; is informal industry usage',
              'Apply the competent-person test to identify who can sign a PAT report and how supervision works for less-experienced testers',
              'Compose a PAT report containing the elements IET CoP 5th Ed. Chapter 16 recommends, including the failures section that drives duty-holder response',
              'Justify why test instrument calibration date and reference standards belong in the report and where they go',
              'Apply electronic signatures and digital signing properly so the resulting document survives audit',
              'Choose archival formats (PDF/A + machine-readable export) that survive 6+ years of retention through software changes',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What a &ldquo;PAT certificate&rdquo; actually is</ContentEyebrow>

          <ConceptBlock
            title="A PAT report is a record of work done — not a regulatory certificate"
            plainEnglish="The phrase &lsquo;PAT certificate&rsquo; sounds like the EIC or EICR an electrician issues for fixed wiring under BS 7671. It is not. A PAT report is a record of in-service inspection and testing produced under the IET CoP / HSG107 framework, evidencing the EAWR Reg 4(2) duty."
            onSite="When a client asks &lsquo;where is my PAT certificate?&rsquo;, what they need is the test report. Use the right name. The shape and content of the document follows IET CoP 5th Ed. Chapter 16, not BS 7671 model forms."
          >
            <p>The two documents differ in regime, scope, methodology, and legal status:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Aspect</th>
                    <th className="text-left text-white/80 py-2">EIC / EICR (BS 7671)</th>
                    <th className="text-left text-white/80 py-2">PAT report</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold">Regulatory regime</td>
                    <td className="py-2">BS 7671 + EAWR + Building Regs</td>
                    <td className="py-2">EAWR + IET CoP 5th Ed. + HSG107</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold">Scope</td>
                    <td className="py-2">Fixed installation circuits</td>
                    <td className="py-2">Portable / lead-fed equipment</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold">Document family</td>
                    <td className="py-2">Model forms (BS 7671 Appendix 6)</td>
                    <td className="py-2">No prescribed model — IET CoP recommended content</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold">Notification</td>
                    <td className="py-2">Often notifiable under Building Regs Part P</td>
                    <td className="py-2">Not notifiable</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold">Signatory</td>
                    <td className="py-2">
                      Designer / Constructor / Inspector — qualified electrician
                    </td>
                    <td className="py-2">Competent person (IET CoP definition)</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">What it is</td>
                    <td className="py-2">A regulatory certificate — declaration of compliance</td>
                    <td className="py-2">
                      A record of inspection and testing — evidence of work done
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Calling the PAT report a &ldquo;certificate&rdquo; is widespread but conceptually
              misleading. It does not declare compliance with a single standard the way an EIC does.
              It records the inspection and testing carried out, references the standards followed,
              and lists the results. The duty holder uses the report as evidence that the EAWR Reg
              4(2) maintenance duty has been discharged.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) · Chapter 16"
            clause={
              <>
                Records of in-service inspection and testing should be made and retained. Where
                appropriate, a report consolidating the records may be issued, identifying the
                equipment inspected and tested, the standards or code of practice followed, the test
                results, the competent person responsible for the inspection and testing, and the
                date of the inspection and testing.
              </>
            }
            meaning="The IET CoP frames the document as a report consolidating records, not as a regulatory certificate. The required content is the audit trail — equipment, methodology, results, competent person, date — not a declaration of compliance against a single standard."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The competent-person sign-off</ContentEyebrow>

          <ConceptBlock
            title="Who can sign a PAT report — the IET CoP competence definition"
            plainEnglish="The signatory of a PAT report is a competent person. IET CoP 5th Ed. defines this as someone with sufficient knowledge of the equipment, the test procedures, and the hazards involved, plus the ability to interpret the results. The signatory takes professional responsibility for the report."
            onSite="Apprentices and trainees can carry out the actual testing under supervision. The supervisor signs the report as the competent person. The report should name both — who carried out the work, who took responsibility for it."
          >
            <p>
              IET CoP 5th Ed. defines the competent person without prescribing a single
              qualification. The criteria are functional:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Knowledge of the equipment</strong> — what it is, how it works, its
                construction class, the failure modes it is prone to.
              </li>
              <li>
                <strong>Knowledge of the test procedures</strong> — earth continuity, insulation
                resistance, leakage, polarity. Knowing how the meter does the tests and what the
                readings mean.
              </li>
              <li>
                <strong>Knowledge of the hazards</strong> — electric shock, indirect contact,
                damaged insulation, polarity reversal, working with energised equipment during a run
                / leakage test.
              </li>
              <li>
                <strong>Ability to interpret results</strong> — knowing what a 0.43 Ω earth
                continuity reading means in context, what triggers a fail, what is borderline, what
                to investigate.
              </li>
            </ul>
            <p>
              The competent person is normally evidenced by a qualification (e.g. City &amp; Guilds
              2377, the IET PAT testing certifications, or an electrical apprenticeship with PAT
              exposure) plus practical experience. There is no mandated qualification — competence
              is the gate, evidenced by qualification + experience.
            </p>
            <p>
              Supervision is permitted and common. An apprentice or trainee carries out the tests,
              with a competent person reviewing and taking responsibility for the report. The report
              names the tester (apprentice / trainee) AND the competent person who signs off. Both
              names are needed: pretending the supervisor did the testing personally is misleading,
              and pretending the apprentice signs as competent is unsupported by their training.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="A senior manager signing the report because they have authority"
            whatHappens="A facilities manager — without any PAT training — signs the PAT report on behalf of the company. They have authority to sign, but no competence in the IET CoP sense. If the report is challenged in an HSE investigation, the signatory cannot defend the technical content. The competent-person test fails because the actual person taking responsibility lacks the knowledge."
            doInstead="The signatory is the technically competent person, even if they are junior to the manager who would normally sign business documents. The IET CoP competence model is about technical responsibility, not corporate authority. If an authority signature is also required (e.g. for client-acceptance), it sits alongside the competent-person signature, not in place of it."
          />

          <Scenario
            title="Apprentice testing under supervision — naming on the report"
            situation="An apprentice carries out the bulk of the testing on a 200-item office estate. A qualified colleague supervises, reviews the readings, and inspects sample items. The colleague is the competent person."
            whatToDo="The report names the apprentice as the tester (the person who actually carried out the work) and the supervising colleague as the competent person taking responsibility for the report. Both names appear with their respective roles. The supervising colleague\'s qualifications and competence basis are stated in the report. The apprentice\'s role is acknowledged but the responsibility-bearer is unambiguous."
            whyItMatters="The HSE / insurer / court reading the report needs to know who took technical responsibility. A single name without role context is ambiguous. The two-name pattern is honest, clear, and supports the regime\'s competence model — including its training pipeline."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            What goes in the report — IET CoP 5th Ed. Chapter 16 content
          </ContentEyebrow>

          <ConceptBlock
            title="The recommended report structure — six load-bearing sections"
            plainEnglish="The report consolidates the audit trail. Six sections each carry their own evidential function; together they make a defensible record."
          >
            <p>The recommended structure:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-elec-yellow">Header — scope and dates.</strong> Duty holder
                name, site / location, date of test round, date of report. Reference to any contract
                / purchase order.
              </li>
              <li>
                <strong className="text-elec-yellow">Standards and methodology.</strong> The
                standards / codes of practice followed (IET CoP 5th Ed., HSG107, EAWR 1989). A short
                statement of methodology — categories and intervals applied per IET CoP Table 7.1,
                user-check / formal-visual / combined-test layers if relevant.
              </li>
              <li>
                <strong className="text-elec-yellow">Test instrument(s) used.</strong> Make, model,
                serial number, date of last calibration, calibration certificate reference. One row
                per instrument used during the round.
              </li>
              <li>
                <strong className="text-elec-yellow">Per-item results table.</strong> One row per
                asset tested. Columns: asset ID, description, class, location, test results
                (numerical: earth continuity Ω, insulation resistance MΩ, leakage mA, polarity),
                pass/fail, retest date. This is the evidence.
              </li>
              <li>
                <strong className="text-elec-yellow">Failures and action taken.</strong> Dedicated
                section. Each failed item by asset ID, the failure mode, the test that failed with
                the numerical reading, the action taken (quarantined / repaired-and-retested /
                disposed), and the date of action.
              </li>
              <li>
                <strong className="text-elec-yellow">Sign-off.</strong> The competent person\'s
                name, qualifications, signature (wet or electronic), and date. The tester\'s name
                separately if different. Statement of professional responsibility.
              </li>
            </ol>
            <p>
              Optional but commonly included: an executive summary at the top (number of items
              tested, pass / fail counts, headline findings), an appendix with the asset register
              snapshot at test time, and a recommendations section (interval review, equipment
              replacement, training needs).
            </p>
          </ConceptBlock>

          {/* Certificate / report structure diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              PAT report structure — six load-bearing sections
            </h4>
            <svg
              viewBox="0 0 800 510"
              className="w-full h-auto"
              role="img"
              aria-label="PAT report structure diagram. Six stacked sections from top to bottom: header with scope and dates, standards and methodology, test instruments and calibration, per-item results table, failures and action taken, and sign-off by competent person."
            >
              {/* Section 1 — Header */}
              <rect
                x="60"
                y="20"
                width="680"
                height="56"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text x="80" y="42" fill="#FBBF24" fontSize="11" fontWeight="bold">
                1. HEADER — scope, dates, duty holder
              </text>
              <text x="80" y="60" fill="rgba(255,255,255,0.7)" fontSize="9">
                Site, contract reference, test round date, report date.
              </text>

              {/* Section 2 — Methodology */}
              <rect
                x="60"
                y="86"
                width="680"
                height="56"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.4"
              />
              <text x="80" y="108" fill="#FBBF24" fontSize="11" fontWeight="bold">
                2. STANDARDS + METHODOLOGY
              </text>
              <text x="80" y="126" fill="rgba(255,255,255,0.7)" fontSize="9">
                IET CoP 5th Ed., HSG107, EAWR 1989. Categories + intervals applied (Table 7.1).
              </text>

              {/* Section 3 — Instruments */}
              <rect
                x="60"
                y="152"
                width="680"
                height="56"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.4"
              />
              <text x="80" y="174" fill="#FBBF24" fontSize="11" fontWeight="bold">
                3. TEST INSTRUMENTS + CALIBRATION
              </text>
              <text x="80" y="192" fill="rgba(255,255,255,0.7)" fontSize="9">
                Make / model / serial / calibration date / cert reference. One row per instrument.
              </text>

              {/* Section 4 — Per-item results */}
              <rect
                x="60"
                y="218"
                width="680"
                height="100"
                rx="8"
                fill="rgba(34,197,94,0.06)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="80" y="240" fill="#22C55E" fontSize="11" fontWeight="bold">
                4. PER-ITEM RESULTS TABLE — the evidence
              </text>
              <text x="80" y="258" fill="rgba(255,255,255,0.85)" fontSize="9">
                Columns: asset ID · description · class · location · earth continuity (Ω) ·
                insulation (MΩ)
              </text>
              <text x="80" y="272" fill="rgba(255,255,255,0.85)" fontSize="9">
                · leakage (mA) · polarity · pass/fail · retest date.
              </text>
              <text x="80" y="294" fill="rgba(255,255,255,0.65)" fontSize="9">
                One row per asset. The numerical readings are the audit trail.
              </text>
              <text x="80" y="308" fill="#FBBF24" fontSize="9" fontWeight="bold">
                Without this section the report is barely a record.
              </text>

              {/* Section 5 — Failures */}
              <rect
                x="60"
                y="328"
                width="680"
                height="76"
                rx="8"
                fill="rgba(239,68,68,0.08)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text x="80" y="350" fill="#EF4444" fontSize="11" fontWeight="bold">
                5. FAILURES + ACTION TAKEN
              </text>
              <text x="80" y="368" fill="rgba(255,255,255,0.85)" fontSize="9">
                Each failed item: asset ID · failure mode · test that failed (with reading) · action
                taken
              </text>
              <text x="80" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">
                (quarantined / repaired-and-retested / disposed) · date of action.
              </text>
              <text x="80" y="396" fill="#FBBF24" fontSize="9" fontWeight="bold">
                The operationally critical section — drives the duty holder\'s response.
              </text>

              {/* Section 6 — Sign-off */}
              <rect
                x="60"
                y="414"
                width="680"
                height="60"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text x="80" y="436" fill="#FBBF24" fontSize="11" fontWeight="bold">
                6. SIGN-OFF — competent person
              </text>
              <text x="80" y="454" fill="rgba(255,255,255,0.7)" fontSize="9">
                Name, qualifications, signature (wet or electronic), date. Tester named separately
                if different.
              </text>
              <text x="80" y="468" fill="rgba(255,255,255,0.55)" fontSize="9">
                Statement of professional responsibility for the report.
              </text>

              {/* Bottom caption */}
              <rect
                x="60"
                y="486"
                width="680"
                height="20"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="500" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                IET CoP 5th Ed. Chapter 16 — six sections, each with its own evidential function.
              </text>
            </svg>
          </div>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) · Chapter 16"
            clause={
              <>
                The records and any consolidated report should be sufficient to demonstrate that the
                inspection and testing has been carried out by a competent person, in accordance
                with the appropriate procedures, using suitable instruments, and that the results
                meet the criteria for the equipment under inspection.
              </>
            }
            meaning="The standard for &lsquo;sufficient&rsquo; is functional: can a third party reading the report verify the four facts above (competent person, appropriate procedures, suitable instruments, results meeting criteria)? If yes, the report is doing its job. The IET CoP avoids prescriptive content lists in favour of an evidential-sufficiency test."
          />

          <CommonMistake
            title="A pass/fail summary report with no per-item data"
            whatHappens="The PAT contractor delivers a one-page report: 'Tested 200 items. 198 pass, 2 fail (kettle and lamp). Annual interval applied. Signed off.' The duty holder accepts it. Six months later there is an incident on a printer in the same office. The HSE investigator asks for the per-item record. The contractor says the data is in the test instrument, but the report did not include it. The duty holder cannot demonstrate which items were tested and how — the &lsquo;reasonably practicable&rsquo; defence on the printer specifically is undermined."
            doInstead="The per-item table is non-negotiable. Asset ID, description, class, location, numerical results, pass/fail, retest date — one row per item. A summary-only report is not an IET CoP-compliant record. Insist on the data. If the contractor cannot deliver the per-item table, change contractors."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Electronic signatures and digital reports</ContentEyebrow>

          <ConceptBlock
            title="Electronic signatures have legal effect — but the document needs to be tamper-evident"
            plainEnglish="Electronic signatures are accepted under UK law (Electronic Communications Act 2000 + retained eIDAS framework). The strength of the evidence depends on the signature method — from a pasted image (weakest) through hash-locked PDF (medium) to qualified digital signatures (strongest)."
            onSite="A PDF report with a pasted signature image is a working record. A digitally signed PDF is a stronger record. For high-stakes environments (regulated industries, large estates with HSE exposure) the digital signature is worth the small additional setup."
          >
            <p>The signature methods, in order of evidential strength:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Pasted signature image.</strong> A scanned wet signature dropped into a PDF.
                Legally effective as a signature, but the document can be altered after signing
                without obvious evidence. Acceptable for low-stakes records; under-defended for
                high-stakes ones.
              </li>
              <li>
                <strong>Hash-locked PDF with metadata.</strong> The PDF is fixed at signature-time;
                any alteration breaks the hash. The signatory\'s identity is in the document
                metadata. Better evidence than a pasted image.
              </li>
              <li>
                <strong>Digital signature certificate (PKI-based).</strong> A cryptographic
                signature tied to a verified identity certificate. The signature is verifiable by
                anyone with the public key, and any alteration to the document invalidates the
                signature. The strongest standard form.
              </li>
              <li>
                <strong>Qualified electronic signature (eIDAS QES).</strong> A digital signature
                certified by a Qualified Trust Service Provider. Legally equivalent to a
                hand-written signature under retained eIDAS. Highest legal standing.
              </li>
            </ul>
            <p>
              For most PAT reports a hash-locked PDF with a digital signature is appropriate. The
              tooling is widely available (Adobe Acrobat, Foxit, several browser-based services).
              Pasted signature images are a working compromise for small contractors but should be
              paired with at least PDF locking to prevent post-signature alteration.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electronic Communications Act 2000 · Section 7"
            clause={
              <>
                In any legal proceedings, an electronic signature incorporated into or logically
                associated with a particular electronic communication or particular electronic data,
                and the certification by any person of such a signature, shall each be admissible in
                evidence in relation to any question as to the authenticity of the communication or
                data or as to the integrity of the communication or data.
              </>
            }
            meaning="Electronic signatures are admissible in UK legal proceedings. The evidential weight depends on the method — a hash-locked, digitally signed PDF is much stronger evidence than a pasted image. PAT reports signed electronically are legally on the same footing as wet-signed reports, provided the signature method is reasonable."
          />

          <SectionRule />

          <ContentEyebrow>Archival format — surviving the retention period</ContentEyebrow>

          <ConceptBlock
            title="PDF/A plus machine-readable export — the practical archival pattern"
            plainEnglish="A PAT report has to remain readable for 6+ years (longer in some sectors). Software changes; older formats become harder to open. Archive in PDF/A (the ISO archival PDF format) plus the underlying data in CSV / database export so future analysis is possible."
          >
            <p>The archival pattern that survives the retention period:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>PDF/A (ISO 19005).</strong> The archival subset of PDF — fonts embedded, no
                external dependencies, no JavaScript. Designed to remain readable across software
                generations.
              </li>
              <li>
                <strong>Underlying data export.</strong> CSV, Excel, or database export of the
                per-item table. Lets future analysis (failure-rate trends, retest scheduling, asset
                queries) happen without re-keying from the PDF.
              </li>
              <li>
                <strong>Tamper-evident storage.</strong> Document management system, write-once
                archive, or hash-recorded folder. The intent is that an alteration is detectable.
              </li>
              <li>
                <strong>Backup.</strong> At least two independent copies, one off-site or in a
                separate cloud region. Single points of failure are not consistent with 6-year
                retention.
              </li>
              <li>
                <strong>Discoverability.</strong> A search / index that lets a specific item\'s test
                history be retrieved by asset ID within minutes, not hours. HSE requests rarely
                allow days for retrieval.
              </li>
            </ul>
            <p>
              Paper alone is a single point of failure: fire, water, lost-in-move scenarios are
              real. Thermal-printed labels and instrument printouts fade. Native instrument database
              files become unreadable when the instrument is replaced unless exported. Build the
              archival path into the test process from the start.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Relying on the PAT instrument\'s internal storage as the archival record"
            whatHappens="The PAT instrument stores the test results internally. The contractor relies on the instrument as the master record. Three years later the instrument is replaced; the new model uses a different storage format. The historical data is theoretically exportable but the manufacturer no longer supports the export tool. The duty holder\'s 3-year-old records are effectively unreadable."
            doInstead="Export from the instrument at the time of each test round. Keep the export in PDF/A (the human-readable report) and CSV (the machine-readable data). Use the asset register / test management system as the master archive, not the instrument. The instrument is the data source; the archive is independent."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'A &lsquo;PAT certificate&rsquo; is industry shorthand. The actual deliverable is a test report — a record of work done under IET CoP / HSG107, evidencing the EAWR Reg 4(2) duty.',
              'It is not an EIC. EICs are regulatory certificates under BS 7671 for the fixed installation. PAT reports cover portable / lead-fed equipment under a different regime.',
              'Signatory = competent person (IET CoP definition: knowledge + experience + interpretation ability). Apprentices test under supervision; the signatory is the supervising competent person. Both names appear on the report.',
              'Six recommended report sections (IET CoP 5th Ed. Chapter 16): header, standards / methodology, instruments + calibration, per-item results table, failures + action, sign-off.',
              'Per-item numerical results table is the evidence. Without it, the report is barely a record.',
              "Failures section is operationally critical — drives the duty holder's response (quarantine, repair, retest, disposal).",
              'Electronic signatures legally accepted (Electronic Communications Act 2000 + eIDAS). Hash-locked PDFs and digital signature certificates give the strongest evidence.',
              'Archive in PDF/A plus CSV / database export. Paper alone, thermal-printed labels alone, or instrument-internal storage alone are all single points of failure across a 6-year retention.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is a &ldquo;PAT certificate&rdquo; the same as an EIC?',
                answer:
                  "No. EICs are regulatory certificates under BS 7671 covering the fixed wiring installation. PAT reports cover portable / lead-fed equipment under EAWR / IET CoP / HSG107. Different regimes, different scopes, different document families. The two are produced by separate processes and live alongside each other in a duty holder's compliance file.",
              },
              {
                question: 'Who can sign a PAT report?',
                answer:
                  'A competent person within the IET CoP 5th Ed. definition — knowledge of the equipment, the test procedures and the hazards, plus the ability to interpret results. There is no single mandated qualification. Common evidence is City & Guilds 2377, IET PAT testing certifications, or an electrical trade qualification with PAT exposure, plus practical experience. Apprentices and trainees can carry out the testing under the supervision of a competent person, who signs the report.',
              },
              {
                question: 'Is a one-page summary report acceptable?',
                answer:
                  'No. The per-item numerical results table is a non-negotiable section under IET CoP 5th Ed. Chapter 16 — it is the evidence that the testing was actually carried out. A summary report without per-item data is barely a record; the duty holder cannot use it to defend the EAWR Reg 4(2) defence on a specific item that subsequently fails. Insist on the per-item table.',
              },
              {
                question: 'Can I sign the report electronically?',
                answer:
                  'Yes. Electronic signatures have legal effect under the Electronic Communications Act 2000 and retained eIDAS. Best practice is a hash-locked PDF with a digital signature certificate; pasted signature images are accepted but provide weaker evidence of intent and document integrity. The signature method should be appropriate to the stakes — for high-exposure environments, a qualified electronic signature is worth the small additional setup.',
              },
              {
                question: 'What standards should the report reference?',
                answer:
                  'IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020), with reference to HSG107 and EAWR 1989 as the regulatory framework. Do not reference BS 7671 as the primary standard for PAT — that is the fixed-wiring standard. Citing the wrong standard is a defensibility weakness; citing the right one is part of the audit trail.',
              },
              {
                question: 'How long should I retain PAT reports?',
                answer:
                  'Industry practice is 6 years post-disposal of the equipment, anchored to the Limitation Act 1980 default civil-claim window. For equipment involved in HSE-relevant incidents, longer (until proceedings conclude plus the limitation period). Some sectors (healthcare, education, regulated industries) require longer. Archive in PDF/A plus a machine-readable data export so retrieval remains possible across software generations.',
              },
              {
                question: 'A failure was found during the test round. Does the report mention it?',
                answer:
                  "Yes — and it gets a dedicated failures section. Each failed item: asset ID, failure mode, the test that failed (with the numerical reading that produced the fail), action taken (quarantined / repaired-and-retested / disposed), date of action. This is the operationally critical part of the report — it drives the duty holder's response and closes the loop on the failure.",
              },
              {
                question:
                  'A client is asking for the report immediately after testing. How quickly should it be delivered?',
                answer:
                  "Promptly — typically within days, at most a few weeks. The report is not a deliverable that can wait: it lists the failures requiring duty-holder action and updates next-test-due dates that feed the maintenance regime. Modern PAT instruments + test-management systems make same-day report generation realistic. Delays in the report mean delays in the duty holder's response.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Certification and reporting — Module 5.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-course')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Course complete <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Back to course landing
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default PATTestingModule5Section5;
