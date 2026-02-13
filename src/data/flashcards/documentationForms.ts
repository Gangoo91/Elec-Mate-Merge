import { FlashcardData } from './types';

export const documentationForms: FlashcardData[] = [
  // ── Certificates ──────────────────────────────────────────────────────

  {
    id: 'df1',
    question: 'What is an Electrical Installation Certificate (EIC) and when is it required?',
    answer:
      'An EIC is issued upon completion of a new electrical installation or a major alteration to an existing installation. It certifies that the work has been designed, constructed, inspected, and tested in accordance with BS 7671. It is a legal requirement under Part P of the Building Regulations for notifiable work in England and Wales.',
    category: 'Certificates',
    difficulty: 'easy',
  },
  {
    id: 'df2',
    question: 'Who is permitted to sign an Electrical Installation Certificate?',
    answer:
      'An EIC must be signed by three competent persons: the designer, the constructor (installer), and the person who carried out the inspection and testing. In practice, one person may fulfil all three roles provided they are suitably qualified and competent. They should be registered with a government-approved competent person scheme such as NICEIC, NAPIT, or ELECSA.',
    category: 'Certificates',
    difficulty: 'medium',
  },
  {
    id: 'df3',
    question:
      'What three roles must sign an Electrical Installation Certificate, and what does each certify?',
    answer:
      'The designer confirms the installation was designed to BS 7671. The constructor confirms the work was built using correct materials and workmanship. The inspector confirms the installation was inspected and tested in accordance with BS 7671 and is safe to energise. All three signatures are required for the certificate to be valid.',
    category: 'Certificates',
    difficulty: 'medium',
  },
  {
    id: 'df4',
    question:
      'What is a Minor Electrical Installation Works Certificate (MEIWC) and when should it be used?',
    answer:
      'A MEIWC is used for small-scale electrical work that does not involve a new circuit, such as adding a socket outlet to an existing circuit or replacing a light fitting with a new one. It covers additions and alterations to an existing installation that do not require a new circuit to be installed. Only one signature is required, as design, construction, and testing are all covered by the same competent person.',
    category: 'Certificates',
    difficulty: 'easy',
  },
  {
    id: 'df5',
    question: 'What are the limitations of a Minor Electrical Installation Works Certificate?',
    answer:
      'A MEIWC must not be used for the installation of a new circuit, a complete new installation, or work involving a new consumer unit or distribution board. If the work requires a new circuit to be run from the distribution board, a full EIC is required instead. The MEIWC is only suitable for additions or alterations to a single existing circuit.',
    category: 'Certificates',
    difficulty: 'medium',
  },
  {
    id: 'df6',
    question: 'What is the purpose of an Electrical Installation Condition Report (EICR)?',
    answer:
      'An EICR provides an assessment of the condition of an existing electrical installation. It identifies any damage, deterioration, defects, or non-compliance with the current edition of BS 7671 that could give rise to danger. The report includes observation codes and an overall assessment of whether the installation is satisfactory or unsatisfactory for continued use.',
    category: 'Certificates',
    difficulty: 'easy',
  },
  {
    id: 'df7',
    question:
      'Who typically requests an EICR and what are the recommended intervals for domestic properties?',
    answer:
      'An EICR may be requested by the property owner, landlord, mortgage provider, insurance company, or local authority. For domestic properties, the recommended maximum interval is every 10 years or at each change of occupancy. For private rented properties in England, the Electrical Safety Standards 2020 legally require an EICR at least every 5 years.',
    category: 'Certificates',
    difficulty: 'medium',
  },

  // ── Test Results ──────────────────────────────────────────────────────

  {
    id: 'df8',
    question: 'What is the Schedule of Test Results and what measurements does it record?',
    answer:
      'The Schedule of Test Results is a form that accompanies an EIC or EICR, recording the measured values from electrical testing. It includes readings for continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD operating times. Each circuit in the installation has its own row of test results.',
    category: 'Test Results',
    difficulty: 'medium',
  },
  {
    id: 'df9',
    question:
      'Why is it important to record test instrument serial numbers on the Schedule of Test Results?',
    answer:
      'Recording instrument serial numbers provides traceability and proves that calibrated, suitable instruments were used for each test. If a result is later questioned or disputed, the serial number allows the instrument to be identified and its calibration status verified. BS 7671 requires that instruments comply with the relevant parts of BS EN 61557.',
    category: 'Test Results',
    difficulty: 'hard',
  },
  {
    id: 'df10',
    question:
      'On a Schedule of Test Results, what does a recorded insulation resistance value of >200 megohms indicate?',
    answer:
      'A value of >200 megohms indicates that the insulation resistance is very high and well above the minimum acceptable values required by BS 7671. The minimum acceptable insulation resistance is 1 megohm for circuits operating at 500 V d.c. test voltage. The reading suggests the cable insulation is in excellent condition with no breakdown or moisture ingress.',
    category: 'Test Results',
    difficulty: 'medium',
  },

  // ── Inspection Forms ──────────────────────────────────────────────────

  {
    id: 'df11',
    question: 'What is the Schedule of Inspections and what types of checks does it cover?',
    answer:
      'The Schedule of Inspections is a checklist used during initial verification or periodic inspection. It covers visual checks such as correct connections, appropriate cable selection, presence of fire barriers, correct labelling, adequacy of earthing and bonding, and the condition of enclosures and accessories. Each item is marked as acceptable, unacceptable, or not applicable.',
    category: 'Inspection Forms',
    difficulty: 'easy',
  },
  {
    id: 'df12',
    question: 'What do the EICR observation codes C1, C2, C3, and FI mean?',
    answer:
      'C1 means danger is present and immediate remedial action is required. C2 means potentially dangerous and urgent remedial action is needed. C3 means improvement is recommended but there is no immediate danger; the installation does not meet current standards. FI means further investigation is required without delay to determine the extent of a suspected defect.',
    category: 'Inspection Forms',
    difficulty: 'easy',
  },
  {
    id: 'df13',
    question: 'How do observation codes affect the overall assessment on an EICR?',
    answer:
      'Any C1 or C2 code recorded on the report will result in an overall assessment of Unsatisfactory. If only C3 codes are present, the installation can still be assessed as Satisfactory because C3 indicates an improvement recommendation, not a danger. An FI code means the overall assessment cannot be determined until the further investigation is completed.',
    category: 'Inspection Forms',
    difficulty: 'medium',
  },
  {
    id: 'df14',
    question:
      'What does BS 7671 Part 6 require regarding certification of electrical installations?',
    answer:
      'Part 6 of BS 7671 (Inspection and Testing) requires that every completed electrical installation or alteration is inspected and tested before being put into service. It mandates that the appropriate certificate or report is issued to the person ordering the work. The certificates must contain details of the installation, the extent of work covered, and the results of inspection and testing.',
    category: 'Inspection Forms',
    difficulty: 'hard',
  },
  {
    id: 'df15',
    question: 'What guidance does GN3 (Guidance Note 3, 9th Edition) provide for electricians?',
    answer:
      'GN3, published by the IET, provides detailed guidance on inspection and testing procedures for electrical installations. It covers the sequence of tests, acceptable test values, how to complete certificates and reports, and the use of test instruments. The 9th Edition aligns with BS 7671:2018+A2:2022 (the 18th Edition Wiring Regulations) and includes worked examples of test result recording.',
    category: 'Inspection Forms',
    difficulty: 'hard',
  },

  // ── Labelling ─────────────────────────────────────────────────────────

  {
    id: 'df16',
    question:
      'What is a danger notice and when must one be displayed at an electrical installation?',
    answer:
      "A danger notice bearing the words 'DANGER - ELECTRIC SHOCK RISK' must be displayed where live electrical equipment is present and accessible. It is required at locations such as the main intake position, distribution boards, and anywhere voltages exceeding 230 V are present. The notice must comply with the Health and Safety (Safety Signs and Signals) Regulations 1996.",
    category: 'Labelling',
    difficulty: 'easy',
  },
  {
    id: 'df17',
    question: 'What information must be included on an RCD test label at a consumer unit?',
    answer:
      "BS 7671 Regulation 514.12.2 requires a notice at or near the main distribution board stating that RCDs fitted should be tested quarterly by pressing the test button. The label typically reads 'This installation, or part of it, is protected by a device which automatically switches off the supply if an earth fault develops. Test quarterly by pressing the button marked T or Test.' The purpose is to remind users to verify RCD operation regularly.",
    category: 'Labelling',
    difficulty: 'medium',
  },
  {
    id: 'df18',
    question:
      'What are the requirements for a circuit chart at a consumer unit or distribution board?',
    answer:
      "Regulation 514.9.1 of BS 7671 requires a durable chart or schedule to be provided at each distribution board. It must show the number and type of each circuit, the protective device rating, the circuit's intended purpose, and the number of points served. The chart must be kept up to date with any changes to the installation and should be legible and securely fixed.",
    category: 'Labelling',
    difficulty: 'easy',
  },
  {
    id: 'df19',
    question: 'What warning label is required where different voltage systems share an enclosure?',
    answer:
      "Where electrical equipment operating at different voltages is installed within the same enclosure or in close proximity, a warning notice must be fixed in a prominent position. The notice must state 'DANGER - [voltage] VOLTS' and alert anyone working on the installation that more than one voltage is present. This is required by Regulation 514.10.1 of BS 7671.",
    category: 'Labelling',
    difficulty: 'hard',
  },

  // ── Record Keeping ────────────────────────────────────────────────────

  {
    id: 'df20',
    question:
      'How long should electrical certificates and reports be retained, and who should hold copies?',
    answer:
      'Electrical certificates and reports should be retained for the life of the installation. The person ordering the work receives the original certificate, and the contractor should keep a copy for their own records. For domestic properties this typically means the homeowner retains the certificate, ideally stored with the property deeds. Landlords in England must retain EICR copies and provide them to tenants within 28 days.',
    category: 'Record Keeping',
    difficulty: 'medium',
  },
  {
    id: 'df21',
    question:
      'What is the difference between storing electrical certificates digitally and on paper?',
    answer:
      'Paper certificates are the traditional format and are still widely accepted, but they can be lost, damaged, or deteriorate over time. Digital certificates offer advantages including secure cloud backup, easy sharing with clients and building control, and searchable records. Whichever format is used, the certificate must contain all the information required by BS 7671 and any digital signature must be verifiable and tamper-resistant.',
    category: 'Record Keeping',
    difficulty: 'easy',
  },
  {
    id: 'df22',
    question: 'What records should an electrical contractor retain for each job they complete?',
    answer:
      'A contractor should retain a copy of the certificate or report issued, the schedule of inspections and test results, any design calculations, photographs of the installation, records of materials used, and details of any departures from BS 7671. These records protect the contractor in the event of a dispute and demonstrate compliance with regulations. Good practice is to retain records for a minimum of six years in line with limitation periods.',
    category: 'Record Keeping',
    difficulty: 'hard',
  },
  {
    id: 'df23',
    question: 'Can amendments be made to an electrical certificate after it has been issued?',
    answer:
      'Minor corrections may be made provided they are clearly marked, dated, and initialled by the person making the amendment. However, best practice is to reissue a corrected certificate rather than amending the original, as this avoids any doubt about the validity of the document. A certificate must never be altered to misrepresent the condition of an installation or the tests carried out.',
    category: 'Record Keeping',
    difficulty: 'hard',
  },

  // ── Mixed topics (Certificates / Inspection / Record Keeping) ─────────

  {
    id: 'df24',
    question:
      'What competent person requirements apply to someone signing off electrical certification?',
    answer:
      'The person must possess adequate technical knowledge and experience relevant to the nature of the work. They are typically registered with an approved competent person scheme (NICEIC, NAPIT, ELECSA, or STROMA) and hold qualifications such as City and Guilds 2391 (Inspection and Testing) or equivalent. Registration with a scheme allows self-certification of notifiable work under Part P of the Building Regulations without separate building control notification.',
    category: 'Certificates',
    difficulty: 'medium',
  },
  {
    id: 'df25',
    question:
      'What is the correct sequence of tests that must be recorded on the Schedule of Test Results for initial verification?',
    answer:
      'The tests must be carried out in the sequence specified in BS 7671 Chapter 64 and GN3: continuity of protective conductors, continuity of ring final circuit conductors, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and finally RCD operation. The sequence matters because earlier tests confirm it is safe to proceed to later tests that apply voltage to the installation.',
    category: 'Test Results',
    difficulty: 'hard',
  },
  {
    id: 'df26',
    question: "On an EICR, what is the purpose of the 'Extent and Limitations' section?",
    answer:
      'The Extent and Limitations section defines exactly which parts of the installation were inspected and tested, and notes any areas that could not be accessed or verified. This protects both the inspector and the client by making clear what was and was not covered. Common limitations include inaccessible wiring behind walls, sealed floor voids, and circuits that could not be isolated during the inspection.',
    category: 'Inspection Forms',
    difficulty: 'medium',
  },
  {
    id: 'df27',
    question:
      'What details must be recorded on the front page of an Electrical Installation Certificate?',
    answer:
      'The front page must include the address and description of the installation, the name and details of the client, the design and installation contractor details, the extent of the installation covered, the supply characteristics (voltage, earthing system, prospective fault current), and the signatures of the designer, constructor, and inspector. The date of completion and any departures from BS 7671 must also be stated.',
    category: 'Certificates',
    difficulty: 'hard',
  },
  {
    id: 'df28',
    question:
      'A customer asks whether they need an EIC or a MEIWC after you add a new radial circuit for a kitchen cooker. Which certificate is correct and why?',
    answer:
      'A full Electrical Installation Certificate (EIC) is required because a new circuit has been installed from the consumer unit. A Minor Electrical Installation Works Certificate can only be used for additions or alterations to an existing circuit, not for new circuits. The EIC must include the schedule of inspections and schedule of test results for the new circuit, and all three signatures (designer, constructor, inspector) are needed.',
    category: 'Certificates',
    difficulty: 'easy',
  },
];
