/**
 * useWhatsAppShare
 * Reusable hook for sharing documents via WhatsApp.
 *
 * Native (Capacitor): sends a wa.me text message; WhatsApp surfaces the link
 * preview as an inline document. (Legacy path — unchanged.)
 *
 * Web: never puts a signed URL in the message body. Web Share Level 2
 * attaches the PDF as a file; desktop fallback downloads the PDF and
 * opens WhatsApp Web with the chat text only.
 */

import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  sharePdfToWhatsAppWeb,
  type SharePdfToWhatsAppDocumentType,
} from '@/utils/share-pdf-to-whatsapp-web';

export type ShareableDocumentType = SharePdfToWhatsAppDocumentType;

interface WhatsAppShareOptions {
  type: ShareableDocumentType;
  id: string;
  recipientPhone?: string;
  recipientName?: string;
  customMessage?: string;
  documentLabel?: string;
  amount?: number;
}

const FILENAME_LABELS: Record<ShareableDocumentType, string> = {
  quote: 'Quote',
  invoice: 'Invoice',
  eicr: 'EICR-Certificate',
  eic: 'EIC-Certificate',
  'minor-works': 'Minor-Works-Certificate',
  'fire-alarm': 'Fire-Alarm-Certificate',
  'emergency-lighting': 'Emergency-Lighting-Certificate',
  'solar-pv': 'Solar-PV-Certificate',
  'pat-testing': 'PAT-Testing-Certificate',
  'ev-charging': 'EV-Charging-Certificate',
};

type TemplateFn = (opts: WhatsAppShareOptions, link: string | null) => string;

const linkBlock = (verb: string, link: string | null) =>
  link ? `\n\n📥 ${verb}:\n${link}` : '';

const MESSAGE_TEMPLATES: Record<string, TemplateFn> = {
  quote: (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nHere is your quote${opts.documentLabel ? ` for ${opts.documentLabel}` : ''}:\n\n📄 ${opts.documentLabel || 'Your Quote'}${opts.amount ? `\n💷 Total: £${opts.amount.toFixed(2)}` : ''}${linkBlock('View Quote', link)}\n\nThank you!`,

  invoice: (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nHere is your invoice:\n\n📄 ${opts.documentLabel || 'Your Invoice'}${opts.amount ? `\n💷 Amount: £${opts.amount.toFixed(2)}` : ''}${linkBlock('Download Invoice', link)}\n\nThank you for your business!`,

  eicr: (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your EICR certificate:\n\n📋 ${opts.documentLabel || 'EICR Certificate'}${linkBlock('Download Certificate', link)}\n\nKind regards`,

  eic: (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your Electrical Installation Certificate:\n\n📋 ${opts.documentLabel || 'EIC Certificate'}${linkBlock('Download Certificate', link)}\n\nKind regards`,

  'minor-works': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your Minor Works Certificate:\n\n📋 ${opts.documentLabel || 'Minor Works Certificate'}${linkBlock('Download Certificate', link)}\n\nKind regards`,

  'fire-alarm': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your Fire Alarm Certificate:\n\n📋 ${opts.documentLabel || 'Fire Alarm Certificate'}${linkBlock('Download Certificate', link)}\n\nKind regards`,

  'emergency-lighting': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your Emergency Lighting Certificate:\n\n📋 ${opts.documentLabel || 'Emergency Lighting Certificate'}${linkBlock('Download Certificate', link)}\n\nKind regards`,

  'solar-pv': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your Solar PV Installation Certificate:\n\n📋 ${opts.documentLabel || 'Solar PV Certificate'}${linkBlock('Download Certificate', link)}\n\nKind regards`,

  'pat-testing': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your PAT Testing Certificate:\n\n📋 ${opts.documentLabel || 'PAT Testing Certificate'}${linkBlock('Download Certificate', link)}\n\nKind regards`,

  'ev-charging': (opts, link) =>
    `Hi ${opts.recipientName || 'there'},\n\nPlease find your EV Charging Point Installation Certificate:\n\n📋 ${opts.documentLabel || 'EV Charging Certificate'}${linkBlock('Download Certificate', link)}\n\nKind regards`,
};

function buildWhatsAppUrl(phone: string | undefined, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  if (phone) {
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

function renderMessage(options: WhatsAppShareOptions, link: string | null): string {
  if (options.customMessage) return options.customMessage;
  const template = MESSAGE_TEMPLATES[options.type] ?? MESSAGE_TEMPLATES.eicr;
  return template(options, link);
}

export function useWhatsAppShare() {
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const { toast } = useToast();

  const shareViaWhatsApp = async (options: WhatsAppShareOptions) => {
    setIsGeneratingLink(true);
    try {
      if (Capacitor.isNativePlatform()) {
        // Native path — unchanged. WhatsApp on iOS/Android renders the
        // URL preview inline; sender sees a doc-style preview in the chat.
        toast({
          title: 'Preparing link',
          description: 'Generating shareable PDF link for WhatsApp...',
          duration: 5000,
        });

        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) throw new Error('Not authenticated');

        const { data: linkData, error: linkError } = await supabase.functions.invoke(
          'generate-temporary-pdf-link',
          {
            body: { documentId: options.id, documentType: options.type },
            headers: { Authorization: `Bearer ${session.access_token}` },
          }
        );

        if (linkError || !linkData?.publicUrl) {
          throw new Error('Failed to generate shareable link');
        }

        const message = renderMessage(options, linkData.publicUrl);
        await openExternalUrl(buildWhatsAppUrl(options.recipientPhone, message));

        toast({
          title: 'Opening WhatsApp',
          description: 'Your document is ready to share.',
        });
        return;
      }

      // Web path — never puts a signed URL in the text body.
      toast({
        title: 'Preparing PDF',
        description: 'Getting the file ready to attach…',
        duration: 5000,
      });

      const message = renderMessage(options, null);
      const filename = `${FILENAME_LABELS[options.type] ?? 'Document'}-${options.documentLabel || options.id}.pdf`;

      const result = await sharePdfToWhatsAppWeb({
        documentId: options.id,
        documentType: options.type,
        filename,
        message,
        recipientPhone: options.recipientPhone,
        title: options.documentLabel,
      });

      toast({
        title:
          result.mode === 'web-share' ? 'Opening share sheet' : 'PDF downloaded',
        description:
          result.mode === 'web-share'
            ? 'Pick WhatsApp to send the PDF.'
            : 'PDF saved to your Downloads — attach it from your WhatsApp chat.',
      });
    } catch (error) {
      // AbortError from navigator.share is fired when the user dismisses
      // the share sheet — not an error worth surfacing.
      if (error instanceof Error && error.name === 'AbortError') return;
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
