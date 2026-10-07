#!/usr/bin/env bash
# Connect a DEDICATED enquiries domain to the email worker (ELE-2022).
#
#   ./connect-domain.sh elecmate-mail.co.uk
#
# Prerequisites: the domain is bought and added to the same Cloudflare account
# (status "active"), and `npx wrangler login` has been run.
#
# SAFETY: refuses any domain that already receives email (has MX records that
# aren't Cloudflare's). Never run this against elec-mate.com: its email is
# Google Workspace and switching on Email Routing there would replace it.
set -euo pipefail
DOMAIN="${1:-}"
[ -n "$DOMAIN" ] || { echo "Usage: $0 <domain>"; exit 1; }
[ "$DOMAIN" != "elec-mate.com" ] || { echo "Refusing: elec-mate.com email is Google Workspace."; exit 1; }

CFG="$HOME/Library/Preferences/.wrangler/config/default.toml"
[ -f "$CFG" ] || CFG="$HOME/.config/.wrangler/config/default.toml"
TOKEN=$(grep -E '^oauth_token' "$CFG" | sed -E 's/.*"(.*)"/\1/')
[ -n "$TOKEN" ] || { echo "Not logged in: run npx wrangler login"; exit 1; }
API="https://api.cloudflare.com/client/v4"
H=(-H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json")

ZONE=$(curl -s "${H[@]}" "$API/zones?name=$DOMAIN" | python3 -c "import sys,json;r=json.load(sys.stdin).get('result') or [];print(r[0]['id'] if r else '')")
[ -n "$ZONE" ] || { echo "$DOMAIN is not on this Cloudflare account yet. Add it first."; exit 1; }

# Safety: existing non-Cloudflare MX = this domain already gets email somewhere
EXISTING_MX=$(dig +short MX "$DOMAIN" | grep -viE "mx\.cloudflare\.net" || true)
if [ -n "$EXISTING_MX" ]; then
  echo "Refusing: $DOMAIN already receives email:"; echo "$EXISTING_MX"; exit 1
fi

echo "→ Enabling Email Routing on $DOMAIN"
curl -s -X POST "${H[@]}" "$API/zones/$ZONE/email/routing/enable" | python3 -c "import sys,json;d=json.load(sys.stdin);print('  ok' if d.get('success') else d.get('errors'))"

echo "→ Catch-all → worker elec-mate-inbound-email"
curl -s -X PUT "${H[@]}" "$API/zones/$ZONE/email/routing/rules/catch_all" \
  -d '{"enabled":true,"name":"Enquiries","matchers":[{"type":"all"}],"actions":[{"type":"worker","value":["elec-mate-inbound-email"]}]}' \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print('  ok' if d.get('success') else d.get('errors'))"

echo "→ Telling the receiving function to accept $DOMAIN (in.elec-mate.com keeps working)"
(cd "$(dirname "$0")/../.." && npx supabase secrets set INBOUND_EMAIL_DOMAINS="$DOMAIN,in.elec-mate.com" --project-ref jtwygbeceundfgnkirof >/dev/null && echo "  ok")

cat <<EOF

✅ $DOMAIN now receives enquiry email.
Last step: in Vercel set VITE_INBOUND_EMAIL_DOMAIN=$DOMAIN and redeploy,
so the app shows addresses on the new domain.
Test: email anything to  <prefix>-<token>@$DOMAIN  (shown in Connect enquiries).
EOF
