
import { Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import SystemStatus from "./SystemStatus";
import ResourceUsage from "./ResourceUsage";
import SystemEvents from "./SystemEvents";
import MaintenanceCard from "./MaintenanceCard";

import { SystemEvent } from "../types";

interface SystemSettingsProps {
  events: SystemEvent[];
}

const SystemSettings = ({ events }: SystemSettingsProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          System Settings
        </h3>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <SystemStatus />
        <ResourceUsage />
        <SystemEvents events={events} />
        <MaintenanceCard />
      </div>
    </Card>
  );
};

export default SystemSettings;
