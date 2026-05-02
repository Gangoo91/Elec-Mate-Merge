/**
 * VariationDialog (ELE-956)
 *
 * Triggered from a quote action menu on an accepted quote. Captures the
 * variation reason + type, creates a v2 quote draft pre-loaded with v1's
 * items, and routes the sparky into the quote builder to make changes.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Quote } from '@/types/quote';

const VARIATION_TYPES = [
  { value: 'change_order', label: 'On-site change order' },
  { value: 'addition', label: 'Additional work added' },
  { value: 'deletion', label: 'Work removed' },
  { value: 'renegotiation', label: 'Price renegotiation' },
  { value: 'correction', label: 'Pricing correction' },
] as const;

type VariationType = (typeof VARIATION_TYPES)[number]['value'];

interface VariationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentQuote: Quote;
  /** Called after a variation row is created — caller typically navigates to the editor. */
  onCreated?: (newQuoteId: string) => void;
}

export function VariationDialog({
  open,
  onOpenChange,
  parentQuote,
  onCreated,
}: VariationDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [variationType, setVariationType] = useState<VariationType>('change_order');
  const [reason, setReason] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!reason.trim()) {
      toast({
        title: 'Reason required',
        description: 'Tell the client what changed and why.',
        variant: 'destructive',
      });
      return;
    }
    setCreating(true);
    try {
      // Compute next version number — load any existing variations of this
      // chain and take max+1.
      const parentChainId = parentQuote.parent_quote_id || parentQuote.id;
      const { data: chain } = await supabase
        .from('quotes')
        .select('version_number')
        .or(`id.eq.${parentChainId},parent_quote_id.eq.${parentChainId}`);
      const nextVersion =
        Math.max(0, ...(chain || []).map((r) => r.version_number || 1)) + 1;

      // Create the v2 row — same items + settings as v1, marked as variation
      const { data: created, error } = await supabase
        .from('quotes')
        .insert({
          user_id: parentQuote.user_id,
          quote_number: `${parentQuote.quoteNumber || parentQuote.id.slice(0, 8)}-v${nextVersion}`,
          status: 'draft',
          client_id: parentQuote.client_id,
          client: parentQuote.client,
          jobDetails: parentQuote.jobDetails,
          items: parentQuote.items,
          settings: parentQuote.settings,
          subtotal: parentQuote.subtotal,
          vatAmount: parentQuote.vatAmount,
          total: parentQuote.total,
          parent_quote_id: parentChainId,
          supersedes_id: parentQuote.id,
          version_number: nextVersion,
          variation_reason: reason.trim(),
          variation_type: variationType,
          is_active_version: false, // becomes active when accepted
        })
        .select('id')
        .single();
      if (error) throw error;

      toast({
        title: `Variation v${nextVersion} created`,
        description: 'Add or change items, then send to the client.',
      });
      onOpenChange(false);
      if (onCreated) onCreated(created.id);
      else navigate(`/electrician/quote-builder/${created.id}`);
    } catch (err) {
      toast({
        title: 'Could not create variation',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create variation</DialogTitle>
          <DialogDescription>
            Make a new version of this quote with what's changed. The client signs off on the
            difference, and the final invoice reconciles automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">
              What kind of variation?
            </label>
            <Select value={variationType} onValueChange={(v) => setVariationType(v as VariationType)}>
              <SelectTrigger className="h-11 px-3 rounded-lg bg-white/[0.06] border border-white/[0.12] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/[0.1]">
                {VARIATION_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">
              Reason (shown to the client)
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Customer asked to add 2 sockets in the kitchen on site."
              className="min-h-[100px] bg-white/[0.06] border-white/[0.12] text-white placeholder:text-white/40 resize-none"
            />
            <p className="text-[11px] text-white/50 mt-1.5">
              Be clear — this appears on the diff view the client signs.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={creating}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={creating || !reason.trim()}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {creating ? 'Creating…' : 'Create variation →'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default VariationDialog;
