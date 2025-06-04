
import { TestFlow } from '@/types/inspection-testing';

export const expandedTestFlows: TestFlow[] = [
  {
    id: 'domestic-installation-testing',
    name: 'Domestic Installation Testing - Complete BS 7671 Procedure',
    type: 'all-tests',
    description: 'Comprehensive testing procedure specifically designed for domestic electrical installations',
    difficulty: 'intermediate',
    prerequisites: [
      'Basic electrical knowledge and safety awareness',
      'Calibrated multifunction test equipment',
      'Understanding of domestic wiring systems',
      'Knowledge of consumer unit layouts'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 - Requirements for Electrical Installations',
      'Part P Building Regulations - Electrical Safety in Dwellings',
      'IET Guidance Note 3 - Inspection & Testing'
    ],
    steps: [
      {
        id: 'domestic-visual-inspection',
        title: 'Domestic Installation Visual Inspection',
        description: 'Systematic visual inspection of domestic electrical installation',
        instructions: [
          'Inspect consumer unit condition, labeling, and compliance',
          'Check cable types and installation methods throughout property',
          'Verify adequate IP protection in bathrooms and kitchens',
          'Examine socket outlet heights and locations',
          'Check RCD protection for socket outlets and bathrooms',
          'Inspect external installations (sheds, garages, outdoor sockets)',
          'Verify adequate earthing and bonding arrangements',
          'Check for any DIY work that may not comply with regulations'
        ],
        expectedResult: 'Domestic installation visually complies with current standards',
        safetyNotes: [
          'Pay special attention to bathroom electrical installations',
          'Check for non-compliant cable types like rubber or fabric',
          'Verify RCD protection where required by current standards'
        ],
        tools: ['Torch', 'Measuring tape', 'BS 7671', 'Part P guidance'],
        isRequired: true,
        estimatedTime: 30
      },
      {
        id: 'domestic-safe-isolation',
        title: 'Domestic Supply Safe Isolation',
        description: 'Safe isolation procedure for typical domestic installation',
        instructions: [
          'Locate main switch at consumer unit or meter position',
          'Identify supply type (usually TN-C-S in UK domestic)',
          'Switch OFF main switch and apply lock-off device',
          'Test voltage indicator on known live source',
          'Test for voltage between Line and Neutral at consumer unit',
          'Test for voltage between Line and Earth at consumer unit',
          'Test for voltage between Neutral and Earth at consumer unit',
          'Re-prove voltage indicator on known live source',
          'Apply warning labels and ensure household informed'
        ],
        expectedResult: 'Domestic supply safely isolated and confirmed dead',
        safetyNotes: [
          'Inform occupants before isolating supply',
          'Check for alternative supplies (solar PV, generator)',
          'Consider effect on security systems and medical equipment'
        ],
        tools: ['GS 38 voltage indicator', 'Proving unit', 'Lock-off device', 'Warning labels'],
        isRequired: true,
        estimatedTime: 15
      },
      {
        id: 'domestic-earthing-bonding',
        title: 'Domestic Earthing and Bonding Verification',
        description: 'Comprehensive testing of domestic earthing and bonding arrangements',
        instructions: [
          'Test continuity of main earthing conductor to consumer unit',
          'Test main bonding to gas meter and installation pipework',
          'Test main bonding to water service pipe and internal pipework',
          'Check for oil service bonding if applicable',
          'Test supplementary bonding in bathrooms (if required)',
          'Verify bonding conductor sizes meet current requirements',
          'Test earth electrode if TT system present',
          'Check structural steelwork bonding in relevant properties'
        ],
        expectedResult: 'All domestic earthing and bonding arrangements verified compliant',
        safetyNotes: [
          'Gas and water companies have specific requirements',
          'Supplementary bonding may be omitted if conditions met',
          'Poor bonding creates serious safety hazards'
        ],
        tools: ['Low resistance ohmmeter', 'Bonding conductor charts', 'BS 7671'],
        isRequired: true,
        estimatedTime: 25
      },
      {
        id: 'domestic-circuit-testing',
        title: 'Domestic Circuit Testing and Verification',
        description: 'Complete testing of all domestic circuits including rings, radials, and lighting',
        instructions: [
          'Test all socket ring circuits using R1+R2 method',
          'Test radial circuits for kitchen appliances and immersion heater',
          'Test all lighting circuits including two-way switching',
          'Test shower circuit isolation and RCD protection',
          'Test cooker circuit and control unit operation',
          'Verify smoke alarm circuit compliance',
          'Test any electric heating circuits',
          'Check garage and shed circuit protection and isolation'
        ],
        expectedResult: 'All domestic circuits tested and verified compliant',
        safetyNotes: [
          'Ring circuits require specific testing procedures',
          'High-current circuits need appropriate protection',
          'RCD protection essential for bathroom and outdoor circuits'
        ],
        tools: ['Multifunction tester', 'Circuit schedules', 'Load testing equipment'],
        isRequired: true,
        estimatedTime: 45
      }
    ]
  },
  {
    id: 'commercial-testing-procedure',
    name: 'Commercial Installation Testing - Professional Standards',
    type: 'all-tests',
    description: 'Professional testing procedure for commercial electrical installations with comprehensive documentation',
    difficulty: 'advanced',
    prerequisites: [
      '18th Edition qualification or equivalent',
      'Commercial installation experience',
      'Understanding of three-phase systems',
      'Knowledge of fire alarm and emergency lighting systems'
    ],
    regulatoryStandards: [
      'BS 7671:2018+A2:2022 - Wiring Regulations',
      'BS 5266 - Emergency Lighting Code of Practice',
      'BS 5839 - Fire Detection and Alarm Systems',
      'IET Guidance Note 3 - Inspection & Testing'
    ],
    steps: [
      {
        id: 'commercial-documentation-review',
        title: 'Commercial Installation Documentation Review',
        description: 'Comprehensive review of commercial installation documentation and compliance requirements',
        instructions: [
          'Review electrical installation certificate and design calculations',
          'Study single-line diagrams and distribution board schedules',
          'Check compliance with local authority requirements',
          'Review fire alarm and emergency lighting certificates',
          'Verify load calculations and diversity factors',
          'Check earthing system design and calculations',
          'Review maintenance records and previous test results',
          'Identify any special systems requiring specific testing'
        ],
        expectedResult: 'Complete understanding of commercial installation requirements established',
        safetyNotes: [
          'Commercial installations often have complex protection schemes',
          'Multiple supplies may be present requiring coordination',
          'Fire alarm circuits have specific testing requirements'
        ],
        tools: ['Installation certificates', 'Design calculations', 'Regulatory standards'],
        isRequired: true,
        estimatedTime: 30
      },
      {
        id: 'commercial-supply-analysis',
        title: 'Commercial Supply System Analysis and Testing',
        description: 'Analysis and testing of commercial electrical supply arrangements',
        instructions: [
          'Identify supply configuration (radial, ring, or interconnected)',
          'Test incoming supply characteristics and phase sequence',
          'Measure supply voltage under load conditions',
          'Test automatic transfer switch operation if present',
          'Verify standby generator changeover arrangements',
          'Test UPS systems and battery backup supplies',
          'Check load monitoring and power quality equipment',
          'Document supply reliability and power quality issues'
        ],
        expectedResult: 'Commercial supply system fully analyzed and verified',
        safetyNotes: [
          'Multiple supplies require careful isolation procedures',
          'Generator testing may require specialist knowledge',
          'Power quality issues can affect sensitive equipment'
        ],
        tools: ['Power quality analyzer', 'Phase sequence indicator', 'Load monitoring equipment'],
        isRequired: true,
        estimatedTime: 40
      },
      {
        id: 'commercial-protection-testing',
        title: 'Commercial Protection System Testing and Coordination',
        description: 'Comprehensive testing of commercial protection systems and selectivity',
        instructions: [
          'Test all protective devices for correct operation',
          'Verify protection discrimination and selectivity',
          'Test motor starter protection and control circuits',
          'Check arc fault protection where installed',
          'Test bus section protection and interlocking',
          'Verify earth fault protection coordination',
          'Test protection system communication and monitoring',
          'Document protection settings and coordination study'
        ],
        expectedResult: 'Commercial protection system verified with proper coordination',
        safetyNotes: [
          'Incorrect protection settings can cause equipment damage',
          'Protection coordination prevents unnecessary outages',
          'Motor protection requires specific test procedures'
        ],
        tools: ['Protection test equipment', 'Coordination software', 'Motor testing equipment'],
        isRequired: true,
        estimatedTime: 50
      }
    ]
  },
  {
    id: 'emergency-lighting-testing',
    name: 'Emergency Lighting System Testing - BS 5266 Compliance',
    type: 'functional-testing',
    description: 'Comprehensive testing procedure for emergency lighting systems in accordance with BS 5266',
    difficulty: 'intermediate',
    prerequisites: [
      'Understanding of emergency lighting principles',
      'Knowledge of BS 5266 requirements',
      'Familiarity with different emergency lighting types',
      'Light measuring equipment operation'
    ],
    regulatoryStandards: [
      'BS 5266-1:2016 - Emergency Lighting Code of Practice',
      'BS EN 1838 - Lighting applications - Emergency lighting',
      'BS 7671:2018 - Electrical installation requirements'
    ],
    steps: [
      {
        id: 'emergency-lighting-survey',
        title: 'Emergency Lighting System Survey and Documentation',
        description: 'Comprehensive survey of emergency lighting installation and requirements',
        instructions: [
          'Map all emergency lighting locations and types',
          'Identify escape routes and areas requiring emergency lighting',
          'Check emergency lighting design calculations and photometric data',
          'Verify compliance with current BS 5266 standards',
          'Identify central battery systems vs self-contained units',
          'Check maintenance access and testing facilities',
          'Document emergency lighting control and monitoring systems',
          'Review evacuation procedures and lighting requirements'
        ],
        expectedResult: 'Complete emergency lighting system survey documented',
        safetyNotes: [
          'Emergency lighting is critical for life safety',
          'Regular testing and maintenance is legally required',
          'System failures can have serious consequences'
        ],
        tools: ['Emergency lighting plans', 'Light meter', 'BS 5266', 'Survey forms'],
        isRequired: true,
        estimatedTime: 45
      },
      {
        id: 'emergency-lighting-functional-test',
        title: 'Emergency Lighting Functional Testing and Duration Verification',
        description: 'Complete functional testing of emergency lighting including duration and illumination levels',
        instructions: [
          'Test all emergency lighting units by simulating mains failure',
          'Verify minimum 3-hour duration for non-maintained systems',
          'Test 1-hour duration for maintained systems where applicable',
          'Measure illumination levels on escape routes (minimum 1 lux)',
          'Test emergency lighting in high-risk areas (minimum 15 lux)',
          'Check anti-panic lighting coverage and uniformity',
          'Test central battery system operation and changeover',
          'Verify automatic testing system operation if installed',
          'Test manual test switches and override controls',
          'Document any units failing duration or illumination tests'
        ],
        expectedResult: 'All emergency lighting units tested with compliant duration and illumination',
        safetyNotes: [
          'Test during normal working hours where possible',
          'Ensure alternative lighting available during testing',
          'Failed units must be repaired immediately'
        ],
        tools: ['Stopwatch', 'Light meter', 'Emergency lighting tester', 'Test record sheets'],
        isRequired: true,
        estimatedTime: 60
      }
    ]
  },
  {
    id: 'fire-alarm-testing',
    name: 'Fire Alarm System Testing - BS 5839 Compliance',
    type: 'functional-testing',
    description: 'Professional fire alarm system testing procedure following BS 5839 standards',
    difficulty: 'advanced',
    prerequisites: [
      'Fire alarm system knowledge',
      'Understanding of BS 5839 requirements',
      'Familiarity with different detector types',
      'Fire alarm commissioning experience'
    ],
    regulatoryStandards: [
      'BS 5839-1:2017 - Fire detection and fire alarm systems',
      'BS 5839-6:2019 - Domestic fire detection systems',
      'BS 7671:2018 - Electrical installation requirements'
    ],
    steps: [
      {
        id: 'fire-alarm-system-verification',
        title: 'Fire Alarm System Verification and Documentation',
        description: 'Comprehensive verification of fire alarm system design and installation',
        instructions: [
          'Review fire alarm system design and zone layout',
          'Verify detector spacing and coverage areas',
          'Check control panel programming and configuration',
          'Test fire alarm circuit wiring and loop integrity',
          'Verify detection device addressing and identification',
          'Check cause and effect programming',
          'Test interface connections to other building systems',
          'Verify compliance with current BS 5839 standards'
        ],
        expectedResult: 'Fire alarm system verified against design and standards',
        safetyNotes: [
          'Fire alarm systems are critical for life safety',
          'Incorrect programming can prevent proper operation',
          'Testing may trigger building evacuation procedures'
        ],
        tools: ['Fire alarm test equipment', 'Loop testers', 'Programming software', 'BS 5839'],
        isRequired: true,
        estimatedTime: 40
      },
      {
        id: 'fire-alarm-detection-testing',
        title: 'Fire Detection Device Testing and Calibration',
        description: 'Individual testing of all fire detection devices and sensitivity verification',
        instructions: [
          'Test each smoke detector using appropriate test method',
          'Test heat detectors with controlled heat source',
          'Test beam detectors with test filters or smoke',
          'Verify multi-sensor detector operation on all sensors',
          'Test manual call points for correct operation',
          'Check detector sensitivity within specified range',
          'Test detector removal and tamper monitoring',
          'Verify detector LED indication and identification',
          'Test detector bases and wiring connections',
          'Document any detectors failing sensitivity tests'
        ],
        expectedResult: 'All fire detection devices tested and operating within specification',
        safetyNotes: [
          'Use appropriate test equipment for each detector type',
          'Avoid false alarms during testing procedures',
          'Failed detectors must be replaced immediately'
        ],
        tools: ['Smoke test equipment', 'Heat test equipment', 'Sensitivity meters', 'Test record sheets'],
        isRequired: true,
        estimatedTime: 90
      }
    ]
  }
];
