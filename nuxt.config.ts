export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-svgo",
    "nuxt-fonty",
    "nuxt-headlessui",
    "nuxt-security",
    "@nuxt/image-edge",
    "@nuxtjs/color-mode",
    "@sidebase/nuxt-session",
    "@nuxtjs/html-validator",
    "@nuxt/content",
  ],
  runtimeConfig: {
    public: {
      discord: {
        baseURL: "https://discord.com/api",
        id: process.env.DISCORD_CLIENT_ID,
        redirectUrl: process.env.DISCORD_REDIRECT_URL,
      },
    },
    discord: {
      secret: process.env.DISCORD_CLIENT_SECRET,
      botToken: process.env.DISCORD_BOT_TOKEN,
    },
    jwtSigningKey: process.env.JWT_SIGNING_KEY,
  },
  app: {
    head: {
      link: [
        { rel: "icon", href: "/favicon.ico", type: "image/vnd.microsoft.icon" },
      ],
      titleTemplate: "%s - Prodis",
      htmlAttrs: {
        lang: "en-US",
      },
      meta: [
        {
          name: "description",
          content: "Lookup an account using the Discord API",
        },
        { name: "author", content: "OyewoleOyedeji" },
      ],
    },
    rootTag: "main",
  },
  fonty: {
    autoImport: true,
  },
  devtools: {},
  typescript: {
    shim: false,
    strict: true,
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
    },
    csrf: true,
  },
  image: {
    domains: ["cdn.discordapp.com"],
  },
  colorMode: {
    classSuffix: "",
  },
  svgo: {
    simpleAutoImport: true,
  },
});
