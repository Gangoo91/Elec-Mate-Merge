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
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm9s4-biomass-types',
    question: 'What are the main UK 2025-26 biomass heating technologies?',
    options: [
      'Only wood logs',
      'Wood pellet boilers (auger-fed automatic; dominant for domestic + light commercial), log boilers (manual fuel load; gasification chamber; larger thermal store typical), wood chip boilers (commercial / agricultural; auger-fed; larger fuel store). Plus biomass-CHP variants (covered §9.5-§9.6). Each is heat-only on the BS 7671 side EXCEPT biomass-CHP which adds electrical generation (Section 551)',
      'Random',
      'No biomass',
    ],
    correctIndex: 1,
    explanation:
      'UK 2025-26 biomass heating: (1) Wood pellet boilers — automatic auger feed from pellet hopper (typically 250-500 kg) or larger silo. Dominant for domestic + light-commercial (5-50 kW thermal). Brands: ÖkoFEN, KWB, Windhager, Hargassner, Solarfocus, Grant Spira. (2) Log boilers — manual fuel load (logs); gasification chamber design for high efficiency; typically paired with larger thermal store (1000-3000 L) for time-shifting heat. Domestic + farm scale. Brands: HDG, Fröling, ETA, Atmos. (3) Wood chip boilers — auger-fed from chip silo; commercial / agricultural / district heating scale (50 kW - 5+ MW). Brands: Talbott, Hargassner, KWB. (4) Biomass-CHP variants — heat + electrical generation combined; engine-driven generator OR organic Rankine cycle (ORC); Section 551 applies (covered §9.5 micro-CHP + §9.6 commercial). For pure-heat biomass: NOT in Reg 551.1.1 (no electrical generation, no Section 551 anti-islanding). BS 7671 framework: Reg 422.4 combustible material proximity, Reg 314 dedicated circuits, Reg 415.1 RCD, Reg 522.2.1 cable near hot flue / pipework. MCS MIS 3004 installer standard.',
  },
  {
    id: 'm9s4-electrical-scope',
    question: 'What is the typical BS 7671 electrical scope on a wood pellet boiler install?',
    options: [
      'No electrical',
      'Dedicated supply circuit (typically 16 A single-phase, 1.5-2 kW total electrical demand) for: auger motor (pellet feed), combustion fan, flue extract fan, ignition glow plug, controls + display, optional secondary heat pump / system interface. Reg 314 division, Reg 415.1 30 mA RCD, Reg 522.2.1 cable thermal protection near hot flue + DHW pipework, Section 554 if DHW cylinder backup immersion. MCS MIS 3004 framework',
      'Just plug in',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'Wood pellet boiler electrical scope: (1) Dedicated 16 A single-phase circuit from CU; Type A RCBO C-curve (auger inrush + ignition); 2.5 mm² T+E typical. Total electrical demand 1-2 kW (auger 200-500 W when feeding, combustion fan 80-150 W, flue extract fan 60-120 W, ignition glow plug 300-500 W during start cycle ~3-5 min, controls 30-50 W, circulation pump 60-100 W). (2) Components powered by boiler controls (manufacturer-supplied harness — installer connects via dedicated supply): auger motor (pellet conveyor from hopper), combustion blower (primary + secondary air), flue extract fan (induced draught to maintain combustion + safe flue emission), ignition glow plug (initial pellet ignition), control board + display, circulation pump (primary heat circuit). (3) BS 7671 framework: Reg 314 dedicated circuit, Reg 411.4 ADS, Reg 415.1 30 mA RCD additional protection, Reg 522.2.1 cable thermal protection (cables near flue + primary pipework — flue can exceed 250 °C). (4) Section 554 if DHW cylinder backup immersion retained (Reg 554.x framework + Reg 554.2.1 over-temp cut-out). (5) MCS MIS 3004 installer competence + HETAS competence for combustion side (separate trade). Cert evidence bundle: dedicated circuit EIC + cable thermal verification + functional commissioning per manufacturer + integration with hydraulic system + HETAS commissioning record.',
  },
  {
    id: 'm9s4-reg-422-4',
    question: 'Reg 422.4 + biomass — what does it require?',
    options: [
      'Nothing',
      'Reg 422.4 covers combustible constructional materials (CA2 conditions). For biomass install: the boiler itself is fixed equipment with concentrated heat (Reg 421.11 + 421.1.4 apply), AND the building structure contains combustible material (timber framing, plasterboard, insulation). Reg 422.4 requires additional fire protection where CA2 conditions exist — typically achieved via manufacturer clearance dimensions + heat-resistant boiler-room construction + flue thermal protection',
      'Random',
      'No regulations',
    ],
    correctIndex: 1,
    explanation:
      'Reg 422.4 applies the requirements of Section 421 (Protection against thermal effects) in locations where CA2 conditions exist (buildings mainly constructed of combustible materials). Biomass installs are inherently high-thermal-output fixed equipment — boiler body operates at 200+ °C, flue exceeds 250 °C. Reg 422.4 framework: (1) Boiler clearance from combustible building elements per manufacturer install manual (typically 200-1000 mm depending on boiler type + face); (2) Boiler-room construction with fire-resistant boundary if combustible adjacent structures (often Building Regulations Part B drives this rather than BS 7671 directly); (3) Flue thermal protection — insulated chimney lining, thermal sleeves through combustible structures, separation distances per manufacturer + HETAS guidance; (4) Cable routing per Reg 522.2.1 keeps wiring distance from hot flue + pipework. HETAS competence covers the combustion + flue side; BS 7671 electrician handles the electrical supply + controls; structural / Building Regs compliance handled by MCS company + builder. Cert evidence bundle: Reg 422.4 + Reg 421.x compliance verified at install (clearance dimensions photographed) + HETAS commissioning record + Building Regs Part B compliance (where applicable).',
  },
  {
    id: 'm9s4-defra-smoke-control',
    question: 'DEFRA smoke control areas — biomass install impact?',
    options: [
      'No impact',
      'Smoke Control Areas (SCAs) in England + Wales (Scotland separate) — designated under Clean Air Act + Environment Act 2021. In SCAs: only DEFRA-exempt appliances can burn solid fuel including biomass. UK 2025-26: many urban + town areas are SCAs. Boiler model must be DEFRA-exempt for the SCA install to be legal. Verify at quote stage; document in cert evidence bundle. Not BS 7671 — Environment Act / DEFRA framework — but install-relevant',
      'Random',
      'Only Scotland',
    ],
    correctIndex: 1,
    explanation:
      'Smoke Control Areas (SCAs) framework: designated under the Clean Air Act 1993 (England + Wales) + Environment Act 2021 + Scottish + NI equivalents. Many UK urban + town local-authority areas are SCAs — within these areas, burning solid fuel (including biomass pellets, logs, chips) is prohibited UNLESS the appliance is on DEFRA\'s list of exempt appliances. DEFRA exemption process: manufacturer tests the appliance for low emissions (particulate matter, NOx); approved appliances listed on DEFRA gov.uk site. UK 2025-26 reality: significant proportion of biomass boilers on the market are DEFRA-exempt; verify the specific model + customer\'s local authority area at quote stage. Customer not in SCA: any biomass boiler can install (subject to other regulations). Customer in SCA: only DEFRA-exempt model allowed. Cert evidence bundle: customer\'s SCA status (verified via local authority website) + boiler model DEFRA exemption status + any DEFRA exemption documentation. Not BS 7671 — but install-deal-breaker if missed. Heating engineer / MCS company typically handles this aspect; electrical installer should verify it\'s been addressed at quote stage.',
  },
];

const quizQuestions = [
  {
    question: 'A 25 kW wood pellet boiler install for a rural cottage — what scope?',
    options: [
      'Just plumbing',
      'Multi-trade: MCS company (MIS 3004) + HETAS-qualified biomass installer (combustion / flue / chimney) + plumbing / heating engineer (hydraulic loop) + electrical installer (BS 7671 scope). Electrical: 16 A dedicated single-phase circuit (1.5-2 kW total) + Reg 422.4 + Reg 522.2.1 cable thermal + Section 554 if DHW backup. Plus boiler controls integration + pellet store space + DEFRA-exempt verification if in SCA',
      'Customer DIY',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      '25 kW wood pellet boiler typical UK rural cottage install. Multi-trade delivery: (1) MCS-certified company (MIS 3004) coordinates + holds customer relationship; (2) HETAS-qualified biomass installer handles combustion side (flue install per BS EN 15287, chimney lining, ignition system, ash management); (3) Plumber / heating engineer fits hydraulic loop, radiators, primary pipework, thermal store / buffer cylinder (typical 500-1000 L for log boilers; 200-500 L for pellet); (4) BS 7671 electrical installer does the electrical scope. Electrical scope: dedicated 16 A circuit + 32 A Type A RCBO C-curve (for auger inrush) + 2.5 mm² T+E; cable route per Reg 522.2.1 (away from flue + hot primary pipework, flue can exceed 250 °C); Reg 422.4 verified at install (clearance dimensions, fire-resistant boiler-room boundary if applicable per Building Regs Part B); Section 554 if cylinder includes immersion backup. Boiler ignition + auger + fan + control wiring per manufacturer harness. DEFRA-exempt verification if customer in SCA. Cert evidence bundle: MCS MIS 3004 handover + BS 7671 EIC + HETAS commissioning record + Building Regs compliance + DEFRA exempt status (if applicable). Total project ~£12-20k typical; electrical scope £400-700.',
  },
  {
    question: 'Why does cable need protection per Reg 522.2.1 on a biomass install?',
    options: [
      'No protection needed',
      'Biomass boiler flue exceeds 250 °C in normal operation; flue path passes through building structure / loft / chimney. Cable runs near flue, near hot primary pipework, near boiler body, in boiler-room ambient — all elevated temperature. Reg 522.2.1 methods (a) shielding, (b) distance, (c) higher-rated cable per Appendix 4 Ca correction, (d) local reinforcement. Most common: distance + thermally rated cable',
      'Random',
      'No flue heat',
    ],
    correctAnswer: 1,
    explanation:
      'Biomass install has the highest thermal-protection demands of any M9 technology. (1) Flue: combustion gases exiting boiler at 200-300 °C; flue lining surface 60-120 °C in normal operation depending on insulation; passes through building structure / loft / chimney often near electrical cabling. (2) Boiler body: combustion chamber 600+ °C inside; exterior typically 50-80 °C; controls panel ambient elevated. (3) Primary flow pipework: 70-90 °C (higher than heat pump systems). (4) Boiler-room ambient: typically 25-35 °C in service. Reg 522.2.1 protection methods per zone: (a) shielding — heat-resistant sleeve for cable forced near flue; (b) distance — cable route away from hot zones, most common; (c) higher-rated cable with Appendix 4 Ca correction factor per Table 4B1; (d) local reinforcement / substitution. Cert evidence bundle: cable route survey per zone + heat source proximity + chosen protection method. HETAS commissioning verifies flue safety; BS 7671 electrician verifies cable safety.',
  },
  {
    question: 'Log boiler vs pellet boiler — electrical scope differences?',
    options: [
      'Same',
      'Log boiler: manual fuel load (no auger motor — saves 200-500 W); typically larger thermal store (1000-3000 L); same fans + ignition + controls; same dedicated circuit framework. Pellet boiler: auger motor (200-500 W when feeding); smaller thermal buffer (200-500 L typical); same fans + ignition + controls. Pellet boilers have higher continuous electrical demand due to auger; log boilers have less continuous + more peak during ignition',
      'Random',
      'No difference',
    ],
    correctAnswer: 1,
    explanation:
      'Log vs pellet boiler electrical comparison: (1) Pellet boiler — automatic auger feed from hopper / silo (200-500 W motor when feeding pellets, 10-30% duty cycle in normal operation); pellet ignition glow plug (300-500 W during ~3-5 min start cycle); combustion fan + flue fan continuous; controls. Total typical: 0.5-1 kW continuous when running, 1.5-2 kW peak during ignition. (2) Log boiler — manual fuel load (no auger motor); gasification combustion (very high temperature secondary combustion in dedicated chamber); larger primary fan + secondary air control; ignition (manual lighting or electrical ignition for some models). Total typical: 0.5-1 kW continuous; peak 1-1.5 kW. (3) Thermal store sizing: log boilers typically 1000-3000 L (because manual fuel load — burn long when you light, store heat for hours); pellet boilers 200-500 L buffer (modulating output matches demand). (4) Same dedicated 16 A circuit framework + Reg 314 + Reg 415.1 + Reg 522.2.1. Electrical scope effectively identical with minor sizing differences. Cert evidence bundle records boiler type + thermal store size + total electrical demand.',
  },
  {
    question: 'HETAS competence + BS 7671 electrician — how do the scopes interact?',
    options: [
      'Same person',
      'HETAS = combustion + flue / chimney specialist (not BS 7671); responsible for boiler combustion install, flue per BS EN 15287, chimney lining, ash management, safe ignition system, manufacturer commissioning of combustion side. BS 7671 electrician: dedicated electrical supply circuit + Reg 314 + protective devices + cable per Reg 522.2.1 + Section 554 if immersion. Two separate competencies + scopes; both required for safe biomass install',
      'Random',
      'Customer responsibility',
    ],
    correctAnswer: 1,
    explanation:
      'HETAS (Heating Equipment Testing and Approvals Scheme) is the UK competence + certification body for solid fuel + biomass heating installers. HETAS-registered installer competence: (1) Biomass / solid fuel boiler installation per BS EN 303-5 product standard; (2) Flue / chimney design + install per BS EN 15287 + BS EN 1856 (metal flue) / BS EN 1857 (concrete liner) / Building Regs Part J (England + Wales) / equivalent; (3) Chimney sweeping + maintenance; (4) Safe ignition + combustion commissioning; (5) Ash management + flue gas safety; (6) DEFRA exempt appliance install per SCA requirements. HETAS competence is the combustion + thermal install side — NOT electrical. BS 7671 electrician scope (this course): dedicated electrical supply circuit per Reg 314 + Reg 411.4 ADS + Reg 415.1 30 mA RCD + Reg 522.2.1 cable thermal protection near flue + Section 554 if cylinder immersion backup retained. Two distinct competencies, both required. UK 2025-26 typical: MCS-certified company (MIS 3004) coordinates the multi-trade install + holds customer relationship; HETAS person does combustion / flue; BS 7671 electrician does electrical. Cert evidence bundle: HETAS commissioning record (separate from EIC) + BS 7671 EIC + MCS handover pack + Building Regs Part J compliance (HETAS competent person can self-certify Part J).',
  },
  {
    question: 'Customer in a Smoke Control Area wants a biomass boiler — what verification?',
    options: [
      'Always install',
      'Verify: (1) customer\'s SCA status via local authority website (England + Wales SCAs designated under Clean Air Act + Environment Act 2021; Scotland + NI separate); (2) proposed boiler model on DEFRA exempt appliance list (gov.uk publishes searchable list); (3) Customer informed of restricted fuel types (DEFRA-approved pellets / logs in SCA); (4) Cert evidence bundle includes SCA verification + boiler exempt status + DEFRA documentation. If model is NOT DEFRA-exempt + customer IS in SCA: install illegal — refuse / re-spec to exempt model',
      'No verification',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Smoke Control Area (SCA) verification for biomass install: (1) Customer\'s SCA status — check local authority website (or DEFRA SCA map). Many urban + town areas in England + Wales are SCAs. Scotland: separate framework under Environment (Scotland) Act + Air Quality (Scotland) Regulations. NI: separate. (2) Proposed boiler model DEFRA-exempt status — DEFRA publishes searchable list at gov.uk/smoke-control-area-rules. Manufacturer-tested for low emissions (particulate matter, NOx, smoke); approved appliances exempt from SCA prohibition. (3) DEFRA-approved fuels — within SCA + on exempt appliance: only DEFRA-approved fuels (specific pellet brands / log moisture content) may be burned. (4) Customer informed at quote stage about ongoing fuel restrictions. (5) Cert evidence bundle includes: SCA verification document + boiler DEFRA exempt status documentation + customer fuel-restriction acknowledgement. Consequence of mis-install: customer can be fined up to £1,000 for unauthorised emissions; installer reputation risk. UK 2025-26 reality: most reputable biomass boilers on the market are DEFRA-exempt; verify the specific model. Not BS 7671 — but install-deal-breaker. MCS company / HETAS installer typically handles this; BS 7671 electrician verifies at quote stage that the issue has been addressed.',
  },
  {
    question: 'Biomass-CHP variant — what changes vs heat-only biomass?',
    options: [
      'Same',
      'Biomass-CHP adds electrical generation: typically internal combustion engine driven by biogas / wood gas / direct biomass combustion (steam cycle) OR organic Rankine cycle (ORC). Section 551 applies (Reg 551.1.1(a) combustion engines OR (b) turbines depending on architecture). Anti-islanding per Reg 551.7.5. EREC G98 / G99 per output. Biomass-CHP at commercial scale covered in §9.6',
      'No difference',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Biomass-CHP (Combined Heat and Power) variant adds electrical generation to the heat output. Architecture variants: (1) Internal combustion engine driven by biogas (from anaerobic digestion of organic waste) — most common UK 2025-26 commercial biomass-CHP; Reg 551.1.1(a) combustion engine. (2) Wood gasification + IC engine — biomass thermally decomposed to producer gas (CO + H2 + CH4 + N2 + CO2), then gas drives a modified IC engine; emerging UK 2025-26. Reg 551.1.1(a). (3) Direct biomass combustion + steam cycle — boiler + steam turbine + generator; commercial / utility scale. Reg 551.1.1(b) turbine. (4) Organic Rankine Cycle (ORC) — low-temperature heat drives a closed-loop organic fluid through a turbine; suits low-grade biomass heat sources. Reg 551.1.1(b) turbine. For all biomass-CHP: Section 551 applies — Reg 551.7.5 anti-islanding mandatory, Reg 551.7.2.1 supply-side connection, Reg 551.4.2 RCD multi-source effectiveness. EREC G98 for ≤16 A per phase; G99 for larger (most commercial biomass-CHP). Section §9.6 covers commercial CHP (including biomass-CHP variants) in detail. Cert evidence bundle: Section 551 compliance + EREC reference + MCS MIS 3007 (≤50 kW) or commercial CHP framework + HETAS + heat-network integration.',
  },
];

const faqs = [
  {
    question: 'Why does biomass need HETAS + BS 7671 + MCS competences separately?',
    answer:
      'Different scopes: (1) HETAS — combustion safety, flue / chimney install per BS EN 15287 + Building Regs Part J, ash management. Distinct technical discipline. (2) BS 7671 — electrical install side (dedicated circuit, RCD, cable thermal protection). (3) MCS MIS 3004 — overall installer competence + product approval + customer handover. Each addresses a different safety + quality concern. UK 2025-26: multi-trade delivery is the norm; MCS company coordinates.',
  },
  {
    question: 'What\'s the pellet storage requirement?',
    answer:
      'Pellet hopper (close to boiler, typical 250-500 kg) for small installs; pellet silo (separate room or external, 3-15 tonnes) for larger continuous operation. Hopper / silo room must be dry (pellets degrade with moisture), accessible for delivery (typically blower truck delivery), structurally adequate for fuel weight. Not electrical scope but install-planning relevant.',
  },
  {
    question: 'BS EN 303-5 — what does it cover?',
    answer:
      'BS EN 303-5 = heating boilers for solid fuels (manual + automatic stoking), nominal output up to 500 kW. Product standard for boiler design, testing, efficiency, emissions. Manufacturer DoC declares conformity. MCS MIS 3004 requires BS EN 303-5 compliance for approved products. The 5-star class (highest efficiency + lowest emissions) typically required for grant eligibility (where applicable).',
  },
  {
    question: 'Is there a UK government grant for biomass installs in 2025-26?',
    answer:
      'Boiler Upgrade Scheme historically covered biomass with £5,000 grant for some installs; UK 2025-26 BUS scope has been heat-pump-focused with biomass eligibility narrowed (rural property without mains gas typically only). Verify current scheme rules at gov.uk Boiler Upgrade Scheme. RHI (Renewable Heat Incentive) closed for new applicants 2022. Biomass economic case weakened vs heat pump in most contexts; rural / off-gas-grid + properties with existing biomass infrastructure still viable.',
  },
  {
    question: 'EICR cycle for biomass install?',
    answer:
      'BS 7671 EICR: 10-year typical domestic owner-occupied; 5-year landlord-rented (Private Rented Sector Regs 2020); 5-year commercial. Biomass-specific items at EICR: dedicated circuit verification + Reg 522.2.1 cable thermal still effective + Section 554 if immersion retained. HETAS-recommended annual servicing of combustion side (separate scope) — flue clean, ash management, combustion adjustment. Cert evidence bundle records both.',
  },
];

export default function RenewableEnergyModule9Section4() {
  const navigate = useNavigate();

  useSEO({
    title: 'Biomass interfaces | Renewable Energy 9.4 | Elec-Mate',
    description:
      'Biomass heating from the BS 7671 electrical install perspective. Wood pellet, log, wood chip boilers. Reg 422.4 combustible material + Reg 522.2.1 cable thermal near flue + Reg 314 dedicated circuit + Section 554 immersion. MCS MIS 3004 + HETAS + DEFRA SCA + BS EN 303-5.',
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
            eyebrow="Module 9 · Section 4 · Reg 422.4 + Reg 522.2.1 + Reg 314 + MCS MIS 3004 + HETAS + DEFRA"
            title="Biomass interfaces"
            description="Biomass heating from the BS 7671 electrical install perspective. Wood pellet + log + wood chip boilers. Auger motors + combustion fans + ignition + flue extract + controls. Reg 422.4 combustible material proximity + Reg 522.2.1 cable thermal near flue. MCS MIS 3004 installer + HETAS combustion competence + DEFRA Smoke Control Area + BS EN 303-5 product standard."
            tone="yellow"
          />

          <TLDR
            points={[
              'Biomass heating (wood pellet, log, wood chip) is heat-only on the BS 7671 side — NOT in Reg 551.1.1 (no electrical generation). Biomass-CHP variants add Section 551 (covered §9.5 + §9.6).',
              'Electrical scope per boiler: dedicated 16 A single-phase circuit; 1-2 kW total electrical demand (auger motor + combustion fan + flue extract + ignition + controls + circulation pump).',
              'BS 7671 anchors: Reg 314 dedicated circuit, Reg 411.4 ADS, Reg 415.1 30 mA RCD, Reg 422.4 combustible material proximity, Reg 522.2.1 cable thermal protection near flue + pipework, Section 554 if cylinder immersion backup retained.',
              'Multi-trade install: MCS company (MIS 3004) + HETAS-qualified biomass installer (combustion + flue) + plumbing/heating engineer (hydraulic loop) + BS 7671 electrical installer.',
              'DEFRA Smoke Control Area verification mandatory in SCA areas — only DEFRA-exempt appliance + approved fuels permitted. Verify customer SCA status + boiler exempt status at quote stage.',
              'BS EN 303-5 = solid fuel boiler product standard; 5-star efficiency class typical for grant eligibility (where applicable). MCS MIS 3004 references.',
              'Flue exceeds 250 °C in normal operation — Reg 522.2.1 cable thermal protection essential. Boiler body + primary pipework all elevated temperature.',
              'UK 2025-26 grant landscape: Boiler Upgrade Scheme heat-pump-focused; limited biomass eligibility (rural off-gas-grid typically). Verify current scheme rules.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish wood pellet vs log vs wood chip biomass boilers + their electrical scope.',
              'Apply Reg 314 dedicated circuit + Reg 411.4 ADS + Reg 415.1 30 mA RCD to biomass install.',
              'Apply Reg 422.4 combustible material proximity + Reg 522.2.1 cable thermal protection near flue.',
              'Coordinate with HETAS biomass / flue competence + MCS MIS 3004 installer framework.',
              'Verify customer DEFRA Smoke Control Area status + boiler exempt status.',
              'Apply BS EN 303-5 product standard + manufacturer commissioning procedure.',
              'Integrate existing immersion as DHW backup per Section 554 + Reg 554.2.1 thermal cut-out.',
              'Distinguish biomass-CHP (Section 551 applies) from heat-only biomass (BS 7671 general framework only).',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Biomass install is mostly mechanical + combustion. The electrical scope is small + bounded — a dedicated 16 A circuit + Reg 522.2.1 thermal protection. The hot bit is the flue, not the cable.
          </Pullquote>

          <ContentEyebrow>Biomass technologies + electrical scope</ContentEyebrow>

          <ConceptBlock
            title="UK 2025-26 biomass technologies"
            plainEnglish="UK 2025-26 biomass heating: wood pellet boilers (automatic auger feed, dominant for domestic + light-commercial), log boilers (manual fuel + thermal store), wood chip boilers (commercial / agricultural). Each is heat-only on the BS 7671 side. Biomass-CHP variants (engine-driven generator OR steam / ORC) add electrical generation under Section 551 — covered in §9.5-§9.6."
            onSite="UK domestic biomass market shifted post-2014 vs heat pump expansion. Rural off-gas-grid properties + farms + larger heritage buildings continue to install. Pellet boilers dominate domestic; log boilers preferred by customers with woodland fuel supply; chip boilers commercial / district heating."
          >
            <p>Biomass technology comparison:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Wood pellet boilers</strong> —
                automatic auger feed from hopper (250-500 kg) or silo (3-15 tonnes).
                Domestic + light-commercial scale (5-50 kW thermal). UK brands: ÖkoFEN,
                KWB, Windhager, Hargassner, Solarfocus, Grant Spira
              </li>
              <li>
                <strong className="text-white">Log boilers</strong> — manual
                fuel load; high-efficiency gasification combustion; large thermal
                store (1000-3000 L) for time-shifting. Domestic + farm scale. Brands:
                HDG, Fröling, ETA, Atmos
              </li>
              <li>
                <strong className="text-white">Wood chip boilers</strong> —
                auger feed from chip silo. Commercial / agricultural / district
                heating (50 kW - 5+ MW). Brands: Talbott, Hargassner commercial, KWB
                commercial
              </li>
              <li>
                <strong className="text-white">Pellet quality</strong> —
                EN Plus A1 (premium) or A2 grade; affects efficiency + emissions
              </li>
              <li>
                <strong className="text-white">Log moisture
                  content</strong> — &lt;20% for efficient combustion (seasoned wood).
                Above 25% reduces efficiency + increases emissions
              </li>
              <li>
                <strong className="text-white">Thermal store</strong>
                — buffer cylinder between boiler + heating system; smooths boiler
                output vs demand; essential for log boilers (1000-3000 L)
              </li>
              <li>
                <strong className="text-white">Pure heat-only</strong>
                — no electrical generation, no Section 551, no anti-islanding. Just BS
                7671 general framework for the electrical install scope
              </li>
              <li>
                <strong className="text-white">Biomass-CHP variants</strong>
                — engine-driven generator OR steam / ORC turbine. Adds Section 551
                framework. Covered §9.5-§9.6
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Wood pellet boiler electrical scope"
            plainEnglish="Wood pellet boiler typical UK 2025-26 install: 5-50 kW thermal output. Electrical demand 1-2 kW continuous + peak. Dedicated 16 A single-phase circuit + Type A RCBO C-curve (for motor starts). Components powered by boiler controls."
            onSite="Boiler arrives factory-wired with controller + components; installer connects dedicated supply to the boiler\'s electrical interface terminal. Manufacturer-specific commissioning procedure. HETAS-qualified commissioner handles combustion side; BS 7671 electrician handles the electrical scope."
          >
            <p>Wood pellet boiler electrical components:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Auger motor</strong>
                — conveys pellets from hopper / silo to combustion chamber. Typically
                200-500 W single-phase; 10-30% duty cycle in normal operation
              </li>
              <li>
                <strong className="text-white">Combustion fan</strong>
                — primary + secondary air for combustion. 80-150 W; continuous when
                running
              </li>
              <li>
                <strong className="text-white">Flue extract fan</strong>
                — induced draught to maintain combustion + safe flue gas emission.
                60-120 W; continuous when running
              </li>
              <li>
                <strong className="text-white">Ignition glow plug</strong>
                — initial pellet ignition. 300-500 W during 3-5 min start cycle; off
                in normal operation (combustion sustains itself)
              </li>
              <li>
                <strong className="text-white">Controls + display</strong>
                — boiler controller + interface. 30-50 W continuous
              </li>
              <li>
                <strong className="text-white">Circulation pump</strong>
                — primary heat circuit (boiler → thermal store / heating system).
                60-100 W typical
              </li>
              <li>
                <strong className="text-white">Ash auger (some
                  models)</strong> — removes ash to disposal pan. Brief motor on duty
                cycle. 50-100 W when running
              </li>
              <li>
                <strong className="text-white">Total typical</strong>
                — 0.5-1 kW continuous when running; 1.5-2 kW peak during ignition.
                Dedicated 16 A circuit + Type A RCBO C-curve handles this comfortably
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 422.4 — Combustible constructional materials (CA2 conditions)"
            clause="The requirements of this regulation shall be applied in addition to those of Section 421 in locations where CA2 conditions exist. NOTE: CA2 conditions exist where a building is mainly constructed of combustible materials."
            meaning="Reg 422.4 applies the Section 421 thermal-protection framework with additional emphasis in buildings of combustible construction (timber framing, plasterboard, insulation — CA2 conditions). Biomass installs are inherently high-thermal-output: boiler body 50-80 °C exterior, flue path 60-120 °C surface, combustion chamber 600+ °C internal. Reg 422.4 requires: (1) Boiler clearance from combustible elements per manufacturer install manual (typically 200-1000 mm depending on boiler type + face); (2) Boiler-room construction with fire-resistant boundary if adjacent to combustible structures (Building Regs Part J also applies); (3) Flue thermal protection — insulated chimney lining, thermal sleeves through combustible structures per BS EN 15287 / BS EN 1856; (4) Cable routing per Reg 522.2.1 keeps wiring distance from flue + hot pipework. HETAS competence handles the combustion + flue + fire-safety side; BS 7671 electrician verifies the electrical install respects the clearance + cable thermal requirements. Cert evidence bundle records Reg 422.4 + Reg 421 + HETAS commissioning + Building Regs Part J compliance."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>HETAS + MCS + DEFRA — the wider framework</ContentEyebrow>

          <Pullquote>
            Biomass is a multi-competence install. HETAS for the fire, MCS for the customer, BS 7671 for the electric. Stay in your lane.
          </Pullquote>

          <ConceptBlock
            title="HETAS competence + scope boundary"
            plainEnglish="HETAS (Heating Equipment Testing and Approvals Scheme) is the UK competence + certification body for solid fuel + biomass heating installers. HETAS-registered installer handles the combustion + flue + fire-safety side. NOT electrical — that\'s BS 7671 electrician scope."
            onSite="UK 2025-26 biomass install: HETAS installer is the combustion specialist. They self-certify Building Regs Part J (combustion appliances + flue) under the Competent Person Scheme. BS 7671 electrician self-certifies Part P. Both certs feed into the MCS handover pack + customer documentation."
          >
            <p>HETAS scope:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Boiler combustion
                  install</strong> — physical install of biomass boiler per BS EN 303-5
                + manufacturer instructions
              </li>
              <li>
                <strong className="text-white">Flue / chimney</strong>
                — install per BS EN 15287 + BS EN 1856 (metal flue) / BS EN 1857
                (concrete liner). Flue height + draught requirements per Building Regs
                Part J
              </li>
              <li>
                <strong className="text-white">Combustion
                  safety</strong> — air supply (combustion air + ventilation); carbon
                monoxide alarm install per BS EN 50291; safe combustion commissioning
              </li>
              <li>
                <strong className="text-white">Ash + emissions
                  management</strong> — ash disposal, flue gas analysis at
                commissioning, emissions verification
              </li>
              <li>
                <strong className="text-white">Building Regs Part
                  J</strong> — self-certified under HETAS Competent Person Scheme;
                avoids separate Local Authority notification
              </li>
              <li>
                <strong className="text-white">DEFRA SCA
                  verification</strong> — HETAS installer typically verifies customer
                SCA status + boiler exempt status
              </li>
              <li>
                <strong className="text-white">NOT in HETAS
                  scope</strong> — electrical install (BS 7671 electrician), MCS sizing
                + customer handover (MCS company), hydraulic loop (heating engineer /
                plumber)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — HETAS commissioning record separate from BS 7671
                EIC; both integrated in MCS handover pack
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="DEFRA Smoke Control Area framework"
            plainEnglish="UK Smoke Control Areas (SCAs) restrict solid fuel burning to DEFRA-exempt appliances + approved fuels. Many urban + town areas are SCAs. Verify customer SCA status + boiler model exempt status at quote stage."
            onSite="Not BS 7671 — but install-deal-breaker if missed. Customer fines up to £1,000 for unauthorised emissions in SCA. MCS / HETAS installer typically handles this; BS 7671 electrician verifies at quote stage."
          >
            <p>SCA verification process:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">SCA designation</strong>
                — Clean Air Act 1993 + Environment Act 2021 (England + Wales);
                Environment (Scotland) Act + Air Quality Regs (Scotland); NI separate
              </li>
              <li>
                <strong className="text-white">Customer SCA
                  check</strong> — local authority website (or DEFRA SCA map at
                gov.uk). Many urban + town areas designated
              </li>
              <li>
                <strong className="text-white">DEFRA exempt
                  appliance list</strong> — searchable at gov.uk; manufacturer-tested
                for low emissions (particulate matter, NOx, smoke). Most reputable
                UK biomass boilers DEFRA-exempt
              </li>
              <li>
                <strong className="text-white">Approved fuels</strong>
                — within SCA + on exempt appliance: only DEFRA-approved fuels (specific
                pellet brands / log moisture content). List published at gov.uk
              </li>
              <li>
                <strong className="text-white">Customer
                  expectations</strong> — informed at quote stage that fuel choice is
                restricted ongoing; pellet supply chain limited to approved brands
              </li>
              <li>
                <strong className="text-white">Non-exempt + SCA =
                  illegal</strong> — must refuse install OR re-spec to DEFRA-exempt
                model. Customer fines + reputation risk
              </li>
              <li>
                <strong className="text-white">Outside SCA</strong>
                — any biomass boiler can install (subject to other regulations:
                Building Regs Part J, Environment Agency permits for larger commercial,
                MCS if grant funded)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — SCA verification + boiler DEFRA exempt status +
                customer acknowledgement
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 522.2.1 — Cable thermal protection on biomass install"
            clause="In order to avoid the effects of heat from external sources, one or more of the following methods or an equally effective method shall be used to protect a wiring system: (a) shielding; (b) placing sufficiently far from the source of heat; (c) selecting a system with due regard for the additional temperature rise which may occur; (d) local reinforcement or substitution of insulating material."
            meaning="Reg 522.2.1 is the operative regulation for cable thermal protection on biomass installs — and biomass has the highest thermal demands of any M9 technology. Heat sources: (1) Flue path through building / chimney — flue surface 60-120 °C, flue gases 200-300 °C internally; (2) Boiler body — 50-80 °C exterior; (3) Primary flow pipework — 70-90 °C; (4) Boiler-room ambient — 25-35 °C. Protection methods per zone: (a) shielding via heat-resistant sleeve for cable forced close; (b) distance — route control + supply cable away from hot zones (most common method); (c) higher-rated cable with Appendix 4 Ca correction factor (Table 4B1) for cables in higher-ambient zones; (d) local reinforcement / substitution at specific points. Cert evidence bundle: cable route survey per zone + heat source proximity + chosen protection method per Reg 522.2.1 + photographs at commissioning."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="20 kW wood pellet boiler — rural off-gas-grid retrofit"
            situation="Rural cottage off the gas grid. Replacing oil boiler with 20 kW wood pellet boiler (ÖkoFEN Pellematic Compact 20 — DEFRA-exempt, EN Plus A1 pellet compatible). Existing 300 L cylinder retained with immersion backup. NOT in Smoke Control Area (rural). Customer eligible for Boiler Upgrade Scheme (~£5,000 for biomass in off-gas-grid; verify current rules)."
            whatToDo="Multi-trade: MCS company (MIS 3004) coordinates + holds customer relationship; HETAS installer handles boiler + flue + Building Regs Part J self-certification; heating engineer fits hydraulic loop + 500 L thermal store; BS 7671 electrician scope: (1) Dedicated 16 A circuit from CU; Type A RCBO C-curve; 2.5 mm² T+E. (2) Cable route per Reg 522.2.1 — boiler room contains pellet hopper + boiler + flue + thermal store; route control cable along cool side of room away from flue + primary pipework. (3) Existing 16 A immersion circuit retained per Section 554 + Reg 554.2.1 thermal cut-out (functional test at commissioning); cylinder thermostat coordinates with new biomass primary control. (4) HETAS installer commissions combustion + verifies flue + emissions; provides HETAS commissioning record (separate from EIC); self-certifies Part J. (5) BS 7671 commissioning per Reg 643: continuity, IR, polarity, ADS / Zs, RCD trip-time, functional test of boiler controls + integration. Cert evidence bundle: BS 7671 EIC + HETAS commissioning record + MCS MIS 3004 handover + Building Regs Part J cert + DEFRA exempt status documentation (kept on file even though not in SCA — future-proofs if SCA designation expands) + customer handover (operating instructions + fuel supply + service schedule + ash management). Total project ~£15-22k; electrical scope ~£500-700; BUS grant ~£5,000 (verify current scheme)."
            whyItMatters="Rural off-gas-grid is the dominant viable use case for biomass in UK 2025-26 — heat pump may not suit (older building fabric, customer fuel preference), gas not available, oil being phased out. Biomass + BUS grant + customer fuel choice. Cert evidence bundle integrates multi-trade scopes cleanly."
          />

          <Scenario
            title="Light commercial wood chip CHP — agricultural site"
            situation="100 kW thermal + 30 kWe electrical wood chip biomass-CHP for a large farm. Heat output to farm buildings (workshop, barns, farmhouse) + electrical export to grid. Three-phase supply already at site. Customer has woodland for fuel."
            whatToDo="Biomass-CHP = Section 551 generating set applies (combustion engine driving generator). Multi-trade: MCS company + HETAS installer + commercial biomass-CHP specialist + heating engineer + BS 7671 electrician. Electrical scope larger: (1) Dedicated three-phase 63 A circuit (CHP electrical generation 30 kWe = ~45 A continuous export per phase); (2) 4-pole 63 A Type A RCBO (or larger device per manufacturer DoC); (3) Reg 551.7.5 anti-islanding via CHP control system (DNO-witnessed test typical for commercial scale); (4) Reg 551.7.2.1 supply-side connection; (5) Reg 551.4.2 multi-source RCD coordination (CHP + existing site supply); (6) EREC G99 formal application (30 kWe export well above G98 threshold; commercial-scale process); (7) BS EN 62305-3 lightning protection if chimney exposed; (8) Cable per Reg 525.202 voltage drop calc for site cable run. Plus heat-only biomass scope (auger, fans, controls, Reg 422.4). HETAS for combustion + flue + emissions. Commercial-CHP specialist commissions engine + generator. Cert evidence bundle: Section 551 compliance + Reg 551.7.5 commissioning test + EREC G99 reference + BS 7671 EIC + HETAS record + MCS handover + commercial-CHP specialist commissioning + heat-network integration. Total project ~£250-400k; electrical scope ~£15-30k; grid services revenue opportunity (covered §9.6). Detailed in §9.6 (Commercial CHP)."
            whyItMatters="Biomass-CHP at agricultural scale is a real UK 2025-26 commercial install pattern — woodland-managed farms, agricultural biogas combined operations, larger rural commercial. Section 551 framework applies + adds substantial electrical scope beyond heat-only biomass. Cert evidence bundle integrates commercial-CHP + biomass + electrical + heat-network. Cross-references §9.6 for the commercial-CHP detail."
          />

          <CommonMistake
            title="Routing cable across the flue path"
            whatHappens="Lazy cable installer routes the boiler controls cable through the loft directly over the flue chimney exit path. Flue surface in normal operation 60-100 °C, in extended high-output 120 °C. Cable insulation thermally degrades over years. Eventual sensor reading errors, controls failure, or insulation breakdown causing fault."
            doInstead="Reg 522.2.1 cable thermal protection. Route cable distance from flue + hot pipework — method (b), most common. If forced close: heat-resistant sleeve method (a); or rated cable with Appendix 4 Ca correction method (c). Visual cable route inspection at commissioning + photograph. Cert evidence bundle records route + chosen protection method."
          />

          <CommonMistake
            title="Installing in SCA without DEFRA exempt verification"
            whatHappens="Customer in town SCA wants biomass. Installer ignores DEFRA exempt check, fits non-exempt model. Months later, neighbour complaints about smoke; local authority enforcement; customer fined £500 per offence; install removed; reputation damaged."
            doInstead="DEFRA SCA verification at quote stage. (1) Check customer\'s SCA status via local authority website. (2) If in SCA: verify proposed boiler on DEFRA exempt appliance list at gov.uk. (3) Customer educated about restricted fuel ongoing. (4) Cert evidence bundle records SCA verification + boiler exempt status + customer acknowledgement. If model NOT exempt: refuse or re-spec."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Biomass heating (wood pellet, log, wood chip) is heat-only — NOT in Reg 551.1.1. Biomass-CHP variants add Section 551 (covered §9.5-§9.6).',
              'Electrical scope: dedicated 16 A single-phase circuit; 1-2 kW total demand (auger + fans + ignition + controls + circulation pump).',
              'BS 7671 framework: Reg 314, Reg 411.4, Reg 415.1, Reg 422.4 combustible material proximity, Reg 522.2.1 cable thermal protection, Section 554 immersion retention.',
              'Multi-trade: MCS MIS 3004 + HETAS (combustion + flue + Building Regs Part J) + heating engineer (hydraulic) + BS 7671 electrician.',
              'Reg 422.4 applies in CA2 conditions (combustible building structure) — additional thermal protection emphasis per Section 421 framework.',
              'Reg 522.2.1 cable thermal protection critical — flue path 60-120 °C surface, primary pipework 70-90 °C, boiler body 50-80 °C exterior.',
              'BS EN 303-5 = solid fuel boiler product standard; 5-star efficiency class typical for grant eligibility. BS EN 15287 flue install + BS EN 1856/1857 lining.',
              'DEFRA Smoke Control Area verification: customer status + boiler exempt status + approved fuels. Many urban / town areas SCAs; non-exempt + SCA = illegal install.',
              'HETAS competence handles combustion + flue + Building Regs Part J self-cert. BS 7671 electrician handles electrical. Two distinct competencies; both required.',
              'UK 2025-26 grant landscape: BUS heat-pump-focused; limited biomass eligibility (rural off-gas-grid typically). RHI closed 2022. Verify current rules.',
              'Wood pellet boilers dominate domestic (auger automatic); log boilers preferred where customer has woodland (manual fuel + thermal store); wood chip commercial / agricultural.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Solar thermal (collectors + electrical scope)
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                9.5 Micro-CHP (domestic) + Section 551
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
