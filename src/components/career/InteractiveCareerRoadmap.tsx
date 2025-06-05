
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, MapPin, Calendar, Award } from "lucide-react";
import { useCareerProgress } from "@/hooks/career/useCareerProgress";

interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  requirements: string[];
  achievements: string[];
}

const roadmapStages: RoadmapStage[] = [
  {
    id: "apprentice",
    title: "Electrical Apprentice",
    description: "Start your journey in the electrical trade",
    timeframe: "0-4 years",
    requirements: ["Enrol in apprenticeship programme", "Complete Level 3 NVQ", "Pass AM2 assessment"],
    achievements: ["Basic electrical skills", "On-site experience", "Industry knowledge"]
  },
  {
    id: "qualified",
    title: "Qualified Electrician",
    description: "Become a fully qualified electrician",
    timeframe: "3-5 years",
    requirements: ["Complete apprenticeship", "Gain 18th Edition certification", "Build portfolio"],
    achievements: ["Independent working", "Domestic installations", "Commercial projects"]
  },
  {
    id: "approved",
    title: "Approved Electrician",
    description: "Gain approved status with registration schemes",
    timeframe: "5-7 years",
    requirements: ["2+ years experience", "NICEIC/NAPIT registration", "Inspection & Testing quals"],
    achievements: ["Self-certification", "Building Control work", "EICRs and PAT testing"]
  },
  {
    id: "specialist",
    title: "Specialist Electrician",
    description: "Develop expertise in specific areas",
    timeframe: "6-10 years",
    requirements: ["Specialist training", "Manufacturer certifications", "Ongoing CPD"],
    achievements: ["Solar PV installations", "EV charging", "Smart home systems"]
  },
  {
    id: "contractor",
    title: "Electrical Contractor",
    description: "Run your own electrical business",
    timeframe: "8-15 years",
    requirements: ["Business skills", "Financial planning", "Insurance and registrations"],
    achievements: ["Own business", "Employ staff", "Major contracts"]
  }
];

const InteractiveCareerRoadmap: React.FC = () => {
  const { progress } = useCareerProgress();

  const getStageProgress = (stageId: string) => {
    return progress.find(p => p.career_path_id === stageId);
  };

  const isStageCompleted = (stageId: string) => {
    const stageProgress = getStageProgress(stageId);
    return stageProgress && stageProgress.progress_percentage >= 80;
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-elec-yellow">
          <MapPin className="h-5 w-5" />
          Interactive Career Roadmap
        </CardTitle>
        <p className="text-muted-foreground">
          Your journey from apprentice to master electrician
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-elec-yellow/30"></div>
          
          <div className="space-y-8">
            {roadmapStages.map((stage, index) => {
              const isCompleted = isStageCompleted(stage.id);
              const stageProgress = getStageProgress(stage.id);
              const progressPercentage = stageProgress?.progress_percentage || 0;
              
              return (
                <div key={stage.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-4 w-4 h-4 rounded-full border-2 border-elec-yellow bg-elec-dark flex items-center justify-center">
                    {isCompleted ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      <Circle className="h-2 w-2 bg-elec-yellow rounded-full" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="ml-12 pb-8">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                        <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                          {stage.timeframe}
                        </Badge>
                        {isCompleted && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/40">
                            Completed
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground">{stage.description}</p>
                      
                      {/* Progress bar if in progress */}
                      {progressPercentage > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs text-elec-yellow">{progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-elec-dark/50 rounded-full h-1.5">
                            <div 
                              className="bg-elec-yellow h-1.5 rounded-full transition-all"
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {/* Requirements and Achievements */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Requirements
                          </h4>
                          <ul className="space-y-1">
                            {stage.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                                <Circle className="h-2 w-2 text-elec-yellow/60 mt-1 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            Achievements
                          </h4>
                          <ul className="space-y-1">
                            {stage.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                                <CheckCircle className="h-2 w-2 text-green-500/60 mt-1 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveCareerRoadmap;
