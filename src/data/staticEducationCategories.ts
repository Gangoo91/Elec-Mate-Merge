export interface StaticEducationCategory {
  name: string;
  count: number;
}

export const staticEducationCategories: StaticEducationCategory[] = [
  { name: "Bachelor's Degrees", count: 89 },
  { name: "HNC/HND Electrical", count: 67 },
  { name: "Professional Certifications", count: 45 },
  { name: "Master's Programs", count: 32 },
  { name: "Apprenticeships", count: 28 },
  { name: "Short Courses & CPD", count: 23 }
];