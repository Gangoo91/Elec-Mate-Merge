import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Resend } from 'npm:resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// Rate limiting: 500ms between sends to stay within Resend limits (2/sec)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const SEND_DELAY_MS = 500;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

// Campaign type definitions
const CAMPAIGN_TYPES = {
  feature_spotlight: { cooldownDays: 14, label: 'Feature Spotlight' },
  new_content: { cooldownDays: 7, label: 'New Content' },
  engagement_nudge: { cooldownDays: 14, label: 'Engagement Nudge' },
  trial_winback: { cooldownDays: null, label: 'Trial Win-Back' }, // once only
} as const;

type CampaignType = keyof typeof CAMPAIGN_TYPES;

// Apprentice features for spotlight emails
const SPOTLIGHT_FEATURES: Record<string, { name: string; description: string }> = {
  study_centre: {
    name: 'Study Centre',
    description:
      '36 courses covering Level 2, Level 3, EAL, City & Guilds, HNC, and 18th Edition. 500+ practice questions to nail your exams.',
  },
  am2_simulator: {
    name: 'AM2 Simulator',
    description:
      'Practice safe isolation, fault finding, and knowledge tests in a realistic simulation. Know exactly what to expect on the day.',
  },
  epa_simulator: {
    name: 'EPA Simulator',
    description:
      "AI-scored professional discussions with predicted grading. Practice your EPA until you're confident you'll smash it.",
  },
  portfolio_hub: {
    name: 'Portfolio Hub',
    description:
      'Track your evidence, map it to assessment criteria, and log your OJT hours. Everything your assessor needs in one place.',
  },
  site_diary: {
    name: 'Site Diary',
    description:
      'Daily logging, mood tracking, streaks, and AI coach insights. Build a record of everything you do on site.',
  },
  ask_dave: {
    name: 'Ask Dave',
    description:
      'Your 24/7 AI mentor who knows BS 7671 inside out. Ask anything about the regs, wiring, or your coursework.',
  },
  mental_health: {
    name: 'Mental Health Hub',
    description:
      'Mood tracking, breathing exercises, gratitude journaling, and crisis support. Because your mental health matters just as much.',
  },
  career_development: {
    name: 'Career Development',
    description:
      "See your career pathways, plan your certifications, and connect with others in the trade. Know where you're headed.",
  },
  ojt_hub: {
    name: 'OJT Hub',
    description:
      'Track your on-the-job training hours, check compliance with the 20% requirement, and link evidence to your portfolio.',
  },
  learning_videos: {
    name: 'Learning Videos',
    description:
      '60 curated videos from top electrical educators. Watch, learn, and revise at your own pace.',
  },
  calculators: {
    name: 'Electrical Calculators',
    description:
      '40+ calculators for cable sizing, voltage drop, Zs values, diversity, and more. The quick answers you need on site.',
  },
};

// ─── Email Template Helpers ─────────────────────────────────────────
function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Elec-Mate for Apprentices</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a;">
    <tr>
      <td style="padding: 24px 12px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 500px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">
          ${content}
          <!-- Footer -->
          <tr>
            <td style="padding: 16px 24px; text-align: center; background-color: rgba(15, 23, 42, 0.6); border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 0; font-size: 12px; color: #475569;">
                &copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Apprentices &#x1F1EC;&#x1F1E7;&#x26A1;
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function signOff(): string {
  return `
          <tr>
            <td style="padding: 0 24px 32px;">
              <p style="margin: 0 0 4px; font-size: 15px; color: #e2e8f0;">Cheers,</p>
              <p style="margin: 0 0 4px; font-size: 16px; color: #ffffff; font-weight: 600;">Andrew</p>
              <p style="margin: 0; font-size: 13px; color: #64748b;">Founder, Elec-Mate</p>
            </td>
          </tr>`;
}

function utmUrl(path: string, campaignType: string): string {
  return `https://elec-mate.com${path}?utm_source=email&utm_medium=campaign&utm_campaign=apprentice_${campaignType}`;
}

function ctaBlock(text: string, campaignType: string, path: string = '/subscriptions'): string {
  const url = utmUrl(path, campaignType);
  return `
          <tr>
            <td style="padding: 0 20px 24px;">
              <a href="${url}" style="display: block; padding: 16px 24px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center;">
                ${text} &rarr;
              </a>
              <p style="margin: 8px 0 0; font-size: 12px; color: #64748b; text-align: center;">
                Grab it now before the app store launch &mdash; prices will rise
              </p>
            </td>
          </tr>`;
}

// ─── Email Templates ────────────────────────────────────────────────

function generateFeatureSpotlightEmail(firstName: string, featureKey: string): string {
  const feature = SPOTLIGHT_FEATURES[featureKey] || {
    name: featureKey,
    description: 'A powerful tool built just for UK apprentices.',
  };

  return emailWrapper(`
          <tr>
            <td style="padding: 32px 24px 20px;">
              <p style="margin: 0 0 18px; font-size: 17px; color: #ffffff; line-height: 1.6;">
                Hey ${firstName},
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Quick one &mdash; have you tried <strong style="color: #fbbf24;">${feature.name}</strong> yet?
              </p>
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                It's one of the most popular features in the app and it's built specifically for UK electrical apprentices. No other app has anything like it.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 20px 20px;">
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.02) 100%); border: 1px solid rgba(251, 191, 36, 0.25); border-radius: 14px; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 18px; color: #fbbf24; font-weight: 700;">
                  ${feature.name}
                </p>
                <p style="margin: 0; font-size: 15px; color: #e2e8f0; line-height: 1.7;">
                  ${feature.description}
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 24px 20px;">
              <p style="margin: 0; font-size: 15px; color: #94a3b8; line-height: 1.6;">
                This is just one feature &mdash; there are dozens more inside Elec-Mate. 36 courses, AM2 &amp; EPA simulators, 500+ questions, 60 learning videos, 40+ calculators, and your own 24/7 AI mentor.
              </p>
            </td>
          </tr>

          ${ctaBlock('Check it out before prices go up', 'feature_spotlight')}
          ${signOff()}
  `);
}

function generateNewContentEmail(
  firstName: string,
  contentTitle: string,
  contentDescription: string
): string {
  return emailWrapper(`
          <tr>
            <td style="padding: 32px 24px 20px;">
              <p style="margin: 0 0 18px; font-size: 17px; color: #ffffff; line-height: 1.6;">
                Hey ${firstName},
              </p>
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Just shipped something new to Elec-Mate that I wanted to tell you about:
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 20px 20px;">
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.02) 100%); border: 1px solid rgba(34, 197, 94, 0.25); border-radius: 14px; padding: 20px;">
                <p style="margin: 0 0 4px; font-size: 11px; color: #22c55e; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                  What's New
                </p>
                <p style="margin: 0 0 10px; font-size: 18px; color: #ffffff; font-weight: 700;">
                  ${contentTitle}
                </p>
                <p style="margin: 0; font-size: 15px; color: #e2e8f0; line-height: 1.7;">
                  ${contentDescription}
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 24px 20px;">
              <p style="margin: 0; font-size: 15px; color: #94a3b8; line-height: 1.6;">
                The UK's most complete apprentice app keeps getting better. Jump in and have a look.
              </p>
            </td>
          </tr>

          ${ctaBlock('Jump in now &mdash; prices rise at app store launch', 'new_content')}
          ${signOff()}
  `);
}

function generateEngagementNudgeEmail(firstName: string): string {
  const features = [
    {
      name: 'Study Centre',
      desc: '36 courses, Level 2 &amp; 3, EAL &amp; City &amp; Guilds, 500+ questions',
      colour: '#22c55e',
    },
    {
      name: 'AM2 Simulator',
      desc: 'Safe isolation, fault finding, knowledge tests',
      colour: '#3b82f6',
    },
    {
      name: 'EPA Simulator',
      desc: 'AI-scored professional discussions, predicted grading',
      colour: '#8b5cf6',
    },
    {
      name: 'Portfolio Hub',
      desc: 'Evidence tracking, assessment criteria mapping, OJT hours',
      colour: '#f59e0b',
    },
    {
      name: 'Site Diary',
      desc: 'Daily logging, mood tracking, streaks, AI coach insights',
      colour: '#ef4444',
    },
    {
      name: '60 Learning Videos',
      desc: 'Curated from top electrical educators',
      colour: '#06b6d4',
    },
    {
      name: '40+ Electrical Calculators',
      desc: 'Cable sizing, voltage drop, diversity, Zs values',
      colour: '#10b981',
    },
    {
      name: 'Ask Dave',
      desc: '24/7 AI mentor who knows BS 7671',
      colour: '#fbbf24',
    },
    {
      name: 'Mental Health Hub',
      desc: 'Mood tracking, breathing exercises, gratitude journal, crisis support',
      colour: '#ec4899',
    },
    {
      name: 'Career Development',
      desc: 'Pathways, certifications, networking',
      colour: '#a78bfa',
    },
    {
      name: 'Apprentice Toolbox',
      desc: 'Year-by-year expectations, jargon guide, funding info, study tips',
      colour: '#14b8a6',
    },
    {
      name: 'OJT Hub',
      desc: 'Time tracking, compliance tracking, 20% requirement',
      colour: '#f97316',
    },
  ];

  const featureRows = features
    .map(
      (f) => `
              <div style="background: rgba(255,255,255,0.03); border-left: 3px solid ${f.colour}; border-radius: 0 8px 8px 0; padding: 12px 14px; margin-bottom: 8px;">
                <p style="margin: 0 0 2px; font-size: 14px; color: #ffffff; font-weight: 600;">${f.name}</p>
                <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">${f.desc}</p>
              </div>`
    )
    .join('');

  return emailWrapper(`
          <tr>
            <td style="padding: 32px 24px 20px;">
              <p style="margin: 0 0 18px; font-size: 17px; color: #ffffff; line-height: 1.6;">
                Hey ${firstName},
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                You've got access to the most complete apprentice toolkit in the UK &mdash; are you using it?
              </p>
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Here's everything that's waiting for you inside Elec-Mate:
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 20px 20px;">
              ${featureRows}
            </td>
          </tr>

          <tr>
            <td style="padding: 0 24px 20px;">
              <div style="background: rgba(251, 191, 36, 0.08); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 12px; padding: 16px; text-align: center;">
                <p style="margin: 0; font-size: 15px; color: #fbbf24; font-weight: 600; line-height: 1.6;">
                  No other app gives you all this in one place.
                </p>
              </div>
            </td>
          </tr>

          ${ctaBlock('Get back into Elec-Mate', 'engagement_nudge')}
          ${signOff()}
  `);
}

function generateTrialWinbackEmail(firstName: string): string {
  return emailWrapper(`
          <tr>
            <td style="padding: 32px 24px 20px;">
              <p style="margin: 0 0 18px; font-size: 17px; color: #ffffff; line-height: 1.6;">
                Hey ${firstName},
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Your trial's ended but you barely scratched the surface of what Elec-Mate can do for your apprenticeship.
              </p>
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Built specifically for UK electrical apprentices. Nothing else comes close.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 20px 8px;">
              <p style="margin: 0; font-size: 13px; color: #fbbf24; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                Everything you get with Elec-Mate
              </p>
            </td>
          </tr>

          <!-- Learning -->
          <tr>
            <td style="padding: 0 20px 12px;">
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.02) 100%); border: 1px solid rgba(34, 197, 94, 0.25); border-radius: 14px; padding: 16px;">
                <p style="margin: 0 0 8px; font-size: 13px; color: #22c55e; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Learning</p>
                <p style="margin: 0 0 4px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">36 courses (Level 2, Level 3, EAL, City &amp; Guilds, HNC, 18th Edition)</p>
                <p style="margin: 0 0 4px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">500+ practice questions</p>
                <p style="margin: 0 0 4px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">60 curated learning videos</p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">Inspection &amp; Testing learning hub</p>
              </div>
            </td>
          </tr>

          <!-- Exam Prep -->
          <tr>
            <td style="padding: 0 20px 12px;">
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 14px; padding: 16px;">
                <p style="margin: 0 0 8px; font-size: 13px; color: #3b82f6; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Exam Prep</p>
                <p style="margin: 0 0 4px; font-size: 14px; color: #e2e8f0; line-height: 1.6;"><strong style="color:#fff;">AM2 Exam Simulator</strong> &mdash; safe isolation, fault finding, knowledge tests</p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;"><strong style="color:#fff;">EPA Simulator</strong> &mdash; AI-scored professional discussions, predicted grading</p>
              </div>
            </td>
          </tr>

          <!-- On-site Tools -->
          <tr>
            <td style="padding: 0 20px 12px;">
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.02) 100%); border: 1px solid rgba(251, 191, 36, 0.25); border-radius: 14px; padding: 16px;">
                <p style="margin: 0 0 8px; font-size: 13px; color: #fbbf24; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">On-site &amp; Portfolio</p>
                <p style="margin: 0 0 4px; font-size: 14px; color: #e2e8f0; line-height: 1.6;"><strong style="color:#fff;">Portfolio Hub</strong> &mdash; evidence tracking, AC mapping, OJT hours</p>
                <p style="margin: 0 0 4px; font-size: 14px; color: #e2e8f0; line-height: 1.6;"><strong style="color:#fff;">Site Diary</strong> with AI coach &mdash; daily logging, mood tracking, streaks</p>
                <p style="margin: 0 0 4px; font-size: 14px; color: #e2e8f0; line-height: 1.6;"><strong style="color:#fff;">OJT Hub</strong> &mdash; time tracking, compliance, evidence linking</p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">40+ electrical calculators</p>
              </div>
            </td>
          </tr>

          <!-- Support -->
          <tr>
            <td style="padding: 0 20px 20px;">
              <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.02) 100%); border: 1px solid rgba(139, 92, 246, 0.25); border-radius: 14px; padding: 16px;">
                <p style="margin: 0 0 8px; font-size: 13px; color: #a78bfa; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Support &amp; Growth</p>
                <p style="margin: 0 0 4px; font-size: 14px; color: #e2e8f0; line-height: 1.6;"><strong style="color:#fff;">Ask Dave</strong> &mdash; 24/7 AI mentor</p>
                <p style="margin: 0 0 4px; font-size: 14px; color: #e2e8f0; line-height: 1.6;"><strong style="color:#fff;">Mental Health Hub</strong> &mdash; mood tracking, exercises, journaling, crisis resources</p>
                <p style="margin: 0 0 4px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">Career pathways and certification roadmap</p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">Apprentice Toolbox &mdash; year-by-year expectations, jargon, funding guide</p>
              </div>
            </td>
          </tr>

          <!-- Pricing -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%); border: 2px solid rgba(251, 191, 36, 0.4); border-radius: 16px; padding: 24px 20px; text-align: center;">
                <p style="margin: 0 0 4px; font-size: 14px; color: #94a3b8;">
                  Lock in before prices go up
                </p>
                <p style="margin: 0; font-size: 48px; font-weight: 800; color: #fbbf24; line-height: 1;">
                  &pound;4.99<span style="font-size: 18px; font-weight: 600; color: #94a3b8;">/mo</span>
                </p>
                <p style="margin: 6px 0 16px; font-size: 14px; color: #94a3b8;">
                  or &pound;49.99/year (&pound;4.17/mo)
                </p>
                <a href="https://elec-mate.com/subscriptions?utm_source=email&utm_medium=campaign&utm_campaign=apprentice_trial_winback" style="display: block; padding: 16px 24px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center;">
                  Lock in &pound;4.99/mo now &rarr;
                </a>
                <p style="margin: 10px 0 0; font-size: 12px; color: #64748b;">
                  Prices go up when we hit the app stores
                </p>
              </div>
            </td>
          </tr>

          <!-- Free week offer -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 16px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Not sure? Reply to this email and I'll give you <strong style="color: #60a5fa;">another free week</strong> to try it properly. No strings.
                </p>
              </div>
            </td>
          </tr>

          ${signOff()}
  `);
}

// ─── Template Dispatch ──────────────────────────────────────────────
function generateCampaignEmail(
  campaignType: CampaignType,
  firstName: string,
  params: {
    featureKey?: string;
    contentTitle?: string;
    contentDescription?: string;
  }
): { html: string; subject: string } {
  switch (campaignType) {
    case 'feature_spotlight': {
      const featureKey = params.featureKey || 'study_centre';
      const feature = SPOTLIGHT_FEATURES[featureKey] || {
        name: featureKey,
        description: '',
      };
      return {
        html: generateFeatureSpotlightEmail(firstName, featureKey),
        subject: `Have you tried ${feature.name} yet?`,
      };
    }
    case 'new_content':
      return {
        html: generateNewContentEmail(
          firstName,
          params.contentTitle || 'Something New',
          params.contentDescription || "We've just added something great."
        ),
        subject: `New in Elec-Mate: ${params.contentTitle || 'Something New'}`,
      };
    case 'engagement_nudge':
      return {
        html: generateEngagementNudgeEmail(firstName),
        subject: "The UK's best apprentice app is waiting for you",
      };
    case 'trial_winback':
      return {
        html: generateTrialWinbackEmail(firstName),
        subject: "The UK's #1 apprentice app \u2014 \u00A34.99/mo before prices rise",
      };
  }
}

// ─── Main Handler ───────────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();
    if (userError || !user) throw new Error('Unauthorized');

    const { data: callerProfile } = await supabaseClient
      .from('profiles')
      .select('admin_role, full_name')
      .eq('id', user.id)
      .single();

    if (!callerProfile?.admin_role) throw new Error('Unauthorized: Admin access required');

    const {
      action,
      campaignType,
      userId,
      userIds,
      testEmail,
      manualEmail,
      recipientName,
      featureKey,
      contentTitle,
      contentDescription,
    } = await req.json();

    console.log(
      `Admin ${user.id} (${callerProfile.full_name}) apprentice campaign, action: ${action}`
    );

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result;

    switch (action) {
      // ─── get_eligible ───────────────────────────────────────
      case 'get_eligible': {
        if (!campaignType || !CAMPAIGN_TYPES[campaignType as CampaignType]) {
          throw new Error('Valid campaignType is required');
        }
        const ct = campaignType as CampaignType;

        const { data: profiles, error: pErr } = await supabaseAdmin
          .from('profiles')
          .select(
            'id, full_name, username, created_at, subscribed, free_access_granted, apprentice_campaign_sent_at, apprentice_campaign_type'
          )
          .eq('role', 'apprentice')
          .order('created_at', { ascending: false });

        if (pErr) throw pErr;

        // Get auth users for emails + last_sign_in_at
        const { data: authUsers, error: authErr } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });
        if (authErr) throw authErr;

        const emailMap = new Map<string, string>();
        const lastSignInMap = new Map<string, string | null>();
        authUsers.users.forEach((u: any) => {
          if (u.email) emailMap.set(u.id, u.email);
          lastSignInMap.set(u.id, u.last_sign_in_at || null);
        });

        const now = Date.now();
        const filtered =
          profiles?.filter((p: any) => {
            if (ct === 'trial_winback') {
              // Unsubscribed, trial expired, never sent winback
              if (p.subscribed === true || p.free_access_granted === true) return false;
              if (p.apprentice_campaign_sent_at && p.apprentice_campaign_type === 'trial_winback')
                return false;
              // Trial = 7 days from signup. Eligible once trial has expired.
              const trialEnd = new Date(p.created_at).getTime() + 7 * 24 * 60 * 60 * 1000;
              return now >= trialEnd;
            }

            // All other types require subscribed or free access
            if (p.subscribed !== true && p.free_access_granted !== true) return false;

            if (ct === 'engagement_nudge') {
              // Inactive 14+ days — use last_sign_in_at from auth.users
              const lastSignIn = lastSignInMap.get(p.id);
              const lastActive = lastSignIn ? new Date(lastSignIn).getTime() : 0;
              if (now - lastActive < 14 * 24 * 60 * 60 * 1000) return false;
            }

            // Check cooldown
            if (p.apprentice_campaign_sent_at) {
              const cooldownDays = CAMPAIGN_TYPES[ct].cooldownDays;
              if (cooldownDays) {
                const sentAt = new Date(p.apprentice_campaign_sent_at).getTime();
                if (now - sentAt < cooldownDays * 24 * 60 * 60 * 1000) return false;
              }
            }

            return true;
          }) || [];

        const usersWithEmails = filtered
          .map((p: any) => ({
            id: p.id,
            full_name: p.full_name,
            username: p.username,
            email: emailMap.get(p.id) || null,
            created_at: p.created_at,
            last_sign_in: lastSignInMap.get(p.id) || null,
            apprentice_campaign_sent_at: p.apprentice_campaign_sent_at,
          }))
          .filter((u: any) => u.email);

        result = { users: usersWithEmails };
        break;
      }

      // ─── get_stats ──────────────────────────────────────────
      case 'get_stats': {
        if (!campaignType || !CAMPAIGN_TYPES[campaignType as CampaignType]) {
          throw new Error('Valid campaignType is required');
        }
        const ct = campaignType as CampaignType;

        const { data: profiles, error: pErr } = await supabaseAdmin
          .from('profiles')
          .select(
            'id, subscribed, free_access_granted, created_at, apprentice_campaign_sent_at, apprentice_campaign_type'
          )
          .eq('role', 'apprentice');

        if (pErr) throw pErr;

        // Fetch auth users for last_sign_in_at (needed for engagement_nudge)
        const lastSignInMap = new Map<string, string | null>();
        if (ct === 'engagement_nudge') {
          const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
          authUsers?.users?.forEach((u: any) => {
            lastSignInMap.set(u.id, u.last_sign_in_at || null);
          });
        }

        const now = Date.now();

        // Count eligible (same logic as get_eligible)
        const eligible =
          profiles?.filter((p: any) => {
            if (ct === 'trial_winback') {
              if (p.subscribed === true || p.free_access_granted === true) return false;
              if (p.apprentice_campaign_sent_at && p.apprentice_campaign_type === 'trial_winback')
                return false;
              const trialEnd = new Date(p.created_at).getTime() + 7 * 24 * 60 * 60 * 1000;
              return now >= trialEnd;
            }
            if (p.subscribed !== true && p.free_access_granted !== true) return false;
            if (ct === 'engagement_nudge') {
              const lastSignIn = lastSignInMap.get(p.id);
              const lastActive = lastSignIn ? new Date(lastSignIn).getTime() : 0;
              if (now - lastActive < 14 * 24 * 60 * 60 * 1000) return false;
            }
            if (p.apprentice_campaign_sent_at) {
              const cooldownDays = CAMPAIGN_TYPES[ct].cooldownDays;
              if (cooldownDays) {
                const sentAt = new Date(p.apprentice_campaign_sent_at).getTime();
                if (now - sentAt < cooldownDays * 24 * 60 * 60 * 1000) return false;
              }
            }
            return true;
          }).length || 0;

        // Count sent (for this campaign type)
        const sent =
          profiles?.filter(
            (p: any) => p.apprentice_campaign_sent_at && p.apprentice_campaign_type === ct
          ).length || 0;

        // Conversions only apply to trial_winback
        const conversions =
          ct === 'trial_winback'
            ? profiles?.filter(
                (p: any) =>
                  p.apprentice_campaign_sent_at &&
                  p.apprentice_campaign_type === 'trial_winback' &&
                  p.subscribed
              ).length || 0
            : 0;

        result = {
          totalEligible: eligible,
          offersSent: sent,
          conversions,
          conversionRate: sent > 0 ? ((conversions / sent) * 100).toFixed(1) : '0',
        };
        break;
      }

      // ─── send_single ────────────────────────────────────────
      case 'send_single': {
        if (!userId) throw new Error('User ID is required');
        if (!campaignType || !CAMPAIGN_TYPES[campaignType as CampaignType])
          throw new Error('Valid campaignType is required');
        const ct = campaignType as CampaignType;

        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username')
          .eq('id', userId)
          .single();

        if (!profile) throw new Error('User not found');

        const { data: authUser, error: authErr } =
          await supabaseAdmin.auth.admin.getUserById(userId);
        if (authErr || !authUser.user?.email) throw new Error('Could not get user email');

        const firstName = profile.full_name?.split(' ')[0] || 'mate';
        const { html, subject } = generateCampaignEmail(ct, firstName, {
          featureKey,
          contentTitle,
          contentDescription,
        });

        const { error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <hello@elec-mate.com>',
          to: [authUser.user.email.trim().toLowerCase()],
          subject,
          html,
        });

        if (emailError) throw new Error('Failed to send email');

        await supabaseAdmin
          .from('profiles')
          .update({
            apprentice_campaign_sent_at: new Date().toISOString(),
            apprentice_campaign_type: ct,
          })
          .eq('id', userId);

        await supabaseAdmin.from('email_logs').insert({
          to_email: authUser.user.email,
          subject,
          template: `apprentice_${ct}`,
          status: 'sent',
          metadata: { user_id: userId, campaign_type: ct },
        });

        result = { success: true, email: authUser.user.email };
        break;
      }

      // ─── send_bulk ──────────────────────────────────────────
      case 'send_bulk': {
        if (!userIds || !Array.isArray(userIds) || userIds.length === 0)
          throw new Error('User IDs array is required');
        if (!campaignType || !CAMPAIGN_TYPES[campaignType as CampaignType])
          throw new Error('Valid campaignType is required');
        const ct = campaignType as CampaignType;

        let sentCount = 0;
        const skippedCount = 0;
        const errors: string[] = [];

        for (const uid of userIds) {
          try {
            const { data: profile } = await supabaseAdmin
              .from('profiles')
              .select('id, full_name, username')
              .eq('id', uid)
              .single();

            if (!profile) {
              errors.push(`${uid}: User not found`);
              continue;
            }

            const { data: authUser, error: authErr } =
              await supabaseAdmin.auth.admin.getUserById(uid);
            if (authErr || !authUser.user?.email) {
              errors.push(`${uid}: Could not get email`);
              continue;
            }

            const firstName = profile.full_name?.split(' ')[0] || 'mate';
            const { html, subject } = generateCampaignEmail(ct, firstName, {
              featureKey,
              contentTitle,
              contentDescription,
            });

            const { error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              to: [authUser.user.email.trim().toLowerCase()],
              subject,
              html,
            });

            if (emailError) {
              errors.push(`${authUser.user.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from('profiles')
              .update({
                apprentice_campaign_sent_at: new Date().toISOString(),
                apprentice_campaign_type: ct,
              })
              .eq('id', uid);

            await supabaseAdmin.from('email_logs').insert({
              to_email: authUser.user.email,
              subject,
              template: `apprentice_${ct}`,
              status: 'sent',
              metadata: { user_id: uid, campaign_type: ct },
            });

            sentCount++;

            // Rate limit: wait between sends to avoid hitting Resend limits
            if (sentCount < userIds.length) {
              await sleep(SEND_DELAY_MS);
            }
          } catch (err: any) {
            errors.push(`${uid}: ${err.message}`);
          }
        }

        result = {
          sent: sentCount,
          skipped: skippedCount,
          failed: errors.length,
          errors: errors.length > 0 ? errors : undefined,
        };
        break;
      }

      // ─── send_test ──────────────────────────────────────────
      case 'send_test': {
        if (!testEmail) throw new Error('Test email address is required');
        if (!campaignType || !CAMPAIGN_TYPES[campaignType as CampaignType])
          throw new Error('Valid campaignType is required');
        const ct = campaignType as CampaignType;

        const { html, subject } = generateCampaignEmail(ct, 'Test', {
          featureKey,
          contentTitle,
          contentDescription,
        });

        const { error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <hello@elec-mate.com>',
          to: [testEmail.trim().toLowerCase()],
          subject: `[TEST] ${subject}`,
          html,
        });

        if (emailError) throw new Error(`Failed to send test email: ${emailError.message}`);

        result = { success: true, email: testEmail };
        break;
      }

      // ─── send_manual ────────────────────────────────────────
      case 'send_manual': {
        if (!manualEmail) throw new Error('Email address is required');
        if (!campaignType || !CAMPAIGN_TYPES[campaignType as CampaignType])
          throw new Error('Valid campaignType is required');
        const ct = campaignType as CampaignType;

        const firstName = recipientName?.split(' ')[0] || 'mate';
        const { html, subject } = generateCampaignEmail(ct, firstName, {
          featureKey,
          contentTitle,
          contentDescription,
        });

        const { error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <hello@elec-mate.com>',
          to: [manualEmail.trim().toLowerCase()],
          subject,
          html,
        });

        if (emailError) throw new Error(`Failed to send email: ${emailError.message}`);

        await supabaseAdmin.from('email_logs').insert({
          to_email: manualEmail.trim().toLowerCase(),
          subject,
          template: `apprentice_${ct}_manual`,
          status: 'sent',
          metadata: {
            sent_by_admin: user.id,
            recipient_name: recipientName,
            campaign_type: ct,
          },
        });

        result = { success: true, email: manualEmail };
        break;
      }

      // ─── get_sent_history ───────────────────────────────────
      case 'get_sent_history': {
        const { data: sentUsers, error: sentErr } = await supabaseAdmin
          .from('profiles')
          .select(
            'id, full_name, username, created_at, apprentice_campaign_sent_at, apprentice_campaign_type, subscribed'
          )
          .eq('role', 'apprentice')
          .not('apprentice_campaign_sent_at', 'is', null)
          .order('apprentice_campaign_sent_at', { ascending: false })
          .limit(100);

        if (sentErr) throw sentErr;
        result = { users: sentUsers || [] };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error('Error in send-apprentice-campaign:', error.message);
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack?.split('\n').slice(0, 3).join(' | '),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
