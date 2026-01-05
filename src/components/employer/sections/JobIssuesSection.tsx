import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Wrench,
  Package,
  Shield,
  MapPin,
  MessageSquare,
  Plus,
  Filter
} from "lucide-react";
import { jobIssues, employees, jobs } from "@/data/employerMockData";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const categoryIcons: Record<string, any> = {
  "Materials": Package,
  "Safety": Shield,
  "Access": MapPin,
  "Design": Wrench,
};

const priorityColors: Record<string, string> = {
  "Critical": "bg-destructive text-destructive-foreground",
  "High": "bg-destructive/80 text-destructive-foreground",
  "Medium": "bg-warning text-warning-foreground",
  "Low": "bg-muted text-muted-foreground",
};

export function JobIssuesSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<typeof jobIssues[0] | null>(null);

  const filteredIssues = jobIssues.filter(issue => {
    const matchesSearch = 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? issue.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const openIssues = jobIssues.filter(i => i.status === "Open").length;
  const inProgressIssues = jobIssues.filter(i => i.status === "In Progress").length;
  const resolvedIssues = jobIssues.filter(i => i.status === "Resolved").length;
  const criticalIssues = jobIssues.filter(i => i.priority === "Critical" || i.priority === "High").length;

  const handleResolve = (issueId: string) => {
    toast({
      title: "Issue Resolved",
      description: "The issue has been marked as resolved."
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Live Issues</h1>
          <p className="text-sm text-muted-foreground">Track and resolve job blockers in real-time</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full bg-elec-gray"
            />
          </div>
          <Button className="touch-feedback">
            <Plus className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        </div>
      </div>

      {/* Summary Stats - Clickable filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card 
          className={cn(
            "bg-elec-gray cursor-pointer transition-all touch-feedback",
            statusFilter === "Open" && "ring-2 ring-destructive"
          )}
          onClick={() => setStatusFilter(statusFilter === "Open" ? null : "Open")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-destructive">{openIssues}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Open</p>
              </div>
              <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-destructive opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card 
          className={cn(
            "bg-elec-gray cursor-pointer transition-all touch-feedback",
            statusFilter === "In Progress" && "ring-2 ring-warning"
          )}
          onClick={() => setStatusFilter(statusFilter === "In Progress" ? null : "In Progress")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-warning">{inProgressIssues}</p>
                <p className="text-xs md:text-sm text-muted-foreground">In Progress</p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-warning opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card 
          className={cn(
            "bg-elec-gray cursor-pointer transition-all touch-feedback",
            statusFilter === "Resolved" && "ring-2 ring-success"
          )}
          onClick={() => setStatusFilter(statusFilter === "Resolved" ? null : "Resolved")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-success">{resolvedIssues}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Resolved</p>
              </div>
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-success opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/30 touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-destructive">{criticalIssues}</p>
                <p className="text-xs md:text-sm text-muted-foreground">High Priority</p>
              </div>
              <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-destructive opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {filteredIssues.map((issue) => {
          const CategoryIcon = categoryIcons[issue.category] || AlertCircle;
          const reporter = employees.find(e => e.id === issue.reportedBy);

          return (
            <Card 
              key={issue.id} 
              className={cn(
                "bg-elec-gray overflow-hidden touch-feedback",
                (issue.priority === "High" || issue.priority === "Critical") && "border-l-4 border-l-destructive"
              )}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      issue.status === "Resolved" ? "bg-success/20" : "bg-destructive/20"
                    )}>
                      <CategoryIcon className={cn(
                        "h-4 w-4 md:h-5 md:w-5",
                        issue.status === "Resolved" ? "text-success" : "text-destructive"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-foreground text-sm">{issue.title}</h4>
                        <Badge className={priorityColors[issue.priority] + " text-[10px]"}>
                          {issue.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {issue.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Wrench className="h-3 w-3" />
                          {issue.jobTitle}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {issue.reportedDate}
                        </span>
                        {issue.affectsCompletion && (
                          <Badge variant="destructive" className="text-[10px]">
                            <AlertTriangle className="h-2 w-2 mr-1" />
                            Timeline
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {issue.resolution && (
                    <div className="p-2 bg-success/10 rounded-lg">
                      <p className="text-xs text-success">
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                        <strong>Resolution:</strong> {issue.resolution}
                      </p>
                    </div>
                  )}

                  {issue.status !== "Resolved" && (
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 touch-feedback">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent className={isMobile ? "max-w-[95vw]" : ""}>
                          <DialogHeader>
                            <DialogTitle>Update Issue</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div>
                              <label className="text-sm font-medium text-foreground">Resolution Notes</label>
                              <Textarea 
                                placeholder="Describe how the issue was resolved..."
                                className="mt-1"
                              />
                            </div>
                            <Button 
                              className="w-full touch-feedback"
                              onClick={() => handleResolve(issue.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Resolved
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm" 
                        onClick={() => handleResolve(issue.id)}
                        className="flex-1 touch-feedback"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredIssues.length === 0 && (
          <Card className="bg-elec-gray">
            <CardContent className="p-6 md:p-8 text-center">
              <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-success mx-auto mb-4" />
              <h3 className="text-base md:text-lg font-semibold text-foreground">No issues found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {statusFilter ? `No ${statusFilter.toLowerCase()} issues` : "All issues have been resolved"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
