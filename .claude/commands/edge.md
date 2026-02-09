Work with Supabase edge functions.

Usage: /edge <action> [function-name]

Actions:

- `list` — List all edge functions in supabase/functions/
- `new <name>` — Create a new edge function from the standard template
- `test <name>` — Test an edge function locally with `npx supabase functions serve <name>`
- `deploy <name>` — Deploy: `npx supabase functions deploy <name> --project-ref jtwygbeceundfgnkirof`
- `deploy-all` — Deploy all functions
- `logs <name>` — View recent logs: `npx supabase functions logs <name> --project-ref jtwygbeceundfgnkirof`

Steps:

1. Parse `$ARGUMENTS` to determine the action and function name
2. Execute the appropriate command
3. For `new`: create the function directory and index.ts with standard CORS headers and error handling pattern matching existing functions like `system-health`
4. Report results
