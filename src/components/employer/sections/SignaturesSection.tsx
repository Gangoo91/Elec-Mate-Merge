import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/employer/SectionHeader";
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
  Mail
} from "lucide-react";
import { customerSignatures } from "@/data/employerMockData";
import { toast } from "@/hooks/use-toast";

export function SignaturesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "signed">("all");

  const filteredSignatures = customerSignatures.filter(sig => {
    const matchesSearch = 
      sig.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "pending") return matchesSearch && sig.status !== "Signed";
    if (activeTab === "signed") return matchesSearch && sig.status === "Signed";
    return matchesSearch;
  });

  const pendingCount = customerSignatures.filter(s => s.status !== "Signed").length;
  const signedCount = customerSignatures.filter(s => s.status === "Signed").length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Signed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "Pending": return <Clock className="h-4 w-4 text-warning" />;
      case "Awaiting": return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Signed": return <Badge className="bg-success/20 text-success border-0">Signed</Badge>;
      case "Pending": return <Badge className="bg-warning/20 text-warning border-0">Pending</Badge>;
      case "Awaiting": return <Badge variant="secondary">Awaiting</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleResend = (id: string) => {
    toast({
      title: "Signature Request Sent",
      description: "Email reminder sent to customer.",
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Customer Signatures"
        description="Digital signature capture and tracking"
      />

      {/* Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-warning/10 border-warning/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-warning" />
            <div>
              <p className="text-lg font-bold text-foreground">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{signedCount}</p>
              <p className="text-xs text-muted-foreground">Signed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <PenTool className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{customerSignatures.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        <Badge 
          variant={activeTab === "all" ? "default" : "outline"}
          className="cursor-pointer touch-feedback whitespace-nowrap"
          onClick={() => setActiveTab("all")}
        >
          All ({customerSignatures.length})
        </Badge>
        <Badge 
          variant={activeTab === "pending" ? "default" : "outline"}
          className="cursor-pointer touch-feedback whitespace-nowrap"
          onClick={() => setActiveTab("pending")}
        >
          Pending ({pendingCount})
        </Badge>
        <Badge 
          variant={activeTab === "signed" ? "default" : "outline"}
          className="cursor-pointer touch-feedback whitespace-nowrap"
          onClick={() => setActiveTab("signed")}
        >
          Signed ({signedCount})
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by job or customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-elec-gray border-border"
        />
      </div>

      {/* Signature Cards */}
      <div className="space-y-3">
        {filteredSignatures.map((sig) => {
          const isExpanded = expandedCard === sig.id;

          return (
            <Card key={sig.id} className="bg-elec-gray border-border overflow-hidden">
              <CardContent className="p-0">
                <div 
                  className="p-4 cursor-pointer touch-feedback"
                  onClick={() => setExpandedCard(isExpanded ? null : sig.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(sig.status)}
                        <h3 className="font-semibold text-foreground truncate">{sig.jobTitle}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{sig.customerName}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {sig.documentType}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {getStatusBadge(sig.status)}
                      {sig.signedDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(sig.signedDate).toLocaleDateString("en-GB")}
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
                        <p className="font-medium">{sig.customerName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <p className="font-medium text-xs break-all">{sig.customerEmail}</p>
                      </div>
                      {sig.linkedInvoice && (
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Linked Invoice:</span>
                          <p className="font-medium">{sig.linkedInvoice}</p>
                        </div>
                      )}
                    </div>

                    {sig.status === "Signed" && sig.signatureImage && (
                      <div className="p-3 bg-background rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <PenTool className="h-4 w-4 text-success" />
                          <span className="text-sm font-medium text-success">Signature Captured</span>
                        </div>
                        <div className="h-16 bg-muted rounded flex items-center justify-center">
                          <span className="text-muted-foreground text-sm italic">Signature preview</span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {sig.status !== "Signed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResend(sig.id);
                          }}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Resend
                        </Button>
                      )}
                      <Button
                        variant={sig.status === "Signed" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                      >
                        {sig.status === "Signed" ? (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSignatures.length === 0 && (
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-8 text-center">
            <PenTool className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No signatures found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}