import { ArrowLeft, BookOpen, Zap, Eye, Wrench, FileText, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PATTestingCourse = () => {
  const modules = [
    {
      id: 1,
      title: "Introduction to Portable Appliance Testing",
      duration: "40 mins",
      status: "available",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Understanding Class I, II, and III Appliances",
      duration: "45 mins",
      status: "available",
      icon: Zap
    },
    {
      id: 3,
      title: "Visual Inspections and Safety Assessment",
      duration: "50 mins",
      status: "available",
      icon: Eye
    },
    {
      id: 4,
      title: "Electrical Testing Methods and Equipment",
      duration: "55 mins",
      status: "available",
      icon: Wrench
    },
    {
      id: 5,
      title: "Documentation, Labelling, and Legal Requirements",
      duration: "45 mins",
      status: "available",
      icon: FileText
    },
    {
      id: "exam",
      title: "Mock Exam",
      duration: "60 mins",
      status: "available",
      icon: GraduationCap,
      isExam: true
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link to="/electrician/upskilling">
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          PAT Testing Certification
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Portable appliance testing procedures and certification requirements
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={module.isExam ? `../pat-testing-mock-exam` : `../pat-testing-module-${module.id}`}
              className="block h-full"
            >
              <div className={`bg-card/50 rounded-lg active:scale-[0.98] active:bg-card/70 transition-all duration-200 cursor-pointer h-full flex flex-col ${module.isExam ? 'ring-2 ring-primary/30' : ''}`}>
                <div className="text-center p-3 sm:p-4 flex-grow flex flex-col justify-center">
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10">
                      <module.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" strokeWidth={2} />
                    </div>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-medium text-primary/70 uppercase tracking-wide mb-1">
                    {module.isExam ? 'Mock Exam' : `Module ${module.id}`}
                  </span>

                  <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight mb-1 line-clamp-2">
                    {module.title}
                  </h3>

                  <p className="text-muted-foreground text-[10px] sm:text-xs">
                    {module.duration}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PATTestingCourse;
