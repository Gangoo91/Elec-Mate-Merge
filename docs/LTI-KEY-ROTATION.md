# LTI 1.3 Key Rotation Runbook

## Overview

Elec-Mate's LTI 1.3 implementation signs JWTs (Deep Linking responses, AGS/NRPS service assertions) with an RSA 2048 key. The matching public key is served via the `/lti-jwks` endpoint so LMS platforms can verify our signatures.

Keys **should be rotated annually** or immediately on suspected compromise.

## Current key

- **Key ID (kid):** `elec-mate-20260423-001`
- **Algorithm:** RS256
- **Created:** 2026-04-23
- **Private key location:** `~/elec-mate-lti-keys/lti-private-key.pem` (Andrew's machine, chmod 600)
- **Public key location:** `~/elec-mate-lti-keys/lti-public-key.pem`
- **JWKS source:** `~/elec-mate-lti-keys/lti-jwks.json`

## Supabase secrets

Three secrets on project `jtwygbeceundfgnkirof`:

| Secret | Format | Used by |
|---|---|---|
| `LTI_KEY_ID` | Plain string (the `kid`) | Signing functions (attach to JWT header) |
| `LTI_PRIVATE_KEY_PEM` | **Base64-encoded PEM** | Signing functions (must `atob()` before use) |
| `LTI_JWKS_JSON` | JSON string (minified JWK set) | `lti-jwks` endpoint (returns verbatim) |

Private key is base64-encoded because `.env` files don't handle multi-line PEM content reliably.

## Rotation procedure (annual)

### 1. Generate a new key offline

```bash
mkdir -p ~/elec-mate-lti-keys && chmod 700 ~/elec-mate-lti-keys
cd ~/elec-mate-lti-keys
NEW_KID="elec-mate-$(date +%Y%m%d)-001"
openssl genrsa -out "${NEW_KID}.pem" 2048
openssl rsa -in "${NEW_KID}.pem" -pubout -out "${NEW_KID}.pub.pem"
chmod 600 "${NEW_KID}.pem"
```

### 2. Derive the new public JWK

```bash
node -e "
const { createPublicKey } = require('crypto');
const fs = require('fs');
const kid = '${NEW_KID}';
const pub = fs.readFileSync(kid + '.pub.pem', 'utf8');
const jwk = createPublicKey(pub).export({ format: 'jwk' });
console.log(JSON.stringify({ kty: jwk.kty, kid, use: 'sig', alg: 'RS256', n: jwk.n, e: jwk.e }));
"
```

### 3. Publish both keys simultaneously (overlap period)

Merge the new JWK into `LTI_JWKS_JSON` **alongside the old one**:

```json
{ "keys": [ <old_jwk>, <new_jwk> ] }
```

Update the Supabase secret:

```bash
cd /Users/andrewmoore/elec-mate-merge
# Create temp env file with the combined JWKS
printf "LTI_JWKS_JSON=%s\n" "$(cat new-jwks.json | tr -d '\n ')" > /tmp/.env.rotate
chmod 600 /tmp/.env.rotate
npx supabase secrets set --env-file /tmp/.env.rotate --project-ref jtwygbeceundfgnkirof
rm -f /tmp/.env.rotate
```

Verify: `curl https://jtwygbeceundfgnkirof.supabase.co/functions/v1/lti-jwks` should show **both** keys.

### 4. Switch signing to the new key

```bash
NEW_PRIV_B64=$(cat ~/elec-mate-lti-keys/${NEW_KID}.pem | base64)
printf "LTI_KEY_ID=%s\nLTI_PRIVATE_KEY_PEM=%s\n" "${NEW_KID}" "${NEW_PRIV_B64}" > /tmp/.env.rotate
chmod 600 /tmp/.env.rotate
npx supabase secrets set --env-file /tmp/.env.rotate --project-ref jtwygbeceundfgnkirof
rm -f /tmp/.env.rotate
```

Deploy any signing edge functions so they pick up the new env:

```bash
npx supabase functions deploy lti-launch lti-deep-link lti-grade-sync lti-roster-sync --project-ref jtwygbeceundfgnkirof
```

### 5. Wait 24–48 hours

Both keys are in the JWKS; LMS platforms will have cached the old key for up to `max-age=3600` (1h) per our cache header, but some cache longer. Giving it a day of overlap is safe.

### 6. Retire the old key

Remove the old key from `LTI_JWKS_JSON`:

```json
{ "keys": [ <new_jwk_only> ] }
```

Re-set `LTI_JWKS_JSON` with the pruned set.

Move the old private key to cold storage (encrypted USB / 1Password) or destroy it:

```bash
shred -u ~/elec-mate-lti-keys/<old-kid>.pem
```

## Emergency rotation (compromise)

Skip the overlap period:

1. Generate a new key and set all three secrets atomically.
2. `LTI_JWKS_JSON` contains only the new key.
3. Deploy all signing functions immediately.
4. **Expect all LMS-initiated service calls signed by the old key to fail validation on the LMS side for up to the LMS's JWKS cache TTL.** Inform affected colleges.
5. Invalidate all active `lti_launch_sessions` rows (sessions issued under the old trust anchor should be treated as untrusted).

## Verification after any rotation

```bash
curl -s https://jtwygbeceundfgnkirof.supabase.co/functions/v1/lti-jwks | node -e "
const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
for (const k of data.keys) {
  console.log('kid=' + k.kid + ' alg=' + k.alg + ' use=' + k.use);
}
"
```

## Where the key material lives

- **Primary copy:** Andrew's machine at `~/elec-mate-lti-keys/` (chmod 600 on private keys)
- **Production:** Supabase secrets (project `jtwygbeceundfgnkirof`)
- **Backup:** *(TODO — add encrypted backup to 1Password family vault once a second team member joins)*
- **Git:** Never. `.gitignore` excludes `*.pem`, `*.key`, `lti-private-key*`.

## Related

- Ticket: [ELE-804 Phase 16.1 — RSA key management + `lti-jwks` endpoint](https://linear.app/elec-mate/issue/ELE-804)
- Endpoint: `supabase/functions/lti-jwks/index.ts`
- Signing code (will live in): `supabase/functions/_shared/lti-signing.ts` (to be created in 16.3)
