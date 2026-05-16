/**
 * Module 3 · Section 4 · Subsection 4 — Transformer losses: copper and iron (AC 1.2)
 * Maps to C&G 2365-03 / Unit 302 / LO1 / AC 1.2
 *   Layered depth: 2357 Unit 609 ELTK08 / AC 6.5
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario,
  KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { TransformerSchematic } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Transformer losses — copper and iron | Level 3 Module 3.4.4 | Elec-Mate';
const DESCRIPTION =
  'Iron loss (constant) + copper loss (∝ I²). Why the maximum-efficiency point is where they\'re equal. Calculations for full and part load.';

const checks = [
  {
    id: 'l3-m3-4-4-cu',
    question: 'A 100 kVA transformer has copper loss 1.5 kW at full load. At 50 % load, copper loss is:',
    options: ['0.375 kW', '0.75 kW', '1.5 kW', '3.0 kW'],
    correctIndex: 0,
    explanation: 'P_cu ∝ I². Half the current → quarter the loss. 1.5 × 0.25 = 0.375 kW.',
  },
  {
    id: 'l3-m3-4-4-fe',
    question: 'A transformer has iron loss 800 W at no load. At 50 % load, iron loss is:',
    options: ['200 W', '400 W', '800 W', '1600 W'],
    correctIndex: 2,
    explanation: 'Iron loss is essentially constant — depends on flux density (set by V), not load current. Still 800 W at any load level.',
  },
  {
    id: 'l3-m3-4-4-eta',
    question: 'A 50 kVA transformer at 75 % load with pf 0.9: P_out = 33.75 kW. Iron loss 0.4 kW; copper loss at full load 0.8 kW. Efficiency at 75 % load:',
    options: ['85 %', '92 %', '97 %', '99 %'],
    correctIndex: 2,
    explanation: 'Cu loss at 75 % = 0.8 × 0.75² = 0.45 kW. Total loss = 0.4 + 0.45 = 0.85 kW. P_in = 33.75 + 0.85 = 34.6 kW. η = 33.75 / 34.6 × 100 = 97.5 %.',
  },
];

const quizQuestions = [
  { id: 1, question: 'Iron (core) losses include:', options: ['I²R only', 'Hysteresis + eddy currents', 'Skin effect', 'Friction'], correctAnswer: 1, explanation: 'Iron losses = hysteresis (re-orienting domains) + eddy currents (induced circulating in laminations). Both depend on flux density and frequency, not on load.' },
  { id: 2, question: 'Copper losses depend on:', options: ['Flux density', 'I² × R of windings', 'Voltage', 'Frequency'], correctAnswer: 1, explanation: 'P_cu = I² × R for each winding. Quadratic with current — half load = quarter loss.' },
  { id: 3, question: 'Maximum efficiency occurs when:', options: ['Iron loss = 2 × copper loss', 'Iron loss = copper loss', 'Iron loss = ½ copper loss', 'Always at full load'], correctAnswer: 1, explanation: 'Maximum efficiency when variable loss (Cu) equals constant loss (Fe). Often around 60-80 % load for distribution transformers.' },
  { id: 4, question: 'A 50 kVA transformer with iron loss 500 W and full-load copper loss 800 W reaches max efficiency at approximately what fraction of full load?', options: ['√(500/800) = 0.79', '500/800 = 0.625', '0.5', '1.0'], correctAnswer: 0, explanation: 'Set P_cu(x) = P_fe: 800 × x² = 500 → x = √(500/800) = 0.79. Max efficiency at 79 % of full load.' },
  { id: 5, question: 'Efficiency formula:', options: ['η = P_in / P_out', 'η = P_out / P_in × 100 %', 'η = P_loss / P_in', 'η = P_out / P_loss'], correctAnswer: 1, explanation: 'η = useful output / total input × 100. P_in = P_out + P_loss.' },
  { id: 6, question: 'A no-load test on a transformer measures primarily:', options: ['Copper loss', 'Iron loss + magnetising VA', 'Insulation resistance', 'Turns ratio'], correctAnswer: 1, explanation: 'No load = no current in secondary = no copper loss. The wattmeter reads iron losses.' },
  { id: 7, question: 'Stray losses in a transformer are caused by:', options: ['Loose windings', 'Magnetic flux leakage and eddy currents in tank/core clamps', 'Damaged insulation', 'Excess voltage'], correctAnswer: 1, explanation: 'Leakage flux induces eddies in steel tanks, end-windings and clamping plates. Small but counted in load loss measurements.' },
  { id: 8, question: 'Which loss is dominant at no-load?', options: ['Copper', 'Iron', 'Both equal', 'Stray'], correctAnswer: 1, explanation: 'No load = no significant current = negligible copper loss. Iron loss dominates.' },
];

const faqs = [
  { question: 'Why does my transformer get warm even with no load?', answer: 'Iron losses (hysteresis + eddy) happen any time the core is energised, regardless of load. A 1 % no-load loss on a 1 MVA transformer is 10 kW continuously dissipated as heat — enough to warm a small room.' },
  { question: 'What is the "all-day efficiency" of a transformer?', answer: 'A weighted average accounting for the fact that distribution transformers spend most of the day at low load. Iron losses are constant; copper losses dominate only at peak. For a typical distribution transformer at 25 % average load, all-day efficiency might be 95-97 % even though full-load efficiency is 98+ %.' },
  { question: 'Can I oversize a transformer to save energy?', answer: 'Only up to a point. Oversized transformer = lower copper loss at the actual load (because it runs at lower fraction of rated). But iron loss stays the same regardless of size. Sweet spot is usually 70-90 % of rated capacity for the typical operating load.' },
  { question: 'What\'s an "amorphous" transformer?', answer: 'Uses an amorphous metal alloy core instead of silicon steel. ~70 % lower iron loss, but slightly higher cost and slightly larger size. Pays back over the 30-year life of a continuously energised distribution transformer through lower no-load loss.' },
  { question: 'How are losses measured at the factory?', answer: 'No-load test (rated voltage, secondary open) gives iron loss. Short-circuit test (rated current, secondary shorted, primary at reduced voltage) gives full-load copper loss. Both must be on the test certificate per BS EN 60076.' },
  { question: 'Is "no-load loss" the same as "magnetising current loss"?', answer: 'Roughly yes. The magnetising current is mostly reactive (wattless), but it has a real component that goes into iron loss. The no-load wattmeter reads only the real (loss) component.' },
];

export default function Sub4() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 4"
            title="Transformer losses — copper and iron"
            description="Iron (constant) + copper (∝ I²). Maximum efficiency where they're equal. The maths behind every datasheet efficiency curve."
            tone="yellow"
          />

          <TLDR
            points={[
              'Iron loss (P_fe): constant, depends on flux density and frequency. Hysteresis + eddy.',
              'Copper loss (P_cu): variable, ∝ I². Half load = quarter loss.',
              'Maximum efficiency: P_cu = P_fe. Often around 60-80 % of full load.',
              'Efficiency at any load x: η = (x × S × pf) / (x × S × pf + P_fe + x² × P_cu_FL).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish iron losses (hysteresis + eddy) from copper losses (I²R).',
              'Calculate efficiency at any load fraction given full-load Cu loss and Fe loss.',
              'Identify the load fraction giving maximum efficiency.',
              'Read no-load and short-circuit test results from a factory certificate.',
            ]}
            initialVisibleCount={3}
          />

          <TransformerSchematic />

          <ContentEyebrow>The two loss families</ContentEyebrow>

          <ConceptBlock title="Iron loss is constant; copper loss scales with load²" plainEnglish="Iron loss depends on the magnetic flux in the core — which is set by the supply voltage. Once energised, it's constant. Copper loss is I²R in the windings — varies with the square of load current.">
            <p><strong>P_total = P_fe + P_cu(x) = P_fe + x² × P_cu_FL</strong></p>
            <p>Where x = load fraction (0 to 1) of full load.</p>
            <p>Worked example: 200 kVA transformer with P_fe = 0.5 kW, P_cu (FL) = 2.5 kW. At full load total loss = 3 kW. At 50 % load = 0.5 + 0.25 × 2.5 = 1.125 kW. At no-load = 0.5 kW.</p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Maximum efficiency</ContentEyebrow>

          <ConceptBlock title="Find the load where Cu loss = Fe loss" plainEnglish="Below this load, iron loss dominates (small load not justifying the constant overhead). Above it, copper loss dominates (big I means big I²R). Right at the crossover, total loss is minimum relative to output, so efficiency peaks.">
            <p>Set P_cu(x) = P_fe: x² × P_cu_FL = P_fe → <strong>x_max_eff = √(P_fe / P_cu_FL)</strong></p>
            <p>For the 200 kVA above: x = √(0.5/2.5) = √0.2 = 0.447 = 44.7 %. Maximum efficiency at ~45 % of full load.</p>
            <p>Most distribution transformers are designed for max efficiency at 50-75 % load, matching typical daily demand profile.</p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Calculating efficiency</ContentEyebrow>

          <ConceptBlock title="η = P_out / (P_out + P_loss)" plainEnglish="Output power = load × kVA × pf. Total loss = constant Fe loss + variable Cu loss at that load.">
            <p>For a 100 kVA transformer at 80 % load, pf 0.85: P_out = 0.8 × 100 × 0.85 = 68 kW.</p>
            <p>P_fe = 0.4 kW (from no-load test). P_cu (full load) = 1.2 kW. P_cu (80 %) = 1.2 × 0.64 = 0.77 kW.</p>
            <p>P_loss = 0.4 + 0.77 = 1.17 kW. P_in = 68 + 1.17 = 69.17 kW.</p>
            <p>η = 68 / 69.17 × 100 = 98.3 %.</p>
          </ConceptBlock>

          <VideoCard
            url={videos.transformers.url}
            title={videos.transformers.title}
            channel={videos.transformers.channel}
            duration={videos.transformers.duration}
            topic={videos.transformers.topic}
          />

          <RegsCallout
            source="Ecodesign Regulation 548/2014 (UK retained law) — Tier 2 efficiency for power transformers"
            clause="From 1 July 2021, all new medium and large power transformers placed on the UK or EU market must meet Tier 2 minimum efficiency at peak load and Tier 2 maximum no-load loss values per kVA rating, depending on type (oil or dry) and voltage class."
            meaning={
              <>Tier 2 cuts allowable iron and copper losses by ~10-30 % from earlier baseline. Drives use of higher-grade silicon steel, amorphous cores and improved copper geometry. Typical 100 kVA distribution transformer: P_fe ≤ 130 W, P_cu ≤ 1100 W under Tier 2.</>
            }
            cite="Source: Ecodesign for Energy-Related Products Regulations 2010 (as amended)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.11 (Protection against fire)"
            clause="Persons, livestock and property shall be protected against harmful effects of heat or fire which may be generated or propagated in electrical installations. Manufacturers' instructions shall be taken into account in addition to the requirements of BS 7671."
            meaning={<>Iron loss is constant whenever the transformer is energised, so it heats the core 24/7 even at zero load. The thermal envelope (winding class F/H, ambient, ventilation) sized for full-load steady-state is what Reg 421.11 binds you to. Under-ventilated transformer rooms breach 421.11 long before any electrical fault.</>}
            cite="Source: BS 7671:2018+A4:2026, Regulation 421.11."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.15.201 (Means of cutting off voltage)"
            clause="Effective means, suitably placed for ready operation, shall be provided so that all voltage may be cut off from every installation, from every circuit thereof and from all equipment, as may be necessary to prevent or remove danger."
            meaning={<>Iron loss only stops when the transformer is fully isolated from supply. Reg 132.15.201 demands a readily accessible isolator that breaks ALL voltage to the unit — for fire risk reduction (a smouldering core needs to be de-energised in seconds), for maintenance, and for after-hours energy savings. On low-load installs, automatic load-off isolation can cut iron-loss energy bills by 80 % overnight.</>}
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.15.201."
          />

          <SectionRule />

          <CommonMistake
            title="Quoting full-load efficiency for a transformer that runs at 25 % load"
            whatHappens={<>Customer told "this transformer is 98.5 % efficient". They run it at 25 % average load. Real efficiency at that point is only 96 % because copper loss is small but iron loss is unchanged — and as a fraction of the small output it is a bigger drag.</>}
            doInstead={<>Quote "all-day efficiency" or efficiency at typical operating load (often 25-50 %), not nameplate full-load. Pick a transformer sized for typical load, not for theoretical peak.</>}
          />

          <Scenario
            title="Sizing a transformer for an EV charger array"
            situation={<>Customer wants 8 × 22 kW AC chargers. Average duty cycle 30 % (typical for workplace charging). What kVA transformer, and what real efficiency to quote in the energy report?</>}
            whatToDo={<>Total connected = 8 × 22 = 176 kW. Diversity 0.6 (not all charge at peak): 176 × 0.6 = 106 kW. Plus pf ~0.97 → kVA = 109. Pick 125 kVA (next standard).<br/>Average load = 0.3 × 109 = 33 kVA = 26 % of rated.<br/>Per Tier 2 efficiency: 125 kVA P_fe ≈ 150 W, P_cu (FL) ≈ 1300 W. Cu at 26 % = 1300 × 0.067 = 87 W. Total loss at average = 237 W. Output = 33000 × 0.95 = 31350 W. η = 31350 / 31587 = 99.25 %. But all-day quote should be 99 % rounded.</>}
            whyItMatters={<>The customer energy report needs realistic numbers for kWh through the year. The maths in this Sub gives them — vs the marketing figure on the front of the data sheet.</>}
          />

          <SectionRule />

          <ContentEyebrow>Apprentice depth — losses on real installs</ContentEyebrow>

          <ConceptBlock title="Why a transformer humming hot at no-load is a red flag" plainEnglish="A transformer with no load connected should run cool — only iron loss is heating it (typically 0.1-0.5 % of rated kVA). If a 100 kVA transformer is running hot at no load, P_fe is way above the design value — usually due to overvoltage on the primary, wrong tap setting, or core damage." onSite="Standard L3 inspection: thermal imaging at no-load. A healthy 200 kVA distribution transformer might show 35 °C surface temperature with 20 °C ambient — i.e. ~15 K rise from iron losses. Same unit at 60 °C is suspect; at 80 °C is failing. Always check tap position and primary voltage before condemning the transformer.">
            <p>Iron loss approximations on common kVA ratings (Tier 2 limits, illustrative):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>50 kVA: P_fe ≤ 90 W, P_cu (FL) ≤ 750 W.</li>
              <li>100 kVA: P_fe ≤ 130 W, P_cu (FL) ≤ 1100 W.</li>
              <li>200 kVA: P_fe ≤ 200 W, P_cu (FL) ≤ 1900 W.</li>
              <li>500 kVA: P_fe ≤ 360 W, P_cu (FL) ≤ 3850 W.</li>
              <li>1000 kVA: P_fe ≤ 600 W, P_cu (FL) ≤ 6000 W.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Cooling classes — ONAN, ONAF, OFAF and what they mean" plainEnglish="Transformer cooling code is two letters then two letters: oil/air, natural/forced. ONAN = Oil Natural, Air Natural — basic radiator cooling. ONAF adds forced air (fans) for ~30 % more capacity. OFAF adds forced oil pumps for another ~50 %. Same transformer can be rated at different kVA depending on which cooling stage is active." onSite="On a 1000 kVA ONAN/ONAF distribution transformer, the nameplate may read '1000/1300 kVA'. ONAN gives 1000 kVA continuous; ONAF (with fans running) gives 1300 kVA peak. Know which you are operating at — if the fans fail and the customer keeps drawing 1300 kVA, the transformer overheats and trips on Buchholz protection.">
            <p>Cooling class capacity multipliers (typical):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ONAN</strong> — base rating, no fans/pumps.</li>
              <li><strong>ONAF</strong> — fans on radiators: × 1.30 to × 1.50 capacity.</li>
              <li><strong>OFAF</strong> — fans + pumps: × 1.50 to × 1.67 capacity.</li>
              <li><strong>ODAF</strong> — directed oil flow: × 1.67 to × 2.00 capacity.</li>
              <li><strong>Dry-type AN/AF</strong> — air-natural or air-forced (no oil); for indoor/data-centre use.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Buchholz, oil temperature and winding temperature protection" plainEnglish="Oil-filled distribution transformers carry three or four protective devices monitoring different fault types. The Buchholz relay (between tank and conservator) detects gas evolution from internal arcing or insulation breakdown. Oil temperature gauge trips on bulk oil overheating. Winding temperature simulator estimates hottest spot using a CT-driven heater + thermistor." onSite="Standard transformer inspection routine: 1) Check Buchholz oil level window — should be full. 2) Check oil temp gauge reading vs ambient (10-30 K rise typical at part load). 3) Check winding temp simulator — should track oil temp +5 to +20 K depending on load. 4) If any device shows warning, log readings and report. NEVER reset Buchholz alarm without investigation — it is gas-tight and fires only on real internal events.">
            <p>Trip and alarm levels on a typical UK distribution transformer:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Buchholz alarm (gas accumulation): typically 200 ml gas → maintenance call.</li>
              <li>Buchholz trip (oil surge): rapid oil flow → immediate trip of HV breaker.</li>
              <li>Oil temp alarm: 75 °C bulk.</li>
              <li>Oil temp trip: 90 °C bulk.</li>
              <li>Winding temp alarm: 105 °C hottest spot.</li>
              <li>Winding temp trip: 115 °C hottest spot.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Loss reduction strategies for the customer" plainEnglish="Customer with an old underloaded transformer asks how to cut energy bills. Three options: (1) Replace with smaller, modern Tier 2 unit if load permanently dropped. (2) Install LED + PFC + harmonic mitigation on the load side. (3) Swap to amorphous-core transformer for ~70 % iron loss reduction. Each has different payback economics." onSite="Worked customer scenario: 1980s-vintage 1000 kVA transformer, P_fe = 2.5 kW (way above modern Tier 2 limit of 600 W), running at 30 % average load. Annual no-load energy cost = 2500 W × 8760 h × £0.20/kWh = £4380. Modern 600 kVA Tier 2 amorphous unit P_fe ≈ 200 W. New annual cost = £350. Saving £4030/year. Replacement cost ~£15-20k installed. Payback ~4 years. After that pure savings for next 25+ years.">
            <p>Decision matrix for old transformer replacement:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>P_fe &lt; Tier 2 limit, average load &gt; 50 %</strong> — keep transformer.</li>
              <li><strong>P_fe 1-2× Tier 2 limit, average load 30-50 %</strong> — consider replace, payback 5-10 yr.</li>
              <li><strong>P_fe &gt; 2× Tier 2 limit, any load</strong> — replace, payback &lt; 5 yr.</li>
              <li><strong>Average load &lt; 25 %</strong> — downsize one rating step AND replace; double saving.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Loss measurement on site without taking the transformer out of service" plainEnglish="You cannot do a factory-style no-load or short-circuit test on a live transformer. But you can ESTIMATE iron loss from the no-load magnetising current measured by a clamp meter on the primary, and copper loss from the actual load current and known winding resistance. Combine for total loss." onSite="Quick on-site loss estimate procedure: 1) Clamp primary line current at off-peak (3am, when load is lowest). Note magnetising VA. 2) Note primary voltage at the same time. 3) Iron loss ≈ V × I_no-load × cos(φ_no-load). The pf at no-load is typically 0.1-0.2 (mostly reactive). 4) Clamp at peak load. Copper loss ≈ I_FL² × R_winding (R from factory cert or measured cold).">
            <p>Worked: 200 kVA 11 kV/433 V distribution transformer.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Off-peak primary clamp: 0.4 A line at 11 000 V. No-load VA = √3 × 11000 × 0.4 = 7.6 kVA.</li>
              <li>No-load pf typical 0.15. P_fe = 7.6 × 0.15 = 1.14 kW (high — Tier 2 limit ~200 W).</li>
              <li>Peak primary clamp: 8 A line. Loading = 8/10.5 = 76 % of rated.</li>
              <li>P_cu (FL from cert) = 1.9 kW. P_cu at 76 % = 1.9 × 0.76² = 1.10 kW.</li>
              <li>Total loss at peak = 1.14 + 1.10 = 2.24 kW. Annual loss = ~12 000 kWh = £2400/year.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Iron loss = constant (hysteresis + eddy); copper loss = variable (I²R, scales as x²).',
              'Maximum efficiency where Cu loss = Fe loss: x_max = √(P_fe / P_cu_FL).',
              'Efficiency η = P_out / (P_out + P_fe + x² × P_cu_FL).',
              'No-load test → iron loss; short-circuit test → full-load copper loss.',
              'Ecodesign Tier 2 mandatory in UK from July 2021 — limits both Fe and Cu loss.',
              'Quote all-day or typical-load efficiency, not nameplate, for energy reports.',
            ]}
          />

          <Quiz title="Transformer losses knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section4-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.3 Transformer ratios</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section4-5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.5 Efficiency calculations</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
