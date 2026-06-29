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
  { id: 'l3-m1-s6-sub3-p', question: 'Approved Doc P scope?', options: [
    'Fire safety in dwellings — it sets the requirements for means of escape, fire detection and compartmentation in domestic premises.',
    'Electrical safety in dwellings (England) — it sets out which electrical work is notifiable and must be certified through a Competent Person Scheme or building control.',
    'Electrical safety in all buildings — domestic, commercial and industrial — covering design, installation and periodic inspection.',
    'Energy efficiency in dwellings — it sets minimum standards for insulation, heating efficiency and low-carbon technology.',
  ], correctIndex: 1, explanation: 'Approved Doc P = electrical safety in dwellings. Notifiable work must be done by a Competent Person Scheme registered installer OR notified to building control; Wales has equivalent provisions.' },
  { id: 'l3-m1-s6-sub3-b', question: 'How does Approved Doc B affect electrical work?', options: [
    'Fire safety drives emergency lighting and fire detection design, fire-rated cable selection and fire-stopping of penetrations.',
    'It sets the maximum permitted earth fault loop impedance for circuits in domestic premises to ensure disconnection within 0.4 seconds.',
    'It specifies the minimum cable CSA and protective device rating for ring final circuits feeding socket outlets in dwellings.',
    'It governs the energy efficiency of fixed lighting, requiring a minimum proportion of low-energy luminaires in new dwellings.',
  ], correctIndex: 0, explanation: 'Approved Doc B reaches deep into electrical design and installation — emergency lighting (BS 5266), fire detection (BS 5839), cable CPR class, penetrations through fire-rated walls and floors, EV charging fire considerations and smoke-control electrical systems.' },
  { id: 'l3-m1-s6-sub3-l', question: 'How does Approved Doc L affect electrical work?', options: [
    'It mandates RCD protection on all final circuits and the use of AFDDs in higher-risk residential buildings.',
    'It sets out the notifiable electrical work that must be certified through a Competent Person Scheme or building control.',
    'Energy efficiency requirements drive heat pumps, LED lighting, EV charging and on-site renewables — all with electrical implications.',
    'It requires fire-rated cable and fire-stopping wherever cables penetrate compartment walls and floors in dwellings.',
  ], correctIndex: 2, explanation: 'Approved Doc L drives the electrification of heating and the renewable / low-carbon transition — heat pumps (F-Gas + electrical), LED lighting, BMS controls, EV charging infrastructure and on-site renewables (solar PV, batteries). Major source of electrical work.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the legal status of Approved Documents?', options: [
    'They are statutory law in their own right — breaching an Approved Document is a criminal offence regardless of the outcome.',
    'Non-statutory guidance giving practical detail on how to comply with the Building Regulations 2010; following them is strong evidence of compliance.',
    'They are British Standards published by BSI and have the same status as BS 7671 for electrical work.',
    'They are voluntary industry codes of practice with no relationship to the Building Regulations.',
  ], correctAnswer: 1, explanation: 'Approved Documents are guidance; Building Regulations 2010 is the statute. Compliance with an Approved Document is strong evidence of Building Regs compliance — the safe-harbour relationship, same as BS 7671 to EAWR.' },
  { id: 2, question: 'What\'s "notifiable work" under Approved Doc P?', options: [
    'Any electrical work of any kind in a dwelling, however minor, including replacing a single accessory like a socket faceplate.',
    'Only the full rewire of a dwelling; alterations and additions to existing circuits are never notifiable.',
    'New circuits, consumer unit replacements and work in special locations such as bathrooms, outdoors and swimming pools.',
    'Only work carried out in commercial and industrial premises; domestic work is outside the scope of Approved Doc P.',
  ], correctAnswer: 2, explanation: 'New circuits, CU replacement and special-locations work are all notifiable (kitchens were removed from the list in 2013). Notifiable work must be done by a Competent Person Scheme registered installer (NICEIC, NAPIT, ELECSA, Stroma etc) OR notified to building control.' },
  { id: 3, question: 'What does CPR (Construction Products Regulation) classification do for cables?', options: [
    'It sets the current-carrying capacity of the cable based on its conductor cross-sectional area and installation method.',
    'It defines the voltage rating and maximum operating temperature the cable insulation can withstand in service.',
    'It specifies the minimum mechanical protection (armour, conduit, trunking) required for the installation environment.',
    'It classifies cables by their reaction to fire (Aca/B1ca/B2ca/Cca/Dca/Eca/Fca), marked on the sheath.',
  ], correctAnswer: 3, explanation: 'CPR class drives cable selection in fire-relevant applications; Approved Doc B may require a minimum classification in specific applications. Cable manufacturers mark the CPR class on the sheath.' },
  { id: 4, question: 'What\'s a "fire stopping" requirement?', options: [
    'Penetrations through fire-rated walls, floors or ceilings must be fire-stopped to maintain the compartment\'s fire integrity.',
    'A requirement to install a fire-rated isolating switch on every circuit so the supply can be cut quickly in an emergency.',
    'A requirement to space grouped cables apart so heat can dissipate and prevent the cables overheating under load.',
    'A requirement to fit smoke detectors at every cable penetration so fire spread through services is detected early.',
  ], correctAnswer: 0, explanation: 'Cable trays, conduit and individual cables passing through fire walls all require appropriate fire-stopping per Approved Doc B. Fire stopping is a routine but often-missed requirement. Inspectors check; failures are a common cause of fire spread.' },
  { id: 5, question: 'How does Approved Doc L drive heat pump work?', options: [
    'It bans the installation of any new gas or oil boilers in existing dwellings with immediate effect.',
    'Energy efficiency targets and Future Homes Standard direction make heat pumps standard for new builds, creating significant electrical trade work.',
    'It requires every heat pump to be supplied from a dedicated three-phase supply regardless of the unit\'s rating.',
    'It limits heat pump installation to commercial premises only, excluding domestic dwellings from the scope.',
  ], correctAnswer: 1, explanation: 'Heat pumps require electrical infrastructure (single-phase 32A+ or three-phase), F-Gas certified refrigerant work and controls integration. Heat pump rollout is a major trend driven by Approved Doc L (and the Future Homes Standard), with major electrical trade impact.' },
  { id: 6, question: 'When does the L3 need awareness of these Approved Documents?', options: [
    'Only when working on higher-risk residential buildings over 18m where the BSA 2022 regime applies.',
    'Only when the customer specifically asks for the work to be notified to building control.',
    'On almost all residential work — Doc P on every domestic install, Doc L and Doc B on most refurbishment, Doc B on fire-safety circuits.',
    'Only on new-build projects; refurbishment and alteration of existing dwellings is outside the Approved Documents.',
  ], correctAnswer: 2, explanation: 'Doc P is always relevant on a domestic install; Doc L (energy) and Doc B (fire) apply to most residential refurbishment; Doc B applies on commercial work where fire-safety circuits are involved. Awareness widens as the market shifts to heat pumps and EV charging. L3 awareness is operational, not academic.' },
  { id: 7, question: 'Are Approved Documents the same in Wales / Scotland / NI?', options: [
    'Yes — a single set of Approved Documents applies uniformly across all four nations of the UK.',
    'Yes for England and Wales, but Scotland and Northern Ireland have no equivalent building safety framework.',
    'No — only Scotland differs; Wales and Northern Ireland use the same Approved Documents as England.',
    'No — England, Wales, Scotland and Northern Ireland each have their own framework; broadly aligned but with differing specifics.',
  ], correctAnswer: 3, explanation: 'England has Approved Documents; Wales has its own equivalent set (similar but not identical); Scotland has Building Standards Technical Handbooks (a different framework); Northern Ireland has its own. Always check the local framework before relying on a specific document.' },
  { id: 8, question: 'How does Approved Doc P interact with Competent Person Schemes?', options: [
    'Notifiable work must be done by a Competent Person Scheme registered installer OR notified to building control with fees and inspection.',
    'CPS registration replaces the need for any electrical work to comply with BS 7671 in dwellings.',
    'CPS registration is only required for commercial work; domestic notifiable work can always be self-certified by any electrician.',
    'CPS membership exempts the installer from issuing an Electrical Installation Certificate for notifiable work.',
  ], correctAnswer: 0, explanation: 'CPS registration (NICEIC, NAPIT, ELECSA, Stroma etc) is the practical route to compliance with Approved Doc P notifiable work; building control notification is the alternative.' },
];

const faqs = [
  { question: 'Is BS 7671 part of the Approved Documents?', answer: 'No — BS 7671 is the IET wiring regulations (BSI standard). Approved Doc P references BS 7671 as the technical basis for safe electrical installation. Compliance with BS 7671 + Approved Doc P together discharges Building Regs electrical safety requirements.' },
  { question: 'What is the Future Homes Standard?', answer: 'Government direction setting more demanding energy efficiency targets for new homes (heat pumps, no gas, low-carbon). Approved Doc L being progressively updated to align. Driving major electrification of heating sector.' },
  { question: 'Does Approved Doc P apply to all electrical work?', answer: 'No — Approved Doc P specifically covers dwellings (and some shared parts). Commercial work governed by Building Regs more broadly + other guidance.' },
  { question: 'What is a thermal element under Approved Doc L?', answer: 'A wall, floor or roof — element separating conditioned from unconditioned space. Energy efficiency requirements apply when these are altered. Affects insulation requirements and may indirectly drive electrical work (recessed luminaires require fire / thermal considerations).' },
  { question: 'Are EV chargers covered by specific Approved Documents?', answer: 'Approved Doc S (Infrastructure for charging electric vehicles) introduced 2021 — requirements for new dwellings and non-residential buildings to provide EV charge points. Plus Approved Doc B fire considerations + BS 7671 Section 722 for the install itself.' },
  { question: 'How do Approved Documents update?', answer: 'Periodically by government. Typically 5-10 year cycles for major revisions; interim updates and amendments more frequent. Approved Doc B has been updated multiple times post-Grenfell. Always check the current version.' },
  { question: 'Which Approved Document covers commercial / non-domestic electrical safety?', answer: 'Approved Document P specifically covers dwellings. Non-domestic electrical safety is governed by Building Regulations requirement L1 / B1-B5 / and BS 7671 directly. EAWR 1989 applies as the workplace safety statute. There is no &quot;Approved Doc P for commercial&quot; — the framework operates differently.' },
  { question: 'How does Approved Doc M (Access to and use of buildings) affect electrical work?', answer: 'Approved Doc M sets accessibility standards. Affects switch / socket heights, accessible-toilet electrical requirements, evacuation lift specifications, induction loop systems, accessible parking EV charger placement. Often considered alongside Doc P and Doc B.' },
  { question: 'Are Approved Documents tested in C&G assessments?', answer: 'Conceptually yes — the relationship between Building Regulations and Approved Documents, the notifiable work framework under Doc P, the safe-harbour relationship to statute. The detailed content is reference material rather than memorisation.' },
  { question: 'What if the Approved Document is silent on something I need to do?', answer: 'Apply BS 7671 plus relevant BS / EN standards plus manufacturer instructions plus industry good practice. The Approved Document is one route to Building Regs compliance — silence does not block the work, but it does require the contractor to demonstrate equivalent performance through other recognised standards.' },
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
            "Doc P — electrical safety in dwellings (England). Notifiable work via Competent Person Scheme or building control.",
            "Doc B (fire) drives emergency lighting, fire detection, cable CPR class, fire stopping. Doc L (energy) drives heat pumps, LED, EV charging, renewables.",
            "Doc S — EV charging infrastructure (2021); new dwellings, residential, non-residential buildings with parking.",
            "Devolved nations have separate frameworks — Wales (Welsh Approved Documents), Scotland (Building Standards Technical Handbooks), NI (Technical Booklets).",
            "Approved Documents are the technical baseline; BSA 2022 framework wraps regulatory process around them for HRRBs.",
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

          <RegsCallout source="Building Regulations 2010 — Schedule 1, Requirement L1 (Conservation of fuel and power)" clause={<>&quot;Reasonable provision shall be made for the conservation of fuel and power in buildings by — (a) limiting heat gains and losses... (b) providing fixed building services which — (i) are energy efficient...&quot;</>} meaning={<>The energy efficiency requirement in the Building Regs schedule. Approved Document L gives the practical compliance route. Drives heat pump rollout, LED retrofit, BMS controls, EV charging infrastructure, on-site renewables — major source of electrical trade work over coming decade.</>} cite="Source: Building Regulations 2010 (SI 2010/2214), Schedule 1, Requirement L1." />

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
          <ContentEyebrow>Approved Document S — EV charging infrastructure</ContentEyebrow>

          <ConceptBlock
            title="The newest Approved Document and what it means for daily electrical work"
            plainEnglish="Approved Document S (Infrastructure for the Charging of Electric Vehicles) came into force in June 2022. It sets out requirements for EV charging provision in new and renovated buildings: dwellings with parking get a chargepoint or cable route; non-residential new buildings get chargepoints proportionate to parking; renovated non-residential buildings with parking get cable routes. Compliance routes include physical chargepoint install, cable route provision, or commuted contribution where local circumstances make on-site provision unreasonable. The Document interacts with BS 7671 Section 722 (EV charging installations) for the technical electrical detail."
            onSite="The L3 supervisor on any new-build or major renovation now routinely encounters Approved Doc S requirements. Even when the chargepoint itself isn&apos;t being installed, the cable route provision (ducting, mains capacity, accessibility) is mandatory. Identifying scope under Doc S at design stage avoids retrofit cost. The interaction with Building Control means the work needs notification under Approved Doc P alongside the Doc S compliance."
          >
            <p>Approved Doc S compliance routes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>New dwellings with associated parking</strong> — minimum 1
                chargepoint per dwelling, or cable route where chargepoint not currently
                installed.
              </li>
              <li>
                <strong>Renovated dwellings (major renovation) with parking</strong> —
                same as new where parking provision is being addressed.
              </li>
              <li>
                <strong>New non-residential buildings with parking</strong> — minimum
                1 chargepoint per 10 spaces; cable route to all spaces.
              </li>
              <li>
                <strong>Renovated non-residential with parking &gt;10 spaces</strong> —
                cable route to 1 in 5 spaces minimum.
              </li>
              <li>
                <strong>Mixed-use</strong> — provision proportionate to dwellings and
                non-residential elements.
              </li>
              <li>
                <strong>BS 7671 Section 722</strong> — technical requirements for the
                EV charging installation itself; integrates with Approved Doc S
                provision requirement.
              </li>
              <li>
                <strong>OCPP compatibility, OZEV-eligible products</strong> — for
                grant-funded installations; market-shaped by funding criteria.
              </li>
              <li>
                <strong>Load management considerations</strong> — site capacity may
                require active load management at higher chargepoint counts.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Approved Doc M and accessibility</ContentEyebrow>

          <ConceptBlock
            title="How accessibility affects everyday electrical work"
            plainEnglish="Approved Document M (Access to and use of buildings) sets accessibility standards under Building Regs requirement M. Volume 1 covers dwellings (with M4(1), M4(2), M4(3) categories for different levels of access); Volume 2 covers non-domestic buildings. Electrical-trade implications: switch and socket heights (typically 450-1200mm above floor), socket positions for accessibility, light switches at accessible heights, accessible-toilet electrical requirements, evacuation lift specifications, induction loop systems, accessible EV charging parking bay electrical infrastructure. The standard ensures that the built environment is usable by people with a range of mobility, sensory and cognitive needs."
            onSite="L3 supervisor practical implication: standard new-build electrical fit-outs follow Approved Doc M requirements, with switches and sockets at accessible heights. Retrofit and refurbishment work may need to bring existing installations up to accessibility standard depending on scope. Customer-facing alterations particularly in homes occupied by older or disabled residents often benefit from M4(2) or M4(3) provision even where not strictly required by Building Regs scope. The supervisor identifies the M-relevant elements at job start."
          >
            <p>Approved Doc M electrical touchpoints:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Switch and socket heights — 450-1200mm above floor for accessibility.</li>
              <li>Socket count and positioning for accessible reach.</li>
              <li>Accessible-toilet electrical requirements — emergency pull cord, alarm reset, light controls.</li>
              <li>Evacuation lift specifications — BS EN 81-76; safe evacuation of mobility-impaired residents.</li>
              <li>Induction loop systems — for residents with hearing aids; counter / reception areas.</li>
              <li>Accessible EV charging parking bay infrastructure.</li>
              <li>Tactile and visual signage power supplies.</li>
              <li>Lighting levels and uniformity — particularly stairs and circulation routes.</li>
              <li>Volume 1 — dwellings; Volume 2 — non-domestic buildings.</li>
              <li>M4(1) visitable, M4(2) accessible and adaptable, M4(3) wheelchair user dwellings.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Approved Doc B and the fire-stopping discipline"
            plainEnglish="Approved Doc B (Volume 1 dwellings, Volume 2 buildings other than dwellings) addresses fire safety. The fire-stopping requirement is one of the most operationally significant for electrical contractors — every penetration through a fire-rated wall, floor or ceiling must be fire-stopped to maintain the compartment&apos;s fire integrity. Cable trays, conduit, individual cables passing through fire walls all require appropriate fire-stopping per the relevant standard. Approved fire-stopping products include intumescent collars, fire batt, fire-rated sealant, fire pillows. Installation must follow manufacturer instructions; substitutions need design approval. The fire-stopping is one of the routine inspection points that surfaces failures repeatedly on EICR coding."
            onSite="L3 supervisor practical reflex: every cable penetration through a fire-rated element gets fire-stopped. Photograph before fire-stopping (showing the penetration), photograph after (showing the stopping in place). Record the product used. The discipline takes minutes per penetration and produces an inspection-defensible record. The supervisor coaching L2 mates makes fire-stopping part of cable-installation routine, not an after-thought. On HRRBs the discipline is even sharper — fire-stopping is safety-case-critical and any breach is an MOR trigger."
          >
            <p>Fire-stopping operational discipline:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify fire-rated elements (compartmentation walls, fire-rated ceilings, fire-rated floors) before penetrating.</li>
              <li>Plan cable routes to minimise penetrations where possible.</li>
              <li>Use approved fire-stopping products — intumescent collar, fire batt, fire sealant, fire pillows.</li>
              <li>Follow manufacturer installation instructions exactly.</li>
              <li>Photograph the penetration before stopping.</li>
              <li>Photograph the stopping in place after installation.</li>
              <li>Record product used (manufacturer, model, batch number).</li>
              <li>Verify fire-stopping integrity at periodic inspection.</li>
              <li>On HRRBs the discipline is safety-case-critical; breaches are MOR triggers.</li>
              <li>Common EICR coding finding when missed — code C2 typically.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010 — Approved Document B Volume 2 (Buildings other than dwellings)"
            clause={
              <>
                &quot;Where a wall or floor is required to provide compartmentation,
                any opening for the passage of a pipe, duct, conduit, cable or
                chimney, or for any other reason, should be — (a) provided with a
                fire-stopping system that has been tested to the relevant
                standard...; and (b) installed in accordance with the
                manufacturer&apos;s installation instructions to maintain the
                integrity of the compartmentation.&quot;
              </>
            }
            meaning={
              <>
                The fire-stopping requirement at the cable-installation level.
                Tested system; manufacturer installation instructions; maintain
                compartment integrity. The wording is similar across Volume 1 and
                Volume 2 with adjustments for residential context. Routine cable
                runs through fire-rated elements need stopping; the standard
                expectation is that competent contractors do this as part of
                normal practice without needing prompting.
              </>
            }
            cite="Source: Building Regulations 2010 (SI 2010/2214), Approved Document B Volume 2."
          />

          <SectionRule />
          <ContentEyebrow>BS 7671 and the BS 7671:2018+A4:2026 update</ContentEyebrow>

          <ConceptBlock
            title="The wiring regs as the technical baseline behind Doc P"
            plainEnglish="BS 7671 is the IET Wiring Regulations — the technical standard for electrical installations. Approved Doc P references BS 7671 as the technical basis for safe installation in dwellings. Compliance with BS 7671 + Approved Doc P together discharges Building Regs P1 requirement. BS 7671:2018 is the current edition; Amendment 4 was published in 2026 with significant changes including AFDD requirements, TN-C-S (PNB) provisions, schedule of test column changes, and model form updates. The 2026 amendment reflects the post-Grenfell direction towards stronger fire-safety integration of electrical installation choices."
            onSite="L3 supervisor implication: the supervisor needs the current edition of BS 7671 plus any amendments. Working from an older edition can produce technically-non-compliant work that nevertheless &apos;follows the regs the supervisor learned from&apos; — a recipe for inspection-time problems. The amendment cycle for BS 7671 is more frequent than the Building Regs themselves; staying current on amendments is part of L3 competence maintenance. CPD record retention covers this through scheme requirements."
          >
            <p>BS 7671 and the amendment cycle:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 7671 is the IET Wiring Regulations.</li>
              <li>Approved Doc P references BS 7671 as the technical basis for dwellings.</li>
              <li>Compliance with BS 7671 + Approved Doc P discharges Building Regs P1 requirement.</li>
              <li>BS 7671:2018 with Amendment 1 (2020), Amendment 2 (2022), Amendment 3 (2024), Amendment 4 (2026).</li>
              <li>Amendment 4 includes AFDD requirements, TN-C-S (PNB) provisions, schedule of test changes, model forms.</li>
              <li>Post-Grenfell direction reflected in 2026 amendment — stronger fire-safety integration.</li>
              <li>L3 supervisor needs current edition plus amendments — not the edition learned in training years ago.</li>
              <li>CPD record retention covers competence maintenance through scheme requirements.</li>
              <li>Section 700-series in BS 7671 covers special installations and locations — including dwellings, bathrooms, swimming pools, agricultural, hazardous, marinas, exhibitions, EV charging (S722), photovoltaic (S712), etc.</li>
              <li>BS 7671 is itself a BSI standard — used as evidence of EAWR Reg 4 compliance for installation safety.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The Building Regulations 2010 — statutory foundations</ContentEyebrow>

          <ConceptBlock
            title="What the regulations actually say"
            plainEnglish="Building Regulations 2010 (SI 2010/2214) is the statutory instrument under the Building Act 1984. Schedule 1 contains the requirements (A to S in current numbering): A structural safety; B fire safety; C resistance to contaminants and moisture; D toxic substances; E sound; F ventilation; G sanitation, hot water safety and water efficiency; H drainage and waste disposal; J combustion appliances; K protection from falling; L conservation of fuel and power; M access to and use of buildings; N (withdrawn); P electrical safety in dwellings; Q security in dwellings; R high-speed electronic communications; S infrastructure for electric vehicle charging. Each requirement is a one-paragraph statement of intent; Approved Documents give the practical compliance routes."
            onSite="L3 supervisor reflex: when in doubt about the regulatory framework for a piece of work, identify the relevant Schedule 1 requirement (A-S), then consult the Approved Document for the practical compliance route. The Approved Document is the easier read but the requirement is the legal hook. Where work is technically complex or unusual, designers may need to reference the requirement and demonstrate alternative compliance — the safe-harbour relationship gives them that flexibility."
          >
            <p>Schedule 1 requirements relevant to electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>B1 — Means of warning and escape</strong> — fire detection / alarm + emergency lighting.</li>
              <li><strong>B2 — Internal fire spread (linings)</strong> — wall and ceiling materials including conduit / containment.</li>
              <li><strong>B3 — Internal fire spread (structure)</strong> — compartmentation; fire-stopping requirements.</li>
              <li><strong>B4 — External fire spread</strong> — external wall systems; post-Grenfell tightening.</li>
              <li><strong>B5 — Access and facilities for the fire service</strong> — firefighters&apos; lifts, fire mains, hydrants.</li>
              <li><strong>L1 — Conservation of fuel and power (new dwellings)</strong> — heat pumps, LED, controls.</li>
              <li><strong>L2 — Conservation of fuel and power (existing dwellings)</strong> — retrofit energy efficiency.</li>
              <li><strong>M1 — Access to and use of buildings (dwellings / non-domestic)</strong> — accessibility, switch heights.</li>
              <li><strong>P1 — Electrical safety (dwellings)</strong> — design, installation, certification.</li>
              <li><strong>S1 — EV charging infrastructure</strong> — new builds, renovations.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010 — Schedule 1, Requirement P1"
            clause={
              <>
                &quot;Reasonable provision shall be made in the design and
                installation of electrical installations in order to protect
                persons operating, maintaining or altering the installations from
                fire or injury.&quot;
              </>
            }
            meaning={
              <>
                P1 is the Schedule 1 requirement for electrical safety in
                dwellings. &quot;Reasonable provision&quot; is the qualifier;
                compliance with BS 7671 plus the Approved Doc P notifiable-work
                regime is the standard route. Same safe-harbour mechanic as B1-B5
                for fire safety — compliance with the Approved Document is strong
                evidence but not exclusive. Alternative approaches permitted if
                they achieve P1&apos;s objective.
              </>
            }
            cite="Source: Building Regulations 2010 (SI 2010/2214), Schedule 1, Requirement P1."
          />

          <SectionRule />
          <ContentEyebrow>Competent Person Schemes — the operational backbone</ContentEyebrow>

          <ConceptBlock
            title="How CPS registration actually works"
            plainEnglish="Competent Person Schemes (NICEIC, NAPIT, ELECSA, Stroma etc.) authorise registered installers to self-certify notifiable work under Approved Doc P. The firm registers with the scheme; the scheme assesses competence at registration and periodically thereafter; the registered installer issues the Electrical Installation Certificate and a Building Regulations Compliance Certificate to the customer; the scheme notifies local authority building control on the firm&apos;s behalf. The customer receives the certificate as evidence of compliant work for any future sale, alteration, or building control enquiry. Without CPS registration the same notifiable work needs separate building control notification with fees and inspection."
            onSite="L3 supervisor reflex on customer-facing work: the cert + Building Regs compliance certificate is the customer&apos;s evidence. Many customers do not know they will need this when they sell the house; getting it right at install time prevents friction at sale time. The scheme registration is the firm&apos;s operational licence in the domestic market — losing it (through scheme deregistration following safety failings) is effectively an end to domestic trading. The supervisor&apos;s discipline contributes to the firm&apos;s scheme standing through the quality of work produced and certified."
          >
            <p>CPS operational mechanics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Firm registers with scheme (NICEIC, NAPIT, ELECSA, Stroma).</li>
              <li>Scheme assesses firm competence at registration — premises, equipment, knowledge, supervisor qualifications.</li>
              <li>Periodic re-assessment — typically annual.</li>
              <li>Firm carries out notifiable work; produces Electrical Installation Certificate (EIC).</li>
              <li>Firm issues Building Regulations Compliance Certificate to customer.</li>
              <li>Scheme notifies local authority building control on firm&apos;s behalf.</li>
              <li>Customer retains certificates as Building Regs compliance evidence.</li>
              <li>Periodic scheme inspections of registered firms&apos; ongoing work — sample basis.</li>
              <li>Customer complaint can trigger scheme technical investigation.</li>
              <li>Scheme sanctions range from advisory through conditional registration through to deregistration.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="What happens when CPS registration is not held"
            plainEnglish="A firm without CPS registration can still do notifiable work — but each notifiable job requires separate building control notification before work starts. The customer (or the contractor on the customer&apos;s behalf) pays a notification fee — typically £150-£500 per notification depending on local authority and complexity. Building control inspects at completion; on satisfactory completion they issue a Building Regs Compliance Certificate. Without that certificate the work is technically unauthorised and may affect house insurance, future sale, or future alterations. For a domestic-focused firm the time / cost overhead of separate notification per job typically makes CPS registration the only viable commercial model."
            onSite="L3 supervisor practical implication: confirm at start of every customer-facing job whether the firm&apos;s CPS registration covers the proposed work. Where the work falls outside the firm&apos;s scheme scope, or where the firm is not CPS-registered for the trade type involved, the building control route applies and must be initiated before work starts. Customers occasionally push to skip the notification (&quot;we will not tell anyone&quot;) — that response cuts the supervisor out of the Building Regs compliance route entirely and creates problems at future sale or insurance claim time."
          >
            <p>Non-CPS routes to compliance:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building Notice — work proceeds, building control inspects at key stages.</li>
              <li>Full Plans — design submitted in advance, formal approval, inspection schedule.</li>
              <li>Notification fee — typically £150-£500 per notification depending on LA and complexity.</li>
              <li>Building control inspection at completion.</li>
              <li>Building Regs Compliance Certificate issued on satisfactory completion.</li>
              <li>Customer retains certificate — needed for sale, insurance, future alterations.</li>
              <li>Without certificate the work is technically unauthorised.</li>
              <li>Time / cost overhead per job typically makes CPS registration the viable commercial model.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 1.7 — Approved Documents are non-statutory guidance for Building Regs 2010 compliance.",
            "Approved Doc P — electrical safety in dwellings (England). Notifiable work + CPS scheme.",
            "Approved Doc B — fire safety. Drives emergency lighting, fire detection, cable CPR, fire stopping.",
            "Approved Doc L — energy efficiency. Drives heat pumps, LED, EV charging, renewables, BMS.",
            "Approved Doc S — EV charging infrastructure (introduced 2021).",
            "Notifiable work under Doc P: new circuits, CU replacement, special locations. CPS or building control notification.",
            "Devolved nations have separate frameworks (Wales / Scotland Technical Handbooks / NI).",
            "Future Homes Standard driving electrification of heating — major future trade impact.",
            "Safe-harbour relationship: compliance with Approved Document = strong evidence of Building Regs compliance; alternative approaches permitted if equivalent performance evidenced.",
            "Schedule 1 requirements A-S in Building Regs 2010 are the legal hook; Approved Documents are the practical compliance routes.",
            "CPS registration is the operational backbone of domestic electrical compliance — scheme deregistration effectively ends domestic trading.",
            "Approved Doc 7 (materials and workmanship) underlies all other Approved Documents — fitness for purpose evidenced through BS / EN, manufacturer instructions, industry good practice.",
            "Post-Grenfell tightening of Approved Doc B affects external walls, cable CPR class, sprinkler, alarm, emergency lighting requirements.",
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
