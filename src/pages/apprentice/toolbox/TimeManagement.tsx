
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Heart, Target, Wrench, CheckSquare } from "lucide-react";
import TimeManagementFundamentalsTab from "@/components/apprentice/time-management/TimeManagementFundamentalsTab";
import SchedulePlanningTab from "@/components/apprentice/time-management/SchedulePlanningTab";
import StressManagementTab from "@/components/apprentice/time-management/StressManagementTab";
import WorkLifeBalanceTab from "@/components/apprentice/time-management/WorkLifeBalanceTab";
import ProductivityToolsTab from "@/components/apprentice/time-management/ProductivityToolsTab";
import InteractiveToolsTab from "@/components/apprentice/time-management/InteractiveToolsTab";

const TimeManagement = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Time Management & Work-Life Balance</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Master the art of balancing your apprenticeship demands with personal wellbeing. Learn effective time management strategies, stress reduction techniques, and how to maintain a healthy work-life balance throughout your electrical career.
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Tabs defaultValue="fundamentals" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="fundamentals" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Fundamentals
          </TabsTrigger>
          <TabsTrigger value="scheduling" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Scheduling
          </TabsTrigger>
          <TabsTrigger value="stress" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Stress & Wellbeing
          </TabsTrigger>
          <TabsTrigger value="balance" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Work-Life Balance
          </TabsTrigger>
          <TabsTrigger value="productivity" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Productivity
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fundamentals">
          <TimeManagementFundamentalsTab />
        </TabsContent>

        <TabsContent value="scheduling">
          <SchedulePlanningTab />
        </TabsContent>

        <TabsContent value="stress">
          <StressManagementTab />
        </TabsContent>

        <TabsContent value="balance">
          <WorkLifeBalanceTab />
        </TabsContent>

        <TabsContent value="productivity">
          <ProductivityToolsTab />
        </TabsContent>

        <TabsContent value="tools">
          <InteractiveToolsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TimeManagement;
