import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  BookOpen,
  Clock,
  Users,
  Award,
  MoreVertical,
  Filter,
  GraduationCap,
  Layers,
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

export function CoursesSection() {
  const { courses, cohorts, students } = useCollegeSupabase();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.code || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.awarding_body || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = filterLevel === 'all' || (course.level || '') === filterLevel;
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;

    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Draft':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Archived':
        return 'bg-muted text-white';
      default:
        return 'bg-muted text-white';
    }
  };

  const getLevelColor = (level: string | null) => {
    switch (level) {
      case '2':
        return 'bg-info/10 text-info';
      case '3':
        return 'bg-primary/10 text-primary';
      case '4':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-muted text-white';
    }
  };

  const getCohortCount = (courseId: string) => {
    return cohorts.filter((c) => c.course_id === courseId && c.status === 'Active').length;
  };

  const getStudentCount = (courseId: string) => {
    const courseCohorts = cohorts.filter((c) => c.course_id === courseId);
    return students.filter(
      (s) => s.cohort_id && courseCohorts.some((c) => c.id === s.cohort_id) && s.status === 'Active'
    ).length;
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Courses"
        description={`${courses.filter((c) => c.status === 'Active').length} active courses`}
        actions={
          <Button
            className="gap-2 h-11 touch-manipulation"
            onClick={() =>
              toast({ title: 'Add Course', description: 'Course creation dialog is coming soon.' })
            }
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Course</span>
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
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(!searchQuery && 'pl-9')}
          />
        </div>
        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger className="w-full sm:w-[140px] h-11 touch-manipulation">
            <GraduationCap className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="2">Level 2</SelectItem>
            <SelectItem value="3">Level 3</SelectItem>
            <SelectItem value="4">Level 4</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[140px] h-11 touch-manipulation">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredCourses.map((course) => {
          const cohortCount = getCohortCount(course.id);
          const studentCount = getStudentCount(course.id);

          return (
            <Card key={course.id} className="hover:shadow-md transition-shadow touch-manipulation">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{course.name}</h3>
                      <p className="text-sm text-white">{course.code || ''}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-11 w-11 touch-manipulation">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="h-11 touch-manipulation"
                        onClick={() =>
                          toast({
                            title: course.name,
                            description: `${course.awarding_body || 'Unknown'} - Level ${course.level || '?'} - ${course.duration_months} months`,
                          })
                        }
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="h-11 touch-manipulation"
                        onClick={() =>
                          toast({
                            title: 'Edit Course',
                            description: 'Course editing is coming soon.',
                          })
                        }
                      >
                        Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="h-11 touch-manipulation"
                        onClick={() =>
                          toast({
                            title: 'View Cohorts',
                            description: `${cohortCount} active cohort${cohortCount !== 1 ? 's' : ''} for ${course.name}`,
                          })
                        }
                      >
                        View Cohorts
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="h-11 touch-manipulation"
                        onClick={() =>
                          toast({ title: 'Scheme of Work', description: 'Coming soon.' })
                        }
                      >
                        Scheme of Work
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="h-11 touch-manipulation"
                        onClick={() =>
                          toast({ title: 'Assessment Plan', description: 'Coming soon.' })
                        }
                      >
                        Assessment Plan
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                  <Badge variant="secondary" className={getLevelColor(course.level)}>
                    Level {course.level || ''}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Award className="h-3.5 w-3.5" />
                    <span>{course.awarding_body || ''}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{course.duration_months} months</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-white">
                      <Layers className="h-3.5 w-3.5" />
                      <span>{cohortCount} cohorts</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <Users className="h-3.5 w-3.5" />
                      <span>{studentCount} students</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredCourses.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center">
              <p className="text-white">No courses found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
