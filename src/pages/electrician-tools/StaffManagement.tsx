
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, UserCircle, BriefcaseIcon, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState("team");

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
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage staff hours, qualifications and assignments.
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
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Team
          </TabsTrigger>
          <TabsTrigger value="employees" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" /> Employees
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <BriefcaseIcon className="h-4 w-4" /> Assignments
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Hours
          </TabsTrigger>
          <TabsTrigger value="qualifications" className="flex items-center gap-2">
            <Award className="h-4 w-4" /> Qualifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Team Overview</CardTitle>
                <CardDescription>View your current team structure and roles.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("View Team Structure")}
                >
                  View Team Structure
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Add Team Member</CardTitle>
                <CardDescription>Add a new team member to your organization.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Add Team Member")}
                >
                  Add Team Member
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Team Reports</CardTitle>
                <CardDescription>Generate reports on team performance.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Team Reports")}
                >
                  Generate Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Employee Records</CardTitle>
              <CardDescription>Manage employee information and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("View Employee Records")}
                >
                  View Employee Records
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Job Assignments</CardTitle>
              <CardDescription>Manage staff job assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Manage Assignments")}
                >
                  Manage Assignments
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Hours Tracking</CardTitle>
              <CardDescription>Track and manage staff working hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Track Hours")}
                >
                  View Hours Log
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qualifications" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Staff Qualifications</CardTitle>
              <CardDescription>Manage staff certifications and skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Manage Qualifications")}
                >
                  View Qualifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffManagement;
