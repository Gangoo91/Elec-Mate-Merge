
export type InspectionOutcome = 'acceptable' | 'not_applicable' | 'unacceptable' | 'limitation' | 'c1' | 'c2' | 'c3';

export interface NumberedInspectionItem {
  id: string;
  number: string;
  item: string;
  regulation: string;
  outcome: InspectionOutcome;
  notes?: string;
}

export interface NumberedInspectionSection {
  id: string;
  number: string;
  title: string;
  description: string;
  regulation: string;
  items: NumberedInspectionItem[];
  isComplete: boolean;
}

// Official EICR Numbered Visual Inspection Data
// Based on BS 7671:2018 Schedule of Inspections - Exact from official form
export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'section-1',
    number: '1.0',
    title: 'EXTERNAL CONDITION OF INTAKE EQUIPMENT (VISUAL INSPECTION ONLY)',
    description: 'Visual inspection of external electrical supply infrastructure',
    regulation: 'BS 7671:2018',
    isComplete: false,
    items: [
      {
        id: '1.1',
        number: '1.1',
        item: 'Service cable',
        regulation: 'BS 7671:2018',
        outcome: 'acceptable'
      },
      {
        id: '1.2',
        number: '1.2',
        item: 'Service head',
        regulation: 'BS 7671:2018',
        outcome: 'acceptable'
      },
      {
        id: '1.3',
        number: '1.3',
        item: 'Earthing arrangements',
        regulation: 'BS 7671:2018',
        outcome: 'acceptable'
      },
      {
        id: '1.4',
        number: '1.4',
        item: 'Meter tails',
        regulation: 'BS 7671:2018',
        outcome: 'acceptable'
      },
      {
        id: '1.5',
        number: '1.5',
        item: 'Metering equipment',
        regulation: 'BS 7671:2018',
        outcome: 'acceptable'
      },
      {
        id: '1.6',
        number: '1.6',
        item: 'Isolator (where present)',
        regulation: 'BS 7671:2018',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-2',
    number: '2.0',
    title: 'PRESENCE OF ADEQUATE ARRANGEMENTS FOR PARALLEL OR SWITCHED ALTERNATIVE SOURCES (551.6, 551.7)',
    description: 'Assessment of alternative supply arrangements',
    regulation: 'BS 7671:2018 - 551.6, 551.7',
    isComplete: false,
    items: [
      {
        id: '2.1',
        number: '2.1',
        item: 'Adequate arrangements where a generating set operates as a switched alternative to the public supply (551.6)',
        regulation: 'BS 7671:2018 - 551.6',
        outcome: 'acceptable'
      },
      {
        id: '2.2',
        number: '2.2',
        item: 'Adequate arrangements where a generating set operates in parallel with the public supply (551.7)',
        regulation: 'BS 7671:2018 - 551.7',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-3',
    number: '3.0',
    title: 'AUTOMATIC DISCONNECTION OF SUPPLY',
    description: 'Assessment of earthing and bonding arrangements',
    regulation: 'BS 7671:2018 - 411.3, Chap 54',
    isComplete: false,
    items: [
      {
        id: '3.1',
        number: '3.1',
        item: 'Main earthing / bonding arrangements (411.3; Chap 54)',
        regulation: 'BS 7671:2018 - 411.3, Chap 54',
        outcome: 'acceptable'
      },
      {
        id: '3.2',
        number: '3.2',
        item: 'Presence of distributor\'s earthing arrangement (542.1.2.1; 542.1.2.2), or',
        regulation: 'BS 7671:2018 - 542.1.2.1, 542.1.2.2',
        outcome: 'acceptable'
      },
      {
        id: '3.3',
        number: '3.3',
        item: 'Presence of installation earth electrode arrangement (542.1.2.3)',
        regulation: 'BS 7671:2018 - 542.1.2.3',
        outcome: 'acceptable'
      },
      {
        id: '3.4',
        number: '3.4',
        item: 'Adequacy of earthing conductor size (542.3; 543.1.1)',
        regulation: 'BS 7671:2018 - 542.3, 543.1.1',
        outcome: 'acceptable'
      },
      {
        id: '3.5',
        number: '3.5',
        item: 'Adequacy of earthing conductor connections (543.3.2)',
        regulation: 'BS 7671:2018 - 543.3.2',
        outcome: 'acceptable'
      },
      {
        id: '3.6',
        number: '3.6',
        item: 'Accessibility of earthing conductor connections (543.3.2)',
        regulation: 'BS 7671:2018 - 543.3.2',
        outcome: 'acceptable'
      },
      {
        id: '3.7',
        number: '3.7',
        item: 'Adequacy of main protective bonding conductor sizes (544.1.1)',
        regulation: 'BS 7671:2018 - 544.1.1',
        outcome: 'acceptable'
      },
      {
        id: '3.8',
        number: '3.8',
        item: 'Accessibility and location of main protective bonding conductor connections (543.3.2; 544.1.2)',
        regulation: 'BS 7671:2018 - 543.3.2, 544.1.2',
        outcome: 'acceptable'
      },
      {
        id: '3.9',
        number: '3.9',
        item: 'Accessibility of all protective bonding connections (543.3.2)',
        regulation: 'BS 7671:2018 - 543.3.2',
        outcome: 'acceptable'
      },
      {
        id: '3.10',
        number: '3.10',
        item: 'Provision of earthing / bonding labels at all appropriate locations (514.13)',
        regulation: 'BS 7671:2018 - 514.13',
        outcome: 'acceptable'
      },
      {
        id: '3.11',
        number: '3.11',
        item: 'FELV requirements satisfied (411.7; 411.7.1)',
        regulation: 'BS 7671:2018 - 411.7, 411.7.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-4',
    number: '4.0',
    title: 'OTHER METHODS OF PROTECTION (Where any of the methods listed below are employed details should be provided on separate sheets)',
    description: 'Assessment of alternative protection methods',
    regulation: 'BS 7671:2018 - Section 418',
    isComplete: false,
    items: [
      {
        id: '4.1',
        number: '4.1',
        item: 'Non-conducting location (418.1)',
        regulation: 'BS 7671:2018 - 418.1',
        outcome: 'acceptable'
      },
      {
        id: '4.2',
        number: '4.2',
        item: 'Earth-free local equipotential bonding (418.2)',
        regulation: 'BS 7671:2018 - 418.2',
        outcome: 'acceptable'
      },
      {
        id: '4.3',
        number: '4.3',
        item: 'Electrical separation (Section 413; 418.3)',
        regulation: 'BS 7671:2018 - Section 413, 418.3',
        outcome: 'acceptable'
      },
      {
        id: '4.4',
        number: '4.4',
        item: 'Double insulation (Section 412)',
        regulation: 'BS 7671:2018 - Section 412',
        outcome: 'acceptable'
      },
      {
        id: '4.5',
        number: '4.5',
        item: 'Reinforced insulation (Section 412)',
        regulation: 'BS 7671:2018 - Section 412',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-5',
    number: '5.0',
    title: 'DISTRIBUTION EQUIPMENT',
    description: 'Assessment of distribution boards and protective equipment',
    regulation: 'BS 7671:2018 - Chapter 53',
    isComplete: false,
    items: [
      {
        id: '5.1',
        number: '5.1',
        item: 'Adequacy of working space / accessibility to equipment (132.12; 513.1)',
        regulation: 'BS 7671:2018 - 132.12, 513.1',
        outcome: 'acceptable'
      },
      {
        id: '5.2',
        number: '5.2',
        item: 'Security of fixing (134.1.1)',
        regulation: 'BS 7671:2018 - 134.1.1',
        outcome: 'acceptable'
      },
      {
        id: '5.3',
        number: '5.3',
        item: 'Condition of insulation of live parts (416.1)',
        regulation: 'BS 7671:2018 - 416.1',
        outcome: 'acceptable'
      },
      {
        id: '5.4',
        number: '5.4',
        item: 'Adequacy / security of barriers (416.2)',
        regulation: 'BS 7671:2018 - 416.2',
        outcome: 'acceptable'
      },
      {
        id: '5.5',
        number: '5.5',
        item: 'Condition of enclosure(s) in terms of IP rating etc (416.2)',
        regulation: 'BS 7671:2018 - 416.2',
        outcome: 'acceptable'
      },
      {
        id: '5.6',
        number: '5.6',
        item: 'Enclosure not damaged / deteriorated so as to impair safety (651.2)',
        regulation: 'BS 7671:2018 - 651.2',
        outcome: 'acceptable'
      },
      {
        id: '5.7',
        number: '5.7',
        item: 'Condition of enclosure(s) in terms of fire rating etc (421.1.6; 421.1.201; 526.5)',
        regulation: 'BS 7671:2018 - 421.1.6, 421.1.201, 526.5',
        outcome: 'acceptable'
      },
      {
        id: '5.8',
        number: '5.8',
        item: 'Presence and effectiveness of obstacles (417.2)',
        regulation: 'BS 7671:2018 - 417.2',
        outcome: 'acceptable'
      },
      {
        id: '5.9',
        number: '5.9',
        item: 'Presence of main switch(es), linked where required (462.1; 462.1.201; 462.2)',
        regulation: 'BS 7671:2018 - 462.1, 462.1.201, 462.2',
        outcome: 'acceptable'
      },
      {
        id: '5.10',
        number: '5.10',
        item: 'Operation of main switch(es) (functional check) (643.10)',
        regulation: 'BS 7671:2018 - 643.10',
        outcome: 'acceptable'
      },
      {
        id: '5.11',
        number: '5.11',
        item: 'Manual operation of circuit-breakers and RCDs to prove disconnection (643.10)',
        regulation: 'BS 7671:2018 - 643.10',
        outcome: 'acceptable'
      },
      {
        id: '5.12',
        number: '5.12',
        item: 'Confirmation that integral test button / switch causes RCD(s) to trip when operated (functional check)',
        regulation: 'BS 7671:2018 - 531.2',
        outcome: 'acceptable'
      },
      {
        id: '5.13',
        number: '5.13',
        item: 'RCD(s) provided for fault protection – includes RCBOs (411.4.204; 411.5.2; 531.2)',
        regulation: 'BS 7671:2018 - 411.4.204, 411.5.2, 531.2',
        outcome: 'acceptable'
      },
      {
        id: '5.14',
        number: '5.14',
        item: 'RCD(s) provided for additional protection / requirements, where required – includes RCBOs (411.3.3; 415.1)',
        regulation: 'BS 7671:2018 - 411.3.3, 415.1',
        outcome: 'acceptable'
      },
      {
        id: '5.15',
        number: '5.15',
        item: 'Presence of RCD quarterly test notice at or near equipment, where required (514.12.2)',
        regulation: 'BS 7671:2018 - 514.12.2',
        outcome: 'acceptable'
      },
      {
        id: '5.16',
        number: '5.16',
        item: 'Presence of diagrams, charts or schedules at or near equipment, where required (514.9.1)',
        regulation: 'BS 7671:2018 - 514.9.1',
        outcome: 'acceptable'
      },
      {
        id: '5.17',
        number: '5.17',
        item: 'Presence of non-standard (mixed) cable colour warning notice at or near equipment, where required (514.14)',
        regulation: 'BS 7671:2018 - 514.14',
        outcome: 'acceptable'
      },
      {
        id: '5.18',
        number: '5.18',
        item: 'Presence of alternative supply warning notice at or near equipment, where required (514.15)',
        regulation: 'BS 7671:2018 - 514.15',
        outcome: 'acceptable'
      },
      {
        id: '5.19',
        number: '5.19',
        item: 'Presence of next inspection recommendation label (514.12.1)',
        regulation: 'BS 7671:2018 - 514.12.1',
        outcome: 'acceptable'
      },
      {
        id: '5.20',
        number: '5.20',
        item: 'Presence of other required labelling (please specify) (Section 514)',
        regulation: 'BS 7671:2018 - Section 514',
        outcome: 'acceptable'
      },
      {
        id: '5.21',
        number: '5.21',
        item: 'Selection of equipment and protective devices, based on other components, correct type and rating (for signs of incompatibility, thermal damage, arcing or overheating) (411.3.2; 411.4..5; 6; sections 432, 433)',
        regulation: 'BS 7671:2018 - 411.3.2, 411.4.5, 411.4.6, sections 432, 433',
        outcome: 'acceptable'
      },
      {
        id: '5.22',
        number: '5.22',
        item: 'Single-pole switching or protective devices in line conductor only (132.14.1; 530.3.3)',
        regulation: 'BS 7671:2018 - 132.14.1, 530.3.3',
        outcome: 'acceptable'
      },
      {
        id: '5.23',
        number: '5.23',
        item: 'Protection against mechanical damage where cables enter equipment (522.8.1; 522.8.5; 522.8.11)',
        regulation: 'BS 7671:2018 - 522.8.1, 522.8.5, 522.8.11',
        outcome: 'acceptable'
      },
      {
        id: '5.24',
        number: '5.24',
        item: 'Protection against electromagnetic effects where cables enter ferromagnetic enclosures (521.5.1)',
        regulation: 'BS 7671:2018 - 521.5.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-6',
    number: '6.0',
    title: 'DISTRIBUTION CIRCUITS',
    description: 'Assessment of distribution circuit installations',
    regulation: 'BS 7671:2018 - Chapter 52',
    isComplete: false,
    items: [
      {
        id: '6.1',
        number: '6.1',
        item: 'Identification of conductors (514.3.1)',
        regulation: 'BS 7671:2018 - 514.3.1',
        outcome: 'acceptable'
      },
      {
        id: '6.2',
        number: '6.2',
        item: 'Cables correctly supported throughout their run (521.10.202; 522.8.5)',
        regulation: 'BS 7671:2018 - 521.10.202, 522.8.5',
        outcome: 'acceptable'
      },
      {
        id: '6.3',
        number: '6.3',
        item: 'Condition of insulation of live parts (416.1)',
        regulation: 'BS 7671:2018 - 416.1',
        outcome: 'acceptable'
      },
      {
        id: '6.4',
        number: '6.4',
        item: 'Non-sheathed cables protected by enclosure in conduit, ducting or trunking (521.10.1)',
        regulation: 'BS 7671:2018 - 521.10.1',
        outcome: 'acceptable'
      },
      {
        id: '6.5',
        number: '6.5',
        item: 'Suitability of containment systems for continued use (including flexible conduit) (Section 522)',
        regulation: 'BS 7671:2018 - Section 522',
        outcome: 'acceptable'
      },
      {
        id: '6.6',
        number: '6.6',
        item: 'Cables correctly terminated in enclosures (526)',
        regulation: 'BS 7671:2018 - 526',
        outcome: 'acceptable'
      },
      {
        id: '6.7',
        number: '6.7',
        item: 'Confirmation that all conductor connections, including connections to busbars, are correctly located in terminations and are tight and secure (526.1)',
        regulation: 'BS 7671:2018 - 526.1',
        outcome: 'acceptable'
      },
      {
        id: '6.8',
        number: '6.8',
        item: 'Examination of cables for signs of unacceptable thermal or mechanical damage / deterioration (421.1; 522.6)',
        regulation: 'BS 7671:2018 - 421.1, 522.6',
        outcome: 'acceptable'
      },
      {
        id: '6.9',
        number: '6.9',
        item: 'Adequacy of cables for current-carrying capacity with regard for the type and nature of installation',
        regulation: 'BS 7671:2018 - Section 523',
        outcome: 'acceptable'
      },
      {
        id: '6.10',
        number: '6.10',
        item: 'Adequacy of protective devices: type and rated current for fault protection (411.3)',
        regulation: 'BS 7671:2018 - 411.3',
        outcome: 'acceptable'
      },
      {
        id: '6.11',
        number: '6.11',
        item: 'Presence and adequacy of circuit protective conductors (411.3.1.1; 543.1)',
        regulation: 'BS 7671:2018 - 411.3.1.1, 543.1',
        outcome: 'acceptable'
      },
      {
        id: '6.12',
        number: '6.12',
        item: 'Coordination between conductors and overload protective devices (433.1; 533.2.1)',
        regulation: 'BS 7671:2018 - 433.1, 533.2.1',
        outcome: 'acceptable'
      },
      {
        id: '6.13',
        number: '6.13',
        item: 'Cable installation methods / practices with regard to the type and nature of installation and external influences (Section 522)',
        regulation: 'BS 7671:2018 - Section 522',
        outcome: 'acceptable'
      },
      {
        id: '6.14',
        number: '6.14',
        item: 'Where exposed to direct sunlight, cable of a suitable type (522.11.1)',
        regulation: 'BS 7671:2018 - 522.11.1',
        outcome: 'acceptable'
      },
      {
        id: '6.15',
        number: '6.15',
        item: 'Cables concealed under floors, above ceilings, in walls / partitions less than 50 mm from a surface, and protected containing metal parts 1. Installed in prescribed zones (See Extent and Limitations) (522.6.202) or 2. Incorporated in an RCD protected circuit (411.3.3) against mechanical damage by nails, screws and the like (see Extent and Limitations) (522.6.204) (522.6.203)',
        regulation: 'BS 7671:2018 - 522.6.202, 522.6.203, 522.6.204',
        outcome: 'acceptable'
      },
      {
        id: '6.16',
        number: '6.16',
        item: 'Provision of fire barriers, sealing arrangements and protection against thermal effects (Section 527)',
        regulation: 'BS 7671:2018 - Section 527',
        outcome: 'acceptable'
      },
      {
        id: '6.17',
        number: '6.17',
        item: 'Band II cables segregated / separated from Band I cables (528.1)',
        regulation: 'BS 7671:2018 - 528.1',
        outcome: 'acceptable'
      },
      {
        id: '6.18',
        number: '6.18',
        item: 'Cables segregated / separated from non-electrical services (528.3)',
        regulation: 'BS 7671:2018 - 528.3',
        outcome: 'acceptable'
      },
      {
        id: '6.19',
        number: '6.19',
        item: 'Condition of circuit accessories (651.2)',
        regulation: 'BS 7671:2018 - 651.2',
        outcome: 'acceptable'
      },
      {
        id: '6.20',
        number: '6.20',
        item: 'Suitability of circuit accessories for external influences (512.2)',
        regulation: 'BS 7671:2018 - 512.2',
        outcome: 'acceptable'
      },
      {
        id: '6.21',
        number: '6.21',
        item: 'Single-pole switching or protective devices in line conductors only (132.14.1; 530.3.3)',
        regulation: 'BS 7671:2018 - 132.14.1, 530.3.3',
        outcome: 'acceptable'
      },
      {
        id: '6.22',
        number: '6.22',
        item: 'Adequacy of connections, including cpcs, within accessories and to fixed and stationary equipment – identify / record numbers and locations of items inspected (Section 526)',
        regulation: 'BS 7671:2018 - Section 526',
        outcome: 'acceptable'
      },
      {
        id: '6.23',
        number: '6.23',
        item: 'Presence, operation and correct location of appropriate devices for isolation and switching (Chapter 46; Section 537)',
        regulation: 'BS 7671:2018 - Chapter 46, Section 537',
        outcome: 'acceptable'
      },
      {
        id: '6.24',
        number: '6.24',
        item: 'General condition of wiring systems (651.2)',
        regulation: 'BS 7671:2018 - 651.2',
        outcome: 'acceptable'
      },
      {
        id: '6.25',
        number: '6.25',
        item: 'Appropriate rating of cable insulation (522.1.1; Table 52.1)',
        regulation: 'BS 7671:2018 - 522.1.1, Table 52.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-7',
    number: '7.0',
    title: 'FINAL CIRCUITS',
    description: 'Assessment of final circuit installations',
    regulation: 'BS 7671:2018 - Chapter 52',
    isComplete: false,
    items: [
      {
        id: '7.1',
        number: '7.1',
        item: 'Identification of conductors (514.3.1)',
        regulation: 'BS 7671:2018 - 514.3.1',
        outcome: 'acceptable'
      },
      {
        id: '7.2',
        number: '7.2',
        item: 'Cables correctly supported throughout their run (521.10.202; 522.8.5)',
        regulation: 'BS 7671:2018 - 521.10.202, 522.8.5',
        outcome: 'acceptable'
      },
      {
        id: '7.3',
        number: '7.3',
        item: 'Condition of insulation of live parts (416.1)',
        regulation: 'BS 7671:2018 - 416.1',
        outcome: 'acceptable'
      },
      {
        id: '7.4',
        number: '7.4',
        item: 'Non-sheathed cables protected by enclosure in conduit, ducting or trunking (521.10.1)',
        regulation: 'BS 7671:2018 - 521.10.1',
        outcome: 'acceptable'
      },
      {
        id: '7.5',
        number: '7.5',
        item: 'Suitability of containment systems for continued use (including flexible conduit) (Section 522)',
        regulation: 'BS 7671:2018 - Section 522',
        outcome: 'acceptable'
      },
      {
        id: '7.6',
        number: '7.6',
        item: 'Adequacy of cables for current-carrying capacity with regard for the type and nature of installation (Sec. 523)',
        regulation: 'BS 7671:2018 - Section 523',
        outcome: 'acceptable'
      },
      {
        id: '7.7',
        number: '7.7',
        item: 'Adequacy of protective devices: type and rated current for fault protection (411.3)',
        regulation: 'BS 7671:2018 - 411.3',
        outcome: 'acceptable'
      },
      {
        id: '7.8',
        number: '7.8',
        item: 'Presence and adequacy of circuit protective conductors (411.3.1.1; 543.1)',
        regulation: 'BS 7671:2018 - 411.3.1.1, 543.1',
        outcome: 'acceptable'
      },
      {
        id: '7.9',
        number: '7.9',
        item: 'Coordination between conductors and overload protective devices (433.1; 533.2.1)',
        regulation: 'BS 7671:2018 - 433.1, 533.2.1',
        outcome: 'acceptable'
      },
      {
        id: '7.10',
        number: '7.10',
        item: 'Cable installation methods / practices with regard to the type and nature of the installation and external influences (Section 522)',
        regulation: 'BS 7671:2018 - Section 522',
        outcome: 'acceptable'
      },
      {
        id: '7.11',
        number: '7.11',
        item: 'Cables concealed under floors, above ceilings, in walls / partitions, adequately protected against damage',
        regulation: 'BS 7671:2018 - 522.6.202, 522.6.203, 522.6.204',
        outcome: 'acceptable'
      },
      {
        id: '7.12',
        number: '7.12',
        item: 'Cables concealed under floors, above ceilings, in walls / partitions, in prescribed zones (see Extent and limitations) (522.6.202) or incorporating earthed armour or sheath, or run within earthed wiring system, or otherwise protected against mechanical damage by nails, screws and the like (see Extent and Limitations) (522.6.201; 522.6.204)',
        regulation: 'BS 7671:2018 - 522.6.201, 522.6.202, 522.6.204',
        outcome: 'acceptable'
      },
      {
        id: '7.13',
        number: '7.13',
        item: 'Provision of additional protection by 30 mA RCD',
        regulation: 'BS 7671:2018 - 411.3.3',
        outcome: 'acceptable'
      },
      {
        id: '7.14',
        number: '7.14',
        item: '1. for the supply of mobile equipment exceeding 32 A rating for use outdoors (411.3.3)',
        regulation: 'BS 7671:2018 - 411.3.3',
        outcome: 'acceptable'
      },
      {
        id: '7.15',
        number: '7.15',
        item: '2. for the supply of mobile equipment 32 A or less, unless exempt (411.3.3)',
        regulation: 'BS 7671:2018 - 411.3.3',
        outcome: 'acceptable'
      },
      {
        id: '7.16',
        number: '7.16',
        item: '3. for cables concealed in walls at a depth of less than 50mm (522.6.202, .203)',
        regulation: 'BS 7671:2018 - 522.6.202, 522.6.203',
        outcome: 'acceptable'
      },
      {
        id: '7.17',
        number: '7.17',
        item: '4. for cables concealed in walls / partitions containing metal parts regardless of depth (522.6.203)',
        regulation: 'BS 7671:2018 - 522.6.203',
        outcome: 'acceptable'
      },
      {
        id: '7.18',
        number: '7.18',
        item: '5. for final circuit supplying luminaires within domestic, household premises (411.3.4)',
        regulation: 'BS 7671:2018 - 411.3.4',
        outcome: 'acceptable'
      },
      {
        id: '7.19',
        number: '7.19',
        item: 'Provision of fire barriers, sealing arrangements and protection against thermal effects (Section 527)',
        regulation: 'BS 7671:2018 - Section 527',
        outcome: 'acceptable'
      },
      {
        id: '7.20',
        number: '7.20',
        item: 'Band II cables segregated / separated from Band I cables (528.1)',
        regulation: 'BS 7671:2018 - 528.1',
        outcome: 'acceptable'
      },
      {
        id: '7.21',
        number: '7.21',
        item: 'Cables segregated / separated from non-electrical services (528.3)',
        regulation: 'BS 7671:2018 - 528.3',
        outcome: 'acceptable'
      },
      {
        id: '7.22',
        number: '7.22',
        item: 'Terminations at enclosures – identify / record numbers and locations of items inspected (Section 526)',
        regulation: 'BS 7671:2018 - Section 526',
        outcome: 'acceptable'
      },
      {
        id: '7.23',
        number: '7.23',
        item: '1. Connections under no undue strain (526.6)',
        regulation: 'BS 7671:2018 - 526.6',
        outcome: 'acceptable'
      },
      {
        id: '7.24',
        number: '7.24',
        item: '2. No basic insulation of a conductor visible outside enclosure (526.8)',
        regulation: 'BS 7671:2018 - 526.8',
        outcome: 'acceptable'
      },
      {
        id: '7.25',
        number: '7.25',
        item: '3. Connections of live conductors adequately enclosed (526.5)',
        regulation: 'BS 7671:2018 - 526.5',
        outcome: 'acceptable'
      },
      {
        id: '7.26',
        number: '7.26',
        item: '4. Adequately connected at point of entry to enclosure (glands, bushes etc.) (522.8.5)',
        regulation: 'BS 7671:2018 - 522.8.5',
        outcome: 'acceptable'
      },
      {
        id: '7.27',
        number: '7.27',
        item: 'Condition of accessories including socket-outlets, switches and joint boxes (651.2)',
        regulation: 'BS 7671:2018 - 651.2',
        outcome: 'acceptable'
      },
      {
        id: '7.28',
        number: '7.28',
        item: 'Suitability of accessories for external influences (512.2)',
        regulation: 'BS 7671:2018 - 512.2',
        outcome: 'acceptable'
      },
      {
        id: '7.29',
        number: '7.29',
        item: 'Single-pole switching or protective devices in line conductors only (132.14.1; 530.3.3)',
        regulation: 'BS 7671:2018 - 132.14.1, 530.3.3',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-8',
    number: '8.0',
    title: 'ISOLATION AND SWITCHING',
    description: 'Assessment of isolation and switching arrangements',
    regulation: 'BS 7671:2018 - Section 537',
    isComplete: false,
    items: [
      {
        id: '8.1',
        number: '8.1',
        item: 'Isolators (Section 462; 537)',
        regulation: 'BS 7671:2018 - Section 462, 537',
        outcome: 'acceptable'
      },
      {
        id: '8.2',
        number: '8.2',
        item: '1. Presence and condition of appropriate devices (Section 462; 537.2.7)',
        regulation: 'BS 7671:2018 - Section 462, 537.2.7',
        outcome: 'acceptable'
      },
      {
        id: '8.3',
        number: '8.3',
        item: '2. Acceptable location - state if local or remote from equipment in question (Section 462; 537.2.7)',
        regulation: 'BS 7671:2018 - Section 462, 537.2.7',
        outcome: 'acceptable'
      },
      {
        id: '8.4',
        number: '8.4',
        item: '3. Capable of being secured in the OFF position (462.3)',
        regulation: 'BS 7671:2018 - 462.3',
        outcome: 'acceptable'
      },
      {
        id: '8.5',
        number: '8.5',
        item: '4. Correct operation verified (643.10)',
        regulation: 'BS 7671:2018 - 643.10',
        outcome: 'acceptable'
      },
      {
        id: '8.6',
        number: '8.6',
        item: '5. Clearly identified by position and /or durable marking (537.2.6)',
        regulation: 'BS 7671:2018 - 537.2.6',
        outcome: 'acceptable'
      },
      {
        id: '8.7',
        number: '8.7',
        item: '6. Warning label posted in situations where live parts cannot be isolated by the operation of a single device (514.11; 537.1.2)',
        regulation: 'BS 7671:2018 - 514.11, 537.1.2',
        outcome: 'acceptable'
      },
      {
        id: '8.8',
        number: '8.8',
        item: 'Switching off for mechanical maintenance (Section 464; 537.3.2)',
        regulation: 'BS 7671:2018 - Section 464, 537.3.2',
        outcome: 'acceptable'
      },
      {
        id: '8.9',
        number: '8.9',
        item: '1. Presence and condition of appropriate devices (461.1; 537.3.2)',
        regulation: 'BS 7671:2018 - 461.1, 537.3.2',
        outcome: 'acceptable'
      },
      {
        id: '8.10',
        number: '8.10',
        item: '2. Acceptable location - state if local or remote from equipment in question (537.3.2.4)',
        regulation: 'BS 7671:2018 - 537.3.2.4',
        outcome: 'acceptable'
      },
      {
        id: '8.11',
        number: '8.11',
        item: '3. Capable of being secured in the OFF position (462.3)',
        regulation: 'BS 7671:2018 - 462.3',
        outcome: 'acceptable'
      },
      {
        id: '8.12',
        number: '8.12',
        item: '4. Correct operation verified (643.10)',
        regulation: 'BS 7671:2018 - 643.10',
        outcome: 'acceptable'
      },
      {
        id: '8.13',
        number: '8.13',
        item: '5. Clearly identified by position and /or durable marking (537.3.2.4)',
        regulation: 'BS 7671:2018 - 537.3.2.4',
        outcome: 'acceptable'
      },
      {
        id: '8.14',
        number: '8.14',
        item: 'Emergency switching / stopping (Section 465; 537.3.3)',
        regulation: 'BS 7671:2018 - Section 465, 537.3.3',
        outcome: 'acceptable'
      },
      {
        id: '8.15',
        number: '8.15',
        item: '1. Presence and condition of appropriate devices (Section 465; 537.3.5; 537.4)',
        regulation: 'BS 7671:2018 - Section 465, 537.3.5, 537.4',
        outcome: 'acceptable'
      },
      {
        id: '8.16',
        number: '8.16',
        item: '2. Readily accessible for operation where danger might occur (537.3.3.6)',
        regulation: 'BS 7671:2018 - 537.3.3.6',
        outcome: 'acceptable'
      },
      {
        id: '8.17',
        number: '8.17',
        item: '3. Correct operation verified (643.10)',
        regulation: 'BS 7671:2018 - 643.10',
        outcome: 'acceptable'
      },
      {
        id: '8.18',
        number: '8.18',
        item: '4. Clearly identified by position and /or durable marking (537.3.3.6)',
        regulation: 'BS 7671:2018 - 537.3.3.6',
        outcome: 'acceptable'
      },
      {
        id: '8.19',
        number: '8.19',
        item: 'Functional switching (Section 463; 537.3.1)',
        regulation: 'BS 7671:2018 - Section 463, 537.3.1',
        outcome: 'acceptable'
      },
      {
        id: '8.20',
        number: '8.20',
        item: '1. Presence and condition of appropriate devices (537.3.1.1; 537.1.2)',
        regulation: 'BS 7671:2018 - 537.3.1.1, 537.1.2',
        outcome: 'acceptable'
      },
      {
        id: '8.21',
        number: '8.21',
        item: '2. Correct operation verified (537.3.1.1; 537.1.2)',
        regulation: 'BS 7671:2018 - 537.3.1.1, 537.1.2',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-9',
    number: '9.0',
    title: 'CURRENT-USING EQUIPMENT (PERMANENTLY CONNECTED)',
    description: 'Assessment of permanently connected electrical equipment',
    regulation: 'BS 7671:2018 - Section 421',
    isComplete: false,
    items: [
      {
        id: '9.1',
        number: '9.1',
        item: 'Suitability of equipment in terms of IP rating etc. (416.2)',
        regulation: 'BS 7671:2018 - 416.2',
        outcome: 'acceptable'
      },
      {
        id: '9.2',
        number: '9.2',
        item: 'Equipment does not constitute a fire hazard (Section 421)',
        regulation: 'BS 7671:2018 - Section 421',
        outcome: 'acceptable'
      },
      {
        id: '9.3',
        number: '9.3',
        item: 'Enclosure not damaged/deteriorated so as to impair safety (134.1.1; 416.2; 512.2)',
        regulation: 'BS 7671:2018 - 134.1.1, 416.2, 512.2',
        outcome: 'acceptable'
      },
      {
        id: '9.4',
        number: '9.4',
        item: 'Suitability for the environment and external influences (512.2)',
        regulation: 'BS 7671:2018 - 512.2',
        outcome: 'acceptable'
      },
      {
        id: '9.5',
        number: '9.5',
        item: 'Security of fixing (134.1.1)',
        regulation: 'BS 7671:2018 - 134.1.1',
        outcome: 'acceptable'
      },
      {
        id: '9.6',
        number: '9.6',
        item: 'Cable entry holes in ceiling above luminaires, sized or sealed so as to restrict the spread of fire. List number and location of luminaires inspected (separate page) (527.2)',
        regulation: 'BS 7671:2018 - 527.2',
        outcome: 'acceptable'
      },
      {
        id: '9.7',
        number: '9.7',
        item: 'Recessed luminaires (downlighters)',
        regulation: 'BS 7671:2018 - 559.3.1',
        outcome: 'acceptable'
      },
      {
        id: '9.8',
        number: '9.8',
        item: '1. Correct type of lamps fitted (559.3.1)',
        regulation: 'BS 7671:2018 - 559.3.1',
        outcome: 'acceptable'
      },
      {
        id: '9.9',
        number: '9.9',
        item: '2. Installed to minimise build-up of heat by use of "fire rated" fittings, insulation displacement box or similar (421.1.2)',
        regulation: 'BS 7671:2018 - 421.1.2',
        outcome: 'acceptable'
      },
      {
        id: '9.10',
        number: '9.10',
        item: '3. No signs of overheating to surrounding building fabric (559.4.1)',
        regulation: 'BS 7671:2018 - 559.4.1',
        outcome: 'acceptable'
      },
      {
        id: '9.11',
        number: '9.11',
        item: '4. No signs of overheating to conductors / terminations (526.1)',
        regulation: 'BS 7671:2018 - 526.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-10',
    number: '10.0',
    title: 'SPECIAL INSTALLATIONS OR LOCATIONS',
    description: 'Assessment of special installations and locations if present',
    regulation: 'BS 7671:2018 - Part 7',
    isComplete: false,
    items: [
      {
        id: '10.1',
        number: '10.1',
        item: 'If any special installations or locations are present, list the particular inspections applied.',
        regulation: 'BS 7671:2018 - Part 7',
        outcome: 'acceptable'
      }
    ]
  }
];

// Outcome definitions for the inspection results
export const outcomeDefinitions = {
  acceptable: {
    label: 'Acceptable - No action required',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  not_applicable: {
    label: 'N/A - Not applicable',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  unacceptable: {
    label: 'Unacceptable - Requires attention',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  limitation: {
    label: 'LIM - Limitation on inspection',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  },
  c1: {
    label: 'C1 - Danger present',
    color: 'text-red-500',
    bgColor: 'bg-red-600/20',
    borderColor: 'border-red-600/30'
  },
  c2: {
    label: 'C2 - Potentially dangerous',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Improvement recommended',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  }
} as const;

// Utility functions for inspection statistics and assessment
export const getInspectionStats = (sections: NumberedInspectionSection[]) => {
  const stats = {
    total: 0,
    acceptable: 0,
    not_applicable: 0,
    unacceptable: 0,
    limitation: 0,
    c1: 0,
    c2: 0,
    c3: 0
  };

  sections.forEach(section => {
    section.items.forEach(item => {
      stats.total++;
      stats[item.outcome]++;
    });
  });

  return stats;
};

export const getOverallAssessment = (sections: NumberedInspectionSection[]): 'satisfactory' | 'unsatisfactory' => {
  const hasC1OrC2 = sections.some(section =>
    section.items.some(item => item.outcome === 'c1' || item.outcome === 'c2')
  );
  
  return hasC1OrC2 ? 'unsatisfactory' : 'satisfactory';
};
