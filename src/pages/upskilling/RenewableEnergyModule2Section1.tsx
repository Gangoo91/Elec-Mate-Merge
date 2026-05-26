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
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm2s1-photovoltaic-effect',
    question:
      'What actually happens in a PV cell when sunlight hits it?',
    options: [
      'Sunlight heats the silicon and the heat is converted to electricity',
      'A photon of sufficient energy strikes a silicon atom, knocking an electron free; the electron-hole pair drifts across the p-n junction due to the built-in electric field, producing a voltage across the cell terminals',
      'Sunlight magnetises the silicon, generating an induced current',
      'Sunlight ionises the air gap above the cell',
    ],
    correctIndex: 1,
    explanation:
      'The photovoltaic effect is a quantum-electronic process. A photon delivers its energy to an electron in the silicon lattice; if the photon energy exceeds the silicon band gap (~1.1 eV), the electron is freed from its bond. The p-n junction\'s built-in electric field separates the electron-hole pair, producing a voltage across the cell. The cell is converting light directly to electrical energy — no thermal intermediate step, which is why PV efficiency does NOT improve with hotter cells (in fact, the opposite).',
  },
  {
    id: 'm2s1-cell-voltage',
    question:
      'A single crystalline silicon PV cell at standard test conditions (STC) produces approximately what open-circuit voltage?',
    options: [
      '12 V — like a car battery cell',
      'Approximately 0.55 to 0.70 V — set by the silicon band gap and the junction physics. Older P-type cells ~0.6 V; modern N-type / TOPCon / HJT cells ~0.65–0.70 V. Modules stack many cells in series to reach useful voltages',
      '230 V — direct mains voltage',
      'It varies between 1 V and 100 V depending on the module',
    ],
    correctIndex: 1,
    explanation:
      'The open-circuit voltage of a single crystalline silicon cell at STC is approximately 0.55–0.70 V, set by the silicon band gap and the p-n junction physics. Older P-type cells sit around 0.6 V; modern N-type / TOPCon / HJT cells reach 0.65–0.70 V. This is a property of the material, not of the cell size. A typical 60-cell PV module stacks cells in series to reach ~36–42 V V_oc at STC depending on cell technology; a 72-cell module reaches ~44–50 V. Larger cells produce more current, not more voltage.',
  },
  {
    id: 'm2s1-cell-current',
    question:
      'What sets the short-circuit current (I_sc) of a PV cell?',
    options: [
      'The voltage of the inverter',
      'The cell area and the incident irradiance (W/m²) — a larger cell or a brighter day produces more current. I_sc is roughly proportional to irradiance, so I_sc at 500 W/m² is roughly half the I_sc at 1000 W/m² STC irradiance',
      'The cable size',
      'The number of cells in the module',
    ],
    correctIndex: 1,
    explanation:
      'Cell current is set by the photon flux — i.e. the irradiance (W/m²) — and the active cell area. A standard 156×156 mm crystalline silicon cell at STC (1000 W/m² irradiance, 25°C cell temperature) produces I_sc ≈ 9–10 A. Halve the irradiance and I_sc roughly halves. The cell voltage is much less sensitive to irradiance; the current is the irradiance-driven variable. This is the foundation of MPPT — the voltage stays nearly fixed while the current scales with sunlight.',
  },
  {
    id: 'm2s1-cell-types',
    question:
      'Three commercial cell technologies dominate the UK PV market. Match the cell type to its characteristic:',
    options: [
      'Monocrystalline = lowest efficiency, polycrystalline = highest',
      'Monocrystalline (~20–22% efficiency, premium price), polycrystalline (~17–19% efficiency, mid-price, identifiable by the "blue speckled" appearance), amorphous thin-film (~8–10% efficiency, lowest temperature coefficient, often used in BIPV and shaded applications)',
      'All cell types perform identically in field conditions',
      'Amorphous is the most efficient',
    ],
    correctIndex: 1,
    explanation:
      'Monocrystalline cells are grown from a single silicon crystal (the Czochralski process) and offer the highest commercial efficiency (~20–22% at module level). Polycrystalline cells are cast from multiple silicon crystals (visible as blue grain boundaries), with efficiency ~17–19% and lower price. Amorphous silicon and other thin-film cells (CdTe, CIGS) operate at ~8–10% efficiency but have a lower temperature coefficient and perform better under partial shade — making them attractive for BIPV applications. Perovskite cells are at the research / commercialisation boundary (~25%+ efficiency in lab cells, durability still maturing).',
  },
  {
    id: 'm2s1-temperature-coefficient',
    question:
      'A PV module is rated at STC (1000 W/m², 25°C cell temperature). On a hot UK roof at 50°C cell temperature, with the module\'s temperature coefficient at -0.4%/°C for P_max, what is the approximate power reduction?',
    options: [
      'No reduction — temperature does not affect power',
      'Approximately -10% — 25°C above the STC reference × -0.4%/°C = -10% power reduction. Real-world performance is materially below STC nameplate at typical roof temperatures',
      'The module produces more power when hot',
      '-50% — heat halves the output',
    ],
    correctIndex: 1,
    explanation:
      'The temperature coefficient is the silent yield-killer. Crystalline silicon modules typically have a P_max temperature coefficient of -0.3 to -0.5 %/°C. A module at 25°C above STC (50°C cell temperature, common on a UK roof in summer) loses roughly 10% nameplate power. This is why module installation discipline matters — the 70–100 mm standoff above the roof surface (from the practical work intelligence) encourages natural convection cooling and reduces the operating temperature.',
  },
  {
    id: 'm2s1-bs7671-cells',
    question:
      'BS 7671 Reg 551.1.1(d) addresses generating sets incorporating photovoltaic cells. What does it say about them?',
    options: [
      'PV cells are excluded from Section 551',
      'Generating sets incorporating photovoltaic cells ARE considered generating sets — including PV arrays or photovoltaic modules used as the electrical energy source. Section 551 applies (and the A4 changes in 551.7.1(c) bidirectional protective device, 551.7.2.1 supply-side installation apply)',
      'PV cells are governed only by Section 712',
      'PV cells are governed only by Section 826',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.1.1(d) explicitly classifies generating sets incorporating photovoltaic cells as generating sets within the scope of Section 551. This is the regulatory bridge that brings the entire Section 551 toolkit (bidirectional protective device under 551.7.1(c), supply-side installation per 551.7.2.1, anti-islanding under 551.7.4, prevention of reconnection under 551.7.5, isolation accessibility under 551.7.6) onto a PV install — alongside the PV-specific particular requirements in Section 712.',
  },
  {
    id: 'm2s1-stc-vs-noct',
    question:
      'PV module datasheets quote performance at STC (Standard Test Conditions). What does STC specify?',
    options: [
      '1000 W/m² irradiance, 25°C cell temperature, AM 1.5 spectrum — the laboratory reference condition. Real-world operation is almost always below STC. Datasheets also quote NOCT (Nominal Operating Cell Temperature, typically ~45–48°C) as a more realistic operating point',
      '500 W/m² irradiance, 50°C cell temperature',
      'The UK midwinter morning conditions',
      'The conditions during the manufacturer\'s factory test only',
    ],
    correctIndex: 0,
    explanation:
      'STC = 1000 W/m² irradiance, 25°C cell temperature, AM 1.5 (air mass 1.5) spectrum. These are laboratory conditions; UK rooftops rarely operate at STC. The more realistic operating-point reference is NOCT (Nominal Operating Cell Temperature), typically ~45–48°C, which is the cell temperature reached at 800 W/m² irradiance with 20°C ambient and 1 m/s wind. Most module datasheets quote both STC (the optimistic number) and NOCT (the realistic-conditions number); designers should size against NOCT or a real-conditions derate, not against STC.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 60-cell crystalline silicon PV module is connected at STC. Approximately what V_oc would you expect at the module terminals?',
    options: [
      '0.6 V — the cell voltage',
      'Approximately 36–42 V depending on cell technology — 60 cells in series × ~0.6 V/cell (older P-type) or ~0.69 V/cell (modern N-type) at STC. Modern 60-cell modules typically quote V_oc around 41.5 V. (72-cell modules reach ~44–50 V; the cell count is the V_oc multiplier)',
      '230 V — mains voltage',
      '600 V — DC string voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Module V_oc is the cell V_oc multiplied by the number of cells in series. 60 cells × ~0.6 V/cell ≈ 36 V (older P-type technology); 60 cells × ~0.69 V/cell ≈ 41 V (modern N-type / TOPCon / HJT technology). The cell voltage is set by silicon physics and the cell technology; the module voltage is set by how many cells the manufacturer connects in series inside the module laminate. The DC string voltage of an installed PV system (~600 V typical for residential) is set by how many modules are connected in series at the string level — Module 2 Section 3 covers that.',
  },
  {
    id: 2,
    question:
      'Why does PV efficiency NOT improve when the cell heats up — and in fact reduces?',
    options: [
      'Heat damages the silicon permanently',
      'PV is direct photon-to-electron conversion; the silicon band gap narrows slightly with temperature, slightly reducing V_oc, but more importantly the increased thermal motion in the silicon lattice increases recombination rates, reducing the cell voltage and the fill factor. Hot cells produce less voltage, not more',
      'Cell current decreases with temperature',
      'The encapsulation expands and breaks',
    ],
    correctAnswer: 1,
    explanation:
      'PV efficiency reduces with temperature because the silicon band gap narrows slightly (~-0.3 mV/°C) and the increased lattice vibration drives higher recombination of electron-hole pairs before they reach the external circuit. Both effects reduce V_oc (typically -0.3 to -0.4%/°C) and the fill factor. Cell I_sc actually rises very slightly with temperature, but the V_oc loss dominates, giving the typical P_max temperature coefficient of -0.3 to -0.5%/°C for crystalline silicon. This is why the install discipline of 70–100 mm standoff above the roof matters — cooler cells produce more power.',
  },
  {
    id: 3,
    question:
      'Monocrystalline, polycrystalline, and amorphous silicon cells differ in efficiency, appearance and temperature behaviour. Which is the right characterisation for amorphous silicon for a partial-shade BIPV application?',
    options: [
      'Highest efficiency, worst partial-shade performance',
      'Lower nameplate efficiency (~8–10%), but lower temperature coefficient and better partial-shade performance — making amorphous thin-film attractive for BIPV applications where shade and integration into the building structure matter more than peak efficiency',
      'Identical to monocrystalline',
      'Cannot be used in BIPV',
    ],
    correctAnswer: 1,
    explanation:
      'Amorphous silicon and other thin-film cells (CdTe, CIGS) sit at ~8–10% efficiency vs ~20–22% for monocrystalline. The trade-off they offer: a lower temperature coefficient (less power loss at hot operating temperatures), better partial-shade performance (less catastrophic drop-off than crystalline cells under shade), and form-factor flexibility (can be deposited on flexible substrates, integrated into walkable surfaces, curved into architectural shapes). For BIPV where the install location is structural / aesthetic rather than peak-yield optimised, amorphous thin-film is often the right choice despite the lower nameplate.',
  },
  {
    id: 4,
    question:
      'PV cell I_sc scales roughly proportionally with what?',
    options: [
      'The number of cells in series',
      'The incident irradiance (W/m²) and the active cell area — halve the irradiance and I_sc roughly halves; double the cell area and I_sc roughly doubles. V_oc is much less sensitive',
      'The cell temperature only',
      'The DC string voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Short-circuit current scales with photon flux. More photons per second hitting the cell (higher irradiance OR larger active area) means more electron-hole pairs generated per second means more current. I_sc at 500 W/m² is roughly half I_sc at 1000 W/m². V_oc, by contrast, scales logarithmically with irradiance and changes very little across the typical operating range — which is why MPPT works the way it does (Module 2 Section 4).',
  },
  {
    id: 5,
    question:
      'STC (Standard Test Conditions) for a PV module specifies 1000 W/m² irradiance, 25°C cell temperature, AM 1.5 spectrum. What does AM 1.5 actually mean?',
    options: [
      'The module weighs 1.5 kg per m²',
      'Air Mass 1.5 — the standard solar spectrum after passing through 1.5 atmosphere-equivalents of atmospheric attenuation. Roughly equivalent to the sun at 48° from zenith. The standard reference spectrum for PV module performance testing',
      '1.5 hours of testing',
      '1.5 W per cell',
    ],
    correctAnswer: 1,
    explanation:
      'AM (Air Mass) describes the path length of sunlight through the atmosphere relative to a vertical zenith path. AM 1.0 is the sun directly overhead (atmospheric path = 1 atmosphere). AM 1.5 is the sun at ~48° from zenith (atmospheric path = 1.5 atmospheres). AM 1.5 is the standard reference because it represents typical mid-latitude conditions and an averaged daylight spectrum. The IEC 60904 standard defines AM 1.5G (global, including diffuse) as the reference spectrum for terrestrial PV testing.',
  },
  {
    id: 6,
    question:
      'Reg 551.1.1(d) in BS 7671:2018+A4:2026 classifies generating sets incorporating photovoltaic cells as:',
    options: [
      'Exempt from Section 551',
      'Generating sets within scope of Section 551 — meaning the full Section 551 toolkit applies to PV (bidirectional protective device, supply-side installation, anti-islanding, prevention of reconnection, isolation accessibility). Section 712 applies the PV-specific particular requirements on top',
      'Loads',
      'Test equipment only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 551.1.1(d) explicitly brings PV into the scope of Section 551 — i.e. every grid-tied PV install engages the Section 551 generator-side rules including 551.7.1(c) bidirectional protective device, 551.7.2.1 supply-side installation (with stationary batteries treated as generating sets), and the 551.7.4–551.7.6 anti-islanding / prevention-of-reconnection / isolation triad. Section 712 then applies the PV-specific particular requirements (the modifications to general protective measures, PV string protection per 712.431, etc.).',
  },
  {
    id: 7,
    question:
      'On a domestic PV install, the module datasheet quotes "Pmax 400 W at STC, temperature coefficient -0.36%/°C for Pmax". On a UK roof in mid-summer with cell temperature reaching 55°C, what is the approximate actual peak power?',
    options: [
      '400 W — STC is the operating condition',
      'Approximately 357 W — 55°C is 30°C above the STC 25°C reference; 30°C × -0.36%/°C = -10.8% reduction; 400 W × (1 – 0.108) ≈ 357 W',
      '200 W — temperature halves output',
      '600 W — heat increases output',
    ],
    correctAnswer: 1,
    explanation:
      'The temperature derate calculation: difference from STC × temperature coefficient × nameplate. (55 – 25) °C × -0.36%/°C × 400 W = -43.2 W. Actual Pmax ≈ 357 W. The worked example matches the practical work intelligence pattern — Austin Texas roof multiplier 1.4× ambient, temperature coefficient 0.5%/°C, ~8% power reduction. UK conditions are cooler than Austin\'s, but the principle is identical: STC is laboratory; real-world output is materially below the nameplate.',
  },
  {
    id: 8,
    question:
      'A customer asks "why does my PV array produce more in April than in July, even though July has longer days and (theoretically) more sun?". The most accurate technical answer:',
    options: [
      'The customer is mistaken — July always produces more',
      'The temperature effect dominates. April daytime ambient is ~10–15°C, July is ~20–25°C; module cell temperatures track 20–30°C above ambient on a still day. The result: July modules typically operate at ~50–60°C vs April\'s ~30–40°C — and the temperature coefficient of -0.4%/°C means a meaningful power reduction in July. Combined with frequent UK summer cloud cover, April often outperforms July on a per-module basis',
      'Less daylight in July',
      'The sun is closer to the earth in April',
    ],
    correctAnswer: 1,
    explanation:
      'The April-vs-July paradox is a real phenomenon on UK PV installs and surfaces in customer conversations regularly. April daytime ambient is ~10–15°C; module cell temperatures sit around 30–40°C on a still sunny day. July ambient is ~20–25°C; module cell temperatures climb to 50–60°C. The 20°C of additional cell temperature drives ~8% power reduction at the typical -0.4%/°C coefficient. Add longer UK July cloud cover and lower-elevation solar angles, and April production often exceeds July despite the longer days. The customer is right to notice — this is the temperature effect made visible.',
  },
];

const faqs = [
  {
    question:
      'How does the photovoltaic effect actually work — what\'s happening in the silicon?',
    answer:
      'A photon (light particle) carries energy proportional to its wavelength. When a photon of sufficient energy (>1.1 eV for crystalline silicon) strikes a silicon atom in the cell, it transfers its energy to an electron, freeing the electron from its covalent bond. The freed electron leaves behind a "hole" — the absence of an electron in the bond. The p-n junction in the cell has a built-in electric field that drives the electron one way and the hole the other, separating the pair before they can recombine. Connect an external circuit and the separated electrons drive current through the load. No moving parts, no thermal intermediate — direct photon-to-electron conversion.',
  },
  {
    question:
      'Why is silicon the dominant PV material — what makes it special?',
    answer:
      'Three reasons. (1) The silicon band gap (~1.1 eV) is well-matched to the solar spectrum — most visible-light photons have enough energy to free electrons. (2) Silicon is the second most abundant element in the Earth\'s crust, so the raw material cost is very low. (3) The silicon semiconductor industry developed for microelectronics from the 1950s onwards built the manufacturing infrastructure, the doping techniques and the wafer processes that PV builds on directly. Other materials (gallium arsenide, cadmium telluride, perovskites) have higher theoretical efficiencies but lack the industrial maturity of silicon. The future is likely to be silicon-based for the next decade, with perovskite-silicon tandem cells emerging at the research-to-commercial boundary.',
  },
  {
    question:
      'What is "fill factor" on a PV cell datasheet?',
    answer:
      'Fill factor (FF) is the ratio of the cell\'s actual maximum power output to the theoretical maximum if the cell could deliver V_oc and I_sc simultaneously. FF = P_max / (V_oc × I_sc). A perfect cell would have FF = 1 (impossible in practice). Real crystalline silicon cells typically achieve FF ~ 0.75–0.85. The fill factor is a quality indicator — high-quality cells with good contacts, low series resistance and clean junction physics have higher fill factors. A module datasheet that gives P_max, V_oc and I_sc lets you calculate FF; comparing FF across modules of similar nominal rating is a useful quality cross-check.',
  },
  {
    question:
      'Bypass diodes are mentioned in PV module context — what do they do?',
    answer:
      'Bypass diodes are built into the module junction box (typically 3 per 60-cell module, 1 per sub-string of 20 cells). Their purpose: when one cell in a series string is shaded or faulted, the shaded cell becomes reverse-biased and would otherwise dissipate the power of the unshaded cells as heat (a "hotspot" — potentially damaging the module). The bypass diode provides an alternative current path around the affected sub-string, limiting the reverse voltage on the shaded cell and protecting the module. The cost is that the bypassed sub-string contributes nothing during the bypass period. Bypass diodes are why partial shading is less catastrophic on modern modules than it was on early generations.',
  },
  {
    question:
      'How does BS EN 61730 relate to PV module specification?',
    answer:
      'BS EN 61730 is the product safety standard for PV modules, covering construction requirements (Part 1) and testing methodology (Part 2). PV modules sold for permanent installation in the UK should carry BS EN 61730 conformity. The standard addresses electrical safety, mechanical strength, fire performance, and the construction tests that verify Class II (double / reinforced insulation) construction — which links into BS 7671 Reg 712.412 permitting reinforced insulation as a PV-side protective measure. When specifying modules for an MCS-funded install, the module should also be on the MCS Product List (MPS 010 — PV modules). The two compliance routes (BS EN 61730 product safety and MCS Product Listing) are complementary; both are typically required.',
  },
  {
    question:
      'Perovskite cells are mentioned at the cutting edge — should I be specifying them on installs?',
    answer:
      'Not yet for mainstream installs. Perovskite cells (named for their crystal structure) have achieved lab-cell efficiencies above 25% with attractive low-cost manufacturing potential. The barriers to commercial deployment are durability (early perovskite cells degraded rapidly under moisture and UV exposure) and scaling from lab to manufacturing. Several manufacturers are commercialising perovskite-silicon tandem cells (using perovskite to capture wavelengths silicon is less efficient at) and pure perovskite modules. These are reaching MCS Product List eligibility in early 2026 but remain at the premium end of the market with limited field-track-record. For routine installs, crystalline silicon is the right choice through at least 2028; perovskite tandem cells may be mainstream by 2030.',
  },
  {
    question:
      'Why does cell efficiency at the module level always seem lower than at the cell level — what gets lost?',
    answer:
      'Several losses stack between the lab cell and the field-installed module: optical losses from the glass and encapsulant (~3%), gaps between cells in the laminate that contribute area but no power (~5%), interconnection resistance, mismatch losses between cells in series (the weakest cell sets the string current), inverter conversion losses (~3–5%), DC and AC cable losses, and the operating-temperature derate already discussed. A 22% lab-efficient cell typically becomes a ~20% module efficiency and, after balance-of-system losses, ~17–18% system efficiency at the meter. The PVGIS and similar tools that calculate annual yield apply a "performance ratio" (typically 0.75–0.85) that lumps all these losses together against the STC nameplate.',
  },
  {
    question:
      'Half-cell and shingled-cell modules are appearing on UK datasheets — what are they?',
    answer:
      'Half-cell modules cut each full-size cell into two halves and rearrange the laminate so the current per series-string is halved. Lower current means lower resistive losses in the cell interconnections and the bypass-diode arrangement, and better partial-shade tolerance (because the module has more parallel sub-strings to bypass independently). Half-cell modules typically gain ~3% power for the same cell area. Shingled-cell modules use overlapping cell ribbons rather than ribbon-bus-bar interconnections, removing the inter-cell gaps and increasing the active cell area per module. Both are incremental improvements on the basic crystalline silicon platform and have become standard at the mid-to-premium end of the UK market.',
  },
  {
    question:
      'How does the manufacturer\'s temperature coefficient on the datasheet actually affect my design?',
    answer:
      'Two practical impacts. First, on cold-day V_oc: a -0.3 to -0.4%/°C coefficient on V_oc means the cold-morning V_oc (e.g. -5°C on a winter morning) is higher than the STC V_oc. Sizing a string against the STC V_oc and finding the cold-morning V_oc exceeds the inverter\'s maximum input voltage is a common design error. Use the manufacturer\'s temperature coefficient and the local design minimum cell temperature (per MIS 3002 / IET CoP guidance) to calculate the cold-day V_oc. Second, on hot-day power: the P_max temperature coefficient drives the operating-conditions derate (see the worked example earlier). Both calculations are mandatory parts of an MCS-compliant PV design pack.',
  },
];

export default function RenewableEnergyModule2Section1() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Cells — the photovoltaic effect | Renewable Energy 2.1 | Elec-Mate',
    description:
      'The silicon physics, p-n junction and photovoltaic effect that turns a photon into current. Cell types (monocrystalline, polycrystalline, amorphous thin-film, perovskite) and their characteristic trade-offs. The Section 551.1.1(d) classification of PV cells as generating sets.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · BS 7671:2018+A4:2026"
            title="Cells — the photovoltaic effect"
            description="The silicon physics, p-n junction and photovoltaic effect that turns a photon into current. Cell types and their trade-offs. The BS 7671 framing of PV cells as generating sets."
            tone="yellow"
          />

          <TLDR
            points={[
              'The photovoltaic effect is direct photon-to-electron conversion. A photon with energy above the silicon band gap (~1.1 eV) frees an electron-hole pair; the p-n junction\'s built-in electric field separates them, producing a voltage.',
              'A single crystalline silicon cell at STC produces ~0.55–0.70 V open-circuit (older P-type ~0.6 V; modern N-type / TOPCon / HJT 0.65–0.70 V). The voltage is set by silicon physics, not cell size. Module voltage stacks many cells in series (60-cell ≈ 36–42 V, 72-cell ≈ 44–50 V).',
              'Cell short-circuit current scales with irradiance (W/m²) and active area. Halve the irradiance, halve the current. V_oc is much less sensitive — this is the foundation of MPPT.',
              'Three cell types dominate the UK market: monocrystalline (~20–22% efficient, premium), polycrystalline (~17–19% efficient, mid-price), and amorphous thin-film (~8–10% efficient, low temperature coefficient, good for BIPV). Perovskite cells are emerging at the research-to-commercial boundary.',
              'BS 7671 Reg 551.1.1(d) classifies generating sets incorporating photovoltaic cells as generating sets — bringing the full Section 551 toolkit onto every grid-tied PV install alongside the Section 712 PV-specific requirements.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the photovoltaic effect in terms of photons, electron-hole pairs and the p-n junction\'s built-in electric field — the quantum-electronic process that makes PV work.',
              'Identify the characteristic cell-level voltage (~0.5–0.6 V V_oc at STC for crystalline silicon) and explain why module voltage requires many cells in series.',
              'Distinguish the three commercial cell technologies (monocrystalline, polycrystalline, amorphous thin-film) and the trade-offs each offers — efficiency, price, temperature coefficient, partial-shade performance, form factor.',
              'Apply the temperature coefficient calculation to derate STC nameplate performance to realistic operating conditions, using the manufacturer\'s datasheet values.',
              'Read the BS 7671 framing of PV cells under Reg 551.1.1(d) (generating sets) and Section 712 (PV-specific particular requirements) as complementary regulatory layers.',
              'Anticipate where perovskite and other emerging cell technologies fit in the LCT installer\'s near-term planning horizon — research-to-commercial today, mainstream by ~2030.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>A photon walks into a silicon atom and knocks an electron loose.</Pullquote>

          <ContentEyebrow>The photovoltaic effect — what actually happens</ContentEyebrow>

          <ConceptBlock
            title="The quantum-electronic process — no heat, no moving parts"
            plainEnglish="A PV cell converts light directly to electricity through quantum mechanics. A photon delivers its energy to an electron; the p-n junction\'s electric field separates the electron from the hole it leaves behind; the separated charges drive current through an external circuit."
            onSite="PV is not a thermal process. The cell does NOT work by heating up. Heat is the enemy, not the mechanism — hotter cells produce less power."
          >
            <p>The photovoltaic effect, step by step:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Photon arrives</strong> — a particle of
                light carrying energy proportional to its wavelength (red ~1.8 eV, green
                ~2.3 eV, blue ~2.7 eV, ultraviolet higher)
              </li>
              <li>
                <strong className="text-white">Energy transfer</strong> — if the photon
                energy exceeds the silicon band gap (~1.1 eV), it can free an electron
                from its covalent bond in the silicon lattice
              </li>
              <li>
                <strong className="text-white">Electron-hole pair created</strong> — the
                freed electron leaves a "hole" (the absence of an electron) behind
              </li>
              <li>
                <strong className="text-white">Separation at the junction</strong> — the
                p-n junction\'s built-in electric field drives the electron one way (to
                the n-side) and the hole the other (to the p-side)
              </li>
              <li>
                <strong className="text-white">Voltage and current</strong> — separated
                charges accumulate at the cell\'s terminals as a voltage; connecting an
                external circuit lets the electrons flow back to recombine with the holes,
                producing current
              </li>
            </ul>
            <p>
              No moving parts. No thermal intermediate. The cell operates by quantum
              mechanics, which is why its efficiency does not improve with temperature —
              in fact the opposite.
            </p>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="The photovoltaic effect — cross-section of a crystalline silicon PV cell showing the p-type and n-type doped layers, the depletion region (p-n junction), the front contact (busbars / fingers), the anti-reflective coating, and the back contact. A photon arrives from above, frees an electron in the depletion region, and the built-in electric field drives the electron to the n-side and the hole to the p-side."
            filename="renewable/m2s1-photovoltaic-effect.png"
          />

          <DiagramPlaceholder
            caption="Engineering Mindset video — &lsquo;How a solar cell works&rsquo;. The 5-minute animated explanation of the photovoltaic effect, the p-n junction, and the electron-hole pair drift. Recommended companion to this section."
            filename="renewable/m2s1-engineering-mindset-cell-video.placeholder"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Cell-level electrical characteristics</ContentEyebrow>

          <Pullquote>The cell voltage is set by physics. The cell current is set by sunlight.</Pullquote>

          <ConceptBlock
            title="V_oc and I_sc — what the cell actually produces"
            plainEnglish="A single crystalline silicon cell at standard test conditions produces about 0.5–0.6 V open-circuit and 9–10 A short-circuit. The voltage is set by silicon physics. The current is set by how much light hits the cell."
            onSite="Voltage stacking requires series connection — that\'s why modules contain 60 or 72 cells wired in series inside the laminate. Current addition requires parallel connection — that\'s string-level architecture, covered in Section 2.3."
          >
            <p>The two defining cell characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">V_oc (open-circuit voltage)</strong> — the
                voltage produced when no current is drawn. For crystalline silicon at STC,
                ~0.5–0.6 V per cell. Set by the silicon band gap and junction physics —
                independent of cell size.
              </li>
              <li>
                <strong className="text-white">I_sc (short-circuit current)</strong> — the
                current produced when the cell terminals are shorted. For a 156×156 mm
                crystalline silicon cell at STC (1000 W/m²), ~9–10 A. Roughly proportional
                to irradiance and active cell area.
              </li>
            </ul>
            <p>Module V_oc is the cell V_oc multiplied by the number of cells in series:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>60-cell module ≈ 60 × 0.6 V = ~36 V V_oc at STC</li>
              <li>72-cell module ≈ 72 × 0.6 V = ~44 V V_oc at STC</li>
              <li>96-cell module ≈ 96 × 0.6 V = ~58 V V_oc at STC</li>
              <li>Half-cell modules: same V_oc per cell, twice the cell count for the same module area, similar V_oc total</li>
            </ul>
            <p>
              The DC string voltage of an installed system (~400–600 V typical for
              residential, &gt; 1000 V for utility-scale) is set by how many modules are
              wired in series at the string level — module-level design covered in Section
              2.2, string-level in Section 2.3.
            </p>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="The I-V curve of a PV cell at STC — showing V_oc on the voltage axis, I_sc on the current axis, the knee of the curve where the maximum power point (MPP) lies (V_mp, I_mp, P_max), and the fill factor as the ratio of the MPP rectangle to the (V_oc × I_sc) rectangle. Three curves overlaid at different irradiance levels (1000, 500, 250 W/m²) showing how I_sc scales linearly with irradiance while V_oc changes only logarithmically."
            filename="renewable/m2s1-iv-curve.png"
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Cell types — three technologies in the UK market</ContentEyebrow>

          <Pullquote>Mono is efficient. Poly is cheap. Amorphous is flexible.</Pullquote>

          <ConceptBlock
            title="The three commercial cell technologies — and their characteristic trade-offs"
            plainEnglish="The UK PV market is dominated by three cell technologies. Monocrystalline (premium, efficient). Polycrystalline (mid-market, cheaper). Amorphous thin-film (specialist, BIPV-friendly). Perovskites are at the research-to-commercial boundary."
            onSite="The cell choice flows from the customer brief. Premium domestic install with limited roof area? Mono. Cost-driven domestic install with plenty of area? Poly. BIPV / curved-surface / partial-shade application? Amorphous. New-build with structural integration? Increasingly perovskite-silicon tandem from ~2027."
          >
            <p>The three dominant commercial cell technologies:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Monocrystalline silicon</strong> — grown
                from a single silicon crystal via the Czochralski process. Highest
                commercial efficiency (~20–22% at module level). Premium price.
                Dark-grey / black appearance. The default for high-yield residential
                installs.
              </li>
              <li>
                <strong className="text-white">Polycrystalline silicon</strong> — cast
                from multiple silicon crystals in a mould. Efficiency ~17–19%. Lower
                price than mono. Identifiable by the &ldquo;blue speckled&rdquo; grain
                appearance from the crystal boundaries. Common on cost-driven installs.
              </li>
              <li>
                <strong className="text-white">Amorphous silicon thin-film</strong> —
                vapour-deposited silicon, no crystalline structure. Efficiency ~8–10%
                (lower than crystalline). Lower temperature coefficient (better hot-weather
                performance per nameplate). Better partial-shade tolerance. Form-factor
                flexibility (can be deposited on flexible substrates, walkable surfaces,
                curved architectural elements).
              </li>
            </ul>
            <p>Other thin-film technologies in the UK market:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CdTe (cadmium telluride)</strong> — thin-film
                technology with ~14–18% module efficiency. Lower cost per W than crystalline.
                Some environmental concerns around cadmium content (managed via end-of-life
                recycling programs by the manufacturers).
              </li>
              <li>
                <strong className="text-white">CIGS (copper indium gallium selenide)</strong>
                {' '}— thin-film with module efficiency ~13–16%. Excellent low-light
                performance. Smaller market share than CdTe or amorphous.
              </li>
            </ul>
            <p>At the research-to-commercial boundary:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Perovskite cells</strong> — lab efficiency
                above 25% with low-cost manufacturing potential. Durability is the
                remaining barrier; early perovskite cells degraded rapidly under moisture
                and UV. Several manufacturers reaching MCS Product List eligibility in
                early 2026.
              </li>
              <li>
                <strong className="text-white">Perovskite-silicon tandem cells</strong> —
                using perovskite to capture wavelengths silicon is less efficient at.
                Lab efficiencies above 33%. Expected to be mainstream by ~2030.
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="Cell type comparison — side-by-side visual of monocrystalline (uniform dark surface), polycrystalline (blue grain pattern), amorphous thin-film (uniform thin layer on substrate). Each with efficiency range, temperature coefficient, typical price/W, and characteristic applications. Plus a sidebar showing perovskite-silicon tandem as the emerging technology."
            filename="renewable/m2s1-cell-types-comparison.png"
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Temperature — the silent yield-killer</ContentEyebrow>

          <Pullquote>Temperature is the silent yield-killer.</Pullquote>

          <ConceptBlock
            title="Why hotter cells produce less power — and how to design for it"
            plainEnglish="PV is direct photon-to-electron conversion, not a thermal process. The silicon band gap narrows slightly with temperature; lattice vibration increases recombination of electron-hole pairs before they reach the circuit. Both effects reduce V_oc and the fill factor."
            onSite="The 70–100 mm standoff above the roof surface (from the PWI practical work intelligence) is the cooling discipline — natural convection between the module and the roof reduces operating temperature by 10–20°C versus a flush-mounted install."
          >
            <p>The temperature coefficient on a PV module datasheet typically gives three values:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">P_max (power)</strong> — typically -0.3 to
                -0.5%/°C for crystalline silicon. The most operationally important number
                — drives the energy-yield derate.
              </li>
              <li>
                <strong className="text-white">V_oc (open-circuit voltage)</strong> —
                typically -0.3 to -0.4%/°C. Critical for cold-day V_oc calculations —
                a winter morning at -5°C can produce V_oc above STC by 10–15%.
              </li>
              <li>
                <strong className="text-white">I_sc (short-circuit current)</strong> —
                typically +0.04 to +0.06%/°C (slightly positive). Current rises slightly
                with temperature, but the V_oc loss dominates.
              </li>
            </ul>
            <p>
              Amorphous and thin-film cells have lower temperature coefficients (typically
              -0.2 to -0.3%/°C for P_max) — meaning they suffer less power loss at hot
              operating temperatures. This partly offsets their lower nameplate efficiency
              on hot-climate or hot-roof applications.
            </p>
            <p>The two practical design impacts:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Cold-day V_oc</strong> — the string V_oc on
                a cold winter morning may exceed the STC V_oc by 10–15%. Sizing a string
                against the STC V_oc without applying the cold-day calculation can put
                the string voltage above the inverter\'s maximum input voltage — a common
                design error.
              </li>
              <li>
                <strong className="text-white">Hot-day power</strong> — the operating-
                conditions P_max is materially below STC. Annual yield calculations apply
                a performance ratio (typically 0.75–0.85) to lump in this and other
                losses.
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="P-V curves at three operating temperatures (25°C STC, 50°C real-world hot, 75°C extreme-hot) showing the visible reduction in maximum power as temperature rises. Annotated with the 70–100 mm standoff arrangement and the natural convection airflow that delivers the cooling discipline."
            filename="renewable/m2s1-temperature-effect.png"
          />

          <DiagramPlaceholder
            caption="Worked example — a 400 W module rated at STC with a P_max temperature coefficient of -0.36%/°C, operating at 55°C cell temperature on a UK summer roof: (55 – 25) °C × -0.36%/°C × 400 W = -43 W. Actual operating P_max ≈ 357 W. The STC nameplate vs the real-world output."
            filename="renewable/m2s1-temperature-worked-example.png"
          />

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 — PV cells in the regulatory framework</ContentEyebrow>

          <ConceptBlock
            title="Reg 551.1.1(d) — PV cells are generating sets"
            plainEnglish="BS 7671 brings PV cells into the regulatory framework through Reg 551.1.1(d) — generating sets incorporating photovoltaic cells are classified as generating sets. The full Section 551 toolkit applies."
            onSite="Every grid-tied PV install engages Section 551 (generator-side rules) AND Section 712 (PV-specific particular requirements). The two chapters interlock; reading only one is the most common design error on PV installs."
          >
            <p>Reg 551.1.1(d) explicitly classifies PV in the generating-set framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PV arrays or modules used as the
                electrical energy source</strong> are considered generating sets within
                Section 551\'s scope
              </li>
              <li>
                <strong className="text-white">Section 551.7.1(c)</strong> applies — a
                bidirectional protective device where energy flow is bidirectional (the
                A4:2026 requirement)
              </li>
              <li>
                <strong className="text-white">Section 551.7.2.1</strong> applies — the
                generating set on the supply side of all protective devices
              </li>
              <li>
                <strong className="text-white">Section 551.7.4 / .5 / .6</strong> applies —
                anti-islanding, prevention of reconnection, and means of isolation
              </li>
            </ul>
            <p>
              Section 712 then applies the PV-specific particular requirements on top —
              the prohibited protective measures (712.410.3.5 / .6), the permitted double
              or reinforced insulation (712.412), the PV string protection rules
              (712.431). Module 2 Section 3 covers string-level protection in detail.
            </p>
            <p>
              At the cell / module level, BS EN 61730 is the product safety standard
              (Part 1 construction, Part 2 testing). Module datasheets and the MCS Product
              List (MPS 010) reference BS EN 61730 conformity. For an MCS-funded install,
              the module must be on the MCS Product List AND should carry BS EN 61730
              conformity — the two layers are complementary.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.1.1(d)"
            clause="Regulation 551.1.1(d) states that generating sets incorporating photovoltaic cells are considered generating sets. This includes PV arrays or photovoltaic modules used as the electrical energy source for a generating set arrangement considered by the section."
            meaning="PV is in Section 551 by explicit definition. The Section 551 toolkit (bidirectional protective device, supply-side installation, anti-islanding, prevention of reconnection, isolation accessibility) applies to every grid-tied PV install — alongside the PV-specific Section 712 requirements. Reading only Section 712 and missing Section 551 is the most common design error."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>STC, NOCT and what datasheets actually mean</ContentEyebrow>

          <ConceptBlock
            title="STC vs NOCT — laboratory vs realistic operating conditions"
            plainEnglish="PV module datasheets quote performance at STC (Standard Test Conditions) — the laboratory reference. STC is 1000 W/m² irradiance, 25°C cell temperature, AM 1.5 spectrum. Real-world UK conditions are almost always below STC."
            onSite="Most datasheets also quote NOCT (Nominal Operating Cell Temperature) — typically ~45–48°C. Design against NOCT or a real-conditions derate, not STC. STC is the optimistic number; NOCT is closer to the lived experience."
          >
            <p>The standard reference conditions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">STC (Standard Test Conditions)</strong> —
                1000 W/m² irradiance, 25°C cell temperature, AM 1.5 spectrum. The
                laboratory reference under IEC 60904. Module datasheets quote P_max,
                V_oc, I_sc, V_mp, I_mp at STC.
              </li>
              <li>
                <strong className="text-white">NOCT (Nominal Operating Cell Temperature)</strong>
                {' '}— typically ~45–48°C. The cell temperature reached at 800 W/m²
                irradiance with 20°C ambient and 1 m/s wind. A more realistic operating
                reference for UK conditions.
              </li>
              <li>
                <strong className="text-white">AM 1.5</strong> — Air Mass 1.5, the
                standard reference spectrum representing sunlight after passing through
                1.5 atmosphere-equivalents (sun ~48° from zenith). AM 1.5G includes diffuse
                light; AM 1.5D is direct only. Terrestrial PV testing uses AM 1.5G.
              </li>
            </ul>
            <p>
              MCS MIS 3002 design pack requirements include the derated performance
              calculation — STC nameplate × performance ratio (typically 0.75–0.85)
              accounts for temperature, soiling, mismatch, inverter losses and cable
              losses against actual local irradiance. The cert evidence bundle includes
              the design calculation back-up.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A customer asks &lsquo;why does my April production beat my July production?&rsquo;"
            situation="A homeowner with a 5 kWp grid-tied monocrystalline PV array installed in 2024 reviews their first full year of generation data. Total April yield: 720 kWh. Total July yield: 690 kWh. The customer asks the installer to explain — July has longer days and theoretically more sun, so July should produce more, not less."
            whatToDo="Walk the temperature effect. April UK daytime ambient: ~10–15°C. July UK daytime ambient: ~20–25°C. Module cell temperatures track 20–30°C above ambient on a still sunny day. April cell temperature: ~30–40°C. July cell temperature: ~50–60°C. With the module\'s P_max temperature coefficient of -0.4%/°C, the additional 20°C of July cell temperature drives roughly 8% power reduction versus April conditions. Compound with July\'s frequent UK cloud cover and the lower-elevation solar angle reducing direct-irradiance hours, and April routinely outperforms July on the same array. The customer\'s observation is right and the explanation matches the physics. (Optional follow-on: the installer can compare the modelled PVGIS expected yield for the location against the actual measured yield to confirm the modelled vs actual performance ratio.)"
            whyItMatters="This is the most common &lsquo;is my PV array working properly?&rsquo; customer query. The technical explanation reassures the customer, identifies any installer follow-up (cleaning the array, checking shading from summer foliage), and demonstrates the installer\'s competence on the temperature effect. The customer who understands the temperature effect is less likely to mistakenly attribute a normal seasonal pattern to a fault."
          />

          <CommonMistake
            title="Sizing a PV string against STC V_oc without the cold-morning calculation"
            whatHappens="An installer designs a 14-module string against the inverter\'s rated maximum input voltage using the STC module V_oc value from the datasheet. The design margin looks adequate. The system commissions in autumn and works fine. The following February at -5°C on a cold sunny morning, the string V_oc rises to 12–15% above STC — exceeding the inverter\'s maximum input voltage. The inverter trips on over-voltage; in worst cases, the over-voltage damages the inverter input stage."
            doInstead="Always apply the cold-morning V_oc calculation. Take the module V_oc temperature coefficient (typically -0.3 to -0.4%/°C, expressed as the V_oc increase with falling temperature) and the local design-minimum cell temperature (per MIS 3002 / IET CoP guidance for the UK location). Calculate the worst-case cold-morning string V_oc. Size the string so this value is below the inverter\'s absolute maximum input voltage with margin. MIS 3002 mandates this calculation as part of the design pack; it is the single most-common design error on UK PV installs."
          />

          <CommonMistake
            title="Treating STC nameplate as the operating yield"
            whatHappens="An installer quotes a 5 kWp PV array as &lsquo;5 kW peak output&rsquo; to the customer. The customer reads it as &lsquo;5 kW continuous output during daylight&rsquo;. After install, the customer monitors the actual output and finds peak generation often sits at 3.5–4 kW even on a sunny day. The customer queries whether the install is faulty."
            doInstead="STC is the laboratory reference, not the operating condition. Set customer expectations against the derated real-world output. A 5 kWp array on a UK roof typically delivers a peak of 3.5–4.5 kW even on the brightest summer day, due to temperature derate, soiling, mismatch, inverter losses and cable losses. The annual yield calculation (PVGIS or equivalent) gives the realistic expectation — typically 4,000–5,000 kWh/year for a south-facing 5 kWp UK install. Use the realistic numbers in the customer conversation, not the STC nameplate."
          />

          <CommonMistake
            title="Mounting modules flush to the roof surface"
            whatHappens="An installer fits PV modules with a minimal standoff (10–20 mm) to keep the visual profile low. The customer is pleased with the aesthetic. The first summer, the modules operate at very high cell temperatures (60°C+) due to restricted airflow between the module rear and the roof tile surface. The temperature derate reduces yield by 10–15% vs a properly ventilated install. Over the 25-year array life, the cumulative yield loss is material."
            doInstead="Maintain the 70–100 mm (7–10 cm) standoff above the roof surface (per the practical work intelligence guidance). The gap allows natural convection — cool air flows in at the lower edge of the array, warms as it rises behind the modules, and exits at the upper edge — keeping the modules 10–20°C cooler than a flush-mounted install. The yield benefit over 25 years is substantial; the aesthetic compromise is minimal."
          />

          <SectionRule />

          <ContentEyebrow>The 19th Edition direction for cell-level content</ContentEyebrow>

          <ConceptBlock
            title="What the 19th Edition is likely to bring for PV cells"
            plainEnglish="The 19th Edition (expected 2028–2029) is widely expected to consolidate Section 712, Section 551 and Chapter 82 into a clearer Part 7 LCT framework. Cell-level content is unlikely to change technically — but the regulatory apparatus around it may renumber."
            onSite="For the installer, learn the current chapter map (Section 551 + Section 712 + Chapter 82) well. The 19th Edition consolidation preserves technical content; it changes architecture."
          >
            <p>
              The 19th Edition\'s expected direction for PV-related content:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                Consolidation of the scattered LCT chapters into a coherent Part 7 LCT
                framework
              </li>
              <li>
                Deeper integration with the international BS EN 60364 series
              </li>
              <li>
                Possible expansion of Chapter 82 PEI requirements covering the
                hybrid-system case
              </li>
              <li>
                Continued recordkeeping trajectory — design-time decisions on PV string
                topology, inverter selection and PEI architecture made recordable on the
                cert
              </li>
            </ul>
            <p>
              Cell-level physics is not regulatory territory and will not change. What
              may change: how the chapter map names and locates the PV-related rules.
              The installer who learns the current map cleanly can re-map to the
              consolidated framework with minimal rework.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'The photovoltaic effect is direct photon-to-electron conversion via the p-n junction\'s built-in electric field. No thermal step, no moving parts.',
              'Single crystalline silicon cell V_oc at STC ≈ 0.55–0.70 V depending on technology (P-type ~0.6 V, modern N-type / TOPCon / HJT ~0.65–0.70 V). Module V_oc stacks cells in series (60-cell ≈ 36–42 V, 72-cell ≈ 44–50 V).',
              'Cell I_sc scales roughly linearly with irradiance and active cell area. V_oc is much less sensitive — the foundation of MPPT.',
              'Three commercial cell types in the UK: monocrystalline (~20–22% efficiency, premium), polycrystalline (~17–19%, mid-price, blue speckled appearance), amorphous thin-film (~8–10%, low temperature coefficient, BIPV-friendly).',
              'Temperature is the silent yield-killer. Crystalline silicon temperature coefficient for P_max is typically -0.3 to -0.5%/°C. A UK summer roof at 55°C cell temperature loses ~10% nameplate power. The 70–100 mm roof standoff is the cooling discipline.',
              'BS 7671 Reg 551.1.1(d) classifies PV cells as generating sets — the full Section 551 toolkit applies to every grid-tied PV install. Section 712 adds the PV-specific particular requirements on top.',
              'STC (1000 W/m², 25°C, AM 1.5) is the laboratory reference. NOCT (~45–48°C) is closer to UK operating conditions. Design against derated real-world output, not STC nameplate.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 Modules — from cells to module
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
