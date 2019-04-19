import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'

import { Theme } from '@apollographql/graphql-playground-html/dist/render-playground-page'

import schema from './schema'

const graphqlServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    return { user: req.user }
  },
  introspection: true,
  playground: {
    settings: {
      'request.credentials': 'include',
      'editor.fontFamily': `monospace, 'Source Code Pro','Open Sans',sans-serif`,
      'editor.fontSize': 16,
      'editor.reuseHeaders': true,
      'editor.theme': 'dark' as Theme,
      'general.betaUpdates': true,
      'tracing.hideTracingResponse': true
    }
  }
})

export function applyGraphql (app: Express): void {
  graphqlServer.applyMiddleware({ app, path: '/api/graphql' })
}
