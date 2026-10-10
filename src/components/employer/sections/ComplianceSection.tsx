/**
 * Compliance register (ELE-1985): the firm's insurance, PAT, calibration,
 * audits and permits in one list with renewal dates. Reminders run in the
 * database (notify_employer_expiries, daily): 30 and 7 days before and once
 * overdue, to the bell, push and the office morning email, and each reminder
 * opens the exact document here (?doc=<id>). Evidence pack exports the safety
 * score and this register for SSIP and principal-contractor questionnaires.
 */
import { useActingFirmId } from '@/hooks/useFirmPriceBook';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { ExternalLink, FileDown, Plus, RefreshCw, ShieldCheck, Upload, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { openExternalUrl } from '@/utils/open-external-url';
import { useToast } from '@/hooks/use-toast';
import {
  useComplianceDocuments,
  useCreateComplianceDocument,
  useUpdateComplianceDocument,
  useDeleteComplianceDocument,
  type DocumentType,
  type DocumentCategory,
  type ComplianceDocument,
} from '@/hooks/useComplianceDocuments';
import { useFirmSafetyOverview } from '@/hooks/useFirmSafetyOverview';
import { useEmployees } from '@/hooks/useEmployees';
import { useJobs } from '@/hooks/useJobs';
import { FormSheet } from '@/components/forms/FormSheet';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { COMPLIANCE_HELP } from '@/components/employer/help/compliance';
import {
  PageFrame,
  PageHero,
  LoadingBlocks,
  Field,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';
import {
  frameClass,
  twoColClass,
  colClass,
  panel,
  PanelTitle,
  PanelHead,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  ToolButton,
  FigureStrip,
  StatusPill,
  Row,
  RowList,
  Rows,
  KeyValue,
  PlainEmpty,
  Segments,
  SearchField,
  FilterRow,
  plural,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import type { InsuranceKind } from '@/hooks/useComplianceDocuments';
import { useComplaints, complaintState } from '@/hooks/useComplaints';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { InsurancePanel } from '@/components/employer/compliance/InsurancePanel';
import { ComplaintsSheet } from '@/components/employer/compliance/ComplaintsSheet';
import { CdmPlanSheet } from '@/components/employer/compliance/CdmPlanSheet';
import { SendPackSheet } from '@/components/employer/compliance/SendPackSheet';
import { AssessmentPackSheet } from '@/components/employer/assessment-pack/AssessmentPackSheet';
import { AccreditationsPanel } from '@/components/employer/compliance/AccreditationsPanel';
import {
  CPS_ACCREDITATIONS,
  PREQUAL_ACCREDITATIONS,
  accreditationLabel,
  coverText,
  isCps,
  isSettingsDoc,
  mergeCredentials,
} from '@/components/employer/compliance/credentials';
import { useFirmCredentials, FIRM_CREDENTIALS_KEY } from '@/hooks/useFirmCredentials';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import type { CompanyProfile } from '@/types/company';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import {
  EL_MINIMUM,
  INSURANCE_KINDS,
  checkInsurance,
  guessInsuranceKind,
  insuranceLabel,
} from '@/components/employer/compliance/insurance';

type FilterValue = 'all' | 'due' | 'insurance' | 'pat' | 'calibration' | 'audits';
type Kind = Exclude<FilterValue, 'all' | 'due'> | 'other';
type Bucket = 'overdue' | 'due' | 'ok' | 'nodate';

const DOC_TYPES: DocumentType[] = [
  'Certificate',
  'Policy',
  'Permit',
  'Induction',
  'Briefing',
  'Method Statement',
  'RAMS Sign-off',
];
const DOC_CATEGORIES: DocumentCategory[] = [
  'Insurance',
  'Accreditation',
  'Safety',
  'Legal',
  'Training',
  'Permits',
  'Induction',
];

function classify(doc: ComplianceDocument): Kind {
  if (doc.insurance_kind) return 'insurance';
  const h = `${doc.title ?? ''} ${doc.category ?? ''} ${doc.document_type ?? ''}`.toLowerCase();
  if (h.includes('insurance')) return 'insurance';
  if (/\bpat\b|portable appliance/.test(h)) return 'pat';
  if (h.includes('calibrat')) return 'calibration';
  if (h.includes('audit')) return 'audits';
  return 'other';
}

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function daysUntil(date?: string | null): number | null {
  if (!date) return null;
  const a = new Date(`${todayIso()}T00:00:00`);
  const b = new Date(`${date.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(b.getTime())) return null;
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function statusOf(doc: ComplianceDocument): { bucket: Bucket; label: string; tone: PillTone } {
  const days = daysUntil(doc.expiry_date);
  if (days === null) return { bucket: 'nodate', label: 'No date', tone: 'neutral' };
  if (days < 0)
    return {
      bucket: 'overdue',
      label: days === -1 ? 'Overdue 1 day' : `Overdue ${-days} days`,
      tone: 'red',
    };
  if (days <= 30)
    return {
      bucket: 'due',
      label: days === 0 ? 'Due today' : days === 1 ? 'Due tomorrow' : `Due in ${days} days`,
      tone: 'volt',
    };
  return { bucket: 'ok', label: 'In date', tone: 'green' };
}

const formatDate = (date?: string | null) => {
  if (!date) return 'No renewal date';
  const d = new Date(`${date.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDateTime = (ts?: string | null) => {
  if (!ts) return '';
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return ts;
  return d.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // the bucket's 20MB limit

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

const EMPTY_FORM = {
  title: '',
  document_type: 'Certificate' as DocumentType,
  category: 'Insurance' as DocumentCategory,
  expiry_date: '',
  notes: '',
  employee_id: '',
  job_id: '',
  // ELE-2076 insurance register
  insurance_kind: '' as InsuranceKind | '',
  insurer: '',
  policy_number: '',
  cover_amount: '',
  // Gap #10: scheme membership or prequal accreditation
  accreditation: '',
};
type DocForm = typeof EMPTY_FORM;

type SideSheet = 'complaints' | 'assessment' | 'cdm' | 'send' | null;

const parseMoney = (v: string) => {
  const t = v.replace(/[£,\s]/g, '').toLowerCase();
  if (!t) return null;
  const m = t.endsWith('m') ? 1_000_000 : t.endsWith('k') ? 1_000 : 1;
  const n = Number(t.replace(/[mk]$/, ''));
  return Number.isFinite(n) ? Math.round(n * m) : null;
};

export function ComplianceSection() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // The one form sheet: adding a document, or editing / renewing the selected one.
  const [formMode, setFormMode] = useState<'add' | 'edit' | null>(null);
  const [form, setForm] = useState<DocForm>(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Complaints log, assessment pack, construction phase plan, send our pack.
  const [sideSheet, setSideSheet] = useState<SideSheet>(null);
  const [complaintId, setComplaintId] = useState<string | null>(null);
  const { data: complaints = [] } = useComplaints();
  const { data: role } = useEmployerRole();

  const {
    data: registerDocs,
    isLoading,
    error,
    refetch: refetchRegister,
    isRefetching,
  } = useComplianceDocuments();
  // Gap #10: one list. The Settings record (public liability, scheme) plus
  // the register, without the rows that only hold a Settings certificate.
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: firmOwnerId } = useActingFirmId();
  const { data: creds, refetch: refetchCreds } = useFirmCredentials();
  const { saveCompanyProfile } = useCompanyProfile();
  const isOwner = !!user && !!firmOwnerId && user.id === firmOwnerId;
  const documents = useMemo(
    () => (registerDocs ? mergeCredentials(registerDocs, creds, firmOwnerId ?? '') : registerDocs),
    [registerDocs, creds, firmOwnerId]
  );
  const refetch = () => {
    refetchCreds();
    return refetchRegister();
  };
  const settingsScheme = (documents ?? []).find(
    (d) => isSettingsDoc(d) && d.category === 'Accreditation'
  );
  const { data: safety, isPending: safetyLoading } = useFirmSafetyOverview();
  const createDocument = useCreateComplianceDocument();
  const updateDocument = useUpdateComplianceDocument();
  const deleteDocument = useDeleteComplianceDocument();
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();

  const selected = useMemo(
    () => (documents ?? []).find((d) => d.id === selectedId) ?? null,
    [documents, selectedId]
  );

  // ?complaints=1 opens the log, ?complaint=<id> one complaint, ?pack=assessment the pack.
  const complaintsParam = searchParams.get('complaints') ?? searchParams.get('complaint');
  const packParam = searchParams.get('pack');
  useEffect(() => {
    if (!complaintsParam && !packParam) return;
    if (complaintsParam) {
      setComplaintId(complaintsParam === '1' ? null : complaintsParam);
      setSideSheet('complaints');
    } else if (packParam === 'assessment' || packParam === 'send' || packParam === 'cdm') {
      setSideSheet(packParam);
    }
    const next = new URLSearchParams(searchParams);
    next.delete('complaints');
    next.delete('complaint');
    next.delete('pack');
    setSearchParams(next, { replace: true });
  }, [complaintsParam, packParam, searchParams, setSearchParams]);

  // A reminder opens the exact document: ?section=compliance&doc=<id>.
  const docParam = searchParams.get('doc');
  useEffect(() => {
    if (!docParam || isLoading) return;
    // The Settings record arrives with the credentials (Gap #10).
    if (docParam.startsWith('settings:') && !creds) return;
    if ((documents ?? []).some((d) => d.id === docParam)) setSelectedId(docParam);
    const next = new URLSearchParams(searchParams);
    next.delete('doc');
    setSearchParams(next, { replace: true });
  }, [docParam, isLoading, creds, documents, searchParams, setSearchParams]);

  const employeeNameById = useMemo(
    () => new Map(employees.map((e) => [e.id, e.name])),
    [employees]
  );
  const jobTitleById = useMemo(() => new Map(jobs.map((j) => [j.id, j.title])), [jobs]);

  const items = useMemo(
    () =>
      (documents ?? [])
        .map((doc) => ({ doc, kind: classify(doc), status: statusOf(doc) }))
        .sort((a, b) =>
          (a.doc.expiry_date ?? '9999-12-31').localeCompare(b.doc.expiry_date ?? '9999-12-31')
        ),
    [documents]
  );

  const counts = useMemo(() => {
    const c = { overdue: 0, due: 0, ok: 0, nodate: 0 };
    for (const i of items) c[i.status.bucket] += 1;
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((i) => {
      // Scheme and accreditations have their own panel; listing them here too
      // showed NAPIT twice.
      if (i.doc.accreditation && !i.doc.certificate_for) return false;
      if (filter === 'due' && i.status.bucket !== 'due' && i.status.bucket !== 'overdue')
        return false;
      if (filter !== 'all' && filter !== 'due' && i.kind !== filter) return false;
      if (!term) return true;
      return `${i.doc.title ?? ''} ${i.doc.category ?? ''} ${i.doc.document_type ?? ''}`
        .toLowerCase()
        .includes(term);
    });
  }, [items, filter, search]);

  const recent = useMemo(
    () =>
      [...(documents ?? [])]
        .filter((d) => !isSettingsDoc(d))
        .sort((a, b) => (b.updated_at ?? b.created_at).localeCompare(a.updated_at ?? a.created_at))
        .slice(0, 5),
    [documents]
  );

  const nextRenewal = items.find((i) => i.status.bucket === 'ok');

  // The owner on their own roster isn't an employee for employers' liability:
  // a firm of one doesn't need it (HSE40).
  const employsPeople = employees.some(
    (e) => e.status?.toLowerCase() !== 'archived' && (!firmOwnerId || e.user_id !== firmOwnerId)
  );
  // Insurance problems lead the live line (they are what needs doing).
  const insuranceLine = useMemo(() => {
    const p = checkInsurance(documents ?? [], { employsPeople }).filter((c) => c.problem);
    if (!p.length) return '';
    const names = p.map((c, i) => (i === 0 ? c.label : c.label.toLowerCase()));
    const list =
      names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0];
    return `${list} insurance to check.`;
  }, [documents, employsPeople]);

  // Everything on file is a scheme or accreditation (shown in its own panel).
  const registerOnlyAccreditations =
    items.length > 0 &&
    filter === 'all' &&
    !search.trim() &&
    items.every((i) => i.doc.accreditation && !i.doc.certificate_for);

  const liveLine = (() => {
    if (isLoading) return 'Loading the register.';
    if (!items.length)
      return [
        insuranceLine,
        'No documents yet. Add your insurance, PAT and calibration and we remind you before each one lapses.',
      ]
        .filter(Boolean)
        .join(' ');
    const parts: string[] = [];
    if (counts.overdue) parts.push(`${plural(counts.overdue, 'document')} overdue`);
    if (counts.due) parts.push(`${counts.due} due in the next 30 days`);
    if (parts.length) return [`${parts.join(', ')}.`, insuranceLine].filter(Boolean).join(' ');
    if (insuranceLine) return insuranceLine;
    return nextRenewal
      ? `${plural(items.length, 'document')}, all in date. Next renewal ${formatDate(nextRenewal.doc.expiry_date)}.`
      : `${plural(items.length, 'document')}, none with a renewal date.`;
  })();

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    e.target.value = '';
    if (!f) return;
    if (f.size > MAX_UPLOAD_BYTES) {
      toast({
        title: 'File too large',
        description: 'Documents must be 20MB or smaller.',
        variant: 'destructive',
      });
      return;
    }
    setFile(f);
  };

  const openAdd = (insurance?: InsuranceKind) => {
    setSelectedId(null);
    setForm(
      insurance
        ? {
            ...EMPTY_FORM,
            title: `${insuranceLabel(insurance)} insurance`,
            category: 'Insurance',
            document_type: 'Certificate',
            insurance_kind: insurance,
          }
        : EMPTY_FORM
    );
    setFile(null);
    setFormMode('add');
  };

  /** Add a scheme membership or accreditation. `cps` starts on the scheme
   *  that prints on certificates. */
  const openAddAccreditation = (cps?: boolean) => {
    setSelectedId(null);
    setForm({
      ...EMPTY_FORM,
      title: cps ? 'Scheme registration' : '',
      category: 'Accreditation',
      document_type: 'Certificate',
      accreditation: cps ? 'niceic' : '',
    });
    setFile(null);
    setFormMode('add');
  };

  const openEdit = (doc: ComplianceDocument) => {
    setForm({
      title: doc.title ?? '',
      document_type: (doc.document_type ?? 'Certificate') as DocumentType,
      category: (doc.category ?? 'Insurance') as DocumentCategory,
      expiry_date: doc.expiry_date ? doc.expiry_date.slice(0, 10) : '',
      notes: doc.notes ?? '',
      employee_id: doc.employee_id ?? '',
      job_id: doc.job_id ?? '',
      insurance_kind: doc.insurance_kind ?? guessInsuranceKind(doc) ?? '',
      insurer: doc.insurer ?? '',
      policy_number: doc.policy_number ?? '',
      cover_amount:
        doc.cover_amount != null
          ? Number(doc.cover_amount).toLocaleString('en-GB')
          : (doc.cover_text ?? ''),
      accreditation: doc.accreditation ?? '',
    });
    setFile(null);
    setFormMode('edit');
  };

  const uploadIfAny = async (): Promise<string | undefined | false> => {
    if (!file) return undefined;
    setIsUploading(true);
    try {
      return await uploadComplianceFile(file);
    } catch (err) {
      toast({
        title: 'Upload failed',
        description:
          err instanceof Error ? err.message : 'Could not upload the document. Try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  /** Gap #10: which Settings record this form writes, if any. Public
   *  liability and the competent person scheme live in Settings, so
   *  certificates, quotes and the quote page show what is saved here. */
  const settingsTarget = (() => {
    if (formMode === 'edit' && selected && !isSettingsDoc(selected)) return null;
    if (formMode === 'edit' && isSettingsDoc(selected))
      return selected!.category === 'Insurance'
        ? ('settings_insurance' as const)
        : ('settings_scheme' as const);
    if (form.category === 'Insurance' && form.insurance_kind === 'public_liability')
      return 'settings_insurance' as const;
    if (
      form.category === 'Accreditation' &&
      isCps(form.accreditation) &&
      (isSettingsDoc(selected) || !settingsScheme)
    )
      return 'settings_scheme' as const;
    return null;
  })();
  const [savingSettings, setSavingSettings] = useState(false);

  const saveSettingsRecord = async (target: 'settings_insurance' | 'settings_scheme') => {
    setSavingSettings(true);
    try {
      const fileUrl = await uploadIfAny();
      if (fileUrl === false) return;
      if (isOwner) {
        const cover = parseMoney(form.cover_amount);
        const scheme =
          CPS_ACCREDITATIONS.find((x) => x.value === form.accreditation)?.value === 'other_scheme'
            ? 'other'
            : accreditationLabel(form.accreditation).toUpperCase();
        const ok = await saveCompanyProfile(
          target === 'settings_insurance'
            ? ({
                insurance_provider: form.insurer.trim() || null,
                insurance_policy_number: form.policy_number.trim() || null,
                insurance_coverage: coverText(cover) ?? (form.cover_amount.trim() || null),
                insurance_expiry: form.expiry_date || null,
              } as unknown as Partial<CompanyProfile>)
            : ({
                registration_scheme: scheme,
                registration_number: form.policy_number.trim() || null,
                registration_expiry: form.expiry_date || null,
                // A different scheme's stored logo would be wrong; Settings
                // draws the bundled one from the scheme name (ELE-1669).
                ...(settingsScheme && settingsScheme.accreditation !== form.accreditation
                  ? { registration_scheme_logo: null, scheme_logo_data_url: null }
                  : {}),
              } as unknown as Partial<CompanyProfile>)
        );
        if (!ok) return;
      }
      if (fileUrl) {
        const holder =
          target === 'settings_insurance'
            ? (documents ?? []).find((d) => isSettingsDoc(d) && d.category === 'Insurance')
                ?.certificate_id
            : settingsScheme?.certificate_id;
        if (holder) await updateDocument.mutateAsync({ id: holder, file_url: fileUrl });
        else
          await createDocument.mutateAsync({
            title:
              target === 'settings_insurance'
                ? 'Public liability insurance certificate'
                : 'Scheme registration certificate',
            document_type: 'Certificate',
            category: target === 'settings_insurance' ? 'Insurance' : 'Accreditation',
            status: 'Current',
            file_url: fileUrl,
            signatures_required: 0,
            signatures_collected: 0,
            certificate_for: target,
          });
      }
      await qc.invalidateQueries({ queryKey: [FIRM_CREDENTIALS_KEY] });
      setFile(null);
      setFormMode(null);
      setSelectedId(null);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSave = async () => {
    if (settingsTarget) {
      if (!isOwner && !file) {
        toast({
          title: 'Only the owner can change this',
          description:
            'It is in the owner’s Settings and prints on every certificate. You can attach the certificate.',
        });
        return;
      }
      await saveSettingsRecord(settingsTarget);
      return;
    }
    if (!form.title.trim()) return;
    const fileUrl = await uploadIfAny();
    if (fileUrl === false) return;
    const isInsurance = form.category === 'Insurance';
    const isAccreditation = form.category === 'Accreditation';
    const insurance = {
      insurance_kind: isInsurance && form.insurance_kind ? form.insurance_kind : null,
      insurer: isInsurance ? form.insurer.trim() || null : null,
      policy_number: isInsurance || isAccreditation ? form.policy_number.trim() || null : null,
      cover_amount: isInsurance ? parseMoney(form.cover_amount) : null,
      accreditation: isAccreditation && form.accreditation ? form.accreditation : null,
    };
    if (formMode === 'add') {
      await createDocument.mutateAsync({
        title: form.title.trim(),
        document_type: form.document_type,
        category: form.category,
        status: 'Current',
        expiry_date: form.expiry_date || undefined,
        notes: form.notes.trim() || undefined,
        employee_id: form.employee_id || undefined,
        job_id: form.job_id || undefined,
        file_url: fileUrl,
        signatures_required: 0,
        signatures_collected: 0,
        ...(insurance.insurance_kind ||
        insurance.insurer ||
        insurance.policy_number ||
        insurance.cover_amount != null ||
        insurance.accreditation
          ? insurance
          : {}),
      });
    } else if (formMode === 'edit' && selected) {
      await updateDocument.mutateAsync({
        id: selected.id,
        title: form.title.trim(),
        document_type: form.document_type,
        category: form.category,
        // null (not undefined) so a cleared value actually clears
        expiry_date: form.expiry_date || null,
        notes: form.notes.trim() || null,
        employee_id: form.employee_id || null,
        job_id: form.job_id || null,
        ...insurance,
        ...(fileUrl ? { file_url: fileUrl } : {}),
      });
    }
    setFile(null);
    setFormMode(null);
  };

  const handleDelete = async () => {
    if (!selected) return;
    await deleteDocument.mutateAsync(selected.id);
    setConfirmDelete(false);
    setSelectedId(null);
  };

  const handleViewDocument = async () => {
    if (!selected?.file_url) return;
    // Legacy rows may hold a full URL; uploads store a private-bucket path.
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

  const handleExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const { generateSafetyEvidencePdf } = await import('@/utils/generateSafetyEvidencePdf');
      const doc = await generateSafetyEvidencePdf({ overview: safety, documents: documents ?? [] });
      doc.save(`health-and-safety-evidence-${todayIso()}.pdf`);
    } catch {
      toast({ title: 'Could not build the evidence pack', variant: 'destructive' });
    } finally {
      setExporting(false);
    }
  };

  const hero = (
    <PageHero
      title="Compliance"
      description={error ? 'The register could not be loaded.' : liveLine}
      actions={
        <HeroActions>
          <HeroPrimary
            data-help="compliance.add"
            onClick={() => openAdd()}
            icon={<Plus className="h-4 w-4" />}
          >
            Add document
          </HeroPrimary>
          <HeroSecondary
            label="Evidence pack"
            data-help="compliance.export"
            onClick={handleExport}
            disabled={exporting || isLoading}
            icon={<FileDown className="h-4 w-4" />}
          >
            {exporting ? 'Building' : 'Evidence pack'}
          </HeroSecondary>
          <HeroSecondary
            label="Assessment pack"
            data-help="compliance.assessment"
            onClick={() => setSideSheet('assessment')}
            className="hidden sm:inline-flex"
            icon={<ShieldCheck className="h-4 w-4" />}
          >
            Assessment pack
          </HeroSecondary>
          <ToolButton
            label="Refresh"
            onClick={() => refetch()}
            disabled={isRefetching}
            icon={<RefreshCw className={isRefetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />}
          />
          <PageHelpButton help={COMPLIANCE_HELP} askContext={{ page: 'compliance', tab: filter }} />
        </HeroActions>
      }
    />
  );

  if (error) {
    return (
      <PageFrame className={frameClass}>
        {hero}
        <PlainEmpty
          text="We could not load the compliance register."
          action="Try again"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  const score = safety?.score;
  const today = todayIso();
  const openComplaints = complaints.filter((c) => !c.closed_on).length;
  const lateComplaints = complaints.filter((c) => complaintState(c, today) === 'overdue').length;
  // The packs sit under the register so the two columns balance on desktop.
  const packsPanel = (
    <section className={cn(panel, 'overflow-hidden')} data-help="compliance.packs">
      <PanelHead title="Assessments and contractors" />
      <Rows>
        <Row
          onClick={() => setSideSheet('complaints')}
          title="Complaints log"
          detail={
            complaints.length
              ? `${plural(openComplaints, 'open complaint')}, ${complaints.length} logged`
              : 'Customer and data protection complaints'
          }
          trailing={
            lateComplaints ? (
              <StatusPill tone="red">{lateComplaints} overdue</StatusPill>
            ) : undefined
          }
        />
        <Row
          onClick={() => setSideSheet('assessment')}
          title="Scheme assessment pack"
          detail="NICEIC, NAPIT, ELECSA or Stroma, with what to fix first"
        />
        {role?.canSeeMoney && (
          <Row
            onClick={() => setSideSheet('send')}
            title="Send our pack"
            detail="CHAS, SSIP or Constructionline, by link or zip"
          />
        )}
        <Row
          onClick={() => setSideSheet('cdm')}
          title="Construction phase plan"
          detail="CDM 2015 plan for a job, with the F10 check"
        />
      </Rows>
    </section>
  );

  return (
    <>
      <PageFrame className={frameClass}>
        {hero}

        <HowItWorks help={COMPLIANCE_HELP} askContext={{ page: 'compliance', tab: filter }} />

        {isLoading ? (
          <LoadingBlocks />
        ) : (
          <>
            <FigureStrip
              figures={[
                {
                  label: 'Overdue',
                  value: counts.overdue,
                  tone: counts.overdue ? 'red' : undefined,
                  sub: 'Past the renewal date',
                  onOpen: () => setFilter('due'),
                },
                {
                  label: 'Due in 30 days',
                  value: counts.due,
                  tone: counts.due ? 'volt' : undefined,
                  sub: 'Reminded at 30 and 7 days',
                  onOpen: () => setFilter('due'),
                },
                {
                  label: 'In date',
                  value: counts.ok,
                  tone: counts.ok ? 'green' : undefined,
                  sub: 'More than 30 days left',
                  onOpen: () => setFilter('all'),
                },
                {
                  label: 'No date',
                  value: counts.nodate,
                  sub: 'Add a date to be reminded',
                  onOpen: () => setFilter('all'),
                },
              ]}
            />

            <FilterRow>
              <Segments
                items={[
                  { value: 'all' as FilterValue, label: 'All' },
                  { value: 'due' as FilterValue, label: 'Due', count: counts.due + counts.overdue },
                  { value: 'insurance' as FilterValue, label: 'Insurance' },
                  { value: 'pat' as FilterValue, label: 'PAT' },
                  { value: 'calibration' as FilterValue, label: 'Calibration' },
                  { value: 'audits' as FilterValue, label: 'Audits' },
                ]}
                value={filter}
                onChange={setFilter}
              />
              <SearchField
                value={search}
                onChange={setSearch}
                placeholder="Search the register"
                className="lg:w-72"
              />
            </FilterRow>

            <div className={twoColClass}>
              <div className={colClass}>
                <section data-help="compliance.list">
                  <PanelTitle title="Register" meta={`${filtered.length}`} />
                  {filtered.length === 0 ? (
                    <PlainEmpty
                      text={
                        items.length === 0
                          ? 'Add your public liability insurance, PAT and calibration certificates. We remind you 30 and 7 days before each renewal.'
                          : registerOnlyAccreditations
                            ? 'Your scheme and accreditations are listed below. Add insurance, PAT and calibration certificates here and we remind you before each renewal.'
                            : 'Nothing matches this filter.'
                      }
                      action={
                        items.length === 0 || registerOnlyAccreditations
                          ? 'Add document'
                          : undefined
                      }
                      onAction={
                        items.length === 0 || registerOnlyAccreditations
                          ? () => openAdd()
                          : undefined
                      }
                    />
                  ) : (
                    <RowList>
                      {filtered.map(({ doc, status }) => (
                        <Row
                          key={doc.id}
                          onClick={() => setSelectedId(doc.id)}
                          title={doc.title}
                          detail={[
                            doc.accreditation
                              ? accreditationLabel(doc.accreditation)
                              : (doc.category ?? doc.document_type ?? 'Document'),
                            doc.expiry_date ? `renews ${formatDate(doc.expiry_date)}` : null,
                            isSettingsDoc(doc) ? 'on your certificates' : null,
                            doc.employee_id ? employeeNameById.get(doc.employee_id) : null,
                            doc.job_id ? jobTitleById.get(doc.job_id) : null,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                          trailing={<StatusPill tone={status.tone}>{status.label}</StatusPill>}
                        />
                      ))}
                    </RowList>
                  )}
                </section>
                <AccreditationsPanel
                  documents={documents ?? []}
                  onOpen={(d) => setSelectedId(d.id)}
                  onAddScheme={() => openAddAccreditation(true)}
                  onAdd={() => openAddAccreditation(false)}
                />
                {/* Desktop: under the register so the columns balance. */}
                <div className="hidden lg:block">{packsPanel}</div>
              </div>

              <div className={colClass}>
                <InsurancePanel
                  documents={documents ?? []}
                  employsPeople={employsPeople}
                  onOpen={(d) => setSelectedId(d.id)}
                  onAdd={(k) => openAdd(k)}
                />
                {/* Phone: after insurance, which leads with what needs checking. */}
                <div className="lg:hidden">{packsPanel}</div>

                <section className={cn(panel, 'overflow-hidden')}>
                  <PanelHead title="Reminders" />
                  <p className="px-4 py-3 text-[14px] leading-snug text-white sm:px-5">
                    30 days and 7 days before a renewal date, and again if it passes, the owner and
                    admins get a reminder in the bell and the weekday office email. Each one opens
                    the document here.
                  </p>
                  {counts.nodate > 0 && (
                    <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] leading-snug text-white sm:px-5">
                      {plural(counts.nodate, 'document')} {counts.nodate === 1 ? 'has' : 'have'} no
                      renewal date, so {counts.nodate === 1 ? 'it is' : 'they are'} never reminded.
                    </p>
                  )}
                </section>

                <section className={cn(panel, 'overflow-hidden')}>
                  <PanelHead
                    title="Safety score"
                    action="Site Safety"
                    onAction={() => navigate('/employer?section=sitesafety')}
                  />
                  <div className="px-4 py-3 sm:px-5">
                    <p className="text-[22px] font-semibold leading-tight tracking-tight text-white tabular-nums">
                      {safetyLoading
                        ? 'Checking…'
                        : score == null
                          ? 'Not started'
                          : `${score} out of 100`}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-white">
                      {safetyLoading
                        ? 'Working it out from your records.'
                        : score == null
                          ? 'Built only from records you hold. It starts once there is enough on record.'
                          : 'From the last 30 to 90 days of your own records. It goes in the evidence pack.'}
                    </p>
                  </div>
                </section>

                {recent.length > 0 && (
                  <section>
                    <PanelTitle title="Recent changes" />
                    <RowList>
                      {recent.map((doc) => {
                        const updated = !!doc.updated_at && doc.updated_at !== doc.created_at;
                        return (
                          <Row
                            key={`recent-${doc.id}`}
                            onClick={() => setSelectedId(doc.id)}
                            title={doc.title}
                            detail={`${updated ? 'Updated' : 'Added'} ${formatDateTime(doc.updated_at ?? doc.created_at)}`}
                          />
                        );
                      })}
                    </RowList>
                  </section>
                )}
              </div>
            </div>
          </>
        )}
      </PageFrame>

      {/* Document: details, open the file, record a renewal, delete */}
      <FormSheet
        open={!!selected && formMode === null}
        onOpenChange={(o) => !o && setSelectedId(null)}
        width="wide"
        eyebrow="Compliance document"
        title={selected?.title ?? ''}
        description={selected ? statusOf(selected).label : undefined}
        bodyClassName="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start"
        footer={
          selected && isSettingsDoc(selected) ? (
            <PrimaryButton onClick={() => openEdit(selected)} fullWidth>
              {isOwner ? 'Record renewal or edit' : 'Attach the certificate'}
            </PrimaryButton>
          ) : selected ? (
            <div className="flex gap-3">
              <DestructiveButton
                onClick={() => setConfirmDelete(true)}
                disabled={deleteDocument.isPending}
                className="flex-1 sm:flex-none"
              >
                {deleteDocument.isPending ? 'Deleting' : 'Delete'}
              </DestructiveButton>
              <PrimaryButton onClick={() => openEdit(selected)} className="flex-1">
                Record renewal or edit
              </PrimaryButton>
            </div>
          ) : undefined
        }
      >
        {selected && (
          <>
            <div className={cn(panel, 'overflow-hidden divide-y divide-white/[0.07]')}>
              <KeyValue label="Renews" value={formatDate(selected.expiry_date)} />
              <KeyValue
                label="Status"
                value={statusOf(selected).label}
                tone={
                  statusOf(selected).bucket === 'overdue'
                    ? 'red'
                    : statusOf(selected).bucket === 'due'
                      ? 'yellow'
                      : statusOf(selected).bucket === 'ok'
                        ? 'green'
                        : undefined
                }
              />
              {!isSettingsDoc(selected) && (
                <KeyValue label="Type" value={selected.document_type ?? 'Document'} />
              )}
              {selected.accreditation && (
                <KeyValue
                  label={isCps(selected.accreditation) ? 'Scheme' : 'Accreditation'}
                  value={
                    isSettingsDoc(selected) && selected.insurer
                      ? selected.insurer
                      : accreditationLabel(selected.accreditation)
                  }
                />
              )}
              {selected.insurance_kind && (
                <KeyValue label="Cover" value={insuranceLabel(selected.insurance_kind)} />
              )}
              {selected.insurer && selected.insurance_kind && (
                <KeyValue label="Insurer" value={selected.insurer} />
              )}
              {selected.policy_number && (
                <KeyValue
                  label={selected.accreditation ? 'Membership number' : 'Policy number'}
                  value={selected.policy_number}
                />
              )}
              {selected.cover_amount == null && selected.cover_text && (
                <KeyValue label="Limit" value={selected.cover_text} />
              )}
              {selected.cover_amount != null && (
                <KeyValue
                  label="Limit"
                  value={`£${Number(selected.cover_amount).toLocaleString('en-GB')}`}
                  tone={
                    selected.insurance_kind === 'employers_liability' &&
                    selected.cover_amount < EL_MINIMUM
                      ? 'red'
                      : undefined
                  }
                />
              )}
              {!isSettingsDoc(selected) && (
                <KeyValue label="Category" value={selected.category ?? 'None'} />
              )}
              {selected.employee_id && (
                <KeyValue
                  label="Person"
                  value={employeeNameById.get(selected.employee_id) ?? 'Not on the team'}
                />
              )}
              {selected.job_id && (
                <KeyValue label="Job" value={jobTitleById.get(selected.job_id) ?? 'Job removed'} />
              )}
              {selected.signatures_required > 0 && (
                <KeyValue
                  label="Signatures"
                  value={`${selected.signatures_collected} of ${selected.signatures_required}`}
                  tone={
                    selected.signatures_collected >= selected.signatures_required
                      ? 'green'
                      : 'yellow'
                  }
                />
              )}
              <KeyValue
                label={
                  isSettingsDoc(selected) ||
                  (selected.updated_at && selected.updated_at !== selected.created_at)
                    ? 'Last updated'
                    : 'Added'
                }
                value={formatDateTime(selected.updated_at ?? selected.created_at)}
              />
            </div>
            <div className="space-y-3">
              {isSettingsDoc(selected) && (
                <div className={cn(panel, 'px-4 py-3 sm:px-5')}>
                  <p className="text-[14px] font-semibold text-white">
                    Kept in your business settings
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-white">
                    One record: your certificates, quotes, quote page, assessment pack and the packs
                    you send all show it. A change here or in Settings is the same change.
                    {!isOwner && ' Only the owner can change it.'}
                  </p>
                </div>
              )}
              {selected.notes && (
                <div className={cn(panel, 'px-4 py-3 sm:px-5')}>
                  <p className="text-[12.5px] font-semibold text-white">Notes</p>
                  <p className="mt-1 whitespace-pre-wrap text-[14px] text-white">
                    {selected.notes}
                  </p>
                </div>
              )}
              {selected.file_url ? (
                <SecondaryButton fullWidth onClick={handleViewDocument}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open the document
                </SecondaryButton>
              ) : (
                <p className="text-[13px] text-white">
                  {isSettingsDoc(selected)
                    ? 'No certificate attached yet. Contractors and scheme assessors ask for it.'
                    : 'No file attached. Record a renewal to attach the certificate.'}
                </p>
              )}
            </div>
          </>
        )}
      </FormSheet>

      {/* Add, edit or record a renewal */}
      <FormSheet
        open={formMode !== null}
        onOpenChange={(o) => {
          if (!o) {
            setFormMode(null);
            setFile(null);
          }
        }}
        width="wide"
        eyebrow={formMode === 'add' ? 'Compliance' : selected?.title}
        title={formMode === 'add' ? 'Add a document' : 'Record renewal or edit'}
        description={
          settingsTarget && !isOwner
            ? 'Attach the certificate. The policy details are the owner’s to change.'
            : settingsTarget
              ? 'Saved to your business settings, so your certificates and quotes show the same record. We remind you 30 and 7 days before it renews.'
              : formMode === 'add'
                ? 'Give it a renewal date and we remind you 30 and 7 days before.'
                : 'Set the new renewal date and attach the new certificate.'
        }
        footer={
          <PrimaryButton
            onClick={handleSave}
            disabled={
              (!settingsTarget && !form.title.trim()) ||
              (!!settingsTarget && !isOwner && !file) ||
              createDocument.isPending ||
              updateDocument.isPending ||
              isUploading ||
              savingSettings
            }
            fullWidth
          >
            {isUploading
              ? 'Uploading'
              : createDocument.isPending || updateDocument.isPending || savingSettings
                ? 'Saving'
                : settingsTarget
                  ? isOwner
                    ? 'Save to your records'
                    : 'Attach the certificate'
                  : formMode === 'add'
                    ? 'Add document'
                    : 'Save'}
          </PrimaryButton>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            {settingsTarget && !isOwner && (
              <div className={cn(panel, 'px-4 py-3 sm:px-5')}>
                <p className="text-[14px] leading-snug text-white">
                  This is kept in the owner’s Settings and prints on every certificate, so only the
                  owner can change it. You can attach the certificate.
                </p>
              </div>
            )}
            {!settingsTarget && (
              <Field label="Name" required>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder={
                    form.category === 'Accreditation'
                      ? 'e.g. CHAS membership'
                      : 'e.g. Employers’ liability insurance'
                  }
                  className={inputClass}
                />
              </Field>
            )}
            <Field label="Renewal date" hint="Leave empty if it never lapses.">
              <Input
                type="date"
                value={form.expiry_date}
                onChange={(e) => setForm((p) => ({ ...p, expiry_date: e.target.value }))}
                readOnly={!!settingsTarget && !isOwner}
                className={inputClass}
              />
            </Field>
            <FormGrid
              cols={2}
              className={formMode === 'edit' && isSettingsDoc(selected) ? 'hidden' : undefined}
            >
              <Field label="Type">
                <Select
                  value={form.document_type}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, document_type: v as DocumentType }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {DOC_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Category">
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((p) => ({ ...p, category: v as DocumentCategory }))}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {DOC_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
          </div>
          <div className="space-y-4">
            <FormGrid
              cols={2}
              className={settingsTarget || form.category === 'Accreditation' ? 'hidden' : undefined}
            >
              <Field label="Person (optional)">
                <Select
                  value={form.employee_id || '__none__'}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, employee_id: v === '__none__' ? '' : v }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Nobody" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="__none__">Nobody</SelectItem>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Job (optional)">
                <Select
                  value={form.job_id || '__none__'}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, job_id: v === '__none__' ? '' : v }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="No job" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="__none__">No job</SelectItem>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
            {form.category === 'Insurance' && (
              <>
                <Field
                  label="Cover"
                  className={formMode === 'edit' && isSettingsDoc(selected) ? 'hidden' : undefined}
                >
                  <MobileSelectPicker
                    value={form.insurance_kind || '__none__'}
                    onValueChange={(v) =>
                      setForm((p) => ({
                        ...p,
                        insurance_kind: (v === '__none__' ? '' : v) as InsuranceKind | '',
                      }))
                    }
                    options={[
                      { value: '__none__', label: 'Choose the cover' },
                      ...INSURANCE_KINDS.map((k) => ({
                        value: k.kind,
                        label: k.label,
                        description: k.hint || undefined,
                      })),
                    ]}
                    title="Cover"
                  />
                </Field>
                <FormGrid cols={2}>
                  <Field label="Insurer">
                    <Input
                      value={form.insurer}
                      onChange={(e) => setForm((p) => ({ ...p, insurer: e.target.value }))}
                      readOnly={!!settingsTarget && !isOwner}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Policy number">
                    <Input
                      value={form.policy_number}
                      onChange={(e) => setForm((p) => ({ ...p, policy_number: e.target.value }))}
                      readOnly={!!settingsTarget && !isOwner}
                      className={inputClass}
                    />
                  </Field>
                </FormGrid>
                <Field
                  label="Limit of cover"
                  hint={
                    form.insurance_kind === 'employers_liability'
                      ? (parseMoney(form.cover_amount) ?? EL_MINIMUM) < EL_MINIMUM
                        ? 'Under £5 million. The legal minimum for employers’ liability is £5 million.'
                        : 'At least £5 million by law. Display the certificate where staff can see it, or online.'
                      : 'For example 2m or 5,000,000.'
                  }
                >
                  <Input
                    value={form.cover_amount}
                    readOnly={!!settingsTarget && !isOwner}
                    inputMode="decimal"
                    onChange={(e) => setForm((p) => ({ ...p, cover_amount: e.target.value }))}
                    placeholder="£"
                    className={inputClass}
                  />
                </Field>
              </>
            )}
            {form.category === 'Accreditation' && (
              <FormGrid cols={2}>
                <Field
                  label="Scheme"
                  hint={
                    settingsTarget === 'settings_scheme'
                      ? 'Prints on every certificate you issue.'
                      : undefined
                  }
                >
                  <MobileSelectPicker
                    value={form.accreditation || '__none__'}
                    onValueChange={(v) =>
                      setForm((p) => {
                        const a = v === '__none__' ? '' : v;
                        const auto =
                          !p.title.trim() ||
                          p.title === 'Scheme registration' ||
                          p.title === `${accreditationLabel(p.accreditation)} membership`;
                        return {
                          ...p,
                          accreditation: a,
                          title: auto && a ? `${accreditationLabel(a)} membership` : p.title,
                        };
                      })
                    }
                    options={[
                      { value: '__none__', label: 'Choose the scheme' },
                      ...CPS_ACCREDITATIONS.map((x) => ({
                        value: x.value,
                        label: x.label,
                        description: 'Competent person scheme. Prints on your certificates.',
                      })),
                      ...(formMode === 'edit' && isSettingsDoc(selected)
                        ? []
                        : PREQUAL_ACCREDITATIONS.map((x) => ({
                            value: x.value,
                            label: x.label,
                            description: x.hint || undefined,
                          }))),
                    ]}
                    title="Scheme"
                  />
                </Field>
                <Field label="Membership number">
                  <Input
                    value={form.policy_number}
                    onChange={(e) => setForm((p) => ({ ...p, policy_number: e.target.value }))}
                    readOnly={!!settingsTarget && !isOwner}
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            )}
            <Field label="Notes (optional)" className={settingsTarget ? 'hidden' : undefined}>
              <Input
                value={form.notes}
                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                placeholder="Policy number, insurer, who to call"
                className={inputClass}
              />
            </Field>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,image/*"
              className="hidden"
              onChange={pickFile}
            />
            {file ? (
              <div className="flex h-11 items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.06] px-4">
                <span className="min-w-0 flex-1 truncate text-[13px] text-white">{file.name}</span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  aria-label="Remove the chosen file"
                  className="-mr-3 flex h-11 w-11 items-center justify-center text-white touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <SecondaryButton fullWidth onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                {formMode === 'edit' && selected?.file_url
                  ? 'Replace the certificate (PDF or photo, 20MB)'
                  : 'Attach the certificate (PDF or photo, 20MB)'}
              </SecondaryButton>
            )}
          </div>
        </div>
      </FormSheet>

      <ComplaintsSheet
        open={sideSheet === 'complaints'}
        onOpenChange={(o) => {
          if (!o) {
            setSideSheet(null);
            setComplaintId(null);
          }
        }}
        openId={complaintId}
      />
      <AssessmentPackSheet
        open={sideSheet === 'assessment'}
        onOpenChange={(o) => !o && setSideSheet(null)}
      />
      <CdmPlanSheet open={sideSheet === 'cdm'} onOpenChange={(o) => !o && setSideSheet(null)} />
      <SendPackSheet open={sideSheet === 'send'} onOpenChange={(o) => !o && setSideSheet(null)} />

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete this document?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              {selected
                ? `"${selected.title}" comes off the register and its reminders stop. This cannot be undone.`
                : 'This document comes off the register.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-500/90 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
