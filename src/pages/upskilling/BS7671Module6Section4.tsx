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
    id: 'm6s4-which-cert',
    question:
      'A customer asks you to add a single new spur from an existing socket-outlet on a 32 A ring final circuit. The new spur is one additional socket-outlet, with no new circuit. Which certificate is correct?',
    options: [
      'Electrical Installation Certificate (EIC) — treat every alteration as a new install',
      'Minor Electrical Installation Works Certificate (MEIWC) — accessory added, no new circuit',
      'Electrical Installation Condition Report (EICR) — used for any change to a circuit',
      'No certificate at all — a single fused spur is not a notifiable alteration',
    ],
    correctIndex: 1,
    explanation:
      'Appendix 6 (BS 7671:2018+A4:2026) is explicit. A MEIWC is appropriate for the addition of an accessory or extension of an existing circuit (e.g. a new socket outlet, light point, or fused spur on an existing circuit). A new circuit — including a CU change — requires an EIC. An EICR is for assessing the in-service condition of an existing installation, not new work. Reg 644.1 and 644.4 set out which form goes with which job.',
  },
  {
    id: 'm6s4-eic-three-signatures',
    question:
      'You designed, installed and tested the works yourself. How many signatures appear on the EIC?',
    options: [
      'One — the Designer block only; the other declarations are not required',
      'Three — Designer, Installer and Inspector blocks, each signed separately',
      'Two — Designer and Installer only; the Inspector block is for EICRs',
      'Four — Designer, Installer, Inspector plus an independent witness',
    ],
    correctIndex: 1,
    explanation:
      'The EIC has three separate declarations — Designer, Installer (Constructor) and Inspector (Tester) — per Reg 644.1 and Appendix 6 model form. Where one competent person fulfilled all three roles they sign each block; the declarations themselves are not merged. This is how BS 7671 records discharge of design, construction and verification responsibilities for the works covered by the certificate.',
  },
  {
    id: 'm6s4-eicr-c1-vs-c2',
    question:
      'On an EICR you find a 13 A socket-outlet face cracked open with live conductors visible to the touch. Which observation code applies?',
    options: [
      'C3 — improvement recommended, no immediate risk',
      'FI — further investigation required without delay',
      'C1 — danger present, immediate action required',
      'C2 — potentially dangerous, urgent remedial action',
    ],
    correctIndex: 2,
    explanation:
      'C1 = danger is present, risk of injury, immediate action required. Visible live conductors at a damaged accessory is the textbook C1 example — Best Practice Guide 4 (Electrical Safety First) and IET GN3 Section K both list it. The duty in front of you is to make the installation safe before leaving site (isolate the circuit, warn the customer in writing) and then record the C1 on the report.',
  },
  {
    id: 'm6s4-overall-assessment',
    question:
      'You complete an EICR. You record three C3 observations and one C2. What is the overall assessment box?',
    options: [
      'Satisfactory — a single C2 sits below the failure threshold',
      'Satisfactory with observations — the C3 items are advisory only',
      'Unsatisfactory — any C1, C2 or FI makes the result unsatisfactory',
      'Pending — the result awaits the client\'s written approval first',
    ],
    correctIndex: 2,
    explanation:
      'Reg 653.1 + Appendix 6 EICR model form: the overall assessment is "Unsatisfactory" if any C1, C2 or FI is recorded. C3 observations alone do not change the overall result to unsatisfactory, but they must be listed and acted upon at the next reasonable opportunity. The presence of even a single C2 on its own makes the installation unsatisfactory and triggers the urgent remedial-action duty.',
  },
  {
    id: 'm6s4-a4-cert-changes',
    question:
      'A4:2026 introduces several explicit cert-form changes. Which of the following is NOT a new A4 cert column or item?',
    options: [
      'Item 4.23 on the Schedule of Inspection — AFDD inspection',
      'Column 30 on the Schedule of Test Results — AFDD test',
      'TN-C-S (PNB) drop-down option for system earthing arrangement',
      'Item 5.7 on the Schedule of Inspection — verification of cable colour band',
    ],
    correctIndex: 3,
    explanation:
      'A4:2026 adds: explicit "TN-C-S (PNB)" option for system earthing (where there is a single connection to true earth), Item 4.23 on the Schedule of Inspection for AFDD presence and operation, Column 30 on the Schedule of Test Results for AFDD test, plus a new Maximum Permitted Zs column, Reference Method column, SPD type per board, supplied-from and max demand columns. Cable colour band verification is an existing item, not new.',
  },
  {
    id: 'm6s4-a3-vs-a4',
    question:
      'You discover a cert in your van marked "BS 7671:2018+A3:2024". Today is 16 April 2026. Can you issue this for new works?',
    options: [
      'Yes — the certificate form is generic across editions',
      'Yes — you may use the existing A3 pad until it is finished',
      'No — A4:2026 is in force, so the cert must reference the current edition',
      'Only if you handwrite the in-force edition date on the form',
    ],
    correctIndex: 2,
    explanation:
      'Reg 644.1 / Appendix 6 require the certificate to reference the edition under which the works were inspected and tested. A4:2026 is in force from 15 April 2026 — works completed on or after that date are inspected against A4 and the cert must reflect A4 (the model form columns and items are different). Using an out-of-date A3 form means missing columns (AFDD test, max permitted Zs, ref method, PNB option) and is a documentary non-compliance even if the underlying work is sound.',
  },
  {
    id: 'm6s4-recommended-next-inspection',
    question:
      'You issue an EICR on a privately rented domestic dwelling. What is the maximum statutory period to next inspection that applies regardless of your engineering judgement?',
    options: [
      '10 years, matching owner-occupied domestic guidance',
      '5 years or change of occupancy, whichever is sooner',
      '3 years, in line with places of public entertainment',
      '1 year, as for caravan parks and similar locations',
    ],
    correctIndex: 1,
    explanation:
      'England private-rented sector: 5 years OR change of occupancy is the statutory ceiling per the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, irrespective of what BS 7671 IET GN3 Table 3.2 might suggest. Scotland (Repairing Standard) and Wales have parallel rules. The cert may recommend a shorter period if the inspector judges it necessary; it cannot recommend a longer period than the statutory maximum.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under BS 7671:2018+A4:2026 Appendix 6, which combination of certificate is correct for: (a) new dwelling rewire, (b) addition of one new fused spur to an existing ring, (c) periodic inspection of a 1980s commercial unit?',
    options: [
      '(a) EIC, (b) MEIWC, (c) EICR',
      '(a) MEIWC, (b) EIC, (c) EICR',
      '(a) EICR, (b) EIC, (c) MEIWC',
      '(a) EIC, (b) EIC, (c) EIC',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 644.1 / Appendix 6: a complete rewire is a new installation = EIC. The fused spur is an addition of an accessory to an existing circuit (no new circuit) = MEIWC. Periodic inspection of an existing in-service installation = EICR (Reg 651.1). The three documents are not interchangeable — using the wrong form makes the cert non-compliant on its face.',
  },
  {
    id: 2,
    question:
      'Reg 644.1 requires the EIC to be signed by three competent persons. Who are they and what do they each declare?',
    options: [
      'Owner, occupier and tester — confirming the property and its ownership',
      'Designer, surveyor and Building Control — declaring statutory compliance',
      'Designer, Installer/Constructor and Inspector/Tester — each declaring their part complies',
      'Manufacturer, distributor and end user — declaring product conformity',
    ],
    correctAnswer: 2,
    explanation:
      'Appendix 6 model form has three declarations: Designer (responsibility for the safety of the design — Reg 132 / 134.1), Constructor or Installer (responsibility for construction in accordance with BS 7671 — Reg 134.1), and Inspector/Tester (responsibility for the inspection and testing — Chapter 64). Where one person did all three, they sign each block separately. Reg 132 places these duties expressly on the persons named.',
  },
  {
    id: 3,
    question: 'The Schedule of Inspection forms part of which certificate(s)?',
    options: [
      'EIC only — periodic reports use a different schedule',
      'EICR only — initial verification needs no inspection schedule',
      'MEIWC only — full certificates condense it into the body',
      'EIC and EICR — both carry a Schedule of Inspection',
    ],
    correctAnswer: 3,
    explanation:
      'Appendix 6: the Schedule of Inspection forms part of both the EIC (initial verification per Chapter 64) and the EICR (periodic inspection per Reg 651.1). MEIWC does NOT require a Schedule of Inspection as a separate document — the inspection items are condensed into the body of the MEIWC itself. The Schedule of Test Results is similarly issued with EIC and EICR but not with MEIWC (MEIWC has its own test result entries).',
  },
  {
    id: 4,
    question:
      'A4:2026 introduces a new TN-C-S (PNB) option on the cert form. What does PNB stand for and why does it matter?',
    options: [
      'Protective Neutral Bonding — a single connection to true earth; its fault model differs from PME',
      'Public National Bonding — describes the DNO bonding policy across the network',
      'Private Network Boundary — defines the DNO/customer demarcation point on site',
      'Phase Neutral Balance — a power-quality term describing load distribution',
    ],
    correctAnswer: 0,
    explanation:
      "PNB = Protective Neutral Bonding. A TN-C-S installation where the only connection to true earth is at the consumer's neutral, rather than at multiple points along the distributor's network (which is PME). Common on installations fed from a private transformer or where the property is the only consumer on a section. A4 makes PNB an explicit cert option because conflating it with PME hides the true fault model. The new TN-C-S (PNB) drop-down matters for inspector judgement on Ze, open-PEN risk and supplementary protective measures.",
  },
  {
    id: 5,
    question:
      'Which observation code is correct for an installation found to lack 30 mA RCD additional protection on a domestic socket-outlet circuit on a 2008-installed CU, where the sockets feed a kitchen used by ordinary persons?',
    options: [
      'C1 — danger present, immediate action required before leaving site',
      'No code — the circuit complied with the edition it was installed under',
      'C2 — potentially dangerous, a recognised increased shock-injury risk',
      'C3 — improvement recommended only, with no urgency attached',
    ],
    correctAnswer: 2,
    explanation:
      'BPG4 (Best Practice Guide 4 — Electrical Safety First) is the industry consensus on coding. Absence of 30 mA RCD additional protection where it would now be required by Reg 411.3.3 (sockets up to 32 A used by ordinary persons) is C2 in most cases — the risk is elevated by foreseeable use (kitchens, gardens, children). C3 may be appropriate where the use is restricted and the risk demonstrably low. Pure "historic compliance" is not a justification under GN3 Section K — every observation is coded against current safety implications, not the edition the install was completed under.',
  },
  {
    id: 6,
    question:
      "On an EIC Schedule of Test Results under A4:2026, you find a new column labelled 'Max permitted Zs (Ω)'. What is its purpose and how do you use it?",
    options: [
      "Record the manufacturer's nameplate impedance for the protective device fitted",
      'Record the supply earth-fault loop impedance Ze, measured at the origin only',
      "Record the test instrument's internal lead impedance used for the measurement",
      "Record the maximum permitted Zs for that device, so measured Zs can be compared",
    ],
    correctAnswer: 3,
    explanation:
      'A4:2026 adds an explicit Max permitted Zs column on the Schedule of Test Results so the cert face shows: device + rating → max permitted Zs (looked up from App 3 / OSG, corrected for conductor temperature) → measured Zs → pass/fail. Previously the inspector held the limit in their head or in a separate sheet. The new column makes the disconnection-time evidence transparent to anyone reading the cert and removes a class of "looks fine" passes where the limit was never actually checked.',
  },
  {
    id: 7,
    question:
      "You issue an EICR with the overall result 'Unsatisfactory' due to two C2 observations. The customer asks: 'Does the installation need to be switched off?'",
    options: [
      'No — C2 needs urgent remedial action but not immediate isolation; explain it in writing',
      'Yes — every unsatisfactory EICR requires the installation to be isolated at once',
      'Yes — any installation with two or more C2 observations must be switched off',
      'No — a C2 only requires action at the next periodic inspection, not before',
    ],
    correctAnswer: 0,
    explanation:
      'C1 = danger present → make safe before leaving site / immediate isolation. C2 = potentially dangerous → urgent remedial action, but not the same as C1. BPG4 and GN3 frame the remedial response as "as soon as reasonably practicable" — many landlords and managing agents use a 28-day target. The duty on the inspector is to record the C2 clearly, explain the implication in writing to the customer/duty-holder, and not to leave site with the impression that nothing needs doing.',
  },
  {
    id: 8,
    question:
      'Reg 653.1 sets out what an EICR is for. Which of the following is NOT a stated purpose of an EICR?',
    options: [
      'Recording the result of inspection and testing of an existing installation',
      'Identifying departures from BS 7671 that may give rise to danger to persons',
      "Certifying the design parameters of new work under the Reg 132 design duty",
      'Providing recommendations on the actions required to remedy unsafe conditions',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 653.1: an EICR records the result of inspection and testing of an existing installation, identifies any departures from the current BS 7671 that give rise to danger, and recommends actions. It is NOT a design certificate — design responsibility (Reg 132) sits with the EIC. The classic mistake is treating an EICR as if it certifies the install — it does not; it certifies the condition. The remedial works that follow an EICR are themselves certified by an EIC (or MEIWC for minor works), not by reissuing the EICR.',
  },
];

const faqItems = [
  {
    question: 'Can the same person sign as Designer, Installer and Inspector on an EIC?',
    answer:
      'Yes, where that person is competent in all three areas. The EIC has three separate declarations and a single competent person can sign all three blocks. The declarations are not merged — each is a discrete statement of responsibility under Reg 132 (design), Reg 134.1 (construction) and Chapter 64 (inspection and testing). On larger projects the three roles are typically split across designer, contracting electrician and an independent tester.',
  },
  {
    question: 'When is a Minor Works Certificate (MEIWC) the wrong choice?',
    answer:
      'A MEIWC is for additions and alterations to a single circuit that do NOT introduce a new circuit. The line is bright: replace a CU = new EIC (every circuit is being recommissioned at the new board). Add a new spur or accessory to an existing circuit = MEIWC. Add a new circuit at the existing CU = EIC for the new circuit. Replace a socket-outlet on a like-for-like basis = some practitioners issue a MEIWC, but Reg 644.4 makes the MEIWC mandatory for additions and alterations — like-for-like component replacement is generally not a notifiable alteration.',
  },
  {
    question: 'What changed in the cert forms between A3:2024 and A4:2026?',
    answer:
      'A4:2026 makes several visible cert-form changes: TN-C-S (PNB) is added as an explicit drop-down on the system earthing arrangement; Item 4.23 is added on the Schedule of Inspection for AFDD presence and operation; Column 30 is added on the Schedule of Test Results for AFDD test results; a Max Permitted Zs column is added so the limit appears alongside the measured value; a Reference Method column is added so cable installation method is recorded explicitly; SPD type is recorded per board (rather than per installation); and supplied-from / maximum demand are explicitly captured. From 15 April 2026 the A4 form is the in-force form for new works.',
  },
  {
    question: 'On an EICR, what does each observation code (C1, C2, C3, FI) actually mean?',
    answer:
      'C1 = danger is present and immediate action is required (e.g. exposed live conductors). C2 = potentially dangerous, urgent remedial action required (e.g. missing 30 mA RCD on a domestic socket circuit). C3 = improvement recommended; the issue does not present an immediate or urgent risk but should be addressed at the next reasonable opportunity (e.g. an outdated cable colour scheme without warning labels). FI = further investigation required without delay; the inspector cannot determine the extent of risk in the time available and recommends a focused follow-up. Every observation gets exactly ONE code — not zero, not two — per IET GN3 Section K.',
  },
  {
    question:
      'How do I decide between Satisfactory and Unsatisfactory on the EICR overall assessment?',
    answer:
      'The rule is mechanical: if there is any C1 or C2 observation, the overall assessment is Unsatisfactory. FI also triggers Unsatisfactory because the danger cannot be ruled out at the time of inspection. C3 observations alone do not change the overall assessment from Satisfactory but must be listed and explained. The overall Satisfactory / Unsatisfactory box is not the inspector\'s personal judgement of how the install "feels" — it is a deterministic output of the C1/C2/FI tally.',
  },
  {
    question: 'Who legally has to receive copies of the certificate?',
    answer:
      'The person ordering the work is the primary recipient (Reg 644.5 / 644.6 EIC; Reg 653.4 EICR). For private rented sector dwellings (England), the landlord must provide a copy to the tenant within 28 days and to the local authority on request (Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020). Building Control receive a copy where the works are notifiable under Building Regulations Part P. Best practice is to keep your own copy for at least 6 years (Limitation Act 1980) and ideally for the life of the installation.',
  },
  {
    question: 'Can I issue an EIC for works that depart from BS 7671?',
    answer:
      'Yes — Reg 120.3 expressly permits a designed departure where it does not result in less safety than compliance would. The EIC has a Designer declaration that includes recording any departures: the departure must be listed, the design rationale explained, the alternative measures identified, and the responsibility for the departure attributed to a named designer. An undocumented departure is not a Reg 120.3 departure — it is a non-compliance. A documented Reg 120.3 departure is compliant.',
  },
  {
    question: 'How long should I keep copies of certificates?',
    answer:
      'Minimum 6 years to align with the Limitation Act 1980 contract limitation period. Best practice and most insurers ask for the life of the installation. Digital storage (with backup) is now standard — paper-only retention has been the source of every "we lost the cert" dispute since 2007. The customer\'s copy is the legal copy; your retained copy is your evidence in the event of a future dispute.',
  },
  {
    question:
      "What's the difference between recommended next inspection date and a statutory inspection date?",
    answer:
      'BS 7671 (and IET GN3 Table 3.2) recommend a maximum period to next inspection based on installation type and use — e.g. 10 years for owner-occupied dwelling, 5 years for commercial. Statute may set a shorter ceiling: in England, private-rented dwellings have a 5-year-or-change-of-occupancy ceiling under the 2020 Regulations. The cert recommends a period; the law sets a maximum. Where the two conflict, the statutory maximum wins.',
  },
];

const BS7671Module6Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Model forms and certification — EIC, MEIWC, EICR | BS 7671:2018+A4:2026 | Module 6.4',
    description:
      'Appendix 6 model forms under BS 7671:2018+A4:2026 — when to issue an EIC, a MEIWC or an EICR, the three signatures, the Schedule of Inspection and Test Results, EICR coding (C1/C2/C3/FI) and the new A4 cert-form columns.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 4 · Updated for A4:2026"
            title="Model forms and certification (EIC, MEIWC, EICR)"
            description="Appendix 6 of BS 7671:2018+A4:2026 — the three certificates the regulations recognise, who signs each, what the Schedule of Inspection and Schedule of Test Results actually capture, the EICR coding system (C1/C2/C3/FI) and the new A4 cert-form columns (PNB, AFDD, max permitted Zs)."
            actions={
              <>
                <RegBadge>644.1</RegBadge>
                <RegBadge>651.1</RegBadge>
                <RegBadge>653.1</RegBadge>
                <AmendmentBadge regs={['411.3.4', '421.1.7', '722.312.2.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Three certificates, three jobs. EIC for new installations and additions/alterations that introduce a new circuit. MEIWC for additions/alterations to an existing circuit (no new circuit). EICR for periodic inspection of an existing installation.',
              'EIC carries three separate signature blocks — Designer (Reg 132), Installer/Constructor (Reg 134.1) and Inspector/Tester (Chapter 64). One competent person can sign all three but each declaration stands alone.',
              'EICR observations are coded C1 (danger present, immediate action), C2 (potentially dangerous, urgent remedial), C3 (improvement recommended) or FI (further investigation). Any C1, C2 or FI = Unsatisfactory overall.',
              'A4:2026 cert-form changes: TN-C-S (PNB) drop-down, Item 4.23 AFDD inspection, Column 30 AFDD test, max permitted Zs column, reference method column, SPD type per board, supplied-from and max demand.',
              'A3 cert forms are not valid for new works after 15 April 2026 — the form columns and items differ. Issue against A4 from that date forward.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the three BS 7671 model forms (EIC, MEIWC, EICR) and pick the correct one for a given scope of work, citing Reg 644.1 and Appendix 6.',
              'Identify the three signature blocks on an EIC (Designer, Installer/Constructor, Inspector/Tester) and explain what each declaration covers under Regs 132 and 134.1 and Chapter 64.',
              'Describe what the Schedule of Inspection and Schedule of Test Results capture and which certificates they form part of (EIC and EICR — not MEIWC).',
              'Apply the EICR observation codes (C1, C2, C3, FI) correctly using IET GN3 Section K and Best Practice Guide 4, and translate a list of observations into the deterministic Satisfactory / Unsatisfactory overall assessment.',
              'Recognise the A4:2026 cert-form changes (TN-C-S (PNB), AFDD inspection and test, max permitted Zs, reference method, SPD per board, supplied-from, max demand) and stop using A3 forms for works completed on or after 15 April 2026.',
              "Determine the recommended period to next inspection in line with IET GN3 Table 3.2, and recognise where statutory ceilings (e.g. PRS England 2020) override the inspector's recommendation.",
              'Identify who must receive copies of the certificate (customer, tenant where applicable, Building Control for notifiable works) and how long to retain copies.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The three certificates — what each is for</ContentEyebrow>

          <ConceptBlock
            title="EIC, MEIWC, EICR — picking the right form"
            plainEnglish="EIC = new installation, or addition/alteration that includes a new circuit. MEIWC = addition or alteration to an existing circuit only (no new circuit). EICR = periodic inspection and condition report of an existing installation."
            onSite="The decision is rarely subjective once you frame it correctly. Did the works create a new final circuit? EIC. Did the works extend or modify an existing circuit only? MEIWC. Did the works consist of inspecting and testing an installation that was already in service, with no new work? EICR. CU change = EIC (every circuit is recommissioned at the new board). New EV charge-point with a new dedicated circuit = EIC. Adding a fused spur from an existing socket = MEIWC. Five-yearly landlord inspection = EICR."
          >
            <p>
              Reg 644.1 and Appendix 6 of BS 7671:2018+A4:2026 set out the three model forms. The
              EIC certifies that a new installation, or an addition/alteration that introduces a new
              circuit, has been designed, constructed, inspected and tested in accordance with BS
              7671. The MEIWC certifies that minor works to an existing circuit (an addition or
              alteration that does not include the provision of a new circuit) comply with the
              Regulations. The EICR records the condition of an existing installation against the
              current edition of BS 7671 — it does NOT certify new design or construction.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.1 — Certification of new installations, additions and alterations"
            clause="Upon completion of the inspection and testing of a new installation or changes to an existing installation, an Electrical Installation Certificate together with a Schedule of Inspection and a Schedule of Test Results shall be given to the person ordering the work. For an addition or alteration which does not include the provision of a new circuit, a Minor Electrical Installation Works Certificate, OR an Electrical Installation Certificate, may be provided."
            meaning="The trigger for an EIC is a new circuit. Without a new circuit, MEIWC is sufficient (and is the normal choice) — but the regulation explicitly allows the contractor to issue an EIC instead if they wish. The choice is contractor-led. What is not permitted is to issue no certificate at all for an addition or alteration."
            cite="BS 7671:2018+A4:2026, Reg 644.1 (Appendix 6 — model forms)"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The three signatures on an EIC</ContentEyebrow>

          <ConceptBlock
            title="Designer, Installer/Constructor, Inspector/Tester"
            plainEnglish="Three separate declarations, three responsibilities. One competent person can sign all three blocks if they did all three roles, but each declaration stands alone — they are not merged."
            onSite="Designer = the person who specified what was to be installed (cable size, protective device, layout). Installer/Constructor = the person who built it. Inspector/Tester = the person who carried out the initial verification (Chapter 64) and recorded the results. On a domestic rewire, this is often one electrician filling all three blocks. On a commercial fit-out, it is typically three different parties."
          >
            <p>
              Reg 132 places the design responsibility on a named designer. Reg 134.1 places the
              construction (installation) responsibility on the named constructor/installer. Chapter
              64 (initial verification) places the inspection and testing responsibility on the
              named inspector/tester. The EIC has three signature blocks because BS 7671 records
              these three responsibilities separately. Departures under Reg 120.3 are recorded
              against the Designer declaration — the designer carries the burden of justification.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why three blocks even when one person did everything"
            plainEnglish="The cert is a legal record of which competent person took which responsibility. Even when the same person fills all three roles, the regulations want each responsibility identified separately so that future readers (insurers, courts, subsequent contractors) can see which duty was discharged when."
            onSite="Sign each block fully — name printed, signature, date, position. Do NOT write 'as above' in the second and third blocks. The three blocks are independently retrievable evidence and each must stand on its own. If you handle the inspection and testing for someone else's design and install, only sign the Inspector/Tester block — leave the others for the named designer and installer to complete."
          />

          <SectionRule />

          <ContentEyebrow>The Schedule of Inspection</ContentEyebrow>

          <ConceptBlock
            title="What the Schedule of Inspection captures"
            plainEnglish="A structured tick-list of every inspection requirement from Chapter 64 — methods of basic and fault protection, identification of conductors, presence of the right protective devices, presence of safety-critical labelling, accessibility for operation and maintenance, and (new in A4) AFDD presence and operation."
            onSite="The schedule covers consumer unit and main switchgear, distribution boards, accessories (sockets, switches, isolators), final circuits, special locations and AFDD/SPD presence. Every line is a yes / no / N/A entry — there is no narrative box on the Schedule of Inspection. Narrative goes on the EIC face under 'comments on existing installation' or under departures."
          >
            <p>
              The Schedule of Inspection forms part of both the EIC and the EICR (Reg 644.1 and Reg
              653.1). It is the structured inspection record — distinct from the test results which
              sit on the Schedule of Test Results. A4:2026 adds Item 4.23 (AFDD presence and
              operation) to the Schedule of Inspection, alongside the existing items for SPD,
              earthing, bonding, RCD additional protection and labelling. MEIWC does NOT carry a
              separate Schedule of Inspection — the inspection items are condensed into the body of
              the MEIWC.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Appendix 6 · Schedule of Inspection (A4 changes)"
            clause="A4 introduces Item 4.23 — confirmation of AFDD inspection where AFDDs are required by Reg 421.1.7, in addition to the existing items for SPD, earthing arrangement, bonding, basic protection, fault protection, additional protection, identification of conductors and warning notices."
            meaning="Item 4.23 is the inspection counterpart to the new Column 30 on the Schedule of Test Results (AFDD test). Together they record that the AFDD is both correctly installed (inspection) and tested in accordance with the manufacturer\'s test button procedure (test). Reg 421.1.7 names the locations where AFDDs are required."
            cite="BS 7671:2018+A4:2026, Appendix 6 — Schedule of Inspection · Item 4.23"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>The Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="What the Schedule of Test Results captures"
            plainEnglish="A row per circuit. Conductor sizes, protective device, test instrument readings (insulation resistance, continuity, Zs, RCD operating time), and pass/fail. Under A4 it now also captures Max permitted Zs (so the limit and the measurement appear side-by-side), reference method, SPD presence, AFDD test, and the supplied-from / maximum demand."
            onSite="The Schedule of Test Results is the cert face that any future inspector reads first. It must be legible, complete and self-consistent. A4 adds columns specifically to make the cert-face evidence clearer: Max permitted Zs (so the inspector\'s App 3 lookup is on the cert, not in their head), Reference Method (so the cable installation method is recorded), AFDD test (so the new device is verified)."
          >
            <p>
              The Schedule of Test Results forms part of both the EIC and the EICR. Each row
              represents a circuit and captures: circuit description, conductor size (live and CPC),
              reference method (A4 — new column), protective device type and rating, max permitted
              Zs (A4 — new column), measured Zs, RCD type and rating, RCD operating time at IΔn and
              5 IΔn, AFDD test (A4 — new column 30), continuity (R1+R2 or R2), insulation
              resistance, polarity, and pass/fail. MEIWC carries its own condensed test-results
              section — there is no separate Schedule of Test Results for minor works.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The new A4 columns — what they mean for the inspector"
            plainEnglish="Max permitted Zs makes the limit explicit on the cert face. Reference Method records cable installation method (A, B, C, D, E, F, G — App 4). AFDD test records the new arc-fault device verification. SPD type per board records surge protection at each distribution board (rather than a single 'yes' for the installation). Supplied-from and max demand record the upstream supply context."
            onSite="A4-only items: TN-C-S (PNB) drop-down on the supply details box; Item 4.23 on the Schedule of Inspection (AFDD presence/operation); Column 30 on the Schedule of Test Results (AFDD test); Max permitted Zs column; Reference Method column; SPD type column per board; Supplied-from box; Max demand box. If the cert form does not have these — it is an A3 form. From 15 April 2026 it is not the in-force form for new works."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>The MEIWC — minor works</ContentEyebrow>

          <ConceptBlock
            title="What MEIWC actually covers"
            plainEnglish="A single-page certificate for additions and alterations to an existing circuit that do not introduce a new circuit. Adding a socket to a ring. Adding a light point to a lighting circuit. Replacing an accessory with a different specification. Adding a fused connection unit to feed a new appliance from an existing circuit."
            onSite="MEIWC is one page. It records: scope of the works, observations on the existing installation that the new works rely on, test results for the modified circuit (Zs, R1+R2, insulation resistance, RCD operating time where applicable), and a single signature for the competent person who designed, constructed and inspected the works. Crucially, MEIWC does NOT separately certify the existing installation — it certifies the new works only."
          >
            <p>
              Reg 644.1 permits MEIWC for additions/alterations not introducing a new circuit. The
              cert form (Appendix 6) is condensed: the inspection items and test results are on the
              same single page as the declaration, and one signature covers all three competent
              person roles. The MEIWC also requires an entry for the existing CPC continuity,
              earthing, bonding and protective device for the modified circuit — because the new
              works rely on those existing arrangements being adequate. If they are not adequate,
              that is recorded as an observation on the MEIWC and the customer is advised of the
              remedial requirement before the new works are energised.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>EICR — purpose, scope, coding</ContentEyebrow>

          <ConceptBlock
            title="What an EICR is for (Reg 651.1)"
            plainEnglish="A periodic inspection and test of an EXISTING installation, recording its condition against the current edition of BS 7671 and identifying any departures that give rise to danger. The EICR does not certify new work."
            onSite="The EICR is requested by landlords (statutory requirement in PRS England), insurers, mortgage lenders, employers (EAWR 1989 duty), buyers and sellers, and as a routine periodic inspection (IET GN3 Table 3.2). The inspector examines the installation, records observations against current BS 7671, codes them C1/C2/C3/FI, gives an overall Satisfactory/Unsatisfactory result, and recommends a period to next inspection."
          >
            <p>
              Reg 651.1 sets the purpose of the EICR: to determine, so far as is reasonably
              practicable, whether the installation is in a satisfactory condition for continued
              service. Reg 653.1 defines what the EICR records: the result of the inspection and
              testing, identification of departures from the current edition that give rise to
              danger, and recommended actions. Reg 653.2 sets out limitations — the inspector
              records the agreed extent and the agreed limitations of the inspection (e.g. live
              testing not undertaken, areas not accessible).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 653.1 — Periodic inspection and testing"
            clause="Where required by other Regulations, or where it has been agreed between parties, an inspection and testing of an existing electrical installation shall be carried out at appropriate intervals to determine whether the installation is in a satisfactory condition for continued service. An Electrical Installation Condition Report shall be produced based on the inspection and testing, classifying any observed departures from the current edition of this Standard."
            meaning="EICR records condition, not design. The inspector\'s job is to identify departures and code them by safety implication — not to redesign the installation. A C2 observation (e.g. missing 30 mA RCD on a domestic socket circuit) records the departure and triggers the urgent-remedial-action duty; the remedial works themselves are then certified separately by an EIC or MEIWC."
            cite="BS 7671:2018+A4:2026, Reg 653.1"
          />

          <ConceptBlock
            title="Observation codes — C1, C2, C3, FI"
            plainEnglish="C1 = danger present, immediate action required (e.g. exposed live conductors). C2 = potentially dangerous, urgent remedial action required (e.g. missing RCD where current edition requires it). C3 = improvement recommended (e.g. outdated cable colours without warning labels). FI = further investigation required without delay (e.g. unidentifiable circuit, suspected concealed damage)."
            onSite="Every observation gets exactly ONE code. Not zero. Not two. The code is chosen by reference to IET GN3 Section K and Best Practice Guide 4 (Electrical Safety First). 'It looks fine but the install is old' is not C3 by default — C3 is for genuine improvement recommendations against the current edition. 'I am not sure' is not C2 — that is FI. The discipline of one observation = one code is what makes the EICR coding system useful and defensible."
          >
            <p>
              The four codes are mutually exclusive. C1 = unsafe now. C2 = unsafe under foreseeable
              conditions. C3 = compliant historically but the current edition would do this
              differently and the customer should know. FI = the inspector cannot assess the risk
              from the available evidence and recommends a focused follow-up. The overall assessment
              is mechanical: any C1, C2 or FI = Unsatisfactory. C3 alone = Satisfactory but with
              observations recorded. The inspector does not get to override this with a gut-feel "I
              think this is OK".
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <ConceptBlock
            title="Satisfactory vs Unsatisfactory — the deterministic rule"
            plainEnglish="Any C1, any C2, any FI = overall Unsatisfactory. C3 only = overall Satisfactory (with C3 observations listed). No observations = overall Satisfactory."
            onSite="The overall box is not the inspector\'s personal verdict. It is the deterministic output of the C1/C2/FI tally. A landlord\'s EICR with one C2 is Unsatisfactory full stop — no amount of explanation softens it on the cert. The inspector\'s judgement is exercised in deciding the code on each observation; the overall result follows mechanically. This is what makes the EICR usable as a regulatory document — the customer, the council and the insurer all read the overall box the same way."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Recommended period to next inspection</ContentEyebrow>

          <ConceptBlock
            title="Where the recommended period comes from"
            plainEnglish="IET GN3 Table 3.2 sets typical recommended periods by installation type — 10 years for owner-occupied dwellings, 5 years for commercial premises, shorter for high-occupancy or harsh environments. Statute can shorten this. The cert recommends the period; statute sets a maximum."
            onSite="Owner-occupied dwelling: 10 years (or change of occupancy). Private-rented dwelling (England): 5 years (or change of occupancy) — STATUTORY ceiling under the 2020 Regulations. Commercial premises: typically 5 years. Construction sites, swimming pools, marinas, agricultural: 1 to 3 years. High-risk industrial: site-specific. The inspector can shorten the period if the installation\'s condition warrants it. The inspector cannot lengthen it past the statutory ceiling."
          >
            <p>
              The recommended period is an inspector-led judgement informed by IET GN3 Table 3.2,
              the installation\'s condition, the age of the equipment, the use of the premises and
              any statutory ceiling. The Electrical Safety Standards in the Private Rented Sector
              (England) Regulations 2020 set a statutory ceiling of 5 years or change of occupancy
              (whichever is sooner) for PRS dwellings in England — irrespective of the inspector\'s
              opinion. Scotland and Wales have parallel rules. The cert records the recommended
              date; the statutory date overrides it where shorter.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>A4:2026 cert-form changes — at a glance</ContentEyebrow>

          <ConceptBlock
            title="What is new on the A4 cert form vs A3"
            plainEnglish="TN-C-S (PNB) is now an explicit drop-down. AFDD inspection has its own item (4.23). AFDD test has its own column (30). Max permitted Zs is now a separate column from measured Zs. Reference Method is now a column on the test results. SPD type is recorded per board. Supplied-from and Max Demand are explicit boxes."
            onSite="The visual diff between A3 and A4: A3 had one Zs column on the test results sheet; A4 has two (max permitted, measured). A3 had no AFDD line; A4 has Item 4.23 on inspection and Column 30 on test results. A3 grouped TN-C-S; A4 splits PME and PNB. A3 had a single SPD entry for the installation; A4 records SPD type per board. If your cert pad does not show these — it is A3 and out of date for new works after 15 April 2026."
          >
            <p>
              The amendment changes (Reg 411.3.4 luminaire RCD in domestic premises, Reg 421.1.7
              AFDD requirements, Reg 722.312.2.1 EV PEN prohibition) drive the cert-form changes.
              The form must record evidence that the new regulations have been complied with. Item
              4.23 evidences AFDD presence and operation. Column 30 evidences AFDD operation under
              test. The Max Permitted Zs column makes the disconnection-time analysis explicit on
              the cert face. The TN-C-S (PNB) drop-down lets the inspector record the supply
              earthing arrangement accurately rather than collapsing PNB into PME.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Distribution — who gets the certificate</ContentEyebrow>

          <ConceptBlock
            title="Who must receive copies"
            plainEnglish="The person ordering the work is the primary recipient. Tenants of PRS dwellings (England) must receive a copy within 28 days of inspection. Building Control receive a copy where the works are notifiable under Building Regulations Part P. The contractor keeps their own copy."
            onSite="Standard distribution: customer (the person ordering the work) gets the original; contractor keeps a copy for at least 6 years (Limitation Act 1980); for PRS England, landlord must give tenant a copy within 28 days; for notifiable Part P works (England and Wales), Building Control receive a copy via the competent-person scheme registration. Best practice is digital storage with multi-site backup. Paper-only retention is the source of every 'we lost the cert' dispute."
          >
            <p>
              Reg 644.5 / 644.6 (EIC) and Reg 653.4 (EICR) place the copy-distribution duty on the
              contractor. The customer\'s copy is the legal copy. The contractor\'s retained copy is
              evidence in a future dispute. Insurers, mortgage lenders and conveyancers will ask for
              the EIC or EICR at point of sale or remortgage, sometimes years after the work was
              completed. A retention period of 6 years aligns with the simple-contract limitation
              period; lifetime retention is best practice. Digital storage with redundancy is now
              the norm.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Issuing a MEIWC for works that introduce a new circuit"
            whatHappens="An electrician adds a new dedicated 32 A circuit for an EV charger and issues a MEIWC. Reg 644.1 is unambiguous: a new circuit requires an EIC. The MEIWC is invalid for these works. On a later EICR, the lack of an EIC for the EV circuit is recorded as a documentary non-compliance, and where the new circuit is found to depart from the current edition the absence of a Designer declaration leaves the responsibility unclaimed."
            doInstead="If the works create a new final circuit — by definition a circuit with its own protective device originating at a distribution board or consumer unit — the cert is an EIC, not a MEIWC. The EIC carries the three signature blocks (Designer, Installer, Inspector) and the Schedule of Inspection and Schedule of Test Results. CU change = EIC. New EV circuit = EIC. New shower circuit = EIC. New socket on existing ring = MEIWC."
          />

          <CommonMistake
            title="Recording a C2 observation but ticking Satisfactory overall"
            whatHappens="The inspector lists a C2 observation (missing 30 mA RCD on a domestic kitchen socket circuit) in the body of the EICR but ticks Satisfactory overall, reasoning that 'the rest of the install is fine'. This is a coding system failure. Reg 653.1 + Appendix 6 EICR model form make the overall result deterministic — any C2 = Unsatisfactory."
            doInstead="The overall result is mechanical, not subjective. C1 / C2 / FI present → Unsatisfactory. C3 only → Satisfactory with observations. No observations → Satisfactory. Apply the rule. If the inspector believes the installation is genuinely safe, the observation should be recoded (C3 if it really is improvement-only) or the C2 stands and the overall result is Unsatisfactory. The inspector cannot have both."
          />

          <CommonMistake
            title="Issuing an A3 cert form for works completed after 15 April 2026"
            whatHappens="A contractor with a stockpile of pre-printed A3 cert pads continues to use them after 15 April 2026 to 'use them up'. The A3 form lacks the Item 4.23 AFDD inspection line, Column 30 AFDD test, Max Permitted Zs column, Reference Method column, SPD per board entries, supplied-from box and TN-C-S (PNB) option. The cert is documentary non-compliance with App 6 of the in-force edition — even if the underlying work is sound."
            doInstead="From 15 April 2026, issue against A4. Reorder pads or, ideally, switch to digital cert software that pulls the in-force form template automatically. The form columns matter — they evidence compliance with the new Regs (Reg 411.3.4 luminaire RCD, Reg 421.1.7 AFDD, Reg 722.312.2.1 EV PEN). A cert that cannot record those is a cert that cannot evidence compliance with them. Old pads can be donated to a teaching scrapbook — not used in service."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Consumer unit replacement on a 1990s domestic property"
            situation="Customer wants the existing 17th edition split-load CU replaced with a modern A4-compliant board (RCBOs throughout, SPD, AFDDs on bedroom and living-area circuits per Reg 421.1.7). All existing circuits are recommissioned at the new board. No new circuits added at this visit. The customer asks whether this is a 'minor works' job."
            whatToDo="This is an EIC, not a MEIWC. Reg 644.1: a CU change recommissions every circuit at the new board — every circuit has a new protective device, and the design responsibility for the protective coordination is fresh. Issue an EIC with the three signature blocks. Complete the Schedule of Inspection (including new Item 4.23 for AFDDs). Complete the Schedule of Test Results (including Column 30 AFDD test, Max Permitted Zs, Reference Method per circuit). Record any departures under Reg 120.3 against the Designer declaration."
            whyItMatters="Treating a CU change as 'minor works' is one of the most common cert-form errors at audit. The MEIWC has no Schedule of Inspection or Schedule of Test Results as separate documents — issuing one for a CU change loses the structured evidence of inspection and test that a new board demands. Insurers and PRS regulators will treat a CU change documented only by MEIWC as inadequate evidence."
          />

          <Scenario
            title="Five-yearly EICR on a private rented flat"
            situation="EICR on a 2-bed flat let to tenants. You find: one cracked socket-outlet face in the kitchen with no exposed live (C2), no 30 mA RCD on the lighting circuit (C2 in this property given foreseeable use), an old harmonised cable colour scheme with no warning label at the CU (C3), and one circuit at the CU that is unlabelled and you cannot positively trace from the test results alone (FI)."
            whatToDo="Code each observation discretely: socket = C2; lighting RCD = C2; cable colours = C3; unidentified circuit = FI. Overall result = Unsatisfactory (any C2 or FI triggers it). Recommended period to next inspection: 5 years OR change of occupancy (statutory ceiling — PRS England 2020), but given the C2s, the practical date is when the C2s are remedied and a re-inspection / NICEIC re-cert visit is undertaken. Issue the EICR to the landlord; landlord must provide a copy to the tenant within 28 days; council on request."
            whyItMatters="The PRS England 2020 Regulations make the 5-year ceiling statutory and the 28-day tenant-copy duty statutory. An EICR with C2s on a PRS dwelling triggers landlord remedial-works duty within 28 days. The C2s are not optional — they are the cert\'s record of the legal trigger. Coding a C2 down to C3 because the landlord wants a Satisfactory result is a serious professional failure and exposes the inspector to discipline by their certification body and to civil liability if a tenant is injured."
          />

          <SectionRule />

          <ContentEyebrow>Worked example — three certs on three jobs</ContentEyebrow>

          <ConceptBlock
            title="Three jobs in one week — picking the right cert each time"
            plainEnglish="Job 1: full rewire of a 1960s semi. Job 2: add a fused spur from an existing kitchen ring to feed a new fridge-freezer. Job 3: five-yearly periodic on a 30-flat HMO."
            onSite="Job 1 (rewire): EIC. New installation. Three signature blocks. Full Schedule of Inspection (with Item 4.23 AFDD where required by Reg 421.1.7). Full Schedule of Test Results (with Column 30 AFDD test, Max Permitted Zs, Reference Method). Reg 120.3 departure log if any. Job 2 (fused spur): MEIWC. Addition to existing circuit, no new circuit. Single page. Tests for the modified circuit. Single signature for the competent person. Confirm existing CPC continuity, RCD operation and Zs are adequate before energising. Job 3 (HMO periodic): EICR. Schedule of Inspection. Schedule of Test Results. Observations coded C1/C2/C3/FI per IET GN3 Section K and BPG4. Overall Satisfactory or Unsatisfactory by the deterministic rule. Recommended period to next inspection per IET GN3 Table 3.2 with statutory ceiling check."
          >
            <p>
              The discipline is to ask 'does this work introduce a new circuit?' for additions and
              alterations (yes = EIC, no = MEIWC), and to default to EICR for periodic inspection of
              installations already in service. Edge cases — partial rewires, like-for-like CU
              replacements, accessory upgrades — are resolved by the same question. New circuit?
              EIC. No new circuit, just touching existing? MEIWC. Just looking, not doing? EICR.
              Three certificates, three jobs, three tests of which is which.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Three certs, three jobs. EIC = new install or addition with a new circuit. MEIWC = addition or alteration to an existing circuit only. EICR = periodic inspection of an existing installation. Reg 644.1 / Reg 651.1 / App 6.',
              'EIC carries three signature blocks: Designer (Reg 132), Installer/Constructor (Reg 134.1), Inspector/Tester (Chapter 64). One competent person can sign all three but the declarations stand alone.',
              'Schedule of Inspection and Schedule of Test Results form part of EIC and EICR — not MEIWC. MEIWC is a single-page condensed cert.',
              "EICR codes are C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended), FI (further investigation). Any C1, C2 or FI = Unsatisfactory overall. C3 alone = Satisfactory. The overall box is deterministic, not the inspector's gut feel.",
              'A4:2026 cert-form changes: TN-C-S (PNB) drop-down, Item 4.23 AFDD inspection, Column 30 AFDD test, Max Permitted Zs column, Reference Method column, SPD per board, supplied-from, max demand. A3 forms are not valid for new works after 15 April 2026.',
              'Recommended period to next inspection comes from IET GN3 Table 3.2 — but statute (e.g. PRS England 5-year ceiling) overrides where shorter.',
              'Distribution: customer gets the original; PRS tenants must receive a copy within 28 days; Building Control where notifiable; contractor retains a copy for at least 6 years (Limitation Act 1980), ideally for the life of the installation.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-6')}
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
              onClick={() => navigate('/electrician/upskilling/bs7671-module-6-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.5 Certification errors and common pitfalls
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module6Section4;
