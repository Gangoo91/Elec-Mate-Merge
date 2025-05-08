
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart, Headphones, Brain, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import MentalHealthMate from "@/components/mental-health/MentalHealthMate";
import MentalHealthSearch from "@/components/mental-health/MentalHealthSearch";
import MentalHealthCard from "@/components/mental-health/MentalHealthCard";
import LocalResourceFinder from "@/components/mental-health/crisis/LocalResourceFinder";

const ApprenticeMentalHealth = () => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  
  const resources = [
    {
      id: 1,
      title: "Managing Workplace Stress",
      description: "Techniques for handling stress on job sites and during training",
      type: "Guide",
      icon: Brain,
      link: "/apprentice/mental-health/stress-management"
    },
    {
      id: 2,
      title: "Apprentice Support Network",
      description: "Connect with fellow apprentices in a supportive environment",
      type: "Community",
      icon: Headphones,
      link: "/apprentice/mental-health/support-network"
    },
    {
      id: 3,
      title: "Work-Life Balance",
      description: "Strategies for maintaining balance during your apprenticeship",
      type: "Workshop",
      icon: BookOpen,
      link: "/apprentice/mental-health/work-life-balance"
    },
    {
      id: 4,
      title: "Crisis Resources",
      description: "Immediate support options for urgent mental health concerns",
      type: "Helpline",
      icon: MapPin,
      link: "/apprentice/mental-health/crisis-resources"
    }
  ];

  // Filter resources based on search
  const filteredResources = searchQuery 
    ? resources.filter(resource => 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : resources;

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mental Health Hub</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Resources and support for maintaining wellbeing during your apprenticeship journey
          </p>
        </div>
        <Link to="/apprentice/hub" className="self-start sm:self-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">Back to Apprentice Hub</Button>
        </Link>
      </div>
      
      {/* Search component */}
      <MentalHealthSearch onSearch={handleSearch} />
      
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Heart className="h-5 w-5 text-elec-yellow" />
            Your Wellbeing Matters
          </CardTitle>
          <CardDescription className="text-sm">
            The electrical trade can be demanding. Remember to prioritize your mental health.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base mb-4">
            If you're experiencing distress or need immediate support, contact the 24/7 Electrical Trades Support Line at <span className="font-medium">0800 123 4567</span>
          </p>
        </CardContent>
      </Card>

      {/* Local Mental Health Resources Finder */}
      <LocalResourceFinder />

      {/* Mental Health Mate feature */}
      <MentalHealthMate />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <MentalHealthCard
              key={resource.id}
              id={resource.id}
              title={resource.title}
              description={resource.description}
              type={resource.type}
              icon={resource.icon}
              link={resource.link}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-8">
            <p className="text-muted-foreground">No resources match your search criteria.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprenticeMentalHealth;
