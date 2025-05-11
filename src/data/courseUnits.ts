
// This file is a placeholder for future course units
// It contains minimal structure to avoid build errors

import { CourseUnit, CourseResource } from './courseTypes';

export const courseUnits: CourseUnit[] = [];

// Helper function for future course unit fetching
export const getCourseUnitById = (id: string): CourseUnit | undefined => {
  return courseUnits.find(unit => unit.id === id);
};

// Re-export types to maintain compatibility with existing imports
export type { CourseUnit, CourseResource };
