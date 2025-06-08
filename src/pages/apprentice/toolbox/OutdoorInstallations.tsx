
import BackButton from "@/components/common/BackButton";
import InstallationGuideTabs from "@/components/apprentice/installation-guides/InstallationGuideTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Cloud } from "lucide-react";

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

  const weatherConsiderationsCard = (
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
  );

  return (
    <div className="max-w-7xl mx-auto animate-fade-in p-4">
      <div className="mb-6">
        <BackButton customUrl="/apprentice/toolbox/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      <InstallationGuideTabs
        title="Outdoor Installations"
        icon={MapPin}
        description="Complete guide to external electrical installations including street lighting, car parks, underground cables, and outdoor electrical systems."
        commonTypes={commonTypes}
        cableTypes={cableTypes}
        keyStandards={keyStandards}
        planningContent="Use SWA cables for direct burial with appropriate depth and warning tape. Install rodent guards where necessary and ensure proper cable joint sealing. Follow utility coordination procedures for excavation work."
        safetyContent="Street and area lighting must meet BS 5489 standards for illumination levels and uniformity. Consider LED technology for energy efficiency and reduced maintenance. Plan for future smart lighting integration capabilities."
        complianceContent="Design installations for easy maintenance access. Use accessible junction boxes and provide adequate working space around equipment. Consider traffic management requirements for street lighting maintenance."
        additionalCards={weatherConsiderationsCard}
        safetyNotice={{
          title: "Outdoor Installation Safety",
          points: [
            {
              title: "Weather Protection",
              content: "All outdoor electrical equipment must have appropriate IP ratings. Use weatherproof enclosures and ensure proper cable sealing."
            },
            {
              title: "Underground Services",
              content: "Always check for existing utilities before excavation. Use proper cable marking and warning systems for future excavation safety."
            },
            {
              title: "RCD Protection",
              content: "All outdoor circuits must have 30mA RCD protection. Consider additional surge protection for exposed installations."
            }
          ]
        }}
      />
    </div>
  );
};

export default OutdoorInstallations;
