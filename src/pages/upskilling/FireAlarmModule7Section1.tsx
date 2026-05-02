import { ArrowLeft, ChevronLeft, ChevronRight, Scale } from 'lucide-react';
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
    id: 'fam7-s1-rp',
    question:
      'Under the Regulatory Reform (Fire Safety) Order 2005, who is the "responsible person" in a workplace?',
    options: [
      'The Fire and Rescue Service inspecting officer.',
      'The employer, plus any other person who has control of the premises (owner, occupier, managing agent, landlord) to the extent of that control. Article 3 of the RRO names the employer first; where the premises are not a workplace or where others have control, the duty falls on whoever exercises that control. Multiple responsible persons can exist for one building, each accountable for their area of control. The duty is non-delegable in law — you can outsource the work, but not the legal accountability.',
      'The competent person who carries out the fire risk assessment.',
      'The local authority building control officer.',
    ],
    correctIndex: 1,
    explanation:
      'RRO Art 3 defines the responsible person as the employer (workplace) or, in non-workplace cases, the person with control of the premises. Liability follows control. Hiring a fire risk assessor or fire alarm contractor does not transfer the statutory duty — it remains with the responsible person.',
  },
  {
    id: 'fam7-s1-fra-record',
    question:
      'When must the significant findings of a fire risk assessment be recorded in writing?',
    options: [
      'Only in high-rise buildings.',
      'In every premises where 5 or more persons are employed, OR where the premises are subject to a licence under any enactment, OR where an alterations notice is in force. Article 9(7) RRO sets the trigger. Below 5 employees in a non-licensed, non-noticed premises, written recording is not legally compelled — but it is universal industry practice and the FRS / insurer / court will expect it. The Fire Safety Act 2021 reinforced the recording duty in multi-occupied residential blocks.',
      'Only when the FRS specifically requests it.',
      'Only after a fire has occurred.',
    ],
    correctIndex: 1,
    explanation:
      'Art 9(7) RRO triggers compulsory recording at 5+ employees / licensed premises / alterations notice. Below the threshold, recording is not legally compelled but is professionally expected. Treat written FRA as universal best practice — the cost of an unwritten FRA in a prosecution is enormous.',
  },
  {
    id: 'fam7-s1-maintain',
    question: 'Article 17 of the RRO requires fire safety equipment to be...?',
    options: [
      'Tested annually only.',
      'Subject to a suitable system of maintenance and maintained in an efficient state, in efficient working order, and in good repair. The duty is continuous, not periodic. "Efficient working order" means the equipment must do what it is designed to do, when called upon — at any moment, not only on the day of the service visit. BS 5839-1 (fire alarms), BS 5306 (extinguishers), BS 5266 (emergency lighting) are the engineering routes that satisfy this legal duty.',
      'Inspected by the FRS every six months.',
      'Replaced every five years.',
    ],
    correctIndex: 1,
    explanation:
      'Art 17 RRO is the maintenance backbone of fire safety law. The phrase "efficient working order" is continuous — equipment must work whenever needed, not only on the service day. BS 5839-1 service intervals (approximately 6 months, 5-7 month tolerance per the 2025 revision) are the technical route to legal compliance.',
  },
  {
    id: 'fam7-s1-bsa',
    question: 'A "Higher Risk Building" under the Building Safety Act 2022 is...?',
    options: [
      'Any block of flats.',
      'A building of at least 18 metres in height OR with at least 7 storeys, AND containing at least 2 residential units. The threshold was set in the Building Safety Act 2022 and the associated Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023. The regime brought in: Accountable Persons (analogue of responsible person but for occupation-stage building safety), the golden thread of digital building information, mandatory occurrence reporting to the BSR, and a much more interventionist Building Safety Regulator.',
      'Any building over 11 metres.',
      'A building used as a hospital or care home.',
    ],
    correctIndex: 1,
    explanation:
      '18 m OR 7 storeys, AND ≥ 2 residential units. The "and residential" element is critical — a 30 m office is not an HRB under the BSA regime. The HRB designation triggers Gateway 2 / 3 building control, BSR oversight, accountable person duties, golden thread record-keeping, and mandatory occurrence reporting.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the principal piece of fire safety legislation for occupied non-domestic premises in England and Wales?',
    options: [
      'The Building Regulations 2010.',
      'The Regulatory Reform (Fire Safety) Order 2005 (RRO) — in force since 1 October 2006. The RRO consolidated and replaced more than 70 earlier pieces of fire safety law (the Fire Precautions Act 1971, Workplace (HSW) regs and others). It applies to virtually all non-domestic premises in England and Wales: workplaces, common parts of HMOs and blocks of flats, places of assembly, retail, healthcare, education, hospitality. Scotland has the Fire (Scotland) Act 2005 + Fire Safety (Scotland) Regulations 2006; Northern Ireland has the Fire and Rescue Services (NI) Order 2006 + Fire Safety Regulations (NI) 2010.',
      'The Health and Safety at Work etc. Act 1974.',
      'BS 5839-1:2025.',
    ],
    correctAnswer: 1,
    explanation:
      'The RRO is the operating-stage legal framework for fire safety. Building Regulations cover construction; the RRO covers ongoing occupation. BS 5839-1 is a code of practice — not law — but is referenced as the engineering route to RRO compliance.',
  },
  {
    id: 2,
    question:
      'A "responsible person" under the RRO outsources the fire risk assessment to a fire safety consultancy. The consultancy delivers a defective FRA, missing several significant findings. A fire causes serious injury. Who carries the criminal liability?',
    options: [
      'The consultancy alone.',
      'The responsible person carries the primary statutory liability, because RRO duties are non-delegable. The consultancy may face civil claim and may be prosecuted separately if their work is grossly negligent (corporate manslaughter / gross negligence manslaughter), but the Art 9 duty to ensure a suitable and sufficient FRA remains with the responsible person. The defence "I hired a consultant" does not extinguish the duty — at most it mitigates penalty if the responsible person took reasonable steps to verify competence.',
      'Only the building owner if different from the employer.',
      'The Fire and Rescue Service for not auditing more frequently.',
    ],
    correctAnswer: 1,
    explanation:
      'RRO duties are non-delegable. Outsourcing the work does not outsource the duty. The responsible person must take reasonable steps to verify the competence of the consultant (BAFE SP205, IFE, IFSM credentials are common evidentiary markers) and review the FRA output critically. A defective FRA prosecuted under Art 32 can produce unlimited fines and custodial sentences for the responsible person.',
  },
  {
    id: 3,
    question: 'Under Article 9 RRO, when is a fire risk assessment "suitable and sufficient"?',
    options: [
      'When it identifies the fire alarm category.',
      'When it identifies the hazards present (sources of ignition, fuel, oxygen), the persons at risk (employees, visitors, vulnerable persons, sleeping risk, disabled persons), evaluates the risk and the adequacy of existing fire precautions, records significant findings (where required), and informs the action plan to reduce risk to as low as reasonably practicable. The PAS 79 series provides a recognised methodology. Article 9(3) requires the FRA to be reviewed regularly and revised if no longer valid or if there has been a significant change.',
      'When it has been signed by a chartered fire engineer.',
      'When it follows BS 5839-1.',
    ],
    correctAnswer: 1,
    explanation:
      'Art 9 sets the substantive content. PAS 79-1 (non-domestic) and PAS 79-2 (housing) are the recognised methodologies — not law, but the AHJ / insurer / court will expect one of these or equivalent. A "suitable and sufficient" FRA is hazard + persons + evaluation + action plan + review — the same structure as a HSW Act risk assessment.',
  },
  {
    id: 4,
    question: 'What did the Fire Safety Act 2021 clarify, in relation to the RRO?',
    options: [
      'It increased the maximum fine.',
      'It clarified that, in multi-occupied residential buildings, the RRO applies to (a) the structure and external walls of the building, including cladding, balconies and windows, AND (b) all doors between domestic premises and common parts (flat entrance doors). This was the post-Grenfell legislative response — pre-2021 there was legal ambiguity over whether the RRO captured external walls and flat entrance doors. The Act removed the ambiguity. The Fire Safety (England) Regulations 2022 added specific operational duties (PEEPs, secure information box, wayfinding signage, evacuation alert, fire door checks).',
      'It abolished the responsible person concept.',
      'It applied the RRO to single-family dwellings.',
    ],
    correctAnswer: 1,
    explanation:
      'Fire Safety Act 2021: external walls + flat entrance doors are unambiguously within RRO scope. Fire Safety (England) Regs 2022: monthly checks of common-parts firefighting equipment, quarterly checks of flat entrance doors in HRBs, annual checks in non-HRBs. The combined post-Grenfell regulatory uplift.',
  },
  {
    id: 5,
    question:
      'A 22 m residential building (8 storeys, 16 flats) is occupied. Which regulatory regime captures it for ongoing safety?',
    options: [
      'RRO only.',
      'BOTH the RRO (operating-stage fire safety, common parts only — flats are dwellings) AND the Building Safety Act 2022 / Higher-Risk Buildings regime (because the building is ≥ 18 m AND has ≥ 2 residential units). The Accountable Person under the BSA owes the building safety duties; the responsible person under the RRO owes the fire safety duties. In most cases these are the same legal entity (managing agent / freeholder / RTM) but the duties run in parallel under separate Acts. Mandatory occurrence reporting to the BSR applies to safety occurrences in the HRB.',
      'Building Safety Act 2022 only.',
      'Neither — it is below the 30 m threshold.',
    ],
    correctAnswer: 1,
    explanation:
      '22 m / 8 storeys / 16 flats triggers BOTH regimes. RRO + BSA run in parallel. The Accountable Person (AP) and Responsible Person (RP) are usually but not always the same legal entity. Both regimes have their own enforcement bodies (FRS for RRO; BSR for BSA) and their own offence structures.',
  },
  {
    id: 6,
    question: 'What is the maximum penalty for a serious RRO offence prosecuted on indictment?',
    options: [
      '£20,000 fine.',
      'Unlimited fine AND/OR up to 2 years imprisonment for the responsible person (or director / senior manager where corporate liability extends — RRO Art 32(1)). For the most serious cases involving deaths, corporate manslaughter (Corporate Manslaughter and Corporate Homicide Act 2007) is an additional charge route, with unlimited fines for the corporate body and personal prosecution for directors / senior managers under gross negligence manslaughter. Post-Grenfell, the prosecutorial appetite for serious fire safety failures has materially increased.',
      'Maximum £100,000 fine.',
      'A formal warning and re-inspection.',
    ],
    correctAnswer: 1,
    explanation:
      'RRO Art 32 sentencing: indictment = unlimited fine + up to 2 years custody. Corporate manslaughter is the additional route where management failures cause death. Post-Grenfell, FRS / HSE prosecutorial activity has intensified — this is no longer a "cost of doing business" risk; it is a custodial-sentence risk.',
  },
  {
    id: 7,
    question:
      'Article 17 RRO requires a "suitable system of maintenance" for fire safety equipment. How does BS 5839-1:2025 satisfy this duty for a fire alarm system?',
    options: [
      'By specifying annual testing only.',
      'By prescribing weekly user tests of one MCP per week, monthly user checks where standby supplies are used, and competent-person service / inspection visits at intervals of approximately six months — with the 2025 revision giving an explicit 5-to-7-month tolerance window. The cumulative effect of these activities is a "system of maintenance" satisfying RRO Art 17. BS 5839-1 is the technical route; RRO Art 17 is the legal duty. Failing to keep to the schedule is a BS 5839-1 non-compliance AND an RRO breach.',
      'By requiring replacement of the panel every 10 years.',
      'By requiring CCTV monitoring of the panel.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1:2025 Cl 43.2.1 — service intervals approximately 6 months, with a 5-7 month tolerance window. Plus weekly MCP tests, monthly standby checks where applicable. Together this is the "system of maintenance" the RRO demands. The 2025 tolerance window is a clarification, not a relaxation — sliding outside 5-7 months is non-compliant.',
  },
  {
    id: 8,
    question: 'How does the Fire and Rescue Services Act 2004 interact with the RRO?',
    options: [
      'It supersedes the RRO.',
      'The FRSA 2004 establishes the Fire and Rescue Authority (FRA) for each area and gives the FRA the power to enforce the RRO via inspections, alterations notices, enforcement notices, and prohibition notices, as well as the power to prosecute. The FRA / FRS is the principal enforcing authority for the RRO in most premises, though for a small set of premises (construction sites, certain Crown premises, ships in build) the HSE is the enforcing authority. The Building Safety Regulator is the enforcing authority for the BSA in HRBs.',
      'It applies only to the FRS itself.',
      'It is now repealed.',
    ],
    correctAnswer: 1,
    explanation:
      'FRSA 2004 + RRO together form the enforcement architecture. FRSA establishes the authorities; RRO sets the duties; the authority enforces. Inspections, audits, alterations / enforcement / prohibition notices are the four formal tools. Prohibition notice can close a premises immediately if there is risk to life — no appeal pause.',
  },
  {
    id: 9,
    question:
      'Under the Fire Safety (England) Regulations 2022, an HRB managing agent must report which kinds of safety occurrences to the BSR?',
    options: [
      'Only fires that cause injury.',
      'Structural failures and fire safety failures that meet the mandatory occurrence reporting (MOR) thresholds in the regulations: fires; spread of fire / smoke beyond intended compartmentation; failures of structural components; failures of fire-stopping; significant degradation of fire doors; failures of ventilation systems. Thresholds are intentionally low — the regime is designed to surface near-misses and emerging defects, not just the catastrophic. Reports go to the BSR through the prescribed digital portal. Failure to report is itself an offence.',
      'Annual statistics only.',
      'Quarterly health and safety reports.',
    ],
    correctAnswer: 1,
    explanation:
      'Mandatory Occurrence Reporting (MOR) under the BSA / HRB regs is a near-miss reporting regime, deliberately low-threshold, designed to capture emerging building safety issues across the HRB stock before they become catastrophic. The Building Safety Regulator analyses the reports and feeds back into sector-wide guidance.',
  },
  {
    id: 10,
    question:
      'Why does a fire alarm contractor need a working knowledge of the RRO, the Fire Safety Act, and the Building Safety Act, even though they are "the electrician"?',
    options: [
      'Curiosity.',
      'Because the design, installation, commissioning and maintenance choices the contractor makes are the operational mechanism by which the responsible person discharges legal duties under those Acts. A fire alarm category mismatched to the use of the building puts the responsible person in breach of RRO Art 14 (escape routes / detection); a missed monthly test puts them in breach of Art 17; a faulty cause-and-effect handed over without explanation puts them in breach of Art 38 (information). The contractor is the technical route to legal compliance; ignorance of the legal end-state is a professional failure that can leave the contractor exposed to civil claim, regulatory action, or criminal prosecution as a contributory party.',
      'Marketing.',
      'It is required by BS 7671.',
    ],
    correctAnswer: 1,
    explanation:
      'The contractor is the legal compliance mechanism. A wrongly-specified system, a missed service visit, a botched commissioning, a defective handover — each translates into a legal breach by the client. The contractor who understands the legal architecture protects the client AND protects themselves from contributory liability.',
  },
];

const FireAlarmModule7Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Fire safety legislation | Fire Alarm Module 7.1 | Elec-Mate',
    description:
      'The Regulatory Reform (Fire Safety) Order 2005, the Fire Safety Act 2021, the Building Safety Act 2022 and the Fire and Rescue Services Act 2004 — the legal architecture every fire alarm engineer must work inside.',
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
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1"
            title="Fire safety legislation"
            description="The Regulatory Reform (Fire Safety) Order 2005 is the day-to-day operating law for fire safety in non-domestic premises. The Fire Safety Act 2021 closed the post-Grenfell ambiguities. The Building Safety Act 2022 created a parallel regime for higher-risk buildings. The fire alarm engineer is the technical route by which clients discharge these legal duties — knowing the law is part of the job."
            tone="yellow"
          />

          <TLDR
            points={[
              'RRO 2005 is the principal fire safety law for non-domestic premises in England and Wales (in force 1 October 2006). Equivalents in Scotland and Northern Ireland.',
              'The "responsible person" (RRO Art 3) — usually the employer / occupier / owner — owes the legal duties. Duties are non-delegable; outsourcing the work does not outsource the duty.',
              'Fire risk assessment (RRO Art 9) — significant findings recorded in writing where 5+ employees, licensed premises, or alterations notice in force.',
              'Fire safety equipment maintenance (RRO Art 17) — kept in efficient working order; BS 5839-1 service regime is the technical route to compliance.',
              'Fire Safety Act 2021 — clarified RRO captures external walls and flat entrance doors in multi-occupied residential premises (post-Grenfell).',
              'Building Safety Act 2022 — Higher Risk Buildings (≥ 18 m OR ≥ 7 storeys, AND ≥ 2 residential units): Accountable Person regime, golden thread, mandatory occurrence reporting, BSR oversight.',
              'Penalties — RRO Art 32: unlimited fines + up to 2 years custody. Plus corporate manslaughter exposure where management failures cause death.',
              'Enforcement — Fire and Rescue Service (under FRSA 2004) is the principal enforcer of the RRO. HSE for some specialised premises. BSR for HRBs under the BSA.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the Regulatory Reform (Fire Safety) Order 2005 as the principal operating-stage fire safety law and place it in the legislative timeline (Fire Precautions Act 1971 → RRO 2005 → Fire Safety Act 2021 → Building Safety Act 2022)',
              'Explain who the "responsible person" is under RRO Art 3 and why the duty is non-delegable',
              'Apply the RRO Art 9 fire risk assessment duty: hazard / persons / evaluation / action / review, with written recording above the 5-employee / licensed / alterations-notice threshold',
              'Apply RRO Art 17 maintenance duty by reference to BS 5839-1 service intervals and weekly / monthly checks',
              'Identify the Fire Safety Act 2021 clarification (external walls + flat entrance doors) and the Fire Safety (England) Regulations 2022 operational duties',
              'Identify the Higher Risk Building threshold under the Building Safety Act 2022 (≥ 18 m / ≥ 7 storeys, ≥ 2 residential units) and the Accountable Person regime',
              'Recognise the prosecution chain (FRS audit → notices → prosecution → unlimited fine + custody / corporate manslaughter) and why it matters to the contractor',
              'Explain why the fire alarm contractor sits inside the legal compliance mechanism — design / install / commission / maintain choices translate directly into RRO compliance or breach',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The legislative architecture</ContentEyebrow>

          <ConceptBlock
            title="Why fire safety law is layered"
            plainEnglish="Fire safety law in the UK has accreted in layers, each addressing a gap exposed by an earlier disaster. The Fire Precautions Act 1971 came after the Henderson's Stores fire (Liverpool, 1960) and Top Storey Club fire (Bolton, 1961). The Fire Safety (Workplace) Regulations 1997 came as part of the EU Workplace Directive transposition. The RRO 2005 consolidated the patchwork into a single risk-based instrument. The Fire Safety Act 2021 and Building Safety Act 2022 came after Grenfell (2017). Each layer remains important; understanding why each exists tells you what failure mode it addresses."
            onSite="When a client says 'we comply with fire safety law', the question is which Acts they are pointing at. RRO is the day-to-day operating law for non-domestic premises. Building Regulations is the construction-stage law. Building Safety Act is the parallel HRB regime. Fire Safety Act is the post-Grenfell clarifying instrument."
          >
            <p>The principal statutory instruments active today, England and Wales:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Regulatory Reform (Fire Safety) Order 2005 (RRO).</strong> The
                operating-stage fire safety law for almost all non-domestic premises. Applies to
                workplaces, common parts of HMOs and blocks of flats, places of assembly, retail,
                hospitality, healthcare, education. Came into force 1 October 2006. Consolidated and
                repealed more than 70 earlier instruments including the Fire Precautions Act 1971.
              </li>
              <li>
                <strong>Fire Safety Act 2021.</strong> Amends the RRO. Confirms that, in
                multi-occupied residential buildings, the RRO captures the structure and external
                walls (cladding, balconies, windows) AND all doors between domestic premises and
                common parts (flat entrance doors). Removed the post-Grenfell legal ambiguity.
              </li>
              <li>
                <strong>Fire Safety (England) Regulations 2022.</strong> Made under the RRO as
                amended by the Fire Safety Act 2021. Imposes specific operational duties on
                responsible persons of multi-occupied residential buildings: monthly checks of
                firefighting equipment in common parts, quarterly checks of flat entrance doors in
                HRBs, annual checks in non-HRBs, secure information box, wayfinding signage,
                evacuation alert systems where required.
              </li>
              <li>
                <strong>Building Safety Act 2022.</strong> Parallel regime for Higher Risk Buildings
                (≥ 18 m OR ≥ 7 storeys, AND ≥ 2 residential units). Establishes the Building Safety
                Regulator (BSR), Accountable Persons, the Principal Accountable Person, the golden
                thread of digital information, mandatory occurrence reporting, and the gateway
                regime for HRB design and construction.
              </li>
              <li>
                <strong>Fire and Rescue Services Act 2004.</strong> Establishes the Fire and Rescue
                Authorities and gives them their statutory functions: firefighting, rescue, fire
                safety and enforcement. The FRA is the principal enforcing authority for the RRO.
              </li>
              <li>
                <strong>Building Regulations 2010 (and Approved Document B).</strong>{' '}
                Construction-stage law. Functional requirements B1-B5 cover means of warning /
                escape, internal fire spread, external fire spread, structural stability, FRS
                access. Approved Document B is the route to compliance. Detailed in §2.
              </li>
              <li>
                <strong>Health and Safety at Work etc. Act 1974.</strong> Underlying duty on
                employers to provide a safe workplace. The RRO is more specific for fire; the HSWA
                underlies it and applies broadly.
              </li>
            </ul>
            <p>
              Scotland and Northern Ireland have their own equivalents (Fire (Scotland) Act 2005,
              Fire and Rescue Services (NI) Order 2006) — substantively similar in approach but
              distinct in detail. A contractor working across the UK must check jurisdiction.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 3 (Meaning of 'responsible person')"
            clause={
              <>
                In this Order "responsible person" means — (a) in relation to a workplace, the
                employer, if the workplace is to any extent under his control; (b) in relation to
                any premises not falling within paragraph (a) — (i) the person who has control of
                the premises (as occupier or otherwise) in connection with the carrying on by him of
                a trade, business or other undertaking (for profit or not); or (ii) the owner, where
                the person in control of the premises does not have control in connection with the
                carrying on by that person of a trade, business or other undertaking.
              </>
            }
            meaning="Liability follows control. The employer owes the duty in workplaces; the person with control owes it everywhere else; the owner owes it where no one else has trade-or-business control. Multiple responsible persons can co-exist in one building (building owner + each tenant employer in a multi-let office). Each is responsible for their area of control. The duty is non-delegable — outsourcing the work to a fire risk assessor or fire alarm contractor does not transfer the legal accountability."
          />

          <SectionRule />

          <ContentEyebrow>The responsible person and the FRA duty</ContentEyebrow>

          <ConceptBlock
            title="What the responsible person actually has to do"
            plainEnglish="The RRO sets out a structured duty cycle. The responsible person must (a) carry out a fire risk assessment, (b) record significant findings where the threshold is met, (c) implement the action plan that flows from the FRA, (d) maintain fire safety equipment in efficient working order, (e) train staff, (f) keep the FRA under review and revise it where it becomes invalid or there is significant change, and (g) cooperate with the enforcing authority. Each of these is a specific Article of the RRO."
            onSite="When you walk into a client's site, the responsible person's compliance posture is visible in artefacts: a current written FRA, an action plan with closed actions, a logbook with weekly tests recorded, a service certificate from a competent maintainer, training records. Missing any of these is a compliance gap."
          >
            <p>The Articles in working order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Art 8</strong> — General fire precautions duty. Reduce the risk of fire and
                ensure means of escape can be safely and effectively used.
              </li>
              <li>
                <strong>Art 9</strong> — Fire risk assessment duty. Suitable and sufficient
                assessment of risks to relevant persons. Record significant findings in writing
                where 5+ employees / licensed / alterations notice in force. Review when no longer
                valid or when there has been a significant change.
              </li>
              <li>
                <strong>Art 10-12</strong> — Principles of prevention, fire safety arrangements,
                eliminate / reduce risks from dangerous substances.
              </li>
              <li>
                <strong>Art 13</strong> — Firefighting and fire detection. Ensure premises are
                equipped with appropriate firefighting equipment AND with fire detectors and alarms
                where necessary. (This is the legal basis for the fire alarm system itself.)
              </li>
              <li>
                <strong>Art 14</strong> — Emergency routes and exits. Means of escape kept clear,
                signed, illuminated.
              </li>
              <li>
                <strong>Art 17</strong> — Maintenance. Premises and any equipment provided in
                respect of those premises subject to a suitable system of maintenance and maintained
                in an efficient state, in efficient working order, and in good repair.
              </li>
              <li>
                <strong>Art 18</strong> — Safety assistance. Appoint one or more competent persons
                to assist in undertaking the preventive and protective measures.
              </li>
              <li>
                <strong>Art 19-21</strong> — Information / training duties to employees.
              </li>
              <li>
                <strong>Art 22</strong> — Cooperation and coordination where multiple responsible
                persons share premises.
              </li>
              <li>
                <strong>Art 38</strong> — Maintenance of measures provided for the protection of
                firefighters. Information must be supplied to ensure ongoing safe firefighting.
              </li>
            </ul>
            <p>
              For a fire alarm contractor, Articles 13, 17, 18, 19, 38 are the most operationally
              relevant. A defective fire alarm at handover puts the responsible person in breach of
              Art 13. A missed service visit puts them in breach of Art 17. A failure to brief the
              user on cause-and-effect at handover puts them in breach of Art 38 / 19. Each of these
              is a foreseeable outcome of contractor work — and the contractor who understands them
              protects the client and protects themselves.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 9 (Risk assessment)"
            clause={
              <>
                The responsible person must make a suitable and sufficient assessment of the risks
                to which relevant persons are exposed for the purpose of identifying the general
                fire precautions he needs to take to comply with the requirements and prohibitions
                imposed on him by or under this Order. Any such assessment must be reviewed by the
                responsible person regularly so as to keep it up to date and particularly if (a)
                there is reason to suspect that it is no longer valid; or (b) there has been a
                significant change in the matters to which it relates including when the premises,
                special, technical and organisational measures, or organisation of the work undergo
                significant changes, extensions, or conversions.
              </>
            }
            meaning='"Suitable and sufficient" — the assessment must identify the hazards present, the persons at risk, the existing precautions and their adequacy, and the further measures needed. The PAS 79 series is the recognised methodology. "Reviewed regularly" — there is no fixed period; the trigger is invalidation or significant change. In practice, annual review is industry norm with re-assessment on building / use change.'
          />

          <ConceptBlock
            title="Recording the FRA — the 5-employee threshold and beyond"
            plainEnglish="Article 9(7) RRO requires significant findings of the FRA to be recorded in writing where (a) the responsible person employs 5 or more persons, OR (b) a licence under any enactment is in force in respect of the premises (e.g. licensed premises under the Licensing Act 2003), OR (c) an alterations notice is in force. Below these thresholds, written recording is not legally compelled. But — and this is critical — every credible fire safety practitioner, every insurer, every Fire and Rescue Service, and every court will expect to see a written FRA regardless. Treat written FRA as universal practice."
          >
            <p>What the written FRA records, in working practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Hazards.</strong> Sources of ignition (electrical, hot work, smoking,
                arson), fuel (combustible materials, flammable liquids, gases), oxygen (storage,
                ventilation).
              </li>
              <li>
                <strong>Persons at risk.</strong> Employees, visitors, customers, contractors,
                sleeping risk (residential, hotel, care, hospital), disabled persons (mobility,
                sensory, cognitive), young persons, lone workers, isolated workers.
              </li>
              <li>
                <strong>Evaluation.</strong> The likelihood of fire occurring × the consequence if
                it does. Existing precautions assessed for adequacy: detection, alarm, escape
                routes, signage, lighting, firefighting equipment, compartmentation, fire
                procedures, training.
              </li>
              <li>
                <strong>Significant findings.</strong> The risks that the assessment finds to be
                material — these MUST be recorded where the threshold is met.
              </li>
              <li>
                <strong>Action plan.</strong> Specific, time-bound actions to address findings.
                "Reduce risk to as low as reasonably practicable" is the standard.
              </li>
              <li>
                <strong>Persons especially at risk.</strong> Disabled persons (PEEPs — Personal
                Emergency Evacuation Plans), lone workers, sleeping risk.
              </li>
              <li>
                <strong>Review history.</strong> When the FRA was last reviewed, what changed, what
                was revised.
              </li>
            </ul>
            <p>
              PAS 79-1 (non-domestic) and PAS 79-2 (housing — common parts of multi-occupied
              residential buildings) are the methodologies most widely used. They are not law, but
              they are the de facto standard expected by the FRS, by insurers and by courts as
              evidence of "suitable and sufficient".
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Diagram — RRO duty chain</ContentEyebrow>

          {/* RRO duty chain diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Responsible person → FRA → maintenance → enforcement
            </h4>
            <svg
              viewBox="0 0 880 460"
              className="w-full h-auto"
              role="img"
              aria-label="RRO duty chain. Premises occupation triggers responsible person identification, who must commission a fire risk assessment, generate an action plan, implement and maintain fire safety measures, and submit to FRS audit / enforcement. Failure at any stage triggers notices and prosecution."
            >
              {/* Stage 1 — Premises */}
              <g>
                <rect
                  x="20"
                  y="40"
                  width="170"
                  height="80"
                  rx="10"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="2"
                />
                <text
                  x="105"
                  y="68"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STAGE 1
                </text>
                <text
                  x="105"
                  y="86"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Non-domestic
                </text>
                <text
                  x="105"
                  y="100"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  premises
                </text>
                <text
                  x="105"
                  y="114"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  RRO Art 1 scope
                </text>
              </g>

              {/* Arrow 1 */}
              <line
                x1="195"
                y1="80"
                x2="225"
                y2="80"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <polygon points="225,80 217,76 217,84" fill="rgba(255,255,255,0.4)" />

              {/* Stage 2 — Responsible person */}
              <g>
                <rect
                  x="230"
                  y="40"
                  width="170"
                  height="80"
                  rx="10"
                  fill="rgba(168,85,247,0.10)"
                  stroke="#A855F7"
                  strokeWidth="2"
                />
                <text
                  x="315"
                  y="68"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STAGE 2
                </text>
                <text
                  x="315"
                  y="86"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Responsible
                </text>
                <text
                  x="315"
                  y="100"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  person
                </text>
                <text
                  x="315"
                  y="114"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  RRO Art 3
                </text>
              </g>

              {/* Arrow 2 */}
              <line
                x1="405"
                y1="80"
                x2="435"
                y2="80"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <polygon points="435,80 427,76 427,84" fill="rgba(255,255,255,0.4)" />

              {/* Stage 3 — FRA */}
              <g>
                <rect
                  x="440"
                  y="40"
                  width="170"
                  height="80"
                  rx="10"
                  fill="rgba(34,211,238,0.10)"
                  stroke="#22D3EE"
                  strokeWidth="2"
                />
                <text
                  x="525"
                  y="68"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STAGE 3
                </text>
                <text
                  x="525"
                  y="86"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Fire risk
                </text>
                <text
                  x="525"
                  y="100"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  assessment
                </text>
                <text
                  x="525"
                  y="114"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  RRO Art 9
                </text>
              </g>

              {/* Arrow 3 */}
              <line
                x1="615"
                y1="80"
                x2="645"
                y2="80"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <polygon points="645,80 637,76 637,84" fill="rgba(255,255,255,0.4)" />

              {/* Stage 4 — Action plan + measures */}
              <g>
                <rect
                  x="650"
                  y="40"
                  width="200"
                  height="80"
                  rx="10"
                  fill="rgba(16,185,129,0.10)"
                  stroke="#10B981"
                  strokeWidth="2"
                />
                <text
                  x="750"
                  y="68"
                  textAnchor="middle"
                  fill="#10B981"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STAGE 4
                </text>
                <text
                  x="750"
                  y="86"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Action plan +
                </text>
                <text
                  x="750"
                  y="100"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  fire alarm / measures
                </text>
                <text
                  x="750"
                  y="114"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  RRO Art 13, 14
                </text>
              </g>

              {/* Down arrow from stage 4 */}
              <line
                x1="750"
                y1="125"
                x2="750"
                y2="160"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <polygon points="750,160 746,152 754,152" fill="rgba(255,255,255,0.4)" />

              {/* Stage 5 — Maintenance */}
              <g>
                <rect
                  x="650"
                  y="170"
                  width="200"
                  height="80"
                  rx="10"
                  fill="rgba(59,130,246,0.10)"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                <text
                  x="750"
                  y="198"
                  textAnchor="middle"
                  fill="#3B82F6"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STAGE 5
                </text>
                <text
                  x="750"
                  y="216"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Maintenance
                </text>
                <text
                  x="750"
                  y="230"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  (BS 5839-1 service)
                </text>
                <text
                  x="750"
                  y="244"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  RRO Art 17
                </text>
              </g>

              {/* Left arrow from stage 5 */}
              <line
                x1="645"
                y1="210"
                x2="615"
                y2="210"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <polygon points="615,210 623,206 623,214" fill="rgba(255,255,255,0.4)" />

              {/* Stage 6 — Review */}
              <g>
                <rect
                  x="440"
                  y="170"
                  width="170"
                  height="80"
                  rx="10"
                  fill="rgba(34,211,238,0.10)"
                  stroke="#22D3EE"
                  strokeWidth="2"
                />
                <text
                  x="525"
                  y="198"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STAGE 6
                </text>
                <text
                  x="525"
                  y="216"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  FRA review
                </text>
                <text
                  x="525"
                  y="230"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  (annual / change)
                </text>
                <text
                  x="525"
                  y="244"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  RRO Art 9(3)
                </text>
              </g>

              {/* Loop back to stage 3 */}
              <path
                d="M 525 170 Q 525 145 525 130"
                fill="none"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1.6"
                strokeDasharray="4,3"
              />
              <polygon points="525,130 521,138 529,138" fill="rgba(34,211,238,0.4)" />
              <text x="540" y="155" fill="rgba(34,211,238,0.7)" fontSize="9">
                cycle
              </text>

              {/* Enforcement branch — bottom row */}
              <g>
                <rect
                  x="20"
                  y="290"
                  width="830"
                  height="60"
                  rx="10"
                  fill="rgba(239,68,68,0.06)"
                  stroke="rgba(239,68,68,0.4)"
                  strokeWidth="1.6"
                />
                <text x="40" y="312" fill="#EF4444" fontSize="11" fontWeight="bold">
                  ⚠ ENFORCEMENT — Fire and Rescue Service (FRSA 2004) audit and prosecution
                </text>
                <text x="40" y="330" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                  Audit → Alterations notice → Enforcement notice → Prohibition notice → Prosecution
                  (RRO Art 32)
                </text>
                <text x="40" y="344" fill="rgba(255,255,255,0.6)" fontSize="9">
                  On indictment: unlimited fine + up to 2 years custody. Corporate manslaughter
                  where deaths from management failure.
                </text>
              </g>

              {/* Vertical connectors from main row to enforcement strip */}
              <line
                x1="105"
                y1="290"
                x2="105"
                y2="125"
                stroke="rgba(239,68,68,0.25)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <line
                x1="315"
                y1="290"
                x2="315"
                y2="125"
                stroke="rgba(239,68,68,0.25)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <line
                x1="525"
                y1="290"
                x2="525"
                y2="255"
                stroke="rgba(239,68,68,0.25)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <line
                x1="750"
                y1="290"
                x2="750"
                y2="255"
                stroke="rgba(239,68,68,0.25)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />

              {/* Caption strip */}
              <g>
                <rect
                  x="20"
                  y="380"
                  width="830"
                  height="60"
                  rx="10"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.4"
                />
                <text x="40" y="402" fill="white" fontSize="11" fontWeight="bold">
                  Where the contractor sits
                </text>
                <text x="40" y="420" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                  The fire alarm contractor's design / install / commission / maintain decisions ARE
                  the technical mechanism by which
                </text>
                <text x="40" y="433" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                  the responsible person discharges Art 13 (detection / alarm), Art 17
                  (maintenance), Art 38 (firefighter information).
                </text>
              </g>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The maintenance duty (Art 17) — fire alarm route</ContentEyebrow>

          <ConceptBlock
            title="Art 17 in operational terms"
            plainEnglish="Article 17 RRO is the legal hook for ongoing fire alarm maintenance. The duty is continuous: equipment must be in efficient working order at all times. The phrase 'suitable system of maintenance' allows the responsible person to follow a recognised technical regime — for fire alarms, that regime is BS 5839-1. The 2025 revision sharpened the service-interval phrasing: approximately six months between visits, with an explicit five-to-seven month tolerance window. Sliding outside that window is a BS 5839-1 non-compliance AND, by extension, an Art 17 breach."
            onSite="Look for the logbook on every visit. Weekly user tests recorded? Monthly checks where applicable? Service certificates filed? Date of last service within tolerance? Outstanding fault entries with closure dates? A clean logbook is the single most powerful piece of legal-compliance evidence the responsible person can hold."
          >
            <p>The BS 5839-1:2025 maintenance regime, in working order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Daily.</strong> Visual check of the CIE (Control and Indicating Equipment) —
                normal supply on, no fault indicators, no disablement indicators. Recorded by user.
              </li>
              <li>
                <strong>Weekly.</strong> Operate one MCP, rotating around the building so that all
                MCPs are tested at intervals not exceeding the relevant period. Audible across the
                premises. Recorded in the logbook.
              </li>
              <li>
                <strong>Monthly.</strong> Where standby supplies (e.g. generator) are used, exercise
                them.
              </li>
              <li>
                <strong>Approximately every 6 months (5-7 month tolerance).</strong>{' '}
                Competent-person inspection and service visit. Includes battery condition check,
                alarm-receiving centre signal verification, function tests of detectors and sounders
                on a rolling basis (typically 25% per visit so all devices are tested across a
                12-month cycle).
              </li>
              <li>
                <strong>Annually.</strong> Cumulative effect of the two semi-annual visits — every
                detector and every device tested across the year. Plus zone-plan verification,
                ducted detector function test (newly added in 2025), text descriptor verification.
              </li>
              <li>
                <strong>Every 5 years (suggested).</strong> Verify text descriptors on addressable
                systems (responsibility of premises management to inform the servicing organisation
                of changes; periodic verification is prudent).
              </li>
              <li>
                <strong>Battery replacement.</strong> Per manufacturer specification — typically 4-5
                years for sealed lead-acid panel standby.
              </li>
            </ul>
            <p>
              Each of these activities, captured in a logbook with dates, signatures and findings,
              is the evidence of "efficient working order". A missing weekly test entry is a small
              gap; a missing service certificate is a large one; a system out of service for more
              than the documented "permissible disablement" period is an Art 17 breach.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 17 (Maintenance)"
            clause={
              <>
                Where necessary in order to safeguard the safety of relevant persons the responsible
                person must ensure that the premises and any facilities, equipment and devices
                provided in respect of the premises under this Order or, subject to paragraph (6),
                under any other enactment, including any enactment repealed or revoked by this
                Order, are subject to a suitable system of maintenance and are maintained in an
                efficient state, in efficient working order and in good repair.
              </>
            }
            meaning='Three phrases earn close reading. "Suitable system of maintenance" — a recognised technical regime such as BS 5839-1. "Efficient state, in efficient working order, in good repair" — three overlapping requirements that together demand the equipment do its job whenever called upon. "At all times" is implied — there is no carve-out for "between service visits". A fault left unattended is an Art 17 breach in the running.'
          />

          <RegsCallout
            source="BS 5839-1:2025 · Clause 43.2.1 (Routine inspection and servicing)"
            clause={
              <>
                The recommendations in this subclause should be carried out by a competent person
                (see 3.13). Successive inspection and servicing visits should be undertaken at
                intervals of approximately 6 months (see Note 1). NOTE 1: It would be acceptable for
                one inspection, test and service of the system to be carried out any time between 5
                months and 7 months after the previous inspection, test and service. NOTE 2: The
                date of acceptance is to be regarded as the datum for these periods.
              </>
            }
            meaning='The 2025 revision replaces the harsher 2017 wording ("should not exceed six months") with an explicit 5-7 month tolerance window — but retains the underlying six-month rhythm. The date of acceptance is the datum: a system commissioned on 12 March 2026 must have its first service between 12 August and 12 October 2026. Sliding outside the window is non-compliant. The window is a tolerance, not a relaxation.'
          />

          <CommonMistake
            title="Treating the FRA as a one-off document"
            whatHappens="The responsible person commissions an FRA at year zero, files it, and never reviews it. Three years later: the building has been re-partitioned, a new use has been added (sleeping accommodation in part of the ground floor), staff numbers have doubled. The FRA still describes the year-zero building. The fire alarm system, sized for year zero, no longer matches the real-world risk. An FRS audit picks this up — Art 9(3) breach (failure to review). An enforcement notice follows; in serious cases, prosecution."
            doInstead="Treat the FRA as a living document. Review at least annually as a discipline (the RRO does not require annual review explicitly, but industry norm is annual). Re-review whenever there is a significant change — re-partition, change of use, new equipment, change of occupancy, alteration to escape routes, change of staff complement, an actual fire or near-miss. Date and sign every review. The review record is the audit-time evidence."
          />

          <CommonMistake
            title="Confusing 'no record required' below the 5-employee threshold with 'no FRA required'"
            whatHappens="A small business with 4 employees is told that, because it is below the Art 9(7) recording threshold, no written FRA is required. The owner takes that to mean no FRA is required at all. After a fire, the FRS asks for the FRA. There is none. Prosecution follows — not for the absence of writing, but for the absence of any 'suitable and sufficient' assessment under Art 9(1)."
            doInstead="Art 9(1) (the duty to assess) applies to ALL responsible persons regardless of size. Art 9(7) (the duty to record in writing) has the 5-employee / licensed / alterations-notice threshold. Sub-threshold premises must still carry out the assessment; they are simply not legally compelled to write it down. Industry practice: write it down anyway. The cost of writing is small; the cost of not having one in court is large."
          />

          <Scenario
            title="The single-let restaurant on a 12-year lease"
            situation="A fire alarm contractor is engaged to install a Cat L2 system in a 220-cover restaurant. The premises lease names the operating company as tenant; the building is owned by a property investment vehicle. There are 18 staff. The kitchen is leased back to a separate catering operation with 6 staff under a sub-let. Who is the responsible person, and what does the contractor need to confirm before commissioning?"
            whatToDo="There are likely two or more responsible persons here. The restaurant operating company is RP for the front-of-house workplace (employer with control). The catering operation is RP for the kitchen (employer with control of that area). The building owner may have residual RP duties for the structure / common parts depending on the lease terms. RRO Art 22 requires cooperation and coordination between multiple RPs. The contractor confirms: (a) which legal entity has commissioned the work, (b) whether the FRA has been carried out and identifies the appropriate fire alarm category and design, (c) whether the system covers the kitchen leased to the catering operation and whether that operation has been consulted, (d) who will hold the logbook and who will arrange ongoing service. Without (a)-(d) clarified, the contractor risks installing a system that does not cleanly match anyone's compliance posture."
            whyItMatters="Multi-occupier premises are common — high streets, retail parks, business parks, multi-let offices, mixed-use schemes. RRO Art 22 imposes coordination duties but does not specify who pays for what; that falls to the lease and the contracts. The contractor who clarifies the duty-holder structure at quotation stage is the contractor who avoids being the meat in the sandwich after a fire."
          />

          <SectionRule />

          <ContentEyebrow>
            Post-Grenfell — Fire Safety Act 2021 + Building Safety Act 2022
          </ContentEyebrow>

          <ConceptBlock
            title="Why two new Acts in five years"
            plainEnglish="Grenfell (14 June 2017, 72 deaths) exposed structural failures in the regulatory regime that pre-dated it. The Hackitt review, published in May 2018, recommended a comprehensive overhaul. The Fire Safety Act 2021 was the immediate clarifying response: it confirmed that the RRO captured external walls and flat entrance doors in multi-occupied residential buildings — a question the regulator and the courts had been struggling with. The Building Safety Act 2022 was the larger structural response: it created an entirely new safety regime for higher-risk buildings, with a new regulator (the BSR), new duty holders (Accountable Persons), and a new emphasis on digital record-keeping (the golden thread)."
            onSite="If you are working on a residential building, you need to know whether it is an HRB. The threshold is 18 m OR 7 storeys, AND ≥ 2 residential units. Ask. The answer changes the regulatory regime, the duty holder identification, the design / construction route (Gateway 2 / 3 BSR approval for HRBs), and the operational duties post-handover."
          >
            <p>The Fire Safety Act 2021 — what it changed:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Confirmed RRO scope explicitly extends to: (a) the building's structure and external
                walls, including anything attached such as cladding, balconies and windows; (b) all
                doors between domestic premises and common parts (i.e. flat entrance doors).
              </li>
              <li>
                Empowered the Secretary of State to make regulations imposing further specific
                duties. Those regulations are the Fire Safety (England) Regulations 2022.
              </li>
            </ul>
            <p>The Fire Safety (England) Regulations 2022 — what it imposed:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>All multi-occupied residential buildings.</strong> Wayfinding signage in
                low-light conditions; instructions to residents on how to report fires; annual
                checks of flat entrance doors (or quarterly in HRBs); monthly checks of the
                operation of lifts, evacuation lifts, fire suppression equipment etc; annual cabinet
                checks of firefighters' switches.
              </li>
              <li>
                <strong>HRBs only.</strong> Secure information box at the building accessible to
                FRS; floor plans and building plans on-site for FRS; quarterly checks of flat
                entrance doors; evacuation alert system where required.
              </li>
            </ul>
            <p>The Building Safety Act 2022 — what it created:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Building Safety Regulator (BSR).</strong> A function of the HSE. The
                regulator for HRBs across design, construction and occupation.
              </li>
              <li>
                <strong>Accountable Persons (APs) and Principal Accountable Person (PAP).</strong>
                The duty holders for occupation-stage building safety in HRBs. Analogue of the
                responsible person but specific to HRBs and broader in scope (structural + fire +
                building safety risks).
              </li>
              <li>
                <strong>Golden thread.</strong> Mandatory digital record of building information
                from design through construction through occupation. Survives ownership changes.
                Information sharing on demand to BSR, FRS, residents.
              </li>
              <li>
                <strong>Mandatory occurrence reporting (MOR).</strong> Reporting to BSR of safety
                occurrences meeting prescribed thresholds. Designed to surface near-misses, not just
                catastrophic events.
              </li>
              <li>
                <strong>Gateway regime.</strong> Gateway 1 (planning), Gateway 2 (design — pre-build
                BSR approval), Gateway 3 (completion — BSR sign-off before occupation). All three
                apply to HRBs.
              </li>
              <li>
                <strong>Resident engagement strategy and complaints procedure.</strong> AP must
                engage residents on building safety; residents have routes of escalation to the BSR.
              </li>
            </ul>
            <p>
              For the fire alarm contractor, the operational consequences are significant. In an
              HRB, the design and any modification to the fire alarm system feeds the golden thread
              — drawings, cause-and-effect, commissioning records all become part of the persistent
              record. Service-visit records likewise. Modifications may require BSR notification.
              The contractor's quality of documentation directly supports (or undermines) the AP's
              compliance posture under the BSA.
            </p>
          </ConceptBlock>

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

          <ContentEyebrow>Enforcement and prosecution</ContentEyebrow>

          <ConceptBlock
            title="The four formal enforcement tools"
            plainEnglish="The FRS (or HSE / BSR depending on premises) has four formal tools under the RRO. They escalate in severity. Most issues are resolved by audit and informal follow-up; the formal tools come out when there is non-cooperation, repeat failure, or significant risk."
          >
            <p>The four tools, escalating:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Alterations notice (Art 29).</strong> Requires the responsible person to
                notify the enforcing authority before making specified changes. Used where the
                premises pose, or could pose, a serious risk if changed without scrutiny.
              </li>
              <li>
                <strong>Enforcement notice (Art 30).</strong> Requires the responsible person to
                take specified steps to remedy a breach within a specified time. Includes the right
                of appeal to a court.
              </li>
              <li>
                <strong>Prohibition notice (Art 31).</strong> Prohibits or restricts use of the
                premises immediately or by a specified date where the use involves or will involve a
                risk so serious that use should be prohibited or restricted. No appeal pause —
                effective immediately. Closes premises, stops events, stops sleeping use.
              </li>
              <li>
                <strong>Prosecution (Art 32).</strong> Criminal prosecution for offences under the
                Order. Maximum penalty on indictment: unlimited fine + up to 2 years imprisonment.
              </li>
            </ul>
            <p>
              Beyond the RRO toolkit, the FRS / HSE may also pursue corporate manslaughter
              prosecutions where management failures cause death (Corporate Manslaughter and
              Corporate Homicide Act 2007), or gross negligence manslaughter against individual
              directors / senior managers. Civil claims by injured persons run in parallel and are
              assessed on the balance of probabilities (lower bar than criminal).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Sentencing trends — post-Grenfell uplift"
            plainEnglish="Pre-Grenfell, fire safety prosecutions tended to result in five- and six-figure fines. Post-Grenfell, six- and seven-figure fines are routine and custodial sentences for individual directors are appearing. The Sentencing Council's guideline on health and safety offences (which captures fire safety) is calibrated to financial turnover and culpability — for large organisations with high culpability, fines into the millions are now within range. Prosecutorial appetite has materially increased."
          >
            <p>Indicative trend points:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>2014.</strong> R v Shepherd Homes (Wirral) — £400,000 fine after a fire risk
                assessment failure in a sheltered housing scheme. At the time, considered a high
                fine.
              </li>
              <li>
                <strong>2017.</strong> R v New Look Retailers — £400,000 fine and £136,000 costs
                after a fire in an Oxford Street store; the FRA had not adequately assessed the
                risks of a particular storage configuration.
              </li>
              <li>
                <strong>2020.</strong> R v Tesco Stores — £733,500 fine after fire safety failures
                in a number of stores including blocked exits.
              </li>
              <li>
                <strong>2023.</strong> Civil and regulatory exposure in the Grenfell-related
                proceedings reached unprecedented levels; criminal proceedings against responsible
                persons and contributory parties continue.
              </li>
            </ul>
            <p>
              The trend matters to the contractor for two reasons. First, the client's exposure is
              real and increasing — the contractor who delivers a compliant, well-documented system
              is delivering material protection. Second, the contractor's own exposure as a
              contributory party (civil claim, regulatory action against the firm, prosecution of
              individuals) is also real — the days of "the responsible person carries it all" are
              gone where the contributory failures are clear (defective design, defective install,
              missed maintenance, defective handover).
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'RRO 2005 is the principal operating-stage fire safety law for non-domestic premises in England and Wales (in force 1 October 2006). Scotland and NI have equivalents.',
              'Responsible person (RRO Art 3) — employer / occupier / owner with control. Liability follows control. Multiple RPs can co-exist; cooperation duty in Art 22.',
              'FRA duty (Art 9) — suitable and sufficient. Significant findings recorded in writing where 5+ employees / licensed / alterations notice. Reviewed when no longer valid or significant change.',
              'Maintenance duty (Art 17) — efficient working order at all times. BS 5839-1 service regime is the technical route. 5-7 month tolerance window confirmed in 2025.',
              'Fire Safety Act 2021 — RRO captures external walls + flat entrance doors in multi-occupied residential. Fire Safety (England) Regs 2022 added specific operational duties.',
              'Building Safety Act 2022 — HRBs (≥ 18 m OR ≥ 7 storeys, AND ≥ 2 residential units): Accountable Person, golden thread, MOR, BSR oversight.',
              'Penalties (Art 32) — unlimited fines + up to 2 years custody. Corporate manslaughter exposure for management-failure-caused deaths.',
              'Enforcement — FRS principal enforcer (under FRSA 2004). Four tools: alterations notice, enforcement notice, prohibition notice, prosecution.',
              'The contractor sits inside the legal compliance mechanism. Design / install / commission / maintain choices ARE the technical route to RRO compliance. Contributory liability is real.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My client says they have "an FRA" and points to a one-page document. Is that enough?',
                answer:
                  'Almost certainly not. A one-page document is unlikely to demonstrate "suitable and sufficient" under Art 9(1). A defensible FRA (PAS 79-1 methodology) typically runs to 20-50 pages for a small premises and considerably more for larger or higher-risk premises. It identifies hazards, persons at risk, evaluates existing precautions, lists significant findings and an action plan, and is signed and dated by a competent assessor. A one-page document is a sticker on the wall, not a defence.',
              },
              {
                question:
                  'The responsible person is unsure whether a fire alarm system is required at all. Where do I look?',
                answer:
                  'Three places. First, the FRA itself — it should make a recommendation based on Art 13 (firefighting and fire detection). Second, Approved Document B (Building Regulations) — for new build or material alteration, ADB sets the construction-stage requirement. Third, BS 5839-1 §6 (and Annexes) — gives guidance on system category by premises type. The FRA should pull these together and arrive at a recommendation; the contractor should be able to walk the responsible person through that recommendation.',
              },
              {
                question: 'A 9 m office block has 30 employees. Is it an HRB?',
                answer:
                  'No. The HRB threshold under the BSA is 18 m OR 7 storeys, AND ≥ 2 residential units. A 9 m office is neither tall enough nor residential. The RRO applies fully (employer is RP, FRA / Art 9, maintenance / Art 17, etc.) but the BSA / HRB regime does not engage. Building Regulations apply to construction; the BSA does not add a parallel HRB regime here.',
              },
              {
                question:
                  'A 24 m residential block has 6 storeys above ground and one storey of underground parking. Is it an HRB?',
                answer:
                  'Likely yes — but the storey count is the critical question. The HRB threshold is ≥ 18 m OR ≥ 7 storeys. The detailed Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023 set out how to count storeys (treatment of basements, plant rooms, mezzanines etc). The 24 m height alone meets the threshold so the answer is yes, regardless of how the storey count works out. Confirm with the BSR registration record (HRBs must be registered with the BSR).',
              },
              {
                question:
                  "I'm asked to install a fire alarm in a single-let café. The owner-operator employs 3 staff. What level of FRA paperwork should I expect to see?",
                answer:
                  'Sub-threshold for compulsory written FRA recording (3 employees, presumably no licence, no alterations notice). But — the FRA duty itself (Art 9(1)) applies regardless of size. Industry practice and insurer expectation is a written FRA regardless of size. If the owner-operator has not produced one, advise them in writing that one should be in place before you commission the system, and ensure your own design records (category recommendation, justification) are clear so that — if a regulator asks later — the design rationale is documented even if the FRA is not.',
              },
              {
                question:
                  'Can the responsible person delegate their duty to a managing agent under a contract?',
                answer:
                  'No. The RRO duty is non-delegable. The responsible person can outsource the work — pay a managing agent to maintain the building, pay a fire safety consultant to write the FRA, pay a fire alarm contractor to maintain the system — but the legal accountability remains with the responsible person. A well-drafted contract will allocate responsibility for performing the work to the agent / consultant / contractor and create indemnities for failures, but it does not move the statutory duty.',
              },
              {
                question:
                  'How does Article 38 RRO (firefighter information) affect the fire alarm contractor at handover?',
                answer:
                  'Art 38 requires the responsible person to ensure that information is provided about premises and equipment that affects firefighter safety. The fire alarm zone plan is a primary Art 38 artefact — it shows the FRS, on arrival, where in the building the fire is. The cause-and-effect documentation is another. The 2025 revision of BS 5839-1 makes a cause-and-effect matrix or equivalent text description mandatory at handover (Cl 38.1). A handover that omits the zone plan or the cause-and-effect leaves the responsible person in breach of Art 38 by default. Make these handover artefacts ironclad.',
              },
              {
                question: 'The RRO says enforcement is by the FRS. What about HSE and BSR?',
                answer:
                  'The RRO Schedule 1 sets out enforcing authorities: FRS for most premises; HSE for some specialised premises (construction sites, parts of nuclear / petroleum / docks etc); local authority for sports grounds; defence fire risk management organisation for Crown premises. The BSR was added by the Building Safety Act 2022 as the enforcing authority for HRBs under both the BSA itself AND for the RRO duties that apply within HRBs. So in an HRB, BSR enforces. In a normal commercial premises, FRS enforces. In some specialised premises, HSE enforces. Check Schedule 1 if uncertain.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Fire safety legislation — Module 7.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-7/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.2 Building Regulations
              </div>
            </button>
          </div>

          <div className="hidden">
            <Scale />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule7Section1;
