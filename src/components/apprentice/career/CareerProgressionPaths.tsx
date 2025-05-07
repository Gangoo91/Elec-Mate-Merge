
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

const CareerProgressionPaths = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
      <div className="flex gap-3 items-start">
        <Award className="h-6 w-6 text-elec-yellow mt-1" />
        <div>
          <h3 className="font-medium text-lg mb-1">Career Progression Paths</h3>
          <p className="text-sm mb-3">
            Common progression paths in the UK electrical industry include:
          </p>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="text-amber-400 font-medium">Apprentice → Installation Electrician → Approved Electrician → Supervisor</h4>
              <p className="text-xs mt-1">The traditional progression path focusing on installation work and eventually team management.</p>
            </div>
            <div>
              <h4 className="text-amber-400 font-medium">Electrician → Specialist → Commissioning Technician → Commissioning Engineer</h4>
              <p className="text-xs mt-1">Focusing on developing expertise in specialized systems and commissioning increasingly complex installations.</p>
            </div>
            <div>
              <h4 className="text-amber-400 font-medium">Electrician → HNC/HND/Degree → Electrical Designer → Project Engineer</h4>
              <p className="text-xs mt-1">Moving from hands-on installation to design and engineering roles through further education.</p>
            </div>
            <div>
              <h4 className="text-amber-400 font-medium">Electrician → Business Training → Electrical Contractor</h4>
              <p className="text-xs mt-1">Building business skills to establish and grow your own electrical contracting company.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CareerProgressionPaths;
