import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Employee } from '@/services/employeeService';
import { createCommunication } from '@/services/communicationService';
import { useQueryClient } from '@tanstack/react-query';
import { useJobs } from '@/hooks/useJobs';
import { toast } from '@/hooks/use-toast';
import { MessageSquare, Send, Paperclip } from 'lucide-react';
import {
  FormCard,
  FormGrid,
  Field,
  Pill,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

const MESSAGE_TYPES = [
  { id: 'general', label: 'General Message' },
  { id: 'job', label: 'Job Related' },
  { id: 'urgent', label: 'Urgent Notice' },
  { id: 'schedule', label: 'Schedule Change' },
  { id: 'training', label: 'Training Reminder' },
];

const QUICK_MESSAGES = [
  'Please call me when you get a chance.',
  'Can you confirm your availability for tomorrow?',
  'Site briefing starts at 7:30am sharp.',
  "Don't forget to submit your timesheet.",
  'Please bring your PPE tomorrow.',
];

interface SendMessageDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendMessageDialog({ employee, open, onOpenChange }: SendMessageDialogProps) {
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const { data: jobs = [] } = useJobs();
  const [messageType, setMessageType] = useState('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string>('');

  if (!employee) return null;

  const activeJobs = jobs.filter((j) => j.status === 'Active');

  const handleQuickMessage = (quickMessage: string) => {
    setMessage(quickMessage);
  };

  const handleSend = async () => {
    if (!message.trim()) {
      toast({
        title: 'Message Required',
        description: 'Please enter a message to send.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Lands in the real Communications feed; the recipient row makes it
      // show in the worker's Messages sheet
      await createCommunication({
        sender_id: null,
        type: messageType === 'urgent' ? 'alert' : 'message',
        title: subject || `Message for ${employee.name}`,
        content: message,
        priority: messageType === 'urgent' ? 'urgent' : 'normal',
        target_audience: 'specific',
        target_employee_ids: [employee.id],
        attachments: null,
        is_pinned: false,
        expires_at: null,
      });
      queryClient.invalidateQueries({ queryKey: ['communications'] });
      toast({
        title: 'Message Sent',
        description: `Your message has been sent to ${employee.name}.`,
      });
      setMessageType('general');
      setSubject('');
      setMessage('');
      setSelectedJobId('');
      onOpenChange(false);
    } catch {
      toast({
        title: 'Send failed',
        description: 'Could not send the message. Try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          isMobile
            ? 'max-w-[95vw] max-h-[92vh] p-5 flex flex-col bg-[hsl(0_0%_8%)] border-white/[0.08] overflow-y-auto'
            : 'sm:max-w-lg p-6 flex flex-col bg-[hsl(0_0%_8%)] border-white/[0.08] max-h-[90vh] overflow-y-auto'
        }
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            Send message
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3 p-3 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[13px] font-semibold text-white flex-shrink-0">
            {employee.avatar_initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-white truncate">{employee.name}</p>
            <p className="text-[11.5px] text-white">{employee.phone}</p>
          </div>
          <Pill tone="yellow">To</Pill>
        </div>

        <FormCard eyebrow="Message">
          <FormGrid cols={messageType === 'job' ? 2 : 1}>
            <Field label="Message type">
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {MESSAGE_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {messageType === 'job' && (
              <Field label="Related job">
                <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select job..." />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {activeJobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </FormGrid>

          <Field label="Subject (optional)">
            <Input
              placeholder="Enter subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputClass}
            />
          </Field>

          <div className="space-y-1.5">
            <label className={fieldLabelClass}>Quick messages</label>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_MESSAGES.map((quickMsg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickMessage(quickMsg)}
                  className="inline-flex items-center h-7 px-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-[11px] text-white hover:bg-white/[0.08] transition-colors touch-manipulation"
                >
                  {quickMsg.length > 30 ? quickMsg.substring(0, 30) + '...' : quickMsg}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={fieldLabelClass}>Message *</label>
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className={`${textareaClass} min-h-[120px]`}
            />
            <div className="flex items-center justify-end text-[11px] text-white">
              <span>{message.length} / 500</span>
            </div>
          </div>
        </FormCard>

        <div className="flex gap-2 pt-1">
          <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSend} disabled={!message.trim()} fullWidth>
            <Send className="h-4 w-4 mr-1.5" />
            Send message
          </PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
