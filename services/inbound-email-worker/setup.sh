#!/usr/bin/env bash
# One-off setup for the enquiry inbox email worker (ELE-2022).
# Run from this folder after `npx wrangler login`:
#   ./setup.sh
# Then finish the routing in the Cloudflare dashboard (printed at the end).
set -euo pipefail
cd "$(dirname "$0")"

SECRET=$(openssl rand -hex 32)

echo "→ Installing worker dependencies"
npm install --silent

echo "→ Setting INBOUND_EMAIL_SECRET on Supabase"
(cd ../.. && npx supabase secrets set INBOUND_EMAIL_SECRET="$SECRET" --project-ref jtwygbeceundfgnkirof)

echo "→ Deploying worker"
npx wrangler deploy

echo "→ Setting INBOUND_EMAIL_SECRET on the worker"
printf '%s' "$SECRET" | npx wrangler secret put INBOUND_EMAIL_SECRET

cat <<'EOF'

✅ Worker deployed. Last step, in the Cloudflare dashboard:
   elec-mate.com → Email → Email Routing
   1. Settings → Subdomains → add "in" (Cloudflare adds the MX + SPF records for in.elec-mate.com only;
      mail for @elec-mate.com itself is untouched)
   2. Routing rules → Catch-all address (for in.elec-mate.com) → Action: Send to a Worker
      → elec-mate-inbound-email → Save

Then test: email anything to the address shown in the app at /electrician/enquiries/setup.
EOF
