/** @type {import('next').NextConfig} */
const nextConfig = {
   trailingSlash: false,
   poweredByHeader: false,
   env: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL
   }
}

module.exports = nextConfig
