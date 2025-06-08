
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Factory,
  CheckCircle,
  Cable,
  Shield,
  Award,
  AlertTriangle,
  Zap,
  Settings,
  HardHat
} from "lucide-react";

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

  const safetyConsiderations = [
    "ATEX compliance for explosive atmospheres",
    "IP ratings for harsh environments",
    "Arc flash protection requirements",
    "Lock-out/Tag-out procedures",
    "Emergency stop systems",
    "Hazardous area classifications"
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Factory className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-elec-yellow">
            Industrial Installations
          </h1>
        </div>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6">
          Comprehensive guide to industrial electrical installations including manufacturing facilities, 
          heavy machinery connections, and hazardous area installations.
        </p>
        <BackButton customUrl="/apprentice/toolbox/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      {/* Common Installation Types */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Industrial Installation Types</CardTitle>
          </div>
          <p className="text-muted-foreground">Typical industrial electrical work you'll encounter</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonTypes.map((type, index) => (
              <div key={index} className="bg-elec-dark/40 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-white">
                  <Settings className="h-4 w-4 text-elec-yellow" />
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
            <CardTitle className="text-elec-yellow">Industrial Cable Types & Protection</CardTitle>
          </div>
          <p className="text-muted-foreground">Heavy-duty cables and protection systems for industrial applications</p>
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

      {/* Safety Considerations */}
      <Card className="border-red-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Critical Safety Considerations</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential safety requirements for industrial environments</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyConsiderations.map((consideration, index) => (
              <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2 text-red-300">
                  <AlertTriangle className="h-4 w-4" />
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
          <p className="text-muted-foreground">Essential compliance requirements for industrial installations</p>
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
            <CardTitle className="text-elec-yellow text-lg">Motor Control Systems</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Industrial motor installations require proper overload protection, correct starter selection, 
              and emergency stop integration. Consider soft-start requirements for large motors and 
              ensure proper earthing for motor frames.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Hazardous Areas</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              ATEX compliance is mandatory for explosive atmospheres. Use certified equipment with 
              appropriate IP ratings. Understand zone classifications and implement proper cable 
              sealing and earthing techniques.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Maintenance Access</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Design installations with maintenance in mind. Provide adequate access to control panels, 
              junction boxes, and testing points. Implement lock-out/tag-out procedures and ensure 
              proper labelling of all circuits and equipment.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Important Safety Notice */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Industrial Safety Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-red-300">High Voltage Awareness:</strong> Industrial installations often involve 
              high voltage systems. Ensure proper training and competency before working on such systems.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-red-300">Arc Flash Protection:</strong> Implement appropriate arc flash protection 
              measures and ensure workers are trained in arc flash hazards and PPE requirements.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-red-300">Emergency Procedures:</strong> Establish clear emergency shutdown procedures 
              and ensure all personnel are familiar with emergency stop locations and isolation procedures.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrialInstallations;
