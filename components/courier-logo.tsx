import Link from "next/link"

interface CourierLogoProps {
  subtitle?: string
  href?: string
  className?: string
}

export function CourierLogo({
  subtitle = "Gestión profesional de entregas",
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
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g filter="url(#filter0_d_48_3152)">
            <rect
              x="4"
              width="130.986"
              height="124"
              rx="28"
              fill="url(#pattern0_48_3152)"
              shapeRendering="crispEdges"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_48_3152"
              x="0"
              y="0"
              width="138.986"
              height="132"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_48_3152"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_48_3152"
                result="shape"
              />
            </filter>
            <pattern
              id="pattern0_48_3152"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_48_3152"
                transform="scale(0.0133333 0.0140845)"
              />
            </pattern>
            <image
              id="image0_48_3152"
              width="75"
              height="71"
              preserveAspectRatio="none"
              xlinkHref="data:image/png;base64,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"
            />
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
