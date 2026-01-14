import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { type Briefing } from "@/hooks/useBriefings";
import { generateBriefingQRData } from "@/hooks/useBriefingSignatures";

// Teams webhook card format
interface TeamsAdaptiveCard {
  type: string;
  attachments: Array<{
    contentType: string;
    content: {
      $schema: string;
      type: string;
      version: string;
      body: Array<{
        type: string;
        text?: string;
        weight?: string;
        size?: string;
        wrap?: boolean;
        facts?: Array<{ title: string; value: string }>;
        columns?: Array<{ type: string; width: string; items: any[] }>;
      }>;
      actions?: Array<{
        type: string;
        title: string;
        url: string;
      }>;
    };
  }>;
}

/**
 * Build Microsoft Teams Adaptive Card for briefing notification
 */
function buildTeamsCard(briefing: Briefing): TeamsAdaptiveCard {
  const signOffUrl = generateBriefingQRData(briefing.id);

  return {
    type: "message",
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          type: "AdaptiveCard",
          version: "1.4",
          body: [
            {
              type: "TextBlock",
              text: "📋 Team Briefing",
              weight: "Bolder",
              size: "Large",
            },
            {
              type: "TextBlock",
              text: briefing.title,
              weight: "Bolder",
              size: "Medium",
              wrap: true,
            },
            {
              type: "FactSet",
              facts: [
                ...(briefing.date
                  ? [
                      {
                        title: "Date",
                        value: new Date(briefing.date).toLocaleDateString("en-GB", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                      },
                    ]
                  : []),
                ...(briefing.time ? [{ title: "Time", value: briefing.time }] : []),
                ...(briefing.location ? [{ title: "Location", value: briefing.location }] : []),
                ...(briefing.presenter ? [{ title: "Presenter", value: briefing.presenter }] : []),
                ...(briefing.risk_level
                  ? [
                      {
                        title: "Risk Level",
                        value:
                          briefing.risk_level.charAt(0).toUpperCase() + briefing.risk_level.slice(1),
                      },
                    ]
                  : []),
              ],
            },
            {
              type: "TextBlock",
              text: "Please scan the QR code or click the link below to sign off on this briefing.",
              wrap: true,
            },
          ],
          actions: [
            {
              type: "Action.OpenUrl",
              title: "Sign Off Now",
              url: signOffUrl,
            },
          ],
        },
      },
    ],
  };
}

/**
 * Send briefing notification to Microsoft Teams webhook
 */
export function useSendToTeams() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      briefing,
      webhookUrl,
    }: {
      briefing: Briefing;
      webhookUrl: string;
    }): Promise<void> => {
      // Validate webhook URL
      if (!webhookUrl || !webhookUrl.includes("webhook.office.com")) {
        throw new Error("Invalid Microsoft Teams webhook URL");
      }

      const card = buildTeamsCard(briefing);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      });

      if (!response.ok) {
        throw new Error(`Teams webhook failed: ${response.statusText}`);
      }
    },
    onSuccess: () => {
      toast({
        title: "Sent to Teams",
        description: "Briefing notification sent to your Teams channel.",
      });
    },
    onError: (error) => {
      toast({
        title: "Teams notification failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

/**
 * Copy shareable link to clipboard
 */
export function useCopyBriefingLink() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyLink = async (briefingId: string) => {
    const link = generateBriefingQRData(briefingId);
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Sign-off link copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return { copyLink, copied };
}

/**
 * Share briefing via Web Share API
 */
export function useShareBriefing() {
  const { toast } = useToast();

  const share = async (briefing: Briefing) => {
    const signOffUrl = generateBriefingQRData(briefing.id);

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Sign-off: ${briefing.title}`,
          text: `Please sign off on the briefing: ${briefing.title}`,
          url: signOffUrl,
        });
      } catch {
        // User cancelled or share failed - ignore
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(signOffUrl);
      toast({
        title: "Link copied",
        description: "Share not available - link copied to clipboard instead.",
      });
    }
  };

  return { share };
}

/**
 * Store user's Teams webhook URL in their profile
 */
export function useSaveTeamsWebhook() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (webhookUrl: string): Promise<void> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Store in user metadata or a settings table
      // For now, we'll use the profile table if it has a webhooks field
      // Otherwise store in localStorage as a simple solution
      localStorage.setItem("teams_webhook_url", webhookUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams-webhook"] });
      toast({
        title: "Webhook saved",
        description: "Your Teams webhook URL has been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

/**
 * Get saved Teams webhook URL
 */
export function useTeamsWebhook() {
  return useQuery({
    queryKey: ["teams-webhook"],
    queryFn: async (): Promise<string | null> => {
      return localStorage.getItem("teams_webhook_url");
    },
  });
}
