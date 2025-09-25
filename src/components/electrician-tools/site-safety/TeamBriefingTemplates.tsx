
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, FileText, Download, Plus, Edit, Copy, Clock, UserCheck, Loader2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  attendees: Array<{ name: string; signature?: string; timestamp?: string }>;
  key_points: string[];
  safety_points: string[];
  equipment_required: string[];
  duration_minutes: number;
  notes: string;
  completed: boolean;
  created_at: string;
}

const TeamBriefingTemplates = () => {
  const [briefings, setBriefings] = useState<TeamBriefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedBriefing, setSelectedBriefing] = useState<TeamBriefing | null>(null);
  const [newAttendee, setNewAttendee] = useState("");
  
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
        attendees: Array.isArray(item.attendees) ? item.attendees as Array<{ name: string; signature?: string; timestamp?: string }> : [],
        key_points: item.key_points || [],
        safety_points: item.safety_points || [],
        equipment_required: item.equipment_required || [],
        duration_minutes: item.duration_minutes || 10,
        notes: item.notes || ""
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

      setBriefings(prev => [{
        ...data,
        attendees: Array.isArray(data.attendees) ? data.attendees as Array<{ name: string; signature?: string; timestamp?: string }> : [],
        key_points: data.key_points || [],
        safety_points: data.safety_points || [],
        equipment_required: data.equipment_required || [],
        duration_minutes: data.duration_minutes || 10,
        notes: data.notes || ""
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

  const addAttendee = async () => {
    if (!selectedBriefing || !newAttendee.trim()) return;

    try {
      const updatedAttendees = [
        ...selectedBriefing.attendees,
        { 
          name: newAttendee, 
          timestamp: new Date().toISOString() 
        }
      ];

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

  const markBriefingComplete = async (briefingId: string) => {
    try {
      const { error } = await supabase
        .from('team_briefings')
        .update({ completed: true })
        .eq('id', briefingId);

      if (error) throw error;

      setBriefings(prev => prev.map(b => 
        b.id === briefingId ? { ...b, completed: true } : b
      ));

      toast({
        title: "Success",
        description: "Briefing marked as complete",
        variant: "success"
      });
    } catch (error) {
      console.error('Error completing briefing:', error);
      toast({
        title: "Error",
        description: "Failed to complete briefing",
        variant: "destructive"
      });
    }
  };

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
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-400">{briefings.length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Total Briefings</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-400">
              {briefings.filter(b => b.completed).length}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">
              {briefings.reduce((total, b) => total + b.attendees.length, 0)}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Total Attendees</div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-400">
              {briefings.filter(b => new Date(b.briefing_date) >= new Date()).length}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Upcoming</div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Briefings */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Scheduled Team Briefings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {briefings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No briefings scheduled yet. Create one from a template below.
            </div>
          ) : (
            <div className="space-y-4">
              {briefings.map((briefing) => (
                <Card key={briefing.id} className="border-elec-yellow/30">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Badge className={briefing.completed ? "bg-green-500" : "bg-blue-500"}>
                            {briefing.completed ? "Completed" : "Scheduled"}
                          </Badge>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {briefing.briefing_date} at {briefing.briefing_time}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="min-h-[44px] w-full sm:w-auto touch-manipulation"
                            onClick={() => {
                              setSelectedBriefing(briefing);
                              setShowAttendanceModal(true);
                            }}
                          >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Attendance
                          </Button>
                          {!briefing.completed && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="min-h-[44px] w-full sm:w-auto touch-manipulation"
                              onClick={() => markBriefingComplete(briefing.id)}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm sm:text-base leading-tight">{briefing.briefing_name}</h4>
                        <div className="text-xs sm:text-sm text-muted-foreground">📍 {briefing.location}</div>
                        <div className="text-xs sm:text-sm">
                          <span className="font-medium">{briefing.attendees.length}</span> attendees
                          {briefing.attendees.length > 0 && (
                            <div className="mt-1 text-xs text-muted-foreground break-words">
                              {briefing.attendees.map(a => a.name).join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
            <Button 
              onClick={createNewTemplate} 
              variant="outline"
              className="min-h-[44px] w-full sm:w-auto touch-manipulation"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
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
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(template.category)}>
                            {template.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {template.duration} • {template.teamSize}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {template.keyPoints.length} key points, {template.safetyPoints.length} safety points
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-1 ml-0 sm:ml-2 mt-2 sm:mt-0">
                        <Button
                          size="sm"
                          variant="outline"
                          className="min-h-[44px] touch-manipulation"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateTemplate(template);
                          }}
                        >
                          <Copy className="h-4 w-4 mr-1 sm:mr-0" />
                          <span className="sm:hidden">Copy</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="min-h-[44px] touch-manipulation"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template);
                            setIsEditing(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1 sm:mr-0" />
                          <span className="sm:hidden">Edit</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="min-h-[44px] touch-manipulation"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template);
                            setNewBriefing(prev => ({ ...prev, template_id: template.id }));
                            setShowNewBriefingForm(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1 sm:mr-0" />
                          <span className="sm:hidden">Use Template</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Template Preview/Editor */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                {selectedTemplate ? (isEditing ? 'Edit Template' : 'Template Preview') : 'Select Template'}
              </CardTitle>
              {selectedTemplate && (
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button size="sm" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" variant="outline">
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!selectedTemplate ? (
              <div className="text-center py-8 text-muted-foreground">
                Select a template from the list to preview or edit it.
              </div>
            ) : (
              <div className="space-y-6">
                {/* Template Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Template Name</Label>
                    {isEditing ? (
                      <Input
                        value={selectedTemplate.name}
                        onChange={(e) => updateTemplate({
                          ...selectedTemplate,
                          name: e.target.value
                        })}
                      />
                    ) : (
                      <div className="p-2 bg-elec-dark rounded">{selectedTemplate.name}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">Category</Label>
                    {isEditing ? (
                      <select
                        className="w-full p-2 border rounded-md bg-background"
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
                      <div className="p-2 bg-elec-dark rounded">{selectedTemplate.category}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">Duration</Label>
                    {isEditing ? (
                      <Input
                        value={selectedTemplate.duration}
                        onChange={(e) => updateTemplate({
                          ...selectedTemplate,
                          duration: e.target.value
                        })}
                      />
                    ) : (
                      <div className="p-2 bg-elec-dark rounded">{selectedTemplate.duration}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">Team Size</Label>
                    {isEditing ? (
                      <Input
                        value={selectedTemplate.teamSize}
                        onChange={(e) => updateTemplate({
                          ...selectedTemplate,
                          teamSize: e.target.value
                        })}
                      />
                    ) : (
                      <div className="p-2 bg-elec-dark rounded">{selectedTemplate.teamSize}</div>
                    )}
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

      {/* Attendance Modal */}
      <Dialog open={showAttendanceModal} onOpenChange={setShowAttendanceModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Briefing Attendance</DialogTitle>
          </DialogHeader>
          {selectedBriefing && (
            <div className="space-y-4">
              <div className="text-sm">
                <strong>{selectedBriefing.briefing_name}</strong>
                <br />
                {selectedBriefing.briefing_date} at {selectedBriefing.briefing_time}
              </div>
              
              <div className="space-y-2">
                <Label>Current Attendees ({selectedBriefing.attendees.length})</Label>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {selectedBriefing.attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{attendee.name}</span>
                      {attendee.timestamp && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(attendee.timestamp).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add attendee name..."
                  value={newAttendee}
                  onChange={(e) => setNewAttendee(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && addAttendee()}
                />
                <Button onClick={addAttendee} disabled={!newAttendee.trim()}>
                  Add
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
