
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plug,
  CheckCircle,
  Cable,
  Shield,
  Award,
  AlertTriangle,
  Zap,
  Sun,
  Car,
  Waves,
  FileText,
  ClipboardList,
  BookOpen,
  TestTube,
  MapPin,
  Info,
  ShowerHead,
  HardHat,
  Tractor,
  Heart,
  Caravan,
  Tent,
  Lightbulb,
  GraduationCap
} from "lucide-react";

import SpecialLocationsGuide from "@/components/apprentice/installation-guides/specialist/SpecialLocationsGuide";
import SpecialistTestingGuide from "@/components/apprentice/installation-guides/specialist/SpecialistTestingGuide";
import SpecialistReferenceGuide from "@/components/apprentice/installation-guides/specialist/SpecialistReferenceGuide";

const SpecialistInstallations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });

  const tabOptions = [
    { value: "overview", label: "Overview", icon: FileText },
    { value: "locations", label: "Special Locations", icon: MapPin },
    { value: "testing", label: "Testing Guide", icon: TestTube },
    { value: "circuits", label: "Circuits & Systems", icon: Zap },
    { value: "compliance", label: "Compliance", icon: Shield },
    { value: "reference", label: "Reference", icon: BookOpen }
  ];

  const whatIsSpecialist = {
    title: "What is Specialist Electrical Work?",
    description: "Specialist electrical installations are those covered by Part 7 of BS 7671, requiring additional safety measures beyond standard installations due to increased risk factors.",
    riskFactors: [
      {
        factor: "Increased Shock Risk",
        description: "Wet environments, conductive locations, or vulnerable persons increase the likelihood and severity of electric shock",
        examples: ["Swimming pools", "Bathrooms", "Medical locations", "Agricultural premises"],
        icon: Waves
      },
      {
        factor: "Environmental Hazards",
        description: "Extreme temperatures, dust, moisture, or corrosive atmospheres require enhanced equipment protection",
        examples: ["Saunas", "Construction sites", "Marinas", "Agricultural buildings"],
        icon: HardHat
      },
      {
        factor: "Temporary Installations",
        description: "Frequent assembly/disassembly and exposure create additional risks requiring regular inspection",
        examples: ["Exhibitions", "Fairgrounds", "Construction sites", "Events"],
        icon: Tent
      },
      {
        factor: "Specialist Equipment",
        description: "Unique equipment requirements for renewable energy, electric vehicles, or medical applications",
        examples: ["Solar PV", "EV charging", "Medical IT systems", "Pool equipment"],
        icon: Zap
      }
    ]
  };

  const specialLocationCategories = [
    {
      category: "Water & Wet Locations",
      color: "cyan",
      locations: [
        { section: "701", name: "Bathrooms", description: "Bath and shower locations" },
        { section: "702", name: "Swimming Pools", description: "Pools, paddling pools, fountains" },
        { section: "709", name: "Marinas", description: "Boat moorings and shore supplies" }
      ]
    },
    {
      category: "High Temperature",
      color: "orange",
      locations: [
        { section: "703", name: "Saunas", description: "Sauna heaters and hot rooms" }
      ]
    },
    {
      category: "Temporary & Construction",
      color: "yellow",
      locations: [
        { section: "704", name: "Construction Sites", description: "Temporary site installations" },
        { section: "711", name: "Exhibitions", description: "Shows, stands, and displays" },
        { section: "740", name: "Temporary Structures", description: "Fairgrounds, amusement devices" }
      ]
    },
    {
      category: "Specialist Premises",
      color: "green",
      locations: [
        { section: "705", name: "Agricultural", description: "Farms, livestock, horticultural" },
        { section: "710", name: "Medical", description: "Hospitals, clinics, surgeries" },
        { section: "729", name: "Gangways", description: "Operating and maintenance access" }
      ]
    },
    {
      category: "Mobile & Touring",
      color: "purple",
      locations: [
        { section: "708", name: "Caravan Parks", description: "Pitch supplies and hook-ups" },
        { section: "717", name: "Mobile Units", description: "Transportable structures" },
        { section: "721", name: "Caravans", description: "Internal caravan wiring" }
      ]
    },
    {
      category: "Renewable & EV",
      color: "lime",
      locations: [
        { section: "712", name: "Solar PV", description: "Photovoltaic systems" },
        { section: "722", name: "EV Charging", description: "Electric vehicle charging" }
      ]
    },
    {
      category: "Restricted Access",
      color: "red",
      locations: [
        { section: "706", name: "Restrictive Conductive", description: "Inside tanks, vessels, boilers" }
      ]
    }
  ];

  const commonTypes = [
    "Solar PV systems",
    "Electric vehicle charging points",
    "Swimming pool installations",
    "Bathroom electrical work",
    "Agricultural installations",
    "Temporary electrical supplies",
    "Medical location installations",
    "Caravan park supplies",
    "Marina shore supplies",
    "Construction site installations"
  ];

  const cableTypes = [
    { application: "Solar PV DC", cable: "4mm² DC cable", protection: "DC isolators", notes: "UV resistant, fire rated" },
    { application: "EV charging", cable: "6mm² T&E", protection: "32A Type A RCBO", notes: "O-PEN device for PME" },
    { application: "Pool equipment", cable: "2.5mm² SWA", protection: "16A RCBO 30mA", notes: "Zone classification applies" },
    { application: "Bathroom circuits", cable: "2.5mm² T&E", protection: "20A RCBO 30mA", notes: "IP rating per zone" },
    { application: "Agricultural", cable: "4mm² SWA", protection: "20A RCBO 30mA", notes: "Rodent protection essential" },
    { application: "Construction site", cable: "H07RN-F flex", protection: "RCD + 110V CTE", notes: "IP44 minimum" },
    { application: "Sauna circuits", cable: "Silicone/MICC", protection: "16A RCBO 30mA", notes: "Heat resistant cables" },
    { application: "Medical locations", cable: "Per IT design", protection: "IT system + IMD", notes: "Group 2 requirements" }
  ];

  const keyStandards = [
    "BS 7671:2018+A2:2022 Part 7 - Special Installations",
    "IET Guidance Note 7 - Special Locations (6th Edition)",
    "MCS standards for renewable energy systems",
    "IET Code of Practice for EV charging installations",
    "IET Code of Practice for Grid-Connected Solar PV",
    "G98/G99 grid connection requirements",
    "HTM 06-01 for healthcare electrical installations",
    "HSE guidance for construction site electrical safety"
  ];

  const gridConnectionRequirements = [
    {
      standard: "G98 (less than or equal to 16A per phase)",
      description: "Simplified connection process for small generators",
      requirements: [
        "Notification to DNO required",
        "Loss of mains protection built into inverter",
        "No additional protection required",
        "Applies to most domestic solar PV"
      ]
    },
    {
      standard: "G99 (greater than 16A per phase)",
      description: "Engineering recommendation for larger installations",
      requirements: [
        "Application to DNO required",
        "Additional protection may be needed",
        "Witness testing may be required",
        "Commercial installations typically"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; text: string }> = {
      cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-300" },
      orange: { border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-300" },
      yellow: { border: "border-yellow-500/30", bg: "bg-yellow-500/10", text: "text-yellow-300" },
      green: { border: "border-green-500/30", bg: "bg-green-500/10", text: "text-green-300" },
      purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-300" },
      lime: { border: "border-lime-500/30", bg: "bg-lime-500/10", text: "text-lime-300" },
      red: { border: "border-red-500/30", bg: "bg-red-500/10", text: "text-red-300" }
    };
    return colors[color] || colors.cyan;
  };

  const renderOverviewContent = () => (
    <div className="space-y-6">
      {/* What is Specialist Electrical Work */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">{whatIsSpecialist.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
            <Info className="h-4 w-4 text-elec-yellow" />
            <AlertDescription className="text-elec-yellow/90">
              {whatIsSpecialist.description}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatIsSpecialist.riskFactors.map((factor, idx) => {
              const Icon = factor.icon;
              return (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-lg border border-elec-yellow/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-medium text-elec-yellow">{factor.factor}</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{factor.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {factor.examples.map((example, eIdx) => (
                      <Badge key={eIdx} variant="outline" className="border-gray-500 text-gray-400 text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Special Location Categories Overview */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">BS 7671 Part 7 - Special Locations Overview</CardTitle>
          </div>
          <CardDescription className="text-neutral-300">
            Part 7 contains requirements for 17 special installation types, organized by risk category
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {specialLocationCategories.map((category, catIdx) => {
            const colors = getColorClasses(category.color);
            return (
              <div key={catIdx} className={`${colors.bg} p-4 rounded-lg border ${colors.border}`}>
                <h4 className={`font-medium ${colors.text} mb-3`}>{category.category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {category.locations.map((loc, locIdx) => (
                    <div key={locIdx} className="bg-black/20 p-3 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`${colors.border} ${colors.text} text-xs`}>
                          {loc.section}
                        </Badge>
                        <span className="text-white text-sm font-medium">{loc.name}</span>
                      </div>
                      <p className="text-xs text-gray-400">{loc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Common Installation Types */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Specialist Installation Types</CardTitle>
          </div>
          <p className="text-white/70">Advanced electrical installations requiring specialist knowledge</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonTypes.map((type, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-white">
                  <Zap className="h-4 w-4 text-elec-yellow" />
                  {type}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Differences from Standard Installations */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Key Differences from Standard Installations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-medium text-blue-300 mb-3">Enhanced Protection</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  <span>Lower touch voltage limits (25V for livestock/medical)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  <span>SELV systems in high-risk zones</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  <span>Enhanced supplementary bonding requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  <span>Faster disconnection times in some locations</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-medium text-green-300 mb-3">Equipment Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Specific IP ratings for environmental protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Heat-resistant cables in high temperature zones</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Type A/B RCDs for DC fault detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>IT systems for medical Group 2 locations</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-medium text-purple-300 mb-3">Testing Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5" />
                  <span>Additional tests for SELV verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5" />
                  <span>DC insulation resistance for solar PV</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5" />
                  <span>IT system insulation monitoring verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5" />
                  <span>More frequent periodic inspection</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
              <h4 className="font-medium text-orange-300 mb-3">Documentation</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>Zone diagrams for pools and bathrooms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>MCS certification for solar installations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>DNO notification for grid connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>Group classification for medical locations</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Specialist Career Opportunities</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
              <Sun className="h-8 w-8 text-amber-400 mb-2" />
              <h4 className="font-medium text-amber-200 mb-2">Solar PV Installer</h4>
              <p className="text-sm text-gray-300 mb-2">Growing demand for renewable energy installations</p>
              <div className="text-xs text-gray-400">
                Requirements: MCS certification, G98/G99 knowledge
              </div>
            </div>

            <div className="bg-lime-500/10 p-4 rounded-lg border border-lime-500/20">
              <Car className="h-8 w-8 text-lime-400 mb-2" />
              <h4 className="font-medium text-lime-200 mb-2">EV Charging Specialist</h4>
              <p className="text-sm text-gray-300 mb-2">Rapidly expanding market with government support</p>
              <div className="text-xs text-gray-400">
                Requirements: 2919 qualification, OZEV approval
              </div>
            </div>

            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <Heart className="h-8 w-8 text-red-400 mb-2" />
              <h4 className="font-medium text-red-200 mb-2">Medical Installations</h4>
              <p className="text-sm text-gray-300 mb-2">Specialist work in healthcare environments</p>
              <div className="text-xs text-gray-400">
                Requirements: HTM 06-01 knowledge, IT system experience
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCircuitsContent = () => (
    <div className="space-y-6">
      {/* Cable Types & Protection */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Specialist Cable Types & Protection</CardTitle>
          </div>
          <p className="text-white/70">Cable specifications for specialist installations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {cableTypes.map((cable, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg border border-elec-yellow/20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-base mb-1">{cable.application}</h4>
                    <p className="text-sm text-white/70">{cable.notes}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
                      {cable.cable}
                    </Badge>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      {cable.protection}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grid Connection Requirements */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plug className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Grid Connection Requirements</CardTitle>
          </div>
          <p className="text-white/70">DNO requirements for renewable energy connections</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {gridConnectionRequirements.map((req, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-5 rounded-lg border border-elec-yellow/20">
                <h4 className="font-medium text-white text-lg mb-2">{req.standard}</h4>
                <p className="text-sm text-white/70 mb-4">{req.description}</p>
                <div className="space-y-2">
                  {req.requirements.map((requirement, reqIndex) => (
                    <div key={reqIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Circuit Considerations */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Special Circuit Considerations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="h-5 w-5 text-amber-400" />
                <h4 className="font-medium text-amber-200">Solar PV DC Circuits</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>String voltage can exceed 600V DC</li>
                <li>Arrays generate power whenever illuminated</li>
                <li>DC arc fault detection recommended</li>
                <li>UV resistant cable and glands essential</li>
                <li>Fire safety labelling at entry points</li>
              </ul>
            </div>

            <div className="bg-lime-500/10 p-4 rounded-lg border border-lime-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Car className="h-5 w-5 text-lime-400" />
                <h4 className="font-medium text-lime-200">EV Charging Circuits</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>32A continuous load - cable sizing critical</li>
                <li>Type A RCD for DC leakage detection</li>
                <li>O-PEN protection for PME supplies</li>
                <li>Load management for multiple chargers</li>
                <li>Smart charging Device Regulations compliance</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Waves className="h-5 w-5 text-blue-400" />
                <h4 className="font-medium text-blue-200">Pool & Spa Circuits</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>SELV 12V maximum in Zone 0 and 1</li>
                <li>Supplementary bonding throughout zones</li>
                <li>IPX8 rating for underwater equipment</li>
                <li>Dedicated circuits for pumps and heaters</li>
                <li>Enhanced RCD sensitivity requirements</li>
              </ul>
            </div>

            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-red-400" />
                <h4 className="font-medium text-red-200">Medical IT Systems</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Unearthed IT supply via isolating transformer</li>
                <li>Insulation Monitoring Device (IMD) required</li>
                <li>First fault does not cause disconnection</li>
                <li>Maintains supply to life-critical equipment</li>
                <li>Maximum 10kVA per transformer</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderComplianceContent = () => (
    <div className="space-y-6">
      {/* Key Standards */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Key Standards & Regulations</CardTitle>
          </div>
          <p className="text-white/70">Essential compliance requirements for specialist installations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            {keyStandards.map((standard, index) => (
              <div key={index} className="flex items-start gap-3">
                <Award className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white/70">{standard}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/30 bg-white/5">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Planning & Approvals</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-white/70">
              Specialist installations often require additional approvals and notifications. Check with local
              building control and DNO requirements for grid connections. Plan cable routes considering special
              environmental conditions and access for maintenance. Consider ongoing monitoring requirements.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-white/5">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Enhanced Safety Measures</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-white/70">
              Special locations require enhanced safety measures including additional RCD protection, bonding
              requirements, and IP rating considerations. Ensure all personnel are trained for the specific
              installation type and environmental hazards present.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-white/5">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Certification & Warranties</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-white/70">
              Specialist installations may require additional certification such as MCS for solar PV or specific
              commissioning procedures for EV charging points. Ensure all relevant standards are followed and
              appropriate warranties provided to the customer.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Important Safety Notice */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Specialist Installation Safety</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            <p className="text-sm text-white/70">
              <strong className="text-orange-300">Competency Requirements:</strong> Specialist installations require
              additional training and certification. Ensure you have appropriate qualifications before undertaking
              specialist work.
            </p>
            <p className="text-sm text-white/70">
              <strong className="text-orange-300">Type A RCD Protection:</strong> Many specialist installations require
              Type A RCDs due to DC leakage currents or electronic equipment.
            </p>
            <p className="text-sm text-white/70">
              <strong className="text-orange-300">Environmental Considerations:</strong> Consider IP ratings, UV
              resistance, and environmental conditions specific to each installation type.
            </p>
            <p className="text-sm text-white/70">
              <strong className="text-orange-300">Part 7 Takes Precedence:</strong> Where Part 7 requirements conflict
              with general BS 7671 requirements, Part 7 takes precedence for the specific installation type.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverviewContent();
      case "locations":
        return <SpecialLocationsGuide />;
      case "testing":
        return <SpecialistTestingGuide />;
      case "circuits":
        return renderCircuitsContent();
      case "compliance":
        return renderComplianceContent();
      case "reference":
        return <SpecialistReferenceGuide />;
      default:
        return renderOverviewContent();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="mb-6">
        <SmartBackButton />
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-elec-yellow/20 blur-xl rounded-full" />
              <div className="relative bg-white/5/80 p-3 rounded-xl border border-elec-yellow/30">
                <Plug className="h-10 w-10 text-elec-yellow" />
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Specialist Installations</h1>
          </div>
          <p className="text-lg text-neutral-200 max-w-3xl mx-auto leading-relaxed">
            Comprehensive guide to BS 7671 Part 7 special locations including solar PV, EV charging,
            swimming pools, medical locations, and all specialist electrical installation requirements.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="w-full space-y-6">
          <div className="flex justify-center">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-[320px] md:w-[400px] bg-white/5 border-elec-yellow/30 hover:border-elec-yellow/50 transition-colors text-white h-12 text-base font-medium shadow-lg shadow-black/20">
                <SelectValue placeholder="Select section">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const currentTab = tabOptions.find(tab => tab.value === activeTab);
                      const IconComponent = currentTab?.icon;
                      return (
                        <>
                          {IconComponent && <IconComponent className="h-5 w-5 text-elec-yellow" />}
                          <span>{currentTab?.label}</span>
                        </>
                      );
                    })()}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white/5 border-elec-yellow/30 shadow-xl shadow-black/30">
                {tabOptions.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <SelectItem
                      key={tab.value}
                      value={tab.value}
                      className="text-white hover:bg-elec-yellow/20 focus:bg-elec-yellow/20 focus:text-white cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-elec-yellow" />
                        <span>{tab.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Tab Content */}
          <div className="w-full space-y-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Bottom Safety Alert */}
        <Alert className="border-red-500/60 bg-red-500/15 mt-8 shadow-lg shadow-red-500/10 backdrop-blur-sm">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <AlertDescription>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-red-300 mb-3">
                Critical Special Location Safety Requirements
              </h3>
              <div className="space-y-4">
                <div className="space-y-1 pl-2 border-l-2 border-red-500/40">
                  <h4 className="font-semibold text-red-200">Part 7 Compliance is Mandatory</h4>
                  <p className="text-sm text-red-100">Where BS 7671 Part 7 requirements apply, they MUST be followed. Part 7 requirements supplement and take precedence over general requirements.</p>
                </div>
                <div className="space-y-1 pl-2 border-l-2 border-red-500/40">
                  <h4 className="font-semibold text-red-200">Specialist Training Required</h4>
                  <p className="text-sm text-red-100">Many special locations require additional training and certification (e.g., MCS for solar, medical locations training for hospitals). Never attempt specialist work without proper qualifications.</p>
                </div>
                <div className="space-y-1 pl-2 border-l-2 border-red-500/40">
                  <h4 className="font-semibold text-red-200">Enhanced Protection Measures</h4>
                  <p className="text-sm text-red-100">Special locations have enhanced protection requirements including SELV systems, enhanced bonding, specific RCD types, and stricter disconnection times. Verify ALL requirements before installation.</p>
                </div>
                <div className="space-y-1 pl-2 border-l-2 border-red-500/40">
                  <h4 className="font-semibold text-red-200">Consult IET Guidance Note 7</h4>
                  <p className="text-sm text-red-100">IET Guidance Note 7 provides essential detailed guidance on all Part 7 special locations. It is an essential reference for any specialist installation work.</p>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default SpecialistInstallations;
