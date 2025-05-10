
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Settings, Users, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const ScheduleManager = () => {
  const [activeTab, setActiveTab] = useState("calendar");

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
          <h1 className="text-3xl font-bold tracking-tight">Schedule Manager</h1>
          <p className="text-muted-foreground">
            Manage appointments and schedule electrical jobs.
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
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Calendar
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Appointments
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Staff Scheduling
          </TabsTrigger>
          <TabsTrigger value="recurring" className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" /> Recurring Jobs
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Monthly View</CardTitle>
                <CardDescription>View your schedule in monthly format.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("View Monthly Calendar")}
                >
                  Open Calendar
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Create Event</CardTitle>
                <CardDescription>Schedule a new job or appointment.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Create New Event")}
                >
                  Create Event
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Export Calendar</CardTitle>
                <CardDescription>Export your calendar to external applications.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Export Calendar")}
                >
                  Export Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>View and manage scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("View Appointments")}
                >
                  View Appointments
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Staff Availability</CardTitle>
              <CardDescription>Manage staff schedules and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Manage Staff Schedule")}
                >
                  Manage Staff Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recurring" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Recurring Jobs</CardTitle>
              <CardDescription>Set up and manage recurring maintenance jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Manage Recurring Jobs")}
                >
                  Manage Recurring Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Calendar Settings</CardTitle>
              <CardDescription>Configure calendar preferences and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Configure Calendar")}
                >
                  Configure Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduleManager;
