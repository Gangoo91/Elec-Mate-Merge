
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Settings, ClipboardCheck, Lightbulb, Ruler, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OnJobAssessment = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Site Assessment Tools</h1>
        <Link to="/apprentice" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apprentice Hub
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="checklists" className="space-y-6">
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="checklists">
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Site Checklists
          </TabsTrigger>
          <TabsTrigger value="guides">
            <Lightbulb className="mr-2 h-4 w-4" />
            Assessment Guides
          </TabsTrigger>
          <TabsTrigger value="protocols">
            <Shield className="mr-2 h-4 w-4" />
            Safety Protocols
          </TabsTrigger>
        </TabsList>

        <TabsContent value="checklists" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChecklistCard 
              title="Initial Site Survey" 
              description="Assessment checklist for new job sites"
              icon={Ruler}
              items={[
                "Site access and parking",
                "Working space requirements",
                "Existing electrical installations",
                "Client requirements verification",
                "Potential hazards identification",
                "Material storage possibilities"
              ]}
            />
            <ChecklistCard 
              title="Domestic Installation" 
              description="Checklist for residential electrical work"
              icon={ClipboardCheck}
              items={[
                "Consumer unit location",
                "Circuit requirements",
                "Earthing arrangements",
                "RCD protection needs",
                "Cable routes assessment",
                "Lighting and power requirements"
              ]}
            />
            <ChecklistCard 
              title="Commercial Premises" 
              description="Checklist for commercial electrical assessments"
              icon={Settings}
              items={[
                "Distribution board locations",
                "Power supply capacity",
                "Emergency lighting requirements",
                "Data and communication needs",
                "Fire alarm interfacing",
                "Maintenance access requirements"
              ]}
            />
            <ChecklistCard 
              title="Risk Assessment" 
              description="Identify and evaluate potential hazards"
              icon={AlertTriangle}
              items={[
                "Working at height assessment",
                "Live working evaluation",
                "Isolation procedures",
                "Manual handling requirements",
                "PPE requirements",
                "Emergency procedures"
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-elec-yellow/10">
                    <Lightbulb className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <CardTitle className="text-lg">Lighting Assessment Guide</CardTitle>
                </div>
                <CardDescription className="mt-2">
                  Step-by-step guide for assessing lighting requirements in various spaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn how to calculate appropriate lighting levels, determine fixture types, and 
                  plan efficient lighting layouts for residential and commercial spaces.
                </p>
                <Button size="sm">View Guide</Button>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-elec-yellow/10">
                    <Settings className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <CardTitle className="text-lg">Power Requirements Guide</CardTitle>
                </div>
                <CardDescription className="mt-2">
                  Guidelines for assessing and calculating power requirements for installations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn how to estimate load requirements, determine circuit needs, and plan efficient
                  power distribution for various applications.
                </p>
                <Button size="sm">View Guide</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <Shield className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle>Safety Protocols</CardTitle>
              </div>
              <CardDescription className="mt-2">
                Important safety protocols for on-site electrical work
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Isolation Procedures</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Always verify isolation with approved voltage indicator</li>
                  <li>Apply lock-off devices and warning tags</li>
                  <li>Follow LOTO (Lock Out/Tag Out) procedures</li>
                  <li>Re-verify isolation before beginning work</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Working Near Live Parts</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Only approach if absolutely necessary and if properly trained</li>
                  <li>Use appropriate insulated tools and PPE</li>
                  <li>Ensure adequate lighting and working space</li>
                  <li>Have a second person present when required</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Emergency Procedures</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Know location of first aid kit and emergency equipment</li>
                  <li>Understand site-specific emergency procedures</li>
                  <li>Keep access to fire exits and equipment clear</li>
                  <li>Have emergency contact numbers readily available</li>
                </ul>
              </div>
              
              <Button>Download Full Safety Protocol Guide</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ChecklistCardProps {
  title: string;
  description: string;
  icon: any;
  items: string[];
}

const ChecklistCard = ({ title, description, icon: Icon, items }: ChecklistCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-elec-yellow/10">
            <Icon className="h-6 w-6 text-elec-yellow" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-6" size="sm">View Full Checklist</Button>
      </CardContent>
    </Card>
  );
};

export default OnJobAssessment;
