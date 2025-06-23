
import { useState } from "react";
import { TimeEntry } from "@/types/time-tracking";
import { PortfolioCategory } from "@/types/portfolio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useUniversalPortfolio } from "@/hooks/portfolio/useUniversalPortfolio";

interface TimeEntryToPortfolioDialogProps {
  timeEntry: TimeEntry;
  categories: PortfolioCategory[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (portfolioData: any) => void;
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
  const { assignSmartCategory, generateSmartSkills } = useUniversalPortfolio();
  
  // Create universal activity data for smart suggestions
  const universalActivity = {
    title: timeEntry.activity,
    description: timeEntry.notes || 'Off-the-job training activity',
    activityType: timeEntry.isQuiz ? 'quiz' : 'time-entry' as const,
    timeSpent: timeEntry.duration,
    date: timeEntry.date
  };

  // Get smart suggestions
  const suggestedCategory = assignSmartCategory(universalActivity);
  const suggestedSkills = generateSmartSkills(universalActivity);

  const [formData, setFormData] = useState({
    title: timeEntry.activity,
    description: timeEntry.notes || '',
    categoryId: suggestedCategory.id,
    skills: suggestedSkills,
    reflection: `Completed ${timeEntry.activity} as part of my off-the-job training. This activity has contributed to my professional development and enhanced my understanding of electrical practices.`,
    learningOutcomes: [
      'Applied practical skills in real-world context',
      'Enhanced technical competency'
    ],
    assessmentCriteria: [
      'Demonstrated safe working practices',
      'Applied appropriate techniques and methods'
    ],
    tags: [timeEntry.isQuiz ? 'quiz' : 'practical-work', 'off-the-job-training']
  });

  const [newSkill, setNewSkill] = useState("");
  const [newLearningOutcome, setNewLearningOutcome] = useState("");
  const [newAssessmentCriteria, setNewAssessmentCriteria] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddLearningOutcome = () => {
    if (newLearningOutcome.trim() && !formData.learningOutcomes.includes(newLearningOutcome.trim())) {
      setFormData(prev => ({
        ...prev,
        learningOutcomes: [...prev.learningOutcomes, newLearningOutcome.trim()]
      }));
      setNewLearningOutcome("");
    }
  };

  const handleRemoveLearningOutcome = (outcomeToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      learningOutcomes: prev.learningOutcomes.filter(outcome => outcome !== outcomeToRemove)
    }));
  };

  const handleAddAssessmentCriteria = () => {
    if (newAssessmentCriteria.trim() && !formData.assessmentCriteria.includes(newAssessmentCriteria.trim())) {
      setFormData(prev => ({
        ...prev,
        assessmentCriteria: [...prev.assessmentCriteria, newAssessmentCriteria.trim()]
      }));
      setNewAssessmentCriteria("");
    }
  };

  const handleRemoveAssessmentCriteria = (criteriaToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      assessmentCriteria: prev.assessmentCriteria.filter(criteria => criteria !== criteriaToRemove)
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
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
          <DialogTitle>Add Time Entry to Portfolio</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Smart suggestions notice */}
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-3">
            <p className="text-sm text-elec-yellow">
              💡 Smart suggestions have been applied based on your activity content. You can modify these as needed.
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Portfolio Entry Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-elec-gray"
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
              className="bg-elec-gray min-h-[80px]"
              placeholder="Describe what you did and what you learned..."
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.categoryId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
            >
              <SelectTrigger className="bg-elec-gray">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills Demonstrated</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-400" 
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                className="bg-elec-gray"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <Button type="button" onClick={handleAddSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-2">
            <Label>Learning Outcomes</Label>
            <div className="space-y-1 mb-2">
              {formData.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="flex-1">{outcome}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-400" 
                    onClick={() => handleRemoveLearningOutcome(outcome)}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newLearningOutcome}
                onChange={(e) => setNewLearningOutcome(e.target.value)}
                placeholder="Add learning outcome..."
                className="bg-elec-gray"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLearningOutcome())}
              />
              <Button type="button" onClick={handleAddLearningOutcome} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Reflection */}
          <div className="space-y-2">
            <Label htmlFor="reflection">Reflection</Label>
            <Textarea
              id="reflection"
              value={formData.reflection}
              onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
              className="bg-elec-gray min-h-[100px]"
              placeholder="Reflect on what you learned and how it applies to your role..."
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Adding to Portfolio..." : "Add to Portfolio"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TimeEntryToPortfolioDialog;
