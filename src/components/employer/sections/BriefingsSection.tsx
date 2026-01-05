import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Plus,
  Calendar,
  ClipboardCheck,
  QrCode,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  UserCheck
} from "lucide-react";

const briefings = [
  { id: "1", title: "Weekly Safety Briefing", date: "2024-02-12", attendees: 5, totalTeam: 6, status: "Completed", type: "Safety" },
  { id: "2", title: "New Site Induction - Barratt Homes", date: "2024-02-10", attendees: 4, totalTeam: 5, status: "Completed", type: "Induction" },
  { id: "3", title: "Toolbox Talk: Working at Height", date: "2024-02-15", attendees: 0, totalTeam: 6, status: "Scheduled", type: "Toolbox Talk" },
  { id: "4", title: "Emergency Procedures Update", date: "2024-02-08", attendees: 6, totalTeam: 6, status: "Completed", type: "Safety" },
  { id: "5", title: "Toolbox Talk: Safe Isolation", date: "2024-02-20", attendees: 0, totalTeam: 6, status: "Scheduled", type: "Toolbox Talk" },
];

const briefingTemplates = [
  { id: "1", name: "Weekly Safety Briefing", description: "Standard weekly safety discussion", category: "Safety" },
  { id: "2", name: "Site Induction", description: "New site induction checklist", category: "Induction" },
  { id: "3", name: "Toolbox Talk - General", description: "Generic toolbox talk template", category: "Toolbox Talk" },
  { id: "4", name: "Emergency Procedures", description: "Emergency response briefing", category: "Safety" },
  { id: "5", name: "PPE Reminder", description: "Personal protective equipment", category: "Safety" },
];

export function BriefingsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const completedBriefings = briefings.filter(b => b.status === "Completed").length;
  const scheduledBriefings = briefings.filter(b => b.status === "Scheduled").length;
  const avgAttendance = Math.round(
    (briefings.filter(b => b.status === "Completed").reduce((sum, b) => sum + (b.attendees / b.totalTeam), 0) / completedBriefings) * 100
  ) || 0;

  const filteredBriefings = briefings.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Safety Briefings"
        description="Toolbox talks, inductions, and safety briefings"
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search briefings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{completedBriefings}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{scheduledBriefings}</p>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">{avgAttendance}%</p>
              <p className="text-xs text-muted-foreground">Attendance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FeatureTile
            icon={Plus}
            title="New Briefing"
            description="Schedule a briefing"
            onClick={() => {}}
            compact
          />
          <FeatureTile
            icon={QrCode}
            title="QR Attendance"
            description="Generate QR code"
            onClick={() => {}}
            compact
          />
          <FeatureTile
            icon={ClipboardCheck}
            title="Sign-off Sheet"
            description="Record attendance"
            onClick={() => {}}
            compact
          />
          <FeatureTile
            icon={FileText}
            title="Templates"
            description="Briefing templates"
            onClick={() => {}}
            compact
          />
        </div>
      </div>

      {/* Upcoming Briefings */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-warning rounded-full"></span>
          Upcoming
        </h2>
        <div className="space-y-2">
          {filteredBriefings.filter(b => b.status === "Scheduled").map((briefing) => (
            <Card key={briefing.id} className="hover:bg-muted/50 transition-colors cursor-pointer border-l-4 border-l-warning">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-warning/10">
                      <Calendar className="h-4 w-4 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm md:text-base">{briefing.title}</p>
                      <p className="text-xs text-muted-foreground">{briefing.type} • {briefing.date}</p>
                      <p className="text-xs text-muted-foreground mt-1">{briefing.totalTeam} team members invited</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning shrink-0">
                    Scheduled
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Briefings */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Recent Briefings
        </h2>
        <div className="space-y-2">
          {filteredBriefings.filter(b => b.status === "Completed").map((briefing) => (
            <Card key={briefing.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      <Users className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm md:text-base">{briefing.title}</p>
                      <p className="text-xs text-muted-foreground">{briefing.type} • {briefing.date}</p>
                      <p className="text-xs text-muted-foreground mt-1">{briefing.attendees}/{briefing.totalTeam} attended</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success shrink-0">
                    {Math.round((briefing.attendees / briefing.totalTeam) * 100)}%
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
