
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LocalResource } from "./models/resource-types";
import PostcodeSearchForm from "./components/PostcodeSearchForm";
import SearchError from "./components/SearchError";
import ResourcesList from "./components/ResourcesList";
import ResourceDetails from "./components/ResourceDetails";

const LocalResourceFinder = () => {
  const [localResources, setLocalResources] = useState<LocalResource[]>([]);
  const [dataSource, setDataSource] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<LocalResource | null>(null);

  const handleSearch = async (postcode: string) => {
    setIsSearching(true);
    setSearchError(null);
    setSelectedResource(null);
    setDataSource(null);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('mental-health-services', {
        body: { postcode }
      });
      
      if (error) {
        console.error("Error calling API:", error);
        setSearchError("Failed to find services. Please try again.");
        toast.error("Error finding local services", {
          description: error.message || "Please try again later",
        });
      } else {
        setLocalResources(response.services);
        setDataSource(response.source || "Google Places API");
        
        toast.success("Local support services found", {
          description: `Found ${response.services.length} services near ${postcode}`,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setSearchError("Failed to connect to service. Please try again.");
      toast.error("Service unavailable", {
        description: "Our service is currently unavailable. Please try again later.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewResourceDetails = (resource: LocalResource) => {
    setSelectedResource(resource);
  };

  const handleBackToResults = () => {
    setSelectedResource(null);
  };

  return (
    <Card className="border-red-500/20 bg-elec-gray hover:shadow-md transition-shadow shadow-sm">
      <CardHeader className="pb-3 border-b border-red-500/10">
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-500" />
          Find Local Support
        </CardTitle>
        <CardDescription className="text-sm">
          Search for mental health services near you
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-6">
        <PostcodeSearchForm 
          isSearching={isSearching}
          onSearch={handleSearch}
        />

        <SearchError error={searchError} />

        {!selectedResource && (
          <ResourcesList 
            resources={localResources}
            dataSource={dataSource}
            onSelectResource={handleViewResourceDetails}
          />
        )}

        {selectedResource && (
          <ResourceDetails 
            resource={selectedResource}
            onBack={handleBackToResults}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LocalResourceFinder;
