import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WhatsAppShareButtonProps {
  projectId: string;
  projectName: string;
  onGenerateLink?: () => Promise<string | null>;
}

export const WhatsAppShareButton = ({
  projectId,
  projectName,
  onGenerateLink,
}: WhatsAppShareButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateShareLink = async () => {
    setIsGenerating(true);

    try {
      let link = shareUrl;

      if (!link) {
        if (onGenerateLink) {
          link = await onGenerateLink();
        } else {
          // Generate share link without database (base64 encoded)
          // For now, create a simple shareable link format
          const shareData = {
            projectId,
            projectName,
            timestamp: Date.now()
          };
          const encoded = btoa(JSON.stringify(shareData));
          link = `${window.location.origin}/shared/design?data=${encoded}`;
        }

        if (link) {
          setShareUrl(link);
        }
      }

      return link;
    } catch (error) {
      console.error('Failed to generate share link:', error);
      toast.error('Failed to generate share link');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const shareViaWhatsApp = async () => {
    const link = await generateShareLink();
    if (!link) return;

    const message = `Check out this electrical installation design: ${projectName}\n\n${link}\n\nCreated with ElecMate Installation Planner`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    
    toast.success('Opening WhatsApp...');
  };

  const copyLink = async () => {
    const link = await generateShareLink();
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success('Link copied to clipboard');
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isGenerating}
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={shareViaWhatsApp}>
          <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
          Share via WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink}>
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
