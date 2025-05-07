
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

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
    <Card className="border-elec-yellow/20 bg-elec-gray/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Find Courses & Training Centers</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSearch)} className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        placeholder="Search courses or centers..." 
                        className="pl-8"
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
                <FormItem className="w-full md:w-48">
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
              Search
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CourseSearchForm;
