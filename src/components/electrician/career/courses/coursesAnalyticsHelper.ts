import type { EnhancedCareerCourse, CourseAnalytics } from "@/components/apprentice/career/courses/enhancedCoursesData";

export const generateCoursesAnalytics = (courses: EnhancedCareerCourse[]): CourseAnalytics => {
  if (courses.length === 0) {
    return {
      totalCourses: 0,
      totalProviders: 0,
      averageRating: 0,
      highDemandCourses: 0,
      emergingTechCourses: 0,
      averageSalaryImpact: "£0",
      topCategories: []
    };
  }

  // Calculate basic metrics
  const totalCourses = courses.length;
  const uniqueProviders = new Set(courses.map(course => course.provider));
  const totalProviders = uniqueProviders.size;
  
  // Calculate average rating
  const ratingsSum = courses.reduce((sum, course) => sum + course.rating, 0);
  const averageRating = ratingsSum / totalCourses;
  
  // Count high demand courses
  const highDemandCourses = courses.filter(course => course.industryDemand === "High").length;
  
  // Count emerging tech courses
  const emergingTechCourses = courses.filter(course => course.category === "Emerging Technologies").length;
  
  // Calculate average salary impact (rough estimation)
  const salaryImpacts = courses
    .map(course => {
      if (!course.salaryImpact) return 0;
      // Extract numbers from salary impact string
      const matches = course.salaryImpact.match(/£([\d,]+)/g);
      if (matches && matches.length > 0) {
        const amounts = matches.map(match => parseInt(match.replace(/[£,]/g, '')));
        return amounts.reduce((a, b) => a + b, 0) / amounts.length;
      }
      return 0;
    })
    .filter(impact => impact > 0);
  
  const averageSalaryImpact = salaryImpacts.length > 0
    ? `£${Math.round(salaryImpacts.reduce((a, b) => a + b, 0) / salaryImpacts.length).toLocaleString()}`
    : "£3,000";
  
  // Calculate top categories
  const categoryCount = courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategories = Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    totalCourses,
    totalProviders,
    averageRating,
    highDemandCourses,
    emergingTechCourses,
    averageSalaryImpact,
    topCategories
  };
};