/**
 * SafetyDocsSheet
 *
 * Bottom sheet for workers to view and acknowledge safety documents (RAMS, policies, briefings).
 */

import { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  CheckCircle,
  X,
  Loader2,
  Eye,
  ChevronRight,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useSafetyDocs } from '@/hooks/useWorkerSelfService';

interface SafetyDocsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SafetyDocsSheet({ open, onOpenChange }: SafetyDocsSheetProps) {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const { data: docs, isLoading, acknowledgeDoc, isAcknowledging } = useSafetyDocs();

  const handleClose = () => {
    onOpenChange(false);
    setSelectedDocId(null);
  };

  const handleAcknowledge = async (docId: string) => {
    try {
      await acknowledgeDoc(docId);
      toast.success('Document acknowledged');
    } catch {
      toast.error('Failed to acknowledge document');
    }
  };

  const pendingDocs = docs?.filter((d) => !d.acknowledged_at) || [];
  const acknowledgedDocs = docs?.filter((d) => d.acknowledged_at) || [];

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-xl sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="w-10" />
              <SheetTitle className="text-lg font-semibold flex-1 text-center">
                Safety Documents
              </SheetTitle>
              <SheetDescription className="sr-only">
                View and acknowledge safety documents, RAMS, and policies
              </SheetDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              </div>
            ) : (
              <>
                {/* Pending acknowledgements */}
                {pendingDocs.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      <h3 className="text-sm font-medium text-amber-400">
                        Requires Acknowledgement ({pendingDocs.length})
                      </h3>
                    </div>

                    {pendingDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-amber-500/20 flex-shrink-0">
                            <FileText className="h-5 w-5 text-amber-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-white">{doc.title}</p>
                              {doc.mandatory && (
                                <Badge className="bg-red-500/20 text-red-400 border-0 text-xs">
                                  Mandatory
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-white/60">{doc.type}</p>
                            {doc.description && (
                              <p className="text-xs text-white/50 mt-1 line-clamp-2">
                                {doc.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 h-10 bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.06] touch-manipulation"
                          >
                            <Eye className="h-4 w-4 mr-1.5" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAcknowledge(doc.id)}
                            disabled={isAcknowledging}
                            className="flex-1 h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-medium touch-manipulation"
                          >
                            {isAcknowledging ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1.5" />
                                Acknowledge
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Already acknowledged */}
                {acknowledgedDocs.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-400" />
                      <h3 className="text-sm font-medium text-white/80">
                        Acknowledged ({acknowledgedDocs.length})
                      </h3>
                    </div>

                    {acknowledgedDocs.map((doc) => (
                      <button
                        key={doc.id}
                        className="w-full text-left p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-colors touch-manipulation"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-green-500/20 flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white">{doc.title}</p>
                            <p className="text-sm text-white/60">{doc.type}</p>
                            <p className="text-xs text-white/40 mt-1">
                              Acknowledged {new Date(doc.acknowledged_at!).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {docs?.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="h-8 w-8 text-green-400" />
                    </div>
                    <p className="text-white font-medium mb-1">All Clear</p>
                    <p className="text-white/60 text-sm">No safety documents require attention</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
