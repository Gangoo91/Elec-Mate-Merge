import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { useCollege } from "@/contexts/CollegeContext";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  LayoutList,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  MoreVertical,
  Filter,
  BookOpen,
  User,
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

// Mock schemes of work data - would come from context in full implementation
const mockSchemesOfWork = [
  {
    id: 'sow-1',
    title: 'Level 3 Electrical Installation - Year 1',
    courseId: 'course-1',
    courseName: 'Electrical Installation Level 3',
    academicYear: '2024/25',
    totalWeeks: 36,
    completedWeeks: 12,
    status: 'Active',
    createdBy: 'staff-1',
    createdByName: 'John Smith',
    lastUpdated: '2024-01-10',
    units: [
      { name: 'Health & Safety', weeks: 4, completed: true },
      { name: 'Electrical Science', weeks: 8, completed: true },
      { name: 'Installation Methods', weeks: 10, completed: false },
      { name: 'Testing & Inspection', weeks: 8, completed: false },
      { name: 'Fault Diagnosis', weeks: 6, completed: false },
    ],
  },
  {
    id: 'sow-2',
    title: 'Level 2 Electrical Fundamentals',
    courseId: 'course-2',
    courseName: 'Electrical Installation Level 2',
    academicYear: '2024/25',
    totalWeeks: 32,
    completedWeeks: 14,
    status: 'Active',
    createdBy: 'staff-2',
    createdByName: 'Sarah Johnson',
    lastUpdated: '2024-01-08',
    units: [
      { name: 'Introduction to Electrical', weeks: 6, completed: true },
      { name: 'Basic Circuits', weeks: 8, completed: true },
      { name: 'Wiring Systems', weeks: 10, completed: false },
      { name: 'Safety Practices', weeks: 8, completed: false },
    ],
  },
  {
    id: 'sow-3',
    title: 'Level 3 AM2 Preparation',
    courseId: 'course-1',
    courseName: 'Electrical Installation Level 3',
    academicYear: '2024/25',
    totalWeeks: 12,
    completedWeeks: 0,
    status: 'Draft',
    createdBy: 'staff-1',
    createdByName: 'John Smith',
    lastUpdated: '2024-01-05',
    units: [
      { name: 'AM2 Overview', weeks: 2, completed: false },
      { name: 'Practical Skills Review', weeks: 4, completed: false },
      { name: 'Mock Assessments', weeks: 4, completed: false },
      { name: 'Final Preparation', weeks: 2, completed: false },
    ],
  },
];

export function SchemesOfWorkSection() {
  const { courses } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCourse, setFilterCourse] = useState<string>("all");

  const filteredSchemes = mockSchemesOfWork.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.courseName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || scheme.status === filterStatus;
    const matchesCourse = filterCourse === "all" || scheme.courseId === filterCourse;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'Draft': return 'bg-warning/10 text-warning border-warning/20';
      case 'Archived': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressPercent = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Schemes of Work"
        description={`${mockSchemesOfWork.filter(s => s.status === 'Active').length} active schemes`}
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Scheme</span>
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
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(!searchQuery && "pl-9")}
          />
        </div>
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
        <Select value={filterCourse} onValueChange={setFilterCourse}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <BookOpen className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.filter(c => c.status === 'Active').map(course => (
              <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Schemes List */}
      <div className="grid gap-4">
        {filteredSchemes.map((scheme) => {
          const progressPercent = getProgressPercent(scheme.completedWeeks, scheme.totalWeeks);

          return (
            <Card key={scheme.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <LayoutList className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{scheme.title}</h3>
                        <p className="text-sm text-muted-foreground">{scheme.courseName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(scheme.status)}>
                          {scheme.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Scheme</DropdownMenuItem>
                            <DropdownMenuItem>Export to PDF</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{scheme.completedWeeks}/{scheme.totalWeeks} weeks ({progressPercent}%)</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>

                    {/* Units Summary */}
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">Units:</p>
                      <div className="flex flex-wrap gap-2">
                        {scheme.units.map((unit, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
                              unit.completed
                                ? 'bg-success/10 text-success'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {unit.completed ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <Circle className="h-3 w-3" />
                            )}
                            <span>{unit.name}</span>
                            <span className="text-[10px] opacity-70">({unit.weeks}w)</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{scheme.academicYear}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{scheme.totalWeeks} weeks total</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{scheme.createdByName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredSchemes.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No schemes of work found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
