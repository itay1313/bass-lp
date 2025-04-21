import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Extend the Session type
interface ExtendedSession extends Session {
  accessToken?: string;
}

// Extend the JWT type
interface ExtendedToken extends JWT {
  accessToken?: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'airtable',
      name: 'Airtable',
      type: 'oauth',
      authorization: {
        url: 'https://airtable.com/oauth2/v1/authorize',
        params: {
          scope: 'data.records:write',
          response_type: 'code',
        },
      },
      token: 'https://airtable.com/oauth2/v1/token',
      clientId: process.env.AIRTABLE_CLIENT_ID,
      clientSecret: process.env.AIRTABLE_CLIENT_SECRET,
      userinfo: {
        url: 'https://api.airtable.com/v0/meta/whoami',
        async request({ tokens }) {
          const response = await fetch('https://api.airtable.com/v0/meta/whoami', {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          });
          return await response.json();
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }): Promise<ExtendedToken> {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token as ExtendedToken;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      (session as ExtendedSession).accessToken = (token as ExtendedToken).accessToken;
      return session as ExtendedSession;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
