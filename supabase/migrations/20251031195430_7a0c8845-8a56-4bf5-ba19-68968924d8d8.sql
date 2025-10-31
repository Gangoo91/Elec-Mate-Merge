-- Add facet_type to practical_work_intelligence
ALTER TABLE practical_work_intelligence
ADD COLUMN facet_type TEXT NOT NULL DEFAULT 'primary';

-- Add constraint for valid facet types
ALTER TABLE practical_work_intelligence
ADD CONSTRAINT facet_type_check CHECK (
  facet_type IN ('primary', 'installation', 'testing', 'maintenance', 'costing')
);

-- Change primary key to composite (allows multiple rows per practical_work_id)
ALTER TABLE practical_work_intelligence
DROP CONSTRAINT IF EXISTS practical_work_intelligence_pkey,
ADD CONSTRAINT practical_work_intelligence_pkey 
  PRIMARY KEY (practical_work_id, facet_type);

-- Add indexes for facet-based queries
CREATE INDEX IF NOT EXISTS idx_pwi_facet_type ON practical_work_intelligence(facet_type);
CREATE INDEX IF NOT EXISTS idx_pwi_canonical_facet ON practical_work_intelligence(canonical_id, facet_type);