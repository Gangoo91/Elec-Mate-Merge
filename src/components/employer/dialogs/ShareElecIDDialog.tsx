import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useGenerateShareableLink } from "@/hooks/useElecId";
import { ElecIdProfile } from "@/services/elecIdService";
import {
  QrCode,
  Link2,
  Copy,
  Mail,
  Shield,
  Eye,
  Loader2
} from "lucide-react";

interface ShareElecIDDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ElecIdProfile;
}

export const ShareElecIDDialog = ({ open, onOpenChange, profile }: ShareElecIDDialogProps) => {
  const generateLink = useGenerateShareableLink();
  const [shareSettings, setShareSettings] = useState({
    includePhoto: true,
    includeCertifications: true,
    includeTraining: true,
    includeWorkHistory: true,
    includeSkills: true,
    includeContact: false,
  });
  const [recipientEmail, setRecipientEmail] = useState("");
  const [expiryDays, setExpiryDays] = useState("30");
  const [shareLink, setShareLink] = useState<string | null>(profile.shareable_link || null);
  
  // Generate link on first open if none exists
  useEffect(() => {
    if (open && !shareLink && profile.id) {
      handleGenerateLink();
    }
  }, [open, profile.id]);
  
  const handleGenerateLink = async () => {
    try {
      const link = await generateLink.mutateAsync(profile.id);
      setShareLink(link);
    } catch (error) {
      console.error("Error generating link:", error);
      toast({
        title: "Error",
        description: "Could not generate shareable link.",
        variant: "destructive",
      });
    }
  };
  
  const displayLink = shareLink || `https://elec-id.app/profile/${profile.elec_id_number}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(displayLink);
    toast({
      title: "Link Copied",
      description: "Share link has been copied to clipboard.",
    });
  };
  
  const handleSendEmail = () => {
    if (!recipientEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a recipient email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Open mailto with pre-filled content
    const subject = encodeURIComponent(`Elec-ID Profile: ${profile.employee?.name || 'Worker'}`);
    const body = encodeURIComponent(`Please find the Elec-ID credentials for ${profile.employee?.name || 'the worker'}:\n\n${displayLink}`);
    window.open(`mailto:${recipientEmail}?subject=${subject}&body=${body}`);
    
    toast({
      title: "Profile Shared",
      description: `Opening email to share with ${recipientEmail}`,
    });
    setRecipientEmail("");
  };
  
  const handleGenerateQR = () => {
    toast({
      title: "QR Code Generated",
      description: "Scan this code to view the Elec-ID profile.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Share Elec-ID Profile
          </DialogTitle>
          <DialogDescription>
            Share {profile.employee?.name || 'this worker'}'s portable Elec-ID with employers or clients
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="link" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="link" className="flex-1 gap-1.5 h-11 touch-manipulation">
              <Link2 className="h-4 w-4" />
              Link
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex-1 gap-1.5 h-11 touch-manipulation">
              <QrCode className="h-4 w-4" />
              QR Code
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="mt-4 space-y-4">
            {/* Share Link */}
            <div className="space-y-2">
              <Label>Shareable Link</Label>
              <div className="flex gap-2">
                <Input 
                  value={displayLink} 
                  readOnly 
                  className="font-mono text-xs"
                />
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {generateLink.isPending && (
                <p className="text-xs text-foreground/70 flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Generating shareable link...
                </p>
              )}
              {!shareLink && !generateLink.isPending && (
                <Button variant="ghost" size="sm" onClick={handleGenerateLink}>
                  Generate new link
                </Button>
              )}
            </div>
            
            {/* Link Expiry */}
            <div className="space-y-2">
              <Label>Link Expires After</Label>
              <select 
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
                <option value="never">Never</option>
              </select>
            </div>
            
            {/* Email Share */}
            <div className="space-y-2">
              <Label>Send via Email</Label>
              <div className="flex gap-2">
                <Input 
                  type="email"
                  placeholder="employer@company.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
                <Button onClick={handleSendEmail} className="gap-2">
                  <Mail className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="qr" className="mt-4 space-y-4">
            {/* QR Code Display */}
            <Card className="bg-muted/50">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-48 h-48 bg-background rounded-lg border-2 border-dashed border-elec-yellow/30 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <QrCode className="h-24 w-24 text-elec-yellow/50 mx-auto" />
                    <p className="text-xs text-foreground/70 mt-2">QR Code Preview</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/70 text-center">
                  Scan to view {profile.employee?.name?.split(' ')[0] || 'worker'}'s Elec-ID profile
                </p>
                <Button onClick={handleGenerateQR} className="mt-4 gap-2 h-11 touch-manipulation">
                  <QrCode className="h-4 w-4" />
                  Download QR Code
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
        </Tabs>
        
        {/* Privacy Settings */}
        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm font-medium mb-3 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            What to Include
          </p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries({
              includeCertifications: "Certifications",
              includeTraining: "Training Records",
              includeWorkHistory: "Work History",
              includeSkills: "Skills & Specialisms",
              includeContact: "Contact Details",
            }).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <Checkbox 
                  id={key}
                  checked={shareSettings[key as keyof typeof shareSettings]}
                  onCheckedChange={(checked) => 
                    setShareSettings(prev => ({ ...prev, [key]: checked }))
                  }
                />
                <Label htmlFor={key} className="text-sm font-normal cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
