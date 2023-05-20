import { nanoid } from "nanoid";

const redisOptions = {
  url: process.env.KV_URL,
  ttl: 600,
};

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-svgo",
    "@hypernym/nuxt-font",
    "nuxt-headlessui",
    "nuxt-security",
    "@nuxt/image-edge",
    "@nuxtjs/color-mode",
    "@sidebase/nuxt-session",
    "@nuxtjs/html-validator",
    "@nuxt/content",
    "@nuxtjs/device",
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
    secret: nanoid(128),
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
    },
    rootTag: "main",
  },
  font: {
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
    defaultImport: "component",
  },
  session: {
    api: {
      methods: ["get"],
    },
    session: {
      idLength: 128,
      storageOptions: {
        driver: "redis",
        options: {
          base: "session",
          ...redisOptions,
        },
      },
    },
  },
  nitro: {
    devStorage: {
      keys: {
        driver: "redis",
        base: "keys",
        ...redisOptions,
      },
    },
    storage: {
      keys: {
        driver: "redis",
        base: "keys",
        ...redisOptions,
      },
    },
  },
  css: ["bootstrap-icons/font/bootstrap-icons.css"],
  content: {
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
    },
  },
});
