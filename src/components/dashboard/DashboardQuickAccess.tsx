
import QuickAccessCard from "@/components/dashboard/QuickAccessCard";
import { BookOpen, Calculator, GraduationCap, Wrench, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";

const DashboardQuickAccess = () => {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
      <QuickAccessCard
        title="Apprentice Hub"
        description=""
        linkText="Access Hub"
        linkTo="/apprentice"
        icon={<GraduationCap className="h-4 w-4" />}
      />
      <QuickAccessCard
        title="Electrical Hub"
        description=""
        linkText="View Hub"
        linkTo="/electrician"
        icon={<Wrench className="h-4 w-4" />}
      />
    </div>
  );
};

export default DashboardQuickAccess;
