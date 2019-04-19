import passport from 'passport'
import { OAuth2Strategy } from 'passport-google-oauth'
import { Express } from 'express'

const GOOGLE_CONSUMER_KEY =
  '324649783869-c48b5rs1sk8hptarma3o7p4o95t5564a.apps.googleusercontent.com'
const GOOGLE_CONSUMER_SECRET = 'qPi8t8-JdkVcIbgD0UuyhTsf'
const OAUTH_CALLBACK_URL =
  process.env.OAUTH_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'

passport.use(
  new OAuth2Strategy(
    {
      clientID: GOOGLE_CONSUMER_KEY,
      clientSecret: GOOGLE_CONSUMER_SECRET,
      callbackURL: OAUTH_CALLBACK_URL
    },
    (token, tokenSecret, profile, done) => {
      console.log(profile.id)
      return done(null, profile)
    }
  )
)
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

export function configurePassport (app: Express): void {
  app.use(passport.initialize())
  app.use(passport.session())

  app.get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login']
    })
  )

  app.get(
    '/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/')
    }
  )
}
