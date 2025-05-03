
import QuickAccessCard from "@/components/dashboard/QuickAccessCard";

const DashboardQuickAccess = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <QuickAccessCard
        title="Apprentice Hub"
        description="Access EAL-compliant training resources, off-the-job time keeping, and support."
        linkText="Explore Hub"
        linkTo="/apprentice"
      />
      <QuickAccessCard
        title="Electrician Tools"
        description="Boost your efficiency with professional calculators, templates, and project tools."
        linkText="View Tools"
        linkTo="/electrician"
      />
    </div>
  );
};

export default DashboardQuickAccess;
