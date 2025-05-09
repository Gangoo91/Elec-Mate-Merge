
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SystemEvent } from "../types";

interface RecentActivityProps {
  events: SystemEvent[];
}

const RecentActivity = ({ events }: RecentActivityProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-elec-yellow" />
        Recent Activity
      </h3>
      <div className="space-y-3">
        {events.slice(0, 4).map(event => (
          <div key={event.id} className="flex items-center gap-2 text-sm border-b border-elec-yellow/10 pb-2">
            <span className={`h-2 w-2 rounded-full ${
              event.severity === 'error' ? 'bg-red-500' : 
              event.severity === 'warning' ? 'bg-amber-500' : 
              event.severity === 'success' ? 'bg-green-500' : 
              'bg-blue-500'
            }`}></span>
            <span>{event.event}</span>
            <span className="ml-auto text-xs text-gray-400">{event.date}</span>
          </div>
        ))}
      </div>
      <button className="text-xs text-elec-yellow hover:text-elec-yellow/80 mt-3">View all activity</button>
    </Card>
  );
};

export default RecentActivity;
