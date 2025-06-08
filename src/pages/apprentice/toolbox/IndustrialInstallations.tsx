
import BackButton from "@/components/common/BackButton";
import InstallationGuideTabs from "@/components/apprentice/installation-guides/InstallationGuideTabs";
import { Factory } from "lucide-react";

const IndustrialInstallations = () => {
  const commonTypes = [
    "Motor control systems",
    "High bay lighting installations", 
    "Heavy machinery connections",
    "Control panel installations",
    "Conveyor system electrics",
    "Industrial heating systems"
  ];

  const cableTypes = [
    { application: "Motor circuits", cable: "6mm² SWA", protection: "25A MCB + Overload", notes: "Three-phase motors" },
    { application: "High bay lighting", cable: "2.5mm² SWA", protection: "16A MCB", notes: "HID/LED fittings" },
    { application: "Control circuits", cable: "1.5mm² Multi-core", protection: "6A MCB", notes: "24V/110V systems" },
    { application: "Heavy machinery", cable: "25mm² SWA", protection: "63A MCB", notes: "Large industrial loads" },
    { application: "Emergency systems", cable: "4mm² FP200", protection: "20A MCB", notes: "Fire-rated supplies" },
    { application: "Welding outlets", cable: "16mm² SWA", protection: "50A MCB", notes: "High current demand" }
  ];

  const keyStandards = [
    "BS 7671:2018+A2:2022 (18th Edition Wiring Regulations)",
    "BS EN 60204-1 Safety of machinery - Electrical equipment",
    "BS 5266 Emergency lighting in industrial premises",
    "DSEAR Regulations (Dangerous Substances and Explosive Atmospheres)",
    "PUWER Regulations (Provision and Use of Work Equipment)"
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in p-4">
      <div className="mb-6">
        <BackButton customUrl="/apprentice/toolbox/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      <InstallationGuideTabs
        title="Industrial Installations"
        icon={Factory}
        description="Comprehensive guide to industrial electrical installations including manufacturing facilities, heavy machinery connections, and hazardous area installations."
        commonTypes={commonTypes}
        cableTypes={cableTypes}
        keyStandards={keyStandards}
        planningContent="Industrial motor installations require proper overload protection, correct starter selection, and emergency stop integration. Consider soft-start requirements for large motors and ensure proper earthing for motor frames."
        safetyContent="ATEX compliance is mandatory for explosive atmospheres. Use certified equipment with appropriate IP ratings. Understand zone classifications and implement proper cable sealing and earthing techniques."
        complianceContent="Design installations with maintenance in mind. Provide adequate access to control panels, junction boxes, and testing points. Implement lock-out/tag-out procedures and ensure proper labelling of all circuits and equipment."
        safetyNotice={{
          title: "Industrial Safety Requirements",
          points: [
            {
              title: "High Voltage Awareness",
              content: "Industrial installations often involve high voltage systems. Ensure proper training and competency before working on such systems."
            },
            {
              title: "Arc Flash Protection",
              content: "Implement appropriate arc flash protection measures and ensure workers are trained in arc flash hazards and PPE requirements."
            },
            {
              title: "Emergency Procedures",
              content: "Establish clear emergency shutdown procedures and ensure all personnel are familiar with emergency stop locations and isolation procedures."
            }
          ]
        }}
      />
    </div>
  );
};

export default IndustrialInstallations;
