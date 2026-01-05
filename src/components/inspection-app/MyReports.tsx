import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Plus, X, ChevronDown, Upload, CheckSquare, Loader2 } from 'lucide-react';
import { SortDropdown, SortOption } from './reports/SortDropdown';
import { BulkActionsBar } from './reports/BulkActionsBar';
import { reportCloud, CloudReport, ReportsResponse } from '@/utils/reportCloud';
import { useToast } from '@/hooks/use-toast';
import ReportCard from './ReportCard';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '@/components/ui/page-header';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { CertificateImportDialog } from '@/components/certificates/CertificateImportDialog';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';
import { Skeleton } from '@/components/ui/skeleton';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MyReportsProps {
  onBack: () => void;
  onNavigate: (section: string) => void;
  onEditReport: (reportId: string, reportType?: string) => void;
}

const MyReports: React.FC<MyReportsProps> = ({ onBack, onNavigate, onEditReport }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<CloudReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allReports, setAllReports] = useState<CloudReport[]>([]);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportTotal, setExportTotal] = useState(0);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: reportsData, isLoading: isLoadingReports, refetch: refetchReports } = useQuery<ReportsResponse>({
    queryKey: ['my-reports', user?.id, currentPage],
    queryFn: async () => {
      if (!user) {
        return { reports: [], totalCount: 0, hasMore: false };
      }
      const result = await reportCloud.getUserReports(user.id, { page: currentPage, pageSize: 20 });
      return result;
    },
    enabled: !!user,
  });

  // Accumulate reports as we load more pages
  useEffect(() => {
    if (reportsData?.reports) {
      if (currentPage === 1) {
        setAllReports(reportsData.reports);
      } else {
        setAllReports(prev => [...prev, ...reportsData.reports]);
      }
    }
  }, [reportsData, currentPage]);

  const reports = allReports;
  const hasMore = reportsData?.hasMore || false;
  const totalCount = reportsData?.totalCount || 0;

  // Use useMemo to compute filtered reports efficiently without infinite loops
  const filteredReports = useMemo(() => {
    let filtered = reports;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(report =>
        report.report_id.toLowerCase().includes(query) ||
        report.client_name?.toLowerCase().includes(query) ||
        report.installation_address?.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.report_type === typeFilter);
    }

    return filtered;
  }, [reports, searchQuery, statusFilter, typeFilter]);

  const sortedReports = useMemo(() => {
    const sorted = [...filteredReports];
    
    switch (sortBy) {
      case 'date-desc':
        return sorted.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case 'date-asc':
        return sorted.sort((a, b) => 
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        );
      case 'cert-asc':
        return sorted.sort((a, b) => 
          a.report_id.localeCompare(b.report_id)
        );
      case 'cert-desc':
        return sorted.sort((a, b) => 
          b.report_id.localeCompare(a.report_id)
        );
      case 'client-asc':
        return sorted.sort((a, b) => 
          (a.client_name || '').localeCompare(b.client_name || '')
        );
      case 'client-desc':
        return sorted.sort((a, b) => 
          (b.client_name || '').localeCompare(a.client_name || '')
        );
      case 'modified-desc':
        return sorted.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case 'modified-asc':
        return sorted.sort((a, b) => 
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        );
      case 'status':
        const statusOrder = { 'draft': 0, 'in-progress': 1, 'completed': 2 };
        return sorted.sort((a, b) => 
          (statusOrder[a.status as keyof typeof statusOrder] || 999) - 
          (statusOrder[b.status as keyof typeof statusOrder] || 999)
        );
      default:
        return sorted;
    }
  }, [filteredReports, sortBy]);

  const handleDeleteReport = (reportId: string) => {
    const report = reports.find(r => r.report_id === reportId);
    if (report) {
      setReportToDelete(report);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!reportToDelete || !user) return;
    
    setIsDeleting(true);
    
    // Optimistic UI: remove from local state immediately
    const reportIdToDelete = reportToDelete.report_id;
    setAllReports(prev => prev.filter(r => r.report_id !== reportIdToDelete));
    setDeleteDialogOpen(false);
    setReportToDelete(null);
    
    try {
      const result = await reportCloud.softDeleteReport(reportIdToDelete, user.id);
      
      if (!result.success) {
        // Detailed error information
        const error = result.error;
        const errorDetails = [];
        
        if (error?.code) errorDetails.push(`Code: ${error.code}`);
        if (error?.message) errorDetails.push(error.message);
        if (error?.details) errorDetails.push(`Details: ${error.details}`);
        if (error?.hint) errorDetails.push(`Hint: ${error.hint}`);
        
        const errorMessage = errorDetails.length > 0 
          ? errorDetails.join(' | ') 
          : 'Failed to delete the report. Please try again.';
        
        
        // Revert optimistic update
        refetchReports();
        
        toast({
          title: 'Delete failed',
          description: errorMessage,
          variant: 'destructive',
        });
        return;
      }

      
      // Sync with server to ensure consistency
      refetchReports();
      
      toast({
        title: 'Report deleted',
        description: 'Report has been removed successfully.',
      });
    } catch (error: any) {
      
      // Revert optimistic update
      refetchReports();
      
      const errorMessage = error?.message || 'An unexpected error occurred. Please try again.';
      toast({
        title: 'Delete failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSelectToggle = (id: string) => {
    setSelectedReports(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleBulkDelete = async () => {
    if (!user || selectedReports.size === 0) return;

    setIsDeleting(true);
    const reportsToDelete = Array.from(selectedReports);
    
    // Optimistic UI: remove from local state immediately
    setAllReports(prev => prev.filter(r => !reportsToDelete.includes(r.report_id)));
    setShowBulkDeleteDialog(false);
    
    try {
      const results = await Promise.all(
        reportsToDelete.map(id => reportCloud.softDeleteReport(id, user.id))
      );
      
      const successCount = results.filter(r => r.success).length;
      const failCount = results.filter(r => !r.success).length;
      const failures = results.filter(r => !r.success);

      if (successCount > 0) {
        
        // Sync with server
        refetchReports();
        
        toast({
          title: 'Success',
          description: `${successCount} certificate${successCount > 1 ? 's' : ''} deleted successfully${failCount > 0 ? `. ${failCount} failed.` : ''}`,
        });
      }
      
      if (failCount > 0) {
        // Revert optimistic update on failure
        refetchReports();
        
        // Show detailed error for first failure
        const firstError = failures[0]?.error;
        const errorMsg = firstError?.message || 'Failed to delete some certificates';
        
        
        toast({
          title: failCount === reportsToDelete.length ? 'All deletions failed' : 'Partial failure',
          description: errorMsg,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      
      // Revert optimistic update
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
        .in('id', Array.from(selectedReports).map(reportId => {
          const report = reports.find(r => r.report_id === reportId);
          return report?.id;
        }).filter(Boolean))
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `${selectedReports.size} certificate${selectedReports.size > 1 ? 's' : ''} updated to ${newStatus}`,
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
    setExportProgress(0);
    setExportTotal(selectedReports.size);
    
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
      
      // Import the bulk export utility
      const { generateBulkPDFs } = await import('@/utils/bulkPdfExport');
      
      // Create progress callback to update UI
      const onProgress = (current: number, total: number, reportId: string) => {
        setExportProgress(current);
        
        if (current < total) {
          toast({
            title: 'Generating PDFs',
            description: willUseZip
              ? `Generated ${current} of ${total} PDFs for ZIP archive...`
              : `Downloaded ${current} of ${total} PDFs...`,
          });
        }
      };
      
      const result = await generateBulkPDFs(reportIds, user.id, { onProgress });
      
      // Add small delay to ensure toast queue processes
      await new Promise(resolve => setTimeout(resolve, 300));
      
      
      // Show final result
      if (result.successful > 0) {
        toast({
          title: 'Export Complete',
          description: willUseZip
            ? `ZIP archive with ${result.successful} PDF${result.successful > 1 ? 's' : ''} ready for download${result.failed > 0 ? `. ${result.failed} failed.` : ''}`
            : `${result.successful} PDF${result.successful > 1 ? 's' : ''} downloaded successfully${result.failed > 0 ? `. ${result.failed} failed.` : ''}`,
        });
      }
      
      if (result.failed > 0) {
        // Show detailed errors
        
        const errorMsg = result.failed === 1 
          ? `Failed to export: ${result.errors[0]}`
          : `${result.failed} certificate${result.failed > 1 ? 's' : ''} could not be exported. Common issues: missing address, client name, or inspector details.`;
        
        toast({
          title: result.successful === 0 ? 'Export Failed' : 'Partial Export',
          description: errorMsg,
          variant: 'destructive',
        });
      }
      
      // Deselect all after export
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
      setExportProgress(0);
      setExportTotal(0);
    }
  };

  const handleDeselectAll = () => {
    setSelectedReports(new Set());
  };

  const toggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
    setSelectedReports(new Set());
  };

  const handlePreviewReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setShowPdfViewer(true);
  };

  const getStatusCounts = () => {
    const counts = {
      all: reports.length,
      draft: reports.filter(r => r.status === 'draft').length,
      'in-progress': reports.filter(r => r.status === 'in-progress').length,
      completed: reports.filter(r => r.status === 'completed').length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (!user || isLoadingReports) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-8">
        <PageHeader
          title="My Certificates"
          subtitle={!user ? "Authenticating..." : `Loading certificates...`}
          icon={FileText}
          onBack={onBack}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground pb-8 prevent-shortcuts">
        <PageHeader
          title="My Certificates"
          subtitle={`${reports.length} certificate${reports.length !== 1 ? 's' : ''} • Tap to manage`}
          icon={FileText}
          onBack={onBack}
          actions={
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  navigator.vibrate?.(10);
                  toggleBulkMode();
                }}
                variant={isBulkMode ? "default" : "outline"}
                className="gap-2 h-11 sm:h-10"
              >
                {isBulkMode ? (
                  <>
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Cancel</span>
                  </>
                ) : (
                  <>
                    <CheckSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Select</span>
                  </>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-neutral-900 font-semibold h-11 sm:h-10 px-3 sm:px-4 text-sm sm:text-base">
                    <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                    New Certificate
                    <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => { onNavigate('eicr'); navigator.vibrate?.(10); }}>
                    <FileText className="h-4 w-4 mr-2" />
                    EICR
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { onNavigate('eic'); navigator.vibrate?.(10); }}>
                    <FileText className="h-4 w-4 mr-2" />
                    EIC
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { onNavigate('minor-works'); navigator.vibrate?.(10); }}>
                    <FileText className="h-4 w-4 mr-2" />
                    Minor Works
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          }
        />

        {/* Search Bar and Sort */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by ID, client, or address..."
                inputMode="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 h-12 bg-card/50 border-border text-foreground placeholder:text-neutral-500 focus:border-elec-yellow text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); navigator.vibrate?.(10); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            {searchQuery && (
              <Badge variant="outline" className="flex-shrink-0 text-elec-yellow border-elec-yellow/40 text-sm font-medium">
                {filteredReports.length} {filteredReports.length === 1 ? 'result' : 'results'}
              </Badge>
            )}
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {isBulkMode && selectedReports.size > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
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

        {/* Filter Badges */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
          <div className="overflow-x-auto scrollbar-hide pb-1">
            <div className="flex gap-2 min-w-max">
              {/* Status Filters */}
              <Badge 
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                className="cursor-pointer transition-colors px-3 py-2 text-sm min-h-[36px] min-w-[80px] justify-center"
                onClick={() => { navigator.vibrate?.(10); setStatusFilter('all'); }}
              >
                All {statusCounts.all}
              </Badge>
              <Badge 
                variant={statusFilter === 'draft' ? 'default' : 'outline'}
                className="cursor-pointer transition-colors px-3 py-2 text-sm min-h-[36px] min-w-[80px] justify-center"
                onClick={() => { navigator.vibrate?.(10); setStatusFilter('draft'); }}
              >
                Drafts {statusCounts.draft}
              </Badge>
              <Badge 
                variant={statusFilter === 'in-progress' ? 'default' : 'outline'}
                className="cursor-pointer transition-colors px-3 py-2 text-sm min-h-[36px] min-w-[80px] justify-center"
                onClick={() => { navigator.vibrate?.(10); setStatusFilter('in-progress'); }}
              >
                Progress {statusCounts['in-progress']}
              </Badge>
              <Badge 
                variant={statusFilter === 'completed' ? 'default' : 'outline'}
                className="cursor-pointer transition-colors px-3 py-2 text-sm min-h-[36px] min-w-[80px] justify-center"
                onClick={() => { navigator.vibrate?.(10); setStatusFilter('completed'); }}
              >
                Done {statusCounts.completed}
              </Badge>
              
              <div className="w-px bg-border mx-1" />
              
              {/* Type Filters */}
              <Badge 
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                className="cursor-pointer transition-colors px-3 py-2 text-sm min-h-[36px] min-w-[80px] justify-center"
                onClick={() => { navigator.vibrate?.(10); setTypeFilter('all'); }}
              >
                All Types
              </Badge>
              <Badge 
                variant={typeFilter === 'eicr' ? 'default' : 'outline'}
                className="cursor-pointer transition-colors px-3 py-2 text-sm min-h-[36px] min-w-[80px] justify-center"
                onClick={() => { navigator.vibrate?.(10); setTypeFilter('eicr'); }}
              >
                EICR
              </Badge>
              <Badge 
                variant={typeFilter === 'eic' ? 'default' : 'outline'}
                className="cursor-pointer transition-colors px-3 py-2 text-sm min-h-[36px] min-w-[80px] justify-center"
                onClick={() => { navigator.vibrate?.(10); setTypeFilter('eic'); }}
              >
                EIC
              </Badge>
              <Badge 
                variant={typeFilter === 'minor-works' ? 'default' : 'outline'}
                className="cursor-pointer transition-colors px-3 py-2 text-sm min-h-[36px] min-w-[80px] justify-center"
                onClick={() => { navigator.vibrate?.(10); setTypeFilter('minor-works'); }}
              >
                Minor Works
              </Badge>
            </div>
          </div>
        </div>

        {/* Reports Grid or Empty State */}
        {filteredReports.length === 0 ? (
          searchQuery || statusFilter !== 'all' || typeFilter !== 'all' ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <EmptyState
                icon={Search}
                title="No reports found"
                description="Try adjusting your search or filter criteria to find what you're looking for."
                secondaryAction={
                  searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                    ? {
                        label: 'Clear Filters',
                        onClick: () => {
                          setSearchQuery('');
                          setStatusFilter('all');
                          setTypeFilter('all');
                        }
                      }
                    : undefined
                }
              />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <EmptyState
                icon={FileText}
                title="No reports yet"
                description="Get started by creating your first EICR report. It only takes a few minutes to set up."
                action={{
                  label: 'Create First Certificate',
                  onClick: () => onNavigate('eicr'),
                }}
              />
            </div>
          )
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {sortedReports.map((report) => (
                <ReportCard
                  key={report.report_id}
                  metadata={{
                    id: report.report_id,
                    name: `${report.report_type.toUpperCase()} - ${report.client_name || 'Untitled'}`,
                    clientName: report.client_name || '',
                    installationAddress: report.installation_address || '',
                    status: report.status,
                    inspectionDate: report.data?.inspectionDate || report.data?.dateOfInspection || undefined,
                    lastModified: new Date(report.updated_at).getTime(),
                    created: new Date(report.updated_at).getTime(),
                    inspectorName: report.data?.inspectorName || '',
                  }}
                  onEdit={() => { navigator.vibrate?.(10); onEditReport(report.report_id, report.report_type); }}
                  onDelete={() => { navigator.vibrate?.(50); handleDeleteReport(report.report_id); }}
                  onPreview={handlePreviewReport}
                  isSelected={selectedReports.has(report.report_id)}
                  isBulkMode={isBulkMode}
                  onSelectToggle={handleSelectToggle}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mobile Floating Action Button - Only show when reports exist */}
        {filteredReports.length > 0 && (
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
                <DropdownMenuItem onClick={() => { onNavigate('eicr'); navigator.vibrate?.(10); }}>
                  <FileText className="h-4 w-4 mr-2" />
                  EICR
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { onNavigate('eic'); navigator.vibrate?.(10); }}>
                  <FileText className="h-4 w-4 mr-2" />
                  EIC
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { onNavigate('minor-works'); navigator.vibrate?.(10); }}>
                  <FileText className="h-4 w-4 mr-2" />
                  Minor Works
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.vibrate?.(10);
              setShowImportDialog(true);
            }}
            className="gap-2 h-11 sm:h-10 px-3 sm:px-4"
          >
            <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Import</span>
          </Button>
        </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Report</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this report? It will be removed from all your devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                navigator.vibrate?.(100);
                confirmDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete Report'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedReports.size} Certificate{selectedReports.size > 1 ? 's' : ''}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedReports.size} certificate{selectedReports.size > 1 ? 's' : ''}? This action cannot be undone.
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

      <CertificateImportDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImportComplete={() => {
          refetchReports();
          setShowImportDialog(false);
        }}
      />

      {selectedReportId && (
        <ReportPdfViewer
          reportId={selectedReportId}
          open={showPdfViewer}
          onOpenChange={setShowPdfViewer}
        />
      )}
    </>
  );
};

export default MyReports;
