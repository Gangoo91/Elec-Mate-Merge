import { LiveCourse } from "@/hooks/useLiveCourses";
import { EnhancedCareerCourse } from "../components/apprentice/career/courses/enhancedCoursesData";

// Unified course type that combines both LiveCourse and EnhancedCareerCourse
export type UnifiedCourse = {
  id: string;
  title: string;
  courseTitle?: string;
  provider: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  rating: number;
  locations: string[];
  
  // Price fields (either one)
  price?: string;
  priceRange?: string;
  
  // Learning format fields
  format?: string;
  learningMode?: string;
  
  // Date fields
  nextDates?: string;
  nextIntakeDate?: string;
  upcomingDates?: Array<{
    startDate: string;
    endDate?: string;
    location: string;
    availability: string;
    price?: string;
    bookingUrl?: string;
  }>;
  
  // Enhanced fields (optional for LiveCourse)
  industryDemand?: string;
  futureProofing?: string;
  
  // LiveCourse specific fields
  detailsUrl?: string;
  bookingInstructions?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    bookingUrl?: string;
  };
  hasAvailability?: boolean;
  lastUpdated?: string;
  
  // EnhancedCareerCourse specific fields
  certificationBody?: string;
  prerequisites?: string[];
  assessmentMethods?: string[];
  careerProgression?: string[];
  employmentRate?: number;
  averageSalary?: string;
  tags?: string[];
  features?: string[];
  difficulty?: string;
  certification?: string;
  studyMode?: string;
  fundingOptions?: string[];
  entryRequirements?: string[];
  keyOutcomes?: string[];
  assessmentMethod?: string[];
  accreditation?: string;
  applicationProcess?: string;
  supportServices?: string[];
};

// Helper function to convert LiveCourse to UnifiedCourse
export const liveCourseToUnified = (course: LiveCourse): UnifiedCourse => ({
  id: course.id,
  title: course.courseTitle,
  courseTitle: course.courseTitle,
  provider: course.provider,
  description: course.description,
  duration: course.duration,
  level: course.level,
  category: course.category,
  rating: course.rating,
  locations: course.locations,
  priceRange: course.priceRange,
  learningMode: course.learningMode,
  nextIntakeDate: course.nextIntakeDate,
  upcomingDates: course.upcomingDates,
  detailsUrl: course.detailsUrl,
  bookingInstructions: course.bookingInstructions,
  contactInfo: course.contactInfo,
  hasAvailability: course.hasAvailability,
  lastUpdated: course.lastUpdated,
});

// Helper function to convert EnhancedCareerCourse to UnifiedCourse
export const enhancedCourseToUnified = (course: EnhancedCareerCourse): UnifiedCourse => ({
  id: String(course.id),
  title: course.title,
  provider: course.provider,
  description: course.description,
  duration: course.duration,
  level: course.level,
  category: course.category,
  rating: course.rating,
  locations: course.locations,
  price: course.price,
  format: course.format,
  nextDates: course.nextDates.join(', '),
  industryDemand: course.industryDemand,
  futureProofing: String(course.futureProofing),
  prerequisites: course.prerequisites,
  assessmentMethod: Array.isArray(course.assessmentMethod) ? course.assessmentMethod : [course.assessmentMethod],
  accreditation: course.accreditation.join(', '),
});

// Helper function to get the display title
export const getCourseTitle = (course: UnifiedCourse): string => {
  return course.courseTitle || course.title;
};

// Helper function to get the price
export const getCoursePrice = (course: UnifiedCourse): string => {
  return course.priceRange || course.price || 'Contact for pricing';
};

// Helper function to get the format/learning mode
export const getCourseFormat = (course: UnifiedCourse): string => {
  return course.learningMode || course.format || 'Mixed';
};

// Helper function to get next date
export const getNextDate = (course: UnifiedCourse): string => {
  return course.nextIntakeDate || course.nextDates || '';
};