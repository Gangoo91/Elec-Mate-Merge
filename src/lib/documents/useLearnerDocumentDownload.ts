/**
 * useLearnerDocumentDownload — a "Download PDF" button's state for a document
 * made server-side by `learner-document-pdf` (ELE-2017): one request at a
 * time, `busy` while PDFMonkey renders, and a toast when it fails.
 */
import { useCallback, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  downloadLearnerDocument,
  type LearnerDocumentRequest,
} from '@/lib/documents/learnerDocuments';

export function useLearnerDocumentDownload() {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const inFlight = useRef(false);

  const download = useCallback(
    async (request: LearnerDocumentRequest) => {
      if (inFlight.current) return;
      inFlight.current = true;
      setBusy(true);
      try {
        await downloadLearnerDocument(request);
      } catch (e) {
        toast({
          title: 'Could not make the PDF',
          description: (e as Error).message || 'Try again in a moment.',
          variant: 'destructive',
        });
      } finally {
        inFlight.current = false;
        setBusy(false);
      }
    },
    [toast]
  );

  return { download, busy };
}
