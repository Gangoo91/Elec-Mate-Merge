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
      <div className="px-8 pt-8 pb-12">
        <Link to="/electrician/upskilling">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">
              18th Edition Wiring Regulations (BS7671)
            </h1>
            <p className="text-lg text-white">
              Comprehensive BS 7671:2018 wiring regulations and electrical safety requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {modules.map((module) => (
              <Link key={module.id} to={`../bs7671-module-${module.id}`}>
                <Card 
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                >
                <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center">
                  <div className="flex justify-center">
                    <module.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                  </div>
                  
                  <div className="flex justify-center">
                    <Badge 
                      variant="secondary" 
                      className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-bold text-xs px-3 py-1 border-0"
                    >
                      Module {module.id}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                    {module.title}
                  </h3>
                  
                  <p className="text-white text-xs leading-relaxed">
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