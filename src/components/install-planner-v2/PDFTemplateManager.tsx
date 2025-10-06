import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Trash2, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface PDFTemplate {
  id: string;
  name: string;
  type: 'design_spec' | 'quote' | 'rams' | 'checklist' | 'test_schedule' | 'eic';
  fileUrl: string;
  uploadedAt: string;
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

  const handleUpload = async (type: string, file: File) => {
    setUploading(type);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `pdf-templates/${type}-${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('company-branding')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('company-branding')
        .getPublicUrl(fileName);

      // Store template metadata (you could create a templates table)
      const newTemplate: PDFTemplate = {
        id: crypto.randomUUID(),
        name: file.name,
        type: type as any,
        fileUrl: publicUrl,
        uploadedAt: new Date().toISOString()
      };

      setTemplates([...templates.filter(t => t.type !== type), newTemplate]);

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

  const handleDelete = async (template: PDFTemplate) => {
    try {
      const fileName = template.fileUrl.split('/').pop();
      if (!fileName) throw new Error('Invalid file URL');

      const { error } = await supabase.storage
        .from('company-branding')
        .remove([`pdf-templates/${fileName}`]);

      if (error) throw error;

      setTemplates(templates.filter(t => t.id !== template.id));
      
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
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(existingTemplate.fileUrl, '_blank')}
                    className="flex-1 text-xs h-7 bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(existingTemplate)}
                    className="text-xs h-7 px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
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
