Deploy a Supabase edge function.

Usage: /deploy <function-name>

Steps:

1. If no function name provided, ask which function to deploy
2. Check the function exists in `supabase/functions/$ARGUMENTS/`
3. Run: `npx supabase functions deploy $ARGUMENTS --project-ref jtwygbeceundfgnkirof`
4. Verify the deployment succeeded
5. If it fails, show the error and suggest fixes
