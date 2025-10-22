import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Loader2, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

interface MaintenanceTask {
  interval: string;
  task: string;
  regulation?: string;
  priority: 'high' | 'medium' | 'low';
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

  const handleGenerate = async () => {
    if (!equipmentDescription.trim() || !equipmentType || !location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    setSchedule(null);

    try {
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
    }
  };

  const handleExportPDF = async () => {
    if (!schedule) return;

    setIsExportingPDF(true);

    try {
      const { data, error } = await supabase.functions.invoke('export-maintenance-pdf', {
        body: { schedule }
      });

      if (error) throw error;

      // Download PDF
      const link = document.createElement('a');
      link.href = data.pdfUrl;
      link.download = `maintenance-schedule-${Date.now()}.pdf`;
      link.click();

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
      {/* Input Form */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-elec-light">Equipment Details</CardTitle>
          <CardDescription className="text-elec-light/60">
            Describe the equipment requiring maintenance planning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="equipment-type" className="text-elec-light">Equipment Type *</Label>
            <Select value={equipmentType} onValueChange={setEquipmentType}>
              <SelectTrigger id="equipment-type" className="bg-elec-dark border-elec-gray/30 text-elec-light">
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
            <Label htmlFor="description" className="text-elec-light">Equipment Description *</Label>
            <Textarea
              id="description"
              placeholder="E.g., 18th Edition RCBO consumer unit with 10 circuits, installed in domestic property"
              value={equipmentDescription}
              onChange={(e) => setEquipmentDescription(e.target.value)}
              className="min-h-[100px] bg-elec-dark border-elec-gray/30 text-elec-light placeholder:text-elec-light/40"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-elec-light">Location *</Label>
              <Input
                id="location"
                placeholder="E.g., Main entrance hall"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-elec-dark border-elec-gray/30 text-elec-light placeholder:text-elec-light/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-elec-light">Age (Years)</Label>
              <Input
                id="age"
                type="number"
                min="0"
                placeholder="0"
                value={ageYears || ''}
                onChange={(e) => setAgeYears(parseInt(e.target.value) || 0)}
                className="bg-elec-dark border-elec-gray/30 text-elec-light placeholder:text-elec-light/40"
              />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Schedule...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Generate Maintenance Schedule
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {schedule && (
        <div className="space-y-4">
          {/* Header with Export */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-elec-light">
              Maintenance Schedule
            </h3>
            <Button
              onClick={handleExportPDF}
              disabled={isExportingPDF}
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              {isExportingPDF ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Export PDF
            </Button>
          </div>

          {/* Equipment Summary */}
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="text-elec-light">Equipment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-elec-light/60">Type:</span>
                <span className="text-elec-light font-medium">{schedule.equipmentType}</span>
                <span className="text-elec-light/60">Location:</span>
                <span className="text-elec-light font-medium">{schedule.location}</span>
                <span className="text-elec-light/60">Age:</span>
                <span className="text-elec-light font-medium">{schedule.ageYears} years</span>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Tasks */}
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="text-elec-light">Scheduled Tasks</CardTitle>
              <CardDescription className="text-elec-light/60">
                {schedule.schedule.length} maintenance tasks identified
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedule.schedule.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-elec-dark/50 border border-elec-gray/20 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      {getPriorityIcon(task.priority)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-elec-light">{task.interval}</span>
                          <span className="text-xs px-2 py-1 rounded bg-elec-yellow/10 text-elec-yellow">
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-elec-light/80">{task.task}</p>
                        {task.regulation && (
                          <p className="text-xs text-elec-light/50 italic">
                            Reference: {task.regulation}
                          </p>
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
              <CardHeader>
                <CardTitle className="text-elec-light">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none text-sm text-elec-light/80 space-y-2">
                  {schedule.recommendations.map((rec, idx) => (
                    <ReactMarkdown key={idx}>{rec}</ReactMarkdown>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* RAG Sources */}
          {schedule.ragSources.length > 0 && (
            <Card className="border-elec-yellow/20 bg-elec-card">
              <CardHeader>
                <CardTitle className="text-elec-light text-sm">
                  ✓ Verified: GN3 Maintenance Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {schedule.ragSources.map((source, idx) => (
                    <div key={idx} className="text-xs p-2 bg-elec-dark/50 rounded border border-elec-gray/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-elec-light">{source.topic}</span>
                        <span className="text-elec-light/50">
                          {Math.round(source.relevance * 100)}% match
                        </span>
                      </div>
                      <span className="text-elec-light/50">{source.source}</span>
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
