import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
	// adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
	],

	secret: process.env.SECRET,
	callbacks: {
		async signIn({ account, profile }) {
			if (account.provider === "google") {
				return profile.email_verified && profile.email.endsWith("@example.com");
			}
			return true; // Do different verification for other providers that don't have `email_verified`
		},
	},
	session: {
		jwt: true,
	},
	debug: false,
});
