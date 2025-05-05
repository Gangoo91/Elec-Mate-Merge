
import { TrainingEvidenceItem } from "@/types/time-tracking";
import EvidenceItem from "./EvidenceItem";
import EvidenceEmptyState from "./EvidenceEmptyState";
import { useTrainingEvidence } from "@/hooks/time-tracking/useTrainingEvidence";

interface EvidenceListProps {
  items: TrainingEvidenceItem[];
  onDelete: (id: string) => void;
}

const EvidenceList = ({ items, onDelete }: EvidenceListProps) => {
  const { addEvidence, isUploading, setIsUploading } = useTrainingEvidence();

  if (items.length === 0) {
    return (
      <EvidenceEmptyState 
        onAddEvidence={addEvidence} 
        isUploading={isUploading}
        setIsUploading={setIsUploading}
      />
    );
  }
  
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <EvidenceItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default EvidenceList;
