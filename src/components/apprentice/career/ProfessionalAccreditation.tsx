
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const professionalAccreditations = [
  {
    id: 1,
    title: "IET Membership",
    level: "Professional",
    description: "Membership of the Institution of Engineering and Technology, providing recognition of professional competence."
  },
  {
    id: 2,
    title: "Chartered Engineer (CEng)",
    level: "Advanced",
    description: "Prestigious qualification demonstrating high-level competence and commitment to engineering."
  },
  {
    id: 3,
    title: "ECA Membership",
    level: "Industry",
    description: "Electrical Contractors' Association membership, vital for commercial credibility."
  }
];

const ProfessionalAccreditation = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Professional Accreditation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {professionalAccreditations.map((cert) => (
          <Card key={cert.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{cert.title}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded ${
                  cert.level === "Professional" 
                    ? "bg-blue-500/20 text-blue-500" 
                    : cert.level === "Advanced" 
                    ? "bg-green-500/20 text-green-500" 
                    : "bg-amber-500/20 text-amber-500"
                }`}>
                  {cert.level}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{cert.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalAccreditation;
