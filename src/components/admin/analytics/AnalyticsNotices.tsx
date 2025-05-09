
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyticsNoticesProps {
  isDevelopmentMode: boolean;
  gaInitialized: boolean;
  setShowGaSetup: (show: boolean) => void;
}

const AnalyticsNotices = ({
  isDevelopmentMode,
  gaInitialized,
  setShowGaSetup
}: AnalyticsNoticesProps) => {
  return (
    <>
      {isDevelopmentMode && (
        <Alert className="bg-amber-500/10 border-amber-500/20 mb-6">
          <Shield className="h-4 w-4 text-amber-500" />
          <AlertTitle>Development Mode</AlertTitle>
          <AlertDescription>
            You are viewing this page in development mode. In production, this would only be accessible to admin users.
            <br />
            You can find the Admin Analytics page in the sidebar when development mode is enabled.
          </AlertDescription>
        </Alert>
      )}
      
      {!gaInitialized && (
        <Alert className="bg-blue-500/10 border-blue-500/20 mb-6">
          <Settings className="h-4 w-4 text-blue-500" />
          <AlertTitle>Enhance Your Analytics</AlertTitle>
          <AlertDescription>
            Set up Google Analytics tracking to gain deeper insights into user behavior and enhance your data collection.
            <Button 
              variant="link" 
              className="p-0 h-auto text-blue-500 ml-2"
              onClick={() => setShowGaSetup(true)}
            >
              Configure Now
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AnalyticsNotices;
