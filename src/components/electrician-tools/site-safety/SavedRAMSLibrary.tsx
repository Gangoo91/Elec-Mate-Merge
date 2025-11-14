import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, Trash2, Calendar, Loader2, FolderOpen, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { RAMSAmendDialog } from './ai-rams/RAMSAmendDialog';
import { RAMSQuickEditDialog } from './ai-rams/RAMSQuickEditDialog';

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
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [amendDialogOpen, setAmendDialogOpen] = useState(false);
  const [quickEditDialogOpen, setQuickEditDialogOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const { toast } = useToast();

  // Display logic: show 12 most recent by default
  const displayedDocuments = showAll ? documents : documents.slice(0, 12);

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Auto-refresh every 10 seconds to pick up new saves
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDocuments();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Also refresh when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchDocuments();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
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
      toast({
        title: 'Error Loading Documents',
        description: 'Could not load your saved RAMS documents',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
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
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
            <p className="text-sm text-muted-foreground">Loading your documents...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (documents.length === 0) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-elec-yellow/10">
              <FolderOpen className="h-12 w-12 text-elec-yellow/60" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No Saved Documents</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Generate your first RAMS document using the AI-Powered RAMS Generator above
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Document count and View All toggle */}
      {documents.length > 12 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {displayedDocuments.length} of {documents.length} documents
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-elec-yellow hover:text-elec-yellow/80"
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

      {/* Mobile: Stack cards */}
      <div className="block sm:hidden space-y-3">
        {displayedDocuments.map((doc) => (
          <Card 
            key={doc.id} 
            className="border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/40 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-elec-yellow/10 shrink-0">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{doc.project_name}</h3>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{doc.location}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs">
                <Badge variant="outline" className={getStatusColor(doc.status)}>
                  {doc.status}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(doc.created_at), 'dd/MM/yy')}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-xs"
                  onClick={() => handleDownload(doc)}
                  disabled={!doc.pdf_url || downloadingId === doc.id}
                >
                  {downloadingId === doc.id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Download className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-elec-blue/30 hover:bg-elec-blue/10 text-elec-blue text-xs"
                  onClick={() => {
                    setSelectedDocumentId(doc.id);
                    setAmendDialogOpen(true);
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive/30 hover:bg-destructive/10 text-destructive text-xs"
                  onClick={() => handleDelete(doc.id, doc.pdf_url)}
                  disabled={deletingId === doc.id}
                >
                  {deletingId === doc.id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Trash2 className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: Table view */}
      <div className="hidden sm:block">
        <Card className="border-elec-yellow/20 bg-elec-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-elec-yellow/5 border-b border-elec-yellow/20">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold">Document</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">Created</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-elec-yellow/10">
                {displayedDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-elec-yellow/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-elec-yellow/10">
                          <FileText className="h-4 w-4 text-elec-yellow" />
                        </div>
                        <span className="font-medium text-sm">{doc.project_name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{doc.location}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {format(new Date(doc.created_at), 'dd MMM yyyy')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
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
                          className="border-elec-blue/30 hover:bg-elec-blue/10 text-elec-blue"
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
                          className="border-destructive/30 hover:bg-destructive/10 text-destructive"
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
