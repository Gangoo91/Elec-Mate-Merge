
import QuickAccessCard from "@/components/dashboard/QuickAccessCard";
import { ArrowRight } from "lucide-react";

const DashboardQuickAccess = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <QuickAccessCard
          title="Apprentice Hub"
          description="Training resources and tools for apprentices"
          linkText="Access Hub"
          linkTo="/apprentice"
          icon={<ArrowRight className="ml-1 h-4 w-4" />}
        />
        <QuickAccessCard
          title="Electrician Tools"
          description="Professional calculators and project tools"
          linkText="View Tools"
          linkTo="/electrician"
          icon={<ArrowRight className="ml-1 h-4 w-4" />}
        />
      </div>
    </div>
  );
};

export default DashboardQuickAccess;
