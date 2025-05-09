
import { hndCourseUnits } from "@/data/higher-education/hndCourseData";
import CourseHeader from "@/components/apprentice/higher-education/CourseHeader";
import CourseInfoCard from "@/components/apprentice/higher-education/CourseInfoCard";
import CourseUnit from "@/components/apprentice/higher-education/CourseUnit";
import CourseFooterCard from "@/components/apprentice/higher-education/CourseFooterCard";

const HNDCourse = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <CourseHeader 
        title="HND Electrical Engineering"
        subtitle="Higher National Diploma in Electrical Engineering (Level 5)"
      />

      <CourseInfoCard 
        duration="2 years"
        credits="240 total (120 at Level 5)"
        assessment="Assignments, projects, practical assessments"
        studyMode="Full-time or Part-time"
      />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Course Units (Level 5)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hndCourseUnits.map((unit, index) => (
            <CourseUnit key={index} {...unit} />
          ))}
        </div>
      </div>

      <CourseFooterCard 
        title="Progression Options"
        description="After completing an HND, you can progress to the final year of a BEng degree or enter employment."
        buttonText="Find Providers"
      />
    </div>
  );
};

export default HNDCourse;
