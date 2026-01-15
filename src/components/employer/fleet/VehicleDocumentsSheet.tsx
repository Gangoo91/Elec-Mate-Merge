import { useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  X,
  Plus,
  Upload,
  Loader2,
  Trash2,
  ExternalLink,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useVehicleDocuments,
  useExpiringDocuments,
  useUploadDocument,
  useDeleteDocument,
  DOCUMENT_TYPES,
  type DocumentType,
} from "@/hooks/useVehicleDocuments";
import type { Vehicle } from "@/hooks/useFleet";

interface VehicleDocumentsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

export function VehicleDocumentsSheet({
  open,
  onOpenChange,
  vehicle,
}: VehicleDocumentsSheetProps) {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: documents = [], isLoading } = useVehicleDocuments(vehicle.id);
  const { data: expiring } = useExpiringDocuments(vehicle.id);
  const uploadDocument = useUploadDocument();
  const deleteDocument = useDeleteDocument();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData(e.currentTarget);

    uploadDocument.mutate(
      {
        file: selectedFile,
        vehicleId: vehicle.id,
        documentType: formData.get("document_type") as DocumentType,
        name: formData.get("name") as string,
        expiryDate: (formData.get("expiry_date") as string) || undefined,
        issueDate: (formData.get("issue_date") as string) || undefined,
        referenceNumber: (formData.get("reference_number") as string) || undefined,
        provider: (formData.get("provider") as string) || undefined,
      },
      {
        onSuccess: () => {
          setShowUploadForm(false);
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        },
      }
    );
  };

  const handleDelete = (doc: { id: string; name: string; file_url: string }) => {
    if (confirm(`Delete "${doc.name}"?`)) {
      deleteDocument.mutate({
        id: doc.id,
        vehicleId: vehicle.id,
        fileUrl: doc.file_url,
      });
    }
  };

  const getExpiryStatus = (expiryDate: string | undefined) => {
    if (!expiryDate) return null;
    const today = new Date().toISOString().split("T")[0];
    const sevenDays = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const thirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    if (expiryDate < today) return "expired";
    if (expiryDate <= sevenDays) return "expiring-soon";
    if (expiryDate <= thirtyDays) return "expiring";
    return "valid";
  };

  const getExpiryBadge = (status: string | null) => {
    switch (status) {
      case "expired":
        return <Badge className="bg-red-500/20 text-red-400 border-0">Expired</Badge>;
      case "expiring-soon":
        return <Badge className="bg-orange-500/20 text-orange-400 border-0">Expiring Soon</Badge>;
      case "expiring":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-0">Expiring</Badge>;
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <SheetTitle className="text-left">Vehicle Documents</SheetTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {vehicle.registration} - {vehicle.make} {vehicle.model}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="shrink-0 h-11 w-11 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Expiry Alerts */}
          {expiring && (expiring.expired > 0 || expiring.expiringIn7Days > 0) && (
            <div className="p-4 border-b border-border bg-red-500/5">
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-medium">
                  {expiring.expired > 0 && `${expiring.expired} expired`}
                  {expiring.expired > 0 && expiring.expiringIn7Days > 0 && ", "}
                  {expiring.expiringIn7Days > 0 && `${expiring.expiringIn7Days} expiring soon`}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {showUploadForm ? (
              <form onSubmit={handleUpload} className="space-y-4">
                {/* File Selection */}
                <div>
                  <Label className="text-sm font-medium">Document File *</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 mt-1.5 flex flex-col items-center justify-center gap-2 border-dashed touch-manipulation"
                  >
                    {selectedFile ? (
                      <>
                        <FileText className="h-8 w-8 text-blue-400" />
                        <span className="text-sm text-foreground font-medium">{selectedFile.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Tap to select file
                        </span>
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium">Document Type *</Label>
                    <Select name="document_type" required>
                      <SelectTrigger className="h-11 mt-1.5 touch-manipulation">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className="z-[100]">
                        {DOCUMENT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Document Name *</Label>
                    <Input
                      name="name"
                      placeholder="e.g. MOT 2025"
                      required
                      className="h-11 mt-1.5 touch-manipulation text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium">Issue Date</Label>
                    <Input name="issue_date" type="date" className="h-11 mt-1.5 touch-manipulation text-base" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Expiry Date</Label>
                    <Input name="expiry_date" type="date" className="h-11 mt-1.5 touch-manipulation text-base" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium">Reference Number</Label>
                    <Input
                      name="reference_number"
                      placeholder="Policy/Cert number"
                      className="h-11 mt-1.5 touch-manipulation text-base"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Provider</Label>
                    <Input
                      name="provider"
                      placeholder="e.g. Admiral"
                      className="h-11 mt-1.5 touch-manipulation text-base"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowUploadForm(false);
                      setSelectedFile(null);
                    }}
                    className="flex-1 h-12 touch-manipulation text-base"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!selectedFile || uploadDocument.isPending}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 touch-manipulation text-base"
                  >
                    {uploadDocument.isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <>
                {/* Upload Button */}
                <Button
                  onClick={() => setShowUploadForm(true)}
                  className="w-full h-12 mb-4 bg-blue-600 hover:bg-blue-700 touch-manipulation text-base"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Upload Document
                </Button>

                {/* Document List */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-sm text-muted-foreground">No documents uploaded</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload MOT, insurance, V5 and more
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => {
                      const expiryStatus = getExpiryStatus(doc.expiry_date);
                      return (
                        <div
                          key={doc.id}
                          className={cn(
                            "p-4 rounded-xl border bg-card/50 touch-manipulation",
                            expiryStatus === "expired"
                              ? "border-red-500/30"
                              : expiryStatus === "expiring-soon"
                              ? "border-orange-500/30"
                              : "border-border"
                          )}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground text-base truncate">
                                {doc.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {DOCUMENT_TYPES.find((t) => t.value === doc.document_type)?.label}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-11 w-11 touch-manipulation"
                                onClick={() => window.open(doc.file_url, "_blank")}
                              >
                                <ExternalLink className="h-5 w-5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-11 w-11 touch-manipulation text-red-400"
                                onClick={() => handleDelete(doc)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {getExpiryBadge(expiryStatus)}
                            {doc.reference_number && (
                              <Badge variant="outline" className="text-xs">
                                Ref: {doc.reference_number}
                              </Badge>
                            )}
                            {doc.provider && (
                              <Badge variant="outline" className="text-xs">
                                {doc.provider}
                              </Badge>
                            )}
                          </div>

                          {doc.expiry_date && (
                            <div className="flex items-center gap-2 mt-3 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className={cn(
                                expiryStatus === "expired" ? "text-red-400" :
                                expiryStatus === "expiring-soon" ? "text-orange-400" :
                                "text-muted-foreground"
                              )}>
                                Expires: {new Date(doc.expiry_date).toLocaleDateString("en-GB")}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
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
