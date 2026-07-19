import { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
  ResponsiveFormModalFooter,
} from '@/components/ui/responsive-form-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from './editorial';
import {
  FileText,
  Download,
  Check,
  Building2,
  Calendar,
  X,
  Loader2,
  Edit3,
  User,
  Briefcase,
  Users,
  FileCheck,
  Eye,
  Save,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Undo,
  Redo,
  PenTool,
  Send,
  Copy,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import SignatureInput from '@/components/signature/SignatureInput';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateSignatureRequest } from '@/hooks/useSignatureRequests';
import { copyToClipboard } from '@/utils/clipboard';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  type EmploymentContractTemplate,
  type Contract,
  type ContractStatus,
  useAdoptContractTemplate,
  useUpdateContractContent,
  useUpdateContractStatus,
  useContractSignatureRequest,
  useSignContractAsEmployer,
} from '@/hooks/useContracts';
import { useEmployees } from '@/hooks/useEmployees';
import { downloadContractPDF } from '@/utils/contract-pdf';
import { useToast } from '@/hooks/use-toast';
import { sanitizeHtmlSafe } from '@/utils/inputSanitization';
import { storageGetSync, storageSetSync, storageRemoveSync } from '@/utils/storage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ContractViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: EmploymentContractTemplate | null;
  userContract?: Contract | null;
  isAdopted?: boolean;
}

const DRAFT_KEY_PREFIX = 'contract-viewer-draft-';

export function ContractViewer({
  open,
  onOpenChange,
  template,
  userContract,
  isAdopted = false,
}: ContractViewerProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [showAdoptForm, setShowAdoptForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Adopt form state
  const [companyName, setCompanyName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salary, setSalary] = useState('');

  // Signing state
  const [signSheetOpen, setSignSheetOpen] = useState(false);
  const [sendSheetOpen, setSendSheetOpen] = useState(false);
  const [employerSignerName, setEmployerSignerName] = useState('');
  const [employerSignature, setEmployerSignature] = useState<string | null>(null);
  const [requestSignerName, setRequestSignerName] = useState('');
  const [requestSignerEmail, setRequestSignerEmail] = useState('');
  const [requestMessage, setRequestMessage] = useState('');

  const adoptContract = useAdoptContractTemplate();
  const updateContract = useUpdateContractContent();
  const updateStatus = useUpdateContractStatus();
  const { data: employees } = useEmployees();
  const queryClient = useQueryClient();
  const signAsEmployer = useSignContractAsEmployer();
  const createSignatureRequest = useCreateSignatureRequest();
  // Employee signing rides the existing Signatures rail — read the latest
  // request linked to this contract rather than duplicating capture here.
  const { data: employeeRequest } = useContractSignatureRequest(userContract?.id);

  // Use either the template or user contract for display
  const contract = userContract || template;
  const isTemplate = !userContract;
  const content = userContract?.content || template?.content || '';
  const name = userContract?.title || template?.name || '';
  // When opened from the contracts list there is no template — fall back to
  // the adopted contract's own category so subcontractor agreements are not
  // presented as Employment.
  const category = template?.category || userContract?.category || 'Employment';
  const draftKey = userContract ? `${DRAFT_KEY_PREFIX}${userContract.id}` : '';

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        placeholder: 'Start writing...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: content,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      setHasChanges(true);
      if (draftKey) {
        storageSetSync(draftKey, editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-invert prose-sm max-w-none focus:outline-none',
          'prose-headings:text-white prose-headings:font-semibold',
          'prose-p:text-white prose-p:leading-relaxed',
          'prose-li:text-white',
          'prose-strong:text-white prose-strong:font-semibold',
          '[&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-4',
          '[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3',
          '[&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2',
          '[&_p]:mb-3 [&_ul]:mb-4 [&_li]:mb-1',
          '[&_table]:w-full [&_td]:py-1 [&_td]:pr-4',
          isEditing ? 'min-h-[300px] p-4' : ''
        ),
      },
    },
  });

  // Update editor content when contract changes. The draft-restore branch must
  // re-run when the user starts editing (isEditing dep) — previously it only
  // ran on mount with isEditing=false, so a persisted draft was never offered.
  useEffect(() => {
    if (editor && content) {
      // Check for draft
      if (draftKey && isEditing) {
        const draft = storageGetSync(draftKey);
        if (draft && draft !== content) {
          const useDraft = window.confirm(
            'You have unsaved changes from a previous session. Restore them?'
          );
          if (useDraft) {
            editor.commands.setContent(draft);
            setHasChanges(true);
            return;
          } else {
            storageRemoveSync(draftKey);
          }
        }
        return; // keep current editor state while editing
      }
      editor.commands.setContent(content);
    }
  }, [editor, content, draftKey, isEditing]);

  // Update editor editable state
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing);
    }
  }, [editor, isEditing]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setShowAdoptForm(false);
      setIsEditing(false);
      setHasChanges(false);
      setCompanyName('');
      setEmployeeName('');
      setSelectedEmployee('');
      setJobTitle('');
      setStartDate('');
      setEndDate('');
      setSalary('');
      setSignSheetOpen(false);
      setSendSheetOpen(false);
      setEmployerSignerName('');
      setEmployerSignature(null);
      setRequestSignerName('');
      setRequestSignerEmail('');
      setRequestMessage('');
    }
  }, [open]);

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      // Pull the real company name for the masthead/footers — party_name is
      // the employee/subcontractor, never the company.
      let exportCompanyName: string | undefined;
      try {
        const { data } = await supabase.rpc('get_my_company_profile');
        const profile = Array.isArray(data) ? data[0] : data;
        exportCompanyName = profile?.company_name || undefined;
      } catch {
        // Non-fatal — PDF falls back to a neutral placeholder
      }
      await downloadContractPDF({
        template,
        userContract,
        companyName: exportCompanyName,
        employeeSignature:
          employeeRequest?.status === 'Signed'
            ? {
                name: employeeRequest.signer_name,
                date: employeeRequest.signed_at,
                data: employeeRequest.signature_url,
              }
            : null,
      });
      toast({
        title: 'PDF Downloaded',
        description: 'Your contract document has been exported.',
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Could not generate the PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleAdopt = async () => {
    if (!template) return;

    try {
      const placeholders: Record<string, string> = {};
      if (companyName) placeholders['[Company Name]'] = companyName;
      if (employeeName) placeholders['[Employee Name]'] = employeeName;
      if (employeeName) placeholders['[Subcontractor Name]'] = employeeName;
      if (employeeName) placeholders['[Candidate Name]'] = employeeName;
      if (jobTitle) placeholders['[Job Title]'] = jobTitle;
      if (startDate) {
        const formattedDate = new Date(startDate).toLocaleDateString('en-GB');
        placeholders['[Start Date]'] = formattedDate;
      }
      if (salary) placeholders['[Salary]'] = salary;

      await adoptContract.mutateAsync({
        template_id: template.id,
        party_name: employeeName || undefined,
        employee_id: selectedEmployee || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
        placeholders,
      });

      setShowAdoptForm(false);
      setCompanyName('');
      setEmployeeName('');
      setSelectedEmployee('');
      setJobTitle('');
      setStartDate('');
      setEndDate('');
      setSalary('');
      onOpenChange(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleSave = async () => {
    if (!editor || !userContract) return;

    try {
      const sanitisedContent = sanitizeHtmlSafe(editor.getHTML());
      await updateContract.mutateAsync({
        id: userContract.id,
        content: sanitisedContent,
      });

      if (draftKey) {
        storageRemoveSync(draftKey);
      }
      setHasChanges(false);
      setIsEditing(false);
      // Success toast comes from the mutation hook — no duplicate here.
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleCancelEdit = useCallback(() => {
    if (hasChanges) {
      const confirmCancel = window.confirm('You have unsaved changes. Discard them?');
      if (!confirmCancel) return;
    }
    if (draftKey) {
      storageRemoveSync(draftKey);
    }
    if (editor) {
      editor.commands.setContent(content);
    }
    setHasChanges(false);
    setIsEditing(false);
  }, [hasChanges, draftKey, editor, content]);

  const handleClose = useCallback(() => {
    if (isEditing && hasChanges) {
      const confirmClose = window.confirm('You have unsaved changes. Close anyway?');
      if (!confirmClose) return;
      // User accepted losing this session's edits.
      if (draftKey) storageRemoveSync(draftKey);
    }
    // Do NOT clear the draft on a plain close — a draft persisted through an
    // app kill must survive until the user is actually offered a restore.
    onOpenChange(false);
  }, [isEditing, hasChanges, draftKey, onOpenChange]);

  // ---- Signing ----
  const employerSigned = Boolean(userContract?.employer_signed_at);
  const employeeSigned = employeeRequest?.status === 'Signed';
  const employeeAwaiting =
    !!employeeRequest && ['Pending', 'Sent', 'Viewed'].includes(employeeRequest.status);
  const bothSigned = employerSigned && employeeSigned;
  const anySigningActivity = employerSigned || !!employeeRequest;

  const handleEmployerSign = async () => {
    if (!userContract || !employerSignerName.trim() || !employerSignature) return;
    try {
      await signAsEmployer.mutateAsync({
        id: userContract.id,
        signature: employerSignature,
        signedBy: employerSignerName.trim(),
        // Only auto-activate when the employee has already signed — a
        // one-sided signature does not make a Draft contract Active.
        activate: userContract.status === 'Draft' && employeeSigned,
      });
      setSignSheetOpen(false);
      setEmployerSignerName('');
      setEmployerSignature(null);
    } catch {
      // Error toast handled by the mutation
    }
  };

  const handleSendForSignature = async () => {
    if (!userContract || !requestSignerName.trim()) return;
    try {
      await createSignatureRequest.mutateAsync({
        document_type: 'Contract',
        document_id: userContract.id,
        document_title: userContract.title,
        signer_name: requestSignerName.trim(),
        signer_email: requestSignerEmail.trim() || undefined,
        message: requestMessage.trim() || undefined,
        status: 'Pending',
      });
      queryClient.invalidateQueries({
        queryKey: ['contract-signature-request', userContract.id],
      });
      setSendSheetOpen(false);
      setRequestMessage('');
    } catch {
      // Error toast handled by the mutation
    }
  };

  const handleCopySigningLink = async () => {
    if (!employeeRequest?.access_token) return;
    try {
      await copyToClipboard(`${window.location.origin}/sign/${employeeRequest.access_token}`);
      toast({ title: 'Link copied', description: 'Signing link copied to clipboard.' });
    } catch {
      toast({ title: 'Copy failed', description: 'Could not copy link.', variant: 'destructive' });
    }
  };

  if (!contract) return null;

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Employment':
        return 'bg-elec-yellow/10 text-elec-yellow';
      case 'Subcontractor':
        return 'bg-blue-500/10 text-blue-400';
      case 'HR Letters':
        return 'bg-green-500/10 text-green-400';
      default:
        return 'bg-white/[0.06] text-white';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Employment':
        return Briefcase;
      case 'Subcontractor':
        return Users;
      case 'HR Letters':
        return FileCheck;
      default:
        return FileText;
    }
  };

  const CategoryIcon = getCategoryIcon(category);

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      title={title}
      className={cn(
        'h-8 w-8 p-0 rounded-lg touch-manipulation',
        isActive
          ? 'bg-elec-yellow/20 text-elec-yellow'
          : 'text-white hover:text-white hover:bg-white/10'
      )}
    >
      {children}
    </Button>
  );

  return (
    <>
    <ResponsiveFormModal open={open} onOpenChange={handleClose}>
      <ResponsiveFormModalContent className={cn(isMobile ? '' : 'max-w-4xl')}>
        {/* Header */}
        <ResponsiveFormModalHeader className="border-b border-white/[0.08]">
          <div className="flex items-center justify-between">
            <ResponsiveFormModalTitle>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/20">
                  <CategoryIcon className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <span className="text-lg font-semibold line-clamp-1">{name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className={getCategoryColor(category)}>
                      {category}
                    </Badge>
                    {template?.version && (
                      <span className="text-xs text-white">v{template.version}</span>
                    )}
                    {userContract && (
                      <Badge
                        variant="secondary"
                        className={
                          userContract.status === 'Active'
                            ? 'bg-green-500/10 text-green-400'
                            : userContract.status === 'Draft'
                              ? 'bg-white/[0.06] text-white'
                              : 'bg-amber-500/10 text-amber-400'
                        }
                      >
                        {userContract.status}
                      </Badge>
                    )}
                    {userContract && anySigningActivity && (
                      <Badge
                        variant="secondary"
                        className={
                          bothSigned
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }
                      >
                        {bothSigned ? 'Signed' : 'Awaiting signatures'}
                      </Badge>
                    )}
                    {isEditing && hasChanges && (
                      <Badge variant="outline" className="text-amber-400 border-amber-500/50">
                        Unsaved
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </ResponsiveFormModalTitle>
            {!isMobile && (
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </ResponsiveFormModalHeader>

        {/* Body */}
        <ResponsiveFormModalBody className="py-4">
          {showAdoptForm ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <h3 className="font-medium text-white mb-2">Use This Template</h3>
                <p className="text-sm text-white">
                  Fill in the details below to personalise this contract. Placeholders like [Company
                  Name] will be replaced with your values.
                </p>
              </div>

              <FormCard eyebrow="Contract details">
                <Field label="Company Name">
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={
                    category === 'Subcontractor'
                      ? 'Subcontractor Name'
                      : 'Employee/Candidate Name'
                  }
                >
                  <Input
                    id="employeeName"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Enter name"
                    className={inputClass}
                  />
                </Field>

                {category !== 'Subcontractor' && (
                  <Field label="Link to Employee (Optional)">
                    <Select
                      value={selectedEmployee || '__none__'}
                      onValueChange={(v) => setSelectedEmployee(v === '__none__' ? '' : v)}
                    >
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Select employee..." />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        <SelectItem value="__none__">None</SelectItem>
                        {employees?.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}

                <Field label="Job Title">
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Electrician, Apprentice"
                    className={inputClass}
                  />
                </Field>

                <Field label="Start Date">
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="End Date (fixed-term / subcontract only)">
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>

                {category === 'Employment' && (
                  <Field label="Salary (Annual)">
                    <Input
                      id="salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g., 35,000"
                      className={inputClass}
                    />
                  </Field>
                )}
              </FormCard>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary if available */}
              {template?.summary && !isEditing && (
                <div className="p-4 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06]">
                  <p className="text-sm text-white">{template.summary}</p>
                </div>
              )}

              {/* Inline Editor Toolbar (when editing) */}
              {isEditing && editor && (
                <div className="flex flex-wrap items-center gap-1 p-2 bg-[hsl(0_0%_9%)] rounded-xl border border-white/[0.08]">
                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </ToolbarButton>

                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </ToolbarButton>

                  <div className="w-px h-5 bg-white/10 mx-1" />

                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Heading 2"
                  >
                    <Heading2 className="h-4 w-4" />
                  </ToolbarButton>

                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                    title="Heading 3"
                  >
                    <Heading3 className="h-4 w-4" />
                  </ToolbarButton>

                  <div className="w-px h-5 bg-white/10 mx-1" />

                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Bullet List"
                  >
                    <List className="h-4 w-4" />
                  </ToolbarButton>

                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Numbered List"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </ToolbarButton>

                  <div className="flex-1" />

                  <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
                    <Undo className="h-4 w-4" />
                  </ToolbarButton>

                  <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
                    <Redo className="h-4 w-4" />
                  </ToolbarButton>
                </div>
              )}

              {/* Contract content - TipTap editor */}
              <div
                className={cn(
                  'rounded-xl transition-colors',
                  isEditing
                    ? 'bg-[hsl(0_0%_9%)] border border-white/[0.08] focus-within:border-elec-yellow/60'
                    : ''
                )}
              >
                {editor ? (
                  <EditorContent editor={editor} />
                ) : (
                  <div
                    className="prose prose-sm prose-invert max-w-none [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:mb-4 [&_li]:mb-1 [&_strong]:text-white [&_table]:w-full [&_td]:py-1 [&_td]:pr-4"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtmlSafe(content) }}
                  />
                )}
              </div>

              {/* User contract metadata */}
              {userContract && !isEditing && (
                <>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {userContract.party_name && (
                      <div>
                        <span className="text-white">Party:</span>
                        <p className="font-medium text-white">{userContract.party_name}</p>
                      </div>
                    )}
                    {userContract.adopted_at && (
                      <div>
                        <span className="text-white">Created:</span>
                        <p className="font-medium text-white">
                          {new Date(userContract.adopted_at).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                    )}
                    {userContract.start_date && (
                      <div>
                        <span className="text-white">Start Date:</span>
                        <p className="font-medium text-white">
                          {new Date(userContract.start_date).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                    )}
                    {userContract.employee?.name && (
                      <div>
                        <span className="text-white">Employee:</span>
                        <p className="font-medium text-white">{userContract.employee.name}</p>
                      </div>
                    )}
                  </div>

                  {/* Signatures — employer counter-signature lives on the
                      contract; the employee signs via the Signatures rail */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <PenTool className="h-4 w-4 text-elec-yellow" />
                      Signatures
                    </h3>

                    {/* Employer */}
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-white/60">Employer</p>
                        {employerSigned ? (
                          <p className="text-sm text-white flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-400 shrink-0" />
                            <span className="truncate">
                              Signed by {userContract.employer_signed_by || 'employer'} on{' '}
                              {userContract.employer_signed_at
                                ? new Date(userContract.employer_signed_at).toLocaleDateString(
                                    'en-GB'
                                  )
                                : '—'}
                            </span>
                          </p>
                        ) : (
                          <p className="text-sm text-white/70">Not signed</p>
                        )}
                      </div>
                      {!employerSigned && (
                        <Button
                          onClick={() => setSignSheetOpen(true)}
                          className="h-11 px-4 shrink-0 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
                        >
                          <PenTool className="h-4 w-4 mr-2" />
                          Sign as employer
                        </Button>
                      )}
                    </div>

                    {/* Employee / other party */}
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-white/60">
                          {category === 'Subcontractor' ? 'Subcontractor' : 'Employee'}
                        </p>
                        {employeeSigned ? (
                          <p className="text-sm text-white flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-400 shrink-0" />
                            <span className="truncate">
                              Signed by {employeeRequest?.signer_name} on{' '}
                              {employeeRequest?.signed_at
                                ? new Date(employeeRequest.signed_at).toLocaleDateString('en-GB')
                                : '—'}
                            </span>
                          </p>
                        ) : employeeAwaiting ? (
                          <p className="text-sm text-amber-400 flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">
                              Awaiting signature — {employeeRequest?.signer_name}
                            </span>
                          </p>
                        ) : employeeRequest?.status === 'Declined' ? (
                          <p className="text-sm text-red-400">
                            Declined by {employeeRequest.signer_name}
                          </p>
                        ) : (
                          <p className="text-sm text-white/70">Not sent for signature</p>
                        )}
                      </div>
                      {!employeeSigned &&
                        (employeeAwaiting && employeeRequest?.access_token ? (
                          <Button
                            variant="outline"
                            onClick={handleCopySigningLink}
                            className="h-11 px-4 shrink-0 touch-manipulation border-white/[0.15] text-white hover:bg-white/[0.08]"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy link
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setRequestSignerName(
                                userContract.party_name || userContract.employee?.name || ''
                              );
                              setSendSheetOpen(true);
                            }}
                            className="h-11 px-4 shrink-0 touch-manipulation border-white/[0.15] text-white hover:bg-white/[0.08]"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send for signature
                          </Button>
                        ))}
                    </div>
                  </div>

                  {/* Lifecycle: record execution/expiry/termination on the system record */}
                  <div className="mt-2">
                    <Field label="Contract status">
                      <Select
                        // defaultValue: the prop is a snapshot from the list —
                        // keep the user's choice visible until data refreshes.
                        defaultValue={userContract.status}
                        onValueChange={(v) =>
                          updateStatus.mutate({ id: userContract.id, status: v as ContractStatus })
                        }
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                          {(['Draft', 'Active', 'Expired', 'Terminated'] as ContractStatus[]).map(
                            (s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Editor styles */}
          <style>{`
            .ProseMirror {
              outline: none;
            }
            .ProseMirror.is-editor-empty:first-child::before {
              content: attr(data-placeholder);
              float: left;
              color: rgba(255, 255, 255, 0.3);
              pointer-events: none;
              height: 0;
            }
            .ProseMirror h2 {
              font-size: 1.25rem;
              margin-top: 1.5rem;
              margin-bottom: 0.5rem;
            }
            .ProseMirror h3 {
              font-size: 1.1rem;
              margin-top: 1.25rem;
              margin-bottom: 0.5rem;
            }
            .ProseMirror ul, .ProseMirror ol {
              padding-left: 1.5rem;
              margin: 0.75rem 0;
            }
            .ProseMirror li {
              margin: 0.25rem 0;
            }
            .ProseMirror p {
              margin: 0.5rem 0;
            }
          `}</style>
        </ResponsiveFormModalBody>

        {/* Footer */}
        <ResponsiveFormModalFooter>
          <div className="flex flex-col sm:flex-row gap-3">
            {showAdoptForm ? (
              <>
                <SecondaryButton onClick={() => setShowAdoptForm(false)} fullWidth size="lg">
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={handleAdopt}
                  disabled={adoptContract.isPending}
                  fullWidth
                  size="lg"
                >
                  {adoptContract.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  Create Contract
                </PrimaryButton>
              </>
            ) : isEditing ? (
              <>
                <SecondaryButton onClick={handleCancelEdit} fullWidth size="lg">
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={handleSave}
                  disabled={updateContract.isPending || !hasChanges}
                  fullWidth
                  size="lg"
                >
                  {updateContract.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </PrimaryButton>
              </>
            ) : (
              <>
                <SecondaryButton onClick={handleExportPdf} disabled={isExporting} fullWidth size="lg">
                  {isExporting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Export PDF
                </SecondaryButton>
                {isTemplate && !isAdopted && (
                  <PrimaryButton
                    onClick={() => setShowAdoptForm(true)}
                    fullWidth
                    size="lg"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Use This Template
                  </PrimaryButton>
                )}
                {isTemplate && isAdopted && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Check className="h-4 w-4" />
                    Already adopted
                  </div>
                )}
                {userContract && (
                  <>
                    <SecondaryButton onClick={() => setIsEditing(true)} fullWidth size="lg">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </SecondaryButton>
                    <PrimaryButton onClick={() => onOpenChange(false)} fullWidth size="lg">
                      Close
                    </PrimaryButton>
                  </>
                )}
              </>
            )}
          </div>
        </ResponsiveFormModalFooter>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>

    {/* Sign as employer — bottom sheet */}
    <Sheet open={signSheetOpen} onOpenChange={setSignSheetOpen}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl border-white/[0.08] bg-[hsl(0_0%_7%)] max-h-[85vh] overflow-y-auto pb-8"
      >
        <div className="mx-auto w-full max-w-lg">
          <div className="mx-auto mt-1 mb-3 h-1 w-10 rounded-full bg-white/[0.15]" />
          <SheetHeader className="text-left">
            <SheetTitle className="text-white flex items-center gap-2">
              <PenTool className="h-5 w-5 text-elec-yellow" />
              Sign as employer
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-4">
            <Field label="Your full name">
              <Input
                value={employerSignerName}
                onChange={(e) => setEmployerSignerName(e.target.value)}
                placeholder="Name of the person signing"
                className={inputClass}
              />
            </Field>
            <Field label="Signature">
              <SignatureInput
                value={employerSignature || ''}
                onChange={setEmployerSignature}
                placeholder="Type your name"
              />
            </Field>
            <p className="text-xs text-white/60 leading-relaxed">
              By signing you confirm agreement to this contract on behalf of your company. Your
              name, signature and the date will be recorded on the contract and shown on the
              exported PDF.
            </p>
            <PrimaryButton
              onClick={handleEmployerSign}
              disabled={
                !employerSignerName.trim() || !employerSignature || signAsEmployer.isPending
              }
              fullWidth
              size="lg"
            >
              {signAsEmployer.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              Sign contract
            </PrimaryButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>

    {/* Send for signature — bottom sheet (rides the Signatures rail) */}
    <Sheet open={sendSheetOpen} onOpenChange={setSendSheetOpen}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl border-white/[0.08] bg-[hsl(0_0%_7%)] max-h-[85vh] overflow-y-auto pb-8"
      >
        <div className="mx-auto w-full max-w-lg">
          <div className="mx-auto mt-1 mb-3 h-1 w-10 rounded-full bg-white/[0.15]" />
          <SheetHeader className="text-left">
            <SheetTitle className="text-white flex items-center gap-2">
              <Send className="h-5 w-5 text-elec-yellow" />
              Send for signature
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-4">
            <Field label="Signer name">
              <Input
                value={requestSignerName}
                onChange={(e) => setRequestSignerName(e.target.value)}
                placeholder="Who needs to sign?"
                className={inputClass}
              />
            </Field>
            <Field label="Email (optional — leave blank to share a link instead)">
              <Input
                type="email"
                value={requestSignerEmail}
                onChange={(e) => setRequestSignerEmail(e.target.value)}
                placeholder="name@example.com"
                className={inputClass}
              />
            </Field>
            <Field label="Message (optional)">
              <Textarea
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Add a short note for the signer…"
                rows={2}
                className="touch-manipulation text-base bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow resize-none"
              />
            </Field>
            <p className="text-xs text-white/60 leading-relaxed">
              They will get a secure signing link to review and sign this contract. Once signed,
              their signature appears here and on the exported PDF.
            </p>
            <PrimaryButton
              onClick={handleSendForSignature}
              disabled={!requestSignerName.trim() || createSignatureRequest.isPending}
              fullWidth
              size="lg"
            >
              {createSignatureRequest.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {requestSignerEmail.trim() ? 'Send request' : 'Create signing link'}
            </PrimaryButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
    </>
  );
}
