
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckSquare } from "lucide-react";
import { TimeEntry } from "@/types/time-tracking";

interface TimeEntryCardProps {
  entry: TimeEntry;
}

const TimeEntryCard = ({ entry }: TimeEntryCardProps) => {
  return (
    <Card key={entry.id} className={`border-elec-yellow/20 ${entry.isAutomatic ? 'bg-elec-dark' : 'bg-elec-gray'}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {entry.isQuiz && <CheckSquare className="h-4 w-4 text-elec-yellow" />}
              {entry.isAutomatic && !entry.isQuiz && <BookOpen className="h-4 w-4 text-elec-yellow" />}
              <h4 className="font-medium">{entry.activity}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{entry.notes}</p>
            {entry.isQuiz && entry.score !== undefined && entry.totalQuestions !== undefined && (
              <div className="mt-2 text-sm">
                <div className="w-full bg-elec-gray/50 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full ${(entry.score / entry.totalQuestions) >= 0.7 ? 'bg-green-500' : 'bg-amber-500'}`} 
                    style={{ width: `${(entry.score / entry.totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="font-semibold">
              {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
            </div>
            <p className="text-xs text-muted-foreground">{entry.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeEntryCard;
