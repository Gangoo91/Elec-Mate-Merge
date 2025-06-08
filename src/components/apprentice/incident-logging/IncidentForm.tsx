
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Save, Send, ArrowLeft, AlertTriangle, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Type definitions for incident types and severity levels
type IncidentType = "near_miss" | "unsafe_practice" | "faulty_equipment" | "injury" | "property_damage" | "environmental" | "security" | "other";
type SeverityLevel = "low" | "medium" | "high" | "critical";
type IncidentStatus = "draft" | "submitted" | "under_review" | "investigating" | "resolved" | "closed";

interface IncidentFormData {
  title: string;
  description: string;
  incident_type: IncidentType;
  location: string;
  date_occurred: string;
  severity: SeverityLevel;
  immediate_action_taken: string;
  injuries_sustained: string;
  witnesses: string;
  equipment_involved: string;
  supervisor_name: string;
  supervisor_notified: boolean;
  first_aid_given: boolean;
  follow_up_required: boolean;
  follow_up_notes: string;
  potential_consequences: string;
}

interface IncidentFormProps {
  incidentId?: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const IncidentForm = ({ incidentId, onCancel, onSuccess }: IncidentFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<IncidentFormData>({
    title: "",
    description: "",
    incident_type: "near_miss",
    location: "",
    date_occurred: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    severity: "medium",
    immediate_action_taken: "",
    injuries_sustained: "",
    witnesses: "",
    equipment_involved: "",
    supervisor_name: "",
    supervisor_notified: false,
    first_aid_given: false,
    follow_up_required: false,
    follow_up_notes: "",
    potential_consequences: ""
  });

  useEffect(() => {
    if (incidentId) {
      loadIncident();
    }
  }, [incidentId]);

  const loadIncident = async () => {
    if (!incidentId || !user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .eq('id', incidentId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title || "",
          description: data.description || "",
          incident_type: data.incident_type as IncidentType,
          location: data.location || "",
          date_occurred: data.date_occurred ? format(new Date(data.date_occurred), "yyyy-MM-dd'T'HH:mm") : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
          severity: data.severity as SeverityLevel,
          immediate_action_taken: data.immediate_action_taken || "",
          injuries_sustained: data.injuries_sustained || "",
          witnesses: data.witnesses || "",
          equipment_involved: data.equipment_involved || "",
          supervisor_name: data.supervisor_name || "",
          supervisor_notified: data.supervisor_notified || false,
          first_aid_given: data.first_aid_given || false,
          follow_up_required: data.follow_up_required || false,
          follow_up_notes: data.follow_up_notes || "",
          potential_consequences: data.potential_consequences || ""
        });
      }
    } catch (error) {
      console.error('Error loading incident:', error);
      toast({
        title: "Error",
        description: "Failed to load incident details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof IncidentFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveDraft = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      
      const incidentData = {
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        incident_type: formData.incident_type,
        location: formData.location,
        date_occurred: new Date(formData.date_occurred).toISOString(),
        severity: formData.severity,
        status: 'draft' as IncidentStatus,
        immediate_action_taken: formData.immediate_action_taken,
        injuries_sustained: formData.injuries_sustained,
        witnesses: formData.witnesses,
        equipment_involved: formData.equipment_involved,
        supervisor_name: formData.supervisor_name,
        supervisor_notified: formData.supervisor_notified,
        first_aid_given: formData.first_aid_given,
        follow_up_required: formData.follow_up_required,
        follow_up_notes: formData.follow_up_notes,
        potential_consequences: formData.potential_consequences
      };

      let result;
      if (incidentId) {
        result = await supabase
          .from('incidents')
          .update(incidentData)
          .eq('id', incidentId)
          .eq('user_id', user.id);
      } else {
        result = await supabase
          .from('incidents')
          .insert([incidentData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Draft Saved",
        description: "Your incident report has been saved as a draft",
      });

      onSuccess();
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error",
        description: "Failed to save incident draft",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    // Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Title, Description, Location)",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      
      const incidentData = {
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        incident_type: formData.incident_type,
        location: formData.location,
        date_occurred: new Date(formData.date_occurred).toISOString(),
        severity: formData.severity,
        status: 'submitted' as IncidentStatus,
        submitted_at: new Date().toISOString(),
        immediate_action_taken: formData.immediate_action_taken,
        injuries_sustained: formData.injuries_sustained,
        witnesses: formData.witnesses,
        equipment_involved: formData.equipment_involved,
        supervisor_name: formData.supervisor_name,
        supervisor_notified: formData.supervisor_notified,
        first_aid_given: formData.first_aid_given,
        follow_up_required: formData.follow_up_required,
        follow_up_notes: formData.follow_up_notes,
        potential_consequences: formData.potential_consequences
      };

      let result;
      if (incidentId) {
        result = await supabase
          .from('incidents')
          .update(incidentData)
          .eq('id', incidentId)
          .eq('user_id', user.id);
      } else {
        result = await supabase
          .from('incidents')
          .insert([incidentData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Incident Submitted",
        description: "Your incident report has been successfully submitted",
      });

      onSuccess();
    } catch (error) {
      console.error('Error submitting incident:', error);
      toast({
        title: "Error",
        description: "Failed to submit incident report",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-elec-yellow border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading incident details...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{incidentId ? 'Edit' : 'New'} Incident Report</h2>
          <p className="text-muted-foreground">Complete all sections to submit your incident report</p>
        </div>
        <Button variant="outline" onClick={onCancel} className="border-elec-yellow/30">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
      </div>

      {/* Form */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Incident Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Brief description of the incident"
                className="bg-elec-dark border-elec-yellow/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="incident_type">Incident Type</Label>
              <Select value={formData.incident_type} onValueChange={(value: IncidentType) => handleInputChange('incident_type', value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="near_miss">Near Miss</SelectItem>
                  <SelectItem value="unsafe_practice">Unsafe Practice</SelectItem>
                  <SelectItem value="faulty_equipment">Faulty Equipment</SelectItem>
                  <SelectItem value="injury">Injury</SelectItem>
                  <SelectItem value="property_damage">Property Damage</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Where did the incident occur?"
                className="bg-elec-dark border-elec-yellow/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_occurred">Date & Time Occurred</Label>
              <Input
                id="date_occurred"
                type="datetime-local"
                value={formData.date_occurred}
                onChange={(e) => handleInputChange('date_occurred', e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity Level</Label>
              <Select value={formData.severity} onValueChange={(value: SeverityLevel) => handleInputChange('severity', value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Incident Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Provide a detailed description of what happened..."
              className="bg-elec-dark border-elec-yellow/20 min-h-[120px]"
              required
            />
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="immediate_action_taken">Immediate Action Taken</Label>
                <Textarea
                  id="immediate_action_taken"
                  value={formData.immediate_action_taken}
                  onChange={(e) => handleInputChange('immediate_action_taken', e.target.value)}
                  placeholder="What immediate actions were taken?"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="potential_consequences">Potential Consequences</Label>
                <Textarea
                  id="potential_consequences"
                  value={formData.potential_consequences}
                  onChange={(e) => handleInputChange('potential_consequences', e.target.value)}
                  placeholder="What could have happened?"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="injuries_sustained">Injuries Sustained</Label>
                <Textarea
                  id="injuries_sustained"
                  value={formData.injuries_sustained}
                  onChange={(e) => handleInputChange('injuries_sustained', e.target.value)}
                  placeholder="Describe any injuries (if applicable)"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment_involved">Equipment Involved</Label>
                <Input
                  id="equipment_involved"
                  value={formData.equipment_involved}
                  onChange={(e) => handleInputChange('equipment_involved', e.target.value)}
                  placeholder="Tools, machinery, or equipment involved"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="witnesses">Witnesses</Label>
                <Input
                  id="witnesses"
                  value={formData.witnesses}
                  onChange={(e) => handleInputChange('witnesses', e.target.value)}
                  placeholder="Names of any witnesses"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supervisor_name">Supervisor Name</Label>
                <Input
                  id="supervisor_name"
                  value={formData.supervisor_name}
                  onChange={(e) => handleInputChange('supervisor_name', e.target.value)}
                  placeholder="Name of supervisor (if notified)"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="supervisor_notified"
                  checked={formData.supervisor_notified}
                  onCheckedChange={(checked) => handleInputChange('supervisor_notified', checked as boolean)}
                />
                <Label htmlFor="supervisor_notified">Supervisor was notified</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="first_aid_given"
                  checked={formData.first_aid_given}
                  onCheckedChange={(checked) => handleInputChange('first_aid_given', checked as boolean)}
                />
                <Label htmlFor="first_aid_given">First aid was administered</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="follow_up_required"
                  checked={formData.follow_up_required}
                  onCheckedChange={(checked) => handleInputChange('follow_up_required', checked as boolean)}
                />
                <Label htmlFor="follow_up_required">Follow-up action required</Label>
              </div>
            </div>

            {/* Follow-up Notes */}
            {formData.follow_up_required && (
              <div className="space-y-2">
                <Label htmlFor="follow_up_notes">Follow-up Notes</Label>
                <Textarea
                  id="follow_up_notes"
                  value={formData.follow_up_notes}
                  onChange={(e) => handleInputChange('follow_up_notes', e.target.value)}
                  placeholder="Describe what follow-up actions are needed..."
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-elec-yellow/10">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="border-elec-yellow/30"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isSaving || !formData.title.trim() || !formData.description.trim() || !formData.location.trim()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSaving ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentForm;
