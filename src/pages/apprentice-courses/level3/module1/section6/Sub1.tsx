/**
 * Module 1 · Section 6 · Subsection 1 - Building Safety Act 2022 - HRRBs and dutyholders
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * Layered depth from 2357 Unit 601 ELTK01 - going deeper on Section 1.7 BSA 2022 intro
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'BSA 2022 - HRRBs and dutyholders | Level 3 Module 1.6.1 | Elec-Mate';
const DESCRIPTION = 'L3 deeper on BSA 2022 - HRRB definition, in-occupation duty holders (PAP / AP / RP), Building Safety Regulator gateways, and the operational impact on electrical contractors.';

const checks = [
  { id: 'l3-m1-s6-sub1-hrrb', question: 'HRRB definition?', options: [
    'The extent to which a design facilitates safe and efficient construction, minimising foreseeable risks to workers during the build process',
    'Accumulation of combustible waste, blocked escape routes, obstructed fire exits, and stored materials near heat sources all increase fire risk',
    '18m+ in height OR 7+ storeys, AND containing 2+ residential units. Per Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023.',
    'Using the CMMS effectively for day-to-day maintenance tasks, understanding how your data contributes to maintenance planning, and producing accurate records',
  ], correctIndex: 2, explanation: 'Memorise: 18m / 7 storeys + 2 residential. Hospitals and care homes also covered for design / construction phase.' },
  { id: 'l3-m1-s6-sub1-pap', question: 'Who\'s the Principal Accountable Person?', options: [
    'Prepare thoroughly (reduces uncertainty), practise relaxation techniques, maintain normal routines before the assessment, visualise successful outcomes, and remind yourself that you have been signed off because you are ready',
    'Single person per HRRB responsible for the structure and exterior. Registers the building, prepares safety case, engages residents, holds golden thread. Reg 4 of BSA 2022 Part 4.',
    'Implement the contingency rescue procedure immediately — the 5-15 minute critical window for suspension trauma means an alternative rescue method must be used without delay',
    'Systematic monitoring of workers\\\\\\\' health through questionnaires, physical checks, or clinical examinations to detect early signs of MSDs, required where the risk assessment identifies a residual risk of MSDs',
  ], correctIndex: 1, explanation: 'PAP is THE in-occupation dutyholder. Single per building.' },
  { id: 'l3-m1-s6-sub1-gateways', question: 'Three BSA 2022 gateways?', options: [
    'The initial neurochemical response of an emotion surges and then dissipates within approximately 90 seconds — any emotional experience lasting longer is being sustained by our own thoughts and self-talk',
    'Identify and document all the ways an asset can fail, the causes of each failure mode, and the effects and consequences of each failure on operations, safety and the environment',
    'Reject — measured exceeds 0.8 × table max, which means the hot Zs in service will probably exceed Table 41.3 max. Investigate: confirm the device, recalculate the design Zs, and either upsize the cable or accept the device must be downrated.',
    'Gateway 1 at planning (fire safety + access). Gateway 2 pre-construction (BSR design review; no construction without approval). Gateway 3 pre-occupation (BSR sign-off against design and golden thread; no occupation without approval).',
  ], correctIndex: 3, explanation: '1 planning, 2 pre-construction, 3 pre-occupation. Fail any = stop.' },
];

const quizQuestions = [
  { id: 1, question: 'Why was BSA 2022 enacted?', options: [
    'Review the grading descriptors, understand what each grade requires, practise to the distinction standard, and seek feedback from your training provider',
    'Response to Grenfell (2017) and Hackitt Review (2018). Addresses fragmented regulation, weak competence, unclear accountability.',
    'Using AI to identify individual appliance consumption from whole-building smart meter data',
    'From the load side of the RCD between L and PE — at the furthest practicable point on each circuit it protects, with both 0° and 180° starting phase',
  ], correctAnswer: 1, explanation: 'Grenfell + Hackitt are the policy origins.' },
  { id: 2, question: 'What\'s the Building Safety Regulator?', options: [
    'Visually inspect for storage damage, check the coil resistance, verify the contacts are not corroded or contaminated, ensure the operating mechanism moves freely, and confirm the component is within its shelf-life (if applicable)',
    'It is doing its job — the freezer likely has earth leakage; explain we will investigate, and recommend repair/replacement of the appliance',
    'Function within HSE. Three statutory functions: oversee building safety; facilitate competence improvement; lead implementation of HRRB regulatory regime including gateway approvals.',
    'Employees must make full and proper use of systems of work provided, cooperate with their employer on health and safety, and report any hazards or concerns',
  ], correctAnswer: 2, explanation: 'BSR sits within HSE. Three functions cover broad and HRRB-specific.' },
  { id: 3, question: 'What\'s the golden thread?', options: [
    'The excess materials must be removed immediately and the scaffold checked for damage before resuming use',
    'A bulk purchase of components before the manufacturer discontinues them, providing a strategic buffer stock to support equipment maintenance during the transition to an alternative',
    'The first time someone experiences psychotic symptoms; early intervention leads to significantly better long-term outcomes',
    'Digital, accurate, accessible, secure information set covering design, construction and ongoing management of an HRRB. Held by Accountable Person.',
  ], correctAnswer: 3, explanation: 'Golden thread is THE information system for HRRBs. Records persist for life of building.' },
  { id: 4, question: 'How many in-occupation dutyholder types are defined?', options: [
    'Three: Principal Accountable Person (PAP - one per HRRB), Accountable Persons (AP - multiple possible), Responsible Person (RP under RRFSO 2005). Building Safety Manager (BSM) role optional.',
    'Restricting system access based on the user\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s role, ensuring each person has only the minimum permissions needed for their job function',
    'Send everything — drawings, calcs, schedules, device specs — and explain that BS 7671 Reg 132.13 requires complete documentation and you keep the master copy on file for at least the design life of the installation.',
    'Be labelled with captions explaining what the image shows, the date, location and asset reference, and placed in context within the report near the relevant text',
  ], correctAnswer: 0, explanation: 'PAP / AP / RP. BSM is optional appointment.' },
  { id: 5, question: 'What\'s the safety case?', options: [
    'Installers of standard domestic and small commercial installations — it pulls the most-used BS 7671 tables (cable sizing, diversity, ratings) into a pocket-sized reference and explains the standard install methods.',
    'Document setting out how building safety risks are identified, mitigated and managed for the HRRB. Includes fire and structural risks, mitigation strategies, residents engagement, golden-thread links.',
    'RASA provides the structural process (receive, appreciate, summarise, ask) while Covey\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s empathetic listening adds the depth of emotional understanding and perspective-taking within each step',
    'The advance guardrail system must be lowered in the correct sequence before each frame section is removed, following the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s specific AGR dismantling procedure',
  ], correctAnswer: 1, explanation: 'Safety case is the PAP\'s comprehensive evidence that the building is being safely managed.' },
  { id: 6, question: 'What\'s the Defective Premises Act change?', options: [
    'Generally discouraged for power circuits due to solder creep under load, but acceptable for specific signal and electronic applications where mechanical stress is minimal',
    'Have a maximum of 4 mm exposed metal tip, finger guards, fused leads where appropriate, and be CAT III/IV rated for the system voltage',
    'BSA 2022 s.135 extended limitation: 30 years retrospective for residential defect claims; 15 years prospective. Significant impact on contractor liability and document retention.',
    'Function within HSE. Three statutory functions: oversee building safety; facilitate competence improvement; lead implementation of HRRB regulatory regime including gateway approvals.',
  ], correctAnswer: 2, explanation: '30 years retrospective is the headline. Long-tail liability for residential work.' },
  { id: 7, question: 'How does BSA 2022 affect electrical contractors not working on HRRBs?', options: [
    'The highest average power demand recorded over any half-hour period since the MDI was last reset, which is used by the DNO for billing and supply capacity planning',
    'A cognitive bias where people with limited knowledge or competence in a domain significantly overestimate their ability, while experts tend to underestimate theirs',
    'Every person who is or may be affected by the risk and who needs the information to manage it — this typically includes the principal designer, principal contractor, other designers, contractors, and ultimately the end users via the health and safety file',
    'Indirectly - 30-year DPA liability, competence framework changes, Building Regs amendments (Approved Doc B fire safety especially), regulatory direction-of-travel emphasising traceability and certified competence.',
  ], correctAnswer: 3, explanation: 'BSA 2022\'s indirect effects reach all residential work.' },
  { id: 8, question: 'What\'s the L3 contribution to BSA 2022 awareness?', options: [
    'Recognise HRRB sites; understand the gateway regime and PAP role; verify CPP integrates with golden thread; produce digital cert records (not paper-only); cooperate with PAP / AP requests for information.',
    'The names of all persons who have been briefed on the method statement, confirming they understand the hazards, controls and their responsibilities',
    'The operative should immediately cease work and descend to ground level — metal towers attract lightning and the elevated position increases strike risk',
    'Immediately prohibit use of the scaffold, tag it as unsafe, investigate who made the modifications and why, have the scaffold redesigned or returned to its approved configuration by a competent scaffolder, and re-inspect before permitting reuse',
  ], correctAnswer: 0, explanation: 'L3 contribution operationalises BSA 2022 awareness on site.' },
];

const faqs = [
  { question: 'Who exactly registers the building under BSA 2022?', answer: 'Principal Accountable Person registers with the Building Safety Regulator. Registration includes the safety case and key building information.' },
  { question: 'When did the HRRB regime take effect?', answer: 'BSA 2022 received Royal Assent April 2022. HRRB regime in occupation rolled out from 2023 onwards; gateway regime for new construction phasing in.' },
  { question: 'Are commercial buildings covered by BSA 2022?', answer: 'Care homes and hospitals covered for design / construction phase. In-occupation regime focused on residential HRRBs. Wider commercial buildings affected indirectly via competence framework.' },
  { question: 'Can existing HRRBs be retro-improved to BSA standard?', answer: 'Existing buildings being assessed against the new safety case framework. Where structural or fire-safety deficiencies are identified, remediation may be required — hence the cladding remediation programmes nationally.' },
  { question: 'How does golden thread record keeping affect electrical certs?', answer: 'EIC, EICR, alteration certs, design records all become part of golden thread for HRRBs. Digital record format expected; paper-only insufficient.' },
  { question: 'What if I am an L3 working on an HRRB — do I need special training?', answer: 'No specific BSA training required for routine L3 work. Awareness of HRRB context, PAP role, and golden-thread integration is part of L3 / supervisor competence.' },
  { question: 'Does the 18m / 7 storey threshold include below-ground storeys?', answer: 'The Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023 measure height from ground level to the top of the floor surface of the topmost residential storey. Below-ground storeys do not generally count towards the height calculation; the threshold is about how far residents are from ground level for evacuation considerations.' },
  { question: 'How does BSA 2022 affect the way the Building Safety Regulator works with HSE?', answer: 'The BSR sits within HSE structurally and shares HSE&apos;s enforcement powers framework. The BSR has its own dedicated leadership but draws on HSE resources for investigation and inspection. Coordination on dual-relevance cases is built into the regulatory architecture.' },
  { question: 'What is the relationship between BSA 2022 and the Fire Safety Act 2021?', answer: 'Both are post-Grenfell legislation. Fire Safety Act 2021 amended RRFSO 2005 to clarify external walls and entrance doors are within the Responsible Person&apos;s remit. BSA 2022 created the broader HRRB regime with PAPs, safety cases and the BSR. They work together — RP duties run inside the wider BSA 2022 framework on HRRBs.' },
  { question: 'How long is the PAP&apos;s record-keeping requirement under BSA 2022?', answer: 'The golden thread is intended to last the life of the building — records transfer with ownership of the PAP role. This is materially longer than RIDDOR&apos;s 3-year minimum, the standard Defective Premises Act limitation (now 15 years prospective) or typical commercial document retention. Lifecycle thinking is built into the framework.' },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 6</button>
          <PageHero eyebrow="Module 1 · Section 6 · Subsection 1" title="Building Safety Act 2022 - HRRBs and dutyholders" description="Remember from Section 1.7 - BSA 2022 framework intro. This Sub goes operational - HRRB definition, dutyholder roles, BSR gateways, golden thread implications for electrical work." tone="emerald" />
          <TLDR points={[
            "HRRB = 18m+ height OR 7+ storeys, AND 2+ residential units. Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023.",
            "In-occupation dutyholders: Principal Accountable Person (PAP, one per HRRB), Accountable Persons (AP), Responsible Person (RP under RRFSO 2005).",
            "Three gateways via Building Safety Regulator: 1 planning, 2 pre-construction, 3 pre-occupation. Fail any = stop.",
            "Golden thread = digital, accurate, accessible, secure information set held by the PAP for the life of the building. Paper-only certs increasingly inadequate.",
            "Defective Premises Act 1972 extended by BSA 2022 s.135 — 30 years retrospective for past residential defect claims, 15 years prospective for new work.",
            "Indirect effects reach all residential work — record retention, competence framework, Building Regs amendments (especially Approved Doc B), procurement direction.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify the HRRB definition (18m / 7 storeys + 2 residential units).",
            "State the in-occupation dutyholder roles - PAP, AP, RP, optional BSM.",
            "Identify the three BSA 2022 gateways and the BSR oversight role.",
            "Describe the golden thread of information requirement.",
            "Recognise the Defective Premises Act limitation extension (30 years retrospective).",
            "Recognise indirect impact on non-HRRB residential work.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>HRRB framework</ContentEyebrow>
          <ConceptBlock title="The HRRB definition and dutyholder cascade" plainEnglish="HRRB = 18m+ in height OR 7+ storeys, AND 2+ residential units (Higher-Risk Buildings Regs 2023). Care homes and hospitals also covered for design / construction phase but in-occupation regime applies primarily to residential definition." onSite="L3 awareness: when working on a building near the threshold, ask the responsible person about HRRB status. Misidentification can mean missed Reg 4 client awareness check + missed integration with PAP arrangements.">
            <p>In-occupation dutyholders:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Principal Accountable Person (PAP)</strong> - single per HRRB; responsible for structure and exterior; registers building; prepares safety case; engages residents; holds golden thread.</li>
              <li><strong>Accountable Persons (AP)</strong> - multiple possible; each responsible for repair of a part of common parts including structure.</li>
              <li><strong>Responsible Person (RP)</strong> - under Regulatory Reform (Fire Safety) Order 2005; may be same as or different from PAP.</li>
              <li><strong>Building Safety Manager (BSM)</strong> - optional; appointed by PAP for day-to-day management where PAP doesn't have direct competence. (Mandatory requirement was withdrawn but role remains appropriate in many cases.)</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023" clause={<>"A building is a higher-risk building for the purposes of Part 4 of the Building Safety Act 2022 if it - (a) is at least 18 metres in height or has at least 7 storeys, and (b) contains at least 2 residential units."</>} meaning={<>The HRRB definition. 18m / 7 storeys are the height/storey thresholds; 2+ residential units is the residential threshold. Both must apply for HRRB status under the in-occupation regime.</>} cite="Source: Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023 (SI 2023/275)." />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>The Building Safety Regulator and gateways</ContentEyebrow>
          <ConceptBlock title="BSR oversight via three gateways" plainEnglish="BSR sits within HSE. Three statutory functions: building safety oversight, competence facilitation, HRRB regulatory regime. The HRRB regime uses three gateways for new construction." onSite="For an electrical contractor on an HRRB project, the gateway regime means design records and product traceability become non-negotiable. Late changes can trigger gateway re-review with significant programme impact.">
            <p>The three gateways:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Gateway 1 (planning)</strong> - fire safety and access considered before planning approval.</li>
              <li><strong>Gateway 2 (pre-construction)</strong> - BSR reviews design and construction control plan; NO construction without approval.</li>
              <li><strong>Gateway 3 (pre-occupation)</strong> - BSR signs off as-built against approved design and golden thread; NO occupation without approval.</li>
            </ul>
            <p>Operational impact for contractors:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design records, calculations, product specifications all formal.</li>
              <li>Substitutions need design-team approval (not site decisions).</li>
              <li>Operative competence checked; cards / certifications carried.</li>
              <li>Site induction includes BSA-specific items.</li>
              <li>Records produced in digital format suitable for golden thread.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Building Safety Act 2022 - s.2(1)" clause={<>"The regulator&apos;s general functions are - (a) the building function, which is to secure the safety of people in or about buildings in relation to risks arising from buildings, and to improve the standard of buildings; (b) the competence function, which is to facilitate the improvement of the competence of industry; (c) such other functions as may be conferred on the regulator by or under any enactment."</>} meaning={<>BSR is established with three functions. Building safety + competence + others. Overseen by the HSE board; has statutory powers including notices and prosecution.</>} cite="Source: Building Safety Act 2022 (2022 c.30), s.2." />

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Indirect effects on all residential work</ContentEyebrow>
          <ConceptBlock title="Why BSA 2022 reaches beyond HRRBs" plainEnglish="Even electricians who never work on an HRRB are affected indirectly: 30-year DPA liability, competence framework, Building Regs amendments, regulatory direction-of-travel emphasising traceability." onSite="L3 awareness: keep digital records indefinitely; design records form part of audit trail; competence certifications matter more for framework eligibility; Approved Document B (fire safety) tightening affects emergency lighting and fire alarm work.">
            <p>Indirect impact areas:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>EIC / EICR record retention - extended in practice (digital indefinite).</li>
              <li>Design records (cable calcs, fault-loop calcs) part of audit trail.</li>
              <li>Competence framework reshaping JIB grading and CPD requirements.</li>
              <li>Product traceability matters more for forensic claims.</li>
              <li>Approved Document B (fire safety) tightening affects fire-rated cable, smoke detection, emergency lighting.</li>
              <li>Defective Premises Act 30-year retrospective limit reaches old residential work.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Defective Premises Act and the long-tail liability</ContentEyebrow>
          <ConceptBlock title="30-year retrospective for residential" plainEnglish="The Building Safety Act 2022 s.135 extended the Defective Premises Act 1972 limitation period to 30 years retrospective for past residential defect claims, and 15 years prospective for new work. Existing claims previously time-barred can now be brought; new work carries 15-year liability tail. The change applies to dwellings broadly, not only HRRBs." onSite="L3 supervisor culture: digital record retention indefinite; design records retained; certification packs complete and traceable for any residential work. Paper certs lost in 5 years are no defence in 25 years. The amendment is the most operationally significant non-HRRB consequence of BSA 2022.">
            <p>Limitation effects in operation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>30-year retrospective limit applies to claims under DPA 1972 s.1 (fitness for habitation duty).</li>
              <li>15-year prospective limit for new work after BSA 2022 commencement (June 2022).</li>
              <li>Applies to any dwelling, not just HRRBs.</li>
              <li>Includes claims by leaseholders, freeholders and occupiers.</li>
              <li>Covers design, materials, installation and supervision failings.</li>
              <li>Drives long-term record retention as practical defence.</li>
              <li>Affects contractor PI insurance pricing and coverage availability.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Building Safety Act 2022 — s.135 (Limitation period for actions under Defective Premises Act 1972)" clause={<>&quot;In the Limitation Act 1980 (as amended by this section), in section 4B... the limitation period is 30 years where the relevant period began before the day on which section 135(1) of the Building Safety Act 2022 came into force; and 15 years in any other case.&quot;</>} meaning={<>The limitation extension. 30 years retrospective is the headline; 15 years prospective is the new normal. The L3 supervisor on residential work treats every job as creating long-tail liability — keep records accordingly.</>} cite="Source: Building Safety Act 2022 (2022 c.30), s.135." />

          <ConceptBlock title="Mandatory occurrence reporting for HRRBs" plainEnglish="BSA 2022 introduces mandatory occurrence reporting for HRRBs in occupation — defined safety occurrences (structural concerns, fire spread events, missing or defective fire-stopping) must be reported by the PAP to the BSR within prescribed timescales. Sits alongside RIDDOR for HRRBs but has wider trigger scope." onSite="L3 supervisor on HRRB work who finds something safety-relevant during routine works (e.g. fire-stopping breach in a riser, structural deflection in a corridor) flags it to the PAP same day. The PAP&apos;s mandatory occurrence duty depends on the contractor surfacing the finding promptly.">
            <p>Mandatory occurrence categories include:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Structural failure or instability events.</li>
              <li>Fire safety system failures (alarm, emergency lighting, smoke control).</li>
              <li>Compartmentation breaches (fire-stopping, fire doors).</li>
              <li>External wall system concerns (cladding integrity).</li>
              <li>Lift safety system failures (firefighters&apos; lift, evacuation lift).</li>
              <li>Defects threatening building safety case validity.</li>
              <li>Reportable in addition to (not instead of) RIDDOR triggers.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Building Safety Levy and the new economic context" plainEnglish="The Building Safety Levy applies to certain residential developments to fund remediation of historical building safety defects. Affects developer / client economics on new HRRB-adjacent residential development. Indirectly affects contractor commercial environment as developers pass cost pressures down the supply chain." onSite="L3 awareness: the BSA 2022 economic landscape includes the levy and the cladding remediation programmes. Many residential projects are now retrospective remediation work — replacing dangerous cladding, upgrading fire-stopping, retrofitting fire alarms. Significant trade work driven by the new framework.">
            <p>Levy and remediation context:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building Safety Levy on certain residential developments.</li>
              <li>Building Safety Fund for cladding remediation (existing buildings).</li>
              <li>Developer remediation contract obligations under BSA 2022.</li>
              <li>Cladding remediation programmes nationally.</li>
              <li>Fire-stopping retrofit programmes.</li>
              <li>Sprinkler retrofit on some buildings (additional protection).</li>
              <li>Fire alarm upgrades to BS 5839-1 Category L1/L2 in some buildings.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Competence framework changes — BSA-driven" plainEnglish="BSA 2022 set in motion a wider competence framework reform — the BSI Built Environment Competence Framework (BS 8670 series). New requirements for individuals working on HRRBs to demonstrate competence appropriate to role; for organisations to demonstrate competence management systems; for designers and contractors to evidence competence at appointment. Reaches beyond HRRBs over time as professional bodies and schemes adopt." onSite="L3 supervisor implication: JIB grading, NICEIC / NAPIT registration, manufacturer-specific certifications, ECS card all gain weight as competence evidence. Maintaining current registration and CPD becomes a procurement-relevant practice, not just a regulatory tick. Documented training records part of personal employability for HRRB-relevant work.">
            <p>Competence framework elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 8670 series — Built Environment Competence Framework standards.</li>
              <li>Role-specific competence definitions for HRRB work.</li>
              <li>Organisational competence management systems.</li>
              <li>Independent assessment routes (CABE, RICS, IET / IEng / CEng).</li>
              <li>JIB grading + scheme registration as evidence layers.</li>
              <li>CPD records gaining procurement relevance.</li>
              <li>Manufacturer-specific certifications for system installs (heat pumps, EV chargers, fire alarms).</li>
              <li>Direction-of-travel reaches non-HRRB work over time.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Resident voice — the BSA 2022 cultural change" plainEnglish="A central thread of BSA 2022 is amplifying resident voice in building safety. Residents have new rights to information, to raise concerns, to participate in safety decisions. PAP has a statutory duty to engage residents and respond to concerns. Failure to respond can be reported to BSR." onSite="L3 supervisor on HRRB work: residents may approach with questions about the work, fire safety, the building. Respond respectfully and direct to the PAP for matters outside scope. Do not dismiss; the resident voice is the BSA 2022 system working as designed.">
            <p>Resident rights and duties:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Right to receive information about building safety arrangements.</li>
              <li>Right to raise concerns to the PAP and receive a response.</li>
              <li>Right to escalate to BSR if PAP does not respond appropriately.</li>
              <li>Right to participate in residents engagement strategy.</li>
              <li>Duty not to compromise building safety (e.g. removing fire doors, blocking exits).</li>
              <li>Duty to allow access for safety-related inspections and maintenance.</li>
              <li>Resident voice is the post-Grenfell cultural change at the heart of the Act.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Treating an HRRB job as just another commercial site" whatHappens={<>L3 doesn&apos;t recognise HRRB status; doesn\'t engage with PAP\'s safety case or golden thread; produces paper-only certs; gateway 3 review later finds gaps; project delayed.</>} doInstead={<>Identify HRRB status on arrival. Engage with PAP / AP / BSR-registered contractor for the project. Produce digital records integrated with golden thread.</>} />

          <CommonMistake title="Substituting products on an HRRB site without approval" whatHappens={<>L2 mate substitutes a different brand of MCB &quot;to save a day&quot;; not flagged to design team; gateway 3 review picks up the discrepancy; building can\'t be occupied; back-charged subcontractor.</>} doInstead={<>No site substitutions on HRRB. Equivalents need design team written approval. Slower but compliant.</>} />

          <Scenario title="Identifying an HRRB at the start of a job" situation={<>Your firm has been engaged for a small alteration in a residential block. Walking the site, you count 7 storeys above ground (residential floors 1-7); building approximately 22m to top occupied storey. Customer is a managing agent; says they manage \"a few buildings\".</>} whatToDo={<>Pause. Building meets HRRB threshold (22m, 7 storeys, multiple residential units). Confirm with managing agent: is the building registered as HRRB? Who\'s the PAP? Has a safety case been prepared? Even small alterations to common parts may need PAP approval. Phone firm\'s contracts manager; brief the situation. Action depends on the work scope: routine domestic-side work in flat may need minimal HRRB integration; landlord-side common-parts work likely needs PAP awareness check + golden-thread integration. Don\'t proceed with significant common-parts work without clarifying. Document the HRRB identification in your dynamic risk assessment.</>} whyItMatters={<>HRRB identification is the L3 supervisor\'s gateway to BSA 2022 compliance. Misidentification skips the PAP awareness check and the golden-thread integration; the work proceeds outside the building\'s safety case. After a future fire investigation this kind of gap is exactly what BSR enforcement targets.</>} />

          <SectionRule />
          <ContentEyebrow>The golden thread — what digital information actually means</ContentEyebrow>

          <ConceptBlock
            title="Why every cert, every photo, every change-record matters on an HRRB"
            plainEnglish="The golden thread is BSA 2022&apos;s central information concept: a continuous, accurate, accessible digital record of building safety information from design through construction into occupation. For HRRBs the dutyholder (PAP) must maintain it; contractors feed into it. Electrical certificates, drawings, photos of installation, change records, product specifications, test results — all become part of the golden thread. Documentation that used to live in a paper file now lives in a system that can be interrogated decades later."
            onSite="The L3 supervisor reflex on any HRRB work: assume every artefact you produce will be on the golden thread. Photos with metadata; certs digitally signed; product data sheets retained; change notes recorded. The standard expected of HRRB documentation is materially higher than for non-HRRB work — closer to the aerospace / pharma documentation discipline than the traditional construction file. The Hackitt review identified information gaps as a root cause of Grenfell; the golden thread is the response."
          >
            <p>Information that feeds the golden thread:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design and specification</strong> — drawings, schedules,
                calculations, product specifications, change records.
              </li>
              <li>
                <strong>Construction records</strong> — installation photos, test
                certificates, materials sourcing, batch numbers, operative records.
              </li>
              <li>
                <strong>Commissioning data</strong> — system tests, performance
                verification, hand-over documentation.
              </li>
              <li>
                <strong>Occupation records</strong> — periodic inspection, maintenance,
                alterations, defect reports, resident concerns.
              </li>
              <li>
                <strong>Safety case</strong> — the assessment of building safety risks
                and the controls in place; updated through the building&apos;s life.
              </li>
              <li>
                <strong>Resident engagement</strong> — communication, queries,
                concerns logged.
              </li>
              <li>
                <strong>Digital format</strong> — accessible, structured, machine-
                readable; not buried in PDF scans of paper records.
              </li>
              <li>
                <strong>Retention</strong> — for the life of the building; ownership
                transfers between successive PAPs.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The new building control regime</ContentEyebrow>

          <ConceptBlock
            title="BSR as building control authority for HRRBs"
            plainEnglish="BSA 2022 transferred building control authority for HRRBs from local authority building control / approved inspectors to the Building Safety Regulator. For HRRB design and construction, plans must be submitted to the BSR via the gateway 2 process; construction is monitored by the BSR; gateway 3 sign-off is by the BSR before occupation. Local authority building control retains authority for non-HRRB work. This is a structural change — for the first time, residential high-rise construction has a national rather than local regulatory authority for building control."
            onSite="L3 supervisor on HRRB construction: the building control authority is the BSR, not the local authority. Inspector visits are by BSR-authorised personnel. Documentation submitted is to the BSR. Where supervisor work needs sign-off (e.g. completion of an electrical installation feeding into gateway 3 review), the route is via the Principal Contractor to the BSR. Familiarity with the new building control flow takes time but the framework is consistent across HRRBs nationally — once the supervisor has worked on one HRRB the framework on others is similar."
          >
            <p>BSR building control authority elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HRRB design / construction — BSR as building control authority.</li>
              <li>Non-HRRB — LA building control or approved inspector unchanged.</li>
              <li>Gateway 2 — design and pre-construction submission to BSR.</li>
              <li>In-construction monitoring — BSR-authorised inspector visits.</li>
              <li>Gateway 3 — as-built sign-off by BSR before occupation.</li>
              <li>Single national authority for HRRB building control — consistency across the country.</li>
              <li>L3 supervisor route — through Principal Contractor to BSR.</li>
              <li>Documentation requirements published by BSR — operational consistency.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Resident voice — the operational expression</ContentEyebrow>

          <ConceptBlock
            title="What &apos;resident voice&apos; actually means on a site"
            plainEnglish="The BSA 2022 resident voice principle is operationalised through the PAP&apos;s residents engagement strategy. Residents have rights to information about building safety arrangements, to raise concerns with the PAP and receive a response, to escalate to BSR if not adequately responded to, and to participate in safety-relevant decisions affecting their building. For the contractor on site, residents may approach with questions about the work, the building, ongoing safety arrangements. Operatives must respond respectfully and route safety questions to the PAP. Dismissing or ignoring resident concerns is exactly the failure mode Grenfell highlighted."
            onSite="Practical L3 supervisor reflex on resident interactions during HRRB work: brief the team that residents may approach; agree the standard response (&apos;we are doing X today; the PAP is name; their contact is Y; we can pass on safety concerns&apos;); capture any concerns raised and pass them to the PAP same day. Do not dismiss. Do not improvise answers to safety questions. The resident voice channel is the BSA 2022 system working as designed; contractor cooperation is part of making the framework operational."
          >
            <p>Resident-interaction practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Brief team on expected resident interactions at site induction.</li>
              <li>Agree standard response wording — what we are doing, who the PAP is, how to raise concerns.</li>
              <li>Respect and politeness — residents are not interruptions.</li>
              <li>Capture concerns raised — date, resident, concern, contact.</li>
              <li>Pass concerns to PAP same day — let the PAP&apos;s engagement strategy handle them.</li>
              <li>Do not improvise safety-question answers — route to PAP.</li>
              <li>Do not dismiss — failure mode Grenfell highlighted.</li>
              <li>Where vulnerable residents are affected, additional sensitivity warranted.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The PAS 9980 fire risk appraisal methodology</ContentEyebrow>

          <ConceptBlock
            title="The new methodology for assessing external wall fire risk"
            plainEnglish="PAS 9980:2022 (Fire risk appraisal of external wall construction and cladding of existing blocks of flats — Code of practice) is the British Standards Institution&apos;s methodology for assessing the fire risk of external wall systems on existing residential buildings. It is the technical reference underpinning the cladding remediation programme. The methodology examines materials, system integrity, compartmentation, cavity barriers, openings, balconies, and the interaction between external wall and overall building fire strategy. Outcome is a risk rating that informs the remediation decision. The L3 supervisor on remediation projects works inside a project framework where PAS 9980 has shaped the scope and approach."
            onSite="Practical L3 awareness: PAS 9980 assessments are the typical entry point to remediation projects. The assessment outcomes drive scope. The supervisor on site works to a remediation specification developed in response to the PAS 9980 findings. Familiarity with the methodology helps the supervisor understand why specific remediation choices were made and where the boundaries of the work lie. Where the supervisor finds something during work that the PAS 9980 assessment did not capture, prompt flagging to the PAP enables the assessment to be updated and the safety case revised accordingly."
          >
            <p>PAS 9980 methodology elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building description and context.</li>
              <li>External wall material identification.</li>
              <li>System integrity examination — cavity barriers, fire-stopping, fixings.</li>
              <li>Opening and penetration review — windows, vents, services.</li>
              <li>Balcony and inset terrace fire-risk assessment.</li>
              <li>Compartmentation continuity through the wall.</li>
              <li>Interaction with overall building fire strategy.</li>
              <li>Risk rating output — informs remediation decision.</li>
              <li>Used as technical reference for cladding remediation programme.</li>
              <li>Periodic re-assessment as conditions change.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Product traceability and the post-Grenfell supply chain</ContentEyebrow>

          <ConceptBlock
            title="Why batch numbers and CE / UKCA marks matter more on HRRBs"
            plainEnglish="Hackitt&apos;s product-testing-and-labelling findings (untrustworthy regime, gaming of test results, generic certification covering varied products) drove a tightened approach to product traceability on HRRBs. CPR (Construction Products Regulation) classification for cables, CE / UKCA marking with credible test backing, manufacturer declarations of performance, batch number traceability and provenance documentation all matter more on HRRBs than on non-HRRB work. The PAP&apos;s golden thread captures product specification; the inspector after any incident traces from incident back through the records to the products actually installed. Generic &apos;cable conforms to BS&apos; statements are inadequate for HRRB documentation."
            onSite="L3 supervisor practical implication: keep delivery notes, batch numbers, product data sheets, CPR classifications, manufacturer declarations of performance. Photograph product labels at installation. Record what was actually installed, not just what was specified. The discipline takes time at first and becomes routine quickly. Where the firm uses cloud-based certification systems, the product data fields are typically built into the cert workflow. The traceability evidence becomes part of the golden thread and any future investigation can reach from incident back through records to specific products and batches."
          >
            <p>Product traceability evidence:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Delivery notes — date, supplier, products received, batch numbers.</li>
              <li>Product data sheets — for installed equipment.</li>
              <li>CPR classification — for cables, recorded against installation location.</li>
              <li>CE / UKCA mark verification — for electrical equipment.</li>
              <li>Manufacturer declarations of performance — for safety-relevant products.</li>
              <li>Installation photographs — capturing product labels in situ.</li>
              <li>Cert records — what was actually installed, not just specified.</li>
              <li>Substitution records — where a different product from specification was installed, with approval.</li>
              <li>Cloud-based certification systems — built-in product data fields.</li>
              <li>Records become part of golden thread; persist for life of building.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Scenario — fire-stopping finding during routine work</ContentEyebrow>

          <Scenario
            title="L3 finds a fire-stopping breach during cable installation"
            situation={
              <>
                You are running new data cabling in a 19-storey residential
                building. The building meets the HRRB threshold and the PAP is
                the managing agent. While running cable in a service riser between
                the 8th and 9th floors, you discover that an existing fire-stopping
                seal around an older cable bundle is missing — there is a clear
                gap where smoke and flame could pass between compartments. The
                gap is approximately the size of a fist, in a wall that should
                be 60-minute fire-rated per the building&apos;s safety case. You
                are several days into the project; your L2 mate is below you on
                the lower floor.
              </>
            }
            whatToDo={
              <>
                Stop the cable installation. Photograph the breach from multiple
                angles, noting time and floor location. This is not a defect
                created by your work — it is a pre-existing breach you have
                discovered — but it is safety-case-significant and likely a
                mandatory occurrence reporting trigger for the PAP. Phone the
                PAP immediately with the facts: location, dimensions, what was
                found, evidence available. The PAP will decide whether MOR is
                triggered (likely yes given compartmentation breach in an HRRB);
                they will also coordinate any interim fire-safety measure (resident
                notification, fire watch arrangements, temporary fire-stopping
                installation by a competent specialist). Brief your L2 mate;
                resume your own work elsewhere on the building where it does not
                interact with the breach area, pending PAP guidance. Document
                the finding and the PAP communication in the firm&apos;s system.
                Do not attempt to fire-stop the breach yourself unless the firm
                is competent to do so under the PAP&apos;s direction — fire-stopping
                in HRRBs is typically a specialist activity with specific product
                approval and certification requirements. The finding becomes part
                of the building&apos;s safety case update, the golden thread, and
                potentially a mandatory occurrence report to the BSR.
              </>
            }
            whyItMatters={
              <>
                This scenario reflects exactly the Hackitt-identified failure mode
                that BSA 2022 is designed to surface and address. Pre-existing
                compartmentation breaches that go un-noticed are the kind of
                cumulative defect that contributes to fire spread events in
                residential buildings. The L3 supervisor who flags the finding
                promptly is performing the role the framework expects of contractors
                on HRRB sites — &apos;eyes and ears&apos; for the PAP&apos;s safety
                case, with prompt communication of safety-relevant findings. The
                same finding on a non-HRRB might prompt informal mention to the
                building manager and a recommendation; on an HRRB it triggers a
                structured MOR / safety-case-update process with regulatory
                oversight.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>CDM 2015 plus BSA 2022 — HRRB construction dutyholders</ContentEyebrow>

          <ConceptBlock
            title="How CDM 2015 dutyholders gain extra HRRB duties under BSA 2022"
            plainEnglish="On HRRB construction the CDM 2015 dutyholder framework (Client, Principal Designer, Principal Contractor, Designer, Contractor, Worker) sits on top of additional BSA 2022 HRRB-specific duties. The Client must be satisfied of competence at appointment with additional rigour for HRRBs. The Principal Designer takes on pre-construction safety case responsibilities and gateway 2 submission coordination. The Principal Contractor takes on construction-phase mandatory occurrence reporting, change control discipline, and golden-thread contribution duties through to gateway 3 handover. Each individual designer and contractor on the project carries their own BSA 2022 competence and information-provision duties. The framework is materially more prescriptive than non-HRRB CDM."
            onSite="Practical impact for the L3 supervisor on HRRB construction work: every change goes through the Principal Designer / Principal Contractor change-control process. Site substitutions are essentially banned without design-team written approval. Operative competence is checked at site induction with documentation reviewed (cards, schemes, training records). Daily and weekly progress reporting includes building-safety-relevant findings, not just programme. Toolbox talks include HRRB-specific items. The discipline takes some getting used to but the framework is logical — it is what Hackitt&apos;s &apos;information continuity&apos; principle looks like in operation."
          >
            <p>CDM 2015 + BSA 2022 HRRB dutyholder duties:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Client</strong> — appoint competent PD and PC; ensure
                arrangements; provide pre-construction information; satisfy
                competence at appointment with HRRB-specific rigour.
              </li>
              <li>
                <strong>Principal Designer</strong> — plan, manage, monitor pre-
                construction phase; coordinate designers; produce pre-construction
                information; coordinate gateway 2 submission.
              </li>
              <li>
                <strong>Principal Contractor</strong> — plan, manage, monitor
                construction phase; produce construction phase plan; manage
                interfaces; mandatory occurrence reporting; golden-thread
                contribution; gateway 3 handover.
              </li>
              <li>
                <strong>Designer</strong> — eliminate / reduce / control risks
                through design; provide information; competence evidence at
                appointment.
              </li>
              <li>
                <strong>Contractor</strong> — plan, manage, monitor work;
                coordinate with PC; competence evidence; building-safety findings
                flagged through MOR route.
              </li>
              <li>
                <strong>Worker</strong> — work safely, follow instructions, raise
                concerns; cooperate with site arrangements.
              </li>
              <li>
                <strong>Gateway 2 modification application</strong> — for any
                significant change after Gateway 2 approval.
              </li>
              <li>
                <strong>Gateway 3 handover</strong> — building safety information
                transferred to PAP at completion.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="CDM 2015 — Reg 4(1) (Client duties)"
            clause={
              <>
                &quot;A client must make suitable arrangements for managing a
                project, including the allocation of sufficient time and other
                resources. Arrangements are suitable if they ensure that — (a) the
                construction work can be carried out, so far as is reasonably
                practicable, without risks to the health or safety of any
                person...&quot;
              </>
            }
            meaning={
              <>
                Reg 4 is the foundational client duty. On HRRBs it is enhanced by
                BSA 2022 — the client must satisfy themselves of competence at
                appointment with the additional rigour the HRRB regime requires.
                The Principal Designer and Principal Contractor appointed by the
                client carry the operational duties, but the client&apos;s
                appointment decision is what makes the whole framework work. A
                poorly-appointed PD / PC on an HRRB is the kind of failure mode
                Hackitt identified as systemic.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 4."
          />

          <ConceptBlock
            title="The BSR operational footprint — what working with the regulator looks like"
            plainEnglish="The Building Safety Regulator&apos;s operational footprint extends beyond gateway approvals. The BSR maintains the register of HRRBs, registers PAPs, reviews safety cases, investigates mandatory occurrence reports, takes enforcement action where required, publishes guidance documents, runs the competence framework programme and conducts thematic reviews. For an L3 supervisor working on HRRBs, direct contact with the BSR is rare — communication runs through the PAP / Principal Contractor — but the BSR&apos;s operational presence shapes everything the supervisor does on site."
            onSite="Practical L3 awareness: BSR-published guidance documents are operationally important — they tell the regulator what good looks like. The PAP&apos;s arrangements draw on BSR guidance; the Principal Contractor&apos;s arrangements draw on BSR guidance. Where the supervisor wants to understand &apos;why does the PAP require this format / this evidence / this process?&apos; the answer is usually traceable to BSR guidance. Familiarity with the BSR&apos;s published expectations reduces friction on HRRB sites and increases the supervisor&apos;s credibility with the PAP&apos;s team."
          >
            <p>BSR operational footprint:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Register of HRRBs — published, accessible.</li>
              <li>PAP registration — applications, approvals, ongoing record.</li>
              <li>Safety case review — formal review process with timescales.</li>
              <li>Mandatory occurrence report processing — investigation of safety-relevant events.</li>
              <li>Gateway 1 / 2 / 3 reviews — formal regulatory checkpoints for construction.</li>
              <li>Enforcement — improvement notices, compliance notices, restriction notices, prosecution.</li>
              <li>Published guidance — operational expectations across the framework.</li>
              <li>Competence framework programme — driving BS 8670 adoption.</li>
              <li>Thematic reviews — sector-wide findings (cladding, fire stopping, alarm systems).</li>
              <li>Coordination with HSE on dual-relevance cases.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The competence framework — BS 8670 series</ContentEyebrow>

          <ConceptBlock
            title="Why competence is now provable, not assumed"
            plainEnglish="One of Hackitt&apos;s strongest recommendations was that competence in the built environment needed to be defined, assessable and demonstrable — not just assumed from membership of a trade body or possession of a card. The British Standards Institution developed the BS 8670 series (Built Environment Competence Framework) to provide a common framework for defining competence across roles, sectors and tasks. BS 8670-1 sets the general framework; subsequent parts cover specific roles and sectors. The framework is voluntary but BSA 2022 references it as the direction of travel, and PAPs / Principal Designers / Principal Contractors on HRRBs increasingly use it as a procurement standard."
            onSite="L3 supervisor implication: maintaining current scheme registration, recorded CPD, manufacturer-specific certifications and demonstrable site experience gains procurement relevance. The traditional &quot;ECS card + JIB grade&quot; is no longer enough on its own for HRRB-relevant work; the wider evidence base matters. Apprentices coming through the L3 framework with documented training records, signed-off competence statements and contemporaneous evidence of supervised work experience are well-positioned for the new framework. The cultural shift is permanent — &quot;competent because we say so&quot; is being replaced by &quot;competent because the evidence shows so&quot;."
          >
            <p>Competence framework elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 8670-1 — general framework for built-environment competence.</li>
              <li>Role-specific parts — for designers, contractors, specific trades.</li>
              <li>Knowledge + skills + experience + behaviours — the four-element model.</li>
              <li>Independent assessment routes — CABE, RICS, IET / IEng / CEng, scheme bodies.</li>
              <li>Organisational competence management systems — at firm level.</li>
              <li>CPD records — for continuing competence.</li>
              <li>Manufacturer certifications — for system-specific competence (heat pumps, EV chargers, fire alarms).</li>
              <li>JIB grading — Electrical Contracting Industry grading scheme.</li>
              <li>ECS card — Electrotechnical Certification Scheme card.</li>
              <li>Scheme registration — NICEIC / NAPIT / ELECSA / Stroma.</li>
              <li>Direction of travel — competence evidence becoming procurement-relevant for non-HRRB work over time.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Approved Doc B post-Grenfell — what changed"
            plainEnglish="Approved Document B (Fire Safety) has been substantially updated post-Grenfell. The 2019 edition introduced changes including a ban on combustible cladding on new residential buildings over 18m, then refined further. The 2022 edition reflects BSA 2022 commencement and incorporates the Fire Safety Act 2021 amendments. Sprinkler requirements have been tightened for residential buildings; emergency lighting requirements clarified; fire alarm category guidance refined; CPR (Construction Products Regulation) reaction-to-fire classification mandated for cable selection in fire-relevant applications. The document continues to evolve as the post-Grenfell regulatory programme runs."
            onSite="L3 supervisor practical impact: any fire-safety-relevant electrical work needs the current Approved Doc B reference, not the version the supervisor remembers from training years ago. Emergency lighting design needs to reflect the current standard. Fire alarm category selection needs to align with the current guidance. CPR-classified cable is mandatory in many applications where previously generic cable was acceptable. The supervisor&apos;s reflex is to check the current edition rather than assume the framework remembered from earlier in their career still applies."
          >
            <p>Approved Doc B post-Grenfell changes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ban on combustible cladding on new residential buildings over 18m.</li>
              <li>Tightened sprinkler requirements for taller residential buildings.</li>
              <li>Refined emergency lighting design guidance.</li>
              <li>Refined fire alarm category guidance.</li>
              <li>CPR reaction-to-fire classification mandated for cable selection in fire-relevant applications.</li>
              <li>Single-stairway high-rise guidance amended.</li>
              <li>External wall system testing standards tightened.</li>
              <li>Approved Doc B continues to evolve through periodic updates.</li>
              <li>L3 supervisor checks current edition rather than relying on remembered framework.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Grenfell, Hackitt and the policy origins of BSA 2022</ContentEyebrow>

          <ConceptBlock
            title="The fire that changed the regulatory landscape"
            plainEnglish="The Grenfell Tower fire on 14 June 2017 killed 72 people and exposed systemic failures in the regulation of building safety in high-rise residential buildings. The Hackitt Review (Independent Review of Building Regulations and Fire Safety) was commissioned the following month, with an interim report in December 2017 and final report in May 2018. Hackitt&apos;s conclusion was uncompromising: the regulatory system itself was &apos;not fit for purpose&apos; — fragmented oversight, weak competence requirements, unclear accountability, ineffective enforcement, and a culture in which compliance was treated as the floor rather than the goal. The BSA 2022 is the statutory response. Understanding the policy origins matters because the regulator&apos;s posture and enforcement direction are shaped by the determination to prevent another Grenfell."
            onSite="The L3 supervisor on HRRB work sits inside a regulatory culture shaped by Grenfell. Inspectors are not in a forgiving mood about substitutions, missing records, untraceable products or weak competence evidence. The standard expected is materially higher than for non-HRRB work, and the inspector&apos;s instinct is to look for the same failure modes Hackitt identified. Cooperative engagement, full documentation, traceable products and demonstrable competence are the supervisor&apos;s standard response. The cultural shift is permanent — BSA 2022 is the legal foundation but the regulatory expectation goes wider."
          >
            <p>Hackitt Review key findings (May 2018):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Regulatory system &quot;not fit for purpose&quot; for high-rise residential.</li>
              <li>Roles, responsibilities and accountabilities unclear.</li>
              <li>Competence of those carrying out and approving work inadequate.</li>
              <li>Product testing and labelling regime untrustworthy.</li>
              <li>Resident voice missing from building safety decisions.</li>
              <li>Enforcement weak and inconsistent.</li>
              <li>Compliance treated as floor rather than goal.</li>
              <li>Information lost between design, construction and occupation.</li>
              <li>Recommendation: single regulator (became BSR), gateways, dutyholder regime, golden thread, resident voice, mandatory occurrence reporting, competence framework.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="From Hackitt recommendation to statutory framework"
            plainEnglish="The BSA 2022 enacts the Hackitt framework in statute. Part 2 establishes the Building Safety Regulator as a function of the HSE. Part 3 covers building safety in design and construction (the gateways). Part 4 covers building safety in occupation (PAP, safety case, golden thread, resident engagement, mandatory occurrence reporting). Part 5 contains miscellaneous and supplementary provisions including the Defective Premises Act amendments and the competence framework basis. Each Part has supporting secondary legislation — most operationally significant is the Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023 which gives the HRRB definition, and the Higher-Risk Buildings (Key Building Information etc.) Regulations 2023 which sets out registration requirements."
            onSite="L3 supervisor structural awareness: BSA 2022 is a framework Act. The detailed operational requirements come from secondary legislation, BSR guidance documents and PAP-published arrangements. Inspecting against BSA 2022 alone is not enough — the practitioner needs the secondary regulations, the BSR&apos;s published expectations, and the specific PAP arrangements for the building in question. The complexity is managed by the PAP for in-occupation work and by the Principal Designer / Principal Contractor under CDM 2015 plus BSA 2022 additional duties for construction."
          >
            <p>BSA 2022 structural map:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Part 1</strong> — overview and key concepts.</li>
              <li><strong>Part 2</strong> — Building Safety Regulator establishment and functions.</li>
              <li><strong>Part 3</strong> — building safety in design and construction (gateways, dutyholders).</li>
              <li><strong>Part 4</strong> — building safety in occupation (PAP, safety case, golden thread).</li>
              <li><strong>Part 5</strong> — miscellaneous and supplementary (DPA amendments, competence basis).</li>
              <li><strong>HRB Regs 2023 (Descriptions)</strong> — defines HRRB.</li>
              <li><strong>HRB Regs 2023 (Key Building Information)</strong> — registration requirements.</li>
              <li><strong>Building Safety Levy Regulations</strong> — funding for remediation.</li>
              <li><strong>BSR guidance documents</strong> — operational expectations.</li>
              <li><strong>PAP-published arrangements</strong> — building-specific implementations.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Safety Act 2022 — Long Title"
            clause={
              <>
                &quot;An Act to make provision about the safety of people in or
                about buildings and the standard of buildings, to amend the
                Architects Act 1997, and to amend provision about complaints made
                to a housing ombudsman; and for connected purposes.&quot;
              </>
            }
            meaning={
              <>
                BSA 2022 is a wide-ranging Act covering the safety of people in
                buildings, the standard of buildings, professional regulation
                (Architects Act amendments) and complaints (housing ombudsman). The
                breadth reflects Hackitt&apos;s observation that the failures
                exposed by Grenfell were systemic, not narrowly technical.
                Reading the Act in isolation does not capture the regulatory
                culture shift; the policy intent is to drive culture change as
                well as legal change.
              </>
            }
            cite="Source: Building Safety Act 2022 (2022 c.30)."
          />

          <SectionRule />
          <ContentEyebrow>Practical contractor checklist for HRRB work</ContentEyebrow>

          <ConceptBlock
            title="What the L3 supervisor verifies before starting HRRB work"
            plainEnglish="The L3 supervisor arriving on an HRRB site works through a verification checklist before starting work. The checklist is operational, not bureaucratic — it surfaces the integration points with the BSA 2022 framework and prevents the common mistakes (paper-only certs, unrecorded substitutions, untraceable products, missed PAP engagement). Going through the checklist takes 20-30 minutes the first time on a building and minutes thereafter."
            onSite="The checklist is also useful for the L3 supervisor&apos;s own evidence base — running through it and capturing the answers (date, who confirmed, where the information is held) produces a contemporaneous record that demonstrates the supervisor engaged with the framework. If anything goes wrong later, the checklist completion is evidence of proper engagement."
          >
            <p>HRRB pre-work checklist:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Is the building an HRRB? Confirm against the 18m / 7 storey + 2 residential threshold.</li>
              <li>Who is the PAP? Name, contact details, registered building status.</li>
              <li>Who is the Responsible Person under RRFSO 2005? Same as PAP or different?</li>
              <li>Has the safety case been shared with the firm? Relevant excerpts identified?</li>
              <li>What is the golden thread document management arrangement? Format requirements?</li>
              <li>What are the change-management arrangements? Approval process for substitutions?</li>
              <li>What competence evidence does the PAP require from the firm and operatives?</li>
              <li>Are there resident-engagement requirements affecting the work?</li>
              <li>What is the mandatory occurrence reporting arrangement? Who do we flag findings to?</li>
              <li>What sign-off / handover is expected at completion?</li>
              <li>Does the work require Gateway 2 modification application (construction phase)?</li>
              <li>What records are required for the golden thread? Format, content, submission route?</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Safety Act 2022 — s.78 (Principal accountable person)"
            clause={
              <>
                &quot;Where the higher-risk building has more than one accountable
                person, the principal accountable person is — (a) the accountable
                person for the structure and exterior of the building, or (b) if
                there is more than one such accountable person, the one
                determined in accordance with regulations made by the Secretary of
                State.&quot;
              </>
            }
            meaning={
              <>
                s.78 nominates the PAP. The PAP is the accountable person for the
                structure and exterior — typically the freeholder, managing agent
                or RP-type entity controlling the building&apos;s external envelope
                and structural elements. In multi-leasehold buildings this is
                determined by the regulations. The single-point-of-accountability
                approach is one of Hackitt&apos;s central recommendations and
                resolves the pre-BSA confusion about who was responsible for
                building-level safety when individual flat ownership was
                fragmented.
              </>
            }
            cite="Source: Building Safety Act 2022 (2022 c.30), s.78."
          />

          <SectionRule />
          <ContentEyebrow>The Building Safety Levy and remediation programmes</ContentEyebrow>

          <ConceptBlock
            title="How national remediation drives current trade work"
            plainEnglish="The Building Safety Levy is a charge on certain residential developments funding remediation of historic building safety defects, particularly cladding. Alongside the Building Safety Fund, the Cladding Safety Scheme and developer remediation contract obligations under BSA 2022, a major national programme of remediation work is under way. Significant electrical-trade work is generated: fire-stopping retrofit, fire alarm upgrades (often to BS 5839-1 Cat L1/L2 from earlier coverage), sprinkler retrofit on certain buildings, emergency lighting upgrades, electrical infrastructure changes to support upgraded fire safety. Many L3 supervisors will work on remediation projects through the coming decade."
            onSite="Practical L3 implication: remediation projects often involve occupied buildings with vulnerable residents, multi-trade coordination, tight resident-engagement requirements and intense scrutiny from the PAP and BSR. The work is technically not always complex but the contextual demands are high — work programmes around resident access, dust / noise / disruption management, fire-safety interim measures during the remediation period, formal handover at each completed flat. The L3 supervisor on remediation work is essentially running an HRRB-flavoured project within an HRRB-flavoured framework."
          >
            <p>National remediation context:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building Safety Levy — funds remediation of historic defects.</li>
              <li>Building Safety Fund — Government scheme for cladding remediation.</li>
              <li>Cladding Safety Scheme — for buildings below 18m with cladding concerns.</li>
              <li>Developer Remediation Contract — obliges 50+ developers to fix buildings they constructed.</li>
              <li>Remediation work types: cladding replacement, fire-stopping retrofit, fire alarm upgrade, sprinkler retrofit, emergency lighting upgrade, structural strengthening.</li>
              <li>Electrical-trade impact: significant programme of work over 5-10 years.</li>
              <li>Occupied buildings — resident engagement, interim fire-safety measures, multi-trade coordination.</li>
              <li>Tight golden-thread requirements — every remediation feeds back into the safety case.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 1.7 — BSA 2022 is the post-Grenfell framework. This Sub goes operational.",
            "HRRB = 18m+ OR 7+ storeys, AND 2+ residential units.",
            "In-occupation dutyholders: PAP, AP, RP. BSM optional.",
            "Three gateways via BSR: 1 planning, 2 pre-construction, 3 pre-occupation.",
            "Golden thread = digital, accurate, accessible, secure information set held by PAP for life of building.",
            "Defective Premises Act extended to 30 years retrospective for residential (BSA 2022 s.135).",
            "Indirect effects reach all residential work — record retention, competence framework, Building Regs.",
            "L3 supervisor identifies HRRB on arrival; engages with PAP; produces digital records.",
            "Policy origin: Grenfell (2017) + Hackitt Review (2018) + BSA 2022 enactment + Higher-Risk Buildings Regs 2023 secondary legislation.",
            "Mandatory occurrence reporting (MOR) on HRRBs — structural / fire-system / compartmentation events reportable to BSR by PAP.",
            "Resident voice is built into the framework — rights to information, to raise concerns, to participate.",
            "Building Safety Levy + Building Safety Fund + Developer Remediation drive national remediation work programme.",
            "Pre-work checklist: confirm HRRB status, identify PAP/RP, share safety case, agree golden-thread format, agree change control, agree resident engagement, agree MOR route.",
          ]} />
          <Quiz title="BSA 2022 HRRBs - knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Back</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">Section 6 - Landing</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">6.2 HRRB dutyholders + safety case</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
