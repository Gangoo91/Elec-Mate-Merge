
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, CheckCircle } from "lucide-react";

interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  sections: string[];
  downloadUrl?: string;
}

interface TemplatePreviewDialogProps {
  template: PortfolioTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (templateId: string) => void;
}

const TemplatePreviewDialog = ({ template, isOpen, onClose, onDownload }: TemplatePreviewDialogProps) => {
  if (!template) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {template.name}
            <Badge className={`text-xs ${getDifficultyColor(template.difficulty)}`}>
              {template.difficulty}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">{template.description}</p>
          
          <div>
            <h4 className="font-medium text-white mb-2">Template Includes:</h4>
            <div className="grid grid-cols-2 gap-2">
              {template.sections.map((section, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  {section}
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <h5 className="font-medium text-blue-400 mb-2">What You'll Get:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Pre-formatted document template</li>
              <li>• Section guidelines and examples</li>
              <li>• Assessment criteria checklist</li>
              <li>• Evidence collection prompts</li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={() => onDownload(template.id)} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close Preview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewDialog;
