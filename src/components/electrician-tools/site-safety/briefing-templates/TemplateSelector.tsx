import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Sparkles, Zap, AlertTriangle, Info } from "lucide-react";
import { MobileButton } from "@/components/ui/mobile-button";

interface Template {
  id: string;
  name: string;
  description: string;
  template_type: string;
  is_default: boolean;
  usage_count: number;
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  selectedType?: string;
}

export const TemplateSelector = ({ onSelectTemplate, selectedType }: TemplateSelectorProps) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, [selectedType]);

  const fetchTemplates = async () => {
    try {
      let query = supabase
        .from('briefing_templates')
        .select('*')
        .order('usage_count', { ascending: false });

      if (selectedType) {
        query = query.eq('template_type', selectedType);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTemplateIcon = (type: string) => {
    const icons: Record<string, any> = {
      'site-work': FileText,
      'lfe': AlertTriangle,
      'toolbox-talk': Info,
      'hse-update': Info,
      'safety-alert': Zap,
    };
    const Icon = icons[type] || FileText;
    return <Icon className="h-5 w-5" />;
  };

  const getTemplateColor = (type: string) => {
    const colors: Record<string, string> = {
      'site-work': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'lfe': 'bg-red-500/20 text-red-400 border-red-500/30',
      'toolbox-talk': 'bg-green-500/20 text-green-400 border-green-500/30',
      'hse-update': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'safety-alert': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };
    return colors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-card/50 rounded-xl border border-primary/10" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-elec-yellow" />
        <h3 className="text-lg font-semibold text-elec-light">Choose a Template</h3>
      </div>

      {templates.map((template) => (
        <Card
          key={template.id}
          className="bg-card/50 border-primary/20 hover:border-elec-yellow/40 transition-all cursor-pointer group"
          onClick={() => onSelectTemplate(template)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getTemplateColor(template.template_type)}`}>
                  {getTemplateIcon(template.template_type)}
                </div>
                <div>
                  <h4 className="font-semibold text-elec-light group-hover:text-elec-yellow transition-colors">
                    {template.name}
                  </h4>
                  <p className="text-sm text-elec-light/60 mt-1">
                    {template.description}
                  </p>
                </div>
              </div>
              {template.is_default && (
                <Badge className="bg-elec-yellow/20 text-elec-yellow border-0">
                  Popular
                </Badge>
              )}
            </div>

            {template.usage_count > 0 && (
              <p className="text-xs text-elec-light/40">
                Used {template.usage_count} {template.usage_count === 1 ? 'time' : 'times'}
              </p>
            )}
          </CardContent>
        </Card>
      ))}

      {templates.length === 0 && (
        <Card className="bg-card/50 border-primary/20">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-elec-light/30 mx-auto mb-3" />
            <p className="text-elec-light/60">No templates available for this type</p>
            <p className="text-sm text-elec-light/40 mt-2">
              Try selecting a different briefing type
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
