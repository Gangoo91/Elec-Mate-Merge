import { useState, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  FileText,
  Send,
  Trash2,
  Check,
  Phone,
  Mail,
  Calendar,
  Clock,
  Loader2,
  Upload,
  Download,
  Trophy,
  XCircle,
  Briefcase,
  User,
  FileIcon,
  X
} from "lucide-react";
import {
  useUpdateTender,
  useUpdateTenderStatus,
  useDeleteTender,
  useUploadTenderDocument,
  useDeleteTenderDocument,
  type Tender
} from "@/hooks/useTenders";
import { toast } from "sonner";
import { format } from "date-fns";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";

interface ViewTenderSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tender: Tender | null;
  onConvertToJob?: (tender: Tender) => void;
}

interface TenderDocument {
  id: string;
  name: string;
  url: string;
  size?: number;
  uploaded_at: string;
}

export function ViewTenderSheet({ open, onOpenChange, tender, onConvertToJob }: ViewTenderSheetProps) {
  const updateTenderMutation = useUpdateTender();
  const updateStatusMutation = useUpdateTenderStatus();
  const deleteMutation = useDeleteTender();
  const uploadDocMutation = useUploadTenderDocument();
  const deleteDocMutation = useDeleteTenderDocument();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultAction, setResultAction] = useState<'Won' | 'Lost'>('Won');
  const [isUploading, setIsUploading] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: '',
    client: '',
    value: 0,
    deadline: '',
    category: '',
    description: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    notes: ''
  });

  if (!tender) return null;

  const documents: TenderDocument[] = Array.isArray(tender.documents) ? tender.documents : [];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "Open": "bg-warning/20 text-warning",
      "Submitted": "bg-blue-500/20 text-blue-400",
      "Won": "bg-success/20 text-success",
      "Lost": "bg-destructive/20 text-destructive",
      "Withdrawn": "bg-muted text-muted-foreground"
    };
    return <Badge className={styles[status] || ""}>{status}</Badge>;
  };

  const handleSubmit = () => {
    updateStatusMutation.mutate({ id: tender.id, status: "Submitted" });
  };

  const handleMarkResult = (result: 'Won' | 'Lost') => {
    setResultAction(result);
    setShowResultDialog(true);
  };

  const confirmResult = () => {
    updateStatusMutation.mutate({
      id: tender.id,
      status: resultAction,
      resultDate: new Date().toISOString().split('T')[0]
    });
    setShowResultDialog(false);
  };

  const handleWithdraw = () => {
    updateStatusMutation.mutate({ id: tender.id, status: "Withdrawn" });
  };

  const handleReopen = () => {
    updateStatusMutation.mutate({ id: tender.id, status: "Open" });
  };

  const handleEdit = () => {
    setEditForm({
      title: tender.title,
      client: tender.client,
      value: tender.value,
      deadline: tender.deadline || '',
      category: tender.category || '',
      description: tender.description || '',
      contact_name: tender.contact_name || '',
      contact_email: tender.contact_email || '',
      contact_phone: tender.contact_phone || '',
      notes: tender.notes || ''
    });
    setShowEditDialog(true);
  };

  const saveEdit = () => {
    updateTenderMutation.mutate({
      id: tender.id,
      data: {
        title: editForm.title,
        client: editForm.client,
        value: editForm.value,
        deadline: editForm.deadline || undefined,
        category: editForm.category || undefined,
        description: editForm.description || undefined,
        contact_name: editForm.contact_name || undefined,
        contact_email: editForm.contact_email || undefined,
        contact_phone: editForm.contact_phone || undefined,
        notes: editForm.notes || undefined
      }
    });
    setShowEditDialog(false);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        await uploadDocMutation.mutateAsync({ tenderId: tender.id, file });
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteDocument = async (doc: TenderDocument) => {
    deleteDocMutation.mutate({ tenderId: tender.id, documentId: doc.id, url: doc.url });
  };

  const handleDownloadDocument = (doc: TenderDocument) => {
    window.open(doc.url, '_blank');
  };

  const handleConvert = () => {
    if (onConvertToJob) {
      onConvertToJob(tender);
      onOpenChange(false);
    }
  };

  const getStatusSteps = () => {
    const steps = ['Open', 'Submitted'];
    if (tender.status === 'Won') steps.push('Won');
    else if (tender.status === 'Lost') steps.push('Lost');
    else steps.push('Result');
    return steps;
  };

  return (
    <>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-3xl">
        <div className="flex flex-col h-full">
          {/* Native drag indicator */}
          <div className="pt-2 pb-1 flex justify-center">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Header */}
          <SheetHeader className="px-4 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <SheetTitle className="text-lg font-semibold">{tender.tender_number || tender.title}</SheetTitle>
                  <p className="text-sm text-muted-foreground">{tender.client}</p>
                </div>
              </div>
              {getStatusBadge(tender.status)}
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1 px-4 py-4 pb-48">
            <div className="space-y-4">
              {/* Won Banner */}
              {tender.status === 'Won' && (
                <Card className="bg-success/10 border-success/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-6 w-6 text-success" />
                      <div>
                        <p className="font-semibold text-success">Tender Won!</p>
                        {tender.result_date && (
                          <p className="text-sm text-muted-foreground">
                            Won on {format(new Date(tender.result_date), "d MMM yyyy")}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Lost Banner */}
              {tender.status === 'Lost' && (
                <Card className="bg-destructive/10 border-destructive/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-6 w-6 text-destructive" />
                      <div>
                        <p className="font-semibold text-destructive">Tender Lost</p>
                        {tender.result_date && (
                          <p className="text-sm text-muted-foreground">
                            Result received {format(new Date(tender.result_date), "d MMM yyyy")}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Status Timeline */}
              <div className="flex items-center justify-between py-2">
                {getStatusSteps().map((step, idx) => {
                  const isComplete =
                    (step === "Open") ||
                    (step === "Submitted" && ["Submitted", "Won", "Lost"].includes(tender.status)) ||
                    (step === "Won" && tender.status === "Won") ||
                    (step === "Lost" && tender.status === "Lost");
                  const isCurrent =
                    (step === "Open" && tender.status === "Open") ||
                    (step === "Submitted" && tender.status === "Submitted") ||
                    (step === "Won" && tender.status === "Won") ||
                    (step === "Lost" && tender.status === "Lost");
                  const isLost = step === "Lost";

                  return (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                        ${isLost && isComplete ? 'bg-destructive text-destructive-foreground' :
                          isComplete ? 'bg-success text-success-foreground' :
                          isCurrent ? 'bg-elec-yellow text-elec-yellow-foreground' : 'bg-muted text-muted-foreground'}`}
                      >
                        {isComplete ? <Check className="h-4 w-4" /> : idx + 1}
                      </div>
                      {idx < getStatusSteps().length - 1 && (
                        <div className={`w-12 h-0.5 ${isComplete ? (isLost ? 'bg-destructive' : 'bg-success') : 'bg-muted'}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Value Card */}
              <Card className="bg-elec-yellow/10 border-elec-yellow/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tender Value</span>
                    <span className="text-2xl font-bold text-elec-yellow">
                      £{Number(tender.value).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Details */}
              <Card className="bg-elec-gray">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Tender Details
                  </h3>

                  {tender.description && (
                    <div>
                      <span className="text-sm text-muted-foreground">Description</span>
                      <p className="font-medium whitespace-pre-line">{tender.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {tender.category && (
                      <div>
                        <span className="text-muted-foreground">Category</span>
                        <p className="font-medium">{tender.category}</p>
                      </div>
                    )}
                    {tender.deadline && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Deadline</span>
                          <p className={`font-medium ${new Date(tender.deadline) < new Date() ? 'text-destructive' : ''}`}>
                            {format(new Date(tender.deadline), "d MMM yyyy")}
                          </p>
                        </div>
                      </div>
                    )}
                    {tender.submission_date && (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Submitted</span>
                          <p className="font-medium">{format(new Date(tender.submission_date), "d MMM yyyy")}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">Created</span>
                        <p className="font-medium">{format(new Date(tender.created_at), "d MMM yyyy")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              {(tender.contact_name || tender.contact_email || tender.contact_phone) && (
                <Card className="bg-elec-gray">
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <User className="h-4 w-4" /> Contact
                    </h3>
                    {tender.contact_name && (
                      <p className="font-medium">{tender.contact_name}</p>
                    )}
                    <div className="flex gap-2">
                      {tender.contact_phone && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `tel:${tender.contact_phone}`}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {tender.contact_phone}
                        </Button>
                      )}
                      {tender.contact_email && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `mailto:${tender.contact_email}`}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Documents */}
              <Card className="bg-elec-gray">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <FileIcon className="h-4 w-4" /> Documents
                    </h3>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4 mr-2" />
                      )}
                      Upload
                    </Button>
                  </div>

                  {documents.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <FileIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No documents uploaded</p>
                      <p className="text-xs">Upload tender specs, drawings, BOQs</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-2 bg-background rounded-lg"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm truncate">{doc.name}</span>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDownloadDocument(doc)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleDeleteDocument(doc)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notes */}
              {tender.notes && (
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2">Notes</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{tender.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>

          {/* Fixed Footer Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
            <div className="px-4 py-3 pb-safe space-y-2">
              {/* Primary Actions based on status */}
              {tender.status === "Open" && (
                <Button
                  onClick={handleSubmit}
                  disabled={updateStatusMutation.isPending}
                  className="w-full h-12"
                >
                  {updateStatusMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Mark as Submitted
                </Button>
              )}

              {tender.status === "Submitted" && (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    className="flex-1 h-12"
                    onClick={() => handleMarkResult('Lost')}
                    disabled={updateStatusMutation.isPending}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Lost
                  </Button>
                  <Button
                    className="flex-1 h-12 bg-success hover:bg-success/90"
                    onClick={() => handleMarkResult('Won')}
                    disabled={updateStatusMutation.isPending}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    Won
                  </Button>
                </div>
              )}

              {tender.status === "Won" && onConvertToJob && (
                <Button onClick={handleConvert} className="w-full h-12 bg-success hover:bg-success/90">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Convert to Job
                </Button>
              )}

              {(tender.status === "Lost" || tender.status === "Withdrawn") && (
                <Button
                  variant="outline"
                  onClick={handleReopen}
                  disabled={updateStatusMutation.isPending}
                  className="w-full h-12"
                >
                  Reopen Tender
                </Button>
              )}

              {/* Secondary Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 h-10" onClick={handleEdit}>
                  Edit
                </Button>
                {tender.status === "Open" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-10"
                    onClick={handleWithdraw}
                  >
                    Withdraw
                  </Button>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 h-10 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Tender?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete tender "{tender.title}" for {tender.client}. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90"
                        onClick={() => {
                          deleteMutation.mutate(tender.id, {
                            onSuccess: () => onOpenChange(false)
                          });
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>

    {/* Edit Dialog */}
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tender</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              value={editForm.client}
              onChange={(e) => setEditForm({ ...editForm, client: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Value (£)</Label>
              <Input
                id="value"
                type="number"
                value={editForm.value}
                onChange={(e) => setEditForm({ ...editForm, value: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={editForm.deadline}
                onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              placeholder="e.g., Commercial, Residential"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              rows={3}
            />
          </div>
          <Separator />
          <h4 className="font-medium">Contact Details</h4>
          <div className="space-y-2">
            <Label htmlFor="contact_name">Contact Name</Label>
            <Input
              id="contact_name"
              value={editForm.contact_name}
              onChange={(e) => setEditForm({ ...editForm, contact_name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_email">Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={editForm.contact_email}
                onChange={(e) => setEditForm({ ...editForm, contact_email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Phone</Label>
              <Input
                id="contact_phone"
                value={editForm.contact_phone}
                onChange={(e) => setEditForm({ ...editForm, contact_phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={editForm.notes}
              onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button
            onClick={saveEdit}
            disabled={updateTenderMutation.isPending || !editForm.title || !editForm.client}
          >
            {updateTenderMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Result Confirmation Dialog */}
    <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {resultAction === 'Won' ? 'Mark Tender as Won' : 'Mark Tender as Lost'}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground">
            {resultAction === 'Won'
              ? `Congratulations! You're marking "${tender.title}" as won. This will record today as the result date.`
              : `You're marking "${tender.title}" as lost. This will record today as the result date.`
            }
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowResultDialog(false)}>Cancel</Button>
          <Button
            onClick={confirmResult}
            disabled={updateStatusMutation.isPending}
            className={resultAction === 'Won' ? 'bg-success hover:bg-success/90' : ''}
            variant={resultAction === 'Lost' ? 'destructive' : 'default'}
          >
            {updateStatusMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {resultAction === 'Won' ? 'Mark as Won' : 'Mark as Lost'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
