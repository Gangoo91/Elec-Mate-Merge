import { JobTemplate } from '@/types/quote';

export const jobTemplates: JobTemplate[] = [
  {
    id: 'socket-installation',
    name: 'Socket Installation',
    description: 'Standard 13A socket outlet installation',
    category: 'Installation',
    estimatedHours: 1,
    items: [
      {
        description: 'Socket outlet installation',
        quantity: 1,
        unit: 'each',
        unitPrice: 45,
        category: 'labour'
      },
      {
        description: '13A socket outlet',
        quantity: 1,
        unit: 'each',
        unitPrice: 12,
        category: 'materials'
      },
      {
        description: '2.5mm² T&E cable',
        quantity: 10,
        unit: 'metres',
        unitPrice: 2.50,
        category: 'materials'
      }
    ]
  },
  {
    id: 'light-fitting',
    name: 'Light Fitting Installation',
    description: 'Ceiling light fitting installation',
    category: 'Installation',
    estimatedHours: 0.5,
    items: [
      {
        description: 'Light fitting installation',
        quantity: 1,
        unit: 'each',
        unitPrice: 35,
        category: 'labour'
      },
      {
        description: 'Ceiling rose',
        quantity: 1,
        unit: 'each',
        unitPrice: 8,
        category: 'materials'
      },
      {
        description: '1.5mm² T&E cable',
        quantity: 5,
        unit: 'metres',
        unitPrice: 1.80,
        category: 'materials'
      }
    ]
  },
  {
    id: 'consumer-unit-replacement',
    name: 'Consumer Unit Replacement',
    description: 'Full consumer unit replacement with RCBO protection',
    category: 'Upgrade',
    estimatedHours: 6,
    items: [
      {
        description: 'Consumer unit replacement',
        quantity: 6,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: '12-way consumer unit',
        quantity: 1,
        unit: 'each',
        unitPrice: 180,
        category: 'materials'
      },
      {
        description: 'RCBO 32A Type B',
        quantity: 6,
        unit: 'each',
        unitPrice: 45,
        category: 'materials'
      },
      {
        description: 'RCBO 16A Type B',
        quantity: 4,
        unit: 'each',
        unitPrice: 42,
        category: 'materials'
      },
      {
        description: 'Electrical testing',
        quantity: 1,
        unit: 'each',
        unitPrice: 120,
        category: 'labour'
      }
    ]
  },
  {
    id: 'ev-charger-installation',
    name: 'EV Charger Installation',
    description: '7kW home EV charging point installation',
    category: 'Installation',
    estimatedHours: 4,
    items: [
      {
        description: 'EV charger installation',
        quantity: 4,
        unit: 'hours',
        unitPrice: 55,
        category: 'labour'
      },
      {
        description: '7kW EV charging unit',
        quantity: 1,
        unit: 'each',
        unitPrice: 450,
        category: 'equipment'
      },
      {
        description: '6mm² SWA cable',
        quantity: 20,
        unit: 'metres',
        unitPrice: 8.50,
        category: 'materials'
      },
      {
        description: '32A Type B RCBO',
        quantity: 1,
        unit: 'each',
        unitPrice: 45,
        category: 'materials'
      }
    ]
  },
  {
    id: 'eicr-inspection',
    name: 'EICR Inspection',
    description: 'Electrical Installation Condition Report',
    category: 'Testing',
    estimatedHours: 3,
    items: [
      {
        description: 'EICR inspection and testing',
        quantity: 3,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'EICR certificate',
        quantity: 1,
        unit: 'each',
        unitPrice: 25,
        category: 'materials'
      }
    ]
  }
];