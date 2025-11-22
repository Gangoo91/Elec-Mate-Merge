
import { useToast } from "@/hooks/use-toast"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <>
      {/* Mobile toast - bottom center with compact sizing */}
      <SonnerToaster 
        position="bottom-center" 
        offset="80px"
        richColors
        closeButton
        className="sm:hidden"
        toastOptions={{
          className: "mx-auto text-sm",
          style: {
            borderRadius: "0.75rem",
            maxWidth: "320px",
            width: "auto",
            minWidth: "280px",
            margin: "0 auto",
            padding: "12px 16px",
            fontSize: "14px",
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
