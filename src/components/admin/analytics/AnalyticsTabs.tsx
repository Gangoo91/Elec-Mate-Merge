
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsFilter from "./AnalyticsFilter";

interface AnalyticsTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const AnalyticsTabs = ({
  activeTab,
  setActiveTab,
  timeRange,
  setTimeRange
}: AnalyticsTabsProps) => {
  return (
    <div className="flex items-center justify-between">
      <Tabs defaultValue={activeTab} value={activeTab} className="w-[400px]" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <AnalyticsFilter timeRange={timeRange} setTimeRange={setTimeRange} />
    </div>
  );
};

export default AnalyticsTabs;
