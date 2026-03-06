/**
 * Referral MCP Tools for Business AI (Mate)
 *
 * Tools:
 * - get-referral-stats: Query user's referral stats (total, successful, credits, tier)
 * - get-referral-link: Return user's shareable referral URL
 *
 * These tools are registered with the MCP server on the VPS.
 * Deploy: copy to VPS at /opt/elec-ai/services/elec-ai-mcp/src/tools/referrals.ts
 */

import { SupabaseClient } from '@supabase/supabase-js';

interface ToolContext {
  supabase: SupabaseClient;
  userId: string;
}

// ─── get-referral-stats ────────────────────────────────────────────────────────

export const getReferralStatsDefinition = {
  name: 'get-referral-stats',
  description:
    "Get the user's referral programme stats including total referrals, successful conversions, credits earned, current tier, and recent referral history.",
  inputSchema: {
    type: 'object' as const,
    properties: {},
    required: [] as string[],
  },
};

export async function getReferralStats(ctx: ToolContext) {
  const { supabase, userId } = ctx;

  const { data, error } = await supabase.rpc('get_referral_stats', {
    p_user_id: userId,
  });

  if (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Failed to fetch referral stats: ${error.message}`,
        },
      ],
      isError: true,
    };
  }

  const stats = data as Record<string, unknown>;

  // Format a nice summary for the agent to relay
  const tierEmoji: Record<string, string> = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎',
  };

  const tier = (stats.tier as string) || 'bronze';
  const summary = [
    `📊 **Referral Stats**`,
    ``,
    `Referral code: \`${stats.referral_code || 'N/A'}\``,
    `Share link: ${stats.referral_url || 'N/A'}`,
    ``,
    `Total referrals: ${stats.total_referrals || 0}`,
    `Successful (subscribed): ${stats.successful_referrals || 0}`,
    `Credits earned: ${stats.credits_formatted || '£0.00'}`,
    ``,
    `Tier: ${tierEmoji[tier] || ''} ${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
    stats.next_tier
      ? `Next tier: ${(stats.next_tier as string).charAt(0).toUpperCase() + (stats.next_tier as string).slice(1)} (${stats.referrals_to_next_tier} more referrals needed)`
      : 'Max tier reached!',
  ].join('\n');

  return {
    content: [{ type: 'text', text: summary }],
    isError: false,
  };
}

// ─── get-referral-link ─────────────────────────────────────────────────────────

export const getReferralLinkDefinition = {
  name: 'get-referral-link',
  description:
    "Get the user's personal referral link and code. Share this with mates — they get a free month, the user gets a free month.",
  inputSchema: {
    type: 'object' as const,
    properties: {},
    required: [] as string[],
  },
};

export async function getReferralLink(ctx: ToolContext) {
  const { supabase, userId } = ctx;

  const { data, error } = await supabase
    .from('referral_codes')
    .select('code')
    .eq('user_id', userId)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Failed to fetch referral link: ${error.message}`,
        },
      ],
      isError: true,
    };
  }

  if (!data?.code) {
    return {
      content: [
        {
          type: 'text',
          text: 'No referral code found. This may be a new account — try again in a moment.',
        },
      ],
      isError: false,
    };
  }

  const code = data.code;
  const url = `https://elec-mate.com/auth/signup?ref=${code}`;

  const message = [
    `🔗 **Your Referral Link**`,
    ``,
    `Code: \`${code}\``,
    `Link: ${url}`,
    ``,
    `Share this with your mates:`,
    `• They get a **free month**`,
    `• You get a **free month** credit`,
    ``,
    `WhatsApp share link: https://wa.me/?text=${encodeURIComponent(`Check out Elec-Mate — does all your certs, quotes, invoices. Sign up with my link for a free month: ${url}`)}`,
  ].join('\n');

  return {
    content: [{ type: 'text', text: message }],
    isError: false,
  };
}
