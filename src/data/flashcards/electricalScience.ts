import { FlashcardData } from "./types";

export const electricalScience: FlashcardData[] = [
  // ── Ohm's Law ─────────────────────────────────────────────────────────
  {
    id: "es1",
    question: "State Ohm's law and give the formula.",
    answer:
      "Ohm's law states that the current flowing through a conductor is directly proportional to the voltage across it, provided the temperature remains constant. V = I × R (Voltage = Current × Resistance).",
    category: "Ohm's Law",
    difficulty: "easy",
  },
  {
    id: "es2",
    question:
      "A 230V supply is connected to a load with a resistance of 46\u2126. What current flows?",
    answer:
      "I = V / R = 230 / 46 = 5A.",
    category: "Ohm's Law",
    difficulty: "easy",
  },
  {
    id: "es3",
    question:
      "An electric heater draws 10A from a 230V supply. What is the resistance of the heating element?",
    answer:
      "R = V / I = 230 / 10 = 23\u2126.",
    category: "Ohm's Law",
    difficulty: "easy",
  },

  // ── Power & Energy ────────────────────────────────────────────────────
  {
    id: "es4",
    question:
      "Give the three forms of the electrical power formula.",
    answer:
      "P = V \u00D7 I, P = I\u00B2 \u00D7 R, and P = V\u00B2 / R. All are derived from Ohm's law combined with the basic power equation.",
    category: "Power & Energy",
    difficulty: "easy",
  },
  {
    id: "es5",
    question:
      "A 3kW immersion heater is connected to a 230V supply. What current does it draw?",
    answer:
      "I = P / V = 3000 / 230 = 13.04A (approximately 13A).",
    category: "Power & Energy",
    difficulty: "medium",
  },
  {
    id: "es6",
    question:
      "An electric shower rated at 9.5kW runs for 15 minutes on a 230V supply. How much energy is consumed in kWh?",
    answer:
      "E = P \u00D7 t = 9.5kW \u00D7 0.25h = 2.375kWh.",
    category: "Power & Energy",
    difficulty: "medium",
  },
  {
    id: "es7",
    question:
      "A 2kW convector heater runs for 8 hours a day for 30 days. If electricity costs 34p per kWh, what is the running cost?",
    answer:
      "Energy = 2kW \u00D7 8h \u00D7 30 = 480kWh. Cost = 480 \u00D7 \u00A30.34 = \u00A3163.20.",
    category: "Power & Energy",
    difficulty: "medium",
  },

  // ── Resistor Networks ─────────────────────────────────────────────────
  {
    id: "es8",
    question:
      "Three resistors of 10\u2126, 20\u2126, and 30\u2126 are connected in series. What is the total resistance?",
    answer:
      "In series, R_total = R1 + R2 + R3 = 10 + 20 + 30 = 60\u2126.",
    category: "Resistor Networks",
    difficulty: "easy",
  },
  {
    id: "es9",
    question:
      "Two resistors of 30\u2126 and 60\u2126 are connected in parallel. What is the combined resistance?",
    answer:
      "1/R_total = 1/30 + 1/60 = 2/60 + 1/60 = 3/60. R_total = 60/3 = 20\u2126.",
    category: "Resistor Networks",
    difficulty: "medium",
  },
  {
    id: "es10",
    question:
      "You measure 12V across a series circuit containing a 4\u2126 and an 8\u2126 resistor. What is the voltage drop across the 8\u2126 resistor?",
    answer:
      "Total R = 12\u2126. Current I = 12 / 12 = 1A. Voltage across the 8\u2126 resistor = I \u00D7 R = 1 \u00D7 8 = 8V.",
    category: "Resistor Networks",
    difficulty: "medium",
  },

  // ── Kirchhoff's Laws ──────────────────────────────────────────────────
  {
    id: "es11",
    question:
      "State Kirchhoff's current law (KCL) and explain its practical significance.",
    answer:
      "KCL states that the total current entering a junction equals the total current leaving it. In practice, this means no charge is lost at a junction \u2014 useful for fault-finding parallel circuits where branch currents must sum to the supply current.",
    category: "Kirchhoff's Laws",
    difficulty: "easy",
  },
  {
    id: "es12",
    question:
      "State Kirchhoff's voltage law (KVL). In a series circuit supplied at 230V with three loads dropping 100V, 80V, and 50V, what does KVL tell you?",
    answer:
      "KVL states that the sum of all voltage drops around a closed loop equals the supply voltage. Here 100 + 80 + 50 = 230V, confirming all the supply voltage is accounted for across the loads.",
    category: "Kirchhoff's Laws",
    difficulty: "easy",
  },

  // ── Magnetism ─────────────────────────────────────────────────────────
  {
    id: "es13",
    question:
      "Describe the magnetic field produced by a current-carrying conductor and state the rule used to determine its direction.",
    answer:
      "A current-carrying conductor produces concentric circular magnetic field lines around it. The right-hand grip rule is used: grip the conductor with the right hand so the thumb points in the direction of conventional current flow \u2014 the fingers curl in the direction of the magnetic field.",
    category: "Magnetism",
    difficulty: "easy",
  },
  {
    id: "es14",
    question:
      "Explain how electromagnetic induction works and state Faraday's law.",
    answer:
      "When a conductor moves through a magnetic field (or a changing magnetic field passes through a conductor), an EMF is induced. Faraday's law states that the magnitude of the induced EMF is proportional to the rate of change of magnetic flux linkage through the circuit.",
    category: "Magnetism",
    difficulty: "medium",
  },

  // ── AC Theory ─────────────────────────────────────────────────────────
  {
    id: "es15",
    question:
      "What are the standard characteristics of the UK mains electricity supply?",
    answer:
      "230V RMS (nominal), 325V peak, 50Hz frequency, single-phase for domestic. The period of one cycle is 1/50 = 20 milliseconds.",
    category: "AC Theory",
    difficulty: "medium",
  },
  {
    id: "es16",
    question:
      "What is the relationship between peak voltage and RMS voltage for a sinusoidal AC waveform? Calculate the RMS value for a 325V peak supply.",
    answer:
      "V_RMS = V_peak / \u221A2 (approximately V_peak \u00D7 0.707). For 325V peak: V_RMS = 325 \u00D7 0.707 = 229.8V \u2248 230V (the UK mains nominal voltage).",
    category: "AC Theory",
    difficulty: "medium",
  },

  // ── Transformers ──────────────────────────────────────────────────────
  {
    id: "es17",
    question:
      "A transformer has 1000 primary turns and 100 secondary turns. If the primary voltage is 230V, what is the secondary voltage? Is it step-up or step-down?",
    answer:
      "V_s = V_p \u00D7 (N_s / N_p) = 230 \u00D7 (100 / 1000) = 23V. This is a step-down transformer (the secondary voltage is lower than the primary).",
    category: "Transformers",
    difficulty: "medium",
  },
  {
    id: "es18",
    question:
      "On a construction site, a 110V centre-tapped transformer is used for power tools. Why is this arrangement safer than using 230V tools?",
    answer:
      "The secondary winding is centre-tapped to earth, so the maximum voltage to earth from either conductor is only 55V \u2014 well below the level considered dangerous. This significantly reduces the risk of fatal electric shock on wet or damp construction sites.",
    category: "Transformers",
    difficulty: "medium",
  },

  // ── Capacitors ────────────────────────────────────────────────────────
  {
    id: "es19",
    question:
      "What is a capacitor, what is its unit of measurement, and what does it do in a circuit?",
    answer:
      "A capacitor is a component that stores energy in an electric field between two conducting plates separated by an insulator (dielectric). It is measured in farads (F). In AC circuits, capacitors oppose changes in voltage and can be used for power factor correction, filtering, and energy storage.",
    category: "Capacitors",
    difficulty: "easy",
  },
  {
    id: "es20",
    question:
      "How do capacitors combine in series versus in parallel? (This is the opposite of resistors.)",
    answer:
      "In parallel, capacitances add directly: C_total = C1 + C2 + C3. In series, they combine reciprocally: 1/C_total = 1/C1 + 1/C2 + 1/C3. This is the reverse of how resistors combine.",
    category: "Capacitors",
    difficulty: "hard",
  },

  // ── Inductors ─────────────────────────────────────────────────────────
  {
    id: "es21",
    question:
      "What is an inductor, what is its unit, and what is back-EMF?",
    answer:
      "An inductor is a coil of wire that stores energy in a magnetic field when current flows through it. It is measured in henrys (H). Back-EMF is the voltage induced in the coil that opposes the change in current (Lenz's law). This is why switching off an inductive load (e.g. a motor or relay) can produce voltage spikes.",
    category: "Inductors",
    difficulty: "medium",
  },

  // ── Power Factor ──────────────────────────────────────────────────────
  {
    id: "es22",
    question:
      "Define power factor and explain what 'leading' and 'lagging' power factor mean.",
    answer:
      "Power factor (cos \u03C6) is the ratio of true power (W) to apparent power (VA). A lagging power factor means current lags behind voltage (caused by inductive loads like motors). A leading power factor means current leads voltage (caused by capacitive loads). Unity power factor (1.0) is ideal.",
    category: "Power Factor",
    difficulty: "hard",
  },
  {
    id: "es23",
    question:
      "A single-phase motor draws 20A at 230V with a power factor of 0.8 lagging. Calculate the true power, apparent power, and reactive power.",
    answer:
      "Apparent power (S) = V \u00D7 I = 230 \u00D7 20 = 4600VA (4.6kVA). True power (P) = S \u00D7 cos\u03C6 = 4600 \u00D7 0.8 = 3680W (3.68kW). Reactive power (Q) = S \u00D7 sin\u03C6 = 4600 \u00D7 0.6 = 2760VAr (2.76kVAr).",
    category: "Power Factor",
    difficulty: "hard",
  },

  // ── Three-Phase ───────────────────────────────────────────────────────
  {
    id: "es24",
    question:
      "What is the formula for three-phase power, and what is the line voltage of a standard UK three-phase supply?",
    answer:
      "P = \u221A3 \u00D7 V_L \u00D7 I_L \u00D7 cos\u03C6. The standard UK three-phase line voltage is 400V (with 230V phase voltage). The relationship is V_L = V_P \u00D7 \u221A3.",
    category: "Three-Phase",
    difficulty: "hard",
  },
  {
    id: "es25",
    question:
      "Explain the difference between star and delta connections. In a star-connected system with a 230V phase voltage, what is the line voltage?",
    answer:
      "In a star (Y) connection, one end of each winding connects to a common neutral point; the line voltage is \u221A3 times the phase voltage. V_L = 230 \u00D7 \u221A3 = 400V. In a delta (\u0394) connection, windings are connected end-to-end in a triangle with no neutral; the line voltage equals the phase voltage, but the line current is \u221A3 times the phase current.",
    category: "Three-Phase",
    difficulty: "hard",
  },
];
