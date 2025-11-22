
import { useToast } from "@/hooks/use-toast"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <>
      {/* Mobile toast - bottom center with optimized positioning */}
      <SonnerToaster 
        position="bottom-center" 
        offset="80px"
        richColors
        closeButton
        className="sm:hidden"
        toastOptions={{
          className: "mx-auto",
          style: {
            borderRadius: "0.75rem",
            maxWidth: "calc(100vw - 2rem)",
            width: "100%",
            margin: "0 auto",
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
