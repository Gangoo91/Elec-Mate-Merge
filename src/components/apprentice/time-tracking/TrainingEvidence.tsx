import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import EvidenceList from './evidence/EvidenceList';
import { useTrainingEvidence } from '@/hooks/time-tracking/useTrainingEvidence';
import TrainingEvidenceDialog from './evidence/TrainingEvidenceDialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TrainingEvidence = () => {
  const { evidenceItems, addEvidence, deleteEvidence, isUploading, setIsUploading } =
    useTrainingEvidence();
  const [activeTab, setActiveTab] = useState('all');

  const filteredEvidence =
    activeTab === 'all'
      ? evidenceItems
      : evidenceItems.filter((item) => item.type.toLowerCase() === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Training evidence
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Upload and manage evidence of your off-the-job training activities
          </p>
        </div>
        <TrainingEvidenceDialog
          trigger={
            <Button className="gap-2 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
              <Upload className="h-4 w-4" />
              Add new evidence
            </Button>
          }
          title="Add Training Evidence"
          onAddEvidence={addEvidence}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
      </div>

      <div className="space-y-4">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full h-11 touch-manipulation">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All evidence</SelectItem>
            <SelectItem value="workshop">Workshops</SelectItem>
            <SelectItem value="site visit">Site visits</SelectItem>
            <SelectItem value="college session">College</SelectItem>
            <SelectItem value="online course">Online</SelectItem>
          </SelectContent>
        </Select>

        <EvidenceList items={filteredEvidence} onDelete={deleteEvidence} />
      </div>
    </div>
  );
};

export default TrainingEvidence;
