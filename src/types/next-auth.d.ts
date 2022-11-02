import NextAuth from 'next-auth';

export module "next-auth" {
    interface Session {
        user: {
            id: number,
            name: string,
            email: string,
        }
    }
}
