/**
 * End-to-end check of the cover-branding chain, run for real rather than read.
 *
 * The chain has four hops and a typecheck proves none of them:
 *   company_profiles row
 *     -> brandingFromCompanyProfile()      (the one shared reader)
 *     -> coverPayloadKeys()                (palette -> em_* keys)
 *     -> spread into the hook's branding object
 *     -> coverKeysFromFormData()           (read back off form data)
 *
 * Hop 4 is where it was silently broken: the certificate pages merged branding
 * with an explicit field list, so every em_* key was dropped and the whole
 * chain was inert while compiling perfectly.
 */
import { brandingFromCompanyProfile, coverPalette } from '@/utils/certBranding';
import { coverPayloadKeys, coverKeysFromFormData } from '@/utils/certCoverPayload';
import { mastheadFor, measureLogoTone } from '@/utils/logoTone';

const EXPECTED = [
  'em_cover_from', 'em_cover_mid', 'em_cover_to', 'em_cover_fg',
  'em_cover_muted', 'em_cover_dim', 'em_accent', 'em_accent_deep',
  'em_mast_bg', 'em_mast_fg', 'em_scheme_logo_light', 'em_scheme_logo_dark',
] as const;

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};

// A realistic row: hosted logo present, dark brand colour, NICEIC on a URL.
const row = {
  company_name: 'Focus Solutions - Electrical',
  company_address: '39 Eden Court, Tamworth',
  company_postcode: 'B79 7XG',
  company_phone: '07875 651299',
  company_email: 'hello@focussolutions.co.uk',
  logo_url: 'https://example.test/logo.png',
  logo_data_url: 'data:image/png;base64,AAAA',
  primary_color: '#0a2c49',
  accent_color: '#e4681e',
  registration_scheme: 'NICEIC',
  registration_number: '31916',
  scheme_logo_data_url: 'https://elec-mate.com/logos/schemes/niceic.png',
  cert_cover_style: 'brand',
  cert_cover_color: '#1e40af',
  cert_logo_tone: 'dark',
};

console.log('\n1. brandingFromCompanyProfile — the single shared reader');
const branding = brandingFromCompanyProfile(row, '#fbbf24');
check('company logo prefers the HOSTED URL (ELE-1668)',
  branding.companyLogo === row.logo_url, branding.companyLogo);
check('cover style read from cert_cover_style', branding.coverStyle === 'brand');
check('accent is legible on the cover',
  branding.companyAccentColor !== '', branding.companyAccentColor);

console.log('\n2. coverPalette — cover colour comes from cert_cover_color, not the brand palette');
check('cover uses cert_cover_color (#1e40af), NOT primary_color (#0a2c49)',
  branding.cover.cover_from.toLowerCase() === '#1e40af', branding.cover.cover_from);
check('dark logo -> white masthead', branding.cover.mast_bg === '#ffffff', branding.cover.mast_bg);
check('cover masthead uses the STANDARD lockup',
  branding.cover.schemeLogoVariant === 'standard');
check('interior masthead uses the REVERSED lockup',
  branding.cover.interiorSchemeVariant === 'reversed');

console.log('\n3. coverPayloadKeys — palette becomes em_* payload keys');
const keys = coverPayloadKeys(branding);
for (const k of EXPECTED) {
  check(`${k} present`, typeof keys[k] === 'string' && keys[k] !== '');
}

// The cover masthead reads em_scheme_logo_light whatever ground it is on, so
// that key has to follow the masthead's variant. A light company logo turns the
// band dark; sending the standard dark-ink lockup there is ELE-1669 on the one
// page the client actually looks at.
console.log('\n3b. the cover masthead gets the lockup its own band needs');
const brandedLogos = { schemeLogoLight: 'STANDARD.png', schemeLogoDark: 'REVERSED.png' };
const onWhite = coverPayloadKeys({
  cover: coverPalette('house', '', '#fbbf24', 'dark'),
  ...brandedLogos,
});
check('white masthead -> STANDARD lockup',
  onWhite.em_scheme_logo_light === 'STANDARD.png', String(onWhite.em_scheme_logo_light));
const onDark = coverPayloadKeys({
  cover: coverPalette('house', '', '#fbbf24', 'light'),
  ...brandedLogos,
});
check('dark masthead -> REVERSED lockup (was the standard one, invisible)',
  onDark.em_scheme_logo_light === 'REVERSED.png', String(onDark.em_scheme_logo_light));
check('the reversed key still carries the reversed asset',
  onDark.em_scheme_logo_dark === 'REVERSED.png', String(onDark.em_scheme_logo_dark));

console.log('\n4. the hop that was silently broken — spread, then read back off form data');
const formData: Record<string, unknown> = { certificateNumber: 'X', ...branding, ...keys };
const readBack = coverKeysFromFormData(formData);
for (const k of EXPECTED) {
  check(`${k} survives the formData hop`, readBack[k] === keys[k]);
}

console.log('\n5. an explicit-field-list merge (the bug) still loses them');
const explicitMerge: Record<string, unknown> = {
  companyLogo: branding.companyLogo,
  companyName: branding.companyName,
};
check('explicit merge drops every em_* key (this is what was happening)',
  Object.keys(coverKeysFromFormData(explicitMerge)).length === 0);

console.log('\n6. house style is a NO-OP against the template defaults');
const house = coverPalette('house', '#1e40af', '#fbbf24', 'dark');
check('house cover_from is the template default #0a1628', house.cover_from === '#0a1628');
check('house accent is the template default #fbbf24', house.accent === '#fbbf24');

console.log('\n7. print + light-logo edge cases');
const print = coverPalette('print', '', '#fbbf24', 'dark');
check('print cover is white', print.cover_from === '#ffffff');
check('print accent darkened for contrast on white', print.accent !== '#fbbf24', print.accent);
const light = mastheadFor('light', '#0a1628');
check('light artwork -> dark masthead + reversed lockup',
  light.mast_bg === '#0a1628' && light.schemeLogoVariant === 'reversed');

console.log('\n8. no profile at all must not break a certificate');
const none = brandingFromCompanyProfile(null, '#fbbf24');
check('falls back to the house cover', none.cover.cover_from === '#0a1628');
check('coverPayloadKeys on a palette-less branding returns {}',
  Object.keys(coverPayloadKeys({})).length === 0);

console.log('\n9. measureLogoTone never throws without a DOM');
measureLogoTone('https://example.test/x.png').then((t) => {
  check('resolves to a safe default outside the browser', t === 'dark', t);
  console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}\n`);
  process.exit(failures === 0 ? 0 : 1);
});
