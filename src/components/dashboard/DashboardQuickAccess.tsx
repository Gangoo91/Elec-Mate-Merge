
import QuickAccessCard from "@/components/dashboard/QuickAccessCard";
import { ArrowRight, Users, BookOpen, Calculator } from "lucide-react";

const DashboardQuickAccess = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <QuickAccessCard
          title="Apprentice Hub"
          description="Training resources and tools for apprentices"
          linkText="Access Hub"
          linkTo="/apprentice"
          icon={<BookOpen className="ml-1 h-4 w-4" />}
        />
        <QuickAccessCard
          title="Electrical Hub"
          description="Professional calculators and project tools"
          linkText="View Hub"
          linkTo="/electrician"
          icon={<Calculator className="ml-1 h-4 w-4" />}
        />
        <QuickAccessCard
          title="Mentor Connect"
          description="Connect with industry professionals for guidance"
          linkText="Find Mentors"
          linkTo="/apprentice/mentor"
          icon={<Users className="ml-1 h-4 w-4" />}
        />
      </div>
    </div>
  );
};

export default DashboardQuickAccess;
