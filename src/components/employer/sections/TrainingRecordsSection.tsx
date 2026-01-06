import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Input } from "@/components/ui/input";
import { QuickStats, QuickStat } from "@/components/employer/QuickStats";
import {
  Award,
  GraduationCap,
  ClipboardList,
  BookOpen,
  Users,
  AlertTriangle,
  Search,
  CheckCircle2,
  Clock,
  TrendingUp
} from "lucide-react";
import { training } from "@/data/employerMockData";

const trainingDocuments = [
  { id: "1", name: "Training Matrix", category: "Planning", description: "Skills matrix per role", icon: ClipboardList },
  { id: "2", name: "Induction Checklist", category: "Onboarding", description: "New starter induction", icon: Users },
  { id: "3", name: "Toolbox Talk Record", category: "Safety", description: "Safety talk attendance", icon: BookOpen },
  { id: "4", name: "CPD Log", category: "Development", description: "Continuous professional development", icon: TrendingUp },
  { id: "5", name: "Skills Gap Assessment", category: "Planning", description: "Identify training needs", icon: AlertTriangle },
  { id: "6", name: "Apprenticeship Progress Log", category: "Apprentices", description: "Track apprentice progress", icon: GraduationCap },
  { id: "7", name: "Refresher Training Record", category: "Compliance", description: "Recurring training tracker", icon: Clock },
];

export function TrainingRecordsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const completedTraining = training.filter(t => t.status === "Completed").length;
  const inProgressTraining = training.filter(t => t.status === "In Progress").length;
  const pendingTraining = training.filter(t => t.status === "Pending").length;

  const filteredTraining = training.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDocuments = trainingDocuments.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Training Records"
        description="Training matrix, CPD logs, and competence tracking"
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search training..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Quick Stats */}
      <QuickStats
        stats={[
          {
            icon: CheckCircle2,
            value: completedTraining,
            label: "Completed",
            color: "green",
          },
          {
            icon: Clock,
            value: inProgressTraining,
            label: "In Progress",
            color: "yellow",
          },
          ...(pendingTraining > 0 ? [{
            icon: AlertTriangle,
            value: pendingTraining,
            label: "Pending",
            color: "orange" as const,
            pulse: true,
          }] : []),
        ]}
      />

      {/* Training Documents */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Documents & Templates
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredDocuments.map((doc) => (
            <FeatureTile
              key={doc.id}
              icon={doc.icon}
              title={doc.name}
              description={doc.description}
              onClick={() => {}}
              compact
            />
          ))}
        </div>
      </div>

      {/* Active Training */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Active Training
        </h2>
        <div className="space-y-2">
          {filteredTraining.map((item) => (
            <Card key={item.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      item.status === "Completed" 
                        ? "bg-success/10" 
                        : item.status === "In Progress"
                        ? "bg-elec-yellow/10"
                        : "bg-warning/10"
                    }`}>
                      <Award className={`h-4 w-4 ${
                        item.status === "Completed" 
                          ? "text-success" 
                          : item.status === "In Progress"
                          ? "text-elec-yellow"
                          : "text-warning"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm md:text-base">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.type} • {item.completedBy}/{item.employees} completed</p>
                      <p className="text-xs text-muted-foreground mt-1">Due {item.dueDate}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${
                    item.status === "Completed" 
                      ? "bg-success/10 text-success" 
                      : item.status === "In Progress"
                      ? "bg-elec-yellow/10 text-elec-yellow"
                      : "bg-warning/10 text-warning"
                  }`}>
                    {item.status}
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.status === "Completed" 
                        ? "bg-success" 
                        : item.status === "In Progress"
                        ? "bg-elec-yellow"
                        : "bg-warning"
                    }`}
                    style={{ width: `${(item.completedBy / item.employees) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
