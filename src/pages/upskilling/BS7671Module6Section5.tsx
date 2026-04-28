import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm6s5-coding-discipline',
    question:
      'On an EICR you find a damaged 13 A socket-outlet with the back-box exposed and live conductors visible to a finger. The socket is in a domestic kitchen. What is the correct observation code?',
    options: [
      'C3 — improvement recommended',
      'C2 — potentially dangerous',
      'C1 — danger present, immediate action required',
      'FI — further investigation required',
    ],
    correctIndex: 2,
    explanation:
      'C1 is reserved for "danger present, risk of injury, immediate remedial action required" — an exposed live conductor reachable by an ordinary person (especially in a kitchen with water and ordinary persons including children) is the textbook C1. GN3 Section K is explicit: where there is a real and present risk of electric shock, burn or fire, the inspector must code C1, advise the duty-holder verbally on the day, and where possible make the danger safe before leaving site (e.g. isolate the circuit at the CU and label).',
  },
  {
    id: 'm6s5-overall-satisfactory',
    question:
      'You have completed an EICR on a small commercial unit. The schedule of observations contains one C2 (no main protective bonding to the incoming gas pipe) and several C3 items. What goes in the "Overall assessment of the installation" box?',
    options: [
      'Satisfactory — the C2 can be remedied later',
      'Satisfactory with recommendations — the bonding is a minor matter',
      'Unsatisfactory — any C1 or C2 makes the overall assessment Unsatisfactory',
      "Conditional — depends on the duty-holder's risk appetite",
    ],
    correctIndex: 2,
    explanation:
      'Reg 651 / GN3 Section K is unambiguous: the overall assessment is "Unsatisfactory" if there is one or more C1, C2 or FI observation. There is no "satisfactory with one C2" route. The duty-holder receives an Unsatisfactory cert, the C2 is remedied, the inspector then issues a fresh EICR (or a written confirmation of remedial works) recording "Satisfactory". Marking an EICR satisfactory with a live C2 is one of the most common reasons certs are torn up by enforcement, insurers and prosecutors.',
  },
  {
    id: 'm6s5-departures',
    question:
      'A customer insists on an unusual cable route that requires a single-core armoured cable to be run without an external CPC, relying solely on the armour as the CPC. What does Reg 120.3 require you to do?',
    options: [
      'Refuse the work — there is no route under BS 7671 to depart from any regulation',
      'Document the departure on the EIC, justify why the design still achieves at least the same level of safety, sign the design declaration, and ensure your PI insurance covers the design choice',
      'Note the departure verbally to the customer; a paper record is not required',
      'Issue a Minor Works Certificate instead — departures need not be recorded on Minor Works',
    ],
    correctIndex: 1,
    explanation:
      'Reg 120.3 explicitly permits departures from the standard where the resulting installation is no less safe than one designed in full compliance. The conditions are strict: (1) every departure must be recorded on the EIC under the "Departures from BS 7671" box, (2) the designer must justify and sign for it, (3) the level of safety achieved must be demonstrably equivalent or better, and (4) PI insurance must cover the design choice. Undocumented departures are the single biggest source of professional indemnity claims against electrical designers.',
  },
  {
    id: 'm6s5-411-3-3-exception',
    question:
      'A risk assessment to omit RCD additional protection on a non-domestic socket-outlet circuit (Reg 411.3.3 (b) exception) has been carried out. Where does the documented risk assessment live?',
    options: [
      "In the designer's office filing system only",
      'On the EIC, attached as an addendum, signed by a skilled person (electrically) and forming part of the certified document set',
      'On a separate one-line note pinned to the consumer-unit cover',
      'It does not need to be retained once the install is signed off',
    ],
    correctIndex: 1,
    explanation:
      'Reg 411.3.3 lists three socket categories. Only category (b) — sockets in other locations — can be excepted, and the documented risk assessment must accompany the EIC as part of the certified document set. The assessment itself must be signed by a skilled person (electrically) and reference the specific risks considered. A C2 / C3 on an EICR is highly likely if the assessment cannot be produced — and almost certain if the cert was originally issued without one.',
  },
  {
    id: 'm6s5-system-arrangement',
    question:
      'You are issuing an EIC on a property that has had its DNO supply re-cabled from TN-S to TN-C-S (PME) in the last six months. The original EIC three years ago recorded TN-S. What is the right approach?',
    options: [
      'Copy the previous EIC system arrangement — TN-S — for consistency',
      'Tick TN-C-S on the new EIC, update the bonding sizes per Table 54.8, verify the new Ze, re-check disconnection times against the new earth fault loop impedance, and record the change in the description of work',
      'Tick both TN-S and TN-C-S to be safe',
      'Ignore the change — system arrangement is not material to the EIC',
    ],
    correctIndex: 1,
    explanation:
      'The system earthing arrangement is THE defining input to fault analysis. A change from TN-S to TN-C-S (PME) brings new bonding requirements (Table 54.8 main protective bonding sizes, typically 16 mm² for a 100 A PME supply versus 10 mm² historic TN-S), new Ze, new Zs targets and new sensitivity to open-PEN. A4:2026 also adds a separate cert-form option "TN-C-S (PNB)" for systems with a single connection to true earth. Recording the wrong arrangement is a falsification of the legal document and a clean route to a professional indemnity claim.',
  },
  {
    id: 'm6s5-eicr-vs-eic',
    question:
      'An installer issues an EIC for a new installation. The customer later asks for "the cert that confirms the installation is safe to use". Which document is that?',
    options: [
      'The site notes are sufficient',
      'The EIC IS the cert — Reg 644.1 makes the EIC the legal record of initial verification, signed by the designer, constructor and inspector, with schedules of inspection and test results attached',
      'A separate EICR must be raised the day after the EIC',
      'A Minor Works Certificate replaces the EIC for safety confirmation',
    ],
    correctIndex: 1,
    explanation:
      'Reg 644.1 is the legal anchor for the EIC. The EIC, with the schedule of inspection and the schedule of test results attached, IS the certificate confirming the installation has been designed, constructed and verified to BS 7671 and is safe to put into service. Site notes, photos and verbal handovers are useful supporting evidence but they are not the cert and they are not what insurers, building control or HSE will look at after an incident.',
  },
  {
    id: 'm6s5-pi-insurance',
    question:
      'A designer signs the design section of an EIC for an installation they never visited, relying on the constructor and inspector to verify the design on site. A fault later causes a fire. From a professional-indemnity perspective, what is the correct view?',
    options: [
      "The designer is not exposed because they didn't do the install",
      'The designer is fully exposed — signing the design declaration is a personal undertaking that the design complies with BS 7671 (Reg 134.1.1, 644.1). PI insurers routinely repudiate cover where a signature was given without proper design oversight',
      'Only the constructor is exposed',
      'The duty-holder accepts all liability when they accept the cert',
    ],
    correctIndex: 1,
    explanation:
      'The three signatures on an EIC (designer, constructor, inspector) are personal declarations under Reg 644.1. Each is a legal undertaking. PI policies cover honest professional error — they do not cover signing a declaration that the signatory had no basis to sign. "I never went to site" is not a defence; it is, on the contrary, the prosecution case. Designers who sign for installations they never see typically lose cover and are personally exposed for the cost of remediation, damages and any criminal proceedings under EAWR 1989 / HSWA 1974.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under Reg 651.1, what is the purpose of an Electrical Installation Condition Report (EICR)?',
    options: [
      'To certify a new installation as compliant with BS 7671',
      'To assess the in-service condition of an existing installation against the current edition of BS 7671 and identify departures, deterioration, damage and dangerous conditions',
      'To replace the original EIC',
      'To act as a Minor Works Certificate for repairs',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 651.1 (and its supporting text in Chapter 65) sets the EICR scope: a periodic in-service assessment of an existing installation against the current edition. It is NOT a verification certificate (that is the EIC, Reg 644). It does not certify compliance — it reports condition. Its outputs are the schedule of observations (each coded C1 / C2 / C3 / FI) and the overall assessment (Satisfactory only when there are zero C1/C2/FI items).',
  },
  {
    id: 2,
    question:
      'GN3 names four observation codes for an EICR. Which option correctly pairs each code with its definition?',
    options: [
      'C1 immediate, C2 historic, C3 future, FI optional',
      'C1 danger present (immediate action), C2 potentially dangerous (urgent action), C3 improvement recommended (no immediate risk), FI further investigation needed (uncertainty about safety)',
      'C1 minor, C2 moderate, C3 severe, FI fault investigation',
      'C1 cosmetic, C2 functional, C3 statutory, FI fire indicator',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 Section K defines the four codes precisely: C1 = "Danger present. Risk of injury. Immediate remedial action required." C2 = "Potentially dangerous. Urgent remedial action required." C3 = "Improvement recommended." FI = "Further investigation required without delay." The discipline matters: assigning a C3 where C2 belongs (or vice versa) is the most common single error in EICR practice and the most common cause of regulatory and insurance disputes.',
  },
  {
    id: 3,
    question:
      "On a domestic EICR you find: (a) one C1 — exposed live conductor at a damaged socket; (b) two C3 items — no RCD on a 1995 lighting circuit, no labelling at the CU. The duty-holder asks you to mark the cert 'Satisfactory' because the C1 will be made safe before they sell the property. What do you do?",
    options: [
      "Agree — the duty-holder's plan addresses the C1",
      'Mark the cert Unsatisfactory regardless. Reg 651 / GN3 require Unsatisfactory whenever a C1, C2 or FI is recorded. Make the C1 safe on the day (isolate at CU, label, advise verbally and in writing). Issue a fresh EICR only after the C1 is properly remediated',
      'Mark Satisfactory with the C1 noted as a recommendation',
      'Cancel the EICR and walk away',
    ],
    correctAnswer: 1,
    explanation:
      "The Unsatisfactory outcome is mandatory — there is no inspector discretion. GN3 also requires the inspector to make C1 conditions safe at the time of inspection (typically by isolation and labelling) and to advise both verbally and in writing. The cert records what was found on the day; later remediation does not change the historic assessment. A duty-holder commercial pressure to mark 'Satisfactory' is the single most common professional-indemnity trap in the EICR world.",
  },
  {
    id: 4,
    question:
      'Reg 120.3 permits departures from BS 7671. Which set of conditions must ALL be satisfied for a departure to be valid?',
    options: [
      'The customer agrees verbally and the cost is justified',
      'The departure is recorded on the EIC, the designer can demonstrate the safety achieved is no less than full compliance, the designer signs the design declaration, and PI insurance covers the design',
      'The departure is verbally noted to the inspector at the next EICR',
      'A copy is filed with the local authority',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 120.3 is permissive but tightly conditioned. The four requirements above are cumulative: (1) recorded on the EIC in the "Departures" box, (2) demonstrably no less safe (the designer carries the burden of proof), (3) signed personal declaration by the designer, (4) PI cover for the design choice. Undocumented departures are not departures — they are non-compliances, and they are uninsurable.',
  },
  {
    id: 5,
    question:
      'An EIC must contain certain content per Reg 644.1. Which option lists items that MUST appear on the EIC document set?',
    options: [
      'Only the test results — schedules and inspection notes are optional',
      'Description of installation, design data, system earthing arrangement, schedule of inspection, schedule of test results, declarations and signatures from designer, constructor and inspector, and any departures from BS 7671 (Reg 120.3)',
      'Just the meter reading and the postcode',
      'Photos of the consumer unit only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 644.1 requires the EIC to record sufficient detail to demonstrate compliance — including the items above. The schedule of inspection (tick-box of items examined) and the schedule of test results (the measured values) are integral parts of the certified document set, not optional attachments. An EIC issued without one of the schedules is incomplete and would normally be rejected by an insurer or a third-party inspector.',
  },
  {
    id: 6,
    question:
      "An installer takes over a part-completed install from another contractor. The earlier work has visible non-compliances. The installer's own work is fully compliant. How should the EIC be issued?",
    options: [
      'Sign for the entire installation as compliant — once you sign, you are responsible for the whole thing',
      'Refuse to issue any cert',
      'Define the scope of work clearly on the EIC (the section the new installer designed and built), record any inherited departures or non-compliances explicitly, and either (a) raise an EICR for the inherited section, or (b) decline to certify the inherited work and document this decision in writing',
      'Mark the inherited work as "out of scope" and sign for everything',
    ],
    correctAnswer: 2,
    explanation:
      "The EIC scope is defined by the description of work box. An installer can lawfully limit their certification to the work they designed, constructed and inspected. Inherited non-compliances must NOT be silently absorbed: either raise a separate EICR documenting the inherited issues, or make clear in writing that the cert excludes the inherited work and the customer remains responsible for the rest. The 'inherited departure' problem destroys careers when an installer signs a single all-encompassing cert for a job they only partially controlled.",
  },
  {
    id: 7,
    question:
      'Why is a wrong system arrangement entry on an EIC (TN-S marked when the supply is actually TN-C-S / PME) a serious issue?',
    options: [
      'It causes confusion at the next inspection',
      'It cascades into wrong bonding sizes (Table 54.8), wrong Ze and Zs assumptions, wrong RCD selection logic, missed open-PEN risk on EV / generator interfaces, and a cert that misrepresents the installation. It is a falsification of the legal document',
      'It only matters if the cert is challenged',
      'There is no consequence — system arrangement is informational',
    ],
    correctAnswer: 1,
    explanation:
      'System arrangement is the entry that drives almost every other safety calculation on the cert. TN-C-S (PME) requires larger main protective bonding (Table 54.8), open-PEN considerations for EVs (Reg 722.312.2.1, A4) and PV / generator interfaces, and different fault-current modelling. A wrong entry breaks every downstream verification on the cert. A4:2026 adds a third option, TN-C-S (PNB), which the new cert form lists separately — reinforcing how seriously the standard treats the entry.',
  },
  {
    id: 8,
    question:
      'How long should issued certificates (EIC, EICR, Minor Works) typically be retained, and why?',
    options: [
      'Six months — long enough for the customer to accept the work',
      'Typically a minimum of 7 years (often longer in practice — many installers retain indefinitely) for tax / commercial / professional indemnity reasons; certs may also be required as evidence in any post-event investigation under EAWR 1989, HSWA 1974 or civil claims years after issue',
      'Until the next EICR is issued, then destroy the old one',
      'Retention is not a regulated matter and any period is acceptable',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 itself does not set a retention period, but UK tax law (typically 7 years for self-employed records) and PI policy conditions usually impose minimums. In practice, certs are evidence in any later HSE / civil / criminal proceedings — and these can arise years after the work. Most established firms retain certs indefinitely (low storage cost, high evidential value). A destroyed cert in a post-incident investigation is functionally equivalent to no cert ever existing.',
  },
];

const faqItems = [
  {
    question: 'What is the single most common certification error in UK practice?',
    answer:
      'Wrong observation code on an EICR — typically a C2 graded as C3 (under-coding) or, less often, a C3 graded as C2 (over-coding). GN3 Section K provides the only authoritative coding guidance and inspectors should refer to it routinely. Under-coding is more dangerous: it results in a "Satisfactory" overall when the installation in fact requires urgent remediation, and it is the most common single reason certs are repudiated by insurers and HSE after an incident.',
  },
  {
    question: 'Can an EICR ever be marked "Satisfactory" with a C2 present?',
    answer:
      'No. Reg 651 / GN3 Section K is explicit: any C1, C2 or FI on the schedule of observations forces the overall assessment to "Unsatisfactory". There is no inspector discretion on this. A duty-holder asking the inspector to mark Satisfactory anyway is asking the inspector to falsify the cert. The correct path is: (1) issue Unsatisfactory, (2) have the C2 remediated, (3) issue a fresh EICR (or a written confirmation of remedial works) recording Satisfactory.',
  },
  {
    question: "What's the practical difference between C2 and C3?",
    answer:
      'C2 = "potentially dangerous, urgent remedial action required" — there is a foreseeable path from the defect to injury, but no immediate hazard at the moment of inspection. Example: missing main protective bonding to an extraneous gas pipe in a property fed by TN-C-S. C3 = "improvement recommended" — the installation falls short of the current edition but presents no imminent risk. Example: a 1995 lighting circuit on an MCB without RCD additional protection (acceptable in 1995, not compliant today, but no specific path to injury). The decision turns on foreseeability of harm — not on the age of the install.',
  },
  {
    question: 'Why is "the cert IS the legal document" a thing inspectors keep saying?',
    answer:
      "Because in any post-event investigation — fire, electrocution, insurance dispute — the evidence the parties reach for is the cert, not the inspector's site notes, photos or recollections. Reg 644.1 (EIC) and the EICR provisions in Chapter 65 / Reg 651 establish the cert as the legal record. Anything not on the cert effectively did not happen, from the perspective of an enforcement authority or a court. That is why coding discipline, completeness, accurate system arrangement and properly recorded departures matter so much — and why it is professional malpractice to issue a cert with anything important left in the inspector's head.",
  },
  {
    question: 'When does Reg 411.3.3 (b) actually allow me to omit RCD on a socket?',
    answer:
      'Only on category (b) — sockets in non-domestic, non-public-access locations — and only with a documented risk assessment by a skilled person (electrically) which accompanies the EIC. Categories (a) (sockets used by ordinary persons / children) and (c) (mobile equipment used outdoors) cannot be excepted. The risk assessment must be specific to the actual risks at that location, signed, dated, and included in the certified document set. A generic, undated, unsigned "we risk-assessed it" note is not a Reg 411.3.3 (b) exception — it is a non-compliance dressed up.',
  },
  {
    question: 'Is the Reg 411.3.3 (b) risk assessment a separate document from the EIC?',
    answer:
      'It accompanies the EIC. The risk assessment must form part of the certified document set so that anyone reading the cert can see the basis for the exception. A common error is to treat the risk assessment as an internal-office record that lives separately from the cert; that defeats the purpose of Reg 411.3.3, because a future inspector looking at the EIC has no visibility of the assessment and would code the exception as a non-compliance.',
  },
  {
    question:
      'I inherited an EICR from another firm with a "Satisfactory" cert and a C2 in the observations. What now?',
    answer:
      'The earlier cert is invalid on its face — Reg 651 forbids "Satisfactory" with a C2. Document your finding in writing to the duty-holder (the cert they hold is invalid and should not be relied upon), advise immediate remediation of the C2, and either issue your own EICR (recording the actual condition and the actual codes) or refuse to take on the inspection responsibility until the C2 is cleared. Do NOT silently re-issue a fresh "Satisfactory" cert over the top — that compounds the original error and exposes you to the same liability as the original inspector.',
  },
  {
    question:
      'If I sign the EIC design declaration for a job I did not visit, what is my exposure?',
    answer:
      'Total. The three EIC signatures (designer, constructor, inspector) are personal declarations under Reg 644.1 / Reg 134.1.1. Signing the design declaration without proper design oversight is the single most common reason PI insurers repudiate cover. In a post-event prosecution under EAWR 1989 / HSWA 1974, the signature is the prosecution exhibit — the question becomes "what reasonable steps did you take to discharge the duty you signed for?" If the answer is "none, I never visited", the prosecution typically succeeds. Either visit the site, properly review the design, and sign in the knowledge of what you signed for; or refuse to sign.',
  },
  {
    question: 'How long do I keep certs?',
    answer:
      "BS 7671 itself does not specify, but a 7-year minimum is the standard professional benchmark (driven by tax law, PI conditions, and limitation periods for civil claims). In practice, most established firms retain indefinitely — storage is cheap, evidential value is high, and certs from years past routinely become exhibits in current investigations. A destroyed cert is functionally equivalent to a cert that never existed. If you delegate cert storage to a cloud platform, check the platform's data retention guarantees match your professional obligations.",
  },
];

const BS7671Module6Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Certification errors and common pitfalls | BS 7671:2018+A4:2026 | Module 6.5',
    description:
      'The most common BS 7671 certification errors — wrong codes, missing schedules, incomplete inspection records, wrong system arrangement, undocumented departures, inherited departures and the PI exposure that comes with each.',
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
            title="Certification errors and common pitfalls"
            description="The errors that destroy certs and the careers behind them — wrong code, missing schedules, no measured Ze, undocumented departures, wrong system arrangement, inherited non-compliances, and the PI exposure each one carries."
            actions={
              <>
                <RegBadge>120.3</RegBadge>
                <RegBadge>644.1</RegBadge>
                <RegBadge>651.1</RegBadge>
                <AmendmentBadge regs={['644.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'The cert IS the legal document. Reg 644.1 (EIC) and Reg 651.1 (EICR) make the certificate, with its schedules attached, the record relied on by insurers, building control, HSE and the courts. Anything not on the cert effectively did not happen.',
              'Coding discipline is everything on an EICR. C1 = danger present (immediate); C2 = potentially dangerous (urgent); C3 = improvement recommended (no imminent risk); FI = further investigation required. Any C1, C2 or FI forces an Unsatisfactory overall — no exceptions.',
              'Departures (Reg 120.3) are permitted but tightly conditioned: documented on the EIC, justified by the designer, equivalent safety demonstrated, signed declaration, PI cover. An undocumented departure is not a departure — it is a non-compliance.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply GN3 Section K coding discipline correctly — distinguish C1 / C2 / C3 / FI in marginal cases and explain the reasoning.',
              'Explain why any C1 or C2 forces an Unsatisfactory overall on an EICR (Reg 651.1 / GN3) and articulate the duty-holder consequence.',
              'List the mandatory contents of an EIC under Reg 644.1 and identify the most common omissions (missing schedules, no measured Ze, missing risk assessments).',
              'Apply Reg 120.3 to record a designed departure correctly — including the four cumulative conditions for validity.',
              'Identify the safety, legal and PI-insurance consequences of recording the wrong system earthing arrangement on the cert (TN-S vs TN-C-S vs TN-C-S (PNB), A4:2026).',
              'Manage the inherited-departure problem — where you take over an installation with existing non-compliances — without absorbing other parties’ liability.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The cert IS the legal document</ContentEyebrow>

          <ConceptBlock
            title="Why this section matters more than any other"
            plainEnglish="Every other module in BS 7671 tells you how to design and install. This section is about the moment you put your name on the page. Get any other regulation wrong and you have a technical defect. Get the cert wrong and you have a legal problem."
            onSite="Treat the cert as a sworn statement. Designer, constructor, inspector — three signatures, three personal declarations under Reg 644.1. After an incident the cert is exhibit number one in the file an insurer, HSE inspector or solicitor opens. What it says is what happened. What it omits did not happen."
          >
            <p>
              Reg 644.1 makes the EIC the primary record of initial verification. Reg 651.1 makes
              the EICR the primary record of in-service condition. Both regulations require the
              schedule of inspection and the schedule of test results to accompany the cert as
              integral parts of the document set. The cert is signed by the designer, constructor
              and inspector — each signature is a personal declaration that the named person has
              discharged the duty for that role. Reg 134.1.1 separately requires that good
              workmanship and proper materials be used. Together these regulations establish that
              the cert is not a receipt for work done; it is a sworn statement of compliance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.1 — Initial verification certification"
            clause="Upon completion of the verification of a new installation, or changes/additions to an existing installation, an Electrical Installation Certificate (EIC) together with a schedule of inspections and a schedule of test results shall be given by the designer, constructor or other person authorised to act on their behalf, to the person ordering the work."
            meaning="Three points are load-bearing: (1) the EIC is mandatory for new work and for changes/additions, (2) the schedules are integral — not optional attachments, (3) the cert must be given to the person ordering the work. An EIC issued without a schedule of inspection or without a schedule of test results is not a complete cert and would normally be rejected by a competent third party."
            cite="BS 7671:2018+A4:2026, Reg 644.1"
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>The most common errors</ContentEyebrow>

          <ConceptBlock
            title="The error league table"
            plainEnglish="Most cert problems come from the same handful of mistakes, in the same order, every time. Knowing the league table lets you self-audit before you sign."
            onSite="Top of the league: wrong observation code on an EICR (typically C2 under-coded as C3). Then: missing schedule of test results. Then: incomplete schedule of inspection (tick-boxes left blank). Then: no measured Ze — the designer assumed a value rather than measured one. Then: wrong system arrangement (TN-S marked when supply is TN-C-S). Then: undocumented departures. Then: missing Reg 411.3.3 (b) risk assessment for excepted sockets."
          >
            <p>
              The pattern is consistent across NICEIC, NAPIT and JIB audits: the technical work is
              usually fine; the cert documenting it is where the gap appears. The fix is process — a
              pre-signature checklist that walks through Reg 644.1 / Reg 651.1 contents line by line
              before the cert leaves the van. Many firms now require a second pair of eyes on every
              EIC before issue; the time cost is small, the liability reduction is substantial.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Missing or incomplete schedules"
            plainEnglish="The EIC summary page is the headline. The two schedules — inspection (the tick-box of items examined) and test results (the measured values) — are the evidence behind the headline. Without them, the cert proves nothing."
            onSite="Schedule of inspection: every applicable line must be ticked, crossed (not applicable, with brief justification), or annotated. A blank is not 'not applicable' — it is an undocumented gap. Schedule of test results: every circuit must have its measured Ze (or assumed at supply origin and measured downstream), R1+R2, Zs, IR, RCD operating times at IΔn and 5 IΔn, and — where applicable — the polarity verification."
          >
            <p>
              Reg 644.1 calls out both schedules as part of the certified document set. A common
              error is to record the test results on the schedule but leave the schedule of
              inspection partially blank — or vice versa. Both schedules are mandatory; both must be
              completed; both must be attached to the EIC delivered to the customer. The new A4:2026
              cert form adds new columns to the schedule of test results (RCD functionality, AFDD
              presence, EV-charging-circuit identification, surge protection status) — these must be
              completed where applicable.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="No measured Ze"
            plainEnglish="Ze (external earth fault loop impedance) is the foundation of every Zs calculation in the installation. Assuming a value rather than measuring it on the day is one of the most common cert errors — and one of the most costly when an incident occurs."
            onSite="Measure Ze at the origin of the installation with the supply isolated and main protective conductors disconnected from the MET (or with the MET still connected and the meter in suitable mode — follow GN3). Record the actual measured value on the EIC, not the DNO-published worst-case value (typically 0.35 Ω for TN-C-S, 0.8 Ω for TN-S). The measured value is usually substantially better than the worst-case — record the real number."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Coding discipline — C1 / C2 / C3 / FI</ContentEyebrow>

          <ConceptBlock
            title="The four codes — GN3 Section K"
            plainEnglish="Every observation on an EICR gets exactly one code. C1 = danger present (immediate). C2 = potentially dangerous (urgent). C3 = improvement recommended (no imminent risk). FI = further investigation required."
            onSite="The decision turns on foreseeability of harm: is there a real, present pathway from the defect to injury (C1)? Is there a foreseeable but not yet present pathway (C2)? Is the install short of the current edition but with no specific path to injury (C3)? Or is the inspector not yet sure (FI)? GN3 Section K provides examples for marginal cases — keep a copy of GN3 on every EICR job."
          >
            <p>
              The codes are not a sliding scale of severity — they are categorical. C1 requires the
              inspector to make the danger safe on the day (typically by isolation and labelling),
              to advise the duty-holder verbally and in writing, and to record the finding on the
              cert. C2 requires the inspector to advise urgent remediation and to record the
              finding. C3 requires the inspector to record the recommendation. FI requires the
              inspector to record what could not be determined and what investigation is needed.
              Under-coding (treating a C2 as C3) is the most common error and the most dangerous;
              over-coding (treating a C3 as C2) is less common and less dangerous but still a coding
              error.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 651.1 — Periodic inspection and testing"
            clause="Where required, periodic inspection and testing of every electrical installation shall be carried out in accordance with Regulations 651.2 to 651.5 in order to determine, so far as is reasonably practicable, whether the installation is in a satisfactory condition for continued service. The result of the periodic inspection and testing shall be recorded in an Electrical Installation Condition Report (EICR)."
            meaning="The EICR records condition — it does not certify compliance with the current edition. The output is a coded schedule of observations and an overall assessment of Satisfactory or Unsatisfactory. GN3 Section K is the authoritative coding guide and should be referenced explicitly in any disputed coding."
            cite="BS 7671:2018+A4:2026, Reg 651.1"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Why ‘Overall Satisfactory’ with any C1 or C2 is invalid</ContentEyebrow>

          <ConceptBlock
            title="The Unsatisfactory rule"
            plainEnglish="Any C1, C2 or FI on the schedule of observations forces the overall assessment to Unsatisfactory. There is no inspector discretion. There is no ‘Satisfactory with reservations’ route."
            onSite="A duty-holder who pressures you to mark Satisfactory anyway is asking you to falsify the legal document. The correct response is: (1) issue Unsatisfactory, (2) make any C1 safe on the day, (3) advise verbally and in writing, (4) wait for proper remediation, (5) issue a fresh EICR (or a written confirmation of remedial works) recording Satisfactory only after the C1/C2/FI items have been cleared."
          >
            <p>
              Reg 651 / GN3 Section K is unambiguous on this point. The Unsatisfactory rule exists
              because the EICR is a public-safety document — it is read by future electricians, by
              buyers’ surveyors, by insurers, by mortgage providers and (if anything goes wrong) by
              HSE. A ‘Satisfactory with a C2’ cert communicates a falsehood to every one of those
              readers and is the single most common reason certs are repudiated and inspectors are
              referred to their scheme provider for breach of competence.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Marking an EICR ‘Satisfactory’ with a live C2"
            whatHappens="Inspector finds a C2 (no main protective bonding to the gas pipe in a TN-C-S property). Duty-holder pushes back — sale falling through, mortgage withdrawing — and asks for ‘Satisfactory with a recommendation’. Inspector caves under pressure and issues Satisfactory. Six months later, fault on the installation kills a person. The cert is exhibit one in the prosecution file."
            doInstead="Issue Unsatisfactory. Advise the duty-holder in writing that you cannot mark Satisfactory while a C2 is present. Point them at the route forward: remediate the C2, then receive a fresh EICR or written confirmation of remedial works recording Satisfactory. The short-term commercial pain (delayed sale, awkward conversation) is incomparably smaller than the long-term professional, civil and criminal exposure of issuing a knowingly false cert."
          />

          <SectionRule />

          <ContentEyebrow>Departures — Reg 120.3</ContentEyebrow>

          <ConceptBlock
            title="When you can deviate from the standard"
            plainEnglish="Reg 120.3 lets you depart from a specific regulation if you can show the resulting installation is no less safe than full compliance would be. It is permissive but tightly conditioned."
            onSite="The four cumulative conditions: (1) recorded on the EIC in the ‘Departures from BS 7671’ box, with regulation cited; (2) designer demonstrates equivalent or better safety — burden of proof on the designer; (3) designer signs the design declaration personally; (4) PI insurance covers the design choice. Miss any one and it is not a departure — it is a non-compliance."
          >
            <p>
              The most common departure-related error is silent omission: doing it differently from
              the standard but not recording the departure on the cert. From a regulatory
              perspective this is indistinguishable from non-compliance — a future inspector reading
              the cert has no way to tell that the design was conscious. From a PI perspective it is
              worse than non-compliance: insurers typically repudiate cover where the insured cannot
              demonstrate the design was deliberate and justified.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 120.3 — Departures from the regulations"
            clause="Where the use of a new material or invention leads to departures from the Regulations, the resulting degree of safety of the installation shall be not less than that obtained by compliance with the Regulations. Such use shall be recorded on the Electrical Installation Certificate."
            meaning="Two clauses, both load-bearing. (1) Equivalent safety must be demonstrably achieved — not asserted, not assumed, demonstrated. (2) The departure must be recorded on the EIC. The recording is what makes the departure visible to future inspectors and what protects the designer’s PI cover."
            cite="BS 7671:2018+A4:2026, Reg 120.3"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Risk assessments — Reg 411.3.3 (b) and others</ContentEyebrow>

          <ConceptBlock
            title="The exception that needs the most paperwork"
            plainEnglish="Reg 411.3.3 lists three socket categories. Only category (b) — sockets in non-domestic, non-public-access locations — can be excepted from the 30 mA RCD requirement, and only with a documented risk assessment."
            onSite="The risk assessment must (a) be specific to the actual location and use, (b) be signed by a skilled person (electrically), (c) be dated, (d) accompany the EIC. A generic, undated, unsigned office-template note does not satisfy Reg 411.3.3 (b). Categories (a) (sockets used by ordinary persons / children) and (c) (mobile equipment used outdoors) cannot be excepted under any circumstances."
          >
            <p>
              The same principle applies to every documented exception in BS 7671: the paperwork IS
              the exception. Without the documented assessment, accompanying the cert and signed by
              a competent person, the exception does not exist and the regulation applies in full. A
              future inspector finding a non-RCD-protected socket without an accompanying assessment
              will code C2 — correctly, because absent the documented exception the install is
              non-compliant.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>System arrangement and the cascade</ContentEyebrow>

          <ConceptBlock
            title="The entry that drives every other calculation"
            plainEnglish="The system earthing arrangement (TN-S, TN-C-S, TN-C-S (PNB), TT, IT) is THE input to fault analysis. Get it wrong on the cert and every other safety calculation behind it is wrong too."
            onSite="A4:2026 introduces ‘TN-C-S (PNB)’ as an explicit cert-form option — a TN-C-S where there is only one connection to true earth (commonly a private installation behind a privately-owned distribution transformer). PNB has different open-PEN risk characteristics from PME and is recorded separately. Always verify the system arrangement at the cut-out, not from the previous cert; supplies do get re-cabled."
          >
            <p>
              The cascade from a wrong system arrangement entry is severe: wrong main protective
              bonding sizes (Table 54.8 — typically 16 mm² for TN-C-S 100 A vs 10 mm² historic
              TN-S), wrong Ze assumption, wrong Zs targets, wrong RCD type-selection logic, missed
              open-PEN considerations on EV / generator interfaces (Reg 722.312.2.1, A4), and a cert
              that misrepresents the installation. From a legal perspective it is a falsification of
              the document; from a PI perspective it is the kind of error insurers exclude.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="A4:2026 — the new TN-C-S (PNB) cert option"
            plainEnglish="PNB = Protective Neutral Bonding. A TN-C-S system where only one point of the installation is connected to true earth (typically the consumer’s side of a privately-owned transformer). A4 introduces it as an explicit cert-form option separate from PME."
            onSite="If you are working on a private LV network behind a customer-owned transformer, the system is almost certainly TN-C-S (PNB) rather than TN-C-S (PME). Mark the new cert option correctly. The bonding, fault analysis and open-PEN considerations differ from PME because the topology of the earth connection differs."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>The inherited-departure problem</ContentEyebrow>

          <ConceptBlock
            title="When you take over someone else’s installation"
            plainEnglish="An installer often takes over part-built work or an existing installation with non-compliances. Signing one all-encompassing EIC for the whole thing absorbs the prior installer’s liability — with no benefit and substantial exposure."
            onSite="Define the scope of work on the EIC tightly: the description of work box should record exactly the section the new installer designed, constructed and inspected. Inherited non-compliances must be either (a) raised on a separate EICR documenting them as observations, or (b) explicitly excluded from the EIC scope in writing. Silently absorbing inherited non-compliances inside an EIC is the fastest known route to inheriting another person’s liability."
          >
            <p>
              The pattern repeats: a customer wants a single cert covering everything; the installer
              wants the job done; the installer signs an EIC describing ‘the installation’ without
              scoping it to their work. Six months later a fault on the inherited section causes
              harm and the new installer is the named designer on the cert. Defending that position
              is hard — the cert is the document, the signature is the personal declaration, and
              there is no audit trail showing the installer scoped their work narrowly.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Signing an EIC for an installation you never designed in full"
            whatHappens="A designer signs the design declaration on an EIC for a project they were nominally engaged on but never actually designed in full — perhaps the constructor produced the design and the named designer rubber-stamped it. After a fire, the prosecution under EAWR 1989 and HSWA 1974 names the designer. PI insurer repudiates cover on the basis that the signature was given without proper design oversight."
            doInstead="Either properly design the installation (or properly review and adopt the constructor’s design, with documented review records) before signing, or refuse to sign. The signature is a personal undertaking under Reg 134.1.1 / Reg 644.1; treating it as a formality is the single most common reason PI policies repudiate cover."
          />

          <SectionRule />

          <ContentEyebrow>PI insurance — what the cert exposes you to</ContentEyebrow>

          <ConceptBlock
            title="The signature is the policy interface"
            plainEnglish="Professional indemnity (PI) insurance covers honest professional error. It does not cover signatures given without proper basis to sign. Every cert you sign is the policy interface."
            onSite="Standard PI repudiation grounds: (1) signature given without proper design oversight; (2) departure not recorded on the cert; (3) cert marked Satisfactory with a known C2; (4) wrong system arrangement entered when the actual arrangement was knowable; (5) inherited non-compliance silently absorbed inside an EIC scope. Each is a personal-liability event — the insurer steps back, and the named individual carries the cost."
          >
            <p>
              Read the PI policy. Most policies require: (a) work performed within the competence of
              the insured, (b) compliance with applicable standards including BS 7671, (c) honest
              disclosure of the work scope to the customer, (d) certs issued in accordance with the
              standard. Each requirement maps to a cert error. A cert error is rarely just a
              technical defect — it is typically a policy event. Treat the cert as the policy
              interface and most PI exposure manages itself.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Storing certs only on a single laptop or phone"
            whatHappens="Cert PDFs stored only on a personal laptop. Laptop fails. Backup never tested. A claim arises three years later — the customer cannot produce the cert, the installer cannot produce the cert, and the only remaining evidence of the work is the customer’s payment record and verbal recollection. PI cover repudiated for inability to produce the cert."
            doInstead="Retain certs on at least two independent storage systems (cloud + local, or two separate cloud providers). Retention period: minimum 7 years (UK tax / PI norm); most established firms retain indefinitely. Verify backups quarterly. If using a cloud platform, check the platform’s data retention guarantees match your professional obligations — some platforms purge inactive accounts after 12 months."
          />

          <SectionRule />

          <ContentEyebrow>Storage and retention</ContentEyebrow>

          <ConceptBlock
            title="How long, and where"
            plainEnglish="BS 7671 itself does not set a retention period. UK tax law (typically 7 years for self-employed records) and PI policy conditions normally do. In practice, certs are evidence in any later HSE / civil / criminal proceedings — and these can arise years after the work."
            onSite="Minimum: 7 years from issue. Best practice: indefinitely. Two independent storage systems (cloud + local). Quarterly backup verification. If a cert is lost, the firm is in functionally the same position as if no cert were issued — from the perspective of any post-event investigation."
          >
            <p>
              The customer also has retention obligations: the EIC should be passed to the property
              owner, retained with the property documentation, and handed on at sale. The Home
              Information Pack era institutionalised this; in practice many EICs go missing at sale,
              which is why a robust installer-side retention policy is the backstop. If the customer
              cannot produce their EIC ten years from now, the installer’s archive should be able
              to.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="The pressured EICR — ‘just mark it Satisfactory’"
            situation="You complete an EICR on a 1980s domestic installation for a property sale. Findings: one C2 (no main protective bonding to the incoming gas pipe — cut bond visible, never reinstated after a kitchen refit), three C3s (consumer unit wooden enclosure, no RCD on lighting circuit per A4 411.3.4 retrospective deviation, missing labelling). The vendor’s solicitor calls during the test and asks you to mark Satisfactory — the buyer’s mortgage offer expires in 48 hours."
            whatToDo="Mark Unsatisfactory. Reg 651 / GN3 forbid Satisfactory with any C1, C2 or FI — there is no inspector discretion. Make the C2 observable to the duty-holder in writing on the day; advise verbal and written. Explain the route forward: vendor remediates the C2 (a 30-minute job — reinstate the bond), receive a fresh EICR or written confirmation of remedial works the same day or next day, mortgage proceeds on the back of the new cert."
            whyItMatters="The Unsatisfactory rule is not a technicality — it is the public-safety contract the EICR carries. An inspector who marks Satisfactory under commercial pressure has falsified the legal document. The buyer’s family lives with the un-bonded gas pipe; if anything goes wrong, the cert is exhibit one and the inspector’s name is on it. The right answer is also, almost always, the commercially achievable answer — a 30-minute remediation followed by a fresh EICR is faster than an enforcement complaint to the scheme provider."
          />

          <Scenario
            title="The remote-design signature"
            situation="A regional contractor asks you (a chartered electrical engineer) to be the named designer on an EIC for a new commercial fit-out 200 miles away. The contractor will produce the design; you review by email; you sign the design declaration. Fee: £500. The constructor and inspector are the contractor’s own staff. You never visit the site."
            whatToDo="Decline — or restructure. The Reg 644.1 design declaration is a personal undertaking. Signing without proper design oversight (which, on a commercial fit-out 200 miles away you have not seen, is functionally impossible by email alone) is the textbook PI repudiation event. Either: (a) properly design the installation — visit, survey, model, document; or (b) refuse the signature and decline the engagement. £500 is not a sufficient fee to cover the personal exposure of signing for a project you have not designed."
            whyItMatters="The remote-design signature is one of the most common PI loss events in UK electrical practice. It is also one of the most preventable. The temptation is real — small fee, low effort, no apparent harm — but the exposure is uncapped and personal. PI policies typically repudiate cover where the insured cannot demonstrate proper design involvement. EAWR 1989 prosecutions for design failure name the signing designer, not the contractor who introduced the work. Read the cert as the legal document it is; refuse signatures you cannot stand behind."
          />

          <SectionRule />

          <ContentEyebrow>The pre-signature checklist</ContentEyebrow>

          <ConceptBlock
            title="What to verify before the cert leaves the van"
            plainEnglish="Most cert errors are caught by a five-minute structured review before signature. Build the review into your process and most of the league-table errors disappear."
            onSite="(1) Description of work — scoped to what you actually did, no broader. (2) System arrangement — verified at the cut-out today, not copied from a previous cert. (3) Schedule of inspection — every line ticked, crossed (not applicable, with reason) or annotated; no blanks. (4) Schedule of test results — measured Ze, R1+R2, Zs, IR, RCD times for every relevant circuit; no assumed values where measurement was possible. (5) Departures — every Reg 120.3 departure recorded, justified, signed. (6) Risk assessments — every Reg 411.3.3 (b) exception accompanied by a signed assessment. (7) Signatures — designer, constructor, inspector — each signing only what they have personally discharged. (8) Schedule completeness — both schedules attached to the EIC delivered to the customer. (9) Retention — cert filed in two independent storage systems."
          >
            <p>
              The checklist is mechanical but it eliminates the league-table errors above. Many
              firms now require a second pair of eyes on every EIC before issue — a peer walking the
              checklist on someone else’s cert. Cost: a few minutes per cert. Liability reduction:
              substantial. Where this is in place, the cert error rate drops to near zero and most
              PI events stop being cert events at all — they become genuine technical defects in the
              install, which is the kind of risk PI cover is designed for.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>The most expensive errors</ContentEyebrow>

          <ConceptBlock
            title="Where cert errors actually cost installers money"
            plainEnglish="Cert errors cost three ways: directly (re-issue, customer dispute), reputationally (scheme-provider audit, NICEIC / NAPIT / JIB intervention) and severely (PI repudiation, civil claim, prosecution under EAWR 1989 / HSWA 1974). The severity scales with the post-event use of the cert."
            onSite="Direct cost: a cert with a wrong code or missing schedule means a return visit, a second inspection, an embarrassed customer letter. Cost: a few hundred pounds and an awkward conversation. Reputational cost: scheme-provider audit triggered by a complaint or a third-party dispute; remedial training, potential supervision, fee. Cost: low thousands. Severe cost: a cert exhibited in a post-event prosecution or civil claim. Cost: typically PI repudiation, personal exposure, professional consequences."
          >
            <p>
              The point is not to frighten — it is to scale the discipline appropriately. The cost
              of getting the cert right is small (a structured review, a checklist, a peer
              second-pair-of-eyes). The cost of getting it wrong is variable, with a long tail
              towards severe outcomes. The expected-value calculation strongly favours process
              discipline. Every established firm in the UK has reached the same conclusion: the cert
              is the cheapest place to invest in risk reduction.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'The cert IS the legal document. Reg 644.1 (EIC) and Reg 651.1 (EICR) make the cert, with its schedules, the record relied on by insurers, regulators and courts. Anything not on the cert effectively did not happen.',
              'Coding discipline: C1 = danger present (immediate); C2 = potentially dangerous (urgent); C3 = improvement recommended (no imminent risk); FI = further investigation. Any C1 / C2 / FI forces an Unsatisfactory overall — no exceptions.',
              'Departures (Reg 120.3) require four cumulative conditions: recorded on the EIC, equivalent safety demonstrated by the designer, signed declaration, PI cover. Undocumented departures are not departures — they are non-compliances.',
              'System arrangement is THE input to fault analysis. Wrong entry cascades into wrong bonding sizes (Table 54.8), wrong Ze, wrong Zs targets, wrong RCD logic, missed open-PEN risk. A4:2026 adds TN-C-S (PNB) as a separate cert-form option.',
              'Define EIC scope tightly to the work you personally designed / constructed / inspected. Inherited non-compliances either go on a separate EICR or are explicitly excluded in writing — never silently absorbed.',
              'Retain certs minimum 7 years, ideally indefinitely, on at least two independent storage systems. Lost cert = no cert, from the perspective of any post-event investigation.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/study-centre/upskilling/bs7671-module-6')}
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
              onClick={() => navigate('/study-centre/upskilling/bs7671-module-6-section-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.6 Recording limitations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module6Section5;
