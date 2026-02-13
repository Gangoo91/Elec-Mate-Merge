
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Building,
  Users,
  Wrench,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
  Calendar,
  FileText,
  HardHat,
  Lock,
  Phone,
  MapPin,
  Clock,
  Flame,
  Wind,
  Server,
  Zap
} from "lucide-react";

const CommercialPlanningSection = () => {
  const siteSurveyRequirements = {
    title: "Site Survey Requirements for Commercial",
    description: "Commercial site surveys require more comprehensive assessment than domestic due to scale, complexity, and multiple stakeholder requirements",
    categories: [
      {
        category: "Existing Electrical Infrastructure",
        icon: Zap,
        items: [
          { check: "Main switchboard location, age, and condition", importance: "Critical" },
          { check: "Incoming supply type and capacity (kVA rating)", importance: "Critical" },
          { check: "Earthing arrangement (TN-C-S, TN-S, TT)", importance: "Critical" },
          { check: "Maximum demand records and load survey data", importance: "Critical" },
          { check: "Existing distribution board locations and ratings", importance: "Important" },
          { check: "Cable containment routes and spare capacity", importance: "Important" },
          { check: "Sub-metering arrangements", importance: "Important" },
          { check: "Standby generator provisions", importance: "Important" },
          { check: "UPS systems and clean power requirements", importance: "Important" },
          { check: "Previous test results and EICR reports", importance: "Important" }
        ]
      },
      {
        category: "Building Structure and Services",
        icon: Building,
        items: [
          { check: "Building construction type and fire compartmentation", importance: "Critical" },
          { check: "Floor construction (raised access floor, screed depth)", importance: "Critical" },
          { check: "Ceiling type and accessibility (suspended, exposed)", importance: "Important" },
          { check: "Riser locations and available space", importance: "Important" },
          { check: "Existing penetrations and fire stopping", importance: "Critical" },
          { check: "Structural restrictions (beams, post-tensioned floors)", importance: "Important" },
          { check: "Asbestos register and survey status", importance: "Critical" },
          { check: "Listed building or conservation area restrictions", importance: "Legal" }
        ]
      },
      {
        category: "Other Building Services",
        icon: Wind,
        items: [
          { check: "HVAC system locations and requirements", importance: "Important" },
          { check: "BMS/controls infrastructure", importance: "Important" },
          { check: "Data/telecommunications routes", importance: "Important" },
          { check: "Fire alarm system type and zones", importance: "Critical" },
          { check: "Emergency lighting system type", importance: "Critical" },
          { check: "Security systems and access control", importance: "Important" },
          { check: "Plumbing and water services", importance: "Important" },
          { check: "Gas installations and meter locations", importance: "Safety" }
        ]
      },
      {
        category: "Operational Requirements",
        icon: Users,
        items: [
          { check: "Building occupancy and operating hours", importance: "Important" },
          { check: "Business-critical areas and equipment", importance: "Critical" },
          { check: "Tenant demise boundaries (multi-tenanted)", importance: "Important" },
          { check: "Loading bay access and delivery times", importance: "Important" },
          { check: "Security requirements and escort needs", importance: "Important" },
          { check: "Noise and disruption restrictions", importance: "Important" },
          { check: "Out-of-hours working requirements", importance: "Important" }
        ]
      }
    ],
    surveyOutputs: [
      "Site survey report with photographs",
      "Existing schematic diagrams (verified)",
      "Load analysis and diversity calculations",
      "Cable route survey and proposed containment",
      "Risk assessment for installation works",
      "Preliminary programme and access requirements"
    ]
  };

  const tradeCoordination = {
    title: "Coordination with Other Trades",
    description: "Successful commercial installations require close coordination with multiple specialist contractors throughout the project",
    trades: [
      {
        trade: "HVAC/Mechanical",
        coordination: [
          "Power requirements for AHUs, FCUs, chillers, pumps",
          "Control panel locations and BMS interface requirements",
          "Containment routes - avoid clashes with ductwork",
          "Isolator positions for mechanical equipment",
          "Interlock requirements with fire alarm system",
          "Variable speed drive specifications and harmonic considerations"
        ],
        criticalPoints: [
          "Agree power supplies before mechanical contractor orders equipment",
          "Coordinate ceiling space allocation",
          "Confirm motor starting method (DOL, star-delta, VSD)"
        ]
      },
      {
        trade: "Data/Communications",
        coordination: [
          "Containment separation requirements (EMC)",
          "Power for comms rooms and data cabinets",
          "UPS requirements and clean earth provisions",
          "Floor box locations for integrated power/data",
          "Backbone route coordination in risers",
          "Fibre optic tray requirements"
        ],
        criticalPoints: [
          "Maintain minimum separation distances",
          "Agree floor box grid layout early",
          "Coordinate ceiling grid for data drops"
        ]
      },
      {
        trade: "Fire Systems",
        coordination: [
          "Fire alarm supply requirements (dedicated circuit)",
          "Interface wiring for plant shutdowns",
          "Door holder and smoke damper supplies",
          "Emergency lighting coordination",
          "Fire stopping coordination at penetrations",
          "Sprinkler system pump power requirements"
        ],
        criticalPoints: [
          "No RCD on fire alarm supply",
          "Fire rated cable where required",
          "Cause and effect matrix agreement"
        ]
      },
      {
        trade: "Lift Installation",
        coordination: [
          "Three-phase supply requirements",
          "Machine room location and ventilation",
          "Pit lighting and socket requirements",
          "Emergency recall power supply",
          "Intercom and alarm connections",
          "Fire service switch provisions"
        ],
        criticalPoints: [
          "Lift contractor to provide load data",
          "Coordinate shaft lighting installation",
          "Verify regenerative drive power handling"
        ]
      },
      {
        trade: "Security Systems",
        coordination: [
          "Power for access control system",
          "CCTV power and containment requirements",
          "Intruder alarm supply (battery backed)",
          "Integration with lighting controls",
          "Emergency door release interfaces"
        ],
        criticalPoints: [
          "Agree rack/equipment room locations",
          "Coordinate with door schedules",
          "Battery backup runtime requirements"
        ]
      },
      {
        trade: "Ceiling/Partitions",
        coordination: [
          "Luminaire and accessory positions before ceiling installation",
          "Above-ceiling access requirements",
          "Flexible conduit drops from ceiling void",
          "Partition penetrations and fire stopping",
          "Dado trunking coordination"
        ],
        criticalPoints: [
          "First fix before ceiling closes",
          "Coordinate lighting layout with ceiling grid",
          "Access panels where needed"
        ]
      }
    ],
    coordinationMeetings: {
      title: "Coordination Meeting Requirements",
      meetings: [
        { stage: "Pre-construction", frequency: "Before works start", attendees: "All trades, PM, designer" },
        { stage: "Weekly coordination", frequency: "Weekly during works", attendees: "Trade supervisors, PM" },
        { stage: "MEP coordination", frequency: "Weekly/bi-weekly", attendees: "M&E trades only" },
        { stage: "Pre-ceiling close", frequency: "Before ceiling installation", attendees: "All ceiling trades, FM" },
        { stage: "Commissioning coordination", frequency: "Before commissioning", attendees: "All M&E, commissioning manager" }
      ]
    }
  };

  const phasedInstallation = {
    title: "Phased Installation Planning",
    description: "Commercial installations often require phased delivery to maintain building operations or meet sectional completion requirements",
    phases: [
      {
        phase: "Phase 1: Infrastructure",
        duration: "Weeks 1-4 (typical)",
        activities: [
          "Main switchboard installation/modification",
          "Primary containment routes (risers, main runs)",
          "Sub-main cable installation",
          "Distribution board installation",
          "Fire stopping at penetrations"
        ],
        prerequisites: [
          "Main contractor to provide clear access",
          "Builders work complete in plant areas",
          "Scaffold or MEWPs available",
          "Power available for testing"
        ],
        handover: "Distribution boards powered, ready for final circuit installation"
      },
      {
        phase: "Phase 2: Rough-in/First Fix",
        duration: "Weeks 3-8 (typical)",
        activities: [
          "Secondary containment installation",
          "Cable installation to final positions",
          "Back box installation",
          "Luminaire wiring (to ceiling void)",
          "Floor box installation"
        ],
        prerequisites: [
          "Walls constructed to first fix stage",
          "Ceiling grid installed (for ceiling work)",
          "Raised floor installed",
          "Coordination drawings approved"
        ],
        handover: "Ready for ceiling close, second fix to commence"
      },
      {
        phase: "Phase 3: Second Fix",
        duration: "Weeks 7-12 (typical)",
        activities: [
          "Luminaire installation and connection",
          "Accessory installation (sockets, switches)",
          "Final equipment connections",
          "Labelling and circuit identification",
          "Terminations and connections"
        ],
        prerequisites: [
          "Decoration complete (or protected)",
          "Ceiling installation complete",
          "Other trades clear of areas",
          "Equipment delivered and positioned"
        ],
        handover: "Installation complete, ready for testing"
      },
      {
        phase: "Phase 4: Testing and Commissioning",
        duration: "Weeks 11-14 (typical)",
        activities: [
          "Initial verification testing",
          "Emergency lighting testing",
          "Functional testing of all systems",
          "Witness testing with client",
          "Snagging and remedial works"
        ],
        prerequisites: [
          "Installation fully complete",
          "Safe access to all areas",
          "Other M&E systems ready for interface testing",
          "Building energised safely"
        ],
        handover: "EIC issued, O&M manuals provided, practical completion"
      }
    ],
    sectoralCompletion: {
      title: "Sectional Completion Considerations",
      considerations: [
        "Temporary power provisions for completed areas",
        "Isolation capabilities between sections",
        "Fire compartment boundaries respected",
        "Access routes for ongoing works maintained",
        "Separate metering if required for tenant occupation",
        "Commissioning resources split across sections"
      ]
    }
  };

  const businessContinuity = {
    title: "Business Continuity Considerations",
    description: "Working in occupied buildings requires careful planning to minimise disruption to business operations",
    considerations: [
      {
        area: "Power Outage Planning",
        requirements: [
          "Identify circuits that can be isolated without impact",
          "Plan shutdowns during low-impact periods (evenings, weekends)",
          "Provide temporary supplies where necessary",
          "Communicate planned outages with adequate notice (typically 48hrs minimum)",
          "Have contingency for emergency restoration"
        ],
        documentation: "Shutdown request form, risk assessment, method statement"
      },
      {
        area: "Critical Equipment Protection",
        requirements: [
          "Identify UPS-protected equipment and runtime",
          "Plan works to avoid UPS battery depletion",
          "Coordinate with IT for server room works",
          "Provide temporary cooling if HVAC affected",
          "Maintain fire alarm operation throughout"
        ],
        documentation: "Critical equipment register, backup procedures"
      },
      {
        area: "Occupied Area Working",
        requirements: [
          "Barrier and signage for work areas",
          "Dust control measures",
          "Noise restrictions during business hours",
          "Clear work areas at end of each day",
          "Safe storage of materials and equipment"
        ],
        documentation: "Work area plan, housekeeping checklist"
      },
      {
        area: "Emergency Procedures",
        requirements: [
          "Maintain fire escape routes at all times",
          "Emergency lighting must remain functional",
          "Fire alarm system operational (or fire watch)",
          "First aid facilities available",
          "Emergency contact numbers displayed"
        ],
        documentation: "Emergency procedure, fire watch procedure if required"
      }
    ],
    communicationPlan: {
      title: "Communication Requirements",
      stakeholders: [
        { stakeholder: "Building Management", method: "Weekly progress meetings, daily updates" },
        { stakeholder: "Tenants", method: "Written notice of works affecting areas" },
        { stakeholder: "Facilities Team", method: "Daily briefings, out-of-hours contact" },
        { stakeholder: "Security", method: "Access requirements, equipment movements" },
        { stakeholder: "Client PM", method: "Weekly reports, issues escalation" }
      ]
    }
  };

  const accessAndSecurity = {
    title: "Access and Security Arrangements",
    description: "Commercial premises have security requirements that must be planned and coordinated before works commence",
    requirements: [
      {
        requirement: "Site Induction",
        details: [
          "Building-specific health and safety induction",
          "Fire evacuation procedures and muster points",
          "Emergency contact information",
          "Site rules and prohibited areas",
          "Environmental requirements (waste, materials)",
          "Permit to work requirements"
        ]
      },
      {
        requirement: "Access Control",
        details: [
          "ID badges or passes for all personnel",
          "Sign in/out procedures",
          "Restricted area access permissions",
          "Out-of-hours access arrangements",
          "Vehicle access for deliveries",
          "Tool and material storage locations"
        ]
      },
      {
        requirement: "Working Hours",
        details: [
          "Core hours for normal working",
          "Extended hours arrangements and costs",
          "Weekend working approval process",
          "Noise restrictions during business hours",
          "Hot works restrictions and permits"
        ]
      },
      {
        requirement: "Material Delivery",
        details: [
          "Loading bay booking requirements",
          "Delivery vehicle size restrictions",
          "Lift usage for materials",
          "Storage area allocation",
          "Packaging disposal arrangements"
        ]
      }
    ],
    escortRequirements: {
      title: "Escort Requirements",
      areas: [
        { area: "Server rooms/data centres", escort: "IT escort typically required" },
        { area: "Switchrooms/substations", escort: "Authorised person escort" },
        { area: "Tenant demise", escort: "Tenant or building management" },
        { area: "Secure areas", escort: "Security escort required" },
        { area: "Roof access", escort: "Permit and possibly escort" }
      ]
    }
  };

  const cdmRegulations = {
    title: "CDM Regulations (Construction Design and Management)",
    description: "The Construction (Design and Management) Regulations 2015 apply to all construction projects including commercial electrical installations",
    overview: {
      purpose: "Improve health and safety in construction by ensuring risks are managed throughout the project lifecycle",
      application: "Applies to all construction work - commercial electrical work is always in scope"
    },
    dutyHolders: [
      {
        role: "Client",
        responsibilities: [
          "Make suitable arrangements for managing the project",
          "Ensure sufficient time and resources allocated",
          "Appoint principal designer and contractor (if applicable)",
          "Provide pre-construction information",
          "Ensure welfare facilities provided"
        ],
        commercial: "Building owner or tenant commissioning the work"
      },
      {
        role: "Principal Designer",
        responsibilities: [
          "Plan, manage and monitor pre-construction phase",
          "Identify and eliminate/control foreseeable risks",
          "Ensure designers comply with duties",
          "Prepare health and safety file"
        ],
        commercial: "Typically M&E consultant on larger projects"
      },
      {
        role: "Principal Contractor",
        responsibilities: [
          "Plan, manage and monitor construction phase",
          "Prepare construction phase plan",
          "Organise cooperation between contractors",
          "Ensure site inductions carried out",
          "Prevent unauthorised access"
        ],
        commercial: "Main building contractor or M&E contractor"
      },
      {
        role: "Designer",
        responsibilities: [
          "Not start work unless client aware of duties",
          "Eliminate foreseeable risks where possible",
          "Reduce risks that cannot be eliminated",
          "Provide information about remaining risks"
        ],
        commercial: "Electrical designer/engineer"
      },
      {
        role: "Contractor",
        responsibilities: [
          "Plan, manage and monitor own work",
          "Coordinate activities with others",
          "Provide workers with information and training",
          "Not start work until satisfied arrangements in place"
        ],
        commercial: "Electrical contractor"
      },
      {
        role: "Worker",
        responsibilities: [
          "Cooperate with employer and others",
          "Report anything likely to endanger safety",
          "Use equipment properly"
        ],
        commercial: "Electricians and apprentices"
      }
    ],
    keyDocuments: [
      {
        document: "Pre-Construction Information",
        purpose: "Information about project and existing hazards",
        content: "Project description, existing services, asbestos, previous survey data",
        responsible: "Client (with support from principal designer)"
      },
      {
        document: "Construction Phase Plan",
        purpose: "How health and safety will be managed during construction",
        content: "Site rules, risk assessments, method statements, emergency procedures",
        responsible: "Principal contractor"
      },
      {
        document: "Health and Safety File",
        purpose: "Information for future maintenance and construction",
        content: "As-built drawings, equipment manuals, residual risks, safe systems",
        responsible: "Principal designer (handed to client)"
      }
    ],
    thresholds: {
      title: "Project Notification Thresholds",
      thresholds: [
        { threshold: "More than 20 workers at any one time", requirement: "Must notify HSE (F10)" },
        { threshold: "More than 30 days duration AND more than 20 workers", requirement: "Must notify HSE (F10)" },
        { threshold: "More than 500 person-days of work", requirement: "Must notify HSE (F10)" },
        { threshold: "Any project with more than one contractor", requirement: "Must appoint PC and PD (if not already)" }
      ]
    }
  };

  const healthAndSafety = {
    title: "Health and Safety Requirements",
    description: "Commercial electrical work requires comprehensive health and safety planning and documentation",
    requirements: [
      {
        category: "Risk Assessments",
        items: [
          "Task-specific risk assessments for all activities",
          "COSHH assessments for hazardous substances",
          "Manual handling assessments",
          "Working at height assessments",
          "Electrical safety risk assessments",
          "Confined space assessments (if applicable)"
        ]
      },
      {
        category: "Method Statements",
        items: [
          "Safe system of work for each activity",
          "Step-by-step procedures",
          "Required competencies and training",
          "Tools and equipment specifications",
          "PPE requirements",
          "Emergency procedures"
        ]
      },
      {
        category: "Permits to Work",
        items: [
          "Electrical isolation permit",
          "Hot works permit (soldering, heat shrink)",
          "Working at height permit (roof access)",
          "Confined space entry permit",
          "Excavation permit (external works)"
        ]
      },
      {
        category: "Personal Protective Equipment",
        items: [
          "Safety footwear (steel toe caps)",
          "Hard hat (construction areas)",
          "High visibility clothing",
          "Safety glasses (drilling, grinding)",
          "Gloves (appropriate to task)",
          "Arc flash PPE (live working)"
        ]
      }
    ],
    siteRules: {
      title: "Typical Commercial Site Rules",
      rules: [
        "Sign in/out daily",
        "Wear correct PPE at all times",
        "No work on live equipment without permit",
        "Keep work areas clean and tidy",
        "Report all accidents and near misses",
        "No alcohol or drugs on site",
        "Respect restricted areas",
        "Follow fire procedures"
      ]
    }
  };

  const permitsToWork = {
    title: "Permits to Work in Commercial Premises",
    description: "Permit to work systems provide formal authorisation for high-risk activities",
    types: [
      {
        type: "Electrical Isolation Permit",
        purpose: "Authorise work on or near electrical equipment after safe isolation",
        process: [
          "Request submitted to authorised person",
          "Isolation carried out and verified",
          "Permit issued with isolation details",
          "Work carried out within permit scope",
          "Permit cancelled on completion",
          "System re-energised by authorised person"
        ],
        keyInformation: [
          "Equipment being isolated",
          "Points of isolation (circuit breaker numbers)",
          "Test verification details",
          "Lock-off and tag details",
          "Time validity of permit",
          "Signatures of issuer and recipient"
        ]
      },
      {
        type: "Hot Works Permit",
        purpose: "Authorise use of naked flames or heat-producing equipment",
        process: [
          "Complete hot works risk assessment",
          "Identify fire hazards and controls",
          "Obtain permit from building management",
          "Remove combustibles from area",
          "Have fire extinguisher available",
          "Fire watch during and after work"
        ],
        keyInformation: [
          "Location and nature of hot work",
          "Fire precautions in place",
          "Duration of permit",
          "Fire watch period after work (typically 60 mins)",
          "Contact details for fire watch"
        ]
      },
      {
        type: "Working at Height Permit",
        purpose: "Authorise work at height (roofs, above ceilings, scaffolds)",
        process: [
          "Complete working at height risk assessment",
          "Select appropriate access equipment",
          "Ensure competent persons carrying out work",
          "Implement edge protection if required",
          "Weather considerations"
        ],
        keyInformation: [
          "Location and height of work",
          "Access equipment to be used",
          "Edge protection arrangements",
          "Rescue plan",
          "Competency of workers"
        ]
      },
      {
        type: "Roof Access Permit",
        purpose: "Control access to roofs for equipment installation or maintenance",
        process: [
          "Request access from building management",
          "Complete roof access induction",
          "Identify fragile roof areas",
          "Plan safe access route",
          "Weather restrictions apply"
        ],
        keyInformation: [
          "Fragile roof areas marked",
          "Safe walking routes",
          "Edge protection requirements",
          "Maximum persons on roof",
          "Weather restrictions"
        ]
      }
    ],
    permitProcess: {
      title: "General Permit Process",
      steps: [
        { step: 1, action: "Plan work and identify permit requirements" },
        { step: 2, action: "Complete risk assessment and method statement" },
        { step: 3, action: "Request permit with adequate notice (24-48hrs typical)" },
        { step: 4, action: "Attend permit briefing with issuer" },
        { step: 5, action: "Receive permit and verify conditions" },
        { step: 6, action: "Carry out work within permit scope and time" },
        { step: 7, action: "Cancel permit on completion with issuer" }
      ]
    }
  };

  const planningPhases = [
    {
      phase: "Pre-Design Survey",
      icon: Building,
      activities: [
        "Comprehensive site survey (as detailed above)",
        "Existing services investigation and survey",
        "Load assessment and maximum demand calculation",
        "Coordination meetings with design team",
        "Review of architectural and M&E drawings",
        "Identify constraints and risks"
      ]
    },
    {
      phase: "Design Development",
      icon: Wrench,
      activities: [
        "Develop single line diagrams and schematics",
        "Design distribution board layouts and schedules",
        "Plan containment routes with coordination model",
        "Specify equipment and materials",
        "Produce installation drawings",
        "Design emergency lighting and fire alarm interfaces"
      ]
    },
    {
      phase: "Pre-Construction Planning",
      icon: ClipboardList,
      activities: [
        "Prepare construction phase plan (CDM)",
        "Develop detailed programme",
        "Procure materials and equipment",
        "Arrange site facilities and access",
        "Induct personnel and issue permits",
        "Coordinate with other trades"
      ]
    },
    {
      phase: "Implementation",
      icon: Users,
      activities: [
        "Execute installation per programme phases",
        "Quality inspections at key stages",
        "Progress reporting and coordination",
        "Variation management",
        "Health and safety monitoring",
        "Documentation and as-built records"
      ]
    }
  ];

  const specialConsiderations = [
    {
      area: "Emergency Lighting",
      icon: Lightbulb,
      requirements: [
        "Minimum 1 lux on escape routes (BS 5266)",
        "3-hour duration for sleeping accommodation",
        "Open area illumination: 0.5 lux minimum",
        "High risk task areas: adequate lux for safe shutdown",
        "Monthly function tests required",
        "Annual full duration tests required"
      ]
    },
    {
      area: "Fire Alarm Systems",
      icon: Flame,
      requirements: [
        "BS 5839-1 compliance for commercial",
        "Category L and/or P system as required",
        "Zone identification and monitoring",
        "Interface with building management systems",
        "Weekly call point rotation testing",
        "6-monthly service and annual certification"
      ]
    },
    {
      area: "IT Infrastructure",
      icon: Server,
      requirements: [
        "Clean earth provisions for server rooms",
        "UPS systems with adequate runtime",
        "Redundant power feeds where required",
        "Adequate cooling for IT loads",
        "Appropriate cable separation from power",
        "Structured cabling coordination"
      ]
    },
    {
      area: "Lightning Protection",
      icon: Zap,
      requirements: [
        "Risk assessment per BS EN 62305",
        "Bonding of LPS to electrical earth",
        "SPD installation at appropriate locations",
        "Equipotential bonding at building entry points",
        "Testing and certification requirements"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Site Survey Requirements */}
      <Card className="border-teal-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-teal-400" />
            <CardTitle className="text-teal-300">{siteSurveyRequirements.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-teal-500/50 bg-teal-500/10">
            <Info className="h-4 w-4 text-teal-400" />
            <AlertDescription className="text-teal-200 text-sm">
              {siteSurveyRequirements.description}
            </AlertDescription>
          </Alert>

          {siteSurveyRequirements.categories.map((category, index) => (
            <div key={index} className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
              <div className="flex items-center gap-2 mb-3">
                <category.icon className="h-5 w-5 text-teal-400" />
                <h4 className="font-medium text-white">{category.category}</h4>
              </div>
              <div className="space-y-2">
                {category.items.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-3 text-sm">
                    <div className="flex items-start gap-2 flex-1">
                      <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span className="text-teal-100">{item.check}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs flex-shrink-0 ${
                        item.importance === 'Critical' ? 'border-red-400 text-red-300' :
                        item.importance === 'Safety' ? 'border-orange-400 text-orange-300' :
                        item.importance === 'Legal' ? 'border-purple-400 text-purple-300' :
                        item.importance === 'Important' ? 'border-yellow-400 text-yellow-300' :
                        'border-white/40 text-white'
                      }`}
                    >
                      {item.importance}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
            <h4 className="font-medium text-white mb-3">Survey Outputs</h4>
            <ul className="space-y-2">
              {siteSurveyRequirements.surveyOutputs.map((output, idx) => (
                <li key={idx} className="text-sm text-teal-100 flex items-start gap-2">
                  <FileText className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  {output}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Trade Coordination */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">{tradeCoordination.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{tradeCoordination.description}</p>

          {tradeCoordination.trades.map((trade, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-medium text-white mb-3">{trade.trade}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-blue-200 mb-2">Coordination Points:</h5>
                  <ul className="space-y-1">
                    {trade.coordination.map((point, idx) => (
                      <li key={idx} className="text-xs text-blue-100 flex items-start gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-orange-200 mb-2">Critical Points:</h5>
                  <ul className="space-y-1">
                    {trade.criticalPoints.map((point, idx) => (
                      <li key={idx} className="text-xs text-orange-100 flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Coordination Meetings */}
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <h4 className="font-medium text-white mb-3">{tradeCoordination.coordinationMeetings.title}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-500/30">
                    <th className="text-left py-2 text-blue-200">Stage</th>
                    <th className="text-left py-2 text-blue-200">Frequency</th>
                    <th className="text-left py-2 text-blue-200">Attendees</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeCoordination.coordinationMeetings.meetings.map((meeting, idx) => (
                    <tr key={idx} className="border-b border-blue-500/20">
                      <td className="py-2 text-white text-xs">{meeting.stage}</td>
                      <td className="py-2 text-blue-300 text-xs">{meeting.frequency}</td>
                      <td className="py-2 text-white text-xs">{meeting.attendees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phased Installation Planning */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">{phasedInstallation.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{phasedInstallation.description}</p>

          {phasedInstallation.phases.map((phase, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">{phase.phase}</h4>
                <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {phase.duration}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-purple-200 mb-2">Activities:</h5>
                  <ul className="space-y-1">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="text-xs text-purple-100 flex items-start gap-2">
                        <span className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-amber-200 mb-2">Prerequisites:</h5>
                  <ul className="space-y-1">
                    {phase.prerequisites.map((prereq, idx) => (
                      <li key={idx} className="text-xs text-amber-100 flex items-start gap-2">
                        <span className="w-1 h-1 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-green-200 mb-2">Handover:</h5>
                  <p className="text-xs text-green-100">{phase.handover}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Sectional Completion */}
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
            <h4 className="font-medium text-white mb-3">{phasedInstallation.sectoralCompletion.title}</h4>
            <ul className="space-y-2">
              {phasedInstallation.sectoralCompletion.considerations.map((item, idx) => (
                <li key={idx} className="text-sm text-purple-100 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Business Continuity */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">{businessContinuity.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{businessContinuity.description}</p>

          {businessContinuity.considerations.map((item, index) => (
            <div key={index} className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
              <h4 className="font-medium text-white mb-2">{item.area}</h4>
              <div className="mb-3">
                <h5 className="text-sm font-medium text-amber-200 mb-2">Requirements:</h5>
                <ul className="space-y-1">
                  {item.requirements.map((req, idx) => (
                    <li key={idx} className="text-xs text-amber-100 flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-white"><strong>Documentation:</strong> {item.documentation}</p>
            </div>
          ))}

          {/* Communication Plan */}
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-4 w-4 text-amber-400" />
              <h4 className="font-medium text-white">{businessContinuity.communicationPlan.title}</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Stakeholder</th>
                    <th className="text-left py-2 text-amber-200">Communication Method</th>
                  </tr>
                </thead>
                <tbody>
                  {businessContinuity.communicationPlan.stakeholders.map((item, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white text-xs">{item.stakeholder}</td>
                      <td className="py-2 text-amber-300 text-xs">{item.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access and Security */}
      <Card className="border-indigo-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-indigo-400" />
            <CardTitle className="text-indigo-300">{accessAndSecurity.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{accessAndSecurity.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accessAndSecurity.requirements.map((req, index) => (
              <div key={index} className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                <h4 className="font-medium text-white mb-2">{req.requirement}</h4>
                <ul className="space-y-1">
                  {req.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-indigo-100 flex items-start gap-2">
                      <span className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Escort Requirements */}
          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
            <h4 className="font-medium text-white mb-3">{accessAndSecurity.escortRequirements.title}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-indigo-500/30">
                    <th className="text-left py-2 text-indigo-200">Area</th>
                    <th className="text-left py-2 text-indigo-200">Escort Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  {accessAndSecurity.escortRequirements.areas.map((item, idx) => (
                    <tr key={idx} className="border-b border-indigo-500/20">
                      <td className="py-2 text-white text-xs">{item.area}</td>
                      <td className="py-2 text-indigo-300 text-xs">{item.escort}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CDM Regulations */}
      <Card className="border-red-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">{cdmRegulations.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200 text-sm">
              <strong>Purpose:</strong> {cdmRegulations.overview.purpose}
              <br />
              <strong>Application:</strong> {cdmRegulations.overview.application}
            </AlertDescription>
          </Alert>

          {/* Duty Holders */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">CDM Duty Holders</h4>
            {cdmRegulations.dutyHolders.map((holder, index) => (
              <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-red-200">{holder.role}</h5>
                  <span className="text-xs text-white">{holder.commercial}</span>
                </div>
                <ul className="space-y-1">
                  {holder.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-xs text-red-100 flex items-start gap-2">
                      <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Documents */}
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            <h4 className="font-medium text-white mb-3">Key CDM Documents</h4>
            <div className="space-y-3">
              {cdmRegulations.keyDocuments.map((doc, idx) => (
                <div key={idx} className="bg-red-600/10 p-3 rounded border border-red-500/30">
                  <h5 className="font-medium text-red-200 text-sm">{doc.document}</h5>
                  <p className="text-xs text-white mb-1"><strong>Purpose:</strong> {doc.purpose}</p>
                  <p className="text-xs text-white mb-1"><strong>Content:</strong> {doc.content}</p>
                  <p className="text-xs text-red-100"><strong>Responsible:</strong> {doc.responsible}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Thresholds */}
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            <h4 className="font-medium text-white mb-3">{cdmRegulations.thresholds.title}</h4>
            <div className="space-y-2">
              {cdmRegulations.thresholds.thresholds.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 text-sm">
                  <span className="text-white">{item.threshold}</span>
                  <Badge variant="outline" className="border-red-400 text-red-300 text-xs flex-shrink-0">
                    {item.requirement}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health and Safety */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">{healthAndSafety.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{healthAndSafety.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthAndSafety.requirements.map((req, index) => (
              <div key={index} className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h4 className="font-medium text-orange-200 mb-2">{req.category}</h4>
                <ul className="space-y-1">
                  {req.items.map((item, idx) => (
                    <li key={idx} className="text-xs text-orange-100 flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Site Rules */}
          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
            <h4 className="font-medium text-white mb-3">{healthAndSafety.siteRules.title}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {healthAndSafety.siteRules.rules.map((rule, idx) => (
                <div key={idx} className="text-xs text-orange-100 flex items-center gap-2 bg-orange-600/10 p-2 rounded">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permits to Work */}
      <Card className="border-rose-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-rose-400" />
            <CardTitle className="text-rose-300">{permitsToWork.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{permitsToWork.description}</p>

          {permitsToWork.types.map((permit, index) => (
            <div key={index} className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
              <h4 className="font-medium text-white mb-2">{permit.type}</h4>
              <p className="text-sm text-rose-200 mb-3"><strong>Purpose:</strong> {permit.purpose}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-rose-200 mb-2">Process:</h5>
                  <ol className="space-y-1">
                    {permit.process.map((step, idx) => (
                      <li key={idx} className="text-xs text-rose-100 flex items-start gap-2">
                        <span className="text-rose-400 font-medium">{idx + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-rose-200 mb-2">Key Information:</h5>
                  <ul className="space-y-1">
                    {permit.keyInformation.map((info, idx) => (
                      <li key={idx} className="text-xs text-rose-100 flex items-start gap-2">
                        <span className="w-1 h-1 bg-rose-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* General Permit Process */}
          <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
            <h4 className="font-medium text-white mb-3">{permitsToWork.permitProcess.title}</h4>
            <div className="space-y-2">
              {permitsToWork.permitProcess.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Badge variant="outline" className="border-rose-400 text-rose-300 w-6 h-6 rounded-full flex items-center justify-center p-0 flex-shrink-0">
                    {step.step}
                  </Badge>
                  <span className="text-sm text-rose-100">{step.action}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planning Process Overview */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Commercial Planning Process Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {planningPhases.map((phase, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <phase.icon className="h-5 w-5 text-blue-400" />
                <h4 className="font-medium text-white">{phase.phase}</h4>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {phase.activities.map((activity, idx) => (
                  <li key={idx} className="text-sm text-blue-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Special System Requirements */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Special System Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialConsiderations.map((consideration, index) => (
              <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <consideration.icon className="h-5 w-5 text-green-400" />
                  <h4 className="font-medium text-white">{consideration.area}</h4>
                </div>
                <ul className="space-y-1">
                  {consideration.requirements.map((requirement, idx) => (
                    <li key={idx} className="text-xs text-green-200 flex items-start gap-2">
                      <span className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommercialPlanningSection;
