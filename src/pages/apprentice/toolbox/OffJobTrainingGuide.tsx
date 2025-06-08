
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, BookOpen, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const OffJobTrainingGuide = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Off-the-Job Training Guide</h1>
          <p className="text-muted-foreground">Understanding your 20% off-the-job training requirements</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            What is Off-the-Job Training?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-elec-light/80 mb-4">
            Off-the-job training is learning that takes place outside of your normal work duties. 
            You must spend at least 20% of your working time on this type of training during your apprenticeship.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">What Counts:</h3>
              <ul className="text-sm space-y-1 text-elec-light/80">
                <li>• College attendance</li>
                <li>• Online learning modules</li>
                <li>• Skills workshops</li>
                <li>• Training courses</li>
                <li>• Mentoring sessions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">What Doesn't Count:</h3>
              <ul className="text-sm space-y-1 text-elec-light/80">
                <li>• Normal work tasks</li>
                <li>• Brief toolbox talks</li>
                <li>• Routine meetings</li>
                <li>• Shadowing colleagues</li>
                <li>• Basic induction</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OffJobTrainingGuide;
