
import { BarChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import ChartContainer from "./ChartContainer";
import MetricCard from "./MetricCard";

const AnalyticsDashboard = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <BarChart className="h-5 w-5 text-elec-yellow" />
          Analytics Dashboard
        </h3>
        <div className="flex gap-2">
          <select className="text-xs bg-elec-gray-light/50 px-3 py-1 rounded">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="text-xs bg-elec-gray-light/50 px-3 py-1 rounded hover:bg-elec-gray-light/70">
            Export
          </button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ChartContainer title="User Engagement" metrics={[
          { label: "Avg. Session", value: "12m 47s" },
          { label: "Completion Rate", value: "68%" },
          { label: "Return Users", value: "79%" }
        ]} />
        
        <ChartContainer title="Popular Content" showBarMetrics={true} />
        
        <ChartContainer title="User Growth" metrics={[
          { label: "New This Week", value: "+124" },
          { label: "Growth Rate", value: "+8.2%" },
          { label: "Conversion", value: "3.8%" }
        ]} />
        
        <div className="bg-elec-gray-light/10 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-4">User Distribution</h4>
          <div className="h-48 flex items-center justify-center border border-dashed border-elec-yellow/20 rounded">
            <p className="text-sm text-gray-400">User distribution chart would render here</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs">
            <MetricCard color="bg-elec-yellow" label="Apprentice" value="45%" />
            <MetricCard color="bg-blue-500" label="Electrician" value="32%" />
            <MetricCard color="bg-green-500" label="Employer" value="18%" />
            <MetricCard color="bg-purple-500" label="Other" value="5%" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AnalyticsDashboard;
