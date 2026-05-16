/**
 * Module 3 · Section 4 · Subsection 5 — Transformer efficiency calculations and regulation (AC 1.2, 1.3)
 * Maps to C&G 2365-03 / Unit 302 / LO1 / AC 1.2, 1.3
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario,
  KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule,
} from '@/components/study-centre/learning';
import { TransformerSchematic } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Transformer efficiency and regulation | Level 3 Module 3.4.5 | Elec-Mate';
const DESCRIPTION =
  'Efficiency at any load, voltage regulation %, per-unit impedance, all-day efficiency, Ecodesign Tier 2 caps, vector groups and the loss-evaluation maths used on commercial transformer specifications.';

const checks = [
  { id: 'l3-m3-4-5-eta', question: '50 kVA transformer, P_fe = 0.3 kW, P_cu_FL = 0.7 kW. Efficiency at full load with pf 0.9:', options: ['90 %', '95 %', '97.8 %', '99 %'], correctIndex: 2, explanation: 'P_out = 50 × 0.9 = 45 kW. Loss = 0.3 + 0.7 = 1 kW. P_in = 46. η = 45/46 = 97.83 %.' },
  { id: 'l3-m3-4-5-reg', question: 'Transformer no-load secondary 232 V, full-load secondary 220 V. Regulation:', options: ['3 %', '5.2 %', '5.5 %', '12 %'], correctIndex: 1, explanation: 'Regulation = (V_NL - V_FL) / V_NL × 100 = (232-220)/232 × 100 = 5.17 % ≈ 5.2 %.' },
  { id: 'l3-m3-4-5-30pct', question: 'Same 50 kVA transformer at 30 % load, pf 0.85, efficiency:', options: ['90 %', '95 %', '97 %', '99 %'], correctIndex: 2, explanation: 'P_out = 0.3 × 50 × 0.85 = 12.75 kW. P_cu = 0.7 × 0.09 = 0.063 kW. Loss = 0.3 + 0.063 = 0.363 kW. η = 12.75/(12.75+0.363) = 97.2 %.' },
  { id: 'l3-m3-4-5-peak', question: 'Peak efficiency for that 50 kVA transformer occurs at what load fraction?', options: ['25 %', '50 %', '65 %', '100 %'], correctIndex: 2, explanation: 'Peak η at x = √(P_fe/P_cu_FL) = √(0.3/0.7) = √0.429 = 0.655 ≈ 65 %. Above this point copper loss dominates; below, iron loss dominates.' },
];

const quizQuestions = [
  { id: 1, question: 'Voltage regulation is:', options: ['Same as efficiency', '(V_NL - V_FL) / V_NL × 100 %', 'V_FL / V_NL', 'Tap changer setting'], correctAnswer: 1, explanation: 'Regulation = drop in secondary voltage from no-load to full-load, expressed as % of no-load.' },
  { id: 2, question: 'Typical UK distribution transformer regulation:', options: ['1 %', '3-7 %', '15 %', '25 %'], correctAnswer: 1, explanation: '4-6 % typical for distribution units. Higher reg means more drop on load — limits LV network reach.' },
  { id: 3, question: 'Energy efficiency over a day depends on:', options: ['Only the peak load', 'Load profile through 24 h, plus iron loss being constant', 'Frequency', 'Phase angle'], correctAnswer: 1, explanation: 'All-day efficiency factors the time spent at each load level. Iron loss runs 24 h regardless.' },
  { id: 4, question: 'A transformer running 24 h with 5 kW iron loss wastes how many kWh per year (approximate)?', options: ['4380', '8760', '43800', '0'], correctAnswer: 2, explanation: '5 kW × 8760 h/year = 43800 kWh/year. At 15 p/kWh that\'s £6570/year just on no-load loss.' },
  { id: 5, question: 'Regulation increases with:', options: ['Lower load', 'Higher load and worse pf', 'Iron loss', 'Frequency'], correctAnswer: 1, explanation: 'Regulation = I × Z_eq drop. More current = more drop. Inductive loads make it worse.' },
  { id: 6, question: 'Per-unit impedance Z_pu of typical UK distribution transformer:', options: ['1 %', '4-6 %', '20 %', '50 %'], correctAnswer: 1, explanation: '4-6 % is standard. Compromise between regulation (low Z preferred) and fault current limiting (high Z preferred).' },
  { id: 7, question: 'Higher Z_pu means:', options: ['Lower regulation', 'Lower fault current and higher regulation', 'Lower no-load loss', 'Lower copper loss'], correctAnswer: 1, explanation: 'Z_pu acts as a series impedance. Higher Z = more voltage drop on load AND lower fault current downstream.' },
  { id: 8, question: 'Tap changers compensate for:', options: ['Frequency drift', 'Variable load and supply voltage to keep secondary voltage near nominal', 'Phase rotation', 'Power factor'], correctAnswer: 1, explanation: 'Off-circuit tap changers select different turns to bias the ratio up or down — used when supply voltage drifts away from design.' },
];

const faqs = [
  { question: 'Why is regulation different from efficiency?', answer: 'Efficiency is energy ratio (real power lost vs delivered). Regulation is voltage ratio (volt drop from no-load to full-load). Different things — but both are measures of transformer "tightness". Low regulation = stiff secondary voltage; high efficiency = low losses.' },
  { question: 'Why don\'t I just buy a transformer with 1 % regulation?', answer: 'Lower regulation needs more copper, bigger core, looser per-unit impedance. Costs significantly more, but downstream fault currents become very high (low Z = high PSCC). 4-6 % is the engineering compromise.' },
  { question: 'How does temperature affect efficiency?', answer: 'Hot windings → higher resistance → bigger copper loss. Hot cores → slight extra hysteresis. Most transformers are designed for 75-95 °C top-oil temperature; running cooler is fine, hotter shortens life dramatically.' },
  { question: 'What\'s "load loss" on a test certificate?', answer: 'The full-load copper loss measured at the short-circuit test, corrected to standard temperature (usually 75 °C). Plus stray losses. This is the variable loss.' },
  { question: 'How do I find no-load loss without doing the test?', answer: 'Read the certificate or the data sheet. For a typical Tier 2 distribution unit at 100 kVA: ~130 W. At 250 kVA: ~270 W. At 1000 kVA: ~770 W.' },
  { question: 'Is rewinding an old transformer worth it?', answer: 'Sometimes. Rewinding gives you copper savings (better pf at the windings) but doesn\'t fix iron losses (core stays the same). For very inefficient old units, replacement with a Tier 2 modern unit usually pays back in 5-7 years on the energy saving alone.' },
  { question: 'What\'s a "no-load tap changer" and is it the same as an on-load tap changer?', answer: 'No-load tap changer (NLTC, sometimes off-circuit tap changer) is operated only when the transformer is de-energised; common on distribution units. On-load tap changer (OLTC) operates under load via a transition impedance or vacuum switch; common on grid transformers (132/33 kV upwards) where supply voltage adjustment is needed without dropping load.' },
  { question: 'How do I size a transformer for an EV charging hub?', answer: 'EV chargers run high power factor (~0.99), but with significant harmonic content. Sum the chargers\' full-power kW, divide by pf to get kVA, multiply by diversity (~0.7 if not all charging at once), add 30 % growth margin. K-13 K-rating to handle harmonics. Typical: 4 × 150 kW rapid → ~750 kVA at 0.7 diversity → 800 kVA K-13 transformer.' },
  { question: 'Why is amorphous core so much better than grain-oriented silicon steel?', answer: 'Amorphous metal (typically Fe-Si-B alloy) has no crystalline structure, so domain-wall pinning losses are very low. Hysteresis loss is roughly 70 % below grain-oriented steel; eddy current loss is also lower because the material is rolled thin. P_fe drops dramatically. Capital cost up 20-30 %, but in always-energised duty the saving pays back inside 3 years at modern UK electricity prices.' },
  { question: 'What does "BIL" mean on a transformer nameplate?', answer: 'Basic Insulation Level — the impulse withstand voltage the unit is designed to survive. For 11 kV transformers BIL is typically 75 kV; for 33 kV it\'s 170 kV. Drives surge arrester selection and tells you the impulse-withstand margin in service.' },
  { question: 'How does ambient temperature affect rated kVA?', answer: 'Standard transformer ratings assume an annual average ambient of 20 °C and a maximum of 40 °C. In hot environments (rooftop installations in summer, plant rooms close to other heat sources, indoor areas without ventilation), the rated kVA must be derated — typically 1 % per °C above the rating ambient. Document the ambient assumption and the derating in the design records.' },
  { question: 'What is "loss-of-life" calculation and when is it relevant?', answer: 'Per IEEE C57.91, the rate of insulation ageing is exponentially temperature-dependent. Operating above the rated hot-spot temperature consumes life faster; below, slower. Loss-of-life calculations sum the per-hour ageing factor over a load profile and tell you whether a planned overload schedule fits within the design 30-year insulation life. Used on critical units where running at higher rated temperature might be acceptable for short periods.' },
];

export default function Sub5() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>
          <PageHero eyebrow="Module 3 · Section 4 · Subsection 5" title="Transformer efficiency and regulation"
            description="η at any load. Voltage regulation %. Per-unit impedance. The trade-offs designers make." tone="yellow" />
          <TLDR points={[
            'η = P_out / (P_out + P_fe + x²·P_cu_FL). Plug in load fraction x.',
            'Regulation % = (V_NL − V_FL) / V_NL × 100. Typical 3-7 %.',
            'Per-unit impedance Z_pu = 4-6 % standard. Trade-off: low Z → tight regulation but high fault current.',
            'Iron loss × 8760 h = annual kWh wasted at no-load. Ecodesign Tier 2 caps this.',
            'Peak efficiency at x = √(P_fe/P_cu_FL); typical distribution unit peaks around 30-40 % load.',
            'All-day efficiency ≠ nameplate; weight by actual load profile to give the customer a real number.',
            'Reg 313.1 needs supply characteristics determined; transformer regulation and Z_pu drive both voltage and PSCC declarations on the EIC.',
          ]} />
          <LearningOutcomes outcomes={[
            'Calculate efficiency at any load using iron and full-load copper loss values.',
            'Calculate regulation from no-load and full-load secondary voltages.',
            'Explain per-unit impedance and its effect on regulation and fault current.',
            'Compute annual energy waste from no-load loss for a continuously energised transformer.',
            'Read R_pu and X_pu from a transformer test certificate and use the reactive/resistive split to predict regulation under inductive vs capacitive loads.',
            'Cascade PSCC down a sub-main to size MCB Icu correctly at downstream boards.',
            'Apply the Ecodesign Tier 2 caps and IEC 60076-20 efficiency classes when specifying replacement transformers.',
            'Choose vector group, cooling code and inrush-rated upstream protection for a commercial transformer specification.',
            'Calculate all-day efficiency from a load profile and present it alongside nameplate efficiency in a customer-facing energy report.',
          ]} initialVisibleCount={3} />
          <TransformerSchematic />
          <ContentEyebrow>Efficiency at any load</ContentEyebrow>
          <ConceptBlock title="η = output / (output + losses)" plainEnglish="Plug in your load fraction, multiply iron loss is fixed, scale copper loss by load squared.">
            <p><strong>η(x) = (x × S × pf) / (x × S × pf + P_fe + x² × P_cu_FL)</strong></p>
            <p>Worked example: 250 kVA transformer at 70 % load, pf 0.9. P_fe = 0.3 kW, P_cu_FL = 2.5 kW.</p>
            <p>P_out = 0.7 × 250 × 0.9 = 157.5 kW. P_cu(0.7) = 2.5 × 0.49 = 1.225 kW.</p>
            <p>η = 157.5 / (157.5 + 0.3 + 1.225) = 157.5 / 159.025 = 99.04 %.</p>
          </ConceptBlock>
          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[2]} />
          <SectionRule />
          <ContentEyebrow>Voltage regulation</ContentEyebrow>
          <ConceptBlock title="Drop in secondary voltage from no-load to full-load" plainEnglish="The secondary winding has resistance and leakage inductance. Loaded current flowing through them drops some voltage internally — secondary terminal voltage falls from no-load to full-load.">
            <p><strong>Regulation % = (V_NL − V_FL) / V_NL × 100</strong></p>
            <p>For inductive load (pf &lt; 1): regulation ≈ I × (R cos φ + X sin φ) / V × 100. For capacitive load, the X term becomes negative — regulation can even go to zero or negative (voltage rises on load).</p>
            <p>Worked example: 100 kVA transformer with R = 0.05 Ω and X = 0.3 Ω in secondary winding (referred to secondary). Rated I = 250 A. Load pf 0.8 lagging.</p>
            <p>Drop = 250 × (0.05 × 0.8 + 0.3 × 0.6) = 250 × (0.04 + 0.18) = 250 × 0.22 = 55 V on a 400 V system. Reg = 55/400 × 100 = 13.75 %. (High because example R and X are exaggerated; real distribution is 4-6 %.)</p>
          </ConceptBlock>
          <InlineCheck {...checks[1]} />
          <SectionRule />
          <ContentEyebrow>Per-unit impedance and fault current</ContentEyebrow>
          <ConceptBlock title="Z_pu sets both regulation and fault current" plainEnglish="Per-unit impedance is the transformer's series impedance expressed as a percentage. It sets regulation (drop on load) AND fault current (current at downstream short-circuit).">
            <p><strong>Z_pu = (V_short_circuit / V_rated) × 100 %</strong></p>
            <p>Where V_short_circuit is the primary voltage needed to drive rated current with secondary shorted. Typical UK distribution Z_pu: 4 % (small), 5 % (typical), 6 % (large).</p>
            <p>PSCC at secondary (for short downstream of transformer): I_fault = I_rated / Z_pu. So a 250 kVA 400 V transformer (I_rated = 361 A) at Z_pu = 5 %: I_fault = 361 / 0.05 = 7220 A. Switchgear and breakers must handle this.</p>
          </ConceptBlock>
          <RegsCallout
            source="ENA Engineering Recommendation P25/2 — Maximum demand and short-circuit at consumer's installation"
            clause="Distributors shall declare the prospective short-circuit current at the consumer's terminals. Typical values: domestic single-phase < 16 kA; commercial up to 25 kA at LV; industrial up to 40 kA where supplied directly from a substation."
            meaning={<>The PSCC values you see on EICs are derived from the supply transformer Z_pu. Switchgear must withstand the prospective fault current (usually higher) — that is why you read PSCC and select breakers/MCBs with adequate breaking capacity (Icn).</>}
            cite="Source: ENA Engineering Recommendation P25/2."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(c)(iv) (Prospective fault current)"
            clause="The documentation shall include prospective fault current. Designers shall determine and record the prospective (available) fault current at relevant points to select protective devices and ensure disconnection requirements are achievable."
            meaning={<>Reg 132.2(c)(iv) is the supply-characteristics record that puts PSCC on the design pack. Transformer per-unit impedance feeds the PSCC declaration on the EIC, derived from the upstream transformer Z<sub>pu</sub> and any cable between transformer and origin. A transformer datasheet that quotes regulation, R<sub>pu</sub> and X<sub>pu</sub> separately is what you need to discharge Reg 132.2(c)(iv) properly on commercial supply work.</>}
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.2(c)(iv) — prospective fault current declaration."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1"
            clause="The electrical installation shall be designed by one or more skilled persons to provide for: (a) the protection of persons, livestock and property in accordance with Section 131; and (b) the proper functioning of the electrical installation for the intended use."
            meaning={<>Sizing a transformer is the headline Reg 132.1 act for any commercial supply. The skilled person matches kVA to peak demand × diversity × growth, picks a vector group compatible with the existing system, sets Z<sub>pu</sub> to balance regulation against fault current, and chooses cooling and IP for the installed location. The efficiency and regulation maths in this Sub is the calculation chain that turns the brief into a defensible specification.</>}
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.1 — design of electrical installations."
          />

          <SectionRule />

          <ContentEyebrow>The all-day efficiency framing</ContentEyebrow>

          <ConceptBlock
            title="All-day efficiency vs nameplate efficiency"
            plainEnglish="Nameplate efficiency is measured at the design optimum (typically rated load, 0.8-1.0 pf, standard temperature). All-day efficiency is the integral over 24 h of the operating profile — and for many distribution transformers it&apos;s significantly lower than nameplate because the unit spends most of the day at light load where iron loss dominates."
            onSite="L3 framing for an energy review: ask the customer for the half-hourly meter data for the year. From that you can calculate average load fraction by hour, weight the efficiency at each load fraction, and produce a meaningful all-day efficiency number — not the nameplate number that flatters the spec sheet."
          >
            <p>All-day efficiency formula:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>η_all-day = (Σ P_out_i × t_i) / (Σ (P_out_i + P_fe + x_i² · P_cu_FL) × t_i)</li>
              <li>Where i indexes time intervals, P_out_i is real output power in interval i, t_i is duration of interval i.</li>
              <li>Iron loss runs every hour (×24); copper loss scales with x² for each interval.</li>
              <li>If the unit runs 50 % daytime / 10 % overnight, all-day efficiency is dominated by overnight light-load behaviour.</li>
            </ul>
            <p>Worked: 250 kVA distribution transformer, P_fe = 0.3 kW, P_cu_FL = 2.5 kW, pf 0.9.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Daytime (12 h, 60 % load): P_out = 0.6 × 250 × 0.9 = 135 kW. P_cu = 2.5 × 0.36 = 0.9 kW. Loss = 0.3 + 0.9 = 1.2 kW. η_day = 135/136.2 = 99.1 %.</li>
              <li>Overnight (12 h, 10 % load): P_out = 0.1 × 250 × 0.9 = 22.5 kW. P_cu = 2.5 × 0.01 = 0.025 kW. Loss = 0.3 + 0.025 = 0.325 kW. η_night = 22.5/22.825 = 98.6 %.</li>
              <li>All-day energy out = 135 × 12 + 22.5 × 12 = 1890 kWh. All-day energy in = 136.2 × 12 + 22.825 × 12 = 1908.3 kWh. η_all-day = 1890/1908.3 = 99.04 %.</li>
              <li>Compare to nameplate (full-load) η: at 100 % load and 0.9 pf, η = 225/(225 + 0.3 + 2.5) = 225/227.8 = 98.77 %. Nameplate is actually lower because at full load the copper loss dominates.</li>
              <li>Conclusion: this unit is over-sized for the daytime load and is operating in its sweet spot. Replacement with a smaller unit would not necessarily improve efficiency.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Cooling regimes and what the abbreviations mean"
            plainEnglish="Transformer cooling is described by a four-letter code defining the internal coolant, internal circulation method, external coolant, and external circulation method. ONAN = Oil Natural / Air Natural — the basic distribution unit. ONAF = Oil Natural / Air Forced (fans on the radiators when load is high). OFAF = Oil Forced / Air Forced. KNAN, KNAF — synthetic ester (K) replacing mineral oil (O), used where fire risk is a concern."
            onSite="Reading a transformer nameplate, the cooling code tells you maintenance regime and rating flexibility. ONAN units have a single rating; ONAN/ONAF units typically have two ratings (e.g. 1000 kVA ONAN / 1500 kVA ONAF) — the higher rating only available when fans are running. Specify the ONAF rating if the load profile justifies the fan running 20 %+ of the time."
          >
            <p>Common transformer cooling codes and their use:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ONAN</strong> — basic oil-immersed natural cooling. Standard for outdoor distribution. No moving parts; quiet; low maintenance.</li>
              <li><strong>ONAN/ONAF</strong> — dual-rated; fans engage automatically above a temperature threshold. Higher peak rating for occasional overload.</li>
              <li><strong>OFAF</strong> — forced oil and forced air; required for transformers above ~5 MVA or where ambient is high.</li>
              <li><strong>OFWF</strong> — forced oil / forced water (heat exchanger). Used where air cooling impractical (underground substations, ships).</li>
              <li><strong>AN</strong> — dry-type air natural. Indoor switchroom application.</li>
              <li><strong>AF</strong> — dry-type air forced. Higher rating in same physical envelope.</li>
              <li><strong>KNAN / KNAF</strong> — synthetic ester instead of mineral oil; biodegradable; high flash point (~300 °C); used in occupied buildings, BSL areas, environmentally sensitive sites.</li>
            </ul>
            <p>
              Maintenance implications: oil-cooled units (ON or OF) need annual oil tests (DGA,
              moisture, breakdown voltage). Dry-type (A) need only periodic visual inspection and
              dust cleaning. Synthetic ester units have similar test regime to mineral oil but
              with different acceptance limits.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Loss-evaluation contracts — capitalising future losses at the bid stage"
            plainEnglish="Large-scale buyers (DNOs, transmission operators, big industrials) commonly include a loss-evaluation formula in transformer purchase contracts. The bidder declares P_fe and P_cu_FL guaranteed values; the buyer applies a £/W capitalisation factor (e.g. £8/W for iron loss, £1.50/W for copper loss based on lifetime energy cost at present value); the resulting capitalised loss cost is added to the bid price. Lowest TOTAL (capital + capitalised loss) wins."
            onSite="L3 implication on commercial procurement: a transformer with 200 W lower iron loss might bid £3000 above a competitor on capital but win on total capitalised cost. Customers serious about lifetime cost — hospitals, data centres, industrial groups — increasingly use this evaluation and you should be ready to discuss it on bigger bids."
          >
            <p>Worked loss-evaluation example for a 1000 kVA bid:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Bidder A:</strong> capital £18 000, P_fe = 770 W, P_cu_FL = 7600 W. Loss capitalisation = 770 × £8 + 7600 × £1.50 = £6160 + £11 400 = £17 560. Total bid £35 560.</li>
              <li><strong>Bidder B:</strong> capital £21 000, P_fe = 540 W, P_cu_FL = 6500 W. Loss capitalisation = 540 × £8 + 6500 × £1.50 = £4320 + £9750 = £14 070. Total bid £35 070.</li>
              <li><strong>Bidder C (amorphous):</strong> capital £24 000, P_fe = 230 W, P_cu_FL = 7000 W. Loss cap = 230 × £8 + 7000 × £1.50 = £1840 + £10 500 = £12 340. Total bid £36 340.</li>
              <li>Despite being most expensive on capital, Bidder C&apos;s total cost is only £780 above the cheapest, AND the lifetime energy savings are paid by the customer over 30 years not by the bidder.</li>
              <li>Different £/W factors change the answer: at high electricity prices the amorphous core wins comfortably; at low prices the basic Tier 2 unit wins.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Comparing efficiency standards — Tier 2 vs IEC 60076-20"
            plainEnglish="Two standards drive efficiency on transformers sold in the UK. (1) UK Ecodesign retained law (originally EU 548/2014) sets caps on losses for medium-power transformers — what we call &apos;Tier 2&apos;. (2) IEC 60076-20 is the international efficiency-class standard (similar in structure to motor IE classes) and labels transformers as Ck1, Ck2, Ck3 etc. Best-in-class units exceed both."
            onSite="When specifying, use the IEC class on the order along with the Tier 2 cap as the legal floor. A &apos;Ck1&apos; transformer sits well below the Tier 2 cap and may have shorter payback in always-energised applications. Customers focused on sustainability ratings (BREEAM, LEED) often require Ck1 or Ck2 explicitly."
          >
            <p>Comparison of efficiency frameworks at the 1000 kVA point:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Tier 1 (legacy 2015)</strong> — P_fe ≤ 1100 W; P_cu ≤ 9000 W. Floor for 2015-2021 sales.</li>
              <li><strong>Tier 2 (current 2021)</strong> — P_fe ≤ 770 W; P_cu ≤ 7600 W. Floor for new units in the UK.</li>
              <li><strong>IEC Ck3</strong> — equivalent to Tier 2; basic efficiency class.</li>
              <li><strong>IEC Ck2</strong> — P_fe ≈ 690 W; P_cu ≈ 6800 W. Mid-class.</li>
              <li><strong>IEC Ck1</strong> — P_fe ≈ 540 W; P_cu ≈ 6000 W. Premium class.</li>
              <li><strong>Amorphous core (best in class)</strong> — P_fe ≈ 230 W. 70 % iron-loss reduction; capital cost +20-30 % but payback &lt;3 years on always-energised duty at modern electricity prices.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake title="Quoting nameplate efficiency at any load level" whatHappens={<>EICR includes "transformer is 99 % efficient". Customer actual load is 15 %. Real efficiency at that load is closer to 95 %. Customer energy report is wildly off.</>}
            doInstead={<>Calculate efficiency at the actual operating load. At light load, iron loss dominates and efficiency drops sharply.</>} />

          <CommonMistake
            title="Specifying breakers without considering inrush"
            whatHappens={
              <>
                Engineer specifies a Type B MCB upstream of a 100 kVA transformer because
                &quot;it&apos;s only 100 kVA, the standard breaker is fine&quot;. On the first
                cold energisation, inrush current at 8-10× rated lasts ~0.2 s and the Type B
                trips on its 5× I<sub>n</sub> magnetic threshold. Site loses supply before
                anything is connected. Repeat trips persuade the team to replace the MCB with
                an oversized Type B — which then fails to protect the cable on real overload.
              </>
            }
            doInstead={
              <>
                Type C MCB minimum (10× I<sub>n</sub> magnetic threshold) for transformers up to
                ~50 kVA; Type D (20× I<sub>n</sub>) for larger units; or motor-rated HRC fuse
                with manufacturer&apos;s coordination chart. The breaker must ride through
                inrush AND provide overload and fault protection — both jobs done by selecting
                the right type and rating.
              </>
            }
          />

          <CommonMistake
            title="Paralleling transformers without checking vector groups"
            whatHappens={
              <>
                Site adds a second transformer to share load with an existing unit. Vector
                groups not verified — one is Dyn11, new one is Dyn1 (30° apart). Once
                paralleled, circulating current flows continuously through both transformers
                and the busbar. Equipment runs hot; oil temperature rises in the older unit;
                eventual insulation failure. Investigation shows the units were never
                compatible for parallel operation.
              </>
            }
            doInstead={
              <>
                Before any parallel operation: same vector group, same Z<sub>pu</sub> within
                ±10 %, same turns ratio at the operating tap, same polarity, same earthing
                arrangement. If any of these don&apos;t match, the units cannot be paralleled
                — period. Use a tie breaker that physically prevents simultaneous operation,
                or add a compatible second transformer.
              </>
            }
          />
          <Scenario title="Sizing a substation transformer for an industrial site" situation={<>Customer wants a new 1 MVA dedicated transformer. They need calculation of: (a) Annual iron loss kWh; (b) Average efficiency given load profile (50 % daytime 12 h, 10 % overnight 12 h); (c) Likely PSCC.</>}
            whatToDo={<>Tier 2 1000 kVA: P_fe ≈ 770 W, P_cu_FL ≈ 9 kW.<br/>(a) Annual iron loss = 0.77 × 8760 = 6745 kWh.<br/>(b) Daytime 50 %: P_out = 500 × 0.85 = 425 kW; P_cu = 9 × 0.25 = 2.25 kW; loss = 0.77 + 2.25 = 3.02 kW; η = 425/428 = 99.3 %.<br/>Overnight 10 %: P_out = 100 × 0.85 = 85 kW; P_cu = 9 × 0.01 = 0.09 kW; loss = 0.77 + 0.09 = 0.86 kW; η = 85/85.86 = 99.0 %.<br/>(c) Z_pu 5 % typical → PSCC at LV = (1000/√3/0.4)/0.05 = 1443/0.05 = 28.9 kA. Switchgear to BS EN 60947-2 with Icu ≥ 30 kA.</>}
            whyItMatters={<>The maths chain (load profile → loss → η; Z_pu → PSCC) drives both energy report and switchgear specification. Same dataset.</>} />
          <SectionRule />

          <ContentEyebrow>Apprentice depth — efficiency, regulation, PSCC on real units</ContentEyebrow>

          <ConceptBlock title="Reading the regulation triangle on a transformer cert" plainEnglish="Most transformer test certificates give you R_pu and X_pu separately rather than just Z_pu. R_pu is the resistive component (drives copper loss). X_pu is the reactive component (drives leakage flux). Z_pu = √(R_pu² + X_pu²). The split tells you whether regulation will be worse on inductive or capacitive loads.">
            <p>Standard relationship for any pf:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Approximate regulation % ≈ R_pu × cos φ + X_pu × sin φ</li>
              <li>Inductive load (lagging): both terms add → worst regulation.</li>
              <li>Unity pf load: only R_pu term — moderate regulation.</li>
              <li>Capacitive load (leading): X_pu term goes negative → regulation reduces (can go to zero or negative).</li>
            </ul>
            <p>Worked: 500 kVA transformer, R_pu = 1.2 %, X_pu = 4.8 % (so Z_pu = 4.95 %).</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At pf 0.8 lagging: reg ≈ 1.2 × 0.8 + 4.8 × 0.6 = 0.96 + 2.88 = 3.84 %.</li>
              <li>At pf 1.0: reg ≈ 1.2 % only.</li>
              <li>At pf 0.8 leading: reg ≈ 1.2 × 0.8 - 4.8 × 0.6 = 0.96 - 2.88 = -1.92 % (voltage RISES on load).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="PSCC reduction down a long sub-main" plainEnglish="The supply transformer sets PSCC at the LV terminals — but as you go further down the install through cable runs and additional impedance, fault current drops. By the time you reach a small final-circuit DB at the end of a 50 m sub-main, PSCC may have halved. Important for selecting MCB Icu correctly at each board.">
            <p>Standard cascade calculation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Z_loop_total at any point = Z_supply + Z_cable_to_that_point.</li>
              <li>PSCC_at_point = V_phase / Z_loop_total.</li>
              <li>Cable impedance from BS 7671 Appendix 4 (mΩ/m for R + X).</li>
            </ul>
            <p>Worked: 250 kVA 400 V transformer, PSCC at LV = 7.2 kA. Sub-main 50 m of 50 mm² 4-core SWA. R = 0.46 mΩ/m, X ≈ 0.08 mΩ/m. Loop Z added = √((0.046)² + (0.008)²) = 0.047 Ω. Original Z = V/PSCC = 230/7200 = 0.032 Ω. New Z = 0.032 + 0.047 = 0.079 Ω. PSCC at sub-DB = 230/0.079 = 2.9 kA. Halved. Sub-DB MCBs only need 6 kA Icu, not 10 kA.</p>
          </ConceptBlock>

          <ConceptBlock title="Tap changer effect on efficiency and regulation" plainEnglish="Setting the tap to compensate for high or low supply voltage works — but the tap position changes the per-unit impedance slightly because the in-circuit number of turns changes. Effect on Z_pu is typically &lt;1 % between extreme taps, so insignificant for most calculations.">
            <p>What the tap actually does to performance:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Tap +5 % (more secondary V at no-load)</strong> — fewer primary turns, so flux density rises slightly. Iron loss may increase 5-15 %. Only noticeable on always-energised units.</li>
              <li><strong>Tap -5 % (less secondary V)</strong> — more primary turns, lower flux. Iron loss drops slightly.</li>
              <li><strong>Z_pu change</strong> — moves by ~0.2-0.5 % between extreme taps. Negligible.</li>
              <li><strong>Practical advice</strong> — set tap once at commissioning to suit local supply, leave alone unless supply voltage drifts outside ±5 % range.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Annual cost of an inefficient transformer — the customer-facing number" plainEnglish="Iron loss runs 24/7. Copper loss runs whenever there is load. Translate both into £/year using actual electricity cost and you can give the customer a real number that drives their decision on replacement vs keep.">
            <p>Standard annual-cost formula:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Iron cost = P_fe (kW) × 8760 h × £/kWh.</li>
              <li>Copper cost = P_cu_FL × Σ(x²_i × t_i) × £/kWh, summed over the load profile.</li>
              <li>Or simplified: P_cu_FL × x_avg² × 8760 × £/kWh (slight underestimate due to peakiness).</li>
            </ul>
            <p>Worked: 1000 kVA old transformer, P_fe = 3 kW, P_cu_FL = 12 kW, average load 40 %, electricity 22 p/kWh.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Iron cost = 3 × 8760 × 0.22 = £5782/year.</li>
              <li>Copper cost = 12 × 0.16 × 8760 × 0.22 = £3702/year.</li>
              <li>Total annual loss cost = £9484/year.</li>
              <li>Tier 2 replacement (P_fe = 0.6 kW, P_cu_FL = 6 kW): annual cost ~£3010. Saving £6474/year.</li>
              <li>Replacement cost ~£25 000. Payback under 4 years.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Why distribution transformers oversize for harmonic loads" plainEnglish="If a transformer feeds harmonic-rich loads (LED, IT, VFD), its effective load loss rises because higher-frequency currents have higher resistance (skin effect) and produce extra eddy losses in the windings. The factory-rated kVA must be derated. K-rated transformers are designed not to need this derating.">
            <p>Standard derating practice for non-K-rated transformers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>THD_I &lt; 5 %</strong> — no derating, run at 100 % rated.</li>
              <li><strong>THD_I 5-15 %</strong> — derate to 90 % rated.</li>
              <li><strong>THD_I 15-30 %</strong> — derate to 75 % rated.</li>
              <li><strong>THD_I &gt; 30 %</strong> — derate to 60 % rated OR specify K-13 or higher.</li>
            </ul>
            <p>
              Or use the IEEE C57.110 K-factor formula: K = Σ (h² × I_h² / I_total²) where h is
              harmonic order. For a typical office load with significant 3rd, 5th, 7th: K = 4 to 8
              is common. Order a K-13 transformer; rate it at full nameplate kVA. Net cost is
              lower than buying an oversized standard unit and derating.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The Ecodesign Tier 2 cap — why the regulatory floor on losses keeps moving"
            plainEnglish="UK retained Ecodesign rules (originally Commission Regulation (EU) 548/2014, retained via the Ecodesign for Energy-Related Products Regulations 2010 as amended) place legal caps on the no-load (P_fe) and load (P_cu) losses of medium-power transformers placed on the market. Tier 1 took effect in 2015; Tier 2 (the tighter cap) came in from July 2021. New transformers sold in the UK have to meet Tier 2."
            onSite="What this means at L3 design: when you specify a replacement transformer, the loss values quoted on the new unit are typically 30-50 % lower than the unit it replaces. The energy saving funds the capital cost over 4-7 years on a continuously-energised unit. Quoting payback in years is what unlocks customer approval."
          >
            <p>Tier 2 caps for liquid-immersed three-phase distribution transformers (representative values, low harmonic level):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100 kVA</strong> — P_fe ≤ 130 W, P_cu ≤ 1100 W (Ck class).</li>
              <li><strong>250 kVA</strong> — P_fe ≤ 270 W, P_cu ≤ 2150 W.</li>
              <li><strong>500 kVA</strong> — P_fe ≤ 460 W, P_cu ≤ 3900 W.</li>
              <li><strong>1000 kVA</strong> — P_fe ≤ 770 W, P_cu ≤ 7600 W.</li>
              <li><strong>2500 kVA</strong> — P_fe ≤ 1750 W, P_cu ≤ 16500 W.</li>
            </ul>
            <p>
              Dry-type units have separate (slightly looser) caps. Always check the latest schedule
              for the unit being specified — the Tier 2 numbers are the floor, not a target.
              Premium suppliers offer transformers significantly below the Tier 2 cap, with
              correspondingly higher capital cost and shorter payback in always-energised
              applications.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Temperature class, top-oil temperature and life expectancy"
            plainEnglish="A transformer&apos;s insulating system has a temperature class (commonly 105 °C, 130 °C, 155 °C, 180 °C, 220 °C). The class is the maximum continuous operating temperature the insulation tolerates without accelerated ageing. Run cooler and the unit lasts longer; run hotter and the insulation degrades exponentially — a rough rule of thumb is that life halves for every 7-10 °C above the rated hot-spot temperature."
            onSite="Top-oil temperature gauges on oil-filled transformers and winding-temperature simulators give you the operational data to manage the unit. A 250 kVA distribution transformer at consistent 95 °C top oil and 110 °C winding hot-spot has a different remaining life from one at 75/95 °C — even if both are within rated. Monitor, log and trend; act on rises that don&apos;t correlate with load."
          >
            <p>Standard temperature classes and what they mean:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class A (105 °C)</strong> — paper-and-oil insulation; standard distribution transformers.</li>
              <li><strong>Class B (130 °C)</strong> — improved insulation; some dry-type general-purpose.</li>
              <li><strong>Class F (155 °C)</strong> — typical for medium dry-type; common motor class also.</li>
              <li><strong>Class H (180 °C)</strong> — high-temperature dry-type, cast resin.</li>
              <li><strong>Class N / R (200-220 °C)</strong> — special high-temperature applications, traction.</li>
            </ul>
            <p>
              Hot-spot temperature is the key limit, not bulk winding temperature. The hot spot
              is typically 15-20 °C above bulk winding due to localised heating where flux
              concentrates. Modern test certs quote both. Operating below the hot-spot rating is
              what gives you the design 30-40 year life; chronic overheating from sustained
              overload, blocked cooling or undersized rating gives you 10-15 years instead.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Inrush current — what it does to upstream protection"
            plainEnglish="When a transformer is energised cold, the magnetising inrush current can be 8-12 times its rated full-load current for the first half-cycle, decaying exponentially to nominal magnetising current (~1-3 % of rated) over 0.1-1 second. Upstream protection has to ride through this without tripping while still detecting genuine faults."
            onSite="Practical L3 implication: an HRC fuse or MCB upstream of a transformer must be selected to allow inrush. Use motor-rated MCBs (Type C minimum, Type D for larger units), or HRC fuses with motor-start derating. For larger transformers (>200 kVA) consider gG fuse coordination charts or specify a relay-controlled circuit breaker with inrush-restraint."
          >
            <p>Inrush selection guide:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&lt; 50 kVA</strong> — Type C MCB sized 1.5× rated I; inrush 6-8× rated; rides through.</li>
              <li><strong>50-200 kVA</strong> — Type D MCB or gG fuse with motor derating; inrush 8-10× rated.</li>
              <li><strong>&gt; 200 kVA</strong> — relay-controlled breaker with inrush-restraint setting; inrush 10-12× rated.</li>
              <li><strong>HRC fuse selection</strong> — gG fuse must withstand 12× rated I for 0.1 s and 8× for 0.5 s without operating.</li>
              <li><strong>Soft-start consideration</strong> — for very large transformers (&gt;1 MVA) point-on-wave switching or pre-magnetising can reduce inrush by 50-70 %.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Vector group selection — Dyn11 and what the symbols mean"
            plainEnglish="A transformer&apos;s vector group describes how the primary and secondary windings connect (delta D, star Y, zigzag Z, neutral n if accessible) and the phase shift between them in 30° increments (0, 1, 5, 6, 7, 11). The most common UK distribution group is Dyn11 — delta primary, star secondary with accessible neutral, secondary leading primary by 30°."
            onSite="L3 framing: vector groups become important when paralleling transformers, specifying transformers for fault-current management, or interfacing generation. Wrong vector group on a parallel install means circulating currents, equipment damage and grid-code breach. The DNO&apos;s vector group requirement is part of the G99 conditions for new generation connections."
          >
            <p>Common UK transformer vector groups and their applications:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dyn11</strong> — UK standard distribution. Delta HV (no neutral), star LV with neutral; 30° lead. Robust to unbalanced LV loads.</li>
              <li><strong>Dyn1</strong> — same connections as Dyn11 but 30° lag (mirror). Used where existing local network is on this group.</li>
              <li><strong>Yyn0</strong> — star/star with neutral, no phase shift. Used for some large industrial; needs delta tertiary for unbalanced loads.</li>
              <li><strong>YNd1 / YNd11</strong> — star primary with neutral, delta secondary. Generator step-up units. The HV neutral provides earth reference for the grid.</li>
              <li><strong>Dyn5 / Dyn7</strong> — special phase shifts; used for parallel paths through different groups (rare in UK).</li>
              <li><strong>Zigzag (Yz / Dz)</strong> — for harmonic mitigation and earthing transformers.</li>
            </ul>
            <p>
              When paralleling: same vector group required AND same Z<sub>pu</sub> within ~10 %
              AND same turns ratio AND same polarity. Get any of these wrong and circulating
              currents flow even at no load. The protection settings need to detect this and trip
              before damage occurs.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Test certificate reading — what to look for at acceptance"
            plainEnglish="Every new transformer comes with a routine test certificate covering ratio, polarity, no-load loss, load loss, regulation, insulation resistance and winding resistance. Reading it correctly at delivery saves problems later — and feeds directly into the design records you keep on the EIC and the building safety case."
            onSite="At factory acceptance test (FAT) or site delivery, walk through the cert. Confirm the rated kVA matches the order. Check the no-load and load losses are within 10 % of nameplate (Ecodesign Tier 2 caps). Check Z_pu is within ±10 % of design. Check vector group matches order. Check tap settings on the no-load tap changer match commissioning intent."
          >
            <p>Routine test certificate fields and acceptance criteria:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Voltage ratio test</strong> — measured ratio at each tap; tolerance ±0.5 % of nameplate.</li>
              <li><strong>Polarity / phase relationship</strong> — confirms vector group; vital before paralleling.</li>
              <li><strong>No-load loss (P<sub>fe</sub>)</strong> — measured at rated voltage and frequency; tolerance +15 % of declared.</li>
              <li><strong>Load loss (P<sub>cu</sub>) at 75 °C</strong> — measured at full rated current with secondary shorted; tolerance +15 %.</li>
              <li><strong>Per-unit impedance (Z<sub>pu</sub>)</strong> — derived from the load-loss test; tolerance ±10 % of declared.</li>
              <li><strong>Insulation resistance</strong> — at 1 minute and 10 minutes; minimum 1000 MΩ for new units (typically much higher).</li>
              <li><strong>Winding resistance</strong> — DC test on each winding; baseline for future maintenance trending.</li>
              <li><strong>Sound level</strong> — for indoor installations, typically &lt; 65 dBA at 1 m.</li>
              <li><strong>Hi-pot test</strong> — applied voltage to all live parts vs earth and between windings; confirms insulation integrity.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why economic loading does not equal full-load efficiency"
            plainEnglish="A transformer&apos;s peak efficiency point is where iron loss equals load-related copper loss, not at full load. Mathematically: peak η at x where P_fe = x²·P_cu_FL, so x_peak = √(P_fe/P_cu_FL). For a typical distribution unit with P_fe = 0.3 kW and P_cu_FL = 2.5 kW, x_peak = √(0.3/2.5) = 0.346 ≈ 35 % load. So if a transformer runs continuously at 50 % load, it&apos;s already past its peak efficiency point."
            onSite="L3 design implication: don&apos;t oversize transformers for &apos;future-proofing&apos; without doing the loading maths. A 1 MVA transformer at 25 % continuous load may be less efficient over the year than a 500 kVA at 50 % load — even though the bigger unit has a lower full-load efficiency, the smaller unit operates closer to its peak. Match the rating to the actual demand profile, not to a theoretical peak."
          >
            <p>Worked: distribution loading question. Customer site demand profile is 350 kW continuous (95 % of the year), pf 0.95, with occasional half-hour peaks to 600 kW (5 % of the year).</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Peak demand kVA = 600 / 0.95 = 631 kVA. Continuous = 368 kVA.</li>
              <li><strong>Option A — 800 kVA transformer.</strong> Peak load fraction 0.79; continuous 0.46. Tier 2: P_fe ≈ 650 W, P_cu_FL ≈ 6 kW. Continuous loss = 0.65 + 6 × 0.46² = 0.65 + 1.27 = 1.92 kW. Annual loss energy ≈ 1.92 × 8760 = 16 800 kWh.</li>
              <li><strong>Option B — 1000 kVA transformer.</strong> Peak load fraction 0.63; continuous 0.37. Tier 2: P_fe ≈ 770 W, P_cu_FL ≈ 7.6 kW. Continuous loss = 0.77 + 7.6 × 0.37² = 0.77 + 1.04 = 1.81 kW. Annual ≈ 15 900 kWh.</li>
              <li><strong>Option C — 630 kVA transformer.</strong> Peak load fraction 1.0; continuous 0.58. Tier 2: P_fe ≈ 540 W, P_cu_FL ≈ 5 kW. Continuous loss = 0.54 + 5 × 0.58² = 0.54 + 1.68 = 2.22 kW. Annual ≈ 19 500 kWh. But peaks at 100 % may shorten life.</li>
              <li>The right answer depends on capital cost vs annual loss cost over 30 years and on tolerance to peak heating.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Treating regulation % as a fixed number regardless of load"
            whatHappens={<>EICR mentions &quot;5 % regulation&quot; on a substation transformer. Estimator uses 5 % regulation in the voltage-drop calc for a sub-main feed; gets the wrong answer because regulation is at full load, not at the actual sub-main current. Cable selected on too-pessimistic V<sub>drop</sub>, oversized, customer overcharged.</>}
            doInstead={<>Regulation scales linearly with current. Quoted regulation (e.g. 5 %) is at rated current. At 60 % load, the regulation is 0.6 × 5 % = 3 %. Use the actual operating current to get the actual operating regulation. The quoted figure is the worst case at rated load.</>}
          />

          <Scenario
            title="Substation efficiency review for a hospital site"
            situation={<>A 1980s hospital has two parallel-operated 1500 kVA distribution transformers serving the site at 11 kV / 400 V. Combined site demand averages 800 kW continuous (load split roughly 50/50 between transformers). Estate manager asks: are these transformers cost-effective to keep in service or should they be replaced with modern Tier 2 units?</>}
            whatToDo={<>Gather data: nameplate ratings, age, no-load loss values from original certs (often P_fe ≈ 4 kW each on 1980s 1500 kVA), measured load loss, top-oil temperature trend over the last year, any maintenance issues. Calculate current annual loss cost: per unit, P_fe × 8760 = 4 × 8760 = 35 040 kWh × 22 p = £7709/year iron only. Plus copper at average 27 % load (400/1500 = 0.27): P_cu = 0.27² × P_cu_FL ≈ 0.073 × 18 = 1.31 kW × 8760 × 0.22 = £2526/year copper. Total per unit ≈ £10 235/year × 2 units = £20 470/year combined.<br /><br />Tier 2 replacement (1500 kVA modern): P_fe ≈ 1.1 kW, P_cu_FL ≈ 12 kW. Iron only £2120/year × 2 = £4240. Copper at 27 %: 0.073 × 12 = 0.876 × 8760 × 0.22 = £1689 × 2 = £3378. Total replacement £7618/year. Annual saving £12 852.<br /><br />Capital: replacement of 2 × 1500 kVA distribution units typically £80-120k installed (excluding switchgear). Payback 6-9 years on energy alone, plus reliability gain on a critical hospital site, plus 30-year life vs reaching end-of-life on 1980s kit. Recommendation: replace, with phased changeover to maintain continuity. The case is straightforwardly positive for a hospital where the transformers run 24/7.</>}
            whyItMatters={<>The numbers tell the story. The customer&apos;s decision lever is the £-per-year, the payback period and the reliability benefit. The L3 framing — gather actual data, calculate from real losses, present in £/year + payback — is what turns a transformer-replacement opinion into an evidenced design recommendation.</>}
          />

          <SectionRule />

          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            'η(x) = output / (output + P_fe + x²·P_cu_FL). Plug load fraction x in directly.',
            'Regulation % = (V_NL − V_FL) / V_NL × 100. Typical 3-7 % for distribution; scales linearly with load.',
            'R_pu and X_pu separate; Z_pu = √(R_pu² + X_pu²); split tells you whether load is regulation-friendly or hostile.',
            'Z_pu sets regulation AND fault current. 4-6 % standard for UK distribution units.',
            'PSCC = I_rated / Z_pu — drives switchgear breaking-capacity selection at LV terminals.',
            'PSCC reduces down sub-mains; cascade calc avoids over-spec breakers at small DBs.',
            'Iron loss × 8760 = annual kWh at no-load — the Tier 2 cap reflects this cost.',
            'Quote efficiency at typical operating load, not nameplate full-load.',
            'Inrush 8-12× rated for 0.1-1 s; specify Type C/D MCB or motor-derated HRC fuse upstream.',
            'Vector group Dyn11 is UK distribution standard; matters for paralleling and G99 connections.',
            'Tier 2 Ecodesign loss caps are the legal floor; IEC Ck1 / amorphous-core units sit well below for premium specs.',
          ]} />
          <Quiz title="Efficiency and regulation knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section4-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.4 Transformer losses</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section4-6')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.6 Transformer types and applications</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
