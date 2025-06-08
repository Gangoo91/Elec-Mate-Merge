
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  MapPin, 
  Shield, 
  Sun,
  Eye,
  Cable,
  Settings,
  AlertTriangle
} from "lucide-react";

const OutdoorCircuitGuide = () => {
  const streetLightingCircuits = [
    {
      application: "LED Street Lighting (30-60W)",
      cable: "4mm² SWA",
      protection: "10A MCB + 30mA RCD",
      control: "Photocell + Astronomical timer",
      spacing: "25-35m centres",
      notes: "Energy efficient, long life"
    },
    {
      application: "High Pressure Sodium (70-150W)",
      cable: "6mm² SWA",
      protection: "16A MCB + 30mA RCD",
      control: "Photocell control",
      spacing: "30-40m centres", 
      notes: "Being phased out for LED"
    },
    {
      application: "High Bay Area Lighting (200W+)",
      cable: "10mm² SWA",
      protection: "20A MCB + 30mA RCD",
      control: "PIR + Photocell",
      spacing: "40-60m centres",
      notes: "Industrial and commercial areas"
    },
    {
      application: "Decorative Heritage Lighting",
      cable: "2.5mm² SWA",
      protection: "6A MCB + 30mA RCD",
      control: "Central management system",
      spacing: "15-25m centres",
      notes: "Conservation area compliance"
    }
  ];

  const cableInstallation = [
    {
      location: "Carriageway (Roadway)",
      depth: "750mm minimum",
      protection: "Impact protection required",
      warning: "Warning tape at 300mm",
      backfill: "Sand or fine granular material"
    },
    {
      location: "Footway/Pavement", 
      depth: "600mm minimum",
      protection: "Clay tiles or plastic covers",
      warning: "Warning tape at 300mm",
      backfill: "Sand surround, selected backfill"
    },
    {
      location: "Verge/Soft Ground",
      depth: "450mm minimum", 
      protection: "Cable marker posts",
      warning: "Warning tape at 300mm",
      backfill: "Native soil, well compacted"
    },
    {
      location: "Service Crossings",
      depth: "As per service owner requirements",
      protection: "Ducting or bridge protection",
      warning: "Service crossing markers",
      backfill: "Specialist reinstatement"
    }
  ];

  const powerSupplyDesign = [
    {
      system: "Radial Distribution",
      voltage: "230V Single Phase",
      application: "Residential street lighting",
      maxLength: "200m approximate",
      protection: "RCD at origin, MCB per circuit"
    },
    {
      system: "Ring Main Distribution",
      voltage: "400V Three Phase",
      application: "Commercial/industrial areas",
      maxLength: "500m+ possible",
      protection: "HV/LV protection, multiple RCDs"
    },
    {
      system: "Feeder Pillar Supply",
      voltage: "400V Three Phase",
      application: "Large area lighting schemes",
      maxLength: "Multiple circuits from pillar",
      protection: "Main switch, individual MCBs"
    },
    {
      system: "Central Battery System",
      voltage: "110V DC (maintained)",
      application: "Emergency lighting circuits",
      maxLength: "As per battery capacity",
      protection: "DC fusing, monitoring systems"
    }
  ];

  const specialApplications = [
    {
      application: "Car Park Lighting",
      requirements: [
        "Minimum 20 lux average illumination",
        "3:1 uniformity ratio maximum",
        "CCTV integration capability",
        "Emergency lighting integration"
      ],
      cableSpec: "6mm² SWA, 20A MCB protection",
      control: "PIR sensors with photocell override"
    },
    {
      application: "Sports Facility Lighting",
      requirements: [
        "High lux levels (200-1000 lux)",
        "Even illumination distribution",
        "Colour rendering index >80",
        "Instant restart capability"
      ],
      cableSpec: "25mm² SWA, 63A protection",
      control: "Manual switching with timers"
    },
    {
      application: "Security Perimeter Lighting",
      requirements: [
        "Continuous illumination strips",
        "Vandal-resistant fittings",
        "CCTV integration",
        "Redundant supply arrangements"
      ],
      cableSpec: "4mm² SWA, dual supply feeds",
      control: "Central monitoring system"
    }
  ];

  const environmentalProtection = [
    {
      protection: "IP65 Rating",
      application: "Standard outdoor equipment",
      description: "Dust tight, protection against water jets",
      typical: "Standard luminaires, control gear"
    },
    {
      protection: "IP66 Rating", 
      application: "Harsh outdoor environments",
      description: "Dust tight, protection against powerful water jets",
      typical: "Coastal installations, wash-down areas"
    },
    {
      protection: "IK08 Rating",
      application: "Vandal-resistant installations",
      description: "Impact resistance 5 joules",
      typical: "Public areas, accessible locations"
    },
    {
      protection: "UV Resistance",
      application: "All outdoor cable and equipment",
      description: "UV-stabilised materials and compounds",
      typical: "Cable sheaths, enclosures, fittings"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Outdoor Circuit Design Guide</CardTitle>
          </div>
          <p className="text-muted-foreground">Comprehensive specifications for outdoor electrical installations</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="lighting" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lighting">Street Lighting</TabsTrigger>
          <TabsTrigger value="cables">Cable Installation</TabsTrigger>
          <TabsTrigger value="power">Power Distribution</TabsTrigger>
          <TabsTrigger value="protection">Environmental Protection</TabsTrigger>
        </TabsList>

        <TabsContent value="lighting" className="space-y-4">
          <Card className="border-blue-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sun className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-blue-300">Street Lighting Circuit Specifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {streetLightingCircuits.map((circuit, index) => (
                <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-blue-300">{circuit.application}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                        {circuit.cable}
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                        {circuit.spacing}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-blue-300 font-medium">Protection: </span>
                      <span className="text-muted-foreground">{circuit.protection}</span>
                    </div>
                    <div>
                      <span className="text-blue-300 font-medium">Control: </span>
                      <span className="text-muted-foreground">{circuit.control}</span>
                    </div>
                    <div>
                      <span className="text-blue-300 font-medium">Notes: </span>
                      <span className="text-muted-foreground">{circuit.notes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Special Applications */}
          <Card className="border-purple-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">Special Application Lighting</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {specialApplications.map((app, index) => (
                <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  <h3 className="font-semibold text-purple-300 mb-3">{app.application}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-purple-200 mb-2">Requirements</h4>
                      <div className="space-y-1">
                        {app.requirements.map((req, reqIndex) => (
                          <div key={reqIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                            <span className="text-muted-foreground">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-purple-300 font-medium text-sm">Cable Spec: </span>
                        <span className="text-muted-foreground text-sm">{app.cableSpec}</span>
                      </div>
                      <div>
                        <span className="text-purple-300 font-medium text-sm">Control: </span>
                        <span className="text-muted-foreground text-sm">{app.control}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cables" className="space-y-4">
          <Card className="border-green-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cable className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-300">Underground Cable Installation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {cableInstallation.map((install, index) => (
                <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <h3 className="font-semibold text-green-300 mb-3">{install.location}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-green-300 font-medium">Depth: </span>
                      <span className="text-muted-foreground">{install.depth}</span>
                    </div>
                    <div>
                      <span className="text-green-300 font-medium">Protection: </span>
                      <span className="text-muted-foreground">{install.protection}</span>
                    </div>
                    <div>
                      <span className="text-green-300 font-medium">Warning: </span>
                      <span className="text-muted-foreground">{install.warning}</span>
                    </div>
                    <div>
                      <span className="text-green-300 font-medium">Backfill: </span>
                      <span className="text-muted-foreground">{install.backfill}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Cable Installation Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <h4 className="font-medium text-orange-300 mb-2">Service Location</h4>
                <p className="text-sm text-muted-foreground">Always use CAT scanning and hand digging to prove service locations. Contact utility companies for accurate service plans.</p>
              </div>
              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <h4 className="font-medium text-orange-300 mb-2">Excavation Safety</h4>
                <p className="text-sm text-muted-foreground">Follow safe digging practices. Shore excavations over 1.2m deep. Provide adequate lighting and barriers for public safety.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="power" className="space-y-4">
          <Card className="border-cyan-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-cyan-400" />
                <CardTitle className="text-cyan-300">Power Distribution Systems</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {powerSupplyDesign.map((power, index) => (
                <div key={index} className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-cyan-300">{power.system}</h3>
                    <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs">
                      {power.voltage}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-cyan-300 font-medium">Application: </span>
                      <span className="text-muted-foreground">{power.application}</span>
                    </div>
                    <div>
                      <span className="text-cyan-300 font-medium">Max Length: </span>
                      <span className="text-muted-foreground">{power.maxLength}</span>
                    </div>
                    <div>
                      <span className="text-cyan-300 font-medium">Protection: </span>
                      <span className="text-muted-foreground">{power.protection}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protection" className="space-y-4">
          <Card className="border-red-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-300">Environmental Protection Standards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {environmentalProtection.map((protection, index) => (
                <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-red-300">{protection.protection}</h3>
                    <Badge variant="outline" className="border-red-400 text-red-300 text-xs">
                      {protection.application}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-red-300 font-medium">Description: </span>
                      <span className="text-muted-foreground">{protection.description}</span>
                    </div>
                    <div>
                      <span className="text-red-300 font-medium">Typical Use: </span>
                      <span className="text-muted-foreground">{protection.typical}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutdoorCircuitGuide;
