import { FlashcardData } from './types';

export const formulaeBasic: FlashcardData[] = [
  // ── Ohm's Law ─────────────────────────────────────────────────────────
  {
    id: 'fb1',
    question: "State Ohm's Law and write the formula.",
    answer:
      "Ohm's Law states that the current flowing through a conductor is directly proportional to the voltage across it, provided the temperature remains constant. The formula is V = I × R, where V is voltage in volts, I is current in amperes, and R is resistance in ohms (Ω).",
    category: "Ohm's Law",
    difficulty: 'easy',
  },
  {
    id: 'fb2',
    question: "Transpose the Ohm's Law formula to find current (I) and resistance (R).",
    answer:
      "To find current: I = V / R. To find resistance: R = V / I. These three transpositions form the Ohm's Law triangle — cover the quantity you want to find, and the remaining two show whether to multiply or divide. Every electrician should be able to recall all three instantly.",
    category: "Ohm's Law",
    difficulty: 'easy',
  },
  {
    id: 'fb3',
    question: 'A 230 V supply is connected across a 46 Ω resistor. What current flows?',
    answer:
      "Using I = V / R: I = 230 / 46 = 5 A. This is a straightforward Ohm's Law calculation. Always ensure the units are consistent — volts, amps, and ohms — before substituting into the formula.",
    category: "Ohm's Law",
    difficulty: 'easy',
  },

  // ── Power ─────────────────────────────────────────────────────────────
  {
    id: 'fb4',
    question:
      'Give the three forms of the electrical power formula and explain when each is most useful.',
    answer:
      "P = V × I (use when you know voltage and current), P = I²R (use when you know current and resistance), and P = V²/R (use when you know voltage and resistance). All three are derived by combining the basic power equation P = V × I with Ohm's Law. They allow you to calculate power regardless of which two quantities are known.",
    category: 'Power',
    difficulty: 'easy',
  },
  {
    id: 'fb5',
    question: 'A 3 kW immersion heater is connected to a 230 V supply. What current does it draw?',
    answer:
      'Using I = P / V: I = 3000 / 230 = 13.04 A (approximately 13 A). This is derived from the power formula P = V × I, transposed for current. Knowing the current drawn helps you select the correct cable size and protective device rating.',
    category: 'Power',
    difficulty: 'medium',
  },
  {
    id: 'fb6',
    question: 'What is the formula for electrical energy, and what are its units?',
    answer:
      'E = P × t, where E is energy, P is power, and t is time. If power is in watts and time in seconds, energy is in joules (J). For practical billing purposes, energy is measured in kilowatt-hours (kWh): multiply power in kilowatts by time in hours. 1 kWh = 3,600,000 J.',
    category: 'Power',
    difficulty: 'easy',
  },
  {
    id: 'fb7',
    question:
      'A 2 kW convector heater runs for 8 hours a day for 30 days. If electricity costs 34p per kWh, what is the total running cost?',
    answer:
      'Energy = P × t = 2 kW × 8 h × 30 days = 480 kWh. Cost = 480 × £0.34 = £163.20. This type of calculation is essential for advising customers on running costs and for energy efficiency assessments.',
    category: 'Power',
    difficulty: 'medium',
  },

  // ── Resistance ────────────────────────────────────────────────────────
  {
    id: 'fb8',
    question:
      'What is the formula for calculating the resistance of a conductor from its resistivity?',
    answer:
      'R = ρL / A, where R is resistance in ohms, ρ (rho) is the resistivity of the material in ohm-metres (Ω·m), L is the length in metres, and A is the cross-sectional area in square metres. This shows that resistance increases with length and decreases with larger cross-sectional area.',
    category: 'Resistance',
    difficulty: 'medium',
  },
  {
    id: 'fb9',
    question:
      'Three resistors of 10 Ω, 20 Ω, and 30 Ω are connected in series. What is the total resistance?',
    answer:
      'For resistors in series: Rt = R1 + R2 + R3 = 10 + 20 + 30 = 60 Ω. In a series circuit, the total resistance is simply the sum of all individual resistances. The current is the same through each resistor, but the voltage divides across them proportionally.',
    category: 'Resistance',
    difficulty: 'easy',
  },
  {
    id: 'fb10',
    question:
      'Write the general formula for resistors in parallel. Calculate the total resistance of 30 Ω and 60 Ω in parallel.',
    answer:
      'The general formula is 1/Rt = 1/R1 + 1/R2 + 1/R3... For two resistors: 1/Rt = 1/30 + 1/60 = 2/60 + 1/60 = 3/60, so Rt = 60/3 = 20 Ω. In parallel circuits, the total resistance is always less than the smallest individual resistor because current has multiple paths to flow through.',
    category: 'Resistance',
    difficulty: 'medium',
  },
  {
    id: 'fb11',
    question:
      "What is the 'product over sum' shortcut for two resistors in parallel? Use it for 20 Ω and 30 Ω.",
    answer:
      'For exactly two resistors in parallel: Rt = (R1 × R2) / (R1 + R2). For 20 Ω and 30 Ω: Rt = (20 × 30) / (20 + 30) = 600 / 50 = 12 Ω. This shortcut only works for two resistors at a time — for three or more, use the reciprocal formula or apply the shortcut repeatedly in pairs.',
    category: 'Resistance',
    difficulty: 'medium',
  },

  // ── AC Theory ─────────────────────────────────────────────────────────
  {
    id: 'fb12',
    question: 'What is the relationship between frequency and period in an AC waveform?',
    answer:
      'Frequency (f) and period (T) are reciprocals: f = 1/T and T = 1/f. Frequency is measured in hertz (Hz) and period in seconds. The UK mains supply is 50 Hz, meaning 50 complete cycles per second, giving a period of 1/50 = 0.02 seconds (20 milliseconds) per cycle.',
    category: 'AC Theory',
    difficulty: 'easy',
  },
  {
    id: 'fb13',
    question:
      'What is the formula for converting peak voltage to RMS voltage? Calculate the RMS value for a 325 V peak supply.',
    answer:
      'Vrms = Vpeak / √2 (approximately Vpeak × 0.707). For 325 V peak: Vrms = 325 / √2 = 325 × 0.707 = 229.8 V ≈ 230 V. RMS (root mean square) represents the equivalent DC voltage that would produce the same heating effect. This is why the UK mains is rated at 230 V — it is the RMS value of a 325 V peak sinusoidal waveform.',
    category: 'AC Theory',
    difficulty: 'medium',
  },
  {
    id: 'fb14',
    question: 'Write the formula for inductive reactance (XL) and explain what it means.',
    answer:
      'XL = 2πfL, where f is the frequency in hertz and L is the inductance in henrys. Inductive reactance is the opposition to AC current flow caused by an inductor, measured in ohms. It increases with frequency — at higher frequencies, the inductor opposes the changing current more strongly. At DC (0 Hz), XL = 0 Ω, so an inductor behaves like a short circuit.',
    category: 'AC Theory',
    difficulty: 'hard',
  },
  {
    id: 'fb15',
    question:
      'Write the formula for capacitive reactance (XC) and explain how it differs from inductive reactance.',
    answer:
      'XC = 1 / (2πfC), where f is the frequency in hertz and C is the capacitance in farads. Unlike inductive reactance, capacitive reactance decreases as frequency increases — at higher frequencies, a capacitor passes more current. At DC (0 Hz), XC is infinite, so a capacitor blocks DC entirely. This is the opposite behaviour to an inductor.',
    category: 'AC Theory',
    difficulty: 'hard',
  },
  {
    id: 'fb16',
    question: 'What is impedance and what is its formula for a series R-L or R-C circuit?',
    answer:
      'Impedance (Z) is the total opposition to current flow in an AC circuit, combining resistance and reactance. The formula is Z = √(R² + X²), where R is resistance and X is reactance (either XL or XC), all measured in ohms. Because resistance and reactance are 90° out of phase, they combine as a right-angled triangle rather than by simple addition.',
    category: 'AC Theory',
    difficulty: 'hard',
  },

  // ── Practical Calculations ────────────────────────────────────────────
  {
    id: 'fb17',
    question: "State Kirchhoff's Current Law (KCL) and give a practical example.",
    answer:
      'KCL states that the total current entering a junction equals the total current leaving it — no charge is created or lost. For example, if a distribution board has a 32 A ring final, a 16 A lighting circuit, and a 20 A radial all energised, the total current at the main switch must equal the sum of all branch currents. This is essential for fault-finding parallel circuits.',
    category: 'Practical Calculations',
    difficulty: 'easy',
  },
  {
    id: 'fb18',
    question:
      "State Kirchhoff's Voltage Law (KVL) and explain how it applies to voltage drop in a circuit.",
    answer:
      'KVL states that the sum of all voltages around any closed loop equals zero — in other words, the supply voltage equals the sum of all voltage drops. This is directly relevant to BS 7671 voltage drop requirements: the total voltage drop from the origin to the furthest point of a circuit must not exceed the permitted limits (typically 3% for lighting, 5% for other circuits).',
    category: 'Practical Calculations',
    difficulty: 'medium',
  },
  {
    id: 'fb19',
    question: 'What is the formula for power factor? Explain the difference between kW and kVA.',
    answer:
      'Power factor = cos φ = true power (kW) / apparent power (kVA). True power (kW) is the actual useful power consumed by the load. Apparent power (kVA) is the product of voltage and current (V × I) and includes both useful power and reactive power. A power factor of 1.0 (unity) means all the power is doing useful work; anything less means the supply is carrying extra current for no useful output.',
    category: 'Practical Calculations',
    difficulty: 'hard',
  },
  {
    id: 'fb20',
    question:
      'How do you calculate conductor resistance for a voltage drop assessment? What values do you need?',
    answer:
      'Voltage drop = (mV/A/m × Ib × L) / 1000, where mV/A/m is the voltage drop per ampere per metre from the cable tables in BS 7671 Appendix 4, Ib is the design current in amperes, and L is the cable route length in metres. The result is in volts. This must be checked against the maximum permitted voltage drop for the circuit type.',
    category: 'Practical Calculations',
    difficulty: 'medium',
  },
  {
    id: 'fb21',
    question:
      'What is the formula for efficiency (η) and how is it applied to electrical equipment?',
    answer:
      'η = (output power / input power) × 100%. For example, if a motor draws 5 kW from the supply but delivers 4 kW of mechanical output, its efficiency is (4/5) × 100 = 80%. The remaining 20% is lost as heat. Efficiency calculations are important for energy assessments, motor sizing, and transformer specifications.',
    category: 'Practical Calculations',
    difficulty: 'medium',
  },
  {
    id: 'fb22',
    question: 'List the common SI prefixes used in electrical work and their multiplying factors.',
    answer:
      'Mega (M) = × 1,000,000 (e.g. MΩ for insulation resistance). Kilo (k) = × 1,000 (e.g. kW, kΩ). Milli (m) = × 0.001 (e.g. mV for voltage drop, mA for RCD ratings). Micro (μ) = × 0.000001 (e.g. μF for capacitance). Converting between prefixes is essential for substituting values into formulae correctly.',
    category: 'Practical Calculations',
    difficulty: 'easy',
  },
  {
    id: 'fb23',
    question:
      'What is the formula for earth fault loop impedance (Zs) and what does each part represent?',
    answer:
      'Zs = Ze + (R1 + R2), where Ze is the external earth fault loop impedance (from the supply transformer to the origin of the installation), R1 is the resistance of the line conductor from the origin to the furthest point, and R2 is the resistance of the circuit protective conductor (CPC) over the same route. Zs must be low enough to ensure the protective device disconnects within the required time.',
    category: 'Practical Calculations',
    difficulty: 'hard',
  },
  {
    id: 'fb24',
    question: 'What is the formula for prospective fault current (Ipf) and why is it important?',
    answer:
      'Ipf = Uo / Zs, where Uo is the nominal supply voltage (230 V for single-phase) and Zs is the earth fault loop impedance. The prospective fault current tells you the maximum current that could flow during a fault. Every protective device must have a breaking capacity equal to or greater than the prospective fault current at its location — BS 7671 Regulation 434.5.1 requires this to be verified.',
    category: 'Practical Calculations',
    difficulty: 'hard',
  },
  {
    id: 'fb25',
    question:
      'A circuit has a measured Zs of 0.92 Ω on a 230 V single-phase supply. What is the prospective earth fault current?',
    answer:
      'Using Ipf = Uo / Zs: Ipf = 230 / 0.92 = 250 A. This means up to 250 A could flow during an earth fault on this circuit. The protective device (MCB, fuse, or RCBO) must be capable of safely interrupting at least 250 A, and the disconnection time must meet BS 7671 requirements (0.4 s for socket outlets, 5 s for fixed equipment in TN systems).',
    category: 'Practical Calculations',
    difficulty: 'hard',
  },
  {
    id: 'fb26',
    question:
      'A single-phase motor draws 15 A at 230 V with a power factor of 0.85. Calculate the true power (kW) and apparent power (kVA).',
    answer:
      "Apparent power (S) = V × I = 230 × 15 = 3,450 VA = 3.45 kVA. True power (P) = S × cos φ = 3,450 × 0.85 = 2,932.5 W ≈ 2.93 kW. The difference between kVA and kW represents reactive power drawn by the motor's inductive windings. Power factor correction capacitors can be fitted to bring the power factor closer to unity, reducing wasted current.",
    category: 'Practical Calculations',
    difficulty: 'hard',
  },
  {
    id: 'fb27',
    question:
      'What is the formula for calculating energy consumption in kilowatt-hours? A 9.5 kW electric shower runs for 15 minutes — how many kWh does it use?',
    answer:
      'Energy (kWh) = Power (kW) × Time (hours). For the shower: E = 9.5 kW × (15/60) h = 9.5 × 0.25 = 2.375 kWh. This is the figure used for electricity billing. Converting minutes to hours (dividing by 60) is a common source of errors in exam calculations — always check your time units before substituting.',
    category: 'Power',
    difficulty: 'medium',
  },
  {
    id: 'fb28',
    question:
      'In a series circuit supplied at 12 V containing a 4 Ω and an 8 Ω resistor, what is the voltage drop across each resistor?',
    answer:
      "Total resistance Rt = 4 + 8 = 12 Ω. Current I = V / Rt = 12 / 12 = 1 A. Voltage across the 4 Ω resistor: V = I × R = 1 × 4 = 4 V. Voltage across the 8 Ω resistor: V = 1 × 8 = 8 V. Note that 4 V + 8 V = 12 V, confirming Kirchhoff's Voltage Law — the sum of all voltage drops equals the supply voltage.",
    category: 'Practical Calculations',
    difficulty: 'medium',
  },
];
