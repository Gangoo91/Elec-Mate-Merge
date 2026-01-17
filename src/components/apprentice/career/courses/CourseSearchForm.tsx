
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

interface SearchFormValues {
  location: string;
  searchQuery: string;
}

interface CourseSearchFormProps {
  locations: string[];
  onSearch: (values: SearchFormValues) => void;
}

const CourseSearchForm = ({ locations, onSearch }: CourseSearchFormProps) => {
  const form = useForm<SearchFormValues>({
    defaultValues: {
      location: "All Locations",
      searchQuery: "",
    }
  });

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="pb-3 relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Search className="h-5 w-5 text-elec-yellow" />
          </div>
          Find Courses & Training Centers
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSearch)} className="flex flex-col md:flex-row gap-3">
            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="relative">
                    {!field.value && (
                      <Search className="absolute left-3 top-3 h-4 w-4 text-white/40 pointer-events-none" />
                    )}
                    <FormControl>
                      <Input
                        placeholder="Search courses or centers..."
                        className={cn(
                          "h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40",
                          !field.value && "pl-10"
                        )}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full md:w-56">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-white/40 z-10" />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-11 pl-10 bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-elec-gray border-white/20">
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all px-6"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CourseSearchForm;
