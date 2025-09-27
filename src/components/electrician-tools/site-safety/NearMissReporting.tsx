import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Plus, Eye, Search, Filter, Clock, CheckCircle, ArrowLeft, ArrowRight, Camera, Upload, Loader2, Calendar, TrendingUp, BarChart3, AlertCircle, Zap, HardHat, Shield, X } from "lucide-react";
import { MobileWizardStep } from "@/components/ui/mobile-wizard-step";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { hazardCategories } from "@/data/hazards";

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

interface QuickTemplate {
  id: string;
  name: string;
  icon: React.ElementType;
  category: string;
  severity: string;
  description: string;
  consequences: string;
  actions: string;
}

const quickTemplates: QuickTemplate[] = [
  {
    id: "electrical-shock",
    name: "Electrical Shock Risk",
    icon: Zap,
    category: "Electrical Hazards",
    severity: "High",
    description: "Potential exposure to live electrical components",
    consequences: "Electrical shock, burns, or electrocution",
    actions: "Isolated circuit, installed protective barriers"
  },
  {
    id: "fall-hazard",
    name: "Fall Hazard",
    icon: AlertTriangle,
    category: "Working at Height",
    severity: "High", 
    description: "Unprotected edge or unstable working surface",
    consequences: "Falls resulting in serious injury or fatality",
    actions: "Installed edge protection, secured work platform"
  },
  {
    id: "equipment-malfunction",
    name: "Equipment Malfunction",
    icon: HardHat,
    category: "Equipment & Tools",
    severity: "Medium",
    description: "Faulty or damaged equipment identified",
    consequences: "Equipment failure leading to injury or damage",
    actions: "Removed equipment from service, arranged maintenance"
  },
  {
    id: "unsafe-practice",
    name: "Unsafe Work Practice",
    icon: Shield,
    category: "Unsafe Acts",
    severity: "Medium",
    description: "Worker observed not following safety procedures",
    consequences: "Increased risk of injury or incident",
    actions: "Provided immediate coaching, arranged additional training"
  }
];

const NearMissReporting = () => {
  const [reports, setReports] = useState<NearMissReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);

  const [formData, setFormData] = useState<Partial<NearMissReport>>({
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

  const categories = hazardCategories.map(cat => cat.name);
  const severityLevels = ["Low", "Medium", "High", "Critical"];
  const statusOptions = ["Reported", "Under Review", "Action Taken", "Closed"];

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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Basic Details
        if (!formData.location?.trim()) newErrors.location = "Location is required";
        if (!formData.incident_date) newErrors.incident_date = "Date is required";
        if (!formData.incident_time) newErrors.incident_time = "Time is required";
        break;
      case 1: // Incident Description
        if (!formData.description?.trim()) newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.severity) newErrors.severity = "Severity is required";
        break;
      // Steps 2 and 3 are optional
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const applyQuickTemplate = (template: QuickTemplate) => {
    setFormData(prev => ({
      ...prev,
      category: template.category,
      severity: template.severity,
      description: template.description,
      potential_consequences: template.consequences,
      immediate_actions: template.actions
    }));
    setCurrentStep(1);
  };

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
    if (!validateStep(0) || !validateStep(1)) {
      toast({
        title: "Error",
        description: "Please complete all required fields",
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
          incident_date: formData.incident_date || new Date().toISOString().split('T')[0],
          incident_time: formData.incident_time || new Date().toTimeString().slice(0, 5),
          location: formData.location,
          reporter_name: formData.reporter_name || "Current User",
          category: formData.category,
          severity: formData.severity || "Medium",
          description: formData.description,
          potential_consequences: formData.potential_consequences || "",
          immediate_actions: formData.immediate_actions || "",
          preventive_measures: formData.preventive_measures || "",
          follow_up_required: formData.follow_up_required || false,
          photos_attached: photoUrls
        })
        .select()
        .single();

      if (error) throw error;

      setReports(prev => [data, ...prev]);
      resetForm();

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

  const resetForm = () => {
    setFormData({
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
    setCurrentStep(0);
    setShowForm(false);
    setErrors({});
  };

  const updateFieldValue = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "High": return "bg-orange-500";
      case "Critical": return "bg-red-500";
      default: return "bg-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Reported": return "bg-blue-500";
      case "Under Review": return "bg-yellow-500";
      case "Action Taken": return "bg-purple-500";
      case "Closed": return "bg-green-500";
      default: return "bg-muted";
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    const matchesSeverity = filterSeverity === "all" || report.severity === filterSeverity;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="mobile-input-spacing">
            <MobileInput
              label="Date *"
              type="date"
              value={formData.incident_date || ""}
              onChange={(e) => updateFieldValue("incident_date", e.target.value)}
              error={errors.incident_date}
            />
            <MobileInput
              label="Time *"
              type="time"
              value={formData.incident_time || ""}
              onChange={(e) => updateFieldValue("incident_time", e.target.value)}
              error={errors.incident_time}
            />
            <MobileInput
              label="Location *"
              value={formData.location || ""}
              onChange={(e) => updateFieldValue("location", e.target.value)}
              placeholder="Where did this occur?"
              error={errors.location}
              hint="Be specific about the exact location"
            />
            <MobileInput
              label="Reporter Name"
              value={formData.reporter_name || ""}
              onChange={(e) => updateFieldValue("reporter_name", e.target.value)}
              placeholder="Your name (optional)"
              hint="Leave blank to use your profile name"
            />
          </div>
        );

      case 1:
        return (
          <div className="mobile-input-spacing">
            <MobileSelectWrapper
              label="Category *"
              value={formData.category || ""}
              onValueChange={(value) => updateFieldValue("category", value)}
              placeholder="Select hazard category"
              options={categories.map(cat => ({ value: cat, label: cat }))}
              error={errors.category}
            />
            <MobileSelectWrapper
              label="Severity Level *"
              value={formData.severity || ""}
              onValueChange={(value) => updateFieldValue("severity", value)}
              placeholder="How severe was this near miss?"
              options={severityLevels.map(level => ({ 
                value: level, 
                label: level,
                description: level === "Low" ? "Minor risk" : 
                           level === "Medium" ? "Moderate risk" :
                           level === "High" ? "Significant risk" : "Life threatening"
              }))}
              error={errors.severity}
            />
            <MobileInputWrapper
              label="Description of Near Miss *"
              value={formData.description || ""}
              onChange={(value) => updateFieldValue("description", value)}
              placeholder="Describe what happened or could have happened..."
              type="textarea"
              error={errors.description}
              hint="Be detailed - include what you saw, heard, or experienced"
            />
          </div>
        );

      case 2:
        return (
          <div className="mobile-input-spacing">
            <MobileInputWrapper
              label="Potential Consequences"
              value={formData.potential_consequences || ""}
              onChange={(value) => updateFieldValue("potential_consequences", value)}
              placeholder="What could have resulted from this near miss?"
              type="textarea"
              hint="Consider injuries, damage, or other impacts that could have occurred"
            />
            <MobileInputWrapper
              label="Immediate Actions Taken"
              value={formData.immediate_actions || ""}
              onChange={(value) => updateFieldValue("immediate_actions", value)}
              placeholder="What immediate steps were taken?"
              type="textarea"
              hint="Describe any actions taken to address the immediate hazard"
            />
          </div>
        );

      case 3:
        return (
          <div className="mobile-input-spacing">
            <MobileInputWrapper
              label="Suggested Preventive Measures"
              value={formData.preventive_measures || ""}
              onChange={(value) => updateFieldValue("preventive_measures", value)}
              placeholder="How can this be prevented in future?"
              type="textarea"
              hint="Your recommendations for preventing similar incidents"
            />
            
            {/* Photo Upload Section */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Attach Photos (Optional - Max 5)</label>
              <div className="border-2 border-dashed border-border/40 rounded-lg p-6 text-center bg-card">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                  disabled={uploading}
                />
                <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Click to add photos</span>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB each</p>
                  </div>
                </label>
              </div>
              
              {selectedPhotos.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Selected Photos ({selectedPhotos.length}/5)</label>
                  <div className="space-y-2">
                    {selectedPhotos.map((photo, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <Camera className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm truncate flex-1">{photo.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePhoto(index)}
                          className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading reports...</span>
      </div>
    );
  }

  if (showForm) {
    const stepTitles = [
      "Basic Details",
      "Incident Description", 
      "Actions & Consequences",
      "Prevention & Photos"
    ];

    const stepDescriptions = [
      "When and where did this near miss occur?",
      "What happened and how serious was it?",
      "What actions were taken and what could have happened?",
      "How can we prevent this and add any photos"
    ];

    return (
      <div className="space-y-6">
        {/* Quick Templates */}
        {currentStep === 0 && (
          <Card className="mobile-card border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="mobile-heading text-primary">Quick Report Templates</CardTitle>
              <p className="mobile-text text-muted-foreground">
                Start with a common scenario to save time
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickTemplates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <Button
                      key={template.id}
                      variant="outline"
                      className="h-auto p-4 text-left hover:border-primary/40 hover:bg-primary/5"
                      onClick={() => applyQuickTemplate(template)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{template.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {template.category} • {template.severity}
                          </div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Wizard Steps */}
        <MobileWizardStep
          title={stepTitles[currentStep]}
          description={stepDescriptions[currentStep]}
          currentStep={currentStep}
          totalSteps={4}
          onNext={currentStep < 3 ? handleNext : undefined}
          onPrevious={currentStep > 0 ? handlePrevious : undefined}
          nextLabel={currentStep === 3 ? undefined : "Continue"}
          previousLabel="Back"
          nextDisabled={uploading}
        >
          {renderStepContent()}
          
          {/* Submit button on final step */}
          {currentStep === 3 && (
            <div className="pt-6 border-t border-border/40 space-y-3">
              <Button
                onClick={submitReport}
                disabled={uploading}
                className="mobile-button-primary w-full"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Near Miss Report
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                className="w-full"
                disabled={uploading}
              >
                Cancel & Start Over
              </Button>
            </div>
          )}
        </MobileWizardStep>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="mobile-card border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div className="text-2xl font-bold text-primary">{reports.length}</div>
            </div>
            <div className="mobile-small-text text-muted-foreground">Total Reports</div>
          </CardContent>
        </Card>
        
        <Card className="mobile-card border-orange-500/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-orange-400" />
              <div className="text-2xl font-bold text-orange-400">
                {reports.filter(r => r.severity === "High" || r.severity === "Critical").length}
              </div>
            </div>
            <div className="mobile-small-text text-muted-foreground">High Risk</div>
          </CardContent>
        </Card>
        
        <Card className="mobile-card border-yellow-500/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <div className="text-2xl font-bold text-yellow-400">
                {reports.filter(r => r.status === "Under Review").length}
              </div>
            </div>
            <div className="mobile-small-text text-muted-foreground">Under Review</div>
          </CardContent>
        </Card>
        
        <Card className="mobile-card border-green-500/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <div className="text-2xl font-bold text-green-400">
                {reports.filter(r => r.status === "Closed").length}
              </div>
            </div>
            <div className="mobile-small-text text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Controls */}
      <Card className="mobile-card border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="mobile-heading text-primary flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                Near Miss Reporting
              </CardTitle>
              <p className="mobile-text text-muted-foreground">
                Report potential hazards to improve workplace safety. Help prevent future incidents.
              </p>
            </div>
            <Button 
              onClick={() => setShowForm(true)} 
              className="mobile-button-primary shrink-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              Report Near Miss
            </Button>
          </div>
        </CardHeader>

        {/* Search and Filters */}
        <CardContent className="border-t border-border/40 pt-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  {severityLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <Card className="mobile-card text-center py-8">
            <CardContent>
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="mobile-subheading mb-2">No Near Miss Reports</h3>
              <p className="mobile-text text-muted-foreground mb-4">
                {searchTerm || filterStatus !== "all" || filterSeverity !== "all" 
                  ? "No reports match your search criteria" 
                  : "Start by reporting your first near miss to improve workplace safety"}
              </p>
              <Button onClick={() => setShowForm(true)} className="mobile-button-primary">
                <Plus className="h-4 w-4 mr-2" />
                Create First Report
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id} className="mobile-card border-border/40 hover:border-primary/30 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={`${getSeverityColor(report.severity)} text-white border-0`}>
                          {report.severity}
                        </Badge>
                        <Badge variant="outline" className={`${getStatusColor(report.status)} text-white border-0`}>
                          {report.status}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-sm truncate">{report.category}</h3>
                      <p className="text-xs text-muted-foreground">{report.location} • {report.incident_date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.photos_attached?.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Camera className="h-3 w-3" />
                          {report.photos_attached.length}
                        </div>
                      )}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {report.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
                    <span>Reported by {report.reporter_name}</span>
                    <span>{new Date(report.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NearMissReporting;