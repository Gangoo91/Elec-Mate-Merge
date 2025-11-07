import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ProjectOverviewSectionProps {
  response?: string;
}

const ProjectOverviewSection = ({ response }: ProjectOverviewSectionProps) => {
  if (!response) return null;

  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-pink-400" />
          Project Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{response}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectOverviewSection;
