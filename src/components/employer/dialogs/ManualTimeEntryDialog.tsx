import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Clock, Plus, Loader2 } from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import { useActiveJobs } from "@/hooks/useJobs";
import { useCreateTimesheet } from "@/hooks/useTimesheets";
import { useOptionalVoiceFormContext } from "@/contexts/VoiceFormContext";

interface ManualTimeEntryDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ManualTimeEntryDialog({ trigger, open: controlledOpen, onOpenChange }: ManualTimeEntryDialogProps) {
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useActiveJobs();
  const createTimesheet = useCreateTimesheet();
  
  const [internalOpen, setInternalOpen] = useState(false);
  
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [formData, setFormData] = useState({
    employeeId: "",
    jobId: "",
    date: new Date().toISOString().split('T')[0],
    clockIn: "08:00",
    clockOut: "17:00",
    breakMins: "60",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employeeId || !formData.jobId || !formData.date || !formData.clockIn || !formData.clockOut) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Calculate total hours
    const [inHours, inMins] = formData.clockIn.split(':').map(Number);
    const [outHours, outMins] = formData.clockOut.split(':').map(Number);
    const totalMinutes = (outHours * 60 + outMins) - (inHours * 60 + inMins) - parseInt(formData.breakMins);
    const totalHours = Math.round((totalMinutes / 60) * 100) / 100;

    if (totalHours <= 0) {
      toast.error("Clock out time must be after clock in time.");
      return;
    }

    // Create ISO timestamps for clock_in and clock_out
    const clockInISO = `${formData.date}T${formData.clockIn}:00`;
    const clockOutISO = `${formData.date}T${formData.clockOut}:00`;

    try {
      await createTimesheet.mutateAsync({
        employee_id: formData.employeeId,
        job_id: formData.jobId,
        date: formData.date,
        clock_in: clockInISO,
        clock_out: clockOutISO,
        break_minutes: parseInt(formData.breakMins),
        total_hours: totalHours,
        status: "Pending",
        notes: null,
        approved_by: null,
        approved_at: null,
      });

      const employee = employees.find(e => e.id === formData.employeeId);
      toast.success(`${totalHours} hours logged for ${employee?.name || 'employee'}.`);

      setFormData({
        employeeId: "",
        jobId: "",
        date: new Date().toISOString().split('T')[0],
        clockIn: "08:00",
        clockOut: "17:00",
        breakMins: "60",
      });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add time entry");
    }
  };

  const activeJobs = jobs.filter(j => j.status === "Active");
  const activeEmployees = employees.filter(e => e.status === 'Active');

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();
  
  useEffect(() => {
    if (!open || !voiceContext) return;
    
    voiceContext.registerForm({
      formId: 'manual-time-entry',
      formName: 'Manual Time Entry',
      fields: [
        { name: 'employee', label: 'Employee', type: 'text', required: true },
        { name: 'job', label: 'Job', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'text', required: true },
        { name: 'clockIn', label: 'Clock In Time', type: 'text', required: true },
        { name: 'clockOut', label: 'Clock Out Time', type: 'text', required: true },
        { name: 'breakMins', label: 'Break Minutes', type: 'text' },
      ],
      onFillField: (field, value) => {
        switch (field) {
          case 'employee':
            const emp = activeEmployees.find(e => e.name.toLowerCase().includes(value.toLowerCase()));
            if (emp) setFormData(prev => ({ ...prev, employeeId: emp.id }));
            break;
          case 'job':
            const job = activeJobs.find(j => j.title.toLowerCase().includes(value.toLowerCase()));
            if (job) setFormData(prev => ({ ...prev, jobId: job.id }));
            break;
          case 'date': setFormData(prev => ({ ...prev, date: value })); break;
          case 'clockIn': setFormData(prev => ({ ...prev, clockIn: value })); break;
          case 'clockOut': setFormData(prev => ({ ...prev, clockOut: value })); break;
          case 'breakMins': setFormData(prev => ({ ...prev, breakMins: value })); break;
        }
      },
      onSubmit: () => {
        const form = document.getElementById('time-entry-form') as HTMLFormElement;
        if (form) form.requestSubmit();
      },
      onCancel: () => setOpen(false),
    });
    
    return () => voiceContext.unregisterForm('manual-time-entry');
  }, [open, voiceContext, activeEmployees, activeJobs]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== null && (
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="outline" size="sm" className="touch-feedback">
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Add Manual Time Entry
          </DialogTitle>
        </DialogHeader>
        <form id="time-entry-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee">Employee *</Label>
            <Select 
              value={formData.employeeId} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, employeeId: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employee..." />
              </SelectTrigger>
              <SelectContent>
                {activeEmployees.map(emp => (
                  <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job">Job *</Label>
            <Select 
              value={formData.jobId} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, jobId: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job..." />
              </SelectTrigger>
              <SelectContent>
                {activeJobs.map(job => (
                  <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clockIn">Clock In *</Label>
              <Input
                id="clockIn"
                type="time"
                value={formData.clockIn}
                onChange={(e) => setFormData(prev => ({ ...prev, clockIn: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clockOut">Clock Out *</Label>
              <Input
                id="clockOut"
                type="time"
                value={formData.clockOut}
                onChange={(e) => setFormData(prev => ({ ...prev, clockOut: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="breakMins">Break (mins)</Label>
              <Select value={formData.breakMins} onValueChange={(val) => setFormData(prev => ({ ...prev, breakMins: val }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="45">45</SelectItem>
                  <SelectItem value="60">60</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={createTimesheet.isPending}>
              {createTimesheet.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Entry"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
