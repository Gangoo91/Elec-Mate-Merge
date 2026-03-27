/**
 * apple-wallet-pass.ts
 * Generates a signed Apple Wallet .pkpass for an Elec-ID profile.
 *
 * Required env vars (add to VPS .env after Apple Developer setup):
 *   APPLE_PASS_TYPE_ID     e.g. pass.com.elecmate.elecid
 *   APPLE_TEAM_ID          e.g. 27P4GFWXMM
 *   APPLE_PASS_CERT_PEM    PEM string of Pass Type certificate
 *   APPLE_PASS_KEY_PEM     PEM string of private key (no passphrase)
 *   APPLE_WWDR_CERT_PEM    PEM string of Apple WWDR G4 intermediate cert
 *
 * How to extract PEMs from your .p12:
 *   openssl pkcs12 -in cert.p12 -nokeys -clcerts | openssl x509  > cert.pem
 *   openssl pkcs12 -in cert.p12 -nocerts -nodes | openssl rsa     > key.pem
 *
 * WWDR G4 cert: https://www.apple.com/certificateauthority/AppleWWDRCAG4.cer
 *   Convert: openssl x509 -inform DER -in AppleWWDRCAG4.cer -out wwdr.pem
 */

import type { Request, Response } from 'express';
import { config } from '../config.js';
import { PKPass } from 'passkit-generator';
import sharp from 'sharp';

// ─── Types ─────────────────────────────────────────────────────────────────
interface WalletPassRequest {
  userId: string;
  name: string;
  tier: 'basic' | 'verified' | 'premium';
  ecsCardType: string | null;
  ecsCardNumber: string | null;
  ecsExpiry: string | null;   // ISO date string
  elecIdNumber: string;
  qualifications: string[];
  skills: string[];
  avatarBase64?: string;       // base64 JPEG/PNG of user photo (optional)
}

// ─── Asset cache (generated once at startup) ───────────────────────────────
let cachedAssets: {
  iconSm: Buffer; iconMd: Buffer; iconLg: Buffer;
  logoSm: Buffer; logoMd: Buffer; logoLg: Buffer;
  stripSm: Buffer; stripMd: Buffer;
} | null = null;

async function getStaticAssets() {
  if (cachedAssets) return cachedAssets;

  // Icon: "EM" lightning bolt monogram on dark background
  const iconSvg = (size: number) => Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="#0a0a0a"/>
      <text x="${size / 2}" y="${Math.round(size * 0.72)}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="${Math.round(size * 0.48)}"
            font-weight="900"
            text-anchor="middle"
            fill="#FFD700">EM</text>
    </svg>
  `);

  // Logo: "Elec-Mate" wordmark
  const logoSvg = (w: number, h: number) => Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <rect width="${w}" height="${h}" fill="#0a0a0a"/>
      <text x="${Math.round(w * 0.04)}" y="${Math.round(h * 0.74)}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="${Math.round(h * 0.56)}"
            font-weight="900"
            fill="#FFD700">Elec-Mate</text>
    </svg>
  `);

  // Strip: dark gradient banner with subtle branding
  const stripSvg = (w: number, h: number) => Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111827"/>
          <stop offset="100%" stop-color="#0a0a0a"/>
        </linearGradient>
        <linearGradient id="stripe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFD700" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#FFD700" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#bg)"/>
      <rect width="${w}" height="${Math.round(h * 0.4)}" fill="url(#stripe)"/>
      <text x="${Math.round(w * 0.04)}" y="${Math.round(h * 0.7)}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="${Math.round(h * 0.32)}"
            font-weight="700"
            fill="#FFD700" opacity="0.25">ELEC-ID</text>
    </svg>
  `);

  const [iconSm, iconMd, iconLg, logoSm, logoMd, logoLg, stripSm, stripMd] = await Promise.all([
    sharp(iconSvg(29)).png().toBuffer(),
    sharp(iconSvg(58)).png().toBuffer(),
    sharp(iconSvg(87)).png().toBuffer(),
    sharp(logoSvg(160, 50)).png().toBuffer(),
    sharp(logoSvg(320, 100)).png().toBuffer(),
    sharp(logoSvg(480, 150)).png().toBuffer(),
    sharp(stripSvg(375, 123)).png().toBuffer(),
    sharp(stripSvg(750, 246)).png().toBuffer(),
  ]);

  cachedAssets = { iconSm, iconMd, iconLg, logoSm, logoMd, logoLg, stripSm, stripMd };
  return cachedAssets;
}

// ─── Thumbnail (user photo) ─────────────────────────────────────────────────
async function buildThumbnail(avatarBase64: string): Promise<{
  sm: Buffer; md: Buffer; lg: Buffer;
} | null> {
  try {
    const imgBuffer = Buffer.from(avatarBase64, 'base64');
    const [sm, md, lg] = await Promise.all([
      sharp(imgBuffer).resize(90, 90, { fit: 'cover' }).png().toBuffer(),
      sharp(imgBuffer).resize(180, 180, { fit: 'cover' }).png().toBuffer(),
      sharp(imgBuffer).resize(270, 270, { fit: 'cover' }).png().toBuffer(),
    ]);
    return { sm, md, lg };
  } catch {
    return null;
  }
}

// ─── Format helpers ─────────────────────────────────────────────────────────
function formatTier(tier: WalletPassRequest['tier']): string {
  const labels = { premium: '★ Premium Electrician', verified: '✓ Verified Electrician', basic: 'Electrician' };
  return labels[tier];
}

function formatExpiry(isoDate: string | null): string {
  if (!isoDate) return 'N/A';
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

function formatQualifications(qualifications: string[]): string {
  if (!qualifications.length) return 'None listed';
  return qualifications.slice(0, 8).map((q) => `• ${q}`).join('\n');
}

// ─── Main handler ───────────────────────────────────────────────────────────
export async function handleAppleWalletPass(req: Request, res: Response): Promise<void> {
  const apiKey = req.headers['x-api-key'] as string | undefined;
  if (!apiKey || apiKey !== config.vpsApiKey) {
    res.status(401).json({ error: 'Invalid API key' });
    return;
  }

  // Check Apple credentials are configured
  const passTypeId = process.env.APPLE_PASS_TYPE_ID;
  const teamId = process.env.APPLE_TEAM_ID;
  const certPem = process.env.APPLE_PASS_CERT_PEM;
  const keyPem = process.env.APPLE_PASS_KEY_PEM;
  const wwdrPem = process.env.APPLE_WWDR_CERT_PEM;

  if (!passTypeId || !teamId || !certPem || !keyPem || !wwdrPem) {
    res.status(503).json({
      error: 'Apple Wallet not configured',
      message: 'Add APPLE_PASS_TYPE_ID, APPLE_TEAM_ID, APPLE_PASS_CERT_PEM, APPLE_PASS_KEY_PEM, APPLE_WWDR_CERT_PEM to VPS .env',
    });
    return;
  }

  const body = req.body as Partial<WalletPassRequest>;
  const {
    userId, name, tier = 'basic', ecsCardType, ecsCardNumber,
    ecsExpiry, elecIdNumber, qualifications = [], skills = [], avatarBase64,
  } = body;

  if (!userId || !name || !elecIdNumber) {
    res.status(400).json({ error: 'Missing required fields: userId, name, elecIdNumber' });
    return;
  }

  try {
    const assets = await getStaticAssets();
    const thumbnail = avatarBase64 ? await buildThumbnail(avatarBase64) : null;

    const verifyUrl = `https://elec-mate.com/verify/${elecIdNumber}`;

    // Build pass.json
    const passJson = {
      formatVersion: 1,
      passTypeIdentifier: passTypeId,
      serialNumber: `ELECID-${userId}`,
      teamIdentifier: teamId,
      organizationName: 'Elec-Mate',
      description: `Elec-ID — ${name}`,
      backgroundColor: 'rgb(10, 10, 10)',
      foregroundColor: 'rgb(255, 255, 255)',
      labelColor: 'rgb(255, 215, 0)',
      logoText: 'Elec-Mate',
      webServiceURL: 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/apple-wallet-update',
      authenticationToken: `elecid-${elecIdNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      generic: {
        primaryFields: [{ key: 'name', label: 'ELECTRICIAN', value: name }],
        secondaryFields: [
          { key: 'tier', label: 'VERIFICATION', value: formatTier(tier) },
          { key: 'ecs', label: 'ECS CARD', value: ecsCardType || 'Not set' },
        ],
        auxiliaryFields: [
          { key: 'elecid', label: 'ELEC-ID', value: elecIdNumber },
          { key: 'expiry', label: 'ECS EXPIRES', value: formatExpiry(ecsExpiry) },
        ],
        backFields: [
          { key: 'qualifications', label: 'QUALIFICATIONS', value: formatQualifications(qualifications) },
          { key: 'skills', label: 'SKILLS', value: skills.length ? skills.join(' • ') : 'None listed' },
          { key: 'ecsnum', label: 'ECS CARD NUMBER', value: ecsCardNumber || 'Not set' },
          { key: 'verify', label: 'VERIFY ONLINE', value: verifyUrl },
          { key: 'issuer', label: 'ISSUED BY', value: 'Elec-Mate — The UK Electrician\'s App' },
        ],
      },
      barcodes: [{ message: verifyUrl, format: 'PKBarcodeFormatQR', messageEncoding: 'iso-8859-1' }],
      barcode: { message: verifyUrl, format: 'PKBarcodeFormatQR', messageEncoding: 'iso-8859-1' },
    };

    // Build model files
    const modelFiles: Record<string, Buffer> = {
      'pass.json': Buffer.from(JSON.stringify(passJson)),
      'icon.png': assets.iconSm,
      'icon@2x.png': assets.iconMd,
      'icon@3x.png': assets.iconLg,
      'logo.png': assets.logoSm,
      'logo@2x.png': assets.logoMd,
      'logo@3x.png': assets.logoLg,
      'strip.png': assets.stripSm,
      'strip@2x.png': assets.stripMd,
    };

    if (thumbnail) {
      modelFiles['thumbnail.png'] = thumbnail.sm;
      modelFiles['thumbnail@2x.png'] = thumbnail.md;
      modelFiles['thumbnail@3x.png'] = thumbnail.lg;
    }

    const pass = await PKPass.from(
      {
        model: modelFiles,
        certificates: {
          wwdr: wwdrPem,
          signerCert: certPem,
          signerKey: keyPem,
        },
      },
      { serialNumber: `ELECID-${userId}` },
    );

    const buffer = await pass.getAsBuffer();

    res.setHeader('Content-Type', 'application/vnd.apple.pkpass');
    res.setHeader('Content-Disposition', `attachment; filename="elecid-${elecIdNumber}.pkpass"`);
    res.setHeader('Content-Length', buffer.length.toString());
    res.send(buffer);

    console.log(`[apple-wallet] Generated pass for ${elecIdNumber} (${name})`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[apple-wallet] Error:', msg);
    res.status(500).json({ error: 'Failed to generate wallet pass', details: msg });
  }
}
