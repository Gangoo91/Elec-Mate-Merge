import { useState, useEffect, useMemo, useCallback } from "react";
import { useCollege } from "@/contexts/CollegeContext";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Users,
  GraduationCap,
  UserCog,
  BookOpen,
  ClipboardCheck,
  FolderOpen,
  FileText,
  Calendar,
  Settings,
  Plus,
  ArrowRight,
  Sparkles,
  Zap,
  LayoutDashboard,
  UsersRound,
  Building2,
} from "lucide-react";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (section: CollegeSection) => void;
}

export function CommandPalette({ open, onOpenChange, onNavigate }: CommandPaletteProps) {
  const { students, staff, courses, cohorts, assessments, portfolios } = useCollege();
  const [search, setSearch] = useState("");

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  // Navigation items
  const navigationItems = [
    { label: "Overview", section: "overview" as CollegeSection, icon: LayoutDashboard, shortcut: "G O" },
    { label: "People Hub", section: "peoplehub" as CollegeSection, icon: Users, shortcut: "G P" },
    { label: "Curriculum Hub", section: "curriculumhub" as CollegeSection, icon: BookOpen, shortcut: "G C" },
    { label: "Assessment Hub", section: "assessmenthub" as CollegeSection, icon: ClipboardCheck, shortcut: "G A" },
    { label: "Resources Hub", section: "resourceshub" as CollegeSection, icon: FolderOpen, shortcut: "G R" },
  ];

  const sectionItems = [
    { label: "Students", section: "students" as CollegeSection, icon: GraduationCap },
    { label: "Tutors", section: "tutors" as CollegeSection, icon: UserCog },
    { label: "Cohorts", section: "cohorts" as CollegeSection, icon: UsersRound },
    { label: "Courses", section: "courses" as CollegeSection, icon: BookOpen },
    { label: "Grading", section: "grading" as CollegeSection, icon: ClipboardCheck },
    { label: "Portfolios", section: "portfolio" as CollegeSection, icon: FolderOpen },
    { label: "Attendance", section: "attendance" as CollegeSection, icon: Calendar },
    { label: "ILP Management", section: "ilpmanagement" as CollegeSection, icon: FileText },
    { label: "EPA Tracking", section: "epatracking" as CollegeSection, icon: Zap },
    { label: "Employer Portal", section: "employerportal" as CollegeSection, icon: Building2 },
    { label: "Settings", section: "collegesettings" as CollegeSection, icon: Settings },
  ];

  // Quick actions
  const quickActions = [
    { label: "Record Grade", action: "grading", icon: ClipboardCheck },
    { label: "Add Student", action: "students", icon: Plus },
    { label: "New Lesson Plan", action: "lessonplans", icon: Plus },
    { label: "Take Attendance", action: "attendance", icon: Calendar },
  ];

  // Filter search results
  const filteredStudents = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return students
      .filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.apprenticeshipStandard?.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [students, search]);

  const filteredStaff = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return staff
      .filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.role.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [staff, search]);

  const filteredCourses = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return courses
      .filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query)
      )
      .slice(0, 3);
  }, [courses, search]);

  const filteredAssessments = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return assessments
      .filter(a =>
        a.unitTitle.toLowerCase().includes(query) ||
        a.assessmentType.toLowerCase().includes(query)
      )
      .slice(0, 3);
  }, [assessments, search]);

  const handleSelect = useCallback((section: CollegeSection) => {
    onNavigate(section);
    onOpenChange(false);
  }, [onNavigate, onOpenChange]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "tutor": return "bg-info/10 text-info";
      case "assessor": return "bg-success/10 text-success";
      case "iqa": return "bg-warning/10 text-warning";
      case "head_of_department": return "bg-purple-500/10 text-purple-500";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatRole = (role: string) => {
    switch (role) {
      case "tutor": return "Tutor";
      case "assessor": return "Assessor";
      case "iqa": return "IQA";
      case "head_of_department": return "HoD";
      case "admin": return "Admin";
      default: return role;
    }
  };

  const hasSearchResults = filteredStudents.length > 0 ||
    filteredStaff.length > 0 ||
    filteredCourses.length > 0 ||
    filteredAssessments.length > 0;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search students, staff, courses... or type a command"
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>
          <div className="py-6 text-center">
            <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">No results found</p>
            <p className="text-xs text-muted-foreground mt-1">Try searching for students, staff, or courses</p>
          </div>
        </CommandEmpty>

        {/* Search Results */}
        {filteredStudents.length > 0 && (
          <CommandGroup heading="Students">
            {filteredStudents.map((student) => (
              <CommandItem
                key={student.id}
                onSelect={() => handleSelect("students")}
                className="flex items-center gap-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-elec-yellow/10 text-elec-yellow">
                    {student.avatarInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{student.apprenticeshipStandard}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {student.status}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredStaff.length > 0 && (
          <CommandGroup heading="Staff">
            {filteredStaff.map((member) => (
              <CommandItem
                key={member.id}
                onSelect={() => handleSelect("tutors")}
                className="flex items-center gap-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`text-xs ${getRoleColor(member.role)}`}>
                    {member.avatarInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{formatRole(member.role)}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredCourses.length > 0 && (
          <CommandGroup heading="Courses">
            {filteredCourses.map((course) => (
              <CommandItem
                key={course.id}
                onSelect={() => handleSelect("courses")}
                className="flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{course.name}</p>
                  <p className="text-xs text-muted-foreground">{course.code}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredAssessments.length > 0 && (
          <CommandGroup heading="Assessments">
            {filteredAssessments.map((assessment) => (
              <CommandItem
                key={assessment.id}
                onSelect={() => handleSelect("grading")}
                className="flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                  <ClipboardCheck className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{assessment.unitTitle}</p>
                  <p className="text-xs text-muted-foreground">{assessment.assessmentType}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {assessment.status}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {hasSearchResults && <CommandSeparator />}

        {/* Quick Actions - show when no search or minimal search */}
        {(!search || search.length < 2) && (
          <>
            <CommandGroup heading="Quick Actions">
              {quickActions.map((action) => (
                <CommandItem
                  key={action.label}
                  onSelect={() => handleSelect(action.action as CollegeSection)}
                  className="flex items-center gap-3"
                >
                  <div className="h-8 w-8 rounded bg-elec-yellow/10 flex items-center justify-center">
                    <action.icon className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <span>{action.label}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto" />
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Navigation">
              {navigationItems.map((item) => (
                <CommandItem
                  key={item.section}
                  onSelect={() => handleSelect(item.section)}
                  className="flex items-center gap-3"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Go to Section">
              {sectionItems.slice(0, 6).map((item) => (
                <CommandItem
                  key={item.section}
                  onSelect={() => handleSelect(item.section)}
                  className="flex items-center gap-3"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>

      <div className="border-t p-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↵</kbd>
            Select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Esc</kbd>
            Close
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-elec-yellow" />
          <span>AI-powered search</span>
        </div>
      </div>
    </CommandDialog>
  );
}
