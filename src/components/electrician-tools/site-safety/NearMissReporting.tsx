
import { useState, useEffect } from "react";
import { hazardCategories } from "@/data/hazards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Plus, Eye, FileText, Camera, Upload, Loader2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface NearMissReport {
  id: string;
  incident_date: string;
  incident_time: string;
  location: string;
  reporter_name: string;
  category: string;
  severity: string;
  description: string;
  potential_consequences: string;
  immediate_actions: string;
  preventive_measures: string;
  status: string;
  follow_up_required: boolean;
  assigned_to?: string;
  due_date?: string;
  completed_date?: string;
  photos_attached: string[];
  created_at: string;
}

const NearMissReporting = () => {
  const [reports, setReports] = useState<NearMissReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [newReport, setNewReport] = useState<Partial<NearMissReport>>({
    incident_date: new Date().toISOString().split('T')[0],
    incident_time: new Date().toTimeString().slice(0, 5),
    location: "",
    reporter_name: "",
    category: "",
    severity: "",
    description: "",
    potential_consequences: "",
    immediate_actions: "",
    preventive_measures: "",
    follow_up_required: false,
    photos_attached: []
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('near_miss_reports')
        .select('*')
        .order('incident_date', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to load near miss reports",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<NearMissReport | null>(null);
  const [followUpData, setFollowUpData] = useState({
    assigned_to: "",
    due_date: "",
    notes: ""
  });

  // Use standardized categories from hazard database
  const categories = hazardCategories.map(cat => cat.name);

  const severityLevels = ["Low", "Medium", "High", "Critical"];
  const statusOptions = ["Reported", "Under Review", "Action Taken", "Closed"];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedPhotos.length > 5) {
      toast({
        title: "Error",
        description: "Maximum 5 photos allowed per report",
        variant: "destructive"
      });
      return;
    }
    setSelectedPhotos(prev => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const submitReport = async () => {
    if (!newReport.location || !newReport.description || !newReport.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      // Upload photos if any
      const photoUrls: string[] = [];
      for (const photo of selectedPhotos) {
        const fileExt = photo.name.split('.').pop();
        const fileName = `near-miss/${user.id}/${Date.now()}-${Math.random()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('safety-resources')
          .upload(fileName, photo);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('safety-resources')
          .getPublicUrl(fileName);

        photoUrls.push(publicUrl);
      }

      const { data, error } = await supabase
        .from('near_miss_reports')
        .insert({
          user_id: user.id,
          incident_date: newReport.incident_date || new Date().toISOString().split('T')[0],
          incident_time: newReport.incident_time || new Date().toTimeString().slice(0, 5),
          location: newReport.location,
          reporter_name: newReport.reporter_name || "Current User",
          category: newReport.category,
          severity: newReport.severity || "Medium",
          description: newReport.description,
          potential_consequences: newReport.potential_consequences || "",
          immediate_actions: newReport.immediate_actions || "",
          preventive_measures: newReport.preventive_measures || "",
          follow_up_required: newReport.follow_up_required || false,
          photos_attached: photoUrls
        })
        .select()
        .single();

      if (error) throw error;

      setReports(prev => [data, ...prev]);
      setNewReport({
        incident_date: new Date().toISOString().split('T')[0],
        incident_time: new Date().toTimeString().slice(0, 5),
        location: "",
        reporter_name: "",
        category: "",
        severity: "",
        description: "",
        potential_consequences: "",
        immediate_actions: "",
        preventive_measures: "",
        follow_up_required: false,
        photos_attached: []
      });
      setSelectedPhotos([]);
      setShowForm(false);

      toast({
        title: "Success",
        description: "Near miss report submitted successfully",
        variant: "success"
      });
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error",
        description: "Failed to submit report",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const updateReportStatus = async (reportId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('near_miss_reports')
        .update({ status: newStatus })
        .eq('id', reportId);

      if (error) throw error;

      setReports(prev => prev.map(r => 
        r.id === reportId ? { ...r, status: newStatus } : r
      ));

      toast({
        title: "Success",
        description: "Report status updated",
        variant: "success"
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-muted-foreground">Loading reports...</span>
      </div>
    );
  }

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
              {reports.filter(r => r.follow_up_required).length}
            </div>
            <div className="text-sm text-muted-foreground">Follow-up Required</div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Report Button */}
      <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/30 transition-all duration-300 animate-fade-in">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-elec-yellow flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                Near Miss Reporting
              </CardTitle>
              <p className="text-muted-foreground text-sm max-w-md">
                Report potential hazards to improve workplace safety. Help prevent future incidents by documenting near misses.
              </p>
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)} 
              variant="outline"
              className="bg-elec-yellow/10 border-elec-yellow/30 hover:bg-elec-yellow/20 transition-all duration-200 shrink-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? 'Cancel Report' : 'Report Near Miss'}
            </Button>
          </div>
        </CardHeader>
        {showForm && (
          <CardContent className="space-y-6 border-t border-elec-yellow/20 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newReport.incident_date}
                  onChange={(e) => setNewReport(prev => ({ ...prev, incident_date: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newReport.incident_time}
                  onChange={(e) => setNewReport(prev => ({ ...prev, incident_time: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newReport.location}
                  onChange={(e) => setNewReport(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Where did this occur?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reporter">Reporter</Label>
                <Input
                  id="reporter"
                  value={newReport.reporter_name}
                  onChange={(e) => setNewReport(prev => ({ ...prev, reporter_name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
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
              <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="description">Description of Near Miss *</Label>
              <Textarea
                id="description"
                value={newReport.description}
                onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what happened or could have happened"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consequences">Potential Consequences</Label>
              <Textarea
                id="consequences"
                value={newReport.potential_consequences}
                onChange={(e) => setNewReport(prev => ({ ...prev, potential_consequences: e.target.value }))}
                placeholder="What could have resulted from this near miss?"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="immediateActions">Immediate Actions Taken</Label>
              <Textarea
                id="immediateActions"
                value={newReport.immediate_actions}
                onChange={(e) => setNewReport(prev => ({ ...prev, immediate_actions: e.target.value }))}
                placeholder="What immediate steps were taken?"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preventive">Suggested Preventive Measures</Label>
              <Textarea
                id="preventive"
                value={newReport.preventive_measures}
                onChange={(e) => setNewReport(prev => ({ ...prev, preventive_measures: e.target.value }))}
                placeholder="How can this be prevented in future?"
                rows={2}
              />
            </div>

            {/* Photo Upload Section */}
            <div className="space-y-4">
              <Label>Attach Photos (Optional - Max 5)</Label>
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                  disabled={uploading}
                />
                <Label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm">Click to add photos</span>
                  <span className="text-xs text-muted-foreground">JPG, PNG up to 5MB each</span>
                </Label>
              </div>
              
              {selectedPhotos.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Photos ({selectedPhotos.length}/5)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedPhotos.map((photo, index) => (
                      <div key={index} className="relative p-2 bg-muted rounded border">
                        <div className="flex items-center justify-between">
                          <span className="text-xs truncate flex-1">{photo.name}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removePhoto(index)}
                            className="ml-2 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="followUp"
                checked={newReport.follow_up_required}
                onChange={(e) => setNewReport(prev => ({ ...prev, follow_up_required: e.target.checked }))}
              />
              <Label htmlFor="followUp">Follow-up action required</Label>
            </div>

            <div className="flex gap-4">
              <Button onClick={submitReport} className="flex-1" disabled={uploading}>
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Report"
                )}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)} disabled={uploading}>
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
                        {report.follow_up_required && (
                          <Badge variant="outline" className="text-amber-400">
                            Follow-up Required
                          </Badge>
                        )}
                        {report.photos_attached && report.photos_attached.length > 0 && (
                          <Badge variant="outline" className="text-blue-400">
                            {report.photos_attached.length} Photos
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
                        {report.follow_up_required && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedReport(report);
                              setShowFollowUpModal(true);
                            }}
                          >
                            <Calendar className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Date & Time</div>
                        <div className="text-sm">{report.incident_date} at {report.incident_time}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Location</div>
                        <div className="text-sm">{report.location}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Reported By</div>
                        <div className="text-sm">{report.reporter_name}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-muted-foreground font-medium">Description</div>
                        <div className="text-sm">{report.description}</div>
                      </div>
                      
                      {report.potential_consequences && (
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Potential Consequences</div>
                          <div className="text-sm text-orange-300">{report.potential_consequences}</div>
                        </div>
                      )}
                      
                      {report.immediate_actions && (
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Immediate Actions</div>
                          <div className="text-sm text-green-300">{report.immediate_actions}</div>
                        </div>
                      )}
                      
                      {report.preventive_measures && (
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Preventive Measures</div>
                          <div className="text-sm text-blue-300">{report.preventive_measures}</div>
                        </div>
                      )}

                      {report.photos_attached && report.photos_attached.length > 0 && (
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Attached Photos</div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {report.photos_attached.map((photoUrl, index) => (
                              <img
                                key={index}
                                src={photoUrl}
                                alt={`Evidence ${index + 1}`}
                                className="w-full h-20 object-cover rounded border"
                              />
                            ))}
                          </div>
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

      {/* Follow-up Modal */}
      {showFollowUpModal && selectedReport && (
        <Card className="border-purple-500/20 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-300">Follow-up Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="font-medium">{selectedReport.description}</div>
            <div className="text-sm text-muted-foreground">
              Reported: {selectedReport.incident_date} at {selectedReport.incident_time}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assigned-to">Assign To</Label>
                <Input
                  id="assigned-to"
                  value={followUpData.assigned_to}
                  onChange={(e) => setFollowUpData(prev => ({ ...prev, assigned_to: e.target.value }))}
                  placeholder="Person responsible"
                />
              </div>
              <div>
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={followUpData.due_date}
                  onChange={(e) => setFollowUpData(prev => ({ ...prev, due_date: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="follow-up-notes">Follow-up Notes</Label>
              <Textarea
                id="follow-up-notes"
                value={followUpData.notes}
                onChange={(e) => setFollowUpData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes for follow-up actions"
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => {
                  // Here you would update the report with follow-up data
                  setShowFollowUpModal(false);
                  toast({
                    title: "Success",
                    description: "Follow-up actions scheduled",
                    variant: "success"
                  });
                }}
                className="flex-1"
              >
                Schedule Follow-up
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowFollowUpModal(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NearMissReporting;
