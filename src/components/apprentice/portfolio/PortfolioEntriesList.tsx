import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  FileText,
  Star
} from "lucide-react";
import { PortfolioEntry, PortfolioCategory } from "@/types/portfolio";
import PortfolioEntryForm from "./PortfolioEntryForm";
import PortfolioEntryViewDialog from "./PortfolioEntryViewDialog";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";

interface PortfolioEntriesListProps {
  entries: PortfolioEntry[];
  onUpdateEntry: (entryId: string, updates: Partial<PortfolioEntry>) => void;
  onDeleteEntry: (entryId: string) => void;
}

const PortfolioEntriesList = ({ entries, onUpdateEntry, onDeleteEntry }: PortfolioEntriesListProps) => {
  const { categories } = usePortfolioData();
  const [editingEntry, setEditingEntry] = useState<PortfolioEntry | null>(null);
  const [viewingEntry, setViewingEntry] = useState<PortfolioEntry | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'yellow';
      case 'reviewed': return 'gold';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'reviewed': return 'Reviewed';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (entries.length === 0) {
    return (
      <Card className="border-dashed border-2 border-elec-yellow/20 bg-elec-gray">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow/40 mb-4" />
          <h3 className="text-lg sm:text-xl font-medium mb-2 text-center">No portfolio entries found</h3>
          <p className="text-muted-foreground text-center text-sm max-w-md">
            Start building your portfolio by adding your first entry. Document your learning journey and professional development.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <Card key={entry.id} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg mb-2 leading-tight">{entry.title}</CardTitle>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    {formatDate(entry.dateCreated)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    {Math.floor(entry.timeSpent / 60)}h {entry.timeSpent % 60}m
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                    {entry.selfAssessment}/5
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-shrink-0">
                <Badge variant={getStatusColor(entry.status)} className="text-xs">
                  {getStatusText(entry.status)}
                </Badge>
                <Badge variant="outline" style={{ backgroundColor: `${entry.category.color}20` }} className="text-xs">
                  {entry.category.name}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 space-y-3">
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {entry.description}
            </p>
            
            {/* Skills */}
            {entry.skills.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-1">
                  {entry.skills.slice(0, 2).map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {entry.skills.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{entry.skills.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* Evidence Files */}
            {entry.evidenceFiles.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground">
                  {entry.evidenceFiles.length} evidence file{entry.evidenceFiles.length !== 1 ? 's' : ''} attached
                </p>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setViewingEntry(entry)}
                className="gap-1 flex-1 sm:flex-none"
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                View
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setEditingEntry(entry)}
                className="gap-1 flex-1 sm:flex-none"
              >
                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this portfolio entry?')) {
                    onDeleteEntry(entry.id);
                  }
                }}
                className="gap-1 text-red-400 hover:text-red-300 flex-1 sm:flex-none"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Edit Form Dialog */}
      {editingEntry && (
        <PortfolioEntryForm
          categories={categories}
          initialData={editingEntry}
          onSubmit={(updatedData) => {
            onUpdateEntry(editingEntry.id, updatedData);
            setEditingEntry(null);
          }}
          onCancel={() => setEditingEntry(null)}
        />
      )}

      {/* View Dialog */}
      {viewingEntry && (
        <PortfolioEntryViewDialog
          entry={viewingEntry}
          onClose={() => setViewingEntry(null)}
          onEdit={() => {
            setEditingEntry(viewingEntry);
            setViewingEntry(null);
          }}
        />
      )}
    </div>
  );
};

export default PortfolioEntriesList;