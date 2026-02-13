import { FlashcardData } from './types';

export const designVerification: FlashcardData[] = [
  // === Design Process (dv1–dv6) ===
  {
    id: 'dv1',
    question:
      'According to BS 7671:2018+A2:2022, what does Regulation 132.16 require regarding who designs an electrical installation?',
    answer:
      'Regulation 132.16 states that every electrical installation shall be designed by a person or persons competent to do so. The design must take account of the intended use of the installation, external influences, compatibility of equipment, and maintainability. This ensures safety is built in from the outset, not just verified afterwards.',
    category: 'Design Process',
    difficulty: 'easy',
  },
  {
    id: 'dv2',
    question:
      'What is the first step of the design process as outlined in Chapter 31 of BS 7671:2018+A2:2022?',
    answer:
      'The first step is the assessment of general characteristics as required by Chapter 31 (Regulation 311 onwards). This includes determining the purpose and supplies available, the nature of demand, the supply characteristics (voltage, frequency, prospective fault current), the type of earthing arrangement (TN-S, TN-C-S, TT), and any external influences that may affect the installation.',
    category: 'Design Process',
    difficulty: 'easy',
  },
  {
    id: 'dv3',
    question:
      'What key supply characteristics must a designer establish before beginning an electrical installation design?',
    answer:
      'The designer must establish the nominal voltage (Uo), system frequency, prospective fault current (PFC) at the origin, the external earth fault loop impedance (Ze), the earthing arrangement (TN-S, TN-C-S, or TT), and the supply capacity in amperes. These values are typically obtained from the distribution network operator (DNO) or by measurement at the point of supply.',
    category: 'Design Process',
    difficulty: 'easy',
  },
  {
    id: 'dv4',
    question:
      'What factors must be considered when determining the design current (Ib) of a circuit?',
    answer:
      'The design current (Ib) is the current intended to be carried by the circuit in normal service. It must account for the connected load, diversity factors where applicable, the duty cycle of the equipment, and any future increase in load. The design current is the starting point for selecting the rated current of the protective device (In), which must satisfy the condition In >= Ib.',
    category: 'Design Process',
    difficulty: 'medium',
  },
  {
    id: 'dv5',
    question:
      'Explain the relationship between Ib, In, and Iz when selecting a protective device and cable for a circuit.',
    answer:
      'The design current Ib must not exceed the rated current of the protective device In, and In must not exceed the current-carrying capacity of the cable Iz. This is expressed as Ib <= In <= Iz. Additionally, the cable must be able to withstand the let-through energy of the protective device under fault conditions. These three values form the fundamental basis of circuit design to BS 7671:2018+A2:2022.',
    category: 'Design Process',
    difficulty: 'medium',
  },
  {
    id: 'dv6',
    question:
      'What are the five general characteristics that Chapter 31 of BS 7671:2018+A2:2022 requires the designer to assess?',
    answer:
      'Chapter 31 requires assessment of: (1) the purpose, supplies, and structure of the installation (Reg 311); (2) external influences such as ambient temperature, water, dust, and impact (Reg 312); (3) compatibility of equipment to avoid harmful effects like harmonics and voltage surges (Reg 313); (4) maintainability, ensuring safe inspection and testing can be carried out (Reg 314); and (5) safety services such as emergency lighting or fire alarm supplies (Reg 315).',
    category: 'Design Process',
    difficulty: 'hard',
  },

  // === Protective Devices (dv7–dv12) ===
  {
    id: 'dv7',
    question:
      'What maximum disconnection times does BS 7671:2018+A2:2022 specify for final circuits not exceeding 32A in a TN system?',
    answer:
      'For final circuits not exceeding 32A in a TN system, the maximum disconnection time is 0.4 seconds, as stated in Table 41.1 of BS 7671:2018+A2:2022. This fast disconnection time is required because these circuits supply equipment likely to be held or touched by users, presenting a greater electric shock risk.',
    category: 'Protective Devices',
    difficulty: 'easy',
  },
  {
    id: 'dv8',
    question:
      'What is the maximum permitted disconnection time for distribution circuits in a TN system under BS 7671:2018+A2:2022?',
    answer:
      'Distribution circuits in a TN system are permitted a maximum disconnection time of 5 seconds, as stated in Regulation 411.3.2.3. This longer time is acceptable because distribution circuits do not directly supply equipment that users are likely to touch. The circuit protective conductor provides the return path for fault current, and the 5-second limit still ensures safety.',
    category: 'Protective Devices',
    difficulty: 'easy',
  },
  {
    id: 'dv9',
    question:
      'What is automatic disconnection of supply (ADS) and why is it the most commonly used protective measure?',
    answer:
      'Automatic disconnection of supply (ADS) is a protective measure described in Section 411 of BS 7671:2018+A2:2022. It uses a protective device (MCB, fuse, or RCD) to disconnect the circuit automatically when an earth fault causes a touch voltage that could be dangerous. ADS is the most commonly used measure because it is reliable, well understood, and suitable for virtually all installation types. It requires proper earthing and bonding to function correctly.',
    category: 'Protective Devices',
    difficulty: 'medium',
  },
  {
    id: 'dv10',
    question: 'When is a 30mA RCD required for additional protection under BS 7671:2018+A2:2022?',
    answer:
      'Regulation 411.3.3 requires additional protection by a 30mA RCD for socket outlets rated at 32A or below, mobile equipment rated up to 32A for outdoor use, and circuits within Sections 701 (bathrooms), 702 (swimming pools), and certain other special locations. The 30mA RCD provides additional protection against electric shock in the event of failure of the basic protective provisions or carelessness by users.',
    category: 'Protective Devices',
    difficulty: 'medium',
  },
  {
    id: 'dv11',
    question:
      'What is discrimination (selectivity) between protective devices and why is it important in installation design?',
    answer:
      'Discrimination means that when a fault occurs, only the protective device nearest to the fault operates, leaving healthy circuits unaffected. This is achieved by coordinating the time/current characteristics of upstream and downstream devices. BS 7671:2018+A2:2022 Regulation 536.4 covers coordination. Proper discrimination improves the availability of the installation and makes fault finding easier, as the tripped device identifies the faulted circuit.',
    category: 'Protective Devices',
    difficulty: 'hard',
  },
  {
    id: 'dv12',
    question:
      'Explain the purpose of time-delayed RCDs and where they are used in an installation.',
    answer:
      'Time-delayed RCDs (Type S or selective) are designed to operate after a short intentional delay, typically 150-500ms depending on the type. They are installed upstream of non-delayed RCDs to achieve discrimination, ensuring only the RCD closest to the fault trips first. This is common at the main switch position in domestic consumer units where a Type S RCD protects the incoming supply whilst individual 30mA RCDs protect final circuits.',
    category: 'Protective Devices',
    difficulty: 'hard',
  },

  // === Calculations (dv13–dv18) ===
  {
    id: 'dv13',
    question:
      'What is earth fault loop impedance (Zs) and how is it determined during the design stage?',
    answer:
      'Earth fault loop impedance Zs is the total impedance of the earth fault current path from the point of fault back to the source. At the design stage, it is calculated as Zs = Ze + (R1 + R2), where Ze is the external earth fault loop impedance and (R1 + R2) is the combined resistance of the line conductor and circuit protective conductor. The calculated Zs must not exceed the maximum values given in the tables of Chapter 41 for the specific protective device.',
    category: 'Calculations',
    difficulty: 'medium',
  },
  {
    id: 'dv14',
    question:
      'How is prospective fault current (PFC) calculated or determined, and why is it critical to the design?',
    answer:
      "Prospective fault current can be calculated using Ohm's law: PFC = Uo / Zs for earth faults, or Uo / (R1 + Rn) for line-to-neutral faults. It can also be measured at the origin using a PFC meter. PFC is critical because every protective device must have a rated breaking capacity not less than the prospective fault current at its point of installation, as required by Regulation 432.1. An undersized device could fail to interrupt a fault safely.",
    category: 'Calculations',
    difficulty: 'medium',
  },
  {
    id: 'dv15',
    question:
      'What is the adiabatic equation and how is it used to verify the adequacy of a circuit protective conductor (CPC)?',
    answer:
      'The adiabatic equation is S = (I squared multiplied by t) divided by k, written as S = sqrt(I²t) / k, where S is the minimum cross-sectional area of the CPC in mm², I is the fault current in amperes, t is the disconnection time in seconds, and k is a factor dependent on the conductor material and insulation (from Tables 54.2 to 54.6). It verifies that the CPC can withstand the thermal energy (I²t) let through by the protective device during a fault without damage.',
    category: 'Calculations',
    difficulty: 'hard',
  },
  {
    id: 'dv16',
    question: 'What is energy let-through (I²t) and how does it relate to cable protection?',
    answer:
      "Energy let-through, expressed as I²t (current squared multiplied by time), is a measure of the thermal energy a protective device allows to pass during a fault. The cable and its insulation must be able to withstand this energy without exceeding their thermal limits. The protective device's I²t value at the prospective fault current must not exceed the I²t withstand of the cable, expressed as k²S² where k is the material factor and S is the conductor cross-sectional area.",
    category: 'Calculations',
    difficulty: 'hard',
  },
  {
    id: 'dv17',
    question:
      'When comparing measured Zs values with the maximum values in the BS 7671 tables, what correction must be applied and why?',
    answer:
      'Measured Zs values are taken at the ambient temperature at the time of testing, but conductors in service will operate at a higher temperature. The rule of thumb is to multiply the measured Zs by 0.8 (or use the tabulated values at the design stage) to ensure the measured value does not exceed 80% of the maximum tabulated value in Chapter 41. This accounts for the increase in conductor resistance when the circuit is at its operating temperature.',
    category: 'Calculations',
    difficulty: 'medium',
  },
  {
    id: 'dv18',
    question:
      'How is the maximum Zs value for a particular circuit protective device determined from BS 7671:2018+A2:2022?',
    answer:
      'The maximum Zs values are found in the tables within Chapter 41, specifically Tables 41.2 to 41.4 for different protective device types (BS 88 fuses, BS 3036 fuses, and MCBs). The table gives the maximum Zs for each device rating that will ensure disconnection within 0.4 seconds for final circuits or 5 seconds for distribution circuits. The designer selects the correct table for the device type and reads across from the device rating to find the maximum permitted Zs.',
    category: 'Calculations',
    difficulty: 'hard',
  },

  // === Verification (dv19–dv25) ===
  {
    id: 'dv19',
    question: 'What is initial verification and what two main activities does it comprise?',
    answer:
      'Initial verification, as defined in Chapter 61 of BS 7671:2018+A2:2022, comprises inspection and testing of a new installation or addition before it is put into service. Inspection is a visual check that all equipment complies with the relevant standards and is correctly selected, erected, and not visibly damaged. Testing involves a series of electrical measurements to confirm the installation meets design requirements and is safe to energise.',
    category: 'Verification',
    difficulty: 'easy',
  },
  {
    id: 'dv20',
    question:
      'What is the correct sequence of dead tests during initial verification of an installation?',
    answer:
      'The dead testing sequence, as set out in Regulation 643, is: (1) continuity of protective conductors, including main and supplementary bonding; (2) continuity of ring final circuit conductors; (3) insulation resistance between live conductors and earth, and between live conductors; (4) polarity; and (5) earth electrode resistance (where applicable). This sequence is important because each test builds upon the safety confirmed by the previous one.',
    category: 'Verification',
    difficulty: 'easy',
  },
  {
    id: 'dv21',
    question: 'What live tests must be carried out after dead testing is satisfactorily completed?',
    answer:
      'After all dead tests are satisfactory and the installation is safely energised, the live tests are: (1) earth fault loop impedance (Zs) measurement at the furthest point of each circuit; (2) prospective fault current measurement at the origin and at each distribution board; (3) functional testing of RCDs to confirm they trip within the required time and at the correct current; and (4) verification of phase sequence for polyphase circuits. These confirm the installation will disconnect safely under fault conditions.',
    category: 'Verification',
    difficulty: 'medium',
  },
  {
    id: 'dv22',
    question:
      'What minimum insulation resistance values are acceptable during initial verification of a low-voltage installation?',
    answer:
      'For circuits at nominal voltages up to and including 500V AC, the minimum insulation resistance is 1 megohm when tested at 500V DC, as stated in Table 64.3 of BS 7671:2018+A2:2022. For SELV and PELV circuits up to 50V, the minimum is 0.5 megohms tested at 250V DC. For circuits between 500V and 1000V, the minimum is 1 megohm tested at 1000V DC. Values below these indicate a potential insulation breakdown.',
    category: 'Verification',
    difficulty: 'medium',
  },
  {
    id: 'dv23',
    question: 'What must be verified when testing RCD operation during initial verification?',
    answer:
      'RCD testing must verify that the device trips within the required time at its rated residual operating current (IΔn). For a 30mA general-type RCD, it must trip within 300ms at IΔn and within 40ms at 5 times IΔn. The RCD must not trip at 50% of its rated current. Additionally, the integral test button must be checked to confirm it causes the RCD to trip. These tests confirm the RCD will provide the required protection against electric shock.',
    category: 'Verification',
    difficulty: 'medium',
  },
  {
    id: 'dv24',
    question:
      'Why must measured test values be compared with design values, and what action should be taken if they do not agree?',
    answer:
      'Regulation 643.1 requires that the results of testing be compared with the relevant criteria to verify compliance. Measured values such as Zs and R1+R2 must be compared with the design calculations and the maximum permitted values in BS 7671. If measured values exceed the design values or the tabulated maximums (after applying the temperature correction factor), the installation does not comply. The fault must be identified and rectified, and the circuit retested before it can be certified.',
    category: 'Verification',
    difficulty: 'hard',
  },
  {
    id: 'dv25',
    question:
      'Describe the continuity test procedure for ring final circuit conductors and explain why it is important.',
    answer:
      'The ring final circuit test involves three steps: (1) measure the end-to-end resistance of the line, neutral, and CPC conductors individually (r1, rn, r2); (2) cross-connect line with neutral and measure at each socket to obtain a consistent value of approximately (r1 + rn)/4; (3) cross-connect line with CPC and measure at each socket to obtain R1+R2 values. This test confirms the ring is continuous with no interconnections or spurs where they should not be, and provides the R1+R2 value needed to calculate Zs.',
    category: 'Verification',
    difficulty: 'hard',
  },

  // === Documentation (dv26–dv30) ===
  {
    id: 'dv26',
    question:
      'What documentation must be provided to the person ordering the electrical work upon completion of initial verification?',
    answer:
      'Upon completion, the contractor must provide an Electrical Installation Certificate (EIC) together with a schedule of inspections and a schedule of test results, as required by Regulation 631.1. These documents certify that the installation has been designed, constructed, inspected, and tested in accordance with BS 7671:2018+A2:2022. A copy must be given to the person ordering the work, and the contractor should retain a copy for their own records.',
    category: 'Documentation',
    difficulty: 'easy',
  },
  {
    id: 'dv27',
    question: 'What information must be recorded on a schedule of test results?',
    answer:
      'The schedule of test results must record, for each circuit: the circuit designation, type and rating of protective device, number and size of conductors, reference method, measured R1+R2 or R2 values, insulation resistance readings, polarity confirmation, earth fault loop impedance (Zs), RCD operating time and current, and prospective fault current. Any test values that do not meet the required standards must be clearly identified so that defects can be rectified.',
    category: 'Documentation',
    difficulty: 'medium',
  },
  {
    id: 'dv28',
    question:
      'What is the purpose of the Electrical Installation Certificate (EIC) and who is responsible for signing it?',
    answer:
      'The EIC certifies that the electrical installation work to which it relates has been designed, constructed, inspected, and tested in accordance with BS 7671:2018+A2:2022. It must be signed by a competent person or persons responsible for the design, construction, and inspection and testing respectively. Where one person fulfils all three roles, they sign all three sections. The certificate confirms legal compliance and is required for Building Regulations notification.',
    category: 'Documentation',
    difficulty: 'medium',
  },
  {
    id: 'dv29',
    question:
      'What is the difference between an Electrical Installation Certificate (EIC) and a Minor Electrical Installation Works Certificate (MEIWC)?',
    answer:
      'An EIC is used for new installations, rewires, and significant additions or alterations to existing installations. It requires signatures for design, construction, and inspection and testing. A MEIWC is used for minor works that do not include the provision of a new circuit, such as adding a socket outlet to an existing circuit or replacing a consumer unit like-for-like. The MEIWC is a simpler document but still requires inspection, testing, and recording of results.',
    category: 'Documentation',
    difficulty: 'easy',
  },
  {
    id: 'dv30',
    question:
      'Why must the designer provide details of the design to the person carrying out the inspection and testing, and what specific information should be included?',
    answer:
      'Regulation 132.13 requires that the results of the design be recorded and made available to the person carrying out inspection and testing so that measured values can be compared with calculated design values. This information should include: the type of earthing arrangement, the calculated Zs for each circuit, the PFC at the origin and distribution boards, cable sizes and types selected, protective device ratings and types, and any special requirements for the installation. Without this, the inspector cannot properly verify that the installation meets its design intent.',
    category: 'Documentation',
    difficulty: 'hard',
  },
];
