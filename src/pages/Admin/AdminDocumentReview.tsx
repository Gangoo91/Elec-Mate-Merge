import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import {
  RefreshCw,
  Check,
  X,
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ExternalLink,
  CheckSquare,
  Square,
  SkipForward,
  ListChecks,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';
import { format, formatDistanceToNow, differenceInMinutes } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  type Tone,
} from '@/components/admin/editorial';

interface DocumentRecord {
  id: string;
  profile_id: string;
  document_type: string;
  document_name: string;
  issuing_body: string | null;
  document_number: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  file_url: string | null;
  file_path: string | null;
  verification_status: string;
  verification_confidence: number | null;
  extracted_data: Record<string, unknown> | null;
  extraction_confidence: Record<string, number> | null;
  rejection_reason: string | null;
  rejection_code: string | null;
  suggestions: string[] | null;
  flagged_for_review: boolean | null;
  flag_reason: string | null;
  flag_severity: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  review_action: string | null;
  appeal_submitted_at: string | null;
  appeal_notes: string | null;
  created_at: string;
  updated_at: string | null;
  elec_id_profile?: {
    id: string;
    elec_id_number: string | null;
    employee?: {
      name: string | null;
      email: string | null;
    };
  };
}

const STATUS_TONE: Record<string, Tone> = {
  pending: 'orange',
  processing: 'blue',
  verified: 'emerald',
  rejected: 'red',
  needs_review: 'amber',
  appealed: 'yellow',
};

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending',
  processing: 'Processing',
  verified: 'Verified',
  rejected: 'Rejected',
  needs_review: 'Needs Review',
  appealed: 'Appealed',
};

const DOC_TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'ecs_card', label: 'ECS Card' },
  { value: 'qualification', label: 'Qualification' },
  { value: 'training', label: 'Training' },
  { value: 'cscs', label: 'CSCS' },
  { value: 'driving_licence', label: 'Driving Licence' },
  { value: 'insurance', label: 'Insurance' },
];

function getInitials(name?: string | null): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDocType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function getDocumentAge(createdAt: string): string {
  const minutes = differenceInMinutes(new Date(), new Date(createdAt));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminDocumentReview() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('needs_attention');
  const [docTypeFilter, setDocTypeFilter] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<DocumentRecord | null>(null);
  const [reviewAction, setReviewAction] = useState<
    'approved' | 'rejected' | 'request_reupload' | null
  >(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [documentImageUrl, setDocumentImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkApproveDialog, setShowBulkApproveDialog] = useState(false);
  const [showBulkRejectDialog, setShowBulkRejectDialog] = useState(false);
  const [bulkRejectReason, setBulkRejectReason] = useState('');
  const [queueMode, setQueueMode] = useState(false);
  const [queueReviewCount, setQueueReviewCount] = useState(0);

  const {
    data: documents,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-document-review', search, statusFilter, docTypeFilter],
    refetchInterval: 30000,
    staleTime: 0,
    queryFn: async () => {
      let query = supabase
        .from('elec_id_documents')
        .select(
          `
          *,
          elec_id_profile:employer_elec_id_profiles(
            id,
            elec_id_number,
            employee:employer_employees(
              name,
              email
            )
          )
        `
        )
        .order('created_at', { ascending: false })
        .limit(200);

      if (statusFilter === 'needs_attention') {
        query = query.or(
          'verification_status.eq.pending,verification_status.eq.needs_review,verification_status.eq.appealed,flagged_for_review.eq.true'
        );
      } else if (statusFilter === 'flagged') {
        query = query.eq('flagged_for_review', true);
      } else if (statusFilter !== 'all') {
        query = query.eq('verification_status', statusFilter);
      }

      if (docTypeFilter !== 'all') {
        query = query.eq('document_type', docTypeFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as DocumentRecord[];

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (d) =>
            d.document_name?.toLowerCase().includes(s) ||
            d.document_type?.toLowerCase().includes(s) ||
            d.extracted_data?.holderName?.toLowerCase().includes(s) ||
            d.document_number?.toLowerCase().includes(s) ||
            d.elec_id_profile?.employee?.name?.toLowerCase().includes(s) ||
            d.elec_id_profile?.employee?.email?.toLowerCase().includes(s)
        );
      }

      if (statusFilter === 'needs_attention') {
        filtered.sort((a, b) => {
          if (a.flagged_for_review && !b.flagged_for_review) return -1;
          if (!a.flagged_for_review && b.flagged_for_review) return 1;
          if (a.verification_status === 'appealed' && b.verification_status !== 'appealed')
            return -1;
          if (a.verification_status !== 'appealed' && b.verification_status === 'appealed')
            return 1;
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });
      }

      return filtered;
    },
  });

  useEffect(() => {
    const flagStaleDocuments = async () => {
      if (!documents) return;

      const staleThreshold = 5;
      const staleDocs = documents.filter(
        (d) =>
          d.verification_status === 'pending' &&
          !d.flagged_for_review &&
          differenceInMinutes(new Date(), new Date(d.created_at)) > staleThreshold
      );

      if (staleDocs.length > 0) {
        const { error } = await supabase
          .from('elec_id_documents')
          .update({
            flagged_for_review: true,
            flag_reason: 'AI verification did not complete - requires manual review',
            flag_severity: 'medium',
          })
          .in(
            'id',
            staleDocs.map((d) => d.id)
          );

        if (!error) {
          refetch();
        }
      }
    };

    flagStaleDocuments();
  }, [documents]);

  useEffect(() => {
    const channel = supabase
      .channel('admin-doc-review-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'elec_id_documents',
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ['admin-document-review-stats'],
    refetchInterval: 30000,
    staleTime: 0,
    queryFn: async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const [
        pendingRes,
        weekRes,
        verifiedRes,
        rejectedRes,
        flaggedRes,
        appealedRes,
        needsAttentionRes,
      ] = await Promise.all([
        supabase
          .from('elec_id_documents')
          .select('*', { count: 'exact', head: true })
          .eq('verification_status', 'pending'),
        supabase
          .from('elec_id_documents')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sevenDaysAgo.toISOString()),
        supabase
          .from('elec_id_documents')
          .select('*', { count: 'exact', head: true })
          .eq('verification_status', 'verified'),
        supabase
          .from('elec_id_documents')
          .select('*', { count: 'exact', head: true })
          .eq('verification_status', 'rejected'),
        supabase
          .from('elec_id_documents')
          .select('*', { count: 'exact', head: true })
          .eq('flagged_for_review', true),
        supabase
          .from('elec_id_documents')
          .select('*', { count: 'exact', head: true })
          .eq('verification_status', 'appealed'),
        supabase
          .from('elec_id_documents')
          .select('*', { count: 'exact', head: true })
          .or(
            'verification_status.eq.pending,verification_status.eq.needs_review,verification_status.eq.appealed,flagged_for_review.eq.true'
          ),
      ]);
      return {
        pending: pendingRes.count || 0,
        thisWeek: weekRes.count || 0,
        verified: verifiedRes.count || 0,
        rejected: rejectedRes.count || 0,
        flagged: flaggedRes.count || 0,
        appealed: appealedRes.count || 0,
        needsAttention: needsAttentionRes.count || 0,
      };
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async ({ id, action, notes }: { id: string; action: string; notes: string }) => {
      const updateData: Record<string, unknown> = {
        review_action: action,
        review_notes: notes || null,
        reviewed_by: profile?.id,
        reviewed_at: new Date().toISOString(),
        flagged_for_review: false,
        updated_at: new Date().toISOString(),
      };

      if (action === 'approved') {
        updateData.verification_status = 'verified';
        updateData.verification_confidence = 1.0;
      } else if (action === 'rejected') {
        updateData.verification_status = 'rejected';
        updateData.rejection_reason = notes || 'Document rejected by admin review';
      } else if (action === 'request_reupload') {
        updateData.verification_status = 'rejected';
        updateData.rejection_reason = notes || 'Please upload a clearer image of your document';
        updateData.rejection_code = 'REUPLOAD_REQUIRED';
      }

      const { error } = await supabase.from('elec_id_documents').update(updateData).eq('id', id);
      if (error) throw error;

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: `document_review_${action}`,
        entity_type: 'elec_id_document',
        entity_id: id,
        new_values: { review_action: action, notes },
      });
    },
    onSuccess: (_data, variables) => {
      if (variables.action === 'approved') {
        haptic.success();
      } else {
        haptic.warning();
      }
      queryClient.invalidateQueries({ queryKey: ['admin-document-review'] });
      queryClient.invalidateQueries({ queryKey: ['admin-document-review-stats'] });

      if (queueMode) {
        setReviewAction(null);
        setReviewNotes('');
        setImageZoom(1);
        setImageRotation(0);
        advanceQueue(variables.id);
      } else {
        setSelectedDocument(null);
        setReviewAction(null);
        setReviewNotes('');
        setImageZoom(1);
        setImageRotation(0);
        toast({
          title: 'Document reviewed',
          description: 'The document has been processed successfully.',
        });
      }
    },
    onError: () => {
      haptic.error();
      toast({
        title: 'Error',
        description: 'Failed to review document. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const bulkApproveMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const updateData = {
        verification_status: 'verified',
        verification_confidence: 1.0,
        review_action: 'approved',
        reviewed_by: profile?.id,
        reviewed_at: new Date().toISOString(),
        flagged_for_review: false,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('elec_id_documents').update(updateData).in('id', ids);
      if (error) throw error;

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'document_bulk_approve',
        entity_type: 'elec_id_document',
        new_values: { document_ids: ids, count: ids.length },
      });

      return ids.length;
    },
    onSuccess: (count) => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-document-review'] });
      queryClient.invalidateQueries({ queryKey: ['admin-document-review-stats'] });
      setSelectedIds(new Set());
      setShowBulkApproveDialog(false);
      toast({
        title: 'Bulk approval complete',
        description: `${count} documents have been verified.`,
      });
    },
    onError: () => {
      haptic.error();
      toast({
        title: 'Bulk approval failed',
        description: 'Some documents could not be approved.',
        variant: 'destructive',
      });
    },
  });

  const bulkRejectMutation = useMutation({
    mutationFn: async ({ ids, reason }: { ids: string[]; reason: string }) => {
      const updateData = {
        verification_status: 'rejected',
        rejection_reason: reason || 'Document rejected by admin review',
        review_action: 'rejected',
        reviewed_by: profile?.id,
        reviewed_at: new Date().toISOString(),
        flagged_for_review: false,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('elec_id_documents').update(updateData).in('id', ids);
      if (error) throw error;

      return ids.length;
    },
    onSuccess: (count) => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-document-review'] });
      queryClient.invalidateQueries({ queryKey: ['admin-document-review-stats'] });
      setSelectedIds(new Set());
      setShowBulkRejectDialog(false);
      setBulkRejectReason('');
      toast({
        title: 'Bulk rejection complete',
        description: `${count} documents have been rejected.`,
      });
    },
    onError: () => {
      haptic.error();
      toast({
        title: 'Bulk rejection failed',
        description: 'Some documents could not be rejected.',
        variant: 'destructive',
      });
    },
  });

  const quickApproveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('elec_id_documents')
        .update({
          verification_status: 'verified',
          verification_confidence: 1.0,
          review_action: 'approved',
          reviewed_by: profile?.id,
          reviewed_at: new Date().toISOString(),
          flagged_for_review: false,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_data, docId) => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-document-review'] });
      queryClient.invalidateQueries({ queryKey: ['admin-document-review-stats'] });
      if (queueMode) {
        advanceQueue(docId);
      } else {
        toast({ title: 'Document approved' });
      }
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const loadDocumentImage = async (doc: DocumentRecord) => {
    setSelectedDocument(doc);
    setDocumentImageUrl(null);
    setImageLoading(true);
    setImageZoom(1);
    setImageRotation(0);
    setReviewAction(null);
    setReviewNotes('');

    const filePath = doc.file_path || doc.file_url;
    if (filePath && !filePath.startsWith('http')) {
      const { data, error } = await supabase.storage
        .from('elec-id-documents')
        .createSignedUrl(filePath, 3600);

      if (error) {
        const { data: downloadData, error: downloadError } = await supabase.storage
          .from('elec-id-documents')
          .download(filePath);

        if (downloadError) {
          toast({
            title: 'Could not load document image',
            description: error.message,
            variant: 'destructive',
          });
        } else if (downloadData) {
          const objectUrl = URL.createObjectURL(downloadData);
          setDocumentImageUrl(objectUrl);
        }
      } else {
        setDocumentImageUrl(data?.signedUrl || null);
      }
    } else if (filePath?.startsWith('http')) {
      setDocumentImageUrl(filePath);
    }
    setImageLoading(false);
  };

  const handleReview = () => {
    if (!selectedDocument || !reviewAction) return;
    reviewMutation.mutate({
      id: selectedDocument.id,
      action: reviewAction,
      notes: reviewNotes,
    });
  };

  const selectableDocs =
    documents?.filter(
      (d) => d.verification_status !== 'verified' && d.verification_status !== 'rejected'
    ) || [];

  const startQueue = useCallback(() => {
    if (selectableDocs.length === 0) return;
    setQueueMode(true);
    setQueueReviewCount(0);
    loadDocumentImage(selectableDocs[0]);
  }, [selectableDocs]);

  const advanceQueue = useCallback(
    (justReviewedId: string) => {
      const remaining = selectableDocs.filter((d) => d.id !== justReviewedId);
      setQueueReviewCount((c) => c + 1);
      if (remaining.length > 0) {
        loadDocumentImage(remaining[0]);
      } else {
        setSelectedDocument(null);
        setQueueMode(false);
        toast({
          title: 'Queue complete!',
          description: `All ${queueReviewCount + 1} documents reviewed.`,
        });
        setQueueReviewCount(0);
      }
    },
    [selectableDocs, queueReviewCount]
  );

  const skipInQueue = useCallback(() => {
    if (!selectedDocument || selectableDocs.length <= 1) return;
    const currentIdx = selectableDocs.findIndex((d) => d.id === selectedDocument.id);
    const nextIdx = (currentIdx + 1) % selectableDocs.length;
    loadDocumentImage(selectableDocs[nextIdx]);
    setReviewAction(null);
    setReviewNotes('');
  }, [selectedDocument, selectableDocs]);

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const selectAll = () => {
    setSelectedIds(new Set(selectableDocs.map((d) => d.id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const filterTabs = [
    { value: 'all', label: 'All', count: undefined },
    { value: 'needs_attention', label: 'Pending', count: stats?.needsAttention },
    { value: 'verified', label: 'Approved', count: stats?.verified },
    { value: 'flagged', label: 'Flagged', count: stats?.flagged },
    { value: 'rejected', label: 'Rejected', count: stats?.rejected },
  ];

  const listTone: Tone =
    statusFilter === 'verified'
      ? 'emerald'
      : statusFilter === 'rejected'
        ? 'red'
        : statusFilter === 'flagged'
          ? 'amber'
          : 'blue';

  const listTitle =
    statusFilter === 'verified'
      ? 'Approved'
      : statusFilter === 'rejected'
        ? 'Rejected'
        : statusFilter === 'flagged'
          ? 'Flagged'
          : statusFilter === 'all'
            ? 'All Documents'
            : 'Pending Review';

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
        await refetchStats();
      }}
    >
      <div className="min-h-screen bg-background">
        <div className="px-4 sm:px-6 lg:px-8">
          <PageFrame>
            <PageHero
              eyebrow="Moderation"
              title="Document Review"
              description="Review user-uploaded certificates and documents."
              tone="blue"
              actions={
                <>
                  {selectableDocs.length > 0 && (
                    <button
                      onClick={startQueue}
                      className={cn(
                        'h-10 px-4 rounded-full text-[12.5px] font-medium touch-manipulation transition-colors inline-flex items-center gap-2',
                        queueMode
                          ? 'bg-emerald-500 text-white'
                          : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                      )}
                    >
                      <ListChecks className="h-4 w-4" />
                      {queueMode ? 'Reviewing' : `Queue · ${selectableDocs.length}`}
                    </button>
                  )}
                  <IconButton
                    onClick={() => {
                      refetch();
                      refetchStats();
                    }}
                    disabled={isFetching}
                    aria-label="Refresh"
                  >
                    <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
                  </IconButton>
                </>
              }
            />

            <StatStrip
              columns={4}
              stats={[
                {
                  label: 'Pending',
                  value: stats?.pending ?? 0,
                  tone: 'orange',
                  onClick: () => setStatusFilter('needs_attention'),
                },
                {
                  label: 'This Week',
                  value: stats?.thisWeek ?? 0,
                  tone: 'blue',
                  onClick: () => setStatusFilter('all'),
                },
                {
                  label: 'Approved',
                  value: stats?.verified ?? 0,
                  tone: 'emerald',
                  onClick: () => setStatusFilter('verified'),
                },
                {
                  label: 'Rejected',
                  value: stats?.rejected ?? 0,
                  tone: 'red',
                  onClick: () => setStatusFilter('rejected'),
                },
              ]}
            />

            <FilterBar
              tabs={filterTabs}
              activeTab={statusFilter}
              onTabChange={setStatusFilter}
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search by name, email, document..."
              actions={
                <Select value={docTypeFilter} onValueChange={setDocTypeFilter}>
                  <SelectTrigger className="h-10 w-44 bg-[hsl(0_0%_12%)] border-white/[0.08] rounded-full text-[13px] text-white touch-manipulation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(0_0%_10%)] border-white/[0.08] text-white">
                    {DOC_TYPE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-white">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              }
            />

            {statusFilter !== 'verified' &&
              statusFilter !== 'rejected' &&
              selectableDocs.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={
                      selectedIds.size === selectableDocs.length ? clearSelection : selectAll
                    }
                    className="h-10 px-4 inline-flex items-center gap-2 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.08] text-[12.5px] font-medium text-white hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                  >
                    {selectedIds.size === selectableDocs.length ? (
                      <>
                        <CheckSquare className="h-4 w-4" />
                        Deselect
                      </>
                    ) : (
                      <>
                        <Square className="h-4 w-4" />
                        Select all
                      </>
                    )}
                  </button>
                  {selectedIds.size > 0 && (
                    <>
                      <button
                        onClick={() => setShowBulkApproveDialog(true)}
                        disabled={bulkApproveMutation.isPending}
                        className="h-10 px-4 inline-flex items-center gap-2 rounded-full bg-elec-yellow text-black text-[12.5px] font-medium hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50"
                      >
                        <Check className="h-4 w-4" />
                        Approve ({selectedIds.size})
                      </button>
                      <button
                        onClick={() => setShowBulkRejectDialog(true)}
                        disabled={bulkRejectMutation.isPending}
                        className="h-10 px-4 inline-flex items-center gap-2 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.08] text-[12.5px] font-medium text-white hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation disabled:opacity-50"
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              )}

            {isLoading ? (
              <LoadingBlocks />
            ) : !documents || documents.length === 0 ? (
              <EmptyState
                title="No documents pending review"
                description={
                  statusFilter === 'needs_attention'
                    ? 'All caught up. New uploads will appear here.'
                    : `No ${statusFilter.replace('_', ' ')} documents found.`
                }
              />
            ) : (
              <ListCard>
                <ListCardHeader
                  tone={listTone}
                  title={listTitle}
                  meta={<Pill tone={listTone}>{documents.length}</Pill>}
                />
                <ListBody>
                  {documents.map((doc) => {
                    const tone: Tone =
                      STATUS_TONE[doc.verification_status] ||
                      (doc.flagged_for_review ? 'amber' : 'orange');
                    const label = STATUS_LABEL[doc.verification_status] || 'Pending';
                    const uploaderName =
                      doc.elec_id_profile?.employee?.name ||
                      (doc.extracted_data?.holderName as string | undefined) ||
                      'Unknown';
                    const isSelectable =
                      statusFilter !== 'verified' &&
                      statusFilter !== 'rejected' &&
                      doc.verification_status !== 'verified' &&
                      doc.verification_status !== 'rejected';
                    const subtitle = [
                      formatDocType(doc.document_type),
                      uploaderName,
                      getDocumentAge(doc.created_at),
                    ].join(' · ');

                    return (
                      <ListRow
                        key={doc.id}
                        accent={doc.flagged_for_review ? 'amber' : undefined}
                        lead={
                          isSelectable ? (
                            <div
                              className="flex items-center gap-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelect(doc.id);
                              }}
                            >
                              <Checkbox
                                checked={selectedIds.has(doc.id)}
                                className="h-5 w-5 border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                              />
                              <Avatar initials={getInitials(uploaderName)} />
                            </div>
                          ) : (
                            <Avatar initials={getInitials(uploaderName)} />
                          )
                        }
                        title={doc.document_name}
                        subtitle={subtitle}
                        trailing={
                          <>
                            {doc.flagged_for_review && <Pill tone="amber">Flagged</Pill>}
                            <Pill tone={tone}>{label}</Pill>
                          </>
                        }
                        onClick={() => loadDocumentImage(doc)}
                      />
                    );
                  })}
                </ListBody>
              </ListCard>
            )}
          </PageFrame>
        </div>

        <Sheet
          open={!!selectedDocument}
          onOpenChange={() => {
            setSelectedDocument(null);
            if (queueMode) {
              setQueueMode(false);
              setQueueReviewCount(0);
            }
          }}
        >
          <SheetContent
            side="bottom"
            className="h-[95vh] sm:h-[90vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/30" />
              </div>

              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06] flex-shrink-0">
                <SheetTitle className="text-left">
                  {selectedDocument && (
                    <div className="flex items-center gap-3">
                      <Avatar
                        initials={getInitials(
                          selectedDocument.elec_id_profile?.employee?.name
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                          {formatDocType(selectedDocument.document_type)}
                        </div>
                        <div className="mt-1 text-base font-semibold text-white truncate">
                          {selectedDocument.document_name}
                        </div>
                      </div>
                    </div>
                  )}
                </SheetTitle>
              </SheetHeader>

              {queueMode && (
                <div className="px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-elec-yellow font-medium inline-flex items-center gap-1.5">
                      <ListChecks className="h-3.5 w-3.5" />
                      Queue mode
                    </span>
                    <span className="text-white">
                      {queueReviewCount} reviewed · {selectableDocs.length} remaining
                    </span>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-white/[0.08] overflow-hidden">
                    <div
                      className="h-full bg-elec-yellow rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          selectableDocs.length + queueReviewCount > 0
                            ? (queueReviewCount /
                                (selectableDocs.length + queueReviewCount)) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto">
                {selectedDocument && (
                  <div className="p-5 space-y-5">
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-black/40">
                      {imageLoading ? (
                        <div className="h-64 flex items-center justify-center">
                          <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" />
                        </div>
                      ) : documentImageUrl ? (
                        <div className="relative">
                          <img
                            src={documentImageUrl}
                            alt="Document"
                            className="w-full h-auto max-h-80 object-contain transition-transform"
                            style={{
                              transform: `scale(${imageZoom}) rotate(${imageRotation}deg)`,
                            }}
                          />
                          <div className="absolute bottom-3 right-3 flex items-center gap-2">
                            <IconButton
                              onClick={() => setImageZoom((z) => Math.max(0.5, z - 0.25))}
                              aria-label="Zoom out"
                            >
                              <ZoomOut className="h-4 w-4" />
                            </IconButton>
                            <IconButton
                              onClick={() => setImageZoom((z) => Math.min(3, z + 0.25))}
                              aria-label="Zoom in"
                            >
                              <ZoomIn className="h-4 w-4" />
                            </IconButton>
                            <IconButton
                              onClick={() => setImageRotation((r) => (r + 90) % 360)}
                              aria-label="Rotate"
                            >
                              <RotateCw className="h-4 w-4" />
                            </IconButton>
                            <IconButton
                              onClick={() => window.open(documentImageUrl, '_blank')}
                              aria-label="Open"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </IconButton>
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 flex flex-col items-center justify-center gap-2">
                          <FileCheck className="h-10 w-10 text-white" />
                          <p className="text-[13px] text-white">No image available</p>
                        </div>
                      )}
                    </div>

                    {(selectedDocument.flagged_for_review ||
                      selectedDocument.verification_status === 'appealed') && (
                      <ListCard>
                        <div className="relative border-b border-white/[0.06]">
                          <div
                            className={cn(
                              'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70',
                              selectedDocument.verification_status === 'appealed'
                                ? 'from-elec-yellow/80 via-amber-400/70 to-orange-400/70'
                                : 'from-amber-500/70 via-amber-400/70 to-yellow-400/70'
                            )}
                          />
                          <div className="flex items-start gap-3 px-5 py-4">
                            <AlertTriangle
                              className={cn(
                                'h-4 w-4 mt-0.5 shrink-0',
                                selectedDocument.verification_status === 'appealed'
                                  ? 'text-elec-yellow'
                                  : 'text-amber-400'
                              )}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="text-[13px] font-semibold text-white">
                                {selectedDocument.verification_status === 'appealed'
                                  ? 'User Appeal'
                                  : 'Flagged for Review'}
                              </div>
                              <div className="mt-1 text-[13px] text-white">
                                {selectedDocument.appeal_notes || selectedDocument.flag_reason}
                              </div>
                            </div>
                          </div>
                        </div>
                      </ListCard>
                    )}

                    {selectedDocument.elec_id_profile?.employee && (
                      <ListCard>
                        <ListCardHeader title="Uploaded by" />
                        <div className="px-5 py-4 flex items-center gap-3">
                          <Avatar
                            initials={getInitials(selectedDocument.elec_id_profile.employee.name)}
                          />
                          <div className="min-w-0">
                            <div className="text-[14px] font-medium text-white truncate">
                              {selectedDocument.elec_id_profile.employee.name || 'Unknown'}
                            </div>
                            <div className="text-[11.5px] text-white truncate">
                              {selectedDocument.elec_id_profile.employee.email}
                            </div>
                          </div>
                        </div>
                      </ListCard>
                    )}

                    <ListCard>
                      <ListCardHeader title="Details" />
                      <ListBody>
                        {selectedDocument.verification_confidence != null && (
                          <ListRow
                            title="AI Confidence"
                            trailing={
                              <span className="text-[14px] font-semibold text-white tabular-nums">
                                {Math.round(selectedDocument.verification_confidence * 100)}%
                              </span>
                            }
                          />
                        )}
                        <ListRow
                          title="Uploaded"
                          subtitle={`${formatDistanceToNow(
                            new Date(selectedDocument.created_at)
                          )} ago`}
                          trailing={
                            <span className="text-[13px] text-white">
                              {format(new Date(selectedDocument.created_at), 'd MMM yyyy')}
                            </span>
                          }
                        />
                        {selectedDocument.document_number && (
                          <ListRow
                            title="Document No."
                            trailing={
                              <span className="text-[13px] font-mono text-white">
                                {selectedDocument.document_number}
                              </span>
                            }
                          />
                        )}
                        {selectedDocument.issuing_body && (
                          <ListRow
                            title="Issuer"
                            trailing={
                              <span className="text-[13px] text-white">
                                {selectedDocument.issuing_body}
                              </span>
                            }
                          />
                        )}
                        {selectedDocument.expiry_date && (
                          <ListRow
                            title="Expiry Date"
                            trailing={
                              <span className="text-[13px] text-white">
                                {format(new Date(selectedDocument.expiry_date), 'd MMM yyyy')}
                              </span>
                            }
                          />
                        )}
                      </ListBody>
                    </ListCard>

                    {selectedDocument.extracted_data &&
                      Object.keys(selectedDocument.extracted_data).length > 0 && (
                        <ListCard>
                          <ListCardHeader title="AI Extracted Data" />
                          <ListBody>
                            {Object.entries(selectedDocument.extracted_data).map(([key, value]) => {
                              if (!value) return null;
                              const confidence = selectedDocument.extraction_confidence?.[key];
                              const isLowConfidence = confidence != null && confidence < 0.6;
                              return (
                                <ListRow
                                  key={key}
                                  title={
                                    <span className="capitalize">
                                      {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                  }
                                  trailing={
                                    <span
                                      className={cn(
                                        'text-[13px] font-medium text-right',
                                        isLowConfidence ? 'text-amber-400' : 'text-white'
                                      )}
                                    >
                                      {String(value)}
                                      {isLowConfidence && (
                                        <span className="ml-1 text-[11px] text-amber-400">
                                          ({Math.round((confidence || 0) * 100)}%)
                                        </span>
                                      )}
                                    </span>
                                  }
                                />
                              );
                            })}
                          </ListBody>
                        </ListCard>
                      )}

                    {selectedDocument.rejection_reason &&
                      selectedDocument.verification_status !== 'rejected' && (
                        <ListCard>
                          <ListCardHeader tone="red" title="Previous Rejection" />
                          <div className="px-5 py-4 text-[13px] text-white">
                            {selectedDocument.rejection_reason}
                          </div>
                        </ListCard>
                      )}

                    {selectedDocument.review_notes && (
                      <ListCard>
                        <ListCardHeader title="Review Thread" />
                        <ListBody>
                          <ListRow
                            lead={<Avatar initials="AM" />}
                            title="Admin note"
                            subtitle={
                              selectedDocument.reviewed_at
                                ? `${formatDistanceToNow(
                                    new Date(selectedDocument.reviewed_at)
                                  )} ago`
                                : undefined
                            }
                            trailing={
                              <span className="text-[13px] text-white max-w-[180px] truncate">
                                {selectedDocument.review_notes}
                              </span>
                            }
                          />
                        </ListBody>
                      </ListCard>
                    )}

                    {selectedDocument.verification_status !== 'verified' && (
                      <div className="space-y-4 pt-2">
                        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                          Review Decision
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <button
                            className={cn(
                              'flex flex-col items-center justify-center h-24 rounded-2xl border transition-colors touch-manipulation',
                              reviewAction === 'approved'
                                ? 'bg-elec-yellow border-elec-yellow text-black'
                                : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white hover:bg-[hsl(0_0%_15%)]'
                            )}
                            onClick={() => setReviewAction('approved')}
                          >
                            <Check className="h-5 w-5 mb-1.5" />
                            <span className="text-[12px] font-medium">Approve</span>
                          </button>
                          <button
                            className={cn(
                              'flex flex-col items-center justify-center h-24 rounded-2xl border transition-colors touch-manipulation',
                              reviewAction === 'rejected'
                                ? 'bg-white text-black border-white'
                                : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white hover:bg-[hsl(0_0%_15%)]'
                            )}
                            onClick={() => setReviewAction('rejected')}
                          >
                            <X className="h-5 w-5 mb-1.5" />
                            <span className="text-[12px] font-medium">Reject</span>
                          </button>
                          <button
                            className={cn(
                              'flex flex-col items-center justify-center h-24 rounded-2xl border transition-colors touch-manipulation',
                              reviewAction === 'request_reupload'
                                ? 'bg-white text-black border-white'
                                : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white hover:bg-[hsl(0_0%_15%)]'
                            )}
                            onClick={() => setReviewAction('request_reupload')}
                          >
                            <RefreshCw className="h-5 w-5 mb-1.5" />
                            <span className="text-[12px] font-medium">Re-upload</span>
                          </button>
                        </div>

                        {reviewAction && (
                          <div className="space-y-2">
                            <Label className="text-[12px] text-white">
                              {reviewAction === 'approved'
                                ? 'Notes (optional)'
                                : 'Reason (required)'}
                            </Label>
                            <Textarea
                              value={reviewNotes}
                              onChange={(e) => setReviewNotes(e.target.value)}
                              placeholder={
                                reviewAction === 'rejected'
                                  ? 'Why is this document being rejected?'
                                  : reviewAction === 'request_reupload'
                                    ? 'What should be improved in the new upload?'
                                    : 'Any notes about this approval...'
                              }
                              className="bg-[hsl(0_0%_12%)] border-white/[0.08] min-h-[80px] text-[14px] text-white placeholder:text-white touch-manipulation"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {selectedDocument.verification_status === 'verified' && (
                      <ListCard>
                        <ListCardHeader tone="emerald" title="Document Verified" />
                        <div className="px-5 py-5 text-center">
                          <div className="text-[13px] text-white">
                            {selectedDocument.reviewed_at
                              ? `Reviewed ${formatDistanceToNow(
                                  new Date(selectedDocument.reviewed_at)
                                )} ago`
                              : 'This document has been verified.'}
                          </div>
                        </div>
                      </ListCard>
                    )}
                  </div>
                )}
              </div>

              {selectedDocument && selectedDocument.verification_status !== 'verified' && (
                <div className="flex-shrink-0 p-4 border-t border-white/[0.06] bg-[hsl(0_0%_10%)]">
                  <div className="flex gap-3">
                    {queueMode ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setQueueMode(false);
                            setSelectedDocument(null);
                            setQueueReviewCount(0);
                          }}
                          className="h-12 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] text-white hover:bg-[hsl(0_0%_15%)] px-4"
                        >
                          Exit
                        </Button>
                        <Button
                          variant="outline"
                          onClick={skipInQueue}
                          disabled={selectableDocs.length <= 1}
                          className="h-12 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] text-white hover:bg-[hsl(0_0%_15%)] px-4"
                        >
                          <SkipForward className="h-4 w-4 mr-1.5" />
                          Skip
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDocument(null)}
                        className="flex-1 h-12 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] text-white hover:bg-[hsl(0_0%_15%)]"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      onClick={handleReview}
                      disabled={
                        !reviewAction ||
                        reviewMutation.isPending ||
                        (reviewAction !== 'approved' && !reviewNotes.trim())
                      }
                      className="flex-1 h-12 touch-manipulation font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black disabled:opacity-50"
                    >
                      {reviewMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {reviewAction === 'approved' && <Check className="h-4 w-4 mr-2" />}
                          {reviewAction === 'rejected' && <X className="h-4 w-4 mr-2" />}
                          {reviewAction === 'request_reupload' && (
                            <RefreshCw className="h-4 w-4 mr-2" />
                          )}
                          {reviewAction
                            ? `Confirm ${
                                reviewAction === 'request_reupload'
                                  ? 'Request'
                                  : reviewAction.charAt(0).toUpperCase() + reviewAction.slice(1)
                              }`
                            : 'Select Action'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={showBulkApproveDialog} onOpenChange={setShowBulkApproveDialog}>
          <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.08] text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Approve {selectedIds.size} Documents?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This will mark {selectedIds.size} documents as verified. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] text-white hover:bg-[hsl(0_0%_15%)]"
                disabled={bulkApproveMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                onClick={() => bulkApproveMutation.mutate(Array.from(selectedIds))}
                disabled={bulkApproveMutation.isPending}
              >
                {bulkApproveMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Approving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Approve all
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showBulkRejectDialog} onOpenChange={setShowBulkRejectDialog}>
          <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.08] text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Reject {selectedIds.size} Documents?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                Please provide a reason for rejection. This will be sent to all users.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Textarea
              value={bulkRejectReason}
              onChange={(e) => setBulkRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="min-h-[100px] bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white"
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] text-white hover:bg-[hsl(0_0%_15%)]"
                disabled={bulkRejectMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                onClick={() =>
                  bulkRejectMutation.mutate({
                    ids: Array.from(selectedIds),
                    reason: bulkRejectReason,
                  })
                }
                disabled={!bulkRejectReason.trim() || bulkRejectMutation.isPending}
              >
                {bulkRejectMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Reject all
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="pb-20" />
      </div>
    </PullToRefresh>
  );
}
