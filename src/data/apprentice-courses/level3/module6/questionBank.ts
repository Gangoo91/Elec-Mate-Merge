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

import {
  drawWeighted,
  LEVEL3_WEIGHTS,
  type DifficultyWeights,
} from '@/utils/apprenticeQuestionDraw';

export const module6Questions: Question[] = [

  // Section 6.1: Design Principles (Questions 1-30)
  {
    id: 1,
    question: 'The fundamental objective of electrical installation design is to provide:',
    options: [
      'the lowest possible installation cost above all other factors',
      'safety and functionality at reasonable cost',
      'the maximum number of circuits the supply can carry',
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
      'electric shock and fire only, with all other hazards outside the scope',
      'mechanical damage and corrosion, but not shock, fire or overcurrent',
      'overcurrent alone, since all other risks are covered by the network operator',
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
      'the incoming device rating alone, since every other characteristic follows from it',
      'the conductor colour identification and labelling scheme for the finished work',
      'the schedule of test results and the inspection certificates issued on completion',
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
      'electrical interference from neighbouring installations and equipment',
      'environmental and utilisation conditions affecting the installation',
      'the influence the supply network operator has over the finished design',
      'changes requested by the client once the installation work has started',
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
      'operate indefinitely without any inspection, testing or repair',
      'be completely dismantled and replaced rather than maintained in place',
      'be safely accessed for future inspection, testing and maintenance',
      'be maintained solely by the original installer of the work',
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
      'reduce the total number of protective devices required at the distribution board',
      'allow any single fault to disconnect every circuit in the installation at once',
      'remove the need for a main switch at the origin of the installation',
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
      'size only for present demand, as later additions are a separate job',
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
      'the colour of the cable insulation chosen for the circuit',
      'the manufacturer of the consumer unit fitted at the origin',
      'the ambient temperature on the day the work is carried out',
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
      'the rated current of the protective device fitted',
      'the tabulated current-carrying capacity of the cable used',
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
      'remove the need to comply with the requirements of BS 7671',
      'transfer all responsibility for the design on to the installer',
      'reduce the cost of the installation by omitting protective devices',
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
      'number of accessories the architect has specified on the drawings',
      'colour scheme the client has requested for the distribution board',
      'preferred manufacturer of the protective devices and enclosures',
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
      'all circuits within the installation operate at the same supply frequency',
      'equipment does not cause, or suffer from, electromagnetic interference',
      'cable routes are kept as short as physically possible to limit radiated noise',
      'only metallic wiring systems are used, since plastic offers no screening',
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
      'define the maximum demand of any domestic installation',
      'list the maximum disconnection times of final circuits',
      'set requirements for the selection and erection of equipment',
      'specify the colours of conductors and the marking of terminals',
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
      'normal operation only, since faults cannot be foreseen at design',
      'the appearance of the finished installation above every other factor',
      'the working preferences of the installation team on site',
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
      'unnecessary once the drawings have been issued to the contractor',
      'required only where the client requests a variation to the works',
      'the sole responsibility of the operator of the distribution network',
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
      'using the smallest cables that will physically fit the conduit',
      'omitting protective devices to cut the losses in the board',
      'selecting efficient equipment and optimising circuit arrangements',
      'running every circuit continuously at the maximum current of the cable',
    ],
    correctAnswer: 2,
    explanation:
      'Energy efficiency includes equipment selection, power factor, voltage drop and circuit optimisation.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 23,
    question: 'Basic protection ensures that:',
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
    question: 'Fault protection ensures that:',
    options: [
      'automatic disconnection or other measures prevent shock from exposed-conductive-parts',
      'live parts are placed out of reach or behind barriers so they cannot be touched at all',
      'the installation is divided into enough circuits to limit danger and inconvenience',
      'conductors are identified by the correct colours so that live parts are easily recognised',
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
      'the chosen installer is available to start work immediately',
      'the design meets BS 7671 and the client’s requirements',
      'the cheapest available materials have been specified throughout',
      'the existing supply will never need to be uprated in future',
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
      'the brand favoured by the wholesaler and its availability from stock',
      'the rated voltage alone, as the current is limited by the protective device',
      'voltage, current, frequency, power and environmental conditions',
      'the date of manufacture, since older equipment must be derated',
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
      'the manufacturer of the protective devices fitted',
      'the client who commissioned and paid for the installation work',
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
      'every conceivable installation, so that design calculation is never needed',
      'hazardous areas and explosive atmospheres, which cannot be designed freely',
      'circuits exceeding 100 A, where individual design becomes impractical',
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
      'no protective measures at all, as the general rules are sufficient',
      'additional or modified requirements beyond the standard rules',
      'only a reduction in the number of socket-outlets installed',
      'the use of aluminium conductors throughout the special location',
    ],
    correctAnswer: 1,
    explanation:
      'Part 7 special locations require additional or modified protective measures beyond the standard requirements.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 30,
    question: 'In what order are the following design steps carried out?',
    options: [
      'install > inspect > calculate > document',
      'document > select > inspect > calculate',
      'assess > calculate > select > document',
      'select > install > calculate > document',
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
    question: 'In a domestic ring final circuit, socket-outlets are assumed to share the load because:',
    options: [
      'based on diversity, often well below the full 13 A per socket',
      'taken as the full 13 A at every socket used simultaneously',
      'fixed at 32 A regardless of how many sockets are fitted on the ring',
      'equal to the current-carrying capacity of the circuit cable',
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
      'I = P × V × pf for all single-phase loads',
      'I = V / (P × pf) for all power-factor loads',
      'I = P / (V × pf) for power-factor loads',
      'I = P × √3 / (V × pf) for single-phase loads',
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
      'I = (P × pf) / (√3 × VL)',
      'I = (P × √3) / (VL × pf)',
      'I = P / (3 × VL × pf)',
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
    question: 'What current does a 3 kW resistive heater draw at 230 V?',
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
      '50% of the total cooker rating, with no allowance for a socket-outlet',
      'the first 10 A plus 30% of the remainder, plus 5 A if a socket is fitted',
      'the first 5 A plus 50% of the remainder, with no allowance for a socket',
      'the full rated load of the cooking appliance with no diversity applied at all',
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
    question: 'What minimum current demand is assumed for each lighting outlet in a dwelling?',
    options: [
      '100 W per outlet, or the actual connected load if higher',
      '10 W per outlet regardless of the fittings installed',
      '500 W per outlet in every case, whatever fittings are installed',
      '13 A per lighting point, regardless of the load connected to it',
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
      'true power (W) always exceeds apparent power (VA) on every load',
      'apparent power (VA) exceeds true power (W) for reactive loads',
      'a low power factor alters the supply voltage measured at the origin',
      'the power factor has no effect on the current drawn by the load',
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
      'the full 13 A at every outlet, with no diversity applied',
      'the rated current of the main switch divided by two',
      'a fixed 100 A for the installation, regardless of the floor area',
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
      'the maximum demand remaining after diversity has been applied',
      'the rating of the protective device serving the circuit',
      'the current-carrying capacity of the cable supplying the circuit',
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
      'the general lighting load of the building it serves',
      'the standby power consumption of the unit when idle',
      'both heating and cooling loads where applicable',
      'the rating of the fuse in the incoming supply only',
    ],
    correctAnswer: 2,
    explanation:
      'Heat pumps may present different loads in heating and cooling modes — both should be considered.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 47,
    question: 'How is the design current of a discharge lighting circuit determined?',
    options: [
      'lamp watts / voltage with no allowance made for control gear',
      '0.5 × lamp watts / voltage, with no allowance for control gear',
      'lamp watts × voltage / 1000, multiplied by 1.8 for the control gear',
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
      'the full rating of every appliance, with no diversity',
      'a single 13 A diversity figure applied to every appliance present',
      'the lighting diversity figure applied to all of the cooking loads',
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
      'higher, requiring larger cables and a larger protective device',
      'lower, potentially allowing the circuit to be reassessed',
      'identical, so the existing circuit requires no reassessment',
      'unpredictable, so the circuit loading cannot be estimated at all',
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
      'exactly 100 A in every dwelling of this size',
      'greater than 100 A, so an uprated supply is required',
      'equal to the total connected load of the dwelling',
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
      'the rating of the incoming supply fuse provided at the origin',
      'the lighting load of the building, ignoring all other loads',
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
      'domestic diversity factors applied to each rack to allow for staggered use',
      'the general lighting load of the building, scaled up for the equipment rooms',
      'the rating of a single socket-outlet multiplied by the number of racks',
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
      'overnight, when the building is completely unoccupied',
      'during business hours when most systems operate',
      'during planned maintenance periods, when plant is tested',
      'at the moment the supply to the building is first energised',
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
      'the identical power factor of both load types',
      'the lighting load supplied by the circuit only',
      'the different power factors of the two load types',
      'the prospective fault current measured at each load point',
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
      'the sum of the three phase currents',
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
      'harmonics cancel completely in the neutral, so it may be reduced in size',
      'triple-N (third-order) harmonics add in the neutral rather than cancelling',
      'they reduce the current in each line conductor, easing the loading on the neutral',
      'they flow only in the circuit protective conductor and never in the neutral',
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
      'treat the EV charger as a minor load needing no allowance',
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
      'increasing the size of the supply cable and the main fuse',
      'running all of the loads simultaneously at peak times',
      'removing diversity from the maximum demand calculation',
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
      'a load that is mostly idle, with occasional short peaks',
      'a consistent load profile making efficient use of capacity',
      'an installation that has been significantly oversized',
      'the frequent operation of protective devices on the installation',
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
      'insulation colour, the length of the run and the manufacturer of the cable',
      'cost, appearance and the availability of the cable from the wholesaler used',
      'current-carrying capacity, voltage drop and fault (thermal) protection',
      'ambient temperature, air humidity and the height above sea level',
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
      'Ib is cable capacity, In is design current and Iz is the device rating',
      'Ib is device rating, In is cable capacity and Iz is the design current',
      'all three symbols stand for the prospective fault current at the origin',
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
    question: 'Rating factors reduce a cable\'s current-carrying capacity to account for:',
    options: [
      'higher ambient temperature, grouping and thermal insulation',
      'longer cable runs and the resulting increase in voltage drop',
      'the rated current of the overcurrent protective device',
      'the colour and thickness of the cable insulation',
    ],
    correctAnswer: 0,
    explanation:
      'Derating accounts for conditions that reduce heat dissipation: high temperature, grouped cables and thermal insulation.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 69,
    question: 'A cable has a tabulated current-carrying capacity of 27 A and an ambient temperature factor of 0.87 applies. What is its corrected capacity?',
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
      'increased voltage drop on long runs of grouped cable',
      'mechanical damage where cables are bunched together',
      'reduced heat dissipation when cables are installed together',
      'the higher cost of installing many cables in a single enclosure',
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
      'the thermal insulation increases the conductor resistance',
      'the thermal insulation lowers the supply voltage reaching the load',
      'thermal insulation increases the fault current flowing in the circuit',
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
    question: 'A cable is totally surrounded by thermal insulation for 0.5 m or more. What factor is applied to its clipped direct rating?',
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
    question: 'For cables of 16 mm2 or less, voltage drop is calculated from:',
    options: [
      'V = I² × R (using the power dissipated in the cable)',
      'V = I × R (using tabulated mV/A/m values)',
      'V = P / I (from the load power and the load current)',
      'V = I / R (current divided by the cable resistance)',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage drop uses mV/A/m values from tables, which incorporate resistance (and reactance for larger cables).',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 74,
    question: 'What is the maximum recommended voltage drop for a lighting circuit supplied from a public low voltage distribution system?',
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
    question: 'A circuit has a design current of 25 A and a corrected current-carrying capacity of 24 A. What does this mean?',
    options: [
      'correctly sized, since Ib and Iz are within one ampere of each other',
      'oversized, because the cable capacity exceeds the design current',
      'acceptable, provided a 30 mA RCD is fitted to the circuit',
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
    question: 'What does the tabulated mV/A/m value for a cable represent?',
    options: [
      'varies with cable size and construction and is taken from tables',
      'is a single fixed value applying to every size of copper cable',
      'depends only on the length of the run and the load current',
      'is identical to the tabulated current-carrying capacity of the cable',
    ],
    correctAnswer: 0,
    explanation:
      'mV/A/m values vary with cable size and type and are found in the BS 7671 voltage-drop tables.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 77,
    question: 'A 30 metre run carries 20 A and the cable is rated 18 mV/A/m. What is the voltage drop?',
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
    question: 'Which quantities appear in the adiabatic equation for sizing a protective conductor?',
    options: [
      'S = I × t × k, multiplying current, disconnection time and the constant',
      'S = k / √(I²t), dividing the conductor constant by the let-through energy',
      'S = √(I²t) / k, relating fault current, time and a conductor constant',
      'S = V / (I × R), derived from the voltage across the fault path',
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
      'each installation method uses a different conductor material',
      'the installation method changes the voltage of the supply',
      'the method alters the prospective fault current in the circuit',
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
    question: 'Cables clipped direct (Reference Method C) have higher ratings than cables enclosed in conduit in a wall (Reference Method A) because:',
    options: [
      'clipped-direct cables dissipate heat more effectively than enclosed ones',
      'clipping direct increases the cross-sectional area of the conductor',
      'conduit enclosures raise the supply voltage delivered to the cable',
      'enclosed cables carry a lower prospective fault current than clipped ones',
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
      'flexible final connections to equipment that moves or vibrates',
      'underground and external installations requiring mechanical protection',
      'concealed wiring within plasterboard partitions and timber stud walling',
      'extra-low-voltage signalling and data circuits run inside office buildings',
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
      'a lower current rating for the same size of conductor used',
      'a larger conductor size is always required for the load',
      'a higher current rating for the same conductor size',
      'the cable cannot be used outdoors or in any warm location',
    ],
    correctAnswer: 2,
    explanation:
      'XLPE’s higher temperature rating (90°C versus 70°C for PVC) allows a higher current-carrying capacity.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 83,
    question: 'In a TN system, within what time must a 32 A final circuit supplying socket-outlets disconnect under earth fault conditions?',
    options: [
      '0.1 s for every circuit, irrespective of the system or circuit type',
      '10 s for final circuits and 30 s for distribution circuits in a TN system',
      '1 s for every circuit, whether that circuit is a final one or a distribution one',
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
    question: 'The k value used when sizing a circuit protective conductor depends on:',
    options: [
      'the conductor material and insulation type',
      'the length of the circuit conductors used',
      'the rating of the protective device in the circuit',
      'the ambient temperature at the time of the test',
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
      'use the smaller of the two sizes that have been calculated',
      'use the larger cable that satisfies both requirements',
      'use the mean of the two calculated cross-sectional areas',
      'use the size required for current-carrying capacity only',
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
      'have exactly the same cross-section as a copper conductor',
      'need a larger cross-section because of their lower conductivity',
      'cannot be used for power circuits within any building installation',
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
      'underground runs where the armouring provides the mechanical protection',
      'flexible connections to portable or hand-held equipment on site',
      'extra-low-voltage control and signalling wiring in dry indoor areas',
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
      'permanent buried distribution runs between two separate buildings',
      'high-current distribution runs in place of a busbar trunking system',
      'buried circuits requiring the highest degree of mechanical protection',
    ],
    correctAnswer: 0,
    explanation:
      'Flexible cables suit applications requiring movement or flexibility in the connection.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 89,
    question: 'How is the combined rating factor for a cable obtained?',
    options: [
      'adding all the applicable factors together',
      'multiplying all the applicable factors together',
      'taking the smallest single factor on its own',
      'taking the average of all the factors that apply',
    ],
    correctAnswer: 1,
    explanation:
      'The overall correction factor = Ca × Cg × Ci × Cc (all applicable factors multiplied together).',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 90,
    question: 'Rating factors of 0.94, 0.82 and 0.75 apply to a cable. What is the combined factor?',
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
      'the general lighting load of the building supplied',
      'the diversity figure applied to the socket-outlet circuits',
      'the colour of the enclosure fitted around the motor starter',
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
    question: 'A ring final circuit is normally wired with 2.5 mm² line conductors because:',
    options: [
      'two parallel paths share the current, which suits a 32 A protective device',
      'a single 2.5 mm² conductor can carry 32 A in any installation method',
      'larger conductors will not fit the terminals of BS 1363 socket-outlets',
      '2.5 mm² is the only size permitted for socket-outlet circuits',
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
      'use the smallest cross-section available to limit the stored energy',
      'meet the specific requirements for the hazardous-area classification',
      'omit the protective conductor to avoid circulating earth currents',
      'use flexible cables only, so that joints are avoided within the zone',
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
      'very small currents must be distributed to many separate final circuits',
      'high currents require more effective heat dissipation and robust connections',
      'flexible connections are needed to equipment that moves or vibrates',
      'circuits are buried underground and need mechanical protection',
    ],
    correctAnswer: 1,
    explanation:
      'Busbars suit high-current applications, where heat management and connections benefit from a busbar system.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 98,
    question: 'The current-carrying capacities tabulated in BS 7671 are based on which reference conditions?',
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
    question: 'What is the minimum cross-sectional area of a protective conductor that is not part of a cable and is not enclosed?',
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
    question: 'Selectivity between protective devices means:',
    options: [
      'all upstream devices operate together so the fault is cleared quickly',
      'only the device nearest the fault operates, leaving other circuits unaffected',
      'the main switch always operates first, isolating the whole installation',
      'no device operates until the fault current falls to a safe level',
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
      'confirming that the rated current is at least the design current',
      'calculating the nominal supply voltage at the origin of the circuit',
      'estimating the connected lighting load of the building being designed',
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
    question: 'For selectivity between two fuses in series, the upstream fuse rating should be at least:',
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
    question: 'A Type B circuit-breaker to BS EN 60898 operates in its instantaneous range between:',
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
      'identical 30 mA instantaneous RCDs at every level, so both clear the fault',
      'an S-type (time-delayed) RCD upstream with appropriate current/time discrimination',
      'an upstream RCD of lower residual operating current than the downstream one',
      'instantaneous operation at every level, with no time delay anywhere',
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
    question: 'The rated short-circuit capacity of a protective device must be:',
    options: [
      'no greater than the normal load current of the circuit it protects',
      'equal to the rated current of the device, since that is what it interrupts',
      'half the prospective fault current, as the two poles share it',
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
      'downstream devices to have a higher rated current than the incoming supply',
      'downstream devices of lower breaking capacity, if properly coordinated with the upstream device',
      'the breaking-capacity requirement to be omitted for downstream devices entirely',
      'two devices to share one enclosure and one common set of terminals',
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
      'increase the fault current so that the device operates more quickly',
      'hold the fault current constant until the device finally clears it',
      'reduce the actual fault current by operating before the prospective peak is reached',
      'delay operation until the fault current has reached its peak value',
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
      'using devices of identical rated current so that both react together',
      'placing the fuse downstream of the MCB in every case, as fuses are faster',
      'comparing rated currents alone, since the device curves add nothing',
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
    question: 'Earth fault protection in a large distribution system provides:',
    options: [
      'additional earth-fault detection with adjustable settings for coordination',
      'protection against overload only, leaving faults to the main device',
      'a substitute for main protective bonding of extraneous-conductive-parts',
      'protection against overvoltage transients entering from the supply',
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
    question: 'A 100 mA Type S RCD is installed upstream of 30 mA RCDs. Selectivity is achieved because:',
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
    question: 'Which settings are commonly adjustable on a moulded case circuit-breaker?',
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
      'only the primary-side rated current, since the turns ratio is fixed',
      'the ambient temperature of the room alone, applied as a derating factor',
      'the connected lighting load, as this sets the disconnection time',
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
      'increasing the let-through energy of the devices so faults clear sooner',
      'removing protective devices, since their contacts are the source of arcing',
      'using larger enclosures, with no change to the protective devices',
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
      'separate PE and N conductors throughout the supply and the installation',
      'a local earth electrode at the installation in place of a supply earth',
      'a combined PEN conductor in the supply, separated into PE and N at the origin',
      'a combined PEN conductor carried throughout the whole installation',
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
      'a combined PEN conductor taken from the distributor\'s network',
      'the sheath of the supply cable used as the earth path',
      'no connection to earth at the installation origin',
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
      'exposed-conductive-parts to each of the final circuits',
      'the neutral bar of the distribution board to the line conductors',
      'each socket-outlet on the final circuit to the next one along',
    ],
    correctAnswer: 0,
    explanation:
      'Main bonding connects incoming services (water, gas, structural steel) to the main earthing terminal.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 137,
    question: 'Where PME conditions apply and the supply PEN conductor is 35 mm² or less, what is the minimum copper main protective bonding conductor size?',
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
      'the load current is particularly high for the size of cable used',
      'cables are run underground between separate buildings',
      'the risk of electric shock is increased, such as in bathrooms',
      'a three-phase supply is present within the same building',
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
      'a metal part of the electrical equipment itself that may become live under fault conditions',
      'any non-metallic component within the installation, such as plastic pipework or trunking',
      'a live conductor that carries the load current of the whole circuit during normal service',
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
      'the line conductor to the neutral conductor at the board',
      'two extraneous-conductive-parts to each other',
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
      'allow the overcurrent protective device on its own to disconnect the fault within 5 seconds',
      'remove any need for an RCD, since the electrode itself is taken to give all the protection',
      'ensure the RCD operates so that the touch voltage does not exceed 50 V (Ra × IΔn ≤ 50 V)',
      'keep the voltage at the origin of the installation within the declared tolerance',
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
      'PVC conduit, trunking and the other non-metallic containment systems',
      'flexible cords, flexible cables and their associated plugs and connectors',
      'fuses, circuit-breakers and residual current devices in the distribution board',
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
      'PME supplies always give a higher prospective fault current at the origin',
      'PME supplies rely on a local earth electrode at the installation',
      'the bonding conductor reduces the voltage drop in the supply cable',
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
      'selected on cost alone, whatever the surrounding conditions may be',
      'suitable for the environment and adequately protected against damage',
      'insulated to the full nominal system voltage in every case without exception',
      'identical in cross-sectional area to the circuit line conductors',
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
    question: 'When a protective conductor is selected from Table 54.7, its size is related to the:',
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
      'concealed behind the meter tails so that it cannot be interfered with',
      'sealed by the distributor so that it can never be disturbed later',
      'located outside the building, next to the earth electrode',
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
      'replaces the need for protective earthing wherever the equipment is sensitive',
      'provides earthing for correct equipment operation rather than for safety',
      'is sized to carry the full prospective fault current of the circuit it serves',
      'bonds the extraneous-conductive-parts of the building to the main earthing bar',
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
      'left unlabelled so that the clamp is not disturbed',
      'painted the same colour as the pipework they are fitted to',
      'fitted with a removable cover in place of a label',
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
      'the earth-electrode resistance being high enough to limit the current that flows in a fault',
      'the supply voltage remaining above its nominal value throughout the whole fault',
      'the absence of any protective conductor, so that no fault current is able to flow at all',
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
      'always extend the PME earth to the outbuilding, since it is the supply earth for the property',
      'consider whether PME conditions permit extension, or whether a local TT system is needed',
      'omit the earthing arrangement completely, as the outbuilding stands as a separate structure',
      'rely on the metal cladding of the outbuilding itself to act as the earth electrode for the supply',
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
      'at the gas service main in the street, before the meter',
      'only at the connection to the gas appliance',
      'at any convenient point above the ground level',
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
      'it passes closest to the consumer unit, wherever that happens to be',
      'it connects to the first draw-off tap or outlet found in the building',
      'it is buried beneath the property, before it enters the wall',
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
      'the pipework no longer needs any bonding at all once plastic is present',
      'the metal sections each side may need individual bonding assessment',
      'the plastic section itself must be bonded to maintain continuity',
      'the bonding conductor must be doubled in cross-sectional area',
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
      'made of plastic pipe for the whole of its run into the building',
      'buried below the property, before it comes up above ground level',
      'metal and within the building (an extraneous-conductive-part)',
      'connected to a non-metallic oil storage tank outside the building',
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
      'only the metal bath itself to the nearest cold-water pipe in the bathroom',
      'the protective conductor of the lighting circuit to the one in the shower circuit',
      'the supply neutral conductor to all the metallic pipework in the bathroom',
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
      'fewer protective measures than in a standard installation',
      'additional or modified requirements beyond the standard rules',
      'no earthing or bonding at all within any of the locations concerned',
      'the use of aluminium conductors throughout in place of copper ones',
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
      'the maximum number of socket-outlets permitted in the room',
      'the colour of the accessories and fittings that are to be used',
      'areas with specific equipment and protection requirements',
      'the route that the cables must take through the walls of the room',
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
      'the area immediately above the wash basin taps',
      'the space around the bathroom doorway',
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
    question: 'Equipment installed in zone 1 of a room containing a bath or shower must have a minimum degree of protection of:',
    options: [
      'IPX4 (or IPX5 where water jets are used for cleaning)',
      'IP20, since zone 1 sits above the level of the rim of the bath',
      'IPX8, since fittings within zone 1 may be immersed',
      'IP2X only, with no requirement for any water rating at all',
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
      'a single zone throughout the site, treated in the same way as any ordinary domestic living room',
      'zones with strict requirements, including SELV and supplementary bonding where applicable',
      'no special measures beyond 30 mA RCD protection applied to every circuit on the site itself',
      'the lighting load of the building, which is taken to set the boundaries of the zones around it',
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
      'low humidity removes the need for any protective measures',
      'the supply voltage must be increased to suit the sauna heater load',
      'high temperatures require heat-resistant cables and equipment',
      'standard PVC cable is always suitable within the hot area',
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
      'standard domestic accessories throughout, provided they are new',
      'socket-outlet circuits without RCD protection, as supplies are temporary',
      'fixed wiring only, with flexible cables prohibited on site',
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
      'high prospective fault current found on rural distributor supplies',
      'requirement for a three-phase supply to each building on the site',
      'low ambient temperatures in the buildings, and nothing else',
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
      'a 100 mA RCD, since livestock will tolerate a higher leakage current',
      'an RCD with a rated residual operating current not exceeding 30 mA',
      'overcurrent protection alone, with no RCD on any socket-outlet circuit',
      'a 300 mA RCD, matched to the fire-protection requirement for the site',
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
      'standard BS 1363 13 A socket-outlets at each pitch, one provided for each caravan',
      'a single shared RCD covering the whole of the park, sited at the origin of the park supply',
      'correctly rated BS EN 60309 socket-outlets with individual RCD protection at each pitch',
      'socket-outlets at each pitch protected by overcurrent devices alone, with no RCD',
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
      'high ambient temperatures only, as the other factors are unchanged',
      'the lighting load of the buildings standing on the shore side of the berths',
      'the use of PME earthing throughout, exactly as on a shore installation',
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
      'permanent fixed wiring throughout the site, as in a finished building',
      'no RCD protection at all, because of the temporary nature of the wiring',
      'the same inspection regime as a permanent domestic installation would need',
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
      'AC isolation at the consumer unit only, as the DC side is fixed',
      'DC-system considerations, isolation provisions and specific labelling',
      'no isolation at all, since the array is inherently safe once disconnected',
      'standard lighting-circuit protection for the whole of the system',
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
      'a shared circuit taken from the existing kitchen ring final circuit',
      'no RCD at all, since the charging equipment is taken to give its own protection',
      'dedicated circuits with appropriate RCD protection and compliant equipment',
      'standard 13 A socket-outlets on an existing circuit, with no added protection',
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
      'the colour of the socket-outlets that are used in each patient treatment area',
      'reduced bonding arrangements, to limit the fault current that reaches the patient',
      'standard domestic levels of protection applied throughout the whole building',
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
      'standard equipment inside a weatherproof enclosure',
      'the omission of protective devices from the zone',
      'equipment selected on its IP rating alone, whatever the zone',
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
      'storage of spare cable and equipment near the boards',
      'the routing of all the final circuits away from the switchgear',
      'safe access, adequate working space and emergency escape',
      'concealment of the distribution equipment behind wall panels',
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
      'a higher supply voltage than the other circuits in use',
      'no thermal protection at all, as the elements self-regulate',
      'the omission of a protective conductor from the heating mat',
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
      'the internal lighting load of the building only',
      'the colour temperature of the lamps chosen and nothing else',
      'the omission of RCD protection from the circuit',
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
      'agricultural and horticultural premises',
      'swimming pools, with defined zones',
      'construction and demolition sites',
      'medical locations and operating theatres',
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
      'a permanent fixed-wiring connection only, with no plug and socket',
      'no earthing arrangement, because the unit is not fixed in contact with earth',
      'appropriate connection means and protective measures for their mobile use',
      'standard domestic accessories, with no additional protective measures',
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
      'illumination only while the mains supply is present at the luminaire itself',
      'the lowest possible light output at all times, so that energy is saved on site',
      'lighting that operates for a maximum of 30 seconds after the supply fails',
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
      'use standard PVC cable run alongside the power cables',
      'use fire-resistant cables and follow BS 5839 requirements',
      'share a final circuit with the general lighting of the building',
      'omit any form of mechanical protection to the cable',
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
      'the pricing build-up and the profit margin agreed with the main contractor',
      'photographs of the completed decoration and the finishes chosen',
      'sufficient information to verify the design and enable safe operation',
      'the tariff details agreed between the client and the electricity supplier',
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
      'the exact physical position of each cable within the building',
      'the decorative finishes chosen for the interior of the building',
      'the supply tariff and the metering arrangements agreed at the origin',
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
      'the physical dimensions of the structure',
      'the cost breakdown for the whole of the installation',
      'the warranty terms offered by the manufacturer',
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
      'the functional logic of the control circuits on site',
      'the physical positions of equipment and the cable routes',
      'the time-current curves of each of the protective devices fitted',
      'the diversity factors applied to each of the connected loads',
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
      'the cheapest possible selection of materials and accessories for the job',
      'the working methods preferred by the contractor doing the installing work',
      'compliance with cable-sizing, protection and voltage-drop requirements',
      'the connection charges quoted by the electricity supplier for the supply',
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
      'the labour hours allowed per task',
      'the decorative finishes chosen for each room',
      'the supply tariff and meter type',
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
      'the colour scheme chosen for the consumer unit and its enclosures',
      'the labour rates that were used to price the installation work on site',
      'the contact details of the local distribution network operator',
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
      'the cheapest materials available have been used',
      'the design meets the requirements of BS 7671',
      'the work will be completed by an agreed fixed date',
      'the supply will never need to be uprated at a later date',
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
      'the installation is built exactly as the original design showed',
      'no protective devices have been recorded on the site',
      'the final installation differs from the original design',
      'the client asks for a reduction in the agreed price',
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
      'the cheapest components that are available from the local wholesaler',
      'the suppliers preferred by the contractor doing the installing work',
      'the supply tariff and the metering arrangements at the origin',
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
      'the colour scheme chosen for the interior of the building',
      'the profit margin that was agreed with the installing contractor',
      'the date on which the supply was connected by the distributor',
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
      'the pricing breakdown and the final account from the contractor',
      'information for the safe operation and maintenance of the installation',
      'the decorative drawings and the finishes chosen by the architect on site',
      'the tariff schedule published by the local electricity supplier',
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
      'for 12 months only, and then destroyed securely',
      'only until the installation has been energised and tested',
      'for the life of the installation, for future reference',
      'until the first periodic inspection has been carried out',
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
      'agreed verbally on site without any written record kept',
      'left for the next contractor on site to discover for himself',
      'recorded only if they have an effect on the final account',
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
      'a substitute for demonstrating compliance with the Wiring Regulations',
      'a method of pricing the installation, with no design function of its own',
      'an automatic set of test results for every circuit that has been modelled on site',
    ],
    correctAnswer: 0,
    explanation:
      'BIM integrates design data and enables coordination between the electrical and other building services.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 201,
    question: 'What does applying diversity to a distribution board allow the designer to do?',
    options: [
      'Size the submain for realistic simultaneous load, not connected load',
      'Size the submain for the total connected load of every final circuit',
      'Exclude the largest single fixed load when totalling the board demand',
      'Use a smaller device than the largest final circuit rating on the board',
    ],
    correctAnswer: 0,
    explanation:
      'Diversity recognises that not every final circuit draws its full load at the same instant, so maximum demand is assessed from realistic simultaneous loading rather than the arithmetic sum of every connected load. Sizing on connected load gives oversized and costly submains; ignoring a large fixed load such as a shower or a boiler goes the other way and undersizes the board. Diversity is applied to the demand calculation, never as an excuse to fit a device that cannot protect the circuits downstream of it.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 202,
    question: 'A detached garage is to be supplied for electric vehicle charging from a TN-C-S (PME) supply, and no open-PEN detection device is to be fitted. Which design decision does BS 7671 support?',
    options: [
      'Export the PME earth and rely on the existing main bonding at the origin',
      'Provide a separate TT earth electrode for the charging equipment',
      'Convert the whole installation to TN-S by disconnecting the PEN link',
      'Fit a Type AC RCD and carry on using the PME earthing facility',
    ],
    correctAnswer: 1,
    explanation:
      'Section 722 gives the designer a choice: either detect the loss of the PEN conductor and disconnect, or keep the charging equipment earth away from the PME terminal by earthing it through its own electrode, which is a TT arrangement. The classic slip is to assume an RCD covers the risk. It cannot. An open PEN raises the potential of the entire earth reference together with the line conductor, so no residual current appears for the RCD to sense, and the distributor earthing terminal cannot be treated as safe for equipment held outdoors while a person also touches true earth.',
    section: '6.1',
    difficulty: 'advanced',
  },
  {
    id: 203,
    question: 'A circuit has a design current of 28 A and is protected by a 32 A device. A grouping factor of 0.80 and an ambient factor of 0.94 apply. What is the minimum tabulated current-carrying capacity the cable must have?',
    options: [
      '42.6 A, since It must be at least In divided by 0.80 x 0.94',
      '37.2 A, since It must be at least Ib divided by 0.80 x 0.94',
      '32.0 A, since the device rating already allows for both factors',
      '24.1 A, since In is multiplied by 0.80 x 0.94 to arrive at It',
    ],
    correctAnswer: 0,
    explanation:
      'Coordination runs Ib <= In <= Iz, and Iz is the tabulated value It after the correction factors have knocked it down. Turning that round, It >= In / (Cg x Ca) = 32 / (0.80 x 0.94) = 32 / 0.752 = 42.6 A. Two slips are common. The first is dividing the design current 28 A instead of the device rating 32 A, which leaves the cable unprotected by its own fuse or breaker. The second is multiplying by the factors instead of dividing, which produces a smaller cable in the very conditions that call for a bigger one.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 204,
    question: 'A 30 A semi-enclosed fuse to BS 3036 protects a final circuit. What minimum current-carrying capacity must the cable have?',
    options: [
      '21.8 A, because Iz is taken as 0.725 times the rated fuse current',
      '30.0 A, because Iz need only equal the rated current of the fuse',
      '41.4 A, because the fuse rating must not exceed 0.725 times Iz',
      '43.5 A, because Iz must be 1.45 times the rated current of the fuse',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 433.1.202 requires If <= 0.725 x Iz for a semi-enclosed fuse to BS 3036, because the fusing factor of a rewirable fuse is poor and it needs a large multiple of rated current before it clears. Rearranging: Iz >= 30 / 0.725 = 41.4 A. The usual mistake is to multiply, giving 21.8 A, which reverses the intent of the rule and leaves the cable relying on a device that may sit at well over its rating for a long time before operating.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 205,
    question: 'Regulation 433.1.1 limits the current causing effective operation of the overload protective device to what multiple of Iz?',
    options: [
      'Not more than 1.45 times the lowest current-carrying capacity Iz',
      'Not more than 1.45 times the rated current In of the same device',
      'Not more than 1.45 times the design current Ib of the final circuit',
      'Not more than 1.45 times the tabulated capacity It before derating',
    ],
    correctAnswer: 0,
    explanation:
      'The third condition of 433.1.1 caps the operating current at 1.45 times the lowest of the current-carrying capacities of any conductor in the circuit, so a modest sustained overload cannot cook the smallest conductor present. Note that it is keyed to Iz, the capacity in the actual installed conditions, not to the tabulated It before correction factors and not to In. For fuses to BS 88 and breakers to BS EN 60898 or 60947-2 the condition is met automatically once In <= Iz, which is why designers rarely calculate it explicitly.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 206,
    question: 'A 230 V single-phase circuit is 28 m long, carries a design current of 24 A and the cable has a voltage drop figure of 11 mV/A/m. What is the result?',
    options: [
      '7.4 V, inside the 11.5 V allowed for a power circuit at 230 V',
      '7.4 V, outside the 11.5 V allowed for a power circuit at 230 V',
      '3.1 V, inside the 11.5 V allowed for a power circuit at 230 V',
      '9.2 V, outside the 6.9 V allowed for a power circuit at 230 V',
    ],
    correctAnswer: 0,
    explanation:
      'Voltage drop = (mV/A/m x Ib x L) / 1000 = (11 x 24 x 28) / 1000 = 7.39 V. On a public low voltage supply the limit is 5 % for circuits other than lighting, which is 11.5 V at 230 V, so this circuit complies. Worth noticing that the same cable used for lighting would fail, because 3 % of 230 V is only 6.9 V. The standard slip is forgetting the division by 1000, which turns millivolts into volts and produces an absurd answer in the thousands.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 207,
    question: 'What minimum degree of protection is required for equipment installed in zones 1 and 2 of a room containing a bath?',
    options: [
      'IP2X, which prevents finger access to live parts within the zone',
      'IPX4, giving protection against splashing water from any direction',
      'IPX8, required for equipment immersed continuously in the water',
      'IP4X, which excludes solid objects of 1 mm and larger from entry',
    ],
    correctAnswer: 1,
    explanation:
      'Section 701 requires at least IPX4 in zones 1 and 2. The X means the solid-object digit is not specified by the regulation, and the 4 is the water digit for splashing from any direction. Candidates routinely transpose the digits and answer IP4X, which is a dust and finger rating and says nothing at all about water. Remember also that a shower without a basin has no zone 2 at all, because the 1.20 m horizontal dimension of 701.32.3 extends zone 1 instead.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 208,
    question: 'When may an Electrical Installation Certificate be issued for a new installation in which testing has revealed a defect?',
    options: [
      'After the defect has been corrected and the work verified again',
      'At handover, with the defect listed as a limitation on the form',
      'Once the client has accepted the defect in writing on the order',
      'Immediately, provided the defect is scheduled for a later repair',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 644.1.1 is unambiguous for a new installation: any defect or omission revealed during inspection and testing shall be made good before the Certificate is issued. There is no provisional or conditional certificate, and a limitation box is not a place to park known faults. Limitations describe what could not be inspected or tested, for example inaccessible parts, whereas a defect is something found to be wrong and it has to be fixed and retested first.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 209,
    question: 'A protective device needs 200 A to operate in the required time on a 230 V line-to-earth supply. What is the maximum permitted Zs under Regulation 411.4.4?',
    options: [
      '1.15 ohms, using 230 / 200 with no minimum voltage factor',
      '1.09 ohms, using 0.95 x 230 / 200 as Regulation 411.4.4 gives',
      '0.87 ohms, using 0.8 x 1.09 as a measured-value comparison',
      '2.19 ohms, using 0.95 x 230 x 2 / 200 for the loop return path',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 411.4.4 sets Zs x Ia <= U0 x Cmin, and for a supply given under the ESQCR the minimum voltage factor Cmin is 0.95. Substituting: Zs = 0.95 x 230 / 200 = 1.09 ohms. Keep the two bases apart. Cmin 0.95 is the design formula. The separate 0.8 rule of thumb in Guidance Note 3 is applied to the tabulated maximum when you are comparing it against a Zs measured on a cold circuit at ambient temperature, and it must never be stacked on top of Cmin in the design calculation.',
    section: '6.8',
    difficulty: 'advanced',
  },
  {
    id: 210,
    question: 'A fault current of 1200 A is cleared in 0.1 s and k is 115. Applying the adiabatic equation, what minimum protective conductor size is required?',
    options: [
      '3.30 mm2, so a 2.5 mm2 protective conductor may be installed',
      '3.30 mm2, so a 4 mm2 protective conductor must be installed',
      '1.04 mm2, so a 1.5 mm2 protective conductor must be installed',
      '10.4 mm2, so a 16 mm2 protective conductor must be installed',
    ],
    correctAnswer: 1,
    explanation:
      'Substituting: I squared x t = 1200 x 1200 x 0.1 = 144 000, the square root of which is 379.5, and 379.5 / 115 = 3.30 mm2. Regulation 543.1.3 then requires that where the formula gives a non-standard size, the next larger standard cross-sectional area is used, so 4 mm2. Rounding down to 2.5 mm2 is the classic error, followed by forgetting to square the current. Remember too that the adiabatic equation is only valid for disconnection times up to 5 s.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 211,
    question: 'In an agricultural or horticultural location, what maximum rated residual operating current applies to circuits other than final circuits supplying socket-outlets?',
    options: [
      '30 mA, the same figure as for all socket-outlets up to 32 A',
      '100 mA, the figure applied to socket-outlets rated above 32 A',
      '300 mA, whatever the type of earthing system in use on the site',
      '500 mA, provided a time-delayed Type S device has been selected',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 705.411.1 sets a three-way split, and it applies whatever the earthing system: socket-outlets rated up to 32 A need an RCD with the characteristics of 415.1.1, socket-outlets above 32 A need 100 mA or less, and all other circuits need 300 mA or less. The 300 mA tier is driven mainly by fire risk in livestock buildings rather than by shock protection, since burning dust and bedding are the real hazard. Answering 30 mA everywhere is the usual error and would give a farm installation that trips constantly.',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 212,
    question: 'A designer states that selectivity has been achieved between an upstream and a downstream overcurrent device. What does BS 7671 require of that claim?',
    options: [
      'Selectivity may be assumed where the upstream rating is far larger',
      'Selectivity is only required between fuses, and not circuit-breakers',
      'Selectivity shall be verified by one of the permitted methods listed',
      'Selectivity follows automatically from using one device manufacturer',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 536.4.1.2.1 does not allow selectivity to be assumed. It must be verified by a desk study of the time and current characteristics, by tests to the product standard, by suitable software using manufacturer data, or by a manufacturer declaration covering those specific devices. If the desk study route is used, the ambient temperature the published curves assume and the loading before the fault both have to be taken into account, because both shift where the curves actually sit. A large ratio of ratings is a hint, never a proof.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 213,
    question: 'A balanced three-phase load of 15 kW at a power factor of 0.85 is supplied at 400 V. What is the design current of the circuit?',
    options: [
      '21.7 A, from 15 000 / (1.732 x 400) then multiplied by 0.85',
      '25.5 A, from 15 000 / (1.732 x 400 x 0.85) as the load current',
      '37.5 A, from 15 000 / 400 with no three-phase factor applied',
      '44.1 A, from 15 000 / (400 x 0.85) leaving out the root three',
    ],
    correctAnswer: 1,
    explanation:
      'For a balanced three-phase load, P = root three x VL x IL x power factor, so IL = 15 000 / (1.732 x 400 x 0.85) = 15 000 / 588.9 = 25.5 A. Power factor belongs on the bottom of the fraction: a poor power factor means more current for the same kilowatts, so dividing must make the answer larger. Multiplying by 0.85 gives 21.7 A and undersizes both cable and device. Dropping the root three altogether is the other frequent slip and inflates the answer by about 73 per cent.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 214,
    question: 'What must a Schedule of Circuit Details and Test Results contain?',
    options: [
      'Only the readings taken, since circuit data sits on the certificate',
      'Circuit identification, characteristics and the results for each circuit',
      'A summary of the worst reading found across the whole installation',
      'The design calculations used to select each cable and each device',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 644.3 requires circuit-by-circuit documentation: how each circuit is identified, its characteristics such as protective device type and rating and conductor sizes, and the recorded results of each prescribed test on that circuit, based on the model forms in Appendix 6. A single worst-case figure for the whole board is not acceptable, because a later inspector needs the individual values to compare against. Design calculations are the designer working file and are not part of the schedule.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 215,
    question: 'Which figure is the BS 7671 verification criterion for a general-use non-delayed 30 mA RCD?',
    options: [
      'Operation within 40 ms when tested at five times rated residual current',
      'Operation within 200 ms when tested at half the rated residual current',
      'Operation within 130 ms when tested at the rated residual current',
      'Operation within 300 ms when tested at the rated residual current',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 643.7.3 sets the verification test as an AC test at the rated residual operating current, with a maximum of 300 ms for a general non-delayed device, while a Type S delayed device is expected to fall in the 130 to 500 ms window. The 40 ms at five times figure is from the product standards BS EN 61008 and 61009 and describes what the device is built to do, not what you verify on site. Table 3A of Appendix 3 has been deleted, so quoting it as the site criterion is now wrong.',
    section: '6.8',
    difficulty: 'advanced',
  },
  {
    id: 216,
    question: 'How is Regulation 421.1.7 concerning arc fault detection devices expressed in BS 7671?',
    options: [
      'As a recommendation, without naming particular premises types',
      'As a requirement for all socket-outlet circuits in dwellings',
      'As a requirement for care homes, halls of residence and flats',
      'As a recommendation applying only to circuits above 32 A rating',
    ],
    correctAnswer: 0,
    explanation:
      'The AFDD clause is worded as a recommendation and it names no building types at all. That means it is a design consideration to be raised with the client and recorded in the design decisions, not something you can tell a customer is compulsory in a named premises type. Candidates often carry forward a list of buildings from earlier draft material or trade press; there is no such list in the regulation, and asserting one to a client is a commercial as well as a technical error.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 217,
    question: 'In a room containing a bath, what does the supplementary protective equipotential bonding of Regulation 701.415.2 connect together?',
    options: [
      'The neutral bar of the board to the incoming metallic water service',
      'Each circuit protective conductor to accessible extraneous-conductive-parts',
      'All exposed-conductive-parts to the nearest structural steel column',
      'The earthing conductor to an electrode installed outside the building',
    ],
    correctAnswer: 1,
    explanation:
      'The bonding required by 701.415.2 is local to the room and joins the protective conductor terminals of every circuit serving Class I and Class II equipment to the accessible extraneous-conductive-parts in that room, such as metal pipework or structural metalwork that can introduce a potential from outside. Its purpose is to hold everything a wet person can touch at the same potential during a fault. It never involves the neutral, and it does not replace main protective bonding at the origin.',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 218,
    question: 'A 2.5 mm2 flat twin and cpc cable passes through 3 metres of loft insulation on the way to a socket-outlet circuit. What should the designer do?',
    options: [
      'Apply the derating for a cable totally surrounded by insulation',
      'Disregard the run because it is shorter than five metres in length',
      'Apply a 0.5 factor to the whole circuit length as a precaution',
      'Increase the device rating so the cable is protected at 32 A',
    ],
    correctAnswer: 0,
    explanation:
      'A cable surrounded by thermal insulation cannot shed heat, so its current-carrying capacity falls sharply and BS 7671 gives the reduced values for that installation condition. The circuit rating is set by the worst section of the route, so the buried length governs even though most of the run is clipped direct. There is no length below which the effect can be ignored. Raising the device rating is the most dangerous answer of the four, since it removes protection from the very stretch of cable that is overheating.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 219,
    question: 'Why does BS 7671 require an installation to be divided into circuits?',
    options: [
      'To reduce danger and inconvenience and to ease inspection and testing',
      'To keep the number of ways in the consumer unit as low as possible',
      'To allow one RCD to cover every circuit in the whole installation',
      'To make the earth fault loop impedance the same on all the circuits',
    ],
    correctAnswer: 0,
    explanation:
      'Chapter 31 requires division into circuits to avoid danger, to minimise inconvenience when a fault causes disconnection, to make inspection, testing and maintenance safe, and to take account of protective conductor currents that could cause unwanted tripping. Putting the whole installation behind one RCD is exactly the outcome the regulation exists to prevent, since a single earth fault would then plunge the premises into darkness and take out freezers, alarms and heating with it.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 220,
    question: 'A consumer unit is to be installed where the prospective fault current is 4.5 kA. Which device selection is acceptable?',
    options: [
      'A device with a 3 kA rating, as fault levels rarely reach the maximum',
      'A device with a 6 kA rating, exceeding the prospective fault current',
      'A device with a 4 kA rating, as this is within ten per cent of 4.5 kA',
      'Any rating, since the RCD in the unit will clear a short circuit first',
    ],
    correctAnswer: 1,
    explanation:
      'Rated short-circuit capacity must be at least the prospective fault current at the point where the device is installed, so 6 kA covers 4.5 kA and 3 kA or 4 kA do not. There is no tolerance to trade away. The one permitted alternative is verified back-up protection, where an upstream device limits the energy passed and the manufacturer has confirmed that specific combination. An RCD is not a short-circuit protective device, and rated current must never be confused with breaking capacity.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 221,
    question: 'Ze is 0.35 ohms, R1 plus R2 corrected to operating temperature is 0.62 ohms, and the protective device needs 200 A to operate in the required time on a 230 V supply. Does the circuit comply?',
    options: [
      'Zs is 0.97 ohms against 1.15 ohms permitted, so it complies',
      'Zs is 0.27 ohms against 1.09 ohms permitted, so it complies',
      'Zs is 0.97 ohms against 0.87 ohms permitted, so it fails',
      'Zs is 0.97 ohms against 1.09 ohms permitted, so it complies',
    ],
    correctAnswer: 3,
    explanation:
      'Zs = Ze + (R1 + R2) = 0.35 + 0.62 = 0.97 ohms, and the maximum from Regulation 411.4.4 is Cmin x U0 / Ia = 0.95 x 230 / 200 = 1.09 ohms, so the circuit complies with about 11 per cent in hand. Three slips appear here. Subtracting Ze instead of adding it gives 0.27. Using 230 / 200 with no voltage factor gives an over-generous 1.15. Applying the 0.8 rule of thumb to the design maximum gives a false failure, because that factor belongs to comparing a cold measured Zs against a tabulated value, not to the design calculation.',
    section: '6.8',
    difficulty: 'advanced',
  },
  {
    id: 222,
    question: 'What nominal voltages define a reduced low voltage system under Regulation 411.8.1.2?',
    options: [
      '110 V between lines, with 110 V to earth on a single-phase supply',
      '230 V between lines, with 55 V to the earthed midpoint of the coil',
      '110 V between lines, with 55 V to earth on a single-phase supply',
      '110 V between lines, with 63.5 V to earth on a single-phase supply',
    ],
    correctAnswer: 2,
    explanation:
      'The nominal voltage of a reduced low voltage system shall not exceed 110 V AC rms between lines. The single-phase secondary is centre-tapped and that midpoint is earthed, giving 55 V to earth, while a three-phase reduced low voltage system gives 63.5 V from line to the earthed star point. The halving of the touch voltage is the whole point of the arrangement on a site. The frequent error is quoting 63.5 V for a single-phase tool transformer, which is the three-phase figure.',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 223,
    question: 'Which protective measure does Section 704 exclude from use in construction and demolition site installations?',
    options: [
      'Automatic disconnection of supply using an RCD and a breaker',
      'Reduced low voltage from a site isolating transformer supply',
      'SELV using a source that satisfies the requirements for safety',
      'Electrical separation, which is not to be used in these locations',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 704.410.3.6 excludes electrical separation on construction and demolition sites. Separation depends on the separated circuit staying genuinely isolated from earth, and a site full of long trailing flexibles suffering damage, damp and abrasion cannot guarantee that; a first fault to earth would pass unnoticed and the second fault would be lethal. Automatic disconnection of supply, reduced low voltage and SELV all remain available and are the measures the section expects you to design around.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 224,
    question: 'A circuit has a design current of 34 A and takes the next standard device of 40 A. An ambient factor of 0.87 and a grouping factor of 0.65 apply. What tabulated capacity is needed?',
    options: [
      '60.1 A, from 34 divided by 0.87 x 0.65 using the design current',
      '22.6 A, from 40 multiplied by 0.87 x 0.65 in a single step',
      '70.7 A, from 40 divided by 0.87 x 0.65 using the device rating',
      '40.0 A, since correction factors apply only to buried cables',
    ],
    correctAnswer: 2,
    explanation:
      'It >= In / (Ca x Cg) = 40 / (0.87 x 0.65) = 40 / 0.5655 = 70.7 A. Note how heavy grouping doubles the required tabulated capacity against a load of only 34 A, which is why a badly planned trunking route can cost more in copper than the load ever justified. Always divide by the device rating and not the design current, because the cable has to survive everything the device will allow to flow. Having settled the size on current, check voltage drop separately, as that often pushes it up again.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 225,
    question: 'A single socket-outlet is added to an existing final circuit and no new circuit is created. Which document is appropriate?',
    options: [
      'An Electrical Installation Condition Report on the whole property',
      'A Minor Electrical Installation Works Certificate for the addition',
      'An Electrical Installation Certificate, since new work has been done',
      'A written notice to the client confirming that testing was done',
    ],
    correctAnswer: 1,
    explanation:
      'A Minor Works Certificate covers an addition or alteration to an existing circuit that does not extend to providing a new circuit. As soon as a new circuit is installed, even a single one, an Electrical Installation Certificate is required instead. A Condition Report is a different animal altogether: it reports on the condition of existing installation work and classifies observed departures, and it can never be used to certify work you have just carried out.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 226,
    question: 'Why is polarity confirmed by a dead test before the installation is energised?',
    options: [
      'Because polarity cannot be checked once the installation is live',
      'Because insulation resistance results depend on correct polarity',
      'Because energising reversed connections makes fittings live when off',
      'Because the earth loop impedance test needs a polarity result first',
    ],
    correctAnswer: 2,
    explanation:
      'The dead polarity test proves that every fuse and single-pole switching device sits in the line conductor and that centre contacts of lampholders are connected correctly. If a reversal is present and you energise anyway, the accessory stays live with its switch off, so the first person to change a lamp gets a shock from an apparently dead fitting. Polarity is confirmed again during the live tests, and insulation resistance readings themselves are unaffected by which way round the conductors are.',
    section: '6.8',
    difficulty: 'advanced',
  },
  {
    id: 227,
    question: 'A rural property is fed from an overhead line and the distributor provides no earthing facility. What does the designer have to adopt?',
    options: [
      'A TN-S arrangement using the metallic sheath of the supply cable',
      'A TN-C-S arrangement made by linking neutral and earth at the cut-out',
      'An IT arrangement with the transformer star point left unearthed',
      'A TT arrangement with an electrode and RCD protection at the origin',
    ],
    correctAnswer: 3,
    explanation:
      'With no distributor earth terminal the consumer must provide the earth, which means an electrode and a TT system. The loop path returns through soil, so Zs is high, variable with the weather and far too great for an overcurrent device to give automatic disconnection in time, which is why RCD protection is fundamental to a TT design rather than an optional extra. Never fabricate a TN-C-S by joining neutral and earth yourself, and IT is a supply arrangement not available to a consumer.',
    section: '6.1',
    difficulty: 'advanced',
  },
  {
    id: 228,
    question: 'A 10.5 kW instantaneous shower is supplied at 230 V. Which design current and protective device rating are correct?',
    options: [
      '43.8 A, from 10 500 / 240, so a 40 A device is acceptable',
      '45.7 A, from 10 500 / 230, so a 40 A device is acceptable',
      '45.7 A, from 10 500 / 230, so a 50 A device is required',
      '21.0 A, from 10 500 / 230 halved because of the two elements',
    ],
    correctAnswer: 2,
    explanation:
      'Ib = P / V = 10 500 / 230 = 45.7 A. Since In must be at least Ib, a 40 A device is ruled out and the next standard rating is 50 A, with the cable and its correction factors then sized to carry that. Diversity does not apply to a single fixed load that draws full power whenever it is switched on. The trap in this question is the legacy 240 V figure, which shaves the answer to 43.8 A and appears to justify the cheaper 40 A device on an undersized cable.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 229,
    question: 'A circuit supplies a motor with a heavy starting inrush. Which circuit-breaker selection reflects sound design practice?',
    options: [
      'Type B, since the lowest trip threshold suits inrush current best',
      'Any type, because inrush current lasts too briefly to trip a device',
      'Type D only, because motors must never be run on a Type B device',
      'Type C or D, checking the tighter maximum Zs can still be met',
    ],
    correctAnswer: 3,
    explanation:
      'Higher letters have a higher magnetic trip band, so a Type C or D rides through motor inrush without nuisance tripping. The price is paid on fault protection: a much larger fault current is now needed to trip the device instantly, so the maximum permitted Zs falls sharply and must be verified, often forcing a larger protective conductor, a shorter run or added RCD protection. Type B is not forbidden for motors, and inrush is quite long enough to trip a device that is too sensitive.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 230,
    question: 'An Electrical Installation Certificate carries separate signature boxes for design, construction, and inspection and testing. What does this reflect?',
    options: [
      'That one person may only ever sign a single one of the three parts',
      'That the three responsibilities may rest with different people',
      'That the client must countersign each of the three sections too',
      'That the design box is optional on a domestic installation only',
    ],
    correctAnswer: 1,
    explanation:
      'The three declarations exist because the three responsibilities can sit with three different parties, for example a consulting designer, a contractor who installs, and a separate inspector. Where one competent person has carried out all three roles on a small job, a single-signature version of the form is used. No box is ever optional, and the client signs nothing on the certificate; the client is the person the certificate is issued to, not a party declaring compliance.',
    section: '6.7',
    difficulty: 'basic',
  },
  {
    id: 231,
    question: 'Why does steel wire armoured cable to BS 5467 carry more current than a thermoplastic insulated cable of the same conductor size?',
    options: [
      'Its steel armour conducts a share of the load current in parallel',
      'Its thermoplastic PVC insulation is rated at 70 degrees C throughout',
      'Its XLPE insulation is thermosetting and rated at 90 degrees C',
      'Its circular conductors always have a larger cross-sectional area',
    ],
    correctAnswer: 2,
    explanation:
      'Standard SWA to BS 5467 is insulated with cross-linked polyethylene, a thermosetting material with a 90 degrees C conductor operating temperature, so its tabulated capacities exceed those of a 70 degrees C thermoplastic cable. Calling SWA a 70 degrees C cable is a common and costly error. The caution is at the ends: where the cable terminates in equipment or an accessory rated only for 70 degrees C, the 70 degrees C values must be used. The armour is a protective conductor, not a load-carrying conductor.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 232,
    question: 'Where are the energy efficiency requirements of BS 7671 now located?',
    options: [
      'In Appendix 17, which remains the home of the efficiency measures',
      'In Chapter 52, alongside the selection of the wiring systems used',
      'In Chapter 81 of the new Part 8, replacing the deleted Appendix 17',
      'In Part 6, as a set of extra checks made during initial verification',
    ],
    correctAnswer: 2,
    explanation:
      'Appendix 17 has been deleted and the material now sits in Chapter 81 within the new Part 8. That matters practically as well as academically: an appendix was informative, whereas material carried in a numbered Part carries the weight the Regulations give it. Citing Appendix 17 in a design document or on a certificate now points at something that no longer exists, which undermines the rest of the paperwork in the eyes of anyone checking it.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 233,
    question: 'Where does the value of k used in the adiabatic equation for a protective conductor come from?',
    options: [
      'From Tables 54.2 to 54.6, set by initial and final temperatures',
      'From the rated current of the protective device that is fitted',
      'From the measured earth fault loop impedance for that circuit',
      'From the length of the circuit and the volt drop that results',
    ],
    correctAnswer: 0,
    explanation:
      'The k factor is a material and temperature constant, taken from Tables 54.2 to 54.6 according to the conductor material, its insulation, and the initial and final temperatures assumed for the use in question. A copper conductor in a multicore cable, a bare copper conductor and a copper conductor bunched with others therefore take different values of k. The circuit variables such as device rating and loop impedance enter the calculation through the fault current I and the time t, never through k.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 234,
    question: 'During initial verification, what must the inspection confirm about the selection of conductors?',
    options: [
      'That conductor sizes match the design for capacity and volt drop',
      'That every conductor is one size larger than the design requires',
      'That conductor colours match those used before the harmonisation',
      'That the conductors were supplied by an approved manufacturer only',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 642.3 lists checking the selection of conductors for current-carrying capacity and voltage drop in accordance with the design among the items of inspection, so the inspector compares what has actually been installed against the design calculations rather than merely eyeballing the workmanship. This is why the designer file matters at verification: without the design figures for Iz and voltage drop there is nothing to inspect the installed cable against, and the item cannot honestly be ticked.',
    section: '6.8',
    difficulty: 'advanced',
  },
  {
    id: 235,
    question: 'Where electrical separation is used to supply an electric vehicle charging point, what limitation applies?',
    options: [
      'Up to four vehicles may share the one isolating transformer output',
      'The arrangement suits Class II vehicles rather than Class I ones',
      'One vehicle only may be supplied from the one unearthed source',
      'The arrangement is limited to outdoor charging points on a site',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 722.413.1.2 limits the separated-source measure to the supply of one electric vehicle from one unearthed source, provided by a fixed isolating transformer. The reason is inherent to separation: the safety of an unearthed system depends on there being no return path, and the moment a second load shares the same separated supply a fault on each circuit creates a path between them at full voltage. The NOTE points to Annex A722 for an example arrangement feeding a Class I charging point.',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 236,
    question: 'What primarily drives the selection of enclosures and wiring systems for a vehicle wash bay?',
    options: [
      'The assessment of external influences such as water and impact',
      'The preference of the client for a particular manufacturer range',
      'The rating of the protective device chosen for the final circuit',
      'The colour coding scheme used elsewhere on the same premises',
    ],
    correctAnswer: 0,
    explanation:
      'Chapter 52 requires wiring systems to be selected and erected with regard to the external influences present, and a wash bay presents jets of water, chemicals, impact from vehicles and constant humidity all at once. That assessment sets the IP rating, the material of enclosures and conduit, the corrosion resistance and the fixing method. The protective device rating is a consequence of load, not a driver of enclosure choice, and client preference cannot lower what the environment demands.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 237,
    question: 'A 30 mA RCD is fitted downstream of a 100 mA RCD at the origin. What is needed for selectivity between them?',
    options: [
      'Matching the two devices so both have the same 30 mA sensitivity',
      'Fitting both devices from the same manufacturer and product range',
      'Wiring the downstream device so it also carries the neutral load',
      'Making the upstream device a Type S with an intentional time delay',
    ],
    correctAnswer: 3,
    explanation:
      'Selectivity between residual current devices needs two margins, not one. A current margin of roughly three to one is the usual rule, and 100 mA against 30 mA satisfies it, but current alone is not enough because both devices see the same fault at the same instant. The time margin comes from a Type S delayed upstream device, which is why verification expects a Type S to operate in the 130 to 500 ms band at its rated residual current while the general downstream device clears within 300 ms.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 238,
    question: 'A 60 m radial to an outbuilding is adequate on current-carrying capacity at 6 mm2, but the calculated voltage drop exceeds the limit. What is the correct response?',
    options: [
      'Accept it, because the 5 per cent figure is only advisory guidance',
      'Increase the conductor size until the calculated drop complies',
      'Reduce the protective device rating so less current can flow',
      'Add a second circuit in parallel using the same 6 mm2 cable size',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage drop is a design limit in its own right and a circuit must satisfy capacity, disconnection and voltage drop together, so failing on any one means the cable is too small. Increasing the conductor size lowers the mV/A/m figure and is the normal fix on a long run. Reducing the device rating does not help, because voltage drop is calculated on the design current the load actually draws. Long submains are routinely governed by voltage drop rather than by current, so calculate it early.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 239,
    question: 'A 30 mA RCD is described as providing additional protection. What does that mean for the rest of the design?',
    options: [
      'It replaces the need for a circuit protective conductor entirely',
      'It removes the need to check disconnection times on that circuit',
      'It permits a higher maximum Zs than the device tables allow for',
      'It backs up basic and fault protection but does not replace them',
    ],
    correctAnswer: 3,
    explanation:
      'Additional protection is a safety net for the failure of basic or fault protection or for carelessness by a user, such as a cable cut by a spade. The circuit still needs its protective conductor, and the disconnection time still has to be met by whatever device provides automatic disconnection of supply. Keep the roles separate in your head: where an RCD is itself relied on as the disconnecting device, as in a TT system, it is then the residual operating current that sets the loop impedance requirement.',
    section: '6.5',
    difficulty: 'advanced',
  },
  {
    id: 240,
    question: 'A shower without a basin is installed in a room. How are the zones around it determined?',
    options: [
      'Zone 1 stops at the shower head and zone 2 extends beyond it',
      'Zone 0 extends across the whole floor area of the entire room',
      'Zone 2 extends 0.60 m outward from the boundary of zone 1',
      'There is no zone 2, and zone 1 extends 1.20 m horizontally',
    ],
    correctAnswer: 3,
    explanation:
      'Where a shower has no basin, Regulation 701.32.3 gives an enlarged zone 1 defined by a 1.20 m horizontal dimension and there is no zone 2 at all. The 0.60 m zone 2 band belongs to the arrangement where a basin is present. Figure 701.1 shows the shapes, and the practical consequence is that the equipment restrictions and IPX4 requirement of zone 1 apply out to 1.20 m from the fixed water outlet rather than stopping at a tray edge that does not exist.',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 241,
    question: 'What distinguishes a device suitable for isolation from a device provided for functional switching?',
    options: [
      'It must be capable of interrupting the full load current safely',
      'It must be fitted with an indicator lamp showing the supply is on',
      'It must give secure separation and be capable of being secured off',
      'It must be double pole regardless of the earthing system in use',
    ],
    correctAnswer: 2,
    explanation:
      'Isolation means cutting the installation or circuit off from every source of electrical energy and keeping it cut off. The device must achieve separation to the required standard and, as Regulation 462.3 illustrates, be capable of being secured in the open position, for example by padlocking, so it cannot be closed while someone is working. Functional switching only has to operate the equipment for convenience. Breaking load current is a property of a switching device, not the defining feature of isolation.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 242,
    question: 'On a ring final circuit the end-to-end line reading r1 is 0.50 ohms and the end-to-end protective conductor reading r2 is 0.84 ohms. What is R1 plus R2 at a socket on the ring?',
    options: [
      '1.34 ohms, the sum of the two end-to-end readings as measured',
      '0.67 ohms, half the sum of the two end-to-end readings taken',
      '0.17 ohms, the sum of the readings divided by eight at a socket',
      '0.34 ohms, the sum of the readings divided by four at a socket',
    ],
    correctAnswer: 3,
    explanation:
      'Cross-connecting the ends of a ring puts two halves of each conductor in parallel, and the worst case at the midpoint works out as R1 plus R2 = (r1 + r2) / 4 = (0.50 + 0.84) / 4 = 1.34 / 4 = 0.34 ohms. Dividing by two is the usual slip and gives a pessimistic value that can send you chasing a circuit that is in fact compliant. Note that r2 is much larger than r1 here, which simply reflects the reduced size of the protective conductor in flat twin and earth cable.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 243,
    question: 'What must be attended to before carrying out an insulation resistance test on a final circuit?',
    options: [
      'That all lamps are left in place so the circuit is fully loaded',
      'That the supply remains connected to give a stable reference',
      'That the protective conductor is disconnected from the earth bar',
      'That sensitive equipment is disconnected to avoid damage to it',
    ],
    correctAnswer: 3,
    explanation:
      'The test applies a DC voltage well above the nominal voltage of the circuit, which will destroy LED drivers, dimmers, electronic timers and similar equipment, so such items are disconnected or the circuit is tested in a way that excludes them, and lamps are removed. It is a dead test carried out after safe isolation. Lifting the protective conductor from the earth bar defeats the purpose, since one of the measurements you need is between the live conductors and earth.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 244,
    question: 'What comes first in the design process for a new installation?',
    options: [
      'Establishing the maximum demand and the characteristics of supply',
      'Selecting the consumer unit and the number of ways it will need',
      'Choosing the cable type to be used throughout the installation',
      'Deciding the position of accessories in each room of the property',
    ],
    correctAnswer: 0,
    explanation:
      'Part 3 requires the general characteristics to be assessed before anything is selected: the purpose and expected demand of the installation, the supply arrangement and earthing system, Ze and prospective fault current, the maximum demand after diversity, the division into circuits and the external influences present. Every later decision, including board size, device types and cable selection, falls out of that assessment. Starting from the consumer unit is designing backwards from the wholesaler catalogue.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 245,
    question: 'Why must the designer check the fault current at the far end of a long circuit as well as at its origin?',
    options: [
      'Because prospective fault current rises with distance from the source',
      'Because volt drop reduces the load current the device must carry',
      'Because breaking capacity is only assessed at the furthest point',
      'Because the lowest fault current governs the disconnection time',
    ],
    correctAnswer: 3,
    explanation:
      'The two checks pull in opposite directions. Breaking capacity is set by the highest prospective fault current, which occurs at the origin where impedance is least. Disconnection time is set by the lowest fault current, which occurs at the remote end where impedance is greatest. If that minimum current fails to reach the magnetic trip threshold of the breaker, the device falls back onto its slow thermal curve and takes seconds rather than milliseconds, so the circuit fails on disconnection time despite passing at the board.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 246,
    question: 'What must be provided at the origin of every installation comprising more than one circuit?',
    options: [
      'A copy of the design calculations kept in a durable wallet on site',
      'A durable diagram or chart identifying the circuits and their devices',
      'A notice giving the name and address of the electricity distributor',
      'A label recording the value of Ze measured on the day of testing',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 514.9.1 requires a diagram, chart, table or equivalent schedule at the origin showing the number and type of circuits, the points served, the conductor sizes, the type and rating of each protective device, the method of protection against electric shock, and details of any circuit or equipment vulnerable to a typical test. Regulation 514.9.2 adds that it must be legible and durable. It is a permanent on-site record, not the designer calculation file, and Ze belongs on the certificate.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 247,
    question: 'A domestic board supplies a shower, a cooker, two 32 A ring final circuits and lighting. Why may the main switch and supply conductors be rated below the sum of the device ratings?',
    options: [
      'Because the supply fuse limits current whatever the load demands',
      'Because the ring circuits are wired in two directions round a loop',
      'Because diversity reflects that the loads do not all peak together',
      'Because the cooker and shower cannot be operated in the same room',
    ],
    correctAnswer: 2,
    explanation:
      'Maximum demand is assessed by applying diversity to each load according to its type: a shower takes its full value because it runs at full power whenever it is on, a cooker is assessed on a first portion plus a percentage of the remainder, and socket circuits are assessed on realistic simultaneous use. Leaning on the supply fuse instead is not design. It means the tails are being protected by a device the designer does not control and cannot verify, and a sustained overload would sit on undersized conductors.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 248,
    question: 'What is the difference between an overload current and a short-circuit current?',
    options: [
      'An overload occurs in a faulty circuit and a short circuit does not',
      'An overload is always larger than a short-circuit current would be',
      'An overload flows to earth while a short circuit flows to neutral',
      'An overload flows in a healthy circuit, a short circuit in a faulty one',
    ],
    correctAnswer: 3,
    explanation:
      'An overload is an overcurrent in a circuit that is electrically sound, caused by connecting more load than the circuit was designed for. It is modest in size but sustained, so the thermal element of the protective device deals with it. A short circuit is an overcurrent arising from a fault of negligible impedance between live conductors and can run to thousands of amps, which is why the magnetic element must act in milliseconds. Both are overcurrents, but they call for different parts of the same device.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 249,
    question: 'Why is measured conductor resistance corrected upward before it is used to verify disconnection?',
    options: [
      'Because copper resistance falls as the conductor gets warmer',
      'Because the cpc is always smaller than the line conductor is',
      'Because copper resistance rises as the conductor gets warmer',
      'Because the test instrument reads low on very short circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Copper has a positive temperature coefficient, so a conductor at full load is hotter and more resistive than the same conductor measured cold on a quiet site. A Zs that just scrapes past when cold can therefore fail when the circuit is actually working. Two routes handle it: correct the measured R1 plus R2 to operating temperature before adding Ze, or compare the cold measured Zs against a reduced fraction of the tabulated maximum. Design values already assume the conductor sitting at its operating temperature.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 250,
    question: 'On a TT installation, which testing confirms the effectiveness of the earthing arrangement?',
    options: [
      'A continuity test between the main earthing terminal and the board',
      'An insulation resistance test taken between live parts and earth',
      'A polarity check made at the origin before the supply is switched',
      'A measurement of the earth electrode resistance and the RCD test',
    ],
    correctAnswer: 3,
    explanation:
      'On TT the fault path returns through the mass of earth, so the electrode resistance RA is measured and the RCD is verified as operating within the required time at its rated residual current, since the RCD is the device providing automatic disconnection. The design condition is that RA multiplied by the rated residual operating current keeps the touch voltage within the 50 V limit of Regulation 411.5.3. Continuity, insulation resistance and polarity are all required tests, but none of them assesses the electrode.',
    section: '6.8',
    difficulty: 'advanced',
  },
  {
    id: 251,
    question: 'On a site where several trades are working, why does the electrical supervisor allocate duties to named operatives before work begins?',
    options: [
      'So each task has an owner and an agreed sequence',
      'So apprentices can work without supervision',
      'So the client is billed for each operative',
      'So one operative signs every certificate',
    ],
    correctAnswer: 0,
    explanation: 'Allocating duties fixes responsibility and the order of work, which is what keeps trades from clashing and stops tasks being missed. Billing is a commercial matter handled separately and has no bearing on how duties are shared out on site.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 252,
    question: 'Which document tells the designer the intended use and layout of the rooms in a new building?',
    options: [
      'The distributor\'s declared loop impedance letter',
      'The architect\'s floor plans and room schedule',
      'The data sheet for the consumer unit fitted',
      'The test results from the previous owner',
    ],
    correctAnswer: 1,
    explanation: 'Room use and layout come from the architect\'s drawings and room schedule; they drive point positions, load assumptions and external influences. The distributor\'s letter is tempting because it is genuine design information, but it tells you only about the incoming supply, not what the rooms are for.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 253,
    question: 'What must be in place before an operative starts chasing walls in an occupied office?',
    options: [
      'A signed Electrical Installation Certificate for the work',
      'A completed schedule of circuit details for the board',
      'A safe working area segregated from the occupants',
      'A recorded earth electrode resistance value',
    ],
    correctAnswer: 2,
    explanation: 'Dust, noise and falling debris put occupants at risk, so the working area is segregated and signed before cutting starts. A certificate is issued at the end of the work, not before it, so it cannot be a precondition for starting.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 254,
    question: 'Why is a record of existing damage to a customer\'s property made before work starts?',
    options: [
      'It transfers the cost of all future repairs to the building owner',
      'It replaces the need for a written risk assessment on the site',
      'It allows the completion certificate to be issued earlier',
      'It separates existing damage from damage the work causes',
    ],
    correctAnswer: 3,
    explanation: 'A dated record fixes the condition of the property at handover of the site, so later disputes can be settled on evidence. It does not shift liability onto the owner; it simply shows what was already there.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 255,
    question: 'How should pre-existing damage to a customer\'s floor finishes be recorded?',
    options: [
      'By dated photographs agreed with the customer',
      'By marking the boards with a permanent pen',
      'By an entry on the schedule of inspections',
      'By a verbal note to the site supervisor',
    ],
    correctAnswer: 0,
    explanation: 'Dated photographs agreed at the time give both parties the same evidence and cannot be disputed later. A verbal note fails because nothing is dated, nothing is agreed, and nobody can prove what was said.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 256,
    question: 'An operative finds a cracked ceiling rose before any work has started. What should happen next?',
    options: [
      'It is replaced quietly so the programme is not delayed',
      'It is reported and recorded before work continues',
      'It is left until the final certificate is written',
      'It is added to the variation account in silence',
    ],
    correctAnswer: 1,
    explanation: 'Reporting and recording protects both the customer and the contractor, and lets the customer decide what happens to their property. Quietly replacing it destroys the evidence of who caused the damage and commits the customer to work they never agreed.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 257,
    question: 'Which measure best protects a customer\'s carpet while cables are being run overhead?',
    options: [
      'A signed disclaimer covering damage to floor finishes',
      'A note on the drawing showing the cable route taken',
      'Dust sheets laid and secured over the whole route',
      'An extra allowance added to the price',
    ],
    correctAnswer: 2,
    explanation: 'Physically covering the floor along the whole working route stops the damage happening, which is the point of protecting the fabric. A disclaimer only shifts the argument about damage that has already occurred; it protects nothing.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 258,
    question: 'Conduit is sized for the number and size of cables it will carry mainly so that:',
    options: [
      'the conduit can be threaded without a stock and die',
      'the conduit resists corrosion in damp locations',
      'the cables need no rating factors to be applied',
      'the cables can be drawn in without damage',
    ],
    correctAnswer: 3,
    explanation: 'Conduit capacity is set so cables can be drawn in and withdrawn without stripping insulation or jamming. Grouping and thermal effects are handled by rating factors applied separately, so sizing the conduit never removes the need for those factors.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 259,
    question: 'Which wiring system is normally selected for a buried supply to a detached garage?',
    options: [
      'Steel wire armoured cable to BS 5467',
      'Mineral insulated cable, bare sheath',
      'Flat twin and cpc clipped direct',
      'PVC conduit with single cores',
    ],
    correctAnswer: 0,
    explanation: 'Armoured cable gives the mechanical protection a buried run needs and is designed for direct burial. Mineral insulated cable is robust, but with a bare sheath it corrodes in the ground and must have an overall covering, so it is not the normal selection.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 260,
    question: 'Before an operative uses a 110 V rotary hammer drill on site, what check comes first?',
    options: [
      'That the tool has a current calibration certificate',
      'That the tool and its lead are visibly undamaged',
      'That the tool is on the equipment schedule',
      'That the tool has its warranty card',
    ],
    correctAnswer: 1,
    explanation: 'A user check for obvious damage to the casing, lead and plug is the first line of defence and takes seconds. Calibration applies to measuring instruments, not to a drill, so demanding a calibration certificate confuses two different classes of equipment.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 261,
    question: 'Which equipment is used to set out a straight horizontal run of trunking across a wall?',
    options: [
      'A low resistance ohmmeter and leads',
      'A steel rule and a bradawl point',
      'A spirit level and a chalk line',
      'An insulation tester',
    ],
    correctAnswer: 2,
    explanation: 'A spirit level establishes the horizontal and a chalk line transfers it across the full length in one snap. A steel rule and bradawl will mark points but cannot hold a true horizontal over a long run, so the trunking ends up out of level.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 262,
    question: 'Which tool is correct for cutting steel conduit to length on site?',
    options: [
      'A junior hacksaw with a wood cutting blade',
      'A pipe cutter with a rolling wheel',
      'An angle grinder with a stone disc',
      'A hacksaw with a fine tooth blade',
    ],
    correctAnswer: 3,
    explanation: 'A fine tooth hacksaw gives a square cut that can be reamed and threaded cleanly. A rolling wheel pipe cutter is the classic mistake because it rolls the metal inwards, narrowing the bore and leaving a burr that will damage cable insulation.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 263,
    question: 'Which fixing is correct for supporting cable tray on a solid concrete soffit?',
    options: [
      'An expanding anchor set into the concrete',
      'A plastic plug rated for plasterboard',
      'A self-tapping screw into a batten',
      'A hammer-in plug for a stud wall',
    ],
    correctAnswer: 0,
    explanation: 'An expanding anchor develops its load in solid concrete and is the correct fixing for an overhead tray support. A plasterboard-rated plug relies on a thin sheet material for grip and has no meaningful pull-out strength in concrete.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 264,
    question: 'Why must cables along an escape route be supported by metal fixings?',
    options: [
      'So the circuit protective conductor stays continuous',
      'So they cannot fall and obstruct people leaving',
      'So the cable\'s current-carrying capacity rises',
      'So the voltage drop stays within its limit',
    ],
    correctAnswer: 1,
    explanation: 'In a fire, plastic clips soften and the cable drops, entangling anyone escaping or the fire service entering. Support has no effect on current-carrying capacity, which is set by the reference method and the rating factors.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 265,
    question: 'After cables have been buried in a plastered wall, what should the electrician do?',
    options: [
      'Leave the chase open for the inspector to examine',
      'Fill the chase with expanding foam and paint over',
      'Make good the chase to match the existing finish',
      'Record the chase depth on the certificate',
    ],
    correctAnswer: 2,
    explanation: 'Restoring the building fabric to match the surrounding finish is part of the work and protects the cable mechanically. Leaving the chase open is wrong because inspection of concealed cables is done before they are covered, not by leaving damage in the customer\'s wall.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 266,
    question: 'Why is the electrical first fix coordinated with the carpenter\'s programme?',
    options: [
      'Timber studs must be bonded to the main earthing terminal',
      'Plasterboard raises the cable current-carrying capacity',
      'The carpenter certifies the cable routes on completion',
      'Cables must be installed before boards are fixed',
    ],
    correctAnswer: 3,
    explanation: 'Once plasterboard goes on, cables can only be installed by cutting it out again, so first fix has to be sequenced against the boarding. Timber studs are not conductive parts and never require bonding, so that reason has no basis.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 267,
    question: 'A designer is told the ductwork contractor will use the same ceiling void. What is the correct response?',
    options: [
      'Agree the routes and levels with them before first fix',
      'Record the clash on the Installation Certificate',
      'Install the cables first and work around them',
      'Increase the cable size for the extra heat',
    ],
    correctAnswer: 0,
    explanation: 'Coordinating routes and levels in advance is what prevents clashes, rework and cables being displaced into hot or inaccessible positions. Recording a clash on a certificate documents a problem that should have been designed out before anyone started work.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 268,
    question: 'Which source gives the designer the earth fault loop impedance available at the origin?',
    options: [
      'The manufacturer\'s data for the consumer unit fitted',
      'The distributor\'s declared value for the supply',
      'The schedule of inspections for previous work',
      'Appendix 4 of BS 7671 for the cable',
    ],
    correctAnswer: 1,
    explanation: 'The external loop impedance depends on the distributor\'s network, so at design stage the declared value is used and confirmed by measurement later. Appendix 4 covers conductor current-carrying capacity and voltage drop and says nothing about the supply\'s external impedance.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 269,
    question: 'What does a permit to work on an existing switchroom principally control?',
    options: [
      'When the client is invoiced for the completed work',
      'How the completed circuits are to be tested later',
      'Who may work, on what, and under what conditions',
      'Which cable sizes may be used',
    ],
    correctAnswer: 2,
    explanation: 'A permit defines the person, the equipment, the precautions and the limits of the work, so nobody re-energises equipment while someone is working on it. Test procedures are set by the inspection and testing requirements, not by the permit.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 270,
    question: 'Why does a pre-work condition survey matter most on a heritage building?',
    options: [
      'Certification is not required for listed buildings',
      'Older buildings always need a TT earthing system',
      'Cable ratings are lower in older masonry walls',
      'Damage there is costly and hard to put right',
    ],
    correctAnswer: 3,
    explanation: 'Original plaster, joinery and finishes cannot simply be replaced, so proving what was already damaged carries real financial weight. Listed status changes nothing about certification, which is required for the electrical work regardless of the building\'s age.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 271,
    question: 'A customer\'s fitted kitchen units sit beside the new consumer unit position. How is their condition best established?',
    options: [
      'A joint walk round recorded in writing at the time',
      'An allowance added to the quotation for damage',
      'A note in the site diary at the end of the job',
      'A photograph taken after the units are moved',
    ],
    correctAnswer: 0,
    explanation: 'A joint walk round recorded in writing means both parties have seen and agreed the same condition before work starts. A photograph taken after the units have been moved cannot show whether the damage predates the work.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 272,
    question: 'Existing damage is found that was not on the original survey. What should the contractor do?',
    options: [
      'Note it on the Electrical Installation Certificate instead',
      'Record it, tell the customer, and agree it in writing',
      'Repair it at once and add the cost to the bill',
      'Treat it as fair wear and continue working',
    ],
    correctAnswer: 1,
    explanation: 'Recording, reporting and agreeing keeps the survey honest and protects both parties from a later dispute. Repairing it unilaterally and billing for it commits the customer to work they never authorised and destroys the evidence of its original state.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 273,
    question: 'Which measure protects a polished timber floor while a distribution board is replaced?',
    options: [
      'An additional payment agreed for refinishing afterwards',
      'A note asking the customer to keep the room locked up',
      'Boarding laid over sheeting along the walking route',
      'A cable route chosen to avoid the timber',
    ],
    correctAnswer: 2,
    explanation: 'Sheeting stops dust and grit and boarding spreads the load of feet, ladders and dropped tools, so the finish survives. Agreeing to pay for refinishing accepts the damage instead of preventing it, which is not protection of the fabric.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 274,
    question: 'Why is a metal trunking lid refitted after cables have been drawn in?',
    options: [
      'It completes the main protective bonding of the trunking',
      'It reduces the grouping factor for the enclosed cables',
      'It restores the tabulated rating of the cables inside',
      'It restores the mechanical protection of the cables',
    ],
    correctAnswer: 3,
    explanation: 'The lid is part of the enclosure and its job is to keep the cables protected and contained. Refitting it does not improve the grouping factor; if anything an enclosed grouped arrangement is the more onerous thermal condition.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 275,
    question: 'Trunking is being sized for a mixture of single-core cables. What does the designer compare?',
    options: [
      'The sum of the cable factors against the trunking factor',
      'The sum of the design currents against the rating',
      'The sum of the conductor areas against the area',
      'The largest cable diameter against the depth',
    ],
    correctAnswer: 0,
    explanation: 'Capacity is assessed by adding the individual cable factors and checking the total against the factor for the trunking size. Adding raw conductor cross-sectional areas ignores insulation thickness and the space cables actually occupy, so it always understates the size needed.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 276,
    question: 'A wiring system is required in a cold store held at minus 20 degrees Celsius. Which property matters most?',
    options: [
      'The conductor must be aluminium rather than copper',
      'The insulation must stay flexible when cold',
      'The cable must have a reduced voltage drop',
      'The armour must be bonded at both ends',
    ],
    correctAnswer: 1,
    explanation: 'Low temperature makes ordinary thermoplastic insulation brittle, so it cracks when the cable is handled or moves. Conductor material is chosen on cost, current and termination grounds, and aluminium offers no advantage at low temperature.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 277,
    question: 'Why is a solvent-based adhesive for PVC conduit used only where there is ventilation?',
    options: [
      'It attacks the copper conductors inside the conduit',
      'It reduces the conduit\'s mechanical strength badly',
      'Its vapour is harmful and can build up in a void',
      'It cures too slowly in a sealed space',
    ],
    correctAnswer: 2,
    explanation: 'The solvent vapour is heavier than air, accumulates in confined spaces and is harmful to breathe, so ventilation is a control measure. The adhesive acts on the PVC, not on the conductors, which are not in contact with it when the joint is made.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 278,
    question: 'Socket-outlet positions are being marked out in a new dwelling. What governs the mounting height used?',
    options: [
      'The rating of the protective device serving that final circuit',
      'The current-carrying capacity of the selected circuit cable',
      'The reference method chosen for the final circuit wiring',
      'The client\'s specification and the building regulations',
    ],
    correctAnswer: 3,
    explanation: 'Accessory heights in dwellings are driven by accessibility requirements in the building regulations together with anything the client has specified. The device rating governs how much current the circuit may carry and has no connection with where the accessory sits on the wall.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 279,
    question: 'Which practice is correct when bending steel conduit in a bending machine?',
    options: [
      'Support the conduit fully in the former while bending',
      'Heat the conduit before it enters the former',
      'Bend past the angle and hammer it straight',
      'Use a former larger than the conduit bore',
    ],
    correctAnswer: 0,
    explanation: 'Full support in the correctly sized former stops the conduit rippling or flattening, which would obstruct cable drawing. Overbending and hammering back work-hardens and distorts the wall, leaving a kink that damages cables on the pull.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 280,
    question: 'What decides the spacing of clips supporting a horizontal run of flat cable?',
    options: [
      'The ambient temperature of the room it passes through',
      'The cable size and the guidance for that cable type',
      'The design current flowing in the conductors',
      'The rating of the device at the board',
    ],
    correctAnswer: 1,
    explanation: 'Support spacing is a mechanical matter set by the cable\'s size and type, so the guidance tables are read against those. Design current is a thermal and electrical quantity and has no bearing on how often the cable needs holding up.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 281,
    question: 'Cable tray in a plant room is loaded across its full width. What must the designer check besides the fixings?',
    options: [
      'The insulation resistance measured after installation',
      'The disconnection time of the longest circuit run',
      'The grouping factor applied to the cables on it',
      'The breaking capacity of each device',
    ],
    correctAnswer: 2,
    explanation: 'Cables bunched across a full tray heat one another, so the grouping factor reduces each cable\'s capacity and must be applied. Insulation resistance is a verification measurement taken afterwards and cannot influence the cable size chosen at design stage.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 282,
    question: 'A fire-rated wall has been drilled to pass a conduit through it. What must be done afterwards?',
    options: [
      'Fit a grommet in the opening at each side of it',
      'Fill the opening with plaster and paint over it',
      'Record the opening on the layout drawing only',
      'Seal the opening to the wall\'s fire rating',
    ],
    correctAnswer: 3,
    explanation: 'The penetration must be reinstated with a sealing system that restores the fire resistance the wall was built to provide. Ordinary plaster is not a fire-stopping product and will not hold back fire and smoke for the rated period.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 283,
    question: 'A three-phase four-wire supply is provided to a small factory. What does the fourth conductor allow?',
    options: [
      'Single-phase loads between a line and neutral',
      'The armour to serve as a protective conductor',
      'The loop impedance to be reduced further',
      'Motors to be started at reduced voltage',
    ],
    correctAnswer: 0,
    explanation: 'The neutral gives the line-to-neutral voltage that single-phase equipment needs, so lighting and socket circuits can be shared across the three lines. Reduced-voltage starting is achieved by the starter arrangement and does not depend on the neutral being distributed.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 284,
    question: 'What must the means of isolation at the origin of an installation be capable of doing?',
    options: [
      'Interrupting the prospective fault current on its own',
      'Cutting off all live conductors from the supply',
      'Detecting a residual current of 30 mA',
      'Limiting the let-through energy',
    ],
    correctAnswer: 1,
    explanation: 'Isolation means separating the installation from every source of supply so it can be worked on safely. Interrupting fault current is the job of the protective device; an isolator is not required to make or break fault current at all.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 285,
    question: 'A steel handrail fixed to an outside wall is in direct contact with the ground. How is it classified?',
    options: [
      'A functional earthing conductor',
      'A circuit protective conductor',
      'An extraneous-conductive-part',
      'An exposed-conductive-part',
    ],
    correctAnswer: 2,
    explanation: 'It is a conductive part not forming part of the installation that is liable to introduce earth potential, which is the definition of an extraneous-conductive-part. It is not an exposed-conductive-part, because that term applies to metalwork of the installation that could become live under fault conditions.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 286,
    question: 'A 40 A radial supplying only fixed equipment is installed in a TN system. Which maximum disconnection time applies?',
    options: [
      '0.4 s, as every final circuit is treated the same',
      '0.1 s, as the circuit rating is above 32 amperes',
      '0.2 s, as the load is fixed rather than portable',
      '5 s, as it exceeds 32 A with no socket-outlets',
    ],
    correctAnswer: 3,
    explanation: 'The shorter final circuit times apply to circuits up to 63 A with socket-outlets and up to 32 A supplying only fixed equipment, so a 40 A fixed-load circuit falls outside them and 5 s applies. Assuming 0.4 s covers every final circuit ignores those rating limits entirely.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 287,
    question: 'What is the purpose of a functional earth connection to an item of information technology equipment?',
    options: [
      'To allow the equipment to work correctly',
      'To replace the main bonding conductor',
      'To carry fault current to the source',
      'To provide fault protection',
    ],
    correctAnswer: 0,
    explanation: 'A functional earth exists for the correct operation of the equipment, typically for signal reference or noise immunity. It cannot be relied on for fault protection, which is why protective earthing must always be provided in addition to it.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 288,
    question: 'A 32 A ring final circuit is loaded to 45 A by too many appliances. What is this condition called?',
    options: [
      'A short circuit between live conductors',
      'An overload on a healthy circuit',
      'An earth fault to exposed metal',
      'A residual current above 30 mA',
    ],
    correctAnswer: 1,
    explanation: 'An overload is excess current in a circuit that is electrically sound, which is exactly what too much connected load produces. A short circuit involves a fault of negligible impedance between live conductors and produces currents far higher than 45 A.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 289,
    question: 'Which characteristic of a fuse, rather than a circuit-breaker, benefits a circuit with a very high prospective fault current?',
    options: [
      'It opens the neutral as well as the line conductor',
      'It resets itself once the fault has been removed',
      'It limits the let-through energy as it clears',
      'It gives a fixed 30 mA sensitivity',
    ],
    correctAnswer: 2,
    explanation: 'A fuse begins to clear within the first quarter-cycle and cuts the energy the cable and switchgear must withstand. Resetting is a circuit-breaker property, and a fuse element is destroyed by operation and must be replaced.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 290,
    question: 'Replacing tungsten luminaires with LED units of the same light output changes the design how?',
    options: [
      'The circuit protective conductor must be larger',
      'The protective device breaking capacity rises',
      'The lighting circuit disconnection time falls',
      'The lighting circuit design current falls',
    ],
    correctAnswer: 3,
    explanation: 'LED units draw far less power for the same output, so the design current of the lighting circuit drops and the circuit may be reassessed. Breaking capacity is fixed by the prospective fault current at that point, which changing luminaires does nothing to alter.',
    section: '6.2',
    difficulty: 'intermediate',
  },
  {
    id: 291,
    question: 'A designer must confirm the switchgear will withstand a fault before ordering it. Which figure comes from the distributor rather than from calculation?',
    options: [
      'The prospective fault current at the origin',
      'The diversity allowance for the whole job',
      'The reference method for the cable',
      'The design current of each circuit',
    ],
    correctAnswer: 0,
    explanation: 'The fault level at the origin depends on the transformer and the network feeding it, so the distributor declares it. Diversity is the designer\'s own assessment of how the load behaves and could never be supplied by the distributor.',
    section: '6.1',
    difficulty: 'advanced',
  },
  {
    id: 292,
    question: 'Two cables of the same conductor size are considered for a plant room at 55 degrees Celsius: one thermoplastic rated 70 degrees Celsius, one thermosetting rated 90 degrees Celsius. What follows?',
    options: [
      'The thermosetting cable has a lower voltage drop figure',
      'The thermosetting cable keeps more of its rating',
      'Both cables lose the same proportion of rating',
      'The thermoplastic needs no ambient correction',
    ],
    correctAnswer: 1,
    explanation: 'Ambient correction compares the surrounding temperature with the conductor\'s permitted operating temperature, so the 90 degree cable has more margin left at 55 degrees and is derated less. Assuming both lose the same proportion ignores that the factor depends on the insulation\'s temperature rating.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 293,
    question: 'A wiring system runs through a boiler house at 50 degrees Celsius and the cables are also grouped on a tray. Which rating factors apply?',
    options: [
      'Whichever factor the tray maker states',
      'The two factors added and then halved',
      'Both factors, multiplied together',
      'The more onerous factor',
    ],
    correctAnswer: 2,
    explanation: 'Ambient temperature and grouping are independent thermal effects, so their factors multiply to give the combined figure. Taking only the more onerous factor is a common shortcut that leaves the cable undersized, because the second effect is still present.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 294,
    question: 'A cable has been clipped to a hot water pipe for part of its run because no other support was available. Why is this a design failure?',
    options: [
      'The circuit protective conductor loses its continuity',
      'The clip spacing no longer meets the guidance figure',
      'The cable\'s tabulated rating must be doubled instead',
      'The local ambient raises the conductor temperature',
    ],
    correctAnswer: 3,
    explanation: 'The pipe creates a local hot spot, so the cable at that point is working at a higher ambient than the rest of the run and its capacity there is reduced. Continuity of the protective conductor is unaffected by what the cable is clipped to, so that reasoning misidentifies the fault.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 295,
    question: 'A TN-C-S supply serves a farm with an outbuilding housing livestock. Why might the designer convert the outbuilding to TT?',
    options: [
      'A lost PEN would raise metalwork above true earth',
      'A TT system allows a longer disconnection time',
      'A TT electrode gives a lower loop impedance',
      'A TT system removes the need for bonding',
    ],
    correctAnswer: 0,
    explanation: 'If the distributor\'s PEN conductor is lost, all bonded metalwork rises towards line potential, and livestock are far more susceptible to that voltage than people are. A TT electrode almost always gives a higher loop impedance than a PME terminal, not a lower one.',
    section: '6.5',
    difficulty: 'advanced',
  },
  {
    id: 296,
    question: 'The distributor limits the supply to 100 A single-phase, but the calculated demand after diversity is 118 A. What is the correct design step?',
    options: [
      'Apply a second diversity allowance to the total again',
      'Ask the distributor to uprate or reduce the demand',
      'Increase the conductor size to meet the limit',
      'Fit a 125 A main switch and carry on',
    ],
    correctAnswer: 1,
    explanation: 'The supply capacity is a hard constraint, so either the distributor agrees a larger supply or the load is reduced or managed. Applying diversity a second time to a figure that already has diversity in it manufactures a compliant-looking number from nothing.',
    section: '6.5',
    difficulty: 'advanced',
  },
  {
    id: 297,
    question: 'A machine fed from a distribution board must be isolated locally for maintenance. What does BS 7671 require of the local device?',
    options: [
      'It must carry a separate breaking capacity label',
      'It must break the protective conductor as well',
      'It must be securable in the off position',
      'It must be a 30 mA device',
    ],
    correctAnswer: 2,
    explanation: 'Isolation for maintenance must be secured against inadvertent reclosure, which is why the device has to be capable of being locked or otherwise secured off. Breaking the protective conductor would remove fault protection and is specifically not permitted.',
    section: '6.5',
    difficulty: 'advanced',
  },
  {
    id: 298,
    question: 'Why is a protective conductor sized for the fault current rather than for the load current?',
    options: [
      'It carries the standing leakage of the installation',
      'It carries the same current as the line conductor',
      'It must match the main bonding conductor in size',
      'It carries current only while a fault persists',
    ],
    correctAnswer: 3,
    explanation: 'In normal service a protective conductor carries no appreciable current; its duty is the short, intense fault current until the device clears, which is what the adiabatic check assesses. It does not carry the line conductor\'s load current, so sizing it on load would be meaningless.',
    section: '6.5',
    difficulty: 'advanced',
  },
  {
    id: 299,
    question: 'In a room containing a bath, main bonding is in place, disconnection times are met and every circuit has 30 mA RCD protection. What follows for supplementary bonding?',
    options: [
      'It may be omitted where all three conditions hold',
      'It must be taken back to the earthing terminal',
      'It is required only where a shower is fitted',
      'It is still required at every metal pipe',
    ],
    correctAnswer: 0,
    explanation: 'Supplementary bonding may be omitted only when all three conditions are satisfied together, and here they are. Insisting it is still needed at every pipe ignores the omission allowance; supplementary bonding also connects parts locally rather than running back to the main earthing terminal.',
    section: '6.5',
    difficulty: 'advanced',
  },
  {
    id: 300,
    question: 'A 63 A distribution circuit feeds a sub-board in a TN-S installation. Which maximum disconnection time may the designer use?',
    options: [
      '0.2 s, because sub-boards are treated as TT',
      '5 s, because it is a distribution circuit',
      '0.1 s, because sub-boards serve sockets',
      '0.4 s, because the rating is under 63 A',
    ],
    correctAnswer: 1,
    explanation: 'Distribution circuits in a TN system are permitted 5 s, because nobody is in contact with the equipment they supply in the way they are with a final circuit. The 0.4 s figure applies to final circuits up to 63 A with socket-outlets, and this is not a final circuit.',
    section: '6.8',
    difficulty: 'advanced',
  },
  {
    id: 301,
    question: 'On a TN-C-S supply Ze is measured as 0.35 ohms and R1 plus R2 for the final circuit is 0.62 ohms. What is Zs for that circuit?',
    options: [
      '0.27 ohms, the two values subtracted',
      '0.35 ohms, the external value alone',
      '0.97 ohms, the two values added',
      '0.62 ohms, the circuit value',
    ],
    correctAnswer: 2,
    explanation: 'Zs is the whole loop, so the external impedance and the circuit\'s own conductor resistance add together. Subtracting them is a frequent slip that treats Ze as if it were already inside R1 plus R2, when in fact the two are in series.',
    section: '6.5',
    difficulty: 'advanced',
  },
  {
    id: 302,
    question: 'Which part of the earth fault loop path differs between a TN-S installation and a TT installation?',
    options: [
      'The line conductor from the origin to the point of fault',
      'The circuit protective conductor within the circuit',
      'The transformer winding that feeds the installation',
      'The return path from the fault back to the source',
    ],
    correctAnswer: 3,
    explanation: 'In TN-S the return is a metallic protective conductor back to the source, whereas in TT it is through the installation electrode, the mass of earth and the source electrode. The line conductor and the circuit protective conductor within the circuit are the same in both arrangements.',
    section: '6.5',
    difficulty: 'advanced',
  },
  {
    id: 303,
    question: 'A functional earth is specified for a sensitive control panel. What must the designer not do?',
    options: [
      'Rely on it for protection against electric shock',
      'Connect it to the main earthing terminal',
      'Run it as a separate insulated conductor',
      'Label it to distinguish it from earth',
    ],
    correctAnswer: 0,
    explanation: 'A functional earth is provided for the equipment to work, and it carries no duty to disconnect a fault, so protective earthing must still be provided. Labelling it and running it as a separate identified conductor are both sound practice, not things to avoid.',
    section: '6.5',
    difficulty: 'advanced',
  },
  {
    id: 304,
    question: 'Applying the protective conductor sizing table gives a cross-sectional area that is not a standard size. What does BS 7671 require?',
    options: [
      'Use the calculated figure in the design record',
      'Use the next larger standard size available',
      'Round to the nearest standard size',
      'Use the next smaller standard size',
    ],
    correctAnswer: 1,
    explanation: 'Where the table produces a non-standard result, a conductor of the next larger standard cross-sectional area must be used. Rounding to the nearest size is the tempting error, because it can round downwards and leave the conductor below the minimum the table demands.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 305,
    question: 'A protective conductor is bunched within a copper thermoplastic cable rated 70 degrees Celsius. Which k value is used in the adiabatic equation?',
    options: [
      '76, for aluminium at 70 degrees Celsius',
      '66, for aluminium at 90 degrees Celsius',
      '115, for copper at 70 degrees Celsius',
      '143, for copper at 90 degrees Celsius',
    ],
    correctAnswer: 2,
    explanation: 'The k value depends on both the conductor material and the insulation\'s assumed initial and final temperatures, giving 115 for copper in 70 degree thermoplastic. Using 143 is the classic error of picking the copper thermosetting row, which assumes a 90 degree start and overstates what the conductor can survive.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 306,
    question: 'A designer claims selectivity between two circuit-breakers in series. Which route does BS 7671 accept as verification?',
    options: [
      'A comparison of the two devices\' rated currents only',
      'A measurement of the prospective fault current level',
      'An assumption based on the ratio being above two',
      'A manufacturer\'s declaration for those devices',
    ],
    correctAnswer: 3,
    explanation: 'Selectivity must be verified by a recognised route such as a manufacturer\'s declaration, tests to the product standard, suitable software using manufacturer data, or a desk study of the characteristics. A rule of thumb about the ratio of ratings is not verification and can fail badly at high fault currents.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 307,
    question: 'A consumer unit sits where the prospective fault current is 3.2 kA. Manufacturer\'s data shows a 6 kA breaker backed by the service fuse reaches a higher conditional rating. Which selection is sound?',
    options: [
      'The 6 kA breaker, with the fuse upstream of it',
      'The 6 kA breaker with no upstream device',
      'A 3 kA breaker, as 3.2 kA is under 6 kA',
      'A 16 kA breaker with the fuse removed',
    ],
    correctAnswer: 0,
    explanation: 'The 6 kA breaker exceeds the 3.2 kA present and the upstream fuse only adds margin, so the selection stands on its own rating. Choosing a 3 kA device fails immediately, because 3.2 kA is above its rated short-circuit capacity whatever sits upstream.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 308,
    question: 'A 100 mA time-delayed RCD is fitted upstream of 30 mA RCDs. Besides the residual current rating, what makes the arrangement selective?',
    options: [
      'The upstream device\'s higher breaking capacity',
      'The upstream device\'s deliberate time delay',
      'The downstream devices\' shared neutral bar',
      'The downstream devices\' lower ratings',
    ],
    correctAnswer: 1,
    explanation: 'Selectivity needs both a current margin and a time margin, so the upstream device is deliberately delayed to let the downstream one clear first. Breaking capacity describes what a device can safely interrupt and has no bearing on which device operates first.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 309,
    question: 'A sub-main circuit-breaker trips at the same moment as the final circuit device on a fault. What has the design failed to achieve?',
    options: [
      'Adequate breaking capacity at the sub-board',
      'Basic protection at the exposed metalwork',
      'Selectivity between the two devices',
      'Additional protection downstream',
    ],
    correctAnswer: 2,
    explanation: 'Both devices operating means the fault has taken out more of the installation than necessary, which is a failure of selectivity. Breaking capacity is about safely interrupting the fault, and both devices did interrupt it, so that is not what has gone wrong.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 310,
    question: 'A single ring final circuit in 2.5 mm2 is proposed for a 140 square metre open plan office. What is wrong with it?',
    options: [
      'The ring must be wired in 4 mm2 above 100 square metres',
      'The circuit must be radial where sockets exceed ten',
      'The protective conductor must equal the line size',
      'The floor area exceeds the figure for one ring',
    ],
    correctAnswer: 3,
    explanation: 'A single 30 A or 32 A ring is limited to a floor area of 100 square metres, so 140 square metres needs more than one circuit. Increasing the conductor to 4 mm2 does not extend the area limit, which exists to spread load and limit the consequence of a fault.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 311,
    question: 'A 20 A radial in 2.5 mm2 is proposed for socket-outlets in a workshop. Which check most often decides whether it works?',
    options: [
      'The corrected capacity against the device rating',
      'The breaking capacity against fault current',
      'The insulation resistance of the circuit',
      'The floor area against the ring figure',
    ],
    correctAnswer: 0,
    explanation: 'The circuit stands or falls on whether the cable\'s capacity, after the reference method and rating factors, still equals or exceeds the 20 A device. Insulation resistance is a verification result obtained after installation and cannot determine whether the design was viable.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 312,
    question: 'A fire alarm cable and a lighting circuit cable are to share a containment route. What does the design require?',
    options: [
      'A single 30 mA RCD covering both circuits together',
      'Segregation appropriate to the two circuit types',
      'The same reference method for both cables',
      'A common protective conductor for both',
    ],
    correctAnswer: 1,
    explanation: 'Safety service and general circuits must be segregated so a fault or fire in one cannot disable the other. Putting both on one 30 mA RCD does the opposite, because a single nuisance trip would then take out the fire alarm supply as well.',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 313,
    question: 'Why is it wrong to obtain an installation\'s maximum demand by adding together the assessed demands of its final circuits?',
    options: [
      'Each circuit figure is stated in kW not in amperes',
      'Each circuit figure assumes a power factor of one',
      'Each circuit figure already has diversity in it',
      'Each circuit figure omits the lighting',
    ],
    correctAnswer: 2,
    explanation: 'Circuit demands are assessed with their own allowances, so adding them and then applying diversity again double-counts it; the correct route is to total the connected equipment and apply the installation allowances once. Power factor is handled inside each current calculation and is not the reason the method fails.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 314,
    question: 'A household cooking appliance is rated 42 A and its control unit contains a socket-outlet. What demand is used for the circuit?',
    options: [
      '12.6 A, with 30 per cent taken of the whole rating',
      '42.0 A, the full rating with no diversity applied',
      '19.6 A, with the socket-outlet allowance left out',
      '24.6 A, the first 10 A plus 30 per cent plus 5 A',
    ],
    correctAnswer: 3,
    explanation: 'The first 10 A counts in full, 30 per cent of the remaining 32 A gives 9.6 A, and the socket-outlet in the control unit adds 5 A, totalling 24.6 A. Taking 30 per cent of the whole 42 A is the common slip and produces 12.6 A, well below the real demand.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 315,
    question: 'A dwelling\'s maximum demand comes to 63 A after diversity, and it includes a heat pump that runs continuously through the winter. Why should the designer question that figure?',
    options: [
      'A continuous load should not be diversified',
      'A heat pump needs its own consumer unit',
      'A heat pump is rated in kW not amperes',
      'A dwelling always has a 100 A supply',
    ],
    correctAnswer: 0,
    explanation: 'Diversity assumes loads are not all drawn together, which does not hold for a load that runs continuously, so that part of the demand should be counted in full. Assuming a 100 A supply is always available is exactly the assumption that leaves an installation over its agreed limit.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 316,
    question: 'A balanced three-phase load of 22 kW at a power factor of 0.9 is supplied at 400 V. What is the design current?',
    options: [
      '55.0 A, dividing by 400 V alone with no other factors',
      '35.3 A, using root three, volts and power factor',
      '61.1 A, omitting root three from the formula',
      '31.8 A, leaving out the power factor',
    ],
    correctAnswer: 1,
    explanation: 'Dividing 22 000 by root three times 400 times 0.9 gives 35.3 A, which is the current each line conductor carries. Leaving out the power factor gives 31.8 A, an understatement that would push the cable and device selection one size too small.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 317,
    question: 'A circuit has a design current of 27 A. Which protective device rating is considered first?',
    options: [
      '40 A, allowing headroom for future growth',
      '27 A, matching the design current exactly',
      '32 A, the next standard rating above Ib',
      '25 A, the nearest standard rating',
    ],
    correctAnswer: 2,
    explanation: 'The device rating must be at least the design current, so the next standard rating above 27 A is the starting point. Choosing 25 A because it is nearest is the classic error, since the device would then be below Ib and would trip in normal service.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 318,
    question: 'A final circuit is protected by a 30 A semi-enclosed fuse to BS 3036. What minimum current-carrying capacity must the cable have?',
    options: [
      '21.8 A, the fuse rating multiplied by 0.725',
      '43.5 A, the fuse rating multiplied by 1.45',
      '30.0 A, the fuse rating taken as it stands',
      '41.4 A, the fuse rating divided by 0.725',
    ],
    correctAnswer: 3,
    explanation: 'For a BS 3036 fuse the rating must not exceed 0.725 times the cable\'s capacity, so the cable needs at least 30 divided by 0.725, which is 41.4 A. Multiplying by 0.725 instead of dividing inverts the relationship and leaves the cable badly undersized.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 319,
    question: 'Why do the reference methods for cables above a ceiling require the cable to be in contact with the plasterboard or the joists?',
    options: [
      'The contact gives a path for heat to escape',
      'The contact lifts the cable off insulation',
      'The contact keeps the conductor earthed',
      'The contact reduces the voltage drop',
    ],
    correctAnswer: 0,
    explanation: 'Those methods assume the cable can shed heat into a thermally conductive surface on one side, which is what the tabulated ratings are based on. Contact does not hold the cable clear of insulation; the methods deal specifically with cables that are partly covered by it.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 320,
    question: 'A cable is clipped direct for most of its route but passes through 400 mm of loft insulation. What does the On-Site Guide direct the designer to apply?',
    options: [
      'A factor of 0.50 to the clipped direct rating',
      'A factor of 0.51 to the Method C rating',
      'A factor of 0.88 to the rating',
      'A factor of 1.00 to the rating',
    ],
    correctAnswer: 1,
    explanation: 'For short lengths surrounded by insulation the guide gives a factor against the clipped direct rating, and 400 mm attracts 0.51. Reaching for 0.50 is the near miss, because that blanket figure applies only where the cable is surrounded for 0.5 m or more.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 321,
    question: 'A 40 A device protects a circuit where an ambient factor of 0.87 and a grouping factor of 0.65 apply. What tabulated capacity must the cable have?',
    options: [
      '46.0 A, the device rating over the 0.87 factor',
      '22.6 A, the device rating times both factors',
      '70.7 A, the device rating over both factors',
      '61.5 A, the device rating over 0.65',
    ],
    correctAnswer: 2,
    explanation: 'The device rating is divided by the product of the factors, so 40 divided by 0.5655 gives 70.7 A of tabulated capacity. Multiplying by the factors instead of dividing gives 22.6 A and reverses the whole purpose of derating.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 322,
    question: 'Which current is divided by the combined rating factors when a cable is being sized?',
    options: [
      'The corrected capacity of the installed cable, Iz',
      'The tabulated capacity of the chosen cable, It',
      'The design current of the final circuit, Ib',
      'The rating of the protective device, In',
    ],
    correctAnswer: 3,
    explanation: 'The cable must be able to carry whatever the device will allow to flow, so it is In that is divided by the factors to find the tabulated capacity needed. Using Ib is the most common error in the whole procedure, because the device may permit considerably more current than the design load.',
    section: '6.2',
    difficulty: 'advanced',
  },
  {
    id: 323,
    question: 'A cable satisfies its current-carrying capacity at 6 mm2 but fails voltage drop over a 55 metre run. What is the correct action?',
    options: [
      'Increase the conductor size and recheck both',
      'Reduce the design current with diversity',
      'Increase the device rating instead',
      'Change the reference method used',
    ],
    correctAnswer: 0,
    explanation: 'Voltage drop falls as conductor area rises, so the cable is increased and both checks are then repeated on the new size. Raising the device rating does nothing for voltage drop and would leave the cable protected by a device it may no longer coordinate with.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 324,
    question: 'A 230 V lighting circuit is 42 metres long, carries 5 A, and the cable is rated 18 mV/A/m. Does it comply on voltage drop?',
    options: [
      'Yes, 3.78 V is below the 11.5 V limit',
      'Yes, 3.78 V is below the 6.9 V limit',
      'No, 3.78 V is above the 6.9 V limit',
      'No, 37.8 V is above the 6.9 V limit',
    ],
    correctAnswer: 1,
    explanation: 'Multiplying 18 by 5 by 42 and dividing by 1000 gives 3.78 V, comfortably inside the 3 per cent lighting limit of 6.9 V. Reaching the right verdict using the 11.5 V figure is still wrong, because that 5 per cent limit belongs to circuits other than lighting.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 325,
    question: 'A 230 V socket-outlet circuit is 31 metres long, carries 20 A, and the cable is rated 18 mV/A/m. What is the result?',
    options: [
      '22.32 V, outside the 11.5 V limit',
      '11.16 V, outside the 6.90 V limit',
      '11.16 V, inside the 11.5 V limit',
      '1.116 V, inside the limit',
    ],
    correctAnswer: 2,
    explanation: 'The drop is 18 times 20 times 31 divided by 1000, which is 11.16 V, just inside the 5 per cent limit of 11.5 V for circuits other than lighting. Doubling the figure to allow for the return conductor gives 22.32 V and is wrong, because the tabulated mV/A/m already covers both conductors.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 326,
    question: 'A protective device needs 160 A to operate within the required time on a 230 V line-to-earth supply. What is the maximum permitted Zs?',
    options: [
      '1.09 ohms, using 0.8 times the value',
      '0.70 ohms, halving the result again',
      '1.44 ohms, omitting Cmin entirely',
      '1.37 ohms, using Cmin of 0.95',
    ],
    correctAnswer: 3,
    explanation: 'The limit is the nominal line-to-earth voltage multiplied by Cmin and divided by the operating current, giving 230 times 0.95 over 160, which is 1.37 ohms. Omitting Cmin gives 1.44 ohms and overstates the permitted impedance, so a circuit could be passed that would not disconnect in time.',
    section: '6.8',
    difficulty: 'advanced',
  },
  {
    id: 327,
    question: 'Measured Zs for a circuit is 1.05 ohms against a tabulated maximum of 1.10 ohms. Why might the circuit still fail in service?',
    options: [
      'The measurement was made on cold conductors',
      'The tabulated figure allows for heating',
      'The measurement omits the neutral path',
      'The measurement includes the electrode',
    ],
    correctAnswer: 0,
    explanation: 'Conductor resistance rises as the cable warms to its operating temperature, so a cold measurement understates the real loop impedance and must be corrected before it is compared. Assuming the tabulated maximum already allows for that heating is the error, which is why a correction is applied to the measured value.',
    section: '6.8',
    difficulty: 'advanced',
  },
  {
    id: 328,
    question: 'What does the adiabatic check on a protective conductor actually confirm?',
    options: [
      'It will carry the load current without heating',
      'It will not overheat before the fault clears',
      'It will hold touch voltage below 50 volts',
      'It will keep loop impedance in limits',
    ],
    correctAnswer: 1,
    explanation: 'The check compares the energy let through by the device with what the conductor can absorb in that time without exceeding its limiting temperature. It says nothing about load current, because a protective conductor carries no appreciable current in normal service.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 329,
    question: 'The adiabatic equation gives 3.4 mm2 for a protective conductor. What size is installed?',
    options: [
      '3.4 mm2, the calculated figure exactly',
      '10 mm2, matching the main bonding size',
      '4 mm2, the next standard size up',
      '2.5 mm2, the next size down',
    ],
    correctAnswer: 2,
    explanation: 'The calculated value is a minimum, so the next standard size at or above it is selected, which is 4 mm2. Rounding down to 2.5 mm2 puts the conductor below the calculated minimum and it would exceed its limiting temperature during a fault.',
    section: '6.3',
    difficulty: 'advanced',
  },
  {
    id: 330,
    question: 'Manufacturer\'s data for a luminaire quotes an inrush current of 40 A lasting a few hundred microseconds. How does that affect the design?',
    options: [
      'It influences the main bonding conductor size',
      'It influences the earth loop impedance limit',
      'It influences the choice of cable material',
      'It influences the choice of breaker type',
    ],
    correctAnswer: 3,
    explanation: 'Repeated inrush from a bank of luminaires can operate the magnetic element of a Type B device, so a Type C may be needed and the Zs limit reassessed with it. Cable material is chosen on current, voltage drop and environment, none of which respond to a microsecond inrush pulse.',
    section: '6.7',
    difficulty: 'advanced',
  },
];

// Helper function to get random questions for mock exams
/**
 * Draws a paper honouring the difficulty tags.
 *
 * Previously this was a flat `sort(() => Math.random() - 0.5)` slice, which
 * ignored `difficulty` entirely — the tags were decorative and a paper's
 * difficulty was pure luck — and used the broken sort-shuffle idiom, which is
 * not a uniform permutation. See src/utils/apprenticeQuestionDraw.ts.
 */
export const getRandomQuestions = (
  count: number,
  weights: DifficultyWeights = LEVEL3_WEIGHTS
): Question[] => drawWeighted(module6Questions, count, weights);

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
/**
 * Section number → readable topic. Exported for the results screen, which
 * otherwise lists bare outline numbers ("6.2") as study targets.
 */
export const M6_SECTION_TOPIC: Record<string, string> = {
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
