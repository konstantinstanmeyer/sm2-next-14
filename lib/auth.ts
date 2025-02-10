import GoogleProvider from "next-auth/providers/google";
import mongoDBConnection from "./mongodb/connection";
import User from "@/models/user";

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({ user, account }: any) {
            if (account.provider === "google") {
              const { name, email } = user;
              try {
                await mongoDBConnection();
                const userExists = await User.findOne({ email });
      
                if (!userExists) {
                  const res = await fetch("../api/user", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name,
                      email,
                    }),
                  });
      
                  if (res.ok) {
                    return user;
                  }
                }
              } catch (error) {
                console.log(error);
              }
            }
      
            return user;
          },
      },
}