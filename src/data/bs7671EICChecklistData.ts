/**
 * BS 7671 EIC Schedule of Inspections Data
 * Based on IET Model Forms for BS 7671:2018+A2:2022
 * Official EIC Schedule of Inspections (14 items)
 */

export interface EICInspectionItem {
  id: string;
  itemNumber: string;
  description: string;
  outcome: '' | 'satisfactory' | 'not-applicable' | 'limitation';
  notes?: string;
}

export const bs7671EICInspectionItems: EICInspectionItem[] = [
  {
    id: 'eic_1',
    itemNumber: '1',
    description: "Condition of consumer's intake equipment (Visual inspection only)",
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_2',
    itemNumber: '2',
    description: 'Parallel or switched alternative sources of supply',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_3',
    itemNumber: '3',
    description: 'Protective measure: Automatic Disconnection of Supply (ADS)',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_4',
    itemNumber: '4',
    description: 'Basic protection',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_5',
    itemNumber: '5',
    description: 'Protective measures other than ADS',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_6',
    itemNumber: '6',
    description: 'Additional protection',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_7',
    itemNumber: '7',
    description: 'Distribution equipment',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_8',
    itemNumber: '8',
    description: 'Circuits (Distribution and Final)',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_9',
    itemNumber: '9',
    description: 'Isolation and switching',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_10',
    itemNumber: '10',
    description: 'Current-using equipment (permanently connected)',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_11',
    itemNumber: '11',
    description: 'Identification and notices',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_12',
    itemNumber: '12',
    description: 'Location(s) containing a bath or shower',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_13',
    itemNumber: '13',
    description: 'Other special installations or locations',
    outcome: '',
    notes: ''
  },
  {
    id: 'eic_14',
    itemNumber: '14',
    description: "Prosumer's low voltage electrical installation(s)",
    outcome: '',
    notes: ''
  }
];
