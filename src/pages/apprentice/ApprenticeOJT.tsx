
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Book, FileText, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import TimeTracker from "@/components/apprentice/TimeTracker";
import DigitalLogbook from "@/components/apprentice/time-tracking/DigitalLogbook";
import WeeklyOverview from "@/components/apprentice/time-tracking/WeeklyOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApprenticeOJT = () => {
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [targetHours] = useState(40);
  const [courseHours, setCourseHours] = useState(0);
  const progress = (weeklyHours / targetHours) * 100;

  // Simulate loading course hours from various course pages
  useEffect(() => {
    // In a real implementation, this would come from Supabase
    // For now, we'll check localStorage for any course times
    let totalCourseTime = 0;
    
    // Loop through localStorage to find any course time entries
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('course_') && key.endsWith('_todayTime')) {
        const timeValue = parseInt(localStorage.getItem(key) || '0');
        totalCourseTime += timeValue;
      }
    });
    
    // Convert seconds to hours
    setCourseHours(Math.round(totalCourseTime / 36) / 100); // rounded to 2 decimal places
    
    // Update weekly hours with course hours
    setWeeklyHours(prev => {
      const newTotal = 8 + (totalCourseTime / 3600);
      return parseFloat(newTotal.toFixed(1));
    });
  }, []);

  const handleDownloadReport = () => {
    // In a real implementation, this would generate a PDF or CSV report
    alert("This would download a time report in a real implementation");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Off the Job Time Keeping</h1>
          <p className="text-muted-foreground">
            Track your 20% off-the-job training hours and access EAL compliant resources
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadReport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Link to="/apprentice">
            <Button variant="outline">Back to Apprentice Hub</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>This week</span>
                  <span>{weeklyHours} / {targetHours} hours</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <Book className="h-4 w-4 text-elec-yellow mr-2" />
                    Course Learning
                  </span>
                  <span>{courseHours} hours</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Time automatically tracked from online learning
                </div>
              </div>
              
              <Button className="w-full">Log Manual Hours</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Training Activity</CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-elec-yellow/70 rounded-full mr-1.5"></div>
                  <span>Automatic</span>
                </div>
                <div className="flex items-center ml-3">
                  <div className="w-3 h-3 bg-elec-gray rounded-full border border-elec-yellow/40 mr-1.5"></div>
                  <span>Manual</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recent">
              <TabsList className="mb-4 bg-elec-dark">
                <TabsTrigger value="recent">Recent Activities</TabsTrigger>
                <TabsTrigger value="logbook">Digital Logbook</TabsTrigger>
                <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent">
                <TimeTracker />
              </TabsContent>
              
              <TabsContent value="logbook">
                <DigitalLogbook />
              </TabsContent>
              
              <TabsContent value="weekly">
                <WeeklyOverview />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApprenticeOJT;
