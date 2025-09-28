import type React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  variant: "active" | "completed"
  children: React.ReactNode
}

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "courier-status-badge",
        variant === "active" && "courier-status-active",
        variant === "completed" && "courier-status-completed",
      )}
    >
      {children}
    </span>
  )
}
