
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileCheck, Calendar, Bell, Scroll } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const ComplianceManager = () => {
  const [activeTab, setActiveTab] = useState("certificates");

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} functionality will be available soon.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compliance Manager</h1>
          <p className="text-muted-foreground">
            Track certifications, insurance and compliance requirements.
          </p>
        </div>
        <Link to="/electrician-tools/admin">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Admin Tools
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="certificates" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" /> Certificates
          </TabsTrigger>
          <TabsTrigger value="expirations" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Expirations
          </TabsTrigger>
          <TabsTrigger value="reminders" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Reminders
          </TabsTrigger>
          <TabsTrigger value="regulations" className="flex items-center gap-2">
            <Scroll className="h-4 w-4" /> Regulations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Electrical Certification</CardTitle>
                  <Badge variant="success">Active</Badge>
                </div>
                <CardDescription>Main electrical competency certification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expires:</span>
                    <span className="text-sm">Dec 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Certificate No:</span>
                    <span className="text-sm">EL-2023-78945</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("View Certificate")}
                >
                  View Certificate
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Public Liability Insurance</CardTitle>
                  <Badge variant="yellow">Expiring Soon</Badge>
                </div>
                <CardDescription>Business liability insurance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expires:</span>
                    <span className="text-sm">June 30, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Policy No:</span>
                    <span className="text-sm">PLI-458721-B</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Renew Insurance")}
                >
                  Renew Insurance
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Add New Certificate</CardTitle>
                <CardDescription>Upload a new certification document</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Add Certificate")}
                >
                  Add Certificate
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expirations" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Upcoming Expirations</CardTitle>
              <CardDescription>Track certification and insurance expirations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-elec-yellow/10">
                  <div>
                    <p className="font-medium">Public Liability Insurance</p>
                    <p className="text-sm text-muted-foreground">Policy: PLI-458721-B</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="yellow">30 days left</Badge>
                    <p className="text-sm mt-1">June 30, 2025</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-elec-yellow/10">
                  <div>
                    <p className="font-medium">Health & Safety Certificate</p>
                    <p className="text-sm text-muted-foreground">Cert: HSE-2023-12456</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="yellow">45 days left</Badge>
                    <p className="text-sm mt-1">July 15, 2025</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Business Registration</p>
                    <p className="text-sm text-muted-foreground">Reg: BR-2022-587412</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success">180 days left</Badge>
                    <p className="text-sm mt-1">Nov 30, 2025</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={() => handleAction("Set Up Reminders")}
                >
                  Set Up Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Reminder Settings</CardTitle>
              <CardDescription>Configure notification preferences for compliance documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Configure Reminders")}
                >
                  Configure Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Regulatory Updates</CardTitle>
              <CardDescription>Stay informed about electrical code changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-elec-yellow/10">
                  <div>
                    <p className="font-medium">BS 7671:2018+A2:2022</p>
                    <p className="text-sm text-muted-foreground">18th Edition Amendment 2</p>
                  </div>
                  <Badge>Current</Badge>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={() => handleAction("View Regulations")}
                >
                  View Regulations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceManager;
