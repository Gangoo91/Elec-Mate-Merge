
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, BookOpen, Wrench, FileText, Settings, Zap, Box, Cable, Cloud, ShieldCheck, Bolt } from "lucide-react";

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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Section 1: Basic Electrical Theory */}
        <Link 
          to={`/apprentice/study/eal/${courseSlug}/unit/elec2-04/section/1`}
          onClick={() => onResourceClick("section")}
        >
          <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">1. Basic Electrical Theory</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">
                Learn the fundamentals of electrical theory including voltage, current, resistance, 
                and circuit principles that form the foundation of electrical work.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        {/* Section 2: Technical Information */}
        <Link 
          to={`/apprentice/study/eal/${courseSlug}/unit/elec2-04/section/2`}
          onClick={() => onResourceClick("section")}
        >
          <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">2. Technical Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">
                Understand how to interpret technical information, diagrams, and electrical drawings 
                essential for electrical installation work.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 3: Wiring Systems */}
        <Link 
          to={`/apprentice/study/eal/${courseSlug}/unit/elec2-04/section/3`}
          onClick={() => onResourceClick("section")}
        >
          <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <Cable className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">3. Wiring Systems</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">
                Explore different wiring systems, cable types, and wiring methods used in electrical 
                installations for various applications.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 4: Service Positions */}
        <Link 
          to={`/apprentice/study/eal/${courseSlug}/unit/elec2-04/section/4`}
          onClick={() => onResourceClick("section")}
        >
          <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <Box className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">4. Service Positions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">
                Learn about consumer units, distribution boards, and service positions used in 
                domestic and commercial electrical installations.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 5: Lighting Circuits */}
        <Link 
          to={`/apprentice/study/eal/${courseSlug}/unit/elec2-04/section/5`}
          onClick={() => onResourceClick("section")}
        >
          <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">5. Lighting Circuits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">
                Understand lighting circuits design, installation methods, and control systems for 
                domestic and commercial applications.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        {/* More sections */}
        <Link 
          to={`/apprentice/study/eal/${courseSlug}/unit/elec2-04/section/6`}
          onClick={() => onResourceClick("section")}
        >
          <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <Settings className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">6. Power Circuits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">
                Study ring and radial circuits for power distribution in domestic and commercial 
                electrical installations.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Link 
          to={`/apprentice/study/eal/${courseSlug}/unit/elec2-04/section/7`}
          onClick={() => onResourceClick("section")}
        >
          <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">7. Special Installation Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">
                Explore special installation requirements for specific locations and conditions 
                according to BS 7671 standards.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Link 
          to={`/apprentice/study/eal/${courseSlug}/unit/elec2-04/section/8`}
          onClick={() => onResourceClick("section")}
        >
          <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">8. Earthing and Bonding</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">
                Learn about earthing arrangements, protective bonding, and equipotential bonding 
                principles for electrical safety.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Link 
          to={`/apprentice/study/eal/${courseSlug}/unit/elec2-04/section/9`}
          onClick={() => onResourceClick("section")}
        >
          <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <Bolt className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">9. Overcurrent Protection</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">
                Study overcurrent protective devices, their selection, and application in electrical 
                installations for safety and compliance.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Link 
          to={`/apprentice/study/eal/${courseSlug}/unit/elec2-04/section/10`}
          onClick={() => onResourceClick("section")}
        >
          <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">10. Circuit Design</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">
                Learn principles of electrical circuit design, load calculation, and installation planning 
                according to regulations and best practices.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default ElectricalTheoryUnit;
