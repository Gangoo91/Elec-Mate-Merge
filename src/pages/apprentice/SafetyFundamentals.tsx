
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const SafetyFundamentals = () => {
  const [activeTab, setActiveTab] = useState("principles");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-elec-yellow" />
          Safety Fundamentals
        </h1>
        <Link to="/apprentice/study">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="principles">Safety Principles</TabsTrigger>
          <TabsTrigger value="hazards">Hazard Awareness</TabsTrigger>
          <TabsTrigger value="legislation">Legislation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="principles" className="space-y-6">
          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle>Core Safety Principles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Safety in electrical work is founded on key principles that every apprentice must understand and apply:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-medium">Hierarchy of Control</h4>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>Eliminate the hazard</li>
                    <li>Substitute with less hazardous alternative</li>
                    <li>Engineering controls</li>
                    <li>Administrative controls</li>
                    <li>Personal protective equipment</li>
                  </ol>
                </div>
                
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-medium">Safe Isolation Procedure</h4>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>Identify circuit to be worked on</li>
                    <li>Isolate and secure isolation</li>
                    <li>Prove voltage tester on known supply</li>
                    <li>Test for dead circuit</li>
                    <li>Re-prove voltage tester</li>
                  </ol>
                </div>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4 mt-4">
                <h4 className="font-medium mb-2">Risk Assessment Process</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <h5 className="text-sm font-medium text-elec-yellow">1. Identify Hazards</h5>
                    <p className="text-xs">
                      Look for potential sources of harm in the work environment
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-medium text-elec-yellow">2. Assess Risks</h5>
                    <p className="text-xs">
                      Evaluate likelihood and severity of potential harm
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-medium text-elec-yellow">3. Control Measures</h5>
                    <p className="text-xs">
                      Implement appropriate controls to eliminate or reduce risks
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle>Safety Culture and Behaviour</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                A strong safety culture is vital for preventing accidents and injuries in electrical work.
                This involves developing attitudes, beliefs, and behaviours that prioritise safety at all times.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Key Elements of a Safety Culture</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Personal responsibility for safety</li>
                    <li>Open communication about safety concerns</li>
                    <li>Learning from near misses and incidents</li>
                    <li>Questioning unsafe practices</li>
                    <li>Continuous improvement of safety measures</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Safe Behaviours for Apprentices</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Follow procedures and never cut corners</li>
                    <li>Ask questions when unsure</li>
                    <li>Report hazards and near misses</li>
                    <li>Properly use all safety equipment</li>
                    <li>Maintain good housekeeping practices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hazards" className="space-y-6">
          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle>Electrical Hazards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Understanding electrical hazards is fundamental to working safely as an electrical apprentice:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 border border-orange-500/30 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <h4 className="font-medium text-orange-500">Electric Shock</h4>
                  </div>
                  <p className="text-sm mb-2">
                    Electric current flowing through the human body can cause serious injury or death.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>1-5 mA</strong>: Slight tingling sensation</li>
                    <li><strong>5-30 mA</strong>: Painful shock, muscle control lost</li>
                    <li><strong>30-50 mA</strong>: Respiratory difficulty</li>
                    <li><strong>50-100 mA</strong>: Ventricular fibrillation</li>
                    <li><strong>>100 mA</strong>: Cardiac arrest, severe burns</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 border border-orange-500/30 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <h4 className="font-medium text-orange-500">Arc Flash and Blast</h4>
                  </div>
                  <p className="text-sm mb-2">
                    A dangerous release of energy from an electrical fault.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Temperatures up to 20,000°C</li>
                    <li>Intense ultraviolet and infrared radiation</li>
                    <li>Pressure wave up to 2,000 lbs/sq ft</li>
                    <li>Molten metal projectiles</li>
                    <li>Toxic gases and vapours</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-dark/50 border border-orange-500/30 rounded-md p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h4 className="font-medium text-orange-500">Other Electrical Hazards</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm font-medium">Electrical Fires</h5>
                    <p className="text-xs">
                      Caused by overloaded circuits, poor connections, damaged insulation, or faulty equipment
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Electrical Burns</h5>
                    <p className="text-xs">
                      Contact burns, flash burns, and high-frequency burns require different treatment approaches
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Secondary Hazards</h5>
                    <p className="text-xs">
                      Falls after shock, mechanical injuries, and psychological trauma following incidents
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle>Non-Electrical Hazards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Electrical apprentices face various non-electrical hazards that are equally important to recognise and control:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-3">
                  <h4 className="font-medium mb-1">Working at Height</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Ladders, scaffolds and platforms</li>
                    <li>Fall arrest systems</li>
                    <li>Working at Height Regulations 2005</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-3">
                  <h4 className="font-medium mb-1">Manual Handling</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Lifting technique and assessment</li>
                    <li>Mechanical aids</li>
                    <li>Manual Handling Operations Regulations 1992</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-3">
                  <h4 className="font-medium mb-1">Hazardous Substances</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Solvents, adhesives, and cleaning agents</li>
                    <li>COSHH assessments</li>
                    <li>Control of Substances Hazardous to Health 2002</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-3">
                  <h4 className="font-medium mb-1">Noise and Vibration</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Power tools and equipment</li>
                    <li>Exposure limits and protection</li>
                    <li>Control of Noise at Work Regulations 2005</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-3">
                  <h4 className="font-medium mb-1">Dust and Fumes</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Drilling, cutting, and soldering</li>
                    <li>Respiratory protective equipment</li>
                    <li>LEV (Local Exhaust Ventilation)</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-3">
                  <h4 className="font-medium mb-1">Confined Spaces</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Risk assessment and permits</li>
                    <li>Monitoring and emergency procedures</li>
                    <li>Confined Spaces Regulations 1997</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="legislation" className="space-y-6">
          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle>Key Safety Legislation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Understanding the UK legal framework for electrical safety is essential for all electrical apprentices:
              </p>
              
              <div className="space-y-4">
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                  <h4 className="font-medium mb-2">Health and Safety at Work etc. Act 1974</h4>
                  <p className="text-sm mb-2">
                    The primary piece of legislation covering occupational health and safety in the UK.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>General duties on employers to ensure safety of employees and others</li>
                    <li>Duties on employees to take reasonable care of themselves and others</li>
                    <li>Framework for all other health and safety regulations</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                  <h4 className="font-medium mb-2">Electricity at Work Regulations 1989</h4>
                  <p className="text-sm mb-2">
                    Specific regulations for electrical safety in the workplace.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Requirement for electrical systems to be constructed and maintained to prevent danger</li>
                    <li>Work activities to be carried out in a way that prevents danger</li>
                    <li>Persons working on electrical systems must have appropriate knowledge or supervision</li>
                    <li>Requirements for working on dead and live systems</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                  <h4 className="font-medium mb-2">Management of Health and Safety at Work Regulations 1999</h4>
                  <p className="text-sm mb-2">
                    Requirements for managing health and safety in the workplace.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Risk assessment requirements</li>
                    <li>Health and safety arrangements</li>
                    <li>Health surveillance and training</li>
                    <li>Temporary workers and young persons</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                  <h4 className="font-medium mb-2">Building Regulations Part P</h4>
                  <p className="text-sm mb-2">
                    Regulations specific to electrical installations in domestic properties.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Requirements for certain electrical work to be notified to building control</li>
                    <li>Certification of work by competent persons</li>
                    <li>Design and installation in accordance with BS 7671</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle>Standards and Guidance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                In addition to legislation, there are key standards and guidance documents that inform electrical safety practices:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 border border-blue-500/30 rounded-md p-4">
                  <h4 className="font-medium mb-2 text-blue-400">BS 7671 - IET Wiring Regulations</h4>
                  <p className="text-sm mb-2">
                    The national standard for electrical installations in the UK.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Current 18th Edition with amendments</li>
                    <li>Requirements for electrical installations</li>
                    <li>Not statutory but widely recognised as good practice</li>
                    <li>Compliance often needed to meet legal requirements</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 border border-blue-500/30 rounded-md p-4">
                  <h4 className="font-medium mb-2 text-blue-400">HSE Guidance</h4>
                  <p className="text-sm mb-2">
                    The Health and Safety Executive provides important guidance.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>HSG85 - Electricity at Work: Safe Working Practices</li>
                    <li>INDG231 - Electrical Safety and You</li>
                    <li>HSG230 - Keeping Electrical Switchgear Safe</li>
                    <li>GS38 - Electrical Test Equipment for Use By Electricians</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-3 p-3 rounded-md border border-green-500/20 bg-green-500/10">
                <Users className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-sm">
                  Membership of professional bodies like the IET (Institution of Engineering and Technology) or 
                  ECA (Electrical Contractors' Association) can help apprentices stay updated with the latest safety 
                  standards and regulations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle>Resources and Further Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Essential Publications</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>BS 7671:2018+A2:2022 IET Wiring Regulations</li>
                <li>IET Guidance Note 3: Inspection & Testing</li>
                <li>IET On-Site Guide</li>
                <li>HSE Memorandum of guidance on the Electricity at Work Regulations 1989</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Online Resources</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><a href="https://www.hse.gov.uk/electricity/" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">HSE Electrical Safety</a></li>
                <li><a href="https://electrical.theiet.org/" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">IET Technical Resources</a></li>
                <li><a href="https://www.electricalsafetyfirst.org.uk/" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">Electrical Safety First</a></li>
                <li><a href="https://www.niceic.com/contractor/technical-information" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">NICEIC Technical Information</a></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyFundamentals;
