
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plug,
  CheckCircle,
  Cable,
  Shield,
  Award,
  AlertTriangle,
  Zap,
  Sun,
  Car,
  Waves
} from "lucide-react";

const SpecialistInstallations = () => {
  const commonTypes = [
    "Solar PV systems",
    "Electric vehicle charging points",
    "Swimming pool installations", 
    "Bathroom electrical work",
    "Agricultural installations",
    "Temporary electrical supplies"
  ];

  const cableTypes = [
    { application: "Solar PV DC", cable: "4mm² DC cable", protection: "DC isolators", notes: "UV resistant" },
    { application: "EV charging", cable: "6mm² T&E", protection: "32A RCBO", notes: "Type A RCD required" },
    { application: "Pool equipment", cable: "2.5mm² SWA", protection: "16A RCBO", notes: "Zone classification" },
    { application: "Bathroom circuits", cable: "2.5mm² T&E", protection: "20A RCBO", notes: "IP rating crucial" },
    { application: "Agricultural", cable: "4mm² SWA", protection: "20A RCBO", notes: "SELV recommended" },
    { application: "Temporary supply", cable: "2.5mm² flexible", protection: "RCD protection", notes: "110V preferred" }
  ];

  const keyStandards = [
    "BS 7671 Section 7 Special Installations",
    "MCS standards for renewable energy",
    "IET Code of Practice for EV charging",
    "Swimming pool zones BS 7671:701",
    "G59/G98 grid connection requirements"
  ];

  const specialLocations = [
    {
      type: "Solar PV Systems (Section 712)",
      description: "Photovoltaic power supply systems with DC and AC considerations",
      icon: <Sun className="h-6 w-6 text-yellow-400" />,
      keyPoints: [
        "DC isolation required at array and inverter",
        "AC isolation at grid connection point",
        "Fire safety - roof access considerations",
        "MCS certification required for FIT/SEG",
        "G98/G99 grid connection approval needed"
      ],
      zonalRequirements: "No specific zones but consider DC arc fault protection"
    },
    {
      type: "EV Charging (Section 722)",
      description: "Electric vehicle charging installations for domestic and commercial use",
      icon: <Car className="h-6 w-6 text-blue-400" />,
      keyPoints: [
        "Type A RCD protection required (6mA DC)",
        "O-PEN device protection recommended",
        "Load management for multiple units",
        "Earthing arrangements critical",
        "Smart charging capabilities"
      ],
      zonalRequirements: "Consider IP ratings for outdoor installations (IP54 minimum)"
    },
    {
      type: "Swimming Pools (Section 701)",
      description: "Electrical installations in and around swimming pools with strict zonal requirements",
      icon: <Waves className="h-6 w-6 text-cyan-400" />,
      keyPoints: [
        "Zone classification 0, 1, 2 around pool",
        "SELV systems preferred in zones 0 and 1",
        "30mA RCD protection for all circuits",
        "Supplementary bonding required",
        "IP rating requirements vary by zone"
      ],
      zonalRequirements: "Zone 0: IPX8, Zone 1: IPX5, Zone 2: IPX4 minimum"
    }
  ];

  const gridConnectionRequirements = [
    {
      standard: "G98 (≤16A per phase)",
      description: "Simplified connection process for small generators",
      requirements: [
        "Notification to DNO required",
        "Loss of mains protection built into inverter",
        "No additional protection required",
        "Applies to most domestic solar PV"
      ]
    },
    {
      standard: "G99 (>16A per phase)",
      description: "Engineering recommendation for larger installations",
      requirements: [
        "Application to DNO required",
        "Additional protection may be needed",
        "Witness testing may be required",
        "Commercial installations typically"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Plug className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-elec-yellow">
            Specialist Installations
          </h1>
        </div>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6">
          Comprehensive guide to specialist electrical installations including solar PV, EV charging, 
          swimming pools and special location installations with enhanced safety requirements.
        </p>
        <BackButton customUrl="/apprentice/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      {/* Common Installation Types */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Specialist Installation Types</CardTitle>
          </div>
          <p className="text-muted-foreground">Advanced electrical installations requiring specialist knowledge</p>
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
            <CardTitle className="text-elec-yellow">Specialist Cable Types & Protection</CardTitle>
          </div>
          <p className="text-muted-foreground">Cable specifications for specialist installations</p>
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

      {/* Special Locations Details */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Special Locations (BS 7671 Section 7)</CardTitle>
          </div>
          <p className="text-muted-foreground">Detailed requirements for special installation types</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-6">
            {specialLocations.map((location, index) => (
              <div key={index} className="bg-elec-dark/40 p-5 rounded-lg border border-elec-yellow/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-md bg-elec-yellow/10">
                    {location.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-lg mb-2">{location.type}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{location.description}</p>
                    <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                      {location.zonalRequirements}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-elec-yellow mb-3">Key Requirements:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {location.keyPoints.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grid Connection Requirements */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plug className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Grid Connection Requirements</CardTitle>
          </div>
          <p className="text-muted-foreground">DNO requirements for renewable energy connections</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {gridConnectionRequirements.map((req, index) => (
              <div key={index} className="bg-elec-dark/40 p-5 rounded-lg border border-elec-yellow/20">
                <h4 className="font-medium text-white text-lg mb-2">{req.standard}</h4>
                <p className="text-sm text-muted-foreground mb-4">{req.description}</p>
                <div className="space-y-2">
                  {req.requirements.map((requirement, reqIndex) => (
                    <div key={reqIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{requirement}</span>
                    </div>
                  ))}
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
            <Award className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Key Standards & Regulations</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential compliance requirements for specialist installations</p>
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
            <CardTitle className="text-elec-yellow text-lg">Planning & Approvals</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Specialist installations often require additional approvals and notifications. Check with local 
              building control and DNO requirements for grid connections. Plan cable routes considering special 
              environmental conditions and access for maintenance. Consider ongoing monitoring requirements.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Enhanced Safety Measures</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Special locations require enhanced safety measures including additional RCD protection, bonding 
              requirements, and IP rating considerations. Ensure all personnel are trained for the specific 
              installation type and environmental hazards present.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Certification & Warranties</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Specialist installations may require additional certification such as MCS for solar PV or specific 
              commissioning procedures for EV charging points. Ensure all relevant standards are followed and 
              appropriate warranties provided to the customer.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Important Safety Notice */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Specialist Installation Safety</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Competency Requirements:</strong> Specialist installations require 
              additional training and certification. Ensure you have appropriate qualifications before undertaking 
              specialist work.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Type A RCD Protection:</strong> Many specialist installations require 
              Type A RCDs due to DC leakage currents or electronic equipment.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Environmental Considerations:</strong> Consider IP ratings, UV 
              resistance, and environmental conditions specific to each installation type.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecialistInstallations;
