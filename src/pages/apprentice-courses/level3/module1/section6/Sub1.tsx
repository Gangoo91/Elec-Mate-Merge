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
  { id: 'l3-m1-s6-sub1-hrrb', question: 'HRRB definition?', options: ['Anything tall.', '18m+ in height OR 7+ storeys, AND containing 2+ residential units. Per Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023.', 'Above 50m only.', 'Any block.'], correctIndex: 1, explanation: 'Memorise: 18m / 7 storeys + 2 residential. Hospitals and care homes also covered for design / construction phase.' },
  { id: 'l3-m1-s6-sub1-pap', question: 'Who\'s the Principal Accountable Person?', options: ['Architect.', 'Single person per HRRB responsible for the structure and exterior. Registers the building, prepares safety case, engages residents, holds golden thread. Reg 4 of BSA 2022 Part 4.', 'Resident.', 'Council.'], correctIndex: 1, explanation: 'PAP is THE in-occupation dutyholder. Single per building.' },
  { id: 'l3-m1-s6-sub1-gateways', question: 'Three BSA 2022 gateways?', options: ['Random.', 'Gateway 1 at planning (fire safety + access). Gateway 2 pre-construction (BSR design review; no construction without approval). Gateway 3 pre-occupation (BSR sign-off against design and golden thread; no occupation without approval).', 'Just one.', 'Five.'], correctIndex: 1, explanation: '1 planning, 2 pre-construction, 3 pre-occupation. Fail any = stop.' },
];

const quizQuestions = [
  { id: 1, question: 'Why was BSA 2022 enacted?', options: ['Random reform.', 'Response to Grenfell (2017) and Hackitt Review (2018). Addresses fragmented regulation, weak competence, unclear accountability.', 'For sport.', 'Random.'], correctAnswer: 1, explanation: 'Grenfell + Hackitt are the policy origins.' },
  { id: 2, question: 'What\'s the Building Safety Regulator?', options: ['Private firm.', 'Function within HSE. Three statutory functions: oversee building safety; facilitate competence improvement; lead implementation of HRRB regulatory regime including gateway approvals.', 'Council body.', 'NGO.'], correctAnswer: 1, explanation: 'BSR sits within HSE. Three functions cover broad and HRRB-specific.' },
  { id: 3, question: 'What\'s the golden thread?', options: ['Cable.', 'Digital, accurate, accessible, secure information set covering design, construction and ongoing management of an HRRB. Held by Accountable Person.', 'Mortgage.', 'Brand.'], correctAnswer: 1, explanation: 'Golden thread is THE information system for HRRBs. Records persist for life of building.' },
  { id: 4, question: 'How many in-occupation dutyholder types are defined?', options: ['One.', 'Three: Principal Accountable Person (PAP - one per HRRB), Accountable Persons (AP - multiple possible), Responsible Person (RP under RRFSO 2005). Building Safety Manager (BSM) role optional.', 'Five.', 'Ten.'], correctAnswer: 1, explanation: 'PAP / AP / RP. BSM is optional appointment.' },
  { id: 5, question: 'What\'s the safety case?', options: ['Briefcase.', 'Document setting out how building safety risks are identified, mitigated and managed for the HRRB. Includes fire and structural risks, mitigation strategies, residents engagement, golden-thread links.', 'Insurance.', 'Blueprint.'], correctAnswer: 1, explanation: 'Safety case is the PAP\'s comprehensive evidence that the building is being safely managed.' },
  { id: 6, question: 'What\'s the Defective Premises Act change?', options: ['No change.', 'BSA 2022 s.135 extended limitation: 30 years retrospective for residential defect claims; 15 years prospective. Significant impact on contractor liability and document retention.', 'Reduced.', 'Random.'], correctAnswer: 1, explanation: '30 years retrospective is the headline. Long-tail liability for residential work.' },
  { id: 7, question: 'How does BSA 2022 affect electrical contractors not working on HRRBs?', options: ['Not at all.', 'Indirectly - 30-year DPA liability, competence framework changes, Building Regs amendments (Approved Doc B fire safety especially), regulatory direction-of-travel emphasising traceability and certified competence.', 'Only on HRRBs.', 'Random.'], correctAnswer: 1, explanation: 'BSA 2022\'s indirect effects reach all residential work.' },
  { id: 8, question: 'What\'s the L3 contribution to BSA 2022 awareness?', options: ['None.', 'Recognise HRRB sites; understand the gateway regime and PAP role; verify CPP integrates with golden thread; produce digital cert records (not paper-only); cooperate with PAP / AP requests for information.', 'Customer service.', 'Random.'], correctAnswer: 1, explanation: 'L3 contribution operationalises BSA 2022 awareness on site.' },
];

const faqs = [
  { question: 'Who exactly registers the building under BSA 2022?', answer: 'Principal Accountable Person registers with the Building Safety Regulator. Registration includes the safety case and key building information.' },
  { question: 'When did the HRRB regime take effect?', answer: 'BSA 2022 received Royal Assent April 2022. HRRB regime in occupation rolled out from 2023 onwards; gateway regime for new construction phasing in.' },
  { question: 'Are commercial buildings covered by BSA 2022?', answer: 'Care homes and hospitals covered for design / construction phase. In-occupation regime focused on residential HRRBs. Wider commercial buildings affected indirectly via competence framework.' },
  { question: 'Can existing HRRBs be retro-improved to BSA standard?', answer: 'Existing buildings being assessed against the new safety case framework. Where structural or fire-safety deficiencies are identified, remediation may be required - hence the cladding remediation programmes nationally.' },
  { question: 'How does golden thread record keeping affect electrical certs?', answer: 'EIC, EICR, alteration certs, design records all become part of golden thread for HRRBs. Digital record format expected; paper-only insufficient.' },
  { question: 'What if I\'m an L3 working on an HRRB - do I need special training?', answer: 'No specific BSA training required for routine L3 work. Awareness of HRRB context, PAP role, and golden-thread integration is part of L3 / supervisor competence.' },
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

          <RegsCallout source="Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023" clause={<>"A building is a higher-risk building for the purposes of Part 4 of the Building Safety Act 2022 if it - (a) is at least 18 metres in height or has at least 7 storeys, and (b) contains at least 2 residential units."</>} meaning={<>The HRRB definition. 18m / 7 storeys are the height/storey thresholds; 2+ residential units is the residential threshold. Both must apply for HRRB status under the in-occupation regime.</>} cite="Source: Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023 (SI 2023/275) - verbatim from legislation.gov.uk." />

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

          <RegsCallout source="Building Safety Act 2022 - s.2(1)" clause={<>"The regulator&apos;s general functions are - (a) the building function, which is to secure the safety of people in or about buildings in relation to risks arising from buildings, and to improve the standard of buildings; (b) the competence function, which is to facilitate the improvement of the competence of industry; (c) such other functions as may be conferred on the regulator by or under any enactment."</>} meaning={<>BSR is established with three functions. Building safety + competence + others. Overseen by the HSE board; has statutory powers including notices and prosecution.</>} cite="Source: Building Safety Act 2022 (2022 c.30), s.2 - verbatim from legislation.gov.uk." />

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

          <RegsCallout source="Building Safety Act 2022 — s.135 (Limitation period for actions under Defective Premises Act 1972)" clause={<>&quot;In the Limitation Act 1980 (as amended by this section), in section 4B... the limitation period is 30 years where the relevant period began before the day on which section 135(1) of the Building Safety Act 2022 came into force; and 15 years in any other case.&quot;</>} meaning={<>The limitation extension. 30 years retrospective is the headline; 15 years prospective is the new normal. The L3 supervisor on residential work treats every job as creating long-tail liability — keep records accordingly.</>} cite="Source: Building Safety Act 2022 (2022 c.30), s.135 — verbatim from legislation.gov.uk." />

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
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 1.7 - BSA 2022 is the post-Grenfell framework. This Sub goes operational.",
            "HRRB = 18m+ OR 7+ storeys, AND 2+ residential units.",
            "In-occupation dutyholders: PAP, AP, RP. BSM optional.",
            "Three gateways via BSR: 1 planning, 2 pre-construction, 3 pre-occupation.",
            "Golden thread = digital, accurate, accessible, secure information set held by PAP.",
            "Defective Premises Act extended to 30 years retrospective for residential.",
            "Indirect effects reach all residential work - record retention, competence framework, Building Regs.",
            "L3 supervisor identifies HRRB on arrival; engages with PAP; produces digital records.",
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
