
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const careerCourses = [
  {
    id: 1,
    title: "18th Edition Wiring Regulations",
    provider: "NICEIC",
    description: "Essential course covering the latest BS7671 electrical regulations for all UK installations.",
    duration: "3 days"
  },
  {
    id: 2,
    title: "Inspection & Testing",
    provider: "City & Guilds",
    description: "Learn how to properly test and verify electrical installations to industry standards.",
    duration: "5 days"
  },
  {
    id: 3,
    title: "Electric Vehicle Charging",
    provider: "ECA",
    description: "Specialised training for installing and maintaining EV charging points.",
    duration: "2 days"
  }
];

const CareerCourses = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Career Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careerCourses.map((course) => (
          <Card key={course.id} className="border-elec-yellow/20 bg-elec-gray h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <p className="text-sm text-amber-400">Provider: {course.provider}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{course.description}</p>
              <div className="text-sm bg-elec-dark/30 p-2 rounded-md inline-block">
                Duration: {course.duration}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareerCourses;
