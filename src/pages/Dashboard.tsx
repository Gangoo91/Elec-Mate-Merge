import { HeroWelcome } from "@/components/dashboard/HeroWelcome";
import { SmartStatsBar } from "@/components/dashboard/SmartStatsBar";
import { HubGrid } from "@/components/dashboard/HubGrid";
import { SecondaryQuickAccess } from "@/components/dashboard/SecondaryQuickAccess";
import { ActionRequired } from "@/components/dashboard/ActionRequired";
import TrialBanner from "@/components/dashboard/TrialBanner";

const Dashboard = () => {
  return (
    <div className="min-h-screen mobile-safe-area">
      <div className="space-y-4 sm:space-y-5 animate-fade-in px-4 sm:px-6 py-4 md:py-6 pb-8 md:pb-12">
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

        {/* Main Hub Cards */}
        <section className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <h2 className="text-xs sm:text-sm font-medium text-white/40 uppercase tracking-wider mb-2.5 px-0.5">
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
        <div className="h-4 sm:h-6" />
      </div>
    </div>
  );
};

export default Dashboard;
