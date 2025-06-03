
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Construction, CalendarDays, Activity, MapPin, Award, Building, FileCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MajorProjects = () => {
  const isMobile = useIsMobile();
  
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['major-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('major_projects')
        .select('*')
        .eq('is_active', true)
        .order('date_awarded', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const getStatusBadge = (status: string) => {
    return (
      <div className="flex items-center gap-1">
        <span className="relative flex h-3 w-3">
          <Award className="h-4 w-4 text-green-500" />
        </span>
        <span className="text-green-400 text-xs font-medium">Awarded Project</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in px-2 md:px-0">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-elec-gray/20 rounded w-64 animate-pulse"></div>
          <div className="h-10 bg-elec-gray/20 rounded w-32 animate-pulse"></div>
        </div>
        <div className="h-64 bg-elec-gray/20 rounded animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <Construction className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
            Major Awarded Projects
          </h1>
          <Link to="/electrician/safety-shares">
            <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
            </Button>
          </Link>
        </div>
        <Card className="border-green-500/20">
          <CardContent className="p-6 text-center">
            <Construction className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Unable to Load Projects</h2>
            <p className="text-muted-foreground">There was an error loading major projects. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      {projects && projects.length > 0 ? (
        <>
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
                        <TableCell>{project.awarded_to}</TableCell>
                        <TableCell>{project.project_value}</TableCell>
                        <TableCell>{project.location}</TableCell>
                        <TableCell>{new Date(project.date_awarded).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}</TableCell>
                        <TableCell className="text-right">
                          <Link to={`/electrician/safety-shares/projects/${project.id}`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              <FileCheck className="h-3 w-3" /> View
                            </Button>
                          </Link>
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
                        {project.project_value}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {new Date(project.date_awarded).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    <CardTitle className="text-base">{project.title}</CardTitle>
                    <CardDescription className="text-green-400/80">Awarded to: {project.awarded_to}</CardDescription>
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
                    <Link to={`/electrician/safety-shares/projects/${project.id}`} className="w-full">
                      <Button size="sm" variant="outline" className="w-full text-xs">View Details</Button>
                    </Link>
                    <Button size="sm" className="w-full bg-green-500 text-white hover:bg-green-600 text-xs">
                      <Building className="mr-1 h-3 w-3" /> Contractor Info
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <Card className="border-elec-yellow/20">
          <CardContent className="p-6 text-center">
            <Construction className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Major Projects</h2>
            <p className="text-muted-foreground">There are currently no active major projects.</p>
          </CardContent>
        </Card>
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
