import GoogleProvider from "next-auth/providers/google";

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
            }

            console.log(user);
            return user;
        },
      },
}