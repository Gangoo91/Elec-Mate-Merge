
import { Helmet } from "react-helmet";
import SafetyAlertsCard from "@/components/electrician/safety-shares/SafetyAlertsCard";
import { AlertTriangle } from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";

const SafetyAlerts = () => {
  return (
    <div className="min-h-screen bg-elec-dark text-white pb-safe">
      <Helmet>
        <title>Safety Alerts - Elec-Mate</title>
        <meta name="description" content="Critical safety warnings and real-time alerts for electrical professionals" />
      </Helmet>

      <div className="space-y-6 animate-fade-in px-4 py-4 pt-safe max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <SmartBackButton />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">Safety Alerts</h1>
              <p className="text-muted-foreground">
                Critical safety warnings and real-time alerts for electrical professionals
              </p>
            </div>
          </div>
        </div>

        <SafetyAlertsCard />
      </div>
    </div>
  );
};

export default SafetyAlerts;
