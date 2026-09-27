/**
 * Final paper — Module 3: Electrical science and principles.
 *
 * Fifty-five questions, and the only part of the paper that is substantially
 * arithmetic. Every numeric answer here was worked through rather than
 * recalled, and the two table values used — 18 mV/A/m for 2.5 mm² twin and
 * earth, 29 mV/A/m for 1.5 mm² — are the repo's own transcription of BS 7671
 * Appendix 4 (src/lib/calculators/bs7671-data/voltageDropData.ts).
 *
 * The distractors on the calculation questions are the specific wrong answers
 * the working produces: the un-squared term, the wrong prefix, the route
 * length where the loop length was wanted, peak taken for RMS. A distractor
 * that is simply a different number teaches nothing.
 */

import { bank, type WelshExamQuestion } from './helpers';

const QUESTIONS: WelshExamQuestion[] = [
  // ── Section 1 · Mathematics, units and measurement ───────────────────────
  {
    id: 91,
    question: 'A 3 kW immersion heater is supplied at 230 V. What current does it draw?',
    options: [
      '0.08 A',
      '13.0 A',
      '76.7 A',
      '690 A',
    ],
    correctAnswer: 1,
    explanation:
      'Transposing P = V × I gives I = P ÷ V = 3000 ÷ 230 = 13.0 A. Dividing the voltage by the power instead gives 0.08 A; using 3 kW as 3 W and dividing into the voltage gives 76.7 A; and multiplying rather than dividing gives 690 A. Sense-check the size before you write it down — a 3 kW heater on a 13 A plug is exactly what you would expect.',
    section: 'Mathematics, units and measurement',
    difficulty: 'basic',
    topic: 'Transposing the power formula',
    reference: 'Module 3, Section 1 — The maths an electrician uses',
  },
  {
    id: 92,
    question:
      'A conductor carrying 10 A dissipates 50 W. If the current rises to 20 A and the resistance is unchanged, what power is now dissipated?',
    options: [
      '100 W',
      '150 W',
      '200 W',
      '400 W',
    ],
    correctAnswer: 2,
    explanation:
      'P = I²R, so doubling the current quadruples the heating: 4 × 50 = 200 W. Answering 100 W treats the relationship as linear, which is the single most consequential mistake in this topic — it is why overload is dangerous out of proportion to how far over the rating the current has gone. 150 W and 400 W do not follow from either relationship.',
    section: 'Mathematics, units and measurement',
    difficulty: 'intermediate',
    topic: 'The square law',
    reference: 'Module 3, Section 1 — P = I²R',
  },
  {
    id: 93,
    question: 'What does the "mm²" in a cable size describe?',
    options: [
      'The cross-sectional area of the conductor',
      'The diameter of the conductor',
      'The overall diameter of the cable including the sheath',
      'The circumference of the conductor at its widest point',
    ],
    correctAnswer: 0,
    explanation:
      'It is an area — the cross-sectional area of the copper — which is why doubling it halves the resistance. Reading it as a diameter is the standard error, and it matters because area goes with the square of the diameter, so the two scale quite differently. The overall cable diameter and the circumference are dimensions you might measure but neither is what the size designation means.',
    section: 'Mathematics, units and measurement',
    difficulty: 'basic',
    topic: 'Cable size notation',
    reference: 'Module 3, Section 1 — mm² is an area',
  },
  {
    id: 94,
    question:
      'An insulation resistance test reads 250 MΩ. Expressed in ohms, that is:',
    options: [
      '250 000 Ω',
      '2 500 000 Ω',
      '250 000 000 Ω',
      '0.25 Ω',
    ],
    correctAnswer: 2,
    explanation:
      'Mega means 10⁶, so 250 MΩ is 250 × 1 000 000 = 250 000 000 Ω. Reading M as kilo gives 250 000 Ω, a factor of a thousand out. 2 500 000 Ω is a slipped decimal place, and 0.25 Ω treats the M as milli — which is the case-sensitivity trap, and gives an answer a million times too small.',
    section: 'Mathematics, units and measurement',
    difficulty: 'basic',
    topic: 'SI prefixes',
    reference: 'Module 3, Section 1 — SI prefixes',
  },
  {
    id: 95,
    question: 'Which is the SI base unit among the electrical quantities?',
    options: [
      'The volt',
      'The ohm',
      'The watt',
      'The ampere',
    ],
    correctAnswer: 3,
    explanation:
      'The ampere is one of the seven SI base units, and every other electrical unit is derived from the base units: 1 V = 1 J/C, 1 Ω = 1 V/A, 1 W = 1 J/s. Volts, ohms and watts are all derived, which is exactly why they can be expressed in terms of one another.',
    section: 'Mathematics, units and measurement',
    difficulty: 'intermediate',
    topic: 'SI base and derived units',
    reference: 'Module 3, Section 1 — One language',
  },
  {
    id: 96,
    question:
      'Which CAT rating is required for a test instrument used at a distribution board?',
    options: [
      'CAT I',
      'CAT II',
      'CAT III',
      'CAT IV',
    ],
    correctAnswer: 2,
    explanation:
      'CAT III covers distribution-level circuits, which is where a board sits. CAT IV is for the origin of the installation — the supply intake, where the available fault energy is highest. CAT II is for plug-in appliance-level work and CAT I for protected electronic circuits, so both are under-rated at a board. Using an under-rated instrument is how meters explode.',
    section: 'Mathematics, units and measurement',
    difficulty: 'intermediate',
    topic: 'Instrument CAT ratings',
    reference: 'Module 3, Section 1 — Five tools',
  },
  {
    id: 97,
    question:
      'Under HSE GS38, when must a voltage indicator be proved on a known live source?',
    options: [
      'Before the dead test only, so you know the instrument works before you rely on it',
      'After the dead test only, to confirm the instrument did not fail during the test',
      'Before and after every dead test',
      'At the start of each working day, and after any drop or impact',
    ],
    correctAnswer: 2,
    explanation:
      'Before and after, every time, no exceptions — proving beforehand shows the instrument was working, and proving afterwards shows it did not fail silently between the two, which would make a live circuit read as dead. Either half on its own leaves that gap open. A daily check and a check after a drop are both sensible but they are not the GS38 discipline.',
    section: 'Mathematics, units and measurement',
    difficulty: 'basic',
    topic: 'Proving dead',
    reference: 'HSE GS38',
  },
  {
    id: 98,
    question:
      'Why is a two-pole voltage indicator preferred over a multimeter for proving dead?',
    options: [
      'It reads to a higher resolution, so a small residual voltage is not missed',
      'It is single-function with built-in current limiting, and GS38-compliant by design',
      'It measures true RMS, so it is accurate on distorted waveforms',
      'It has a higher CAT rating than any multimeter available',
    ],
    correctAnswer: 1,
    explanation:
      'A two-pole indicator does one job, has current limiting built in and is designed to meet GS38 — there is no range switch to leave on the wrong setting, which is the failure mode a multimeter brings. Higher resolution is not the point and is not generally true. True RMS matters for measurement rather than for proving dead. And CAT ratings are available across both instrument types.',
    section: 'Mathematics, units and measurement',
    difficulty: 'intermediate',
    topic: 'Choosing the instrument',
    reference: 'Module 3, Section 1 — Five tools',
  },
  {
    id: 99,
    question:
      'ESQCR permits the declared 230 V supply to vary within what tolerance?',
    options: [
      '−6% to +10%, approximately 216 V to 253 V',
      '−10% to +6%, approximately 207 V to 244 V',
      '±5%, approximately 218 V to 242 V',
      '±10%, approximately 207 V to 253 V',
    ],
    correctAnswer: 0,
    explanation:
      'Minus 6 per cent and plus 10 per cent, giving roughly 216 V to 253 V — the tolerance is deliberately asymmetric. Reversing the two gives 207 V to 244 V, a symmetric ±5% or ±10% band is a tidier guess than the real figure, and the upper limit of 253 V is the one worth remembering because it is what equipment has to tolerate.',
    section: 'Mathematics, units and measurement',
    difficulty: 'advanced',
    topic: 'Supply voltage tolerance',
    reference: 'ESQCR 2002',
  },
  {
    id: 100,
    question:
      'Which quantity is measured in parallel, across two points, rather than in series?',
    options: [
      'Current',
      'Voltage',
      'Insulation resistance of a single conductor to earth',
      'Continuity of a protective conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage is a potential difference between two points, so it is measured across them — in parallel. Current is measured in series, or without breaking the circuit using a clamp meter. Insulation resistance and continuity are both resistance measurements made on a dead circuit with the instrument connected into the path, not across a live supply.',
    section: 'Mathematics, units and measurement',
    difficulty: 'basic',
    topic: 'How quantities are measured',
    reference: 'Module 3, Section 1 — Volts measure potential difference',
  },

  // ── Section 2 · Mechanical principles, energy and efficiency ─────────────
  {
    id: 101,
    question: 'What is the weight of a 50 kg drum of cable on Earth, taking g as 9.81 m/s²?',
    options: [
      '50 N',
      '490.5 N',
      '5.1 N',
      '50 kg',
    ],
    correctAnswer: 1,
    explanation:
      'Weight is a force: W = m × g = 50 × 9.81 = 490.5 N. Answering 50 N confuses the mass figure with the force; 5.1 N divides by g instead of multiplying; and giving the answer in kilograms answers the mass question, which is the classic mark-loser when a question asks for weight.',
    section: 'Mechanical principles, energy and efficiency',
    difficulty: 'basic',
    topic: 'Mass and weight',
    reference: 'Module 3, Section 2 — Mass and weight',
  },
  {
    id: 102,
    question:
      'A 20 kg load is accelerated at 3 m/s². What net force is acting on it?',
    options: [
      '6.7 N',
      '23 N',
      '60 N',
      '196 N',
    ],
    correctAnswer: 2,
    explanation:
      'F = m × a = 20 × 3 = 60 N. Dividing instead of multiplying gives 6.7 N, adding the two quantities gives 23 N, and 196 N is what you get by multiplying the mass by g — the weight of the load rather than the force accelerating it.',
    section: 'Mechanical principles, energy and efficiency',
    difficulty: 'basic',
    topic: 'Newton’s second law',
    reference: 'Module 3, Section 2 — Force = push or pull',
  },
  {
    id: 103,
    question:
      'A force of 200 N moves a load 5 m in the direction of the force. How much work is done?',
    options: [
      '40 J',
      '205 J',
      '1000 J',
      '1000 W',
    ],
    correctAnswer: 2,
    explanation:
      'Work = force × distance = 200 × 5 = 1000 J. Dividing gives 40 J and adding gives 205 J. The 1000 W answer has the right number with the wrong unit: a watt is a joule per second, so it is a rate of doing work rather than an amount of it, and no time was given.',
    section: 'Mechanical principles, energy and efficiency',
    difficulty: 'basic',
    topic: 'Work',
    reference: 'Module 3, Section 2 — Work = force × distance',
  },
  {
    id: 104,
    question:
      'A 2 kg tool is at a height of 10 m. Taking g as 9.81 m/s², what is its potential energy?',
    options: [
      '20 J',
      '98.1 J',
      '196.2 J',
      '392.4 J',
    ],
    correctAnswer: 2,
    explanation:
      'PE = mgh = 2 × 9.81 × 10 = 196.2 J, and all of it becomes kinetic energy on the way down — which is why the Work at Height Regulations treat falling objects as seriously as falling people. Leaving g out gives 20 J, using half the mass gives 98.1 J, and doubling it gives 392.4 J.',
    section: 'Mechanical principles, energy and efficiency',
    difficulty: 'intermediate',
    topic: 'Potential energy',
    reference: 'Module 3, Section 2 — PE = mgh',
  },
  {
    id: 105,
    question:
      'Kinetic energy is given by KE = ½mv². If the speed of a falling object doubles, its kinetic energy:',
    options: [
      'Doubles',
      'Increases by half again',
      'Quadruples',
      'Is unchanged, because the mass has not changed',
    ],
    correctAnswer: 2,
    explanation:
      'The velocity term is squared, so doubling it multiplies the energy by four. That is why a small tool dropped from height is a serious projectile — it is not the mass that makes it dangerous, it is the speed it has reached. Doubling and increasing by half both treat the relationship as linear, and the mass being constant does not stop the energy changing.',
    section: 'Mechanical principles, energy and efficiency',
    difficulty: 'intermediate',
    topic: 'Kinetic energy',
    reference: 'Module 3, Section 2 — KE = ½mv²',
  },
  {
    id: 106,
    question: 'A machine does 6000 J of work in 20 seconds. What is its power output?',
    options: [
      '300 W',
      '120 kW',
      '0.33 W',
      '300 J',
    ],
    correctAnswer: 0,
    explanation:
      'P = W ÷ t = 6000 ÷ 20 = 300 W. Multiplying instead gives 120 kW, inverting the division gives 0.33 W, and 300 J has the right number with the unit of energy rather than of power — the same confusion as kW against kWh.',
    section: 'Mechanical principles, energy and efficiency',
    difficulty: 'basic',
    topic: 'Power',
    reference: 'Module 3, Section 2 — Power = work ÷ time',
  },
  {
    id: 107,
    question:
      'A motor draws 3 kW and delivers 2.55 kW of mechanical output. What is its efficiency?',
    options: [
      '85%',
      '117%',
      '45 %',
      '0.85 kW',
    ],
    correctAnswer: 0,
    explanation:
      'Efficiency = useful output ÷ total input = 2.55 ÷ 3 = 0.85, or 85 per cent, which is a realistic figure for a motor. Inverting the ratio gives 117 per cent, which should be rejected immediately because no real machine exceeds 100 per cent. 45 per cent does not follow from the figures, and efficiency is a ratio so it has no units.',
    section: 'Mechanical principles, energy and efficiency',
    difficulty: 'intermediate',
    topic: 'Efficiency',
    reference: 'Module 3, Section 2 — Efficiency',
  },
  {
    id: 108,
    question:
      'A pulley system has four rope segments supporting the load. What is its approximate mechanical advantage, and what is the trade-off?',
    options: [
      'MA ≈ 4, and you pull four times the distance',
      'MA ≈ 4, and the load is lifted four times faster',
      'MA ≈ 0.25, and you pull a quarter of the distance',
      'MA ≈ 2, because only the movable pulleys count',
    ],
    correctAnswer: 0,
    explanation:
      'The mechanical advantage is roughly the number of rope segments supporting the load, so about four — and the rope you pull travels four times as far, because a simple machine changes the size or direction of a force without creating energy. Whatever you save in effort you pay in distance, so the load moves more slowly rather than faster. An MA below one would mean the system multiplies distance rather than force.',
    section: 'Mechanical principles, energy and efficiency',
    difficulty: 'intermediate',
    topic: 'Pulleys and mechanical advantage',
    reference: 'Module 3, Section 2 — Simple machines',
  },
  {
    id: 109,
    question:
      'A gear train has a driver with 20 teeth and a driven gear with 60 teeth. What is the ratio, and what does it give you?',
    options: [
      '1:3 overdrive, giving three times the output speed',
      '3:1 reduction, giving more torque at lower speed',
      '3:1 reduction, giving more speed at lower torque',
      '1:3 reduction, giving three times the torque and three times the speed',
    ],
    correctAnswer: 1,
    explanation:
      'Ratio = driven teeth ÷ driver teeth = 60 ÷ 20 = 3:1, which is a reduction: the output turns a third as fast and delivers roughly three times the torque. Gears swap speed for torque and back, never both at once, so nothing gives you three times the torque and three times the speed together. Calling it an overdrive reverses the ratio, and pairing reduction with more speed contradicts itself.',
    section: 'Mechanical principles, energy and efficiency',
    difficulty: 'intermediate',
    topic: 'Gear ratios',
    reference: 'Module 3, Section 2 — Simple machines',
  },
  {
    id: 110,
    question:
      'Where does the energy go that a real machine does not deliver as useful output?',
    options: [
      'It is destroyed, which is what makes the efficiency less than 100 per cent',
      'It is stored in the machine and released when it is switched off',
      'It becomes heat, sound and vibration — the total energy is unchanged',
      'It is returned to the supply, which is why input power varies with load',
    ],
    correctAnswer: 2,
    explanation:
      'Energy is conserved: the losses become heat, sound and vibration, so the total is the same and only the useful fraction has fallen. Energy cannot be destroyed, so the losses have not gone anywhere. Nothing is stored for later release, and losses are not returned to the supply — input power does vary with load, but that is a different phenomenon.',
    section: 'Mechanical principles, energy and efficiency',
    difficulty: 'basic',
    topic: 'Conservation of energy',
    reference: 'Module 3, Section 2 — Conservation of energy',
  },

  // ── Section 3 · Electron theory, conductors and resistance ───────────────
  {
    id: 111,
    question: 'What is one ampere, expressed as a rate of charge flow?',
    options: [
      'One coulomb per second',
      'One joule per second',
      'One volt per ohm-metre',
      'One coulomb per volt',
    ],
    correctAnswer: 0,
    explanation:
      'Current is the rate of charge flow, and one amp is one coulomb per second — which is where Q = I × t comes from. A joule per second is a watt, a coulomb per volt is a farad, and a volt per ohm-metre is not a recognised unit at all.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'intermediate',
    topic: 'Charge and current',
    reference: 'Module 3, Section 3 — Three particles',
  },
  {
    id: 112,
    question: 'A current of 2 A flows for 5 minutes. How much charge has passed?',
    options: [
      '10 C',
      '150 C',
      '600 C',
      '2.5 C',
    ],
    correctAnswer: 2,
    explanation:
      'Q = I × t, with t in seconds: 2 × 300 = 600 C. Using 5 as the time in minutes gives 10 C, which is the commonest slip on this calculation. 150 C and 2.5 C do not follow from either reading of the time.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'intermediate',
    topic: 'Q = I × t',
    reference: 'Module 3, Section 3 — Three particles',
  },
  {
    id: 113,
    question:
      'A lamp lights the instant you operate the switch. What actually travels at close to the speed of light?',
    options: [
      'The electrons, which move through the copper at near light speed',
      'The electric field, while the electrons themselves drift very slowly',
      'The current, which is a separate quantity from the electrons',
      'The voltage, which flows along the conductor ahead of the current',
    ],
    correctAnswer: 1,
    explanation:
      'The field propagates at near light speed while the individual electrons drift at a fraction of a millimetre per second — which is why the lamp is instant even though no electron has travelled from the switch to the lamp. Current is the movement of those electrons, so it cannot outrun them. And voltage does not flow at all: it is a potential difference between two points.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'advanced',
    topic: 'Drift velocity and field propagation',
    reference: 'Module 3, Section 3 — Three particles',
  },
  {
    id: 114,
    question:
      'Using R = ρL ÷ A with copper at 17.2 nΩ·m, what is the resistance of a 30 m length of 2.5 mm² conductor?',
    options: [
      '0.021 Ω',
      '0.206 Ω',
      '2.06 Ω',
      '1.29 Ω',
    ],
    correctAnswer: 1,
    explanation:
      'Converting the area to 2.5 × 10⁻⁶ m²: R = (17.2 × 10⁻⁹ × 30) ÷ (2.5 × 10⁻⁶) = 0.206 Ω. The wrong answers are all prefix errors of one step in each direction, which is exactly how this calculation goes wrong — and 1.29 Ω is what you get by multiplying by the area instead of dividing.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'advanced',
    topic: 'Resistivity',
    reference: 'Module 3, Section 3 — R = ρL/A',
  },
  {
    id: 115,
    question:
      'A circuit fails its voltage drop limit. Which change to the conductor is the effective lever?',
    options: [
      'Increase the cross-sectional area, because resistance is inversely proportional to area',
      'Increase the length of the run, because resistance falls with distance from the source',
      'Change from copper to aluminium of the same size, because aluminium has lower resistivity',
      'Reduce the cross-sectional area, because a smaller conductor carries less current',
    ],
    correctAnswer: 0,
    explanation:
      'In R = ρL ÷ A, area is on the bottom: double the area and you halve the resistance, and with it the volt drop. Length is directly proportional, so a longer run makes it worse. Aluminium has higher resistivity than copper — it needs about 1.6 times the area for the same job. And reducing the area increases resistance, which makes the volt drop worse rather than better.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'intermediate',
    topic: 'Fixing voltage drop',
    reference: 'Module 3, Section 3 — R = ρL/A',
  },
  {
    id: 116,
    question:
      'Copper has a positive temperature coefficient of about 0.004 per °C. A conductor measuring 1 Ω at 20 °C, warmed to 70 °C, will measure approximately:',
    options: [
      '0.8 Ω',
      '1.05 Ω',
      '1.2 Ω',
      '1.28 Ω',
    ],
    correctAnswer: 2,
    explanation:
      'R_T = R₂₀ × [1 + α(T − 20)] = 1 × [1 + 0.004 × 50] = 1.2 Ω. A positive coefficient means the resistance rises with temperature, so 0.8 Ω has the sign the wrong way round. 1.05 Ω uses a 10 °C rise rather than 50, and 1.28 Ω comes from using 70 rather than the 50 °C difference.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'advanced',
    topic: 'Temperature coefficient',
    reference: 'Module 3, Section 3 — R = ρL/A',
  },
  {
    id: 117,
    question: 'What is the operating temperature limit of general-purpose PVC cable insulation?',
    options: [
      '60 °C',
      '70 °C',
      '90 °C',
      '105 °C',
    ],
    correctAnswer: 1,
    explanation:
      '70 °C for PVC — 90 °C is the thermosetting XLPE figure, and mixing the two up is how a cable ends up assumed to have more headroom than it has. 60 °C and 105 °C are not the standard figures for either. Current ratings in Appendix 4 are these temperature limits expressed as currents.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'basic',
    topic: 'Insulation temperature limits',
    reference: 'Module 3, Section 3 — Two metals do the work',
  },
  {
    id: 118,
    question:
      'Roughly what cross-sectional area of aluminium is needed to match the performance of a given copper conductor?',
    options: [
      'About 0.6 times the copper area',
      'The same area, since both are good conductors',
      'About 1.6 times the copper area',
      'About 3 times the copper area',
    ],
    correctAnswer: 2,
    explanation:
      'Aluminium’s resistivity is roughly 28.2 nΩ·m against copper’s 17.2, so it needs about 1.6 times the area. Using 0.6 inverts the ratio; treating them as equivalent ignores the difference entirely; and a factor of three overstates it considerably.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'intermediate',
    topic: 'Copper and aluminium',
    reference: 'Module 3, Section 3 — Two metals do the work',
  },
  {
    id: 119,
    question:
      'You find damaged insulation on fixed wiring during an inspection. What is the minimum classification, and what is the remedy?',
    options: [
      'C3, and note it as an improvement recommendation',
      'C2, and the cable is replaced or a proper joint is fitted — tape is not a repair',
      'C2, and the damaged section is wrapped in self-amalgamating tape',
      'FI, because the extent of the damage cannot be established without further work',
    ],
    correctAnswer: 1,
    explanation:
      'Damaged insulation on fixed wiring is a C2 minimum, and the remedy is replacement or a proper joint — tape, of any kind, is not a repair. Coding it C3 treats a potentially dangerous defect as a recommendation. Further investigation may be justified in some cases, but a visible defect you can already classify does not need an FI to avoid the decision.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'intermediate',
    topic: 'Damaged insulation',
    reference: 'Module 3, Section 3 — Two metals do the work',
  },
  {
    id: 120,
    question:
      'Two dissimilar metals in contact, with moisture present, produce an unwanted cell. What is this called and how is it controlled?',
    options: [
      'Electrolysis, controlled by earthing both metals to the same terminal',
      'Galvanic corrosion, controlled by bimetallic connectors and inhibitor paste',
      'Electrolytic plating, controlled by keeping the joint dry',
      'Dielectric breakdown, controlled by increasing the separation between the metals',
    ],
    correctAnswer: 1,
    explanation:
      'Dissimilar metals plus an electrolyte plus electrical contact is a cell, and the corrosion it drives is galvanic — controlled at every dissimilar-metal joint with a bimetallic connector and inhibitor paste. Electrolysis is the deliberate version, pushing d.c. into an electrolyte to plate or refine. Bonding the two together does not remove the potential difference between the metals, and dielectric breakdown is a failure of insulation, not of metals.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'advanced',
    topic: 'Galvanic corrosion',
    reference: 'Module 3, Section 3 — Cells and electrolysis',
  },
  {
    id: 121,
    question:
      'Why does a lead-acid battery room require ventilation?',
    options: [
      'To remove heat, because charging raises the electrolyte temperature',
      'To disperse acid mist, which is corrosive to the surrounding structure',
      'To disperse hydrogen, which is explosive above about 4 per cent in air',
      'To prevent condensation forming on the terminals and causing tracking',
    ],
    correctAnswer: 2,
    explanation:
      'Charging gives off hydrogen, and hydrogen is explosive above roughly 4 per cent in air — that is the reason for the ventilation requirement, and it is why ignition sources are controlled in battery rooms. Heat, acid mist and condensation are all real considerations in the design of a battery installation, and none of them is the hazard the ventilation exists to address.',
    section: 'Electron theory, conductors and resistance',
    difficulty: 'intermediate',
    topic: 'Battery installations',
    reference: 'Module 3, Section 3 — Cells and electrolysis',
  },

  // ── Section 4 · Series and parallel d.c. circuits ────────────────────────
  {
    id: 122,
    question:
      'Resistors of 4 Ω, 6 Ω and 10 Ω are connected in series across 230 V. What current flows?',
    options: [
      '2.09 A',
      '11.5 A',
      '57.5 A',
      '115 A',
    ],
    correctAnswer: 1,
    explanation:
      'In series the resistances simply add: 4 + 6 + 10 = 20 Ω, so I = 230 ÷ 20 = 11.5 A, and that same current flows at every point in the chain. 2.09 A comes from combining the resistors as if they were in parallel, 57.5 A uses only the 4 Ω resistor, and 115 A uses 2 Ω.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'intermediate',
    topic: 'Series resistance',
    reference: 'Module 3, Section 4 — Series = one path',
  },
  {
    id: 123,
    question:
      'In that same series circuit — 4 Ω, 6 Ω and 10 Ω across 230 V — what voltage appears across the 6 Ω resistor?',
    options: [
      '46 V',
      '69 V',
      '115 V',
      '230 V',
    ],
    correctAnswer: 1,
    explanation:
      'The voltage divider gives V = 230 × 6 ÷ 20 = 69 V, and the three drops of 46 V, 69 V and 115 V add back to the 230 V supply, as Kirchhoff’s voltage law requires. 46 V is the drop across the 4 Ω resistor and 115 V the drop across the 10 Ω — both correct answers to a different part of the same circuit. The full 230 V would only appear across one component if it were the only one there.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'intermediate',
    topic: 'Voltage divider',
    reference: 'Module 3, Section 4 — Voltage divider rule',
  },
  {
    id: 124,
    question: 'Resistors of 6 Ω, 12 Ω and 4 Ω are connected in parallel. What is the total resistance?',
    options: [
      '2 Ω',
      '3.4 Ω',
      '5.5 Ω',
      '22 Ω',
    ],
    correctAnswer: 0,
    explanation:
      '1 ÷ Rt = 1/6 + 1/12 + 1/4 = 2/12 + 1/12 + 3/12 = 6/12, so Rt = 2 Ω. The instant sanity check is that a parallel total is always less than the smallest branch — 2 Ω is below 4 Ω, so it passes; 3.4 Ω and 5.5 Ω both fail it; and 22 Ω is the series total, which is what you get by adding them.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'intermediate',
    topic: 'Parallel resistance',
    reference: 'Module 3, Section 4 — Parallel circuits',
  },
  {
    id: 125,
    question: 'Two resistors of 4 Ω and 12 Ω are in parallel. Using product over sum, the total is:',
    options: [
      '16 Ω',
      '8 Ω',
      '3 Ω',
      '0.33 Ω',
    ],
    correctAnswer: 2,
    explanation:
      '(4 × 12) ÷ (4 + 12) = 48 ÷ 16 = 3 Ω, which is duly less than the smaller branch. 16 Ω is the sum — the series answer. 8 Ω is the average of the two, which is a tempting shortcut and is only ever right when the two resistors are equal. 0.33 Ω is the reciprocal left un-inverted at the end.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'basic',
    topic: 'Product over sum',
    reference: 'Module 3, Section 4 — Parallel circuits',
  },
  {
    id: 126,
    question:
      'Which sanity check correctly describes a combined resistance?',
    options: [
      'A parallel total is always more than the largest branch; a series total is always less than the smallest',
      'A parallel total is always less than the smallest branch; a series total is always more than the largest',
      'Both totals always fall between the largest and the smallest value present',
      'Both totals always equal the average of the values present',
    ],
    correctAnswer: 1,
    explanation:
      'Adding a parallel branch gives the current another path, so the total falls below even the smallest branch; adding a series resistor adds opposition, so the total exceeds the largest. Putting the parallel total above the largest branch and the series total below the smallest reverses both. Falling between the two values is true of neither, and the average is only ever right by coincidence.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'basic',
    topic: 'Sanity checks',
    reference: 'Module 3, Section 4 — Series and parallel',
  },
  {
    id: 127,
    question:
      'A 24 V supply feeds a 1 kΩ and a 3 kΩ resistor in series. What voltage appears across the 3 kΩ resistor?',
    options: [
      '6 V',
      '12 V',
      '18 V',
      '24 V',
    ],
    correctAnswer: 2,
    explanation:
      'V = 24 × 3000 ÷ 4000 = 18 V — the larger resistance takes the larger share. 6 V is the drop across the 1 kΩ resistor, which is the other half of the same answer. 12 V would be the split if the resistors were equal, and the full 24 V would require the other resistor to be zero.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'intermediate',
    topic: 'Voltage divider',
    reference: 'Module 3, Section 4 — Voltage divider rule',
  },
  {
    id: 128,
    question:
      'Why is nearly every UK final circuit wired in parallel rather than in series?',
    options: [
      'Because parallel wiring uses less cable for the same number of outlets',
      'Because each load sees the full supply voltage and one open circuit does not affect the others',
      'Because parallel circuits draw less total current than the equivalent series arrangement',
      'Because parallel wiring gives a lower total resistance, which reduces voltage drop at the origin',
    ],
    correctAnswer: 1,
    explanation:
      'Every branch sits across the full supply voltage, and a failure in one branch leaves the rest working — in series, one open circuit kills everything past it. Parallel wiring generally uses more cable, not less. It draws more total current, because each branch adds to the total. And the lower combined resistance increases the current drawn, which makes volt drop worse rather than better.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'intermediate',
    topic: 'Why final circuits are parallel',
    reference: 'Module 3, Section 4 — Parallel circuits',
  },
  {
    id: 129,
    question:
      'In a series circuit, which resistor dissipates the most power, and why?',
    options: [
      'The largest, because the current is the same everywhere and P = I²R',
      'The smallest, because P = V² ÷ R and the voltage is common',
      'They all dissipate equally, because the current is the same in each',
      'It depends on the supply voltage rather than on the resistance values',
    ],
    correctAnswer: 0,
    explanation:
      'In series the current is common, so P = I²R makes power proportional to resistance and the largest resistor takes the most. The smallest-takes-most rule is the parallel case, where the voltage is common and P = V² ÷ R applies — right reasoning, wrong circuit. Equal current does not mean equal power, because the resistances differ.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'advanced',
    topic: 'Power distribution in circuits',
    reference: 'Module 3, Section 4 — P = V × I, P = I²R, P = V²/R',
  },
  {
    id: 130,
    question:
      'Everything beyond a particular junction box on a lighting circuit is dead, and everything before it works. What does this tell you?',
    options: [
      'There is a short circuit between line and neutral at that point',
      'There is an open circuit at that point — series behaviour, so the break is where the dead section starts',
      'The circuit is overloaded and the protective device has operated',
      'There is a high-resistance connection somewhere on the working section',
    ],
    correctAnswer: 1,
    explanation:
      'One open circuit kills everything downstream of it in a series path, so the boundary between working and dead is where the break is — that is the single most useful diagnostic in fault finding. A short circuit would operate the protective device and kill the whole circuit. An overload would do the same. And a high-resistance joint on the working section would cause dim or intermittent operation, not a clean dead section beyond one point.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'intermediate',
    topic: 'Using series behaviour to locate a fault',
    reference: 'Module 3, Section 4 — Series = one path',
  },
  {
    id: 131,
    question:
      'A 25 m run of 2.5 mm² twin and earth carries 20 A. Using the tabulated 18 mV/A/m, what is the voltage drop?',
    options: [
      '4.5 V',
      '9.0 V',
      '18 V',
      '900 V',
    ],
    correctAnswer: 1,
    explanation:
      'Vd = (mV/A/m × I × L) ÷ 1000 = (18 × 20 × 25) ÷ 1000 = 9.0 V, which is inside the 11.5 V allowed for a 5 per cent final circuit but outside the 6.9 V allowed for lighting. Using half the length gives 4.5 V, omitting the current gives 18 V, and forgetting to divide by 1000 gives 900 V — a figure that should be rejected on sight, since it exceeds the supply.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'advanced',
    topic: 'Voltage drop calculation',
    reference: 'BS 7671 Appendix 4 — 2.5 mm² twin and earth, 18 mV/A/m',
  },
  {
    id: 132,
    question:
      'What are the BS 7671 voltage drop limits from the origin to the load terminals, for a public supply?',
    options: [
      '3% for lighting and 5% for other final circuits',
      '5% for lighting and 3% for other final circuits',
      '3% for all final circuits regardless of type',
      '5% for all final circuits regardless of type',
    ],
    correctAnswer: 0,
    explanation:
      '3 per cent for lighting and 5 per cent for other uses — lighting is tighter because a small drop in voltage is visible as reduced output. Reversing the two is the common slip. A single figure for everything loses the distinction, and note that on a sub-main plus final circuit both drops count against the same budget, so the design is done from the origin.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'intermediate',
    topic: 'Voltage drop limits',
    reference: 'BS 7671 Appendix 4, Table 4Ab',
  },
  {
    id: 133,
    question:
      'A circuit is found with a broken circuit protective conductor, but the lights still work. Why is this dangerous?',
    options: [
      'The circuit will draw more current than designed, overheating the line conductor',
      'The load is functioning but the earth fault path is gone, so automatic disconnection will not operate',
      'The neutral will carry the fault current instead, causing a shock risk at the neutral bar',
      'The insulation resistance will fall below 1 MΩ and the circuit will trip on the next test',
    ],
    correctAnswer: 1,
    explanation:
      'A broken CPC is a hidden series fault: nothing looks wrong because the load current path is intact, but the protective conductor no longer provides the low-impedance path a fault needs, so automatic disconnection cannot work. The load current is unchanged, so no extra heating occurs. The neutral does not become the fault path, and insulation resistance is a separate measurement that a broken CPC does not directly affect.',
    section: 'Series and parallel d.c. circuits',
    difficulty: 'advanced',
    topic: 'Broken protective conductors',
    reference: 'BS 7671 Section 543 — protective conductors',
  },

  // ── Section 5 · Magnetism, a.c. generation and distribution ──────────────
  {
    id: 134,
    question: 'What happens if you cut a bar magnet in half?',
    options: [
      'You get one north pole and one south pole, separated',
      'You get two smaller magnets, each with a north and a south pole',
      'You get two unmagnetised pieces, because the field is destroyed',
      'You get two magnets of half the original field strength and a single pole each',
    ],
    correctAnswer: 1,
    explanation:
      'Every magnet has exactly two poles, and cutting one gives two smaller complete magnets. An isolated single pole has never been observed, which rules out both options that produce one. Cutting does not destroy the field either — the alignment of the material is what produces it, and that is unchanged by where you cut.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'basic',
    topic: 'Magnetic poles',
    reference: 'Module 3, Section 5 — Magnetism',
  },
  {
    id: 135,
    question: 'Which of these materials responds strongly to a magnet?',
    options: [
      'Copper',
      'Aluminium',
      'Steel',
      'Brass',
    ],
    correctAnswer: 2,
    explanation:
      'Only ferromagnetic materials — iron, nickel, cobalt and most steels — respond strongly. Copper, aluminium and brass are excellent conductors and magnetically deaf, which surprises people who assume a good conductor must also be magnetic. That is also why a steel enclosure affects the magnetic field around a cable in a way an aluminium one does not.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'basic',
    topic: 'Ferromagnetic materials',
    reference: 'Module 3, Section 5 — Magnetism',
  },
  {
    id: 136,
    question:
      'A core of cross-sectional area 50 cm² carries a flux density of 1.2 T. What is the flux?',
    options: [
      '60 Wb',
      '6 Wb',
      '0.06 Wb',
      '0.006 Wb',
    ],
    correctAnswer: 3,
    explanation:
      'Φ = B × A, with the area converted to square metres: 50 cm² = 0.005 m², so Φ = 1.2 × 0.005 = 0.006 Wb, or 6 mWb. The other three answers are each one, two or three powers of ten out — every one of them comes from leaving the area in cm² or converting it only part of the way, which is where most of the marks go on this calculation.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'advanced',
    topic: 'Flux and flux density',
    reference: 'Module 3, Section 5 — Φ = B × A',
  },
  {
    id: 137,
    question:
      'A coil of 200 turns experiences a flux change of 0.02 Wb in 0.1 s. What EMF is induced?',
    options: [
      '0.4 V',
      '4 V',
      '40 V',
      '400 V',
    ],
    correctAnswer: 2,
    explanation:
      'Faraday’s law: EMF = N × ΔΦ ÷ Δt = 200 × 0.02 ÷ 0.1 = 40 V. The other answers are decimal-place errors on the same working — the usual one is treating 0.1 s as 1 s, which gives 4 V. A faster flux change or more turns gives a bigger EMF; no change gives none at all, however strong the field.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'advanced',
    topic: 'Faraday’s law',
    reference: 'Module 3, Section 5 — Electromagnetic induction',
  },
  {
    id: 138,
    question: 'What does Lenz’s law state about an induced current?',
    options: [
      'It flows in the direction that opposes the change in flux that caused it',
      'It flows in the direction that reinforces the change in flux that caused it',
      'It flows in the same direction as the conventional current in the field winding',
      'It flows only while the flux is at its maximum value',
    ],
    correctAnswer: 0,
    explanation:
      'The induced current opposes the change that caused it, which is required by conservation of energy — if it reinforced the change, the system would produce energy from nothing. That opposition is what back-EMF is. And an induced current depends on the rate of change of flux, so it is zero when the flux is at a steady maximum, not at its largest.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'intermediate',
    topic: 'Lenz’s law',
    reference: 'Module 3, Section 5 — Electromagnetic induction',
  },
  {
    id: 139,
    question:
      'Which of Fleming’s rules applies to the force on a current-carrying conductor in a magnetic field?',
    options: [
      'The right-hand rule, which gives the generator effect',
      'The left-hand rule, which gives the motor effect',
      'The right-hand grip rule, which gives the field direction around a conductor',
      'The corkscrew rule, which gives the direction of the induced EMF',
    ],
    correctAnswer: 1,
    explanation:
      'Left hand for the motor effect — the force on a current-carrying conductor in a field. Right hand is the generator effect, the induced current when a conductor moves through a field; the mnemonic is Right Generator, Left Motor. The right-hand grip rule is a different rule again, giving the field direction around a conductor, and the corkscrew rule is another form of the same grip rule.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'intermediate',
    topic: 'Fleming’s rules',
    reference: 'Module 3, Section 5 — Electromagnetic induction',
  },
  {
    id: 140,
    question:
      'In a simple single-loop generator, at what point in the rotation is the induced EMF at its maximum?',
    options: [
      'When the coil is flat in the field, where the flux through it is greatest',
      'When the coil is edge-on to the field, where the rate of flux change is greatest',
      'Twice per revolution, at 90° and 270°, where the flux is zero and unchanging',
      'Continuously, because the coil is rotating at a steady speed',
    ],
    correctAnswer: 1,
    explanation:
      'EMF depends on the rate of change of flux, not on the flux itself. Edge-on to the field, the flux through the coil is zero but it is changing fastest, so the EMF peaks there. Flat in the field the flux is greatest but momentarily unchanging, so the EMF is zero — that is the point people get backwards. A steady rotation produces a sine wave rather than a constant output.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'advanced',
    topic: 'A.C. generation',
    reference: 'Module 3, Section 5 — A spinning coil',
  },
  {
    id: 141,
    question: 'What is the peak value of a 230 V RMS sinusoidal supply?',
    options: [
      '163 V',
      '230 V',
      '325 V',
      '460 V',
    ],
    correctAnswer: 2,
    explanation:
      'V_peak = V_RMS × √2 = 230 × 1.414 = 325 V. Dividing instead of multiplying gives 163 V, and doubling gives 460 V. This matters practically: insulation, clearances and test gear are specified for the peak and the transients above it, not for the RMS value on the nameplate.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'intermediate',
    topic: 'RMS and peak',
    reference: 'Module 3, Section 5 — RMS and peak',
  },
  {
    id: 142,
    question: 'What is the periodic time of a 50 Hz supply?',
    options: [
      '2 ms',
      '20 ms',
      '50 ms',
      '200 ms',
    ],
    correctAnswer: 1,
    explanation:
      'T = 1 ÷ f = 1 ÷ 50 = 0.02 s, which is 20 ms — one of the four numbers worth committing to memory alongside 230 V, 325 V and 50 Hz. 2 ms and 200 ms are decimal-place errors, and 50 ms comes from reading the frequency figure as a time.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'basic',
    topic: 'Frequency and period',
    reference: 'Module 3, Section 5 — RMS and peak',
  },
  {
    id: 143,
    question:
      'What is the synchronous speed of a four-pole machine on a 50 Hz supply?',
    options: [
      '750 rpm',
      '1000 rpm',
      '1500 rpm',
      '3000 rpm',
    ],
    correctAnswer: 2,
    explanation:
      'n_s = (120 × f) ÷ poles = (120 × 50) ÷ 4 = 1500 rpm, and an induction motor runs 2 to 5 per cent below that in service. 3000 rpm is the two-pole figure, 1000 rpm is the six-pole figure and 750 rpm the eight-pole — each a correct answer to a different pole count, which is what makes them worth recognising.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'advanced',
    topic: 'Synchronous speed',
    reference: 'Module 3, Section 5 — Synchronous speed',
  },
  {
    id: 144,
    question:
      'When does an average-responding meter give a misleading reading, and what should be used instead?',
    options: [
      'On any a.c. measurement — a true-RMS meter should always be used on a.c.',
      'On non-sinusoidal waveforms from VFDs, LED drivers and dimmers — a true-RMS meter is needed',
      'On d.c. measurements, where the averaging circuit has no waveform to work with',
      'On very low currents, where the averaging circuit lacks resolution',
    ],
    correctAnswer: 1,
    explanation:
      'An average-responding meter is calibrated on the assumption that the waveform is a sine wave, so it reads correctly on clean mains and lies on the distorted waveforms produced by VFDs, switched-mode supplies, LED drivers, dimmers, inverters and UPS gear. On an undistorted a.c. supply it is fine, so "always" overstates it. Neither d.c. measurement nor low current is the issue.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'advanced',
    topic: 'True RMS measurement',
    reference: 'Module 3, Section 5 — RMS and peak',
  },
  {
    id: 145,
    question:
      'Why is electrical power transmitted at 400 kV rather than at distribution voltage?',
    options: [
      'Because higher voltage reduces the current, and line losses fall with the square of the current',
      'Because higher voltage reduces the resistance of the conductors',
      'Because higher voltage allows smaller transformers at each end of the line',
      'Because higher voltage permits single-phase transmission over long distances',
    ],
    correctAnswer: 0,
    explanation:
      'For a given power, raising the voltage lowers the current, and because loss is I²R the squared term makes those losses fall dramatically — at 400 kV the loss over hundreds of kilometres is around 1 per cent. The voltage does not change the conductors’ resistance. Transformers for higher voltages are larger rather than smaller. And all UK transmission is three-phase, which uses less conductor than single-phase for the same power.',
    section: 'Magnetism, a.c. generation and distribution',
    difficulty: 'intermediate',
    topic: 'Transmission voltages',
    reference: 'Module 3, Section 5 — Transmission and distribution',
  },
];

export const MODULE_3_QUESTIONS = bank('Electrical science', QUESTIONS);
