
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TemplatePreviewDialog from "./TemplatePreviewDialog";
import { downloadTemplate } from "@/services/portfolioTemplateService";

interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  sections: string[];
  downloadUrl?: string;
}

const PortfolioTemplateSelector = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<PortfolioTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const templates: PortfolioTemplate[] = [
    {
      id: "basic-apprentice",
      name: "Basic Apprentice Portfolio",
      description: "Essential sections for new apprentices starting their journey",
      category: "Foundation",
      difficulty: "Beginner",
      sections: ["Personal Profile", "Work Evidence", "Skills Development", "Safety Records"]
    },
    {
      id: "installation-specialist",
      name: "Installation Specialist Portfolio",
      description: "Focused on domestic and commercial installation work",
      category: "Specialisation",
      difficulty: "Intermediate",
      sections: ["Installation Projects", "Testing Records", "Compliance Documentation", "Customer Feedback"]
    },
    {
      id: "industrial-portfolio",
      name: "Industrial Electrical Portfolio",
      description: "For apprentices working in industrial environments",
      category: "Industry Specific",
      difficulty: "Advanced",
      sections: ["Industrial Projects", "Maintenance Records", "Safety Systems", "Technical Drawings"]
    },
    {
      id: "epa-ready",
      name: "End-Point Assessment Ready",
      description: "Comprehensive portfolio structured for EPA requirements",
      category: "Assessment",
      difficulty: "Advanced",
      sections: ["Knowledge Evidence", "Skills Evidence", "Behaviours Evidence", "Professional Discussion"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handlePreview = (template: PortfolioTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleDownload = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      downloadTemplate(template);
      toast({
        title: "Template Downloaded",
        description: `${template.name} has been downloaded successfully.`,
      });
      setIsPreviewOpen(false);
    }
  };

  const handleUseTemplate = (template: PortfolioTemplate) => {
    downloadTemplate(template);
    toast({
      title: "Template Ready",
      description: `${template.name} has been downloaded. You can now start building your portfolio!`,
    });
  };

  return (
    <>
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400">Portfolio Templates</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose a template that matches your apprenticeship focus and experience level
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div key={template.id} className="p-4 bg-elec-gray/50 rounded-lg border border-blue-500/20">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-white">{template.name}</h4>
                  <Badge className={`text-xs ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                
                <div className="mb-4">
                  <span className="text-xs font-medium text-blue-400">Includes:</span>
                  <ul className="mt-1 space-y-1">
                    {template.sections.map((section, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        {section}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePreview(template)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <TemplatePreviewDialog
        template={selectedTemplate}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onDownload={handleDownload}
      />
    </>
  );
};

export default PortfolioTemplateSelector;
