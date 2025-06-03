
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface SafetyResource {
  id: string;
  title: string;
  summary: string;
  file_type: string;
  file_url: string | null;
  file_size: string;
  category: string;
  date_published: string;
  download_count: number;
}

const SafetyResourcesCard = () => {
  const [resources, setResources] = useState<SafetyResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('safety_resources')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching safety resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (resource: SafetyResource) => {
    try {
      // Update download count
      await supabase
        .from('safety_resources')
        .update({ download_count: resource.download_count + 1 })
        .eq('id', resource.id);

      // For demo purposes, show alert since we don't have actual files
      alert(`Downloading ${resource.title} (${resource.file_size})`);
      
      // Refresh the data to show updated download count
      fetchResources();
    } catch (error) {
      console.error('Error updating download count:', error);
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case 'PDF': return 'bg-red-500';
      case 'DOC': case 'DOCX': return 'bg-blue-500';
      case 'XLS': case 'XLSX': return 'bg-green-500';
      case 'PPT': case 'PPTX': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-400" />
            Safety Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-elec-gray-light/20 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-400" />
          Safety Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="p-4 bg-elec-gray-light/10 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-white">{resource.title}</h3>
                <div className="flex items-center gap-2">
                  <Badge className={`${getFileTypeColor(resource.file_type)} text-white`}>
                    {resource.file_type}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(resource)}
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">{resource.summary}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
                    {resource.category}
                  </span>
                  <span>{resource.file_size}</span>
                  <span>{resource.download_count} downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(resource.date_published).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyResourcesCard;
