/**
 * Generates a vCard 3.0 file for Mate so users can save the WhatsApp
 * number to their phone contacts in one tap. Once saved, WhatsApp will
 * label the chat "Mate" instead of "+44 7507 241303".
 */

import { MATE_PHONE_RAW } from '@/constants/mate';

const VCARD = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Mate;by Elec-Mate;;;',
  'FN:Mate by Elec-Mate',
  'ORG:Elec-Mate',
  'TITLE:Your AI business assistant',
  `TEL;TYPE=CELL,VOICE:+${MATE_PHONE_RAW}`,
  `IMPP:whatsapp:+${MATE_PHONE_RAW}`,
  'EMAIL;TYPE=WORK:founder@elec-mate.com',
  'URL:https://www.elec-mate.com',
  'NOTE:Send anything: voice notes\\, photos\\, questions. "morning brief" / "create a quote" / "who hasn\'t paid?"',
  'END:VCARD',
  '',
].join('\r\n');

/** Trigger a download of mate.vcf. Works in browser + Capacitor WebView. */
export function downloadMateVCard(): void {
  const blob = new Blob([VCARD], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Mate.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke after the download starts
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Raw vCard text — used by edge functions that attach it to emails. */
export const MATE_VCARD_TEXT = VCARD;
