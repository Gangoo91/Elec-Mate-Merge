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
import { UkYieldHeatmap, AzimuthTiltPolar, ShadingTopology, PrWaterfall } from '@/components/study-centre/diagrams/renewablePvSiting';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm3s1-uk-resource',
    question:
      'What is the typical UK PV annual yield in kWh per kWp installed for a well-designed south-facing array?',
    options: [
      'About 300–500 kWh/kWp/year, fairly uniform across the whole of the UK',
      'About 850–1,100 kWh/kWp/year, varying by region',
      'About 5,000 kWh/kWp/year for a typical south-facing UK array',
      'About 100 kWh/kWp/year, even on a well-designed south-facing roof',
    ],
    correctIndex: 1,
    explanation:
      'Real-world UK PV installs deliver 850–1,100 kWh per kWp installed per year on a well-designed south-facing array with 30–40° tilt. The geographical variation tracks solar resource — south-east England (~1,050–1,100), midlands (~950–1,000), northern England / Wales (~900–950), Scotland (~850–950). PVGIS (the European Commission JRC tool) is the operational reference for modelled yield; the figure is the realistic post-derating expectation, not the STC nameplate.',
  },
  {
    id: 'm3s1-azimuth',
    question:
      'For maximum annual yield in the UK, what is the optimal PV array azimuth (compass orientation)?',
    options: [
      'North-facing (0° / 360°), capturing the sun across the northern sky',
      'South-facing (180°)',
      'East-facing only (90°), peaking in the morning for the best annual yield',
      'Any orientation works equally well for annual yield in the UK',
    ],
    correctIndex: 1,
    explanation:
      'South-facing (azimuth 180°) maximises annual yield in the northern hemisphere because the sun spends most of the day in the southern sky. East- or west-facing arrays produce well (~80–85% of south-facing) but with different daily profiles — east peaks in the morning, west peaks in the afternoon. North-facing PV in the UK loses ~50% or more vs south-facing and is rarely commercially viable for grid-tied installs.',
  },
  {
    id: 'm3s1-tilt',
    question:
      'For UK latitudes, what is the optimal PV array tilt for annual yield?',
    options: [
      'Vertical (90°), as used on a south-facing wall array',
      'About 30–40°',
      'Flat (0°), laid horizontally to catch the high summer sun',
      'A steep 60–70° tilt as the optimum for all UK latitudes',
    ],
    correctIndex: 1,
    explanation:
      'The annual-yield optimum tilt approximates the site latitude × 0.7–0.9 — for UK latitudes (50–58°N), this gives 30–40°. Flatter tilts capture more summer sun (high-elevation midday) but miss winter (low-elevation); steeper tilts do the opposite. The 30–40° range balances the annual sum. UK roof pitches are typically 30–45°, often close to optimal; the practical loss from sub-optimal tilt is usually 5–10% vs the theoretical optimum.',
  },
  {
    id: 'm3s1-shading-impact',
    question:
      'A chimney casts a shadow over 2 modules in a 12-module string for 3 hours per day. What is the realistic impact on string yield without module-level optimisation?',
    options: [
      'Loss roughly proportional to the shaded area, about 16% in the shade window',
      'Much higher than the shaded area, around 30–40% in-window',
      'Zero impact, because the bypass diodes fully compensate for the shade',
      'Total failure of the entire string for as long as any shade is present',
    ],
    correctIndex: 1,
    explanation:
      'Partial shading on a series string is more damaging than proportional to the shaded area. Bypass diodes (Section 2.2) limit the damage but bypass the entire affected sub-string (typically 20 cells per diode on a 60-cell module). For a 2-module shade affecting one sub-string per module, ~6.7% of the module is in shadow but ~33% of each module\'s output is lost during the shade window. Total string yield loss in the shade window can reach 30–40%; annualised across the day, ~10–15%. Module-level optimisation (microinverters or power optimisers) recovers most of this loss.',
  },
  {
    id: 'm3s1-performance-ratio',
    question:
      'PVGIS yield modelling applies a performance ratio (PR) to scale from STC nameplate to real-world yield. What is the typical PR for a well-designed UK install, and what does it account for?',
    options: [
      'PR = 1.0, with no derating between nameplate and real-world yield',
      'PR ≈ 0.75–0.85, covering temperature, soiling, mismatch and inverter losses',
      'PR = 0.20, the array delivering only a fifth of nameplate output',
      'PR = 1.50, a performance gain over the STC nameplate',
    ],
    correctIndex: 1,
    explanation:
      'Performance ratio (PR) is the ratio of actual annual yield to the theoretical maximum that the STC nameplate × annual irradiance would predict. PR captures all the real-world losses: temperature derate (typically the largest single loss — 5–10%), soiling (1–3%), mismatch (1–3%), inverter conversion (3–5%), DC and AC cable losses (1–3%), inverter standby and downtime (1–2%). A well-designed UK install achieves PR ≈ 0.80; PR below 0.70 signals design or maintenance problems. The cert evidence bundle records the modelled PR used in the design pack.',
  },
  {
    id: 'm3s1-712-512',
    question:
      'BS 7671 Reg 712.512.2.1 sets a requirement on installer responsibility for site conditions. What does it require?',
    options: [
      'Nothing site-specific; heat dissipation is left entirely to the manufacturer',
      'Adequate heat dissipation under the site\'s maximum solar radiation conditions',
      'Modules must be actively water-cooled to meet the heat dissipation requirement',
      'The requirement applies only to sites above 500 m altitude',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.512.2.1 makes the installer responsible for the site-specific thermal assessment. The standard practical translation: the 70–100 mm standoff above the roof (Section 2.6) plus the manufacturer\'s mounting spec. For high-altitude / low-latitude sites where irradiance can exceed typical UK levels, the assessment must reflect that — additional cooling arrangement may be required. The cert evidence bundle records the site\'s max solar radiation assumption and the resulting mounting / cooling arrangement.',
  },
  {
    id: 'm3s1-pvgis-modelling',
    question:
      'For an MCS MIS 3002 design pack, what tool is typically used for PV yield modelling, and what inputs does it need?',
    options: [
      'Manual calculation only, from STC nameplate and an assumed number of sun hours',
      'PVGIS or equivalent, taking location, azimuth, tilt, nameplate and losses',
      'The customer\'s own gut feeling about how sunny the site is',
      'Just the inverter datasheet, read directly for the expected yield',
    ],
    correctIndex: 1,
    explanation:
      'PVGIS is the free, widely-used PV yield modelling tool. It pulls long-term irradiance data from satellite measurements for any UK location, applies the user\'s array configuration (azimuth, tilt, module nameplate, system losses), and returns the modelled annual yield in kWh. MCS MIS 3002 design pack expects the PVGIS modelling (or equivalent commercial tool like PVsyst for larger systems) as part of the design evidence. The cert evidence bundle includes the PVGIS report or screenshot.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A customer in southern England with a south-facing roof, 30° tilt, no shading, wants a 5 kWp install. Modelled annual yield?',
    options: [
      'About 5,000–5,500 kWh/year, near the UK optimum',
      'About 500 kWh/year from a south-facing 5 kWp array in southern England',
      'About 50,000 kWh/year from a domestic 5 kWp south-facing roof',
      'No usable yield, because southern England is too far north for PV',
    ],
    correctAnswer: 0,
    explanation:
      'Southern England + south-facing + 30° tilt + no shading is close to the UK theoretical optimum. PVGIS-modelled annual yield typically 1,000–1,100 kWh per kWp installed; for a 5 kWp array that gives 5,000–5,500 kWh per year. The figure includes PR derating; STC nameplate alone would predict ~5,200–5,700 kWh without losses. Customer self-consumption + SEG export should be modelled separately to inform the financial case.',
  },
  {
    id: 2,
    question:
      'A customer with an east-west split roof (50/50) wants PV across both sides. Compared with an equivalent capacity on south-only, what\'s the realistic yield?',
    options: [
      'The same yield as an equivalent south-only array of the same capacity',
      'Roughly triple the yield of an equivalent south-only array',
      'About 85–90% of equivalent south-only yield, with a flatter daily profile',
      'Effectively zero yield, because the two sides cancel each other out',
    ],
    correctAnswer: 2,
    explanation:
      'East-west arrays trade peak yield for daily profile flatness. Each side individually produces ~80–85% of south-facing; combined the array typically delivers ~85–90% of equivalent south-only yield. The flatter daily profile (morning east peak + afternoon west peak vs single midday south peak) often matches household consumption better — improving self-consumption ratio and reducing reliance on battery storage. PVGIS models each orientation independently.',
  },
  {
    id: 3,
    question:
      'The PWI common-mistakes list flags &ldquo;ignoring shading from nearby objects&rdquo; as a high-frequency error. What\'s the survey-stage discipline to avoid it?',
    options: [
      'Glance at the sky on the day and note whether it seems clear or overcast',
      'Advise the customer to remove every tree near the proposed array',
      'Switch the proposal to a ground-mount array in the garden as standard',
      'Walk the array area, capture the annual shading pattern with a shade-analysis tool, and produce a shading factor',
    ],
    correctAnswer: 3,
    explanation:
      'Shading survey discipline is a Module 1 Section 6 standing item. The competent surveyor walks the proposed array area, identifies shading sources, tracks the shading pattern across day and year using a shade-analysis tool, and produces an objective shading factor (typically expressed as a percentage of total annual irradiance lost to shade). The factor feeds the PVGIS / equivalent modelling. Architectural mitigation (multi-MPPT inverter or module-level optimisation) recovers most shading losses on heavily-shaded arrays.',
  },
  {
    id: 4,
    question:
      'A customer in Scotland with a 30° south-facing roof wants 6 kWp. The expected annual yield is materially lower than a comparable south-east England install. By how much, approximately?',
    options: [
      'Roughly 10–20% lower, but still commercially viable',
      'The same yield, since latitude makes no practical difference within the UK',
      'Roughly triple the yield, because Scottish air is clearer at altitude',
      'About half the yield of the same array in south-east England',
    ],
    correctAnswer: 0,
    explanation:
      'Scotland\'s solar resource is ~10–15% below south-east England — higher latitude (lower solar elevation) and higher annual cloud cover. The PVGIS model handles location precisely; the customer\'s expected yield is set by the modelling, not by a national average. Scottish PV installs remain commercially viable — the unit cost is similar to England, the yield is ~85–90% of the south-east, and the SEG / Home Energy Scotland framework supports the commercial case.',
  },
  {
    id: 5,
    question:
      'Performance ratio (PR) on a UK install is modelled at 0.80 in the design pack. After 12 months of operation, the customer\'s measured PR is 0.72. Most likely cause:',
    options: [
      'A modelling error in the original PVGIS yield figure, not real underperformance',
      'The customer simply using more household electricity than was expected',
      'Real underperformance, such as soiling, uncaptured shading or inverter losses',
      'A fault in the solar resource itself rather than in the installation',
    ],
    correctAnswer: 2,
    explanation:
      'A measured PR significantly below modelled is the customer\'s performance fault investigation trigger. Common causes: soiling (clean the array — UK installs often need 1–2 cleans per year in dusty or bird-active locations); previously-unidentified shading; inverter MPPT operating off-MPP (string sizing fault); DC fault at module or connector level; degraded module (rare at year 1). The competent contractor diagnoses with module-level V_oc / I_sc readings against the commissioning baseline (Section 2.3).',
  },
  {
    id: 6,
    question:
      'BS 7671 Reg 712.512.2.1 sets a requirement on installer responsibility for the site\'s &ldquo;maximum solar radiation&rdquo;. What does this mean in practice for a UK install?',
    options: [
      'No practical impact on a typical UK domestic install whatsoever',
      'PV is prohibited outright at any high-irradiance site in the UK',
      'Only manual or active water cooling of the modules is permitted',
      'Record the site\'s max solar radiation and evidence the thermal spec is met',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 712.512.2.1 makes the installer responsible for the site-specific thermal assessment. For typical UK domestic sites, maximum solar radiation is the STC reference 1,000 W/m² — and the standard 70–100 mm standoff plus manufacturer mounting spec satisfies the requirement. For high-altitude sites, low-latitude sites (less relevant for the UK), or sites with high reflective ground (snow cover, water surfaces) the irradiance assessment may need to reflect higher peak values. The cert evidence bundle captures the assessment and the resulting mounting arrangement.',
  },
  {
    id: 7,
    question:
      'A residential PV install proposes 4 kWp on a south-facing roof of 25° tilt with a chimney casting partial shade on 2 modules from 2–4 pm in summer. PVGIS modelling without shading shows 4,400 kWh/year. With shading factored?',
    options: [
      'Identical to 4,400 kWh, since partial shade has no annual effect',
      'About 4,000–4,200 kWh/year, a 5–10% loss',
      'Zero yield, because shading on two modules disables the whole array',
      'Double the yield, as the shaded modules cool and the rest run harder',
    ],
    correctAnswer: 1,
    explanation:
      'Partial shading from a chimney on 2 of 12 modules during the peak production window typically costs 5–10% of annual yield on a string-level architecture. Module-level optimisation (microinverters or power optimisers) recovers most of the loss — typically reducing the annual hit to 1–2%. PVGIS includes a shading factor input that can be tuned to match the actual shading topology; the design pack records the input and the resulting modelled yield.',
  },
  {
    id: 8,
    question:
      'PVGIS is the standard PV yield modelling tool for UK MCS-funded installs. What is it, and what makes it the operational reference?',
    options: [
      'A paid commercial design product licensed per install in the UK',
      'A free European Commission JRC tool using satellite irradiance data',
      'A government regulator that approves all PV grid connections',
      'A simple measure of the customer\'s own preferred yield figure',
    ],
    correctAnswer: 1,
    explanation:
      'PVGIS (Photovoltaic Geographical Information System) is the European Commission JRC\'s free PV yield modelling tool. Long-term satellite-derived irradiance data, open methodology, transparent algorithm — the de facto operational reference for UK PV yield modelling. Free at <code>re.jrc.ec.europa.eu/pvg_tools</code>. Commercial alternatives (PVsyst, HelioScope) offer more design features for larger commercial installs but PVGIS is the standard for residential and small commercial. The cert evidence bundle typically includes the PVGIS report or screenshot.',
  },
];

const faqs = [
  {
    question:
      'What is "Peak Sun Hours" (PSH) and how does it relate to PV yield?',
    answer:
      'Peak Sun Hours (PSH) is the daily average number of hours of equivalent full STC irradiance (1,000 W/m²) that the site receives. UK PSH varies geographically — ~2.5–3.0 PSH/day in south-east England, ~2.0–2.5 PSH/day in midlands, ~1.5–2.0 PSH/day in Scotland (annual average). Yield estimate: PV array kWp × PSH × 365 × performance ratio = annual kWh. PSH is a simplified metric; PVGIS uses the underlying hourly irradiance data and is more accurate.',
  },
  {
    question:
      'How accurate is PVGIS modelling vs measured yield?',
    answer:
      'For a well-designed UK install with accurate PVGIS inputs (orientation, tilt, shading factor, performance ratio), modelled yield typically matches measured yield within ±5% over a 12-month period. Larger deviations indicate either modelling input errors (incorrect shading factor, wrong tilt, missing system losses) or operational issues (soiling, partial faults, inverter underperformance). PVGIS is well-validated against measured installs across Europe; the modelling methodology is published and peer-reviewed.',
  },
  {
    question:
      'Does the UK PV resource degrade significantly with cloud cover?',
    answer:
      'UK cloud cover reduces direct irradiance but the diffuse irradiance component remains significant — PV cells respond to both direct and diffuse light. Heavy cloud cover reduces irradiance to ~10–20% of clear-sky values; thin cloud reduces it to ~50–70%. UK annual cloud cover is high (~60% average), which is why UK PV yield is lower than southern Europe — but the diffuse component keeps annual yield commercially viable. PVGIS includes both direct and diffuse irradiance in its modelling.',
  },
  {
    question:
      'How does seasonal yield vary across the UK?',
    answer:
      'UK PV yield is highly seasonal — June typically delivers 4–6× the yield of December. April–September accounts for ~75% of annual yield; October–March accounts for ~25%. The high temperature in summer reduces module efficiency (Section 2.1 temperature coefficient), but the long days and high irradiance dominate the annual sum. The April-vs-July paradox (Section 2.1) — April sometimes outperforms July on a per-module basis due to lower cell temperatures — is real but doesn\'t change the overall summer dominance.',
  },
  {
    question:
      'What\'s the optimal tilt for an off-grid / wintertime-priority install?',
    answer:
      'For installs that prioritise wintertime production (off-grid systems where winter battery autonomy matters more than peak summer yield), a steeper tilt — typically 50–60° at UK latitudes — captures more low-elevation winter sun. The trade-off is reduced summer yield (the array is too steep for the high midday summer sun). Grid-tied installs targeting annual yield should use the 30–40° optimum; off-grid installs prioritising winter should use the steeper tilt.',
  },
  {
    question:
      'How significant is the temperature derate at typical UK summer roof conditions?',
    answer:
      'On a typical UK summer day, ambient temperature 20–25°C, cell temperature on a properly-mounted roof reaches 45–55°C (10–15°C above ambient with 70–100 mm standoff cooling; higher without proper standoff). At a P_max temperature coefficient of -0.4 %/°C, the temperature delta from STC 25°C drives ~8–12% power reduction during peak summer hours. The annual average derate is smaller (~3–5%) because cool spring and autumn days partially compensate. The 70–100 mm standoff (Section 2.6 and Module 3 Section 3) is the standard mitigation.',
  },
  {
    question:
      'How does Reg 712.512.2.1 interact with the manufacturer\'s mounting spec on a high-altitude UK site?',
    answer:
      'Reg 712.512.2.1 requires the installer to ensure adequate heat dissipation under conditions of maximum solar radiation for the site. For a high-altitude UK site (e.g. above 500 m in the Scottish Highlands), irradiance can exceed sea-level values by 5–10% — slightly higher cell operating temperatures. The installer\'s response: read the manufacturer\'s mounting spec for the upper end of the rated operating temperature range, verify the 70–100 mm standoff still delivers adequate cooling, and record the assessment in the cert evidence bundle. For most UK sites the standard mitigation is sufficient.',
  },
  {
    question:
      'What\'s the practical workflow for capturing shading at survey stage?',
    answer:
      'Three steps. (1) Walk the proposed array area at survey, photograph all shading sources (trees, chimneys, neighbouring buildings, distant horizon). (2) Use a shade-analysis tool — purpose-built (SunEye, Solmetric SunEye 210), mobile-app-based (Sun Surveyor, PV Optimize), or manual using a clinometer / azimuth measurement and shading-template overlay. (3) Produce a shading factor (typically 0.95–1.00 for unshaded, dropping to 0.85–0.90 for moderate shading, 0.70–0.85 for heavy shading) that feeds the PVGIS / equivalent yield modelling. The cert evidence bundle captures the tool output and the resulting factor.',
  },
  {
    question:
      'How does the IET Code of Practice for Grid-Connected Solar PV Installations cover yield modelling and shading?',
    answer:
      'The IET CoP for Grid-Connected Solar PV Installations (currently 5th edition) is the operational complement to BS 7671 Section 712. It covers shading survey methodology, performance ratio estimation, the inputs and outputs expected from yield modelling tools, and the cross-reference to MIS 3002 design pack requirements. GN3 cross-references the IET CoP for the detailed PV inspection-and-test procedures. The cert evidence bundle on an MCS-funded install typically references both the IET CoP and the PVGIS / equivalent modelling output.',
  },
];

export default function RenewableEnergyModule3Section1() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Irradiance, orientation, tilt & shading | Renewable Energy 3.1 | Elec-Mate',
    description:
      'The PV design foundations — UK solar resource, azimuth and tilt effects on yield, shading topology analysis, PVGIS modelling, performance ratio derating, and the BS 7671 Reg 712.512.2.1 site-radiation responsibility.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · BS 7671:2018+A4:2026"
            title="Irradiance, orientation, tilt & shading"
            description="The PV design foundations — UK solar resource, azimuth and tilt effects, shading topology analysis, PVGIS modelling, performance ratio derating, and the BS 7671 Reg 712.512.2.1 site-radiation responsibility."
            tone="yellow"
          />

          <TLDR
            points={[
              'UK PV annual yield typically 850–1,100 kWh per kWp installed for a south-facing array — south-east England at the upper end, Scotland at the lower end. PVGIS is the standard yield modelling tool and the operational reference for MCS MIS 3002 design packs.',
              'Optimal azimuth is south-facing (180°); east / west typically lose 15–20% vs south; north loses ~50%+. Optimal tilt is 30–40° for UK latitudes; typical UK roof pitches (30–45°) are often close to optimal.',
              'Performance ratio (PR) typically 0.75–0.85 for well-designed UK installs — captures temperature derate, soiling, mismatch, inverter losses, cable losses. PR below 0.70 signals design or maintenance issues.',
              'Shading topology is a survey-stage discipline — identify sources, track across day and season, produce a shading factor for the design model. Module-level optimisation (microinverters / power optimisers from Section 2.5) recovers most shading losses.',
              'BS 7671 Reg 712.512.2.1 makes the installer responsible for ensuring adequate heat dissipation under the site\'s maximum solar radiation conditions. The 70–100 mm standoff plus manufacturer mounting spec is the standard mitigation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Estimate UK PV annual yield for any site using PVGIS or equivalent tools — south-facing, east-west split, and shaded arrays.',
              'Apply the azimuth and tilt optima for UK installs and quantify the loss from sub-optimal orientations.',
              'Model the performance ratio (PR) for a UK install and identify the loss components that contribute to it.',
              'Run a shading topology survey — identify sources, track across day and season, produce an objective shading factor.',
              'Apply BS 7671 Reg 712.512.2.1 site-radiation responsibility through the 70–100 mm standoff and manufacturer mounting spec.',
              'Read PVGIS modelling output as the operational evidence for MCS MIS 3002 design packs and the cert evidence bundle.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>South-facing, 30–40° tilt, no shade — the UK PV theoretical optimum.</Pullquote>

          <ContentEyebrow>The UK solar resource — what we\'re working with</ContentEyebrow>

          <ConceptBlock
            title="UK PV yield by geography — the realistic expectation"
            plainEnglish="UK PV produces 850–1,100 kWh per kWp installed per year on a well-designed south-facing array. The geographical variation tracks solar resource: south-east England at the top, Scotland at the bottom."
            onSite="PVGIS is the operational tool. Plug in the postcode, the array azimuth and tilt, the module type, the system losses. The output is the modelled annual and monthly yield in kWh. Used directly in the MCS MIS 3002 design pack."
          >
            <p>UK PV annual yield ranges by region:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">South-east England</strong> (Kent, Sussex,
                London) — 1,050–1,100 kWh/kWp/year. The UK\'s highest solar resource
                region.
              </li>
              <li>
                <strong className="text-white">South-west England, Wales</strong> — 1,000–1,050
                kWh/kWp/year. Slightly higher cloud cover than the south-east.
              </li>
              <li>
                <strong className="text-white">Midlands</strong> — 950–1,000 kWh/kWp/year.
              </li>
              <li>
                <strong className="text-white">Northern England</strong> — 900–950
                kWh/kWp/year.
              </li>
              <li>
                <strong className="text-white">Scotland</strong> — 850–950 kWh/kWp/year.
                Higher latitude (lower solar elevation) and higher annual cloud cover.
                Still commercially viable.
              </li>
            </ul>
            <p>
              These figures assume a well-designed south-facing 30–40° tilt install with
              minimal shading and a performance ratio around 0.80. The PVGIS model
              handles each location precisely from satellite-derived long-term irradiance
              data; the customer\'s modelled yield is set by the modelling, not by a
              national average.
            </p>
          </ConceptBlock>

          <UkYieldHeatmap
            caption="UK PV yield heat map — colour-coded annual yield in kWh/kWp/year across England, Scotland, Wales and Northern Ireland. Highest values in south-east England (1,050–1,100); lowest in northern Scotland (850–900). Annotated with the PVGIS source data and the typical performance ratio assumption."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Orientation (azimuth) and tilt — the two design variables</ContentEyebrow>

          <Pullquote>South for peak yield. East-west for daily-profile match. North rarely viable.</Pullquote>

          <ConceptBlock
            title="Azimuth — orientation effect on yield"
            plainEnglish="In the UK (northern hemisphere) the sun spends most of the day in the southern sky. South-facing arrays maximise annual yield. East and west lose ~15–20% vs south. North-facing loses ~50%+ — rarely commercially viable."
            onSite="The UK roof landscape dictates orientation more than design preference. South-facing roofs are the optimal target; east-west splits are common and viable; north-facing-only customers are typically directed to ground-mount or BIPV alternatives."
          >
            <p>Annual yield by azimuth (relative to south-facing = 100%):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>South (180°) — 100% (reference)</li>
              <li>SE / SW (135° / 225°) — 96–98%</li>
              <li>E / W (90° / 270°) — 80–85%</li>
              <li>NE / NW (45° / 315°) — 60–70%</li>
              <li>North (0° / 360°) — 45–55%</li>
            </ul>
            <p>
              East-west split arrays (modules across both sides of a typical UK roof
              ridge) are common — each side individually produces ~80–85% of south-facing,
              but the combined array delivers ~85–90% of equivalent south-only capacity
              with a flatter daily profile. The flatter profile (morning east peak +
              afternoon west peak vs single midday south peak) often matches household
              consumption better — improving self-consumption ratio.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Tilt — and why 30–40° is the UK optimum"
            plainEnglish="Tilt approximates the average solar elevation across the year. For UK latitudes, 30–40° balances summer (high sun) and winter (low sun)."
            onSite="UK domestic roofs are typically 30–45° pitch — close to optimal. The practical loss from following the existing roof pitch rather than optimising is usually 5–10% vs theoretical optimum. Modifying the roof structure to chase the theoretical optimum is rarely justified."
          >
            <p>Tilt-effect rules of thumb for UK installs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">0° (flat)</strong> — 90–93% of optimum.
                Common on flat roofs with ballasted frames; can rotate modules to face
                south on the frame
              </li>
              <li>
                <strong className="text-white">15–25° (low pitch)</strong> — 95–98% of
                optimum. Favours summer slightly; loses some winter
              </li>
              <li>
                <strong className="text-white">30–40° (standard UK roof pitch)</strong> —
                99–100% of optimum
              </li>
              <li>
                <strong className="text-white">45–55° (steep)</strong> — 97–99% of optimum.
                Favours winter slightly; loses some summer
              </li>
              <li>
                <strong className="text-white">60–70° (very steep, off-grid winter-
                priority)</strong> — 85–90% of annual optimum, but better winter
                performance for off-grid systems where battery autonomy matters
              </li>
              <li>
                <strong className="text-white">90° (vertical)</strong> — 65–75% of optimum.
                Used for BIPV façades and similar architectural-led installs
              </li>
            </ul>
          </ConceptBlock>

          <AzimuthTiltPolar
            caption="Azimuth and tilt yield polar diagram — circular plot showing annual yield as a percentage of optimum across all azimuth and tilt combinations. South-facing 30–40° at the centre at 100%. East / west at ~80–85%. North-facing at ~45–55%. Practical UK roof pitch range (30–45°) highlighted as the &lsquo;sweet spot&rsquo; band."
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Shading topology — the survey-stage discipline</ContentEyebrow>

          <Pullquote>Shading is the silent yield-killer. Survey it properly or lose 10–30%.</Pullquote>

          <ConceptBlock
            title="Shading sources and their impact on PV yield"
            plainEnglish="Anything that blocks sunlight from the array reduces yield. Trees, chimneys, neighbouring buildings, distant horizon objects. The impact is often disproportionate to the shaded area because of bypass-diode behaviour on series strings."
            onSite="The competent surveyor walks the proposed array area at survey, identifies every shading source, tracks how shadows move across the day and seasons, and produces an objective shading factor. The factor feeds the PVGIS modelling. Architectural mitigation (multi-MPPT or module-level optimisation) follows from the analysis."
          >
            <p>Common shading sources on UK installs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Trees</strong> — seasonal variation
                (deciduous vs evergreen), morning vs afternoon shade direction, growth
                over the install\'s 25-year life
              </li>
              <li>
                <strong className="text-white">Chimneys</strong> — small footprint but
                cast long shadows in early morning and late afternoon, particularly in
                winter
              </li>
              <li>
                <strong className="text-white">Neighbouring buildings</strong> — fixed
                in position; predictable shadow pattern; particularly relevant for
                installs in urban / suburban density
              </li>
              <li>
                <strong className="text-white">Self-shading</strong> — the roof itself
                (dormers, gables) or array-on-array shading (front rows shading back
                rows on flat-roof tilted installs)
              </li>
              <li>
                <strong className="text-white">Distant horizon</strong> — hills, larger
                buildings in the distance — relevant at low solar elevation (winter
                mornings / late afternoons)
              </li>
            </ul>
            <p>The disproportionate impact of partial shading:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                A single shaded cell can trigger bypass-diode bypass of the entire
                20-cell sub-string (Section 2.2) — losing 1/3 of the module\'s output
                rather than the shaded fraction
              </li>
              <li>
                Series-string mismatch from shaded modules drags the unshaded modules to
                the lower current — losing more than the shaded area alone (Section 2.3)
              </li>
              <li>
                A 2-module shade on a 12-module string can cost 30–40% during the shade
                window — 10–15% annualised
              </li>
              <li>
                Module-level optimisation (microinverters or power optimisers — Section
                2.5) recovers most of the loss by operating each module at its own MPP
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Shade analysis tools — capturing the topology objectively"
            plainEnglish="Hand-waving the shading at survey produces unreliable yield estimates. Objective tools — purpose-built or mobile-app-based — capture the annual shading pattern numerically and feed the PVGIS modelling."
            onSite="Three tool categories used in UK PV surveys: dedicated hardware (SunEye, Solmetric SunEye 210); mobile apps (Sun Surveyor, PV Optimize, HelioScope mobile); manual methods (clinometer + azimuth measurement + shading-template overlay). Each produces a shading factor expressed as a percentage of total annual irradiance retained."
          >
            <p>The shading-factor methodology:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Stand at the array location</strong> —
                ideally at the lower edge of the proposed array (the most-shaded point)
              </li>
              <li>
                <strong className="text-white">Capture the sky horizon</strong> — point
                the tool at the full sky hemisphere and identify the horizon line
                including all obstructions (trees, buildings, chimneys)
              </li>
              <li>
                <strong className="text-white">Overlay the annual sun path</strong> — the
                tool calculates the sun\'s position across all hours of all days at the
                site latitude
              </li>
              <li>
                <strong className="text-white">Compute the shading factor</strong> — the
                ratio of unshaded annual irradiance to clear-sky annual irradiance.
                Typical values: 0.95–1.00 for unshaded; 0.85–0.95 for light shading;
                0.70–0.85 for moderate; below 0.70 for heavy shading (module-level
                optimisation mandatory)
              </li>
              <li>
                <strong className="text-white">Feed into PVGIS</strong> — the system
                losses input on PVGIS accepts a shading-factor-equivalent &ldquo;system
                losses&rdquo; percentage
              </li>
            </ul>
          </ConceptBlock>

          <ShadingTopology
            caption="Shading topology example — fish-eye sky view from a proposed array location showing horizon obstructions (trees, neighbouring building, chimney) overlaid with the annual sun path. The shaded portion of the sun path (where obstructions cross the path) represents the lost annual irradiance. Shading factor calculated as 1 minus the shaded portion."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Performance ratio — STC nameplate to real-world yield</ContentEyebrow>

          <Pullquote>Performance ratio is where the STC nameplate meets the UK weather.</Pullquote>

          <ConceptBlock
            title="What performance ratio captures — and what good looks like"
            plainEnglish="STC nameplate × annual irradiance × performance ratio = annual yield. PR captures all the losses between the lab and the cert: temperature, soiling, mismatch, inverter, cables."
            onSite="A well-designed UK install achieves PR ≈ 0.80. PR below 0.70 signals problems — design fault, install fault, or operational issue. The PR is recorded in the MCS MIS 3002 design pack as the modelling assumption; the cert evidence bundle compares modelled vs measured after the first year of operation."
          >
            <p>The performance ratio loss components on a typical UK install:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Temperature derate</strong> — typically 5–10%
                annual average loss. Largest single PR component. The 70–100 mm standoff
                discipline (Section 2.6) is the standard mitigation
              </li>
              <li>
                <strong className="text-white">Soiling</strong> — typically 1–3% annual
                average. Dust, pollen, bird droppings, leaves. Cleaning frequency 1–2
                times per year on typical UK domestic installs
              </li>
              <li>
                <strong className="text-white">Mismatch losses</strong> — typically 1–3%
                on a well-designed install. Higher on multi-orientation or mixed-module
                arrays without multi-MPPT or module-level optimisation
              </li>
              <li>
                <strong className="text-white">Inverter conversion losses</strong> —
                typically 3–5%. Modern inverters achieve 96–98% Euro efficiency
              </li>
              <li>
                <strong className="text-white">DC cable losses</strong> — typically 1–2%
                on a well-sized install
              </li>
              <li>
                <strong className="text-white">AC cable losses</strong> — typically 1–2%
                from inverter to consumer unit
              </li>
              <li>
                <strong className="text-white">Inverter standby and downtime</strong> —
                typically 1–2% from inverter not operating at low irradiance or scheduled
                maintenance
              </li>
            </ul>
            <p>
              The sum of these losses gives the overall PR. A typical UK install: 100%
              × (1 − 0.075 − 0.02 − 0.02 − 0.04 − 0.015 − 0.015 − 0.015) ≈ 0.80.
              Real-world measured PR depends on the specific install, the local
              conditions, and the maintenance regime.
            </p>
          </ConceptBlock>

          <PrWaterfall
            caption="Performance ratio waterfall diagram — starting from 100% STC nameplate, subtracting each loss component (temperature, soiling, mismatch, inverter, DC cable, AC cable, downtime) to arrive at the realistic PR of ~0.80 for a well-designed UK install. Each loss component labelled with the typical percentage."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 Reg 712.512.2.1 — site-radiation responsibility</ContentEyebrow>

          <ConceptBlock
            title="The installer\'s thermal assessment for the site"
            plainEnglish="BS 7671 makes the installer responsible for ensuring the install handles the site\'s maximum solar radiation condition. For most UK sites this is the STC reference 1,000 W/m²; for high-altitude or low-latitude sites it can be higher."
            onSite="The standard mitigation for most UK installs is the 70–100 mm standoff above the roof + the manufacturer\'s mounting spec. For unusual sites (high altitude, reflective surroundings, low latitude) the assessment may require additional cooling arrangements."
          >
            <p>The assessment workflow per Reg 712.512.2.1:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Site irradiance assessment</strong> —
                record the assessed maximum solar radiation for the site. For most UK
                domestic sites, ~1,000 W/m² (STC reference). For high-altitude / low-
                latitude / reflective-surroundings sites, may be higher
              </li>
              <li>
                <strong className="text-white">Module thermal spec</strong> — read the
                manufacturer\'s spec for module operating temperature at the site\'s
                maximum solar radiation. Modules typically rated for cell temperatures
                up to ~85°C
              </li>
              <li>
                <strong className="text-white">Mounting arrangement</strong> — verify
                the install meets the manufacturer\'s mounting spec at the site\'s
                maximum solar radiation. 70–100 mm standoff above the roof for natural
                convection cooling is the standard discipline
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — record
                the site\'s max solar radiation assumption, the manufacturer\'s mounting
                spec, the as-installed mounting arrangement, and the resulting
                expected cell temperature range
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.512.2.1 — adequate heat dissipation at site\'s maximum solar radiation"
            clause="As specified by the manufacturer, the PV modules shall be installed in such a way that there is adequate heat dissipation under the conditions of maximum solar radiation for the site. The installer shall record the assessed maximum solar radiation for the site and evidence that installed clearances and mounting meet the manufacturer\'s thermal specifications for those conditions."
            meaning="Reg 712.512.2.1 makes the installer responsible for the site-specific thermal assessment. The 70–100 mm standoff plus manufacturer mounting spec is the standard mitigation for typical UK sites. High-altitude, low-latitude, or reflective-surroundings sites may require additional assessment and mitigation. The cert evidence bundle records the assessment."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>PVGIS — the operational modelling tool</ContentEyebrow>

          <Pullquote>PVGIS is the operational reference. Free, open, well-validated.</Pullquote>

          <ConceptBlock
            title="PVGIS workflow — from postcode to modelled yield"
            plainEnglish="PVGIS (Photovoltaic Geographical Information System) is the European Commission JRC\'s free online tool. Plug in the location, the array configuration, the system losses. Get back the modelled annual yield in kWh, plus the monthly breakdown."
            onSite="PVGIS is at re.jrc.ec.europa.eu/pvg_tools. Free. Required input: location (postcode or GPS), array peak power (kWp), orientation (azimuth), tilt, system losses (percentage). Output: annual and monthly yield in kWh, plus optional financial calculations. Used directly in the MCS MIS 3002 design pack."
          >
            <p>The PVGIS workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Step 1 — Location</strong>: enter the
                postcode or GPS coordinates. PVGIS pulls the long-term satellite-derived
                irradiance data for that location
              </li>
              <li>
                <strong className="text-white">Step 2 — System configuration</strong>:
                enter the array kWp, azimuth (0–360°), tilt (0–90°), and tracking type
                (typically &ldquo;fixed&rdquo; for residential)
              </li>
              <li>
                <strong className="text-white">Step 3 — System losses</strong>: enter the
                expected system losses as a percentage (typically 14–20% for a
                well-designed UK install, captures the inverse of the performance ratio)
              </li>
              <li>
                <strong className="text-white">Step 4 — Output</strong>: PVGIS returns
                the modelled annual yield in kWh, the monthly breakdown, the daily
                profile by month, and the optional financial calculations (LCoE, payback)
              </li>
              <li>
                <strong className="text-white">Step 5 — Save the report</strong>: PVGIS
                provides a CSV / PDF export. The cert evidence bundle includes the
                report as the modelling evidence
              </li>
            </ul>
            <p>
              Alternative commercial tools (PVsyst, HelioScope) offer more advanced
              features for larger commercial installs — detailed shading topology,
              per-string modelling, financial analysis with battery storage. For
              typical residential MCS-funded installs, PVGIS is sufficient and the
              standard reference.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A customer asks &lsquo;will PV work on my north-east-facing roof?&rsquo;"
            situation="A customer with no south, south-east, south-west, east, or west-facing roof space asks whether PV makes sense on their north-east-facing main roof (azimuth ~45°)."
            whatToDo="Honest yield modelling. PVGIS the north-east orientation: typical UK yield 60–70% of equivalent south-facing capacity. For a 4 kWp install: modelled yield ~2,500–3,000 kWh/year (vs ~4,000–4,400 for south-facing). The customer\'s expected savings reflect the lower yield; the financial case is materially weaker but not necessarily non-viable. Alternative considerations: (a) is there ANY south-facing roof space (even small)? (b) is ground-mount feasible in the garden? (c) is BIPV on a south-facing wall feasible? If genuinely north-east-only, present the modelled yield and the financial case honestly; the customer\'s informed decision is captured as a customer-acknowledged risk in the survey (Module 1 Section 6). Some customers will proceed regardless on environmental / energy-independence grounds; others will decline."
            whyItMatters="Yield modelling at survey-stage prevents the &ldquo;disappointed customer at year 1&rdquo; failure mode. North-east-only PV installs are real but the customer expectation must be set against the modelled yield, not against the optimistic south-facing comparison. The honest survey converts the customer\'s preferred outcome into the realistic project plan."
          />

          <Scenario
            title="A customer in Aberdeen vs a customer in Brighton — the geographical reality"
            situation="Two customers, both with 5 kWp south-facing 30° tilt installs, no shading. One in Aberdeen (Scotland, latitude ~57°N); one in Brighton (south coast England, latitude ~50.8°N)."
            whatToDo="PVGIS modelling each. Aberdeen: typical annual yield ~4,250–4,750 kWh (~850–950 kWh/kWp). Brighton: typical annual yield ~5,250–5,500 kWh (~1,050–1,100 kWh/kWp). The Aberdeen install delivers ~80–85% of the Brighton install\'s yield. The cost of installation is similar (or slightly higher in Aberdeen for transport / labour reasons). The customer\'s expected payback is therefore longer in Aberdeen than Brighton — but the install remains commercially viable in both locations, and the funding gates (SEG, BUS-equivalent in Scotland via Home Energy Scotland) work in both. The customer\'s decision is informed by the location-specific yield modelling, not by a UK-average figure."
            whyItMatters="UK PV viability varies geographically. Customers in northern locations sometimes assume PV won\'t work for them; customers in southern locations sometimes overestimate the yield. The PVGIS modelling at the exact location is the honest answer. The cert evidence bundle captures the modelling for both the customer record and the future EICR diagnostic baseline."
          />

          <CommonMistake
            title="Specifying PV without an objective shading analysis at survey"
            whatHappens="An installer visits a site with a nearby tree casting morning shade on the proposed array. The shade is noted as &ldquo;some morning shade&rdquo; in the survey but not analysed objectively. PVGIS modelling uses the default 14% system losses (no extra shading factor). The install commissions and underperforms the modelled yield by 15–20%. The customer queries the underperformance after 6 months. Investigation reveals the morning shade is more significant than the survey captured. Customer dispute follows."
            doInstead="Use a shade-analysis tool (SunEye, Solmetric, mobile app, or manual clinometer-and-template method). Produce an objective shading factor at survey stage. Feed it into PVGIS as the system losses input. The modelled yield reflects the actual shading reality; the customer\'s expectations are set against the realistic figure. Where shading is meaningful, propose module-level optimisation as part of the design (Section 2.5) to recover most of the loss."
          />

          <CommonMistake
            title="Sizing the install against STC nameplate, ignoring the performance ratio"
            whatHappens="An installer quotes &ldquo;5 kWp will deliver 5,000 kWh per year&rdquo; — treating 1 hour of full STC irradiance per kWp times 1,000 hours annual as the calculation basis. After install, the actual yield is ~4,000 kWh — 20% below the quoted figure. The customer assumes the install is underperforming and disputes."
            doInstead="Yield modelling must apply performance ratio. The realistic UK yield for a 5 kWp south-facing well-sited install is 4,500–5,500 kWh per year (depending on location and PR). The honest survey gives the PVGIS-modelled figure, not the STC-nameplate-times-hours calculation. Customer expectations match the modelled reality."
          />

          <CommonMistake
            title="Forgetting Reg 712.512.2.1 site-radiation assessment on the cert"
            whatHappens="An installer completes a high-altitude Scottish install without recording the site-radiation assessment in the cert evidence bundle. The MCS audit at year 1 flags the missing assessment as a major finding — the cert doesn\'t evidence compliance with Reg 712.512.2.1. Rectification requires retrospective documentation of the assumed irradiance, the manufacturer\'s thermal spec, and the as-installed mounting arrangement."
            doInstead="Record the site\'s assumed maximum solar radiation, the manufacturer\'s mounting spec, and the as-installed mounting arrangement in the cert evidence bundle at install stage. For typical UK sites the assessment is straightforward — 1,000 W/m² STC reference, manufacturer\'s standard mounting spec, 70–100 mm standoff per Section 2.6. For unusual sites the assessment captures the site-specific reasoning."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'UK PV annual yield typically 850–1,100 kWh per kWp installed for a south-facing array. South-east England at the top, Scotland at the bottom. PVGIS is the operational modelling tool.',
              'Optimal azimuth is south (180°); east / west loses ~15–20%; north loses ~50%+. Optimal tilt is 30–40°; UK roof pitches are typically close to optimal.',
              'Performance ratio (PR) typically 0.75–0.85 for well-designed UK installs. Captures temperature, soiling, mismatch, inverter and cable losses. PR below 0.70 signals problems.',
              'Shading topology is a survey-stage discipline — identify sources, track across day and season, produce an objective shading factor. Module-level optimisation recovers most shading losses.',
              'BS 7671 Reg 712.512.2.1 makes the installer responsible for adequate heat dissipation at the site\'s maximum solar radiation. 70–100 mm standoff + manufacturer mounting spec is the standard mitigation.',
              'PVGIS is the free European Commission JRC tool — long-term satellite-derived irradiance data, the operational reference for UK MCS MIS 3002 design packs.',
              'East-west split arrays deliver ~85–90% of equivalent south-only capacity but with a flatter daily profile that often matches household consumption better.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 PV system sizing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
