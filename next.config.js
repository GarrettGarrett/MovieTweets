/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    BEARER_TOKEN: process.env.BEARER_TOKEN,
    OMDB_API_KEY: process.env.OMDB_API_KEY,
  },
  reactStrictMode: true,
}
