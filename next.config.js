/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**/**/**",
      },
    ],
  },
  experimental:{
    serverActions:true
  }
  
};
