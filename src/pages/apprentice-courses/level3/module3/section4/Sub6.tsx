/**
 * Module 3 · Section 4 · Subsection 6 — Transformer types, applications, generation & distribution (AC 1.2)
 * Maps to C&G 2365-03 / Unit 302 / LO1 / AC 1.2
 *   Layered depth: 2357 Unit 609 ELTK08 / AC 6.1, 6.2, 6.3, 6.6
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

const TITLE = 'Transformer types and the UK grid | Level 3 Module 3.4.6 | Elec-Mate';
const DESCRIPTION =
  'Generator step-up, grid, distribution, isolation, instrument, site, welding, EV, BESS and renewable export transformers — types, applications, vector groups, ventilation, oil bunding, and the regulatory anchors (Reg 132.1 design, BS 7671 §710 medical IT, ENA G98/G99 generation).';

const checks = [
  { id: 'l3-m3-4-6-grid', question: 'UK national grid transmission voltages include:', options: ['230 V only', '11 kV / 33 kV', '132 kV / 275 kV / 400 kV', '1 MV'], correctIndex: 2, explanation: 'UK transmission: 132 kV (older), 275 kV and 400 kV (super-grid). Distribution at 11 kV and 33 kV. Final step-down 11 kV → 400/230 V at the local substation.' },
  { id: 'l3-m3-4-6-step', question: 'A site transformer 230 V / 110 V centre-tapped is used because:', options: ['Looks better', 'Reduces shock-risk: any line-to-earth voltage is only 55 V', 'Lower cost', 'Required by EU rules'], correctIndex: 1, explanation: 'BS 4363 / HSE site transformer: 110 V centre-tapped with the centre earthed gives 55 V line-to-earth. Below the threshold for ventricular fibrillation under most conditions. Standard for hand tools on construction sites.' },
  { id: 'l3-m3-4-6-iso', question: 'A medical isolation transformer is required because:', options: ['Reduces voltage', 'Removes earth reference, so a single-fault doesn\'t create a shock hazard to a patient', 'Saves energy', 'Required for steel buildings'], correctIndex: 1, explanation: 'BS 7671 §710 medical IT systems: floating supply, no earth path. A single line-to-earth fault doesn\'t energise patient-touchable parts. Insulation monitoring trips on first fault.' },
  { id: 'l3-m3-4-6-ct', question: 'You need to remove a CT-fed energy meter for replacement. What\'s the first step?', options: ['Disconnect the CT secondary leads.', 'Short the CT secondary at the test block before disconnecting anything downstream — the CT must never be open-circuited while the primary is energised.', 'Open the primary breaker only.', 'Photograph the meter.'], correctIndex: 1, explanation: 'Open-circuit CT on energised primary = induced kV → destroyed CT and operative injury risk. Always short the secondary first via the test block.' },
];

const quizQuestions = [
  { id: 1, question: 'Power station alternator voltage is typically:', options: ['400 V', '11 kV', '132 kV', '400 kV'], correctAnswer: 1, explanation: 'Alternators output 11-25 kV. Step-up transformer raises to grid voltage (132/275/400 kV) for transmission.' },
  { id: 2, question: 'Why transmit at high voltage?', options: ['Looks impressive', 'Lower current for same power → smaller cables, less I²R loss', 'Higher voltage carries more energy', 'Cheaper transformers'], correctAnswer: 1, explanation: 'P = V × I × √3 × pf. Higher V means lower I for the same P, so cable losses (I²R) drop. 400 kV transmission has 1/35 the loss of 11 kV for the same power.' },
  { id: 3, question: 'A typical pole-mounted distribution transformer in rural UK is:', options: ['400 kVA, 11 kV / 400 V', '5-100 kVA, 11 kV / 400 V', '1 MVA, 33 kV / 11 kV', '100 kVA, 230 V / 110 V'], correctAnswer: 1, explanation: 'Small rural pole-mounted transformers 5-100 kVA serving a few houses. Larger are pad-mounted or in substations.' },
  { id: 4, question: 'Auto-transformers are common as:', options: ['Distribution units', 'Site transformers and motor starters (autostart)', 'Isolation transformers', 'Welding'], correctAnswer: 1, explanation: 'Single-tapped winding, lighter and cheaper for small ratios. Common as star-delta motor starters and 230/110 V site transformers (where isolation isn\'t needed).' },
  { id: 5, question: 'A welding transformer is unusual because:', options: ['Step-down ratio massive (230/30 V)', 'Heavy series leakage reactance to limit weld current', 'Always 3-phase', 'Has no core'], correctAnswer: 1, explanation: 'Welding transformer has deliberately high leakage reactance to limit short-circuit (welding-arc) current to a controlled value. Different design from regular transformers.' },
  { id: 6, question: 'Renewable generation feeds into the UK grid via:', options: ['Direct DC', 'Inverter + step-up transformer matched to grid voltage', 'Battery banks only', 'No transformer'], correctAnswer: 1, explanation: 'PV/wind/battery inverters synthesise 50 Hz AC, then step up via transformer to local distribution voltage. Grid-tie inverters must comply with G99 (medium PV) or G98 (small PV).' },
  { id: 7, question: 'CT secondaries should be left:', options: ['Open when not in use', 'Short-circuited via the test block when not connected to a relay/meter', 'Earthed', 'Disconnected'], correctAnswer: 1, explanation: 'Open secondary on energised CT = induced kV → destroyed CT. Short the secondary via the test block when removing meters or relays.' },
  { id: 8, question: 'Constant-current transformers are used for:', options: ['Fluorescent lighting', 'Series-connected airfield runway lighting', 'Domestic supply', 'Mobile phone chargers'], correctAnswer: 1, explanation: 'Old-style series-string runway lighting needs constant current regardless of load (lamps in series). Constant-current transformer (saturable) provides this.' },
  { id: 9, question: 'A 100 kVA oil-filled transformer with 250 litres of oil needs an oil bund of what minimum capacity?', options: ['100 litres', '250 litres', '275 litres', 'No bund needed'], correctAnswer: 2, explanation: 'Bund = 100 % of oil contents + 10 % allowance = 250 + 25 = 275 litres minimum. Required by Control of Pollution (Oil Storage) Regulations 2001.' },
  { id: 10, question: 'Which RCD type is required for a transformerless string PV inverter?', options: ['Type AC', 'Type A', 'Type B', 'No RCD'], correctAnswer: 2, explanation: 'Transformerless inverters can pass DC fault current. Type B RCD detects AC + smooth DC + pulsating DC fault current. Standard requirement for transformerless PV.' },
  { id: 11, question: 'An auto-transformer differs from an isolation transformer because:', options: ['Same thing.', 'Auto has a single tapped winding (input and output share copper, no isolation); isolation has two galvanically-separated windings (full isolation, four terminals).', 'Auto is bigger.', 'Auto is always 1:1 ratio.'], correctAnswer: 1, explanation: 'Critical distinction. Auto-transformer = three terminals on one winding; isolation = four terminals with two windings. Substituting one for the other in a medical, audio or laboratory context is a serious safety failure.' },
];

const faqs = [
  { question: 'Why is the UK grid 50 Hz?', answer: 'Historical accident — early German systems standardised on 50 Hz, and the UK followed Europe rather than the American 60 Hz. Both work; neither is technically superior at this scale. Frequency must be tightly controlled across the grid (within ±0.5 Hz normally).' },
  { question: 'How does power flow from generator to socket?', answer: 'Generator (11 kV) → step-up transformer (400 kV) → transmission lines → grid substation step-down (132/33 kV) → distribution → primary substation step-down (11 kV) → local distribution transformer (400/230 V) → cut-out → consumer.' },
  { question: 'Why do PV inverters need transformers if they have isolation built in?', answer: 'Modern string inverters use transformerless designs with PV strings floating relative to earth. Larger commercial PV (&gt;50 kW) typically uses a step-up transformer to match grid voltage and provide galvanic isolation per G99 ENA grid code requirements.' },
  { question: 'What\'s a transformer "K-factor"?', answer: 'A rating that indicates how much harmonic current the transformer can handle without overheating. K1 = pure 50 Hz only. K4, K13, K20 = increasing harmonic content tolerance. Heavy IT or VFD installs may specify K13 or K20 transformers.' },
  { question: 'Why do step-up transformers at substations have huge cooling fins?', answer: 'Even at 99.5 % efficiency, a 400 MVA transformer dissipates 2 MW of heat continuously. Forced-oil-and-air or natural cooling banks are massive. Failure to cool = failure of the transformer.' },
  { question: 'Can I install a transformer outdoors?', answer: 'Yes — both pole-mounted and pad-mounted (kiosk/substation) types are designed for outdoor use. They have weather-tight enclosures, oil with high flash point, and remote-disconnection isolation. Indoor units (dry-type) are common for commercial fit-outs.' },
  { question: 'When is an oil bund required and how big should it be?', answer: 'Oil bund is required for any oil-filled transformer above 200 litres oil capacity (in practice all distribution transformers above ~25 kVA). The bund must hold 100 % of the transformer oil contents plus 10 % to allow for displaced volume. Required by Control of Pollution (Oil Storage) (England) Regulations 2001 (and equivalent in Scotland, Wales, NI). Bund construction usually concrete with oil-resistant lining.' },
  { question: 'What\'s the difference between G98 and G99?', answer: 'ENA Engineering Recommendation G98 covers small generation up to 16 A per phase (about 3.7 kW single-phase or 11 kW three-phase). Type-tested inverters with G98 compliance can be installed without prior DNO approval (notification only). G99 covers generation above this threshold — full DNO application, agreed protection settings, witnessed commissioning. Both standards include anti-islanding, voltage and frequency limits, and harmonics.' },
  { question: 'Why is medical IT BS 7671 §710 the same as IT for industrial earthing?', answer: 'Same letter abbreviation, same general principle (no direct earth reference on the supply), but different application. Industrial IT is mainly about continuity of supply (one fault doesn\'t trip the whole system); medical IT is about patient safety (one fault doesn\'t energise patient-touchable parts). Both use insulation monitoring devices but with different alarm settings and procedures.' },
  { question: 'Can I move a transformer between locations after installation?', answer: 'Possible but requires care — the unit must be drained of oil, transported on its own purpose-built skids, refilled with new (or refurbished) oil, electrically commissioned and re-tested. For pole-mounted small units it\'s relatively straightforward; for substation kiosks it\'s a major operation. Always involve the manufacturer or specialist transformer movers.' },
  { question: 'What\'s a "DNO adoption" of a private substation?', answer: 'Where a developer installs a new substation as part of a new commercial site, the DNO can adopt it as part of the public network — meaning the DNO takes ownership and maintenance responsibility, in exchange for the developer meeting design and commissioning standards (typically per ENA TS 41-24 or similar). Adoption commonly required where the substation feeds a multi-tenant development or where the site has variable / unpredictable demand growth.' },
];

export default function Sub6() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>
          <PageHero eyebrow="Module 3 · Section 4 · Subsection 6" title="Transformer types and the UK grid"
            description="Generator step-up, transmission, distribution, site, isolation and instrument transformers — and the journey from power station to socket." tone="yellow" />
          <TLDR points={[
            'Transformers tie together every voltage level in the UK grid: alternator → 400 kV → 132 → 33 → 11 → 400/230 V.',
            'Higher voltage = lower current for same power → smaller losses; that\'s why transmission is at 400 kV.',
            'Site transformers (230/110 V centre-tapped) reduce shock risk on construction tools.',
            'Medical IT, isolation and instrument transformers serve specific safety and metering roles.',
            'PV/wind generation now feeds the grid via inverter + step-up transformer, complying with G98/G99.',
            'Auto-transformer = single tapped winding, no isolation; isolation transformer = two windings, galvanic separation.',
            'Reg 132.1 places transformer-type selection on a skilled person; §710 governs medical IT.',
            'Outdoor oil-filled transformers must be bunded to 110 % of oil contents (Control of Pollution Regs 2001).',
          ]} />
          <LearningOutcomes outcomes={[
            'Trace power flow from generation to consumption and identify each transformer.',
            'Explain why high-voltage transmission reduces I²R loss.',
            'Identify the transformer type for: site tools, medical, metering, welding, PV inverter, EV charging, wind/solar export.',
            'Read a transformer nameplate and place it correctly in the grid hierarchy.',
            'Distinguish auto-transformer from isolation transformer by terminal count and winding arrangement.',
            'Apply BS 7671 §710 to medical IT supply selection (BS EN 61558-2-15 transformer + BS EN 61557-8 monitoring).',
            'Specify CT and VT ratio, burden, accuracy class for protection or metering applications.',
            'Apply ENA G98 / G99 to small and large generation grid connections.',
            'Specify a substation room with adequate ventilation, IP rating, fire separation and acoustic limits.',
            'Identify when an oil bund is required and to what capacity.',
          ]} initialVisibleCount={3} />
          <TransformerSchematic />
          <ContentEyebrow>The UK grid hierarchy</ContentEyebrow>
          <ConceptBlock title="From generator to your socket" plainEnglish="Five voltage levels, five sets of transformers. Each step-down brings the supply closer to the consumer at progressively lower voltage and higher current.">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Generator (11-25 kV)</strong> — power station alternator output.</li>
              <li><strong>Generator step-up</strong> → 400 kV super-grid (longest distances) or 132/275 kV (older transmission).</li>
              <li><strong>Grid substation step-down</strong> → 33 kV regional distribution.</li>
              <li><strong>Primary substation step-down</strong> → 11 kV local distribution.</li>
              <li><strong>Distribution transformer</strong> → 400/230 V LV consumer supply.</li>
            </ul>
            <p>Each level is built around transformers — and the failure of any one isolates everyone downstream until repaired.</p>
          </ConceptBlock>
          <InlineCheck {...checks[0]} />

          <VideoCard
            url={videos.threePhaseTransformers.url}
            title={videos.threePhaseTransformers.title}
            channel={videos.threePhaseTransformers.channel}
            duration={videos.threePhaseTransformers.duration}
            topic={videos.threePhaseTransformers.topic}
          />

          <SectionRule />
          <ContentEyebrow>Transformer applications</ContentEyebrow>
          <ConceptBlock title="Same physics, very different shapes" plainEnglish="Each application drives the design — voltage class, ratio, kVA, cooling, vector group, special features.">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Distribution (11 kV / 400 V Dyn11):</strong> 100 kVA – 1 MVA, oil-filled or dry-type, pad-mounted or pole-mounted. The workhorse.</li>
              <li><strong>Generator step-up:</strong> 11 kV / 400 kV, hundreds of MVA, forced-oil-and-air cooled, dedicated.</li>
              <li><strong>Auto-transformer:</strong> small voltage change (110/230 V site, motor star-delta starter). No isolation.</li>
              <li><strong>Isolation (1:1):</strong> separation for medical, audio, and ground-loop break.</li>
              <li><strong>Instrument (CT/VT):</strong> high-current or high-voltage step-down for metering and protection.</li>
              <li><strong>Welding:</strong> high secondary current (100-1000 A), heavy leakage reactance to control arc.</li>
              <li><strong>Site transformer (230/110 V CT):</strong> BS 4363 reduced low-voltage on construction tools.</li>
            </ul>
          </ConceptBlock>
          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />
          <InlineCheck {...checks[3]} />
          <SectionRule />
          <ContentEyebrow>Generation and the grid</ContentEyebrow>
          <ConceptBlock title="Renewables tie in via inverter + transformer" plainEnglish="A solar PV array or wind turbine produces DC or variable-frequency AC. An inverter conditions it to grid-frequency AC, then a step-up transformer matches the local distribution voltage.">
            <p>For PV: DC strings → inverter (3-phase 400 V output) → step-up transformer (400 V / 11 kV) → grid connection at substation. Compliance: G98 (≤16 A/phase) or G99 (above) ENA grid code, with anti-islanding and protection settings agreed with the DNO.</p>
          </ConceptBlock>
          <RegsCallout
            source="ENA Engineering Recommendation G99 — Requirements for the connection of generation equipment in parallel with public distribution networks"
            clause="Generation &gt; 16 A per phase shall comply with the protection settings, fault ride-through requirements and operational limits specified in G99. The interface transformer shall provide galvanic isolation and the relay scheme shall include loss-of-mains, voltage and frequency protection."
            meaning={
              <>Any commercial PV, wind or battery system above 16 A/phase needs a G99 application, agreed protection settings and (usually) a step-up isolation transformer with associated relays. Without G99 compliance the DNO will not commission the connection.</>
            }
            cite="Source: ENA Engineering Recommendation G99 (current edition)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1"
            clause="The electrical installation shall be designed by one or more skilled persons to provide for: (a) the protection of persons, livestock and property in accordance with Section 131; and (b) the proper functioning of the electrical installation for the intended use."
            meaning={
              <>
                Specifying the right transformer type — distribution, isolation, instrument, site
                or auto — is the headline Reg 132.1 act on any commercial supply. The skilled
                person matches application to type, voltage class to environment, vector group
                to existing system, and rating to demand. A wrong type choice (e.g.
                auto-transformer where isolation was needed) puts the installation outside the
                protection scope envisaged by Section 131.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.1 — design of electrical installations."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 710 (Medical locations) — Regulations 710.411.5.201, 710.411.6 and 710.411.6.3.101"
            clause={`710.411.5.201: In medical locations of group 1 and group 2, RCDs shall be used as protective devices, except for circuits of a medical IT system specified in Regulation 710.411.6.

710.411.6.3.101: For each group of rooms serving the same function, at least one medical IT system shall be provided. Each medical IT transformer shall be equipped with a medical insulation monitoring device (MED-IMD) in accordance with Annex A and Annex B of BS EN 61557-8. For each medical IT transformer an audible and visual alarm system shall be provided, including (a) a green signal lamp to indicate normal operation and (b) a yellow signal lamp which lights when the minimum value set for the insulation resistance is reached.`}
            meaning={
              <>
                Section 710 is why hospitals use medical IT (isolation) transformers in group 2
                locations (operating theatres, intensive care, areas where intracardiac catheters
                are used). The single-fault tolerance — a single line-to-earth fault doesn&apos;t
                energise patient-touchable parts — is what protects the patient connected to
                monitoring equipment. The MED-IMD (BS EN 61557-8) plus the green / yellow alarm
                scheme are how the system tells theatre staff that the first fault has occurred,
                so the work can be completed and the fault investigated without losing supply
                mid-procedure. The medical IT transformer itself is to BS EN 61558-2-15.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 710, Regulations 710.411.5.201, 710.411.6 and 710.411.6.3.101."
          />
          <SectionRule />
          <CommonMistake title="Buying a domestic isolation transformer for a 'sensitive' bench" whatHappens={<>Customer wants 'isolation' for a hi-fi bench. Buys a £40 230/230 V toroidal transformer. Loads it with a 1.5 kW amplifier. Transformer was rated 500 W; saturates and overheats; insulation fails to earth. Hi-fi destroyed.</>}
            doInstead={<>Size the isolation transformer for the actual load with margin. 1.5 kW load → 2 kVA transformer minimum. Check the input fuse rating and the secondary insulation class. Do not assume "isolation" means safety in a poorly-specified unit.</>} />

          <CommonMistake
            title="Confusing auto-transformer with isolation transformer in a medical fit-out"
            whatHappens={
              <>
                Refurb of a medical site. Existing isolation transformer in a treatment room is
                replaced (cost-driven) with an auto-transformer of similar kVA. The
                auto-transformer is significantly cheaper and looks similar from the outside.
                The contractor signs off the work. First service test reveals the medical IT
                system has lost its single-fault tolerance — a line-to-earth fault would now
                propagate. BS 7671 §710 breach; insurance claim; remedial replacement at full
                cost.
              </>
            }
            doInstead={
              <>
                Read the schematic and the nameplate. An auto-transformer has THREE terminals
                (line, tap, neutral) on a single tapped winding; an isolation transformer has
                FOUR terminals (primary line, primary neutral, secondary line, secondary
                neutral) with TWO galvanically-separated windings. For medical IT (§710), the
                supply transformer must comply with BS EN 61558-2-15 — confirm this on the
                nameplate before installing.
              </>
            }
          />

          <CommonMistake
            title="Open-circuiting a CT secondary on an energised supply"
            whatHappens={
              <>
                Engineer needs to remove a meter from a CT-fed supply. Disconnects the meter
                without first shorting the CT secondary via the test block. The CT, with the
                primary still energised at full load, becomes an unrestricted step-up
                transformer with no controlled secondary load. Secondary voltage rises to
                several kV; insulation breaks down with audible bang and visible flash;
                operative startled and could have been injured; CT destroyed.
              </>
            }
            doInstead={
              <>
                Always short the CT secondary at the test block BEFORE disconnecting the meter
                or relay. Most metering panels include a sliding test block specifically for
                this — slide to short, then disconnect downstream. If no test block, isolate
                the primary first (de-energise the supply). Never assume a CT secondary can be
                left open.
              </>
            }
          />
          <ContentEyebrow>Choosing transformer location, ventilation and IP rating</ContentEyebrow>

          <ConceptBlock
            title="Indoor substation room design — the 80 % rule and the noise problem"
            plainEnglish="An indoor substation room must be sized for the transformer (with maintenance access on all sides), ventilation (natural or forced to extract heat), fire separation from adjacent areas, and noise containment. Rule of thumb: a 1000 kVA dry-type at average 50 % load dissipates around 4-5 kW continuously, which has to leave the room as warm air. Without adequate ventilation the room temperature rises, transformer ratings derate, and life shortens."
            onSite="L3 framing on commercial fit-outs where the design includes a switchroom: check ventilation calculations early. A typical adequate switchroom for 1 MVA includes 1 m of clear access on at least three sides, an inlet louvre at low level (e.g. 1 m² free area for a 1 MVA unit), an outlet louvre at high level (1.5 m² free area), and a temperature-controlled extract fan to back up natural ventilation in summer. Acoustic treatment matters where the substation is close to occupied spaces."
          >
            <p>Substation ventilation design rule of thumb:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Natural inlet free area</strong> — approximately 1 m² per MVA at low level on cool side.</li>
              <li><strong>Natural outlet free area</strong> — approximately 1.5 m² per MVA at high level on opposite side.</li>
              <li><strong>Temperature differential</strong> — outlet should not exceed ambient + 20 K under design load.</li>
              <li><strong>Forced ventilation backup</strong> — thermostatically controlled fan rated 6-10 air changes per hour.</li>
              <li><strong>IP rating</strong> — IP00 (open) for clean indoor; IP21 (drip-proof) for normal indoor; IP43 for car park substations; IP54 for dusty industrial; IP65+ for outdoor / wash-down.</li>
              <li><strong>Fire separation</strong> — typically 60-minute fire-rated walls and ceiling; door FD60.</li>
              <li><strong>Acoustic limit</strong> — 40-45 dBA at boundary of substation room for normal occupied building; lower for residential adjacency.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Outdoor pad-mount and pole-mount transformers — UK practice"
            plainEnglish="Outdoor distribution transformers come in two main configurations: pad-mounted (kiosk-style, ground level, fenced compound) and pole-mounted (small kVA, on a wooden or steel pole, used in rural and overhead-line areas). Both are oil-filled in standard UK practice. Pad-mounted units are more common in urban developments; pole-mounted are predominant in rural and last-mile rural distribution."
            onSite="L3 framing for new commercial connections: the DNO usually decides the transformer type when adopting a new substation. Pad-mounted kiosk types (e.g. Schneider Minera, Hitachi DTU) are typical 250 kVA - 1 MVA units. Inside the kiosk: HV switch, transformer, LV cabinet with main switch and outgoing ways, plus monitoring and protection. Customer access only on LV side; HV side is DNO-only."
          >
            <p>Pad-mount vs pole-mount comparison:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pad-mount</strong> — 100 kVA to 2.5 MVA range, kiosk enclosure, ground level, accessible by service team, common in urban and commercial developments.</li>
              <li><strong>Pole-mount</strong> — 5 kVA to 200 kVA range, pole-fixed, no enclosure beyond the unit itself, common in rural and overhead networks.</li>
              <li><strong>Compact kiosk substation</strong> — packaged HV switch + transformer + LV cabinet in single fenced unit, used for small commercial &lt; 500 kVA.</li>
              <li><strong>Modular substation</strong> — multiple kiosks for medium developments 500 kVA to 5 MVA, with separate HV and transformer kiosks.</li>
              <li><strong>Indoor substation</strong> — for larger developments 2 MVA+, integrated into building, requires switchroom design.</li>
            </ul>
            <p>
              Bunding requirement: oil-filled transformers must have an oil bund (containment
              area) sized to hold 100 % of the transformer oil contents plus 10 %, to prevent
              oil escape into the environment in case of leak. Required by the Control of
              Pollution (Oil Storage) (England) Regulations 2001 and equivalent regulations
              elsewhere in the UK.
            </p>
          </ConceptBlock>

          <ContentEyebrow>Renewable generation transformer specifics</ContentEyebrow>

          <ConceptBlock
            title="PV inverter transformer types — why string inverters often have no transformer"
            plainEnglish="Modern PV string inverters (e.g. SolarEdge, SMA, Fronius) are typically &apos;transformerless&apos; — they synthesise grid-frequency AC directly from the DC strings without any internal step-up transformer. Larger central inverters (50 kW+) often include an internal isolation transformer or are paired with an external one. The choice affects safety, efficiency and the type of RCD required."
            onSite="L3 framing: a transformerless string inverter floats the PV array relative to earth. RCD selection on the AC side must be Type B (for DC fault detection) because the inverter can pass DC fault current. A transformer-coupled inverter has galvanic isolation; standard Type A RCD is sufficient. Read the inverter manual; the RCD type required is always specified."
          >
            <p>PV inverter classifications and their RCD needs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Transformerless string inverter</strong> — direct DC-to-AC; high efficiency 97-98.5 %; PV strings float; requires Type B RCD on the AC side.</li>
              <li><strong>Inverter with HF transformer</strong> — internal high-frequency isolation transformer at the DC stage; medium efficiency 96-97 %; Type A or Type B RCD depending on inverter spec.</li>
              <li><strong>Inverter with LF transformer</strong> — internal 50 Hz isolation transformer; lower efficiency 94-95 %; Type A RCD usually sufficient; heavier and bigger.</li>
              <li><strong>Central inverter + external transformer</strong> — large commercial 50 kW+; external delta-wye step-up to 11 kV / 33 kV for grid connection; Type A RCD on AC side; external transformer takes care of DC isolation.</li>
              <li><strong>Microinverter</strong> — one per panel; transformerless; AC output direct; requires Type B at DB.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Battery energy storage transformer interface"
            plainEnglish="Battery storage systems (BESS) interface with the grid via bidirectional inverters that both charge and discharge. Like PV, the inverter output goes through a step-up transformer for grid voltage matching, except the BESS transformer must handle continuous bidirectional power flow at high duty cycle. K-rating is needed for harmonic content; thermal design must allow continuous operation at rated kVA."
            onSite="L3 framing on a commercial BESS install: 100 kW BESS + 100 kVA K-13 isolation transformer is typical. The inverter spec defines the AC voltage; the transformer matches it to local distribution. Anti-islanding, fault ride-through and frequency response per G99 — plus increasingly the DNO requires advanced grid services like reactive power support and frequency response."
          >
            <p>BESS transformer specification points:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Bidirectional rating</strong> — must handle full kVA in both directions continuously.</li>
              <li><strong>K-rating</strong> — typically K-9 or K-13 for harmonic content from PWM inverters.</li>
              <li><strong>Vector group</strong> — match the local network; Dyn11 for typical UK distribution.</li>
              <li><strong>Cooling</strong> — usually dry-type for indoor installation; oil-cooled for outdoor.</li>
              <li><strong>Protection scheme</strong> — full G99 protection on both directions; trip on grid loss.</li>
              <li><strong>Cycling</strong> — battery cycles thousands of times per year; transformer must tolerate continuous operation without thermal limit issues.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Wind turbine transformers — generator step-up and pad-mount"
            plainEnglish="Wind turbines generate at relatively low voltage (typically 690 V for utility-scale onshore, 33-66 kV for offshore export). A pad-mount transformer at the base of each turbine steps up to the wind farm collector voltage (typically 11 kV or 33 kV); the wind farm collector ties together multiple turbines via a feeder; a substation step-up transformer raises to grid voltage (132 kV or 275 kV) for export to the wider grid."
            onSite="L3 framing: small-scale wind (sub-G99 threshold ~16 A/phase, equivalent to about 5 kW per phase) connects similarly to small PV. Larger wind needs full G99 grid connection process: protection coordination, anti-islanding, voltage and frequency controls, fault ride-through. Vector group typically Dyn11 or Dyn5 depending on the network it joins."
          >
            <p>Wind turbine electrical chain components:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Generator</strong> — typically 690 V three-phase, doubly-fed induction (DFIG) or full-converter type.</li>
              <li><strong>Power electronics converter</strong> — synthesises grid-frequency AC at controlled voltage, current and pf.</li>
              <li><strong>Pad-mount step-up transformer</strong> — typically 690 V / 11 kV or 690 V / 33 kV; one per turbine.</li>
              <li><strong>Wind farm collector network</strong> — 11 kV or 33 kV cables linking multiple turbines.</li>
              <li><strong>Wind farm substation transformer</strong> — collector voltage to grid voltage (132 kV or 275 kV).</li>
              <li><strong>Grid connection</strong> — to public transmission network with full G99 protection scheme.</li>
            </ul>
          </ConceptBlock>

          <Scenario title="Connecting a 50 kW commercial PV system to a building 400 V supply" situation={<>Customer installing 50 kW rooftop PV on a commercial unit. Existing supply: 400 V 3-phase. What transformer/grid connection equipment is required, and which standard?</>}
            whatToDo={<>50 kW = 72 A per phase at pf 1.0 — &gt; 16 A trigger so G99 applies.<br/>Inverter: 50 kW 3-phase 400 V, IEC 62109 compliant.<br/>Interface transformer: typically 100 kVA dry-type 400 / 400 V Dyn11 isolation transformer, providing galvanic separation and impedance to limit fault contribution.<br/>Protection relays: G99 minimum scheme — under/overvoltage, under/over frequency, ROCOF, voltage vector shift, loss of mains.<br/>Connection at supply switchgear with synchronisation to grid before paralleling.<br/>DNO application with G99 form, signed protection settings, witnessed commissioning.</>}
            whyItMatters={<>The transformer is the bridge between the customer site and the public grid. Without correct rating, vector group, isolation and protection it can be a fault path or a hazard to the network.</>} />
          <SectionRule />

          <ContentEyebrow>Apprentice depth — choosing transformers on commercial jobs</ContentEyebrow>

          <ConceptBlock title="Three-phase commercial transformer selection — the questions to ask" plainEnglish="When specifying a commercial transformer (50 kVA to 1 MVA) for a new build or major refurb, six questions drive the spec: (1) kVA, (2) primary voltage, (3) secondary voltage, (4) vector group, (5) cooling, (6) location/IP rating. Get all six right at design and the install drops in cleanly.">
            <p>Standard L3 transformer specification checklist:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>kVA</strong> — peak load × diversity × 1.25 future-proofing margin.</li>
              <li><strong>Primary V</strong> — 11 kV from DNO supply, OR 400 V from existing LV board.</li>
              <li><strong>Secondary V</strong> — 433 V (no-load, gives ~410 V at full load) is standard for new commercial; 400 V if matching existing.</li>
              <li><strong>Vector group</strong> — Dyn11 standard for distribution; Yyn0 if specific neutral handling needed.</li>
              <li><strong>Cooling</strong> — ONAN for outdoor/oil; AN dry-type for indoor; AF dry-type if continuous full-load.</li>
              <li><strong>IP rating</strong> — IP00 (open dry-type, indoor switchroom) to IP54 (sealed, outdoor exposed).</li>
              <li><strong>Plus:</strong> tap range (±5 % standard), %Z (4-6 % typical), accessories (Buchholz, oil temp, winding temp simulator).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Dry-type vs oil-filled — when to use which" plainEnglish="Oil-filled transformers are cheaper per kVA, more efficient, last longer, and tolerate overload better. But oil is flammable and contained, so they need fire-rated containment, bunding and (often) outdoor location. Dry-type is fire-safe but more expensive, less efficient, and noisier — ideal for inside buildings.">
            <p>Selection guide:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Outdoor pad-mounted</strong> → oil-filled, ONAN, kiosk enclosure.</li>
              <li><strong>Outdoor pole-mounted</strong> → oil-filled, ONAN, small kVA only.</li>
              <li><strong>Indoor substation room (purpose built)</strong> → oil-filled with fire wall + bund OR dry-type without.</li>
              <li><strong>Indoor with shared occupancy</strong> → dry-type (no fire risk from oil).</li>
              <li><strong>Data centre / IT room</strong> → dry-type cast resin, K-rated, low-noise.</li>
              <li><strong>Hospital / medical IT</strong> → dry-type with insulation monitoring per BS 7671 §710.</li>
              <li><strong>Marine / offshore</strong> → dry-type with marine-rated insulation; oil is extra hazard.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="UPS sizing — apparent vs real power requirement" plainEnglish="UPS units are rated in BOTH kVA (apparent power) and kW (real power). The kW rating is the maximum REAL power the UPS can deliver continuously; the kVA rating is the maximum apparent power. For modern IT loads with pf ~0.95-1.0, kVA and kW ratings are similar. For older loads with pf 0.7, you need significantly more kVA than kW.">
            <p>Standard UPS sizing exercise:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sum real power loads (kW) — IT racks, lighting, comms gear.</li>
              <li>Determine worst-case pf — modern racks ~0.95, older ~0.85, with motors as low as 0.6.</li>
              <li>Calculate kVA = kW / pf.</li>
              <li>Add diversity factor (typically 0.7-0.9 for IT — not all gear runs at full).</li>
              <li>Add growth margin (typically 1.25-1.5).</li>
              <li>Pick next standard UPS rating (10, 15, 20, 30, 40, 50, 80, 100, 160, 200, 250 kVA, etc.).</li>
            </ul>
            <p>Worked: 25 racks × 4 kW each (real) = 100 kW. PF 0.95. Diversity 0.8. Growth 1.3. Rating = 100 × 0.8 × 1.3 / 0.95 = 109.5 kVA → spec 125 kVA UPS.</p>
          </ConceptBlock>

          <ConceptBlock title="Site transformer selection on construction projects" plainEnglish="UK construction sites use 110 V centre-tapped (CTE) supply for hand tools — line-to-earth voltage is 55 V, well below the 50 V AC threshold for safety. The site transformer is a 230/110 V auto OR isolated transformer with the centre-tap of the 110 V winding earthed. BS 4363 sets the standard.">
            <p>Site transformer selection by tool load:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1 kVA portable</strong> — small jobs, single drill or grinder, single 16 A 110 V outlet.</li>
              <li><strong>3 kVA portable</strong> — multi-tool shared, 2-3 outlets, common for first-fix.</li>
              <li><strong>5 kVA cabinet</strong> — site office plus tools, 3-4 outlets, semi-permanent.</li>
              <li><strong>10 kVA cabinet</strong> — small site distribution feeding multiple outlet boxes via 110 V sub-mains.</li>
              <li><strong>Above 10 kVA</strong> — usually a permanent install, 3-phase 400/110 V supply with isolated SLD.</li>
            </ul>
            <p>
              All site transformers must be portable-tested per BS 7671 + HSE guidance: continuity
              of CTE earthing, insulation resistance, secondary voltage check, and physical
              inspection of casing/cable. Tag and certify.
            </p>
          </ConceptBlock>

          <ConceptBlock title="EV charger transformer requirements — fast and rapid" plainEnglish="Slow AC chargers (3.5-22 kW) connect to standard 230/400 V supplies; no special transformer needed beyond what already serves the building. DC fast chargers (50-150 kW) and rapid chargers (150-350 kW) typically need a dedicated step-down transformer because they pull 100s of amps. EV transformer must handle inrush from the rectifier banks plus harmonic content from the switching.">
            <p>EV charger transformer selection:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Bank of slow chargers (8-16 × 22 kW)</strong> — feed from existing 400 V supply with sub-DB; transformer only if existing supply inadequate.</li>
              <li><strong>50 kW DC fast charger</strong> — typically 75-100 kVA dedicated transformer, K-4 or K-13 rated for rectifier harmonics.</li>
              <li><strong>150 kW rapid charger</strong> — 200 kVA dedicated, K-13, often integrated with the charger cabinet.</li>
              <li><strong>350 kW ultra-rapid</strong> — 500 kVA dedicated, K-20, requires DNO new connection or upgrade.</li>
              <li><strong>Multi-bay rapid hub (4-8 × 150 kW)</strong> — own substation, 1 MVA + transformer, HV connection.</li>
            </ul>
            <p>
              Future-proofing tip: spec EV transformers at 30-50 % above current peak to allow
              for additional bays without re-supply. Adding a transformer later costs 3-5× more
              than oversizing initially.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Instrument transformers — CT and VT detail for protection and metering"
            plainEnglish="Current transformers (CTs) step down primary current to a standardised secondary (commonly 1 A or 5 A). Voltage transformers (VTs, also called potential transformers PTs) step down primary voltage to a standardised secondary (commonly 100 V or 110 V phase-to-phase). The secondaries feed protection relays and metering — but at much safer values than the HV primary."
            onSite="L3 wiring discipline: NEVER open-circuit a CT secondary while the primary is energised. The CT becomes an unrestricted step-up transformer; secondary voltage rises to thousands of volts; insulation breaks down; the CT is destroyed and operatives may be injured. Use the test block to short the secondary before disconnecting any meter or relay."
          >
            <p>Common CT specifications and their use:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ratio</strong> — primary to secondary, e.g. 200/5 A means 200 A primary corresponds to 5 A secondary.</li>
              <li><strong>Burden VA</strong> — the maximum load (in VA) the secondary can drive without saturating; e.g. 5 VA, 10 VA, 15 VA, 30 VA.</li>
              <li><strong>Accuracy class for metering</strong> — 0.1, 0.2, 0.5, 1, 3 (lower is more accurate); 0.5 is typical commercial.</li>
              <li><strong>Accuracy class for protection</strong> — 5P10, 5P20, 10P20 (numbers indicate composite error and accuracy limit factor); 5P10 typical.</li>
              <li><strong>Insulation rating</strong> — 0.72, 1.2, 3.6, 7.2, 12, 24, 36 kV depending on the primary voltage class.</li>
              <li><strong>Core saturation</strong> — protection CTs must not saturate during fault currents up to the ALF; metering CTs are designed to saturate above ~5× rated to protect the meter.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Site transformer detail — BS 4363 reduced low voltage explained"
            plainEnglish="BS 4363 site transformers convert 230 V or 400 V to 110 V centre-tapped earthed (CTE). Centre-tap means the 110 V winding has its midpoint earthed — so each end of the 110 V winding is at +/- 55 V relative to earth. A line-to-earth shock therefore has only 55 V driving it, well below the 50 V AC threshold for safe touch."
            onSite="L3 framing on construction sites: 110 V CTE is the standard for portable hand tools (drills, grinders, vacs, lighting). The transformer can be portable (1-10 kVA) or fixed cabinet (10-50 kVA). 230 V on a construction site is permitted only for fixed equipment with RCD protection (typically 30 mA) and adequate enclosures."
          >
            <p>Site transformer selection guide:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Portable 1-3 kVA</strong> — small jobs, single-trade, single tools at a time.</li>
              <li><strong>Portable 5 kVA</strong> — multi-trade with shared supply; cabinet on wheels.</li>
              <li><strong>Fixed 10 kVA</strong> — site office plus tools; permanent installation for first-fix phase.</li>
              <li><strong>Fixed 25-50 kVA cabinet</strong> — multi-outlet sub-distribution to satellite outlets via 110 V sub-mains.</li>
              <li><strong>Three-phase 100 kVA+</strong> — large sites with welding, motors and other 110 V three-phase loads.</li>
              <li>BS EN 61558-2-23 specifies safety isolating transformers for construction sites; replacement standard for older BS 4363 specs.</li>
            </ul>
            <p>
              All site transformers need pre-use inspection: visible damage, cable condition, plug
              and socket integrity, label currency. Periodic detailed inspection (e.g. quarterly
              for heavy-use kit) tests insulation, polarity and earth continuity.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Earthing transformers — providing a neutral on a delta system"
            plainEnglish="Some industrial systems run on a delta primary (no neutral). If you need a neutral for single-phase loads, fault-current return path or earth fault detection, an earthing transformer (typically zigzag or wye-delta) provides the artificial neutral. Common on large industrial supplies and on generator step-up groups where the HV side is delta."
            onSite="L3 awareness: industrial sites with their own substations often have earthing transformers as part of the HV switchgear. They&apos;re visually similar to small distribution transformers but their job is purely to provide the neutral and to limit earth fault current. The neutral terminal is often connected through a neutral earthing resistor (NER) to limit fault current to a manageable level (e.g. 50-1000 A)."
          >
            <p>Common earthing transformer arrangements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Zigzag</strong> — three-phase winding arranged so flux from one phase cancels the other; presents a low impedance to zero-sequence current. Most common.</li>
              <li><strong>Wye-delta</strong> — primary star with neutral, secondary delta. Provides neutral on the wye side; the delta absorbs zero-sequence current.</li>
              <li><strong>NER (Neutral Earthing Resistor)</strong> — added in series with the earthing transformer&apos;s neutral; limits earth fault current to a safe value.</li>
              <li><strong>NGR (Neutral Grounding Reactor)</strong> — inductor instead of resistor; less common but used where active fault-current limiting is required.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Audio and isolation transformers — when 1:1 isolation is the whole point"
            plainEnglish="An isolation transformer with a 1:1 turns ratio doesn&apos;t change voltage but provides galvanic separation between input and output. The two windings share no electrical connection — so a fault on one side doesn&apos;t propagate to the other. Used for medical IT systems, audio ground-loop breaking, sensitive equipment protection, and some lab installations."
            onSite="L3 distinction: an isolation transformer is NOT the same as an auto-transformer. An auto-transformer has a single tapped winding (input and output share copper) and provides NO isolation. Always check the nameplate or the schematic; replacing an isolation transformer with an auto-transformer is a serious safety failure that often goes undetected until the first fault."
          >
            <p>Isolation transformer applications and their requirements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Medical IT (BS 7671 §710)</strong> — single-fault-tolerant supply in operating theatres; insulation monitoring; alarm; manual restoration.</li>
              <li><strong>Audio</strong> — break ground loops between equipment with different earth references; reduce 50 Hz hum.</li>
              <li><strong>Lab / test bench</strong> — isolated supply for sensitive measurements; allows scope probes to reference any point.</li>
              <li><strong>SELV / PELV power supplies (BS 7671 §414)</strong> — provide separated extra-low voltage; fault-protective by separation.</li>
              <li><strong>Reduced low voltage (BS 7671 §411.8)</strong> — 50 V or lower secondary, isolated from earth where appropriate; specific applications.</li>
              <li><strong>Marine / offshore</strong> — separated supplies for control circuits; reduces single-point failure.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Welding transformers — heavy leakage reactance by design"
            plainEnglish="A welding transformer steps 230 V or 400 V down to ~30-80 V at the welding electrode, but with deliberately high leakage reactance to limit short-circuit (welding-arc) current to a controlled value. Different from a regular transformer where low impedance is preferred. Modern arc-welding sets use solid-state inverters that synthesise the welding waveform and tightly control current."
            onSite="L3 framing: a welding bay typically has its own dedicated 32 A or 63 A 3-phase supply and may need a sub-DB for multiple welder units. RCD-Type B may be needed for solid-state welder units due to their DC fault-current characteristics. Don&apos;t feed a welder via a domestic-style RCD or you&apos;ll get nuisance trips."
          >
            <p>Welder types and their supply needs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stick welder (MMA) — small portable</strong>, 230 V single-phase, 16 A connection, suitable for site work.</li>
              <li><strong>MIG / TIG / MMA — workshop unit</strong>, 230 V or 400 V, 16-32 A, dedicated socket recommended.</li>
              <li><strong>Industrial multi-process</strong>, 400 V three-phase, 32-63 A, dedicated breaker, RCD Type B if connection requires RCD protection.</li>
              <li><strong>Spot welder (resistance)</strong>, very high secondary current (10s of kA), short duration; primary 400 V three-phase 63-100 A with motor-rated protection due to inrush.</li>
              <li><strong>Plasma cutter</strong>, similar profile to TIG welder, often included on the same supply.</li>
              <li>Always coordinate welder current with cable derating — sustained welding at high duty cycle can heat cables more than expected.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            'UK grid: 11-25 kV alternator → 400 kV transmission → 132/33 → 11 kV → 400/230 V LV.',
            'Higher transmission voltage = lower current = smaller I²R loss.',
            'Distribution transformer typically 11 kV/400 V Dyn11, 100 kVA-1 MVA.',
            'Site (230/110 CT), isolation (1:1), instrument (CT/VT), welding, auto — different designs for different jobs.',
            'PV/wind generation feeds via inverter + step-up transformer, G98/G99 compliant.',
            'BS 7671 §710 medical IT systems use isolation transformer + insulation monitoring (BS EN 61557-8).',
            'Auto-transformer ≠ isolation transformer; auto has three terminals on one winding, isolation has four with separate windings.',
            'CT secondaries must be shorted before disconnecting meter or relay; never open-circuit a live CT.',
            'EV rapid chargers need K-rated transformers (K-13 typical) and 30-50 % rating margin for future bays.',
            'Outdoor oil-filled transformers need bunding to 110 % of oil contents under Control of Pollution Regulations 2001.',
            'Reg 132.1 places transformer-type selection on a skilled person; Section 710 (Regs 710.411.5.201, 710.411.6 and 710.411.6.3.101) governs medical IT systems and the MED-IMD alarm scheme.',
            'Indoor substation rooms need ventilation calc (~1 m² inlet, 1.5 m² outlet per MVA), fire separation, acoustic limits.',
          ]} />
          <Quiz title="Transformer types and grid knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section4-5')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.5 Efficiency and regulation</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module3-section5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next section <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Section 5 — Motors and machines</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
