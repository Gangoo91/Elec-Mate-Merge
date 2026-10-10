import { useState, useRef, useEffect, type ReactNode } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload, Download, X, Phone, Mail, ExternalLink } from 'lucide-react';
import {
  useUpdateTender,
  useUpdateTenderStatus,
  useDeleteTender,
  useUploadTenderDocument,
  useDeleteTenderDocument,
  type Tender,
} from '@/hooks/useTenders';
import { format } from 'date-fns';
import FormSheet from '@/components/forms/FormSheet';
import { TenderPrequalCard } from '@/components/employer/tenders/TenderPrequalCard';
import { SendPackSheet } from '@/components/employer/compliance/SendPackSheet';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { cn } from '@/lib/utils';
import {
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import {
  panel,
  PanelTitle,
  StatusPill,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';

/** A label on the left, its value on the right: one row of a details panel. */
function KV({ label, value, tone }: { label: string; value: ReactNode; tone?: 'red' | 'green' }) {
  return (
    <li className="flex items-baseline justify-between gap-4 px-4 py-3 sm:px-5">
      <span className="shrink-0 text-[14px] text-white">{label}</span>
      <span
        className={cn(
          'min-w-0 text-right text-[15px] font-semibold tabular-nums',
          tone === 'red' ? 'text-red-400' : tone === 'green' ? 'text-emerald-400' : 'text-white'
        )}
      >
        {value}
      </span>
    </li>
  );
}

const quietBtn =
  'inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.1] disabled:opacity-50';

interface ViewTenderSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tender: Tender | null;
  onConvertToJob?: (tender: Tender) => void;
  onAIEstimate?: (tender: Tender) => void;
}

interface TenderDocument {
  id: string;
  name: string;
  url: string;
  size?: number;
  uploaded_at: string;
}

const MONEY_NOTE = /^\s*AI estimate:/i;
const moneyLines = (notes?: string | null) =>
  (notes || '')
    .split('\n')
    .filter((l) => MONEY_NOTE.test(l))
    .join('\n');
const withoutMoneyLines = (notes?: string | null) =>
  (notes || '')
    .split('\n')
    .filter((l) => !MONEY_NOTE.test(l))
    .join('\n')
    .trim();

export function ViewTenderSheet({
  open,
  onOpenChange,
  tender,
  onConvertToJob,
  onAIEstimate,
}: ViewTenderSheetProps) {
  const updateTenderMutation = useUpdateTender();
  const updateStatusMutation = useUpdateTenderStatus();
  const deleteMutation = useDeleteTender();
  const uploadDocMutation = useUploadTenderDocument();
  const deleteDocMutation = useDeleteTenderDocument();
  // Office managers never see the bid value (can_see_firm_money)
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = !!roleInfo?.canSeeMoney;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultAction, setResultAction] = useState<'Won' | 'Lost'>('Won');
  const [isUploading, setIsUploading] = useState(false);
  // Delete confirms in place inside the sheet (ELE-1994), not in a centred dialog
  const [confirmDelete, setConfirmDelete] = useState(false);
  // Gap §4.2: the documents a buyer asks for go through Send our pack, the
  // same pack Compliance sends, never a second prequal output.
  const [showPack, setShowPack] = useState(false);
  useEffect(() => {
    if (!open) {
      setConfirmDelete(false);
      setShowResultDialog(false);
    }
  }, [open, tender?.id]);

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

  const statusTone: PillTone =
    tender.status === 'Won' ? 'green' : tender.status === 'Lost' ? 'red' : 'neutral';
  const statusLabel = tender.status;

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
      notes: canSeeMoney ? tender.notes || '' : withoutMoneyLines(tender.notes),
    });
    setShowEditDialog(true);
  };

  // "Use this estimate" writes the AI price breakdown into notes. Roles that
  // can't see firm money never see it, and editing keeps it intact for them.
  const notesForView = canSeeMoney ? tender.notes || '' : withoutMoneyLines(tender.notes);
  const hiddenNoteLines = canSeeMoney ? '' : moneyLines(tender.notes);

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
        notes: [editForm.notes.trim(), hiddenNoteLines].filter(Boolean).join('\n') || undefined,
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

  const past = !!tender.deadline && new Date(tender.deadline) < new Date();
  const live = tender.status === 'Open' || tender.status === 'Submitted';

  // Won and Lost confirm in place in the footer, the way Delete does (no
  // centred dialog over a bottom sheet)
  const footer = showResultDialog ? (
    <div className="space-y-2">
      <p className="text-[13px] leading-snug text-white">
        Mark "{tender.title}" as {resultAction === 'Won' ? 'won' : 'lost'}? Today is recorded as the
        result date.
      </p>
      <div className="flex gap-2">
        <SecondaryButton onClick={() => setShowResultDialog(false)} fullWidth>
          Cancel
        </SecondaryButton>
        <PrimaryButton onClick={confirmResult} disabled={updateStatusMutation.isPending} fullWidth>
          {updateStatusMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {resultAction === 'Won' ? 'Mark as won' : 'Mark as lost'}
        </PrimaryButton>
      </div>
    </div>
  ) : tender.status === 'Open' ? (
    <div className="flex gap-2">
      {onAIEstimate && (
        <SecondaryButton
          onClick={() => {
            onAIEstimate(tender);
            onOpenChange(false);
          }}
          fullWidth
        >
          <span className="sm:hidden">Estimate</span>
          <span className="hidden sm:inline">AI estimate</span>
        </SecondaryButton>
      )}
      <SecondaryButton onClick={handleWithdraw} fullWidth>
        Withdraw
      </SecondaryButton>
      <PrimaryButton onClick={handleSubmit} disabled={updateStatusMutation.isPending} fullWidth>
        {updateStatusMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <span className="sm:hidden">Submitted</span>
        <span className="hidden sm:inline">Mark submitted</span>
      </PrimaryButton>
    </div>
  ) : tender.status === 'Submitted' ? (
    <div className="flex gap-2">
      <SecondaryButton
        onClick={() => handleMarkResult('Lost')}
        disabled={updateStatusMutation.isPending}
        fullWidth
      >
        Lost
      </SecondaryButton>
      <PrimaryButton
        onClick={() => handleMarkResult('Won')}
        disabled={updateStatusMutation.isPending}
        fullWidth
      >
        Won
      </PrimaryButton>
    </div>
  ) : tender.status === 'Won' && onConvertToJob ? (
    <div className="flex gap-2">
      <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
        Close
      </SecondaryButton>
      <PrimaryButton onClick={handleConvert} fullWidth>
        Convert to job
      </PrimaryButton>
    </div>
  ) : tender.status === 'Lost' || tender.status === 'Withdrawn' ? (
    <div className="flex gap-2">
      <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
        Close
      </SecondaryButton>
      <PrimaryButton onClick={handleReopen} disabled={updateStatusMutation.isPending} fullWidth>
        Reopen tender
      </PrimaryButton>
    </div>
  ) : (
    <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
      Close
    </SecondaryButton>
  );

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        title={tender.title}
        description={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <StatusPill tone={statusTone}>{statusLabel}</StatusPill>
            <span>{[tender.client, tender.tender_number].filter(Boolean).join(' · ')}</span>
          </span>
        }
        footer={footer}
        bodyClassName="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start"
      >
        {/* Desktop: the notice on the left, what you need to bid on the
            right, instead of one long column (ELE-1994 review) */}
        <div className="min-w-0 space-y-6">
          <section>
            <PanelTitle title="Details" />
            <div className={cn(panel, 'overflow-hidden')}>
              <ul className="divide-y divide-white/[0.07]">
                {tender.status === 'Won' && (
                  <KV
                    label="Result"
                    tone="green"
                    value={
                      tender.result_date
                        ? `Won ${format(new Date(tender.result_date), 'd MMM yyyy')}`
                        : 'Won'
                    }
                  />
                )}
                {tender.status === 'Lost' && (
                  <KV
                    label="Result"
                    tone="red"
                    value={
                      tender.result_date
                        ? `Lost ${format(new Date(tender.result_date), 'd MMM yyyy')}`
                        : 'Lost'
                    }
                  />
                )}
                {canSeeMoney && (
                  <KV
                    label="Tender value"
                    value={
                      Number(tender.value) > 0
                        ? `£${Number(tender.value).toLocaleString()}`
                        : 'Not set'
                    }
                  />
                )}
                {tender.deadline && (
                  <KV
                    label="Deadline"
                    tone={past && live ? 'red' : undefined}
                    value={format(new Date(tender.deadline), 'd MMM yyyy')}
                  />
                )}
                {tender.submission_date && (
                  <KV
                    label="Submitted"
                    value={format(new Date(tender.submission_date), 'd MMM yyyy')}
                  />
                )}
                {tender.category && <KV label="Category" value={tender.category} />}
                <KV label="Added" value={format(new Date(tender.created_at), 'd MMM yyyy')} />
              </ul>
              {tender.source_url && (
                <button
                  type="button"
                  onClick={() => openExternalUrl(tender.source_url!)}
                  className="flex h-12 w-full items-center justify-center gap-1.5 border-t border-white/[0.07] text-[14px] font-semibold text-elec-yellow touch-manipulation"
                >
                  View original listing
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>
          </section>

          {tender.description && (
            <section>
              <PanelTitle title="Scope" />
              <div className={cn(panel, 'px-4 py-4 sm:px-5')}>
                <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
                  {tender.description}
                </p>
              </div>
            </section>
          )}

          {(tender.contact_name || tender.contact_email || tender.contact_phone) && (
            <section>
              <PanelTitle title="Contact" />
              <div
                className={cn(
                  panel,
                  'flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:px-5'
                )}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-white">
                    {tender.contact_name || 'Buyer contact'}
                  </p>
                  {tender.contact_email && (
                    <p className="mt-0.5 truncate text-[13px] text-white">{tender.contact_email}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {tender.contact_phone && (
                    <button
                      type="button"
                      onClick={() => (window.location.href = `tel:${tender.contact_phone}`)}
                      className={cn(quietBtn, 'flex-1 sm:flex-none')}
                    >
                      <Phone className="h-4 w-4" />
                      {tender.contact_phone}
                    </button>
                  )}
                  {tender.contact_email && (
                    <button
                      type="button"
                      onClick={() => (window.location.href = `mailto:${tender.contact_email}`)}
                      className={cn(quietBtn, 'flex-1 sm:flex-none')}
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}

          {notesForView && (
            <section>
              <PanelTitle title="Notes" />
              <div className={cn(panel, 'px-4 py-4 sm:px-5')}>
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">
                  {notesForView}
                </p>
              </div>
            </section>
          )}

          <section>
            <PanelTitle
              title="Documents"
              meta={documents.length > 0 ? `${documents.length}` : undefined}
            />
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className={cn(panel, 'overflow-hidden')}>
              {documents.length > 0 && (
                <ul className="divide-y divide-white/[0.07] border-b border-white/[0.07]">
                  {documents.map((doc) => (
                    <li key={doc.id} className="flex items-center gap-2 px-4 py-2 sm:px-5">
                      <p className="min-w-0 flex-1 truncate text-[15px] font-semibold text-white">
                        {doc.name}
                      </p>
                      <button
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
                        onClick={() => handleDownloadDocument(doc)}
                        aria-label={`Download ${doc.name}`}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-red-500/15 hover:text-red-400 touch-manipulation"
                        onClick={() => handleDeleteDocument(doc)}
                        aria-label={`Remove ${doc.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <p className="min-w-0 flex-1 text-[13px] leading-snug text-white">
                  {documents.length === 0
                    ? 'No documents yet. Add the specs, drawings and BOQs.'
                    : 'Specs, drawings and BOQs for this bid.'}
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className={quietBtn}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Upload
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="min-w-0 space-y-6">
          {live && <TenderPrequalCard />}
          {live && roleInfo?.canSeeMoney && (
            <section>
              <PanelTitle title="Documents for the buyer" />
              <div className={cn(panel, 'flex items-center gap-3 px-4 py-3 sm:px-5')}>
                <p className="min-w-0 flex-1 text-[14px] leading-snug text-white">
                  Insurance certificates, policies and accreditations go as one expiring link with
                  Send our pack.
                </p>
                <SecondaryButton onClick={() => setShowPack(true)}>Send our pack</SecondaryButton>
              </div>
            </section>
          )}

          {confirmDelete ? (
            <div className={cn(panel, 'space-y-3 px-4 py-4 sm:px-5')}>
              <p className="text-[14px] leading-snug text-white">
                Delete "{tender.title}" for {tender.client}? Its documents and estimate go too. This
                can't be undone.
              </p>
              <FormGrid cols={2}>
                <SecondaryButton onClick={() => setConfirmDelete(false)} fullWidth>
                  Keep it
                </SecondaryButton>
                <DestructiveButton
                  fullWidth
                  disabled={deleteMutation.isPending}
                  onClick={() =>
                    deleteMutation.mutate(tender.id, {
                      onSuccess: () => onOpenChange(false),
                    })
                  }
                >
                  {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete tender
                </DestructiveButton>
              </FormGrid>
            </div>
          ) : (
            <div className="flex gap-2">
              <button type="button" onClick={handleEdit} className={cn(quietBtn, 'flex-1')}>
                Edit details
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-red-500/40 px-4 text-[14px] font-semibold text-red-400 touch-manipulation hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </FormSheet>

      <FormSheet
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        width="wide"
        title="Edit tender"
        bodyClassName="grid gap-4 lg:grid-cols-2 lg:items-start"
        footer={
          <div className="flex gap-2">
            <SecondaryButton onClick={() => setShowEditDialog(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={saveEdit}
              disabled={updateTenderMutation.isPending || !editForm.title || !editForm.client}
              fullWidth
            >
              {updateTenderMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </PrimaryButton>
          </div>
        }
      >
        <FormCard eyebrow="The tender">
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
          <FormGrid cols={canSeeMoney ? 2 : 1}>
            {canSeeMoney && (
              <Field label="Value (£)">
                <Input
                  type="number"
                  inputMode="decimal"
                  value={editForm.value}
                  onChange={(e) => setEditForm({ ...editForm, value: Number(e.target.value) })}
                  className={inputClass}
                />
              </Field>
            )}
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
              placeholder="e.g. Commercial, Residential"
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
        </FormCard>
        <FormCard eyebrow="Contact and notes">
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
        </FormCard>
    </FormSheet>
      <SendPackSheet open={showPack} onOpenChange={setShowPack} />
    </>
  );
}
