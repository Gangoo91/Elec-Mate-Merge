import { FlashcardData } from "./types";

export const safeIsolation: FlashcardData[] = [
  // === EXISTING CARDS si1–si15 (preserved exactly) ===
  {
    id: "si1",
    question: "What is the first step in safe isolation?",
    answer:
      "Identify the circuit to be isolated and inform all relevant persons.",
    category: "Safe Isolation",
    difficulty: "easy",
  },
  {
    id: "si2",
    question: "What must you do before using a voltage indicator?",
    answer:
      "Prove it works on a known live source (proving unit or known supply).",
    category: "Safe Isolation",
    difficulty: "easy",
  },
  {
    id: "si3",
    question: "What must you do after testing that a circuit is dead?",
    answer: "Re-prove the voltage indicator on a known live source.",
    category: "Safe Isolation",
    difficulty: "easy",
  },
  {
    id: "si4",
    question:
      "What does the acronym 'STOP' stand for in safe isolation?",
    answer: "Switch off, Tag/lock out, Open/isolate, Prove dead.",
    category: "Safe Isolation",
    difficulty: "medium",
  },
  {
    id: "si5",
    question: "What type of lock should be used for isolation?",
    answer:
      "A unique personal lock with a single key held by the person working.",
    category: "Safe Isolation",
    difficulty: "medium",
  },
  {
    id: "si6",
    question: "What must a warning notice include?",
    answer:
      "A clear warning that equipment is being worked on and who is doing the work.",
    category: "Safe Isolation",
    difficulty: "medium",
  },
  {
    id: "si7",
    question: "Where should you test to confirm a circuit is dead?",
    answer:
      "At the point of work - as close as possible to where you'll be working.",
    category: "Safe Isolation",
    difficulty: "medium",
  },
  {
    id: "si8",
    question: "What regulation covers safe isolation procedures?",
    answer:
      "Electricity at Work Regulations 1989, specifically Regulation 14.",
    category: "Safe Isolation",
    difficulty: "hard",
  },
  {
    id: "si9",
    question:
      "What is the minimum PPE required during isolation testing?",
    answer:
      "Insulated gloves, safety glasses, and appropriate clothing.",
    category: "Safe Isolation",
    difficulty: "medium",
  },
  {
    id: "si10",
    question: "What should you do if you cannot achieve isolation?",
    answer:
      "Do not proceed - report to supervisor and follow live working procedures if authorised.",
    category: "Safe Isolation",
    difficulty: "medium",
  },
  {
    id: "si11",
    question: "What is a 'proving unit' used for?",
    answer:
      "To provide a known voltage source to verify your voltage indicator is working correctly.",
    category: "Safe Isolation",
    difficulty: "easy",
  },
  {
    id: "si12",
    question: "Who can remove a personal lock from an isolation point?",
    answer:
      "Only the person who fitted it (or under strict permit-to-work procedures).",
    category: "Safe Isolation",
    difficulty: "medium",
  },
  {
    id: "si13",
    question: "What is 'primary injection testing' in isolation?",
    answer:
      "Testing directly on the circuit conductors rather than through measuring equipment.",
    category: "Safe Isolation",
    difficulty: "hard",
  },
  {
    id: "si14",
    question: "Why must you test between all conductors?",
    answer:
      "To confirm L-N, L-E, and N-E are all dead - a backfeed could energise any conductor.",
    category: "Safe Isolation",
    difficulty: "medium",
  },
  {
    id: "si15",
    question: "What is the GS38 guidance note about?",
    answer:
      "HSE guidance on electrical test equipment for use on low voltage systems.",
    category: "Safe Isolation",
    difficulty: "hard",
  },

  // === NEW CARDS si16–si25 ===
  {
    id: "si16",
    question:
      "When is a formal permit-to-work required for electrical work?",
    answer:
      "When working on or near high voltage systems, complex isolation involving multiple supplies, or when the risk assessment identifies that normal safe isolation procedures alone are insufficient to manage the danger.",
    category: "Permit to Work",
    difficulty: "medium",
  },
  {
    id: "si17",
    question:
      "What key information must a permit-to-work document include?",
    answer:
      "The exact equipment/circuit to be worked on, the points of isolation, the name of the person authorised to carry out the work, the time of issue, the precautions taken, and a formal sign-off procedure for handback and re-energisation.",
    category: "Permit to Work",
    difficulty: "hard",
  },
  {
    id: "si18",
    question:
      "What is a multi-lock hasp and when is it used?",
    answer:
      "A multi-lock hasp is a device fitted to an isolation point that allows multiple personal padlocks to be attached simultaneously. It is used when more than one person is working on the same isolated circuit, ensuring the supply cannot be restored until every worker has removed their own lock.",
    category: "Lock-out/Tag-out",
    difficulty: "easy",
  },
  {
    id: "si19",
    question:
      "How does high voltage (HV) isolation differ from low voltage (LV) isolation?",
    answer:
      "HV isolation requires a formal permit-to-work system, a designated Senior Authorised Person (SAP) to carry out switching, the application of circuit main earths after proving dead, and additional safety documents. Only suitably trained and authorised persons may perform HV switching operations.",
    category: "HV Procedures",
    difficulty: "hard",
  },
  {
    id: "si20",
    question:
      "Scenario: You arrive on site and find the previous electrician's personal lock still attached to the isolator. What should you do?",
    answer:
      "Never cut or remove another person's lock. Contact the site supervisor or responsible person to locate the lock owner. If they cannot be found, follow the site's formal lock removal procedure, which typically requires written authorisation from a senior manager and verification that no one is still working on the circuit.",
    category: "Lock-out/Tag-out",
    difficulty: "medium",
  },
  {
    id: "si21",
    question:
      "According to GS38, what is the maximum permitted exposed probe tip length for test leads, and why?",
    answer:
      "The maximum exposed probe tip length is 4 mm. This minimises the risk of the probes bridging across live conductors or terminals and causing a short circuit or arc flash.",
    category: "GS38",
    difficulty: "easy",
  },
  {
    id: "si22",
    question:
      "What GS38 requirements apply to test leads used with voltage indicators?",
    answer:
      "Leads must have finger guards/barriers on the probes, be adequately insulated, have fused connections (typically 500 mA HRC fuses) to protect against short circuits, have a maximum 4 mm exposed probe tip, use flexible and robust insulated cable, and be clearly marked with their voltage rating.",
    category: "GS38",
    difficulty: "easy",
  },
  {
    id: "si23",
    question:
      "What are the key differences between a two-pole voltage indicator and a test lamp for proving dead?",
    answer:
      "A two-pole voltage indicator is the recommended instrument under GS38 - it does not rely on batteries, provides a clear indication of voltage presence, and meets the required safety standards. Test lamps (filament bulbs) are discouraged by the HSE because the bulb can shatter, they can draw significant fault current, and a blown filament may give a false 'dead' reading.",
    category: "GS38",
    difficulty: "easy",
  },
  {
    id: "si24",
    question:
      "Scenario: You are about to prove dead but discover your proving unit battery is flat. How should you proceed?",
    answer:
      "Do not proceed with the safe isolation until you can verify your voltage indicator is functioning. Either replace the proving unit battery, use a different known live source to prove the indicator (such as a known live socket outlet that you have confirmed is energised), or obtain a replacement proving unit. Never assume your tester is working without proof.",
    category: "Safe Isolation",
    difficulty: "medium",
  },
  {
    id: "si25",
    question:
      "Scenario: A colleague receives an electric shock from a 230 V supply and is still in contact with the source. Describe the correct rescue procedure.",
    answer:
      "First, do not touch the casualty while they are in contact with the supply. Immediately isolate the supply if you can do so safely (switch off, remove plug, or operate MCB/RCD). If you cannot isolate, use a dry non-conductive object (e.g. wooden broom handle) to push the casualty clear. Once separated, call 999 and assess for breathing and pulse. Begin CPR if needed - 30 chest compressions to 2 rescue breaths. If available, apply an AED as soon as possible.",
    category: "Rescue Procedures",
    difficulty: "hard",
  },
];
