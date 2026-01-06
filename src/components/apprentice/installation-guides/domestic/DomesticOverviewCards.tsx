
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Home,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  BadgePoundSterling,
  Users,
  Book,
  Droplets,
  ChefHat,
  Sun,
  Box,
  Info
} from "lucide-react";

const DomesticOverviewCards = () => {
  const overviewStats = [
    { label: "Average Project Duration", value: "3-5 days", icon: Clock },
    { label: "Typical Budget Range", value: "£2,000-£8,000", icon: BadgePoundSterling },
    { label: "Skill Level Required", value: "Intermediate", icon: Users },
    { label: "Certification Required", value: "Part P", icon: Book }
  ];

  const projectComplexity = [
    { type: "Socket Addition", complexity: 20, duration: "2-4 hours", cost: "£150-£300" },
    { type: "Kitchen Rewire", complexity: 60, duration: "2-3 days", cost: "£1,500-£3,000" },
    { type: "Consumer Unit Upgrade", complexity: 40, duration: "4-6 hours", cost: "£400-£800" },
    { type: "Full House Rewire", complexity: 90, duration: "5-10 days", cost: "£4,000-£12,000" }
  ];

  const safetyPriorities = [
    { priority: "Safe Isolation", description: "Always isolate and test before work", level: "Critical" },
    { priority: "RCD Protection", description: "30mA RCD required for all circuits", level: "Essential" },
    { priority: "Part P Compliance", description: "Building Regulations notification required", level: "Legal" },
    { priority: "Testing & Certification", description: "Proper testing and certification mandatory", level: "Essential" }
  ];

  const kitchenRequirements = {
    title: "Kitchen Installations",
    icon: ChefHat,
    regulations: [
      "All socket outlets must have 30mA RCD protection (Reg 411.3.3)",
      "Dedicated circuits required for high-power appliances (cooker, hob)",
      "Socket outlets positioned away from sink (300mm minimum recommended)",
      "Cooker control unit within 2m of appliance",
      "Extraction fan on separate circuit or fused connection unit"
    ],
    circuits: [
      { name: "Ring Final Circuit", cable: "2.5mm² T&E", protection: "32A RCBO" },
      { name: "Cooker Circuit", cable: "6mm² T&E (up to 13kW)", protection: "32A RCBO" },
      { name: "Hob Circuit (if separate)", cable: "6mm² or 10mm² T&E", protection: "32A/40A RCBO" },
      { name: "Oven Circuit (if separate)", cable: "2.5mm² T&E", protection: "20A RCBO" },
      { name: "Fridge/Freezer", cable: "2.5mm² T&E", protection: "16A RCBO (dedicated recommended)" },
      { name: "Dishwasher", cable: "2.5mm² T&E", protection: "16A RCBO" }
    ],
    tips: [
      "Consider future appliance upgrades when sizing cables",
      "Position switches within easy reach but away from cooking areas",
      "Use IP-rated accessories near water sources",
      "Label circuits clearly for appliance identification"
    ]
  };

  const bathroomZones = {
    title: "Bathroom Zones & IP Ratings",
    icon: Droplets,
    zones: [
      {
        zone: "Zone 0",
        description: "Inside the bath or shower tray",
        color: "red",
        requirements: [
          "Maximum 12V SELV only",
          "IPX7 rating required (protected against immersion)",
          "Equipment specifically designed for zone 0 use",
          "No switches or accessories permitted"
        ]
      },
      {
        zone: "Zone 1",
        description: "Above bath/shower to 2.25m from floor",
        color: "orange",
        requirements: [
          "SELV or 230V with 30mA RCD protection",
          "IPX4 rating minimum (splash-proof)",
          "IPX5 if water jets likely (showers)",
          "Fixed equipment only (no socket outlets)",
          "Shower units, instantaneous water heaters permitted"
        ]
      },
      {
        zone: "Zone 2",
        description: "0.6m horizontally from Zone 1 boundary",
        color: "yellow",
        requirements: [
          "IPX4 rating minimum",
          "30mA RCD protection required",
          "Shaver sockets (BS EN 61558-2-5) permitted",
          "Luminaires, fans, and heating units permitted",
          "No socket outlets except shaver units"
        ]
      },
      {
        zone: "Outside Zones",
        description: "Beyond Zone 2 boundaries",
        color: "green",
        requirements: [
          "30mA RCD protection still required",
          "Standard accessories may be used",
          "Normal IP ratings acceptable",
          "Socket outlets permitted (with RCD protection)"
        ]
      }
    ],
    generalRequirements: [
      "All circuits supplying bathroom must have 30mA RCD protection (Reg 701.411.3.3)",
      "Supplementary bonding may be omitted if all extraneous-conductive-parts are effectively connected to protective earth and RCD protection is provided",
      "Pull-cord switches preferred within zones (no metallic parts accessible)",
      "SELV transformer located outside zones 0, 1, and 2"
    ]
  };

  const consumerUnitRequirements = {
    title: "Consumer Unit Requirements (18th Edition AMD3)",
    icon: Box,
    keyChanges: [
      {
        requirement: "All Consumer Units Must Be Metal",
        details: "All consumer units in domestic premises must be constructed of non-combustible material (typically steel enclosure)",
        regulation: "Reg 421.1.201"
      },
      {
        requirement: "RCD Protection for All Circuits",
        details: "All final circuits require 30mA RCD protection, regardless of location or circuit type",
        regulation: "Reg 411.3.4"
      },
      {
        requirement: "Surge Protection Devices (SPD)",
        details: "SPDs required where consequences of overvoltage could affect life, public installations, commercial/industrial, or IT equipment",
        regulation: "Reg 443.4"
      },
      {
        requirement: "Arc Fault Detection Devices (AFDD)",
        details: "Recommended for locations with sleeping accommodation, fire risk, combustible construction, or irreplaceable goods",
        regulation: "Reg 421.1.7 (Recommendation)"
      }
    ],
    specifications: [
      { item: "Enclosure Material", value: "Non-combustible (steel)" },
      { item: "IP Rating", value: "IP2X minimum (fingers protected)" },
      { item: "Mounting Height", value: "1.2m - 1.4m centre (accessibility)" },
      { item: "Working Space", value: "600mm clear access minimum" },
      { item: "Cable Entry", value: "Through glands or grommets" }
    ],
    layout: [
      "Main switch (100A typical for domestic)",
      "Type 2 SPD (if required)",
      "RCBOs for individual circuit protection (preferred)",
      "Or split-load arrangement with RCDs",
      "MCBs for non-RCD protected circuits (if any)",
      "Adequate spare ways for future expansion (minimum 2)"
    ]
  };

  const outdoorInstallations = {
    title: "Outdoor & Garden Installations",
    icon: Sun,
    ipRatings: [
      { rating: "IP44", description: "Protected against objects >1mm and splashing water", use: "Sheltered outdoor use, under canopy" },
      { rating: "IP54", description: "Dust protected and splash-proof", use: "General outdoor use" },
      { rating: "IP55", description: "Dust protected and water jet resistant", use: "Exposed locations" },
      { rating: "IP65", description: "Dust-tight and water jet resistant", use: "Washdown areas, fully exposed" },
      { rating: "IP66", description: "Dust-tight and powerful water jet resistant", use: "High-pressure cleaning areas" },
      { rating: "IP67", description: "Dust-tight and temporary immersion resistant", use: "Ground-level or flood risk areas" }
    ],
    cableRequirements: [
      {
        location: "Underground",
        cable: "SWA (Steel Wire Armoured) or cable in conduit",
        depth: "Minimum 450mm (pedestrian), 600mm (vehicles)",
        notes: "Route tape 150mm above cable, sand surround recommended"
      },
      {
        location: "Surface Run",
        cable: "SWA or conduit/trunking with appropriate IP rating",
        depth: "N/A",
        notes: "Protected from mechanical damage, UV-resistant if exposed"
      },
      {
        location: "Overhead",
        cable: "Insulated overhead cable or catenary wire support",
        depth: "Minimum 3.5m clearance (5.2m over driveways)",
        notes: "Proper strain relief and weather protection"
      }
    ],
    rcdRequirements: [
      "All outdoor circuits require 30mA RCD protection",
      "Consider time-delayed RCD at origin to prevent nuisance tripping",
      "Socket outlets: Additional 30mA RCD at the accessory (double protection)",
      "Lighting circuits: 30mA RCD protection required"
    ],
    commonApplications: [
      { application: "Garden Lighting", circuit: "Radial 6A", cable: "1.5mm² SWA", protection: "6A RCBO" },
      { application: "Outdoor Sockets", circuit: "Radial 20A", cable: "2.5mm² SWA", protection: "20A RCBO" },
      { application: "Garden Building", circuit: "Radial 32A or submain", cable: "4mm² or 6mm² SWA", protection: "32A RCBO + local CU" },
      { application: "Pond Pump", circuit: "Dedicated radial", cable: "1.5mm² SWA", protection: "6A RCBO" },
      { application: "EV Charger", circuit: "Dedicated radial 32A", cable: "6mm² SWA", protection: "32A Type B RCBO" }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="border-elec-yellow/30 bg-white/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="h-4 w-4 text-elec-yellow" />
                <span className="text-xs text-white/80">{stat.label}</span>
              </div>
              <p className="text-lg font-semibold text-white">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Complexity Guide */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Project Complexity Guide</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {projectComplexity.map((project, index) => (
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
                  <span className="text-white/80">Complexity Level</span>
                  <span className="text-blue-300">{project.complexity}%</span>
                </div>
                <Progress value={project.complexity} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Kitchen Installations */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <kitchenRequirements.icon className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">{kitchenRequirements.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-amber-500/50 bg-amber-500/10">
            <Info className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-200 text-sm">
              Kitchens are high-demand areas requiring careful circuit design and RCD protection for all socket outlets.
            </AlertDescription>
          </Alert>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Key Regulations</h4>
            <ul className="space-y-2">
              {kitchenRequirements.regulations.map((reg, idx) => (
                <li key={idx} className="text-sm text-amber-100 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  {reg}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Typical Kitchen Circuits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {kitchenRequirements.circuits.map((circuit, idx) => (
                <div key={idx} className="bg-amber-600/10 p-3 rounded border border-amber-500/30">
                  <h5 className="font-medium text-amber-200 text-sm mb-2">{circuit.name}</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-amber-400 text-amber-300 text-xs">
                      {circuit.cable}
                    </Badge>
                    <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                      {circuit.protection}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Installation Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {kitchenRequirements.tips.map((tip, idx) => (
                <div key={idx} className="text-sm text-amber-100 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bathroom Zones */}
      <Card className="border-cyan-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <bathroomZones.icon className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">{bathroomZones.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-cyan-500/50 bg-cyan-500/10">
            <AlertTriangle className="h-4 w-4 text-cyan-400" />
            <AlertDescription className="text-cyan-200 text-sm">
              <strong>BS 7671 Section 701:</strong> Special requirements apply to bathroom installations due to increased risk of electric shock.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bathroomZones.zones.map((zone, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  zone.color === 'red' ? 'bg-red-500/10 border-red-500/30' :
                  zone.color === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                  zone.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  'bg-green-500/10 border-green-500/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      zone.color === 'red' ? 'border-red-400 text-red-300' :
                      zone.color === 'orange' ? 'border-orange-400 text-orange-300' :
                      zone.color === 'yellow' ? 'border-yellow-400 text-yellow-300' :
                      'border-green-400 text-green-300'
                    }`}
                  >
                    {zone.zone}
                  </Badge>
                </div>
                <p className={`text-sm mb-3 ${
                  zone.color === 'red' ? 'text-red-200' :
                  zone.color === 'orange' ? 'text-orange-200' :
                  zone.color === 'yellow' ? 'text-yellow-200' :
                  'text-green-200'
                }`}>
                  {zone.description}
                </p>
                <ul className="space-y-1">
                  {zone.requirements.map((req, reqIdx) => (
                    <li key={reqIdx} className="text-xs text-white/90 flex items-start gap-2">
                      <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${
                        zone.color === 'red' ? 'bg-red-400' :
                        zone.color === 'orange' ? 'bg-orange-400' :
                        zone.color === 'yellow' ? 'bg-yellow-400' :
                        'bg-green-400'
                      }`}></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
            <h4 className="font-medium text-white mb-3">General Bathroom Requirements</h4>
            <ul className="space-y-2">
              {bathroomZones.generalRequirements.map((req, idx) => (
                <li key={idx} className="text-sm text-cyan-100 flex items-start gap-2">
                  <Shield className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Consumer Unit Requirements */}
      <Card className="border-violet-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <consumerUnitRequirements.icon className="h-6 w-6 text-violet-400" />
            <CardTitle className="text-violet-300">{consumerUnitRequirements.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-violet-500/50 bg-violet-500/10">
            <Info className="h-4 w-4 text-violet-400" />
            <AlertDescription className="text-violet-200 text-sm">
              The 18th Edition (Amendment 3) introduced significant changes to consumer unit requirements in domestic premises.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            {consumerUnitRequirements.keyChanges.map((change, idx) => (
              <div key={idx} className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/20">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-medium text-white text-sm">{change.requirement}</h4>
                  <Badge variant="outline" className="border-violet-400 text-violet-300 text-xs flex-shrink-0">
                    {change.regulation}
                  </Badge>
                </div>
                <p className="text-sm text-violet-100">{change.details}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/20">
              <h4 className="font-medium text-white mb-3">CU Specifications</h4>
              <div className="space-y-2">
                {consumerUnitRequirements.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-white/80">{spec.item}</span>
                    <span className="text-violet-300">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/20">
              <h4 className="font-medium text-white mb-3">Typical CU Layout</h4>
              <ul className="space-y-1">
                {consumerUnitRequirements.layout.map((item, idx) => (
                  <li key={idx} className="text-sm text-violet-100 flex items-start gap-2">
                    <span className="text-violet-400 font-medium">{idx + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outdoor Installations */}
      <Card className="border-emerald-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <outdoorInstallations.icon className="h-6 w-6 text-emerald-400" />
            <CardTitle className="text-emerald-300">{outdoorInstallations.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
            <h4 className="font-medium text-white mb-3">IP Ratings Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {outdoorInstallations.ipRatings.map((ip, idx) => (
                <div key={idx} className="bg-emerald-600/10 p-3 rounded border border-emerald-500/30">
                  <Badge variant="outline" className="border-emerald-400 text-emerald-300 text-xs mb-2">
                    {ip.rating}
                  </Badge>
                  <p className="text-xs text-emerald-100 mb-1">{ip.description}</p>
                  <p className="text-xs text-white/80"><strong>Use:</strong> {ip.use}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
            <h4 className="font-medium text-white mb-3">Cable Installation Methods</h4>
            <div className="space-y-3">
              {outdoorInstallations.cableRequirements.map((cable, idx) => (
                <div key={idx} className="bg-emerald-600/10 p-3 rounded border border-emerald-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-emerald-400 text-emerald-300 text-xs">
                      {cable.location}
                    </Badge>
                    <span className="text-sm text-white">{cable.cable}</span>
                  </div>
                  <p className="text-xs text-emerald-100 mb-1"><strong>Depth/Clearance:</strong> {cable.depth}</p>
                  <p className="text-xs text-white/80">{cable.notes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
            <h4 className="font-medium text-white mb-3">RCD Protection Requirements</h4>
            <ul className="space-y-2">
              {outdoorInstallations.rcdRequirements.map((req, idx) => (
                <li key={idx} className="text-sm text-emerald-100 flex items-start gap-2">
                  <Shield className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
            <h4 className="font-medium text-white mb-3">Common Outdoor Applications</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-emerald-500/30">
                    <th className="text-left py-2 text-emerald-200">Application</th>
                    <th className="text-left py-2 text-emerald-200">Circuit Type</th>
                    <th className="text-left py-2 text-emerald-200">Cable</th>
                    <th className="text-left py-2 text-emerald-200">Protection</th>
                  </tr>
                </thead>
                <tbody>
                  {outdoorInstallations.commonApplications.map((app, idx) => (
                    <tr key={idx} className="border-b border-emerald-500/20">
                      <td className="py-2 text-white">{app.application}</td>
                      <td className="py-2 text-white/80">{app.circuit}</td>
                      <td className="py-2 text-white/80">{app.cable}</td>
                      <td className="py-2 text-emerald-300">{app.protection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Priorities */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Safety Priorities</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {safetyPriorities.map((safety, index) => (
            <div key={index} className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-orange-200 mb-1">{safety.priority}</h4>
                  <p className="text-sm text-white/80">{safety.description}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    safety.level === 'Critical' ? 'border-red-500 text-red-400' :
                    safety.level === 'Legal' ? 'border-purple-500 text-purple-400' :
                    'border-orange-500 text-orange-400'
                  }`}
                >
                  {safety.level}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Getting Started Checklist */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Before You Start Checklist</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Obtain necessary permits and notifications",
            "Complete thorough site survey and risk assessment",
            "Ensure proper PPE and safety equipment available",
            "Confirm main switch isolation and testing equipment",
            "Check cable routes and access requirements",
            "Plan waste disposal and material deliveries"
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-white/90">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DomesticOverviewCards;
