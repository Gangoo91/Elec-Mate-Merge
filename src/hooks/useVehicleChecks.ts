import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type CheckStatus = "pass" | "minor_defects" | "major_defects" | "fail";

export interface VehicleCheck {
  id: string;
  user_id: string;
  vehicle_id: string;
  driver_id?: string;
  check_date: string;
  check_time?: string;
  mileage?: number;
  // Exterior checks
  tyres_ok: boolean;
  lights_ok: boolean;
  mirrors_ok: boolean;
  bodywork_ok: boolean;
  windscreen_ok: boolean;
  wipers_ok: boolean;
  registration_visible: boolean;
  // Fluid checks
  oil_level_ok: boolean;
  coolant_ok: boolean;
  washer_fluid_ok: boolean;
  // Interior checks
  horn_ok: boolean;
  seatbelt_ok: boolean;
  dashboard_warnings: boolean;
  first_aid_kit: boolean;
  fire_extinguisher: boolean;
  // Defects
  defects_found: boolean;
  defect_details?: string;
  defect_photos?: string[];
  // Sign-off
  signature_url?: string;
  status: CheckStatus;
  notes?: string;
  created_at: string;
  // Joined data
  driver?: {
    id: string;
    name: string;
  };
}

export type CreateCheckInput = Omit<VehicleCheck, "id" | "user_id" | "created_at" | "driver">;

export const CHECK_ITEMS = {
  exterior: [
    { key: "tyres_ok", label: "Tyres condition & pressure" },
    { key: "lights_ok", label: "All lights working" },
    { key: "mirrors_ok", label: "Mirrors clean & adjusted" },
    { key: "bodywork_ok", label: "Bodywork condition" },
    { key: "windscreen_ok", label: "Windscreen clear" },
    { key: "wipers_ok", label: "Wipers working" },
    { key: "registration_visible", label: "Registration plates visible" },
  ],
  fluids: [
    { key: "oil_level_ok", label: "Oil level" },
    { key: "coolant_ok", label: "Coolant level" },
    { key: "washer_fluid_ok", label: "Washer fluid" },
  ],
  interior: [
    { key: "horn_ok", label: "Horn working" },
    { key: "seatbelt_ok", label: "Seatbelt working" },
    { key: "dashboard_warnings", label: "Dashboard warning lights (tick if clear)" },
    { key: "first_aid_kit", label: "First aid kit present" },
    { key: "fire_extinguisher", label: "Fire extinguisher present" },
  ],
} as const;

// Fetch checks for a specific vehicle
export function useVehicleChecks(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["vehicleChecks", vehicleId],
    queryFn: async (): Promise<VehicleCheck[]> => {
      if (!vehicleId) return [];

      const { data, error } = await supabase
        .from("vehicle_checks")
        .select(`
          *,
          driver:employer_employees(id, name)
        `)
        .eq("vehicle_id", vehicleId)
        .order("check_date", { ascending: false })
        .order("check_time", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as VehicleCheck[];
    },
    enabled: !!vehicleId,
  });
}

// Get latest check for a vehicle
export function useLatestCheck(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["latestCheck", vehicleId],
    queryFn: async (): Promise<VehicleCheck | null> => {
      if (!vehicleId) return null;

      const { data, error } = await supabase
        .from("vehicle_checks")
        .select(`
          *,
          driver:employer_employees(id, name)
        `)
        .eq("vehicle_id", vehicleId)
        .order("check_date", { ascending: false })
        .order("check_time", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // No rows found
        throw error;
      }
      return data as VehicleCheck;
    },
    enabled: !!vehicleId,
  });
}

// Check if vehicle has been checked today
export function useHasCheckedToday(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["hasCheckedToday", vehicleId],
    queryFn: async (): Promise<boolean> => {
      if (!vehicleId) return false;

      const today = new Date().toISOString().split("T")[0];

      const { count, error } = await supabase
        .from("vehicle_checks")
        .select("id", { count: "exact", head: true })
        .eq("vehicle_id", vehicleId)
        .eq("check_date", today);

      if (error) throw error;
      return (count || 0) > 0;
    },
    enabled: !!vehicleId,
  });
}

// Create a new check
export function useCreateCheck() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateCheckInput): Promise<VehicleCheck> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Determine status based on checks
      let status: CheckStatus = "pass";
      const checkFields = [
        input.tyres_ok, input.lights_ok, input.mirrors_ok, input.bodywork_ok,
        input.windscreen_ok, input.wipers_ok, input.registration_visible,
        input.oil_level_ok, input.coolant_ok, input.washer_fluid_ok,
        input.horn_ok, input.seatbelt_ok, !input.dashboard_warnings,
        input.first_aid_kit, input.fire_extinguisher,
      ];

      const failedChecks = checkFields.filter(check => !check).length;

      if (input.defects_found) {
        status = failedChecks > 3 ? "major_defects" : "minor_defects";
      } else if (failedChecks > 5) {
        status = "fail";
      } else if (failedChecks > 0) {
        status = "minor_defects";
      }

      const { data, error } = await supabase
        .from("vehicle_checks")
        .insert({ ...input, user_id: user.id, status })
        .select(`
          *,
          driver:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;

      // Update vehicle mileage if provided
      if (input.mileage) {
        await supabase
          .from("vehicles")
          .update({ mileage: input.mileage, updated_at: new Date().toISOString() })
          .eq("id", input.vehicle_id);
      }

      return data as VehicleCheck;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleChecks", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["latestCheck", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["hasCheckedToday", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast({
        title: data.status === "pass" ? "Check complete" : "Check recorded",
        description: data.defects_found
          ? "Defects have been recorded. Please address before use."
          : "Daily vehicle check has been logged.",
        variant: data.defects_found ? "destructive" : "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Upload defect photos
export function useUploadDefectPhotos() {
  return useMutation({
    mutationFn: async ({ files, vehicleId }: { files: File[]; vehicleId: string }): Promise<string[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const uploadedUrls: string[] = [];

      for (const file of files) {
        const fileName = `vehicle-checks/${user.id}/${vehicleId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;

        const { data, error } = await supabase.storage
          .from("visual-uploads")
          .upload(fileName, file, {
            contentType: file.type,
            upsert: false,
          });

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from("visual-uploads")
          .getPublicUrl(data.path);

        uploadedUrls.push(urlData.publicUrl);
      }

      return uploadedUrls;
    },
  });
}
