import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  FolderOpen,
  UserCog,
  UsersRound,
  Calendar,
  FileText,
  BookMarked,
  Presentation,
  CheckSquare,
  Clock,
  Target,
  Award,
  TrendingUp,
  Library,
  Shield,
  Plug,
  Settings,
  School
} from "lucide-react";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";

interface CollegeMobileNavSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (section: CollegeSection) => void;
  currentSection: CollegeSection;
}

interface NavItem {
  id: CollegeSection;
  label: string;
  icon: React.ReactNode;
  indent?: boolean;
}

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { id: "overview", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
    ]
  },
  {
    title: "People Hub",
    items: [
      { id: "peoplehub", label: "People Hub", icon: <Users className="h-4 w-4" /> },
      { id: "tutors", label: "Tutors", icon: <UserCog className="h-4 w-4" />, indent: true },
      { id: "students", label: "Students", icon: <GraduationCap className="h-4 w-4" />, indent: true },
      { id: "cohorts", label: "Cohorts", icon: <UsersRound className="h-4 w-4" />, indent: true },
      { id: "supportstaff", label: "Support Staff", icon: <Users className="h-4 w-4" />, indent: true },
    ]
  },
  {
    title: "Curriculum Hub",
    items: [
      { id: "curriculumhub", label: "Curriculum Hub", icon: <BookOpen className="h-4 w-4" /> },
      { id: "courses", label: "Courses", icon: <BookMarked className="h-4 w-4" />, indent: true },
      { id: "lessonplans", label: "Lesson Plans", icon: <Presentation className="h-4 w-4" />, indent: true },
      { id: "teachingresources", label: "Resources", icon: <FileText className="h-4 w-4" />, indent: true },
      { id: "schemesofwork", label: "Schemes of Work", icon: <Calendar className="h-4 w-4" />, indent: true },
    ]
  },
  {
    title: "Assessment Hub",
    items: [
      { id: "assessmenthub", label: "Assessment Hub", icon: <ClipboardCheck className="h-4 w-4" /> },
      { id: "grading", label: "Grading", icon: <CheckSquare className="h-4 w-4" />, indent: true },
      { id: "attendance", label: "Attendance", icon: <Clock className="h-4 w-4" />, indent: true },
      { id: "ilpmanagement", label: "ILP Management", icon: <Target className="h-4 w-4" />, indent: true },
      { id: "epatracking", label: "EPA Tracking", icon: <Award className="h-4 w-4" />, indent: true },
      { id: "progresstracking", label: "Progress", icon: <TrendingUp className="h-4 w-4" />, indent: true },
    ]
  },
  {
    title: "Resources Hub",
    items: [
      { id: "resourceshub", label: "Resources Hub", icon: <FolderOpen className="h-4 w-4" /> },
      { id: "documentlibrary", label: "Document Library", icon: <Library className="h-4 w-4" />, indent: true },
      { id: "compliancedocs", label: "Compliance", icon: <Shield className="h-4 w-4" />, indent: true },
      { id: "ltisettings", label: "LTI / VLE", icon: <Plug className="h-4 w-4" />, indent: true },
      { id: "collegesettings", label: "Settings", icon: <Settings className="h-4 w-4" />, indent: true },
    ]
  },
];

export function CollegeMobileNavSheet({
  open,
  onOpenChange,
  onNavigate,
  currentSection
}: CollegeMobileNavSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <School className="h-5 w-5 text-primary" />
            </div>
            <span>College Hub</span>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-2">
            {navGroups.map((group) => (
              <div key={group.title} className="mb-4">
                <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {group.title}
                </p>
                {group.items.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentSection === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 h-10 ${item.indent ? 'pl-8' : ''}`}
                    onClick={() => onNavigate(item.id)}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
