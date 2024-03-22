import GoogleProvider from "next-auth/providers/google";
import { getProviders } from "next-auth/react";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    // // Invoked on successful sign in
    // async signIn({ profile }) {
    //   // 1. connect to database
    //   // 2. check if user exists
    //   // 3. if not, then add user to database
    //   // 4. return true to allow sign in
    // },
    // async session({ session }) {
    //   // 1. Get user from database
    //   // 2. Assign the user id to the session
    //   // 3. Return the session
    // },
  },
};

getProviders: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  }),
];
