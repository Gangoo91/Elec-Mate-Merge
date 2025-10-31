-- Practical Work Unification: Schema for Deduplication & Clustering
-- Phase 1: Augment practical_work table

ALTER TABLE practical_work
ADD COLUMN IF NOT EXISTS content_normalized text,
ADD COLUMN IF NOT EXISTS content_hash text,
ADD COLUMN IF NOT EXISTS cluster_id uuid,
ADD COLUMN IF NOT EXISTS is_canonical boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS activity_suggested text[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS sources jsonb NOT NULL DEFAULT '{}';

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_pw_hash ON practical_work(content_hash);
CREATE INDEX IF NOT EXISTS idx_pw_cluster ON practical_work(cluster_id);
CREATE INDEX IF NOT EXISTS idx_pw_canonical ON practical_work(is_canonical) WHERE is_canonical = true;

-- Phase 2: Create clusters table
CREATE TABLE IF NOT EXISTS practical_work_clusters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_id uuid NOT NULL REFERENCES practical_work(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metrics jsonb NOT NULL DEFAULT '{}',
  overlap_flags jsonb NOT NULL DEFAULT '{}',
  member_count integer NOT NULL DEFAULT 1,
  CONSTRAINT valid_member_count CHECK (member_count >= 1)
);

CREATE INDEX IF NOT EXISTS idx_pwc_canonical ON practical_work_clusters(canonical_id);
CREATE INDEX IF NOT EXISTS idx_pwc_overlap ON practical_work_clusters USING gin(overlap_flags);

-- Enable RLS
ALTER TABLE practical_work_clusters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to clusters"
ON practical_work_clusters FOR SELECT
USING (true);

CREATE POLICY "Service role can manage clusters"
ON practical_work_clusters FOR ALL
USING (auth.role() = 'service_role');

-- Phase 3: Create cluster members junction table
CREATE TABLE IF NOT EXISTS practical_work_cluster_members (
  cluster_id uuid NOT NULL REFERENCES practical_work_clusters(id) ON DELETE CASCADE,
  member_id uuid NOT NULL REFERENCES practical_work(id) ON DELETE CASCADE,
  match_method text NOT NULL CHECK (match_method IN ('exact', 'semantic')),
  similarity numeric NOT NULL CHECK (similarity >= 0 AND similarity <= 1),
  source_table text NOT NULL CHECK (source_table IN ('installation_knowledge', 'maintenance_knowledge', 'inspection_testing_knowledge')),
  activity_tags text[] NOT NULL DEFAULT '{}',
  added_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (cluster_id, member_id)
);

CREATE INDEX IF NOT EXISTS idx_pwcm_member ON practical_work_cluster_members(member_id);
CREATE INDEX IF NOT EXISTS idx_pwcm_source ON practical_work_cluster_members(source_table);

-- Enable RLS
ALTER TABLE practical_work_cluster_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to cluster members"
ON practical_work_cluster_members FOR SELECT
USING (true);

CREATE POLICY "Service role can manage cluster members"
ON practical_work_cluster_members FOR ALL
USING (auth.role() = 'service_role');

-- Phase 4: Augment practical_work_intelligence table
ALTER TABLE practical_work_intelligence
ADD COLUMN IF NOT EXISTS cluster_id uuid REFERENCES practical_work_clusters(id),
ADD COLUMN IF NOT EXISTS canonical_id uuid REFERENCES practical_work(id),
ADD COLUMN IF NOT EXISTS source_tables text[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS provenance jsonb NOT NULL DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_pwi_cluster ON practical_work_intelligence(cluster_id);
CREATE INDEX IF NOT EXISTS idx_pwi_canonical ON practical_work_intelligence(canonical_id);

-- Phase 5: Create materialized view for canonical records
CREATE MATERIALIZED VIEW IF NOT EXISTS v_practical_work_canonical AS
SELECT 
  pw.*,
  pwc.member_count,
  pwc.overlap_flags,
  pwc.metrics
FROM practical_work pw
INNER JOIN practical_work_clusters pwc ON pwc.canonical_id = pw.id
WHERE pw.is_canonical = true;

CREATE UNIQUE INDEX IF NOT EXISTS idx_vpwc_id ON v_practical_work_canonical(id);
CREATE INDEX IF NOT EXISTS idx_vpwc_cluster ON v_practical_work_canonical(cluster_id);

-- Phase 6: Update search function to deduplicate by cluster
CREATE OR REPLACE FUNCTION search_practical_work_intelligence(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10,
  filter_activity_types text[] DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  practical_work_id uuid,
  cluster_id uuid,
  canonical_id uuid,
  title text,
  activity_types text[],
  source_tables text[],
  safety_critical boolean,
  common_mistakes jsonb,
  best_practices jsonb,
  tools_required jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH ranked_results AS (
    SELECT DISTINCT ON (COALESCE(pwi.cluster_id, pwi.id))
      pwi.id,
      pwi.practical_work_id,
      pwi.cluster_id,
      pwi.canonical_id,
      pwi.title,
      pwi.activity_types,
      pwi.source_tables,
      pwi.safety_critical,
      pwi.common_mistakes,
      pwi.best_practices,
      pwi.tools_required,
      1 - (pwi.embedding <=> query_embedding) as similarity
    FROM practical_work_intelligence pwi
    WHERE 
      pwi.embedding IS NOT NULL
      AND 1 - (pwi.embedding <=> query_embedding) > match_threshold
      AND (
        filter_activity_types IS NULL 
        OR pwi.activity_types && filter_activity_types
      )
    ORDER BY 
      COALESCE(pwi.cluster_id, pwi.id),
      1 - (pwi.embedding <=> query_embedding) DESC
  )
  SELECT * FROM ranked_results
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- Trigger to update cluster updated_at
CREATE OR REPLACE FUNCTION update_cluster_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE practical_work_clusters
  SET updated_at = now()
  WHERE id = NEW.cluster_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cluster_timestamp
AFTER INSERT OR UPDATE ON practical_work_cluster_members
FOR EACH ROW
EXECUTE FUNCTION update_cluster_timestamp();