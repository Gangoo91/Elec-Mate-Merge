
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EvidenceForm from "./EvidenceForm";
import { TrainingEvidenceItem } from "@/types/time-tracking";

interface EvidenceEmptyStateProps {
  onAddEvidence: (evidence: Omit<TrainingEvidenceItem, 'id'>) => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

const EvidenceEmptyState = ({ onAddEvidence, isUploading, setIsUploading }: EvidenceEmptyStateProps) => {
  return (
    <Card className="border-dashed border-2 border-elec-yellow/20 bg-elec-dark">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <FileText className="h-12 w-12 text-elec-yellow/40 mb-4" />
        <h3 className="text-xl font-medium mb-2">No evidence found</h3>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          Add evidence of your training activities to build a comprehensive record of your learning.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Your First Evidence</Button>
          </DialogTrigger>
          <DialogContent>
            <EvidenceForm 
              onAddEvidence={onAddEvidence}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EvidenceEmptyState;
