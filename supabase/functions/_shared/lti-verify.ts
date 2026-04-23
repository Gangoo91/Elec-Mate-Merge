// Shared LTI 1.3 verification helpers.
//
// Used by: lti-launch, lti-deep-link (16.7), lti-grade-sync (16.6), lti-roster-sync (16.5).
//
// This module deliberately contains NO Supabase client code — pure crypto
// and claim-validation logic. Callers own their own DB interactions.

// Pinned jose version: DO NOT change without updating all LTI functions.
// We use a full URL import (not a deno.json alias) because Supabase's edge
// function bundler does not resolve the functions-level import map.
import {
  jwtVerify,
  createRemoteJWKSet,
  type JWTPayload,
  type JWSHeaderParameters,
  type KeyLike,
} from 'https://esm.sh/jose@5.9.6';

export const LTI_CLAIM = {
  messageType: 'https://purl.imsglobal.org/spec/lti/claim/message_type',
  version: 'https://purl.imsglobal.org/spec/lti/claim/version',
  deploymentId: 'https://purl.imsglobal.org/spec/lti/claim/deployment_id',
  resourceLink: 'https://purl.imsglobal.org/spec/lti/claim/resource_link',
  context: 'https://purl.imsglobal.org/spec/lti/claim/context',
  roles: 'https://purl.imsglobal.org/spec/lti/claim/roles',
  targetLinkUri: 'https://purl.imsglobal.org/spec/lti/claim/target_link_uri',
  ags: 'https://purl.imsglobal.org/spec/lti-ags/claim/endpoint',
  nrps: 'https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice',
} as const;

export interface LtiPlatform {
  id: string;
  issuer: string;
  client_id: string;
  deployment_id: string | null;
  jwks_url: string;
}

export interface LtiLaunchSession {
  id: string;
  platform_id: string;
  nonce: string;
  target_link_uri: string | null;
  expires_at: string;
}

export interface VerifiedLaunch {
  header: JWSHeaderParameters;
  payload: JWTPayload & Record<string, unknown>;
  sub: string;
  email: string | null;
  name: string | null;
  roles: string[];
  context: { id?: string; title?: string; label?: string } | null;
  resourceLinkId: string | null;
  messageType: string;
  deploymentId: string;
}

// JWKS remote-set cache (one per platform jwks_url). Cache TTL is handled by
// jose internally using Cache-Control headers from the platform.
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function getJwks(url: string) {
  let set = jwksCache.get(url);
  if (!set) {
    set = createRemoteJWKSet(new URL(url), {
      cooldownDuration: 30_000, // min 30s between forced refetches
      timeoutDuration: 10_000,
    });
    jwksCache.set(url, set);
  }
  return set;
}

export class LtiVerificationError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'LtiVerificationError';
  }
}

export async function verifyLtiJwt(
  idToken: string,
  platform: LtiPlatform,
  session: LtiLaunchSession
): Promise<VerifiedLaunch> {
  // 1. Session not expired
  if (new Date(session.expires_at).getTime() < Date.now()) {
    throw new LtiVerificationError('session_expired', 'Launch session expired');
  }

  // 2. JWT signature + standard claims (iss, aud, exp, iat, nbf) via jose
  const JWKS = getJwks(platform.jwks_url);
  let result;
  try {
    result = await jwtVerify(idToken, JWKS as unknown as KeyLike, {
      issuer: platform.issuer,
      audience: platform.client_id,
      clockTolerance: '30s',
    });
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string };
    throw new LtiVerificationError(err.code ?? 'jwt_invalid', err.message ?? 'JWT verification failed');
  }

  const payload = result.payload as JWTPayload & Record<string, unknown>;
  const header = result.protectedHeader;

  // 3. Nonce must match the one we stored in the session
  if (payload.nonce !== session.nonce) {
    throw new LtiVerificationError('nonce_mismatch', 'JWT nonce does not match session');
  }

  // 4. LTI 1.3 required claims
  const messageType = payload[LTI_CLAIM.messageType] as string | undefined;
  const version = payload[LTI_CLAIM.version] as string | undefined;
  const deploymentId = payload[LTI_CLAIM.deploymentId] as string | undefined;

  if (!messageType) {
    throw new LtiVerificationError('missing_message_type', 'message_type claim is required');
  }
  const allowedTypes = ['LtiResourceLinkRequest', 'LtiDeepLinkingRequest'];
  if (!allowedTypes.includes(messageType)) {
    throw new LtiVerificationError('unsupported_message_type', `Unsupported message_type: ${messageType}`);
  }

  if (version !== '1.3.0') {
    throw new LtiVerificationError('unsupported_lti_version', `Expected version 1.3.0, got ${version}`);
  }

  if (!deploymentId) {
    throw new LtiVerificationError('missing_deployment_id', 'deployment_id claim is required');
  }
  if (platform.deployment_id && platform.deployment_id !== deploymentId) {
    throw new LtiVerificationError(
      'deployment_id_mismatch',
      `Expected deployment_id=${platform.deployment_id}, got ${deploymentId}`
    );
  }

  // 5. Session's platform_id must match the one we're verifying against
  if (session.platform_id !== platform.id) {
    throw new LtiVerificationError('platform_mismatch', 'Session platform_id does not match');
  }

  // 6. sub is required (LTI user identity)
  const sub = payload.sub;
  if (!sub || typeof sub !== 'string') {
    throw new LtiVerificationError('missing_sub', 'sub claim is required');
  }

  const context = payload[LTI_CLAIM.context] as
    | { id?: string; title?: string; label?: string }
    | undefined;
  const resourceLink = payload[LTI_CLAIM.resourceLink] as { id?: string } | undefined;
  const rolesRaw = payload[LTI_CLAIM.roles];
  const roles = Array.isArray(rolesRaw) ? (rolesRaw as string[]) : [];

  return {
    header,
    payload,
    sub,
    email: (payload.email as string | undefined) ?? null,
    name: (payload.name as string | undefined) ?? null,
    roles,
    context: context ?? null,
    resourceLinkId: resourceLink?.id ?? null,
    messageType,
    deploymentId,
  };
}

// Map IMS LTI role URNs to our internal college_role.
//
// Reference: https://www.imsglobal.org/spec/lti/v1p3/#role-vocabularies
//
// Canonical IMS roles we handle:
//   System roles      → Administrator, SysAdmin
//   Institution roles → Administrator, Instructor, Student
//   Context roles     → Instructor, Learner, ContentDeveloper, TeachingAssistant,
//                       Mentor, Manager, Member, Officer, Administrator
//
// Precedence (highest first): admin → head_of_department → tutor → assessor
//                           → support_staff → student.
// A user with multiple roles is assigned the highest-precedence match.
export function mapLtiRolesToCollegeRole(
  roles: string[]
): 'college_admin' | 'head_of_department' | 'tutor' | 'assessor' | 'support_staff' | 'student' | null {
  const r = roles.map((x) => x.toLowerCase());
  const has = (...needles: string[]) => needles.some((n) => r.some((x) => x.includes(n.toLowerCase())));

  // Admin: system or institution administrator, sysadmin.
  if (has('#administrator', '#institution/administrator', '#sysadmin', '#administrator#systemadministrator')) {
    return 'college_admin';
  }

  // Head of department: Manager context role (often used for programme leads).
  if (has('#manager', '#officer')) {
    return 'head_of_department';
  }

  // Tutor: Instructor or ContentDeveloper.
  if (has('#instructor', '#contentdeveloper', '#faculty')) {
    return 'tutor';
  }

  // Assessor: Mentor (standing IMS convention — mentor reviews/signs off).
  if (has('#mentor')) {
    return 'assessor';
  }

  // Support staff: TeachingAssistant or generic Member.
  if (has('#teachingassistant', '#teacher', '#staff')) {
    return 'support_staff';
  }

  // Student: Learner / Student.
  if (has('#learner', '#student')) {
    return 'student';
  }

  return null;
}
