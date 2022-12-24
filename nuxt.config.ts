import config from "config";

export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@nuxtjs/tailwindcss", "nuxt-icons"],
  runtimeConfig: {
    discord: {
      id:
        process.env.NODE_ENV === "development"
          ? config.get("discord.id")
          : process.env.DISCORD_CLIENT_ID,
      secret:
        process.env.NODE_ENV === "development"
          ? config.get("discord.secret")
          : process.env.DISCORD_CLIENT_SECRET,
      baseURL: "https://discord.com/api",
    },
    project: {
      secret:
        process.env.NODE_ENV === "development"
          ? config.get("project.secret")
          : process.env.SECRET,
    },
    public: {
      project: {
        secret:
          process.env.NODE_ENV === "development"
            ? config.get("project.public.secret")
            : process.env.PUBLIC_SECRET,
      },
    },
  },
  auth: {
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://prodis.vercel.app",
  },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://api.fonts.coollabs.io" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://api.fonts.coollabs.io/css2?family=Vollkorn:wght@600&Quicksand&display=swap",
        },
      ],
      titleTemplate: "%s - Prodis",
    },
  },
});
