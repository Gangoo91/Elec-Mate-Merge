
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const postcodeSchema = z.object({
  postcode: z
    .string()
    .min(5, { message: "Please enter a valid postcode" })
    .max(8, { message: "Postcode is too long" })
});

interface PostcodeSearchFormProps {
  isSearching: boolean;
  onSearch: (postcode: string) => void;
}

const PostcodeSearchForm = ({ isSearching, onSearch }: PostcodeSearchFormProps) => {
  const form = useForm<z.infer<typeof postcodeSchema>>({
    resolver: zodResolver(postcodeSchema),
    defaultValues: {
      postcode: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof postcodeSchema>) => {
    onSearch(data.postcode);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input 
                    placeholder="Enter your postcode" 
                    className="text-sm" 
                    {...field} 
                  />
                  <Button 
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white sm:w-auto"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-1" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                Enter a UK postcode to find local services
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PostcodeSearchForm;
