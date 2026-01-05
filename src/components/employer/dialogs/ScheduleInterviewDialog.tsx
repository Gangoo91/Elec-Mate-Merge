import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Video, Phone, Building, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScheduleInterviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName: string;
  onSchedule: (details: {
    date: string;
    time: string;
    type: 'In-person' | 'Phone' | 'Video';
    location?: string;
  }) => void;
}

export function ScheduleInterviewDialog({
  open,
  onOpenChange,
  candidateName,
  onSchedule,
}: ScheduleInterviewDialogProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [interviewType, setInterviewType] = useState<'In-person' | 'Phone' | 'Video'>('In-person');
  const [location, setLocation] = useState("");

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for the interview.",
        variant: "destructive",
      });
      return;
    }

    if (interviewType === 'In-person' && !location) {
      toast({
        title: "Missing Location",
        description: "Please enter the interview location.",
        variant: "destructive",
      });
      return;
    }

    onSchedule({
      date: format(date, 'yyyy-MM-dd'),
      time,
      type: interviewType,
      location: interviewType === 'In-person' ? location : undefined,
    });

    toast({
      title: "Interview Scheduled",
      description: `Interview with ${candidateName} scheduled for ${format(date, 'PPP')} at ${time}.`,
    });

    // Reset form
    setDate(undefined);
    setTime("");
    setInterviewType('In-person');
    setLocation("");
    onOpenChange(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video className="h-4 w-4" />;
      case 'Phone': return <Phone className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Name */}
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm text-muted-foreground">Scheduling interview with</p>
            <p className="font-medium text-foreground">{candidateName}</p>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Picker */}
          <div className="space-y-2">
            <Label>Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Interview Type */}
          <div className="space-y-2">
            <Label>Interview Type</Label>
            <div className="grid grid-cols-3 gap-2">
              {(['In-person', 'Phone', 'Video'] as const).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={interviewType === type ? "default" : "outline"}
                  className="flex flex-col items-center gap-1 h-auto py-3"
                  onClick={() => setInterviewType(type)}
                >
                  {getTypeIcon(type)}
                  <span className="text-xs">{type}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Location (for in-person) */}
          {interviewType === 'In-person' && (
            <div className="space-y-2">
              <Label>Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Head Office, Manchester"
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {/* Video/Phone Info */}
          {interviewType === 'Video' && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm text-blue-600">
              A video call link will be sent to the candidate.
            </div>
          )}
          {interviewType === 'Phone' && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-sm text-emerald-600">
              You will call the candidate at their registered number.
            </div>
          )}

          {/* Summary */}
          {date && time && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Interview Summary</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{format(date, 'EEEE, d MMMM yyyy')} at {time}</p>
                <p className="flex items-center gap-1">
                  {getTypeIcon(interviewType)}
                  {interviewType}
                  {interviewType === 'In-person' && location && ` - ${location}`}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
