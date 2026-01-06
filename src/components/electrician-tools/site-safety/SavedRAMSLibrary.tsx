import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, Trash2, Calendar, Loader2, FolderOpen, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { RAMSAmendDialog } from './ai-rams/RAMSAmendDialog';
import { RAMSQuickEditDialog } from './ai-rams/RAMSQuickEditDialog';
import { RAMSSearchBar } from './rams-library/RAMSSearchBar';
import { RAMSFilterPanel } from './rams-library/RAMSFilterPanel';
import { RAMSBulkActionBar } from './rams-library/RAMSBulkActionBar';
import { RAMSEmptyState } from './rams-library/RAMSEmptyState';

interface SavedRAMS {
  id: string;
  project_name: string;
  location: string;
  status: string;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export const SavedRAMSLibrary = () => {
  const [documents, setDocuments] = useState<SavedRAMS[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
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
  
  // Bulk selection state
  const [selectedDocIds, setSelectedDocIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  
  const { toast } = useToast();

  // Extract unique locations for filter dropdown
  const uniqueLocations = useMemo(() => {
    const locations = documents.map(doc => doc.location).filter(Boolean);
    return Array.from(new Set(locations)).sort();
  }, [documents]);

  // Filter documents based on search and filters
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        doc.project_name.toLowerCase().includes(searchLower) ||
        doc.location.toLowerCase().includes(searchLower);
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      
      // Date filter
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
      
      // Location filter
      const matchesLocation = locationFilter === 'all' || doc.location === locationFilter;
      
      return matchesSearch && matchesStatus && matchesDate && matchesLocation;
    });
  }, [documents, searchTerm, statusFilter, dateFilter, locationFilter]);

  // Display logic: show 12 most recent by default
  const displayedDocuments = showAll ? filteredDocuments : filteredDocuments.slice(0, 12);
  
  // Check if filters are active
  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'all' || 
    dateFilter !== 'all' || locationFilter !== 'all';

  useEffect(() => {
    fetchDocuments(false); // Initial load with spinner
  }, []);

  // Auto-refresh every 30 seconds to pick up new saves
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDocuments(true); // Silent background refresh
    }, 30000); // Changed from 10s to 30s
    
    return () => clearInterval(interval);
  }, []);

  // Also refresh when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchDocuments(true); // Silent refresh
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchDocuments = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      }
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to view your saved documents',
          variant: 'destructive'
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
          variant: 'destructive'
        });
      }
    } finally {
      if (!silent) {
        setLoading(false);
        setInitialLoading(false);
      }
    }
  };

  const handleDownload = async (doc: SavedRAMS) => {
    if (!doc.pdf_url) {
      toast({
        title: 'PDF Not Available',
        description: 'This document does not have a PDF file',
        variant: 'destructive'
      });
      return;
    }

    try {
      setDownloadingId(doc.id);
      
      // Download from Supabase Storage
      const { data, error } = await supabase.storage
        .from('rams-pdfs')
        .download(doc.pdf_url);

      if (error) throw error;

      // Create download link
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
        variant: 'success'
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: 'Download Failed',
        description: 'Could not download the PDF file',
        variant: 'destructive'
      });
    } finally {
      setDownloadingId(null);
    }
  };

  // Bulk delete handler
  const handleBulkDelete = async () => {
    const count = selectedDocIds.size;
    
    if (!confirm(`Are you sure you want to delete ${count} document${count !== 1 ? 's' : ''}? This cannot be undone.`)) {
      return;
    }
    
    setBulkDeleting(true);
    let successCount = 0;
    let failCount = 0;
    
    try {
      // Get documents to delete
      const docsToDelete = documents.filter(d => selectedDocIds.has(d.id));
      
      // Delete PDFs from storage (batch)
      const pdfPaths = docsToDelete
        .filter(d => d.pdf_url)
        .map(d => d.pdf_url!);
      
      if (pdfPaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('rams-pdfs')
          .remove(pdfPaths);
        
        if (storageError) {
          console.error('Error deleting PDFs from storage:', storageError);
        }
      }
      
      // Delete database records (batch)
      const { error } = await supabase
        .from('rams_documents')
        .delete()
        .in('id', Array.from(selectedDocIds));
      
      if (error) throw error;
      
      successCount = count;
      
      toast({
        title: 'Documents Deleted',
        description: `Successfully deleted ${successCount} document${successCount !== 1 ? 's' : ''}`,
        variant: 'success'
      });
      
      // Clear selection and refresh
      setSelectedDocIds(new Set());
      setDocuments(docs => docs.filter(d => !selectedDocIds.has(d.id)));
      
    } catch (error) {
      console.error('Bulk delete error:', error);
      failCount = count - successCount;
      toast({
        title: 'Bulk Delete Failed',
        description: `Could not delete all documents. ${successCount} succeeded, ${failCount} failed.`,
        variant: 'destructive'
      });
    } finally {
      setBulkDeleting(false);
    }
  };

  // Selection handlers
  const toggleSelection = (docId: string) => {
    setSelectedDocIds(prev => {
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
      setSelectedDocIds(new Set(displayedDocuments.map(d => d.id)));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
    setLocationFilter('all');
  };

  const handleDelete = async (docId: string, pdfUrl: string | null) => {
    if (!confirm('Are you sure you want to delete this RAMS document?')) {
      return;
    }

    try {
      setDeletingId(docId);

      // Delete PDF from storage if exists
      if (pdfUrl) {
        const { error: storageError } = await supabase.storage
          .from('rams-pdfs')
          .remove([pdfUrl]);
        
        if (storageError) {
          console.error('Error deleting PDF from storage:', storageError);
        }
      }

      // Delete document record
      const { error } = await supabase
        .from('rams_documents')
        .delete()
        .eq('id', docId);

      if (error) throw error;

      toast({
        title: 'Document Deleted',
        description: 'RAMS document has been removed',
        variant: 'success'
      });

      // Refresh list
      setDocuments(docs => docs.filter(d => d.id !== docId));
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: 'Delete Failed',
        description: 'Could not delete the document',
        variant: 'destructive'
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
        <CardContent className="py-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
              <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
            </div>
            <div className="text-center">
              <p className="text-white font-medium">Loading Documents</p>
              <p className="text-sm text-white/70 mt-1">Fetching your saved RAMS...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (documents.length === 0) {
    return (
      <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
        <CardContent className="py-12">
          <RAMSEmptyState type="no-documents" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Section */}
      <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <RAMSSearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
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
      <RAMSBulkActionBar
        selectedCount={selectedDocIds.size}
        onBulkDelete={handleBulkDelete}
        onClearSelection={() => setSelectedDocIds(new Set())}
        isDeleting={bulkDeleting}
      />

      {/* Document count and View All toggle */}
      {filteredDocuments.length > 12 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-white/70">
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

      {/* Empty state for filtered results */}
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

      {/* Mobile: Stack cards */}
      {filteredDocuments.length > 0 && (
        <div className="block md:hidden space-y-3">
          {displayedDocuments.map((doc) => (
            <Card
              key={doc.id}
              className={`
                bg-[#1e1e1e] border rounded-2xl transition-all duration-200
                ${selectedDocIds.has(doc.id) ? 'border-elec-yellow/50 ring-1 ring-elec-yellow/20' : 'border-white/10 hover:border-white/20'}
              `}
            >
              <CardContent className="p-4 space-y-4">
                {/* Header with checkbox and document info */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedDocIds.has(doc.id)}
                    onCheckedChange={() => toggleSelection(doc.id)}
                    className="mt-1 border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                  />
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 shrink-0">
                      <FileText className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-base truncate">{doc.project_name}</h3>
                      <p className="text-sm text-white/70 truncate">{doc.location}</p>
                    </div>
                  </div>
                </div>

                {/* Status and date */}
                <div className="flex items-center justify-between gap-2 px-1">
                  <Badge variant="outline" className={`${getStatusColor(doc.status)} capitalize`}>
                    {doc.status}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-white/70 text-xs">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{format(new Date(doc.created_at), 'dd/MM/yy')}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-11 bg-[#1a1a1a] border-white/10 hover:border-elec-yellow/30 hover:bg-elec-yellow/10 text-white active:scale-[0.98]"
                    onClick={() => handleDownload(doc)}
                    disabled={!doc.pdf_url || downloadingId === doc.id}
                  >
                    {downloadingId === doc.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-11 bg-[#1a1a1a] border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 text-white active:scale-[0.98]"
                    onClick={() => {
                      setSelectedDocumentId(doc.id);
                      setAmendDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-11 bg-[#1a1a1a] border-red-500/30 hover:bg-red-500/10 text-red-400 active:scale-[0.98]"
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}


      {/* Desktop: Table view */}
      {filteredDocuments.length > 0 && (
        <div className="hidden md:block">
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
                    <span className="text-sm text-white/70">Select All</span>
                    <Checkbox
                      checked={selectedDocIds.size === displayedDocuments.length && displayedDocuments.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all documents"
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
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white/70 w-12">
                      <span className="sr-only">Select</span>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Document</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Created</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-white/70 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {displayedDocuments.map((doc) => (
                    <tr
                      key={doc.id}
                      className={`
                        transition-colors
                        ${selectedDocIds.has(doc.id) ? 'bg-elec-yellow/5' : 'hover:bg-white/[0.02]'}
                      `}
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
                      <td className="px-4 py-3 text-sm text-white/70">{doc.location}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={`${getStatusColor(doc.status)} capitalize`}>
                          {doc.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70">
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
        </div>
      )}

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
              fetchDocuments(); // Refresh list after edit
            }}
          />
        </>
      )}
    </div>
  );
};
