
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Shield,
  Zap,
  Factory,
  FileCheck,
  Lock,
  Eye,
  CheckCircle,
  Flame,
  Wind,
  AlertOctagon,
  HardHat,
  ClipboardList,
  Users,
  MapPin,
  Thermometer
} from "lucide-react";

const IndustrialRiskManagement = () => {
  // ATEX/DSEAR Overview
  const atexDsearBasics = {
    atex: {
      title: "ATEX Directive 2014/34/EU",
      description: "Equipment and Protective Systems for Potentially Explosive Atmospheres",
      scope: [
        "Equipment intended for use in explosive atmospheres",
        "Safety, controlling, and regulating devices for use outside explosive atmospheres",
        "Protective systems that halt incipient explosions",
        "Components essential for safe functioning of ATEX equipment"
      ]
    },
    dsear: {
      title: "DSEAR 2002 (Dangerous Substances and Explosive Atmospheres Regulations)",
      description: "UK regulations implementing ATEX workplace directive",
      requirements: [
        "Assess risks from dangerous substances",
        "Eliminate or reduce risks so far as reasonably practicable",
        "Classify areas where explosive atmospheres may occur",
        "Select appropriate equipment for classified zones",
        "Provide employee information, training, and instruction",
        "Prepare explosion protection document"
      ]
    }
  };

  // Zone Classifications
  const zoneClassifications = {
    gas: [
      {
        zone: "Zone 0",
        description: "Explosive atmosphere present continuously or for long periods",
        duration: "> 1000 hours per year",
        examples: [
          "Inside storage tanks containing volatile liquids",
          "Inside process vessels",
          "Inside pipeline systems"
        ],
        equipmentCategory: "Category 1 (Ex ia, Ex ma)",
        colour: "red"
      },
      {
        zone: "Zone 1",
        description: "Explosive atmosphere likely to occur in normal operation",
        duration: "10-1000 hours per year",
        examples: [
          "Area around pump seals and flanges",
          "Close to filling/emptying points",
          "Relief valve discharge areas",
          "Sample points"
        ],
        equipmentCategory: "Category 2 (Ex d, Ex e, Ex p, Ex ib)",
        colour: "orange"
      },
      {
        zone: "Zone 2",
        description: "Explosive atmosphere not likely in normal operation, or only briefly",
        duration: "< 10 hours per year",
        examples: [
          "Areas around Zone 1 with adequate ventilation",
          "Around pipe connections that may leak",
          "Storage areas with sealed containers"
        ],
        equipmentCategory: "Category 3 (Ex nA, Ex nC, Ex nL)",
        colour: "yellow"
      }
    ],
    dust: [
      {
        zone: "Zone 20",
        description: "Explosive dust cloud present continuously or frequently",
        duration: "> 1000 hours per year",
        examples: [
          "Inside silos and hoppers",
          "Inside dust collection systems",
          "Inside powder transfer pipework"
        ],
        equipmentCategory: "Category 1D",
        colour: "red"
      },
      {
        zone: "Zone 21",
        description: "Explosive dust cloud likely during normal operation",
        duration: "10-1000 hours per year",
        examples: [
          "Areas where dust layers form and are disturbed",
          "Filling and emptying points",
          "Conveyor transfer points"
        ],
        equipmentCategory: "Category 2D",
        colour: "orange"
      },
      {
        zone: "Zone 22",
        description: "Explosive dust cloud not likely, or only briefly",
        duration: "< 10 hours per year",
        examples: [
          "Areas where dust may escape in abnormal conditions",
          "Around bag filter clean air outlets",
          "Areas with infrequent dust disturbance"
        ],
        equipmentCategory: "Category 3D",
        colour: "yellow"
      }
    ]
  };

  // Ex Equipment Markings
  const exMarkings = {
    protectionTypes: [
      {
        code: "Ex d",
        name: "Flameproof Enclosure",
        description: "Enclosure withstands internal explosion and prevents propagation",
        zones: "Zone 1, Zone 2",
        applications: "Motors, switches, junction boxes, lighting"
      },
      {
        code: "Ex e",
        name: "Increased Safety",
        description: "Additional measures to prevent arcs, sparks, or hot surfaces",
        zones: "Zone 1, Zone 2",
        applications: "Terminal boxes, control panels, lighting"
      },
      {
        code: "Ex p",
        name: "Pressurised Enclosure",
        description: "Internal overpressure prevents explosive atmosphere entry",
        zones: "Zone 1, Zone 2",
        applications: "Control panels, analysers, large equipment"
      },
      {
        code: "Ex i (ia/ib)",
        name: "Intrinsic Safety",
        description: "Energy limited below ignition level",
        zones: "Ex ia: Zone 0,1,2 / Ex ib: Zone 1,2",
        applications: "Instrumentation, sensors, control circuits"
      },
      {
        code: "Ex n",
        name: "Non-Sparking / Non-Incendive",
        description: "Equipment unlikely to produce ignition sources",
        zones: "Zone 2 only",
        applications: "Standard equipment with modifications"
      },
      {
        code: "Ex m",
        name: "Encapsulation",
        description: "Parts that could ignite are encased in compound",
        zones: "Ex ma: Zone 0,1,2 / Ex mb: Zone 1,2",
        applications: "Sensors, solenoids, small devices"
      }
    ],
    gasGroups: [
      { group: "IIA", substances: "Propane, butane, methane, diesel vapours", ignitionEnergy: "Lowest" },
      { group: "IIB", substances: "Ethylene, town gas, some alcohols", ignitionEnergy: "Medium" },
      { group: "IIC", substances: "Hydrogen, acetylene, carbon disulphide", ignitionEnergy: "Highest" }
    ],
    temperatureClasses: [
      { class: "T1", maxSurface: "450C", typicalSubstances: "Methane, hydrogen" },
      { class: "T2", maxSurface: "300C", typicalSubstances: "Acetylene, ethylene" },
      { class: "T3", maxSurface: "200C", typicalSubstances: "Petrol, diesel" },
      { class: "T4", maxSurface: "135C", typicalSubstances: "Acetaldehyde" },
      { class: "T5", maxSurface: "100C", typicalSubstances: "Carbon disulphide (vapour)" },
      { class: "T6", maxSurface: "85C", typicalSubstances: "Carbon disulphide" }
    ],
    markingExample: {
      full: "Ex II 2G Ex de IIC T4 Gb",
      breakdown: [
        { part: "Ex", meaning: "ATEX certified" },
        { part: "II", meaning: "Equipment group (surface industries)" },
        { part: "2G", meaning: "Category 2, Gas" },
        { part: "Ex de", meaning: "Combined flameproof and increased safety" },
        { part: "IIC", meaning: "Gas group (suitable for hydrogen)" },
        { part: "T4", meaning: "Temperature class (max 135C surface)" },
        { part: "Gb", meaning: "Equipment protection level (medium)" }
      ]
    }
  };

  // Permit to Work
  const permitToWork = {
    types: [
      {
        type: "Electrical Permit to Work",
        purpose: "Authorisation for electrical work on isolated systems",
        essentialElements: [
          "Identification of equipment to be worked on",
          "Points of isolation specified",
          "Earthing requirements",
          "Safety precautions to be followed",
          "Time limits",
          "Signatures of issuer and recipient"
        ],
        cancellation: "Only cancelled by original issuer after work complete"
      },
      {
        type: "Hot Work Permit",
        purpose: "For work that could produce ignition sources",
        essentialElements: [
          "Location and nature of work",
          "Fire precautions required",
          "Atmospheric monitoring requirements",
          "Stand-by fire watcher",
          "Post-work inspection requirements",
          "Time limits"
        ],
        cancellation: "After post-work inspection confirms safe"
      },
      {
        type: "Confined Space Entry Permit",
        purpose: "For entry into confined spaces",
        essentialElements: [
          "Identification of confined space",
          "Hazards identified",
          "Atmospheric testing results",
          "Ventilation arrangements",
          "Rescue arrangements",
          "Communication methods"
        ],
        cancellation: "When all entrants have exited"
      }
    ],
    safeSystem: {
      stages: [
        {
          stage: "Identify",
          description: "Determine if permit required",
          actions: [
            "Assess the work to be done",
            "Identify hazards present",
            "Check site procedures",
            "Determine permit type needed"
          ]
        },
        {
          stage: "Request",
          description: "Formal request for permit",
          actions: [
            "Complete permit request form",
            "Describe work to be done",
            "Identify personnel involved",
            "Specify duration required"
          ]
        },
        {
          stage: "Issue",
          description: "Authorised person issues permit",
          actions: [
            "Verify isolations are complete",
            "Check all precautions in place",
            "Brief permit recipient",
            "Sign and issue permit"
          ]
        },
        {
          stage: "Work",
          description: "Carry out permitted work",
          actions: [
            "Follow permit conditions",
            "Monitor for changing conditions",
            "Report any problems",
            "Keep within time limits"
          ]
        },
        {
          stage: "Return",
          description: "Work complete, return permit",
          actions: [
            "Remove tools and equipment",
            "Replace guards and covers",
            "Sign permit completion section",
            "Return to permit issuer"
          ]
        },
        {
          stage: "Cancel",
          description: "Permit cancelled, system returned to service",
          actions: [
            "Verify all work complete",
            "Check area safe",
            "Remove locks and tags",
            "Restore to service"
          ]
        }
      ]
    }
  };

  // Safe Isolation Procedures
  const safeIsolation = {
    procedure: [
      {
        step: 1,
        action: "Identify",
        description: "Identify all sources of supply to the equipment",
        details: [
          "Review drawings and schematics",
          "Identify all supplies (main and auxiliary)",
          "Check for back-feeds from other sources",
          "Identify stored energy sources"
        ]
      },
      {
        step: 2,
        action: "Notify",
        description: "Inform all persons who may be affected",
        details: [
          "Notify control room/supervisor",
          "Inform other workers in area",
          "Check permit to work requirements",
          "Brief team on work to be done"
        ]
      },
      {
        step: 3,
        action: "Isolate",
        description: "Open all energy isolating devices",
        details: [
          "Open isolators/disconnectors",
          "Trip and rack out circuit breakers where applicable",
          "Remove fuses where appropriate",
          "Isolate control supplies"
        ]
      },
      {
        step: 4,
        action: "Secure",
        description: "Apply safety locks and tags",
        details: [
          "Apply personal safety lock to each isolation point",
          "Attach warning tag with name, date, and work description",
          "Use multi-lock hasps where multiple workers involved",
          "Retain key(s) on person"
        ]
      },
      {
        step: 5,
        action: "Prove Dead",
        description: "Verify absence of voltage at work location",
        details: [
          "Use approved voltage indicator (GS38 compliant)",
          "Prove indicator on known live source first",
          "Test all conductors against each other and earth",
          "Prove indicator again after test",
          "Test at point of work, not just isolation point"
        ]
      },
      {
        step: 6,
        action: "Earth",
        description: "Apply protective earthing where required",
        details: [
          "Apply temporary earths for HV work",
          "Connect earths as close to work as practicable",
          "Size earths for prospective fault current",
          "Not always required for LV but consider"
        ]
      },
      {
        step: 7,
        action: "Protect",
        description: "Apply additional protection as needed",
        details: [
          "Install barriers/screens around work area",
          "Post warning signs",
          "Consider adjacent live equipment",
          "Ensure adequate working space"
        ]
      }
    ],
    voltageIndicatorRequirements: [
      "GS38 compliant (fused leads, limited probe exposure)",
      "CAT rating appropriate for system (typically CAT III/IV)",
      "Regularly tested and maintained",
      "Prove before and after use on known live source",
      "Within calibration date"
    ]
  };

  // Arc Flash Hazards
  const arcFlash = {
    basics: {
      definition: "An electrical explosion resulting from a fault that causes air to become conductive",
      hazards: [
        "Temperatures up to 35,000F (4x sun's surface)",
        "Blast pressure wave",
        "Shrapnel from vaporised conductors",
        "Intense UV light causing blindness",
        "Sound levels exceeding 140dB",
        "Toxic fumes and smoke"
      ],
      causes: [
        "Dropped tools or foreign objects",
        "Equipment failure",
        "Dust, corrosion, or contamination",
        "Improper work procedures",
        "Failed insulation"
      ]
    },
    categories: [
      {
        category: "1",
        minArcRating: "4 cal/cm2",
        ppeSummary: "Arc-rated long sleeve shirt and pants",
        equipment: [
          "Arc-rated shirt and pants or coverall (min 4 cal/cm2)",
          "Arc-rated face shield or flash suit hood",
          "Safety glasses",
          "Hard hat",
          "Hearing protection",
          "Leather gloves"
        ]
      },
      {
        category: "2",
        minArcRating: "8 cal/cm2",
        ppeSummary: "Arc-rated coverall and face shield",
        equipment: [
          "Arc-rated shirt and pants or coverall (min 8 cal/cm2)",
          "Arc-rated flash suit hood or face shield",
          "Arc-rated hard hat liner",
          "Safety glasses",
          "Hearing protection",
          "Leather gloves"
        ]
      },
      {
        category: "3",
        minArcRating: "25 cal/cm2",
        ppeSummary: "Arc flash suit",
        equipment: [
          "Arc-rated flash suit (min 25 cal/cm2)",
          "Arc-rated flash suit hood",
          "Arc-rated gloves",
          "Arc-rated hard hat liner",
          "Safety glasses",
          "Hearing protection"
        ]
      },
      {
        category: "4",
        minArcRating: "40 cal/cm2",
        ppeSummary: "Multi-layer arc flash suit",
        equipment: [
          "Arc-rated multi-layer flash suit (min 40 cal/cm2)",
          "Arc-rated flash suit hood",
          "Arc-rated gloves",
          "Arc-rated hard hat liner",
          "Safety glasses",
          "Hearing protection"
        ]
      }
    ],
    protection: [
      "Conduct arc flash risk assessment",
      "Label equipment with arc flash hazard",
      "Provide appropriate PPE",
      "Train workers on hazards",
      "Use remote racking/switching where possible",
      "Maintain adequate working space",
      "Keep doors closed when equipment energised",
      "Consider current limiting devices"
    ]
  };

  // Working at Height
  const workingAtHeight = {
    hazards: [
      {
        hazard: "Falls from height",
        considerations: [
          "Use platforms, scaffolds, or MEWPs where possible",
          "Ensure proper edge protection",
          "Use fall arrest systems as last resort",
          "Maintain three points of contact on ladders"
        ]
      },
      {
        hazard: "Dropped objects",
        considerations: [
          "Use tool tethers and lanyards",
          "Establish exclusion zones below",
          "Secure loose items",
          "Consider debris nets"
        ]
      },
      {
        hazard: "Proximity to live equipment",
        considerations: [
          "Maintain safe clearances from HV",
          "Use insulated tools when near LV",
          "Consider isolation of adjacent circuits",
          "Use barriers and warning signs"
        ]
      }
    ],
    minimumClearances: [
      { voltage: "Up to 33kV", clearance: "3m (10ft)" },
      { voltage: "33kV to 132kV", clearance: "6m (20ft)" },
      { voltage: "132kV to 275kV", clearance: "8m (26ft)" },
      { voltage: "275kV to 400kV", clearance: "9m (30ft)" }
    ],
    hierarchy: [
      { level: 1, method: "Avoid work at height where possible", description: "Ground-level alternatives" },
      { level: 2, method: "Use existing safe place of work", description: "Fixed platforms, walkways" },
      { level: 3, method: "Provide work equipment to prevent falls", description: "Scaffolds, MEWP, podiums" },
      { level: 4, method: "Provide work equipment to minimise distance/consequences", description: "Safety nets, air bags" },
      { level: 5, method: "Provide work equipment to minimise consequences", description: "Fall arrest harnesses" }
    ]
  };

  // Confined Spaces
  const confinedSpaces = {
    definition: "A space that is substantially enclosed, has limited access/egress, and where there is risk of serious injury from hazardous substances or conditions",
    examples: [
      "Cable chambers and trenches",
      "Substations below ground",
      "Transformer bunds",
      "Tank internal areas",
      "Large electrical enclosures",
      "Riser cupboards"
    ],
    hazards: [
      {
        hazard: "Oxygen deficiency",
        causes: ["Displacement by other gases", "Oxidation/rusting", "Biological decomposition"],
        controls: ["Continuous atmosphere monitoring", "Forced ventilation", "Respiratory equipment"]
      },
      {
        hazard: "Toxic atmospheres",
        causes: ["SF6 from switchgear", "Battery gases", "Cable burning", "Solvents"],
        controls: ["Gas detection", "Forced ventilation", "RPE if required"]
      },
      {
        hazard: "Flammable atmospheres",
        causes: ["Fuel vapours", "Hydrogen from batteries", "Volatile solvents"],
        controls: ["Gas monitoring", "No ignition sources", "Intrinsically safe equipment only"]
      },
      {
        hazard: "Engulfment",
        causes: ["Flooding", "Collapse of contents"],
        controls: ["Prevent entry of materials", "Isolation of feeds", "Monitoring"]
      }
    ],
    requirements: [
      "Risk assessment before entry",
      "Safe system of work / permit",
      "Competent person supervision",
      "Atmosphere testing before and during",
      "Adequate ventilation",
      "Emergency rescue arrangements",
      "Communication systems",
      "Appropriate PPE including RPE if needed"
    ],
    atmosphereLimits: [
      { parameter: "Oxygen", min: "19.5%", max: "23.5%", notes: "Normal air is 20.9%" },
      { parameter: "Carbon Monoxide", min: "-", max: "30 ppm", notes: "Short term exposure limit" },
      { parameter: "Hydrogen Sulphide", min: "-", max: "10 ppm", notes: "Short term exposure limit" },
      { parameter: "LEL (flammable gas)", min: "-", max: "10% of LEL", notes: "Should be zero for hot work" }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Industrial Risk Management Guide</CardTitle>
          </div>
          <p className="text-neutral-300">
            Critical safety planning and hazard management for industrial electrical environments
            including hazardous areas, permits to work, arc flash protection, and confined spaces.
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="atex" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-1 h-auto">
          <TabsTrigger value="atex" className="text-xs px-2 py-2">ATEX/DSEAR</TabsTrigger>
          <TabsTrigger value="zones" className="text-xs px-2 py-2">Zone Classification</TabsTrigger>
          <TabsTrigger value="permits" className="text-xs px-2 py-2">Permits & Isolation</TabsTrigger>
          <TabsTrigger value="arcflash" className="text-xs px-2 py-2">Arc Flash</TabsTrigger>
          <TabsTrigger value="special" className="text-xs px-2 py-2">Height & Confined</TabsTrigger>
        </TabsList>

        {/* ATEX/DSEAR Tab */}
        <TabsContent value="atex" className="space-y-4">
          <Card className="border-red-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-300">ATEX & DSEAR Explained</CardTitle>
              </div>
              <p className="text-neutral-300">
                Understanding explosive atmosphere regulations for industrial electrical work
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ATEX */}
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <h3 className="font-bold text-red-300 mb-2">{atexDsearBasics.atex.title}</h3>
                <p className="text-neutral-300 text-sm mb-3">{atexDsearBasics.atex.description}</p>
                <h4 className="text-red-200 font-medium text-sm mb-2">Scope:</h4>
                <ul className="space-y-1">
                  {atexDsearBasics.atex.scope.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* DSEAR */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h3 className="font-bold text-orange-300 mb-2">{atexDsearBasics.dsear.title}</h3>
                <p className="text-neutral-300 text-sm mb-3">{atexDsearBasics.dsear.description}</p>
                <h4 className="text-orange-200 font-medium text-sm mb-2">Key Requirements:</h4>
                <ul className="space-y-1">
                  {atexDsearBasics.dsear.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Ex Markings */}
          <Card className="border-purple-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">Ex Equipment Markings</CardTitle>
              </div>
              <p className="text-neutral-300">
                Understanding ATEX equipment marking and selection
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Protection Types */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Protection Types</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-2 px-2 text-purple-300">Code</th>
                        <th className="text-left py-2 px-2 text-purple-300">Name</th>
                        <th className="text-left py-2 px-2 text-purple-300">Zones</th>
                        <th className="text-left py-2 px-2 text-purple-300">Applications</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {exMarkings.protectionTypes.map((type, i) => (
                        <tr key={i} className="border-b border-purple-500/20">
                          <td className="py-2 px-2 font-medium text-purple-200">{type.code}</td>
                          <td className="py-2 px-2">{type.name}</td>
                          <td className="py-2 px-2">{type.zones}</td>
                          <td className="py-2 px-2 text-xs">{type.applications}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gas Groups */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Gas Groups</h3>
                <div className="space-y-2">
                  {exMarkings.gasGroups.map((group, i) => (
                    <div key={i} className="bg-purple-500/5 p-3 rounded border border-purple-500/10 flex items-center justify-between">
                      <div>
                        <span className="text-purple-200 font-medium">Group {group.group}: </span>
                        <span className="text-neutral-300 text-sm">{group.substances}</span>
                      </div>
                      <Badge variant="outline" className="border-purple-400 text-purple-300">
                        {group.ignitionEnergy}
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-yellow-300 text-xs mt-2 italic">
                  Equipment rated for IIC can be used in IIA and IIB atmospheres
                </p>
              </div>

              {/* Temperature Classes */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Temperature Classes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-2 px-2 text-purple-300">Class</th>
                        <th className="text-left py-2 px-2 text-purple-300">Max Surface Temp</th>
                        <th className="text-left py-2 px-2 text-purple-300">Typical Substances</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {exMarkings.temperatureClasses.map((temp, i) => (
                        <tr key={i} className="border-b border-purple-500/20">
                          <td className="py-2 px-2 font-medium text-purple-200">{temp.class}</td>
                          <td className="py-2 px-2">{temp.maxSurface}</td>
                          <td className="py-2 px-2">{temp.typicalSubstances}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Marking Example */}
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="font-bold text-yellow-300 mb-3">Understanding ATEX Markings</h3>
                <div className="bg-yellow-500/20 p-3 rounded mb-3">
                  <code className="text-yellow-100 text-lg font-mono">{exMarkings.markingExample.full}</code>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {exMarkings.markingExample.breakdown.map((item, i) => (
                    <div key={i} className="bg-yellow-500/5 p-2 rounded text-center">
                      <div className="text-yellow-300 font-mono font-bold">{item.part}</div>
                      <div className="text-neutral-400 text-xs">{item.meaning}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Zone Classifications Tab */}
        <TabsContent value="zones" className="space-y-4">
          {/* Gas Zones */}
          <Card className="border-orange-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wind className="h-6 w-6 text-orange-400" />
                <CardTitle className="text-orange-300">Gas/Vapour Zone Classifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {zoneClassifications.gas.map((zone, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  zone.colour === 'red' ? 'bg-red-500/10 border-red-500/30' :
                  zone.colour === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                  'bg-yellow-500/10 border-yellow-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-bold text-lg ${
                      zone.colour === 'red' ? 'text-red-300' :
                      zone.colour === 'orange' ? 'text-orange-300' :
                      'text-yellow-300'
                    }`}>{zone.zone}</h3>
                    <Badge variant="outline" className={`${
                      zone.colour === 'red' ? 'border-red-400 text-red-300' :
                      zone.colour === 'orange' ? 'border-orange-400 text-orange-300' :
                      'border-yellow-400 text-yellow-300'
                    }`}>
                      {zone.duration}
                    </Badge>
                  </div>
                  <p className="text-neutral-300 mb-3">{zone.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-neutral-200 font-medium text-sm mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {zone.examples.map((example, i) => (
                          <li key={i} className="text-neutral-300 text-sm flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-black/20 p-3 rounded">
                      <h4 className="text-neutral-200 font-medium text-sm mb-1">Equipment Required:</h4>
                      <p className="text-neutral-300 text-sm">{zone.equipmentCategory}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Dust Zones */}
          <Card className="border-yellow-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Factory className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-yellow-300">Dust Zone Classifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {zoneClassifications.dust.map((zone, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  zone.colour === 'red' ? 'bg-red-500/10 border-red-500/30' :
                  zone.colour === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                  'bg-yellow-500/10 border-yellow-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-bold text-lg ${
                      zone.colour === 'red' ? 'text-red-300' :
                      zone.colour === 'orange' ? 'text-orange-300' :
                      'text-yellow-300'
                    }`}>{zone.zone}</h3>
                    <Badge variant="outline" className={`${
                      zone.colour === 'red' ? 'border-red-400 text-red-300' :
                      zone.colour === 'orange' ? 'border-orange-400 text-orange-300' :
                      'border-yellow-400 text-yellow-300'
                    }`}>
                      {zone.duration}
                    </Badge>
                  </div>
                  <p className="text-neutral-300 mb-3">{zone.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-neutral-200 font-medium text-sm mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {zone.examples.map((example, i) => (
                          <li key={i} className="text-neutral-300 text-sm flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-black/20 p-3 rounded">
                      <h4 className="text-neutral-200 font-medium text-sm mb-1">Equipment Required:</h4>
                      <p className="text-neutral-300 text-sm">{zone.equipmentCategory}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Zone Diagram Description */}
          <Card className="border-blue-500/30 bg-white/5">
            <CardHeader>
              <CardTitle className="text-blue-300">Zone Extent Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <h3 className="font-bold text-blue-300 mb-3">Factors Increasing Zone Extent</h3>
                  <ul className="space-y-2 text-sm text-neutral-300">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5" />
                      High volatility / low flash point
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5" />
                      Poor ventilation
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5" />
                      Large release rate
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5" />
                      Enclosed or semi-enclosed areas
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <h3 className="font-bold text-green-300 mb-3">Factors Reducing Zone Extent</h3>
                  <ul className="space-y-2 text-sm text-neutral-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      Good natural/forced ventilation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      Low volatility substances
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      Small release quantities
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      Open outdoor locations
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permits & Isolation Tab */}
        <TabsContent value="permits" className="space-y-4">
          {/* Permit Types */}
          <Card className="border-blue-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-blue-300">Permit to Work Systems</CardTitle>
              </div>
              <p className="text-neutral-300">
                Formal systems for controlling high-risk activities
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {permitToWork.types.map((permit, index) => (
                <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <h3 className="font-bold text-blue-300 mb-2">{permit.type}</h3>
                  <p className="text-neutral-300 text-sm mb-3">{permit.purpose}</p>
                  <div className="bg-blue-500/5 p-3 rounded mb-3">
                    <h4 className="text-blue-200 font-medium text-sm mb-2">Essential Elements:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      {permit.essentialElements.map((element, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                          <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          {element}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-yellow-300 text-sm"><strong>Cancellation:</strong> {permit.cancellation}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Permit Stages */}
          <Card className="border-green-500/30 bg-white/5">
            <CardHeader>
              <CardTitle className="text-green-300">Permit System Stages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {permitToWork.safeSystem.stages.map((stage, index) => (
                <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-300 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-green-300">{stage.stage}</h3>
                      <p className="text-neutral-400 text-sm">{stage.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-1 ml-11">
                    {stage.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Safe Isolation */}
          <Card className="border-orange-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-orange-400" />
                <CardTitle className="text-orange-300">Safe Isolation Procedure</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {safeIsolation.procedure.map((step, index) => (
                <div key={index} className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <span className="text-orange-300 font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-orange-300">{step.action}</h3>
                      <p className="text-neutral-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-1 ml-13">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Voltage Indicator Requirements */}
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="font-bold text-yellow-300 mb-3">Voltage Indicator Requirements (GS38)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {safeIsolation.voltageIndicatorRequirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <Shield className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {req}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Arc Flash Tab */}
        <TabsContent value="arcflash" className="space-y-4">
          <Card className="border-red-500/30 bg-gradient-to-r from-red-500/10 to-orange-500/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-300">Arc Flash Hazards & Protection</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Definition and Hazards */}
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                <h3 className="font-bold text-red-300 mb-3">What is Arc Flash?</h3>
                <p className="text-neutral-300 text-sm mb-3">{arcFlash.basics.definition}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-red-200 font-medium text-sm mb-2">Hazards:</h4>
                    <ul className="space-y-1">
                      {arcFlash.basics.hazards.map((hazard, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                          <AlertOctagon className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          {hazard}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-orange-200 font-medium text-sm mb-2">Common Causes:</h4>
                    <ul className="space-y-1">
                      {arcFlash.basics.causes.map((cause, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                          <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* PPE Categories */}
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                <h3 className="font-bold text-red-300 mb-3">Arc Flash PPE Categories (IEEE 1584)</h3>
                <div className="space-y-3">
                  {arcFlash.categories.map((cat, i) => (
                    <div key={i} className="bg-red-500/5 p-3 rounded border border-red-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-red-200 font-medium">Category {cat.category}</h4>
                        <Badge variant="outline" className="border-red-400 text-red-300">
                          Min {cat.minArcRating}
                        </Badge>
                      </div>
                      <p className="text-neutral-300 text-sm mb-2">{cat.ppeSummary}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                        {cat.equipment.map((equip, j) => (
                          <div key={j} className="text-xs text-neutral-400">- {equip}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Protection Measures */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
                <h3 className="font-bold text-orange-300 mb-3">Arc Flash Protection Measures</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {arcFlash.protection.map((measure, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <Shield className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      {measure}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Warning */}
          <Card className="border-red-500/50 bg-gradient-to-r from-red-600/20 to-orange-600/20">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center gap-2">
                <AlertOctagon className="h-6 w-6" />
                Critical Arc Flash Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-neutral-300">
              <p>
                <strong className="text-red-300">Never underestimate arc flash:</strong> Arc flash incidents
                cause severe burns, blindness, hearing damage, and death. The thermal energy released
                can exceed 200kJ in a fraction of a second.
              </p>
              <p>
                <strong className="text-red-300">Always de-energise if possible:</strong> The safest approach
                is to work on de-energised equipment. Live work should only be performed when absolutely
                necessary and with full risk assessment.
              </p>
              <p>
                <strong className="text-red-300">PPE is the last line of defence:</strong> Arc-rated PPE
                reduces injury severity but does not eliminate risk. Engineering controls and work practices
                are the primary protection.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Working at Height & Confined Spaces Tab */}
        <TabsContent value="special" className="space-y-4">
          {/* Working at Height */}
          <Card className="border-blue-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HardHat className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-blue-300">Working at Height Near Electrical Equipment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hazards */}
              {workingAtHeight.hazards.map((item, index) => (
                <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <h3 className="font-bold text-blue-300 mb-2">{item.hazard}</h3>
                  <ul className="space-y-1">
                    {item.considerations.map((consideration, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Clearances */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
                <h3 className="font-bold text-orange-300 mb-3">Minimum Safe Clearances from Overhead Lines</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-orange-500/30">
                        <th className="text-left py-2 px-3 text-orange-300">Voltage</th>
                        <th className="text-left py-2 px-3 text-orange-300">Minimum Clearance</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {workingAtHeight.minimumClearances.map((item, i) => (
                        <tr key={i} className="border-b border-orange-500/20">
                          <td className="py-2 px-3">{item.voltage}</td>
                          <td className="py-2 px-3 font-medium text-orange-200">{item.clearance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-yellow-300 text-xs mt-2 italic">
                  These are minimum distances. Always consult with the DNO/asset owner for specific requirements.
                </p>
              </div>

              {/* Hierarchy */}
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <h3 className="font-bold text-green-300 mb-3">Hierarchy of Control for Working at Height</h3>
                <div className="space-y-2">
                  {workingAtHeight.hierarchy.map((level, i) => (
                    <div key={i} className="flex items-center gap-3 bg-green-500/5 p-2 rounded">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">{level.level}</span>
                      </div>
                      <div>
                        <span className="text-green-200 font-medium text-sm">{level.method}</span>
                        <span className="text-neutral-400 text-sm ml-2">- {level.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confined Spaces */}
          <Card className="border-purple-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">Confined Space Electrical Work</CardTitle>
              </div>
              <p className="text-neutral-300 text-sm">{confinedSpaces.definition}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Examples */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Examples of Confined Spaces</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {confinedSpaces.examples.map((example, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <MapPin className="h-4 w-4 text-purple-400" />
                      {example}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hazards */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Specific Hazards</h3>
                <div className="space-y-3">
                  {confinedSpaces.hazards.map((hazard, i) => (
                    <div key={i} className="bg-purple-500/5 p-3 rounded border border-purple-500/10">
                      <h4 className="text-purple-200 font-medium mb-1">{hazard.hazard}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-orange-300 font-medium">Causes: </span>
                          <span className="text-neutral-300">{hazard.causes.join(", ")}</span>
                        </div>
                        <div>
                          <span className="text-green-300 font-medium">Controls: </span>
                          <span className="text-neutral-300">{hazard.controls.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atmosphere Limits */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Atmosphere Monitoring Limits</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-2 px-3 text-purple-300">Parameter</th>
                        <th className="text-center py-2 px-3 text-purple-300">Min</th>
                        <th className="text-center py-2 px-3 text-purple-300">Max</th>
                        <th className="text-left py-2 px-3 text-purple-300">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {confinedSpaces.atmosphereLimits.map((limit, i) => (
                        <tr key={i} className="border-b border-purple-500/20">
                          <td className="py-2 px-3 font-medium">{limit.parameter}</td>
                          <td className="py-2 px-3 text-center">{limit.min}</td>
                          <td className="py-2 px-3 text-center">{limit.max}</td>
                          <td className="py-2 px-3 text-xs text-neutral-400">{limit.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="font-bold text-yellow-300 mb-3">Entry Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {confinedSpaces.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {req}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Procedures Warning */}
          <Card className="border-red-500/50 bg-gradient-to-r from-red-500/20 to-orange-500/20">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Emergency Rescue Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-neutral-300">
              <p>
                <strong className="text-red-300">Never enter to attempt rescue without proper equipment:</strong> Many
                confined space fatalities involve would-be rescuers. Always have rescue arrangements in place BEFORE entry.
              </p>
              <p>
                <strong className="text-red-300">Rescue equipment must be available:</strong> This may include
                retrieval systems, breathing apparatus, communication equipment, and first aid provision.
              </p>
              <p>
                <strong className="text-red-300">Raise the alarm immediately:</strong> If an incident occurs,
                call emergency services and trained rescue personnel. Do not delay alerting others.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* General Safety Notice */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Industrial Risk Management - Key Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-neutral-300">
          <p>
            <strong className="text-red-300">Risk Assessment First:</strong> Always conduct a thorough risk
            assessment before starting any industrial electrical work. Identify hazards and implement controls.
          </p>
          <p>
            <strong className="text-red-300">Competency is Essential:</strong> Work in hazardous areas, confined
            spaces, and on high-voltage equipment requires specific training and certification (CompEx, HV AP, etc.).
          </p>
          <p>
            <strong className="text-red-300">Never Work Alone:</strong> High-risk activities require supervision,
            assistance, and emergency backup. Ensure someone knows where you are and what you are doing.
          </p>
          <p>
            <strong className="text-red-300">If in Doubt - STOP:</strong> If conditions change or something
            doesn't seem right, stop work and reassess. No job is worth risking your life.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrialRiskManagement;
