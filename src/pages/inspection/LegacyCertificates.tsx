import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLegacyCertificates, LegacyCertificate, CertificateType, UpdateLegacyCertificateInput } from '@/hooks/useLegacyCertificates';
import { useCustomers } from '@/hooks/inspection/useCustomers';
import { LegacyCertificateUpload } from '@/components/LegacyCertificateUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  Search,
  Plus,
  FileText,
  Loader2,
  Calendar,
  Building,
  Download,
  Pencil,
  Trash2,
  User,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const CERTIFICATE_TYPE_LABELS: Record<CertificateType, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  pir: 'PIR',
  other: 'Other',
};

const CERTIFICATE_TYPE_COLORS: Record<CertificateType, string> = {
  eicr: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  eic: 'bg-green-500/20 text-green-400 border-green-500/30',
  'minor-works': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  pir: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  other: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export default function LegacyCertificates() {
  const navigate = useNavigate();
  const { certificates, isLoading, updateCertificate, deleteCertificate, getDownloadUrl } = useLegacyCertificates();
  const { customers } = useCustomers({});

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<CertificateType | 'all'>('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<LegacyCertificate | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<LegacyCertificate | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  // Edit form state
  const [editForm, setEditForm] = useState<UpdateLegacyCertificateInput>({});

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch =
      !searchTerm ||
      cert.original_filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.installation_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificate_number?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || cert.certificate_type === filterType;

    return matchesSearch && matchesType;
  });

  const handleDownload = async (cert: LegacyCertificate) => {
    setIsDownloading(cert.id);
    try {
      const url = await getDownloadUrl(cert.storage_path);
      if (url) {
        window.open(url, '_blank');
      }
    } finally {
      setIsDownloading(null);
    }
  };

  const handleEdit = (cert: LegacyCertificate) => {
    setEditingCertificate(cert);
    setEditForm({
      certificate_type: cert.certificate_type,
      certificate_number: cert.certificate_number,
      client_name: cert.client_name,
      installation_address: cert.installation_address,
      issue_date: cert.issue_date,
      expiry_date: cert.expiry_date,
      issuing_company: cert.issuing_company,
      imported_from_system: cert.imported_from_system,
      customer_id: cert.customer_id,
      notes: cert.notes,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingCertificate) return;
    try {
      await updateCertificate({ id: editingCertificate.id, updates: editForm });
      setEditingCertificate(null);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteCertificate(deleteConfirm);
      setDeleteConfirm(null);
    } catch (error) {
      // Error handled in hook
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/electrician/inspection-testing')}
            className="h-11 w-11 touch-manipulation -ml-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <FileText className="h-6 w-6 text-elec-yellow" />
            <h1 className="text-xl font-bold">Legacy Certificates</h1>
          </div>
          <Badge variant="outline">
            {certificates.length}
          </Badge>
        </div>
      </header>

      <main className="p-4 pb-24 space-y-4 max-w-4xl mx-auto">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            {!searchTerm && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn("h-11 touch-manipulation", !searchTerm && "pl-9")}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={(v) => setFilterType(v as CertificateType | 'all')}>
              <SelectTrigger className="w-[140px] h-11 touch-manipulation">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="eicr">EICR</SelectItem>
                <SelectItem value="eic">EIC</SelectItem>
                <SelectItem value="minor-works">Minor Works</SelectItem>
                <SelectItem value="pir">PIR</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="accent"
              onClick={() => setShowUploadDialog(true)}
              className="h-11 gap-2 touch-manipulation"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Import</span>
            </Button>
          </div>
        </div>

        {/* Certificate List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
          </div>
        ) : filteredCertificates.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <p className="text-lg font-medium">
                {certificates.length === 0 ? 'No legacy certificates yet' : 'No matching certificates'}
              </p>
              <p className="text-sm text-muted-foreground">
                {certificates.length === 0
                  ? 'Import certificates from your previous software'
                  : 'Try a different search term'}
              </p>
            </div>
            {certificates.length === 0 && (
              <Button
                variant="accent"
                onClick={() => setShowUploadDialog(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Import Certificates
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-card border border-border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium truncate">
                        {cert.certificate_number || cert.original_filename}
                      </span>
                      {cert.certificate_type && (
                        <Badge className={cn('text-xs', CERTIFICATE_TYPE_COLORS[cert.certificate_type])}>
                          {CERTIFICATE_TYPE_LABELS[cert.certificate_type]}
                        </Badge>
                      )}
                    </div>
                    {cert.client_name && (
                      <p className="text-sm text-foreground">{cert.client_name}</p>
                    )}
                    {cert.installation_address && (
                      <p className="text-sm text-muted-foreground truncate">
                        {cert.installation_address}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(cert)}
                      disabled={isDownloading === cert.id}
                      className="h-9 w-9"
                    >
                      {isDownloading === cert.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(cert)}
                      className="h-9 w-9"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteConfirm(cert)}
                      className="h-9 w-9 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  {cert.issue_date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Issued: {format(new Date(cert.issue_date), 'dd MMM yyyy')}
                    </span>
                  )}
                  {cert.expiry_date && (
                    <span className={cn(
                      "flex items-center gap-1",
                      new Date(cert.expiry_date) < new Date() && "text-red-400"
                    )}>
                      <Calendar className="h-3 w-3" />
                      Expires: {format(new Date(cert.expiry_date), 'dd MMM yyyy')}
                    </span>
                  )}
                  {cert.issuing_company && (
                    <span className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {cert.issuing_company}
                    </span>
                  )}
                  {cert.customer && (
                    <Link
                      to={`/customers/${cert.customer.id}`}
                      className="flex items-center gap-1 text-elec-yellow hover:underline"
                    >
                      <User className="h-3 w-3" />
                      {cert.customer.name}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {cert.original_filename} ({formatFileSize(cert.file_size_bytes)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Upload Dialog */}
      <LegacyCertificateUpload
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
      />

      {/* Edit Sheet */}
      <Sheet open={!!editingCertificate} onOpenChange={(open) => !open && setEditingCertificate(null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl flex flex-col">
          <SheetHeader className="px-4 py-4 border-b border-border">
            <SheetTitle>Edit Certificate Details</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Certificate Type</Label>
                <Select
                  value={editForm.certificate_type || ''}
                  onValueChange={(value) => setEditForm(prev => ({ ...prev, certificate_type: value as CertificateType }))}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eicr">EICR</SelectItem>
                    <SelectItem value="eic">EIC</SelectItem>
                    <SelectItem value="minor-works">Minor Works</SelectItem>
                    <SelectItem value="pir">PIR</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Certificate Number</Label>
                <Input
                  value={editForm.certificate_number || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, certificate_number: e.target.value }))}
                  className="h-11 touch-manipulation"
                />
              </div>

              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input
                  value={editForm.client_name || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, client_name: e.target.value }))}
                  className="h-11 touch-manipulation"
                />
              </div>

              <div className="space-y-2">
                <Label>Link to Customer</Label>
                <Select
                  value={editForm.customer_id || ''}
                  onValueChange={(value) => setEditForm(prev => ({ ...prev, customer_id: value || null }))}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Installation Address</Label>
                <Input
                  value={editForm.installation_address || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, installation_address: e.target.value }))}
                  className="h-11 touch-manipulation"
                />
              </div>

              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input
                  type="date"
                  value={editForm.issue_date || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, issue_date: e.target.value }))}
                  className="h-11 touch-manipulation"
                />
              </div>

              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  value={editForm.expiry_date || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, expiry_date: e.target.value }))}
                  className="h-11 touch-manipulation"
                />
              </div>

              <div className="space-y-2">
                <Label>Issuing Company</Label>
                <Input
                  value={editForm.issuing_company || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, issuing_company: e.target.value }))}
                  className="h-11 touch-manipulation"
                />
              </div>

              <div className="space-y-2">
                <Label>Imported From</Label>
                <Input
                  value={editForm.imported_from_system || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, imported_from_system: e.target.value }))}
                  className="h-11 touch-manipulation"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Notes</Label>
                <Textarea
                  value={editForm.notes || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="min-h-[80px] touch-manipulation"
                />
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11"
                onClick={() => setEditingCertificate(null)}
              >
                Cancel
              </Button>
              <Button
                variant="accent"
                className="flex-1 h-11"
                onClick={handleSaveEdit}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certificate?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteConfirm?.original_filename}" and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-[44px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 min-h-[44px]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
