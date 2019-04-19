import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { MEMORY_STORE_SECRET } from '../../config'
import { Express } from 'express'

export function configureParsers (app: Express): void {
  app.use(cookieParser(MEMORY_STORE_SECRET))
  app.use(bodyParser.urlencoded({ extended: false }))
}
