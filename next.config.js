/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    BEARER_TOKEN: process.env.BEARER_TOKEN,
    OMDB_API_KEY: process.env.OMDB_API_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  },
  reactStrictMode: true,
}
