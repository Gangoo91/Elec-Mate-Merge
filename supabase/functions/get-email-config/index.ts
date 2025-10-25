/**
 * Get Email Configuration
 * Returns current email config (without tokens)
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    // Get configs (without tokens)
    const { data: configs, error: configError } = await supabase
      .from('user_email_configs')
      .select('id, email_provider, email_address, is_active, created_at, daily_sent_count, total_sent_count, last_sent_at, rate_limit_reset_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (configError) {
      throw new Error('Failed to fetch email configuration');
    }

    return new Response(
      JSON.stringify({ configs: configs || [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});
