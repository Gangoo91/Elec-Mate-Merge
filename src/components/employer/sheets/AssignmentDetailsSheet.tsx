import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, Mail, Check, Loader2, X, ChevronDown, 
  Clock, FileText, AlertTriangle 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Employee } from "@/services/employeeService";
import { JobAssignmentWithDetails } from "@/services/jobAssignmentService";
import { Job } from "@/services/jobService";

interface AssignmentDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedWorkers: Employee[];
  clashWarnings: Record<string, JobAssignmentWithDetails[]>;
  job: Job;
  onAssign: (details: AssignmentDetails) => Promise<void>;
  onRemoveWorker: (employeeId: string) => void;
  isSubmitting: boolean;
}

export interface AssignmentDetails {
  startDate: string;
  endDate: string;
  notes: string;
  sendEmail: boolean;
}

export function AssignmentDetailsSheet({
  open,
  onOpenChange,
  selectedWorkers,
  clashWarnings,
  job,
  onAssign,
  onRemoveWorker,
  isSubmitting,
}: AssignmentDetailsSheetProps) {
  const [startDate, setStartDate] = useState(job.start_date || new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(job.end_date || "");
  const [notes, setNotes] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  const hasClashes = Object.keys(clashWarnings).length > 0;

  const handleSubmit = async () => {
    await onAssign({
      startDate,
      endDate,
      notes,
      sendEmail,
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Assignment Details
          </DrawerTitle>
          <DrawerDescription>
            Configure dates and notification settings
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4">
          <div className="py-4 space-y-6">
            {/* Selected Workers Preview */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                Assigning {selectedWorkers.length} worker{selectedWorkers.length > 1 ? 's' : ''}
              </Label>
              <div className="flex flex-wrap gap-2">
                {selectedWorkers.map((worker) => {
                  const hasClash = clashWarnings[worker.id]?.length > 0;
                  return (
                    <div
                      key={worker.id}
                      className={cn(
                        "flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border transition-all",
                        hasClash 
                          ? "bg-warning/10 border-warning/30" 
                          : "bg-muted border-transparent"
                      )}
                    >
                      <Avatar className="h-6 w-6">
                        {worker.photo_url ? (
                          <AvatarImage src={worker.photo_url} alt={worker.name} />
                        ) : null}
                        <AvatarFallback className="text-xs bg-elec-yellow/10 text-elec-yellow">
                          {worker.avatar_initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{worker.name.split(' ')[0]}</span>
                      {hasClash && (
                        <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                      )}
                      <button
                        onClick={() => onRemoveWorker(worker.id)}
                        className="h-5 w-5 rounded-full hover:bg-background flex items-center justify-center"
                      >
                        <X className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clash Warning Banner */}
            {hasClashes && (
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
                  <div>
                    <p className="font-medium text-warning text-sm">Schedule conflicts detected</p>
                    <p className="text-xs text-muted-foreground">
                      Some workers have overlapping job assignments
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Date Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-sm font-medium flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Start Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-sm font-medium flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  End Date
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-12 text-base"
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Notes <span className="text-muted-foreground font-normal">(Optional)</span>
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any instructions or notes for the workers..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px] resize-none text-base"
              />
            </div>

            {/* Email Notification */}
            <div 
              className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border cursor-pointer"
              onClick={() => setSendEmail(!sendEmail)}
            >
              <div className={cn(
                "shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                sendEmail ? "bg-elec-yellow border-elec-yellow" : "border-muted-foreground/30"
              )}>
                {sendEmail && <Check className="h-4 w-4 text-elec-yellow-foreground" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Send Email Notification
                </p>
                <p className="text-sm text-muted-foreground">
                  Workers will receive job details and a calendar invite
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DrawerFooter className="border-t pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedWorkers.length === 0 || !startDate}
            size="lg"
            className="w-full h-14 text-base font-semibold gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Assigning Workers...
              </>
            ) : (
              <>
                <Check className="h-5 w-5" />
                Assign {selectedWorkers.length} Worker{selectedWorkers.length > 1 ? 's' : ''}
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Back to Selection
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
