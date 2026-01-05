import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddElecIdWorkHistory } from "@/hooks/useElecId";
import { toast } from "@/hooks/use-toast";
import { Briefcase, Building, Calendar, MapPin } from "lucide-react";

interface AddWorkHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId: string;
  profileName: string;
}

export const AddWorkHistoryDialog = ({ open, onOpenChange, profileId, profileName }: AddWorkHistoryDialogProps) => {
  const addWorkHistory = useAddElecIdWorkHistory();
  const [formData, setFormData] = useState({
    employer: "",
    role: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    projects: "",
  });

  const handleSubmit = async () => {
    if (!formData.employer || !formData.role || !formData.startDate) {
      toast({
        title: "Required Fields",
        description: "Please fill in employer, role, and start date.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addWorkHistory.mutateAsync({
        profile_id: profileId,
        employer_name: formData.employer,
        job_title: formData.role,
        start_date: formData.startDate,
        end_date: formData.isCurrent ? null : formData.endDate || null,
        is_current: formData.isCurrent,
        description: formData.description || null,
        projects: formData.projects ? formData.projects.split(",").map(p => p.trim()).filter(Boolean) : null,
        is_verified: false,
        verified_by_employer: false,
      });

      toast({
        title: "Work History Added",
        description: `Employment record has been added to ${profileName}'s Elec-ID.`,
      });

      setFormData({
        employer: "",
        role: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
        projects: "",
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add work history. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-elec-yellow" />
            Add Work History
          </DialogTitle>
          <DialogDescription>
            Add past employment to {profileName}'s Elec-ID profile
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="employer" className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              Employer *
            </Label>
            <Input
              id="employer"
              placeholder="e.g., ABC Electrical Ltd"
              value={formData.employer}
              onChange={(e) => setFormData(prev => ({ ...prev, employer: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Job Title / Role *</Label>
            <Input
              id="role"
              placeholder="e.g., Senior Electrician"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Start Date *
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                disabled={formData.isCurrent}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Checkbox 
              id="isCurrent"
              checked={formData.isCurrent}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, isCurrent: checked as boolean, endDate: "" }))
              }
            />
            <Label htmlFor="isCurrent" className="font-normal cursor-pointer">
              Currently working here
            </Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of responsibilities and achievements..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projects">Key Projects (comma separated)</Label>
            <Input
              id="projects"
              placeholder="e.g., Tesco Refit, Hospital Wing, EV Network"
              value={formData.projects}
              onChange={(e) => setFormData(prev => ({ ...prev, projects: e.target.value }))}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={addWorkHistory.isPending}>
            {addWorkHistory.isPending ? "Adding..." : "Add to Elec-ID"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
