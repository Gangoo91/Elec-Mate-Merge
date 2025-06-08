
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin,
  CheckCircle,
  Cable,
  Shield,
  Award,
  AlertTriangle,
  Zap,
  Cloud,
  TreePine
} from "lucide-react";

const OutdoorInstallations = () => {
  const commonTypes = [
    "Street lighting installations",
    "Car park and area lighting", 
    "External socket installations",
    "Underground cable runs",
    "Garden and landscape lighting",
    "External security systems"
  ];

  const cableTypes = [
    { application: "Street lighting", cable: "6mm² SWA", protection: "20A MCB", notes: "Direct burial rated" },
    { application: "Car park lighting", cable: "4mm² SWA", protection: "16A MCB", notes: "High mast lighting" },
    { application: "External sockets", cable: "2.5mm² SWA", protection: "20A RCBO", notes: "IP66 rated outlets" },
    { application: "Underground feeds", cable: "16mm² SWA", protection: "50A MCB", notes: "Sub-main distributions" },
    { application: "Garden lighting", cable: "1.5mm² SWA", protection: "6A RCBO", notes: "Low voltage systems" },
    { application: "Security systems", cable: "1.5mm² SWA", protection: "6A MCB", notes: "CCTV and alarms" }
  ];

  const keyStandards = [
    "BS 7671:2018+A2:2022 (18th Edition Wiring Regulations)",
    "BS 5489 Code of practice for the design of road lighting",
    "BS EN 12464-2 Light and lighting - Lighting of work places - Part 2: Outdoor work places",
    "IET Code of Practice for Electrical Safety Management",
    "Highway Electrical Association (HEA) Guidelines"
  ];

  const weatherConsiderations = [
    "IP65/IP66 rating requirements",
    "UV resistant cable specifications",
    "Frost protection measures",
    "Wind loading calculations",
    "Corrosion protection methods",
    "Lightning protection systems"
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MapPin className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-elec-yellow">
            Outdoor Installations
          </h1>
        </div>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6">
          Complete guide to external electrical installations including street lighting, car parks, 
          underground cables, and outdoor electrical systems.
        </p>
        <BackButton customUrl="/apprentice/toolbox/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      {/* Common Installation Types */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Outdoor Installation Types</CardTitle>
          </div>
          <p className="text-muted-foreground">Typical external electrical work you'll encounter</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonTypes.map((type, index) => (
              <div key={index} className="bg-elec-dark/40 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-white">
                  <TreePine className="h-4 w-4 text-elec-yellow" />
                  {type}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cable Types & Protection */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Outdoor Cable Types & Protection</CardTitle>
          </div>
          <p className="text-muted-foreground">Weather-resistant cables and protection for external installations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {cableTypes.map((cable, index) => (
              <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-elec-yellow/20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-base mb-1">{cable.application}</h4>
                    <p className="text-sm text-muted-foreground">{cable.notes}</p>
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

      {/* Weather Considerations */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Weather & Environmental Considerations</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential environmental factors for outdoor installations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weatherConsiderations.map((consideration, index) => (
              <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 text-blue-300">
                  <Cloud className="h-4 w-4" />
                  {consideration}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Standards */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Key Standards & Regulations</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential compliance requirements for outdoor installations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            {keyStandards.map((standard, index) => (
              <div key={index} className="flex items-start gap-3">
                <Award className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{standard}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Underground Installations</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Use SWA cables for direct burial with appropriate depth and warning tape. Install rodent 
              guards where necessary and ensure proper cable joint sealing. Follow utility coordination 
              procedures for excavation work.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Lighting Design</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Street and area lighting must meet BS 5489 standards for illumination levels and uniformity. 
              Consider LED technology for energy efficiency and reduced maintenance. Plan for future 
              smart lighting integration capabilities.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Maintenance Access</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Design installations for easy maintenance access. Use accessible junction boxes and 
              provide adequate working space around equipment. Consider traffic management requirements 
              for street lighting maintenance.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Important Safety Notice */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Outdoor Installation Safety</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Weather Protection:</strong> All outdoor electrical equipment must have 
              appropriate IP ratings. Use weatherproof enclosures and ensure proper cable sealing.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Underground Services:</strong> Always check for existing utilities before 
              excavation. Use proper cable marking and warning systems for future excavation safety.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">RCD Protection:</strong> All outdoor circuits must have 30mA RCD protection. 
              Consider additional surge protection for exposed installations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutdoorInstallations;
