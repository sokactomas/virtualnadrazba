import { prisma } from "server/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'E-mail',
                    type: 'text',
                    placeholder: 'johndoe@gmail.com'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },

            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!user) {
                    return false;
                }

                const checkPassword = bcrypt.compareSync(credentials.password, user.password);

                if (!checkPassword) {
                    return false;
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