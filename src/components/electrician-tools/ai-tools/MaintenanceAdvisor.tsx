import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Download, Loader2, FileText, CheckCircle2, AlertTriangle, RefreshCw, Copy, Mail, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';
import { generateMaintenanceSchedulePDF, MaintenanceScheduleData } from "@/utils/pdf-generators/maintenance-schedule-pdf";

interface MaintenanceTask {
  interval: string;
  task: string;
  regulation?: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
  practicalApplication?: string;
}

interface MaintenanceSchedule {
  equipmentType: string;
  location: string;
  ageYears: number;
  schedule: MaintenanceTask[];
  recommendations: string[];
  ragSources: Array<{
    topic: string;
    source: string;
    relevance: number;
  }>;
}

export const MaintenanceAdvisor = () => {
  const [equipmentDescription, setEquipmentDescription] = useState("");
  const [equipmentType, setEquipmentType] = useState<string>("");
  const [location, setLocation] = useState("");
  const [ageYears, setAgeYears] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [schedule, setSchedule] = useState<MaintenanceSchedule | null>(null);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState("");

  const handleGenerate = async () => {
    if (!equipmentDescription.trim() || !equipmentType || !location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    setSchedule(null);
    setGeneratingProgress("Analyzing equipment details...");

    try {
      // Simulate progress updates
      setTimeout(() => setGeneratingProgress("Searching GN3 guidance..."), 800);
      setTimeout(() => setGeneratingProgress("Generating maintenance tasks..."), 1600);

      const { data, error } = await supabase.functions.invoke('maintenance-plan-generator', {
        body: {
          equipmentDescription: equipmentDescription.trim(),
          equipmentType,
          location,
          ageYears: ageYears || 0
        }
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate maintenance schedule');
      }

      setSchedule(data.schedule);
      toast.success("Maintenance schedule generated", {
        description: `${data.schedule.schedule.length} tasks identified`
      });

    } catch (err) {
      console.error('Maintenance generation error:', err);
      toast.error("Failed to generate schedule", {
        description: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsGenerating(false);
      setGeneratingProgress("");
    }
  };

  const handleReset = () => {
    setSchedule(null);
    setEquipmentDescription("");
    setEquipmentType("");
    setLocation("");
    setAgeYears(0);
  };

  const handleExportPDF = async () => {
    if (!schedule) return;

    setIsExportingPDF(true);

    try {
      // Transform schedule data to PDF format
      const pdfData: MaintenanceScheduleData = {
        projectName: `${schedule.equipmentType} - ${schedule.location}`,
        installationAddress: schedule.location,
        preparedBy: "Maintenance Advisor AI",
        preparedDate: new Date().toLocaleDateString('en-GB'),
        tasks: schedule.schedule.map((task) => ({
          equipment: schedule.equipmentType,
          task: task.task,
          frequency: task.interval,
          lastCompleted: "",
          nextDue: calculateNextDue(task.interval),
          responsible: task.priority === 'high' ? 'Qualified Electrician' : 'Competent Person'
        })),
        inspectionIntervals: [
          {
            inspectionType: "Periodic Inspection (EICR)",
            interval: determineEICRInterval(schedule.ageYears),
            nextDue: calculateEICRNextDue(schedule.ageYears)
          }
        ],
        notes: schedule.recommendations.join('\n\n')
      };

      // Generate PDF client-side
      const pdf = generateMaintenanceSchedulePDF(pdfData);
      pdf.save(`Maintenance_Schedule_${schedule.equipmentType.replace(/\s+/g, '_')}_${Date.now()}.pdf`);

      toast.success("PDF exported successfully");

    } catch (err) {
      console.error('PDF export error:', err);
      toast.error("Failed to export PDF", {
        description: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleCopySchedule = () => {
    if (!schedule) return;

    const text = `MAINTENANCE SCHEDULE\n\n` +
      `Equipment: ${schedule.equipmentType}\n` +
      `Location: ${schedule.location}\n` +
      `Age: ${schedule.ageYears} years\n\n` +
      `TASKS:\n${schedule.schedule.map((t, i) => `${i + 1}. [${t.interval}] ${t.task} (${t.priority})`).join('\n')}\n\n` +
      `RECOMMENDATIONS:\n${schedule.recommendations.join('\n')}`;

    navigator.clipboard.writeText(text);
    toast.success("Schedule copied to clipboard");
  };

  // Helper functions
  const calculateNextDue = (interval: string): string => {
    const now = new Date();
    const match = interval.match(/(\d+)\s*(month|year|week|day)/i);
    
    if (!match) return new Date(now.setMonth(now.getMonth() + 1)).toLocaleDateString('en-GB');
    
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    
    switch (unit) {
      case 'day':
        now.setDate(now.getDate() + value);
        break;
      case 'week':
        now.setDate(now.getDate() + (value * 7));
        break;
      case 'month':
        now.setMonth(now.getMonth() + value);
        break;
      case 'year':
        now.setFullYear(now.getFullYear() + value);
        break;
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'medium':
        return <CheckCircle2 className="h-4 w-4 text-yellow-400" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Empty State with Example */}
      {!schedule && !isGenerating && (
        <Card className="border-elec-yellow/20 bg-elec-card/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-elec-yellow/10 rounded-lg">
                <Lightbulb className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-elec-light">How this works</h4>
                <p className="text-sm text-elec-light/70">
                  Enter your equipment details below and we'll generate a comprehensive maintenance schedule 
                  based on BS 7671:2018+A3:2024 and GN3 guidance.
                </p>
                <div className="mt-3 p-3 bg-elec-dark/50 rounded border border-elec-gray/20">
                  <p className="text-xs text-elec-light/60 font-medium mb-1">Example:</p>
                  <p className="text-xs text-elec-light/80">
                    "18th Edition RCBO consumer unit with 10 circuits, installed in domestic property"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Input Form */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-elec-light">Equipment Details</CardTitle>
          <CardDescription className="text-elec-light/60">
            Describe the equipment requiring maintenance planning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="equipment-type" className="text-elec-light font-medium">Equipment Type *</Label>
            <Select value={equipmentType} onValueChange={setEquipmentType}>
              <SelectTrigger 
                id="equipment-type" 
                className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light touch-manipulation"
              >
                <SelectValue placeholder="Select equipment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consumer-unit">Consumer Unit</SelectItem>
                <SelectItem value="distribution-board">Distribution Board</SelectItem>
                <SelectItem value="lighting-circuit">Lighting Circuit</SelectItem>
                <SelectItem value="power-circuit">Power Circuit</SelectItem>
                <SelectItem value="emergency-lighting">Emergency Lighting</SelectItem>
                <SelectItem value="fire-alarm">Fire Alarm System</SelectItem>
                <SelectItem value="ev-charger">EV Charger</SelectItem>
                <SelectItem value="solar-pv">Solar PV System</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-elec-light font-medium">Equipment Description *</Label>
            <Textarea
              id="description"
              placeholder="E.g., 18th Edition RCBO consumer unit with 10 circuits, installed in domestic property"
              value={equipmentDescription}
              onChange={(e) => setEquipmentDescription(e.target.value)}
              className="min-h-[120px] sm:min-h-[100px] bg-elec-dark border-elec-gray/30 text-elec-light placeholder:text-elec-light/40 resize-none touch-manipulation"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-elec-light font-medium">Location *</Label>
              <Input
                id="location"
                placeholder="E.g., Main entrance hall"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light placeholder:text-elec-light/40 touch-manipulation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-elec-light font-medium">Age (Years)</Label>
              <Input
                id="age"
                type="number"
                min="0"
                placeholder="0"
                value={ageYears || ''}
                onChange={(e) => setAgeYears(parseInt(e.target.value) || 0)}
                className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light placeholder:text-elec-light/40 touch-manipulation"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Generate Schedule
                </>
              )}
            </Button>
            {schedule && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-11 border-elec-gray/30 text-elec-light hover:bg-elec-dark/50 touch-manipulation"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Progress Indicator */}
          {isGenerating && generatingProgress && (
            <div className="flex items-center gap-2 text-sm text-elec-yellow animate-pulse">
              <Loader2 className="h-4 w-4 animate-spin" />
              {generatingProgress}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loading Skeleton */}
      {isGenerating && (
        <div className="space-y-4 animate-fade-in">
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-elec-dark/50" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full bg-elec-dark/50" />
              <Skeleton className="h-4 w-3/4 bg-elec-dark/50" />
              <Skeleton className="h-4 w-5/6 bg-elec-dark/50" />
            </CardContent>
          </Card>
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-elec-dark/50" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full bg-elec-dark/50" />
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results */}
      {schedule && !isGenerating && (
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          {/* Header with Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-xl sm:text-2xl font-semibold text-elec-light">
              Maintenance Schedule
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={handleCopySchedule}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none h-10 border-elec-gray/30 text-elec-light hover:bg-elec-dark/50 touch-manipulation"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button
                onClick={handleExportPDF}
                disabled={isExportingPDF}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none h-10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
              >
                {isExportingPDF ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Export PDF
              </Button>
            </div>
          </div>

          {/* Equipment Summary */}
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-elec-light text-lg">Equipment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-elec-light/60 font-medium">Type:</span>
                  <span className="text-elec-light">{schedule.equipmentType}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-elec-light/60 font-medium">Location:</span>
                  <span className="text-elec-light">{schedule.location}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-elec-light/60 font-medium">Age:</span>
                  <span className="text-elec-light">{schedule.ageYears} years</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-elec-light/60 font-medium">Tasks:</span>
                  <span className="text-elec-light">{schedule.schedule.length} identified</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Tasks */}
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-elec-light text-lg">Scheduled Tasks</CardTitle>
              <CardDescription className="text-elec-light/60 text-sm">
                {schedule.schedule.length} maintenance tasks based on GN3 guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedule.schedule.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-elec-dark/50 border border-elec-gray/20 rounded-lg hover:border-elec-yellow/20 transition-colors touch-manipulation"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getPriorityIcon(task.priority)}
                      </div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="font-semibold text-elec-light">{task.interval}</span>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium self-start sm:self-auto ${
                            task.priority === 'high' 
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                              : task.priority === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                              : 'bg-green-500/20 text-green-300 border border-green-500/30'
                          }`}>
                            {task.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-elec-light/80 leading-relaxed">{task.task}</p>
                        {task.regulation && (
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-xs text-elec-light/50 italic flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {task.regulation}
                              </p>
                              {task.category && (
                                <span className="text-xs px-2 py-0.5 rounded bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20">
                                  {task.category}
                                </span>
                              )}
                            </div>
                            {task.practicalApplication && (
                              <p className="text-xs text-elec-light/60 pl-4 border-l-2 border-elec-yellow/30">
                                💡 {task.practicalApplication}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {schedule.recommendations.length > 0 && (
            <Card className="border-elec-yellow/20 bg-elec-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-elec-light text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schedule.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-3 bg-elec-dark/30 rounded-lg border border-elec-gray/10">
                      <div className="prose prose-invert max-w-none text-sm text-elec-light/80">
                        <ReactMarkdown>{rec}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* RAG Sources */}
          {schedule.ragSources.length > 0 && (
            <Card className="border-green-500/20 bg-elec-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-elec-light text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  Verified: GN3 Maintenance Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {schedule.ragSources.map((source, idx) => (
                    <div key={idx} className="text-xs p-3 bg-elec-dark/50 rounded-lg border border-elec-gray/10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                        <span className="font-medium text-elec-light">{source.topic}</span>
                        <span className="text-elec-yellow text-xs px-2 py-0.5 bg-elec-yellow/10 rounded">
                          {Math.round(source.relevance * 100)}% match
                        </span>
                      </div>
                      <span className="text-elec-light/50 text-xs">{source.source}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
