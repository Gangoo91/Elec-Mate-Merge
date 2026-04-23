import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEmployer, type Employee } from '@/contexts/EmployerContext';
import { toast } from '@/hooks/use-toast';
import {
  FileText,
  Check,
  AlertTriangle,
  Shield,
  ClipboardList,
  FileCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

const DOCUMENT_TYPES = [
  { id: 'rams', label: 'RAMS', description: 'Risk Assessment & Method Statement', icon: Shield },
  {
    id: 'tbt',
    label: 'Toolbox Talk',
    description: 'Safety briefing document',
    icon: ClipboardList,
  },
  {
    id: 'method_statement',
    label: 'Method Statement',
    description: 'Work procedure document',
    icon: FileText,
  },
  {
    id: 'site_induction',
    label: 'Site Induction',
    description: 'Site-specific safety induction',
    icon: AlertTriangle,
  },
  {
    id: 'permit_to_work',
    label: 'Permit to Work',
    description: 'Hot works, confined spaces, etc.',
    icon: FileCheck,
  },
  {
    id: 'coshh',
    label: 'COSHH Assessment',
    description: 'Hazardous substances assessment',
    icon: AlertTriangle,
  },
];

interface AssignDocumentDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignDocumentDialog({ employee, open, onOpenChange }: AssignDocumentDialogProps) {
  const isMobile = useIsMobile();
  const { assignDocument } = useEmployer();
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('');

  if (!employee) return null;

  const handleAssign = () => {
    if (!selectedDocType) {
      toast({
        title: 'Select Document Type',
        description: 'Please select a document type to assign.',
        variant: 'destructive',
      });
      return;
    }

    const docType = DOCUMENT_TYPES.find((d) => d.id === selectedDocType);

    assignDocument(
      employee.id,
      selectedDocType,
      documentName || docType?.label || selectedDocType,
      dueDate
    );

    toast({
      title: 'Document Assigned',
      description: `${documentName || docType?.label} has been assigned to ${employee.name}.`,
    });

    setSelectedDocType(null);
    setDocumentName('');
    setNotes('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'bg-[hsl(0_0%_8%)] border-white/[0.08]',
          isMobile ? 'max-w-[95vw] max-h-[90vh] p-4' : 'sm:max-w-lg max-h-[85vh]'
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <FileText className="h-5 w-5 text-amber-400" />
            Assign Document
          </DialogTitle>
        </DialogHeader>

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

        <div className="space-y-4">
          <div className="space-y-2">
            <label className={fieldLabelClass}>Document type *</label>
            <ScrollArea className={isMobile ? 'h-[180px]' : 'h-[200px]'}>
              <div className="space-y-2 pr-2">
                {DOCUMENT_TYPES.map((doc) => {
                  const IconComponent = doc.icon;
                  const isSelected = selectedDocType === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDocType(doc.id)}
                      className={cn(
                        'cursor-pointer transition-all rounded-xl border p-3',
                        isSelected
                          ? 'border-amber-500/40 bg-amber-500/10 ring-1 ring-amber-500/40'
                          : 'border-white/[0.08] bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_12%)]'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                            isSelected ? 'bg-amber-500/20' : 'bg-white/[0.06]'
                          )}
                        >
                          <IconComponent
                            className={cn('h-4 w-4', isSelected ? 'text-amber-400' : 'text-white')}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[13px] text-white">{doc.label}</p>
                            {isSelected && (
                              <Check className="h-4 w-4 text-amber-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-[11.5px] text-white">{doc.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          <Field label="Document name (optional)">
            <Input
              id="docName"
              placeholder="E.g., 'Site A RAMS' or leave blank for default"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Due date" required>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Notes (optional)">
            <Textarea
              id="notes"
              placeholder="Add any notes about this document assignment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className={textareaClass}
            />
          </Field>
        </div>

        <div className="flex gap-2 pt-2">
          <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleAssign} disabled={!selectedDocType} fullWidth>
            Assign Document
          </PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
