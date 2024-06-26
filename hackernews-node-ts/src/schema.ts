import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import typeDefs from "./schema.graphql";

type Link={
  id:string;
  url:string;
  desccription:string;

}

const links:Link[]=[{
  id:'link-0',
  url:'www.howtographql.com',
  desccription:'Fullstack tutorial for GrapghQL'
}]

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackersnews Clone',
    feed:()=>links,
  },

  Link:{
    id:(parent:Link)=>parent.id,
    description:(parent:Link)=>parent.desccription,
    url:(parent:Link)=>parent.url,
  }
}

export const schema = makeExecutableSchema({
  typeDefs: gql`${typeDefs}`,
  resolvers,
});