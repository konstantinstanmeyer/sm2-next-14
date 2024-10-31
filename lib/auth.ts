import GoogleProvider from "next-auth/providers/google";
import mongoDBConnection from "./mongodb/connection";

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({ user, account }: any) {
          console.log("hi")
        },
      },
}