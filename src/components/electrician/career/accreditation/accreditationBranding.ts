interface AccreditationBrand {
  brandColor: string;
  logoUrl?: string;
}

// Brand mapping for professional bodies with their official colors and logos
const brandMap: Record<string, AccreditationBrand> = {
  "NICEIC": {
    brandColor: "#E31837",
    logoUrl: "https://logo.clearbit.com/niceic.com"
  },
  "NAPIT": {
    brandColor: "#005EB8", 
    logoUrl: "https://logo.clearbit.com/napit.org.uk"
  },
  "ELECSA": {
    brandColor: "#F36F21"
    // Using generic fallback as Clearbit doesn't have correct ELECSA logo
  },
  "ELECSA/Certsure": {
    brandColor: "#F36F21"
    // Using generic fallback as Clearbit doesn't have correct ELECSA logo
  },
  "STROMA": {
    brandColor: "#00A859",
    logoUrl: "https://logo.clearbit.com/stroma.com"
  },
  "IET": {
    brandColor: "#7F3F98",
    logoUrl: "https://logo.clearbit.com/theiet.org"
  },
  "CIBSE": {
    brandColor: "#0B5FA5",
    logoUrl: "https://logo.clearbit.com/cibse.org"
  },
  "ECA": {
    brandColor: "#1B4F9C",
    logoUrl: "https://logo.clearbit.com/eca.co.uk"
  },
  "SELECT": {
    brandColor: "#2B61AD",
    logoUrl: "https://logo.clearbit.com/select.org.uk"
  },
  "JIB": {
    brandColor: "#00549F",
    logoUrl: "https://logo.clearbit.com/jib.org.uk"
  },
  "IOSH": {
    brandColor: "#833177",
    logoUrl: "https://logo.clearbit.com/iosh.com"
  },
  "NEBOSH": {
    brandColor: "#1C5FA8",
    logoUrl: "https://logo.clearbit.com/nebosh.org.uk"
  },
  "APM": {
    brandColor: "#EA0029",
    logoUrl: "https://logo.clearbit.com/apm.org.uk"
  },
  "CIOB": {
    brandColor: "#003B5C",
    logoUrl: "https://logo.clearbit.com/ciob.org"
  }
};

export const getBrandInfo = (accreditationBody: string): AccreditationBrand => {
  return brandMap[accreditationBody] || {
    brandColor: "#F59E0B", // Default yellow
    logoUrl: undefined
  };
};

export const getLogoUrl = (accreditationBody: string, website?: string): string | null => {
  const brand = getBrandInfo(accreditationBody);
  
  // 1. Use explicit brand logoUrl if available
  if (brand.logoUrl) {
    return brand.logoUrl;
  }
  
  // 2. Try to derive from website domain using Clearbit
  if (website) {
    try {
      const domain = new URL(website).hostname.replace('www.', '');
      return `https://logo.clearbit.com/${domain}`;
    } catch {
      // Invalid URL, fallback
    }
  }
  
  // 3. No logo available
  return null;
};

export const getInitials = (text: string): string => {
  return text
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};