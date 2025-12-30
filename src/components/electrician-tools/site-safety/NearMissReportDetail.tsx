import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, MapPin, AlertTriangle, Shield, 
  Zap, Flame, HardHat, Users, FileText, Calendar, Sparkles
} from "lucide-react";

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
    // Package near miss data into sessionStorage (matching Cost Engineer → Quote Hub pattern)
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
    };
    
    sessionStorage.setItem(`nearMissData_${sessionId}`, JSON.stringify(nearMissData));
    
    // Navigate to briefings tab with sessionId
    navigate(`/electrician/site-safety?tab=briefings&nearMissSessionId=${sessionId}`);
  };

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
