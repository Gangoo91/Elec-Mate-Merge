
import ResourceCard from "@/components/mental-health/ResourceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Resource {
  title: string;
  description: string;
  type: 'document' | 'video' | 'article' | 'website';
  url: string;
}

interface CommunityResourcesListProps {
  resources: Resource[];
}

const CommunityResourcesList = ({ resources }: CommunityResourcesListProps) => {
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [suggestion, setSuggestion] = useState({ title: '', description: '', url: '' });

  const handleSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your suggestion!", {
      description: "Our team will review it shortly."
    });
    setShowSuggestionForm(false);
    setSuggestion({ title: '', description: '', url: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Community Resources</h3>
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs border-purple-500/20 hover:bg-purple-500/10"
          onClick={() => setShowSuggestionForm(!showSuggestionForm)}
        >
          <FilePlus className="h-3 w-3 mr-1" />
          Suggest Resource
        </Button>
      </div>

      {showSuggestionForm && (
        <Card className="mb-4 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Suggest a Resource</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSuggestion} className="space-y-3">
              <div>
                <label htmlFor="title" className="text-xs font-medium">Resource Title</label>
                <input
                  id="title"
                  className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={suggestion.title}
                  onChange={(e) => setSuggestion({...suggestion, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="text-xs font-medium">Description</label>
                <input
                  id="description"
                  className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={suggestion.description}
                  onChange={(e) => setSuggestion({...suggestion, description: e.target.value})}
                  required
                />
              </div>
              <div>
                <label htmlFor="url" className="text-xs font-medium">Resource URL</label>
                <input
                  id="url"
                  className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={suggestion.url}
                  onChange={(e) => setSuggestion({...suggestion, url: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowSuggestionForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  size="sm" 
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <ResourceCard 
            key={index}
            title={resource.title}
            description={resource.description}
            type={resource.type}
            url={resource.url}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityResourcesList;
