const {withKumaUI} = require('@kuma-ui/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack        : (config) => {
    config.module.rules.push({
                               test: /\.svg$/,
                               use : ['@svgr/webpack']
                             });
    return config;
  }
};

module.exports = withKumaUI(nextConfig);
