import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TrainingEvidenceItem } from '@/types/time-tracking';
import { trainingTypes } from './trainingEvidenceData';
import FileUpload from '@/components/shared/FileUpload';

interface EvidenceFormProps {
  onAddEvidence: (evidence: Omit<TrainingEvidenceItem, 'id'>, files: File[]) => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

const EvidenceForm = ({ onAddEvidence, isUploading, setIsUploading }: EvidenceFormProps) => {
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState('');
  const [date, setDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [hours, setHours] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddEvidence(
      {
        title,
        type,
        date,
        description,
        files: selectedFiles.map((f) => f.name),
      },
      selectedFiles
    );

    // Reset form
    setTitle('');
    setType('');
    setDate('');
    setDescription('');
    setSelectedFiles([]);
    setHours('');
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="evidence-title" className="text-[13px] text-white/85">
          Title
        </Label>
        <Input
          id="evidence-title"
          placeholder="Brief title of your training activity"
          required
          className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="training-type" className="text-[13px] text-white/85">
            Training type
          </Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="training-type" className="h-11 touch-manipulation">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {trainingTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="training-date" className="text-[13px] text-white/85">
            Date
          </Label>
          <Input
            id="training-date"
            type="date"
            required
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="training-description" className="text-[13px] text-white/85">
          Description
        </Label>
        <Textarea
          id="training-description"
          placeholder="Describe what you learned and how it relates to your apprenticeship"
          required
          className="min-h-[120px] text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500/20"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[13px] text-white/85">Upload evidence files</Label>
        <FileUpload
          onFileSelect={handleFileSelect}
          selectedFiles={selectedFiles}
          onRemoveFile={handleRemoveFile}
          multiple={true}
          acceptedTypes=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          maxSize={10}
          disabled={isUploading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hours-spent" className="text-[13px] text-white/85">
          Hours spent
        </Label>
        <Input
          id="hours-spent"
          type="number"
          min="0.5"
          step="0.5"
          placeholder="E.g., 3.5"
          required
          className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <p className="text-[11px] text-white/55">
          This will be added to your off-the-job training hours total
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Add to training record'}
        </Button>
      </div>
    </form>
  );
};

export default EvidenceForm;
