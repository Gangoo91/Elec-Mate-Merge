
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Send, Calendar, MapPin, AlertCircle } from "lucide-react";

interface IncidentFormProps {
  incidentId?: string;
  onBack: () => void;
  onSave: () => void;
}

const IncidentForm = ({ incidentId, onBack, onSave }: IncidentFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    incident_type: '',
    title: '',
    description: '',
    location: '',
    date_occurred: '',
    time_occurred: '',
    severity: '',
    immediate_actions: '',
    witnesses: '',
    injuries_details: '',
    property_damage_details: '',
    environmental_impact: '',
    root_cause_analysis: '',
    preventive_measures: '',
    additional_notes: ''
  });

  useEffect(() => {
    if (incidentId) {
      loadIncident();
    }
  }, [incidentId]);

  const loadIncident = async () => {
    if (!user || !incidentId) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .eq('id', incidentId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setFormData({
          incident_type: data.incident_type || '',
          title: data.title || '',
          description: data.description || '',
          location: data.location || '',
          date_occurred: data.date_occurred ? data.date_occurred.split('T')[0] : '',
          time_occurred: data.date_occurred ? data.date_occurred.split('T')[1]?.substring(0, 5) || '' : '',
          severity: data.severity || '',
          immediate_actions: data.immediate_actions || '',
          witnesses: data.witnesses || '',
          injuries_details: data.injuries_details || '',
          property_damage_details: data.property_damage_details || '',
          environmental_impact: data.environmental_impact || '',
          root_cause_analysis: data.root_cause_analysis || '',
          preventive_measures: data.preventive_measures || '',
          additional_notes: data.additional_notes || ''
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['incident_type', 'title', 'description', 'location', 'date_occurred', 'severity'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const saveDraft = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      
      const dateTime = formData.date_occurred && formData.time_occurred 
        ? `${formData.date_occurred}T${formData.time_occurred}:00`
        : formData.date_occurred 
        ? `${formData.date_occurred}T00:00:00`
        : new Date().toISOString();

      const incidentData = {
        user_id: user.id,
        incident_type: formData.incident_type as 'near_miss' | 'unsafe_practice' | 'faulty_equipment' | 'injury' | 'property_damage' | 'environmental' | 'security' | 'other',
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date_occurred: dateTime,
        severity: formData.severity as 'low' | 'medium' | 'high' | 'critical',
        status: 'draft' as const,
        immediate_actions: formData.immediate_actions,
        witnesses: formData.witnesses,
        injuries_details: formData.injuries_details,
        property_damage_details: formData.property_damage_details,
        environmental_impact: formData.environmental_impact,
        root_cause_analysis: formData.root_cause_analysis,
        preventive_measures: formData.preventive_measures,
        additional_notes: formData.additional_notes
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

      onSave();
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error",
        description: "Failed to save incident report",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const submitIncident = async () => {
    if (!user || !validateForm()) return;

    try {
      setIsSaving(true);
      
      const dateTime = formData.date_occurred && formData.time_occurred 
        ? `${formData.date_occurred}T${formData.time_occurred}:00`
        : formData.date_occurred 
        ? `${formData.date_occurred}T00:00:00`
        : new Date().toISOString();

      const incidentData = {
        user_id: user.id,
        incident_type: formData.incident_type as 'near_miss' | 'unsafe_practice' | 'faulty_equipment' | 'injury' | 'property_damage' | 'environmental' | 'security' | 'other',
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date_occurred: dateTime,
        severity: formData.severity as 'low' | 'medium' | 'high' | 'critical',
        status: 'submitted' as const,
        submitted_at: new Date().toISOString(),
        immediate_actions: formData.immediate_actions,
        witnesses: formData.witnesses,
        injuries_details: formData.injuries_details,
        property_damage_details: formData.property_damage_details,
        environmental_impact: formData.environmental_impact,
        root_cause_analysis: formData.root_cause_analysis,
        preventive_measures: formData.preventive_measures,
        additional_notes: formData.additional_notes
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
        description: "Your incident report has been submitted successfully",
      });

      onSave();
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading incident details...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="border-elec-yellow/30">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
        <h2 className="text-2xl font-bold">
          {incidentId ? 'Edit Incident Report' : 'New Incident Report'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-elec-yellow" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="incident_type">Incident Type *</Label>
                  <Select value={formData.incident_type} onValueChange={(value) => handleInputChange('incident_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
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
                
                <div>
                  <Label htmlFor="severity">Severity *</Label>
                  <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">Incident Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Brief description of the incident"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of what happened"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location and Time */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-elec-yellow" />
                Location & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Where did the incident occur?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date_occurred">Date Occurred *</Label>
                  <Input
                    id="date_occurred"
                    type="date"
                    value={formData.date_occurred}
                    onChange={(e) => handleInputChange('date_occurred', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="time_occurred">Time Occurred</Label>
                  <Input
                    id="time_occurred"
                    type="time"
                    value={formData.time_occurred}
                    onChange={(e) => handleInputChange('time_occurred', e.target.value)}
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
              <div>
                <Label htmlFor="immediate_actions">Immediate Actions Taken</Label>
                <Textarea
                  id="immediate_actions"
                  value={formData.immediate_actions}
                  onChange={(e) => handleInputChange('immediate_actions', e.target.value)}
                  placeholder="What immediate actions were taken?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="witnesses">Witnesses</Label>
                <Textarea
                  id="witnesses"
                  value={formData.witnesses}
                  onChange={(e) => handleInputChange('witnesses', e.target.value)}
                  placeholder="Names and contact details of witnesses"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="injuries_details">Injury Details (if applicable)</Label>
                <Textarea
                  id="injuries_details"
                  value={formData.injuries_details}
                  onChange={(e) => handleInputChange('injuries_details', e.target.value)}
                  placeholder="Details of any injuries sustained"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="property_damage_details">Property Damage Details (if applicable)</Label>
                <Textarea
                  id="property_damage_details"
                  value={formData.property_damage_details}
                  onChange={(e) => handleInputChange('property_damage_details', e.target.value)}
                  placeholder="Details of any property damage"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="environmental_impact">Environmental Impact (if applicable)</Label>
                <Textarea
                  id="environmental_impact"
                  value={formData.environmental_impact}
                  onChange={(e) => handleInputChange('environmental_impact', e.target.value)}
                  placeholder="Any environmental impact"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Analysis */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Analysis & Prevention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="root_cause_analysis">Root Cause Analysis</Label>
                <Textarea
                  id="root_cause_analysis"
                  value={formData.root_cause_analysis}
                  onChange={(e) => handleInputChange('root_cause_analysis', e.target.value)}
                  placeholder="What was the root cause of this incident?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="preventive_measures">Preventive Measures</Label>
                <Textarea
                  id="preventive_measures"
                  value={formData.preventive_measures}
                  onChange={(e) => handleInputChange('preventive_measures', e.target.value)}
                  placeholder="What measures can be taken to prevent similar incidents?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="additional_notes">Additional Notes</Label>
                <Textarea
                  id="additional_notes"
                  value={formData.additional_notes}
                  onChange={(e) => handleInputChange('additional_notes', e.target.value)}
                  placeholder="Any additional information"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={saveDraft} 
                className="w-full bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black"
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              <Button 
                onClick={submitIncident} 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isSaving}
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Report
              </Button>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-sm">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Fields marked with * are required for submission</p>
              <p>• Drafts can be saved and completed later</p>
              <p>• Submitted reports cannot be edited</p>
              <p>• Be thorough and accurate in your reporting</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncidentForm;
