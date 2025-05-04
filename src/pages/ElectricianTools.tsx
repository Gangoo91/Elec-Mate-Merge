
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, LayoutGrid, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ElectricianTools = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Electrician Tools</h1>
        <p className="text-muted-foreground">
          Professional resources to enhance your efficiency in the field.
        </p>
      </div>

      <Tabs defaultValue="calculators" className="space-y-4">
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="calculators">Calculators</TabsTrigger>
          <TabsTrigger value="documents">Document Templates</TabsTrigger>
          <TabsTrigger value="projects">Project Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculators" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Voltage Drop Calculator */}
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  <CardTitle>Voltage Drop Calculator</CardTitle>
                </div>
                <CardDescription>
                  Calculate voltage drop in electrical cables based on load and distance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cable-length">Cable Length (m)</Label>
                  <Input 
                    id="cable-length" 
                    type="number" 
                    placeholder="Enter cable length" 
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cable-size">Cable Size</Label>
                  <Select>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Select cable size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.5">1.5 mm²</SelectItem>
                      <SelectItem value="2.5">2.5 mm²</SelectItem>
                      <SelectItem value="4">4.0 mm²</SelectItem>
                      <SelectItem value="6">6.0 mm²</SelectItem>
                      <SelectItem value="10">10.0 mm²</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="load-current">Load Current (A)</Label>
                  <Input 
                    id="load-current" 
                    type="number" 
                    placeholder="Enter load current" 
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
                <Button className="w-full">Calculate Voltage Drop</Button>
                <div className="rounded-md bg-elec-dark p-4 text-center">
                  <div className="text-sm text-muted-foreground">Voltage Drop:</div>
                  <div className="text-2xl font-bold text-elec-yellow">-- V</div>
                </div>
              </CardContent>
            </Card>
            
            {/* Load Calculator */}
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  <CardTitle>Load Calculator</CardTitle>
                </div>
                <CardDescription>
                  Calculate the total load on a circuit based on connected appliances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="voltage">Supply Voltage (V)</Label>
                    <Input 
                      id="voltage" 
                      type="number" 
                      defaultValue="230" 
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Appliances</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Name" 
                          className="bg-elec-dark border-elec-yellow/20"
                        />
                        <Input 
                          type="number" 
                          placeholder="Watts" 
                          className="bg-elec-dark border-elec-yellow/20"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Name" 
                          className="bg-elec-dark border-elec-yellow/20"
                        />
                        <Input 
                          type="number" 
                          placeholder="Watts" 
                          className="bg-elec-dark border-elec-yellow/20"
                        />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      + Add Appliance
                    </Button>
                  </div>
                  <Button className="w-full">Calculate Total Load</Button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md bg-elec-dark p-3 text-center">
                      <div className="text-xs text-muted-foreground">Total Power:</div>
                      <div className="text-xl font-bold text-elec-yellow">-- W</div>
                    </div>
                    <div className="rounded-md bg-elec-dark p-3 text-center">
                      <div className="text-xs text-muted-foreground">Total Current:</div>
                      <div className="text-xl font-bold text-elec-yellow">-- A</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Cable Size Calculator - Added specifically for subsection 2.1 reference */}
          <Card className="border-elec-yellow/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-elec-yellow" />
                <CardTitle>Cable Size Calculator</CardTitle>
              </div>
              <CardDescription>
                Determine the correct cable size based on load, distance and installation method.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="design-current">Design Current (A)</Label>
                  <Input 
                    id="design-current" 
                    type="number" 
                    placeholder="Enter design current" 
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="installation-method">Installation Method</Label>
                  <Select>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="method-a">Method A (Enclosed in conduit)</SelectItem>
                      <SelectItem value="method-b">Method B (Enclosed in trunking)</SelectItem>
                      <SelectItem value="method-c">Method C (Clipped direct)</SelectItem>
                      <SelectItem value="method-d">Method D (Direct burial)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ambient-temp">Ambient Temperature (°C)</Label>
                  <Input 
                    id="ambient-temp" 
                    type="number" 
                    defaultValue="30" 
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cable-length">Route Length (m)</Label>
                  <Input 
                    id="cable-length" 
                    type="number" 
                    placeholder="Enter length" 
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grouping-factor">Grouping Factor</Label>
                  <Select>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Select factor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 circuit (1.0)</SelectItem>
                      <SelectItem value="0.8">2 circuits (0.8)</SelectItem>
                      <SelectItem value="0.7">3 circuits (0.7)</SelectItem>
                      <SelectItem value="0.65">4+ circuits (0.65)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">Calculate Required Cable Size</Button>
              <div className="rounded-md bg-elec-dark p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Minimum Cable Size:</div>
                    <div className="text-xl font-bold text-elec-yellow">-- mm²</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Voltage Drop:</div>
                    <div className="text-xl font-bold text-elec-yellow">-- V (--% of 230V)</div>
                  </div>
                </div>
                <div className="text-xs text-center mt-3 text-muted-foreground">
                  Based on BS 7671:2018 Amendment 2:2022 Tables
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Calculators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Power Factor", "Conduit Fill", "Ohm's Law", "Transformer Sizing"].map((calc, i) => (
              <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Calculator className="h-6 w-6 text-elec-yellow mb-2" />
                  <h3 className="font-medium text-sm">{calc}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Calculator</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {["Invoice Template", "Job Estimate", "Client Contract", "Electrical Test Report", "EICR Template", "Material List"].map((doc, i) => (
              <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <CardTitle className="text-base">{doc}</CardTitle>
                      <CardDescription>
                        {["PDF", "Word", "PDF", "Excel", "PDF", "Excel"][i]} • Editable
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Last updated: May 2023
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Custom Template Builder</CardTitle>
              <CardDescription>
                Create and customize your own document templates with your branding.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Launch Template Builder</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Management</CardTitle>
                  <CardDescription>
                    Organize and track your electrical projects efficiently.
                  </CardDescription>
                </div>
                <Button>+ New Project</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-elec-yellow/20 overflow-hidden">
                <div className="bg-elec-dark p-4 text-center">
                  <p className="text-muted-foreground">
                    No active projects found. Create a new project to get started.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5 text-elec-yellow" />
                  <CardTitle className="text-base">Project Dashboard</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a visual overview of all your project statuses and timelines.
                </p>
                <Button variant="outline" className="w-full">View Dashboard</Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-elec-yellow" />
                  <CardTitle className="text-base">Material Tracker</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Track materials used across different projects and estimate needs.
                </p>
                <Button variant="outline" className="w-full">Open Tracker</Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  <CardTitle className="text-base">Project Calculator</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Calculate project costs, timelines, and resource requirements.
                </p>
                <Button variant="outline" className="w-full">Use Calculator</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Tool */}
      <Card className="border-elec-yellow bg-elec-gray">
        <CardHeader>
          <CardTitle>Featured Tool: Multi-Circuit Designer</CardTitle>
          <CardDescription>
            Design and validate multi-circuit installations with our interactive tool.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-elec-dark rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center p-6">
              <Wrench className="h-12 w-12 text-elec-yellow mx-auto mb-4 opacity-70" />
              <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upgrade your subscription to access the Multi-Circuit Designer tool.
              </p>
              <Button>Upgrade to Access</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricianTools;
