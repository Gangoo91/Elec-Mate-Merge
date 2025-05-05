
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimeTracker from "@/components/apprentice/TimeTracker";
import DigitalLogbook from "@/components/apprentice/time-tracking/DigitalLogbook";
import WeeklyOverview from "@/components/apprentice/time-tracking/WeeklyOverview";
import CertificatesManager from "@/components/apprentice/time-tracking/CertificatesManager";
import TrainingEvidence from "@/components/apprentice/time-tracking/TrainingEvidence";

interface TrainingManagementCardProps {
  initialActiveTab?: string;
}

const TrainingManagementCard = ({ initialActiveTab = "recent" }: TrainingManagementCardProps) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Training Management</CardTitle>
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
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 bg-elec-dark">
            <TabsTrigger value="recent">Recent Activities</TabsTrigger>
            <TabsTrigger value="logbook">Digital Logbook</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="evidence">Training Evidence</TabsTrigger>
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
          
          <TabsContent value="certificates">
            <CertificatesManager />
          </TabsContent>
          
          <TabsContent value="evidence">
            <TrainingEvidence />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrainingManagementCard;
