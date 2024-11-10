import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

const authConfig = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? '',
    //   clientSecret: process.env.GITHUB_SECRET ?? ''
    // }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const user = {
          id: '1',
          name: 'Demo',
          email: credentials?.email as string
        };
        if (user) {
          return user;
        } else {
          return null;

        }
      }
    })
  ],
  pages: {
    signIn: '/'
  }
} satisfies NextAuthConfig;

export default authConfig;
