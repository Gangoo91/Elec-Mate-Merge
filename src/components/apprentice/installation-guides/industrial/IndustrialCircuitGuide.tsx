
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  Settings, 
  Shield, 
  AlertTriangle,
  Factory,
  Wrench,
  Eye,
  CheckCircle
} from "lucide-react";

const IndustrialCircuitGuide = () => {
  const motorCircuits = [
    {
      application: "Small Motor (up to 5.5kW)",
      cable: "4mm² SWA",
      protection: "20A MCB + Overload 6-10A",
      starter: "DOL Starter",
      notes: "Direct online starting suitable"
    },
    {
      application: "Medium Motor (7.5-15kW)",
      cable: "6-10mm² SWA",
      protection: "32A MCB + Overload",
      starter: "Star-Delta or Soft Start",
      notes: "Reduced starting current required"
    },
    {
      application: "Large Motor (18.5-37kW)",
      cable: "16-25mm² SWA",
      protection: "63A MCB + Overload",
      starter: "Soft Start or VFD",
      notes: "Variable frequency drive preferred"
    },
    {
      application: "Heavy Duty (45kW+)",
      cable: "35mm²+ SWA",
      protection: "100A+ MCB + Overload",
      starter: "VFD with Bypass",
      notes: "Specialist motor control required"
    }
  ];

  const lightingCircuits = [
    {
      type: "High Bay LED (150W)",
      cable: "2.5mm² SWA",
      protection: "16A MCB",
      control: "Photocell + PIR",
      mounting: "6-12m height"
    },
    {
      type: "Emergency Lighting",
      cable: "1.5mm² FP200",
      protection: "6A MCB",
      control: "Central Battery System",
      mounting: "Escape route coverage"
    },
    {
      type: "Hazardous Area (ATEX)",
      cable: "SWA + Gland",
      protection: "10A MCB",
      control: "Ex-rated switches",
      mounting: "Zone classification dependent"
    },
    {
      type: "External Area Lighting",
      cable: "4mm² SWA",
      protection: "20A MCB + RCD",
      control: "Astronomical time switch",
      mounting: "8-15m columns"
    }
  ];

  const controlCircuits = [
    {
      voltage: "24V DC",
      application: "PLC Control Systems",
      cable: "Multi-core screened",
      protection: "Fused at 6A",
      notes: "Low voltage, high reliability"
    },
    {
      voltage: "110V AC",
      application: "Motor Control Circuits",
      cable: "1.5mm² Multi-core",
      protection: "Fused at 6A",
      notes: "Standard industrial control voltage"
    },
    {
      voltage: "230V AC",
      application: "Solenoid Valves",
      cable: "1.5mm² SWA",
      protection: "10A MCB",
      notes: "Higher power actuators"
    }
  ];

  const atexRequirements = [
    {
      zone: "Zone 0",
      description: "Explosive atmosphere present continuously",
      equipment: "Category 1 (Ex ia, Ex ma)",
      cable: "Intrinsically safe barriers required"
    },
    {
      zone: "Zone 1", 
      description: "Explosive atmosphere likely in normal operation",
      equipment: "Category 2 (Ex d, Ex e, Ex p)",
      cable: "ATEX certified cable glands"
    },
    {
      zone: "Zone 2",
      description: "Explosive atmosphere unlikely",
      equipment: "Category 3 (Ex nA, Ex nC)",
      cable: "Standard SWA with ATEX glands"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Factory className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Industrial Circuit Design Guide</CardTitle>
          </div>
          <p className="text-muted-foreground">Comprehensive specifications for industrial electrical systems</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="motors" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="motors">Motor Circuits</TabsTrigger>
          <TabsTrigger value="lighting">Industrial Lighting</TabsTrigger>
          <TabsTrigger value="control">Control Systems</TabsTrigger>
          <TabsTrigger value="atex">ATEX Zones</TabsTrigger>
        </TabsList>

        <TabsContent value="motors" className="space-y-4">
          <Card className="border-blue-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-blue-300">Motor Circuit Specifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {motorCircuits.map((circuit, index) => (
                <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-blue-300">{circuit.application}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                        {circuit.cable}
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                        {circuit.starter}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-blue-300 font-medium">Protection: </span>
                      <span className="text-muted-foreground">{circuit.protection}</span>
                    </div>
                    <div>
                      <span className="text-blue-300 font-medium">Notes: </span>
                      <span className="text-muted-foreground">{circuit.notes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Motor Starting Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <h4 className="font-medium text-orange-300 mb-2">Starting Current Limits</h4>
                <p className="text-sm text-muted-foreground">Motors above 7.5kW typically require reduced starting current methods to prevent supply disruption and mechanical stress.</p>
              </div>
              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <h4 className="font-medium text-orange-300 mb-2">Emergency Stop Integration</h4>
                <p className="text-sm text-muted-foreground">All motor circuits must be integrated with emergency stop systems and include appropriate isolation facilities.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lighting" className="space-y-4">
          <Card className="border-purple-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">Industrial Lighting Systems</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {lightingCircuits.map((light, index) => (
                <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-purple-300">{light.type}</h3>
                    <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                      {light.cable}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-purple-300 font-medium">Protection: </span>
                      <span className="text-muted-foreground">{light.protection}</span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">Control: </span>
                      <span className="text-muted-foreground">{light.control}</span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">Mounting: </span>
                      <span className="text-muted-foreground">{light.mounting}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control" className="space-y-4">
          <Card className="border-green-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-300">Control Circuit Systems</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {controlCircuits.map((control, index) => (
                <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-green-300">{control.voltage} - {control.application}</h3>
                    <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                      {control.cable}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-green-300 font-medium">Protection: </span>
                      <span className="text-muted-foreground">{control.protection}</span>
                    </div>
                    <div>
                      <span className="text-green-300 font-medium">Notes: </span>
                      <span className="text-muted-foreground">{control.notes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="atex" className="space-y-4">
          <Card className="border-red-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-300">ATEX Zone Classifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {atexRequirements.map((atex, index) => (
                <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-red-300">{atex.zone}</h3>
                    <Badge variant="outline" className="border-red-400 text-red-300 text-xs">
                      {atex.equipment.split(' ')[0]}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-red-300 font-medium">Description: </span>
                      <span className="text-muted-foreground">{atex.description}</span>
                    </div>
                    <div>
                      <span className="text-red-300 font-medium">Equipment: </span>
                      <span className="text-muted-foreground">{atex.equipment}</span>
                    </div>
                    <div>
                      <span className="text-red-300 font-medium">Cable Requirements: </span>
                      <span className="text-muted-foreground">{atex.cable}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                ATEX Installation Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <h4 className="font-medium text-orange-300 mb-2">Cable Gland Selection</h4>
                <p className="text-sm text-muted-foreground">All cable glands in hazardous areas must have appropriate ATEX certification and IP rating for the specific zone classification.</p>
              </div>
              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <h4 className="font-medium text-orange-300 mb-2">Equipment Temperature Rating</h4>
                <p className="text-sm text-muted-foreground">Equipment surface temperature must not exceed the auto-ignition temperature of the hazardous substance present.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndustrialCircuitGuide;
