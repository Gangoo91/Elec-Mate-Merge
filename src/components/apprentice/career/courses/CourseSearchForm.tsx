import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

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
      location: 'All Locations',
      searchQuery: '',
    },
  });

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Find courses & training centres
      </span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearch)} className="flex flex-col md:flex-row gap-3">
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="relative">
                  {!field.value && (
                    <Search className="absolute left-3 top-3 h-4 w-4 text-white/55 pointer-events-none" />
                  )}
                  <FormControl>
                    <Input
                      placeholder="Search courses or centres..."
                      className={cn(
                        'h-11 bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 touch-manipulation',
                        !field.value && 'pl-10'
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
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-white/55 z-10" />
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full h-11 pl-10 bg-white/[0.03] border-white/10 text-white touch-manipulation">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-elec-gray border-white/10">
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
            className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] px-6"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CourseSearchForm;
