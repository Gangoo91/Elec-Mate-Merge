
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Book, 
  AlertTriangle,
  Settings,
  Zap,
  FileCheck,
  HardHat,
  Wrench
} from "lucide-react";

const IndustrialReferenceGuide = () => {
  const standardsAndRegulations = [
    {
      category: "ATEX & Explosive Atmospheres",
      standards: [
        { code: "ATEX 2014/34/EU", title: "Equipment for explosive atmospheres", scope: "Equipment design and certification" },
        { code: "BS EN 60079-14", title: "Explosive atmospheres - Installation design", scope: "Installation requirements" },
        { code: "BS EN 60079-17", title: "Explosive atmospheres - Inspection and maintenance", scope: "Ongoing compliance" },
        { code: "DSEAR 2002", title: "Dangerous Substances and Explosive Atmospheres Regulations", scope: "Risk assessment and control" }
      ]
    },
    {
      category: "Machinery Safety",
      standards: [
        { code: "BS EN 60204-1", title: "Safety of machinery - Electrical equipment", scope: "Machine control systems" },
        { code: "PUWER 1998", title: "Provision and Use of Work Equipment Regulations", scope: "Equipment safety requirements" },
        { code: "BS EN ISO 13849-1", title: "Safety-related parts of control systems", scope: "Functional safety" },
        { code: "Machinery Directive 2006/42/EC", title: "Machinery safety requirements", scope: "CE marking compliance" }
      ]
    },
    {
      category: "Industrial Installations",
      standards: [
        { code: "BS 7671:2018+A3:2024", title: "Requirements for Electrical Installations", scope: "General electrical requirements" },
        { code: "BS 5266", title: "Emergency lighting", scope: "Industrial emergency systems" },
        { code: "BS 5839", title: "Fire detection and alarm systems", scope: "Industrial fire safety" },
        { code: "BS 6651", title: "Lightning protection systems", scope: "Industrial lightning protection" }
      ]
    }
  ];

  const emergencySystemRequirements = [
    {
      system: "Emergency Lighting",
      requirement: "Minimum 3 hours duration",
      standard: "BS 5266-1",
      installation: "Central battery or self-contained systems",
      testing: "Monthly function test, annual full duration test"
    },
    {
      system: "Emergency Stop Systems",
      requirement: "Category 0 or 1 stop function",
      standard: "BS EN 60204-1",
      installation: "Hardwired mushroom head buttons",
      testing: "Daily visual check, weekly function test"
    },
    {
      system: "Fire Alarm Integration",
      requirement: "Interface with electrical systems",
      standard: "BS 5839-1",
      installation: "Automatic supply disconnection",
      testing: "Quarterly interface test"
    },
    {
      system: "Gas Detection",
      requirement: "Automatic shutdown on detection",
      standard: "BS EN 60079-29-1",
      installation: "Hardwired to safety PLCs",
      testing: "Monthly calibration check"
    }
  ];

  const testingProcedures = [
    {
      test: "Insulation Resistance",
      voltage: "500V/1000V DC",
      minimumValue: "≥1MΩ (≥0.5MΩ for circuits ≤50V)",
      procedure: "Test between all conductors and earth",
      frequency: "Before energisation and annually"
    },
    {
      test: "Earth Fault Loop Impedance",
      method: "Loop impedance tester",
      maximumValue: "Per BS 7671 tables",
      procedure: "Test at furthest point of each circuit",
      frequency: "Initial verification and 5-yearly"
    },
    {
      test: "RCD Operation",
      testCurrent: "½×IΔn, 1×IΔn, 5×IΔn",
      tripTime: "≤300ms at 1×IΔn, ≤40ms at 5×IΔn",
      procedure: "Test all RCD devices",
      frequency: "Initial and 6-monthly"
    },
    {
      test: "Motor Insulation",
      voltage: "1000V DC for motors >1kV",
      minimumValue: "≥1MΩ + 1MΩ per kV rated voltage",
      procedure: "Test with motor disconnected",
      frequency: "Before commissioning and annually"
    }
  ];

  const protectionDevices = [
    {
      device: "Motor Circuit Breaker",
      rating: "0.1-32A adjustable",
      application: "Motor protection and isolation",
      standard: "BS EN 60947-4-1",
      features: "Magnetic trip, thermal overload"
    },
    {
      device: "Contactor",
      rating: "9A-800A AC3 duty",
      application: "Motor control switching",
      standard: "BS EN 60947-4-1", 
      features: "AC/DC coils, auxiliary contacts"
    },
    {
      device: "Soft Starter",
      rating: "7.5kW-800kW",
      application: "Reduced starting current",
      standard: "BS EN 60947-4-2",
      features: "Voltage ramp, current limit"
    },
    {
      device: "Variable Frequency Drive",
      rating: "0.75kW-1MW+",
      application: "Speed control and energy saving",
      standard: "BS EN 61800 series",
      features: "Regenerative braking, fieldbus"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Industrial Installation Reference</CardTitle>
          </div>
          <p className="text-muted-foreground">Comprehensive standards, testing procedures, and technical specifications</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="standards" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Systems</TabsTrigger>
          <TabsTrigger value="testing">Testing Procedures</TabsTrigger>
          <TabsTrigger value="protection">Protection Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="standards" className="space-y-4">
          {standardsAndRegulations.map((category, index) => (
            <Card key={index} className="border-blue-500/30 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <CardTitle className="text-blue-300">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.standards.map((standard, stdIndex) => (
                  <div key={stdIndex} className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-blue-300">{standard.code}</h4>
                      <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs w-fit">
                        {standard.scope}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{standard.title}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card className="border-red-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-300">Emergency System Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencySystemRequirements.map((system, index) => (
                <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-red-300">{system.system}</h3>
                    <Badge variant="outline" className="border-red-400 text-red-300 text-xs">
                      {system.standard}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-red-300 font-medium">Requirement: </span>
                      <span className="text-muted-foreground">{system.requirement}</span>
                    </div>
                    <div>
                      <span className="text-red-300 font-medium">Installation: </span>
                      <span className="text-muted-foreground">{system.installation}</span>
                    </div>
                    <div>
                      <span className="text-red-300 font-medium">Testing: </span>
                      <span className="text-muted-foreground">{system.testing}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card className="border-green-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-300">Industrial Testing Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {testingProcedures.map((test, index) => (
                <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <h3 className="font-semibold text-green-300 mb-3">{test.test}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-green-300 font-medium">Method: </span>
                      <span className="text-muted-foreground">{test.voltage || test.method || test.testCurrent}</span>
                    </div>
                    <div>
                      <span className="text-green-300 font-medium">Criteria: </span>
                      <span className="text-muted-foreground">{test.minimumValue || test.maximumValue || test.tripTime}</span>
                    </div>
                    <div>
                      <span className="text-green-300 font-medium">Procedure: </span>
                      <span className="text-muted-foreground">{test.procedure}</span>
                    </div>
                    <div>
                      <span className="text-green-300 font-medium">Frequency: </span>
                      <span className="text-muted-foreground">{test.frequency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protection" className="space-y-4">
          <Card className="border-purple-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">Industrial Protection Devices</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {protectionDevices.map((device, index) => (
                <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-purple-300">{device.device}</h3>
                    <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                      {device.standard}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-purple-300 font-medium">Rating: </span>
                      <span className="text-muted-foreground">{device.rating}</span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">Application: </span>
                      <span className="text-muted-foreground">{device.application}</span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">Features: </span>
                      <span className="text-muted-foreground">{device.features}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndustrialReferenceGuide;
