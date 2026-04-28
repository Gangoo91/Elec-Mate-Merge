/**
 * Module 1 · Section 4 · Subsection 6 — Asbestos: CAR 2012 in detail
 * Maps to City & Guilds 2365-03 / Unit 201 / LO4 / AC 4.7 + 4.8
 *   AC 4.7 — "explain situations where asbestos may be encountered"
 *   AC 4.8 — "specify the procedures for dealing with the suspected presence of asbestos"
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Asbestos — CAR 2012 in detail (4.7 / 4.8) | Level 3 Module 1.4.6 | Elec-Mate';
const DESCRIPTION = 'L3 asbestos depth — CAR 2012, asbestos register, refurbishment surveys, licensed vs non-licensed work, and the supervisor escalation chain.';

const checks = [
  { id: 'l3-m1-s4-sub6-pre2000', question: 'When was asbestos use in UK building materials banned?', options: ['1950.', '1999 — all asbestos use in new building products banned. Buildings constructed OR significantly refurbished BEFORE 2000 should be presumed to contain asbestos until survey rules it out.', '1980.', '2010.'], correctIndex: 1, explanation: 'Pre-2000 = presumed contains asbestos. CAR 2012 duty-to-manage applies to non-domestic buildings; presumption applies in any case for safe-systems-of-work.' },
  { id: 'l3-m1-s4-sub6-register', question: 'Under CAR 2012 Reg 4, what\'s the asbestos register?', options: ['Optional document.', 'A documented record of the location, condition and type of asbestos-containing materials in non-domestic premises (and the common parts of multi-occupied residential). The dutyholder (typically owner/landlord) must maintain it; provide it to anyone working on the fabric.', 'A list of products.', 'Customer paperwork.'], correctIndex: 1, explanation: 'Reg 4 duty to manage. Register must be available to those working on the fabric. Ask for it before any work that may disturb materials.' },
  { id: 'l3-m1-s4-sub6-licensed', question: 'What\'s "licensed asbestos work" vs "non-licensed"?', options: ['Same thing.', 'Licensed work — high-risk activities (most disturbance of friable insulation, large quantities of AIB) requiring HSE-licensed contractor under CAR 2012 Reg 8. Non-licensed work — lower-risk (some sealed cement product, very limited disturbance) by trained operatives following NNLW (Notifiable Non-Licensed Work) procedures or basic non-licensed.', 'Licensed = paid, non-licensed = free.', 'Licensed = legal, non-licensed = illegal.'], correctIndex: 1, explanation: 'Licensed contractor required for high-risk work. Non-licensed has its own (lower) requirements. The L3 supervisor identifies which category and escalates to licensed where appropriate — never attempts licensed work without licence.' },
];

const quizQuestions = [
  { id: 1, question: 'What does CAR 2012 stand for?', options: ['Car Park Regs.', 'Control of Asbestos Regulations 2012 — the principal UK asbestos regulation. Covers duty to manage (Reg 4), exposure assessment (Reg 6), prevention or reduction (Reg 7), licensed work (Reg 8), training (Reg 10), respiratory PPE, hygiene, monitoring, surveillance.', 'Construction Approval Rules.', 'Customer Access Rules.'], correctAnswer: 1, explanation: 'CAR 2012 is THE UK asbestos regulation. Knowing it by name is L3-essential.' },
  { id: 2, question: 'What are the three main asbestos types?', options: ['Just one.', 'Chrysotile (white), Amosite (brown), Crocidolite (blue). All hazardous; crocidolite considered most carcinogenic. Most UK use was chrysotile in cement products and AIB; amosite in insulation board and pipe lagging; crocidolite in some sprayed insulation and specialist applications.', 'Black, white, grey.', 'Hot, warm, cold.'], correctAnswer: 1, explanation: 'Three types; all hazardous. Visual identification rarely possible — sampling required.' },
  { id: 3, question: 'Where might asbestos be encountered in pre-2000 buildings?', options: ['Only roofs.', 'Wide range: textured ceilings (artex), insulation board (AIB), cement products (roofing, soffits, downpipes), pipe and boiler lagging, sprayed coatings, floor tiles and adhesive, gaskets and seals, electrical components (rare in UK but some old fuse boards), bath panels, window putty, wall claddings.', 'Only floors.', 'Only walls.'], correctAnswer: 1, explanation: 'Asbestos is in many materials in pre-2000 buildings. The range is wide; presumption is the safe default.' },
  { id: 4, question: 'What\'s a "refurbishment survey"?', options: ['Customer satisfaction.', 'A type of asbestos survey carried out before refurbishment or demolition work. Locates and assesses ACMs in areas to be disturbed. More intrusive than a management survey. Required before significant disturbance work; commissioned by the dutyholder.', 'A type of inspection.', 'A type of cleaning.'], correctAnswer: 1, explanation: 'Refurbishment survey = pre-disturbance survey. The L3 supervisor asks for one (or escalates) before any work likely to disturb pre-2000 materials.' },
  { id: 5, question: 'What\'s the asbestos awareness training requirement?', options: ['No training needed.', 'CAR 2012 Reg 10 — anyone who is or may be exposed to asbestos must receive adequate training. UKATA / IATP-certified asbestos awareness (1-day) is the typical baseline for trades. Higher levels (non-licensed work, licensed work) require more advanced training.', 'A degree in chemistry.', 'A driving licence.'], correctAnswer: 1, explanation: 'Asbestos awareness is mandatory for trades likely to encounter asbestos. UKATA / IATP courses are the recognised standard.' },
  { id: 6, question: 'What do you do if you find suspected asbestos during work?', options: ['Carry on.', '(1) Stop work immediately. (2) Don\'t disturb further. (3) Vacate the area; close off if possible. (4) Inform the dutyholder, your supervisor, the principal contractor (where appointed). (5) Don\'t start work again until survey confirms / licensed contractor takes over (depending on type / quantity). Document everything.', 'Take it home.', 'Hide it.'], correctAnswer: 1, explanation: 'Stop, don\'t disturb, escalate. The L3 supervisor escalation immediately to dutyholder + firm + (if applicable) principal contractor.' },
  { id: 7, question: 'What\'s the disposal route for asbestos waste?', options: ['Skip.', 'Hazardous waste — double-bagged, labelled, Hazardous Waste Consignment Note, transported by licensed asbestos waste carrier, disposed of at permitted asbestos waste facility. CAR 2012 + Hazardous Waste Regs 2005 + EPA 1990 all apply.', 'Bin.', 'Burn.'], correctAnswer: 1, explanation: 'Asbestos waste is licensed-carrier, permitted-facility hazardous waste. Mixing with general waste is multiple offences.' },
  { id: 8, question: 'What\'s the supervisor escalation when asbestos is suspected?', options: ['Customer first.', '(1) Stop work; ensure no-one disturbs further. (2) Photograph and document. (3) Phone the firm\'s contracts manager / H&S manager immediately. (4) Inform the dutyholder (building owner / managing agent). (5) Do NOT proceed without confirmation that the material is non-asbestos OR that licensed contractor has taken over disturbance work. Document everything in writing.', 'Random.', 'Yourself only.'], correctAnswer: 1, explanation: 'Five-step escalation. Documentation throughout. The L3 supervisor\'s reflex protects the team and the firm.' },
];

const faqs = [
  { question: 'Is the asbestos register mandatory for domestic premises?', answer: 'Not under CAR 2012 Reg 4 (which covers non-domestic). However, the duty to manage extends to common parts of multi-occupied residential. Single-occupancy domestic is on the homeowner; in practice you can ask but they often don\'t have one.' },
  { question: 'Can I do "low-level" asbestos work (small cement panel) myself?', answer: 'Some non-licensed work may be permitted by trained operatives, but the L3 supervisor approach is conservative — escalate to specialist. The categorisation (licensed / NNLW / non-licensed) is technical; getting it wrong creates exposure.' },
  { question: 'What\'s the carcinogenic mechanism?', answer: 'Asbestos fibres inhaled lodge in lung tissue (and sometimes pleural / mesothelial); cause inflammation; over decades develop into asbestosis (lung scarring), lung cancer, and mesothelioma (cancer of the pleura). Latency typically 20-40 years; diseases often present after retirement.' },
  { question: 'What happens if I\'ve been exposed?', answer: 'Document the exposure (date, location, material type if known, duration). Inform employer who should record. Health surveillance under CAR 2012 Reg 22 if licensed work; otherwise periodic GP review. Most short, low-level exposures don\'t cause disease but the cumulative dose matters.' },
  { question: 'Why are pre-2000 buildings the cut-off?', answer: 'Asbestos use in new building products banned in 1999. Pre-2000 buildings (and refurbishments) can contain asbestos materials. Newer buildings should be asbestos-free in their original construction (subsequent additions of older materials still possible).' },
  { question: 'How does the L3 supervisor manage the customer\'s expectations on asbestos?', answer: 'Honest, calm explanation. "We\'ve found suspect material. Until we\'re sure, we can\'t safely proceed with this part of the work. The right step is a survey / licensed contractor depending on what it turns out to be. This is to protect you and us." Most customers respond well; the alternative is a much worse conversation if we proceed and exposure occurs.' },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 4</button>
          <PageHero eyebrow="Module 1 · Section 4 · Subsection 6" title="Asbestos — CAR 2012 in detail" description="Remember from L2 — pre-2000 = suspect, don't disturb. At L3 you understand the licensed-vs-non-licensed boundary, the survey types, the disposal regime and the supervisor escalation chain." tone="emerald" />
          <TLDR points={[
            "CAR 2012 is THE UK asbestos regulation. Reg 4 duty to manage; Reg 8 licensed work; Reg 10 training.",
            "Pre-2000 buildings = presumed asbestos until survey rules out. Wide range of materials: AIB, cement, lagging, textured coating, floor tiles, gaskets, sprayed insulation.",
            "Supervisor reflex on suspect material: STOP, don't disturb, escalate to dutyholder + firm + principal contractor. Document. Don't proceed without confirmation or licensed contractor.",
          ]} />
          <LearningOutcomes outcomes={[
            "Explain situations where asbestos may be encountered.",
            "Specify the procedures for dealing with suspected asbestos.",
            "Identify the three main asbestos types (chrysotile, amosite, crocidolite).",
            "State the CAR 2012 dutyholder requirement (Reg 4) and the asbestos register.",
            "Distinguish licensed work (CAR 2012 Reg 8) from NNLW and non-licensed work.",
            "Apply the supervisor escalation chain on discovery of suspect material.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Where asbestos is encountered</ContentEyebrow>
          <ConceptBlock title="Pre-2000 buildings and the asbestos materials" plainEnglish="Asbestos use in new building products banned in 1999. Pre-2000 buildings (and refurbishments) routinely contain asbestos. Three main types — chrysotile (white), amosite (brown), crocidolite (blue) — used in many materials including textured ceilings, insulation board, cement products, lagging, floor tiles, sprayed insulation, gaskets, electrical components." onSite="Default presumption: pre-2000 = suspect until proven otherwise. Visual identification rarely possible — laboratory sampling required.">
            <p>Common asbestos-containing materials (ACMs):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Textured coatings (e.g. artex)</strong> — chrysotile, often low-content but disturbance creates fibre release.</li>
              <li><strong>Asbestos Insulation Board (AIB)</strong> — amosite or chrysotile; common as panel ceilings, soffits, fire-proofing around steel beams.</li>
              <li><strong>Asbestos cement products</strong> — chrysotile-bonded; roofing sheets, soffits, downpipes, flue pipes.</li>
              <li><strong>Pipe and boiler lagging</strong> — amosite/crocidolite; high-risk, often friable.</li>
              <li><strong>Sprayed coatings</strong> — friable; often around steel beams in industrial buildings.</li>
              <li><strong>Floor tiles and adhesive</strong> — chrysotile; vinyl tiles and bitumen adhesive.</li>
              <li><strong>Gaskets and seals</strong> — many electrical / mechanical gaskets pre-2000.</li>
              <li><strong>Window putty and mastics</strong> — older formulations.</li>
              <li><strong>Electrical fuse boards</strong> — some older units use AIB backing or sealing.</li>
              <li><strong>Bath panels and toilet cisterns</strong> — older units.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Control of Asbestos Regulations 2012 — Reg 4(1)" clause={<>"In order to manage the risk from asbestos in non-domestic premises, the dutyholder must ensure that — (a) a suitable and sufficient assessment is carried out as to whether asbestos is or is liable to be present in the premises; (b) in making the assessment, the dutyholder must ensure that suitable inspections are made of those parts of the premises which are reasonably accessible; ..."</>} meaning={<>Reg 4 duty to manage. Dutyholder = person in control of the premises (typically owner / landlord / managing agent). The asbestos register / management plan must be available to anyone working on the fabric. Ask for it before any disturbance work.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 4 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Survey types and licensed work</ContentEyebrow>
          <ConceptBlock title="Management survey vs refurbishment survey" plainEnglish="Management survey — finds and assesses ACMs in normal use of the building; minimally intrusive; for the asbestos register. Refurbishment survey — pre-disturbance; intrusive; required before significant alteration / demolition. Different scopes; different costs; different prerequisites." onSite="Before drilling / chasing / cutting in pre-2000 building, a refurbishment survey of the affected area is the gold standard. Management survey alone may be inadequate.">
            <p>Survey distinctions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Management survey</strong> — for the register; assesses normal-use exposure.</li>
              <li><strong>Refurbishment survey</strong> — pre-alteration; assesses what will be disturbed.</li>
              <li><strong>Demolition survey</strong> — pre-demolition; comprehensive sampling of all areas.</li>
              <li>Surveys carried out by accredited / competent surveyors (UKAS-accredited inspection bodies).</li>
              <li>Sampling and lab analysis required for confirmation; visual ID not enough.</li>
              <li>Reports become part of the asbestos register.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Licensed vs non-licensed work" plainEnglish="CAR 2012 Reg 8 — high-risk asbestos work requires HSE-licensed contractor. Includes most disturbance of friable insulation, AIB beyond very small quantities, sprayed coatings. Lower-risk work may be NNLW (Notifiable Non-Licensed Work) — trained operatives, written plan, notification. Lowest-risk may be non-licensed (still trained, still controlled)." onSite="The categorisation is technical. Get it wrong and exposure occurs. The L3 supervisor approach is conservative — escalate to specialist who can categorise correctly. Don't attempt anything beyond observation without confirmed competence.">
            <p>Categorisation summary:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Licensed work (Reg 8)</strong> — sprayed coatings, lagging, large AIB removal, friable insulation. HSE-licensed contractor only.</li>
              <li><strong>NNLW (Notifiable Non-Licensed Work)</strong> — limited removal of less-friable materials by trained personnel; HSE notification + medical surveillance + records.</li>
              <li><strong>Non-licensed work</strong> — short, infrequent, low-risk tasks (e.g. small cement product handling) by trained operatives following CAR 2012 controls.</li>
              <li><strong>Awareness only</strong> — knowing it's there but not disturbing it.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Control of Asbestos Regulations 2012 — Reg 8(1)" clause={<>"Subject to regulation 3(2), an employer must ensure that any work with asbestos undertaken by the employer&apos;s employees is carried out in accordance with a licence granted by the Executive under regulation 3(1) of the Asbestos (Licensing) Regulations 1983 unless the work is exempted from the requirement for a licence by regulation 3(2)."</>} meaning={<>Reg 8 — licensed work requires an HSE licence. The exemptions in Reg 3(2) and elsewhere create the NNLW and non-licensed categories for lower-risk activity. Most apprentice-encountered asbestos work falls in the licensed or NNLW band; default to escalation.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 8 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Discovery procedure and disposal</ContentEyebrow>
          <ConceptBlock title="Found suspect material — what to do" plainEnglish="Stop, don\'t disturb, evacuate area, escalate. The L3 supervisor reflex on discovery: protect the team, document, escalate to dutyholder + firm + principal contractor where applicable, await confirmation before proceeding." onSite="Photograph the material from a safe distance; don\'t touch; close off the area; brief the team to stay clear. Phone the firm\'s H&S manager and the customer\'s responsible person. Don\'t speculate on type or risk — let the surveyor determine.">
            <p>Discovery procedure:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>STOP work immediately.</li>
              <li>Don&apos;t disturb further (no touching, no tools, no movement of material).</li>
              <li>Vacate the immediate area; close off if possible.</li>
              <li>Document — photo from safe distance; note location, type apparent, condition, surrounding materials.</li>
              <li>Phone firm&apos;s H&amp;S manager / contracts manager.</li>
              <li>Inform dutyholder (building owner / managing agent / customer).</li>
              <li>Inform principal contractor (if appointed) for cascade through the project.</li>
              <li>Don&apos;t restart work in the affected area until: (a) confirmed non-asbestos by survey, OR (b) licensed contractor takes over disturbance work.</li>
              <li>Update RAMS to reflect the discovery and the new procedure.</li>
              <li>Notify own exposure if any disturbance occurred; record on personal file.</li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Disposal of asbestos waste" plainEnglish="Asbestos waste is hazardous waste. Double-bagged in heavy-duty asbestos bags (red inner, clear outer with label), labelled, accompanied by Hazardous Waste Consignment Note, transported by licensed asbestos waste carrier, disposed of at permitted asbestos waste facility." onSite="The L3 supervisor doesn\'t handle asbestos waste personally (that\'s licensed work). But knowing the regime exists informs the customer conversation about why the disposal is more involved than \'a skip\'.">
            <p>Disposal regime:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Double-bagged: red inner (asbestos-marked), clear outer with hazardous waste label.</li>
              <li>Each bag labelled with details of producer, type, quantity, date.</li>
              <li>Hazardous Waste Consignment Note (HWCN) accompanies transport.</li>
              <li>Licensed asbestos waste carrier — registered with EA / SEPA / NRW.</li>
              <li>Permitted asbestos waste facility (specific landfill cells).</li>
              <li>Producer retains HWCN for 3 years (Hazardous Waste Regs 2005).</li>
              <li>Mixing with general waste is multiple offences (CAR 2012, Hazardous Waste Regs, EPA 1990).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Health surveillance, training duties and electrical-trade specifics</ContentEyebrow>
          <ConceptBlock title="CAR 2012 Reg 10 — training tiers" plainEnglish="Three training tiers under CAR 2012 Reg 10. Asbestos awareness (Category A) — for anyone whose work may foreseeably expose them; UKATA / IATP 1-day course; refresher annually. Non-licensed work training (Category B) — for those carrying out non-licensed asbestos work; more comprehensive. Licensed work training (Category C) — for licensed contractor operatives; specialised." onSite="The L3 supervisor at minimum holds Category A awareness; checks all team members&apos; awareness training is current; ensures Category B / C is held by anyone undertaking actual disturbance work. Without training, work cannot lawfully proceed.">
            <p>Training tier requirements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Category A — Asbestos Awareness</strong> — UKATA / IATP 1-day; refresher annually; for any trade that may encounter ACMs.</li>
              <li><strong>Category B — Non-Licensed Work</strong> — additional training; HSE notification (NNLW) where work scope crosses notifiable threshold.</li>
              <li><strong>Category C — Licensed Work</strong> — operatives of HSE-licensed contractors; comprehensive specialist training.</li>
              <li><strong>Refresher</strong> — annual for awareness; periodic for higher tiers per scheme.</li>
              <li><strong>Records</strong> — operative training matrix; cert numbers; expiry dates.</li>
              <li><strong>L3 supervisor</strong> — verifies team training currency before any work in pre-2000 building.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Health surveillance under CAR 2012" plainEnglish="CAR 2012 Reg 22 requires medical surveillance for employees doing licensed asbestos work or NNLW. Initial medical, then 2-yearly review. Records retained 40 years (lifetime exposure tracking). The medical includes lung function tests and clinical examination." onSite="The L3 supervisor on a routine electrical install isn&apos;t doing licensed work, so Reg 22 surveillance won&apos;t typically apply. But knowing it exists informs the conversation when escalating to licensed contractor — &apos;this is why we don&apos;t do this work ourselves; their operatives have surveillance set up&apos;.">
            <p>Surveillance regime per work tier:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Awareness only</strong> — no surveillance required (no exposure expected).</li>
              <li><strong>Non-licensed work</strong> — surveillance not strictly required by CAR 2012 but good practice; some firms apply.</li>
              <li><strong>NNLW</strong> — surveillance required under CAR 2012 Reg 22 (some categories).</li>
              <li><strong>Licensed work</strong> — surveillance required under Reg 22; biennial review.</li>
              <li><strong>Records</strong> — 40 years retention (lifetime tracking).</li>
              <li><strong>Post-employment</strong> — exposure history follows the worker; civil claims decades later possible.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Asbestos in electrical-trade equipment specifically" plainEnglish="Beyond building fabric, electrical equipment from the asbestos era can contain asbestos in its own construction. Older fuse boards (AIB backing), gaskets in motors and switchgear, insulation in older cables, arc chutes in some MCCBs, asbestos-containing seal materials in older transformers." onSite="When working on pre-2000 electrical equipment, treat the equipment itself as suspect, not just the building around it. Removal / replacement of older fuse boards may disturb AIB backing. Older motor gaskets disturbed during termination work can release fibres. Brief team accordingly.">
            <p>Equipment-specific risk areas:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fuse boards (pre-1985)</strong> — possible AIB backing; cement asbestos enclosures.</li>
              <li><strong>Motor gaskets</strong> — older motor flange / terminal-box gaskets.</li>
              <li><strong>Switchgear arc chutes</strong> — some older MCCB / ACB designs.</li>
              <li><strong>Transformer seals</strong> — older transformer gaskets and bushings.</li>
              <li><strong>Cable insulation</strong> — very old cables (pre-1960s) may have asbestos braid.</li>
              <li><strong>Cable trays / runs in fire-rated walls</strong> — original asbestos lining around penetrations.</li>
              <li><strong>Heat shields and barriers</strong> — original heat-resistant materials around equipment.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Control of Asbestos Regulations 2012 — Reg 10 (Information, instruction and training)" clause={<>"Every employer must ensure that adequate information, instruction and training is given to those of his employees — (a) who are or who are liable to be exposed to asbestos, or who supervise such employees so they are aware of — (i) the properties of asbestos and its effects on health, including its interaction with smoking; (ii) the types of products or materials likely to contain asbestos; (iii) the operations which could result in asbestos exposure and the importance of preventive controls to minimise exposure; ..."</>} meaning={<>Reg 10 — training duty. Information, instruction AND training all required. UKATA / IATP-certified courses meet the requirement for awareness; higher tiers for non-licensed and licensed work. Records of training retained as competence evidence. Without training, the work cannot lawfully be done.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 10 — verbatim from legislation.gov.uk." />

          <SectionRule />
          <CommonMistake title="Drilling into a textured ceiling without checking" whatHappens={<>Apprentice drills into 1980s domestic textured ceiling to fit a ceiling rose; releases dust into the room. Customer mentions ceiling has the textured finish; apprentice realises chrysotile was probably present. Personal exposure recorded; CAR 2012 Reg 6 (exposure assessment) and Reg 7 (prevention) breach; firm prosecuted; potential health surveillance for the operative.</>} doInstead={<>Pre-2000 textured coating = suspect chrysotile until survey rules out. STOP. Customer can be asked about previous surveys; if none, recommend testing before any disturbance. Many test labs offer fast turnaround for a single sample.</>} />

          <CommonMistake title="Disposing of a small piece of cement product in the general skip" whatHappens={<>Apprentice replaces an old electrical box mounted on an asbestos cement panel; small fragment broken off; tossed into general skip with confidence that &quot;it&apos;s only cement bonded&quot;. Skip is later inspected; load contaminated; firm fined under Hazardous Waste Regs and CAR 2012 disposal requirements.</>} doInstead={<>Asbestos cement = hazardous waste regardless of bonding. Don&apos;t handle disposal personally; escalate to licensed contractor for removal AND for compliant disposal. The cost is small; the alternative is multiple regulatory offences.</>} />

          <Scenario title="Suspected asbestos found mid-job" situation={<>You\'re partway through a small electrical alteration in a 1970s commercial unit. Drilling a fixing hole in the ceiling has revealed what looks like AIB above the suspended ceiling tiles. You weren\'t expecting it; the customer\'s site manager thought it had all been removed years ago.</>} whatToDo={<>Stop drilling immediately. Withdraw from the area. Do not allow further drilling / disturbance in the area. Photograph from safe distance — note location, what you saw, the fact you drilled into it. Phone your firm&apos;s H&amp;S manager / contracts manager — &quot;suspect AIB found mid-job; have stopped&quot;. Inform the customer&apos;s site manager — &quot;need to confirm what this is before we can continue&quot;. The site manager (as dutyholder) needs to engage a surveyor / licensed contractor; that&apos;s their decision and their cost. Update your dynamic risk assessment with the discovery. Brief the rest of your team; close off the area; restrict access. Personal: record your potential exposure (brief, single-bore drill — likely low-level but record). The customer&apos;s assumption that &quot;it&apos;s all been removed&quot; is a common error; their asbestos register may not be current. Don&apos;t recommence work in the affected area until either confirmed non-asbestos or licensed contractor has dealt with the disturbance properly.</>} whyItMatters={<>This is a textbook scenario that the L3 supervisor handles routinely on pre-2000 buildings. The discovery isn&apos;t failure; the response is the test. Stopping immediately, escalating, documenting, restricting access — these are the supervisor acts that protect the team and create the evidence trail. The customer&apos;s commercial pressure (&quot;just finish the job today&quot;) is real but cannot override CAR 2012. ERA s.44 protects the refusal. The firm&apos;s reputation for thoroughness is reinforced; the alternative — proceeding and contaminating the wider area — would be career-defining in the wrong direction.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — pre-2000 = suspect asbestos. At L3 the depth is CAR 2012 specifics, survey types, licensed-vs-non-licensed boundary.",
            "CAR 2012 Reg 4 — duty to manage; asbestos register required for non-domestic premises and common parts of multi-occupied residential.",
            "Three asbestos types: chrysotile (white), amosite (brown), crocidolite (blue). All hazardous.",
            "Wide range of ACMs: textured coatings, AIB, cement products, lagging, sprayed coatings, floor tiles, gaskets, electrical components.",
            "Two survey types: Management (for register) and Refurbishment (pre-disturbance). Refurb survey before significant alteration.",
            "Licensed work (CAR 2012 Reg 8) requires HSE-licensed contractor. NNLW for some lower-risk; non-licensed for least-risk. Default = escalate.",
            "Discovery procedure: STOP → don\'t disturb → evacuate area → document → escalate to firm + dutyholder + PC.",
            "Disposal: double-bagged, HWCN, licensed carrier, permitted facility. Mixing with general waste = multiple offences.",
          ]} />
          <Quiz title="Asbestos — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4-5')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.5 Fire extinguishers</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next section <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Section 5 — Layered L3 depth (2357 ELTK01)</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
