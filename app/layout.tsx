import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ApolloProviderWrapper } from "@/components/apollo-provider"
import { AuthProvider } from "@/components/auth-provider"

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
        <ApolloProviderWrapper>
          <AuthProvider>{children}</AuthProvider>
        </ApolloProviderWrapper>
      </body>
    </html>
  )
}
