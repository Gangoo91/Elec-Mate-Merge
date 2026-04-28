/**
 * Module 3 · Section 6 · Subsection 5 — Electric heating: principles, applications (AC 6.1, 6.2)
 * Maps to C&G 2365-03 / Unit 302 / LO6 / AC 6.1, 6.2
 *   Layered depth: 2357 Unit 609 ELTK08 / AC 11.1, 11.2
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Electric heating principles and applications | Level 3 Module 3.6.5 | Elec-Mate';
const DESCRIPTION = 'Resistive (I²R), induction, dielectric and infra-red heating. Sizing immersion, panel, underfloor, storage heaters. The maths behind every electric heating job.';

const checks = [
  { id: 'l3-m3-6-5-immersion', question: 'A 3 kW immersion heater on 230 V draws what current?', options: ['7 A', '13 A', '23 A', '30 A'], correctIndex: 1, explanation: 'I = P/V = 3000/230 = 13.04 A. Standard immersion circuit, 16 A MCB, 2.5 mm² T&E.' },
  { id: 'l3-m3-6-5-shower', question: 'A 9 kW shower on 230 V single-phase draws:', options: ['9 A', '20 A', '32 A', '39 A'], correctIndex: 3, explanation: 'I = 9000/230 = 39.1 A. Hence dedicated 6 mm² or 10 mm² circuit with 40 A MCB.' },
  { id: 'l3-m3-6-5-time', question: 'How long to heat 100 L of water from 15 °C to 60 °C with a 3 kW immersion (assume 100% efficiency)?', options: ['10 min', '32 min', '105 min', '210 min'], correctIndex: 2, explanation: 'Energy = m × c × ΔT = 100 × 4186 × 45 = 18 837 000 J = 18.84 MJ = 5.23 kWh. Time = E/P = 5.23 / 3 = 1.74 h ≈ 105 min.' },
];

const quizQuestions = [
  { id: 1, question: 'Resistive heating efficiency:', options: ['~30%', '~70%', 'Effectively 100% (all energy → heat)', '~50%'], correctAnswer: 2, explanation: 'A heating element converts ALL the electrical energy into heat — that\'s the whole point. From a "useful output" point of view, efficiency is 100%.' },
  { id: 2, question: 'Specific heat capacity of water (used to calculate water heating energy):', options: ['1000 J/kg·K', '2200 J/kg·K', '4186 J/kg·K', '10000 J/kg·K'], correctAnswer: 2, explanation: 'c_water = 4186 J/(kg·K). Used in E = m × c × ΔT for water heating calculations.' },
  { id: 3, question: 'A storage heater stores energy as:', options: ['Battery charge', 'Heat in a high-density ceramic core overnight on Economy 7 tariff', 'Hot water', 'Compressed air'], correctAnswer: 1, explanation: 'Storage heater = bricks heated overnight on cheap Economy 7 electricity, releasing heat through the day. Output controlled by damper or fan.' },
  { id: 4, question: 'Underfloor electric heating cable typical power density:', options: ['10-50 W/m²', '100-200 W/m²', '500 W/m²', '1000 W/m²'], correctAnswer: 1, explanation: '100-200 W/m² typical for residential UFH. Higher (200-300) for "boost" or bathrooms; lower (80-150) for primary heating.' },
  { id: 5, question: 'A heat pump COP (Coefficient of Performance) of 3.5 means:', options: ['Wastes 3.5× the electricity', 'Outputs 3.5× more heat than the electrical input — net efficiency 350%', 'Costs 3.5× more', 'Has 3.5 components'], correctAnswer: 1, explanation: 'COP = heat output / electrical input. 3.5 means 1 kW electric → 3.5 kW heat, the extra coming from the air or ground source. Air-source typical 3.0-4.5 COP; ground-source higher.' },
  { id: 6, question: 'Induction hob heating works by:', options: ['Direct contact with element', 'Electromagnetic induction creating eddy currents in ferromagnetic cookware', 'Infra-red radiation', 'Convection'], correctAnswer: 1, explanation: 'Induction hob: AC coil under glass creates alternating field; ferromagnetic pan develops eddy currents and resistive heating in itself. Pan IS the element. Glass stays cool. Highly efficient.' },
  { id: 7, question: 'Building Regs Part L 2026: new homes can NOT be fitted with:', options: ['Solar PV', 'Direct-acting electric resistive heating as primary heat source (with limited exceptions)', 'Heat pumps', 'Storage heaters'], correctAnswer: 1, explanation: 'Future Homes Standard (2025+ Part L L1A): no fossil-fuel heating in new builds. Direct-acting electric resistive is generally not permitted as primary heat for energy reasons; heat pumps (or hybrid) required for primary heat.' },
  { id: 8, question: 'Dielectric heating (microwave) works by:', options: ['Contact heating', 'High-frequency E-field rotating water dipoles in food, generating heat by molecular friction', 'Infra-red', 'Convection'], correctAnswer: 1, explanation: 'Microwave (2.45 GHz typically) excites water molecules in food — they rotate to follow the field, friction creates heat throughout the food, not just at the surface.' },
];

const faqs = [
  { question: 'Why do heat pumps beat resistive electric heating?', answer: 'COP. A 1 kW resistive heater gives 1 kW heat. A 1 kW heat pump gives 3-4 kW heat (extracted from outside air or ground). Same electricity bill — 3-4× the heat. Hence Future Homes Standard mandates heat pumps for new builds.' },
  { question: 'Is electric storage heating dead?', answer: 'Not yet — useful for properties without gas where heat-pump retrofit is impractical. New "high heat retention" storage heaters with controllable output and Economy 7 charging are still installed in flats. Less efficient than heat pumps but cheaper to install.' },
  { question: 'How do you size an immersion heater?', answer: 'Tank capacity × specific heat × ΔT = energy. Divide by heater power = heating time. Plus standing losses. Most domestic 150 L tanks use 3 kW × 1 hour for full reheat from cold. Bigger tanks may need 6 kW or two parallel 3 kW heaters.' },
  { question: 'Why are induction hobs becoming standard?', answer: '85-90% efficient (vs 60% gas or 70% radiant electric). Instant control, no flame, glass stays cooler. Only downside: needs ferromagnetic pans (most modern stainless and cast iron, not aluminium or copper).' },
  { question: 'What protective device for an electric heating circuit?', answer: 'MCB sized to circuit rating, plus 30 mA RCD per BS 7671 §411.3.3. Underfloor heating in bathrooms must be supplementary equipotential bonded; outdoor or wet area needs IP-rated enclosures.' },
  { question: 'Are infrared panel heaters efficient?', answer: 'They\'re ~100% efficient as resistive heaters, but the perceived comfort is good because they heat objects (and people) directly without warming the air first. Useful in hard-to-heat rooms with high ceilings or poor insulation.' },
];

export default function Sub5() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section6')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>
          <PageHero eyebrow="Module 3 · Section 6 · Subsection 5" title="Electric heating principles and applications"
            description="Resistive (I²R), induction, dielectric, infra-red. Sizing immersion, underfloor, storage and heat pump systems." tone="yellow" />
          <TLDR points={[
            'Resistive heating: I²R losses are ALL the output — effectively 100% efficient.',
            'E (J) = m × c × ΔT for water heating. c_water = 4186 J/(kg·K).',
            'Heat pumps: COP = heat output / electrical input, typically 3-4.5 for ASHP.',
            'Induction hob: eddy currents in pan; very efficient, glass stays cool.',
            'BS 7671 §411.3.3 + Part L 2026 (Future Homes Standard) restrict resistive heating in new builds.',
          ]} />
          <LearningOutcomes outcomes={[
            'Distinguish resistive, induction, dielectric and IR heating principles.',
            'Calculate energy and time to heat water using m × c × ΔT.',
            'Calculate current draw and select supply for typical electric heating loads.',
            'Compare heat pump COP with direct resistive efficiency.',
            'Identify Building Regs Part L 2026 constraints on electric heating in new dwellings.',
          ]} initialVisibleCount={3} />
          <ContentEyebrow>Resistive heating</ContentEyebrow>
          <ConceptBlock title="I²R does all the work" plainEnglish="Pass current through a resistive element, all the electrical energy becomes heat. From a useful-output perspective, resistive heating is 100% efficient — every watt in becomes a watt of heat in the room.">
            <p>Common resistive heaters:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Immersion (3-6 kW)</strong> — element in hot water cylinder. 16-32 A circuit.</li>
              <li><strong>Shower (8-10.5 kW)</strong> — instantaneous water heater. 32-45 A dedicated circuit.</li>
              <li><strong>Storage heater (1.7-3.4 kW)</strong> — heats brick core overnight on Economy 7.</li>
              <li><strong>Panel heaters (0.5-2 kW)</strong> — convector or radiant.</li>
              <li><strong>Underfloor cable (50-200 W/m²)</strong> — embedded in screed or under tiles.</li>
              <li><strong>Tubular heaters (60-180 W)</strong> — frost protection in lofts and unheated areas.</li>
            </ul>
          </ConceptBlock>
          <ConceptBlock title="Heating element materials — nichrome, MgO insulation and the limits of resistive heating" plainEnglish="A heating element is just a length of resistance wire (typically nichrome, an 80% nickel / 20% chromium alloy) packed inside a stainless or copper sheath, electrically insulated from the sheath by compressed magnesium oxide powder. The wire dissipates I²R as heat; the MgO powder transfers heat to the sheath while keeping the live wire isolated from the case. Element design controls the surface power density (W/cm²) — too high and the element overheats and dies; too low and the unit's too big for the application.">
            <p><strong>Surface power density</strong> typically: 5–10 W/cm² for water immersion (water cools the element well), 1–3 W/cm² for air heating (air is a poor coolant — element runs much hotter for the same input), 0.1–0.5 W/cm² for underfloor cable embedded in screed (heat dissipated slowly into thermal mass). Exceeding the design value cooks the wire — the element fails as a localised hotspot rather than a whole burnout.</p>
            <p><strong>Failure modes:</strong> (1) wire-end migration where the resistance wire migrates through the MgO over thousands of thermal cycles, eventually shorting end-to-end or to the sheath. (2) corrosion through the sheath (immersion heaters in hard-water areas develop scale, then localised pitting under the scale, then perforation and water ingress to the element). (3) thermal cycling fatigue at the seal where the wire enters the sheath. Most immersion heaters fail at the seal first — replace whole element rather than try to repair.</p>
            <p><strong>Why scale matters.</strong> Limescale (CaCO₃) on an immersion element drops thermal conductivity dramatically. Element runs at higher temperature to maintain the same heat output to the water; surface power density relative to the heated metal rises; eventual element failure comes years earlier in hard-water areas. Salt-block softeners or installing low-Watt-density elements (e.g. 6 kW spread over a longer element body) extend life significantly.</p>
          </ConceptBlock>
          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <SectionRule />
          <ContentEyebrow>Heating water — energy and time</ContentEyebrow>
          <ConceptBlock title="E = m × c × ΔT" plainEnglish="Energy needed to raise water temperature = mass × specific heat × temperature change. Divide by heater power to get the time.">
            <p><strong>E (J) = m (kg) × c (J/kg·K) × ΔT (K)</strong></p>
            <p>For water: c = 4186 J/(kg·K). 1 L = 1 kg.</p>
            <p>Worked example: 200 L cylinder, 15 °C cold to 60 °C hot, 3 kW immersion.</p>
            <p>E = 200 × 4186 × 45 = 37 674 000 J = 37.67 MJ = 10.46 kWh.</p>
            <p>Time = E/P = 10.46 / 3 = 3.49 hours = 3 h 29 min.</p>
            <p>Plus standing losses through the cylinder jacket (~0.5 kWh/day for a Class A cylinder).</p>
          </ConceptBlock>
          <ConceptBlock title="Underfloor heating — cable, mat or wet system, and the cable-spacing maths" plainEnglish="Electric underfloor heating comes in three formats: loose cable spread by hand at variable spacing (precise but labour-intensive), pre-spaced mats (cable bonded to a mesh at fixed spacing — fast install but inflexible), and water/wet UFH (electrically pumped but heated by a separate heat pump or boiler — Sub6.5's discussion is electric only). Cable spacing sets the W/m² output for a given cable W/m rating.">
            <p><strong>Sizing the system.</strong> Heat loss for the room from SAP or simple U-value calc gives the required W/m² for the floor. Typical values: 100 W/m² for primary heating in a well-insulated room, 150 W/m² for primary in a less-insulated room, 200 W/m² for boost in a bathroom with a cold floor. Use a higher rating than the calc to give acceptable warm-up time.</p>
            <p><strong>Cable spacing.</strong> If the cable is rated at 17 W/m and you want 100 W/m² output, spacing = 17/100 = 0.17 m = 170 mm centre-to-centre. The mat manufacturer publishes this as a chart against W/m² and cable rating. Loose cable installations let you mix spacings — closer along the cold outside walls, wider in the room interior — for an even floor temperature.</p>
            <p><strong>Floor sensor and air sensor.</strong> The thermostat must measure FLOOR temperature (not air) on a tiled bathroom or kitchen — the regulating loop is floor-warm-enough, not room-warm-enough. The floor sensor lives inside a conduit poured into the screed near the heating cable, allowing replacement if it fails. Air-sensor-only thermostats are wrong for UFH and lead to overheating, scorched floors and laminate cracking.</p>
            <p><strong>Bathroom installation</strong> requires the cable to be in zone 2 or outside it (out of zone 0 and zone 1). Connections must be made in a junction box outside the bathroom or in an IPX rated box rated for the zone. The sub-floor heating cable itself is usually classified as fixed equipment outside zone 0 — check manufacturer guidance and BS 7671 §701.</p>
          </ConceptBlock>
          <InlineCheck {...checks[2]} />
          <SectionRule />
          <ContentEyebrow>Heat pumps and induction</ContentEyebrow>
          <ConceptBlock title="Modern, efficient electric heating" plainEnglish="Heat pumps move heat from outside to inside using a refrigeration cycle — outputs more heat than the electrical input. Induction hobs use electromagnetic coupling for direct, efficient cookware heating.">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Air-source heat pump</strong> — extracts heat from outside air. COP 3-4.5 at 7 °C; drops at lower outdoor temps. Standard for new-build under FHS.</li>
              <li><strong>Ground-source heat pump</strong> — borehole or trench loop. COP 4-5+, more stable through winter. Higher install cost.</li>
              <li><strong>Induction hob</strong> — AC coil + ferromagnetic pan. 85-90% efficient. Pan IS the element.</li>
              <li><strong>Microwave (dielectric)</strong> — 2.45 GHz E-field rotates water dipoles in food. ~50-65% wall-plug efficiency.</li>
              <li><strong>Infrared panel</strong> — radiant heating directly to people and surfaces. ~100% efficient, comfort feels warmer than ambient.</li>
            </ul>
          </ConceptBlock>
          <ConceptBlock title="Heat pump COP, SCOP and the limits of a 7 °C laboratory rating" plainEnglish="A manufacturer quotes COP at a single test condition (typically 7 °C outdoor air, 35 °C flow temperature) — the conditions where the heat pump works best. Real-world performance varies enormously across the year. SCOP (Seasonal COP) is the weighted average across a typical UK heating season, and is always lower than the headline COP. SCOP is the figure that determines actual electricity consumption.">
            <p><strong>How COP varies with outdoor temperature.</strong> An ASHP at 7 °C outdoor / 35 °C flow might deliver COP 4.0. The same unit at −5 °C outdoor / 50 °C flow drops to COP 2.2. Below −7 °C the unit may need to engage its electric backup heater (COP = 1.0) for periods, dragging seasonal performance down further. Defrost cycles every 30–60 min in cold damp conditions also temporarily reverse the cycle and consume energy from the building.</p>
            <p><strong>Flow temperature is everything.</strong> A heat pump delivering 35 °C to underfloor heating works hard but stays above COP 4. The same heat pump trying to deliver 65 °C to old-style microbore radiators struggles, often falling to COP 2.0 or worse — making it barely better than direct resistive heating. UK government guidance for FHS-compliant ASHP retrofit emphasises low-flow-temperature radiator sizing (oversized panels, often double the original size) to keep flow temp below 50 °C.</p>
            <p><strong>SCOP categories.</strong> ErP rating bands: A++ (SCOP &gt; 4.6), A+ (3.8–4.6), A (3.4–3.8), B (3.1–3.4), C (lower). For an ASHP retrofit on a typical UK house, expect SCOP 2.8–3.8 in practice. For a new-build with proper UFH and well-insulated fabric, SCOP 4.0+ is achievable. The MCS Heat Emitter Guide and SAP 10.2 calculator are the tools used in formal sizing.</p>
          </ConceptBlock>
          <ConceptBlock title="Off-peak tariffs, storage heating and the smart-grid future" plainEnglish="Storage heating bricks-and-fan systems (1960s tech) are slowly being replaced by 'high heat retention' (HHR) units that store the same heat in a smaller, better-insulated core with electronic controls and Wi-Fi. The principle is the same: charge the thermal store overnight on cheap electricity, release the heat through the day. The economics depend entirely on the tariff differential.">
            <p><strong>Economy 7</strong> gives a 7-hour off-peak window (typically 00:30–07:30, varies by region and supplier) at roughly half the day-rate price. Standard storage heaters charge a brick core with a fixed nominal kW for the whole 7 hours. HHR units modulate input based on outside temperature and forecast next-day heat demand — only charging as much as needed.</p>
            <p><strong>Smart tariffs</strong> like Octopus Agile expose half-hourly wholesale electricity prices to the meter, allowing intelligent loads to shift consumption to the cheapest periods (often midnight to 4 am, occasionally even negative pricing during high wind output). Heat batteries (Sunamp, Tepeo) work the same way with hot water, storing heat in phase-change materials.</p>
            <p><strong>The grid argument.</strong> National Grid wants to flatten demand peaks. Domestic storage heating, hot water heat batteries and EV smart charging all do this — pulling load off the 5–7 pm winter peak when wind/solar is low and gas plant is firing. Future Homes Standard recognises this with carbon-factor weighting that favours flexible loads. Direct-acting electric resistive heating still meets thermal needs but contributes more to peak demand and so receives a worse SAP rating.</p>
          </ConceptBlock>
          <RegsCallout
            source="The Building Regulations 2010 (England) — Approved Document L1A (Future Homes Standard)"
            clause="From 2025, new dwellings shall not use fossil-fuel heating. Primary heat source must be a low-carbon technology (heat pump, district heating, etc.). Direct-acting electric resistive heating is permitted only as supplementary or limited-use (e.g. towel rails, frost protection) — not as primary heat unless specific exemption."
            meaning={<>Future Homes Standard ends new gas central heating and effectively also direct electric primary heating. Heat pumps dominate new-build heating. Existing housing continues to allow resistive options for retrofit but with energy-rating consequences.</>}
            cite="Source: Approved Document L1A (Future Homes Standard, 2025)."
          />
          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.11 (Protection against fire)"
            clause="Persons, livestock and property shall be protected against harmful effects of heat or fire which may be generated or propagated in electrical installations. Manufacturers' instructions shall be taken into account in addition to the requirements of BS 7671."
            meaning={<>Resistive heating elements (immersion, shower, UFH cable, panel heaters) by definition convert all electrical energy to heat. Reg 421.11 places the duty on you to mount, ventilate and clear the heater so the heat goes where intended, not into combustible building fabric. Underfloor cable buried under thermal insulation breaches 421.11 because the cable cannot dissipate its rated W/m².</>}
            cite="Source: BS 7671:2018+A4:2026, Regulation 421.11."
          />
          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connections)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
            meaning={<>Heating circuits run at high steady-state current for hours at a time — ideal conditions for a poor termination to overheat. Reg 526.1 demands the terminal selection account for current, conductor class and the temperature reached at the terminal in service. Immersion-heater flex into a screw terminal is a classic point of failure when the terminal heats and the insulation degrades; ferrules or factory-made connectors avoid this.</>}
            cite="Source: BS 7671:2018+A4:2026, Regulation 526.1."
          />
          <SectionRule />
          <CommonMistake title="Wiring an immersion heater on a 1.5 mm² T&E with 13 A fuse" whatHappens={<>3 kW immersion = 13 A nominal. Apprentice wires it on a fused spur from a 1.5 mm² ring final. Fuse holds. But 13 A continuous on 1.5 mm² rated 14 A clipped, 9.5 A in conduit, possibly less with grouping → cable runs HOT, insulation degrades over years.</>}
            doInstead={<>Immersion = dedicated 16 A MCB, 2.5 mm² T&E circuit, plus double-pole switch. Per BS 7671 standard practice. Don't spur off ring finals for immersion — use a dedicated radial.</>} />
          <ConceptBlock title="Showers and instantaneous heaters — why a 10.5 kW circuit is the practical UK ceiling" plainEnglish="An instantaneous shower turns cold water into hot water as it flows through, with no storage tank. Required power = m × c × ΔT / time, but expressed per second: P = flow × c × ΔT, where flow is in L/s. To raise 8 L/min (0.133 L/s) by 35 °C (cold to comfortably warm) needs 0.133 × 4186 × 35 = 19.5 kW. Real-world 9–10 kW showers achieve maybe 4–5 L/min hot at the same ΔT — adequate for a basic shower, not a torrent.">
            <p><strong>Why 10.5 kW is the ceiling.</strong> A 10.5 kW shower on 230 V single-phase draws 45.7 A. That's the largest current that fits comfortably on a 50 A MCB and 10 mm² T&E (the largest commonly stocked single cable for domestic). Above this, you're into 16 mm² SWA or single-phase cable too stiff for back-box termination, and split-phase or three-phase domestic supplies (rare in UK). Hence the marketing-driven "12 kW" or "15 kW" advertised in instantaneous showers in some imports — generally not achievable on a standard UK single-phase domestic supply.</p>
            <p><strong>Pumped vs unpumped instantaneous.</strong> A pumped instantaneous shower has a small electric impeller boosting the flow rate; for a given electrical power, it can deliver more litres at lower ΔT (cooler shower but bigger flow), or fewer litres at higher ΔT. Marketing copy obscures this — always check the temperature-rise vs flow-rate curve in the data sheet for honest comparison.</p>
            <p><strong>BS 7671 specifics.</strong> Shower circuit needs dedicated radial, 30 mA RCD per §411.3.3, double-pole pull-cord switch (or fused isolator outside the bathroom for fixed wall-mount), and supplementary equipotential bonding to the shower body unless main equipotential bonding is verified to meet §415.2. Cable derating for clipping in insulation is critical — a 10 mm² cable in 100 mm rockwool can drop from 64 A clipped to 50 A buried, requiring a smaller MCB or a re-routed install.</p>
          </ConceptBlock>
          <Scenario title="Sizing supply for a 7 kW air-source heat pump installation" situation={<>Customer has a 7 kW (heat output) ASHP. COP 3.2 at design conditions. Requires single-phase 230 V supply. What current draw, cable, MCB and RCD?</>}
            whatToDo={<>Electrical input = 7000 / 3.2 = 2188 W = 2.19 kW.<br/>Steady-state I = 2188 / 230 / 0.95 (pf) = 10.0 A.<br/>BUT: ASHP compressor inrush at start can be 4-6× steady (40-60 A briefly). Type C MCB needed.<br/>Cable: 2.5 mm² T&E (Iz ≈ 24 A clipped) — adequate steady; check VD at full demand current.<br/>MCB: 16 A Type C 30 mA Type B RCD (mandatory for ASHP because of variable-speed inverter inside). All RCBO on a single device.<br/>Add SPD per §443. Connection per manufacturer wiring; some ASHP need 32 A supply for backup heater capability.</>}
            whyItMatters={<>Heat pumps are the dominant new-build heating tech. Right-sized supply, Type B RCD, and accommodation for inrush are all daily L3 design considerations.</>} />
          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            'Resistive heating: I²R losses ARE the output — effectively 100% efficient.',
            'Water heating: E = m × c × ΔT. c_water = 4186 J/(kg·K). 1 kWh = 3.6 MJ.',
            'Heat pumps deliver 3-4.5× the electrical input as heat (COP).',
            'Induction hob: eddy currents in pan — high efficiency, cool glass.',
            'Future Homes Standard 2025: ASHPs replacing gas/electric resistive in new builds.',
            'ASHPs require Type B RCD (variable-speed inverter); Type C MCB for inrush.',
          ]} />
          <Quiz title="Electric heating knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section6-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.4 Lighting principles</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Module 3 complete <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Back to Module 3</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
