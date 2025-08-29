import { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LiveEducationData, useLiveEducationData } from "@/hooks/useLiveEducationData";
import LiveEducationCard from './LiveEducationCard';
import { Search } from 'lucide-react';

const ElectricianFurtherEducation = () => {
  const [selectedOption, setSelectedOption] = useState<LiveEducationData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { 
    educationData, 
    loading, 
    error, 
    lastUpdated, 
    isFromCache, 
    refreshData 
  } = useLiveEducationData(filterCategory);

  const handleRefreshData = useCallback(async (forceRefresh: boolean = false) => {
    await refreshData(forceRefresh);
  }, [refreshData]);

  useEffect(() => {
    // Refresh data on component mount
    handleRefreshData();
  }, [handleRefreshData]);

  const filteredEducationOptions = educationData.filter(option => {
    const searchRegex = new RegExp(searchTerm, 'i');
    return searchRegex.test(option.title + option.description + option.institution);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEducationOptions = filteredEducationOptions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="filters">
          <AccordionTrigger>
            <h3 className="text-lg font-semibold">
              Filters and Search
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="pl-10"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={filterCategory} onValueChange={(value) => {
                  setFilterCategory(value);
                  setCurrentPage(1); // Reset to first page on category change
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="apprenticeship">Apprenticeships</SelectItem>
                    <SelectItem value="bachelor's degree">Bachelor's Degrees</SelectItem>
                    <SelectItem value="master's degree">Master's Degrees</SelectItem>
                    <SelectItem value="professional certification">Professional Certifications</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {loading && <p>Loading education programmes...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Available Programmes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {currentEducationOptions.map((option) => (
          <LiveEducationCard
            key={option.id}
            option={option}
            onViewDetails={setSelectedOption}
          />
        ))}
      </div>

      {/* Pagination */}
      {filteredEducationOptions.length > itemsPerPage && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(filteredEducationOptions.length / itemsPerPage) }, (_, i) => i + 1).map(number => (
            <Button
              key={number}
              variant={currentPage === number ? "default" : "outline"}
              onClick={() => paginate(number)}
            >
              {number}
            </Button>
          ))}
        </div>
      )}

      {/* Education Option Details Dialog */}
      <Dialog open={selectedOption !== null} onOpenChange={(open) => {
        if (!open) setSelectedOption(null);
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedOption?.title || 'Education Programme Details'}</DialogTitle>
          </DialogHeader>
          <ScrollArea>
            {selectedOption ? (
              <div className="space-y-4">
                <p>{selectedOption.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Institution</Label>
                    <p className="font-medium">{selectedOption.institution}</p>
                  </div>
                  <div>
                    <Label>Level</Label>
                    <p className="font-medium">{selectedOption.level}</p>
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <p className="font-medium">{selectedOption.duration}</p>
                  </div>
                  <div>
                    <Label>Study Mode</Label>
                    <p className="font-medium">{selectedOption.studyMode}</p>
                  </div>
                  <div>
                    <Label>Tuition Fees</Label>
                    <p className="font-medium">{selectedOption.tuitionFees}</p>
                  </div>
                  <div>
                    <Label>Next Intake</Label>
                    <p className="font-medium">{selectedOption.nextIntake}</p>
                  </div>
                </div>
                <div>
                  <Label>Locations</Label>
                  <ul className="list-disc pl-5">
                    {selectedOption.locations.map((location, index) => (
                      <li key={index}>{location}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Label>Entry Requirements</Label>
                  <ul className="list-disc pl-5">
                    {selectedOption.entryRequirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Label>Key Topics</Label>
                  <ul className="list-disc pl-5">
                    {selectedOption.keyTopics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Label>Progression Options</Label>
                  <ul className="list-disc pl-5">
                    {selectedOption.progressionOptions.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Label>Funding Options</Label>
                  <ul className="list-disc pl-5">
                    {selectedOption.fundingOptions.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </div>
                <Button asChild>
                  <a href={selectedOption.courseUrl} target="_blank" rel="noopener noreferrer">
                    Visit Course Page
                  </a>
                </Button>
              </div>
            ) : (
              <p>No programme selected.</p>
            )}
          </ScrollArea>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ElectricianFurtherEducation;
