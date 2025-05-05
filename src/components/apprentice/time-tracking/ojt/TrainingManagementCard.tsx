
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimeTracker from "@/components/apprentice/TimeTracker";
import DigitalLogbook from "@/components/apprentice/time-tracking/DigitalLogbook";
import WeeklyOverview from "@/components/apprentice/time-tracking/WeeklyOverview";
import CertificatesManager from "@/components/apprentice/time-tracking/CertificatesManager";
import TrainingEvidence from "@/components/apprentice/time-tracking/TrainingEvidence";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Clock, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TrainingManagementCardProps {
  initialActiveTab?: string;
  className?: string;
}

const TrainingManagementCard = ({ initialActiveTab = "recent", className }: TrainingManagementCardProps) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const isMobile = useIsMobile();

  // Function to get tab display name
  const getTabDisplayName = (tabValue: string) => {
    switch (tabValue) {
      case "recent": return "Recent";
      case "logbook": return "Logbook";
      case "weekly": return "Weekly";
      case "certificates": return "Certificates";
      case "evidence": return "Evidence";
      default: return tabValue;
    }
  };

  return (
    <Card className={cn("bg-elec-gray", className)}>
      <CardHeader className={isMobile ? "pb-2" : ""}>
        <div className={`flex items-center ${isMobile ? "justify-between flex-wrap gap-1" : "justify-between gap-4"}`}>
          <CardTitle className={isMobile ? "text-2xl" : ""}>
            {isMobile ? (
              <div className="flex flex-col">
                <div className="text-3xl font-bold">Off-The-Job</div>
                <div className="text-3xl font-bold">Training Logger</div>
                <div className="text-sm text-muted-foreground mt-1">Track your 20% off-the-job training time</div>
              </div>
            ) : (
              "Training Management"
            )}
          </CardTitle>
          {!isMobile && (
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
          )}
        </div>
      </CardHeader>
      <CardContent className={isMobile ? "px-3 py-2" : ""}>
        {isMobile && (
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-elec-yellow/70 rounded-full mr-1.5"></div>
              <span className="text-sm">Automatic</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-elec-gray rounded-full border border-elec-yellow/40 mr-1.5"></div>
              <span className="text-sm">Manual</span>
            </div>
          </div>
        )}
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          {isMobile ? (
            <div className="mb-4 bg-elec-dark rounded-md p-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between bg-transparent text-white">
                    {getTabDisplayName(activeTab)}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-full min-w-[200px] bg-elec-dark border-elec-gray/40">
                  <DropdownMenuItem onClick={() => setActiveTab("recent")} className="justify-center">
                    Recent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("logbook")} className="justify-center">
                    Logbook
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("weekly")} className="justify-center">
                    Weekly
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("certificates")} className="justify-center">
                    Certificates
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("evidence")} className="justify-center">
                    Evidence
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <TabsList className="mb-4 bg-elec-dark w-full">
              <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
              <TabsTrigger value="logbook" className="flex-1">Logbook</TabsTrigger>
              <TabsTrigger value="weekly" className="flex-1">Weekly</TabsTrigger>
              <TabsTrigger value="certificates" className="flex-1">Certificates</TabsTrigger>
              <TabsTrigger value="evidence" className="flex-1">Evidence</TabsTrigger>
            </TabsList>
          )}
          
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
        
        {isMobile && (
          <div className="flex items-center justify-between mt-6 pt-2 border-t border-elec-gray/30">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-elec-yellow mr-2" />
              <span className="text-3xl font-bold">4h</span>
            </div>
            <div>
              <div className="text-3xl font-bold">3m</div>
              <div className="text-xs text-right text-muted-foreground">Total logged time</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrainingManagementCard;
