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
        : new RedisStore({
          url:
              'redis://h:p3e3ff6e0ae983296ef3bbacad02a36984e5c1d1899c733656fa4fa9597f64971@ec2-3-208-102-144.compute-1.amazonaws.com:30829'
        }),
      secret: MEMORY_STORE_SECRET
    })
  )
}
