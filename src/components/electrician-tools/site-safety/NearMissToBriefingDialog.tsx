import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Users, AlertTriangle, Sparkles, FileText } from "lucide-react";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface NearMissReport {
  id: string;
  incident_date: string;
  incident_time: string;
  location: string;
  category: string;
  severity: string;
  description: string;
  potential_consequences: string;
  immediate_actions: string;
  preventive_measures: string;
  photos_attached: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  nearMissReport: NearMissReport;
}

export const NearMissToBriefingDialog = ({ open, onClose, nearMissReport }: Props) => {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [briefingData, setBriefingData] = useState({
    briefingDate: new Date().toISOString().split('T')[0],
    briefingTime: "09:00",
    conductorName: "",
  });

  const handleGenerateAndCreate = async () => {
    setGenerating(true);
    try {
      // Generate AI briefing content
      const { data: aiData, error: aiError } = await supabase.functions.invoke('generate-briefing-from-near-miss', {
        body: { nearMissData: nearMissReport }
      });

      if (aiError) throw aiError;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      // Create team briefing - using array for insert
      const briefingPayload = {
        user_id: user.id,
        template_id: 'near-miss-review',
        briefing_type: 'near-miss-review',
        briefing_name: aiData.content.briefingTitle,
        job_name: aiData.content.briefingTitle,
        briefing_date: briefingData.briefingDate,
        briefing_time: briefingData.briefingTime,
        location: nearMissReport.location,
        conductor_name: briefingData.conductorName || profile?.full_name || user.email || '',
        briefing_description: aiData.content.briefingDescription,
        hazards: aiData.content.hazards,
        safety_warning: aiData.content.safetyWarning,
        identified_hazards: [nearMissReport.category],
        risk_level: nearMissReport.severity.toLowerCase(),
        ai_generated: true,
        ai_prompt_data: {
          nearMissId: nearMissReport.id,
          nearMissCategory: nearMissReport.category,
          nearMissSeverity: nearMissReport.severity,
          aiGeneratedContent: true
        } as any,
        photos: nearMissReport.photos_attached.map(url => ({ url, caption: 'From near miss report' })),
        linked_near_miss_id: nearMissReport.id,
        completed: false,
        created_by_name: profile?.full_name || user.email || '',
        notes: `
**Safety Points:**
${aiData.content.safetyPoints?.map((p: string) => `• ${p}`).join('\n') || ''}

**Discussion Questions:**
${aiData.content.discussionQuestions?.map((q: string) => `• ${q}`).join('\n') || ''}

**Action Items:**
${aiData.content.actionItems?.map((a: string) => `• ${a}`).join('\n') || ''}

**Regulations:**
${aiData.content.regulations || ''}

**Required PPE:**
${aiData.content.requiredPPE || ''}
        `.trim()
      };

      const { data: briefing, error: briefingError } = await supabase
        .from('team_briefings')
        .insert([briefingPayload])
        .select()
        .single();

      if (briefingError) throw briefingError;

      // Update near miss with briefing link
      const { error: updateError } = await supabase
        .from('near_miss_reports')
        .update({
          briefed_to_team: true,
          briefing_id: briefing.id,
          briefing_created_at: new Date().toISOString(),
          status: 'Briefing Scheduled'
        })
        .eq('id', nearMissReport.id);

      if (updateError) throw updateError;

      toast({
        title: "Briefing Created",
        description: "Team safety briefing created successfully from near miss report.",
        variant: "success"
      });

      onClose();
      navigate('/electrician/site-safety?tab=briefings');
    } catch (error) {
      console.error('Error creating briefing:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create briefing",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[85vh]">
        <div className="overflow-y-auto p-6 space-y-4">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Create Team Briefing
            </SheetTitle>
            <SheetDescription>
              Generate a professional safety briefing from this near miss report
            </SheetDescription>
          </SheetHeader>

          {/* Preview Card */}
          <div className="p-4 rounded-lg border border-border/50 bg-muted/50 space-y-2">
            <div className="flex items-start gap-2">
              <AlertTriangle className={`h-5 w-5 mt-0.5 shrink-0 ${
                nearMissReport.severity === 'Critical' ? 'text-destructive' :
                nearMissReport.severity === 'High' ? 'text-orange-500' :
                nearMissReport.severity === 'Medium' ? 'text-yellow-500' :
                'text-green-500'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{nearMissReport.category}</p>
                <p className="text-xs text-muted-foreground truncate">{nearMissReport.location}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {nearMissReport.description}
                </p>
              </div>
            </div>
          </div>

          {/* Briefing Details */}
          <MobileInput
            label="Briefing Date"
            type="date"
            value={briefingData.briefingDate}
            onChange={(e) => setBriefingData(prev => ({ ...prev, briefingDate: e.target.value }))}
          />

          <MobileInput
            label="Briefing Time"
            type="time"
            value={briefingData.briefingTime}
            onChange={(e) => setBriefingData(prev => ({ ...prev, briefingTime: e.target.value }))}
          />

          <MobileInputWrapper
            label="Briefing Conductor (optional)"
            value={briefingData.conductorName}
            onChange={(value) => setBriefingData(prev => ({ ...prev, conductorName: value }))}
            placeholder="Who will conduct this briefing"
            icon={<Users className="h-4 w-4" />}
          />

          <div className="pt-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              The briefing will include:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Professional incident summary</li>
              <li>• Key safety discussion points</li>
              <li>• Preventive action items</li>
              <li>• BS 7671 regulation references</li>
              <li>• Photos from the near miss</li>
            </ul>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={generating}
              className="flex-1 h-11 touch-manipulation"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerateAndCreate}
              disabled={generating}
              className="flex-1 h-11 touch-manipulation"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Create Briefing
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
