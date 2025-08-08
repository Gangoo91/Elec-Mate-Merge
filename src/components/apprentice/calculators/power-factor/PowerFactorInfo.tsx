import InfoBox from "@/components/common/InfoBox";
import { Zap } from "lucide-react";

const PowerFactorInfo = () => {
  return (
    <InfoBox
      title="Power Factor Information"
      icon={<Zap className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />}
      points={[
        "Ideal power factor = 1.0 (100% efficient)",
        "Low power factor increases energy costs",
        "Power factor = Active Power (W) / Apparent Power (VA)",
      ]}
    >
      <p className="text-sm text-elec-light/80 mb-2">
        Power factor is the ratio of working power to apparent power in an electrical circuit. It's a measure of how efficiently electrical power is converted into useful work output.
      </p>
    </InfoBox>
  );
};

export default PowerFactorInfo;
