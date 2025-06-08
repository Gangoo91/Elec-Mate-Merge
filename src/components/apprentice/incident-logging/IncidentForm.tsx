
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Send, AlertTriangle, Camera, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface IncidentFormProps {
  incidentId?: string | null;
  onBack: () => void;
  onSave: () => void;
}

interface IncidentData {
  incident_type: string;
  title: string;
  description: string;
  location: string;
  date_occurred: string;
  severity: string;
  status: string;
  immediate_action_taken: string;
  potential_consequences: string;
  witnesses: string;
  supervisor_notified: boolean;
  supervisor_name: string;
  equipment_involved: string;
  injuries_sustained: string;
  first_aid_given: boolean;
  follow_up_required: boolean;
  follow_up_notes: string;
}

const IncidentForm = ({ incidentId, onBack, onSave }: IncidentFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<IncidentData>({
    incident_type: '',
    title: '',
    description: '',
    location: '',
    date_occurred: new Date().toISOString().slice(0, 16),
    severity: 'medium',
    status: 'draft',
    immediate_action_taken: '',
    potential_consequences: '',
    witnesses: '',
    supervisor_notified: false,
    supervisor_name: '',
    equipment_involved: '',
    injuries_sustained: '',
    first_aid_given: false,
    follow_up_required: false,
    follow_up_notes: ''
  });

  useEffect(() => {
    if (incidentId) {
      loadIncident();
    }
  }, [incidentId]);

  const loadIncident = async () => {
    if (!incidentId || !user) return;

    try {
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .eq('id', incidentId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          incident_type: data.incident_type || '',
          title: data.title || '',
          description: data.description || '',
          location: data.location || '',
          date_occurred: data.date_occurred ? new Date(data.date_occurred).toISOString().slice(0, 16) : '',
          severity: data.severity || 'medium',
          status: data.status || 'draft',
          immediate_action_taken: data.immediate_action_taken || '',
          potential_consequences: data.potential_consequences || '',
          witnesses: data.witnesses || '',
          supervisor_notified: data.supervisor_notified || false,
          supervisor_name: data.supervisor_name || '',
          equipment_involved: data.equipment_involved || '',
          injuries_sustained: data.injuries_sustained || '',
          first_aid_given: data.first_aid_given || false,
          follow_up_required: data.follow_up_required || false,
          follow_up_notes: data.follow_up_notes || ''
        });
      }
    } catch (error) {
      console.error('Error loading incident:', error);
      toast({
        title: "Error",
        description: "Failed to load incident data",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof IncidentData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const required = ['incident_type', 'title', 'description', 'location', 'date_occurred'];
    for (const field of required) {
      if (!formData[field as keyof IncidentData]) {
        toast({
          title: "Validation Error",
          description: `Please fill in the ${field.replace('_', ' ')} field`,
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleSave = async (shouldSubmit = false) => {
    if (!user) return;

    if (shouldSubmit && !validateForm()) return;

    setIsLoading(true);

    try {
      const incidentData = {
        ...formData,
        user_id: user.id,
        status: shouldSubmit ? 'submitted' : formData.status,
        submitted_at: shouldSubmit ? new Date().toISOString() : null,
        date_occurred: new Date(formData.date_occurred).toISOString()
      };

      if (incidentId) {
        const { error } = await supabase
          .from('incidents')
          .update(incidentData)
          .eq('id', incidentId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('incidents')
          .insert([incidentData]);

        if (error) throw error;
      }

      toast({
        title: shouldSubmit ? "Incident Submitted" : "Incident Saved",
        description: shouldSubmit 
          ? "Your incident report has been submitted successfully" 
          : "Your incident report has been saved as draft",
      });

      onSave();
    } catch (error) {
      console.error('Error saving incident:', error);
      toast({
        title: "Error",
        description: "Failed to save incident report",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {incidentId ? 'Edit Incident Report' : 'New Incident Report'}
            </h1>
            <p className="text-muted-foreground">Complete all required fields marked with *</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave(false)} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave(true)} disabled={isLoading} className="bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black">
            <Send className="mr-2 h-4 w-4" />
            Submit Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="incident_type">Incident Type *</Label>
                  <Select value={formData.incident_type} onValueChange={(value) => handleInputChange('incident_type', value)}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Select incident type" />
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
                  <Label htmlFor="severity">Severity Level *</Label>
                  <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
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

              <div className="space-y-2">
                <Label htmlFor="title">Incident Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the incident"
                  className="bg-elec-dark border-elec-yellow/20"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of what happened..."
                  className="bg-elec-dark border-elec-yellow/20 min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Where did this incident occur?"
                    className="bg-elec-dark border-elec-yellow/20"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_occurred">Date & Time Occurred *</Label>
                  <Input
                    id="date_occurred"
                    type="datetime-local"
                    className="bg-elec-dark border-elec-yellow/20"
                    value={formData.date_occurred}
                    onChange={(e) => handleInputChange('date_occurred', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="immediate_action_taken">Immediate Action Taken</Label>
                <Textarea
                  id="immediate_action_taken"
                  placeholder="What immediate actions were taken to address the incident?"
                  className="bg-elec-dark border-elec-yellow/20"
                  value={formData.immediate_action_taken}
                  onChange={(e) => handleInputChange('immediate_action_taken', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="potential_consequences">Potential Consequences</Label>
                <Textarea
                  id="potential_consequences"
                  placeholder="What could have happened if the situation had been worse?"
                  className="bg-elec-dark border-elec-yellow/20"
                  value={formData.potential_consequences}
                  onChange={(e) => handleInputChange('potential_consequences', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="witnesses">Witnesses</Label>
                  <Textarea
                    id="witnesses"
                    placeholder="Names and contact details of any witnesses"
                    className="bg-elec-dark border-elec-yellow/20"
                    value={formData.witnesses}
                    onChange={(e) => handleInputChange('witnesses', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equipment_involved">Equipment Involved</Label>
                  <Textarea
                    id="equipment_involved"
                    placeholder="Any equipment involved in the incident"
                    className="bg-elec-dark border-elec-yellow/20"
                    value={formData.equipment_involved}
                    onChange={(e) => handleInputChange('equipment_involved', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Injury & Medical Information */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Injury & Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="injuries_sustained">Injuries Sustained</Label>
                <Textarea
                  id="injuries_sustained"
                  placeholder="Describe any injuries sustained (if none, write 'None')"
                  className="bg-elec-dark border-elec-yellow/20"
                  value={formData.injuries_sustained}
                  onChange={(e) => handleInputChange('injuries_sustained', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="first_aid_given"
                  checked={formData.first_aid_given}
                  onCheckedChange={(checked) => handleInputChange('first_aid_given', !!checked)}
                />
                <Label htmlFor="first_aid_given">First aid was given</Label>
              </div>
            </CardContent>
          </Card>

          {/* Supervisor Notification */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Supervisor Notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="supervisor_notified"
                  checked={formData.supervisor_notified}
                  onCheckedChange={(checked) => handleInputChange('supervisor_notified', !!checked)}
                />
                <Label htmlFor="supervisor_notified">Supervisor has been notified</Label>
              </div>

              {formData.supervisor_notified && (
                <div className="space-y-2">
                  <Label htmlFor="supervisor_name">Supervisor Name</Label>
                  <Input
                    id="supervisor_name"
                    placeholder="Name of supervisor notified"
                    className="bg-elec-dark border-elec-yellow/20"
                    value={formData.supervisor_name}
                    onChange={(e) => handleInputChange('supervisor_name', e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Follow-up */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Follow-up Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="follow_up_required"
                  checked={formData.follow_up_required}
                  onCheckedChange={(checked) => handleInputChange('follow_up_required', !!checked)}
                />
                <Label htmlFor="follow_up_required">Follow-up action required</Label>
              </div>

              {formData.follow_up_required && (
                <div className="space-y-2">
                  <Label htmlFor="follow_up_notes">Follow-up Notes</Label>
                  <Textarea
                    id="follow_up_notes"
                    placeholder="Describe what follow-up actions are needed"
                    className="bg-elec-dark border-elec-yellow/20"
                    value={formData.follow_up_notes}
                    onChange={(e) => handleInputChange('follow_up_notes', e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Attach photos to support your incident report (optional)
              </p>
              <Button variant="outline" className="w-full" disabled>
                <Camera className="mr-2 h-4 w-4" />
                Add Photos
                <span className="ml-1 text-xs">(Coming Soon)</span>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-blue-400">Helpful Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Be specific and factual in your description</li>
                <li>• Include all relevant details</li>
                <li>• Save drafts frequently while working</li>
                <li>• Submit within 24 hours of the incident</li>
                <li>• Contact emergency services if immediate medical attention is needed</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncidentForm;
