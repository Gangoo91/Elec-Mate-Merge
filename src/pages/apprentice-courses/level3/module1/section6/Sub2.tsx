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
  { id: 'l3-m1-s6-sub2-pap', question: 'PAP main duties?', options: ['Just paperwork.', 'Register building with BSR; prepare and revise safety case; engage residents on building safety; manage building safety risks; maintain golden thread; report to BSR; respond to BSR notices.', 'Anything.', 'None.'], correctIndex: 1, explanation: 'PAP duties are extensive and ongoing. Single role per HRRB.' },
  { id: 'l3-m1-s6-sub2-safety-case', question: 'What\'s in a safety case?', options: ['Just photos.', 'Identification of building safety risks (fire and structural primary), strategies to manage them, evidence the strategies work, residents engagement strategy, links to golden thread, periodic review and update.', 'Insurance docs.', 'Customer ratings.'], correctIndex: 1, explanation: 'Safety case is the comprehensive evidence document. Living document; updated as the building changes.' },
  { id: 'l3-m1-s6-sub2-electrical', question: 'How does electrical work integrate with the safety case?', options: ['Doesn\'t.', 'EIC at install; EICR cycles; alteration certs; commissioning records of fire detection and alarm, EV charging electrical infrastructure, emergency lighting; design records; product specifications. All become part of golden thread evidence the safety case relies on.', 'Random.', 'Customer driven.'], correctIndex: 1, explanation: 'Electrical records are foundational to the safety case for many risks. Fire detection, emergency lighting, EV charging all electrical-system dependent.' },
];

const quizQuestions = [
  { id: 1, question: 'How often does the safety case need updating?', options: ['Never.', 'Living document - updated when significant changes occur (alterations, replacements, occupancy changes), after incidents / near-misses, periodically (PAP determines but typically annually). BSR can request review.', 'Once.', 'Every decade.'], correctAnswer: 1, explanation: 'Continuous; updated as the building evolves.' },
  { id: 2, question: 'What\'s the residents engagement strategy?', options: ['Optional.', 'Required element of safety case. PAP must engage residents on building safety - communication, complaints procedure, opportunity to raise concerns, information about safety arrangements. BSA 2022 explicitly empowers resident voice.', 'Marketing.', 'Sales.'], correctAnswer: 1, explanation: 'Resident engagement is mandatory. Post-Grenfell direct response to lack of resident voice in pre-2017 framework.' },
  { id: 3, question: 'Who can request to see the safety case?', options: ['No-one.', 'BSR (always); residents (rights under BSA 2022); contractors working on the building (so they can integrate their work safely); fire and rescue service (RRFSO 2005 powers).', 'Customer only.', 'Architect only.'], correctAnswer: 1, explanation: 'Multiple parties can / must access. Transparency is fundamental.' },
  { id: 4, question: 'How does the golden thread work for electrical records?', options: ['Paper only.', 'Digital, accurate, accessible, secure. Cloud-based certification platforms (NICEIC online, NAPIT online, contractor systems) produce records suitable for golden-thread integration. Paper-only certs increasingly inadequate for HRRB work.', 'Verbal.', 'Random.'], correctAnswer: 1, explanation: 'Golden thread = digital. Paper certs need scanning and indexing; born-digital is preferred.' },
  { id: 5, question: 'What happens if the safety case is inadequate?', options: ['Nothing.', 'BSR can serve compliance notices; can ultimately direct evacuation if risk is severe; PAP can be prosecuted for failure to maintain safety case; Defective Premises Act + civil claims if defects later cause harm.', 'Just a warning.', 'Customer complains.'], correctAnswer: 1, explanation: 'Real consequences. BSR has prosecution and notice powers.' },
  { id: 6, question: 'What\'s the L3 contractor representative\'s role on HRRB work?', options: ['Same as any site.', 'Verify HRRB status; identify PAP / AP; integrate work plan with safety case; produce digital records suitable for golden thread; cooperate with PAP requests for information; brief team on HRRB-specific arrangements.', 'Random.', 'Customer focus only.'], correctAnswer: 1, explanation: 'L3 contractor representative operationalises BSA 2022 awareness and integration on site.' },
  { id: 7, question: 'Are buy-to-let landlords typically PAPs?', options: ['Always.', 'Only if they own / control structure / exterior of HRRB. Most BTL landlords own individual flats, not the whole building - the freeholder / managing agent is typically PAP. Single ownership of an HRRB rare; multi-leasehold structures common.', 'Never.', 'Random.'], correctAnswer: 1, explanation: 'PAP determined by ownership / control of structure. Complex in multi-leasehold buildings.' },
  { id: 8, question: "How does the L3 cooperate with the PAP's residents engagement?", options: ["Doesn't.", "Brief residents (where they're affected by work) per the PAP's strategy. Provide information for newsletter / notices. Respond to resident questions about the work. Handle complaints via PAP's route.", "Hide.", "Random."], correctAnswer: 1, explanation: "Resident engagement extends to contractors' work where relevant. L3 supervisor cooperates with PAP's strategy." },
];

const faqs = [
  { question: 'Can a small electrical alteration trigger safety case update?', answer: 'Significant alterations - yes. Routine maintenance - usually no. PAP makes the call; the contractor flags the work for PAP awareness.' },
  { question: 'How do I know who the PAP is?', answer: 'Ask the managing agent / building manager / customer. The PAP should be identified in safety arrangements; if no-one knows, that itself is a red flag.' },
  { question: 'Are emergency lighting tests part of golden thread?', answer: 'Yes - emergency lighting is safety-critical for the building\'s evacuation strategy. Test records, maintenance records, repair records all part of the golden thread.' },
  { question: 'What if the PAP doesn\'t engage with my work plan?', answer: 'Document the attempt. Escalate to firm. Don\'t proceed with significant common-parts work without PAP engagement; the alternative creates liability for the firm and potentially the PAP.' },
  { question: 'How do I get my certs into the golden thread?', answer: 'Work with the PAP\'s document management arrangements. Some PAPs have integrated systems (cert is uploaded directly); others receive certs and manually integrate. Confirm at start of project.' },
  { question: 'Does the golden thread requirement apply to all building records or just safety-critical ones?', answer: 'Primarily safety-critical (design, materials, installation, maintenance, alterations affecting structure / fire / safety systems). Routine non-safety records less critical.' },
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
            "Safety case is comprehensive living document - identifies risks, strategies, evidence, residents engagement, golden-thread links.",
            "L3 contractor representative integrates electrical work into safety case + golden thread via digital records.",
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

          <RegsCallout source="Building Safety Act 2022 - s.83 (Safety case)" clause={<>"The principal accountable person for a higher-risk building must - (a) prepare a safety case report for the building, and (b) keep the safety case report under review and revise it as appropriate."</>} meaning={<>The safety case duty. PAP prepares and continuously revises. The safety case is the comprehensive evidence that the building is being safely managed and the strategies for managing risks are working.</>} cite="Source: Building Safety Act 2022 (2022 c.30), s.83 - verbatim from legislation.gov.uk." />

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

          <RegsCallout source="Regulatory Reform (Fire Safety) Order 2005 — Article 9" clause={<>&quot;The responsible person must make a suitable and sufficient assessment of the risks to which relevant persons are exposed for the purpose of identifying the general fire precautions he needs to take to comply with the requirements and prohibitions imposed on him by or under this Order.&quot;</>} meaning={<>The RP&apos;s fire risk assessment duty. &quot;Suitable and sufficient&quot; mirrors the MHSWR Reg 3 standard. Five-employee threshold for written record. The RP&apos;s FRA drives the design and maintenance of fire alarm, emergency lighting, fire-fighting equipment and means of escape — all touching electrical installation work.</>} cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 9 — verbatim from legislation.gov.uk." />

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

          <RegsCallout source="Fire Safety Act 2021 — s.1 (Premises to which the Order applies)" clause={<>&quot;Where a building contains two or more sets of domestic premises, the things to which [RRFSO] article 6(1A) applies are — (a) the building&apos;s structure and external walls and any common parts, and (b) all doors between the domestic premises and common parts.&quot;</>} meaning={<>The Fire Safety Act 2021 amendment clarifies that the RP&apos;s RRFSO duties extend to external walls (cladding) and flat entrance doors in multi-occupancy residential buildings. Direct response to Grenfell — closes a perceived gap in pre-2021 RRFSO scope. Reaches contractor electrical work where penetrations through external walls / flat doors are involved.</>} cite="Source: Fire Safety Act 2021 (2021 c.24), s.1 — verbatim from legislation.gov.uk." />

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
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 6.1 - PAP is the in-occupation HRRB dutyholder.",
            "PAP duties: register, safety case, residents engagement, golden thread, BSR coordination.",
            "Safety case is comprehensive living document - risks, strategies, evidence, residents, golden thread.",
            "Resident engagement is mandatory under BSA 2022.",
            "Golden thread = digital, accurate, accessible, secure. Paper-only inadequate for HRRBs.",
            "L3 contractor representative integrates work via digital records, PAP awareness, safety case update flags.",
            "Many electrical systems are safety case core - fire detection, emergency lighting, EV charging, lift safety.",
            "Failure to integrate with safety case creates BSR enforcement risk + Defective Premises Act long-tail liability.",
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
