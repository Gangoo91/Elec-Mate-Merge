
import { useToast } from "@/hooks/use-toast"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <>
      {/* Mobile toast - bottom center */}
      <SonnerToaster 
        position="bottom-center" 
        offset="16px"
        richColors
        closeButton
        className="sm:hidden"
        toastOptions={{
          className: "mx-4 max-w-md",
          style: {
            borderRadius: "0.5rem",
          }
        }}
      />
      
      {/* Desktop toast - top center */}
      <SonnerToaster 
        position="top-center" 
        offset="20px"
        richColors
        closeButton
        className="hidden sm:block"
        toastOptions={{
          className: "max-w-md",
          style: {
            borderRadius: "0.5rem",
          }
        }}
      />
    </>
  )
}
