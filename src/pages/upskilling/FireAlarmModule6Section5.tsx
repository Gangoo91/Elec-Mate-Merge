import { ArrowLeft, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
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
    id: 'fam6-s5-extension',
    question:
      'BS 5839-1:2025 introduces a new Section 7 covering extensions and modifications. The certificate previously called "modification certificate" has been renamed to.',
    options: [
      'No certificate is needed.',
      '"Extension or modification certificate" — recognising that extensions to existing systems and modifications to existing systems both require certification but are different in nature. The 2025 standard adds clarification that when undertaking an extension to a system, the new works should comply with the current version of the standard, but the overall system might not conform to the current standard. The cert documents what was done and confirms that the new works comply at the date of the work.',
      '"Service certificate."',
      '"Variation certificate."',
    ],
    correctIndex: 1,
    explanation:
      'Section 7 is new in 2025 and it covers both extensions and modifications. The certificate has been renamed to reflect the dual purpose. The new wording also clarifies the awkward "extension to an old system" case — the new works comply with current standards but the overall system may have legacy aspects that do not.',
  },
  {
    id: 'fam6-s5-firmware',
    question: 'A firmware update is applied to a CIE. Per BS 5839-1:2025 clause 7, this is.',
    options: [
      'Just servicing.',
      'A modification — a certificate is required. This is a 2025 clarification that closes a long-standing gap where firmware updates were treated as informal updates without paperwork. Firmware changes the operational behaviour of a life-safety device and therefore qualifies as a modification under clause 7. The extension or modification certificate documents the pre-update version, the post-update version, the verification that the system performs the cause-and-effect as designed, and the post-action operational confirmation.',
      'No paperwork at all.',
      'Always invalidates the system.',
    ],
    correctIndex: 1,
    explanation:
      'Firmware update = modification = cert required. The 2025 clarification removes the previous ambiguity. The cert sits alongside the cyber-security log entry (clause 43.4) and the logbook entry — three records that together evidence the firmware change.',
  },
  {
    id: 'fam6-s5-unacceptable',
    question:
      'BS 5839-1:2025 clause 6 (Variations) introduces explicit examples of variations now declared UNACCEPTABLE. Which of the following is named?',
    options: [
      'Slightly increased detector spacing.',
      'The absence of a zone plan in premises with more than one zone on any storey, particularly premises in which people sleep; AND the absence of facility for transmission of fire alarm signals to an ARC in supported housing where a Grade A system per BS 5839-6:2019 is necessary, and in residential care homes. These two specific cases are now declared so detrimental to the safety of life that they should NOT be regarded as acceptable variations. ALL other variations need justification, especially if proposed at installation or commissioning stage; some agreed variations remain possible but the bar is higher than in 2017.',
      'Battery age beyond five years.',
      'Late service visits.',
    ],
    correctIndex: 1,
    explanation:
      'Two specific exclusions in clause 6: zone-plan absence in multi-zone sleeping premises; ARC-transmission absence in supported housing / care homes. The 2025 standard names these as no-longer-acceptable. Other variations remain agreeable but with stronger justification expected.',
  },
  {
    id: 'fam6-s5-schemes',
    question:
      'Third-party certification schemes for fire-detection-and-alarm work in the UK include.',
    options: [
      'Only one scheme.',
      'BAFE SP203 (the dominant scheme for design, installation, commissioning, and maintenance), BAFE SP207 (for fire-alarm engineers individually), FIA (Fire Industry Association — membership scheme covering training, units, and quality standards), NSI (National Security Inspectorate, NACOSS Gold for fire and security), SSAIB (Security Systems and Alarms Inspection Board, broader life-safety scope). Each scheme audits its members against documented quality systems and provides assurance to AHJs and insurers that the four-pillar competence definition (Section 6.2) is being met.',
      'Just BAFE.',
      'There are no schemes.',
    ],
    correctIndex: 1,
    explanation:
      'Multiple third-party schemes operate in the UK, with BAFE SP203 the most widely-recognised for company-level certification. Individual engineers may also hold FIA unit qualifications, BAFE SP207, or manufacturer-specific accreditations. AHJs and insurers increasingly require evidence of one of these schemes.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which certificate is issued at acceptance / handover of a new fire-alarm system per BS 5839-1:2025 Annex G?',
    options: [
      'Annual service certificate.',
      "Acceptance certificate (Annex G in BS 5839-1:2025). Issued by the commissioning organisation after the design / installation / commissioning has been completed and the system has been demonstrated to perform per the cause-and-effect matrix and the design specification. The acceptance certificate is the key document that fixes the system's baseline configuration and the datum date for the six-monthly servicing cycle.",
      'Quote document.',
      'Insurance form.',
    ],
    correctAnswer: 1,
    explanation:
      'Acceptance certificate per Annex G is the handover document. Fixes baseline; sets the datum for clause 43.2.1 servicing intervals; lists any agreed variations from the standard.',
  },
  {
    id: 2,
    question: 'The previous "modification certificate" (BS 5839-1:2017) is renamed in 2025 to.',
    options: [
      '"Acceptance certificate."',
      '"Extension or modification certificate." The renaming reflects the new Section 7 covering both extensions and modifications. An extension adds new components / coverage to an existing system; a modification changes the configuration / firmware / cause-and-effect of an existing system. Both require certification. The 2025 standard also clarifies that extension works comply with the current standard at the date of the work, while the overall system may retain legacy aspects that do not all conform to the current standard.',
      '"Service certificate."',
      '"Audit certificate."',
    ],
    correctAnswer: 1,
    explanation:
      'New name: extension or modification certificate. Reflects the new Section 7 dual-purpose scope. Clarifies legacy-system coexistence with new works.',
  },
  {
    id: 3,
    question: 'A firmware update on a CIE in 2025 requires what documentation?',
    options: [
      'Nothing.',
      'An extension or modification certificate per clause 7 (firmware updates are now classed as modifications), a logbook entry per clause 48, and a remote-access log entry per clause 43.4 (if the update was applied remotely). Three trails converge: the certificate documenting what was done; the logbook diary; the cyber-security log. Pre-2025 firmware updates were often treated as informal — the 2025 standard formalises the paperwork.',
      'Just a verbal handover.',
      'A new acceptance certificate.',
    ],
    correctAnswer: 1,
    explanation:
      'Three trails: extension or modification certificate + logbook entry + cyber-security log entry. Firmware update is a modification; the standard treats it formally.',
  },
  {
    id: 4,
    question:
      'BS 5839-1:2025 clause 6 declares two specific variations as UNACCEPTABLE. Which pair?',
    options: [
      'Detector spacing slightly increased AND late service visits.',
      'Absence of a zone plan in premises with more than one zone on any storey (particularly premises in which people sleep); AND absence of ARC alarm transmission in supported housing (where Grade A system per BS 5839-6:2019 is required) and in residential care homes. These two specific variations are now declared so detrimental to safety of life that they should not be regarded as acceptable. All OTHER variations remain possible by agreement but require justification, especially at installation / commissioning stage.',
      'Wrong colour cable.',
      'No variations are unacceptable.',
    ],
    correctAnswer: 1,
    explanation:
      'Two specific exclusions in clause 6: zone-plan absence in multi-zone sleeping premises; ARC absence in supported housing / care home. The standard names these explicitly as no-longer-agreeable.',
  },
  {
    id: 5,
    question:
      'Third-party certification schemes commonly required by AHJs and insurers in the UK include which of the following?',
    options: [
      'Only manufacturer accreditation.',
      'BAFE SP203 (the dominant scheme covering design / install / commission / maintain), BAFE SP207 (individual engineer certification), FIA membership and unit accreditation, NSI (NACOSS Gold), and SSAIB. AHJs and insurers increasingly require evidence of scheme membership as the practical assurance route for the BS 5839-1:2025 clause 3.13 competent-person definition. Self-declaration of competence is harder to defend; scheme membership provides external assurance.',
      'Just one scheme.',
      'No schemes are recognised.',
    ],
    correctAnswer: 1,
    explanation:
      'Multiple schemes recognised in the UK. BAFE SP203 dominant for organisations; FIA / BAFE SP207 for individuals. Scheme membership is the practical assurance route.',
  },
  {
    id: 6,
    question:
      'A 2026 extension adds five detectors and one MCP to an existing 2010-installed system. The certificate.',
    options: [
      'Re-certifies the whole system to current standards.',
      "Documents the new works only, with a statement that the new works comply with BS 5839-1:2025 at the date of the work, and that the overall system retains aspects from the original 2010 commissioning that may not all conform to the current standard. The extension certificate sits alongside the original acceptance certificate; together they describe the system's history. The asset register is updated to include the five new detectors and one new MCP. The cause-and-effect is updated.",
      'Replaces the original acceptance.',
      'No certificate needed.',
    ],
    correctAnswer: 1,
    explanation:
      'Extension cert documents the new works, not the legacy. The legacy retains its 2010 baseline. The 2025 standard explicitly accommodates this scenario — extensions comply at date of work; overall system may legacy-deviate.',
  },
  {
    id: 7,
    question:
      'A 2026 service visit identifies that the original 2018 commissioning agreed a delay on FRS signal transmission to allow staff investigation — recorded in the logbook as a "minor variation". Per 2025, this should be.',
    options: [
      'Removed automatically.',
      'Re-evaluated against the 2025 clause 6 wording. If the variation is for premises in which people sleep (e.g. care home, supported housing) and the variation removes ARC transmission entirely, that is now unacceptable. If the variation is a delay only (not absence) and the premises type / system grade allows it under 2025 clause 6 wording, the variation may continue to be agreed but should be documented per the 2025 "all variations recorded" rule. The logbook entry is updated to capture the 2025 review and the conclusion.',
      'Re-recorded as "major" only.',
      'Removed without consultation.',
    ],
    correctAnswer: 1,
    explanation:
      'Re-evaluation against 2025 clause 6 is the correct response. Variations that 2025 declares unacceptable cannot continue; other variations may continue with justification but must be properly recorded under the 2025 all-variations rule.',
  },
  {
    id: 8,
    question: 'A periodic inspection certificate (six-monthly) covers what?',
    options: [
      'A statement that the system is brand new.',
      'A statement of the inspection / service work performed, the test outcomes, the open defects, the recommendations, and the conformity status of the system as left at the visit. The certificate is per the relevant scheme template (BAFE SP203 schemes have their own template, FIA members may use the FIA template, manufacturer-specific schemes may apply for their installations). The certificate is signed by the competent engineer and entered in the logbook with reference.',
      'A new acceptance certificate.',
      'No conformity statement.',
    ],
    correctAnswer: 1,
    explanation:
      'Periodic inspection certificate = service report formalised. Lists what was done, what was found, what is open, what is recommended, the conformity status. Per the relevant scheme template.',
  },
  {
    id: 9,
    question:
      'An AHJ visits a care home and inspects the documentation. The most useful single document for them to inspect is.',
    options: [
      'A photograph of the panel.',
      'The logbook — front section gives the system identification, asset register lives with it, every event class is recorded chronologically, certificates (acceptance, extension or modification) are referenced or filed with it, conformity statements at every six-monthly visit are recorded. An experienced AHJ can read off the maintenance history, the variation status, the open defect status, and the cyber-security access record from the logbook in minutes.',
      'A blank service contract.',
      'A staff payroll.',
    ],
    correctAnswer: 1,
    explanation:
      'Logbook is the single document that ties everything together. AHJs and insurers read it first because it tells them most things they want to know. A well-maintained logbook is the single best evidence of a well-run system.',
  },
  {
    id: 10,
    question:
      'A new system is commissioned on 14 January 2026. The acceptance certificate is signed and issued. What does the date of acceptance establish under BS 5839-1:2025?',
    options: [
      'Just the contract date.',
      "The DATUM for the six-monthly servicing schedule (clause 43.2.1 Note 2). Successive service visits are timed at approximately six months from this date with the five-to-seven-month tolerance. The datum is fixed at acceptance and does NOT move with subsequent visits — this prevents schedule drift across multiple cycles. The acceptance date also establishes the start of the system's warranty period (per the contract) and the start of the asset register chronology.",
      'No special significance.',
      'Just the install start date.',
    ],
    correctAnswer: 1,
    explanation:
      'Acceptance date = datum for clause 43.2.1 servicing intervals. Fixed; does not move. Stops cumulative drift.',
  },
];

const FireAlarmModule6Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Verification and certification | Fire Alarm Module 6.5 | Elec-Mate',
    description:
      'BS 5839-1:2025 verification and certification — acceptance certificate (Annex G), the new "extension or modification certificate" (renamed and scoped under Section 7), firmware updates as modifications, third-party schemes (BAFE SP203, FIA, NSI, SSAIB), and the new clause 6 unacceptable-variation rules.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5"
            title="Verification and certification"
            description="The certification chain runs from acceptance (Annex G) through every modification (Section 7, NEW 2025) and every periodic service. BS 5839-1:2025 renames the modification certificate to extension or modification certificate, formally classes firmware updates as modifications, and tightens the variation rules in clause 6 — some variations are now declared unacceptable. Third-party schemes (BAFE SP203, FIA, NSI, SSAIB) are the practical assurance route for AHJs and insurers."
            tone="yellow"
          />

          <TLDR
            points={[
              'Acceptance certificate (Annex G) issued at handover. Fixes the system baseline and sets the DATUM date for the six-monthly servicing cycle (clause 43.2.1 Note 2).',
              'NEW 2025 — Section 7 covers extensions and modifications together. Old "modification certificate" renamed to "extension or modification certificate".',
              'NEW 2025 clarification — firmware updates are modifications. Cert required. Pairs with logbook entry (clause 48) and remote-access log entry (clause 43.4).',
              'Extension to a legacy system: new works comply with BS 5839-1:2025 at the date of the work; overall system may retain legacy aspects that do not all conform.',
              'NEW 2025 — clause 6 declares two variations UNACCEPTABLE: absence of a zone plan in multi-zone sleeping premises; absence of ARC alarm transmission in supported housing (Grade A) and residential care homes.',
              'All other variations need justification, especially at installation / commissioning. ALL variations recorded (Section 6.4 covers logbook recording).',
              'Third-party schemes: BAFE SP203 (dominant for organisations), BAFE SP207 (individuals), FIA, NSI, SSAIB. Practical assurance route for clause 3.13 competent-person evidence.',
              'Insurers and AHJs increasingly require evidence of scheme membership; self-declaration of competence is harder to defend.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the acceptance certificate (Annex G) as the handover document and the datum date for the six-monthly servicing cycle',
              'Apply BS 5839-1:2025 Section 7 — extensions and modifications — and the new "extension or modification certificate" terminology',
              'Apply the 2025 clarification that firmware updates are modifications requiring an extension or modification certificate',
              'Manage extensions to legacy systems with the 2025 clarification that new works comply at the date of the work while the overall system may retain legacy aspects',
              'Apply the new BS 5839-1:2025 clause 6 unacceptable-variation rules: zone-plan absence in multi-zone sleeping premises, ARC absence in supported housing / care home',
              'Justify all other variations with the 2025-tightened expectation, especially at installation / commissioning',
              'Identify the UK third-party schemes (BAFE SP203, BAFE SP207, FIA, NSI, SSAIB) and how they provide assurance to AHJs and insurers',
              "Manage the certification chain from acceptance through extensions / modifications / periodic services as the audit trail for the system's life",
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The acceptance certificate — Annex G</ContentEyebrow>

          <ConceptBlock
            title="What acceptance fixes"
            plainEnglish="The acceptance certificate is the handover document — issued by the commissioning organisation after the design / installation / commissioning has been completed, the system has been demonstrated to perform per the cause-and-effect matrix and the design specification, and any agreed variations have been recorded. The certificate is the key document for the rest of the system\'s life. It fixes the baseline configuration. It establishes the datum date for the six-monthly servicing cycle (clause 43.2.1 Note 2). It carries the list of any agreed variations. It is referenced by every subsequent extension, modification, and periodic certificate."
            onSite="The acceptance certificate is the system\'s birth certificate. Treat it accordingly: store the original securely, archive copies, ensure the responsible person has a physical or electronic copy on site at all times."
          >
            <p>The acceptance certificate content (per Annex G):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Premises identification.</strong> Address, occupancy class, responsible
                person.
              </li>
              <li>
                <strong>System identification.</strong> Category (M / L1-L5 / P1-P2), grade (if BS
                5839-6 reference applicable for residential), CIE manufacturer / model, detector
                technology summary, ARC connection details.
              </li>
              <li>
                <strong>Compliance statement.</strong> The system was designed, installed, and
                commissioned in accordance with BS 5839-1:2025 (or the applicable edition at the
                date of work).
              </li>
              <li>
                <strong>Variations recorded.</strong> Every agreed variation from the standard, with
                justification and agreement parties. (NEW 2025 — all variations, not just "major".)
              </li>
              <li>
                <strong>Cause-and-effect summary.</strong> The system\'s programmed response to each
                event class — alarm activations, zone interactions, sounder / VAD activations,
                ancillary equipment (lifts, AOVs, magnetic door holders, fire dampers).
              </li>
              <li>
                <strong>Test data summary.</strong> Functional test outcomes for every device,
                interface tests, ARC transmission tests, battery back-up duration test.
              </li>
              <li>
                <strong>Signature and date.</strong> Commissioning engineer (competent person),
                organisation, scheme accreditation reference, date.
              </li>
            </ul>
            <p>
              Once signed, the acceptance certificate is the unchanging baseline. Subsequent
              modifications and extensions are documented separately and reference back to the
              acceptance. The acceptance date is the datum for the servicing cycle and does not
              move.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Extensions and modifications — Section 7 (NEW)</ContentEyebrow>

          <ConceptBlock
            title="The new dual-purpose section"
            plainEnglish="BS 5839-1:2025 introduces a new Section 7 covering extensions and modifications. The 2017 edition had a clause 46 that covered modifications only; the 2025 edition adds a new clause specifically on extensions and renames the certificate. The reasoning is that extensions (adding new coverage) and modifications (changing existing coverage / configuration / firmware) are different in nature and should be treated as such, even though they share the certificate template."
          >
            <p>Extension vs modification:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Extension</strong> — new coverage added to the system. New zones, new
                detectors, new MCPs in a previously-unprotected area. The new works comply with BS
                5839-1:2025 at the date of the work. The overall system may retain legacy aspects
                (devices, cabling, design choices) that do not all conform to current standards —
                this is explicitly accommodated by the 2025 wording.
              </li>
              <li>
                <strong>Modification</strong> — change to existing coverage / configuration /
                firmware. Re-zoning, change to detector technology, change to cause-and-effect, CIE
                firmware update, replacement of CIE. The modification certificate documents what was
                changed and confirms the modified system continues to perform per the
                cause-and-effect.
              </li>
            </ul>
            <p>The certificate (per Section 7):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reference to the original acceptance.</strong> The certificate sits in the
                certification chain — acceptance → extensions / modifications → periodic
                inspections.
              </li>
              <li>
                <strong>Description of the work.</strong> What was added or changed, where, and why.
              </li>
              <li>
                <strong>Compliance statement for the new works.</strong> The new works comply with
                the current standard at the date of the work. (For extensions to legacy systems, the
                certificate explicitly notes the overall system retains legacy aspects.)
              </li>
              <li>
                <strong>Test data.</strong> Functional verification of the new / modified components
                and the system\'s continued cause-and-effect performance.
              </li>
              <li>
                <strong>Asset register update.</strong> New devices added; modified devices updated;
                redundant devices removed (per the 2025 recommendation that redundant devices should
                be removed where practicable, or clearly identified as no longer in use).
              </li>
              <li>
                <strong>Signature and date.</strong> Per the acceptance template.
              </li>
            </ul>
            <p>
              The renaming of "modification certificate" to "extension or modification certificate"
              is the visible 2025 change; the substantive change is the explicit accommodation of
              legacy-system extensions and the formal recognition that firmware updates are
              modifications.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Section 7 (Extensions and modifications)"
            clause={
              <>
                A new Section 7 Extensions and modifications has been added. This new section
                incorporates the previous BS 5839-1:2017 clause 46 and adds a new clause on
                extensions. This clarifies that when undertaking an extension to a system, whilst
                the new works undertaken should comply with the current version of the standard it
                acknowledges that the overall system might not conform to the current standard. The
                certificate that should be issued after any extension or modification has been
                complete has been updated from a modification certificate to an extension or
                modification certificate. It has now been clarified that updating the firmware of a
                CIE is a modification and as such will require a certificate to be produced.
              </>
            }
            meaning="Three load-bearing changes. First — Section 7 dual-scope (extensions + modifications). Second — extension to legacy systems explicitly accommodated; new works comply, overall may not. Third — firmware updates are formally modifications. Cert renamed to reflect dual purpose."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          {/* Diagram — certification path / scheme map */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Certification chain + UK third-party schemes
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="Top half: certification chain from design through acceptance through extensions / modifications / periodic services to end of life. Bottom half: UK third-party schemes — BAFE SP203, BAFE SP207, FIA, NSI, SSAIB — with their assurance scope."
            >
              <rect
                x="20"
                y="20"
                width="840"
                height="36"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="440"
                y="44"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                Certification chain · BS 5839-1:2025
              </text>

              {/* Chain — five boxes */}
              {[
                { x: 30, t: 'DESIGN', d: 'Design certificate', c: '#22D3EE' },
                { x: 195, t: 'INSTALL', d: 'Installation certificate', c: '#22D3EE' },
                { x: 360, t: 'COMMISSION', d: 'Commissioning certificate', c: '#22D3EE' },
                { x: 525, t: 'ACCEPTANCE', d: 'Annex G — datum', c: '#FBBF24' },
                { x: 690, t: 'PERIODIC', d: 'Six-monthly inspection cert', c: '#A855F7' },
              ].map((b, i) => (
                <g key={b.t}>
                  <rect
                    x={b.x}
                    y="80"
                    width="160"
                    height="60"
                    rx="10"
                    fill={`${b.c}1A`}
                    stroke={b.c}
                    strokeWidth="1.6"
                  />
                  <text
                    x={b.x + 80}
                    y="106"
                    textAnchor="middle"
                    fill={b.c}
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {b.t}
                  </text>
                  <text
                    x={b.x + 80}
                    y="124"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize="9.5"
                  >
                    {b.d}
                  </text>
                  {i < 4 && (
                    <line
                      x1={b.x + 160}
                      y1="110"
                      x2={b.x + 195}
                      y2="110"
                      stroke={b.c}
                      strokeWidth="1.4"
                    />
                  )}
                </g>
              ))}

              {/* Extension / modification branch */}
              <rect
                x="270"
                y="170"
                width="340"
                height="46"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="440"
                y="190"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                EXTENSION or MODIFICATION certificate (NEW 2025)
              </text>
              <text x="440" y="206" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Section 7 · firmware updates are modifications · references back to acceptance
              </text>

              {/* Arrows from chain to ext/mod */}
              <line
                x1="605"
                y1="140"
                x2="500"
                y2="170"
                stroke="#EF4444"
                strokeWidth="1.2"
                strokeDasharray="3,2"
              />
              <line
                x1="380"
                y1="140"
                x2="400"
                y2="170"
                stroke="#EF4444"
                strokeWidth="1.2"
                strokeDasharray="3,2"
              />

              {/* UK schemes header */}
              <rect
                x="20"
                y="240"
                width="840"
                height="36"
                rx="8"
                fill="rgba(168,85,247,0.08)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="440"
                y="264"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="13"
                fontWeight="bold"
              >
                UK third-party schemes — assurance to AHJs and insurers
              </text>

              {[
                {
                  x: 30,
                  t: 'BAFE SP203',
                  d: 'Organisations\ndesign / install / commission / maintain',
                  c: '#FBBF24',
                },
                {
                  x: 195,
                  t: 'BAFE SP207',
                  d: 'Individual\nfire-alarm engineer certification',
                  c: '#FBBF24',
                },
                { x: 360, t: 'FIA', d: 'Trade body\nunit accreditation, training', c: '#22D3EE' },
                { x: 525, t: 'NSI', d: 'NACOSS Gold\nfire & security inspectorate', c: '#A855F7' },
                { x: 690, t: 'SSAIB', d: 'Life-safety\nbroad scope inspection', c: '#A855F7' },
              ].map((b) => (
                <g key={b.t}>
                  <rect
                    x={b.x}
                    y="296"
                    width="160"
                    height="80"
                    rx="10"
                    fill={`${b.c}1A`}
                    stroke={b.c}
                    strokeWidth="1.6"
                  />
                  <text
                    x={b.x + 80}
                    y="320"
                    textAnchor="middle"
                    fill={b.c}
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {b.t}
                  </text>
                  {b.d.split('\n').map((l, i) => (
                    <text
                      key={i}
                      x={b.x + 80}
                      y={342 + i * 13}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.75)"
                      fontSize="9.5"
                    >
                      {l}
                    </text>
                  ))}
                </g>
              ))}

              {/* Variations panel */}
              <rect
                x="20"
                y="400"
                width="840"
                height="120"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="440"
                y="424"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="13"
                fontWeight="bold"
              >
                Clause 6 — Variations (NEW 2025: some declared UNACCEPTABLE)
              </text>
              <text x="40" y="446" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                Now UNACCEPTABLE (cannot be agreed):
              </text>
              <text x="40" y="462" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                • Absence of a zone plan in premises with more than one zone on any storey,
                particularly premises in which people sleep
              </text>
              <text x="40" y="476" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                • Absence of ARC transmission in supported housing (Grade A per BS 5839-6:2019) and
                residential care homes
              </text>
              <text x="40" y="498" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                All OTHER variations:
              </text>
              <text x="40" y="512" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Possible by agreement with strong justification — recorded comprehensively (NEW: ALL
                variations, not just "major")
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Variations — clause 6 (NEW 2025)</ContentEyebrow>

          <ConceptBlock
            title="The two unacceptable variations"
            plainEnglish="BS 5839-1:2025 clause 6 makes a notable change. Although BS 5839-1 has always been a code of practice that allows variations against its recommendations, the 2025 edition now explicitly identifies two specific variations that should NOT be regarded as acceptable. These are variations that the standard\'s authors consider so detrimental to safety of life that no justification can support them. All other variations remain possible by agreement, but the bar is raised — each requires justification, especially at the installation or commissioning stage."
          >
            <p>The two named unacceptable variations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Absence of a zone plan</strong> (or other suitable diagrammatic
                representation as recommended in clause 22.2.5) in premises in which there is more
                than one zone on any storey, particularly premises in which people sleep. The zone
                plan is the responder\'s tool for locating the source of the alarm; in multi-zone
                sleeping premises its absence is now treated as fundamentally inconsistent with safe
                operation.
              </li>
              <li>
                <strong>
                  Absence of a facility for transmission of fire alarm signals to an ARC
                </strong>{' '}
                in either supported housing in which the facility is considered necessary to meet
                the recommendations of BS 5839-1 (where a Grade A system according to BS 5839-6:2019
                is necessary), or in a residential care home. In these premises types, the ARC
                transmission is the link to FRS dispatch and is essential for occupant rescue;
                absence is now declared unacceptable.
              </li>
            </ul>
            <p>
              The implication: an existing system in either category that has historically operated
              without a zone plan or without ARC transmission cannot continue to do so under BS
              5839-1:2025. The next service visit should re-evaluate the historical variation
              against the new wording and recommend remediation. The responsible person\'s insurer
              is likely to take the same position.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 6 (Variations)"
            clause={
              <>
                Whilst BS 5839-1:2025 is a code of practice, and variations against the
                recommendations of the standard are allowed, it has now been recognised that the
                following departures from the recommendations of BS 5839-1:2025 are likely to be so
                detrimental to the safety of life that they should NOT be regarded as acceptable
                variations. These are: the absence of a zone plan … in premises in which there is
                more than one zone on any storey, particularly premises in which people sleep; or
                the absence of a facility for transmission of fire alarm signals to an ARC in either
                supported housing … or a residential care home.
              </>
            }
            meaning="Two variations declared unacceptable: zone-plan absence in multi-zone sleeping premises; ARC absence in supported housing / care homes. All other variations possible by agreement, but with stronger justification expected. ALL variations recorded in the logbook (Section 6.4)."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Third-party schemes — the assurance route</ContentEyebrow>

          <ConceptBlock
            title="Why scheme membership matters"
            plainEnglish="BS 5839-1:2025 clause 3.13 defines the competent person but does not specify how competence should be evidenced. In practice, third-party schemes operating in the UK provide the assurance route. Each scheme audits its members against documented quality systems, requires evidence of training, knowledge, experience, instructions, and CPD, and provides certification that AHJs and insurers recognise. Scheme membership is the practical answer to the AHJ\'s question: how do we know your engineers are competent?"
          >
            <p>The major UK schemes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BAFE SP203 (Service Provider Scheme).</strong> The dominant UK scheme for
                fire-detection-and-alarm organisations. Modules cover design, installation,
                commissioning, and maintenance. Annual third-party audits. Recognised by all UK AHJs
                and insurers as the headline assurance.
              </li>
              <li>
                <strong>BAFE SP207 (Individual Engineer).</strong> Personal certification for
                fire-alarm engineers; complements organisational SP203 by certifying the individuals
                doing the work.
              </li>
              <li>
                <strong>FIA (Fire Industry Association).</strong> Trade body offering unit
                qualifications (the FIA units cover design, installation, commissioning,
                maintenance), training programmes, and member-organisation quality standards. FIA
                member organisations operate to declared standards; individual engineers often hold
                FIA unit certificates as evidence of training and knowledge.
              </li>
              <li>
                <strong>NSI (National Security Inspectorate, NACOSS Gold).</strong> Inspectorate
                scheme covering fire and security; respected in commercial and high-end residential
                markets.
              </li>
              <li>
                <strong>SSAIB (Security Systems and Alarms Inspection Board).</strong> Broader
                life-safety scope; covers fire alarms alongside security systems.
              </li>
            </ul>
            <p>
              An organisation typically holds at least one organisational scheme certification (most
              commonly BAFE SP203) and ensures its engineers hold complementary individual
              qualifications (FIA units, BAFE SP207, manufacturer accreditations). Insurer policies
              frequently require BAFE SP203 specifically; AHJ enforcement varies but all UK FRSs
              recognise BAFE / FIA / NSI / SSAIB certificates.
            </p>
          </ConceptBlock>

          <Scenario
            title="Insurer challenge to a non-scheme servicer"
            situation="A small business has used a local electrician (general electrical-installation background) for fire-alarm servicing for six years. The 2026 insurance renewal questionnaire asks: 'Is your fire-alarm servicing organisation BAFE SP203, FIA, NSI, or SSAIB certificated?' The responsible person answers 'no — local electrician'. The insurer\'s response: premium increase of 18% and a six-month deadline to switch to a certificated servicer or face policy non-renewal."
            whatToDo="Switch the servicing contract to a BAFE SP203, FIA, NSI, or SSAIB certificated organisation. The new servicer\'s first visit will include a baseline survey: review the existing logbook for compliance, audit the asset register, review the existing certification (acceptance, modifications), identify any clause 6 unacceptable variations under the 2025 edition that need remediation, identify any open faults, and produce a remediation plan. The insurer will accept the new contract and the remediation plan as evidence of restored compliance. The annual cost of certificated servicing is typically modestly higher than non-certificated; the insurance saving and risk reduction usually offset the difference."
            whyItMatters="Insurer-driven scheme requirements are now widespread. Self-declaration of competence by a non-scheme servicer is increasingly difficult to defend at insurance renewal. Certificate scheme membership has become the practical assurance route — not because the standard mandates it, but because the market does."
          />

          <SectionRule />

          <ContentEyebrow>Periodic inspection certificates</ContentEyebrow>

          <ConceptBlock
            title="The six-monthly certificate"
            plainEnglish="At every six-monthly service visit (Section 6.2), a periodic inspection certificate (or service certificate) is issued. The exact template depends on the third-party scheme the servicing organisation operates under (BAFE SP203 has its own template, FIA members may use the FIA template, manufacturer schemes have their own). The certificate records what was done, what was found, what is open, what is recommended, and the conformity status of the system as left at the visit. The certificate is signed by the competent engineer, entered in the logbook, and provided to the responsible person."
          >
            <p>What the periodic inspection certificate records:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>System identification.</strong> Premises, system reference, current category
                and grade.
              </li>
              <li>
                <strong>Visit details.</strong> Engineer name, organisation, scheme accreditation
                reference, date and time of arrival / departure, weather (relevant where outdoor ARC
                transmission may be affected by storm).
              </li>
              <li>
                <strong>Test outcomes.</strong> Functional tests performed (devices tested,
                outcomes), battery service results, ARC transmission test results, any panel event
                log review findings.
              </li>
              <li>
                <strong>Asset register update.</strong> Devices tested at this visit (their
                last-test-date column updated), open defects, contamination trends.
              </li>
              <li>
                <strong>Defects and recommendations.</strong> Open defects, recommended remedial
                works (with quoted urgency), pending decisions from the responsible person.
              </li>
              <li>
                <strong>Conformity statement.</strong> Compliant / compliant with logged defects /
                partially compliant / non-compliant. Honest reflection of system state.
              </li>
              <li>
                <strong>Next visit window.</strong> Target date (six months from this visit) and
                tolerance window (five-to-seven months).
              </li>
              <li>
                <strong>Signatures.</strong> Engineer signs; responsible person signs acknowledging
                receipt and reading the report.
              </li>
            </ul>
            <p>
              The periodic certificate is part of the rolling certification chain that runs from
              acceptance through every modification and every periodic visit until the system
              reaches end of life or replacement. The full chain is the audit trail.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Treating a firmware update as routine without paperwork"
            whatHappens="A manufacturer field engineer applies a firmware update to a CIE during a regular service visit. The update is recorded as 'firmware updated' in the visit notes but no extension or modification certificate is produced. Six months later, an insurer audit asks for the certificate trail; the firmware update appears in the panel event log but has no certificate to support it. The audit flags the update as undocumented; the responsible person has to obtain a retrospective modification certificate from the manufacturer, which is uncomfortable for everyone."
            doInstead="Per BS 5839-1:2025 clause 7, firmware updates are modifications. An extension or modification certificate is required at the time of the update. The certificate documents the pre-update version, the post-update version, the verification that cause-and-effect still performs, and the post-action operational state. The certificate is filed with the logbook and the modification is recorded with cross-reference. The cyber-security log entry (clause 43.4) is kept alongside if the update was applied remotely."
          />

          <CommonMistake
            title="Continuing a 2017-agreed variation that 2025 declares unacceptable"
            whatHappens="A care home was commissioned in 2018 with an agreed variation: no ARC transmission (the management considered it unnecessary). The variation was recorded in the original acceptance certificate and re-confirmed at every six-monthly service. In 2026, the servicing organisation continues to record the variation as 'agreed and ongoing'. A safety inspector visiting a similar care home flags the variation as now unacceptable per BS 5839-1:2025 clause 6. The responsible person is required to remedy within a specified timeframe."
            doInstead="At the next six-monthly visit after BS 5839-1:2025 publication, re-evaluate every existing variation against the new clause 6 wording. Variations that the new standard declares unacceptable cannot continue: the system must be remediated. For ARC absence in care homes / supported housing, the remediation is to install ARC alarm transmission to the appropriate signal-grade-4 standard. For zone plan absence in multi-zone sleeping premises, the remediation is to produce and post a zone plan. The remediation work is itself a modification (clause 7) and requires a certificate."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Acceptance certificate (Annex G) = handover document. Fixes baseline; sets the datum date for the six-monthly service cycle.',
              'NEW 2025 — Section 7 covers extensions and modifications. Cert renamed to "extension or modification certificate".',
              'NEW 2025 — firmware updates are modifications. Cert required. Pairs with logbook entry and cyber-security log.',
              'Extension to legacy systems: new works comply with BS 5839-1:2025 at date of work; overall system may retain legacy aspects (explicitly accommodated).',
              'NEW 2025 — clause 6 unacceptable variations: zone-plan absence in multi-zone sleeping premises; ARC absence in supported housing (Grade A) and residential care homes.',
              'All other variations possible by agreement with strong justification; ALL variations recorded.',
              'Third-party schemes (BAFE SP203, BAFE SP207, FIA, NSI, SSAIB) provide the practical assurance route for clause 3.13 competent-person evidence.',
              'Periodic inspection certificate at every six-monthly visit per the relevant scheme template — part of the rolling certification chain.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'How does an "extension or modification certificate" relate to the original acceptance certificate?',
                answer:
                  "The acceptance certificate is the system's baseline; subsequent extension or modification certificates document changes from that baseline. The certificates are kept together in the certification chain — each new cert references the acceptance and any prior extension / modification certs. A system's full state at any historical moment can be reconstructed from acceptance + all subsequent certs.",
              },
              {
                question:
                  'Is a 2010 system that has been extended in 2026 fully compliant with BS 5839-1:2025?',
                answer:
                  'The new (2026) extension works comply with BS 5839-1:2025 at the date of the work. The original 2010 components retain their 2010 baseline. The extension or modification certificate explicitly notes that the overall system retains legacy aspects from 2010. This is the explicit 2025 accommodation — extensions to legacy systems do not require the entire legacy system to be brought up to current standards. However, any new BS 5839-1:2025 unacceptable-variation rules (clause 6) do apply system-wide; existing variations that 2025 declares unacceptable should be remediated separately.',
              },
              {
                question:
                  'My CIE manufacturer is pushing a firmware update remotely. What paperwork do I need?',
                answer:
                  "Three documents. (1) Extension or modification certificate per clause 7 — produced by the engineer authorised to apply the update; documents pre-version, post-version, cause-and-effect verification, post-action state. (2) Cyber-security log entry per clause 43.4 — connection details, authentication, actions, post-action state. (3) Logbook entry per clause 48 — modification entry referencing the cert. The manufacturer's remote-update tool should support generating the certificate template; if not, the on-site competent engineer produces it after the update.",
              },
              {
                question:
                  'A care home has agreed for years that ARC transmission is "not needed". What do I do at the next visit?',
                answer:
                  "Per BS 5839-1:2025 clause 6, ARC absence in residential care homes is now declared unacceptable. The variation cannot continue. Brief the responsible person at the visit; recommend remediation; provide a quote for installing ARC alarm transmission to the appropriate signal grade. Update the service report's conformity statement to reflect that the system is non-compliant pending remediation. The remediation is a modification under clause 7 and will require an extension or modification certificate when complete.",
              },
              {
                question: 'What is the difference between BAFE SP203 and FIA membership?',
                answer:
                  'BAFE SP203 is a service-provider scheme — it certifies organisations against documented quality standards covering design, install, commission, maintain modules. FIA is a trade body — its members operate to declared FIA standards but the certification is membership-based; FIA also offers individual unit qualifications for engineers. AHJs and insurers recognise both; many organisations hold both (BAFE SP203 organisational certification, FIA membership, FIA unit qualifications for engineers). The combination is widely accepted as strong evidence of competence.',
              },
              {
                question:
                  'A periodic inspection certificate has identified open defects. How do I reflect this in the conformity statement?',
                answer:
                  '"Compliant with logged defects" or "partially compliant — see defect list" depending on severity. The exact wording is per the scheme template. The certificate records explicitly which clauses or recommendations are not currently met, what interim measures (if any) are in place, what remedial works are recommended (with quoted urgency), and the timeframe. The responsible person reads and signs to acknowledge. The next visit\'s starting point is the open-defect list; closure of each defect is recorded on the next certificate.',
              },
              {
                question:
                  'How do I evidence that the acceptance date is correctly used as the datum?',
                answer:
                  'The acceptance certificate (Annex G) carries the acceptance date prominently. The service planning system / contract uses that date as the schedule datum. Each service report records the acceptance date alongside the previous-visit date and the calculated months-since-previous. An auditor reading the report can confirm the schedule is anchored to the acceptance date and the visits are within the five-to-seven-month tolerance.',
              },
              {
                question:
                  'Do I need to re-issue an acceptance certificate after a major modification?',
                answer:
                  'No — the original acceptance is unchanged. Major modifications are documented by an extension or modification certificate that references back to the acceptance. The acceptance date remains the datum for the service cycle. In rare cases where the modification is so substantial that it effectively replaces the system (e.g. complete CIE replacement plus extensive re-cabling), the responsible person and the servicing organisation may agree to issue a fresh acceptance certificate with a new datum date — but this is unusual and should be documented as a deliberate decision in the logbook.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Verification and certification — Module 6.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-6/section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.6 Handover and client training
              </div>
            </button>
          </div>

          <div className="hidden">
            <ShieldCheck />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule6Section5;
