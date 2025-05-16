
import { Card } from "@/components/ui/card";
import { Building } from "lucide-react";

const BusinessTips = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
      <div className="flex gap-3 items-start">
        <Building className="h-6 w-6 text-elec-yellow mt-1" />
        <div>
          <h3 className="font-medium text-lg mb-1">Business Success Tips</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Invest in good accounting software from the start to keep finances organised</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Build relationships with suppliers to negotiate better prices on materials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Consider specialising in a niche area like renewable energy or smart home systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Collect and showcase customer testimonials to build credibility in your local market</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default BusinessTips;
