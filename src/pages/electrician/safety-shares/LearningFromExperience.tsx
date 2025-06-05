
import { Helmet } from "react-helmet";
import LearningFromExperienceCard from "@/components/electrician/safety-shares/LearningFromExperienceCard";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LearningFromExperience = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Learning From Experience - Elec-Mate</title>
        <meta name="description" content="Learn from real incidents and near misses in the electrical industry" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/40 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">Learning From Experience</h1>
              <p className="text-muted-foreground">
                Real incidents, near misses, and lessons learned from the field
              </p>
            </div>
          </div>
        </div>

        <LearningFromExperienceCard />
      </div>
    </div>
  );
};

export default LearningFromExperience;
