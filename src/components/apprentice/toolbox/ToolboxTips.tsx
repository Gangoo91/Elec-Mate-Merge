
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const ToolboxTips = () => {
  const tips = [
    "Remember to review safety procedures before starting any electrical job",
    "Always verify lockout/tagout procedures are followed correctly",
    "Use the correct tools for the job to ensure safety and efficiency",
    "When in doubt, consult with your mentor or supervisor",
    "Document any issues or unusual circumstances encountered on the job"
  ];

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Quick Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ToolboxTips;
