// @ts-check
const { withBlitz } = require("@blitzjs/next")

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js", "api.ts", "api.js"],
}

module.exports = withBlitz(config)
