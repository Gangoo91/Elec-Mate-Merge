/**
 * Practical Work Unification Pipeline
 * Deduplicates and clusters installation/maintenance/inspection knowledge
 * 
 * Phases:
 * 1. Normalize & Hash - Create content_hash for exact duplicates
 * 2. Exact Clustering - Group by hash, pick canonical
 * 3. Semantic Clustering - Use vectors for near-duplicates
 * 4. Metadata Aggregation - Merge sources and activity suggestions
 */

import { corsHeaders, serve, createClient } from '../_shared/deps.ts';
import type { Database } from '../_shared/types.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Similarity thresholds
const EXACT_THRESHOLD = 1.0;
const SEMANTIC_THRESHOLD = 0.93;
const COMBINED_COSINE_THRESHOLD = 0.90;
const COMBINED_JACCARD_THRESHOLD = 0.80;
const MAX_CLUSTER_SIZE = 20;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const startTime = Date.now();

  try {
    const { mode = 'full', batchSize = 500 } = await req.json().catch(() => ({}));

    console.log(`🔄 Starting unification pipeline - Mode: ${mode}`);

    // Phase 1: Normalize and Hash
    console.log('📝 Phase 1: Normalizing content and generating hashes...');
    await normalizeAndHash(supabase, batchSize);

    // Phase 2: Exact Duplicate Clustering
    console.log('🔗 Phase 2: Creating exact duplicate clusters...');
    const exactStats = await createExactClusters(supabase);
    console.log(`✅ Exact clustering: ${exactStats.clusters} clusters, ${exactStats.members} members`);

    // Phase 3: Semantic Clustering (optional, can be slow)
    let semanticStats = { clusters: 0, members: 0 };
    if (mode === 'full') {
      console.log('🧠 Phase 3: Creating semantic clusters...');
      semanticStats = await createSemanticClusters(supabase);
      console.log(`✅ Semantic clustering: ${semanticStats.clusters} additional clusters, ${semanticStats.members} members`);
    }

    // Phase 4: Update Statistics
    console.log('📊 Phase 4: Updating cluster statistics...');
    await updateClusterStats(supabase);

    const totalTime = Date.now() - startTime;

    return new Response(
      JSON.stringify({
        success: true,
        mode,
        stats: {
          exact: exactStats,
          semantic: semanticStats,
          totalTime: `${totalTime}ms`
        },
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('❌ Unification error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

/**
 * Normalize text and generate content hash
 */
async function normalizeAndHash(supabase: any, batchSize: number) {
  let offset = 0;
  let processed = 0;

  while (true) {
    const { data: rows, error } = await supabase
      .from('practical_work')
      .select('id, content')
      .is('content_hash', null)
      .range(offset, offset + batchSize - 1);

    if (error) throw error;
    if (!rows || rows.length === 0) break;

    // Normalize and hash in batch
    const updates = rows.map((row: any) => {
      const normalized = normalizeText(row.content);
      const hash = hashText(normalized);
      return { id: row.id, content_normalized: normalized, content_hash: hash };
    });

    // Update in batch
    for (const update of updates) {
      await supabase
        .from('practical_work')
        .update({
          content_normalized: update.content_normalized,
          content_hash: update.content_hash
        })
        .eq('id', update.id);
    }

    processed += rows.length;
    console.log(`  Processed ${processed} rows...`);
    offset += batchSize;
  }

  console.log(`✅ Normalized ${processed} total rows`);
}

/**
 * Create clusters for exact duplicates (same hash)
 */
async function createExactClusters(supabase: any) {
  let clustersCreated = 0;
  let membersAdded = 0;

  // Find all duplicate hashes
  const { data: hashes, error: hashError } = await supabase.rpc(
    'get_duplicate_hashes',
    {},
    { count: 'exact' }
  );

  if (hashError) {
    // Fallback: manual grouping
    const { data: allRows } = await supabase
      .from('practical_work')
      .select('id, content_hash, content, source_table, created_at')
      .not('content_hash', 'is', null)
      .order('content_hash');

    if (!allRows) return { clusters: 0, members: 0 };

    const grouped = new Map<string, any[]>();
    for (const row of allRows) {
      if (!grouped.has(row.content_hash)) {
        grouped.set(row.content_hash, []);
      }
      grouped.get(row.content_hash)!.push(row);
    }

    // Process each group
    for (const [hash, members] of grouped.entries()) {
      if (members.length < 2) continue; // Skip non-duplicates

      // Pick canonical: longest content, earliest created_at
      const canonical = members.sort((a, b) => {
        if (b.content.length !== a.content.length) {
          return b.content.length - a.content.length;
        }
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      })[0];

      // Create cluster
      const { data: cluster, error: clusterError } = await supabase
        .from('practical_work_clusters')
        .insert({
          canonical_id: canonical.id,
          member_count: members.length,
          overlap_flags: buildOverlapFlags(members),
          metrics: { method: 'exact', hash }
        })
        .select()
        .single();

      if (clusterError) {
        console.error('Cluster creation error:', clusterError);
        continue;
      }

      // Update canonical record
      await supabase
        .from('practical_work')
        .update({
          cluster_id: cluster.id,
          is_canonical: true,
          sources: buildSourcesMap(members),
          activity_suggested: deriveActivityTypes(members)
        })
        .eq('id', canonical.id);

      // Add all members (including canonical)
      for (const member of members) {
        await supabase
          .from('practical_work_cluster_members')
          .insert({
            cluster_id: cluster.id,
            member_id: member.id,
            match_method: 'exact',
            similarity: 1.0,
            source_table: member.source_table,
            activity_tags: getActivityTagsForSource(member.source_table)
          });

        // Update non-canonical members
        if (member.id !== canonical.id) {
          await supabase
            .from('practical_work')
            .update({ cluster_id: cluster.id, is_canonical: false })
            .eq('id', member.id);
        }
      }

      clustersCreated++;
      membersAdded += members.length;
    }
  }

  return { clusters: clustersCreated, members: membersAdded };
}

/**
 * Create semantic clusters using vector similarity
 */
async function createSemanticClusters(supabase: any) {
  let clustersCreated = 0;
  let membersAdded = 0;

  // Get all canonical records with embeddings
  const { data: canonicals } = await supabase
    .from('practical_work')
    .select('id, embedding, content_normalized, cluster_id')
    .eq('is_canonical', true)
    .not('embedding', 'is', null);

  if (!canonicals) return { clusters: 0, members: 0 };

  // Get unclustered records with embeddings
  const { data: unclustered } = await supabase
    .from('practical_work')
    .select('id, embedding, content_normalized, source_table')
    .is('cluster_id', null)
    .not('embedding', 'is', null);

  if (!unclustered || unclustered.length === 0) {
    console.log('No unclustered records to process');
    return { clusters: 0, members: 0 };
  }

  // For each unclustered record, find best matching canonical
  for (const record of unclustered) {
    let bestMatch: any = null;
    let bestSimilarity = 0;

    for (const canonical of canonicals) {
      const cosine = cosineSimilarity(record.embedding, canonical.embedding);
      const jaccard = jaccardSimilarity(
        record.content_normalized || '',
        canonical.content_normalized || ''
      );

      // Check thresholds
      const meetsThreshold =
        cosine >= SEMANTIC_THRESHOLD ||
        (cosine >= COMBINED_COSINE_THRESHOLD && jaccard >= COMBINED_JACCARD_THRESHOLD);

      if (meetsThreshold && cosine > bestSimilarity) {
        bestSimilarity = cosine;
        bestMatch = canonical;
      }
    }

    // Add to cluster if match found
    if (bestMatch) {
      // Check cluster size limit
      const { data: clusterData } = await supabase
        .from('practical_work_clusters')
        .select('member_count')
        .eq('id', bestMatch.cluster_id)
        .single();

      if (clusterData && clusterData.member_count < MAX_CLUSTER_SIZE) {
        // Add to existing cluster
        await supabase
          .from('practical_work_cluster_members')
          .insert({
            cluster_id: bestMatch.cluster_id,
            member_id: record.id,
            match_method: 'semantic',
            similarity: bestSimilarity,
            source_table: record.source_table,
            activity_tags: getActivityTagsForSource(record.source_table)
          });

        await supabase
          .from('practical_work')
          .update({ cluster_id: bestMatch.cluster_id, is_canonical: false })
          .eq('id', record.id);

        // Update cluster count
        await supabase.rpc('increment_cluster_member_count', {
          cluster_id: bestMatch.cluster_id
        });

        membersAdded++;
      }
    }
  }

  return { clusters: clustersCreated, members: membersAdded };
}

/**
 * Update cluster statistics and overlap flags
 */
async function updateClusterStats(supabase: any) {
  const { data: clusters } = await supabase
    .from('practical_work_clusters')
    .select('id');

  if (!clusters) return;

  for (const cluster of clusters) {
    // Get all members
    const { data: members } = await supabase
      .from('practical_work_cluster_members')
      .select('source_table, similarity')
      .eq('cluster_id', cluster.id);

    if (!members) continue;

    const sources = members.map((m: any) => m.source_table);
    const overlapFlags = {
      has_installation: sources.includes('installation_knowledge'),
      has_maintenance: sources.includes('maintenance_knowledge'),
      has_inspection: sources.includes('inspection_testing_knowledge')
    };

    const avgSimilarity =
      members.reduce((sum: number, m: any) => sum + parseFloat(m.similarity), 0) /
      members.length;

    await supabase
      .from('practical_work_clusters')
      .update({
        overlap_flags: overlapFlags,
        metrics: { avg_similarity: avgSimilarity, member_count: members.length }
      })
      .eq('id', cluster.id);
  }
}

// ===== Helper Functions =====

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '');
}

function hashText(text: string): string {
  // Simple hash for demo - in production use crypto.subtle.digest
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (!a || !b || a.length !== b.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function jaccardSimilarity(a: string, b: string): number {
  const setA = new Set(a.split(/\s+/));
  const setB = new Set(b.split(/\s+/));
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

function buildSourcesMap(members: any[]): any {
  const sources: any = {
    installation_knowledge: [],
    maintenance_knowledge: [],
    inspection_testing_knowledge: []
  };

  for (const member of members) {
    if (sources[member.source_table]) {
      sources[member.source_table].push(member.id);
    }
  }

  return sources;
}

function buildOverlapFlags(members: any[]): any {
  const sources = new Set(members.map((m) => m.source_table));
  return {
    has_installation: sources.has('installation_knowledge'),
    has_maintenance: sources.has('maintenance_knowledge'),
    has_inspection: sources.has('inspection_testing_knowledge')
  };
}

function deriveActivityTypes(members: any[]): string[] {
  const types = new Set<string>();
  for (const member of members) {
    const tags = getActivityTagsForSource(member.source_table);
    tags.forEach((t) => types.add(t));
  }
  return Array.from(types);
}

function getActivityTagsForSource(sourceTable: string): string[] {
  const mapping: Record<string, string[]> = {
    installation_knowledge: ['installation'],
    maintenance_knowledge: ['maintenance', 'fault_diagnosis'],
    inspection_testing_knowledge: ['testing', 'inspection']
  };
  return mapping[sourceTable] || [];
}
