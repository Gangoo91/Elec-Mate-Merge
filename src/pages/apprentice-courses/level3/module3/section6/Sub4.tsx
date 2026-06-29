/**
 * Module 3 · Section 6 · Subsection 4 — Lighting principles: lumens, lux, inverse square, cosine, lumen method (AC 5.1, 5.2)
 * Maps to C&G 2365-03 / Unit 302 / LO5 / AC 5.1, 5.2
 *   Layered depth: 2357 Unit 609 ELTK08 / AC 10.1, 10.2
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Lighting principles — lumens, lux, design | Level 3 Module 3.6.4 | Elec-Mate';
const DESCRIPTION = 'Inverse-square law, Lambert\'s cosine law, the lumen method. Calculating illuminance for a room and meeting CIBSE / BS EN 12464 task levels.';

const checks = [
  { id: 'l3-m3-6-4-isq', question: 'A point light source 3000 cd produces what illuminance directly under it at 3 m height?', options: [
    '9000 lx',
    '111 lx',
    '1000 lx',
    '333 lx',
  ], correctIndex: 3, explanation: 'Inverse square: E = I / d² = 3000 / 9 = 333 lx (point directly below).' },
  { id: 'l3-m3-6-4-cos', question: 'Same lamp, illuminance on a desk 2 m to the side at 3 m vertical (so 3.6 m to point, 33.7° from vertical):', options: [
    '333 lx',
    '50 lx',
    '100 lx',
    '193 lx',
  ], correctIndex: 3, explanation: 'Distance²= 9+4 = 13, so 333 × (9/13) = 230 lx if vertical, then × cos 33.7° = × 0.832 = 192 lx (cosine law for tilted surface). Approximate; exact answer depends on luminaire intensity distribution.' },
  { id: 'l3-m3-6-4-lumen', question: 'Lumen method: room L=10 m, W=6 m. Maintain 500 lx average. Total lumens needed (utilisation factor 0.6, maintenance factor 0.8):', options: [
    '125 000 lm',
    '62 500 lm',
    '30 000 lm',
    '60 000 lm',
  ], correctIndex: 1, explanation: 'F_total = (E × A) / (UF × MF) = (500 × 60) / (0.6 × 0.8) = 30 000 / 0.48 = 62 500 lm.' },
];

const quizQuestions = [
  { id: 1, question: 'Luminous intensity unit:', options: [
    'lumen',
    'candela',
    'lux',
    'watt',
  ], correctAnswer: 1, explanation: 'Candela (cd) is the SI base unit for luminous intensity (light emitted per solid angle in a particular direction).' },
  { id: 2, question: 'Luminous flux unit:', options: [
    'candela',
    'kelvin',
    'lumen',
    'lux',
  ], correctAnswer: 2, explanation: 'Lumen (lm) = total visible light output. Lamp data sheets quote lumens.' },
  { id: 3, question: 'Illuminance unit:', options: [
    'candela',
    'lumen',
    'watt/m²',
    'lux (lm/m²)',
  ], correctAnswer: 3, explanation: 'Lux (lx) = lumens per square metre. The amount of light landing on a surface.' },
  { id: 4, question: 'Inverse square law: doubling distance reduces illuminance by:', options: [
    'Quarter (1/2² = 1/4)',
    'Half',
    'Eighth',
    'No change',
  ], correctAnswer: 0, explanation: 'E ∝ 1/d². Twice the distance → quarter the illuminance from a point source.' },
  { id: 5, question: 'BS EN 12464-1 office task illuminance:', options: [
    '300 lx',
    '500 lx',
    '1000 lx',
    '100 lx',
  ], correctAnswer: 1, explanation: 'BS EN 12464-1 Table 5: general office work 500 lx maintained on the task. Higher for fine drawing (1000), lower for circulation (100-200).' },
  { id: 6, question: 'A 100 W LED panel has efficacy 130 lm/W. Lumens output:', options: [
    '1300 lm',
    '130 lm',
    '13 000 lm',
    '100 lm',
  ], correctAnswer: 2, explanation: 'Lumens = watts × efficacy = 100 × 130 = 13 000 lm. (Or efficacy can be checked: 13000/100 = 130 lm/W.)' },
  { id: 7, question: 'Utilisation factor accounts for:', options: [
    'The drop in lamp output as the lamp ages over its life',
    'The colour temperature of the light source in kelvin',
    'The glare experienced by occupants at a given viewing angle',
    'Fraction of lumens that reach the task surface vs lost to walls/ceiling',
  ], correctAnswer: 3, explanation: 'UF = lumens onto task / total lumens emitted. Depends on room dimensions, reflectance and luminaire distribution. Higher rooms = lower UF.' },
  { id: 8, question: 'Maintenance factor (MF) covers:', options: [
    'Light output reduction over time due to dirt, lamp ageing, room dirt',
    'The fraction of emitted lumens that reach the working plane',
    'The extra lumens a dimmable luminaire can deliver at full output',
    'The reflectance of the walls, ceiling and floor surfaces',
  ], correctAnswer: 0, explanation: 'MF (typically 0.7-0.85) is design margin: actual install will deliver less light over years due to lamp lumen depreciation, luminaire dirt, room dirt. Specify lamps with extra margin.' },
];

const faqs = [
  { question: 'Why are LED lamps replacing fluorescent in commercial fit-outs?', answer: 'LED efficacy now &gt; 150 lm/W; T5 fluorescent ~85 lm/W. Plus instant on, dimmable, no flicker, longer life, no mercury. Commercial cost-of-ownership over 10 years is 50-70% lower with LED. Almost no new fluorescent installs in 2026.' },
  { question: 'What is "circadian-friendly" lighting?', answer: 'Lighting that varies colour temperature through the day — cool/blueish (5000-6500 K) at midday, warm (2700-3000 K) in evening. Mimics natural daylight cycle, supports human circadian rhythm. Increasingly specified for offices, schools, healthcare.' },
  { question: 'How is glare measured in lighting design?', answer: 'UGR (Unified Glare Rating). BS EN 12464-1 sets max UGR per task: offices ≤19, classrooms ≤19, fine work ≤16. Calculated from luminaire luminance vs background and viewing angle.' },
  { question: 'Why does emergency lighting have to be from a separate source?', answer: 'BS 5266-1: must operate within 5 seconds of mains failure for at least 1 hour (escape routes) or 3 hours (open areas). Either central battery or self-contained luminaires with sealed batteries. Tested monthly per BS 5266-8.' },
  { question: 'How do lighting controls save energy?', answer: 'Daylight harvesting (dim when daylight is sufficient), occupancy sensing (off when room empty), time control. CIBSE LG7 recommends 30-50% energy savings vs no controls. Often required by Building Regs Part L for new commercial fit-outs.' },
  { question: 'What\'s a "Type B" lamp efficacy?', answer: 'Confusing — commercial language varies. Always check the actual lm/W and quoted lumens on the spec sheet. Marketing labels (A++, B, etc.) are SAVE-Energy classifications and don\'t directly tell you the lighting design figures.' },
];

export default function Sub4() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section6')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>
          <PageHero eyebrow="Module 3 · Section 6 · Subsection 4" title="Lighting principles — lumens, lux, design"
            description="Candela, lumen, lux. Inverse-square and cosine laws. The lumen method that designs every commercial lighting layout." tone="yellow" />
          <TLDR points={[
            'Luminous intensity (cd) — light per solid angle from the source.',
            'Luminous flux (lm) — total visible light. Lux (lm/m²) — landing on the surface.',
            'Inverse square: E = I / d². Doubling distance quarters illuminance.',
            'Cosine law: tilted surface receives I × cos θ.',
            'Lumen method: F_total = (E × A) / (UF × MF). Drives every commercial design.',
          ]} />
          <LearningOutcomes outcomes={[
            'Distinguish luminous intensity (cd), flux (lm), illuminance (lux).',
            'Apply the inverse square law for point sources.',
            "Apply Lambert's cosine law for tilted surfaces.",
            'Use the lumen method to size lighting for a room to a target lux.',
            'Identify BS EN 12464-1 task illuminance levels for common spaces.',
          ]} initialVisibleCount={3} />
          <ContentEyebrow>The three quantities</ContentEyebrow>
          <ConceptBlock title="cd, lm, lx — three different things" plainEnglish="Candela = how bright the lamp is in a particular direction. Lumen = how much total light it gives off. Lux = how much light lands on a surface.">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Candela (cd)</strong> — luminous intensity in one direction. SI base unit.</li>
              <li><strong>Lumen (lm)</strong> — total light flux from the source.</li>
              <li><strong>Lux (lx) = lm/m²</strong> — illuminance on a surface. What we design for.</li>
            </ul>
          </ConceptBlock>
          <ConceptBlock title="Luminance, reflectance and why a 'bright' surface isn't the same as a 'well-lit' one" plainEnglish="Illuminance (lux) tells you how much light is landing on a surface. Luminance (cd/m²) tells you how much light is leaving it toward your eye. The relationship between them is the surface's reflectance: a black desk under 500 lx may reflect only 30 cd/m² to the viewer; a white wall under the same illuminance may reflect 150 cd/m². The eye perceives luminance, not illuminance — but lighting designers calculate illuminance because it's directly controllable.">
            <p><strong>Reflectance values</strong> matter for the lumen method utilisation factor and for visual comfort. BS EN 12464-1 recommended reflectances: ceiling 0.7–0.9, walls 0.5–0.8, floor 0.2–0.4, work surface 0.2–0.6. White walls and ceilings recycle light around the room and improve UF; dark walls absorb it and force you to fit more luminaires for the same task lux.</p>
            <p><strong>Glare</strong> is when a luminance in your field of view is too bright relative to the background. Direct glare from a bare LED chip is uncomfortable even if the room is otherwise correctly lit. The Unified Glare Rating (UGR) framework in BS EN 12464-1 quantifies this from luminaire luminance distribution and viewing geometry — typical limits 19 for office/classroom, 16 for fine drawing, 22 for circulation.</p>
            <p><strong>Colour rendering index (CRI, R_a)</strong> measures how accurately a light source reveals colours. Sunlight = 100. Cheap LED = 70–80. Premium LED = 90+. Good fluorescent = 80–90. Below 80 is unacceptable for retail, art galleries, dental surgeries, food preparation. Spec lamp CRI explicitly on any commercial fit-out.</p>
          </ConceptBlock>
          <SectionRule />
          <ContentEyebrow>The two laws</ContentEyebrow>
          <ConceptBlock title="Inverse square + cosine" plainEnglish="Inverse square: a point source spreads its light over a bigger area as you move away. Cosine: a tilted surface catches less light than a perpendicular one.">
            <p><strong>E = (I × cos θ) / d²</strong></p>
            <p>Where E = illuminance (lx), I = intensity (cd), d = distance (m), θ = angle from perpendicular.</p>
            <p>Worked example: 1500 cd lamp 4 m above a desk. Directly below: E = 1500 / 16 = 93.75 lx. 2 m to the side (d = √(16+4) = 4.47 m, θ = arctan(2/4) = 26.6°): E = 1500 × cos 26.6° / 20 = 1500 × 0.894 / 20 = 67.1 lx.</p>
          </ConceptBlock>
          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <ConceptBlock title="Polar curves and luminaire intensity distribution — why two 'identical' lamps aren't" plainEnglish="A lamp's data sheet quotes a lumen output (e.g. 4000 lm). That tells you the total light produced. But two 4000 lm lamps with different reflector/diffuser designs distribute that light very differently. Manufacturers publish polar intensity diagrams (cd vs angle) showing exactly where the light goes — narrow downlighter, wide flood, batwing for office task lighting, asymmetric for wall washing.">
            <p><strong>Polar plot reading.</strong> Imagine standing under the luminaire and rotating around it. The polar diagram plots intensity (cd) on the radial axis vs angle from vertical (0° = straight down, 90° = horizontal). A narrow downlighter has a high candela value at 0° and drops to nearly zero by 30°. A 'cosine' diffuse luminaire's polar plot is a circle (intensity varies as cos θ — Lambertian distribution).</p>
            <p><strong>Why this matters for lumen method.</strong> The utilisation factor is calculated from the luminaire's intensity distribution and the room geometry. A narrow-beam downlighter in a high-ceiling room delivers most of its light to the floor (high UF for task plane); a wide diffuser in the same room loses much of its light to walls and ceiling (low UF). Manufacturers publish UF tables for each luminaire indexed against room index (RI) — a single number combining room L, W, H and reflectances.</p>
            <p><strong>Spacing-to-height ratio (SHR)</strong> is the rule-of-thumb derived from the polar plot for grid layouts. Narrow-beam = lower SHR (e.g. 0.5 — luminaires close together to avoid dark spots between them). Wide-beam = higher SHR (e.g. 1.5 — same uniformity at fewer fittings). Manufacturers publish SHR for every product. Exceed it and you get visible dark patches between luminaires; well under it and you've over-spec'd.</p>
          </ConceptBlock>
          <SectionRule />
          <ContentEyebrow>The lumen method</ContentEyebrow>
          <ConceptBlock title="Sizing a lighting installation" plainEnglish="For a uniformly lit room, calculate total lumens needed by dividing target illuminance × floor area, then dividing by utilisation factor and maintenance factor. Pick lamps to match.">
            <p><strong>F_total = (E × A) / (UF × MF)</strong></p>
            <p>Where E = target lux; A = floor area (m²); UF = utilisation factor (0.4-0.7 typical); MF = maintenance factor (0.7-0.85).</p>
            <p>Worked example: 12 m × 8 m office (96 m²). Target 500 lx. UF = 0.65, MF = 0.8.</p>
            <p>F_total = (500 × 96) / (0.65 × 0.8) = 48 000 / 0.52 = 92 308 lm.</p>
            <p>Pick 4000 lm panels: need 92 308 / 4000 = 23 panels (round to 24 for grid layout 4×6).</p>
            <p>Power: 24 × 30 W = 720 W total. Lighting power density = 720 / 96 = 7.5 W/m² — well within Building Regs Part L limit of 8 W/m² for offices.</p>
          </ConceptBlock>
          <ConceptBlock title="Maintenance factor in detail — lamp lumen depreciation, dirt and survival" plainEnglish="A new luminaire delivers more light than the same fitting after five years of use. The lamp output drops as it ages (Lamp Lumen Maintenance Factor, LLMF), the luminaire body and reflectors get dirty (Luminaire Maintenance Factor, LMF), the room surfaces get dirty (Room Surface Maintenance Factor, RSMF), and a few of the lamps will have failed (Lamp Survival Factor, LSF). Multiply all four together and you get the overall Maintenance Factor (MF) you plug into the lumen method.">
            <p><strong>MF = LLMF × LSF × LMF × RSMF.</strong> For LED in a clean office on a 3-year cleaning cycle: LLMF 0.85 (LED at 50 000 hours = 85% of new), LSF 0.95 (5% module failures), LMF 0.92 (clean office), RSMF 0.95 → MF ≈ 0.71. Designer typically rounds to 0.7–0.8.</p>
            <p>Why this matters: if you design for exactly 500 lx with MF = 1.0 (i.e. brand new, clean), the install might deliver 500 lx on day one but drift down to 350 lx within five years. By that point the user is complaining about a 'dim' room and you're back doing remedial work. By specifying MF = 0.7 in the calc, you fit a system that gives ~700 lx on day one, drifting down to the design 500 lx by end of maintenance cycle. The user never notices a problem.</p>
            <p>Industrial environments need more aggressive MF — dust, oil mist and humidity can drop LMF to 0.6 or worse. Outdoor luminaires in coastal sites can drop to MF 0.5 over five years. Always check the application before borrowing the office MF of 0.8.</p>
          </ConceptBlock>
          <ConceptBlock title="Emergency lighting — BS 5266, escape route lux and the central battery question" plainEnglish="Every commercial premises must have emergency lighting that comes on within 5 seconds of mains failure and runs for at least 1 hour (escape routes) or 3 hours (open areas, high-risk task areas). It exists so people can find their way out in the dark — and so emergency services can find people who didn't make it out.">
            <p><strong>Illuminance levels (BS 5266-1):</strong> escape route 1 lux minimum at floor along the centreline; open areas (anti-panic) 0.5 lux minimum across the floor; high-risk task areas (where stopping a process safely is needed) 10% of normal task illuminance or 15 lux, whichever is greater. Uniformity ratio max:min ≤ 40:1.</p>
            <p><strong>Two architectures:</strong> (1) <em>self-contained</em> — each emergency luminaire has its own sealed nickel-metal-hydride battery, charger and inverter built in. Maintained or non-maintained operation. Easy to retrofit, low capital cost, distributed failure mode. Standard for most UK installs. (2) <em>central battery</em> — one large VRLA battery bank in a plant room feeds 24/110/230 V DC to all emergency luminaires via dedicated wiring. Higher capital cost but simpler maintenance, longer life, suitable for large complex sites.</p>
            <p><strong>Testing (BS 5266-8):</strong> short functional test monthly (operate the test switch, check all luminaires light up); annual full-duration discharge (3-hour run from battery, verify each luminaire still meets minimum lux at end of test). Records must be kept in the building log book. Test failures = remedial action immediately. The Regulatory Reform (Fire Safety) Order 2005 makes the responsible person personally liable.</p>
          </ConceptBlock>
          <InlineCheck {...checks[2]} />
          <RegsCallout
            source="BS EN 12464-1:2021 — Light and lighting — Lighting of work places"
            clause="Maintained illuminance at the task area shall not be less than the values given in Table 5 for the relevant indoor work activity. Examples: general office work 500 lx; technical drawing 750 lx; classroom 300 lx; corridor/circulation 100 lx; supermarket 500 lx."
            meaning={<>Designers MUST hit the BS EN 12464-1 task illuminance for the space. Below = bad lighting, possibly Health & Safety issue. Above = waste of energy and possibly glare. Use the lumen method to size correctly.</>}
            cite="Source: BS EN 12464-1:2021 Table 5."
          />
          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.1 (Voltage at terminals)"
            clause="In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment."
            meaning={<>An LED driver's output regulation depends on its input mains voltage staying within product-standard tolerance. Sustained low voltage at a luminaire row farthest from the DB makes the driver run harder, generates more heat, and shortens life — even if the lumen-method calc still hits 500 lx. Reg 525.1 ties the lighting design back to cable sizing for V<sub>drop</sub>.</>}
            cite="Source: BS 7671:2018+A4:2026, Regulation 525.1."
          />
          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connections)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
            meaning={<>Lighting circuits live with frequent switching, thermal cycling and (in DALI installs) constant low-current bus traffic. Reg 526.1 demands that every luminaire termination is durable in service — accounting for conductor class, mechanical stress, and terminal temperature. A loose loop-in terminal at a ceiling rose is the classic source of fire-risk arcing on a long-running lighting circuit.</>}
            cite="Source: BS 7671:2018+A4:2026, Regulation 526.1."
          />
          <SectionRule />
          <CommonMistake title="Confusing lumens with lux" whatHappens={<>Customer asks for "500 lux LED panels". Apprentice spec's panels at 500 lumens each — which would give about 25 lx in a small office, not 500. Massive under-illumination.</>}
            doInstead={<>Lumens ≠ lux. Lumens are total light emitted; lux is light per unit area. Always do the lumen-method calc to convert from a target lux to the total lumens (and panel count) needed.</>} />
          <ConceptBlock title="Lighting controls — daylight harvesting, occupancy sensing and the Part L energy budget" plainEnglish="A modern commercial install spends as much engineering on switching the lights OFF as on switching them on. Building Regs Part L 2026 sets lighting power density limits (W/m²), but it also rewards installations with automatic controls that reduce actual energy use below the connected load. CIBSE LG7 quantifies typical savings: 20–40% from occupancy sensing alone, 30–50% from combined occupancy plus daylight harvesting.">
            <p><strong>Occupancy sensing</strong> uses passive infrared (PIR), microwave or ultrasonic detection to tell whether anyone is in the space. Two control modes: presence detection (lights ON automatically when someone enters, OFF after a programmed timeout) or absence detection (lights stay OFF until manually switched on, automatically OFF after timeout). Absence detection saves more energy in offices because people often forget to switch on if there's some daylight.</p>
            <p><strong>Daylight harvesting</strong> uses a ceiling-mounted lux sensor to measure ambient illuminance and dim the artificial lighting accordingly. On a sunny day, the row of luminaires nearest the window may dim to 20% while interior rows stay at 100%. Smooth fading (over 30+ seconds) is essential — abrupt changes are visually distracting. Requires DALI, 0–10 V or wireless dimming on every fitting.</p>
            <p><strong>DALI (Digital Addressable Lighting Interface, IEC 62386)</strong> is the dominant control bus protocol. Each luminaire has a unique address; the controller can send individual dimming commands and receive status feedback (lamp failure, run hours, energy consumption). Two unpolarised conductors carry power AND data. Add scene presets, timetabling, integration with occupancy sensors and daylight sensors. Premium offices, retail and hospitality use this exclusively. Replaced the old 0–10 V analogue standard for most applications.</p>
          </ConceptBlock>
          <Scenario title="Designing lighting for a 60 m² classroom" situation={<>Classroom 8 m × 7.5 m = 60 m². BS EN 12464-1 requires 300 lx at desk level. UF for a typical classroom with white ceilings/walls and recessed troffer panels = 0.7. MF for clean educational environment = 0.8.</>}
            whatToDo={<>F_total = (300 × 60) / (0.7 × 0.8) = 18 000 / 0.56 = 32 143 lm.<br/>Use 4000 lm troffers: 32143 / 4000 = 8.04 → fit 9 panels in a 3×3 grid.<br/>Power: 9 × 36 W = 324 W. LPD = 324 / 60 = 5.4 W/m² — well within Part L limit of 8 W/m² for classrooms.<br/>Add daylight harvesting (windows on one side) and occupancy sensing per LG7 recommendation.<br/>UGR check: 4000 lm troffers, well-diffused → typically UGR &lt; 19. Acceptable.</>}
            whyItMatters={<>The lumen method gives a defensible design that meets BS EN 12464-1 and Building Regs Part L. Without it, you\'re guessing — and customers complain about gloomy or glaring rooms.</>} />
          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            'Three quantities: candela (intensity), lumen (flux), lux (illuminance = lm/m²).',
            'Inverse square: E = I/d². Cosine law: × cos θ for tilted surface.',
            'Lumen method: F_total = E × A / (UF × MF).',
            'BS EN 12464-1: office 500 lx, classroom 300 lx, drawing 750 lx, circulation 100 lx.',
            'UF (0.4-0.7) accounts for room geometry; MF (0.7-0.85) for ageing and dirt.',
            'Building Regs Part L 2026 mandates lighting power density limits for new buildings.',
          ]} />
          <Quiz title="Lighting principles knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section6-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.3 Electronic components</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section6-5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">6.5 Electric heating</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
