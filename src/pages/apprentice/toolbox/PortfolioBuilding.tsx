
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Camera, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PortfolioBuilding = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Building</h1>
          <p className="text-muted-foreground">How to document your work and build a professional portfolio</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Camera className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Photo Documentation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/80 mb-4">
              Take clear photos of your work at different stages to show progression and quality.
            </p>
            <ul className="text-sm space-y-1 text-elec-light/80">
              <li>• Before and after shots</li>
              <li>• Cable routing</li>
              <li>• Finished installations</li>
              <li>• Test results</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Written Evidence</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/80 mb-4">
              Document your learning and experiences with written reflections and reports.
            </p>
            <ul className="text-sm space-y-1 text-elec-light/80">
              <li>• Learning reflections</li>
              <li>• Project descriptions</li>
              <li>• Problem-solving examples</li>
              <li>• Skills development</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Quality Standards</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/80 mb-4">
              Ensure your portfolio meets assessment criteria and industry standards.
            </p>
            <ul className="text-sm space-y-1 text-elec-light/80">
              <li>• Clear explanations</li>
              <li>• Professional presentation</li>
              <li>• Regular updates</li>
              <li>• Supervisor sign-off</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioBuilding;
