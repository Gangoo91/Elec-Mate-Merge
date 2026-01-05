import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Zap, 
  Calendar, 
  MapPin, 
  User, 
  FileText,
  Package,
  AlertCircle,
  Clock
} from "lucide-react";

interface ProjectReviewStepProps {
  projectType: 'domestic' | 'commercial' | 'industrial';
  prompt: string;
  projectName?: string;
  location?: string;
  clientName?: string;
  startDate?: string;
  duration?: string;
  selectedScope: string[];
  constraints: any;
  templateName?: string;
  onBack: () => void;
  onGenerate: () => void;
}

export const ProjectReviewStep = ({
  projectType,
  prompt,
  projectName,
  location,
  clientName,
  startDate,
  duration,
  selectedScope,
  constraints,
  templateName,
  onBack,
  onGenerate
}: ProjectReviewStepProps) => {
  
  const hasConstraints = Object.values(constraints).some(v => v);
  
  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Edit
        </Button>
      </div>

      <Card className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-bold">Review Your Project Plan</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Check the details below before generating your AI-powered project plan
          </p>
        </div>

        {/* Project Type */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Project Type
          </h3>
          <Badge 
            variant="outline" 
            className="text-sm capitalize"
          >
            {projectType}
          </Badge>
        </div>

        {/* Main Requirements */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Requirements
          </h3>
          <p className="text-sm leading-relaxed">
            {prompt}
          </p>
        </div>

        {/* Template Used */}
        {templateName && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Template
            </h3>
            <Badge variant="secondary" className="text-sm">
              {templateName}
            </Badge>
          </div>
        )}

        {/* Project Details */}
        {(projectName || location || clientName || startDate || duration) && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Project Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectName && (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium">{projectName}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{location}</span>
                </div>
              )}
              {clientName && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{clientName}</span>
                </div>
              )}
              {startDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{new Date(startDate).toLocaleDateString('en-GB')}</span>
                </div>
              )}
              {duration && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{duration}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scope Items */}
        {selectedScope.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Package className="h-4 w-4" />
              Scope Items ({selectedScope.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedScope.map((item, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {hasConstraints && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Constraints & Requirements
            </h3>
            <div className="space-y-2 text-sm">
              {constraints.accessRestrictions && (
                <div>
                  <span className="font-medium">Access: </span>
                  {constraints.accessRestrictions}
                </div>
              )}
              {constraints.workingHours && (
                <div>
                  <span className="font-medium">Working Hours: </span>
                  {constraints.workingHours}
                </div>
              )}
              {constraints.occupiedProperty && (
                <Badge variant="outline" className="text-xs">Occupied Property</Badge>
              )}
              {constraints.medicalEquipment && (
                <Badge variant="outline" className="text-xs">Medical Equipment Present</Badge>
              )}
              {constraints.budgetLimit && (
                <div>
                  <span className="font-medium">Budget Limit: </span>
                  £{constraints.budgetLimit}
                </div>
              )}
              {constraints.otherTrades && (
                <div>
                  <span className="font-medium">Other Trades: </span>
                  {constraints.otherTrades}
                </div>
              )}
              {constraints.specialRequirements && (
                <div>
                  <span className="font-medium">Special Requirements: </span>
                  {constraints.specialRequirements}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Generation Time Warning */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">AI Generation Time</p>
              <p className="text-xs text-muted-foreground">
                Generating a comprehensive project plan takes 2-3 minutes. The AI will analyze regulations, 
                create phases, identify risks, and develop a detailed timeline.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
          size="lg"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Edit Details
        </Button>
        <Button
          onClick={onGenerate}
          className="flex-1 bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-foreground"
          size="lg"
        >
          <Zap className="h-4 w-4 mr-2" />
          Generate Plan
        </Button>
      </div>
    </div>
  );
};
