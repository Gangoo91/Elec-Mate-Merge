import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FunctionalSkills = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1"
            onClick={() => navigate('/study-centre/apprentice')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-6">
            <BookOpen className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Functional Skills
          </h1>
          <div className="inline-block bg-elec-yellow text-black text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-full mb-6">
            Coming Soon
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive functional skills training in maths, English, and IT designed specifically for electrical apprentices.
          </p>
        </div>

        <div className="bg-card border border-elec-yellow/30 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            What to Expect
          </h2>
          <p className="text-muted-foreground mb-6">
            This course will provide essential skills development in:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-elec-yellow mr-3 mt-1">•</span>
              <span><strong className="text-foreground">Mathematics:</strong> Practical calculations, measurements, and problem-solving relevant to electrical work</span>
            </li>
            <li className="flex items-start">
              <span className="text-elec-yellow mr-3 mt-1">•</span>
              <span><strong className="text-foreground">English:</strong> Technical writing, documentation, and communication skills for the workplace</span>
            </li>
            <li className="flex items-start">
              <span className="text-elec-yellow mr-3 mt-1">•</span>
              <span><strong className="text-foreground">Digital Skills:</strong> IT competencies including software tools, digital documentation, and online research</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            This course is currently under development and will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkills;
