import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { CommentThread } from "@/components/college/comments";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Search,
  FolderOpen,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Plus,
  Filter,
  ChevronRight,
  Upload,
  MessageSquare,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";

interface PortfolioSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type PortfolioStatus = 'In Progress' | 'Ready for Review' | 'Under Review' | 'Approved' | 'Completed';
type EvidenceStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Resubmit Required';

const getStatusColor = (status: PortfolioStatus) => {
  switch (status) {
    case 'In Progress': return 'bg-info/10 text-info border-info/20';
    case 'Ready for Review': return 'bg-warning/10 text-warning border-warning/20';
    case 'Under Review': return 'bg-primary/10 text-primary border-primary/20';
    case 'Approved': return 'bg-success/10 text-success border-success/20';
    case 'Completed': return 'bg-success/10 text-success border-success/20';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getEvidenceStatusColor = (status: EvidenceStatus) => {
  switch (status) {
    case 'Draft': return 'bg-muted text-muted-foreground';
    case 'Submitted': return 'bg-info/10 text-info border-info/20';
    case 'Under Review': return 'bg-primary/10 text-primary border-primary/20';
    case 'Approved': return 'bg-success/10 text-success border-success/20';
    case 'Rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'Resubmit Required': return 'bg-warning/10 text-warning border-warning/20';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getEvidenceIcon = (type: string) => {
  switch (type) {
    case 'Document': return <FileText className="h-4 w-4" />;
    case 'Image': return <Image className="h-4 w-4" />;
    case 'Video': return <Video className="h-4 w-4" />;
    case 'Link': return <LinkIcon className="h-4 w-4" />;
    case 'Observation': return <Eye className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getStatusIcon = (status: EvidenceStatus) => {
  switch (status) {
    case 'Approved': return <CheckCircle className="h-4 w-4 text-success" />;
    case 'Submitted': case 'Under Review': return <Clock className="h-4 w-4 text-primary" />;
    case 'Rejected': return <XCircle className="h-4 w-4 text-destructive" />;
    case 'Resubmit Required': return <AlertCircle className="h-4 w-4 text-warning" />;
    default: return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

export function PortfolioSection({ onNavigate }: PortfolioSectionProps) {
  const { portfolios, portfolioEvidence, students, getEvidenceByPortfolio, getCommentsForItem } = useCollege();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [commentsSheetOpen, setCommentsSheetOpen] = useState(false);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);

  const filteredPortfolios = portfolios.filter(p => {
    const matchesSearch = p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedPortfolio = selectedPortfolioId ? portfolios.find(p => p.id === selectedPortfolioId) : null;
  const selectedEvidence = selectedPortfolioId ? getEvidenceByPortfolio(selectedPortfolioId) : [];

  const totalPortfolios = portfolios.length;
  const inProgressCount = portfolios.filter(p => p.status === 'In Progress').length;
  const readyForReviewCount = portfolios.filter(p => p.status === 'Ready for Review' || p.status === 'Under Review').length;
  const completedCount = portfolios.filter(p => p.status === 'Approved' || p.status === 'Completed').length;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Student Portfolios"
        description="Manage student portfolios and evidence submissions"
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Portfolio</span>
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold">{totalPortfolios}</p>
                <p className="text-xs text-muted-foreground">Total Portfolios</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold">{readyForReviewCount}</p>
                <p className="text-xs text-muted-foreground">Awaiting Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student or course..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Ready for Review">Ready for Review</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Portfolio List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground px-1">
            {filteredPortfolios.length} Portfolio{filteredPortfolios.length !== 1 ? 's' : ''}
          </h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredPortfolios.map((portfolio) => {
              const student = students.find(s => s.id === portfolio.studentId);
              const isSelected = selectedPortfolioId === portfolio.id;

              return (
                <Card
                  key={portfolio.id}
                  className={cn(
                    "cursor-pointer border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300",
                    isSelected && "border-elec-yellow bg-elec-yellow/5"
                  )}
                  onClick={() => setSelectedPortfolioId(portfolio.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs">
                          {student?.avatarInitials || portfolio.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-medium text-sm truncate">{portfolio.studentName}</h4>
                          <ChevronRight className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform",
                            isSelected && "rotate-90"
                          )} />
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{portfolio.courseName}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress value={portfolio.completionPercentage} className="h-1.5 flex-1" />
                          <span className="text-xs font-medium">{portfolio.completionPercentage}%</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className={cn("text-xs", getStatusColor(portfolio.status))}>
                            {portfolio.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {portfolio.approvedEvidence}/{portfolio.totalEvidence} approved
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filteredPortfolios.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <FolderOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No portfolios found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Portfolio Detail / Evidence List */}
        <div className="lg:col-span-2">
          {selectedPortfolio ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{selectedPortfolio.studentName}'s Portfolio</CardTitle>
                    <p className="text-sm text-muted-foreground">{selectedPortfolio.courseName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Upload className="h-4 w-4" />
                      <span className="hidden sm:inline">Add Evidence</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => setCommentsSheetOpen(true)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="hidden sm:inline">Comments</span>
                      {getCommentsForItem('portfolio', selectedPortfolio.id).length > 0 && (
                        <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                          {getCommentsForItem('portfolio', selectedPortfolio.id).length}
                        </Badge>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Progress Summary */}
                <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">{selectedPortfolio.totalEvidence}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="p-2 rounded-lg bg-success/10">
                    <p className="text-lg font-bold text-success">{selectedPortfolio.approvedEvidence}</p>
                    <p className="text-xs text-muted-foreground">Approved</p>
                  </div>
                  <div className="p-2 rounded-lg bg-warning/10">
                    <p className="text-lg font-bold text-warning">{selectedPortfolio.pendingEvidence}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">{selectedPortfolio.totalEvidence - selectedPortfolio.approvedEvidence - selectedPortfolio.pendingEvidence}</p>
                    <p className="text-xs text-muted-foreground">Other</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <h4 className="text-sm font-medium mb-3">Evidence Items</h4>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {selectedEvidence.length > 0 ? (
                    selectedEvidence.map((evidence) => {
                      const commentsCount = getCommentsForItem('evidence', evidence.id).length;

                      return (
                        <div
                          key={evidence.id}
                          className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedEvidenceId(evidence.id);
                            setCommentsSheetOpen(true);
                          }}
                        >
                          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            {getEvidenceIcon(evidence.evidenceType)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h5 className="font-medium text-sm">{evidence.title}</h5>
                                <p className="text-xs text-muted-foreground line-clamp-1">{evidence.description}</p>
                              </div>
                              {getStatusIcon(evidence.status)}
                            </div>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <Badge variant="outline" className={cn("text-xs", getEvidenceStatusColor(evidence.status))}>
                                {evidence.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{evidence.unitId}</span>
                              {evidence.assessmentCriteria.length > 0 && (
                                <span className="text-xs text-muted-foreground">
                                  {evidence.assessmentCriteria.slice(0, 2).join(', ')}
                                  {evidence.assessmentCriteria.length > 2 && ` +${evidence.assessmentCriteria.length - 2}`}
                                </span>
                              )}
                              {commentsCount > 0 && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  {commentsCount}
                                </span>
                              )}
                            </div>
                            {evidence.reviewFeedback && (
                              <div className="mt-2 p-2 rounded bg-muted/50 text-xs text-muted-foreground">
                                <span className="font-medium">Feedback:</span> {evidence.reviewFeedback}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No evidence items yet</p>
                      <Button variant="link" size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-1" />
                        Add first evidence
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full min-h-[400px] flex items-center justify-center border-dashed">
              <CardContent className="text-center">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-medium mb-1">Select a Portfolio</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a student portfolio from the list to view their evidence
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Comments Sheet */}
      <Sheet open={commentsSheetOpen} onOpenChange={setCommentsSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {selectedEvidenceId ? "Evidence Comments" : "Portfolio Comments"}
            </SheetTitle>
            {selectedEvidenceId && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEvidenceId(null)}
                  className="text-xs text-muted-foreground"
                >
                  View Portfolio Comments
                </Button>
              </div>
            )}
          </SheetHeader>

          {selectedPortfolio && (
            <CommentThread
              contextType={selectedEvidenceId ? "evidence" : "portfolio"}
              contextId={selectedEvidenceId || selectedPortfolio.id}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
