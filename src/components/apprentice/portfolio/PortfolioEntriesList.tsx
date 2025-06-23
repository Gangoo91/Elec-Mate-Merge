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
      <Card className="border-dashed border-2 border-elec-yellow/20">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <FileText className="h-12 w-12 text-elec-yellow/40 mb-4" />
          <h3 className="text-xl font-medium mb-2">No portfolio entries found</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Start building your portfolio by adding your first entry. Document your learning journey and professional development.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{entry.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(entry.dateCreated)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {Math.floor(entry.timeSpent / 60)}h {entry.timeSpent % 60}m
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {entry.selfAssessment}/5
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(entry.status)}>
                  {getStatusText(entry.status)}
                </Badge>
                <Badge variant="outline" style={{ backgroundColor: `${entry.category.color}20` }}>
                  {entry.category.name}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {entry.description}
            </p>
            
            {/* Skills */}
            {entry.skills.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {entry.skills.slice(0, 3).map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {entry.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{entry.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* Evidence Files */}
            {entry.evidenceFiles.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1">
                  {entry.evidenceFiles.length} evidence file{entry.evidenceFiles.length !== 1 ? 's' : ''} attached
                </p>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setViewingEntry(entry)}
                className="gap-1"
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setEditingEntry(entry)}
                className="gap-1"
              >
                <Edit className="h-4 w-4" />
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
                className="gap-1 text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
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
