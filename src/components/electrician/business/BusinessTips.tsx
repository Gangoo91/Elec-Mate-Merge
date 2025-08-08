import InfoBox from "@/components/common/InfoBox";
import { Building } from "lucide-react";

const BusinessTips = () => {
  const tips = [
    "Invest in good accounting software from the start to keep finances organised",
    "Build relationships with suppliers to negotiate better prices on materials",
    "Consider specialising in a niche area like renewable energy or smart home systems",
    "Collect and showcase customer testimonials to build credibility in your local market",
  ];

  return (
    <InfoBox
      title="Business Success Tips"
      icon={<Building className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />}
      points={tips}
      className=""
    />
  );
};

export default BusinessTips;
