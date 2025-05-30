
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building,
  CheckCircle,
  Cable,
  Shield,
  Award,
  AlertTriangle,
  Zap,
  Clock,
  Users,
  FileText
} from "lucide-react";

const CommercialInstallations = () => {
  const commonTypes = [
    "Office lighting and power",
    "Shop fitting electrical work",
    "Restaurant kitchen installations",
    "Emergency lighting systems", 
    "Fire alarm installations",
    "Three-phase supplies"
  ];

  const cableTypes = [
    { application: "General lighting", cable: "1.5mm² T&E", protection: "10A MCB", notes: "Emergency lighting required" },
    { application: "Socket outlets", cable: "2.5mm² T&E", protection: "20A RCBO", notes: "RCD protection essential" },
    { application: "Three-phase supply", cable: "4mm² 3-core SWA", protection: "20A 3-pole MCB", notes: "Balanced loading required" },
    { application: "Emergency lighting", cable: "1.5mm² FP200", protection: "6A MCB", notes: "Fire rated cable" },
    { application: "Fire alarm system", cable: "1.5mm² FP200", protection: "6A MCB", notes: "BS 5839 compliance" },
    { application: "Kitchen equipment", cable: "6mm² T&E", protection: "32A MCB", notes: "IP65 protection required" }
  ];

  const keyStandards = [
    "BS 7671:2018+A2:2022 compliance",
    "BS 5266 Emergency lighting standards", 
    "BS 5839 Fire detection and alarm systems",
    "Electrical Installation Certificate required",
    "Periodic inspection every 5 years recommended"
  ];

  const specialConsiderations = [
    {
      title: "Load Balancing",
      description: "Three-phase installations require careful load balancing to prevent neutral current and voltage imbalance",
      icon: <Zap className="h-5 w-5 text-elec-yellow" />
    },
    {
      title: "Business Continuity",
      description: "Plan installations to minimize business disruption. Consider phased installation approaches",
      icon: <Clock className="h-5 w-5 text-elec-yellow" />
    },
    {
      title: "Fire Safety Systems",
      description: "Emergency lighting and fire alarm systems must maintain integrity during fire conditions",
      icon: <Shield className="h-5 w-5 text-elec-yellow" />
    },
    {
      title: "Public Safety",
      description: "Additional safety measures required due to public access and higher occupancy levels",
      icon: <Users className="h-5 w-5 text-elec-yellow" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-elec-yellow">
            Commercial Installations
          </h1>
        </div>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6">
          Comprehensive guide to commercial electrical installations including offices, shops, restaurants 
          and small commercial premises with enhanced safety requirements.
        </p>
        <BackButton customUrl="/apprentice/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      {/* Common Installation Types */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Common Commercial Installation Types</CardTitle>
          </div>
          <p className="text-muted-foreground">Typical commercial electrical work and systems</p>
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
          <p className="text-muted-foreground">Commercial cable specifications and protection requirements</p>
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

      {/* Special Considerations */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Commercial Installation Considerations</CardTitle>
          </div>
          <p className="text-muted-foreground">Key factors specific to commercial environments</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialConsiderations.map((consideration, index) => (
              <div key={index} className="bg-elec-dark/40 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-elec-yellow/10">
                    {consideration.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">{consideration.title}</h4>
                    <p className="text-sm text-muted-foreground">{consideration.description}</p>
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
          <p className="text-muted-foreground">Essential compliance requirements for commercial installations</p>
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
            <CardTitle className="text-elec-yellow text-lg">Planning & Coordination</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Commercial installations require careful coordination with other trades. Plan cable routes to 
              avoid interference with HVAC and data systems. Consider business hours for installation timing 
              and plan phases to minimise disruption. Ensure adequate cable containment and segregation.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Enhanced Safety Procedures</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Additional safety considerations for commercial premises include maintaining fire escape routes 
              during installation. Coordinate with building management for safe isolation procedures. Ensure 
              all work areas are properly signed and barriers in place to protect public access.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Documentation & Handover</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Commercial installations require comprehensive documentation including electrical schematic 
              drawings, equipment schedules, and operation and maintenance manuals. Provide training to 
              building maintenance staff on new systems installed.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Systems Requirements */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Emergency Systems Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Emergency Lighting (BS 5266)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Minimum 3-hour battery backup required
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Monthly function tests and annual duration tests
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Fire-rated cables (FP200) for maintained systems
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Fire Alarm Systems (BS 5839)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Fire-rated cables throughout system
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Dedicated circuit protection required
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Annual maintenance and certification
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Safety Notice */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Commercial Installation Safety</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Enhanced RCD Protection:</strong> Commercial installations typically 
              require Type A RCDs due to frequency inverters and electronic equipment.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Periodic Inspection:</strong> Commercial installations should be 
              inspected every 5 years or as determined by risk assessment.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Public Safety:</strong> Additional safety measures and signage 
              required due to public access and higher occupancy levels.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommercialInstallations;
