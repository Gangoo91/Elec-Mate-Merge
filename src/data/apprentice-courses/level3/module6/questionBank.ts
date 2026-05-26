// Level 3 Module 6: Systems Design - Question Bank
// 200 Questions covering electrical design principles, calculations, and protection

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export const module6Questions: Question[] = [
  // Section 6.1: Design Principles (Questions 1-30)
  {
    id: 1,
    question: 'The fundamental objective of electrical installation design is to provide:',
    options: [
      'Set requirements for selecting and erecting equipment',
      'Safety and functionality at reasonable cost',
      'SELV or additional protective measures',
      'I2 ≤ 1.45 × Iz is satisfied for overload protection',
    ],
    correctAnswer: 1,
    explanation:
      'Design must balance safety, functionality, and economic considerations while meeting user requirements.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 2,
    question: 'BS 7671 Chapter 13 deals with:',
    options: [
      'Matched to motor full load current',
      'Balance loads across all three phases',
      'Fundamental principles of design',
      'Phase conductor cross-sectional area',
    ],
    correctAnswer: 2,
    explanation:
      'Chapter 13 sets out the fundamental principles for electrical installation design.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 3,
    question: 'The design process must consider protection against:',
    options: [
      'Metal part not part of installation but liable to introduce potential',
      'Additional or modified requirements beyond standard rules',
      'Common applications like ring finals, radials, and lighting circuits',
      'Electric shock, fire, thermal effects, overcurrent, and voltage disturbances',
    ],
    correctAnswer: 3,
    explanation:
      'Comprehensive design addresses multiple hazards including shock, fire, thermal effects, overcurrent, and voltage issues.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 4,
    question: 'Assessment of general characteristics at the start of design includes:',
    options: [
      'Purpose of installation, supply characteristics, and environmental conditions',
      'Higher ambient temperature, grouping, and thermal insulation',
      'Presence of livestock, dust, moisture, and corrosive atmospheres',
      'Different types have different instantaneous trip levels',
    ],
    correctAnswer: 0,
    explanation:
      'Initial assessment covers purpose, supply details, external influences, and compatibility requirements.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 5,
    question: 'External influences in design refer to:',
    options: [
      'Lower, requiring recalculation of existing circuits',
      'Environmental and utilisation conditions affecting the installation',
      'All zones with very specific equipment and protection requirements',
      'Ensure safe access for future inspection and maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'External influences include ambient conditions, water presence, mechanical factors, and usage patterns.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 6,
    question: 'The maintainability of an installation must be considered during design to:',
    options: [
      'Reduced heat dissipation when cables are installed together',
      'Higher current ratings for same size conductor',
      'Ensure safe access for future inspection and maintenance',
      'Triple-N harmonics add in the neutral rather than cancelling',
    ],
    correctAnswer: 2,
    explanation:
      'Design must allow for safe access to equipment for inspection, testing, and maintenance throughout its life.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 7,
    question: 'Division of an installation into circuits is necessary to:',
    options: [
      'Rods, tapes, plates, foundation electrodes, and structural steel',
      'Additional or modified requirements beyond standard rules',
      'Different types have different instantaneous trip levels',
      'Avoid danger, minimise inconvenience, and meet safety requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Circuit division limits extent of faults, enables isolation for maintenance, and prevents total loss of supply.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 8,
    question: 'Compatibility between devices and the supply should ensure:',
    options: [
      'No harmful effects during normal operation including switching',
      'Simplified representation of circuits and equipment',
      'Not all loads operate simultaneously at full load',
      'Normal operation, foreseeable faults, and misuse',
    ],
    correctAnswer: 0,
    explanation:
      'Equipment must be compatible with supply characteristics and not cause harmful effects on other devices.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 9,
    question: 'Design documentation required by BS 7671 includes:',
    options: [
      'BS 7671, BS EN standards, and product standards',
      'Diagrams, schedules, and calculations as appropriate',
      'Current carrying capacity, voltage drop, and fault protection',
      'All earthing and bonding conductors to the means of earthing',
    ],
    correctAnswer: 1,
    explanation:
      'Adequate documentation must be provided including diagrams, schedules, and design calculations.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 10,
    question: 'When designing for future expansion, the designer should:',
    options: [
      'Normal operation, foreseeable faults, and misuse',
      'Diagrams, schedules, and calculations as appropriate',
      'Allow for reasonably anticipated additions',
      'Energy cable can withstand during fault without damage',
    ],
    correctAnswer: 2,
    explanation:
      'Design should reasonably anticipate future requirements where economically practical.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 11,
    question: 'The concept of diversity in electrical design refers to:',
    options: [
      'Energy cable can withstand during fault without damage',
      'Conductor material and insulation type constant',
      'I2 ≤ 1.45 × Iz is satisfied for overload protection',
      'Not all loads operate simultaneously at full load',
    ],
    correctAnswer: 3,
    explanation:
      'Diversity recognises that not all connected loads operate at full load simultaneously.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 12,
    question: 'Selection of protective measures depends primarily on:',
    options: [
      'The type of earthing system and circuit characteristics',
      'Physical positions of equipment and cable routes',
      'All earthing and bonding conductors to the means of earthing',
      'A decimal or percentage less than 1 (or 100%)',
    ],
    correctAnswer: 0,
    explanation:
      'Protective measures are selected based on earthing system type and specific circuit requirements.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 13,
    question: 'The design current (Ib) of a circuit is:',
    options: [
      'Live parts are not accessible during normal use',
      'The current intended to flow under normal conditions',
      'Usually significantly less than 100A due to diversity',
      'Different power factors affecting total current',
    ],
    correctAnswer: 1,
    explanation:
      'Design current is the current expected to flow in the circuit during normal operation.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 14,
    question: 'British Standards relevant to electrical design include:',
    options: [
      'The current intended to flow under normal conditions',
      'S-type upstream with appropriate current/time discrimination',
      'BS 7671, BS EN standards, and product standards',
      'Transformer impedance effect on fault current',
    ],
    correctAnswer: 2,
    explanation:
      'Design must comply with BS 7671 plus relevant product and installation standards.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 15,
    question: 'Risk assessment in electrical design helps to:',
    options: [
      'Connected equipment VA rating and power factor',
      'Understanding how devices respond to different fault levels',
      'Underground and external installations requiring mechanical protection',
      'Identify hazards and implement appropriate control measures',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessment identifies potential hazards and ensures appropriate protective measures are included in design.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 16,
    question: 'The designer must verify that the supply is adequate for the:',
    options: [
      'Maximum demand, fault current, and operating characteristics',
      'Common applications like ring finals, radials, and lighting circuits',
      '1.8 × lamp watts / voltage to allow for control gear',
      'Integrated design information and coordination with other services',
    ],
    correctAnswer: 0,
    explanation:
      'Design must confirm supply can meet maximum demand and protective devices have adequate ratings.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 17,
    question: 'Electromagnetic compatibility (EMC) in design ensures:',
    options: [
      "Safe access, working space, and emergency escape",
      "Equipment doesn't cause or suffer from electromagnetic interference",
      "Live parts are not accessible during normal use",
      "Integrated design information and coordination with other services",
    ],
    correctAnswer: 1,
    explanation:
      'EMC considerations prevent electromagnetic interference problems between equipment and external sources.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 18,
    question: 'The purpose of Chapter 51 in BS 7671 regarding design is to:',
    options: [
      'Hazards and mitigation measures incorporated in design',
      'Consider whether PME conditions permit extension or TT is needed',
      'Set requirements for selecting and erecting equipment',
      'Presence of livestock, dust, moisture, and corrosive atmospheres',
    ],
    correctAnswer: 2,
    explanation:
      'Chapter 51 provides rules for selecting and erecting electrical equipment appropriately.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 19,
    question: 'Designing for safety requires considering:',
    options: [
      'They are metal and within the building',
      'Main earthing terminal to means of earthing',
      'High inrush loads like transformers and X-ray equipment',
      'Normal operation, foreseeable faults, and misuse',
    ],
    correctAnswer: 3,
    explanation:
      'Safety design covers normal operation, reasonably foreseeable faults, and potential misuse scenarios.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 20,
    question: 'The importance of coordination between designer and installer is:',
    options: [
      'Essential to ensure design intent is correctly implemented',
      'Set requirements for selecting and erecting equipment',
      'External earth fault loop impedance from supply',
      'No harmful effects during normal operation including switching',
    ],
    correctAnswer: 0,
    explanation:
      'Close coordination ensures the installation matches design requirements and any deviations are properly assessed.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 21,
    question: 'Design must ensure electrical equipment is accessible for:',
    options: [
      'Reduced heat dissipation when cables are installed together',
      'Operation, inspection, maintenance, and repair',
      'Energy cable can withstand during fault without damage',
      'Allow starting current while protecting against faults',
    ],
    correctAnswer: 1,
    explanation:
      'Accessibility is required for all operational and maintenance activities throughout equipment life.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 22,
    question: 'Energy efficiency in electrical design is addressed by:',
    options: [
      'V = I × R (ignoring reactance for small cables)',
      'Apparent power (VA) is greater than true power (W) for reactive loads',
      'Selecting efficient equipment and optimising circuit arrangements',
      'Using time-delayed (S-type) and higher rated RCDs upstream',
    ],
    correctAnswer: 2,
    explanation:
      'Energy efficiency includes equipment selection, power factor, voltage drop, and circuit optimisation.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 23,
    question: 'The protection against basic protection (direct contact) in design ensures:',
    options: [
      'During business hours when most systems operate',
      'Motor circuits and equipment with moderate inrush current',
      'All extraneous and exposed-conductive-parts within zones',
      'Live parts are not accessible during normal use',
    ],
    correctAnswer: 3,
    explanation:
      'Basic protection prevents contact with live parts during normal operation and use.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 24,
    question: 'Fault protection (protection against indirect contact) in design ensures:',
    options: [
      'Automatic disconnection or other measures prevent shock from exposed-conductive-parts',
      'Dedicated circuits with RCD protection and appropriate equipment',
      'Water proximity, floating equipment, and maritime conditions',
      'Ensure RCD operates within required time (typically Ra×IΔn ≤ 50V)',
    ],
    correctAnswer: 0,
    explanation:
      'Fault protection ensures automatic disconnection or equivalent measures protect against indirect contact.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 25,
    question: 'Design verification before construction should confirm:',
    options: [
      'They are metal and within the building',
      'The design meets BS 7671 and client requirements',
      'High inrush loads like transformers and X-ray equipment',
      'Motor circuits and equipment with moderate inrush current',
    ],
    correctAnswer: 1,
    explanation:
      'Design must be verified for BS 7671 compliance and meeting client specifications before work starts.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 26,
    question: 'Selecting equipment for design requires considering:',
    options: [
      'Different power factors affecting total current',
      'Adequate illumination, duration, and reliability during emergencies',
      'Voltage, current, frequency, power, and environmental conditions',
      'Documented and verified for continued compliance',
    ],
    correctAnswer: 2,
    explanation:
      'Equipment selection considers electrical ratings, environmental conditions, and application requirements.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 27,
    question: 'The responsibility for electrical design ultimately rests with:',
    options: [
      'Equipment doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t cause or suffer from electromagnetic interference',
      'Undersized - design current exceeds cable capacity',
      'Safety and functionality at reasonable cost',
      'The designer/contractor who signs the design certificate',
    ],
    correctAnswer: 3,
    explanation: 'The designer who signs Part 1 of the EIC takes responsibility for the design.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 28,
    question: 'Standard circuit arrangements exist for:',
    options: [
      'Common applications like ring finals, radials, and lighting circuits',
      'Consider whether PME conditions permit extension or TT is needed',
      'Need larger cross-section due to lower conductivity',
      'Apparent power (VA) is greater than true power (W) for reactive loads',
    ],
    correctAnswer: 0,
    explanation:
      'Standard arrangements exist for common circuits though variations may be needed for specific requirements.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 29,
    question: 'Design considerations for special locations in Part 7 of BS 7671 require:',
    options: [
      'Avoid danger, minimise inconvenience, and meet safety requirements',
      'Additional or modified requirements beyond standard rules',
      'Sufficient information to verify design and enable safe operation',
      'An upstream device clears a fault if the closer device fails',
    ],
    correctAnswer: 1,
    explanation:
      'Part 7 special locations require additional or modified protective measures beyond standard requirements.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 30,
    question: 'The design process typically includes which sequence?',
    options: [
      '500W per m² or similar rules of thumb',
      'Performance requirements and standards to be met',
      'Assess > Calculate > Select > Document',
      'Different power factors affecting total current',
    ],
    correctAnswer: 2,
    explanation:
      'Design follows logical sequence: assess requirements, calculate parameters, select equipment, document design.',
    section: '6.1',
    difficulty: 'basic',
  },

  // Section 6.2: Load Calculations (Questions 31-65)
  {
    id: 31,
    question: 'Maximum demand is defined as:',
    options: [
      'Equipment types, ratings, and locations',
      'Higher ambient temperature, grouping, and thermal insulation',
      'High inrush loads like transformers and X-ray equipment',
      'Maximum expected load taking diversity into account',
    ],
    correctAnswer: 3,
    explanation: 'Maximum demand is the highest load expected considering diversity factors.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 32,
    question:
      'For a domestic ring final circuit, the assumed maximum current per socket is typically:',
    options: [
      'Based on diversity, often 10-13A for assumed current',
      'At least 8kA (typically use 10kA rated device)',
      'Protection against overheating and mechanical damage',
      'Live parts are not accessible during normal use',
    ],
    correctAnswer: 0,
    explanation:
      'Ring circuits use diversity assumptions where not all sockets operate at full 13A simultaneously.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 33,
    question: 'Diversity factor is expressed as:',
    options: [
      'Ensuring cables and equipment survive fault conditions',
      'A decimal or percentage less than 1 (or 100%)',
      'Assess > Calculate > Select > Document',
      'Balance loads across all three phases',
    ],
    correctAnswer: 1,
    explanation:
      'Diversity factor is typically less than 1 (or less than 100%) as not all loads operate at full capacity simultaneously.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 34,
    question: 'The formula for calculating current from single-phase power is:',
    options: [
      'Balance loads across all three phases',
      'Conductor material and insulation type constant',
      'I = P / (V × pf) for power factor loads',
      'Heat dissipation varies with installation method',
    ],
    correctAnswer: 2,
    explanation:
      'For single-phase loads: I = P / (V × power factor), or I = P / V for purely resistive loads.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 35,
    question: 'For three-phase balanced loads, line current is calculated using:',
    options: [
      'I = P / V',
      'I = P × 3',
      'I = P / (3 × V)',
      'I = P / (√3 × VL × pf)',
    ],
    correctAnswer: 3,
    explanation: 'Three-phase balanced load current: I = P / (√3 × VL × power factor).',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 36,
    question: 'A 3kW heater at 230V draws approximately:',
    options: [
      '13A',
      '3A',
      '30A',
      '100A',
    ],
    correctAnswer: 0,
    explanation: 'I = P/V = 3000/230 = 13A approximately.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 37,
    question: 'When calculating load for a domestic cooker circuit, diversity allows for:',
    options: [
      'Both higher rating AND time delay allow downstream to operate first',
      '10A plus 30% of remainder over 10A plus socket allowance',
      'Safety and functionality at reasonable cost',
      'Conductor resistance increases with temperature',
    ],
    correctAnswer: 1,
    explanation: 'Cooker diversity calculation: first 10A + 30% of balance + 5A if socket fitted.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 38,
    question: 'An electric shower rated at 10.8kW requires minimum design current of:',
    options: [
      '32A',
      '50A',
      '47A',
      '100A',
    ],
    correctAnswer: 2,
    explanation: 'I = 10800/230 = 47A. This typically requires a 50A circuit.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 39,
    question: 'For motor starting current considerations, design should allow for:',
    options: [
      'Performance requirements and standards to be met',
      'Metalwork each side may need individual bonding',
      'Usually significantly less than 100A due to diversity',
      'Starting current which can be 6-8 times full load',
    ],
    correctAnswer: 3,
    explanation:
      'Motor starting currents are significantly higher than running current and must be considered in design.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 40,
    question: 'Lighting load calculations for domestic premises typically allow:',
    options: [
      '66W per outlet minimum or actual load if higher',
      'V = I × R (ignoring reactance for small cables)',
      'I = P / (V × pf) for power factor loads',
      'BS 7671, BS EN standards, and product standards',
    ],
    correctAnswer: 0,
    explanation: 'Minimum 66W per lighting outlet or actual connected load, whichever is greater.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 41,
    question: 'Power factor affects load calculations because:',
    options: [
      'Downstream devices with lower breaking capacity if properly coordinated with upstream',
      'Apparent power (VA) is greater than true power (W) for reactive loads',
      'Equipment doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t cause or suffer from electromagnetic interference',
      'Undersized - design current exceeds cable capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Poor power factor means higher apparent power and current for the same true power output.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 42,
    question: 'If power factor is 0.8, and true power is 8kW, the apparent power is:',
    options: [
      '6.4kVA',
      '64kVA',
      '10kVA',
      '8kVA',
    ],
    correctAnswer: 2,
    explanation: 'S = P/pf = 8000/0.8 = 10000VA = 10kVA.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 43,
    question: 'For small office/commercial premises, socket outlet loads often assume:',
    options: [
      'Future expansion and operating margins',
      'Swimming pools with zone requirements',
      'For the life of the installation',
      '500W per m² or similar rules of thumb',
    ],
    correctAnswer: 3,
    explanation:
      'Commercial estimates often use W/m² or assumed loads per outlet depending on use type.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 44,
    question: 'The total connected load of a circuit is:',
    options: [
      'Sum of all equipment ratings connected to the circuit',
      'Scheduling non-essential loads away from peak times',
      'Maximum demand, fault current, and operating characteristics',
      'Current carrying capacity, voltage drop, and fault protection',
    ],
    correctAnswer: 0,
    explanation:
      'Total connected load is the sum of all equipment ratings without applying diversity.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 45,
    question: 'EV charger load calculations should consider:',
    options: [
      'BS 7671, BS EN standards, and product standards',
      'Full rated current with limited diversity',
      'A decimal or percentage less than 1 (or 100%)',
      'Scheduling non-essential loads away from peak times',
    ],
    correctAnswer: 1,
    explanation:
      'EV chargers typically have limited diversity applied as they often operate simultaneously at full load.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 46,
    question: 'Heat pump load calculations must account for:',
    options: [
      'Zero for perfectly balanced loads',
      'A decimal or percentage less than 1 (or 100%)',
      'Both heating and cooling loads where applicable',
      'BS 7671, BS EN standards, and product standards',
    ],
    correctAnswer: 2,
    explanation:
      'Heat pumps may have different loads in heating vs cooling modes - both should be considered.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 47,
    question:
      'For a circuit supplying multiple discharge lighting fittings, the current should be calculated as:',
    options: [
      'Avoid danger, minimise inconvenience, and meet safety requirements',
      'High frequency content affecting RCD operation and coordination',
      'Normal operation, foreseeable faults, and misuse',
      '1.8 × lamp watts / voltage to allow for control gear',
    ],
    correctAnswer: 3,
    explanation:
      'Discharge lighting current calculation multiplies by 1.8 to account for control gear and power factor.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 48,
    question: 'A commercial kitchen with multiple cooking appliances would typically use:',
    options: [
      'Diversity factors based on simultaneous use probability',
      'Undersized - design current exceeds cable capacity',
      'All extraneous and exposed-conductive-parts within zones',
      'Common applications like ring finals, radials, and lighting circuits',
    ],
    correctAnswer: 0,
    explanation:
      'Commercial kitchen diversity considers which appliances operate together during peak service.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 49,
    question: 'LED lighting loads compared to equivalent fluorescent loads are typically:',
    options: [
      'Hazards and mitigation measures incorporated in design',
      'Lower, requiring recalculation of existing circuits',
      'Separate neutral and earth conductors from source',
      'Suitable for the environment and adequately protected',
    ],
    correctAnswer: 1,
    explanation:
      'LED loads are usually lower than equivalent fluorescent, potentially allowing circuit optimisation.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 50,
    question: 'When converting single-phase loads to three-phase supply, the goal is to:',
    options: [
      'Earth fault return path for each circuit',
      'Allow for reasonably anticipated additions',
      'Balance loads across all three phases',
      'Safety and functionality at reasonable cost',
    ],
    correctAnswer: 2,
    explanation:
      'Three-phase design should balance single-phase loads across phases to prevent neutral overload.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 51,
    question: 'Spare capacity in load calculations is desirable for:',
    options: [
      '66W per outlet minimum or actual load if higher',
      'Clearly identified and accessible',
      'Add EV charger load with appropriate diversity',
      'Future expansion and operating margins',
    ],
    correctAnswer: 3,
    explanation:
      'Reasonable spare capacity allows for future additions and prevents operation at maximum limits.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 52,
    question: 'In a dwelling with 100A supply, typical maximum demand calculation produces:',
    options: [
      'Usually significantly less than 100A due to diversity',
      'Combined PEN from supply, separate in installation',
      'Future expansion and operating margins',
      'Connected equipment VA rating and power factor',
    ],
    correctAnswer: 0,
    explanation:
      'Domestic diversity means actual maximum demand is typically much less than total connected load.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 53,
    question: 'Standby generator sizing should be based on:',
    options: [
      'Information for safe operation and maintenance of the installation',
      'Essential loads maximum demand plus starting currents',
      'Energy cable can withstand during fault without damage',
      'Different power factors affecting total current',
    ],
    correctAnswer: 1,
    explanation:
      'Generator sizing considers essential loads, starting requirements, and load sequencing.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 54,
    question: 'For water heating by immersion, typical load is:',
    options: [
      '500W',
      '10kW',
      '3kW standard element',
      '100W',
    ],
    correctAnswer: 2,
    explanation: 'Standard immersion heaters are typically 3kW, though other ratings exist.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 55,
    question: 'UPS load calculations must consider:',
    options: [
      'Extraneous-conductive-parts to main earthing terminal',
      'BS 7671, BS EN standards, and product standards',
      'The designer/contractor who signs the design certificate',
      'Connected equipment VA rating and power factor',
    ],
    correctAnswer: 3,
    explanation:
      'UPS sizing considers connected equipment VA ratings, power factor, and required backup duration.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 56,
    question: 'Data centre load calculations are typically based on:',
    options: [
      'W/m² with little diversity due to continuous high loads',
      'Allow for reasonably anticipated additions',
      'High frequency content affecting RCD operation and coordination',
      'Starting current and protection coordination',
    ],
    correctAnswer: 0,
    explanation:
      'Data centres have high continuous loads with limited diversity - often calculated per rack or m².',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 57,
    question: 'Peak demand in commercial buildings typically occurs:',
    options: [
      'Diversity factors based on simultaneous use probability',
      'During business hours when most systems operate',
      'Areas with specific equipment and protection requirements',
      'Metalwork each side may need individual bonding',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial peak demand usually aligns with business hours when HVAC, lighting, and equipment operate.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 58,
    question: 'When combining resistive and motor loads, the calculation must account for:',
    options: [
      'Not all loads operate simultaneously at full load',
      'Performance requirements and standards to be met',
      'Different power factors affecting total current',
      'I2 ≤ 1.45 × Iz is satisfied for overload protection',
    ],
    correctAnswer: 2,
    explanation:
      'Motor and resistive loads have different power factors affecting combined calculations.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 59,
    question: 'The formula P = V²/R shows that for a fixed resistance, power varies with:',
    options: [
      'Current only',
      'Independently of voltage',
      'Voltage linearly',
      'Square of voltage',
    ],
    correctAnswer: 3,
    explanation:
      'Power varies with the square of voltage for fixed resistance - voltage changes have significant effect.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 60,
    question:
      'For calculating neutral current in a three-phase four-wire system with balanced loads:',
    options: [
      'Zero for perfectly balanced loads',
      'Future expansion and operating margins',
      'Fundamental principles of design',
      'SELV or additional protective measures',
    ],
    correctAnswer: 0,
    explanation:
      'With balanced three-phase loads, phase currents cancel and neutral current is theoretically zero.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 61,
    question: 'Harmonic currents affect neutral sizing because:',
    options: [
      'Sufficient information to verify design and enable safe operation',
      'Triple-N harmonics add in the neutral rather than cancelling',
      'All earthing and bonding conductors to the means of earthing',
      'Motor circuits and equipment with moderate inrush current',
    ],
    correctAnswer: 1,
    explanation:
      "Third order (triple-N) harmonics don't cancel in the neutral and can cause significant neutral currents.",
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 62,
    question: 'A three-phase motor rated at 15kW, 0.85pf, 400V draws approximately:',
    options: [
      '38A',
      '22A',
      '25A',
      '50A',
    ],
    correctAnswer: 2,
    explanation: 'I = 15000/(√3 × 400 × 0.85) = 25.4A approximately.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 63,
    question: 'When calculating demand for dwellings with electric vehicle charging:',
    options: [
      'The design meets BS 7671 and client requirements',
      'Multiplying all applicable factors together',
      'Set requirements for selecting and erecting equipment',
      'Add EV charger load with appropriate diversity',
    ],
    correctAnswer: 3,
    explanation:
      'EV charger load should be added with consideration of charging patterns and potential diversity with other loads.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 64,
    question: 'Demand-side response systems can reduce peak demand by:',
    options: [
      'Scheduling non-essential loads away from peak times',
      'S-type upstream with appropriate current/time discrimination',
      'Installation earth electrode separate from supply earth',
      'Specific attention to public safety and frequent inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Demand-side management schedules flexible loads to reduce peak demand and improve load factor.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 65,
    question: 'A good load factor (ratio of average to peak demand) indicates:',
    options: [
      'Common applications like ring finals, radials, and lighting circuits',
      'Consistent load profile making efficient use of capacity',
      'Upstream devices to wait for downstream to clear faults',
      'Apparent power (VA) is greater than true power (W) for reactive loads',
    ],
    correctAnswer: 1,
    explanation:
      'High load factor indicates consistent demand and efficient use of installed capacity.',
    section: '6.2',
    difficulty: 'intermediate',
  },

  // Section 6.3: Cable Selection (Questions 66-100)
  {
    id: 66,
    question: 'The three main factors for cable sizing are:',
    options: [
      'All zones with very specific equipment and protection requirements',
      'Main earthing terminal to means of earthing',
      'Current carrying capacity, voltage drop, and fault protection',
      'All earthing and bonding conductors to the means of earthing',
    ],
    correctAnswer: 2,
    explanation:
      'Cables must carry design current, limit voltage drop, and allow protective devices to operate correctly.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 67,
    question: 'The relationship between cable sizing requirements is: Ib ≤ In ≤ Iz, where:',
    options: [
      'Provide a path for fault currents and limit touch voltages',
      'Environmental and utilisation conditions affecting the installation',
      'The type of earthing system and circuit characteristics',
      'Ib is design current, In is device rating, Iz is cable capacity',
    ],
    correctAnswer: 3,
    explanation:
      'Design current ≤ protective device rating ≤ cable current carrying capacity under installation conditions.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 68,
    question: 'Derating factors (correction factors) reduce cable capacity for:',
    options: [
      'Higher ambient temperature, grouping, and thermal insulation',
      'Live parts are not accessible during normal use',
      'Add EV charger load with appropriate diversity',
      'Adequate illumination, duration, and reliability during emergencies',
    ],
    correctAnswer: 0,
    explanation:
      'Derating accounts for conditions that reduce heat dissipation: high temperature, grouped cables, thermal insulation.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 69,
    question:
      'If ambient temperature correction factor (Ca) is 0.87 and a cable has tabulated rating of 27A, the derated capacity is:',
    options: [
      '31A',
      '23.5A',
      '27A unchanged',
      '40A',
    ],
    correctAnswer: 1,
    explanation: 'Derated capacity = 27 × 0.87 = 23.49A approximately.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 70,
    question: 'Grouping factor (Cg) accounts for:',
    options: [
      'Avoid danger, minimise inconvenience, and meet safety requirements',
      'Combined PEN from supply, separate in installation',
      'Reduced heat dissipation when cables are installed together',
      'Using time-delayed (S-type) and higher rated RCDs upstream',
    ],
    correctAnswer: 2,
    explanation:
      'Grouped cables dissipate heat less effectively, requiring derating via grouping factor.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 71,
    question: 'Cables installed in thermal insulation must be derated using factor (Ci) because:',
    options: [
      'Reduce actual fault current by fast operation before peak',
      'Both higher rating AND time delay allow downstream to operate first',
      'Separate neutral and earth conductors from source',
      'Heat cannot dissipate effectively through thermal insulation',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal insulation significantly reduces heat dissipation, requiring substantial derating.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 72,
    question:
      'For a cable completely surrounded by thermal insulation over 0.5m, the factor (Ci) is:',
    options: [
      '0.5',
      '1.0',
      '0.88',
      '0.75',
    ],
    correctAnswer: 0,
    explanation: 'Cable completely surrounded by thermal insulation requires 0.5 (50%) derating.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 73,
    question: 'Voltage drop in cables is calculated using:',
    options: [
      'Conductor resistance increases with temperature',
      'V = I × R (ignoring reactance for small cables)',
      '1.8 × lamp watts / voltage to allow for control gear',
      'Combined PEN from supply, separate in installation',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage drop uses mV/A/m values from tables incorporating resistance (and reactance for larger cables).',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 74,
    question: 'The maximum recommended voltage drop from origin to load for lighting circuits is:',
    options: [
      '10%',
      '5%',
      '3%',
      '8%',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 recommends maximum 3% voltage drop for lighting circuits.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 75,
    question: 'For a circuit with Ib=25A, and derated cable capacity of 24A, the cable is:',
    options: [
      'S-type upstream with appropriate current/time discrimination',
      'Provides earthing for equipment operation rather than safety',
      'Protection against overheating and mechanical damage',
      'Undersized - design current exceeds cable capacity',
    ],
    correctAnswer: 3,
    explanation:
      'Cable is undersized: Ib (25A) must be ≤ Iz (24A derated). A larger cable is needed.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 76,
    question: 'The mV/A/m value for voltage drop calculations is:',
    options: [
      'Varies with cable size and construction - from tables',
      'Correctly rated socket outlets with RCD protection at pitch',
      'An upstream device clears a fault if the closer device fails',
      'At least 1.6 times the downstream fuse rating',
    ],
    correctAnswer: 0,
    explanation:
      'mV/A/m values vary with cable size and type - found in BS 7671 Appendix 4 tables.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 77,
    question: 'For a 30m cable run carrying 20A with mV/A/m of 18, the voltage drop is:',
    options: [
      '1.08V',
      '10.8V',
      '108V',
      '0.108V',
    ],
    correctAnswer: 1,
    explanation: 'VD = (mV/A/m × I × L)/1000 = (18 × 20 × 30)/1000 = 10.8V.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 78,
    question: 'Adiabatic equation for protective conductor sizing uses:',
    options: [
      'Essential loads maximum demand plus starting currents',
      'Long-time, short-time, instantaneous, and ground fault settings',
      'S = √(I²t)/k relating fault current, time, and conductor constant',
      'Appropriate connection means and protective measures',
    ],
    correctAnswer: 2,
    explanation:
      'Adiabatic equation S = √(I²t)/k calculates minimum CPC size from fault current and disconnection time.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 79,
    question: 'Reference installation methods in BS 7671 affect cable ratings because:',
    options: [
      'Safety and functionality at reasonable cost',
      'I2 ≤ 1.45 × Iz is satisfied for overload protection',
      'All extraneous and exposed-conductive-parts within zones',
      'Heat dissipation varies with installation method',
    ],
    correctAnswer: 3,
    explanation:
      'Different installation methods have different heat dissipation characteristics affecting current capacity.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 80,
    question:
      'Installation method C (clipped direct) typically has higher ratings than method A (enclosed) because:',
    options: [
      'Direct clipping allows better heat dissipation than enclosures',
      'IT systems, equipotential bonding, and power supply reliability',
      'All zones with very specific equipment and protection requirements',
      'Different types have different instantaneous trip levels',
    ],
    correctAnswer: 0,
    explanation:
      'Clipped direct cables dissipate heat more effectively than enclosed cables, allowing higher ratings.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 81,
    question: 'SWA (Steel Wire Armoured) cable is typically used for:',
    options: [
      'Upstream devices to wait for downstream to clear faults',
      'Underground and external installations requiring mechanical protection',
      'Installation earth electrode separate from supply earth',
      'S-type upstream with appropriate current/time discrimination',
    ],
    correctAnswer: 1,
    explanation:
      'SWA provides mechanical protection suitable for direct burial and external installation.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 82,
    question: 'XLPE insulation on cables allows higher operating temperature than PVC, meaning:',
    options: [
      'Multiplying all applicable factors together',
      'Reduced voltage, RCD protection, and robust equipment',
      'Higher current ratings for same size conductor',
      'Safety and functionality at reasonable cost',
    ],
    correctAnswer: 2,
    explanation:
      "XLPE's higher temperature rating (90°C vs 70°C for PVC) allows higher current capacity.",
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 83,
    question:
      'For earth fault protection, the cable/device combination must ensure disconnection within:',
    options: [
      'Single line diagrams, settings, and coordination curves',
      'Provide a path for fault currents and limit touch voltages',
      'Electric shock, fire, thermal effects, overcurrent, and voltage disturbances',
      'The time specified for the circuit type (0.4s for final, 5s for distribution)',
    ],
    correctAnswer: 3,
    explanation:
      'Disconnection time limits depend on circuit type: 0.4s for ≤32A final circuits, 5s for distribution.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 84,
    question: "The 'k' value in CPC sizing calculations represents:",
    options: [
      'Conductor material and insulation type constant',
      'Analysis of time-current curves to ensure proper sequence',
      'High inrush loads like transformers and X-ray equipment',
      'Use the larger cable that meets both requirements',
    ],
    correctAnswer: 0,
    explanation:
      'k is a constant depending on conductor material (copper/aluminium) and insulation type.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 85,
    question: 'When voltage drop and current capacity require different cable sizes:',
    options: [
      'Maximum demand, fault current, and operating characteristics',
      'Use the larger cable that meets both requirements',
      'Use fire resistant cables and follow BS 5839 requirements',
      'Risk of shock is increased, such as bathrooms',
    ],
    correctAnswer: 1,
    explanation:
      'The cable must meet BOTH requirements, so use the larger of the two calculated sizes.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 86,
    question: 'Aluminium conductors compared to copper for the same current capacity:',
    options: [
      'Complex commercial/industrial installations',
      'Water proximity, floating equipment, and maritime conditions',
      'Need larger cross-section due to lower conductivity',
      'Within 600mm of meter, consumer side',
    ],
    correctAnswer: 2,
    explanation:
      'Aluminium has lower conductivity than copper, requiring larger sizes for equivalent capacity.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 87,
    question: 'Fire performance of cables (e.g., fire resistant, LSHF) affects selection for:',
    options: [
      'Usually significantly less than 100A due to diversity',
      'The designer/contractor who signs the design certificate',
      'Maximum expected load taking diversity into account',
      'Emergency circuits, escape routes, and fire spread prevention',
    ],
    correctAnswer: 3,
    explanation:
      'Fire performance requirements apply to emergency systems and where fire/smoke spread must be limited.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 88,
    question: 'Flexible cables are typically rated for:',
    options: [
      'Connections to moving equipment or where flexibility is needed',
      'Ensure safe access for future inspection and maintenance',
      'Weather exposure, IP rating, and mechanical protection',
      'Physical positions of equipment and cable routes',
    ],
    correctAnswer: 0,
    explanation:
      'Flexible cables suit applications requiring movement or flexibility in connection.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 89,
    question: 'Combined correction factors for cable sizing are calculated by:',
    options: [
      'BS 7671, BS EN standards, and product standards',
      'Multiplying all applicable factors together',
      'Matched to motor full load current',
      'Scheduling non-essential loads away from peak times',
    ],
    correctAnswer: 1,
    explanation:
      'Overall correction factor = Ca × Cg × Ci × Cc (all applicable factors multiplied).',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 90,
    question:
      'If multiple correction factors are 0.94, 0.82, and 0.75, the combined factor is approximately:',
    options: [
      '2.51',
      '0.94',
      '0.58',
      '0.75',
    ],
    correctAnswer: 2,
    explanation: 'Combined = 0.94 × 0.82 × 0.75 = 0.578 (approximately 0.58).',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 91,
    question: 'Cable sizing for motor circuits should additionally consider:',
    options: [
      'The designer/contractor who signs the design certificate',
      'Diagrams, schedules, and calculations as appropriate',
      'Not all loads operate simultaneously at full load',
      'Starting current and protection coordination',
    ],
    correctAnswer: 3,
    explanation:
      'Motor cables must handle starting currents and coordinate with motor protection devices.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 92,
    question: 'Ring final circuit cables are typically 2.5mm² because:',
    options: [
      'Two parallel paths share the current, adequately sized for 32A protection',
      'Apparent power (VA) is greater than true power (W) for reactive loads',
      'Set requirements for selecting and erecting equipment',
      'Triple-N harmonics add in the neutral rather than cancelling',
    ],
    correctAnswer: 0,
    explanation:
      'Ring arrangement creates two parallel paths, so 2.5mm² adequately carries half the current in each leg.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 93,
    question: 'For circuits in potentially explosive atmospheres, cable selection must:',
    options: [
      'Conductor material and insulation type constant',
      'Meet specific requirements for hazardous area classification',
      'Weather exposure, IP rating, and mechanical protection',
      'Safe access, working space, and emergency escape',
    ],
    correctAnswer: 1,
    explanation:
      'Hazardous areas require cables and equipment certified for the specific zone classification.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 94,
    question: 'Cable volt drop at operating temperature differs from cold because:',
    options: [
      'At least 10mm² copper or 16mm² aluminium minimum',
      'Diagrams, schedules, and calculations as appropriate',
      'Conductor resistance increases with temperature',
      'During business hours when most systems operate',
    ],
    correctAnswer: 2,
    explanation:
      'Conductor resistance increases with temperature, affecting voltage drop calculations.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 95,
    question: 'For circuits protected by BS 88 fuses, the cable must be sized so that:',
    options: [
      'Ensure safe access for future inspection and maintenance',
      'Selecting efficient equipment and optimising circuit arrangements',
      'Operation, inspection, maintenance, and repair',
      'I2 ≤ 1.45 × Iz is satisfied for overload protection',
    ],
    correctAnswer: 3,
    explanation:
      "Cable must be protected so I2 (fuse operation current) doesn't exceed 1.45 times cable capacity.",
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 96,
    question: 'Conduit fill calculations ensure:',
    options: [
      'Cables can be drawn in without damage and heat dissipation is adequate',
      'Energy cable can withstand during fault without damage',
      'Integrated design information and coordination with other services',
      'Each device rated for full prospective fault current at its location',
    ],
    correctAnswer: 0,
    explanation:
      'Conduit capacity limits prevent installation damage and ensure adequate heat dissipation.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 97,
    question: 'Busbars are typically used instead of cables when:',
    options: [
      'Ensuring cables and equipment survive fault conditions',
      'High currents require more effective heat dissipation and connections',
      'Using time-delayed (S-type) and higher rated RCDs upstream',
      'Usually significantly less than 100A due to diversity',
    ],
    correctAnswer: 1,
    explanation:
      'Busbars suit high current applications where heat management and connections benefit from busbar systems.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 98,
    question: 'Cable ratings in BS 7671 tables assume:',
    options: [
      'Voltage, current, frequency, power, and environmental conditions',
      'The type of earthing system and circuit characteristics',
      'Specific reference conditions including 30°C ambient',
      'Diagrams, schedules, and calculations as appropriate',
    ],
    correctAnswer: 2,
    explanation:
      'Tabulated ratings assume reference conditions - typically 30°C ambient - requiring correction for other conditions.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 99,
    question: 'For long cable runs, the dominant sizing factor is usually:',
    options: [
      'Current capacity',
      'Appearance',
      'Fault capacity',
      'Voltage drop',
    ],
    correctAnswer: 3,
    explanation:
      'Long runs often require upsizing for voltage drop even when current capacity is adequate.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 100,
    question: 'The minimum cross-sectional area for protective conductors in most circuits is:',
    options: [
      'Related to phase conductor size per Table 54.7 or calculation',
      'Voltage, current, frequency, power, and environmental conditions',
      'Undersized - design current exceeds cable capacity',
      'Documented and verified for continued compliance',
    ],
    correctAnswer: 0,
    explanation:
      'CPC minimum size relates to phase conductor size via Table 54.7 or adiabatic calculation.',
    section: '6.3',
    difficulty: 'intermediate',
  },

  // Section 6.4: Protection Coordination (Questions 101-130)
  {
    id: 101,
    question: 'Protection coordination (discrimination) means:',
    options: [
      'Common applications like ring finals, radials, and lighting circuits',
      'Only the device nearest the fault operates, leaving other circuits unaffected',
      'Correctly rated socket outlets with RCD protection at pitch',
      'Voltage, current, frequency, power, and environmental conditions',
    ],
    correctAnswer: 1,
    explanation:
      'Discrimination ensures the protective device closest to the fault operates first, maintaining supply elsewhere.',
    section: '6.4',
    difficulty: 'basic',
  },
  {
    id: 102,
    question: 'Back-up protection occurs when:',
    options: [
      'Metalwork each side may need individual bonding',
      'Fast-acting devices and arc-resistant equipment where appropriate',
      'An upstream device clears a fault if the closer device fails',
      'High inrush loads like transformers and X-ray equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Back-up protection provides secondary protection if the primary device fails to operate.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 103,
    question: 'Time-current characteristics of protective devices are important for:',
    options: [
      'Metalwork each side may need individual bonding',
      'Multiplying all applicable factors together',
      'Not all loads operate simultaneously at full load',
      'Understanding how devices respond to different fault levels',
    ],
    correctAnswer: 3,
    explanation:
      'Time-current curves show operating time at different current levels, essential for coordination.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 104,
    question: 'For fuses to discriminate, the upstream fuse rating should typically be:',
    options: [
      'At least 1.6 times the downstream fuse rating',
      'Allow starting current while protecting against faults',
      'Undersized - design current exceeds cable capacity',
      'The current intended to flow under normal conditions',
    ],
    correctAnswer: 0,
    explanation:
      'Fuse discrimination typically requires upstream rating to be at least 1.6× (often 2×) downstream.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 105,
    question: 'MCB type (B, C, D) affects coordination because:',
    options: [
      'Live parts are not accessible during normal use',
      'Different types have different instantaneous trip levels',
      '66W per outlet minimum or actual load if higher',
      'Extraneous-conductive-parts to main earthing terminal',
    ],
    correctAnswer: 1,
    explanation:
      'MCB types trip at different multiples of rated current (B:3-5×, C:5-10×, D:10-20×).',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 106,
    question: 'Type B MCBs trip instantaneously between:',
    options: [
      '1-2 times In',
      '5-10 times In',
      '3-5 times In',
      '10-20 times In',
    ],
    correctAnswer: 2,
    explanation: 'Type B MCBs have instantaneous magnetic trip between 3× and 5× rated current.',
    section: '6.4',
    difficulty: 'basic',
  },
  {
    id: 107,
    question: 'Type C MCBs are typically used for:',
    options: [
      'Normal operation, foreseeable faults, and misuse',
      'Diagrams, schedules, and calculations as appropriate',
      'Allow for reasonably anticipated additions',
      'Motor circuits and equipment with moderate inrush current',
    ],
    correctAnswer: 3,
    explanation:
      'Type C (5-10× trip) suits motor circuits and equipment with higher inrush currents.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 108,
    question: 'Type D MCBs are appropriate for:',
    options: [
      'High inrush loads like transformers and X-ray equipment',
      'Earth fault return path for each circuit',
      'All earthing and bonding conductors to the means of earthing',
      'Safe access, working space, and emergency escape',
    ],
    correctAnswer: 0,
    explanation: 'Type D (10-20× trip) suits very high inrush applications like transformers.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 109,
    question: 'RCD coordination between upstream and downstream RCDs requires:',
    options: [
      'Connections to moving equipment or where flexibility is needed',
      'S-type upstream with appropriate current/time discrimination',
      'Starting current and protection coordination',
      'Different power factors affecting total current',
    ],
    correctAnswer: 1,
    explanation:
      'S-type (time-delayed) RCDs upstream allow downstream general RCDs to operate first.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 110,
    question: 'The let-through energy (I²t) of protective devices is important for:',
    options: [
      'Use fire resistant cables and follow BS 5839 requirements',
      'Tested combinations approved by manufacturer',
      'Ensuring cables and equipment survive fault conditions',
      'Additional or modified requirements beyond standard rules',
    ],
    correctAnswer: 2,
    explanation:
      'Let-through energy determines whether cables and equipment withstand fault energy without damage.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 111,
    question: 'Breaking capacity of a protective device must be:',
    options: [
      'Consider whether PME conditions permit extension or TT is needed',
      'Higher ambient temperature, grouping, and thermal insulation',
      'Starting current which can be 6-8 times full load',
      'At least equal to prospective fault current at installation point',
    ],
    correctAnswer: 3,
    explanation:
      'Device breaking capacity must equal or exceed the maximum prospective fault current.',
    section: '6.4',
    difficulty: 'basic',
  },
  {
    id: 112,
    question:
      'If prospective fault current is 8kA, the minimum device breaking capacity should be:',
    options: [
      'At least 8kA (typically use 10kA rated device)',
      'Heat dissipation varies with installation method',
      'Labelled with safety electrical connection warning',
      'Ensure safe access for future inspection and maintenance',
    ],
    correctAnswer: 0,
    explanation:
      'Breaking capacity must at least equal prospective fault current - 10kA device would be suitable.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 113,
    question: 'Cascading (back-up protection) allows:',
    options: [
      'Emergency circuits, escape routes, and fire spread prevention',
      'Downstream devices with lower breaking capacity if properly coordinated with upstream',
      'An upstream device clears a fault if the closer device fails',
      'Loss of supply PEN could make installation conductive parts live',
    ],
    correctAnswer: 1,
    explanation:
      'Properly coordinated cascading allows lower rated downstream devices protected by upstream devices.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 114,
    question: 'The purpose of current limiting in protective devices is to:',
    options: [
      'During business hours when most systems operate',
      'Set requirements for selecting and erecting equipment',
      'Reduce actual fault current by fast operation before peak',
      'Diversity factors based on simultaneous use probability',
    ],
    correctAnswer: 2,
    explanation:
      'Current-limiting devices operate fast enough to reduce the fault current below prospective peak.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 115,
    question: 'For motor protection coordination, the overload relay setting should be:',
    options: [
      'The design meets BS 7671 requirements',
      'Tested combinations approved by manufacturer',
      'Earth fault return path for each circuit',
      'Matched to motor full load current',
    ],
    correctAnswer: 3,
    explanation:
      'Overload protection is set at or near motor full load current to detect overload conditions.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 116,
    question: 'Short circuit protection for motors must:',
    options: [
      'Allow starting current while protecting against faults',
      'Hazards and mitigation measures incorporated in design',
      'Diagrams, schedules, and calculations as appropriate',
      'I = P / (V × pf) for power factor loads',
    ],
    correctAnswer: 0,
    explanation:
      'Short circuit protection must be set above starting current to prevent nuisance tripping while protecting against faults.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'Protection coordination studies are typically required for:',
    options: [
      'They are metal and within the building',
      'Complex commercial/industrial installations',
      'Metalwork each side may need individual bonding',
      'Weather exposure, IP rating, and mechanical protection',
    ],
    correctAnswer: 1,
    explanation:
      'Complex installations with multiple protection levels need coordination studies to verify discrimination.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 118,
    question: 'The I²t withstand of cables relates to:',
    options: [
      'Current carrying capacity, voltage drop, and fault protection',
      'Connections to moving equipment or where flexibility is needed',
      'Energy cable can withstand during fault without damage',
      'Usually significantly less than 100A due to diversity',
    ],
    correctAnswer: 2,
    explanation:
      'I²t withstand indicates fault energy the cable can survive without insulation damage.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'When MCBs and fuses are used together in a system, coordination requires:',
    options: [
      'Correctly rated socket outlets with RCD protection at pitch',
      'Safety and functionality at reasonable cost',
      'Earth fault return path for each circuit',
      'Analysis of time-current curves to ensure proper sequence',
    ],
    correctAnswer: 3,
    explanation:
      'Different device types require careful curve comparison to achieve discrimination.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 120,
    question: 'Ground fault protection in large systems provides:',
    options: [
      'Additional protection with adjustable settings for coordination',
      'Reduced voltage, RCD protection, and robust equipment',
      'S = √(I²t)/k relating fault current, time, and conductor constant',
      'High temperatures require heat-resistant cables and equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Ground fault protection adds adjustable earth fault detection coordinated with other protection.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 121,
    question: 'Selectivity in RCD systems can be achieved by:',
    options: [
      'Ensure safe access for future inspection and maintenance',
      'Using time-delayed (S-type) and higher rated RCDs upstream',
      'Triple-N harmonics add in the neutral rather than cancelling',
      'Additional or modified requirements beyond standard rules',
    ],
    correctAnswer: 1,
    explanation: 'RCD selectivity uses time delay and/or higher IΔn rating for upstream devices.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 122,
    question: 'A 100mA S-type RCD upstream of 30mA RCDs provides selectivity because:',
    options: [
      'Diagrams, schedules, and calculations as appropriate',
      'Maximum demand, fault current, and operating characteristics',
      'Both higher rating AND time delay allow downstream to operate first',
      'Metal part of electrical equipment that can become live under fault',
    ],
    correctAnswer: 2,
    explanation:
      'Combination of higher IΔn rating and time delay ensures downstream 30mA trips first.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 123,
    question: 'For circuits with electronic loads (VFDs, etc.), protection must consider:',
    options: [
      'Apparent power (VA) is greater than true power (W) for reactive loads',
      'Higher ambient temperature, grouping, and thermal insulation',
      'Ib is design current, In is device rating, Iz is cable capacity',
      'High frequency content affecting RCD operation and coordination',
    ],
    correctAnswer: 3,
    explanation:
      'Electronic loads may produce harmonics and DC components affecting standard protection.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 124,
    question: 'MCCB adjustable settings include:',
    options: [
      'Long-time, short-time, instantaneous, and ground fault settings',
      'High frequency content affecting RCD operation and coordination',
      'Ensure safe access for future inspection and maintenance',
      'Usually significantly less than 100A due to diversity',
    ],
    correctAnswer: 0,
    explanation:
      'MCCBs often have adjustable trip settings for various protection functions enabling coordination.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 125,
    question: "The term 'fully rated' in protection means:",
    options: [
      'High inrush loads like transformers and X-ray equipment',
      'Each device rated for full prospective fault current at its location',
      'Scheduling non-essential loads away from peak times',
      'Underground and external installations requiring mechanical protection',
    ],
    correctAnswer: 1,
    explanation:
      'Fully rated means each device has adequate breaking capacity for fault current at its location.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 126,
    question: 'Series rating (cascading) documentation should show:',
    options: [
      'IPX4 (or IPX5 where water jets used)',
      'Specific reference conditions including 30°C ambient',
      'Tested combinations approved by manufacturer',
      'Safety and functionality at reasonable cost',
    ],
    correctAnswer: 2,
    explanation:
      'Cascaded combinations must be manufacturer-tested and approved, with documentation available.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 127,
    question: 'For transformer secondary protection, the device must consider:',
    options: [
      'Connected equipment VA rating and power factor',
      'Ensure safe access for future inspection and maintenance',
      'Allow starting current while protecting against faults',
      'Transformer impedance effect on fault current',
    ],
    correctAnswer: 3,
    explanation:
      'Transformer impedance limits secondary fault current, affecting protection sizing.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 128,
    question: 'Arc flash protection measures in design include:',
    options: [
      'Fast-acting devices and arc-resistant equipment where appropriate',
      'Protection against overheating and mechanical damage',
      'Rods, tapes, plates, foundation electrodes, and structural steel',
      'S-type upstream with appropriate current/time discrimination',
    ],
    correctAnswer: 0,
    explanation: 'Arc flash mitigation uses fast protection and appropriate equipment design.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 129,
    question: 'Zone selective interlocking allows:',
    options: [
      'Metalwork each side may need individual bonding',
      'Upstream devices to wait for downstream to clear faults',
      'Avoid danger, minimise inconvenience, and meet safety requirements',
      'Information for safe operation and maintenance of the installation',
    ],
    correctAnswer: 1,
    explanation: 'ZSI provides communication between devices enabling proper selective operation.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 130,
    question: 'Documentation of protection coordination should include:',
    options: [
      'DC system considerations, isolation, and labelling requirements',
      'Compliance with cable sizing, protection, and voltage drop requirements',
      'Single line diagrams, settings, and coordination curves',
      'External earth fault loop impedance from supply',
    ],
    correctAnswer: 2,
    explanation:
      'Complete documentation includes diagrams, device schedules, settings, and coordination studies.',
    section: '6.4',
    difficulty: 'intermediate',
  },

  // Section 6.5: Earthing & Bonding (Questions 131-160)
  {
    id: 131,
    question: 'The purpose of earthing in an electrical installation is primarily to:',
    options: [
      'External earth fault loop impedance from supply',
      'Presence of livestock, dust, moisture, and corrosive atmospheres',
      'Hazards and mitigation measures incorporated in design',
      'Provide a path for fault currents and limit touch voltages',
    ],
    correctAnswer: 3,
    explanation:
      'Earthing provides fault current path enabling protective device operation and limits touch voltages.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 132,
    question: 'The main earthing terminal connects:',
    options: [
      'All earthing and bonding conductors to the means of earthing',
      'During business hours when most systems operate',
      'Starting current and protection coordination',
      'Higher current ratings for same size conductor',
    ],
    correctAnswer: 0,
    explanation:
      'Main earthing terminal is the common connection point for circuit CPCs, bonding, and earthing conductor.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 133,
    question: 'TN-S earthing system has:',
    options: [
      'Tested combinations approved by manufacturer',
      'Separate neutral and earth conductors from source',
      'Balance loads across all three phases',
      'Full rated current with limited diversity',
    ],
    correctAnswer: 1,
    explanation: 'TN-S has separate protective conductor throughout, typically via cable sheath.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 134,
    question: 'TN-C-S (PME) earthing system uses:',
    options: [
      'Dedicated circuits with RCD protection and appropriate equipment',
      'Upstream devices to wait for downstream to clear faults',
      'Combined PEN from supply, separate in installation',
      'Motor circuits and equipment with moderate inrush current',
    ],
    correctAnswer: 2,
    explanation:
      'TN-C-S combines neutral and earth in supply (PEN), separating to PE and N at origin.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 135,
    question: 'TT earthing system relies on:',
    options: [
      'Triple-N harmonics add in the neutral rather than cancelling',
      'W/m² with little diversity due to continuous high loads',
      'S-type upstream with appropriate current/time discrimination',
      'Installation earth electrode separate from supply earth',
    ],
    correctAnswer: 3,
    explanation: 'TT systems use local earth electrode independent of supply system earthing.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 136,
    question: 'Main protective bonding connects:',
    options: [
      'Extraneous-conductive-parts to main earthing terminal',
      'Conductor material and insulation type constant',
      'During business hours when most systems operate',
      'They enter the building (or within 600mm of stopcock)',
    ],
    correctAnswer: 0,
    explanation:
      'Main bonding connects incoming services (water, gas, structural steel) to main earthing terminal.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 137,
    question:
      'Minimum main bonding conductor size for PME supply in domestic installation is typically:',
    options: [
      '2.5mm²',
      '10mm²',
      '16mm²',
      '6mm²',
    ],
    correctAnswer: 1,
    explanation:
      'PME supplies typically require minimum 10mm² main bonding conductors (16mm² for larger supplies).',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 138,
    question: 'Supplementary bonding is required in locations where:',
    options: [
      'The designer/contractor who signs the design certificate',
      'Main earthing terminal to means of earthing',
      'Risk of shock is increased, such as bathrooms',
      'Transformer impedance effect on fault current',
    ],
    correctAnswer: 2,
    explanation:
      'Supplementary bonding in special locations (bathrooms etc.) reduces touch voltage between parts.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 139,
    question: 'An extraneous-conductive-part is:',
    options: [
      'Rods, tapes, plates, foundation electrodes, and structural steel',
      'All extraneous and exposed-conductive-parts within zones',
      'Ensuring cables and equipment survive fault conditions',
      'Metal part not part of installation but liable to introduce potential',
    ],
    correctAnswer: 3,
    explanation:
      'Extraneous-conductive-parts can introduce potential from outside the installation (e.g., water pipes).',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 140,
    question: 'An exposed-conductive-part is:',
    options: [
      'Metal part of electrical equipment that can become live under fault',
      'Maximum expected load taking diversity into account',
      'External earth fault loop impedance from supply',
      'Installation earth electrode separate from supply earth',
    ],
    correctAnswer: 0,
    explanation:
      'Exposed-conductive-parts are touchable metal of electrical equipment not normally live but potentially so under fault.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 141,
    question: 'The earthing conductor connects:',
    options: [
      'Diversity factors based on simultaneous use probability',
      'Main earthing terminal to means of earthing',
      'BS 7671, BS EN standards, and product standards',
      'I2 ≤ 1.45 × Iz is satisfied for overload protection',
    ],
    correctAnswer: 1,
    explanation:
      'The earthing conductor links main earthing terminal to the earth electrode or supply earth.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 142,
    question: 'For TT systems, the earth electrode resistance should be low enough to:',
    options: [
      'Different types have different instantaneous trip levels',
      'V = I × R (ignoring reactance for small cables)',
      'Ensure RCD operates within required time (typically Ra×IΔn ≤ 50V)',
      'Ib is design current, In is device rating, Iz is cable capacity',
    ],
    correctAnswer: 2,
    explanation:
      "Earth electrode resistance must be low enough that fault voltage doesn't exceed 50V when RCD operates.",
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 143,
    question: 'Types of earth electrode include:',
    options: [
      'At least equal to prospective fault current at installation point',
      'Electric shock, fire, thermal effects, overcurrent, and voltage disturbances',
      'Risk of shock is increased, such as bathrooms',
      'Rods, tapes, plates, foundation electrodes, and structural steel',
    ],
    correctAnswer: 3,
    explanation:
      'Various electrode types are acceptable depending on soil conditions and installation requirements.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 144,
    question: 'PME supplies have specific requirements for bonding because:',
    options: [
      'Loss of supply PEN could make installation conductive parts live',
      'Installation earth electrode separate from supply earth',
      'Maximum demand, fault current, and operating characteristics',
      'The designer/contractor who signs the design certificate',
    ],
    correctAnswer: 0,
    explanation:
      'PME PEN conductor failure could energise all bonded metalwork, requiring comprehensive bonding.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 145,
    question: 'Earthing and bonding conductor materials must be:',
    options: [
      'Equipment types, ratings, and locations',
      'Suitable for the environment and adequately protected',
      'Provide a path for fault currents and limit touch voltages',
      'At least 8kA (typically use 10kA rated device)',
    ],
    correctAnswer: 1,
    explanation:
      'Materials must withstand environmental conditions and be adequately sized and protected.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 146,
    question: 'A circuit protective conductor (CPC) provides:',
    options: [
      'Safety and functionality at reasonable cost',
      'Connected equipment VA rating and power factor',
      'Earth fault return path for each circuit',
      'Diagrams, schedules, and calculations as appropriate',
    ],
    correctAnswer: 2,
    explanation:
      'The CPC provides the earth fault path from exposed-conductive-parts back to source.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 147,
    question: 'CPC sizing using Table 54.7 relates to:',
    options: [
      'Future expansion and operating margins',
      'Clearly identified and accessible',
      'I = P / (V × pf) for power factor loads',
      'Phase conductor cross-sectional area',
    ],
    correctAnswer: 3,
    explanation: 'Table 54.7 gives minimum CPC size related to associated phase conductor size.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 148,
    question: 'The earthing terminal in a consumer unit should be:',
    options: [
      'Clearly identified and accessible',
      'The design meets BS 7671 requirements',
      'Within 600mm of meter, consumer side',
      '500W per m² or similar rules of thumb',
    ],
    correctAnswer: 0,
    explanation:
      'Main earthing terminal must be clearly identified and accessible for inspection and testing.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 149,
    question: 'Functional earthing differs from protective earthing as it:',
    options: [
      'Adequate illumination, duration, and reliability during emergencies',
      'Provides earthing for equipment operation rather than safety',
      'No harmful effects during normal operation including switching',
      'Higher ambient temperature, grouping, and thermal insulation',
    ],
    correctAnswer: 1,
    explanation:
      'Functional earthing enables equipment to work correctly (e.g., filters) distinct from safety earthing.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 150,
    question: 'Combined earthing and neutral (PEN) conductors in TN-C systems must be:',
    options: [
      'Higher current ratings for same size conductor',
      'Consistent load profile making efficient use of capacity',
      'At least 10mm² copper or 16mm² aluminium minimum',
      'Balance loads across all three phases',
    ],
    correctAnswer: 2,
    explanation: 'PEN conductor minimum sizes are specified as it carries both functions.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 151,
    question: 'Earth clamps and connections should be:',
    options: [
      'Upstream devices to wait for downstream to clear faults',
      'Provides earthing for equipment operation rather than safety',
      'Using time-delayed (S-type) and higher rated RCDs upstream',
      'Labelled with safety electrical connection warning',
    ],
    correctAnswer: 3,
    explanation:
      "Earth connections must be labelled 'Safety Electrical Connection - Do Not Remove'.",
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 152,
    question: 'Automatic disconnection of supply (ADS) relies on:',
    options: [
      'Earth fault path impedance being low enough for device operation',
      'Scheduling non-essential loads away from peak times',
      'Essential loads maximum demand plus starting currents',
      'Direct clipping allows better heat dissipation than enclosures',
    ],
    correctAnswer: 0,
    explanation:
      'ADS requires low enough earth fault loop impedance to cause rapid protective device operation.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 153,
    question: 'For outbuildings supplied from the main building, earthing arrangements should:',
    options: [
      'W/m² with little diversity due to continuous high loads',
      'Consider whether PME conditions permit extension or TT is needed',
      'Environmental and utilisation conditions affecting the installation',
      'Physical positions of equipment and cable routes',
    ],
    correctAnswer: 1,
    explanation:
      'Outbuilding earthing must consider PME restrictions and may require local TT system.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 154,
    question: 'Lightning protection earthing, where installed, should be:',
    options: [
      'The design meets BS 7671 requirements',
      '500W per m² or similar rules of thumb',
      'Bonded to installation earthing',
      'Equipment types, ratings, and locations',
    ],
    correctAnswer: 2,
    explanation:
      'Lightning protection earth should be bonded to installation earth to prevent dangerous potential differences.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 155,
    question: 'Gas pipes require main bonding:',
    options: [
      'Add EV charger load with appropriate diversity',
      'Clearly identified and accessible',
      'They are metal and within the building',
      'Within 600mm of meter, consumer side',
    ],
    correctAnswer: 3,
    explanation:
      'Gas bonding should be within 600mm of the meter on consumer side (or where first accessible).',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 156,
    question: 'Water pipes require main bonding where:',
    options: [
      'They enter the building (or within 600mm of stopcock)',
      'Sufficient information to verify design and enable safe operation',
      'Metal part of electrical equipment that can become live under fault',
      'Different power factors affecting total current',
    ],
    correctAnswer: 0,
    explanation: 'Water bonding at point of entry or within 600mm of internal stopcock.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 157,
    question: 'Plastic pipe sections in water systems affect bonding because:',
    options: [
      'Set requirements for selecting and erecting equipment',
      'Metalwork each side may need individual bonding',
      'Combined PEN from supply, separate in installation',
      'Documented and verified for continued compliance',
    ],
    correctAnswer: 1,
    explanation:
      'Plastic sections can isolate metal sections requiring individual bonding assessment.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 158,
    question: 'Oil supply pipes typically require bonding where:',
    options: [
      'Separate neutral and earth conductors from source',
      'Not all loads operate simultaneously at full load',
      'They are metal and within the building',
      '500W per m² or similar rules of thumb',
    ],
    correctAnswer: 2,
    explanation: 'Metal oil pipes within buildings require bonding as extraneous-conductive-parts.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 159,
    question: 'In bathrooms, supplementary bonding connects:',
    options: [
      'Safety and functionality at reasonable cost',
      '10A plus 30% of remainder over 10A plus socket allowance',
      'Selecting efficient equipment and optimising circuit arrangements',
      'All extraneous and exposed-conductive-parts within zones',
    ],
    correctAnswer: 3,
    explanation:
      'Supplementary bonding in bathrooms connects all accessible conductive parts together.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question: "The 'Ze' value at the origin represents:",
    options: [
      'External earth fault loop impedance from supply',
      'Labelled with safety electrical connection warning',
      'Heat cannot dissipate effectively through thermal insulation',
      'Multiplying all applicable factors together',
    ],
    correctAnswer: 0,
    explanation:
      'Ze is external earth fault loop impedance measured at origin with installation disconnected.',
    section: '6.5',
    difficulty: 'intermediate',
  },

  // Section 6.6: Special Locations (Questions 161-185)
  {
    id: 161,
    question: 'Special locations in Part 7 of BS 7671 require:',
    options: [
      'Reduced voltage, RCD protection, and robust equipment',
      'Additional or modified requirements beyond standard rules',
      'Reduce actual fault current by fast operation before peak',
      'Energy cable can withstand during fault without damage',
    ],
    correctAnswer: 1,
    explanation:
      'Part 7 locations have increased risk requiring additional or modified protective measures.',
    section: '6.6',
    difficulty: 'basic',
  },
  {
    id: 162,
    question: 'Bathroom zones define:',
    options: [
      'Lower, requiring recalculation of existing circuits',
      'Extraneous-conductive-parts to main earthing terminal',
      'Areas with specific equipment and protection requirements',
      'Weather exposure, IP rating, and mechanical protection',
    ],
    correctAnswer: 2,
    explanation:
      'Zones 0, 1, and 2 define areas with specific IP rating and equipment requirements.',
    section: '6.6',
    difficulty: 'basic',
  },
  {
    id: 163,
    question: 'Zone 0 in a bathroom is:',
    options: [
      'Clearly identified and accessible',
      'Equipment types, ratings, and locations',
      'Assess > Calculate > Select > Document',
      'Inside the bath or shower basin',
    ],
    correctAnswer: 3,
    explanation: 'Zone 0 is the interior of the bath or shower tray - the highest risk area.',
    section: '6.6',
    difficulty: 'basic',
  },
  {
    id: 164,
    question: 'Equipment in bathroom Zone 1 must have minimum IP rating of:',
    options: [
      'IPX4 (or IPX5 where water jets used)',
      'Inside the bath or shower basin',
      'Balance loads across all three phases',
      'Safety and functionality at reasonable cost',
    ],
    correctAnswer: 0,
    explanation:
      'Zone 1 requires minimum IPX4 protection (IPX5 where water jets used for cleaning).',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 165,
    question: 'Swimming pool design must consider:',
    options: [
      'Using time-delayed (S-type) and higher rated RCDs upstream',
      'All zones with very specific equipment and protection requirements',
      'All earthing and bonding conductors to the means of earthing',
      'Extraneous-conductive-parts to main earthing terminal',
    ],
    correctAnswer: 1,
    explanation:
      'Swimming pool zones have strict requirements including SELV where applicable and supplementary bonding.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 166,
    question: 'Sauna room temperatures affect design because:',
    options: [
      'Earth fault path impedance being low enough for device operation',
      'Compliance with cable sizing, protection, and voltage drop requirements',
      'High temperatures require heat-resistant cables and equipment',
      'Appropriate connection means and protective measures',
    ],
    correctAnswer: 2,
    explanation:
      'High sauna temperatures require cables and equipment rated for elevated temperatures.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question: 'Construction site installations require:',
    options: [
      'At least equal to prospective fault current at installation point',
      'Conductor resistance increases with temperature',
      'Avoid danger, minimise inconvenience, and meet safety requirements',
      'Reduced voltage, RCD protection, and robust equipment',
    ],
    correctAnswer: 3,
    explanation:
      'Construction sites need reduced voltage supplies, 30mA RCDs, and equipment suitable for harsh conditions.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 168,
    question: 'Agricultural and horticultural installations have special requirements due to:',
    options: [
      'Presence of livestock, dust, moisture, and corrosive atmospheres',
      'Direct clipping allows better heat dissipation than enclosures',
      'Consistent load profile making efficient use of capacity',
      'An upstream device clears a fault if the closer device fails',
    ],
    correctAnswer: 0,
    explanation:
      'Agricultural premises face livestock contact risk, moisture, dust, and potentially corrosive environments.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 169,
    question: 'For agricultural premises, the maximum disconnection time for socket circuits is:',
    options: [
      '5 seconds',
      '0.2 seconds',
      '1 second',
      '0.4 seconds',
    ],
    correctAnswer: 1,
    explanation:
      'Agricultural socket circuits require 0.2s disconnection time due to increased risk.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 170,
    question: 'Caravan parks electrical design must provide:',
    options: [
      'Heat cannot dissipate effectively through thermal insulation',
      'Use fire resistant cables and follow BS 5839 requirements',
      'Correctly rated socket outlets with RCD protection at pitch',
      'Water proximity, floating equipment, and maritime conditions',
    ],
    correctAnswer: 2,
    explanation:
      'Caravan pitches require specific BS EN 60309 sockets with individual RCD protection.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 171,
    question: 'Marina electrical installations must consider:',
    options: [
      'Transformer impedance effect on fault current',
      'Safety and functionality at reasonable cost',
      'During business hours when most systems operate',
      'Water proximity, floating equipment, and maritime conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Marinas face water exposure, floating equipment, and harsh marine environment requiring specific measures.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 172,
    question: 'Temporary installations at exhibitions require:',
    options: [
      'Specific attention to public safety and frequent inspection',
      'Risk of shock is increased, such as bathrooms',
      'Essential to ensure design intent is correctly implemented',
      'Allow for reasonably anticipated additions',
    ],
    correctAnswer: 0,
    explanation:
      'Exhibition installations need careful attention due to public access and temporary nature.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 173,
    question: 'Solar PV installation design must include:',
    options: [
      'Add EV charger load with appropriate diversity',
      'DC system considerations, isolation, and labelling requirements',
      '1.8 × lamp watts / voltage to allow for control gear',
      'Integrated design information and coordination with other services',
    ],
    correctAnswer: 1,
    explanation:
      'PV systems have DC circuit requirements, isolation provisions, and specific labelling requirements.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 174,
    question: 'Electric vehicle charging installations require:',
    options: [
      'Documented and verified for continued compliance',
      'The current intended to flow under normal conditions',
      'Dedicated circuits with RCD protection and appropriate equipment',
      'I2 ≤ 1.45 × Iz is satisfied for overload protection',
    ],
    correctAnswer: 2,
    explanation:
      'EV charging requires dedicated circuits, appropriate protection, and compliant charging equipment.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 175,
    question: 'Medical locations have specific requirements for:',
    options: [
      'They enter the building (or within 600mm of stopcock)',
      'Motor circuits and equipment with moderate inrush current',
      'S-type upstream with appropriate current/time discrimination',
      'IT systems, equipotential bonding, and power supply reliability',
    ],
    correctAnswer: 3,
    explanation:
      'Medical locations require specialised earthing arrangements, IT systems for critical areas, and reliable supplies.',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 176,
    question: 'Hazardous area design (explosive atmospheres) requires:',
    options: [
      'Equipment certified for the zone classification',
      'SELV or additional protective measures',
      'Performance requirements and standards to be met',
      'Water proximity, floating equipment, and maritime conditions',
    ],
    correctAnswer: 0,
    explanation:
      'Hazardous areas require specifically certified equipment for the relevant zone (0, 1, 2 for gas; 20, 21, 22 for dust).',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 177,
    question: 'Conducting locations with restricted movement require:',
    options: [
      'Starting current which can be 6-8 times full load',
      'SELV or additional protective measures',
      'Use the larger cable that meets both requirements',
      'Inside the bath or shower basin',
    ],
    correctAnswer: 1,
    explanation:
      'Conductive restricted locations increase shock risk, requiring SELV or specific protective measures.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 178,
    question: 'Operating and maintenance gangways have requirements for:',
    options: [
      'Motor circuits and equipment with moderate inrush current',
      'At least 10mm² copper or 16mm² aluminium minimum',
      'Safe access, working space, and emergency escape',
      'Correctly rated socket outlets with RCD protection at pitch',
    ],
    correctAnswer: 2,
    explanation: 'Gangways must allow safe access, adequate working space, and emergency egress.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 179,
    question: 'Floor and ceiling heating systems require:',
    options: [
      'Not all loads operate simultaneously at full load',
      'Safety and functionality at reasonable cost',
      'The designer/contractor who signs the design certificate',
      'Protection against overheating and mechanical damage',
    ],
    correctAnswer: 3,
    explanation:
      'Heating systems need thermal cutouts, mechanical protection, and consideration of temperature effects.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 180,
    question: 'Outdoor lighting installations must consider:',
    options: [
      'Weather exposure, IP rating, and mechanical protection',
      'A decimal or percentage less than 1 (or 100%)',
      'Operation, inspection, maintenance, and repair',
      '66W per outlet minimum or actual load if higher',
    ],
    correctAnswer: 0,
    explanation:
      'Outdoor installations face weather, require appropriate IP ratings, and may need mechanical protection.',
    section: '6.6',
    difficulty: 'basic',
  },
  {
    id: 181,
    question: 'Fountains and water features have requirements similar to:',
    options: [
      '500W per m² or similar rules of thumb',
      'Swimming pools with zone requirements',
      'Equipment types, ratings, and locations',
      'Safety and functionality at reasonable cost',
    ],
    correctAnswer: 1,
    explanation:
      'Fountains have zone requirements similar to swimming pools due to water contact risks.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 182,
    question: 'Mobile or transportable unit supplies must include:',
    options: [
      'W/m² with little diversity due to continuous high loads',
      'Provide a path for fault currents and limit touch voltages',
      'Appropriate connection means and protective measures',
      'High inrush loads like transformers and X-ray equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Mobile units require suitable supply connections and protective measures for their mobile nature.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 183,
    question: 'Electrical installations in caravans must comply with:',
    options: [
      'Fundamental principles of design',
      'Equipment types, ratings, and locations',
      'Within 600mm of meter, consumer side',
      'BS 7671 Section 721 requirements',
    ],
    correctAnswer: 3,
    explanation: 'Caravan installations have specific requirements in BS 7671 Section 721.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 184,
    question: 'Emergency lighting design must ensure:',
    options: [
      'Adequate illumination, duration, and reliability during emergencies',
      'Specific attention to public safety and frequent inspection',
      'Lower, requiring recalculation of existing circuits',
      'Common applications like ring finals, radials, and lighting circuits',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting provides required illumination levels for specified duration with high reliability.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 185,
    question: 'Fire alarm system wiring should:',
    options: [
      'Meet specific requirements for hazardous area classification',
      'Use fire resistant cables and follow BS 5839 requirements',
      '1.8 × lamp watts / voltage to allow for control gear',
      'Diversity factors based on simultaneous use probability',
    ],
    correctAnswer: 1,
    explanation: 'Fire alarm wiring requires fire resistant cables and compliance with BS 5839.',
    section: '6.6',
    difficulty: 'intermediate',
  },

  // Section 6.7: Design Documentation (Questions 186-200)
  {
    id: 186,
    question: 'Design documentation must include:',
    options: [
      'V = I × R (ignoring reactance for small cables)',
      'DC system considerations, isolation, and labelling requirements',
      'Sufficient information to verify design and enable safe operation',
      'Environmental and utilisation conditions affecting the installation',
    ],
    correctAnswer: 2,
    explanation:
      'Documentation must enable design verification and provide information for safe operation and maintenance.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 187,
    question: 'Single line diagrams show:',
    options: [
      'DC system considerations, isolation, and labelling requirements',
      'At least equal to prospective fault current at installation point',
      'Triple-N harmonics add in the neutral rather than cancelling',
      'Simplified representation of circuits and equipment',
    ],
    correctAnswer: 3,
    explanation:
      'Single line diagrams show circuit arrangements in simplified form for overall understanding.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 188,
    question: 'Schematic diagrams provide:',
    options: [
      'Functional relationships between components',
      'Bonded to installation earthing',
      'Weather exposure, IP rating, and mechanical protection',
      'Installation earth electrode separate from supply earth',
    ],
    correctAnswer: 0,
    explanation: 'Schematics show how circuits function and components interconnect logically.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 189,
    question: 'Layout drawings show:',
    options: [
      'Connections to moving equipment or where flexibility is needed',
      'Physical positions of equipment and cable routes',
      'The designer/contractor who signs the design certificate',
      'Within 600mm of meter, consumer side',
    ],
    correctAnswer: 1,
    explanation: 'Layout drawings show where equipment is physically located and cable routing.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 190,
    question: 'Design calculations should demonstrate:',
    options: [
      'Allow starting current while protecting against faults',
      'No harmful effects during normal operation including switching',
      'Compliance with cable sizing, protection, and voltage drop requirements',
      'Selecting efficient equipment and optimising circuit arrangements',
    ],
    correctAnswer: 2,
    explanation: 'Calculations demonstrate compliance with technical requirements of BS 7671.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 191,
    question: 'Equipment schedules list:',
    options: [
      'At least 8kA (typically use 10kA rated device)',
      'Performance requirements and standards to be met',
      'Balance loads across all three phases',
      'Equipment types, ratings, and locations',
    ],
    correctAnswer: 3,
    explanation:
      'Schedules itemise equipment with their specifications and positions in the installation.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 192,
    question: 'Cable schedules should include:',
    options: [
      'Cable types, sizes, routes, and protective device coordination',
      'Triple-N harmonics add in the neutral rather than cancelling',
      'Avoid danger, minimise inconvenience, and meet safety requirements',
      'External earth fault loop impedance from supply',
    ],
    correctAnswer: 0,
    explanation: 'Cable schedules detail cable specifications, routes, and associated protection.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 193,
    question: 'Part 1 of the EIC (design) requires the designer to confirm:',
    options: [
      'Normal operation, foreseeable faults, and misuse',
      'The design meets BS 7671 requirements',
      'I = P / (V × pf) for power factor loads',
      'V = I × R (ignoring reactance for small cables)',
    ],
    correctAnswer: 1,
    explanation:
      'Design certification confirms the design complies with BS 7671 and designer specifications.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 194,
    question: 'As-built documentation is necessary when:',
    options: [
      'Use fire resistant cables and follow BS 5839 requirements',
      'Full rated current with limited diversity',
      'The final installation differs from original design',
      'W/m² with little diversity due to continuous high loads',
    ],
    correctAnswer: 2,
    explanation: 'As-built records are needed when installation varies from original design.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 195,
    question: 'Design risk assessments should identify:',
    options: [
      'Identify hazards and implement appropriate control measures',
      'Avoid danger, minimise inconvenience, and meet safety requirements',
      '1.8 × lamp watts / voltage to allow for control gear',
      'Hazards and mitigation measures incorporated in design',
    ],
    correctAnswer: 3,
    explanation: 'Design risk assessments identify hazards and how the design addresses them.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 196,
    question: 'Technical specifications define:',
    options: [
      'Performance requirements and standards to be met',
      'Documented and verified for continued compliance',
      'Matched to motor full load current',
      'Risk of shock is increased, such as bathrooms',
    ],
    correctAnswer: 0,
    explanation: 'Specifications set out performance requirements and applicable standards.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 197,
    question: 'Operation and maintenance manuals should include:',
    options: [
      'Need larger cross-section due to lower conductivity',
      'Information for safe operation and maintenance of the installation',
      'Appropriate connection means and protective measures',
      'Lower, requiring recalculation of existing circuits',
    ],
    correctAnswer: 1,
    explanation:
      'O&M manuals provide essential information for safe, ongoing operation and maintenance.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 198,
    question: 'Design documentation retention should be:',
    options: [
      'Inside the bath or shower basin',
      'I = P / (V × pf) for power factor loads',
      'For the life of the installation',
      'Bonded to installation earthing',
    ],
    correctAnswer: 2,
    explanation:
      'Design documentation should be retained throughout installation life for reference.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 199,
    question: 'Changes to design during construction should be:',
    options: [
      'Additional or modified requirements beyond standard rules',
      'The designer/contractor who signs the design certificate',
      'Sum of all equipment ratings connected to the circuit',
      'Documented and verified for continued compliance',
    ],
    correctAnswer: 3,
    explanation:
      'Design changes must be documented and verified to ensure continued BS 7671 compliance.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 200,
    question: 'BIM (Building Information Modelling) in electrical design provides:',
    options: [
      'Integrated design information and coordination with other services',
      'Usually significantly less than 100A due to diversity',
      'Diversity factors based on simultaneous use probability',
      'Electric shock, fire, thermal effects, overcurrent, and voltage disturbances',
    ],
    correctAnswer: 0,
    explanation:
      'BIM integrates design data and enables coordination between electrical and other building services.',
    section: '6.7',
    difficulty: 'intermediate',
  },
];

// Helper function to get random questions for mock exams
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...module6Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module6Questions.filter((q) => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): Question[] => {
  return module6Questions.filter((q) => q.difficulty === difficulty);
};

// Map section codes to broader topic labels (used by getQuestionsByTopic).
const M6_SECTION_TOPIC: Record<string, string> = {
  '6.1': 'Design Principles',
  '6.2': 'Calculations',
  '6.3': 'Calculations',
  '6.4': 'Protective Devices',
  '6.5': 'Protective Devices',
  '6.6': 'Special Locations',
  '6.7': 'Documentation',
  '6.8': 'Verification',
};

// Filter questions by topic, mapped from section.
export const getQuestionsByTopic = (topic: string): Question[] => {
  return module6Questions.filter((q) => M6_SECTION_TOPIC[q.section || ''] === topic);
};

// Structural validation — used by tests / spot-checks.
export const validateQuestionBank = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const seenIds = new Set<number>();
  module6Questions.forEach((q, idx) => {
    if (typeof q.id !== 'number') errors.push(`Q[${idx}]: id must be a number`);
    if (seenIds.has(q.id)) errors.push(`Q[${idx}]: duplicate id ${q.id}`);
    seenIds.add(q.id);
    if (!q.question) errors.push(`Q${q.id}: question text missing`);
    if (!Array.isArray(q.options) || q.options.length < 2)
      errors.push(`Q${q.id}: options must have at least 2 entries`);
    if (
      typeof q.correctAnswer !== 'number' ||
      q.correctAnswer < 0 ||
      q.correctAnswer >= (q.options?.length || 0)
    )
      errors.push(`Q${q.id}: correctAnswer index out of range`);
    if (!q.explanation) errors.push(`Q${q.id}: explanation missing`);
  });
  return { isValid: errors.length === 0, errors };
};

export default module6Questions;
