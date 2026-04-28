/**
 * Module 1 · Section 6 · Subsection 3 — Approved Documents B / L / P interactions
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * 2357 Unit 601 ELTK01 — AC 1.5: "State the categories of statutory legislation that influence
 * health and safety practice in the workplace and the implications of non-compliance to the employer,
 * employee and other persons." The Building Regulations 2010 with Approved Documents B (fire safety),
 * L (energy efficiency) and P (electrical safety in dwellings) are non-statutory guidance giving
 * practical detail on Building Regulations compliance — safe-harbour relationship same as BS 7671 to
 * EAWR. The L3 supervisor recognises the B / L / P touchpoints in routine electrical work.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Approved Docs B / L / P interactions | Level 3 Module 1.6.3 | Elec-Mate';
const DESCRIPTION = 'L3 Approved Documents B (fire), L (energy efficiency), P (electrical safety) interactions with electrical work in dwellings.';

const checks = [
  { id: 'l3-m1-s6-sub3-p', question: 'Approved Doc P scope?', options: ['All buildings.', 'Electrical safety in dwellings (England). Sets out which electrical work is notifiable. Notifiable work must be done by Competent Person Scheme registered installer OR notified to building control. Wales has equivalent provisions.', 'Just lighting.', 'Just kitchens.'], correctIndex: 1, explanation: 'Approved Doc P = electrical safety in dwellings. Notifiable work + competent person regime.' },
  { id: 'l3-m1-s6-sub3-b', question: 'How does Approved Doc B affect electrical work?', options: ['Doesn\'t.', 'Fire safety affects emergency lighting design (BS 5266), fire detection design (BS 5839), fire-rated cable selection (CPR class), penetrations through fire-rated walls and floors, EV charging fire risk considerations, smoke control electrical systems.', 'Just paint.', 'Random.'], correctIndex: 1, explanation: 'Approved Doc B reaches deep into electrical design and installation - emergency lighting, fire detection, cable selection, penetrations.' },
  { id: 'l3-m1-s6-sub3-l', question: 'How does Approved Doc L affect electrical work?', options: ['No effect.', 'Energy efficiency requirements drive heat pump installations (F-Gas + electrical), LED lighting, BMS controls, EV charging infrastructure, on-site renewables (solar PV, batteries). All have electrical contractor implications.', 'Just insulation.', 'Random.'], correctIndex: 1, explanation: 'Approved Doc L drives the electrification of heating and the renewable / low-carbon transition. Major source of electrical work.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the legal status of Approved Documents?', options: ['Mandatory law.', 'Non-statutory guidance giving practical detail on how to comply with the Building Regulations 2010. Compliance with Approved Documents = strong evidence of compliance with Building Regs (safe-harbour relationship).', 'Optional.', 'Random.'], correctAnswer: 1, explanation: 'Approved Documents are guidance; Building Regulations 2010 is the statute. Same safe-harbour relationship as BS 7671 to EAWR.' },
  { id: 2, question: 'What\'s "notifiable work" under Approved Doc P?', options: ['All work.', 'New circuits; consumer unit replacements; work in special locations (kitchens were removed from notifiable in 2013, but work in bathrooms / outdoors / swimming pools etc remains). Must be done by Competent Person Scheme registered installer OR notified to building control.', 'Just CU.', 'Random.'], correctAnswer: 1, explanation: 'New circuits, CU replacement, special-locations work all notifiable. Competent Person Scheme (NICEIC, NAPIT, ELECSA, Stroma etc) registration covers it.' },
  { id: 3, question: 'What does CPR (Construction Products Regulation) classification do for cables?', options: ['Nothing.', 'Classifies cables by reaction to fire (Aca/B1ca/B2ca/Cca/Dca/Eca/Fca). Approved Doc B may require minimum classification in specific applications. Cable manufacturers mark CPR class on the sheath.', 'Random.', 'Customer choice.'], correctAnswer: 1, explanation: 'CPR class drives cable selection in fire-relevant applications. Approved Doc B influences what class is required.' },
  { id: 4, question: 'What\'s a "fire stopping" requirement?', options: ['No need.', 'Penetrations through fire-rated walls / floors / ceilings must be fire-stopped to maintain the fire integrity of the compartment. Cable trays, conduit, individual cables passing through fire walls all require appropriate fire stopping per Approved Doc B.', 'Random.', 'Customer choice.'], correctAnswer: 1, explanation: 'Fire stopping is a routine but often-missed requirement. Inspectors check; failures are common cause of fire spread.' },
  { id: 5, question: 'How does Approved Doc L drive heat pump work?', options: ['It doesn\'t.', 'Energy efficiency targets and Future Homes Standard direction make heat pumps standard for new builds. Heat pumps require electrical infrastructure (single-phase 32A+ or three-phase), F-Gas certified refrigerant work, controls integration. Significant trade work.', 'Random.', 'Customer ask.'], correctAnswer: 1, explanation: 'Heat pump rollout is a major trend driven by Approved Doc L (and Future Homes Standard). Major electrical trade impact.' },
  { id: 6, question: 'When does the L3 need awareness of these Approved Documents?', options: ['Never.', 'On every domestic install (Approved Doc P always relevant); on most residential refurbishment (Doc L for energy efficiency, Doc B for fire); on commercial work where fire-safety circuits are involved (Doc B). Wider awareness as residential market shifts to heat pumps and EV charging.', 'Only commercial.', 'Random.'], correctAnswer: 1, explanation: 'Approved Documents reach almost all electrical-trade residential work. L3 awareness is operational not academic.' },
  { id: 7, question: 'Are Approved Documents the same in Wales / Scotland / NI?', options: ['Yes.', 'England has its set; Wales has its own equivalent set (similar but not identical); Scotland has Building Standards Technical Handbooks (different framework); Northern Ireland has its own. Direction of travel is broadly aligned but specifics differ. Check the relevant jurisdiction.', 'Random.', 'Same as USA.'], correctAnswer: 1, explanation: 'Devolved nation differences. Always check the local framework before relying on a specific document.' },
  { id: 8, question: 'How does Approved Doc P interact with Competent Person Schemes?', options: ['Doesn\'t.', 'Notifiable work under Approved Doc P must be done by a Competent Person Scheme registered installer OR notified to local authority building control (with associated fees and inspection). CPS registration is the normal industry route - NICEIC, NAPIT, ELECSA, Stroma etc.', 'Random.', 'Customer choice.'], correctAnswer: 1, explanation: 'CPS registration is THE practical route to compliance with Approved Doc P notifiable work. Building control notification is the alternative.' },
];

const faqs = [
  { question: 'Is BS 7671 part of the Approved Documents?', answer: 'No - BS 7671 is the IET wiring regulations (BSI standard). Approved Doc P references BS 7671 as the technical basis for safe electrical installation. Compliance with BS 7671 + Approved Doc P together discharges Building Regs electrical safety requirements.' },
  { question: 'What\'s the Future Homes Standard?', answer: 'Government direction setting more demanding energy efficiency targets for new homes (heat pumps, no gas, low-carbon). Approved Doc L being progressively updated to align. Driving major electrification of heating sector.' },
  { question: 'Does Approved Doc P apply to all electrical work?', answer: 'No - Approved Doc P specifically covers dwellings (and some shared parts). Commercial work governed by Building Regs more broadly + other guidance.' },
  { question: 'What\'s a "thermal element" under Approved Doc L?', answer: 'A wall, floor or roof - element separating conditioned from unconditioned space. Energy efficiency requirements apply when these are altered. Affects insulation requirements and may indirectly drive electrical work (recessed luminaires require fire / thermal considerations).' },
  { question: 'Are EV chargers covered by specific Approved Documents?', answer: 'Approved Doc S (Infrastructure for charging electric vehicles) introduced 2021 - requirements for new dwellings and non-residential buildings to provide EV charge points. Plus Approved Doc B fire considerations + BS 7671 Section 722 for the install itself.' },
  { question: 'How do Approved Documents update?', answer: 'Periodically by government. Typically 5-10 year cycles for major revisions; interim updates and amendments more frequent. Approved Doc B has been updated multiple times post-Grenfell. Always check the current version.' },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 6</button>
          <PageHero eyebrow="Module 1 · Section 6 · Subsection 3" title="Approved Documents B / L / P interactions" description="Remember from Section 1.7 - Approved Documents support Building Regs. At L3 you understand how B (fire) / L (energy) / P (electrical safety) interact with the work you do." tone="emerald" />
          <TLDR points={[
            "Approved Documents are non-statutory guidance giving practical detail on Building Regs 2010 compliance. Safe-harbour relationship.",
            "Doc P - electrical safety in dwellings (England). Notifiable work via Competent Person Scheme or building control.",
            "Doc B (fire) drives emergency lighting, fire detection, cable CPR class, fire stopping. Doc L (energy) drives heat pumps, LED, EV charging, renewables.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify Approved Documents B (fire), L (energy), P (electrical safety) and their scopes.",
            "State the legal relationship between Approved Documents and Building Regs 2010 (safe-harbour).",
            "Identify notifiable work under Approved Doc P.",
            "Identify electrical work driven by Approved Doc L (heat pumps, EV charging, LED, renewables).",
            "Identify electrical work driven by Approved Doc B (emergency lighting, fire detection, fire-rated cable, fire stopping).",
            "Recognise devolved nation differences (Wales / Scotland / NI separate frameworks).",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Approved Doc P - electrical safety in dwellings</ContentEyebrow>
          <ConceptBlock title="Notifiable work and Competent Person Schemes" plainEnglish="Approved Doc P sets electrical safety requirements for dwellings (England). Notifiable work (new circuits, consumer unit replacements, work in special locations) must be done by Competent Person Scheme registered installer OR notified to local building control." onSite="Most domestic electrical contractors are CPS registered (NICEIC, NAPIT, ELECSA, Stroma etc). The CPS issues the certificate and notifies building control. Without CPS registration, every notifiable job needs separate building-control notification with fees.">
            <p>Notifiable work under Approved Doc P:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Installation of a new circuit.</li>
              <li>Replacement of a consumer unit.</li>
              <li>Any addition or alteration to existing circuits in a special location (bathrooms, swimming pools, outdoor including gardens, sauna).</li>
              <li>(Kitchens were removed from notifiable list in 2013.)</li>
              <li>Notifiable work must be done by Competent Person Scheme installer or notified to building control before work starts.</li>
              <li>Non-notifiable work (most general repairs and replacements) doesn&apos;t require notification but still must comply with BS 7671.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Building Regulations 2010 - Approved Document P (England)" clause={<>"Reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining or altering the installations from fire or injury."</>} meaning={<>The Approved Doc P statement of intent. Implemented through reference to BS 7671 + the notifiable work + competent person regime. Practical compliance route is BS 7671 + CPS registration.</>} cite="Source: Building Regulations 2010 (SI 2010/2214), Approved Document P (England) - published by MHCLG / DLUHC." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Approved Doc B - fire safety</ContentEyebrow>
          <ConceptBlock title="Fire safety reaches into electrical design" plainEnglish="Approved Doc B (Volume 1 dwellings, Volume 2 buildings other than dwellings) covers fire safety. Multiple electrical interactions: emergency lighting (BS 5266), fire detection / alarm (BS 5839), fire-rated cables (CPR class), fire stopping at penetrations, EV charging fire considerations, smoke control electrical systems." onSite="Post-Grenfell, Approved Doc B has been substantially updated. Current version (and any pending updates) should be referenced for any fire-safety-relevant work.">
            <p>Approved Doc B touchpoints for electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Emergency lighting design (BS 5266) - escape route illumination.</li>
              <li>Fire detection and alarm system design (BS 5839) - residential and non-residential.</li>
              <li>Cable CPR (Construction Products Regulation) class - reaction to fire.</li>
              <li>Fire stopping of penetrations through fire-rated walls / floors / ceilings.</li>
              <li>Smoke control system electrical infrastructure.</li>
              <li>Fire-fighters' lift electrical compliance.</li>
              <li>EV charging fire considerations - charge point location, separation, ventilation.</li>
              <li>Means of escape illumination and signage.</li>
              <li>Compartmentation maintained around electrical risers and cupboards.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Approved Doc L - energy efficiency</ContentEyebrow>
          <ConceptBlock title="The electrification of heating" plainEnglish="Approved Doc L (Conservation of fuel and power - Volume 1 dwellings, Volume 2 other buildings) drives energy efficiency. The Future Homes Standard direction makes heat pumps standard for new builds. Significant electrical trade impact." onSite="L3 awareness on Approved Doc L: heat pump installs (electrical + F-Gas), LED retrofit, BMS controls, EV charging infrastructure, on-site renewables (PV, battery storage). Major and growing source of electrical work.">
            <p>Approved Doc L touchpoints for electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat pump electrical infrastructure (single / three phase).</li>
              <li>F-Gas refrigerant work (Cat I-IV certified contractor required).</li>
              <li>LED lighting and lighting controls (occupancy, daylight).</li>
              <li>BMS controls integration.</li>
              <li>EV charging infrastructure (Approved Doc S + Doc L).</li>
              <li>Solar PV installation (BS 7671 Section 712).</li>
              <li>Battery storage systems (BS 7671 + emerging IEC standards).</li>
              <li>Smart metering integration.</li>
              <li>Heat recovery ventilation electrical compliance.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Approved Doc S — EV charging infrastructure</ContentEyebrow>
          <ConceptBlock title="The new charging-infrastructure document" plainEnglish="Approved Document S (Infrastructure for charging electric vehicles) was introduced in 2021. Sets requirements for new dwellings, residential buildings and most non-residential buildings to provide EV charging or cabling infrastructure. Drives an entirely new category of electrical contractor work alongside Approved Doc P installation requirements and Doc B fire considerations." onSite="L3 supervisor on a new build or major refurbishment: Doc S sets the EV charging baseline; BS 7671 Section 722 governs the install detail; Doc B drives fire considerations (location, separation, ventilation); DNO notification may be required for higher-rated installs.">
            <p>Approved Doc S coverage:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>New dwellings — EV charge point or cable route per dwelling.</li>
              <li>Residential buildings (new) — proportionate provision for residents.</li>
              <li>Non-residential new buildings (over 10 spaces) — minimum charge points.</li>
              <li>Major refurbishment — proportionate retrofit requirements.</li>
              <li>Coordination with Doc P notifiable work regime.</li>
              <li>Coordination with Doc B fire considerations.</li>
              <li>BS 7671 Section 722 governs install detail.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Building Regulations 2010 — Approved Document B Volume 1 (Dwellings)" clause={<>&quot;Where a wall or floor is required to provide compartmentation, any opening for the passage of a pipe, duct, conduit, cable or chimney, or for any other reason, should be... fire stopped to maintain the integrity of the compartment.&quot;</>} meaning={<>The fire stopping requirement. Cable penetrations through fire-rated walls / floors / ceilings must be fire stopped using approved products (intumescent collar, fire batt, fire-rated sealant). Standard requirement on every penetration; routine inspector check; common EICR coding finding when missed.</>} cite="Source: Building Regulations 2010 (SI 2010/2214), Approved Document B Volume 1 — published by MHCLG / DLUHC." />

          <ConceptBlock title="Building Control routes — full plans, building notice, CPS" plainEnglish="Three routes to Building Control compliance: (1) Full Plans application — design submitted in advance, approved before work; (2) Building Notice — work proceeds, inspections at key stages; (3) Competent Person Scheme — self-certification by registered installer for notifiable work in scope. CPS route is the practical default for domestic electrical work; commercial work more often via Full Plans / BN through main contractor." onSite="L3 supervisor needs to know which route applies. Domestic electrical work via CPS (firm registration handles); building work alongside electrical (extension, conversion) via Full Plans / BN (main contractor handles). Where CPS does not apply (e.g. firm not registered), separate Building Control notification with fees is required.">
            <p>Three Building Control routes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Full Plans</strong> — design submitted in advance, formal approval, inspection schedule.</li>
              <li><strong>Building Notice</strong> — work proceeds with inspections at key stages, no advance approval.</li>
              <li><strong>Competent Person Scheme</strong> — self-certification by registered installer for notifiable work in scope.</li>
              <li>CPS schemes for electrical work: NICEIC, NAPIT, ELECSA, Stroma.</li>
              <li>CPS issues Electrical Installation Certificate plus Building Regs compliance certificate to homeowner.</li>
              <li>CPS notifies local authority on the firm&apos;s behalf.</li>
              <li>Where CPS does not apply, Building Control notification with fees (typically £150-£500 per notification).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Approved Doc 7 — materials and workmanship" plainEnglish="Approved Document 7 (Materials and workmanship) is the cross-cutting document setting the general standard — materials should be appropriate for the circumstances; workmanship should be adequate. Underlies all other Approved Documents. The L3 supervisor reflex: BS standards, manufacturer instructions, industry good practice all evidence Doc 7 compliance." onSite="The Doc 7 framing matters when defending choices on inspection: &quot;the cable selection / installation method / fixing was per BS 7671 / manufacturer instruction / industry practice — Doc 7 satisfied&quot;. Without that framing, &quot;just because&quot; choices are weak under scrutiny.">
            <p>Doc 7 evidence routes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS / EN standards compliance.</li>
              <li>UKCA / CE marking on products.</li>
              <li>Manufacturer installation instructions followed.</li>
              <li>Industry good practice (HSG guidance, ACOPs, IET Code of Practice).</li>
              <li>Competent person scheme assessments.</li>
              <li>Documentary trail (delivery notes, batch numbers, certs).</li>
              <li>Fitness for purpose evidenced by intended-use testing.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The safe-harbour relationship and how it works" plainEnglish="Approved Documents are non-statutory guidance; the Building Regulations 2010 are the statute. The safe-harbour relationship: compliance with the Approved Document is strong evidence (not absolute) of compliance with the Building Regs. A different approach is permitted if it achieves the regulation&apos;s objective at least as well — but the burden falls on the designer / contractor to show it does. Same relationship as BS 7671 to EAWR Reg 4." onSite="L3 supervisor framing on inspection: &quot;we followed Approved Doc P / B / L per the published guidance — Building Regs satisfied&quot; is the standard defence. Where a non-Approved-Document approach is used, documentation of equivalent performance is required. The safer practice is to follow the published Approved Document unless there is strong technical reason to depart.">
            <p>Safe-harbour mechanics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building Regulations 2010 = statute; Approved Documents = guidance.</li>
              <li>Compliance with Approved Document = strong evidence of Building Regs compliance.</li>
              <li>Alternative approaches permitted if they achieve the regulation&apos;s objective at least as well.</li>
              <li>Burden of proof on alternative shifts to designer / contractor.</li>
              <li>Departure from Approved Document needs documented technical justification.</li>
              <li>Safer default: follow the Approved Document unless strong reason to depart.</li>
              <li>Same relationship as BS 7671 to EAWR Reg 4 (compliance evidence, not absolute).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Building Regulations 2010 — Schedule 1, Requirement L1 (Conservation of fuel and power)" clause={<>&quot;Reasonable provision shall be made for the conservation of fuel and power in buildings by — (a) limiting heat gains and losses... (b) providing fixed building services which — (i) are energy efficient...&quot;</>} meaning={<>The energy efficiency requirement in the Building Regs schedule. Approved Document L gives the practical compliance route. Drives heat pump rollout, LED retrofit, BMS controls, EV charging infrastructure, on-site renewables — major source of electrical trade work over coming decade.</>} cite="Source: Building Regulations 2010 (SI 2010/2214), Schedule 1, Requirement L1 — verbatim from legislation.gov.uk." />

          <ConceptBlock title="Devolved nation frameworks — quick reference" plainEnglish="Approved Documents are England-specific. Wales has its own equivalent set (similar but not identical, published by Welsh Government); Scotland has Building Standards Technical Handbooks under Building (Scotland) Regulations 2004 (different framework with mandatory compliance route); Northern Ireland has Building Regulations (Northern Ireland) 2012 with Technical Booklets." onSite="L3 supervisor on cross-border work: check the local framework before quoting Approved Doc clauses. Most technical content aligns broadly but specifics differ — notification regimes, prescribed self-certification schemes, fire-safety classifications, energy-efficiency targets all have devolved variations.">
            <p>Devolved nation frameworks:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>England</strong> — Building Regulations 2010 + Approved Documents A-S.</li>
              <li><strong>Wales</strong> — Welsh Building Regulations + Welsh Approved Documents.</li>
              <li><strong>Scotland</strong> — Building (Scotland) Regulations 2004 + Technical Handbooks (mandatory framework).</li>
              <li><strong>Northern Ireland</strong> — Building Regulations (NI) 2012 + Technical Booklets.</li>
              <li>Notifiable electrical work regimes vary by nation.</li>
              <li>Competent Person Scheme registration may not transfer cross-border.</li>
              <li>Always check the jurisdictionally-correct framework.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Doing notifiable work without CPS registration or building control notification" whatHappens={<>L3 (or supervising firm) does a CU change in a customer\'s house without CPS registration or building control notification. Approved Doc P / Building Regs breach. Customer&apos;s house insurance may be voided; future house sale may be problematic; LA can require remedial / re-inspection.</>} doInstead={<>Verify firm\'s CPS registration covers the work. If not registered, building control notification before starting (with fees). Don\'t skip the notification regime; it\'s the operative compliance route.</>} />

          <CommonMistake title="Skipping fire stopping after running cables through compartmentation" whatHappens={<>Cables run through fire-rated wall; penetration not fire-stopped; fire compartmentation broken; risk of fire spread between compartments. Inspector finds during EICR; coded; remedial required. In HRRBs this is safety-case-significant; in domestic still a Building Regs / Approved Doc B compliance issue.</>} doInstead={<>Fire-stop every penetration through fire-rated elements. Use approved fire-stopping products (intumescent collar, fire batt etc); record the work. Standard cable run discipline.</>} />

          <Scenario title="Heat pump install on a domestic property" situation={<>Customer wants a heat pump fitted to replace gas boiler. Your firm has been engaged for the electrical infrastructure. The pump itself will be installed by an F-Gas certified contractor. The customer assumes \"you can just do it&quot;.</>} whatToDo={<>Apply Approved Doc framework. Doc L drives the energy efficiency case (heat pump = compliant); Doc P covers electrical safety in dwellings (likely involves new circuit = notifiable work, CPS registration covers); Doc B may apply if heat pump location affects fire compartmentation (boilers were sometimes in fire-rated cupboards). Doc S may apply if EV charge point being added at same time. Brief the customer: scope of electrical work, notification under Approved Doc P, F-Gas certified contractor for refrigerant work, expected commissioning sequence. Confirm CPS registration covers; produce notifiable cert via CPS. Coordinate with F-Gas contractor; integrate sequencing.</>} whyItMatters={<>Heat pump installs are a fast-growing trade area driven by Approved Doc L. Multiple Approved Documents may be relevant on a single job. The L3 supervisor identifies the framework and ensures compliance routes are followed. Customer&apos;s &quot;just do it&quot; framing skips the notification + competent contractor coordination that&apos;s mandatory.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 1.7 - Approved Documents are non-statutory guidance for Building Regs 2010 compliance.",
            "Approved Doc P - electrical safety in dwellings (England). Notifiable work + CPS scheme.",
            "Approved Doc B - fire safety. Drives emergency lighting, fire detection, cable CPR, fire stopping.",
            "Approved Doc L - energy efficiency. Drives heat pumps, LED, EV charging, renewables, BMS.",
            "Approved Doc S - EV charging infrastructure (introduced 2021).",
            "Notifiable work under Doc P: new circuits, CU replacement, special locations. CPS or building control notification.",
            "Devolved nations have separate frameworks (Wales / Scotland Technical Handbooks / NI).",
            "Future Homes Standard driving electrification of heating - major future trade impact.",
          ]} />
          <Quiz title="Approved Documents - knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.2 HRRB safety case</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">6.4 Asbestos CAR 2012 supervisor escalation</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
