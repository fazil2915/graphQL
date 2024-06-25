import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import typeDefs from "./schema.graphql";

const resolvers = {
  Query: {
    info: () => 'Test',
  }
}

export const schema = makeExecutableSchema({
  typeDefs: gql`${typeDefs}`,
  resolvers,
});