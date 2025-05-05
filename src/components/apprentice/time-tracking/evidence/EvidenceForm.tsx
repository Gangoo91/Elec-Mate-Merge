
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrainingEvidenceItem } from "@/types/time-tracking";
import { trainingTypes } from "./trainingEvidenceData";

interface EvidenceFormProps {
  onAddEvidence: (evidence: Omit<TrainingEvidenceItem, 'id'>) => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

const EvidenceForm = ({ onAddEvidence, isUploading, setIsUploading }: EvidenceFormProps) => {
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [date, setDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [files, setFiles] = React.useState<FileList | null>(null);
  const [hours, setHours] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Get file names from the FileList
    const fileNames: string[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }
    }
    
    // Simulate upload delay
    setTimeout(() => {
      onAddEvidence({
        title,
        type,
        date,
        description,
        files: fileNames
      });
      
      // Reset form
      setTitle("");
      setType("");
      setDate("");
      setDescription("");
      setFiles(null);
      setHours("");
      setIsUploading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="evidence-title">Title</Label>
        <Input 
          id="evidence-title" 
          placeholder="Brief title of your training activity" 
          required 
          className="bg-elec-dark"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="training-type">Training Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="training-type" className="bg-elec-dark">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {trainingTypes.map(type => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="training-date">Date</Label>
          <Input 
            id="training-date" 
            type="date" 
            required 
            className="bg-elec-dark"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="training-description">Description</Label>
        <Textarea 
          id="training-description" 
          placeholder="Describe what you learned and how it relates to your apprenticeship" 
          required 
          className="min-h-[100px] bg-elec-dark"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="evidence-files">Upload Files</Label>
        <Input 
          id="evidence-files" 
          type="file" 
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
          required 
          multiple
          className="bg-elec-dark"
          onChange={(e) => setFiles(e.target.files)}
        />
        <p className="text-xs text-muted-foreground">
          Upload photos, PDFs or documents that provide evidence of your training.
          Max size: 10MB per file
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="hours-spent">Hours Spent</Label>
        <Input 
          id="hours-spent" 
          type="number" 
          min="0.5" 
          step="0.5"
          placeholder="E.g., 3.5"  
          required 
          className="bg-elec-dark"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          This will be added to your off-the-job training hours total
        </p>
      </div>
      
      <Button type="submit" className="w-full" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Add to Training Record'}
      </Button>
    </form>
  );
};

export default EvidenceForm;
