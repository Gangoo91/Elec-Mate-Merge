
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Library, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const IndustryNews = () => {
  const isMobile = useIsMobile();
  
  const regulatoryUpdates = [
    {
      id: 1,
      body: "IET",
      title: "18th Edition Amendment 2 Updates",
      date: "1 May 2025",
      summary: "New changes to the wiring regulations affecting residential installations.",
      category: "Regulations"
    },
    {
      id: 2,
      body: "HSE",
      title: "Updated GS38 Guidance",
      date: "15 Apr 2025", 
      summary: "Revised guidance on electrical test equipment for use by electricians.",
      category: "Guidance"
    },
    {
      id: 3,
      body: "ECA",
      title: "New Safe Working Practice Guide",
      date: "10 Apr 2025",
      summary: "Updated industry guidance on working safely in confined spaces.",
      category: "Guidance"
    },
    {
      id: 4,
      body: "NICEIC",
      title: "Technical Bulletin 23/2",
      date: "28 Mar 2025",
      summary: "Clarification on inspection and testing requirements for new installations.",
      category: "Bulletin"
    },
    {
      id: 5,
      body: "IET",
      title: "Guidance Note 3 Update",
      date: "20 Mar 2025",
      summary: "Revised guidance on inspection and testing of electrical installations.",
      category: "Guidance"
    },
    {
      id: 6,
      body: "HSE",
      title: "Electrical Safety at Work Updates",
      date: "15 Mar 2025",
      summary: "Important changes to the Electricity at Work Regulations enforcement policy.",
      category: "Regulations"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in px-2 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <Library className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            Industry News
          </h1>
          <p className="text-sm text-muted-foreground">
            Latest electrical industry regulations and developments
          </p>
        </div>
        <Link to="/electrician/safety-shares">
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regulatoryUpdates.map(update => (
          <Card key={update.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
            <div className="h-1 bg-blue-500" />
            <CardHeader className={`pb-2 ${isMobile ? 'p-4' : 'p-6'}`}>
              <div className="flex justify-between items-center mb-2">
                <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400">
                  {update.body}
                </Badge>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {update.date}
                </div>
              </div>
              <CardTitle className="text-base sm:text-lg">{update.title}</CardTitle>
            </CardHeader>
            <CardContent className={`${isMobile ? 'px-4 py-2' : 'p-6 py-2'}`}>
              <p className="text-xs sm:text-sm text-muted-foreground">{update.summary}</p>
              <Badge variant="outline" className="mt-2 text-xs">{update.category}</Badge>
            </CardContent>
            <CardFooter className={`${isMobile ? 'p-4' : 'p-6 pt-3'}`}>
              <Button size={isMobile ? "sm" : "default"} variant="outline" className="w-full text-xs sm:text-sm">View Update</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IndustryNews;
