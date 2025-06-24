
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { PortfolioEntry, PortfolioCategory } from "@/types/portfolio";

export interface PortfolioEntryFormProps {
  categories: PortfolioCategory[];
  initialData?: PortfolioEntry;
  onSubmit: (data: Partial<PortfolioEntry>) => void;
  onCancel: () => void;
}

const PortfolioEntryForm = ({ categories, initialData, onSubmit, onCancel }: PortfolioEntryFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    categoryId: initialData?.category.id || "",
    reflection: initialData?.reflection || "",
    skills: initialData?.skills || [],
    tags: initialData?.tags || [],
    assessmentCriteria: initialData?.assessmentCriteria || [],
    learningOutcomes: initialData?.learningOutcomes || [],
    supervisorFeedback: initialData?.supervisorFeedback || "",
    selfAssessment: initialData?.selfAssessment || 3,
    status: initialData?.status || "draft" as const,
    timeSpent: initialData?.timeSpent || 0,
    awardingBodyStandards: initialData?.awardingBodyStandards || []
  });

  const [newSkill, setNewSkill] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newCriteria, setNewCriteria] = useState("");
  const [newOutcome, setNewOutcome] = useState("");
  const [newStandard, setNewStandard] = useState("");

  const handleAddItem = (field: string, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field as keyof typeof prev] as string[], value.trim()]
      }));
      setter("");
    }
  };

  const handleRemoveItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
    if (!selectedCategory) return;

    const submitData: Partial<PortfolioEntry> = {
      ...formData,
      category: selectedCategory,
      dateCreated: initialData?.dateCreated || new Date().toISOString(),
      evidenceFiles: initialData?.evidenceFiles || [],
      ...(formData.status === 'completed' && !initialData?.dateCompleted && {
        dateCompleted: new Date().toISOString()
      })
    };

    onSubmit(submitData);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Portfolio Entry" : "Create New Portfolio Entry"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter portfolio entry title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what you did and what you learned"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reflection">Reflection *</Label>
            <Textarea
              id="reflection"
              value={formData.reflection}
              onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
              placeholder="Reflect on your learning experience, challenges, and achievements"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSpent">Time Spent (minutes)</Label>
              <Input
                id="timeSpent"
                type="number"
                min="0"
                value={formData.timeSpent}
                onChange={(e) => setFormData(prev => ({ ...prev, timeSpent: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="selfAssessment">Self Assessment (1-5)</Label>
            <Select value={formData.selfAssessment.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, selfAssessment: parseInt(value) }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Poor</SelectItem>
                <SelectItem value="2">2 - Below Average</SelectItem>
                <SelectItem value="3">3 - Average</SelectItem>
                <SelectItem value="4">4 - Good</SelectItem>
                <SelectItem value="5">5 - Excellent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Skills Section */}
          <div className="space-y-2">
            <Label>Skills Demonstrated</Label>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('skills', newSkill, setNewSkill))}
              />
              <Button type="button" onClick={() => handleAddItem('skills', newSkill, setNewSkill)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer">
                  {skill}
                  <X 
                    className="h-3 w-3 ml-1" 
                    onClick={() => handleRemoveItem('skills', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('tags', newTag, setNewTag))}
              />
              <Button type="button" onClick={() => handleAddItem('tags', newTag, setNewTag)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer">
                  {tag}
                  <X 
                    className="h-3 w-3 ml-1" 
                    onClick={() => handleRemoveItem('tags', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Assessment Criteria Section */}
          <div className="space-y-2">
            <Label>Assessment Criteria Met</Label>
            <div className="flex gap-2">
              <Input
                value={newCriteria}
                onChange={(e) => setNewCriteria(e.target.value)}
                placeholder="Add assessment criteria"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('assessmentCriteria', newCriteria, setNewCriteria))}
              />
              <Button type="button" onClick={() => handleAddItem('assessmentCriteria', newCriteria, setNewCriteria)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.assessmentCriteria.map((criteria, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer">
                  {criteria}
                  <X 
                    className="h-3 w-3 ml-1" 
                    onClick={() => handleRemoveItem('assessmentCriteria', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Outcomes Section */}
          <div className="space-y-2">
            <Label>Learning Outcomes</Label>
            <div className="flex gap-2">
              <Input
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                placeholder="Add learning outcome"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('learningOutcomes', newOutcome, setNewOutcome))}
              />
              <Button type="button" onClick={() => handleAddItem('learningOutcomes', newOutcome, setNewOutcome)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.learningOutcomes.map((outcome, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer">
                  {outcome}
                  <X 
                    className="h-3 w-3 ml-1" 
                    onClick={() => handleRemoveItem('learningOutcomes', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Awarding Body Standards Section */}
          <div className="space-y-2">
            <Label>Awarding Body Standards</Label>
            <div className="flex gap-2">
              <Input
                value={newStandard}
                onChange={(e) => setNewStandard(e.target.value)}
                placeholder="Add awarding body standard"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('awardingBodyStandards', newStandard, setNewStandard))}
              />
              <Button type="button" onClick={() => handleAddItem('awardingBodyStandards', newStandard, setNewStandard)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.awardingBodyStandards.map((standard, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer">
                  {standard}
                  <X 
                    className="h-3 w-3 ml-1" 
                    onClick={() => handleRemoveItem('awardingBodyStandards', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supervisorFeedback">Supervisor Feedback</Label>
            <Textarea
              id="supervisorFeedback"
              value={formData.supervisorFeedback}
              onChange={(e) => setFormData(prev => ({ ...prev, supervisorFeedback: e.target.value }))}
              placeholder="Enter supervisor feedback (if available)"
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Entry" : "Create Entry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioEntryForm;
