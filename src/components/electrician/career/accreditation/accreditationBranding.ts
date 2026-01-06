interface AccreditationBrand {
  brandColor: string;
  logoUrl?: string;
}

// Brand mapping for professional bodies with their official colors and logos
// Using Google favicon service as a reliable fallback for logos
const brandMap: Record<string, AccreditationBrand> = {
  "NICEIC": {
    brandColor: "#E31837",
    logoUrl: "https://www.google.com/s2/favicons?domain=niceic.com&sz=128"
  },
  "NAPIT": {
    brandColor: "#005EB8",
    logoUrl: "https://www.google.com/s2/favicons?domain=napit.org.uk&sz=128"
  },
  "ELECSA": {
    brandColor: "#F36F21",
    logoUrl: "https://www.google.com/s2/favicons?domain=elecsa.co.uk&sz=128"
  },
  "ELECSA/Certsure": {
    brandColor: "#F36F21",
    logoUrl: "https://www.google.com/s2/favicons?domain=elecsa.co.uk&sz=128"
  },
  "STROMA": {
    brandColor: "#00A859",
    logoUrl: "https://www.google.com/s2/favicons?domain=stroma.com&sz=128"
  },
  "IET": {
    brandColor: "#7F3F98",
    logoUrl: "https://www.google.com/s2/favicons?domain=theiet.org&sz=128"
  },
  "CIBSE": {
    brandColor: "#0B5FA5",
    logoUrl: "https://www.google.com/s2/favicons?domain=cibse.org&sz=128"
  },
  "ECA": {
    brandColor: "#1B4F9C",
    logoUrl: "https://www.google.com/s2/favicons?domain=eca.co.uk&sz=128"
  },
  "SELECT": {
    brandColor: "#2B61AD",
    logoUrl: "https://www.google.com/s2/favicons?domain=select.org.uk&sz=128"
  },
  "JIB": {
    brandColor: "#00549F",
    logoUrl: "https://www.google.com/s2/favicons?domain=jib.org.uk&sz=128"
  },
  "IOSH": {
    brandColor: "#833177",
    logoUrl: "https://www.google.com/s2/favicons?domain=iosh.com&sz=128"
  },
  "NEBOSH": {
    brandColor: "#1C5FA8",
    logoUrl: "https://www.google.com/s2/favicons?domain=nebosh.org.uk&sz=128"
  },
  "APM": {
    brandColor: "#EA0029",
    logoUrl: "https://www.google.com/s2/favicons?domain=apm.org.uk&sz=128"
  },
  "CIOB": {
    brandColor: "#003B5C",
    logoUrl: "https://www.google.com/s2/favicons?domain=ciob.org&sz=128"
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

  // 2. Try to derive from website domain using Google favicon service
  if (website) {
    try {
      const domain = new URL(website).hostname.replace('www.', '');
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
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