export const PORTAL_LINKS = {
  niceic: {
    url: 'https://www.niceiconline.com/login',
    label: 'NICEIC Online Certification',
    shortLabel: 'NICEIC',
    description: 'National Inspection Council for Electrical Installation Contracting',
    loginRequired: true,
    branding: {
      primary: 'yellow-500',
      secondary: 'amber-500',
      textOnPrimary: 'black',
      gradient: 'from-yellow-500 to-amber-500',
    },
  },
  napit: {
    url: 'https://www.napitdirect.co.uk/login',
    label: 'NAPIT Direct Portal',
    shortLabel: 'NAPIT',
    description: 'National Association of Professional Inspectors and Testers',
    loginRequired: true,
    branding: {
      primary: 'blue-600',
      secondary: 'blue-700',
      textOnPrimary: 'white',
      gradient: 'from-blue-600 to-blue-700',
    },
  },
  buildingControl: {
    url: 'https://www.labc.co.uk/',
    label: 'LABC Portal',
    shortLabel: 'LABC',
    description: 'Local Authority Building Control',
    loginRequired: false,
    branding: {
      primary: 'green-500',
      secondary: 'emerald-500',
      textOnPrimary: 'white',
      gradient: 'from-green-500 to-emerald-500',
    },
  },
  govBuildingRegs: {
    url: 'https://www.gov.uk/building-regulations-approval',
    label: 'Gov.uk Building Regulations',
    shortLabel: 'Gov.uk',
    description: 'Official government guidance on building regulations',
    loginRequired: false,
    branding: {
      primary: 'gray-700',
      secondary: 'gray-800',
      textOnPrimary: 'white',
      gradient: 'from-gray-700 to-gray-800',
    },
  },
} as const;

export type PortalType = keyof typeof PORTAL_LINKS;

// Helper to get portal by type
export const getPortalLink = (type: PortalType) => PORTAL_LINKS[type];

// Open portal in new tab
export const openPortal = (type: PortalType) => {
  const portal = PORTAL_LINKS[type];
  if (portal?.url) {
    window.open(portal.url, '_blank', 'noopener,noreferrer');
  }
};
