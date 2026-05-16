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
  { question: 'What is the CAR 2012 Control Limit and why does it matter?', answer: 'CAR 2012 sets a Control Limit of 0.1 fibres per cm³ of air, averaged over 4 hours. The control limit is the maximum airborne concentration that must not be exceeded. The Action Level (related to historic regulations) and the Notification threshold for NNLW use similar metrics. The L3 doesn&apos;t personally measure airborne fibre levels — that&apos;s analyst territory — but knowing the threshold exists informs the conversation about why monitoring is required around any disturbance work.' },
  { question: 'What is COSHH 2002 and how does it relate to CAR 2012?', answer: 'COSHH 2002 (Control of Substances Hazardous to Health Regulations) is the general regulation for hazardous substance exposure at work — chemicals, fume, dust, biological agents. Asbestos has its own dedicated regulation (CAR 2012) because of its specific hazard profile, but COSHH provides the wider framework — exposure assessment under Reg 6, prevention or control under Reg 7, monitoring under Reg 10. The L3 supervisor on solder fume, cleaning solvents, dust from chasing, even cement dust applies the COSHH framework even where the substance isn&apos;t separately regulated.' },
  { question: 'What about asbestos in cable insulation specifically?', answer: 'Very old cables (pre-1960s) sometimes used asbestos braid as insulation reinforcement. Most has been removed during subsequent rewires but occasionally surfaces in old industrial buildings, original installations in heritage properties, or specialist applications (heating cables, boiler-room runs). Treat as suspect; sample if necessary; licensed contractor for removal.' },
  { question: 'Does the duty to manage extend to schools and care homes?', answer: 'Yes — the duty to manage under CAR 2012 Reg 4 applies to all non-domestic premises including schools, care homes, hospitals, offices, shops, industrial premises. Local authorities, NHS trusts, school boards typically hold the duty. The L3 working in these premises asks for the asbestos register before work; particular care given the vulnerable occupant profile.' },
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
            "Asbestos kills around 5,000 UK workers per year — single largest occupational killer. Electricians and other building trades historically over-represented.",
            "Control Limit 0.1 f/cm³ over 4 hours under CAR 2012; Reg 6 exposure assessment, Reg 7 prevention / reduction, Reg 22 health surveillance for licensed and some NNLW workers.",
            "Disposal as hazardous waste under EPA 1990 + Hazardous Waste Regs 2005 — double-bagged, HWCN, licensed carrier, permitted facility.",
          ]} />
          <LearningOutcomes outcomes={[
            "Explain situations where asbestos may be encountered.",
            "Specify the procedures for dealing with suspected asbestos.",
            "Identify the three main asbestos types (chrysotile, amosite, crocidolite).",
            "State the CAR 2012 dutyholder requirement (Reg 4) and the asbestos register.",
            "Distinguish licensed work (CAR 2012 Reg 8) from NNLW and non-licensed work.",
            "Apply the supervisor escalation chain on discovery of suspect material.",
            "Describe the asbestos exposure assessment (Reg 6) and prevention / reduction hierarchy (Reg 7).",
            "State the CAR 2012 Control Limit (0.1 f/cm³ over 4 hours) and its role in clearance.",
            "Identify the disposal regime under EPA 1990 s.34 and Hazardous Waste Regulations 2005 Reg 35.",
            "Describe the COSHH 2002 framework and its relationship to CAR 2012.",
            "Recognise asbestos-related disease categories and the CAR 2012 Reg 22 health-surveillance regime.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Where asbestos is encountered</ContentEyebrow>
          <ConceptBlock title="Pre-2000 buildings and the asbestos materials" plainEnglish="Asbestos use in new building products banned in 1999. Pre-2000 buildings (and refurbishments) routinely contain asbestos. Three main types — chrysotile (white), amosite (brown), crocidolite (blue) — used in many materials including textured ceilings, insulation board, cement products, lagging, floor tiles, sprayed insulation, gaskets, electrical components. Crocidolite was largely phased out by the late 1970s as the most dangerous form; amosite use ended in 1985; chrysotile (the &quot;white&quot; asbestos, the most common and the last permitted) was banned in 1999. The full ban under the Asbestos (Prohibition) Regulations 1992 / 1999 / amendment 2003 closes the supply chain — but the materials installed before the bans remain in place and continue to be discovered during refurbishment and demolition. HSE figures show approximately 5,000 UK deaths per year from asbestos-related diseases — the single largest occupational killer." onSite="Default presumption: pre-2000 = suspect until proven otherwise. Visual identification rarely possible — laboratory sampling required. The L3 supervisor on first walking into any unfamiliar pre-2000 building asks the dutyholder for the asbestos register before any work; cross-references the register against the work scope; identifies areas where the work could disturb a registered or suspect material; plans the work to avoid disturbance or escalates for survey / licensed contractor. The cost of pre-job survey is small relative to the cost of an inadvertent disturbance.">
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

          <RegsCallout source="Control of Asbestos Regulations 2012 — Reg 4(1)" clause={<>"In order to manage the risk from asbestos in non-domestic premises, the dutyholder must ensure that — (a) a suitable and sufficient assessment is carried out as to whether asbestos is or is liable to be present in the premises; (b) in making the assessment, the dutyholder must ensure that suitable inspections are made of those parts of the premises which are reasonably accessible; ..."</>} meaning={<>Reg 4 duty to manage. Dutyholder = person in control of the premises (typically owner / landlord / managing agent). The asbestos register / management plan must be available to anyone working on the fabric. Ask for it before any disturbance work.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 4." />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Survey types and licensed work</ContentEyebrow>
          <ConceptBlock title="Management survey vs refurbishment survey" plainEnglish="Management survey — finds and assesses ACMs in normal use of the building; minimally intrusive; for the asbestos register. Refurbishment survey — pre-disturbance; intrusive; required before significant alteration / demolition. Different scopes; different costs; different prerequisites. The HSG264 guidance &quot;Asbestos: The survey guide&quot; (2nd edition, HSE 2012) is the headline reference. Surveys are carried out by qualified surveyors — typically holding the BOHS P402 / W504 qualifications and working for UKAS-accredited inspection bodies. Sampling and analysis is carried out by UKAS-accredited laboratories using polarised light microscopy (PLM) for bulk samples and phase-contrast microscopy (PCM) for airborne fibres." onSite="Before drilling / chasing / cutting in pre-2000 building, a refurbishment survey of the affected area is the gold standard. Management survey alone may be inadequate — it assesses normal-use exposure, not what happens if you open up the fabric. The L3 supervisor on quotation stage flags the survey cost back to the customer — &quot;before we can quote firm, we need a refurbishment survey of the wall void / ceiling void / etc&quot; — and waits for the survey results before committing to scope and price.">
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

          <ConceptBlock title="Licensed vs non-licensed work" plainEnglish="CAR 2012 Reg 8 — high-risk asbestos work requires HSE-licensed contractor. Includes most disturbance of friable insulation, AIB beyond very small quantities, sprayed coatings. Lower-risk work may be NNLW (Notifiable Non-Licensed Work) — trained operatives, written plan, notification. Lowest-risk may be non-licensed (still trained, still controlled). The Asbestos (Licensing) Regulations 1983 originally established the licensing regime; CAR 2012 incorporates and extends it. Licences are issued by the HSE for periods up to 3 years; licensed contractors are subject to inspection, audit, and renewal review. The HSE published list of licensed contractors is publicly available." onSite="The categorisation is technical. Get it wrong and exposure occurs. The L3 supervisor approach is conservative — escalate to specialist who can categorise correctly. Don't attempt anything beyond observation without confirmed competence. The exam-question approach to categorisation: friable (easily crumbled) → likely licensed; AIB beyond a small handful of fixings → likely licensed; sprayed coating → almost always licensed; intact cement sheet with minor non-friable disturbance → possibly non-licensed by trained operative; awareness-only encounter with no disturbance → non-licensed but training required.">
            <p>Categorisation summary:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Licensed work (Reg 8)</strong> — sprayed coatings, lagging, large AIB removal, friable insulation. HSE-licensed contractor only.</li>
              <li><strong>NNLW (Notifiable Non-Licensed Work)</strong> — limited removal of less-friable materials by trained personnel; HSE notification + medical surveillance + records.</li>
              <li><strong>Non-licensed work</strong> — short, infrequent, low-risk tasks (e.g. small cement product handling) by trained operatives following CAR 2012 controls.</li>
              <li><strong>Awareness only</strong> — knowing it's there but not disturbing it.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Control of Asbestos Regulations 2012 — Reg 8(1)" clause={<>"Subject to regulation 3(2), an employer must ensure that any work with asbestos undertaken by the employer&apos;s employees is carried out in accordance with a licence granted by the Executive under regulation 3(1) of the Asbestos (Licensing) Regulations 1983 unless the work is exempted from the requirement for a licence by regulation 3(2)."</>} meaning={<>Reg 8 — licensed work requires an HSE licence. The exemptions in Reg 3(2) and elsewhere create the NNLW and non-licensed categories for lower-risk activity. Most apprentice-encountered asbestos work falls in the licensed or NNLW band; default to escalation.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 8." />

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

          <RegsCallout source="Control of Asbestos Regulations 2012 — Reg 10 (Information, instruction and training)" clause={<>"Every employer must ensure that adequate information, instruction and training is given to those of his employees — (a) who are or who are liable to be exposed to asbestos, or who supervise such employees so they are aware of — (i) the properties of asbestos and its effects on health, including its interaction with smoking; (ii) the types of products or materials likely to contain asbestos; (iii) the operations which could result in asbestos exposure and the importance of preventive controls to minimise exposure; ..."</>} meaning={<>Reg 10 — training duty. Information, instruction AND training all required. UKATA / IATP-certified courses meet the requirement for awareness; higher tiers for non-licensed and licensed work. Records of training retained as competence evidence. Without training, the work cannot lawfully be done.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 10." />

          <SectionRule />
          <CommonMistake title="Drilling into a textured ceiling without checking" whatHappens={<>Apprentice drills into 1980s domestic textured ceiling to fit a ceiling rose; releases dust into the room. Customer mentions ceiling has the textured finish; apprentice realises chrysotile was probably present. Personal exposure recorded; CAR 2012 Reg 6 (exposure assessment) and Reg 7 (prevention) breach; firm prosecuted; potential health surveillance for the operative.</>} doInstead={<>Pre-2000 textured coating = suspect chrysotile until survey rules out. STOP. Customer can be asked about previous surveys; if none, recommend testing before any disturbance. Many test labs offer fast turnaround for a single sample.</>} />

          <CommonMistake title="Disposing of a small piece of cement product in the general skip" whatHappens={<>Apprentice replaces an old electrical box mounted on an asbestos cement panel; small fragment broken off; tossed into general skip with confidence that &quot;it&apos;s only cement bonded&quot;. Skip is later inspected; load contaminated; firm fined under Hazardous Waste Regs and CAR 2012 disposal requirements.</>} doInstead={<>Asbestos cement = hazardous waste regardless of bonding. Don&apos;t handle disposal personally; escalate to licensed contractor for removal AND for compliant disposal. The cost is small; the alternative is multiple regulatory offences.</>} />

          <Scenario title="Suspected asbestos found mid-job" situation={<>You\'re partway through a small electrical alteration in a 1970s commercial unit. Drilling a fixing hole in the ceiling has revealed what looks like AIB above the suspended ceiling tiles. You weren\'t expecting it; the customer\'s site manager thought it had all been removed years ago.</>} whatToDo={<>Stop drilling immediately. Withdraw from the area. Do not allow further drilling / disturbance in the area. Photograph from safe distance — note location, what you saw, the fact you drilled into it. Phone your firm&apos;s H&amp;S manager / contracts manager — &quot;suspect AIB found mid-job; have stopped&quot;. Inform the customer&apos;s site manager — &quot;need to confirm what this is before we can continue&quot;. The site manager (as dutyholder) needs to engage a surveyor / licensed contractor; that&apos;s their decision and their cost. Update your dynamic risk assessment with the discovery. Brief the rest of your team; close off the area; restrict access. Personal: record your potential exposure (brief, single-bore drill — likely low-level but record). The customer&apos;s assumption that &quot;it&apos;s all been removed&quot; is a common error; their asbestos register may not be current. Don&apos;t recommence work in the affected area until either confirmed non-asbestos or licensed contractor has dealt with the disturbance properly.</>} whyItMatters={<>This is a textbook scenario that the L3 supervisor handles routinely on pre-2000 buildings. The discovery isn&apos;t failure; the response is the test. Stopping immediately, escalating, documenting, restricting access — these are the supervisor acts that protect the team and create the evidence trail. The customer&apos;s commercial pressure (&quot;just finish the job today&quot;) is real but cannot override CAR 2012. ERA s.44 protects the refusal. The firm&apos;s reputation for thoroughness is reinforced; the alternative — proceeding and contaminating the wider area — would be career-defining in the wrong direction.</>} />

          <SectionRule />
          <ContentEyebrow>Asbestos health effects and surveillance</ContentEyebrow>

          <ConceptBlock
            title="Why asbestos kills more UK workers than any other workplace agent"
            plainEnglish="Asbestos is the single largest occupational killer in the UK. HSE figures show around 5,000 deaths per year from asbestos-related diseases, with electricians and other building-trades operatives consistently among the highest-affected occupations. The diseases — mesothelioma, asbestos-related lung cancer, asbestosis, pleural plaques — have decades-long latency. Operatives exposed in their 20s die of mesothelioma in their 60s and 70s. There is no safe exposure level for the carcinogenic effects."
            onSite="The L3 reading: even a single significant exposure can cause disease decades later. The cumulative low-level exposures across a career add up. The discipline that protects you isn&apos;t glamorous — pre-2000 presumption, surveys before disturbance, refusing to drill into unknown surfaces, escalating discoveries — but it&apos;s what stops you being one of the 5,000 names on next decade&apos;s register."
          >
            <p>Asbestos-related diseases:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mesothelioma</strong> — cancer of the lining of lungs, heart or
                abdomen. Caused exclusively by asbestos. Always fatal. 20-50 year
                latency.
              </li>
              <li>
                <strong>Asbestos-related lung cancer</strong> — clinically indistinguishable
                from smoking-related lung cancer; the asbestos exposure shifts the
                attribution.
              </li>
              <li>
                <strong>Asbestosis</strong> — progressive lung scarring. Heavy
                cumulative exposure; not seen with low-level work-only exposure.
              </li>
              <li>
                <strong>Pleural plaques</strong> — thickening of the pleural lining;
                largely benign but indicates significant prior exposure; marker for
                elevated mesothelioma risk.
              </li>
              <li>
                <strong>Pleural thickening (diffuse)</strong> — more extensive than
                plaques; can affect lung function.
              </li>
              <li>
                <strong>Combined smoking</strong> — multiplicative effect on lung cancer
                risk; asbestos + smoking is far worse than either alone.
              </li>
              <li>
                <strong>Health surveillance</strong> — under CAR 2012 Reg 22, mandatory
                for licensed workers and recommended for non-licensed; lung function
                tests, chest radiographs, occupational health review.
              </li>
              <li>
                <strong>Records retained 40 years</strong> — CAR 2012 Reg 22(7);
                long-latency disease requires long-retention records.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Exposure assessment, monitoring and prevention</ContentEyebrow>

          <ConceptBlock
            title="CAR 2012 Regs 6 and 7 — exposure assessment and prevention"
            plainEnglish="Before any work that may expose employees to asbestos, CAR 2012 Reg 6 requires the employer to make a suitable and sufficient assessment of whether asbestos is liable to be present and, if so, what the exposure is likely to be. Reg 7 then requires prevention of exposure where reasonably practicable, or reduction to the lowest level reasonably practicable. The hierarchy of control applies in the asbestos context: eliminate (don&apos;t do the work; avoid disturbance); substitute (use a different work method that doesn&apos;t disturb the material); engineering controls (local exhaust ventilation, controlled wetting); administrative controls (limit time exposed, rotate personnel, exclusion zones); RPE (respiratory protective equipment as last line)."
            onSite="The L3 supervisor reading the firm&apos;s asbestos exposure assessment for the job: what materials are presumed or confirmed asbestos; what work activities are planned; what exposure is anticipated; what controls are in place; what RPE is specified; what air-monitoring (if any) is in place. The L3 doesn&apos;t personally write the assessment for licensed work (that&apos;s the licensed contractor&apos;s competence), but reads and understands it before authorising any team activity in the area."
          >
            <p>CAR 2012 exposure-control hierarchy in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Eliminate</strong> — avoid the work; route services
                round the ACM; design alternative.
              </li>
              <li>
                <strong>Substitute</strong> — use a non-disturbance method
                (e.g. surface cable run vs chasing).
              </li>
              <li>
                <strong>Engineering controls</strong> — local exhaust
                ventilation (H-class extraction), controlled wetting,
                enclosure, negative-pressure containment.
              </li>
              <li>
                <strong>Administrative controls</strong> — limit time;
                exclusion zone; signage; competent operatives only;
                supervision.
              </li>
              <li>
                <strong>RPE</strong> — face-fitted respirator appropriate to
                the work type; FFP3 disposables (basic non-licensed), full or
                half-face filter (mid-tier), powered air-purifying respirator
                (licensed); face-fit testing required.
              </li>
              <li>
                <strong>Personal decontamination</strong> — vacuum (H-class
                only), disposable coveralls, change facility, washing.
              </li>
              <li>
                <strong>Air monitoring</strong> — reassurance (background),
                personal (operative exposure), leak (containment integrity),
                clearance (post-work) — all by accredited analyst.
              </li>
              <li>
                <strong>Clearance certificate</strong> — &quot;Certificate of
                Reoccupation&quot; following 4-stage clearance (visual,
                cleaning, air test, final visual) on licensed work.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The control limit, action level and analyst&apos;s role"
            plainEnglish="CAR 2012 sets a Control Limit of 0.1 fibres per cm³ averaged over 4 hours. The control limit is the absolute maximum airborne concentration that must not be exceeded by any worker. Note: the absence of a fibre reading above the control limit does NOT mean &quot;safe&quot; — the cumulative dose matters for long-latency disease, and the control limit is a regulatory threshold, not a health-based safe level. Below it is &quot;not in breach&quot; but still hazardous. Analyst&apos;s reports specify the sample period, the analytical method (PCM for routine, SEM for low concentrations), and the concentration result."
            onSite="The L3 supervisor on a licensed-work job won&apos;t personally interpret analyst&apos;s reports but will see them on handover. The two key things to look at: was the work-area concentration kept below 0.1 f/cm³ over 4 hours; did the final clearance certificate (Certificate of Reoccupation) confirm clean air, clean surfaces, no visible debris. The licensed contractor packs the clearance evidence into the project&apos;s health and safety file."
          >
            <p>Analytical and monitoring framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PCM (Phase Contrast Microscopy)</strong> — standard
                analytical method for airborne fibre concentration; counts
                fibres on filter membranes.
              </li>
              <li>
                <strong>SEM (Scanning Electron Microscopy)</strong> — used at
                very low concentrations or where fibre identification is
                needed.
              </li>
              <li>
                <strong>PLM (Polarised Light Microscopy)</strong> — for bulk
                sample identification; distinguishes asbestos types from
                non-asbestos minerals.
              </li>
              <li>
                <strong>Control limit</strong> — 0.1 f/cm³ over 4 hours under
                CAR 2012; not a health-based safe level.
              </li>
              <li>
                <strong>Clearance air test</strong> — &lt; 0.01 f/cm³ for
                reoccupation following licensed work.
              </li>
              <li>
                <strong>Analyst competence</strong> — accredited under ISO/IEC
                17025; analysts hold P403 / P404 / S301 qualifications.
              </li>
              <li>
                <strong>Reporting</strong> — formal reports retained in the
                project safety file; copies to dutyholder and licensed
                contractor.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Control of Asbestos Regulations 2012 — Reg 7(1) (Prevention or reduction of exposure to asbestos)"
            clause={
              <>
                &quot;Every employer must — (a) prevent the exposure to asbestos
                of any employee employed by that employer so far as is reasonably
                practicable; or (b) where it is not reasonably practicable to
                prevent such exposure — (i) take the measures necessary to reduce
                exposure to asbestos to the lowest level reasonably practicable
                by measures other than the use of respiratory protective
                equipment; and (ii) ensure that the number of employees exposed
                to asbestos is as low as is reasonably practicable.&quot;
              </>
            }
            meaning={
              <>
                Reg 7 — the prevention-first principle. Note the explicit
                priority of prevention over reduction, and within reduction the
                explicit priority of non-RPE measures over RPE. This is the
                hierarchy of control in regulatory form. RPE is the last line
                — used only after engineering and administrative controls have
                reduced exposure as far as reasonably practicable.
              </>
            }
            cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 7."
          />

          <SectionRule />
          <ContentEyebrow>COSHH 2002 — the wider hazardous-substance framework</ContentEyebrow>

          <ConceptBlock
            title="Why COSHH matters to the electrical trade — beyond asbestos"
            plainEnglish="The Control of Substances Hazardous to Health Regulations 2002 are the general framework for workplace exposure to hazardous substances — chemicals, dusts, fumes, vapours, mists, gases, biological agents. Asbestos has its own dedicated regulation (CAR 2012) because of its specific risk profile, but the COSHH structure provides the wider model the L3 supervisor applies day to day. COSHH requires the employer to identify substances used (Reg 6 exposure assessment), apply the hierarchy of control under Reg 7 (eliminate, substitute, engineering controls, administrative controls, PPE), provide information / instruction / training under Reg 12, monitor exposure under Reg 10, conduct health surveillance under Reg 11 where required."
            onSite="The L3 reflex on substances encountered in normal electrical work: solder fume (lead-free now standard, but flux fume still hazardous); cleaning solvents (IPA, electrical contact cleaner); cable lubricant; flexible conduit dust; cement dust from chasing; silica dust from concrete cutting (Reg 7 specific control); machine oil; battery electrolyte. Each is a COSHH substance. The control hierarchy applies — local exhaust ventilation for solder fume, on-tool dust extraction for chasing, water-suppression for concrete cutting, gloves for solvents, eye protection for any spray application. Compliance is documented in COSHH assessments held by the firm."
          >
            <p>COSHH Regulations key duties:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 6 — Exposure assessment</strong>: identify
                substances, routes of exposure, persons exposed, control
                measures needed.
              </li>
              <li>
                <strong>Reg 7 — Prevention or control</strong>: hierarchy of
                control mirroring MHSWR Schedule 1.
              </li>
              <li>
                <strong>Reg 8 — Use of control measures</strong>: provided
                controls actually used by operatives.
              </li>
              <li>
                <strong>Reg 9 — Maintenance, examination and test of
                controls</strong>: extraction systems, RPE, etc.
              </li>
              <li>
                <strong>Reg 10 — Monitoring</strong>: airborne concentration
                monitoring where appropriate.
              </li>
              <li>
                <strong>Reg 11 — Health surveillance</strong>: where exposure
                creates identifiable disease and validated technique exists.
              </li>
              <li>
                <strong>Reg 12 — Information, instruction and
                training</strong>: workers know the hazards and controls.
              </li>
              <li>
                <strong>Schedule 1</strong> — substances with specific
                provisions (lead, mercury, etc).
              </li>
              <li>
                <strong>Workplace Exposure Limits (WELs)</strong> — published in
                HSE EH40; quoted in 8-hour and short-term reference periods.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The hazardous-waste framework — disposal regime end to end"
            plainEnglish="Disposal of waste material from work activities is governed by the Environmental Protection Act 1990 Part II (waste duty of care under s.34), the Hazardous Waste (England and Wales) Regulations 2005, the equivalent regimes in Scotland and Northern Ireland, and the relevant List of Wastes Regulations. Asbestos waste, lead-acid batteries, lithium batteries, fluorescent tubes (mercury), oil-filled equipment (transformers, capacitors with possible PCB content), some sealed-source smoke detectors, contaminated soils, and aerosol cans are common electrical-trade waste streams that classify as hazardous. The duty of care under EPA s.34 requires the producer of the waste to ensure it is managed properly all the way to final disposal — passing it to an unlicensed carrier is itself an offence."
            onSite="The L3 supervisor on any project producing hazardous waste: identify the waste streams; segregate at source; use authorised waste carriers (registered with the Environment Agency / SEPA / NRW); raise the Hazardous Waste Consignment Note (HWCN); retain records for at least 3 years; cross-check carrier registration before handover. WEEE (Waste Electrical and Electronic Equipment) under the WEEE Regulations 2013 covers fluorescent tubes, control equipment, transformers, lighting. Some categories of WEEE are also hazardous waste (mercury tubes, oil-filled capacitors) — both regimes apply."
          >
            <p>Hazardous-waste handling rules:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identification</strong> — match waste to the List of
                Wastes codes; flag as hazardous where applicable.
              </li>
              <li>
                <strong>Segregation</strong> — keep hazardous streams separate
                from general; never mix.
              </li>
              <li>
                <strong>Storage</strong> — appropriate container; labelled;
                drip-tray under liquid waste; locked where vulnerable to
                tampering.
              </li>
              <li>
                <strong>HWCN</strong> — Hazardous Waste Consignment Note for
                every movement of hazardous waste; producer copy, carrier
                copy, recipient copy.
              </li>
              <li>
                <strong>Licensed carrier</strong> — registered with the
                relevant environmental regulator; cross-check on EA / SEPA /
                NRW register.
              </li>
              <li>
                <strong>Permitted facility</strong> — only authorised
                facilities can receive specific waste types.
              </li>
              <li>
                <strong>Records</strong> — HWCN, carrier registration, recipient
                permit — retained 3 years minimum.
              </li>
              <li>
                <strong>WEEE 2013</strong> — separate but overlapping regime
                for electrical equipment; producer takeback obligations.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Environmental Protection Act 1990 — s.34(1) (Duty of care as respects waste)"
            clause={
              <>
                &quot;It shall be the duty of any person who imports, produces,
                carries, keeps, treats or disposes of controlled waste or, as a
                broker, has control of such waste, to take all such measures
                applicable to him in that capacity as are reasonable in the
                circumstances — (a) to prevent any contravention by any other
                person of section 33 above; (b) to prevent the escape of the
                waste from his control or that of any other person; and (c) on
                the transfer of the waste, to secure — (i) that the transfer is
                only to an authorised person or to a person for authorised
                transport purposes; and (ii) that there is transferred such a
                written description of the waste as will enable other persons to
                avoid a contravention of that section and to comply with the
                duty under this subsection as respects the escape of waste.&quot;
              </>
            }
            meaning={
              <>
                EPA s.34 — the waste duty of care. Applies to the producer of
                the waste (the contractor doing the works) as well as the
                carrier and the receiver. The duty doesn&apos;t end when the
                skip leaves site — it ends when the waste reaches its final
                authorised disposal point. The L3 supervisor verifies carrier
                registration before any hazardous-waste movement; retains the
                HWCN; chases the recipient&apos;s acknowledgement of receipt.
                Sloppy waste handling is a criminal offence under both s.33
                (unauthorised deposit) and s.34 (failure of duty of care).
              </>
            }
            cite="Source: Environmental Protection Act 1990 (1990 c.43), s.34."
          />

          <RegsCallout
            source="Hazardous Waste (England and Wales) Regulations 2005 — Reg 35(1)"
            clause={
              <>
                &quot;Every person who, in the course of a business or otherwise
                for profit, transports controlled waste between different
                premises must on each occasion ensure that the waste is
                accompanied by a transfer note containing the prescribed
                particulars.&quot;
              </>
            }
            meaning={
              <>
                Reg 35 — the hazardous-waste consignment-note regime. Every
                movement of hazardous waste must be documented; the producer
                retains a copy; the carrier retains a copy; the recipient
                retains a copy. Failure is an offence and is the most common
                hazardous-waste enforcement action.
              </>
            }
            cite="Source: Hazardous Waste (England and Wales) Regulations 2005 (SI 2005/894), Reg 35."
          />

          <RegsCallout
            source="Control of Asbestos Regulations 2012 — Reg 22(1) (Health records and medical surveillance)"
            clause={
              <>
                &quot;Every employer must ensure that a health record, containing
                particulars approved by the Executive, is maintained in respect of
                each of his employees who is exposed to asbestos in a case where
                that exposure is by reason of work which is subject to medical
                surveillance under paragraph (2), and the record or a copy thereof
                is kept available for at least 40 years from the date of the last
                entry made in it.&quot;
              </>
            }
            meaning={
              <>
                Reg 22 — health records and medical surveillance. The 40-year
                retention reflects the long latency of asbestos-related disease:
                an exposure today could give rise to a claim or disease decades
                later, and the records must outlast the employment, the firm in
                many cases, and the original employer&apos;s knowledge of who was
                exposed. For licensed work and most NNLW, biennial medical
                surveillance is required; the record covers exposure history,
                medical examinations, and any abnormal findings.
              </>
            }
            cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 22."
          />

          <ConceptBlock
            title="Asbestos and the customer conversation — managing expectation"
            plainEnglish="The L3 supervisor&apos;s ability to manage the customer conversation when asbestos is discovered is a real professional skill. Customers&apos; reactions vary — some are unconcerned (&quot;a bit of asbestos never hurt anyone&quot;), some panic, some are angry at being told. The L3 framing is calm, factual, brief: &quot;We&apos;ve found suspect material that we need confirmed before we can safely continue. The standard route is a sample tested at an accredited lab; turnaround is typically 1-3 working days. If confirmed, we then need either a licensed contractor for removal or a documented &apos;leave in place&apos; plan, depending on what the survey says.&quot; The conversation is short, factual, and ends with a clear next step."
            onSite="Don&apos;t speculate about type or risk — let the survey speak. Don&apos;t describe the material in alarming language (&quot;poison&quot;, &quot;deadly&quot;) — accurate and measured is more credible. Do explain why the response is what it is — the law, the duty of care, the protection of the customer&apos;s building and the team. Do offer to liaise with the customer&apos;s preferred specialist or recommend one. Do follow up in writing immediately after the conversation. The customer&apos;s subsequent perception is shaped largely by the calm professionalism of the L3 at the discovery moment."
          >
            <p>Customer-conversation framework on suspect material:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>State what was found, where, when — factually.</li>
              <li>State why work has stopped — &quot;until we know what it is&quot;.</li>
              <li>State the next step — survey / sample / specialist.</li>
              <li>State the timescale — typical turnaround, expected resumption.</li>
              <li>State the customer&apos;s role — they&apos;re the dutyholder; they engage the survey / contractor.</li>
              <li>Document the conversation in writing immediately.</li>
              <li>Be available for follow-up questions.</li>
              <li>Refer the customer to HSE asbestos guidance for further reading if they want it.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="WEEE Regulations 2013 — electrical and electronic equipment waste"
            plainEnglish="The Waste Electrical and Electronic Equipment Regulations 2013 implement the EU WEEE Directive and govern the disposal of electrical and electronic equipment at end of life. EEE includes consumer items (TVs, white goods) and commercial / industrial equipment (luminaires, control panels, transformers, lifting gear). The Regulations place producer-responsibility duties on equipment producers (take-back schemes, registration with compliance schemes); distributor duties (in-store take-back); and end-user duties (treat EEE separately from general waste, present at authorised treatment facility). Significant overlaps with hazardous waste — many EEE items contain mercury, lead, cadmium, PCBs, or other regulated substances and the WEEE Regs and Hazardous Waste Regs both apply."
            onSite="The L3 supervisor on any project involving removal of installed electrical equipment: identify the WEEE streams; segregate; arrange transport through an approved Authorised Treatment Facility (ATF); raise documentation; consider whether items also classify as hazardous waste (mercury tubes, oil-filled capacitors, smoke detectors with sealed radioactive sources, lithium / lead batteries). Larger installations (commercial refit, hospital strip-out, industrial removal) generate substantial WEEE volumes; the regulatory regime is consequential. Documentation retained as part of project handover."
          >
            <p>WEEE classifications relevant to electrical trade:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Category 1</strong> — Large household appliances (washers,
                cookers, fridges with refrigerant gases — F-gas regime overlap).
              </li>
              <li>
                <strong>Category 2</strong> — Small household appliances.
              </li>
              <li>
                <strong>Category 3</strong> — IT and telecommunications equipment.
              </li>
              <li>
                <strong>Category 5</strong> — Lighting equipment (fluorescent
                tubes, LED panels, emergency lighting fittings) — major
                electrical-trade stream.
              </li>
              <li>
                <strong>Category 6</strong> — Electrical and electronic tools
                (drills, test equipment) at end of life.
              </li>
              <li>
                <strong>Category 9</strong> — Monitoring and control
                instruments (older meters, control panels).
              </li>
              <li>
                <strong>Producer responsibility</strong> — equipment producers
                pay into compliance schemes; treatment funded.
              </li>
              <li>
                <strong>Authorised Treatment Facility (ATF)</strong> — registered
                with EA / SEPA / NRW; receives WEEE for treatment / recycling.
              </li>
              <li>
                <strong>Hazardous overlap</strong> — mercury, lead, cadmium,
                PCBs, radioactive — both regimes apply where present.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Fluorescent tube and luminaire removal during a commercial refit"
            situation={
              <>
                A 1990s commercial office is being stripped out for refit. Your
                firm is the principal contractor for the electrical works,
                including removal of around 200 existing fluorescent fittings
                with T8 tubes, some emergency-lit, the older units with
                tar-bonded ballasts and some likely to contain PCBs in the
                capacitors. The customer says &quot;just chuck it all in the
                general skip — the demolition firm has a big one outside&quot;.
              </>
            }
            whatToDo={
              <>
                Stop. Fluorescent tubes contain small quantities of mercury and
                are classified as hazardous WEEE; older ballast capacitors may
                contain PCBs (polychlorinated biphenyls) which are
                Persistent Organic Pollutants requiring specific destruction
                routes. The &quot;general skip&quot; approach is a clear breach
                of EPA s.34, Hazardous Waste Regulations 2005, and WEEE
                Regulations 2013. Educate the customer: &quot;these tubes are
                hazardous waste under the WEEE Regs. We have to handle them
                separately. Here&apos;s our plan.&quot; Plan: (1) Segregate
                tubes from luminaires at point of removal. (2) Tubes
                transported intact (don&apos;t break) to a licensed WEEE
                facility; specific tube-storage tubes used for transport. (3)
                Older ballast capacitors examined for PCB labelling; suspect
                units quarantined; tested where uncertain. (4) Luminaire
                bodies (steel) recycled through metals waste stream. (5) HWCN
                raised for the tubes and any PCB-containing capacitors; carrier
                registration verified. (6) Records retained. (7) The customer
                signs off the hazardous-waste manifest. Cost passed through;
                worth the conversation up front. The cost is small relative to
                regulatory exposure.
              </>
            }
            whyItMatters={
              <>
                Skip contamination with hazardous waste is a routine enforcement
                action — EA spot-checks at skip yards find hazardous waste
                mixed with general regularly. The producer (your firm) is
                primarily liable; the demolition firm is also liable as
                carrier; the customer as commissioning party may have
                contributory liability. Fines under EPA / Hazardous Waste Regs
                / WEEE Regs run into thousands per offence; the regulator
                aggregates across the consignment. The L3 supervisor&apos;s
                two-minute customer conversation prevents a much worse
                conversation later.
              </>
            }
          />

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
            "Discovery procedure: STOP → don't disturb → evacuate area → document → escalate to firm + dutyholder + PC.",
            "Disposal: double-bagged, HWCN, licensed carrier, permitted facility. Mixing with general waste = multiple offences.",
            "CAR 2012 Reg 7 hierarchy — prevent exposure first; reduce by non-RPE measures; RPE as last line; competent RPE selection with face-fit test.",
            "Control Limit 0.1 f/cm³ over 4 hours under CAR 2012; clearance air test &lt; 0.01 f/cm³ for reoccupation.",
            "COSHH 2002 is the umbrella for non-asbestos hazardous substances at work — same hierarchy, broader scope.",
            "EPA 1990 s.34 waste duty of care + Hazardous Waste Regs 2005 Reg 35 + WEEE Regs 2013 — full hazardous-waste regime applies.",
            "Approximately 5,000 UK deaths per year from asbestos-related diseases — single largest occupational killer; latency 20-50 years.",
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
