---
paths:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'
  - 'supabase/**'
---

# Database Rules

## Single Supabase backend: jtwygbeceundfgnkirof

## URL: https://jtwygbeceundfgnkirof.supabase.co

## 277 tables, 316 edge functions, 27 users

## When querying Supabase:

- Always use the MCP server to check table schemas before writing queries
- Use RLS policies — never bypass with service_role unless in edge functions
- Always handle `.error` from Supabase client calls

## Key tables:

- `profiles` — user profiles, linked to auth.users
- `reports` — all certificates/reports, `report_id` prefix determines type
- `pricing_embeddings` — RAG pricing data
- `practical_work_intelligence` — RAG labour timing
- `design_knowledge` — RAG circuit design patterns
