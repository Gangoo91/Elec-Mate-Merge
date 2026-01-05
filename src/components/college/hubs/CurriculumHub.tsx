import { Card, CardContent } from "@/components/ui/card";
import { CollegeFeatureTile } from "@/components/college/CollegeFeatureTile";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { SmartEvidenceTagger } from "@/components/college/widgets/SmartEvidenceTagger";
import { Button } from "@/components/ui/button";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";
import { useCollege } from "@/contexts/CollegeContext";
import {
  BookOpen,
  BookMarked,
  Presentation,
  FileText,
  Calendar,
  Plus,
  Upload,
  Sparkles,
  Bot,
  Clock,
  Tag,
} from "lucide-react";

interface CurriculumHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function CurriculumHub({ onNavigate }: CurriculumHubProps) {
  const { courses, lessonPlans, teachingResources, getUpcomingLessons } = useCollege();

  const activeCourses = courses.filter(c => c.status === 'Active').length;
  const upcomingLessons = getUpcomingLessons(7);
  const draftLessons = lessonPlans.filter(lp => lp.status === 'Draft').length;
  const totalResources = teachingResources.length;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Curriculum Hub"
        description="Manage courses, lesson plans and teaching resources"
        action={
          <Button className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black">
            <Plus className="h-4 w-4" />
            New Lesson
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{activeCourses}</p>
              <p className="text-xs text-muted-foreground">Courses</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Presentation className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">{lessonPlans.length}</p>
              <p className="text-xs text-muted-foreground">Lessons</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{totalResources}</p>
              <p className="text-xs text-muted-foreground">Resources</p>
            </div>
          </CardContent>
        </Card>
        {draftLessons > 0 && (
          <Card className="bg-warning/10 border-warning/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{draftLessons}</p>
                <p className="text-xs text-muted-foreground">Drafts</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Navigation */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Content Management
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <CollegeFeatureTile
            icon={BookMarked}
            title="Courses"
            description="Qualifications & units"
            onClick={() => onNavigate("courses")}
            badge={`${activeCourses} active`}
          />
          <CollegeFeatureTile
            icon={Presentation}
            title="Lesson Plans"
            description="Create & manage lessons"
            onClick={() => onNavigate("lessonplans")}
            badge={draftLessons > 0 ? `${draftLessons} drafts` : undefined}
            badgeVariant="warning"
          />
          <CollegeFeatureTile
            icon={FileText}
            title="Teaching Resources"
            description="Materials & uploads"
            onClick={() => onNavigate("teachingresources")}
            badge={`${totalResources} files`}
          />
          <CollegeFeatureTile
            icon={Calendar}
            title="Schemes of Work"
            description="Term & year planning"
            onClick={() => onNavigate("schemesofwork")}
          />
        </div>
      </div>

      {/* AI Tools */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          AI-Powered Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CollegeFeatureTile
            icon={Sparkles}
            title="Teaching Notebook"
            description="AI-powered notes, summaries & quiz generation"
            onClick={() => onNavigate("tutornotebook")}
            badge="AI"
            badgeVariant="success"
          />
          <SmartEvidenceTagger compact />
        </div>
      </div>

      {/* Upcoming Lessons */}
      {upcomingLessons.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-info rounded-full"></span>
            Upcoming This Week
          </h2>
          <CollegeFeatureTile
            icon={Clock}
            title={upcomingLessons[0]?.title || 'View scheduled lessons'}
            description={`${upcomingLessons.length} lessons scheduled`}
            onClick={() => onNavigate("lessonplans")}
            badge={`${upcomingLessons.length}`}
            badgeVariant="info"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <CollegeFeatureTile
            icon={Plus}
            title="New Lesson"
            description="Create plan"
            onClick={() => onNavigate("lessonplans")}
            compact
          />
          <CollegeFeatureTile
            icon={Upload}
            title="Upload Resource"
            description="Add materials"
            onClick={() => onNavigate("teachingresources")}
            compact
          />
          <CollegeFeatureTile
            icon={BookMarked}
            title="Add Course"
            description="New qualification"
            onClick={() => onNavigate("courses")}
            compact
          />
          <CollegeFeatureTile
            icon={Sparkles}
            title="AI Notebook"
            description="Generate content"
            onClick={() => onNavigate("tutornotebook")}
            compact
          />
        </div>
      </div>
    </div>
  );
}
