
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Heart, Target, Wrench, CheckSquare, AlertCircle } from "lucide-react";
import TimeManagementFundamentalsTab from "@/components/apprentice/time-management/TimeManagementFundamentalsTab";
import SchedulePlanningTab from "@/components/apprentice/time-management/SchedulePlanningTab";
import StressManagementTab from "@/components/apprentice/time-management/StressManagementTab";
import WorkLifeBalanceTab from "@/components/apprentice/time-management/WorkLifeBalanceTab";
import ProductivityToolsTab from "@/components/apprentice/time-management/ProductivityToolsTab";
import InteractiveToolsTab from "@/components/apprentice/time-management/InteractiveToolsTab";

const TimeManagement = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
          Time Management & Work-Life Balance
        </h1>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-6 text-lg leading-relaxed">
          Master the art of balancing your apprenticeship demands with personal wellbeing. Learn effective time management strategies, stress reduction techniques, and how to maintain a healthy work-life balance throughout your electrical career journey.
        </p>
        <div className="flex justify-center">
          <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
        </div>
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50 mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Why This Matters for Electrical Apprentices</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-elec-yellow mb-2">20%</div>
              <p className="text-sm text-muted-foreground">Off-the-job training requirement alongside full-time work</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-elec-yellow mb-2">4 Years</div>
              <p className="text-sm text-muted-foreground">Typical apprenticeship duration requiring sustained focus</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-elec-yellow mb-2">40+</div>
              <p className="text-sm text-muted-foreground">Weekly hours combining work, study, and travel time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="fundamentals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1 bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger 
            value="fundamentals" 
            className="flex items-center gap-2 text-xs lg:text-sm data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
          >
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Fundamentals</span>
            <span className="sm:hidden">Basics</span>
          </TabsTrigger>
          <TabsTrigger 
            value="scheduling" 
            className="flex items-center gap-2 text-xs lg:text-sm data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Scheduling</span>
            <span className="sm:hidden">Schedule</span>
          </TabsTrigger>
          <TabsTrigger 
            value="stress" 
            className="flex items-center gap-2 text-xs lg:text-sm data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
          >
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Stress & Wellbeing</span>
            <span className="sm:hidden">Stress</span>
          </TabsTrigger>
          <TabsTrigger 
            value="balance" 
            className="flex items-center gap-2 text-xs lg:text-sm data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
          >
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Work-Life Balance</span>
            <span className="sm:hidden">Balance</span>
          </TabsTrigger>
          <TabsTrigger 
            value="productivity" 
            className="flex items-center gap-2 text-xs lg:text-sm data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
          >
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Productivity</span>
            <span className="sm:hidden">Tools</span>
          </TabsTrigger>
          <TabsTrigger 
            value="tools" 
            className="flex items-center gap-2 text-xs lg:text-sm data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
          >
            <CheckSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Interactive Tools</span>
            <span className="sm:hidden">Interactive</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="fundamentals" className="mt-0">
            <TimeManagementFundamentalsTab />
          </TabsContent>

          <TabsContent value="scheduling" className="mt-0">
            <SchedulePlanningTab />
          </TabsContent>

          <TabsContent value="stress" className="mt-0">
            <StressManagementTab />
          </TabsContent>

          <TabsContent value="balance" className="mt-0">
            <WorkLifeBalanceTab />
          </TabsContent>

          <TabsContent value="productivity" className="mt-0">
            <ProductivityToolsTab />
          </TabsContent>

          <TabsContent value="tools" className="mt-0">
            <InteractiveToolsTab />
          </TabsContent>
        </div>
      </Tabs>

      <Card className="border-elec-yellow/20 bg-elec-gray mt-8">
        <CardHeader>
          <CardTitle className="text-elec-yellow text-center">Need Additional Support?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">📞 Apprentice Support</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Speak to your training provider or college about workload concerns
              </p>
              <p className="text-xs text-muted-foreground">
                They can help adjust study plans and provide additional resources
              </p>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">🧠 Mental Health Resources</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Visit our Mental Health section for professional support options
              </p>
              <p className="text-xs text-muted-foreground">
                Remember: Asking for help is a sign of strength, not weakness
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeManagement;
