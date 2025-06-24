
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, FileText } from "lucide-react";
import { PortfolioCategory } from "@/types/portfolio";

interface PortfolioEntryFormProps {
  categories: PortfolioCategory[];
  onSubmit: (entryData: any) => void;
  onCancel: () => void;
}

const PortfolioEntryForm = ({ categories, onSubmit, onCancel }: PortfolioEntryFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: null as PortfolioCategory | null,
    skills: [] as string[],
    reflection: "",
    learningOutcomes: [] as string[],
    assessmentCriteria: [] as string[],
    timeSpent: 0,
    selfAssessment: 3,
    tags: [] as string[]
  });

  const [newSkill, setNewSkill] = useState("");
  const [newLearningOutcome, setNewLearningOutcome] = useState("");
  const [newCriteria, setNewCriteria] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) return;

    const entryData = {
      ...formData,
      evidenceFiles: [],
      awardingBodyStandards: []
    };

    onSubmit(entryData);
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

  const addLearningOutcome = () => {
    if (newLearningOutcome.trim() && !formData.learningOutcomes.includes(newLearningOutcome.trim())) {
      setFormData(prev => ({
        ...prev,
        learningOutcomes: [...prev.learningOutcomes, newLearningOutcome.trim()]
      }));
      setNewLearningOutcome("");
    }
  };

  const removeLearningOutcome = (outcome: string) => {
    setFormData(prev => ({
      ...prev,
      learningOutcomes: prev.learningOutcomes.filter(o => o !== outcome)
    }));
  };

  const addCriteria = () => {
    if (newCriteria.trim() && !formData.assessmentCriteria.includes(newCriteria.trim())) {
      setFormData(prev => ({
        ...prev,
        assessmentCriteria: [...prev.assessmentCriteria, newCriteria.trim()]
      }));
      setNewCriteria("");
    }
  };

  const removeCriteria = (criteria: string) => {
    setFormData(prev => ({
      ...prev,
      assessmentCriteria: prev.assessmentCriteria.filter(c => c !== criteria)
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <FileText className="h-5 w-5" />
            Add Portfolio Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">Entry Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a descriptive title for this portfolio entry"
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what you did and what you learned"
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-white">Category</Label>
                <Select onValueChange={(value) => {
                  const category = categories.find(c => c.id === value);
                  setFormData(prev => ({ ...prev, category }));
                }}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/30 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/30">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id} className="text-white">
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Skills */}
            <div>
              <Label className="text-white">Skills Demonstrated</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div>
              <Label className="text-white">Learning Outcomes</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newLearningOutcome}
                  onChange={(e) => setNewLearningOutcome(e.target.value)}
                  placeholder="Add a learning outcome"
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLearningOutcome())}
                />
                <Button type="button" onClick={addLearningOutcome} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.learningOutcomes.map((outcome) => (
                  <Badge key={outcome} variant="secondary" className="bg-blue-500/20 text-blue-400">
                    {outcome}
                    <button
                      type="button"
                      onClick={() => removeLearningOutcome(outcome)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Assessment Criteria */}
            <div>
              <Label className="text-white">Assessment Criteria</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newCriteria}
                  onChange={(e) => setNewCriteria(e.target.value)}
                  placeholder="Add assessment criteria"
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCriteria())}
                />
                <Button type="button" onClick={addCriteria} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.assessmentCriteria.map((criteria) => (
                  <Badge key={criteria} variant="secondary" className="bg-green-500/20 text-green-400">
                    {criteria}
                    <button
                      type="button"
                      onClick={() => removeCriteria(criteria)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Time and Self Assessment */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeSpent" className="text-white">Time Spent (minutes)</Label>
                <Input
                  id="timeSpent"
                  type="number"
                  value={formData.timeSpent}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeSpent: parseInt(e.target.value) || 0 }))}
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="selfAssessment" className="text-white">Self Assessment (1-5)</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, selfAssessment: parseInt(value) }))}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/30 text-white">
                    <SelectValue placeholder={formData.selfAssessment.toString()} />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/30">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()} className="text-white">
                        {rating} - {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reflection */}
            <div>
              <Label htmlFor="reflection" className="text-white">Reflection</Label>
              <Textarea
                id="reflection"
                value={formData.reflection}
                onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
                placeholder="Reflect on what you learned, what went well, and what you could improve"
                className="bg-elec-dark border-elec-yellow/30 text-white"
                rows={4}
              />
            </div>

            {/* Tags */}
            <div>
              <Label className="text-white">Tags</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Add Entry
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioEntryForm;
