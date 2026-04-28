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
  AmendmentDiff,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'bs7671-statutory',
    question: 'Is BS 7671 itself a statutory legal requirement in the UK?',
    options: [
      'Yes — non-compliance is a criminal offence in its own right',
      'No — it is a non-statutory standard used to demonstrate compliance with statutory duties (EAWR 1989, HSWA 1974, Building Regulations Part P)',
      'Only in dwellings, where Part P makes it law',
      'Only when working under a Competent Person Scheme',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 is non-statutory — you cannot be prosecuted for "breaking BS 7671" the way you can be prosecuted for breaking EAWR. Its weight comes from being the accepted reasonable standard: courts, HSE and insurers treat compliance as evidence that you discharged your statutory duty under EAWR Reg 4 and HSWA s.2/3. Departures are permissible but the burden of justification shifts to you.',
  },
  {
    id: 'eawr-relationship',
    question:
      'Where does the legal weight of a BS 7671 inspection actually sit when it ends up in court?',
    options: [
      'BS 7671 itself — the regs name the criminal offence',
      'EAWR 1989 (Reg 4 in particular) — BS 7671 compliance is the evidence that the statutory duty was met',
      'The Wiring Regulations Act 2018',
      'The IET Code of Practice',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR is the prosecutorial route. BS 7671 is the benchmark used to assess whether the EAWR duty was discharged. There is no Wiring Regulations Act — that is a common misnomer. The IET Code of Practice is guidance, not the legal hook.',
  },
  {
    id: 'a4-recording-duty',
    question:
      'A4:2026 modified Reg 133.1.3 (selection of equipment). What practical change should now appear on your certification?',
    options: [
      'Nothing on the cert — 133.1.3 is design-side only',
      'A note that all equipment was selected by the designer',
      'A record of certain equipment-usage decisions on the appropriate Part 6 certificate',
      'A separate equipment schedule attached to every job',
    ],
    correctIndex: 2,
    explanation:
      "A4 closes a long-standing traceability gap. Where 133.1.3 specifies equipment usage, that decision must now be recorded on the appropriate certification specified in Part 6 (EIC / EICR / Minor Works as applicable). It's not a separate schedule — it lands on the cert.",
  },
  {
    id: 'm1s1-120-3-departure',
    question:
      'You are designing a commercial fit-out and the architect insists on a non-compliant cable route to preserve a feature ceiling. Reg 120.3 permits departure from BS 7671. What does "permitted" actually mean here in practice?',
    options: [
      'Permitted means you can ignore BS 7671 if the client signs a waiver',
      'Permitted means the departure is lawful only if the resulting installation is at least as safe — and that justification is documented on the certification (the cert is the audit trail, not the waiver)',
      'Permitted means the architect carries the legal exposure once they have signed the drawings',
      'Permitted means you must obtain HSE pre-approval before deviating',
    ],
    correctIndex: 1,
    explanation:
      'Reg 120.3 is permissive, not absolving. The departure is lawful only where the alternative measure is at least as safe as the BS 7671 route. EAWR Reg 4 (absolute duty) is the hook the courts use — and the burden of proving equivalence sits with the designer / installer. The cert (EIC) is the audit trail: the departure, the alternative, the equivalent-safety reasoning and the sign-off all land there. A client waiver does not transfer the EAWR duty.',
  },
  {
    id: 'm1s1-120-4-non-electrical',
    question:
      'Where in BS 7671 does the standard explicitly say it does NOT cover non-electrical hazards (e.g. trip hazards from cable routes, mechanical injury from plant)?',
    options: [
      'Reg 110.1.1 — the scope statement',
      'Reg 110.2 — exclusions',
      'Reg 120.4 — only the safety of persons, livestock and property against the hazards of electric current is the object of the regulations',
      'Reg 133.1.3 — selection of equipment',
    ],
    correctIndex: 2,
    explanation:
      'Reg 120.4 limits the scope of the standard to electrical hazards. Trip, fall, mechanical, ergonomic and fire-via-non-electrical-cause hazards are governed elsewhere — typically HSWA 1974, the Workplace (HSW) Regulations 1992, CDM 2015 and the Regulatory Reform (Fire Safety) Order 2005. A common misuse of BS 7671 in dispute is to cite it for a non-electrical injury; Reg 120.4 is the exit clause that defeats that argument.',
  },
  {
    id: 'm1s1-110-1-3-excluded',
    question:
      'Which of the following installations is EXCLUDED from the scope of BS 7671 by Reg 110.1.3 / 110.2?',
    options: [
      'Domestic dwellings (single-family)',
      'Low-voltage commercial installations',
      'Equipment on board ships, offshore installations and the electrical apparatus of the railway rolling stock and signalling',
      'Photovoltaic generation systems',
    ],
    correctIndex: 2,
    explanation:
      'Reg 110.1.3 / 110.2 exclude (among others): equipment on board ships, mobile and fixed offshore installations, aircraft, hovercraft, the electrical apparatus of motor vehicles (except those covered by 7XX series), railway rolling stock, traction signalling, certain mining and lightning protection systems. PV installations and standard dwellings are explicitly IN scope (Section 712 covers PV; Part 7 covers special locations including dwellings via Section 701-7XX).',
  },
  {
    id: 'm1s1-edition-cite',
    question:
      'You are issuing an EIC for a commercial install completed on 2026-05-12. Which edition reference is correct on the certificate?',
    options: [
      'BS 7671 (undated)',
      'BS 7671:2018',
      'BS 7671:2018+A2:2022+A3:2024',
      'BS 7671:2018+A4:2026',
    ],
    correctIndex: 3,
    explanation:
      'A4:2026 came into force 15 April 2026. Installations DESIGNED from that date forward must comply with A4. The cert must cite the dated edition the installation was designed against — "BS 7671:2018+A4:2026" — so a future inspector or court can resolve which set of requirements was active. The undated form ("BS 7671") is acceptable in marketing, never on a cert.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A client asks you to deviate from BS 7671 to save cost. You agree to the deviation. Where does your legal exposure now sit?',
    options: [
      'With the client — you advised them and they signed it off',
      'Nowhere — BS 7671 is non-statutory so there is no exposure',
      'With you — the burden of justifying the departure under EAWR Reg 4 (and proving the alternative is at least as safe) falls on the designer/installer',
      'With the manufacturer of the substituted equipment',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Reg 120.3 permits departures, but the cost of the choice is yours to defend. EAWR Reg 4 imposes an absolute duty (no "so far as reasonably practicable" qualification) so a cost-driven deviation that contributes to a fault is hard to defend. Document the alternative measures that achieve at least equivalent safety, get them signed off by a designer with PI cover, and record the departure on the certification.',
  },
  {
    id: 2,
    question:
      'You are asked to certify work that already exists and was installed before BS 7671:2018+A4:2026 came into force. Which standard do you certify against?',
    options: [
      'A4:2026 — only the latest edition is legally valid',
      'The edition in force when the installation was designed; safety still assessed under EAWR',
      'A1:2020 — the last electronic-only edition',
      'No certification possible for retrospective work',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 is forward-looking. Existing installations conforming to an earlier edition do not have to be brought up to A4:2026 to remain in lawful use, provided they remain safe to use under EAWR. Periodic inspection is assessed against the edition current at install (with codes applied for current safety), not against A4. EICR observations should make the basis of assessment explicit.',
  },
  {
    id: 3,
    question:
      'Under A4:2026, what must now be recorded on the certification when the designer relies on Reg 133.1.3 for equipment selection?',
    options: [
      'Nothing — 133.1.3 is informative',
      'The equipment-usage decisions specified by Part 6 — the cert is now the audit trail',
      "A separate manufacturer's declaration",
      'Only the BS EN reference of the equipment',
    ],
    correctAnswer: 1,
    explanation:
      'A4 amended 133.1.3 so that "certain usage of equipment" is now to be recorded on the appropriate electrical certification specified in Part 6. The cert becomes the durable record of the design-side selection logic, available to a periodic inspector in five years\' time who would otherwise have no idea why a specific device was chosen.',
  },
  {
    id: 4,
    question:
      'Which clause in BS 7671 explicitly states that compliance with the standard is voluntary, except where required by other regulations or contractual arrangements?',
    options: ['Reg 110.1.1', 'Reg 120.1', 'Reg 120.3', 'Reg 133.1.3'],
    correctAnswer: 2,
    explanation:
      'Reg 120.3 is the explicit voluntariness clause. The standard names itself voluntary, then ties its enforcement to other regulations (EAWR, HSWA, Part P) and to contract. This is the textbook answer when a client asks "does the law actually require BS 7671?" — the law does not name BS 7671; the law names a duty, and BS 7671 is the accepted way to discharge it.',
  },
  {
    id: 5,
    question:
      "The Object of the regulations (Reg 120.4) limits BS 7671's scope to which class of hazard?",
    options: [
      'All workplace hazards including ergonomic and chemical',
      'Fire hazards in commercial premises only',
      'The safety of persons, livestock and property against hazards arising from the use of electricity (electric shock, fire of electrical origin, burns, mechanical movement caused by electrical energy)',
      'Cyber-security of building management systems',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 120.4 fixes the standard to electrical hazards: shock, fire of electrical origin, burns and mechanically driven injury arising from electrical energy. Trip, fall, ergonomic, chemical, mechanical-non-electrical and asbestos hazards sit outside BS 7671 and are picked up by HSWA / CDM / Workplace Regs / RRO Fire Safety Order. This boundary matters in dispute — a claim outside Reg 120.4 cannot be argued on BS 7671 grounds alone.',
  },
  {
    id: 6,
    question:
      'A subcontractor installs a feature lighting circuit but cannot deliver the Reg 411.3.4 30 mA RCD because the existing CU has no spare RCBO ways. They issue an EIC noting "departure from 411.3.4". Under Reg 120.3, is this defensible?',
    options: [
      'Yes — Reg 120.3 permits any departure provided it is noted on the cert',
      'Yes — provided the departure is also signed by the client',
      'No on its face — Reg 120.3 requires the departure to result in a degree of safety NOT LESS THAN that obtained by compliance. A missing RCD on a luminaire circuit cannot deliver equivalent shock protection without an alternative protective measure recorded',
      'No — Reg 120.3 was withdrawn in A4:2026',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 120.3 is permissive only where equivalent safety is delivered. A bare "departure from 411.3.4" with no alternative is not a Reg 120.3 departure — it is non-compliance dressed up. Defensible alternatives (e.g. a portable RCD adaptor on every plug-in maintenance task; a redesign with a new RCBO way; a CU upgrade) must be recorded with the equivalent-safety reasoning. EAWR Reg 4 does not bend to commercial constraint.',
  },
  {
    id: 7,
    question: 'Which of these is NOT in scope of BS 7671 (per Reg 110.1.3 / 110.2)?',
    options: [
      'A new domestic kitchen rewire',
      'A 22 kW EV charging post in a car park',
      'The traction power and signalling on a railway',
      'A 690 V LV motor circuit in an industrial unit',
    ],
    correctAnswer: 2,
    explanation:
      'Railway rolling stock, traction power and signalling are explicitly excluded by Reg 110.2. The remaining three are all in scope: domestic (Part 7 special locations + general regs), EV charging (Section 722) and LV industrial (Reg 110.1.1 covers up to and including 1000 V AC).',
  },
  {
    id: 8,
    question:
      'What is the practical difference between citing "BS 7671" (undated) and "BS 7671:2018+A4:2026" (dated) on a contract?',
    options: [
      'No difference — both refer to the current edition',
      'The undated form floats with editions: the contract obligation may move when a new amendment is published. The dated form pins the obligation to a specific text — which is what audit, dispute resolution and PI cover all expect',
      'The undated form is illegal under the Consumer Rights Act 2015',
      'The dated form is for export; the undated form is for UK use',
    ],
    correctAnswer: 1,
    explanation:
      'Pin the edition. An undated reference creates a moving target — when A5 is published the contract obligation may quietly move with it, and the parties may end up disputing which version of which regulation was meant. The dated form ("BS 7671:2018+A4:2026") is what JCT, NEC, PI insurers and the courts all expect to see. Use it on every cert, spec, scope of works and contract.',
  },
];

const faqs = [
  {
    question: 'If BS 7671 is non-statutory, why does my insurer still expect compliance?',
    answer:
      "Because compliance is the cheapest evidence available that you discharged your EAWR duty. PI insurers price risk on the probability that a deviation triggers a claim, not on whether BS 7671 has the force of law. A documented BS 7671 install is an underwriter's baseline — anything less is treated as elevated risk and either priced up or excluded.",
  },
  {
    question: 'Has Part P been withdrawn or weakened?',
    answer:
      'No. Part P of the Building Regulations (England and Wales) still requires reasonable provision to be made in the design and installation of electrical installations in or attached to dwellings to protect persons from fire or injury. BS 7671 compliance is the practical route to demonstrating that. Part P notification rules and the categorisation of notifiable work are unchanged by A4:2026.',
  },
  {
    question: 'Does A4:2026 force me to revisit work I certified under A2:2022 or A3:2024?',
    answer:
      'No. A4:2026 came into force on 15 April 2026. Installations designed up to and including 14 April 2026 may comply with the previous edition (A2:2022+A3:2024). The previous edition is withdrawn on 15 October 2026 — installations designed after that date must comply with A4:2026.',
  },
  {
    question:
      'How should I cite the regs in a contract or a court bundle — "BS 7671" or "BS 7671:2018+A4:2026"?',
    answer:
      'Cite the dated reference for any document that may be tested in court or audit: "BS 7671:2018+A4:2026". The undated form ("BS 7671") is acceptable in marketing or general professional context but exposes you in dispute if interpretations have moved between editions. EICs / EICRs should always carry the dated edition.',
  },
  {
    question:
      'What is the relationship between the IET Code of Practice and BS 7671 — is the Code legally binding?',
    answer:
      'Neither is statute. The IET Code of Practice (e.g. for In-Service Inspection & Testing, EV Charging Equipment Installation, Electrical Energy Storage Systems) is published guidance — it interprets and supplements BS 7671, often filling gaps where the regulations are silent. Courts and insurers treat the relevant Code as evidence of competent practice in the same way they treat BS 7671 itself: not law, but the accepted standard for discharging the EAWR / HSWA duty in that subject area. Citing the Code on a Reg 120.3 departure justification or in a Reg 133.1.3 record strengthens the audit trail.',
  },
  {
    question:
      "I'm a Competent Person Scheme member (NICEIC / NAPIT). Does CPS membership change my legal status if a job goes wrong?",
    answer:
      'It changes the route, not the destination. CPS membership lets you self-certify Part P notifiable work without involving Building Control — a contractual / regulatory shortcut. It does not insulate you from EAWR or HSWA prosecution if the install causes injury. CPS schemes assess and audit against BS 7671 compliance and will withdraw registration for repeated departures. So in practice CPS membership tightens the BS 7671 expectation, not loosens it.',
  },
  {
    question: 'Does BS 7671 cover the design of the equipment itself, or just how it is installed?',
    answer:
      "Just how it is installed and how the installation is designed around it. BS 7671 selects equipment (Reg 133) and references the BS EN product standards under which the equipment was tested (e.g. BS EN 60898 for MCBs, BS EN 61009 for RCBOs, BS EN 61851 for EV charging equipment). The product standards govern the equipment's design and conformity; BS 7671 governs the system context — selection criteria, fault loop, disconnection, protective measures, cable selection and verification.",
  },
  {
    question:
      'Where do Scotland and Wales differ from England on the legal framework around BS 7671?',
    answer:
      'EAWR 1989 and HSWA 1974 are GB-wide — the prosecutorial route is the same in England, Scotland and Wales. The Building Regulations differ. England and Wales use the Building Regulations 2010 with Approved Document P (with separate Welsh guidance since devolution). Scotland uses the Building (Scotland) Regulations 2004 and the Technical Handbooks (Section 4 Safety, particularly Standard 4.5 Electrical Safety). Northern Ireland uses the Building Regulations (NI) 2012 with Technical Booklet E. All three routes name BS 7671 (or equivalent compliance) as the practical path to satisfying the safety requirement. The cert form is the same; the notification regime differs.',
  },
  {
    question: 'How long must I keep certs and supporting evidence for an EAWR-defensible bundle?',
    answer:
      'There is no single statutory minimum, but the working answer is "the life of the installation plus the limitation period". EAWR prosecutions have been brought decades after the installation; civil claims under the Limitation Act run six years from the date of damage (or three years from knowledge in personal injury). PI insurers expect retention for at least the run-off period of the policy. Practical retention: keep EICs, EICRs, departure logs, equipment-usage records (Reg 133.1.3) and as-fitted drawings for the working life of the installation, and beyond if there is any open claim.',
  },
];

export default function BS7671Module1Section1() {
  const navigate = useNavigate();

  useSEO({
    title: 'Purpose and Legal Status of BS 7671 | BS7671:2018+A4:2026 | Module 1.1',
    description:
      'Where BS 7671:2018+A4:2026 sits in UK law — its relationship to EAWR 1989, HSWA 1974 and Building Regulations Part P, plus the A4 change to Reg 133.1.3 (equipment usage recording).',
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
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1 · Updated for A4:2026"
            title="Purpose and legal status of BS 7671"
            description="BS 7671:2018+A4:2026 is non-statutory but unavoidable. Where it sits in the UK legal stack, what changed under A4 (Reg 133.1.3), and how that lands on your certification."
            actions={
              <>
                <RegBadge>120.3</RegBadge>
                <RegBadge>120.4</RegBadge>
                <RegBadge>133.1.3</RegBadge>
                <AmendmentBadge regs={['133.1.3']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 is non-statutory — you cannot be prosecuted for breaching it directly. Its weight comes from being the accepted standard for discharging statutory duties under EAWR 1989, HSWA 1974 and Building Regulations Part P.',
              'A4:2026 (in force 15 April 2026; A3 withdrawn 15 October 2026) modifies Reg 133.1.3 — certain equipment usage decisions must now be recorded on the appropriate Part 6 certificate.',
              'Departure from BS 7671 is permissible (Reg 120.3) but shifts the burden of justification onto the designer / installer. Document the alternative and the equivalent-safety reasoning, on the cert.',
              'Existing installations remain assessed against the edition in force at the time of design — A4 does not retrospectively invalidate compliant work.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Place BS 7671 accurately within the UK legal stack — non-statutory standard sitting beneath EAWR 1989, HSWA 1974 and Building Regulations Part P.',
              'Identify the three statutory hooks (EAWR Reg 4, HSWA s.2/s.3, Part P) and explain how each treats BS 7671 as evidence rather than as the offence itself.',
              'Apply Reg 120.3 to a real departure, documenting the equivalent-safety reasoning on the certification rather than off it.',
              'Apply the A4:2026 change to Reg 133.1.3 — record certain equipment-usage decisions on the Part 6 certificate as a durable design audit trail.',
              'Reconcile the A4:2026 implementation date (15 April 2026) and A3 withdrawal (15 October 2026) with periodic-inspection scope on existing installations.',
              'Cite the dated edition ("BS 7671:2018+A4:2026") on certs, specs and contracts to remove edition ambiguity in dispute.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Where it sits in UK law</ContentEyebrow>

          <ConceptBlock
            title="Where BS 7671 actually sits in UK law"
            plainEnglish="BS 7671 is the rulebook. EAWR is the law. The rulebook is how you prove you obeyed the law."
            onSite="Cite the dated edition (BS 7671:2018+A4:2026) on every cert and contract — it is the form the courts and insurers expect."
          >
            <p>
              BS 7671:2018+A4:2026 is published jointly by the IET and BSI as a British Standard.
              That status is voluntary — there is no legal mechanism to prosecute someone for
              breaching BS 7671 in the way HSE prosecutes for breaches of the Electricity at Work
              Regulations 1989 or the Health and Safety at Work etc. Act 1974.
            </p>
            <p>
              What gives the standard its teeth is its role as the accepted benchmark for{' '}
              <em>reasonable practice</em>. EAWR <RegBadge>Reg 4</RegBadge> imposes an absolute duty
              that electrical systems be constructed, maintained and worked on so as to prevent
              danger. HSE, courts and insurers all use BS 7671 to test whether that absolute duty
              was discharged. Compliance is not a defence in itself — it is evidence.
            </p>
            <p>
              For dwellings, Building Regulations Part P (England) and equivalents in Wales and
              Scotland make compliance with BS 7671 a practical requirement for notifiable work.
              Part P is statutory; it adopts BS 7671 as the standard for satisfying the safety
              requirement.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 120.3"
            clause="Compliance with BS 7671 is recommended for the safety of persons, livestock and property. Compliance with the relevant requirements of BS 7671 is voluntary, except where required by other regulations or contractual arrangements."
            meaning="Departure is permitted, but the standard explicitly identifies itself as voluntary — leaving the legal weight to flow through the statutory regulations that adopt or reference it."
          />

          <SectionRule />

          <ContentEyebrow>What BS 7671 covers — and what it doesn&apos;t</ContentEyebrow>

          <ConceptBlock
            title="Reg 110 — the scope of BS 7671 in plain words"
            plainEnglish="BS 7671 covers fixed LV electrical installations up to 1000 V AC / 1500 V DC, plus extensions of consumer installations beyond the supply terminals. It does NOT cover the supply network itself, ships, aircraft, railway rolling stock, or non-electrical hazards."
            onSite="When a client tries to argue BS 7671 does not apply, walk Reg 110.1.1 (what is in) against Reg 110.1.3 / 110.2 (what is out). Most disputes resolve there."
          >
            <p>
              <RegBadge>Reg 110.1.1</RegBadge> sets the upper voltage envelope: BS 7671 applies to
              electrical installations at nominal voltages up to and including 1000 V AC or 1500 V
              DC. It covers the consumer&apos;s installation downstream of the supply terminals — so
              the cut-out and meter sit at the boundary, with the DNO supply network governed by the
              Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR) instead.
            </p>
            <p>
              <RegBadge>Reg 110.1.3</RegBadge> and <RegBadge>Reg 110.2</RegBadge> list the
              exclusions: equipment on board ships, mobile and fixed offshore installations,
              aircraft, hovercraft, the electrical apparatus of motor vehicles (with limited
              7XX-series exceptions), railway rolling stock and traction signalling, certain mining
              installations, lightning protection systems (which sit under BS EN 62305), and
              radio-interference equipment. Photovoltaic installations, EV charging and battery
              storage are explicitly IN scope via Sections 712, 722 and 730.
            </p>
            <p>
              <RegBadge>Reg 120.4</RegBadge> bounds what kind of harm BS 7671 is trying to prevent:
              shock, burn, fire of electrical origin and mechanical injury caused by electrical
              energy. Trip / fall / ergonomic / chemical / mechanical-non-electrical hazards sit
              elsewhere in the legal stack — typically HSWA 1974, the Workplace (Health, Safety and
              Welfare) Regulations 1992, CDM 2015 and the Regulatory Reform (Fire Safety) Order
              2005.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 110.1.1 — Scope"
            clause="The Regulations apply to the design, erection and verification of electrical installations, also additions and alterations to existing installations. The Regulations apply to circuits supplied at nominal voltages up to and including 1000 V AC or 1500 V DC."
            meaning="Two anchors in one sentence: (a) the lifecycle scope is design + erection + verification + additions / alterations — not the operating phase; (b) the voltage ceiling is 1000 V AC / 1500 V DC. Anything HV is governed by other regs."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Three statutory hooks worth knowing by name</ContentEyebrow>

          <ConceptBlock
            title="The three statutory hooks worth knowing by name"
            onSite="When a client or solicitor asks where it actually says you have to comply, name these three. None of them say BS 7671. All of them lean on it."
          >
            <p>
              <strong className="text-white">Electricity at Work Regulations 1989</strong> — the
              primary route. <RegBadge>Reg 4</RegBadge> imposes the absolute duty on systems;{' '}
              <RegBadge>Reg 14</RegBadge> requires no person to work on or near a live conductor
              unless it is unreasonable to make it dead. EAWR carries criminal sanction. BS 7671
              compliance is the standard evidence used to demonstrate due diligence.
            </p>
            <p>
              <strong className="text-white">Health and Safety at Work etc. Act 1974</strong> — s.2
              imposes the general employer duty to ensure, so far as is reasonably practicable, the
              health and safety of employees. s.3 extends it to non-employees affected by the
              undertaking. Unlike EAWR Reg 4, the SFAIRP qualifier applies — but BS 7671 still
              defines the floor of reasonably practicable.
            </p>
            <p>
              <strong className="text-white">
                Building Regulations Part P (Approved Document P)
              </strong>{' '}
              — applies to electrical work in or attached to dwellings in England. Wales has its own
              version; Scotland uses the Building Standards. Notifiable work must be either done
              under a Competent Person Scheme (NICEIC, NAPIT, ELECSA, Stroma) or notified to
              Building Control. Compliance with BS 7671 is the route to satisfying the Part P
              requirement.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Reg 120.3 — departures and the burden of justification</ContentEyebrow>

          <ConceptBlock
            title="What Reg 120.3 actually permits — and what it doesn't"
            plainEnglish="Reg 120.3 is the you-can-deviate-but clause. You can deviate from BS 7671 only if the alternative is at least as safe — and the burden of proving that sits with you, not the client."
            onSite="On the cert, a Reg 120.3 departure needs three things in writing: (1) the departure itself, (2) the alternative measure, (3) the equivalent-safety reasoning. Without all three it is not a Reg 120.3 departure — it is straight non-compliance."
          >
            <p>
              <RegBadge>Reg 120.3</RegBadge> is the bridge between the voluntary nature of BS 7671
              and the absolute duty under EAWR Reg 4. The standard explicitly contemplates that
              there will be circumstances where strict compliance is impractical or inappropriate —
              heritage buildings, retrofit constraints, novel technology, contradictory requirements
              between standards. In those cases the regulation says: depart, but only if you can
              show the result is at least as safe.
            </p>
            <p>
              The key word is <em>recorded</em>. The departure, the alternative measure adopted and
              the reasoning that establishes equivalent safety must all appear on the appropriate
              certification — typically the EIC under &quot;Departures from BS 7671&quot;. This
              creates the audit trail the next inspector, the HSE, the insurer and the court will
              all want to see. A departure that is not recorded is not a Reg 120.3 departure; it is
              non-compliance.
            </p>
            <p>
              In practice, a defensible Reg 120.3 entry reads like: &quot;Reg [X] not applied
              because [reason]. Alternative measure: [Y]. Equivalent safety established by [Z —
              calculation, reference to other standard, manufacturer&apos;s certification, risk
              assessment]. Signed [designer name + qualifications + PI insurer].&quot; That entry is
              the difference between a defensible departure and an EAWR Reg 4 case waiting to
              happen.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 120.3"
            clause="Where the use of a new material or invention leads to departures from the Regulations, the resulting degree of safety of the installation shall be not less than that obtained by compliance with the Regulations. Such use shall be recorded on the appropriate electrical certification specified in Part 6."
            meaning="Reg 120.3 explicitly extends the departure mechanism to new materials and inventions — not just heritage exceptions. The recording duty is absolute: if the cert does not carry the departure, the departure is not protected."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>What changed under A4:2026 in this section</ContentEyebrow>

          <ConceptBlock title="What changed under A4:2026 in this section">
            <p>
              A4:2026 made one substantive change to the scope-and-principles content of Part 1: Reg
              133.1.3 (Selection of equipment) was modified so that certain usage of equipment must
              now be recorded on the appropriate electrical certification specified in Part 6.
            </p>
            <p>
              That sounds administrative, but it has real teeth on a periodic inspection five years
              from now. Where a designer leans on 133.1.3 to specify equipment for a particular
              usage, the next inspector is no longer guessing why — the cert carries the record.
            </p>
            <p className="text-[13.5px] text-white/85">
              <AmendmentBadge regs={['133.1.3']} /> Reg <RegBadge>133.1.3</RegBadge> equipment-usage
              recording requirement.
            </p>
          </ConceptBlock>

          <AmendmentDiff
            regNumber="BS 7671 · 133.1.3 (Selection of equipment)"
            was="Equipment shall be selected and erected to comply with the requirements of the regulations and any relevant British Standard or Harmonised Standard. Selection logic was a design-office record only — not required on the cert."
            now="Equipment shall be selected and erected to comply with the requirements of the regulations and any relevant British Standard or Harmonised Standard, AND certain usage of equipment shall be recorded on the appropriate electrical certification specified in Part 6."
            rationale="A4 closes a traceability gap. Periodic inspections benefit from knowing the design-time selection logic so that subsequent additions, alterations and condition reports can be assessed against the original intent rather than against the inspector's assumption."
          />

          <CommonMistake
            title="Treating BS 7671 compliance as a defence rather than as evidence"
            whatHappens="A contractor produces an EIC and assumes that, because it is signed, no further legal exposure exists. When the install causes injury and HSE investigates under EAWR Reg 4, the contractor relies on the EIC alone."
            doInstead="The EIC is contemporaneous evidence — not a guarantee. Combine it with: a documented departure register (where Reg 120.3 was applied), the equipment-usage record now required by 133.1.3, photos at first-fix and second-fix, and the test-instrument record the EICR / EIC was generated from. That is the bundle that survives an EAWR investigation."
          />

          <CommonMistake
            title="Citing BS 7671 to defend a non-electrical injury"
            whatHappens="A claim is brought after a contractor leaves a tool bag in a corridor and a tenant trips. The contractor's defence cites full BS 7671 compliance on every certificate as evidence of due diligence."
            doInstead="Reg 120.4 limits BS 7671 to electrical hazards. A trip injury is a HSWA 1974 / Occupier's Liability Act / Workplace Regs question — BS 7671 is silent. Site safety, housekeeping, RAMS and CDM 2015 are the relevant frameworks. Do not over-extend BS 7671 in defence: it makes the bundle look weaker, not stronger."
          />

          <CommonMistake
            title="Citing the undated BS 7671 on a contract that gets disputed two years later"
            whatHappens="A spec or scope of works names BS 7671 with no date. By the time a dispute arises, A4 has been replaced or amended, and the parties spend three days arguing which edition was meant."
            doInstead="Always cite the dated edition — BS 7671:2018+A4:2026 — on every spec, contract, scope, departure log and cert. The dated form pins the obligation to a known text. If the contract spans an edition change, define the cut-off (e.g. design completed before 15 October 2026 may comply with A2:2022+A3:2024)."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="Domestic CU upgrade prosecuted under EAWR (not under BS 7671)"
            situation="A contractor replaces a domestic consumer unit and omits 30 mA RCD protection on the lighting circuit. Six months later, an occupant receives a shock from a metallic Class I luminaire. HSE investigates; EAWR Reg 4 prosecution follows."
            whatToDo="Use the case to recalibrate the cert-as-evidence habit. The contractor was not prosecuted for breaching BS 7671 — they were prosecuted under EAWR Reg 4 for failing to ensure the system was constructed and maintained to prevent danger. The missing 30 mA RCD on the lighting circuit (now mandatory in dwellings under A4 Reg 411.3.4) was the evidence of failure. Cert was issued; cert was wrong; cert was the smoking gun."
            whyItMatters="A4 elevates the lighting-circuit RCD from a should-consider to a normative 411.3.4 requirement in dwellings. From 15 April 2026, the same case profile becomes both an EAWR breach AND a documented BS 7671 breach — strengthening the prosecution and weakening any defence."
          />

          <Scenario
            title="Heritage commercial fit-out — a defensible Reg 120.3 departure"
            situation="A Grade II listed building is being converted to office use. The conservation officer prohibits surface conduit on a feature wall, and chasing the wall is also forbidden. The designer cannot route a CPC to a particular accessory in the strict BS 7671 manner without compromising the listing."
            whatToDo="Walk a Reg 120.3 departure properly. (1) Name the departure: CPC routing to accessory X does not follow Section 522 cable-route requirements. (2) Name the alternative: a Class II light fitting fed via a Class II cable in a Class II cable-management system, eliminating the need for the CPC at that location (Section 412 protective measure). (3) Establish equivalent safety: Class II construction is itself a recognised BS 7671 protective measure (Reg 412.1.2 with its own constraints — no socket-outlet, no user-changeable equipment), so the alternative achieves not less than the safety of the original CPC route. (4) Record on the EIC under Departures from BS 7671, signed by the designer with PI cover. (5) Brief the client and the conservation officer that the next periodic inspector will see the departure and the reasoning, removing future ambiguity."
            whyItMatters="The mistake is to skip step 3. A departure without equivalent-safety reasoning is not a Reg 120.3 departure — it is non-compliance with paperwork. Recording the alternative AND the reasoning is what makes the departure defensible under EAWR Reg 4 if anything ever goes wrong."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>When BS 7671 becomes contractually mandatory</ContentEyebrow>

          <ConceptBlock
            title="When BS 7671 becomes contractually mandatory (regardless of statute)"
            onSite="On commercial work, the contract usually pulls BS 7671 in by reference. Read the spec — non-compliance is then a contractual breach, with adjudication and damages available even where no statutory offence has occurred."
          >
            <p>
              Three routes make BS 7671 binding on a specific job even where the underlying law does
              not directly require it:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">Specification clause</strong> — most JCT, NEC and
                bespoke contracts incorporate BS 7671 by reference in the technical spec. Departure
                without a contract administrator&apos;s instruction is a breach.
              </li>
              <li>
                <strong className="text-white">Competent Person Scheme rules</strong> — NICEIC,
                NAPIT, ELECSA, Stroma all impose BS 7671 compliance as a condition of registration
                and assessment.
              </li>
              <li>
                <strong className="text-white">Insurance policy wording</strong> — most PI and
                public liability policies require compliance with applicable standards. Cover may be
                voided for non-compliant work.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Designer&apos;s quick reference</ContentEyebrow>

          <ConceptBlock
            title="The legal-status decision tree on a single page"
            plainEnglish="Walk three questions in order. (1) Is the work in scope of BS 7671? (Reg 110.1.1 / 110.1.3 / 110.2 / 120.4). (2) Which statutory hook applies — EAWR, HSWA, Part P, contract? (3) Are there departures, and is each one Reg 120.3-recorded?"
            onSite="(1) Voltage <= 1000 V AC / 1500 V DC, fixed installation, electrical hazard? In scope. Otherwise, find the right framework (ESQCR for the supply, BS EN 62305 for lightning, RRO for fire, CDM for site, HSWA for workplace generally). (2) Dwelling = Part P + EAWR. Workplace = HSWA + EAWR. Construction site = CDM + HSWA + EAWR. EV charging in dwelling = Part P + EAWR + Section 722. (3) Every departure: name it, name the alternative, establish equivalent safety, sign it on the cert."
          >
            <p>
              The decision tree resolves &gt;95% of legal-status questions in seconds. The residual
              5% are typically novel-technology cases (battery storage in unusual locations, mixed
              AC / DC microgrids, V2G EV charging) where BS 7671 is being applied by analogy and a
              Reg 120.3 departure is more or less inevitable. In those cases, involve a chartered
              engineer, get the design signed by someone with PI cover that extends to
              novel-technology work, and document the equivalent-safety reasoning with extra rigour.
              The cert is the audit trail; the audit trail is the defence.
            </p>
            <p>
              The single most common error in CPD assessments at this level is collapsing the three
              questions into one. Candidates write &quot;BS 7671 says I must&quot; when the correct
              answer is &quot;EAWR Reg 4 imposes the duty; BS 7671 is the standard evidence&quot;.
              The latter is the qualified-electrician answer. It also happens to be the answer that
              survives cross-examination.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Industry direction — what&apos;s coming next</ContentEyebrow>

          <ConceptBlock
            title="Where A5 and beyond are likely to push the legal-status conversation"
            plainEnglish="The trajectory is more record-keeping, more evidence-grade, more cert-as-audit-trail. A4 modified Reg 133.1.3; A5 is widely expected to push further into battery storage, V2G, AFDD coverage and the documentation duties that accompany them."
            onSite="Plan your cert workflows now to cope with more recordable items, not fewer. Anything that is a design choice today is a likely candidate for design choice that lands on the cert tomorrow."
          >
            <p>
              The direction of travel is set by three converging pressures. First, EAWR prosecutions
              are increasingly relying on documentary evidence rather than site-attendance
              recollection — meaning the cert and its supporting records carry more weight than they
              did a decade ago. Second, insurers are pricing PI cover on the quality of the audit
              trail, with electronic certs (with photos, GPS, time-stamps and sign-offs) attracting
              better terms than paper-only equivalents. Third, the IET / BSI joint committee that
              revises BS 7671 has signalled a move toward more traceability-driven amendments —
              A4&apos;s Reg 133.1.3 change being one example, the new Schedule columns being
              another.
            </p>
            <p>
              Practical CPD implication: invest now in a cert workflow that captures more, not less.
              Photos at first-fix and second-fix, GPS-tagged test-instrument data, electronic
              sign-off with PI-insurer-traceable identity, and a structured departure register tied
              to each cert. None of this is mandated yet at the level of the IET model forms, but
              all of it is the direction of travel and is already standard practice on regulated /
              high-value commercial work.
            </p>
            <p>
              The other shift to expect: more explicit interaction between BS 7671 and adjacent
              standards. Battery storage (BS EN IEC 62933 / IET CoP), EV charging (BS EN 61851 / IET
              CoP), PV (BS EN 61730 / Section 712), AFDD (BS EN IEC 62606) and energy efficiency
              (Chapter 81, A4) all require the designer to read across multiple standards. The cert
              of the future cites them all by their dated reference.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'BS 7671 is non-statutory; its legal weight is borrowed from EAWR 1989, HSWA 1974 and Part P. It is not a law in itself — it is the accepted standard for discharging the law.',
              'EAWR Reg 4 is the absolute-duty hook — BS 7671 compliance is the standard evidence for discharging it. There is no "reasonably practicable" qualifier on Reg 4.',
              'Reg 120.3 permits departures only where the resulting safety is not less than that of compliance — and the departure must be recorded on the cert (the cert is the audit trail).',
              'Reg 110.1.1 sets the voltage envelope (up to 1000 V AC / 1500 V DC); Reg 110.1.3 / 110.2 list exclusions (ships, aircraft, rail rolling stock, etc.); Reg 120.4 limits BS 7671 to electrical hazards only.',
              'A4:2026 came into force 15 April 2026; A3 withdrawn 15 October 2026. A4 modified Reg 133.1.3 — equipment-usage decisions now go on the Part 6 certificate as a permanent record.',
              'Cite the dated edition — "BS 7671:2018+A4:2026" — on certs, specs, scopes of works and contracts that may be tested in dispute. Undated citation is acceptable in marketing only.',
              'Three contractual routes make BS 7671 binding even when statute does not directly require it: specification clause, Competent Person Scheme rules, insurance policy wording. Read the spec.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-1-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 Scope and application
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
