/**
 * Practical Work Unification Pipeline
 * Deduplicates and clusters knowledge from Installation, Maintenance, and Inspection sources
 * 
 * Process:
 * 1. Normalize and hash all content
 * 2. Cluster exact duplicates (same hash)
 * 3. Cluster semantic near-duplicates (vector similarity)
 * 4. Assign canonical records
 * 5. Build provenance and overlap metadata
 */

import { corsHeaders, serve, createClient } from '../_shared/deps.ts';
import { normalizeText, hashText, jaccardSimilarity, cosineSimilarity, isNearDuplicate } from '../_shared/text-utils.ts';

const BATCH_SIZE = 100;
const MAX_CLUSTER_SIZE = 20;
const VECTOR_SEARCH_LIMIT = 50;

interface PracticalWorkRecord {
  id: string;
  content: string;
  source_table: string;
  created_at: string;
  embedding?: number[];
}

interface Cluster {
  id: string;
  canonical_id: string;
  members: ClusterMember[];
  sources: Record<string, string[]>;
  activity_suggested: string[];
  overlap_flags: Record<string, boolean>;
}

interface ClusterMember {
  id: string;
  match_method: 'exact' | 'semantic';
  similarity: number;
  source_table: string;
  activity_tags: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { mode, skipNormalization, skipClustering } = await req.json();

    console.log('🚀 Starting practical work unification', { mode, skipNormalization, skipClustering });

    // Step 1: Normalize and hash content
    let normalizedCount = 0;
    if (!skipNormalization) {
      normalizedCount = await normalizeAndHashContent(supabase);
      console.log(`✅ Normalized ${normalizedCount} records`);
    }

    // Step 2: Cluster exact duplicates
    let exactClusters = 0;
    if (!skipClustering) {
      exactClusters = await clusterExactDuplicates(supabase);
      console.log(`✅ Created ${exactClusters} exact-duplicate clusters`);
    }

    // Step 3: Cluster semantic near-duplicates
    let semanticClusters = 0;
    if (!skipClustering) {
      semanticClusters = await clusterSemanticDuplicates(supabase);
      console.log(`✅ Expanded ${semanticClusters} clusters with semantic matches`);
    }

    // Step 4: Get statistics
    const stats = await getUnificationStats(supabase);

    return new Response(
      JSON.stringify({
        success: true,
        stats: {
          normalized: normalizedCount,
          exact_clusters: exactClusters,
          semantic_clusters: semanticClusters,
          ...stats
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Unification error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Step 1: Normalize and hash all content
 */
async function normalizeAndHashContent(supabase: any): Promise<number> {
  console.log('📝 Normalizing content...');
  
  const { data: records, error } = await supabase
    .from('practical_work')
    .select('id, content')
    .is('content_hash', null);

  if (error) throw error;
  if (!records || records.length === 0) {
    console.log('ℹ️ No records to normalize');
    return 0;
  }

  console.log(`Processing ${records.length} records in batches of ${BATCH_SIZE}`);

  let processed = 0;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    
    const updates = await Promise.all(
      batch.map(async (record) => {
        const normalized = normalizeText(record.content);
        const hash = await hashText(normalized);
        return { id: record.id, content_normalized: normalized, content_hash: hash };
      })
    );

    // Batch update
    for (const update of updates) {
      await supabase
        .from('practical_work')
        .update({
          content_normalized: update.content_normalized,
          content_hash: update.content_hash
        })
        .eq('id', update.id);
    }

    processed += batch.length;
    console.log(`  Normalized ${processed}/${records.length}`);
  }

  return processed;
}

/**
 * Step 2: Cluster exact duplicates (same content_hash)
 */
async function clusterExactDuplicates(supabase: any): Promise<number> {
  console.log('🔗 Clustering exact duplicates...');

  // Get all records grouped by hash
  const { data: records } = await supabase
    .from('practical_work')
    .select('content_hash, id, content, source_table, created_at')
    .not('content_hash', 'is', null)
    .order('content_hash');
  
  // Group by hash
  const groups: Record<string, PracticalWorkRecord[]> = {};
  records?.forEach((record: any) => {
    if (!groups[record.content_hash]) groups[record.content_hash] = [];
    groups[record.content_hash].push(record);
  });
  
  const hashGroups = Object.values(groups).filter(g => g.length > 1);

  if (!hashGroups || hashGroups.length === 0) {
    console.log('ℹ️ No exact duplicates found');
    return 0;
  }

  console.log(`Found ${hashGroups.length} duplicate hash groups`);

  let clustersCreated = 0;
  
  for (const group of hashGroups) {
    // Pick canonical: longest content, earliest created_at
    const canonical = group.sort((a: any, b: any) => {
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
        member_count: group.length,
        metrics: { method: 'exact', avg_similarity: 1.0 },
        overlap_flags: buildOverlapFlags(group)
      })
      .select()
      .single();

    if (clusterError) {
      console.error(`  Failed to create cluster for canonical ${canonical.id}:`, clusterError);
      continue;
    }

    // Mark canonical
    await supabase
      .from('practical_work')
      .update({
        is_canonical: true,
        cluster_id: cluster.id,
        sources: buildSources(group),
        activity_suggested: suggestActivities(group)
      })
      .eq('id', canonical.id);

    // Add all members
    const members = group.map((record: any) => ({
      cluster_id: cluster.id,
      member_id: record.id,
      match_method: 'exact',
      similarity: 1.0,
      source_table: record.source_table,
      activity_tags: getActivityTagsForSource(record.source_table)
    }));

    await supabase.from('practical_work_cluster_members').insert(members);

    // Update non-canonical members
    for (const member of group) {
      if (member.id !== canonical.id) {
        await supabase
          .from('practical_work')
          .update({ cluster_id: cluster.id, is_canonical: false })
          .eq('id', member.id);
      }
    }

    clustersCreated++;
    if (clustersCreated % 10 === 0) {
      console.log(`  Created ${clustersCreated} clusters`);
    }
  }

  return clustersCreated;
}

/**
 * Step 3: Cluster semantic near-duplicates
 */
async function clusterSemanticDuplicates(supabase: any): Promise<number> {
  console.log('🧠 Clustering semantic duplicates...');

  // Get all canonical records with embeddings
  const { data: canonicals, error } = await supabase
    .from('practical_work')
    .select('id, content, content_normalized, embedding, cluster_id')
    .eq('is_canonical', true)
    .not('embedding', 'is', null);

  if (error) throw error;
  if (!canonicals || canonicals.length === 0) {
    console.log('ℹ️ No canonical records with embeddings');
    return 0;
  }

  console.log(`Processing ${canonicals.length} canonical records`);

  let clustersExpanded = 0;

  for (const canonical of canonicals) {
    // Find potential semantic matches (not already in a cluster)
    const { data: candidates, error: searchError } = await supabase
      .from('practical_work')
      .select('id, content, content_normalized, embedding, source_table, created_at')
      .is('cluster_id', null)
      .not('embedding', 'is', null)
      .limit(VECTOR_SEARCH_LIMIT);

    if (searchError || !candidates || candidates.length === 0) continue;

    const matches: ClusterMember[] = [];

    for (const candidate of candidates) {
      // Calculate similarities
      const cosine = cosineSimilarity(canonical.embedding, candidate.embedding);
      const jaccard = jaccardSimilarity(
        canonical.content_normalized || canonical.content,
        candidate.content_normalized || candidate.content
      );

      // Check if near-duplicate
      if (isNearDuplicate(cosine, jaccard)) {
        matches.push({
          id: candidate.id,
          match_method: 'semantic',
          similarity: cosine,
          source_table: candidate.source_table,
          activity_tags: getActivityTagsForSource(candidate.source_table)
        });
      }
    }

    if (matches.length === 0) continue;

    // Cap cluster size
    const addMatches = matches.slice(0, MAX_CLUSTER_SIZE);

    // Get cluster
    const { data: cluster } = await supabase
      .from('practical_work_clusters')
      .select('*')
      .eq('canonical_id', canonical.id)
      .single();

    if (!cluster) continue;

    // Add members to cluster
    const memberInserts = addMatches.map(m => ({
      cluster_id: cluster.id,
      member_id: m.id,
      match_method: m.match_method,
      similarity: m.similarity,
      source_table: m.source_table,
      activity_tags: m.activity_tags
    }));

    await supabase.from('practical_work_cluster_members').insert(memberInserts);

    // Update member records
    for (const match of addMatches) {
      await supabase
        .from('practical_work')
        .update({ cluster_id: cluster.id, is_canonical: false })
        .eq('id', match.id);
    }

    // Update cluster member_count and overlap_flags
    const { data: allMembers } = await supabase
      .from('practical_work_cluster_members')
      .select('source_table')
      .eq('cluster_id', cluster.id);

    await supabase
      .from('practical_work_clusters')
      .update({
        member_count: allMembers.length,
        overlap_flags: buildOverlapFlags(allMembers),
        metrics: {
          ...cluster.metrics,
          semantic_matches: addMatches.length,
          avg_semantic_similarity: addMatches.reduce((sum, m) => sum + m.similarity, 0) / addMatches.length
        }
      })
      .eq('id', cluster.id);

    clustersExpanded++;
    console.log(`  Expanded cluster ${canonical.id} with ${addMatches.length} semantic matches`);
  }

  return clustersExpanded;
}

function buildOverlapFlags(members: any[]): Record<string, boolean> {
  const sources = new Set(members.map(m => m.source_table));
  return {
    has_installation: sources.has('installation_knowledge'),
    has_maintenance: sources.has('maintenance_knowledge'),
    has_inspection: sources.has('inspection_testing_knowledge')
  };
}

function buildSources(members: any[]): Record<string, string[]> {
  const sources: Record<string, string[]> = {
    installation_knowledge: [],
    maintenance_knowledge: [],
    inspection_testing_knowledge: []
  };
  
  members.forEach(m => {
    if (sources[m.source_table]) {
      sources[m.source_table].push(m.id);
    }
  });
  
  return sources;
}

function suggestActivities(members: any[]): string[] {
  const activities = new Set<string>();
  
  members.forEach(m => {
    const tags = getActivityTagsForSource(m.source_table);
    tags.forEach(tag => activities.add(tag));
  });
  
  return Array.from(activities);
}

function getActivityTagsForSource(sourceTable: string): string[] {
  switch (sourceTable) {
    case 'installation_knowledge':
      return ['installation', 'wiring'];
    case 'maintenance_knowledge':
      return ['maintenance', 'fault_diagnosis', 'repair'];
    case 'inspection_testing_knowledge':
      return ['testing', 'inspection', 'certification'];
    default:
      return [];
  }
}

async function getUnificationStats(supabase: any) {
  const { count: totalRecords } = await supabase
    .from('practical_work')
    .select('*', { count: 'exact', head: true });

  const { count: canonicalRecords } = await supabase
    .from('practical_work')
    .select('*', { count: 'exact', head: true })
    .eq('is_canonical', true);

  const { count: clusteredRecords } = await supabase
    .from('practical_work')
    .select('*', { count: 'exact', head: true })
    .not('cluster_id', 'is', null);

  const { count: totalClusters } = await supabase
    .from('practical_work_clusters')
    .select('*', { count: 'exact', head: true });

  return {
    total_records: totalRecords || 0,
    canonical_records: canonicalRecords || 0,
    clustered_records: clusteredRecords || 0,
    total_clusters: totalClusters || 0,
    deduplication_rate: totalRecords ? ((totalRecords - canonicalRecords) / totalRecords * 100).toFixed(1) : 0
  };
}
