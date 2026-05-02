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
    id: 'elm5-s5-acceptance',
    question: 'What is the BS 5266-1:2025 acceptance certificate?',
    options: [
      'A receipt.',
      'The formal commissioning certificate that records the verification at handover. It captures the installation address and design reference; the standards complied with (BS 5266-1:2025, BS EN 50172:2024, BS EN 50171:2021 where applicable, BS 7671:2018+A2:2022, BS EN 1838); the visual / mechanical / electrical / photometric / switch-on / duration test results; any departures with technical justification and risk assessment; the competence declaration; and the documentation pack appendices. Signed by the competent person, the certificate is the legal output of commissioning that transfers the installation from "installed" to "commissioned and in service".',
      'A photo.',
      'A drawing.',
    ],
    correctIndex: 1,
    explanation:
      'The acceptance certificate is the formal handover document. The 2025 model form has new fields for photometric, departures, and competence — use the current version. Insurers and fire authorities expect to see it on file.',
  },
  {
    id: 'elm5-s5-periodic',
    question: 'What is the difference between an acceptance certificate and a periodic certificate?',
    options: [
      'Same thing.',
      'The ACCEPTANCE certificate is issued ONCE at commissioning and records the verification of the new installation against the design. The PERIODIC certificate is issued at the periodic inspection cycles (annual full inspection / five-yearly photometric / EICR cycle) and records the ongoing verification of the in-service installation. They serve different purposes — acceptance establishes the baseline, periodic confirms continued compliance against that baseline.',
      'Acceptance is annual.',
      'No difference.',
    ],
    correctIndex: 1,
    explanation:
      'Acceptance = once at commissioning. Periodic = recurring at the cycle intervals. Both are BS 5266-1:2025 model forms. The periodic cycle for the full inspection certificate is typically annual, with the five-yearly photometric attached at its cycle.',
  },
  {
    id: 'elm5-s5-competence',
    question: 'What does the BS 5266-1:2025 definition of competent person require?',
    options: [
      'Anyone with a phone.',
      'Documented technical knowledge, training, and experience to safely carry out and interpret the verification work; current qualification (typically BS 7671 18th Edition); working under a procedural framework (firm QMS, third-party scheme such as BAFE SP203-4, or an in-house competence framework); and accountability through a signed register of competent persons. The 2025 standard is firmer than previous editions on the documentation of competence — it is no longer assumed but evidenced.',
      'Just a salesperson.',
      'Self-declared only.',
    ],
    correctIndex: 1,
    explanation:
      'Competence is documented, not implied. Training + qualification + procedural framework + signed register. The 2025 standard tightens the previous looser interpretations. BAFE SP203-4 is the recognised third-party route.',
  },
  {
    id: 'elm5-s5-departures',
    question: 'How does BS 5266-1:2025 treat departures from full compliance?',
    options: [
      'They are always fine.',
      'Departures may be acceptable if technically justified, residual-risk-assessed, and explicitly agreed by the responsible person — and explicitly recorded on the acceptance certificate (or the periodic certificate) with the technical reasoning and the residual risk. The 2025 update has tightened what may be a departure: missing periodic photometric, missing logbook, missing competence record, and several other previously-tolerated patterns are now declared non-compliance, not departures. The competent person must read the 2025 text on the boundary.',
      'They are forbidden.',
      'They are silent.',
    ],
    correctIndex: 1,
    explanation:
      'Departures must be technically justified, risk-assessed, and explicitly agreed. The 2025 update narrows what can legitimately be a departure — some previous-edition departures are now non-compliance. The acceptance certificate must reflect the position honestly.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'List the certification documents in the BS 5266-1:2025 framework.',
    options: [
      'Just one.',
      'Acceptance certificate (issued once at commissioning, BS 5266-1:2025 model form); periodic inspection certificate (issued at each periodic full inspection cycle, typically annual); five-year photometric certificate / report (every five years, point-by-point lux survey); BS 7671 EICR (parallel cycle, typically 5-yearly for commercial); central battery system certificate (BS EN 50171 where applicable). Each has its own scope, its own model form, its own retention. Together they form the certification stack for the installation life.',
      'Random docs.',
      'Just an invoice.',
    ],
    correctAnswer: 1,
    explanation:
      'A stack of certificates, each on its own cycle. Acceptance once at commissioning; periodic full inspection annually; five-year photometric; EICR on its own cycle. The stack provides the layered evidence the responsible person relies on under the RRO 2005.',
  },
  {
    id: 2,
    question: 'What is a "competent person" entitled to sign a BS 5266-1:2025 certificate?',
    options: [
      'Anyone willing.',
      'A person with documented technical knowledge, training, and experience to carry out the inspection and tests safely and to interpret the results — typically: BS 7671 18th Edition qualification (current); documented emergency lighting training (BAFE SP203-4 module, ICEL training, or equivalent); working under a documented procedural framework (firm QMS, third-party certification scheme, or in-house competence framework); and listed in the firm\'s signed register of competent persons. The 2025 standard is explicit on the documentation of competence.',
      'Building owner.',
      'Salesperson.',
    ],
    correctAnswer: 1,
    explanation:
      'Competence is documented at four levels: technical qualification, emergency-lighting-specific training, procedural framework, signed register. The 2025 update tightens what was sometimes treated as informal. BAFE SP203-4 is the recognised third-party scheme.',
  },
  {
    id: 3,
    question: 'BAFE SP203-4 is what?',
    options: [
      'A product.',
      'The third-party certification scheme specifically for emergency lighting design, installation, commissioning, and maintenance — administered by the British Approvals for Fire Equipment (BAFE). Member organisations are audited annually against the scheme requirements (technical competence, procedural compliance, quality management, customer outcomes). Insurers, fire authorities, and informed clients increasingly expect to see BAFE SP203-4 (or equivalent — NICEIC and ECA emergency lighting schemes) on contracts. Not legally required, but the most widely recognised demonstration of competence in the trade.',
      'A test method.',
      'A type of luminaire.',
    ],
    correctAnswer: 1,
    explanation:
      'BAFE SP203-4 is the recognised third-party scheme. Annual audit, technical and procedural compliance, customer outcomes. Not legally mandatory but increasingly the de-facto standard for serious contracting. The 2025 BS 5266-1 update explicitly recognises third-party schemes as the route to documented competence.',
  },
  {
    id: 4,
    question: 'What is the relationship between BS 5266-1 acceptance certificate and the BS 7671 Electrical Installation Certificate (EIC)?',
    options: [
      'They are the same.',
      'They are two separate certificates with different scopes, both required at commissioning. The BS 7671 EIC covers the underlying electrical installation — wiring, distribution, protective devices, earthing, bonding — verified against BS 7671 Part 6. The BS 5266-1 acceptance certificate covers the emergency-lighting-specific verification — design match, photometric survey, switch-on test, duration test, system performance — verified against BS 5266-1, BS EN 50172, BS EN 50171, and BS EN 1838. They cross-reference each other; both are required.',
      'EIC replaces it.',
      'Acceptance replaces EIC.',
    ],
    correctAnswer: 1,
    explanation:
      'Two certificates, two scopes, both required. The BS 7671 EIC covers the wiring; the BS 5266-1 acceptance certificate covers the emergency lighting verification. Cross-referenced, both retained.',
  },
  {
    id: 5,
    question: 'A departure from full BS 5266-1:2025 compliance has been identified. What is required to record it?',
    options: [
      'Nothing.',
      'A structured record on the acceptance certificate (or periodic certificate) showing: (a) the specific clause or requirement departed from; (b) the technical justification for the departure (why is full compliance not appropriate or possible in this case); (c) the residual risk assessment (what the remaining risk is and how it is managed); (d) the explicit written agreement of the responsible person; (e) any compensating measures put in place. The 2025 standard treats this as a real exercise — not a tick-box, but a documented decision with risk acceptance.',
      'Verbal note.',
      'Photo.',
    ],
    correctAnswer: 1,
    explanation:
      'A departure is a documented decision: clause, justification, risk, agreement, compensation. The 2025 update tightens what can legitimately be a departure and demands proper documentation when one is recorded. Loose departures from previous practice are not acceptable under 2025.',
  },
  {
    id: 6,
    question: 'What categories of departure are now declared NON-compliance (rather than acceptable departures) under BS 5266-1:2025?',
    options: [
      'None.',
      'Several categories that were previously sometimes treated as departures are now declared non-compliance — including missing periodic photometric verification, missing logbook, missing competence record, and missing fixed wiring fixings (e.g. plastic ties on fire-resistant cable). These cannot be excused as departures under 2025 — they are simply non-compliant and must be remediated, not declared. The pattern parallels the BS 5839-1:2025 hard line on variations.',
      'All departures.',
      'No change.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 update narrows the legitimate departure space. Missing photometric, missing logbook, missing competence record, missing fire-resistance fixings — these are non-compliance now, not departures. The acceptance certificate cannot record them as departures.',
  },
  {
    id: 7,
    question: 'A commissioning certificate has been signed but the duration test has not yet been carried out. What is the regulatory position?',
    options: [
      'Fine.',
      'The certificate is invalid — it represents that commissioning is complete when in fact a primary verification step (the duration test) has not been done. The signing person is in misrepresentation, with personal liability for the document. The correct course: do not sign the certificate until the duration test is complete, or sign with a clearly recorded departure (e.g. "duration test scheduled for [date]") and treat the installation as not yet fully commissioned until the deferred test is complete. Practice of "sign now, test later" is not acceptable under BS 5266-1:2025.',
      'No issue.',
      'Sign anyway.',
    ],
    correctAnswer: 1,
    explanation:
      'Signing a certificate that contains a known untruth is misrepresentation. The 2025 update reinforces this — the certificate is a real legal document with personal liability for the signing person. "Sign now, test later" is not a 2025 practice.',
  },
  {
    id: 8,
    question: 'How are insurers using the BS 5266-1:2025 certification framework?',
    options: [
      'They ignore it.',
      'Increasingly as the primary evidence of compliance with the responsible person\'s duties under the RRO 2005. Insurers ask for: the acceptance certificate (commissioning baseline); the most recent periodic certificate (current compliance); the most recent five-year photometric report (output verification); the contractor\'s third-party scheme registration (e.g. BAFE SP203-4); the logbook (continuous evidence). A complete certification stack is the responsible person\'s defence; missing or stale certificates increase the perceived risk and can affect premiums or claim outcomes.',
      'They reject it.',
      'They certify themselves.',
    ],
    correctAnswer: 1,
    explanation:
      'Insurers are the most consistent commercial driver for the certification stack being kept current. They want acceptance (baseline), periodic (current state), photometric (output verification), scheme registration (competence). Missing pieces have premium and claim implications.',
  },
  {
    id: 9,
    question: 'A small premises has emergency lighting installed by an electrician without third-party scheme registration. Is this acceptable?',
    options: [
      'Always.',
      'Acceptable in principle — third-party scheme registration is not legally mandatory. But the electrician must still meet the BS 5266-1:2025 competent person definition: documented training in emergency lighting (not just general electrical), current BS 7671 qualification, working procedural framework, and a signed register of competent persons. Without third-party scheme registration, the burden of demonstrating these is on the firm directly. In practice, for any commercial premises beyond the smallest, the third-party scheme is the easier route — the audit trail is in place.',
      'Never.',
      'Doesn\'t matter.',
    ],
    correctAnswer: 1,
    explanation:
      'Third-party schemes are not legally required, but the underlying competence requirements are. Without the scheme, the firm must self-document the competence — possible but more work and less external assurance. For commercial premises, the scheme is the practical route.',
  },
  {
    id: 10,
    question: 'What is the typical commissioning checklist outline for emergency lighting?',
    options: [
      'Lights on.',
      'A structured 50-100 item checklist covering: documentation review (design, drawings, manuals); pre-energisation visual / mechanical (luminaire positions, cable, fixings, mounting, supply, batteries); BS 7671 Part 6 verification (continuity, IR, polarity, Zs, RCD, ADS); charge confirmation; photometric survey (lux meter readings against design grid); switch-on test (per-luminaire response time); duration test (full rated time, end-of-test verification, recovery); central battery checks (where applicable); labelling and asset register; documentation pack assembly; acceptance certificate completion. Each item is ticked off with verification evidence; departures are recorded.',
      'Random.',
      'Just lux.',
    ],
    correctAnswer: 1,
    explanation:
      'A working commissioning checklist is a substantial structured document — 50-100 items covering all verification stages. BAFE SP203-4 publishes a model checklist; other schemes have similar. Each item has a verification record; gaps trigger remediation. The completed checklist is an appendix to the acceptance certificate.',
  },
];

const EmergencyLightingModule5Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Certification and commissioning checklists | Emergency Lighting Module 5.5 | Elec-Mate',
    description:
      'BS 5266-1:2025 acceptance and periodic certificates, BAFE SP203-4 third-party scheme, competent person definition, departures policy (2025 tightened), and the working commissioning checklist.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5"
            title="Certification and commissioning checklists"
            description="The certification framework that surrounds the BS 5266-1:2025 acceptance and periodic certificates: the model forms, the competent person definition, third-party schemes (BAFE SP203-4 the most relevant), the 2025 tightening on what may and may not be recorded as a departure, and the structured commissioning checklist that produces the certificate evidence."
            tone="yellow"
          />

          <TLDR
            points={[
              'Acceptance certificate (BS 5266-1:2025 model form): issued once at commissioning, records verification against design and standards. Sole legal output that transfers installation from "installed" to "commissioned".',
              'Periodic certificate: issued at recurring full inspection cycles (typically annual), records continued compliance.',
              'Five-year photometric report: separate document at the photometric cycle, attached to or referenced by the periodic certificate.',
              'BS 7671 EIC at commissioning, EICR at periodic — separate certificates covering the underlying electrical installation. Required in addition to BS 5266-1 certificates.',
              'Competent person: documented technical knowledge, training, current qualification, procedural framework, signed competence register. 2025 standard is explicit.',
              'BAFE SP203-4: recognised third-party certification scheme for emergency lighting. Annual audit. Increasingly expected by insurers and fire authorities.',
              '2025 tightened departures: missing photometric, missing logbook, missing competence record, missing fire-resistance fixings — now non-compliance, not departures.',
              'Commissioning checklist: 50-100 structured items across documentation, visual, electrical, photometric, switch-on, duration, central battery, labelling, certification. Appendix to acceptance certificate.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the certification documents in the BS 5266-1:2025 framework: acceptance, periodic, five-year photometric, EICR, central battery system certificate',
              'Complete the BS 5266-1:2025 acceptance certificate model form with all required sections',
              'Apply the BS 5266-1:2025 competent person definition: knowledge, training, qualification, procedural framework, signed register',
              'Identify BAFE SP203-4 as the recognised third-party certification scheme and explain its role in demonstrating competence',
              'Apply the 2025 tightened departures policy and identify which categories are now non-compliance rather than departures',
              'Use a structured commissioning checklist to drive verification work and produce the certificate evidence',
              'Cross-reference the BS 5266-1 acceptance certificate with the BS 7671 EIC at commissioning and with the EICR at periodic intervals',
              'Recognise the insurer / fire authority expectations of the certification stack and the consequences of missing or stale certificates',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The certification stack</ContentEyebrow>

          <ConceptBlock
            title="Multiple certificates, multiple cycles"
            plainEnglish="Emergency lighting is not a single-certificate compliance. The certification stack has multiple components, each with its own scope and its own cycle. The acceptance certificate is the once-at-commissioning baseline. Periodic certificates are issued at each periodic full-inspection cycle. The five-year photometric report is a separate document at its own cycle. The BS 7671 EIC and EICR cover the underlying wiring on a parallel cycle. Where applicable, a central battery system certificate adds another. Together, they form the layered evidence the responsible person presents to insurers, fire authorities, and any future investigation."
            onSite="Think of certification as a stack, not a single piece of paper. Each certificate has a scope, a cycle, and a retention. Track them as a portfolio — a missing or stale certificate is a gap in the stack, not just a missing document."
          >
            <p>The certification stack:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Acceptance certificate (BS 5266-1:2025 model form).</strong> Issued ONCE at commissioning. Records visual / electrical / photometric / switch-on / duration verification, departures, competence declaration, documentation pack appendices. The legal handover document.
              </li>
              <li>
                <strong>Periodic inspection certificate (BS 5266-1:2025 model form).</strong> Issued at each periodic full inspection — typically annually, coinciding with the annual duration test. Records the continued compliance against the commissioning baseline.
              </li>
              <li>
                <strong>Five-year photometric report.</strong> Separate document issued at each photometric cycle. Tabulated point-by-point readings against design / baseline / BS EN 1838 minima. Attached to or referenced by the periodic certificate at the cycle.
              </li>
              <li>
                <strong>BS 7671 EIC at commissioning.</strong> Covers the electrical installation work for the emergency lighting circuits. Issued at handover alongside the acceptance certificate. Cross-referenced by both.
              </li>
              <li>
                <strong>BS 7671 EICR at periodic.</strong> Covers the in-service electrical installation. Cycle typically 5-yearly for commercial fixed wiring. Cross-referenced by the periodic certificate; aligned with the five-year photometric where possible.
              </li>
              <li>
                <strong>Central battery system certificate (BS EN 50171:2021).</strong> Where applicable. Covers the central battery system specifically — capacity, charging system, monitoring, fire-rated enclosure compliance. Issued at commissioning and at major service.
              </li>
              <li>
                <strong>Battery service / replacement records.</strong> Each major battery service or replacement generates a record (date, parts, technician). Filed with the asset register and referenced by the periodic certificate.
              </li>
            </ul>
            <p>
              The stack is not optional. Each component covers a scope that the others do not. Insurers and fire authorities are increasingly familiar with the full stack and will identify gaps. A clean stack is the evidence base; a partial stack invites questions.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 13 (Certification)"
            clause={
              <>
                Certification of an emergency lighting installation shall be made at the time of commissioning by means of a written acceptance certificate, signed by a competent person, in the model form set out in this standard. Periodic certification shall be made at each periodic inspection cycle. Photometric verification shall be certified separately at the cycle specified in clause 12.4. Departures from full compliance shall be technically justified, residual-risk-assessed, agreed in writing by the responsible person, and explicitly recorded on the relevant certificate.
              </>
            }
            meaning="Three certification cycles named: acceptance (at commissioning), periodic (at each periodic inspection), photometric (separate). Departures are constrained — technical justification, risk assessment, written agreement, explicit recording. The clause makes the documentation expectation firm."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The acceptance certificate model form (2025)</ContentEyebrow>

          <ConceptBlock
            title="Section by section"
            plainEnglish="The BS 5266-1:2025 acceptance certificate is structured into clearly defined sections, each capturing a specific category of verification. The 2025 model form added several new fields relative to the previous edition — most notably the photometric reference, the structured departures section, and the competence declaration. Use the current 2025 model; legacy templates are missing fields that the standard now requires."
          >
            <p>The model form sections in order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>1. Installation details.</strong> Address, occupancy class, design reference number, design drawing references, date of commissioning, identification of commissioning organisation and competent person(s).
              </li>
              <li>
                <strong>2. Standards complied with.</strong> Listed explicitly: BS 5266-1:2025, BS EN 50172:2024, BS EN 50171:2021 (where applicable), BS 7671:2018+A2:2022, BS EN 1838 (lux references). Listing each removes ambiguity about what was verified.
              </li>
              <li>
                <strong>3. Visual and mechanical inspection.</strong> Tick-list confirmation of pre-energisation checks complete: luminaire positions, cable type and fire-resistance, fixings (mechanical), mounting and orientation, supply arrangements, battery state. Defects logged and resolved.
              </li>
              <li>
                <strong>4. Electrical verification (BS 7671 Part 6).</strong> Cross-reference to the BS 7671 EIC (separate certificate) plus summary results: continuity, IR, polarity, Zs, RCD, ADS. Per-circuit summary tables.
              </li>
              <li>
                <strong>5. Photometric verification (NEW emphasis 2025).</strong> Survey results summary — readings against design, against BS EN 1838 minima, uniformity ratio. Calibration reference of the lux meter. Reference to the detailed photometric survey appendix.
              </li>
              <li>
                <strong>6. Switch-on test.</strong> Per-area: response class achieved, any failures, resolution. Verifies every emergency-lit area produces the design response when local supply interrupted.
              </li>
              <li>
                <strong>7. Duration test.</strong> Date of duration test, rated duration, observed actual duration, end-of-test result (all illuminated), recovery confirmation (≥ 80% within 24 h).
              </li>
              <li>
                <strong>8. Central battery system (where applicable).</strong> BS EN 50171 verification summary — capacity, charging, monitoring, enclosure, warning notices. Cross-reference to separate central battery system certificate.
              </li>
              <li>
                <strong>9. Labelling and asset register.</strong> Confirmation that installation labels are fitted to all luminaires, asset register populated, photographic record assembled.
              </li>
              <li>
                <strong>10. Departures (NEW structured section 2025).</strong> Any departure from full BS 5266-1:2025 compliance: clause departed from, technical justification, residual risk assessment, agreement of responsible person, compensating measures. Each departure structured.
              </li>
              <li>
                <strong>11. Documentation pack.</strong> Listed appendices: as-built drawings, design lux calculation, manufacturer manuals, photometric survey detail, central battery certificate, BS 7671 EIC, logbook starter, photographic record.
              </li>
              <li>
                <strong>12. Competence declaration (NEW 2025).</strong> The competent person's qualifications, training, experience, procedural framework (BAFE SP203-4 / NICEIC / ECA / in-house), signed register reference. Made explicit so that insurers, fire authorities, or future investigators can verify the competence basis for the certificate.
              </li>
              <li>
                <strong>13. Signature and date.</strong> Competent person signature, date of certificate, organisation stamp.
              </li>
            </ul>
            <p>
              The 2025 model form runs to several pages. Filling it in fully takes time at handover but is the only acceptable output. Legacy single-page templates are missing the structured departures, competence declaration, and photometric reference — they should not be used for any new commissioning under the 2025 standard.
            </p>
          </ConceptBlock>

          {/* Certification path / scheme map */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Certification path and third-party scheme map
            </h4>
            <svg
              viewBox="0 0 820 600"
              className="w-full h-auto"
              role="img"
              aria-label="Map showing the certification documents and the cycles they are issued on, plus the third-party schemes (BAFE SP203-4, NICEIC, ECA) that demonstrate competence and the regulatory audience (insurers, fire authorities) that consumes the certification stack."
            >
              {/* Title */}
              <rect x="20" y="20" width="780" height="36" rx="6" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="410" y="44" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                BS 5266-1:2025 certification stack — documents, cycles, audiences
              </text>

              {/* Top row — commissioning */}
              <text x="40" y="86" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="bold">At commissioning (year 0)</text>
              <rect x="40" y="100" width="180" height="60" rx="6" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.4" />
              <text x="130" y="120" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">Acceptance certificate</text>
              <text x="130" y="136" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">BS 5266-1:2025 model form</text>
              <text x="130" y="150" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">issued ONCE</text>

              <rect x="240" y="100" width="180" height="60" rx="6" fill="rgba(34,211,238,0.10)" stroke="#22D3EE" strokeWidth="1.4" />
              <text x="330" y="120" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="bold">BS 7671 EIC</text>
              <text x="330" y="136" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">underlying electrical install</text>
              <text x="330" y="150" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">issued ONCE</text>

              <rect x="440" y="100" width="180" height="60" rx="6" fill="rgba(168,85,247,0.10)" stroke="#A855F7" strokeWidth="1.4" />
              <text x="530" y="120" textAnchor="middle" fill="#A855F7" fontSize="10" fontWeight="bold">Central battery cert</text>
              <text x="530" y="136" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">BS EN 50171:2021</text>
              <text x="530" y="150" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">where applicable</text>

              <rect x="640" y="100" width="160" height="60" rx="6" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="720" y="120" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">Initial photometric</text>
              <text x="720" y="136" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">commissioning baseline</text>
              <text x="720" y="150" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">part of acceptance</text>

              {/* Middle row — periodic */}
              <text x="40" y="200" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="bold">Periodic cycles (life of installation)</text>
              <rect x="40" y="214" width="180" height="60" rx="6" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.5)" strokeWidth="1.4" />
              <text x="130" y="234" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">Periodic certificate</text>
              <text x="130" y="250" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">annual at full inspection</text>
              <text x="130" y="264" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">BS 5266-1 model form</text>

              <rect x="240" y="214" width="180" height="60" rx="6" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.4" />
              <text x="330" y="234" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="bold">BS 7671 EICR</text>
              <text x="330" y="250" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">5-yearly commercial</text>
              <text x="330" y="264" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">parallel cycle</text>

              <rect x="440" y="214" width="180" height="60" rx="6" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.4" />
              <text x="530" y="234" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">5-year photometric</text>
              <text x="530" y="248" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">⚠ NEW 2025 emphasis</text>
              <text x="530" y="262" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">point-by-point lux survey</text>

              <rect x="640" y="214" width="160" height="60" rx="6" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.5)" strokeWidth="1.4" />
              <text x="720" y="234" textAnchor="middle" fill="#A855F7" fontSize="10" fontWeight="bold">Battery service</text>
              <text x="720" y="250" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">replacement records</text>
              <text x="720" y="264" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">3-5 yr typical</text>

              {/* Competence schemes */}
              <text x="40" y="314" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="bold">Competent person — third-party schemes</text>
              <rect x="40" y="328" width="180" height="80" rx="6" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.4" />
              <text x="130" y="348" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">BAFE SP203-4</text>
              <text x="130" y="364" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">emergency lighting</text>
              <text x="130" y="378" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">design / install / commission</text>
              <text x="130" y="392" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">/ maintain</text>

              <rect x="240" y="328" width="180" height="80" rx="6" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.5)" strokeWidth="1.4" />
              <text x="330" y="348" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">NICEIC</text>
              <text x="330" y="364" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">emergency lighting</text>
              <text x="330" y="378" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">scheme</text>

              <rect x="440" y="328" width="180" height="80" rx="6" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.5)" strokeWidth="1.4" />
              <text x="530" y="348" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">ECA</text>
              <text x="530" y="364" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">emergency lighting</text>
              <text x="530" y="378" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">scheme</text>

              <rect x="640" y="328" width="160" height="80" rx="6" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.4" />
              <text x="720" y="348" textAnchor="middle" fill="#22D3EE" fontSize="11" fontWeight="bold">In-house framework</text>
              <text x="720" y="364" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">documented QMS</text>
              <text x="720" y="378" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">+ signed register</text>

              {/* Audiences */}
              <text x="40" y="448" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="bold">Audience — who consumes the stack</text>
              <rect x="40" y="462" width="240" height="80" rx="6" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.4" />
              <text x="160" y="482" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">Insurers</text>
              <text x="160" y="498" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">acceptance + periodic + photo</text>
              <text x="160" y="512" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">+ scheme reg + logbook</text>
              <text x="160" y="528" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">premium / claim impact</text>

              <rect x="300" y="462" width="240" height="80" rx="6" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.4" />
              <text x="420" y="482" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">Fire authority</text>
              <text x="420" y="498" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">FRA evidence pack</text>
              <text x="420" y="512" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">RRO 2005 compliance</text>
              <text x="420" y="528" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">enforcement basis</text>

              <rect x="560" y="462" width="240" height="80" rx="6" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.4" />
              <text x="680" y="482" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">Tribunal / investigation</text>
              <text x="680" y="498" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">post-incident review</text>
              <text x="680" y="512" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">contemporaneous evidence</text>
              <text x="680" y="528" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">defence basis</text>

              {/* Footer */}
              <text x="410" y="572" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9.5">
                The certification stack is the responsible person's evidence base under the RRO 2005
              </text>
              <text x="410" y="588" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Missing or stale certificates have premium, claim, enforcement, and defence implications
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Competent person — the 2025 definition</ContentEyebrow>

          <ConceptBlock
            title="Documented, not assumed"
            plainEnglish="The 2025 standard is firm on competence. The previous edition\'s wording was sometimes interpreted loosely — any electrician with general qualifications was assumed competent for emergency lighting. The 2025 update closes this. Competence for emergency lighting commissioning, periodic verification, and acceptance certificate signature requires documented technical knowledge, documented training specifically in emergency lighting (not just general electrical), current qualification (BS 7671 18th Edition typical), a working procedural framework, and a signed register of competent persons within the firm. The competence is documented and verifiable, not assumed."
          >
            <p>The four documented elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Technical knowledge.</strong> Demonstrated through current qualification — BS 7671 18th Edition (or current edition equivalent) for the underlying electrical work; documented emergency lighting training (BAFE SP203-4 module, ICEL training, manufacturer-led courses for specific systems).
              </li>
              <li>
                <strong>Training specific to emergency lighting.</strong> Beyond general electrical training. Covers: BS 5266-1 / BS EN 50172 / BS EN 50171 / BS EN 1838 framework, design and verification methods, photometric survey method, periodic regime, certification framework, RRO 2005 context. Documented training records.
              </li>
              <li>
                <strong>Procedural framework.</strong> The firm's working procedure for commissioning, periodic verification, and certification. Typically a Quality Management System (QMS), a third-party scheme manual (BAFE / NICEIC / ECA), or an in-house framework. The procedure is documented and followed.
              </li>
              <li>
                <strong>Signed register of competent persons.</strong> A list, maintained by the firm, of who is signed-off competent for what. Each competent person is named, qualifications recorded, scope of competence defined (e.g. "competent for design and commissioning of self-contained installations up to 500 luminaires"). The register is reviewed periodically (annually typical) and updated for new training, retired persons, or expanded scope.
              </li>
            </ul>
            <p>
              These four elements are visible to anyone scrutinising a certificate. An auditor, an insurer, a fire authority, or a tribunal investigator can ask: who signed this certificate, what is their qualification, what training have they had, what procedure did they follow, what register are they on? Each question has a documented answer in a properly run firm. The 2025 standard treats this as the baseline; informal "we know our people are good" is not the 2025 baseline.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 4 (Competence)"
            clause={
              <>
                Persons carrying out the design, installation, commissioning, verification, and maintenance of emergency lighting installations shall have the technical knowledge, training, experience, and procedural framework appropriate to the work. Competence shall be documented and verifiable. Third-party certification schemes provide a recognised route for demonstrating documented competence at firm and individual level.
              </>
            }
            meaning="Competence: knowledge + training + experience + procedural framework. Documented and verifiable. Third-party schemes are explicitly recognised. The 2025 update tightens the previous looser interpretations — informal competence is not enough."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Third-party schemes</ContentEyebrow>

          <ConceptBlock
            title="BAFE SP203-4 and the alternatives"
            plainEnglish="A third-party certification scheme is the recognised route to demonstrate competence externally. The scheme administers a specification (the SP203-4 document for BAFE), audits member organisations annually against the specification, and issues registration that the member can cite. For emergency lighting, BAFE SP203-4 is the most widely recognised scheme in the UK; NICEIC and ECA also offer emergency lighting registrations. Insurers, fire authorities, and informed clients increasingly look for one of these registrations on contracts."
          >
            <p>What a scheme registration involves:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Initial audit.</strong> The scheme audits the firm's technical competence (qualified people, equipment, training records), procedural framework (QMS, work instructions, certificate templates), and quality outcomes (sample of past work, customer feedback). Successful audit results in registration.
              </li>
              <li>
                <strong>Annual surveillance audit.</strong> Continued registration requires annual surveillance — the scheme returns to verify the firm has maintained the standards. Re-audit covers a sample of work done since the last audit; deviations are flagged and must be corrected.
              </li>
              <li>
                <strong>Triennial reassessment.</strong> A more comprehensive audit every three years — confirms that the firm continues to meet the full scheme requirements rather than just the surveillance subset.
              </li>
              <li>
                <strong>Complaints handling.</strong> The scheme handles customer complaints against registered firms — a real adjudication mechanism that protects the customer and disciplines the registered firm.
              </li>
              <li>
                <strong>Public register.</strong> Registered firms are listed on the scheme's public register, searchable by name, location, and registration scope. Customers can verify a claimed registration easily.
              </li>
            </ul>
            <p>
              Registration costs (annual fee, audit fees, time investment) are real but proportionate. The benefit is external validation of competence — the firm does not have to argue its own case in every contract negotiation; the registration is the argument. For commercial contracts, the registration is increasingly the threshold for tendering, not a differentiator.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The 2025 departures policy</ContentEyebrow>

          <ConceptBlock
            title="What may and may not be a departure"
            plainEnglish="A departure is a deviation from full standard compliance that has been technically justified, residual-risk-assessed, agreed by the responsible person, and explicitly recorded. The 2025 update tightens what may legitimately be a departure. Several patterns that were sometimes accepted as departures under previous editions are now declared non-compliance — they cannot be excused as departures, they must be remediated. The competent person must read the 2025 text on the boundary and apply it strictly."
          >
            <p>What can still be a legitimate departure (with proper documentation):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Specific design choices justified by risk assessment.</strong> Example: a small premises with simple evacuation may be designed to a 1-hour duration rather than 3 hours, where the risk assessment supports this. Documented in the design and on the acceptance certificate.
              </li>
              <li>
                <strong>Heritage / listed building constraints.</strong> Example: a Grade I listed building where some luminaire positions cannot be installed at the design grid because of heritage protection. Documented justification, compensating measures (additional luminaires elsewhere), risk assessment.
              </li>
              <li>
                <strong>Phased implementation with timeline.</strong> Example: a multi-phase refurbishment where some areas are commissioned now and others later. Documented phasing plan, interim measures for currently-uncommissioned areas, target completion date.
              </li>
              <li>
                <strong>Equipment non-availability with substitution plan.</strong> Example: a specified luminaire model is no longer manufactured; an equivalent is substituted. Technical justification of equivalence, design impact assessment, certificate update.
              </li>
            </ul>
            <p>What is now non-compliance (NOT a departure under 2025):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Missing periodic photometric verification.</strong> Cannot be excused as a departure under 2025. Must be carried out.
              </li>
              <li>
                <strong>Missing logbook.</strong> Cannot be excused. Must be in place from commissioning.
              </li>
              <li>
                <strong>Missing competence record.</strong> The signing person must demonstrate competence. Without the record, the certificate cannot be signed.
              </li>
              <li>
                <strong>Plastic ties on fire-resistant cable / inadequate fire-rated fixings.</strong> Cannot be excused. Must be remediated.
              </li>
              <li>
                <strong>"Sign now, test later" — duration test deferred but certificate signed.</strong> Cannot be excused. The certificate represents fact at the time of signing; the duration test must be done before signing.
              </li>
              <li>
                <strong>Lockable supply isolator without lock fitted.</strong> The lock is part of the protective measure. Without it, the protective measure is incomplete.
              </li>
              <li>
                <strong>Missing five-year photometric on a periodic certificate.</strong> The cycle has been broken; cannot be excused as a departure.
              </li>
            </ul>
            <p>
              The 2025 narrowing of departures is one of the most practically significant updates. Firms accustomed to recording certain shortcuts as "departures" must understand they no longer have that flexibility. The position must be either: full compliance, or non-compliance with remediation plan. There is less middle ground.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Recording missing photometric as a departure"
            whatHappens="A periodic inspection in 2026 finds the five-year photometric was due but not carried out. The contractor records this as a departure on the periodic certificate, with reasoning 'photometric not provided in current contract scope'. The certificate is signed and filed. An insurer audit two years later flags the entry — the insurer takes the position that missing photometric is non-compliance under BS 5266-1:2025, not a departure, and the certificate is invalid. Premium implications and contract review follow."
            doInstead="Missing photometric is non-compliance under 2025. The correct response: stop, brief the responsible person on the requirement, agree to schedule the photometric urgently, carry it out, then issue the periodic certificate referencing the now-current photometric. The 'departure' route is not available under 2025 for this category. Reading the 2025 update is essential to know the boundary."
          />

          <CommonMistake
            title="Signing the certificate before the documentation pack is assembled"
            whatHappens="Under handover pressure, the contractor signs the acceptance certificate and lists the documentation pack appendices that 'will be delivered next week'. The certificate is filed. The documentation pack is partially delivered, with some items missing and never completed. Three years later, a new maintenance contractor takes over and finds the as-built drawings, photometric calc, and several manufacturer manuals are missing — they cannot do their job without these. The 'will be delivered' undertaking was never honoured."
            doInstead="The acceptance certificate represents fact at the time of signing. If the documentation pack is incomplete, the certificate cannot honestly be signed. Hold the signature until the pack is complete. The 2025 standard expects the pack to be in place at certification — a deferred pack is not a 2025-acceptable state. Under handover pressure, the correct response is to escalate the missing items to the contracting chain, not to sign a partial certificate."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The commissioning checklist</ContentEyebrow>

          <ConceptBlock
            title="A working checklist drives the verification"
            plainEnglish="A structured commissioning checklist is the practical tool that drives the verification work and produces the evidence for the certificate. The BAFE SP203-4 scheme publishes a model checklist (50-100 items) covering documentation, visual / mechanical, electrical, photometric, switch-on, duration, central battery, labelling, and certification. Other schemes have similar. Working through the checklist on site ensures no verification element is missed; the completed checklist becomes an appendix to the acceptance certificate."
          >
            <p>Checklist structure (representative):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Section A — Documentation review (8-10 items).</strong> Design lux calculation present; as-built drawings present; manufacturer manuals present; photometric data sheets present; cause-and-effect description (where staged); acceptance certificate template ready; logbook starter ready; photographic record plan ready.
              </li>
              <li>
                <strong>Section B — Pre-energisation visual / mechanical (12-15 items).</strong> Per area / per circuit: luminaire positions match as-built; cable type per design; cable fire-resistance verified; fixings mechanical; mounting per design; orientation per design; obstructions clear; supply arrangements per design; battery state acceptable; central battery enclosure compliant.
              </li>
              <li>
                <strong>Section C — BS 7671 Part 6 verification (8-12 items).</strong> Continuity of CPCs (per circuit); insulation resistance; polarity at every accessory; Zs at most distant point of each circuit; RCD operation where applicable; ADS compliance; functional test of switching; warning notices in place.
              </li>
              <li>
                <strong>Section D — Charge confirmation (2-3 items).</strong> Manufacturer-specified charge period elapsed; charger LED status confirms full charge; central battery state of charge confirms full.
              </li>
              <li>
                <strong>Section E — Photometric survey (6-10 items).</strong> Lux meter calibration in date; system in emergency mode; measurement plane confirmed; design grid points covered; readings recorded; design comparison; BS EN 1838 minima comparison; uniformity ratio computed.
              </li>
              <li>
                <strong>Section F — Switch-on test (4-6 items per area).</strong> Per area: supply interruption confirmed; per-luminaire response time observed; per-luminaire illumination confirmed; per-luminaire fault flags reviewed; restoration confirmed.
              </li>
              <li>
                <strong>Section G — Duration test (8-10 items).</strong> Pre-test full charge confirmed; start time recorded; mid-test observation; end-of-test observation (all illuminated); end-of-test lux on critical points (where required); recovery start confirmed; 24-h recovery confirmation; per-luminaire results.
              </li>
              <li>
                <strong>Section H — Central battery checks where applicable (6-10 items).</strong> Capacity verified; charging system verified; monitoring functional; warning notices in place; lockable isolator with lock fitted; fire-rated enclosure intact; output sub-circuits labelled; test facility functional.
              </li>
              <li>
                <strong>Section I — Labelling and asset register (4-6 items).</strong> Installation labels fitted; asset register populated; photographic record assembled; logbook started.
              </li>
              <li>
                <strong>Section J — Certification (4-6 items).</strong> BS 5266-1:2025 acceptance certificate completed (all sections); BS 7671 EIC completed; central battery certificate completed (where applicable); documentation pack assembled; competence declaration signed; departures recorded (with full structure where any).
              </li>
            </ul>
            <p>
              Going through the checklist takes time. Even on a small installation, a thorough run is the better part of a day plus the elapsed times for charge and recovery. On a large installation, several days. The checklist is the working tool that ensures the certificate is signed against actual verification, not against assumed verification.
            </p>
          </ConceptBlock>

          <Scenario
            title="Insurer audit of certification stack"
            situation="A medium-sized commercial building has emergency lighting commissioned in 2022 with annual periodic since then. In 2026 the building insurer audits the certification stack as part of premium renewal. They request: acceptance certificate, all periodic certificates, the most recent five-year photometric, the EICR, the contractor\'s third-party scheme registration, and the BS 5266-1 logbook."
            whatToDo="A clean stack produces: 2022 acceptance certificate (BS 5266-1:2025 model form, all sections filled, competence declaration signed, departures section empty); four periodic certificates (2023, 2024, 2025, 2026, each with annual full inspection results); a 2026 five-year photometric report (point-by-point readings, design / baseline / minima comparison); a 2024 EICR (next due 2029); BAFE SP203-4 registration certificate for the maintenance contractor; logbook entries from 2022 to date (60 monthly + 5 annual + 1 photometric + reactive). The insurer\'s audit closes positively. Premium is held; no remediation is required."
            whyItMatters="The certification stack is the documentary evidence of the periodic regime. A clean stack reduces premium risk and increases insurer confidence. A messy or incomplete stack increases premium and may trigger remediation requirements before renewal. The cost of running the regime properly is much less than the cost of remediation under audit pressure."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Certification stack: acceptance certificate (commissioning), periodic certificates (annual), five-year photometric report, BS 7671 EIC / EICR, central battery certificate (where applicable), battery service records.',
              'Acceptance certificate (BS 5266-1:2025 model form) — signed once at commissioning. Use the current 2025 model with new sections (photometric, departures, competence declaration).',
              'Periodic certificate — issued at each periodic full inspection (typically annual).',
              'Competent person definition (2025): documented technical knowledge + emergency-lighting training + current qualification + procedural framework + signed register.',
              'BAFE SP203-4 is the recognised third-party scheme. NICEIC and ECA also offer emergency lighting schemes. Annual audit, public register, complaints handling.',
              '2025 departures policy: legitimate departures require technical justification + risk assessment + responsible person agreement + structured record.',
              '2025 NON-compliance (NOT departures): missing photometric, missing logbook, missing competence record, missing fire-resistance fixings, "sign now test later", lockable isolator without lock.',
              'Commissioning checklist (50-100 items across 10 sections) drives the verification work and produces the certificate evidence as an appendix.',
              'Insurers, fire authorities, and tribunals consume the certification stack. Clean stack = baseline; missing or stale = risk implications.',
              'Read the 2025 standard text — informal acceptance of certain departures from previous practice no longer applies.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is the BS 5266-1:2025 acceptance certificate legally required?',
                answer:
                  'Practically yes, even if not phrased as a direct legal requirement. The Regulatory Reform (Fire Safety) Order 2005 makes the responsible person liable for emergency escape lighting (Article 14) and for maintenance (Article 17). The acceptance certificate is the practical evidence that commissioning was done to standard; without it, the responsible person cannot demonstrate compliance with their RRO duties. Insurers and fire authorities expect to see it. In any post-incident investigation, its absence is a liability.',
              },
              {
                question: 'What if the building owner is also the competent person? Can they sign the acceptance certificate themselves?',
                answer:
                  'Only if they meet the BS 5266-1:2025 competent person definition — documented technical knowledge, training, qualification, procedural framework, and signed register. In practice, building owners are very rarely competent in this technical sense; they typically engage a competent contractor for the installation and verification. Self-signing as a building owner without the competence is misrepresentation and creates personal liability. The competent role is a technical role; ownership and competence are separate.',
              },
              {
                question: 'How does the 2025 update affect existing certificates issued under the previous edition?',
                answer:
                  'Certificates issued under the previous edition remain valid for the period they were issued for; they are not retroactively invalidated. But periodic certificates issued from 2025 onwards must be on the 2025 model form and must reflect the 2025 standard. The transition for existing installations is at the next periodic cycle — the periodic certificate at that cycle is on the 2025 form. The acceptance certificate stays as it was issued.',
              },
              {
                question: 'Can a single competent person sign certificates across multiple commissionings on the same day?',
                answer:
                  'Yes, where each commissioning has been verified to the same standard. The competent person\'s signature is on each certificate individually, not on a batch. The certificates are separate documents covering separate installations. The competent person\'s scope of competence (per the signed register) must cover each. Time pressure to compress multiple commissionings into a single day must not result in shortcutting the verification — each installation must have its full commissioning sequence.',
              },
              {
                question: 'Can the BS 5266-1 acceptance certificate be issued before the BS 7671 EIC?',
                answer:
                  'No, not realistically. The acceptance certificate cross-references the BS 7671 EIC (for the underlying electrical installation verification). Without the EIC, the cross-reference is missing and the acceptance is incomplete. The natural order is: BS 7671 verification first → BS 7671 EIC issued → emergency-lighting-specific verification (visual against design, photometric, switch-on, duration) → BS 5266-1 acceptance certificate referencing the EIC. Both certificates are typically issued on the same day at handover.',
              },
              {
                question: 'What scheme is for the responsible person rather than the contractor?',
                answer:
                  'There is no scheme that "registers" responsible persons in the BS 5266-1 sense — the responsible person is defined by the RRO 2005 (the building occupier or the person with control). What exists are competence frameworks and training programmes for responsible persons (Institute of Fire Safety Managers, NEBOSH National Fire Certificate, IOSH Fire Safety) that demonstrate the responsible person has the knowledge to discharge their RRO duties. These complement the contractor\'s third-party scheme; they are not the same thing.',
              },
              {
                question: 'How does a small premises (e.g. a small shop) approach the certification stack?',
                answer:
                  'The same framework applies but scaled. A small shop may have ten emergency luminaires; the acceptance certificate is the same model form with smaller content; the asset register is a single page; the logbook is a small notebook. The contractor signing the certificates must still meet the competent person definition — third-party scheme registration is not legally required but is the practical route for any contractor doing more than a few installations a year. The five-year photometric is still required.',
              },
              {
                question: 'What if I find a previous acceptance certificate signed by an unidentified or unverifiable person?',
                answer:
                  'Document the position in the current periodic certificate and the logbook. The previous certificate stands as it was at the time, but the current verification can record the limitation (e.g. "previous acceptance certificate signed by [name] of [unverifiable organisation], status of competence cannot be confirmed retrospectively; current periodic certificate signed by [name] of [verifiable competent firm]"). The insurer or fire authority can see the chain. From the current periodic onwards, the chain is clean; the historical position is honestly recorded.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Certification and commissioning checklists — Module 5.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
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
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5-section-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.6 Client handover procedure
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

export default EmergencyLightingModule5Section5;
