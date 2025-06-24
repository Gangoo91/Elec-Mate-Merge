
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Save, CheckCircle } from "lucide-react";

interface RiskDocumentationProps {
  assessment: any;
  onCompleted: (documentation: any) => void;
}

const RiskDocumentation = ({ assessment, onCompleted }: RiskDocumentationProps) => {
  const [assessor, setAssessor] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [workDescription, setWorkDescription] = useState("");

  const handleComplete = () => {
    const documentation = {
      assessor,
      reviewDate,
      additionalNotes,
      workLocation,
      workDescription,
      completedDate: new Date().toISOString().split('T')[0]
    };
    onCompleted(documentation);
  };

  const handleExportPDF = () => {
    // This would integrate with a PDF generation service
    console.log("Exporting PDF...");
  };

  const isFormValid = assessor && reviewDate && workLocation && workDescription;

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Risk Assessment Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Documentation Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Assessment Details</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Assessor Name</label>
                <Input
                  value={assessor}
                  onChange={(e) => setAssessor(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Work Location</label>
                <Input
                  value={workLocation}
                  onChange={(e) => setWorkLocation(e.target.value)}
                  placeholder="Specific location where work will be carried out"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Work Description</label>
                <Textarea
                  value={workDescription}
                  onChange={(e) => setWorkDescription(e.target.value)}
                  placeholder="Detailed description of the work to be performed"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Review Date</label>
                <Input
                  type="date"
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Additional Notes</label>
                <Textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any additional observations, special conditions, or requirements"
                  rows={4}
                />
              </div>
            </div>

            {/* Assessment Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Assessment Summary</h3>
              
              <Card className="border-gray-600 bg-gray-800/50">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Identified Hazard</p>
                    <p className="font-medium">{assessment.hazard}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Likelihood</p>
                      <p className="font-medium">{assessment.likelihood}/5</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Severity</p>
                      <p className="font-medium">{assessment.severity}/5</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Score</p>
                      <p className="font-medium">{assessment.riskScore}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <Badge className={`${
                        assessment.riskLevel === 'Very High' ? 'bg-red-600' :
                        assessment.riskLevel === 'High' ? 'bg-red-500' :
                        assessment.riskLevel === 'Medium' ? 'bg-yellow-500' :
                        assessment.riskLevel === 'Low' ? 'bg-green-500' : 'bg-green-400'
                      }`}>
                        {assessment.riskLevel}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Control Measures</p>
                    <div className="space-y-1">
                      {assessment.controlMeasures?.map((measure: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{measure}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {assessment.residualRisk && (
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Residual Risk</p>
                      <p className="font-medium">{assessment.residualRisk}%</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Compliance Checklist */}
              <Card className="border-blue-500/20 bg-blue-500/10">
                <CardHeader>
                  <CardTitle className="text-blue-300 text-sm">Compliance Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Risk assessment completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Control measures identified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Residual risk evaluated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${assessor ? 'text-green-400' : 'text-gray-400'}`} />
                      <span>Assessor identified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${reviewDate ? 'text-green-400' : 'text-gray-400'}`} />
                      <span>Review date set</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-600">
            <Button variant="outline" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                onClick={handleComplete}
                disabled={!isFormValid}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskDocumentation;
