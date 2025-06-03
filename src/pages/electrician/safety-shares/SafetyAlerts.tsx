
import { Helmet } from "react-helmet";
import SafetyAlertsCard from "@/components/electrician/safety-shares/SafetyAlertsCard";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SafetyAlerts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-elec-dark text-white p-6">
      <Helmet>
        <title>Safety Alerts - Elec-Mate</title>
        <meta name="description" content="Latest electrical safety alerts and warnings for professionals" />
      </Helmet>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-elec-yellow mb-2">Safety Alerts</h1>
            <p className="text-gray-300">
              Critical safety information and alerts for electrical professionals
            </p>
          </div>
        </div>

        <SafetyAlertsCard />
      </div>
    </div>
  );
};

export default SafetyAlerts;
