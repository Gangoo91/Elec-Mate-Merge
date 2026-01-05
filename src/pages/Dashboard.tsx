import { HeroWelcome } from "@/components/dashboard/HeroWelcome";
import { SmartStatsBar } from "@/components/dashboard/SmartStatsBar";
import { HubGrid } from "@/components/dashboard/HubGrid";
import { SecondaryQuickAccess } from "@/components/dashboard/SecondaryQuickAccess";
import { ActionRequired } from "@/components/dashboard/ActionRequired";
import TrialBanner from "@/components/dashboard/TrialBanner";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Welcome Section */}
        <div className="animate-fade-in">
          <HeroWelcome />
        </div>

        {/* Smart Stats Bar */}
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <SmartStatsBar />
        </div>

        {/* Trial Banner (if applicable) */}
        <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <TrialBanner />
        </div>

        {/* Main Hub Cards - Equal Prominence */}
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-elec-yellow rounded-full"></span>
            Your Hubs
          </h2>
          <HubGrid />
        </div>

        {/* Action Required Panel */}
        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <ActionRequired />
        </div>

        {/* Secondary Quick Access */}
        <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <SecondaryQuickAccess />
        </div>

        {/* Footer spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
};

export default Dashboard;
