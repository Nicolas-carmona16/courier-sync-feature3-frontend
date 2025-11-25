import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BackLinkProps {
  href?: string
  children: React.ReactNode
  useBack?: boolean
}

export function BackLink({ href = "/", children, useBack = false }: BackLinkProps) {
  const router = useRouter()

  if (useBack) {
    return (
      <button
        type="button"
        onClick={() => router.back()}
        className="courier-back-link"
        aria-label="Volver a la página anterior"
      >
        ← {children}
      </button>
    )
  }

  return (
    <Link href={href} className="courier-back-link">
      ← {children}
    </Link>
  )
}
