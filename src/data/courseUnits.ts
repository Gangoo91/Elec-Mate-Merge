
import { CourseUnit } from './courseTypes';

// Empty array for course units
export const courseUnits: CourseUnit[] = [];

// Helper function for future course unit fetching
export const getCourseUnitById = (id: string): CourseUnit | undefined => {
  return courseUnits.find(unit => unit.id === id);
};
