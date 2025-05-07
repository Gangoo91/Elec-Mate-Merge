
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/utils/stringUtils";

interface ChatComposerProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
  isVisible: boolean;
}

const ChatComposer = ({ onSubmit, onCancel, isVisible }: ChatComposerProps) => {
  const { profile } = useAuth();
  
  const form = useForm({
    defaultValues: {
      message: ""
    }
  });
  
  const handleSubmit = (values: { message: string }) => {
    if (values.message.trim()) {
      onSubmit(values.message);
      form.reset();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2c2c2c] border border-elec-yellow/30 rounded-lg w-full max-w-xl overflow-hidden">
        <div className="flex justify-between items-center border-b border-elec-yellow/20 p-4">
          <h3 className="text-lg font-medium text-white">Create New Post</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-3 border-2 border-elec-yellow/20">
              <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || "User"} />
              <AvatarFallback className="bg-elec-yellow text-black">
                {getInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-elec-yellow font-medium">
              {profile?.full_name || "Anonymous"}
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Share your thoughts with the community..."
                        className="min-h-[120px] bg-[#1a1a1a] border border-elec-yellow/30 text-white resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="ghost"
                  onClick={onCancel}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  disabled={!form.watch("message").trim()}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Post
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatComposer;
