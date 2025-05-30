
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Home,
  CheckCircle,
  Cable,
  Shield,
  Award,
  AlertTriangle,
  BookOpen,
  Zap,
  BadgePoundSterling
} from "lucide-react";

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

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Home className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-elec-yellow">
            Domestic Installations
          </h1>
        </div>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6">
          Complete guide to residential electrical installations including new builds, extensions, and rewires.
          Essential knowledge for domestic electrical work in the UK.
        </p>
        <BackButton customUrl="/apprentice/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      {/* Common Installation Types */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Common Installation Types</CardTitle>
          </div>
          <p className="text-muted-foreground">Typical domestic electrical work you'll encounter</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonTypes.map((type, index) => (
              <div key={index} className="bg-elec-dark/40 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-white">
                  <Zap className="h-4 w-4 text-elec-yellow" />
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
            <CardTitle className="text-elec-yellow">Cable Types & Protection</CardTitle>
          </div>
          <p className="text-muted-foreground">Standard cable sizes and protection for domestic circuits</p>
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

      {/* Key Standards */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Key Standards & Regulations</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential compliance requirements for domestic work</p>
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
            <CardTitle className="text-elec-yellow text-lg">Planning Considerations</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Before starting any domestic installation, conduct a thorough site survey. Check the existing 
              installation condition, identify the consumer unit location, plan cable routes, and ensure 
              adequate earthing arrangements. Consider future expansion needs and smart home integration 
              requirements.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Safety Procedures</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Isolate the supply at the main switch before commencing work. Use a suitable voltage tester 
              to prove dead and lock off the supply. Ensure all RCD protection is tested and functional. 
              Use appropriate PPE including safety boots and eye protection.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Certification & Compliance</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Upon completion, issue an Electrical Installation Certificate (EIC) for new circuits or a 
              Minor Electrical Installation Works Certificate (MEIWC) for additions. Include schedule of 
              test results and provide customer with Building Control notification if required under Part P.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Considerations */}
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

      {/* Important Safety Notice */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Important Safety Notice</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Part P Building Regulations:</strong> Most domestic electrical work is notifiable. 
              Use a registered competent person scheme or notify Building Control before starting work.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">RCD Protection:</strong> All domestic circuits must have 30mA RCD protection 
              as per BS 7671:2018+A2:2022 requirements.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Testing Required:</strong> Complete insulation resistance, continuity, and RCD testing. 
              Provide appropriate certification upon completion.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomesticInstallations;
