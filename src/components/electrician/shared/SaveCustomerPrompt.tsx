import { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SaveCustomerPromptProps {
  client: { name: string; email?: string; phone?: string; address?: string };
  onSaved: (customerId: string) => void;
  onDismiss: () => void;
}

export const SaveCustomerPrompt = ({ client, onSaved, onDismiss }: SaveCustomerPromptProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
    /*
     * Was blue — a colour that appears nowhere else in the product. The accent
     * is Volt, and the fill is solid: a translucent Volt wash turns muddy brown
     * against the dark ground.
     */
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 animate-in slide-in-from-bottom-2">
      <UserPlus className="h-5 w-5 shrink-0 text-elec-yellow" />
      <p className="flex-1 text-[13px] text-white">
        Save <span className="font-semibold text-white">{client.name}</span> to your customers so
        you can pick them next time
      </p>
      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        // "Save" alone sits inches from the wizard's own Save button in the
        // footer, which saves the quote rather than the customer. Naming the
        // object removes the ambiguity.
        className="h-11 shrink-0 rounded-lg bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-[filter,transform] touch-manipulation active:scale-[0.97] active:brightness-110 disabled:bg-white/[0.08] disabled:text-white/70"
      >
        {isSaving ? 'Saving…' : 'Save customer'}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="flex h-11 w-11 shrink-0 items-center justify-center touch-manipulation"
      >
        <X className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};
