import { FlashcardData } from "./types";

export const eicrCodes: FlashcardData[] = [
  // ── Existing cards eicr1-eicr18 (preserved exactly) ──────────────────

  {
    id: "eicr1",
    question: "What does the EICR code C1 mean?",
    answer:
      "Danger present - Risk of injury. Immediate remedial action required.",
    category: "Observation Codes",
    difficulty: "easy",
  },
  {
    id: "eicr2",
    question: "What does the EICR code C2 mean?",
    answer: "Potentially dangerous - Urgent remedial action required.",
    category: "Observation Codes",
    difficulty: "easy",
  },
  {
    id: "eicr3",
    question: "What does the EICR code C3 mean?",
    answer:
      "Improvement recommended - Does not meet current standards but no immediate danger.",
    category: "Observation Codes",
    difficulty: "easy",
  },
  {
    id: "eicr4",
    question: "What does the EICR code FI mean?",
    answer: "Further Investigation required without delay.",
    category: "Observation Codes",
    difficulty: "easy",
  },
  {
    id: "eicr5",
    question:
      "If a C1 is recorded, what is the overall outcome of the EICR?",
    answer: "Unsatisfactory",
    category: "Overall Outcomes",
    difficulty: "medium",
  },
  {
    id: "eicr6",
    question:
      "If only C3 codes are recorded, what is the overall outcome?",
    answer: "Satisfactory",
    category: "Overall Outcomes",
    difficulty: "medium",
  },
  {
    id: "eicr7",
    question:
      "What maximum interval is recommended between EICRs for domestic properties?",
    answer: "10 years (or on change of occupancy)",
    category: "Inspection Intervals",
    difficulty: "medium",
  },
  {
    id: "eicr8",
    question:
      "What maximum interval is recommended for commercial properties?",
    answer: "5 years",
    category: "Inspection Intervals",
    difficulty: "medium",
  },
  {
    id: "eicr9",
    question:
      "What maximum interval is recommended for swimming pools?",
    answer: "1 year",
    category: "Inspection Intervals",
    difficulty: "hard",
  },
  {
    id: "eicr10",
    question: "When must a C2 be addressed?",
    answer:
      "Within 28 days or as agreed with the client - urgent action needed.",
    category: "Observation Codes",
    difficulty: "medium",
  },
  {
    id: "eicr11",
    question: "What does 'LIM' mean on an EICR schedule?",
    answer:
      "Limitation - An item that couldn't be fully inspected or tested.",
    category: "Forms & Documentation",
    difficulty: "medium",
  },
  {
    id: "eicr12",
    question:
      "Who is responsible for ensuring C1 defects are rectified?",
    answer:
      "The duty holder (usually the landlord/owner) must arrange immediate action.",
    category: "Landlord Obligations",
    difficulty: "medium",
  },
  {
    id: "eicr13",
    question: "What is the difference between an EIC and an EICR?",
    answer:
      "EIC is for new installations; EICR is for existing installations being inspected.",
    category: "Forms & Documentation",
    difficulty: "medium",
  },
  {
    id: "eicr14",
    question: "What does N/A mean in an EICR inspection schedule?",
    answer:
      "Not Applicable - The item does not exist or is not relevant to this installation.",
    category: "Observation Codes",
    difficulty: "easy",
  },
  {
    id: "eicr15",
    question: "What does N/V mean in an EICR inspection schedule?",
    answer:
      "Not Verified - Unable to confirm compliance during the inspection.",
    category: "Observation Codes",
    difficulty: "medium",
  },
  {
    id: "eicr16",
    question: "If a C2 is recorded, what is the overall outcome?",
    answer: "Unsatisfactory",
    category: "Overall Outcomes",
    difficulty: "medium",
  },
  {
    id: "eicr17",
    question:
      "What maximum interval is recommended for agricultural/horticultural premises?",
    answer: "3 years",
    category: "Inspection Intervals",
    difficulty: "hard",
  },
  {
    id: "eicr18",
    question:
      "What form is used to record the EICR observations?",
    answer:
      "Schedule of Inspections and Schedule of Test Results (with condition report)",
    category: "Forms & Documentation",
    difficulty: "hard",
  },

  // ── New cards eicr19-eicr30 ──────────────────────────────────────────

  {
    id: "eicr19",
    question:
      "Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, how often must a landlord obtain an EICR for a rented property?",
    answer:
      "At least every 5 years, and before a new tenancy begins if no valid report exists. The report must be provided to tenants within 28 days and to the local authority within 7 days on request.",
    category: "Landlord Obligations",
    difficulty: "medium",
  },
  {
    id: "eicr20",
    question:
      "What maximum inspection interval is recommended for cinemas, theatres, and places of public entertainment?",
    answer:
      "1 year, in accordance with IET Guidance Note 3 and BS 7671.",
    category: "Inspection Intervals",
    difficulty: "hard",
  },
  {
    id: "eicr21",
    question:
      "What maximum inspection interval is recommended for launderettes and petrol filling stations?",
    answer:
      "1 year for both, due to the harsh or hazardous environments involved.",
    category: "Inspection Intervals",
    difficulty: "hard",
  },
  {
    id: "eicr22",
    question:
      "What maximum inspection interval is recommended for caravan parks and their individual units?",
    answer:
      "1 year for the caravan park fixed installation; 3 years for individual caravan units.",
    category: "Inspection Intervals",
    difficulty: "hard",
  },
  {
    id: "eicr23",
    question:
      "What is the difference between an EICR and a Minor Works Certificate?",
    answer:
      "An EICR reports on the condition of an existing installation. A Minor Works Certificate (EIC Minor Works) is issued after completing small alterations or additions to an existing circuit, such as adding a socket or light point, and certifies the new work complies with BS 7671.",
    category: "Forms & Documentation",
    difficulty: "medium",
  },
  {
    id: "eicr24",
    question:
      "An inspector records an FI (Further Investigation) code against a distribution board. What should happen next?",
    answer:
      "The FI must be investigated without delay by a competent person. Until the investigation is complete, the overall installation cannot be given a Satisfactory outcome. The client must be informed that further work is needed to determine whether a danger exists.",
    category: "Observation Codes",
    difficulty: "medium",
  },
  {
    id: "eicr25",
    question:
      "Who is deemed competent to carry out an EICR under UK regulations?",
    answer:
      "A qualified and competent electrician, typically registered with a government-approved competent person scheme such as NICEIC, NAPIT, ELECSA, or STROMA. They must hold appropriate qualifications (e.g. City & Guilds 2391 Inspection and Testing) and be experienced in the type of installation being inspected.",
    category: "Landlord Obligations",
    difficulty: "easy",
  },
  {
    id: "eicr26",
    question:
      "What is the difference between the Schedule of Inspections and the Schedule of Test Results on an EICR?",
    answer:
      "The Schedule of Inspections records visual checks and verifications of the installation's compliance (e.g. correct connections, presence of earthing, labelling). The Schedule of Test Results records measured values from instrument testing, such as insulation resistance, earth fault loop impedance, and RCD operating times.",
    category: "Forms & Documentation",
    difficulty: "easy",
  },
  {
    id: "eicr27",
    question:
      "What code is entered in the EICR inspection schedule when an item passes and is acceptable?",
    answer:
      "A tick (pass mark) is entered, confirming the item meets the requirements of BS 7671. No observation code is needed for items that are satisfactory.",
    category: "Observation Codes",
    difficulty: "easy",
  },
  {
    id: "eicr28",
    question:
      "Scenario: You are inspecting a rented flat and discover exposed live conductors in a junction box with no cover. What observation code should you assign and what immediate action is required?",
    answer:
      "Code C1 (Danger present). The exposed live conductors present an immediate risk of electric shock or injury. You must inform the duty holder (landlord or their agent) immediately, and the danger should be made safe before leaving site if possible, or isolated and clearly labelled as dangerous.",
    category: "Observation Codes",
    difficulty: "easy",
  },
  {
    id: "eicr29",
    question:
      "Scenario: During an EICR on a commercial kitchen, you find that an RCD protecting socket outlets has a measured trip time of 380 ms at rated residual current. The maximum permitted trip time for a general-use RCD is 300 ms. What code do you assign?",
    answer:
      "Code C2 (Potentially dangerous). The RCD is not operating within its required parameters under BS 7671 (Regulation 531.3), meaning it may fail to disconnect quickly enough to prevent a fatal electric shock. Urgent remedial action is required to replace or repair the device.",
    category: "Observation Codes",
    difficulty: "hard",
  },
  {
    id: "eicr30",
    question:
      "Under the 2020 Electrical Safety Standards, what enforcement action can a local authority take if a landlord fails to comply with an EICR remedial notice?",
    answer:
      "The local authority can arrange for remedial work to be carried out itself and recover costs from the landlord. It can also impose a financial penalty of up to 30,000 pounds. Repeated or serious non-compliance may lead to a Banning Order under the Housing and Planning Act 2016, preventing the landlord from letting properties.",
    category: "Landlord Obligations",
    difficulty: "medium",
  },
];
