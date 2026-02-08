export interface SchemeInfo {
  value: string;
  label: string;
  logoPath: string;
  brandColor: string;
}

export const SCHEMES: SchemeInfo[] = [
  { value: 'NICEIC', label: 'NICEIC', logoPath: '/logos/schemes/niceic.png', brandColor: '#E31837' },
  { value: 'NAPIT', label: 'NAPIT', logoPath: '/logos/schemes/napit.png', brandColor: '#005EB8' },
  { value: 'ELECSA', label: 'ELECSA', logoPath: '/logos/schemes/elecsa.png', brandColor: '#F36F21' },
  { value: 'STROMA', label: 'STROMA', logoPath: '/logos/schemes/stroma.png', brandColor: '#00A859' },
  { value: 'OFTEC', label: 'OFTEC', logoPath: '/logos/schemes/oftec.png', brandColor: '#003B71' },
  { value: 'BESCA', label: 'BESCA', logoPath: '/logos/schemes/besca.svg', brandColor: '#1B3D6F' },
  { value: 'BRE', label: 'BRE', logoPath: '/logos/schemes/bre.svg', brandColor: '#00529B' },
];

export const getSchemeInfo = (value: string): SchemeInfo | undefined =>
  SCHEMES.find((s) => s.value === value.toUpperCase());
