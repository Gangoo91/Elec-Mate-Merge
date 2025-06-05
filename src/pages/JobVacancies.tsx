
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, PoundSterling } from "lucide-react";

const JobVacancies = () => {
  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Job Vacancies - Elec-Mate</title>
        <meta name="description" content="Find the latest electrical job opportunities in the UK" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Vacancies</h1>
          <p className="text-muted-foreground">
            Find the latest electrical job opportunities in the UK
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-elec-yellow" />
                Electrical Installation Technician
              </CardTitle>
              <CardDescription>ABC Electrical Solutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                London, UK
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <PoundSterling className="h-4 w-4" />
                £35,000 - £45,000
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="h-4 w-4" />
                Full-time, Permanent
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-elec-yellow" />
                Maintenance Electrician
              </CardTitle>
              <CardDescription>Industrial Power Services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                Birmingham, UK
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <PoundSterling className="h-4 w-4" />
                £30,000 - £40,000
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="h-4 w-4" />
                Full-time, Permanent
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-elec-yellow" />
                Commercial Electrician
              </CardTitle>
              <CardDescription>City Electrical Services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                Manchester, UK
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <PoundSterling className="h-4 w-4" />
                £32,000 - £42,000
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="h-4 w-4" />
                Full-time, Permanent
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center p-8">
          <p className="text-gray-400">More job listings coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default JobVacancies;
