
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStudyPlanner } from "./study-planner/useStudyPlanner";
import PlannerForm from "./study-planner/PlannerForm";
import PlanDisplay from "./study-planner/PlanDisplay";

const StudyPlanner = () => {
  const {
    isModalOpen,
    topic,
    setTopic,
    duration,
    setDuration,
    goals,
    setGoals,
    plan,
    isLoading,
    handleGeneratePlan,
    toggleModal
  } = useStudyPlanner();
  
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-elec-yellow" />
          Study Planner
        </CardTitle>
        <CardDescription>
          Create personalised study plans for exam preparation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Generate customised study schedules based on your learning goals, available time, and specific topics
          you need to cover for your electrical qualifications.
        </p>
        
        {isModalOpen ? (
          <div className="space-y-4">
            <PlannerForm 
              topic={topic}
              setTopic={setTopic}
              duration={duration}
              setDuration={setDuration}
              goals={goals}
              setGoals={setGoals}
              isLoading={isLoading}
              onGeneratePlan={handleGeneratePlan}
              onClose={toggleModal}
            />
            
            <PlanDisplay 
              plan={plan}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <Button className="w-full" onClick={toggleModal}>
            Create Study Plan
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StudyPlanner;
