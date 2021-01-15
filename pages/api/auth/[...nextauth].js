import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_PRIVATE_SIGNING_KEY
  }
}

export default (req, res) => NextAuth(req, res, options)