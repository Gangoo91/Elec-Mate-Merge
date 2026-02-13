
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ClipboardList,
  Home,
  AlertTriangle,
  Calculator,
  FileText,
  Users,
  MapPin,
  Zap,
  CheckCircle,
  Info,
  Building,
  Route
} from "lucide-react";

const DomesticPlanningSection = () => {
  const planningSteps = [
    {
      title: "Initial Site Survey",
      description: "Conduct thorough assessment of existing installation",
      checklist: [
        "Check condition of existing consumer unit and earthing",
        "Assess cable routes and accessibility for new installations",
        "Identify any asbestos or hazardous materials present",
        "Photograph existing installation for records",
        "Test existing circuits for safety and compliance",
        "Check for adequate space for new consumer unit if required"
      ]
    },
    {
      title: "Load Assessment & Future Planning",
      description: "Calculate electrical loads and anticipate future requirements",
      checklist: [
        "List all electrical appliances with current ratings",
        "Calculate diversity factors for different circuit types",
        "Plan for electric vehicle charging infrastructure",
        "Consider heat pump installation requirements",
        "Assess need for solar PV integration",
        "Plan for smart home technology expansion"
      ]
    },
    {
      title: "Design & Circuit Planning",
      description: "Plan circuit layout and protection requirements",
      checklist: [
        "Design ring final and radial socket circuits",
        "Plan lighting circuit arrangements and switching",
        "Specify appropriate RCD and RCBO protection",
        "Consider surge protection device requirements",
        "Plan cable routes and containment systems",
        "Design earthing and bonding arrangements"
      ]
    },
    {
      title: "Regulatory Compliance",
      description: "Ensure all regulatory requirements are met",
      checklist: [
        "Determine Part P Building Regulations requirements",
        "Check if Building Control notification needed",
        "Verify competent person scheme registration",
        "Plan inspection and testing procedures",
        "Prepare certification documentation",
        "Consider CDM regulations for larger projects"
      ]
    }
  ];

  const siteSurveyChecklist = {
    title: "Comprehensive Site Survey Checklist",
    icon: ClipboardList,
    sections: [
      {
        category: "Existing Installation Assessment",
        items: [
          { check: "Consumer unit type, age, and condition", importance: "Critical" },
          { check: "Earthing arrangement (TN-C-S, TN-S, TT)", importance: "Critical" },
          { check: "Main protective bonding conductors present and adequate", importance: "Critical" },
          { check: "Supplementary bonding requirements", importance: "Important" },
          { check: "Existing circuit protection devices and ratings", importance: "Important" },
          { check: "Cable types and conditions visible", importance: "Important" },
          { check: "Previous test results (if available)", importance: "Useful" }
        ]
      },
      {
        category: "Property Assessment",
        items: [
          { check: "Property type and construction (solid wall, cavity, timber frame)", importance: "Critical" },
          { check: "Number of floors and accessibility", importance: "Important" },
          { check: "Loft access and condition", importance: "Important" },
          { check: "Basement or cellar presence", importance: "Important" },
          { check: "Floor construction (suspended timber, concrete)", importance: "Important" },
          { check: "Presence of asbestos materials", importance: "Critical" },
          { check: "Listed building or conservation area restrictions", importance: "Legal" }
        ]
      },
      {
        category: "Services and Utilities",
        items: [
          { check: "Location of incoming supply and meter", importance: "Critical" },
          { check: "Supply type (single phase/three phase)", importance: "Critical" },
          { check: "Main fuse rating (60A, 80A, 100A)", importance: "Critical" },
          { check: "Gas meter and pipework locations", importance: "Safety" },
          { check: "Water services and stopcock location", importance: "Safety" },
          { check: "Telephone/data cable routes", importance: "Useful" },
          { check: "Oil tank location (if applicable)", importance: "Safety" }
        ]
      },
      {
        category: "Client Requirements",
        items: [
          { check: "Specific requirements and preferences", importance: "Important" },
          { check: "Budget constraints and priorities", importance: "Important" },
          { check: "Timeline expectations", importance: "Important" },
          { check: "Future plans (extensions, EV charging, solar)", importance: "Useful" },
          { check: "Access arrangements and working hours", importance: "Important" },
          { check: "Vulnerable occupants or special requirements", importance: "Safety" }
        ]
      }
    ]
  };

  const loadCalculationGuidance = {
    title: "Load Calculation Guidance",
    icon: Calculator,
    basicFormula: "Total Connected Load x Diversity Factor = Maximum Demand",
    diversityFactors: [
      { circuit: "Lighting", diversity: "66%", notes: "Assume 66% of total lighting load in use" },
      { circuit: "Socket Outlets (Ring)", diversity: "See table", notes: "First 10A + 30% of remainder + 5A per socket over 10" },
      { circuit: "Cooker", diversity: "10A + 30% of remainder", notes: "e.g., 12kW cooker = 10A + 30% of (52A-10A) = 22.6A" },
      { circuit: "Immersion Heater", diversity: "100%", notes: "Full load always assumed" },
      { circuit: "Shower", diversity: "100%", notes: "Full load always assumed" },
      { circuit: "Electric Heating", diversity: "100%", notes: "Full load for heating circuits" },
      { circuit: "EV Charger", diversity: "100%", notes: "Dedicated circuit, full load assumed" }
    ],
    exampleCalculation: [
      { item: "Lighting (10 x 100W)", connected: "1000W", diversity: "66%", demand: "660W (2.9A)" },
      { item: "Ring Circuit 1 (kitchen)", connected: "7200W (32A)", diversity: "First 10A + 30%", demand: "16.6A" },
      { item: "Ring Circuit 2 (ground)", connected: "7200W (32A)", diversity: "First 10A + 30%", demand: "16.6A" },
      { item: "Ring Circuit 3 (first)", connected: "7200W (32A)", diversity: "First 10A + 30%", demand: "16.6A" },
      { item: "Cooker (12kW)", connected: "52A", diversity: "10A + 30%", demand: "22.6A" },
      { item: "Shower (9.5kW)", connected: "41A", diversity: "100%", demand: "41A" },
      { item: "Immersion (3kW)", connected: "13A", diversity: "100%", demand: "13A" }
    ],
    totalDemand: "Approximately 130A - requires 100A supply with careful load management",
    considerations: [
      "Always verify supply capacity with DNO if close to limits",
      "Consider smart load management for EV charging",
      "Future-proof design by allowing headroom for additions",
      "Document all calculations for certification"
    ]
  };

  const cableRoutePlanning = {
    title: "Cable Route Planning",
    icon: Route,
    principles: [
      {
        principle: "Safe Zones",
        description: "Cables in walls must be run in safe zones or protected by RCD",
        details: [
          "Horizontal runs: 150mm from ceiling or floor",
          "Vertical runs: 150mm from corners or door/window frames",
          "Directly above/below accessories (switches, sockets)",
          "If outside safe zones: mechanical protection or 30mA RCD required"
        ]
      },
      {
        principle: "Avoiding Damage",
        description: "Protect cables from physical damage",
        details: [
          "Use appropriate depth for chase or conduit",
          "Avoid routes through areas of future work",
          "Consider furniture placement and fixings",
          "Document cable routes for future reference"
        ]
      },
      {
        principle: "Thermal Considerations",
        description: "Account for heat effects on current capacity",
        details: [
          "Avoid routing near heat sources (boilers, hot pipes)",
          "Consider derating for thermal insulation contact",
          "Group derating for multiple cables in containment",
          "Maintain ventilation around cables where possible"
        ]
      },
      {
        principle: "Accessibility",
        description: "Plan for future access and maintenance",
        details: [
          "Use accessible junction boxes where practical",
          "Consider modular wiring for complex installations",
          "Label all cables at consumer unit and accessories",
          "Document routes with photos and diagrams"
        ]
      }
    ],
    routeOptions: [
      { method: "Loft Space", advantages: "Easy access, minimal decoration damage", considerations: "Thermal insulation contact, rodent protection" },
      { method: "Under Floorboards", advantages: "Hidden installation, good access", considerations: "May need lifting throughout, joist notching limits" },
      { method: "Surface Trunking", advantages: "No building work, easy modification", considerations: "Visible, may not suit all properties" },
      { method: "Chased into Walls", advantages: "Completely hidden, neat finish", considerations: "Messy, time-consuming, must be in safe zones" },
      { method: "Cavity Drop", advantages: "No surface damage in rooms", considerations: "Limited to cavity walls, fire stopping required" }
    ]
  };

  const partPRequirements = {
    title: "Part P Building Regulations",
    icon: Building,
    overview: "Part P of the Building Regulations (England and Wales) requires that electrical installation work in dwellings is designed, installed, inspected, and tested to ensure safety.",
    notifiableWork: [
      "Installation of a new circuit",
      "Consumer unit replacement or relocation",
      "Work in bathrooms (other than replacing accessories)",
      "Work in kitchens (if it involves a new circuit)",
      "Work in special installations or locations",
      "Installation of outdoor circuits",
      "Solar PV and generator connections"
    ],
    nonNotifiableWork: [
      "Replacing socket outlets, switches, and ceiling roses",
      "Replacing a consumer unit like-for-like (same location)",
      "Adding a fused spur to an existing circuit (not kitchen/bathroom)",
      "Replacing damaged cables for a single circuit",
      "Work not in a special location that doesn't add a new circuit"
    ],
    complianceRoutes: [
      {
        route: "Registered Competent Person",
        description: "Self-certify through scheme membership (NICEIC, NAPIT, ELECSA, etc.)",
        advantages: ["No Building Control fees", "Can certify own work", "Professional recognition"],
        requirements: ["Scheme membership", "Regular assessment", "Insurance requirements"]
      },
      {
        route: "Building Control Notification",
        description: "Notify local authority before work begins",
        advantages: ["Available to all installers", "Independent verification"],
        requirements: ["Notification fee (typically £150-£300)", "Inspection by Building Control", "May delay start of work"]
      }
    ],
    certificationRequired: [
      "Electrical Installation Certificate (EIC) for new installations",
      "Minor Electrical Installation Works Certificate for small jobs",
      "Building Regulations Compliance Certificate (from scheme or LA)",
      "Test results schedule attached to certificate"
    ],
    penalties: [
      "Local authority can require removal of non-compliant work",
      "Impact on property sale (solicitors check for certificates)",
      "Insurance implications if work not certified",
      "Potential prosecution for serious non-compliance"
    ]
  };

  const designConsiderations = [
    {
      category: "Circuit Protection",
      details: [
        "RCD protection: 30mA for all socket outlets and circuits in bathrooms",
        "RCBO vs RCD: Consider individual circuit protection",
        "MCB ratings: Ensure proper coordination with cable ratings",
        "Surge protection: Required for new installations in exposed areas"
      ]
    },
    {
      category: "Cable Sizing",
      details: [
        "Voltage drop: Maximum 3% for lighting, 5% for power",
        "Current carrying capacity: Consider grouping factors",
        "Installation method: Affects cable current rating",
        "Future expansion: Size for anticipated load growth"
      ]
    },
    {
      category: "Special Locations",
      details: [
        "Bathrooms: Zone classifications and appropriate equipment",
        "Kitchens: RCD protection and appliance circuits",
        "Gardens: Outdoor equipment and cable burial depths",
        "Garages: Additional earthing and RCD requirements"
      ]
    }
  ];

  const clientCommunication = [
    {
      stage: "Initial Consultation",
      keyPoints: [
        "Explain the scope of work clearly and in plain English",
        "Discuss any potential disruption to daily routines",
        "Outline health and safety requirements and responsibilities",
        "Provide realistic timescales and cost estimates"
      ]
    },
    {
      stage: "During Installation",
      keyPoints: [
        "Keep client informed of daily progress",
        "Explain any unexpected issues immediately",
        "Maintain clean and safe working areas",
        "Respect client's property and privacy"
      ]
    },
    {
      stage: "Project Completion",
      keyPoints: [
        "Demonstrate new systems and safety features",
        "Provide all certification and warranties",
        "Explain maintenance requirements",
        "Offer future support and contact details"
      ]
    }
  ];

  const riskAssessment = [
    "Working at height (ladders, loft access)",
    "Electrical hazards from existing installations",
    "Structural modifications and building integrity",
    "Asbestos exposure in older properties",
    "Manual handling of heavy equipment",
    "Noise and dust impact on occupants"
  ];

  return (
    <div className="space-y-6">
      {/* Comprehensive Planning Process */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Comprehensive Planning Process</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {planningSteps.map((step, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="border-blue-400 text-blue-300">
                  Step {index + 1}
                </Badge>
                <h4 className="font-medium text-white">{step.title}</h4>
              </div>
              <p className="text-sm text-white mb-3">{step.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {step.checklist.map((item, idx) => (
                  <div key={idx} className="text-xs text-blue-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Site Survey Checklist */}
      <Card className="border-teal-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <siteSurveyChecklist.icon className="h-6 w-6 text-teal-400" />
            <CardTitle className="text-teal-300">{siteSurveyChecklist.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-teal-500/50 bg-teal-500/10">
            <Info className="h-4 w-4 text-teal-400" />
            <AlertDescription className="text-teal-200 text-sm">
              A thorough site survey is essential for accurate quoting, safe working, and compliance. Never skip this step.
            </AlertDescription>
          </Alert>

          {siteSurveyChecklist.sections.map((section, index) => (
            <div key={index} className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
              <h4 className="font-medium text-white mb-3">{section.category}</h4>
              <div className="space-y-2">
                {section.items.map((item, idx) => (
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
        </CardContent>
      </Card>

      {/* Load Calculation Guidance */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <loadCalculationGuidance.icon className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">{loadCalculationGuidance.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-amber-500/50 bg-amber-500/10">
            <Zap className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-200 text-sm">
              <strong>Basic Formula:</strong> {loadCalculationGuidance.basicFormula}
            </AlertDescription>
          </Alert>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Diversity Factors (BS 7671 Appendix 1)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Circuit Type</th>
                    <th className="text-left py-2 text-amber-200">Diversity</th>
                    <th className="text-left py-2 text-amber-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {loadCalculationGuidance.diversityFactors.map((factor, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white">{factor.circuit}</td>
                      <td className="py-2 text-amber-300">{factor.diversity}</td>
                      <td className="py-2 text-white">{factor.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Example: 3-Bedroom House Load Calculation</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Load Item</th>
                    <th className="text-left py-2 text-amber-200">Connected</th>
                    <th className="text-left py-2 text-amber-200">Diversity Applied</th>
                    <th className="text-left py-2 text-amber-200">Max Demand</th>
                  </tr>
                </thead>
                <tbody>
                  {loadCalculationGuidance.exampleCalculation.map((calc, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white">{calc.item}</td>
                      <td className="py-2 text-white">{calc.connected}</td>
                      <td className="py-2 text-white">{calc.diversity}</td>
                      <td className="py-2 text-amber-300">{calc.demand}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-amber-100 mt-3"><strong>Total:</strong> {loadCalculationGuidance.totalDemand}</p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Key Considerations</h4>
            <ul className="space-y-2">
              {loadCalculationGuidance.considerations.map((consideration, idx) => (
                <li key={idx} className="text-sm text-amber-100 flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  {consideration}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Cable Route Planning */}
      <Card className="border-indigo-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <cableRoutePlanning.icon className="h-6 w-6 text-indigo-400" />
            <CardTitle className="text-indigo-300">{cableRoutePlanning.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-indigo-500/50 bg-indigo-500/10">
            <AlertTriangle className="h-4 w-4 text-indigo-400" />
            <AlertDescription className="text-indigo-200 text-sm">
              <strong>Regulation 522.6:</strong> Cables in walls must be protected from damage or installed in prescribed safe zones.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {cableRoutePlanning.principles.map((principle, idx) => (
              <div key={idx} className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                <h4 className="font-medium text-white mb-2">{principle.principle}</h4>
                <p className="text-sm text-indigo-200 mb-3">{principle.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {principle.details.map((detail, detailIdx) => (
                    <div key={detailIdx} className="text-xs text-indigo-100 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
            <h4 className="font-medium text-white mb-3">Route Options Comparison</h4>
            <div className="space-y-3">
              {cableRoutePlanning.routeOptions.map((option, idx) => (
                <div key={idx} className="bg-indigo-600/10 p-3 rounded border border-indigo-500/30">
                  <h5 className="font-medium text-indigo-200 text-sm mb-2">{option.method}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-green-400">Advantages: </span>
                      <span className="text-white">{option.advantages}</span>
                    </div>
                    <div>
                      <span className="text-orange-400">Considerations: </span>
                      <span className="text-white">{option.considerations}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Part P Requirements */}
      <Card className="border-rose-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <partPRequirements.icon className="h-6 w-6 text-rose-400" />
            <CardTitle className="text-rose-300">{partPRequirements.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-rose-500/50 bg-rose-500/10">
            <Info className="h-4 w-4 text-rose-400" />
            <AlertDescription className="text-rose-200 text-sm">
              {partPRequirements.overview}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h4 className="font-medium text-red-200 mb-3">Notifiable Work (Must Notify)</h4>
              <ul className="space-y-2">
                {partPRequirements.notifiableWork.map((work, idx) => (
                  <li key={idx} className="text-sm text-red-100 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    {work}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-medium text-green-200 mb-3">Non-Notifiable Work</h4>
              <ul className="space-y-2">
                {partPRequirements.nonNotifiableWork.map((work, idx) => (
                  <li key={idx} className="text-sm text-green-100 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {work}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-white">Compliance Routes</h4>
            {partPRequirements.complianceRoutes.map((route, idx) => (
              <div key={idx} className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
                <h5 className="font-medium text-rose-200 text-sm mb-2">{route.route}</h5>
                <p className="text-sm text-white mb-3">{route.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-green-400 font-medium">Advantages:</span>
                    <ul className="mt-1 space-y-1">
                      {route.advantages.map((adv, advIdx) => (
                        <li key={advIdx} className="text-white">- {adv}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-orange-400 font-medium">Requirements:</span>
                    <ul className="mt-1 space-y-1">
                      {route.requirements.map((req, reqIdx) => (
                        <li key={reqIdx} className="text-white">- {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
              <h4 className="font-medium text-rose-200 mb-3">Certification Required</h4>
              <ul className="space-y-2">
                {partPRequirements.certificationRequired.map((cert, idx) => (
                  <li key={idx} className="text-sm text-rose-100 flex items-start gap-2">
                    <FileText className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
              <h4 className="font-medium text-rose-200 mb-3">Non-Compliance Penalties</h4>
              <ul className="space-y-2">
                {partPRequirements.penalties.map((penalty, idx) => (
                  <li key={idx} className="text-sm text-rose-100 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    {penalty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Design Considerations */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Advanced Design Considerations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {designConsiderations.map((consideration, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-medium text-white mb-3">{consideration.category}</h4>
              <div className="space-y-2">
                {consideration.details.map((detail, idx) => (
                  <div key={idx} className="text-xs text-purple-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Client Communication */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Client Communication & Project Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {clientCommunication.map((stage, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-medium text-white mb-3">{stage.stage}</h4>
              <div className="space-y-2">
                {stage.keyPoints.map((point, idx) => (
                  <div key={idx} className="text-xs text-green-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Risk Assessment & Safety Planning</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert className="border-orange-500/50 bg-orange-500/10">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-200 text-sm">
              <strong>Essential:</strong> Complete risk assessment before starting any domestic electrical work. Consider all potential hazards and implement appropriate control measures.
            </AlertDescription>
          </Alert>

          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
            <h4 className="font-medium text-orange-200 mb-3">Key Risk Areas to Assess</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {riskAssessment.map((risk, index) => (
                <div key={index} className="text-xs text-orange-100 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  {risk}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card className="border-yellow-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-yellow-300">Documentation & Record Keeping</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
            <h4 className="font-medium text-yellow-200 mb-3">Essential Documents to Maintain</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-yellow-200 mb-2">Before Work Starts</h5>
                <ul className="space-y-1">
                  <li className="text-yellow-100 text-xs">- Risk assessment documentation</li>
                  <li className="text-yellow-100 text-xs">- Client quotation and acceptance</li>
                  <li className="text-yellow-100 text-xs">- Initial condition survey photos</li>
                  <li className="text-yellow-100 text-xs">- Existing installation test results</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-200 mb-2">Upon Completion</h5>
                <ul className="space-y-1">
                  <li className="text-yellow-100 text-xs">- Electrical Installation Certificate</li>
                  <li className="text-yellow-100 text-xs">- Test result schedules</li>
                  <li className="text-yellow-100 text-xs">- Building Control notification (if required)</li>
                  <li className="text-yellow-100 text-xs">- Warranty and maintenance information</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomesticPlanningSection;
