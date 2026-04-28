#!/usr/bin/env bash
# Smoke runner for the LTI 1.3 stack.
#
# Hits the public, unauthenticated endpoints and asserts shape + status codes.
# Does NOT exercise a real launch — that needs a real LMS (see docs/LTI-TESTING.md).
#
# Usage:
#   ./scripts/test-lti.sh                                    # default project
#   BASE=https://jtwygbeceundfgnkirof.supabase.co ./scripts/test-lti.sh
#
# Exit code: 0 if every check passed, 1 otherwise.

set -u

BASE="${BASE:-https://jtwygbeceundfgnkirof.supabase.co}"
FN="$BASE/functions/v1"

PASS=0
FAIL=0
RESULTS=()

red()    { printf '\033[31m%s\033[0m' "$1"; }
green()  { printf '\033[32m%s\033[0m' "$1"; }
yellow() { printf '\033[33m%s\033[0m' "$1"; }
bold()   { printf '\033[1m%s\033[0m' "$1"; }

pass() {
  PASS=$((PASS + 1))
  RESULTS+=("PASS  $1")
  printf '  [%s] %s\n' "$(green PASS)" "$1"
}

fail() {
  FAIL=$((FAIL + 1))
  RESULTS+=("FAIL  $1 -- $2")
  printf '  [%s] %s\n        %s\n' "$(red FAIL)" "$1" "$2"
}

section() {
  printf '\n%s\n' "$(bold "$1")"
}

require_jq() {
  if ! command -v jq >/dev/null 2>&1; then
    printf '%s jq is required (brew install jq)\n' "$(red ERROR)"
    exit 2
  fi
}

require_jq

printf '%s %s\n' "$(bold "LTI smoke tests against")" "$BASE"

# ---------------------------------------------------------------------------
section "1. JWKS endpoint"
# ---------------------------------------------------------------------------
JWKS_BODY=$(curl -sS -o /tmp/lti_jwks.json -w '%{http_code}' "$FN/lti-jwks")
if [[ "$JWKS_BODY" != "200" ]]; then
  fail "GET /lti-jwks" "expected 200, got $JWKS_BODY"
else
  pass "GET /lti-jwks returns 200"

  KEYS_COUNT=$(jq -r '.keys | length // 0' /tmp/lti_jwks.json)
  if [[ "$KEYS_COUNT" -gt 0 ]]; then
    pass "JWKS has ${KEYS_COUNT} key(s)"
  else
    fail "JWKS keys array" "missing or empty"
  fi

  KTY=$(jq -r '.keys[0].kty // "?"' /tmp/lti_jwks.json)
  KID=$(jq -r '.keys[0].kid // "?"' /tmp/lti_jwks.json)
  ALG=$(jq -r '.keys[0].alg // "?"' /tmp/lti_jwks.json)
  USE=$(jq -r '.keys[0].use // "?"' /tmp/lti_jwks.json)
  HAS_N=$(jq -r '.keys[0].n // empty' /tmp/lti_jwks.json | wc -c | tr -d ' ')
  HAS_E=$(jq -r '.keys[0].e // empty' /tmp/lti_jwks.json | wc -c | tr -d ' ')

  [[ "$KTY" == "RSA" ]] && pass "First key kty=RSA" || fail "First key kty" "got $KTY, want RSA"
  [[ "$ALG" == "RS256" ]] && pass "First key alg=RS256" || fail "First key alg" "got $ALG, want RS256"
  [[ "$USE" == "sig" ]] && pass "First key use=sig" || fail "First key use" "got $USE, want sig"
  [[ "$KID" != "?" && -n "$KID" ]] && pass "First key kid=$KID" || fail "First key kid" "missing"
  [[ "$HAS_N" -gt 1 ]] && pass "First key has modulus (n)" || fail "First key n" "missing"
  [[ "$HAS_E" -gt 1 ]] && pass "First key has exponent (e)" || fail "First key e" "missing"
fi

# ---------------------------------------------------------------------------
section "2. Health probe"
# ---------------------------------------------------------------------------
HEALTH_CODE=$(curl -sS -o /tmp/lti_health.json -w '%{http_code}' "$FN/lti-health")
if [[ "$HEALTH_CODE" != "200" && "$HEALTH_CODE" != "503" ]]; then
  fail "GET /lti-health" "expected 200 or 503, got $HEALTH_CODE"
else
  STATUS=$(jq -r '.status // "?"' /tmp/lti_health.json)
  if [[ "$STATUS" == "ok" && "$HEALTH_CODE" == "200" ]]; then
    pass "Health status=ok (HTTP 200)"
  elif [[ "$STATUS" == "degraded" ]]; then
    fail "Health status=degraded" "$(jq -c '.checks' /tmp/lti_health.json)"
  else
    fail "Health response" "unexpected status=$STATUS code=$HEALTH_CODE"
  fi

  for check in keys_configured jwks_endpoint database; do
    OK=$(jq -r ".checks.$check.ok // false" /tmp/lti_health.json)
    DETAIL=$(jq -r ".checks.$check.detail // \"\"" /tmp/lti_health.json)
    if [[ "$OK" == "true" ]]; then
      pass "Health check $check (${DETAIL:-ok})"
    else
      fail "Health check $check" "$DETAIL"
    fi
  done

  HEALTH_KID=$(jq -r '.kid // "?"' /tmp/lti_health.json)
  JWKS_KID=$(jq -r '.keys[0].kid // "?"' /tmp/lti_jwks.json)
  if [[ "$HEALTH_KID" != "?" && "$HEALTH_KID" == "$JWKS_KID" ]]; then
    pass "Health kid matches JWKS kid ($HEALTH_KID)"
  else
    fail "Health kid mismatch" "health=$HEALTH_KID jwks=$JWKS_KID"
  fi
fi

# ---------------------------------------------------------------------------
section "3. OIDC init negative cases"
# ---------------------------------------------------------------------------
# Empty GET — no iss / login_hint / target_link_uri / lti_deployment_id
EMPTY_CODE=$(curl -sS -o /dev/null -w '%{http_code}' "$FN/lti-oidc-init")
if [[ "$EMPTY_CODE" =~ ^4 ]]; then
  pass "GET /lti-oidc-init with no params rejected (HTTP $EMPTY_CODE)"
else
  fail "GET /lti-oidc-init empty" "expected 4xx, got $EMPTY_CODE"
fi

# Unknown issuer
BOGUS_CODE=$(curl -sS -o /dev/null -w '%{http_code}' \
  "$FN/lti-oidc-init?iss=https://example.invalid&login_hint=x&target_link_uri=$FN/lti-launch&lti_deployment_id=z")
if [[ "$BOGUS_CODE" =~ ^4 ]]; then
  pass "GET /lti-oidc-init with unknown issuer rejected (HTTP $BOGUS_CODE)"
else
  fail "GET /lti-oidc-init unknown iss" "expected 4xx, got $BOGUS_CODE"
fi

# Method check — DELETE should be rejected
DEL_CODE=$(curl -sS -o /dev/null -w '%{http_code}' -X DELETE "$FN/lti-oidc-init")
if [[ "$DEL_CODE" == "405" || "$DEL_CODE" =~ ^4 ]]; then
  pass "DELETE /lti-oidc-init rejected (HTTP $DEL_CODE)"
else
  fail "DELETE /lti-oidc-init" "expected 4xx, got $DEL_CODE"
fi

# ---------------------------------------------------------------------------
section "4. Launch endpoint negative cases"
# ---------------------------------------------------------------------------
# No body
NOBODY=$(curl -sS -o /dev/null -w '%{http_code}' -X POST "$FN/lti-launch")
if [[ "$NOBODY" =~ ^4 ]]; then
  pass "POST /lti-launch with no body rejected (HTTP $NOBODY)"
else
  fail "POST /lti-launch empty" "expected 4xx, got $NOBODY"
fi

# Garbage id_token
GARB=$(curl -sS -o /dev/null -w '%{http_code}' -X POST "$FN/lti-launch" \
  -H 'content-type: application/x-www-form-urlencoded' \
  --data 'id_token=not-a-jwt&state=not-a-state')
if [[ "$GARB" =~ ^4 ]]; then
  pass "POST /lti-launch garbage id_token rejected (HTTP $GARB)"
else
  fail "POST /lti-launch garbage" "expected 4xx, got $GARB"
fi

# GET on launch — should be rejected (it is POST-only per spec)
GETL=$(curl -sS -o /dev/null -w '%{http_code}' "$FN/lti-launch")
if [[ "$GETL" =~ ^4 ]]; then
  pass "GET /lti-launch rejected (HTTP $GETL)"
else
  fail "GET /lti-launch" "expected 4xx, got $GETL"
fi

# ---------------------------------------------------------------------------
section "5. CORS preflight"
# ---------------------------------------------------------------------------
for path in lti-jwks lti-health lti-oidc-init; do
  PRE=$(curl -sS -o /dev/null -w '%{http_code}' -X OPTIONS "$FN/$path" \
    -H 'origin: https://example.com' \
    -H 'access-control-request-method: GET')
  if [[ "$PRE" == "204" || "$PRE" == "200" ]]; then
    pass "OPTIONS /$path returns $PRE"
  else
    fail "OPTIONS /$path" "expected 204/200, got $PRE"
  fi
done

# ---------------------------------------------------------------------------
section "Summary"
# ---------------------------------------------------------------------------
TOTAL=$((PASS + FAIL))
printf '%d total, %s passed, %s failed\n' "$TOTAL" "$(green "$PASS")" "$(red "$FAIL")"

if [[ "$FAIL" -gt 0 ]]; then
  printf '\n%s\n' "$(yellow "Next: see docs/LTI-TESTING.md for the IMS Reference Tool + LMS sandbox layers.")"
  exit 1
fi

printf '\n%s %s\n' "$(green "All smoke checks passed.")" "Next: run the IMS LTI Reference Tool conformance suite (Layer 2)."
exit 0
