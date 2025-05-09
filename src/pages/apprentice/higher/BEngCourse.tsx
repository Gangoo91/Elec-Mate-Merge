
import { bengCourseUnits } from "@/data/higher-education/bengCourseData";
import CourseHeader from "@/components/apprentice/higher-education/CourseHeader";
import CourseInfoCard from "@/components/apprentice/higher-education/CourseInfoCard";
import CourseYearSection from "@/components/apprentice/higher-education/CourseYearSection";
import CourseFooterCard from "@/components/apprentice/higher-education/CourseFooterCard";

const BEngCourse = () => {
  // Group units by year
  const yearOneUnits = bengCourseUnits.filter(unit => unit.year === 1);
  const yearTwoUnits = bengCourseUnits.filter(unit => unit.year === 2);
  const yearThreeUnits = bengCourseUnits.filter(unit => unit.year === 3);

  return (
    <div className="space-y-8 animate-fade-in">
      <CourseHeader 
        title="BEng Electrical Engineering"
        subtitle="Bachelor of Engineering in Electrical Engineering (Level 6)"
      />

      <CourseInfoCard 
        duration="3-4 years"
        credits="360 total"
        assessment="Exams, assignments, laboratory work, final project"
        studyMode="Full-time, Part-time, or Sandwich"
      />

      <div className="space-y-10">
        <CourseYearSection year={1} level="4" units={yearOneUnits} />
        <CourseYearSection year={2} level="5" units={yearTwoUnits} />
        <CourseYearSection year={3} level="6" units={yearThreeUnits} />
      </div>

      <CourseFooterCard 
        title="Career Opportunities"
        description="BEng graduates can pursue careers in power generation, distribution, manufacturing, transport, renewables, and more."
        buttonText="Find Universities"
      />
    </div>
  );
};

export default BEngCourse;
