import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GripVertical,
  Plus,
  Trash2,
  Eye,
  Save,
  ArrowLeft,
  Type,
  AlignLeft,
  CheckSquare,
  Calendar,
  Clock,
} from "lucide-react";

interface FieldDefinition {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'checklist' | 'date' | 'time';
  required: boolean;
  placeholder?: string;
  aiHint?: string;
  options?: string[];
}

interface TemplateEditorProps {
  templateId?: string;
  onClose: () => void;
  onSaved: () => void;
}

export const TemplateEditor = ({ templateId, onClose, onSaved }: TemplateEditorProps) => {
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [templateType, setTemplateType] = useState<string>("site-work");
  const [fields, setFields] = useState<FieldDefinition[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const fieldTypeIcons = {
    text: Type,
    textarea: AlignLeft,
    checklist: CheckSquare,
    date: Calendar,
    time: Clock,
  };

  const addField = (type: FieldDefinition['type']) => {
    const newField: FieldDefinition = {
      id: `field_${Date.now()}`,
      label: `New ${type} field`,
      type,
      required: false,
      placeholder: '',
      aiHint: '',
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FieldDefinition>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = async () => {
    if (!templateName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a template name",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const templateData = {
        name: templateName,
        description: templateDescription,
        template_type: templateType,
        template_schema: JSON.parse(JSON.stringify({
          fields,
          version: '1.0',
        })),
        is_default: false,
        user_id: user.id,
      };

      const { error } = templateId
        ? await supabase
            .from("briefing_templates")
            .update(templateData)
            .eq("id", templateId)
        : await supabase
            .from("briefing_templates")
            .insert([templateData]);

      if (error) throw error;

      toast({
        title: "Template Saved",
        description: `${templateName} has been saved successfully`,
      });

      onSaved();
      onClose();
    } catch (error) {
      console.error("Error saving template:", error);
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-elec-light">
              {templateId ? 'Edit Template' : 'Create Template'}
            </h2>
            <p className="text-sm text-white">
              Build a custom briefing template
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="h-11 touch-manipulation">
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button onClick={handleSave} disabled={saving} className="h-11 touch-manipulation">
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Template'}
          </Button>
        </div>
      </div>

      {!showPreview ? (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Template Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name *</Label>
                <Input
                  id="name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., Emergency Evacuation Drill"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Brief description of when to use this template"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Template Type</Label>
                <Select value={templateType} onValueChange={setTemplateType}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="site-work">Site Work</SelectItem>
                    <SelectItem value="safety">Safety Briefing</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Field Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Add Fields</span>
                <Badge variant="outline">{fields.length} fields</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(fieldTypeIcons).map(([type, Icon]) => (
                  <Button
                    key={type}
                    variant="outline"
                    onClick={() => addField(type as FieldDefinition['type'])}
                    className="justify-start h-11 touch-manipulation"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Field List */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Template Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {fields.length === 0 ? (
                <div className="text-center py-8 text-white">
                  <Plus className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No fields added yet. Click above to add fields.</p>
                </div>
              ) : (
                fields.map((field) => {
                  const Icon = fieldTypeIcons[field.type];
                  return (
                    <Card key={field.id} className="border-elec-yellow/20">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between flex-wrap">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-5 w-5 text-white cursor-move" />
                            <Icon className="h-5 w-5 text-elec-yellow" />
                            <div className="flex-1">
                              <Input
                                value={field.label}
                                onChange={(e) =>
                                  updateField(field.id, { label: e.target.value })
                                }
                                placeholder="Field label"
                                className="font-medium"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor={`required-${field.id}`} className="text-xs">
                                Required
                              </Label>
                              <Switch
                                id={`required-${field.id}`}
                                checked={field.required}
                                onCheckedChange={(checked) =>
                                  updateField(field.id, { required: checked })
                                }
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeField(field.id)}
                              className="h-11 w-11 touch-manipulation"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>

                        <Input
                          value={field.placeholder || ''}
                          onChange={(e) =>
                            updateField(field.id, { placeholder: e.target.value })
                          }
                          placeholder="Placeholder text"
                          className="text-sm"
                        />

                        <Textarea
                          value={field.aiHint || ''}
                          onChange={(e) =>
                            updateField(field.id, { aiHint: e.target.value })
                          }
                          placeholder="AI hint: Tell the AI what to generate for this field"
                          className="text-sm"
                          rows={2}
                        />
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Preview: {templateName || 'Untitled Template'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-white">{templateDescription}</p>
            {fields.map((field) => {
              const Icon = fieldTypeIcons[field.type];
              return (
                <div key={field.id} className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {field.label}
                    {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  {field.type === 'textarea' ? (
                    <Textarea placeholder={field.placeholder} rows={3} disabled />
                  ) : field.type === 'checklist' ? (
                    <div className="border rounded-md p-3 text-sm text-white">
                      Checklist items will appear here
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled
                    />
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
