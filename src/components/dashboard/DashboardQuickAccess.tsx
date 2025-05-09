
import QuickAccessCard from "@/components/dashboard/QuickAccessCard";
import { ArrowRight, BookOpen, Calculator, GraduationCap, Wrench, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const DashboardQuickAccess = () => {
  const { isDevelopmentMode, profile } = useAuth();
  const isAdmin = profile?.role === "admin" || isDevelopmentMode;

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
        
        {isAdmin && (
          <QuickAccessCard
            title="Admin Dashboard"
            description="Access administrative controls and system settings"
            linkText="Open Admin"
            linkTo="/admin"
            icon={<Settings className="ml-1 h-4 w-4" />}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardQuickAccess;
