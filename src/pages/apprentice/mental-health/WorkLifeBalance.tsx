
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import { Scale } from "lucide-react";
import WorkLifeBalanceTab from "@/components/apprentice/time-management/WorkLifeBalanceTab";

const WorkLifeBalance = () => {
  return (
    <MentalHealthPageLayout
      title="Work-Life Balance"
      description="Strategies for maintaining balance during your apprenticeship"
      icon={<Scale className="h-6 w-6 text-purple-400" />}
      color="purple"
    >
      <WorkLifeBalanceTab />
    </MentalHealthPageLayout>
  );
};

export default WorkLifeBalance;
