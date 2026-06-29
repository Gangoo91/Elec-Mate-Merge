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
      'the lowest possible installation cost above all other factors',
      'safety and functionality at reasonable cost',
      'the maximum number of circuits the supply can physically accommodate',
      'compliance with manufacturer instructions in place of BS 7671',
    ],
    correctAnswer: 1,
    explanation:
      'Design must balance safety, functionality and economic considerations while meeting the user’s requirements.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 2,
    question: 'BS 7671 Chapter 13 deals with:',
    options: [
      'selection and erection of wiring systems',
      'inspection and testing on completion',
      'fundamental principles of design',
      'the assessment of general characteristics',
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
      'electric shock and fire only, other hazards being out of scope',
      'mechanical damage and corrosion but not electrical faults',
      'overcurrent alone, since other risks are covered by the supplier',
      'electric shock, fire, thermal effects, overcurrent and voltage disturbances',
    ],
    correctAnswer: 3,
    explanation:
      'Comprehensive design addresses multiple hazards including shock, fire, thermal effects, overcurrent and voltage disturbances.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 4,
    question: 'Assessment of general characteristics at the start of design includes:',
    options: [
      'purpose of the installation, supply characteristics and environmental conditions',
      'only the rating of the incoming protective device',
      'the colour coding of conductors to be used throughout',
      'the final test results recorded on completion',
    ],
    correctAnswer: 0,
    explanation:
      'Initial assessment covers purpose, supply details, external influences and compatibility requirements.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 5,
    question: 'External influences in design refer to:',
    options: [
      'interference from neighbouring electrical installations only',
      'environmental and utilisation conditions affecting the installation',
      'the influence of the supply network operator on the design',
      'changes requested by the client after work has started',
    ],
    correctAnswer: 1,
    explanation:
      'External influences include ambient conditions, presence of water, mechanical factors and patterns of use.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 6,
    question: 'Maintainability must be considered during design so that the installation can:',
    options: [
      'operate without ever requiring inspection or testing',
      'be dismantled and replaced rather than maintained in place',
      'be safely accessed for future inspection, testing and maintenance',
      'be maintained only by the original installer',
    ],
    correctAnswer: 2,
    explanation:
      'Design must allow safe access to equipment for inspection, testing and maintenance throughout its life.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 7,
    question: 'Division of an installation into circuits is necessary to:',
    options: [
      'reduce the total number of protective devices required',
      'allow a single fault to disconnect the whole installation at once',
      'remove the need for a main switch at the origin',
      'avoid danger, minimise inconvenience and facilitate safe operation on a fault',
    ],
    correctAnswer: 3,
    explanation:
      'Circuit division limits the extent of faults, enables isolation for maintenance and prevents total loss of supply.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 8,
    question: 'Compatibility between equipment and the supply should ensure:',
    options: [
      'no harmful effects during normal operation, including switching',
      'all equipment operates only at the rated voltage with no tolerance',
      'the supply is uprated to suit the largest connected load',
      'equipment from a single manufacturer is always used',
    ],
    correctAnswer: 0,
    explanation:
      'Equipment must be compatible with supply characteristics and not cause harmful effects on other equipment.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 9,
    question: 'Design documentation required by BS 7671 includes:',
    options: [
      'a copy of the supplier’s tariff and metering arrangements',
      'diagrams, schedules and calculations as appropriate',
      'photographs of every accessory before installation',
      'the manufacturer’s sales literature for each product',
    ],
    correctAnswer: 1,
    explanation:
      'Adequate documentation must be provided, including diagrams, schedules and design calculations.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 10,
    question: 'When designing for future expansion, the designer should:',
    options: [
      'install the maximum cable size available regardless of cost',
      'leave all spare ways in the board permanently isolated',
      'allow for reasonably anticipated additions to the installation',
      'ignore future needs, as additions are the client’s responsibility',
    ],
    correctAnswer: 2,
    explanation:
      'Design should reasonably anticipate future requirements where economically practical.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 11,
    question: 'The concept of diversity in electrical design recognises that:',
    options: [
      'every load must be assumed to operate at full load at all times',
      'loads should be balanced equally across all final circuits',
      'the design current always equals the protective device rating',
      'not all connected loads operate simultaneously at full load',
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
      'the type of earthing system and circuit characteristics',
      'the colour of the cable insulation selected',
      'the manufacturer of the consumer unit only',
      'the ambient temperature at the time of installation',
    ],
    correctAnswer: 0,
    explanation:
      'Protective measures are selected based on the earthing system type and the specific circuit requirements.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 13,
    question: 'The design current (Ib) of a circuit is:',
    options: [
      'the maximum prospective fault current at the origin',
      'the current intended to flow under normal conditions',
      'the rated current of the protective device',
      'the tabulated current-carrying capacity of the cable',
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
      'building cost indices and tender pricing documents',
      'the supplier’s connection charges schedule',
      'BS 7671, BS EN standards and product standards',
      'health and safety policy statements only',
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
      'eliminate the need to follow BS 7671 requirements',
      'transfer all design responsibility to the installer',
      'reduce the cost of the installation by omitting protection',
      'identify hazards and implement appropriate control measures',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessment identifies potential hazards and ensures appropriate protective measures are included in the design.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 16,
    question: 'The designer must verify that the supply is adequate for the:',
    options: [
      'maximum demand, fault current and operating characteristics',
      'number of accessories specified by the architect',
      'colour scheme requested for the consumer unit',
      'preferred manufacturer of the protective devices',
    ],
    correctAnswer: 0,
    explanation:
      'Design must confirm the supply can meet maximum demand and that protective devices have adequate ratings.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 17,
    question: 'Electromagnetic compatibility (EMC) in design ensures that:',
    options: [
      'all circuits operate at the same frequency',
      'equipment does not cause, or suffer from, electromagnetic interference',
      'cables are kept as short as physically possible',
      'only metallic wiring systems are ever used',
    ],
    correctAnswer: 1,
    explanation:
      'EMC considerations prevent electromagnetic interference between equipment and external sources.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 18,
    question: 'The purpose of Chapter 51 of BS 7671 regarding design is to:',
    options: [
      'define the maximum demand of a domestic installation',
      'list the disconnection times for final circuits',
      'set requirements for the selection and erection of equipment',
      'specify the colours of conductors and their identification',
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
      'normal operation only, as faults are unforeseeable',
      'the appearance of the finished installation above all',
      'the preferences of the installation team',
      'normal operation, reasonably foreseeable faults and misuse',
    ],
    correctAnswer: 3,
    explanation:
      'Safety design covers normal operation, reasonably foreseeable faults and potential misuse scenarios.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 20,
    question: 'Coordination between the designer and the installer is:',
    options: [
      'essential to ensure the design intent is correctly implemented',
      'unnecessary once drawings have been issued',
      'required only when the client requests a variation',
      'the sole responsibility of the supply network operator',
    ],
    correctAnswer: 0,
    explanation:
      'Close coordination ensures the installation matches design requirements and that deviations are properly assessed.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 21,
    question: 'Design must ensure electrical equipment is accessible for:',
    options: [
      'decorative purposes within the building',
      'operation, inspection, maintenance and repair',
      'concealment so that it cannot be seen by users',
      'removal only at the end of the installation’s life',
    ],
    correctAnswer: 1,
    explanation:
      'Accessibility is required for all operational and maintenance activities throughout the equipment’s life.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 22,
    question: 'Energy efficiency in electrical design is addressed by:',
    options: [
      'using the smallest cables that will physically fit',
      'omitting protective devices to reduce losses',
      'selecting efficient equipment and optimising circuit arrangements',
      'running every circuit at its maximum rated current',
    ],
    correctAnswer: 2,
    explanation:
      'Energy efficiency includes equipment selection, power factor, voltage drop and circuit optimisation.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 23,
    question: 'Basic protection (protection against direct contact) ensures that:',
    options: [
      'exposed-conductive-parts are disconnected within 5 seconds',
      'all metalwork is bonded to the main earthing terminal',
      'the supply is automatically disconnected on an earth fault',
      'live parts are not accessible during normal use',
    ],
    correctAnswer: 3,
    explanation:
      'Basic protection prevents contact with live parts during normal operation and use.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 24,
    question: 'Fault protection (protection against indirect contact) ensures that:',
    options: [
      'automatic disconnection or other measures prevent shock from exposed-conductive-parts',
      'live parts are placed out of reach during normal use',
      'the installation is divided into a sufficient number of circuits',
      'conductors are correctly identified by colour',
    ],
    correctAnswer: 0,
    explanation:
      'Fault protection ensures automatic disconnection, or an equivalent measure, protects against indirect contact.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 25,
    question: 'Design verification before construction should confirm that:',
    options: [
      'the installer is available to start work immediately',
      'the design meets BS 7671 and the client’s requirements',
      'the cheapest available materials have been specified',
      'the supply will never need to be uprated',
    ],
    correctAnswer: 1,
    explanation:
      'Design must be verified for BS 7671 compliance and for meeting client specifications before work starts.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 26,
    question: 'Selection of equipment for a design requires considering:',
    options: [
      'the brand name preferred by the wholesaler',
      'only the rated voltage of the equipment',
      'voltage, current, frequency, power and environmental conditions',
      'the date the equipment was manufactured',
    ],
    correctAnswer: 2,
    explanation:
      'Equipment selection considers electrical ratings, environmental conditions and application requirements.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 27,
    question: 'Responsibility for the electrical design ultimately rests with:',
    options: [
      'the supply network operator providing the connection',
      'the manufacturer of the protective devices',
      'the client who commissioned the installation',
      'the designer/contractor who signs the design certificate',
    ],
    correctAnswer: 3,
    explanation:
      'The designer who signs the design section of the Electrical Installation Certificate takes responsibility for the design.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 28,
    question: 'Standard circuit arrangements exist for:',
    options: [
      'common applications such as ring finals, radials and lighting circuits',
      'every conceivable installation without exception',
      'hazardous areas and explosive atmospheres only',
      'circuits exceeding 100 A only',
    ],
    correctAnswer: 0,
    explanation:
      'Standard arrangements exist for common circuits, though variations may be needed for specific requirements.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 29,
    question: 'Special locations in Part 7 of BS 7671 require:',
    options: [
      'no protective measures, as the general rules suffice',
      'additional or modified requirements beyond the standard rules',
      'only a reduction in the number of socket-outlets',
      'the use of aluminium conductors throughout',
    ],
    correctAnswer: 1,
    explanation:
      'Part 7 special locations require additional or modified protective measures beyond the standard requirements.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 30,
    question: 'The design process typically follows which sequence?',
    options: [
      'install > test > calculate > assess',
      'document > select > assess > calculate',
      'assess > calculate > select > document',
      'select > install > assess > document',
    ],
    correctAnswer: 2,
    explanation:
      'Design follows a logical sequence: assess requirements, calculate parameters, select equipment, then document the design.',
    section: '6.1',
    difficulty: 'basic',
  },

  // Section 6.2: Load Calculations (Questions 31-65)
  {
    id: 31,
    question: 'Maximum demand is defined as:',
    options: [
      'the sum of all connected equipment ratings ignoring diversity',
      'the rated current of the main protective device',
      'the prospective fault current at the origin',
      'the maximum expected load taking diversity into account',
    ],
    correctAnswer: 3,
    explanation:
      'Maximum demand is the highest load expected after applying diversity factors.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 32,
    question: 'For a domestic ring final circuit, the assumed current at each socket is normally:',
    options: [
      'based on diversity, often well below the full 13 A per socket',
      'the full 13 A at every socket simultaneously',
      'fixed at 32 A regardless of the number of sockets',
      'equal to the cable’s current-carrying capacity',
    ],
    correctAnswer: 0,
    explanation:
      'Ring circuits use diversity assumptions, as not all sockets operate at the full 13 A simultaneously.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 33,
    question: 'A diversity factor is normally expressed as:',
    options: [
      'a whole number greater than the connected load',
      'a decimal or percentage less than 1 (or 100%)',
      'a value always equal to exactly 1',
      'a negative correction applied to the supply voltage',
    ],
    correctAnswer: 1,
    explanation:
      'A diversity factor is typically less than 1 (or less than 100%), as not all loads operate at full capacity simultaneously.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 34,
    question: 'The formula for current from single-phase power is:',
    options: [
      'I = P × V × pf for all loads',
      'I = V / (P × pf) for power-factor loads',
      'I = P / (V × pf) for power-factor loads',
      'I = P × √3 / V for single-phase loads',
    ],
    correctAnswer: 2,
    explanation:
      'For single-phase loads I = P / (V × power factor), or I = P / V for purely resistive loads.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 35,
    question: 'For a balanced three-phase load, line current is calculated using:',
    options: [
      'I = P / VL',
      'I = P × √3',
      'I = P / (3 × VL)',
      'I = P / (√3 × VL × pf)',
    ],
    correctAnswer: 3,
    explanation:
      'Three-phase balanced load current: I = P / (√3 × line voltage × power factor).',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 36,
    question: 'A 3 kW resistive heater at 230 V draws approximately:',
    options: [
      '13 A',
      '3 A',
      '30 A',
      '23 A',
    ],
    correctAnswer: 0,
    explanation:
      'I = P/V = 3000/230 ≈ 13 A.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 37,
    question: 'The standard diversity allowance for a domestic cooker circuit is:',
    options: [
      '50% of the total cooker rating with no socket allowance',
      'the first 10 A plus 30% of the remainder, plus 5 A if a socket is fitted',
      'the first 5 A plus 50% of the remainder',
      'the full rated load with no diversity applied',
    ],
    correctAnswer: 1,
    explanation:
      'Cooker diversity: the first 10 A + 30% of the balance + 5 A if a socket-outlet is incorporated.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 38,
    question: 'An electric shower rated 10.8 kW at 230 V has a design current of approximately:',
    options: [
      '32 A',
      '63 A',
      '47 A',
      '40 A',
    ],
    correctAnswer: 2,
    explanation:
      'I = 10800/230 ≈ 47 A, typically requiring a 50 A circuit.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 39,
    question: 'Motor circuit design must allow for a starting current that can be:',
    options: [
      'less than half the full-load current',
      'exactly equal to the full-load current',
      '100 times the full-load current',
      '6 to 8 times the full-load current',
    ],
    correctAnswer: 3,
    explanation:
      'Motor starting currents are significantly higher than running current and must be considered in design.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 40,
    question: 'Lighting load for domestic premises is typically assessed at a minimum of:',
    options: [
      '100 W per outlet, or the actual connected load if higher',
      '10 W per outlet regardless of fittings',
      '500 W per outlet in all cases',
      '13 A per lighting point',
    ],
    correctAnswer: 0,
    explanation:
      'A minimum of 100 W per lighting outlet (or the actual connected load, whichever is greater) is commonly assumed.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 41,
    question: 'Power factor affects load calculations because:',
    options: [
      'true power always exceeds apparent power',
      'apparent power (VA) exceeds true power (W) for reactive loads',
      'it changes the supply voltage at the origin',
      'it has no effect on the current drawn',
    ],
    correctAnswer: 1,
    explanation:
      'A poor power factor means a higher apparent power and current for the same true power output.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 42,
    question: 'If the power factor is 0.8 and the true power is 8 kW, the apparent power is:',
    options: [
      '6.4 kVA',
      '8 kVA',
      '10 kVA',
      '12.5 kVA',
    ],
    correctAnswer: 2,
    explanation:
      'S = P / pf = 8000 / 0.8 = 10 000 VA = 10 kVA.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 43,
    question: 'For small commercial premises, socket-outlet loads are often estimated using:',
    options: [
      'the full 13 A at every outlet with no diversity',
      'the rated current of the main switch divided by two',
      'a fixed 100 A regardless of floor area',
      'a watts-per-square-metre figure or an assumed load per outlet',
    ],
    correctAnswer: 3,
    explanation:
      'Commercial estimates often use W/m² or an assumed load per outlet depending on the type of use.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 44,
    question: 'The total connected load of a circuit is:',
    options: [
      'the sum of all equipment ratings connected to the circuit',
      'the maximum demand after diversity has been applied',
      'the rating of the protective device serving the circuit',
      'the current-carrying capacity of the circuit cable',
    ],
    correctAnswer: 0,
    explanation:
      'Total connected load is the sum of all equipment ratings without applying diversity.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 45,
    question: 'EV charger load calculations should normally apply:',
    options: [
      'a 50% diversity allowance in all cases',
      'full rated current with limited diversity',
      'no allowance, as chargers draw negligible current',
      'the same diversity as domestic lighting',
    ],
    correctAnswer: 1,
    explanation:
      'EV chargers typically have limited diversity applied, as they often operate at full load for extended periods.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 46,
    question: 'Heat pump load calculations must account for:',
    options: [
      'the lighting load of the building',
      'only the standby power consumption',
      'both heating and cooling loads where applicable',
      'the rating of the incoming supply fuse',
    ],
    correctAnswer: 2,
    explanation:
      'Heat pumps may present different loads in heating and cooling modes — both should be considered.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 47,
    question: 'The current of a discharge-lighting circuit is calculated as:',
    options: [
      'lamp watts / voltage with no allowance for control gear',
      '0.5 × lamp watts / voltage',
      'lamp watts × voltage / 1000',
      'approximately 1.8 × lamp watts / voltage to allow for control gear',
    ],
    correctAnswer: 3,
    explanation:
      'Discharge-lighting current is calculated using a factor of about 1.8 to allow for control gear and power factor.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 48,
    question: 'A commercial kitchen with multiple cooking appliances would typically use:',
    options: [
      'diversity factors based on the probability of simultaneous use',
      'the full rating of every appliance with no diversity',
      'a single 13 A diversity figure for all appliances',
      'the lighting diversity figure applied to cooking loads',
    ],
    correctAnswer: 0,
    explanation:
      'Commercial kitchen diversity considers which appliances are likely to operate together during peak service.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 49,
    question: 'Compared with equivalent fluorescent lighting, LED lighting loads are typically:',
    options: [
      'higher, requiring larger cables',
      'lower, potentially allowing the circuit to be reassessed',
      'identical, so no change is needed',
      'unpredictable and impossible to estimate',
    ],
    correctAnswer: 1,
    explanation:
      'LED loads are usually lower than equivalent fluorescent, potentially allowing circuit optimisation.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 50,
    question: 'When distributing single-phase loads across a three-phase supply, the aim is to:',
    options: [
      'connect all loads to a single phase for simplicity',
      'place the largest loads on the neutral conductor',
      'balance the loads across all three phases',
      'remove the neutral conductor entirely',
    ],
    correctAnswer: 2,
    explanation:
      'Three-phase design should balance single-phase loads across the phases to limit neutral current.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 51,
    question: 'Spare capacity in load calculations is desirable to allow for:',
    options: [
      'a reduction in the size of the main protective device',
      'the omission of diversity from the calculation',
      'a lower current-carrying capacity in the cables',
      'future expansion and a margin for operation',
    ],
    correctAnswer: 3,
    explanation:
      'Reasonable spare capacity allows for future additions and avoids continuous operation at maximum limits.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 52,
    question: 'In a dwelling with a 100 A supply, the calculated maximum demand is usually:',
    options: [
      'significantly less than 100 A because of diversity',
      'exactly 100 A in every case',
      'greater than 100 A, requiring an uprated supply',
      'equal to the total connected load',
    ],
    correctAnswer: 0,
    explanation:
      'Domestic diversity means actual maximum demand is typically much less than the total connected load.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 53,
    question: 'Standby generator sizing should be based on:',
    options: [
      'the total connected load of the entire installation',
      'the essential-loads maximum demand plus starting currents',
      'the rating of the incoming supply fuse only',
      'the lighting load of the building alone',
    ],
    correctAnswer: 1,
    explanation:
      'Generator sizing considers essential loads, starting requirements and load sequencing.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 54,
    question: 'A typical domestic immersion-heater element is rated at:',
    options: [
      '500 W',
      '10 kW',
      '3 kW',
      '100 W',
    ],
    correctAnswer: 2,
    explanation:
      'Standard immersion heaters are typically rated at 3 kW, though other ratings exist.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 55,
    question: 'UPS sizing calculations must consider the:',
    options: [
      'colour of the connected equipment’s cables',
      'ambient lighting level of the room',
      'rating of the building’s main earthing conductor',
      'connected equipment VA rating and power factor',
    ],
    correctAnswer: 3,
    explanation:
      'UPS sizing considers connected equipment VA ratings, power factor and the required backup duration.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 56,
    question: 'Data-centre load calculations are typically based on:',
    options: [
      'watts per square metre with little diversity, due to continuous high loads',
      'domestic diversity factors applied per rack',
      'lighting load estimates for the building',
      'the rating of a single socket-outlet',
    ],
    correctAnswer: 0,
    explanation:
      'Data centres have high continuous loads with limited diversity — often calculated per rack or per m².',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 57,
    question: 'Peak demand in a commercial building typically occurs:',
    options: [
      'overnight when the building is unoccupied',
      'during business hours when most systems operate',
      'only during planned maintenance periods',
      'at the moment the supply is first energised',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial peak demand usually aligns with business hours, when HVAC, lighting and equipment all operate.',
    section: '6.2',
    difficulty: 'basic',
  },
  {
    id: 58,
    question: 'When combining resistive and motor loads, the calculation must account for:',
    options: [
      'the identical power factor of all loads',
      'the lighting load only',
      'the different power factors of the two load types',
      'the prospective fault current at each load',
    ],
    correctAnswer: 2,
    explanation:
      'Motor and resistive loads have different power factors, which affects the combined calculation.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 59,
    question: 'The formula P = V²/R shows that, for a fixed resistance, power varies with the:',
    options: [
      'voltage linearly',
      'inverse of the voltage',
      'current only, independently of voltage',
      'square of the voltage',
    ],
    correctAnswer: 3,
    explanation:
      'For a fixed resistance, power varies with the square of the voltage, so voltage changes have a significant effect.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 60,
    question: 'In a three-phase four-wire system with perfectly balanced loads, the neutral current is:',
    options: [
      'theoretically zero',
      'equal to the line current',
      'three times the line current',
      'equal to the sum of the three phase currents',
    ],
    correctAnswer: 0,
    explanation:
      'With balanced three-phase loads, the phase currents cancel and the neutral current is theoretically zero.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 61,
    question: 'Harmonic currents affect neutral conductor sizing because:',
    options: [
      'harmonics always cancel completely in the neutral',
      'triple-N (third-order) harmonics add in the neutral rather than cancelling',
      'they reduce the current in every phase conductor',
      'they only affect the earthing conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Triple-N (third-order) harmonics do not cancel in the neutral and can cause significant neutral currents.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 62,
    question: 'A three-phase motor rated 15 kW, 0.85 pf, at 400 V draws approximately:',
    options: [
      '38 A',
      '15 A',
      '25 A',
      '50 A',
    ],
    correctAnswer: 2,
    explanation:
      'I = 15000 / (√3 × 400 × 0.85) ≈ 25 A.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 63,
    question: 'When assessing demand for a dwelling with EV charging, the designer should:',
    options: [
      'ignore the EV charger as it is a minor load',
      'subtract the EV charger load from the total demand',
      'apply the lighting diversity figure to the charger',
      'add the EV charger load with appropriate diversity',
    ],
    correctAnswer: 3,
    explanation:
      'The EV charger load should be added, with consideration of charging patterns and diversity with other loads.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 64,
    question: 'Demand-side response can reduce peak demand by:',
    options: [
      'scheduling non-essential loads away from peak times',
      'increasing the size of the supply cable',
      'running all loads simultaneously at peak times',
      'removing diversity from the calculation',
    ],
    correctAnswer: 0,
    explanation:
      'Demand-side management shifts flexible loads to reduce peak demand and improve load factor.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 65,
    question: 'A high load factor (the ratio of average to peak demand) indicates:',
    options: [
      'a load that is mostly idle with occasional peaks',
      'a consistent load profile making efficient use of capacity',
      'an installation that is significantly oversized',
      'frequent operation of protective devices',
    ],
    correctAnswer: 1,
    explanation:
      'A high load factor indicates consistent demand and efficient use of the installed capacity.',
    section: '6.2',
    difficulty: 'intermediate',
  },

  // Section 6.3: Cable Selection (Questions 66-100)
  {
    id: 66,
    question: 'The three main factors that govern cable sizing are:',
    options: [
      'colour, length and manufacturer',
      'cost, appearance and availability',
      'current-carrying capacity, voltage drop and fault (thermal) protection',
      'ambient temperature, humidity and altitude',
    ],
    correctAnswer: 2,
    explanation:
      'A cable must carry the design current, limit voltage drop and allow protective devices to operate correctly.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 67,
    question: 'In the relationship Ib ≤ In ≤ Iz:',
    options: [
      'Ib is cable capacity, In is design current and Iz is device rating',
      'Ib is device rating, In is cable capacity and Iz is design current',
      'all three symbols represent the prospective fault current',
      'Ib is design current, In is device rating and Iz is cable capacity',
    ],
    correctAnswer: 3,
    explanation:
      'Design current ≤ protective-device rating ≤ cable current-carrying capacity under the installed conditions.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 68,
    question: 'Derating (correction) factors reduce a cable’s capacity to account for:',
    options: [
      'higher ambient temperature, grouping and thermal insulation',
      'longer cable runs and voltage drop',
      'the rating of the protective device',
      'the colour of the cable insulation',
    ],
    correctAnswer: 0,
    explanation:
      'Derating accounts for conditions that reduce heat dissipation: high temperature, grouped cables and thermal insulation.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 69,
    question: 'If the ambient-temperature factor (Ca) is 0.87 and a cable is tabulated at 27 A, the corrected capacity is:',
    options: [
      '31 A',
      '23.5 A',
      '27 A, unchanged',
      '40 A',
    ],
    correctAnswer: 1,
    explanation:
      'Corrected capacity = 27 × 0.87 ≈ 23.5 A.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 70,
    question: 'The grouping factor (Cg) accounts for:',
    options: [
      'increased voltage drop on long runs',
      'mechanical damage to grouped cables',
      'reduced heat dissipation when cables are installed together',
      'the higher cost of installing many cables',
    ],
    correctAnswer: 2,
    explanation:
      'Grouped cables dissipate heat less effectively, requiring derating via the grouping factor.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 71,
    question: 'A cable in thermal insulation must be derated (Ci) because:',
    options: [
      'the insulation increases the conductor resistance',
      'the insulation reduces the supply voltage',
      'thermal insulation increases the fault current',
      'heat cannot dissipate effectively through thermal insulation',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal insulation significantly reduces heat dissipation, requiring substantial derating.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 72,
    question: 'For a cable completely surrounded by thermal insulation for more than 0.5 m, the factor Ci is:',
    options: [
      '0.5',
      '1.0',
      '0.88',
      '0.75',
    ],
    correctAnswer: 0,
    explanation:
      'A cable completely surrounded by thermal insulation over 0.5 m requires a 0.5 (50%) derating factor.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 73,
    question: 'Voltage drop in smaller cables is calculated essentially from:',
    options: [
      'V = I² × R',
      'V = I × R (using tabulated mV/A/m values)',
      'V = P / I',
      'V = I / R',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage drop uses mV/A/m values from tables, which incorporate resistance (and reactance for larger cables).',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 74,
    question: 'The maximum recommended voltage drop, origin to load, for a lighting circuit is:',
    options: [
      '5%',
      '8%',
      '3%',
      '10%',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 recommends a maximum voltage drop of 3% for lighting circuits (5% for other uses).',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 75,
    question: 'For a circuit with Ib = 25 A and a corrected cable capacity (Iz) of 24 A, the cable is:',
    options: [
      'correctly sized, with an adequate margin',
      'oversized for the design current',
      'suitable only if a 30 mA RCD is fitted',
      'undersized, because the design current exceeds the cable capacity',
    ],
    correctAnswer: 3,
    explanation:
      'The cable is undersized: Ib (25 A) must not exceed Iz (24 A corrected); a larger cable is needed.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 76,
    question: 'The mV/A/m value used in voltage-drop calculations:',
    options: [
      'varies with cable size and construction and is taken from tables',
      'is a fixed value for all cables',
      'depends only on the length of the run',
      'is the same as the cable’s current rating',
    ],
    correctAnswer: 0,
    explanation:
      'mV/A/m values vary with cable size and type and are found in the BS 7671 voltage-drop tables.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 77,
    question: 'For a 30 m run carrying 20 A with an mV/A/m of 18, the voltage drop is:',
    options: [
      '1.08 V',
      '10.8 V',
      '108 V',
      '0.108 V',
    ],
    correctAnswer: 1,
    explanation:
      'Vd = (mV/A/m × I × L) / 1000 = (18 × 20 × 30) / 1000 = 10.8 V.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 78,
    question: 'The adiabatic equation for protective-conductor sizing uses:',
    options: [
      'S = I × t × k',
      'S = k / √(I²t)',
      'S = √(I²t) / k, relating fault current, time and a conductor constant',
      'S = V / (I × R)',
    ],
    correctAnswer: 2,
    explanation:
      'The adiabatic equation S = √(I²t)/k calculates the minimum CPC size from fault current and disconnection time.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 79,
    question: 'Reference installation methods affect cable ratings because:',
    options: [
      'each method uses a different conductor material',
      'the methods change the supply voltage',
      'they alter the prospective fault current',
      'heat dissipation varies with the method of installation',
    ],
    correctAnswer: 3,
    explanation:
      'Different installation methods have different heat-dissipation characteristics, affecting current-carrying capacity.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 80,
    question: 'Clipped-direct cables (Method C) usually have higher ratings than enclosed cables (Method A) because:',
    options: [
      'clipped-direct cables dissipate heat more effectively than enclosed ones',
      'clipping increases the conductor cross-sectional area',
      'enclosures raise the supply voltage to the cable',
      'enclosed cables carry a lower fault current',
    ],
    correctAnswer: 0,
    explanation:
      'Clipped-direct cables dissipate heat more effectively than enclosed cables, allowing higher ratings.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 81,
    question: 'Steel-wire-armoured (SWA) cable is typically used for:',
    options: [
      'flexible connections to moving equipment',
      'underground and external installations requiring mechanical protection',
      'concealed wiring within plasterboard walls',
      'extra-low-voltage signalling circuits',
    ],
    correctAnswer: 1,
    explanation:
      'SWA provides mechanical protection, making it suitable for direct burial and external installation.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 82,
    question: 'XLPE insulation allows a higher operating temperature than PVC, which means:',
    options: [
      'a lower current rating for the same conductor size',
      'a larger conductor is always required',
      'a higher current rating for the same conductor size',
      'the cable cannot be used outdoors',
    ],
    correctAnswer: 2,
    explanation:
      'XLPE’s higher temperature rating (90°C versus 70°C for PVC) allows a higher current-carrying capacity.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 83,
    question: 'For earth-fault protection, the cable/device combination must achieve disconnection within:',
    options: [
      '0.1 s for all circuits without exception',
      '10 s for final circuits and 30 s for distribution',
      '1 s for every circuit irrespective of type',
      'the time specified for the circuit type (0.4 s for final, 5 s for distribution)',
    ],
    correctAnswer: 3,
    explanation:
      'Disconnection times depend on circuit type: 0.4 s for ≤32 A final circuits and 5 s for distribution circuits.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 84,
    question: 'The ‘k’ value in CPC sizing calculations represents a constant that depends on:',
    options: [
      'the conductor material and insulation type',
      'the length of the circuit',
      'the rating of the protective device',
      'the ambient temperature only',
    ],
    correctAnswer: 0,
    explanation:
      'k is a constant determined by the conductor material (copper/aluminium) and the insulation type.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 85,
    question: 'When voltage drop and current capacity require different cable sizes, the designer should:',
    options: [
      'use the smaller of the two calculated sizes',
      'use the larger cable that satisfies both requirements',
      'average the two calculated sizes',
      'use the size required for current only',
    ],
    correctAnswer: 1,
    explanation:
      'The cable must satisfy both requirements, so the larger of the two calculated sizes is used.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 86,
    question: 'Aluminium conductors compared with copper for the same current capacity:',
    options: [
      'need a smaller cross-section because of higher conductivity',
      'have exactly the same cross-section as copper',
      'need a larger cross-section because of their lower conductivity',
      'cannot be used for power circuits at all',
    ],
    correctAnswer: 2,
    explanation:
      'Aluminium has a lower conductivity than copper, so it needs a larger cross-section for equivalent capacity.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 87,
    question: 'Fire-performance cables (e.g. fire-resistant, LSHF) are selected for:',
    options: [
      'underground cable runs requiring armour',
      'flexible connections to portable equipment',
      'extra-low-voltage control wiring only',
      'emergency circuits, escape routes and limiting the spread of fire',
    ],
    correctAnswer: 3,
    explanation:
      'Fire-performance requirements apply to emergency systems and where fire or smoke spread must be limited.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 88,
    question: 'Flexible cables are typically selected for:',
    options: [
      'connections to moving equipment, or where flexibility is needed',
      'permanent buried distribution runs',
      'high-current busbar replacement',
      'circuits requiring the highest mechanical protection',
    ],
    correctAnswer: 0,
    explanation:
      'Flexible cables suit applications requiring movement or flexibility in the connection.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 89,
    question: 'Combined correction factors for cable sizing are obtained by:',
    options: [
      'adding all the applicable factors together',
      'multiplying all the applicable factors together',
      'taking the smallest single factor only',
      'taking the average of the factors',
    ],
    correctAnswer: 1,
    explanation:
      'The overall correction factor = Ca × Cg × Ci × Cc (all applicable factors multiplied together).',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 90,
    question: 'If the correction factors are 0.94, 0.82 and 0.75, the combined factor is approximately:',
    options: [
      '2.51',
      '0.84',
      '0.58',
      '0.75',
    ],
    correctAnswer: 2,
    explanation:
      'Combined = 0.94 × 0.82 × 0.75 ≈ 0.58.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 91,
    question: 'Cable sizing for motor circuits should additionally consider:',
    options: [
      'the lighting load of the building',
      'the diversity applied to socket-outlets',
      'the colour of the motor enclosure',
      'starting current and coordination with motor protection',
    ],
    correctAnswer: 3,
    explanation:
      'Motor cables must handle starting currents and coordinate with the motor’s protective devices.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 92,
    question: 'Ring final circuit cables are typically 2.5 mm² because:',
    options: [
      'two parallel paths share the current, which suits a 32 A protective device',
      'a single 2.5 mm² conductor can carry 32 A alone',
      'larger cables cannot fit into socket-outlet terminals',
      '2.5 mm² is the only size permitted for sockets',
    ],
    correctAnswer: 0,
    explanation:
      'A ring creates two parallel paths, so 2.5 mm² adequately carries roughly half the current in each leg.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 93,
    question: 'For circuits in potentially explosive atmospheres, cable selection must:',
    options: [
      'use the smallest available cross-section',
      'meet the specific requirements for the hazardous-area classification',
      'omit the protective conductor',
      'use only flexible cables',
    ],
    correctAnswer: 1,
    explanation:
      'Hazardous areas require cables and equipment certified for the specific zone classification.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 94,
    question: 'Voltage drop at operating temperature differs from that when cold because:',
    options: [
      'conductor resistance decreases with temperature',
      'the supply voltage rises when the cable is hot',
      'conductor resistance increases with temperature',
      'the cable cross-section expands significantly',
    ],
    correctAnswer: 2,
    explanation:
      'Conductor resistance increases with temperature, which affects voltage-drop calculations.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 95,
    question: 'For circuits protected by BS 88 fuses, the cable must be sized so that:',
    options: [
      'I2 ≥ 2 × Iz for overload protection',
      'the cable rating equals the fuse rating exactly',
      'the cable rating is half the fuse rating',
      'I2 ≤ 1.45 × Iz is satisfied for overload protection',
    ],
    correctAnswer: 3,
    explanation:
      'The cable must be protected so that I2 (the fuse operating current) does not exceed 1.45 times the cable capacity.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 96,
    question: 'Conduit-fill calculations ensure that:',
    options: [
      'cables can be drawn in without damage and heat dissipation is adequate',
      'the conduit is completely filled to capacity',
      'the conduit carries part of the load current',
      'the conduit replaces the need for a protective conductor',
    ],
    correctAnswer: 0,
    explanation:
      'Conduit-fill limits prevent installation damage and ensure adequate heat dissipation.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 97,
    question: 'Busbars are typically used instead of cables when:',
    options: [
      'very small currents must be distributed',
      'high currents require more effective heat dissipation and robust connections',
      'flexible connections to moving equipment are needed',
      'circuits are buried underground',
    ],
    correctAnswer: 1,
    explanation:
      'Busbars suit high-current applications, where heat management and connections benefit from a busbar system.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 98,
    question: 'Cable ratings in the BS 7671 tables assume specific reference conditions, typically:',
    options: [
      'an ambient temperature of 70°C',
      'a cable buried 1 m underground',
      'an ambient temperature of 30°C',
      'a maximum run length of 50 m',
    ],
    correctAnswer: 2,
    explanation:
      'Tabulated ratings assume reference conditions — typically 30°C ambient — requiring correction for other conditions.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 99,
    question: 'For very long cable runs, the dominant sizing factor is usually:',
    options: [
      'current-carrying capacity',
      'fault current withstand',
      'mechanical protection',
      'voltage drop',
    ],
    correctAnswer: 3,
    explanation:
      'Long runs often require upsizing for voltage drop even when current-carrying capacity is adequate.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 100,
    question: 'The minimum cross-sectional area of a protective conductor in most circuits is:',
    options: [
      'related to the phase-conductor size, via Table 54.7 or calculation',
      'always 1.0 mm² regardless of the phase conductor',
      'always equal to the phase-conductor size',
      'fixed at 16 mm² for all final circuits',
    ],
    correctAnswer: 0,
    explanation:
      'CPC minimum size relates to the phase-conductor size via Table 54.7, or by adiabatic calculation.',
    section: '6.3',
    difficulty: 'intermediate',
  },

  // Section 6.4: Protection Coordination (Questions 101-130)
  {
    id: 101,
    question: 'Protection coordination (discrimination) means:',
    options: [
      'all upstream devices operate together on any fault',
      'only the device nearest the fault operates, leaving other circuits unaffected',
      'the main switch always operates first on a fault',
      'no device operates until the fault clears itself',
    ],
    correctAnswer: 1,
    explanation:
      'Discrimination ensures the protective device nearest the fault operates first, maintaining supply elsewhere.',
    section: '6.4',
    difficulty: 'basic',
  },
  {
    id: 102,
    question: 'Back-up protection occurs when:',
    options: [
      'two devices always operate simultaneously',
      'the downstream device protects the upstream device',
      'an upstream device clears a fault if the closer device fails to operate',
      'the supply is disconnected before any device operates',
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
      'selecting the colour of the device casing',
      'calculating the supply voltage',
      'estimating the building’s lighting load',
      'understanding how devices respond at different fault-current levels',
    ],
    correctAnswer: 3,
    explanation:
      'Time-current curves show the operating time at different current levels, which is essential for coordination.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 104,
    question: 'For two fuses to discriminate, the upstream fuse rating should typically be:',
    options: [
      'at least 1.6 times the downstream fuse rating',
      'equal to the downstream fuse rating',
      'half the downstream fuse rating',
      'the same type but a lower rating than downstream',
    ],
    correctAnswer: 0,
    explanation:
      'Fuse discrimination typically requires the upstream rating to be at least 1.6× (often 2×) the downstream rating.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 105,
    question: 'The MCB type (B, C or D) affects coordination because:',
    options: [
      'different types have different rated voltages',
      'different types have different instantaneous (magnetic) trip levels',
      'the type changes the device’s breaking capacity only',
      'the type determines the cable colour',
    ],
    correctAnswer: 1,
    explanation:
      'MCB types trip at different multiples of rated current (B: 3–5×, C: 5–10×, D: 10–20×).',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 106,
    question: 'Type B MCBs trip instantaneously between:',
    options: [
      '1 and 2 times In',
      '5 and 10 times In',
      '3 and 5 times In',
      '10 and 20 times In',
    ],
    correctAnswer: 2,
    explanation:
      'Type B MCBs have an instantaneous magnetic trip between 3× and 5× the rated current.',
    section: '6.4',
    difficulty: 'basic',
  },
  {
    id: 107,
    question: 'Type C MCBs are typically used for:',
    options: [
      'standard lighting and socket circuits with no inrush',
      'circuits with very high transformer inrush',
      'extra-low-voltage signalling circuits',
      'motor circuits and equipment with moderate inrush current',
    ],
    correctAnswer: 3,
    explanation:
      'Type C MCBs (5–10× trip) suit motor circuits and equipment with higher inrush currents.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 108,
    question: 'Type D MCBs are appropriate for:',
    options: [
      'high-inrush loads such as transformers and X-ray equipment',
      'general lighting circuits with no inrush',
      'standard ring final socket circuits',
      'resistive heating loads only',
    ],
    correctAnswer: 0,
    explanation:
      'Type D MCBs (10–20× trip) suit very high-inrush applications such as transformers.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 109,
    question: 'RCD coordination between upstream and downstream RCDs requires:',
    options: [
      'identical 30 mA RCDs at every level',
      'an S-type (time-delayed) RCD upstream with appropriate current/time discrimination',
      'a lower-rated RCD upstream than downstream',
      'no time delay anywhere in the system',
    ],
    correctAnswer: 1,
    explanation:
      'An S-type (time-delayed) RCD upstream allows the downstream general RCD to operate first.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 110,
    question: 'The let-through energy (I²t) of a protective device is important for:',
    options: [
      'calculating the circuit’s normal load current',
      'setting the supply voltage tolerance',
      'ensuring cables and equipment survive the fault conditions',
      'determining the colour coding of conductors',
    ],
    correctAnswer: 2,
    explanation:
      'Let-through energy determines whether cables and equipment can withstand the fault energy without damage.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 111,
    question: 'The breaking capacity of a protective device must be:',
    options: [
      'no greater than the circuit’s normal load current',
      'equal to the device’s rated current',
      'half the prospective fault current',
      'at least equal to the prospective fault current at its point of installation',
    ],
    correctAnswer: 3,
    explanation:
      'A device’s breaking capacity must equal or exceed the maximum prospective fault current at its location.',
    section: '6.4',
    difficulty: 'basic',
  },
  {
    id: 112,
    question: 'If the prospective fault current is 8 kA, the minimum device breaking capacity should be:',
    options: [
      'at least 8 kA (a 10 kA-rated device is typically used)',
      'around 4 kA, allowing for diversity',
      'equal to the device’s rated current in amps',
      'no more than 6 kA to avoid over-specification',
    ],
    correctAnswer: 0,
    explanation:
      'Breaking capacity must at least equal the prospective fault current, so a 10 kA device would be suitable.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 113,
    question: 'Cascading (series rating) allows:',
    options: [
      'downstream devices to have a higher rating than the supply',
      'downstream devices of lower breaking capacity, if properly coordinated with the upstream device',
      'the omission of breaking-capacity requirements entirely',
      'two devices to share the same enclosure',
    ],
    correctAnswer: 1,
    explanation:
      'Properly coordinated cascading permits lower-rated downstream devices that are backed up by the upstream device.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 114,
    question: 'The purpose of current limiting in a protective device is to:',
    options: [
      'increase the fault current to ensure fast operation',
      'maintain a constant current during a fault',
      'reduce the actual fault current by operating before the prospective peak is reached',
      'delay operation until the fault current peaks',
    ],
    correctAnswer: 2,
    explanation:
      'Current-limiting devices operate fast enough to cut off the current below the prospective peak.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 115,
    question: 'For motor protection, the overload-relay setting should be:',
    options: [
      'set to twice the motor full-load current',
      'set to the motor starting current',
      'set to the cable’s current rating',
      'matched to the motor full-load current',
    ],
    correctAnswer: 3,
    explanation:
      'Overload protection is set at or near the motor full-load current to detect overload conditions.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 116,
    question: 'Short-circuit protection for a motor must:',
    options: [
      'allow the starting current to pass while still protecting against faults',
      'trip on the normal starting current',
      'be set below the full-load current',
      'be omitted because overload protection is sufficient',
    ],
    correctAnswer: 0,
    explanation:
      'Short-circuit protection must be set above the starting current to avoid nuisance tripping while still protecting against faults.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'Protection-coordination studies are typically required for:',
    options: [
      'simple single-circuit domestic installations',
      'complex commercial and industrial installations',
      'temporary festival lighting only',
      'extra-low-voltage circuits exclusively',
    ],
    correctAnswer: 1,
    explanation:
      'Complex installations with multiple protection levels need coordination studies to verify discrimination.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 118,
    question: 'The I²t withstand of a cable relates to:',
    options: [
      'the cable’s normal current-carrying capacity',
      'the cable’s voltage-drop performance',
      'the fault energy the cable can survive without insulation damage',
      'the cable’s mechanical strength',
    ],
    correctAnswer: 2,
    explanation:
      'I²t withstand indicates the fault energy a cable can survive without damage to its insulation.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'When MCBs and fuses are used together, achieving coordination requires:',
    options: [
      'using devices of identical rated current only',
      'placing the fuse downstream of the MCB in every case',
      'ignoring the device curves and relying on ratings alone',
      'analysis of the time-current curves to ensure the correct operating sequence',
    ],
    correctAnswer: 3,
    explanation:
      'Different device types require careful comparison of their curves to achieve discrimination.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 120,
    question: 'Ground-fault (earth-fault) protection in large systems provides:',
    options: [
      'additional earth-fault detection with adjustable settings for coordination',
      'protection against overload only',
      'a substitute for main protective bonding',
      'protection against overvoltage transients',
    ],
    correctAnswer: 0,
    explanation:
      'Ground-fault protection adds adjustable earth-fault detection coordinated with the other protection.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 121,
    question: 'Selectivity in RCD systems can be achieved by:',
    options: [
      'fitting identical 30 mA RCDs throughout',
      'using a time-delayed (S-type) and higher-rated RCD upstream',
      'placing the most sensitive RCD upstream',
      'removing the downstream RCD entirely',
    ],
    correctAnswer: 1,
    explanation:
      'RCD selectivity uses a time delay and/or a higher IΔn rating for the upstream device.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 122,
    question: 'A 100 mA S-type RCD upstream of 30 mA RCDs provides selectivity because:',
    options: [
      'the upstream device is more sensitive than the downstream device',
      'the two devices always operate together',
      'both the higher rating and the time delay let the downstream device operate first',
      'the upstream device has a lower rating',
    ],
    correctAnswer: 2,
    explanation:
      'The combination of a higher IΔn rating and a time delay ensures the downstream 30 mA device trips first.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 123,
    question: 'For circuits with electronic loads (e.g. variable-frequency drives), protection must consider:',
    options: [
      'the colour temperature of any connected lamps',
      'the reduced fault current that such loads cause',
      'the elimination of the neutral conductor',
      'high-frequency content that affects RCD operation and coordination',
    ],
    correctAnswer: 3,
    explanation:
      'Electronic loads can produce harmonics and DC components that affect standard protection.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 124,
    question: 'MCCB adjustable settings typically include:',
    options: [
      'long-time, short-time, instantaneous and earth-fault settings',
      'voltage, frequency and power-factor settings',
      'colour, position and labelling settings',
      'only a single fixed trip current',
    ],
    correctAnswer: 0,
    explanation:
      'MCCBs often have adjustable trip settings for several protection functions, which enables coordination.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 125,
    question: 'The term ‘fully rated’ in protection means:',
    options: [
      'each device is rated only for the circuit’s normal load',
      'each device is rated for the full prospective fault current at its location',
      'one device is rated to protect all others',
      'the devices share the fault duty between them',
    ],
    correctAnswer: 1,
    explanation:
      'Fully rated means each device has adequate breaking capacity for the fault current at its location.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 126,
    question: 'Series-rating (cascading) documentation should show:',
    options: [
      'the colour scheme of the distribution board',
      'the supply tariff and metering details',
      'manufacturer-tested combinations that have been approved',
      'the lighting layout of the building',
    ],
    correctAnswer: 2,
    explanation:
      'Cascaded combinations must be manufacturer-tested and approved, with the documentation available.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 127,
    question: 'For transformer secondary protection, the device must consider:',
    options: [
      'the lighting load of the building',
      'the colour of the transformer enclosure',
      'the ambient noise level of the room',
      'the effect of transformer impedance on the available fault current',
    ],
    correctAnswer: 3,
    explanation:
      'Transformer impedance limits the secondary fault current, which affects protection sizing.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 128,
    question: 'Arc-flash protection measures in design include:',
    options: [
      'fast-acting protective devices and arc-resistant equipment where appropriate',
      'increasing the let-through energy of devices',
      'removing protective devices to reduce arcing',
      'using larger enclosures with no other change',
    ],
    correctAnswer: 0,
    explanation:
      'Arc-flash mitigation uses fast protection and appropriate equipment design.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 129,
    question: 'Zone-selective interlocking (ZSI) allows:',
    options: [
      'all devices to trip simultaneously on any fault',
      'upstream devices to wait for downstream devices to clear a fault',
      'protective devices to be omitted from the system',
      'the supply voltage to be adjusted automatically',
    ],
    correctAnswer: 1,
    explanation:
      'ZSI provides communication between devices so that selective operation occurs with minimal delay.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 130,
    question: 'Documentation of protection coordination should include:',
    options: [
      'the building’s decorative finishes schedule',
      'the supplier’s connection charges',
      'single-line diagrams, device settings and coordination curves',
      'the manufacturer’s marketing literature',
    ],
    correctAnswer: 2,
    explanation:
      'Complete documentation includes single-line diagrams, device schedules, settings and coordination studies.',
    section: '6.4',
    difficulty: 'intermediate',
  },

  // Section 6.5: Earthing & Bonding (Questions 131-160)
  {
    id: 131,
    question: 'The primary purpose of earthing an installation is to:',
    options: [
      'reduce the installation’s energy consumption',
      'improve the power factor of the supply',
      'increase the supply voltage to the installation',
      'provide a path for fault current and limit touch voltages',
    ],
    correctAnswer: 3,
    explanation:
      'Earthing provides a fault-current path that enables protective-device operation and limits touch voltages.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 132,
    question: 'The main earthing terminal is the common connection point for:',
    options: [
      'circuit CPCs, bonding conductors and the earthing conductor',
      'the neutral conductors of every final circuit',
      'the live conductors of the incoming supply',
      'the metering and supply cut-out only',
    ],
    correctAnswer: 0,
    explanation:
      'The main earthing terminal is where circuit CPCs, bonding conductors and the earthing conductor are connected together.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 133,
    question: 'A TN-S earthing system has:',
    options: [
      'a combined neutral-and-earth conductor throughout',
      'separate neutral and earth conductors throughout, from the source',
      'no connection to the supply earth at all',
      'an earth electrode in place of a supply earth',
    ],
    correctAnswer: 1,
    explanation:
      'TN-S has a separate protective conductor throughout, typically provided by the supply cable sheath.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 134,
    question: 'A TN-C-S (PME) system uses:',
    options: [
      'separate PE and N conductors throughout the supply',
      'a local earth electrode in place of a supply earth',
      'a combined PEN conductor in the supply, separated into PE and N at the origin',
      'a combined PEN conductor throughout the installation',
    ],
    correctAnswer: 2,
    explanation:
      'TN-C-S combines neutral and earth in the supply (PEN), separating them into PE and N at the origin.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 135,
    question: 'A TT earthing system relies on:',
    options: [
      'a combined PEN conductor from the supply',
      'the supply cable sheath as the earth path',
      'no earth connection at all',
      'a local earth electrode independent of the supply earth',
    ],
    correctAnswer: 3,
    explanation:
      'TT systems use a local earth electrode that is independent of the supply system’s earthing.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 136,
    question: 'Main protective bonding connects:',
    options: [
      'extraneous-conductive-parts to the main earthing terminal',
      'exposed-conductive-parts to each final circuit',
      'the neutral bar to the live bar',
      'each socket-outlet to the next',
    ],
    correctAnswer: 0,
    explanation:
      'Main bonding connects incoming services (water, gas, structural steel) to the main earthing terminal.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 137,
    question: 'The minimum main-bonding conductor size for a domestic PME supply (PEN ≤ 35 mm²) is typically:',
    options: [
      '6mm²',
      '10mm²',
      '4mm²',
      '16mm²',
    ],
    correctAnswer: 1,
    explanation:
      'For a PME supply with a PEN conductor up to 35 mm², the minimum main bonding conductor is 10 mm² (Table 54.8).',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 138,
    question: 'Supplementary bonding is required in locations where:',
    options: [
      'the load current is particularly high',
      'cables are run underground',
      'the risk of electric shock is increased, such as in bathrooms',
      'three-phase supplies are present',
    ],
    correctAnswer: 2,
    explanation:
      'Supplementary bonding in special locations (such as bathrooms) reduces the touch voltage between parts.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 139,
    question: 'An extraneous-conductive-part is:',
    options: [
      'a metal part of electrical equipment that can become live under fault',
      'any plastic component within the installation',
      'a conductor that carries the load current',
      'a metal part not forming part of the installation but liable to introduce a potential',
    ],
    correctAnswer: 3,
    explanation:
      'Extraneous-conductive-parts can introduce a potential from outside the installation (e.g. metal water pipes).',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 140,
    question: 'An exposed-conductive-part is:',
    options: [
      'a metal part of electrical equipment that can become live under fault',
      'a metal part not forming part of the installation but able to introduce a potential',
      'a current-carrying conductor in normal use',
      'an insulating enclosure around live parts',
    ],
    correctAnswer: 0,
    explanation:
      'Exposed-conductive-parts are touchable metal of electrical equipment, not normally live but liable to be so under fault.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 141,
    question: 'The earthing conductor connects:',
    options: [
      'each socket-outlet to its protective conductor',
      'the main earthing terminal to the means of earthing',
      'the live conductor to the neutral conductor',
      'two extraneous-conductive-parts together',
    ],
    correctAnswer: 1,
    explanation:
      'The earthing conductor links the main earthing terminal to the earth electrode or the supply earth.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 142,
    question: 'In a TT system, the earth-electrode resistance must be low enough to:',
    options: [
      'allow a fuse to operate within 5 seconds',
      'eliminate the need for an RCD entirely',
      'ensure the RCD operates so that the touch voltage does not exceed 50 V (Ra × IΔn ≤ 50 V)',
      'keep the supply voltage within tolerance',
    ],
    correctAnswer: 2,
    explanation:
      'The electrode resistance must be low enough that the fault voltage does not exceed 50 V when the RCD operates (Ra × IΔn ≤ 50 V).',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 143,
    question: 'Types of earth electrode include:',
    options: [
      'PVC conduit and trunking',
      'flexible cords and flexes',
      'fuses and circuit-breakers',
      'rods, tapes, plates, foundation electrodes and structural steelwork',
    ],
    correctAnswer: 3,
    explanation:
      'Various electrode types are acceptable depending on soil conditions and installation requirements.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 144,
    question: 'PME supplies have specific bonding requirements because:',
    options: [
      'loss of the supply PEN conductor could make installation metalwork live',
      'PME supplies always have a higher fault current',
      'PME supplies use a local earth electrode',
      'PME bonding reduces the supply voltage',
    ],
    correctAnswer: 0,
    explanation:
      'If the PME PEN conductor fails, it could energise all bonded metalwork, so comprehensive bonding is required.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 145,
    question: 'Earthing and bonding conductor materials must be:',
    options: [
      'the cheapest metal available',
      'suitable for the environment and adequately protected against damage',
      'insulated to the full system voltage in every case',
      'identical in size to the live conductors',
    ],
    correctAnswer: 1,
    explanation:
      'Materials must withstand the environmental conditions and be adequately sized and protected.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 146,
    question: 'A circuit protective conductor (CPC) provides:',
    options: [
      'the load current path under normal conditions',
      'the bonding between incoming services',
      'an earth-fault return path for its circuit',
      'the connection between the live and neutral bars',
    ],
    correctAnswer: 2,
    explanation:
      'The CPC provides the earth-fault path from the exposed-conductive-parts back to the source.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 147,
    question: 'CPC sizing using Table 54.7 relates the CPC size to the:',
    options: [
      'length of the circuit',
      'rating of the main earthing conductor',
      'prospective fault current at the origin',
      'phase-conductor cross-sectional area',
    ],
    correctAnswer: 3,
    explanation:
      'Table 54.7 gives the minimum CPC size in relation to the associated phase-conductor size.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 148,
    question: 'The main earthing terminal in a consumer unit should be:',
    options: [
      'clearly identified and accessible for inspection and testing',
      'concealed behind the meter for protection',
      'sealed so that it cannot be disturbed',
      'located outside the building only',
    ],
    correctAnswer: 0,
    explanation:
      'The main earthing terminal must be clearly identified and accessible for inspection and testing.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 149,
    question: 'Functional earthing differs from protective earthing in that it:',
    options: [
      'replaces the need for protective earthing',
      'provides earthing for correct equipment operation rather than for safety',
      'carries the full fault current of the circuit',
      'connects extraneous-conductive-parts together',
    ],
    correctAnswer: 1,
    explanation:
      'Functional earthing enables equipment to work correctly (e.g. filters), as distinct from safety earthing.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 150,
    question: 'A combined protective-and-neutral (PEN) conductor in a TN-C system must be:',
    options: [
      'no larger than 2.5 mm² copper',
      'the same size as the smallest final-circuit conductor',
      'at least 10 mm² copper, or 16 mm² aluminium, minimum',
      'insulated only at its terminations',
    ],
    correctAnswer: 2,
    explanation:
      'PEN conductors have specified minimum sizes (10 mm² copper / 16 mm² aluminium) because they serve both functions.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 151,
    question: 'Earth clamps and connections at extraneous-conductive-parts should be:',
    options: [
      'left unlabelled to avoid confusion',
      'painted the same colour as the pipework',
      'fitted with a removable cover only',
      'labelled ‘Safety Electrical Connection – Do Not Remove’',
    ],
    correctAnswer: 3,
    explanation:
      'Earth connections must carry the label ‘Safety Electrical Connection – Do Not Remove’.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 152,
    question: 'Automatic disconnection of supply (ADS) relies on:',
    options: [
      'the earth-fault loop impedance being low enough for the protective device to operate',
      'a high earth-electrode resistance',
      'the supply voltage being above nominal',
      'the absence of any protective conductor',
    ],
    correctAnswer: 0,
    explanation:
      'ADS requires a low enough earth-fault loop impedance to cause rapid operation of the protective device.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 153,
    question: 'For an outbuilding supplied from the main building, the earthing arrangement should:',
    options: [
      'always extend the PME earth without restriction',
      'consider whether PME conditions permit extension, or whether a local TT system is needed',
      'never include any earthing at all',
      'rely solely on the outbuilding’s metal cladding',
    ],
    correctAnswer: 1,
    explanation:
      'Outbuilding earthing must consider PME restrictions and may require a local TT system.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 154,
    question: 'Where a lightning protection system is installed, its earthing should be:',
    options: [
      'kept completely separate from the installation earthing',
      'connected to the neutral conductor',
      'bonded to the installation earthing',
      'left unconnected to any earth',
    ],
    correctAnswer: 2,
    explanation:
      'Lightning protection earth should be bonded to the installation earth to prevent dangerous potential differences.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 155,
    question: 'A metallic gas installation pipe requires main bonding:',
    options: [
      'at the gas main in the street',
      'only at the appliance connection',
      'at any convenient point above ground level',
      'within 600 mm of the meter, on the consumer side',
    ],
    correctAnswer: 3,
    explanation:
      'Gas bonding should be within 600 mm of the meter on the consumer side (or where the pipe first becomes accessible).',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 156,
    question: 'A metallic water installation pipe requires main bonding where:',
    options: [
      'it enters the building (or within 600 mm of the internal stopcock)',
      'it passes the consumer unit',
      'it connects to the first tap',
      'it is buried beneath the property',
    ],
    correctAnswer: 0,
    explanation:
      'Water bonding is made at the point of entry, or within 600 mm of the internal stopcock.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 157,
    question: 'A plastic section in a metallic water system affects bonding because:',
    options: [
      'the whole pipe no longer needs any bonding',
      'the metal sections each side may need individual bonding assessment',
      'the plastic itself must be bonded',
      'the bonding must be doubled in size',
    ],
    correctAnswer: 1,
    explanation:
      'A plastic section can isolate metal sections, so each metal length may need individual bonding assessment.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 158,
    question: 'A metallic oil supply pipe typically requires bonding where it is:',
    options: [
      'made of plastic throughout',
      'buried below the property only',
      'metal and within the building (an extraneous-conductive-part)',
      'fitted with a non-metallic tank',
    ],
    correctAnswer: 2,
    explanation:
      'Metal oil pipes within a building require bonding where they are extraneous-conductive-parts.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 159,
    question: 'In a bathroom, supplementary bonding (where required) connects:',
    options: [
      'only the metal bath to the cold-water pipe',
      'the lighting circuit to the shower circuit',
      'the supply neutral to the local pipework',
      'all simultaneously accessible extraneous- and exposed-conductive-parts together',
    ],
    correctAnswer: 3,
    explanation:
      'Supplementary bonding in a bathroom connects all simultaneously accessible conductive parts together.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question: 'The ‘Ze’ value at the origin represents the:',
    options: [
      'external earth-fault loop impedance of the supply',
      'total earth-fault loop impedance including the final circuit',
      'resistance of the installation’s earth electrode only',
      'impedance of the final-circuit CPC',
    ],
    correctAnswer: 0,
    explanation:
      'Ze is the external earth-fault loop impedance, measured at the origin with the installation disconnected.',
    section: '6.5',
    difficulty: 'intermediate',
  },

  // Section 6.6: Special Locations (Questions 161-185)
  {
    id: 161,
    question: 'Special locations in Part 7 of BS 7671 require:',
    options: [
      'fewer protective measures than standard installations',
      'additional or modified requirements beyond the standard rules',
      'no earthing or bonding at all',
      'the use of aluminium conductors only',
    ],
    correctAnswer: 1,
    explanation:
      'Part 7 locations present an increased risk, requiring additional or modified protective measures.',
    section: '6.6',
    difficulty: 'basic',
  },
  {
    id: 162,
    question: 'Bathroom zones define:',
    options: [
      'the maximum number of socket-outlets permitted',
      'the colour of accessories to be used',
      'areas with specific equipment and protection requirements',
      'the route the cables must take',
    ],
    correctAnswer: 2,
    explanation:
      'Zones 0, 1 and 2 define areas with specific IP-rating and equipment requirements.',
    section: '6.6',
    difficulty: 'basic',
  },
  {
    id: 163,
    question: 'Zone 0 in a bathroom is:',
    options: [
      'the area immediately above the wash basin',
      'the space around the bathroom door',
      'the area more than 3 m from the bath',
      'the interior of the bath tub or shower basin',
    ],
    correctAnswer: 3,
    explanation:
      'Zone 0 is the interior of the bath or shower tray — the highest-risk area.',
    section: '6.6',
    difficulty: 'basic',
  },
  {
    id: 164,
    question: 'Equipment in bathroom zone 1 must have a minimum degree of protection of:',
    options: [
      'IPX4 (or IPX5 where water jets are used for cleaning)',
      'IP20 in all cases',
      'IPX8 in all cases',
      'IP2X with no water rating',
    ],
    correctAnswer: 0,
    explanation:
      'Zone 1 requires a minimum of IPX4 (or IPX5 where water jets are used for cleaning).',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 165,
    question: 'Swimming-pool installations must consider:',
    options: [
      'a single zone with standard domestic requirements',
      'zones with strict requirements, including SELV and supplementary bonding where applicable',
      'no special measures beyond an RCD',
      'the lighting load of the building only',
    ],
    correctAnswer: 1,
    explanation:
      'Swimming-pool zones have strict requirements, including SELV where applicable and supplementary bonding.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 166,
    question: 'Sauna installations must consider that:',
    options: [
      'low humidity removes the need for any protection',
      'the supply voltage must be increased',
      'high temperatures require heat-resistant cables and equipment',
      'standard PVC cable is always suitable',
    ],
    correctAnswer: 2,
    explanation:
      'High sauna temperatures require cables and equipment rated for elevated temperatures.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question: 'Construction-site installations require:',
    options: [
      'standard domestic accessories throughout',
      'no RCD protection on socket circuits',
      'only fixed wiring with no flexible cables',
      'reduced voltage where appropriate, RCD protection and robust equipment',
    ],
    correctAnswer: 3,
    explanation:
      'Construction sites need reduced-voltage supplies where appropriate, RCD protection and equipment suited to harsh conditions.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 168,
    question: 'Agricultural and horticultural installations have special requirements due to the:',
    options: [
      'presence of livestock, dust, moisture and corrosive atmospheres',
      'high prospective fault current of rural supplies',
      'requirement for three-phase supplies in all cases',
      'low ambient temperatures only',
    ],
    correctAnswer: 0,
    explanation:
      'Agricultural premises face livestock-contact risk, moisture, dust and potentially corrosive environments.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 169,
    question: 'In agricultural and horticultural premises, socket-outlet circuits must be protected by:',
    options: [
      'a 100 mA RCD only',
      'an RCD with a rated residual operating current not exceeding 30 mA',
      'overcurrent protection alone, with no RCD',
      'a 300 mA RCD only',
    ],
    correctAnswer: 1,
    explanation:
      'Section 705 requires socket-outlet circuits in agricultural and horticultural premises to be protected by a 30 mA RCD.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 170,
    question: 'Caravan-park electrical design must provide:',
    options: [
      'standard BS 1363 13 A sockets at each pitch',
      'a single shared RCD for the whole park',
      'correctly rated BS EN 60309 socket-outlets with individual RCD protection at each pitch',
      'unprotected socket-outlets at each pitch',
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
      'high ambient temperatures only',
      'the lighting load of nearby buildings',
      'the absence of any earthing requirement',
      'water proximity, floating structures and the harsh marine environment',
    ],
    correctAnswer: 3,
    explanation:
      'Marinas face water exposure, floating structures and a harsh marine environment requiring specific measures.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 172,
    question: 'Temporary installations at exhibitions and shows require:',
    options: [
      'specific attention to public safety and more frequent inspection',
      'permanent fixed wiring throughout',
      'no RCD protection because of the temporary nature',
      'the same regime as a permanent domestic installation',
    ],
    correctAnswer: 0,
    explanation:
      'Exhibition installations need careful attention because of public access and their temporary nature.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 173,
    question: 'Solar PV installation design must include:',
    options: [
      'only AC isolation at the consumer unit',
      'DC-system considerations, isolation provisions and specific labelling',
      'no isolation, as the array is inherently safe',
      'standard lighting-circuit protection only',
    ],
    correctAnswer: 1,
    explanation:
      'PV systems have DC-circuit requirements, isolation provisions and specific labelling requirements.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 174,
    question: 'Electric-vehicle charging installations require:',
    options: [
      'a shared circuit with the kitchen ring final',
      'no RCD, as the charger provides its own protection',
      'dedicated circuits with appropriate RCD protection and compliant equipment',
      'standard 13 A socket-outlets without protection',
    ],
    correctAnswer: 2,
    explanation:
      'EV charging requires dedicated circuits, appropriate protection and compliant charging equipment.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 175,
    question: 'Medical locations have specific requirements for:',
    options: [
      'the colour of the wall sockets only',
      'reduced bonding to limit fault current',
      'standard domestic protection throughout',
      'IT systems, equipotential bonding and supply reliability in critical areas',
    ],
    correctAnswer: 3,
    explanation:
      'Medical locations require specialised earthing, IT systems for critical areas and reliable supplies.',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 176,
    question: 'Hazardous-area (explosive-atmosphere) design requires:',
    options: [
      'equipment certified for the relevant zone classification',
      'standard equipment with an extra coat of paint',
      'the omission of protective devices',
      'the use of the cheapest available equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Hazardous areas require certified equipment for the relevant zone (0, 1, 2 for gas; 20, 21, 22 for dust).',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 177,
    question: 'Conducting locations with restricted movement require:',
    options: [
      'an increased supply voltage',
      'SELV, or other specific protective measures',
      'no protective measures, as movement is restricted',
      'standard 230 V equipment without modification',
    ],
    correctAnswer: 1,
    explanation:
      'Conducting restricted locations increase the shock risk, requiring SELV or other specific protective measures.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 178,
    question: 'Operating and maintenance gangways must provide for:',
    options: [
      'storage of spare cable and equipment',
      'the routing of all final circuits',
      'safe access, adequate working space and emergency escape',
      'concealment of the distribution equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Gangways must allow safe access, adequate working space and emergency egress.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 179,
    question: 'Floor and ceiling heating systems require:',
    options: [
      'a higher supply voltage than other circuits',
      'no thermal protection, as they self-regulate',
      'the omission of a protective conductor',
      'protection against overheating and mechanical damage',
    ],
    correctAnswer: 3,
    explanation:
      'Heating systems need thermal cut-outs, mechanical protection and consideration of temperature effects.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 180,
    question: 'Outdoor lighting installations must consider:',
    options: [
      'weather exposure, IP rating and mechanical protection',
      'the building’s internal lighting load only',
      'the colour temperature of the lamps alone',
      'the omission of RCD protection',
    ],
    correctAnswer: 0,
    explanation:
      'Outdoor installations face the weather, require appropriate IP ratings and may need mechanical protection.',
    section: '6.6',
    difficulty: 'basic',
  },
  {
    id: 181,
    question: 'Fountains and water features have requirements similar to those for:',
    options: [
      'agricultural premises',
      'swimming pools, with defined zones',
      'construction sites',
      'medical locations',
    ],
    correctAnswer: 1,
    explanation:
      'Fountains have zone requirements similar to swimming pools because of the water-contact risk.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 182,
    question: 'Supplies to mobile or transportable units must include:',
    options: [
      'a permanent fixed-wiring connection only',
      'no earthing, because the unit is mobile',
      'appropriate connection means and protective measures for their mobile use',
      'standard domestic accessories without protection',
    ],
    correctAnswer: 2,
    explanation:
      'Mobile units require suitable supply connections and protective measures appropriate to their mobile nature.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 183,
    question: 'Electrical installations in caravans must comply with:',
    options: [
      'BS 7671 Section 701',
      'BS 7671 Section 711',
      'BS 7671 Section 740',
      'BS 7671 Section 721',
    ],
    correctAnswer: 3,
    explanation:
      'Caravan installations have specific requirements in BS 7671 Section 721.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 184,
    question: 'Emergency lighting design must ensure:',
    options: [
      'adequate illumination, for the required duration, with high reliability',
      'illumination only while the mains supply is present',
      'the lowest possible light output to save energy',
      'lighting that operates for a maximum of 30 seconds',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting must provide the required illumination level, for the specified duration, with high reliability.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 185,
    question: 'Fire-alarm system wiring should:',
    options: [
      'use standard PVC cable run alongside power cables',
      'use fire-resistant cables and follow BS 5839 requirements',
      'share a circuit with the general lighting',
      'omit any form of mechanical protection',
    ],
    correctAnswer: 1,
    explanation:
      'Fire-alarm wiring requires fire-resistant cables and compliance with BS 5839.',
    section: '6.6',
    difficulty: 'intermediate',
  },

  // Section 6.7: Design Documentation (Questions 186-200)
  {
    id: 186,
    question: 'Design documentation must include:',
    options: [
      'the contractor’s pricing and profit margin',
      'photographs of the completed decoration',
      'sufficient information to verify the design and enable safe operation',
      'the supplier’s tariff details',
    ],
    correctAnswer: 2,
    explanation:
      'Documentation must enable verification of the design and provide information for safe operation and maintenance.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 187,
    question: 'Single-line diagrams show:',
    options: [
      'the exact physical position of every cable',
      'the decorative finishes of the building',
      'the supply tariff and metering arrangements',
      'a simplified representation of the circuits and equipment',
    ],
    correctAnswer: 3,
    explanation:
      'Single-line diagrams show the circuit arrangement in a simplified form, for an overall understanding.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 188,
    question: 'Schematic diagrams provide:',
    options: [
      'the functional relationships between components',
      'the physical dimensions of the building',
      'the cost breakdown of the installation',
      'the manufacturer’s warranty terms',
    ],
    correctAnswer: 0,
    explanation:
      'Schematics show how circuits function and how the components interconnect logically.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 189,
    question: 'Layout drawings show:',
    options: [
      'the functional logic of the control circuits',
      'the physical positions of equipment and the cable routes',
      'the time-current curves of the protective devices',
      'the diversity factors applied to the loads',
    ],
    correctAnswer: 1,
    explanation:
      'Layout drawings show where equipment is physically located and how cables are routed.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 190,
    question: 'Design calculations should demonstrate:',
    options: [
      'the cheapest possible material selection',
      'the contractor’s preferred working methods',
      'compliance with cable-sizing, protection and voltage-drop requirements',
      'the supplier’s connection charges',
    ],
    correctAnswer: 2,
    explanation:
      'Calculations demonstrate compliance with the technical requirements of BS 7671.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 191,
    question: 'Equipment schedules list:',
    options: [
      'the labour hours for each task',
      'the decorative finishes for each room',
      'the supply tariff for the installation',
      'equipment types, ratings and locations',
    ],
    correctAnswer: 3,
    explanation:
      'Schedules itemise equipment with their specifications and their positions in the installation.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 192,
    question: 'Cable schedules should include:',
    options: [
      'cable types, sizes, routes and the associated protective devices',
      'the colour scheme of the consumer unit',
      'the labour rates for installation',
      'the supply network operator’s details',
    ],
    correctAnswer: 0,
    explanation:
      'Cable schedules detail cable specifications, routes and the associated protection.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 193,
    question: 'The design section of the Electrical Installation Certificate requires the designer to confirm that:',
    options: [
      'the cheapest materials have been used',
      'the design meets the requirements of BS 7671',
      'the work will be completed by a fixed date',
      'the supply will never need to be uprated',
    ],
    correctAnswer: 1,
    explanation:
      'Design certification confirms that the design complies with BS 7671 and the designer’s specification.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 194,
    question: 'As-built documentation is necessary when:',
    options: [
      'the installation exactly matches the design',
      'no protective devices have been used',
      'the final installation differs from the original design',
      'the client requests a lower price',
    ],
    correctAnswer: 2,
    explanation:
      'As-built records are needed where the installation varies from the original design.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 195,
    question: 'Design risk assessments should identify:',
    options: [
      'the cheapest available components',
      'the contractor’s preferred suppliers',
      'the supply tariff and metering details',
      'hazards and the mitigation measures incorporated in the design',
    ],
    correctAnswer: 3,
    explanation:
      'Design risk assessments identify hazards and show how the design addresses them.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 196,
    question: 'Technical specifications define:',
    options: [
      'the performance requirements and the standards to be met',
      'the colour scheme of the building',
      'the contractor’s profit margin',
      'the date the supply was connected',
    ],
    correctAnswer: 0,
    explanation:
      'Specifications set out the performance requirements and the applicable standards.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 197,
    question: 'Operation and maintenance (O&M) manuals should include:',
    options: [
      'the contractor’s pricing breakdown',
      'information for the safe operation and maintenance of the installation',
      'the architect’s decorative drawings',
      'the supplier’s tariff schedule',
    ],
    correctAnswer: 1,
    explanation:
      'O&M manuals provide essential information for the safe, ongoing operation and maintenance of the installation.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 198,
    question: 'Design documentation should be retained:',
    options: [
      'for 12 months only, then destroyed',
      'only until the installation is energised',
      'for the life of the installation, for future reference',
      'until the first inspection is completed',
    ],
    correctAnswer: 2,
    explanation:
      'Design documentation should be retained throughout the installation’s life for reference.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 199,
    question: 'Changes to the design during construction should be:',
    options: [
      'made verbally without any record',
      'left for the next contractor to discover',
      'ignored if they appear minor',
      'documented and verified to ensure continued compliance',
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
      'integrated design information and coordination with other building services',
      'a substitute for BS 7671 compliance',
      'a method of pricing the installation only',
      'an automatic test result for every circuit',
    ],
    correctAnswer: 0,
    explanation:
      'BIM integrates design data and enables coordination between the electrical and other building services.',
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
