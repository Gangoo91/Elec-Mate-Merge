# RAG Tables Documentation

> Retrieval-Augmented Generation (RAG) knowledge base for the Electrical Design AI System

## Overview

This document describes the 8 RAG tables powering the AI agents. The system uses a **two-tier architecture**:

1. **Intelligence Tables** - Pre-enriched with keywords, GIN indexes, <1s response
2. **Embedding Tables** - Vector embeddings (1536-dim), semantic search, 2-5s response

**Total Records: 308,165**

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          RAG Search System                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │              INTELLIGENCE TABLES (Keyword-Based)                        │ │
│  │                    GIN Indexes - <1s Response                           │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ regulations_intelligence      │ 47,588 records  │ BS 7671 Regulations  │ │
│  │ practical_work_intelligence   │ 199,726 records │ Installation/Testing │ │
│  │ design_knowledge_intelligence │ 7,215 records   │ Design Calculations  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │               EMBEDDING TABLES (Vector-Based)                           │ │
│  │                 IVFFlat Index - 2-5s Response                           │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ bs7671_embeddings             │ 2,557 records   │ Full Regulation Text │ │
│  │ health_safety_knowledge       │ 2,312 records   │ HSE Guidance         │ │
│  │ pricing_embeddings            │ 43,371 records  │ Material Pricing     │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                    SUPPORTING TABLES                                    │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ inspection_testing_knowledge  │ 1,738 records   │ Inspection Procedures│ │
│  │ project_mgmt_knowledge        │ 2,941 records   │ Labour/Project Data  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Intelligence Tables (Keyword-Based)

### 1. `regulations_intelligence`

**Records:** 47,588  
**Purpose:** Pre-enriched BS 7671:2018+A3:2024 regulations with keyword classification

| Column | Type | Description |
|--------|------|-------------|
| `regulation_number` | text | e.g., "411.3.3" |
| `primary_topic` | text | Main subject classification |
| `keywords` | text[] | Searchable keyword array |
| `category` | text | High-level category |
| `subcategory` | text | Specific subcategory |
| `applies_to` | text[] | Circuit types, installation types |
| `related_regulations` | text[] | Cross-references |
| `confidence_score` | float | Enrichment quality (0.0-1.0) |
| `content` | text | Full regulation text |

**Search Function:**
```sql
search_regulations_intelligence_hybrid(
  query_text text,
  match_count int DEFAULT 10,
  filter_categories text[] DEFAULT NULL
)
```

**Indexes:**
- GIN on `keywords`, `applies_to`, `related_regulations`
- Partial index on `confidence_score >= 0.80`
- B-tree on `regulation_number`, `category`

**Performance:** <100ms

**Used By:** Circuit Designer, Cost Engineer, Installation Specialist, Health & Safety, Maintenance Specialist, AI Assistant

---

### 2. `practical_work_intelligence`

**Records:** 199,726  
**Purpose:** Multi-dimensional practical installation, testing, and maintenance intelligence

| Column | Type | Description |
|--------|------|-------------|
| `activity_types` | text[] | install, test, maintain, inspect |
| `equipment_category` | text | Equipment classification |
| `installation_method` | text | Method description |
| `test_procedures` | text[] | Required test procedures |
| `maintenance_intervals` | text | Recommended intervals |
| `tools_required` | text[] | Required tools/equipment |
| `bs7671_regulations` | text[] | Applicable regulations |
| `keywords` | text[] | Searchable keywords |
| `skill_level` | text | Required competency level |
| `confidence_score` | float | Enrichment quality (0.0-1.0) |
| `content` | text | Full procedure text |

**Search Functions:**
```sql
-- Hybrid search (keyword + tsvector) - More accurate
search_practical_work_intelligence_hybrid(
  query_text text,
  match_count int DEFAULT 10,
  filter_trade text DEFAULT NULL
)

-- Fast search (GIN keyword only) - 21x faster
search_practical_work_fast(
  query_text text,
  match_count int DEFAULT 10
)
```

**Indexes:**
- GIN on `activity_types`, `keywords`, `bs7671_regulations`, `tools_required`
- B-tree on `equipment_category`, `skill_level`
- tsvector index for full-text search

**Performance:** 
- `_fast`: <1s
- `_hybrid`: 2-3s

**Used By:** Installation Specialist (primary), Maintenance Specialist, Health & Safety, Circuit Designer

---

### 3. `design_knowledge_intelligence`

**Records:** 7,215  
**Purpose:** 8-facet enriched design calculations, formulas, and worked examples

| Column | Type | Description |
|--------|------|-------------|
| `facet_type` | text | formula, regulation, example, table, concept, general, procedure, specification |
| `primary_topic` | text | Main design topic |
| `content` | text | Full content text |
| `formulas` | text[] | Mathematical formulas |
| `calculation_steps` | text[] | Step-by-step procedures |
| `worked_examples` | jsonb[] | Complete worked examples |
| `bs7671_regulations` | text[] | Referenced regulations |
| `load_types` | text[] | Applicable load types |
| `cable_sizes` | text[] | Referenced cable sizes |
| `power_ratings` | text[] | Power rating ranges |
| `voltage_levels` | text[] | Applicable voltages |
| `keywords` | text[] | Searchable keywords |
| `confidence_score` | float | Enrichment quality (0.0-1.0) |

**Search Function:**
```sql
search_design_knowledge_intelligence_hybrid(
  query_text text,
  match_count int DEFAULT 10,
  filter_category text DEFAULT NULL,
  filter_load_type text DEFAULT NULL
)
```

**Indexes:**
- GIN on `keywords`, `formulas`, `bs7671_regulations`, `applies_to`, `load_types`, `cable_sizes`
- B-tree on `facet_type`, `design_category`

**Performance:** <200ms

**Used By:** Circuit Designer (primary), Cost Engineer

---

## Embedding Tables (Vector-Based)

### 4. `bs7671_embeddings`

**Records:** 2,557  
**Purpose:** Full-text BS 7671:2018+A3:2024 regulations with vector embeddings for semantic search

| Column | Type | Description |
|--------|------|-------------|
| `regulation_number` | text | e.g., "411.3.3" |
| `section` | text | Section heading |
| `content` | text | Full regulation text |
| `amendment` | text | Amendment version (A3:2024) |
| `embedding` | vector(1536) | OpenAI text-embedding-ada-002 |
| `metadata` | jsonb | Additional classification |

**Search Functions:**
```sql
-- Pure vector search
search_bs7671(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
)

-- Hybrid vector + keyword (RRF fusion)
search_bs7671_hybrid(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
)
```

**Index:** IVFFlat on `embedding` column

**Performance:** 2-5s (includes embedding generation ~500ms-1s)

**Used By:** AI Assistant (regulation queries), Circuit Designer (verification), Commissioning Agent

---

### 5. `health_safety_knowledge`

**Records:** 2,312  
**Purpose:** Health & Safety Executive (HSE) guidance and risk assessment content

| Column | Type | Description |
|--------|------|-------------|
| `topic` | text | H&S topic |
| `content` | text | Full guidance text |
| `source` | text | HSE document reference |
| `metadata` | jsonb | Includes `scale` (domestic/commercial/industrial) |
| `embedding` | vector(1536) | OpenAI text-embedding-ada-002 |

**Search Function:**
```sql
search_health_safety_hybrid(
  query_text text,
  query_embedding vector(1536),
  scale_filter text DEFAULT NULL,
  match_count int DEFAULT 10
)
```

**Index:** IVFFlat on `embedding` column

**Performance:** 3-5s (RRF fusion of vector + keyword)

**Used By:** Health & Safety Specialist (primary), AI RAMS Module

---

### 6. `pricing_embeddings`

**Records:** 43,371  
**Purpose:** Material pricing from UK electrical wholesalers (Screwfix, CEF, Toolstation)

| Column | Type | Description |
|--------|------|-------------|
| `item_name` | text | Product name |
| `category` | text | Product category |
| `wholesaler` | text | Supplier name |
| `base_cost` | numeric | Price in GBP |
| `in_stock` | boolean | Stock availability |
| `product_url` | text | Source URL |
| `embedding` | vector(1536) | Product embedding |
| `metadata` | jsonb | Brand, specifications, image URL |

**Search Functions:**
```sql
-- Semantic product search
search_pricing_embeddings(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 20
)

-- Fast keyword search (no embedding required)
-- Used via search-materials-fast edge function
```

**Index:** IVFFlat on `embedding` column

**Performance:** 
- Vector: 2-4s
- Keyword (fast): <500ms

**Used By:** Cost Engineer (primary), Circuit Designer (material recommendations)

---

## Supporting Tables

### 7. `inspection_testing_knowledge`

**Records:** 1,738  
**Purpose:** Inspection and testing procedures for compliance verification

| Column | Type | Description |
|--------|------|-------------|
| `test_type` | text | Type of test/inspection |
| `procedure` | text | Step-by-step procedure |
| `equipment_required` | text[] | Required test equipment |
| `acceptance_criteria` | text | Pass/fail criteria |
| `bs7671_reference` | text | Regulation reference |
| `frequency` | text | Recommended frequency |

**Used By:** Commissioning Agent, Maintenance Specialist

---

### 8. `project_mgmt_knowledge`

**Records:** 2,941  
**Purpose:** Labour hours, project templates, and estimating data

| Column | Type | Description |
|--------|------|-------------|
| `task_type` | text | Type of work task |
| `labour_hours` | numeric | Estimated hours |
| `skill_level` | text | Required competency |
| `materials` | jsonb | Material requirements |
| `considerations` | text[] | Planning considerations |
| `dependencies` | text[] | Task dependencies |

**Used By:** Project Manager Agent, Cost Engineer

---

## Search Method Comparison

| Method | Speed | Accuracy | Use Case |
|--------|-------|----------|----------|
| `_fast` (GIN keyword) | <1s | Good | High-volume lookups, autocomplete |
| `_hybrid` (keyword + tsvector) | 1-3s | Better | Balanced accuracy/speed |
| Vector (embedding) | 2-5s | Best | Semantic similarity, conceptual queries |
| RRF Fusion (vector + keyword) | 3-6s | Excellent | Maximum accuracy, H&S search |

---

## Agent → RAG Mapping

| Agent | Primary Tables | Search Functions |
|-------|---------------|------------------|
| **Circuit Designer** | `design_knowledge_intelligence`, `regulations_intelligence`, `practical_work_intelligence` | `search_design_knowledge_intelligence_hybrid`, `search_regulations_intelligence_hybrid`, `search_practical_work_fast` |
| **Installation Specialist** | `practical_work_intelligence`, `regulations_intelligence` | `search_practical_work_intelligence_hybrid`, `search_regulations_intelligence_hybrid` |
| **Cost Engineer** | `pricing_embeddings`, `regulations_intelligence`, `project_mgmt_knowledge` | `search_pricing_embeddings`, `search_regulations_intelligence_hybrid` |
| **Maintenance Specialist** | `practical_work_intelligence`, `regulations_intelligence` | `search_practical_work_fast`, `search_regulations_intelligence_hybrid` |
| **Health & Safety** | `health_safety_knowledge`, `practical_work_intelligence` | `search_health_safety_hybrid`, `search_practical_work_intelligence_hybrid` |
| **AI Assistant** | `bs7671_embeddings`, `regulations_intelligence` | `search_bs7671`, `search_regulations_intelligence_hybrid` |
| **Commissioning Agent** | `inspection_testing_knowledge`, `bs7671_embeddings` | `search_bs7671` |
| **Project Manager** | `project_mgmt_knowledge`, `regulations_intelligence` | `search_regulations_intelligence_hybrid` |

---

## Critical Notes for Developers

### 1. Confidence Score Filtering
Intelligence tables use `confidence_score >= 0.80` filter by default. This excludes low-quality enrichments.

```sql
WHERE confidence_score >= 0.80
```

### 2. Performance Guidelines
- Use `search_practical_work_fast` for bulk operations (21x faster than hybrid)
- Vector search requires embedding generation (adds 500ms-1s overhead)
- GIN indexes enable `&&` array overlap operator for keyword matching

### 3. Search Function Location
All search functions are **PostgreSQL RPC functions** (not edge functions). Call via:
```typescript
const { data } = await supabase.rpc('search_regulations_intelligence_hybrid', {
  query_text: 'socket outlet protection',
  match_count: 10
});
```

### 4. Embedding Model
All vector embeddings use **OpenAI text-embedding-ada-002** (1536 dimensions).

### 5. Index Types
- **GIN** - Generalised Inverted Index for array/keyword columns
- **IVFFlat** - Inverted File with Flat compression for vector columns
- **B-tree** - Standard index for scalar columns

---

## Record Count Summary

| Table | Records | Type |
|-------|---------|------|
| `practical_work_intelligence` | 199,726 | Intelligence |
| `regulations_intelligence` | 47,588 | Intelligence |
| `pricing_embeddings` | 43,371 | Embedding |
| `design_knowledge_intelligence` | 7,215 | Intelligence |
| `project_mgmt_knowledge` | 2,941 | Supporting |
| `bs7671_embeddings` | 2,557 | Embedding |
| `health_safety_knowledge` | 2,312 | Embedding |
| `inspection_testing_knowledge` | 1,738 | Supporting |
| **Total** | **308,165** | |

---

*Last updated: December 2024*
