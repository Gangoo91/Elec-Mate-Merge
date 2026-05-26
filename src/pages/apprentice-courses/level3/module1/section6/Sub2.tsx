/**
 * Module 1 · Section 6 · Subsection 2 — HRRB dutyholder responsibilities and the safety case
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * 2357 Unit 601 ELTK01 — AC 1.1: "State own and others' responsibilities under current health and safety
 * legislation when conducting electrical activities including supervision of others." Plus AC 1.5 on
 * categories of statutory legislation. The Building Safety Act 2022 created new in-occupation duty
 * holders (PAP, AP, RP) operating alongside the established CDM / RRFSO / HASAWA framework — the L3
 * supervisor recognises and integrates with these duties on HRRB work.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'HRRB dutyholders + safety case | Level 3 Module 1.6.2 | Elec-Mate';
const DESCRIPTION = 'L3 deeper on PAP duties, the safety case, golden thread requirements and the L3 contractor representative role on HRRB sites.';

const checks = [
  { id: 'l3-m1-s6-sub2-pap', question: 'PAP main duties?', options: [
    'Register building with BSR; prepare and revise safety case; engage residents on building safety; manage building safety risks; maintain golden thread; report to BSR; respond to BSR notices.',
    'Ensuring, so far as reasonably practicable, the H&S of all employees — including safe systems, training, premises and a written policy where 5+ employees',
    'Listen non-judgementally, provide information about depression, encourage them to see their GP, and suggest self-help strategies such as NHS Talking Therapies self-referral',
    'A simplified rule: regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify effectiveness, with trip time ≤ 300 ms for general non-delay type and 130-500 ms for delay "S" type.',
  ], correctIndex: 0, explanation: 'PAP duties are extensive and ongoing. Single role per HRRB.' },
  { id: 'l3-m1-s6-sub2-safety-case', question: 'What\'s in a safety case?', options: [
    'Identification of building safety risks (fire and structural primary), strategies to manage them, evidence the strategies work, residents engagement strategy, links to golden thread, periodic review and update.',
    'A statutory fallback scheme that implies payment and adjudication terms into construction contracts that do not already comply with the Construction Act',
    'To communicate the status of equipment, ongoing maintenance activities, outstanding issues, and safety concerns between incoming and outgoing maintenance shifts',
    'Refrigerant must be recovered by an F-Gas-certified person and sent for recycling/destruction; the equipment is then dealt with under WEEE Regulations through an authorised treatment facility',
  ], correctIndex: 0, explanation: 'Safety case is the comprehensive evidence document. Living document; updated as the building changes.' },
  { id: 'l3-m1-s6-sub2-electrical', question: 'How does electrical work integrate with the safety case?', options: [
    'Reassess your diagnosis, consider what the failed attempt tells you about the problem, adjust your hypothesis, and try a different approach systematically — while knowing when to seek help',
    'EIC at install; EICR cycles; alteration certs; commissioning records of fire detection and alarm, EV charging electrical infrastructure, emergency lighting; design records; product specifications. All become part of golden thread evidence the safety case relies on.',
    'A pilot drill bit guides the hole saw, cutting fluid/lubricant should be used, speed should be moderate (high speed generates excessive heat), and the workpiece should be clamped or supported',
    'Have RCD providing ADS suitable for the load — typically 30 mA Type B (or Type A with integral 6 mA DC RCD inside the EVSE), dedicated final circuit, isolator within reach, and PEN-fault protection per Section 722.411.4 where supplied from PME.',
  ], correctIndex: 1, explanation: 'Electrical records are foundational to the safety case for many risks. Fire detection, emergency lighting, EV charging all electrical-system dependent.' },
];

const quizQuestions = [
  { id: 1, question: 'How often does the safety case need updating?', options: [
    'They may unintentionally alienate colleagues, miss important social cues, fail to adapt their communication style to different audiences, and receive repeated negative feedback they cannot understand or act upon',
    'Living document - updated when significant changes occur (alterations, replacements, occupancy changes), after incidents / near-misses, periodically (PAP determines but typically annually). BSR can request review.',
    'Managing the risk from ACMs in non-domestic premises — finding them, recording them, assessing risk, planning management, and providing the information to anyone liable to disturb them',
    '30 mA RCD on all final circuits supplying the stands, double or reinforced insulation where applicable, careful management of cable routing to avoid trip hazards in public areas, and easy means of disconnection at the stand origin.',
  ], correctAnswer: 1, explanation: 'Continuous; updated as the building evolves.' },
  { id: 2, question: 'What\'s the residents engagement strategy?', options: [
    'Natural England is the government\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s statutory adviser on the natural environment, responsible for issuing species licences, designating protected sites, and advising on ecological matters',
    'Clearly show the assessor which evidence addresses which knowledge, skills and behaviour requirements from the standard — ensuring comprehensive coverage and making it easy to navigate your evidence',
    'Required element of safety case. PAP must engage residents on building safety - communication, complaints procedure, opportunity to raise concerns, information about safety arrangements. BSA 2022 explicitly empowers resident voice.',
    'A combination of early detection (off-gas sensors, thermal sensors, smoke detection), water mist or aerosol suppression to cool cells and prevent thermal runaway propagation, and ventilation systems to manage toxic gas accumulation',
  ], correctAnswer: 2, explanation: 'Resident engagement is mandatory. Post-Grenfell direct response to lack of resident voice in pre-2017 framework.' },
  { id: 3, question: 'Who can request to see the safety case?', options: [
    'Restricted entry and exit points make it harder to escape in an emergency and harder for rescuers to reach a casualty, increasing the severity of any incident',
    'Low psychological safety \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\u2014 the team fears blame. The mentor should model openness by sharing their own mistakes and ensuring reports lead to learning, not punishment',
    '"Describe: You have arrived after 09:00 on four occasions. Express: This causes concern as it delays the programme. Specify: I need you on site by 08:00. Consequences: This keeps the project on track"',
    'BSR (always); residents (rights under BSA 2022); contractors working on the building (so they can integrate their work safely); fire and rescue service (RRFSO 2005 powers).',
  ], correctAnswer: 3, explanation: 'Multiple parties can / must access. Transparency is fundamental.' },
  { id: 4, question: 'How does the golden thread work for electrical records?', options: [
    'Digital, accurate, accessible, secure. Cloud-based certification platforms (NICEIC online, NAPIT online, contractor systems) produce records suitable for golden-thread integration. Paper-only certs increasingly inadequate for HRRB work.',
    'Physiological response to electric current passing through the body. Effects scale with current (mA): perception (1mA), pain (5-10mA), can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t-let-go (10-20mA), respiratory paralysis (20-50mA), ventricular fibrillation (50-100mA+). Duration matters — long exposure at lower current can be lethal.',
    'It is a potentially fatal condition where a person suspended motionless in a harness can suffer blood pooling in the legs, leading to loss of consciousness and death within 5-15 minutes',
    'Adjusting the timing or level of electricity consumption in response to price signals, grid conditions, or other incentives, to reduce peak demand and support grid stability',
  ], correctAnswer: 0, explanation: 'Golden thread = digital. Paper certs need scanning and indexing; born-digital is preferred.' },
  { id: 5, question: 'What happens if the safety case is inadequate?', options: [
    'A legitimate complaint identifies a genuine failure to meet agreed standards; an unreasonable complaint seeks outcomes beyond what was agreed or what is fair',
    'BSR can serve compliance notices; can ultimately direct evacuation if risk is severe; PAP can be prosecuted for failure to maintain safety case; Defective Premises Act + civil claims if defects later cause harm.',
    'Acute toxicity — substances harmful by single short-term exposure (oral, dermal, inhalation). Includes acutely toxic gases, liquids, solids. Distinguished from chronic / long-term toxicity.',
    'Approximately (r1 + rn) ÷ 4 = 0.155 Ω at every socket, constant within a few percent. The divide-by-four comes from the parallel combination of two halves of the loop, each half being two quarters in series.',
  ], correctAnswer: 1, explanation: 'Real consequences. BSR has prosecution and notice powers.' },
  { id: 6, question: 'What\'s the L3 contractor representative\'s role on HRRB work?', options: [
    'Providing centralised monitoring and control of all building services, enabling automated load shedding, demand limiting, scheduling of non-essential loads, and real-time power monitoring with alarm management',
    'To take into account the general principles of prevention when carrying out design work and avoid foreseeable risks so far as is reasonably practicable',
    'Verify HRRB status; identify PAP / AP; integrate work plan with safety case; produce digital records suitable for golden thread; cooperate with PAP requests for information; brief team on HRRB-specific arrangements.',
    'Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready',
  ], correctAnswer: 2, explanation: 'L3 contractor representative operationalises BSA 2022 awareness and integration on site.' },
  { id: 7, question: 'Are buy-to-let landlords typically PAPs?', options: [
    'Report it to your insurer promptly within the timeframe specified in the policy (often within 7-30 days). Preserve evidence (photos, statements, certificates). Don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t admit liability — let the insurer handle the negotiation. Failure to notify within the policy timeframe can void cover for that claim.',
    'Use 250V test voltage where the equipment manufacturer permits, OR test live conductors connected together to earth (without between live and neutral), interpreting accordingly',
    'Earthing arrangement (TN-S/TN-C-S/TT), nominal voltage U/U0, frequency, prospective fault current Ipf, external loop impedance Ze, type and rating of supply protective device',
    'Only if they own / control structure / exterior of HRRB. Most BTL landlords own individual flats, not the whole building - the freeholder / managing agent is typically PAP. Single ownership of an HRRB rare; multi-leasehold structures common.',
  ], correctAnswer: 3, explanation: 'PAP determined by ownership / control of structure. Complex in multi-leasehold buildings.' },
  { id: 8, question: "How does the L3 cooperate with the PAP's residents engagement?", options: [
    "Brief residents (where they're affected by work) per the PAP's strategy. Provide information for newsletter / notices. Respond to resident questions about the work. Handle complaints via PAP's route.",
    "A statutory fallback scheme that implies payment and adjudication terms into construction contracts that do not already comply with the Construction Act",
    "Any project lasting longer than 30 working days and having more than 20 workers working simultaneously at any point, or exceeding 500 person days",
    "It targets the organisation as a whole where a gross breach of duty causes death and substantially involves senior management — focuses on culture, not individuals",
  ], correctAnswer: 0, explanation: "Resident engagement extends to contractors' work where relevant. L3 supervisor cooperates with PAP's strategy." },
];

const faqs = [
  { question: 'Can a small electrical alteration trigger safety case update?', answer: 'Significant alterations — yes. Routine maintenance — usually no. PAP makes the call; the contractor flags the work for PAP awareness.' },
  { question: 'How do I know who the PAP is?', answer: 'Ask the managing agent / building manager / customer. The PAP should be identified in safety arrangements; if no-one knows, that itself is a red flag.' },
  { question: 'Are emergency lighting tests part of golden thread?', answer: 'Yes — emergency lighting is safety-critical for the building&apos;s evacuation strategy. Test records, maintenance records, repair records all part of the golden thread.' },
  { question: 'What if the PAP does not engage with my work plan?', answer: 'Document the attempt. Escalate to firm. Do not proceed with significant common-parts work without PAP engagement; the alternative creates liability for the firm and potentially the PAP.' },
  { question: 'How do I get my certs into the golden thread?', answer: 'Work with the PAP&apos;s document management arrangements. Some PAPs have integrated systems (cert is uploaded directly); others receive certs and manually integrate. Confirm at start of project.' },
  { question: 'Does the golden thread requirement apply to all building records or just safety-critical ones?', answer: 'Primarily safety-critical (design, materials, installation, maintenance, alterations affecting structure / fire / safety systems). Routine non-safety records less critical.' },
  { question: 'Who decides whether an alteration triggers a safety case update?', answer: 'The PAP. The contractor flags the work; the PAP applies their judgement on whether the safety case is materially affected. Where doubt exists, raising the flag is the correct response and lets the PAP decide.' },
  { question: 'How does the PAP demonstrate ongoing safety case validity to the BSR?', answer: 'Periodic safety case review (typically annual), updated as conditions change, with evidence the strategies remain effective. The BSR can request the safety case at any time; the PAP must produce it without delay.' },
  { question: 'What is the difference between a PAP and an Accountable Person (AP)?', answer: 'A PAP is the single accountable person for the structure and exterior of the HRRB. APs are accountable for repair of parts of common parts; an HRRB may have multiple APs but only one PAP. The PAP coordinates with the APs.' },
  { question: 'How does the L3 supervisor know if a PAP has been registered with the BSR?', answer: 'The BSR maintains a register of HRRBs and their PAPs. The managing agent / building manager should be able to confirm registration. Where registration is missing on a building that meets the HRRB threshold, that is itself a BSR-reportable concern.' },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 6</button>
          <PageHero eyebrow="Module 1 · Section 6 · Subsection 2" title="HRRB dutyholders and the safety case" description="Remember from Section 6.1 - PAP holds the building. Here we go deeper on the safety case, golden thread integration and the L3 contractor representative's role." tone="emerald" />
          <TLDR points={[
            "PAP duties: register, prepare and revise safety case, engage residents, manage risks, maintain golden thread, respond to BSR.",
            "Safety case is comprehensive living document — identifies risks, strategies, evidence, residents engagement, golden-thread links.",
            "L3 contractor representative integrates electrical work into safety case + golden thread via digital records.",
            "Mandatory occurrence reporting (MOR) — structural / fire-system / compartmentation events reportable to BSR by PAP within prescribed timescales.",
            "Three gateways for HRRB construction — Gateway 1 (planning), Gateway 2 (pre-construction approval), Gateway 3 (pre-occupation sign-off).",
            "Fire Safety Act 2021 amendments confirm external walls and flat entrance doors within RP&apos;s RRFSO remit.",
          ]} />
          <LearningOutcomes outcomes={[
            "State the main duties of the Principal Accountable Person.",
            "Identify the elements of a safety case.",
            "Recognise resident engagement as mandatory under BSA 2022.",
            "Apply golden-thread requirements to electrical records (EIC, EICR, alteration certs, commissioning).",
            "Identify who can request access to the safety case.",
            "Apply the L3 contractor representative role on HRRB sites.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>PAP duties in operation</ContentEyebrow>
          <ConceptBlock title="What the PAP actually does" plainEnglish="The PAP is single accountable person per HRRB. Duties include registering the building with BSR; preparing and revising the safety case; engaging residents; managing safety risks; maintaining the golden thread; responding to BSR notices; reporting incidents." onSite="L3 contractor working on HRRB needs to identify the PAP early. The PAP's arrangements drive what the contractor does on site - documentation format, sequencing, approvals, communication with residents.">
            <p>PAP duty list:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Register the building with BSR.</li>
              <li>Prepare and maintain the safety case.</li>
              <li>Identify, assess and manage building safety risks.</li>
              <li>Implement strategies to mitigate risks.</li>
              <li>Engage residents (communications, complaints, information).</li>
              <li>Maintain golden thread of information.</li>
              <li>Respond to BSR notices and requests.</li>
              <li>Report mandatory occurrences to BSR.</li>
              <li>Coordinate with Responsible Person (fire safety) under RRFSO 2005.</li>
              <li>Approve significant building changes that affect safety case.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Building Safety Act 2022 - s.83 (Safety case)" clause={<>"The principal accountable person for a higher-risk building must - (a) prepare a safety case report for the building, and (b) keep the safety case report under review and revise it as appropriate."</>} meaning={<>The safety case duty. PAP prepares and continuously revises. The safety case is the comprehensive evidence that the building is being safely managed and the strategies for managing risks are working.</>} cite="Source: Building Safety Act 2022 (2022 c.30), s.83." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>The safety case</ContentEyebrow>
          <ConceptBlock title="What the safety case contains" plainEnglish="Safety case is comprehensive document covering identification of building safety risks (primary fire and structural), strategies to manage them, evidence the strategies work in practice, residents engagement strategy, and links to the golden thread." onSite="L3 contractor representative should be able to ask for / see relevant parts of the safety case for the work being undertaken. Common-parts electrical work, fire detection / alarm work, emergency lighting work all reference safety case content.">
            <p>Safety case elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building description and current condition.</li>
              <li>Identified safety risks (primarily fire spread and structural).</li>
              <li>Risk assessment evidence.</li>
              <li>Strategies to manage each risk.</li>
              <li>Evidence the strategies are operational and effective.</li>
              <li>Residents engagement strategy.</li>
              <li>Golden-thread information set.</li>
              <li>Maintenance and inspection arrangements.</li>
              <li>Incident response and reporting arrangements.</li>
              <li>Periodic review schedule.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Electrical integration with the safety case</ContentEyebrow>
          <ConceptBlock title="Where electrical records meet the golden thread" plainEnglish="Many electrical systems are safety-critical for HRRB safety case - fire detection / alarm, emergency lighting, EV charging electrical infrastructure (fire risk), wayfinding, smoke control. Test records, maintenance records, alteration certs all become part of golden thread." onSite="The L3 supervisor produces records in digital format from the start, suitable for direct integration with PAP's document system. NICEIC online, NAPIT online, contractor cloud systems all produce digital outputs. Paper-only certs require additional handling and may not be acceptable to all PAPs.">
            <p>Electrical systems with strong safety-case relevance:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fire detection and alarm system (BS 5839).</li>
              <li>Emergency lighting (BS 5266).</li>
              <li>Smoke control and ventilation electrical control.</li>
              <li>Fire-fighters' lift / disabled access lift.</li>
              <li>Lift safety circuits (PUWER + LOLER).</li>
              <li>EV charging infrastructure (BS 7671 Section 722; Approved Doc B fire considerations).</li>
              <li>Wayfinding / signage power.</li>
              <li>Standby / generator / UPS systems.</li>
              <li>Overall electrical installation EICR (BS 7671).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The Responsible Person under RRFSO 2005</ContentEyebrow>
          <ConceptBlock title="Where fire safety law meets BSA 2022" plainEnglish="The Regulatory Reform (Fire Safety) Order 2005 (RRFSO 2005) gives the Responsible Person (RP) duties for general fire safety in non-domestic premises and common parts of residential buildings. On HRRBs the RP role coexists with the PAP — same person in some structures, different in others. The Fire Safety Act 2021 amended RRFSO to clarify external walls and entrance doors are within the RP&apos;s remit." onSite="The L3 supervisor on common-parts electrical work in a residential building: identify both the PAP (BSA 2022 in-occupation duties) and the RP (RRFSO 2005 fire safety duties). They may be the same person or different. Fire alarm work, emergency lighting, EV charge point installation in common parts all engage RP duties — coordinate with both.">
            <p>RRFSO 2005 RP duties:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Carry out a fire risk assessment (Article 9).</li>
              <li>Implement fire safety arrangements (Article 11).</li>
              <li>Provide information, instruction and training (Article 21).</li>
              <li>Maintain fire safety provisions including fire alarm and emergency lighting.</li>
              <li>Cooperate with other RPs where premises are shared.</li>
              <li>Coordinate with PAP under BSA 2022 on HRRBs.</li>
              <li>Fire Safety Act 2021 amendments include external walls and flat entrance doors.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Regulatory Reform (Fire Safety) Order 2005 — Article 9" clause={<>&quot;The responsible person must make a suitable and sufficient assessment of the risks to which relevant persons are exposed for the purpose of identifying the general fire precautions he needs to take to comply with the requirements and prohibitions imposed on him by or under this Order.&quot;</>} meaning={<>The RP&apos;s fire risk assessment duty. &quot;Suitable and sufficient&quot; mirrors the MHSWR Reg 3 standard. Five-employee threshold for written record. The RP&apos;s FRA drives the design and maintenance of fire alarm, emergency lighting, fire-fighting equipment and means of escape — all touching electrical installation work.</>} cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 9." />

          <ConceptBlock title="Golden thread practical implementation" plainEnglish="The golden thread is the digital, accurate, accessible, secure information set covering an HRRB&apos;s design, construction and ongoing management. Practical implementation: cloud-based document management with structured taxonomy, controlled access, version control, audit trail. Held by PAP; contractors contribute via digital records." onSite="L3 supervisor practical contribution: produce certs in cloud-based systems (NICEIC online, NAPIT online, contractor cloud) that output digital files; hand them to the PAP&apos;s document system in agreed format (typically PDF + structured metadata or direct upload to portal). Confirm format with PAP at start of project; do not produce paper certs and assume scanning will work.">
            <p>Golden thread information typically includes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>As-built drawings (architectural, structural, MEP).</li>
              <li>Design rationale and changes from original design.</li>
              <li>Material specifications including fire performance and CPR class.</li>
              <li>Installation records — who, when, what, sign-off.</li>
              <li>Test and commissioning records (electrical EIC, fire alarm, emergency lighting).</li>
              <li>Maintenance and inspection schedules and historical records.</li>
              <li>Alteration certificates over the building&apos;s life.</li>
              <li>Safety case versions with change history.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Dutyholder cooperation under BSA 2022 + CDM 2015" plainEnglish="On HRRB construction the BSA 2022 dutyholder regime (Client / Principal Designer / Principal Contractor with extra HRRB-specific duties) sits on top of the CDM 2015 framework. Mandatory client-led design competence, gateway sign-offs, building safety information transfer at each stage, and tighter change-management discipline. The L3 supervisor on HRRB construction works inside both frameworks." onSite="Practical effect: more documentation, more design-team approvals, slower change cycles, formal sign-offs at gateways. Site substitutions are essentially banned without design-team approval. Operative competence checks (cards, schemes) are tighter. Plan accordingly; the project economics absorb the time.">
            <p>Coordination touchpoints:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Client-led design competence framework.</li>
              <li>Principal Designer leads pre-construction safety information.</li>
              <li>Principal Contractor leads construction safety + golden thread contribution.</li>
              <li>Gateway 2 design approval before any construction.</li>
              <li>Change management — substitutions need design-team written approval.</li>
              <li>Gateway 3 as-built sign-off before occupation.</li>
              <li>Handover of building safety information to PAP at completion.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Mandatory occurrence reporting — what triggers a report" plainEnglish="BSA 2022 mandatory occurrence reporting (MOR) for HRRBs requires the PAP to report defined safety occurrences to BSR. Wider trigger scope than RIDDOR — covers structural concerns, fire spread events, missing or defective fire-stopping, alarm system failures. Reportable regardless of whether anyone was injured. The L3 contractor finding any of these on site flags to the PAP same day so the MOR clock can start." onSite="Common L3 supervisor finding triggers: fire-stopping breach in a riser discovered during cable installation; alarm panel showing unresolved fault during electrical works; structural deflection in a corridor near work area. Each is a potential MOR trigger. Same-day notification to the PAP is the L3&apos;s responsibility — let the PAP decide whether MOR applies.">
            <p>MOR trigger categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Structural failure or instability events.</li>
              <li>Fire safety system failures (alarm, emergency lighting, smoke control).</li>
              <li>Fire-stopping or compartmentation breaches.</li>
              <li>External wall system concerns (cladding integrity).</li>
              <li>Lift safety failures (firefighters&apos; lift, evacuation lift).</li>
              <li>Defects threatening safety case validity.</li>
              <li>Reportable in addition to (not instead of) RIDDOR triggers.</li>
              <li>L3 contractor finding flags to PAP same day; PAP decides on MOR.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Fire Safety Act 2021 — s.1 (Premises to which the Order applies)" clause={<>&quot;Where a building contains two or more sets of domestic premises, the things to which [RRFSO] article 6(1A) applies are — (a) the building&apos;s structure and external walls and any common parts, and (b) all doors between the domestic premises and common parts.&quot;</>} meaning={<>The Fire Safety Act 2021 amendment clarifies that the RP&apos;s RRFSO duties extend to external walls (cladding) and flat entrance doors in multi-occupancy residential buildings. Direct response to Grenfell — closes a perceived gap in pre-2021 RRFSO scope. Reaches contractor electrical work where penetrations through external walls / flat doors are involved.</>} cite="Source: Fire Safety Act 2021 (2021 c.24), s.1." />

          <ConceptBlock title="BSR enforcement powers and notices" plainEnglish="The Building Safety Regulator has wide enforcement powers — improvement notices, compliance notices, restriction notices (effectively prohibition), prosecution. Can ultimately direct evacuation if building safety risk is severe. Operates similarly to HSE inspector model but with HRRB-specific mandate." onSite="L3 supervisor framing: BSR is real enforcement, not advisory. Contractors who fail to integrate with PAP / golden thread can themselves face BSR action where their failures contribute to safety case inadequacy. Standard expectation is full cooperation with PAP — non-cooperation is a regulatory red flag.">
            <p>BSR enforcement powers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Improvement notices — require specific remedial action by deadline.</li>
              <li>Compliance notices — require compliance with safety case obligations.</li>
              <li>Restriction notices — restrict use, occupation or alteration of building.</li>
              <li>Prosecution under BSA 2022 offences (PAP failures, false information etc).</li>
              <li>Direction to PAP including evacuation directions in extreme cases.</li>
              <li>Public register of enforcement actions (procurement consequence).</li>
              <li>Coordination with HSE on dual-relevance enforcement.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Producing paper-only certs for HRRB work" whatHappens={<>L3 issues paper EIC for an alteration in HRRB common parts. PAP\'s document management system requires digital input. Cert needs scanning, indexing, manual integration - friction with PAP. Some PAPs may treat paper-only as inadequate for golden-thread purposes.</>} doInstead={<>Use cloud-based certification system (NICEIC online, NAPIT online, contractor cloud) for born-digital outputs. Confirm format with PAP at start of project.</>} />

          <CommonMistake title="Not flagging significant alterations to the PAP" whatHappens={<>L3 completes alteration that affects fire-safety circuit; doesn\'t flag to PAP because &quot;it\'s a small change&quot;. Safety case isn\'t updated. After future incident, BSR investigation finds the alteration wasn\'t in the safety case. PAP penalised for not maintaining safety case; contractor reputation damaged.</>} doInstead={<>Flag any work that affects safety-critical systems to the PAP for safety case update. Brief written notification with the cert package.</>} />

          <Scenario title="Fire alarm alteration in an HRRB" situation={<>Your firm has been engaged to extend the fire detection and alarm system in an HRRB block of flats - additional smoke detectors in newly-converted communal storage area. PAP is the managing agent who is engaged but busy.</>} whatToDo={<>Pre-work: confirm scope with PAP / fire risk assessor; ensure design integrated with existing system; obtain commissioning protocol. During work: document each step; produce digital cert; integrate with existing fire alarm system. Post-work: brief PAP on changes; provide cert in digital format suitable for golden thread; flag for safety case update; brief commissioning to building manager. The fire alarm system is core safety case infrastructure; the alteration must be reflected in the case.</>} whyItMatters={<>Fire detection / alarm work in HRRBs is exactly the kind of safety-critical work that BSA 2022 was designed to govern. Failure to integrate with the safety case leaves the building protected by an outdated risk assessment - the failure mode that contributed to past incidents.</>} />

          <SectionRule />
          <ContentEyebrow>Building Safety Act gateways — the three regulatory checkpoints</ContentEyebrow>

          <ConceptBlock
            title="Why HRRB construction is now staged behind regulatory gates"
            plainEnglish="BSA 2022 introduced three gateways for higher-risk buildings: Gateway 1 (planning stage — fire safety considered in planning permission), Gateway 2 (pre-construction — BSR approval of detailed design and construction control plan before work starts), Gateway 3 (pre-occupation — BSR sign-off that the building has been built as approved and is safe to occupy). Construction work on an HRRB cannot proceed past each gateway without BSR approval. This is a structural change from the pre-BSA Building Control regime — significantly more prescriptive, with BSR rather than Local Authority Building Control as the regulator for HRRBs."
            onSite="The L3 supervisor on HRRB work operates within a project that has already passed Gateway 2 (otherwise construction couldn&apos;t start) and is being built to deliver Gateway 3 sign-off. Any change to the approved design needs Gateway 2 modification application — site substitutions, scope changes, product substitutions all attract Gateway 2 review. The discipline of &apos;build to drawing&apos; is much stricter than typical non-HRRB sites; the L3 supervisor reinforces the discipline with their team."
          >
            <p>The three gateways in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gateway 1 (planning)</strong> — fire safety considered at planning
                application stage; HSE / BSR consulted; statutory consultee role.
              </li>
              <li>
                <strong>Gateway 2 (pre-construction)</strong> — BSR approval of detailed
                design, construction control plan, competence, golden-thread arrangements
                before work starts.
              </li>
              <li>
                <strong>Gateway 3 (pre-occupation)</strong> — BSR sign-off that the
                building has been constructed as approved and is safe to occupy.
              </li>
              <li>
                <strong>Change control between gateways</strong> — major changes need
                Gateway 2 modification application.
              </li>
              <li>
                <strong>Mandatory occurrence reporting</strong> — BSR notified of
                building-safety-relevant events during construction (Reg 18 BSA 2022 Part
                3).
              </li>
              <li>
                <strong>BSR-registered contractors</strong> — for high-risk work; the
                competence framework that backs the gateway approvals.
              </li>
              <li>
                <strong>Documentation discipline</strong> — golden thread maintained
                throughout; gateway 3 review relies on the records.
              </li>
              <li>
                <strong>Penalties for non-compliance</strong> — BSR enforcement powers
                including stop notices, prosecution, individual liability.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>BSR enforcement in practice</ContentEyebrow>

          <ConceptBlock
            title="What BSR enforcement action looks like for contractors"
            plainEnglish="The BSR&apos;s enforcement powers (improvement notices, compliance notices, restriction notices, prosecution) sit alongside HSE&apos;s HASAWA enforcement framework. For contractors working on HRRBs, BSR action can reach them directly where their failures contribute to safety case inadequacy. A contractor who supplies inadequate records, makes site substitutions without approval, or ignores PAP information requests may itself face BSR action — improvement notice, removal from approved-contractor lists held by the PAP, or prosecution where the failure was serious enough."
            onSite="L3 supervisor framing: BSR is real enforcement, not advisory. Cooperation with the PAP is not just commercial good practice — it is regulatory expectation. The published BSR direction is towards a system in which contractor record quality, competence evidence and prompt cooperation are part of how the framework functions. Contractors who treat HRRB sites with the same casual approach as non-HRRB work increasingly run into problems — from PAP-level removal from approved lists through to direct BSR engagement."
          >
            <p>BSR enforcement reach to contractors:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Improvement notices — for identified failures with remedy period.</li>
              <li>Compliance notices — for safety case obligations.</li>
              <li>Removal from PAP&apos;s approved contractor lists — procurement consequence.</li>
              <li>Prosecution for serious failures — false records, deliberate non-cooperation.</li>
              <li>Coordination with HSE on dual-relevance enforcement.</li>
              <li>Public-register consequence — visible to other PAPs during procurement.</li>
              <li>Cooperative posture and high-quality records are the protective factors.</li>
              <li>Direct BSR engagement increasingly reaches firms whose contractor practice falls below the published expectations.</li>
              <li>Contractor track record on HRRBs becomes its own procurement asset over time.</li>
              <li>Cultural alignment with the regulator&apos;s direction is the long-term commercial position.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The CDM 2015 + BSA 2022 dutyholder overlay</ContentEyebrow>

          <ConceptBlock
            title="How established CDM dutyholders gain HRRB-specific duties"
            plainEnglish="On HRRB construction, the existing CDM 2015 dutyholder framework (Client, Principal Designer, Principal Contractor, Designer, Contractor, Worker) carries additional BSA 2022 HRRB-specific duties. The Client must satisfy themselves of competence with HRRB-specific rigour. The Principal Designer takes on pre-construction safety case and gateway 2 submission. The Principal Contractor handles construction-phase mandatory occurrence reporting, change control, and golden-thread contribution. The framework is materially more prescriptive than non-HRRB CDM but is built on the same foundation. The L3 supervisor on HRRB construction works inside both frameworks simultaneously."
            onSite="The discipline is logical once familiar. Every change goes through formal change control. Site substitutions are essentially banned. Operative competence is checked at induction. Building-safety-relevant findings flow through MOR. Daily and weekly progress reporting includes BSA-relevant items. The L3 supervisor takes time to internalise the discipline on first HRRB project; subsequent projects feel routine."
          >
            <p>Dutyholder overlay summary:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Client — competence verification with HRRB rigour.</li>
              <li>Principal Designer — pre-construction safety case + gateway 2.</li>
              <li>Principal Contractor — construction-phase MOR + change control + golden thread.</li>
              <li>Designer — BSA competence + information provision.</li>
              <li>Contractor — BSA competence + finding flags via MOR.</li>
              <li>Worker — competence evidence at induction.</li>
              <li>Gateway 2 modification application for any significant design / construction change.</li>
              <li>Gateway 3 building safety information handover to PAP at completion.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Building Safety Manager (BSM) role — practical context</ContentEyebrow>

          <ConceptBlock
            title="What the BSM does and how the L3 supervisor interacts"
            plainEnglish="The Building Safety Manager (BSM) role was originally proposed as a mandatory appointment in BSA 2022 but the mandatory requirement was withdrawn before commencement. The role remains appropriate where the PAP does not have direct in-house competence to manage the building safely day-to-day. Many PAPs (particularly managing agents looking after multiple buildings) appoint a BSM or BSM-equivalent role under different titles. The BSM&apos;s function is operational management of building safety — day-to-day arrangements, contractor coordination, resident communication, safety case maintenance, MOR triage. For the L3 supervisor on HRRB work, the BSM is often the practical day-to-day contact point even where the PAP is the legal accountable person."
            onSite="Practical L3 implication: identify both the PAP and the BSM (or BSM-equivalent) at start of project. The BSM typically handles operational coordination — confirms format requirements for documentation, attends induction, briefs the contractor on building-specific arrangements, receives the L3&apos;s findings and feedback. The PAP retains the legal duty but may delegate operational management to the BSM. Working relationships with the BSM are the supervisor&apos;s day-to-day reality on most HRRB work."
          >
            <p>BSM role elements (where appointed):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Operational management of building safety on behalf of PAP.</li>
              <li>Day-to-day contractor coordination.</li>
              <li>Resident communication operational delivery.</li>
              <li>Safety case maintenance — capture of updates, periodic review coordination.</li>
              <li>MOR triage — receiving findings, deciding what reaches PAP for BSR notification.</li>
              <li>Site induction and contractor briefings on HRRB-specific arrangements.</li>
              <li>Coordination with RP under RRFSO 2005 (often same person or closely coordinated).</li>
              <li>Mandatory appointment was withdrawn but role remains appropriate in many structures.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Safety case appraisal and BSR review</ContentEyebrow>

          <ConceptBlock
            title="What happens when the BSR reviews the safety case"
            plainEnglish="The BSR can request the safety case at any time and reviews it formally on a defined cycle. The review examines whether the safety case adequately identifies risks, whether strategies are appropriate, whether evidence supports the strategies being effective, whether residents engagement is operational, and whether the golden thread supports the safety case. Outcomes range from acceptance (no action), to specific requests for further information, to compliance notices requiring identified remediation, to restriction notices, to prosecution. Most safety cases are accepted with minor refinement requests; weak ones face compliance notices; severely deficient ones face restriction. The L3 contractor working on the building benefits from a strong safety case — fewer surprises, clearer scope, better PAP coordination."
            onSite="Practical implication for the L3 supervisor: contributing accurate digital records, prompt findings, and high-quality cert documentation strengthens the PAP&apos;s safety case position with the BSR. The supervisor&apos;s contributions are part of the evidence base the BSR examines. A safety case backed by strong contractor records is materially more credible than one with thin or paper-only records. The reputational alignment between contractor and PAP works in both directions — the contractor benefits from working on a credible safety case; the PAP benefits from contractor record quality."
          >
            <p>Safety case review elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Risk identification adequacy — primary fire and structural, plus contributing factors.</li>
              <li>Strategy appropriateness — controls match identified risks; hierarchy of control applied.</li>
              <li>Evidence of effectiveness — testing records, monitoring data, near-miss capture.</li>
              <li>Residents engagement operational — strategy implemented, concerns addressed, response timescales met.</li>
              <li>Golden thread supports safety case — digital records, accessibility, accuracy.</li>
              <li>Periodic review and update — case is current.</li>
              <li>Outcomes range from acceptance to prosecution.</li>
              <li>Contractor record quality contributes to safety case credibility.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Scenario — alteration to a fire detection system</ContentEyebrow>

          <Scenario
            title="Extending fire detection coverage in an HRRB"
            situation={
              <>
                Your firm has been engaged to extend the existing fire detection
                and alarm system in an HRRB block of flats. The PAP — a managing
                agent — wants additional smoke detection in a newly-converted
                communal storage area that was previously a vacant boiler room.
                The existing system is BS 5839-1 Category L2, addressable
                technology, manufactured by a known industry supplier. The new
                detection needs to integrate seamlessly. You are L3-qualified and
                have the firm&apos;s sign-off for routine fire alarm work; the
                firm is BAFE SP203 registered and BS 5839 competent.
              </>
            }
            whatToDo={
              <>
                Pre-work coordination. Confirm scope with PAP and the fire risk
                assessor — the new detection should be consistent with the
                category and integrated logically (zone assignment, panel address
                allocation, cause-and-effect updates). Obtain commissioning
                protocol from the existing system manufacturer or the firm&apos;s
                competent designer. Confirm product compatibility with existing
                panel and devices — same manufacturer or compatible-certified
                third party. Confirm any cause-and-effect changes are documented
                and approved. Confirm fire-stopping arrangements where new
                cabling penetrates fire-rated walls or floors. During work:
                document each step; preserve photographs of installation; record
                device addresses and locations. Post-work: full system test
                including the existing devices to confirm no disruption from the
                alteration; functional test of new devices; cause-and-effect
                verification; updated zone plan and as-built drawings. Produce
                digital cert suitable for golden thread integration. Brief PAP
                on changes; flag for safety case update if the alteration is
                significant enough to warrant case revision. Provide cert and
                supporting documentation in PAP&apos;s required format. Update
                the building log book and the fire risk assessment trigger list.
                The alteration becomes part of the safety case evidence; the
                PAP&apos;s next periodic review will reflect the updated coverage.
              </>
            }
            whyItMatters={
              <>
                Fire detection / alarm work on HRRBs is exactly the kind of
                safety-critical activity BSA 2022 was designed to govern. The
                integration of work with the building&apos;s safety case is
                what makes the framework operational. A high-quality alteration
                that is integrated properly strengthens the safety case; a
                technically-good alteration that is not integrated leaves the
                safety case out of date and the building protected by an
                outdated risk assessment. The L3 supervisor&apos;s coordination
                with the PAP, accurate documentation, and prompt cert
                production are what bridges the gap between technical work and
                regulatory framework. The competence layers (BAFE SP203, BS
                5839 designer competence, NICEIC / NAPIT installer competence,
                operative training) all contribute to the credibility of the
                work.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>Fire detection and alarm — the BS 5839-1 framework</ContentEyebrow>

          <ConceptBlock
            title="Why BS 5839-1 categorisation matters on HRRBs"
            plainEnglish="BS 5839-1 (Fire detection and fire alarm systems for buildings — Code of practice for design, installation, commissioning and maintenance of systems in non-domestic premises) classifies fire alarm systems by category. L1 — protection of life, with manual call points and automatic detection throughout. L2 — life protection with detection in specified high-risk areas. L3 — life protection with detection in escape routes and certain adjoining rooms. L4 — detection in escape routes. L5 — bespoke design. P1 / P2 categories cover property protection. Higher categories provide earlier detection and faster evacuation. Post-Grenfell direction on HRRBs is generally towards higher categories — L1 or L2 where prior installations may have been L3 or below. BS 5839-6 covers domestic premises (single dwellings)."
            onSite="L3 supervisor on HRRB fire-alarm work: the category determines coverage, device count, wiring strategy, panel capacity, commissioning requirements. The PAP&apos;s safety case typically specifies the required category; the contractor designs to that specification. Where the category is being upgraded as part of remediation, the supervisor coordinates with fire engineer, panel manufacturer, design team. Commissioning to BS 5839-1 includes full system test, false-alarm management strategy, log-book set-up, handover to the responsible person. Periodic testing per BS 5839-1 Section 6 is the ongoing maintenance discipline."
          >
            <p>BS 5839-1 system categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>L1 — Life protection</strong> — manual call points + automatic detection throughout.</li>
              <li><strong>L2 — Life protection</strong> — manual call points + detection in specified high-risk areas + escape routes.</li>
              <li><strong>L3 — Life protection</strong> — manual call points + detection in escape routes and certain adjoining rooms.</li>
              <li><strong>L4 — Life protection</strong> — manual call points + detection in escape routes.</li>
              <li><strong>L5 — Life protection</strong> — bespoke design for specific objectives.</li>
              <li><strong>P1 — Property protection</strong> — automatic detection throughout.</li>
              <li><strong>P2 — Property protection</strong> — automatic detection in specified high-risk areas.</li>
              <li><strong>BS 5839-6</strong> — covers domestic premises (single dwellings).</li>
              <li><strong>Post-Grenfell direction</strong> — generally towards higher categories on HRRBs.</li>
              <li><strong>PAP safety case</strong> — specifies required category; contractor designs to specification.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Emergency lighting — BS 5266-1 framework"
            plainEnglish="BS 5266-1 (Emergency lighting — Code of practice for the emergency lighting of premises) sets the design and installation framework. Emergency lighting supports safe evacuation when normal lighting fails. Key elements: escape route illumination minimum 1 lux on the centre line; open area (anti-panic) lighting where occupancy is high; high-risk task area lighting for safety-critical tasks. Duration typically 1 hour for residential, 3 hours for high-risk areas. Testing per BS 5266 Section 11 — monthly functional test, annual full duration test, results logged. On HRRBs the emergency lighting system is safety-case-critical and routine test failures must be addressed promptly."
            onSite="L3 supervisor practical implication: emergency lighting on HRRBs is not an after-thought. System design responds to evacuation strategy (simultaneous, phased, stay-put). Battery selection and replacement programme part of long-term maintenance. Test logs part of golden thread. Any system fault flagged to PAP for safety case currency. Where the supervisor finds failed luminaires during routine work, prompt flagging to PAP and remedial action triggered through the firm&apos;s maintenance system."
          >
            <p>BS 5266-1 emergency lighting elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Escape route lighting</strong> — minimum 1 lux on centre line.</li>
              <li><strong>Open area (anti-panic) lighting</strong> — minimum 0.5 lux on floor.</li>
              <li><strong>High-risk task area lighting</strong> — 10% of normal lighting, 15 lux minimum.</li>
              <li><strong>Duration</strong> — typically 1 hour for residential, 3 hours for high-risk.</li>
              <li><strong>Battery technology</strong> — sealed lead-acid or lithium typically; replacement programme.</li>
              <li><strong>Monthly functional test</strong> — short duration, verify operation.</li>
              <li><strong>Annual full duration test</strong> — full battery discharge.</li>
              <li><strong>Test logs</strong> — part of golden thread; reviewed periodically.</li>
              <li><strong>Self-test luminaires</strong> — automate testing; modern installations.</li>
              <li><strong>System design</strong> — responds to evacuation strategy.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Lift safety on HRRBs — firefighters and evacuation lifts</ContentEyebrow>

          <ConceptBlock
            title="The lifts that matter for HRRB safety case"
            plainEnglish="HRRBs typically have one or more lifts that are safety-case-critical. Firefighters&apos; lifts (per BS EN 81-72) are designed to allow firefighters to reach upper floors during a fire — protected lobby, separate power supply, fire-rated cabling, specific control logic. Evacuation lifts (per BS EN 81-76) are designed for the safe evacuation of mobility-impaired residents during emergency — separate evacuation control mode, fire-rated cabling, integration with fire alarm. Both have specific BS 7671 + sectoral requirements for the electrical infrastructure. Lift safety is also governed by LOLER 1998 (Lifting Operations and Lifting Equipment Regulations) and PUWER 1998 with specific thorough examination requirements at 6-month intervals."
            onSite="L3 supervisor implication: electrical work on or near firefighters&apos; / evacuation lifts is HRRB safety-case-critical. Supply integrity must be maintained; fire-rated cabling specifications must be followed; testing of lift safety circuits must be verified after any work. Coordination with lift maintenance company and fire engineer typically required. Routine work in lift motor rooms / shaft top / pit areas needs careful planning — these are confined spaces and the supply may be safety-critical to other parts of the building."
          >
            <p>Lift safety on HRRBs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Firefighters&apos; lift — BS EN 81-72; allows firefighter access during fire.</li>
              <li>Evacuation lift — BS EN 81-76; safe evacuation of mobility-impaired residents.</li>
              <li>Fire-rated power and control cabling.</li>
              <li>Separate power supplies where required.</li>
              <li>Integration with fire alarm — automatic control logic.</li>
              <li>Protected lobbies at each floor served by firefighters&apos; lift.</li>
              <li>LOLER 1998 — thorough examination at 6-month intervals.</li>
              <li>PUWER 1998 — maintenance and inspection.</li>
              <li>Lift maintenance company coordination essential for any electrical work.</li>
              <li>Lift safety system part of safety case core.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Building registration with the BSR</ContentEyebrow>

          <ConceptBlock
            title="What MOR captures and what the L3 supervisor flags"
            plainEnglish="Mandatory Occurrence Reporting (MOR) is the BSA 2022 mechanism for prompt notification of safety-relevant events on HRRBs to the BSR. The MOR scope is wider than RIDDOR — it captures events that did not necessarily cause injury but reflect potential safety case inadequacy or building safety risk. The PAP holds the reporting duty; contractors and other parties flag findings to the PAP. The MOR Regulations 2022 set out the categories and timescales — &apos;safety occurrence&apos; reports require notification &apos;as soon as reasonably practicable&apos;, with full report within 10 days. Underpinning principle: surface safety concerns early so the safety case can be updated and risks managed before they cascade."
            onSite="L3 supervisor practical flagging: structural concerns (deflection, cracking, fixings failure), fire-stopping breaches (gaps in compartmentation walls or floors), fire detection / alarm faults (panel showing unresolved fault, devices missing or damaged), emergency lighting failures (large-scale), evacuation lift faults, smoke control system anomalies, external wall integrity issues (cladding damage, sealant failure). Each finding flagged to the PAP same day with photographs and location detail. The PAP decides whether MOR is triggered; the contractor&apos;s role is prompt accurate flagging."
          >
            <p>MOR trigger categories in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Structural failure or instability</strong> — deflection,
                cracking, fixing failure, settlement, vibration.
              </li>
              <li>
                <strong>Fire safety system failures</strong> — alarm panel
                unresolved faults, devices missing, emergency lighting failures,
                sprinkler isolation, smoke control inoperative.
              </li>
              <li>
                <strong>Compartmentation breaches</strong> — fire-stopping
                missing, fire doors damaged or wedged, walls / floors
                penetrated without restoration.
              </li>
              <li>
                <strong>External wall system concerns</strong> — cladding
                damage, sealant failure, cavity barrier missing, balcony
                integrity.
              </li>
              <li>
                <strong>Lift safety system failures</strong> — firefighters&apos;
                lift faults, evacuation lift faults, lift safety circuit
                anomalies.
              </li>
              <li>
                <strong>Defects threatening safety case validity</strong> — any
                finding that suggests the safety case assumes conditions
                materially different from what is actually present.
              </li>
              <li>
                <strong>Reportable in addition to RIDDOR triggers</strong> — not
                instead of; both regimes can apply.
              </li>
              <li>
                <strong>Timescale</strong> — initial notification as soon as
                reasonably practicable; full report within 10 days; PAP holds
                duty; contractor flags to PAP.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Higher-Risk Buildings (Management of Safety) Regulations 2023 — Reg 6 (Mandatory occurrence reporting)"
            clause={
              <>
                &quot;The principal accountable person must establish and operate
                a mandatory occurrence reporting system for the higher-risk
                building, which must — (a) enable persons working on or in the
                building to report relevant safety occurrences to the principal
                accountable person; (b) require the principal accountable person
                to report such occurrences to the regulator in accordance with
                the requirements of these Regulations.&quot;
              </>
            }
            meaning={
              <>
                The PAP&apos;s MOR system must be capable of receiving reports
                from people working on or in the building — including
                contractors. The contractor&apos;s flagging route is part of the
                PAP&apos;s system. The PAP then decides whether the finding
                triggers BSR notification under the prescribed timescales. The
                regulations establish the framework; published BSR guidance
                gives operational detail.
              </>
            }
            cite="Source: Higher-Risk Buildings (Management of Safety) Regulations 2023."
          />

          <SectionRule />
          <ContentEyebrow>Building registration with the BSR</ContentEyebrow>

          <ConceptBlock
            title="What goes into the building registration"
            plainEnglish="Every HRRB in occupation must be registered with the Building Safety Regulator. The PAP submits the registration which includes Key Building Information (KBI) — number of storeys, height, number of residential units, external wall materials, fire safety arrangements, evacuation strategy, structural features. The KBI is the BSR&apos;s baseline data for understanding the building, identifying risk patterns and prioritising regulatory attention. Registration is not a one-off — the KBI is updated as the building changes, and the BSR uses the dataset for thematic analysis (e.g. identifying clusters of buildings with similar cladding types after a national-level concern emerges)."
            onSite="L3 supervisor practical implication: any work that affects KBI-relevant features (external walls, structure, fire safety arrangements, residential unit count) feeds back into the registration update. The contractor flags the change to the PAP; the PAP determines whether registration update is required and submits accordingly. For electrical-trade work, the most likely KBI touchpoints are fire safety arrangements (alarm system, emergency lighting, evacuation lifts) and any change affecting residential unit configuration."
          >
            <p>Key Building Information categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building location and identification.</li>
              <li>Number of storeys above and below ground.</li>
              <li>Building height measured to top of topmost residential storey.</li>
              <li>Number of residential units.</li>
              <li>External wall materials and their fire performance characteristics.</li>
              <li>Cladding system details where present.</li>
              <li>Fire safety arrangements — alarm system, sprinklers, smoke control.</li>
              <li>Evacuation strategy — simultaneous, phased, stay-put.</li>
              <li>Structural features and load-bearing systems.</li>
              <li>PAP and any APs identified.</li>
              <li>BSR-published guidance on registration content.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Safety Act 2022 — s.79 (Registration of higher-risk buildings)"
            clause={
              <>
                &quot;The principal accountable person for a higher-risk building
                must apply to the regulator for the building to be registered.
                An application for registration must be made before the building
                is occupied (if the building is not occupied immediately after it
                is built) or, in the case of a building which is occupied at the
                commencement of section 79, within the period specified by the
                regulator.&quot;
              </>
            }
            meaning={
              <>
                s.79 is the registration duty. Pre-occupation registration for new
                builds; transitional registration for buildings already occupied at
                BSA 2022 commencement. The registration is the BSR&apos;s formal
                record of the HRRB and triggers the in-occupation regulatory regime.
                Failure to register is a serious offence; PAP may be prosecuted
                directly.
              </>
            }
            cite="Source: Building Safety Act 2022 (2022 c.30), s.79."
          />

          <SectionRule />
          <ContentEyebrow>The safety case in operation — beyond the document</ContentEyebrow>

          <ConceptBlock
            title="The safety case is a living system, not a static document"
            plainEnglish="The temptation when reading the safety-case requirements is to picture a single document filed away on a shelf. The Hackitt-inspired conception is the opposite: the safety case is a living system, continuously updated as the building changes, regularly reviewed against incident and near-miss data, with evidence captured of how the strategies are working in practice. The document is the artefact of the system — the strategies it describes are operational. Periodic reviews (typically annual) plus event-triggered updates (after alterations, after near-misses, after incidents) plus full revisions on major changes keep the case current. The L3 supervisor contributes operational data that feeds the system; the PAP&apos;s safety-case team integrates it."
            onSite="Practical implication: the safety case is not just a documentation requirement — it is a management framework. Contractor work that affects safety-case-relevant elements (fire detection, emergency lighting, structural fixings, fire-stopping) generates updates to the system, not just to a file. The supervisor&apos;s prompt and accurate reporting of finds, completions and any anomalies feeds the system&apos;s currency. A safety case that lags behind the actual building condition is exactly the failure mode the framework is designed to prevent."
          >
            <p>Safety case as living system:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Continuous updating as building changes (alterations, replacements, occupancy changes).</li>
              <li>Periodic review — typically annual at minimum.</li>
              <li>Event-triggered updates — after near-misses, incidents, mandatory occurrences.</li>
              <li>Strategy effectiveness evidence captured continuously.</li>
              <li>BSR can request safety case at any time — PAP produces without delay.</li>
              <li>Multiple parties contribute — PAP, AP, RP, contractors, residents, scheme inspectors.</li>
              <li>Living-system framing — document is artefact, strategies are operational.</li>
              <li>L3 supervisor reporting feeds the system&apos;s currency.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Resident engagement strategy — what it covers"
            plainEnglish="The resident engagement strategy is a required element of the safety case. It sets out how the PAP will engage residents on building safety — what information will be provided, how concerns can be raised, how the PAP will respond, how residents can participate in safety-relevant decisions. The strategy reflects Hackitt&apos;s finding that pre-Grenfell residents were systematically excluded from building-safety decisions affecting their own homes. The post-Grenfell direction is the opposite: residents are stakeholders in safety, not passive occupants. PAPs publish the strategy and operationalise it through newsletters, websites, complaint procedures, resident meetings, individual responses."
            onSite="L3 supervisor on HRRB site interacts with the resident engagement strategy in two ways. First, residents may approach during work — the contractor cooperates with the PAP&apos;s strategy (standard response, route concerns to PAP). Second, the contractor&apos;s work may need to be communicated to residents — the PAP&apos;s strategy specifies how (newsletter item, individual notification, resident meeting if significant). The supervisor flags the planned work to the PAP early enough for resident communication to happen before the work starts; this avoids the &apos;contractor turned up without warning&apos; complaint pattern."
          >
            <p>Resident engagement strategy elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Information provision — how residents are kept informed about safety arrangements.</li>
              <li>Complaint procedure — how concerns can be raised and timescales for response.</li>
              <li>Participation arrangements — for safety-relevant decisions.</li>
              <li>Newsletter / website / portal — standing communication channels.</li>
              <li>Notification of upcoming works — including contractor visits.</li>
              <li>Escalation route to BSR — where PAP response is inadequate.</li>
              <li>Recording of resident concerns and PAP response.</li>
              <li>Periodic review of strategy effectiveness.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Approved Document T and the wider regulatory picture</ContentEyebrow>

          <ConceptBlock
            title="Where BSA 2022 sits among the Building Regulations Approved Documents"
            plainEnglish="The BSA 2022 framework intersects with several Building Regulations Approved Documents that L3 supervisors regularly encounter. Approved Doc B (Fire Safety) is the most directly relevant — post-Grenfell amendments tightened external wall, cable, sprinkler, alarm and emergency lighting requirements. Approved Doc P (Electrical Safety in Dwellings) interacts via notifiable work and competent person schemes. Approved Doc L (Conservation of fuel and power) drives heat pump and LED retrofit, which on HRRBs feeds back into the safety case. Approved Doc S (Infrastructure for charging electric vehicles) sets EV charging infrastructure requirements with fire-safety considerations for HRRBs. Approved Doc T (Toilet accommodation) is less safety-case-relevant but appears in any major refurbishment scope."
            onSite="L3 supervisor framing on HRRB work: the Building Regulations and their Approved Documents are the technical baseline; the BSA 2022 framework wraps the regulatory process around them for HRRBs. Compliance with both is required. Where the supervisor needs to know &apos;what is the technical standard for this work?&apos; the Approved Document gives the answer; where the supervisor needs to know &apos;how does this work integrate with the HRRB framework?&apos; the BSA 2022 / PAP arrangements give the answer. The two work together rather than in conflict."
          >
            <p>Approved Documents most relevant to HRRB electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Approved Doc B</strong> — Fire safety; post-Grenfell tightening of external wall, cable CPR, sprinkler, alarm, emergency lighting requirements.</li>
              <li><strong>Approved Doc P</strong> — Electrical safety in dwellings; notifiable work + competent person schemes.</li>
              <li><strong>Approved Doc L</strong> — Conservation of fuel and power; heat pump, LED, EV charging, renewables drive.</li>
              <li><strong>Approved Doc S</strong> — Infrastructure for EV charging; new and renovated buildings.</li>
              <li><strong>Approved Doc M</strong> — Access to and use of buildings; affects evacuation arrangements.</li>
              <li><strong>Approved Doc 7</strong> — Materials and workmanship; cross-cutting fitness-for-purpose standard.</li>
              <li>BSA 2022 framework wraps the regulatory process around the Approved Document technical baselines.</li>
              <li>Compliance with both required for HRRB work.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 6.1 — PAP is the in-occupation HRRB dutyholder.",
            "PAP duties: register, safety case, residents engagement, golden thread, BSR coordination.",
            "Safety case is comprehensive living document — risks, strategies, evidence, residents, golden thread.",
            "Resident engagement is mandatory under BSA 2022.",
            "Golden thread = digital, accurate, accessible, secure. Paper-only inadequate for HRRBs.",
            "L3 contractor representative integrates work via digital records, PAP awareness, safety case update flags.",
            "Many electrical systems are safety case core — fire detection, emergency lighting, EV charging, lift safety.",
            "Failure to integrate with safety case creates BSR enforcement risk + Defective Premises Act long-tail liability.",
            "Mandatory occurrence reporting (MOR) — L3 supervisor flags safety-relevant findings to PAP same day.",
            "RP under RRFSO 2005 coexists with PAP — coordinate with both on fire-safety-relevant work.",
            "Fire Safety Act 2021 amendments confirm external walls and flat entrance doors within RP&apos;s remit.",
            "BSR enforcement powers: improvement / compliance / restriction notices, prosecution, direction including evacuation.",
            "Safety case is a living system — continuously updated as building changes, periodically reviewed, evidence-driven.",
          ]} />
          <Quiz title="HRRB dutyholders + safety case - knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6-1')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.1 BSA HRRBs</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6-3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">6.3 Approved Documents B / L / P</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
