import { ArrowLeft, FileText, CheckCircle, Clock, BookOpen, Book, Settings, Shield, Wrench, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BS7671Course = () => {
  const modules = [
    {
      id: 1,
      title: "Scope, Object & Fundamental Principles",
      duration: "45 mins",
      status: "available",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Definitions & Key Terminology",
      duration: "50 mins",
      status: "available",
      icon: Book
    },
    {
      id: 3,
      title: "General Characteristics & Selection Criteria",
      duration: "55 mins",
      status: "available",
      icon: Settings
    },
    {
      id: 4,
      title: "Protection for Safety",
      duration: "60 mins",
      status: "available",
      icon: Shield
    },
    {
      id: 5,
      title: "Selection & Erection of Equipment",
      duration: "65 mins",
      status: "available",
      icon: Wrench
    },
    {
      id: 6,
      title: "Inspection, Testing & Certification",
      duration: "55 mins",
      status: "available",
      icon: CheckCircle
    },
    {
      id: 7,
      title: "Special Installations & Locations",
      duration: "50 mins",
      status: "available",
      icon: MapPin
    },
    {
      id: 8,
      title: "Appendices & Latest Amendments",
      duration: "45 mins",
      status: "available",
      icon: FileText
    },
    {
      id: 9,
      title: "Mock Exam",
      duration: "90 mins",
      status: "available",
      icon: GraduationCap
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12">
        <Link to="/electrician/upskilling">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200 mb-4 sm:mb-6 p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              18th Edition Wiring Regulations (BS7671)
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
              Comprehensive BS 7671:2018 wiring regulations and electrical safety requirements
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
            {modules.map((module) => (
              <Link key={module.id} to={`../bs7671-module-${module.id}`} className="block h-full">
                <Card className="bg-card border-border/30 hover:border-primary/40 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col active:scale-[0.98]">
                  <CardContent className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <module.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 font-semibold text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 border-0">
                        Module {module.id}
                      </Badge>
                    </div>

                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                      {module.title}
                    </h3>

                    <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                      Duration: {module.duration}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Course;