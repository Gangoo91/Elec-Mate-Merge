/**
 * useWhatsAppShare
 * Reusable hook for sharing documents via WhatsApp.
 * Handles PDF link generation and WhatsApp URL construction.
 */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ShareableDocumentType = 'quote' | 'invoice' | 'eicr' | 'eic' | 'minor-works' | 'fire-alarm' | 'emergency-lighting' | 'solar-pv' | 'pat-testing' | 'ev-charging';

interface WhatsAppShareOptions {
  type: ShareableDocumentType;
  id: string;
  recipientPhone?: string;
  recipientName?: string;
  customMessage?: string;
  documentLabel?: string;
  amount?: number;
}

const MESSAGE_TEMPLATES: Record<string, (opts: WhatsAppShareOptions, link: string) => string> = {
  quote: (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nHere is your quote${opts.documentLabel ? ` for ${opts.documentLabel}` : ''}:\n\n📄 ${opts.documentLabel || 'Your Quote'}${opts.amount ? `\n💷 Total: £${opts.amount.toFixed(2)}` : ''}\n\n📥 View Quote:\n${link}\n\nThank you!`,

  invoice: (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nHere is your invoice:\n\n📄 ${opts.documentLabel || 'Your Invoice'}${opts.amount ? `\n💷 Amount: £${opts.amount.toFixed(2)}` : ''}\n\n📥 Download Invoice:\n${link}\n\nThank you for your business!`,

  eicr: (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your EICR certificate:\n\n📋 ${opts.documentLabel || 'EICR Certificate'}\n\n📥 Download Certificate:\n${link}\n\nKind regards`,

  eic: (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your Electrical Installation Certificate:\n\n📋 ${opts.documentLabel || 'EIC Certificate'}\n\n📥 Download Certificate:\n${link}\n\nKind regards`,

  'minor-works': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your Minor Works Certificate:\n\n📋 ${opts.documentLabel || 'Minor Works Certificate'}\n\n📥 Download Certificate:\n${link}\n\nKind regards`,

  'fire-alarm': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your Fire Alarm Certificate:\n\n📋 ${opts.documentLabel || 'Fire Alarm Certificate'}\n\n📥 Download Certificate:\n${link}\n\nKind regards`,

  'emergency-lighting': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your Emergency Lighting Certificate:\n\n📋 ${opts.documentLabel || 'Emergency Lighting Certificate'}\n\n📥 Download Certificate:\n${link}\n\nKind regards`,

  'solar-pv': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your Solar PV Installation Certificate:\n\n📋 ${opts.documentLabel || 'Solar PV Certificate'}\n\n📥 Download Certificate:\n${link}\n\nKind regards`,

  'pat-testing': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your PAT Testing Certificate:\n\n📋 ${opts.documentLabel || 'PAT Testing Certificate'}\n\n📥 Download Certificate:\n${link}\n\nKind regards`,

  'ev-charging': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your EV Charging Point Installation Certificate:\n\n📋 ${opts.documentLabel || 'EV Charging Certificate'}\n\n📥 Download Certificate:\n${link}\n\nKind regards`,
};

function buildWhatsAppUrl(phone: string | undefined, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  if (phone) {
    // Normalise UK phone numbers
    let normalised = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');
    if (normalised.startsWith('0')) {
      normalised = '+44' + normalised.substring(1);
    }
    if (!normalised.startsWith('+')) {
      normalised = '+44' + normalised;
    }
    return `https://wa.me/${normalised.replace('+', '')}?text=${encodedMessage}`;
  }
  return `https://wa.me/?text=${encodedMessage}`;
}

export function useWhatsAppShare() {
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const { toast } = useToast();

  const shareViaWhatsApp = async (options: WhatsAppShareOptions) => {
    setIsGeneratingLink(true);
    try {
      toast({
        title: 'Preparing link',
        description: 'Generating shareable PDF link for WhatsApp...',
        duration: 5000,
      });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data: linkData, error: linkError } = await supabase.functions.invoke(
        'generate-temporary-pdf-link',
        {
          body: {
            documentId: options.id,
            documentType: options.type,
          },
          headers: { Authorization: `Bearer ${session.access_token}` },
        }
      );

      if (linkError || !linkData?.publicUrl) {
        throw new Error('Failed to generate shareable link');
      }

      const message = options.customMessage ||
        (MESSAGE_TEMPLATES[options.type]?.(options, linkData.publicUrl) ??
          MESSAGE_TEMPLATES.eicr(options, linkData.publicUrl));

      const whatsAppUrl = buildWhatsAppUrl(options.recipientPhone, message);
      window.open(whatsAppUrl, '_blank');

      toast({
        title: 'Opening WhatsApp',
        description: 'Your document is ready to share.',
      });
    } catch (error) {
      console.error('WhatsApp share error:', error);
      toast({
        title: 'Share failed',
        description: 'Could not prepare document for WhatsApp. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingLink(false);
    }
  };

  return { shareViaWhatsApp, isGeneratingLink };
}
