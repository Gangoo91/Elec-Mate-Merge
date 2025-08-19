import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type ProjectSubmissionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectSubmitted?: () => void;
};

export const ProjectSubmissionDialog = ({
  open,
  onOpenChange,
  onProjectSubmitted
}: ProjectSubmissionDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tenderDeadline, setTenderDeadline] = useState<Date>();
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    awarded_to: '',
    location: '',
    project_value: '',
    status: 'active',
    category: '',
    external_project_url: '',
    source_url: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.summary || !formData.awarded_to || !formData.location || !formData.project_value) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields: Title, Summary, Client/Organisation, Location, and Project Value.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('major_projects')
        .insert({
          title: formData.title,
          summary: formData.summary,
          content: formData.content || formData.summary,
          awarded_to: formData.awarded_to,
          location: formData.location,
          project_value: formData.project_value,
          status: formData.status,
          category: formData.category || 'Infrastructure',
          external_project_url: formData.external_project_url || null,
          source_url: formData.source_url || null,
          tender_deadline: tenderDeadline?.toISOString().split('T')[0] || null,
          date_awarded: new Date().toISOString().split('T')[0],
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Project Submitted",
        description: "Your project has been submitted successfully and is now visible to the community.",
        variant: "default",
      });

      // Reset form
      setFormData({
        title: '',
        summary: '',
        content: '',
        awarded_to: '',
        location: '',
        project_value: '',
        status: 'active',
        category: '',
        external_project_url: '',
        source_url: ''
      });
      setTenderDeadline(undefined);
      
      onOpenChange(false);
      onProjectSubmitted?.();
      
    } catch (error) {
      console.error('Error submitting project:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Submit New Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Hospital Electrical System Upgrade"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="awarded_to">Client/Organisation *</Label>
              <Input
                id="awarded_to"
                name="awarded_to"
                value={formData.awarded_to}
                onChange={handleChange}
                placeholder="NHS Trust, Local Council, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="London, Manchester, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project_value">Project Value *</Label>
              <Input
                id="project_value"
                name="project_value"
                value={formData.project_value}
                onChange={handleChange}
                placeholder="£2.5M, £500K, Not disclosed, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Open for Tender</SelectItem>
                  <SelectItem value="awarded">Contract Awarded</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Tender Deadline (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !tenderDeadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tenderDeadline ? format(tenderDeadline, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={tenderDeadline}
                    onSelect={setTenderDeadline}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="external_project_url">Project URL (Optional)</Label>
              <Input
                id="external_project_url"
                name="external_project_url"
                value={formData.external_project_url}
                onChange={handleChange}
                placeholder="https://example.com/project-details"
                type="url"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Project Summary *</Label>
            <Textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief overview of the electrical work required..."
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Detailed Description (Optional)</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Detailed specifications, requirements, and additional information..."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="source_url">Source URL (Optional)</Label>
            <Input
              id="source_url"
              name="source_url"
              value={formData.source_url}
              onChange={handleChange}
              placeholder="https://source-website.com"
              type="url"
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t border-elec-yellow/20">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              {isSubmitting ? "Submitting..." : "Submit Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};