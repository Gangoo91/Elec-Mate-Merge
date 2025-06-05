
import { Helmet } from "react-helmet";
import SafetyAlertsCard from "@/components/electrician/safety-shares/SafetyAlertsCard";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SafetyAlerts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Safety Alerts - Elec-Mate</title>
        <meta name="description" content="Latest electrical safety alerts and warnings for professionals" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/40 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">Safety Alerts</h1>
              <p className="text-muted-foreground">
                Critical safety information and alerts for electrical professionals
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
