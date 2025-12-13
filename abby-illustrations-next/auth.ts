// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowedEmails =
  process.env.ALLOWED_EMAILS?.split(",").map((e) => e.trim()) ?? [];
const allowedDomain = process.env.ALLOWED_DOMAIN;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      if (allowedEmails.length > 0 && !allowedEmails.includes(user.email)) {
        return false;
      }

      if (allowedDomain) {
        const domain = user.email.split("@")[1];
        if (domain !== allowedDomain) return false;
      }

      return true;
    },
  },
});
