import * as React from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

interface RouteMapping {
  pattern: RegExp
  label: string
  destination: string
}

// Route mappings for smart breadcrumb labels
// Order matters - more specific patterns should come first
const routeMappings: RouteMapping[] = [
  // Apprentice Study paths (most specific first)
  { pattern: /^\/apprentice\/study\/eal\/[^/]+\/unit\/[^/]+\/section\/[^/]+\//, label: "Back to Section", destination: "" },
  { pattern: /^\/apprentice\/study\/eal\/[^/]+\/unit\/[^/]+\/section/, label: "Back to Unit", destination: "" },
  { pattern: /^\/apprentice\/study\/eal\/[^/]+\/unit/, label: "Back to Course", destination: "" },
  { pattern: /^\/apprentice\/study\/eal\/[^/]+/, label: "Back to Study Centre", destination: "/apprentice/study" },
  { pattern: /^\/apprentice\/study/, label: "Back to Apprentice Hub", destination: "/apprentice" },

  // Apprentice Toolbox paths
  { pattern: /^\/apprentice\/toolbox\/[^/]+/, label: "Back to Toolbox", destination: "/apprentice/toolbox" },
  { pattern: /^\/apprentice\/toolbox/, label: "Back to Apprentice Hub", destination: "/apprentice" },

  // Apprentice On-Job Tools paths (most specific first)
  { pattern: /^\/apprentice\/on-job-tools\/electrical-installation-guides\/[^/]+/, label: "Back to Installation Guides", destination: "/apprentice/on-job-tools/electrical-installation-guides" },
  { pattern: /^\/apprentice\/on-job-tools\/[^/]+/, label: "Back to On-Job Tools", destination: "/apprentice/on-job-tools" },
  { pattern: /^\/apprentice\/on-job-tools/, label: "Back to Apprentice Hub", destination: "/apprentice" },

  // Apprentice Mental Health paths
  { pattern: /^\/apprentice\/mental-health\/[^/]+/, label: "Back to Wellbeing", destination: "/apprentice/mental-health" },
  { pattern: /^\/apprentice\/mental-health/, label: "Back to Apprentice Hub", destination: "/apprentice" },

  // Apprentice Professional Development paths
  { pattern: /^\/apprentice\/professional-development\/[^/]+/, label: "Back to Development", destination: "/apprentice/professional-development" },
  { pattern: /^\/apprentice\/professional-development/, label: "Back to Apprentice Hub", destination: "/apprentice" },

  // Apprentice Career paths
  { pattern: /^\/apprentice\/career\/[^/]+/, label: "Back to Career", destination: "/apprentice/career" },
  { pattern: /^\/apprentice\/career/, label: "Back to Apprentice Hub", destination: "/apprentice" },

  // Other Apprentice paths
  { pattern: /^\/apprentice\/mock-exams\/[^/]+/, label: "Back to Mock Exams", destination: "/apprentice/mock-exams" },
  { pattern: /^\/apprentice\/flashcards\/[^/]+/, label: "Back to Flashcards", destination: "/apprentice/flashcards" },
  { pattern: /^\/apprentice\/calculators\/[^/]+/, label: "Back to Calculators", destination: "/apprentice/calculators" },
  { pattern: /^\/apprentice\/bs7671\/[^/]+/, label: "Back to BS7671", destination: "/apprentice/bs7671" },
  { pattern: /^\/apprentice\/[^/]+/, label: "Back to Apprentice Hub", destination: "/apprentice" },
  { pattern: /^\/apprentice/, label: "Back to Home", destination: "/" },

  // Electrician Mental Health paths
  { pattern: /^\/electrician\/mental-health\/[^/]+/, label: "Back to Wellbeing", destination: "/electrician/mental-health" },
  { pattern: /^\/electrician\/mental-health/, label: "Back to Electrician Hub", destination: "/electrician" },

  // Electrician Business Development paths
  { pattern: /^\/electrician\/business-development\/[^/]+/, label: "Back to Business Development", destination: "/electrician/business-development" },
  { pattern: /^\/electrician\/business-development/, label: "Back to Business Hub", destination: "/electrician/business" },

  // Electrician Quote/Invoice paths
  { pattern: /^\/electrician\/quotes\/[^/]+/, label: "Back to Quotes", destination: "/electrician/quotes" },
  { pattern: /^\/electrician\/quotes/, label: "Back to Electrical Hub", destination: "/electrician" },
  { pattern: /^\/electrician\/invoices\/[^/]+/, label: "Back to Invoices", destination: "/electrician/invoices" },
  { pattern: /^\/electrician\/invoices/, label: "Back to Electrical Hub", destination: "/electrician" },

  // Electrician Materials paths
  { pattern: /^\/electrician\/materials\/[^/]+/, label: "Back to Materials", destination: "/electrician/materials" },
  { pattern: /^\/electrician\/materials/, label: "Back to Business Hub", destination: "/electrician/business" },

  // Electrician Tools paths
  { pattern: /^\/electrician\/tools\/[^/]+/, label: "Back to Tools", destination: "/electrician/tools" },
  { pattern: /^\/electrician\/tools/, label: "Back to Business Hub", destination: "/electrician/business" },

  // Electrician Career paths
  { pattern: /^\/electrician\/career\/[^/]+/, label: "Back to Career", destination: "/electrician/career" },
  { pattern: /^\/electrician\/career/, label: "Back to Electrician Hub", destination: "/electrician" },

  // Other Electrician paths
  { pattern: /^\/electrician\/business\/[^/]+/, label: "Back to Business Hub", destination: "/electrician/business" },
  { pattern: /^\/electrician\/business/, label: "Back to Electrician Hub", destination: "/electrician" },
  { pattern: /^\/electrician\/[^/]+/, label: "Back to Electrician Hub", destination: "/electrician" },
  { pattern: /^\/electrician/, label: "Back to Home", destination: "/" },

  // College paths
  { pattern: /^\/college\/[^/]+/, label: "Back to College Hub", destination: "/college" },
  { pattern: /^\/college/, label: "Back to Home", destination: "/" },

  // Employer paths
  { pattern: /^\/employer\/[^/]+/, label: "Back to Employer Hub", destination: "/employer" },
  { pattern: /^\/employer/, label: "Back to Home", destination: "/" },

  // Default fallback
  { pattern: /.*/, label: "Back", destination: "" },
]

interface SmartBackButtonProps {
  /** Override the auto-detected label */
  label?: string
  /** Override the auto-detected destination */
  to?: string
  /** Additional class names */
  className?: string
  /** Size variant */
  size?: "default" | "sm" | "lg" | "icon"
  /** Whether to show the button at all (useful for conditional rendering) */
  show?: boolean
}

/**
 * Smart back button with context-aware breadcrumb-style labels.
 * Automatically detects the current route and generates an appropriate
 * "Back to X" label and destination.
 *
 * @example
 * // Auto-detect route and generate label
 * <SmartBackButton />
 *
 * @example
 * // Override with custom label and destination
 * <SmartBackButton label="Back to Dashboard" to="/dashboard" />
 */
export const SmartBackButton = React.forwardRef<
  HTMLButtonElement,
  SmartBackButtonProps
>(({ label, to, className, size = "sm", show = true }, ref) => {
  const navigate = useNavigate()
  const location = useLocation()

  if (!show) return null

  // Find the matching route mapping
  const getRouteInfo = () => {
    const path = location.pathname

    for (const mapping of routeMappings) {
      if (mapping.pattern.test(path)) {
        return {
          label: mapping.label,
          destination: mapping.destination,
        }
      }
    }

    return { label: "Back", destination: "" }
  }

  const routeInfo = getRouteInfo()
  const displayLabel = label || routeInfo.label
  const destination = to || routeInfo.destination

  const handleClick = () => {
    if (destination) {
      navigate(destination)
    } else {
      navigate(-1)
    }
  }

  return (
    <Button
      ref={ref}
      variant="outline"
      size={size}
      onClick={handleClick}
      className={cn(
        "border-elec-yellow/30 hover:bg-elec-yellow/10 hover:border-elec-yellow/50",
        "text-foreground active:scale-[0.98]",
        "gap-2",
        className
      )}
    >
      <ArrowLeft className="h-4 w-4" />
      {displayLabel}
    </Button>
  )
})

SmartBackButton.displayName = "SmartBackButton"

export default SmartBackButton
