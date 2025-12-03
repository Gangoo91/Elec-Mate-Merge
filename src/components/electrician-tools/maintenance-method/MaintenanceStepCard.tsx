import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Wrench, 
  Clock, 
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Package,
  GraduationCap,
  FileText,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Edit,
  Save,
  X,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
  ShieldAlert
} from 'lucide-react';
import { MaintenanceStep } from '@/types/maintenance-method';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface MaintenanceStepCardProps {
  step: MaintenanceStep;
  onUpdate?: (updated: MaintenanceStep) => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const MaintenanceStepCard = ({ 
  step, 
  onUpdate, 
  onDelete, 
  onMoveUp, 
  onMoveDown 
}: MaintenanceStepCardProps) => {
  const { isMobile } = useMobileEnhanced();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Editing state
  const [editedTitle, setEditedTitle] = useState(step.title);
  const [editedContent, setEditedContent] = useState(step.content);
  const [editedDuration, setEditedDuration] = useState(step.estimatedDuration || '');
  const [editedSafety, setEditedSafety] = useState<string[]>(
    step.safety?.map(s => typeof s === 'string' ? s : s.note) || []
  );
  const [editedTools, setEditedTools] = useState<string[]>(step.toolsRequired || []);
  const [editedMaterials, setEditedMaterials] = useState<string[]>(step.materialsNeeded || []);
  const [editedCheckpoints, setEditedCheckpoints] = useState<string[]>(step.inspectionCheckpoints || []);
  const [editedReferences, setEditedReferences] = useState<string[]>(step.bsReferences || []);
  const [editedHazards, setEditedHazards] = useState<string[]>(step.linkedHazards || []);
  const [editedQualifications, setEditedQualifications] = useState<string[]>(step.qualifications || []);
  const [editedObservations, setEditedObservations] = useState<string[]>(step.observations || []);
  const [editedDefectCodes, setEditedDefectCodes] = useState<string[]>(step.defectCodes || []);

  // Collapsible sections state
  const [sectionsExpanded, setSectionsExpanded] = useState({
    hazards: !isMobile,
    references: !isMobile,
    safety: !isMobile,
    tools: !isMobile,
    materials: !isMobile,
    checkpoints: !isMobile,
    qualifications: !isMobile,
    observations: !isMobile,
    defectCodes: !isMobile
  });

  const toggleSection = (section: keyof typeof sectionsExpanded) => {
    setSectionsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = () => {
    if (!onUpdate) return;
    
    onUpdate({
      ...step,
      title: editedTitle,
      content: editedContent,
      estimatedDuration: editedDuration || undefined,
      safety: editedSafety.length > 0 ? editedSafety : undefined,
      toolsRequired: editedTools.length > 0 ? editedTools : undefined,
      materialsNeeded: editedMaterials.length > 0 ? editedMaterials : undefined,
      inspectionCheckpoints: editedCheckpoints.length > 0 ? editedCheckpoints : undefined,
      bsReferences: editedReferences.length > 0 ? editedReferences : undefined,
      linkedHazards: editedHazards.length > 0 ? editedHazards : undefined,
      qualifications: editedQualifications.length > 0 ? editedQualifications : undefined,
      observations: editedObservations.length > 0 ? editedObservations : undefined,
      defectCodes: editedDefectCodes.length > 0 ? editedDefectCodes : undefined
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(step.title);
    setEditedContent(step.content);
    setEditedDuration(step.estimatedDuration || '');
    setEditedSafety(step.safety?.map(s => typeof s === 'string' ? s : s.note) || []);
    setEditedTools(step.toolsRequired || []);
    setEditedMaterials(step.materialsNeeded || []);
    setEditedCheckpoints(step.inspectionCheckpoints || []);
    setEditedReferences(step.bsReferences || []);
    setEditedHazards(step.linkedHazards || []);
    setEditedQualifications(step.qualifications || []);
    setEditedObservations(step.observations || []);
    setEditedDefectCodes(step.defectCodes || []);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      setShowDeleteConfirm(false);
    }
  };

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => prev.map((item, i) => i === index ? value : item));
  };

  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  // Helper to format numbered items (1), 2), 3) etc.) onto separate lines
  const formatNumberedItems = (text: string): React.ReactNode => {
    const hasNumberedItems = /\d+\)/.test(text);
    
    if (!hasNumberedItems) {
      return <p>{text}</p>;
    }
    
    const parts = text.split(/(?=\d+\)\s*)/);
    
    return (
      <div className="space-y-1.5">
        {parts.map((part, idx) => {
          const trimmed = part.trim();
          if (!trimmed) return null;
          
          const numMatch = trimmed.match(/^(\d+)\)\s*/);
          if (numMatch) {
            const num = numMatch[1];
            const content = trimmed.slice(numMatch[0].length);
            return (
              <div key={idx} className="flex gap-2 text-sm">
                <span className="text-elec-yellow font-semibold flex-shrink-0 min-w-[1.25rem]">{num}.</span>
                <span>{content}</span>
              </div>
            );
          }
          
          return <p key={idx}>{trimmed}</p>;
        })}
      </div>
    );
  };

  // Parse and format step content with sections and numbered items
  const formatStepContent = (content: string): React.ReactNode => {
    const sections = content.split(/(?=\b(?:WHAT|HOW|WHY|WHERE|WHEN|WHAT TO LOOK FOR|Acceptance criteria|Common faults)[:.])/gi);
    
    if (sections.length <= 1) {
      return formatNumberedItems(content);
    }
    
    return (
      <div className="space-y-4">
        {sections.map((section, idx) => {
          const trimmed = section.trim();
          if (!trimmed) return null;
          
          const labelMatch = trimmed.match(/^(WHAT|HOW|WHY|WHERE|WHEN|WHAT TO LOOK FOR|Acceptance criteria|Common faults)[:.]\s*/i);
          
          if (labelMatch) {
            const label = labelMatch[1];
            const text = trimmed.slice(labelMatch[0].length);
            return (
              <div key={idx} className="space-y-1.5">
                <span className="text-xs font-bold text-elec-yellow uppercase tracking-wide">{label}</span>
                <div className="text-sm text-foreground pl-0">
                  {formatNumberedItems(text)}
                </div>
              </div>
            );
          }
          
          return (
            <div key={idx} className="text-sm text-foreground">
              {formatNumberedItems(trimmed)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderCollapsibleSection = (
    key: keyof typeof sectionsExpanded,
    title: string,
    icon: React.ReactNode,
    items: string[],
    editItems: string[],
    setEditItems: React.Dispatch<React.SetStateAction<string[]>>,
    color: 'amber' | 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'cyan' | 'orange'
  ) => {
    if (!isEditing && items.length === 0) return null;

    const colorClasses = {
      amber: 'border-amber-500/30 bg-amber-500/5',
      blue: 'border-blue-500/30 bg-blue-500/5',
      red: 'border-destructive/30 bg-destructive/5',
      yellow: 'border-elec-yellow/30 bg-elec-yellow/5',
      green: 'border-green-500/30 bg-green-500/5',
      purple: 'border-purple-500/30 bg-purple-500/5',
      cyan: 'border-cyan-500/30 bg-cyan-500/5',
      orange: 'border-orange-500/30 bg-orange-500/5'
    };

    const headerColorClasses = {
      amber: 'bg-amber-500/10 text-amber-400',
      blue: 'bg-blue-500/10 text-blue-400',
      red: 'bg-destructive/10 text-destructive',
      yellow: 'bg-elec-yellow/10 text-elec-yellow',
      green: 'bg-green-500/10 text-green-400',
      purple: 'bg-purple-500/10 text-purple-400',
      cyan: 'bg-cyan-500/10 text-cyan-400',
      orange: 'bg-orange-500/10 text-orange-400'
    };

    return (
      <div className={cn('border rounded-lg overflow-hidden', colorClasses[color])}>
        <button
          onClick={() => toggleSection(key)}
          className={cn(
            'w-full flex items-center justify-between p-3 transition-colors',
            headerColorClasses[color]
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            {icon}
            {title}
            {!isEditing && items.length > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {items.length}
              </Badge>
            )}
          </div>
          {sectionsExpanded[key] ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        <AnimatePresence>
          {sectionsExpanded[key] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-3 space-y-2">
                {isEditing ? (
                  <>
                    {editItems.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) => updateItem(setEditItems, idx, e.target.value)}
                          placeholder={`Add ${title.toLowerCase()}`}
                          className="flex-1 bg-background/50"
                        />
                        <Button
                          onClick={() => removeItem(setEditItems, idx)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() => addItem(setEditItems)}
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </>
                ) : (
                  <ul className="space-y-1.5 text-foreground text-left">
                    {items.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2 text-left">
                        <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                        <span className="text-left">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          {/* Step Number Badge */}
          <div className={cn(
            "flex-shrink-0 rounded-full bg-elec-yellow flex items-center justify-center font-bold text-black",
            isMobile ? "h-16 w-16 text-2xl" : "h-20 w-20 text-3xl"
          )}>
            {step.stepNumber}
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="font-semibold text-lg"
                  placeholder="Step title"
                />
              </div>
            ) : (
              <h3 className="text-lg font-semibold text-foreground text-left">
                {step.title}
              </h3>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Content */}
        <div className="text-left">
          {isEditing ? (
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[100px] bg-background/50"
              placeholder="Step description"
            />
          ) : (
            <div className="text-sm text-foreground leading-relaxed">
              {formatStepContent(step.content)}
            </div>
          )}
        </div>

        {/* Duration */}
        {(isEditing || step.estimatedDuration) && (
          <div className="flex items-center gap-2 text-sm text-left">
            <Clock className="h-4 w-4 text-elec-yellow" />
            <span className="font-medium text-foreground">Duration:</span>
            {isEditing ? (
              <Input
                value={editedDuration}
                onChange={(e) => setEditedDuration(e.target.value)}
                placeholder="e.g., 10-15 minutes"
                className="flex-1 bg-background/50"
              />
            ) : (
              <span className="text-foreground">{step.estimatedDuration}</span>
            )}
          </div>
        )}

        {/* Collapsible Sections */}
        <div className="space-y-3">
          {renderCollapsibleSection(
            'hazards',
            'Linked Hazards',
            <ShieldAlert className="h-4 w-4" />,
            step.linkedHazards || [],
            editedHazards,
            setEditedHazards,
            'amber'
          )}

          {renderCollapsibleSection(
            'references',
            'BS 7671 References',
            <BookOpen className="h-4 w-4" />,
            step.bsReferences || [],
            editedReferences,
            setEditedReferences,
            'blue'
          )}

          {renderCollapsibleSection(
            'safety',
            'Safety Requirements',
            <AlertTriangle className="h-4 w-4" />,
            step.safety?.map(s => typeof s === 'string' ? s : s.note) || [],
            editedSafety,
            setEditedSafety,
            'red'
          )}

          {renderCollapsibleSection(
            'tools',
            'Tools Required',
            <Wrench className="h-4 w-4" />,
            step.toolsRequired || [],
            editedTools,
            setEditedTools,
            'yellow'
          )}

          {renderCollapsibleSection(
            'materials',
            'Materials Needed',
            <Package className="h-4 w-4" />,
            step.materialsNeeded || [],
            editedMaterials,
            setEditedMaterials,
            'green'
          )}

          {renderCollapsibleSection(
            'checkpoints',
            'Inspection Checkpoints',
            <CheckCircle2 className="h-4 w-4" />,
            step.inspectionCheckpoints || [],
            editedCheckpoints,
            setEditedCheckpoints,
            'purple'
          )}

          {renderCollapsibleSection(
            'qualifications',
            'Required Qualifications',
            <GraduationCap className="h-4 w-4" />,
            step.qualifications || [],
            editedQualifications,
            setEditedQualifications,
            'cyan'
          )}

          {renderCollapsibleSection(
            'defectCodes',
            'Defect Codes',
            <AlertCircle className="h-4 w-4" />,
            step.defectCodes || [],
            editedDefectCodes,
            setEditedDefectCodes,
            'red'
          )}
        </div>

        {/* Action Buttons */}
        {(onUpdate || onDelete || onMoveUp || onMoveDown) && (
          <div className={cn(
            "pt-4 border-t border-border/50 flex gap-2",
            isMobile && "flex-col"
          )}>
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  className={cn(
                    "bg-green-600 hover:bg-green-700 text-white",
                    isMobile && "w-full"
                  )}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className={cn(isMobile && "w-full")}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <>
                {onUpdate && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size={isMobile ? "default" : "sm"}
                    className={cn(isMobile && "w-full")}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
                
                {(onMoveUp || onMoveDown) && (
                  <div className={cn("flex gap-2", isMobile && "w-full")}>
                    {onMoveUp && (
                      <Button
                        onClick={onMoveUp}
                        variant="outline"
                        size={isMobile ? "default" : "sm"}
                        className={cn(isMobile && "flex-1")}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                    )}
                    {onMoveDown && (
                      <Button
                        onClick={onMoveDown}
                        variant="outline"
                        size={isMobile ? "default" : "sm"}
                        className={cn(isMobile && "flex-1")}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}

                {onDelete && (
                  <>
                    {showDeleteConfirm ? (
                      <div className={cn("flex gap-2", isMobile && "w-full flex-col")}>
                        <Button
                          onClick={handleDelete}
                          variant="destructive"
                          size={isMobile ? "default" : "sm"}
                          className={cn(isMobile && "w-full")}
                        >
                          Confirm Delete
                        </Button>
                        <Button
                          onClick={() => setShowDeleteConfirm(false)}
                          variant="outline"
                          size={isMobile ? "default" : "sm"}
                          className={cn(isMobile && "w-full")}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setShowDeleteConfirm(true)}
                        variant="outline"
                        size={isMobile ? "default" : "sm"}
                        className={cn(
                          "text-destructive hover:bg-destructive/10 border-destructive/30",
                          isMobile && "w-full"
                        )}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
