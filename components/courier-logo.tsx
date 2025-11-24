import Link from "next/link"

interface CourierLogoProps {
  subtitle?: string
  href?: string
  className?: string
}

export function CourierLogo({
  subtitle = "Gestión inteligente de domicilios",
  href,
  className = "",
}: CourierLogoProps) {
  const LogoContent = () => (
    <div className={`courier-logo flex items-center gap-3 ${className}`}>
      {/* Ícono */}
      <div className="courier-logo-icon">
        <svg
          width="139"
          height="132"
          viewBox="0 0 139 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#shadow)">
            <rect x="4" width="130.986" height="124" rx="28" fill="url(#bg)" shapeRendering="crispEdges" />
          </g>
          <g transform="translate(18 20)">
            {/* Silueta de repartidor en moto */}
            <path
              d="M76 52c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7Z"
              stroke="#fff"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M38 52c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7Z"
              stroke="#fff"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M38 52h10l7-12h14c2 0 4 1 5 3l5 10"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M58 40v-5c0-5 4-9 9-9 4 0 8 3 9 7l1 3"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M50 58h18c3 0 6 2 7 5l2 4"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M33 66h-7c-3 0-6-2-7-5l-2-6c-1-3 1-6 4-6h9c2 0 4 1 5 3l2 4"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M74 40h8" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
            <path
              d="M32 40h6c2 0 3 1 3 3v6"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <rect x="16" y="28" width="14" height="16" rx="2" stroke="#fff" strokeWidth="4" fill="none" />
            <path
              d="M24 28v-4c0-2 2-4 4-4h8"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
          <defs>
            <linearGradient id="bg" x1="4" y1="0" x2="135" y2="124" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0f172a" />
              <stop offset="1" stopColor="#1e3a8a" />
            </linearGradient>
            <filter id="shadow" x="0" y="0" width="138.986" height="132" filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Texto */}
      <div>
        <h1 className="text-2xl font-bold text-black m-0">CourierSync</h1>
        <p className="text-gray-600 m-0">{subtitle}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="no-underline">
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}
