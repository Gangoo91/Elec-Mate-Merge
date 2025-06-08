
import BackButton from "@/components/common/BackButton";
import InstallationGuideTabs from "@/components/apprentice/installation-guides/InstallationGuideTabs";
import IndustrialPlanningSection from "@/components/apprentice/installation-guides/industrial/IndustrialPlanningSection";
import IndustrialCircuitGuide from "@/components/apprentice/installation-guides/industrial/IndustrialCircuitGuide";
import IndustrialOverviewCards from "@/components/apprentice/installation-guides/industrial/IndustrialOverviewCards";
import IndustrialReferenceGuide from "@/components/apprentice/installation-guides/industrial/IndustrialReferenceGuide";
import { Factory } from "lucide-react";

const IndustrialInstallations = () => {
  const commonTypes = [
    "Motor control systems and VFD installations",
    "High bay lighting for manufacturing facilities", 
    "Heavy machinery electrical connections",
    "ATEX certified hazardous area installations",
    "Control panel and PLC system integration",
    "Industrial heating and welding systems"
  ];

  const cableTypes = [
    { application: "Motor circuits (up to 15kW)", cable: "6-10mm² SWA", protection: "32A MCB + Overload", notes: "Star-delta or soft start" },
    { application: "Heavy machinery (45kW+)", cable: "35mm²+ SWA", protection: "100A+ MCB + VFD", notes: "Variable frequency drive control" },
    { application: "High bay lighting", cable: "2.5-4mm² SWA", protection: "16A MCB + RCD", notes: "200-400W LED fittings" },
    { application: "Control circuits (24V)", cable: "Multi-core screened", protection: "6A Fused", notes: "PLC and automation systems" },
    { application: "Emergency systems", cable: "4mm² FP200", protection: "20A MCB", notes: "Fire-rated cable required" },
    { application: "Welding outlets", cable: "16-25mm² SWA", protection: "50-63A MCB", notes: "High current demand circuits" }
  ];

  const keyStandards = [
    "BS 7671:2018+A2:2022 (18th Edition Wiring Regulations)",
    "ATEX Directive 2014/34/EU (Equipment for explosive atmospheres)",
    "DSEAR Regulations 2002 (Dangerous substances and explosive atmospheres)",
    "BS EN 60204-1 Safety of machinery - Electrical equipment",
    "BS EN 60079 Series Explosive atmospheres protection standards",
    "PUWER Regulations 1998 (Provision and use of work equipment)"
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in p-4">
      <div className="mb-6">
        <BackButton customUrl="/apprentice/toolbox/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      <InstallationGuideTabs
        title="Industrial Installations"
        icon={Factory}
        description="Comprehensive guide to industrial electrical installations including manufacturing facilities, heavy machinery connections, hazardous area installations, and complex motor control systems in the UK."
        commonTypes={commonTypes}
        cableTypes={cableTypes}
        keyStandards={keyStandards}
        planningContent="Industrial installations require comprehensive hazard assessment, ATEX compliance for explosive atmospheres, and coordination with production schedules. Consider three-phase motor starting methods, control system integration, and maintenance access requirements. All work must comply with machinery safety directives and DSEAR regulations."
        safetyContent="ATEX compliance is mandatory for explosive atmospheres with appropriate zone classifications and certified equipment. Implement arc flash protection measures for high voltage systems and ensure proper lock-out/tag-out procedures. All personnel must have appropriate industrial electrical qualifications and competency assessments."
        complianceContent="Complete comprehensive testing including motor insulation testing, earth fault loop impedance verification, and emergency stop system functionality. Provide detailed commissioning documentation, maintenance schedules, and operator training. Ensure compliance with machinery safety directives and workplace regulations."
        enhancedOverviewComponent={<IndustrialOverviewCards />}
        enhancedPlanningComponent={<IndustrialPlanningSection />}
        enhancedCircuitComponent={<IndustrialCircuitGuide />}
        enhancedReferenceComponent={<IndustrialReferenceGuide />}
        safetyNotice={{
          title: "Critical Industrial Safety Requirements",
          points: [
            {
              title: "ATEX Compliance",
              content: "All equipment in explosive atmospheres must have appropriate ATEX certification. Zone classifications must be verified and equipment temperature ratings must not exceed auto-ignition temperatures."
            },
            {
              title: "Arc Flash Protection",
              content: "High voltage industrial systems present significant arc flash risks. Appropriate PPE, risk assessments, and safety procedures must be implemented for all electrical work."
            },
            {
              title: "Machinery Safety Integration",
              content: "All electrical installations must integrate with emergency stop systems and safety interlocks. Compliance with BS EN 60204-1 and machinery safety directives is mandatory."
            }
          ]
        }}
      />
    </div>
  );
};

export default IndustrialInstallations;
