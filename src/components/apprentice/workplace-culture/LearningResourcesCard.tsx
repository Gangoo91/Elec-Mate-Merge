
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, PlayCircle, FileText, Download, MessageSquare } from "lucide-react";

const LearningResourcesCard = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-elec-yellow/10">
            <PlayCircle className="h-5 w-5 text-elec-yellow" />
          </div>
          <CardTitle>Learning Resources</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-elec-dark/40 rounded-lg border border-elec-yellow/20">
            <Lightbulb className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Audio Roleplays</h3>
              <p className="text-sm text-elec-light/80">Listen to common workplace scenarios and how to navigate them effectively</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-elec-dark/40 rounded-lg border border-elec-yellow/20">
            <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Site Checklists</h3>
              <p className="text-sm text-elec-light/80">Downloadable first-day checklists for new sites and projects</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-elec-dark/40 rounded-lg border border-elec-yellow/20">
            <Download className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Downloadable Resources</h3>
              <p className="text-sm text-elec-light/80">Pocket guides and reference cards for common workplace situations</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-elec-dark/40 rounded-lg border border-elec-yellow/20">
            <MessageSquare className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Communication Templates</h3>
              <p className="text-sm text-elec-light/80">Ready-to-use phrases for difficult workplace conversations</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningResourcesCard;
