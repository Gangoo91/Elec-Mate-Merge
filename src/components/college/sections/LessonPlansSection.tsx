import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/** Parse objectives from a string|null into an array of strings */
function parseObjectives(objectives: string | null): string[] {
  if (!objectives) return [];
  // Split by newline first, then by comma if no newlines found
  const byNewline = objectives
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  if (byNewline.length > 1) return byNewline;
  return objectives
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function LessonPlansSection() {
  const { lessonPlans, cohorts, staff, updateLessonPlan } = useCollegeSupabase();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');

  const filteredLessons = lessonPlans.filter((lesson) => {
    const query = searchQuery.toLowerCase();
    const objectivesStr = lesson.objectives ?? '';
    const matchesSearch =
      lesson.title.toLowerCase().includes(query) || objectivesStr.toLowerCase().includes(query);

    const matchesStatus =
      filterStatus === 'all' ||
      lesson.status === filterStatus ||
      // Handle Published filter matching Approved status
      (filterStatus === 'Published' && lesson.status === 'Approved') ||
      (filterStatus === 'Approved' && lesson.status === 'Published');

    const matchesCohort = filterCohort === 'all' || lesson.cohort_id === filterCohort;

    return matchesSearch && matchesStatus && matchesCohort;
  });

  // Sort by scheduled date (upcoming first)
  const sortedLessons = [...filteredLessons].sort((a, b) => {
    if (!a.scheduled_date) return 1;
    if (!b.scheduled_date) return -1;
    return new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime();
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'Published':
      case 'Approved':
        return 'bg-success/10 text-success border-success/20';
      case 'Draft':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Delivered':
        return 'bg-info/10 text-info border-info/20';
      case 'Archived':
        return 'bg-muted text-white';
      default:
        return 'bg-muted text-white';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'Published':
      case 'Approved':
        return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'Draft':
        return <FileEdit className="h-3.5 w-3.5" />;
      case 'Delivered':
        return <CheckCircle2 className="h-3.5 w-3.5" />;
      default:
        return <AlertCircle className="h-3.5 w-3.5" />;
    }
  };

  const getStatusLabel = (status: string | null) => {
    if (status === 'Approved') return 'Published';
    return status ?? 'Unknown';
  };

  const getCohortName = (cohortId: string | null) => {
    if (!cohortId) return 'Unknown';
    return cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  };

  const getTutorName = (tutorId: string | null) => {
    if (!tutorId) return 'Unknown';
    return staff.find((s) => s.id === tutorId)?.name || 'Unknown';
  };

  const isUpcoming = (date?: string | null) => {
    if (!date) return false;
    const lessonDate = new Date(date);
    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return lessonDate >= today && lessonDate <= weekFromNow;
  };

  const isPast = (date?: string | null) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  const publishedCount = lessonPlans.filter(
    (l) => l.status === 'Published' || l.status === 'Approved'
  ).length;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Lesson Plans"
        description={`${publishedCount} published lesson plans`}
        actions={
          <Button
            className="gap-2 h-11 touch-manipulation"
            onClick={() =>
              toast({
                title: 'New Lesson Plan',
                description: 'Lesson plan creation is coming soon.',
              })
            }
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Lesson Plan</span>
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          )}
          <Input
            placeholder="Search lesson plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn('touch-manipulation', !searchQuery && 'pl-9')}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[150px] h-11 touch-manipulation">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="touch-manipulation">
              All Status
            </SelectItem>
            <SelectItem value="Draft" className="touch-manipulation">
              Draft
            </SelectItem>
            <SelectItem value="Published" className="touch-manipulation">
              Published
            </SelectItem>
            <SelectItem value="Delivered" className="touch-manipulation">
              Delivered
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCohort} onValueChange={setFilterCohort}>
          <SelectTrigger className="w-full sm:w-[180px] h-11 touch-manipulation">
            <Users className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Cohort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="touch-manipulation">
              All Cohorts
            </SelectItem>
            {cohorts
              .filter((c) => c.status === 'Active')
              .map((cohort) => (
                <SelectItem key={cohort.id} value={cohort.id} className="touch-manipulation">
                  {cohort.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lesson Plans List */}
      <div className="grid gap-3">
        {sortedLessons.map((lesson) => {
          const objectives = parseObjectives(lesson.objectives);
          return (
            <Card
              key={lesson.id}
              className={`hover:shadow-md transition-shadow ${
                isUpcoming(lesson.scheduled_date)
                  ? 'border-l-4 border-l-primary'
                  : isPast(lesson.scheduled_date) && lesson.status !== 'Delivered'
                    ? 'border-l-4 border-l-warning'
                    : ''
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
                          <h3 className="font-semibold text-white">{lesson.title}</h3>
                          {isUpcoming(lesson.scheduled_date) && (
                            <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                              Upcoming
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(lesson.status)} flex items-center gap-1`}
                        >
                          {getStatusIcon(lesson.status)}
                          {getStatusLabel(lesson.status)}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-11 w-11 touch-manipulation"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() =>
                                toast({
                                  title: lesson.title,
                                  description:
                                    objectives.length > 0
                                      ? `Objectives: ${objectives.join(', ')}`
                                      : 'No objectives set.',
                                })
                              }
                            >
                              View Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() =>
                                toast({ title: 'Edit Plan', description: 'Coming soon.' })
                              }
                            >
                              Edit Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() =>
                                toast({ title: 'Duplicate', description: 'Coming soon.' })
                              }
                            >
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={async () => {
                                await updateLessonPlan(lesson.id, { status: 'Delivered' });
                                toast({ title: 'Marked as Delivered', description: lesson.title });
                              }}
                            >
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() => window.print()}
                            >
                              Print
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Learning Objectives */}
                    {objectives.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-white mb-1">Learning Objectives:</p>
                        <div className="flex flex-wrap gap-1">
                          {objectives.slice(0, 2).map((obj, i) => (
                            <Badge key={i} variant="secondary" className="text-xs font-normal">
                              {obj.length > 40 ? obj.substring(0, 40) + '...' : obj}
                            </Badge>
                          ))}
                          {objectives.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{objectives.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{getCohortName(lesson.cohort_id)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{lesson.duration_minutes ?? 0} mins</span>
                      </div>
                      {lesson.scheduled_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {new Date(lesson.scheduled_date).toLocaleDateString('en-GB', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <span className="text-xs text-white">
                        Tutor: {getTutorName(lesson.tutor_id)}
                      </span>
                      <span className="text-xs text-white">
                        {lesson.resources?.length || 0} resources attached
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {sortedLessons.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-white">No lesson plans found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
