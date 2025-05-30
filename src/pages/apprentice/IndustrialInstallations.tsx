
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
  Wrench,
  HardHat
} from "lucide-react";

const IndustrialInstallations = () => {
  const commonTypes = [
    "Motor control systems",
    "High bay lighting",
    "Machinery installations",
    "Distribution board upgrades",
    "Emergency shutdown systems",
    "High voltage connections"
  ];

  const cableTypes = [
    { application: "Motor circuits", cable: "4-25mm² SWA", protection: "DOL/Star-Delta", notes: "Cable calc required" },
    { application: "High bay lighting", cable: "2.5mm² SWA", protection: "16A MCB", notes: "IP65 fittings" },
    { application: "Sub-main feeds", cable: "16-95mm² SWA", protection: "MCCB", notes: "Discrimination required" },
    { application: "Emergency stops", cable: "1.5mm² SY", protection: "24V DC supply", notes: "Category 3 safety" },
    { application: "Control circuits", cable: "1.5mm² SY", protection: "2A MCB", notes: "Screened cable" },
    { application: "External supplies", cable: "25mm²+ SWA", protection: "HRC fuses", notes: "Underground installation" }
  ];

  const keyStandards = [
    "BS 7671:2018+A2:2022 compliance",
    "BS EN 60204 Machinery safety standards",
    "Health and Safety at Work Act requirements",
    "DSEAR assessment for hazardous areas",
    "Annual electrical inspection recommended"
  ];

  const industrialHazards = [
    {
      title: "Moving Machinery",
      description: "Lockout/tagout procedures essential. Ensure all isolation procedures followed before work",
      icon: <Settings className="h-5 w-5 text-red-400" />
    },
    {
      title: "High Voltage Systems",
      description: "Specialist training required for HV work. Follow permit-to-work systems strictly",
      icon: <Zap className="h-5 w-5 text-red-400" />
    },
    {
      title: "Hazardous Substances",
      description: "DSEAR assessment required. Consider ATEX compliance for explosive atmospheres",
      icon: <Shield className="h-5 w-5 text-red-400" />
    },
    {
      title: "Heavy Equipment",
      description: "Proper lifting techniques and equipment required. Team lifting for large installations",
      icon: <Wrench className="h-5 w-5 text-red-400" />
    }
  ];

  const motorControlBasics = [
    {
      type: "Direct Online (DOL)",
      application: "Small motors up to 11kW",
      description: "Simple starting method with contactor and overload protection",
      components: ["Contactor", "Overload relay", "Emergency stop", "Start/stop buttons"]
    },
    {
      type: "Star-Delta Starting",
      application: "Large motors 15kW+",
      description: "Reduced starting current method for high-power motors",
      components: ["Main contactor", "Star contactor", "Delta contactor", "Timer relay", "Overload protection"]
    },
    {
      type: "Variable Frequency Drive (VFD)",
      application: "Speed control applications",
      description: "Electronic speed control with energy efficiency benefits",
      components: ["VFD unit", "Input/output reactors", "EMC filters", "Control interface"]
    }
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
          warehouses and heavy-duty electrical systems with enhanced safety protocols.
        </p>
        <BackButton customUrl="/apprentice/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      {/* Common Installation Types */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Common Industrial Installation Types</CardTitle>
          </div>
          <p className="text-muted-foreground">Typical industrial electrical systems and equipment</p>
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
            <CardTitle className="text-elec-yellow">Industrial Cable Types & Protection</CardTitle>
          </div>
          <p className="text-muted-foreground">Heavy-duty cable specifications for industrial environments</p>
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

      {/* Motor Control Systems */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Motor Control Systems</CardTitle>
          </div>
          <p className="text-muted-foreground">Common motor starting and control methods in industrial applications</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-6">
            {motorControlBasics.map((control, index) => (
              <div key={index} className="bg-elec-dark/40 p-5 rounded-lg border border-elec-yellow/20">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-lg mb-2">{control.type}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{control.description}</p>
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      {control.application}
                    </Badge>
                  </div>
                  <div className="lg:w-1/3">
                    <h5 className="font-medium text-elec-yellow mb-2">Key Components:</h5>
                    <ul className="space-y-1">
                      {control.components.map((component, compIndex) => (
                        <li key={compIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industrial Hazards */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Industrial Safety Hazards</CardTitle>
          </div>
          <p className="text-muted-foreground">Critical safety considerations for industrial environments</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industrialHazards.map((hazard, index) => (
              <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-red-500/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-red-500/20">
                    {hazard.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-red-300 mb-2">{hazard.title}</h4>
                    <p className="text-sm text-muted-foreground">{hazard.description}</p>
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
            <CardTitle className="text-elec-yellow text-lg">Planning & Design</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Industrial installations require detailed electrical design calculations including motor starting 
              currents, cable sizing for voltage drop, and discrimination studies. Coordinate with production 
              schedules and plan shutdowns carefully. Consider maintenance access and future expansion requirements.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Enhanced Safety Protocols</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Industrial environments present additional hazards including moving machinery, hazardous substances, 
              and high voltage systems. Implement permit to work systems and ensure all isolation procedures are 
              followed. Use appropriate PPE rated for the environment and voltage levels.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Documentation & Commissioning</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Industrial installations require comprehensive electrical design documentation, including single line 
              diagrams, control circuit drawings, and equipment schedules. Provide detailed commissioning procedures 
              and handover documentation including operation and maintenance manuals.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Important Safety Notice */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Critical Industrial Safety Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Machinery Safety (BS EN 60204):</strong> All machinery must comply 
              with machinery safety standards including emergency stop requirements and safety interlocks.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">DSEAR Compliance:</strong> Dangerous Substances and Explosive 
              Atmospheres Regulations may apply. Consider ATEX requirements for hazardous areas.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Competency Requirements:</strong> Industrial electrical work requires 
              advanced competency levels and may require additional authorisations for high voltage work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrialInstallations;
