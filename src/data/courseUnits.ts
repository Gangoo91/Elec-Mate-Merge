
// This file is intentionally minimal as we've removed all EAL content
// It exists to prevent build errors from missing imports

export interface CourseResource {
  id: string;
  title: string;
  type: "learning" | "video" | "document";
  description?: string;
  href?: string;
  duration?: number;
}

export interface CourseUnit {
  id: string;
  title: string;
  code: string;
  description: string;
  resources: CourseResource[];
}

// Empty array to prevent errors
export const courseUnits: CourseUnit[] = [];
