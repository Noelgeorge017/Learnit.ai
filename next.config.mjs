/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{

            hostname: "lh3.googleusercontent.com",
            port: "",
        },
        {
            protocol: "https",
            hostname: "storyset.com",
            port: ""
        },
        {
            protocol: "https",
            hostname: "s3.us-west-2.amazonaws.com",
            port: ""

        },
        {
            protocol: "https",
            hostname: "nextpdfbucket.s3.ap-south-1.amazonaws.com",
            port: ""

        },
        ]
    },
    eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",

};

export default nextConfig;
