/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/i-arayanlar-ve-iverenler-iin-etkili-zmler',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

