
import { Helmet } from "react-helmet";
import SafetyResourcesCard from "@/components/electrician/safety-shares/SafetyResourcesCard";
import { Shield } from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";

const SafetyResources = () => {
  return (
    <div className="min-h-screen bg-elec-dark text-white pb-safe">
      <Helmet>
        <title>Safety Resources - Elec-Mate</title>
        <meta name="description" content="Essential safety guides, toolbox talks, and training materials" />
      </Helmet>

      <div className="space-y-6 animate-fade-in px-4 py-4 pt-safe max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <SmartBackButton />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
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
