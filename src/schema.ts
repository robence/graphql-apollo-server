import { makeSchema } from '@nexus/schema'
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
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
