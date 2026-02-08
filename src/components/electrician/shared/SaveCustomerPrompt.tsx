import { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { QuoteClient } from '@/types/quote';

interface SaveCustomerPromptProps {
  client: QuoteClient;
  quoteId: string;
  onSaved: (customerId: string) => void;
  onDismiss: () => void;
}

export const SaveCustomerPrompt = ({
  client,
  quoteId,
  onSaved,
  onDismiss,
}: SaveCustomerPromptProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check if customer already exists by email
      if (client.email) {
        const { data: existing } = await supabase
          .from('customers')
          .select('id')
          .eq('user_id', user.id)
          .ilike('email', client.email.trim())
          .limit(1)
          .maybeSingle();

        if (existing) {
          // Auto-link existing customer
          await supabase
            .from('quotes')
            .update({ customer_id: existing.id })
            .eq('id', quoteId);

          onSaved(existing.id);
          toast({
            title: 'Customer linked',
            description: `Linked to existing customer "${client.name}"`,
          });
          return;
        }
      }

      // Create new customer
      const { data: newCustomer, error } = await supabase
        .from('customers')
        .insert({
          user_id: user.id,
          name: client.name.trim(),
          email: client.email?.trim() || null,
          phone: client.phone?.trim() || null,
          address: client.address?.trim() || null,
        })
        .select('id')
        .single();

      if (error) throw error;

      // Link customer to quote
      await supabase
        .from('quotes')
        .update({ customer_id: newCustomer.id })
        .eq('id', quoteId);

      onSaved(newCustomer.id);
      toast({
        title: 'Customer saved',
        description: `${client.name} added to your customers`,
        variant: 'success',
      });
    } catch (error) {
      console.error('Error saving customer:', error);
      toast({
        title: 'Save failed',
        description: 'Could not save customer. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/30 animate-in slide-in-from-bottom-2">
      <UserPlus className="h-5 w-5 text-blue-400 shrink-0" />
      <p className="text-[13px] text-white/80 flex-1">
        Save <span className="font-medium text-white">{client.name}</span> to your customers?
      </p>
      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[13px] font-medium touch-manipulation active:scale-[0.97] disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        className="p-1 touch-manipulation"
      >
        <X className="h-4 w-4 text-white/40" />
      </button>
    </div>
  );
};
