
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Calendar, MapPin, User, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IncidentFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

const IncidentForm = ({ onSubmit, onCancel, initialData }: IncidentFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    incident_type: initialData?.incident_type || '',
    date_occurred: initialData?.date_occurred ? new Date(initialData.date_occurred).toISOString().slice(0, 16) : '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    severity: initialData?.severity || 'medium',
    injuries_sustained: initialData?.injuries_sustained || '',
    equipment_involved: initialData?.equipment_involved || '',
    witnesses: initialData?.witnesses || '',
    supervisor_name: initialData?.supervisor_name || '',
    supervisor_notified: initialData?.supervisor_notified || false,
    first_aid_given: initialData?.first_aid_given || false,
    immediate_action_taken: initialData?.immediate_action_taken || '',
    potential_consequences: initialData?.potential_consequences || '',
    follow_up_required: initialData?.follow_up_required || false,
    follow_up_notes: initialData?.follow_up_notes || '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.incident_type || !formData.date_occurred || !formData.location || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const submitData = {
      ...formData,
      date_occurred: new Date(formData.date_occurred).toISOString(),
      status: initialData ? 'updated' : 'draft'
    };

    if (onSubmit) {
      onSubmit(submitData);
    }

    toast({
      title: "Incident Report Saved",
      description: initialData ? "Incident report updated successfully" : "Incident report created successfully"
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <AlertTriangle className="h-5 w-5" />
            {initialData ? 'Edit Incident Report' : 'New Incident Report'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-elec-light">
                  Incident Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Brief description of the incident"
                  className="bg-elec-dark border-elec-yellow/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incident_type" className="text-elec-light">
                  Incident Type *
                </Label>
                <Select value={formData.incident_type} onValueChange={(value) => handleInputChange('incident_type', value)}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electrical_shock">Electrical Shock</SelectItem>
                    <SelectItem value="burns">Burns</SelectItem>
                    <SelectItem value="falls">Falls</SelectItem>
                    <SelectItem value="cuts">Cuts/Lacerations</SelectItem>
                    <SelectItem value="equipment_failure">Equipment Failure</SelectItem>
                    <SelectItem value="near_miss">Near Miss</SelectItem>
                    <SelectItem value="property_damage">Property Damage</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_occurred" className="text-elec-light flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date & Time Occurred *
                </Label>
                <Input
                  id="date_occurred"
                  type="datetime-local"
                  value={formData.date_occurred}
                  onChange={(e) => handleInputChange('date_occurred', e.target.value)}
                  className="bg-elec-dark border-elec-yellow/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-elec-light flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Where did the incident occur?"
                  className="bg-elec-dark border-elec-yellow/30"
                  required
                />
              </div>
            </div>

            {/* Severity */}
            <div className="space-y-2">
              <Label htmlFor="severity" className="text-elec-light">
                Severity Level
              </Label>
              <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-elec-light flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Incident Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Provide a detailed description of what happened..."
                className="bg-elec-dark border-elec-yellow/30 min-h-[100px]"
                required
              />
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="injuries_sustained" className="text-elec-light">
                  Injuries Sustained
                </Label>
                <Textarea
                  id="injuries_sustained"
                  value={formData.injuries_sustained}
                  onChange={(e) => handleInputChange('injuries_sustained', e.target.value)}
                  placeholder="Describe any injuries..."
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment_involved" className="text-elec-light">
                  Equipment Involved
                </Label>
                <Textarea
                  id="equipment_involved"
                  value={formData.equipment_involved}
                  onChange={(e) => handleInputChange('equipment_involved', e.target.value)}
                  placeholder="List any equipment involved..."
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
            </div>

            {/* People Involved */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="witnesses" className="text-elec-light flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Witnesses
                </Label>
                <Textarea
                  id="witnesses"
                  value={formData.witnesses}
                  onChange={(e) => handleInputChange('witnesses', e.target.value)}
                  placeholder="Names and contact details of witnesses..."
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supervisor_name" className="text-elec-light">
                  Supervisor Name
                </Label>
                <Input
                  id="supervisor_name"
                  value={formData.supervisor_name}
                  onChange={(e) => handleInputChange('supervisor_name', e.target.value)}
                  placeholder="Name of supervising person"
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
            </div>

            {/* Action Taken */}
            <div className="space-y-2">
              <Label htmlFor="immediate_action_taken" className="text-elec-light">
                Immediate Action Taken
              </Label>
              <Textarea
                id="immediate_action_taken"
                value={formData.immediate_action_taken}
                onChange={(e) => handleInputChange('immediate_action_taken', e.target.value)}
                placeholder="What immediate actions were taken?"
                className="bg-elec-dark border-elec-yellow/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="potential_consequences" className="text-elec-light">
                Potential Consequences
              </Label>
              <Textarea
                id="potential_consequences"
                value={formData.potential_consequences}
                onChange={(e) => handleInputChange('potential_consequences', e.target.value)}
                placeholder="What could have happened?"
                className="bg-elec-dark border-elec-yellow/30"
              />
            </div>

            {/* Follow-up */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="follow_up_required"
                  checked={formData.follow_up_required}
                  onCheckedChange={(checked) => handleInputChange('follow_up_required', checked)}
                />
                <Label htmlFor="follow_up_required" className="text-elec-light">
                  Follow-up Required
                </Label>
              </div>

              {formData.follow_up_required && (
                <div className="space-y-2">
                  <Label htmlFor="follow_up_notes" className="text-elec-light">
                    Follow-up Notes
                  </Label>
                  <Textarea
                    id="follow_up_notes"
                    value={formData.follow_up_notes}
                    onChange={(e) => handleInputChange('follow_up_notes', e.target.value)}
                    placeholder="Describe required follow-up actions..."
                    className="bg-elec-dark border-elec-yellow/30"
                  />
                </div>
              )}
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="supervisor_notified"
                  checked={formData.supervisor_notified}
                  onCheckedChange={(checked) => handleInputChange('supervisor_notified', checked)}
                />
                <Label htmlFor="supervisor_notified" className="text-elec-light">
                  Supervisor Notified
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="first_aid_given"
                  checked={formData.first_aid_given}
                  onCheckedChange={(checked) => handleInputChange('first_aid_given', checked)}
                />
                <Label htmlFor="first_aid_given" className="text-elec-light">
                  First Aid Given
                </Label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                {initialData ? 'Update Report' : 'Save Report'}
              </Button>
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentForm;
