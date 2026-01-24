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
  Upload,
  CheckSquare,
  Loader2,
  Users,
  Archive,
  ArrowLeft,
  MoreVertical,
  ChevronRight,
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
import { ExportToEICDialog } from '@/components/ExportToEICDialog';
import { ExportToEICRDialog } from '@/components/ExportToEICRDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useCustomers } from '@/hooks/useCustomers';
import { linkCustomerToReport } from '@/utils/customerHelper';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
// SegmentedControl removed - replaced with scrollable filter chips
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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNewCertSheet, setShowNewCertSheet] = useState(false);

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

  // Filter chip options defined inline in the JSX

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

  // Download PDF handler (replaces preview - viewer was unreliable)
  const handleDownloadPdf = async (reportId: string) => {
    setActionSheetOpen(false);

    toast({
      title: 'Preparing PDF',
      description: 'Generating certificate PDF for download...',
    });

    try {
      const { generateBulkPDFs } = await import('@/utils/bulkPdfExport');
      const result = await generateBulkPDFs([reportId], user?.id || '', {
        onProgress: () => {},
      });

      if (result.successful > 0) {
        toast({
          title: 'Download Complete',
          description: 'Your PDF has been downloaded.',
        });
      } else {
        throw new Error('PDF generation failed');
      }
    } catch (error: any) {
      toast({
        title: 'Download Failed',
        description: error?.message || 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      });
    }
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
        {/* Header - Simplified Native App Style */}
        <header className="sticky top-0 z-50 bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/80 border-b border-elec-yellow/20">
          <div className="flex items-center h-14 px-3">
            {/* Back */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="-ml-2 text-white/60 touch-manipulation"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            {/* Title */}
            <div className="flex-1 ml-2">
              <h1 className="text-base font-semibold text-white">My Certificates</h1>
              <p className="text-xs text-white/50">
                {totalCount} certificate{totalCount !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                navigator.vibrate?.(10);
                setShowSearch(!showSearch);
              }}
              className={cn(
                "touch-manipulation",
                showSearch ? "text-elec-yellow" : "text-white/60"
              )}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Overflow Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/60 touch-manipulation">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => {
                    navigator.vibrate?.(10);
                    toggleBulkMode();
                  }}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  {isBulkMode ? 'Cancel Selection' : 'Select Multiple'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    navigator.vibrate?.(10);
                    setShowImportDialog(true);
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.vibrate?.(10);
                    navigate('/electrician/inspection-testing/legacy-certificates');
                  }}
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Legacy PDFs
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5">
                  <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* New Certificate */}
            <Button
              size="icon"
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black h-9 w-9 rounded-full ml-1 touch-manipulation"
              onClick={() => {
                navigator.vibrate?.(10);
                setShowNewCertSheet(true);
              }}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Collapsible Search */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-3 pb-3 overflow-hidden"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Search by name, address, or certificate..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-white/5 border-elec-yellow/20 text-base touch-manipulation"
                    autoFocus
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 touch-manipulation"
                      onClick={() => {
                        navigator.vibrate?.(10);
                        setSearchQuery('');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Chips - Single Scrollable Row */}
          <div className="flex gap-2 px-3 py-2 overflow-x-auto scrollbar-hide border-t border-elec-yellow/10">
            {/* Status chips */}
            {[
              { value: 'all' as StatusFilter, label: 'All', count: statusCounts.all },
              { value: 'draft' as StatusFilter, label: 'Drafts', count: statusCounts.draft },
              { value: 'in-progress' as StatusFilter, label: 'Progress', count: statusCounts['in-progress'] },
              { value: 'completed' as StatusFilter, label: 'Done', count: statusCounts.completed },
            ].map(({ value, label, count }) => (
              <button
                key={value}
                onClick={() => {
                  navigator.vibrate?.(10);
                  setStatusFilter(value);
                }}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all touch-manipulation",
                  statusFilter === value
                    ? "bg-elec-yellow text-black border-elec-yellow"
                    : "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 active:bg-elec-yellow/20"
                )}
              >
                {label} {count > 0 && <span className="ml-1 opacity-70">{count}</span>}
              </button>
            ))}

            {/* Divider */}
            <div className="w-px bg-elec-yellow/20 mx-1 self-stretch flex-shrink-0" />

            {/* Type chips */}
            {[
              { value: 'all' as TypeFilter, label: 'All Types' },
              { value: 'eicr' as TypeFilter, label: 'EICR' },
              { value: 'eic' as TypeFilter, label: 'EIC' },
              { value: 'minor-works' as TypeFilter, label: 'MW' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => {
                  navigator.vibrate?.(10);
                  setTypeFilter(value);
                }}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all touch-manipulation",
                  typeFilter === value
                    ? "bg-elec-yellow text-black border-elec-yellow"
                    : "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 active:bg-elec-yellow/20"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Bulk Actions Bar */}
          {isBulkMode && selectedReports.size > 0 && (
            <div className="px-3 pb-3">
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
        </header>

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

        {/* FAB removed - using header + button instead */}
      </div>

      {/* New Certificate Bottom Sheet */}
      <Sheet open={showNewCertSheet} onOpenChange={setShowNewCertSheet}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl">
          <SheetHeader className="pb-4">
            <SheetTitle>New Certificate</SheetTitle>
          </SheetHeader>
          <div className="space-y-2 pb-6">
            {[
              { type: 'eicr', label: 'EICR', desc: 'Electrical Installation Condition Report' },
              { type: 'eic', label: 'EIC', desc: 'Electrical Installation Certificate' },
              { type: 'minor-works', label: 'Minor Works', desc: 'Minor Electrical Installation Works' },
            ].map(({ type, label, desc }) => (
              <button
                key={type}
                onClick={() => {
                  navigator.vibrate?.(10);
                  setShowNewCertSheet(false);
                  onNavigate(type);
                }}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-elec-yellow/5 border border-elec-yellow/20 hover:bg-elec-yellow/10 active:scale-[0.98] transition-all touch-manipulation"
              >
                <div className="w-12 h-12 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-elec-yellow" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white">{label}</p>
                  <p className="text-xs text-white/50">{desc}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-elec-yellow/40" />
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

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
            handleDownloadPdf(selectedCertificate.report_id);
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
