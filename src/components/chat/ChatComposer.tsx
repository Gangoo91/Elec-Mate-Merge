
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, X, Image, Paperclip, Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/utils/stringUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

interface ChatComposerProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
  isVisible: boolean;
}

const ChatComposer = ({ onSubmit, onCancel, isVisible }: ChatComposerProps) => {
  const { profile } = useAuth();
  const [category, setCategory] = useState("");
  
  const form = useForm({
    defaultValues: {
      message: ""
    }
  });
  
  const handleSubmit = (values: { message: string }) => {
    if (values.message.trim()) {
      onSubmit(values.message);
      form.reset();
      setCategory("");
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div 
          className="bg-gradient-to-br from-elec-gray-light/30 to-elec-gray border border-elec-yellow/30 rounded-lg w-full max-w-xl overflow-hidden shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
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
              <div>
                <div className="text-elec-yellow font-medium">
                  {profile?.full_name || "Anonymous"}
                </div>
                <div className="text-xs text-gray-400">
                  Posting to Toolbox Talks
                </div>
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
                          placeholder="Share your knowledge, ask questions or start a discussion..."
                          className="min-h-[120px] bg-elec-dark/80 border border-elec-yellow/30 text-white resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-3 flex-wrap">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full md:w-auto bg-elec-dark/80 border-elec-yellow/30">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-elec-yellow" />
                        <SelectValue placeholder="Select a category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wiring">Wiring</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Regulations">Regulations</SelectItem>
                      <SelectItem value="Tools">Tools</SelectItem>
                      <SelectItem value="Tips">Tips</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button type="button" variant="outline" size="icon" className="bg-elec-dark/80 border-elec-yellow/30">
                    <Image className="h-4 w-4 text-elec-yellow" />
                  </Button>
                  
                  <Button type="button" variant="outline" size="icon" className="bg-elec-dark/80 border-elec-yellow/30">
                    <Paperclip className="h-4 w-4 text-elec-yellow" />
                  </Button>
                </div>
                
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
                    className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                    disabled={!form.watch("message").trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Post
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatComposer;
