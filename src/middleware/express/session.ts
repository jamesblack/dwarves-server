import { MEMORY_STORE_SECRET } from '../../config'
import session from 'express-session'
import CreateRedisStore from 'connect-redis'
import CreateMemoryStore from 'memorystore'
import { Express } from 'express'

const MemoryStore = CreateMemoryStore(session)
const RedisStore = CreateRedisStore(session)

export function configureSession (app: Express): void {
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 86400000 },
      store: process.env.USE_MEMORY_STORE
        ? new MemoryStore({})
        : new RedisStore({}),
      secret: MEMORY_STORE_SECRET
    })
  )
}
