import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { QuickStats } from "@/components/employer/QuickStats";
import {
  useSignatureRequests,
  useSignatureStats,
  useCreateSignatureRequest,
  useResendSignatureRequest,
  useMarkAsSigned,
  useDeleteSignatureRequest,
  type SignatureRequest,
  type DocumentType,
} from "@/hooks/useSignatureRequests";
import { useJobs } from "@/hooks/useJobs";
import {
  PenTool,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Download,
  Eye,
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  Plus,
  Loader2,
  RefreshCw,
  AlertTriangle,
  Trash2,
  Copy,
  Link,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  "Pending": "bg-yellow-500/20 text-yellow-400",
  "Sent": "bg-blue-500/20 text-blue-400",
  "Viewed": "bg-purple-500/20 text-purple-400",
  "Signed": "bg-green-500/20 text-green-400",
  "Declined": "bg-red-500/20 text-red-400",
  "Expired": "bg-gray-500/20 text-gray-400",
};

const documentTypes: DocumentType[] = [
  "Quote",
  "Contract",
  "Certificate",
  "RAMS",
  "Timesheet",
  "Completion",
  "Variation",
  "Invoice"
];

export function SignaturesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "signed">("all");
  const [showNewRequest, setShowNewRequest] = useState(false);

  // Form state
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>("Certificate");
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [signerPhone, setSignerPhone] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [message, setMessage] = useState("");

  // Hooks
  const { data: signatures, isLoading, error, refetch } = useSignatureRequests();
  const { data: stats } = useSignatureStats();
  const { data: jobs } = useJobs();
  const createRequest = useCreateSignatureRequest();
  const resendRequest = useResendSignatureRequest();
  const markAsSigned = useMarkAsSigned();
  const deleteRequest = useDeleteSignatureRequest();
  const { toast } = useToast();

  const handleCopyLink = async (accessToken: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const signingUrl = `${window.location.origin}/sign/${accessToken}`;
    try {
      await navigator.clipboard.writeText(signingUrl);
      toast({
        title: "Link copied",
        description: "Signing link copied to clipboard",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Could not copy link",
        variant: "destructive",
      });
    }
  };

  const filteredSignatures = signatures?.filter(sig => {
    const matchesSearch =
      sig.document_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.signer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.document_type?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "pending") return matchesSearch && !["Signed", "Declined", "Expired"].includes(sig.status);
    if (activeTab === "signed") return matchesSearch && sig.status === "Signed";
    return matchesSearch;
  }) || [];

  const handleCreateRequest = async () => {
    if (!documentTitle || !signerName) return;

    await createRequest.mutateAsync({
      document_title: documentTitle,
      document_type: documentType,
      signer_name: signerName,
      signer_email: signerEmail || undefined,
      signer_phone: signerPhone || undefined,
      job_id: selectedJobId || undefined,
      message: message || undefined,
      status: "Pending",
    });

    // Reset form
    setDocumentTitle("");
    setDocumentType("Certificate");
    setSignerName("");
    setSignerEmail("");
    setSignerPhone("");
    setSelectedJobId("");
    setMessage("");
    setShowNewRequest(false);
  };

  const handleResend = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await resendRequest.mutateAsync(id);
  };

  const handleMarkSigned = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await markAsSigned.mutateAsync({ id });
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteRequest.mutateAsync(id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Signed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "Pending": return <Clock className="h-4 w-4 text-warning" />;
      case "Sent": return <Send className="h-4 w-4 text-info" />;
      case "Viewed": return <Eye className="h-4 w-4 text-purple-400" />;
      case "Declined": return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "Expired": return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Failed to load signature requests</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title="Customer Signatures"
          description="Digital signature capture and tracking"
        />

        <Sheet open={showNewRequest} onOpenChange={setShowNewRequest}>
          <SheetTrigger asChild>
            <Button className="gap-2 h-11 touch-manipulation">
              <Plus className="h-4 w-4" />
              Request Signature
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle>Request Signature</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Document Title *</Label>
                  <Input
                    placeholder="e.g. Electrical Installation Certificate..."
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select value={documentType} onValueChange={(v) => setDocumentType(v as DocumentType)}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {documentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Linked Job</Label>
                  <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Select job (optional)..." />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {jobs?.map(job => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title} - {job.client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Signer Name *</Label>
                  <Input
                    placeholder="Customer or client name..."
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Signer Email</Label>
                  <Input
                    type="email"
                    placeholder="customer@example.com..."
                    value={signerEmail}
                    onChange={(e) => setSignerEmail(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Signer Phone</Label>
                  <Input
                    type="tel"
                    placeholder="07xxx xxxxxx..."
                    value={signerPhone}
                    onChange={(e) => setSignerPhone(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Message (Optional)</Label>
                  <Input
                    placeholder="Personal message to include..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewRequest(false)}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateRequest}
                    disabled={!documentTitle || !signerName || createRequest.isPending}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    {createRequest.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Send Request"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Stats */}
      <QuickStats
        stats={[
          {
            icon: Clock,
            value: isLoading ? "-" : (stats?.pending || 0),
            label: "Pending",
            color: "yellow",
            pulse: (stats?.pending || 0) > 0,
          },
          {
            icon: CheckCircle,
            value: isLoading ? "-" : (stats?.signed || 0),
            label: "Signed",
            color: "green",
          },
          {
            icon: PenTool,
            value: isLoading ? "-" : (stats?.total || 0),
            label: "Total",
            color: "blue",
          },
        ]}
      />

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        <Badge
          variant={activeTab === "all" ? "default" : "outline"}
          className="cursor-pointer touch-manipulation whitespace-nowrap h-8"
          onClick={() => setActiveTab("all")}
        >
          All ({signatures?.length || 0})
        </Badge>
        <Badge
          variant={activeTab === "pending" ? "default" : "outline"}
          className="cursor-pointer touch-manipulation whitespace-nowrap h-8"
          onClick={() => setActiveTab("pending")}
        >
          Pending ({stats?.pending || 0})
        </Badge>
        <Badge
          variant={activeTab === "signed" ? "default" : "outline"}
          className="cursor-pointer touch-manipulation whitespace-nowrap h-8"
          onClick={() => setActiveTab("signed")}
        >
          Signed ({stats?.signed || 0})
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        {!searchQuery && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        <Input
          placeholder="Search by document or customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn("h-11 touch-manipulation", !searchQuery && "pl-10")}
        />
      </div>

      {/* Signature Cards */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-elec-gray border-border">
              <CardContent className="p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <Skeleton className="h-6 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredSignatures.length === 0 ? (
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-8 text-center">
            <PenTool className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              {searchQuery ? "No signatures found" : "No signature requests"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search or filters" : "Create your first signature request to get started."}
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowNewRequest(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Request Signature
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredSignatures.map((sig) => {
            const isExpanded = expandedCard === sig.id;

            return (
              <Card key={sig.id} className="bg-elec-gray border-border overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className="p-4 cursor-pointer touch-manipulation"
                    onClick={() => setExpandedCard(isExpanded ? null : sig.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(sig.status)}
                          <h3 className="font-semibold text-foreground truncate">{sig.document_title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{sig.signer_name}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {sig.document_type && (
                            <Badge variant="outline" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              {sig.document_type}
                            </Badge>
                          )}
                          {sig.job && (
                            <Badge variant="outline" className="text-xs">
                              {sig.job.title}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge className={statusColors[sig.status] || statusColors["Pending"]}>
                          {sig.status}
                        </Badge>
                        {sig.signed_at && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(sig.signed_at).toLocaleDateString("en-GB")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center mt-2">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-border p-4 bg-muted/30 space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Customer:</span>
                          <p className="font-medium">{sig.signer_name}</p>
                        </div>
                        {sig.signer_email && (
                          <div>
                            <span className="text-muted-foreground">Email:</span>
                            <p className="font-medium text-xs break-all">{sig.signer_email}</p>
                          </div>
                        )}
                        {sig.signer_phone && (
                          <div>
                            <span className="text-muted-foreground">Phone:</span>
                            <p className="font-medium">{sig.signer_phone}</p>
                          </div>
                        )}
                        {sig.linked_invoice && (
                          <div>
                            <span className="text-muted-foreground">Linked Invoice:</span>
                            <p className="font-medium">{sig.linked_invoice}</p>
                          </div>
                        )}
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Created:</span>
                          <p className="font-medium">{new Date(sig.created_at).toLocaleDateString("en-GB")}</p>
                        </div>
                      </div>

                      {sig.status === "Signed" && sig.signature_url && (
                        <div className="p-3 bg-background rounded-lg border border-border">
                          <div className="flex items-center gap-2 mb-2">
                            <PenTool className="h-4 w-4 text-success" />
                            <span className="text-sm font-medium text-success">Signature Captured</span>
                          </div>
                          <div className="bg-white rounded overflow-hidden">
                            <img
                              src={sig.signature_url}
                              alt="Customer signature"
                              className="w-full h-20 object-contain"
                            />
                          </div>
                          {sig.signed_at && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Signed: {new Date(sig.signed_at).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 flex-wrap">
                        {!["Signed", "Declined", "Expired"].includes(sig.status) && (
                          <>
                            {(sig as any).access_token && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-10 touch-manipulation"
                                onClick={(e) => handleCopyLink((sig as any).access_token, e)}
                              >
                                <Link className="h-4 w-4 mr-2" />
                                Copy Link
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-10 touch-manipulation"
                              onClick={(e) => handleResend(sig.id, e)}
                              disabled={resendRequest.isPending || !sig.signer_email}
                              title={!sig.signer_email ? "No email address" : undefined}
                            >
                              {resendRequest.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Resend
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-10 touch-manipulation"
                              onClick={(e) => handleMarkSigned(sig.id, e)}
                              disabled={markAsSigned.isPending}
                            >
                              {markAsSigned.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark Signed
                                </>
                              )}
                            </Button>
                          </>
                        )}
                        {sig.status === "Signed" && (
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1 h-10 touch-manipulation"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 text-destructive hover:text-destructive touch-manipulation"
                          onClick={(e) => handleDelete(sig.id, e)}
                          disabled={deleteRequest.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
