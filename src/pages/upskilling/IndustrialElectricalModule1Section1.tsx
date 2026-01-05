import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const IndustrialElectricalModule1Section1 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../industrial-electrical-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Industrial vs Domestic Electrical Setup
                </h1>
                <p className="text-xl text-gray-400">
                  Key differences between industrial and domestic electrical systems
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                System Comparison
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">System Differences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Voltage Levels</h3>
                <p>Industrial systems operate at higher voltages (415V 3-phase) compared to domestic (230V single-phase).</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Load Characteristics</h3>
                <p>Industrial loads include large motors, machinery, and continuous high-power equipment.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Protection Systems</h3>
                <p>More complex protection including motor protection, earth fault monitoring, and power quality management.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Installation Methods</h3>
                <p>Cable tray systems, containment, and segregation requirements for industrial environments.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule1Section1;