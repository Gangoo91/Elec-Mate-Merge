
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
  BadgePoundSterling,
  Users,
  Clock
} from "lucide-react";

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
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-elec-yellow">
            Commercial Installations
          </h1>
        </div>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6">
          Complete guide to commercial electrical installations including offices, retail premises, and small commercial buildings.
          Essential knowledge for commercial electrical work in the UK.
        </p>
        <BackButton customUrl="/apprentice/toolbox/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      {/* Common Installation Types */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Common Commercial Installation Types</CardTitle>
          </div>
          <p className="text-muted-foreground">Typical commercial electrical work you'll encounter</p>
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
          <p className="text-muted-foreground">Standard cable sizes and protection for commercial circuits</p>
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
          <p className="text-muted-foreground">Essential compliance requirements for commercial work</p>
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
              Commercial installations require careful load calculations and future expansion planning. 
              Consider three-phase distribution for balanced loads, emergency lighting requirements, 
              and fire alarm integration. Coordination with other building services is essential.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Safety & Compliance</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Ensure all work complies with workplace regulations and fire safety requirements. 
              Emergency lighting must meet BS 5266 standards. All circuits require appropriate 
              RCD protection and regular testing schedules must be established.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Testing & Certification</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Commercial installations require comprehensive testing including emergency lighting 
              function tests, fire alarm verification, and periodic inspection schedules. 
              Provide detailed test certificates and maintenance schedules to building owners.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Important Safety Notice */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Commercial Installation Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Emergency Systems:</strong> Emergency lighting and fire alarm systems 
              must be installed to current British Standards and tested regularly.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Three-Phase Supplies:</strong> Ensure proper phase rotation and 
              balanced loading. Use appropriate protection devices for motor circuits.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Maintenance Requirements:</strong> Establish regular testing schedules 
              and provide comprehensive documentation for building management.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommercialInstallations;
