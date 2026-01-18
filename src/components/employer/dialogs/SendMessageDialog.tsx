import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEmployer, type Employee } from "@/contexts/EmployerContext";
import { useJobs } from "@/hooks/useJobs";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Send, Paperclip } from "lucide-react";

const MESSAGE_TYPES = [
  { id: "general", label: "General Message" },
  { id: "job", label: "Job Related" },
  { id: "urgent", label: "Urgent Notice" },
  { id: "schedule", label: "Schedule Change" },
  { id: "training", label: "Training Reminder" },
];

const QUICK_MESSAGES = [
  "Please call me when you get a chance.",
  "Can you confirm your availability for tomorrow?",
  "Site briefing starts at 7:30am sharp.",
  "Don't forget to submit your timesheet.",
  "Please bring your PPE tomorrow.",
];

interface SendMessageDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendMessageDialog({ employee, open, onOpenChange }: SendMessageDialogProps) {
  const isMobile = useIsMobile();
  const { sendMessage } = useEmployer();
  const { data: jobs = [] } = useJobs();
  const [messageType, setMessageType] = useState("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  if (!employee) return null;

  const activeJobs = jobs.filter(j => j.status === "Active");

  const handleQuickMessage = (quickMessage: string) => {
    setMessage(quickMessage);
  };

  const handleSend = () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    sendMessage(
      employee.id,
      employee.name,
      messageType,
      message,
      subject || undefined,
      selectedJobId || undefined
    );

    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${employee.name}.`,
    });

    setMessageType("general");
    setSubject("");
    setMessage("");
    setSelectedJobId("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "max-w-[95vw] max-h-[90vh] p-0 flex flex-col" : "sm:max-w-lg p-0 flex flex-col"}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-info via-info to-info/50 rounded-t-lg" />
        
        {/* Fixed Header */}
        <div className="p-4 pb-3 flex-shrink-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-info" />
              Send Message
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mt-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center font-bold text-elec-yellow flex-shrink-0">
              {employee.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">{employee.name}</p>
              <p className="text-sm text-muted-foreground">{employee.phone}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              To
            </Badge>
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-2">
            {/* Message Type */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Message Type</Label>
                <Select value={messageType} onValueChange={setMessageType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MESSAGE_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {messageType === "job" && (
                <div className="space-y-2">
                  <Label>Related Job</Label>
                  <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job..." />
                    </SelectTrigger>
                    <SelectContent>
                      {activeJobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Subject (optional) */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject (optional)</Label>
              <Input
                id="subject"
                placeholder="Enter subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Quick Messages */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Quick Messages</Label>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_MESSAGES.map((quickMsg, idx) => (
                  <Badge 
                    key={idx}
                    variant="outline" 
                    className="cursor-pointer hover:bg-muted active:bg-muted/80 transition-all touch-manipulation text-xs"
                    onClick={() => handleQuickMessage(quickMsg)}
                  >
                    {quickMsg.length > 30 ? quickMsg.substring(0, 30) + '...' : quickMsg}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Paperclip className="h-3 w-3" />
                  Attach file
                </button>
                <span>{message.length} / 500</span>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Fixed Footer */}
        <div className="flex gap-2 p-4 pt-3 border-t border-border flex-shrink-0">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="flex-1 gap-2" 
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
