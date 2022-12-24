import { NuxtAuthHandler } from "#auth";
import DiscordProvider from "next-auth/providers/discord";
import type { DiscordProfile } from "next-auth/providers/discord";

interface ExtendedDiscordProfile extends DiscordProfile {
  guilds: Array<{
    name: string;
    icon: string | null;
    owner: boolean;
  }> | null;
  connections: Array<{
    name: string;
    type: string;
    verified: boolean;
  }> | null;
}

export default NuxtAuthHandler({
  secret: useRuntimeConfig().project.secret,
  providers: [
    DiscordProvider.default({
      clientId: useRuntimeConfig().discord.id,
      clientSecret: useRuntimeConfig().discord.secret,
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+email+connections+guilds",
      async profile(profile: ExtendedDiscordProfile, { access_token }) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }

        const options = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          baseURL: "https://discord.com/api",
        };

        let guildsSanitized: Array<{
          name: string;
          icon: string | null;
          owner: boolean;
        }> | null = [];

        // Grab the guilds of the user
        const guilds = await $fetch<
          Array<{
            name: string;
            icon: string | null;
            owner: boolean;
            id: string;
          }>
        >("/users/@me/guilds", options).catch(() => null);

        // Grab only the important data from the guilds (name, icon, owner)
        guilds!.length > 0 && guilds
          ? guilds!.forEach(({ name, icon, owner, id }) => {
              // If the icon is animated, use gif, if not, use webp else use nothing
              guildsSanitized!.push({
                name,
                icon:
                  icon && icon.startsWith("a_")
                    ? `https://cdn.discordapp.com/icons/${id}/${icon}.gif`
                    : icon && !icon.startsWith("a_")
                    ? `https://cdn.discordapp.com/icons/${id}/${icon}.webp`
                    : null,
                owner,
              });
            })
          : (guildsSanitized = null);

        let connectionSanitized: Array<{
          name: string;
          type: string;
          verified: boolean;
        }> | null = [];

        // Grab the connections of the user
        const connections = await $fetch<
          Array<{
            name: string;
            type: string;
            verified: boolean;
          }>
        >("/users/@me/connections", options).catch(() => null);

        // Grab only the important data from the connections (name, type, verified)
        connections!.length > 0 && connections
          ? connections!.forEach(({ name, type, verified }) => {
              connectionSanitized!.push({ name, type, verified });
            })
          : (connectionSanitized = null);

        // Prepare credentials to revoke access_token
        const {
          discord: { id: clientId, secret: clientSecret },
        } = useRuntimeConfig();
        const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
          "base64"
        );

        // Revoke the access_token
        await $fetch<{}>("/oauth2/token/revoke", {
          baseURL: options.baseURL,
          method: "POST",
          body: `token=${access_token}`,
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        // Add the guilds and connections to the profile
        profile.guilds = guildsSanitized;
        profile.connections = connectionSanitized;

        // Remove unneeded data from the profile
        const {
          banner,
          banner_color,
          public_flags,
          avatar_decoration,
          avatar,
          ...profileSanitized
        } = profile;

        return profileSanitized;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        token = { ...user };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});
