
import QuickAccessCard from "@/components/dashboard/QuickAccessCard";
import { BookOpen, Calculator, GraduationCap, Wrench } from "lucide-react";

const DashboardQuickAccess = () => {
  return (
    <div className="bg-elec-gray/70 border border-elec-yellow/20 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <QuickAccessCard
          title="Apprentice Hub"
          description="Training resources and tools for apprentices"
          linkText="Access Hub"
          linkTo="/apprentice"
          icon={<GraduationCap className="ml-1 h-4 w-4" />}
        />
        <QuickAccessCard
          title="Electrical Hub"
          description="Professional calculators and project tools"
          linkText="View Hub"
          linkTo="/electrician"
          icon={<Wrench className="ml-1 h-4 w-4" />}
        />
      </div>
    </div>
  );
};

export default DashboardQuickAccess;
