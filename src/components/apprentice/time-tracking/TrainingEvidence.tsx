
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import EvidenceForm from "./evidence/EvidenceForm";
import EvidenceEmptyState from "./evidence/EvidenceEmptyState";
import EvidenceList from "./evidence/EvidenceList";
import { useTrainingEvidence } from "@/hooks/time-tracking/useTrainingEvidence";
import { TrainingEvidenceItem } from "@/types/time-tracking";
import { ScrollArea } from "@/components/ui/scroll-area";
import TrainingEvidenceDialog from "./evidence/TrainingEvidenceDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TrainingEvidence = () => {
  const { evidenceItems, addEvidence, deleteEvidence, isUploading, setIsUploading } = useTrainingEvidence();
  const [activeTab, setActiveTab] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredEvidence = activeTab === "all" 
    ? evidenceItems 
    : evidenceItems.filter(item => item.type.toLowerCase() === activeTab);

  const handleAddEvidence = (evidence: Omit<TrainingEvidenceItem, 'id'>) => {
    addEvidence(evidence);
    // Close dialog after successfully adding evidence
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Training Evidence</h3>
          <p className="text-sm text-muted-foreground">
            Upload and manage evidence of your off-the-job training activities
          </p>
        </div>
        <TrainingEvidenceDialog 
          trigger={
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Add New Evidence
            </Button>
          }
          title="Add Training Evidence"
          onAddEvidence={addEvidence}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
      </div>

      <div className="space-y-4">
        <div className="w-full">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full bg-elec-dark">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Evidence</SelectItem>
              <SelectItem value="workshop">Workshops</SelectItem>
              <SelectItem value="site visit">Site Visits</SelectItem>
              <SelectItem value="college session">College</SelectItem>
              <SelectItem value="online course">Online</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <EvidenceList items={filteredEvidence} onDelete={deleteEvidence} />
      </div>
    </div>
  );
};

export default TrainingEvidence;
