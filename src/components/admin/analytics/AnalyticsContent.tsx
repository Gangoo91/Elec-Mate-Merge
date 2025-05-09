
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import UserSegments from "@/components/admin/UserSegments";
import RealTimeUsers from "@/components/admin/RealTimeUsers";
import UserRetentionChart from "@/components/admin/UserRetentionChart";

interface AnalyticsContentProps {
  activeTab: string;
  timeRange: string;
}

const AnalyticsContent = ({ activeTab, timeRange }: AnalyticsContentProps) => {
  return (
    <>
      {activeTab === "overview" && (
        <AnalyticsDashboard timeRange={timeRange} />
      )}
      
      {activeTab === "users" && (
        <div className="space-y-6">
          <UserSegments />
          <RealTimeUsers />
        </div>
      )}
      
      {activeTab === "retention" && (
        <UserRetentionChart timeRange={timeRange} />
      )}
      
      {activeTab === "content" && (
        <div className="space-y-6">
          <Alert>
            <AlertTitle>Content Analytics</AlertTitle>
            <AlertDescription>
              The content analytics module is currently being enhanced. 
              Check back soon for detailed insights on your app's content performance.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

export default AnalyticsContent;
