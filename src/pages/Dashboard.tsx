import { HeroWelcome } from "@/components/dashboard/HeroWelcome";
import { SmartStatsBar } from "@/components/dashboard/SmartStatsBar";
import { HubGrid } from "@/components/dashboard/HubGrid";
import { SecondaryQuickAccess } from "@/components/dashboard/SecondaryQuickAccess";
import { ActionRequired } from "@/components/dashboard/ActionRequired";
import TrialBanner from "@/components/dashboard/TrialBanner";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Hero Welcome Section */}
        <section className="animate-fade-in">
          <HeroWelcome />
        </section>

        {/* Smart Stats Bar - Swipeable on mobile */}
        <section className="animate-fade-in" style={{ animationDelay: "50ms" }}>
          <SmartStatsBar />
        </section>

        {/* Trial Banner (if applicable) */}
        <section className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <TrialBanner />
        </section>

        {/* Main Hub Cards - Equal Prominence */}
        <section className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-1 h-5 sm:h-6 bg-elec-yellow rounded-full"></span>
            Your Hubs
          </h2>
          <HubGrid />
        </section>

        {/* Action Required Panel */}
        <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <ActionRequired />
        </section>

        {/* Secondary Quick Access */}
        <section className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <SecondaryQuickAccess />
        </section>

        {/* Footer spacing for mobile nav */}
        <div className="h-4 sm:h-8" />
      </div>
    </div>
  );
};

export default Dashboard;
