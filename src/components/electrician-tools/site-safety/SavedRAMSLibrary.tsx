import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  FileText,
  Download,
  Trash2,
  Calendar,
  Loader2,
  FolderOpen,
  Edit,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  X,
  Upload,
  Sparkles,
  FileUp,
} from 'lucide-react';
import { format, subDays } from 'date-fns';
import { RAMSAmendDialog } from './ai-rams/RAMSAmendDialog';
import { RAMSQuickEditDialog } from './ai-rams/RAMSQuickEditDialog';
import { RAMSFilterPanel } from './rams-library/RAMSFilterPanel';
import { RAMSEmptyState } from './rams-library/RAMSEmptyState';
import { SwipeableDocumentCard } from './rams-library/SwipeableDocumentCard';
import { RAMSFilterSheet } from './rams-library/RAMSFilterSheet';
import { UserRAMSUpload } from './UserRAMSUpload';
import { cn } from '@/lib/utils';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';

interface SavedRAMS {
  id: string;
  project_name: string;
  location: string;
  status: string;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
  source?: string;
  original_filename?: string;
}

export const SavedRAMSLibrary = () => {
  const [documents, setDocuments] = useState<SavedRAMS[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [amendDialogOpen, setAmendDialogOpen] = useState(false);
  const [quickEditDialogOpen, setQuickEditDialogOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'ai-generated' | 'user-uploaded'>('all');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [uploadSheetOpen, setUploadSheetOpen] = useState(false);

  // Edit/Selection mode state
  const [editMode, setEditMode] = useState(false);
  const [selectedDocIds, setSelectedDocIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const { toast } = useToast();

  // Extract unique locations for filter
  const uniqueLocations = useMemo(() => {
    const locations = documents.map((doc) => doc.location).filter(Boolean);
    return Array.from(new Set(locations)).sort();
  }, [documents]);

  // Filter documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchTerm === '' ||
        doc.project_name.toLowerCase().includes(searchLower) ||
        doc.location.toLowerCase().includes(searchLower);

      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;

      let matchesDate = true;
      if (dateFilter !== 'all') {
        const docDate = new Date(doc.created_at);
        const now = new Date();
        if (dateFilter === '7days') {
          matchesDate = docDate >= subDays(now, 7);
        } else if (dateFilter === '30days') {
          matchesDate = docDate >= subDays(now, 30);
        } else if (dateFilter === '90days') {
          matchesDate = docDate >= subDays(now, 90);
        }
      }

      const matchesLocation = locationFilter === 'all' || doc.location === locationFilter;

      // Source filter - treat null/undefined as 'ai-generated' (legacy docs)
      const docSource = doc.source || 'ai-generated';
      const matchesSource = sourceFilter === 'all' || docSource === sourceFilter;

      return matchesSearch && matchesStatus && matchesDate && matchesLocation && matchesSource;
    });
  }, [documents, searchTerm, statusFilter, dateFilter, locationFilter, sourceFilter]);

  // Count documents by source for tabs
  const aiGeneratedCount = useMemo(() =>
    documents.filter(d => !d.source || d.source === 'ai-generated').length,
    [documents]
  );
  const uploadedCount = useMemo(() =>
    documents.filter(d => d.source === 'user-uploaded').length,
    [documents]
  );

  const displayedDocuments = showAll ? filteredDocuments : filteredDocuments.slice(0, 12);

  const hasActiveFilters =
    statusFilter !== 'all' || dateFilter !== 'all' || locationFilter !== 'all';

  const activeFilterCount = [
    statusFilter !== 'all',
    dateFilter !== 'all',
    locationFilter !== 'all',
  ].filter(Boolean).length;

  useEffect(() => {
    fetchDocuments(false);
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDocuments(true);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Refresh on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchDocuments(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchDocuments = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to view your saved documents',
          variant: 'destructive',
        });
        return;
      }

      const { data, error } = await supabase
        .from('rams_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      if (!silent) {
        toast({
          title: 'Error Loading Documents',
          description: 'Could not load your saved RAMS documents',
          variant: 'destructive',
        });
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleDownload = async (doc: SavedRAMS) => {
    if (!doc.pdf_url) {
      toast({
        title: 'PDF Not Available',
        description: 'This document does not have a PDF file',
        variant: 'destructive',
      });
      return;
    }

    try {
      setDownloadingId(doc.id);
      const { data, error } = await supabase.storage.from('rams-pdfs').download(doc.pdf_url);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `RAMS_${doc.project_name}_${format(new Date(doc.created_at), 'yyyy-MM-dd')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Download Complete',
        description: 'Your RAMS PDF has been downloaded',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: 'Download Failed',
        description: 'Could not download the PDF file',
        variant: 'destructive',
      });
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (docId: string, pdfUrl: string | null) => {
    if (!confirm('Are you sure you want to delete this RAMS document?')) {
      return;
    }

    try {
      setDeletingId(docId);

      if (pdfUrl) {
        const { error: storageError } = await supabase.storage.from('rams-pdfs').remove([pdfUrl]);
        if (storageError) {
          console.error('Error deleting PDF from storage:', storageError);
        }
      }

      const { error } = await supabase.from('rams_documents').delete().eq('id', docId);
      if (error) throw error;

      toast({
        title: 'Document Deleted',
        description: 'RAMS document has been removed',
        variant: 'success',
      });

      setDocuments((docs) => docs.filter((d) => d.id !== docId));
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: 'Delete Failed',
        description: 'Could not delete the document',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleBulkDelete = async () => {
    const count = selectedDocIds.size;
    if (
      !confirm(
        `Are you sure you want to delete ${count} document${count !== 1 ? 's' : ''}? This cannot be undone.`
      )
    ) {
      return;
    }

    setBulkDeleting(true);

    try {
      const docsToDelete = documents.filter((d) => selectedDocIds.has(d.id));
      const pdfPaths = docsToDelete.filter((d) => d.pdf_url).map((d) => d.pdf_url!);

      if (pdfPaths.length > 0) {
        await supabase.storage.from('rams-pdfs').remove(pdfPaths);
      }

      const { error } = await supabase
        .from('rams_documents')
        .delete()
        .in('id', Array.from(selectedDocIds));

      if (error) throw error;

      toast({
        title: 'Documents Deleted',
        description: `Successfully deleted ${count} document${count !== 1 ? 's' : ''}`,
        variant: 'success',
      });

      setSelectedDocIds(new Set());
      setDocuments((docs) => docs.filter((d) => !selectedDocIds.has(d.id)));
      setEditMode(false);
    } catch (error) {
      console.error('Bulk delete error:', error);
      toast({
        title: 'Bulk Delete Failed',
        description: 'Could not delete all documents',
        variant: 'destructive',
      });
    } finally {
      setBulkDeleting(false);
    }
  };

  const toggleSelection = (docId: string) => {
    setSelectedDocIds((prev) => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedDocIds.size === displayedDocuments.length) {
      setSelectedDocIds(new Set());
    } else {
      setSelectedDocIds(new Set(displayedDocuments.map((d) => d.id)));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
    setLocationFilter('all');
    setSourceFilter('all');
  };

  const toggleEditMode = () => {
    if (editMode) {
      setSelectedDocIds(new Set());
    }
    setEditMode(!editMode);
  };

  const handleRefresh = useCallback(async () => {
    await fetchDocuments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-white border-gray-500/20';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </div>
        <div className="text-center">
          <p className="text-white font-medium">Loading Documents</p>
          <p className="text-sm text-white mt-1">Fetching your saved RAMS...</p>
        </div>
      </div>
    );
  }

  // Empty state - no documents
  if (documents.length === 0) {
    return <RAMSEmptyState type="no-documents" />;
  }

  return (
    <div className="space-y-0">
      {/* Mobile Header with Search */}
      <div className="block md:hidden">
        <header className="sticky top-0 z-40 bg-elec-dark/95 backdrop-blur-md border-b border-white/[0.06] -mx-4 px-4">
          <div className="py-3">
            {/* Title row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white">Saved Documents</h2>
                <Badge className="bg-white/10 text-white border-0 text-xs">
                  {filteredDocuments.length}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setUploadSheetOpen(true)}
                  className="h-11 w-11 text-elec-yellow touch-manipulation active:scale-[0.98]"
                >
                  <Upload className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleEditMode}
                  className={cn(
                    'h-11 px-3 text-sm font-medium touch-manipulation active:scale-[0.98]',
                    editMode ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {editMode ? 'Done' : 'Edit'}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFilterSheetOpen(true)}
                  className="relative h-11 w-11 text-white touch-manipulation active:scale-[0.98]"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-elec-yellow text-black text-[10px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Source Filter Tabs */}
            <div className="flex items-center gap-2 mb-3 overflow-x-auto scrollbar-hide -mx-1 px-1">
              <button
                onClick={() => setSourceFilter('all')}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation',
                  sourceFilter === 'all'
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.06] text-white hover:bg-white/10'
                )}
              >
                All ({documents.length})
              </button>
              <button
                onClick={() => setSourceFilter('ai-generated')}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation flex items-center gap-1.5',
                  sourceFilter === 'ai-generated'
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.06] text-white hover:bg-white/10'
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI ({aiGeneratedCount})
              </button>
              <button
                onClick={() => setSourceFilter('user-uploaded')}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation flex items-center gap-1.5',
                  sourceFilter === 'user-uploaded'
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.06] text-white hover:bg-white/10'
                )}
              >
                <FileUp className="h-3.5 w-3.5" />
                Uploaded ({uploadedCount})
              </button>
            </div>

            {/* Search bar */}
            <div className="relative">
              {!searchTerm && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
              )}
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn("pr-10 h-11 bg-white/[0.05] border-white/[0.08] rounded-xl text-white placeholder:text-white", !searchTerm && "pl-10")}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 pb-3 overflow-x-auto scrollbar-hide">
              {statusFilter !== 'all' && (
                <Badge
                  className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 shrink-0 pr-1"
                >
                  {statusFilter}
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="ml-1 hover:bg-elec-yellow/20 rounded p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {dateFilter !== 'all' && (
                <Badge
                  className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 shrink-0 pr-1"
                >
                  {dateFilter === '7days'
                    ? 'Last 7 days'
                    : dateFilter === '30days'
                    ? 'Last 30 days'
                    : 'Last 90 days'}
                  <button
                    onClick={() => setDateFilter('all')}
                    className="ml-1 hover:bg-elec-yellow/20 rounded p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {locationFilter !== 'all' && (
                <Badge
                  className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 shrink-0 pr-1 max-w-[150px]"
                >
                  <span className="truncate">{locationFilter}</span>
                  <button
                    onClick={() => setLocationFilter('all')}
                    className="ml-1 hover:bg-elec-yellow/20 rounded p-0.5 shrink-0"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </header>

        {/* Empty filtered state */}
        {filteredDocuments.length === 0 && (
          <RAMSEmptyState
            type={hasActiveFilters ? 'no-filtered-results' : 'no-results'}
            searchTerm={searchTerm}
            onClearFilters={clearFilters}
          />
        )}

        {/* Mobile Document Cards */}
        {filteredDocuments.length > 0 && (
          <PullToRefresh onRefresh={handleRefresh}>
            <div className="py-4 space-y-3">
              {displayedDocuments.map((doc, index) => (
                <SwipeableDocumentCard
                  key={doc.id}
                  doc={doc}
                  index={index}
                  editMode={editMode}
                  selected={selectedDocIds.has(doc.id)}
                  isDownloading={downloadingId === doc.id}
                  isDeleting={deletingId === doc.id}
                  onToggleSelect={() => toggleSelection(doc.id)}
                  onDownload={() => handleDownload(doc)}
                  onDelete={() => handleDelete(doc.id, doc.pdf_url)}
                  onEdit={() => {
                    setSelectedDocumentId(doc.id);
                    setAmendDialogOpen(true);
                  }}
                />
              ))}

              {/* View all toggle */}
              {filteredDocuments.length > 12 && (
                <Button
                  variant="ghost"
                  onClick={() => setShowAll(!showAll)}
                  className="w-full h-12 text-elec-yellow hover:text-elec-yellow/80 hover:bg-elec-yellow/10 touch-manipulation active:scale-[0.98]"
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      View All ({filteredDocuments.length - 12} more)
                    </>
                  )}
                </Button>
              )}
            </div>
          </PullToRefresh>
        )}

        {/* Edit mode bottom bar */}
        {editMode && (
          <div
            className={cn(
              'fixed bottom-0 inset-x-0 z-50 p-4 bg-elec-dark/95 backdrop-blur-md border-t border-white/[0.06]',
              'transition-transform duration-300',
              selectedDocIds.size > 0 ? 'translate-y-0' : 'translate-y-full'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSelectAll}
                  className="text-white h-11 touch-manipulation active:scale-[0.98]"
                >
                  {selectedDocIds.size === displayedDocuments.length ? 'Deselect All' : 'Select All'}
                </Button>
                <span className="text-sm text-white">{selectedDocIds.size} selected</span>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleBulkDelete}
                disabled={bulkDeleting || selectedDocIds.size === 0}
                className="h-11 px-4 touch-manipulation active:scale-[0.98]"
              >
                {bulkDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block space-y-4">
        {/* Search and Filter Section */}
        <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="relative flex-1 max-w-xl">
                {!searchTerm && (
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                )}
                <Input
                  type="text"
                  placeholder="Search by project, location, or assessor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn("pr-10 h-11 bg-background border-border touch-manipulation", !searchTerm && "pl-10")}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <RAMSFilterPanel
                statusFilter={statusFilter}
                dateFilter={dateFilter}
                locationFilter={locationFilter}
                locations={uniqueLocations}
                onStatusChange={setStatusFilter}
                onDateChange={setDateFilter}
                onLocationChange={setLocationFilter}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bulk Action Bar */}
        {selectedDocIds.size > 0 && (
          <div className="flex items-center justify-between p-3 bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl">
            <span className="text-sm text-elec-yellow">
              {selectedDocIds.size} document{selectedDocIds.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDocIds(new Set())}
                className="text-white"
              >
                Clear Selection
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleBulkDelete}
                disabled={bulkDeleting}
              >
                {bulkDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete Selected
              </Button>
            </div>
          </div>
        )}

        {/* Document count and View All toggle */}
        {filteredDocuments.length > 12 && (
          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-white">
              Showing {displayedDocuments.length} of {filteredDocuments.length} documents
              {hasActiveFilters && ` (filtered from ${documents.length} total)`}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="text-elec-yellow hover:text-elec-yellow/80 hover:bg-elec-yellow/10"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  View All
                </>
              )}
            </Button>
          </div>
        )}

        {/* Empty filtered state */}
        {filteredDocuments.length === 0 && (
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
            <CardContent className="py-12">
              <RAMSEmptyState
                type={hasActiveFilters ? 'no-filtered-results' : 'no-results'}
                searchTerm={searchTerm}
                onClearFilters={clearFilters}
              />
            </CardContent>
          </Card>
        )}

        {/* Desktop Table */}
        {filteredDocuments.length > 0 && (
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-white/5">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                  </div>
                  Saved RAMS Documents
                </CardTitle>
                {displayedDocuments.length > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white">Select All</span>
                    <Checkbox
                      checked={
                        selectedDocIds.size === displayedDocuments.length &&
                        displayedDocuments.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      className="border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                  </div>
                )}
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1a] border-b border-white/5">
                  <tr>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white w-12">
                      <span className="sr-only">Select</span>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {displayedDocuments.map((doc) => (
                    <tr
                      key={doc.id}
                      className={cn(
                        'transition-colors',
                        selectedDocIds.has(doc.id) ? 'bg-elec-yellow/5' : 'hover:bg-white/[0.02]'
                      )}
                    >
                      <td className="px-4 py-3 text-center">
                        <Checkbox
                          checked={selectedDocIds.has(doc.id)}
                          onCheckedChange={() => toggleSelection(doc.id)}
                          className="border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                            <FileText className="h-4 w-4 text-elec-yellow" />
                          </div>
                          <span className="font-medium text-sm text-white">{doc.project_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-white">{doc.location}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={`${getStatusColor(doc.status)} capitalize`}>
                          {doc.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {format(new Date(doc.created_at), 'dd MMM yyyy')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent border-white/10 hover:border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
                            onClick={() => handleDownload(doc)}
                            disabled={!doc.pdf_url || downloadingId === doc.id}
                          >
                            {downloadingId === doc.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 text-white"
                            onClick={() => {
                              setSelectedDocumentId(doc.id);
                              setAmendDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Amend
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent border-red-500/30 hover:bg-red-500/10 text-red-400"
                            onClick={() => handleDelete(doc.id, doc.pdf_url)}
                            disabled={deletingId === doc.id}
                          >
                            {deletingId === doc.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Filter Bottom Sheet (Mobile) */}
      <RAMSFilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        locationFilter={locationFilter}
        locations={uniqueLocations}
        onStatusChange={setStatusFilter}
        onDateChange={setDateFilter}
        onLocationChange={setLocationFilter}
        onClearFilters={clearFilters}
        onApply={() => {}}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Upload Sheet */}
      <UserRAMSUpload
        open={uploadSheetOpen}
        onOpenChange={setUploadSheetOpen}
        onUploadComplete={() => fetchDocuments()}
      />

      {/* Amend Dialogs */}
      {selectedDocumentId && (
        <>
          <RAMSAmendDialog
            documentId={selectedDocumentId}
            isOpen={amendDialogOpen}
            onClose={() => {
              setAmendDialogOpen(false);
              setSelectedDocumentId(null);
            }}
            onQuickEdit={() => {
              setAmendDialogOpen(false);
              setQuickEditDialogOpen(true);
            }}
          />

          <RAMSQuickEditDialog
            documentId={selectedDocumentId}
            isOpen={quickEditDialogOpen}
            onClose={() => {
              setQuickEditDialogOpen(false);
              setSelectedDocumentId(null);
              fetchDocuments();
            }}
          />
        </>
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
