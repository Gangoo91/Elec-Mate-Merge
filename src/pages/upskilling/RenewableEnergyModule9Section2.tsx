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
    id: 'm9s2-hawt-vs-vawt',
    question:
      'HAWT vs VAWT — what are they + when does each suit?',
    options: [
      'Same thing',
      'HAWT = Horizontal Axis Wind Turbine — rotor spins on a horizontal shaft; classic three-blade design; needs yaw mechanism to face wind; dominant globally + in domestic micro-wind (1-15 kW). VAWT = Vertical Axis Wind Turbine — rotor spins on a vertical shaft (Darrieus, Savonius, hybrid); omni-directional (no yaw needed); typically quieter; suits urban / low-wind / turbulent sites; lower capacity factor than HAWT; niche application',
      'Random',
      'Only HAWT',
    ],
    correctIndex: 1,
    explanation:
      'HAWT (Horizontal Axis Wind Turbine): rotor on horizontal shaft, blades like an airplane propeller. Three-blade design dominant (best aerodynamic balance). Needs yaw mechanism (active motor or passive tail vane) to face the wind. Dominant in utility-scale wind (multi-MW) + domestic micro-wind (1-15 kW). Higher capacity factor in clean wind conditions. VAWT (Vertical Axis Wind Turbine): rotor on vertical shaft. Variants: Darrieus (eggbeater shape, lift-based), Savonius (cup-based, drag-driven, lower efficiency), hybrid Darrieus-Savonius. Omni-directional — no yaw needed; works in any wind direction. Typically quieter (no tip-vortex from horizontal blades). Suits: urban roof-mounted, turbulent / variable wind, low-wind sites. Lower capacity factor in clean wind. UK 2025-26 reality: HAWT dominant for rural / agricultural / open-site micro-wind; VAWT niche for urban / restricted-space sites. Both are wind microgeneration covered by Section 551 + MCS MIS 3003.',
  },
  {
    id: 'm9s2-mis-3003-scope',
    question:
      'MCS MIS 3003 — what does it cover?',
    options: [
      'All wind',
      'MCS Installer Standard 3003 — small wind turbines ≤50 kW. Sizing methodology (wind speed assessment, site survey), product approval (MCS-approved turbines), installer competence (MCS-certified company + training), customer handover documentation. Required for any UK Government grant (where applicable). Larger turbines (>50 kW commercial / utility) fall outside MIS 3003 scope into commercial-scale wind frameworks',
      'Only domestic',
      'No standard',
    ],
    correctIndex: 1,
    explanation:
      'MCS Installer Standard 3003 (current version MIS 3003 issue 5.0) covers small wind turbines up to 50 kW rated power. Requirements include: (1) site wind assessment per MCS sizing methodology (typically MET data + on-site anemometer for 12 months for larger installs); (2) turbine product on MCS-approved list; (3) installer company MCS-certified for small wind; (4) BS EN 61400-2 (small wind turbines) product standard conformity declared; (5) customer handover documentation including expected annual energy yield. Above 50 kW: commercial-scale wind regulatory frameworks apply (planning, EIA Environmental Impact Assessment if very large, separate DNO connection processes). UK 2025-26 reality: domestic micro-wind market much smaller than 2010-2014 peak; commercial / agricultural / community-scale wind continues. Cert evidence bundle: MCS handover pack + BS 7671 electrical EIC + planning consent + DNO correspondence.',
  },
  {
    id: 'm9s2-erec-wind',
    question:
      'Wind turbine 6 kW single-phase grid-tied — what EREC notification?',
    options: [
      'No notification',
      '6 kW single-phase ≈ 26 A continuous export at 230 V — exceeds G98 Type A ≤16 A per phase fast-track threshold. EREC G99 formal pre-installation application required: DNO design assessment + connection offer + customer acceptance + outage scheduling (if required) + completion notification + DNO-witnessed (sometimes) anti-islanding test. Lead time typically 6-18 weeks',
      'G98 always',
      'EU regulation',
    ],
    correctIndex: 1,
    explanation:
      'EREC G99 formal process triggered. 6 kW single-phase ≈ 26 A continuous export current at 230 V — well above the G98 Type A ≤16 A per phase fast-track threshold. G99 process: (1) customer application via DNO portal (with site details, turbine spec, installer details, expected yield); (2) DNO design assessment (network capacity check, anti-islanding verification, connection scheme); (3) DNO connection offer + price; (4) customer acceptance + payment (where applicable); (5) outage scheduling (if connection upgrade needed); (6) installer completes install per the connection offer; (7) commissioning + DNO-witnessed anti-islanding test (for some DNOs / sizes); (8) completion notification to DNO + final connection. Lead time: 6-18 weeks typical UK 2025-26. Cert evidence bundle records: G99 application reference + connection offer + completion + DNO witnessed test (if applicable).',
  },
  {
    id: 'm9s2-cable-run-voltage-drop',
    question:
      '60 m run from rural mast-top wind turbine to indoor inverter — what cable sizing?',
    options: [
      '1.5 mm² T+E',
      'Long-run voltage drop is the limiting factor. 60 m × continuous current × cable per-mV/A/m → typically need oversized cable to keep Reg 525.202 voltage drop ≤5%. For 6 kW single-phase (26 A): 60 × 26 × 4.4 mV/A/m (10 mm²) = 6.9 V = 3% — within 5% but tight. Practical UK 2025-26: 16 mm² SWA or larger; voltage drop calc per Appendix 4 Section 6.4; SWA armour as CPC per Reg 543',
      'No calc',
      'Bare wire',
    ],
    correctIndex: 1,
    explanation:
      'Wind turbine cable run to indoor inverter is typically long (50-200 m at agricultural / rural sites where mast is sited for clean wind). Voltage drop becomes the limiting factor for cable sizing — sustained current carrying capacity is usually well within smaller cable, but Reg 525.202 + Appendix 4 Section 6.4 ≤5% drop forces oversize. Worked example: 6 kW single-phase 26 A continuous; 60 m run; 10 mm² SWA at 4.4 mV/A/m → drop = 60 × 26 × 4.4 / 1000 = 6.9 V = 3% of 230 V. Within 5% but margin tight. Step up to 16 mm² SWA: drop = 60 × 26 × 2.8 / 1000 = 4.4 V = 1.9% — comfortable. UK 2025-26 mature install practice: 16 mm² 3-core SWA (single-phase) or 4-core (three-phase) buried in trench from turbine base to building. Armour as CPC per Reg 543 (16 mm² SWA armour cross-section well above Table 54.7 minimum). Cert evidence bundle: cable type + length + Appendix 4 calc + voltage drop result.',
  },
];

const quizQuestions = [
  {
    question:
      'Rural farm install: 10 kW HAWT three-phase grid-tied micro-wind. What is the regulatory + electrical scope?',
    options: [
      'Plug into socket',
      'Multi-trade install: MCS-certified company (MIS 3003), turbine specialist, mast erector / civils, electrical installer, planning consultant. Electrical scope: dedicated three-phase circuit from indoor inverter to AC supply panel; AC isolator at inverter; per-Section 551 architecture; 4-pole Type A RCBO C-curve; Reg 551.7.5 anti-islanding (typically integrated into inverter); EREC G99 formal application; BS EN 62305-3 lightning protection for mast + bonding; Reg 643 commissioning + EIC',
      'No scope',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-trade rural HAWT install per UK 2025-26 standard practice: (1) MCS-certified company orchestrates + holds MIS 3003 cert; (2) turbine specialist commissions turbine + control electronics; (3) mast erector / civils handles guyed lattice or monopole foundation + mast assembly; (4) electrical installer does the BS 7671 electrical side; (5) planning consultant handles permitted-development assessment + planning permission if needed. Electrical scope: dedicated three-phase circuit (or single-phase for smaller units) from indoor inverter location to AC supply panel; AC isolator at inverter (BS EN 60947-3, lockable OFF); per-Section 551 architecture (Reg 551.7.2.1 supply-side connection); 4-pole Type A RCBO C-curve typically; Reg 551.7.5 anti-islanding integrated into the inverter (verified at commissioning, sometimes DNO-witnessed); EREC G99 formal application from quote stage; BS EN 62305-3 lightning protection for mast (mast = exposed metallic structure; lightning bond + earth electrode at mast base; covered in detail in M11); Reg 643 commissioning sequence + EIC. Cert evidence bundle: MCS handover pack + Section 551 compliance + EREC G99 reference + lightning protection + EIC.',
  },
  {
    question:
      'Wind turbine commissioning — what unique tests vs PV?',
    options: [
      'Same as PV',
      'Wind-specific tests beyond standard Reg 643: yaw mechanism functional (HAWT — must rotate to face wind); brake operation (mechanical + electrical brake for over-speed / shutdown); over-speed protection cut-out test; cut-in + cut-out wind speed verification (where wind conditions permit); dump load operation (for off-grid / grid-loss scenarios); blade balance + rotation noise check. Plus standard Section 551 anti-islanding + Reg 643 framework',
      'No tests',
      'Customer tests',
    ],
    correctAnswer: 1,
    explanation:
      'Wind turbine commissioning adds tests specific to mechanical + control aspects of the turbine: (1) Yaw mechanism functional (HAWT only) — turbine head rotates to face the wind direction; passive vane or active motorised yaw; must operate smoothly without binding. (2) Brake operation — mechanical disc brake AND electrical brake (short-circuit braking via inverter / generator) for emergency stop, over-speed shutdown, maintenance isolation. (3) Over-speed protection — verify cut-out activates at manufacturer-specified rotor RPM; typically tested via simulated over-speed signal not actual wind condition. (4) Cut-in + cut-out wind speed — verify turbine starts generating at ~3-4 m/s, reaches rated power at ~12 m/s, cuts out for safety at ~25 m/s. Verification opportunistic — depends on wind conditions on commissioning day. (5) Dump load — for off-grid + grid-loss scenarios where generated power needs dissipating; resistor bank typically. (6) Blade balance — visual + vibration check; imbalanced blades cause structural stress + noise. Plus standard Reg 643 Part 6 sequence + Section 551 anti-islanding test. Cert evidence bundle: wind-specific test results + manufacturer commissioning procedure + Part 6 EIC.',
  },
  {
    question:
      'Planning permission for domestic micro-wind — UK 2025-26 reality?',
    options: [
      'Never needed',
      'PDR (Permitted Development Rights) for domestic wind in England: building-mounted ≤4 m above ridge OR free-standing ≤11.1 m total height + ≤5 m highest blade tip from ground for safety, with restrictions (no listed buildings, conservation areas, NSIPs). Most sites require full planning permission. Scotland/Wales have similar but different rules. PDR existed 2011-2017 with various rule changes; current rules per 2026 may differ — verify locally',
      'PDR everywhere',
      'EU approval',
    ],
    correctAnswer: 1,
    explanation:
      'Planning permission for UK domestic micro-wind is restrictive vs solar PV. England PDR for wind: (1) Building-mounted turbine — ≤4 m above the highest point of the ridge; ≤0.6 m blade swept area; restrictions on protected sites (no listed buildings, conservation areas, World Heritage Sites). (2) Free-standing turbine — ≤11.1 m total height including blades; ≤5 m highest blade tip from ground level; ≥0.5 of blade-tip height from property boundary; one per property. (3) Scotland / Wales / Northern Ireland — similar PDR but separate rules per devolved planning. Most domestic micro-wind sites trigger full planning permission (PP) — site-specific assessment of visual impact, noise, ecological impact, shadow flicker (rotating shadow on neighbours). PP timeline: 8-16 weeks typical. Cost: £200-400 application fee + consultant if visual impact / noise assessment needed. UK 2025-26 reality: planning consent is the biggest project-timeline risk after DNO G99 for domestic wind. Many projects don\'t proceed past planning. Cert evidence bundle includes planning consent reference + conditions imposed.',
  },
  {
    question:
      'UK 2025-26 reality of domestic micro-wind vs solar PV — what should an installer tell the customer?',
    options: [
      'Wind is best',
      'Direct comparison: solar PV is the dominant UK 2025-26 microgeneration technology (cheap, simple, predictable yield, easy planning). Micro-wind: highly site-dependent (wind speed assessment critical, ~20-25% UK capacity factor vs ~10-12% PV), higher install cost (£3-8k per kW vs ~£1.5-2k per kW for PV), planning permission usually required, MCS competence harder to find, mast structural / civils overhead. Most domestic sites are better served by PV + BESS. Wind suits: very windy rural sites, large-acreage farms, off-grid properties',
      'Random',
      'PV is bad',
    ],
    correctAnswer: 1,
    explanation:
      'Honest UK 2025-26 customer answer: solar PV is the dominant domestic microgeneration technology for clear reasons — predictable yield (irradiance models well-understood), easy planning (PDR for most domestic), low install cost (£1.5-2k per kW), MCS competence widespread, ROI 8-12 years typical. Micro-wind: highly site-dependent — wind speed assessment via MET data + ideally on-site anemometer for 6-12 months is needed to predict yield; UK average capacity factor 20-25% (only slightly above PV but only at the right sites); install cost £3-8k per kW (mast + civils + planning + MCS competence harder to source); planning permission usually required; ROI 10-20 years or never. Honest answer to customer: domestic micro-wind suits a small subset of UK sites — very windy rural locations (Highland farms, exposed coastal, Welsh / Scottish uplands), large-acreage agricultural sites with space for proper mast siting, off-grid properties. Most UK domestic sites are better served by PV (+ BESS, + heat pump, + EV) than wind. Don\'t install wind unless site is genuinely wind-favourable + customer understands the timeline + cost vs PV. Cert evidence bundle documents the customer\'s informed choice + site assessment.',
  },
  {
    question:
      'Dump load — what is it + why does it matter for wind?',
    options: [
      'Nothing',
      'Dump load = resistor bank that dissipates generated power when grid is not available to absorb it. For wind: if grid is lost / disconnected (per Reg 551.7.5 anti-islanding) BUT wind is still blowing, the turbine continues rotating + generating; without dump load, the unloaded generator over-speeds (no resistive torque to brake against) → damaged generator + safety hazard. Dump load typically engages automatically on grid-loss; mechanical brake follows',
      'No load',
      'Customer fault',
    ],
    correctAnswer: 1,
    explanation:
      'Dump load is critical for wind safety. Scenario: DNO grid loss occurs → Reg 551.7.5 anti-islanding device disconnects inverter from grid → BUT wind is still blowing → turbine still rotating, generator still producing power. Without somewhere for that power to go: generator unloads → no resistive torque → rotor over-speeds → exceeds mechanical design limits → blade failure / structural damage / safety hazard. Dump load solution: large resistor bank (sized per turbine power rating); automatically engages on grid-loss detection; dissipates the generated power as heat; provides electrical braking torque to keep rotor speed within design limits. Typically followed by mechanical disc brake engaging to bring rotor to full stop. Sized per turbine: e.g. 5 kW turbine needs ~5 kW resistor bank. Located near turbine (not in habitable space — gets hot). Cert evidence bundle: dump load product + sizing + commissioning test (simulated grid-loss verifies dump load + mechanical brake sequence).',
  },
  {
    question:
      'Wind turbine inverter — what type + what does it do?',
    options: [
      'No inverter',
      'Grid-tie inverter — converts variable-frequency variable-voltage AC from the wind generator to grid-synchronised 50 Hz 230 V (single-phase) or 400 V (three-phase) AC. Includes anti-islanding loss-of-mains protection per Reg 551.7.5. Typically integrated into the turbine controller package. Some small turbines use rectifier + DC-link + grid-tie inverter; some use direct AC matching. BS EN 50549 series for power generators connected to LV grid',
      'Customer DIY',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Wind turbine grid-tie inverter is the electrical interface between the turbine generator + the AC grid. Function: wind turbine generator output is variable-frequency variable-voltage AC (wind speed varies → rotor RPM varies → generator output varies); the inverter converts this into stable 50 Hz grid-synchronised AC at the required voltage. Architecture variants: (1) Variable AC → rectifier → DC link → grid-tie inverter (most modern small wind). (2) Direct AC matching with electronic control (older / synchronous generator designs). Anti-islanding protection per Reg 551.7.5 is integrated into the inverter — loss-of-mains detection (ROCOF + voltage / frequency deviation; G99 disallows Vector Shift for type-tested generation, so RoCoF is the standard required method for the type-tested inverters used in virtually all LCT installs, with VS legacy / non-type-tested sites only) → automatic disconnect. Product standards: BS EN 50549-1 (power generators connected to LV) + BS EN 61400 series (wind turbine specific). UK 2025-26 typical inverter brands: SMA Sunny Boy / Tripower (PV inverters used for wind also), ABB, Bornay, FuturEnergy. Cert evidence bundle: inverter product + DoC + Reg 551.7.5 compliance + manufacturer commissioning procedure.',
  },
];

const faqs = [
  {
    question: 'Why has UK domestic micro-wind declined since 2014?',
    answer:
      'Combination: (1) Feed-in Tariff (FIT) closure for new entrants 2019 — removed the subsidy that made micro-wind viable at marginal sites; (2) PV cost-collapse 2010-2020 made PV the dominant residential renewable + reset the comparison; (3) Planning permission complexity vs PV PDR; (4) Real-world yield disappointment at sites without rigorous wind assessment; (5) MCS installer count declined for wind as the market shrank. Commercial / agricultural / community wind continues; domestic micro-wind is niche.',
  },
  {
    question: 'What anemometer assessment is needed for wind sizing?',
    answer:
      'MCS MIS 3003 sizing: (1) Desktop assessment using NOABL UK wind speed database (gives broad site average); (2) For larger installs (>5 kW) or marginal sites, on-site anemometer at hub height for 6-12 months gives true site data. Annual mean wind speed at hub height < 5 m/s = marginal; 5-7 m/s = viable; >7 m/s = good. UK 2025-26 reality: many sites that looked viable on NOABL turn out marginal on real measurement.',
  },
  {
    question: 'BS EN 61400 — what does it cover?',
    answer:
      'BS EN 61400 series = wind turbine product safety + performance standards. Most relevant: BS EN 61400-2 (small wind turbines ≤200 m² swept area — covers most domestic + small commercial micro-wind); BS EN 61400-12 (power performance measurement); BS EN 61400-25 (data communication). Manufacturer DoC declares conformity. MCS MIS 3003 requires BS EN 61400-2 compliance.',
  },
  {
    question: 'Shadow flicker — what is it + why does it matter?',
    answer:
      'Shadow flicker = rotating shadow cast by turbine blades onto neighbouring properties when sun + blade rotation align. Can cause visual discomfort for occupants. Planning condition typically: shadow flicker not exceeding 30 hours per year + ≤30 minutes any single day at any habitable window. Mitigation: smart turbine controller can stop rotation at trigger times. Material in planning permission decision + customer-facing handover education.',
  },
  {
    question: 'Off-grid wind install — what changes vs grid-tie?',
    answer:
      'Off-grid: no grid connection → battery storage essential; inverter is grid-forming (not grid-following); dump load critical (always active when battery is full); typically combined with PV for diversified generation. Section 551 still applies (Reg 551.1.1 covers all generating sets). Reg 551.7.5 anti-islanding may not apply (no public supply to island from) but the dump load + over-speed protection is essential. M10 covers grid-forming inverters in detail.',
  },
];

export default function RenewableEnergyModule9Section2() {
  const navigate = useNavigate();

  useSEO({
    title: 'Wind microgeneration (HAWT / VAWT) | Renewable Energy 9.2 | Elec-Mate',
    description:
      'Wind microgeneration electrical install — HAWT vs VAWT, MCS MIS 3003 small wind framework, Section 551 + Reg 551.7.5 anti-islanding, BS EN 61400 product standards, mast install, planning permission, long-run cable sizing, dump load, grid-tie inverter.',
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
            eyebrow="Module 9 · Section 2 · BS 7671:2018+A4:2026 · Section 551 + MCS MIS 3003 + BS EN 61400-2"
            title="Wind microgeneration (HAWT / VAWT)"
            description="Wind microgeneration from the BS 7671 electrical install perspective. HAWT vs VAWT, MCS MIS 3003 small wind framework, Section 551 + Reg 551.7.5 anti-islanding, BS EN 61400-2 product standard, mast install + planning permission, long-run cable + voltage drop, grid-tie inverter, dump load."
            tone="yellow"
          />

          <TLDR
            points={[
              'HAWT (Horizontal Axis Wind Turbine) dominates micro-wind. VAWT (Vertical Axis — Darrieus, Savonius, hybrid) suits urban / turbulent / low-wind niche sites.',
              'MCS MIS 3003 = small wind installer standard ≤50 kW. Required for grant funding (where applicable) + UK industry competence baseline.',
              'BS EN 61400-2 = small wind turbine product safety + performance standard. Manufacturer DoC declares conformity. Required by MIS 3003.',
              'Section 551 applies — Reg 551.7.5 anti-islanding mandatory (integrated in grid-tie inverter), Reg 551.7.2.1 supply-side connection.',
              'EREC G98 fast-track only for ≤16 A per phase export. Most domestic micro-wind (3-15 kW) triggers G99 formal application.',
              'Long cable run from mast to indoor inverter (50-200 m typical at rural sites) — voltage drop is limiting factor; 16 mm² SWA or larger typical.',
              'Dump load critical — when grid lost but wind still blowing, dump load + mechanical brake prevent over-speed. Sized per turbine rating.',
              'Planning permission: PDR limited for wind vs PV; most sites require full planning permission (8-16 weeks + £200-400 fee + consultant if visual / noise / shadow flicker concerns).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish HAWT vs VAWT and identify which suits a given site.',
              'Apply MCS MIS 3003 framework — site assessment, product approval, installer competence, handover.',
              'Apply Section 551 + Reg 551.7.5 anti-islanding for grid-tie wind.',
              'Determine EREC G98 vs G99 path per export size.',
              'Size cable for long mast-to-inverter runs per Reg 525.202 + Appendix 4 Section 6.4 voltage drop.',
              'Specify dump load + mechanical brake architecture for grid-loss scenarios.',
              'Identify BS EN 61400-2 + BS EN 50549 product standards for wind install.',
              'Plan planning permission timeline + customer expectations + shadow flicker / noise considerations.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Wind microgeneration is electrically simple, mechanically complex, and politically interesting. The cable run is long, the mast is exposed, the dump load is non-negotiable.
          </Pullquote>

          <ContentEyebrow>HAWT vs VAWT + MCS MIS 3003 framework</ContentEyebrow>

          <ConceptBlock
            title="HAWT vs VAWT architectures"
            plainEnglish="HAWT = Horizontal Axis Wind Turbine — rotor on horizontal shaft, three-blade airfoil design, needs yaw to face the wind, dominant in micro + utility wind. VAWT = Vertical Axis — rotor on vertical shaft (Darrieus / Savonius / hybrid), omni-directional, typically quieter, niche urban / low-wind sites, lower capacity factor."
            onSite="UK 2025-26 micro-wind market: HAWT dominates for rural / agricultural / open-site installs; VAWT for urban / restricted-space / turbulent-wind locations. Capacity factor in UK averages 20-25% for HAWT at good sites, lower for VAWT or marginal sites. Electrical install scope similar between architectures — the differences are mechanical + control."
          >
            <p>HAWT vs VAWT comparison:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">HAWT design</strong> — horizontal
                shaft + three-blade airfoil + yaw mechanism (active motor or passive
                tail vane) to face wind direction. Higher tip speed = more noise +
                more efficient lift-based extraction
              </li>
              <li>
                <strong className="text-white">HAWT capacity
                  factor</strong> — UK average ~20-25% at good sites (annual mean wind
                speed ≥6 m/s at hub height). Marginal sites &lt;15%
              </li>
              <li>
                <strong className="text-white">VAWT design</strong> —
                vertical shaft, several variants. Darrieus (lift-based, eggbeater
                shape — high efficiency but needs starting motor). Savonius
                (drag-based, scoop / cup — low efficiency, self-starting). Hybrid
                Darrieus-Savonius
              </li>
              <li>
                <strong className="text-white">VAWT capacity
                  factor</strong> — typically 5-10 percentage points lower than HAWT at
                clean-wind sites; more competitive at turbulent / variable / urban
                sites
              </li>
              <li>
                <strong className="text-white">Mounting</strong> —
                HAWT typically on mast (8-25 m hub height) or building-mounted (≤4 m
                above ridge per PDR). VAWT typically rooftop / pole-mount; lower
                hub height
              </li>
              <li>
                <strong className="text-white">Noise</strong> — HAWT
                tip-vortex generates aerodynamic noise scaled with tip speed; ~40-50
                dB(A) at hub height typical small wind. VAWT lower tip speed →
                typically quieter
              </li>
              <li>
                <strong className="text-white">UK 2025-26 market
                  share</strong> — HAWT dominates volume (~85% of installs); VAWT
                niche urban / aesthetic / specialist applications
              </li>
              <li>
                <strong className="text-white">Electrical install
                  scope</strong> — similar between architectures: generator → inverter
                → AC grid-tie. Differences are mechanical (yaw, brake) + control logic
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MCS MIS 3003 small wind installer framework"
            plainEnglish="MCS MIS 3003 is the UK installer competency + product approval framework for small wind turbines ≤50 kW. Required for grant eligibility (where applicable) + the customer-facing accreditation. Sizing methodology + product approval + installer competence + handover documentation."
            onSite="MCS-certified company orchestrates the multi-trade install. Electrical scope is one engineering layer. UK 2025-26 reality: domestic micro-wind market is small + MCS-certified small-wind installer count is limited; most M9 wind installs are at rural / agricultural / commercial sites where install scale + economics work."
          >
            <p>MIS 3003 framework elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Scope</strong> — small wind
                turbines ≤50 kW rated power. Single + three-phase. Grid-tied + off-grid
                variants
              </li>
              <li>
                <strong className="text-white">Site wind
                  assessment</strong> — desktop NOABL UK wind speed database for
                broad site average; on-site anemometer for marginal sites or larger
                installs (6-12 months at hub height)
              </li>
              <li>
                <strong className="text-white">Product
                  approval</strong> — turbine + inverter on MCS-approved list. BS EN
                61400-2 conformity declared (small wind turbine product standard)
              </li>
              <li>
                <strong className="text-white">Installer
                  competence</strong> — MCS-certified company; individual installer
                training (turbine-specific manufacturer + general small-wind training)
              </li>
              <li>
                <strong className="text-white">Customer handover
                  documentation</strong> — sizing calc + product details +
                commissioning record + expected annual energy yield + maintenance
                schedule + warranty + EIC
              </li>
              <li>
                <strong className="text-white">UK Government grant
                  position</strong> — Boiler Upgrade Scheme heat-pump-focused; no
                current widespread grant for wind. Smart Export Guarantee (SEG) tariff
                for export earnings (covered in M10)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — MIS 3003 handover pack + BS 7671 electrical EIC +
                planning consent + EREC G99 reference + manufacturer DoC
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Section 551 + Reg 551.7.5 — applied to wind microgeneration"
            clause="Reg 551.1.1 lists generating set power sources including (b) turbines — wind microgeneration falls here. Reg 551.7.5 mandates anti-islanding: means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4."
            meaning="Wind microgeneration is a Section 551 generating set (turbine per Reg 551.1.1(b)). Reg 551.7.5 anti-islanding is mandatory — the grid-tie inverter must disconnect the turbine from the grid on supply loss. Detection methods integrated into the inverter: ROCOF (rate of change of frequency) + voltage / frequency deviation + active anti-islanding methods. G99 disallows Vector Shift for type-tested generation, so RoCoF is the standard required method for the type-tested inverters used in virtually all LCT installs; Vector Shift is legacy and only on older or non-type-tested sites. Verified at commissioning via simulated grid-loss test (some DNOs witness directly for larger installs). On grid-loss: anti-islanding disconnects inverter; dump load engages to dissipate continued wind-driven generation; mechanical brake follows. Cert evidence bundle: inverter manufacturer DoC declaring Reg 551.7.5 compliance + commissioning test result + dump load functional verification."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Cable, controls, dump load — the electrical scope</ContentEyebrow>

          <Pullquote>
            The wind installer\'s biggest electrical question isn\'t the inverter — it\'s the 60 m of armoured cable buried in a trench from the mast base to the building.
          </Pullquote>

          <ConceptBlock
            title="Long-run cable from mast to indoor inverter"
            plainEnglish="Wind turbines sit at the windiest site location — typically a mast on a hill / field / exposed location. Cable from mast base to indoor inverter is typically 50-200 m. Voltage drop is the limiting cable-sizing factor; Reg 525.202 + Appendix 4 Section 6.4 ≤5% limit forces cable upsize."
            onSite="Cable route: from turbine generator (top of mast) down through mast (inside or alongside) → mast-base junction box (weatherproof, gland-sealed) → underground SWA in trench (typical 600 mm deep) → through-wall penetration into building → indoor inverter location. UK 2025-26 typical: 16 mm² 3-core or 4-core SWA for 6-10 kW units at 50-100 m run."
          >
            <p>Cable sizing considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sustained current
                  carrying capacity</strong> — per Appendix 4 + cable type +
                installation method. Usually well within smaller cable; voltage drop
                drives the upsize
              </li>
              <li>
                <strong className="text-white">Reg 525.202 voltage
                  drop ≤5%</strong> — per Appendix 4 Section 6.4. Long runs require
                oversize cable. 60 m × 26 A × 4.4 mV/A/m (10 mm²) = 6.9 V = 3% — tight
                but within limit. 16 mm² (2.8 mV/A/m) reduces drop to ~1.9% — comfortable
              </li>
              <li>
                <strong className="text-white">SWA (Steel Wire
                  Armoured)</strong> — standard for buried cable. Mechanical protection
                + UV / weather resistance + armour as CPC option per Reg 543
              </li>
              <li>
                <strong className="text-white">Cable in mast</strong>
                — manufacturer-provided routing inside the mast (typical lattice or
                monopole). Junction box at mast base for transition to underground
                SWA
              </li>
              <li>
                <strong className="text-white">Underground
                  trench</strong> — typically 600 mm deep, sand bedding + cable +
                marker tape + backfill. Cable continuous (no underground joints)
              </li>
              <li>
                <strong className="text-white">Through-wall
                  penetration</strong> — drilled at downward angle outside; sleeved;
                fire-stopped per Reg 527 + Building Regs Part B
              </li>
              <li>
                <strong className="text-white">CPC arrangement</strong>
                — armour-as-CPC per Reg 543 with manufacturer DoC confirming armour
                cross-section meets Table 54.7 + continuity at both ends. Alternative
                separate green-yellow CPC conductor
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — cable type + length + Appendix 4 sizing calc +
                voltage drop result + route + gland details + Reg 543 CPC arrangement
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Dump load + brake architecture"
            plainEnglish="Dump load = resistor bank that dissipates wind-generated power when grid is unavailable. Critical safety component: if grid is lost (Reg 551.7.5 anti-islanding triggered) but wind is still blowing, the turbine keeps generating with no load → over-speed → mechanical damage. Dump load + mechanical brake bring rotor safely to stop."
            onSite="Dump load typically sized to match turbine rated power (5 kW turbine → 5 kW resistor bank). Located near turbine base (gets hot — not in habitable space). Automatically engages on grid-loss detection from the inverter controller. Mechanical disc brake follows once rotor speed is brought down by dump load. Functional test at commissioning via simulated grid-loss."
          >
            <p>Dump load + brake architecture:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Function</strong> — when
                grid lost / inverter disconnected (Reg 551.7.5), dump load engages to
                absorb continuing wind-driven generation; provides resistive load that
                creates electromagnetic braking torque in the generator
              </li>
              <li>
                <strong className="text-white">Sizing</strong> — matched
                to turbine rated power. 5 kW turbine → 5 kW resistor bank. Bank rated
                for continuous duty at maximum wind condition (cut-out wind speed,
                typically 25 m/s)
              </li>
              <li>
                <strong className="text-white">Location</strong> —
                near turbine base (NOT in habitable space — gets very hot under load).
                Weather-protected enclosure; ventilation for heat dissipation
              </li>
              <li>
                <strong className="text-white">Engagement</strong> —
                automatic via turbine controller on grid-loss detection. Mechanical
                brake follows once rotor speed reduced
              </li>
              <li>
                <strong className="text-white">Mechanical
                  brake</strong> — disc brake on rotor shaft; engages once rotor speed
                brought below threshold by dump load. Brings rotor to full stop +
                holds during maintenance
              </li>
              <li>
                <strong className="text-white">Over-speed
                  protection</strong> — separate cut-out activates if rotor speed
                exceeds manufacturer limit (regardless of grid state); engages dump
                load + mechanical brake even with grid present
              </li>
              <li>
                <strong className="text-white">Commissioning
                  test</strong> — simulated grid-loss: inverter disconnects → dump load
                engages → rotor decelerates → mechanical brake engages → rotor at full
                stop. Verify sequence completes within manufacturer-specified time
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — dump load product + rating + location + functional
                test result + over-speed cut-out test
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 525.202 + Appendix 4 Section 6.4 — voltage drop for long wind cable runs"
            clause="The above requirements [Reg 525.1 + 525.201 minimum voltage at terminals] are deemed to be satisfied if the voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment does not exceed that stated in Appendix 4, Section 6.4."
            meaning="Reg 525.202 + Appendix 4 Section 6.4 set the voltage drop limit (5% for non-lighting fixed current-using equipment / generation circuits). For wind installs: the long cable run from mast to indoor inverter is the constraint. Worked example: 6 kW single-phase 26 A continuous; 60 m run; 10 mm² SWA at 4.4 mV/A/m → 60 × 26 × 4.4 / 1000 = 6.9 V drop = 3% of 230 V (within 5% but tight). 16 mm² SWA (2.8 mV/A/m) → drop = 4.4 V = 1.9% (comfortable margin). Three-phase variant: drop = single-phase ÷ √3 (≈58%). Cert evidence bundle: voltage drop calc per Appendix 4 + cable choice + per-segment drop result + total drop + percentage of nominal voltage + margin to 5%."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Rural farm — 6 kW HAWT grid-tied micro-wind on a 12 m mast"
            situation="Highland farm. Existing 100 A three-phase supply (already upgraded for previous PV + BESS install). Field with clean wind exposure 80 m from farmhouse. Customer wants 6 kW HAWT grid-tied micro-wind (Bergey Excel 6 / Skystream / similar). NOABL UK wind speed database shows 7.2 m/s annual mean at hub height — viable site. 12 m guyed lattice mast."
            whatToDo="Multi-trade: MCS company (MIS 3003) + turbine specialist + civils for mast foundation + electrical installer. Electrical scope: dedicated single-phase circuit (turbine is single-phase 230 V output ~26 A continuous at rated power) from AC supply panel; 32 A Type A RCBO C-curve at CU (allows for inrush + headroom); AC isolator at indoor inverter (BS EN 60947-3, lockable OFF); cable: 16 mm² 3-core SWA from inverter to mast base (80 m run); voltage drop calc: 80 × 26 × 2.8 / 1000 = 5.8 V = 2.5% of 230 V (within Reg 525.202 5%); armour as CPC per Reg 543 (16 mm² SWA armour cross-section ~110 mm² steel — well above Table 54.7 minimum). Mast base: weatherproof junction box, gland-sealed entries; cable transitions to mast-internal flex to turbine head. Mast lightning protection per BS EN 62305-3: separate lightning earth electrode at mast base, bonded to building MET via supplementary equipotential bonding. Dump load: 6 kW resistor bank at mast base in vented enclosure. EREC G99 formal application (26 A export > 16 A G98 threshold). Planning permission: 12 m mast triggers full planning (PDR limit 11.1 m); 8-16 week timeline, ~£300 fee + visual / noise consultant ~£800. Cert evidence bundle: MCS MIS 3003 handover pack + BS 7671 EIC + Section 551 compliance + Reg 551.7.5 anti-islanding test + EREC G99 reference + planning consent + BS EN 62305-3 lightning protection install + BS EN 61400-2 turbine DoC. Total project cost ~£30-50k; payback 12-18 years (SEG tariff dependent — covered in M10)."
            whyItMatters="This is the typical UK 2025-26 rural farm wind install. Multi-source PEI site (Chapter 82) with PV + BESS + wind. Electrical scope is the BS 7671 install side; MCS company orchestrates the multi-trade delivery. The long cable run + voltage drop + dump load + lightning protection are the wind-specific electrical considerations beyond the standard Section 551 framework. Cert evidence bundle integrates with existing PV + BESS records."
          />

          <Scenario
            title="Urban rooftop VAWT install — small commercial office"
            situation="Small commercial office building, flat roof, urban location with turbulent wind. Customer wants a 3 kW VAWT (Quietrevolution QR5 / Windside / similar) rooftop-mounted for ESG branding + modest export earnings. Existing three-phase 100 A supply. Tight planning + noise constraints due to neighbouring residential."
            whatToDo="VAWT suits this site over HAWT (turbulent urban wind, lower noise, smaller visual impact). Multi-trade: MCS company (MIS 3003) + structural engineer (roof load assessment — VAWT + framework typically 200-400 kg) + electrical installer + planning consultant (noise assessment essential due to residential proximity). Electrical scope: dedicated single-phase circuit (3 kW VAWT typical single-phase ~13 A continuous); 20 A Type A RCBO C-curve at CU; AC isolator at indoor inverter; cable 6 mm² 3-core SWA (shorter run, ~15-20 m typical rooftop to indoor); voltage drop comfortable. EREC G98 fast-track eligible (3 kW ~13 A < 16 A per phase threshold) — post-installation notification + DNO heat pump portal equivalent for generation. Section 551 + Reg 551.7.5 anti-islanding integrated in inverter. Dump load: 3 kW resistor bank rooftop in vented enclosure. Planning permission: VAWT building-mounted typically requires full planning (no PDR for commercial wind in most cases); noise assessment shows ≤42 dB(A) at neighbouring property at 1 m — within typical planning condition. Roof structural assessment: load + dynamic / vibration assessment by structural engineer. Cert evidence bundle: MCS handover pack + BS 7671 EIC + structural engineer report + planning consent + noise assessment + EREC G98 notification. Total project cost ~£15-25k."
            whyItMatters="VAWT urban install is a niche but real UK 2025-26 pattern — commercial properties valuing ESG / visual statement / quieter operation. Cost / kWh is higher than rural HAWT but viable for the specific use case. Cert evidence bundle integrates planning + structural + electrical scopes."
          />

          <CommonMistake
            title="Specifying wind based on NOABL without site anemometer"
            whatHappens="Installer accepts NOABL UK wind speed database value (showing 6 m/s annual mean) without on-site anemometer. Real site has buildings / trees / terrain causing local wind shadowing — actual hub-height wind speed is 4.5 m/s. Real capacity factor 10% not the predicted 22%. Customer expected £800/year electricity savings; actual ~£250/year. Customer angry; reputation damage."
            doInstead="MCS MIS 3003 + UK 2025-26 best practice: on-site anemometer at hub height for 6-12 months on any install ≥5 kW or marginal NOABL site. Even smaller installs benefit from 3-month assessment. NOABL is a broad geographic average; real sites have significant local wind variation due to terrain + obstacles. Honest customer expectation setting: present yield ranges (NOABL-derived) + caveat that real performance depends on site-measured wind. Cert evidence bundle records the assessment method + measured / estimated wind speed + projected yield."
          />

          <CommonMistake
            title="Cable sized to current capacity but failing voltage drop on long run"
            whatHappens="6 kW single-phase wind at 80 m run. Installer sizes cable to current capacity: 10 mm² SWA (~55 A capacity Method E) seems ample for 26 A continuous. Doesn\'t do voltage drop calc. Real result: 80 × 26 × 4.4 / 1000 = 9.2 V = 4.0% drop — within 5% but Cable Operating Temperature de-rates further; on hot summer day at peak generation, voltage at inverter terminals dropping outside the inverter\'s operational window → inverter trips repeatedly → poor yield + customer complaint."
            doInstead="Long wind cable run = voltage drop drives cable size, not current capacity. Always do Reg 525.202 + Appendix 4 Section 6.4 calc. Step up cable size to keep voltage drop comfortable (≤2-3% target, not at 5% limit). Worked example: 80 m × 26 A; 10 mm² SWA = 4.0% drop (tight); 16 mm² SWA = 2.5% drop (comfortable); 25 mm² SWA = 1.5% drop (premium). The cost differential is small vs the inverter trip + customer impact. Cert evidence bundle records Appendix 4 calc explicitly."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Wind microgeneration is Section 551 generating set (Reg 551.1.1(b) turbines). Reg 551.7.5 anti-islanding mandatory + integrated in grid-tie inverter.',
              'HAWT (Horizontal Axis) dominates micro-wind. VAWT (Vertical Axis — Darrieus / Savonius) suits urban / turbulent / low-wind niche.',
              'MCS MIS 3003 small wind installer standard ≤50 kW. Required for grant + UK competence baseline.',
              'BS EN 61400-2 small wind turbine product standard. BS EN 50549-1 LV generator grid-connection standard.',
              'EREC G98 fast-track only ≤16 A per phase. Most domestic / commercial micro-wind (>3 kW) triggers G99 formal application.',
              'Long cable run from mast to indoor inverter (50-200 m) — Reg 525.202 voltage drop ≤5% is the cable sizing constraint, not current capacity.',
              '16 mm² SWA typical for 6-10 kW units at 50-100 m; 25 mm² for longer runs. Buried 600 mm deep + armour as CPC per Reg 543.',
              'Dump load mandatory: resistor bank dissipates wind-driven generation when grid lost. Sized to match turbine rated power. Engages automatically on grid-loss + mechanical brake follows.',
              'Planning permission usually required (PDR limited to ≤11.1 m height / ≤4 m above ridge); 8-16 week timeline + visual / noise / shadow flicker assessment for residential-proximity sites.',
              'Site wind assessment: NOABL UK wind speed database desktop; on-site anemometer 6-12 months at hub height for ≥5 kW or marginal NOABL site.',
              'UK 2025-26 reality: domestic micro-wind small market vs solar PV; commercial / agricultural / rural community wind continues. Honest customer comparison: PV easier + cheaper + more predictable at most sites.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                The other-LCT landscape + Section 551 framework
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                9.3 Solar thermal (collectors + electrical scope)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
