
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, PoundSterling, Clock, Users } from "lucide-react";

interface MajorProject {
  id: string;
  title: string;
  description: string;
  location: string;
  value: string;
  deadline: string;
  status: "open" | "closing-soon" | "awarded" | "in-progress";
  contractor?: string;
  category: string;
  publishedDate: string;
  requirements: string[];
}

const MajorProjectsCard = () => {
  const projects: MajorProject[] = [
    {
      id: "1",
      title: "Manchester Hospital Electrical Infrastructure Upgrade",
      description: "Complete electrical system modernisation including backup power systems, LED lighting conversion, and smart building integration for a 400-bed hospital facility.",
      location: "Manchester, Greater Manchester",
      value: "£2.8M - £3.2M",
      deadline: "2024-03-15",
      status: "open",
      category: "Healthcare Infrastructure",
      publishedDate: "2024-01-20",
      requirements: [
        "NICEIC/ECA approved contractor",
        "Hospital electrical experience required",
        "24/7 working capabilities",
        "Minimum £5M annual turnover"
      ]
    },
    {
      id: "2", 
      title: "Birmingham Metro Extension - Electrical Works Package",
      description: "Electrical infrastructure for 5km metro line extension including substations, overhead lines, platform lighting, and SCADA systems integration.",
      location: "Birmingham, West Midlands", 
      value: "£15M - £18M",
      deadline: "2024-02-28",
      status: "closing-soon",
      category: "Transport Infrastructure",
      publishedDate: "2023-12-08",
      requirements: [
        "Rail electrification experience essential",
        "Network Rail approved supplier",
        "HV/EHV competency required",
        "Minimum 10 years transport sector experience"
      ]
    },
    {
      id: "3",
      title: "Thames Estuary Wind Farm - Onshore Connection",
      description: "132kV onshore electrical infrastructure connecting offshore wind farm to national grid, including new substation and 15km underground cable route.",
      location: "Kent, South East England",
      value: "£45M - £52M", 
      deadline: "2024-04-10",
      status: "open",
      category: "Renewable Energy",
      publishedDate: "2024-01-15",
      requirements: [
        "HV underground cable experience",
        "Environmental impact mitigation",
        "National Grid connection approval",
        "Minimum £20M project portfolio"
      ]
    },
    {
      id: "4",
      title: "University Campus Smart Grid Implementation",
      description: "Installation of smart grid technology across 25 buildings including solar integration, battery storage, and intelligent load management systems.",
      location: "Edinburgh, Scotland",
      value: "£4.2M - £5.1M",
      deadline: "2024-01-31",
      status: "awarded",
      contractor: "Scottish Power Networks",
      category: "Smart Grid Technology",
      publishedDate: "2023-11-20",
      requirements: [
        "Smart grid certification required",
        "Solar PV integration experience",
        "Educational sector experience preferred",
        "Cyber security compliance essential"
      ]
    },
    {
      id: "5",
      title: "London Data Centre Electrical Fit-Out",
      description: "Complete electrical infrastructure for new Tier III data centre including UPS systems, emergency generators, and high-density power distribution.",
      location: "London, Greater London",
      value: "£8.5M - £9.8M",
      deadline: "2024-03-20",
      status: "in-progress", 
      contractor: "Crown House Technologies",
      category: "Data Centre Infrastructure",
      publishedDate: "2023-10-15",
      requirements: [
        "Data centre electrical experience essential",
        "Uptime Institute certification preferred",
        "24/7 critical infrastructure experience",
        "Precision cooling integration capability"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "closing-soon":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "awarded":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "in-progress":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Open for Applications";
      case "closing-soon":
        return "Closing Soon";
      case "awarded":
        return "Contract Awarded";
      case "in-progress":
        return "Project In Progress";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:gap-8">
        {projects.map((project) => {
          const daysLeft = getDaysUntilDeadline(project.deadline);
          
          return (
            <Card key={project.id} className="border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/40 transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={`border ${getStatusColor(project.status)}`}>
                        {getStatusText(project.status)}
                      </Badge>
                      {daysLeft > 0 && daysLeft <= 7 && project.status === "open" && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                        </Badge>
                      )}
                      <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                        {project.category}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl sm:text-2xl text-white leading-tight">
                      {project.title}
                    </CardTitle>
                  </div>
                  
                  <div className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-elec-yellow">
                    <PoundSterling className="h-6 w-6 sm:h-8 sm:w-8" />
                    <span className="text-lg sm:text-xl">{project.value}</span>
                  </div>
                </div>
                
                <CardDescription className="text-base text-gray-300 leading-relaxed">
                  {project.description}
                </CardDescription>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                    <span>Deadline: {formatDate(project.deadline)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                    <span>Published: {formatDate(project.publishedDate)}</span>
                  </div>
                  
                  {project.contractor && (
                    <div className="flex items-center gap-2 text-gray-300 sm:col-span-2 lg:col-span-1">
                      <Building2 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                      <span>Awarded to: {project.contractor}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-elec-yellow" />
                    Key Requirements
                  </h4>
                  <ul className="space-y-2">
                    {project.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center mt-12 py-8 border-t border-elec-yellow/20">
        <p className="text-muted-foreground mb-4">
          Want to be notified about new major projects and tender opportunities?
        </p>
        <p className="text-sm text-gray-400">
          Upgrade to Elec-Mate Pro for instant notifications and detailed tender documents
        </p>
      </div>
    </div>
  );
};

export default MajorProjectsCard;
