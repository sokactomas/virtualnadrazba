import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'johndoe'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials, req) {
                const user = {
                    id: "1", name: "johndoe", email: "johndoe@drazba.eu"
                }

                return user;
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;  // Setting token in session
            return session;
        },
        async jwt({ token, user }) {
            user && (token.user = user);
            return token;
        }
    }
}

export default NextAuth(authOptions);