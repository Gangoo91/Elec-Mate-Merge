import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { ComplianceDashboard } from "@/components/employer/ComplianceDashboard";
import { QualificationTracker } from "@/components/employer/QualificationTracker";
import {
  useComplianceDocuments,
  useComplianceStats,
  useCreateComplianceDocument,
  useUpdateSignatures,
  useDeleteComplianceDocument,
  type ComplianceDocument,
  type DocumentType,
  type DocumentCategory
} from "@/hooks/useComplianceDocuments";
import {
  Shield,
  FileCheck,
  CheckCircle2,
  Clock,
  Search,
  Download,
  Plus,
  Loader2,
  RefreshCw,
  AlertTriangle,
  Trash2,
  FileText,
  Award,
  Building2,
  Car,
} from "lucide-react";

const statusColors: Record<string, string> = {
  "Current": "bg-green-500/20 text-green-400",
  "Pending": "bg-yellow-500/20 text-yellow-400",
  "Expiring": "bg-orange-500/20 text-orange-400",
  "Expired": "bg-red-500/20 text-red-400",
  "Draft": "bg-gray-500/20 text-gray-400",
};

const documentTypes: DocumentType[] = ["RAMS Sign-off", "Permit", "Induction", "Briefing", "Method Statement", "Certificate", "Policy"];
const categories: DocumentCategory[] = ["Safety", "Permits", "Induction", "Training", "Legal", "Insurance"];

export function ComplianceSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewDoc, setShowNewDoc] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>("RAMS Sign-off");
  const [category, setCategory] = useState<DocumentCategory>("Safety");
  const [signaturesRequired, setSignaturesRequired] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Handle category click from dashboard
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category === "qualifications") {
      setActiveTab("qualifications");
    } else {
      setActiveTab("documents");
    }
  };

  // Hooks
  const { data: documents, isLoading, error, refetch } = useComplianceDocuments();
  const { data: stats } = useComplianceStats();
  const createDocument = useCreateComplianceDocument();
  const updateSignatures = useUpdateSignatures();
  const deleteDocument = useDeleteComplianceDocument();

  // Filter by search
  const filteredDocuments = documents?.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.document_type?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleCreateDocument = async () => {
    if (!title) return;

    await createDocument.mutateAsync({
      title,
      document_type: documentType,
      category,
      signatures_required: parseInt(signaturesRequired) || 0,
      signatures_collected: 0,
      status: "Pending",
      expiry_date: expiryDate || undefined,
    });

    // Reset form
    setTitle("");
    setDocumentType("RAMS Sign-off");
    setCategory("Safety");
    setSignaturesRequired("");
    setExpiryDate("");
    setShowNewDoc(false);
  };

  const handleAddSignature = async (doc: ComplianceDocument) => {
    if (doc.signatures_collected < doc.signatures_required) {
      await updateSignatures.mutateAsync({
        id: doc.id,
        signatures_collected: doc.signatures_collected + 1,
      });
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDocument.mutateAsync(id);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Failed to load compliance documents</p>
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
          title="Compliance & Qualifications"
          description="Track certifications, insurance, and compliance documents"
        />

        <Sheet open={showNewDoc} onOpenChange={setShowNewDoc}>
          <SheetTrigger asChild>
            <Button className="gap-2 h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <Plus className="h-4 w-4" />
              Add Document
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle>Add Compliance Document</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Document Title *</Label>
                  <Input
                    placeholder="e.g. RAMS Acknowledgement Record..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                  <Label>Category</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as DocumentCategory)}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Signatures Required</Label>
                  <Input
                    type="number"
                    placeholder="Number of signatures needed..."
                    value={signaturesRequired}
                    onChange={(e) => setSignaturesRequired(e.target.value)}
                    className="h-11 touch-manipulation"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Expiry Date (Optional)</Label>
                  <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewDoc(false)}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateDocument}
                    disabled={!title || createDocument.isPending}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    {createDocument.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Add Document"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 h-11">
          <TabsTrigger value="dashboard" className="text-xs">
            <Shield className="h-4 w-4 mr-1.5" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="qualifications" className="text-xs">
            <Award className="h-4 w-4 mr-1.5" />
            Qualifications
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-xs">
            <FileText className="h-4 w-4 mr-1.5" />
            Documents
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="mt-0 space-y-4">
          <ComplianceDashboard onCategoryClick={handleCategoryClick} />
        </TabsContent>

        {/* Qualifications Tab */}
        <TabsContent value="qualifications" className="mt-0 space-y-4">
          <QualificationTracker />
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-0 space-y-4">
          {/* Search */}
          <div className="relative">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              placeholder="Search compliance documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn("h-11 touch-manipulation", !searchQuery && "pl-9")}
            />
          </div>

          {/* Active Documents */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="w-1 h-5 bg-success rounded-full"></span>
                Compliance Documents
              </h2>
              <button className="text-xs text-elec-yellow hover:underline flex items-center gap-1">
                <Download className="h-3 w-3" />
                Export Pack
              </button>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-elec-gray border-border">
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-2 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredDocuments.length === 0 ? (
              <Card className="bg-elec-gray border-border">
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Documents</h3>
                  <p className="text-muted-foreground mb-4">Add your first compliance document to get started.</p>
                  <Button onClick={() => setShowNewDoc(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Document
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredDocuments.map((doc) => {
                  const isComplete = doc.signatures_required > 0 && doc.signatures_collected >= doc.signatures_required;
                  const progress = doc.signatures_required > 0
                    ? (doc.signatures_collected / doc.signatures_required) * 100
                    : 100;

                  return (
                    <Card key={doc.id} className={`hover:bg-muted/50 transition-colors ${
                      !isComplete && doc.signatures_required > 0 ? "border-l-4 border-l-warning" : ""
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`p-2 rounded-lg ${
                              isComplete ? "bg-success/10" : "bg-warning/10"
                            }`}>
                              <FileCheck className={`h-4 w-4 ${
                                isComplete ? "text-success" : "text-warning"
                              }`} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-sm md:text-base">{doc.title}</p>
                              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                                {doc.category && (
                                  <Badge variant="outline" className="text-xs">
                                    {doc.category}
                                  </Badge>
                                )}
                                {doc.document_type && (
                                  <span>{doc.document_type}</span>
                                )}
                              </div>
                              {doc.signatures_required > 0 && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {doc.signatures_collected}/{doc.signatures_required} signatures collected
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={statusColors[doc.status] || statusColors["Pending"]}>
                              {isComplete ? "Complete" : doc.signatures_required > 0
                                ? `${doc.signatures_required - doc.signatures_collected} pending`
                                : doc.status}
                            </Badge>
                            <div className="flex items-center gap-1">
                              {!isComplete && doc.signatures_required > 0 && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleAddSignature(doc)}
                                  disabled={updateSignatures.isPending}
                                  className="h-8 text-xs touch-manipulation"
                                >
                                  {updateSignatures.isPending ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    <>
                                      <CheckCircle2 className="h-3 w-3 mr-1" />
                                      Sign
                                    </>
                                  )}
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(doc.id)}
                                disabled={deleteDocument.isPending}
                                className="h-8 text-xs text-destructive hover:text-destructive touch-manipulation"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Progress bar */}
                        {doc.signatures_required > 0 && (
                          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isComplete ? "bg-success" : "bg-warning"}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Export Options */}
          <div>
            <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-info rounded-full"></span>
              Evidence Packs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer touch-manipulation">
                <CardContent className="p-4 flex items-center gap-3">
                  <Download className="h-5 w-5 text-info" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Export All Evidence</p>
                    <p className="text-xs text-muted-foreground">Download complete compliance pack</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer touch-manipulation">
                <CardContent className="p-4 flex items-center gap-3">
                  <FileText className="h-5 w-5 text-info" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Generate Audit Report</p>
                    <p className="text-xs text-muted-foreground">Create compliance summary</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
