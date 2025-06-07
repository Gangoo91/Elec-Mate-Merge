
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Target, TrendingUp, Award } from "lucide-react";
import CPDOverview from "./CPDOverview";
import CPDEntryForm from "./CPDEntryForm";
import CPDHistory from "./CPDHistory";
import CPDGoals from "./CPDGoals";

const CPDTracker = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Clock className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl font-bold text-white">CPD Tracker</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your Continuing Professional Development activities and maintain compliance 
          with professional body requirements. Set goals, log activities, and monitor your progress.
        </p>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-elec-gray">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="log-activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Log Activity
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <CPDOverview />
        </TabsContent>

        <TabsContent value="log-activity" className="space-y-6">
          <CPDEntryForm />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <CPDHistory />
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <CPDGoals />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CPDTracker;
