const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
    dangerouslyAllowSVG: true,
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'gsap',
      'react-icons',
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Cache estático para imágenes
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache para fuentes
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache para assets estáticos
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache para animaciones JSON
        source: '/animations/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  async rewrites() {
    return [
      {
        // Redirige /es/manifest.json y /en/manifest.json a /manifest.json
        source: '/:locale/manifest.json',
        destination: '/manifest.json',
      },
      {
        // Redirige /es/fonts y /en/fonts a /fonts
        source: '/:locale/fonts/:path*',
        destination: '/fonts/:path*',
      },
    ]
  },

  // Optimizaciones de compilación
  swcMinify: true,
  
  // Optimizar producción
  productionBrowserSourceMaps: false,
}

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.jsdelivr.net app.cal.com https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://vercel.live;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https: https://www.google-analytics.com https://www.googletagmanager.com;
  font-src 'self';
  connect-src 'self' https: https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://vercel.live wss://ws-us3.pusher.com;
  frame-src 'self' app.cal.com https://vercel.live;
  media-src 'self';
`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

module.exports = withNextIntl(nextConfig)

