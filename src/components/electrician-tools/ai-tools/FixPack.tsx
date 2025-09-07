import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wrench, 
  Clock, 
  PoundSterling, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  ShieldCheck,
  FileText,
  Users,
  ChevronRight,
  ChevronDown,
  ExternalLink
} from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FixStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  safety_notes: string[];
  tools_required: string[];
  materials_needed: string[];
  regulation_reference?: string;
}

interface FixPack {
  eicr_code: 'C1' | 'C2' | 'C3' | 'FI';
  finding: string;
  urgency: 'immediate' | 'urgent' | 'recommended';
  estimated_time: string;
  estimated_cost: string;
  difficulty: 'apprentice' | 'electrician' | 'specialist';
  safety_priority: 'critical' | 'high' | 'medium';
  steps: FixStep[];
  materials_list: Array<{
    item: string;
    quantity: string;
    estimated_cost: string;
    supplier_links?: string[];
  }>;
  verification_steps: string[];
  compliance_notes: string[];
}

interface FixPackProps {
  fixPack: FixPack;
  userRole?: 'apprentice' | 'electrician';
  onStartWork?: () => void;
  onCompleteStep?: (stepId: string) => void;
  completedSteps?: string[];
}

const FixPack: React.FC<FixPackProps> = ({
  fixPack,
  userRole = 'electrician',
  onStartWork,
  onCompleteStep,
  completedSteps = []
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['steps']);
  const [currentStep, setCurrentStep] = useState(0);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getEicrCodeColor = (code: string) => {
    switch (code) {
      case 'C1': return 'bg-red-500 text-white';
      case 'C2': return 'bg-amber-500 text-white';
      case 'C3': return 'bg-blue-500 text-white';
      case 'FI': return 'bg-slate-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'urgent': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'recommended': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-muted-foreground';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'apprentice': return <Users className="h-4 w-4 text-green-400" />;
      case 'electrician': return <Zap className="h-4 w-4 text-blue-400" />;
      case 'specialist': return <ShieldCheck className="h-4 w-4 text-purple-400" />;
      default: return <Wrench className="h-4 w-4" />;
    }
  };

  const completionPercentage = (completedSteps.length / fixPack.steps.length) * 100;

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={getEicrCodeColor(fixPack.eicr_code)}>
                {fixPack.eicr_code}
              </Badge>
              <Badge variant="outline" className={getUrgencyColor(fixPack.urgency)}>
                {fixPack.urgency.charAt(0).toUpperCase() + fixPack.urgency.slice(1)}
              </Badge>
              <div className="flex items-center gap-1">
                {getDifficultyIcon(fixPack.difficulty)}
                <span className="text-sm text-muted-foreground capitalize">
                  {fixPack.difficulty}
                </span>
              </div>
            </div>
            <CardTitle className="text-lg">{fixPack.finding}</CardTitle>
          </div>
          
          {onStartWork && (
            <Button onClick={onStartWork} className="bg-primary hover:bg-primary/90">
              <Wrench className="h-4 w-4 mr-2" />
              Start Work
            </Button>
          )}
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <Clock className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-sm font-medium">{fixPack.estimated_time}</p>
            <p className="text-xs text-muted-foreground">Duration</p>
          </div>
          <div className="text-center">
            <PoundSterling className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-sm font-medium">{fixPack.estimated_cost}</p>
            <p className="text-xs text-muted-foreground">Est. Cost</p>
          </div>
          <div className="text-center">
            <ShieldCheck className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-sm font-medium capitalize">{fixPack.safety_priority}</p>
            <p className="text-xs text-muted-foreground">Safety</p>
          </div>
        </div>

        {/* Progress bar */}
        {completedSteps.length > 0 && (
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSteps.length}/{fixPack.steps.length} steps
              </span>
            </div>
            <Progress value={completionPercentage} />
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Critical safety warning for C1 */}
        {fixPack.eicr_code === 'C1' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-400 mb-1">DANGER - Immediate Action Required</h4>
                <p className="text-sm text-red-300/80">
                  This is a C1 code indicating immediate danger. Ensure safe isolation before proceeding. 
                  {userRole === 'apprentice' && ' Consider getting supervision from a qualified electrician.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Work steps */}
        <Collapsible 
          open={expandedSections.includes('steps')}
          onOpenChange={() => toggleSection('steps')}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                <span className="font-medium">Work Steps</span>
              </div>
              {expandedSections.includes('steps') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            {fixPack.steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = index === currentStep && !isCompleted;
              
              return (
                <Card key={step.id} className={`border ${
                  isCompleted ? 'border-green-500/30 bg-green-500/5' :
                  isCurrent ? 'border-primary/30 bg-primary/5' :
                  'border-border'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : isCurrent ? (
                            <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary/20" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/50" />
                          )}
                          <span className="font-medium">Step {index + 1}: {step.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                        
                        {/* Safety notes */}
                        {step.safety_notes.length > 0 && (
                          <div className="bg-amber-500/10 border border-amber-500/20 rounded p-2 mb-3">
                            <div className="flex items-start gap-2">
                              <ShieldCheck className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-amber-400 mb-1">Safety Requirements</p>
                                <ul className="text-xs text-amber-300/80 space-y-0.5">
                                  {step.safety_notes.map((note, idx) => (
                                    <li key={idx}>• {note}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Tools and materials */}
                        {(step.tools_required.length > 0 || step.materials_needed.length > 0) && (
                          <div className="grid gap-2 sm:grid-cols-2">
                            {step.tools_required.length > 0 && (
                              <div className="bg-muted/30 rounded p-2">
                                <p className="text-xs font-medium mb-1">Tools Required</p>
                                <ul className="text-xs text-muted-foreground space-y-0.5">
                                  {step.tools_required.map((tool, idx) => (
                                    <li key={idx}>• {tool}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {step.materials_needed.length > 0 && (
                              <div className="bg-muted/30 rounded p-2">
                                <p className="text-xs font-medium mb-1">Materials Needed</p>
                                <ul className="text-xs text-muted-foreground space-y-0.5">
                                  {step.materials_needed.map((material, idx) => (
                                    <li key={idx}>• {material}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {step.regulation_reference && (
                          <p className="text-xs text-muted-foreground mt-2">
                            <FileText className="h-3 w-3 inline mr-1" />
                            Reference: {step.regulation_reference}
                          </p>
                        )}
                      </div>
                      
                      {onCompleteStep && !isCompleted && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onCompleteStep(step.id)}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CollapsibleContent>
        </Collapsible>

        {/* Materials list */}
        <Collapsible 
          open={expandedSections.includes('materials')}
          onOpenChange={() => toggleSection('materials')}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4" />
                <span className="font-medium">Materials & Cost Breakdown</span>
              </div>
              {expandedSections.includes('materials') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="space-y-2">
              {fixPack.materials_list.map((material, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{material.item}</p>
                    <p className="text-xs text-muted-foreground">Qty: {material.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{material.estimated_cost}</p>
                    {material.supplier_links && (
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Find suppliers
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Compliance notes */}
        {fixPack.compliance_notes.length > 0 && (
          <Collapsible 
            open={expandedSections.includes('compliance')}
            onOpenChange={() => toggleSection('compliance')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">Compliance & Verification</span>
                </div>
                {expandedSections.includes('compliance') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <h4 className="font-medium text-blue-400 mb-2">Verification Steps</h4>
                <ul className="space-y-1">
                  {fixPack.verification_steps.map((step, index) => (
                    <li key={index} className="text-sm text-blue-300/80 flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Compliance Notes</h4>
                <ul className="space-y-1">
                  {fixPack.compliance_notes.map((note, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <FileText className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default FixPack;