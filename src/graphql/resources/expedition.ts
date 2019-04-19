import { IResolvers, makeExecutableSchema } from 'graphql-tools'
import { gql } from 'apollo-server-core'

import ExpeditionService from '../../services/expedition/kankaExpeditionService'

export const resolvers: IResolvers<any, GraphQLContext> = {
  Expedition: {
    rations: () => {
      return ExpeditionService.getRations()
    },
    dwarves: parent => {
      if (parent.dwarves) return parent.dwarves
      return ExpeditionService.getDwarves()
    }
  },
  Query: {
    expedition: () => {
      return {}
    }
  },
  Mutation: {
    consumeDailyRations: async () => {
      return ExpeditionService.consumeDailyRations()
    }
  }
}

export const typeDefs = gql`
  type Dwarf {
    name: String
    isDead: Boolean
  }

  type Expedition {
    rations: Int
    dwarves: [Dwarf]
  }

  type Query {
    expedition: Expedition
  }
  type Mutation {
    consumeDailyRations: Expedition
  }
`
export default makeExecutableSchema({
  typeDefs,
  resolvers
})
