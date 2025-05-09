
import { hncCourseUnits } from "@/data/higher-education/hncCourseData";
import CourseHeader from "@/components/apprentice/higher-education/CourseHeader";
import CourseInfoCard from "@/components/apprentice/higher-education/CourseInfoCard";
import CourseUnit from "@/components/apprentice/higher-education/CourseUnit";
import CourseFooterCard from "@/components/apprentice/higher-education/CourseFooterCard";

const HNCCourse = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <CourseHeader 
        title="HNC Electrical Engineering"
        subtitle="Higher National Certificate in Electrical Engineering (Level 4)"
      />

      <CourseInfoCard 
        duration="1-2 years"
        credits="120 total"
        assessment="Assignments, projects, practical work"
        studyMode="Full-time or Part-time"
      />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Course Units</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hncCourseUnits.map((unit, index) => (
            <CourseUnit key={index} {...unit} />
          ))}
        </div>
      </div>

      <CourseFooterCard 
        title="Ready to take the next step?"
        description="Speak to your employer or education provider about enrolling in this qualification."
        buttonText="Find Providers"
      />
    </div>
  );
};

export default HNCCourse;
