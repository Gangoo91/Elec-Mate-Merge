import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Trash2, Download, Loader2, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PDFTemplate {
  id: string;
  user_id: string;
  name: string;
  type: 'design_spec' | 'quote' | 'rams' | 'checklist' | 'test_schedule' | 'eic';
  pdf_monkey_template_id: string | null;
  field_mapping: any;
  file_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const TEMPLATE_TYPES = [
  { key: 'design_spec', label: 'Design Specification', icon: '📋' },
  { key: 'quote', label: 'Client Quote', icon: '💰' },
  { key: 'rams', label: 'Risk Assessment & Method Statement', icon: '🦺' },
  { key: 'checklist', label: 'Installation Checklist', icon: '✅' },
  { key: 'test_schedule', label: 'Test Schedule', icon: '🔌' },
  { key: 'eic', label: 'Electrical Installation Certificate', icon: '📜' },
];

export const PDFTemplateManager = () => {
  const [templates, setTemplates] = useState<PDFTemplate[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<PDFTemplate | null>(null);
  const [templateId, setTemplateId] = useState("");
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('pdf_templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const handleUpload = async (type: string, file: File) => {
    setUploading(type);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `pdf-templates/${type}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('company-branding')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('company-branding')
        .getPublicUrl(fileName);

      // Deactivate old template of same type
      await supabase
        .from('pdf_templates')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('type', type as any);

      // Create new template record
      const { error: insertError } = await supabase
        .from('pdf_templates')
        .insert([{
          user_id: user.id,
          name: file.name,
          type: type as any,
          file_url: publicUrl,
          is_active: true
        }]);

      if (insertError) throw insertError;

      await loadTemplates();

      toast.success("Template Uploaded", {
        description: `${file.name} is now your ${TEMPLATE_TYPES.find(t => t.key === type)?.label} template`
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Upload Failed", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setUploading(null);
    }
  };

  const handleSaveTemplateConfig = async () => {
    if (!editingTemplate) return;

    try {
      const { error } = await supabase
        .from('pdf_templates')
        .update({
          pdf_monkey_template_id: templateId,
          field_mapping: fieldMapping
        })
        .eq('id', editingTemplate.id);

      if (error) throw error;

      await loadTemplates();
      setEditingTemplate(null);
      setTemplateId("");
      setFieldMapping({});

      toast.success("Template Configuration Saved");
    } catch (error) {
      console.error('Save error:', error);
      toast.error("Failed to save configuration");
    }
  };

  const handleDelete = async (template: PDFTemplate) => {
    try {
      if (template.file_url) {
        const fileName = template.file_url.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('company-branding')
            .remove([`pdf-templates/${fileName}`]);
        }
      }

      const { error } = await supabase
        .from('pdf_templates')
        .delete()
        .eq('id', template.id);

      if (error) throw error;

      await loadTemplates();
      toast.success("Template Removed");
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("Delete Failed");
    }
  };

  return (
    <Card className="p-4 space-y-4 bg-elec-card border-border/30">
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">PDF Template Manager</h3>
        <p className="text-xs text-muted-foreground">
          Upload your branded templates (PDF, Word, Excel). The AI will fill them with project data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {TEMPLATE_TYPES.map(templateType => {
          const existingTemplate = templates.find(t => t.type === templateType.key);
          
          return (
            <div
              key={templateType.key}
              className="p-3 rounded-lg border border-border/30 bg-elec-dark space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{templateType.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-white">{templateType.label}</p>
                    {existingTemplate && (
                      <Badge variant="outline" className="text-xs mt-1 bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow">
                        Template set
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {existingTemplate ? (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {existingTemplate.file_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(existingTemplate.file_url!, '_blank')}
                        className="flex-1 text-xs h-7 bg-white/5 hover:bg-white/10 border-white/10 text-white"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingTemplate(existingTemplate);
                            setTemplateId(existingTemplate.pdf_monkey_template_id || "");
                            setFieldMapping(existingTemplate.field_mapping || {});
                          }}
                          className="flex-1 text-xs h-7 bg-white/5 hover:bg-white/10 border-white/10 text-white"
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-elec-dark border-border/30 text-white">
                        <DialogHeader>
                          <DialogTitle>Configure PDF Template</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            Enter your PDF Monkey template ID and map fields
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="template-id">PDF Monkey Template ID</Label>
                            <Input
                              id="template-id"
                              value={templateId}
                              onChange={(e) => setTemplateId(e.target.value)}
                              placeholder="e.g., YOUR_TEMPLATE_ID"
                              className="bg-elec-card border-border/30 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Field Mapping (JSON)</Label>
                            <textarea
                              value={JSON.stringify(fieldMapping, null, 2)}
                              onChange={(e) => {
                                try {
                                  setFieldMapping(JSON.parse(e.target.value));
                                } catch {}
                              }}
                              className="w-full h-32 p-2 rounded-md bg-elec-card border border-border/30 text-white text-xs font-mono"
                              placeholder='{"templateField": "dataPath"}'
                            />
                            <p className="text-xs text-muted-foreground">
                              Map your template placeholders to data fields
                            </p>
                          </div>
                          <Button onClick={handleSaveTemplateConfig} className="w-full">
                            Save Configuration
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(existingTemplate)}
                      className="text-xs h-7 px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {existingTemplate.pdf_monkey_template_id && (
                    <Badge variant="outline" className="text-xs bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                      ID: {existingTemplate.pdf_monkey_template_id}
                    </Badge>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept=".pdf,.docx,.xlsx"
                    className="hidden"
                    id={`upload-${templateType.key}`}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(templateType.key, file);
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById(`upload-${templateType.key}`)?.click()}
                    disabled={uploading === templateType.key}
                    className="w-full text-xs h-7 bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  >
                    {uploading === templateType.key ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Tip:</strong> Templates are optional. Without them, the AI generates professional PDFs using standard layouts. 
          Upload your own templates to match your company branding.
        </p>
      </div>
    </Card>
  );
};
