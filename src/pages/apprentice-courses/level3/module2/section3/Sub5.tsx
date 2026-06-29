/**
 * Module 2 · Section 3 · Subsection 5 — Wind, hydro, CHP, biomass deeper
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.2
 *   AC 1.2 — "specify the main types, characteristics, and purposes of environmental
 *             technology systems"
 *
 * Layered depth: 2357 Unit 312 ELTP02 / AC 3.1 (provide information on operational
 * requirements and benefits); 2357 Unit 602 ELTK02 / AC 3.2 (applications and
 * limitations of environmental technology systems).
 *
 * Note: Unit 301 is overview-level. Sub 3.3 covered MVHR + wind + micro-CHP + biomass
 * at recognition level. This Sub deepens the four less-common technologies — micro-wind,
 * micro-hydro, micro-CHP, biomass — with grid-connection framework, current UK market
 * relevance and the L3 electrical scope distinct from the mechanical / civil trades.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { TransformerSchematic } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Wind, hydro, CHP, biomass deeper (3.5) | Level 3 Module 2.3.5 | Elec-Mate';
const DESCRIPTION =
  "Micro-wind, micro-hydro, micro-CHP and biomass at deeper recognition level for the L3 electrician — grid-connection framework, planning and noise / emissions regulation, capacity factors, MCS qualifications and the L3 electrical scope distinct from the mechanical and civil trades. Why some of these are still common (biomass in rural off-gas-grid) and some are increasingly rare (micro-CHP, suburban wind).";

const checks = [
  {
    id: "l3-m2-s3-sub5-wind-yield",
    question:
      "Why does a domestic micro-wind turbine in a typical suburban back garden almost always disappoint compared to manufacturer claims?",
    options: [
      "Because suburban planning rules cap the turbine height at roof level, and a turbine that low simply cannot reach its rated speed. The manufacturer's figures assume a 30 m mast; planning limits the mast to a few metres, so the shortfall is purely a height-restriction issue, not a wind one — a taller mast in the same garden would meet the claim.",
      "Because domestic turbines are wired to export-limited inverters that cap the output at 3.68 kW to stay within G98. The turbine could produce its rated 5 kW but the inverter throttles it, so the disappointment is an electrical limitation rather than anything to do with the wind resource.",
      "Wind power is proportional to the cube of wind speed, so halving the wind speed cuts power by a factor of eight. Suburban gardens sit in turbulent, sheltered air well below the open-site speed manufacturers rate at, so real annual yields are typically only 5-15 percent of the rated capacity factor.",
      "Because wind power is proportional to wind speed directly (P is linear in v), and suburban wind speeds are only slightly below open-site values. The small linear shortfall means real yields come in at around 80-90 percent of the claim — a modest disappointment that is easily corrected by cleaning the blades each year.",
    ],
    correctIndex: 2,
    explanation:
      "The cube law is the killer. A small reduction in wind speed produces a huge reduction in power. The MCS Wind Yield Estimator (MIS 3003 site assessment) calculates expected yield from the actual site wind data — the customer who reads the calculator output is much less likely to install in a low-wind suburban back garden. As an L3 apprentice you may meet existing micro-wind installs but new-build is rare today.",
  },
  {
    id: "l3-m2-s3-sub5-hydro-licence",
    question:
      "What licensing and permitting does a domestic micro-hydro install need in the UK?",
    options: [
      "Multiple consents stack up: Environment Agency abstraction and impoundment licences, Land Drainage Consent from the Lead Local Flood Authority, planning permission for the powerhouse, the DNO G98 / G99 connection, and an MCS MIS 3008 install for grant eligibility. The licensing alone can take 1-3 years.",
      "None. Micro-hydro is permitted development on private land as long as the watercourse runs through the owner's property, so the customer just needs to notify the DNO of the connection. Because the water is the owner's own, there is no abstraction or impoundment licensing to obtain.",
      "Only a single MCS certificate. Because micro-hydro is an MCS-recognised technology, the MCS MIS 3008 sign-off covers all the regulatory requirements in one document, and the Environment Agency role is purely advisory with no licence required for domestic-scale schemes.",
      "Only planning permission from the local authority for the powerhouse building. The turbine and intake works are classed as agricultural works and need no separate consent, so once the building is approved the customer can abstract and impound water freely.",
    ],
    correctIndex: 0,
    explanation:
      "Hydro is the technology with the longest planning timeline. The Environment Agency (England), SEPA (Scotland) and Natural Resources Wales process abstraction and impoundment applications carefully because each affects the watercourse ecology. Where a site has the right head and flow, micro-hydro is excellent — capacity factor 50-80 percent compared to PV at 10-12 percent. But the licensing bar is high. Most UK micro-hydro is rural estate-scale rather than domestic.",
  },
  {
    id: "l3-m2-s3-sub5-biomass-emissions",
    question:
      "Why is the regulatory environment for biomass heating tightening in the UK and what does it mean for new installs?",
    options: [
      "Because biomass fuel has become scarce and expensive as forests are protected, so the regulation simply reflects a shortage of wood pellets. New installs are discouraged because there is not enough fuel to supply them, not for any emissions reason — once supply recovers the rules will relax.",
      "Because biomass boilers were found to be a fire risk and the regulations now require costly fire-suppression systems on every install. The tightening is a fire-safety measure, so new installs are unviable mainly because of the price of the mandatory sprinkler and detection kit.",
      "Because the carbon accounting was revised to count biomass as fully fossil-equivalent, so it lost its renewable status entirely. The regulation tightened because biomass is now treated identically to coal for emissions, which is why no grants or incentives remain for it anywhere in the UK.",
      "Biomass combustion produces particulate matter and nitrogen oxides — a material air-quality issue in built-up areas. Regulation has tightened through Smoke Control Areas, Ecodesign emission limits, the closure of the RHI and the Boiler Upgrade Scheme's restriction of biomass to defined rural off-gas-grid cases, leaving urban installs largely unviable.",
    ],
    correctIndex: 3,
    explanation:
      "Biomass air-quality concerns have changed the policy direction sharply over the past decade. The Boiler Upgrade Scheme exclusion of urban biomass plus the Ecodesign emission limits effectively close the urban / suburban market. Rural off-gas-grid retains a narrow niche. As an apprentice you should recognise the regulatory direction and not assume biomass is a routine option.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is a capacity factor and what are typical values for domestic micro-wind, micro-hydro and PV in the UK?",
    options: [
      "Capacity factor is the peak power a system can deliver in a single instant under ideal conditions, expressed in kW. For UK domestic PV it is about 4 kW, for micro-wind about 5 kW and for micro-hydro about 10 kW. It matters because it tells you the largest load the system can supply at once, which sizes the inverter.",
      "Capacity factor is the ratio of actual annual energy output to the energy a system would produce running at rated output all year. UK averages run roughly: domestic PV 10-12 percent, suburban micro-wind 5-15 percent, rural exposed wind 20-30 percent, micro-hydro 50-80 percent. It converts a nameplate kW rating into a realistic annual kWh yield.",
      "Capacity factor is the proportion of a system's output that the customer is allowed to export under G98, set at a fixed 16 percent for all technologies. PV, wind and hydro all share the same 16 percent because the figure is a grid-connection limit, not a measure of how much the system generates.",
      "Capacity factor is the efficiency with which a system converts its fuel to electricity. UK PV runs at about 20 percent, micro-wind at about 35 percent and micro-hydro at about 90 percent. It matters because it tells you how much of the available energy is lost as heat, in the same way as a heat pump's COP.",
    ],
    correctAnswer: 1,
    explanation:
      "Capacity factor is the honest comparator across renewable technologies. PV looks impressive on a sunny afternoon but spends 70 percent of the year delivering little or nothing. Hydro at the right site delivers most of the time. As an apprentice you should be able to explain why a 4 kWp PV array does not generate 4 kW × 8760 hours per year of energy — the panel rating is the peak under standard test conditions, not the average.",
  },
  {
    id: 2,
    question:
      "What is the difference between an internal combustion engine micro-CHP and a fuel cell micro-CHP, and why has the market mostly moved away from both?",
    options: [
      "An ICE micro-CHP burns wood pellets and a fuel cell micro-CHP burns logs — both are solid-fuel units. The market moved away because the Clean Air Act banned solid-fuel generation in urban areas, leaving micro-CHP viable only in rural off-gas-grid sites.",
      "An ICE micro-CHP runs on diesel and a fuel cell micro-CHP runs on petrol, with both driving a small generator. The market collapsed because road-fuel duty made the running costs uneconomic, and the noise of the engine made them unpopular indoors.",
      "Both generate electricity locally and use the waste heat: ICE micro-CHP burns gas in a small reciprocating engine driving a generator, while fuel-cell micro-CHP reacts reformed hydrogen with oxygen in a stack to produce electricity directly. Both are gas-fired, and the market has collapsed as falling grid carbon let heat pumps win the comparison.",
      "An ICE micro-CHP is solar-powered and a fuel cell micro-CHP is battery-powered, so neither burns any fuel. The market moved away from both because PV panels became cheaper and did the same job more simply, making the integrated units redundant.",
    ],
    correctAnswer: 2,
    explanation:
      "Micro-CHP was the great unfulfilled promise of the early 2010s — the technology works but the policy and grid evolution overtook it. As an apprentice you may meet ICE micro-CHP on EICRs of homes installed under RHI 2014-2017. Fuel cell micro-CHP (Viessmann, Panasonic) saw small UK market presence but never scaled.",
  },
  {
    id: 3,
    question:
      "What is the L3 electrical scope on a biomass boiler install in a rural property?",
    options: [
      "The whole install — the L3 electrician fits the boiler, builds the flue, sets up the fuel hopper, lights the burner for commissioning and handles the ash, as well as the wiring. A biomass boiler is a single-trade electrical job because everything on it runs from the control board.",
      "Only the final flex from a 13 A socket to the boiler. The boiler arrives fully wired and just needs plugging in, so the apprentice fits one socket nearby; no dedicated circuit, controls cabling or bonding is involved because the unit is treated as a portable appliance.",
      "A three-phase 415 V supply on a 63 A breaker, because the combustion fan and auger are three-phase motors that cannot run single-phase. The DNO must convert the property to three-phase before a domestic biomass boiler can be installed, which is the bulk of the electrical work.",
      "The supply for the boiler controls and combustion-air fan (typically 13 A, some units 16 A), the pellet auger and control electronics, the wet-system pump, the programmable thermostat / weather compensation, and chassis bonding where required. The combustion side, flue, fuel store and ash handling are mechanical scope.",
    ],
    correctAnswer: 3,
    explanation:
      "Biomass electrical scope is straightforward and similar to a gas boiler — controls, pumps, fans. The fuel handling and combustion side belong to the heating engineer. As an apprentice you focus on the supply and control wiring; recognise where the trade boundary sits.",
  },
  {
    id: 4,
    question:
      "Why does micro-hydro have a much higher capacity factor than micro-wind or PV but is still rarely installed?",
    options: [
      "Water flows much of the year, so hydro produces most days and posts a 50-80 percent capacity factor — far above PV or wind. It stays rare because qualifying sites are scarce, the abstraction and impoundment licensing runs 1-3 years, and the civil works and remote grid connection cost tens of thousands.",
      "Because the turbines wear out quickly in moving water, so the kit needs replacing every few years and the running cost is prohibitive. The high capacity factor is real but the maintenance burden of a constantly running machine cancels out the benefit, which is why few are installed.",
      "Because micro-hydro cannot be connected to the grid — the G98 and G99 recommendations exclude water-driven generators. Without a grid connection the customer can only use the power on site, so the high capacity factor is wasted and the technology is rarely chosen.",
      "Because micro-hydro produces only DC, which most homes cannot use, and the conversion losses to AC are so large that the high capacity factor disappears. The need for a costly DC-to-AC plant is what keeps installs rare despite the strong raw output.",
    ],
    correctAnswer: 0,
    explanation:
      "Hydro is the technology hampered by site availability and licensing rather than technology readiness. The kit is mature and reliable. The barrier is finding a legally permissible site with the right head and flow at a reasonable connection cost. The L3 apprentice may never see a domestic micro-hydro install in their career outside specific rural areas (Lake District, Snowdonia, parts of Scotland).",
  },
  {
    id: 5,
    question:
      "What is a Smoke Control Area and what does it mean for biomass installs?",
    options: [
      "A Smoke Control Area is the zone immediately around a biomass flue where carbon-monoxide detectors must be fitted. It is defined by the boiler manufacturer rather than by law, and it means a CO alarm has to be installed within a set distance of the appliance — a wiring task for the apprentice but no restriction on the install itself.",
      "Smoke Control Areas, defined under the Clean Air Act 1993, cover almost every UK urban area. In an SCA it is an offence to emit smoke from a domestic chimney unless burning an authorised fuel in a Defra-exempt appliance — so new biomass must use approved Ecodesign-compliant kit and approved fuel.",
      "A Smoke Control Area is a fire-compartment zone under Building Regs Part B where biomass flues must be fire-stopped at every floor penetration. It means the apprentice fits intumescent collars around the flue, but it places no restriction on the type of appliance or fuel that can be burned.",
      "A Smoke Control Area is a planning designation that bans all visible chimneys for aesthetic reasons in conservation areas. It means a biomass boiler in such an area must use a concealed or flueless appliance, but standard Defra-approved units can be fitted freely outside conservation zones.",
    ],
    correctAnswer: 1,
    explanation:
      "Smoke Control Areas have effectively closed the urban / suburban market for non-compliant biomass. As an apprentice you should recognise SCA status as a planning constraint — the customer in an SCA needs Defra-approved kit and approved fuel. The boiler / stove manufacturer publishes the exemption status on their data sheet.",
  },
  {
    id: 6,
    question:
      "How does ENA G98 / G99 apply to micro-wind, micro-hydro, micro-CHP and biomass with electrical generation?",
    options: [
      "G98 and G99 apply only to PV and battery systems; wind, hydro and CHP have their own separate ENA recommendation (G83) because they produce AC at variable frequency rather than from a DC inverter. The L3 apprentice must use the correct document for each technology, as the frameworks are not interchangeable.",
      "G98 covers wind and hydro while G99 covers CHP and biomass — the document is chosen by the type of generation rather than by capacity. A 200 W wind turbine therefore needs G98 and a 200 W CHP unit needs G99 regardless of how much they export, because the framework is split by fuel.",
      "Same framework as PV and battery. Any generator connected in parallel with the public network falls under ENA G98 (up to 16 A per phase) or G99 (above that). Wind, hydro and micro-CHP connect via an inverter or grid-tie generator. Biomass that only produces heat is not a generator and needs no G98 / G99.",
      "None of these need G98 or G99 because only solar PV is a parallel generator — wind, hydro and CHP all run as standalone island supplies disconnected from the grid. The apprentice fits a manual changeover switch instead of any DNO notification, since the units never feed the network.",
    ],
    correctAnswer: 2,
    explanation:
      "G98 / G99 is technology-agnostic — capacity decides. The same fast-track / pre-application framework applies whether the generation is PV, wind, hydro or CHP. Biomass with no electrical generation is purely a heat appliance and does not enter the framework — though it has its own regulatory chain (Smoke Control Areas, Ecodesign, MCS MIS 3004 / 3006).",
  },
  {
    id: 7,
    question:
      "What is the head of a micro-hydro install and how does it determine technology choice?",
    options: [
      "Head is the width of the river feeding the turbine, measured in metres across the channel. A wider river gives more head and so more power. Turbine choice depends on the width: narrow streams use a Pelton wheel, wide rivers use an Archimedes screw. The L3 electrician selects the turbine from the channel width.",
      "Head is the temperature difference between the incoming and outgoing water, measured in degrees. The turbine extracts energy from this temperature drop, so a colder stream gives more head. The hydro designer matches the turbine to the temperature range at the site, and warmer lowland rivers need a Kaplan turbine.",
      "Head is the speed of the water as it leaves the turbine, measured in metres per second. Faster outflow means more head and more power. Turbine choice depends on outflow speed: fast outflow suits an Archimedes screw and slow outflow suits a Pelton wheel. The electrician picks the turbine from the measured outflow.",
      "Head is the vertical distance the water falls through the turbine, in metres; head times flow times gravity gives the available power. Different turbines suit different head ranges — Pelton for high head, Crossflow for medium, Kaplan or an Archimedes screw for low head — and the hydro designer matches the turbine to the site.",
    ],
    correctAnswer: 3,
    explanation:
      "Head is the dominant variable in hydro design. Different turbines exist for different head ranges; choosing the wrong turbine type for the head wastes most of the available energy. The L3 apprentice does not pick the turbine but should recognise the term and understand that the hydro designer matches turbine to site.",
  },
  {
    id: 8,
    question:
      "Why has the Boiler Upgrade Scheme included biomass for some properties but excluded it for most domestic installs?",
    options: [
      "BUS pays £7,500 for ASHP / GSHP and £5,000 for biomass, but the biomass strand is restricted to off-gas-grid properties in defined rural categories meeting Ecodesign limits. Heat pumps are the policy default; biomass is the fallback only where a heat pump is not viable and the air-quality impact is minimal.",
      "BUS includes biomass only for listed buildings, because heat pumps cannot be fitted to historic fabric. Any property with listed status qualifies for the biomass grant regardless of location or gas connection, while every other property — rural or urban — is steered to a heat pump. The deciding factor is heritage status, not air quality.",
      "BUS includes biomass for any property whose owner already burns wood, on the basis that they have the fuel supply chain in place. The grant follows the customer's existing fuel choice rather than the building, so a suburban home with a log store qualifies just as readily as a rural farmhouse.",
      "BUS includes biomass only for new-build properties built to the Future Homes Standard, where the airtight fabric makes biomass clean enough to use. Existing homes are excluded entirely, so biomass under BUS is a new-build technology rather than a rural retrofit option.",
    ],
    correctAnswer: 0,
    explanation:
      "Boiler Upgrade Scheme reflects the policy direction — heat pumps are the default, biomass is a narrow fallback. Air quality regulation (Clean Air Act, Ecodesign) plus the grant restriction effectively close the urban / suburban biomass market. Rural off-gas-grid retains a niche where the alternatives (oil, LPG) are higher carbon and the air-quality impact is minimal.",
  },
];

const faqs = [
  {
    question: "Are domestic wind turbines worth installing?",
    answer:
      "Almost never in suburban back gardens. The cube law on wind speed plus turbulence from surrounding buildings means real yields are far below manufacturer claims. The MCS Wind Yield Estimator (MIS 3003) calculates the expected yield from the actual site wind data; customers who see the calculator output rarely proceed. Properly sited rural micro-wind on exposed open ground can be excellent (capacity factor 20-30 percent) and competes with PV, especially at northern UK latitudes where winter PV yield is very low. The honest answer is site-dependent — a credible MCS site assessment is the gating document.",
  },
  {
    question: "Why is micro-CHP almost gone from the UK domestic market?",
    answer:
      "Three reasons. First — UK grid carbon intensity has fallen below the per-kWh emissions of on-site gas combustion. The carbon argument that justified gas micro-CHP in 2014 no longer holds in 2026. Second — Future Homes Standard removes new fossil-fuel boilers from new-build 2025, which closes the new-build market. Third — RHI closed for new applicants in 2022 removing the operational subsidy. Heat pumps now occupy the space micro-CHP was sold for. Commercial CHP at 5-50 kWe in constant-heat-demand sites still works (hospitals, leisure centres, industrial process) but domestic micro-CHP is effectively over.",
  },
  {
    question: "What permits does a customer need for micro-hydro?",
    answer:
      "On a typical UK micro-hydro site: Environment Agency (or SEPA / NRW) abstraction licence, impoundment licence, fish pass approval; Land Drainage Consent from the Lead Local Flood Authority; Planning permission from the LPA; DNO G98 / G99 connection; MCS MIS 3008 install for BUS grant eligibility (note BUS does not currently include hydro). The licensing chain can run 1-3 years. The customer engages a hydro consultancy at design stage; the L3 electrician handles the grid connection at install.",
  },
  {
    question: "Can biomass replace a gas boiler in a suburban property?",
    answer:
      "Generally no. Smoke Control Area rules under the Clean Air Act 1993 plus Ecodesign emissions limits make most urban / suburban biomass installs non-viable today. The Boiler Upgrade Scheme has restricted biomass to defined rural off-gas-grid scenarios. Heat pumps are the policy default for suburban replacement. Rural off-gas-grid properties (farmhouses, hamlets without mains gas) retain a biomass niche where the heat load is too high for a single heat pump or where the customer prefers a familiar wet-system fuel.",
  },
  {
    question: "Are these older renewables tested in the EICR five-year cycle?",
    answer:
      "Yes. Any fixed electrical installation including legacy micro-wind, micro-hydro and micro-CHP additions falls within EICR scope. The inspector verifies the supply, the inverter type-test certificate (if available), the AC isolation, the protective device, the bonding, the signage. Findings are coded C1 / C2 / C3 / FI per the EICR Best Practice Guide. Legacy installs from the 2010-2015 RHI / Feed-in-Tariff era frequently show ageing inverters approaching end-of-life and incomplete signage that pre-dates current Section 712 requirements.",
  },
  {
    question: "What is the L3 apprentice scope on a micro-hydro install?",
    answer:
      "The same as on a PV or wind install — DC and AC isolation, supply to the inverter / synchronous generator, bonding, controls, EIC certification, support to the MCS-certified installer on commissioning. The hydro civil works (intake, penstock, powerhouse, tailrace) are mechanical / civil scope. The turbine itself is mechanical kit; the L3 apprentice does not commission the turbine but does commission the electrical interface to the grid. ENA G98 / G99 applies as it would for any other generator.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 5"
            title="Wind, hydro, CHP, biomass deeper"
            description="The four less-common environmental technologies — micro-wind, micro-hydro, micro-CHP and biomass — at deeper recognition level. Capacity factor honesty, planning and licensing complexity, the regulatory direction and the L3 electrical scope distinct from the mechanical and civil trades."
            tone="emerald"
          />

          <TLDR
            points={[
              "Capacity factor is the honest comparator — PV 10-12 percent UK, suburban wind 5-15 percent, rural exposed wind 20-30 percent, micro-hydro 50-80 percent.",
              "Suburban micro-wind almost always disappoints due to turbulence from surrounding buildings and the cube law on wind speed. Rural exposed sites can work.",
              "Micro-hydro is excellent at qualifying sites but the Environment Agency licensing chain runs 1-3 years and civil costs are high.",
              "Biomass is now restricted by Clean Air Act Smoke Control Areas, Ecodesign emissions limits, BUS exclusion of urban installs and the closure of RHI. Rural off-gas-grid retains a niche.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain why suburban micro-wind almost always disappoints — wind shear, turbulence, the cube relationship between wind speed and power.",
              "Identify typical UK capacity factors for PV, suburban wind, rural exposed wind and micro-hydro and use these to compare expected annual energy yield.",
              "Describe the Environment Agency abstraction and impoundment licensing chain for UK micro-hydro at apprentice level.",
              "Explain why micro-CHP has largely disappeared from the UK domestic market — grid carbon decline, Future Homes Standard, RHI closure.",
              "Identify the air-quality regulatory framework affecting biomass installs — Clean Air Act 1993, Smoke Control Areas, Ecodesign, BUS restrictions.",
              "Recognise the L3 electrical scope on each technology distinct from the mechanical / civil trades.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Capacity factor — the honest comparator</ContentEyebrow>

          <ConceptBlock
            title="Nameplate kW is a peak; capacity factor tells you the annual yield"
            plainEnglish="Renewable kit is sold by nameplate kW — the peak output under ideal conditions. The actual annual energy yield (kWh) depends on how much of the year the kit can deliver close to that peak. Capacity factor is the ratio of actual annual energy to the energy that would be produced at rated output 24/7/365. Different technologies have very different capacity factors in the UK, which makes the same nameplate kW deliver very different annual yields."
            onSite="Customers compare technologies by nameplate kW and assume similar annual energy from similar peak ratings. Wrong. A 10 kW PV array yields about 9,650 kWh per year (CF 11 percent); a 10 kW micro-hydro yields about 52,500 kWh per year (CF 60 percent) — five times more energy from the same nameplate. Conversely a 10 kW micro-wind in a suburban garden may yield only 4,400 kWh (CF 5 percent) — half the PV yield. Capacity factor honesty is essential when discussing technology choice with customers."
          >
            <p>
              Typical UK capacity factors at apprentice level:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic PV — 10-12 percent</strong>. Most of the year the array is
                producing zero (night) or partial (cloud, low sun angle). Annual yield
                roughly 800-1100 kWh per kWp.
              </li>
              <li>
                <strong>Suburban micro-wind — 5-15 percent</strong>. Turbulence from
                surrounding buildings reduces effective wind speed; the cube law amplifies
                the loss.
              </li>
              <li>
                <strong>Rural exposed micro-wind — 20-30 percent</strong>. Open site, clean
                wind, properly sized turbine. Genuinely useful at northern UK latitudes
                where winter PV is poor.
              </li>
              <li>
                <strong>Micro-hydro — 50-80 percent</strong>. Water flows continuously
                most of the year especially in upland UK. The dominant capacity factor
                across UK micro-renewables.
              </li>
              <li>
                <strong>Biomass (heat only) — N/A</strong>. Biomass boilers are dispatchable
                — they run when needed, capacity factor depends on usage, not weather.
              </li>
              <li>
                <strong>Domestic micro-CHP — 30-50 percent</strong>. Limited by heat
                demand in the summer; drops to near-zero in warm months.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Clean Air Act 1993 — Part III (Smoke Control Areas) and the Smoke Control Areas (Authorised Fuels) (England) Regulations 2023"
            clause={
              <>
                In a Smoke Control Area it is an offence to emit smoke from a
                chimney of a building, including a private domestic chimney,
                unless an authorised fuel is being burnt in an authorised
                (Defra exempt) appliance. Local authorities maintain smoke
                control area boundaries and have enforcement powers including
                fixed penalty notices. New biomass installs in smoke control
                areas must use Defra exempt appliances and authorised fuels
                that meet Ecodesign emission limits.
              </>
            }
            meaning={
              <>
                Smoke Control Areas effectively close the urban / suburban
                market for non-compliant biomass. Almost every UK urban /
                suburban area is in an SCA. The customer wanting a wood
                burning stove or biomass boiler in an SCA must use a Defra
                exempt appliance and authorised fuel. The L3 apprentice does
                not enforce SCAs but should recognise the regulatory direction
                — biomass is increasingly a rural off-gas-grid niche, not a
                routine urban option.
              </>
            }
            cite="Source: Clean Air Act 1993 (1993 c.11) Part III and the Smoke Control Areas (Authorised Fuels) (England) Regulations 2023 — paraphrased; full text on legislation.gov.uk."
          />

          <TransformerSchematic />

          <VideoCard
            url={videos.transformers.url}
            title={videos.transformers.title}
            channel={videos.transformers.channel}
            duration={videos.transformers.duration}
            topic="Transformers — the grid-interface component for wind, hydro and CHP"
            caption="Every grid-connected micro-generator ultimately delivers power through (or alongside) a distribution transformer. Understanding the transformer makes the G98/G99 connection rules, anti-islanding and reverse-power scenarios easier to read."
          />

          <SectionRule />

          <ContentEyebrow>Micro-wind — the suburban myth</ContentEyebrow>

          <ConceptBlock
            title="The cube law on wind speed kills suburban yields"
            plainEnglish="Wind power is proportional to the cube of wind speed. Doubling the wind speed gives 8x the power. Halving the wind speed gives 1/8th the power. Manufacturer ratings are typically at 11-12 m/s — a strong open-site wind. A suburban back garden experiences wind shear from surrounding buildings — the wind at turbine hub height is 30-50 percent lower than a 10-metre open site reading. Halving the wind speed gives 1/8th the power. The result: real suburban yields are routinely 5-15 percent of the manufacturer rated capacity factor."
            onSite="The MCS Wind Yield Estimator (MIS 3003 site assessment) uses the local wind atlas plus a site-specific turbulence factor to estimate the realistic annual yield. Most customers who see the estimator output for a suburban site decide not to proceed. Properly sited rural micro-wind on exposed open ground (no obstructions within 10x the turbine height for the prevailing wind direction) can hit 20-30 percent capacity factor and competes well with PV, especially at northern UK latitudes."
          >
            <p>
              Practical guidance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Suburban back garden</strong> — almost always uneconomic. The MCS
                site assessment normally returns a yield estimate too low to justify the
                capital cost.
              </li>
              <li>
                <strong>Rural exposed open site</strong> — can be excellent. Hub height
                15-25 m on a properly engineered mast, well clear of obstructions.
              </li>
              <li>
                <strong>Building-mounted micro-wind</strong> — turbulence from the building
                itself usually destroys the yield; rarely justified.
              </li>
              <li>
                <strong>Planning constraints</strong> — many local authorities treat
                domestic wind under permitted development with conditions; some require
                full planning. Listed buildings and conservation areas often refuse.
              </li>
              <li>
                <strong>MCS MIS 3003</strong> — the install standard for grant
                eligibility. Includes the site assessment methodology that filters out
                non-viable sites at design stage.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Micro-hydro — excellent at qualifying sites</ContentEyebrow>

          <ConceptBlock
            title="Head and flow plus a 1-3 year licensing process"
            plainEnglish="Micro-hydro converts the gravitational potential energy of falling water into electricity. Power available equals flow rate (cubic metres per second) times head (metres) times gravity (9.81). High capacity factor (50-80 percent UK) makes hydro the most energy-productive renewable per nameplate kW where it works. The barriers are site availability (need head + flow + watercourse access), licensing complexity (Environment Agency abstraction and impoundment licences typically 1-3 years), capital cost (civil works £30-100k for domestic-scale) and grid connection cost (rural sites often distant from existing networks)."
            onSite="The L3 electrician arrives once the civil works are done and the turbine is in place. Scope is the AC interface to the grid — synchronous generator or inverter, switchgear, protection, meter, ENA G98 / G99 notification. The civil and mechanical work (intake, penstock, powerhouse, tailrace, fish pass) is hydro consultancy and civils contractor scope. The MCS-certified installer (MIS 3008) coordinates the trades and provides the customer commissioning evidence."
          >
            <p>
              Turbine type by head:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pelton wheel — high head 50-300 m</strong>. Impulse turbine; jets
                of water hit cup-shaped buckets on a wheel. Common in upland UK (Lake
                District, Snowdonia, Highlands).
              </li>
              <li>
                <strong>Turgo — medium-high head 30-200 m</strong>. Impulse, similar to
                Pelton but compact.
              </li>
              <li>
                <strong>Crossflow — medium head 5-50 m</strong>. Hybrid impulse / reaction;
                tolerant of variable flow.
              </li>
              <li>
                <strong>Kaplan / propeller — low head under 10 m</strong>. Reaction turbine;
                axial flow; common on lowland river sites.
              </li>
              <li>
                <strong>Archimedes screw — very low head 1-5 m, high flow</strong>. Slow
                rotating screw; fish-friendly; popular on canal and river weir sites.
              </li>
            </ul>
            <p>
              The MCS-certified hydro designer matches turbine type to the specific site
              head and flow. The L3 electrician handles the grid connection regardless of
              the turbine choice — same G98 / G99 framework, same EIC, same install pack
              philosophy as any other generator.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Micro-CHP — the technology that policy overtook</ContentEyebrow>

          <ConceptBlock
            title="High overall efficiency on paper; falling grid carbon undercut the case"
            plainEnglish="Micro-CHP (Combined Heat and Power) generates electricity locally and uses the waste heat for space heating and hot water. Two main flavours exist: internal combustion engine (ICE) micro-CHP burns gas in a small reciprocating engine driving a generator; fuel cell micro-CHP combines hydrogen (from natural gas reformation) with oxygen in a fuel cell stack. Both achieve high overall efficiency (electrical + thermal) of 85-95 percent because the waste heat is captured. Both are gas-fired."
            onSite="Market relevance has collapsed for three reasons: grid carbon intensity has fallen below the per-kWh emissions of on-site gas combustion (heat pumps now win the carbon argument), Future Homes Standard removes new fossil-fuel boilers from new-build 2025, and RHI closed to new applicants in 2022 removing the operational subsidy. New domestic micro-CHP installs are now rare. The L3 apprentice may meet legacy domestic micro-CHP on EICR of properties installed under RHI 2014-2017."
          >
            <p>
              Why the carbon argument changed:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>2014 grid carbon intensity</strong> — around 400 gCO2 per kWh. On-site
                gas combustion at 200 gCO2 per kWh was significantly cleaner than buying
                grid electricity. CHP made carbon sense.
              </li>
              <li>
                <strong>2026 grid carbon intensity</strong> — around 200 gCO2 per kWh.
                On-site gas combustion at 200 gCO2 per kWh is now equivalent or worse than
                grid electricity. The carbon argument for CHP has dissolved.
              </li>
              <li>
                <strong>Future trajectory</strong> — grid carbon continues to fall as
                offshore wind and battery storage scale. CHP gets relatively dirtier each
                year while heat pumps get cleaner.
              </li>
              <li>
                <strong>Commercial CHP at 5-50 kWe</strong> — still works in
                constant-heat-demand sites (hospitals, leisure centres, industrial
                process) where the heat is genuinely useful year-round and the alternative
                is wasted gas.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Biomass — the rural off-gas-grid niche</ContentEyebrow>

          <ConceptBlock
            title="Tightening regulation pushes biomass to a narrow rural niche"
            plainEnglish="Biomass burns wood pellets, wood chips or logs in a boiler or stove to deliver space heating and hot water. Mature, reliable technology. Operationally heavier than gas (weekly customer tasks — fuel delivery / loading, ash removal) but works well at scale where the alternative is oil or LPG. The regulatory direction is sharply restrictive — Smoke Control Areas (Clean Air Act 1993), Ecodesign emission limits, the closure of RHI, and BUS restriction to defined rural off-gas-grid scenarios. Result: new urban / suburban biomass is largely unviable; rural off-gas-grid retains a niche."
            onSite="The L3 electrician electrical scope on a biomass install is similar to a gas boiler — supply for the controls and combustion air fan, supply for the pellet auger feed system, supply for the wet system pump, supply for the programmable thermostat / weather compensation, bonding of the boiler chassis. Typically 13 A on a 6-10 A MCB; some larger units need a 16 A supply. The combustion side, flue, fuel store and ash handling are heating engineer / mechanical scope. The L3 apprentice does not service the boiler combustion or open the firebox — that is biomass-specific competence."
          >
            <p>
              Where biomass still makes sense in the UK:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rural off-gas-grid farmhouse</strong> — high heat load, no mains
                gas, no electrical capacity for a single large heat pump, alternative is
                oil or LPG. Biomass is competitive here.
              </li>
              <li>
                <strong>Rural estate / multiple dwellings on a district scheme</strong> —
                a larger biomass boiler can heat several buildings via a heat network.
                Capital cost amortises over multiple users.
              </li>
              <li>
                <strong>Rural commercial / agricultural drying</strong> — biomass works
                where on-site fuel (wood waste, straw) is available cheaply.
              </li>
              <li>
                <strong>Heritage / listed buildings</strong> — where heat pump install is
                impossible or refused for fabric reasons, biomass on Defra-approved
                Ecodesign appliances may be the only viable retrofit option.
              </li>
            </ul>
            <p>
              MCS qualifications for biomass: MIS 3004 (biomass space heating boilers
              under 45 kW), MIS 3006 (biomass stoves). The MCS-certified biomass installer
              coordinates the install; the L3 electrician handles the electrical scope.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Anaerobic digestion and biogas — the agricultural niche"
            plainEnglish="Anaerobic digestion (AD) takes farm slurries, food waste or energy crops and ferments them to produce biogas (mostly methane) that drives a CHP unit, generates heat for the digester process and exports electricity to the grid. AD plants are mostly farm-scale or industrial-scale; very few domestic systems exist in the UK. The L3 electrician's involvement is mostly on the CHP electrical interface — generation control, G99 grid connection, parallel-operation protection, signage at the meter and CU."
            onSite="A typical farm AD plant generates 50-500 kW of electricity from a CHP engine running on the digester gas. The grid connection follows G99 (because the size exceeds the G98 threshold), with full DNO design, network reinforcement contributions where needed, and witnessed commissioning. The protection settings (vector shift, ROCOF, voltage and frequency limits) are specified by the DNO in the Connection Offer and the L3 apprentice supports the witness commissioning. Ongoing maintenance is mostly engine-side (filters, oil, ignition); electrical scope is the protection panel, the changeover contactor, the metering."
          >
            <p>
              AD project moving parts the L3 apprentice should recognise:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Digester</strong> — the tank where slurry or
                feedstock ferments; mechanical / process scope, not
                electrical.
              </li>
              <li>
                <strong>Gas storage</strong> — gas holder over the digester or
                a separate gas bag; safety-critical, ATEX-zoned area.
              </li>
              <li>
                <strong>CHP unit</strong> — engine plus alternator generating
                electricity and heat; electrical interface to the L3
                apprentice's scope.
              </li>
              <li>
                <strong>G99 grid connection</strong> — DNO Connection Offer,
                witnessed commissioning, protection settings; same framework
                as larger PV.
              </li>
              <li>
                <strong>Smart export tariff or PPA</strong> — exported
                electricity sold under a Power Purchase Agreement to a
                supplier; meter accuracy and MID-class metering required.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Micro-CHP — the gas-fired generator that doubles as a boiler"
            plainEnglish="Micro-CHP units (Vaillant ecoPOWER, Baxi Ecogen, Honda EcoWill historically) burn natural gas in a small Stirling-cycle or internal combustion engine to generate up to about 1 kW of electricity while supplying domestic heat and hot water. The technology was promoted heavily during the SEG / FIT era; commercial uptake was modest because the value depends on substantial year-round heat demand. Most installs are in larger period properties or care homes."
            onSite="The L3 apprentice's role on a micro-CHP install is similar to a heat pump or boiler — supply circuit, controls cabling, isolators, bonding, signage. The export side requires G98 notification because the unit feeds the grid in parallel. The unit handles its own protection internally; the installer verifies the protection by witnessing the type-test certificate and confirming the signage at the consumer unit. Maintenance is heavier than a heat pump (engine service intervals); customers should be briefed on the maintenance schedule at handover."
          >
            <p>
              Micro-CHP install touchpoints:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply circuit</strong> — typically 13 A on a 6-10 A
                MCB; the unit's own controls draw little electricity.
              </li>
              <li>
                <strong>G98 notification</strong> — exporting up to 1 kW
                generally falls within G98; notify within 28 days.
              </li>
              <li>
                <strong>Type-test certificate</strong> — included in the
                handover pack as evidence the unit's anti-islanding
                protection is type-approved.
              </li>
              <li>
                <strong>Signage</strong> — alternative supply at the consumer
                unit, AC and DC isolation points (where DC bus is exposed),
                meter position.
              </li>
              <li>
                <strong>Maintenance schedule</strong> — engine service
                intervals, customer brief; warranty usually requires
                manufacturer-approved service.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Community renewables and the LEC / Cooperative model"
            plainEnglish="Beyond domestic and farm scale, community renewables run as Local Energy Cooperatives (LECs) — a community group invests jointly in PV, wind or hydro, sells the output to the grid or to local consumers, and shares the surplus among members. Examples include Brighton Energy Co-op, Bath and West Community Energy, Saving Energy in Derbyshire (SEED). The technical scope is the same as a commercial install at the same size, but the customer-side governance is different — community shareholders rather than a single owner."
            onSite="The L3 electrician on a community renewables job interfaces with both the technical install and the cooperative's governance. Documentation is comprehensive — the cooperative's investors expect transparency on commissioning, performance, maintenance. Annual general meetings often feature performance reports the technical team contributes to. The G99 grid connection is the same as a commercial install; the supplier-side Power Purchase Agreement is signed by the cooperative on behalf of its members. Career progression for the L3 apprentice — community renewable projects are growing in number and offer interesting variety beyond standard domestic install work."
          >
            <p>
              Community renewables operating context:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cooperative governance</strong> — investors are
                community members; AGMs and transparent reporting.
              </li>
              <li>
                <strong>Project scale</strong> — 50 kW to 5 MW typically;
                G99 grid connection, full DNO interaction.
              </li>
              <li>
                <strong>Site types</strong> — community-building roof PV,
                farmland solar, small wind, run-of-river hydro,
                community-owned EV charging hubs.
              </li>
              <li>
                <strong>Funding</strong> — community shares, social investor
                loans, grants; the financial structure feeds back into the
                technical commissioning timeline.
              </li>
              <li>
                <strong>Career exposure</strong> — community projects offer
                varied technical and customer-engagement work; valuable for
                the L3 apprentice considering a longer-term renewables
                pathway.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Ecodesign Regulations — Commission Regulation (EU) 2015/1185 and 2015/1189 (retained UK law)"
            clause={
              <>
                Solid fuel local space heaters (stoves) and solid fuel boilers
                placed on the market must meet seasonal space heating energy
                efficiency limits and emission limits for particulate matter,
                organic gaseous compounds, carbon monoxide and nitrogen oxides.
                The limits apply at the point of placing the appliance on the
                market and are enforced via product compliance regimes. Older
                appliances placed on the market before the regulation came into
                force are not subject to the limits but are subject to Smoke
                Control Area rules under the Clean Air Act 1993.
              </>
            }
            meaning={
              <>
                Ecodesign sets the emissions floor for new biomass appliances
                in the UK. Combined with Smoke Control Area rules, this
                effectively closes the urban / suburban market for older
                non-compliant kit. The L3 apprentice should recognise that
                'just fitting any wood burner' is regulated — the customer
                needs Defra-approved Ecodesign-compliant kit and authorised
                fuel in an SCA, and the manufacturer publishes the
                exemption status on the data sheet.
              </>
            }
            cite="Source: Commission Regulation (EU) 2015/1185 and (EU) 2015/1189 (retained UK law) — paraphrased; full text on legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Quoting a customer for suburban micro-wind based on manufacturer ratings without a site assessment"
            whatHappens={
              <>
                Customer wants 'green energy' and the sales rep quotes a 5 kW
                micro-wind turbine on the basis of the manufacturer rated
                output. The brochure suggests 10,000 kWh per year. After
                install the actual annual yield comes in at 600 kWh — 6 percent
                of the brochure number. Customer is angry, the firm
                reputation suffers, and the customer is stuck with a high-cost
                low-yield asset. The MCS Wind Yield Estimator (MIS 3003) would
                have predicted the result at survey stage if it had been run.
              </>
            }
            doInstead={
              <>
                Insist on the MCS site assessment (MIS 3003) before any
                customer quote on micro-wind. The assessment uses the local
                wind atlas plus a turbulence factor and produces a realistic
                yield estimate. Customers who see the realistic estimate for a
                suburban site rarely proceed. Honest assessment up front
                prevents a complaint case at handover.
              </>
            }
          />

          <CommonMistake
            title="Treating biomass as a routine alternative to a gas boiler in a suburban property"
            whatHappens={
              <>
                Customer in a Smoke Control Area asks for a wood pellet
                boiler. The installer quotes for the install and orders kit.
                After install the local authority environmental health team
                receives a complaint about smoke and on inspection finds the
                appliance is not Defra exempt and the fuel is not authorised.
                Fixed penalty notice issued; customer has to remove or replace
                the appliance; firm reputation damaged.
              </>
            }
            doInstead={
              <>
                Check Smoke Control Area status as the first step on any
                biomass enquiry. Confirm the appliance is on the Defra exempt
                list. Confirm the fuel is authorised. If the customer is in a
                suburban SCA and wants biomass, the honest answer is usually
                'heat pump is the better fit'. If the customer insists, they
                need an exempt appliance and authorised fuel, and the
                BUS grant probably does not apply.
              </>
            }
          />

          <Scenario
            title="Rural farmhouse — heat pump or biomass?"
            situation={
              <>
                You are assisting on a survey for a rural Cumbrian farmhouse.
                Off-gas-grid (oil currently). Heat load 30 kW design. Electrical
                supply is single-phase 80 A. The farmer wants to reduce running
                cost and is considering either an ASHP or a biomass boiler.
                Mains gas is not available.
              </>
            }
            whatToDo={
              <>
                Honest framing of the trade-off: ASHP at 30 kW design heat load
                may need 12-15 kW electrical input on the coldest day — close
                to the 80 A supply limit (about 18 kW continuous). The MCS
                designer can specify a lower-temperature emitter design with
                fabric upgrades to reduce the heat load to nearer 20 kW, which
                makes the heat pump fit the supply. SCOP 3.0-3.5 likely. BUS
                grant £7,500. Biomass at 30 kW fits the load directly with no
                supply issue. SCOP not relevant; running cost depends on pellet
                price (currently competitive with oil). BUS grant £5,000 if
                eligibility criteria met (off-gas-grid rural, Defra-approved
                appliance). Customer accepts the operational chore (weekly
                pellet loading, ash removal). Recommend the MCS heat-loss survey
                to settle on the heat pump option after fabric assessment, with
                biomass as the fallback if fabric work is impractical or the
                supply upgrade cost is prohibitive.
              </>
            }
            whyItMatters={
              <>
                Rural off-gas-grid is the one segment where biomass remains
                competitive with heat pumps. As an apprentice you should
                recognise the technology trade-offs, the supply constraint, the
                BUS grant differences, and frame the customer choice honestly.
                The MCS designer makes the final recommendation with numbers;
                the apprentice on site should be able to discuss the trade-offs
                at customer level.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 PV scope"
            clause={
              <>
                Requirements of Section 712 shall apply to PV installations not connected to a
                system for distribution of electricity to the public, in parallel with a system
                for distribution of electricity to the public, and as an alternative to a system
                for distribution of electricity to the public.
              </>
            }
            meaning={
              <>
                Off-grid renewable installs are explicitly within Section 712 scope. Don&apos;t
                assume an off-grid system is somehow exempt from BS 7671 — it is not. The DC
                isolation, RCD type, earthing arrangement and labelling rules apply identically
                to standalone systems.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Capacity factor is the honest comparator — PV 10-12 percent UK, suburban wind 5-15 percent, rural exposed wind 20-30 percent, micro-hydro 50-80 percent, micro-CHP 30-50 percent.",
              "Suburban micro-wind almost always disappoints — wind shear from buildings, cube law on wind speed. Rural exposed sites can work; insist on MCS MIS 3003 site assessment first.",
              "Micro-hydro is excellent at qualifying sites but the EA / SEPA / NRW abstraction and impoundment licensing chain runs 1-3 years and civils cost £30-100k.",
              "Micro-CHP has largely disappeared from UK domestic — falling grid carbon intensity has dissolved the carbon argument; Future Homes Standard removes new gas appliances.",
              "Biomass is now restricted to rural off-gas-grid niches by Smoke Control Areas, Ecodesign emissions limits, BUS exclusion of urban installs and the closure of RHI.",
              "ENA G98 / G99 framework applies to all parallel-connected generators including micro-wind, micro-hydro, micro-CHP, regardless of generation technology.",
              "MCS qualifications by technology — MIS 3003 wind, MIS 3008 hydro, MIS 3004 / 3006 biomass. The MCS-certified installer coordinates the trades and produces commissioning evidence.",
              "L3 electrical scope across all four technologies — supply, isolation, controls, bonding, EIC certification. The mechanical / civil / combustion sides belong to specialist trades.",
            ]}
          />

          <Quiz title="Wind, hydro, CHP, biomass deeper — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.4 Heat pump system technology deeper
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 4 — Regulatory framework
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
