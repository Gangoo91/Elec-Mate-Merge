import { useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { shareContent } from '@/utils/share';
import { Button } from '@/components/ui/button';
import { Download, Share2, Trash2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { siteAssessmentChecklist, getTotalItemCount } from './data/siteAssessmentChecklist';
import type { useAssessmentProgress } from './hooks/useAssessmentProgress';

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
    const categories = siteAssessmentChecklist.map((cat) => ({
      name: cat.name,
      items: cat.items.map((item) => ({ id: item.id, text: item.text })),
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
    toast({ title: 'Report downloaded', description: 'Your assessment report has been saved.' });
  };

  const handleShare = async () => {
    const categories = siteAssessmentChecklist.map((cat) => ({
      name: cat.name,
      items: cat.items.map((item) => ({ id: item.id, text: item.text })),
    }));
    const text = progress.exportAsText(totalCount, categories);

    await shareContent({
      title: 'Site Assessment Report',
      text,
      onFallback: async () => {
        const ok = await copyToClipboard(text);
        if (ok) {
          toast({
            title: 'Copied to clipboard',
            description: 'Assessment report copied. You can paste it anywhere.',
          });
        } else {
          toast({
            title: 'Could not copy',
            description: 'Please use the download button instead.',
            variant: 'destructive',
          });
        }
      },
    });
  };

  const handleClear = () => {
    progress.clearProgress();
    setShowConfirm(false);
    toast({ title: 'Progress cleared', description: 'All checklist progress has been reset.' });
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Summary
        </span>
        <span className="text-[12px] text-white/85 font-mono">
          {progress.completedCount}/{totalCount} · {percentage}%
        </span>
      </div>

      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {['pre-job', 'site-condition', 'electrical'].map((section) => {
          const cats = siteAssessmentChecklist.filter((c) => c.section === section);
          const sectionIds = cats.flatMap((c) => c.items.map((i) => i.id));
          const sectionProgress = progress.getCategoryProgress(sectionIds);
          const sectionLabelsMap: Record<string, string> = {
            'pre-job': 'Pre-Job',
            'site-condition': 'Site',
            electrical: 'Electrical',
          };
          return (
            <div
              key={section}
              className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center"
            >
              <div className="text-[14px] font-medium text-white font-mono">
                {sectionProgress.checked}/{sectionProgress.total}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">
                {sectionLabelsMap[section]}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleExport}
          disabled={progress.completedCount === 0}
          className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-30"
        >
          {allDone ? <CheckCircle className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
          Export
        </Button>
        <Button
          onClick={handleShare}
          disabled={progress.completedCount === 0}
          variant="outline"
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation disabled:opacity-30"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        {!showConfirm ? (
          <Button
            onClick={() => setShowConfirm(true)}
            disabled={progress.completedCount === 0}
            variant="outline"
            className="h-11 border-red-500/30 hover:bg-red-500/[0.04] text-red-300 touch-manipulation disabled:opacity-30"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleClear}
            className="h-11 bg-red-500 hover:bg-red-500/90 text-white font-semibold touch-manipulation active:scale-[0.98]"
          >
            Confirm clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default SiteAssessmentSummary;
