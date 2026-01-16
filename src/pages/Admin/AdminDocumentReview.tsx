import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Search,
  FileCheck,
  RefreshCw,
  ChevronRight,
  Check,
  X,
  Clock,
  AlertTriangle,
  Flag,
  Eye,
  User,
  Calendar,
  IdCard,
  GraduationCap,
  Car,
  Shield,
  Award,
  HardHat,
  Image,
  ExternalLink,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface DocumentRecord {
  id: string;
  profile_id: string;
  document_type: string;
  document_name: string;
  issuing_body: string | null;
  document_number: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  file_url: string | null;
  file_path: string | null;
  verification_status: string;
  verification_confidence: number | null;
  extracted_data: Record<string, any> | null;
  extraction_confidence: Record<string, number> | null;
  rejection_reason: string | null;
  flagged_for_review: boolean | null;
  flag_reason: string | null;
  flag_severity: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  review_action: string | null;
  created_at: string;
  // Joined profile data
  elec_id_profile?: {
    employee?: {
      name: string | null;
      email: string | null;
    };
  };
}

const DOCUMENT_ICONS: Record<string, typeof IdCard> = {
  ecs_card: IdCard,
  qualification: GraduationCap,
  training: Award,
  cscs: HardHat,
  driving_licence: Car,
  insurance: Shield,
};

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-500/20 text-blue-400", icon: RefreshCw },
  verified: { label: "Verified", color: "bg-green-500/20 text-green-400", icon: Check },
  rejected: { label: "Rejected", color: "bg-red-500/20 text-red-400", icon: X },
  needs_review: { label: "Needs Review", color: "bg-amber-500/20 text-amber-400", icon: Eye },
};

const SEVERITY_CONFIG = {
  low: { label: "Low", color: "bg-blue-500/20 text-blue-400" },
  medium: { label: "Medium", color: "bg-amber-500/20 text-amber-400" },
  high: { label: "High", color: "bg-red-500/20 text-red-400" },
};

export default function AdminDocumentReview() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("flagged");
  const [selectedDocument, setSelectedDocument] = useState<DocumentRecord | null>(null);
  const [reviewAction, setReviewAction] = useState<"approved" | "rejected" | "request_reupload" | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [documentImageUrl, setDocumentImageUrl] = useState<string | null>(null);

  // Fetch documents
  const { data: documents, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin-document-review", search, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("elec_id_documents")
        .select(`
          *,
          elec_id_profile:employer_elec_id_profiles(
            employee:employer_employees(
              name,
              email
            )
          )
        `)
        .order("created_at", { ascending: false })
        .limit(100);

      if (statusFilter === "flagged") {
        query = query.eq("flagged_for_review", true);
      } else if (statusFilter !== "all") {
        query = query.eq("verification_status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as DocumentRecord[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (d) =>
            d.document_name.toLowerCase().includes(s) ||
            d.document_type.toLowerCase().includes(s) ||
            d.extracted_data?.holderName?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  // Get stats
  const { data: stats } = useQuery({
    queryKey: ["admin-document-review-stats"],
    queryFn: async () => {
      const [pendingRes, flaggedRes, verifiedRes, rejectedRes] = await Promise.all([
        supabase.from("elec_id_documents").select("*", { count: "exact", head: true }).eq("verification_status", "pending"),
        supabase.from("elec_id_documents").select("*", { count: "exact", head: true }).eq("flagged_for_review", true),
        supabase.from("elec_id_documents").select("*", { count: "exact", head: true }).eq("verification_status", "verified"),
        supabase.from("elec_id_documents").select("*", { count: "exact", head: true }).eq("verification_status", "rejected"),
      ]);
      return {
        pending: pendingRes.count || 0,
        flagged: flaggedRes.count || 0,
        verified: verifiedRes.count || 0,
        rejected: rejectedRes.count || 0,
      };
    },
  });

  // Review document mutation
  const reviewMutation = useMutation({
    mutationFn: async ({ id, action, notes }: { id: string; action: string; notes: string }) => {
      const updateData: Record<string, any> = {
        review_action: action,
        review_notes: notes || null,
        reviewed_by: profile?.id,
        reviewed_at: new Date().toISOString(),
        flagged_for_review: false, // Clear the flag after review
      };

      // Update verification status based on action
      if (action === "approved") {
        updateData.verification_status = "verified";
      } else if (action === "rejected") {
        updateData.verification_status = "rejected";
        updateData.rejection_reason = notes || "Rejected by admin review";
      } else if (action === "request_reupload") {
        updateData.verification_status = "rejected";
        updateData.rejection_reason = notes || "Please upload a clearer image";
      }

      const { error } = await supabase
        .from("elec_id_documents")
        .update(updateData)
        .eq("id", id);
      if (error) throw error;

      // Log the action
      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: `document_${action}`,
        entity_type: "elec_id_document",
        entity_id: id,
        new_values: { review_action: action, notes },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-document-review"] });
      queryClient.invalidateQueries({ queryKey: ["admin-document-review-stats"] });
      setSelectedDocument(null);
      setReviewAction(null);
      setReviewNotes("");
      toast({
        title: "Document reviewed",
        description: "The document has been processed successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to review document",
        variant: "destructive",
      });
    },
  });

  // Load document image when selected
  const loadDocumentImage = async (doc: DocumentRecord) => {
    setSelectedDocument(doc);
    setDocumentImageUrl(null);

    const filePath = doc.file_path || doc.file_url;
    if (filePath && !filePath.startsWith("http")) {
      const { data } = await supabase.storage
        .from("elec-id-documents")
        .createSignedUrl(filePath, 3600);
      setDocumentImageUrl(data?.signedUrl || null);
    } else if (filePath?.startsWith("http")) {
      setDocumentImageUrl(filePath);
    }
  };

  const handleReview = () => {
    if (!selectedDocument || !reviewAction) return;
    reviewMutation.mutate({
      id: selectedDocument.id,
      action: reviewAction,
      notes: reviewNotes,
    });
  };

  const DocIcon = selectedDocument ? DOCUMENT_ICONS[selectedDocument.document_type] || FileCheck : FileCheck;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Document Review</h1>
          <p className="text-muted-foreground">Review flagged and pending document uploads</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="gap-2"
        >
          <RefreshCw className={cn("h-4 w-4", isFetching && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Flag className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-2xl font-bold text-amber-400">{stats?.flagged || 0}</p>
                <p className="text-xs text-muted-foreground">Flagged</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-yellow-400">{stats?.pending || 0}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-green-400">{stats?.verified || 0}</p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <X className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-red-400">{stats?.rejected || 0}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/5 border-white/20"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white/5 border-white/20">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Document List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : documents?.length === 0 ? (
        <Card className="bg-white/5 border-white/10">
          <CardContent className="py-12 text-center">
            <FileCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No documents found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {documents?.map((doc) => {
            const IconComponent = DOCUMENT_ICONS[doc.document_type] || FileCheck;
            const statusConfig = STATUS_CONFIG[doc.verification_status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
            const severityConfig = doc.flag_severity ? SEVERITY_CONFIG[doc.flag_severity as keyof typeof SEVERITY_CONFIG] : null;

            return (
              <Card
                key={doc.id}
                className={cn(
                  "bg-white/5 border-white/10 hover:border-white/20 transition-colors cursor-pointer",
                  doc.flagged_for_review && "border-amber-500/30 bg-amber-500/5"
                )}
                onClick={() => loadDocumentImage(doc)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-2.5 rounded-xl",
                      doc.flagged_for_review ? "bg-amber-500/20" : "bg-white/10"
                    )}>
                      <IconComponent className={cn(
                        "h-5 w-5",
                        doc.flagged_for_review ? "text-amber-400" : "text-muted-foreground"
                      )} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium text-foreground truncate">
                          {doc.document_name}
                        </h4>
                        <Badge className={statusConfig.color}>
                          {statusConfig.label}
                        </Badge>
                        {doc.flagged_for_review && severityConfig && (
                          <Badge className={severityConfig.color}>
                            <Flag className="h-3 w-3 mr-1" />
                            {severityConfig.label}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="capitalize">{doc.document_type.replace("_", " ")}</span>
                        {doc.verification_confidence && (
                          <span>{Math.round(doc.verification_confidence * 100)}% confidence</span>
                        )}
                        <span>{formatDistanceToNow(new Date(doc.created_at))} ago</span>
                      </div>

                      {doc.flag_reason && (
                        <p className="mt-2 text-sm text-amber-400 line-clamp-1">
                          <AlertTriangle className="h-3 w-3 inline mr-1" />
                          {doc.flag_reason}
                        </p>
                      )}

                      {doc.extracted_data?.holderName && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          <User className="h-3 w-3 inline mr-1" />
                          {doc.extracted_data.holderName}
                        </p>
                      )}
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Document Detail Sheet */}
      <Sheet open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-elec-gray border-white/20 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <DocIcon className="h-5 w-5 text-elec-yellow" />
              Review Document
            </SheetTitle>
          </SheetHeader>

          {selectedDocument && (
            <div className="space-y-6 py-4">
              {/* Document Image */}
              <div className="rounded-lg overflow-hidden border border-white/20 bg-black/50">
                {documentImageUrl ? (
                  <img
                    src={documentImageUrl}
                    alt="Document"
                    className="w-full h-auto max-h-64 object-contain"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center">
                    <Image className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Flag Alert */}
              {selectedDocument.flagged_for_review && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-400">Flagged for Review</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedDocument.flag_reason}
                      </p>
                      {selectedDocument.flag_severity && (
                        <Badge className={cn(
                          "mt-2",
                          SEVERITY_CONFIG[selectedDocument.flag_severity as keyof typeof SEVERITY_CONFIG]?.color
                        )}>
                          Severity: {selectedDocument.flag_severity}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Document Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span className="text-sm font-medium capitalize">
                    {selectedDocument.document_type.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="text-sm font-medium">{selectedDocument.document_name}</span>
                </div>
                {selectedDocument.verification_confidence && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">AI Confidence</span>
                    <span className="text-sm font-medium">
                      {Math.round(selectedDocument.verification_confidence * 100)}%
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Uploaded</span>
                  <span className="text-sm font-medium">
                    {format(new Date(selectedDocument.created_at), "d MMM yyyy HH:mm")}
                  </span>
                </div>
              </div>

              {/* Extracted Data */}
              {selectedDocument.extracted_data && Object.keys(selectedDocument.extracted_data).length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Extracted Data</h4>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                    {Object.entries(selectedDocument.extracted_data).map(([key, value]) => {
                      if (!value) return null;
                      const confidence = selectedDocument.extraction_confidence?.[key];
                      return (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className={cn(
                            "font-medium",
                            confidence && confidence < 0.6 ? "text-amber-400" : "text-foreground"
                          )}>
                            {String(value)}
                            {confidence && confidence < 0.6 && (
                              <span className="text-xs text-amber-400 ml-1">
                                ({Math.round(confidence * 100)}%)
                              </span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Review Actions */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-sm font-medium text-foreground">Review Decision</h4>

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={reviewAction === "approved" ? "default" : "outline"}
                    className={cn(
                      "flex-col h-auto py-3",
                      reviewAction === "approved" && "bg-green-500 hover:bg-green-600"
                    )}
                    onClick={() => setReviewAction("approved")}
                  >
                    <Check className="h-5 w-5 mb-1" />
                    <span className="text-xs">Approve</span>
                  </Button>
                  <Button
                    variant={reviewAction === "rejected" ? "default" : "outline"}
                    className={cn(
                      "flex-col h-auto py-3",
                      reviewAction === "rejected" && "bg-red-500 hover:bg-red-600"
                    )}
                    onClick={() => setReviewAction("rejected")}
                  >
                    <X className="h-5 w-5 mb-1" />
                    <span className="text-xs">Reject</span>
                  </Button>
                  <Button
                    variant={reviewAction === "request_reupload" ? "default" : "outline"}
                    className={cn(
                      "flex-col h-auto py-3",
                      reviewAction === "request_reupload" && "bg-amber-500 hover:bg-amber-600"
                    )}
                    onClick={() => setReviewAction("request_reupload")}
                  >
                    <RefreshCw className="h-5 w-5 mb-1" />
                    <span className="text-xs">Re-upload</span>
                  </Button>
                </div>

                {reviewAction && (
                  <div className="space-y-2">
                    <Label className="text-sm">Notes (optional)</Label>
                    <Textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder={
                        reviewAction === "rejected"
                          ? "Reason for rejection..."
                          : reviewAction === "request_reupload"
                          ? "What should be improved..."
                          : "Any notes..."
                      }
                      className="bg-white/5 border-white/20"
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <SheetFooter className="gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setSelectedDocument(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReview}
              disabled={!reviewAction || reviewMutation.isPending}
              className={cn(
                "flex-1",
                reviewAction === "approved" && "bg-green-500 hover:bg-green-600",
                reviewAction === "rejected" && "bg-red-500 hover:bg-red-600",
                reviewAction === "request_reupload" && "bg-amber-500 hover:bg-amber-600"
              )}
            >
              {reviewMutation.isPending ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Confirm
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
