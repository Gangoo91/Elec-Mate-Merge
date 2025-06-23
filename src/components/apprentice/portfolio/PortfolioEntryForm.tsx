
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Plus } from "lucide-react";
import { PortfolioCategory, PortfolioEntry, PortfolioFile } from "@/types/portfolio";

interface PortfolioEntryFormProps {
  categories: PortfolioCategory[];
  onSubmit: (entryData: Omit<PortfolioEntry, 'id' | 'dateCreated'>) => void;
  onCancel: () => void;
  initialData?: PortfolioEntry;
}

const PortfolioEntryForm = ({ categories, onSubmit, onCancel, initialData }: PortfolioEntryFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || categories[0],
    skills: initialData?.skills || [],
    reflection: initialData?.reflection || "",
    evidenceFiles: initialData?.evidenceFiles || [],
    tags: initialData?.tags || [],
    assessmentCriteria: initialData?.assessmentCriteria || [],
    learningOutcomes: initialData?.learningOutcomes || [],
    selfAssessment: initialData?.selfAssessment || 3,
    timeSpent: initialData?.timeSpent || 0,
    awardingBodyStandards: initialData?.awardingBodyStandards || [],
    status: initialData?.status || 'draft' as const
  });

  const [newSkill, setNewSkill] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newCriterion, setNewCriterion] = useState("");
  const [newOutcome, setNewOutcome] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock file handling - in a real app, you'd upload these
    const mockFiles: PortfolioFile[] = files ? Array.from(files).map((file, index) => ({
      id: `file_${Date.now()}_${index}`,
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString()
    })) : [];

    onSubmit({
      ...formData,
      evidenceFiles: [...formData.evidenceFiles, ...mockFiles]
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addCriterion = () => {
    if (newCriterion.trim() && !formData.assessmentCriteria.includes(newCriterion.trim())) {
      setFormData(prev => ({
        ...prev,
        assessmentCriteria: [...prev.assessmentCriteria, newCriterion.trim()]
      }));
      setNewCriterion("");
    }
  };

  const addOutcome = () => {
    if (newOutcome.trim() && !formData.learningOutcomes.includes(newOutcome.trim())) {
      setFormData(prev => ({
        ...prev,
        learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
      }));
      setNewOutcome("");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Portfolio Entry' : 'Add New Portfolio Entry'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Entry Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Consumer Unit Installation Project"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category.id} 
                onValueChange={(value) => {
                  const category = categories.find(c => c.id === value);
                  if (category) {
                    setFormData(prev => ({ ...prev, category }));
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what you did, what you learned, and how it relates to your apprenticeship..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label>Skills Demonstrated</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="gap-1">
                  {skill}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div>
            <Label>Learning Outcomes</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                placeholder="Add a learning outcome..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
              />
              <Button type="button" onClick={addOutcome} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {formData.learningOutcomes.map((outcome, index) => (
                <div key={index} className="text-sm p-2 bg-elec-dark rounded border-l-2 border-elec-yellow">
                  {outcome}
                </div>
              ))}
            </div>
          </div>

          {/* Assessment & Reflection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="selfAssessment">Self Assessment (1-5)</Label>
              <Select 
                value={formData.selfAssessment.toString()} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, selfAssessment: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} - {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeSpent">Time Spent (minutes)</Label>
              <Input
                id="timeSpent"
                type="number"
                value={formData.timeSpent}
                onChange={(e) => setFormData(prev => ({ ...prev, timeSpent: parseInt(e.target.value) || 0 }))}
                placeholder="120"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="reflection">Reflection</Label>
            <Textarea
              id="reflection"
              value={formData.reflection}
              onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
              placeholder="What challenges did you face? What would you do differently? How has this contributed to your learning?"
              rows={4}
            />
          </div>

          {/* Evidence Files */}
          <div>
            <Label htmlFor="evidence">Evidence Files</Label>
            <Input
              id="evidence"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => setFiles(e.target.files)}
              className="mb-2"
            />
            <p className="text-xs text-muted-foreground">
              Upload photos, documents, or certificates that support this portfolio entry.
            </p>
            {formData.evidenceFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                {formData.evidenceFiles.map(file => (
                  <div key={file.id} className="text-sm p-2 bg-elec-dark rounded flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="outline" className="gap-1">
                  #{tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update Entry' : 'Add Entry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioEntryForm;
