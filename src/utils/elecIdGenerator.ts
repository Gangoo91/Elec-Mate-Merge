// Elec-ID Number Generator
// Generates unique EM-XXXXXX format identifiers

// Characters excluding ambiguous ones (0, O, I, 1, l)
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/**
 * Generate a unique Elec-ID number in format EM-XXXXXX
 * Uses alphanumeric characters avoiding ambiguous ones
 */
export const generateElecIdNumber = (): string => {
  let result = 'EM-';
  for (let i = 0; i < 6; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
};

/**
 * Validate Elec-ID format
 */
export const isValidElecIdFormat = (id: string): boolean => {
  const pattern = /^EM-[A-HJ-NP-Z2-9]{6}$/;
  return pattern.test(id);
};

/**
 * Calculate profile completeness percentage
 */
export interface ProfileCompleteness {
  percentage: number;
  sections: {
    basics: boolean;
    qualifications: boolean;
    experience: boolean;
    skills: boolean;
    ecsCard: boolean;
  };
  missingItems: string[];
}

export const calculateProfileCompleteness = (profile: {
  jobTitle?: string;
  bio?: string;
  qualificationsCount: number;
  experienceCount: number;
  skillsCount: number;
  ecsCardType?: string;
  ecsCardExpiry?: string;
}): ProfileCompleteness => {
  const sections = {
    basics: !!(profile.jobTitle && profile.bio),
    qualifications: profile.qualificationsCount >= 1,
    experience: profile.experienceCount >= 1,
    skills: profile.skillsCount >= 3,
    ecsCard: !!(profile.ecsCardType && profile.ecsCardExpiry),
  };

  const missingItems: string[] = [];
  if (!sections.basics) missingItems.push('Complete your basic profile info');
  if (!sections.qualifications) missingItems.push('Add at least one qualification');
  if (!sections.experience) missingItems.push('Add your work experience');
  if (!sections.skills) missingItems.push('Add at least 3 skills');
  if (!sections.ecsCard) missingItems.push('Add your ECS card details');

  const completedCount = Object.values(sections).filter(Boolean).length;
  const percentage = Math.round((completedCount / 5) * 100);

  return { percentage, sections, missingItems };
};

/**
 * Check if a date is expiring within specified days
 */
export const isExpiringWithin = (expiryDate: string | Date, days: number): boolean => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 && diffDays <= days;
};

/**
 * Check if a date has expired
 */
export const isExpired = (expiryDate: string | Date): boolean => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  return expiry < now;
};

/**
 * Get days until expiry (negative if expired)
 */
export const getDaysUntilExpiry = (expiryDate: string | Date): number => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffTime = expiry.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Format expiry status for display
 */
export const getExpiryStatus = (expiryDate: string | Date): {
  status: 'valid' | 'expiring' | 'expired';
  label: string;
  color: string;
} => {
  const days = getDaysUntilExpiry(expiryDate);
  
  if (days < 0) {
    return { status: 'expired', label: 'Expired', color: 'red' };
  }
  if (days <= 30) {
    return { status: 'expiring', label: `Expires in ${days} days`, color: 'orange' };
  }
  if (days <= 90) {
    return { status: 'expiring', label: `Expires in ${days} days`, color: 'yellow' };
  }
  return { status: 'valid', label: 'Valid', color: 'green' };
};
