import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Isso desativa o processamento de imagem no servidor (Resolve o erro do IP privado)
    unoptimized: true, 
    
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;