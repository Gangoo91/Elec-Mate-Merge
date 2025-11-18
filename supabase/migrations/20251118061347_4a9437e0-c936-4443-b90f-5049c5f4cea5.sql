-- Phase 4: Database Optimization (5-10 seconds faster RAG)
-- Add indexes for faster RAG queries

-- Regulations intelligence indexes
CREATE INDEX IF NOT EXISTS idx_reg_keywords 
ON regulations_intelligence USING GIN (keywords);

CREATE INDEX IF NOT EXISTS idx_reg_voltage 
ON regulations_intelligence (applies_to);

CREATE INDEX IF NOT EXISTS idx_reg_topic 
ON regulations_intelligence (primary_topic);

-- Practical work intelligence indexes
CREATE INDEX IF NOT EXISTS idx_pw_keywords 
ON practical_work_intelligence USING GIN (keywords);

CREATE INDEX IF NOT EXISTS idx_pw_equipment 
ON practical_work_intelligence (equipment_category);

CREATE INDEX IF NOT EXISTS idx_pw_topic 
ON practical_work_intelligence (primary_topic);

-- Circuit design cache optimization
CREATE INDEX IF NOT EXISTS idx_cache_key_created 
ON circuit_design_cache_v3 (cache_key, created_at DESC);

-- Circuit level cache optimization
CREATE INDEX IF NOT EXISTS idx_circuit_hash_created 
ON circuit_level_cache (circuit_hash, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_circuit_type_voltage 
ON circuit_level_cache (circuit_type, voltage);
