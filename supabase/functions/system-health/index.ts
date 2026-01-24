import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTimeMs?: number;
  error?: string;
}

interface HealthStatus {
  overall: 'healthy' | 'degraded' | 'down';
  timestamp: string;
  checks: HealthCheckResult[];
}

/**
 * Check database connectivity
 */
async function checkDatabase(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from('profiles').select('id').limit(1);
    const responseTimeMs = Date.now() - start;

    if (error) {
      return {
        service: 'database',
        status: 'down',
        responseTimeMs,
        error: error.message,
      };
    }

    return {
      service: 'database',
      status: responseTimeMs < 1000 ? 'healthy' : 'degraded',
      responseTimeMs,
    };
  } catch (error) {
    return {
      service: 'database',
      status: 'down',
      responseTimeMs: Date.now() - start,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check OpenAI API availability
 */
async function checkOpenAI(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      return {
        service: 'openai',
        status: 'down',
        error: 'API key not configured',
      };
    }

    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const responseTimeMs = Date.now() - start;

    if (!response.ok) {
      return {
        service: 'openai',
        status: 'down',
        responseTimeMs,
        error: `HTTP ${response.status}`,
      };
    }

    return {
      service: 'openai',
      status: responseTimeMs < 2000 ? 'healthy' : 'degraded',
      responseTimeMs,
    };
  } catch (error) {
    return {
      service: 'openai',
      status: 'down',
      responseTimeMs: Date.now() - start,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check Lovable AI Gateway availability
 */
async function checkLovableAI(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return {
        service: 'lovable_ai',
        status: 'down',
        error: 'API key not configured',
      };
    }

    // Simple ping to the AI gateway
    const response = await fetch('https://ai.gateway.lovable.dev/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const responseTimeMs = Date.now() - start;

    if (!response.ok) {
      return {
        service: 'lovable_ai',
        status: 'down',
        responseTimeMs,
        error: `HTTP ${response.status}`,
      };
    }

    return {
      service: 'lovable_ai',
      status: responseTimeMs < 2000 ? 'healthy' : 'degraded',
      responseTimeMs,
    };
  } catch (error) {
    return {
      service: 'lovable_ai',
      status: 'down',
      responseTimeMs: Date.now() - start,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🏥 Running health checks...');

    // Run all health checks in parallel
    const [dbCheck, openaiCheck, lovableCheck] = await Promise.all([
      checkDatabase(),
      checkOpenAI(),
      checkLovableAI(),
    ]);

    const checks = [dbCheck, openaiCheck, lovableCheck];

    // Determine overall status
    const hasDown = checks.some(c => c.status === 'down');
    const hasDegraded = checks.some(c => c.status === 'degraded');
    
    const overall = hasDown ? 'down' : hasDegraded ? 'degraded' : 'healthy';

    const status: HealthStatus = {
      overall,
      timestamp: new Date().toISOString(),
      checks,
    };

    console.log('✅ Health check complete:', {
      overall,
      checks: checks.map(c => ({ service: c.service, status: c.status })),
    });

    return new Response(JSON.stringify(status), {
      status: overall === 'down' ? 503 : 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('❌ Health check failed:', error);
    
    const status: HealthStatus = {
      overall: 'down',
      timestamp: new Date().toISOString(),
      checks: [{
        service: 'system',
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
      }],
    };

    return new Response(JSON.stringify(status), {
      status: 503,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
});
