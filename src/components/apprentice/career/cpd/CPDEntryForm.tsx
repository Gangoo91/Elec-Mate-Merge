
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Save } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CPDEntryForm = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    activity: "",
    hours: "",
    category: "",
    type: "",
    provider: "",
    description: "",
    learningOutcomes: "",
    certificate: ""
  });

  const categories = [
    "Technical Skills",
    "Regulations & Standards",
    "Health & Safety",
    "Management & Leadership",
    "Customer Service",
    "Environmental Awareness",
    "Quality Systems"
  ];

  const activityTypes = [
    "Formal Learning",
    "Work-based Learning",
    "Self-directed Learning",
    "Professional Activity"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would save to the database
    console.log("CPD Entry:", { ...formData, date });
    // Reset form
    setFormData({
      activity: "",
      hours: "",
      category: "",
      type: "",
      provider: "",
      description: "",
      learningOutcomes: "",
      certificate: ""
    });
    setDate(undefined);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-elec-yellow" />
            Log CPD Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Activity Name */}
              <div className="space-y-2">
                <Label htmlFor="activity">Activity Name</Label>
                <Input
                  id="activity"
                  value={formData.activity}
                  onChange={(e) => handleInputChange("activity", e.target.value)}
                  placeholder="e.g., BS 7671 Update Course"
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
                <Label htmlFor="hours">Hours</Label>
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
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Activity Type */}
              <div className="space-y-2">
                <Label>Activity Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Provider */}
              <div className="space-y-2">
                <Label htmlFor="provider">Provider / Organisation</Label>
                <Input
                  id="provider"
                  value={formData.provider}
                  onChange={(e) => handleInputChange("provider", e.target.value)}
                  placeholder="e.g., IET, NICEIC, Company Name"
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                />
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

            {/* Certificate */}
            <div className="space-y-2">
              <Label htmlFor="certificate">Certificate / Evidence</Label>
              <Input
                id="certificate"
                value={formData.certificate}
                onChange={(e) => handleInputChange("certificate", e.target.value)}
                placeholder="Certificate number or reference to evidence"
                className="bg-elec-dark border-elec-yellow/20 text-white"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-elec-yellow text-elec-dark hover:bg-amber-400"
            >
              <Save className="mr-2 h-4 w-4" />
              Save CPD Entry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CPDEntryForm;
