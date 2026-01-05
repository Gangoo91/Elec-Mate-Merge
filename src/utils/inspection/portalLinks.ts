export const PORTAL_LINKS = {
  niceic: {
    url: 'https://www.niceiconline.com/login',
    label: 'NICEIC Online Certification',
    loginRequired: true,
  },
  napit: {
    url: 'https://www.napitdirect.co.uk/login',
    label: 'NAPIT Direct Portal',
    loginRequired: true,
  },
  buildingControl: {
    url: 'https://www.labc.co.uk/',
    label: 'LABC Portal',
    loginRequired: false,
  },
} as const;

export type PortalType = keyof typeof PORTAL_LINKS;
