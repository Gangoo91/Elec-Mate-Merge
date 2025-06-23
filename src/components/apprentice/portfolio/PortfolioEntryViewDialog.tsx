
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Edit, 
  Calendar, 
  Clock, 
  Star, 
  FileText, 
  Download,
  Tag
} from "lucide-react";
import { PortfolioEntry } from "@/types/portfolio";

interface PortfolioEntryViewDialogProps {
  entry: PortfolioEntry;
  onClose: () => void;
  onEdit: () => void;
}

const PortfolioEntryViewDialog = ({ entry, onClose, onEdit }: PortfolioEntryViewDialogProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'yellow';
      case 'reviewed': return 'gold';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl mb-2">{entry.title}</DialogTitle>
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
                {entry.status}
              </Badge>
              <Badge variant="outline" style={{ backgroundColor: `${entry.category.color}20` }}>
                {entry.category.name}
              </Badge>
              <Button onClick={onEdit} size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{entry.description}</p>
            </CardContent>
          </Card>

          {/* Skills & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entry.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills Demonstrated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {entry.skills.map(skill => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {entry.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map(tag => (
                      <Badge key={tag} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Learning Outcomes */}
          {entry.learningOutcomes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {entry.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Assessment Criteria */}
          {entry.assessmentCriteria.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assessment Criteria Met</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {entry.assessmentCriteria.map((criterion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Reflection */}
          {entry.reflection && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{entry.reflection}</p>
              </CardContent>
            </Card>
          )}

          {/* Evidence Files */}
          {entry.evidenceFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Evidence Files
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {entry.evidenceFiles.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-elec-yellow" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB • {new Date(file.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Supervisor Feedback */}
          {entry.supervisorFeedback && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supervisor Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{entry.supervisorFeedback}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioEntryViewDialog;
