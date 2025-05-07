
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const CareerAdvancementTips = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
      <div className="flex gap-3 items-start">
        <GraduationCap className="h-6 w-6 text-elec-yellow mt-1" />
        <div>
          <h3 className="font-medium text-lg mb-1">Career Advancement Tips</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Continuously update your skills through courses and certifications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Join professional organisations like the IET, ECA, or NICEIC to network with others in the field</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Consider specialising in growth areas like renewable energy, electric vehicles, or smart building systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Document your work and build a portfolio showcasing your most impressive projects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Pursue additional qualifications like the 18th Edition Wiring Regulations or inspection and testing certification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Consider gaining experience in different sectors (domestic, commercial, industrial) to broaden your expertise</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Build relationships with suppliers, manufacturers and specialists to stay informed about industry developments</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default CareerAdvancementTips;
