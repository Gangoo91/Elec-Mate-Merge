/**
 * Ported from the English course, combining:
 *   level2/module2/section3/Sub5.tsx
 *   level2/module2/section3/Sub6.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PowerCalculator } from '@/components/apprentice-courses/PowerCalculator';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';

const checks = [
  {
    id: 'i-squared-r-check',
    question: 'The power dissipated as heat in a conductor of resistance R carrying current I is:',
    options: ['P = V × I', 'P = V² × R', 'P = I² × R', 'P = I × R'],
    correctIndex: 2,
    explanation:
      "P = I²R. Double the current and you quadruple the heating. That's why a small overload heats a cable badly out of proportion, and why bigger CSA (lower R) is the fix.",
  },
  {
    id: 'pvc-limit-check',
    question:
      'A 70°C PVC-insulated cable run is left in a hot loft. The ambient is 45°C and the cable is also bunched with three other circuits. What does BS 7671 want you to do?',
    options: [
      'By evaluating whether the space is substantially enclosed and whether there is a foreseeable risk of serious injury from hazardous conditions',
      'Golden thread of digital information including electrical certification, accountability through dutyholder roles, and AFDD-related design considerations',
      'Could be a short circuit (L-N), an earth fault (L-PE), or both — depends what the nail bridges',
      'Apply Appendix 4 correction factors (ambient + grouping) and check the corrected rating still covers the design current',
    ],
    correctIndex: 3,
    explanation:
      'Appendix 4 has correction factors (Ca for ambient, Cg for grouping, Ci for thermal insulation). Multiply them together with the tabulated It value to get the actual usable rating in that environment. If your design current exceeds it, upsize.',
  },
  {
    id: 'loose-joint-check',
    question:
      "A consumer-unit terminal at 25 A has 0.05 Ω of contact resistance because it's loose. How much heat is dissipated at that single screw?",
    options: ['125 W', '31.25 W', '12.5 W', '1.25 W'],
    correctIndex: 1,
    explanation:
      "P = I²R = 25² × 0.05 = 31.25 W. That's a 30 W heater concentrated on the head of one terminal screw — easily enough to brown the insulation, melt the bus-bar coating, and start an arc fault.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Heat in a current-carrying cable is best described by:',
    options: [
      'Magnetic induction',
      'I²R losses (Joule heating)',
      'Capacitive reactance',
      'Frequency drift',
    ],
    correctAnswer: 1,
    explanation:
      "Joule heating: every conductor with resistance dissipates power = I²R as heat. Bigger I or bigger R = more heat. It's the underlying mechanism behind every cable rating, every fuse, every kettle element.",
  },
  {
    id: 2,
    question: 'Doubling the current in a cable does what to the heat dissipated?',
    options: ['No change', 'Doubles it', 'Quadruples it', 'Halves it'],
    correctAnswer: 2,
    explanation:
      "P = I²R. Square of two = four. That's why a small overload heats a cable disproportionately — and why protective devices have to act quickly above the rated current.",
  },
  {
    id: 3,
    question: 'Standard PVC cable insulation is rated for a maximum continuous temperature of:',
    options: ['90°C', '40°C', '120°C', '70°C'],
    correctAnswer: 3,
    explanation:
      '70°C for PVC, 90°C for XLPE. Above the limit, the insulation softens and ages rapidly — a 10°C overrun roughly halves its remaining life.',
  },
  {
    id: 4,
    question: 'Why does grouping cables together reduce their current rating?',
    options: [
      "Bunched cables can't dissipate heat as well, so they run hotter for the same current",
      'Apply for supply upgrade, consider on-site generation, or implement load management',
      'A target for total primary energy consumption including generation and distribution losses',
      'To take reasonable care of themselves and others, and cooperate with employers',
    ],
    correctAnswer: 0,
    explanation:
      'Bunched cables share the same volume of air to dump heat into. Each cable is heating its neighbours. Cg in Appendix 4 derates the rating to keep insulation under its temperature limit.',
  },
  {
    id: 5,
    question: 'A circuit-protective device (fuse or MCB) trips on overload because:',
    options: [
      'Evaluating and prioritising risks by plotting likelihood against severity',
      'Current creates heat in the device, which triggers the trip mechanism above the rated value',
      'Activating event, Beliefs (about the event), Consequences (emotional and behavioural)',
      'Location, type, condition, pressure gauge reading (if applicable), seal integrity, and any damage or obstruction',
    ],
    correctAnswer: 1,
    explanation:
      'Fuse element melts (I²R heating in a deliberately weak link). MCB thermal element bends as I²R heat builds. Both are using the heating effect of current to disconnect before the cable insulation cooks.',
  },
  {
    id: 6,
    question: 'A loose terminal in a junction box typically causes:',
    options: [
      'After every practice test, with a formal review every 2-3 weeks',
      'Gradually increase lighting based on time of day',
      'High contact resistance, localised I²R heating and possible fire',
      'A solar system connected to the mains grid, exporting excess generation',
    ],
    correctAnswer: 2,
    explanation:
      "Loose joint = high local R. Same I, much bigger R at one point = a lot of heat in one spot. Browns insulation, melts plastic, can ignite materials nearby. Doesn't usually trip the protection because total circuit current is unchanged.",
  },
  {
    id: 7,
    question: 'BS 7671 Sections 525 and 526 between them cover:',
    options: [
      'Surge protection',
      'Earthing arrangements',
      'Special locations',
      'Voltage drop and connections',
    ],
    correctAnswer: 3,
    explanation:
      '525 = voltage drop. 526 = connections (durable continuity, mechanical strength, accessibility for inspection). Together they cover the two main thermal failure modes: long undersized runs and bad joints.',
  },
  {
    id: 8,
    question: 'Best initial response to a strong burning smell from a consumer unit:',
    options: [
      'Isolate the supply, lock-off, evacuate if heavy smoke, then investigate',
      'Open the unit straight away to see which circuit is at fault before isolating',
      'Reset the main switch a few times to see if the smell clears on its own',
      'Leave it running and advise the customer to monitor it overnight',
    ],
    correctAnswer: 0,
    explanation:
      "Safety first. Burning smell means insulation is already cooking, possibly arcing inside. Open the door of a unit that's actively faulting and you risk a flash. Isolate, lock-off, evacuate if smoke is significant, then make safe before opening up.",
  },
];

const faqs = [
  {
    question: 'Why is I²R more dangerous than the current itself?',
    answer:
      'Squaring the current means small overloads matter more than they look. A cable rated at 32 A carrying 40 A (only 25% over) dissipates 56% more heat. That extra heat raises the conductor temperature, which raises the resistance (positive temp coefficient — see 3.3), which raises the heat again. Without protection, the cable cooks itself.',
  },
  {
    question: "What's a thermal camera actually showing me?",
    answer:
      "Infrared radiation from the surface of whatever it's pointed at. Hot spots on a consumer unit, terminal block or motor casing usually indicate higher local R — loose connection, undersized cable, blocked ventilation. Compare across similar circuits or phases; a single hot terminal in an otherwise-cool board is a red flag.",
  },
  {
    question: 'Why do MCBs have different curves (B, C, D)?',
    answer:
      'Different load profiles. Type B trips fast on small overloads, fine for resistive and lighting. Type C tolerates the inrush of fluorescents, motors. Type D for heavy-inrush kit (welders, transformers). The trip mechanism still uses I²R heating to detect overload — the curve just changes how much short-term overload it tolerates before tripping.',
  },
  {
    question: 'Does heat damage all cable types equally?',
    answer:
      "No. PVC ages noticeably above 70°C, going hard and brittle. XLPE has more headroom but still degrades above 90°C. Mineral insulation (MICC) is essentially indifferent to heat — that's why it's used on fire-alarm circuits that have to keep working in a fire.",
  },
  {
    question: "What's the link between thermal effects and the protection cascade?",
    answer:
      "Every protective device sits on the I²t curve of the cable it protects. The fuse/MCB has to trip before the cable's insulation reaches its thermal failure point. That's why 'discrimination' between devices uses I²t energy values — it's about the heat the cable can absorb before failing, not just instantaneous current.",
  },
];

const checks2 = [
  {
    id: 'primary-vs-secondary-check',
    question: 'What is the key difference between a primary cell and a secondary cell?',
    options: [
      'Both options above are partly correct.',
      'Secondary cells can be recharged; primary cells cannot',
      'A spike upward followed by the normal trace',
      'Ratio of two power levels (logarithmic)',
    ],
    correctIndex: 1,
    explanation:
      'Primary cells (zinc-carbon, alkaline) are use-once — the chemistry is irreversible. Secondary cells (lead-acid, NiMH, lithium-ion) reverse the reaction when you push current back in, so they recharge.',
  },
  {
    id: 'electrolysis-direction-check',
    question: 'In electrolysis, positive ions in the electrolyte move towards the:',
    options: [
      'Cathode (negative electrode)',
      'Yes, normal position preferred',
      'Cross-connect termination',
      'The construction phase plan',
    ],
    correctIndex: 0,
    explanation:
      "Opposites attract. Positive ions (cations) head for the negative electrode (cathode). Negative ions (anions) head for the positive electrode (anode). That's the basis of electroplating, refining, and how a lead-acid battery charges and discharges.",
  },
  {
    id: 'galvanic-corrosion-check',
    question:
      'Why does bolting a copper bonding conductor straight onto an aluminium pipe cause problems over time?',
    options: [
      'Copper is much harder than aluminium and crushes the pipe over time',
      'The two metals expand at the same rate, loosening the bolt',
      'Copper and aluminium form a galvanic cell in the presence of moisture, corroding the joint',
      'Aluminium is a poor conductor, so the joint overheats under load',
    ],
    correctIndex: 2,
    explanation:
      'Two dissimilar metals + an electrolyte (rain, condensation) = a small cell. Tiny current flows between them, eating the more reactive metal (aluminium in this case). Over time the joint corrodes, R rises, and the bond fails. Use bimetallic connectors.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: 'A simple cell consists of:',
    options: [
      'Two identical metal electrodes in pure water',
      'Two electrodes of different metals in an electrolyte',
      'A single metal rod sealed inside an insulator',
      'Two electrolytes separated by a copper plate',
    ],
    correctAnswer: 1,
    explanation:
      "Two different metals (electrodes) in an ionic solution (electrolyte). The chemical reaction between them creates an EMF — that's the cell's voltage. Same setup as the corrosion problem in 4.8 chemical effects.",
  },
  {
    id: 2,
    question: 'An everyday AA alkaline battery is an example of a:',
    options: ['Fuel cell', 'Photovoltaic cell', 'Primary cell', 'Secondary cell'],
    correctAnswer: 2,
    explanation:
      'Alkaline AAs are primary cells — chemistry is one-way, you bin them after use. NiMH and lithium-ion AAs exist (rechargeable) — those are secondary.',
  },
  {
    id: 3,
    question: 'The standard EMF of a single fully-charged lead-acid cell is approximately:',
    options: ['3.7 V', '1.2 V', '6.0 V', '2.0 V'],
    correctAnswer: 3,
    explanation:
      'About 2.0 V per cell. A 12 V car battery is 6 cells in series; a 24 V truck battery is 12. Lithium-ion is ~3.7 V/cell; NiMH is ~1.2 V/cell.',
  },
  {
    id: 4,
    question: 'Battery capacity is usually quoted in:',
    options: ['Ampere-hours (Ah)', 'Watts (W)', 'Volts (V)', 'Coulombs (C)'],
    correctAnswer: 0,
    explanation:
      'Ampere-hours = how much charge the battery can deliver. A 100 Ah battery can theoretically supply 100 A for 1 hour, or 10 A for 10 hours. Q = I × t — same coulomb maths from 3.1.',
  },
  {
    id: 5,
    question: 'Electrolysis is used industrially for:',
    options: [
      'Generating mains-frequency AC for the grid',
      'Refining metals (e.g. copper) and electroplating',
      'Stepping voltage up and down between circuits',
      'Smoothing the ripple on a rectified DC supply',
    ],
    correctAnswer: 1,
    explanation:
      'Push DC through an electrolyte and you can deposit metal from solution onto the cathode. Used to refine copper, electroplate steel with zinc/chrome/nickel, anodise aluminium, and produce hydrogen.',
  },
  {
    id: 6,
    question: 'Galvanic (bimetallic) corrosion needs three things:',
    options: [
      'Two identical metals, dry air, and a high voltage between them',
      'A single metal, an insulator, and a steady DC current',
      'Two dissimilar metals, an electrolyte, and an electrical contact between them',
      'Two electrolytes, a magnetic field, and an earth connection',
    ],
    correctAnswer: 2,
    explanation:
      "All three. Take any one away — same metal both sides, no moisture, or break the electrical path — and the corrosion mechanism stops. That's why bimetallic lugs and dielectric grease work.",
  },
  {
    id: 7,
    question:
      'A copper bonding conductor needs to be terminated to a galvanised steel pipe. Best practice is to:',
    options: [
      'Bolt the bare copper straight to the pipe and paint over the joint',
      'Wrap the copper in PVC tape before clamping it to the steel',
      'Solder the copper conductor directly onto the galvanised surface',
      'Use a bimetallic clamp/lug rated for the dissimilar metals, with a corrosion-inhibiting compound',
    ],
    correctAnswer: 3,
    explanation:
      'Direct copper-on-steel will corrode given time and moisture, raising the bonding R and eventually breaking continuity. Bimetallic clamps (BS 951 etc.) plus jointing compound stop the cell forming.',
  },
  {
    id: 8,
    question: 'A lead-acid battery being charged gives off:',
    options: [
      'Hydrogen and oxygen gas — explosive',
      'Carbon dioxide — an asphyxiation risk',
      'Chlorine gas from the electrolyte',
      'No gas at all if it is sealed correctly',
    ],
    correctAnswer: 0,
    explanation:
      'Charging a lead-acid cell electrolyses some of the water in the electrolyte into H₂ and O₂. Build-up in an unventilated space is genuinely explosive — battery rooms need ventilation, no naked flames, no sparks near the terminals.',
  },
];

const faqs2 = [
  {
    question: "Why do I need to know about batteries — I'm doing fixed wiring, not BMS?",
    answer:
      "Three reasons. Emergency lighting and fire-alarm panels run off rechargeable batteries you'll need to test. Solar PV installs need battery storage on more and more jobs. And the corrosion physics is exactly the same as galvanic corrosion at terminations — understand the cell and you understand both.",
  },
  {
    question: "What's the difference between a 'cell' and a 'battery'?",
    answer:
      'A single cell is the basic unit (around 2 V for lead-acid, 1.5 V for alkaline, 3.7 V for lithium). A battery is two or more cells wired together — usually in series for higher voltage. A 12 V car battery is six 2 V lead-acid cells in series.',
  },
  {
    question: 'Is galvanic corrosion really an issue on a normal install?',
    answer:
      'Yes — and most often at the bonding terminations on gas/water pipes, at the copper conductor / steel pipe interface in cold or damp locations, on outdoor SWA glands, and at outdoor earth electrodes. Periodic inspection should pick it up before continuity is lost.',
  },
  {
    question: 'How does electroplating actually work?',
    answer:
      "Stick the part to be coated as the cathode in a solution of the coating metal's salt. Stick a sacrificial bar of the coating metal as the anode. Push DC through. Positive metal ions in solution drift to the cathode and deposit on it; the anode dissolves to replace them. Even coating, defined thickness, controlled by current and time.",
  },
  {
    question: 'Why do batteries lose voltage over time even when not used?',
    answer:
      'Self-discharge. Even sat on a shelf, slow chemical side-reactions inside the cell consume the active materials. Lithium-ion holds charge well (a few % a month). Lead-acid is worse (a few % a week). NiMH is worst (can lose 30%+ a month). All are using the chemical-effects-of-current physics — just running it backwards.',
  },
];

export default function Lesson307E_4_8() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Why current makes things hot — the I²R heating that runs your kettle, undersizes your
        cables, ages your insulation and starts your electrical fires. The single most important
        effect to understand for safe design.
      </p>

      <TLDR
        points={[
          'Every conductor dissipates heat = I²R. Double the current, quadruple the heat. This is the basis of every cable rating in BS 7671.',
          'PVC cable insulation tops out at 70°C continuous; XLPE at 90°C. Beyond those temperatures, insulation ages fast and eventually fails.',
          "The most dangerous thermal failure on site isn't a long cable run — it's a loose terminal. Tiny contact resistance, big localised heating, real fire risk.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the heating effect P = I²R and explain why doubling current quadruples heat.',
          'List the maximum operating temperatures of common UK cable insulations (PVC, XLPE).',
          'Explain how Appendix 4 correction factors (ambient, grouping, thermal insulation) protect cables from overheating.',
          'Describe how fuses and MCBs use the heating effect to disconnect on overload.',
          'Recognise visual, smell and thermal-imaging signs of thermal damage on site.',
          'Cite BS 7671 §525 (voltage drop), §526 (connections) and Chapter 42 (protection against thermal effects) in design and inspection.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why current makes things hot</ContentEyebrow>

      <ConceptBlock
        title="Joule heating — the unavoidable side effect of current"
        plainEnglish="A drifting electron banging into atoms in the cable hands over a tiny bit of energy each time. Multiply by the trillions of electrons drifting per second and you get a measurable amount of heat."
        onSite="The kettle works because of I²R. So does the toaster, the immersion, the fan heater. Same physics that protects your cable also boils your tea."
      >
        <p>
          The same drifting electrons that make current also crash into the lattice of atoms
          they're moving through. Each collision transfers a tiny bit of kinetic energy to the
          atoms — they vibrate harder, the metal warms up. Bulk-up that effect across an entire
          conductor and you get noticeable heating.
        </p>
        <p>The maths is simple and brutal:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>P = I²R</strong> — power dissipated as heat in watts, given the current in
            amps and the resistance in ohms.
          </li>
          <li>
            <strong>The square is the sting.</strong> Double the current = four times the heat.
            Triple the current = nine times the heat. A 25% overload = 56% more heat.
          </li>
          <li>
            <strong>Energy over time</strong> = I²Rt, in joules. That's what a fuse element
            absorbs before it melts, and what a cable insulation absorbs before it fails. We call
            that I²t value the cable's "thermal energy".
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 423.1 (Protection against burns) (paraphrased)"
        clause="Excepting equipment for which a Harmonized Standard specifies a limiting temperature, an accessible part of fixed electrical equipment within arm’s reach shall not attain a temperature in excess of the appropriate limit stated in Table 42.1. Each such part of the fixed installation likely to attain under normal load conditions, even for a short period, a temperature exceeding the appropriate limit in Table 42.1 shall be guarded so as to prevent accidental contact."
        meaning={
          <>
            Chapter 42 is BS 7671's whole chapter on protection against thermal effects. Cables,
            accessories, equipment cases — all have temperature limits. The reg exists because we
            know how dangerous a touchable surface at 70°C+ is, and how quickly insulation
            degrades above its rated temp.
          </>
        }
        cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Chapter 42 Regulation 423.1 and Table 42.1 for the full text."
      />

      <InlineCheck {...checks[0]} />

      <SectionRule />

      <ContentEyebrow>How BS 7671 keeps cables under control</ContentEyebrow>

      <ConceptBlock
        title="Cable ratings are temperature limits in disguise"
        plainEnglish="A cable rated at 32 A isn't 'allowed to carry 32 A' — it's allowed to carry whatever current keeps the conductor under its insulation's temperature limit, in a defined installation method, at a defined ambient. The 32 A is the answer to that thermal sum."
      >
        <p>
          Every CSA in Appendix 4 has a tabulated current-carrying capacity (called Iz or It),
          based on:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>The conductor metal (copper or aluminium — different ρ).</li>
          <li>The insulation system (PVC = 70°C limit, XLPE = 90°C limit).</li>
          <li>
            The installation method (clipped direct, conduit, buried, in thermal insulation).
          </li>
          <li>A reference ambient temperature (usually 30°C in air, 20°C in ground).</li>
        </ul>
        <p>
          Change any of those and the cable's safe rating changes. Appendix 4 gives correction
          factors:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Ca</strong> — ambient temperature. Hot loft, boiler room, hot panel.
          </li>
          <li>
            <strong>Cg</strong> — grouping. Multiple cables sharing the same containment can't
            shed heat as well.
          </li>
          <li>
            <strong>Ci</strong> — thermal insulation. Cable in or on thermal insulation can't lose
            heat to the air around it.
          </li>
          <li>
            <strong>Cf</strong> — fuse / BS 3036 rewireable type protection (slower clearing).
          </li>
        </ul>
        <p>
          Multiply the tabulated current by the relevant factors to get the actual usable rating.
          Compare to the design current (Ib) — if it doesn't cover, upsize.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Protective devices — the safety net for I²R"
        onSite="The whole point of an MCB or fuse is to disconnect a circuit BEFORE the cable insulation reaches its thermal failure point. The trip curves are designed around exactly that."
      >
        <p>A fuse or MCB is using the heating effect of current to detect a fault:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>BS 88 fuses, BS 1361:</strong> a thin metal element melts when I²t exceeds the
            fuse's rating. Self-destructing — replace the cartridge after operation.
          </li>
          <li>
            <strong>BS 3036 rewireable fuse</strong> (the old porcelain type): same principle, a
            thin tinned wire that melts. Slower and less precise — Cf factor of 0.725 in Appendix
            4 because they take longer to clear an overload.
          </li>
          <li>
            <strong>MCBs (BS EN 60898):</strong> two trip mechanisms. Thermal (bimetal strip that
            bends as it heats) for slow overloads; magnetic (solenoid that pulls the contacts
            apart) for fast short circuits. Type B / C / D have different magnetic trip thresholds
            for different load types.
          </li>
        </ul>
        <p>
          The match between protective device and cable is the foundation of the whole
          installation. Both are characterised by I²t curves; the device curve has to sit below
          the cable curve at every current level.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 522.1.1 (Ambient temperature)"
        clause="A wiring system shall be selected and erected so as to be suitable for the highest and lowest local ambient temperatures and so that the limiting temperature in normal operation (see Table 52.2) and the limiting temperature in case of a fault (see Table 43.1) will not be exceeded."
        meaning={
          <>
            The reg behind every Ca and Ci factor in Appendix 4. It’s the cable designer’s
            obligation to make sure the conductor never exceeds its limiting temperature (Table
            52.2 — 70°C for PVC, 90°C for XLPE) under the ambient conditions it’s actually
            installed in. <strong>Appendix 4</strong> gives you the maths — Ca for ambient, Cg for
            grouping, Ci for thermal insulation, Cf for BS 3036 fuse — multiply through to get the
            corrected current-carrying capacity (Iz) and check it covers the design current (Ib).
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 522.1.1 (verbatim) and Appendix 4 (Ca/Cg/Ci/Cf correction factors)."
      />

      <InlineCheck {...checks[2]} />

      <VideoCard
        {...videos.electricHeating}
        topic="Electric heating — the thermal effect of current"
        caption="Useful animation of where I²R heating shows up — from kettles and toasters to overheating cables. The same principle in every example."
      />

      <InlineCheck {...checks[1]} />

      <SectionRule />

      <ContentEyebrow>Where it fails on site</ContentEyebrow>

      <ConceptBlock
        title="The thermal-runaway feedback loop — why small overloads escalate"
        plainEnglish="Hot conductors have higher resistance. Higher resistance means more I²R heat at the same current. More heat means more resistance. The cable can spiral upwards faster than common sense expects."
        onSite="A cable that's been sitting at 25 A for years and ‘never bothered anyone’ is the one that fails the day someone adds a 7 kW heater on a long extension lead. The extra current pushes it past its corrected rating; the temperature rises; the resistance rises; the loss climbs faster than linearly. By the time the smell reaches the kitchen, the insulation is already cooked."
      >
        <p>Three feedback effects that make thermal failures non-linear and surprising:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Positive temperature coefficient of copper</strong> (from the lesson on
            resistance and resistivity): copper's
            resistance rises by about 0.4% per °C. A conductor at 70°C has roughly 20% more
            resistance than the same one at 20°C. So I²R losses climb faster than the
            straightforward "I squared" tells you, because R is also rising.
          </li>
          <li>
            <strong>Insulation degradation</strong>: PVC ages roughly twice as fast for every 10°C
            above its 70°C limit. A cable held at 80°C for ten years comes out as brittle as one
            held at 70°C for twenty. The damage is permanent — cooling it back down doesn't
            reverse it.
          </li>
          <li>
            <strong>Convection and radiation efficiency</strong>: a cable can dump heat to its
            surroundings only as fast as the temperature gradient lets it. Bury it in insulation,
            group it with other circuits, or run it in a hot ceiling void and the gradient narrows
            — so heat builds up, temperature rises, and the next loop of the feedback runs hotter
            still.
          </li>
        </ul>
        <p>
          The protective device's job is to break the loop before this snowballs. That's why the
          I²t curve of the MCB has to sit below the cable's thermal limit at every current level —
          not just at the overload trip threshold.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Why protective devices use I²t, not just current"
        plainEnglish="Cables and devices both store energy as heat over time. A short, big pulse of current can be safe; a longer, smaller current can be lethal. I²t — current squared multiplied by time — is the energy measure both sides agree on."
        onSite="The whole reason an MCB has a trip CURVE rather than a single threshold is I²t. A 32 A Type B MCB tolerates roughly 4× rated current for a few seconds (motor inrush) but trips almost instantly above ~5× (short-circuit). Both the device and the cable behind it are sized in I²t — the device's let-through energy must always be less than the cable's withstand energy."
      >
        <p>
          I²t (read "I-squared-t", units A²·s) is the energy proxy used to match protective
          devices to cables. Two key uses:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Cable withstand</strong> — a cable can absorb a defined amount of I²t before
            its insulation reaches the failure temperature. Bigger CSA = bigger withstand. BS 7671
            Reg 434.5.2 gives the formula k²S² for the withstand energy of a conductor with CSA S
            and a material constant k (e.g. k = 115 for 70°C PVC copper).
          </li>
          <li>
            <strong>Device let-through</strong> — a fuse or MCB lets a certain amount of I²t
            through before clearing the fault. Manufacturer datasheets publish let-through curves
            (energy vs prospective fault current) for every device.
          </li>
        </ul>
        <p>
          The acceptance condition: <strong>device let-through I²t ≤ cable withstand I²t</strong>{' '}
          at the prospective fault current the install will see. Get this wrong and the cable
          cooks faster than the breaker clears — fire risk, even if the breaker is "rated"
          correctly on the simple amps test.
        </p>
        <p>
          At this level you don't have to crunch the I²t arithmetic by hand. You do have to know
          that the sizing chain is <strong>cable Iz ≥ device In ≥ design current Ib</strong> AND
          that the device's let-through energy has to suit the cable. Both checks, every circuit.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Heat conduction, convection and radiation — where cable heat goes"
        plainEnglish="A loaded cable produces heat at I²R watts per second. To stop the temperature climbing forever, the same wattage has to leave the cable somehow. Three heat-transfer modes share that job — and which one dominates depends on where the cable is."
        onSite="A surface-clipped 6 mm² T&E in a cool room is mostly cooled by convection — air rising past the sheath. The same cable buried in loft insulation has almost no convection; it has to dump heat by conduction through the surrounding insulation, which is poor at it. That's why Ci can drop the rating to 50% or less."
      >
        <p>Three heat-transfer mechanisms for any current-carrying cable:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Conduction</strong> — heat travels through solids in contact (the conductor,
            insulation, sheath, then any thermal insulation around it). Rate depends on the
            materials' thermal conductivity. PVC and XLPE are poor conductors of heat; loft
            fibreglass is even worse.
          </li>
          <li>
            <strong>Convection</strong> — heat carried away by moving air. The dominant mode for
            cables clipped or laid in free air. Rising plumes of warm air over the cable
            continually replace with cooler air.
          </li>
          <li>
            <strong>Radiation</strong> — infrared energy emitted from the cable surface.
            Significant at higher operating temperatures (90°C+ XLPE), small for a 70°C PVC cable.
          </li>
        </ul>
        <p>
          Appendix 4's reference installation methods (clipped direct, in conduit, buried, in
          thermal insulation) are essentially a catalogue of heat-removal environments — each with
          a different mix of the three mechanisms. The current rating tabulated for each method is
          whatever current produces a steady-state cable temperature at exactly the insulation
          limit. Change the environment, and the rating changes — that's why the correction
          factors exist.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Joule heating put to useful work — heaters, kettles, immersions"
        plainEnglish="Same I²R that you fight on a cable is what runs every electric heater, kettle, immersion and toaster. Designed to be hot; the conductor IS the load."
        onSite="An immersion element is a coil of resistance wire (often nichrome) sized so that I²R = the rated wattage at the rated voltage. A 3 kW immersion at 230 V wants R ≈ 17.6 Ω (P = V²/R, so R = V²/P = 230²/3000). Measure that on a healthy element with a multimeter and you'll read close to 17 Ω cold."
      >
        <p>Useful applications of I²R heating across UK installs:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Immersion heaters</strong> — nichrome element rated to dissipate 3 kW (or
            similar) directly into the cylinder water. Cable feeding it is sized so it doesn't
            overheat; the element itself runs red-hot in air, safely transferring heat to water
            through the sheath.
          </li>
          <li>
            <strong>Storage heaters and electric panel heaters</strong> — same physics, lower
            power densities, often controlled by relay or TRIAC.
          </li>
          <li>
            <strong>Underfloor heating mats</strong> — long thin resistive cable laid in screed,
            sized for power per square metre (typically 100-200 W/m²). Same I²R, just spread out.
          </li>
          <li>
            <strong>Kettle and toaster elements</strong> — resistance wire designed to glow red
            when energised. Direct conversion of electrical energy to heat with near-100%
            efficiency (anything not radiated as heat ends up as heat anyway via convection /
            conduction in the surroundings).
          </li>
          <li>
            <strong>Electric showers</strong> — instantaneous heating of water passing over an
            element. 9 kW at 230 V means roughly 39 A through the element and a roughly 5 Ω cold
            resistance.
          </li>
        </ul>
        <p>
          The line between "useful heater" and "fire risk" is just whether the heat is wanted.
          Same I²R both ways. The reason a cable rated at 32 A doesn't glow when loaded to 32 A is
          that the cable's resistance is tiny, so the I²R per metre is small. An immersion
          element's resistance is fifty thousand times bigger — same current, same physics, vastly
          different heat output.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The big three thermal failures you'll see"
        onSite="Old consumer units, especially backed up against thermal insulation in lofts. Outdoor sockets with corroded terminals. Spurs that have been added to over the years until the original cable can't cope. All thermal failures, all preventable."
      >
        <p>The patterns that come up again and again on EICRs:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Loose connections.</strong> The most common, by miles. Vibrations, thermal
            cycling, original install never properly torqued. Local R rises, I²R heat
            concentrates, terminal browns, eventually arcs.
          </li>
          <li>
            <strong>Bunched / insulated cables.</strong> A T&E run buried in loft insulation with
            no Ci factor applied. The cable can't shed heat. Insulation cooks slowly until it
            gives way. Often only spotted during a periodic.
          </li>
          <li>
            <strong>Overloaded sockets / circuits.</strong> Too many extension leads, multiple
            heaters on one ring, modern loads on circuits designed for 1970s usage. Not strictly
            an installation fault — but the symptoms are the same: hot accessories, blackened
            pins, melted plastic.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connection factors list)"
        clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection. The selection of the means of connection shall take account of, as appropriate: (a) the material of the conductor and its insulation; (b) the conductor class, the number and shape of the wires forming the conductor; (c) the cross-sectional area of the conductor; (d) the number of conductors to be connected together; (e) the temperature attained at the terminals in normal service such that the effectiveness of the insulation of the conductors connected to them is not impaired; (f) the provision of adequate locking arrangements in situations subject to vibration or thermal cycling."
        meaning={
          <>
            The reg behind every "use the right terminal for the conductor" rule. Solid vs
            stranded, different metals, different CSAs — all need the right connector and the
            right torque. Get it wrong and you've engineered a high-resistance joint into the
            install.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 526.1."
      />

      <CommonMistake
        title="Using a thermal camera as the only check on connections"
        whatHappens={
          <>
            Apprentice does a "thermal survey" with a hire camera, sees nothing hot, ticks
            everything as fine. Three months later a CU terminal that wasn't loaded at the time of
            the survey is now running 25 A and starts cooking. Thermal imaging only sees what's
            hot RIGHT NOW.
          </>
        }
        doInstead={
          <>
            Thermal imaging is great as one diagnostic tool, but you need the load on for it to
            mean anything. Combine it with: physical torque-checks at install, periodic tightness
            checks, R1+R2 readings on EICRs (a creeping joint shows up as a slowly rising loop
            value), and visual inspection for discolouration.
          </>
        }
      />

      <Scenario
        title="Burning smell at the consumer unit"
        situation={
          <>
            Customer phones in: there's a 'plasticky burning smell' near the meter cupboard and
            the kitchen lights have started flickering. They've already turned the kettle off. You
            arrive 20 minutes later — smell is still there, no visible smoke.
          </>
        }
        whatToDo={
          <>
            Don't open the consumer unit live. Isolate at the main switch (or the cut-out fuse if
            you have to and the DNO allows). Lock-off. Let it cool for 10 minutes. Open up with
            safety glasses on, check for browning, melted plastic, blackened terminals. Most
            likely culprit: a loose neutral on a heavily loaded circuit dissipating tens of watts
            at one screw. Re-terminate properly to the manufacturer's torque, replace any damaged
            components, run a full IR + R1+R2 + Zs check before re-energising.
          </>
        }
        whyItMatters={
          <>
            Burning insulation is one step from arcing, which is one step from a fire that spreads
            to the joists. The smell is the install warning you while there's still time to fix
            it. Treat it as urgent.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Every conductor dissipates P = I²R as heat. The square is what makes overloads dangerous out of proportion.',
          'PVC = 70°C limit, XLPE = 90°C limit. Beyond those, insulation ages fast and eventually fails.',
          'Cable ratings in Appendix 4 are temperature limits expressed as currents. Apply Ca, Cg, Ci correction factors to get the real usable rating in your environment.',
          "Fuses and MCBs use I²R heating to detect overloads. The device's I²t curve has to sit below the cable's.",
          'The most common site failure is a loose terminal — high local R = concentrated heat = browned insulation, melted parts, eventual arcing.',
          'Trust your nose and eyes on EICRs. Discolouration, plastic-burning smell, melted terminals = isolate immediately and investigate.',
        ]}
      />

      <Quiz title="Thermal effects knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The other side of current. Cells turn chemistry into electricity; electrolysis turns
        electricity into chemistry; corrosion does it without anyone asking. The physics behind
        every battery you'll touch and every dissimilar-metal joint you'll fight.
      </p>

      <TLDR
        points={[
          'Two different metals in an electrolyte = a cell. Chemistry produces an EMF; current flows when you connect the load.',
          'Primary cells (alkaline) are one-shot. Secondary cells (lead-acid, lithium-ion, NiMH) reverse the reaction to recharge.',
          'The same physics that powers your battery causes galvanic corrosion at every dissimilar-metal joint. Bimetallic lugs and inhibitor paste stop it.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the basic construction of a cell — two electrodes, an electrolyte, the chemical reaction that produces EMF.',
          'Distinguish primary (non-rechargeable) and secondary (rechargeable) cells with examples.',
          'Explain electrolysis and give examples of its industrial use (refining, plating, hydrogen).',
          'Describe how a lead-acid battery charges and discharges, and the safety hazards (acid, gas, current).',
          'Explain galvanic corrosion at terminations and how to prevent it (bimetallic connectors, inhibitor compound).',
          'Use Q = I × t to relate ampere-hours of capacity to charge.',
        ]}
        initialVisibleCount={3}
      />

      <p className="text-[13.5px] text-white/85 leading-relaxed border-l-2 border-emerald-400/40 pl-4 italic">
        <span className="not-italic font-semibold text-emerald-300 mr-1.5">Where this fits:</span>
        <strong>The lesson on electron theory</strong> said electrons in motion is what current IS.
        This lesson shows what happens when those electrons start swapping ions in solutions, gases
        or solids — the chemistry of charge transfer. Same particles, different behaviour: electron
        theory was the physics of free electrons drifting through a metal; this lesson is the
        chemistry of electrons being handed off at an electrode. The two halves of one story.
      </p>

      <ContentEyebrow>The cell — chemistry into electricity</ContentEyebrow>

      <ConceptBlock
        title="Two metals, one electrolyte, an EMF appears"
        plainEnglish="Stick a copper rod and a zinc rod into a jar of dilute sulphuric acid and connect them with a wire. Current flows. The chemistry creates the push; the wire lets the electrons go somewhere. That's a cell."
        onSite="Same setup, smaller scale, in every battery you'll touch — torch cells, MCB-test instrument batteries, fire-alarm panel back-ups, electric-van traction packs."
      >
        <p>A cell is the basic chemical-to-electrical converter. Three ingredients:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Two electrodes</strong> made of different metals (or a metal and a conductive
            non-metal like carbon). One ends up positive, the other negative.
          </li>
          <li>
            <strong>An electrolyte</strong> — a liquid or paste that conducts via ions, not
            electrons. Acid, alkali, salt solution, gel.
          </li>
          <li>
            <strong>A chemical reaction</strong> at each electrode that either gives up electrons
            (oxidation, at the negative electrode) or accepts them (reduction, at the positive).
            The voltage between the two electrodes is the cell's EMF.
          </li>
        </ul>
        <p>
          The voltage depends on which two metals you pick. Zinc + copper in acid gives about 1.1
          V. Lead + lead-dioxide in sulphuric acid gives about 2.0 V (the lead-acid car battery
          cell). Lithium + cobalt-oxide gives about 3.7 V. The chemistry sets the voltage, not the
          size — a tiny watch battery and a huge truck battery of the same chemistry are both 1.5
          V or 2.0 V per cell.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Capacity — how long the chemistry lasts"
        plainEnglish="Voltage tells you how hard the cell pushes. Capacity tells you how long it can keep pushing before the chemistry runs out."
      >
        <p>
          Capacity is quoted in <strong>ampere-hours (Ah)</strong>. It's the maximum total charge
          the cell can deliver before being flat:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Q = I × t</strong> — exactly the same coulomb relationship from 3.1, just with
            hours instead of seconds. 100 Ah = 100 A for 1 hour, 50 A for 2 hours, 1 A for 100
            hours.
          </li>
          <li>
            The energy stored is voltage × capacity: a 12 V × 100 Ah lead-acid battery holds{' '}
            <strong>1200 Wh = 1.2 kWh</strong>. Less than running a kettle for an hour.
          </li>
          <li>
            Real batteries don't hold the rated capacity at high discharge rates. The faster you
            pull, the less you get out — that's why EV range drops in stop/start traffic.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Part 2 Definitions (Battery, Cell) (paraphrased)"
        clause="Battery: A combination of two or more cells permanently interconnected as a unit. Cell: A single unit consisting of two electrodes immersed in or contacted by an electrolyte capable of producing electrical energy by electrochemical action or of being charged by it."
        meaning={
          <>
            Cell vs battery — the formal version. One cell on its own is a cell; two or more
            joined up is a battery. A 12 V lead-acid 'battery' is six 2 V cells in series. A AA on
            its own is a cell, despite everyone calling it a 'battery'.
          </>
        }
        cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 2 for full definitions of Battery and Cell."
      />

      <InlineCheck {...checks2[0]} />

      <SectionRule />

      <ContentEyebrow>Primary vs secondary cells</ContentEyebrow>

      <ConceptBlock
        title="Primary cells — use them once, bin them"
        plainEnglish="The chemical reaction inside is one-way. Once the active materials are used up, that's it — recharging would just heat the cell and damage it."
      >
        <p>The common primary cells you'll meet:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Zinc-carbon (1.5 V):</strong> the cheap supermarket battery. Zinc casing acts
            as the negative electrode and slowly corrodes during use. Leak prone. On its way out
            as a chemistry.
          </li>
          <li>
            <strong>Alkaline (1.5 V):</strong> zinc + manganese dioxide in alkaline (KOH) paste.
            Higher capacity than zinc-carbon, longer shelf life, less leaking. The dominant
            single-use cell.
          </li>
          <li>
            <strong>Lithium primary (3 V):</strong> lithium metal + various oxides. Long shelf
            life, wide temperature range, expensive. Used in smoke alarms, watches, medical
            implants.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Secondary cells — reverse the chemistry to recharge"
        onSite="Every electrician's drill, every multimeter, every clamp meter, every test instrument runs off secondary cells. Knowing why they degrade with charge cycles tells you when to replace them rather than waste a job day on a flat tester."
      >
        <p>
          Secondary cells use a chemistry that's reversible — push current back in and the
          reactions run backwards, restoring the active materials. Not infinitely; eventually
          side-reactions degrade them and capacity falls.
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Lead-acid (2.0 V/cell):</strong> the original rechargeable. Lead and
            lead-dioxide plates in sulphuric acid. Heavy, robust, cheap per Wh. Car batteries, UPS
            banks, leisure batteries. Charging gives off hydrogen — needs ventilation.
          </li>
          <li>
            <strong>NiMH (1.2 V/cell):</strong> nickel + metal hydride. Replaced NiCd because it's
            cadmium-free. Common in older cordless tools, hybrid vehicles, rechargeable AAs.
            Self-discharges noticeably.
          </li>
          <li>
            <strong>Lithium-ion (3.6-3.7 V/cell):</strong> lithium ions shuttle between two
            intercalation electrodes. High energy density, low self-discharge, no memory effect.
            Phones, laptops, modern cordless tools, EVs, solar storage. Needs careful charge
            control to avoid thermal runaway and fire.
          </li>
        </ul>
      </ConceptBlock>

      <VideoCard
        {...videos.batteries}
        topic="How batteries work — chemical effects of current"
        caption="The animation of ion movement inside a charging and discharging cell makes the primary-vs-secondary distinction concrete."
      />

      <InlineCheck {...checks2[1]} />

      <SectionRule />

      <ContentEyebrow>Electrolysis — electricity into chemistry</ContentEyebrow>

      <ConceptBlock
        title="Push current through an electrolyte and you can break it apart"
        plainEnglish="Connect a DC supply across two electrodes in a salt solution and the salt dissociates — positive ions (the metal) plate out on the negative electrode; negative ions (the chloride, sulphate, etc.) gather at the positive."
      >
        <p>
          Electrolysis is the cell running in reverse — instead of chemistry pushing current out,
          you push current in to make chemistry happen. Industrial uses include:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Refining copper</strong> — impure copper anode dissolves into solution; pure
            copper plates out on the cathode. The world's electrical-grade copper goes through
            this.
          </li>
          <li>
            <strong>Electroplating</strong> — depositing chrome on car trim, zinc on steel bolts
            (galvanising), nickel under chrome, gold on connectors. Uniform coatings, controlled
            thickness.
          </li>
          <li>
            <strong>Anodising aluminium</strong> — building up a thicker, harder oxide layer for
            corrosion resistance and dye-friendliness.
          </li>
          <li>
            <strong>Hydrogen production</strong> — electrolyse water to split it into H₂ and O₂.
            The current basis for "green hydrogen" if powered by renewables.
          </li>
        </ul>
        <p>
          Faraday's laws (1830s) are the underlying maths: the amount of substance deposited is
          proportional to the charge passed (Q = I × t — the same equation again). You don't need
          to solve them by hand, but recognise that electroplating is just controlled
          chemistry driven by a controlled current.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where chemistry bites you on site — corrosion</ContentEyebrow>

      <ConceptBlock
        title="Galvanic corrosion — the unwanted cell"
        plainEnglish="Bolt copper to aluminium, get them slightly damp, and you've accidentally built a cell. The more reactive metal slowly dissolves. Joint corrodes; resistance creeps up; eventually fails."
        onSite="Most often seen on bonding conductors at gas/water pipes, on outdoor SWA gland plates, on earth electrodes, and on aluminium overhead lines spliced to copper droppers."
      >
        <p>
          Galvanic corrosion needs the same three ingredients as a battery — except you didn't ask
          for it:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Two dissimilar metals</strong> in electrical contact (the joint).
          </li>
          <li>
            <strong>An electrolyte</strong> — rainwater, condensation, ground moisture, even sweat
            and salt residue.
          </li>
          <li>
            <strong>A current path</strong> between them — which the metal-to-metal contact
            already provides.
          </li>
        </ul>
        <p>
          The metal further down the galvanic series (the more reactive one) becomes the anode and
          corrodes preferentially. Common pairings and the loser:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Copper + aluminium</strong> → aluminium corrodes. Big problem on overhead
            aluminium-to-copper joints; managed with aluminium-to-aluminium connectors plus
            separate copper droppers.
          </li>
          <li>
            <strong>Copper + galvanised steel</strong> → zinc corrodes first (sacrificial), then
            the steel. Bonding to galvanised water pipes or gas pipes needs proper bimetallic
            clamps.
          </li>
          <li>
            <strong>Stainless steel + aluminium</strong> → aluminium corrodes. SS bolts on
            aluminium enclosures — use isolating washers and inhibitor paste.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The galvanic series — which metal corrodes when paired with which"
        plainEnglish="Metals can be ranked by how reactive they are. When two are connected through an electrolyte, the more reactive one becomes the sacrificial anode and corrodes first. The bigger the gap on the series, the faster it goes."
        onSite="Why bonding clamps come in different metals. A copper-jaw clamp on a copper pipe = same metal, no cell, no problem. The same clamp on galvanised steel or aluminium = a few hundred millivolts of EMF, slow corrosion, eventual failure of the bond."
      >
        <p>
          The galvanic series ranks metals from most reactive (most willing to give up electrons
          and corrode) to least reactive ("noble"). A simplified electrician's version,
          most-reactive at the top:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Magnesium</strong> — used as sacrificial anodes on water heaters and buried
            steel pipework precisely because it's so reactive.
          </li>
          <li>
            <strong>Zinc</strong> — the galvanising layer on steel and the cup of a zinc-carbon
            battery. Sacrificial when paired with steel; corrodes preferentially to protect the
            steel underneath.
          </li>
          <li>
            <strong>Aluminium</strong> — corrodes when in contact with copper or stainless steel;
            protects itself with an oxide layer until that's broken.
          </li>
          <li>
            <strong>Mild / galvanised steel</strong> — the substrate metal in most structural
            applications.
          </li>
          <li>
            <strong>Lead, tin</strong> — relatively unreactive; lead is what survives in old
            plumbing.
          </li>
          <li>
            <strong>Copper, brass, bronze</strong> — bonding conductors, terminals.
          </li>
          <li>
            <strong>Stainless steel, gold</strong> — least reactive of the common metals.
          </li>
        </ul>
        <p>
          Pair any two and the higher-up metal corrodes. The effect is small for adjacent pairs
          (e.g. tin/lead) and dramatic for pairs from far apart (e.g. magnesium/copper). That's
          why specifications get fussier the further apart the metals on the series.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The hydrogen risk — why battery rooms need ventilation"
        plainEnglish="Charging a lead-acid battery electrolyses some of the water in the electrolyte into hydrogen and oxygen gas. Both are released from the cell vents into the air around the battery. Hydrogen is explosive above 4% concentration in air."
        onSite="Standby battery rooms in commercial buildings (UPS, fire-alarm panels, emergency lighting central battery systems) are designed with permanent natural or forced ventilation calculated against expected charging gassing rates. BS EN IEC 62485-2 sets the design rules. A small unventilated cupboard with a 24 V lead-acid bank inside is a real, documented cause of explosions."
      >
        <p>
          The chemistry: when a lead-acid cell charges past about 2.4 V, the reaction can no
          longer keep up and the surplus current electrolyses water in the electrolyte:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>At the negative plate: 2H⁺ + 2e⁻ → H₂ (hydrogen gas evolved).</li>
          <li>At the positive plate: 2H₂O → O₂ + 4H⁺ + 4e⁻ (oxygen gas evolved).</li>
          <li>
            The mixture is hydrogen and oxygen in a 2:1 ratio — chemically stoichiometric for
            combustion. Once hydrogen reaches 4% by volume in air, an arc, spark or flame ignites
            it explosively.
          </li>
        </ul>
        <p>Mitigation on a real install:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Ventilation</strong> — natural or forced airflow sized to keep hydrogen
            concentration well below 1% (a quarter of the lower explosive limit, with margin). BS
            EN IEC 62485-2 has the design formula.
          </li>
          <li>
            <strong>No ignition sources</strong> in the battery enclosure or vent path. No naked
            flames, no smoking, no switching arcs at battery terminals — switches and contactors
            mounted outside the battery space.
          </li>
          <li>
            <strong>Sealed (VRLA / AGM / gel) batteries</strong> — recombine hydrogen and oxygen
            internally during normal charging, so they vent only on overcharge or fault. Lower
            (but not zero) ventilation requirement.
          </li>
          <li>
            <strong>PPE for service</strong> — splash-proof goggles, acid-resistant gloves,
            eye-wash station within reach.
          </li>
        </ul>
        <p>
          EV traction packs and modern lithium battery banks have different chemistries with
          different (often more dangerous) failure modes — thermal runaway, electrolyte fire. The
          general rule is the same: respect what the chemistry can do, ventilate appropriately,
          and follow the manufacturer's safety instructions to the letter.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 522.5.3"
        clause="Materials liable to cause mutual or individual deterioration or hazardous degradation shall not be placed in contact with each other."
        meaning={
          <>
            The reg behind every "use bimetallic lugs" decision. If the install puts two different
            metals together where moisture can get at them, you have to manage the
            galvanic-corrosion risk (different metals + electrolyte = a cell that eats the more
            reactive metal) — or accept that the joint will degrade and need replacement.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 522.5.3 (verbatim)."
      />

      <InlineCheck {...checks2[2]} />

      <CommonMistake
        title="Bonding straight onto a galvanised pipe with a standard copper-jaw clamp"
        whatHappens={
          <>
            Apprentice fits a BS 951 clamp meant for copper-to-copper directly onto a galvanised
            water pipe. Looks fine on test day. Three winters of condensation later, the zinc has
            eaten through under the jaw, the contact has corroded to a green crust, and the
            bonding R has crept from 0.05 Ω to 5 Ω. Periodic test catches it — but only because
            they tested it.
          </>
        }
        doInstead={
          <>
            Use a clamp rated for the pipe material (bimetallic for copper-to-galvanised), or
            clean the pipe back to bare metal, apply a corrosion-inhibiting compound, then fit the
            clamp and shroud the joint. Document it in the install certificate so the next
            periodic electrician knows what's there.
          </>
        }
      />

      <Scenario
        title="Lead-acid battery bank in a small UPS room"
        situation={
          <>
            You're sent to look at a building with a 48 V UPS battery bank — 24 lead-acid cells in
            a small unventilated cupboard. The customer says the door has been kept shut for
            years. There's a faint sulphury smell when you open up.
          </>
        }
        whatToDo={
          <>
            Don't strike a match, don't use a non-sparking switch, don't smoke. Open the door, let
            it air for several minutes before going in. Charging lead-acid evolves hydrogen —
            explosive in air at concentrations above 4%. The room needs permanent ventilation per
            the manufacturer's data sheet. Recommend the install gets a proper review against the
            battery manufacturer's spec, BS EN IEC 62485-2 (battery room ventilation), and the
            installation certificate's stated assumptions.
          </>
        }
        whyItMatters={
          <>
            Battery rooms have killed people — hydrogen explosion, sulphuric acid burns, arc-flash
            from a dropped tool across the terminals. Treat them with the same respect as a
            switchroom. The chemical effects of current are exactly that — physical, real, and
            capable of doing damage long after the chemistry stops being interesting.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'A cell = two dissimilar electrodes + an electrolyte. Chemistry produces EMF; the cell pushes current when you close the circuit.',
          'Primary cells (alkaline, zinc-carbon) are one-shot. Secondary cells (lead-acid, NiMH, lithium-ion) reverse the chemistry to recharge.',
          'Capacity is in Ah. Q = I × t — same coulomb maths as 3.1. Energy stored = V × Ah.',
          'Electrolysis runs the cell backwards: push DC into an electrolyte to refine metals, plate parts, anodise aluminium, produce hydrogen.',
          'Galvanic corrosion is an unwanted cell — dissimilar metals + moisture + electrical contact. Use bimetallic connectors and inhibitor paste at every dissimilar-metal joint.',
          'Lead-acid battery rooms need ventilation — charging gives off hydrogen, which is explosive above 4% in air. Treat with proper respect.',
        ]}
      />

      <Quiz title="Chemical effects of current knowledge check" questions={quizQuestions2} />
    </div>
  );
}
