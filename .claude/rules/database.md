---
paths:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'
  - 'supabase/**'
---

# Database Rules

## Single Supabase backend: jtwygbeceundfgnkirof

## URL: https://jtwygbeceundfgnkirof.supabase.co

## 677 tables (+37 views), 499 deployed edge functions, 1,777 users

_Verified 2026-09-02 — re-query before quoting; these drift fast._

⚠️ 558 function directories exist on disk against 499 deployed. A directory in
`supabase/functions/` is not evidence the function is live.

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

## Which hub owns a table — read the label first

Every Employer Hub table, and every shared table it touches, has a tagged
`COMMENT ON TABLE`. Look it up before building:

```sql
select * from public.schema_map;   -- tag, what, scope, used by, rule
```

- **One table per business record.** Customers, quotes/invoices, certificates
  live once (`customers`, `quotes`, `reports`) for sole traders AND firms.
  Never create an `employer_` copy. Upgrading to employer needs no migration.
- `employer_` prefix only for firm-only things (roster, timesheets, packs…).
- `[LEGACY — DO NOT USE]` tables are frozen: no new reads or writes.
- **Every new table gets its label in the same migration that creates it:**
  `comment on table public.x is '[TAG] <what>. Scope: <whose>. Used by: <areas>. Rule: <rule>';`
- Full map: Linear doc "Data map: which tables belong to which hub" (P-ELE-12).
