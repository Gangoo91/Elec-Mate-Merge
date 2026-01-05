import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
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

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

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
    <div className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/[0.06]">
      {/* Subtle accent glow */}
      <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-elec-yellow/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-5 md:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
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
              className="group relative touch-manipulation"
            >
              <div className={`
                w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl overflow-hidden
                bg-white/[0.05] border border-white/[0.08]
                flex items-center justify-center
                transition-all duration-200
                group-hover:border-elec-yellow/40
                ${uploading ? "animate-pulse" : ""}
              `}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 sm:w-7 sm:h-7 text-white/40" />
                )}
              </div>
              {/* Camera overlay */}
              <div className="
                absolute inset-0 rounded-xl
                bg-black/60 opacity-0 group-hover:opacity-100
                flex items-center justify-center
                transition-opacity duration-200
              ">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </button>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center gap-1.5 text-elec-yellow/60 mb-0.5">
              <Sparkles className="h-3 w-3 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">
                Dashboard
              </span>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-tight">
              {greeting}, <span className="text-elec-yellow">{firstName}</span>
            </h1>

            <p className="text-xs sm:text-sm text-white/40 mt-0.5 line-clamp-1">
              Your command center for electrical excellence
            </p>
          </div>

          {/* Status indicator - desktop only */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-white/50 font-medium">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
