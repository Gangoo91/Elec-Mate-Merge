import { useState, useRef } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Plus,
  Upload,
  Loader2,
  Trash2,
  ExternalLink,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useVehicleDocuments,
  useExpiringDocuments,
  useUploadDocument,
  useDeleteDocument,
  DOCUMENT_TYPES,
  type DocumentType,
} from '@/hooks/useVehicleDocuments';
import type { Vehicle } from '@/hooks/useFleet';
import {
  SheetShell,
  Field,
  FormCard,
  FormGrid,
  Pill,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

interface VehicleDocumentsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

export function VehicleDocumentsSheet({ open, onOpenChange, vehicle }: VehicleDocumentsSheetProps) {
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
        documentType: formData.get('document_type') as DocumentType,
        name: formData.get('name') as string,
        expiryDate: (formData.get('expiry_date') as string) || undefined,
        issueDate: (formData.get('issue_date') as string) || undefined,
        referenceNumber: (formData.get('reference_number') as string) || undefined,
        provider: (formData.get('provider') as string) || undefined,
      },
      {
        onSuccess: () => {
          setShowUploadForm(false);
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
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
    const today = new Date().toISOString().split('T')[0];
    const sevenDays = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const thirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (expiryDate < today) return 'expired';
    if (expiryDate <= sevenDays) return 'expiring-soon';
    if (expiryDate <= thirtyDays) return 'expiring';
    return 'valid';
  };

  const getExpiryPill = (status: string | null) => {
    switch (status) {
      case 'expired':
        return <Pill tone="red">Expired</Pill>;
      case 'expiring-soon':
        return <Pill tone="orange">Expiring soon</Pill>;
      case 'expiring':
        return <Pill tone="amber">Expiring</Pill>;
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 overflow-hidden">
        <SheetShell
          eyebrow="Vehicle documents"
          title={
            <span className="inline-flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Vehicle Documents
            </span>
          }
          description={`${vehicle.registration} — ${vehicle.make} ${vehicle.model}`}
        >
          {/* Expiry Alerts */}
          {expiring && (expiring.expired > 0 || expiring.expiringIn7Days > 0) && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-medium">
                  {expiring.expired > 0 && `${expiring.expired} expired`}
                  {expiring.expired > 0 && expiring.expiringIn7Days > 0 && ', '}
                  {expiring.expiringIn7Days > 0 && `${expiring.expiringIn7Days} expiring soon`}
                </span>
              </div>
            </div>
          )}

          {showUploadForm ? (
            <form onSubmit={handleUpload} className="space-y-4">
              <FormCard eyebrow="New document">
                <Field label="Document file" required>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.12] bg-[hsl(0_0%_9%)] hover:bg-white/[0.04] transition-colors touch-manipulation"
                  >
                    {selectedFile ? (
                      <>
                        <FileText className="h-8 w-8 text-blue-400" />
                        <span className="text-sm text-white font-medium">
                          {selectedFile.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-white" />
                        <span className="text-sm text-white">Tap to select file</span>
                      </>
                    )}
                  </button>
                </Field>

                <FormGrid cols={2}>
                  <Field label="Document type" required>
                    <Select name="document_type" required>
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {DOCUMENT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Document name" required>
                    <Input
                      name="name"
                      placeholder="e.g. MOT 2025"
                      required
                      className={inputClass}
                    />
                  </Field>
                </FormGrid>

                <FormGrid cols={2}>
                  <Field label="Issue date">
                    <Input name="issue_date" type="date" className={inputClass} />
                  </Field>
                  <Field label="Expiry date">
                    <Input name="expiry_date" type="date" className={inputClass} />
                  </Field>
                </FormGrid>

                <FormGrid cols={2}>
                  <Field label="Reference number">
                    <Input
                      name="reference_number"
                      placeholder="Policy/cert number"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Provider">
                    <Input
                      name="provider"
                      placeholder="e.g. Admiral"
                      className={inputClass}
                    />
                  </Field>
                </FormGrid>
              </FormCard>

              <div className="flex gap-3 pt-2">
                <SecondaryButton
                  fullWidth
                  onClick={() => {
                    setShowUploadForm(false);
                    setSelectedFile(null);
                  }}
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  type="submit"
                  fullWidth
                  disabled={!selectedFile || uploadDocument.isPending}
                >
                  {uploadDocument.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Upload'
                  )}
                </PrimaryButton>
              </div>
            </form>
          ) : (
            <>
              <PrimaryButton fullWidth onClick={() => setShowUploadForm(true)}>
                <Plus className="h-5 w-5 mr-2" />
                Upload document
              </PrimaryButton>

              {/* Document List */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-white mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-white">No documents uploaded</p>
                  <p className="text-xs text-white mt-1">
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
                          'p-4 rounded-2xl border bg-[hsl(0_0%_12%)] touch-manipulation',
                          expiryStatus === 'expired'
                            ? 'border-red-500/30'
                            : expiryStatus === 'expiring-soon'
                              ? 'border-orange-500/30'
                              : 'border-white/[0.06]'
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-base truncate">
                              {doc.name}
                            </h4>
                            <p className="text-sm text-white">
                              {DOCUMENT_TYPES.find((t) => t.value === doc.document_type)?.label}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              type="button"
                              aria-label="Open document"
                              className="h-11 w-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors touch-manipulation"
                              onClick={() => openExternalUrl(doc.file_url)}
                            >
                              <ExternalLink className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              aria-label="Delete document"
                              className="h-11 w-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-red-400 flex items-center justify-center hover:bg-red-500/15 transition-colors touch-manipulation"
                              onClick={() => handleDelete(doc)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {getExpiryPill(expiryStatus)}
                          {doc.reference_number && (
                            <Pill tone="yellow">Ref: {doc.reference_number}</Pill>
                          )}
                          {doc.provider && <Pill tone="blue">{doc.provider}</Pill>}
                        </div>

                        {doc.expiry_date && (
                          <div className="flex items-center gap-2 mt-3 text-sm">
                            <Calendar className="h-4 w-4 text-white" />
                            <span
                              className={cn(
                                expiryStatus === 'expired'
                                  ? 'text-red-400'
                                  : expiryStatus === 'expiring-soon'
                                    ? 'text-orange-400'
                                    : 'text-white'
                              )}
                            >
                              Expires: {new Date(doc.expiry_date).toLocaleDateString('en-GB')}
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
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
