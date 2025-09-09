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
    id: '3-bed-house-rewire-kit',
    name: '3-Bedroom House Rewire (Starter Kit)',
    description: 'Complete material kit for 3-bedroom house rewire including sockets, lights, switches, cables and consumer unit',
    category: 'Rewire',
    estimatedHours: 40,
    items: [
      // Labour
      {
        description: 'House rewire labour',
        quantity: 40,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      // Sockets - Bedrooms (2 per room)
      {
        description: '13A DP socket outlets - Bedrooms',
        quantity: 6,
        unit: 'each',
        unitPrice: 12,
        category: 'materials'
      },
      // Sockets - Living room
      {
        description: '13A DP socket outlets - Living room',
        quantity: 3,
        unit: 'each',
        unitPrice: 12,
        category: 'materials'
      },
      // Sockets - Kitchen
      {
        description: '13A DP socket outlets - Kitchen',
        quantity: 4,
        unit: 'each',
        unitPrice: 12,
        category: 'materials'
      },
      // Cooker outlet
      {
        description: '45A DP cooker outlet',
        quantity: 1,
        unit: 'each',
        unitPrice: 25,
        category: 'materials'
      },
      // Consumer unit
      {
        description: '10-way consumer unit with RCBOs',
        quantity: 1,
        unit: 'each',
        unitPrice: 180,
        category: 'materials'
      },
      // RCBOs
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
      // Lights
      {
        description: 'LED ceiling lights',
        quantity: 10,
        unit: 'each',
        unitPrice: 18,
        category: 'materials'
      },
      // Light switches
      {
        description: '1-gang light switches',
        quantity: 8,
        unit: 'each',
        unitPrice: 8,
        category: 'materials'
      },
      {
        description: '2-gang light switches',
        quantity: 2,
        unit: 'each',
        unitPrice: 12,
        category: 'materials'
      },
      // Cables
      {
        description: '1.5mm² T&E cable',
        quantity: 100,
        unit: 'metres',
        unitPrice: 1.80,
        category: 'materials'
      },
      {
        description: '2.5mm² T&E cable',
        quantity: 100,
        unit: 'metres',
        unitPrice: 2.50,
        category: 'materials'
      },
      {
        description: '10mm² T&E cable - Shower',
        quantity: 50,
        unit: 'metres',
        unitPrice: 8.50,
        category: 'materials'
      },
      // Back boxes
      {
        description: '35mm back boxes',
        quantity: 15,
        unit: 'each',
        unitPrice: 1.20,
        category: 'materials'
      },
      {
        description: '47mm back boxes - deeper',
        quantity: 8,
        unit: 'each',
        unitPrice: 1.80,
        category: 'materials'
      },
      // Meter tails
      {
        description: '25mm² meter tails',
        quantity: 3,
        unit: 'metres',
        unitPrice: 15.00,
        category: 'materials'
      },
      // Fixings
      {
        description: 'Wall plugs and screws',
        quantity: 1,
        unit: 'pack',
        unitPrice: 25,
        category: 'materials'
      },
      // Cable cleats
      {
        description: 'Cable cleats and clips',
        quantity: 50,
        unit: 'each',
        unitPrice: 0.75,
        category: 'materials'
      },
      // Shower
      {
        description: '9.5kW electric shower unit',
        quantity: 1,
        unit: 'each',
        unitPrice: 180,
        category: 'equipment'
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