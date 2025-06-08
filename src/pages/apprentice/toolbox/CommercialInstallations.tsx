
import BackButton from "@/components/common/BackButton";
import InstallationGuideTabs from "@/components/apprentice/installation-guides/InstallationGuideTabs";
import { Building } from "lucide-react";

const CommercialInstallations = () => {
  const commonTypes = [
    "Office building electrical systems",
    "Retail shop installations", 
    "Restaurant and kitchen equipment",
    "Three-phase distribution systems",
    "Emergency lighting systems",
    "Fire alarm installations"
  ];

  const cableTypes = [
    { application: "General lighting", cable: "1.5mm² T&E", protection: "10A MCB", notes: "Office/retail areas" },
    { application: "Socket circuits", cable: "2.5mm² T&E", protection: "20A RCBO", notes: "13A outlets" },
    { application: "Three-phase supplies", cable: "4mm² SWA", protection: "20A MCB per phase", notes: "Motor loads" },
    { application: "Emergency lighting", cable: "1.5mm² FP200", protection: "6A MCB", notes: "Fire-rated cable" },
    { application: "Fire alarm systems", cable: "1.5mm² FP200", protection: "6A MCB", notes: "BS 5839 compliant" },
    { application: "Kitchen equipment", cable: "6mm² T&E", protection: "32A MCB", notes: "Heavy cooking loads" }
  ];

  const keyStandards = [
    "BS 7671:2018+A2:2022 (18th Edition Wiring Regulations)",
    "BS 5266 Emergency lighting code of practice",
    "BS 5839 Fire detection and alarm systems",
    "Building Regulations Approved Document B (Fire safety)",
    "Workplace (Health, Safety and Welfare) Regulations 1992"
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in p-4">
      <div className="mb-6">
        <BackButton customUrl="/apprentice/toolbox/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      <InstallationGuideTabs
        title="Commercial Installations"
        icon={Building}
        description="Complete guide to commercial electrical installations including offices, retail premises, and small commercial buildings. Essential knowledge for commercial electrical work in the UK."
        commonTypes={commonTypes}
        cableTypes={cableTypes}
        keyStandards={keyStandards}
        planningContent="Commercial installations require careful load calculations and future expansion planning. Consider three-phase distribution for balanced loads, emergency lighting requirements, and fire alarm integration. Coordination with other building services is essential."
        safetyContent="Ensure all work complies with workplace regulations and fire safety requirements. Emergency lighting must meet BS 5266 standards. All circuits require appropriate RCD protection and regular testing schedules must be established."
        complianceContent="Commercial installations require comprehensive testing including emergency lighting function tests, fire alarm verification, and periodic inspection schedules. Provide detailed test certificates and maintenance schedules to building owners."
        safetyNotice={{
          title: "Commercial Installation Requirements",
          points: [
            {
              title: "Emergency Systems",
              content: "Emergency lighting and fire alarm systems must be installed to current British Standards and tested regularly."
            },
            {
              title: "Three-Phase Supplies",
              content: "Ensure proper phase rotation and balanced loading. Use appropriate protection devices for motor circuits."
            },
            {
              title: "Maintenance Requirements",
              content: "Establish regular testing schedules and provide comprehensive documentation for building management."
            }
          ]
        }}
      />
    </div>
  );
};

export default CommercialInstallations;
