import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useState, useEffect } from "react";

interface JobNotesCardProps {
  projectName?: string;
}

const JobNotesCard = ({ projectName }: JobNotesCardProps) => {
  const [siteObservations, setSiteObservations] = useState("");
  const [pipelineNotes, setPipelineNotes] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    if (projectName) {
      const stored = localStorage.getItem(`job-notes-${projectName}`);
      if (stored) {
        const notes = JSON.parse(stored);
        setSiteObservations(notes.siteObservations || "");
        setPipelineNotes(notes.pipelineNotes || "");
      }
    }
  }, [projectName]);

  // Save to localStorage on change
  const handleSave = () => {
    if (projectName) {
      localStorage.setItem(`job-notes-${projectName}`, JSON.stringify({
        siteObservations,
        pipelineNotes,
        updatedAt: new Date().toISOString()
      }));
    }
  };

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Job Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4">
        {/* Site Observations */}
        <div className="space-y-2">
          <Label htmlFor="site-observations" className="text-base sm:text-sm font-medium text-foreground">
            Site Observations
          </Label>
          <Textarea
            id="site-observations"
            value={siteObservations}
            onChange={(e) => setSiteObservations(e.target.value)}
            onBlur={handleSave}
            placeholder="Note any observations from site visit (access issues, existing wiring condition, asbestos concerns, etc.)"
            className="min-h-[100px] resize-none"
            style={{ fontSize: '16px' }}
          />
        </div>

        {/* Pipeline Discussions */}
        <div className="space-y-2">
          <Label htmlFor="pipeline-notes" className="text-base sm:text-sm font-medium text-foreground">
            Future Work Discussions
          </Label>
          <Textarea
            id="pipeline-notes"
            value={pipelineNotes}
            onChange={(e) => setPipelineNotes(e.target.value)}
            onBlur={handleSave}
            placeholder="Note any future work the client mentioned (kitchen extension planned, loft conversion interest, etc.)"
            className="min-h-[100px] resize-none"
            style={{ fontSize: '16px' }}
          />
        </div>

        <p className="text-base sm:text-sm text-foreground/90">
          💡 Notes are saved automatically to this device
        </p>
      </CardContent>
    </Card>
  );
};

export default JobNotesCard;
