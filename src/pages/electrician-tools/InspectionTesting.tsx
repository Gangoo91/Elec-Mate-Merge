
import { Button } from "@/components/ui/button";
import { ArrowLeft, TestTube, FileText, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import InspectionTestingWalkthrough from "@/components/inspection-testing/InspectionTestingWalkthrough";

const InspectionTesting = () => {
  console.log('InspectionTesting page rendered');
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <TestTube className="h-8 w-8 text-elec-yellow" />
            Inspection & Testing
          </h1>
          <p className="text-muted-foreground">
            Professional testing procedures with step-by-step guidance and automatic EICR integration.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/electrician-tools/eicr-reports">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> EICR Reports
            </Button>
          </Link>
          <Link to="/electrician-tools">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80 hover:border-elec-yellow/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-elec-yellow" />
              Start Testing Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Begin a guided testing procedure with automatic EICR report generation and fault detection.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Available Procedures:</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Avg. Session Time:</span>
                <span className="font-medium">45-90 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Link to="/electrician-tools/eicr-reports">
          <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                EICR Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View, manage, and export your Electrical Installation Condition Reports.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Reports:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">This Month:</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Professional Standards Notice */}
      <Alert className="bg-blue-500/10 border-blue-500/30">
        <TestTube className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          <strong>Professional Standards:</strong> All testing procedures follow BS 7671:2018+A2:2022 requirements. 
          EICR reports are automatically generated with proper fault codes and classifications. 
          Always ensure you are competent and qualified before conducting electrical testing.
        </AlertDescription>
      </Alert>

      {/* Main Testing Interface */}
      <InspectionTestingWalkthrough 
        mode="electrician"
        onComplete={(report) => {
          console.log('Test completed:', report);
          // Handle report generation/export
        }}
      />
    </div>
  );
};

export default InspectionTesting;
