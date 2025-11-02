# 8-Facet Enforcement System

## Overview
This system ensures that practical work enrichment produces **exactly 8 facets per source** with high quality and diversity, eliminating the previous issue of 15-40 facets per source.

## Implementation

### 1. Database Layer
✅ **Added** (`practical_work_intelligence` table):
- `facet_hash` column for deduplication
- Unique index on `(practical_work_id, facet_hash)` to prevent duplicates
- Index on `(practical_work_id, created_at)` for fast compliance checks

✅ **Created** monitoring view:
- `practical_work_facet_compliance` - Real-time 8-facet compliance metrics
  - Last 10 min: sources enriched, avg facets/source, compliance %
  - All-time: total sources, avg facets/source

✅ **Created** cleanup function:
- `prune_practical_work_facets_to_8()` - Prunes historical data to top 8 per source based on quality score

### 2. Enrichment Function (`enrich-practical-work`)
✅ **Enhanced prompt**:
- Changed `targetFacets` from `'8-20'` to `'8'`
- Added explicit "EXACTLY 8 TOTAL (not per type)" instruction
- Added warning against breaking into tiny sub-facets

✅ **Idempotency check**:
- Before enrichment, checks existing facet count
- Skips if ≥8 facets already exist
- Only inserts up to `(8 - existing_count)` new facets

✅ **Deduplication**:
- Computes `facet_hash` from: primary_topic + equipment_category + keywords + bs7671_regulations
- Prevents duplicate facets across retries/reruns

✅ **Quality scoring**:
```typescript
Score = 
  + 1 (core fields: duration, skill_level, safety_requirements)
  + 2 (BS7671 regulations present)
  + 2 (test_procedures ≥3)
  + 1 (tools_required ≥4)
  + 1 (materials_needed ≥3)
```

✅ **Diversity preservation**:
- Light penalty (-0.5) for repeated `equipment_category:facet_type` pairs
- Ensures varied facets rather than near-duplicates

✅ **Top-8 selection**:
- Scores all GPT-generated facets
- Applies diversity penalty
- Sorts by score (desc) and takes top 8
- Only inserts these top 8 (or fewer if topping up)

### 3. Monitoring (EnrichmentConsole.tsx)
✅ **Updated** target multiplier:
- Changed from `12.0` to `8.0` facets per source

✅ **Added** compliance metrics display:
- Shows last 10 min stats: avg facets/source, compliance %, sources enriched
- Shows all-time avg facets/source
- Only visible for `practical_work` task

✅ **Added** "Prune to 8 Facets" button:
- Calls `prune_practical_work_facets_to_8()` RPC
- Shows before/after stats
- Confirms before execution

## Usage

### Start Fresh Enrichment
1. Navigate to `/admin/enrichment?task=practical_work`
2. Click "Start" to begin enrichment with 8-facet enforcement
3. Monitor compliance metrics in real-time

### Clean Up Historical Data
1. Click "Prune to 8 Facets" button
2. Confirm deletion (deletes excess facets based on quality score)
3. View results showing:
   - Sources processed
   - Facets deleted
   - Avg facets before → after

### Monitor Compliance
- **Last 10 min metrics** update every 10 seconds
- **All-time avg** shows overall data quality
- Target: ≥95% compliance (exactly 8 facets)

## Expected Results

### Before (Current State)
- **Avg facets/source**: 88.6 overall, 20-24 in last 10 min
- **Compliance**: 15-21% exactly 8 facets
- **Distribution**: 15-40+ facets per source (wide spread)

### After Implementation
- **Avg facets/source**: 8.0 (strict)
- **Compliance**: ≥95% exactly 8 facets
- **Distribution**: Tight clustering at 8 facets
- **Benefits**:
  - Faster RAG retrieval (less noise)
  - Lower storage costs (3-5x reduction)
  - Better search quality (more focused results)
  - Easier maintenance

## Rollout Order
1. ✅ Database migration (facet_hash, indexes, view, function)
2. ✅ Function updates (dedup, scoring, capping, idempotency)
3. ⏳ Run historical prune (click button when ready)
4. ✅ Monitor compliance metrics
5. ⏳ Verify ≥95% compliance in 10-min window

## Technical Details

### Hash Computation
```typescript
canonical = [
  primary_topic.toLowerCase().trim(),
  equipment_category.toLowerCase().trim(),
  keywords.sort().join('|'),
  bs7671_regulations.sort().join('|')
].join('::')

hash = SHA-256(canonical).substring(0, 32)
```

### Quality Score Calculation
```typescript
score = 
  (duration ? 1 : 0) +
  (skill_level ? 1 : 0) +
  (safety_requirements ? 1 : 0) +
  (bs7671_regs.length > 0 ? 2 : 0) +
  (test_procedures.length ≥ 3 ? 2 : 0) +
  (tools_required.length ≥ 4 ? 1 : 0) +
  (materials_needed.length ≥ 3 ? 1 : 0)
```

### Diversity Penalty
```typescript
if (categoryCounts[`${category}:${type}`] > 1) {
  score -= 0.5  // Light penalty for duplicates
}
```

## Testing Checklist
- [ ] Start fresh enrichment job
- [ ] Verify avg facets/source approaches 8.0
- [ ] Check compliance % reaches ≥90% within 10 min
- [ ] Run prune function on historical data
- [ ] Verify all-time avg drops from 88.6 → 8.0
- [ ] Confirm no duplicate facets (unique hash constraint works)
- [ ] Test idempotency (re-running doesn't create duplicates)

## Maintenance
- **Monitor** compliance metrics weekly
- **Prune** if avg drifts above 8.5
- **Review** low-compliance sources (if compliance <80%)
- **Adjust** quality scoring if needed (currently optimized for BS7671 + tools/materials)
