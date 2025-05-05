
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Trash2, Eye } from "lucide-react";
import { TrainingEvidenceItem } from "@/types/time-tracking";

interface EvidenceItemProps {
  item: TrainingEvidenceItem;
  onDelete: (id: string) => void;
}

const EvidenceItem = ({ item, onDelete }: EvidenceItemProps) => {
  return (
    <Card key={item.id} className="border-elec-yellow/20 bg-elec-dark">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              <h4 className="font-medium">{item.title}</h4>
            </div>
            <div className="flex items-center mt-1">
              <span className="bg-elec-yellow/10 text-elec-yellow text-xs px-2 py-0.5 rounded-full">
                {item.type}
              </span>
              <span className="text-xs text-muted-foreground ml-3 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {item.date}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
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
        
        <p className="mt-3 text-sm">
          {item.description}
        </p>
        
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-1">Attached files:</p>
          <div className="flex flex-wrap gap-2">
            {item.files.map((file: string) => (
              <div key={file} className="bg-elec-dark border border-elec-yellow/20 rounded px-2 py-1 text-xs flex items-center">
                <FileText className="h-3 w-3 mr-1.5" />
                {file}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvidenceItem;
