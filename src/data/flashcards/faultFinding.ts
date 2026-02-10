import { FlashcardData } from "./types";

export const faultFinding: FlashcardData[] = [
  // === EXISTING CARDS ff1–ff30 (preserved exactly) ===
  {
    id: "ff1",
    question: "What are the three main types of electrical faults?",
    answer: "Open circuit, short circuit, and earth fault.",
    category: "Fault Finding",
    difficulty: "easy",
  },
  {
    id: "ff2",
    question: "What symptom indicates an open circuit fault?",
    answer:
      "No current flow - the circuit is dead even when the supply is on.",
    category: "Fault Finding",
    difficulty: "easy",
  },
  {
    id: "ff3",
    question: "What symptom indicates a short circuit?",
    answer:
      "Excessive current flow causing protective devices to trip immediately.",
    category: "Fault Finding",
    difficulty: "easy",
  },
  {
    id: "ff4",
    question: "What is a 'high resistance joint'?",
    answer:
      "A poor connection that increases resistance, causing heat and voltage drop.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff5",
    question: "What visual signs indicate a high resistance joint?",
    answer:
      "Discolouration, burning, melted insulation, or blackening around the connection.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff6",
    question: "What is the 'half-split' method of fault finding?",
    answer:
      "Testing at the midpoint of a circuit to determine which half contains the fault.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff7",
    question: "What causes nuisance RCD tripping?",
    answer:
      "Cumulative leakage current, faulty appliances, moisture ingress, or shared neutrals.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff8",
    question: "How do you test for a neutral-earth fault?",
    answer:
      "Insulation resistance test between neutral and earth with circuits disconnected.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff9",
    question: "What is 'volt drop' and when is it a problem?",
    answer:
      "Voltage reduction along a cable. It's a problem when it exceeds 5% (3% lighting, 5% other).",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff10",
    question: "What could cause lights to flicker?",
    answer:
      "Loose connections, voltage fluctuations, faulty lamp, or overloaded neutral.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff11",
    question: "What is 'tracking' in electrical terms?",
    answer:
      "A conducting path on insulation surface caused by contamination and moisture.",
    category: "Fault Finding",
    difficulty: "hard",
  },
  {
    id: "ff12",
    question: "What causes an MCB to trip but not an RCD?",
    answer:
      "Overcurrent or short circuit between live and neutral (not involving earth).",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff13",
    question: "What causes an RCD to trip but not an MCB?",
    answer:
      "Earth fault or leakage current below MCB rating but above RCD sensitivity.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff14",
    question: "What is a 'borrowed neutral' and why is it dangerous?",
    answer:
      "Using another circuit's neutral, causing imbalance and potential RCD issues.",
    category: "Fault Finding",
    difficulty: "hard",
  },
  {
    id: "ff15",
    question: "How do you locate an intermittent fault?",
    answer:
      "Thermal imaging, monitoring equipment, or stress testing (flexing cables, vibration).",
    category: "Fault Finding",
    difficulty: "hard",
  },
  {
    id: "ff16",
    question: "What does a low insulation resistance reading indicate?",
    answer:
      "Damaged insulation, moisture ingress, or contamination in the circuit.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff17",
    question: "What is 'ring final circuit continuity' and why test it?",
    answer:
      "Verifying the ring is complete with no interconnections or breaks.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff18",
    question: "What would cause high Zs readings?",
    answer:
      "Poor earth connections, undersized cables, long cable runs, or corroded joints.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff19",
    question: "What is 'back-feeding' and why is it dangerous?",
    answer:
      "When a circuit is energised from an unexpected source, risking shock during isolation.",
    category: "Fault Finding",
    difficulty: "hard",
  },
  {
    id: "ff20",
    question: "How do you identify which circuit is tripping an RCD?",
    answer:
      "Disconnect all circuits, reset RCD, reconnect one at a time until it trips.",
    category: "Fault Finding",
    difficulty: "easy",
  },
  {
    id: "ff21",
    question:
      "What could cause an electric shock from a metal appliance case?",
    answer:
      "Earth fault with inadequate protective conductor or failed earth connection.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff22",
    question: "What is 'thermal runaway' in electrical connections?",
    answer:
      "Heat from high resistance causing more resistance, creating a dangerous positive feedback loop.",
    category: "Fault Finding",
    difficulty: "hard",
  },
  {
    id: "ff23",
    question: "How do you test for a crossed polarity fault?",
    answer:
      "Use a socket tester or verify with a multimeter that live and neutral are correct.",
    category: "Fault Finding",
    difficulty: "easy",
  },
  {
    id: "ff24",
    question: "What fault causes a 'tingle' from exposed metalwork?",
    answer:
      "Missing earth, high earth impedance, or neutral-earth fault.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff25",
    question: "What is the most common cause of electrical fires?",
    answer:
      "Loose connections creating high resistance joints and arcing.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff26",
    question: "How do you test for a break in a ring final circuit?",
    answer:
      "End-to-end continuity tests should give equal readings for L-L, N-N, and E-E.",
    category: "Fault Finding",
    difficulty: "hard",
  },
  {
    id: "ff27",
    question: "What does 'single phasing' mean in a three-phase system?",
    answer:
      "Loss of one phase causing motors to run on two phases with reduced power and overheating.",
    category: "Fault Finding",
    difficulty: "hard",
  },
  {
    id: "ff28",
    question:
      "What causes humming or buzzing from electrical equipment?",
    answer:
      "Loose laminations, overloaded transformers, or magnetic component vibration.",
    category: "Fault Finding",
    difficulty: "medium",
  },
  {
    id: "ff29",
    question: "How do you identify a fault in buried cables?",
    answer:
      "Cable locator/tracer, TDR (time domain reflectometer), or tone generator.",
    category: "Fault Finding",
    difficulty: "hard",
  },
  {
    id: "ff30",
    question: "What is the first step in any fault-finding procedure?",
    answer:
      "Gather information - ask the user, check for recent changes, review symptoms.",
    category: "Fault Finding",
    difficulty: "easy",
  },
  // === NEW CARDS ff31–ff35 ===
  {
    id: "ff31",
    question:
      "When using thermal imaging for fault finding, what key indicators should you look for?",
    answer:
      "Hot spots at connections, busbars, or terminations indicate high resistance joints. Uneven heat distribution across phases suggests load imbalance. Thermal imaging should be carried out under normal load conditions per IET guidance, and a temperature differential of more than 10°C above ambient or adjacent components warrants further investigation.",
    category: "Thermal Imaging",
    difficulty: "hard",
  },
  {
    id: "ff32",
    question:
      "What is a time domain reflectometer (TDR) and how does it locate cable faults?",
    answer:
      "A TDR sends a low-energy electrical pulse along a cable and analyses the reflected signal. The time delay and shape of the reflection indicate the distance to and type of fault (open circuit, short circuit, or impedance change). It is particularly useful for locating faults in long or buried cable runs where physical inspection is impractical, and accuracy is typically within 1% of the cable length.",
    category: "Diagnostic Techniques",
    difficulty: "hard",
  },
  {
    id: "ff33",
    question:
      "A commercial installation experiences random equipment shutdowns that never occur during testing. What approach should you take to diagnose this transient fault?",
    answer:
      "Install power quality monitoring or data logging equipment to capture voltage, current, and frequency over an extended period. Check for loose connections that only fail under thermal expansion or vibration. Inspect for environmental factors such as moisture ingress during specific weather conditions. Review whether the fault correlates with high-load periods, switching events, or specific equipment operating cycles. BS 7671 Appendix 6 and IET guidance on periodic inspection support systematic investigation of intermittent faults.",
    category: "Diagnostic Techniques",
    difficulty: "medium",
  },
  {
    id: "ff34",
    question:
      "In a three-phase distribution board, one phase shows significantly higher current than the other two and motors are overheating. What faults should you investigate?",
    answer:
      "Check for single phasing caused by a blown fuse, failed contactor contact, or open circuit on one phase. Verify phase voltages are balanced — more than 2% imbalance indicates a supply or connection fault. Inspect for loose or corroded busbar connections causing high resistance on the affected phase. Check that loads are evenly distributed across all three phases. Under BS 7671, phase imbalance can cause neutral overloading and must be corrected to prevent equipment damage.",
    category: "Three-Phase Faults",
    difficulty: "medium",
  },
  {
    id: "ff35",
    question:
      "What are harmonics in an electrical installation and what problems do they cause?",
    answer:
      "Harmonics are multiples of the fundamental 50 Hz frequency caused by non-linear loads such as LED drivers, VFDs, IT equipment, and switch-mode power supplies. They cause overheating of neutral conductors (triplen harmonics — 3rd, 9th, 15th — add rather than cancel in the neutral), increased losses in transformers and cables, nuisance tripping of RCDs, electromagnetic interference, and distortion of voltage waveforms. BS 7671 requires neutral conductors to be sized for harmonic currents, and IET guidance recommends power quality surveys where significant non-linear loads are present.",
    category: "Fault Types",
    difficulty: "hard",
  },
];
