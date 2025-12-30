import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, MapPin, AlertTriangle, Shield, 
  Zap, Flame, HardHat, Users, FileText, Calendar, Sparkles,
  CloudSun, Wrench, UserCheck, Eye
} from "lucide-react";

interface Witness {
  name: string;
  contact: string;
}

interface NearMissReport {
  id: string;
  category: string;
  severity: string;
  description: string;
  location: string;
  incident_date: string;
  incident_time: string;
  reporter_name: string;
  potential_consequences?: string;
  immediate_actions?: string;
  preventive_measures?: string;
  photo_urls?: string[];
  created_at: string;
  user_id: string;
  witnesses?: Witness[];
  third_party_involved?: boolean;
  third_party_details?: string;
  weather_conditions?: string;
  lighting_conditions?: string;
  equipment_involved?: string;
  equipment_faulty?: boolean;
  equipment_fault_details?: string;
  supervisor_notified?: boolean;
  supervisor_name?: string;
  previous_similar_incidents?: string;
}

interface NearMissReportDetailProps {
  report: NearMissReport;
  onBack: () => void;
}

const CATEGORIES: Record<string, { label: string; icon: React.ElementType }> = {
  'electrical_hazard': { label: 'Electrical Hazard', icon: Zap },
  'fire_risk': { label: 'Fire Risk', icon: Flame },
  'fall_hazard': { label: 'Fall Hazard', icon: AlertTriangle },
  'ppe_failure': { label: 'PPE Failure/Issue', icon: HardHat },
  'worksite_hazard': { label: 'Worksite Hazard', icon: Users },
  'tool_equipment': { label: 'Tool/Equipment Issue', icon: AlertTriangle },
  'chemical_exposure': { label: 'Chemical Exposure', icon: AlertTriangle },
  'manual_handling': { label: 'Manual Handling', icon: AlertTriangle },
  'vehicle_incident': { label: 'Vehicle Incident', icon: AlertTriangle },
  'other': { label: 'Other', icon: FileText }
};

const SEVERITIES: Record<string, { label: string; colour: string; bgColour: string }> = {
  'low': { label: 'Low', colour: 'text-green-400', bgColour: 'bg-green-500/20 border-green-500/30' },
  'medium': { label: 'Medium', colour: 'text-yellow-400', bgColour: 'bg-yellow-500/20 border-yellow-500/30' },
  'high': { label: 'High', colour: 'text-orange-400', bgColour: 'bg-orange-500/20 border-orange-500/30' },
  'critical': { label: 'Critical', colour: 'text-red-400', bgColour: 'bg-red-500/20 border-red-500/30' }
};

const SEVERITY_BORDER: Record<string, string> = {
  'low': 'border-l-green-500',
  'medium': 'border-l-yellow-500',
  'high': 'border-l-orange-500',
  'critical': 'border-l-red-500'
};

const WEATHER_LABELS: Record<string, string> = {
  'clear': 'Clear/Sunny',
  'overcast': 'Overcast',
  'rain': 'Rain',
  'wind': 'High Wind',
  'cold': 'Cold/Frost',
  'hot': 'Hot',
  'dark': 'Dark/Night'
};

const LIGHTING_LABELS: Record<string, string> = {
  'good': 'Good Natural Light',
  'adequate': 'Adequate',
  'poor': 'Poor',
  'artificial': 'Artificial Only',
  'dark': 'Very Dark/No Light'
};

export const NearMissReportDetail: React.FC<NearMissReportDetailProps> = ({ report, onBack }) => {
  const navigate = useNavigate();
  const category = CATEGORIES[report.category] || CATEGORIES['other'];
  const severity = SEVERITIES[report.severity] || SEVERITIES['low'];
  const CategoryIcon = category.icon;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
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
      photo_urls: report.photo_urls,
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

  const hasWitnesses = report.witnesses && Array.isArray(report.witnesses) && report.witnesses.length > 0;
  const hasPeopleInfo = hasWitnesses || report.third_party_involved;
  const hasEnvironmentInfo = report.weather_conditions || report.lighting_conditions || report.equipment_involved || report.equipment_faulty;
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
          <h2 className="text-lg font-semibold text-foreground">Report Details</h2>
          <p className="text-sm text-muted-foreground">
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
          </div>

          {/* Description */}
          <div>
            <p className="text-foreground leading-relaxed">{report.description}</p>
          </div>

          {/* Location & Time */}
          <div className="space-y-3 pt-2 border-t border-border">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                <p className="text-foreground">{report.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Date & Time</p>
                <p className="text-foreground">
                  {formatDate(report.incident_date)} at {formatTime(report.incident_time)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Reported By</p>
                <p className="text-foreground">{report.reporter_name || 'Anonymous'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
      {(report.potential_consequences || report.immediate_actions || report.preventive_measures) && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">Actions & Analysis</h3>
            </div>

            <div className="space-y-4">
              {report.potential_consequences && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Potential Consequences
                  </p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {report.potential_consequences}
                  </p>
                </div>
              )}

              {report.immediate_actions && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Immediate Actions Taken
                  </p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {report.immediate_actions}
                  </p>
                </div>
              )}

              {report.preventive_measures && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Preventive Measures
                  </p>
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
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Witnesses</p>
                  <div className="space-y-2">
                    {(report.witnesses as Witness[]).map((witness, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-foreground text-sm font-medium">{witness.name}</p>
                        {witness.contact && (
                          <p className="text-muted-foreground text-xs">{witness.contact}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {report.third_party_involved && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Third Party Involved</p>
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
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Weather</p>
                      <p className="text-foreground text-sm">{WEATHER_LABELS[report.weather_conditions] || report.weather_conditions}</p>
                    </div>
                  )}
                  {report.lighting_conditions && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Lighting</p>
                      <p className="text-foreground text-sm">{LIGHTING_LABELS[report.lighting_conditions] || report.lighting_conditions}</p>
                    </div>
                  )}
                </div>
              )}

              {report.equipment_involved && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Equipment Involved</p>
                  <p className="text-foreground text-sm">{report.equipment_involved}</p>
                </div>
              )}

              {report.equipment_faulty && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Equipment Fault</p>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                    <p className="text-orange-400 text-sm font-medium">Faulty Equipment Reported</p>
                    {report.equipment_fault_details && (
                      <p className="text-foreground text-sm mt-1">{report.equipment_fault_details}</p>
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
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Supervisor Notified</p>
                  <p className="text-foreground text-sm">
                    Yes{report.supervisor_name ? ` - ${report.supervisor_name}` : ''}
                  </p>
                </div>
              )}

              {report.previous_similar_incidents && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Previous Similar Incidents</p>
                  <p className="text-foreground text-sm capitalize">{report.previous_similar_incidents}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photos */}
      {report.photo_urls && report.photo_urls.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium text-foreground">Photos</h3>
            <div className="grid grid-cols-2 gap-2">
              {report.photo_urls.map((url, index) => (
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

      {/* Fixed Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
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
