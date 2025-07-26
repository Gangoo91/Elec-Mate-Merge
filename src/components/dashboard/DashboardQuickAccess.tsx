
import QuickAccessCard from "@/components/dashboard/QuickAccessCard";
import { BookOpen, Calculator, GraduationCap, Wrench, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";

const DashboardQuickAccess = () => {
  return (
    <Card className="bg-elec-gray/70 border border-elec-yellow/20 rounded-lg p-3 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Quick Access</h2>
      <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <QuickAccessCard
          title="Apprentice Hub"
          description="Training resources and tools for apprentices"
          linkText="Access Hub"
          linkTo="/apprentice"
          icon={<GraduationCap className="h-4 w-4" />}
        />
        <QuickAccessCard
          title="Electrical Hub"
          description="Professional calculators and project tools"
          linkText="View Hub"
          linkTo="/electrician"
          icon={<Wrench className="h-4 w-4" />}
        />
      </div>
    </Card>
  );
};

export default DashboardQuickAccess;
