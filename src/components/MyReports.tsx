import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  FileText,
  Plus,
  X,
  ChevronDown,
  Upload,
  CheckSquare,
  Loader2,
  Users,
  Archive,
  ArrowLeft,
} from 'lucide-react';
import { SortDropdown, SortOption } from './reports/SortDropdown';
import { BulkActionsBar } from './reports/BulkActionsBar';
import { reportCloud, CloudReport, ReportsResponse } from '@/utils/reportCloud';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { CertificateImportDialog } from '@/components/certificates/CertificateImportDialog';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';
import { ExportToEICDialog } from '@/components/ExportToEICDialog';
import { ExportToEICRDialog } from '@/components/ExportToEICRDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useCustomers } from '@/hooks/useCustomers';
import { linkCustomerToReport } from '@/utils/customerHelper';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { SegmentedControl, SegmentOption } from './certificates/SegmentedControl';
import { CertificateCard, CertificateData } from './certificates/CertificateCard';
import { CertificateActionSheet } from './certificates/CertificateActionSheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

interface MyReportsProps {
  onBack: () => void;
  onNavigate: (section: string) => void;
  onEditReport: (reportId: string, reportType?: string) => void;
}

type StatusFilter = 'all' | 'draft' | 'in-progress' | 'completed';
type TypeFilter = 'all' | 'eicr' | 'eic' | 'minor-works';

const MyReports: React.FC<MyReportsProps> = ({ onBack, onNavigate, onEditReport }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<CloudReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allReports, setAllReports] = useState<CloudReport[]>([]);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Action sheet state
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<CloudReport | null>(null);

  // Customer linking state
  const [linkCustomerDialogOpen, setLinkCustomerDialogOpen] = useState(false);
  const [reportToLink, setReportToLink] = useState<CloudReport | null>(null);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  // Export to EIC state
  const [exportToEICDialogOpen, setExportToEICDialogOpen] = useState(false);
  const [exportToEICReportId, setExportToEICReportId] = useState<string | null>(null);

  // Export to EICR state (EIC → EICR conversion)
  const [exportToEICRDialogOpen, setExportToEICRDialogOpen] = useState(false);
  const [exportToEICRReportId, setExportToEICRReportId] = useState<string | null>(null);

  // Get customers for linking
  const { customers, isLoading: isLoadingCustomers } = useCustomers();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const {
    data: reportsData,
    isLoading: isLoadingReports,
    refetch: refetchReports,
  } = useQuery<ReportsResponse>({
    queryKey: ['my-reports', user?.id, currentPage],
    queryFn: async () => {
      if (!user) {
        return { reports: [], totalCount: 0, hasMore: false };
      }
      const result = await reportCloud.getUserReports(user.id, {
        page: currentPage,
        pageSize: 20,
      });
      return result;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (reportsData?.reports) {
      if (currentPage === 1) {
        setAllReports(reportsData.reports);
      } else {
        setAllReports((prev) => [...prev, ...reportsData.reports]);
      }
    }
  }, [reportsData, currentPage]);

  const reports = allReports;
  const hasMore = reportsData?.hasMore || false;
  const totalCount = reportsData?.totalCount || 0;

  // Calculate status counts for segmented control
  const statusCounts = useMemo(() => {
    return {
      all: reports.length,
      draft: reports.filter((r) => r.status === 'draft').length,
      'in-progress': reports.filter((r) => r.status === 'in-progress').length,
      completed: reports.filter((r) => r.status === 'completed').length,
    };
  }, [reports]);

  // Status filter options
  const statusOptions: SegmentOption<StatusFilter>[] = [
    { value: 'all', label: 'All', count: statusCounts.all },
    { value: 'draft', label: 'Drafts', count: statusCounts.draft },
    { value: 'in-progress', label: 'Progress', count: statusCounts['in-progress'] },
    { value: 'completed', label: 'Done', count: statusCounts.completed },
  ];

  // Type filter options
  const typeOptions: SegmentOption<TypeFilter>[] = [
    { value: 'all', label: 'All Types' },
    { value: 'eicr', label: 'EICR' },
    { value: 'eic', label: 'EIC' },
    { value: 'minor-works', label: 'Minor Works' },
  ];

  const filteredReports = useMemo(() => {
    let filtered = reports;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report.report_id.toLowerCase().includes(query) ||
          report.client_name?.toLowerCase().includes(query) ||
          report.installation_address?.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((report) => report.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((report) => report.report_type === typeFilter);
    }

    return filtered;
  }, [reports, searchQuery, statusFilter, typeFilter]);

  const sortedReports = useMemo(() => {
    const sorted = [...filteredReports];

    switch (sortBy) {
      case 'date-desc':
        return sorted.sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case 'date-asc':
        return sorted.sort(
          (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        );
      case 'cert-asc':
        return sorted.sort((a, b) => a.report_id.localeCompare(b.report_id));
      case 'cert-desc':
        return sorted.sort((a, b) => b.report_id.localeCompare(a.report_id));
      case 'client-asc':
        return sorted.sort((a, b) =>
          (a.client_name || '').localeCompare(b.client_name || '')
        );
      case 'client-desc':
        return sorted.sort((a, b) =>
          (b.client_name || '').localeCompare(a.client_name || '')
        );
      case 'status':
        const statusOrder = { draft: 0, 'in-progress': 1, completed: 2 };
        return sorted.sort(
          (a, b) =>
            (statusOrder[a.status as keyof typeof statusOrder] || 999) -
            (statusOrder[b.status as keyof typeof statusOrder] || 999)
        );
      default:
        return sorted;
    }
  }, [filteredReports, sortBy]);

  // Convert CloudReport to CertificateData for the card
  const toCertificateData = (report: CloudReport): CertificateData => ({
    id: report.report_id,
    reportType: report.report_type,
    clientName: report.client_name || undefined,
    installationAddress: report.installation_address || undefined,
    inspectionDate: report.data?.inspectionDate || report.data?.dateOfInspection || undefined,
    status: report.status,
    lastModified: new Date(report.updated_at).getTime(),
    customerId: report.customer_id,
    canExportToEICR:
      report.report_type === 'eic' &&
      (report.status === 'completed' || report.status === 'in-progress'),
    canExportToEIC:
      report.report_type === 'eicr' &&
      report.status === 'completed' &&
      report.data?.satisfactoryForContinuedUse?.toLowerCase() === 'yes',
  });

  // Pull-to-refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      setCurrentPage(1);
      await refetchReports();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetchReports]);

  // Certificate card tap handler - opens action sheet
  const handleCardTap = (report: CloudReport) => {
    setSelectedCertificate(report);
    setActionSheetOpen(true);
  };

  // Delete handlers
  const handleDeleteReport = (reportId: string) => {
    const report = reports.find((r) => r.report_id === reportId);
    if (report) {
      setReportToDelete(report);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!reportToDelete || !user) return;

    setIsDeleting(true);
    const reportIdToDelete = reportToDelete.report_id;
    setAllReports((prev) => prev.filter((r) => r.report_id !== reportIdToDelete));
    setDeleteDialogOpen(false);
    setReportToDelete(null);
    setActionSheetOpen(false);

    try {
      const result = await reportCloud.softDeleteReport(reportIdToDelete, user.id);

      if (!result.success) {
        refetchReports();
        toast({
          title: 'Delete failed',
          description: result.error?.message || 'Failed to delete the report.',
          variant: 'destructive',
        });
        return;
      }

      refetchReports();
      toast({
        title: 'Certificate deleted',
        description: 'Certificate has been removed successfully.',
      });
    } catch (error: any) {
      refetchReports();
      toast({
        title: 'Delete failed',
        description: error?.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Customer linking
  const handleLinkCustomer = (reportId: string) => {
    const report = reports.find((r) => r.report_id === reportId);
    if (report) {
      setReportToLink(report);
      setCustomerSearchQuery('');
      setLinkCustomerDialogOpen(true);
      setActionSheetOpen(false);
    }
  };

  const confirmLinkCustomer = async (customerId: string) => {
    if (!reportToLink || !user) return;

    setIsLinking(true);

    try {
      const result = await linkCustomerToReport(reportToLink.report_id, customerId);

      if (result.success) {
        setAllReports((prev) =>
          prev.map((r) =>
            r.report_id === reportToLink.report_id ? { ...r, customer_id: customerId } : r
          )
        );

        const customer = customers.find((c) => c.id === customerId);
        toast({
          title: 'Customer linked',
          description: `Certificate linked to ${customer?.name || 'customer'} successfully.`,
        });

        setLinkCustomerDialogOpen(false);
        setReportToLink(null);
      } else {
        toast({
          title: 'Link failed',
          description: 'Failed to link customer to certificate.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Link failed',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLinking(false);
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!customerSearchQuery.trim()) return customers;
    const query = customerSearchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query) ||
        c.address?.toLowerCase().includes(query)
    );
  }, [customers, customerSearchQuery]);

  // Export handlers
  const handleExportToEIC = (reportId: string) => {
    setExportToEICReportId(reportId);
    setExportToEICDialogOpen(true);
    setActionSheetOpen(false);
  };

  const handleExportToEICComplete = (eicReportId: string) => {
    refetchReports();
    navigate(`/electrician/inspection-testing?section=eic&reportId=${eicReportId}`);
  };

  const handleExportToEICR = (reportId: string) => {
    setExportToEICRReportId(reportId);
    setExportToEICRDialogOpen(true);
    setActionSheetOpen(false);
  };

  const handleExportToEICRComplete = (eicrReportId: string) => {
    refetchReports();
    navigate(`/electrician/inspection-testing?section=eicr&reportId=${eicrReportId}`);
  };

  // Preview handler
  const handlePreviewReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setShowPdfViewer(true);
    setActionSheetOpen(false);
  };

  // Bulk mode handlers
  const handleSelectToggle = (id: string) => {
    setSelectedReports((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
    setSelectedReports(new Set());
  };

  const handleBulkDelete = async () => {
    if (!user || selectedReports.size === 0) return;

    setIsDeleting(true);
    const reportsToDelete = Array.from(selectedReports);
    setAllReports((prev) => prev.filter((r) => !reportsToDelete.includes(r.report_id)));
    setShowBulkDeleteDialog(false);

    try {
      const results = await Promise.all(
        reportsToDelete.map((id) => reportCloud.softDeleteReport(id, user.id))
      );

      const successCount = results.filter((r) => r.success).length;
      const failCount = results.filter((r) => !r.success).length;

      if (successCount > 0) {
        refetchReports();
        toast({
          title: 'Success',
          description: `${successCount} certificate${successCount > 1 ? 's' : ''} deleted${
            failCount > 0 ? `. ${failCount} failed.` : ''
          }`,
        });
      }

      if (failCount > 0) {
        refetchReports();
        toast({
          title: failCount === reportsToDelete.length ? 'All deletions failed' : 'Partial failure',
          description: 'Some certificates could not be deleted.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      refetchReports();
      toast({
        title: 'Error',
        description: error?.message || 'Failed to delete certificates',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setSelectedReports(new Set());
      setIsBulkMode(false);
    }
  };

  const handleBulkStatusChange = async (newStatus: 'draft' | 'in-progress' | 'completed') => {
    if (!user || selectedReports.size === 0) return;

    try {
      const { error } = await supabase
        .from('reports')
        .update({ status: newStatus })
        .in(
          'id',
          Array.from(selectedReports)
            .map((reportId) => {
              const report = reports.find((r) => r.report_id === reportId);
              return report?.id;
            })
            .filter(Boolean)
        )
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `${selectedReports.size} certificate${
          selectedReports.size > 1 ? 's' : ''
        } updated to ${newStatus}`,
      });

      refetchReports();
      setSelectedReports(new Set());
      setIsBulkMode(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update certificate status',
        variant: 'destructive',
      });
    }
  };

  const handleBulkExport = async () => {
    if (!user || selectedReports.size === 0) return;

    setIsExporting(true);
    const reportCount = selectedReports.size;
    const willUseZip = reportCount >= 5;

    toast({
      title: 'Export Started',
      description: willUseZip
        ? `Preparing ${reportCount} PDFs for download as a ZIP archive...`
        : `Preparing ${reportCount} PDF${reportCount > 1 ? 's' : ''} for download...`,
    });

    try {
      const reportIds = Array.from(selectedReports);
      const { generateBulkPDFs } = await import('@/utils/bulkPdfExport');

      const result = await generateBulkPDFs(reportIds, user.id, {
        onProgress: () => {},
      });

      if (result.successful > 0) {
        toast({
          title: 'Export Complete',
          description: willUseZip
            ? `ZIP archive with ${result.successful} PDF${result.successful > 1 ? 's' : ''} ready`
            : `${result.successful} PDF${result.successful > 1 ? 's' : ''} downloaded`,
        });
      }

      if (result.failed > 0) {
        toast({
          title: result.successful === 0 ? 'Export Failed' : 'Partial Export',
          description: `${result.failed} certificate${result.failed > 1 ? 's' : ''} could not be exported.`,
          variant: 'destructive',
        });
      }

      setSelectedReports(new Set());
      setIsBulkMode(false);
    } catch (error: any) {
      toast({
        title: 'Export Failed',
        description: error?.message || 'An error occurred during bulk export',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeselectAll = () => {
    setSelectedReports(new Set());
  };

  // Loading state
  if (!user || isLoadingReports) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-8">
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-10 w-10 touch-manipulation"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">My Certificates</h1>
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground pb-24 prevent-shortcuts">
        {/* Header */}
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4">
            {/* Title Row */}
            <div className="flex items-center justify-between py-3 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="h-10 w-10 touch-manipulation flex-shrink-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="min-w-0">
                  <h1 className="text-lg font-semibold truncate">My Certificates</h1>
                  <p className="text-xs text-muted-foreground">
                    {reports.length} certificate{reports.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  onClick={() => {
                    navigator.vibrate?.(10);
                    toggleBulkMode();
                  }}
                  variant={isBulkMode ? 'default' : 'outline'}
                  size="sm"
                  className="h-10 touch-manipulation"
                >
                  {isBulkMode ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <CheckSquare className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline ml-2">
                    {isBulkMode ? 'Cancel' : 'Select'}
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-neutral-900 font-semibold h-10 touch-manipulation">
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">New</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        onNavigate('eicr');
                        navigator.vibrate?.(10);
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      EICR
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        onNavigate('eic');
                        navigator.vibrate?.(10);
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      EIC
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        onNavigate('minor-works');
                        navigator.vibrate?.(10);
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Minor Works
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Search Row */}
            <div className="flex items-center gap-3 pb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search certificates..."
                  inputMode="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-10 h-11 bg-card/50 border-border text-foreground placeholder:text-muted-foreground text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      navigator.vibrate?.(10);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {/* iOS-Style Segmented Controls */}
            <div className="space-y-2 pb-3">
              {/* Status Segment */}
              <SegmentedControl
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                showCounts
              />

              {/* Type Segment */}
              <SegmentedControl
                options={typeOptions}
                value={typeFilter}
                onChange={setTypeFilter}
              />
            </div>

            {/* Quick Actions - Compact */}
            <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.vibrate?.(10);
                  setShowImportDialog(true);
                }}
                className="h-9 touch-manipulation flex-shrink-0 text-xs"
              >
                <Upload className="h-3.5 w-3.5 mr-1.5" />
                Import CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.vibrate?.(10);
                  navigate('/electrician/inspection-testing/legacy-certificates');
                }}
                className="h-9 touch-manipulation flex-shrink-0 text-xs"
              >
                <Archive className="h-3.5 w-3.5 mr-1.5" />
                Legacy PDFs
              </Button>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {isBulkMode && selectedReports.size > 0 && (
            <div className="max-w-7xl mx-auto px-4 pb-3">
              <BulkActionsBar
                selectedCount={selectedReports.size}
                onBulkDelete={() => setShowBulkDeleteDialog(true)}
                onBulkStatusChange={handleBulkStatusChange}
                onBulkExport={handleBulkExport}
                onDeselectAll={handleDeselectAll}
                isExporting={isExporting}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefreshing}>
          <div className="max-w-7xl mx-auto px-4 py-4">
            {filteredReports.length === 0 ? (
              searchQuery || statusFilter !== 'all' || typeFilter !== 'all' ? (
                <EmptyState
                  icon={Search}
                  title="No certificates found"
                  description="Try adjusting your search or filter criteria."
                  secondaryAction={{
                    label: 'Clear Filters',
                    onClick: () => {
                      setSearchQuery('');
                      setStatusFilter('all');
                      setTypeFilter('all');
                    },
                  }}
                />
              ) : (
                <EmptyState
                  icon={FileText}
                  title="No certificates yet"
                  description="Get started by creating your first certificate."
                  action={{
                    label: 'Create Certificate',
                    onClick: () => onNavigate('eicr'),
                  }}
                />
              )
            ) : (
              <div className="space-y-3">
                {sortedReports.map((report) => (
                  <CertificateCard
                    key={report.report_id}
                    certificate={toCertificateData(report)}
                    onTap={() => handleCardTap(report)}
                    onDelete={() => handleDeleteReport(report.report_id)}
                    onEdit={() => {
                      navigator.vibrate?.(10);
                      onEditReport(report.report_id, report.report_type);
                    }}
                    onConvert={
                      report.report_type === 'eic'
                        ? () => handleExportToEICR(report.report_id)
                        : undefined
                    }
                    isBulkMode={isBulkMode}
                    isSelected={selectedReports.has(report.report_id)}
                    onSelectToggle={() => handleSelectToggle(report.report_id)}
                  />
                ))}

                {/* Load More */}
                {hasMore && (
                  <div className="py-4 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="h-11 touch-manipulation"
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </PullToRefresh>

        {/* Mobile FAB */}
        {filteredReports.length > 0 && !isBulkMode && (
          <div className="fixed bottom-20 right-4 lg:hidden z-40">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  className="h-14 w-14 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-neutral-900 shadow-lg shadow-elec-yellow/30"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="mb-2">
                <DropdownMenuItem
                  onClick={() => {
                    onNavigate('eicr');
                    navigator.vibrate?.(10);
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  EICR
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onNavigate('eic');
                    navigator.vibrate?.(10);
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  EIC
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onNavigate('minor-works');
                    navigator.vibrate?.(10);
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Minor Works
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Certificate Action Sheet */}
      <CertificateActionSheet
        open={actionSheetOpen}
        onOpenChange={setActionSheetOpen}
        certificate={
          selectedCertificate
            ? {
                id: selectedCertificate.report_id,
                reportType: selectedCertificate.report_type,
                clientName: selectedCertificate.client_name || undefined,
                hasCustomer: !!selectedCertificate.customer_id,
                canExportToEICR:
                  selectedCertificate.report_type === 'eic' &&
                  (selectedCertificate.status === 'completed' ||
                    selectedCertificate.status === 'in-progress'),
                canExportToEIC:
                  selectedCertificate.report_type === 'eicr' &&
                  selectedCertificate.status === 'completed' &&
                  selectedCertificate.data?.satisfactoryForContinuedUse?.toLowerCase() === 'yes',
              }
            : null
        }
        onEdit={() => {
          if (selectedCertificate) {
            navigator.vibrate?.(10);
            onEditReport(selectedCertificate.report_id, selectedCertificate.report_type);
            setActionSheetOpen(false);
          }
        }}
        onPreview={() => {
          if (selectedCertificate) {
            handlePreviewReport(selectedCertificate.report_id);
          }
        }}
        onConvertToEICR={() => {
          if (selectedCertificate) {
            handleExportToEICR(selectedCertificate.report_id);
          }
        }}
        onExportToEIC={() => {
          if (selectedCertificate) {
            handleExportToEIC(selectedCertificate.report_id);
          }
        }}
        onLinkCustomer={() => {
          if (selectedCertificate) {
            handleLinkCustomer(selectedCertificate.report_id);
          }
        }}
        onDelete={() => {
          if (selectedCertificate) {
            handleDeleteReport(selectedCertificate.report_id);
          }
        }}
      />

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certificate</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this certificate? It will be removed from all
              your devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                navigator.vibrate?.(100);
                confirmDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Dialog */}
      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selectedReports.size} Certificate{selectedReports.size > 1 ? 's' : ''}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedReports.size} certificate
              {selectedReports.size > 1 ? 's' : ''}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                navigator.vibrate?.(100);
                handleBulkDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete All'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Import Dialog */}
      <CertificateImportDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImportComplete={() => {
          refetchReports();
          setShowImportDialog(false);
        }}
      />

      {/* Link Customer Dialog */}
      <Dialog open={linkCustomerDialogOpen} onOpenChange={setLinkCustomerDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              Link to Customer
            </DialogTitle>
            <DialogDescription>
              {reportToLink && (
                <>
                  Link certificate{' '}
                  <span className="font-mono text-elec-yellow">{reportToLink.report_id}</span> to
                  a customer
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <Command className="border rounded-lg">
            <CommandInput
              placeholder="Search customers..."
              value={customerSearchQuery}
              onValueChange={setCustomerSearchQuery}
            />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>
                <div className="py-6 text-center">
                  <Users className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {isLoadingCustomers ? 'Loading customers...' : 'No customers found'}
                  </p>
                </div>
              </CommandEmpty>
              <CommandGroup heading="Your Customers">
                {filteredCustomers.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={customer.name}
                    onSelect={() => confirmLinkCustomer(customer.id)}
                    className="cursor-pointer"
                    disabled={isLinking}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{customer.name}</p>
                        {customer.address && (
                          <p className="text-xs text-muted-foreground truncate">
                            {customer.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>

          {isLinking && (
            <div className="flex items-center justify-center gap-2 py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">Linking...</span>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* PDF Viewer */}
      {selectedReportId && (
        <ReportPdfViewer
          reportId={selectedReportId}
          open={showPdfViewer}
          onOpenChange={setShowPdfViewer}
        />
      )}

      {/* Export EICR to EIC Dialog */}
      {exportToEICReportId && (
        <ExportToEICDialog
          open={exportToEICDialogOpen}
          onOpenChange={setExportToEICDialogOpen}
          reportId={exportToEICReportId}
          onExportComplete={handleExportToEICComplete}
        />
      )}

      {/* Export EIC to EICR Dialog */}
      {exportToEICRReportId && (
        <ExportToEICRDialog
          open={exportToEICRDialogOpen}
          onOpenChange={setExportToEICRDialogOpen}
          reportId={exportToEICRReportId}
          onExportComplete={handleExportToEICRComplete}
        />
      )}
    </>
  );
};

export default MyReports;
