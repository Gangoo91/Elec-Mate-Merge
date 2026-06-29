import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  Pullquote,
} from '@/components/study-centre/learning';
import { MicroHydroScheme } from '@/components/study-centre/diagrams/renewableGapSvg';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm9s7-turbine-types',
    question: 'What are the main micro-hydro turbine types + when does each suit?',
    options: [
      'Pelton high head, Francis medium, Crossflow low/variable, Archimedes screw very low head and fish-friendly',
      'Pelton for low head/high flow and Archimedes screw for high head/low flow — the reverse of their actual use',
      'The same Francis turbine suits every site, because its adjustable guide vanes cover all conditions',
      'Only the Pelton turbine is ever used in micro-hydro, regardless of the site head or flow available',
    ],
    correctIndex: 0,
    explanation:
      'Micro-hydro turbine selection by head + flow: (1) Pelton — high head 50m+ (some installs at 200+ m); low flow. Water jet from nozzle hits cup-shaped buckets on rotor; high efficiency at high head; classic mountain stream + dam installs. (2) Francis — medium head 10-100m; medium flow. Reaction turbine with adjustable guide vanes; most common at small commercial scale; suits varied conditions. (3) Crossflow (Banki / Mitchell) — low head 5-50m; variable flow; water passes through rotor twice for efficiency. Rugged + simple + lower cost; suits sites with seasonal flow variation. (4) Archimedes screw — very low head 1-10m; high flow. Slow rotation (10-30 RPM); fish-friendly (no fast blades); sediment-tolerant; suits rivers + weirs + low-head sites with environmental concerns. UK 2025-26 micro-hydro distribution: Pelton most common (Scotland + Wales mountains); Francis at established mill / weir sites; Crossflow at variable-flow rural sites; Archimedes screw increasing share for fish-passable installs. Section 551 applies (Reg 551.1.1(b) turbines). MCS MIS 3008 micro-hydro installer standard.',
  },
  {
    id: 'm9s7-environment-agency-licence',
    question: 'Environment Agency abstraction licence for micro-hydro — what is it?',
    options: [
      'No licence is needed, because the water is returned to the watercourse after passing the turbine',
      'Only a one-off planning permission is required, with no flow or ecology assessment needed',
      'A mandatory abstraction licence, taking 3-12 months and assessing flow, ecology and downstream users',
      'A simple online self-certification that the installer completes on the day of commissioning',
    ],
    correctIndex: 2,
    explanation:
      'Environment Agency (or devolved equivalent) abstraction licence is mandatory for any water abstraction from a watercourse — including hydropower where water is diverted through turbine and returned. UK 2025-26 framework: (1) England: Environment Agency administers under Water Resources Act 1991 + later amendments. (2) Wales: Natural Resources Wales. (3) Scotland: SEPA under Controlled Activities Regulations (CAR). (4) NI: NIEA. Application process: (a) Pre-application advice (typical 4-8 weeks); (b) Formal application with hydrological assessment, ecological assessment, fish-passage assessment; (c) Consultation period (4-12 weeks public + statutory consultees); (d) Determination + licence grant or refusal. Typical timeline: 3-12 months end-to-end. Cost: variable — application fee £135-1500; consultant fees for assessments £3-15k typical. Key licence conditions: (1) Hands-Off Flow (HOF) — minimum flow that must remain in the watercourse below the abstraction point (protects ecology + downstream users); (2) Maximum abstraction rate; (3) Operating season (some licences restrict to high-flow months only); (4) Fish-passage requirements (Eel Regulations 2009 + Salmon and Freshwater Fisheries Act + species-specific); (5) Intake screen — typically 12mm bar spacing maximum to prevent eel entrainment per Eel Regulations 2009. Without licence: illegal abstraction; fines up to £20,000 + remediation order + criminal prosecution. Cert evidence bundle: licence reference + conditions + monitoring requirements.',
  },
  {
    id: 'm9s7-mis-3008',
    question: 'MCS MIS 3008 — what does it cover?',
    options: [
      'Every hydro installation of any size, including multi-megawatt utility-scale schemes',
      'Only the civil works such as intake, penstock and powerhouse, not the electrical scope',
      'Only schemes above 50 kW, leaving small domestic micro-hydro entirely uncovered',
      'Micro-hydro up to 50 kW — hydrological sizing, product approval, competence and handover',
    ],
    correctIndex: 3,
    explanation:
      'MCS MIS 3008 covers micro-hydro up to 50 kW. Scope: domestic + small commercial scale. Requirements: (1) Hydrological assessment per MCS methodology — head measurement (vertical drop from intake to turbine), flow measurement at multiple seasons / weather conditions, flow-duration curve analysis. (2) Capacity factor estimation — UK 2025-26 micro-hydro typical 30-60% capacity factor depending on site (much higher than PV ~10-12% or wind ~20-25%; hydro is more constant year-round). (3) Product on MCS-approved list — turbine + inverter (grid-tie or off-grid). (4) Installer competence — MCS-certified company + manufacturer training. (5) Customer handover documentation — sizing calc + commissioning record + expected annual energy yield + maintenance schedule. Larger hydro (>50 kW commercial / community / utility) falls outside MIS 3008 into commercial-scale frameworks. UK 2025-26 reality: micro-hydro market small but stable (rural / Highland / Welsh / Lake District sites with suitable head + flow); typical project ~£20-100k for 10-30 kW domestic / small commercial micro-hydro. Cert evidence bundle: MIS 3008 handover pack + BS 7671 EIC + Environment Agency abstraction licence + EREC G99 reference + Section 551 compliance.',
  },
  {
    id: 'm9s7-emerging-hydrogen-fuel-cells',
    question: 'UK 2025-26 hydrogen direction + fuel cells — what should an installer know?',
    options: [
      'Hydrogen for heating is already mainstream, with most UK homes now on a hydrogen gas supply',
      'Hydrogen for heating is mostly policy and limited trials; track the regulatory direction',
      'A nationwide hydrogen grid conversion has already been completed right across the UK',
      'Hydrogen for heating is banned outright in the UK, with no trials of any kind permitted',
    ],
    correctIndex: 1,
    explanation:
      'UK 2025-26 hydrogen direction + fuel cells emerging LCT landscape: (1) HyDeploy trials — 20% hydrogen blend in natural gas at Keele University (since 2019) + Winlaton near Gateshead (since 2021); verified safe operation of existing gas appliances (boilers, cookers, CHP IC engines) on the blend. Continues at trial scale. (2) Hydrogen heating village trials — Whitby (Cheshire) + Redcar; both cancelled / scaled back due to public concerns + technical difficulties. (3) UK strategic decision on hydrogen for heating — deferred from original 2026 target; later or possibly no widespread deployment. Hydrogen direction stronger for industrial decarbonisation + transport + electricity-grid balancing than for heating. (4) Hydrogen-ready boilers + heat pumps — manufacturer-marketed; verified for 20% blend operation; actual hydrogen supply unavailable at consumer scale. (5) Fuel cells — niche premium variant covered M9§5 micro-CHP; PEM (Viessmann Vitovalor) + SOFC (BlueGen) typical UK 2025-26; substantial upfront cost; limited UK service network. (6) Industrial fuel cells + larger commercial fuel cells emerging — some commercial CHP variants. (7) Section 551 applies to any fuel cell generating electricity (Reg 551.1.1(f) other suitable sources). Reg 551.7.5 anti-islanding mandatory. Reg 551.7.2.1 supply-side connection. (8) Installer position: aware of direction; understand the technologies; track regulatory decisions; no widespread install obligation in current planning horizon. Cert evidence bundle records any hydrogen-ready capability + manufacturer documentation + customer expectations.',
  },
];

const quizQuestions = [
  {
    question: 'Rural Highland install — 15 kW Pelton micro-hydro on a mountain stream. What scope?',
    options: [
      'An electrician-only job: fit the turbine, run a single cable and notify the DNO within a week',
      'A plumbing job with no abstraction licence, ecological assessment or DNO application needed',
      'A multi-trade project — MCS, civils, turbine, EA and DNO — over 12-24 months with a long cable run',
      'A turbine-supplier package install needing no civils, abstraction licence or DNO application',
    ],
    correctAnswer: 2,
    explanation:
      'Highland Pelton micro-hydro = major rural project. Multi-trade: (1) MCS company (MIS 3008) coordinates + holds customer relationship. (2) Civils contractor: intake structure + screening (Eel Regs 2009 12mm bar spacing); penstock pipework (typical 100-300m from intake to turbine; substantial pipe sized for design flow at design head); tailrace return to watercourse; powerhouse / turbine house. (3) Turbine specialist: supplies + commissions Pelton turbine + control system + grid-tie inverter (or grid-forming for off-grid sites). (4) BS 7671 electrical installer: dedicated three-phase circuit from grid-tie inverter to AC supply panel; cable run from powerhouse to building (often substantial — 50-500m typical); voltage drop calc per Reg 525.202 critical (long run); Section 551 architecture; Reg 551.7.5 anti-islanding integrated in inverter; Reg 551.7.2.1 supply-side connection; dump load at powerhouse for grid-loss scenarios. (5) Environment Agency consultant: abstraction licence application + hydrological assessment + ecological assessment + fish-passage assessment + monitoring requirements. (6) Ecologist: Habitats Regulations Assessment + Eel Regulations 2009 compliance + species impact assessment. (7) DNO: EREC G99 formal application + connection design + DNO-witnessed Reg 551.7.5 test. Timeline: 12-24 months (Environment Agency licence dominant). Cost: £80-150k project; electrical scope ~£10-20k. Capacity factor ~40-60% (much higher than PV / wind at the right site). Annual generation 50,000-90,000 kWh typical. Cert evidence bundle: MCS handover + BS 7671 EIC + EA licence + DNO G99 + ecological reports + Section 551.',
  },
  {
    question: 'Eel Regulations 2009 + Salmon and Freshwater Fisheries Act — micro-hydro impact?',
    options: [
      'They apply only to large hydro dams and never to micro-hydro installations on small streams',
      'Only a coarse trash screen is required, with no fish-passage or minimum-flow conditions imposed',
      'They restrict the operating season only, imposing no intake screen or fish-passage requirements',
      'A mandatory 12 mm intake screen, fish passage in salmonid waters and a Hands-Off Flow condition',
    ],
    correctAnswer: 3,
    explanation:
      'UK ecological regulations have significant impact on micro-hydro install: (1) Eel Regulations 2009 — implements EU Council Regulation 1100/2007. Requires intake screening at any water abstraction in eel-bearing waters (most UK rivers + streams). Typical screen: 12mm bar spacing maximum to prevent juvenile + adult eel entrainment. (2) Salmon and Freshwater Fisheries Act 1975 — protects salmonid species (Atlantic salmon, brown trout, sea trout); fish passage requirements at any obstruction. (3) Habitats Regulations 2017 — implements EU Habitats Directive (UK retained). Protects designated species + habitats; Habitats Regulations Assessment (HRA) required for any project affecting protected sites. (4) Practical install requirements: (a) Intake screen — mandatory; 12mm bar spacing per Eel Regs (some sites more stringent); (b) Fish ladder / bypass — at any weir / impoundment in salmonid waters; allows fish migration past obstruction; (c) Hands-Off Flow (HOF) — minimum flow that must remain in main channel below abstraction point; protects ecology + downstream users. Typical HOF 30-50% of natural flow at design conditions. (d) Fish-friendly turbine design preferred (Archimedes screw is the fish-friendliest at low-head; Pelton inherently fish-passable because no flow path through turbine). (5) Ecological assessment + monitoring: pre-install ecology + species survey; post-install monitoring (1-3 years) verifying compliance. (6) Cert evidence bundle: ecological reports + intake screen spec + fish passage details + HOF compliance + monitoring schedule.',
  },
  {
    question: 'Dump load for micro-hydro — why critical + how different from wind?',
    options: [
      'On grid loss the turbine over-speeds, so a dump load dissipates the steady water-driven power',
      'It works exactly like a wind dump load, only ever needed in brief intermittent bursts of power',
      'No dump load is needed, because the grid-tie inverter simply stops the turbine on loss of grid',
      'The dump load is only needed during commissioning, not in any normal grid-loss event in service',
    ],
    correctAnswer: 0,
    explanation:
      'Micro-hydro dump load: same Section 551.7.5 + safety principle as wind (§9.2). Scenario: DNO grid loss → Reg 551.7.5 anti-islanding device disconnects inverter from grid → BUT water still flowing through turbine, generator still producing power. Without dump load: generator unloads → no resistive torque → rotor over-speeds → potential bearing / blade / structural damage + safety hazard. Dump load solution: resistor bank sized to match turbine rated power; automatically engages on grid-loss detection; dissipates power as heat; provides electrical braking torque. Differences vs wind dump load: (1) Water flow is much more constant than wind — wind can drop to zero (turbine naturally slows + stops); water flow continues until manual diversion. So hydro dump load may be needed continuously when grid lost, not intermittently. (2) Some hydro installs include mechanical penstock valve closure as additional safety — automatic spring-loaded valve closes at the intake / penstock head, diverting water away from turbine. Provides second-tier protection beyond electrical dump load. (3) Hydro dump load typically larger sustained capability (continuous operation when grid lost) vs wind (intermittent). UK 2025-26 install: dump load + mechanical valve in series for highest-reliability sites. Cert evidence bundle: dump load product + rating + commissioning test (simulated grid-loss verifies dump load + valve sequence).',
  },
  {
    question: 'Long cable run powerhouse to building — what sizing constraints?',
    options: [
      'It is sized purely on current-carrying capacity, since voltage drop is irrelevant on long runs',
      '2.5 mm² twin-and-earth is adequate, provided it is clipped direct along the whole route',
      'The Reg 525.202 voltage-drop limit governs, with Zs verified — typically 35-70 mm² SWA',
      'The shorter the cable the larger it must be, so a 500 m run needs the smallest section fitted',
    ],
    correctAnswer: 2,
    explanation:
      'Micro-hydro cable run from powerhouse to building / AC supply panel is typically substantial — much longer than wind (mast typically 50-100m) or PV (rooftop typically <30m). Rural / Highland sites: 200-500m run typical because powerhouse must be at the foot of the head (water flows downhill to turbine) and the building / grid connection is often elsewhere. Cable sizing constraints: (1) Sustained current carrying capacity per Appendix 4 + cable type + method. (2) Voltage drop per Reg 525.202 + Appendix 4 Section 6.4 ≤5% — usually the limiting factor on long runs. (3) Reg 411.4 ADS + Zs verified at outdoor termination point (powerhouse or AC supply panel). Worked example: 15 kW three-phase grid-tie inverter, 22 A per phase continuous; 300m run; cable choice analysis: (a) 25 mm² SWA at 1.5 mV/A/m three-phase → 300 × 22 × 1.5 / 1000 = 9.9 V = 2.5% three-phase line-line — within Reg 525.202 5% limit but tight. (b) 35 mm² SWA at 1.1 mV/A/m → 300 × 22 × 1.1 / 1000 = 7.3 V = 1.8% — comfortable. (c) 50 mm² SWA at 0.78 mV/A/m → 300 × 22 × 0.78 / 1000 = 5.1 V = 1.3% — premium. Cable cost dominates the electrical scope on long runs; civils (trenching 600mm deep with sand bedding + marker tape + backfill) often the larger civils item. UK 2025-26 typical 15-30 kW micro-hydro: 35-70 mm² SWA at 200-500m. Armour-as-CPC per Reg 543 (35mm² SWA armour ~140mm² steel — well above Table 54.7 minimum). Cert evidence bundle: cable type + cross-section + length + Appendix 4 sizing calc + voltage drop result + Reg 543 CPC arrangement.',
  },
  {
    question: 'Hydrogen-ready boiler / heat pump — what does it mean in UK 2025-26?',
    options: [
      'It means the appliance is already running on a mainstream hydrogen supply in homes today',
      'It means the appliance only works once hydrogen arrives and cannot run on natural gas at all',
      'It is a legal requirement that every new boiler must be fitted with its own hydrogen tank',
      'It is tested for a 20% (or 100%) hydrogen blend but stays dormant on today\'s natural gas',
    ],
    correctAnswer: 3,
    explanation:
      'Hydrogen-ready boiler / heat pump UK 2025-26 reality: predominantly manufacturer-tested capability for future fuel-supply transitions. (1) 20% hydrogen blend ready — most modern UK gas boilers (Worcester Bosch, Vaillant, Ideal, Baxi etc.) tested + verified for 20% hydrogen blend in natural gas per HyDeploy specification. Boilers operate identically on 20% blend; combustion + safety verified. (2) 100% hydrogen ready — some boilers + heat pumps documented for full hydrogen operation via firmware / hardware update (replacement burner + injectors typical). Worcester Bosch Hydrogen Combi, Baxi 100% hydrogen-ready ranges. Heat pumps with hydrogen-fed water heater backup. (3) Current operational reality: customer\'s actual gas supply is natural gas (UK gas grid is natural gas + small biomethane fraction injected, no widespread hydrogen). Hydrogen-ready capability is DORMANT — adds no operational difference vs non-hydrogen-ready equivalent. (4) Future-proofing value: if UK hydrogen-for-heating policy decision proceeds + actual hydrogen supply rolls out, customer\'s appliance is ready. If not (or deferred): customer\'s appliance is equivalent to non-hydrogen-ready. (5) Marketing positioning: manufacturers + retailers emphasise hydrogen-ready for sustainability + future-proofing customers; honest customer expectation important. (6) Installer position: don\'t oversell the hydrogen narrative; UK 2025-26 hydrogen heating remains uncertain. Cert evidence bundle records hydrogen-ready capability + manufacturer documentation + customer expectations.',
  },
  {
    question: 'Fuel cells for commercial applications — UK 2025-26 emerging direction?',
    options: [
      'Commercial fuel cells are cheaper per kWe than IC engine CHP and already dominate the market',
      'Emerging 5-200 kWe fuel cells for data centres and hospitals, under Section 551 and EREC G99',
      'There are no commercial fuel cells in use or on trial anywhere in the UK at present',
      'Commercial fuel cells fall outside Section 551, because they involve no combustion of fuel',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial fuel cell deployment UK 2025-26: emerging beyond micro-CHP residential. (1) Larger commercial SOFC + PEM fuel cells — 5-200 kWe typical. Brands: Bloom Energy (US SOFC; some UK demo sites), FuelCell Energy (US SOFC commercial); domestic / European players. Used in: data centres (clean baseload + UPS replacement); hospitals (resilient power + heat); commercial buildings with carbon ambitions; hydrogen-fed sites. (2) Backup power UPS-replacement fuel cells — fuel cell provides clean continuous baseload + replaces / augments diesel generator UPS systems. Quieter, lower emissions, longer life. (3) Hydrogen-fed fuel cells — specialist applications where hydrogen supply available (industrial sites, hydrogen-economy hub projects, electric vehicle fast-charging support with on-site hydrogen-to-electricity conversion). (4) Cost reality: commercial fuel cells typically 2-3× capex of IC engine CHP per kWe; longer life (15-20+ years vs 10-15 years IC); lower maintenance; but higher upfront barrier. (5) Section 551 applies (Reg 551.1.1(f) other suitable sources); Reg 551.7.5 anti-islanding mandatory; EREC G99 formal application (>16 A per phase). (6) UK 2025-26 reality: fuel cell commercial deployment niche but growing; major projects often demonstration + carbon-target-driven; mainstream economic case still developing. Cert evidence bundle: Section 551 + EREC G99 + manufacturer DoC + commissioning + customer carbon / resilience use case documented.',
  },
];

const faqs = [
  {
    question: 'Why is micro-hydro install timeline so long?',
    answer:
      'Environment Agency abstraction licence dominates: 3-12 months end-to-end (pre-application advice + formal application + consultation period + determination). Plus DNO EREC G99 (12-26 weeks) + civils (variable; 2-6 months for intake / penstock / powerhouse construction) + electrical install (final phase). Total typical 12-24 months. Customer expectation managed from project start.',
  },
  {
    question: 'Hands-Off Flow (HOF) — practical install impact?',
    answer:
      'HOF is the minimum flow that must remain in the main watercourse below the abstraction point. Typical UK micro-hydro: 30-50% of natural flow at design conditions. Practical: reduces hydro yield (less water through turbine) + protects ecology + downstream users. Cert evidence bundle records HOF compliance via measured flow at intake + downstream + ongoing monitoring per Environment Agency licence conditions.',
  },
  {
    question: 'Capacity factor for micro-hydro vs wind / PV?',
    answer:
      'UK 2025-26 typical: micro-hydro 30-60% capacity factor (depending on site head + flow + seasonal variation); wind 20-25%; PV 10-12%. Hydro\'s higher capacity factor reflects more constant year-round flow at the right sites. Hydro produces more kWh per installed kW than wind or PV. Economic case competitive at viable sites. Sizing critical because higher kWh / kW.',
  },
  {
    question: 'Fuel cell economics in commercial UK 2025-26?',
    answer:
      'Capex: £4-8k per kWe for commercial fuel cells (vs £2-4k for IC engine CHP). Operational: longer life (15-20 years vs 10-15 years); lower maintenance (no engine wear); quieter; lower emissions; higher electrical efficiency (45-60% vs 35% for IC). ROI 8-15 years typical; longer than IC CHP due to capex but operational profile competitive. UK 2025-26 demos + early commercial deployment at carbon-target-driven sites; mainstream economic case developing as costs decline.',
  },
  {
    question: 'What about ammonia + thermo-electric + other emerging LCT?',
    answer:
      'Ammonia (NH3): emerging carrier for hydrogen — easier to transport + store than pure H2. Ammonia-fed fuel cells + combustion engines in early commercial demos (shipping fuel + industrial heating). UK 2025-26 limited deployment. Thermo-electric (Peltier / Seebeck): direct conversion of heat to electricity; small-scale niche (waste-heat recovery, off-grid sensors); not mainstream CHP. Other: phase-change materials, kinetic energy recovery, gravity batteries. Installer awareness recommended; track regulatory direction; minimal current install obligation.',
  },
];

export default function RenewableEnergyModule9Section7() {
  const navigate = useNavigate();

  useSEO({
    title: 'Micro-hydro + emerging LCT (hydrogen, fuel cells) | Renewable Energy 9.7 | Elec-Mate',
    description:
      'Micro-hydro electrical install — Pelton / Francis / Crossflow / Archimedes screw turbines; MCS MIS 3008; Environment Agency abstraction licence + Eel Regulations 2009; Section 551 + Reg 551.7.5 anti-islanding; long cable run + dump load. Plus emerging LCT: hydrogen direction (HyDeploy + hydrogen-ready) + fuel cells (commercial + emerging).',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-9')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 9
          </button>

          <PageHero
            eyebrow="Module 9 · Section 7 · Section 551 + MCS MIS 3008 + Environment Agency + emerging LCT"
            title="Micro-hydro + emerging LCT (hydrogen, fuel cells)"
            description="Micro-hydro from the BS 7671 electrical install perspective. Pelton / Francis / Crossflow / Archimedes screw turbines. MCS MIS 3008. Environment Agency abstraction licence + Eel Regulations 2009 + ecological assessments. Section 551 + Reg 551.7.5 anti-islanding + long cable run + dump load. Plus emerging LCT: UK 2025-26 hydrogen direction (HyDeploy + hydrogen-ready boilers + heat pumps) + fuel cells (commercial + emerging applications)."
            tone="yellow"
          />

          <TLDR
            points={[
              'Micro-hydro = Section 551 generating set (Reg 551.1.1(b) turbines). MCS MIS 3008 installer standard ≤50 kW. UK 2025-26 niche but stable rural / Highland market.',
              'Turbine types: Pelton (high head 50m+, low flow), Francis (medium head 10-100m), Crossflow (low head 5-50m), Archimedes screw (very low head 1-10m, fish-friendly).',
              'Capacity factor 30-60% (much higher than PV ~10% or wind ~20%). Hydro produces more kWh per installed kW where head + flow available.',
              'Environment Agency abstraction licence mandatory + dominant project-timeline driver (3-12 months). Eel Regulations 2009 intake screening (12mm bar spacing). Habitats Regs + Salmon Act fish passage.',
              'Long cable run powerhouse to building (50-500m typical rural) — Reg 525.202 voltage drop ≤5% the limiting factor; 35-70 mm² SWA typical 15-30 kW installs.',
              'Section 551 framework: Reg 551.7.5 anti-islanding mandatory + dump load (resistor bank) + mechanical penstock valve closure (additional protection on larger installs).',
              'EREC G99 formal application typical (sustained 5-50 kW export > G98 16 A threshold). DNO-witnessed anti-islanding test at larger commercial scale.',
              'Emerging LCT: hydrogen direction (HyDeploy 20% blend trials, hydrogen-ready boilers + heat pumps, UK strategic decision deferred); fuel cells (commercial PEM + SOFC; emerging beyond micro-CHP §9.5). Track regulatory direction.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish Pelton / Francis / Crossflow / Archimedes screw turbines + match each to head + flow conditions.',
              'Apply MCS MIS 3008 framework for ≤50 kW micro-hydro.',
              'Navigate Environment Agency abstraction licence process + Eel Regs 2009 + Habitats Regs + fish passage requirements.',
              'Apply Section 551 + Reg 551.7.5 anti-islanding + Reg 551.7.2.1 supply-side + dump load architecture.',
              'Size long cable run from powerhouse to building per Reg 525.202 + Appendix 4 Section 6.4 voltage drop.',
              'Navigate EREC G99 formal application + DNO-witnessed anti-islanding test (where applicable).',
              'Recognise UK 2025-26 hydrogen direction + customer-facing positioning of hydrogen-ready appliances.',
              'Recognise emerging commercial fuel cell applications + Section 551 applicability.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Micro-hydro is BS 7671 Section 551 + a small civil engineering project + an ecological assessment. The electrical install is the smallest scope but bound to the longest project timeline.
          </Pullquote>

          <ContentEyebrow>Micro-hydro turbines + Environment Agency framework</ContentEyebrow>

          <ConceptBlock
            title="Four turbine types by head + flow"
            plainEnglish="Micro-hydro turbine selection driven by site head (vertical drop) + flow (volume of water per second). Four main turbine types each suit different head / flow conditions: Pelton (high head), Francis (medium), Crossflow (low head + variable flow), Archimedes screw (very low head + high flow, fish-friendly)."
            onSite="UK 2025-26 micro-hydro distribution: Pelton dominant at Highland / Welsh / Lake District sites (mountain streams + good head); Francis at established mill / weir sites; Crossflow at variable-flow rural sites; Archimedes screw increasing share for fish-passable river installs."
          >
            <p>Turbine type matrix:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Pelton</strong> — high head 50m+
                (some installs 200m+); low flow. Water jet from nozzle hits cup-shaped
                buckets on rotor. High efficiency (~88-92%). Mountain stream + dam
                installs. UK brands: Gilkes Energy, Hydroplan, Esthec
              </li>
              <li>
                <strong className="text-white">Francis</strong> — medium head
                10-100m; medium flow. Reaction turbine with adjustable guide vanes
                (variable output). Most common at small commercial scale. Efficiency
                85-92%. Suits varied conditions
              </li>
              <li>
                <strong className="text-white">Crossflow (Banki /
                  Mitchell)</strong> — low head 5-50m; variable flow. Water passes
                through rotor twice for efficiency. Rugged + simple + lower cost.
                Suits sites with seasonal flow variation. Efficiency 75-85%
              </li>
              <li>
                <strong className="text-white">Archimedes screw</strong>
                — very low head 1-10m; high flow. Slow rotation (10-30 RPM);
                fish-friendly (no fast blades); sediment-tolerant. Suits rivers +
                weirs. Efficiency 70-85%. UK 2025-26 increasing share for fish-passable
                installs
              </li>
              <li>
                <strong className="text-white">UK 2025-26 site
                  distribution</strong> — Pelton ~40% (Highland / Welsh / Lake District
                mountains); Francis ~25% (mill / weir established sites); Crossflow ~20%
                (variable rural); Archimedes screw ~15% (rivers + fish-sensitive sites,
                growing share)
              </li>
              <li>
                <strong className="text-white">Sizing</strong> — typical UK
                domestic / small commercial micro-hydro 5-30 kW; community / agricultural
                30-100 kW; larger commercial / community schemes 100 kW - 5 MW
              </li>
              <li>
                <strong className="text-white">Capacity factor</strong>
                — 30-60% UK typical, depending on site. Much higher than PV (10-12%)
                or wind (20-25%). Annual kWh per kW installed: ~3,000-5,000 (vs PV
                ~900 + wind ~1,800-2,000)
              </li>
              <li>
                <strong className="text-white">Section 551</strong>
                — applies fully. Reg 551.1.1(b) turbines. Reg 551.7.5 anti-islanding
                + Reg 551.7.2.1 supply-side + Reg 551.4.2 multi-source RCD.
                MCS MIS 3008 installer standard
              </li>
            </ul>
          </ConceptBlock>

          <MicroHydroScheme caption="A micro-hydro scheme: intake, penstock, turbine and generator — power scales with head × flow." />

          <ConceptBlock
            title="Environment Agency abstraction licence + ecological framework"
            plainEnglish="Any water abstraction from a watercourse — including hydropower — requires Environment Agency abstraction licence (England) / Natural Resources Wales / SEPA (Scotland). Application process: 3-12 months end-to-end. Eel Regulations 2009 + Habitats Regs + Salmon Act add ecological / fish-passage requirements."
            onSite="The Environment Agency licence is the dominant project-timeline driver. Typical micro-hydro project total timeline 12-24 months — most of it waiting for licence determination. Plan accordingly + manage customer expectations from project start."
          >
            <p>Environment Agency + ecological framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Abstraction licence</strong>
                — required for any water abstraction. England: Environment Agency
                (Water Resources Act 1991). Wales: Natural Resources Wales. Scotland:
                SEPA under CAR. NI: NIEA
              </li>
              <li>
                <strong className="text-white">Application
                  process</strong> — pre-application advice (4-8 weeks) → formal
                application with hydrological + ecological + fish-passage assessments
                → consultation period (4-12 weeks) → determination + grant or refusal
              </li>
              <li>
                <strong className="text-white">Typical timeline</strong>
                — 3-12 months end-to-end. Faster for simple low-impact sites; longer
                for protected sites / large abstractions / controversial sites
              </li>
              <li>
                <strong className="text-white">Cost</strong> —
                application fee £135-1500; consultant fees £3-15k for assessments
                (hydrologist + ecologist + fisheries specialist)
              </li>
              <li>
                <strong className="text-white">Key licence
                  conditions</strong> — Hands-Off Flow (HOF — minimum flow remaining
                in main watercourse); maximum abstraction rate; operating season
                (some restricted to high-flow months); fish-passage requirements;
                monitoring requirements (typically year 1-3 post-install)
              </li>
              <li>
                <strong className="text-white">Eel Regulations 2009</strong>
                — implements EU Council Regulation 1100/2007. Requires intake screen
                at any water abstraction (12mm bar spacing maximum typical) to prevent
                eel entrainment
              </li>
              <li>
                <strong className="text-white">Salmon + Freshwater
                  Fisheries Act</strong> — protects salmonid species; fish passage
                requirements at obstructions in salmonid waters
              </li>
              <li>
                <strong className="text-white">Habitats Regulations
                  2017</strong> — UK retained EU Habitats Directive. Habitats Regulations
                Assessment (HRA) for projects affecting protected sites
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — abstraction licence reference + conditions +
                ecological reports + intake screen spec + fish-passage details + HOF
                compliance + monitoring schedule
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Section 551 + Reg 551.7.5 applied to micro-hydro"
            clause="Reg 551.1.1 lists generating set power sources including (b) turbines — micro-hydro falls here. Reg 551.7.5 mandates anti-islanding: means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4."
            meaning="Micro-hydro is a Section 551 generating set per Reg 551.1.1(b) turbines. Reg 551.7.5 anti-islanding mandatory — grid-tie inverter disconnects turbine from grid on supply loss. Reg 551.7.2.1 supply-side connection. Reg 551.4.2 RCD effectiveness across grid + hydro + (if present) PV / BESS combinations. Reg 551.7.5 compliance verified at commissioning: simulated grid-loss test (some DNOs witness directly for larger installs). On grid-loss: anti-islanding disconnects inverter → dump load engages to dissipate continuing water-flow-driven generation → mechanical penstock valve closes (on larger / higher-safety installs) as additional protection. Cert evidence bundle: inverter manufacturer DoC declaring Reg 551.7.5 compliance + commissioning test result + dump load functional verification + penstock valve test if installed."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Electrical scope + emerging LCT direction</ContentEyebrow>

          <Pullquote>
            Micro-hydro electrical scope is small. The licences, ecology, and civils dwarf it. But the dump load + the long cable run are non-negotiable BS 7671 deliverables.
          </Pullquote>

          <ConceptBlock
            title="Micro-hydro electrical scope + cable sizing"
            plainEnglish="BS 7671 electrical scope: dedicated three-phase (typical) circuit from grid-tie inverter to AC supply panel; long cable run from powerhouse to building (50-500m); Section 551 architecture; dump load at powerhouse for grid-loss scenarios. Reg 525.202 voltage drop ≤5% drives cable sizing."
            onSite="UK 2025-26 typical 15-30 kW three-phase hydro: 35-70 mm² SWA at 200-500m run. Cable cost + civils trenching dominate the electrical scope material cost. Powerhouse-located AC isolator + dump load + inverter; building-side AC supply panel termination."
          >
            <p>Cable + electrical scope details:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Grid-tie inverter
                  location</strong> — at powerhouse (turbine) location; converts
                turbine variable-frequency AC to grid-synchronised 50 Hz; anti-islanding
                integrated. Three-phase typical
              </li>
              <li>
                <strong className="text-white">Cable run</strong> —
                from inverter to building / AC supply panel. Typical 50-500m at rural
                / Highland sites. Substantial civils (trenching 600mm deep typical;
                sand bedding; marker tape; backfill)
              </li>
              <li>
                <strong className="text-white">Voltage drop calc</strong>
                — Reg 525.202 + Appendix 4 Section 6.4 ≤5%. Limiting factor on long
                runs. Three-phase voltage drop = single-phase ÷ √3 (factor of ~0.58)
              </li>
              <li>
                <strong className="text-white">Cable sizing
                  example</strong> — 15 kW three-phase 22 A per phase, 300m run: 25
                mm² SWA = 2.5% drop (tight); 35 mm² SWA = 1.8% drop (comfortable);
                50 mm² SWA = 1.3% drop (premium)
              </li>
              <li>
                <strong className="text-white">SWA armour as
                  CPC</strong> — per Reg 543. 35mm² SWA armour ~140mm² steel — well
                above Table 54.7 minimum for 25 mm² circuit
              </li>
              <li>
                <strong className="text-white">Dump load</strong> —
                resistor bank at powerhouse sized to match turbine rated power.
                Engages automatically on grid-loss; provides resistive load to brake
                generator + dissipate continuing water-driven generation
              </li>
              <li>
                <strong className="text-white">Mechanical penstock
                  valve</strong> — additional safety on larger / higher-safety installs.
                Automatic spring-loaded valve at intake / penstock head; closes on
                grid-loss; diverts water away from turbine. Substantial safety
                redundancy
              </li>
              <li>
                <strong className="text-white">AC isolator</strong>
                — at inverter for service / maintenance isolation. BS EN 60947-3
                lockable OFF
              </li>
              <li>
                <strong className="text-white">EREC G99
                  notification</strong> — typical (sustained 5-50 kW export &gt; G98
                threshold). DNO-witnessed anti-islanding test for larger commercial
                installs
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — cable type + cross-section + length + Appendix 4
                voltage drop calc + dump load + valve + Section 551 + EREC G99 +
                MCS MIS 3008 handover
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Emerging LCT: hydrogen direction + fuel cells"
            plainEnglish="UK 2025-26 emerging LCT: hydrogen direction (HyDeploy 20% blend trials; hydrogen heating village trials cancelled; UK strategic decision deferred); hydrogen-ready boilers + heat pumps (manufacturer-tested capability); fuel cells (commercial deployment beyond micro-CHP). Installer position: aware of direction, no current widespread install obligation."
            onSite="Hydrogen direction is policy-led + uncertain. Fuel cells are emerging commercial deployment. Installer should track regulatory direction + understand customer-facing positioning of hydrogen-ready appliances vs current operational reality."
          >
            <p>Emerging LCT landscape UK 2025-26:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">HyDeploy 20% blend
                  trials</strong> — Keele University (since 2019) + Winlaton near
                Gateshead (since 2021). Verified safe operation of existing gas
                appliances on 20% hydrogen blend. Continues at trial scale
              </li>
              <li>
                <strong className="text-white">Hydrogen heating
                  village trials</strong> — Whitby (Cheshire) + Redcar; both
                cancelled / scaled back over public concerns + technical issues
              </li>
              <li>
                <strong className="text-white">UK strategic
                  decision</strong> — hydrogen for heating decision deferred from
                original 2026 target. Hydrogen direction stronger for industrial
                decarbonisation + transport + electricity-grid balancing
              </li>
              <li>
                <strong className="text-white">Hydrogen-ready
                  boilers</strong> — Worcester Bosch + Vaillant + Ideal + Baxi etc.
                tested for 20% blend; some 100% hydrogen capable via firmware /
                hardware update. Future-proofing capability; dormant until / unless
                supply changes
              </li>
              <li>
                <strong className="text-white">Hydrogen-ready heat
                  pumps</strong> — some manufacturer hydrogen-fed water heater backup
                designs (heat pump primary + hydrogen-fed backup). UK 2025-26
                limited deployment
              </li>
              <li>
                <strong className="text-white">Commercial fuel
                  cells</strong> — emerging beyond micro-CHP residential. Bloom Energy
                + FuelCell Energy SOFCs; commercial PEM. Data centres + hospitals +
                hydrogen-economy hubs. 5-200 kWe range. Section 551 applies (Reg
                551.1.1(f))
              </li>
              <li>
                <strong className="text-white">Fuel cell economic
                  reality</strong> — capex 2-3× IC engine CHP per kWe; longer life
                + lower maintenance; ROI 8-15 years; mainstream economic case
                developing
              </li>
              <li>
                <strong className="text-white">Other emerging
                  LCT</strong> — ammonia (NH3 as hydrogen carrier; shipping fuel +
                industrial applications); thermo-electric (Seebeck / Peltier waste-heat
                recovery niche); phase-change materials; kinetic / gravity batteries
              </li>
              <li>
                <strong className="text-white">Installer position</strong>
                — aware of direction; track UK regulatory decisions; minimal current
                install obligation; honest customer expectations re hydrogen-ready
                capability vs current operational reality. Cert evidence bundle
                records any hydrogen-ready capability + manufacturer documentation
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 525.202 + Appendix 4 Section 6.4 — voltage drop on long micro-hydro cable runs"
            clause="The above requirements are deemed to be satisfied if the voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment does not exceed that stated in Appendix 4, Section 6.4."
            meaning="Reg 525.202 + Appendix 4 Section 6.4 set the ≤5% voltage drop limit for non-lighting circuits. For micro-hydro: long cable run powerhouse to building is the constraint. Worked example: 15 kW three-phase grid-tie inverter at 22 A per phase continuous; 300m run from powerhouse to building. Cable sizing: (a) 25 mm² 4-core SWA at 1.5 mV/A/m three-phase → 300 × 22 × 1.5 / 1000 = 9.9 V = 2.5% three-phase line-line (within 5% but tight). (b) 35 mm² SWA at 1.1 mV/A/m → drop = 7.3 V = 1.8% (comfortable). (c) 50 mm² SWA at 0.78 mV/A/m → drop = 5.1 V = 1.3% (premium). Designer chooses based on margin desired vs cost. SWA armour as CPC per Reg 543 (35mm² armour ~140mm² steel — well above Table 54.7 minimum). Civils: trenching 600mm deep with sand bedding + marker tape + backfill. Cert evidence bundle: cable type + cross-section + length + Appendix 4 voltage drop calc + Reg 543 CPC arrangement."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Highland 20 kW Pelton micro-hydro on private estate stream"
            situation="Highland private estate (Scotland). Mountain stream with 75m head + 60 L/s design flow. Customer wants 20 kW Pelton micro-hydro for estate electricity + surplus export. Estate house 400m from proposed turbine location. UK 2025-26 typical install pattern."
            whatToDo="Major rural project. Multi-trade: (1) MCS company (MIS 3008) coordinates + customer relationship + grant claim (where applicable). (2) SEPA abstraction licence (Scottish Environment Protection Agency under Controlled Activities Regulations): 6-12 month application process; HOF 30-40% natural flow typically; eel screening per UK retained Eel Regs 2009; fish passage (salmon-bearing waters); ecological consultant ~£8k. (3) Civils contractor: intake structure (concrete + 12mm bar screen); 200m penstock pipework (typical 250-300 mm diameter for 60 L/s at 75m head); powerhouse / turbine house (small concrete building); tailrace return. (4) Turbine specialist: Gilkes Energy Pelton turbine + control system + grid-tie inverter (e.g. Power-One / Fronius / specialist hydro inverter); commissioning. (5) BS 7671 electrical installer: dedicated three-phase circuit from powerhouse inverter; 35 mm² 4-core SWA in buried trench (400m run); voltage drop calc per Reg 525.202: 400 × 29 × 1.1 / 1000 = 12.8 V = 3.2% (well within 5%); AC isolator at inverter; dump load resistor bank 20 kW + mechanical penstock valve; SWA armour as CPC per Reg 543; through-wall penetration into house + AC supply panel termination; Section 551 architecture per Reg 551.7.2.1 supply-side + Reg 551.7.5 anti-islanding + Reg 551.4.2 RCD. (6) DNO (SSEN typical for Highland): EREC G99 formal application + DNO-witnessed Reg 551.7.5 anti-islanding test at commissioning; connection upgrade likely (existing rural supply may need uprating for 20 kW export). Total project: ~£100-150k (civils dominant); electrical scope ~£10-15k. Project timeline: 12-24 months (SEPA licence dominant). Annual energy yield: ~80,000-100,000 kWh (capacity factor ~45-55%). Cert evidence bundle: MCS MIS 3008 + BS 7671 EIC + SEPA licence + EREC G99 + DNO-witnessed test + ecological reports + Section 551 compliance + civils certifications."
            whyItMatters="Highland Pelton micro-hydro is the canonical UK 2025-26 micro-hydro install at private estates / agricultural / community sites. Substantial multi-trade project + long timeline; electrical scope is a small but critical layer. Cert evidence bundle is rich + integrates Environment Agency / SEPA + ecological + DNO + MCS + BS 7671 + civils. Project economics: annual energy yield × export tariff (SEG covered M10) + electricity-displacement savings → 8-12 year payback typical; 20-30 year operational life."
          />

          <Scenario
            title="Hydrogen-ready boiler retrofit — customer-facing reality check"
            situation={`Customer in West Midlands requesting new gas boiler install. Sales pitch from supplier mentions "hydrogen-ready" + future-proofing. Customer wants honest advice from electrician about hydrogen rollout timeline + what hydrogen-ready actually means.`}
            whatToDo={`Honest customer conversation: (1) UK 2025-26 hydrogen-for-heating reality — predominantly policy direction + limited trials, not widespread deployment. HyDeploy 20% blend trials at Keele + Winlaton; hydrogen heating village trials (Whitby, Redcar) cancelled / scaled back; UK strategic decision deferred. (2) "Hydrogen-ready" capability: manufacturer-tested for 20% blend (some 100% hydrogen with firmware / hardware update). Current operational reality: customer's actual gas supply is natural gas (UK gas grid is natural gas + small biomethane fraction); hydrogen-ready capability is DORMANT — adds no operational difference vs non-hydrogen-ready equivalent. (3) Future-proofing value: if UK hydrogen-for-heating policy proceeds + actual hydrogen supply rolls out, customer's boiler is ready. If not (or deferred): customer's boiler equivalent to non-hydrogen-ready. (4) Customer-facing recommendation: hydrogen-ready capability typically free or low-cost premium on modern boilers — worth having as future-proofing. BUT don't pay substantial premium for hydrogen-ready unless customer has specific belief in UK hydrogen rollout timeline. (5) Alternative paths to consider: heat pump (mainstream UK 2025-26 decarbonisation path; £7,500 BUS grant); PV + heat pump + immersion diverter; gas + smart heating optimisation. (6) The electrician's role: honest expert advice; respect customer's decision. Cert evidence bundle records hydrogen-ready capability + customer conversation + chosen technology.`}
            whyItMatters="UK 2025-26 hydrogen narrative is heavily marketed to consumers but operational reality remains uncertain. The honest installer respects customer expectations + provides realistic positioning vs sales-driven future-proofing claims. Builds long-term customer trust + reputation. Demonstrates the responsible electrician\'s role in customer decision-making across emerging LCT."
          />

          <CommonMistake
            title="Underestimating Environment Agency licence timeline"
            whatHappens="Customer + installer assume micro-hydro can be installed in 3-6 months from order. Reality: Environment Agency abstraction licence 3-12 months + DNO G99 12-26 weeks + civils 2-6 months. Total typical 12-24 months. Customer expects energisation in 6 months; actual 18 months. Customer frustrated; project momentum lost; some projects abandoned at licence-stage cost."
            doInstead="Environment Agency licence + DNO G99 + ecological assessments from project planning day 1. Submit licence application as early as possible after site survey. Run licence in parallel with DNO application + civils planning + procurement. Customer expectation managed: realistic 12-24 month project timeline from initial commitment to energisation. Cert evidence bundle tracks licence + DNO + civils dates."
          />

          <CommonMistake
            title="Overselling hydrogen-ready capability"
            whatHappens="Sales pitch emphasises hydrogen-ready as imminent + transformative. Customer pays substantial premium for hydrogen-ready boiler (£500-2000 extra) expecting hydrogen supply within 5 years. UK 2025-26 reality: hydrogen-for-heating decision deferred; customer\'s actual gas supply remains natural gas indefinitely. Customer feels mis-sold; reputation damage."
            doInstead="Honest customer-facing position: UK 2025-26 hydrogen-for-heating remains uncertain; strategic decision deferred; customer\'s actual gas supply will be natural gas for foreseeable future. Hydrogen-ready capability is future-proofing — pay reasonable premium (typically free or low-cost on modern boilers) if customer values; don\'t pay substantial premium unless customer has specific belief in UK rollout timeline. Cert evidence bundle records customer conversation + chosen technology + manufacturer hydrogen-ready spec."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Micro-hydro = Section 551 generating set (Reg 551.1.1(b) turbines). MCS MIS 3008 ≤50 kW installer standard.',
              'Four turbine types: Pelton (high head, low flow), Francis (medium), Crossflow (low head + variable), Archimedes screw (very low head + fish-friendly).',
              'Capacity factor 30-60% UK typical — much higher than PV (10-12%) or wind (20-25%). Hydro produces more kWh per installed kW.',
              'Environment Agency / NRW / SEPA abstraction licence mandatory + dominant project-timeline driver (3-12 months). Plus Eel Regs 2009 (12mm bar intake screen) + Habitats Regs + Salmon Act fish passage.',
              'Section 551 framework: Reg 551.7.5 anti-islanding + dump load (resistor bank) + Reg 551.7.2.1 supply-side + Reg 551.4.2 RCD multi-source. Mechanical penstock valve closure as additional safety on larger / higher-safety installs.',
              'Long cable run powerhouse to building (50-500m typical rural) — Reg 525.202 voltage drop ≤5% drives cable sizing; 35-70 mm² SWA typical 15-30 kW installs.',
              'EREC G99 formal application typical; DNO-witnessed anti-islanding test at larger commercial scale.',
              'Project timeline 12-24 months total (Environment Agency licence dominant). Project cost £20-150k typical for 5-30 kW micro-hydro.',
              'UK 2025-26 hydrogen direction: HyDeploy 20% blend trials; hydrogen heating village trials cancelled; UK strategic decision deferred. Hydrogen-ready boilers + heat pumps marketed; actual hydrogen supply unavailable.',
              'Commercial fuel cells (Bloom Energy, FuelCell Energy SOFCs; PEM variants) emerging beyond micro-CHP residential. 5-200 kWe; data centres + hospitals + hydrogen-economy hubs. Section 551 applies (Reg 551.1.1(f)).',
              'Installer position on emerging LCT: aware + track regulatory direction + honest customer expectations vs marketing-driven claims.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Commercial CHP + biofuel / biogas / hydrogen
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                9.8 Commissioning, Part 6 + handover
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
