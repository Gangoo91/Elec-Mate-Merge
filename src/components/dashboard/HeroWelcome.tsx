import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Camera, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const getFirstName = (fullName: string | null | undefined) => {
  if (!fullName) return "there";
  return fullName.split(" ")[0];
};

export function HeroWelcome() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || null);

  const greeting = getGreeting();
  const firstName = getFirstName(profile?.full_name || user?.user_metadata?.full_name);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please select an image file", variant: "destructive" });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please select an image under 2MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast({ title: "Photo updated", description: "Your profile photo has been updated" });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-elec-gray via-elec-gray to-elec-dark shadow-none">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/3 via-transparent to-elec-yellow/3" />

      {/* Decorative elements - smaller on mobile, optimized for performance */}
      <div className="absolute top-0 right-0 w-24 sm:w-48 h-24 sm:h-48 bg-elec-yellow/8 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 sm:w-36 h-20 sm:h-36 bg-elec-yellow/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        <div className="flex items-start gap-4">
          {/* Profile Photo */}
          <div className="relative flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="group relative"
            >
              <div className={`
                w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl overflow-hidden
                bg-elec-yellow/10 border-2 border-elec-yellow/30
                flex items-center justify-center
                transition-colors duration-200
                group-hover:border-elec-yellow/60
                ${uploading ? "animate-pulse" : ""}
              `}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-elec-yellow/60" />
                )}
              </div>
              {/* Camera overlay */}
              <div className="
                absolute inset-0 rounded-2xl
                bg-black/50 opacity-0 group-hover:opacity-100
                flex items-center justify-center
                transition-opacity duration-200
              ">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </div>
            </button>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-elec-yellow/80 mb-1">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium tracking-wide uppercase truncate">
                ElecMate Dashboard
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {greeting},<br className="sm:hidden" />
              <span className="text-elec-yellow"> {firstName}</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-none">
              Your command center for electrical excellence.
            </p>
          </div>

          {/* Status indicator - desktop only */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-300 whitespace-nowrap">Active</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />
    </Card>
  );
}
