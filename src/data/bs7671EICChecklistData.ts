/**
 * BS 7671 EIC Schedule of Inspections Data
 * Based on IET Model Forms for BS 7671:2018+A2:2022
 * For residential and similar premises with up to 100 A supply
 */

export interface EICInspectionItem {
  id: string;
  itemNumber: string;
  description: string;
  outcome: '' | 'satisfactory' | 'not-applicable';
  notes?: string;
}

export const bs7671EICInspectionItems: EICInspectionItem[] = [
  {
    id: 'eic_1_0',
    itemNumber: '1.0',
    description: "Condition of consumer's intake equipment (Visual inspection only)",
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_2_0',
    itemNumber: '2.0',
    description: 'Parallel or switched alternative sources of supply',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_3_0',
    itemNumber: '3.0',
    description: 'Presence of adequate arrangements for other sources such as microgenerators',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_4_0',
    itemNumber: '4.0',
    description: 'Presence and condition of earthing and bonding arrangements',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_5_0',
    itemNumber: '5.0',
    description: 'Compatibility of protective devices, bases and other components with the circuit protective conductors',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_6_0',
    itemNumber: '6.0',
    description: 'Provision of RCDs for fault protection and/or additional protection',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_7_0',
    itemNumber: '7.0',
    description: 'Confirmation of indication that SPD is functional',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_8_0',
    itemNumber: '8.0',
    description: 'Presence of fire barriers, sealing arrangements and protection against thermal effects',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_9_0',
    itemNumber: '9.0',
    description: 'Cables correctly supported and not subject to premature collapse in the event of a fire',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_10_0',
    itemNumber: '10.0',
    description: 'Verification of electrical separation',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_11_0',
    itemNumber: '11.0',
    description: 'Connection of single-pole devices in line conductors only',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_12_0',
    itemNumber: '12.0',
    description: 'Adequacy of accessories, switches, and isolators for the intended use',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_13_0',
    itemNumber: '13.0',
    description: 'Suitability of equipment and protective measures for external influences',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_14_0',
    itemNumber: '14.0',
    description: 'Particular protective measures for special installations and locations',
    outcome: '',
    notes: ''
  }
];
