import { IResolvers, makeExecutableSchema } from 'graphql-tools'
import { gql } from 'apollo-server-core'

export const resolvers: IResolvers<any, GraphQLContext> = {
  Query: {
    ping: () => 'Pong!'
  }
}

export const typeDefs = gql`
  type Query {
    ping: String
  }
`
export default makeExecutableSchema({
  typeDefs,
  resolvers
})
