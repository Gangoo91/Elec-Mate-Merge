/**
 * Generates a vCard 3.0 file for Mate so users can save the WhatsApp
 * number to their phone contacts in one tap. Once saved, WhatsApp will
 * label the chat "Mate" instead of "+44 7507 241303".
 */

import { MATE_PHONE_RAW } from '@/constants/mate';
import { saveOrShareFile } from '@/utils/save-or-share-file';

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

/**
 * Hand the user Mate's contact card.
 *
 * The comment here used to claim this worked in the Capacitor WebView. It did
 * not: WKWebView ignores `<a download>`, so on the phone — where saving a
 * contact is the entire point — the tap did nothing. `saveOrShareFile` opens
 * the share sheet, which offers Contacts directly, and downloads on web.
 */
export async function downloadMateVCard(): Promise<void> {
  const blob = new Blob([VCARD], { type: 'text/vcard;charset=utf-8' });
  await saveOrShareFile(blob, 'Mate.vcf');
}

/** Raw vCard text — used by edge functions that attach it to emails. */
export const MATE_VCARD_TEXT = VCARD;
