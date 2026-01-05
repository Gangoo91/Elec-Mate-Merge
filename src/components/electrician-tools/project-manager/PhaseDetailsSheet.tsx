import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users, 
  Package, 
  AlertCircle,
  Lightbulb,
  XCircle,
  ChevronRight
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PhaseDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phase: any;
  phaseNumber: number;
}

export const PhaseDetailsSheet = ({ open, onOpenChange, phase, phaseNumber }: PhaseDetailsSheetProps) => {
  if (!phase) return null;

  const phaseName = phase.phaseName || phase.phase || `Phase ${phaseNumber}`;
  const isCritical = phase.criticalPath || false;

  // Extract structured sections from response text if available
  const extractSection = (text: string, sectionTitle: string): string | null => {
    if (!text) return null;
    const regex = new RegExp(`\\*\\*${sectionTitle}:?\\*\\*([\\s\\S]*?)(?=\\n\\*\\*|$)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  };

  const responseText = phase.description || '';
  const whyThisOrder = extractSection(responseText, 'WHY THIS ORDER');
  const beforePhase = extractSection(responseText, 'BEFORE THIS PHASE');
  const afterPhase = extractSection(responseText, 'AFTER THIS PHASE');
  const materialOrdering = extractSection(responseText, 'MATERIAL ORDERING');
  const tradeCoordination = extractSection(responseText, 'TRADE COORDINATION');
  const clientImpact = extractSection(responseText, 'CLIENT IMPACT');
  const lessonsLearned = extractSection(responseText, 'LESSONS LEARNED');
  const contingencies = extractSection(responseText, 'CONTINGENCY');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh] p-0">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {/* Header */}
            <SheetHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                  isCritical 
                    ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-foreground' 
                    : 'bg-gradient-to-br from-elec-yellow to-yellow-400 text-gray-900'
                }`}>
                  {phaseNumber}
                </div>
                <div>
                  <SheetTitle className="text-left text-xl">{phaseName}</SheetTitle>
                  <SheetDescription className="text-left">
                    {phase.duration || 1} {phase.durationUnit || 'days'}
                    {isCritical && (
                      <Badge variant="outline" className="ml-2 bg-pink-500/20 text-pink-400 border-pink-500/40">
                        Critical Path
                      </Badge>
                    )}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <Separator />

            {/* WHY THIS ORDER - Most Important */}
            {whyThisOrder && (
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <h3 className="font-bold text-base text-amber-400">Why This Order?</h3>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                  <ReactMarkdown>{whyThisOrder}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Tasks Breakdown */}
            {phase.tasks && phase.tasks.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <h3 className="font-bold text-base">Task Breakdown</h3>
                </div>
                <div className="space-y-2">
                  {phase.tasks.map((task: any, idx: number) => {
                    const taskText = typeof task === 'string' ? task : task.task || task.name || '';
                    return (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{taskText}</p>
                          {typeof task === 'object' && task.duration && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {task.duration}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* BEFORE THIS PHASE */}
            {beforePhase && (
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-blue-400" />
                  <h3 className="font-bold text-base text-blue-400">Before This Phase</h3>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                  <ReactMarkdown>{beforePhase}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* AFTER THIS PHASE */}
            {afterPhase && (
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <ChevronRight className="h-5 w-5 text-purple-400" />
                  <h3 className="font-bold text-base text-purple-400">After This Phase</h3>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                  <ReactMarkdown>{afterPhase}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* MATERIAL ORDERING */}
            {materialOrdering && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-5 w-5 text-elec-yellow" />
                  <h3 className="font-bold text-base">Material Ordering</h3>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed p-4 rounded-lg bg-muted/30">
                  <ReactMarkdown>{materialOrdering}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* TRADE COORDINATION */}
            {tradeCoordination && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-green-400" />
                  <h3 className="font-bold text-base">Trade Coordination</h3>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed p-4 rounded-lg bg-muted/30">
                  <ReactMarkdown>{tradeCoordination}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* CLIENT IMPACT */}
            {clientImpact && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h3 className="font-bold text-base text-red-400">Client Impact Warnings</h3>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                  <ReactMarkdown>{clientImpact}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* LESSONS LEARNED */}
            {lessonsLearned && (
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-orange-400" />
                  <h3 className="font-bold text-base text-orange-400">Lessons Learned</h3>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                  <ReactMarkdown>{lessonsLearned}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* CONTINGENCIES */}
            {contingencies && (
              <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="h-5 w-5 text-pink-400" />
                  <h3 className="font-bold text-base text-pink-400">Contingency Planning</h3>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                  <ReactMarkdown>{contingencies}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Dependencies */}
            {phase.dependencies && phase.dependencies.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-bold text-base">Dependencies</h3>
                </div>
                <div className="space-y-1">
                  {phase.dependencies.map((dep: string, idx: number) => (
                    <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2 p-2 rounded bg-muted/30">
                      <ChevronRight className="h-4 w-4" />
                      {dep}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
