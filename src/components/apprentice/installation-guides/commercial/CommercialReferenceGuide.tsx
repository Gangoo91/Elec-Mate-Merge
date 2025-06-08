
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
  BookOpen,
  Lightbulb,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const CommercialReferenceGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const commercialCables = [
    { 
      cable: "1.5mm² FP200", 
      applications: ["Fire alarm systems", "Emergency lighting"], 
      maxCurrent: "16A", 
      protection: "6A MCB",
      notes: "Fire-rated cable, BS 6387 compliance required"
    },
    { 
      cable: "2.5mm² SWA", 
      applications: ["External supplies", "Underground feeds"], 
      maxCurrent: "25A", 
      protection: "20A MCB",
      notes: "Steel wire armoured for mechanical protection"
    },
    { 
      cable: "4mm² 3-core SWA", 
      applications: ["Three-phase motor supplies", "Distribution"], 
      maxCurrent: "32A", 
      protection: "25A MCB per phase",
      notes: "Balanced three-phase loads"
    },
    { 
      cable: "6mm² 5-core SWA", 
      applications: ["Three-phase with neutral", "Sub-mains"], 
      maxCurrent: "40A", 
      protection: "32A MCB per phase",
      notes: "Includes neutral and earth conductors"
    },
    { 
      cable: "10mm² MICC", 
      applications: ["High-temperature areas", "Kitchen equipment"], 
      maxCurrent: "55A", 
      protection: "40A MCB",
      notes: "Mineral insulated for extreme conditions"
    },
    { 
      cable: "16mm² 4-core SWA", 
      applications: ["Large motor feeds", "Distribution boards"], 
      maxCurrent: "70A", 
      protection: "50A MCB per phase",
      notes: "Heavy industrial applications"
    }
  ];

  const emergencyLighting = [
    { 
      type: "Maintained Emergency", 
      application: "Exit routes in occupied areas", 
      duration: "3 hours", 
      standard: "BS 5266-1",
      notes: "Illuminated during normal and emergency operation"
    },
    { 
      type: "Non-Maintained Emergency", 
      application: "Areas normally unoccupied", 
      duration: "3 hours", 
      standard: "BS 5266-1",
      notes: "Only illuminated during power failure"
    },
    { 
      type: "Sustained Emergency", 
      application: "Areas requiring continuous illumination", 
      duration: "3 hours", 
      standard: "BS 5266-1",
      notes: "Independent supply with automatic changeover"
    },
    { 
      type: "High Risk Task Area", 
      application: "Potentially dangerous work areas", 
      duration: "3 hours", 
      standard: "BS 5266-1",
      notes: "Minimum 15 lux maintained illumination"
    }
  ];

  const fireAlarmZones = [
    {
      zone: "Ground Floor Reception",
      devices: ["Smoke detectors", "Manual call points", "Sounders"],
      coverage: "Open plan office area",
      standard: "BS 5839-1"
    },
    {
      zone: "First Floor Offices",
      devices: ["Smoke detectors", "Heat detectors", "Sounders"],
      coverage: "Cellular office layout",
      standard: "BS 5839-1"
    },
    {
      zone: "Kitchen/Catering",
      devices: ["Heat detectors", "Manual call points", "Beacon sounders"],
      coverage: "Commercial kitchen area",
      standard: "BS 5839-1"
    },
    {
      zone: "Plant Room",
      devices: ["Heat detectors", "Manual call point"],
      coverage: "Electrical/mechanical plant",
      standard: "BS 5839-1"
    }
  ];

  const filteredCables = commercialCables.filter(cable => 
    cable.cable.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cable.applications.some(app => app.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search commercial cables, emergency systems, or standards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="cables" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cables" className="flex items-center gap-2">
            <Cable className="h-4 w-4" />
            Cables
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Emergency
          </TabsTrigger>
          <TabsTrigger value="fire-alarm" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Fire Alarm
          </TabsTrigger>
          <TabsTrigger value="standards" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Standards
          </TabsTrigger>
        </TabsList>

        {/* Commercial Cables Tab */}
        <TabsContent value="cables" className="space-y-4">
          <Card className="border-elec-yellow/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Cable className="h-6 w-6" />
                Commercial Cable Specifications
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

        {/* Emergency Lighting Tab */}
        <TabsContent value="emergency" className="space-y-4">
          <Card className="border-green-500/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Lightbulb className="h-6 w-6" />
                Emergency Lighting Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyLighting.map((light, index) => (
                <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                    <h4 className="font-medium text-white">{light.type}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                        {light.duration}
                      </Badge>
                      <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                        {light.standard}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <p className="text-muted-foreground">
                      <span className="text-green-300">Application:</span> {light.application}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-orange-300">Notes:</span> {light.notes}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fire Alarm Tab */}
        <TabsContent value="fire-alarm" className="space-y-4">
          <Card className="border-red-500/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                Fire Alarm Zone Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fireAlarmZones.map((zone, index) => (
                <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <h4 className="font-medium text-white mb-3">{zone.zone}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-red-300 font-medium">Devices:</span>
                      <ul className="mt-1 space-y-1">
                        {zone.devices.map((device, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {device}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">
                        <span className="text-blue-300">Coverage:</span> {zone.coverage}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="text-purple-300">Standard:</span> {zone.standard}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Standards Tab */}
        <TabsContent value="standards" className="space-y-4">
          <Card className="border-purple-500/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Commercial Standards & Regulations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { standard: "BS 7671:2018+A2:2022", description: "Requirements for Electrical Installations (18th Edition)" },
                { standard: "BS 5266-1:2016", description: "Emergency lighting - Code of practice for the emergency lighting of premises" },
                { standard: "BS 5839-1:2017", description: "Fire detection and fire alarm systems for buildings" },
                { standard: "BS 6387:2013", description: "Performance requirements for cables required to maintain circuit integrity under fire conditions" },
                { standard: "Building Regulations Part B", description: "Fire safety requirements for commercial premises" },
                { standard: "Workplace Regulations 1992", description: "Health, Safety and Welfare Regulations for workplaces" },
                { standard: "CDM Regulations 2015", description: "Construction (Design and Management) Regulations" },
                { standard: "HASAWA 1974", description: "Health and Safety at Work Act" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                  <BookOpen className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-purple-200">{item.standard}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
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

export default CommercialReferenceGuide;
