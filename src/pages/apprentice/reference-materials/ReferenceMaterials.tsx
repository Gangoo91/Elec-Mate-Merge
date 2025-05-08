
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Book, Bookmark, File, FileText, Library, ScrollText } from "lucide-react";

const ReferenceMaterials = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reference Materials</h1>
          <p className="text-muted-foreground">
            Essential codes, standards, and technical terminology for electrical work
          </p>
        </div>
        <Link to="/apprentice/toolbox">
          <Button variant="outline">Back to Toolbox</Button>
        </Link>
      </div>

      <Tabs defaultValue="codes">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="codes">Codes & Standards</TabsTrigger>
          <TabsTrigger value="terminology">Terminology</TabsTrigger>
          <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="codes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Book className="h-5 w-5 text-elec-yellow" />
                  BS 7671:2018+A2:2022
                </CardTitle>
                <CardDescription>18th Edition IET Wiring Regulations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Requirements for Electrical Installations. This is the national standard for all electrical installations in the UK.</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                  <li>Updated to Amendment 2 (March 2022)</li>
                  <li>Includes energy efficiency updates</li>
                  <li>Expanded requirements for AFDDs</li>
                </ul>
                <Button className="w-full">View Summary Guide</Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Library className="h-5 w-5 text-elec-yellow" />
                  Building Regulations
                </CardTitle>
                <CardDescription>Part P and Related Requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Part P (Electrical Safety) of the Building Regulations applies to domestic premises and covers safety of electrical installations.</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                  <li>Requirements for self-certification</li>
                  <li>Notifiable and non-notifiable work</li>
                  <li>Approved Document P guidelines</li>
                </ul>
                <Button className="w-full">Access Guide</Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <ScrollText className="h-5 w-5 text-elec-yellow" />
                  IET Guidance Notes
                </CardTitle>
                <CardDescription>Supporting Technical Publications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Guidance Notes provide additional information on specific aspects of electrical installation work.</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                  <li>GN1: Selection & Erection</li>
                  <li>GN3: Inspection & Testing</li>
                  <li>GN5: Protection Against Electric Shock</li>
                </ul>
                <Button className="w-full">Browse Guidance Notes</Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  Health & Safety
                </CardTitle>
                <CardDescription>Electricity at Work Regulations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">The Electricity at Work Regulations 1989 place duties on employers to ensure electrical safety in the workplace.</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                  <li>Legal requirements for all work activities</li>
                  <li>Competence requirements</li>
                  <li>Maintenance and testing requirements</li>
                </ul>
                <Button className="w-full">View HSE Guidelines</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="terminology" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl">Electrical Terminology Reference</CardTitle>
              <CardDescription>Common technical terms used in electrical work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-elec-yellow mb-2">Circuit Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <p className="font-medium">MCB (Miniature Circuit Breaker)</p>
                      <p className="text-sm text-muted-foreground">An automatically operated electrical switch designed to protect electrical circuits from damage caused by overcurrent or short circuit.</p>
                    </div>
                    <div>
                      <p className="font-medium">RCD (Residual Current Device)</p>
                      <p className="text-sm text-muted-foreground">A safety device that quickly breaks an electrical circuit to prevent serious harm from an ongoing electric shock.</p>
                    </div>
                    <div>
                      <p className="font-medium">RCBO (Residual Current Breaker with Overcurrent)</p>
                      <p className="text-sm text-muted-foreground">Combines the functions of an RCD and MCB in one unit, providing both overcurrent and earth leakage protection.</p>
                    </div>
                    <div>
                      <p className="font-medium">AFDD (Arc Fault Detection Device)</p>
                      <p className="text-sm text-muted-foreground">Detects and interrupts electrical arcs that can cause fires in damaged or deteriorating wiring systems.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-elec-yellow mb-2">Cable & Wiring Terms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <p className="font-medium">PVC (Polyvinyl Chloride)</p>
                      <p className="text-sm text-muted-foreground">A common insulating material used for cable sheaths and conduit.</p>
                    </div>
                    <div>
                      <p className="font-medium">LSZH (Low Smoke Zero Halogen)</p>
                      <p className="text-sm text-muted-foreground">Cable insulation that produces minimal smoke and no halogen when exposed to fire.</p>
                    </div>
                    <div>
                      <p className="font-medium">Armoured Cable</p>
                      <p className="text-sm text-muted-foreground">Cable with additional mechanical protection, typically Steel Wire Armour (SWA) or aluminium.</p>
                    </div>
                    <div>
                      <p className="font-medium">CSA (Cross-Sectional Area)</p>
                      <p className="text-sm text-muted-foreground">The area of the conductor in a cable, measured in square millimeters (mm²).</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">View Full Terminology Guide</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diagrams" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl">Electrical Diagrams & Symbols</CardTitle>
              <CardDescription>Standard electrical diagrams and symbol references</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">Understanding electrical diagrams and symbols is essential for interpreting plans and creating accurate documentation.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border-elec-yellow/10 bg-elec-dark">
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">Circuit Diagrams</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="text-xs text-muted-foreground mb-2">Shows the connections and components in an electrical circuit using standardized symbols.</p>
                      <Button variant="outline" size="sm" className="w-full">View Examples</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-elec-yellow/10 bg-elec-dark">
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">Wiring Diagrams</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="text-xs text-muted-foreground mb-2">Shows the actual wire routes and physical arrangement of components in an installation.</p>
                      <Button variant="outline" size="sm" className="w-full">View Examples</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-elec-yellow/10 bg-elec-dark">
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">Distribution Boards</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="text-xs text-muted-foreground mb-2">Layout and connection diagrams for consumer units and distribution boards.</p>
                      <Button variant="outline" size="sm" className="w-full">View Examples</Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Button className="w-full">Access Symbol Library</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferenceMaterials;
