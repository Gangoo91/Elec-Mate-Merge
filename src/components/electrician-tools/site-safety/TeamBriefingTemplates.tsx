
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileButton } from "@/components/ui/mobile-button";
import { Input } from "@/components/ui/input";
import { MobileInput } from "@/components/ui/mobile-input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, FileText, Download, Plus, Edit, Copy, Clock, UserCheck, Loader2, X, MoreHorizontal, Calendar, MapPin, Bell, QrCode, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MobileGestureHandler } from "@/components/ui/mobile-gesture-handler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedBriefing, setSelectedBriefing] = useState<TeamBriefing | null>(null);
  const [newAttendee, setNewAttendee] = useState("");
  const [attendanceView, setAttendanceView] = useState<'list' | 'qr' | 'camera'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  const [templates, setTemplates] = useState<BriefingTemplate[]>([
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

  const [selectedTemplate, setSelectedTemplate] = useState<BriefingTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewBriefingForm, setShowNewBriefingForm] = useState(false);
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

  const addAttendee = async (capturePhoto = false) => {
    if (!selectedBriefing || !newAttendee.trim()) return;

    try {
      const attendeeData: { name: string; timestamp: string; photo?: string } = { 
        name: newAttendee, 
        timestamp: new Date().toISOString() 
      };

      if (capturePhoto) {
        attendeeData.photo = `photo-${Date.now()}`; // Placeholder for actual photo capture
      }

      const updatedAttendees = [...selectedBriefing.attendees, attendeeData];

      const { error } = await supabase
        .from('team_briefings')
        .update({ attendees: updatedAttendees })
        .eq('id', selectedBriefing.id);

      if (error) throw error;

      setSelectedBriefing(prev => prev ? { ...prev, attendees: updatedAttendees } : null);
      setBriefings(prev => prev.map(b => 
        b.id === selectedBriefing.id ? { ...b, attendees: updatedAttendees } : b
      ));
      setNewAttendee("");

      toast({
        title: "Success",
        description: "Attendee added successfully",
        variant: "success"
      });
    } catch (error) {
      console.error('Error adding attendee:', error);
      toast({
        title: "Error",
        description: "Failed to add attendee",
        variant: "destructive"
      });
    }
  };

  const updateBriefingStatus = async (briefingId: string, status: TeamBriefing['status']) => {
    try {
      const { error } = await supabase
        .from('team_briefings')
        .update({ 
          completed: status === 'completed',
          ...(status !== 'completed' ? {} : {})
        })
        .eq('id', briefingId);

      if (error) throw error;

      setBriefings(prev => prev.map(b => 
        b.id === briefingId ? { ...b, status, completed: status === 'completed' } : b
      ));

      toast({
        title: "Success",
        description: `Briefing ${status === 'completed' ? 'completed' : `marked as ${status}`}`,
        variant: "success"
      });
    } catch (error) {
      console.error('Error updating briefing status:', error);
      toast({
        title: "Error",
        description: "Failed to update briefing status",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: TeamBriefing['status']) => {
    switch (status) {
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'in_progress': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      case 'postponed': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const filteredBriefings = briefings.filter(briefing => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'upcoming') return new Date(briefing.briefing_date) >= new Date() && briefing.status === 'scheduled';
    if (filterStatus === 'today') return briefing.briefing_date === new Date().toISOString().split('T')[0];
    return briefing.status === filterStatus;
  });

  const categories = ["Installation", "Maintenance", "Testing", "Safety", "Emergency", "General"];

  const createNewTemplate = () => {
    const newTemplate: BriefingTemplate = {
      id: Date.now().toString(),
      name: "New Briefing Template",
      category: "General",
      keyPoints: [""],
      safetyPoints: [""],
      equipment: [""],
      duration: "10 minutes",
      teamSize: "2-4 personnel"
    };
    setTemplates(prev => [...prev, newTemplate]);
    setSelectedTemplate(newTemplate);
    setIsEditing(true);
  };

  const duplicateTemplate = (template: BriefingTemplate) => {
    const duplicatedTemplate: BriefingTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`
    };
    setTemplates(prev => [...prev, duplicatedTemplate]);
  };

  const updateTemplate = (updatedTemplate: BriefingTemplate) => {
    setTemplates(prev => 
      prev.map(template => 
        template.id === updatedTemplate.id ? updatedTemplate : template
      )
    );
    setSelectedTemplate(updatedTemplate);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Installation": "bg-blue-500",
      "Maintenance": "bg-green-500", 
      "Testing": "bg-purple-500",
      "Safety": "bg-red-500",
      "Emergency": "bg-orange-500",
      "General": "bg-gray-500"
    };
    return colors[category] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-muted-foreground">Loading briefings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Statistics with Touch Targets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MobileGestureHandler onTap={() => setFilterStatus('all')}>
          <Card className="border-primary/30 cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="p-4 text-center min-h-[80px] flex flex-col justify-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary">{briefings.length}</div>
              <div className="text-sm text-muted-foreground">Total Briefings</div>
            </CardContent>
          </Card>
        </MobileGestureHandler>
        
        <MobileGestureHandler onTap={() => setFilterStatus('completed')}>
          <Card className="border-primary/30 cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="p-4 text-center min-h-[80px] flex flex-col justify-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary">
                {briefings.filter(b => b.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </MobileGestureHandler>
        
        <MobileGestureHandler onTap={() => setFilterStatus('upcoming')}>
          <Card className="border-secondary/30 cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="p-4 text-center min-h-[80px] flex flex-col justify-center border border-primary/30">
              <div className="text-2xl lg:text-3xl font-bold text-secondary-foreground">
                {briefings.reduce((total, b) => total + b.attendees.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Attendees</div>
            </CardContent>
          </Card>
        </MobileGestureHandler>
        
        <MobileGestureHandler onTap={() => setFilterStatus('today')}>
          <Card className="border-accent/30 cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="p-4 text-center min-h-[80px] flex flex-col justify-center border border-primary/30">
              <div className="text-2xl lg:text-3xl font-bold text-accent-foreground">
                {briefings.filter(b => new Date(b.briefing_date) >= new Date() && b.status === 'scheduled').length}
              </div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
        </MobileGestureHandler>
      </div>

      {/* Filter and View Controls */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {['all', 'upcoming', 'today', 'completed', 'in_progress'].map((status) => (
                <MobileButton
                  key={status}
                  size="sm"
                  variant={filterStatus === status ? "elec" : "outline"}
                  onClick={() => setFilterStatus(status)}
                  className="capitalize"
                >
                  {status === 'all' ? 'All' : status.replace('_', ' ')}
                </MobileButton>
              ))}
            </div>
            
            <div className="flex gap-2">
              <MobileButton
                size="sm"
                variant={viewMode === 'list' ? "elec" : "outline"}
                onClick={() => setViewMode('list')}
                icon={<FileText className="h-4 w-4" />}
              />
              <MobileButton
                size="sm"
                variant={viewMode === 'grid' ? "elec" : "outline"}
                onClick={() => setViewMode('grid')}
                icon={<Users className="h-4 w-4" />}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Scheduled Briefings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Scheduled Team Briefings ({filteredBriefings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBriefings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {filterStatus === 'all' 
                  ? "No briefings scheduled yet. Create one from a template below."
                  : `No briefings found for filter: ${filterStatus.replace('_', ' ')}`
                }
              </p>
              {filterStatus !== 'all' && (
                <MobileButton 
                  variant="outline" 
                  onClick={() => setFilterStatus('all')}
                >
                  Show All Briefings
                </MobileButton>
              )}
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "space-y-4"}>
              {filteredBriefings.map((briefing) => (
                <MobileGestureHandler
                  key={briefing.id}
                  onSwipeRight={() => updateBriefingStatus(briefing.id, 'completed')}
                  onLongPress={() => {
                    setSelectedBriefing(briefing);
                    setShowAttendanceModal(true);
                  }}
                >
                  <Card className="border-border hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getStatusColor(briefing.status)}>
                              {briefing.status.replace('_', ' ')}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {briefing.briefing_date} at {briefing.briefing_time}
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <MobileButton size="sm" variant="ghost" icon={<MoreHorizontal className="h-4 w-4" />} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => updateBriefingStatus(briefing.id, 'in_progress')}>
                                Start Briefing
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateBriefingStatus(briefing.id, 'completed')}>
                                Mark Complete
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateBriefingStatus(briefing.id, 'postponed')}>
                                Postpone
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateBriefingStatus(briefing.id, 'cancelled')}>
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      
                        <div className="space-y-2">
                          <h4 className="font-semibold leading-tight">{briefing.briefing_name}</h4>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {briefing.location}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <span className="font-medium">{briefing.attendees.length}</span> attendees
                            </div>
                            <div className="flex gap-2">
                              <MobileButton 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedBriefing(briefing);
                                  setShowAttendanceModal(true);
                                }}
                                icon={<UserCheck className="h-4 w-4" />}
                              >
                                Attendance
                              </MobileButton>
                            </div>
                          </div>
                          
                          {briefing.attendees.length > 0 && (
                            <div className="text-xs text-muted-foreground truncate">
                              {briefing.attendees.map(a => a.name).join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MobileGestureHandler>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Header and Actions */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg sm:text-xl">
              <Users className="h-5 w-5" />
              Team Briefing Templates
            </CardTitle>
            <MobileButton 
              onClick={createNewTemplate} 
              variant="elec"
              size="default"
              icon={<Plus className="h-4 w-4" />}
            >
              New Template
            </MobileButton>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Pre-built safety briefing templates to ensure consistent communication 
            and safety standards across all your electrical projects.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Template List */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white">Available Templates ({templates.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`border-elec-yellow/30 cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id ? 'bg-elec-yellow/10' : 'hover:bg-elec-gray/80'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                   <CardContent className="p-0">
                     <div className="flex items-start justify-between p-4 pb-3">
                       <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-3">
                           <Badge className={`${getCategoryColor(template.category)} text-white text-xs px-2 py-1`}>
                             {template.category}
                           </Badge>
                         </div>
                         <h4 className="font-semibold text-base text-foreground mb-2 leading-tight">{template.name}</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                           <div className="flex items-center gap-1">
                             <Clock className="h-3 w-3" />
                             <span>{template.duration}</span>
                           </div>
                           <div className="flex items-center gap-1">
                             <Users className="h-3 w-3" />
                             <span>{template.teamSize}</span>
                           </div>
                         </div>
                       </div>
                       <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                           <Button
                             size="sm"
                             variant="ghost"
                             className="min-h-[44px] min-w-[44px] touch-manipulation p-0 hover:bg-transparent shrink-0"
                             onClick={(e) => e.stopPropagation()}
                           >
                             <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                           </Button>
                         </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="end" 
                            className="w-48 z-50 bg-popover border border-border shadow-lg"
                            sideOffset={5}
                          >
                            <DropdownMenuItem
                              className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                duplicateTemplate(template);
                              }}
                            >
                              <Copy className="h-4 w-4" />
                              Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTemplate(template);
                                setIsEditing(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTemplate(template);
                                setNewBriefing(prev => ({ ...prev, template_id: template.id }));
                                setShowNewBriefingForm(true);
                              }}
                            >
                              <Plus className="h-4 w-4" />
                              Use Template
                            </DropdownMenuItem>
                         </DropdownMenuContent>
                       </DropdownMenu>
                     </div>
                      <div className="border-t border-border/50 px-3 sm:px-4 py-2 sm:py-3 bg-muted/30">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                            <span className="flex items-center gap-1 text-blue-400 min-w-fit">
                              <FileText className="h-3 w-3 flex-shrink-0" />
                              <span className="whitespace-nowrap">{template.keyPoints.length} key points</span>
                            </span>
                            <span className="flex items-center gap-1 text-red-400 min-w-fit">
                              <span className="text-xs">⚠</span>
                              <span className="whitespace-nowrap">{template.safetyPoints.length} safety points</span>
                            </span>
                          </div>
                          {template.equipment && template.equipment.length > 0 && (
                            <span className="text-muted-foreground flex items-center gap-1 min-w-fit">
                              <span className="text-xs">🔧</span>
                              <span className="whitespace-nowrap">{template.equipment.length} equipment</span>
                            </span>
                          )}
                        </div>
                     </div>
                   </CardContent>
                 </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Template Preview/Editor */}
        <Card className="border-elec-yellow/20 bg-elec-gray animate-fade-in">
          <CardHeader className="border-b border-elec-yellow/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  {selectedTemplate ? (isEditing ? 'Edit Template' : 'Template Preview') : 'Select Template'}
                </CardTitle>
                {selectedTemplate && (
                  <p className="text-sm text-muted-foreground">
                    {isEditing ? 'Modify the template details below' : 'Review template structure and content'}
                  </p>
                )}
              </div>
              {selectedTemplate && (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  {isEditing ? (
                    <>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-elec-yellow text-black hover:bg-elec-yellow/80 w-full sm:w-auto"
                      >
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setIsEditing(true)}
                        className="hover-scale w-full sm:w-auto"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="hover-scale w-full sm:w-auto"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {!selectedTemplate ? (
              <div className="text-center py-12">
                <div className="max-w-sm mx-auto space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-elec-yellow/10 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-elec-yellow" />
                  </div>
                  <h3 className="text-lg font-medium text-white">No Template Selected</h3>
                  <p className="text-muted-foreground">
                    Choose a template from the list to preview or edit its content.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Template Overview Section */}
                <div className="bg-elec-dark/50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow"></div>
                    <h3 className="text-sm font-medium text-elec-yellow uppercase tracking-wide">Template Overview</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Template Name</Label>
                      {isEditing ? (
                        <Input
                          value={selectedTemplate.name}
                          onChange={(e) => updateTemplate({
                            ...selectedTemplate,
                            name: e.target.value
                          })}
                          className="bg-background border-border/50 focus:border-elec-yellow"
                        />
                      ) : (
                        <div className="p-3 bg-elec-dark rounded-md border border-border/30">
                          <span className="text-white font-medium">{selectedTemplate.name}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</Label>
                      {isEditing ? (
                        <select
                          className="w-full p-3 border border-border/50 rounded-md bg-background focus:border-elec-yellow focus:outline-none"
                          value={selectedTemplate.category}
                          onChange={(e) => updateTemplate({
                            ...selectedTemplate,
                            category: e.target.value
                          })}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="p-3 bg-elec-dark rounded-md border border-border/30">
                          <Badge className={`${getCategoryColor(selectedTemplate.category)} text-white text-xs`}>
                            {selectedTemplate.category}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Duration</Label>
                      {isEditing ? (
                        <Input
                          value={selectedTemplate.duration}
                          onChange={(e) => updateTemplate({
                            ...selectedTemplate,
                            duration: e.target.value
                          })}
                          className="bg-background border-border/50 focus:border-elec-yellow"
                        />
                      ) : (
                        <div className="p-3 bg-elec-dark rounded-md border border-border/30 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-elec-yellow" />
                          <span className="text-white">{selectedTemplate.duration}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Team Size</Label>
                      {isEditing ? (
                        <Input
                          value={selectedTemplate.teamSize}
                          onChange={(e) => updateTemplate({
                            ...selectedTemplate,
                            teamSize: e.target.value
                          })}
                          className="bg-background border-border/50 focus:border-elec-yellow"
                        />
                      ) : (
                        <div className="p-3 bg-elec-dark rounded-md border border-border/30 flex items-center gap-2">
                          <Users className="h-4 w-4 text-elec-yellow" />
                          <span className="text-white">{selectedTemplate.teamSize}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key Points */}
                <div>
                  <Label className="text-sm font-medium">Key Briefing Points</Label>
                  <div className="mt-2 space-y-2">
                    {selectedTemplate.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        {isEditing ? (
                          <Textarea
                            value={point}
                            onChange={(e) => {
                              const newPoints = [...selectedTemplate.keyPoints];
                              newPoints[index] = e.target.value;
                              updateTemplate({
                                ...selectedTemplate,
                                keyPoints: newPoints
                              });
                            }}
                            rows={2}
                            className="flex-1"
                          />
                        ) : (
                          <span className="text-sm">{point}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety Points */}
                <div>
                  <Label className="text-sm font-medium">Critical Safety Points</Label>
                  <div className="mt-2 space-y-2">
                    {selectedTemplate.safetyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">⚠</span>
                        {isEditing ? (
                          <Textarea
                            value={point}
                            onChange={(e) => {
                              const newPoints = [...selectedTemplate.safetyPoints];
                              newPoints[index] = e.target.value;
                              updateTemplate({
                                ...selectedTemplate,
                                safetyPoints: newPoints
                              });
                            }}
                            rows={2}
                            className="flex-1"
                          />
                        ) : (
                          <span className="text-sm">{point}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment List */}
                <div>
                  <Label className="text-sm font-medium">Required Equipment</Label>
                  <div className="mt-2 space-y-2">
                    {selectedTemplate.equipment.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">🔧</span>
                        {isEditing ? (
                          <Input
                            value={item}
                            onChange={(e) => {
                              const newEquipment = [...selectedTemplate.equipment];
                              newEquipment[index] = e.target.value;
                              updateTemplate({
                                ...selectedTemplate,
                                equipment: newEquipment
                              });
                            }}
                          />
                        ) : (
                          <span className="text-sm">{item}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Attendance Modal */}
      <Drawer open={showAttendanceModal} onOpenChange={setShowAttendanceModal}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="text-center">Manage Attendance</DrawerTitle>
          </DrawerHeader>
          {selectedBriefing && (
            <div className="p-4 space-y-6">
              {/* Briefing Info Card */}
              <Card className="border-border">
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-semibold">{selectedBriefing.briefing_name}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {selectedBriefing.briefing_date} at {selectedBriefing.briefing_time}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {selectedBriefing.location}
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Method Toggle */}
              <div className="flex justify-center">
                <div className="flex bg-muted rounded-lg p-1">
                  {['list', 'qr', 'camera'].map((mode) => (
                    <MobileButton
                      key={mode}
                      size="sm"
                      variant={attendanceView === mode ? "elec" : "ghost"}
                      onClick={() => setAttendanceView(mode as any)}
                      className="capitalize"
                      icon={
                        mode === 'list' ? <Users className="h-4 w-4" /> :
                        mode === 'qr' ? <QrCode className="h-4 w-4" /> :
                        <Camera className="h-4 w-4" />
                      }
                    >
                      {mode === 'qr' ? 'QR Code' : mode}
                    </MobileButton>
                  ))}
                </div>
              </div>

              {/* Attendance Content */}
              {attendanceView === 'list' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">
                      Attendees ({selectedBriefing.attendees.length})
                    </Label>
                    <Badge variant="secondary">
                      {selectedBriefing.attendees.length} present
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedBriefing.attendees.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No attendees yet</p>
                      </div>
                    ) : (
                      selectedBriefing.attendees.map((attendee, index) => (
                        <Card key={index} className="border-border">
                          <CardContent className="p-3 flex justify-between items-center">
                            <div className="flex-1">
                              <span className="font-medium">{attendee.name}</span>
                              {attendee.timestamp && (
                                <div className="text-xs text-muted-foreground">
                                  Signed in: {new Date(attendee.timestamp).toLocaleString()}
                                </div>
                              )}
                            </div>
                            {attendee.photo && (
                              <Camera className="h-4 w-4 text-muted-foreground" />
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>

                  {/* Add Attendee */}
                  <div className="space-y-3">
                    <MobileInput
                      label="Add New Attendee"
                      placeholder="Enter attendee name..."
                      value={newAttendee}
                      onChange={(e) => setNewAttendee(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addAttendee()}
                    />
                    <div className="flex gap-2">
                      <MobileButton
                        onClick={() => addAttendee()}
                        disabled={!newAttendee.trim()}
                        variant="elec"
                        size="wide"
                        icon={<UserCheck className="h-4 w-4" />}
                      >
                        Add Attendee
                      </MobileButton>
                      <MobileButton
                        onClick={() => addAttendee(true)}
                        disabled={!newAttendee.trim()}
                        variant="outline"
                        icon={<Camera className="h-4 w-4" />}
                      >
                        With Photo
                      </MobileButton>
                    </div>
                  </div>
                </div>
              )}

              {attendanceView === 'qr' && (
                <div className="text-center space-y-4">
                  <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">QR Code Check-in</p>
                    <p className="text-sm text-muted-foreground">
                      Team members can scan this code to sign in
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Code: {selectedBriefing.qr_code || 'Generating...'}
                    </p>
                  </div>
                </div>
              )}

              {attendanceView === 'camera' && (
                <div className="text-center space-y-4">
                  <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                    <Camera className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Photo Attendance</p>
                    <p className="text-sm text-muted-foreground">
                      Capture team photo for attendance record
                    </p>
                    <MobileButton 
                      variant="elec" 
                      icon={<Camera className="h-4 w-4" />}
                    >
                      Capture Group Photo
                    </MobileButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* New Briefing Form Modal */}
      <Dialog open={showNewBriefingForm} onOpenChange={setShowNewBriefingForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule New Briefing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="briefing-name">Briefing Name *</Label>
                <Input
                  id="briefing-name"
                  value={newBriefing.briefing_name}
                  onChange={(e) => setNewBriefing(prev => ({ ...prev, briefing_name: e.target.value }))}
                  placeholder="Enter briefing name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newBriefing.location}
                  onChange={(e) => setNewBriefing(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="briefing-date">Date</Label>
                <Input
                  id="briefing-date"
                  type="date"
                  value={newBriefing.briefing_date}
                  onChange={(e) => setNewBriefing(prev => ({ ...prev, briefing_date: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="briefing-time">Time</Label>
                <Input
                  id="briefing-time"
                  type="time"
                  value={newBriefing.briefing_time}
                  onChange={(e) => setNewBriefing(prev => ({ ...prev, briefing_time: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={newBriefing.notes}
                onChange={(e) => setNewBriefing(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional notes for this briefing..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowNewBriefingForm(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  const template = templates.find(t => t.id === newBriefing.template_id);
                  if (template) createBriefingFromTemplate(template);
                }}
                disabled={!newBriefing.briefing_name.trim() || !newBriefing.location.trim()}
                className="w-full sm:w-auto"
              >
                Schedule Briefing
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamBriefingTemplates;
