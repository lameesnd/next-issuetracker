import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

interface User {
  id: string;
  username: string;
  password: string;
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },
      async authorize(credentials, req) {
        const user: User = { id: '015gB5196436QG5Y18ed', username: 'Lamees', password: 'Lamees@123' };
        if (credentials?.username === user.username && credentials?.password === user.password) {
          return user
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;