import rootSchema from './resources/root'
import expeditionSchema from './resources/expedition'
import { mergeSchemas } from 'graphql-tools'

export default mergeSchemas({
  schemas: [rootSchema, expeditionSchema]
})
