
import { Zap, Shield, BookOpen, Wrench, AlertTriangle, FileText, HardHat, Calculator, Gauge, Building, Settings, Award, Brain } from "lucide-react";

export const flashcardSets = [
  {
    id: "cable-colors",
    title: "Cable Colour Codes",
    icon: Zap,
    description: "UK electrical cable colour identification and applications",
    count: 24,
    difficulty: "beginner" as const,
    estimatedTime: "10-15 min",
    category: "Electrical Theory",
    completed: false,
    cards: [
      { 
        front: "What does a brown cable represent in UK electrical installations?", 
        back: "Live (L) conductor in single phase AC systems",
        category: "AC Systems",
        difficulty: "easy"
      },
      { 
        front: "What does a blue cable represent?", 
        back: "Neutral (N) conductor in AC systems",
        category: "AC Systems",
        difficulty: "easy"
      },
      { 
        front: "What does green/yellow cable represent?", 
        back: "Earth (E) protective conductor - safety connection to ground",
        category: "Safety",
        difficulty: "easy"
      },
      { 
        front: "In a three-phase system, what colour represents L1?", 
        back: "Brown conductor represents L1 (Line 1)",
        category: "Three Phase",
        difficulty: "medium"
      },
      { 
        front: "In a three-phase system, what colour represents L2?", 
        back: "Black conductor represents L2 (Line 2)",
        category: "Three Phase",
        difficulty: "medium"
      },
      { 
        front: "In a three-phase system, what colour represents L3?", 
        back: "Grey conductor represents L3 (Line 3)",
        category: "Three Phase",
        difficulty: "medium"
      },
      { 
        front: "What colour is used for DC positive?", 
        back: "Brown or red for DC positive (+)",
        category: "DC Systems",
        difficulty: "medium"
      },
      { 
        front: "What colour is used for DC negative?", 
        back: "Blue or black for DC negative (-)",
        category: "DC Systems",
        difficulty: "medium"
      },
      { 
        front: "What are the old UK cable colours for single phase?", 
        back: "Red (live), Black (neutral), Green (earth)",
        category: "Historical",
        difficulty: "hard"
      },
      { 
        front: "When did UK cable colours change to current system?", 
        back: "March 2004 - harmonised with European standards",
        category: "Historical",
        difficulty: "hard"
      },
      { 
        front: "What colour coding is used for fire alarm cables?", 
        back: "Red outer sheath with standard internal colours",
        category: "Specialised Systems",
        difficulty: "medium"
      },
      { 
        front: "What colour is typically used for emergency lighting circuits?", 
        back: "White or cream cable identification",
        category: "Specialised Systems",
        difficulty: "medium"
      },
      { 
        front: "In flex cables, what does the brown core connect to?", 
        back: "Live terminal (L) of plugs and appliances",
        category: "Flexible Cables",
        difficulty: "easy"
      },
      { 
        front: "What is the colour sequence for 5-core cable?", 
        back: "Brown, Black, Grey (lives), Blue (neutral), Green/Yellow (earth)",
        category: "Multi-core",
        difficulty: "hard"
      },
      { 
        front: "What does orange cable typically indicate?", 
        back: "High voltage or special circuits (not standard domestic)",
        category: "Specialised Systems",
        difficulty: "hard"
      },
      { 
        front: "How should you identify circuits with same colour cables?", 
        back: "Use cable markers, labels, or sleeve identification",
        category: "Installation Practice",
        difficulty: "medium"
      },
      { 
        front: "What colour is used for switched live in lighting circuits?", 
        back: "Brown - but must be clearly identified at both ends",
        category: "Lighting Circuits",
        difficulty: "medium"
      },
      { 
        front: "In two-way switching, how are strappers identified?", 
        back: "Usually brown and black cores with clear labelling",
        category: "Lighting Circuits",
        difficulty: "hard"
      },
      { 
        front: "What's the minimum cable size for ring final circuits?", 
        back: "2.5mm² twin and earth cable",
        category: "Ring Circuits",
        difficulty: "medium"
      },
      { 
        front: "What does violet/purple cable indicate in data installations?", 
        back: "Category 6 or higher data cables",
        category: "Data Systems",
        difficulty: "hard"
      },
      { 
        front: "How should borrowed neutrals be avoided?", 
        back: "Each circuit must have its own neutral conductor",
        category: "Safety",
        difficulty: "medium"
      },
      { 
        front: "What's the purpose of a functional earth?", 
        back: "For equipment operation, not safety (uses green/yellow)",
        category: "Earthing",
        difficulty: "hard"
      },
      { 
        front: "In motor circuits, what identifies the phases?", 
        back: "L1 (Brown), L2 (Black), L3 (Grey) with clear terminal marking",
        category: "Motor Circuits",
        difficulty: "medium"
      },
      { 
        front: "What cable colour indicates a 110V construction supply?", 
        back: "Yellow outer sheath typically used for 110V systems",
        category: "Construction",
        difficulty: "medium"
      }
    ]
  },
  {
    id: "eicr-codes",
    title: "EICR Observation Codes",
    icon: FileText,
    description: "Electrical Installation Condition Report classification codes",
    count: 20,
    difficulty: "intermediate" as const,
    estimatedTime: "12-18 min",
    category: "Testing & Inspection",
    completed: false,
    cards: [
      { 
        front: "What does C1 observation code mean?", 
        back: "Danger present - immediate remedial action required",
        category: "Critical",
        difficulty: "easy"
      },
      { 
        front: "What does C2 observation code mean?", 
        back: "Potentially dangerous - urgent remedial action required",
        category: "Urgent",
        difficulty: "easy"
      },
      { 
        front: "What does C3 observation code mean?", 
        back: "Improvement recommended to enhance safety",
        category: "Advisory",
        difficulty: "easy"
      },
      { 
        front: "What does FI observation code mean?", 
        back: "Further Investigation required without delay",
        category: "Investigation",
        difficulty: "medium"
      },
      { 
        front: "What action is required for a C1 code?", 
        back: "Immediate disconnection and remedial work before re-energising",
        category: "Action Required",
        difficulty: "medium"
      },
      { 
        front: "Can an installation be certified as satisfactory with C2 codes?", 
        back: "No - urgent remedial action must be taken before certification",
        category: "Certification",
        difficulty: "medium"
      },
      { 
        front: "What is the maximum time frame for addressing C1 defects?", 
        back: "Immediate - installation should be made safe without delay",
        category: "Timeframes",
        difficulty: "hard"
      },
      { 
        front: "Can C3 codes prevent satisfactory certification?", 
        back: "No - but they should be recorded and improvement recommended",
        category: "Certification",
        difficulty: "medium"
      },
      { 
        front: "What should be done if an FI code cannot be investigated?", 
        back: "Recommend specialist investigation and record limitations",
        category: "Investigation",
        difficulty: "hard"
      },
      { 
        front: "Who can authorise energising after C1 remedial work?", 
        back: "Only the qualified person who verified the remedial work",
        category: "Authorisation",
        difficulty: "hard"
      },
      { 
        front: "What code would you give for missing RCD protection?", 
        back: "Usually C2 - potentially dangerous, urgent action required",
        category: "Examples",
        difficulty: "medium"
      },
      { 
        front: "How should multiple similar defects be recorded?", 
        back: "Each defect should be individually recorded with clear location",
        category: "Recording",
        difficulty: "medium"
      },
      { 
        front: "What code for inadequate earthing arrangements?", 
        back: "Typically C1 or C2 depending on level of danger present",
        category: "Examples",
        difficulty: "hard"
      },
      { 
        front: "Must all C3 items be listed on the EICR?", 
        back: "Yes - all observations should be recorded regardless of code",
        category: "Recording",
        difficulty: "medium"
      },
      { 
        front: "What if access is limited during inspection?", 
        back: "Use FI code and clearly record limitations in report",
        category: "Limitations",
        difficulty: "medium"
      },
      { 
        front: "Can you give a C2 for non-compliance with current regs?", 
        back: "Only if it presents potential danger - age alone isn't sufficient",
        category: "Assessment",
        difficulty: "hard"
      },
      { 
        front: "What code for damaged cable insulation?", 
        back: "Usually C1 or C2 depending on extent and location of damage",
        category: "Examples",
        difficulty: "medium"
      },
      { 
        front: "How long should EICR records be kept?", 
        back: "Minimum duration of certificate plus additional period for liability",
        category: "Record Keeping",
        difficulty: "hard"
      },
      { 
        front: "What qualifications needed to classify defects?", 
        back: "Appropriate inspection and testing qualifications (e.g., 2391)",
        category: "Competence",
        difficulty: "medium"
      },
      { 
        front: "What code for missing emergency lighting testing?", 
        back: "FI - further investigation into testing records required",
        category: "Examples",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "safety-signs",
    title: "Electrical Safety Signs",
    icon: Shield,
    description: "Warning signs, symbols and their meanings in electrical work",
    count: 18,
    difficulty: "beginner" as const,
    estimatedTime: "8-12 min",
    category: "Health & Safety",
    completed: false,
    cards: [
      { 
        front: "What does a red circular sign with diagonal line mean?", 
        back: "Prohibition - something must not be done",
        category: "Prohibition",
        difficulty: "easy"
      },
      { 
        front: "What does a yellow triangular sign mean?", 
        back: "Warning of hazard or danger",
        category: "Warning",
        difficulty: "easy"
      },
      { 
        front: "What does a blue circular sign mean?", 
        back: "Mandatory action required",
        category: "Mandatory",
        difficulty: "easy"
      },
      { 
        front: "What does a green rectangular sign mean?", 
        back: "Safe condition or emergency information",
        category: "Safe Condition",
        difficulty: "easy"
      },
      { 
        front: "What does the 'Danger High Voltage' sign indicate?", 
        back: "Risk of electric shock from high voltage equipment",
        category: "Electrical Hazard",
        difficulty: "easy"
      },
      { 
        front: "What voltage is considered 'high voltage' in UK?", 
        back: "Above 1000V AC or 1500V DC",
        category: "Voltage Classification",
        difficulty: "medium"
      },
      { 
        front: "What does the lightning bolt symbol indicate?", 
        back: "Electrical hazard or risk of electric shock",
        category: "Electrical Hazard",
        difficulty: "easy"
      },
      { 
        front: "When must 'Electrical Hazard' signs be displayed?", 
        back: "Where electrical equipment poses risk to persons",
        category: "Requirements",
        difficulty: "medium"
      },
      { 
        front: "What sign indicates isolation point?", 
        back: "Green and white sign showing isolation symbol",
        category: "Isolation",
        difficulty: "medium"
      },
      { 
        front: "What does 'DANGER - DO NOT OPERATE' sign mean?", 
        back: "Equipment being worked on - do not energise",
        category: "Isolation",
        difficulty: "medium"
      },
      { 
        front: "Who can remove danger tags from equipment?", 
        back: "Only the person who placed them or authorised deputy",
        category: "Lock-out Tag-out",
        difficulty: "hard"
      },
      { 
        front: "What colour is used for fire equipment signs?", 
        back: "Red background with white symbols",
        category: "Fire Safety",
        difficulty: "easy"
      },
      { 
        front: "What does the 'No Smoking' sign look like?", 
        back: "Red circle with diagonal line through cigarette symbol",
        category: "Prohibition",
        difficulty: "easy"
      },
      { 
        front: "When is mandatory PPE signage required?", 
        back: "Where risk assessment identifies PPE as necessary",
        category: "PPE Requirements",
        difficulty: "medium"
      },
      { 
        front: "What information must be on electrical warning signs?", 
        back: "Nature of hazard, voltage level where applicable",
        category: "Sign Requirements",
        difficulty: "hard"
      },
      { 
        front: "What sign indicates automatic reclosing equipment?", 
        back: "Warning sign stating 'DANGER - Auto Reclosing Equipment'",
        category: "Automatic Systems",
        difficulty: "hard"
      },
      { 
        front: "How often should safety signs be inspected?", 
        back: "Regularly as part of routine maintenance programme",
        category: "Maintenance",
        difficulty: "medium"
      },
      { 
        front: "What size should safety signs be?", 
        back: "Large enough to be clearly visible and legible from normal viewing distance",
        category: "Sign Standards",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "tools-equipment",
    title: "Electrical Tools & Equipment",
    icon: Wrench,
    description: "Essential tools, their uses and safety considerations",
    count: 25,
    difficulty: "beginner" as const,
    estimatedTime: "15-20 min",
    category: "Tools & Equipment",
    completed: false,
    cards: [
      { 
        front: "What is a multimeter used for?", 
        back: "Measuring voltage, current, resistance and continuity",
        category: "Testing Equipment",
        difficulty: "easy"
      },
      { 
        front: "What safety feature should be checked on electrical tools?", 
        back: "PAT testing labels and visual inspection for damage",
        category: "Tool Safety",
        difficulty: "easy"
      },
      { 
        front: "What is an insulation tester used for?", 
        back: "Testing insulation resistance between conductors",
        category: "Testing Equipment",
        difficulty: "medium"
      },
      { 
        front: "What test voltage is used for domestic insulation testing?", 
        back: "500V DC for circuits up to 500V nominal",
        category: "Testing Procedures",
        difficulty: "medium"
      },
      { 
        front: "What is an RCD tester used for?", 
        back: "Testing RCD trip times and operating currents",
        category: "Testing Equipment",
        difficulty: "medium"
      },
      { 
        front: "What should you check before using electrical test equipment?", 
        back: "Calibration date, physical condition, battery level, test leads",
        category: "Pre-use Checks",
        difficulty: "medium"
      },
      { 
        front: "What is the purpose of a proving unit?", 
        back: "To verify test instruments are working correctly",
        category: "Testing Equipment",
        difficulty: "medium"
      },
      { 
        front: "When should test equipment be calibrated?", 
        back: "Annually or as specified by manufacturer",
        category: "Calibration",
        difficulty: "hard"
      },
      { 
        front: "What is a continuity tester used for?", 
        back: "Checking electrical connections and conductor integrity",
        category: "Testing Equipment",
        difficulty: "easy"
      },
      { 
        front: "What voltage should continuity testing use?", 
        back: "Between 4V and 24V DC with minimum 200mA",
        category: "Testing Procedures",
        difficulty: "hard"
      },
      { 
        front: "What is a clamp meter used for?", 
        back: "Measuring current without breaking the circuit",
        category: "Testing Equipment",
        difficulty: "medium"
      },
      { 
        front: "What safety precaution when using voltage detectors?", 
        back: "Always prove on known live source before and after use",
        category: "Safety Procedures",
        difficulty: "medium"
      },
      { 
        front: "What is a cable avoidance tool (CAT) used for?", 
        back: "Locating buried cables and pipes before excavation",
        category: "Location Equipment",
        difficulty: "medium"
      },
      { 
        front: "What tool is used for crimping terminals?", 
        back: "Crimping tool or ratchet crimper",
        category: "Hand Tools",
        difficulty: "easy"
      },
      { 
        front: "When should insulated tools be used?", 
        back: "When working on or near live conductors",
        category: "Insulated Tools",
        difficulty: "medium"
      },
      { 
        front: "What standard covers insulated tools?", 
        back: "BS EN 60900 - Live working tools up to 1000V",
        category: "Standards",
        difficulty: "hard"
      },
      { 
        front: "What is a fish tape used for?", 
        back: "Drawing cables through conduit and ducting",
        category: "Installation Tools",
        difficulty: "easy"
      },
      { 
        front: "How often should test leads be visually inspected?", 
        back: "Before each use and formally at regular intervals",
        category: "Test Lead Safety",
        difficulty: "medium"
      },
      { 
        front: "What is thermal imaging used for in electrical work?", 
        back: "Detecting hot spots, loose connections, overloaded circuits",
        category: "Diagnostic Equipment",
        difficulty: "hard"
      },
      { 
        front: "What tool measures earth electrode resistance?", 
        back: "Earth electrode resistance tester",
        category: "Earthing Testing",
        difficulty: "medium"
      },
      { 
        front: "What is a torque screwdriver used for?", 
        back: "Tightening connections to specified torque values",
        category: "Precision Tools",
        difficulty: "medium"
      },
      { 
        front: "When might you use a high voltage detector?", 
        back: "Before working on HV equipment to confirm dead",
        category: "HV Equipment",
        difficulty: "hard"
      },
      { 
        front: "What is the purpose of lock-out devices?", 
        back: "Preventing accidental re-energisation during work",
        category: "Safety Equipment",
        difficulty: "medium"
      },
      { 
        front: "What should be done with damaged test equipment?", 
        back: "Remove from use immediately and arrange repair/replacement",
        category: "Equipment Management",
        difficulty: "medium"
      },
      { 
        front: "What is a loop impedance tester used for?", 
        back: "Measuring Zs (earth fault loop impedance) values",
        category: "Testing Equipment",
        difficulty: "medium"
      }
    ]
  },
  {
    id: "regulations-bs7671",
    title: "BS 7671 Regulations",
    icon: BookOpen,
    description: "Key requirements from the IET Wiring Regulations",
    count: 30,
    difficulty: "advanced" as const,
    estimatedTime: "20-30 min",
    category: "Regulations",
    completed: false,
    cards: [
      { 
        front: "What is the minimum insulation resistance for circuits up to 500V?", 
        back: "1.0 MΩ (megohm) at 500V DC test voltage",
        category: "Testing Requirements",
        difficulty: "medium"
      },
      { 
        front: "What does Part P of Building Regulations cover?", 
        back: "Electrical safety in dwellings - notification requirements",
        category: "Building Regulations",
        difficulty: "medium"
      },
      { 
        front: "What is the maximum Zs value for a 32A Type B MCB?", 
        back: "1.44Ω for a 32A Type B circuit breaker",
        category: "Circuit Protection",
        difficulty: "hard"
      },
      { 
        front: "What is the minimum cable size for a ring final circuit?", 
        back: "2.5mm² for 30A/32A ring final circuits",
        category: "Cable Sizing",
        difficulty: "medium"
      },
      { 
        front: "What RCD rating is required for socket outlets?", 
        back: "30mA RCD protection for all socket outlets",
        category: "RCD Protection",
        difficulty: "medium"
      },
      { 
        front: "What is the maximum disconnection time for a 230V circuit?", 
        back: "0.4 seconds for final circuits, 5 seconds for distribution",
        category: "Disconnection Times",
        difficulty: "hard"
      },
      { 
        front: "What zones exist in a bathroom according to BS 7671?", 
        back: "Zone 0, Zone 1, Zone 2, and outside zones",
        category: "Special Locations",
        difficulty: "medium"
      },
      { 
        front: "What IP rating is required for bathroom Zone 1?", 
        back: "Minimum IPX4 (protection against water splashing)",
        category: "Special Locations",
        difficulty: "hard"
      },
      { 
        front: "What is the minimum height for socket outlets?", 
        back: "450mm above floor level (unless specific circumstances apply)",
        category: "Installation Heights",
        difficulty: "medium"
      },
      { 
        front: "How often should an EICR be carried out for rental properties?", 
        back: "At least every 5 years or at change of tenancy",
        category: "Inspection Intervals",
        difficulty: "medium"
      },
      { 
        front: "What is the voltage drop limit for lighting circuits?", 
        back: "3% of nominal voltage (6.9V for 230V circuits)",
        category: "Voltage Drop",
        difficulty: "hard"
      },
      { 
        front: "What is the voltage drop limit for power circuits?", 
        back: "5% of nominal voltage (11.5V for 230V circuits)",
        category: "Voltage Drop",
        difficulty: "hard"
      },
      { 
        front: "What is supplementary bonding?", 
        back: "Additional bonding to reduce potential differences in special locations",
        category: "Earthing & Bonding",
        difficulty: "hard"
      },
      { 
        front: "When is RCD protection required for buried cables?", 
        back: "Cables buried less than 500mm deep without mechanical protection",
        category: "Cable Protection",
        difficulty: "hard"
      },
      { 
        front: "What is the maximum length for a lighting circuit?", 
        back: "No specific limit - determined by voltage drop and protection",
        category: "Circuit Design",
        difficulty: "medium"
      },
      { 
        front: "What test current is used for RCD testing?", 
        back: "½ × IΔn, 1 × IΔn, and 5 × IΔn",
        category: "RCD Testing",
        difficulty: "hard"
      },
      { 
        front: "What is the purpose of main equipotential bonding?", 
        back: "To reduce potential differences between metallic services",
        category: "Earthing & Bonding",
        difficulty: "medium"
      },
      { 
        front: "What size bonding conductor for 25mm² main earthing conductor?", 
        back: "16mm² copper bonding conductor minimum",
        category: "Earthing & Bonding",
        difficulty: "hard"
      },
      { 
        front: "What is a TN-C-S earthing system?", 
        back: "Combined neutral and earth conductor from supply, separate in installation",
        category: "Earthing Systems",
        difficulty: "hard"
      },
      { 
        front: "What protection is required for cables in partition walls?", 
        back: "RCD protection if cables are not mechanically protected",
        category: "Cable Protection",
        difficulty: "medium"
      },
      { 
        front: "What is the maximum operating temperature for PVC cables?", 
        back: "70°C for normal PVC insulated cables",
        category: "Cable Ratings",
        difficulty: "medium"
      },
      { 
        front: "What is diversity in electrical design?", 
        back: "Allowance that not all loads operate simultaneously",
        category: "Load Calculations",
        difficulty: "medium"
      },
      { 
        front: "What is the standard height for switches and controls?", 
        back: "Between 750mm and 1200mm above floor level",
        category: "Accessibility",
        difficulty: "medium"
      },
      { 
        front: "When is arc fault protection required?", 
        back: "Recommended for final circuits in certain premises types",
        category: "Arc Fault Protection",
        difficulty: "hard"
      },
      { 
        front: "What is the purpose of emergency lighting?", 
        back: "To provide illumination when normal lighting fails",
        category: "Emergency Systems",
        difficulty: "easy"
      },
      { 
        front: "What test is carried out first during initial verification?", 
        back: "Continuity of protective conductors",
        category: "Testing Sequence",
        difficulty: "medium"
      },
      { 
        front: "What is the minimum cross-sectional area for a main earthing conductor?", 
        back: "16mm² copper (or calculated based on supply conductor)",
        category: "Earthing & Bonding",
        difficulty: "hard"
      },
      { 
        front: "What is the purpose of a safety service?", 
        back: "To safeguard or warn of dangers to human life",
        category: "Safety Services",
        difficulty: "medium"
      },
      { 
        front: "What colour must emergency stop buttons be?", 
        back: "Red actuator on yellow background",
        category: "Emergency Controls",
        difficulty: "medium"
      },
      { 
        front: "What is the maximum earth fault loop impedance for a 6A Type B MCB?", 
        back: "7.67Ω (at normal operating temperature)",
        category: "Circuit Protection",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "emergency-procedures",
    title: "Emergency Procedures",
    icon: AlertTriangle,
    description: "Emergency response and first aid for electrical incidents",
    count: 16,
    difficulty: "intermediate" as const,
    estimatedTime: "10-15 min",
    category: "Emergency Response",
    completed: false,
    cards: [
      { 
        front: "First action when someone receives an electric shock?", 
        back: "Switch off power supply or isolate the person safely",
        category: "Electric Shock",
        difficulty: "easy"
      },
      { 
        front: "What should you never use on an electrical fire?", 
        back: "Water - use CO2 or dry powder fire extinguisher",
        category: "Fire Safety",
        difficulty: "easy"
      },
      { 
        front: "Emergency contact number in the UK?", 
        back: "999 for emergency services (fire, police, ambulance)",
        category: "Emergency Contacts",
        difficulty: "easy"
      },
      { 
        front: "How do you safely remove someone from live electrical contact?", 
        back: "Use non-conductive material or switch off supply first",
        category: "Electric Shock",
        difficulty: "medium"
      },
      { 
        front: "What is the recovery position used for?", 
        back: "Unconscious person who is breathing normally",
        category: "First Aid",
        difficulty: "medium"
      },
      { 
        front: "When should CPR be started?", 
        back: "When person is unconscious and not breathing normally",
        category: "First Aid",
        difficulty: "medium"
      },
      { 
        front: "What is the CPR compression rate?", 
        back: "100-120 compressions per minute",
        category: "First Aid",
        difficulty: "hard"
      },
      { 
        front: "What should you do if you cannot isolate electrical supply?", 
        back: "Call emergency services and keep everyone away from danger",
        category: "Emergency Response",
        difficulty: "medium"
      },
      { 
        front: "What type of burns can electrical contact cause?", 
        back: "Entry and exit burns, plus internal tissue damage",
        category: "Electric Shock",
        difficulty: "hard"
      },
      { 
        front: "How should electrical burns be treated?", 
        back: "Cool with water, cover with sterile dressing, seek medical help",
        category: "First Aid",
        difficulty: "medium"
      },
      { 
        front: "What information should you give emergency services?", 
        back: "Location, nature of emergency, number of casualties, hazards present",
        category: "Emergency Response",
        difficulty: "medium"
      },
      { 
        front: "What is the voltage threshold for automatic emergency response?", 
        back: "Above 1000V AC typically requires specialist emergency response",
        category: "High Voltage",
        difficulty: "hard"
      },
      { 
        front: "How long should you continue CPR?", 
        back: "Until emergency services arrive or person recovers",
        category: "First Aid",
        difficulty: "medium"
      },
      { 
        front: "What should you check before approaching electrical emergency?", 
        back: "That power is isolated and area is safe to approach",
        category: "Safety Assessment",
        difficulty: "medium"
      },
      { 
        front: "What is the danger of arc flash?", 
        back: "Intense heat, light, and pressure wave causing severe injuries",
        category: "Arc Flash",
        difficulty: "hard"
      },
      { 
        front: "Who should perform rescue from electrical incidents?", 
        back: "Only trained personnel with appropriate safety equipment",
        category: "Rescue Procedures",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "calculation-methods",
    title: "Electrical Calculations",
    icon: Calculator,
    description: "Essential formulas and calculation methods for electrical work",
    count: 22,
    difficulty: "advanced" as const,
    estimatedTime: "18-25 min",
    category: "Calculations",
    completed: false,
    cards: [
      { 
        front: "What is Ohm's Law?", 
        back: "V = I × R (Voltage = Current × Resistance)",
        category: "Basic Laws",
        difficulty: "easy"
      },
      { 
        front: "How do you calculate electrical power?", 
        back: "P = V × I (Power = Voltage × Current)",
        category: "Power Calculations",
        difficulty: "easy"
      },
      { 
        front: "What is the formula for calculating cable current carrying capacity?", 
        back: "It = Iz ÷ (Ca × Cc × Ci × Cs)",
        category: "Cable Sizing",
        difficulty: "hard"
      },
      { 
        front: "How do you calculate voltage drop in a cable?", 
        back: "Vd = (mV/A/m × Ib × L) ÷ 1000",
        category: "Voltage Drop",
        difficulty: "hard"
      },
      { 
        front: "What is the diversity formula for socket outlets?", 
        back: "100% of first 10A + 40% of remaining load",
        category: "Diversity",
        difficulty: "medium"
      },
      { 
        front: "How do you calculate three-phase power?", 
        back: "P = √3 × VL × IL × cos φ",
        category: "Three Phase",
        difficulty: "hard"
      },
      { 
        front: "What is the formula for calculating earth fault loop impedance?", 
        back: "Zs = Ze + (R1 + R2)",
        category: "Testing Calculations",
        difficulty: "medium"
      },
      { 
        front: "How do you calculate the required CSA of protective conductor?", 
        back: "S = √(I²t) ÷ k (adiabatic equation)",
        category: "Protective Conductors",
        difficulty: "hard"
      },
      { 
        front: "What is the formula for calculating prospective fault current?", 
        back: "If = U0 ÷ Zs",
        category: "Fault Calculations",
        difficulty: "medium"
      },
      { 
        front: "How do you calculate conduit fill percentage?", 
        back: "(Total cable CSA ÷ Internal conduit CSA) × 100",
        category: "Installation Calculations",
        difficulty: "medium"
      },
      { 
        front: "What is the formula for calculating impedance in AC circuits?", 
        back: "Z = √(R² + X²) where X is reactance",
        category: "AC Theory",
        difficulty: "hard"
      },
      { 
        front: "How do you calculate the rating of a protective device?", 
        back: "In ≥ Ib and In ≤ Iz (considering correction factors)",
        category: "Protection Selection",
        difficulty: "medium"
      },
      { 
        front: "What is the formula for calculating motor full load current?", 
        back: "FLC = kW × 1000 ÷ (√3 × V × η × cos φ)",
        category: "Motor Calculations",
        difficulty: "hard"
      },
      { 
        front: "How do you calculate lighting load for design?", 
        back: "Watts per m² × floor area (plus specific point loads)",
        category: "Lighting Design",
        difficulty: "medium"
      },
      { 
        front: "What is the temperature correction factor formula?", 
        back: "Ct = √[(θ₂ - θₐ) ÷ (θ₁ - θₐ)]",
        category: "Correction Factors",
        difficulty: "hard"
      },
      { 
        front: "How do you calculate the maximum demand of an installation?", 
        back: "Sum of all loads after applying appropriate diversity factors",
        category: "Load Calculations",
        difficulty: "medium"
      },
      { 
        front: "What is the formula for cable resistance at operating temperature?", 
        back: "R₂ = R₁ × [1 + α(θ₂ - θ₁)]",
        category: "Temperature Effects",
        difficulty: "hard"
      },
      { 
        front: "How do you calculate earthing conductor size?", 
        back: "Based on largest phase conductor or calculated using adiabatic equation",
        category: "Earthing Calculations",
        difficulty: "medium"
      },
      { 
        front: "What is the formula for calculating kVA from kW?", 
        back: "kVA = kW ÷ power factor (cos φ)",
        category: "Power Factor",
        difficulty: "medium"
      },
      { 
        front: "How do you calculate the number of cables in a conduit?", 
        back: "Consider cable diameter and conduit fill factors per BS 7671",
        category: "Installation Design",
        difficulty: "medium"
      },
      { 
        front: "What is the formula for calculating RCD operating time?", 
        back: "t = 40ms at 5 × IΔn (for general purpose RCDs)",
        category: "RCD Calculations",
        difficulty: "hard"
      },
      { 
        front: "How do you calculate short circuit withstand for cables?", 
        back: "I²t = k²S² (where k is material constant)",
        category: "Short Circuit",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "testing-procedures",
    title: "Testing Procedures",
    icon: Gauge,
    description: "Step-by-step electrical testing and inspection procedures",
    count: 20,
    difficulty: "intermediate" as const,
    estimatedTime: "15-20 min",
    category: "Testing & Inspection",
    completed: false,
    cards: [
      { 
        front: "What is the correct sequence for initial verification tests?", 
        back: "1. Continuity 2. Insulation 3. Polarity 4. Earth fault loop 5. RCD",
        category: "Test Sequence",
        difficulty: "medium"
      },
      { 
        front: "What test voltage is used for insulation resistance testing?", 
        back: "500V DC for circuits up to 500V nominal voltage",
        category: "Insulation Testing",
        difficulty: "medium"
      },
      { 
        front: "How long should insulation test voltage be applied?", 
        back: "Minimum of 1 minute for stable reading",
        category: "Insulation Testing",
        difficulty: "medium"
      },
      { 
        front: "What is the minimum acceptable insulation resistance?", 
        back: "1.0 MΩ for circuits up to 500V",
        category: "Insulation Testing",
        difficulty: "medium"
      },
      { 
        front: "How do you test continuity of ring final circuit conductors?", 
        back: "R1 + R2 test at each socket outlet on the ring",
        category: "Continuity Testing",
        difficulty: "hard"
      },
      { 
        front: "What current should continuity testing use?", 
        back: "Between 4V and 24V DC with minimum 200mA",
        category: "Continuity Testing",
        difficulty: "hard"
      },
      { 
        front: "How do you verify polarity of socket outlets?", 
        back: "Test between live and earth at each outlet",
        category: "Polarity Testing",
        difficulty: "medium"
      },
      { 
        front: "What test currents are used for RCD testing?", 
        back: "½ × IΔn, 1 × IΔn, and 5 × IΔn",
        category: "RCD Testing",
        difficulty: "medium"
      },
      { 
        front: "What is the maximum RCD disconnection time at 1 × IΔn?", 
        back: "300ms for general purpose RCDs",
        category: "RCD Testing",
        difficulty: "hard"
      },
      { 
        front: "What is the maximum RCD disconnection time at 5 × IΔn?", 
        back: "40ms for general purpose RCDs",
        category: "RCD Testing",
        difficulty: "hard"
      },
      { 
        front: "How do you test earth fault loop impedance?", 
        back: "Connect tester between live and earth at furthest point",
        category: "Earth Fault Loop",
        difficulty: "medium"
      },
      { 
        front: "What safety precautions for earth fault loop testing?", 
        back: "Ensure RCD is temporarily disconnected or use no-trip tester",
        category: "Testing Safety",
        difficulty: "medium"
      },
      { 
        front: "How do you test a lighting circuit with two-way switching?", 
        back: "Test continuity with switches in different positions",
        category: "Lighting Testing",
        difficulty: "hard"
      },
      { 
        front: "What is the purpose of functional testing?", 
        back: "To verify that equipment operates correctly",
        category: "Functional Testing",
        difficulty: "easy"
      },
      { 
        front: "When should you disconnect equipment before testing?", 
        back: "Before insulation resistance testing to protect sensitive equipment",
        category: "Equipment Protection",
        difficulty: "medium"
      },
      { 
        front: "How do you test the effectiveness of supplementary bonding?", 
        back: "Measure resistance between bonded metalwork",
        category: "Bonding Testing",
        difficulty: "hard"
      },
      { 
        front: "What is the maximum resistance for supplementary bonding?", 
        back: "0.05Ω for supplementary bonding connections",
        category: "Bonding Testing",
        difficulty: "hard"
      },
      { 
        front: "How often should portable appliances be tested?", 
        back: "Depends on risk assessment and type of equipment",
        category: "PAT Testing",
        difficulty: "medium"
      },
      { 
        front: "What tests are required for emergency lighting?", 
        back: "Functional test, duration test, and annual full discharge test",
        category: "Emergency Lighting",
        difficulty: "medium"
      },
      { 
        front: "How do you verify phase sequence in three-phase systems?", 
        back: "Use phase sequence tester or rotation meter",
        category: "Three Phase Testing",
        difficulty: "hard"
      }
    ]
  }
];
