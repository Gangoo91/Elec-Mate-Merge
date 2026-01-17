import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { useCollege } from "@/contexts/CollegeContext";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  FileText,
  Calendar,
  Clock,
  Users,
  MoreVertical,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileEdit,
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

export function LessonPlansSection() {
  const { lessonPlans, cohorts, staff } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCohort, setFilterCohort] = useState<string>("all");

  const filteredLessons = lessonPlans.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.objectives.some(obj => obj.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === "all" || lesson.status === filterStatus;
    const matchesCohort = filterCohort === "all" || lesson.cohortId === filterCohort;

    return matchesSearch && matchesStatus && matchesCohort;
  });

  // Sort by scheduled date (upcoming first)
  const sortedLessons = [...filteredLessons].sort((a, b) => {
    if (!a.scheduledDate) return 1;
    if (!b.scheduledDate) return -1;
    return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-success/10 text-success border-success/20';
      case 'Draft': return 'bg-warning/10 text-warning border-warning/20';
      case 'Delivered': return 'bg-info/10 text-info border-info/20';
      case 'Archived': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Published': return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'Draft': return <FileEdit className="h-3.5 w-3.5" />;
      case 'Delivered': return <CheckCircle2 className="h-3.5 w-3.5" />;
      default: return <AlertCircle className="h-3.5 w-3.5" />;
    }
  };

  const getCohortName = (cohortId: string) => {
    return cohorts.find(c => c.id === cohortId)?.name || 'Unknown';
  };

  const getTutorName = (tutorId: string) => {
    return staff.find(s => s.id === tutorId)?.name || 'Unknown';
  };

  const isUpcoming = (date?: string) => {
    if (!date) return false;
    const lessonDate = new Date(date);
    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return lessonDate >= today && lessonDate <= weekFromNow;
  };

  const isPast = (date?: string) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Lesson Plans"
        description={`${lessonPlans.filter(l => l.status === 'Published').length} published lesson plans`}
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Lesson Plan</span>
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search lesson plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("", !searchQuery && "pl-9")}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCohort} onValueChange={setFilterCohort}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Users className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Cohort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cohorts</SelectItem>
            {cohorts.filter(c => c.status === 'Active').map(cohort => (
              <SelectItem key={cohort.id} value={cohort.id}>{cohort.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lesson Plans List */}
      <div className="grid gap-3">
        {sortedLessons.map((lesson) => (
          <Card
            key={lesson.id}
            className={`hover:shadow-md transition-shadow ${
              isUpcoming(lesson.scheduledDate) ? 'border-l-4 border-l-primary' :
              isPast(lesson.scheduledDate) && lesson.status !== 'Delivered' ? 'border-l-4 border-l-warning' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                        {isUpcoming(lesson.scheduledDate) && (
                          <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                            Upcoming
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{lesson.topic}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`${getStatusColor(lesson.status)} flex items-center gap-1`}>
                        {getStatusIcon(lesson.status)}
                        {lesson.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Plan</DropdownMenuItem>
                          <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Delivered</DropdownMenuItem>
                          <DropdownMenuItem>Print</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Learning Objectives:</p>
                    <div className="flex flex-wrap gap-1">
                      {lesson.objectives.slice(0, 2).map((obj, i) => (
                        <Badge key={i} variant="secondary" className="text-xs font-normal">
                          {obj.length > 40 ? obj.substring(0, 40) + '...' : obj}
                        </Badge>
                      ))}
                      {lesson.objectives.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{lesson.objectives.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>{getCohortName(lesson.cohortId)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{lesson.durationMinutes} mins</span>
                    </div>
                    {lesson.scheduledDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {new Date(lesson.scheduledDate).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <span className="text-xs text-muted-foreground">
                      Tutor: {getTutorName(lesson.tutorId)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lesson.resources?.length || 0} resources attached
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedLessons.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No lesson plans found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
