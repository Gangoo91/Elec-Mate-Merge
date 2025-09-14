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
  },
  // Additional Domestic Installation Templates
  {
    id: 'downlight-installation',
    name: 'Downlight Installation (6 spots)',
    description: 'Complete 6-spot LED downlight installation with dimmer switch',
    category: 'Domestic',
    estimatedHours: 3,
    items: [
      {
        description: 'Downlight installation labour',
        quantity: 3,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'LED downlight fittings',
        quantity: 6,
        unit: 'each',
        unitPrice: 22,
        category: 'equipment'
      },
      {
        description: 'LED dimmer switch',
        quantity: 1,
        unit: 'each',
        unitPrice: 35,
        category: 'materials'
      },
      {
        description: '1.5mm² T&E cable',
        quantity: 20,
        unit: 'metres',
        unitPrice: 1.80,
        category: 'materials'
      }
    ]
  },
  {
    id: 'security-light-installation',
    name: 'Security Light Installation',
    description: 'PIR motion sensor security light with override switch',
    category: 'Domestic',
    estimatedHours: 2,
    items: [
      {
        description: 'Security light installation',
        quantity: 2,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'PIR security light',
        quantity: 1,
        unit: 'each',
        unitPrice: 45,
        category: 'equipment'
      },
      {
        description: 'Override switch',
        quantity: 1,
        unit: 'each',
        unitPrice: 12,
        category: 'materials'
      },
      {
        description: '1.5mm² T&E cable',
        quantity: 15,
        unit: 'metres',
        unitPrice: 1.80,
        category: 'materials'
      }
    ]
  },
  {
    id: 'doorbell-transformer',
    name: 'Doorbell Transformer Installation',
    description: 'Doorbell transformer with chime unit installation',
    category: 'Domestic',
    estimatedHours: 1,
    items: [
      {
        description: 'Doorbell installation',
        quantity: 1,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'Doorbell transformer',
        quantity: 1,
        unit: 'each',
        unitPrice: 25,
        category: 'equipment'
      },
      {
        description: 'Chime unit',
        quantity: 1,
        unit: 'each',
        unitPrice: 18,
        category: 'equipment'
      },
      {
        description: 'Bell wire',
        quantity: 10,
        unit: 'metres',
        unitPrice: 0.80,
        category: 'materials'
      }
    ]
  },
  {
    id: 'underfloor-heating',
    name: 'Underfloor Heating Installation',
    description: 'Electric underfloor heating mat with thermostat',
    category: 'Domestic',
    estimatedHours: 4,
    items: [
      {
        description: 'Underfloor heating installation',
        quantity: 4,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'Heating mat (10m²)',
        quantity: 1,
        unit: 'each',
        unitPrice: 280,
        category: 'equipment'
      },
      {
        description: 'Digital thermostat',
        quantity: 1,
        unit: 'each',
        unitPrice: 85,
        category: 'equipment'
      },
      {
        description: '2.5mm² T&E cable',
        quantity: 8,
        unit: 'metres',
        unitPrice: 2.50,
        category: 'materials'
      }
    ]
  },
  {
    id: 'immersion-heater',
    name: 'Immersion Heater Installation',
    description: '3kW immersion heater with dual element control',
    category: 'Domestic',
    estimatedHours: 2.5,
    items: [
      {
        description: 'Immersion heater installation',
        quantity: 2.5,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: '3kW immersion heater element',
        quantity: 1,
        unit: 'each',
        unitPrice: 65,
        category: 'equipment'
      },
      {
        description: 'Dual element switch',
        quantity: 1,
        unit: 'each',
        unitPrice: 28,
        category: 'materials'
      },
      {
        description: '2.5mm² heat-resistant cable',
        quantity: 12,
        unit: 'metres',
        unitPrice: 3.20,
        category: 'materials'
      }
    ]
  },
  {
    id: 'kitchen-under-cabinet-lighting',
    name: 'Kitchen Under Cabinet Lighting',
    description: 'LED strip lighting under kitchen cabinets with dimmer',
    category: 'Domestic',
    estimatedHours: 3,
    items: [
      {
        description: 'Under cabinet lighting installation',
        quantity: 3,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'LED strip lights (3m)',
        quantity: 1,
        unit: 'set',
        unitPrice: 95,
        category: 'equipment'
      },
      {
        description: '12V LED driver',
        quantity: 1,
        unit: 'each',
        unitPrice: 35,
        category: 'equipment'
      },
      {
        description: 'Dimmer switch',
        quantity: 1,
        unit: 'each',
        unitPrice: 25,
        category: 'materials'
      }
    ]
  },
  // Commercial/Industrial Templates
  {
    id: 'emergency-lighting',
    name: 'Emergency Lighting Installation',
    description: 'Emergency lighting system for small office (6 fittings)',
    category: 'Commercial',
    estimatedHours: 4,
    items: [
      {
        description: 'Emergency lighting installation',
        quantity: 4,
        unit: 'hours',
        unitPrice: 55,
        category: 'labour'
      },
      {
        description: 'Emergency light fittings',
        quantity: 6,
        unit: 'each',
        unitPrice: 45,
        category: 'equipment'
      },
      {
        description: 'Test key switch',
        quantity: 1,
        unit: 'each',
        unitPrice: 15,
        category: 'materials'
      },
      {
        description: '1.5mm² fire-rated cable',
        quantity: 50,
        unit: 'metres',
        unitPrice: 2.20,
        category: 'materials'
      }
    ]
  },
  {
    id: 'fire-alarm-small-office',
    name: 'Fire Alarm System (Small Office)',
    description: 'Basic fire alarm system with 4 smoke detectors and panel',
    category: 'Commercial',
    estimatedHours: 6,
    items: [
      {
        description: 'Fire alarm system installation',
        quantity: 6,
        unit: 'hours',
        unitPrice: 55,
        category: 'labour'
      },
      {
        description: 'Fire alarm control panel',
        quantity: 1,
        unit: 'each',
        unitPrice: 280,
        category: 'equipment'
      },
      {
        description: 'Smoke detectors',
        quantity: 4,
        unit: 'each',
        unitPrice: 35,
        category: 'equipment'
      },
      {
        description: 'Fire alarm cable',
        quantity: 100,
        unit: 'metres',
        unitPrice: 1.95,
        category: 'materials'
      }
    ]
  },
  {
    id: 'data-cabinet-installation',
    name: 'Data Cabinet Installation',
    description: '19" data cabinet with power distribution and cooling',
    category: 'Commercial',
    estimatedHours: 3,
    items: [
      {
        description: 'Data cabinet installation',
        quantity: 3,
        unit: 'hours',
        unitPrice: 55,
        category: 'labour'
      },
      {
        description: '19" wall-mounted cabinet',
        quantity: 1,
        unit: 'each',
        unitPrice: 220,
        category: 'equipment'
      },
      {
        description: 'PDU power strip',
        quantity: 1,
        unit: 'each',
        unitPrice: 85,
        category: 'equipment'
      },
      {
        description: 'Cabinet cooling fan',
        quantity: 1,
        unit: 'each',
        unitPrice: 45,
        category: 'equipment'
      }
    ]
  },
  {
    id: 'three-phase-supply',
    name: 'Three Phase Supply Installation',
    description: '32A 3-phase supply with isolator and distribution',
    category: 'Commercial',
    estimatedHours: 5,
    items: [
      {
        description: '3-phase installation labour',
        quantity: 5,
        unit: 'hours',
        unitPrice: 60,
        category: 'labour'
      },
      {
        description: '3-phase isolator switch',
        quantity: 1,
        unit: 'each',
        unitPrice: 120,
        category: 'materials'
      },
      {
        description: '4mm² 4-core SWA cable',
        quantity: 25,
        unit: 'metres',
        unitPrice: 12.50,
        category: 'materials'
      },
      {
        description: '3-phase distribution board',
        quantity: 1,
        unit: 'each',
        unitPrice: 180,
        category: 'materials'
      }
    ]
  },
  {
    id: 'industrial-socket-32a',
    name: 'Industrial Socket Installation (32A)',
    description: '32A 3-phase industrial socket with weatherproof enclosure',
    category: 'Commercial',
    estimatedHours: 3,
    items: [
      {
        description: 'Industrial socket installation',
        quantity: 3,
        unit: 'hours',
        unitPrice: 60,
        category: 'labour'
      },
      {
        description: '32A 3-phase socket',
        quantity: 1,
        unit: 'each',
        unitPrice: 85,
        category: 'materials'
      },
      {
        description: 'IP65 enclosure',
        quantity: 1,
        unit: 'each',
        unitPrice: 45,
        category: 'materials'
      },
      {
        description: '6mm² 4-core SWA cable',
        quantity: 15,
        unit: 'metres',
        unitPrice: 15.80,
        category: 'materials'
      }
    ]
  },
  {
    id: 'workshop-lighting-upgrade',
    name: 'Workshop Lighting Upgrade',
    description: 'LED high-bay lighting for workshop (8 fittings)',
    category: 'Commercial',
    estimatedHours: 6,
    items: [
      {
        description: 'Workshop lighting installation',
        quantity: 6,
        unit: 'hours',
        unitPrice: 55,
        category: 'labour'
      },
      {
        description: 'LED high-bay fittings',
        quantity: 8,
        unit: 'each',
        unitPrice: 120,
        category: 'equipment'
      },
      {
        description: 'Contactor control system',
        quantity: 1,
        unit: 'each',
        unitPrice: 95,
        category: 'materials'
      },
      {
        description: '2.5mm² T&E cable',
        quantity: 80,
        unit: 'metres',
        unitPrice: 2.50,
        category: 'materials'
      }
    ]
  },
  // Solar/Renewable Templates
  {
    id: 'solar-panel-basic',
    name: 'Solar Panel Installation (Basic)',
    description: '4kW domestic solar panel system with inverter',
    category: 'Solar/Renewable',
    estimatedHours: 8,
    items: [
      {
        description: 'Solar panel installation',
        quantity: 8,
        unit: 'hours',
        unitPrice: 65,
        category: 'labour'
      },
      {
        description: '4kW solar panel array',
        quantity: 1,
        unit: 'system',
        unitPrice: 2800,
        category: 'equipment'
      },
      {
        description: '4kW string inverter',
        quantity: 1,
        unit: 'each',
        unitPrice: 850,
        category: 'equipment'
      },
      {
        description: 'DC isolator switch',
        quantity: 1,
        unit: 'each',
        unitPrice: 45,
        category: 'materials'
      },
      {
        description: 'Generation meter',
        quantity: 1,
        unit: 'each',
        unitPrice: 180,
        category: 'equipment'
      }
    ]
  },
  {
    id: 'battery-storage-system',
    name: 'Battery Storage System',
    description: '10kWh home battery storage with hybrid inverter',
    category: 'Solar/Renewable',
    estimatedHours: 6,
    items: [
      {
        description: 'Battery system installation',
        quantity: 6,
        unit: 'hours',
        unitPrice: 65,
        category: 'labour'
      },
      {
        description: '10kWh lithium battery',
        quantity: 1,
        unit: 'each',
        unitPrice: 4500,
        category: 'equipment'
      },
      {
        description: 'Hybrid inverter',
        quantity: 1,
        unit: 'each',
        unitPrice: 1200,
        category: 'equipment'
      },
      {
        description: 'Battery management system',
        quantity: 1,
        unit: 'each',
        unitPrice: 320,
        category: 'equipment'
      }
    ]
  },
  {
    id: 'heat-pump-electrical',
    name: 'Heat Pump Electrical Connection',
    description: 'Electrical supply for air source heat pump installation',
    category: 'Solar/Renewable',
    estimatedHours: 4,
    items: [
      {
        description: 'Heat pump electrical work',
        quantity: 4,
        unit: 'hours',
        unitPrice: 60,
        category: 'labour'
      },
      {
        description: '32A dedicated supply',
        quantity: 1,
        unit: 'each',
        unitPrice: 85,
        category: 'materials'
      },
      {
        description: '6mm² SWA cable',
        quantity: 30,
        unit: 'metres',
        unitPrice: 8.50,
        category: 'materials'
      },
      {
        description: 'External isolator',
        quantity: 1,
        unit: 'each',
        unitPrice: 65,
        category: 'materials'
      }
    ]
  },
  {
    id: 'car-lift-power-supply',
    name: 'Car Lift Power Supply',
    description: '3-phase power supply for hydraulic car lift',
    category: 'Specialist',
    estimatedHours: 5,
    items: [
      {
        description: 'Car lift electrical installation',
        quantity: 5,
        unit: 'hours',
        unitPrice: 65,
        category: 'labour'
      },
      {
        description: '3-phase distribution board',
        quantity: 1,
        unit: 'each',
        unitPrice: 220,
        category: 'materials'
      },
      {
        description: '10mm² 4-core SWA cable',
        quantity: 20,
        unit: 'metres',
        unitPrice: 18.50,
        category: 'materials'
      },
      {
        description: 'Emergency stop system',
        quantity: 1,
        unit: 'each',
        unitPrice: 95,
        category: 'equipment'
      }
    ]
  },
  {
    id: 'pool-spa-electrical',
    name: 'Pool/Spa Electrical Installation',
    description: 'Complete electrical installation for swimming pool equipment',
    category: 'Specialist',
    estimatedHours: 6,
    items: [
      {
        description: 'Pool electrical installation',
        quantity: 6,
        unit: 'hours',
        unitPrice: 65,
        category: 'labour'
      },
      {
        description: 'Pool pump (1.5HP)',
        quantity: 1,
        unit: 'each',
        unitPrice: 450,
        category: 'equipment'
      },
      {
        description: 'Pool lighting transformer',
        quantity: 1,
        unit: 'each',
        unitPrice: 85,
        category: 'equipment'
      },
      {
        description: '2.5mm² SWA cable',
        quantity: 40,
        unit: 'metres',
        unitPrice: 4.20,
        category: 'materials'
      },
      {
        description: 'RCD protection',
        quantity: 1,
        unit: 'each',
        unitPrice: 35,
        category: 'materials'
      }
    ]
  },
  // Testing & Certification Templates
  {
    id: 'pat-testing-per-item',
    name: 'PAT Testing (Per Item)',
    description: 'Portable appliance testing certification',
    category: 'Testing/Certification',
    estimatedHours: 0.1,
    items: [
      {
        description: 'PAT testing per appliance',
        quantity: 0.1,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'PAT test certificate',
        quantity: 1,
        unit: 'each',
        unitPrice: 2,
        category: 'materials'
      },
      {
        description: 'Test label',
        quantity: 1,
        unit: 'each',
        unitPrice: 0.20,
        category: 'materials'
      }
    ]
  },
  {
    id: 'new-installation-certificate',
    name: 'New Installation Certificate',
    description: 'Electrical Installation Certificate for new work',
    category: 'Testing/Certification',
    estimatedHours: 2,
    items: [
      {
        description: 'Installation testing and certification',
        quantity: 2,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'EIC certificate',
        quantity: 1,
        unit: 'each',
        unitPrice: 25,
        category: 'materials'
      },
      {
        description: 'Schedule of test results',
        quantity: 1,
        unit: 'each',
        unitPrice: 10,
        category: 'materials'
      }
    ]
  },
  {
    id: 'periodic-inspection-testing',
    name: 'Periodic Inspection & Testing',
    description: 'Comprehensive electrical installation inspection',
    category: 'Testing/Certification',
    estimatedHours: 4,
    items: [
      {
        description: 'Periodic inspection and testing',
        quantity: 4,
        unit: 'hours',
        unitPrice: 50,
        category: 'labour'
      },
      {
        description: 'EICR certificate',
        quantity: 1,
        unit: 'each',
        unitPrice: 35,
        category: 'materials'
      },
      {
        description: 'Schedule of inspections',
        quantity: 1,
        unit: 'each',
        unitPrice: 15,
        category: 'materials'
      }
    ]
  },
  {
    id: 'fault-finding-diagnostics',
    name: 'Fault Finding & Diagnostics',
    description: 'Electrical fault investigation and repair diagnosis',
    category: 'Testing/Certification',
    estimatedHours: 2,
    items: [
      {
        description: 'Fault finding and diagnostics',
        quantity: 2,
        unit: 'hours',
        unitPrice: 55,
        category: 'labour'
      },
      {
        description: 'Test equipment usage',
        quantity: 1,
        unit: 'each',
        unitPrice: 25,
        category: 'materials'
      },
      {
        description: 'Fault report',
        quantity: 1,
        unit: 'each',
        unitPrice: 15,
        category: 'materials'
      }
    ]
  }
];