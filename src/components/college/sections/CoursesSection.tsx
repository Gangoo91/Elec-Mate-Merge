import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { useCollege } from "@/contexts/CollegeContext";
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

export function CoursesSection() {
  const { courses, cohorts, students } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.awardingBody.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = filterLevel === "all" || course.level.toString() === filterLevel;
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;

    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'Draft': return 'bg-warning/10 text-warning border-warning/20';
      case 'Archived': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 2: return 'bg-info/10 text-info';
      case 3: return 'bg-primary/10 text-primary';
      case 4: return 'bg-purple-500/10 text-purple-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCohortCount = (courseId: string) => {
    return cohorts.filter(c => c.courseId === courseId && c.status === 'Active').length;
  };

  const getStudentCount = (courseId: string) => {
    const courseCohorts = cohorts.filter(c => c.courseId === courseId);
    return students.filter(s =>
      s.cohortId && courseCohorts.some(c => c.id === s.cohortId) && s.status === 'Active'
    ).length;
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Courses"
        description={`${courses.filter(c => c.status === 'Active').length} active courses`}
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Course</span>
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger className="w-full sm:w-[140px]">
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
          <SelectTrigger className="w-full sm:w-[140px]">
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
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.code}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Course</DropdownMenuItem>
                      <DropdownMenuItem>View Cohorts</DropdownMenuItem>
                      <DropdownMenuItem>Scheme of Work</DropdownMenuItem>
                      <DropdownMenuItem>Assessment Plan</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                  <Badge variant="secondary" className={getLevelColor(course.level)}>
                    Level {course.level}
                  </Badge>
                  {course.isApprenticeship && (
                    <Badge variant="outline" className="bg-info/5 text-info border-info/20">
                      Apprenticeship
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-3.5 w-3.5" />
                    <span>{course.awardingBody}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{course.totalGlh} GLH • {course.durationMonths} months</span>
                  </div>
                </div>

                {course.fundingBand && (
                  <div className="mb-3">
                    <Badge variant="outline" className="text-xs">
                      Funding Band: £{course.fundingBand.toLocaleString()}
                    </Badge>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Layers className="h-3.5 w-3.5" />
                      <span>{cohortCount} cohorts</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>{studentCount} students</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{course.units.length} units</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredCourses.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No courses found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
