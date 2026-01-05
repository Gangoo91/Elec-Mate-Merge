
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Trash2, Eye, FolderPlus, Loader2, CheckCircle } from "lucide-react";
import { TrainingEvidenceItem } from "@/types/time-tracking";
import { useEvidenceToPortfolio } from "@/hooks/useEvidenceToPortfolio";
import { useState } from "react";

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
    <Card key={item.id} className="border-elec-yellow/20 bg-elec-dark">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow shrink-0" />
              <h4 className="font-medium truncate">{item.title}</h4>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="bg-elec-yellow/10 text-elec-yellow text-xs px-2 py-0.5 rounded-full">
                {item.type}
              </span>
              <span className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {item.date}
              </span>
              {isConverted && (
                <span className="bg-green-500/10 text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  In Portfolio
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-1 shrink-0">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="mt-3 text-sm line-clamp-2">
          {item.description}
        </p>

        {item.files.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-1">Attached files:</p>
            <div className="flex flex-wrap gap-2">
              {item.files.map((file: string) => (
                <div key={file} className="bg-elec-dark border border-elec-yellow/20 rounded px-2 py-1 text-xs flex items-center">
                  <FileText className="h-3 w-3 mr-1.5" />
                  <span className="truncate max-w-[150px]">{file}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Convert to Portfolio Button */}
        <div className="mt-4 pt-3 border-t border-elec-yellow/10">
          <Button
            size="sm"
            variant="outline"
            onClick={handleConvert}
            disabled={isThisItemConverting || isConverted}
            className="w-full sm:w-auto border-elec-yellow/30 hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
          >
            {isThisItemConverting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Converting...
              </>
            ) : isConverted ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                Added to Portfolio
              </>
            ) : (
              <>
                <FolderPlus className="h-4 w-4 mr-2" />
                Add to Portfolio
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvidenceItem;
