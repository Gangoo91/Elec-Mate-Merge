import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, FileText, Loader2, Calendar, Clock, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MobileGestureHandler } from "@/components/ui/mobile-gesture-handler";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BriefingFormWizard } from "./BriefingFormWizard";
import { BriefingHistory } from "./BriefingHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroAIBriefingCard } from "./HeroAIBriefingCard";
import { TemplateQuickAccess } from "./TemplateQuickAccess";

interface BriefingTemplate {
  id: string;
  name: string;
  category: string;
  keyPoints: string[];
  safetyPoints: string[];
  equipment: string[];
  duration: string;
  teamSize: string;
}

interface TeamBriefing {
  id: string;
  template_id: string;
  briefing_name: string;
  location: string;
  briefing_date: string;
  briefing_time: string;
  attendees: Array<{ name: string; signature?: string; timestamp?: string; photo?: string }>;
  key_points: string[];
  safety_points: string[];
  equipment_required: string[];
  duration_minutes: number;
  notes: string;
  completed: boolean;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'postponed';
  qr_code?: string;
  created_at: string;
}

const TeamBriefingTemplates = () => {
  const [briefings, setBriefings] = useState<TeamBriefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIWizard, setShowAIWizard] = useState(false);
  const [activeTab, setActiveTab] = useState("templates");
  const [scheduledBriefingsExpanded, setScheduledBriefingsExpanded] = useState(false);
  const [showNewBriefingForm, setShowNewBriefingForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<BriefingTemplate | null>(null);
  
  const [templates] = useState<BriefingTemplate[]>([
    {
      id: "1",
      name: "Consumer Unit Installation Briefing",
      category: "Installation",
      keyPoints: [
        "Review site-specific hazards and risks",
        "Confirm isolation procedures and lock-off points",
        "Check all team members have appropriate PPE",
        "Establish communication protocols and emergency procedures"
      ],
      safetyPoints: [
        "Electrical isolation mandatory before work begins",
        "Prove dead testing required at all stages",
        "No live working permitted without specific risk assessment",
        "Emergency contact numbers confirmed with all team"
      ],
      equipment: [
        "Personal protective equipment (PPE)",
        "Voltage indicator and proving unit",
        "Lock-off devices and warning signs",
        "First aid kit and emergency communication"
      ],
      duration: "10-15 minutes",
      teamSize: "2-4 personnel"
    },
    {
      id: "2", 
      name: "Working at Height Safety Briefing",
      category: "Safety",
      keyPoints: [
        "Review height-related risks for the specific job",
        "Confirm ladder inspection and setup procedures",
        "Establish safe access and egress routes",
        "Review rescue procedures for emergencies"
      ],
      safetyPoints: [
        "3:1 rule for ladder angle must be maintained",
        "Someone must be present when working above 2 metres",
        "Weather conditions assessed - no work in high winds",
        "Fall protection equipment inspected before use"
      ],
      equipment: [
        "Properly inspected ladders or platforms",
        "Safety harnesses where required",
        "Hard hats and high-vis clothing",
        "Emergency rescue equipment"
      ],
      duration: "8-12 minutes",
      teamSize: "2-6 personnel"
    }
  ]);

  const [newBriefing, setNewBriefing] = useState({
    template_id: "",
    briefing_name: "",
    location: "",
    briefing_date: new Date().toISOString().split('T')[0],
    briefing_time: "09:00",
    notes: ""
  });

  useEffect(() => {
    fetchBriefings();
  }, []);

  const fetchBriefings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('team_briefings')
        .select('*')
        .order('briefing_date', { ascending: false });

      if (error) throw error;
      setBriefings((data || []).map(item => ({
        ...item,
        attendees: Array.isArray(item.attendees) ? item.attendees as Array<{ name: string; signature?: string; timestamp?: string; photo?: string }> : [],
        key_points: item.key_points || [],
        safety_points: item.safety_points || [],
        equipment_required: item.equipment_required || [],
        duration_minutes: item.duration_minutes || 10,
        notes: item.notes || "",
        status: (item as any).status || 'scheduled' as const,
        qr_code: (item as any).qr_code || undefined
      })));
    } catch (error) {
      console.error('Error fetching briefings:', error);
      toast({
        title: "Error",
        description: "Failed to load briefings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createBriefingFromTemplate = async (template: BriefingTemplate) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      if (!newBriefing.briefing_name.trim() || !newBriefing.location.trim()) {
        toast({
          title: "Error",
          description: "Please fill in briefing name and location",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('team_briefings')
        .insert({
          user_id: user.id,
          template_id: template.id,
          briefing_name: newBriefing.briefing_name,
          location: newBriefing.location,
          briefing_date: newBriefing.briefing_date,
          briefing_time: newBriefing.briefing_time,
          attendees: [],
          key_points: template.keyPoints,
          safety_points: template.safetyPoints,
          equipment_required: template.equipment,
          duration_minutes: parseInt(template.duration.split(' ')[0]) || 10,
          notes: newBriefing.notes
        })
        .select()
        .single();

      if (error) throw error;

      const qrCode = `briefing-${data.id}-${Date.now()}`;
      
      setBriefings(prev => [{
        ...data,
        attendees: Array.isArray(data.attendees) ? data.attendees as Array<{ name: string; signature?: string; timestamp?: string; photo?: string }> : [],
        key_points: data.key_points || [],
        safety_points: data.safety_points || [],
        equipment_required: data.equipment_required || [],
        duration_minutes: data.duration_minutes || 10,
        notes: data.notes || "",
        status: (data as any).status || 'scheduled' as const,
        qr_code: qrCode
      }, ...prev]);
      setShowNewBriefingForm(false);
      setNewBriefing({
        template_id: "",
        briefing_name: "",
        location: "",
        briefing_date: new Date().toISOString().split('T')[0],
        briefing_time: "09:00",
        notes: ""
      });

      toast({
        title: "Success",
        description: "Briefing scheduled successfully",
        variant: "success"
      });
    } catch (error) {
      console.error('Error creating briefing:', error);
      toast({
        title: "Error",
        description: "Failed to create briefing",
        variant: "destructive"
      });
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setShowNewBriefingForm(true);
    }
  };

  const handleViewAllTemplates = () => {
    setActiveTab('templates');
  };

  const upcomingBriefings = briefings.filter(b => new Date(b.briefing_date) >= new Date() && b.status === 'scheduled').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-muted-foreground">Loading briefings...</span>
      </div>
    );
  }

  if (showAIWizard) {
    return <BriefingFormWizard onClose={() => setShowAIWizard(false)} onSuccess={() => {
      setShowAIWizard(false);
      fetchBriefings();
    }} />;
  }

  return (
    <div className="space-y-6 pb-20">
      {/* MOBILE LAYOUT */}
      <div className="md:hidden space-y-6">
        {/* Hero AI Briefing Card */}
        <HeroAIBriefingCard onCreateBriefing={() => setShowAIWizard(true)} />

        {/* Quick Template Access */}
        <TemplateQuickAccess
          onTemplateSelect={handleTemplateSelect}
          onViewAll={handleViewAllTemplates}
        />

        {/* Tabs for Templates & History */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4 mt-4">
            {/* Templates Grid */}
            <div className="grid gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-card border border-elec-yellow/20 rounded-xl p-4 hover:border-elec-yellow/40 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-elec-light">{template.name}</h4>
                        <Badge className="bg-elec-yellow/10 text-elec-yellow border-0 whitespace-nowrap text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-elec-light/60 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{template.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{template.teamSize}</span>
                        </div>
                      </div>
                      <MobileButton
                        onClick={() => handleTemplateSelect(template.id)}
                        variant="outline"
                        size="sm"
                        className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
                        icon={<ArrowRight className="h-4 w-4" />}
                      >
                        Use Template
                      </MobileButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <BriefingHistory />
          </TabsContent>
        </Tabs>

        {/* Scheduled Briefings - Collapsible at Bottom */}
        <div className="border-t border-elec-yellow/20 pt-6">
          <button
            onClick={() => setScheduledBriefingsExpanded(!scheduledBriefingsExpanded)}
            className="w-full flex items-center justify-between mb-4 touch-manipulation min-h-[44px]"
          >
            <h2 className="text-lg font-semibold text-elec-light flex items-center gap-2">
              <Calendar className="h-5 w-5 text-elec-yellow" />
              Your Scheduled Briefings
              {upcomingBriefings > 0 && (
                <span className="bg-elec-yellow text-elec-dark text-xs font-bold px-2 py-1 rounded-full">
                  {upcomingBriefings}
                </span>
              )}
            </h2>
            {scheduledBriefingsExpanded ? (
              <ChevronUp className="h-5 w-5 text-elec-yellow" />
            ) : (
              <ChevronDown className="h-5 w-5 text-elec-yellow" />
            )}
          </button>

          {scheduledBriefingsExpanded && (
            <div className="space-y-3 animate-fade-in">
              {briefings && briefings.length > 0 ? (
                briefings.slice(0, 5).map((briefing) => (
                  <div
                    key={briefing.id}
                    className="bg-card border border-elec-yellow/20 rounded-xl p-4 hover:border-elec-yellow/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-elec-light mb-1">{briefing.briefing_name}</h3>
                        <p className="text-sm text-elec-light/70">
                          {briefing.location}
                        </p>
                      </div>
                      <Badge className={`${
                        briefing.status === 'completed' ? 'bg-primary/10 text-primary border-primary/20' :
                        briefing.status === 'in_progress' ? 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20' :
                        'bg-card border-elec-yellow/20 text-elec-light'
                      }`}>
                        {briefing.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-elec-light/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(briefing.briefing_date).toLocaleDateString('en-GB')}</span>
                      </div>
                      {briefing.attendees.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{briefing.attendees.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-card border border-elec-yellow/20 rounded-xl p-6 text-center">
                  <Calendar className="h-12 w-12 text-elec-yellow/50 mx-auto mb-3" />
                  <p className="text-elec-light/70">No scheduled briefings yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP LAYOUT - Keep existing functionality */}
      <div className="hidden md:block space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MobileGestureHandler onTap={() => {}}>
            <Card className="border-primary/30">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{briefings.length}</div>
                <div className="text-sm text-muted-foreground">Total Briefings</div>
              </CardContent>
            </Card>
          </MobileGestureHandler>
          
          <Card className="border-primary/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">
                {briefings.filter(b => b.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          
          <Card className="border-secondary/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-secondary-foreground">
                {briefings.reduce((total, b) => total + b.attendees.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Attendees</div>
            </CardContent>
          </Card>
          
          <Card className="border-accent/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-accent-foreground">
                {upcomingBriefings}
              </div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-elec-light">Briefing Templates</h3>
              <MobileButton
                onClick={() => setShowAIWizard(true)}
                variant="elec"
                size="default"
              >
                Create AI Briefing
              </MobileButton>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="border-elec-yellow/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-lg text-elec-light">{template.name}</h4>
                      <Badge className="bg-elec-yellow/10 text-elec-yellow border-0">
                        {template.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-elec-light/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{template.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{template.teamSize}</span>
                      </div>
                    </div>
                    <MobileButton
                      onClick={() => handleTemplateSelect(template.id)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Use Template
                    </MobileButton>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <BriefingHistory />
          </TabsContent>
        </Tabs>

        {/* Desktop Scheduled Briefings */}
        <div>
          <h2 className="text-xl font-semibold text-elec-light mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Scheduled Briefings
          </h2>
          {briefings && briefings.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {briefings.map((briefing) => (
                <Card key={briefing.id} className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-elec-light">{briefing.briefing_name}</h3>
                        <p className="text-sm text-elec-light/70">{briefing.location}</p>
                      </div>
                      <Badge className={`${
                        briefing.status === 'completed' ? 'bg-primary/10 text-primary' :
                        'bg-card text-elec-light'
                      }`}>
                        {briefing.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-elec-light/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(briefing.briefing_date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{briefing.attendees.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-elec-yellow/20">
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 text-elec-yellow/50 mx-auto mb-3" />
                <p className="text-elec-light/70">No scheduled briefings yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Template Selection Dialog */}
      <Dialog open={showNewBriefingForm} onOpenChange={setShowNewBriefingForm}>
        <DialogContent className="bg-card border-elec-yellow/30">
          <DialogHeader>
            <DialogTitle className="text-elec-light">Schedule New Briefing</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div>
                <Label className="text-elec-light">Template</Label>
                <p className="text-sm text-elec-light/70">{selectedTemplate.name}</p>
              </div>
              <div>
                <Label htmlFor="name" className="text-elec-light">Briefing Name</Label>
                <Input
                  id="name"
                  value={newBriefing.briefing_name}
                  onChange={(e) => setNewBriefing({ ...newBriefing, briefing_name: e.target.value })}
                  placeholder="e.g., Morning Safety Briefing"
                  className="bg-background border-elec-yellow/30"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-elec-light">Location</Label>
                <Input
                  id="location"
                  value={newBriefing.location}
                  onChange={(e) => setNewBriefing({ ...newBriefing, location: e.target.value })}
                  placeholder="e.g., Site Office"
                  className="bg-background border-elec-yellow/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-elec-light">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newBriefing.briefing_date}
                    onChange={(e) => setNewBriefing({ ...newBriefing, briefing_date: e.target.value })}
                    className="bg-background border-elec-yellow/30"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-elec-light">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newBriefing.briefing_time}
                    onChange={(e) => setNewBriefing({ ...newBriefing, briefing_time: e.target.value })}
                    className="bg-background border-elec-yellow/30"
                  />
                </div>
              </div>
              <MobileButton
                onClick={() => createBriefingFromTemplate(selectedTemplate)}
                variant="elec"
                size="wide"
              >
                Schedule Briefing
              </MobileButton>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamBriefingTemplates;
