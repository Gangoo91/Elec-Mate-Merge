// 2025 UK Education Funding Constants and Updated Rates
export const FUNDING_RATES_2025 = {
  // Updated Student Finance rates for 2025/26
  undergraduate: {
    tuitionFeeLimit: 9250,
    maintenanceLoan: {
      london: {
        livingAtHome: 8610,
        awayFromHome: 10227,
        abroad: 11116
      },
      outsideLondon: {
        livingAtHome: 7347,
        awayFromHome: 9978,
        abroad: 11116
      }
    },
    repaymentThreshold: 27295,
    interestRate: 7.3 // September 2025 rate
  },

  // Updated Postgraduate Loan for 2025/26
  postgraduate: {
    maxLoan: 12858, // Updated from £12,167
    repaymentThreshold: 21000,
    interestRate: 7.3,
    repaymentRate: 0.06 // 6% above threshold
  },

  // Advanced Learner Loan (Level 3-6)
  advancedLearnerLoan: {
    repaymentThreshold: 27295, // Aligned with undergraduate
    repaymentRate: 0.09, // 9% above threshold
    interestRate: 7.3,
    maxLoanPerCourse: 25000
  },

  // Professional Qualification Funding
  professionalQualifications: {
    skillsBank: {
      maxFunding: 3000,
      eligibleLevels: ['level3', 'level4', 'level5'],
      ageRequirement: 19
    },
    apprenticeshipLevy: {
      rate: 0.005, // 0.5% of payroll over £3m
      vouchers: 15000, // Annual vouchers for large employers
      expiry: 24 // months
    },
    sectorSkillsFunding: {
      constructionSkills: 2500,
      energyUtilitySkills: 3000,
      engineeringConstruction: 2000
    }
  }
};

// Regional funding variations (2025 updates)
export const REGIONAL_FUNDING_2025 = {
  scotland: {
    undergraduate: {
      tuitionFees: 0, // Free for Scottish residents
      bursary: 2000
    },
    skillsDevelopmentScotland: 5000
  },
  wales: {
    tuitionFeeGrant: 1025,
    welshGovernmentLearningGrant: 1000
  },
  northernIreland: {
    tuitionFees: 4750, // Lower than England
    maintenance: 3475
  },
  england: {
    // Levelling Up Fund priorities
    northEast: { multiplier: 1.15 },
    northWest: { multiplier: 1.10 },
    yorkshire: { multiplier: 1.08 },
    eastMidlands: { multiplier: 1.05 },
    westMidlands: { multiplier: 1.08 },
    southWest: { multiplier: 1.02 },
    eastEngland: { multiplier: 1.00 },
    southEast: { multiplier: 0.95 },
    london: { multiplier: 0.90 }
  }
};

// Professional Body Specific Funding (2025)
export const PROFESSIONAL_BODY_FUNDING = {
  iet: {
    name: "Institution of Engineering and Technology",
    scholarships: 5000,
    cpd: 1500,
    eligibleQualifications: ['level4', 'level5', 'level6', 'level7']
  },
  ciob: {
    name: "Chartered Institute of Building",
    educationFund: 3000,
    eligibleQualifications: ['level4', 'level5', 'level6']
  },
  apm: {
    name: "Association for Project Management",
    qualificationSupport: 2000,
    eligibleQualifications: ['level3', 'level4', 'level6', 'level7']
  },
  iosh: {
    name: "Institution of Occupational Safety and Health",
    trainingGrants: 1800,
    eligibleQualifications: ['level3', 'level4', 'level5']
  }
};

// Enhanced Course Categories with specific funding
export const COURSE_FUNDING_CATEGORIES = {
  electrical: {
    level2: { funding: 0.95, apprenticeshipRate: 0.95 },
    level3: { funding: 0.90, apprenticeshipRate: 0.90, skillsBank: true },
    level4: { funding: 0.80, apprenticeshipRate: 0.85, skillsBank: true, advancedLoan: true },
    level5: { funding: 0.75, apprenticeshipRate: 0.80, skillsBank: true, advancedLoan: true },
    level6: { funding: 0.60, apprenticeshipRate: 0.75, studentFinance: true },
    level7: { funding: 0.40, apprenticeshipRate: 0.60, postgraduateLoan: true }
  },
  management: {
    level4: { funding: 0.70, apprenticeshipRate: 0.80, managementLevy: true },
    level5: { funding: 0.65, apprenticeshipRate: 0.75, managementLevy: true },
    level6: { funding: 0.50, apprenticeshipRate: 0.70, studentFinance: true },
    level7: { funding: 0.30, apprenticeshipRate: 0.50, postgraduateLoan: true, mba: true }
  },
  renewable: {
    level3: { funding: 0.95, apprenticeshipRate: 0.95, greenSkills: 500 },
    level4: { funding: 0.85, apprenticeshipRate: 0.90, greenSkills: 1000 },
    level5: { funding: 0.80, apprenticeshipRate: 0.85, greenSkills: 1500 },
    level6: { funding: 0.70, apprenticeshipRate: 0.80, greenSkills: 2000 }
  }
};

// Age-based eligibility rules
export const AGE_ELIGIBILITY = {
  advancedLearnerLoan: { minimum: 19, maximum: null },
  apprenticeship: { minimum: 16, maximum: null },
  undergraduate: { minimum: 18, maximum: null },
  postgraduate: { minimum: 21, maximum: null },
  skillsBank: { minimum: 19, maximum: null },
  careerDevelopmentLoan: { minimum: 18, maximum: null }
};

// Employer size multipliers for apprenticeship funding
export const EMPLOYER_FUNDING_RATES = {
  small: { // <50 employees
    apprenticeshipFunding: 0.95, // 95% government funding
    skillsSupport: 1000
  },
  medium: { // 50-249 employees
    apprenticeshipFunding: 0.90,
    skillsSupport: 2000
  },
  large: { // 250+ employees
    apprenticeshipFunding: 0.90,
    apprenticeshipLevy: true,
    skillsSupport: 3000
  }
};

// Monthly payment calculators
export function calculateMonthlyRepayment(
  salary: number, 
  threshold: number, 
  rate: number = 0.09
): number {
  return salary > threshold ? ((salary - threshold) * rate) / 12 : 0;
}

export function calculateFundingGap(
  totalCost: number,
  availableFunding: number
): number {
  return Math.max(0, totalCost - availableFunding);
}

export function getEligibleFunding(
  courseLevel: string,
  category: string,
  age: number,
  employmentStatus: string
): string[] {
  const eligible: string[] = [];
  
  if (age >= AGE_ELIGIBILITY.advancedLearnerLoan.minimum && 
      ['level3', 'level4', 'level5', 'level6'].includes(courseLevel)) {
    eligible.push('advancedLearnerLoan');
  }
  
  if (courseLevel === 'level6') {
    eligible.push('studentFinance');
  }
  
  if (courseLevel === 'level7') {
    eligible.push('postgraduateLoan');
  }
  
  if (employmentStatus === 'employed') {
    eligible.push('apprenticeshipLevy', 'employerSupport');
  }
  
  if (age >= 19 && ['level3', 'level4', 'level5'].includes(courseLevel)) {
    eligible.push('skillsBank');
  }
  
  return eligible;
}