
import { useParams } from "react-router-dom";
import { electricalTheorySections } from "./data/electricalTheorySections";
import TheorySectionGrid from "./components/TheorySectionGrid";

interface ElectricalTheoryUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const ElectricalTheoryUnit = ({ unitCode, onResourceClick }: ElectricalTheoryUnitProps) => {
  const { courseSlug } = useParams();
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">Electrical Installation Theory and Technology</h2>
        <p className="text-elec-light/80 mt-2">
          This unit covers the principles, theory and technologies that underpin electrical installation practices.
          You'll learn about electrical theory, wiring systems, and installation methods.
        </p>
      </div>

      <TheorySectionGrid 
        sections={electricalTheorySections}
        courseSlug={courseSlug}
        unitCode={unitCode}
        onResourceClick={onResourceClick}
      />
    </div>
  );
};

export default ElectricalTheoryUnit;
