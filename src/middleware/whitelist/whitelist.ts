import { Express } from 'express'
const WHITELIST = ['103472954681846315599']

export function configureWhitelist (app: Express): void {
  app.use((req, res, next) => {
    if (req.user && WHITELIST.includes(req.user.id)) return next()
    return res
      .send(
        'Sorry, but you are not whitelisted to access this application. <a href="/api/auth/google">Try Again</a>'
      )
      .status(401)
  })
}
