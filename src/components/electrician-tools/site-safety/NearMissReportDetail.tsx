import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  Shield,
  Zap,
  Flame,
  HardHat,
  Users,
  FileText,
  Calendar,
  Sparkles,
  CloudSun,
  Wrench,
  UserCheck,
  Eye,
  Download,
  Loader2,
  CheckCircle2,
  Clock,
  CircleDot,
} from 'lucide-react';
import { NearMissReport, Witness } from './types';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuditTimeline } from './common/AuditTimeline';

interface NearMissReportDetailProps {
  report: NearMissReport;
  onBack: () => void;
  onUpdate?: (updated: Partial<NearMissReport>) => void;
}

const CATEGORIES: Record<string, { label: string; icon: React.ElementType }> = {
  electrical_hazard: { label: 'Electrical Hazard', icon: Zap },
  fire_risk: { label: 'Fire Risk', icon: Flame },
  fall_hazard: { label: 'Fall Hazard', icon: AlertTriangle },
  ppe_failure: { label: 'PPE Failure/Issue', icon: HardHat },
  worksite_hazard: { label: 'Worksite Hazard', icon: Users },
  tool_equipment: { label: 'Tool/Equipment Issue', icon: AlertTriangle },
  chemical_exposure: { label: 'Chemical Exposure', icon: AlertTriangle },
  manual_handling: { label: 'Manual Handling', icon: AlertTriangle },
  vehicle_incident: { label: 'Vehicle Incident', icon: AlertTriangle },
  other: { label: 'Other', icon: FileText },
};

const SEVERITIES: Record<string, { label: string; colour: string; bgColour: string }> = {
  low: { label: 'Low', colour: 'text-green-400', bgColour: 'bg-green-500/20 border-green-500/30' },
  medium: {
    label: 'Medium',
    colour: 'text-yellow-400',
    bgColour: 'bg-yellow-500/20 border-yellow-500/30',
  },
  high: {
    label: 'High',
    colour: 'text-orange-400',
    bgColour: 'bg-orange-500/20 border-orange-500/30',
  },
  critical: {
    label: 'Critical',
    colour: 'text-red-400',
    bgColour: 'bg-red-500/20 border-red-500/30',
  },
};

const SEVERITY_BORDER: Record<string, string> = {
  low: 'border-l-green-500',
  medium: 'border-l-yellow-500',
  high: 'border-l-orange-500',
  critical: 'border-l-red-500',
};

const WEATHER_LABELS: Record<string, string> = {
  clear: 'Clear/Sunny',
  overcast: 'Overcast',
  rain: 'Rain',
  wind: 'High Wind',
  cold: 'Cold/Frost',
  hot: 'Hot',
  dark: 'Dark/Night',
};

const LIGHTING_LABELS: Record<string, string> = {
  good: 'Good Natural Light',
  adequate: 'Adequate',
  poor: 'Poor',
  artificial: 'Artificial Only',
  dark: 'Very Dark/No Light',
};

const STATUS_CONFIG: Record<
  string,
  { label: string; colour: string; bg: string; icon: React.ElementType }
> = {
  open: {
    label: 'Open',
    colour: 'text-amber-400',
    bg: 'bg-amber-500/15 border-amber-500/30',
    icon: CircleDot,
  },
  in_progress: {
    label: 'In Progress',
    colour: 'text-blue-400',
    bg: 'bg-blue-500/15 border-blue-500/30',
    icon: Clock,
  },
  closed: {
    label: 'Closed',
    colour: 'text-green-400',
    bg: 'bg-green-500/15 border-green-500/30',
    icon: CheckCircle2,
  },
};

export const NearMissReportDetail: React.FC<NearMissReportDetailProps> = ({
  report,
  onBack,
  onUpdate,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const category = CATEGORIES[report.category] || CATEGORIES['other'];
  const severity = SEVERITIES[report.severity] || SEVERITIES['low'];
  const CategoryIcon = category.icon;
  const [isUpdating, setIsUpdating] = useState(false);

  const currentStatus = report.status || 'open';
  const statusConf = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.open;
  const StatusIcon = statusConf.icon;

  const handleStatusChange = async (newStatus: 'open' | 'in_progress' | 'closed') => {
    setIsUpdating(true);
    try {
      const updates: Record<string, unknown> = { status: newStatus };
      if (newStatus === 'closed') {
        updates.completed_date = new Date().toISOString().split('T')[0];
      }
      if (newStatus === 'in_progress' && currentStatus === 'open') {
        updates.completed_date = null;
      }

      const { error } = await supabase
        .from('near_miss_reports')
        .update(updates)
        .eq('id', report.id);

      if (error) throw error;

      onUpdate?.({
        ...report,
        status: newStatus,
        ...(newStatus === 'closed'
          ? { completed_date: new Date().toISOString().split('T')[0] }
          : {}),
      });

      toast({
        title: 'Status Updated',
        description: `Near miss marked as ${STATUS_CONFIG[newStatus].label}.`,
      });
    } catch {
      toast({ title: 'Error', description: 'Could not update status.', variant: 'destructive' });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleCreateTeamBriefing = () => {
    const sessionId = `near-miss-${Date.now()}`;
    const nearMissData = {
      id: report.id,
      category: report.category,
      categoryLabel: category.label,
      severity: report.severity,
      severityLabel: severity.label,
      description: report.description,
      location: report.location,
      incident_date: report.incident_date,
      incident_time: report.incident_time,
      reporter_name: report.reporter_name,
      potential_consequences: report.potential_consequences,
      immediate_actions: report.immediate_actions,
      preventive_measures: report.preventive_measures,
      photo_urls: report.photos,
      witnesses: report.witnesses,
      third_party_involved: report.third_party_involved,
      third_party_details: report.third_party_details,
      weather_conditions: report.weather_conditions,
      lighting_conditions: report.lighting_conditions,
      equipment_involved: report.equipment_involved,
      equipment_faulty: report.equipment_faulty,
      equipment_fault_details: report.equipment_fault_details,
      supervisor_notified: report.supervisor_notified,
      supervisor_name: report.supervisor_name,
      previous_similar_incidents: report.previous_similar_incidents,
    };

    sessionStorage.setItem(`nearMissData_${sessionId}`, JSON.stringify(nearMissData));
    navigate(`/electrician/site-safety?tab=briefings&nearMissSessionId=${sessionId}`);
  };

  const hasWitnesses =
    report.witnesses && Array.isArray(report.witnesses) && report.witnesses.length > 0;
  const hasPeopleInfo = hasWitnesses || report.third_party_involved;
  const hasEnvironmentInfo =
    report.weather_conditions ||
    report.lighting_conditions ||
    report.equipment_involved ||
    report.equipment_faulty;
  const hasInvestigationInfo = report.supervisor_notified || report.previous_similar_incidents;

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-11 w-11 touch-manipulation"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">Report Details</h2>
            {report.incident_number && (
              <Badge className="bg-white/10 text-white border-white/20 text-xs font-mono">
                {report.incident_number}
              </Badge>
            )}
          </div>
          <p className="text-sm text-white">
            Submitted {new Date(report.created_at).toLocaleDateString('en-GB')}
          </p>
        </div>
      </div>

      {/* Main Info Card */}
      <Card className={`border-l-4 ${SEVERITY_BORDER[report.severity] || 'border-l-muted'}`}>
        <CardContent className="p-4 space-y-4">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className={`${severity.bgColour} border ${severity.colour}`}>
              {severity.label} Severity
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5">
              <CategoryIcon className="h-3.5 w-3.5" />
              {category.label}
            </Badge>
            {report.risk_rating != null && (
              <Badge
                className={`border ${
                  report.risk_rating <= 4
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : report.risk_rating <= 9
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      : report.risk_rating <= 16
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}
              >
                Risk: {report.risk_rating}
              </Badge>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-foreground leading-relaxed">{report.description}</p>
          </div>

          {/* Location & Time */}
          <div className="space-y-3 pt-2 border-t border-border">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-white mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-white uppercase tracking-wide">Location</p>
                <p className="text-foreground">{report.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-white mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-white uppercase tracking-wide">Date & Time</p>
                <p className="text-foreground">
                  {formatDate(report.incident_date)} at {formatTime(report.incident_time)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-white mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-white uppercase tracking-wide">Reported By</p>
                <p className="text-foreground">{report.reporter_name || 'Anonymous'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
      {(report.potential_consequences ||
        report.immediate_actions ||
        report.preventive_measures) && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">Actions & Analysis</h3>
            </div>

            <div className="space-y-4">
              {report.potential_consequences && (
                <div className="space-y-1">
                  <p className="text-xs text-white uppercase tracking-wide">
                    Potential Consequences
                  </p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {report.potential_consequences}
                  </p>
                </div>
              )}

              {report.immediate_actions && (
                <div className="space-y-1">
                  <p className="text-xs text-white uppercase tracking-wide">
                    Immediate Actions Taken
                  </p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {report.immediate_actions}
                  </p>
                </div>
              )}

              {report.preventive_measures && (
                <div className="space-y-1">
                  <p className="text-xs text-white uppercase tracking-wide">Preventive Measures</p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {report.preventive_measures}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* People Involved */}
      {hasPeopleInfo && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">People Involved</h3>
            </div>

            <div className="space-y-4">
              {hasWitnesses && (
                <div className="space-y-2">
                  <p className="text-xs text-white uppercase tracking-wide">Witnesses</p>
                  <div className="space-y-2">
                    {(report.witnesses as Witness[]).map((witness, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-foreground text-sm font-medium">{witness.name}</p>
                        {witness.contact && <p className="text-white text-xs">{witness.contact}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {report.third_party_involved && (
                <div className="space-y-1">
                  <p className="text-xs text-white uppercase tracking-wide">Third Party Involved</p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {report.third_party_details || 'Yes (no details provided)'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Environment & Equipment */}
      {hasEnvironmentInfo && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <CloudSun className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">Environment & Equipment</h3>
            </div>

            <div className="space-y-4">
              {(report.weather_conditions || report.lighting_conditions) && (
                <div className="grid grid-cols-2 gap-4">
                  {report.weather_conditions && (
                    <div className="space-y-1">
                      <p className="text-xs text-white uppercase tracking-wide">Weather</p>
                      <p className="text-foreground text-sm">
                        {WEATHER_LABELS[report.weather_conditions] || report.weather_conditions}
                      </p>
                    </div>
                  )}
                  {report.lighting_conditions && (
                    <div className="space-y-1">
                      <p className="text-xs text-white uppercase tracking-wide">Lighting</p>
                      <p className="text-foreground text-sm">
                        {LIGHTING_LABELS[report.lighting_conditions] || report.lighting_conditions}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {report.equipment_involved && (
                <div className="space-y-1">
                  <p className="text-xs text-white uppercase tracking-wide">Equipment Involved</p>
                  <p className="text-foreground text-sm">{report.equipment_involved}</p>
                </div>
              )}

              {report.equipment_faulty && (
                <div className="space-y-1">
                  <p className="text-xs text-white uppercase tracking-wide">Equipment Fault</p>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                    <p className="text-orange-400 text-sm font-medium">Faulty Equipment Reported</p>
                    {report.equipment_fault_details && (
                      <p className="text-foreground text-sm mt-1">
                        {report.equipment_fault_details}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Investigation */}
      {hasInvestigationInfo && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">Investigation</h3>
            </div>

            <div className="space-y-4">
              {report.supervisor_notified && (
                <div className="space-y-1">
                  <p className="text-xs text-white uppercase tracking-wide">Supervisor Notified</p>
                  <p className="text-foreground text-sm">
                    Yes{report.supervisor_name ? ` - ${report.supervisor_name}` : ''}
                  </p>
                </div>
              )}

              {report.previous_similar_incidents && (
                <div className="space-y-1">
                  <p className="text-xs text-white uppercase tracking-wide">
                    Previous Similar Incidents
                  </p>
                  <p className="text-foreground text-sm capitalize">
                    {report.previous_similar_incidents}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Follow-Up & Status */}
      <Card className="border-l-4 border-l-elec-yellow">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-elec-yellow" />
              <h3 className="font-medium text-foreground">Follow-Up Status</h3>
            </div>
            <Badge
              className={`${statusConf.bg} border ${statusConf.colour} flex items-center gap-1`}
            >
              <StatusIcon className="h-3 w-3" />
              {statusConf.label}
            </Badge>
          </div>

          {/* Follow-up required indicator */}
          {report.follow_up_required && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span className="text-sm text-white font-medium">Follow-up required</span>
            </div>
          )}

          {/* Due date & assigned to */}
          <div className="space-y-2">
            {report.assigned_to && (
              <div className="flex items-center gap-2 text-sm">
                <UserCheck className="h-4 w-4 text-white" />
                <span className="text-white">Assigned to: {report.assigned_to}</span>
              </div>
            )}
            {report.due_date && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-white" />
                <span className="text-white">
                  Due: {new Date(report.due_date).toLocaleDateString('en-GB')}
                </span>
                {new Date(report.due_date) < new Date() && currentStatus !== 'closed' && (
                  <Badge className="bg-red-500/15 text-red-400 border-red-500/30 text-[10px]">
                    Overdue
                  </Badge>
                )}
              </div>
            )}
            {report.completed_date && (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span className="text-white">
                  Completed: {new Date(report.completed_date).toLocaleDateString('en-GB')}
                </span>
              </div>
            )}
          </div>

          {/* Status action buttons */}
          {currentStatus !== 'closed' && (
            <div className="flex gap-2 pt-1">
              {currentStatus === 'open' && (
                <Button
                  onClick={() => handleStatusChange('in_progress')}
                  disabled={isUpdating}
                  className="flex-1 h-11 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl touch-manipulation"
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Clock className="h-4 w-4 mr-2" />
                  )}
                  Start Investigation
                </Button>
              )}
              {currentStatus === 'in_progress' && (
                <>
                  <Button
                    onClick={() => handleStatusChange('closed')}
                    disabled={isUpdating}
                    className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl touch-manipulation"
                  >
                    {isUpdating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                    )}
                    Close
                  </Button>
                  <Button
                    onClick={() => handleStatusChange('open')}
                    disabled={isUpdating}
                    variant="outline"
                    className="h-11 border-white/20 text-white rounded-xl touch-manipulation"
                  >
                    Reopen
                  </Button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photos */}
      {report.photos && report.photos.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium text-foreground">Photos</h3>
            <div className="grid grid-cols-2 gap-2">
              {report.photos.map((url, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={url}
                    alt={`Evidence photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit Trail */}
      <AuditTimeline recordType="near_miss" recordId={report.id} />

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border space-y-2">
        <button
          onClick={() => exportPDF('near-miss', report.id)}
          disabled={isExporting && exportingId === report.id}
          className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isExporting && exportingId === report.id ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export PDF
        </button>
        <Button
          onClick={handleCreateTeamBriefing}
          className="w-full h-14 text-base font-medium bg-primary text-primary-foreground"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Create Team Briefing
        </Button>
      </div>
    </div>
  );
};
