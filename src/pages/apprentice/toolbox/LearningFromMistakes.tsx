
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const LearningFromMistakes = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning from Mistakes</h1>
          <p className="text-muted-foreground">How to handle errors professionally and turn them into learning opportunities</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-500/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <CardTitle>Safe to Make</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/80 mb-4">Mistakes that are part of learning:</p>
            <ul className="text-sm space-y-1 text-elec-light/80">
              <li>• Wrong cable size initially</li>
              <li>• Incorrect circuit calculations</li>
              <li>• Poor cable management</li>
              <li>• Messy first attempts</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-400" />
              <CardTitle>Learn Quickly From</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/80 mb-4">Mistakes requiring immediate correction:</p>
            <ul className="text-sm space-y-1 text-elec-light/80">
              <li>• Inadequate earthing</li>
              <li>• Wrong protection devices</li>
              <li>• Poor connections</li>
              <li>• Skipping safety checks</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Growth Mindset</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/80 mb-4">How to approach mistakes:</p>
            <ul className="text-sm space-y-1 text-elec-light/80">
              <li>• Ask "What can I learn?"</li>
              <li>• Discuss with supervisor</li>
              <li>• Document lessons learned</li>
              <li>• Practice the correct method</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningFromMistakes;
