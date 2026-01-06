
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Save, AlertCircle, BookOpen, Clock, Tag, FileText, Lightbulb } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useUnifiedCPD } from "@/hooks/cpd/useUnifiedCPD";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CPDEntryFormProps {
  onSuccess?: () => void;
}

const CPDEntryForm = ({ onSuccess }: CPDEntryFormProps = {}) => {
  const { addEntry, activeMembership, memberships, loading } = useUnifiedCPD();
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    hours: "",
    category: "",
    type: "",
    description: "",
    learningOutcomes: ""
  });

  const categories = [
    { id: "technical-skills", name: "Technical Skills" },
    { id: "regulations-standards", name: "Regulations & Standards" },
    { id: "safety-health", name: "Safety & Health" },
    { id: "business-commercial", name: "Business & Commercial" },
    { id: "professional-ethics", name: "Professional Ethics" },
    { id: "environmental-sustainability", name: "Environmental Sustainability" },
    { id: "digital-technology", name: "Digital Technology" },
    { id: "customer-service", name: "Customer Service" }
  ];

  const activityTypes = [
    { id: "formal-training", name: "Formal Training" },
    { id: "work-based-learning", name: "Work-based Learning" },
    { id: "self-directed-study", name: "Self-directed Study" },
    { id: "professional-activities", name: "Professional Activities" },
    { id: "conferences-seminars", name: "Conferences & Seminars" },
    { id: "mentoring", name: "Mentoring" },
    { id: "assessment-preparation", name: "Assessment Preparation" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.title || !formData.hours || !formData.category || !formData.type) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const entryData = {
        title: formData.title,
        description: formData.description,
        activity_type: formData.type,
        category: formData.category,
        hours: parseFloat(formData.hours),
        date_completed: date.toISOString().split('T')[0],
        learning_outcomes: formData.learningOutcomes ? [formData.learningOutcomes] : undefined
      };

      const result = await addEntry(entryData);
      
      if (result) {
        // Reset form
        setFormData({
          title: "",
          hours: "",
          category: "",
          type: "",
          description: "",
          learningOutcomes: ""
        });
        setDate(undefined);
        onSuccess?.();
      }
    } catch (error) {
      console.error('Error submitting CPD entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardContent className="p-8 text-center relative">
          <div className="animate-spin w-8 h-8 border-2 border-elec-yellow border-t-transparent rounded-full mx-auto mb-4" />
          <div className="text-white">Loading CPD system...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Professional Body Status */}
      {(!activeMembership || memberships.length === 0) && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <AlertCircle className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="font-medium text-amber-400 mb-1">Professional Body Required</p>
              <p className="text-sm text-white/70">
                {memberships.length === 0
                  ? "Please set up your professional body membership in settings to enable CPD tracking."
                  : "No active professional body selected. CPD entries will be saved but may not count towards compliance."}
              </p>
            </div>
          </div>
        </div>
      )}

      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Plus className="h-5 w-5 text-elec-yellow" />
            </div>
            Log CPD Activity
          </CardTitle>
          {activeMembership && (
            <p className="text-sm text-white/70 mt-2">
              Recording for <span className="text-elec-yellow font-medium">{activeMembership.professional_body?.name}</span>
            </p>
          )}
        </CardHeader>
        <CardContent className="relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Activity Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                  Activity Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., BS 7671 18th Edition Update Course"
                  className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-elec-yellow/50"
                  required
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-elec-yellow" />
                  Date Completed *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-11 justify-start text-left font-normal bg-white/5 border-white/20 hover:bg-white/10 hover:border-elec-yellow/30",
                        !date && "text-white/40"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-elec-yellow" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-elec-gray border-white/20">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Hours */}
              <div className="space-y-2">
                <Label htmlFor="hours" className="text-white flex items-center gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  Hours *
                </Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.5"
                  min="0"
                  value={formData.hours}
                  onChange={(e) => handleInputChange("hours", e.target.value)}
                  placeholder="e.g., 3.5"
                  className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-elec-yellow/50"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <Tag className="h-4 w-4 text-elec-yellow" />
                  Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)} required>
                  <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white focus:border-elec-yellow/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-white/20">
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Activity Type */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  Activity Type *
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)} required>
                  <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white focus:border-elec-yellow/50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-white/20">
                    {activityTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the activity and what was covered..."
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-elec-yellow/50 min-h-[100px]"
                rows={3}
              />
            </div>

            {/* Learning Outcomes */}
            <div className="space-y-2">
              <Label htmlFor="learningOutcomes" className="text-white flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-elec-yellow" />
                Learning Outcomes
              </Label>
              <Textarea
                id="learningOutcomes"
                value={formData.learningOutcomes}
                onChange={(e) => handleInputChange("learningOutcomes", e.target.value)}
                placeholder="What did you learn? How will this benefit your professional development?"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-elec-yellow/50 min-h-[100px]"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !date || !formData.title || !formData.hours || !formData.category || !formData.type}
              className="w-full h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation active:scale-95 transition-all font-medium"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save CPD Entry"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CPDEntryForm;
