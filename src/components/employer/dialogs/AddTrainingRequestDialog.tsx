import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTrainingRequests } from "@/hooks/useTrainingRequests";
import {
  GraduationCap,
  Building2,
  Calendar,
  FileText,
  Loader2,
  AlertCircle
} from "lucide-react";

interface Worker {
  id: string;
  name: string;
  elecIdProfileId: string;
}

interface AddTrainingRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  worker: Worker | null;
}

const COMMON_PROVIDERS = [
  "City & Guilds",
  "EAL",
  "NICEIC",
  "NAPIT",
  "JIB",
  "In-house Training",
  "Other",
];

const COMMON_TRAINING = [
  "18th Edition BS7671",
  "Inspection & Testing",
  "PAT Testing",
  "EV Charging Installation",
  "Solar PV Installation",
  "Fire Alarm Systems",
  "Emergency Lighting",
  "Safe Isolation",
  "Working at Heights",
  "Manual Handling",
  "First Aid at Work",
  "Other",
];

export function AddTrainingRequestDialog({
  open,
  onOpenChange,
  worker,
}: AddTrainingRequestDialogProps) {
  const { createRequest, isSubmitting } = useTrainingRequests();

  const [trainingName, setTrainingName] = useState("");
  const [customTraining, setCustomTraining] = useState("");
  const [provider, setProvider] = useState("");
  const [customProvider, setCustomProvider] = useState("");
  const [completedDate, setCompletedDate] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setTrainingName("");
    setCustomTraining("");
    setProvider("");
    setCustomProvider("");
    setCompletedDate("");
    setNotes("");
  };

  const handleSubmit = async () => {
    if (!worker?.elecIdProfileId) return;

    const finalTrainingName = trainingName === "Other" ? customTraining : trainingName;
    const finalProvider = provider === "Other" ? customProvider : provider;

    if (!finalTrainingName) {
      return;
    }

    const success = await createRequest({
      workerProfileId: worker.elecIdProfileId,
      trainingName: finalTrainingName,
      provider: finalProvider || undefined,
      completedDate: completedDate || undefined,
    });

    if (success) {
      onOpenChange(false);
      resetForm();
    }
  };

  if (!worker) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
            Add Training Record
          </DialogTitle>
          <DialogDescription>
            Request to add a training record to {worker.name}'s Elec-ID profile. They will need to approve this addition.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Info Banner */}
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-400">
              The worker owns their Elec-ID profile. They must approve any training records you add.
            </p>
          </div>

          {/* Training Name */}
          <div className="space-y-2">
            <Label htmlFor="training">Training Course</Label>
            <Select value={trainingName} onValueChange={setTrainingName}>
              <SelectTrigger id="training" className="h-11">
                <SelectValue placeholder="Select training type" />
              </SelectTrigger>
              <SelectContent>
                {COMMON_TRAINING.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {trainingName === "Other" && (
            <div className="space-y-2">
              <Label htmlFor="customTraining">Custom Training Name</Label>
              <Input
                id="customTraining"
                value={customTraining}
                onChange={(e) => setCustomTraining(e.target.value)}
                placeholder="Enter training name"
                className="h-11"
              />
            </div>
          )}

          {/* Provider */}
          <div className="space-y-2">
            <Label htmlFor="provider">Training Provider</Label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger id="provider" className="h-11">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {COMMON_PROVIDERS.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {provider === "Other" && (
            <div className="space-y-2">
              <Label htmlFor="customProvider">Custom Provider Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="customProvider"
                  value={customProvider}
                  onChange={(e) => setCustomProvider(e.target.value)}
                  placeholder="Enter provider name"
                  className="pl-10 h-11"
                />
              </div>
            </div>
          )}

          {/* Completion Date */}
          <div className="space-y-2">
            <Label htmlFor="completedDate">Completion Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="completedDate"
                type="date"
                value={completedDate}
                onChange={(e) => setCompletedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional details about the training..."
              rows={2}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-11"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 h-11"
            onClick={handleSubmit}
            disabled={isSubmitting || !trainingName || (trainingName === "Other" && !customTraining)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Send Request
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
