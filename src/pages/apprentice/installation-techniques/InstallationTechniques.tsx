
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Hammer, Cable, Power, Wrench, Thermometer, Activity } from "lucide-react";

const InstallationTechniques = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Installation Techniques</h1>
          <p className="text-muted-foreground">
            Best practices for various electrical installations and procedures
          </p>
        </div>
        <Link to="/apprentice/toolbox">
          <Button variant="outline">Back to Toolbox</Button>
        </Link>
      </div>

      <Tabs defaultValue="cabling">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="cabling">Cabling</TabsTrigger>
          <TabsTrigger value="consumer-units">Consumer Units</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cabling" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Cable className="h-5 w-5 text-elec-yellow" />
                  Cable Installation Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-2">Planning Cable Routes</h3>
                  <p className="text-sm mb-3">
                    Proper planning of cable routes is essential for an efficient and compliant installation:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Plan routes that minimize cable length and bends</li>
                    <li>Maintain minimum separation from water pipes (150mm)</li>
                    <li>Run cables horizontally or vertically, not diagonally</li>
                    <li>Use zones in walls to reduce risk of future damage</li>
                    <li>Consider future access needs for maintenance</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-2">Cable Support & Protection</h3>
                  <p className="text-sm mb-3">
                    Ensure cables are properly supported and protected throughout their run:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Use appropriate fixings for the environment (e.g., nail clips, cable ties)</li>
                    <li>Support cables at regular intervals per regulations</li>
                    <li>Use grommets where cables pass through metal</li>
                    <li>Install protective conduit in areas at risk of damage</li>
                    <li>Ensure correct bend radius is maintained</li>
                  </ul>
                </div>
                
                <Button className="w-full">View Cabling Techniques Video</Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-elec-yellow" />
                  Cable Termination Techniques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-2">Stripping & Preparation</h3>
                  <p className="text-sm mb-3">
                    Proper cable preparation ensures reliable connections:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Strip outer sheath only as far as necessary</li>
                    <li>Maintain correct strip length for each termination type</li>
                    <li>Avoid nicking conductor strands when stripping</li>
                    <li>Twist stranded conductors tightly before termination</li>
                    <li>Use ferrules for stranded conductors when appropriate</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-2">Termination Methods</h3>
                  <p className="text-sm mb-3">
                    Different termination methods for various applications:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Screw terminals: Tighten to correct torque, avoid over-tightening</li>
                    <li>Wago connectors: Ensure proper insertion and locking</li>
                    <li>Crimped connections: Use correct crimp tool and die size</li>
                    <li>Terminal blocks: Maintain polarity and secure mounting</li>
                    <li>Lugs: Match size to conductor and apply correct crimp pressure</li>
                  </ul>
                </div>
                
                <Button className="w-full">View Termination Guides</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="consumer-units" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Power className="h-5 w-5 text-elec-yellow" />
                Consumer Unit Installation
              </CardTitle>
              <CardDescription>Best practices for consumer unit installation and wiring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-2">Positioning & Mounting</h3>
                  <p className="text-sm mb-3">
                    Correct positioning and mounting of consumer units is critical:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Mount at correct height for accessibility (usually 1.4-1.5m to center)</li>
                    <li>Ensure adequate space around unit for cable entry and maintenance</li>
                    <li>Use appropriate wall fixings for the wall construction and unit weight</li>
                    <li>Consider installation environment - avoid damp areas</li>
                    <li>Ensure compliance with IP rating requirements</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-2">Circuit Arrangement</h3>
                  <p className="text-sm mb-3">
                    Organizing circuits within a consumer unit:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Group similar circuits together (lights, sockets, etc.)</li>
                    <li>Distribute loads evenly across phases (in 3-phase installations)</li>
                    <li>Allow space for future expansion</li>
                    <li>Arrange RCDs to minimize disruption if one trips</li>
                    <li>Label all circuits clearly and accurately</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-elec-dark p-4 rounded-md">
                    <h3 className="font-medium text-elec-yellow mb-2">Main Switch Installation</h3>
                    <p className="text-sm mb-1">Key considerations:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Correct sizing for maximum demand</li>
                      <li>Secure termination of supply cables</li>
                      <li>Accessible for emergency use</li>
                      <li>Clearly labeled and identifiable</li>
                    </ul>
                  </div>
                  
                  <div className="bg-elec-dark p-4 rounded-md">
                    <h3 className="font-medium text-elec-yellow mb-2">RCD Protection</h3>
                    <p className="text-sm mb-1">Implementation guidelines:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Select appropriate RCD types for circuits</li>
                      <li>Split-load arrangements for essential circuits</li>
                      <li>30mA protection for required circuits</li>
                      <li>Consider selectivity between RCDs</li>
                    </ul>
                  </div>
                </div>
                
                <Button className="w-full">View Sample Consumer Unit Layouts</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="testing" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="h-5 w-5 text-elec-yellow" />
                Testing & Certification
              </CardTitle>
              <CardDescription>Procedures for testing electrical installations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-2">Visual Inspection</h3>
                  <p className="text-sm mb-3">
                    A thorough visual inspection is the first step in testing:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Verify correct selection of protective devices</li>
                    <li>Check correct connection of conductors</li>
                    <li>Confirm presence of fire barriers and seals</li>
                    <li>Verify correct identification of circuits and terminals</li>
                    <li>Check for signs of damage to equipment and conductors</li>
                    <li>Confirm adequate access for operation and maintenance</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-2">Dead Testing Sequence</h3>
                  <p className="text-sm mb-3">
                    Tests performed with the installation de-energized:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Continuity of protective conductors</li>
                    <li>Continuity of ring final circuit conductors</li>
                    <li>Insulation resistance</li>
                    <li>Polarity</li>
                    <li>Earth electrode resistance (if applicable)</li>
                    <li>Separation of circuits verification</li>
                  </ol>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-2">Live Testing Sequence</h3>
                  <p className="text-sm mb-3">
                    Tests performed with the installation energized:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Polarity verification</li>
                    <li>Earth fault loop impedance</li>
                    <li>RCD operation test</li>
                    <li>Phase sequence (for 3-phase installations)</li>
                    <li>Functional testing of assemblies</li>
                    <li>Voltage drop (where required)</li>
                  </ol>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-2">Test Equipment Essentials</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium mb-1">Required Equipment:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Multifunction tester</li>
                        <li>Insulation resistance tester</li>
                        <li>Low resistance ohmmeter</li>
                        <li>Proving unit for test verification</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Equipment Care:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Regular calibration</li>
                        <li>Visual inspection before use</li>
                        <li>Verify operation before testing</li>
                        <li>Proper storage in protective cases</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">Access Complete Testing Guide</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstallationTechniques;
