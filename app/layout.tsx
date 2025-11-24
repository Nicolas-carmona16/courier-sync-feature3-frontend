import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ApolloProviderWrapper } from "@/components/apollo-provider"
import { AuthProvider } from "@/components/auth-provider"
import { AccessibilityProvider } from "@/components/accessibility-provider"
import { AccessibilityToggle } from "@/components/accessibility-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CourierSync - Gestión profesional de domicilios",
  description: "Plataforma para gestionar domicilios y datos personales",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <ApolloProviderWrapper>
          <AuthProvider>
            <AccessibilityProvider>
              <div id="main-content">{children}</div>
              <div className="fixed bottom-5 right-5 z-50">
                <AccessibilityToggle />
              </div>
            </AccessibilityProvider>
          </AuthProvider>
        </ApolloProviderWrapper>
      </body>
    </html>
  )
}
