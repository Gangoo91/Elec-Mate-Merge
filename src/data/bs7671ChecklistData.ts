export interface InspectionItem {
  id: string;
  number: string;
  item: string;
  clause: string;
  description?: string;
}

export interface InspectionSection {
  id: string;
  sectionNumber: string;
  title: string;
  description: string;
  items: InspectionItem[];
  specialNote?: string;
  isConditional?: boolean;
  conditionalNote?: string;
}

/**
 * IET Model Forms - BS 7671:2018+A2:2022 Compliant EICR Inspection Checklist
 * FOR RESIDENTIAL AND SIMILAR PREMISES WITH UP TO 100 A SUPPLY
 * 
 * This checklist aligns with the IET (Institution of Engineering and Technology) 
 * model forms for Electrical Installation Condition Reports.
 * 
 * Total: 8 Sections, 60 Inspection Items
 */
export const bs7671InspectionSections: InspectionSection[] = [
  {
    id: 'intake_equipment',
    sectionNumber: '1',
    title: 'INTAKE EQUIPMENT (VISUAL INSPECTION ONLY)',
    description: 'An outcome against an item in this section, other than access to live parts, should not be used to determine the overall outcome.',
    specialNote: 'NOTE 1: Where inadequacies in the intake equipment are encountered, which may result in a dangerous or potentially dangerous situation, the person ordering the work and/or dutyholder must be informed. It is strongly recommended that the person ordering the work informs the appropriate authority.\n\nNOTE 2: For this section only, where inadequacies are found, an "X" should be put against the appropriate item and a comment made in Section K.\n\nPerson ordering work/dutyholder notified (Delete as appropriate): Y / N/A',
    items: [
      {
        id: 'item_1_0',
        number: '1.0',
        item: 'Service cable, Service head, Earthing arrangement, Meter tails, Metering equipment, Isolator (where present)',
        clause: '132.12',
        description: '• Service cable\n• Service head\n• Earthing arrangement\n• Meter tails\n• Metering equipment\n• Isolator (where present)'
      },
      {
        id: 'item_1_1',
        number: '1.1',
        item: 'Consumer\'s isolator (where present)',
        clause: '537.2.1.1'
      },
      {
        id: 'item_1_2',
        number: '1.2',
        item: 'Consumer\'s meter tails',
        clause: '521.10.1'
      }
    ]
  },
  {
    id: 'microgenerators',
    sectionNumber: '2',
    title: 'PRESENCE OF ADEQUATE ARRANGEMENTS FOR OTHER SOURCES SUCH AS MICROGENERATORS',
    description: 'Check for adequate arrangements for other sources such as microgenerators',
    items: [
      {
        id: 'item_2_0',
        number: '2.0',
        item: 'Presence of adequate arrangements for other sources such as microgenerators',
        clause: '551.6; 551.7'
      }
    ]
  },
  {
    id: 'earthing_bonding',
    sectionNumber: '3',
    title: 'EARTHING / BONDING ARRANGEMENTS',
    description: 'Inspection of earthing and bonding arrangements in accordance with Chapter 54',
    items: [
      {
        id: 'item_3_1',
        number: '3.1',
        item: 'Presence and condition of distributor\'s earthing arrangement',
        clause: '542.1.2.1; 542.1.2.2'
      },
      {
        id: 'item_3_2',
        number: '3.2',
        item: 'Presence and condition of earth electrode connection where applicable',
        clause: '542.1.2.3'
      },
      {
        id: 'item_3_3',
        number: '3.3',
        item: 'Provision of earthing/bonding labels at all appropriate locations',
        clause: '514.13.1'
      },
      {
        id: 'item_3_4',
        number: '3.4',
        item: 'Confirmation of earthing conductor size',
        clause: '542.3; 543.1.1'
      },
      {
        id: 'item_3_5',
        number: '3.5',
        item: 'Accessibility and condition of earthing conductor at MET',
        clause: '543.3.2'
      },
      {
        id: 'item_3_6',
        number: '3.6',
        item: 'Confirmation of main protective bonding conductor sizes',
        clause: '544.1'
      },
      {
        id: 'item_3_7',
        number: '3.7',
        item: 'Condition and accessibility of main protective bonding conductor connections',
        clause: '543.3.2; 544.1.2'
      },
      {
        id: 'item_3_8',
        number: '3.8',
        item: 'Accessibility and condition of other protective bonding connections',
        clause: '543.3.1; 543.3.2'
      }
    ]
  },
  {
    id: 'consumer_units',
    sectionNumber: '4',
    title: 'CONSUMER UNIT(S) / DISTRIBUTION BOARD(S)',
    description: 'Inspection of consumer units and distribution boards',
    items: [
      {
        id: 'item_4_1',
        number: '4.1',
        item: 'Adequacy of working space/accessibility to consumer unit/distribution board',
        clause: '132.12; 513.1'
      },
      {
        id: 'item_4_2',
        number: '4.2',
        item: 'Security of fixing',
        clause: '134.1.1'
      },
      {
        id: 'item_4_3',
        number: '4.3',
        item: 'Condition of enclosure(s) in terms of IP rating etc.',
        clause: '416.2'
      },
      {
        id: 'item_4_4',
        number: '4.4',
        item: 'Condition of enclosure(s) in terms of fire rating etc.',
        clause: '421.1.201; 526.5'
      },
      {
        id: 'item_4_5',
        number: '4.5',
        item: 'Enclosure not damaged/deteriorated so as to impair safety',
        clause: '651.2'
      },
      {
        id: 'item_4_6',
        number: '4.6',
        item: 'Presence of main linked switch (as required by 462.1.201)',
        clause: '462.1.201'
      },
      {
        id: 'item_4_7',
        number: '4.7',
        item: 'Operation of main switch (functional check)',
        clause: '643.10'
      },
      {
        id: 'item_4_8',
        number: '4.8',
        item: 'Manual operation of circuit-breakers and RCDs to prove disconnection',
        clause: '643.10'
      },
      {
        id: 'item_4_9',
        number: '4.9',
        item: 'Correct identification of circuit details and protective devices',
        clause: '514.8.1; 514.9.1'
      },
      {
        id: 'item_4_10',
        number: '4.10',
        item: 'Presence of RCD six-monthly test notice, where required',
        clause: '514.12.2'
      },
      {
        id: 'item_4_11',
        number: '4.11',
        item: 'Presence of alternative supply warning notice at or near consumer unit/distribution board',
        clause: '514.15'
      },
      {
        id: 'item_4_12',
        number: '4.12',
        item: 'Presence of other required labelling (please specify)',
        clause: 'Section 514'
      },
      {
        id: 'item_4_13',
        number: '4.13',
        item: 'Compatibility of protective devices, bases and other components; correct type and rating (No signs of unacceptable thermal damage, arcing or overheating)',
        clause: '411.3.2; 411.4; 411.5; 411.6; Sections 432, 433'
      },
      {
        id: 'item_4_14',
        number: '4.14',
        item: 'Single-pole switching or protective devices in line conductor only',
        clause: '132.14.1; 530.3.3'
      },
      {
        id: 'item_4_15',
        number: '4.15',
        item: 'Protection against mechanical damage where cables enter consumer unit/distribution board',
        clause: '522.8.1; 522.8.5; 522.8.11'
      },
      {
        id: 'item_4_16',
        number: '4.16',
        item: 'Protection against electromagnetic effects where cables enter consumer unit/distribution board/enclosures',
        clause: '521.5.1'
      },
      {
        id: 'item_4_17',
        number: '4.17',
        item: 'RCD(s) provided for fault protection – includes RCBOs',
        clause: '411.4.204; 411.5.2; 531.2'
      },
      {
        id: 'item_4_18',
        number: '4.18',
        item: 'RCD(s) provided for additional protection/requirements – includes RCBOs',
        clause: '411.3.3; 415.1'
      },
      {
        id: 'item_4_19',
        number: '4.19',
        item: 'Confirmation of indication that SPD is functional',
        clause: '651.4'
      },
      {
        id: 'item_4_20',
        number: '4.20',
        item: 'Confirmation that ALL conductor connections, including connections to busbars, are correctly located in terminals and are tight and secure',
        clause: '526.1'
      },
      {
        id: 'item_4_21',
        number: '4.21',
        item: 'Adequate arrangements where a generating set operates as a switched alternative to the public supply',
        clause: '551.6'
      },
      {
        id: 'item_4_22',
        number: '4.22',
        item: 'Adequate arrangements where a generating set operates in parallel with the public supply',
        clause: '551.7'
      }
    ]
  },
  {
    id: 'final_circuits',
    sectionNumber: '5',
    title: 'FINAL CIRCUITS',
    description: 'Inspection of final circuits and associated equipment',
    items: [
      {
        id: 'item_5_1',
        number: '5.1',
        item: 'Identification of conductors',
        clause: '514.3.1'
      },
      {
        id: 'item_5_2',
        number: '5.2',
        item: 'Cables correctly supported throughout their run',
        clause: '521.10.202; 522.8.5'
      },
      {
        id: 'item_5_3',
        number: '5.3',
        item: 'Condition of insulation of live parts',
        clause: '416.1'
      },
      {
        id: 'item_5_4',
        number: '5.4',
        item: 'Non-sheathed cables protected by enclosure in conduit, ducting or trunking (To include the integrity of conduit and trunking systems (metallic and plastic))',
        clause: '521.10.1',
        description: '• To include the integrity of conduit and trunking systems (metallic and plastic)'
      },
      {
        id: 'item_5_5',
        number: '5.5',
        item: 'Adequacy of cables for current-carrying capacity with regard to the type and nature of installation',
        clause: 'Section 523'
      },
      {
        id: 'item_5_6',
        number: '5.6',
        item: 'Coordination between conductors and overload protective devices',
        clause: '433.1; 533.2.1'
      },
      {
        id: 'item_5_7',
        number: '5.7',
        item: 'Adequacy of protective devices: type and rated current for fault protection',
        clause: '411.3'
      },
      {
        id: 'item_5_8',
        number: '5.8',
        item: 'Presence and adequacy of circuit protective conductors',
        clause: '411.3.1; Section 543'
      },
      {
        id: 'item_5_9',
        number: '5.9',
        item: 'Wiring system(s) appropriate for the type and nature of the installation and external influences',
        clause: 'Section 522'
      },
      {
        id: 'item_5_10',
        number: '5.10',
        item: 'Concealed cables installed in prescribed zones (see Section D. Extent and limitations)',
        clause: '522.6.202'
      },
      {
        id: 'item_5_11',
        number: '5.11',
        item: 'Cables concealed under floors, above ceilings or in walls/partitions, adequately protected against damage (see Section D. Extent and limitations)',
        clause: '522.6.204'
      },
      {
        id: 'item_5_12',
        number: '5.12',
        item: 'Provision of additional requirements for protection by RCD not exceeding 30 mA',
        clause: '411.3.3; 522.6.202; 522.6.203; 411.3.4',
        description: '• for all socket-outlets of rating 32 A or less, unless an exception is permitted (411.3.3)\n• for the supply of mobile equipment not exceeding 32 A rating for use outdoors (411.3.3)\n• for cables concealed in walls at a depth of less than 50 mm (522.6.202; 522.6.203)\n• for cables concealed in walls/partitions containing metal parts regardless of depth (522.6.203)\n• final circuits supplying luminaires within domestic (household) premises (411.3.4)'
      },
      {
        id: 'item_5_13',
        number: '5.13',
        item: 'Provision of fire barriers, sealing arrangements and protection against thermal effects',
        clause: 'Section 527'
      },
      {
        id: 'item_5_14',
        number: '5.14',
        item: 'Band II cables segregated/separated from Band I cables',
        clause: '528.1'
      },
      {
        id: 'item_5_15',
        number: '5.15',
        item: 'Cables segregated/separated from communications cabling',
        clause: '528.2'
      },
      {
        id: 'item_5_16',
        number: '5.16',
        item: 'Cables segregated/separated from non-electrical services',
        clause: '528.3'
      },
      {
        id: 'item_5_17',
        number: '5.17',
        item: 'Termination of cables at enclosures – indicate extent of sampling in Section D of the report',
        clause: 'Section 526; 526.6; 526.8; 526.5; 522.8.5',
        description: '• Connections soundly made and under no undue strain (526.6)\n• No basic insulation of a conductor visible outside enclosure (526.8)\n• Connections of live conductors adequately enclosed (526.5)\n• Adequately connected at point of entry to enclosure (glands, bushes etc.) (522.8.5)'
      },
      {
        id: 'item_5_18',
        number: '5.18',
        item: 'Condition of accessories including socket-outlets, switches and joint boxes',
        clause: '651.2(v)'
      },
      {
        id: 'item_5_19',
        number: '5.19',
        item: 'Suitability of accessories for external influences',
        clause: '512.2'
      },
      {
        id: 'item_5_20',
        number: '5.20',
        item: 'Adequacy of working space/accessibility to equipment',
        clause: '132.12; 513.1'
      },
      {
        id: 'item_5_21',
        number: '5.21',
        item: 'Single-pole switching or protective devices in line conductors only',
        clause: '132.14.1; 530.3.3'
      }
    ]
  },
  {
    id: 'bath_shower',
    sectionNumber: '6',
    title: 'LOCATION(S) CONTAINING A BATH OR SHOWER',
    description: 'Special requirements for bathrooms and shower rooms',
    isConditional: true,
    conditionalNote: 'Items 6.0–6.8 apply only if the location contains a bath or shower.',
    items: [
      {
        id: 'item_6_0',
        number: '6.0',
        item: 'Additional protection for all low voltage (LV) circuits by RCD not exceeding 30 mA',
        clause: '701.411.3.3'
      },
      {
        id: 'item_6_1',
        number: '6.1',
        item: 'Where used as a protective measure, requirements for SELV or PELV met',
        clause: '701.414.4.5'
      },
      {
        id: 'item_6_2',
        number: '6.2',
        item: 'Shaver supply units comply with BS EN 61558-2-5 (formerly BS 3535)',
        clause: '701.512.3'
      },
      {
        id: 'item_6_3',
        number: '6.3',
        item: 'Presence of supplementary bonding conductors, unless not required by BS 7671:2018',
        clause: '701.415.2'
      },
      {
        id: 'item_6_4',
        number: '6.4',
        item: 'Low voltage (e.g. 230 V) socket-outlets sited at least 2.5 m from zone 1',
        clause: '701.512.3'
      },
      {
        id: 'item_6_5',
        number: '6.5',
        item: 'Suitability of equipment for external influences for installed location in terms of IP rating',
        clause: '701.512.2'
      },
      {
        id: 'item_6_6',
        number: '6.6',
        item: 'Suitability of accessories and controlgear etc. for a particular zone',
        clause: '701.512.3'
      },
      {
        id: 'item_6_7',
        number: '6.7',
        item: 'Suitability of current-using equipment for particular position within the location',
        clause: '701.55'
      },
      {
        id: 'item_6_8',
        number: '6.8',
        item: '(No further items – reserved for additional items if required)',
        clause: 'Reserved'
      }
    ]
  },
  {
    id: 'special_locations',
    sectionNumber: '7',
    title: 'OTHER PART 7 SPECIAL INSTALLATIONS OR LOCATIONS',
    description: 'List all other special installations or locations present, if any',
    items: [
      {
        id: 'item_7_0',
        number: '7.0',
        item: 'List all other special installations or locations present, if any. (Record separately the results of particular inspections applied.)',
        clause: 'Part 7'
      }
    ]
  },
  {
    id: 'prosumer_installations',
    sectionNumber: '8',
    title: 'PROSUMER\'S LOW VOLTAGE ELECTRICAL INSTALLATION(S)',
    description: 'Prosumer installations with additional requirements from Chapter 82',
    items: [
      {
        id: 'item_8_0',
        number: '8.0',
        item: 'Where the installation includes additional requirements and recommendations relating to Chapter 82, additional inspection items should be added to the checklist.',
        clause: 'Chapter 82'
      }
    ]
  }
];
