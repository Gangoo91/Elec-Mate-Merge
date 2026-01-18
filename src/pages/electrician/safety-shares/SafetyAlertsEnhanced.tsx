
import { Helmet } from "react-helmet";
import EnhancedSafetyAlertsCard from "@/components/electrician/safety-shares/EnhancedSafetyAlertsCard";
import { AlertTriangle } from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";

const SafetyAlertsEnhanced = () => {
  return (
    <div className="bg-elec-dark text-white ">
      <Helmet>
        <title>Enhanced Safety Alerts - Elec-Mate</title>
        <meta name="description" content="Enhanced electrical safety alerts with user interactions and real-time data" />
      </Helmet>

      <div className="space-y-6 animate-fade-in px-4 py-4  max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <SmartBackButton />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">Enhanced Safety Alerts</h1>
              <p className="text-muted-foreground">
                Interactive safety alerts with ratings, bookmarks, and real-time tracking
              </p>
            </div>
          </div>
        </div>

        <EnhancedSafetyAlertsCard />
      </div>
    </div>
  );
};

export default SafetyAlertsEnhanced;
