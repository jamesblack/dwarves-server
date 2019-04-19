import express from 'express'

import { configurePassport } from './middleware/passport/passport'
import { configureParsers } from './middleware/express/parsers'
import { configureSession } from './middleware/express/session'
import { configureWhitelist } from './middleware/whitelist/whitelist'
import { applyGraphql } from './graphql/express'
import cors from 'cors'

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(cors({}))

configureParsers(app)
configureSession(app)
configurePassport(app)
configureWhitelist(app)
applyGraphql(app)

app.get('/api/', (req, res) => {
  res.redirect('/api/graphql')
})

app.listen(PORT, () => {
  console.log(`LISTENING on port ${PORT}`)
})
