
import BackButton from "@/components/common/BackButton";
import InstallationGuideTabs from "@/components/apprentice/installation-guides/InstallationGuideTabs";
import OutdoorPlanningSection from "@/components/apprentice/installation-guides/outdoor/OutdoorPlanningSection";
import OutdoorCircuitGuide from "@/components/apprentice/installation-guides/outdoor/OutdoorCircuitGuide";
import OutdoorOverviewCards from "@/components/apprentice/installation-guides/outdoor/OutdoorOverviewCards";
import OutdoorReferenceGuide from "@/components/apprentice/installation-guides/outdoor/OutdoorReferenceGuide";
import OutdoorTestingGuide from "@/components/apprentice/installation-guides/outdoor/OutdoorTestingGuide";
import { MapPin } from "lucide-react";

const OutdoorInstallations = () => {
  const commonTypes = [
    "Street lighting and highway illumination systems",
    "Car park and area lighting installations", 
    "Underground cable networks and distribution",
    "External building power supplies and feeds",
    "Garden and landscape lighting systems",
    "Security lighting and CCTV power supplies"
  ];

  const cableTypes = [
    { application: "Street lighting (LED 30-60W)", cable: "4mm² SWA", protection: "10A MCB + 30mA RCD", notes: "Energy efficient, long life" },
    { application: "Car park lighting (200W+)", cable: "6-10mm² SWA", protection: "20A MCB + 30mA RCD", notes: "PIR control, CCTV integration" },
    { application: "Underground distribution", cable: "16-35mm² SWA", protection: "50-80A MCB", notes: "Sub-main feeds, multiple circuits" },
    { application: "External power supplies", cable: "6-10mm² SWA", protection: "32A MCB + 30mA RCD", notes: "IP66 rated equipment" },
    { application: "Garden lighting (12V)", cable: "1.5mm² SWA", protection: "6A RCBO", notes: "Low voltage systems preferred" },
    { application: "Security systems", cable: "2.5mm² SWA", protection: "10A MCB + RCD", notes: "CCTV, alarms, access control" }
  ];

  const keyStandards = [
    "BS 7671:2018+A2:2022 (18th Edition Wiring Regulations)",
    "BS 5489-1:2020 Code of practice for the design of road lighting",
    "BS EN 13201 Series Road lighting performance requirements",
    "NRSWA 1991 New Roads and Street Works Act regulations",
    "BS EN 60529 Degrees of protection (IP Code) for outdoor equipment",
    "BS EN 40 Series Lighting columns structural requirements"
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in p-4">
      <div className="mb-6">
        <BackButton customUrl="/apprentice/toolbox/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      <InstallationGuideTabs
        title="Outdoor Installations"
        icon={MapPin}
        description="Complete guide to external electrical installations including street lighting, underground cabling, car parks, and outdoor electrical systems. Essential knowledge for outdoor electrical work in the UK with full regulatory compliance."
        commonTypes={commonTypes}
        cableTypes={cableTypes}
        keyStandards={keyStandards}
        planningContent="Outdoor installations require comprehensive site surveys, underground service location, and coordination with local authorities. Use SWA cables for direct burial with appropriate depths and warning systems. Consider environmental factors including wind loading, UV protection, and seasonal access limitations. Plan for traffic management and utility coordination."
        safetyContent="All outdoor equipment must have minimum IP65 protection with enhanced ratings for harsh environments. Underground excavation requires CAT scanning and safe digging practices. Street lighting must comply with BS 5489 illumination standards and include appropriate RCD protection. Consider lightning protection and surge suppression for exposed installations."
        complianceContent="Obtain street works licences and coordinate with highway authorities for all public realm installations. Complete illumination surveys to verify BS 5489 compliance and provide comprehensive testing certification. Establish maintenance schedules and provide operation manuals for ongoing compliance and safety."
        enhancedOverviewComponent={<OutdoorOverviewCards />}
        enhancedPlanningComponent={<OutdoorPlanningSection />}
        enhancedCircuitComponent={<OutdoorCircuitGuide />}
        enhancedTestingComponent={<OutdoorTestingGuide />}
        enhancedReferenceComponent={<OutdoorReferenceGuide />}
        safetyNotice={{
          title: "Essential Outdoor Installation Safety",
          points: [
            {
              title: "Underground Services",
              content: "Always complete CAT scanning and contact utility companies before excavation. Use safe digging practices and provide appropriate cable marking and protection for future safety."
            },
            {
              title: "Weather Protection",
              content: "All outdoor electrical equipment must have appropriate IP ratings (minimum IP65). Plan installations considering seasonal weather patterns and provide adequate surge protection."
            },
            {
              title: "Public Safety",
              content: "Street lighting installations require traffic management plans and coordination with highway authorities. Ensure adequate barriers and warning systems during installation and maintenance."
            }
          ]
        }}
      />
    </div>
  );
};

export default OutdoorInstallations;
