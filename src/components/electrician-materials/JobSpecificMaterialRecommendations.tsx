import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Building, Factory, Package, CheckCircle, Clock, DollarSign } from "lucide-react";

const JobSpecificMaterialRecommendations = () => {
  const [selectedJob, setSelectedJob] = useState<string>("domestic");

  const jobTypes = [
    {
      id: "domestic",
      icon: Home,
      title: "Domestic Work",
      color: "bg-green-600/90 text-white border-green-400"
    },
    {
      id: "commercial",
      icon: Building,
      title: "Commercial",
      color: "bg-blue-600/90 text-white border-blue-400"
    },
    {
      id: "industrial",
      icon: Factory,
      title: "Industrial",
      color: "bg-orange-600/90 text-white border-orange-400"
    }
  ];

  const recommendations = {
    domestic: [
      {
        category: "Essential Cables & Wiring",
        estimatedCost: "£200-350",
        timeToSource: "Same day",
        materials: [
          { name: "2.5mm² Twin & Earth Cable (50m)", priority: "Critical", price: "£45-65", spec: "Ring main circuits" },
          { name: "1.5mm² Twin & Earth Cable (50m)", priority: "Critical", price: "£30-45", spec: "Lighting circuits" },
          { name: "6mm² Twin & Earth Cable (10m)", priority: "Essential", price: "£25-35", spec: "Cooker circuits" },
          { name: "1.0mm² 3 Core & Earth (25m)", priority: "Essential", price: "£35-50", spec: "Two-way switching" },
          { name: "10mm² Earth Cable (10m)", priority: "Critical", price: "£20-30", spec: "Main bonding" }
        ]
      },
      {
        category: "Consumer Unit & Protection",
        estimatedCost: "£150-280",
        timeToSource: "Same day",
        materials: [
          { name: "8-Way Dual RCD Consumer Unit", priority: "Critical", price: "£80-120", spec: "18th Edition compliant" },
          { name: "32A Type B MCBs (x4)", priority: "Critical", price: "£40-60", spec: "Ring circuits" },
          { name: "6A Type B MCBs (x4)", priority: "Critical", price: "£32-48", spec: "Lighting circuits" },
          { name: "30mA RCD (80A)", priority: "Critical", price: "£25-40", spec: "Earth leakage protection" }
        ]
      }
    ],
    commercial: [
      {
        category: "Distribution & Protection",
        estimatedCost: "£500-900",
        timeToSource: "1-2 days",
        materials: [
          { name: "3-Phase Distribution Board (24-way)", priority: "Critical", price: "£200-350", spec: "TP&N system" },
          { name: "RCBO Type B 20A (x12)", priority: "Critical", price: "£180-240", spec: "Individual protection" },
          { name: "100A 3-Phase MCCB", priority: "Critical", price: "£150-250", spec: "Main switch" },
          { name: "Type 2 Surge Protection Device", priority: "Essential", price: "£80-120", spec: "Surge protection" }
        ]
      },
      {
        category: "Installation Cables",
        estimatedCost: "£400-700",
        timeToSource: "1-2 days",
        materials: [
          { name: "4mm² 3C+E SWA Cable (100m)", priority: "Critical", price: "£180-280", spec: "Submain feeds" },
          { name: "2.5mm² Fire Resistant Cable (100m)", priority: "Essential", price: "£120-180", spec: "Fire alarm circuits" },
          { name: "1.5mm² Data Cable Cat6 (500m)", priority: "Recommended", price: "£80-120", spec: "Network installation" },
          { name: "25mm² Single Core Cable (50m)", priority: "Essential", price: "£100-150", spec: "Main earthing" }
        ]
      }
    ],
    industrial: [
      {
        category: "Heavy Duty Distribution",
        estimatedCost: "£1200-2000",
        timeToSource: "2-5 days",
        materials: [
          { name: "400A 3-Phase Switch Disconnector", priority: "Critical", price: "£400-600", spec: "Main isolation" },
          { name: "Industrial Distribution Panel (36-way)", priority: "Critical", price: "£500-800", spec: "IP65 rated" },
          { name: "160A MCCBs (x6)", priority: "Critical", price: "£300-450", spec: "Feeder protection" },
          { name: "Earth Monitoring Relay", priority: "Essential", price: "£150-250", spec: "IT system monitoring" }
        ]
      },
      {
        category: "Power & Control Cables",
        estimatedCost: "£800-1400",
        timeToSource: "3-7 days",
        materials: [
          { name: "35mm² 4C SWA Cable (100m)", priority: "Critical", price: "£400-600", spec: "Motor feeds" },
          { name: "1.5mm² Instrumentation Cable (100m)", priority: "Essential", price: "£120-180", spec: "Control circuits" },
          { name: "70mm² Single Core XLPE (50m)", priority: "Critical", price: "£250-350", spec: "Main distribution" },
          { name: "Fire Resistant Control Cable (200m)", priority: "Essential", price: "£180-280", spec: "Safety systems" }
        ]
      }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-600/90 text-white border-red-400";
      case "Essential": return "bg-orange-600/90 text-white border-orange-400";
      case "Recommended": return "bg-green-600/90 text-white border-green-400";
      default: return "bg-blue-600/90 text-white border-blue-400";
    }
  };

  const selectedJobData = recommendations[selectedJob as keyof typeof recommendations];
  const totalCost = selectedJobData.reduce((total, category) => {
    const categoryTotal = category.materials.reduce((catTotal, material) => {
      const priceRange = material.price.match(/£(\d+)-(\d+)/);
      if (priceRange) {
        return catTotal + (parseInt(priceRange[1]) + parseInt(priceRange[2])) / 2;
      }
      return catTotal;
    }, 0);
    return total + categoryTotal;
  }, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-white">Job-Specific Material Lists</CardTitle>
            <p className="text-white/80 text-sm">Essential materials for different types of electrical installations</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {jobTypes.map((job) => (
            <Button
              key={job.id}
              variant={selectedJob === job.id ? "default" : "outline"}
              onClick={() => setSelectedJob(job.id)}
              className={`h-auto p-4 flex flex-col items-center gap-2 ${
                selectedJob === job.id 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
              }`}
            >
              <job.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">{job.title}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="bg-elec-card/50 border-purple-500/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Estimated Cost</span>
                </div>
                <div className="text-white font-semibold">£{Math.round(totalCost)}</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Sourcing Time</span>
                </div>
                <div className="text-white font-semibold">1-5 Days</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Total Items</span>
                </div>
                <div className="text-white font-semibold">
                  {selectedJobData.reduce((total, cat) => total + cat.materials.length, 0)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Material Categories */}
        <div className="space-y-4">
          {selectedJobData.map((category, index) => (
            <Card key={index} className="bg-elec-card/30 border-white/10">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">{category.category}</CardTitle>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {category.estimatedCost}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {category.timeToSource}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.materials.map((material, materialIndex) => (
                  <div key={materialIndex} className="flex items-center justify-between p-3 rounded-lg bg-elec-dark/40 border border-white/5">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <div>
                        <div className="font-medium text-white">{material.name}</div>
                        <div className="text-sm text-white/60">{material.spec}</div>
                        <div className="text-sm text-white/80">{material.price}</div>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(material.priority)}>
                      {material.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* BS 7671 Compliance Note */}
        <div className="p-4 rounded-lg bg-purple-600/10 border border-purple-500/20">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5" />
            <div>
              <h5 className="font-medium text-white mb-1">BS 7671 18th Edition Compliance</h5>
              <p className="text-sm text-white/80">
                All recommended materials comply with current UK wiring regulations. 
                Ensure proper installation practices and testing procedures are followed for full compliance.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobSpecificMaterialRecommendations;