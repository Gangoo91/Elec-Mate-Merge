import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download, Share2, Trash2, CheckCircle, AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { siteAssessmentChecklist, getTotalItemCount } from "./data/siteAssessmentChecklist";
import type { useAssessmentProgress } from "./hooks/useAssessmentProgress";

interface SiteAssessmentSummaryProps {
  progress: ReturnType<typeof useAssessmentProgress>;
}

const SiteAssessmentSummary = ({ progress }: SiteAssessmentSummaryProps) => {
  const { toast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const totalCount = getTotalItemCount();
  const percentage = totalCount > 0 ? Math.round((progress.completedCount / totalCount) * 100) : 0;
  const allDone = progress.completedCount === totalCount;

  const handleExport = () => {
    const categories = siteAssessmentChecklist.map(cat => ({
      name: cat.name,
      items: cat.items.map(item => ({ id: item.id, text: item.text })),
    }));
    const text = progress.exportAsText(totalCount, categories);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `site-assessment-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: "Report downloaded", description: "Your assessment report has been saved." });
  };

  const handleShare = async () => {
    const categories = siteAssessmentChecklist.map(cat => ({
      name: cat.name,
      items: cat.items.map(item => ({ id: item.id, text: item.text })),
    }));
    const text = progress.exportAsText(totalCount, categories);

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Site Assessment Report',
          text,
        });
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard", description: "Assessment report copied. You can paste it anywhere." });
      } catch {
        toast({ title: "Could not copy", description: "Please use the download button instead.", variant: "destructive" });
      }
    }
  };

  const handleClear = () => {
    progress.clearProgress();
    setShowConfirm(false);
    toast({ title: "Progress cleared", description: "All checklist progress has been reset." });
  };

  return (
    <Card className="bg-gradient-to-br from-white/5 to-white/3 border-white/10">
      <CardContent className="p-4 space-y-4">
        {/* Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {allDone ? (
              <CheckCircle className="h-6 w-6 text-green-400" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            )}
            <div>
              <div className="text-lg font-bold text-white">{progress.completedCount}/{totalCount}</div>
              <div className="text-xs text-white">checks completed</div>
            </div>
          </div>
          <Badge className={`${allDone ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30'}`}>
            {percentage}%
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              allDone
                ? 'bg-gradient-to-r from-green-500 to-green-400'
                : 'bg-gradient-to-r from-elec-yellow to-elec-yellow/70'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Category breakdown */}
        <div className="grid grid-cols-3 gap-2">
          {['pre-job', 'site-condition', 'electrical'].map(section => {
            const cats = siteAssessmentChecklist.filter(c => c.section === section);
            const sectionIds = cats.flatMap(c => c.items.map(i => i.id));
            const sectionProgress = progress.getCategoryProgress(sectionIds);
            const sectionDone = sectionProgress.checked === sectionProgress.total;
            const sectionLabels: Record<string, string> = {
              'pre-job': 'Pre-Job',
              'site-condition': 'Site',
              'electrical': 'Electrical',
            };
            return (
              <div key={section} className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                <div className={`text-sm font-bold ${sectionDone ? 'text-green-400' : 'text-white'}`}>
                  {sectionProgress.checked}/{sectionProgress.total}
                </div>
                <div className="text-xs text-white">{sectionLabels[section]}</div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleExport}
            disabled={progress.completedCount === 0}
            className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-95 transition-all disabled:opacity-30"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={handleShare}
            disabled={progress.completedCount === 0}
            variant="outline"
            className="h-11 border-white/20 hover:bg-white/5 touch-manipulation active:scale-95 transition-all disabled:opacity-30"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          {!showConfirm ? (
            <Button
              onClick={() => setShowConfirm(true)}
              disabled={progress.completedCount === 0}
              variant="outline"
              className="h-11 border-red-500/30 hover:bg-red-500/10 text-red-400 touch-manipulation active:scale-95 transition-all disabled:opacity-30"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleClear}
              className="h-11 bg-red-500 hover:bg-red-500/90 text-white font-semibold touch-manipulation active:scale-95 transition-all"
            >
              Confirm Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteAssessmentSummary;
