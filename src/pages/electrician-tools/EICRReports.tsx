
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EICRProvider } from "@/contexts/EICRContext";
import EICRWizard from "@/components/inspection-testing/eicr/EICRWizard";

const EICRReports = () => {
  return (
    <EICRProvider>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="h-8 w-8 text-elec-yellow" />
              EICR Reports
            </h1>
            <p className="text-muted-foreground">
              Create, manage and export Electrical Installation Condition Reports
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/electrician-tools/inspection-testing">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Testing
              </Button>
            </Link>
          </div>
        </div>

        <EICRWizard />
      </div>
    </EICRProvider>
  );
};

export default EICRReports;
