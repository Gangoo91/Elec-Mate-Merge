Quick database operations via the Supabase MCP server.

Usage: /db <action> [args]

Actions:

- `tables` — List all tables using Supabase MCP
- `query <sql>` — Run a read-only SQL query via Supabase MCP
- `schema <table>` — Show the schema for a specific table
- `users` — Count total users and show recent signups
- `reports` — Count reports by type and status
- `migrations` — List recent database migrations

Steps:

1. Parse `$ARGUMENTS` to determine the action
2. Use the Supabase MCP server tools to execute the query
3. Format and display results in a readable table
4. For write operations, ALWAYS ask for confirmation first
