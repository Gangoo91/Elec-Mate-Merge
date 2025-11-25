-- Insert Industrial Project Templates
INSERT INTO project_templates (
  title,
  template_type,
  description,
  difficulty,
  typical_duration_days,
  icon_name,
  phases,
  risk_factors,
  tags,
  usage_count
) VALUES 
(
  'Factory Motor Control Centre (MCC) Installation',
  'industrial',
  'Complete MCC installation for factory motor control with three-phase distribution, including cable containment, wiring, and commissioning',
  'complex',
  10,
  'Factory',
  '[
    {
      "phaseName": "Site Survey & Risk Assessment",
      "dayStart": 1,
      "dayEnd": 1,
      "tasks": [
        {"text": "Conduct detailed site survey and measurements", "completed": false},
        {"text": "Identify existing services and cable routes", "completed": false},
        {"text": "Complete permit to work documentation", "completed": false},
        {"text": "Perform LOTO (Lock Out Tag Out) assessment", "completed": false},
        {"text": "Identify hazardous areas and access requirements", "completed": false}
      ],
      "materials": [],
      "holdPoints": ["Permit to work approved", "LOTO plan signed off"],
      "tradeCoordination": [
        {"trade": "Mechanical Engineers", "day": 1, "note": "Confirm motor positions and loadings", "contacted": false}
      ],
      "completed": false
    },
    {
      "phaseName": "Cable Containment & Earthing",
      "dayStart": 2,
      "dayEnd": 4,
      "tasks": [
        {"text": "Install cable ladder and tray systems", "completed": false},
        {"text": "Install earth electrode system", "completed": false},
        {"text": "Run earth bonding to structural steelwork", "completed": false},
        {"text": "Install cable gland plates on MCC", "completed": false},
        {"text": "Label all containment routes", "completed": false}
      ],
      "materials": [
        {"name": "Heavy duty cable ladder", "quantity": 50, "unit": "m", "ordered": false},
        {"name": "Cable tray", "quantity": 30, "unit": "m", "ordered": false},
        {"name": "Earth rods (copper)", "quantity": 4, "unit": "each", "ordered": false},
        {"name": "Earth bars", "quantity": 2, "unit": "each", "ordered": false},
        {"name": "Cable glands 25-50mm", "quantity": 30, "unit": "each", "ordered": false}
      ],
      "tradeCoordination": [
        {"trade": "Structural Engineers", "day": 2, "note": "Confirm containment fixing points", "contacted": false}
      ],
      "completed": false
    },
    {
      "phaseName": "MCC Installation & Termination",
      "dayStart": 5,
      "dayEnd": 7,
      "tasks": [
        {"text": "Position and secure MCC panels", "completed": false},
        {"text": "Install incoming three-phase supply", "completed": false},
        {"text": "Terminate motor circuit SWA cables", "completed": false},
        {"text": "Install control wiring and interlocks", "completed": false},
        {"text": "Install SCADA/PLC connections", "completed": false},
        {"text": "Label all circuits and terminals", "completed": false}
      ],
      "materials": [
        {"name": "Motor Control Centre (MCC)", "quantity": 1, "unit": "each", "ordered": false, "orderBy": "Day 1"},
        {"name": "6mm² 4-core SWA cable", "quantity": 200, "unit": "m", "ordered": false},
        {"name": "10mm² 4-core SWA cable", "quantity": 150, "unit": "m", "ordered": false},
        {"name": "25mm² 4-core SWA cable", "quantity": 100, "unit": "m", "ordered": false},
        {"name": "Control cable 0.75mm²", "quantity": 500, "unit": "m", "ordered": false},
        {"name": "Industrial MCBs (various)", "quantity": 12, "unit": "each", "ordered": false}
      ],
      "holdPoints": ["Incoming supply isolated and verified", "All cable terminations checked"],
      "tradeCoordination": [
        {"trade": "Controls Engineers", "day": 6, "note": "SCADA integration and programming", "contacted": false}
      ],
      "completed": false
    },
    {
      "phaseName": "Testing & Commissioning",
      "dayStart": 8,
      "dayEnd": 10,
      "tasks": [
        {"text": "Continuity and insulation resistance tests", "completed": false},
        {"text": "Earth loop impedance testing", "completed": false},
        {"text": "RCD testing (if applicable)", "completed": false},
        {"text": "Motor rotation and phasing checks", "completed": false},
        {"text": "Interlock and safety system verification", "completed": false},
        {"text": "Load testing under supervision", "completed": false},
        {"text": "Complete commissioning documentation", "completed": false}
      ],
      "materials": [
        {"name": "Test certificates", "quantity": 1, "unit": "set", "ordered": false},
        {"name": "Warning labels", "quantity": 20, "unit": "each", "ordered": false}
      ],
      "holdPoints": ["All test results within limits", "Client sign-off on commissioning"],
      "completed": false
    }
  ]'::jsonb,
  '[
    {"description": "High voltage exposure during installation", "mitigation": "Follow LOTO procedures, use appropriate PPE, maintain safe working distances", "severity": "high"},
    {"description": "Heavy lifting - MCC panels can weigh 200kg+", "mitigation": "Use mechanical lifting equipment, minimum 2 persons, certified lifting gear", "severity": "high"},
    {"description": "Working at height for cable installation", "mitigation": "Use appropriate access equipment, harnesses, and edge protection", "severity": "medium"},
    {"description": "Permit to work system required", "mitigation": "Obtain all permits before starting work, display prominently, sign off at completion", "severity": "high"}
  ]'::jsonb,
  ARRAY['industrial', 'three-phase', 'mcc', 'high-voltage', 'permit-to-work'],
  0
),
(
  'Warehouse Lighting Upgrade',
  'industrial',
  'LED high bay lighting installation for industrial warehouse including emergency lighting, PIR sensors, and daylight harvesting controls',
  'moderate',
  5,
  'Lightbulb',
  '[
    {
      "phaseName": "Survey & Design",
      "dayStart": 1,
      "dayEnd": 1,
      "tasks": [
        {"text": "Conduct lux level survey of existing lighting", "completed": false},
        {"text": "Measure mounting heights and beam spreads", "completed": false},
        {"text": "Plan luminaire positions for optimal coverage", "completed": false},
        {"text": "Design emergency lighting scheme to BS 5266", "completed": false},
        {"text": "Plan control zones for PIR and daylight sensors", "completed": false}
      ],
      "materials": [],
      "tradeCoordination": [
        {"trade": "Building Manager", "day": 1, "note": "Discuss operational requirements and lighting zones", "contacted": false}
      ],
      "completed": false
    },
    {
      "phaseName": "Existing System Removal",
      "dayStart": 2,
      "dayEnd": 2,
      "tasks": [
        {"text": "Isolate and lock off existing circuits", "completed": false},
        {"text": "Remove old high bay fittings safely", "completed": false},
        {"text": "Dispose of old lamps and fittings responsibly", "completed": false},
        {"text": "Inspect existing wiring and containment", "completed": false},
        {"text": "Plan cable routes for new installation", "completed": false}
      ],
      "materials": [],
      "holdPoints": ["All old fittings safely removed and disposed"],
      "tradeCoordination": [
        {"trade": "Waste Disposal", "day": 2, "note": "Arrange collection of old lighting units", "contacted": false}
      ],
      "completed": false
    },
    {
      "phaseName": "New Lighting Installation",
      "dayStart": 3,
      "dayEnd": 4,
      "tasks": [
        {"text": "Install LED high bay luminaires", "completed": false},
        {"text": "Install emergency lighting with self-test", "completed": false},
        {"text": "Install PIR occupancy sensors", "completed": false},
        {"text": "Install daylight harvesting sensors", "completed": false},
        {"text": "Run control wiring to lighting control panel", "completed": false},
        {"text": "Wire all circuits back to distribution board", "completed": false}
      ],
      "materials": [
        {"name": "150W LED high bay luminaires", "quantity": 40, "unit": "each", "ordered": false, "orderBy": "Day 1"},
        {"name": "LED emergency bulkhead fittings", "quantity": 12, "unit": "each", "ordered": false},
        {"name": "PIR occupancy sensors", "quantity": 8, "unit": "each", "ordered": false},
        {"name": "Daylight sensors", "quantity": 4, "unit": "each", "ordered": false},
        {"name": "Lighting control panel", "quantity": 1, "unit": "each", "ordered": false},
        {"name": "1.5mm² T&E cable", "quantity": 500, "unit": "m", "ordered": false},
        {"name": "Trunking 50x50mm", "quantity": 100, "unit": "m", "ordered": false}
      ],
      "holdPoints": ["All fittings mechanically secure", "Wiring complete and tested"],
      "completed": false
    },
    {
      "phaseName": "Controls Setup & Testing",
      "dayStart": 5,
      "dayEnd": 5,
      "tasks": [
        {"text": "Programme lighting control system", "completed": false},
        {"text": "Set PIR sensor timing and sensitivity", "completed": false},
        {"text": "Calibrate daylight harvesting levels", "completed": false},
        {"text": "Test emergency lighting duration test", "completed": false},
        {"text": "Conduct lux level verification survey", "completed": false},
        {"text": "Provide user training on controls", "completed": false},
        {"text": "Complete certification and handover", "completed": false}
      ],
      "materials": [
        {"name": "EIC Certificate", "quantity": 1, "unit": "set", "ordered": false},
        {"name": "Emergency lighting log book", "quantity": 1, "unit": "each", "ordered": false}
      ],
      "holdPoints": ["Lux levels meet design specification", "Emergency lighting compliant"],
      "completed": false
    }
  ]'::jsonb,
  '[
    {"description": "Working at height (6-12m typical)", "mitigation": "Use MEWPs (Mobile Elevating Work Platforms), IPAF trained operators, edge protection", "severity": "high"},
    {"description": "Overhead hazards and falling objects", "mitigation": "Cordon off work areas, wear hard hats, use tool lanyards", "severity": "medium"},
    {"description": "Working in operational warehouse", "mitigation": "Coordinate with operations, establish exclusion zones, use banksmen for MEWP movement", "severity": "medium"}
  ]'::jsonb,
  ARRAY['industrial', 'lighting', 'led', 'mewp', 'energy-saving'],
  0
),
(
  'Three-Phase Distribution Board Installation',
  'industrial',
  'Installation of three-phase distribution board for workshop or factory area, including SWA supply cable, MCB protection, and earth electrode system',
  'moderate',
  3,
  'Zap',
  '[
    {
      "phaseName": "Isolation & Preparation",
      "dayStart": 1,
      "dayEnd": 1,
      "tasks": [
        {"text": "Obtain isolation permit from duty electrician", "completed": false},
        {"text": "Isolate and verify dead at supply point", "completed": false},
        {"text": "Mark out cable route and DB position", "completed": false},
        {"text": "Core through walls for cable entry (if required)", "completed": false},
        {"text": "Prepare fixing positions for DB", "completed": false}
      ],
      "materials": [
        {"name": "Three-phase distribution board (12-way)", "quantity": 1, "unit": "each", "ordered": false, "orderBy": "Day 1"}
      ],
      "holdPoints": ["Supply isolation verified and signed off", "Cable route approved"],
      "tradeCoordination": [
        {"trade": "Building Services", "day": 1, "note": "Core drilling if required", "contacted": false}
      ],
      "completed": false
    },
    {
      "phaseName": "Containment & Cable Installation",
      "dayStart": 2,
      "dayEnd": 2,
      "tasks": [
        {"text": "Install SWA cable from supply point to DB", "completed": false},
        {"text": "Install earth electrode system", "completed": false},
        {"text": "Run earth bonding cable", "completed": false},
        {"text": "Fix distribution board to wall", "completed": false},
        {"text": "Terminate SWA glands at DB and supply", "completed": false},
        {"text": "Label all protective devices", "completed": false}
      ],
      "materials": [
        {"name": "25mm² 5-core SWA cable", "quantity": 40, "unit": "m", "ordered": false},
        {"name": "SWA glands 25mm", "quantity": 2, "unit": "each", "ordered": false},
        {"name": "Earth rod kit", "quantity": 1, "unit": "each", "ordered": false},
        {"name": "16mm² earth cable", "quantity": 50, "unit": "m", "ordered": false},
        {"name": "Type C MCBs (various ratings)", "quantity": 12, "unit": "each", "ordered": false},
        {"name": "100mA RCD (if required)", "quantity": 1, "unit": "each", "ordered": false}
      ],
      "completed": false
    },
    {
      "phaseName": "Circuit Wiring & Testing",
      "dayStart": 3,
      "dayEnd": 3,
      "tasks": [
        {"text": "Wire outgoing circuits from DB", "completed": false},
        {"text": "Continuity testing all circuits", "completed": false},
        {"text": "Insulation resistance testing", "completed": false},
        {"text": "Earth loop impedance testing", "completed": false},
        {"text": "RCD testing (if fitted)", "completed": false},
        {"text": "Phasing and rotation verification", "completed": false},
        {"text": "Restore supply and verify operation", "completed": false},
        {"text": "Complete EIC and circuit schedules", "completed": false}
      ],
      "materials": [
        {"name": "EIC certificates", "quantity": 1, "unit": "set", "ordered": false},
        {"name": "Danger/warning labels", "quantity": 5, "unit": "each", "ordered": false}
      ],
      "holdPoints": ["All test results compliant", "Client acceptance"],
      "completed": false
    }
  ]'::jsonb,
  '[
    {"description": "Three-phase supply voltage 400V", "mitigation": "Only competent electricians, proper isolation procedures, voltage indicator checks", "severity": "high"},
    {"description": "Heavy SWA cable handling", "mitigation": "Two-person lift for cable drums, mechanical aids for cable pulling", "severity": "medium"},
    {"description": "Earth electrode installation", "mitigation": "Check for underground services before driving earth rod, use safe working practices", "severity": "medium"}
  ]'::jsonb,
  ARRAY['industrial', 'three-phase', 'distribution-board', 'swa-cable'],
  0
),
(
  'Industrial Machine Isolation & Connection',
  'industrial',
  'Install rotary isolator and connect power supply to industrial machinery, including SWA cable installation, flexible final connection, and safety interlocks',
  'simple',
  2,
  'Power',
  '[
    {
      "phaseName": "Risk Assessment & Planning",
      "dayStart": 1,
      "dayEnd": 1,
      "tasks": [
        {"text": "Review machine electrical requirements", "completed": false},
        {"text": "Complete risk assessment and method statement", "completed": false},
        {"text": "Identify isolation point in distribution system", "completed": false},
        {"text": "Plan cable route from DB to machine", "completed": false},
        {"text": "Obtain permit to work if required", "completed": false}
      ],
      "materials": [],
      "holdPoints": ["Risk assessment approved", "Permit to work issued"],
      "tradeCoordination": [
        {"trade": "Machine Supplier", "day": 1, "note": "Confirm electrical specifications and connection requirements", "contacted": false}
      ],
      "completed": false
    },
    {
      "phaseName": "Isolation & Cable Installation",
      "dayStart": 1,
      "dayEnd": 2,
      "tasks": [
        {"text": "Install rotary isolator near machine", "completed": false},
        {"text": "Run SWA cable from distribution board", "completed": false},
        {"text": "Install flexible conduit for final connection", "completed": false},
        {"text": "Terminate SWA at isolator", "completed": false},
        {"text": "Install emergency stop circuit (if required)", "completed": false},
        {"text": "Connect machine terminal block", "completed": false},
        {"text": "Verify correct phase rotation", "completed": false}
      ],
      "materials": [
        {"name": "63A rotary isolator (3-phase)", "quantity": 1, "unit": "each", "ordered": false, "orderBy": "Day 1"},
        {"name": "10mm² 5-core SWA cable", "quantity": 25, "unit": "m", "ordered": false},
        {"name": "32mm flexible conduit", "quantity": 3, "unit": "m", "ordered": false},
        {"name": "SWA glands", "quantity": 2, "unit": "each", "ordered": false},
        {"name": "Cable glands for flexible", "quantity": 2, "unit": "each", "ordered": false},
        {"name": "Emergency stop button (if req)", "quantity": 1, "unit": "each", "ordered": false}
      ],
      "tradeCoordination": [
        {"trade": "Machine Engineers", "day": 2, "note": "Coordinate final connection and commissioning", "contacted": false}
      ],
      "completed": false
    },
    {
      "phaseName": "Testing & Commissioning",
      "dayStart": 2,
      "dayEnd": 2,
      "tasks": [
        {"text": "Continuity and insulation resistance tests", "completed": false},
        {"text": "Earth loop impedance test", "completed": false},
        {"text": "Verify isolator operation", "completed": false},
        {"text": "Test emergency stop functionality", "completed": false},
        {"text": "Supervised machine power-up", "completed": false},
        {"text": "Verify correct rotation direction", "completed": false},
        {"text": "Complete minor works certificate", "completed": false},
        {"text": "Handover to operations team", "completed": false}
      ],
      "materials": [
        {"name": "Minor works certificate", "quantity": 1, "unit": "set", "ordered": false},
        {"name": "Isolation lock-off kit", "quantity": 1, "unit": "each", "ordered": false},
        {"name": "Warning labels", "quantity": 3, "unit": "each", "ordered": false}
      ],
      "holdPoints": ["All electrical tests pass", "Machine operates correctly", "Client sign-off"],
      "completed": false
    }
  ]'::jsonb,
  '[
    {"description": "High power machinery - potential arc flash", "mitigation": "Use appropriate PPE rated for arc flash, maintain safe distances, follow isolation procedures", "severity": "high"},
    {"description": "Machine movement during testing", "mitigation": "Ensure machine is clear of personnel during power-up, use emergency stops, supervised commissioning only", "severity": "high"},
    {"description": "Incorrect phase rotation", "mitigation": "Verify rotation with phase rotation meter before full power application", "severity": "medium"}
  ]'::jsonb,
  ARRAY['industrial', 'machinery', 'isolator', 'three-phase'],
  0
);