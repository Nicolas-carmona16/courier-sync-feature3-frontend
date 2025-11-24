"use client"

import { Button } from "@/components/ui/button"
import { useAccessibility } from "@/hooks/use-accessibility"
import { Highlighter, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export function AccessibilityToggle({ className = "" }: { className?: string }) {
  const { accessibleMode, toggleAccessibleMode } = useAccessibility()

  return (
    <Button
      type="button"
      onClick={toggleAccessibleMode}
      aria-pressed={accessibleMode}
      aria-label={accessibleMode ? "Desactivar modo accesible" : "Activar modo accesible"}
      className={cn(
        "flex items-center gap-2 rounded-full shadow-lg border border-gray-300 bg-white text-black px-4 py-2 focus-visible:outline-4 focus-visible:outline-orange-500",
        "transition-all hover:-translate-y-0.5",
        accessibleMode && "bg-courier-navy text-white border-courier-navy",
        className,
      )}
    >
      {accessibleMode ? <Moon className="w-4 h-4" aria-hidden /> : <Highlighter className="w-4 h-4" aria-hidden />}
      <span>{accessibleMode ? "Modo accesible activo" : "Modo accesible"}</span>
    </Button>
  )
}
