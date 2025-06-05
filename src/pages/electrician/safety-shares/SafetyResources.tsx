
import { Helmet } from "react-helmet";
import SafetyResourcesCard from "@/components/electrician/safety-shares/SafetyResourcesCard";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SafetyResources = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Safety Resources - Elec-Mate</title>
        <meta name="description" content="Download safety guides, toolbox talks, and training materials" />
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
            <div className="w-12 h-12 rounded-full bg-elec-yellow flex items-center justify-center">
              <Shield className="h-6 w-6 text-elec-dark" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">Safety Resources</h1>
              <p className="text-muted-foreground">
                Essential safety guides, toolbox talks, and training materials
              </p>
            </div>
          </div>
        </div>

        <SafetyResourcesCard />
      </div>
    </div>
  );
};

export default SafetyResources;
