import React, { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  IdCard,
  GraduationCap,
  Award,
  Car,
  Shield,
  HardHat,
  Upload,
  Camera,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  X,
  Eye,
  Trash2,
  RefreshCw,
  Sparkles,
  Loader2,
  AlertTriangle,
  MessageSquare,
  ChevronRight,
  Lightbulb,
  Edit3,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import DocumentCamera from "./DocumentCamera";
import { OCRPreview, type ExtractedField } from "./OCRPreview";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";

// Document type configuration
const DOCUMENT_TYPES = [
  {
    type: "ecs_card",
    label: "ECS Card",
    icon: IdCard,
    description: "JIB Electrotechnical Certification Scheme card",
    required: true,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    tips: [
      "Place card on a dark, flat surface",
      "Ensure all text and photo are visible",
      "Avoid glare on holographic elements",
    ],
  },
  {
    type: "qualification",
    label: "Qualification",
    icon: GraduationCap,
    description: "City & Guilds, NVQ, or other formal qualifications",
    required: false,
    multiple: true,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    tips: [
      "Capture entire certificate",
      "Certificate number must be visible",
      "Include issuing body logo if possible",
    ],
  },
  {
    type: "training",
    label: "Training Certificate",
    icon: Award,
    description: "Course completion certificates",
    required: false,
    multiple: true,
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    tips: [
      "Show completion date clearly",
      "Include provider name",
      "Capture any unique identifiers",
    ],
  },
  {
    type: "cscs",
    label: "CSCS Card",
    icon: HardHat,
    description: "Construction Skills Certification Scheme card",
    required: false,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
    tips: [
      "Place on contrasting background",
      "Card number must be readable",
      "Show expiry date clearly",
    ],
  },
  {
    type: "driving_licence",
    label: "Driving Licence",
    icon: Car,
    description: "UK driving licence for verification",
    required: false,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    tips: [
      "Capture front of licence",
      "Avoid covering any information",
      "Holograms may cause glare",
    ],
  },
  {
    type: "insurance",
    label: "Insurance",
    icon: Shield,
    description: "Public liability or professional indemnity insurance",
    required: false,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20",
    tips: [
      "Show policy number clearly",
      "Coverage amount must be visible",
      "Include expiry/renewal date",
    ],
  },
];

// Verification status configuration
const VERIFICATION_STATUS = {
  pending: {
    label: "Pending Review",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    icon: Loader2,
  },
  verified: {
    label: "Verified",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    icon: CheckCircle2,
  },
  needs_review: {
    label: "Under Review",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
    icon: Eye,
  },
  rejected: {
    label: "Rejected",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    icon: AlertCircle,
  },
  expired: {
    label: "Expired",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
    icon: AlertTriangle,
  },
  appealed: {
    label: "Appeal Submitted",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    icon: MessageSquare,
  },
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
  display_url?: string;  // Generated signed URL for display
  verification_status: keyof typeof VERIFICATION_STATUS;
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
  status: "verified" | "needs_review" | "rejected";
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

const DocumentUploader = ({ onNavigate }: DocumentUploaderProps) => {
  const { profile } = useElecIdProfile();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  // Form fields for manual entry/correction
  const [documentName, setDocumentName] = useState("");
  const [issuingBody, setIssuingBody] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Rejection handling
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [rejectedDocument, setRejectedDocument] = useState<Document | null>(null);
  const [appealNotes, setAppealNotes] = useState("");
  const [isSubmittingAppeal, setIsSubmittingAppeal] = useState(false);

  // Edit mode for corrections
  const [isEditMode, setIsEditMode] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Fetch existing documents on mount
  useEffect(() => {
    if (profile?.id) {
      fetchDocuments();
    }
  }, [profile?.id]);

  const fetchDocuments = async () => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from("elec_id_documents")
        .select("*")
        .eq("profile_id", profile.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Generate signed URLs for documents that have file_path stored
      // file_url/file_path now stores the storage path, not a signed URL
      const docsWithUrls = await Promise.all(
        (data || []).map(async (doc) => {
          if (doc.file_path || doc.file_url) {
            const filePath = doc.file_path || doc.file_url;
            // Skip if it's already a full URL (legacy data)
            if (filePath.startsWith('http')) {
              return doc;
            }
            // Generate signed URL for display (valid for 1 hour)
            const { data: urlData } = await supabase.storage
              .from("elec-id-documents")
              .createSignedUrl(filePath, 3600);
            return {
              ...doc,
              display_url: urlData?.signedUrl || null
            };
          }
          return doc;
        })
      );

      setDocuments(docsWithUrls || []);
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  const handleFileSelect = useCallback((file: File) => {
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PNG, JPG, or PDF file",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "File must be less than 10MB",
          variant: "destructive",
        });
        return;
      }
      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadPreview(reader.result as string);
      };
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

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleOpenUpload = (docType: string) => {
    setSelectedDocType(docType);
    setUploadFile(null);
    setUploadPreview(null);
    setDocumentName("");
    setIssuingBody("");
    setDocumentNumber("");
    setIssueDate("");
    setExpiryDate("");
    setVerificationResult(null);
    setIsEditMode(false);
    setIsUploadDialogOpen(true);
  };

  const handleUploadAndVerify = async () => {
    if (!uploadFile || !selectedDocType || !profile?.id) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload file to Supabase Storage
      const fileExt = uploadFile.name.split(".").pop();
      const fileName = `${profile.id}/${selectedDocType}_${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("elec-id-documents")
        .upload(fileName, uploadFile);

      if (uploadError) {
        throw uploadError;
      }

      setUploadProgress(100);
      setIsUploading(false);
      setIsVerifying(true);

      // INSERT document record into database BEFORE verification
      // This is critical - the verify-document function needs a record to UPDATE
      const { data: docRecord, error: insertError } = await supabase
        .from("elec_id_documents")
        .insert({
          profile_id: profile.id,
          document_type: selectedDocType,
          document_name: documentName || uploadFile.name,
          file_path: fileName,  // Store permanent path, NOT signed URL
          file_url: fileName,   // Store path - generate signed URL when displaying
          verification_status: "pending",
          issuing_body: issuingBody || null,
          document_number: documentNumber || null,
          issue_date: issueDate || null,
          expiry_date: expiryDate || null,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Failed to create document record:", insertError);
        throw new Error("Failed to save document record");
      }

      // Get signed URL for AI verification (1 hour expiry)
      console.log("[Elec-ID] Getting signed URL for document...");
      const { data: urlData, error: urlError } = await supabase.storage
        .from("elec-id-documents")
        .createSignedUrl(fileName, 3600);

      if (urlError || !urlData?.signedUrl) {
        console.error("[Elec-ID] Failed to get signed URL:", urlError);
        throw new Error("Failed to generate document URL for verification");
      }
      console.log("[Elec-ID] Signed URL obtained, starting background verification...");

      // Fire verification in background - don't wait for it
      // This prevents the spinner from hanging while Gemini processes the image
      supabase.functions.invoke(
        "verify-document",
        {
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
        }
      ).then(({ data: verifyResult, error: verifyError }) => {
        console.log("[Elec-ID] Background verification complete:", { verifyResult, verifyError });
        if (verifyError) {
          console.error("[Elec-ID] Background verification error:", verifyError);
        }
        // Refresh documents list to show updated status
        fetchDocuments();
      }).catch((err) => {
        console.error("[Elec-ID] Background verification failed:", err);
      });

      // Show success immediately - verification happens in background
      toast({
        title: "Document Uploaded",
        description: "Your document is being verified. This may take a moment.",
      });

      // Refresh list and close dialog
      await fetchDocuments();
      setIsUploadDialogOpen(false);

    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload document",
        variant: "destructive",
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
      // Update the document with user corrections
      const { error } = await supabase
        .from("elec_id_documents")
        .update({
          document_name: documentName,
          issuing_body: issuingBody,
          document_number: documentNumber,
          issue_date: issueDate || null,
          expiry_date: expiryDate || null,
          verification_status: "needs_review",
          user_corrections: {
            documentName,
            issuingBody,
            documentNumber,
            issueDate,
            expiryDate,
          },
          corrections_applied_at: new Date().toISOString(),
        })
        .eq("profile_id", profile.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;

      toast({
        title: "Corrections Saved",
        description: "Your corrections have been saved and the document is under review.",
      });

      await fetchDocuments();
      setIsUploadDialogOpen(false);
    } catch (err: any) {
      console.error("Error saving corrections:", err);
      toast({
        title: "Error",
        description: "Failed to save corrections",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    try {
      const { error } = await supabase
        .from("elec_id_documents")
        .delete()
        .eq("id", docId);

      if (error) throw error;

      setDocuments((prev) => prev.filter((d) => d.id !== docId));
      toast({
        title: "Document Removed",
        description: "The document has been removed from your profile.",
      });
    } catch (err: any) {
      console.error("Delete error:", err);
      toast({
        title: "Error",
        description: "Failed to remove document",
        variant: "destructive",
      });
    }
  };

  const handleOpenAppeal = (doc: Document) => {
    setRejectedDocument(doc);
    setAppealNotes("");
    setIsRejectionDialogOpen(true);
  };

  const handleSubmitAppeal = async () => {
    if (!rejectedDocument) return;

    setIsSubmittingAppeal(true);

    try {
      const { error } = await supabase
        .from("elec_id_documents")
        .update({
          verification_status: "appealed",
          appeal_submitted_at: new Date().toISOString(),
          appeal_notes: appealNotes,
        })
        .eq("id", rejectedDocument.id);

      if (error) throw error;

      toast({
        title: "Appeal Submitted",
        description: "Your appeal has been submitted for manual review. We'll get back to you within 24-48 hours.",
      });

      await fetchDocuments();
      setIsRejectionDialogOpen(false);
    } catch (err: any) {
      console.error("Appeal error:", err);
      toast({
        title: "Error",
        description: "Failed to submit appeal",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingAppeal(false);
    }
  };

  const getDocumentsByType = (type: string) => {
    return documents.filter((d) => d.document_type === type);
  };

  const getOCRFields = (): ExtractedField[] => {
    if (!verificationResult) return [];

    const fields: ExtractedField[] = [];
    const data = verificationResult.extractedData;
    const confidence = verificationResult.extractionConfidence;

    if (data.cardType) {
      fields.push({
        key: "cardType",
        label: "Card Type",
        value: data.cardType,
        confidence: confidence.cardType || 0,
        validated: (confidence.cardType || 0) >= 0.8,
      });
    }
    if (data.cardNumber || data.certificateNumber || data.licenceNumber) {
      fields.push({
        key: "cardNumber",
        label: "Document Number",
        value: data.cardNumber || data.certificateNumber || data.licenceNumber,
        confidence: confidence.cardNumber || confidence.certificateNumber || confidence.licenceNumber || 0,
        validated: (confidence.cardNumber || confidence.certificateNumber || confidence.licenceNumber || 0) >= 0.8,
      });
    }
    if (data.holderName) {
      fields.push({
        key: "holderName",
        label: "Holder Name",
        value: data.holderName,
        confidence: confidence.holderName || 0,
        validated: (confidence.holderName || 0) >= 0.8,
      });
    }
    if (data.expiryDate) {
      fields.push({
        key: "expiryDate",
        label: "Expiry Date",
        value: data.expiryDate,
        confidence: confidence.expiryDate || 0,
        validated: (confidence.expiryDate || 0) >= 0.8,
      });
    }
    if (data.qualificationName) {
      fields.push({
        key: "qualificationName",
        label: "Qualification",
        value: data.qualificationName,
        confidence: confidence.qualificationName || 0,
        validated: (confidence.qualificationName || 0) >= 0.8,
      });
    }
    if (data.issuingBody) {
      fields.push({
        key: "issuer",
        label: "Issuing Body",
        value: data.issuingBody,
        confidence: confidence.issuingBody || 0,
        validated: (confidence.issuingBody || 0) >= 0.8,
      });
    }

    return fields;
  };

  const selectedDocConfig = DOCUMENT_TYPES.find((d) => d.type === selectedDocType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Document Verification</h3>
          <p className="text-sm text-foreground/70">
            Upload and verify your credentials to increase your verification tier
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <FileCheck className="h-3 w-3" />
          {documents.filter((d) => d.verification_status === "verified").length} verified
        </Badge>
      </div>

      {/* Document Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOCUMENT_TYPES.map((docType) => {
          const Icon = docType.icon;
          const uploadedDocs = getDocumentsByType(docType.type);
          const hasVerified = uploadedDocs.some((d) => d.verification_status === "verified");
          const hasPending = uploadedDocs.some((d) =>
            d.verification_status === "pending" ||
            d.verification_status === "needs_review" ||
            d.verification_status === "appealed"
          );
          const hasRejected = uploadedDocs.some((d) => d.verification_status === "rejected");

          return (
            <Card
              key={docType.type}
              className={cn(
                "border transition-all hover:border-white/30",
                hasVerified ? "bg-green-500/5 border-green-500/30" :
                hasPending ? "bg-amber-500/5 border-amber-500/30" :
                hasRejected ? "bg-red-500/5 border-red-500/30" :
                "bg-white/5 border-white/10"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("p-2.5 rounded-xl", docType.bgColor)}>
                    <Icon className={cn("h-5 w-5", docType.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{docType.label}</h4>
                      {docType.required && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-foreground/70 mt-0.5 line-clamp-2">
                      {docType.description}
                    </p>

                    {/* Uploaded documents */}
                    {uploadedDocs.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {uploadedDocs.map((doc) => {
                          const status = VERIFICATION_STATUS[doc.verification_status];
                          const StatusIcon = status.icon;
                          const isRejected = doc.verification_status === "rejected";

                          return (
                            <div
                              key={doc.id}
                              className={cn(
                                "flex items-center gap-2 p-2 rounded-lg text-xs",
                                status.bgColor
                              )}
                            >
                              <StatusIcon className={cn(
                                "h-3.5 w-3.5",
                                status.color,
                                doc.verification_status === "processing" && "animate-spin"
                              )} />
                              <span className="flex-1 truncate text-foreground">
                                {doc.document_name}
                              </span>
                              {doc.verification_confidence && doc.verification_confidence > 0 && (
                                <span className={cn("text-[10px]", status.color)}>
                                  {Math.round(doc.verification_confidence * 100)}%
                                </span>
                              )}
                              {isRejected && (
                                <button
                                  onClick={() => handleOpenAppeal(doc)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                  title="Appeal rejection"
                                >
                                  <MessageSquare className="h-3 w-3" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteDocument(doc.id)}
                                className="text-foreground/70 hover:text-red-400 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Upload button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full h-11 text-sm border-white/20 touch-manipulation active:scale-[0.98]"
                      onClick={() => handleOpenUpload(docType.type)}
                    >
                      <Upload className="h-3 w-3 mr-1.5" />
                      {uploadedDocs.length > 0 && docType.multiple
                        ? "Add Another"
                        : uploadedDocs.length > 0
                        ? "Replace"
                        : "Upload"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="bg-elec-gray border-white/20 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedDocConfig && (
                <>
                  {React.createElement(selectedDocConfig.icon, {
                    className: cn("h-5 w-5", selectedDocConfig.color),
                  })}
                  Upload {selectedDocConfig.label}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              Upload a clear photo or scan of your document. Our AI will verify it automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {/* Tips for this document type */}
            {selectedDocConfig && !uploadPreview && (
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-400">Tips for best results</p>
                    <ul className="text-xs text-foreground/70 mt-1 space-y-0.5">
                      {selectedDocConfig.tips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* File Upload Area or Preview */}
            {!uploadPreview ? (
              <div className="grid grid-cols-2 gap-4">
                {/* Drag & Drop */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={cn(
                    "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all",
                    isDragActive
                      ? "border-elec-yellow bg-elec-yellow/10"
                      : "border-white/20 hover:border-white/40"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                    <Upload className="h-6 w-6 text-foreground/70" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {isDragActive ? "Drop your file here" : "Upload file"}
                  </p>
                  <p className="text-xs text-foreground/70 mt-1">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>

                {/* Camera Option */}
                <div
                  onClick={() => setIsCameraOpen(true)}
                  className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all border-white/20 hover:border-elec-yellow hover:bg-elec-yellow/5"
                >
                  <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center mx-auto mb-3">
                    <Camera className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Take photo
                  </p>
                  <p className="text-xs text-foreground/70 mt-1">
                    Use camera for best results
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Preview and OCR side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Image Preview */}
                  <div className="relative">
                    <img
                      src={uploadPreview}
                      alt="Preview"
                      className="w-full rounded-lg border border-white/20"
                    />
                    <button
                      onClick={handleRetry}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* OCR Preview */}
                  {(isVerifying || verificationResult) && (
                    <OCRPreview
                      documentType={selectedDocType}
                      isProcessing={isVerifying}
                      extractedFields={getOCRFields()}
                      overallConfidence={verificationResult?.confidence || 0}
                    />
                  )}
                </div>

                {/* Rejection Alert */}
                {verificationResult?.status === "rejected" && (
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/30">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Verification Failed</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2">{verificationResult.rejectionReason}</p>
                      {verificationResult.suggestions && verificationResult.suggestions.length > 0 && (
                        <div className="mt-2">
                          <p className="font-medium mb-1">Suggestions:</p>
                          <ul className="text-sm space-y-1">
                            {verificationResult.suggestions.map((suggestion, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <ChevronRight className="h-3 w-3 mt-1 shrink-0" />
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Needs Review Alert */}
                {verificationResult?.status === "needs_review" && (
                  <Alert className="bg-amber-500/10 border-amber-500/30">
                    <Eye className="h-4 w-4 text-amber-400" />
                    <AlertTitle className="text-amber-400">Manual Review Required</AlertTitle>
                    <AlertDescription className="text-amber-200/80">
                      We couldn't fully verify this document automatically. It's been queued for manual review.
                      You can add corrections below to help speed up the process.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Manual entry/correction fields */}
                {(isEditMode || verificationResult?.status === "needs_review") && (
                  <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Edit3 className="h-4 w-4 text-foreground/70" />
                      <span className="text-sm font-medium">Verify or correct details</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <Label className="text-xs text-foreground/70">Document Name</Label>
                        <Input
                          value={documentName}
                          onChange={(e) => setDocumentName(e.target.value)}
                          placeholder="e.g., City & Guilds 2391"
                          className="h-9 text-sm bg-white/5 border-white/20"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-foreground/70">Issuing Body</Label>
                        <Input
                          value={issuingBody}
                          onChange={(e) => setIssuingBody(e.target.value)}
                          placeholder="e.g., JIB"
                          className="h-9 text-sm bg-white/5 border-white/20"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-foreground/70">Document/Card Number</Label>
                        <Input
                          value={documentNumber}
                          onChange={(e) => setDocumentNumber(e.target.value)}
                          placeholder="e.g., 1234-5678-9012"
                          className="h-9 text-sm bg-white/5 border-white/20"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-foreground/70">Issue Date</Label>
                        <Input
                          type="date"
                          value={issueDate}
                          onChange={(e) => setIssueDate(e.target.value)}
                          className="h-9 text-sm bg-white/5 border-white/20"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-foreground/70">Expiry Date</Label>
                        <Input
                          type="date"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="h-9 text-sm bg-white/5 border-white/20"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Progress indicators */}
            {(isUploading || isVerifying) && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {isVerifying ? (
                    <Sparkles className="h-4 w-4 text-elec-yellow animate-pulse" />
                  ) : (
                    <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
                  )}
                  <span className="text-sm text-foreground">
                    {isVerifying ? "AI is analysing your document..." : "Uploading..."}
                  </span>
                </div>
                <Progress value={isVerifying ? 100 : uploadProgress} className="h-2" />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 border-white/20"
                onClick={() => setIsUploadDialogOpen(false)}
                disabled={isUploading || isVerifying}
              >
                Cancel
              </Button>

              {!verificationResult ? (
                <Button
                  className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark"
                  onClick={handleUploadAndVerify}
                  disabled={!uploadFile || isUploading || isVerifying}
                >
                  {isUploading || isVerifying ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  Upload & Verify
                </Button>
              ) : verificationResult.status === "rejected" ? (
                <>
                  <Button
                    variant="outline"
                    className="flex-1 border-white/20"
                    onClick={handleRetry}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark"
                    onClick={handleSaveCorrections}
                    disabled={isVerifying}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit for Review
                  </Button>
                </>
              ) : verificationResult.status === "needs_review" ? (
                <Button
                  className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark"
                  onClick={handleSaveCorrections}
                  disabled={isVerifying}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Save & Continue
                </Button>
              ) : (
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => setIsUploadDialogOpen(false)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Done
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Camera Dialog */}
      <DocumentCamera
        open={isCameraOpen}
        onOpenChange={setIsCameraOpen}
        onCapture={handleCameraCapture}
        documentType={selectedDocType}
      />

      {/* Appeal Dialog */}
      <Dialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
        <DialogContent className="bg-elec-gray border-white/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              Appeal Rejection
            </DialogTitle>
            <DialogDescription>
              If you believe this document was incorrectly rejected, you can submit an appeal for manual review.
            </DialogDescription>
          </DialogHeader>

          {rejectedDocument && (
            <div className="space-y-4 pt-4">
              {/* Show rejection reason */}
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-1">Rejection Reason:</p>
                <p className="text-sm text-foreground/70">
                  {rejectedDocument.rejection_reason || "Document could not be verified automatically."}
                </p>
              </div>

              {/* Appeal notes */}
              <div>
                <Label className="text-sm">Additional Information (Optional)</Label>
                <Textarea
                  value={appealNotes}
                  onChange={(e) => setAppealNotes(e.target.value)}
                  placeholder="Provide any additional context that might help our review team..."
                  className="mt-1.5 bg-white/5 border-white/20"
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-white/20"
                  onClick={() => setIsRejectionDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-purple-500 hover:bg-purple-600"
                  onClick={handleSubmitAppeal}
                  disabled={isSubmittingAppeal}
                >
                  {isSubmittingAppeal ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Submit Appeal
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentUploader;
