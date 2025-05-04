
import { Alert, AlertDescription } from "@/components/ui/alert";

const CableSizingInfo = () => {
  return (
    <Alert className="bg-elec-dark/50 border-elec-yellow/20">
      <div className="space-y-2">
        <h3 className="font-medium">Cable Selection Factors</h3>
        <p className="text-sm text-elec-light/80">
          Cable sizing depends on multiple factors beyond current rating alone:
        </p>
        <ul className="space-y-1 text-xs text-elec-light/80 list-disc pl-5">
          <li>Current-carrying capacity</li>
          <li>Voltage drop over distance</li>
          <li>Installation method & ambient temperature</li>
          <li>Grouping factors when multiple cables run together</li>
          <li>Short circuit protection requirements</li>
        </ul>
        <p className="text-xs text-elec-light/80 mt-1">
          Always consult relevant electrical codes and standards for your specific application.
        </p>
      </div>
    </Alert>
  );
};

export default CableSizingInfo;
