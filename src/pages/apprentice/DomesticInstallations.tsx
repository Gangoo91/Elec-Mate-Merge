
import BackButton from "@/components/common/BackButton";
import InstallationGuideTabs from "@/components/apprentice/installation-guides/InstallationGuideTabs";
import DomesticPlanningSection from "@/components/apprentice/installation-guides/domestic/DomesticPlanningSection";
import DomesticCircuitGuide from "@/components/apprentice/installation-guides/domestic/DomesticCircuitGuide";
import DomesticTestingGuide from "@/components/apprentice/installation-guides/domestic/DomesticTestingGuide";
import DomesticOverviewCards from "@/components/apprentice/installation-guides/domestic/DomesticOverviewCards";
import DomesticReferenceGuide from "@/components/apprentice/installation-guides/domestic/DomesticReferenceGuide";
import { Home } from "lucide-react";

const DomesticInstallations = () => {
  const commonTypes = [
    "Full house rewires and partial rewiring projects",
    "Kitchen and bathroom electrical installations", 
    "Extension wiring and garage conversions",
    "Consumer unit upgrades and distribution board replacements",
    "Additional circuits for sockets, lighting, and appliances",
    "Garden lighting, pond pumps, and outdoor electrical systems",
    "Electric vehicle charging point installations",
    "Solar PV system integration and battery storage",
    "Smart home automation and control systems"
  ];

  const cableTypes = [
    { application: "Lighting circuits", cable: "1.5mm² T&E", protection: "6A MCB", notes: "BS 7671 compliant, max 12 points per circuit" },
    { application: "Ring final circuits", cable: "2.5mm² T&E", protection: "32A RCBO", notes: "Max 100m² floor area, unlimited sockets" },
    { application: "Radial socket circuits", cable: "2.5mm² T&E", protection: "20A MCB + RCD", notes: "Max 50m² floor area or 20A load" },
    { application: "Radial socket circuits (heavy duty)", cable: "4mm² T&E", protection: "32A MCB + RCD", notes: "For workshop areas, max 32A load" },
    { application: "Cooker circuits", cable: "6mm² T&E", protection: "32A MCB", notes: "Up to 15kW load, diversity applies" },
    { application: "Electric shower circuits", cable: "10mm² T&E", protection: "45A RCBO", notes: "Up to 10.8kW shower, dedicated circuit" },
    { application: "Immersion heater", cable: "2.5mm² T&E", protection: "16A MCB", notes: "3kW maximum, dual tariff switching" },
    { application: "EV charging", cable: "6mm² T&E", protection: "32A RCBO", notes: "7kW charging point, RCD type A required" }
  ];

  const keyStandards = [
    "BS 7671:2018+A2:2022 (18th Edition Wiring Regulations) - fundamental requirements",
    "Part P Building Regulations compliance for domestic electrical installations",
    "RCD protection required for all socket outlets and bathroom circuits",
    "Electrical Installation Certificate (EIC) required for new installations",
    "Minor Electrical Installation Works Certificate (MEIWC) for additions/alterations",
    "Inspection and testing procedures as per BS 7671 requirements",
    "IET Guidance Note 3 for inspection and testing procedures",
    "NICEIC/NAPIT competent person scheme registration requirements"
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in p-4">
      <div className="mb-6">
        <BackButton customUrl="/apprentice/toolbox/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      <InstallationGuideTabs
        title="Domestic Electrical Installations"
        icon={Home}
        description="Comprehensive guide to residential electrical installations covering everything from simple socket additions to complete house rewires. Essential knowledge for safe and compliant domestic electrical work in the UK."
        commonTypes={commonTypes}
        cableTypes={cableTypes}
        keyStandards={keyStandards}
        planningContent="Comprehensive domestic installation planning involves detailed site surveys, load calculations, future-proofing considerations, and regulatory compliance. Every project must begin with thorough risk assessment and proper documentation. Consider client needs, building constraints, and long-term electrical requirements including smart home integration and renewable energy systems."
        safetyContent="Safety is paramount in domestic electrical work. Always isolate the supply at the main switch and use appropriate testing equipment to prove dead before commencing work. Lock off isolation points and use appropriate PPE throughout. Be aware of special location requirements such as bathrooms and outdoor areas. Never compromise on safety procedures - lives depend on it."
        complianceContent="Domestic electrical work must comply with Part P Building Regulations and BS 7671 requirements. Most work is notifiable and requires either Building Control notification or completion by a registered competent person. Upon completion, issue appropriate certification (EIC for new installations, MEIWC for additions) including comprehensive test results and safety recommendations."
        enhancedOverviewComponent={<DomesticOverviewCards />}
        enhancedPlanningComponent={<DomesticPlanningSection />}
        enhancedCircuitComponent={<DomesticCircuitGuide />}
        enhancedTestingComponent={<DomesticTestingGuide />}
        enhancedReferenceComponent={<DomesticReferenceGuide />}
        safetyNotice={{
          title: "Critical Safety Requirements",
          points: [
            {
              title: "Part P Building Regulations Compliance",
              content: "Most domestic electrical work is notifiable under Part P. Use a registered competent person scheme or notify Building Control before starting work. Failure to comply is a legal offence."
            },
            {
              title: "RCD Protection Requirements",
              content: "All domestic socket outlets must have 30mA RCD protection as per BS 7671:2018+A2:2022. Bathroom circuits require additional protection measures and appropriate IP ratings."
            },
            {
              title: "Testing and Certification Mandatory",
              content: "Complete inspection and testing is legally required. Provide appropriate certification upon completion with detailed test results. Keep copies for your records and future reference."
            },
            {
              title: "Competence and Registration",
              content: "Only qualified and registered electricians should carry out domestic electrical work. Ensure you have appropriate qualifications and competent person scheme membership."
            }
          ]
        }}
      />
    </div>
  );
};

export default DomesticInstallations;
