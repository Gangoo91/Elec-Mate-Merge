import React, { useState, useRef, useCallback } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useCustomers } from '@/hooks/inspection/useCustomers';
import { useLegacyCertificates, CertificateType, CreateLegacyCertificateInput } from '@/hooks/useLegacyCertificates';
import {
  Upload,
  FileUp,
  X,
  Loader2,
  FileText,
  Check,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface LegacyCertificateUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CERTIFICATE_TYPES: { value: CertificateType; label: string }[] = [
  { value: 'eicr', label: 'EICR' },
  { value: 'eic', label: 'EIC' },
  { value: 'minor-works', label: 'Minor Works' },
  { value: 'pir', label: 'PIR' },
  { value: 'other', label: 'Other' },
];

const IMPORT_SOURCES = [
  { value: 'certsure', label: 'Certsure' },
  { value: 'icertifi', label: 'iCertifi' },
  { value: 'easy-cert', label: 'Easy Cert' },
  { value: 'pro-certs', label: 'Pro Certs' },
  { value: 'other', label: 'Other Software' },
  { value: 'manual', label: 'Manual/Paper' },
];

export const LegacyCertificateUpload: React.FC<LegacyCertificateUploadProps> = ({
  open,
  onOpenChange,
}) => {
  const { customers } = useCustomers({});
  const { uploadCertificate, bulkUpload, isUploading } = useLegacyCertificates();

  const [mode, setMode] = useState<'select' | 'single' | 'bulk'>('select');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ successful: number; failed: number } | null>(null);

  // Form state for single upload
  const [formData, setFormData] = useState({
    certificate_type: '' as CertificateType | '',
    certificate_number: '',
    client_name: '',
    installation_address: '',
    issue_date: '',
    expiry_date: '',
    issuing_company: '',
    imported_from_system: '',
    customer_id: '',
    notes: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setMode('select');
    setSelectedFile(null);
    setBulkFiles([]);
    setUploadProgress(null);
    setFormData({
      certificate_type: '',
      certificate_number: '',
      client_name: '',
      installation_address: '',
      issue_date: '',
      expiry_date: '',
      issuing_company: '',
      imported_from_system: '',
      customer_id: '',
      notes: '',
    });
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );

    if (files.length === 0) return;

    if (files.length === 1) {
      setSelectedFile(files[0]);
      setMode('single');
    } else {
      setBulkFiles(files);
      setMode('bulk');
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setMode('single');
    }
  };

  const handleBulkFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      file => file.type === 'application/pdf'
    );
    if (files.length > 0) {
      setBulkFiles(files);
      setMode('bulk');
    }
  };

  const handleSingleUpload = async () => {
    if (!selectedFile) return;

    try {
      const input: CreateLegacyCertificateInput = {
        file: selectedFile,
        certificate_type: formData.certificate_type || undefined,
        certificate_number: formData.certificate_number || undefined,
        client_name: formData.client_name || undefined,
        installation_address: formData.installation_address || undefined,
        issue_date: formData.issue_date || undefined,
        expiry_date: formData.expiry_date || undefined,
        issuing_company: formData.issuing_company || undefined,
        imported_from_system: formData.imported_from_system || undefined,
        customer_id: formData.customer_id || undefined,
        notes: formData.notes || undefined,
      };

      await uploadCertificate(input);
      handleClose();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleBulkUpload = async () => {
    if (bulkFiles.length === 0) return;

    try {
      const results = await bulkUpload(bulkFiles);
      setUploadProgress(results);

      // Auto-close after success if no errors
      if (results.failed === 0) {
        setTimeout(handleClose, 1500);
      }
    } catch (error) {
      // Error handled in hook
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl flex flex-col">
        <div className="flex flex-col h-full bg-background">
          <SheetHeader className="px-4 py-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <FileUp className="h-5 w-5 text-elec-yellow" />
              Import Legacy Certificates
            </SheetTitle>
            <SheetDescription>
              Upload existing certificates from other software
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain p-4">
            {mode === 'select' && (
              <div className="space-y-4">
                {/* Drop zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    'border-2 border-dashed rounded-xl p-8 text-center transition-colors',
                    isDragging
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-border hover:border-elec-yellow/50'
                  )}
                >
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Drop PDF files here</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or choose how to upload
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-11 touch-manipulation"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Single Certificate
                    </Button>
                    <Button
                      variant="accent"
                      onClick={() => bulkInputRef.current?.click()}
                      className="h-11 touch-manipulation"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Bulk Upload
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <input
                    ref={bulkInputRef}
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handleBulkFileSelect}
                    className="hidden"
                  />
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  PDF files only, max 10MB each
                </p>
              </div>
            )}

            {mode === 'single' && selectedFile && (
              <div className="space-y-4">
                {/* Selected file preview */}
                <div className="flex items-center gap-3 p-3 bg-elec-gray rounded-lg">
                  <FileText className="h-8 w-8 text-elec-yellow shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedFile(null);
                      setMode('select');
                    }}
                    className="h-8 w-8 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Metadata form */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Certificate Details (Optional)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Certificate Type</Label>
                      <MobileSelectPicker
                        value={formData.certificate_type}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, certificate_type: value as CertificateType }))}
                        options={CERTIFICATE_TYPES}
                        placeholder="Select type"
                        title="Certificate Type"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Certificate Number</Label>
                      <Input
                        value={formData.certificate_number}
                        onChange={(e) => setFormData(prev => ({ ...prev, certificate_number: e.target.value }))}
                        placeholder="e.g., EICR-2024-001"
                        className="h-11 touch-manipulation"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Client Name</Label>
                      <Input
                        value={formData.client_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                        placeholder="Enter client name"
                        className="h-11 touch-manipulation"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Link to Customer</Label>
                      <MobileSelectPicker
                        value={formData.customer_id}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, customer_id: value }))}
                        options={customers.map(customer => ({ value: customer.id, label: customer.name }))}
                        placeholder="Select customer"
                        title="Link to Customer"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label>Installation Address</Label>
                      <Input
                        value={formData.installation_address}
                        onChange={(e) => setFormData(prev => ({ ...prev, installation_address: e.target.value }))}
                        placeholder="Enter installation address"
                        className="h-11 touch-manipulation"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Issue Date</Label>
                      <Input
                        type="date"
                        value={formData.issue_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, issue_date: e.target.value }))}
                        className="h-11 touch-manipulation"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input
                        type="date"
                        value={formData.expiry_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
                        className="h-11 touch-manipulation"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Issuing Company</Label>
                      <Input
                        value={formData.issuing_company}
                        onChange={(e) => setFormData(prev => ({ ...prev, issuing_company: e.target.value }))}
                        placeholder="Company name"
                        className="h-11 touch-manipulation"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Imported From</Label>
                      <MobileSelectPicker
                        value={formData.imported_from_system}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, imported_from_system: value }))}
                        options={IMPORT_SOURCES}
                        placeholder="Select source"
                        title="Import Source"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label>Notes</Label>
                      <Textarea
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Any additional notes..."
                        className="min-h-[80px] touch-manipulation"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {mode === 'bulk' && (
              <div className="space-y-4">
                {uploadProgress ? (
                  // Results view
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4 py-8">
                      {uploadProgress.failed === 0 ? (
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                            <Check className="h-8 w-8 text-green-500" />
                          </div>
                          <p className="text-lg font-medium">Upload Complete!</p>
                          <p className="text-sm text-muted-foreground">
                            {uploadProgress.successful} certificate{uploadProgress.successful === 1 ? '' : 's'} uploaded
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="h-8 w-8 text-orange-500" />
                          </div>
                          <p className="text-lg font-medium">Upload Completed with Errors</p>
                          <p className="text-sm text-muted-foreground">
                            {uploadProgress.successful} succeeded, {uploadProgress.failed} failed
                          </p>
                        </div>
                      )}
                    </div>

                    {uploadProgress.failed > 0 && (
                      <Button
                        variant="outline"
                        className="w-full h-11"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    )}
                  </div>
                ) : (
                  // File list view
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        {bulkFiles.length} PDF{bulkFiles.length === 1 ? '' : 's'} selected
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setBulkFiles([]);
                          setMode('select');
                        }}
                      >
                        Clear All
                      </Button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {bulkFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="flex items-center gap-3 p-2 bg-elec-gray rounded-lg"
                        >
                          <FileText className="h-5 w-5 text-elec-yellow shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setBulkFiles(prev => prev.filter((_, i) => i !== index))}
                            className="h-7 w-7 shrink-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      You can add metadata to each certificate after uploading
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer with action buttons */}
          {(mode === 'single' || (mode === 'bulk' && !uploadProgress)) && (
            <div className="p-4 border-t border-border bg-background">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 h-11 touch-manipulation"
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  variant="accent"
                  onClick={mode === 'single' ? handleSingleUpload : handleBulkUpload}
                  className="flex-1 h-11 touch-manipulation"
                  disabled={isUploading || (mode === 'single' && !selectedFile) || (mode === 'bulk' && bulkFiles.length === 0)}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      {mode === 'single' ? 'Upload Certificate' : `Upload ${bulkFiles.length} Certificate${bulkFiles.length === 1 ? '' : 's'}`}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
