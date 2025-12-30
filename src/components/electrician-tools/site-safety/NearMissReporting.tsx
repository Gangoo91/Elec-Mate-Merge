import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  AlertTriangle, Plus, Camera, X, Zap, Flame, Users, HardHat,
  Clock, MapPin, Shield, CheckCircle2, Loader2, Sparkles, ArrowLeft
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface NearMissReport {
  id: string;
  category: string;
  severity: string;
  description: string;
  location: string;
  incident_date: string;
  incident_time: string;
  reporter_name: string;
  potential_consequences?: string;
  immediate_actions?: string;
  preventive_measures?: string;
  photo_urls?: string[];
  created_at: string;
  user_id: string;
}

interface FormData {
  category: string;
  severity: string;
  description: string;
  location: string;
  incident_date: string;
  incident_time: string;
  reporter_name: string;
  potential_consequences: string;
  immediate_actions: string;
  preventive_measures: string;
}

const QUICK_TEMPLATES = [
  { id: 'electrical', icon: Zap, label: 'Electrical', category: 'electrical_hazard', severity: 'high', description: 'Near miss involving electrical hazard - exposed wiring, shock risk, or electrical fault detected before incident occurred.' },
  { id: 'fire', icon: Flame, label: 'Fire Risk', category: 'fire_risk', severity: 'critical', description: 'Near miss involving fire hazard - overheating equipment, sparking, or potential ignition source identified.' },
  { id: 'ppe', icon: HardHat, label: 'PPE Issue', category: 'ppe_failure', severity: 'medium', description: 'Near miss due to PPE issue - missing or damaged personal protective equipment identified before work commenced.' },
  { id: 'worksite', icon: Users, label: 'Worksite', category: 'worksite_hazard', severity: 'medium', description: 'Near miss involving worksite hazard - trip hazard, unstable surface, or access issue identified.' }
];

const CATEGORIES = [
  { value: 'electrical_hazard', label: 'Electrical Hazard' },
  { value: 'fire_risk', label: 'Fire Risk' },
  { value: 'fall_hazard', label: 'Fall Hazard' },
  { value: 'ppe_failure', label: 'PPE Failure/Issue' },
  { value: 'worksite_hazard', label: 'Worksite Hazard' },
  { value: 'tool_equipment', label: 'Tool/Equipment Issue' },
  { value: 'chemical_exposure', label: 'Chemical Exposure' },
  { value: 'manual_handling', label: 'Manual Handling' },
  { value: 'vehicle_incident', label: 'Vehicle Incident' },
  { value: 'other', label: 'Other' }
];

const SEVERITIES = [
  { value: 'low', label: 'Low', description: 'Minor incident, no injury likely', colour: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { value: 'medium', label: 'Medium', description: 'Moderate risk, minor injury possible', colour: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { value: 'high', label: 'High', description: 'Significant risk, serious injury possible', colour: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { value: 'critical', label: 'Critical', description: 'Life-threatening or major incident', colour: 'bg-red-500/20 text-red-400 border-red-500/30' }
];

export const NearMissReporting: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reports, setReports] = useState<NearMissReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [lastSubmittedReport, setLastSubmittedReport] = useState<NearMissReport | null>(null);
  const [generatingBriefing, setGeneratingBriefing] = useState(false);
  
  const now = new Date();
  const [formData, setFormData] = useState<FormData>({
    category: '', severity: '', description: '', location: '',
    incident_date: now.toISOString().split('T')[0],
    incident_time: now.toTimeString().slice(0, 5),
    reporter_name: '', potential_consequences: '', immediate_actions: '', preventive_measures: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
      if (data?.full_name) setFormData(prev => ({ ...prev, reporter_name: data.full_name }));
    };
    loadProfile();
  }, [user]);

  useEffect(() => {
    const loadReports = async () => {
      if (!user) return;
      setLoadingReports(true);
      const { data, error } = await supabase.from('near_miss_reports').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10);
      if (!error && data) setReports(data as NearMissReport[]);
      setLoadingReports(false);
    };
    loadReports();
  }, [user]);

  const resetForm = () => {
    const now = new Date();
    setFormData({ category: '', severity: '', description: '', location: '', incident_date: now.toISOString().split('T')[0], incident_time: now.toTimeString().slice(0, 5), reporter_name: formData.reporter_name, potential_consequences: '', immediate_actions: '', preventive_measures: '' });
    setPhotos([]); setPhotoPreviewUrls([]); setErrors({});
  };

  const applyTemplate = (template: typeof QUICK_TEMPLATES[0]) => {
    setFormData(prev => ({ ...prev, category: template.category, severity: template.severity, description: template.description }));
    setErrors({});
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 5) { toast({ title: "Maximum 5 photos", variant: "destructive" }); return; }
    const validFiles = files.filter(f => f.type.startsWith('image/') && f.size <= 10 * 1024 * 1024);
    setPhotos(prev => [...prev, ...validFiles]);
    validFiles.forEach(file => { const reader = new FileReader(); reader.onload = (e) => setPhotoPreviewUrls(prev => [...prev, e.target?.result as string]); reader.readAsDataURL(file); });
  };

  const removePhoto = (index: number) => { setPhotos(prev => prev.filter((_, i) => i !== index)); setPhotoPreviewUrls(prev => prev.filter((_, i) => i !== index)); };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.incident_date) newErrors.incident_date = 'Date is required';
    if (!formData.incident_time) newErrors.incident_time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.severity) newErrors.severity = 'Severity is required';
    if (!formData.description.trim() || formData.description.trim().length < 20) newErrors.description = 'Description required (at least 20 characters)';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) { const el = document.getElementById(`field-${Object.keys(newErrors)[0]}`); el?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    return Object.keys(newErrors).length === 0;
  };

  const submitReport = async () => {
    if (!validateForm()) { toast({ title: "Missing required fields", description: "Please fill in all highlighted fields", variant: "destructive" }); return; }
    if (!user) { toast({ title: "Error", description: "You must be logged in", variant: "destructive" }); return; }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from('near_miss_reports').insert({
        user_id: user.id, category: formData.category, severity: formData.severity, description: formData.description,
        location: formData.location, incident_date: formData.incident_date, incident_time: formData.incident_time,
        reporter_name: formData.reporter_name || 'Anonymous', potential_consequences: formData.potential_consequences || null,
        immediate_actions: formData.immediate_actions || null, preventive_measures: formData.preventive_measures || null
      }).select().single();
      if (error) throw error;
      setLastSubmittedReport(data as NearMissReport);
      setReports(prev => [data as NearMissReport, ...prev]);
      resetForm(); setShowForm(false); setShowSuccessDialog(true);
      toast({ title: "Report submitted", description: "Near miss report has been recorded successfully" });
    } catch (error) { console.error('Error:', error); toast({ title: "Error", description: "Failed to submit report", variant: "destructive" }); }
    finally { setIsSubmitting(false); }
  };

  const generateTeamBriefing = async () => {
    if (!lastSubmittedReport) return;
    setGeneratingBriefing(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-briefing-from-near-miss', { body: { nearMissData: lastSubmittedReport } });
      if (error) throw error;
      if (data?.success) { toast({ title: "Briefing generated", description: "Team briefing content has been created" }); setShowSuccessDialog(false); }
    } catch (error) { console.error('Error:', error); toast({ title: "Error", description: "Failed to generate team briefing", variant: "destructive" }); }
    finally { setGeneratingBriefing(false); }
  };

  const getSeverityBadge = (severity: string) => { const sev = SEVERITIES.find(s => s.value === severity); return sev ? <Badge className={`${sev.colour} border`}>{sev.label}</Badge> : <Badge variant="secondary">{severity}</Badge>; };
  const getCategoryLabel = (value: string) => CATEGORIES.find(c => c.value === value)?.label || value;

  if (!showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div><h2 className="text-xl font-semibold text-foreground">Near Miss Reports</h2><p className="text-sm text-muted-foreground">Record and track safety incidents</p></div>
          <Button onClick={() => setShowForm(true)} className="bg-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Report Near Miss</Button>
        </div>
        {loadingReports ? <div className="flex items-center justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : reports.length === 0 ? (
          <Card className="border-dashed"><CardContent className="flex flex-col items-center justify-center py-12 text-center"><AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" /><h3 className="text-lg font-medium text-foreground mb-2">No reports yet</h3><p className="text-sm text-muted-foreground mb-4">Recording near misses helps prevent future accidents.</p><Button onClick={() => setShowForm(true)} variant="outline"><Plus className="h-4 w-4 mr-2" />Submit your first report</Button></CardContent></Card>
        ) : (
          <div className="space-y-3">{reports.map(report => (<Card key={report.id} className="hover:bg-muted/50 transition-colors"><CardContent className="p-4"><div className="flex items-start justify-between gap-4"><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-2 flex-wrap">{getSeverityBadge(report.severity)}<Badge variant="outline" className="text-xs">{getCategoryLabel(report.category)}</Badge></div><p className="text-sm text-foreground line-clamp-2 mb-2">{report.description}</p><div className="flex items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{report.location}</span><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(report.incident_date).toLocaleDateString('en-GB')}</span></div></div></div></CardContent></Card>))}</div>
        )}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}><DialogContent><DialogHeader><DialogTitle className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-5 w-5 text-green-500" />Report Submitted</DialogTitle><DialogDescription>Would you like to create a team safety briefing from this incident?</DialogDescription></DialogHeader><DialogFooter className="flex-col sm:flex-row gap-2"><Button variant="outline" onClick={() => setShowSuccessDialog(false)}>Done</Button><Button onClick={generateTeamBriefing} disabled={generatingBriefing} className="bg-primary text-primary-foreground">{generatingBriefing ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating...</> : <><Sparkles className="h-4 w-4 mr-2" />Create Team Briefing</>}</Button></DialogFooter></DialogContent></Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3"><Button variant="ghost" size="icon" onClick={() => { resetForm(); setShowForm(false); }}><ArrowLeft className="h-5 w-5" /></Button><div><h2 className="text-xl font-semibold text-foreground">Report Near Miss</h2><p className="text-sm text-muted-foreground">Fields with * are required</p></div></div>
      <div className="space-y-2"><Label className="text-sm text-muted-foreground">Quick templates</Label><div className="grid grid-cols-2 gap-2">{QUICK_TEMPLATES.map(t => (<button key={t.id} onClick={() => applyTemplate(t)} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-left"><t.icon className="h-5 w-5 text-primary" /><span className="text-sm font-medium text-foreground">{t.label}</span></button>))}</div></div>
      <Card><CardContent className="p-4 space-y-6">
        <div className="space-y-4"><h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2"><Clock className="h-4 w-4" />When & Where</h3>
          <div className="grid grid-cols-2 gap-3">
            <div id="field-incident_date" className="space-y-2"><Label className="text-foreground">Date <span className="text-destructive">*</span></Label><Input type="date" value={formData.incident_date} onChange={(e) => setFormData(prev => ({ ...prev, incident_date: e.target.value }))} className={`h-12 text-base ${errors.incident_date ? 'border-destructive' : ''}`} />{errors.incident_date && <p className="text-xs text-destructive">{errors.incident_date}</p>}</div>
            <div id="field-incident_time" className="space-y-2"><Label className="text-foreground">Time <span className="text-destructive">*</span></Label><Input type="time" value={formData.incident_time} onChange={(e) => setFormData(prev => ({ ...prev, incident_time: e.target.value }))} className={`h-12 text-base ${errors.incident_time ? 'border-destructive' : ''}`} />{errors.incident_time && <p className="text-xs text-destructive">{errors.incident_time}</p>}</div>
          </div>
          <div id="field-location" className="space-y-2"><Label className="text-foreground">Location <span className="text-destructive">*</span></Label><Input placeholder="e.g. 123 High Street, London" value={formData.location} onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} className={`h-12 text-base ${errors.location ? 'border-destructive' : ''}`} />{errors.location && <p className="text-xs text-destructive">{errors.location}</p>}</div>
        </div>
        <div className="space-y-4 pt-4 border-t border-border"><h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2"><AlertTriangle className="h-4 w-4" />What Happened</h3>
          <div id="field-category" className="space-y-2"><Label className="text-foreground">Category <span className="text-destructive">*</span></Label><Select value={formData.category} onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}><SelectTrigger className={`h-12 text-base ${errors.category ? 'border-destructive' : ''}`}><SelectValue placeholder="Select hazard type" /></SelectTrigger><SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select>{errors.category && <p className="text-xs text-destructive">{errors.category}</p>}</div>
          <div id="field-severity" className="space-y-2"><Label className="text-foreground">Severity <span className="text-destructive">*</span></Label><div className="grid grid-cols-2 gap-2">{SEVERITIES.map(s => (<button key={s.value} type="button" onClick={() => setFormData(prev => ({ ...prev, severity: s.value }))} className={`p-3 rounded-lg border text-left transition-all ${formData.severity === s.value ? `${s.colour} border-2` : 'border-border bg-card hover:bg-muted/50'}`}><span className="font-medium text-sm text-foreground">{s.label}</span><p className="text-xs text-muted-foreground mt-0.5">{s.description}</p></button>))}</div>{errors.severity && <p className="text-xs text-destructive">{errors.severity}</p>}</div>
          <div id="field-description" className="space-y-2"><Label className="text-foreground">Description <span className="text-destructive">*</span></Label><Textarea placeholder="Describe what happened..." value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className={`min-h-[120px] text-base resize-none ${errors.description ? 'border-destructive' : ''}`} /><div className="flex justify-between">{errors.description ? <p className="text-xs text-destructive">{errors.description}</p> : <span />}<span className="text-xs text-muted-foreground">{formData.description.length} chars</span></div></div>
        </div>
        <div className="space-y-4 pt-4 border-t border-border"><h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2"><Shield className="h-4 w-4" />Actions (Optional)</h3>
          <div className="space-y-2"><Label className="text-foreground">Potential Consequences</Label><Textarea placeholder="What could have happened?" value={formData.potential_consequences} onChange={(e) => setFormData(prev => ({ ...prev, potential_consequences: e.target.value }))} className="min-h-[80px] text-base resize-none" /></div>
          <div className="space-y-2"><Label className="text-foreground">Immediate Actions</Label><Textarea placeholder="What did you do?" value={formData.immediate_actions} onChange={(e) => setFormData(prev => ({ ...prev, immediate_actions: e.target.value }))} className="min-h-[80px] text-base resize-none" /></div>
          <div className="space-y-2"><Label className="text-foreground">Preventive Measures</Label><Textarea placeholder="How to prevent this?" value={formData.preventive_measures} onChange={(e) => setFormData(prev => ({ ...prev, preventive_measures: e.target.value }))} className="min-h-[80px] text-base resize-none" /></div>
        </div>
        <div className="space-y-4 pt-4 border-t border-border"><h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2"><Camera className="h-4 w-4" />Photos (Optional)</h3>
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoSelect} className="hidden" />
          {photoPreviewUrls.length > 0 && <div className="grid grid-cols-3 gap-2">{photoPreviewUrls.map((url, i) => (<div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted"><img src={url} alt="" className="w-full h-full object-cover" /><button onClick={() => removePhoto(i)} className="absolute top-1 right-1 p-1 rounded-full bg-background/80"><X className="h-4 w-4" /></button></div>))}</div>}
          {photos.length < 5 && <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full h-12"><Camera className="h-4 w-4 mr-2" />Add Photo ({photos.length}/5)</Button>}
        </div>
        <div className="space-y-2 pt-4 border-t border-border"><Label className="text-foreground">Your Name</Label><Input placeholder="Optional" value={formData.reporter_name} onChange={(e) => setFormData(prev => ({ ...prev, reporter_name: e.target.value }))} className="h-12 text-base" /></div>
      </CardContent></Card>
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm py-4 -mx-4 px-4 border-t border-border"><Button onClick={submitReport} disabled={isSubmitting} className="w-full h-14 text-base font-medium bg-primary text-primary-foreground">{isSubmitting ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Submitting...</> : <><CheckCircle2 className="h-5 w-5 mr-2" />Submit Report</>}</Button></div>
    </div>
  );
};
