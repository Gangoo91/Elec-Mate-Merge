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
  },
  {
    id: 'outdoor-socket-installation',
    name: 'Outdoor Socket Installation',
    description: 'Weatherproof IP65 socket with RCD protection',
    category: 'Installation',
    estimatedHours: 2,
    items: [
      {
        description: 'Outdoor socket installation',
        quantity: 2,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'IP65 weatherproof socket',
        quantity: 1,
        unit: 'each',
        unitPrice: 28,
        category: 'materials'
      },
      {
        description: '2.5mm² SWA cable',
        quantity: 15,
        unit: 'metres',
        unitPrice: 4.20,
        category: 'materials'
      },
      {
        description: '30mA RCD protection',
        quantity: 1,
        unit: 'each',
        unitPrice: 35,
        category: 'materials'
      }
    ]
  },
  {
    id: 'bathroom-fan-installation',
    name: 'Bathroom Fan Installation',
    description: 'Extractor fan with isolator switch and timer',
    category: 'Installation',
    estimatedHours: 1.5,
    items: [
      {
        description: 'Bathroom fan installation',
        quantity: 1.5,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'Bathroom extractor fan',
        quantity: 1,
        unit: 'each',
        unitPrice: 85,
        category: 'equipment'
      },
      {
        description: 'Fan isolator switch',
        quantity: 1,
        unit: 'each',
        unitPrice: 15,
        category: 'materials'
      },
      {
        description: '1.5mm² T&E cable',
        quantity: 8,
        unit: 'metres',
        unitPrice: 1.80,
        category: 'materials'
      }
    ]
  },
  {
    id: 'garden-lighting-installation',
    name: 'Garden Lighting Installation',
    description: 'Low voltage LED garden lighting system',
    category: 'Installation',
    estimatedHours: 3,
    items: [
      {
        description: 'Garden lighting installation',
        quantity: 3,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'LED garden light fittings',
        quantity: 6,
        unit: 'each',
        unitPrice: 45,
        category: 'equipment'
      },
      {
        description: '12V transformer',
        quantity: 1,
        unit: 'each',
        unitPrice: 65,
        category: 'equipment'
      },
      {
        description: 'Low voltage cable',
        quantity: 30,
        unit: 'metres',
        unitPrice: 2.10,
        category: 'materials'
      }
    ]
  },
  {
    id: 'smoke-alarm-installation',
    name: 'Smoke Alarm Installation',
    description: 'Mains-powered smoke alarms with battery backup',
    category: 'Installation',
    estimatedHours: 2,
    items: [
      {
        description: 'Smoke alarm installation',
        quantity: 2,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'Mains smoke alarm',
        quantity: 3,
        unit: 'each',
        unitPrice: 25,
        category: 'equipment'
      },
      {
        description: '1.5mm² fire-rated cable',
        quantity: 20,
        unit: 'metres',
        unitPrice: 2.20,
        category: 'materials'
      },
      {
        description: 'Junction boxes',
        quantity: 3,
        unit: 'each',
        unitPrice: 3.50,
        category: 'materials'
      }
    ]
  },
  {
    id: 'electric-cooker-installation',
    name: 'Electric Cooker Installation',
    description: '45A cooker circuit with control unit',
    category: 'Installation',
    estimatedHours: 2.5,
    items: [
      {
        description: 'Electric cooker installation',
        quantity: 2.5,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: '45A cooker control unit',
        quantity: 1,
        unit: 'each',
        unitPrice: 32,
        category: 'materials'
      },
      {
        description: '6mm² T&E cable',
        quantity: 12,
        unit: 'metres',
        unitPrice: 6.80,
        category: 'materials'
      },
      {
        description: '45A RCBO Type B',
        quantity: 1,
        unit: 'each',
        unitPrice: 48,
        category: 'materials'
      }
    ]
  },
  {
    id: 'partial-rewire-single-room',
    name: 'Single Room Partial Rewire',
    description: 'Complete rewire for one room including sockets and lighting',
    category: 'Rewire',
    estimatedHours: 8,
    items: [
      {
        description: 'Single room rewire labour',
        quantity: 8,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: '13A DP socket outlets',
        quantity: 4,
        unit: 'each',
        unitPrice: 12,
        category: 'materials'
      },
      {
        description: 'LED ceiling light',
        quantity: 2,
        unit: 'each',
        unitPrice: 18,
        category: 'materials'
      },
      {
        description: '2-gang light switch',
        quantity: 1,
        unit: 'each',
        unitPrice: 12,
        category: 'materials'
      },
      {
        description: '2.5mm² T&E cable',
        quantity: 25,
        unit: 'metres',
        unitPrice: 2.50,
        category: 'materials'
      },
      {
        description: '1.5mm² T&E cable',
        quantity: 15,
        unit: 'metres',
        unitPrice: 1.80,
        category: 'materials'
      },
      {
        description: '35mm back boxes',
        quantity: 6,
        unit: 'each',
        unitPrice: 1.20,
        category: 'materials'
      }
    ]
  }
];