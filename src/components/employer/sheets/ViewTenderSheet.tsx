import { useState, useRef } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  FileText,
  Send,
  Trash2,
  Check,
  Phone,
  Mail,
  Calendar,
  Clock,
  Loader2,
  Upload,
  Download,
  Trophy,
  XCircle,
  Briefcase,
  User,
  FileIcon,
  X,
} from 'lucide-react';
import {
  useUpdateTender,
  useUpdateTenderStatus,
  useDeleteTender,
  useUploadTenderDocument,
  useDeleteTenderDocument,
  type Tender,
} from '@/hooks/useTenders';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Pill,
  Eyebrow,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';

interface ViewTenderSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tender: Tender | null;
  onConvertToJob?: (tender: Tender) => void;
}

interface TenderDocument {
  id: string;
  name: string;
  url: string;
  size?: number;
  uploaded_at: string;
}

export function ViewTenderSheet({
  open,
  onOpenChange,
  tender,
  onConvertToJob,
}: ViewTenderSheetProps) {
  const updateTenderMutation = useUpdateTender();
  const updateStatusMutation = useUpdateTenderStatus();
  const deleteMutation = useDeleteTender();
  const uploadDocMutation = useUploadTenderDocument();
  const deleteDocMutation = useDeleteTenderDocument();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultAction, setResultAction] = useState<'Won' | 'Lost'>('Won');
  const [isUploading, setIsUploading] = useState(false);

  const [editForm, setEditForm] = useState({
    title: '',
    client: '',
    value: 0,
    deadline: '',
    category: '',
    description: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    notes: '',
  });

  if (!tender) return null;

  const documents: TenderDocument[] = Array.isArray(tender.documents) ? tender.documents : [];

  const statusTone: Record<string, 'amber' | 'blue' | 'emerald' | 'red' | 'yellow'> = {
    Open: 'amber',
    Submitted: 'blue',
    Won: 'emerald',
    Lost: 'red',
    Withdrawn: 'amber',
  };

  const handleSubmit = () => {
    updateStatusMutation.mutate({ id: tender.id, status: 'Submitted' });
  };

  const handleMarkResult = (result: 'Won' | 'Lost') => {
    setResultAction(result);
    setShowResultDialog(true);
  };

  const confirmResult = () => {
    updateStatusMutation.mutate({
      id: tender.id,
      status: resultAction,
      resultDate: new Date().toISOString().split('T')[0],
    });
    setShowResultDialog(false);
  };

  const handleWithdraw = () => {
    updateStatusMutation.mutate({ id: tender.id, status: 'Withdrawn' });
  };

  const handleReopen = () => {
    updateStatusMutation.mutate({ id: tender.id, status: 'Open' });
  };

  const handleEdit = () => {
    setEditForm({
      title: tender.title,
      client: tender.client,
      value: tender.value,
      deadline: tender.deadline || '',
      category: tender.category || '',
      description: tender.description || '',
      contact_name: tender.contact_name || '',
      contact_email: tender.contact_email || '',
      contact_phone: tender.contact_phone || '',
      notes: tender.notes || '',
    });
    setShowEditDialog(true);
  };

  const saveEdit = () => {
    updateTenderMutation.mutate({
      id: tender.id,
      data: {
        title: editForm.title,
        client: editForm.client,
        value: editForm.value,
        deadline: editForm.deadline || undefined,
        category: editForm.category || undefined,
        description: editForm.description || undefined,
        contact_name: editForm.contact_name || undefined,
        contact_email: editForm.contact_email || undefined,
        contact_phone: editForm.contact_phone || undefined,
        notes: editForm.notes || undefined,
      },
    });
    setShowEditDialog(false);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        await uploadDocMutation.mutateAsync({ tenderId: tender.id, file });
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteDocument = async (doc: TenderDocument) => {
    deleteDocMutation.mutate({ tenderId: tender.id, documentId: doc.id, url: doc.url });
  };

  const handleDownloadDocument = (doc: TenderDocument) => {
    openExternalUrl(doc.url);
  };

  const handleConvert = () => {
    if (onConvertToJob) {
      onConvertToJob(tender);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
          <SheetShell
            eyebrow={tender.tender_number || 'Tender'}
            title={tender.title}
            description={
              <span className="flex items-center gap-2">
                <Pill tone={statusTone[tender.status] ?? 'amber'}>{tender.status}</Pill>
                <span>{tender.client}</span>
              </span>
            }
            footer={
              tender.status === 'Open' ? (
                <>
                  <SecondaryButton onClick={handleWithdraw} fullWidth>
                    Withdraw
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleSubmit}
                    disabled={updateStatusMutation.isPending}
                    fullWidth
                  >
                    {updateStatusMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Mark submitted
                  </PrimaryButton>
                </>
              ) : tender.status === 'Submitted' ? (
                <>
                  <SecondaryButton
                    onClick={() => handleMarkResult('Lost')}
                    disabled={updateStatusMutation.isPending}
                    fullWidth
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Lost
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={() => handleMarkResult('Won')}
                    disabled={updateStatusMutation.isPending}
                    fullWidth
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    Won
                  </PrimaryButton>
                </>
              ) : tender.status === 'Won' && onConvertToJob ? (
                <>
                  <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                    Close
                  </SecondaryButton>
                  <PrimaryButton onClick={handleConvert} fullWidth>
                    <Briefcase className="h-4 w-4 mr-2" />
                    Convert to job
                  </PrimaryButton>
                </>
              ) : tender.status === 'Lost' || tender.status === 'Withdrawn' ? (
                <>
                  <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                    Close
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleReopen}
                    disabled={updateStatusMutation.isPending}
                    fullWidth
                  >
                    Reopen tender
                  </PrimaryButton>
                </>
              ) : (
                <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                  Close
                </SecondaryButton>
              )
            }
          >
            {tender.status === 'Won' && (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-emerald-400">Tender won</p>
                    {tender.result_date && (
                      <p className="text-sm text-white">
                        Won on {format(new Date(tender.result_date), 'd MMM yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {tender.status === 'Lost' && (
              <div className="rounded-2xl bg-red-500/10 border border-red-500/25 p-4">
                <div className="flex items-center gap-3">
                  <XCircle className="h-6 w-6 text-red-400" />
                  <div>
                    <p className="font-semibold text-red-400">Tender lost</p>
                    {tender.result_date && (
                      <p className="text-sm text-white">
                        Result received {format(new Date(tender.result_date), 'd MMM yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-2xl p-4 bg-elec-yellow/10 border border-elec-yellow/30">
              <div className="flex items-center justify-between">
                <span className="text-white">Tender value</span>
                <span className="text-2xl font-bold text-elec-yellow tabular-nums">
                  £{Number(tender.value).toLocaleString()}
                </span>
              </div>
            </div>

            <FormCard eyebrow="Tender details">
              {tender.description && (
                <div>
                  <Eyebrow>Description</Eyebrow>
                  <p className="font-medium text-white whitespace-pre-line mt-0.5">
                    {tender.description}
                  </p>
                </div>
              )}

              <FormGrid cols={2}>
                {tender.category && (
                  <div>
                    <Eyebrow>Category</Eyebrow>
                    <p className="font-medium text-white mt-0.5">{tender.category}</p>
                  </div>
                )}
                {tender.deadline && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-white" />
                    <div>
                      <Eyebrow>Deadline</Eyebrow>
                      <p
                        className={cn(
                          'font-medium mt-0.5',
                          new Date(tender.deadline) < new Date() ? 'text-red-400' : 'text-white'
                        )}
                      >
                        {format(new Date(tender.deadline), 'd MMM yyyy')}
                      </p>
                    </div>
                  </div>
                )}
                {tender.submission_date && (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-white" />
                    <div>
                      <Eyebrow>Submitted</Eyebrow>
                      <p className="font-medium text-white mt-0.5">
                        {format(new Date(tender.submission_date), 'd MMM yyyy')}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-white" />
                  <div>
                    <Eyebrow>Created</Eyebrow>
                    <p className="font-medium text-white mt-0.5">
                      {format(new Date(tender.created_at), 'd MMM yyyy')}
                    </p>
                  </div>
                </div>
              </FormGrid>
            </FormCard>

            {(tender.contact_name || tender.contact_email || tender.contact_phone) && (
              <FormCard eyebrow="Contact">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-white" />
                  {tender.contact_name && (
                    <span className="font-medium text-white">{tender.contact_name}</span>
                  )}
                </div>
                <FormGrid cols={2}>
                  {tender.contact_phone && (
                    <SecondaryButton
                      onClick={() => (window.location.href = `tel:${tender.contact_phone}`)}
                      fullWidth
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      {tender.contact_phone}
                    </SecondaryButton>
                  )}
                  {tender.contact_email && (
                    <SecondaryButton
                      onClick={() => (window.location.href = `mailto:${tender.contact_email}`)}
                      fullWidth
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </SecondaryButton>
                  )}
                </FormGrid>
              </FormCard>
            )}

            <FormCard eyebrow="Documents">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4 text-white" />
                  <Eyebrow>Tender files</Eyebrow>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <SecondaryButton
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <Upload className="h-4 w-4 mr-1" />
                  )}
                  Upload
                </SecondaryButton>
              </div>

              {documents.length === 0 ? (
                <div className="text-center py-6 text-white">
                  <FileIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No documents uploaded</p>
                  <p className="text-xs">Upload tender specs, drawings, BOQs</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <FileIcon className="h-4 w-4 text-white shrink-0" />
                        <span className="text-sm text-white truncate">{doc.name}</span>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          className="h-8 w-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-white"
                          onClick={() => handleDownloadDocument(doc)}
                          aria-label="Download"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          className="h-8 w-8 rounded-full bg-white/[0.04] hover:bg-red-500/15 flex items-center justify-center text-white hover:text-red-400"
                          onClick={() => handleDeleteDocument(doc)}
                          aria-label="Delete"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FormCard>

            {tender.notes && (
              <FormCard eyebrow="Notes">
                <p className="text-sm text-white whitespace-pre-wrap">{tender.notes}</p>
              </FormCard>
            )}

            <FormGrid cols={2}>
              <SecondaryButton onClick={handleEdit} fullWidth>
                <FileText className="h-4 w-4 mr-2" />
                Edit details
              </SecondaryButton>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DestructiveButton fullWidth>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DestructiveButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete tender?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete tender "{tender.title}" for {tender.client}.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive hover:bg-destructive/90"
                      onClick={() => {
                        deleteMutation.mutate(tender.id, {
                          onSuccess: () => onOpenChange(false),
                        });
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </FormGrid>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit tender</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Field label="Title">
              <Input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Client">
              <Input
                value={editForm.client}
                onChange={(e) => setEditForm({ ...editForm, client: e.target.value })}
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Value (£)">
                <Input
                  type="number"
                  value={editForm.value}
                  onChange={(e) => setEditForm({ ...editForm, value: Number(e.target.value) })}
                  className={inputClass}
                />
              </Field>
              <Field label="Deadline">
                <Input
                  type="date"
                  value={editForm.deadline}
                  onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field label="Category">
              <Input
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                placeholder="e.g., Commercial, Residential"
                className={inputClass}
              />
            </Field>
            <Field label="Description">
              <Textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
                className={cn(textareaClass, 'min-h-[96px]')}
              />
            </Field>
            <div className="h-px w-full bg-white/[0.08]" />
            <h4 className="font-medium text-white">Contact details</h4>
            <Field label="Contact name">
              <Input
                value={editForm.contact_name}
                onChange={(e) => setEditForm({ ...editForm, contact_name: e.target.value })}
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Email">
                <Input
                  type="email"
                  value={editForm.contact_email}
                  onChange={(e) => setEditForm({ ...editForm, contact_email: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={editForm.contact_phone}
                  onChange={(e) => setEditForm({ ...editForm, contact_phone: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field label="Notes">
              <Textarea
                value={editForm.notes}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                rows={3}
                className={cn(textareaClass, 'min-h-[96px]')}
              />
            </Field>
          </div>
          <DialogFooter>
            <SecondaryButton onClick={() => setShowEditDialog(false)}>Cancel</SecondaryButton>
            <PrimaryButton
              onClick={saveEdit}
              disabled={updateTenderMutation.isPending || !editForm.title || !editForm.client}
            >
              {updateTenderMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              <Check className="h-4 w-4 mr-2" />
              Save changes
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Result Confirmation Dialog */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {resultAction === 'Won' ? 'Mark tender as won' : 'Mark tender as lost'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-white text-sm">
              {resultAction === 'Won'
                ? `Congratulations! You're marking "${tender.title}" as won. This will record today as the result date.`
                : `You're marking "${tender.title}" as lost. This will record today as the result date.`}
            </p>
          </div>
          <DialogFooter>
            <SecondaryButton onClick={() => setShowResultDialog(false)}>Cancel</SecondaryButton>
            <PrimaryButton
              onClick={confirmResult}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              {resultAction === 'Won' ? 'Mark as won' : 'Mark as lost'}
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
