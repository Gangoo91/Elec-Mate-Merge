
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Plus, Eye, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NearMissReport {
  id: string;
  date: string;
  time: string;
  location: string;
  reporter: string;
  category: string;
  severity: string;
  description: string;
  potentialConsequences: string;
  immediateActions: string;
  preventiveMeasures: string;
  status: string;
  followUpRequired: boolean;
}

const NearMissReporting = () => {
  const [reports, setReports] = useState<NearMissReport[]>([
    {
      id: "1",
      date: "2024-01-15",
      time: "14:30",
      location: "Main electrical panel room",
      reporter: "John Smith",
      category: "Electrical",
      severity: "High",
      description: "Live conductor was exposed due to damaged cable sheath. Noticed during routine inspection before starting work.",
      potentialConsequences: "Electric shock, potential fatality if touched",
      immediateActions: "Area cordoned off, warning signs placed, supervisor notified immediately",
      preventiveMeasures: "Cable to be replaced, regular inspection schedule to be implemented",
      status: "Under Review",
      followUpRequired: true
    }
  ]);

  const [newReport, setNewReport] = useState<Partial<NearMissReport>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    location: "",
    reporter: "",
    category: "",
    severity: "",
    description: "",
    potentialConsequences: "",
    immediateActions: "",
    preventiveMeasures: "",
    followUpRequired: false
  });

  const [showForm, setShowForm] = useState(false);

  const categories = [
    "Electrical",
    "Working at Height", 
    "Manual Handling",
    "Chemical/Hazardous Substances",
    "Fire Safety",
    "Equipment/Tools",
    "Environmental",
    "Human Factors"
  ];

  const severityLevels = ["Low", "Medium", "High", "Critical"];
  const statusOptions = ["Reported", "Under Review", "Action Taken", "Closed"];

  const submitReport = () => {
    if (!newReport.location || !newReport.description || !newReport.category) {
      return;
    }

    const report: NearMissReport = {
      id: Date.now().toString(),
      date: newReport.date || new Date().toISOString().split('T')[0],
      time: newReport.time || new Date().toTimeString().slice(0, 5),
      location: newReport.location,
      reporter: newReport.reporter || "Current User",
      category: newReport.category,
      severity: newReport.severity || "Medium",
      description: newReport.description,
      potentialConsequences: newReport.potentialConsequences || "",
      immediateActions: newReport.immediateActions || "",
      preventiveMeasures: newReport.preventiveMeasures || "",
      status: "Reported",
      followUpRequired: newReport.followUpRequired || false
    };

    setReports(prev => [report, ...prev]);
    setNewReport({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      location: "",
      reporter: "",
      category: "",
      severity: "",
      description: "",
      potentialConsequences: "",
      immediateActions: "",
      preventiveMeasures: "",
      followUpRequired: false
    });
    setShowForm(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "High": return "bg-orange-500";
      case "Critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Reported": return "bg-blue-500";
      case "Under Review": return "bg-yellow-500";
      case "Action Taken": return "bg-purple-500";
      case "Closed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{reports.length}</div>
            <div className="text-sm text-muted-foreground">Total Reports</div>
          </CardContent>
        </Card>
        <Card className="border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {reports.filter(r => r.severity === "High" || r.severity === "Critical").length}
            </div>
            <div className="text-sm text-muted-foreground">High Risk</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {reports.filter(r => r.status === "Under Review").length}
            </div>
            <div className="text-sm text-muted-foreground">Under Review</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {reports.filter(r => r.followUpRequired).length}
            </div>
            <div className="text-sm text-muted-foreground">Follow-up Required</div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Report Button */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Near Miss Reporting
            </CardTitle>
            <Button onClick={() => setShowForm(!showForm)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Report Near Miss
            </Button>
          </div>
        </CardHeader>
        {showForm && (
          <CardContent className="space-y-4 border-t border-elec-yellow/20 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newReport.date}
                  onChange={(e) => setNewReport(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newReport.time}
                  onChange={(e) => setNewReport(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newReport.location}
                  onChange={(e) => setNewReport(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Where did this occur?"
                />
              </div>
              <div>
                <Label htmlFor="reporter">Reporter</Label>
                <Input
                  id="reporter"
                  value={newReport.reporter}
                  onChange={(e) => setNewReport(prev => ({ ...prev, reporter: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={newReport.category} 
                  onValueChange={(value) => setNewReport(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="severity">Severity Level</Label>
                <Select 
                  value={newReport.severity} 
                  onValueChange={(value) => setNewReport(prev => ({ ...prev, severity: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {severityLevels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description of Near Miss *</Label>
              <Textarea
                id="description"
                value={newReport.description}
                onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what happened or could have happened"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="consequences">Potential Consequences</Label>
              <Textarea
                id="consequences"
                value={newReport.potentialConsequences}
                onChange={(e) => setNewReport(prev => ({ ...prev, potentialConsequences: e.target.value }))}
                placeholder="What could have resulted from this near miss?"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="immediateActions">Immediate Actions Taken</Label>
              <Textarea
                id="immediateActions"
                value={newReport.immediateActions}
                onChange={(e) => setNewReport(prev => ({ ...prev, immediateActions: e.target.value }))}
                placeholder="What immediate steps were taken?"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="preventive">Suggested Preventive Measures</Label>
              <Textarea
                id="preventive"
                value={newReport.preventiveMeasures}
                onChange={(e) => setNewReport(prev => ({ ...prev, preventiveMeasures: e.target.value }))}
                placeholder="How can this be prevented in future?"
                rows={2}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="followUp"
                checked={newReport.followUpRequired}
                onChange={(e) => setNewReport(prev => ({ ...prev, followUpRequired: e.target.checked }))}
              />
              <Label htmlFor="followUp">Follow-up action required</Label>
            </div>

            <div className="flex gap-4">
              <Button onClick={submitReport} className="flex-1">
                Submit Report
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Reports List */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Near Miss Reports ({reports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No near miss reports yet. Use the "Report Near Miss" button to submit your first report.
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="border-elec-yellow/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(report.severity)}>
                          {report.severity}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <Badge variant="outline">{report.category}</Badge>
                        {report.followUpRequired && (
                          <Badge variant="outline" className="text-amber-400">
                            Follow-up Required
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Date & Time</div>
                        <div className="text-sm">{report.date} at {report.time}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Location</div>
                        <div className="text-sm">{report.location}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Reported By</div>
                        <div className="text-sm">{report.reporter}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-muted-foreground font-medium">Description</div>
                        <div className="text-sm">{report.description}</div>
                      </div>
                      
                      {report.potentialConsequences && (
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Potential Consequences</div>
                          <div className="text-sm text-orange-300">{report.potentialConsequences}</div>
                        </div>
                      )}
                      
                      {report.immediateActions && (
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Immediate Actions</div>
                          <div className="text-sm text-green-300">{report.immediateActions}</div>
                        </div>
                      )}
                      
                      {report.preventiveMeasures && (
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Preventive Measures</div>
                          <div className="text-sm text-blue-300">{report.preventiveMeasures}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NearMissReporting;
