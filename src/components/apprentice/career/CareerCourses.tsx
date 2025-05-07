
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Users, Calendar, Star } from "lucide-react";

const careerCourses = [
  {
    id: 1,
    title: "18th Edition Wiring Regulations",
    provider: "NICEIC",
    description: "Essential course covering the latest BS7671 electrical regulations for all UK installations.",
    duration: "3 days",
    level: "Intermediate",
    price: "£350 - £450",
    format: "Classroom and online options",
    nextDates: ["15 June 2025", "22 July 2025", "18 August 2025"],
    rating: 4.8
  },
  {
    id: 2,
    title: "Inspection & Testing",
    provider: "City & Guilds",
    description: "Learn how to properly test and verify electrical installations to industry standards.",
    duration: "5 days",
    level: "Advanced",
    price: "£600 - £750",
    format: "Classroom with practical assessments",
    nextDates: ["10 June 2025", "14 July 2025", "11 September 2025"],
    rating: 4.7
  },
  {
    id: 3,
    title: "Electric Vehicle Charging",
    provider: "ECA",
    description: "Specialised training for installing and maintaining EV charging points.",
    duration: "2 days",
    level: "Intermediate",
    price: "£375 - £450",
    format: "Blended learning with practical sessions",
    nextDates: ["5 June 2025", "3 August 2025", "7 October 2025"],
    rating: 4.9
  },
  {
    id: 4,
    title: "Domestic Electrical Installer",
    provider: "NAPIT",
    description: "Course for those looking to perform domestic electrical work under Part P building regulations.",
    duration: "5 days",
    level: "Foundation",
    price: "£550 - £650",
    format: "Classroom with hands-on training",
    nextDates: ["12 June 2025", "17 July 2025", "21 September 2025"],
    rating: 4.6
  },
  {
    id: 5,
    title: "Fire Alarm Systems Installation",
    provider: "FIA",
    description: "Comprehensive training on designing, installing and maintaining fire detection systems.",
    duration: "4 days",
    level: "Intermediate",
    price: "£500 - £600",
    format: "Classroom with practical elements",
    nextDates: ["8 June 2025", "10 August 2025", "12 October 2025"],
    rating: 4.8
  }
];

const CareerCourses = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Career Courses</h2>
        <p className="text-muted-foreground">
          Professional development courses are essential for staying current with industry standards and expanding your skillset.
          These popular courses can help you advance your electrical career and increase your earning potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerCourses.map((course) => (
          <Card key={course.id} className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
              <p className="text-sm text-amber-400">Provider: {course.provider}</p>
            </CardHeader>
            <CardContent className="pt-2 flex-grow flex flex-col">
              <p className="text-sm mb-4">{course.description}</p>
              
              <div className="mt-auto space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-elec-yellow" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-elec-yellow" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <BookOpen className="h-3.5 w-3.5 text-elec-yellow" />
                    <span>{course.format}</span>
                  </div>
                </div>
                
                <div className="border-t border-elec-yellow/10 pt-3 space-y-2">
                  <p className="text-xs text-elec-yellow flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Upcoming Dates:</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {course.nextDates.map((date, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md"
                      >
                        {date}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs mt-2 text-right text-amber-400/80">
                    Price range: {course.price}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
        <div className="flex gap-3 items-start">
          <BookOpen className="h-6 w-6 text-elec-yellow mt-1" />
          <div>
            <h3 className="font-medium text-lg mb-1">Course Selection Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Choose courses that are accredited by recognised industry bodies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Look for courses with hands-on practical components to build real-world skills</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Consider your career goals when selecting courses - focus on areas that align with your desired specialisation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Ask your employer about funding opportunities or if they offer time off for professional development</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CareerCourses;
