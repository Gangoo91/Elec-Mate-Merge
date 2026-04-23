/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer } from 'vaul';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import DocumentCamera from './DocumentCamera';
import { OCRPreview, type ExtractedField } from './OCRPreview';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import {
  Eyebrow,
  Dot,
  ListCard,
  ListRow,
  SectionHeader,
  type Tone,
} from '@/components/college/primitives';

type DocTypeKey = 'ecs_card' | 'qualification' | 'training' | 'driving_licence' | 'insurance';

const DOCUMENT_TYPES: {
  type: DocTypeKey;
  label: string;
  description: string;
  required?: boolean;
  multiple?: boolean;
  tone: Tone;
  tips: string[];
}[] = [
  {
    type: 'ecs_card',
    label: 'ECS Card',
    description: 'JIB Electrotechnical Certification Scheme card',
    required: true,
    tone: 'yellow',
    tips: [
      'Place card on a dark, flat surface',
      'Ensure all text and photo are visible',
      'Avoid glare on holographic elements',
    ],
  },
  {
    type: 'qualification',
    label: 'Qualification Certificate',
    description: 'City & Guilds, NVQ, or other qualification certificate',
    multiple: true,
    tone: 'blue',
    tips: [
      'Capture the entire certificate',
      'Certificate number must be visible',
      'Include issuing body logo if possible',
    ],
  },
  {
    type: 'training',
    label: 'Training Record',
    description: 'Course completion certificates and short course records',
    multiple: true,
    tone: 'emerald',
    tips: ['Show completion date clearly', 'Include provider name', 'Capture unique identifiers'],
  },
  {
    type: 'driving_licence',
    label: 'Driving Licence',
    description: 'UK driving licence for verification',
    tone: 'purple',
    tips: [
      'Capture front of licence',
      'Avoid covering any information',
      'Holograms may cause glare',
    ],
  },
  {
    type: 'insurance',
    label: 'Insurance',
    description: 'Public liability or professional indemnity insurance',
    tone: 'cyan',
    tips: [
      'Show policy number clearly',
      'Coverage amount must be visible',
      'Include expiry / renewal date',
    ],
  },
];

type VerificationStatus =
  | 'pending'
  | 'processing'
  | 'verified'
  | 'needs_review'
  | 'rejected'
  | 'expired'
  | 'appealed';

const STATUS_META: Record<VerificationStatus, { label: string; tone: Tone }> = {
  pending: { label: 'Pending review', tone: 'amber' },
  processing: { label: 'Processing', tone: 'blue' },
  verified: { label: 'Verified', tone: 'emerald' },
  needs_review: { label: 'Under review', tone: 'amber' },
  rejected: { label: 'Rejected', tone: 'red' },
  expired: { label: 'Expired', tone: 'orange' },
  appealed: { label: 'Appeal submitted', tone: 'purple' },
};

interface Document {
  id: string;
  document_type: string;
  document_name: string;
  issuing_body?: string;
  document_number?: string;
  issue_date?: string;
  expiry_date?: string;
  file_url?: string;
  file_path?: string;
  display_url?: string;
  verification_status: VerificationStatus;
  verification_confidence?: number;
  extracted_data?: Record<string, any>;
  extraction_confidence?: Record<string, number>;
  rejection_reason?: string;
  rejection_code?: string;
  suggestions?: string[];
  created_at: string;
  upload_attempt_number?: number;
}

interface VerificationResult {
  status: 'verified' | 'needs_review' | 'rejected';
  confidence: number;
  extractedData: Record<string, string | null>;
  extractionConfidence: Record<string, number>;
  rejectionCode?: string;
  rejectionReason?: string;
  suggestions?: string[];
  rawText?: string;
}

interface DocumentUploaderProps {
  onNavigate?: (tab: string) => void;
}

const DocumentUploader = ({ onNavigate: _onNavigate }: DocumentUploaderProps) => {
  const { profile } = useElecIdProfile();
  const isMobile = useIsMobile();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const [documentName, setDocumentName] = useState('');
  const [issuingBody, setIssuingBody] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [rejectedDocument, setRejectedDocument] = useState<Document | null>(null);
  const [appealNotes, setAppealNotes] = useState('');
  const [isSubmittingAppeal, setIsSubmittingAppeal] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [pendingVerifications, setPendingVerifications] = useState<Set<string>>(new Set());

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    if (profile?.id) fetchDocuments();
  }, [profile?.id]);

  useEffect(() => {
    if (!profile?.id) return;

    const channel = supabase
      .channel('elec-id-docs-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'elec_id_documents',
          filter: `profile_id=eq.${profile.id}`,
        },
        (payload) => {
          console.log('[Elec-ID] Document updated via realtime:', payload);
          fetchDocuments();
          const newDoc = payload.new as Document;
          if (newDoc.verification_status !== 'pending') {
            setPendingVerifications((prev) => {
              const next = new Set(prev);
              next.delete(newDoc.id);
              return next;
            });
          }
        }
      )
      .subscribe((status) => {
        console.log('[Elec-ID] Realtime subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id]);

  useEffect(() => {
    if (pendingVerifications.size === 0) return;

    const pollInterval = setInterval(async () => {
      const { data } = await supabase
        .from('elec_id_documents')
        .select('id, verification_status')
        .in('id', Array.from(pendingVerifications));

      if (data) {
        const stillPending = new Set(
          data.filter((d) => d.verification_status === 'pending').map((d) => d.id)
        );
        setPendingVerifications((prev) => {
          const next = new Set<string>();
          prev.forEach((id) => {
            if (stillPending.has(id)) next.add(id);
          });
          if (next.size < prev.size) fetchDocuments();
          return next;
        });
      }
    }, 5000);

    const timeoutId = setTimeout(() => {
      setPendingVerifications(new Set());
      fetchDocuments();
    }, 90000);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeoutId);
    };
  }, [pendingVerifications.size]);

  const fetchDocuments = async () => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from('elec_id_documents')
        .select('*')
        .eq('profile_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const docsWithUrls = await Promise.all(
        (data || []).map(async (doc) => {
          if (doc.file_path || doc.file_url) {
            const filePath = doc.file_path || doc.file_url;
            if (filePath.startsWith('http')) return doc;
            const { data: urlData } = await supabase.storage
              .from('elec-id-documents')
              .createSignedUrl(filePath, 3600);
            return { ...doc, display_url: urlData?.signedUrl || null };
          }
          return doc;
        })
      );

      setDocuments(docsWithUrls || []);
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  };

  const handleFileSelect = useCallback((file: File) => {
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PNG, JPG, or PDF file',
          variant: 'destructive',
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'File must be less than 10MB',
          variant: 'destructive',
        });
        return;
      }
      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = () => setUploadPreview(reader.result as string);
      reader.readAsDataURL(file);
      setVerificationResult(null);
    }
  }, []);

  const handleCameraCapture = (imageData: string, file: File) => {
    setUploadFile(file);
    setUploadPreview(imageData);
    setIsCameraOpen(false);
    setVerificationResult(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => setIsDragActive(false);

  const handleOpenUpload = (docType: string) => {
    setSelectedDocType(docType);
    setUploadFile(null);
    setUploadPreview(null);
    setDocumentName('');
    setIssuingBody('');
    setDocumentNumber('');
    setIssueDate('');
    setExpiryDate('');
    setVerificationResult(null);
    setIsEditMode(false);
    setIsUploadDialogOpen(true);
  };

  const handleUploadAndVerify = async () => {
    if (!uploadFile || !selectedDocType || !profile?.id) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${profile.id}/${selectedDocType}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('elec-id-documents')
        .upload(fileName, uploadFile);

      if (uploadError) throw uploadError;

      setUploadProgress(100);
      setIsUploading(false);
      setIsVerifying(true);

      const { data: docRecord, error: insertError } = await supabase
        .from('elec_id_documents')
        .insert({
          profile_id: profile.id,
          document_type: selectedDocType,
          document_name: documentName || uploadFile.name,
          file_path: fileName,
          file_url: fileName,
          verification_status: 'pending',
          issuing_body: issuingBody || null,
          document_number: documentNumber || null,
          issue_date: issueDate || null,
          expiry_date: expiryDate || null,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Failed to create document record:', insertError);
        throw new Error('Failed to save document record');
      }

      setPendingVerifications((prev) => new Set(prev).add(docRecord.id));

      const { data: urlData, error: urlError } = await supabase.storage
        .from('elec-id-documents')
        .createSignedUrl(fileName, 3600);

      if (urlError || !urlData?.signedUrl) {
        throw new Error('Failed to generate document URL for verification');
      }

      supabase.functions
        .invoke('verify-document', {
          body: {
            documentId: docRecord.id,
            fileUrl: urlData.signedUrl,
            documentType: selectedDocType,
            documentName: documentName || uploadFile.name,
            issuingBody,
            documentNumber,
            issueDate,
            expiryDate,
            profileId: profile.id,
          },
        })
        .then(({ error: verifyError }) => {
          if (verifyError) {
            setPendingVerifications((prev) => {
              const next = new Set(prev);
              next.delete(docRecord.id);
              return next;
            });
            toast({
              title: 'Verification issue',
              description:
                'Automatic verification encountered a problem. Your document has been queued for manual review.',
              variant: 'destructive',
            });
          }
          fetchDocuments();
        })
        .catch(() => {
          setPendingVerifications((prev) => {
            const next = new Set(prev);
            next.delete(docRecord.id);
            return next;
          });
          toast({
            title: 'Verification issue',
            description:
              'Automatic verification encountered a problem. Your document has been queued for manual review.',
            variant: 'destructive',
          });
          fetchDocuments();
        });

      toast({
        title: 'Document uploaded',
        description: 'Your document is being verified. This may take a moment.',
      });

      await fetchDocuments();
      setIsUploadDialogOpen(false);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload document',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setIsVerifying(false);
      setUploadProgress(0);
    }
  };

  const handleRetry = () => {
    setUploadFile(null);
    setUploadPreview(null);
    setVerificationResult(null);
    setIsEditMode(false);
  };

  const handleSaveCorrections = async () => {
    if (!verificationResult || !profile?.id) return;

    setIsVerifying(true);

    try {
      const { error } = await supabase
        .from('elec_id_documents')
        .update({
          document_name: documentName,
          issuing_body: issuingBody,
          document_number: documentNumber,
          issue_date: issueDate || null,
          expiry_date: expiryDate || null,
          verification_status: 'needs_review',
          user_corrections: {
            documentName,
            issuingBody,
            documentNumber,
            issueDate,
            expiryDate,
          },
          corrections_applied_at: new Date().toISOString(),
        })
        .eq('profile_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      toast({
        title: 'Corrections saved',
        description: 'Your corrections have been saved and the document is under review.',
      });

      await fetchDocuments();
      setIsUploadDialogOpen(false);
    } catch (err: any) {
      console.error('Error saving corrections:', err);
      toast({
        title: 'Error',
        description: 'Failed to save corrections',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    try {
      const { error } = await supabase.from('elec_id_documents').delete().eq('id', docId);
      if (error) throw error;

      setDocuments((prev) => prev.filter((d) => d.id !== docId));
      toast({
        title: 'Document removed',
        description: 'The document has been removed from your profile.',
      });
    } catch (err: any) {
      console.error('Delete error:', err);
      toast({
        title: 'Error',
        description: 'Failed to remove document',
        variant: 'destructive',
      });
    }
  };

  const handleOpenAppeal = (doc: Document) => {
    setRejectedDocument(doc);
    setAppealNotes('');
    setIsRejectionDialogOpen(true);
  };

  const handleSubmitAppeal = async () => {
    if (!rejectedDocument) return;
    setIsSubmittingAppeal(true);

    try {
      const { error } = await supabase
        .from('elec_id_documents')
        .update({
          verification_status: 'appealed',
          appeal_submitted_at: new Date().toISOString(),
          appeal_notes: appealNotes,
        })
        .eq('id', rejectedDocument.id);

      if (error) throw error;

      toast({
        title: 'Appeal submitted',
        description:
          "Your appeal has been submitted for manual review. We'll get back to you within 24-48 hours.",
      });

      await fetchDocuments();
      setIsRejectionDialogOpen(false);
    } catch (err: any) {
      console.error('Appeal error:', err);
      toast({
        title: 'Error',
        description: 'Failed to submit appeal',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingAppeal(false);
    }
  };

  const getDocumentsByType = (type: string) => documents.filter((d) => d.document_type === type);

  const getOCRFields = (): ExtractedField[] => {
    if (!verificationResult) return [];

    const fields: ExtractedField[] = [];
    const data = verificationResult.extractedData;
    const confidence = verificationResult.extractionConfidence;

    if (data.cardType) {
      fields.push({
        key: 'cardType',
        label: 'Card type',
        value: data.cardType,
        confidence: confidence.cardType || 0,
        validated: (confidence.cardType || 0) >= 0.8,
      });
    }
    if (data.cardNumber || data.certificateNumber || data.licenceNumber) {
      fields.push({
        key: 'cardNumber',
        label: 'Document number',
        value: data.cardNumber || data.certificateNumber || data.licenceNumber,
        confidence:
          confidence.cardNumber || confidence.certificateNumber || confidence.licenceNumber || 0,
        validated:
          (confidence.cardNumber ||
            confidence.certificateNumber ||
            confidence.licenceNumber ||
            0) >= 0.8,
      });
    }
    if (data.holderName) {
      fields.push({
        key: 'holderName',
        label: 'Holder name',
        value: data.holderName,
        confidence: confidence.holderName || 0,
        validated: (confidence.holderName || 0) >= 0.8,
      });
    }
    if (data.expiryDate) {
      fields.push({
        key: 'expiryDate',
        label: 'Expiry date',
        value: data.expiryDate,
        confidence: confidence.expiryDate || 0,
        validated: (confidence.expiryDate || 0) >= 0.8,
      });
    }
    if (data.qualificationName) {
      fields.push({
        key: 'qualificationName',
        label: 'Qualification',
        value: data.qualificationName,
        confidence: confidence.qualificationName || 0,
        validated: (confidence.qualificationName || 0) >= 0.8,
      });
    }
    if (data.issuingBody) {
      fields.push({
        key: 'issuer',
        label: 'Issuing body',
        value: data.issuingBody,
        confidence: confidence.issuingBody || 0,
        validated: (confidence.issuingBody || 0) >= 0.8,
      });
    }

    return fields;
  };

  const selectedDocConfig = DOCUMENT_TYPES.find((d) => d.type === selectedDocType);

  const verifiedCount = documents.filter((d) => d.verification_status === 'verified').length;
  const totalDocs = documents.length;
  const verificationProgress = totalDocs > 0 ? (verifiedCount / Math.max(totalDocs, 3)) * 100 : 0;

  const uploadContent = (
    <div className="space-y-4">
      {selectedDocConfig && !uploadPreview && (
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Eyebrow>Tips for best results</Eyebrow>
          <ul className="text-xs text-white mt-2 space-y-1">
            {selectedDocConfig.tips.map((tip, i) => (
              <li key={i}>· {tip}</li>
            ))}
          </ul>
        </div>
      )}

      {!uploadPreview ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              'border-2 border-dashed rounded-xl p-6 text-center transition-all touch-manipulation',
              isDragActive
                ? 'border-elec-yellow bg-elec-yellow/10'
                : 'border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08]'
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
              onChange={handleInputChange}
              className="hidden"
            />
            <p className="text-sm font-medium text-white">
              {isDragActive ? 'Drop your file here' : 'Upload file'}
            </p>
            <p className="text-xs text-white mt-1">PNG, JPG, PDF up to 10MB</p>
          </button>

          <button
            onClick={() => setIsCameraOpen(true)}
            className="border-2 border-dashed rounded-xl p-6 text-center transition-all border-white/[0.12] bg-white/[0.04] hover:border-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
          >
            <p className="text-sm font-medium text-white">Take photo</p>
            <p className="text-xs text-white mt-1">Use camera for best results</p>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <img
                src={uploadPreview}
                alt="Preview"
                className="w-full rounded-xl border border-white/[0.08]"
              />
              <button
                onClick={handleRetry}
                className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center bg-red-500 rounded-full text-white text-lg leading-none touch-manipulation"
                aria-label="Remove preview"
              >
                ×
              </button>
            </div>

            {(isVerifying || verificationResult) && (
              <OCRPreview
                documentType={selectedDocType}
                isProcessing={isVerifying}
                extractedFields={getOCRFields()}
                overallConfidence={verificationResult?.confidence || 0}
              />
            )}
          </div>

          {verificationResult?.status === 'rejected' && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-semibold text-red-400">Verification failed</p>
              <p className="text-sm text-white mt-1">{verificationResult.rejectionReason}</p>
              {verificationResult.suggestions && verificationResult.suggestions.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-white">Suggestions:</p>
                  <ul className="text-xs text-white mt-1 space-y-1">
                    {verificationResult.suggestions.map((s, i) => (
                      <li key={i}>· {s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {verificationResult?.status === 'needs_review' && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm font-semibold text-amber-400">Manual review required</p>
              <p className="text-sm text-white mt-1">
                We couldn't fully verify this document automatically. It's been queued for manual
                review. You can add corrections below to help speed up the process.
              </p>
            </div>
          )}

          {(isEditMode || verificationResult?.status === 'needs_review') && (
            <div className="space-y-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <Eyebrow>Verify or correct details</Eyebrow>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-xs text-white">Document name</Label>
                  <Input
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    placeholder="e.g. City & Guilds 2391"
                    className="h-11 text-sm bg-white/[0.04] border-white/[0.06] rounded-xl text-white placeholder:text-white touch-manipulation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white">Issuing body</Label>
                  <Input
                    value={issuingBody}
                    onChange={(e) => setIssuingBody(e.target.value)}
                    placeholder="e.g. JIB"
                    className="h-11 text-sm bg-white/[0.04] border-white/[0.06] rounded-xl text-white placeholder:text-white touch-manipulation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white">Document / card number</Label>
                  <Input
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="e.g. 1234-5678-9012"
                    className="h-11 text-sm bg-white/[0.04] border-white/[0.06] rounded-xl text-white placeholder:text-white touch-manipulation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white">Issue date</Label>
                  <Input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="h-11 text-sm bg-white/[0.04] border-white/[0.06] rounded-xl text-white touch-manipulation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white">Expiry date</Label>
                  <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="h-11 text-sm bg-white/[0.04] border-white/[0.06] rounded-xl text-white touch-manipulation"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {(isUploading || isVerifying) && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
            <span className="text-sm text-white">
              {isVerifying ? 'AI is analysing your document…' : 'Uploading…'}
            </span>
          </div>
          <Progress value={isVerifying ? 100 : uploadProgress} className="h-2" />
        </div>
      )}
    </div>
  );

  const uploadFooter = (
    <div className="flex gap-3">
      <button
        className="flex-1 h-11 rounded-xl border border-white/[0.06] text-white touch-manipulation disabled:opacity-60"
        onClick={() => setIsUploadDialogOpen(false)}
        disabled={isUploading || isVerifying}
      >
        Cancel
      </button>

      {!verificationResult ? (
        <button
          className="flex-1 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-60"
          onClick={handleUploadAndVerify}
          disabled={!uploadFile || isUploading || isVerifying}
        >
          {isUploading || isVerifying ? 'Working…' : 'Upload & verify'}
        </button>
      ) : verificationResult.status === 'rejected' ? (
        <>
          <button
            className="flex-1 h-11 rounded-xl border border-white/[0.06] text-white touch-manipulation"
            onClick={handleRetry}
          >
            Try again
          </button>
          <button
            className="flex-1 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-60"
            onClick={handleSaveCorrections}
            disabled={isVerifying}
          >
            Submit for review
          </button>
        </>
      ) : verificationResult.status === 'needs_review' ? (
        <button
          className="flex-1 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-60"
          onClick={handleSaveCorrections}
          disabled={isVerifying}
        >
          Save &amp; continue
        </button>
      ) : (
        <button
          className="flex-1 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold touch-manipulation"
          onClick={() => setIsUploadDialogOpen(false)}
        >
          Done
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6 sm:space-y-8 pb-6">
      {/* Verification progress hero */}
      <div className="relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-elec-yellow/20 p-5 sm:p-6">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - verificationProgress / 100)}`}
                className="text-elec-yellow transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold text-elec-yellow tabular-nums">
                {verifiedCount}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <Eyebrow>Document verification</Eyebrow>
            <h3 className="mt-1 text-lg font-semibold text-white">
              {verifiedCount === 0
                ? 'Upload documents to verify your identity'
                : verifiedCount === 1
                  ? '1 document verified'
                  : `${verifiedCount} documents verified`}
            </h3>
            {pendingVerifications.size > 0 && (
              <div className="mt-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-blue-400">
                  {pendingVerifications.size} processing
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document checklist */}
      <div>
        <SectionHeader eyebrow="Credentials" title="Document checklist" />
        <div className="mt-4">
          <ListCard>
            {DOCUMENT_TYPES.map((docType) => {
              const uploadedDocs = getDocumentsByType(docType.type);
              const hasVerified = uploadedDocs.some((d) => d.verification_status === 'verified');
              const hasPending = uploadedDocs.some(
                (d) =>
                  d.verification_status === 'pending' ||
                  d.verification_status === 'needs_review' ||
                  d.verification_status === 'appealed'
              );
              const hasRejected = uploadedDocs.some((d) => d.verification_status === 'rejected');
              const hasProcessing = uploadedDocs.some((d) => pendingVerifications.has(d.id));

              const tone: Tone = hasVerified
                ? 'emerald'
                : hasProcessing
                  ? 'blue'
                  : hasPending
                    ? 'amber'
                    : hasRejected
                      ? 'red'
                      : docType.tone;

              const statusLabel = hasVerified
                ? `${uploadedDocs.filter((d) => d.verification_status === 'verified').length} verified`
                : hasProcessing
                  ? 'Verifying…'
                  : hasPending
                    ? 'Awaiting review'
                    : hasRejected
                      ? 'Action required'
                      : docType.description;

              return (
                <React.Fragment key={docType.type}>
                  <ListRow
                    accent={tone}
                    title={
                      <span className="flex items-center gap-2">
                        {docType.label}
                        {docType.required && (
                          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-elec-yellow">
                            Required
                          </span>
                        )}
                      </span>
                    }
                    subtitle={statusLabel}
                    trailing={
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            'text-xs font-medium',
                            hasVerified
                              ? 'text-emerald-400'
                              : hasProcessing
                                ? 'text-blue-400'
                                : hasPending
                                  ? 'text-amber-400'
                                  : hasRejected
                                    ? 'text-red-400'
                                    : 'text-elec-yellow'
                          )}
                        >
                          {hasVerified
                            ? 'Verified'
                            : hasProcessing
                              ? 'Processing'
                              : hasPending
                                ? 'Pending'
                                : hasRejected
                                  ? 'Rejected'
                                  : 'Upload →'}
                        </span>
                      </span>
                    }
                    onClick={() => handleOpenUpload(docType.type)}
                  />

                  {uploadedDocs.length > 0 && (
                    <div className="px-5 sm:px-6 py-3 space-y-2 bg-white/[0.02]">
                      {uploadedDocs.map((doc) => {
                        const status = STATUS_META[doc.verification_status];
                        const isRejected = doc.verification_status === 'rejected';
                        const isProcessing = pendingVerifications.has(doc.id);

                        return (
                          <div
                            key={doc.id}
                            className={cn(
                              'flex items-center gap-3 p-3 rounded-xl',
                              isProcessing
                                ? 'bg-blue-500/10 border border-blue-500/20'
                                : 'bg-white/[0.04] border border-white/[0.06]'
                            )}
                          >
                            <Dot tone={isProcessing ? 'blue' : status.tone} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {isProcessing ? 'Verifying document…' : doc.document_name}
                              </p>
                              <p className="text-xs text-white">
                                {isProcessing ? 'AI is analysing' : status.label}
                                {!isProcessing &&
                                  doc.verification_confidence &&
                                  doc.verification_confidence > 0 && (
                                    <>
                                      {' '}
                                      · {Math.round(doc.verification_confidence * 100)}% confident
                                    </>
                                  )}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {isRejected && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenAppeal(doc);
                                  }}
                                  className="h-11 px-3 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 text-xs font-medium touch-manipulation"
                                >
                                  Appeal
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteDocument(doc.id);
                                }}
                                className="h-11 px-3 rounded-lg text-white hover:bg-red-500/10 hover:text-red-400 text-xs font-medium touch-manipulation"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </ListCard>
        </div>
      </div>

      {/* Upload drawer / dialog */}
      {isMobile ? (
        <Drawer.Root
          open={isUploadDialogOpen}
          onOpenChange={setIsUploadDialogOpen}
          shouldScaleBackground={false}
          noBodyStyles
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[92vh] bg-[hsl(0_0%_12%)] rounded-t-2xl border-t border-white/[0.06]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/[0.15]" />
              </div>
              <div className="px-5 pb-2">
                <h3 className="text-lg font-semibold text-white">
                  Upload {selectedDocConfig?.label}
                </h3>
                <p className="text-sm text-white">
                  Upload a clear photo or scan of your document. AI will verify it automatically.
                </p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">{uploadContent}</div>
              <div className="p-5 border-t border-white/[0.06]">{uploadFooter}</div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                Upload {selectedDocConfig?.label}
              </DialogTitle>
              <DialogDescription className="text-white">
                Upload a clear photo or scan of your document. AI will verify it automatically.
              </DialogDescription>
            </DialogHeader>
            <div className="pt-4">{uploadContent}</div>
            <DialogFooter className="pt-2">{uploadFooter}</DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <DocumentCamera
        open={isCameraOpen}
        onOpenChange={setIsCameraOpen}
        onCapture={handleCameraCapture}
        documentType={selectedDocType}
      />

      {/* Appeal dialog */}
      <Dialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
        <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Appeal rejection</DialogTitle>
            <DialogDescription className="text-white">
              If you believe this document was incorrectly rejected, you can submit an appeal for
              manual review.
            </DialogDescription>
          </DialogHeader>

          {rejectedDocument && (
            <div className="space-y-4 pt-4">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-1">Rejection reason</p>
                <p className="text-sm text-white">
                  {rejectedDocument.rejection_reason ||
                    'Document could not be verified automatically.'}
                </p>
              </div>

              <div>
                <Label className="text-sm text-white">Additional information (optional)</Label>
                <Textarea
                  value={appealNotes}
                  onChange={(e) => setAppealNotes(e.target.value)}
                  placeholder="Provide any additional context that might help our review team…"
                  className="mt-1.5 bg-white/[0.04] border-white/[0.06] rounded-xl text-white placeholder:text-white"
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 h-11 rounded-xl border border-white/[0.06] text-white touch-manipulation"
                  onClick={() => setIsRejectionDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 h-11 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold touch-manipulation disabled:opacity-60"
                  onClick={handleSubmitAppeal}
                  disabled={isSubmittingAppeal}
                >
                  {isSubmittingAppeal ? 'Submitting…' : 'Submit appeal'}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentUploader;
