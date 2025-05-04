
import { Alert, AlertDescription } from "@/components/ui/alert";

const PowerFactorInfo = () => {
  return (
    <Alert className="bg-elec-dark/50 border-elec-yellow/20">
      <div className="space-y-2">
        <h3 className="font-medium">Power Factor Information</h3>
        <p className="text-sm text-elec-light/80">
          Power factor is the ratio of working power to apparent power in an electrical circuit. It's a measure of how efficiently electrical power is converted into useful work output.
        </p>
        <ul className="space-y-1 text-sm text-elec-light/80 list-disc pl-5">
          <li>Ideal power factor = 1.0 (100% efficient)</li>
          <li>Low power factor increases energy costs</li>
          <li>Power factor = Active Power (W) / Apparent Power (VA)</li>
        </ul>
      </div>
    </Alert>
  );
};

export default PowerFactorInfo;
