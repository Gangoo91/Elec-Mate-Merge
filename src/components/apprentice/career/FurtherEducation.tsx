
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const educationOptions = [
  {
    id: 1,
    title: "HNC in Electrical Engineering",
    institution: "UK Colleges",
    description: "Higher National Certificate qualification providing advanced electrical theory and practice.",
    level: "Level 4"
  },
  {
    id: 2,
    title: "Bachelor's Degree",
    institution: "Universities",
    description: "BEng or BSc in Electrical Engineering, Building Services, or Energy Management.",
    level: "Level 6"
  },
  {
    id: 3,
    title: "Master's Degree",
    institution: "Universities",
    description: "MEng or MSc specialising in power systems, renewable energy, or building services.",
    level: "Level 7"
  }
];

const FurtherEducation = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Further Education</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationOptions.map((option) => (
          <Card key={option.id} className="border-elec-yellow/20 bg-elec-gray h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{option.title}</CardTitle>
              <p className="text-sm text-amber-400">{option.institution}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{option.description}</p>
              <div className="text-sm bg-elec-dark/30 p-2 rounded-md inline-block">
                {option.level}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FurtherEducation;
