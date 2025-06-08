
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, AlertTriangle, Shield, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const OnJobIncidentLogging = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    location: "",
    dateTime: "",
    severity: "",
    actionTaken: ""
  });

  const incidentTypes = [
    "Near Miss",
    "Unsafe Practice Observed", 
    "Faulty Equipment",
    "Safety Concern",
    "Environmental Hazard",
    "PPE Issue"
  ];

  const severityLevels = [
    "Low - No immediate danger",
    "Medium - Potential for harm",
    "High - Significant risk",
    "Critical - Immediate danger"
  ];

  const recentIncidents = [
    {
      id: 1,
      type: "Near Miss",
      description: "Cable tray not properly secured, could have fallen",
      date: "2024-01-15",
      severity: "Medium",
      status: "Reported"
    },
    {
      id: 2,
      type: "Faulty Equipment",
      description: "Multimeter giving inconsistent readings",
      date: "2024-01-14", 
      severity: "Low",
      status: "Resolved"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    console.log("Incident logged:", formData);
    setShowForm(false);
    setFormData({
      type: "",
      description: "",
      location: "",
      dateTime: "",
      severity: "",
      actionTaken: ""
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incident Logging Tool</h1>
          <p className="text-muted-foreground">Log near misses, unsafe practices, and equipment issues securely</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray cursor-pointer hover:bg-elec-gray/80 transition-colors"
              onClick={() => setShowForm(true)}>
          <CardHeader className="text-center">
            <AlertTriangle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Log Near Miss</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-elec-light/80">Report incidents that could have caused harm</p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray cursor-pointer hover:bg-elec-gray/80 transition-colors"
              onClick={() => setShowForm(true)}>
          <CardHeader className="text-center">
            <Shield className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Report Unsafe Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-elec-light/80">Document unsafe working conditions or practices</p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray cursor-pointer hover:bg-elec-gray/80 transition-colors"
              onClick={() => setShowForm(true)}>
          <CardHeader className="text-center">
            <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Equipment Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-elec-light/80">Report faulty or damaged equipment</p>
          </CardContent>
        </Card>
      </div>

      {/* Incident Form */}
      {showForm && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-elec-yellow" />
              Log New Incident
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Incident Type</label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      {incidentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Severity Level</label>
                  <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input 
                    placeholder="Where did this occur?"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date & Time</label>
                  <Input 
                    type="datetime-local"
                    value={formData.dateTime}
                    onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea 
                  placeholder="Describe what happened or what you observed..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Action Taken (if any)</label>
                <Textarea 
                  placeholder="What immediate action was taken to address the issue?"
                  value={formData.actionTaken}
                  onChange={(e) => setFormData({...formData, actionTaken: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Report
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Incidents */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Recent Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIncidents.map(incident => (
              <div key={incident.id} className="p-4 rounded-lg bg-elec-dark/30 border border-elec-yellow/10">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-orange-500/10 rounded text-orange-400">
                      {incident.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      incident.severity === 'Low' ? 'bg-green-500/10 text-green-400' :
                      incident.severity === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {incident.severity}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      incident.status === 'Resolved' ? 'bg-green-500/10 text-green-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                  <span className="text-xs text-elec-light/60">{incident.date}</span>
                </div>
                <p className="text-sm text-elec-light/80">{incident.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Why Report Incidents?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Benefits of Reporting</h3>
              <ul className="text-sm space-y-1 text-elec-light/80">
                <li>• Prevents future accidents</li>
                <li>• Improves workplace safety</li>
                <li>• Creates learning opportunities</li>
                <li>• Demonstrates safety consciousness</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Confidentiality</h3>
              <ul className="text-sm space-y-1 text-elec-light/80">
                <li>• All reports are stored securely</li>
                <li>• Anonymous reporting available</li>
                <li>• Focus on learning, not blame</li>
                <li>• Professional handling of all incidents</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobIncidentLogging;
