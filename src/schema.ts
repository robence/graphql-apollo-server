import { makeSchema } from 'nexus'
import { join } from 'path'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as typeDefs from './graphql'

export const schema = makeSchema({
  types: typeDefs,
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: join(__dirname, '..', 'schema.graphql'),
    typegen: join(__dirname, 'generated/' + 'nexus.ts'),
  },

  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
