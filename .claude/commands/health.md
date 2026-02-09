Check the health of all services and the development environment.

Steps:

1. Check Node.js and npm versions (run `node -v && npm -v`)
2. Check for outdated packages (`npm outdated --depth=0 2>&1 | head -20`)
3. Run `npm doctor` to check environment health
4. Ping the Supabase project: `curl -s https://jtwygbeceundfgnkirof.supabase.co/functions/v1/system-health | jq .`
5. Check git status for uncommitted changes
6. Check if the dev server is running on port 8080
7. Report a summary of everything: what's healthy, what needs attention
