
import { useToast } from "@/hooks/use-toast"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  // We can use an empty implementation since we're using Sonner's toaster
  return <SonnerToaster />
}
