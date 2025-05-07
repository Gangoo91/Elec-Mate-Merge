
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Construction, CalendarDays, Activity, MapPin, Award, Building, FileCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MajorProjects = () => {
  const isMobile = useIsMobile();
  
  const projects = [
    {
      id: 1,
      title: "HS2 Euston Station Electrical Package",
      awardedTo: "Balfour Beatty",
      date: "18 Mar 2025",
      summary: "£120M electrical installation package for the new HS2 Euston terminus station, covering critical power systems, lighting, and security.",
      location: "London",
      value: "£120M",
      status: "awarded"
    },
    {
      id: 2,
      title: "SSE North Sea Wind Farm Grid Connection",
      awardedTo: "Siemens Energy & VolkerInfra",
      date: "4 Apr 2025",
      summary: "Major contract awarded for connecting the 1.2GW Berwick Bank offshore wind farm to the National Grid via 380kV transmission system.",
      location: "East Lothian, Scotland",
      value: "£240M",
      status: "awarded"
    },
    {
      id: 3,
      title: "Hinkley Point C Nuclear Plant Distribution Systems",
      awardedTo: "Balfour Beatty Bailey",
      date: "27 Mar 2025",
      summary: "Final phase electrical distribution systems for the UK's first new nuclear power plant in a generation.",
      location: "Somerset",
      value: "£190M",
      status: "awarded"
    },
    {
      id: 4,
      title: "Microsoft Hyperscale Data Centre",
      awardedTo: "Mercury Engineering",
      date: "15 Feb 2025",
      summary: "Full electrical package for new 50MW hyperscale data centre including primary and secondary distribution systems.",
      location: "Dublin, Ireland",
      value: "€95M",
      status: "awarded"
    },
    {
      id: 5,
      title: "Leeds Teaching Hospital Redevelopment",
      awardedTo: "NG Bailey",
      date: "2 Apr 2025",
      summary: "Complete hospital electrical infrastructure package including life critical systems, medical-grade distribution networks and BMS integration.",
      location: "Leeds",
      value: "£87M",
      status: "awarded"
    }
  ];

  const getStatusBadge = (status) => {
    return (
      <div className="flex items-center gap-1">
        <span className="relative flex h-3 w-3">
          <Award className="h-4 w-4 text-green-500" />
        </span>
        <span className="text-green-400 text-xs font-medium">Awarded Project</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in px-2 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <Construction className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
            Major Awarded Projects
          </h1>
          <p className="text-sm text-muted-foreground">
            Recently awarded major electrical contracts across the UK and Ireland
          </p>
        </div>
        <Link to="/electrician/safety-shares">
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
          </Button>
        </Link>
      </div>

      {!isMobile && (
        <Card className="border-elec-yellow/20">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-elec-gray/80 hover:bg-elec-gray">
                  <TableHead className="w-[250px]">Project</TableHead>
                  <TableHead>Awarded To</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map(project => (
                  <TableRow key={project.id} className="border-elec-yellow/10 hover:bg-elec-gray/50">
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.awardedTo}</TableCell>
                    <TableCell>{project.value}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>{project.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="gap-1">
                        <FileCheck className="h-3 w-3" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {isMobile && (
        <div className="grid grid-cols-1 gap-4">
          {projects.map(project => (
            <Card key={project.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
              <div className="h-1 bg-green-500" />
              <CardHeader className="pb-2 p-4">
                <div className="flex justify-between items-center mb-2">
                  <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-400">
                    {project.value}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {project.date}
                  </div>
                </div>
                <CardTitle className="text-base">{project.title}</CardTitle>
                <CardDescription className="text-green-400/80">Awarded to: {project.awardedTo}</CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-2 space-y-2">
                <p className="text-xs text-muted-foreground">{project.summary}</p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" /> {project.location}
                  </div>
                  {getStatusBadge(project.status)}
                </div>
              </CardContent>
              <CardFooter className="p-4 flex w-full gap-2">
                <Button size="sm" variant="outline" className="w-full text-xs">View Details</Button>
                <Button size="sm" className="w-full bg-green-500 text-white hover:bg-green-600 text-xs">
                  <Building className="mr-1 h-3 w-3" /> Contractor Info
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-green-400" />
            <h3 className="font-medium">Project Updates Feed</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe to receive notifications when new major contracts are awarded in your region.
          </p>
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="w-full sm:w-auto">
            Enable Project Notifications
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MajorProjects;
