import passport from 'passport'
import { OAuth2Strategy } from 'passport-google-oauth'
import { Express } from 'express'

const GOOGLE_CONSUMER_KEY =
  '674672284303-85da059q3s5cn8op3vrt11vhkv0l21n1.apps.googleusercontent.com'
const GOOGLE_CONSUMER_SECRET = 'z5z0UfFa7SOGvfOOAoci_945'
const OAUTH_CALLBACK_URL =
  process.env.OAUTH_CALLBACK_URL ||
  'http://localhost:3001/api/auth/google/callback'

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
