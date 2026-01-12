
import { Helmet } from "react-helmet";
import EnhancedSafetyResourcesCard from "@/components/electrician/safety-shares/EnhancedSafetyResourcesCard";
import { Shield } from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";

const SafetyResourcesEnhanced = () => {
  return (
    <div className="min-h-screen bg-elec-dark text-white pb-safe">
      <Helmet>
        <title>Enhanced Safety Resources - Elec-Mate</title>
        <meta name="description" content="Enhanced electrical safety resources with user interactions and download tracking" />
      </Helmet>

      <div className="space-y-6 animate-fade-in px-4 py-4 pt-safe max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <SmartBackButton />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">Enhanced Safety Resources</h1>
              <p className="text-muted-foreground">
                Interactive safety resources with ratings, bookmarks, and download tracking
              </p>
            </div>
          </div>
        </div>

        <EnhancedSafetyResourcesCard />
      </div>
    </div>
  );
};

export default SafetyResourcesEnhanced;
