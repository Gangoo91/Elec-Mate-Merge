
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StudyPlanner = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Study Planner
        </CardTitle>
        <CardDescription>
          Generate personalized study plans for your qualification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Input your qualification goals and timeframe to get a structured study plan
          tailored to your learning style and schedule.
        </p>
        <Button className="w-full">
          Create Study Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default StudyPlanner;
