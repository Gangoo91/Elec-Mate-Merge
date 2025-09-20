import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Building, Factory, Wrench, CheckCircle, Clock, DollarSign } from "lucide-react";

const JobSpecificRecommendations = () => {
  const [selectedJob, setSelectedJob] = useState<string>("domestic");

  const jobTypes = [
    {
      id: "domestic",
      icon: Home,
      title: "Domestic Work",
      description: "House rewiring, consumer units, socket installation",
      color: "bg-green-600/90 text-white border-green-400"
    },
    {
      id: "commercial",
      icon: Building,
      title: "Commercial",
      description: "Office buildings, shops, lighting systems",
      color: "bg-blue-600/90 text-white border-blue-400"
    },
    {
      id: "industrial",
      icon: Factory,
      title: "Industrial",
      description: "Factories, heavy machinery, high-voltage systems",
      color: "bg-orange-600/90 text-white border-orange-400"
    }
  ];

  const recommendations = {
    domestic: [
      {
        category: "Essential Hand Tools",
        estimatedCost: "£150-250",
        timeToAssemble: "1 day",
        tools: [
          { name: "Insulated Screwdriver Set", priority: "Critical", price: "£35-50" },
          { name: "Wire Strippers", priority: "Critical", price: "£25-40" },
          { name: "Side Cutters", priority: "Critical", price: "£20-35" },
          { name: "Long Nose Pliers", priority: "Essential", price: "£15-25" },
          { name: "Voltage Tester", priority: "Critical", price: "£30-45" },
          { name: "Socket Tester", priority: "Essential", price: "£15-25" }
        ]
      },
      {
        category: "Specialist Tools",
        estimatedCost: "£100-180",
        timeToAssemble: "As needed",
        tools: [
          { name: "Cable Detector", priority: "Recommended", price: "£40-70" },
          { name: "Crimping Tool", priority: "Recommended", price: "£25-45" },
          { name: "Knife/Cable Stripper", priority: "Essential", price: "£10-20" },
          { name: "Torch/Headlamp", priority: "Essential", price: "£15-30" }
        ]
      }
    ],
    commercial: [
      {
        category: "Core Hand Tools",
        estimatedCost: "£200-350",
        timeToAssemble: "1-2 days",
        tools: [
          { name: "Professional Screwdriver Set", priority: "Critical", price: "£50-80" },
          { name: "Heavy-Duty Wire Strippers", priority: "Critical", price: "£40-65" },
          { name: "Cable Cutters", priority: "Critical", price: "£45-75" },
          { name: "Multimeter", priority: "Critical", price: "£60-120" },
          { name: "Phase Rotation Tester", priority: "Essential", price: "£80-150" },
          { name: "Insulation Tester", priority: "Critical", price: "£150-300" }
        ]
      },
      {
        category: "Installation Tools",
        estimatedCost: "£150-250",
        timeToAssemble: "As needed",
        tools: [
          { name: "Cable Pulling System", priority: "Recommended", price: "£40-80" },
          { name: "Conduit Bender", priority: "Essential", price: "£30-60" },
          { name: "Terminal Crimpers", priority: "Essential", price: "£50-90" },
          { name: "Label Printer", priority: "Recommended", price: "£60-100" }
        ]
      }
    ],
    industrial: [
      {
        category: "Heavy-Duty Tools",
        estimatedCost: "£400-700",
        timeToAssemble: "2-3 days",
        tools: [
          { name: "VDE Insulated Tool Set", priority: "Critical", price: "£100-180" },
          { name: "Industrial Multimeter", priority: "Critical", price: "£200-400" },
          { name: "High-Voltage Detector", priority: "Critical", price: "£80-150" },
          { name: "Cable Fault Locator", priority: "Essential", price: "£300-600" },
          { name: "Torque Screwdrivers", priority: "Critical", price: "£150-250" },
          { name: "Lock-out Tag-out Kit", priority: "Critical", price: "£50-100" }
        ]
      },
      {
        category: "Safety & Testing",
        estimatedCost: "£300-500",
        timeToAssemble: "Ongoing",
        tools: [
          { name: "Earth Loop Impedance Tester", priority: "Critical", price: "£200-350" },
          { name: "PAT Testing Equipment", priority: "Essential", price: "£150-300" },
          { name: "Arc Flash PPE", priority: "Critical", price: "£100-200" },
          { name: "Gas Detection Equipment", priority: "Recommended", price: "£200-400" }
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
    const categoryTotal = category.tools.reduce((catTotal, tool) => {
      const priceRange = tool.price.match(/£(\d+)-(\d+)/);
      if (priceRange) {
        return catTotal + (parseInt(priceRange[1]) + parseInt(priceRange[2])) / 2;
      }
      return catTotal;
    }, 0);
    return total + categoryTotal;
  }, 0);

  return (
    <Card className="bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 border-purple-500/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400">
            <Wrench className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-white">Job-Specific Tool Recommendations</CardTitle>
            <p className="text-white/80 text-sm">Curated tool lists for different types of electrical work</p>
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
                  <span className="text-sm">Setup Time</span>
                </div>
                <div className="text-white font-semibold">1-3 Days</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Total Tools</span>
                </div>
                <div className="text-white font-semibold">
                  {selectedJobData.reduce((total, cat) => total + cat.tools.length, 0)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Categories */}
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
                      {category.timeToAssemble}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="flex items-center justify-between p-3 rounded-lg bg-elec-dark/40 border border-white/5">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <div>
                        <div className="font-medium text-white">{tool.name}</div>
                        <div className="text-sm text-white/80">{tool.price}</div>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(tool.priority)}>
                      {tool.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="p-4 rounded-lg bg-purple-600/10 border border-purple-500/20">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5" />
            <div>
              <h5 className="font-medium text-white mb-1">Professional Advice</h5>
              <p className="text-sm text-white/80">
                These recommendations are based on industry standards and experienced electrician feedback. 
                Consider your specific work requirements and budget when building your tool collection.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobSpecificRecommendations;