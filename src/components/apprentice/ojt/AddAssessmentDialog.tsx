
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Award } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAssessment: (assessment: any) => void;
}

// Real electrical assessments that apprentices would complete
const REAL_ASSESSMENTS = [
  {
    title: "BS 7671:2018 18th Edition Wiring Regulations",
    unitCode: "C&G 2382-18",
    type: "Written",
    description: "Knowledge test covering current UK wiring regulations and electrical safety requirements"
  },
  {
    title: "Inspection and Testing of Electrical Installations",
    unitCode: "C&G 2391-52",
    type: "Practical",
    description: "Practical assessment of inspection and testing procedures using calibrated test equipment"
  },
  {
    title: "Initial Verification and Certification",
    unitCode: "C&G 2391-10",
    type: "Written",
    description: "Written examination on initial verification procedures and certification requirements"
  },
  {
    title: "Safe Isolation of Electrical Circuits",
    unitCode: "C&G 2391-50",
    type: "Practical",
    description: "Practical demonstration of safe isolation procedures for electrical circuits"
  },
  {
    title: "Electrical Installation Work (Construction)",
    unitCode: "BTEC Unit 1",
    type: "Portfolio",
    description: "Portfolio assessment covering electrical installation principles and construction methods"
  },
  {
    title: "Electrical Systems Design",
    unitCode: "BTEC Unit 5",
    type: "Written",
    description: "Assessment of electrical system design principles and load calculations"
  },
  {
    title: "Motor Control Circuits",
    unitCode: "NVQ Unit 3.1",
    type: "Practical",
    description: "Practical assessment of motor control circuit installation and commissioning"
  },
  {
    title: "Emergency Lighting Systems",
    unitCode: "C&G 2391-651",
    type: "Written",
    description: "Knowledge assessment of emergency lighting design, installation and testing"
  },
  {
    title: "Fire Alarm Systems",
    unitCode: "C&G 2391-661",
    type: "Written",
    description: "Assessment covering fire alarm system design principles and BS 5839 compliance"
  },
  {
    title: "Solar PV Installation",
    unitCode: "C&G 2399",
    type: "Practical",
    description: "Practical assessment of solar photovoltaic system installation and commissioning"
  },
  {
    title: "PAT Testing (Portable Appliance Testing)",
    unitCode: "C&G 2377-22",
    type: "Practical",
    description: "Practical assessment of portable appliance testing procedures and documentation"
  },
  {
    title: "Health and Safety in Electrical Installation",
    unitCode: "NVQ Unit 1.1",
    type: "Written",
    description: "Assessment of health and safety requirements specific to electrical work"
  },
  {
    title: "Three-Phase Installation Work",
    unitCode: "NVQ Unit 4.2",
    type: "Practical",
    description: "Practical assessment of three-phase electrical installation and testing"
  },
  {
    title: "Electrical Fault Diagnosis",
    unitCode: "C&G 2391-53",
    type: "Practical",
    description: "Practical assessment of electrical fault finding and diagnostic techniques"
  },
  {
    title: "Electrical Installation Design",
    unitCode: "C&G 2396",
    type: "Written",
    description: "Design project assessment covering electrical installation design and calculations"
  }
];

const ASSESSMENT_TYPES = [
  { value: "Written", label: "Written Examination" },
  { value: "Practical", label: "Practical Assessment" },
  { value: "Portfolio", label: "Portfolio Assessment" },
  { value: "Observation", label: "Workplace Observation" },
  { value: "Oral", label: "Oral Assessment" },
  { value: "Project", label: "Project Work" }
];

const AddAssessmentDialog = ({ open, onOpenChange, onAddAssessment }: AddAssessmentDialogProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [title, setTitle] = useState("");
  const [unitCode, setUnitCode] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date>();

  const handleTemplateSelect = (templateTitle: string) => {
    const template = REAL_ASSESSMENTS.find(a => a.title === templateTitle);
    if (template) {
      setTitle(template.title);
      setUnitCode(template.unitCode);
      setType(template.type);
      setDescription(template.description);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !type || !dueDate) return;

    onAddAssessment({
      title,
      unitCode,
      type,
      description,
      dueDate: dueDate.toISOString().split('T')[0]
    });

    // Reset form
    setSelectedTemplate("");
    setTitle("");
    setUnitCode("");
    setType("");
    setDescription("");
    setDueDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-elec-gray border-elec-yellow/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-elec-light">
            <Award className="h-5 w-5 text-elec-yellow" />
            Add New Assessment
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Select from Real Assessments */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-elec-light">Quick Select (Common Electrical Assessments)</Label>
            <Select value={selectedTemplate} onValueChange={(value) => {
              setSelectedTemplate(value);
              handleTemplateSelect(value);
            }}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-elec-light">
                <SelectValue placeholder="Choose from common assessments or create custom..." />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20 max-h-[300px]">
                {REAL_ASSESSMENTS.map((assessment) => (
                  <SelectItem 
                    key={assessment.title} 
                    value={assessment.title}
                    className="text-elec-light hover:bg-elec-gray focus:bg-elec-gray"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{assessment.title}</span>
                      <span className="text-xs text-elec-light/70">{assessment.unitCode} • {assessment.type}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assessment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-elec-light">Assessment Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., BS 7671:2018 18th Edition"
                className="bg-elec-dark border-elec-yellow/20 text-elec-light placeholder:text-elec-light/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitCode" className="text-elec-light">Unit/Course Code</Label>
              <Input
                id="unitCode"
                value={unitCode}
                onChange={(e) => setUnitCode(e.target.value)}
                placeholder="e.g., C&G 2382-18"
                className="bg-elec-dark border-elec-yellow/20 text-elec-light placeholder:text-elec-light/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-elec-light">Assessment Type *</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-elec-light">
                <SelectValue placeholder="Select assessment type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {ASSESSMENT_TYPES.map((assessmentType) => (
                  <SelectItem 
                    key={assessmentType.value} 
                    value={assessmentType.value}
                    className="text-elec-light hover:bg-elec-gray focus:bg-elec-gray"
                  >
                    {assessmentType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-elec-light">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this assessment covers..."
              className="bg-elec-dark border-elec-yellow/20 text-elec-light placeholder:text-elec-light/50 min-h-[80px]"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-elec-light">Due Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-elec-dark border-elec-yellow/20 text-elec-light hover:bg-elec-gray",
                    !dueDate && "text-elec-light/50"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-elec-yellow" />
                  {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-elec-dark border-elec-yellow/20" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto bg-elec-dark text-elec-light")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-elec-yellow/20">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-elec-yellow/20 text-elec-light hover:bg-elec-gray"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              disabled={!title || !type || !dueDate}
            >
              Add Assessment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssessmentDialog;
