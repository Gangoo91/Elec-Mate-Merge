
import { useToast } from "@/hooks/use-toast"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <>
      {/* Mobile toast - bottom center */}
      <SonnerToaster 
        position="bottom-center" 
        offset="12px"
        richColors
        closeButton
        className="sm:hidden"
      />
      
      {/* Desktop toast - top center */}
      <SonnerToaster 
        position="top-center" 
        offset="20px"
        richColors
        closeButton
        className="hidden sm:block"
      />
    </>
  )
}
