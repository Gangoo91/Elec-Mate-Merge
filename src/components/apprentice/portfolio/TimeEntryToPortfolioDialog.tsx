
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimeEntry } from "@/types/time-tracking";
import { PortfolioCategory } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { UniversalActivityData } from "@/hooks/portfolio/useUniversalPortfolio";

interface TimeEntryToPortfolioDialogProps {
  timeEntry: TimeEntry;
  categories: PortfolioCategory[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const TimeEntryToPortfolioDialog = ({
  timeEntry,
  categories,
  isOpen,
  onClose,
  onSubmit,
  isLoading
}: TimeEntryToPortfolioDialogProps) => {
  const [formData, setFormData] = useState({
    title: timeEntry.activity,
    description: timeEntry.notes || "",
    categoryId: "",
    skills: [] as string[],
    reflection: "",
    learningOutcomes: [] as string[],
    assessmentCriteria: [] as string[],
    tags: [] as string[]
  });

  const [newSkill, setNewSkill] = useState("");
  const [newOutcome, setNewOutcome] = useState("");
  const [newCriterion, setNewCriterion] = useState("");
  const [newTag, setNewTag] = useState("");

  // Generate smart suggestions based on time entry
  const generateSmartSuggestions = () => {
    const activity = timeEntry.activity.toLowerCase();
    const notes = timeEntry.notes?.toLowerCase() || "";
    
    // Smart title suggestion
    const smartTitle = `${timeEntry.activity} - ${new Date(timeEntry.date).toLocaleDateString()}`;
    
    // Smart description based on activity type
    let smartDescription = "";
    if (timeEntry.isQuiz && timeEntry.score !== undefined) {
      smartDescription = `Completed quiz with ${Math.round((timeEntry.score / (timeEntry.totalQuestions || 1)) * 100)}% score. ${timeEntry.notes || ""}`;
    } else {
      smartDescription = `Completed ${timeEntry.activity.toLowerCase()} activity lasting ${Math.floor(timeEntry.duration / 60)}h ${timeEntry.duration % 60}m. ${timeEntry.notes || ""}`;
    }

    const activityData: UniversalActivityData = {
      title: smartTitle,
      description: smartDescription,
      activityType: "time-entry" as const,
      timeSpent: timeEntry.duration,
      date: timeEntry.date
    };

    return activityData;
  };

  const handleSmartFill = () => {
    const suggestions = generateSmartSuggestions();
    setFormData(prev => ({
      ...prev,
      title: suggestions.title,
      description: suggestions.description
    }));
  };

  const addItem = (type: 'skills' | 'learningOutcomes' | 'assessmentCriteria' | 'tags', value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      setter("");
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
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add to Portfolio</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Convert this time entry into a detailed portfolio entry
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Smart Fill Button */}
          <div className="flex justify-end">
            <Button type="button" variant="outline" size="sm" onClick={handleSmartFill}>
              Smart Fill
            </Button>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter portfolio entry title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what you did and what you learned"
              rows={3}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
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

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills Demonstrated</Label>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skills', newSkill, setNewSkill))}
              />
              <Button type="button" onClick={() => addItem('skills', newSkill, setNewSkill)}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {skill}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem('skills', index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Reflection */}
          <div className="space-y-2">
            <Label htmlFor="reflection">Reflection</Label>
            <Textarea
              id="reflection"
              value={formData.reflection}
              onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
              placeholder="Reflect on what you learned and how you can improve"
              rows={3}
            />
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-2">
            <Label>Learning Outcomes</Label>
            <div className="flex gap-2">
              <Input
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                placeholder="Add a learning outcome"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('learningOutcomes', newOutcome, setNewOutcome))}
              />
              <Button type="button" onClick={() => addItem('learningOutcomes', newOutcome, setNewOutcome)}>Add</Button>
            </div>
            <div className="space-y-1">
              {formData.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                  {outcome}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem('learningOutcomes', index)} />
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Criteria */}
          <div className="space-y-2">
            <Label>Assessment Criteria Met</Label>
            <div className="flex gap-2">
              <Input
                value={newCriterion}
                onChange={(e) => setNewCriterion(e.target.value)}
                placeholder="Add assessment criteria"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('assessmentCriteria', newCriterion, setNewCriterion))}
              />
              <Button type="button" onClick={() => addItem('assessmentCriteria', newCriterion, setNewCriterion)}>Add</Button>
            </div>
            <div className="space-y-1">
              {formData.assessmentCriteria.map((criterion, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                  {criterion}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem('assessmentCriteria', index)} />
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('tags', newTag, setNewTag))}
              />
              <Button type="button" onClick={() => addItem('tags', newTag, setNewTag)}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="gap-1">
                  #{tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem('tags', index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.title || !formData.description}>
              {isLoading ? "Adding..." : "Add to Portfolio"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TimeEntryToPortfolioDialog;
