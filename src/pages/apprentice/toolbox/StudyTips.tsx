
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Brain, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const StudyTips = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Tips & Techniques</h1>
          <p className="text-muted-foreground">Effective learning strategies for electrical theory and practical skills</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Memory Techniques</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-elec-light/80">
              <li>• Use mnemonics for regulations</li>
              <li>• Create visual diagrams</li>
              <li>• Practice regularly</li>
              <li>• Teach others what you learn</li>
              <li>• Link theory to practical work</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Time Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-elec-light/80">
              <li>• Set regular study times</li>
              <li>• Break topics into chunks</li>
              <li>• Use pomodoro technique</li>
              <li>• Review notes weekly</li>
              <li>• Prepare for assessments early</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyTips;
