
import BackButton from "@/components/common/BackButton";
import InstallationGuideTabs from "@/components/apprentice/installation-guides/InstallationGuideTabs";
import DomesticPlanningSection from "@/components/apprentice/installation-guides/domestic/DomesticPlanningSection";
import DomesticCircuitGuide from "@/components/apprentice/installation-guides/domestic/DomesticCircuitGuide";
import DomesticTestingGuide from "@/components/apprentice/installation-guides/domestic/DomesticTestingGuide";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, BadgePoundSterling } from "lucide-react";

const DomesticInstallations = () => {
  const commonTypes = [
    "Full house rewires",
    "Kitchen and bathroom installations", 
    "Extension wiring",
    "Consumer unit upgrades",
    "Additional circuits and sockets",
    "Garden and outdoor lighting"
  ];

  const cableTypes = [
    { application: "Lighting circuits", cable: "1.5mm² T&E", protection: "6A MCB", notes: "BS 7671 compliant" },
    { application: "Ring final circuits", cable: "2.5mm² T&E", protection: "32A RCBO", notes: "Max 100m² floor area" },
    { application: "Radial circuits", cable: "2.5mm² T&E", protection: "20A MCB", notes: "Max 50m² floor area" },
    { application: "Cooker circuits", cable: "6mm² T&E", protection: "32A MCB", notes: "Depends on load" },
    { application: "Shower circuits", cable: "10mm² T&E", protection: "40A RCBO", notes: "Up to 8.5kW shower" },
    { application: "Immersion heater", cable: "2.5mm² T&E", protection: "16A MCB", notes: "3kW maximum" }
  ];

  const keyStandards = [
    "BS 7671:2018+A2:2022 (18th Edition Wiring Regulations)",
    "Part P Building Regulations compliance",
    "RCD protection required for most circuits",
    "Electrical Installation Certificate (EIC) required",
    "Inspection and testing to BS 7671"
  ];

  const costConsiderationsCard = (
    <Card className="border-elec-yellow/30 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BadgePoundSterling className="h-6 w-6 text-elec-yellow" />
          <CardTitle className="text-elec-yellow">Typical Installation Costs</CardTitle>
        </div>
        <p className="text-muted-foreground">Approximate material and labour costs for common domestic work</p>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-elec-dark/40 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Consumer Unit Upgrade</h4>
            <p className="text-sm text-muted-foreground mb-2">Materials: £150-300 | Labour: £200-400</p>
            <p className="text-xs text-elec-yellow">Includes RCD protection and MCB upgrades</p>
          </div>
          <div className="bg-elec-dark/40 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Kitchen Ring Main</h4>
            <p className="text-sm text-muted-foreground mb-2">Materials: £80-150 | Labour: £300-500</p>
            <p className="text-xs text-elec-yellow">New 32A RCBO protected circuit</p>
          </div>
          <div className="bg-elec-dark/40 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Electric Shower Circuit</h4>
            <p className="text-sm text-muted-foreground mb-2">Materials: £60-120 | Labour: £250-400</p>
            <p className="text-xs text-elec-yellow">10mm² cable with 40A protection</p>
          </div>
          <div className="bg-elec-dark/40 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Additional Socket Circuit</h4>
            <p className="text-sm text-muted-foreground mb-2">Materials: £40-80 | Labour: £150-250</p>
            <p className="text-xs text-elec-yellow">20A radial with RCD protection</p>
          </div>
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
        title="Domestic Installations"
        icon={Home}
        description="Complete guide to residential electrical installations including new builds, extensions, and rewires. Essential knowledge for domestic electrical work in the UK."
        commonTypes={commonTypes}
        cableTypes={cableTypes}
        keyStandards={keyStandards}
        planningContent="Before starting any domestic installation, conduct a thorough site survey. Check the existing installation condition, identify the consumer unit location, plan cable routes, and ensure adequate earthing arrangements. Consider future expansion needs and smart home integration requirements."
        safetyContent="Isolate the supply at the main switch before commencing work. Use a suitable voltage tester to prove dead and lock off the supply. Ensure all RCD protection is tested and functional. Use appropriate PPE including safety boots and eye protection."
        complianceContent="Upon completion, issue an Electrical Installation Certificate (EIC) for new circuits or a Minor Electrical Installation Works Certificate (MEIWC) for additions. Include schedule of test results and provide customer with Building Control notification if required under Part P."
        additionalCards={costConsiderationsCard}
        enhancedPlanningComponent={<DomesticPlanningSection />}
        enhancedCircuitComponent={<DomesticCircuitGuide />}
        enhancedTestingComponent={<DomesticTestingGuide />}
        safetyNotice={{
          title: "Important Safety Notice",
          points: [
            {
              title: "Part P Building Regulations",
              content: "Most domestic electrical work is notifiable. Use a registered competent person scheme or notify Building Control before starting work."
            },
            {
              title: "RCD Protection",
              content: "All domestic circuits must have 30mA RCD protection as per BS 7671:2018+A2:2022 requirements."
            },
            {
              title: "Testing Required",
              content: "Complete insulation resistance, continuity, and RCD testing. Provide appropriate certification upon completion."
            }
          ]
        }}
      />
    </div>
  );
};

export default DomesticInstallations;
