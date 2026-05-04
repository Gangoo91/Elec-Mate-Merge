import { Button } from '@/components/ui/button';
import { FileText, Calendar, Trash2, Eye, FolderPlus, Loader2, CheckCircle } from 'lucide-react';
import { TrainingEvidenceItem } from '@/types/time-tracking';
import { useEvidenceToPortfolio } from '@/hooks/useEvidenceToPortfolio';
import { useState } from 'react';

interface EvidenceItemProps {
  item: TrainingEvidenceItem;
  onDelete: (id: string) => void;
}

const EvidenceItem = ({ item, onDelete }: EvidenceItemProps) => {
  const { convertEvidenceToPortfolio, isConverting, convertingId } = useEvidenceToPortfolio();
  const [isConverted, setIsConverted] = useState(false);
  const isThisItemConverting = isConverting && convertingId === item.id;

  const handleConvert = async () => {
    const success = await convertEvidenceToPortfolio(item);
    if (success) {
      setIsConverted(true);
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-[15px] font-medium text-white truncate">{item.title}</h4>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
              {item.type}
            </span>
            <span className="text-[11px] text-white/55 flex items-center font-mono">
              <Calendar className="h-3 w-3 mr-1" />
              {item.date}
            </span>
            {isConverted && (
              <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                In portfolio
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <Button
            size="sm"
            variant="ghost"
            className="h-9 w-9 p-0 text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-9 w-9 p-0 text-red-300 hover:text-red-200 hover:bg-red-500/[0.08] touch-manipulation"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-white/85 leading-relaxed line-clamp-2">
        {item.description}
      </p>

      {item.files.length > 0 && (
        <div className="mt-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Attached files
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {item.files.map((file: string) => (
              <div
                key={file}
                className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] flex items-center"
              >
                <FileText className="h-3 w-3 mr-1.5" />
                <span className="truncate max-w-[150px]">{file}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-white/[0.06]">
        <Button
          size="sm"
          variant="outline"
          onClick={handleConvert}
          disabled={isThisItemConverting || isConverted}
          className="w-full sm:w-auto h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          {isThisItemConverting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Converting...
            </>
          ) : isConverted ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Added to portfolio
            </>
          ) : (
            <>
              <FolderPlus className="h-4 w-4 mr-2" />
              Add to portfolio
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EvidenceItem;
