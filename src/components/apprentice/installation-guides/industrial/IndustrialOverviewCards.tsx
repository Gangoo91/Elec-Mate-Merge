
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Factory,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  BadgePoundSterling,
  Users,
  Book,
  Wrench,
  HardHat,
  Cog,
  Building2,
  Warehouse,
  Flame,
  Droplets,
  Thermometer,
  Lightbulb,
  CircuitBoard,
  Truck,
  Wind,
  GraduationCap,
  TrendingUp,
  Info,
  Box,
  BatteryCharging,
  Snowflake,
  Lock,
  FlaskConical,
  Utensils,
  Pill,
  Waves
} from "lucide-react";

const IndustrialOverviewCards = () => {
  // Quick Stats
  const overviewStats = [
    { label: "Average Project Duration", value: "2-8 weeks", icon: Clock },
    { label: "Typical Budget Range", value: "£20,000-£200,000+", icon: BadgePoundSterling },
    { label: "Skill Level Required", value: "Expert", icon: Users },
    { label: "Certifications Required", value: "CompEx + IECEx", icon: Book }
  ];

  // What is Industrial Electrical Work
  const industrialBackground = {
    title: "What is Industrial Electrical Work?",
    definition: "Industrial electrical work involves the installation, maintenance, and repair of electrical systems in manufacturing plants, processing facilities, warehouses, and heavy industry environments. It typically involves higher voltages, larger equipment, and more complex control systems than domestic or commercial work.",
    premises: [
      { type: "Manufacturing Plants", description: "Factories producing goods using production lines, assembly systems, and automated machinery", examples: "Car plants, electronics assembly, textile mills" },
      { type: "Processing Facilities", description: "Plants that process raw materials into finished products", examples: "Food processing, chemical plants, refineries" },
      { type: "Warehousing", description: "Large storage and distribution centres with automated handling systems", examples: "Amazon fulfilment centres, cold storage, logistics hubs" },
      { type: "Heavy Industry", description: "Large-scale industrial operations handling raw materials", examples: "Steel works, foundries, mining operations" }
    ],
    differences: [
      { aspect: "Voltage Levels", commercial: "230V single-phase, 400V 3-phase", industrial: "400V, 690V, 3.3kV, 11kV, 33kV" },
      { aspect: "Motor Sizes", commercial: "Up to 7.5kW typically", industrial: "From 7.5kW to several MW" },
      { aspect: "Hazards", commercial: "Standard electrical risks", industrial: "Explosive atmospheres, arc flash, heavy machinery, chemicals" },
      { aspect: "Control Systems", commercial: "Basic switching, timers", industrial: "PLCs, SCADA, DCS, complex automation" },
      { aspect: "Certification", commercial: "Part P, EIC/EICR", industrial: "CompEx, IECEx, authorised person training" }
    ]
  };

  // Career Paths
  const careerPaths = {
    title: "Career Paths in Industrial Electrical",
    paths: [
      {
        role: "Industrial Maintenance Electrician",
        description: "Maintain and repair electrical systems in operating factories. Involves fault-finding, preventive maintenance, and emergency repairs.",
        salary: "£32,000 - £45,000",
        skills: ["Fault diagnosis", "Motor control", "PLC basics", "Preventive maintenance"],
        progression: "Senior Technician, Maintenance Manager"
      },
      {
        role: "Project Electrician",
        description: "Work on new installations and major upgrades. Install new production lines, motor control centres, and distribution systems.",
        salary: "£35,000 - £50,000",
        skills: ["Cable installation", "Panel building", "System commissioning", "Technical drawings"],
        progression: "Project Supervisor, Contracts Manager"
      },
      {
        role: "Controls Engineer",
        description: "Specialise in PLC programming, SCADA systems, and automation. Design and implement control strategies for industrial processes.",
        salary: "£40,000 - £65,000",
        skills: ["PLC programming", "HMI design", "Network protocols", "Process control"],
        progression: "Senior Controls Engineer, Automation Manager"
      },
      {
        role: "High Voltage Authorised Person",
        description: "Work on HV systems (11kV, 33kV). Includes switchgear operations, transformer maintenance, and HV cable installations.",
        salary: "£45,000 - £70,000",
        skills: ["HV switching", "Protection systems", "Transformer maintenance", "Safety coordination"],
        progression: "Senior Authorised Person, HV Operations Manager"
      },
      {
        role: "Hazardous Area Specialist",
        description: "Work in explosive atmospheres (ATEX zones). Requires CompEx certification and specialised equipment knowledge.",
        salary: "£42,000 - £65,000",
        skills: ["ATEX regulations", "Ex equipment", "Zone classification", "Inspection techniques"],
        progression: "ATEX Consultant, Safety Engineer"
      }
    ]
  };

  // Manufacturing Facilities
  const manufacturingContent = {
    title: "Manufacturing Facilities",
    productionLines: {
      subtitle: "Production Line Electrical Systems",
      description: "Production lines require coordinated electrical systems that control multiple machines working in sequence. Understanding interlocking, sequencing, and safety circuits is essential.",
      components: [
        { name: "Conveyor Systems", voltage: "400V 3-phase", control: "VFD with encoder feedback", safety: "E-stop chain, light curtains" },
        { name: "Assembly Stations", voltage: "230V single-phase", control: "PLC I/O modules", safety: "Local isolation, two-hand controls" },
        { name: "Robotic Cells", voltage: "400V 3-phase", control: "Robot controller + PLC", safety: "Safety PLC, area scanners" },
        { name: "Quality Testing", voltage: "230V single-phase", control: "PC-based DAQ", safety: "Interlocked access" }
      ]
    },
    mcc: {
      subtitle: "Motor Control Centres (MCCs)",
      description: "MCCs are centralised assemblies containing motor starters, protection devices, and control equipment. They provide a safe, organised way to control multiple motors from one location.",
      components: [
        { item: "Incoming Section", function: "Main isolator, metering, protection relays" },
        { item: "Distribution Busbars", function: "Copper or aluminium busbars rated for full load current" },
        { item: "Motor Starter Drawers", function: "Individual motor starters with isolation capability" },
        { item: "Control Section", function: "PLC rack, I/O modules, power supplies" }
      ],
      starterTypes: [
        { type: "DOL (Direct On Line)", use: "Motors up to 7.5kW", characteristics: "Simple, high starting current (6-8x FLC)" },
        { type: "Star-Delta", use: "Motors 7.5kW - 30kW", characteristics: "Reduced starting current (33%), torque dip on changeover" },
        { type: "Soft Starter", use: "Motors 15kW+", characteristics: "Smooth acceleration, reduced mechanical stress" },
        { type: "VFD (Variable Frequency Drive)", use: "Variable speed applications", characteristics: "Full speed control, energy savings, precise positioning" }
      ]
    },
    plcAutomation: {
      subtitle: "PLC and Automation Integration",
      description: "Programmable Logic Controllers (PLCs) are the backbone of modern industrial automation. They replace relay logic with programmable, flexible control.",
      keyComponents: [
        { component: "CPU Module", function: "Executes program logic, stores data and configuration" },
        { component: "Power Supply", function: "Provides DC power to all modules (typically 24VDC)" },
        { component: "Digital Inputs", function: "Receives signals from sensors, switches (24VDC typically)" },
        { component: "Digital Outputs", function: "Controls relays, solenoids, contactors" },
        { component: "Analogue Inputs", function: "Reads 4-20mA, 0-10V signals from sensors" },
        { component: "Analogue Outputs", function: "Controls VFDs, valve positioners (4-20mA)" },
        { component: "Communication Modules", function: "Ethernet/IP, Profinet, Modbus connectivity" }
      ],
      commonProtocols: [
        { protocol: "Profinet", description: "Industrial Ethernet, real-time communication" },
        { protocol: "EtherNet/IP", description: "Common Industrial Protocol over Ethernet" },
        { protocol: "Modbus TCP", description: "Simple, widely supported, master-slave" },
        { protocol: "Profibus", description: "Legacy fieldbus, still widely used" }
      ]
    },
    compressedAir: {
      subtitle: "Compressed Air Systems",
      description: "Compressed air is often called the 'fourth utility' in manufacturing. The electrical systems supporting compressors and air treatment require careful design.",
      components: [
        { equipment: "Compressor Motor", typical: "22kW - 250kW", starting: "Soft starter or VFD essential", notes: "High inrush, consider power factor" },
        { equipment: "Dryer Controls", typical: "1-5kW", starting: "DOL acceptable", notes: "Interlock with compressor" },
        { equipment: "Pressure Transmitters", typical: "4-20mA output", starting: "N/A", notes: "24VDC loop powered" },
        { equipment: "Control Panel", typical: "3-5kW", starting: "N/A", notes: "PLC with touch screen HMI" }
      ]
    },
    voltages: {
      subtitle: "Typical Industrial Voltages",
      levels: [
        { voltage: "230V AC", use: "Control circuits, lighting, small equipment", cable: "Singles in trunking, flex" },
        { voltage: "400V AC 3-phase", use: "Standard motors up to 200kW, distribution", cable: "SWA, singles in tray" },
        { voltage: "690V AC 3-phase", use: "Large motors 200kW+, reduced cable sizes", cable: "SWA, XLPE insulation" },
        { voltage: "24V DC", use: "Control circuits, PLC I/O, sensors", cable: "Control cable, screened" },
        { voltage: "110V AC CTE", use: "Portable tools, temporary lighting", cable: "Arctic grade flex, yellow" }
      ]
    }
  };

  // Warehousing & Distribution
  const warehousingContent = {
    title: "Warehousing & Distribution",
    highBayLighting: {
      subtitle: "High Bay Lighting Systems",
      description: "Warehouse lighting must provide adequate illumination for safe working while minimising energy costs. Modern LED systems offer significant advantages.",
      comparison: [
        { type: "LED High Bay", efficacy: "130-180 lm/W", lifespan: "50,000+ hours", startup: "Instant", dimming: "Excellent", maintenance: "Low" },
        { type: "Metal Halide (HID)", efficacy: "80-100 lm/W", lifespan: "15,000 hours", startup: "5-10 minutes", dimming: "Poor", maintenance: "High" },
        { type: "High Pressure Sodium", efficacy: "100-140 lm/W", lifespan: "20,000 hours", startup: "5-10 minutes", dimming: "Limited", maintenance: "Medium" }
      ],
      controlOptions: [
        { method: "DALI", description: "Digital addressable lighting - individual fixture control, dimming, scheduling" },
        { method: "0-10V", description: "Simple analogue dimming, zone-based control" },
        { method: "PIR/Motion", description: "Occupancy-based switching, aisle lighting" },
        { method: "Daylight Harvesting", description: "Photocells dim lights based on natural light levels" }
      ],
      designConsiderations: [
        "Minimum 150 lux for general storage areas (HSE guidance)",
        "300 lux minimum for picking and packing areas",
        "500 lux for detailed inspection or quality control",
        "Emergency lighting at 1 lux minimum on escape routes",
        "Consider glare control for VDU workstations and forklift operation"
      ]
    },
    loadingBays: {
      subtitle: "Loading Bay Electrical Requirements",
      description: "Loading bays are challenging environments requiring weatherproof equipment, traffic considerations, and integration with door controls.",
      equipment: [
        { item: "Dock Levellers", power: "1.5-3kW", requirements: "Interlock with door position, safety edge sensors" },
        { item: "Fast-Acting Doors", power: "0.5-1.5kW", requirements: "Photocell safety, wind sensors, traffic lights" },
        { item: "Loading Bay Lighting", power: "Varies", requirements: "IP65 minimum, switched from cab control" },
        { item: "Vehicle Restraints", power: "0.5kW", requirements: "Interlock with dock leveller and internal door" }
      ],
      safetyCircuits: [
        "Traffic light systems (red/green) for vehicle approach",
        "Wheel chock or vehicle restraint interlocks",
        "Dock leveller lip safety detection",
        "Internal/external door interlocking",
        "Emergency stop chain covering entire bay"
      ]
    },
    forkliftCharging: {
      subtitle: "Forklift Charging Stations",
      description: "Electric forklift charging areas require careful electrical design to handle high currents safely and efficiently.",
      types: [
        { type: "Lead-Acid Conventional", charging: "8-12 hours", power: "3-phase 400V", current: "30-80A per charger" },
        { type: "Lead-Acid Fast Charge", charging: "1-2 hours", power: "3-phase 400V", current: "100-200A per charger" },
        { type: "Lithium-Ion", charging: "1-3 hours", power: "3-phase 400V", current: "50-150A per charger" },
        { type: "Lithium-Ion Opportunity", charging: "15-30 mins", power: "3-phase 400V", current: "200-400A per charger" }
      ],
      designRequirements: [
        "Adequate ventilation for hydrogen gas (lead-acid)",
        "Eye wash stations within 10 seconds travel",
        "Barrier protection from vehicle impact",
        "Non-combustible flooring (acid resistant)",
        "Individual isolation per charging point",
        "Emergency stop buttons clearly visible"
      ]
    },
    automatedStorage: {
      subtitle: "Automated Storage Systems",
      description: "Modern warehouses increasingly use automated storage and retrieval systems (AS/RS) requiring sophisticated electrical infrastructure.",
      systems: [
        { system: "Shuttle Systems", description: "Autonomous shuttles moving within racking", power: "Battery powered with charging rails", controls: "Warehouse Management System (WMS) integration" },
        { system: "Stacker Cranes", description: "Rail-mounted cranes for high-bay storage", power: "400V busbars or cable festoons", controls: "Positioning via encoders and laser" },
        { system: "Conveyor Networks", description: "Interconnected conveyors for goods movement", power: "Distributed VFDs along route", controls: "PLC control with barcode tracking" },
        { system: "Robotic Picking", description: "Automated goods-to-person systems", power: "Individual robot batteries", controls: "Fleet management software" }
      ]
    },
    coldStorage: {
      subtitle: "Cold Storage Requirements",
      description: "Refrigerated warehouses have unique electrical requirements due to extreme temperatures and the critical nature of maintaining the cold chain.",
      zones: [
        { zone: "Ambient", temp: "+15 to +25C", considerations: "Standard equipment acceptable" },
        { zone: "Chilled", temp: "0 to +5C", considerations: "Condensation risk, IP54 minimum" },
        { zone: "Frozen", temp: "-18 to -25C", considerations: "Special cables, low-temp rated equipment" },
        { zone: "Deep Freeze", temp: "-30 to -40C", considerations: "Arctic-grade everything, heated enclosures for controls" }
      ],
      specialRequirements: [
        "Cables rated for low temperature (-40C flex cables)",
        "Heated enclosures for VFDs and control panels",
        "Anti-condensation heaters in junction boxes",
        "Rapid-close doors with heated frames",
        "Defrost heating circuits for evaporators",
        "UPS backup for critical monitoring systems"
      ]
    },
    securityAccess: {
      subtitle: "Security and Access Control",
      description: "Warehouse security systems integrate with electrical infrastructure to protect goods and control personnel access.",
      systems: [
        { system: "Access Control", description: "Card readers, biometrics, turnstiles", power: "Low voltage (12-24VDC)", interface: "Wiegand or OSDP protocol" },
        { system: "CCTV", description: "IP cameras, NVR storage", power: "PoE or dedicated supplies", interface: "Ethernet network" },
        { system: "Intruder Alarm", description: "PIR sensors, door contacts, control panel", power: "Battery-backed PSU", interface: "Monitored alarm connection" },
        { system: "Perimeter Security", description: "Fence detection, vehicle barriers", power: "Mains with battery backup", interface: "Integration with BMS" }
      ]
    }
  };

  // Heavy Industry
  const heavyIndustryContent = {
    title: "Heavy Industry",
    hvSupplies: {
      subtitle: "High Voltage Supplies",
      description: "Heavy industrial sites often have their own HV infrastructure, requiring specialised knowledge and authorisation.",
      voltages: [
        { level: "11kV", typical: "Site primary distribution", notes: "Common for larger factories, supplied by DNO or private network" },
        { level: "33kV", typical: "Very large sites, grid connection", notes: "Steelworks, large manufacturing, data centres" },
        { level: "132kV", typical: "Major industrial complexes", notes: "Direct grid connection, own substation" }
      ],
      equipment: [
        { item: "Ring Main Units (RMU)", function: "Switching and protection for HV cables", location: "Each building/area intake" },
        { item: "HV/LV Transformers", function: "Step down voltage to 400V for distribution", location: "Substations throughout site" },
        { item: "HV Switchgear", function: "Circuit breakers for HV protection", location: "Main intake, major substations" },
        { item: "Protection Relays", function: "Overcurrent, earth fault, differential protection", location: "Associated with each circuit breaker" }
      ],
      authorisation: [
        { level: "Competent Person (HV)", description: "Can carry out work under supervision of AP" },
        { level: "Authorised Person (HV)", description: "Can issue safety documents, control access" },
        { level: "Senior Authorised Person", description: "Controls complex switching operations" }
      ]
    },
    largeMotors: {
      subtitle: "Large Motor Installations",
      description: "Motors above 200kW require careful consideration of starting methods, protection, and power quality impact.",
      startingMethods: [
        {
          method: "DOL (Direct On Line)",
          motorSize: "Up to 7.5kW (LV)",
          startingCurrent: "6-8x FLC",
          advantages: "Simple, cheap, rugged",
          disadvantages: "High starting current, mechanical shock"
        },
        {
          method: "Star-Delta",
          motorSize: "7.5kW - 45kW",
          startingCurrent: "2-3x FLC",
          advantages: "Lower starting current than DOL",
          disadvantages: "Torque dip on changeover, complex wiring"
        },
        {
          method: "Auto-Transformer",
          motorSize: "45kW - 200kW",
          startingCurrent: "Adjustable via taps",
          advantages: "Smooth start, adjustable",
          disadvantages: "Expensive, large, maintenance"
        },
        {
          method: "Soft Starter",
          motorSize: "15kW - 500kW",
          startingCurrent: "2-4x FLC adjustable",
          advantages: "Smooth ramp, soft stop, compact",
          disadvantages: "Heat generation, bypass needed for continuous"
        },
        {
          method: "VFD (Variable Frequency Drive)",
          motorSize: "Any size",
          startingCurrent: "1.5x FLC",
          advantages: "Full speed control, energy saving",
          disadvantages: "Cost, harmonics, shaft currents"
        }
      ],
      protection: [
        { device: "Overcurrent Relay", function: "Thermal and short-circuit protection" },
        { device: "Earth Fault Relay", function: "Detect winding insulation failure" },
        { device: "Stall Protection", function: "Prevent damage from locked rotor" },
        { device: "RTD/PTC Sensors", function: "Direct winding temperature monitoring" },
        { device: "Bearing Temperature", function: "PT100 sensors in bearings" },
        { device: "Vibration Monitoring", function: "Early warning of mechanical issues" }
      ]
    },
    hazardousAreas: {
      subtitle: "Hazardous Area Classifications (ATEX/DSEAR)",
      description: "Areas where explosive atmospheres may occur require special equipment selection and installation practices. DSEAR (Dangerous Substances and Explosive Atmospheres Regulations) implements EU ATEX directives in UK law.",
      gasZones: [
        { zone: "Zone 0", definition: "Explosive atmosphere present continuously or for long periods", frequency: ">1000 hours/year", equipment: "Category 1 (Ex ia, Ex ma)" },
        { zone: "Zone 1", definition: "Explosive atmosphere likely during normal operation", frequency: "10-1000 hours/year", equipment: "Category 2 (Ex d, Ex e, Ex ib)" },
        { zone: "Zone 2", definition: "Explosive atmosphere unlikely, only in abnormal conditions", frequency: "<10 hours/year", equipment: "Category 3 (Ex n, Ex ic)" }
      ],
      dustZones: [
        { zone: "Zone 20", definition: "Explosive dust cloud present continuously", frequency: ">1000 hours/year", equipment: "Category 1D" },
        { zone: "Zone 21", definition: "Explosive dust cloud likely during normal operation", frequency: "10-1000 hours/year", equipment: "Category 2D" },
        { zone: "Zone 22", definition: "Explosive dust cloud unlikely, only abnormal conditions", frequency: "<10 hours/year", equipment: "Category 3D" }
      ],
      protectionTypes: [
        { code: "Ex d", name: "Flameproof", description: "Equipment in robust enclosure that contains any internal explosion" },
        { code: "Ex e", name: "Increased Safety", description: "Enhanced measures to prevent arcs, sparks, or hot surfaces" },
        { code: "Ex i", name: "Intrinsic Safety", description: "Energy limited so cannot ignite - safest method" },
        { code: "Ex n", name: "Non-Sparking", description: "Equipment unlikely to produce arcs in normal operation" },
        { code: "Ex p", name: "Pressurised", description: "Enclosure purged and pressurised with clean air/gas" },
        { code: "Ex m", name: "Encapsulation", description: "Components encapsulated in compound" }
      ]
    },
    intrinsicSafety: {
      subtitle: "Intrinsically Safe Equipment",
      description: "Intrinsic safety (Ex i) limits electrical energy so that ignition cannot occur. It is the preferred method for instrumentation in hazardous areas.",
      principles: [
        "Maximum voltage, current, and power are limited",
        "Energy storage (capacitance, inductance) is restricted",
        "Safety barriers or galvanic isolators at zone boundaries",
        "Special cable requirements (blue sheath identification)",
        "Earthing only at one point to prevent circulating currents"
      ],
      barriers: [
        { type: "Zener Barrier", function: "Shunt excess voltage to earth via zener diodes", requirements: "Intrinsic safety earth essential" },
        { type: "Galvanic Isolator", function: "Complete electrical isolation using transformer/opto", requirements: "No special earth required" }
      ],
      cabling: [
        "Blue outer sheath identifies IS circuits",
        "Separate from non-IS cables by 50mm minimum",
        "Screen earthed at safe area end only",
        "Special glands may be required for cable entry",
        "Cable capacitance and inductance must be calculated"
      ]
    },
    earthingSystems: {
      subtitle: "Earthing for Industrial Systems",
      description: "Industrial earthing is more complex than domestic systems, often combining multiple earthing arrangements and dealing with HV systems.",
      systems: [
        {
          type: "TN-C-S (PME)",
          description: "Combined neutral and earth in supply, separate at installation",
          use: "Most common for standard industrial",
          notes: "Cannot be used in hazardous areas (DSEAR)"
        },
        {
          type: "TN-S",
          description: "Separate neutral and earth throughout",
          use: "Preferred for industrial, essential for some applications",
          notes: "Better EMC performance, required for some IT equipment"
        },
        {
          type: "TT",
          description: "Local earth electrode, no DNO earth connection",
          use: "Required where PME not permitted (petrol stations, etc.)",
          notes: "Higher impedance, requires RCD protection"
        },
        {
          type: "IT",
          description: "Isolated or impedance-earthed neutral",
          use: "Continuous process, medical locations",
          notes: "First fault doesn't trip, requires insulation monitoring"
        }
      ],
      bonding: [
        "Main protective bonding to metallic services",
        "Supplementary bonding in special locations",
        "Structural steelwork bonding",
        "Lightning protection bonding",
        "Static earthing for flammable atmospheres",
        "Functional earthing for electronics/EMC"
      ]
    }
  };

  // Process Industries
  const processIndustries = {
    title: "Process Industries",
    chemical: {
      subtitle: "Chemical Plant Considerations",
      description: "Chemical plants present unique electrical challenges due to corrosive atmospheres, flammable materials, and continuous process requirements.",
      considerations: [
        { aspect: "Corrosive Atmospheres", requirements: "GRP enclosures, stainless steel or coated fittings, special cable glands" },
        { aspect: "Hazardous Areas", requirements: "Zone classification throughout, ATEX equipment, CompEx trained staff" },
        { aspect: "Process Continuity", requirements: "Redundant supplies, UPS systems, auto-changeover schemes" },
        { aspect: "Cleaning/Washdown", requirements: "IP66/IP67 minimum, chemical-resistant seals" }
      ],
      equipment: [
        "GRP (glass reinforced plastic) junction boxes",
        "316 stainless steel cable glands",
        "Fluoropolymer-insulated cables",
        "Ex e increased safety motors",
        "Ex d flameproof local control stations"
      ]
    },
    foodProcessing: {
      subtitle: "Food Processing (Hygiene Requirements)",
      description: "Food processing facilities must meet stringent hygiene standards that affect electrical equipment selection and installation methods.",
      zones: [
        { zone: "Production Areas", requirements: "IP69K for washdown, smooth surfaces, food-safe materials" },
        { zone: "High Care Areas", requirements: "Maximum hygiene, stainless steel only, positive pressure" },
        { zone: "Low Risk Areas", requirements: "IP65 minimum, easy to clean surfaces" },
        { zone: "Non-Production", requirements: "Standard industrial specification" }
      ],
      standards: [
        "EHEDG (European Hygienic Engineering & Design Group) guidelines",
        "IP69K rating for high-pressure washdown",
        "316 stainless steel enclosures and fittings",
        "Sloped tops on enclosures to prevent debris accumulation",
        "Silicone-free seals (can cause defoamer issues)",
        "Blue food-safe cable ties and identification"
      ],
      installation: [
        "Cables run in hygienic cable tray (slotted, draining)",
        "No horizontal surfaces where debris can accumulate",
        "Stand-off brackets to allow cleaning behind equipment",
        "Sealed conduit entries with hygienic glands",
        "Motors with food-grade lubricant and hygenic design"
      ]
    },
    pharmaceutical: {
      subtitle: "Pharmaceutical (Clean Room Requirements)",
      description: "Pharmaceutical manufacturing requires strict contamination control, affecting electrical installations in classified clean rooms.",
      classifications: [
        { class: "Grade A", particles: "<3,520 (0.5um)", description: "Critical zone for high-risk operations", electrical: "Flush-mounted, HEPA-filtered" },
        { class: "Grade B", particles: "<352,000 (0.5um)", description: "Background for Grade A zones", electrical: "Smooth, sealed surfaces" },
        { class: "Grade C", particles: "<3,520,000 (0.5um)", description: "Less critical stages", electrical: "Wipeable, sealed equipment" },
        { class: "Grade D", particles: "<35,200,000 (0.5um)", description: "Controlled but not critical", electrical: "Standard clean spec" }
      ],
      requirements: [
        "Flush-mounted accessories (no surface-mounting)",
        "Sealed and gasketed enclosures",
        "Smooth, non-particle-shedding finishes",
        "Stainless steel or powder-coated steel",
        "Cable entry through sealed glands only",
        "No exposed threads or crevices"
      ],
      validation: [
        "Installation Qualification (IQ) - installed correctly",
        "Operational Qualification (OQ) - operates as designed",
        "Performance Qualification (PQ) - performs consistently",
        "Documentation trail for all components",
        "Change control procedures for any modifications"
      ]
    },
    waterTreatment: {
      subtitle: "Water Treatment Plants",
      description: "Water and wastewater treatment facilities combine electrical challenges of wet environments, pumping systems, and often remote operation.",
      areas: [
        { area: "Pump Houses", considerations: "Wet environment, large motors, VFD control common" },
        { area: "Chemical Dosing", considerations: "Corrosive chemicals, accurate metering, safety interlocks" },
        { area: "Filter Galleries", considerations: "Wash-down areas, valve actuation, level sensing" },
        { area: "Control Building", considerations: "SCADA systems, telemetry, instrument air" },
        { area: "Remote Pumping Stations", considerations: "Unattended operation, telemetry, generator standby" }
      ],
      typicalSystems: [
        { system: "Raw Water Pumps", size: "50-500kW", control: "VFD for flow control", notes: "Duty/standby arrangement" },
        { system: "Blowers/Aerators", size: "20-200kW", control: "VFD for DO control", notes: "Multiple units for N+1 redundancy" },
        { system: "RAS/WAS Pumps", size: "10-50kW", control: "VFD, flow paced", notes: "Sludge handling, wear consideration" },
        { system: "Chemical Dosing", size: "0.5-5kW", control: "Peristaltic/diaphragm pumps", notes: "Flow-proportional control" },
        { system: "UV Disinfection", size: "5-50kW", control: "Dose-paced with flow", notes: "Lamp intensity monitoring" }
      ],
      control: [
        "SCADA (Supervisory Control and Data Acquisition)",
        "Telemetry to remote sites via GSM/radio",
        "Historian for process data logging",
        "Alarm management and callout systems",
        "Integration with regulatory reporting"
      ]
    }
  };

  // Project Types (existing, enhanced)
  const projectTypes = [
    { type: "Manufacturing Plant", complexity: 95, duration: "4-8 weeks", cost: "£50,000-£200,000" },
    { type: "Motor Control Systems", complexity: 85, duration: "2-4 weeks", cost: "£20,000-£80,000" },
    { type: "High Bay Lighting", complexity: 70, duration: "1-3 weeks", cost: "£15,000-£50,000" },
    { type: "Heavy Machinery Installation", complexity: 90, duration: "3-6 weeks", cost: "£40,000-£150,000" },
    { type: "Hazardous Area Systems", complexity: 98, duration: "4-10 weeks", cost: "£60,000-£250,000" },
    { type: "HV Installation (11kV)", complexity: 95, duration: "6-12 weeks", cost: "£100,000-£500,000" }
  ];

  // Safety Requirements (existing, enhanced)
  const safetyRequirements = [
    { requirement: "ATEX Compliance", description: "Explosive atmosphere protection per EU Directive 2014/34/EU", level: "Critical" },
    { requirement: "DSEAR Regulations", description: "UK dangerous substances regulations - risk assessment mandatory", level: "Legal" },
    { requirement: "PUWER Compliance", description: "Safe provision and use of work equipment", level: "Legal" },
    { requirement: "Arc Flash Protection", description: "PPE and procedures for high-energy arc flash risk", level: "Critical" },
    { requirement: "LOLER", description: "Lifting Operations and Lifting Equipment Regulations", level: "Legal" },
    { requirement: "CDM Regulations", description: "Construction (Design and Management) for projects", level: "Legal" }
  ];

  // Hazard Categories (existing, enhanced)
  const hazardCategories = [
    { hazard: "High Voltage Systems", risk: "Critical", mitigation: "Authorised person only, permit to work, HV PPE" },
    { hazard: "Explosive Atmospheres", risk: "Critical", mitigation: "ATEX certified equipment, hot work permits, zone classification" },
    { hazard: "Arc Flash", risk: "Critical", mitigation: "Incident energy calculation, appropriate PPE level, remote racking" },
    { hazard: "Heavy Machinery", risk: "High", mitigation: "LOTO procedures, machine guarding, PTW system" },
    { hazard: "Chemical Exposure", risk: "Medium", mitigation: "COSHH assessment, appropriate PPE, emergency procedures" },
    { hazard: "Confined Spaces", risk: "High", mitigation: "Permit system, gas monitoring, rescue arrangements" }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="border-elec-yellow/30 bg-white/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="h-4 w-4 text-elec-yellow" />
                <span className="text-xs text-white">{stat.label}</span>
              </div>
              <p className="text-lg font-semibold text-white">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* What is Industrial Electrical Work? */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Factory className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-elec-yellow">{industrialBackground.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200 text-sm">
              {industrialBackground.definition}
            </AlertDescription>
          </Alert>

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <h4 className="font-medium text-elec-yellow mb-3">Types of Industrial Premises</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {industrialBackground.premises.map((premise, idx) => (
                <div key={idx} className="bg-blue-600/10 p-3 rounded border border-blue-500/30">
                  <h5 className="font-medium text-blue-200 text-sm mb-1">{premise.type}</h5>
                  <p className="text-xs text-white mb-2">{premise.description}</p>
                  <p className="text-xs text-blue-300"><strong>Examples:</strong> {premise.examples}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <h4 className="font-medium text-elec-yellow mb-3">Industrial vs Commercial: Key Differences</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-500/30">
                    <th className="text-left py-2 text-blue-200">Aspect</th>
                    <th className="text-left py-2 text-blue-200">Commercial</th>
                    <th className="text-left py-2 text-blue-200">Industrial</th>
                  </tr>
                </thead>
                <tbody>
                  {industrialBackground.differences.map((diff, idx) => (
                    <tr key={idx} className="border-b border-blue-500/20">
                      <td className="py-2 text-white font-medium">{diff.aspect}</td>
                      <td className="py-2 text-white">{diff.commercial}</td>
                      <td className="py-2 text-blue-300">{diff.industrial}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card className="border-emerald-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-emerald-400" />
            <CardTitle className="text-elec-yellow">{careerPaths.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-emerald-500/50 bg-emerald-500/10">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <AlertDescription className="text-emerald-200 text-sm">
              Industrial electrical work offers excellent career progression and higher salaries than domestic or commercial sectors. Specialisation is key to maximising earning potential.
            </AlertDescription>
          </Alert>

          {careerPaths.paths.map((path, idx) => (
            <div key={idx} className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-lg mb-1">{path.role}</h4>
                  <p className="text-sm text-white mb-2">{path.description}</p>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-400 text-sm self-start">
                  {path.salary}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {path.skills.map((skill, skillIdx) => (
                  <Badge key={skillIdx} variant="outline" className="border-emerald-400 text-emerald-300 text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-emerald-300">
                <strong>Progression:</strong> {path.progression}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Manufacturing Facilities */}
      <Card className="border-violet-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cog className="h-6 w-6 text-violet-400" />
            <CardTitle className="text-elec-yellow">{manufacturingContent.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Production Lines */}
          <div className="space-y-3">
            <h4 className="font-medium text-elec-yellow flex items-center gap-2">
              <CircuitBoard className="h-4 w-4" />
              {manufacturingContent.productionLines.subtitle}
            </h4>
            <p className="text-sm text-white">{manufacturingContent.productionLines.description}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-violet-500/30">
                    <th className="text-left py-2 text-violet-200">Component</th>
                    <th className="text-left py-2 text-violet-200">Voltage</th>
                    <th className="text-left py-2 text-violet-200">Control</th>
                    <th className="text-left py-2 text-violet-200">Safety</th>
                  </tr>
                </thead>
                <tbody>
                  {manufacturingContent.productionLines.components.map((comp, idx) => (
                    <tr key={idx} className="border-b border-violet-500/20">
                      <td className="py-2 text-white">{comp.name}</td>
                      <td className="py-2 text-white">{comp.voltage}</td>
                      <td className="py-2 text-white">{comp.control}</td>
                      <td className="py-2 text-violet-300">{comp.safety}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MCCs */}
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Box className="h-4 w-4" />
              {manufacturingContent.mcc.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{manufacturingContent.mcc.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-violet-200 mb-2">MCC Components</h5>
                {manufacturingContent.mcc.components.map((comp, idx) => (
                  <div key={idx} className="text-xs text-white mb-1">
                    <span className="text-violet-300">{comp.item}:</span> {comp.function}
                  </div>
                ))}
              </div>
              <div>
                <h5 className="text-sm font-medium text-violet-200 mb-2">Motor Starting Methods</h5>
                {manufacturingContent.mcc.starterTypes.map((starter, idx) => (
                  <div key={idx} className="bg-violet-600/10 p-2 rounded mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="border-violet-400 text-violet-300 text-xs">
                        {starter.type}
                      </Badge>
                      <span className="text-xs text-white">{starter.use}</span>
                    </div>
                    <p className="text-xs text-white">{starter.characteristics}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PLC Automation */}
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <CircuitBoard className="h-4 w-4" />
              {manufacturingContent.plcAutomation.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{manufacturingContent.plcAutomation.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-violet-200 mb-2">PLC Components</h5>
                {manufacturingContent.plcAutomation.keyComponents.map((comp, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><span className="text-violet-300">{comp.component}:</span> {comp.function}</span>
                  </div>
                ))}
              </div>
              <div>
                <h5 className="text-sm font-medium text-violet-200 mb-2">Communication Protocols</h5>
                {manufacturingContent.plcAutomation.commonProtocols.map((proto, idx) => (
                  <div key={idx} className="bg-violet-600/10 p-2 rounded mb-2">
                    <Badge variant="outline" className="border-violet-400 text-violet-300 text-xs mb-1">
                      {proto.protocol}
                    </Badge>
                    <p className="text-xs text-white">{proto.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compressed Air */}
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Wind className="h-4 w-4" />
              {manufacturingContent.compressedAir.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{manufacturingContent.compressedAir.description}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-violet-500/30">
                    <th className="text-left py-2 text-violet-200">Equipment</th>
                    <th className="text-left py-2 text-violet-200">Typical Power</th>
                    <th className="text-left py-2 text-violet-200">Starting Method</th>
                    <th className="text-left py-2 text-violet-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {manufacturingContent.compressedAir.components.map((comp, idx) => (
                    <tr key={idx} className="border-b border-violet-500/20">
                      <td className="py-2 text-white">{comp.equipment}</td>
                      <td className="py-2 text-white">{comp.typical}</td>
                      <td className="py-2 text-white">{comp.starting}</td>
                      <td className="py-2 text-violet-300">{comp.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Typical Voltages */}
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {manufacturingContent.voltages.subtitle}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {manufacturingContent.voltages.levels.map((level, idx) => (
                <div key={idx} className="bg-violet-600/10 p-3 rounded border border-violet-500/30">
                  <Badge variant="outline" className="border-violet-400 text-violet-300 text-sm mb-2">
                    {level.voltage}
                  </Badge>
                  <p className="text-xs text-white mb-1">{level.use}</p>
                  <p className="text-xs text-violet-300"><strong>Cable:</strong> {level.cable}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warehousing & Distribution */}
      <Card className="border-cyan-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Warehouse className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-elec-yellow">{warehousingContent.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* High Bay Lighting */}
          <div className="space-y-3">
            <h4 className="font-medium text-elec-yellow flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              {warehousingContent.highBayLighting.subtitle}
            </h4>
            <p className="text-sm text-white">{warehousingContent.highBayLighting.description}</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/30">
                    <th className="text-left py-2 text-cyan-200">Type</th>
                    <th className="text-left py-2 text-cyan-200">Efficacy</th>
                    <th className="text-left py-2 text-cyan-200">Lifespan</th>
                    <th className="text-left py-2 text-cyan-200">Startup</th>
                    <th className="text-left py-2 text-cyan-200">Dimming</th>
                  </tr>
                </thead>
                <tbody>
                  {warehousingContent.highBayLighting.comparison.map((light, idx) => (
                    <tr key={idx} className="border-b border-cyan-500/20">
                      <td className="py-2 text-white">{light.type}</td>
                      <td className="py-2 text-white">{light.efficacy}</td>
                      <td className="py-2 text-white">{light.lifespan}</td>
                      <td className="py-2 text-white">{light.startup}</td>
                      <td className="py-2 text-cyan-300">{light.dimming}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                <h5 className="text-sm font-medium text-cyan-200 mb-2">Control Options</h5>
                {warehousingContent.highBayLighting.controlOptions.map((opt, idx) => (
                  <div key={idx} className="text-xs text-white mb-2">
                    <span className="text-cyan-300 font-medium">{opt.method}:</span> {opt.description}
                  </div>
                ))}
              </div>
              <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                <h5 className="text-sm font-medium text-cyan-200 mb-2">Design Considerations</h5>
                {warehousingContent.highBayLighting.designConsiderations.map((item, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Bays */}
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Truck className="h-4 w-4" />
              {warehousingContent.loadingBays.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{warehousingContent.loadingBays.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-cyan-200 mb-2">Equipment</h5>
                {warehousingContent.loadingBays.equipment.map((eq, idx) => (
                  <div key={idx} className="bg-cyan-600/10 p-2 rounded mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white font-medium">{eq.item}</span>
                      <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs">
                        {eq.power}
                      </Badge>
                    </div>
                    <p className="text-xs text-white">{eq.requirements}</p>
                  </div>
                ))}
              </div>
              <div>
                <h5 className="text-sm font-medium text-cyan-200 mb-2">Safety Circuits</h5>
                {warehousingContent.loadingBays.safetyCircuits.map((circuit, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <Shield className="h-3 w-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                    {circuit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Forklift Charging */}
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <BatteryCharging className="h-4 w-4" />
              {warehousingContent.forkliftCharging.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{warehousingContent.forkliftCharging.description}</p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/30">
                    <th className="text-left py-2 text-cyan-200">Type</th>
                    <th className="text-left py-2 text-cyan-200">Charge Time</th>
                    <th className="text-left py-2 text-cyan-200">Power</th>
                    <th className="text-left py-2 text-cyan-200">Current</th>
                  </tr>
                </thead>
                <tbody>
                  {warehousingContent.forkliftCharging.types.map((type, idx) => (
                    <tr key={idx} className="border-b border-cyan-500/20">
                      <td className="py-2 text-white">{type.type}</td>
                      <td className="py-2 text-white">{type.charging}</td>
                      <td className="py-2 text-white">{type.power}</td>
                      <td className="py-2 text-cyan-300">{type.current}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Alert className="border-orange-500/50 bg-orange-500/10">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              <AlertDescription className="text-orange-200 text-sm">
                <strong>Safety Requirements:</strong>
                <ul className="mt-2 space-y-1">
                  {warehousingContent.forkliftCharging.designRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </div>

          {/* Automated Storage */}
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Box className="h-4 w-4" />
              {warehousingContent.automatedStorage.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{warehousingContent.automatedStorage.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {warehousingContent.automatedStorage.systems.map((sys, idx) => (
                <div key={idx} className="bg-cyan-600/10 p-3 rounded border border-cyan-500/30">
                  <h5 className="font-medium text-cyan-200 text-sm mb-1">{sys.system}</h5>
                  <p className="text-xs text-white mb-2">{sys.description}</p>
                  <div className="text-xs">
                    <p className="text-cyan-300"><strong>Power:</strong> {sys.power}</p>
                    <p className="text-cyan-300"><strong>Controls:</strong> {sys.controls}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cold Storage */}
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Snowflake className="h-4 w-4" />
              {warehousingContent.coldStorage.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{warehousingContent.coldStorage.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {warehousingContent.coldStorage.zones.map((zone, idx) => (
                <div key={idx} className={`p-3 rounded border ${
                  zone.zone === 'Ambient' ? 'bg-green-500/10 border-green-500/30' :
                  zone.zone === 'Chilled' ? 'bg-cyan-500/10 border-cyan-500/30' :
                  zone.zone === 'Frozen' ? 'bg-blue-500/10 border-blue-500/30' :
                  'bg-violet-500/10 border-violet-500/30'
                }`}>
                  <Badge variant="outline" className={`text-xs mb-2 ${
                    zone.zone === 'Ambient' ? 'border-green-400 text-green-300' :
                    zone.zone === 'Chilled' ? 'border-cyan-400 text-cyan-300' :
                    zone.zone === 'Frozen' ? 'border-blue-400 text-blue-300' :
                    'border-violet-400 text-violet-300'
                  }`}>
                    {zone.zone}
                  </Badge>
                  <p className="text-sm font-medium text-white">{zone.temp}</p>
                  <p className="text-xs text-white mt-1">{zone.considerations}</p>
                </div>
              ))}
            </div>

            <div className="bg-cyan-600/10 p-3 rounded border border-cyan-500/30">
              <h5 className="text-sm font-medium text-cyan-200 mb-2">Special Requirements</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {warehousingContent.coldStorage.specialRequirements.map((req, idx) => (
                  <div key={idx} className="text-xs text-white flex items-start gap-2">
                    <Thermometer className="h-3 w-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                    {req}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security & Access Control */}
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {warehousingContent.securityAccess.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{warehousingContent.securityAccess.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {warehousingContent.securityAccess.systems.map((sys, idx) => (
                <div key={idx} className="bg-cyan-600/10 p-3 rounded border border-cyan-500/30">
                  <h5 className="font-medium text-cyan-200 text-sm mb-1">{sys.system}</h5>
                  <p className="text-xs text-white mb-2">{sys.description}</p>
                  <div className="text-xs">
                    <p className="text-cyan-300"><strong>Power:</strong> {sys.power}</p>
                    <p className="text-cyan-300"><strong>Interface:</strong> {sys.interface}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heavy Industry */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-elec-yellow">{heavyIndustryContent.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* HV Supplies */}
          <div className="space-y-3">
            <h4 className="font-medium text-elec-yellow flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {heavyIndustryContent.hvSupplies.subtitle}
            </h4>
            <p className="text-sm text-white">{heavyIndustryContent.hvSupplies.description}</p>

            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200 text-sm">
                <strong>DANGER:</strong> High voltage work requires specific authorisation and training. Only HV Authorised Persons may access HV equipment or issue safety documents.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {heavyIndustryContent.hvSupplies.voltages.map((v, idx) => (
                <div key={idx} className="bg-orange-500/10 p-3 rounded border border-orange-500/30">
                  <Badge variant="outline" className="border-orange-400 text-orange-300 text-lg mb-2">
                    {v.level}
                  </Badge>
                  <p className="text-sm text-white mb-1">{v.typical}</p>
                  <p className="text-xs text-white">{v.notes}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <h5 className="text-sm font-medium text-orange-200 mb-2">HV Equipment</h5>
                {heavyIndustryContent.hvSupplies.equipment.map((eq, idx) => (
                  <div key={idx} className="text-xs text-white mb-2">
                    <span className="text-orange-300 font-medium">{eq.item}:</span> {eq.function}
                  </div>
                ))}
              </div>
              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <h5 className="text-sm font-medium text-orange-200 mb-2">Authorisation Levels</h5>
                {heavyIndustryContent.hvSupplies.authorisation.map((auth, idx) => (
                  <div key={idx} className="bg-orange-600/10 p-2 rounded mb-2">
                    <Badge variant="outline" className="border-orange-400 text-orange-300 text-xs mb-1">
                      {auth.level}
                    </Badge>
                    <p className="text-xs text-white">{auth.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Large Motors */}
          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Cog className="h-4 w-4" />
              {heavyIndustryContent.largeMotors.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{heavyIndustryContent.largeMotors.description}</p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-orange-500/30">
                    <th className="text-left py-2 text-orange-200">Method</th>
                    <th className="text-left py-2 text-orange-200">Motor Size</th>
                    <th className="text-left py-2 text-orange-200">Starting Current</th>
                    <th className="text-left py-2 text-orange-200">Advantages</th>
                    <th className="text-left py-2 text-orange-200">Disadvantages</th>
                  </tr>
                </thead>
                <tbody>
                  {heavyIndustryContent.largeMotors.startingMethods.map((method, idx) => (
                    <tr key={idx} className="border-b border-orange-500/20">
                      <td className="py-2 text-white font-medium">{method.method}</td>
                      <td className="py-2 text-white">{method.motorSize}</td>
                      <td className="py-2 text-white">{method.startingCurrent}</td>
                      <td className="py-2 text-green-300">{method.advantages}</td>
                      <td className="py-2 text-red-300">{method.disadvantages}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-orange-600/10 p-3 rounded border border-orange-500/30">
              <h5 className="text-sm font-medium text-orange-200 mb-2">Motor Protection Devices</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {heavyIndustryContent.largeMotors.protection.map((prot, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="text-orange-300 font-medium">{prot.device}:</span>
                    <span className="text-white"> {prot.function}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hazardous Areas ATEX */}
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Flame className="h-4 w-4 text-red-400" />
              {heavyIndustryContent.hazardousAreas.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{heavyIndustryContent.hazardousAreas.description}</p>

            <Alert className="border-red-500/50 bg-red-600/10 mb-4">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200 text-sm">
                <strong>CRITICAL:</strong> Work in hazardous areas requires CompEx certification. Improper installation can cause explosions resulting in fatalities.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-red-200 mb-2">Gas/Vapour Zones</h5>
                {heavyIndustryContent.hazardousAreas.gasZones.map((zone, idx) => (
                  <div key={idx} className={`p-3 rounded mb-2 ${
                    zone.zone === 'Zone 0' ? 'bg-red-600/20 border border-red-500/40' :
                    zone.zone === 'Zone 1' ? 'bg-orange-600/20 border border-orange-500/40' :
                    'bg-yellow-600/20 border border-yellow-500/40'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className={`text-xs ${
                        zone.zone === 'Zone 0' ? 'border-red-400 text-red-300' :
                        zone.zone === 'Zone 1' ? 'border-orange-400 text-orange-300' :
                        'border-yellow-400 text-yellow-300'
                      }`}>
                        {zone.zone}
                      </Badge>
                      <span className="text-xs text-white">{zone.frequency}</span>
                    </div>
                    <p className="text-xs text-white mb-1">{zone.definition}</p>
                    <p className="text-xs text-cyan-300"><strong>Equipment:</strong> {zone.equipment}</p>
                  </div>
                ))}
              </div>
              <div>
                <h5 className="text-sm font-medium text-red-200 mb-2">Dust Zones</h5>
                {heavyIndustryContent.hazardousAreas.dustZones.map((zone, idx) => (
                  <div key={idx} className={`p-3 rounded mb-2 ${
                    zone.zone === 'Zone 20' ? 'bg-red-600/20 border border-red-500/40' :
                    zone.zone === 'Zone 21' ? 'bg-orange-600/20 border border-orange-500/40' :
                    'bg-yellow-600/20 border border-yellow-500/40'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className={`text-xs ${
                        zone.zone === 'Zone 20' ? 'border-red-400 text-red-300' :
                        zone.zone === 'Zone 21' ? 'border-orange-400 text-orange-300' :
                        'border-yellow-400 text-yellow-300'
                      }`}>
                        {zone.zone}
                      </Badge>
                      <span className="text-xs text-white">{zone.frequency}</span>
                    </div>
                    <p className="text-xs text-white mb-1">{zone.definition}</p>
                    <p className="text-xs text-cyan-300"><strong>Equipment:</strong> {zone.equipment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-600/10 p-3 rounded border border-red-500/30">
              <h5 className="text-sm font-medium text-red-200 mb-2">Protection Types (Ex Codes)</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {heavyIndustryContent.hazardousAreas.protectionTypes.map((type, idx) => (
                  <div key={idx} className="bg-red-700/10 p-2 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="border-red-400 text-red-300 text-xs">
                        {type.code}
                      </Badge>
                      <span className="text-xs text-white font-medium">{type.name}</span>
                    </div>
                    <p className="text-xs text-white">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Intrinsic Safety */}
          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {heavyIndustryContent.intrinsicSafety.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{heavyIndustryContent.intrinsicSafety.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-600/10 p-3 rounded border border-orange-500/30">
                <h5 className="text-sm font-medium text-orange-200 mb-2">Key Principles</h5>
                {heavyIndustryContent.intrinsicSafety.principles.map((prin, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {prin}
                  </div>
                ))}
              </div>
              <div className="bg-orange-600/10 p-3 rounded border border-orange-500/30">
                <h5 className="text-sm font-medium text-orange-200 mb-2">Barrier Types</h5>
                {heavyIndustryContent.intrinsicSafety.barriers.map((barrier, idx) => (
                  <div key={idx} className="mb-2">
                    <Badge variant="outline" className="border-orange-400 text-orange-300 text-xs mb-1">
                      {barrier.type}
                    </Badge>
                    <p className="text-xs text-white">{barrier.function}</p>
                    <p className="text-xs text-orange-300 mt-1">{barrier.requirements}</p>
                  </div>
                ))}
              </div>
              <div className="bg-orange-600/10 p-3 rounded border border-orange-500/30">
                <h5 className="text-sm font-medium text-orange-200 mb-2">IS Cabling</h5>
                {heavyIndustryContent.intrinsicSafety.cabling.map((cable, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {cable}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Earthing Systems */}
          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {heavyIndustryContent.earthingSystems.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{heavyIndustryContent.earthingSystems.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {heavyIndustryContent.earthingSystems.systems.map((sys, idx) => (
                <div key={idx} className="bg-orange-600/10 p-3 rounded border border-orange-500/30">
                  <Badge variant="outline" className="border-orange-400 text-orange-300 text-sm mb-2">
                    {sys.type}
                  </Badge>
                  <p className="text-xs text-white mb-1">{sys.description}</p>
                  <p className="text-xs text-white mb-1"><strong>Use:</strong> {sys.use}</p>
                  <p className="text-xs text-orange-300"><strong>Notes:</strong> {sys.notes}</p>
                </div>
              ))}
            </div>

            <div className="bg-orange-600/10 p-3 rounded border border-orange-500/30">
              <h5 className="text-sm font-medium text-orange-200 mb-2">Industrial Bonding Requirements</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {heavyIndustryContent.earthingSystems.bonding.map((bond, idx) => (
                  <div key={idx} className="text-xs text-white flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                    {bond}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Industries */}
      <Card className="border-teal-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-teal-400" />
            <CardTitle className="text-elec-yellow">{processIndustries.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Chemical Plants */}
          <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              {processIndustries.chemical.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{processIndustries.chemical.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-teal-200 mb-2">Key Considerations</h5>
                {processIndustries.chemical.considerations.map((con, idx) => (
                  <div key={idx} className="bg-teal-600/10 p-2 rounded mb-2">
                    <span className="text-xs text-teal-300 font-medium">{con.aspect}:</span>
                    <p className="text-xs text-white">{con.requirements}</p>
                  </div>
                ))}
              </div>
              <div>
                <h5 className="text-sm font-medium text-teal-200 mb-2">Typical Equipment</h5>
                {processIndustries.chemical.equipment.map((eq, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-teal-400 mt-0.5 flex-shrink-0" />
                    {eq}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Food Processing */}
          <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              {processIndustries.foodProcessing.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{processIndustries.foodProcessing.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {processIndustries.foodProcessing.zones.map((zone, idx) => (
                <div key={idx} className={`p-3 rounded border ${
                  zone.zone === 'High Care Areas' ? 'bg-red-500/10 border-red-500/30' :
                  zone.zone === 'Production Areas' ? 'bg-orange-500/10 border-orange-500/30' :
                  zone.zone === 'Low Risk Areas' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  'bg-green-500/10 border-green-500/30'
                }`}>
                  <h5 className="text-xs font-medium text-white mb-1">{zone.zone}</h5>
                  <p className="text-xs text-white">{zone.requirements}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-teal-600/10 p-3 rounded border border-teal-500/30">
                <h5 className="text-sm font-medium text-teal-200 mb-2">Hygiene Standards</h5>
                {processIndustries.foodProcessing.standards.map((std, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {std}
                  </div>
                ))}
              </div>
              <div className="bg-teal-600/10 p-3 rounded border border-teal-500/30">
                <h5 className="text-sm font-medium text-teal-200 mb-2">Installation Methods</h5>
                {processIndustries.foodProcessing.installation.map((inst, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <Wrench className="h-3 w-3 text-teal-400 mt-0.5 flex-shrink-0" />
                    {inst}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pharmaceutical */}
          <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Pill className="h-4 w-4" />
              {processIndustries.pharmaceutical.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{processIndustries.pharmaceutical.description}</p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-teal-500/30">
                    <th className="text-left py-2 text-teal-200">Classification</th>
                    <th className="text-left py-2 text-teal-200">Particle Count</th>
                    <th className="text-left py-2 text-teal-200">Description</th>
                    <th className="text-left py-2 text-teal-200">Electrical Requirements</th>
                  </tr>
                </thead>
                <tbody>
                  {processIndustries.pharmaceutical.classifications.map((cls, idx) => (
                    <tr key={idx} className="border-b border-teal-500/20">
                      <td className="py-2 text-white font-medium">{cls.class}</td>
                      <td className="py-2 text-white">{cls.particles}</td>
                      <td className="py-2 text-white">{cls.description}</td>
                      <td className="py-2 text-teal-300">{cls.electrical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-teal-600/10 p-3 rounded border border-teal-500/30">
                <h5 className="text-sm font-medium text-teal-200 mb-2">Equipment Requirements</h5>
                {processIndustries.pharmaceutical.requirements.map((req, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-teal-400 mt-0.5 flex-shrink-0" />
                    {req}
                  </div>
                ))}
              </div>
              <div className="bg-teal-600/10 p-3 rounded border border-teal-500/30">
                <h5 className="text-sm font-medium text-teal-200 mb-2">Validation Requirements</h5>
                {processIndustries.pharmaceutical.validation.map((val, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <Book className="h-3 w-3 text-teal-400 mt-0.5 flex-shrink-0" />
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Water Treatment */}
          <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Waves className="h-4 w-4" />
              {processIndustries.waterTreatment.subtitle}
            </h4>
            <p className="text-sm text-white mb-3">{processIndustries.waterTreatment.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-teal-200 mb-2">Treatment Areas</h5>
                {processIndustries.waterTreatment.areas.map((area, idx) => (
                  <div key={idx} className="bg-teal-600/10 p-2 rounded mb-2">
                    <span className="text-xs text-teal-300 font-medium">{area.area}:</span>
                    <p className="text-xs text-white">{area.considerations}</p>
                  </div>
                ))}
              </div>
              <div>
                <h5 className="text-sm font-medium text-teal-200 mb-2">Control Systems</h5>
                {processIndustries.waterTreatment.control.map((ctrl, idx) => (
                  <div key={idx} className="text-xs text-white mb-1 flex items-start gap-2">
                    <CircuitBoard className="h-3 w-3 text-teal-400 mt-0.5 flex-shrink-0" />
                    {ctrl}
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-teal-500/30">
                    <th className="text-left py-2 text-teal-200">System</th>
                    <th className="text-left py-2 text-teal-200">Typical Size</th>
                    <th className="text-left py-2 text-teal-200">Control</th>
                    <th className="text-left py-2 text-teal-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {processIndustries.waterTreatment.typicalSystems.map((sys, idx) => (
                    <tr key={idx} className="border-b border-teal-500/20">
                      <td className="py-2 text-white">{sys.system}</td>
                      <td className="py-2 text-white">{sys.size}</td>
                      <td className="py-2 text-white">{sys.control}</td>
                      <td className="py-2 text-teal-300">{sys.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Types Guide */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Factory className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Industrial Project Types</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {projectTypes.map((project, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                <h4 className="font-medium text-white">{project.type}</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                    {project.duration}
                  </Badge>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                    {project.cost}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">Complexity Level</span>
                  <span className="text-blue-300">{project.complexity}%</span>
                </div>
                <Progress value={project.complexity} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Safety Requirements */}
      <Card className="border-red-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Critical Safety Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {safetyRequirements.map((req, index) => (
            <div key={index} className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-red-200 mb-1">{req.requirement}</h4>
                  <p className="text-sm text-white">{req.description}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    req.level === 'Critical' ? 'border-red-500 text-red-400' :
                    'border-purple-500 text-purple-400'
                  }`}
                >
                  {req.level}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Hazard Assessment */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Hazard Categories & Risk Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {hazardCategories.map((hazard, index) => (
            <div key={index} className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-medium text-orange-200">{hazard.hazard}</h4>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    hazard.risk === 'Critical' ? 'border-red-500 text-red-400' :
                    hazard.risk === 'High' ? 'border-orange-500 text-orange-400' :
                    'border-yellow-500 text-yellow-400'
                  }`}
                >
                  {hazard.risk} Risk
                </Badge>
              </div>
              <p className="text-sm text-white">{hazard.mitigation}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pre-Project Checklist */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Industrial Project Checklist</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Obtain ATEX zone classification documentation from client/designer",
            "Complete comprehensive hazard and risk assessment (DSEAR if applicable)",
            "Ensure all personnel have appropriate industrial qualifications (CompEx, HV AP)",
            "Verify permit to work systems are in place and understood",
            "Coordinate with production scheduling to minimise downtime impact",
            "Verify all equipment has appropriate IP, ATEX ratings and certification",
            "Plan isolation procedures for live industrial systems (LOTO)",
            "Arrange specialist lifting equipment for heavy machinery",
            "Prepare emergency shutdown and evacuation procedures",
            "Coordinate with HSE requirements and insurance conditions",
            "Plan for specialist testing equipment (HV, insulation resistance, earth loop)",
            "Arrange arc flash assessment for HV work and appropriate PPE",
            "Confirm commissioning and handover procedures with client"
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-white">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrialOverviewCards;
