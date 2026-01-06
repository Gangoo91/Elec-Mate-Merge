
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, CheckCircle } from "lucide-react";

const CareerAdvancementTips = () => {
  const tips = [
    "Continuously update your skills through courses and certifications",
    "Join professional organisations like the IET, ECA, or NICEIC to network with others in the field",
    "Consider specialising in growth areas like renewable energy, electric vehicles, or smart building systems",
    "Document your work and build a portfolio showcasing your most impressive projects",
    "Pursue additional qualifications like the 18th Edition Wiring Regulations or inspection and testing certification",
    "Consider gaining experience in different sectors (domestic, commercial, industrial) to broaden your expertise",
    "Build relationships with suppliers, manufacturers and specialists to stay informed about industry developments"
  ];

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-3 text-white">
          <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
          </div>
          Career Advancement Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-white/80">{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CareerAdvancementTips;
