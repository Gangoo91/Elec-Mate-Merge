-- ============================================================================
-- Phase 1: Pre-Extracted Hazards Database
-- Store structured hazards extracted from BS 7671 regulations
-- ============================================================================

create table regulation_hazards_extracted (
  id uuid primary key default gen_random_uuid(),
  regulation_id uuid references bs7671_embeddings(id),
  
  -- Pre-identified hazard
  hazard_description text not null,
  hazard_category text not null, -- electrical, physical, chemical, environmental, human_factors
  likelihood int check (likelihood between 1 and 5),
  severity int check (severity between 1 and 5),
  risk_score int generated always as (likelihood * severity) stored,
  
  -- Pre-generated controls
  control_measures text[] not null,
  control_hierarchy text, -- engineering, administrative, ppe
  
  -- Pre-determined PPE
  required_ppe jsonb, -- [{"type": "Insulated gloves", "standard": "BS EN 60903", "mandatory": true, "purpose": "Protection from electric shock"}]
  
  -- Context applicability
  applies_to_work_types text[] default '{}', -- domestic, commercial, industrial
  applies_to_locations text[] default '{}', -- bathroom, kitchen, outdoor, garage, general
  applies_to_equipment text[] default '{}', -- consumer_unit, shower, ev_charger, socket, lighting, cooker
  applies_to_installation_phases text[] default '{}', -- site_survey, isolation, installation, testing, commissioning
  
  -- Regulation citation
  regulation_number text not null,
  regulation_section text not null,
  regulation_excerpt text, -- Relevant excerpt from regulation
  
  -- Embeddings for semantic search
  hazard_embedding vector(1536),
  
  -- Quality metrics (self-optimization)
  confidence_score float default 1.0,
  usage_count int default 0,
  
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Indexes for fast retrieval
create index idx_reg_hazards_regulation on regulation_hazards_extracted(regulation_id);
create index idx_reg_hazards_category on regulation_hazards_extracted(hazard_category);
create index idx_reg_hazards_risk_score on regulation_hazards_extracted(risk_score desc);
create index idx_reg_hazards_work_types on regulation_hazards_extracted using gin(applies_to_work_types);
create index idx_reg_hazards_locations on regulation_hazards_extracted using gin(applies_to_locations);
create index idx_reg_hazards_equipment on regulation_hazards_extracted using gin(applies_to_equipment);
create index idx_reg_hazards_phases on regulation_hazards_extracted using gin(applies_to_installation_phases);
create index idx_reg_hazards_confidence on regulation_hazards_extracted(confidence_score desc);
create index idx_reg_hazards_usage on regulation_hazards_extracted(usage_count desc);

-- HNSW index for vector similarity search
create index idx_reg_hazards_embedding on regulation_hazards_extracted 
  using hnsw (hazard_embedding vector_cosine_ops);

-- ============================================================================
-- RPC Function: Match Extracted Hazards by Semantic Similarity
-- ============================================================================

create or replace function match_extracted_hazards(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  hazard_description text,
  hazard_category text,
  likelihood int,
  severity int,
  risk_score int,
  control_measures text[],
  required_ppe jsonb,
  applies_to_work_types text[],
  applies_to_locations text[],
  applies_to_equipment text[],
  applies_to_installation_phases text[],
  regulation_number text,
  regulation_section text,
  regulation_excerpt text,
  confidence_score float,
  usage_count int,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    rhe.id,
    rhe.hazard_description,
    rhe.hazard_category,
    rhe.likelihood,
    rhe.severity,
    rhe.risk_score,
    rhe.control_measures,
    rhe.required_ppe,
    rhe.applies_to_work_types,
    rhe.applies_to_locations,
    rhe.applies_to_equipment,
    rhe.applies_to_installation_phases,
    rhe.regulation_number,
    rhe.regulation_section,
    rhe.regulation_excerpt,
    rhe.confidence_score,
    rhe.usage_count,
    1 - (rhe.hazard_embedding <=> query_embedding) as similarity
  from regulation_hazards_extracted rhe
  where 1 - (rhe.hazard_embedding <=> query_embedding) > match_threshold
  order by rhe.hazard_embedding <=> query_embedding
  limit match_count;
end;
$$;

-- ============================================================================
-- RPC Function: Increment Hazard Usage (Self-Optimization)
-- ============================================================================

create or replace function increment_hazard_usage(hazard_id uuid)
returns void
language plpgsql
as $$
begin
  update regulation_hazards_extracted
  set 
    usage_count = usage_count + 1,
    confidence_score = least(confidence_score * 1.01, 1.0), -- Slight boost, capped at 1.0
    updated_at = now()
  where id = hazard_id;
end;
$$;

-- ============================================================================
-- Comments
-- ============================================================================

comment on table regulation_hazards_extracted is 'Pre-extracted structured hazards from BS 7671 regulations with embeddings for intelligent retrieval';
comment on column regulation_hazards_extracted.hazard_description is 'Specific, actionable hazard description (10-20 words)';
comment on column regulation_hazards_extracted.control_measures is 'Array of specific control measures, BS 7671 compliant';
comment on column regulation_hazards_extracted.required_ppe is 'JSON array of PPE items with type, standard, mandatory flag, and purpose';
comment on column regulation_hazards_extracted.confidence_score is 'Quality score (0-1) that increases with successful usage and decreases when not used';
comment on column regulation_hazards_extracted.usage_count is 'Number of times this hazard was included in final RAMS documents';