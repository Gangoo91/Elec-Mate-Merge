import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  MapPin, 
  Users, 
  Clock, 
  Shield, 
  Wrench, 
  GraduationCap,
  Download,
  Send,
  Eye,
  AlertTriangle,
  CheckCircle,
  Edit
} from 'lucide-react';
import { MethodStatementData } from '@/types/method-statement';

interface ReviewStepProps {
  data: MethodStatementData;
  onDataChange: (updates: Partial<MethodStatementData>) => void;
  onBack: () => void;
}

const ReviewStep = ({ data, onDataChange, onBack }: ReviewStepProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getCompletionStats = () => {
    const totalSteps = data.steps.length;
    const completedSteps = data.steps.filter(step => step.isCompleted).length;
    const highRiskSteps = data.steps.filter(step => step.riskLevel === 'high').length;
    const totalSafetyReqs = data.steps.reduce((acc, step) => acc + step.safetyRequirements.length, 0);
    
    return { totalSteps, completedSteps, highRiskSteps, totalSafetyReqs };
  };

  const stats = getCompletionStats();

  const exportToPDF = () => {
    console.log('Exporting method statement to PDF:', data);
    // Implementation for PDF export
  };

  const generateDocument = () => {
    console.log('Generating method statement document:', data);
    // Implementation for document generation
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Review Method Statement
          </CardTitle>
          <p className="text-muted-foreground">
            Review your method statement before generating the final document.
          </p>
        </CardHeader>
      </Card>

      {/* Statistics Overview */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300">Method Statement Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">{stats.totalSteps}</div>
              <div className="text-sm text-muted-foreground">Total Steps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-300">{stats.highRiskSteps}</div>
              <div className="text-sm text-muted-foreground">High Risk Steps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{stats.totalSafetyReqs}</div>
              <div className="text-sm text-muted-foreground">Safety Requirements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">{data.duration || 'TBD'}</div>
              <div className="text-sm text-muted-foreground">Estimated Duration</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Details Summary */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow">Job Details</CardTitle>
            <Button variant="outline" size="sm" onClick={onBack}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-elec-yellow">
                <FileText className="h-4 w-4" />
                Job Title
              </div>
              <div className="text-sm text-left">{data.jobTitle}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-elec-yellow">
                <MapPin className="h-4 w-4" />
                Location
              </div>
              <div className="text-sm text-left">{data.location}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-elec-yellow">
                <Users className="h-4 w-4" />
                Contractor
              </div>
              <div className="text-sm text-left">{data.contractor}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-elec-yellow">
                <Users className="h-4 w-4" />
                Supervisor
              </div>
              <div className="text-sm text-left">{data.supervisor}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-elec-yellow">
                Work Type
              </div>
              <div className="text-sm text-left">{data.workType}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-elec-yellow">
                Overall Risk Level
              </div>
              <Badge className={getRiskColor(data.overallRiskLevel)}>
                {data.overallRiskLevel} risk
              </Badge>
            </div>
          </div>
          {data.description && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-elec-yellow">Description</div>
              <div className="text-sm text-muted-foreground text-left">{data.description}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Method Steps Review */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Method Steps ({data.steps.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.steps.map((step, index) => (
            <Card key={step.id} className="border-elec-yellow/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">
                    {step.stepNumber}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-semibold text-elec-yellow">{step.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={getRiskColor(step.riskLevel)}>
                          {step.riskLevel} risk
                        </Badge>
                        {step.estimatedDuration && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {step.estimatedDuration}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {step.description && (
                      <p className="text-sm text-muted-foreground text-left">{step.description}</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-left">
                      {step.safetyRequirements.length > 0 && (
                        <div>
                          <div className="flex items-start gap-1 font-medium text-red-300 mb-1 text-left">
                            <Shield className="h-3 w-3" />
                            Safety Requirements ({step.safetyRequirements.length})
                          </div>
                          <div className="space-y-1">
                            {step.safetyRequirements.slice(0, 3).map((req, idx) => (
                              <div key={idx} className="text-muted-foreground">• {req}</div>
                            ))}
                            {step.safetyRequirements.length > 3 && (
                              <div className="text-muted-foreground">
                                +{step.safetyRequirements.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {step.equipmentNeeded.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1 font-medium text-blue-300 mb-1">
                            <Wrench className="h-3 w-3" />
                            Equipment ({step.equipmentNeeded.length})
                          </div>
                          <div className="space-y-1">
                            {step.equipmentNeeded.slice(0, 3).map((eq, idx) => (
                              <div key={idx} className="text-muted-foreground">• {eq}</div>
                            ))}
                            {step.equipmentNeeded.length > 3 && (
                              <div className="text-muted-foreground">
                                +{step.equipmentNeeded.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {step.qualifications.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1 font-medium text-green-300 mb-1">
                            <GraduationCap className="h-3 w-3" />
                            Qualifications ({step.qualifications.length})
                          </div>
                          <div className="space-y-1">
                            {step.qualifications.slice(0, 3).map((qual, idx) => (
                              <div key={idx} className="text-muted-foreground">• {qual}</div>
                            ))}
                            {step.qualifications.length > 3 && (
                              <div className="text-muted-foreground">
                                +{step.qualifications.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Approval Section */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-300">Approval & Sign-off</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="approvedBy">Approved By</Label>
            <Input
              id="approvedBy"
              value={data.approvedBy || ''}
              onChange={(e) => onDataChange({ approvedBy: e.target.value })}
              placeholder="Name of approving authority"
            />
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-300" />
            <div>
              <div className="font-medium text-green-300">Method Statement Complete</div>
              <div className="text-sm text-muted-foreground">
                Ready for approval and distribution to site team.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Risk Warning */}
      {stats.highRiskSteps > 0 && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-300" />
              <div>
                <div className="font-medium text-red-300">High Risk Activities Identified</div>
                <div className="text-sm text-muted-foreground">
                  This method statement contains {stats.highRiskSteps} high-risk step(s). 
                  Ensure additional supervision and safety measures are in place.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={exportToPDF}
          variant="outline"
          className="flex-1 flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
        <Button
          onClick={generateDocument}
          className="flex-1 flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          Generate & Distribute
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;