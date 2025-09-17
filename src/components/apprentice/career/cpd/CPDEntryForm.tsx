
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Save, Upload, AlertCircle } from "lucide-react";
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
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">Loading CPD system...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Professional Body Status */}
      {(!activeMembership || memberships.length === 0) && (
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-amber-200">
            {memberships.length === 0 
              ? "Please set up your professional body membership in settings to enable CPD tracking."
              : "No active professional body selected. CPD entries will be saved but may not count towards compliance."}
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-elec-yellow" />
            Log CPD Activity
          </CardTitle>
          {activeMembership && (
            <p className="text-sm text-muted-foreground">
              Recording for {activeMembership.professional_body?.name}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Activity Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Activity Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., BS 7671 18th Edition Update Course"
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                  required
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-elec-dark border-elec-yellow/20",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
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
                <Label htmlFor="hours">Hours *</Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.5"
                  min="0"
                  value={formData.hours}
                  onChange={(e) => handleInputChange("hours", e.target.value)}
                  placeholder="e.g., 3.5"
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)} required>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Activity Type */}
              <div className="space-y-2">
                <Label>Activity Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)} required>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the activity and what was covered..."
                className="bg-elec-dark border-elec-yellow/20 text-white"
                rows={3}
              />
            </div>

            {/* Learning Outcomes */}
            <div className="space-y-2">
              <Label htmlFor="learningOutcomes">Learning Outcomes</Label>
              <Textarea
                id="learningOutcomes"
                value={formData.learningOutcomes}
                onChange={(e) => handleInputChange("learningOutcomes", e.target.value)}
                placeholder="What did you learn? How will this benefit your professional development?"
                className="bg-elec-dark border-elec-yellow/20 text-white"
                rows={3}
              />
            </div>


            <Button 
              type="submit" 
              disabled={isSubmitting || !date || !formData.title || !formData.hours || !formData.category || !formData.type}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-amber-400 disabled:opacity-50"
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
