import InfoBox from "@/components/common/InfoBox";
import { ArrowDownUp } from "lucide-react";

const SelectivityInfo = () => {
  return (
    <InfoBox
      title="Selectivity/Discrimination Principles"
      icon={<ArrowDownUp className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />}
      points={[
        "Downstream device operates before upstream during faults",
        "Minimum 2:1 ratio between device ratings (1.6:1 for MCBs)",
        "Time discrimination requires 100-300ms operating time difference",
        "Current discrimination limits fault current coordination",
        "Breaking capacity must exceed prospective fault current",
      ]}
    >
      <p className="text-sm text-elec-light/80 mb-2">
        Proper selectivity ensures only the faulted circuit is isolated, maintaining supply to healthy circuits.
      </p>
      <p className="text-xs text-elec-light/80 mt-1">
        BS 7671 requires coordination studies for installations exceeding 100A total load.
      </p>
    </InfoBox>
  );
};

export default SelectivityInfo;