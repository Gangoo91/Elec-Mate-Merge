
import { Helmet } from "react-helmet";
import LearningFromExperienceCard from "@/components/electrician/safety-shares/LearningFromExperienceCard";
import { BookOpen } from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";

const LearningFromExperience = () => {
  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Learning From Experience - Elec-Mate</title>
        <meta name="description" content="Real electrical incidents, near misses, and lessons learned from the field" />
      </Helmet>

      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <SmartBackButton />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-elec-yellow flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-elec-dark" />
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
