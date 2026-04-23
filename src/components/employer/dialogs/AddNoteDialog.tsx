import { useState } from 'react';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
  ResponsiveDialogFooter,
} from '@/components/ui/responsive-dialog';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEmployer, type Employee, type WorkerNote } from '@/contexts/EmployerContext';
import { toast } from '@/hooks/use-toast';
import { StickyNote, MessageSquare, AlertTriangle, ThumbsUp, FileText } from 'lucide-react';
import {
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

interface AddNoteDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const noteTypes: {
  value: WorkerNote['type'];
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'General',
    label: 'General',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    value: 'Performance',
    label: 'Performance',
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    value: 'Incident',
    label: 'Incident',
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    value: 'Positive',
    label: 'Positive',
    icon: <ThumbsUp className="h-4 w-4" />,
  },
];

export function AddNoteDialog({ employee, open, onOpenChange }: AddNoteDialogProps) {
  const { addWorkerNote } = useEmployer();
  const [content, setContent] = useState('');
  const [noteType, setNoteType] = useState<WorkerNote['type']>('General');

  if (!employee) return null;

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: 'Content Required',
        description: 'Please enter a note.',
        variant: 'destructive',
      });
      return;
    }

    addWorkerNote(employee.id, content.trim(), noteType, 'Current User');

    toast({
      title: 'Note Added',
      description: `Note added to ${employee.name}'s profile.`,
    });

    setContent('');
    setNoteType('General');
    onOpenChange(false);
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-md bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="flex items-center gap-2 text-white">
            <StickyNote className="h-5 w-5 text-elec-yellow" />
            Add Note
          </ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className="space-y-4">
          <FormCard eyebrow="Worker">
            <div className="flex items-center gap-3 -mt-1">
              <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center font-bold text-elec-yellow flex-shrink-0">
                {employee.avatar}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-white truncate">{employee.name}</p>
                <p className="text-[12.5px] text-white">{employee.role}</p>
              </div>
            </div>
          </FormCard>

          <div className="space-y-2">
            <label className={fieldLabelClass}>Note type</label>
            <RadioGroup
              value={noteType}
              onValueChange={(v) => setNoteType(v as WorkerNote['type'])}
              className="grid grid-cols-2 gap-2"
            >
              {noteTypes.map((type) => (
                <div key={type.value}>
                  <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                  <label
                    htmlFor={type.value}
                    className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] p-3 cursor-pointer transition-all touch-manipulation text-white hover:bg-white/[0.04] peer-data-[state=checked]:border-elec-yellow peer-data-[state=checked]:bg-elec-yellow/10 peer-data-[state=checked]:text-elec-yellow"
                  >
                    {type.icon}
                    <span className="text-[13px] font-medium">{type.label}</span>
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Field label="Note content">
            <Textarea
              id="content"
              placeholder="Enter your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className={textareaClass}
            />
          </Field>
        </ResponsiveDialogBody>

        <ResponsiveDialogFooter>
          <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={!content.trim()} fullWidth>
            Add Note
          </PrimaryButton>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
