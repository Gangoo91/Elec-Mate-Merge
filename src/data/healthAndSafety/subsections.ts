
export interface Subsection {
  id: string;
  title: string;
  description: string;
  content?: string;
}

// Legislation and Regulations subsections
export const legislationSubsections: Subsection[] = [
  {
    id: "hswa",
    title: "Health and Safety at Work Act",
    description: "Key provisions and implications for electrical workers",
    content: "The Health and Safety at Work Act 1974 is the primary legislation covering occupational health and safety in the United Kingdom. It establishes the legal framework to promote and encourage high standards of health and safety in the workplace."
  },
  {
    id: "eawr",
    title: "Electricity at Work Regulations",
    description: "Specific regulations governing electrical safety",
    content: "The Electricity at Work Regulations 1989 specifically address electrical safety in all workplaces. These regulations place duties on employers, employees and the self-employed to reduce the risk of death or injury from electricity."
  },
  {
    id: "coshh",
    title: "COSHH Regulations",
    description: "Control of Substances Hazardous to Health",
    content: "The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers to control substances that are hazardous to health and prevent or reduce workers' exposure to hazardous substances."
  },
  {
    id: "mhswr",
    title: "Management of Health and Safety Regulations",
    description: "Framework for managing workplace health and safety",
    content: "The Management of Health and Safety at Work Regulations 1999 place duties on employers to assess and manage risks to their employees and others arising from work activities."
  }
];

// Roles and Responsibilities subsections
export const rolesResponsibilitiesSubsections: Subsection[] = [
  {
    id: "employer",
    title: "Employer Responsibilities",
    description: "Legal duties of employers in ensuring workplace safety",
    content: "Employers have a duty to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees. This includes providing safe systems of work, safe equipment, proper training, and adequate supervision."
  },
  {
    id: "employee",
    title: "Employee Responsibilities",
    description: "Obligations of workers in maintaining safety",
    content: "Employees have a duty to take reasonable care for their own health and safety and that of others who may be affected by their actions. They must also cooperate with their employer on health and safety matters."
  },
  {
    id: "supervisor",
    title: "Supervisor Responsibilities",
    description: "Role of supervisors in maintaining safety standards",
    content: "Supervisors are responsible for implementing safe systems of work, ensuring employees follow safety procedures, providing adequate training and supervision, and reporting any health and safety concerns."
  },
  {
    id: "contractor",
    title: "Contractor Responsibilities",
    description: "Safety obligations for contractors on site",
    content: "Contractors have both legal responsibilities for their own safety and contractual obligations to comply with site safety rules. They must ensure their work does not put others at risk and coordinate their activities with the site manager."
  }
];
