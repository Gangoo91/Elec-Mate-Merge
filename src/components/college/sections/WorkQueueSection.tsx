import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { useCollege } from "@/contexts/CollegeContext";
import { cn } from "@/lib/utils";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";
import {
  Search,
  Inbox,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MoreVertical,
  Filter,
  User,
  FileText,
  FolderOpen,
  ClipboardCheck,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WorkPriority, WorkAssignmentStatus } from "@/data/collegeMockData";

interface WorkQueueSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

export function WorkQueueSection({ onNavigate }: WorkQueueSectionProps) {
  const { workAssignments, staff, updateWorkAssignment, completeWorkAssignment } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  // For demo, we'll show all work assignments
  // In production, this would filter by the current user's ID
  const filteredAssignments = workAssignments.filter(assignment => {
    const matchesSearch = assignment.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.assignedToName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = filterPriority === "all" || assignment.priority === filterPriority;
    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus;
    const matchesType = filterType === "all" || assignment.itemType === filterType;

    return matchesSearch && matchesPriority && matchesStatus && matchesType;
  });

  // Sort by priority then by due date
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    const priorityOrder: Record<WorkPriority, number> = { 'Urgent': 0, 'High': 1, 'Normal': 2, 'Low': 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  // Calculate stats
  const pendingCount = workAssignments.filter(w => w.status === 'Pending').length;
  const inProgressCount = workAssignments.filter(w => w.status === 'In Progress').length;
  const urgentCount = workAssignments.filter(w => w.priority === 'Urgent' && w.status !== 'Completed').length;
  const overdueCount = workAssignments.filter(w => {
    if (!w.dueDate || w.status === 'Completed') return false;
    return new Date(w.dueDate) < new Date();
  }).length;

  const getPriorityColor = (priority: WorkPriority) => {
    switch (priority) {
      case 'Urgent': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'High': return 'bg-warning/10 text-warning border-warning/20';
      case 'Normal': return 'bg-info/10 text-info border-info/20';
      case 'Low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: WorkAssignmentStatus) => {
    switch (status) {
      case 'Pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'In Progress': return 'bg-info/10 text-info border-info/20';
      case 'Completed': return 'bg-success/10 text-success border-success/20';
      case 'Returned': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'submission': return <ClipboardCheck className="h-4 w-4" />;
      case 'evidence': return <FileText className="h-4 w-4" />;
      case 'portfolio': return <FolderOpen className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const handleStartWork = (id: string) => {
    updateWorkAssignment(id, { status: 'In Progress' });
  };

  const handleCompleteWork = (id: string) => {
    completeWorkAssignment(id);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Work Queue"
        description={`${pendingCount + inProgressCount} items awaiting action`}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{urgentCount}</p>
                <p className="text-xs text-muted-foreground">Urgent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{overdueCount}</p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search work items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("", !searchQuery && "pl-9")}
          />
        </div>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-full sm:w-[130px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="Urgent">Urgent</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Normal">Normal</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Returned">Returned</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="submission">Submissions</SelectItem>
            <SelectItem value="evidence">Evidence</SelectItem>
            <SelectItem value="portfolio">Portfolios</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Work Queue List */}
      <div className="grid gap-3">
        {sortedAssignments.map((assignment) => (
          <Card
            key={assignment.id}
            className={`border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 ${
              assignment.status === 'Pending' && isOverdue(assignment.dueDate)
                ? 'border-l-4 border-l-destructive'
                : assignment.priority === 'Urgent'
                ? 'border-l-4 border-l-warning'
                : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center shrink-0">
                  {getTypeIcon(assignment.itemType)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{assignment.itemTitle}</h3>
                      <p className="text-sm text-muted-foreground">{assignment.studentName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getPriorityColor(assignment.priority)}>
                        {assignment.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          {assignment.status === 'Pending' && (
                            <DropdownMenuItem onClick={() => handleStartWork(assignment.id)}>
                              Start Work
                            </DropdownMenuItem>
                          )}
                          {assignment.status === 'In Progress' && (
                            <DropdownMenuItem onClick={() => handleCompleteWork(assignment.id)}>
                              Mark Complete
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>Reassign</DropdownMenuItem>
                          <DropdownMenuItem>Add Note</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span>Assigned to: {assignment.assignedToName}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {assignment.itemType}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {assignment.roleRequired.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Created: {new Date(assignment.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    {assignment.dueDate && (
                      <div className={`flex items-center gap-1 ${isOverdue(assignment.dueDate) ? 'text-destructive' : ''}`}>
                        <Clock className="h-3.5 w-3.5" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                        {isOverdue(assignment.dueDate) && assignment.status !== 'Completed' && (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive text-xs ml-1">
                            Overdue
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {assignment.notes && (
                    <div className="mt-2 p-2 bg-muted/50 rounded-md">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        <span className="font-medium">Note:</span> {assignment.notes}
                      </p>
                    </div>
                  )}

                  {/* Quick Actions */}
                  {assignment.status === 'Pending' && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => handleStartWork(assignment.id)}
                      >
                        Start Work
                      </Button>
                    </div>
                  )}
                  {assignment.status === 'In Progress' && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="text-xs bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                        onClick={() => handleCompleteWork(assignment.id)}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        Mark Complete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedAssignments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Inbox className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No work items found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-1">Your queue is empty or all items are filtered out.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
