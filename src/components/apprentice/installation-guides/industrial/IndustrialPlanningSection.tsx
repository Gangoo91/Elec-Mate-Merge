
import IndustrialPlanningPhases from "./IndustrialPlanningPhases";
import IndustrialDesignConsiderations from "./IndustrialDesignConsiderations";
import IndustrialComplianceRequirements from "./IndustrialComplianceRequirements";

const IndustrialPlanningSection = () => {
  return (
    <div className="space-y-6">
      <IndustrialPlanningPhases />
      <IndustrialDesignConsiderations />
      <IndustrialComplianceRequirements />
    </div>
  );
};

export default IndustrialPlanningSection;
