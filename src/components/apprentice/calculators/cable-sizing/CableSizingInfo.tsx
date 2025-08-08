import InfoBox from "@/components/common/InfoBox";
import { Ruler } from "lucide-react";

const CableSizingInfo = () => {
  return (
    <InfoBox
      title="Cable Selection Factors"
      icon={<Ruler className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />}
      points={[
        "Current-carrying capacity",
        "Voltage drop over distance",
        "Installation method & ambient temperature",
        "Grouping factors when multiple cables run together",
        "Short circuit protection requirements",
      ]}
    >
      <p className="text-sm text-elec-light/80 mb-2">
        Cable sizing depends on multiple factors beyond current rating alone:
      </p>
      <p className="text-xs text-elec-light/80 mt-1">
        Always consult relevant electrical codes and standards for your specific application.
      </p>
    </InfoBox>
  );
};

export default CableSizingInfo;
