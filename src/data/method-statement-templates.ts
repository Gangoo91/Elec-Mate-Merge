import { MethodTemplate, StepTemplate } from '@/types/method-statement';

export const methodTemplates: MethodTemplate[] = [
  {
    id: 'consumer-unit-replacement',
    name: 'Consumer Unit Replacement',
    description: 'Complete replacement of existing consumer unit with RCD protection',
    category: 'Installation',
    workType: 'Installation Work',
    estimatedDuration: '4-6 hours',
    difficultyLevel: 'intermediate',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Part P Qualified', 'AM2'],
    steps: [
      {
        title: 'Initial Assessment & Planning',
        description: 'Survey existing installation and plan new consumer unit layout',
        safetyRequirements: ['PPE', 'Risk assessment completed'],
        equipmentNeeded: ['Installation tester', 'Digital camera', 'Measuring tape'],
        qualifications: ['18th Edition'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Isolation & Verification',
        description: 'Isolate main supply and verify isolation at consumer unit',
        safetyRequirements: ['Prove dead device', 'Lockout/tagout procedures', 'Two-person verification'],
        equipmentNeeded: ['Voltage indicator', 'Proving unit', 'Isolation locks'],
        qualifications: ['18th Edition', 'Safe isolation procedures'],
        estimatedDuration: '20 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Remove Existing Consumer Unit',
        description: 'Carefully remove old consumer unit and label all circuits',
        safetyRequirements: ['Eye protection', 'Dust mask', 'Careful handling of asbestos'],
        equipmentNeeded: ['Label maker', 'Circuit identification tools', 'Hand tools'],
        qualifications: ['18th Edition'],
        estimatedDuration: '45 minutes',
        riskLevel: 'medium'
      },
      {
        title: 'Install New Consumer Unit',
        description: 'Mount and wire new consumer unit with RCD protection',
        safetyRequirements: ['Secure mounting', 'Proper cable management', 'IP rating compliance'],
        equipmentNeeded: ['New consumer unit', 'MCBs', 'RCDs', 'Cable management'],
        qualifications: ['18th Edition', 'Part P'],
        estimatedDuration: '2 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Certification',
        description: 'Complete installation testing and issue certificates',
        safetyRequirements: ['Safe re-energisation', 'Sequential testing'],
        equipmentNeeded: ['Multifunction tester', 'Schedule of test results'],
        qualifications: ['18th Edition', 'Testing competence'],
        estimatedDuration: '1 hour',
        riskLevel: 'medium'
      }
    ]
  },
  {
    id: 'socket-outlet-installation',
    name: 'Socket Outlet Installation',
    description: 'Installation of new socket outlets on existing circuits',
    category: 'Installation',
    workType: 'Installation Work',
    estimatedDuration: '2-3 hours',
    difficultyLevel: 'basic',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Part P Qualified'],
    steps: [
      {
        title: 'Circuit Assessment',
        description: 'Assess existing circuit capacity and suitability',
        safetyRequirements: ['Circuit testing', 'Load calculations'],
        equipmentNeeded: ['Circuit tester', 'Load calculation sheets'],
        qualifications: ['18th Edition'],
        estimatedDuration: '20 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Safe Isolation',
        description: 'Isolate circuit and verify isolation',
        safetyRequirements: ['Lockout procedures', 'Voltage testing'],
        equipmentNeeded: ['Voltage tester', 'Proving unit', 'Isolation locks'],
        qualifications: ['Safe isolation procedures'],
        estimatedDuration: '15 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Installation Work',
        description: 'Install new socket outlets and make connections',
        safetyRequirements: ['Proper terminations', 'Cable protection'],
        equipmentNeeded: ['Socket outlets', 'Cable', 'Installation tools'],
        qualifications: ['18th Edition', 'Part P'],
        estimatedDuration: '1.5 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Commissioning',
        description: 'Test installation and complete certification',
        safetyRequirements: ['Safe re-energisation', 'Functional testing'],
        equipmentNeeded: ['Socket tester', 'Certification forms'],
        qualifications: ['Testing competence'],
        estimatedDuration: '30 minutes',
        riskLevel: 'medium'
      }
    ]
  },
  {
    id: 'lighting-circuit-installation',
    name: 'Lighting Circuit Installation',
    description: 'Installation of new lighting circuits with switching',
    category: 'Installation',
    workType: 'Installation Work',
    estimatedDuration: '4-8 hours',
    difficultyLevel: 'intermediate',
    requiredQualifications: ['18th Edition', 'Part P Qualified'],
    steps: [
      {
        title: 'Design & Planning',
        description: 'Design lighting layout and switching arrangements',
        safetyRequirements: ['Switching heights', 'Emergency lighting considerations'],
        equipmentNeeded: ['Design software', 'Lighting calculations'],
        qualifications: ['Lighting design competence'],
        estimatedDuration: '1 hour',
        riskLevel: 'low'
      },
      {
        title: 'First Fix Installation',
        description: 'Install cables and back boxes for lighting circuit',
        safetyRequirements: ['Cable protection', 'Fire barrier integrity'],
        equipmentNeeded: ['Twin & earth cable', 'Back boxes', 'Installation tools'],
        qualifications: ['18th Edition'],
        estimatedDuration: '3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Second Fix & Connection',
        description: 'Install fittings and complete all connections',
        safetyRequirements: ['Working at height', 'Secure fixings'],
        equipmentNeeded: ['Light fittings', 'Switches', 'Connectors'],
        qualifications: ['18th Edition', 'Part P'],
        estimatedDuration: '2 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Commissioning',
        description: 'Complete testing and functional verification',
        safetyRequirements: ['Safe re-energisation', 'Emergency lighting testing'],
        equipmentNeeded: ['Installation tester', 'Light meter'],
        qualifications: ['Testing competence'],
        estimatedDuration: '45 minutes',
        riskLevel: 'medium'
      }
    ]
  },
  // Emergency/Maintenance Work
  {
    id: 'emergency-electrical-repair',
    name: 'Emergency Electrical Repair',
    description: 'Emergency fault rectification and power restoration',
    category: 'Emergency',
    workType: 'Emergency Response',
    estimatedDuration: '1-4 hours',
    difficultyLevel: 'advanced',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Emergency Response Training', 'Approved Person Status'],
    steps: [
      {
        title: 'Emergency Assessment',
        description: 'Rapid assessment of fault and safety hazards',
        safetyRequirements: ['Emergency PPE', 'Safe approach procedures', 'Hazard identification'],
        equipmentNeeded: ['Emergency kit', 'Voltage detector', 'Emergency lighting'],
        qualifications: ['Emergency response procedures'],
        estimatedDuration: '15 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Make Safe Procedures',
        description: 'Isolate dangerous circuits and secure area',
        safetyRequirements: ['Emergency isolation', 'Area cordoning', 'Emergency services liaison'],
        equipmentNeeded: ['Isolation equipment', 'Warning barriers', 'Communication devices'],
        qualifications: ['Emergency isolation procedures'],
        estimatedDuration: '20 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Fault Investigation',
        description: 'Locate and assess extent of electrical fault',
        safetyRequirements: ['Safe testing procedures', 'Live working restrictions'],
        equipmentNeeded: ['Testing equipment', 'Insulation tester', 'Circuit tracer'],
        qualifications: ['Fault finding competence'],
        estimatedDuration: '45 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Temporary Repair',
        description: 'Implement safe temporary repair to restore essential services',
        safetyRequirements: ['Temporary installation standards', 'Reduced fire risk'],
        equipmentNeeded: ['Emergency repair materials', 'Temporary switchgear'],
        qualifications: ['Emergency repair procedures'],
        estimatedDuration: '1-2 hours',
        riskLevel: 'high'
      },
      {
        title: 'Testing & Handover',
        description: 'Test emergency repair and brief client on limitations',
        safetyRequirements: ['Limited testing procedures', 'Clear documentation'],
        equipmentNeeded: ['Portable testing equipment', 'Emergency certificates'],
        qualifications: ['Emergency testing procedures'],
        estimatedDuration: '30 minutes',
        riskLevel: 'medium'
      }
    ]
  },
  {
    id: 'periodic-inspection-testing',
    name: 'Periodic Inspection & Testing (EICR)',
    description: 'Complete electrical installation condition report',
    category: 'Testing',
    workType: 'Inspection & Testing',
    estimatedDuration: '4-8 hours',
    difficultyLevel: 'advanced',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Inspection & Testing Qualification', '2391'],
    steps: [
      {
        title: 'Pre-Inspection Planning',
        description: 'Review installation history and plan inspection approach',
        safetyRequirements: ['Installation drawings review', 'Previous test results'],
        equipmentNeeded: ['Installation drawings', 'Previous certificates', 'EICR forms'],
        qualifications: ['Inspection planning'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Visual Inspection',
        description: 'Comprehensive visual inspection of electrical installation',
        safetyRequirements: ['Safe access procedures', 'Non-intrusive inspection'],
        equipmentNeeded: ['Torch', 'Mirror', 'Camera', 'Inspection checklist'],
        qualifications: ['Visual inspection competence'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'low'
      },
      {
        title: 'Dead Testing',
        description: 'Complete dead testing sequence per BS7671',
        safetyRequirements: ['Isolation procedures', 'Safe isolation verification'],
        equipmentNeeded: ['Multifunction tester', 'Low resistance ohmmeter', 'Insulation tester'],
        qualifications: ['Testing competence'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Live Testing',
        description: 'Live testing of RCD operation and polarity verification',
        safetyRequirements: ['Live working procedures', 'RCD testing safety'],
        equipmentNeeded: ['RCD tester', 'Socket tester', 'Phase rotation meter'],
        qualifications: ['Live testing procedures'],
        estimatedDuration: '1 hour',
        riskLevel: 'high'
      },
      {
        title: 'Report Completion',
        description: 'Complete EICR with observations and recommendations',
        safetyRequirements: ['Accurate reporting', 'Clear recommendations'],
        equipmentNeeded: ['EICR forms', 'Computer/tablet', 'Digital camera'],
        qualifications: ['Report writing competence'],
        estimatedDuration: '1 hour',
        riskLevel: 'low'
      }
    ]
  },
  {
    id: 'fault-finding-diagnosis',
    name: 'Fault Finding & Diagnosis',
    description: 'Systematic fault finding and electrical diagnosis',
    category: 'Maintenance',
    workType: 'Fault Finding',
    estimatedDuration: '1-6 hours',
    difficultyLevel: 'advanced',
    requiredQualifications: ['18th Edition', 'Fault Finding Training', 'Advanced Testing'],
    steps: [
      {
        title: 'Symptom Analysis',
        description: 'Gather information about fault symptoms and history',
        safetyRequirements: ['Safe questioning procedures', 'Documentation review'],
        equipmentNeeded: ['Fault report forms', 'Installation drawings'],
        qualifications: ['Fault analysis procedures'],
        estimatedDuration: '20 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Initial Safety Assessment',
        description: 'Assess immediate safety risks and make installation safe',
        safetyRequirements: ['Danger identification', 'Risk mitigation'],
        equipmentNeeded: ['Voltage detector', 'Warning notices', 'Isolation equipment'],
        qualifications: ['Safety assessment'],
        estimatedDuration: '15 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Systematic Testing',
        description: 'Logical sequence testing to isolate fault location',
        safetyRequirements: ['Safe testing procedures', 'Methodical approach'],
        equipmentNeeded: ['Multifunction tester', 'Clamp meter', 'Oscilloscope'],
        qualifications: ['Advanced testing techniques'],
        estimatedDuration: '2-4 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Fault Repair',
        description: 'Rectify identified fault using appropriate methods',
        safetyRequirements: ['Repair standards compliance', 'Material compatibility'],
        equipmentNeeded: ['Repair materials', 'Installation tools', 'Joint systems'],
        qualifications: ['Repair techniques'],
        estimatedDuration: '1-2 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Verification Testing',
        description: 'Verify repair effectiveness and system integrity',
        safetyRequirements: ['Post-repair testing', 'System functionality'],
        equipmentNeeded: ['Testing equipment', 'Verification procedures'],
        qualifications: ['Verification testing'],
        estimatedDuration: '30 minutes',
        riskLevel: 'medium'
      }
    ]
  },
  // Specialized Installation Work
  {
    id: 'ev-charging-installation',
    name: 'EV Charging Point Installation',
    description: 'Installation of electric vehicle charging point',
    category: 'Specialized',
    workType: 'EV Installation',
    estimatedDuration: '4-6 hours',
    difficultyLevel: 'advanced',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'EV Installation Training', 'OLEV Approved'],
    steps: [
      {
        title: 'Site Survey & Assessment',
        description: 'Assess site suitability for EV charging installation',
        safetyRequirements: ['Load assessment', 'DNO notification requirements'],
        equipmentNeeded: ['Load calculator', 'Site survey forms', 'Measuring equipment'],
        qualifications: ['EV installation competence'],
        estimatedDuration: '45 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Supply Modification',
        description: 'Install dedicated circuit from consumer unit',
        safetyRequirements: ['Isolation procedures', 'Cable protection', 'Type A RCD requirement'],
        equipmentNeeded: ['6mm² SWA cable', 'Type A RCD', 'Conduit systems'],
        qualifications: ['18th Edition', 'Cable installation'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Charge Point Installation',
        description: 'Mount and connect EV charging unit',
        safetyRequirements: ['Weatherproof installation', 'Height requirements', 'TN-S earthing'],
        equipmentNeeded: ['EV charge point', 'Mounting hardware', 'Earth electrode'],
        qualifications: ['EV installation procedures'],
        estimatedDuration: '1 hour',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Commissioning',
        description: 'Complete EV installation testing and commissioning',
        safetyRequirements: ['Type A RCD testing', 'Earth fault loop impedance'],
        equipmentNeeded: ['RCD tester', 'Earth loop tester', 'EV test adapter'],
        qualifications: ['EV testing procedures'],
        estimatedDuration: '45 minutes',
        riskLevel: 'medium'
      },
      {
        title: 'Customer Handover',
        description: 'Demonstrate operation and complete documentation',
        safetyRequirements: ['User training', 'Safety briefing'],
        equipmentNeeded: ['User manual', 'Installation certificate', 'OLEV documentation'],
        qualifications: ['Customer training'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      }
    ]
  },
  {
    id: 'solar-pv-installation',
    name: 'Solar PV System Installation',
    description: 'Installation of solar photovoltaic generation system',
    category: 'Renewable',
    workType: 'Solar Installation',
    estimatedDuration: '1-2 days',
    difficultyLevel: 'advanced',
    requiredQualifications: ['18th Edition', 'MCS Certification', 'Working at Height'],
    steps: [
      {
        title: 'System Design & Planning',
        description: 'Design PV system layout and electrical configuration',
        safetyRequirements: ['Structural assessment', 'Shading analysis', 'DNO application'],
        equipmentNeeded: ['Design software', 'Irradiance meter', 'Structural calculations'],
        qualifications: ['PV design competence'],
        estimatedDuration: '2 hours',
        riskLevel: 'low'
      },
      {
        title: 'Roof Work & Mounting',
        description: 'Install PV mounting system and panels',
        safetyRequirements: ['Working at height procedures', 'Fall protection', 'Weather conditions'],
        equipmentNeeded: ['PV panels', 'Mounting rails', 'Safety harness', 'Weather monitoring'],
        qualifications: ['Working at height certificate'],
        estimatedDuration: '6-8 hours',
        riskLevel: 'high'
      },
      {
        title: 'DC Installation',
        description: 'Install DC cabling and isolation systems',
        safetyRequirements: ['DC isolation procedures', 'Cable fire performance'],
        equipmentNeeded: ['DC cable', 'MC4 connectors', 'DC isolators', 'Generation meter'],
        qualifications: ['PV electrical installation'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Inverter & AC Connection',
        description: 'Install inverter and connect to AC supply',
        safetyRequirements: ['G99 compliance', 'Export limitation', 'AC isolation'],
        equipmentNeeded: ['Inverter', 'AC isolator', 'Export meter', 'Protection devices'],
        qualifications: ['Grid connection procedures'],
        estimatedDuration: '2 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Commissioning',
        description: 'Complete PV system testing and commissioning',
        safetyRequirements: ['Live DC testing', 'Insulation resistance', 'Earth continuity'],
        equipmentNeeded: ['PV tester', 'Irradiance meter', 'Insulation tester'],
        qualifications: ['PV testing procedures'],
        estimatedDuration: '1 hour',
        riskLevel: 'medium'
      }
    ]
  },
  {
    id: 'shower-circuit-installation',
    name: 'Electric Shower Circuit Installation',
    description: 'Installation of dedicated circuit for electric shower',
    category: 'Bathroom',
    workType: 'Special Location',
    estimatedDuration: '3-5 hours',
    difficultyLevel: 'intermediate',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Part P Qualified', 'Bathroom Installations'],
    steps: [
      {
        title: 'Load Assessment & Planning',
        description: 'Calculate shower load and assess supply adequacy',
        safetyRequirements: ['Load calculations', 'Supply capacity check'],
        equipmentNeeded: ['Load calculator', 'Shower specifications', 'Supply assessment'],
        qualifications: ['Load calculation competence'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Cable Installation',
        description: 'Install dedicated cable from consumer unit to shower location',
        safetyRequirements: ['Cable protection', 'Zone requirements', 'Safe routes'],
        equipmentNeeded: ['10mm² cable', 'Protective conduit', 'Cable clips'],
        qualifications: ['Cable installation'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Shower Unit Installation',
        description: 'Install shower unit and make electrical connections',
        safetyRequirements: ['IP rating compliance', 'Supplementary bonding', 'Safe zones'],
        equipmentNeeded: ['Shower unit', 'Bonding conductors', 'Connection units'],
        qualifications: ['Bathroom electrical work'],
        estimatedDuration: '1 hour',
        riskLevel: 'medium'
      },
      {
        title: 'Protective Device Installation',
        description: 'Install appropriate protective devices at consumer unit',
        safetyRequirements: ['RCD protection', 'Correct MCB rating', 'Type AC RCD'],
        equipmentNeeded: ['MCB', 'RCD', 'Labels'],
        qualifications: ['Protection device selection'],
        estimatedDuration: '30 minutes',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Certification',
        description: 'Complete installation testing and issue certificates',
        safetyRequirements: ['Earth fault loop impedance', 'RCD operation', 'Polarity'],
        equipmentNeeded: ['Installation tester', 'RCD tester', 'Certificates'],
        qualifications: ['Testing competence'],
        estimatedDuration: '45 minutes',
        riskLevel: 'medium'
      }
    ]
  },
  {
    id: 'cooker-circuit-installation',
    name: 'Cooker Circuit Installation',
    description: 'Installation of dedicated circuit for electric cooker',
    category: 'Kitchen',
    workType: 'High Load Installation',
    estimatedDuration: '3-4 hours',
    difficultyLevel: 'intermediate',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Part P Qualified'],
    steps: [
      {
        title: 'Load Calculation & Assessment',
        description: 'Calculate cooker load using diversity factors',
        safetyRequirements: ['Diversity calculations', 'Cable sizing'],
        equipmentNeeded: ['Cooker specifications', 'Load calculation sheets'],
        qualifications: ['Load calculation procedures'],
        estimatedDuration: '20 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Cable Route Planning',
        description: 'Plan safe route for cooker circuit cable',
        safetyRequirements: ['Safe zones', 'Cable protection', 'Accessibility'],
        equipmentNeeded: ['Cable route planner', 'Detection equipment'],
        qualifications: ['Cable routing'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Cable Installation',
        description: 'Install cable from consumer unit to cooker location',
        safetyRequirements: ['Mechanical protection', 'Fire barrier integrity'],
        equipmentNeeded: ['6mm² cable', 'Protective conduit', 'Fire barriers'],
        qualifications: ['Cable installation'],
        estimatedDuration: '1.5-2 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Connection Unit Installation',
        description: 'Install cooker connection unit and make connections',
        safetyRequirements: ['Correct terminations', 'Adequate earthing'],
        equipmentNeeded: ['Cooker connection unit', 'Terminals', 'Earth bonding'],
        qualifications: ['Connection procedures'],
        estimatedDuration: '45 minutes',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Commissioning',
        description: 'Test installation and commission cooker circuit',
        safetyRequirements: ['Load testing', 'Safety checks'],
        equipmentNeeded: ['Installation tester', 'Load test equipment'],
        qualifications: ['Testing procedures'],
        estimatedDuration: '30 minutes',
        riskLevel: 'medium'
      }
    ]
  },
  // Commercial/Industrial Work
  {
    id: 'three-phase-installation',
    name: 'Three-Phase Supply Installation',
    description: 'Installation of three-phase electrical supply system',
    category: 'Commercial',
    workType: 'Three-Phase Installation',
    estimatedDuration: '6-10 hours',
    difficultyLevel: 'advanced',
    requiredQualifications: ['18th Edition', 'Three-Phase Competence', 'HV Awareness'],
    steps: [
      {
        title: 'Load Analysis & Design',
        description: 'Analyse three-phase load requirements and design system',
        safetyRequirements: ['Load balancing', 'Phase rotation', 'Neutral requirements'],
        equipmentNeeded: ['Load analysis software', 'Phase meters', 'Design documentation'],
        qualifications: ['Three-phase design'],
        estimatedDuration: '1 hour',
        riskLevel: 'low'
      },
      {
        title: 'Supply Authority Liaison',
        description: 'Coordinate with DNO for supply upgrade',
        safetyRequirements: ['DNO procedures', 'Isolation arrangements'],
        equipmentNeeded: ['DNO application forms', 'Site plans'],
        qualifications: ['DNO liaison procedures'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Three-Phase Distribution',
        description: 'Install three-phase distribution equipment',
        safetyRequirements: ['Phase sequence', 'Neutral earthing', 'Protection coordination'],
        equipmentNeeded: ['Three-phase distribution board', 'Three-phase MCBs', 'Phase rotation meter'],
        qualifications: ['Three-phase installation'],
        estimatedDuration: '3-4 hours',
        riskLevel: 'high'
      },
      {
        title: 'Load Connection',
        description: 'Connect three-phase loads with correct phasing',
        safetyRequirements: ['Phase rotation verification', 'Load balancing'],
        equipmentNeeded: ['Three-phase contactors', 'Motor starters', 'Phase monitoring'],
        qualifications: ['Three-phase connections'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Commissioning',
        description: 'Complete three-phase system testing',
        safetyRequirements: ['Phase sequence testing', 'Load balance verification'],
        equipmentNeeded: ['Three-phase tester', 'Power quality analyser'],
        qualifications: ['Three-phase testing'],
        estimatedDuration: '1.5 hours',
        riskLevel: 'medium'
      }
    ]
  },
  {
    id: 'fire-alarm-installation',
    name: 'Fire Alarm System Installation',
    description: 'Installation of addressable fire alarm and detection system',
    category: 'Safety Systems',
    workType: 'Fire Safety Installation',
    estimatedDuration: '1-3 days',
    difficultyLevel: 'advanced',
    requiredQualifications: ['18th Edition', 'Fire Alarm Competence', 'BS5839 Training'],
    steps: [
      {
        title: 'System Design & Planning',
        description: 'Design fire alarm system to BS5839 requirements',
        safetyRequirements: ['Zone planning', 'Escape route coverage', 'Cause and effect'],
        equipmentNeeded: ['Design software', 'Site plans', 'Fire risk assessment'],
        qualifications: ['Fire alarm design'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'low'
      },
      {
        title: 'Cable Installation',
        description: 'Install fire-resistant cables throughout building',
        safetyRequirements: ['Fire-resistant cable', 'Segregation requirements', 'Support systems'],
        equipmentNeeded: ['FP200 cable', 'Fire-resistant clips', 'Cable supports'],
        qualifications: ['Fire alarm cabling'],
        estimatedDuration: '8-16 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Device Installation',
        description: 'Install detectors, call points and sounders',
        safetyRequirements: ['Device positioning', 'Environmental considerations'],
        equipmentNeeded: ['Smoke detectors', 'Heat detectors', 'Call points', 'Sounders'],
        qualifications: ['Fire alarm devices'],
        estimatedDuration: '4-6 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Panel Programming',
        description: 'Program addressable fire alarm control panel',
        safetyRequirements: ['Cause and effect programming', 'Zone configuration'],
        equipmentNeeded: ['Programming software', 'System documentation'],
        qualifications: ['Fire alarm programming'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Commissioning',
        description: 'Complete system testing and handover',
        safetyRequirements: ['Full system testing', 'Documentation completion'],
        equipmentNeeded: ['Testing equipment', 'Commissioning certificates'],
        qualifications: ['Fire alarm testing'],
        estimatedDuration: '3-4 hours',
        riskLevel: 'medium'
      }
    ]
  },
  {
    id: 'emergency-lighting-installation',
    name: 'Emergency Lighting Installation',
    description: 'Installation of emergency lighting system',
    category: 'Safety Systems',
    workType: 'Emergency Lighting',
    estimatedDuration: '4-8 hours',
    difficultyLevel: 'intermediate',
    requiredQualifications: ['18th Edition', 'Emergency Lighting Training', 'BS5266'],
    steps: [
      {
        title: 'Lighting Design',
        description: 'Design emergency lighting to BS5266 requirements',
        safetyRequirements: ['Escape route illumination', 'Anti-panic requirements'],
        equipmentNeeded: ['Lux meter', 'Design software', 'Site drawings'],
        qualifications: ['Emergency lighting design'],
        estimatedDuration: '1 hour',
        riskLevel: 'low'
      },
      {
        title: 'Circuit Installation',
        description: 'Install emergency lighting circuits',
        safetyRequirements: ['Unswitched supply', 'Test facility provision'],
        equipmentNeeded: ['Emergency lighting cable', 'Test switches', 'Key switches'],
        qualifications: ['Emergency lighting circuits'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Luminaire Installation',
        description: 'Install emergency lighting luminaires',
        safetyRequirements: ['Correct positioning', 'Viewing angles', 'Maintained/non-maintained'],
        equipmentNeeded: ['Emergency luminaires', 'Exit signs', 'Mounting hardware'],
        qualifications: ['Luminaire installation'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'System Testing',
        description: 'Test emergency lighting system operation',
        safetyRequirements: ['Duration testing', 'Illumination levels'],
        equipmentNeeded: ['Lux meter', 'Duration timer', 'Test log sheets'],
        qualifications: ['Emergency lighting testing'],
        estimatedDuration: '1-2 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Documentation & Handover',
        description: 'Complete installation documentation and user training',
        safetyRequirements: ['Test procedures', 'Maintenance requirements'],
        equipmentNeeded: ['Certificates', 'User manuals', 'Test log books'],
        qualifications: ['System documentation'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      }
    ]
  },
  {
    id: 'distribution-board-upgrade',
    name: 'Distribution Board Upgrade',
    description: 'Upgrade of commercial distribution board',
    category: 'Commercial',
    workType: 'Distribution Upgrade',
    estimatedDuration: '4-8 hours',
    difficultyLevel: 'advanced',
    requiredQualifications: ['18th Edition', 'Commercial Installation', 'HV Awareness'],
    steps: [
      {
        title: 'Load Assessment',
        description: 'Assess existing loads and future requirements',
        safetyRequirements: ['Load monitoring', 'Diversity calculations'],
        equipmentNeeded: ['Power analyser', 'Load survey equipment'],
        qualifications: ['Load assessment'],
        estimatedDuration: '1 hour',
        riskLevel: 'low'
      },
      {
        title: 'Isolation Planning',
        description: 'Plan isolation strategy to minimise disruption',
        safetyRequirements: ['Stakeholder coordination', 'Emergency procedures'],
        equipmentNeeded: ['Isolation schedule', 'Communication equipment'],
        qualifications: ['Isolation planning'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Old Board Removal',
        description: 'Safely remove existing distribution board',
        safetyRequirements: ['Isolation verification', 'Circuit labelling'],
        equipmentNeeded: ['Circuit labels', 'Isolation equipment'],
        qualifications: ['Safe removal procedures'],
        estimatedDuration: '1-2 hours',
        riskLevel: 'high'
      },
      {
        title: 'New Board Installation',
        description: 'Install and wire new distribution board',
        safetyRequirements: ['Correct connections', 'Protection coordination'],
        equipmentNeeded: ['New distribution board', 'MCBs', 'RCDs', 'Busbars'],
        qualifications: ['Distribution board installation'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Commissioning',
        description: 'Test new installation and restore supplies',
        safetyRequirements: ['Sequential restoration', 'Load verification'],
        equipmentNeeded: ['Installation tester', 'Power quality analyser'],
        qualifications: ['Commissioning procedures'],
        estimatedDuration: '1-2 hours',
        riskLevel: 'medium'
      }
    ]
  },
  // Testing & Compliance
  {
    id: 'pat-testing-programme',
    name: 'PAT Testing Programme',
    description: 'Portable appliance testing programme',
    category: 'Testing',
    workType: 'PAT Testing',
    estimatedDuration: '2-8 hours',
    difficultyLevel: 'basic',
    isPopular: true,
    requiredQualifications: ['PAT Testing Qualification', '18th Edition'],
    steps: [
      {
        title: 'Equipment Survey',
        description: 'Survey and register all portable appliances',
        safetyRequirements: ['Equipment identification', 'Risk categorisation'],
        equipmentNeeded: ['Asset register', 'Barcode labels', 'Camera'],
        qualifications: ['PAT testing procedures'],
        estimatedDuration: '1-2 hours',
        riskLevel: 'low'
      },
      {
        title: 'Visual Inspection',
        description: 'Visual inspection of all portable appliances',
        safetyRequirements: ['Damage identification', 'User safety'],
        equipmentNeeded: ['Inspection checklist', 'Failure labels'],
        qualifications: ['Visual inspection'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'low'
      },
      {
        title: 'Electrical Testing',
        description: 'Electrical testing using PAT tester',
        safetyRequirements: ['Test sequence', 'Pass/fail criteria'],
        equipmentNeeded: ['PAT tester', 'Test adapters', 'Test leads'],
        qualifications: ['PAT testing'],
        estimatedDuration: '2-4 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Results Documentation',
        description: 'Record test results and issue certificates',
        safetyRequirements: ['Accurate recording', 'Clear labelling'],
        equipmentNeeded: ['Test result forms', 'Pass labels', 'Computer/printer'],
        qualifications: ['Result recording'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Retest Schedule',
        description: 'Establish ongoing PAT testing schedule',
        safetyRequirements: ['Risk-based intervals', 'Tracking system'],
        equipmentNeeded: ['Scheduling software', 'Asset database'],
        qualifications: ['Programme management'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      }
    ]
  },
  // Safety-Critical Work
  {
    id: 'live-working-emergency',
    name: 'Live Working (Emergency Only)',
    description: 'Emergency live working procedures',
    category: 'Emergency',
    workType: 'Live Working',
    estimatedDuration: '30 minutes - 2 hours',
    difficultyLevel: 'advanced',
    requiredQualifications: ['18th Edition', 'Live Working Qualification', 'Authorised Person'],
    steps: [
      {
        title: 'Emergency Justification',
        description: 'Justify requirement for live working',
        safetyRequirements: ['No alternative assessment', 'Risk vs benefit'],
        equipmentNeeded: ['Risk assessment forms', 'Work permit'],
        qualifications: ['Live working authorisation'],
        estimatedDuration: '10 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Safety Preparation',
        description: 'Prepare for live working with full safety measures',
        safetyRequirements: ['Insulated tools', 'Arc flash protection', 'Skilled assistant'],
        equipmentNeeded: ['Insulated tools', 'Arc flash PPE', 'Insulated mats'],
        qualifications: ['Live working procedures'],
        estimatedDuration: '15 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Live Work Execution',
        description: 'Execute essential work while energised',
        safetyRequirements: ['Minimal intervention', 'Continuous supervision'],
        equipmentNeeded: ['Specialised live working tools'],
        qualifications: ['Live working competence'],
        estimatedDuration: '10-60 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Immediate Verification',
        description: 'Verify work completion and system integrity',
        safetyRequirements: ['Non-intrusive verification', 'Monitoring'],
        equipmentNeeded: ['Non-contact testing', 'Monitoring equipment'],
        qualifications: ['Live verification'],
        estimatedDuration: '10 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Documentation',
        description: 'Document live working activities and outcomes',
        safetyRequirements: ['Incident reporting', 'Lessons learned'],
        equipmentNeeded: ['Work records', 'Incident forms'],
        qualifications: ['Documentation procedures'],
        estimatedDuration: '15 minutes',
        riskLevel: 'low'
      }
    ]
  },
  // Domestic Specialists
  {
    id: 'smart-home-installation',
    name: 'Smart Home System Installation',
    description: 'Installation of smart home automation system',
    category: 'Smart Technology',
    workType: 'Smart Home',
    estimatedDuration: '6-12 hours',
    difficultyLevel: 'advanced',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Smart Home Training', 'Network Configuration'],
    steps: [
      {
        title: 'System Design & Planning',
        description: 'Design smart home system architecture',
        safetyRequirements: ['Network security', 'Power requirements'],
        equipmentNeeded: ['System design software', 'Network analyser'],
        qualifications: ['Smart home design'],
        estimatedDuration: '2 hours',
        riskLevel: 'low'
      },
      {
        title: 'Network Infrastructure',
        description: 'Install network infrastructure for smart devices',
        safetyRequirements: ['Cable categories', 'Interference prevention'],
        equipmentNeeded: ['Cat6 cable', 'Network switches', 'WiFi access points'],
        qualifications: ['Network installation'],
        estimatedDuration: '3-4 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Smart Device Installation',
        description: 'Install smart switches, outlets and controllers',
        safetyRequirements: ['Device compatibility', 'Load limitations'],
        equipmentNeeded: ['Smart switches', 'Smart outlets', 'Controllers'],
        qualifications: ['Smart device installation'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'System Configuration',
        description: 'Configure and program smart home system',
        safetyRequirements: ['Security settings', 'User access control'],
        equipmentNeeded: ['Configuration software', 'Mobile devices'],
        qualifications: ['System programming'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'low'
      },
      {
        title: 'Testing & User Training',
        description: 'Test system operation and train users',
        safetyRequirements: ['Functionality verification', 'Security briefing'],
        equipmentNeeded: ['Test procedures', 'User manuals'],
        qualifications: ['User training'],
        estimatedDuration: '1 hour',
        riskLevel: 'low'
      }
    ]
  },
  {
    id: 'garden-outdoor-electrical',
    name: 'Garden/Outdoor Electrical Installation',
    description: 'Outdoor electrical installation for garden use',
    category: 'Outdoor',
    workType: 'Outdoor Installation',
    estimatedDuration: '4-8 hours',
    difficultyLevel: 'intermediate',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Part P Qualified', 'Outdoor Installation'],
    steps: [
      {
        title: 'Outdoor Assessment',
        description: 'Assess outdoor installation requirements and hazards',
        safetyRequirements: ['Underground services', 'Weather protection', 'Access routes'],
        equipmentNeeded: ['Cable detector', 'Site survey equipment'],
        qualifications: ['Outdoor installation'],
        estimatedDuration: '45 minutes',
        riskLevel: 'medium'
      },
      {
        title: 'Cable Route Planning',
        description: 'Plan safe cable routes for outdoor installation',
        safetyRequirements: ['Burial depth', 'Mechanical protection', 'Warning tape'],
        equipmentNeeded: ['Route planning tools', 'Marking spray'],
        qualifications: ['Cable routing'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Underground Cable Installation',
        description: 'Install armoured cable for outdoor supply',
        safetyRequirements: ['SWA cable', 'Correct depth', 'Sand/warning tape'],
        equipmentNeeded: ['SWA cable', 'Ducting', 'Sand', 'Warning tape'],
        qualifications: ['Underground installation'],
        estimatedDuration: '3-4 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Outdoor Equipment Installation',
        description: 'Install weatherproof outdoor electrical equipment',
        safetyRequirements: ['IP rating compliance', 'RCD protection', 'Earthing'],
        equipmentNeeded: ['Weatherproof sockets', 'Outdoor lights', 'Earth electrode'],
        qualifications: ['Outdoor equipment'],
        estimatedDuration: '1-2 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Certification',
        description: 'Test outdoor installation and issue certificates',
        safetyRequirements: ['Earth electrode resistance', 'RCD operation'],
        equipmentNeeded: ['Earth electrode tester', 'RCD tester'],
        qualifications: ['Outdoor testing'],
        estimatedDuration: '45 minutes',
        riskLevel: 'medium'
      }
    ]
  },
  {
    id: 'bathroom-electrical-installation',
    name: 'Bathroom Electrical Installation',
    description: 'Special location electrical work in bathrooms',
    category: 'Bathroom',
    workType: 'Special Location',
    estimatedDuration: '3-6 hours',
    difficultyLevel: 'intermediate',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Part P Qualified', 'Special Locations'],
    steps: [
      {
        title: 'Zone Assessment',
        description: 'Assess bathroom zones and equipment requirements',
        safetyRequirements: ['Zone classification', 'IP rating requirements'],
        equipmentNeeded: ['Zone measurement tools', 'IP rating charts'],
        qualifications: ['Special locations'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Circuit Design',
        description: 'Design circuits appropriate for bathroom zones',
        safetyRequirements: ['RCD protection', 'Supplementary bonding', 'SELV requirements'],
        equipmentNeeded: ['Circuit design tools', 'Load calculations'],
        qualifications: ['Bathroom circuits'],
        estimatedDuration: '45 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Cable Installation',
        description: 'Install cables in accordance with zone requirements',
        safetyRequirements: ['Safe zones', 'Cable protection', 'Accessibility'],
        equipmentNeeded: ['Appropriate cables', 'Protection systems'],
        qualifications: ['Bathroom cabling'],
        estimatedDuration: '2-3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Equipment Installation',
        description: 'Install bathroom electrical equipment',
        safetyRequirements: ['Correct IP ratings', 'Zone compliance', 'Bonding'],
        equipmentNeeded: ['Bathroom lights', 'Extractor fans', 'Bonding conductors'],
        qualifications: ['Bathroom equipment'],
        estimatedDuration: '1-2 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Verification',
        description: 'Test installation and verify zone compliance',
        safetyRequirements: ['Bonding effectiveness', 'Insulation resistance'],
        equipmentNeeded: ['Low resistance ohmmeter', 'Insulation tester'],
        qualifications: ['Special location testing'],
        estimatedDuration: '45 minutes',
        riskLevel: 'medium'
      }
    ]
  }
];

export const stepTemplates: StepTemplate[] = [
  {
    id: 'isolation-verification',
    title: 'Isolation & Verification',
    description: 'Isolate electrical supply and verify safe isolation',
    category: 'Safety',
    safetyRequirements: [
      'Use approved voltage indicator',
      'Prove dead device before and after use',
      'Apply lockout/tagout procedures',
      'Two-person verification where required'
    ],
    equipmentNeeded: [
      'Voltage indicator (GS38 compliant)',
      'Proving unit',
      'Isolation locks and tags',
      'Warning notices'
    ],
    qualifications: ['Safe isolation procedures (GS38)', '18th Edition'],
    estimatedDuration: '15-20 minutes',
    riskLevel: 'high',
    commonlyUsedWith: ['testing-commissioning', 'installation-work']
  },
  {
    id: 'testing-commissioning',
    title: 'Testing & Commissioning',
    description: 'Complete electrical testing and commission installation',
    category: 'Testing',
    safetyRequirements: [
      'Safe re-energisation procedures',
      'Sequential testing approach',
      'Functional testing of protection devices'
    ],
    equipmentNeeded: [
      'Multifunction installation tester',
      'PAT tester (if applicable)',
      'Test certificates and schedules'
    ],
    qualifications: ['18th Edition', 'Testing and inspection competence'],
    estimatedDuration: '30-60 minutes',
    riskLevel: 'medium',
    commonlyUsedWith: ['isolation-verification', 'installation-work']
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment',
    description: 'Conduct site-specific risk assessment',
    category: 'Planning',
    safetyRequirements: [
      'Identify all hazards',
      'Assess risk levels',
      'Implement control measures'
    ],
    equipmentNeeded: [
      'Risk assessment forms',
      'Camera for hazard documentation',
      'Site survey equipment'
    ],
    qualifications: ['Risk assessment training'],
    estimatedDuration: '20-30 minutes',
    riskLevel: 'low',
    commonlyUsedWith: ['method-statement', 'planning-preparation']
  }
];

export const getTemplatesByCategory = (category?: string): MethodTemplate[] => {
  if (!category) return methodTemplates;
  return methodTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string): MethodTemplate | undefined => {
  return methodTemplates.find(template => template.id === id);
};

export const getStepTemplatesByCategory = (category?: string): StepTemplate[] => {
  if (!category) return stepTemplates;
  return stepTemplates.filter(template => template.category === category);
};