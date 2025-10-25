/**
 * Disconnect Email Account
 * Removes OAuth connection and deletes tokens
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { provider } = await req.json();

    if (!provider || !['gmail', 'outlook'].includes(provider)) {
      throw new ValidationError('Provider must be "gmail" or "outlook"');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Delete config
    const { error: deleteError } = await supabase
      .from('user_email_configs')
      .delete()
      .eq('user_id', user.id)
      .eq('email_provider', provider);

    if (deleteError) {
      throw new Error('Failed to disconnect email account');
    }

    console.log(`✅ Email account disconnected`, { 
      user_id: user.id, 
      provider 
    });

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});
