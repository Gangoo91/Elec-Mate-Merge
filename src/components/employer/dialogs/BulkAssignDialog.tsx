import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEmployer } from "@/contexts/EmployerContext";
import { useJobs } from "@/hooks/useJobs";
import { toast } from "@/hooks/use-toast";
import { Briefcase, MapPin, Calendar, Check, Search, Users } from "lucide-react";

interface BulkAssignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export function BulkAssignDialog({ open, onOpenChange, onComplete }: BulkAssignDialogProps) {
  const isMobile = useIsMobile();
  const { selectedEmployeeIds, employees, bulkAssignToJob } = useEmployer();
  const { data: jobs = [] } = useJobs();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedEmployees = employees.filter(e => selectedEmployeeIds.includes(e.id));
  const activeJobs = jobs.filter(j => j.status === "Active" || j.status === "Pending");
  
  const filteredJobs = activeJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (!selectedJobId) {
      toast({
        title: "Select a Job",
        description: "Please select a job to assign the employees to.",
        variant: "destructive",
      });
      return;
    }

    const selectedJob = jobs.find(j => j.id === selectedJobId);
    if (!selectedJob) return;
    
    bulkAssignToJob(selectedJob.id, selectedJob.title, selectedJob.location, startDate);

    toast({
      title: "Team Assigned",
      description: `${selectedEmployees.length} workers assigned to ${selectedJob.title}.`,
    });

    setSelectedJobId(null);
    setSearchQuery("");
    onOpenChange(false);
    onComplete?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "max-w-[95vw] h-[90vh] p-0 flex flex-col" : "sm:max-w-lg max-h-[85vh] p-0 flex flex-col"}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-t-lg" />
        
        {/* Fixed Header */}
        <div className="flex-shrink-0 p-4 pb-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              Bulk Assign to Job
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mt-4">
            <div className="flex -space-x-2">
              {selectedEmployees.slice(0, 4).map(emp => (
                <div key={emp.id} className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow border-2 border-card">
                  {emp.avatar}
                </div>
              ))}
              {selectedEmployees.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-muted-foreground/20 flex items-center justify-center text-xs font-bold text-muted-foreground border-2 border-card">
                  +{selectedEmployees.length - 4}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium">{selectedEmployees.length} employees selected</p>
              <p className="text-sm text-muted-foreground">Will be assigned to the selected job</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {/* Search */}
            <div className="relative">
              {!searchQuery && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              )}
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(!searchQuery && "pl-10")}
              />
            </div>

            {/* Job List */}
            <div className="space-y-2">
              <Label>Select Job</Label>
              <div className="space-y-2">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <Card 
                      key={job.id}
                      className={`cursor-pointer transition-all ${
                        selectedJobId === job.id 
                          ? 'border-elec-yellow bg-elec-yellow/5 ring-1 ring-elec-yellow' 
                          : 'hover:border-border/80'
                      }`}
                      onClick={() => setSelectedJobId(job.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm truncate">{job.title}</p>
                              {selectedJobId === job.id && (
                                <Check className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{job.client}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs flex-shrink-0 ${
                              job.status === 'Active' ? 'border-success text-success' : ''
                            }`}
                          >
                            {job.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No jobs found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-4 pt-2 border-t border-border">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleAssign}
              disabled={!selectedJobId}
            >
              Assign {selectedEmployees.length} Workers
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}