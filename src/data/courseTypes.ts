
export interface CourseResource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'learning';
  duration?: string;
  href?: string;
}

export interface CourseUnit {
  id: string;
  title: string;
  code: string;
  description: string;
  resources: CourseResource[];
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  description: string;
  content: {
    introduction?: string;
    subsections: {
      id: string;
      title: string;
      content: string;
      keyPoints: string[];
      description?: string;
    }[];
    icon?: "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section" | "cable" | "socket" | "bulb" | "test" | "tools" | "shield-alert";
  };
}

export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  description?: string;
}
