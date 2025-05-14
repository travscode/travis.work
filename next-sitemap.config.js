/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://travis.work',
    generateRobotsTxt: true, // (optional)
    // ...other options
  }