import type React from "react"
import Link from "next/link"

interface BackLinkProps {
  href: string
  children: React.ReactNode
}

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link href={href} className="courier-back-link">
      ← {children}
    </Link>
  )
}
