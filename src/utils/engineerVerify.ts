import { createElement, useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QRCodeSVG } from 'qrcode.react';
import { getMyElecIdProfile } from '@/utils/elecIdLinkage';

/**
 * "Verify this engineer" for certificate PDFs (ELE-1453).
 *
 * Every certificate an electrician issues carries a small QR code and the
 * public verify address for their Elec-ID, so the paper itself becomes a live
 * verification vector: the client (or the next electrician, or the landlord's
 * agent) scans it and lands on `/verify/EM-XXXX`, and the engineer gets the
 * existing "someone checked your Elec-ID" notification.
 *
 * Nothing prints unless the signed-in user has an ACTIVATED Elec-ID and has
 * not opted out — the same rules the public page applies. The lookup never
 * throws: a certificate must never fail to generate because of a badge.
 *
 * The QR is an SVG data URL rendered from the same component the app uses on
 * screen, so there is no extra dependency and no canvas needed.
 */
export interface EngineerVerify {
  has_engineer_verify: boolean;
  engineer_verify_number: string;
  engineer_verify_url: string;
  engineer_verify_qr: string;
}

const NONE: EngineerVerify = {
  has_engineer_verify: false,
  engineer_verify_number: '',
  engineer_verify_url: '',
  engineer_verify_qr: '',
};

export const ENGINEER_VERIFY_BASE = 'https://elec-mate.com/verify/';

export function engineerVerifyQr(url: string): string {
  const svg = renderToStaticMarkup(
    createElement(QRCodeSVG, { value: url, size: 96, level: 'M', includeMargin: false })
  );
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export async function resolveEngineerVerify(): Promise<EngineerVerify> {
  try {
    const profile = await getMyElecIdProfile<{
      elec_id_number: string | null;
      activated: boolean | null;
      opt_out: boolean | null;
    }>('elec_id_number, activated, opt_out');
    const number = (profile?.elec_id_number || '').trim();
    if (!profile || !number || !profile.activated || profile.opt_out) return NONE;
    const url = `${ENGINEER_VERIFY_BASE}${encodeURIComponent(number)}`;
    return {
      has_engineer_verify: true,
      engineer_verify_number: number,
      engineer_verify_url: url,
      engineer_verify_qr: engineerVerifyQr(url),
    };
  } catch (err) {
    console.warn('[engineerVerify] skipped:', err);
    return NONE;
  }
}

/**
 * For pages whose payload builders are synchronous (the fire alarm suite):
 * resolve once on mount, spread the result into the payload at build time.
 * `has_engineer_verify: false` until resolved or when the user has no Elec-ID.
 */
export function useEngineerVerify(): EngineerVerify {
  const [verify, setVerify] = useState<EngineerVerify>(NONE);
  useEffect(() => {
    let live = true;
    resolveEngineerVerify().then((v) => {
      if (live && v.has_engineer_verify) setVerify(v);
    });
    return () => {
      live = false;
    };
  }, []);
  return verify;
}
