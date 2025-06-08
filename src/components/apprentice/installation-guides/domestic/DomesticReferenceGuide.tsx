
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cable, 
  Shield, 
  FileText, 
  Search, 
  Wrench,
  TestTube,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const DomesticReferenceGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const cableSpecifications = [
    { 
      cable: "1.0mm² T&E", 
      applications: ["Lighting circuits", "Bells", "Alarms"], 
      maxCurrent: "13A", 
      protection: "6A MCB",
      notes: "Not recommended for socket circuits"
    },
    { 
      cable: "1.5mm² T&E", 
      applications: ["Lighting circuits", "Switched outlets"], 
      maxCurrent: "16A", 
      protection: "6A/10A MCB",
      notes: "Standard lighting cable"
    },
    { 
      cable: "2.5mm² T&E", 
      applications: ["Ring final", "Radial circuits", "Immersion heater"], 
      maxCurrent: "25A", 
      protection: "20A/32A RCBO",
      notes: "Most common socket cable"
    },
    { 
      cable: "4mm² T&E", 
      applications: ["Radial circuits", "Small cookers"], 
      maxCurrent: "32A", 
      protection: "25A/32A MCB",
      notes: "Heavy duty radial circuits"
    },
    { 
      cable: "6mm² T&E", 
      applications: ["Cooker circuits", "Large appliances"], 
      maxCurrent: "40A", 
      protection: "32A MCB",
      notes: "Standard cooker supply"
    },
    { 
      cable: "10mm² T&E", 
      applications: ["Electric showers", "High-power appliances"], 
      maxCurrent: "55A", 
      protection: "40A/45A RCBO",
      notes: "Up to 9kW loads"
    },
    { 
      cable: "16mm² T&E", 
      applications: ["Very high power loads", "Sub-mains"], 
      maxCurrent: "70A", 
      protection: "50A/63A MCB",
      notes: "Large installation feeds"
    }
  ];

  const protectionDevices = [
    { 
      device: "6A MCB Type B", 
      application: "Lighting circuits", 
      tripCurve: "3-5 × In", 
      notes: "Standard lighting protection"
    },
    { 
      device: "10A MCB Type B", 
      application: "Heavy lighting circuits", 
      tripCurve: "3-5 × In", 
      notes: "Multiple fluorescent fittings"
    },
    { 
      device: "16A MCB Type B", 
      application: "Immersion heaters", 
      tripCurve: "3-5 × In", 
      notes: "3kW loads maximum"
    },
    { 
      device: "20A MCB Type B", 
      application: "Radial socket circuits", 
      tripCurve: "3-5 × In", 
      notes: "Maximum 50m² floor area"
    },
    { 
      device: "32A MCB Type B", 
      application: "Ring final circuits, cookers", 
      tripCurve: "3-5 × In", 
      notes: "Most common socket protection"
    },
    { 
      device: "40A RCBO", 
      application: "Electric showers", 
      tripCurve: "3-5 × In + 30mA", 
      notes: "Combined overcurrent and RCD"
    }
  ];

  const testingProcedures = [
    {
      test: "Continuity of CPC",
      method: "R1 + R2 measurement",
      equipment: "Low resistance ohmmeter",
      standard: "BS 7671 Regulation 612.2.1",
      acceptableLimits: "As per BS 7671 tables"
    },
    {
      test: "Ring Final Continuity",
      method: "End-to-end and cross tests",
      equipment: "Low resistance ohmmeter",
      standard: "BS 7671 Regulation 612.2.2",
      acceptableLimits: "Consistent readings around ring"
    },
    {
      test: "Insulation Resistance",
      method: "500V DC between conductors",
      equipment: "Insulation resistance tester",
      standard: "BS 7671 Regulation 612.3",
      acceptableLimits: "≥1MΩ for circuits ≤500V"
    },
    {
      test: "Polarity",
      method: "Continuity testing",
      equipment: "Continuity tester",
      standard: "BS 7671 Regulation 612.6",
      acceptableLimits: "Correct polarity throughout"
    },
    {
      test: "Earth Fault Loop",
      method: "Zs measurement",
      equipment: "Earth loop impedance tester",
      standard: "BS 7671 Regulation 612.9",
      acceptableLimits: "≤ maximum Zs values"
    },
    {
      test: "RCD Operation",
      method: "Ramp and time testing",
      equipment: "RCD tester",
      standard: "BS 7671 Regulation 612.13",
      acceptableLimits: "Trip 0.5-1×IΔn, time ≤300ms"
    }
  ];

  const filteredCables = cableSpecifications.filter(cable => 
    cable.cable.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cable.applications.some(app => app.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredProtection = protectionDevices.filter(device => 
    device.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.application.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search cables, protection devices, or testing procedures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="cables" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cables" className="flex items-center gap-2">
            <Cable className="h-4 w-4" />
            Cables
          </TabsTrigger>
          <TabsTrigger value="protection" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Protection
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Testing
          </TabsTrigger>
        </TabsList>

        {/* Cables Tab */}
        <TabsContent value="cables" className="space-y-4">
          <Card className="border-elec-yellow/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Cable className="h-6 w-6" />
                Cable Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredCables.map((cable, index) => (
                <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-elec-yellow/20">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-base mb-2">{cable.cable}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-elec-yellow font-medium">Applications:</span>
                          <ul className="mt-1 space-y-1">
                            {cable.applications.map((app, idx) => (
                              <li key={idx} className="text-muted-foreground flex items-center gap-2">
                                <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                                {app}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">
                            <span className="text-green-300">Max Current:</span> {cable.maxCurrent}
                          </p>
                          <p className="text-muted-foreground mb-1">
                            <span className="text-blue-300">Protection:</span> {cable.protection}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="text-orange-300">Notes:</span> {cable.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Protection Tab */}
        <TabsContent value="protection" className="space-y-4">
          <Card className="border-blue-500/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Protection Devices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredProtection.map((device, index) => (
                <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                    <h4 className="font-medium text-white">{device.device}</h4>
                    <Badge variant="outline" className="border-blue-400 text-blue-300">
                      {device.application}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <p className="text-muted-foreground">
                      <span className="text-blue-300">Trip Curve:</span> {device.tripCurve}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-green-300">Notes:</span> {device.notes}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-4">
          <Card className="border-green-500/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <TestTube className="h-6 w-6" />
                Testing Procedures Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testingProcedures.map((test, index) => (
                <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-white mb-3">{test.test}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-2">
                        <span className="text-green-300">Method:</span> {test.method}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="text-blue-300">Equipment:</span> {test.equipment}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">
                        <span className="text-purple-300">Standard:</span> {test.standard}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="text-orange-300">Limits:</span> {test.acceptableLimits}
                      </p>
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

export default DomesticReferenceGuide;
