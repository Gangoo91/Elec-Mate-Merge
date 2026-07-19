import { useMemo, useRef, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefreshCw, ExternalLink, Upload, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { openExternalUrl } from '@/utils/open-external-url';
import { useToast } from '@/hooks/use-toast';
import {
  useComplianceDocuments,
  useComplianceStats,
  useCreateComplianceDocument,
  useUpdateComplianceDocument,
  useDeleteComplianceDocument,
  type DocumentType,
  type DocumentCategory,
  type ComplianceDocument,
} from '@/hooks/useComplianceDocuments';
import { useEmployees } from '@/hooks/useEmployees';
import { useJobs } from '@/hooks/useJobs';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  type Tone,
  PrimaryButton,
} from '@/components/employer/editorial';

type FilterValue = 'all' | 'insurance' | 'pat' | 'calibration' | 'audits';

const FILTER_TABS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'pat', label: 'PAT' },
  { value: 'calibration', label: 'Calibration' },
  { value: 'audits', label: 'Audits' },
];

function classifyDocument(doc: ComplianceDocument): FilterValue {
  const haystack = `${doc.title ?? ''} ${doc.category ?? ''} ${doc.document_type ?? ''}`.toLowerCase();
  if (haystack.includes('insurance')) return 'insurance';
  if (haystack.includes('pat') || haystack.includes('portable appliance')) return 'pat';
  if (haystack.includes('calibration') || haystack.includes('calibrate')) return 'calibration';
  if (haystack.includes('audit')) return 'audits';
  return 'all';
}

function daysUntil(dateStr?: string | null): number | null {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  if (Number.isNaN(target.getTime())) return null;
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function statusForDoc(doc: ComplianceDocument): {
  label: string;
  tone: Tone;
  bucket: 'on-track' | 'due-soon' | 'overdue';
} {
  const days = daysUntil(doc.expiry_date);
  if (days === null) {
    return { label: doc.status || 'Active', tone: 'cyan', bucket: 'on-track' };
  }
  if (days < 0) return { label: `Overdue ${Math.abs(days)}d`, tone: 'red', bucket: 'overdue' };
  if (days <= 30) return { label: `Due in ${days}d`, tone: 'amber', bucket: 'due-soon' };
  return { label: `Renews ${days}d`, tone: 'emerald', bucket: 'on-track' };
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return 'no expiry';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(dateStr?: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // matches the bucket's 20MB limit

/** Upload to the private compliance-documents bucket ({uid}/... path per its
 *  RLS policies) and return the storage path stored in file_url. */
async function uploadComplianceFile(file: File): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const path = `${user.id}/${Date.now()}-${safeName}`;
  const { data, error } = await supabase.storage
    .from('compliance-documents')
    .upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (error) throw error;
  return data.path;
}

export function ComplianceSection() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');
  const [selected, setSelected] = useState<ComplianceDocument | null>(null);

  const { data: documents, isLoading, error, refetch } = useComplianceDocuments();
  const createDocument = useCreateComplianceDocument();
  const updateDocument = useUpdateComplianceDocument();
  const deleteDocument = useDeleteComplianceDocument();
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();
  const [addOpen, setAddOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const EMPTY_DOC = {
    title: '',
    document_type: 'Certificate' as DocumentType,
    category: 'Insurance' as DocumentCategory,
    expiry_date: '',
    notes: '',
    employee_id: '',
    job_id: '',
  };
  const [newDoc, setNewDoc] = useState(EMPTY_DOC);
  const [editDoc, setEditDoc] = useState(EMPTY_DOC);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const newFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const pickFile =
    (setFile: (f: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      // Allow re-selecting the same file after clearing
      e.target.value = '';
      if (!file) return;
      if (file.size > MAX_UPLOAD_BYTES) {
        toast({
          title: 'File too large',
          description: 'Documents must be 20MB or smaller.',
          variant: 'destructive',
        });
        return;
      }
      setFile(file);
    };

  const employeeNameById = useMemo(
    () => new Map(employees.map((e) => [e.id, e.name])),
    [employees]
  );
  const jobTitleById = useMemo(() => new Map(jobs.map((j) => [j.id, j.title])), [jobs]);

  const handleAddDocument = async () => {
    if (!newDoc.title.trim()) return;
    let fileUrl: string | undefined;
    if (newFile) {
      setIsUploading(true);
      try {
        fileUrl = await uploadComplianceFile(newFile);
      } catch (err) {
        toast({
          title: 'Upload failed',
          description:
            err instanceof Error ? err.message : 'Could not upload the document. Try again.',
          variant: 'destructive',
        });
        return;
      } finally {
        setIsUploading(false);
      }
    }
    await createDocument.mutateAsync({
      title: newDoc.title.trim(),
      document_type: newDoc.document_type,
      category: newDoc.category,
      status: 'Current',
      expiry_date: newDoc.expiry_date || undefined,
      notes: newDoc.notes.trim() || undefined,
      employee_id: newDoc.employee_id || undefined,
      job_id: newDoc.job_id || undefined,
      file_url: fileUrl,
      signatures_required: 0,
      signatures_collected: 0,
    });
    setAddOpen(false);
    setNewDoc(EMPTY_DOC);
    setNewFile(null);
  };

  const startEditing = (doc: ComplianceDocument) => {
    setEditDoc({
      title: doc.title ?? '',
      document_type: (doc.document_type ?? 'Certificate') as DocumentType,
      category: (doc.category ?? 'Insurance') as DocumentCategory,
      expiry_date: doc.expiry_date ? doc.expiry_date.slice(0, 10) : '',
      notes: doc.notes ?? '',
      employee_id: doc.employee_id ?? '',
      job_id: doc.job_id ?? '',
    });
    setEditFile(null);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!selected || !editDoc.title.trim()) return;
    let fileUrl: string | undefined;
    if (editFile) {
      setIsUploading(true);
      try {
        fileUrl = await uploadComplianceFile(editFile);
      } catch (err) {
        toast({
          title: 'Upload failed',
          description:
            err instanceof Error ? err.message : 'Could not upload the document. Try again.',
          variant: 'destructive',
        });
        return;
      } finally {
        setIsUploading(false);
      }
    }
    const updated = await updateDocument.mutateAsync({
      id: selected.id,
      title: editDoc.title.trim(),
      document_type: editDoc.document_type,
      category: editDoc.category,
      // null (not undefined) so cleared values actually clear in the DB
      expiry_date: editDoc.expiry_date || null,
      notes: editDoc.notes.trim() || null,
      employee_id: editDoc.employee_id || null,
      job_id: editDoc.job_id || null,
      ...(fileUrl ? { file_url: fileUrl } : {}),
    });
    setSelected(updated);
    setEditFile(null);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!selected) return;
    await deleteDocument.mutateAsync(selected.id);
    setConfirmDelete(false);
    setIsEditing(false);
    setSelected(null);
  };

  const handleViewDocument = async () => {
    if (!selected?.file_url) return;
    // Legacy rows may hold a full URL; new uploads store a private-bucket path
    // that needs a short-lived signed URL.
    if (selected.file_url.startsWith('http')) {
      await openExternalUrl(selected.file_url);
      return;
    }
    const { data, error: signError } = await supabase.storage
      .from('compliance-documents')
      .createSignedUrl(selected.file_url, 3600);
    if (signError || !data?.signedUrl) {
      toast({
        title: 'Could not open document',
        description: 'The file could not be retrieved. Try again.',
        variant: 'destructive',
      });
      return;
    }
    await openExternalUrl(data.signedUrl);
  };
  const { data: stats } = useComplianceStats();

  const enriched = useMemo(() => {
    return (documents ?? []).map((doc) => ({
      doc,
      kind: classifyDocument(doc),
      status: statusForDoc(doc),
    }));
  }, [documents]);

  const counters = useMemo(() => {
    let onTrack = 0;
    let dueSoon = 0;
    let overdue = 0;
    let audits = 0;
    for (const item of enriched) {
      if (item.status.bucket === 'on-track') onTrack += 1;
      if (item.status.bucket === 'due-soon') dueSoon += 1;
      if (item.status.bucket === 'overdue') overdue += 1;
      if (item.kind === 'audits') audits += 1;
    }
    if (stats?.total !== undefined && enriched.length === 0) {
      // The stats hook exposes `current`, not `compliant` — the old field name
      // was a type error and always fell through to 0.
      onTrack = stats.current ?? onTrack;
      dueSoon = stats.expiring ?? dueSoon;
      overdue = stats.expired ?? overdue;
    }
    return { onTrack, dueSoon, overdue, audits };
  }, [enriched, stats]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return enriched
      .filter((item) => {
        if (filter !== 'all' && item.kind !== filter) return false;
        if (!term) return true;
        const haystack = `${item.doc.title ?? ''} ${item.doc.category ?? ''} ${item.doc.document_type ?? ''}`.toLowerCase();
        return haystack.includes(term);
      })
      .sort((a, b) => {
        const ad = a.doc.expiry_date ? new Date(a.doc.expiry_date).getTime() : Number.POSITIVE_INFINITY;
        const bd = b.doc.expiry_date ? new Date(b.doc.expiry_date).getTime() : Number.POSITIVE_INFINITY;
        return ad - bd;
      });
  }, [enriched, filter, search]);

  const renewalReminders = useMemo(() => {
    return enriched
      .filter((item) => item.status.bucket !== 'on-track')
      .sort((a, b) => {
        const ad = a.doc.expiry_date ? new Date(a.doc.expiry_date).getTime() : Number.POSITIVE_INFINITY;
        const bd = b.doc.expiry_date ? new Date(b.doc.expiry_date).getTime() : Number.POSITIVE_INFINITY;
        return ad - bd;
      })
      .slice(0, 6);
  }, [enriched]);

  const auditTrail = useMemo(() => {
    return [...(documents ?? [])]
      .sort((a, b) => {
        const at = new Date(a.updated_at ?? a.created_at ?? 0).getTime();
        const bt = new Date(b.updated_at ?? b.created_at ?? 0).getTime();
        return bt - at;
      })
      .slice(0, 8);
  }, [documents]);

  if (error) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="HR & Safety"
          title="Compliance"
          description="Insurance renewals, PAT schedule, calibration and audit trail."
          tone="cyan"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Retry">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />
        <EmptyState
          title="Failed to load compliance data"
          description="We could not retrieve compliance documents. Please retry."
          action="Retry"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="HR & Safety"
        title="Compliance"
        description="Insurance renewals, PAT schedule, calibration and audit trail."
        tone="cyan"
        actions={
          <>
            <PrimaryButton onClick={() => setAddOpen(true)}>Add document</PrimaryButton>
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'On track', value: counters.onTrack, tone: 'emerald' },
          { label: 'Due 30d', value: counters.dueSoon, tone: 'amber' },
          { label: 'Overdue', value: counters.overdue, tone: 'red' },
          { label: 'Audit docs', value: counters.audits, accent: true },
        ]}
      />

      <FilterBar
        tabs={FILTER_TABS}
        activeTab={filter}
        onTabChange={(value) => setFilter(value as FilterValue)}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search compliance…"
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <ListCard>
            <ListCardHeader
              tone="cyan"
              title="Compliance Calendar"
              meta={<Pill tone="cyan">{filtered.length}</Pill>}
            />
            <ListBody>
              {filtered.length === 0 ? (
                <div className="px-4 py-8">
                  <EmptyState
                    title={
                      (documents?.length ?? 0) === 0
                        ? 'No compliance records yet'
                        : 'No matching compliance items'
                    }
                    description={
                      (documents?.length ?? 0) === 0
                        ? 'Add your insurance, PAT and calibration renewals to track them here.'
                        : 'Adjust the filters or search to see scheduled renewals.'
                    }
                    action={(documents?.length ?? 0) === 0 ? 'Add document' : undefined}
                    onAction={(documents?.length ?? 0) === 0 ? () => setAddOpen(true) : undefined}
                  />
                </div>
              ) : (
                filtered.map((item) => (
                  <ListRow
                    key={item.doc.id}
                    title={item.doc.title}
                    subtitle={`${item.doc.document_type ?? item.doc.category ?? 'Document'} \u00B7 renews ${formatDate(item.doc.expiry_date)}`}
                    trailing={<Pill tone={item.status.tone}>{item.status.label}</Pill>}
                    onClick={() => setSelected(item.doc)}
                  />
                ))
              )}
            </ListBody>
          </ListCard>

          {renewalReminders.length > 0 && (
            <ListCard>
              <ListCardHeader
                tone="amber"
                title="Renewal Reminders"
                meta={<Pill tone="amber">{renewalReminders.length}</Pill>}
              />
              <ListBody>
                {renewalReminders.map((item) => (
                  <ListRow
                    key={`reminder-${item.doc.id}`}
                    title={item.doc.title}
                    subtitle={`${item.doc.category ?? item.doc.document_type ?? 'Document'} \u00B7 ${formatDate(item.doc.expiry_date)}`}
                    trailing={<Pill tone={item.status.tone}>{item.status.label}</Pill>}
                    onClick={() => setSelected(item.doc)}
                  />
                ))}
              </ListBody>
            </ListCard>
          )}

          <ListCard>
            <ListCardHeader
              tone="indigo"
              title="Audit Trail"
              meta={<Pill tone="indigo">{auditTrail.length}</Pill>}
            />
            <ListBody>
              {auditTrail.length === 0 ? (
                <div className="px-4 py-8">
                  <EmptyState
                    title="No recent activity"
                    description="Compliance updates and signatures will appear here."
                  />
                </div>
              ) : (
                auditTrail.map((doc) => {
                  const wasUpdated = doc.updated_at && doc.updated_at !== doc.created_at;
                  const action = wasUpdated ? 'Updated' : 'Created';
                  const when = formatDateTime(doc.updated_at ?? doc.created_at);
                  const tone: Tone = wasUpdated ? 'emerald' : 'cyan';
                  return (
                    <ListRow
                      key={`audit-${doc.id}-${doc.updated_at ?? doc.created_at}`}
                      title={`${action} \u00B7 ${doc.title}`}
                      subtitle={`${doc.category ?? doc.document_type ?? 'Document'} \u00B7 ${when}`}
                      trailing={<Pill tone={tone}>{action}</Pill>}
                      onClick={() => setSelected(doc)}
                    />
                  );
                })
              )}
            </ListBody>
          </ListCard>
        </>
      )}

      {/* Detail sheet — view, edit/renew and delete */}
      <Sheet
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
            setIsEditing(false);
            setEditFile(null);
          }
        }}
      >
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left text-white">{selected.title}</SheetTitle>
              </SheetHeader>

              {isEditing ? (
                <div className="space-y-4 mt-6">
                  <Input
                    placeholder="Title"
                    value={editDoc.title}
                    onChange={(e) => setEditDoc((p) => ({ ...p, title: e.target.value }))}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      value={editDoc.document_type}
                      onValueChange={(v) =>
                        setEditDoc((p) => ({ ...p, document_type: v as DocumentType }))
                      }
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                        {['Certificate', 'Policy', 'Permit', 'Induction', 'Briefing', 'Method Statement', 'RAMS Sign-off'].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={editDoc.category}
                      onValueChange={(v) =>
                        setEditDoc((p) => ({ ...p, category: v as DocumentCategory }))
                      }
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                        {['Insurance', 'Safety', 'Legal', 'Training', 'Permits', 'Induction'].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-white/50">
                      Expiry / renewal date
                    </label>
                    <Input
                      type="date"
                      value={editDoc.expiry_date}
                      onChange={(e) => setEditDoc((p) => ({ ...p, expiry_date: e.target.value }))}
                      className="h-11 mt-1 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      value={editDoc.employee_id || '__none__'}
                      onValueChange={(v) =>
                        setEditDoc((p) => ({ ...p, employee_id: v === '__none__' ? '' : v }))
                      }
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow">
                        <SelectValue placeholder="Link employee" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                        <SelectItem value="__none__">No employee</SelectItem>
                        {employees.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={editDoc.job_id || '__none__'}
                      onValueChange={(v) =>
                        setEditDoc((p) => ({ ...p, job_id: v === '__none__' ? '' : v }))
                      }
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow">
                        <SelectValue placeholder="Link job" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                        <SelectItem value="__none__">No job</SelectItem>
                        {jobs.map((job) => (
                          <SelectItem key={job.id} value={job.id}>
                            {job.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    placeholder="Notes (optional)"
                    value={editDoc.notes}
                    onChange={(e) => setEditDoc((p) => ({ ...p, notes: e.target.value }))}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="hidden"
                    onChange={pickFile(setEditFile)}
                  />
                  {editFile ? (
                    <div className="flex items-center gap-2 h-11 px-4 rounded-full bg-white/[0.06] border border-white/[0.1]">
                      <span className="flex-1 min-w-0 truncate text-[13px] text-white">
                        {editFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditFile(null)}
                        aria-label="Remove selected file"
                        className="p-2 -mr-2 text-white/60 hover:text-white touch-manipulation"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current?.click()}
                      className="h-11 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.06] text-white border border-white/[0.1] text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      {selected.file_url ? 'Replace document (PDF/image, 20MB)' : 'Attach document (PDF/image, 20MB)'}
                    </button>
                  )}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 h-11 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation"
                    >
                      Cancel
                    </button>
                    <PrimaryButton
                      onClick={handleSaveEdit}
                      disabled={!editDoc.title.trim() || updateDocument.isPending || isUploading}
                      fullWidth
                    >
                      {isUploading
                        ? 'Uploading…'
                        : updateDocument.isPending
                          ? 'Saving…'
                          : 'Save changes'}
                    </PrimaryButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 mt-6">
                  <ListCard>
                    <ListCardHeader
                      tone="yellow"
                      title="Details"
                      meta={
                        <Pill tone={statusForDoc(selected).tone}>
                          {statusForDoc(selected).label}
                        </Pill>
                      }
                    />
                    <ListBody>
                      <ListRow
                        title="Type"
                        subtitle={selected.document_type ?? '—'}
                        trailing={
                          <span className="text-[12px] text-white">
                            {selected.category ?? '—'}
                          </span>
                        }
                      />
                      <ListRow
                        title="Renews"
                        subtitle={formatDate(selected.expiry_date)}
                        trailing={
                          <Pill tone={statusForDoc(selected).tone}>
                            {statusForDoc(selected).label}
                          </Pill>
                        }
                      />
                      {selected.employee_id && (
                        <ListRow
                          title="Employee"
                          subtitle={employeeNameById.get(selected.employee_id) ?? 'Unknown'}
                        />
                      )}
                      {selected.job_id && (
                        <ListRow
                          title="Job"
                          subtitle={jobTitleById.get(selected.job_id) ?? 'Unknown'}
                        />
                      )}
                      {selected.notes && <ListRow title="Notes" subtitle={selected.notes} />}
                      {selected.signatures_required > 0 && (
                        <ListRow
                          title="Signatures"
                          subtitle={`${selected.signatures_collected}/${selected.signatures_required} collected`}
                          trailing={
                            <Pill
                              tone={
                                selected.signatures_collected >= selected.signatures_required
                                  ? 'emerald'
                                  : 'amber'
                              }
                            >
                              {selected.signatures_collected >= selected.signatures_required
                                ? 'Complete'
                                : 'Pending'}
                            </Pill>
                          }
                        />
                      )}
                      <ListRow
                        title="Created"
                        subtitle={formatDateTime(selected.created_at)}
                        trailing={
                          selected.updated_at && selected.updated_at !== selected.created_at ? (
                            <span className="text-[12px] text-white">
                              Updated {formatDateTime(selected.updated_at)}
                            </span>
                          ) : null
                        }
                      />
                    </ListBody>
                  </ListCard>

                  {selected.file_url && (
                    <button
                      type="button"
                      onClick={handleViewDocument}
                      className="h-11 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.06] text-white border border-white/[0.1] text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View document
                    </button>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(true)}
                      disabled={deleteDocument.isPending}
                      className="flex-1 h-11 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] font-medium touch-manipulation disabled:opacity-50"
                    >
                      {deleteDocument.isPending ? 'Deleting…' : 'Delete'}
                    </button>
                    <PrimaryButton onClick={() => startEditing(selected)} fullWidth>
                      Edit / record renewal
                    </PrimaryButton>
                  </div>
                </div>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete document?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              {selected
                ? `"${selected.title}" will be permanently removed. This cannot be undone.`
                : 'This document will be permanently removed.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="h-11 touch-manipulation bg-red-500/90 hover:bg-red-500 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet
        open={addOpen}
        onOpenChange={(open) => {
          setAddOpen(open);
          if (!open) setNewFile(null);
        }}
      >
        <SheetContent side="bottom" className="p-0 rounded-t-2xl max-h-[90vh] overflow-y-auto">
          <div className="bg-background px-4 pt-4 pb-8 space-y-4">
            <SheetHeader>
              <SheetTitle className="text-left text-base">Add compliance document</SheetTitle>
            </SheetHeader>
            <Input
              placeholder="Title (e.g. Public liability insurance)"
              value={newDoc.title}
              onChange={(e) => setNewDoc((p) => ({ ...p, title: e.target.value }))}
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
            <div className="grid grid-cols-2 gap-3">
              <Select
                value={newDoc.document_type}
                onValueChange={(v) => setNewDoc((p) => ({ ...p, document_type: v as DocumentType }))}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                  {['Certificate', 'Policy', 'Permit', 'Induction', 'Briefing', 'Method Statement', 'RAMS Sign-off'].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={newDoc.category}
                onValueChange={(v) => setNewDoc((p) => ({ ...p, category: v as DocumentCategory }))}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                  {['Insurance', 'Safety', 'Legal', 'Training', 'Permits', 'Induction'].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-white/50">
                Expiry / renewal date
              </label>
              <Input
                type="date"
                value={newDoc.expiry_date}
                onChange={(e) => setNewDoc((p) => ({ ...p, expiry_date: e.target.value }))}
                className="h-11 mt-1 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select
                value={newDoc.employee_id || '__none__'}
                onValueChange={(v) =>
                  setNewDoc((p) => ({ ...p, employee_id: v === '__none__' ? '' : v }))
                }
              >
                <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow">
                  <SelectValue placeholder="Link employee (optional)" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                  <SelectItem value="__none__">No employee</SelectItem>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={newDoc.job_id || '__none__'}
                onValueChange={(v) =>
                  setNewDoc((p) => ({ ...p, job_id: v === '__none__' ? '' : v }))
                }
              >
                <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow">
                  <SelectValue placeholder="Link job (optional)" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                  <SelectItem value="__none__">No job</SelectItem>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Notes (optional)"
              value={newDoc.notes}
              onChange={(e) => setNewDoc((p) => ({ ...p, notes: e.target.value }))}
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
            <input
              ref={newFileInputRef}
              type="file"
              accept="application/pdf,image/*"
              className="hidden"
              onChange={pickFile(setNewFile)}
            />
            {newFile ? (
              <div className="flex items-center gap-2 h-11 px-4 rounded-full bg-white/[0.06] border border-white/[0.1]">
                <span className="flex-1 min-w-0 truncate text-[13px] text-white">
                  {newFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setNewFile(null)}
                  aria-label="Remove selected file"
                  className="p-2 -mr-2 text-white/60 hover:text-white touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => newFileInputRef.current?.click()}
                className="h-11 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.06] text-white border border-white/[0.1] text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] transition-colors"
              >
                <Upload className="h-4 w-4" />
                Attach document (PDF/image, 20MB)
              </button>
            )}
            <PrimaryButton
              onClick={handleAddDocument}
              disabled={!newDoc.title.trim() || createDocument.isPending || isUploading}
              fullWidth
            >
              {isUploading ? 'Uploading…' : createDocument.isPending ? 'Saving…' : 'Add document'}
            </PrimaryButton>
          </div>
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
}
