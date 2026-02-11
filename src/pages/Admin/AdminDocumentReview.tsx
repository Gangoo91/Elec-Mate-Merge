import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  FileCheck,
  RefreshCw,
  ChevronRight,
  Check,
  X,
  Clock,
  AlertTriangle,
  Flag,
  Eye,
  User,
  IdCard,
  GraduationCap,
  Car,
  Shield,
  Award,
  HardHat,
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Calendar,
  Hash,
  Building,
  ExternalLink,
  CheckSquare,
  Square,
  SkipForward,
  ListChecks,
} from 'lucide-react';
import { format, formatDistanceToNow, differenceInMinutes } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import PullToRefresh from '@/components/admin/PullToRefresh';

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

const DOCUMENT_ICONS: Record<string, typeof IdCard> = {
  ecs_card: IdCard,
  qualification: GraduationCap,
  training: Award,
  cscs: HardHat,
  driving_licence: Car,
  insurance: Shield,
};

const DOCUMENT_COLORS: Record<string, string> = {
  ecs_card: 'text-yellow-400 bg-yellow-500/20',
  qualification: 'text-blue-400 bg-blue-500/20',
  training: 'text-green-400 bg-green-500/20',
  cscs: 'text-orange-400 bg-orange-500/20',
  driving_licence: 'text-yellow-400 bg-yellow-500/20',
  insurance: 'text-cyan-400 bg-cyan-500/20',
};

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: Clock,
    description: 'Awaiting AI verification',
  },
  processing: {
    label: 'Processing',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: Loader2,
    description: 'AI is analysing',
  },
  verified: {
    label: 'Verified',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: CheckCircle2,
    description: 'Successfully verified',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    icon: XCircle,
    description: 'Verification failed',
  },
  needs_review: {
    label: 'Needs Review',
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    icon: Eye,
    description: 'Requires manual review',
  },
  appealed: {
    label: 'Appealed',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: Flag,
    description: 'User submitted appeal',
  },
};

export default function AdminDocumentReview() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('needs_attention');
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

  // Fetch documents with real-time updates
  const {
    data: documents,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-document-review', search, statusFilter],
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

      // Filter based on status
      if (statusFilter === 'needs_attention') {
        // Show pending, needs_review, appealed, and flagged documents
        query = query.or(
          'verification_status.eq.pending,verification_status.eq.needs_review,verification_status.eq.appealed,flagged_for_review.eq.true'
        );
      } else if (statusFilter === 'flagged') {
        query = query.eq('flagged_for_review', true);
      } else if (statusFilter !== 'all') {
        query = query.eq('verification_status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as DocumentRecord[];

      // Apply search filter
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

      // Sort: flagged first, then by age (oldest first for needs_attention)
      if (statusFilter === 'needs_attention') {
        filtered.sort((a, b) => {
          // Flagged items first
          if (a.flagged_for_review && !b.flagged_for_review) return -1;
          if (!a.flagged_for_review && b.flagged_for_review) return 1;
          // Then appealed
          if (a.verification_status === 'appealed' && b.verification_status !== 'appealed')
            return -1;
          if (a.verification_status !== 'appealed' && b.verification_status === 'appealed')
            return 1;
          // Then oldest first
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });
      }

      return filtered;
    },
  });

  // Auto-flag stale pending documents (>5 minutes old)
  useEffect(() => {
    const flagStaleDocuments = async () => {
      if (!documents) return;

      const staleThreshold = 5; // minutes
      const staleDocs = documents.filter(
        (d) =>
          d.verification_status === 'pending' &&
          !d.flagged_for_review &&
          differenceInMinutes(new Date(), new Date(d.created_at)) > staleThreshold
      );

      if (staleDocs.length > 0) {
        console.log(`[Admin] Flagging ${staleDocs.length} stale documents`);
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

  // Real-time subscription for document updates
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
          console.log('[Admin] Document change detected, refreshing...');
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  // Get stats
  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ['admin-document-review-stats'],
    refetchInterval: 30000,
    staleTime: 0,
    queryFn: async () => {
      const [
        needsAttentionRes,
        pendingRes,
        flaggedRes,
        appealedRes,
        verifiedRes,
        rejectedRes,
        totalRes,
      ] = await Promise.all([
        supabase
          .from('elec_id_documents')
          .select('*', { count: 'exact', head: true })
          .or(
            'verification_status.eq.pending,verification_status.eq.needs_review,verification_status.eq.appealed,flagged_for_review.eq.true'
          ),
        supabase
          .from('elec_id_documents')
          .select('*', { count: 'exact', head: true })
          .eq('verification_status', 'pending'),
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
          .eq('verification_status', 'verified'),
        supabase
          .from('elec_id_documents')
          .select('*', { count: 'exact', head: true })
          .eq('verification_status', 'rejected'),
        supabase.from('elec_id_documents').select('*', { count: 'exact', head: true }),
      ]);
      return {
        needsAttention: needsAttentionRes.count || 0,
        pending: pendingRes.count || 0,
        flagged: flaggedRes.count || 0,
        appealed: appealedRes.count || 0,
        verified: verifiedRes.count || 0,
        rejected: rejectedRes.count || 0,
        total: totalRes.count || 0,
      };
    },
  });

  // Review document mutation
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

      // Log the action
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

  // Bulk approve mutation
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

      // Log bulk action
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

  // Bulk reject mutation
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

  // Quick approve without opening detail
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
  });

  // Load document image when selected
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
        console.error('[Admin] Signed URL error:', error);
        // Fallback: try downloading the file directly
        const { data: downloadData, error: downloadError } = await supabase.storage
          .from('elec-id-documents')
          .download(filePath);

        if (downloadError) {
          console.error('[Admin] Download fallback error:', downloadError);
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

  // Selection helpers — all docs that can be actioned (not in a terminal state)
  const selectableDocs =
    documents?.filter(
      (d) => d.verification_status !== 'verified' && d.verification_status !== 'rejected'
    ) || [];

  // Queue mode helpers
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

  const getDocumentAge = (createdAt: string) => {
    const minutes = differenceInMinutes(new Date(), new Date(createdAt));
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const getUrgencyColor = (createdAt: string) => {
    const minutes = differenceInMinutes(new Date(), new Date(createdAt));
    if (minutes > 1440) return 'text-red-400'; // >24h
    if (minutes > 60) return 'text-amber-400'; // >1h
    return 'text-foreground/60';
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="min-h-screen bg-background pb-20">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-white/10">
          <div className="p-4 sm:p-6">
            {/* Title and refresh */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Document Review</h1>
                <p className="text-sm text-foreground/60 hidden sm:block">
                  Review and verify uploaded documents
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selectableDocs.length > 0 && (
                  <Button
                    size="sm"
                    onClick={startQueue}
                    className={cn(
                      'gap-2 h-10 touch-manipulation font-medium',
                      queueMode
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark'
                    )}
                  >
                    <ListChecks className="h-4 w-4" />
                    {queueMode ? `Reviewing...` : `Queue (${selectableDocs.length})`}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    refetch();
                    refetchStats();
                  }}
                  disabled={isFetching}
                  className="gap-2 h-10 touch-manipulation"
                >
                  <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </div>

            {/* Stats Cards - Horizontal scroll on mobile */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 lg:grid-cols-7">
              <button
                onClick={() => setStatusFilter('needs_attention')}
                className={cn(
                  'flex-shrink-0 min-w-[120px] sm:min-w-0 p-3 rounded-xl border transition-all touch-manipulation',
                  statusFilter === 'needs_attention'
                    ? 'bg-red-500/20 border-red-500/50'
                    : 'bg-card/50 border-white/10 hover:border-white/20'
                )}
              >
                <div className="flex items-center gap-2">
                  <AlertCircle
                    className={cn(
                      'h-5 w-5',
                      statusFilter === 'needs_attention' ? 'text-red-400' : 'text-red-400/70'
                    )}
                  />
                  <div className="text-left">
                    <p
                      className={cn(
                        'text-xl font-bold',
                        statusFilter === 'needs_attention' ? 'text-red-400' : 'text-foreground'
                      )}
                    >
                      {stats?.needsAttention || 0}
                    </p>
                    <p className="text-xs text-foreground/60 uppercase tracking-wide">Attention</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setStatusFilter('pending')}
                className={cn(
                  'flex-shrink-0 min-w-[100px] sm:min-w-0 p-3 rounded-xl border transition-all touch-manipulation',
                  statusFilter === 'pending'
                    ? 'bg-yellow-500/20 border-yellow-500/50'
                    : 'bg-card/50 border-white/10 hover:border-white/20'
                )}
              >
                <div className="flex items-center gap-2">
                  <Clock
                    className={cn(
                      'h-5 w-5',
                      statusFilter === 'pending' ? 'text-yellow-400' : 'text-yellow-400/70'
                    )}
                  />
                  <div className="text-left">
                    <p
                      className={cn(
                        'text-xl font-bold',
                        statusFilter === 'pending' ? 'text-yellow-400' : 'text-foreground'
                      )}
                    >
                      {stats?.pending || 0}
                    </p>
                    <p className="text-xs text-foreground/60 uppercase tracking-wide">Pending</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setStatusFilter('flagged')}
                className={cn(
                  'flex-shrink-0 min-w-[100px] sm:min-w-0 p-3 rounded-xl border transition-all touch-manipulation',
                  statusFilter === 'flagged'
                    ? 'bg-amber-500/20 border-amber-500/50'
                    : 'bg-card/50 border-white/10 hover:border-white/20'
                )}
              >
                <div className="flex items-center gap-2">
                  <Flag
                    className={cn(
                      'h-5 w-5',
                      statusFilter === 'flagged' ? 'text-amber-400' : 'text-amber-400/70'
                    )}
                  />
                  <div className="text-left">
                    <p
                      className={cn(
                        'text-xl font-bold',
                        statusFilter === 'flagged' ? 'text-amber-400' : 'text-foreground'
                      )}
                    >
                      {stats?.flagged || 0}
                    </p>
                    <p className="text-xs text-foreground/60 uppercase tracking-wide">Flagged</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setStatusFilter('appealed')}
                className={cn(
                  'flex-shrink-0 min-w-[100px] sm:min-w-0 p-3 rounded-xl border transition-all touch-manipulation',
                  statusFilter === 'appealed'
                    ? 'bg-yellow-500/20 border-yellow-500/50'
                    : 'bg-card/50 border-white/10 hover:border-white/20'
                )}
              >
                <div className="flex items-center gap-2">
                  <Flag
                    className={cn(
                      'h-5 w-5',
                      statusFilter === 'appealed' ? 'text-yellow-400' : 'text-yellow-400/70'
                    )}
                  />
                  <div className="text-left">
                    <p
                      className={cn(
                        'text-xl font-bold',
                        statusFilter === 'appealed' ? 'text-yellow-400' : 'text-foreground'
                      )}
                    >
                      {stats?.appealed || 0}
                    </p>
                    <p className="text-xs text-foreground/60 uppercase tracking-wide">Appeals</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setStatusFilter('verified')}
                className={cn(
                  'flex-shrink-0 min-w-[100px] sm:min-w-0 p-3 rounded-xl border transition-all touch-manipulation',
                  statusFilter === 'verified'
                    ? 'bg-green-500/20 border-green-500/50'
                    : 'bg-card/50 border-white/10 hover:border-white/20'
                )}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={cn(
                      'h-5 w-5',
                      statusFilter === 'verified' ? 'text-green-400' : 'text-green-400/70'
                    )}
                  />
                  <div className="text-left">
                    <p
                      className={cn(
                        'text-xl font-bold',
                        statusFilter === 'verified' ? 'text-green-400' : 'text-foreground'
                      )}
                    >
                      {stats?.verified || 0}
                    </p>
                    <p className="text-xs text-foreground/60 uppercase tracking-wide">Verified</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setStatusFilter('rejected')}
                className={cn(
                  'flex-shrink-0 min-w-[100px] sm:min-w-0 p-3 rounded-xl border transition-all touch-manipulation',
                  statusFilter === 'rejected'
                    ? 'bg-red-500/20 border-red-500/50'
                    : 'bg-card/50 border-white/10 hover:border-white/20'
                )}
              >
                <div className="flex items-center gap-2">
                  <XCircle
                    className={cn(
                      'h-5 w-5',
                      statusFilter === 'rejected' ? 'text-red-400' : 'text-red-400/70'
                    )}
                  />
                  <div className="text-left">
                    <p
                      className={cn(
                        'text-xl font-bold',
                        statusFilter === 'rejected' ? 'text-red-400' : 'text-foreground'
                      )}
                    >
                      {stats?.rejected || 0}
                    </p>
                    <p className="text-xs text-foreground/60 uppercase tracking-wide">Rejected</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setStatusFilter('all')}
                className={cn(
                  'flex-shrink-0 min-w-[100px] sm:min-w-0 p-3 rounded-xl border transition-all touch-manipulation',
                  statusFilter === 'all'
                    ? 'bg-white/20 border-white/50'
                    : 'bg-card/50 border-white/10 hover:border-white/20'
                )}
              >
                <div className="flex items-center gap-2">
                  <FileCheck
                    className={cn(
                      'h-5 w-5',
                      statusFilter === 'all' ? 'text-foreground' : 'text-foreground/70'
                    )}
                  />
                  <div className="text-left">
                    <p
                      className={cn(
                        'text-xl font-bold',
                        statusFilter === 'all' ? 'text-foreground' : 'text-foreground'
                      )}
                    >
                      {stats?.total || 0}
                    </p>
                    <p className="text-xs text-foreground/60 uppercase tracking-wide">Total</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Search and bulk actions */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <AdminSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search by name, email, document..."
                className="flex-1"
              />

              {statusFilter !== 'verified' &&
                statusFilter !== 'rejected' &&
                selectableDocs.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 touch-manipulation gap-2"
                      onClick={
                        selectedIds.size === selectableDocs.length ? clearSelection : selectAll
                      }
                    >
                      {selectedIds.size === selectableDocs.length ? (
                        <>
                          <CheckSquare className="h-4 w-4" />
                          <span className="hidden sm:inline">Deselect</span>
                        </>
                      ) : (
                        <>
                          <Square className="h-4 w-4" />
                          <span className="hidden sm:inline">Select All</span>
                        </>
                      )}
                    </Button>

                    {selectedIds.size > 0 && (
                      <>
                        <Button
                          size="sm"
                          className="h-10 touch-manipulation gap-2 bg-green-500 hover:bg-green-600"
                          onClick={() => setShowBulkApproveDialog(true)}
                          disabled={bulkApproveMutation.isPending}
                        >
                          <Check className="h-4 w-4" />
                          <span className="hidden sm:inline">Approve</span> ({selectedIds.size})
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 touch-manipulation gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                          onClick={() => setShowBulkRejectDialog(true)}
                          disabled={bulkRejectMutation.isPending}
                        >
                          <X className="h-4 w-4" />
                          <span className="hidden sm:inline">Reject</span>
                        </Button>
                      </>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="p-4 sm:p-6 space-y-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              <p className="text-sm text-foreground/60">Loading documents...</p>
            </div>
          ) : documents?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">All caught up!</h3>
                <p className="text-sm text-foreground/60 mt-1">
                  {statusFilter === 'needs_attention'
                    ? 'No documents need attention right now'
                    : `No ${statusFilter} documents found`}
                </p>
              </div>
            </div>
          ) : (
            <>
              {documents?.map((doc) => {
                const IconComponent = DOCUMENT_ICONS[doc.document_type] || FileCheck;
                const iconColors =
                  DOCUMENT_COLORS[doc.document_type] || 'text-gray-400 bg-gray-500/20';
                const statusConfig =
                  STATUS_CONFIG[doc.verification_status as keyof typeof STATUS_CONFIG] ||
                  STATUS_CONFIG.pending;
                const StatusIcon = statusConfig.icon;
                const isSelectable =
                  statusFilter !== 'verified' &&
                  statusFilter !== 'rejected' &&
                  doc.verification_status !== 'verified' &&
                  doc.verification_status !== 'rejected';

                return (
                  <Card
                    key={doc.id}
                    className={cn(
                      'border transition-all overflow-hidden',
                      'active:scale-[0.995] touch-manipulation cursor-pointer',
                      selectedIds.has(doc.id) && 'border-cyan-500/50 bg-cyan-500/5',
                      doc.flagged_for_review &&
                        !selectedIds.has(doc.id) &&
                        'border-amber-500/30 bg-amber-500/5',
                      doc.verification_status === 'appealed' &&
                        !selectedIds.has(doc.id) &&
                        'border-yellow-500/30 bg-yellow-500/5',
                      !doc.flagged_for_review &&
                        doc.verification_status !== 'appealed' &&
                        !selectedIds.has(doc.id) &&
                        'bg-white/[0.02] border-white/10 hover:border-white/20'
                    )}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-stretch">
                        {/* Selection checkbox */}
                        {isSelectable && (
                          <div
                            className="flex items-center justify-center px-3 border-r border-white/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelect(doc.id);
                            }}
                          >
                            <Checkbox
                              checked={selectedIds.has(doc.id)}
                              className="h-5 w-5 border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                            />
                          </div>
                        )}

                        {/* Main content - clickable */}
                        <button
                          className="flex-1 p-4 text-left flex items-start sm:items-center gap-3"
                          onClick={() => loadDocumentImage(doc)}
                        >
                          {/* Document type icon */}
                          <div
                            className={cn(
                              'p-2.5 rounded-xl flex-shrink-0',
                              iconColors.split(' ')[1]
                            )}
                          >
                            <IconComponent className={cn('h-5 w-5', iconColors.split(' ')[0])} />
                          </div>

                          {/* Document info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-medium text-foreground truncate text-sm sm:text-base">
                                {doc.document_name}
                              </h4>
                              <Badge className={cn('text-xs border', statusConfig.color)}>
                                <StatusIcon
                                  className={cn(
                                    'h-3 w-3 mr-1',
                                    doc.verification_status === 'processing' && 'animate-spin'
                                  )}
                                />
                                {statusConfig.label}
                              </Badge>
                              {doc.flagged_for_review && (
                                <Badge className="text-xs bg-amber-500/20 text-amber-400 border-amber-500/30">
                                  <Flag className="h-3 w-3 mr-1" />
                                  Flagged
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-foreground/50">
                              <span className="capitalize">
                                {doc.document_type.replace(/_/g, ' ')}
                              </span>
                              {doc.elec_id_profile?.employee?.name && (
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {doc.elec_id_profile.employee.name}
                                </span>
                              )}
                              {doc.verification_confidence && doc.verification_confidence > 0 && (
                                <span className="flex items-center gap-1">
                                  <Sparkles className="h-3 w-3" />
                                  {Math.round(doc.verification_confidence * 100)}%
                                </span>
                              )}
                              <span className={getUrgencyColor(doc.created_at)}>
                                {getDocumentAge(doc.created_at)} ago
                              </span>
                            </div>

                            {/* Flag reason or appeal notes */}
                            {(doc.flag_reason || doc.appeal_notes) && (
                              <p
                                className={cn(
                                  'mt-2 text-xs line-clamp-1',
                                  doc.appeal_notes ? 'text-yellow-400' : 'text-amber-400'
                                )}
                              >
                                <AlertTriangle className="h-3 w-3 inline mr-1" />
                                {doc.appeal_notes || doc.flag_reason}
                              </p>
                            )}
                          </div>

                          <ChevronRight className="h-5 w-5 text-foreground/30 flex-shrink-0 hidden sm:block" />
                        </button>

                        {/* Quick actions - desktop only */}
                        {isSelectable && (
                          <div className="hidden lg:flex items-center gap-2 px-4 border-l border-white/10">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-11 w-11 p-0 text-green-400 hover:bg-green-500/20 touch-manipulation"
                              onClick={(e) => {
                                e.stopPropagation();
                                quickApproveMutation.mutate(doc.id);
                              }}
                              disabled={quickApproveMutation.isPending}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-11 w-11 p-0 text-foreground/60 hover:text-foreground touch-manipulation"
                              onClick={() => loadDocumentImage(doc)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}
        </div>

        {/* Document Detail Sheet */}
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
            className="h-[95vh] sm:h-[90vh] p-0 rounded-t-2xl overflow-hidden bg-background border-white/20"
          >
            <div className="flex flex-col h-full">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/30" />
              </div>

              <SheetHeader className="px-4 pb-3 border-b border-white/10 flex-shrink-0">
                <SheetTitle className="flex items-center gap-3">
                  {selectedDocument && (
                    <>
                      <div
                        className={cn(
                          'p-2.5 rounded-xl',
                          DOCUMENT_COLORS[selectedDocument.document_type]?.split(' ')[1] ||
                            'bg-gray-500/20'
                        )}
                      >
                        {(() => {
                          const Icon = DOCUMENT_ICONS[selectedDocument.document_type] || FileCheck;
                          return (
                            <Icon
                              className={cn(
                                'h-5 w-5',
                                DOCUMENT_COLORS[selectedDocument.document_type]?.split(' ')[0] ||
                                  'text-gray-400'
                              )}
                            />
                          );
                        })()}
                      </div>
                      <div className="text-left">
                        <p className="text-base font-semibold">{selectedDocument.document_name}</p>
                        <p className="text-xs text-foreground/60 capitalize">
                          {selectedDocument.document_type.replace(/_/g, ' ')}
                        </p>
                      </div>
                    </>
                  )}
                </SheetTitle>
              </SheetHeader>

              {/* Queue progress bar */}
              {queueMode && (
                <div className="px-4 py-2 border-b border-white/10 bg-green-500/5 flex-shrink-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-400 font-medium flex items-center gap-1.5">
                      <ListChecks className="h-3.5 w-3.5" />
                      Queue Mode
                    </span>
                    <span className="text-foreground/60">
                      {queueReviewCount} reviewed · {selectableDocs.length} remaining
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${selectableDocs.length + queueReviewCount > 0 ? (queueReviewCount / (selectableDocs.length + queueReviewCount)) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto">
                {selectedDocument && (
                  <div className="p-4 space-y-4">
                    {/* Document Image with controls */}
                    <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black/50">
                      {imageLoading ? (
                        <div className="h-64 flex items-center justify-center">
                          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
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
                          {/* Image controls */}
                          <div className="absolute bottom-3 right-3 flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-11 w-11 p-0 bg-black/70 hover:bg-black/90 touch-manipulation"
                              onClick={() => setImageZoom((z) => Math.max(0.5, z - 0.25))}
                            >
                              <ZoomOut className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-11 w-11 p-0 bg-black/70 hover:bg-black/90 touch-manipulation"
                              onClick={() => setImageZoom((z) => Math.min(3, z + 0.25))}
                            >
                              <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-11 w-11 p-0 bg-black/70 hover:bg-black/90 touch-manipulation"
                              onClick={() => setImageRotation((r) => (r + 90) % 360)}
                            >
                              <RotateCw className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-11 w-11 p-0 bg-black/70 hover:bg-black/90 touch-manipulation"
                              onClick={() => window.open(documentImageUrl, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 flex flex-col items-center justify-center gap-2">
                          <FileCheck className="h-12 w-12 text-foreground/30" />
                          <p className="text-sm text-foreground/50">No image available</p>
                        </div>
                      )}
                    </div>

                    {/* Alert for flagged/appealed */}
                    {(selectedDocument.flagged_for_review ||
                      selectedDocument.verification_status === 'appealed') && (
                      <div
                        className={cn(
                          'p-3 rounded-xl border',
                          selectedDocument.verification_status === 'appealed'
                            ? 'bg-yellow-500/10 border-yellow-500/30'
                            : 'bg-amber-500/10 border-amber-500/30'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <AlertTriangle
                            className={cn(
                              'h-4 w-4 mt-0.5',
                              selectedDocument.verification_status === 'appealed'
                                ? 'text-yellow-400'
                                : 'text-amber-400'
                            )}
                          />
                          <div>
                            <p
                              className={cn(
                                'text-sm font-medium',
                                selectedDocument.verification_status === 'appealed'
                                  ? 'text-yellow-400'
                                  : 'text-amber-400'
                              )}
                            >
                              {selectedDocument.verification_status === 'appealed'
                                ? 'User Appeal'
                                : 'Flagged for Review'}
                            </p>
                            <p className="text-sm text-foreground/70 mt-1">
                              {selectedDocument.appeal_notes || selectedDocument.flag_reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* User Info */}
                    {selectedDocument.elec_id_profile?.employee && (
                      <div className="p-3 rounded-xl bg-card/50 border border-white/10">
                        <h4 className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-2">
                          Uploaded by
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                            <User className="h-5 w-5 text-elec-yellow" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {selectedDocument.elec_id_profile.employee.name || 'Unknown'}
                            </p>
                            <p className="text-xs text-foreground/60">
                              {selectedDocument.elec_id_profile.employee.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Document Details Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {selectedDocument.verification_confidence != null && (
                        <div className="p-3 rounded-xl bg-card/50 border border-white/10">
                          <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
                            <span className="text-xs text-foreground/60">AI Confidence</span>
                          </div>
                          <p className="text-lg font-bold text-foreground">
                            {Math.round(selectedDocument.verification_confidence * 100)}%
                          </p>
                        </div>
                      )}

                      <div className="p-3 rounded-xl bg-card/50 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-3.5 w-3.5 text-foreground/60" />
                          <span className="text-xs text-foreground/60">Uploaded</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          {format(new Date(selectedDocument.created_at), 'd MMM yyyy')}
                        </p>
                        <p className="text-xs text-foreground/50">
                          {formatDistanceToNow(new Date(selectedDocument.created_at))} ago
                        </p>
                      </div>

                      {selectedDocument.document_number && (
                        <div className="p-3 rounded-xl bg-card/50 border border-white/10">
                          <div className="flex items-center gap-2 mb-1">
                            <Hash className="h-3.5 w-3.5 text-foreground/60" />
                            <span className="text-xs text-foreground/60">Document No.</span>
                          </div>
                          <p className="text-sm font-medium text-foreground font-mono">
                            {selectedDocument.document_number}
                          </p>
                        </div>
                      )}

                      {selectedDocument.issuing_body && (
                        <div className="p-3 rounded-xl bg-card/50 border border-white/10">
                          <div className="flex items-center gap-2 mb-1">
                            <Building className="h-3.5 w-3.5 text-foreground/60" />
                            <span className="text-xs text-foreground/60">Issuer</span>
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            {selectedDocument.issuing_body}
                          </p>
                        </div>
                      )}

                      {selectedDocument.expiry_date && (
                        <div className="p-3 rounded-xl bg-card/50 border border-white/10 col-span-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="h-3.5 w-3.5 text-foreground/60" />
                            <span className="text-xs text-foreground/60">Expiry Date</span>
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            {format(new Date(selectedDocument.expiry_date), 'd MMMM yyyy')}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Extracted Data */}
                    {selectedDocument.extracted_data &&
                      Object.keys(selectedDocument.extracted_data).length > 0 && (
                        <div className="p-3 rounded-xl bg-card/50 border border-white/10">
                          <h4 className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-3">
                            AI Extracted Data
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(selectedDocument.extracted_data).map(([key, value]) => {
                              if (!value) return null;
                              const confidence = selectedDocument.extraction_confidence?.[key];
                              const isLowConfidence = confidence != null && confidence < 0.6;
                              return (
                                <div key={key} className="flex justify-between items-start text-sm">
                                  <span className="text-foreground/60 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                  <span
                                    className={cn(
                                      'font-medium text-right',
                                      isLowConfidence ? 'text-amber-400' : 'text-foreground'
                                    )}
                                  >
                                    {String(value)}
                                    {isLowConfidence && (
                                      <span className="text-xs text-amber-400 ml-1">
                                        ({Math.round((confidence || 0) * 100)}%)
                                      </span>
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    {/* Previous rejection reason if any */}
                    {selectedDocument.rejection_reason &&
                      selectedDocument.verification_status !== 'rejected' && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                          <h4 className="text-xs font-medium text-red-400 uppercase tracking-wide mb-1">
                            Previous Rejection
                          </h4>
                          <p className="text-sm text-foreground/80">
                            {selectedDocument.rejection_reason}
                          </p>
                        </div>
                      )}

                    {/* Review Actions */}
                    {selectedDocument.verification_status !== 'verified' && (
                      <div className="space-y-4 pt-2">
                        <h4 className="text-sm font-semibold text-foreground">Review Decision</h4>

                        <div className="grid grid-cols-3 gap-2">
                          <button
                            className={cn(
                              'flex flex-col items-center justify-center p-4 rounded-xl border transition-all touch-manipulation',
                              reviewAction === 'approved'
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
                            )}
                            onClick={() => setReviewAction('approved')}
                          >
                            <Check className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">Approve</span>
                          </button>
                          <button
                            className={cn(
                              'flex flex-col items-center justify-center p-4 rounded-xl border transition-all touch-manipulation',
                              reviewAction === 'rejected'
                                ? 'bg-red-500 border-red-500 text-white'
                                : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                            )}
                            onClick={() => setReviewAction('rejected')}
                          >
                            <X className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">Reject</span>
                          </button>
                          <button
                            className={cn(
                              'flex flex-col items-center justify-center p-4 rounded-xl border transition-all touch-manipulation',
                              reviewAction === 'request_reupload'
                                ? 'bg-amber-500 border-amber-500 text-white'
                                : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                            )}
                            onClick={() => setReviewAction('request_reupload')}
                          >
                            <RefreshCw className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">Re-upload</span>
                          </button>
                        </div>

                        {reviewAction && (
                          <div className="space-y-2">
                            <Label className="text-sm text-foreground/70">
                              {reviewAction === 'approved'
                                ? 'Notes (optional)'
                                : 'Reason (required for rejection)'}
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
                              className="bg-card/50 border-white/20 min-h-[80px] text-base touch-manipulation"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Already verified message */}
                    {selectedDocument.verification_status === 'verified' && (
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
                        <CheckCircle2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <p className="font-medium text-green-400">Document Verified</p>
                        {selectedDocument.reviewed_at && (
                          <p className="text-xs text-foreground/60 mt-1">
                            Reviewed {formatDistanceToNow(new Date(selectedDocument.reviewed_at))}{' '}
                            ago
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Fixed footer with action buttons */}
              {selectedDocument && selectedDocument.verification_status !== 'verified' && (
                <div className="flex-shrink-0 p-4 border-t border-white/10 bg-background">
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
                          className="h-12 touch-manipulation border-white/20 px-4"
                        >
                          Exit Queue
                        </Button>
                        <Button
                          variant="outline"
                          onClick={skipInQueue}
                          disabled={selectableDocs.length <= 1}
                          className="h-12 touch-manipulation border-white/20 px-4"
                        >
                          <SkipForward className="h-4 w-4 mr-1.5" />
                          Skip
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDocument(null)}
                        className="flex-1 h-12 touch-manipulation border-white/20"
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
                      className={cn(
                        'flex-1 h-12 touch-manipulation font-semibold',
                        reviewAction === 'approved' && 'bg-green-500 hover:bg-green-600',
                        reviewAction === 'rejected' && 'bg-red-500 hover:bg-red-600',
                        reviewAction === 'request_reupload' && 'bg-amber-500 hover:bg-amber-600',
                        !reviewAction && 'bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark'
                      )}
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
                            ? `Confirm ${reviewAction === 'request_reupload' ? 'Request' : reviewAction.charAt(0).toUpperCase() + reviewAction.slice(1)}`
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

        {/* Bulk Approve Dialog */}
        <AlertDialog open={showBulkApproveDialog} onOpenChange={setShowBulkApproveDialog}>
          <AlertDialogContent className="bg-background border-white/20">
            <AlertDialogHeader>
              <AlertDialogTitle>Approve {selectedIds.size} Documents?</AlertDialogTitle>
              <AlertDialogDescription>
                This will mark {selectedIds.size} documents as verified. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation"
                disabled={bulkApproveMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-green-500 hover:bg-green-600"
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
                    Approve All
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Bulk Reject Dialog */}
        <AlertDialog open={showBulkRejectDialog} onOpenChange={setShowBulkRejectDialog}>
          <AlertDialogContent className="bg-background border-white/20">
            <AlertDialogHeader>
              <AlertDialogTitle>Reject {selectedIds.size} Documents?</AlertDialogTitle>
              <AlertDialogDescription>
                Please provide a reason for rejection. This will be sent to all users.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Textarea
              value={bulkRejectReason}
              onChange={(e) => setBulkRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="min-h-[100px] bg-card/50 border-white/20"
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation"
                disabled={bulkRejectMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
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
                    Reject All
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PullToRefresh>
  );
}
