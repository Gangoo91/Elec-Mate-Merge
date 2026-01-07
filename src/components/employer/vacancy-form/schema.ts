import * as z from "zod";

// Employment types
export const employmentTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Apprenticeship"] as const;
export type EmploymentType = typeof employmentTypes[number];

// Work arrangements
export const workArrangements = ["On-site", "Remote", "Hybrid"] as const;
export type WorkArrangement = typeof workArrangements[number];

// Salary periods
export const salaryPeriods = ["hour", "day", "week", "month", "year"] as const;
export type SalaryPeriod = typeof salaryPeriods[number];

// Experience levels
export const experienceLevels = ["Entry", "Mid", "Senior", "Lead"] as const;
export type ExperienceLevel = typeof experienceLevels[number];

// Pre-populated requirements for electrical industry
export const commonRequirements = [
  "18th Edition BS7671",
  "ECS Gold Card",
  "ECS JIB Card",
  "2391 Inspection & Testing",
  "City & Guilds Level 3",
  "NVQ Level 3",
  "AM2 Assessment",
  "CSCS Card",
  "Full UK Driving Licence",
  "Own Tools",
  "DBS Check",
  "First Aid Certificate",
  "IPAF Licence",
  "PASMA Certificate",
  "Confined Spaces",
  "Working at Heights",
] as const;

// Pre-populated benefits
export const commonBenefits = [
  "Company Van",
  "Fuel Card",
  "Tool Allowance",
  "Pension Scheme",
  "Private Healthcare",
  "Life Insurance",
  "Training & Development",
  "Annual Bonus",
  "Overtime Available",
  "Flexible Working",
  "23+ Days Holiday",
  "Sick Pay",
  "Company Phone",
  "Uniform Provided",
  "Career Progression",
  "Employee Discounts",
] as const;

// Step 1: Job Basics Schema
export const jobBasicsSchema = z.object({
  title: z
    .string()
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must be less than 100 characters"),
  type: z.enum(employmentTypes, {
    required_error: "Please select an employment type",
  }),
  location: z.string().min(1, "Location is required"),
  postcode: z.string().optional(),
  workArrangement: z.enum(workArrangements, {
    required_error: "Please select a work arrangement",
  }),
});

// Step 2: Compensation Schema (base schema without refinement for step validation)
export const compensationSchema = z.object({
  salaryMin: z.number().min(0, "Minimum salary cannot be negative").optional().nullable(),
  salaryMax: z.number().min(0, "Maximum salary cannot be negative").optional().nullable(),
  salaryPeriod: z.enum(salaryPeriods).default("year"),
  benefits: z.array(z.string()).default([]),
  schedule: z.string().optional(),
  startDate: z.string().optional(),
});

// Full compensation validation with cross-field check
export const compensationSchemaWithRefinement = compensationSchema.refine(
  (data) => {
    if (data.salaryMin && data.salaryMax) {
      return data.salaryMin <= data.salaryMax;
    }
    return true;
  },
  {
    message: "Minimum salary cannot be greater than maximum salary",
    path: ["salaryMax"],
  }
);

// Step 3: Requirements Schema
export const requirementsSchema = z.object({
  requirements: z
    .array(z.string())
    .min(1, "Please select at least one requirement"),
  experienceLevel: z.enum(experienceLevels, {
    required_error: "Please select an experience level",
  }),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(5000, "Description must be less than 5000 characters"),
  niceToHave: z.array(z.string()).default([]),
});

// Step 4: Review Schema
export const reviewSchema = z.object({
  closingDate: z.string().min(1, "Closing date is required"),
});

// Full vacancy schema
export const vacancySchema = z.object({
  ...jobBasicsSchema.shape,
  ...compensationSchema.shape,
  ...requirementsSchema.shape,
  ...reviewSchema.shape,
});

// Infer types from schemas
export type JobBasicsData = z.infer<typeof jobBasicsSchema>;
export type CompensationData = z.infer<typeof compensationSchema>;
export type RequirementsData = z.infer<typeof requirementsSchema>;
export type ReviewData = z.infer<typeof reviewSchema>;
export type VacancyFormData = z.infer<typeof vacancySchema>;

// Default form values
export const defaultVacancyValues: Partial<VacancyFormData> = {
  title: "",
  type: "Full-time",
  location: "",
  postcode: "",
  workArrangement: "On-site",
  salaryMin: undefined,
  salaryMax: undefined,
  salaryPeriod: "year",
  benefits: [],
  schedule: "",
  startDate: "",
  requirements: [],
  experienceLevel: "Mid",
  description: "",
  niceToHave: [],
  closingDate: "",
};

// Step configuration
export const vacancyFormSteps = [
  {
    id: "basics",
    title: "Job Basics",
    description: "Basic job information",
    schema: jobBasicsSchema,
  },
  {
    id: "compensation",
    title: "Compensation",
    description: "Salary and benefits",
    schema: compensationSchema,
  },
  {
    id: "requirements",
    title: "Requirements",
    description: "Qualifications and description",
    schema: requirementsSchema,
  },
  {
    id: "review",
    title: "Review",
    description: "Preview and publish",
    schema: reviewSchema,
  },
] as const;

// Helper functions
export function formatSalary(amount: number | undefined, period: SalaryPeriod): string {
  if (!amount) return "";
  const formatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);

  const periodLabels: Record<SalaryPeriod, string> = {
    hour: "/hr",
    day: "/day",
    week: "/week",
    month: "/month",
    year: "/year",
  };

  return `${formatted}${periodLabels[period]}`;
}

export function formatSalaryRange(
  min: number | undefined,
  max: number | undefined,
  period: SalaryPeriod
): string {
  if (!min && !max) return "Competitive";
  if (min && !max) return `From ${formatSalary(min, period)}`;
  if (!min && max) return `Up to ${formatSalary(max, period)}`;
  if (min === max) return formatSalary(min, period);
  return `${formatSalary(min, period)} - ${formatSalary(max, period)}`;
}
