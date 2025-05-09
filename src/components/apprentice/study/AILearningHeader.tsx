
import { GraduationCap } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AILearningHeader = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray lg:col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-elec-yellow" />
          AI Learning Assistant
        </CardTitle>
        <CardDescription>
          Tools designed to help UK electrical apprentices master complex concepts and prepare for qualifications
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AILearningHeader;
