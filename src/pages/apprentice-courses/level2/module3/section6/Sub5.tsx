/**
 * Module 3 · Section 6 · Sub 5 — Advantages and disadvantages of micro-renewables
 * Maps to City & Guilds 2365-02 / Unit 203 / LO6 / AC 6.3
 *   AC 6.3 — “Identify advantages and disadvantages of micro-renewable energies”
 *
 * Source notes: NEW content. Honest commercial framing — electricians need accurate
 * figures, not sales-brochure copy. Final Sub of Module 3 — includes Module 4
 * hand-off block.
 *
 * Renamed 2026-04-25: was Sub 3, moved to Sub 5 when §6 expanded with
 * new Solar PV deep dive (Sub 2) and Battery storage deep dive (Sub 3).
 * Existing Sub 2 (Install requirements) became Sub 4. Module 4 hand-off
 * block at the bottom of this file is preserved intact.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Advantages and disadvantages of micro-renewables (6.3) | Level 2 Module 3.6.5 | Elec-Mate';
const DESCRIPTION =
  'Honest, balanced trade-offs for micro-renewable installs — capital cost, payback, weather dependency, planning, grid capacity, end-of-life recycling, fire risk. The final Sub of Module 3.';

const checks = [
  {
    id: 'mr-payback-honest',
    question:
      'A customer asks how quickly a 4 kW PV install will “pay for itself”. What’s an honest answer in 2026 conditions?',
    options: [
      'Maintenance effectiveness depends directly on the competence of the people performing the work — technicians need both technical skills (fault-finding, condition monitoring, repair techniques) and analytical skills (RCA, FMEA, data interpretation) to implement RCM effectively',
      'Lux level (typically 300 lux task), uniformity (greater than 0.6 across the desk area), glare control (UGR less than 19), colour temperature (3500-4000K typical), colour rendering (Ra greater than 80), AND accessibility — high contrast trim around switches, audible feedback on counter call-buttons, induction loop interface for hearing-aid users.',
      'Realistically 9–12 years for a typical UK domestic install at current SEG rates and electricity prices, longer if the customer doesn’t self-consume much of the generation. The five-year payback figure that gets quoted in sales brochures is mostly outdated FIT-era marketing.',
      'No — both the metal back-box AND the metal socket faceplate are exposed-conductive-parts. Each must be connected to the CPC, normally via a fly-lead or via the fixing screws securing a metal faceplate to a metal back-box (provided that connection is verified by continuity test).',
    ],
    correctIndex: 2,
    explanation:
      'The five-year payback figure dates from the Feed-in Tariff (FIT) era, which closed in 2019. Under the current Smart Export Guarantee (SEG), which pays a much lower rate (varies by supplier, typically 3–15p per kWh exported), the realistic payback for a 4 kW install at typical UK insolation is 9–12 years — sometimes longer if the household doesn’t self-consume much. Be honest with customers; they’ll respect you for it.',
  },
  {
    id: 'mr-weather-dependency',
    question:
      'A customer is told their 4 kW PV system will produce “4 kW”. What should you actually expect across a UK year?',
    options: [
      'Describe: "We discovered asbestos in the ceiling void." Express: "I want to be transparent about cost impact." Specify: "The removal adds £2,400." Consequences: "This ensures safe, regulation-compliant completion"',
      'To conduct their undertaking so as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety',
      'Providing adequate access space around all equipment for safe installation, maintenance, and replacement, with isolation points clearly accessible and sufficient headroom for working',
      'Roughly 3,400–3,800 kWh per year for a south-facing 4 kW install — peaking around 4 kW on a clear summer noon and dropping to perhaps 200–400 W on a cloudy December morning. The 4 kW figure is the peak rating, not the average output.',
    ],
    correctIndex: 3,
    explanation:
      'The “4 kW” figure is the peak instantaneous rating under standard test conditions — sunny day, panels facing optimally, cell temperature at 25 °C. The annual yield is much lower: typical UK 4 kW installs deliver 3,400–3,800 kWh/year (about 850–950 kWh per kW peak). Winter output is about 10% of summer output. Customers who think they’re getting 4 kW continuously are in for a disappointment.',
  },
  {
    id: 'mr-fire-risk',
    question:
      'PV DC arc faults are a known fire-risk source. What’s the BS 7671-related conversation around mitigating them?',
    options: [
      'EIC + Schedule of Inspections + Schedule of Test Results + Building Control Compliance Certificate (issued by the Competent Person Scheme after upload) + operational instructions + as-built records + manufacturer manuals for the new equipment (RCBOs, EV charger, SPDs, AFDDs).',
      'To take reasonable care for the health and safety of self and others, and to co-operate with the employer\\\\\\\\\\\\\\\'s safety arrangements. In RAMS terms that means reading the document, following the written method, raising defects in the document, and not working outside the documented controls. \\\\\\\\\\\\\\\'Following orders\\\\\\\\\\\\\\\' is no defence to an s.7 prosecution.',
      'Regulate initial frustration (emotional awareness), approach the colleague privately using cognitive reappraisal to frame it as a quality issue rather than personal failure, discuss the error factually, offer to help correct it, and document it appropriately — balancing accountability with empathy',
      'DC arcs in PV systems behave differently from AC arcs (they don’t self-extinguish at zero-crossings) and have caused significant fires. The trade is actively discussing AFDD provision on DC sides; on the AC side, an AFDD compliant with BS EN 62606 (per Reg 421.1.7) covers the AC circuit. Good DC connector workmanship and correct DC overcurrent protection are the front line.',
    ],
    correctIndex: 3,
    explanation:
      'AC arcs self-extinguish 100 times a second at the zero-crossings of the 50 Hz waveform; DC arcs don’t — once struck, they sustain themselves until either the conductors melt apart or the circuit is broken. PV string voltages of 300–500 V are well above the DC arc-sustaining threshold. The mitigations: properly crimped MC4 connectors, correct DC overcurrent protection per Section 712, and a Section 421.1.7-compliant AFDD on the AC side. The trade is actively debating dedicated DC AFDDs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 4 kW UK domestic PV install in 2026 — typical capital cost (panels, inverter, install, scaffolding, MCS paperwork)?',
    options: [
      '£500',
      '£6,000–£8,000',
      '£40,000',
      '£100,000',
    ],
    correctAnswer: 1,
    explanation:
      'A typical fully-installed 4 kW UK domestic PV system in 2026 lands at £6,000–£8,000 — panels, inverter, mounting, DC and AC isolators, scaffolding, electrical install, MCS certification, DNO paperwork. Add another £4,000–£6,000 for a 5–10 kWh battery if the customer wants storage. Prices vary by region and installer; that’s the realistic ballpark.',
  },
  {
    id: 2,
    question:
      'Why does a competent electrician warn customers about “end-of-life” for PV panels and batteries?',
    options: [
      'Present both statistics in a lessons learnt briefing, analyse why entrapment is increasing despite overall fatality improvements, review all current entrapment prevention measures, implement additional controls such as secondary guarding and enhanced training, set measurable targets for entrapment reduction, and monitor progress quarterly using the PDCA cycle',
      'Local Authority Environmental Health Officers (EHOs) for retail, offices, leisure, residential. Office of Rail and Road for railways. Marine and Coastguard Agency for shipping. Civil Aviation Authority for aviation. Office for Nuclear Regulation for nuclear sites. The HSE itself for construction, manufacturing, mines, quarries, agriculture and most other industrial settings.',
      'Because both have finite lives — panels are typically guaranteed for 25+ years (with declining output), inverters for 5–15 years (and need replacing within the system life), lithium-ion batteries for 10–15 years before significant capacity fade. The customer should understand the install isn’t fit-and-forget forever.',
      'Lithium batteries are hazardous waste (and class 9 dangerous goods); the design should consider take-back arrangements with the manufacturer/supplier, ease of safe removal, and clear labelling for first responders and end-of-life handlers',
    ],
    correctAnswer: 2,
    explanation:
      'Customers often hear “25-year warranty” and assume the whole system lasts 25 years. The panels do (with output dropping roughly 0.5% per year). The inverter does not — it’s an electronics product with capacitors, fans and a switching power section, and 10 years is a more realistic life. A battery is typically 10–15 years before noticeable capacity fade. Recycling routes for both panels and lithium batteries are still developing and are part of the honest cost conversation.',
  },
  {
    id: 3,
    question:
      'A customer in a conservation area wants PV on a south-facing slate roof. What’s the planning issue?',
    options: [
      'Ensure the commissioning records are filed as baseline data for future maintenance, establish the preventive maintenance schedule based on manufacturer\\\\\\\\\\\\\\\'s recommendations and commissioning findings, and monitor early-life performance for any issues',
      'PAT involves the regular inspection and testing of portable electrical appliances to identify faults (damaged cables, loose connections, insulation failure) that could cause electrical fires',
      'Visually inspect for storage damage, check the coil resistance, verify the contacts are not corroded or contaminated, ensure the operating mechanism moves freely, and confirm the component is within its shelf-life (if applicable)',
      'Conservation areas, listed buildings and Article 4 zones often remove the standard “permitted development” exemption that covers domestic PV — meaning the customer has to apply for full planning permission, which can be refused on aesthetic grounds.',
    ],
    correctAnswer: 3,
    explanation:
      'Standard Permitted Development Rights cover most domestic PV installs in England (within size and visibility limits). But Conservation Areas, listed buildings, World Heritage Sites and Article 4 Direction zones often have those rights stripped, meaning a full planning application is needed. Local planning authorities can refuse on heritage/visual-impact grounds. Always check planning status before quoting in those areas.',
  },
  {
    id: 4,
    question:
      'A DNO refuses a G99 application on the grounds of “local network capacity”. What does that mean for the install?',
    options: [
      'It means the local LV cable, transformer or upstream HV network can’t safely accept the additional export without reinforcement (typically a transformer upgrade or cable replacement). The customer either pays for the reinforcement (often £10,000+), accepts an export-limited install (the inverter is throttled to a lower export rating), or chooses not to proceed.',
      'All EV charger installations should be notified to the DNO via the appropriate notification scheme (e.g., Building Regulations Part P notification). Installations above 3.68 kW on a single-phase supply or adding significant load may require prior approval, particularly on constrained network areas',
      'First, the customer cannot register the system for the Smart Export Guarantee (SEG), so they get no payment from the supplier for any electricity they export. Second, the install is still notifiable to the DNO under G98 / G99 and to building control under Part P — those obligations do not go away just because MCS is skipped.',
      'PASMA (Prefabricated Access Suppliers\\\\\\\\\\\\\\\' and Manufacturers\\\\\\\\\\\\\\\' Association) is the recognised training standard for assembling, dismantling and using mobile tower scaffolds. It\\\\\\\\\\\\\\\'s not a statutory licence in the way IPAF is for MEWPs, but PUWER 1998 Reg 9 requires anyone using or assembling work equipment to be adequately trained, and on construction sites the principal contractor\\\\\\\\\\\\\\\'s site rules typically require PASMA card-holders for tower assembly.',
    ],
    correctAnswer: 0,
    explanation:
      'G99 refusals on capacity grounds are increasingly common in areas where lots of PV/EV installs have already gone in. The DNO can offer three resolutions: customer pays for network reinforcement, customer accepts an export-limited install (the inverter is configured to never push more than X kW to the grid, even if it could generate more), or customer drops the project. Always do an early DNO check on G99 jobs — don’t commit the customer to a quote until you know the DNO will accept the connection.',
  },
  {
    id: 5,
    question:
      'A customer asks: “Why install an MCS-listed system if I’m not interested in SEG payments?”',
    options: [
      'For minor additions or alterations to an existing circuit (e.g. adding a single socket on an existing ring) that do NOT require a new circuit. New circuits, CU replacements and major alterations require an EIC + Schedule of Inspections + STR.',
      'Selling a non-MCS install means the customer can never claim SEG even later, may struggle to evidence compliance during a house sale, and may face insurance issues. The MCS install is also covered by the MCS workmanship warranty scheme. The cost difference is small and the protection is significant.',
      'Apps reduce the friction of recording — entries can be made on the phone in the moment, photos and locations can be attached automatically, the data is searchable later. They also make sharing with the supervisor and the training provider easier. Paper diaries still work fine if maintained; digital tools just lower the barrier to actually keeping them current.',
      'Around 0.36 Ω. 1.5 mm² Cu = approximately 12.10 mΩ/m at 20 °C. 30 × 0.01210 = 0.363 Ω. The R1+R2 for a 2.5/1.5 T&E 30 m circuit would be approximately 0.21 (R1) + 0.36 (R2) = 0.57 Ω at 20 °C, before the 0.8 correction for service temperature.',
    ],
    correctAnswer: 1,
    explanation:
      'Even customers who don’t care about SEG today may change their minds. House buyers often ask for MCS evidence during conveyancing. Some insurers refuse to cover non-MCS installs. The MCS Installation Assurance Scheme provides a workmanship warranty that protects the customer if the installer goes out of business. The cost differential between MCS and non-MCS is small; the protection it gives the customer is large. Almost every domestic install in the UK is done MCS for these reasons.',
  },
  {
    id: 6,
    question:
      'A customer wants a heat pump but their house is poorly insulated, single-glazed and has microbore radiators. What do you tell them?',
    options: [
      'Match symptoms to Schedule 1 categories: visible fracture (excl finger/thumb/toe), amputation, sight loss reported, crush with internal symptoms, burn &gt;10% / vital organ, scalping, LOC, enclosed-space asphyxia / heat. When in doubt, treat as specified and escalate.',
      'The combination of thorough preparation, successful mock assessments, gateway sign-off from your employer and training provider, completed qualifications, and a well-organised portfolio — these are evidence of your competence, not just feelings of readiness',
      'A heat pump struggles in a poorly-insulated house with undersized radiators — it’s designed to deliver lots of low-temperature heat, not a little high-temperature heat. The realistic CoP will be poor (closer to 2 than 3), the running costs will surprise the customer, and the property may need insulation upgrades and rad-replacement first. Be honest before quoting.',
      'Section 49 of the Consumer Rights Act 2015 implies a term in every contract for the supply of a service to a consumer that the trader must perform the service with reasonable care and skill. Failure to do so is a breach of contract and the consumer has remedies including the right to require repeat performance and the right to a price reduction. Poor communication that leads to defective work, missed scope items or a non-compliant installation can be a breach of s.49.',
    ],
    correctAnswer: 2,
    explanation:
      'Heat pumps deliver heat at lower flow temperatures than gas boilers (typically 35–45 °C vs 60–70 °C). To deliver enough heat at those temperatures, the radiators need to be larger and the building has to be reasonably airtight and insulated. Fitting a heat pump into a draughty old house with microbore rads and no loft insulation gives the customer a system with a poor CoP, big bills, and a heating system that struggles in winter. Honest pre-survey advice is part of the trade.',
  },
  {
    id: 7,
    question:
      'A customer says: “My neighbour told me PV pays for itself in five years.” How do you respond?',
    options: [
      'Risk Assessment = identifies hazards, evaluates risks, specifies controls. Method Statement = sets out the safe sequence of work, the people, the equipment, the controls in operation. RAMS is the combined document. RA tells you WHAT the risks are; MS tells you HOW to do the work safely.',
      'Whenever the situation exceeds your competence, when an unsafe instruction is given, when an inspector arrives, when a serious near-miss occurs, when documents you need don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t exist, when a customer requests work outside your scope.',
      'L3 carries personal s.7 duty + EAWR Reg 16 competence duty + CDM Reg 15 worker duty + MHSWR Reg 14 employee duty. Multiple parallel personal duties; same conclusion — refuse unsafe instruction, escalate. Plus emerging contributory role to the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s Reg 9 contractor duties.',
      'Politely correct them. The five-year payback figure is from the Feed-in Tariff (FIT) era which closed in 2019 — under the current Smart Export Guarantee (SEG) and current electricity prices, realistic payback is 9–12 years. Quote real numbers, not historic ones, so the customer makes an informed decision.',
    ],
    correctAnswer: 3,
    explanation:
      'The competent electrician gives accurate, current information. The Feed-in Tariff paid generous rates for every unit generated AND every unit exported, which gave very fast paybacks. The replacement scheme (Smart Export Guarantee) only pays for exported units and at a much lower rate. Many customers still believe the FIT-era figures. A polite, evidenced correction sets the right expectations and protects the trade’s reputation.',
  },
  {
    id: 8,
    question:
      'What is the electrician’s honest summary of the “advantages” of micro-renewables for a typical UK domestic customer?',
    options: [
      'Lower electricity bills (offset import + earn SEG on export), reduced carbon footprint, partial grid-independence (with battery), a hedge against rising electricity prices, often a positive impact on house value, and government incentive schemes that vary by year. Real benefits — but not “free electricity”.',
      'A loose termination at one end has oxidised over the three years — surface oxide film grows when contact pressure is insufficient, contact resistance climbs, the cable resistance hasn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t changed but the joint has degraded. Investigate, identify the bad terminal, re-make the joint, retest.',
      'Individual grievance = one worker raises a workplace issue with the employer (typically follows the ACAS Code of Practice). Collective grievance = a group of workers (often via the union shop steward) raises an issue affecting multiple workers — pay rates, working conditions, restructuring proposals, health and safety concerns. Different procedures and different ACAS guidance apply to each.',
      'Where the employer employs five or more persons, the significant findings of the fire risk assessment must be recorded, including the fire safety measures in place and any groups of persons identified as being especially at risk',
    ],
    correctAnswer: 0,
    explanation:
      'Honest framing of the upside: real bill savings (typically £400–£800/year for a 4 kW install with battery, depending on tariff), genuine carbon reduction, useful resilience (with battery), some house-value uplift (modest, sometimes), and ongoing grants/incentives in some regions. The downside framing — capital cost, 9–12 year payback, weather dependency, end-of-life kit — has to be presented alongside. Customers who hear “lower bills” without “£8k upfront” feel misled.',
  },
];

const faqs = [
  {
    question: 'What’s a realistic typical bill saving for a 4 kW PV install?',
    answer:
      'Depends heavily on how much of the generation the household self-consumes (used directly versus exported back to the grid). A 4 kW install typically generates 3,400–3,800 kWh/year. If the customer self-consumes 30–40% of that and exports the rest at SEG rates, the combined savings are often £400–£800/year on top of bills. Add a battery and self-consumption can rise to 70–80%, pushing savings towards £700–£1,200/year. Numbers vary year to year with electricity prices and SEG rates.',
  },
  {
    question: 'Why is the SEG rate so much lower than the old Feed-in Tariff?',
    answer:
      'The Feed-in Tariff (FIT, 2010–2019) was a government-set generous tariff — paid per kWh generated AND per kWh exported, at rates that gave 5–7 year paybacks. It worked: PV install volumes exploded. When FIT closed, the replacement (Smart Export Guarantee, SEG) shifted the export rate to whatever individual energy suppliers offer — typically much lower than FIT (currently roughly 3–15p per kWh depending on supplier and tariff, varies over time). The market now competes on rates rather than government subsidy.',
  },
  {
    question: 'What about the “embedded carbon” argument — that PV panels take so much energy to make they don’t pay back?',
    answer:
      'Outdated. Modern silicon PV panels have an energy payback time of around 1–3 years depending on technology and location, after which they produce surplus clean energy for the rest of their 25+ year life. The carbon-payback argument was true with first-generation polysilicon panels in the 1980s; it’s no longer accurate. Worth knowing because customers occasionally raise it.',
  },
  {
    question: 'A customer asks if they can “go off-grid” with PV and battery. Should I encourage this?',
    answer:
      'Realistic for a small holiday cottage with low loads, almost never realistic for a normal UK family home. A typical 4-bed UK house uses 12–20 kWh/day; in winter the PV generates a fraction of that and the battery would need to be enormous (and the bill for it would be £30k+). True off-grid means dropping the grid connection (significant cost saving on standing charges) but accepting outages on long dark winters. Most customers want “grid-tied with battery for resilience”, which is achievable; “fully off-grid” is rarely the right answer.',
  },
  {
    question: 'What happens to a PV system in a power cut — does the house keep running?',
    answer:
      'Not by default. Standard grid-tied PV inverters trip off in a power cut due to anti-islanding (Sub 6.2 — they have to disconnect within 200 ms to protect DNO engineers). So a sunny afternoon power cut leaves the lights off. Customers who want PV to work during outages need either a hybrid inverter with a dedicated “EPS” (Emergency Power Supply) port, or a battery system with a grid-disconnection contactor that allows islanded operation. Both add cost; both are doable.',
  },
  {
    question: 'I’m an apprentice — when am I going to actually work on a PV install?',
    answer:
      'Probably not in your first year — PV work is mostly done by MCS-certified specialist installers, and the qualifications (MCS PV PV1, plus the BPEC training) sit on top of your Level 3 electrical qualification. But the principles in this section will be tested at college and you’ll need them for the AM2 paper. Once you’re out of your time, PV is one of the highest-growth specialisations to add to your scope — companies actively hire qualified electricians and put them through MCS training.',
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 5"
            title="Advantages and disadvantages of micro-renewables"
            description="Why customers want them. Why they sometimes regret. Why a competent electrician needs to know both sides — to give honest advice rather than parrot the sales brochure. The final Sub of Module 3."
            tone="emerald"
          />

          <TLDR
            points={[
              'Real advantages: lower bills, carbon reduction, partial grid-independence (with battery), hedge against rising electricity prices, modest house-value uplift, and various time-limited incentive schemes.',
              'Real disadvantages: £6–8k capital cost for a 4 kW PV install, 9–12 year realistic payback under current SEG rates, weather dependency, planning issues in heritage areas, end-of-life kit, fire-risk if poorly installed.',
              'The honest electrician gives both sides. The five-year-payback figure dates from the FIT era and is no longer realistic. Customers respect accurate numbers; they resent surprises.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'List the genuine advantages of a micro-renewable install for a UK domestic customer (bills, carbon, resilience, house value, grants).',
              'List the genuine disadvantages and constraints (capital cost, realistic payback period, weather dependency, planning issues, grid-capacity limits, recycling, fire-risk).',
              'Quote realistic 2026 figures for capital cost and payback on a typical 4 kW PV install rather than legacy FIT-era marketing numbers.',
              'Explain weather dependency in a way a customer understands — peak rating vs annual output, summer vs winter generation profile.',
              'Identify the planning and DNO grid-capacity constraints that can stop or shape an install.',
              'Frame end-of-life and fire-risk considerations as part of an honest customer conversation.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The framing</ContentEyebrow>

          <ConceptBlock
            title="Why this Sub matters more than it looks"
            plainEnglish="The customer asks one question more than any other on a renewables enquiry: “Is it worth it?” The competent electrician gives an honest, evidenced answer rather than the sales-brochure version."
            onSite="Renewables sales has a reputation problem in the UK because of door-to-door cold-callers in the FIT era who promised three-year paybacks. Electricians who give straight answers stand out — and get the repeat business and referrals."
          >
            <p>
              Subs 6.1 and 6.2 covered the kit and the regulations. This Sub covers the conversation. A
              first-year apprentice doesn’t close PV sales, but they’re asked questions about renewables
              constantly — by customers on other jobs, by friends and family, in the college classroom.
              The expectation isn’t that you’re a sales engineer; the expectation is that you can give an
              accurate, balanced view.
            </p>
            <p>
              The trap is one-sidedness. Sales brochures emphasise the upside; cynics emphasise the
              downside. The competent answer covers both, with realistic 2026 numbers, in language the
              customer understands.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The advantages — what the customer is buying</ContentEyebrow>

          <ConceptBlock
            title="1. Lower electricity bills"
            plainEnglish="Every kWh the PV generates while the customer is also using power is a kWh they don’t buy from the grid. Self-consumption beats export every time."
            onSite="A typical 4 kW install generates 3,400–3,800 kWh/year. Self-consume 30–40% of that and you’re saving £400–£800/year at current import rates. Add a battery (which lifts self-consumption to 70–80%) and savings push £700–£1,200/year."
          >
            <p>
              The mechanism is simple. The customer’s house uses electricity continuously — fridges,
              freezers, broadband, a kettle on demand. Whenever the PV is generating more than the house
              is using, the surplus goes back to the grid (and earns the SEG rate). Whenever the PV is
              generating less than the house is using, the shortfall comes from the grid (at the import
              rate). Whenever the PV exactly matches the house demand, neither happens.
            </p>
            <p>
              Self-consumption matters because the import rate (currently around 25–30p/kWh on a typical
              variable tariff) is much higher than the SEG rate (3–15p/kWh). A battery shifts surplus
              daytime generation into the evening when the house is using power, lifting self-consumption
              from a typical 25–35% on a PV-only system to 70%+ on a PV-plus-battery system.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="2. Reduced carbon footprint"
            onSite="The customer who cares about the environment does get a real, measurable benefit — typical 4 kW PV install offsets roughly 1,000–1,200 kg of CO₂ per year over a 25-year panel life. Worth saying, even though most customers buy on payback rather than carbon."
          >
            <p>
              Generating electricity from sunlight, wind or hydro instead of from gas-fired power
              stations directly reduces grid carbon intensity. UK grid carbon (gCO₂/kWh) is falling
              rapidly as more wind and solar comes online, but at typical 2026 grid carbon factors a
              4 kW PV install offsets in the order of 1,000–1,200 kg CO₂ per year. Over 25 years that’s
              25–30 tonnes of CO₂.
            </p>
            <p>
              Heat pumps deliver an even bigger carbon win on a per-install basis, because they replace
              gas combustion (high carbon) with electric drive (much lower carbon, especially on a
              decarbonising grid). This is why heat pump rollout is policy-driven: it’s one of the
              fastest ways to cut UK domestic emissions.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="3. Partial grid-independence and resilience (with battery)"
            plainEnglish="A grid-tied PV inverter without a battery does NOT keep the house running in a power cut. A hybrid inverter with battery and an EPS (Emergency Power Supply) port can — at extra cost."
          >
            <p>
              Resilience is one of the under-appreciated buying motivations. A standard grid-tied PV
              system gives no power-cut benefit at all (the inverter has to anti-island within 200 ms —
              see Sub 6.2). But a hybrid inverter paired with a battery and an EPS port can keep
              essential circuits running — typically the consumer unit is split, with critical loads
              (boiler controls, fridge, lighting, sockets) on one half that the battery can supply during
              an outage.
            </p>
            <p>
              For rural customers with regular power cuts, that resilience is worth real money.
              Hospitals, care homes and small businesses with critical loads also factor it heavily.
              Suburban customers tend to value it less because outages are rare.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="4. Inflation hedge, house-value uplift and current incentive schemes"
            plainEnglish="Three smaller advantages bundled together because they overlap. PV is a partial inflation hedge on the units you self-consume. A well-installed MCS-certified system adds modest value to the house (typically 1–4% on sale). And the current grants and tariffs (SEG, BUS, VAT relief) shorten payback for those who qualify — but the landscape changes every budget."
            onSite="The 2022 energy crisis taught customers that electricity prices can spike. The Feed-in Tariff (the big subsidy of the 2010s) closed in 2019. The Boiler Upgrade Scheme is the current heat-pump grant. Quote what’s actually available now, not what was generous in 2018."
          >
            <p>
              <strong>Inflation hedge.</strong> UK electricity prices have moved sharply in
              recent years and the long-term trend is upward (carbon costs, grid reinforcement,
              capacity charges). Self-generated electricity is priced at the marginal cost of
              operating the PV system (essentially zero — the kit is paid for, maintenance is
              light) regardless of what the import rate does. For a customer planning to stay in
              their home for 10+ years, that hedge is real. For a short-term resident, less so.
            </p>
            <p>
              <strong>House-value uplift.</strong> The EPC (Energy Performance Certificate)
              rating directly affects house saleability and mortgage availability. PV improves
              the EPC, often pushing a B-rated house into the A bracket. Prospective buyers
              value low running costs. The combination tends to add 1–4% to the sale price for a
              properly installed and certified system. The MCS certificate is what makes the
              value transferable — non-MCS installs give the buyer no easy way to evidence
              compliance, and some lenders flag that during the survey.
            </p>
            <p>
              <strong>Current incentive schemes</strong> (subject to change every budget):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Smart Export Guarantee (SEG):</strong> All large licensed energy
                suppliers must offer an SEG tariff to customers exporting from MCS-certified
                micro-generation. Rates currently roughly 3–15p per kWh exported, varying by
                supplier.
              </li>
              <li>
                <strong>Boiler Upgrade Scheme (BUS):</strong> Currently around £7,500 grant
                towards an air-source or ground-source heat pump install in England and Wales
                (subject to scheme rules and changes).
              </li>
              <li>
                <strong>VAT relief:</strong> Reduced VAT (currently 0% on certain qualifying
                renewables installs in the UK) — saves the customer the VAT on the install.
              </li>
              <li>
                <strong>Devolved nations:</strong> Scotland, Wales and Northern Ireland have
                their own grant schemes from time to time. Always check what applies at the
                time of quote.
              </li>
            </ul>
            <p>
              Quote what’s available right now. Don’t promise what may have closed by the time
              the install completes.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The disadvantages — what the customer should know</ContentEyebrow>

          <ConceptBlock
            title="1. Capital cost — the upfront bill is significant"
            plainEnglish="A typical UK domestic 4 kW PV install runs £6,000–£8,000 fully fitted. Add a battery and you’re at £10,000–£14,000. Heat pumps with all the radiator and control work are £8,000–£15,000. These are real numbers customers need to plan for."
          >
            <p>
              Realistic 2026 UK install costs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>4 kW PV install (panels + inverter + electrics + scaffolding + MCS):</strong>
                {' '}£6,000–£8,000.
              </li>
              <li>
                <strong>Hybrid PV + 5–10 kWh battery system:</strong> £10,000–£14,000.
              </li>
              <li>
                <strong>Air-source heat pump (8 kW thermal, with radiator upgrades):</strong>
                {' '}£8,000–£15,000 before BUS grant.
              </li>
              <li>
                <strong>Ground-source heat pump (with ground-loop installation):</strong>
                {' '}£15,000–£30,000.
              </li>
              <li>
                <strong>Small wind turbine (1–6 kW):</strong> £15,000–£30,000+ including the mast and
                groundwork.
              </li>
            </ul>
            <p>
              Most customers finance these from savings or with a green-finance loan. The capital cost is
              the single biggest barrier to install volume — it’s why government schemes focus on
              upfront grants rather than ongoing payments.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="2. Payback period — be honest about the timeline"
            plainEnglish="9–12 years is the realistic payback for a typical PV install at 2026 prices and SEG rates. Five-year payback figures are from the closed FIT era. Don’t quote them."
            onSite="The honest payback conversation is what separates an apprentice giving real advice from a sales pitch. Customers know when they’re being sold to."
          >
            <p>
              Payback depends on three variables: install cost, electricity import price, and how much of
              the generation is self-consumed (vs exported at the lower SEG rate). Typical 2026 numbers
              for a 4 kW PV install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Install cost: £7,000.</li>
              <li>Annual generation: 3,500 kWh.</li>
              <li>Self-consumed at 30%: 1,050 kWh × 28p saved = £294.</li>
              <li>Exported at 70%: 2,450 kWh × 8p (typical SEG) = £196.</li>
              <li>Total annual saving: £490.</li>
              <li>Simple payback: £7,000 ÷ £490 = <strong>~14.3 years</strong>.</li>
            </ul>
            <p>
              Add a battery and self-consumption can rise to 70%+, lifting savings to £700–£900/year and
              shortening payback to around 12–14 years for the combined PV+battery system. Heat pump
              payback is harder to pin down because it depends heavily on what fuel it’s replacing — vs
              oil, payback can be 5–8 years; vs natural gas, often 10+ years.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="3. Weather and seasonal dependency"
            plainEnglish="A 4 kW PV system produces ~4 kW for an hour or two on a sunny noon in June. It produces 200–400 W on a cloudy December morning. Average annual yield is ~3,500 kWh, but spread very unevenly across the year."
          >
            <p>
              UK PV output by month (rough percentages of annual yield for a south-facing 4 kW install):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>June/July:</strong> 13–14% per month — peak generation.</li>
              <li><strong>December/January:</strong> 1–2% per month — bare minimum.</li>
            </ul>
            <p>
              That seasonality matters because customers heat their houses in winter when the PV is
              producing the least. Heat pumps shift the heating demand to the worst PV month. The
              honest framing: PV is a brilliant offset for spring/summer/autumn loads but a poor match
              for winter heating without a much larger system or supplementary supply.
            </p>
            <p>
              Wind has the opposite seasonal profile (windier in winter), which is why combined wind+PV
              installs make sense on suitable sites — they’re partially anti-correlated.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="4. Planning permission and DNO grid-capacity constraints"
            plainEnglish="Two separate ‘can the install actually happen?’ checks. Planning is the council’s call (heritage and Article 4 zones often strip Permitted Development rights). Grid capacity is the DNO’s call (G99 refusals on local network capacity are increasingly common). Run both checks before quoting."
            onSite="A customer in a Conservation Area with a south-facing slate roof is the classic case. Standard PD doesn’t cover it; a G99 application may also be refused if the local LV cable is already saturated with neighbouring PV. Both questions need answers before you commit."
          >
            <p>
              <strong>Planning side.</strong> For most UK domestic installs, PV sits under
              Permitted Development Rights — no planning permission needed as long as the panels
              meet the size and visibility limits. But the following typically require full
              planning permission:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Listed buildings (always).</li>
              <li>Conservation areas (often).</li>
              <li>Article 4 Direction zones (where local councils have removed PD rights).</li>
              <li>National Parks and AONBs (often).</li>
              <li>Wall-mounted PV (typically requires planning even outside heritage zones).</li>
              <li>Ground-mounted PV above certain sizes.</li>
            </ul>
            <p>
              Planning officers can refuse on visual-impact grounds. Customers in those areas
              need a proper planning application BEFORE the install is committed — otherwise
              they’ve paid for a system they may not be allowed to use.
            </p>
            <p>
              <strong>Grid-capacity side.</strong> The UK low-voltage distribution network was
              designed for one-way power flow — substation to customer. Reverse flow from
              customer-owned PV adds complexity. Each LV cable, fuseboard and transformer has a
              finite capacity. Once local PV penetration crosses a threshold, the DNO has to
              either reinforce the network (expensive) or limit further connections. Customers
              in heavily-PV areas (especially the South West and rural areas with lots of early
              adopters) are increasingly hitting refusals or export-limit conditions on G99
              applications. The fix is either an export-limited install (the inverter is
              configured to never push more than X kW back to the grid, even when generating
              more) or a customer-funded network reinforcement (often £10,000+).
            </p>
            <p>
              The DNO has a statutory duty to provide and maintain the connection under ESQCR
              Reg 24, but that duty is balanced against the safety and stability of the wider
              network — which is why a refusal on capacity grounds is a legitimate engineering
              answer rather than an obstruction. Always run a DNO pre-application check on G99
              jobs; don’t commit the customer to a quote until you know the connection will be
              allowed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="ENA Engineering Recommendation G99 (paraphrased — connection of generation to LV/HV networks)"
            clause="Any installation containing generation that is intended to operate in parallel with a distributor’s network shall be the subject of an application to, and connection agreement with, the DNO under Engineering Recommendation G99. The DNO shall assess the proposed connection against local network capacity, voltage limits and protection requirements before issuing consent. Generation up to and including 16 A per phase may proceed under the simplified ‘connect and notify’ route (G98); above this threshold a full G99 connection agreement is required before energisation."
            meaning={
              <>
                G99 is the industry rulebook for grid-tied generation in GB — every PV inverter,
                battery system and micro-CHP unit larger than the G98 16 A/phase threshold needs
                a DNO connection agreement before it’s commissioned. The DNO can refuse on
                capacity grounds, impose an export limit, or require customer-funded
                reinforcement. As an electrician you don’t commission a G99 install on the
                strength of a verbal "yeah it’ll be fine" — the written DNO consent has to be
                in the file before the inverter sees AC. Source: Energy Networks Association
                Engineering Recommendation G99 (current amendment).
              </>
            }
            cite="Paraphrased; full text on energynetworks.org. See also G98 for sub-16 A/phase ‘connect and notify’ generation."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="5. End-of-life and fire risk — the long-term safety story"
            plainEnglish="Two related ‘over the life of the install’ realities. End-of-life: panels last 25+ years, inverters 5–15, batteries 10–15 — the install is not fit-and-forget. Fire risk: DC arc faults don’t self-extinguish, so workmanship and Section 712 compliance matter for decades, not just the day of commissioning."
            onSite="Customers hear ‘25-year warranty’ and assume the whole system lasts 25 years untouched. Inverters are an electronics product — capacitors, fans, switching semiconductors — and 10 years is a more realistic life. The DC side gets baked by UV, walked over by squirrels, and weathered through every storm. Periodic inspection isn’t optional."
          >
            <p>
              <strong>Component lifespans.</strong> Plan the conversation honestly:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV panels:</strong> 25–30 year design life, typical performance warranty
                guarantees ~80% output at year 25. Panels degrade slowly (~0.5%/year output drop).
              </li>
              <li>
                <strong>Inverter:</strong> 5–15 years typical service life. Plan for at least one
                inverter replacement during the panel life — typically £800–£1,500.
              </li>
              <li>
                <strong>Lithium-ion battery:</strong> 10–15 years to noticeable capacity fade
                (typically 70–80% of original capacity). Replacement cost depends on chemistry
                and capacity.
              </li>
              <li>
                <strong>DC isolators, AC isolators, MCBs/RCBOs:</strong> Standard electrical
                accessories — replace as needed during periodic inspection.
              </li>
            </ul>
            <p>
              Recycling is improving but not yet mature. PV panels can be recycled (silicon is
              recoverable), but the volume of UK panels reaching end-of-life is still small and
              dedicated facilities are limited. Lithium battery recycling is similarly
              developing — the chemistry is recoverable but the infrastructure is years off
              mature.
            </p>
            <p>
              <strong>Fire-risk side.</strong> The AC arc fault problem (covered in
              Module 2.6) is partly mitigated by the fact that AC arcs self-extinguish 100
              times a second at the zero-crossings of the 50 Hz waveform. DC arcs do not. Once
              a DC arc strikes, it sustains itself until either the conductors melt apart or
              the circuit is interrupted by an isolator/fuse. PV string voltages of 300–500 V
              DC are well above the threshold for sustained arcing. Mitigations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Properly torqued and crimped MC4 (or equivalent) connectors at every
                panel-to-panel and panel-to-cable joint.
              </li>
              <li>
                Correct DC string overcurrent protection per Section 712.431/712.432, sized to
                the module and string ratings.
              </li>
              <li>
                Rodent-resistant cable routing (DC cables in particular).
              </li>
              <li>
                AFDD on the AC supply circuit per Reg 421.1.7 and BS EN 62606 (covers the AC
                side; the trade is actively discussing dedicated DC AFDDs).
              </li>
              <li>
                Periodic inspection — checking connectors, looking for thermal damage,
                verifying isolators operate correctly.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.421.101.1 (Insulation Monitoring Device on PV DC side) (paraphrased)"
            clause="An insulation monitoring device (IMD) shall be installed except where Regulation 712.421.101.2 applies, to verify the insulation status on the DC side throughout the life cycle of the PV array. NOTE: Insulation monitoring devices (IMDs) complying with BS EN 61557-8 provide this function. The monitoring function may be provided by an inverter with integrated insulation monitoring also capable of detecting insulation faults."
            meaning={
              <>
                The fire-safety rationale for monitoring DC insulation continuously. PV strings sit
                outside in all weather for decades; insulation degrades from UV, thermal cycling, rodent
                damage and connector corrosion. An IMD (typically built into the modern inverter) checks
                DC-side insulation continuously and alarms if it drops below threshold — catching
                incipient faults long before they become fires. The customer should know their inverter
                does this; the electrician needs to know to check the inverter event log at periodic
                inspection.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.421.101.1 for the full text."
          />

          <RegsCallout
            source="Building Regulations 2010 (England) — Approved Document L (paraphrased — energy efficiency notification)"
            clause="Where on-site electricity generation (including solar PV, micro-wind, micro-hydro and battery storage), heat pumps or other building services that affect the building’s energy performance are installed in an existing dwelling, the work is notifiable building work under Part L. Notification may be discharged by an MCS-certified installer self-certifying through a competent person scheme, or by a Building Control submission where MCS certification is not used."
            meaning={
              <>
                Renewables installs intersect with building regs as well as BS 7671. Approved
                Document L (energy efficiency) treats PV, batteries and heat pumps as
                notifiable work because they affect the building’s energy performance and EPC
                rating. The normal route to discharge the notification is MCS — the installer’s
                competent person scheme reports the install to the local authority on the
                customer’s behalf. Skip MCS and the customer is left with a Building Control
                submission to make themselves, plus the loss of SEG eligibility. Source:
                Approved Document L, Volume 1 (Dwellings), current edition published on
                gov.uk.
              </>
            }
            cite="Paraphrased; see Approved Document L (Conservation of fuel and power), available on gov.uk."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The honest customer conversation</ContentEyebrow>

          <CommonMistake
            title="Telling a customer their PV install will pay back in five years"
            whatHappens={
              <>
                You repeat a figure you saw in a sales brochure — “a 4 kW system pays for itself in
                about five years”. The customer signs the £8,000 install on that basis. Three years in,
                they’ve seen £1,500 of savings (not the £4,800 the five-year figure implied). They feel
                misled. They tell their neighbours. The trade gets another customer who thinks
                renewables installers are a bunch of cowboys.
              </>
            }
            doInstead={
              <>
                Quote the realistic 2026 figure: 9–12 years for a typical PV install at current SEG and
                import rates, with a battery shortening that and poor self-consumption lengthening it.
                Show the customer the actual sums (annual generation × self-consumption × prices). The
                five-year payback figure is from the FIT era which closed in 2019 — it’s no longer
                accurate. The customer respects honesty and you protect the trade’s reputation.
              </>
            }
          />

          <Scenario
            title="A semi-detached house with bad south-roof shading and an old gas boiler"
            situation={
              <>
                You’re asked to advise on a renewables enquiry. South roof has heavy shading from a
                neighbour’s mature oak tree until early afternoon. House has a 25-year-old gas combi
                boiler. Customer wants to know if she should fit PV, a battery, a heat pump, or all
                three. Budget is around £15,000.
              </>
            }
            whatToDo={
              <>
                Honest ranking. The shaded south roof is a real PV problem — output could be 30–40%
                below an unshaded equivalent, pushing payback well past 12 years. East/west roof faces
                are worth checking; sometimes split-array or panel-level optimisers help, sometimes
                they don’t. The old gas boiler is a clearer win — a heat pump would cut carbon
                significantly and (with the BUS grant) the cost is more manageable, but the radiators
                may need upgrading and the house insulation needs checking. Recommendation might be:
                heat pump first (use the £7,500 BUS grant, plus £4,000–£8,000 customer contribution),
                hold off on PV until the shading question is resolved, consider a battery later if a
                time-of-use tariff suits the household. Don’t recommend the customer spend the full
                £15,000 unless it actually delivers value.
              </>
            }
            whyItMatters={
              <>
                Customers come in expecting to be talked into the biggest possible install. The
                competent electrician says no when it’s the right answer — and ends up with a longer-term
                customer who refers friends and family.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Real advantages: lower bills, carbon reduction, partial resilience (with battery), inflation hedge, modest house-value uplift, current incentive schemes (SEG, BUS, VAT relief).',
              'Real disadvantages: £6–8k capital for 4 kW PV (£10–14k with battery), 9–12 year realistic payback, weather and seasonal dependency, planning issues in heritage areas, possible DNO grid-capacity refusals on G99.',
              'The five-year payback figure is FIT-era marketing and no longer accurate. Quote 2026 numbers, show the customer the sums.',
              'PV peak rating ≠ continuous output. A 4 kW install delivers ~3,500 kWh/year, peaking on summer noons and dropping to almost nothing in December.',
              'End-of-life kit matters: panels last 25+ years, inverters 5–15, batteries 10–15. The install is not fit-and-forget. Plan for at least one inverter replacement during the panel life.',
              'PV DC fire risk is real but well-mitigated by Section 712 compliance — proper connectors, correct DC overcurrent protection, IMD-monitored insulation (Reg 712.421.101.1), AFDD on the AC side.',
              'Honest balanced advice protects the customer AND the trade’s reputation. Sales-brochure copy doesn’t cut it.',
            ]}
          />

          <Quiz
            title="Micro-renewables advantages and disadvantages — knowledge check"
            questions={quizQuestions}
          />

          <SectionRule />

          <ContentEyebrow>Module 3 → Module 4 hand-off</ContentEyebrow>

          <ConceptBlock
            title="What’s next — Module 4: Installation of wiring systems and enclosures"
            plainEnglish="Module 3 was theory. Module 4 is the hands. From here you stop reading drawings and start cutting cable."
            onSite="Module 4 is the practical pivot of Level 2. Every Sub from here is a tool, a technique or a test that you’ll use on every job for the rest of your career. The theory in Modules 2 and 3 was the foundation; Module 4 is the build."
          >
            <p>
              Module 3 closed off the theory side of Level 2. You’ve covered the science (units, mechanics,
              R-V-I, AC, electronics), the supply (how electricity gets to the cut-out, how it can come
              back the other way), and the regulations that frame all of it. Module 4 turns those
              principles into the install.
            </p>
            <p>Coming up:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tools (hand and power)</strong> — and how to choose the right one for each job.
                The kit list a competent first-year electrician carries on the van.
              </li>
              <li>
                <strong>Preparing the workspace</strong> — hazards, PPE, access equipment (steps,
                podiums, scaffold towers, MEWPs), safe systems of work.
              </li>
              <li>
                <strong>Marking out, measuring, fitting accessories from drawings</strong> — turning a
                designer’s drawing into actual back boxes, cable drops and switch positions.
              </li>
              <li>
                <strong>Installing wiring systems</strong> — containment (cable tray, basket, ladder),
                conduit (PVC and steel), trunking (PVC, dado, perimeter), twin-and-earth in walls and
                ceilings, SWA on the outside.
              </li>
              <li>
                <strong>Terminating cables</strong> — T&amp;E into accessories, singles into terminal
                blocks, flex into connectors and ferrules, glands and ferrules on SWA, crimps on bigger
                terminations.
              </li>
              <li>
                <strong>Main bonding</strong> — choosing the right CSA (typically 10 mm² for water and
                gas in domestic installs), making the connections, testing the continuity.
              </li>
              <li>
                <strong>Inspection</strong> — visual and functional checks before energising.
              </li>
              <li>
                <strong>Dead testing</strong> — continuity of CPC, ring final continuity (R1+R2, r1, rn,
                r2), insulation resistance, polarity, functional tests. The full Initial Verification
                sequence per BS 7671 Part 6.
              </li>
            </ul>
            <p>
              Everything from Modules 2 and 3 feeds into Module 4. The cable sizing maths, the supply
              network knowledge, the BS 7671 protective device theory, the renewables-side awareness —
              all of it lands in your hands the moment you make the first hole in a wall.
            </p>
          </ConceptBlock>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section6/6-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.4 Installation requirements
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 4 — Installation of wiring systems and enclosures →
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
