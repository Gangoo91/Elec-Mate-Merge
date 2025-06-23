
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { TimeEntry } from "@/types/time-tracking";
import { PortfolioCategory } from "@/types/portfolio";

interface TimeEntryToPortfolioDialogProps {
  timeEntry: TimeEntry;
  categories: PortfolioCategory[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (portfolioData: {
    title: string;
    description: string;
    categoryId: string;
    skills: string[];
    reflection: string;
    learningOutcomes: string[];
    assessmentCriteria: string[];
    tags: string[];
  }) => void;
  isLoading?: boolean;
}

const TimeEntryToPortfolioDialog = ({
  timeEntry,
  categories,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}: TimeEntryToPortfolioDialogProps) => {
  const [formData, setFormData] = useState({
    title: timeEntry.activity || '',
    description: timeEntry.notes || '',
    categoryId: '',
    skills: [] as string[],
    reflection: '',
    learningOutcomes: [] as string[],
    assessmentCriteria: [] as string[],
    tags: [] as string[]
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLearningOutcome, setNewLearningOutcome] = useState('');
  const [newAssessmentCriterion, setNewAssessmentCriterion] = useState('');
  const [newTag, setNewTag] = useState('');

  const addItem = (type: 'skills' | 'learningOutcomes' | 'assessmentCriteria' | 'tags', value: string, setter: (value: string) => void) => {
    if (value.trim() && !formData[type].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      setter('');
    }
  };

  const removeItem = (type: 'skills' | 'learningOutcomes' | 'assessmentCriteria' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.categoryId) {
      return;
    }
    onSubmit(formData);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add to Portfolio</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Convert your time entry "{timeEntry.activity}" ({formatDuration(timeEntry.duration)}) into a portfolio entry.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Portfolio Entry Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter portfolio entry title"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.categoryId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
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
                placeholder="Describe what you did during this training session"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="reflection">Reflection</Label>
              <Textarea
                id="reflection"
                value={formData.reflection}
                onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
                placeholder="Reflect on what you learned and how you can apply it"
                rows={3}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label>Skills Demonstrated</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skills', newSkill, setNewSkill))}
              />
              <Button 
                type="button" 
                size="sm" 
                onClick={() => addItem('skills', newSkill, setNewSkill)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeItem('skills', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div>
            <Label>Learning Outcomes</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newLearningOutcome}
                onChange={(e) => setNewLearningOutcome(e.target.value)}
                placeholder="Add a learning outcome"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('learningOutcomes', newLearningOutcome, setNewLearningOutcome))}
              />
              <Button 
                type="button" 
                size="sm" 
                onClick={() => addItem('learningOutcomes', newLearningOutcome, setNewLearningOutcome)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.learningOutcomes.map((outcome, index) => (
                <Badge key={index} variant="outline" className="gap-1">
                  {outcome}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeItem('learningOutcomes', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Assessment Criteria */}
          <div>
            <Label>Assessment Criteria Met</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newAssessmentCriterion}
                onChange={(e) => setNewAssessmentCriterion(e.target.value)}
                placeholder="Add assessment criteria"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('assessmentCriteria', newAssessmentCriterion, setNewAssessmentCriterion))}
              />
              <Button 
                type="button" 
                size="sm" 
                onClick={() => addItem('assessmentCriteria', newAssessmentCriterion, setNewAssessmentCriterion)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.assessmentCriteria.map((criteria, index) => (
                <Badge key={index} variant="outline" className="gap-1">
                  {criteria}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeItem('assessmentCriteria', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('tags', newTag, setNewTag))}
              />
              <Button 
                type="button" 
                size="sm" 
                onClick={() => addItem('tags', newTag, setNewTag)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  #{tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeItem('tags', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.title.trim() || !formData.categoryId}>
              {isLoading ? "Adding..." : "Add to Portfolio"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TimeEntryToPortfolioDialog;
