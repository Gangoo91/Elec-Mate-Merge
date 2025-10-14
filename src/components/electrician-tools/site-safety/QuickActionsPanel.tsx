import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { FileDown, Share2, Copy, FileStack } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

interface QuickActionsPanelProps {
  briefing: any;
  onRefresh: () => void;
}

export const QuickActionsPanel = ({ briefing, onRefresh }: QuickActionsPanelProps) => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setGenerating(true);
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.text(briefing.briefing_name || 'Team Briefing', 20, 20);
      
      doc.setFontSize(12);
      doc.text(`Location: ${briefing.location}`, 20, 35);
      doc.text(`Date: ${new Date(briefing.briefing_date).toLocaleDateString('en-GB')}`, 20, 42);
      doc.text(`Time: ${briefing.briefing_time}`, 20, 49);
      
      // Content
      doc.setFontSize(14);
      doc.text('Briefing Description:', 20, 65);
      doc.setFontSize(11);
      const descLines = doc.splitTextToSize(briefing.briefing_description || '', 170);
      doc.text(descLines, 20, 72);
      
      // Attendees
      if (briefing.attendees && briefing.attendees.length > 0) {
        doc.setFontSize(14);
        doc.text('Attendees:', 20, 110);
        doc.setFontSize(11);
        briefing.attendees.forEach((attendee: any, idx: number) => {
          doc.text(`${idx + 1}. ${attendee.name}`, 25, 117 + (idx * 7));
        });
      }
      
      doc.save(`briefing-${briefing.id}.pdf`);
      
      toast({
        title: "PDF Generated",
        description: "Briefing PDF downloaded successfully",
      });
    } catch (error: any) {
      console.error('PDF generation error:', error);
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/briefing/${briefing.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: briefing.briefing_name,
          text: `Team Briefing: ${briefing.briefing_name}`,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied",
        description: "Briefing link copied to clipboard",
      });
    }
  };

  const handleClone = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { id, created_at, updated_at, status, pdf_url, ...cloneData } = briefing;
      
      const { error } = await supabase
        .from('team_briefings')
        .insert([{
          ...cloneData,
          briefing_name: `${briefing.briefing_name} (Copy)`,
          status: 'scheduled',
          completed: false,
        }]);

      if (error) throw error;

      toast({
        title: "Briefing Cloned",
        description: "A copy has been created",
      });
      
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Clone Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSaveAsTemplate = async () => {
    try {
      const { error } = await supabase
        .from('briefing_templates')
        .insert([{
          name: briefing.briefing_name,
          description: briefing.briefing_description?.substring(0, 200) || '',
          template_type: briefing.briefing_type,
          template_schema: {
            work_scope: briefing.work_scope,
            hazards: briefing.identified_hazards,
            safety_points: briefing.safety_points,
          },
          is_default: false,
        }]);

      if (error) throw error;

      toast({
        title: "Template Saved",
        description: "Briefing saved as a reusable template",
      });
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-card/50 border-primary/20 p-4">
      <h3 className="text-sm font-semibold text-elec-light mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        <MobileButton
          variant="outline"
          size="sm"
          onClick={handleGeneratePDF}
          loading={generating}
          icon={<FileDown className="h-4 w-4" />}
        >
          PDF
        </MobileButton>
        
        <MobileButton
          variant="outline"
          size="sm"
          onClick={handleShare}
          icon={<Share2 className="h-4 w-4" />}
        >
          Share
        </MobileButton>
        
        <MobileButton
          variant="outline"
          size="sm"
          onClick={handleClone}
          icon={<Copy className="h-4 w-4" />}
        >
          Clone
        </MobileButton>
        
        <MobileButton
          variant="outline"
          size="sm"
          onClick={handleSaveAsTemplate}
          icon={<FileStack className="h-4 w-4" />}
        >
          Template
        </MobileButton>
      </div>
    </Card>
  );
};
