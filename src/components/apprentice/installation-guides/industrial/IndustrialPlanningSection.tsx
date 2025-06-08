
import IndustrialPlanningPhases from "./IndustrialPlanningPhases";
import IndustrialDesignConsiderations from "./IndustrialDesignConsiderations";
import IndustrialComplianceRequirements from "./IndustrialComplianceRequirements";
import IndustrialRiskManagement from "./IndustrialRiskManagement";

const IndustrialPlanningSection = () => {
  return (
    <div className="space-y-6">
      <IndustrialPlanningPhases />
      <IndustrialDesignConsiderations />
      <IndustrialComplianceRequirements />
      <IndustrialRiskManagement />
    </div>
  );
};

export default IndustrialPlanningSection;
