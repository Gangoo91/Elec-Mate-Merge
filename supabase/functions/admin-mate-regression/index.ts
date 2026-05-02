/**
 * admin-mate-regression
 *
 * 1-click regression check for the BS 7671 RAG retrieval path. Fires a fixed
 * set of canonical site-electrician questions through search_bs7671_v3 and
 * asserts each expected facet (by facet_hash prefix) appears in the top-N.
 *
 * Pass = retrieval is healthy. Fail = something drifted (search ranking,
 * facet content, edition mix). Surface in /admin/mate as a green/red card.
 *
 * Auth: caller's JWT must belong to a profile with admin_role.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, AuthenticationError } from '../_shared/errors.ts';

interface Check {
  id: string;
  question: string;
  expect_hash_prefix: string; // facet_hash should start with this
  topic: string; // human-readable group, e.g. "Zs Type B"
}

const CHECKS: Check[] = [
  // Zs values — Tables 41.2 / 41.3 / 41.4
  {
    id: 'zs_b32',
    question: 'Max Zs Type B 32 A 230 V TN-S 0.4 s',
    expect_hash_prefix: 'mate-validated/zs/typeB-32A',
    topic: 'Zs · Type B',
  },
  {
    id: 'zs_b6',
    question: 'Maximum Zs Type B 6 A 230 V',
    expect_hash_prefix: 'mate-validated/zs/typeB-6A',
    topic: 'Zs · Type B',
  },
  {
    id: 'zs_c25',
    question: 'Zs Type C 25 A 230 V',
    expect_hash_prefix: 'mate-validated/zs/typeC-25A',
    topic: 'Zs · Type C',
  },
  {
    id: 'zs_d10_04',
    question: 'Zs Type D 10 A 0.4 s',
    expect_hash_prefix: 'mate-validated/zs/typeD-10A-0.4s',
    topic: 'Zs · Type D',
  },
  {
    id: 'zs_bs88_2_32_04',
    question: 'Max Zs BS 88-2 32 A 0.4 s',
    expect_hash_prefix: 'mate-validated/zs/bs88-2-32A-0.4s',
    topic: 'Zs · BS 88-2',
  },
  {
    id: 'zs_bs1362_13_04',
    question: 'Zs BS 1362 13 A plug fuse 0.4 s',
    expect_hash_prefix: 'mate-validated/zs/bs1362-13A-0.4s',
    topic: 'Zs · BS 1362',
  },
  {
    id: 'zs_rcd_30',
    question: '30 mA RCD maximum Zs TT',
    expect_hash_prefix: 'mate-validated/zs/rcd-30mA',
    topic: 'Zs · RCD',
  },

  // Cable ratings — Tables 4D1A / 4D5A / 4D4A
  {
    id: 'iz_pvc_2_5',
    question: 'Current rating 2.5 mm² PVC twin and earth Method C clipped direct',
    expect_hash_prefix: 'mate-validated/cable/pvc-te-2.5mm-methodC',
    topic: 'Cable rating · PVC T+E',
  },
  {
    id: 'iz_pvc_6',
    question: 'Iz 6 mm PVC twin and earth clipped direct',
    expect_hash_prefix: 'mate-validated/cable/pvc-te-6mm-methodC',
    topic: 'Cable rating · PVC T+E',
  },
  {
    id: 'iz_xlpe_10',
    question: '10 mm² XLPE twin and earth current rating',
    expect_hash_prefix: 'mate-validated/cable/xlpe-te-10mm-methodC',
    topic: 'Cable rating · XLPE T+E',
  },
  {
    id: 'iz_swa_25',
    question: '25 mm² 3-core SWA XLPE current rating Method C',
    expect_hash_prefix: 'mate-validated/cable/swa-25mm-methodC',
    topic: 'Cable rating · SWA',
  },

  // R1+R2 — Table 9A
  {
    id: 'r9a_2_5',
    question: 'Cable resistance 2.5 mm² copper Table 9A',
    expect_hash_prefix: 'mate-validated/r1r2/copper-2.5mm',
    topic: 'Cable resistance · 9A',
  },
  {
    id: 'r9a_4',
    question: '4 mm² copper conductor resistance per metre',
    expect_hash_prefix: 'mate-validated/r1r2/copper-4mm',
    topic: 'Cable resistance · 9A',
  },

  // CPC sizing — Table 54.7
  {
    id: 'cpc_2_5',
    question: 'CPC size for 2.5 mm² twin and earth socket circuit',
    expect_hash_prefix: 'mate-validated/cpc/te-2.5mm',
    topic: 'CPC sizing · 54.7',
  },
  {
    id: 'cpc_6_0',
    question: 'CPC size for 6 mm twin and earth shower cable',
    expect_hash_prefix: 'mate-validated/cpc/te-6.0mm',
    topic: 'CPC sizing · 54.7',
  },
  {
    id: 'cpc_10',
    question: 'CPC size for 10 mm twin and earth EV charger',
    expect_hash_prefix: 'mate-validated/cpc/te-10mm',
    topic: 'CPC sizing · 54.7',
  },
];

const MATCH_DEPTH = 5; // expected facet must appear in top 5 search results

interface CheckResult {
  id: string;
  topic: string;
  question: string;
  expect_hash_prefix: string;
  passed: boolean;
  rank: number | null;
  top_match_topic: string | null;
  top_match_hash: string | null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new AuthenticationError('No authorisation header');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) throw new AuthenticationError('Invalid token');

    const { data: callerProfile } = await supabase
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();
    if (!callerProfile?.admin_role) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const startedAt = Date.now();
    const results: CheckResult[] = [];

    // Run checks sequentially — order is deterministic, easier to debug
    for (const c of CHECKS) {
      const { data: hits, error } = await supabase.rpc('search_bs7671_v3', {
        query_text: c.question,
        document_types: ['bs7671'],
        match_count: MATCH_DEPTH,
      });
      if (error) {
        results.push({
          ...c,
          passed: false,
          rank: null,
          top_match_topic: `RPC error: ${error.message}`,
          top_match_hash: null,
        });
        continue;
      }

      const rows = (hits ?? []) as Array<{ facet_id?: string; primary_topic?: string }>;

      // Look up the facet_hash for each returned facet_id
      const facetIds = rows.map((r) => r.facet_id).filter(Boolean) as string[];
      const hashByFacet = new Map<string, string>();
      if (facetIds.length > 0) {
        const { data: facetRows } = await supabase
          .from('bs7671_facets')
          .select('id, facet_hash')
          .in('id', facetIds);
        for (const f of (facetRows ?? []) as Array<{ id: string; facet_hash: string }>) {
          hashByFacet.set(f.id, f.facet_hash);
        }
      }

      let rank: number | null = null;
      for (let i = 0; i < rows.length; i++) {
        const fid = rows[i].facet_id;
        if (!fid) continue;
        const hash = hashByFacet.get(fid) ?? '';
        if (hash.startsWith(c.expect_hash_prefix)) {
          rank = i + 1;
          break;
        }
      }

      const top = rows[0];
      results.push({
        ...c,
        passed: rank !== null,
        rank,
        top_match_topic: top?.primary_topic ?? null,
        top_match_hash: top ? (hashByFacet.get(top.facet_id ?? '') ?? null) : null,
      });
    }

    const passed = results.filter((r) => r.passed).length;
    const total = results.length;
    const summary = {
      total,
      passed,
      failed: total - passed,
      pass_rate: total > 0 ? passed / total : 0,
      duration_ms: Date.now() - startedAt,
      generated_at: new Date().toISOString(),
    };

    // Group results for the UI
    const by_topic = new Map<string, { passed: number; total: number }>();
    for (const r of results) {
      const b = by_topic.get(r.topic) ?? { passed: 0, total: 0 };
      b.total += 1;
      if (r.passed) b.passed += 1;
      by_topic.set(r.topic, b);
    }

    return new Response(
      JSON.stringify({
        summary,
        by_topic: Array.from(by_topic.entries()).map(([topic, v]) => ({ topic, ...v })),
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
});
