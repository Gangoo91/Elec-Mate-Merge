/**
 * Final paper — Module 4: Advanced electrical science.
 *
 * Fifty questions on the a.c. side: reactance and impedance, transformers,
 * power factor, three-phase, machines and motor control, lighting and heating,
 * and the renewable and metering material that closes the module.
 *
 * Every worked figure was calculated rather than recalled. Where a question
 * cites a regulation — 523.6.3 on harmonics and the neutral, 531.3.3 on RCD
 * types, 552.1.2 and 552.1.3 on motor circuits, 132.16 on the upstream check —
 * the citation is one the course already teaches and the text was checked.
 */

import { bank, type WelshExamQuestion } from './helpers';

const QUESTIONS: WelshExamQuestion[] = [
  // ── Section 1 · Mathematics and a.c. circuit quantities ──────────────────
  {
    id: 146,
    question: 'What is the inductive reactance of a 0.1 H inductor at 50 Hz?',
    options: [
      '0.031 Ω',
      '5 Ω',
      '31.4 Ω',
      '314 Ω',
    ],
    correctAnswer: 2,
    explanation:
      'X_L = 2πfL = 2π × 50 × 0.1 = 31.4 Ω. 314 Ω is what you get by omitting the 0.1 — it is the angular frequency ω on its own. 5 Ω comes from f × L without the 2π, and 0.031 Ω inverts the expression, which is the capacitive formula rather than the inductive one.',
    section: 'Mathematics and a.c. circuit quantities',
    difficulty: 'intermediate',
    topic: 'Inductive reactance',
    reference: 'Module 4, Section 1 — X_L = 2πfL',
  },
  {
    id: 147,
    question:
      'How do inductive and capacitive reactance each behave as frequency rises?',
    options: [
      'Both rise, because reactance is proportional to frequency',
      'Inductive reactance rises; capacitive reactance falls',
      'Inductive reactance falls; capacitive reactance rises',
      'Both fall, because higher frequency reduces the opposition to current',
    ],
    correctAnswer: 1,
    explanation:
      'X_L = 2πfL puts frequency on the top, so inductive reactance rises with it; X_C = 1 ÷ (2πfC) puts frequency on the bottom, so capacitive reactance falls. They move in opposite directions, which is what makes resonance possible when the two become equal. Both rising or both falling misses the opposing behaviour entirely, and having inductive reactance fall while capacitive reactance rises swaps the two round.',
    section: 'Mathematics and a.c. circuit quantities',
    difficulty: 'basic',
    topic: 'Reactance and frequency',
    reference: 'Module 4, Section 1 — Reactance',
  },
  {
    id: 148,
    question:
      'A circuit has 30 Ω resistance and 40 Ω net reactance. What is its impedance?',
    options: [
      '10 Ω',
      '50 Ω',
      '70 Ω',
      '1200 Ω',
    ],
    correctAnswer: 1,
    explanation:
      'Z = √(R² + X²) = √(900 + 1600) = √2500 = 50 Ω. Resistance and reactance combine by Pythagoras because they are 90° apart, so simply adding them to get 70 Ω overstates the impedance, subtracting them to get 10 Ω understates it, and multiplying gives 1200 Ω.',
    section: 'Mathematics and a.c. circuit quantities',
    difficulty: 'intermediate',
    topic: 'Impedance',
    reference: 'Module 4, Section 1 — Z = √(R² + X²)',
  },
  {
    id: 149,
    question:
      'For that same circuit — 30 Ω resistance, 40 Ω reactance, 50 Ω impedance — what is the power factor?',
    options: [
      '0.6 lagging',
      '0.8 lagging',
      '0.75 lagging',
      '1.33 lagging',
    ],
    correctAnswer: 0,
    explanation:
      'Power factor is cos φ, and for this circuit cos φ = R ÷ Z = 30 ÷ 50 = 0.6. 0.8 is X ÷ Z, which is sin φ rather than cos φ — the most convincing wrong answer here. 0.75 is X ÷ R, which is tan φ. And 1.33 inverts that; a power factor above 1 is impossible and should be rejected on sight.',
    section: 'Mathematics and a.c. circuit quantities',
    difficulty: 'advanced',
    topic: 'Power factor from impedance',
    reference: 'Module 4, Section 1 — Phase angle and power factor',
  },
  {
    id: 150,
    question:
      'In a purely inductive circuit, what is the phase relationship between voltage and current?',
    options: [
      'Current leads voltage by 90°',
      'Voltage leads current by 90°',
      'Voltage and current are in phase',
      'Voltage leads current by 180°',
    ],
    correctAnswer: 1,
    explanation:
      'ELI in the inductor: E, the voltage, leads I, the current, by 90°. Current leading voltage is the capacitive case, ICE, and is the classic mix-up. In phase is the purely resistive case, and a 180° relationship would mean the current reverses, which is not what reactance does.',
    section: 'Mathematics and a.c. circuit quantities',
    difficulty: 'basic',
    topic: 'Phase relationships',
    reference: 'Module 4, Section 1 — ELI and ICE',
  },
  {
    id: 151,
    question:
      'A series circuit reaches resonance. What is true at that point?',
    options: [
      'X_L and X_C add, so the impedance is at its maximum',
      'X_L and X_C cancel, so the impedance is the resistance alone',
      'The power factor falls to zero because the reactances are equal',
      'The current falls to zero because the two reactances oppose one another',
    ],
    correctAnswer: 1,
    explanation:
      'At resonance X_L equals X_C and they cancel, leaving the resistance alone — so in a series circuit the impedance is at its minimum and the current at its maximum. The power factor becomes unity rather than zero, because the circuit now looks purely resistive. That is also why power factor correction banks need detuning reactors: an undetuned bank can resonate with supply harmonics.',
    section: 'Mathematics and a.c. circuit quantities',
    difficulty: 'advanced',
    topic: 'Resonance',
    reference: 'Module 4, Section 1 — Resonance',
  },
  {
    id: 152,
    question:
      'What is the peak-to-peak value of the UK 230 V RMS supply?',
    options: [
      '325 V',
      '460 V',
      '650 V',
      '230 V',
    ],
    correctAnswer: 2,
    explanation:
      '325 V is the peak, so peak to peak — the full swing from the negative peak to the positive one — is twice that, 650 V. Giving 325 V answers the peak question. 460 V is twice the RMS value, which is not a quantity the waveform has. And the RMS figure itself is what the question started from.',
    section: 'Mathematics and a.c. circuit quantities',
    difficulty: 'basic',
    topic: 'Sinusoidal values',
    reference: 'Module 4, Section 1 — One cycle, four key values',
  },
  {
    id: 153,
    question: 'Why is the RMS value the one quoted on every nameplate?',
    options: [
      'Because it is the average value of the waveform over a full cycle',
      'Because it is the d.c. equivalent that produces the same heating effect',
      'Because it is the value a moving-coil instrument naturally reads',
      'Because it is the highest value the waveform reaches, so it is the safe design figure',
    ],
    correctAnswer: 1,
    explanation:
      'RMS is defined as the d.c. value that would produce the same heating, which is exactly what a rating needs to describe. The average over a full cycle of a sine wave is zero, and the half-cycle average is 0.637 of peak — a different quantity again. The highest value reached is the peak, which matters for insulation and clearances rather than for ratings.',
    section: 'Mathematics and a.c. circuit quantities',
    difficulty: 'intermediate',
    topic: 'Why RMS',
    reference: 'Module 4, Section 1 — One cycle, four key values',
  },
  {
    id: 154,
    question:
      'Which quantity should cable and protective devices be sized against for a motor circuit?',
    options: [
      'The input current, taken from the supply',
      'The output power on the motor nameplate, converted to current',
      'The starting current, which is five to seven times full load',
      'The locked-rotor current stated in the manufacturer’s data',
    ],
    correctAnswer: 0,
    explanation:
      'Always size for the input current the motor actually draws from the supply. The nameplate states mechanical output, so converting it directly to current ignores the efficiency and the power factor and gives a figure that is too low. Starting and locked-rotor currents matter for selecting the device characteristic and the starting method, but the cable is sized for the continuous input current.',
    section: 'Mathematics and a.c. circuit quantities',
    difficulty: 'advanced',
    topic: 'Sizing for input current',
    reference: 'Module 4, Section 1 — Power and efficiency',
  },
  {
    id: 155,
    question:
      'Which expression gives the real power of a balanced three-phase load?',
    options: [
      'P = V_L × I_L × cos φ',
      'P = √3 × V_L × I_L × cos φ',
      'P = 3 × V_L × I_L × cos φ',
      'P = √3 × V_L × I_L',
    ],
    correctAnswer: 1,
    explanation:
      'P = √3 × V_L × I_L × cos φ. Dropping the √3 gives the single-phase expression. Using 3 rather than √3 overstates the power by a factor of 1.73 — the √3 is there because line and phase quantities differ. And dropping cos φ altogether gives the apparent power S in volt-amperes, which is what the cable carries rather than what the meter charges for.',
    section: 'Mathematics and a.c. circuit quantities',
    difficulty: 'basic',
    topic: 'Three-phase power',
    reference: 'Module 4, Section 2 — Three-phase relationships',
  },

  // ── Section 2 · Transformers, power factor and three-phase systems ───────
  {
    id: 156,
    question:
      'In a star-connected system, what is the relationship between line and phase quantities?',
    options: [
      'V_line = √3 × V_phase, and I_line = I_phase',
      'V_line = V_phase, and I_line = √3 × I_phase',
      'V_line = √3 × V_phase, and I_line = √3 × I_phase',
      'V_line = V_phase ÷ √3, and I_line = I_phase',
    ],
    correctAnswer: 0,
    explanation:
      'In star the line voltage is √3 times the phase voltage — which is where 400 V and 230 V come from — while the line current is the phase current, because each line connects to one winding. Equal voltages with currents differing by √3 is the delta relationship. The √3 never applies to both quantities at once, and dividing rather than multiplying gives a line voltage below the phase voltage.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'basic',
    topic: 'Star and delta',
    reference: 'Module 4, Section 2 — Star and delta relationships',
  },
  {
    id: 157,
    question:
      'A balanced three-phase load draws 20 A per line at 400 V with a power factor of 0.85. What is the real power?',
    options: [
      '6.8 kW',
      '8.0 kW',
      '11.8 kW',
      '13.9 kW',
    ],
    correctAnswer: 2,
    explanation:
      'P = √3 × 400 × 20 × 0.85 = 11.8 kW. 13.9 kVA is the apparent power, which is the same calculation without the power factor — the figure the cable and the transformer have to carry. 6.8 kW omits the √3, and 8.0 kW comes from using the power factor twice over.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'advanced',
    topic: 'Three-phase power calculation',
    reference: 'Module 4, Section 2 — Three-phase relationships',
  },
  {
    id: 158,
    question:
      'In a balanced star-connected system, what current does the neutral carry?',
    options: [
      'One third of the total line current',
      'Nothing — the three line currents sum to zero at every instant',
      'The same as each line current, because it is the common return',
      'The vector sum of the three, which is always √3 times one line current',
    ],
    correctAnswer: 1,
    explanation:
      'Three equal currents 120° apart sum to zero at every instant, not merely on average, so a balanced neutral carries nothing. Where the load is unbalanced the neutral carries the vector sum of the three, and the sizing case is one phase loaded with two empty — then the neutral carries the whole of that line current. A third of the total and a fixed √3 relationship are both invented.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'intermediate',
    topic: 'Neutral current',
    reference: 'Module 4, Section 2 — Balanced and unbalanced loads',
  },
  {
    id: 159,
    question:
      'Why can the neutral of a three-phase circuit carry substantial current even when the fundamental loads are balanced?',
    options: [
      'Because the power factor of each phase differs slightly in practice',
      'Because triplen harmonics are in phase across all three lines and add in the neutral',
      'Because the neutral is also the protective conductor in a TN-C-S system',
      'Because the supply voltages are never exactly 120° apart',
    ],
    correctAnswer: 1,
    explanation:
      'Third, ninth and fifteenth harmonics are in phase with each other across all three lines, so instead of cancelling in the neutral they add — and with heavily non-linear loads the neutral current can exceed the line current. Slight power factor differences and small phase-angle errors produce minor imbalance, not this effect. And in a TN-C-S installation the neutral and protective functions are separated after the origin.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'advanced',
    topic: 'Triplen harmonics',
    reference: 'Module 4, Section 2 — Harmonics in the neutral',
  },
  {
    id: 160,
    question:
      'BS 7671 Regulation 523.6.3 addresses neutral conductor sizing where third harmonic content is significant. At what level of third harmonic must the neutral be sized for the full line current?',
    options: [
      'More than 10 per cent',
      'More than 15 per cent',
      'More than 33 per cent',
      'More than 50 per cent',
    ],
    correctAnswer: 2,
    explanation:
      'Above 33 per cent the neutral is sized for the full line current. Above 15 per cent the neutral must be at least equal to the line conductor — the two thresholds are easy to transpose, and 15 per cent is the first trigger rather than the second. 10 per cent and 50 per cent are not thresholds in this regulation.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'advanced',
    topic: 'Neutral sizing for harmonics',
    reference: 'BS 7671 Regulation 523.6.3',
  },
  {
    id: 161,
    question:
      'A transformer has 2300 primary turns and 200 secondary turns. Fed at 230 V, what is the secondary voltage?',
    options: [
      '11.5 V',
      '20 V',
      '23 V',
      '2645 V',
    ],
    correctAnswer: 1,
    explanation:
      'V1 ÷ V2 = N1 ÷ N2, so V2 = 230 × 200 ÷ 2300 = 20 V. 23 V assumes a neat 10:1 ratio rather than the 11.5:1 the turns actually give. 11.5 V is the ratio itself mistaken for a voltage, and 2645 V inverts the ratio, stepping up instead of down.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'basic',
    topic: 'Turns ratio',
    reference: 'Module 4, Section 2 — Transformers',
  },
  {
    id: 162,
    question:
      'An ideal transformer supplies 10 A at 23 V from a 230 V primary. What is the primary current?',
    options: [
      '1 A',
      '10 A',
      '100 A',
      '0.1 A',
    ],
    correctAnswer: 0,
    explanation:
      'Apparent power is conserved in an ideal transformer: V1 × I1 = V2 × I2, so I1 = (23 × 10) ÷ 230 = 1 A. The current ratio is the inverse of the voltage ratio, so stepping the voltage down by ten steps the current up by ten on the secondary side — 100 A applies that the wrong way round, and 0.1 A applies it twice.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'intermediate',
    topic: 'Transformer current ratio',
    reference: 'Module 4, Section 2 — Transformers',
  },
  {
    id: 163,
    question:
      'Which transformer test determines the iron loss, and how does that loss behave with load?',
    options: [
      'The short-circuit test, and the loss varies with the square of the load',
      'The no-load test, and the loss is essentially constant with load',
      'The no-load test, and the loss varies with the square of the load',
      'The short-circuit test, and the loss is essentially constant with load',
    ],
    correctAnswer: 1,
    explanation:
      'The no-load test gives the iron loss — hysteresis and eddy currents in the core — which is present whenever the transformer is energised and barely changes with load. The short-circuit test gives the copper loss, which is I²R and therefore varies with the square of the load. Maximum efficiency occurs where the two are equal, which is why the distinction matters.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'advanced',
    topic: 'Transformer losses',
    reference: 'Module 4, Section 2 — Transformer losses and efficiency',
  },
  {
    id: 164,
    question:
      'What distinguishes an auto-transformer from an isolation transformer?',
    options: [
      'An auto-transformer has three terminals on one winding; an isolation transformer has separate windings',
      'An auto-transformer can only step down, whereas an isolation transformer can do both',
      'An auto-transformer has a laminated core, whereas an isolation transformer has a solid one',
      'An auto-transformer is used at high voltage only, whereas an isolation transformer is an LV device',
    ],
    correctAnswer: 0,
    explanation:
      'An auto-transformer taps a single winding, so primary and secondary share a conductor and there is no electrical separation — which is the whole safety point of an isolation transformer with its two separate windings. An auto-transformer can step up as well as down. Both types use laminated cores, and both are found across the voltage range.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'intermediate',
    topic: 'Transformer types',
    reference: 'Module 4, Section 2 — Transformer applications',
  },
  {
    id: 165,
    question:
      'Why must a current transformer secondary never be open-circuited while the primary is energised?',
    options: [
      'Because the secondary current would fall to zero and the protection would fail to operate',
      'Because a dangerously high voltage develops across the open secondary terminals',
      'Because the primary current would rise sharply and overload the circuit',
      'Because the core would demagnetise and the CT would need recalibrating',
    ],
    correctAnswer: 1,
    explanation:
      'A CT is a current source: with no path for the secondary current the core saturates and a dangerously high voltage appears across the open terminals, which is why the secondary is shorted before a meter or relay is disconnected. Loss of the protection signal is a real consequence but it is not the hazard. The primary current is set by the load and is unaffected, and saturation is the opposite of demagnetisation.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'advanced',
    topic: 'Current transformers',
    reference: 'Module 4, Section 2 — Instrument transformers',
  },
  {
    id: 166,
    question:
      'Real, reactive and apparent power are related by the power triangle. Which expression is correct?',
    options: [
      'S = P + Q, because the two components add arithmetically',
      'S² = P² + Q², with power factor = P ÷ S',
      'P² = S² + Q², with power factor = S ÷ P',
      'Q² = P² + S², with power factor = Q ÷ P',
    ],
    correctAnswer: 1,
    explanation:
      'Apparent power is the hypotenuse: S² = P² + Q², and the power factor is cos φ = P ÷ S. Adding P and Q arithmetically ignores that they are 90° apart. The other two rearrangements put the hypotenuse in the wrong place, which would make the real or reactive power exceed the apparent power — impossible. Note that when summing mixed loads you add the P values and the Q values separately, then take Pythagoras.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'intermediate',
    topic: 'The power triangle',
    reference: 'Module 4, Section 2 — Real, reactive and apparent power',
  },
  {
    id: 167,
    question:
      'A 50 kW load runs at a power factor of 0.7 lagging and is to be corrected to 0.95 lagging. Roughly what reactive power must the capacitor bank supply?',
    options: [
      '12.5 kVAr',
      '25 kVAr',
      '35 kVAr',
      '50 kVAr',
    ],
    correctAnswer: 2,
    explanation:
      'Q_C = P × (tan φ₁ − tan φ₂). At 0.7 the angle is 45.6° and tan φ is 1.02; at 0.95 it is 18.2° and tan φ is 0.33. So Q_C = 50 × (1.02 − 0.33) ≈ 35 kVAr. 25 kVAr comes from using half the load, 50 kVAr from correcting all the way to unity, and 12.5 kVAr from taking a quarter — a bank sized on any of those leaves the correction short or overshoots into a leading power factor.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'advanced',
    topic: 'Sizing power factor correction',
    reference: 'Module 4, Section 2 — Power factor correction',
  },
  {
    id: 168,
    question:
      'What is the consequence of over-correcting the power factor?',
    options: [
      'The load current rises and the supply cable overheats',
      'A leading power factor, with voltage rise, capacitor stress and possible controller resonance',
      'The real power drawn increases while the apparent power stays the same',
      'The reactive power becomes negative, which the meter records as export',
    ],
    correctAnswer: 1,
    explanation:
      'Pushing past unity gives a leading power factor, and the consequences are voltage rise on the installation, stress on the capacitors and hunting or resonance at the controller. The point of correction is to reduce line current, so it does not rise. Real power is set by the load and does not change. And a leading power factor is not the same thing as exporting energy.',
    section: 'Transformers, power factor and three-phase systems',
    difficulty: 'advanced',
    topic: 'Over-correction',
    reference: 'Module 4, Section 2 — Power factor correction',
  },

  // ── Section 3 · Electrical machines, motors and motor control ────────────
  {
    id: 169,
    question:
      'A four-pole induction motor on a 50 Hz supply runs at 1440 rpm. What is the slip?',
    options: [
      '2 per cent',
      '4 per cent',
      '6 per cent',
      '96 per cent',
    ],
    correctAnswer: 1,
    explanation:
      'Synchronous speed is 120 × 50 ÷ 4 = 1500 rpm, so slip = (1500 − 1440) ÷ 1500 = 0.04, or 4 per cent — squarely in the 2 to 5 per cent typical range. 96 per cent is the running speed as a fraction of synchronous, which is the same calculation left un-subtracted. Without slip there is no rotor EMF and therefore no torque.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'intermediate',
    topic: 'Slip',
    reference: 'Module 4, Section 3 — Induction motors',
  },
  {
    id: 170,
    question:
      'Why does a single-phase supply need a starting arrangement that a three-phase supply does not?',
    options: [
      'Because single-phase current is lower, so the starting torque is insufficient',
      'Because a single sine wave produces a pulsating field rather than a rotating one',
      'Because single-phase motors have no rotor conductors to induce current in',
      'Because the single-phase supply frequency is too low to establish a field',
    ],
    correctAnswer: 1,
    explanation:
      'One sine wave gives a field that pulses back and forth along one axis rather than rotating, so there is nothing for the rotor to chase — hence the capacitor, the shading ring or the commutator. Three phases 120° apart produce a genuinely rotating field with no trick required. The current magnitude is not the issue, single-phase induction motors do have rotor conductors, and 50 Hz is perfectly adequate to establish a field.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'basic',
    topic: 'Single-phase starting',
    reference: 'Module 4, Section 3 — One sine wave does not rotate',
  },
  {
    id: 171,
    question:
      'A domestic extract fan uses the cheapest motor type available. Which is it, and what is the penalty?',
    options: [
      'Capacitor-start, at around 70 per cent efficiency, with a centrifugal switch that wears',
      'Permanent split capacitor, at around 75 per cent efficiency, with low starting torque',
      'Shaded-pole, at 15 to 35 per cent efficiency, with poor power factor and no electrical reversal',
      'Universal, at high power-to-weight, with brush wear and radio interference',
    ],
    correctAnswer: 2,
    explanation:
      'Shaded-pole is the cheapest machine there is, and the price is efficiency between 15 and 35 per cent, roughly half-rated starting torque, poor power factor and no way to reverse it electrically. Capacitor-start suits compressors and pumps where real starting torque is needed; permanent split capacitor is the better fan motor; and universal motors belong in hand tools.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'intermediate',
    topic: 'Single-phase motor types',
    reference: 'Module 4, Section 3 — Single-phase motor families',
  },
  {
    id: 172,
    question:
      'A three-phase motor is started direct on line. What starting current should be expected?',
    options: [
      'Roughly the same as full-load current, because the motor is unloaded at start',
      'Around twice full-load current',
      'Five to seven times full-load current',
      'Around twenty times full-load current',
    ],
    correctAnswer: 2,
    explanation:
      'Five to seven times full-load current, which is why a Type C device is the minimum for DOL starting and Type D is used for high-inertia loads. Comparable or double full-load current would not trip anything and misses the whole reason soft starters and drives exist. Twenty times is beyond what an induction motor draws and is closer to a transformer inrush figure.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'basic',
    topic: 'Direct-on-line starting',
    reference: 'Module 4, Section 3 — Starting methods',
  },
  {
    id: 173,
    question:
      'Place these starting methods in order of decreasing starting current.',
    options: [
      'VFD, soft-start, star-delta, direct on line',
      'Direct on line, star-delta, soft-start, VFD',
      'Star-delta, direct on line, VFD, soft-start',
      'Soft-start, VFD, direct on line, star-delta',
    ],
    correctAnswer: 1,
    explanation:
      'Direct on line draws the most, then star-delta, then a soft starter, with a variable frequency drive drawing the least — complexity and cost increase as the inrush falls. Starting from the drive reverses the sequence entirely, and the remaining orderings interleave the methods in ways that do not match how each method limits the current.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'advanced',
    topic: 'Starting methods compared',
    reference: 'Module 4, Section 3 — Starting methods',
  },
  {
    id: 174,
    question:
      'BS 7671 Regulation 531.3.3 restricts the use of Type AC RCDs. What does it say?',
    options: [
      'They shall only be used to serve fixed equipment where the load current contains no d.c. components',
      'They shall not be used in domestic premises under any circumstances',
      'They shall only be used where the rated residual operating current does not exceed 30 mA',
      'They shall only be used downstream of a Type B device providing selectivity',
    ],
    correctAnswer: 0,
    explanation:
      'Type AC is restricted to fixed equipment where it is known that the load current contains no d.c. components — which rules it out wherever electronic loads, drives and chargers are present. A blanket domestic prohibition overstates the regulation. The 30 mA figure relates to additional protection rather than to device type, and a Type AC device is not made acceptable by what sits upstream of it.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'advanced',
    topic: 'RCD types',
    reference: 'BS 7671 Regulation 531.3.3',
  },
  {
    id: 175,
    question:
      'What type of RCD is required on a circuit supplying a variable frequency drive?',
    options: [
      'Type AC, because the supply to the drive is a.c.',
      'Type A, because the drive produces pulsating d.c. leakage',
      'Type B, because the drive can produce smooth d.c. residual current',
      'No RCD is required, because the drive provides its own earth fault detection',
    ],
    correctAnswer: 2,
    explanation:
      'A drive can produce smooth d.c. residual current, which blinds Type AC and Type A devices — so Type B is required. Type A handles pulsating d.c. but not smooth d.c., which is why it is not enough here. And a drive’s internal protection is not a substitute for the installation’s residual current protection.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'advanced',
    topic: 'RCD selection for drives',
    reference: 'BS 7671 Regulation 531.3.3',
  },
  {
    id: 176,
    question:
      'BS 7671 Regulation 552.1.3 requires what of motor starter logic?',
    options: [
      'That the starter is rated for the locked-rotor current of the motor',
      'That automatic restart after a supply dip is prevented',
      'That the starter includes overload protection set to the full-load current',
      'That the starter is interlocked with the local means of isolation',
    ],
    correctAnswer: 1,
    explanation:
      'The requirement is that a motor cannot restart by itself when the supply returns after a dip or interruption — because an unexpected restart is a mechanical danger to anyone who has approached the machine. Locked-rotor rating, overload protection and isolation interlocking are all genuine motor circuit concerns dealt with elsewhere, and none of them is what this regulation addresses.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'advanced',
    topic: 'Restart prevention',
    reference: 'BS 7671 Regulation 552.1.3',
  },
  {
    id: 177,
    question:
      'Above what motor rating does BS 7671 Regulation 552.1.2 require overload protection?',
    options: [
      '0.37 kW',
      '1.0 kW',
      '3.0 kW',
      '7.5 kW',
    ],
    correctAnswer: 0,
    explanation:
      '0.37 kW, which is a low threshold — it catches almost every motor you will meet beyond the smallest fans. 7.5 kW is the rough point at which single-phase becomes unworkable and three-phase takes over, which is a genuine figure attached to a different question. 1.0 kW and 3.0 kW are round numbers rather than the regulation’s.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'advanced',
    topic: 'Motor overload protection',
    reference: 'BS 7671 Regulation 552.1.2',
  },
  {
    id: 178,
    question:
      'Why must a d.c. series motor never be run unloaded?',
    options: [
      'Because the field current falls to zero and the motor stalls',
      'Because the armature current rises without limit and the windings burn out',
      'Because with no load the speed rises without limit and the motor destroys itself',
      'Because the commutator overheats at low current and the brushes weld to it',
    ],
    correctAnswer: 2,
    explanation:
      'In a series motor the field is the armature current, so with almost no load the current falls, the flux collapses and the speed climbs until the machine tears itself apart. It is the speed, not the current, that runs away. Stalling is the opposite failure, and brush welding at low current is not a mechanism this motor has.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'advanced',
    topic: 'D.C. motor characteristics',
    reference: 'Module 4, Section 3 — D.C. motors',
  },
  {
    id: 179,
    question:
      'Which contactor utilisation category applies to normal three-phase motor switching?',
    options: [
      'AC-1',
      'AC-3',
      'AC-4',
      'AC-2',
    ],
    correctAnswer: 1,
    explanation:
      'AC-3 is the squirrel-cage motor category for starting and switching off a running motor, which is normal service. AC-4 is the harder duty — reversing and jogging, where the contacts break the starting current repeatedly. AC-1 is for essentially resistive loads and AC-2 for slip-ring motors, so both are the wrong duty for a standard cage motor.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'advanced',
    topic: 'Utilisation categories',
    reference: 'BS EN 60947-4-1',
  },
  {
    id: 180,
    question:
      'A variable speed drive is fitted to a centrifugal pump. Why does even a modest speed reduction save so much energy?',
    options: [
      'Because the motor efficiency improves substantially at reduced speed',
      'Because power varies approximately with the cube of the speed',
      'Because the drive corrects the power factor to unity at all speeds',
      'Because the drive reduces the supply voltage in proportion to the speed',
    ],
    correctAnswer: 1,
    explanation:
      'The affinity laws give power roughly proportional to the cube of speed, so running a pump at 80 per cent speed takes about half the power — which is what makes drives so worthwhile on variable-flow pumps and fans. Motor efficiency generally falls slightly at reduced speed rather than improving. A drive does hold the voltage-to-frequency ratio to keep the flux constant, but that is how it controls the motor, not where the saving comes from.',
    section: 'Electrical machines, motors and motor control',
    difficulty: 'advanced',
    topic: 'Affinity laws',
    reference: 'Module 4, Section 3 — Variable speed drives',
  },

  // ── Section 4 · Lighting, heating and electronic devices ─────────────────
  {
    id: 181,
    question:
      'Which quantity is measured in lux, and what is it?',
    options: [
      'Luminous intensity — the light emitted in a given direction',
      'Luminous flux — the total light emitted by a source',
      'Illuminance — the luminous flux falling on a square metre of surface',
      'Luminance — the brightness of a surface as seen by the eye',
    ],
    correctAnswer: 2,
    explanation:
      'Lux is illuminance, lumens per square metre — what arrives at the working plane, which is why lighting levels are specified in it. Intensity is measured in candela and describes the source in one direction; flux is measured in lumens and describes the total output. Luminance is a further quantity again, measured in candela per square metre.',
    section: 'Lighting, heating and electronic devices',
    difficulty: 'basic',
    topic: 'Lighting quantities',
    reference: 'Module 4, Section 4 — cd, lm, lx',
  },
  {
    id: 182,
    question:
      'A 1000 cd source illuminates a surface 2 m directly below it. What is the illuminance on that surface?',
    options: [
      '125 lx',
      '250 lx',
      '500 lx',
      '2000 lx',
    ],
    correctAnswer: 1,
    explanation:
      'The inverse square law gives E = I ÷ d² = 1000 ÷ 4 = 250 lx. 500 lx comes from dividing by the distance rather than its square, which is the error the law exists to correct; 2000 lx multiplies instead; and 125 lx uses a distance of about 2.8 m.',
    section: 'Lighting, heating and electronic devices',
    difficulty: 'intermediate',
    topic: 'Inverse square law',
    reference: 'Module 4, Section 4 — E = I/d²',
  },
  {
    id: 183,
    question:
      'Using the lumen method, what total luminous flux is needed for 500 lx over a 50 m² office with a utilisation factor of 0.5 and a maintenance factor of 0.8?',
    options: [
      '25 000 lm',
      '31 250 lm',
      '62 500 lm',
      '10 000 lm',
    ],
    correctAnswer: 2,
    explanation:
      'F = (E × A) ÷ (UF × MF) = (500 × 50) ÷ (0.5 × 0.8) = 25 000 ÷ 0.4 = 62 500 lm. 25 000 lm is the numerator alone, which is what you get by forgetting that the two factors reduce the light that actually reaches the plane. 31 250 lm applies only one of the two factors, and 10 000 lm multiplies by them rather than dividing.',
    section: 'Lighting, heating and electronic devices',
    difficulty: 'advanced',
    topic: 'The lumen method',
    reference: 'Module 4, Section 4 — Lumen method',
  },
  {
    id: 184,
    question:
      'What is the maintained illuminance recommended by BS EN 12464-1 for general office work?',
    options: [
      '200 lx',
      '300 lx',
      '500 lx',
      '750 lx',
    ],
    correctAnswer: 2,
    explanation:
      '500 lx for offices. 300 lx is the classroom figure and 750 lx the level for technical drawing, so both are real values attached to different tasks — which is exactly why they are worth recognising rather than guessing. Circulation areas sit far lower, around 100 lx.',
    section: 'Lighting, heating and electronic devices',
    difficulty: 'intermediate',
    topic: 'Recommended illuminance',
    reference: 'BS EN 12464-1',
  },
  {
    id: 185,
    question:
      'Which component of an LED luminaire is usually the first to fail?',
    options: [
      'The LED array, as the junctions degrade with hours of operation',
      'The driver, which does more work than the array it supplies',
      'The diffuser, which yellows and reduces output',
      'The heatsink bond, which loosens through thermal cycling',
    ],
    correctAnswer: 1,
    explanation:
      'The driver does more work than the LEDs and is generally what fails first — which is why replaceable drivers matter so much at selection, particularly where access is difficult. LED arrays depreciate gradually rather than failing outright, and diffuser yellowing and heatsink problems are real but slower and less common modes.',
    section: 'Lighting, heating and electronic devices',
    difficulty: 'intermediate',
    topic: 'LED luminaires',
    reference: 'Module 4, Section 4 — LEDs and drivers',
  },
  {
    id: 186,
    question:
      'What are the duration and illuminance requirements for emergency escape lighting?',
    options: [
      '1 hour on escape routes at 1 lux, and 3 hours in open areas at 0.5 lux',
      '3 hours on escape routes at 1 lux, and 1 hour in open areas at 0.5 lux',
      '1 hour everywhere, at 0.5 lux',
      '3 hours everywhere, at 1 lux',
    ],
    correctAnswer: 0,
    explanation:
      'One hour on escape routes at 1 lux, three hours in open areas at 0.5 lux, with the luminaire operating within 5 seconds of mains failure. Swapping the two durations is the common error. A single blanket figure for both, whichever way round, loses the distinction between getting people out of a corridor and holding an open area.',
    section: 'Lighting, heating and electronic devices',
    difficulty: 'advanced',
    topic: 'Emergency lighting',
    reference: 'Module 4, Section 4 — Emergency lighting',
  },
  {
    id: 187,
    question:
      'How much energy is needed to raise 200 litres of water from 15 °C to 60 °C, taking c as 4186 J/(kg·K)?',
    options: [
      '2.6 kWh',
      '10.5 kWh',
      '37.7 kWh',
      '104.7 kWh',
    ],
    correctAnswer: 1,
    explanation:
      'E = m × c × ΔT = 200 × 4186 × 45 = 37.67 MJ. Dividing by 3.6 MJ per kWh gives 10.5 kWh — which on a 3 kW immersion takes about 3 hours 29 minutes. 37.7 is the answer left in megajoules, which is the step most often missed. 2.6 kWh uses a 15 °C rise, and 104.7 kWh is a factor of ten out.',
    section: 'Lighting, heating and electronic devices',
    difficulty: 'advanced',
    topic: 'Water heating',
    reference: 'Module 4, Section 4 — E = mcΔT',
  },
  {
    id: 188,
    question:
      'A heat pump with a COP of 3.5 draws 3 kW of electrical input. How much heat does it deliver, and why is that not a breach of conservation of energy?',
    options: [
      '10.5 kW — it moves heat from outside rather than creating it',
      '10.5 kW — the compressor amplifies the electrical energy supplied',
      '0.86 kW — the COP is a loss factor applied to the input',
      '3 kW — the COP describes the efficiency, which cannot exceed unity',
    ],
    correctAnswer: 0,
    explanation:
      '3 × 3.5 = 10.5 kW of heat, and there is no breach because the heat pump moves existing heat from outside to inside rather than generating it — the electricity pays for the moving, not the heat. Nothing amplifies energy, so the second explanation is wrong even though the number is right. Dividing by the COP treats it as a loss, and a COP is not an efficiency capped at one.',
    section: 'Lighting, heating and electronic devices',
    difficulty: 'intermediate',
    topic: 'Heat pumps and COP',
    reference: 'Module 4, Section 4 — Heating',
  },
  {
    id: 189,
    question:
      'What current does a 10.5 kW shower draw at 230 V, and what does this represent?',
    options: [
      '32 A — the maximum for a standard radial circuit',
      '45.7 A — the practical single-phase ceiling for a domestic shower',
      '24 A — well within the capacity of a 2.5 mm² radial',
      '63 A — requiring a dedicated three-phase supply',
    ],
    correctAnswer: 1,
    explanation:
      '10 500 ÷ 230 = 45.7 A, which is why 10.5 kW is around the practical single-phase limit for a domestic shower — above it the cable, the protective device and often the supply itself become the constraint. 32 A and 24 A are the currents of smaller units, and 63 A overstates it considerably.',
    section: 'Lighting, heating and electronic devices',
    difficulty: 'intermediate',
    topic: 'Shower circuits',
    reference: 'Module 4, Section 4 — Heating',
  },
  {
    id: 190,
    question:
      'BS 7671 Section 443 and Section 534 cover surge protective devices. What does the standard require of the connecting conductors?',
    options: [
      'That they are the same cross-sectional area as the main earthing conductor',
      'That their length is kept to a minimum — preferably under 0.5 m and never above 1.0 m',
      'That they are run separately from all other conductors in the enclosure',
      'That they are protected by their own dedicated overcurrent device',
    ],
    correctAnswer: 1,
    explanation:
      'The connecting conductors must be kept as short as possible, preferably under 0.5 m and never above 1.0 m, because their inductance adds to the let-through voltage and undoes the protection. Cross-sectional area and overcurrent protection are separate design questions, and physical separation from other conductors is not the requirement — length is.',
    section: 'Lighting, heating and electronic devices',
    difficulty: 'advanced',
    topic: 'Surge protective devices',
    reference: 'BS 7671 Sections 443 and 534',
  },

  // ── Section 5 · Renewable generation, CHP and smart metering ─────────────
  {
    id: 191,
    question:
      'Under the ENA framework, what is the threshold for G98 fast-track connection of a single-phase inverter?',
    options: [
      '16 A per phase, about 3.68 kW single-phase',
      '32 A per phase, about 7.36 kW single-phase',
      '13 A per phase, about 3.0 kW single-phase',
      '25 A per phase, about 5.75 kW single-phase',
    ],
    correctAnswer: 0,
    explanation:
      '16 A per phase per inverter, which at 230 V is 3.68 kW — above that a G99 pre-application is required before connection. The other figures are plausible round numbers but none of them is the threshold, and getting it wrong means either an unnecessary application or an unauthorised connection.',
    section: 'Renewable generation, CHP and smart metering',
    difficulty: 'advanced',
    topic: 'G98 and G99',
    reference: 'ENA Engineering Recommendation G98 / G99',
  },
  {
    id: 192,
    question:
      'Why does the d.c. side of a PV installation present a separate isolation problem from the a.c. side?',
    options: [
      'Because the d.c. voltage is always higher than the a.c. voltage on the same system',
      'Because the strings stay live whenever light reaches the panels, and d.c. arcs behave differently',
      'Because d.c. isolators are not permitted, so the strings must be short-circuited instead',
      'Because the inverter isolates the d.c. side automatically when the a.c. supply is removed',
    ],
    correctAnswer: 1,
    explanation:
      'There is no way to switch the sun off: the strings are live whenever light reaches them, and a d.c. arc does not self-extinguish at a zero crossing the way an a.c. arc does — which is why only d.c.-rated isolators and meters are suitable, and why both sides are locked off. D.C. string voltages of 300 to 600 V are substantial but not automatically higher than the a.c. side. D.C. isolators are certainly permitted, and removing the a.c. supply does nothing to the d.c. side.',
    section: 'Renewable generation, CHP and smart metering',
    difficulty: 'intermediate',
    topic: 'PV isolation',
    reference: 'BS 7671 Section 712',
  },
  {
    id: 193,
    question:
      'A customer with a grid-tied PV system asks why their lights go out in a power cut. What is the reason?',
    options: [
      'The inverter shuts down under anti-islanding requirements when the grid fails',
      'The panels stop generating because the grid provides their excitation supply',
      'The DNO remotely disconnects embedded generation during an outage',
      'The system’s protective devices operate on the loss of the earth reference',
    ],
    correctAnswer: 0,
    explanation:
      'Anti-islanding under G98 and G99 requires a grid-tied inverter to disconnect when the grid goes down, so that it cannot energise a network people believe to be dead. A customer wanting backup needs a hybrid inverter or an automatic transfer switch with a battery. The panels themselves keep generating d.c., nothing is remotely disconnected, and the earth reference is not what causes it.',
    section: 'Renewable generation, CHP and smart metering',
    difficulty: 'intermediate',
    topic: 'Anti-islanding',
    reference: 'ENA G98 / G99 — anti-islanding',
  },
  {
    id: 194,
    question:
      'Who owns the meter and the meter-side tails in a domestic supply arrangement?',
    options: [
      'The distribution network operator, along with the service cable and cut-out',
      'The meter operator, appointed through the energy supplier',
      'The customer, from the cut-out onwards',
      'The energy supplier directly, as part of the retail contract',
    ],
    correctAnswer: 1,
    explanation:
      'Three owners meet in that cabinet: the DNO owns the service cable, the cut-out and the supplier earth terminal; the meter operator owns the meter and the meter-side tails; and the customer owns everything from the load side of the meter onwards. Meter work is requested through the energy supplier, who dispatches the MOP — but the supplier does not itself own the meter, and neither does the DNO.',
    section: 'Renewable generation, CHP and smart metering',
    difficulty: 'basic',
    topic: 'The supply boundary',
    reference: 'Module 4, Section 5 — Three owners in 30 cm of cable',
  },
  {
    id: 195,
    question:
      'A customer asks you to break the cut-out seal to upgrade their tails. What is the position?',
    options: [
      'Proceed — the customer owns the installation and has given consent',
      'Proceed if you hold competent person scheme registration, then notify the DNO afterwards',
      'Do not proceed — breaking the seal without DNO authority risks prosecution, and customer consent does not override that',
      'Proceed only if the seal is already damaged, since no further offence can then be committed',
    ],
    correctAnswer: 2,
    explanation:
      'The seal is a legal device and breaking it without DNO authority risks criminal prosecution and removal from scheme membership. Customer consent cannot authorise it, because the cut-out is not the customer’s equipment. Scheme registration confers no such authority either, and a seal that is already damaged is a reason to report it, not a defence for going further.',
    section: 'Renewable generation, CHP and smart metering',
    difficulty: 'intermediate',
    topic: 'The cut-out seal',
    reference: 'Module 4, Section 5 — Three owners in 30 cm of cable',
  },
];

export const MODULE_4_QUESTIONS = bank('Advanced science', QUESTIONS);
