import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Search,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  Plus,
  Star,
  TrendingUp,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { TemplateEditor } from "./TemplateEditor";

interface Template {
  id: string;
  name: string;
  description: string;
  template_type: string;
  is_default: boolean;
  usage_count: number;
  template_schema: any;
  created_at: string;
}

interface TemplateLibraryProps {
  onClose: () => void;
}

export const TemplateLibrary = ({ onClose }: TemplateLibraryProps) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | undefined>();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("briefing_templates")
        .select("*")
        .or(`is_default.eq.true,user_id.eq.${user.id}`)
        .order("usage_count", { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (templateId: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      const { error } = await supabase
        .from("briefing_templates")
        .delete()
        .eq("id", templateId);

      if (error) throw error;

      toast({
        title: "Template Deleted",
        description: "Template has been removed",
      });

      fetchTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      });
    }
  };

  const handleDuplicate = async (template: Template) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("briefing_templates")
        .insert([
          {
            name: `${template.name} (Copy)`,
            description: template.description,
            template_type: template.template_type,
            template_schema: JSON.parse(JSON.stringify(template.template_schema)),
            is_default: false,
            user_id: user.id,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Template Duplicated",
        description: "Template copy created successfully",
      });

      fetchTemplates();
    } catch (error) {
      console.error("Error duplicating template:", error);
      toast({
        title: "Error",
        description: "Failed to duplicate template",
        variant: "destructive",
      });
    }
  };

  const handleExport = (template: Template) => {
    const dataStr = JSON.stringify(template, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${template.name.replace(/\s+/g, '_')}_template.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Template Exported",
      description: "Template downloaded as JSON file",
    });
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || template.template_type === selectedType;
    return matchesSearch && matchesType;
  });

  const templateTypes = Array.from(new Set(templates.map(t => t.template_type)));

  if (showEditor) {
    return (
      <TemplateEditor
        templateId={editingTemplateId}
        onClose={() => {
          setShowEditor(false);
          setEditingTemplateId(undefined);
        }}
        onSaved={() => {
          fetchTemplates();
          setShowEditor(false);
          setEditingTemplateId(undefined);
        }}
      />
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Header - Mobile Optimized */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="md:flex touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-elec-light">
              Template Library
            </h2>
            <p className="text-xs md:text-sm text-white">
              Manage your briefing templates
            </p>
          </div>
        </div>
        
        {/* Create button - full width on mobile */}
        <Button
          onClick={() => setShowEditor(true)}
          className="w-full md:w-auto h-11 touch-manipulation"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          )}
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className={cn("h-11 touch-manipulation", !searchQuery && "pl-10")}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedType === null ? "default" : "outline"}
            onClick={() => setSelectedType(null)}
            className="h-11 touch-manipulation"
          >
            All
          </Button>
          {templateTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className="h-11 touch-manipulation"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="border-elec-yellow/20 hover:border-elec-yellow/40 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {template.is_default && (
                        <Star className="h-4 w-4 text-elec-yellow fill-elec-yellow" />
                      )}
                      {template.name}
                    </CardTitle>
                    <p className="text-sm text-white mt-1 line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{template.template_type}</Badge>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {template.usage_count || 0} uses
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {!template.is_default && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingTemplateId(template.id);
                        setShowEditor(true);
                      }}
                      className="flex-1 min-w-[80px] h-11 touch-manipulation"
                    >
                      <Edit className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Edit</span>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handleDuplicate(template)}
                    className="flex-1 min-w-[80px] h-11 touch-manipulation"
                  >
                    <Copy className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Copy</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleExport(template)}
                    className="flex-1 min-w-[80px] h-11 touch-manipulation"
                  >
                    <Download className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Export</span>
                  </Button>
                  {!template.is_default && (
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(template.id)}
                      className="text-destructive hover:text-destructive flex-1 min-w-[80px] h-11 touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Delete</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTemplates.length === 0 && !loading && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-white mb-4">
              {searchQuery || selectedType
                ? "No templates found matching your filters"
                : "No templates yet"}
            </p>
            <Button onClick={() => setShowEditor(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
