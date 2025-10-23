import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Calendar,
  Clock,
  PoundSterling,
  AlertCircle,
  FileText,
  Copy,
  RefreshCw,
  TrendingUp,
  Wrench,
  BookOpen,
  Package,
  Zap
} from "lucide-react";
import { MaintenanceResults as MaintenanceResultsType } from "./useMaintenanceAdvisor";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { generateMaintenanceSchedulePDF, MaintenanceScheduleData } from "@/utils/pdf-generators/maintenance-schedule-pdf";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface MaintenanceResultsProps {
  results: MaintenanceResultsType;
  onReset: () => void;
}

export const MaintenanceResults = ({ results, onReset }: MaintenanceResultsProps) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const getRiskColor = (level?: string) => {
    switch (level) {
      case 'critical': return 'text-red-400 border-red-400/30 bg-red-400/10';
      case 'high': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      case 'medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'low': return 'text-green-400 border-green-400/30 bg-green-400/10';
      default: return 'text-elec-light/60 border-elec-gray/30 bg-elec-dark/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-400/10 text-red-400 border-red-400/30';
      case 'medium': return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30';
      case 'low': return 'bg-green-400/10 text-green-400 border-green-400/30';
      default: return 'bg-elec-dark/50 text-elec-light/60 border-elec-gray/30';
    }
  };

  const getComplianceColor = (status?: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'attention-needed': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'non-compliant': return 'text-red-400 border-red-400/30 bg-red-400/10';
      default: return 'text-elec-light/60 border-elec-gray/30 bg-elec-dark/30';
    }
  };

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const pdfData: MaintenanceScheduleData = {
        projectName: `${results.equipmentType} - ${results.location}`,
        installationAddress: results.location,
        preparedBy: "Maintenance Advisor AI",
        preparedDate: new Date().toLocaleDateString('en-GB'),
        tasks: results.schedule.map((task) => ({
          equipment: results.equipmentType,
          task: task.task,
          frequency: task.interval,
          lastCompleted: "",
          nextDue: task.nextDue || calculateNextDue(task.interval),
          responsible: task.priority === 'high' ? 'Qualified Electrician' : 'Competent Person'
        })),
        inspectionIntervals: [
          {
            inspectionType: "Periodic Inspection (EICR)",
            interval: determineEICRInterval(results.ageYears),
            nextDue: results.nextEICRDue || calculateEICRNextDue(results.ageYears)
          }
        ],
        notes: results.recommendations.join('\n\n')
      };

      const pdf = generateMaintenanceSchedulePDF(pdfData);
      pdf.save(`Maintenance_Schedule_${results.equipmentType.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
      toast.success("PDF exported successfully");
    } catch (err) {
      console.error('PDF export error:', err);
      toast.error("Failed to export PDF");
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleCopy = () => {
    const text = `MAINTENANCE SCHEDULE\n\n` +
      `Equipment: ${results.equipmentType}\n` +
      `Location: ${results.location}\n` +
      `Age: ${results.ageYears} years\n\n` +
      `TASKS:\n${results.schedule.map((t, i) => `${i + 1}. [${t.interval}] ${t.task} (${t.priority})`).join('\n')}\n\n` +
      `RECOMMENDATIONS:\n${results.recommendations.join('\n')}`;
    navigator.clipboard.writeText(text);
    toast.success("Schedule copied to clipboard");
  };

  const calculateNextDue = (interval: string): string => {
    const now = new Date();
    const match = interval.match(/(\d+)\s*(month|year|week|day)/i);
    if (!match) return new Date(now.setMonth(now.getMonth() + 1)).toLocaleDateString('en-GB');
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    switch (unit) {
      case 'day': now.setDate(now.getDate() + value); break;
      case 'week': now.setDate(now.getDate() + (value * 7)); break;
      case 'month': now.setMonth(now.getMonth() + value); break;
      case 'year': now.setFullYear(now.getFullYear() + value); break;
    }
    return now.toLocaleDateString('en-GB');
  };

  const determineEICRInterval = (age: number): string => {
    if (age > 10) return "5 Years (Older Installation)";
    return "10 Years (Domestic) / 5 Years (Commercial)";
  };

  const calculateEICRNextDue = (age: number): string => {
    const now = new Date();
    const yearsToAdd = age > 10 ? 5 : 10;
    now.setFullYear(now.getFullYear() + yearsToAdd);
    return now.toLocaleDateString('en-GB');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-elec-light">Maintenance Plan</h2>
          <p className="text-sm text-elec-light/60 mt-1">
            {results.schedule.length} tasks • Generated {new Date().toLocaleDateString('en-GB')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="border-elec-gray/30 text-elec-light hover:bg-elec-dark/50"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button
            onClick={handleExportPDF}
            disabled={isExportingPDF}
            variant="outline"
            size="sm"
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          >
            {isExportingPDF ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Export PDF
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="border-elec-gray/30 text-elec-light hover:bg-elec-dark/50"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Equipment Health Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Risk Score */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-elec-light/60 mb-1">Risk Level</p>
                <p className={`text-2xl font-bold ${getRiskColor(results.riskLevel).split(' ')[0]}`}>
                  {results.riskScore || 0}
                </p>
                <Badge className={`mt-2 ${getRiskColor(results.riskLevel)}`}>
                  {results.riskLevel || 'unknown'}
                </Badge>
              </div>
              <AlertTriangle className={`h-8 w-8 ${getRiskColor(results.riskLevel).split(' ')[0]}`} />
            </div>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-elec-light/60 mb-1">Compliance</p>
                <Badge className={`mt-2 ${getComplianceColor(results.complianceStatus)}`}>
                  {results.complianceStatus?.replace('-', ' ') || 'unknown'}
                </Badge>
                {results.nextEICRDue && (
                  <p className="text-xs text-elec-light/50 mt-2">EICR: {results.nextEICRDue}</p>
                )}
              </div>
              <CheckCircle2 className={`h-8 w-8 ${getComplianceColor(results.complianceStatus).split(' ')[0]}`} />
            </div>
          </CardContent>
        </Card>

        {/* Annual Cost */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-elec-light/60 mb-1">Annual Cost</p>
                {results.annualCostEstimate ? (
                  <>
                    <p className="text-2xl font-bold text-elec-light">
                      £{results.annualCostEstimate.min}
                    </p>
                    <p className="text-xs text-elec-light/50 mt-1">
                      to £{results.annualCostEstimate.max}
                    </p>
                  </>
                ) : (
                  <p className="text-lg text-elec-light/40">N/A</p>
                )}
              </div>
              <PoundSterling className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>

        {/* Total Hours */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-elec-light/60 mb-1">Annual Hours</p>
                <p className="text-2xl font-bold text-elec-light">
                  {results.totalEstimatedHours || 0}h
                </p>
                <p className="text-xs text-elec-light/50 mt-1">per year</p>
              </div>
              <Clock className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age Warning */}
      {results.ageYears > 10 && (
        <Card className="border-orange-400/30 bg-orange-400/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-400">Installation Age Warning</p>
                <p className="text-sm text-elec-light/70 mt-1">
                  Installation is {results.ageYears} years old. EICR recommended within 6 months (BS 7671 Section 631.1)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scheduled Tasks */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-elec-light flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Scheduled Tasks
              </CardTitle>
              <CardDescription className="text-elec-light/60">
                {results.schedule.length} maintenance tasks identified
              </CardDescription>
            </div>
            <div className="flex gap-2 text-xs">
              <Badge variant="outline" className="border-red-400/30 text-red-400">
                {results.schedule.filter(t => t.priority === 'high').length} High
              </Badge>
              <Badge variant="outline" className="border-yellow-400/30 text-yellow-400">
                {results.schedule.filter(t => t.priority === 'medium').length} Med
              </Badge>
              <Badge variant="outline" className="border-green-400/30 text-green-400">
                {results.schedule.filter(t => t.priority === 'low').length} Low
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {results.schedule.map((task, idx) => (
              <AccordionItem 
                key={idx} 
                value={`task-${idx}`}
                className="border border-elec-gray/20 rounded-lg px-4 data-[state=open]:bg-elec-dark/30"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 w-full text-left">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-elec-light">{task.task}</p>
                      <p className="text-xs text-elec-light/50 mt-1">
                        {task.interval} • {task.regulation || 'Industry standard'}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2">
                  <div className="space-y-3 pl-2">
                    {task.estimatedDurationMinutes && (
                      <div className="flex items-start gap-2 text-sm">
                        <Clock className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                        <span className="text-elec-light/70">
                          Duration: {task.estimatedDurationMinutes} minutes
                        </span>
                      </div>
                    )}
                    {task.estimatedCost && (
                      <div className="flex items-start gap-2 text-sm">
                        <PoundSterling className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                        <span className="text-elec-light/70">
                          Cost: £{task.estimatedCost.min} - £{task.estimatedCost.max}
                        </span>
                      </div>
                    )}
                    {task.requiredQualifications && task.requiredQualifications.length > 0 && (
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-elec-light/70 font-medium">Required Qualifications:</p>
                          <p className="text-elec-light/60 text-xs mt-1">
                            {task.requiredQualifications.join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                    {task.toolsRequired && task.toolsRequired.length > 0 && (
                      <div className="flex items-start gap-2 text-sm">
                        <Wrench className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-elec-light/70 font-medium">Tools Required:</p>
                          <p className="text-elec-light/60 text-xs mt-1">
                            {task.toolsRequired.join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                    {task.procedure && task.procedure.length > 0 && (
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-elec-light/70 font-medium">Procedure:</p>
                          <ol className="text-elec-light/60 text-xs mt-1 space-y-1 list-decimal list-inside">
                            {task.procedure.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                    {task.safetyPrecautions && task.safetyPrecautions.length > 0 && (
                      <div className="flex items-start gap-2 text-sm p-2 bg-orange-400/5 border border-orange-400/20 rounded">
                        <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-orange-400 font-medium">Safety Precautions:</p>
                          <ul className="text-elec-light/70 text-xs mt-1 space-y-0.5">
                            {task.safetyPrecautions.map((precaution, i) => (
                              <li key={i}>• {precaution}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Predictive Maintenance */}
      {results.commonFailureModes && results.commonFailureModes.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-elec-light flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Predictive Maintenance Intelligence
            </CardTitle>
            <CardDescription className="text-elec-light/60">
              Common failure modes and proactive measures
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.commonFailureModes.map((failure, idx) => (
              <div key={idx} className="p-4 bg-elec-dark/30 border border-elec-gray/20 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-elec-light">{failure.failure}</p>
                  <Badge variant="outline" className="border-yellow-400/30 text-yellow-400">
                    {Math.round(failure.probability * 100)}% risk
                  </Badge>
                </div>
                {failure.earlyWarnings && failure.earlyWarnings.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-elec-light/70 mb-1">Early Warning Signs:</p>
                    <ul className="text-xs text-elec-light/60 space-y-0.5">
                      {failure.earlyWarnings.map((warning, i) => (
                        <li key={i}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Parts & Recommendations */}
      {results.recommendedParts && results.recommendedParts.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-elec-light flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recommended Parts & Materials
            </CardTitle>
            <CardDescription className="text-elec-light/60">
              Spare parts to keep on hand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.recommendedParts.map((part, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-elec-dark/30 border border-elec-gray/20 rounded-lg">
                  <div>
                    <p className="font-medium text-elec-light">{part.part}</p>
                    <p className="text-xs text-elec-light/50 mt-0.5">{part.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-elec-light">Qty: {part.quantity}</p>
                    {part.estimatedCost && (
                      <p className="text-xs text-elec-light/50">£{part.estimatedCost}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Regulations */}
      {results.regulations && results.regulations.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-elec-light flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Regulation References
            </CardTitle>
            <CardDescription className="text-elec-light/60">
              {results.regulations.length} regulations referenced
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.regulations.map((reg, idx) => (
              <div key={idx} className="p-4 bg-elec-dark/30 border border-elec-gray/20 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-elec-yellow">{reg.regulationNumber}</p>
                  {reg.confidence && (
                    <Badge variant="outline" className="border-elec-gray/30 text-elec-light/60">
                      {Math.round(reg.confidence * 100)}% match
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-elec-light/80 mb-2">{reg.excerpt}</p>
                {reg.whyApplies && (
                  <p className="text-xs text-elec-light/60 italic">
                    Why this applies: {reg.whyApplies}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {results.recommendations && results.recommendations.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-elec-light flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Additional Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-elec-light/80">
                  <span className="text-elec-yellow mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
